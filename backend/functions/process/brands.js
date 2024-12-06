const functions = require("firebase-functions");
const globalFile = require("./global");
var universalFile = require('../universal/universal');
var slugFile = require('../universal/slug');
const {
    db,
    bucket
} = require('./admin');


exports.deleteBrandsPhotos = functions.firestore
    .document("brands/{brandId}")
    .onDelete((snap, context) => {
        const brandId = context.params.brandId;
        return bucket.deleteFiles({
            prefix: `brands/${brandId}`
        });
    });

exports.onUpdateBrand = functions.firestore.document('brands/{brandId}').onUpdate(async (change, context) => {
    const brandId = context.params.brandId;
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
        let brandIds = [];
        let allBrandRegions = {};
        const brandsRef = await db.collection('brands').get();
        brandsRef.forEach(async (doc) => {
            brandIds.push(doc.id);
        });
        for (const bid of brandIds) {
            allBrandRegions[bid] = await getRegionsOfBrands(bid);
        }
        const products = await productsFromBrandId(brandId);
        for (const product of products) {
            const productBrands = product.brands;
            for (const bid of productBrands) {
                if(allBrandRegions.hasOwnProperty(bid)) {
                    for (const region of allBrandRegions[bid]) {
                        if(!regions.includes(region)) {
                            regions.push(region);
                        }
                    }
                }
            }
            await db.collection('products').doc(product.id).update({
                brandRegions: regions
            });
        }
    }
    const brandDataForJson = await universalFile.productsFromTypeId(brandId, 'brands');
    if (((afterData.name != beforeData.name) || (afterData.metaData != beforeData.metaData)) && isUniversal) {
        // await universalFile.createJsonFile('brands', 'update', brandId, brandDataForJson);
        await db.collection('management').doc('universal').collection('brand-updates').doc(afterData.slug.name).set({mode: 'edit', id: brandId, data: brandDataForJson});
    }
    if ((afterData.slug.name != beforeData.slug.name) && isUniversal) {
        await db.collection('management').doc('universal').collection('brand-updates').doc(afterData.slug.name).set({mode: 'new', id: brandId, data: brandDataForJson});
    }

});

async function productsFromBrandId(brandId) {
    return new Promise(async (resolve, reject) => {
        let products = [];
        const productRef = await db.collection('products').where('brands', 'array-contains', brandId).get();
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

async function getRegionsOfBrands(bid) {
    return new Promise(async (resolve, reject) => {
        let regions = [];
        const brandDoc = await db.collection('brands').doc(bid).get();
        if (brandDoc.data()) {
            const brand = brandDoc.data();
            regions = brand.regionId || [];
        }
        resolve(regions);
    })
}


exports.onCreateBrand = functions.firestore
    .document("brands/{brandId}")
    .onCreate(async (snap, context) => {
        const brandId = context.params.brandId;
        const brandData = snap.data();
        let isUniversal = false;
        const envDoc = await db.collection('settings').doc('environment').get();
        if (envDoc.data() && envDoc.data().hasOwnProperty('isUniversal')){
            isUniversal = envDoc.data().isUniversal;
        }
        
        const sameBrandNames = await db.collection('brands').where('name', '==', brandData.name).get();
        let brands = [];
        sameBrandNames.forEach(async (doc) => {
            brands.push({id: doc.id, ...doc.data()});
        });
        if (!brands.length) {
            brands[0] = {id: brandId, ...brandData};
        }
        if (isUniversal) {
            const slugName = await slugFile.generateSlugs({choice: 'brands', mode: 'onCreate'}, brands);
            const brandDataForJson = await universalFile.productsFromTypeId(brandId, 'brands');
            // await universalFile.createJsonFile('brands', 'new', brandId, brandDataForJson);
            await db.collection('management').doc('universal').collection('brand-updates').doc(slugName).set({mode: 'new', id: brandId, data: brandDataForJson});
        }
    });

