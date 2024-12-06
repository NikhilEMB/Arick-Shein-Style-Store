const {
    db,timeZone,
} = require('../process/admin');
var moment = require('moment-timezone');


async function createSlugName(name){ 
    return name.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');  
}

async function generateSlugs(options, products){
    console.log('generateSlugs starting');
    for (let product of products) {
        if (!('slug' in product) || !(product.slug && product.slug.name)) {
        let slugName;
        if ('prodName' in product) {
            slugName = await createSlugName(product.prodName);
        } else{
            slugName = await createSlugName(product.name);
        }
        let slug = {
            name: slugName,
            updatedBy: 'system',
            updatedAt: new Date(moment().tz(timeZone))
        }
        let sameProdNames;
        const name = (product.prodName || product.name).toLowerCase().trim();
        if ('prodName' in product) {
            sameProdNames = products.filter(obj => obj.prodName.toLowerCase().trim() === name);
        } else{
            sameProdNames = products.filter(obj => obj.name.toLowerCase().trim() === name);
        }   
        if (sameProdNames.length) {
            let lastSlug = null;
            for (const prod of sameProdNames.reverse()) {
                if ('slug' in prod && prod.slug.name){
                    lastSlug = prod.slug;
                    break;
                }
            }
            if (lastSlug) {
                const slugArr = lastSlug.name.split('-');
                let slugCount = parseInt(slugArr[slugArr.length-1]);
                slug.name = !isNaN(slugCount) ? slug.name + '-' + ++slugCount : slug.name + '-1';
            }
        }
        product.slug = slug;
        if (options.choice === 'products') {
            console.log('prodID: ', product.id);
            const prodName = product.prodName.trim();
            await db.collection('products').doc(product.id).update({slug, prodName});
        } else if(options.choice === 'options'){
            const prodName = product.prodName.trim();
            console.log('prodID: ', options.productId);
            await db.collection('products').doc(options.productId).collection('options').doc(product.id).update({slug, prodName});
        } else if(options.choice === 'categories'){
            const name = product.name.trim();
            console.log('catID: ', product.id);
            await db.collection('categories').doc(product.id).update({slug, name});
        } else if(options.choice === 'subcategories'){
            const name = product.name.trim();
            console.log('subCatID: ', options.categoryId);
            await db.collection('categories').doc(options.categoryId).collection('subcategories').doc(product.id).update({slug, name});
        } else if(options.choice === 'subsubcategories'){
            const name = product.name.trim();
            // console.log('subCatID: ', options.categoryId);
            await db.collection('categories').doc(options.categoryId).collection('subcategories').doc(options.subcategoryId).collection('subcategories').doc(product.id).update({slug, name});
        } else if(options.choice === 'brands'){
            const name = product.name.trim();
            console.log('brandID: ', product.id);
            await db.collection('brands').doc(product.id).update({slug, name});
        } else if(options.choice === 'pages'){
            const name = product.name.trim();
            console.log('pageID: ', product.id);
            await db.collection('pages').doc(product.id).update({slug, name});
        } else if(options.choice === 'vendors'){
            const name = product.name.trim();
            console.log('vendorID: ', product.id);
            await db.collection('features').doc('multiVendor').collection('vendors').doc(product.id).update({slug, name});
        }
        if (options.mode === 'onCreate'){
            return slug.name;
        }
            
        }
    }
   // console.log('products:', products);
   console.log('generateSlugs finished');
}

async function startSlugProcess(){
    // Product
    const prodSlugs = await db.collection('products').get();
    let products = [];
    prodSlugs.forEach(async (doc) => {
        products.push({id: doc.id, ...doc.data()});
    });
    await generateSlugs({choice: 'products'}, products);

    // Product options
    for (const product of products) {
        const optionsRef = await db.collection('products').doc(product.id).collection('options').get();
        let options = [];
        optionsRef.forEach(doc => {
            if(doc && doc.id) {
                options.push({id: doc.id, ...doc.data()});
            }
        });
        if(options.length) {
            await generateSlugs({choice: 'options', productId: product.id}, options);
        }
    }

    // Categories
    const categoryDocs = await db.collection('categories').get();
    let categories = [];
    categoryDocs.forEach(async (doc) => {
        categories.push({id: doc.id, ...doc.data()});
    });
    await generateSlugs({choice: 'categories'}, categories);

    // subcategries
    for (const category of categories) {
        const subcatsRef = await db.collection('categories').doc(category.id).collection('subcategories').get();
        let subcategories = [];
        subcatsRef.forEach(doc => {
            if(doc && doc.id) {
                subcategories.push({id: doc.id, ...doc.data()});
            }
        });
        if(subcategories.length) {
            await generateSlugs({choice: 'subcategories', categoryId: category.id}, subcategories);
        }
    }

    // Brands
    const brandDocs = await db.collection('brands').get();
    let brands = [];
    brandDocs.forEach(async (doc) => {
        brands.push({id: doc.id, ...doc.data()});
    });
    await generateSlugs({choice: 'brands'}, brands);

    // Custom pages
    const pageDocs = await db.collection('pages').orderBy('name', 'asc').get();
    let pages = [];
    pageDocs.forEach(async (doc) => {
        pages.push({id: doc.id, ...doc.data()});
    });
    await generateSlugs({choice: 'pages'}, pages);

    // vendors
    const vendorDocs = await db.collection('features').doc('multiVendor').collection('vendors').get();
    let vendors = [];
    vendorDocs.forEach(async (doc) => {
        vendors.push({id: doc.id, ...doc.data()});
    });
    await generateSlugs({choice: 'vendors'}, vendors);
}

module.exports = {
    createSlugName: async function (data) {
        const response = await createSlugName(data);
        return response;
    },

    generateSlugs: async function (data, products) {
        const response = await generateSlugs(data, products);
        return response;
    }
}