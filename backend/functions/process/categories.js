const functions = require("firebase-functions");
var globalFile = require('./global');
var universalFile = require('../universal/universal');
var slugFile = require('../universal/slug');

const {
    db,
    bucket
} = require('./admin');


exports.deleteCategoriesPhotos = functions.firestore
    .document("categories/{categoryId}")
    .onDelete((snap, context) => {
        const categoryId = context.params.categoryId;
        return bucket.deleteFiles({
            prefix: `categories/${categoryId}`
        });
    });

exports.onUpdateCategory = functions.firestore.document('categories/{categoryId}').onUpdate(async (change, context) => {
    const categoryId = context.params.categoryId;
    const afterData = change.after.data();
    const beforeData = change.before.data();
    const afterRegions = afterData.regionId;
    const beforeRegions = beforeData.regionId;
    
    let isUniversal = false;
    const envDoc = await db.collection('settings').doc('environment').get();
    if (envDoc.data() && envDoc.data().hasOwnProperty('isUniversal')){
        isUniversal = envDoc.data().isUniversal;
    }
    let regions = [];
    let needToUpdate = false;
    if (beforeData.regionId.length && !afterData.regionId.length) {
        needToUpdate = true;
    }
    if (afterData.regionId.length) {
        let difference = afterRegions
                 .filter(x => !beforeRegions.includes(x))
                 .concat(beforeRegions.filter(x => !afterRegions.includes(x)));
        if(difference.length) {
            needToUpdate = true;
        }
    }
    if (needToUpdate) {
        let categoryIds = [];
        let allCategoryRegions = {};
        const categoriesRef = await db.collection('categories').get();
        categoriesRef.forEach(async (doc) => {
            categoryIds.push(doc.id);
        });
        for (const cid of categoryIds) {
            allCategoryRegions[cid] = await getRegionsOfCategories(cid);
        }
        const products = await productsFromCategoryId(categoryId);
        for (const product of products) {
            const productCategories = product.categories;
            for (const cid of productCategories) {
                if(allCategoryRegions.hasOwnProperty(cid)) {
                    for (const region of allCategoryRegions[cid]) {
                        if(!regions.includes(region)) {
                            regions.push(region);
                        }
                    }
                }
            }
            console.log('regions', regions);
            await db.collection('products').doc(product.id).update({
                categoryRegions: regions
            });
        }
    }

    if(afterData.status !== beforeData.status) {
        const products = await productsFromCategoryId(categoryId);
        for (const product of products) {
            if(product.categories.length === 1) {
                await db.collection('products').doc(product.id).update({
                    status: afterData.status
                });
            }
        }
    }
    
    const categoryDataForJson = await universalFile.productsFromTypeId(categoryId, 'categories');
    if (((afterData.name != beforeData.name) || (afterData.metaData != beforeData.metaData)) && isUniversal) {
        // await universalFile.createJsonFile('categories', 'update', categoryId, categoryDataForJson);
        await db.collection('management').doc('universal').collection('category-updates').doc(afterData.slug.name).set({mode: 'edit', id: categoryId, data: categoryDataForJson});
    }
    if ((afterData.slug.name != beforeData.slug.name) && isUniversal) {
        await db.collection('management').doc('universal').collection('category-updates').doc(afterData.slug.name).set({mode: 'new', id: categoryId, data: categoryDataForJson});
    }

});

async function productsFromCategoryId(categoryId) {
    return new Promise(async (resolve, reject) => {
        let products = [];
        const productRef = await db.collection('products').where('categories', 'array-contains', categoryId).get();
        productRef.forEach(async (doc) => {
            if (doc && doc.id) {
                products.push({
                    id: doc.id,
                    ...doc.data()
                });
            }
        });
        resolve(products);
    });
}

async function getRegionsOfCategories(cid) {
    return new Promise(async (resolve, reject) => {
        let regions = [];
        const categoryDoc = await db.collection('categories').doc(cid).get();
        if (categoryDoc.data()) {
            const category = categoryDoc.data();
            regions = category.regionId || [];
        }
        resolve(regions);
    })
}



exports.onCreateCategory = functions.firestore
    .document("categories/{categoryId}")
    .onCreate(async (snap, context) => {
        const categoryId = context.params.categoryId;
        const categoryData = snap.data();
        
        let isUniversal = false;
        const envDoc = await db.collection('settings').doc('environment').get();
        if (envDoc.data() && envDoc.data().hasOwnProperty('isUniversal')){
            isUniversal = envDoc.data().isUniversal;
        }
        
        const sameCatNames = await db.collection('categories').where('name', '==', categoryData.name).get();
        let categories = [];
        sameCatNames.forEach(async (doc) => {
            categories.push({id: doc.id, ...doc.data()});
        });
        if (!categories.length) {
            categories[0] = {id: categoryId, ...categoryData};
        }
        if (isUniversal) {
            const slugName = await slugFile.generateSlugs({choice: 'categories', mode: 'onCreate'}, categories);
            const categoryDataForJson = await universalFile.productsFromTypeId(categoryId, 'categories');
            // await universalFile.createJsonFile('categories', 'new', categoryId, categoryDataForJson);
            await db.collection('management').doc('universal').collection('category-updates').doc(slugName).set({mode: 'new', id: categoryId, data: categoryDataForJson}); 
        }
    });

    
exports.onCreateSubcategory = functions.firestore
    .document("categories/{categoryId}/subcategories/{subcategoryId}")
    .onCreate(async (snap, context) => {
        const categoryId = context.params.categoryId;
        const subcategoryId = context.params.subcategoryId;
        const subcategoryData = snap.data();
    
        let isUniversal = false;
        const envDoc = await db.collection('settings').doc('environment').get();
        if (envDoc.data() && envDoc.data().hasOwnProperty('isUniversal')){
            isUniversal = envDoc.data().isUniversal;
        }
        
        const sameSubCatNames = await db.collection('categories').doc(categoryId).collection('subcategories').where('name', '==', subcategoryData.name).get();
        let subcategories = [];
        sameSubCatNames.forEach(async (doc) => {
            subcategories.push({id: doc.id, ...doc.data()});
        });
        if (!subcategories.length) {
            subcategories[0] = {id: subcategoryId, ...subcategoryData};
        }
        if (isUniversal) {
            const slugName = await slugFile.generateSlugs({choice: 'subcategories', categoryId: categoryId, mode: 'onCreate'}, subcategories);
            let subcategoryDataForJson = await universalFile.productsFromTypeId(subcategoryId, {categoryId: categoryId, subcatId: subcategoryId});
            const categoryRef = await db.collection('categories').doc(categoryId).get();
            subcategoryDataForJson.category = categoryRef.data();
            await db.collection('management').doc('universal').collection('subcategory-updates').doc(slugName).set({mode: 'new', id: subcategoryId, data: subcategoryDataForJson}); 
        }
    });
    
exports.onCreateSubSubcategory = functions.firestore
.document("categories/{categoryId}/subcategories/{subcategoryId}/subcategories/{subsubcategoryId}")
.onCreate(async (snap, context) => {
    const categoryId = context.params.categoryId;
    const subcategoryId = context.params.subcategoryId;
    // const subcategoryData = snap.data();

    const subsubcategoryId = context.params.subsubcategoryId;
    const subsubcategoryData = snap.data();

    let isUniversal = false;
    const envDoc = await db.collection('settings').doc('environment').get();
    if (envDoc.data() && envDoc.data().hasOwnProperty('isUniversal')){
        isUniversal = envDoc.data().isUniversal;
    }
    
    const sameSubSubCatNames = await db.collection('categories').doc(categoryId).collection('subcategories').doc(subcategoryId).collection('subcategories').where('name', '==', subsubcategoryData.name).get();
    let subcategories = [];
    sameSubSubCatNames.forEach(async (doc) => {
        subcategories.push({id: doc.id, ...doc.data()});
    });
    if (!subcategories.length) {
        subcategories[0] = {id: subsubcategoryId, ...subsubcategoryData};
    }
    if (isUniversal) {
        const slugName = await slugFile.generateSlugs({choice: 'subsubcategories', categoryId: categoryId, subcategoryId: subcategoryId, mode: 'onCreate'}, subcategories);
        // let subcategoryDataForJson = await universalFile.productsFromTypeId(subcategoryId, {categoryId: categoryId, subcatId: subcategoryId});
        // const categoryRef = await db.collection('categories').doc(categoryId).get();
        // subcategoryDataForJson.category = categoryRef.data();
        // await db.collection('management').doc('universal').collection('subcategory-updates').doc(slugName).set({mode: 'new', id: subcategoryId, data: subcategoryDataForJson}); 
    }
});


exports.onUpdateSubcategory = functions.firestore.document('categories/{categoryId}/subcategories/{subcategoryId}').onUpdate(async (change, context) => {
        const categoryId = context.params.categoryId;
        const subcategoryId = context.params.subcategoryId;
        const afterData = change.after.data();
        const beforeData = change.before.data();
        
        let isUniversal = false;
        const envDoc = await db.collection('settings').doc('environment').get();
        if (envDoc.data() && envDoc.data().hasOwnProperty('isUniversal')){
            isUniversal = envDoc.data().isUniversal;
        }
        
        let subcategoryDataForJson = await universalFile.productsFromTypeId(subcategoryId, {categoryId: categoryId, subcatId: subcategoryId});
        const categoryRef = await db.collection('categories').doc(categoryId).get();
        subcategoryDataForJson.category = categoryRef.data();
        if (((afterData.name != beforeData.name) || (afterData.metaData != beforeData.metaData)) && isUniversal) {
            await db.collection('management').doc('universal').collection('subcategory-updates').doc(afterData.slug.name).set({mode: 'edit', id: subcategoryId, data: subcategoryDataForJson});
        }
        if ((afterData.slug.name != beforeData.slug.name) && isUniversal) {
            await db.collection('management').doc('universal').collection('category-updates').doc(afterData.slug.name).set({mode: 'new', id: subcategoryId, data: subcategoryDataForJson});
        }
    
    });

exports.onDeleteSubcategory = functions.firestore
.document("categories/{categoryId}/subcategories/{subcategoryId}")
.onDelete(async (snap, context) => {
    const categoryId = context.params.categoryId;

    db.collection('categories').doc(categoryId).collection('subcategories').get().then(async (docs) => {
        let docSize = docs && docs.size ? docs.size : 0;
        if(docSize === 0) {
            await db.collection('categories').doc(categoryId).update({
                isSubcategories: false
            });
        }
    });
});