const functions = require("firebase-functions");
const builder = require('xmlbuilder');

const { db, websiteLink } = require('./admin');

async function getActiveDocs(collectionName) {
    return new Promise(async (resolve, reject) => {
        try {
            let isUniversal = false;
            const envDoc = await db.collection('settings').doc('environment').get();
            if (envDoc.data() && envDoc.data().hasOwnProperty('isUniversal')){
                isUniversal = envDoc.data().isUniversal;
            }
            let docs = [];
            let docRef;
            if (collectionName == 'services') {
                docRef = await db.collection(collectionName).get();
            }
            else if(collectionName == 'subcategories'){
                const catDocRef = await db.collection('categories').where('status', '==', true).get();
                let allCategories = [];
                catDocRef.forEach(async (doc) => {
                    allCategories.push({id: doc.id, ...doc.data()});
                });
                for (const category of allCategories) {
                    if (category && category.id) {
                        if (category.isSubcategories) {
                            const subCategoriesDocsRef = await db.collection('categories').doc(category.id).collection('subcategories').where('status', '==', true).get();
                            subCategoriesDocsRef.forEach(async (doc) => {
                                if (isUniversal) {
                                    docs.push({id: doc.id, ...doc.data(), categorySlugName: category.slug.name});
                                    
                                } else{
                                    docs.push({id: doc.id, ...doc.data()});
                                }
                            });
                        }
                    }
                }
            }
            else {
                docRef = await db.collection(collectionName).where('status', '==', true).get();
            }
            if (docRef) {
                docRef.forEach(doc => {
                    if (doc && doc.id && doc.data()) {
                        docs.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    }
                });
            }
            resolve(docs);
        } catch (error) {
            console.log('error', error);
            resolve([]);
        }

    });
}

function encodeURL(url) {
    return escape(encodeURIComponent(url.toLowerCase().trim().replace(/ /g, '-')));
}

exports.sitemap = functions.https.onRequest(async (req, res) => {    
    let baseUrl = websiteLink;
    let environmentDoc = await db.collection('settings').doc('environment').get();
    let products = await getActiveDocs('products');
    let brands = await getActiveDocs('brands');
    let services = await getActiveDocs('services');
    let categories = await getActiveDocs('categories');
    let subcategories = await getActiveDocs('subcategories');
    const policies = await db.collection('settings').doc('policies').get();
    console.log('inside sitemap');
    
    let urlset = builder.create('urlset', {
        version: '1.0',
        encoding: 'UTF-8',
       });
    urlset.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    urlset.att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
    urlset.att('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd');

    if (environmentDoc && environmentDoc.data() && environmentDoc.data().isUniversal) {
        let array = ['', 'page/all-offers', 'contact'];
        for (const arr of array) {
            let url = urlset.ele('url');
            url.ele('loc', `${baseUrl}/${arr}`);
        }

        if (policies && policies.data()) {
            if ('termsActiveStatus' in policies.data()) {
                let url = urlset.ele('url');
                url.ele('loc', `${baseUrl}/page/terms`);
            }
            if ('shippingActiveStatus' in policies.data()) {
                let url = urlset.ele('url');
                url.ele('loc', `${baseUrl}/page/shipping-policy`);
            }
            if ('refundActiveStatus' in policies.data()) {
                let url = urlset.ele('url');
                url.ele('loc', `${baseUrl}/page/refund-policy`);
            }
            if ('privacyActiveStatus' in policies.data()) {
                let url = urlset.ele('url');
                url.ele('loc', `${baseUrl}/page/privacy-policy`);
            }
            if ('cancelActiveStatus' in policies.data()) {
                let url = urlset.ele('url');
                url.ele('loc', `${baseUrl}/page/cancellation-policy`);
            }
        }
        for (const product of products) {
            //let encodedProdName = encodeURL(product.prodName);
            let url = urlset.ele('url');
            url.ele('loc', `${baseUrl}/product/${product.slug.name}`);
        }
        for (const brand of brands) {
            let url = urlset.ele('url');
            url.ele('loc', `${baseUrl}/brand/${brand.slug.name}`);
        }
        for (const service of services) {
            let encodedServiceName = encodeURL(service.name);
            let url = urlset.ele('url');
            if (service.slug) {
                url.ele('loc', `${baseUrl}/service-response/${service.slug.name}/${service.id}`);
            } else{
                url.ele('loc', `${baseUrl}/service-response/${encodedServiceName}/${service.id}`);
            }
        }
        for (const category of categories) {
            let url = urlset.ele('url');
            url.ele('loc', `${baseUrl}/category/${category.slug.name}`);
        }
        for (const subcategory of subcategories) {
            let url = urlset.ele('url');
            url.ele('loc', `${baseUrl}/category/${subcategory.categorySlugName}/${subcategory.slug.name}`);
        }
        
        const pagesRef = await db.collection('pages').get();
        let pages = [];
        if (pagesRef) {
            pagesRef.forEach(doc => {
                pages.push({id: doc.id, ...doc.data()});
            });
            for (const page of pages) {
                if (page && page.id == 'about') {
                    let url = urlset.ele('url');
                    url.ele('loc', `${baseUrl}/page/about`);
                }
                else if(page && page.id && page.id != 'homepage'){
                    let url = urlset.ele('url');
                    url.ele('loc', `${baseUrl}/${page.slug.name}`);
                }
            }
        }
    } else{ 
        let array = ['', 'about', 'all-offers', 'contact'];
        for (const arr of array) {
            let url = urlset.ele('url');
            url.ele('loc', `${baseUrl}/${arr}`);
        }
        
        if (policies && policies.data()) {
            if ('termsActiveStatus' in policies.data()) {
                let url = urlset.ele('url');
                url.ele('loc', `${baseUrl}/terms-and-conditions`);
            }
            if ('shippingActiveStatus' in policies.data()) {
                let url = urlset.ele('url');
                url.ele('loc', `${baseUrl}/shipping-policy`);
            }
            if ('refundActiveStatus' in policies.data()) {
                let url = urlset.ele('url');
                url.ele('loc', `${baseUrl}/refund-policy`);
            }
            if ('privacyActiveStatus' in policies.data()) {
                let url = urlset.ele('url');
                url.ele('loc', `${baseUrl}/privacy-policy`);
            }
            if ('cancelActiveStatus' in policies.data()) {
                let url = urlset.ele('url');
                url.ele('loc', `${baseUrl}/cancellation-policy`);
            }
        }
        for (const product of products) {
            let encodedProdName = encodeURL(product.prodName);
            let url = urlset.ele('url');
            url.ele('loc', `${baseUrl}/product-details/${encodedProdName}/${product.id}`);
        }
        for (const brand of brands) {
            let encodedBrandName = encodeURL(brand.name);
            let url = urlset.ele('url');
            url.ele('loc', `${baseUrl}/shop/brand/${encodedBrandName}/${brand.id}`);
        }
        for (const service of services) {
            let encodedServiceName = encodeURL(service.name);
            let url = urlset.ele('url');
            url.ele('loc', `${baseUrl}/service-response/${encodedServiceName}/${service.id}`);
        }
        for (const category of categories) {
            let encodedCategoryName = encodeURL(category.name);
            let url = urlset.ele('url');
            url.ele('loc', `${baseUrl}/shop/category/${encodedCategoryName}/${category.id}`);
        }
        for (const subcategory of subcategories) {
            let encodedsubCategoryName = encodeURL(subcategory.name);
            let url = urlset.ele('url');
            url.ele('loc', `${baseUrl}/shop/category/${encodedsubCategoryName}/${subcategory.id}`);
        }
        
        const pagesRef = await db.collection('pages').get();
        let pages = [];
        if (pagesRef) {
            pagesRef.forEach(doc => {
                pages.push({id: doc.id, ...doc.data()});
            });
            for (const page of pages) {
                if (page && page.id == 'about') {
                    let url = urlset.ele('url');
                    url.ele('loc', `${baseUrl}/about`);
                }
                else if (page && page.id == 'homepage') {
                    let url = urlset.ele('url');
                    url.ele('loc', `${baseUrl}/homepage`);
                }
                else if(page && page.id){
                    let encodedName = encodeURL(page.name);
                    let url = urlset.ele('url');
                    url.ele('loc', `${baseUrl}/custom-page/${encodedName}/${page.id}`);
                }
            }
        }
    }

    const xml = urlset.end({ pretty: true });
    res.status(200).contentType('text/xml; charset=utf8').send(xml);
  });
  
exports.robots = functions.https.onRequest(async (req, res) => {
    let robots = `User-agent: Googlebot
    Disallow: 
    User-agent: googlebot-image
    Disallow: 
    User-agent: googlebot-mobile
    Disallow: 
    User-agent: MSNBot
    Disallow: 
    User-agent: Slurp
    Disallow: 
    User-agent: Teoma
    Disallow: 
    User-agent: Gigabot
    Disallow: 
    User-agent: Robozilla
    Disallow: 
    User-agent: Nutch
    Disallow: 
    User-agent: ia_archiver
    Disallow: 
    User-agent: baiduspider
    Disallow: 
    User-agent: naverbot
    Disallow: 
    User-agent: yeti
    Disallow: 
    User-agent: yahoo-mmcrawler
    Disallow: 
    User-agent: psbot
    Disallow: 
    User-agent: yahoo-blogs/v3.9
    Disallow: 
    User-agent: *
    Disallow: 
    Sitemap: ${websiteLink}/sitemap.xml`;

    res.status(200).contentType('text/plain; charset=utf8').send(robots);
  });