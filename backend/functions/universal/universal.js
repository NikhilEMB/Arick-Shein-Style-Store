const { db } = require('../process/admin');
const fs = require('file-system');
const path = require('path');

var routes = ['/'];

function encodeURL(url) {
    return encodeURIComponent(url.toLowerCase().trim().replace(/ /g, '-'));
}

function makeDirIfNotExists(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }
}

async function productsFromTypeId(id, type) {
    return new Promise(async (resolve, reject) => {
        let envDoc = await db.collection('settings').doc('environment').get();
        const productsLimit = (envDoc.data() && envDoc.data().shopProductsLimit) || 20;
        let obj = {};
        let products = [];
        let prodfield = type;
        if (typeof type === 'object') {
            prodfield = 'categories'
        }
        const productRef = await db.collection('products').where(`${prodfield}`, 'array-contains', id)
        .limit(productsLimit).get();
        productRef.forEach(async (doc) => {
            if (doc && doc.id) {
                products.push({
                    id: doc.id,
                    data: doc.data()
                });
            }
        });
        let typeDoc;
        if (typeof type === 'string') {
            typeDoc = await db.collection(type).doc(id).get();
        } else if(typeof type === 'object'){
            console.log(type);
            typeDoc = await db.collection('categories').doc(type.categoryId).collection('subcategories').doc(type.subcatId).get();
        }
        obj['data'] = typeDoc.data() || {};
        obj['products'] = products;
        resolve(obj);
    });
}

async function getProductDetails(prodId){
    const doc = await db.collection('products').doc(prodId).get();
    return doc.data();
}

async function getProducts(){
    let products = [];
    const productRef = await db.collection('products').get();
    productRef.forEach(async (doc) => {
        if (doc && doc.id) {
            products.push({
                id: doc.id,
                ...doc.data()
            });
        }
    });
    for (const product of products) {
            const data = JSON.stringify({product: product}, null, 4);
            if (product.slug && product.slug.name) {
                routes.push(`/product/${product.slug.name}`);
                console.log('productId:', product.id);
                if(!fs.existsSync(path.join(__dirname, '..', 'data/products', `${product.slug.name}.json`))){
                    fs.writeFile(path.join(__dirname, '..', 'data/products', `${product.slug.name}.json`), data);
                  }
            }
    }
    makeDirIfNotExists(path.join(__dirname, '..', 'data/products'))
}

async function getBrandsAndCategories(choice){
    let choices = [];
    const choiceRef = await db.collection(choice).get();
    choiceRef.forEach(async (doc) => {
        if (doc && doc.id) {
            choices.push({
                id: doc.id,
                ...doc.data()
            });
        }
    });
    for (const item of choices) {
        const products = await productsFromTypeId(item.id, choice);
        const data = JSON.stringify(products, null, 4);
        if (choice == 'brands' && item.slug && item.slug.name) {
            routes.push(`/brand/${item.slug.name}`);
        }
        else if(choice == 'categories' && item.slug && item.slug.name){
            if (item.isSubcategories) {
                routes.push(`/subcategory/${item.slug.name}`);
                let subcats = [];
                const subcatRef = await db.collection('categories').doc(item.id).collection('subcategories').get();
                if (subcatRef) {
                    subcatRef.forEach(async (doc) => {
                        if (doc && doc.id) {
                            subcats.push({
                                id: doc.id,
                                ...doc.data()
                            });
                        }
                    });
                }
                for (const subcat of subcats) {
                    console.log('subcat:', subcat.name);
                    const productsForSubcat = await productsFromTypeId(subcat.id, {categoryId: item.id, subcatId: subcat.id});
                    const subcatData = JSON.stringify(productsForSubcat, null, 4);
                    fs.writeFileSync(path.join(__dirname, '..', `data/subcategories/slugs`, `${subcat.slug.name}.json`), subcatData);
                    fs.writeFileSync(path.join(__dirname, '..', `data/subcategories/id`, `${subcat.id}.json`), subcatData);
                    routes.push(`/category/${item.slug.name}/${subcat.slug.name}`);
                }
            }
            routes.push(`/category/${item.slug.name}`);
        }
        fs.writeFile(path.join(__dirname, '..', `data/${choice}/slugs`, `${item.slug.name}.json`), data);
        fs.writeFile(path.join(__dirname, '..', `data/${choice}/id`, `${item.id}.json`), data);
    }
    makeDirIfNotExists(path.join(__dirname, '..', `data/${choice}`))
}

async function getSections(){
    const doc = await db.collection('pages').doc('homepage').get();
    if (doc && doc.data() && doc.data().sections) {
        const data = JSON.stringify({sections: doc.data().sections}, null, 4);
        fs.writeFile(path.join(__dirname, '..', 'data/widgets', 'sections.json'), data);
        const sections = doc.data().sections;
        for (const section of sections) {
            if ((section.location === 'web' || section.location === 'all') && section.widgetID) {
                let webSlides = [];
                let products = [];
                let slides = [];
                //console.log('widgetID: ',section.widgetID);
                    const widgetDoc = await db.collection('widgets').doc(section.widgetID).get();
                    let widgetData = widgetDoc.data();
                    if (widgetDoc && widgetDoc.data()) {
                        console.log('widgetData.type:', widgetData.type)
                        if (widgetData.type === 'banner-slider' || widgetData.type === 'image-banner') {
                            const webSlidesRef = await db.collection('widgets').doc(section.widgetID).collection('webSlides').get();
                            webSlidesRef.forEach(async (doc) => {
                                if (doc && doc.id) {
                                    webSlides.push({
                                        id: doc.id,
                                        ...doc.data()
                                    });
                                }
                            });
                            const slidesRef = await db.collection('widgets').doc(section.widgetID).collection('slides').get();
                            if (slidesRef) {
                                slidesRef.forEach(async (doc) => {
                                    if (doc && doc.id) {
                                        slides.push({ id: doc.id, ...doc.data() });
                                    }
                                });
                            }
                        }
                        if (widgetData.type === 'product-list' || widgetData.type === 'product-carousel') {
                            const productRef = await db.collection('widgets').doc(section.widgetID).collection('products').get();
                            productRef.forEach(async (doc) => {
                                if (doc && doc.id) {
                                    products.push({
                                        ...doc.data()
                                    });
                                }
                            });
                        }
                        const widgetJson = JSON.stringify({data: widgetData, webSlides: webSlides, slides, products: products}, null, 4);
                        fs.writeFile(path.join(__dirname, '..', 'data/widgets', `${section.widgetID}.json`), widgetJson);
                    }
        }
    }
}
makeDirIfNotExists(path.join(__dirname, '..', 'data/widgets'));
}

async function getPages() {
    let pages = [];
    const pagesRef = await db.collection('pages').get();
    pagesRef.forEach(async (doc) => {
        if (doc && doc.id) {
            pages.push({
                id: doc.id,
                 ...doc.data()
            });
        }
    });

    for (const page of pages) {
        const pagesJson = JSON.stringify({data: page}, null, 4);
        if (page.id != 'homepage' && page.id != 'about') {
            //console.log('obj:::', page);
            if (page.slug && page.slug.name) {
                routes.push(`/page/${page.slug.name}`);
                fs.writeFile(path.join(__dirname, '..', 'data/pages', `${page.slug.name}.json`), pagesJson);
            }
        } else{            
            fs.writeFile(path.join(__dirname, '..', 'data/pages', `${page.id}.json`), pagesJson);
        }
    }
}

async function getSeo(){
    let seo;
    const seoSettings = await db.collection('settings').doc('seo').get();
    if (seoSettings && seoSettings.data()) {
        seo = seoSettings.data();
        const seoJson = JSON.stringify({data: seo}, null, 4);
        fs.writeFile(path.join(__dirname, '..', 'data/seo', `seo.json`), seoJson);
    }
}

async function makeDynamicRoutes(){
    for (const route of routes) {
        fs.appendFileSync(path.join(__dirname, '..', 'data', 'routes.txt'), route+"\n" ); 
    }
}

async function generateJson(){
    await getPages();
    await getSections();  // For Sections & Widgets
    await getBrandsAndCategories('brands');
    await getBrandsAndCategories('categories');
    await getProducts();
    await getSeo();
    await makeDynamicRoutes();
}

module.exports = {
    createJsonFile: async function (fileChoice, mode, id, data) {
        const response = await createJsonFile(fileChoice, mode, id, data);
        return response;
    },
    productsFromTypeId: async function(id, type){
        const response = await productsFromTypeId(id, type);
        return response;
    }
}

async function createJsonFile(fileChoice, mode, id, data){
    console.log('createJsonFile running...');
    makeDirIfNotExists(path.join(__dirname, '..', `data`));
    makeDirIfNotExists(path.join(__dirname, '..', `data/${fileChoice}`))
        if (fileChoice == 'products') {
            const jsonData = JSON.stringify(data, null, 4);
            if (mode == 'new'){
                fs.appendFileSync(path.join(__dirname, '..', 'data/routes.txt'), `\n/product/${data.product.slug.name}`);
            }
            fs.writeFile(path.join(__dirname, '..', 'data/products', `${data.product.slug.name}.json`), jsonData);
        }
        else if(fileChoice == 'brands'){
            const jsonData = JSON.stringify(data, null, 4);
            if (mode == 'new'){
                fs.appendFileSync(path.join(__dirname, '..', 'data/routes.txt'), `\n/brand/${data.data.slug.name}`);
            }
            fs.writeFile(path.join(__dirname, '..', 'data/brands/slugs', `${data.data.slug.name}.json`), jsonData);
            fs.writeFile(path.join(__dirname, '..', 'data/brands/id', `${data.data.id}.json`), jsonData);
        }
        else if(fileChoice == 'categories'){
            const jsonData = JSON.stringify(data, null, 4);
            if (mode == 'new'){
                fs.appendFileSync(path.join(__dirname, '..', 'data/routes.txt'), `\n/category/${data.data.slug.name}`);
            }
            fs.writeFile(path.join(__dirname, '..', 'data/categories/slugs', `${data.data.slug.name}.json`), jsonData);
            fs.writeFile(path.join(__dirname, '..', 'data/categories/id', `${data.data.id}.json`), jsonData);
        }
        else if(fileChoice == 'pages'){
            const jsonData = JSON.stringify(data, null, 4);
            if (mode == 'new'){
                fs.appendFileSync(path.join(__dirname, '..', 'data/routes.txt'), `\n/page/${data.data.slug.name}`);
            }
            fs.writeFile(path.join(__dirname, '..', 'data/pages', `${data.data.slug.name}.json`), jsonData);
        }
        else if(fileChoice == 'services'){
            const jsonData = JSON.stringify(data, null, 4);
            if (mode == 'new'){
                fs.appendFileSync(path.join(__dirname, '..', 'data/routes.txt'), `\n/page/${data.data.slug.name}`);
            }
            fs.writeFile(path.join(__dirname, '..', 'data/services', `${data.data.id}.json`), jsonData);
        }
        else if(fileChoice == 'widgets'){
            if (mode == 'edit') {
                await getSections();
            }
        }
}

async function testJsonFile(){
    createJsonFile('product', 'new', '8LexJrkLfMliuIPUo0qQ', {id: '8LexJrkLfMliuIPUo0qQ', prodName: 'test12345', price: 123, slug:{name: 'test'}})
}
//testJsonFile()