const functions = require("firebase-functions");
const algoliasearch = require('algoliasearch');
const {
  admin,
  db,
  bucket,
  projectId,
  algolia,
  allowOpenSearch,
  typesenseCred
} = require('./admin');
const globalFile = require('./global');
const ALGOLIA_ID = algolia.id;
const ALGOLIA_ADMIN_KEY = algolia.adminKey;
const ALGOLIA_SEARCH_KEY = algolia.searchKey;
const ALGOLIA_INDEX_NAME = projectId;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const algoliaIndex = client.initIndex(ALGOLIA_INDEX_NAME);

function getFirebaseUser(req, res, next) {
  console.log("Check if request is authorized with Firebase ID token");
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    console.error(
      "No Firebase ID token was passed as a Bearer token in the Authorization header.",
      "Make sure you authorize your request by providing the following HTTP header:",
      "Authorization: Bearer <Firebase ID Token>"
    );
    res.status(403).send("Unauthorized");
    return;
  }
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    console.log("Found 'Authorization' header");
    idToken = req.headers.authorization.split("Bearer ")[1];
  }
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedIdToken => {
      console.log("ID Token correctly decoded", decodedIdToken);
      req.user = decodedIdToken;
      next();
    })
    .catch(error => {
      console.error("Error while verifying Firebase ID token:", error);
      res.status(403).send("Unauthorized");
    });
}
const app = require('express')();
app.use(require('cors')({
  origin: true
}));
if (!allowOpenSearch) {
  app.use(getFirebaseUser);
}
app.get('/', (req, res) => {
  const validUntil = Math.floor(Date.now() / 1000) + 3600 * 24;
  //key available for 24 hours
  const params = {
    restrictIndices: projectId,
    userToken: allowOpenSearch ? (Math.floor((Math.random() * 1000000000000) + 1)).toString() : req.user.user_id,
    validUntil
  };
  const key = client.generateSecuredApiKey(ALGOLIA_SEARCH_KEY, params);
  res.json({
    key
  });
  client.updateApiKey(key, {
    acl: ['search', 'browse'],
  }).then(({
    key
  }) => {
    console.log(key);
  });
});

exports.getSearchKey = functions.https.onRequest(app);

async function getCatSubcatNames(categories) {
  return new Promise(async (resolve, reject) => {
    try {
      let categoryNames = [];
      for (const catId of categories) {
        const catDoc = await db.collection('categories').doc(catId).get();
        let categoryData = catDoc.data();
        if (categoryData) {
          categoryNames.push(categoryData.name);
          if (categoryData.isSubcategories) {
            const subcategoriesRef = await db.collection('categories').doc(catId).collection('subcategories').get();
            subcategoriesRef.forEach(doc => {
              if (doc && doc.id && doc.data() && categories.includes(doc.id)) {
                categoryNames.push(doc.data().name);
              }
            });
          }
        }
      }
      resolve(categoryNames);
    } catch (error) {
      console.log(error);
      resolve([]);
    }
  });
}
exports.createProductInSearch = functions.firestore.document('products/{productId}').onCreate(async (snap, context) => {
  const productId = context.params.productId;
  let {
    images,
    barcode,
    nameToSearch,
    ...product
  } = snap.data();
  const categoriesNames = await getCatSubcatNames(product['categories']);
  product['ptype'] = 'parent';
  product['prodDesc'] = product["prodDesc"].replace(/<[^>]*>?/gm, '');
  product['categoriesNames'] = categoriesNames;
  product['id'] = productId;
  await typesense_createProductSchema();
  await typesense_addDocument(product);
});
exports.updateProductInSearch = functions.firestore.document('products/{productId}').onUpdate(async (change, context) => {
  const productId = context.params.productId;
  let beforeData = getRequiredData(change.before.data());
  let afterData = getRequiredData(change.after.data());
  if (JSON.stringify(beforeData) !== JSON.stringify(afterData)) {
    let categoriesNames = [];
    if (JSON.stringify(beforeData.categories) !== JSON.stringify(afterData.categories)) {
      categoriesNames = await getCatSubcatNames(afterData['categories']);
    }
    afterData['ptype'] = 'parent';
    afterData['prodDesc'] = afterData["prodDesc"].replace(/<[^>]*>?/gm, '');
    let updateObj = {
      ...afterData
    };
    if (categoriesNames.length) {
      updateObj['categoriesNames'] = categoriesNames;
    }
    updateObj['id'] = productId;
    await typesense_updateDocument(updateObj);
  }
});

function getRequiredData(data) {
  const {
    images,
    barcode,
    nameToSearch,
    dynamicLink,
    additionalInfo,
    allRegions,
    attributes,
    bundleProducts,
    metaData,
    stockAttributes,
    variantGroups,
    batches,
    regions,
    ...requiredData
  } = data;
  return requiredData;
}

exports.createProductOptionInSearch = functions.firestore.document('products/{productId}/options/{optionId}').onCreate(async (snap, context) => {
  const productId = context.params.productId;
  const optionId = context.params.optionId;
  let {
    images,
    barcode,
    nameToSearch,
    ...option
  } = snap.data();
  const product = await db.collection('products').doc(productId).get()
  const categoriesNames = await getCatSubcatNames(option['categories']);
  option['ptype'] = 'child';
  option['parentId'] = productId;
  option['parentSlug'] = product.data().slug || {};
  option['prodDesc'] = option["prodDesc"].replace(/<[^>]*>?/gm, '');
  option['categoriesNames'] = categoriesNames;
  option['id'] = optionId;
  await typesense_createProductSchema();
  await typesense_addDocument(option);
});
exports.updateProductOptionInSearch = functions.firestore.document('products/{productId}/options/{optionId}').onUpdate(async (change, context) => {
  const productId = context.params.productId;
  const optionId = context.params.optionId;
  let beforeData = getRequiredData(change.before.data());
  let afterData = getRequiredData(change.after.data());
  // const {images, barcode, nameToSearch, ...option} = change.after.data();
  if (JSON.stringify(beforeData) !== JSON.stringify(afterData)) {
    const product = await db.collection('products').doc(productId).get();
    let categoriesNames = [];
    if (JSON.stringify(beforeData.categories) !== JSON.stringify(afterData.categories)) {
      categoriesNames = await getCatSubcatNames(afterData['categories']);
    }
    // afterData['categories'] = await getCatSubcatNames(afterData['categories']);
    // afterData['objectID'] = optionId;
    afterData['ptype'] = 'child';
    afterData['parentId'] = productId;
    afterData['parentSlug'] = product.data().slug || {};
    afterData['prodDesc'] = afterData["prodDesc"].replace(/<[^>]*>?/gm, '');
    let updateObj = {
      ...afterData
    };
    if (categoriesNames.length) {
      updateObj['categoriesNames'] = categoriesNames;
    }
    updateObj['id'] = optionId;
    await typesense_updateDocument(updateObj);
  }
});
exports.deleteProductInSearch = functions.firestore.document("products/{productId}").onDelete(async (snap, context) => {
  const productId = context.params.productId;
  const objectIDs = [productId];
  const product = snap.data();
  if (product.hasOwnProperty('options') && product.options.length) {
    product.options.forEach(option => {
      if (option.optionId) {
        objectIDs.push(option.optionId)
      }
    });
  }
  await typesense_deleteDocuments(objectIDs);
});
exports.deleteProductOptionInSearch = functions.firestore.document("products/{productId}/options/{optionId}").onDelete(async (snap, context) => {
  const productId = context.params.productId;
  const optionId = context.params.optionId;
  await typesense_deleteDocuments([optionId]);
});

exports.updateProductInSearchOnCategoryUpdate = functions.firestore.document("categories/{categoryId}").onUpdate(async (change, context) => {
  const categoryId = context.params.categoryId;
  const afterCategoryData = change.after.data();
  const beforeCategoryData = change.before.data();
  if (beforeCategoryData.name !== afterCategoryData.name) {
    const products = await getProductsFromCategoryId(categoryId) || [];
    for (const product of products) {
      const categories = await getCatSubcatNames(product.categories);
      await typesense_updateDocumentPartially(product.id, {
        categories
      });
    }
  }

});

exports.updateProductInSearchOnCategoryDelete = functions.firestore.document("categories/{categoryId}").onDelete(async (snap, context) => {
  const categoryId = context.params.categoryId;
  const products = await getProductsFromCategoryId(categoryId) || [];
  for (const product of products) {
    const categories = await getCatSubcatNames(product.categories);
    await typesense_updateDocumentPartially(product.id, {
      categories
    });
  }
});


async function getProductsFromCategoryId(categoryId) {
  return new Promise(async (reslove, reject) => {
    let products = [];
    const productRef = await db.collection('products').where('categories', 'array-contains', categoryId).get();
    productRef.forEach(doc => {
      if (doc && doc.id && doc.data()) {
        products.push({
          id: doc.id,
          ...doc.data()
        })
      }
    });
    reslove(products);
  });
}


// *******Filters work*******
exports.onCreateFilter = functions.firestore.document('features/filters/list/{filterId}').onCreate(async (snap, context) => {
  let attributes = await getAllAttributes();
  algoliaIndex.setSettings({
    attributesForFaceting: attributes
  }).then(() => {
    return 'attributesForFaceting created';
  });
});

exports.onUpdateFilter = functions.firestore.document('features/filters/list/{filterId}').onUpdate(async (snap, context) => {
  let attributes = await getAllAttributes();
  algoliaIndex.setSettings({
      attributesForFaceting: attributes
    }).then(() => {
      console.log('attributesForFaceting created');
    })
    .catch(err => {
      console.log('err in setSettings', err);
    });
});

async function getAllAttributes() {
  return new Promise(async (resolve, reject) => {
    let attributes = [
      'filterOnly(categories)',
      'filterOnly(brands)',
      'filterOnly(categoryRegions)',
      'filterOnly(brandRegions)',
      'filterOnly(discountedPrice)',
      'filterOnly(status)',
      'filterOnly(rating.avgRating)',
      'filterOnly(discount)',
      'filterOnly(vendorId)'
    ];
    const filtersRef = await db.collection('features').doc('filters').collection('list').get();
    filtersRef.forEach(async (doc) => {
      if (doc && doc.id && doc.data()) {
        const filter = doc.data();
        if (filter.active) {
          attributes.push(`filterOnly(filters.${filter.name})`);
        }
      }
    });
    resolve(attributes);
  });
}


// *******Typesense work*******

async function useTypesenseForSearch() {
  return new Promise(async (resolve, reject) => {
    const env = await globalFile.getEnvironmentVariables();
    resolve('useTypesense' in env ? env.useTypesense : false);
  });
}

function typesense_initClient() {
  return new Promise(async (resolve, reject) => {
    try {
      const Typesense = require('typesense');
      let typesenseClient = new Typesense.Client({
        'nodes': [{
          'host': typesenseCred.host,
          'port': typesenseCred.port,
          'protocol': typesenseCred.protocol
        }],
        'apiKey': typesenseCred.apiKey,
        'connectionTimeoutSeconds': 2
      });
      resolve(typesenseClient);
    } catch (error) {
      console.log('error in initialising typesense client');
      resolve(null);
    }
  });
}

function typesense_getIndex() {
  return `${projectId}-products`;
}

async function typesense_createProductSchema() {
  return new Promise(async (resolve, reject) => {
    let typesenseClient = await typesense_initClient();
    if (!typesenseClient) return;
    const collection = typesense_getIndex();
    const collectionExists = await typesense_checkCollectionExists(collection);
    if (collectionExists) {
      resolve(true);
      return;
    }
    const productsCollection = {
      'name': collection,
      "enable_nested_fields": true,
      'fields': [{
          "name": ".*",
          "type": "auto"
        },
        {
          "name": "brands",
          "type": "string[]",
          "facet": true
        },
        {
          "name": "categories",
          "type": "string[]",
          "facet": true
        },
        {
          "name": "discount",
          "type": "float"
        },
        {
          "facet": true,
          "name": "discountedPrice",
          "type": "float"
        },
        {
          "name": "prodPrice",
          "type": "float"
        }
      ]
    }
    typesenseClient.collections().create(productsCollection);
    resolve(true);
  });
}

async function typesense_checkCollectionExists(collection) {
  return new Promise(async (resolve) => {
    try {
      let typesenseClient = await typesense_initClient();
      if (!typesenseClient) return;
      await typesenseClient.collections(collection).retrieve();
      // console.log(res);
      resolve(true);
    } catch (error) {
      console.log('error', error);
      resolve(false);
    }
  });
}

function prepareProductForTypesense(product) {
  product['discount'] = parseFloat((product.discount || 0).toFixed(2));
  product['discountedPrice'] = parseFloat((product.discountedPrice || 0).toFixed(2));
  product['prodPrice'] = parseFloat((product.prodPrice || 0).toFixed(2));
  product["brands"] = product.brands || [];
  product["categories"] = product.categories || [];
  product = flattenedObjForFiltering(product);
  product = stringifyArrayOfObjects(product);
  return product;
}

async function typesense_addDocument(product) {
  product = prepareProductForTypesense(product);
  let typesenseClient = await typesense_initClient();
  if (!typesenseClient) return;
  return typesenseClient.collections(typesense_getIndex()).documents().create(product, {
    "dirty_values": "coerce_or_drop"
  });
}

async function typesense_updateDocument(product) {
  product = prepareProductForTypesense(product);
  let typesenseClient = await typesense_initClient();
  if (!typesenseClient) return;
  return typesenseClient.collections(typesense_getIndex()).documents(product.id).update(product, {
    "dirty_values": "coerce_or_drop"
  });
}

async function typesense_updateDocumentPartially(id, product) {
  product = prepareProductForTypesense(product);
  let typesenseClient = await typesense_initClient();
  if (!typesenseClient) return;
  return typesenseClient.collections(typesense_getIndex()).documents(id).update(product, {
    "dirty_values": "coerce_or_drop"
  });
}

async function typesense_deleteDocuments(productIds) {
  return new Promise(async resolve => {
    try {
      let typesenseClient = await typesense_initClient();
      if (!typesenseClient) return;
      for (const id of productIds) {
        await typesenseClient.collections(typesense_getIndex()).documents(id).delete()
      }
      resolve(true);
    } catch (error) {
      console.log('error in deleting documents from typesense', error);
      resolve(false);
    }
  });
}

function stringifyArrayOfObjects(object) {
  for (const key in object) {
    // if ((Array.isArray(object[key]) && object[key].length && typeof object[key][0] == 'object') || (Array.isArray(object[key]) && !object[key].length)) {
    if ((Array.isArray(object[key]) && object[key].length && typeof object[key][0] == 'object')) {
      object[key] = JSON.stringify(object[key]);
    }
  }
  return object;
}

function flattenedObjForFiltering(product) {
  if (product.filters && Object.keys(product.filters).length) {
    for (var key in product.filters) {
      product[`filters.${key}`] = product.filters[key];
    }
  }
  if (product.rating && Object.keys(product.rating).length) {
    for (var key in product.rating) {
      product[`rating.${key}`] = product.rating[key];
    }
  }
  return product;
}