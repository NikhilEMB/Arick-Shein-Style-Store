const functions = require("firebase-functions");
var globalFile = require('./global');
var universalFile = require('../universal/universal');
var slugFile = require('../universal/slug');

const {
    firestore
} = require("firebase-admin");
const request = require('request');

const {
    admin,
    db,
    bucket,
    WEB_API_KEY,
    dynamicLinkInfo
} = require('./admin');


exports.deleteProduct = functions.firestore
    .document("products/{productId}")
    .onDelete(async (snap, context) => {
        const productId = context.params.productId;
        try {
            const bestsellerRef = await db.collection('features').doc('bestsellers').collection('products').doc(productId).get();
            if (bestsellerRef && bestsellerRef.data()) {
                await db.collection('features').doc('bestsellers').collection('products').doc(productId).delete();
            }
            const productAnalyticsRef = db.collection('analytics').doc('products');
            await db.runTransaction(t => {
                return t.get(productAnalyticsRef)
                    .then(async (doc) => {
                        if (doc && doc.data()) {
                            let productAnalyticsData = doc.data();
                            console.log('productAnalyticsData', productAnalyticsData.count - 1);
                            t.update(productAnalyticsRef, {
                                count: productAnalyticsData.count - 1
                            });
                        }
                    });
            });
            const optionsRef = await db.collection('products').doc(productId).collection('options').get();
            let options = [];
            optionsRef.forEach(doc => {
                if(doc && doc.id) {
                    options.push(doc.id);
                }
            });
            if(options.length) {
                for (const option of options) {
                    await db.collection('products').doc(productId).collection('options').doc(option).delete();
                }
            }
            return bucket.deleteFiles({
                prefix: `products/${productId}`
            });
        } catch (err) {
            console.dir("Error in delete Product:", err);
            return err;
        }
    });

exports.updateBestSellerProduct = functions.firestore.document('products/{productId}').onUpdate(async (change, context) => {
    const productId = context.params.productId;
    let productData = change.after.data();
    productData = getUpdatedProductFields(productData);
    const productBeforeData = change.before.data();
    const bestsellerRef = await db.collection('features').doc('bestsellers').collection('products').doc(productId).get();
    if (bestsellerRef && bestsellerRef.data()) {
        await db.collection('features').doc('bestsellers').collection('products').doc(productId).update({
            data: productData
        });
    }
    if ((JSON.stringify(productData.color) !== JSON.stringify(productBeforeData.color)) && productData.color.image) {
        productData.color['createdAt'] = new Date();
        await db.collection('variants').doc('colors').collection('options').add(productData.color);
    }
});

exports.makeCopies = functions.https.onCall(async (data, context) => {
    const copies = data.copies;
    const product = data.product.data;
    const productId = data.product.id;
    try {
        let success = await addCopies(copies, product, productId);
        return {
            success: true
        };
    } catch (error) {
        console.log(error);
        return {
            success: false
        };
    }
})

async function addCopies(copies, product, productId) {
    console.log('copies, product', copies, product);
    return new Promise(async (resolve, reject) => {
        try {
            const pdtRef = await db.collection('products').doc(productId).get();
            const pdtData = pdtRef.data();
            if (pdtData) {
                let productName = pdtData.prodName;
                let options = [];
                for (let index = 0; index < copies; index++) {
                    console.log('for index', index);
                    pdtData.prodName = productName + ' ' + 'Option' + ' ' + (index + 1);
                    pdtData.nameToSearch = pdtData.prodName.toLowerCase();
                    pdtData.createdAt = new Date();
                    pdtData.sortedAt = new Date();
                    pdtData.updatedAt = new Date();
                    const optionsRef = await db.collection('products').doc(productId).collection('options').add(pdtData);
                    console.log('optionsRef id', optionsRef.id);
                    options.push({
                        optionId: optionsRef.id,
                        color: pdtData.color ? pdtData.color : {},
                        coverPic: pdtData.coverPic.thumb ? pdtData.coverPic.thumb : pdtData.coverPic.url
                    });
                }
                console.log('options', options);
                if (pdtData.options && pdtData.options.length > 0) {
                    options.forEach(async (option) => {
                        await db.collection('products').doc(productId).update({
                            options: admin.firestore.FieldValue.arrayUnion(option)
                        });
                    });

                } else {
                    await db.collection('products').doc(productId).update({
                        options: options
                    });
                }

                resolve(true);
            } else {
                reject(false);
            }

        } catch (error) {
            console.log('error', error);
            reject(error);
        }

    });
}

exports.onDeleteProductOption = functions.firestore.document('products/{pid}/options/{oid}').onDelete(async (snap, context) => {
    const oid = context.params.oid;
    const pid = context.params.pid;
    const productRef = db.collection('products').doc(pid);
    productRef.get().then(async doc => {
        if(doc.exists) {
            const productData = doc.data();
            const productOptions = productData.options;
            if (productOptions && productOptions.length > 0) {
                for (let index = 0; index < productOptions.length; index++) {
                    if (productOptions[index].optionId === oid) {
                        productOptions.splice(index, 1);
                    }
                }
                await db.collection('products').doc(pid).update({
                    options: productOptions
                });
            }
        }
    });
    const productAnalyticsRef = db.collection('analytics').doc('products');
    await db.runTransaction(t => {
        return t.get(productAnalyticsRef)
            .then(async (doc) => {
                if (doc && doc.data()) {
                    let productAnalyticsData = doc.data();
                    t.update(productAnalyticsRef, {
                        count: productAnalyticsData.count - 1
                    });
                }
            });
    });

})
exports.onUpdateProductOption = functions.runWith({ memory: '1GB', timeoutSeconds: 540 }).firestore.document('products/{pid}/options/{oid}').onUpdate(async (change, context) => {
    const oid = context.params.oid;
    const pid = context.params.pid;
    const optionUpdatedData = change.after.data();
    const optionBeforeData = change.before.data()
    const productRef = await db.collection('products').doc(pid).get();
    const productData = productRef.data();
    const productOptions = productData.options;
    if (productOptions && productOptions.length > 0) {
        for (let index = 0; index < productOptions.length; index++) {
            if (productOptions[index].optionId === oid) {
                productOptions[index].color = optionUpdatedData.color;
                productOptions[index].coverPic = optionUpdatedData.coverPic.thumb ? optionUpdatedData.coverPic.thumb : optionUpdatedData.coverPic.url ? optionUpdatedData.coverPic.url : '';
            }
        }
        await db.collection('products').doc(pid).update({
            options: productOptions
        });
    }
    if ((JSON.stringify(optionUpdatedData.color) !== JSON.stringify(optionBeforeData.color)) && optionUpdatedData.color.image) {
        optionUpdatedData.color['createdAt'] = new Date();
        await db.collection('variants').doc('colors').collection('options').add(optionUpdatedData.color);
    }
    const optionUpdatedFields = getUpdatedProductFields(optionUpdatedData);
    if (JSON.stringify(optionUpdatedFields) !== JSON.stringify(optionUpdatedData)) {
        await db.collection('products').doc(pid).collection('options').doc(oid).update(optionUpdatedFields);
    }

    if(optionBeforeData.productQty === '0' && optionUpdatedFields.productQty !== '0') {
        checkNotifications(optionUpdatedFields.prodName, pid, oid);
    }
});

exports.onCreateProduct = functions.firestore
    .document("products/{productId}")
    .onCreate(async (snap, context) => {
        const productId = context.params.productId;
        const prodData = snap.data();
        const color = prodData.color;
        let isUniversal = false;
        const envDoc = await db.collection('settings').doc('environment').get();
        if (envDoc.data() && envDoc.data().hasOwnProperty('isUniversal')){
            isUniversal = envDoc.data().isUniversal;
        }
        if (color && color.image) {
            color['createdAt'] = new Date();
            await db.collection('variants').doc('colors').collection('options').add(color);
        }
        await createDynamicLink(productId, prodData.prodName);

        const sameProdNames = await db.collection('products').where('prodName', '==', prodData.prodName).get();
        let products = [];
        sameProdNames.forEach(async (doc) => {
            products.push({id: doc.id, ...doc.data()});
        });
        if (!products.length) {
            products[0] = {id: productId, ...prodData}
        }
        if (isUniversal) {
            const slugName = await slugFile.generateSlugs({choice: 'products', mode: 'onCreate'}, products);
             //await universalFile.createJsonFile('products', 'new', productId, {product: prodData});
             await db.collection('management').doc('universal').collection('product-updates').doc(slugName).set({mode: 'new', data: {product: prodData}});
        }
    });


exports.onCreateProductOptions = functions.firestore
    .document("products/{productId}/options/{optionId}")
    .onCreate(async (snap, context) => {
        const productId = context.params.productId;
        const optionId = context.params.optionId;
        const prodOptionData = snap.data();

        let isUniversal = false;
        const envDoc = await db.collection('settings').doc('environment').get();
        if (envDoc.data() && envDoc.data().hasOwnProperty('isUniversal')){
            isUniversal = envDoc.data().isUniversal;
        }
        
        const sameProdNames = await db.collection('products').doc(productId).collection('options').where('prodName', '==', prodOptionData.prodName).get();
        let products = [];
        sameProdNames.forEach(async (doc) => {
            products.push({id: doc.id, ...doc.data()});
        });
        if (!products.length) {
            products[0] = {id: optionId, ...prodOptionData}
        }
        console.log('onCreateProductOptions');
        if (isUniversal) {
            console.log('onCreateProductOptions isUniversal', isUniversal);
            await slugFile.generateSlugs({choice: 'options', productId}, products);
        }
    });


// createDynamicLink('j4qPxux9vIAOy8sAinOi');

async function createDynamicLink(pid, name) {
    const body = {
        'dynamicLinkInfo': {
            'domainUriPrefix': dynamicLinkInfo.domainUriPrefix,
            'link': `${dynamicLinkInfo.deepLinkURL}/${name}/${pid}/`,
            "androidInfo": {
                "androidPackageName": dynamicLinkInfo.androidPackageName
            },
            "iosInfo": {
                "iosBundleId": dynamicLinkInfo.iosBundleId
            }
        }
    }
    request({
        url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${WEB_API_KEY}`,
        method: 'POST',
        json: true,
        body
    }, async function (error, response) {
        if (error) {
            console.log('Error :', error)
        } else {
            if (response && response.statusCode !== 200) {
                console.log('Error on Request :', response.body.error.message)
            } else {
                console.log('Dynamic Link :', response.body);
                await db.collection('products').doc(pid).update({
                    dynamicLink: response.body.shortLink
                });
            }
        }
    });
}

exports.sendPriceRequest = functions.https.onCall(async (data, context) => {
    console.log('uid:', data);
    const uid = data;
    const userRef = await db.collection('users').doc(uid).get();
    const userData = userRef.data();
    const prObj = {
        name: userData.name,
        phoneNo: userData.phoneNo,
        profilePic: userData.dP,
        createdOn: new Date(),
        active: false
    }

    const priceReqRef = db.collection('priceRequests').doc(uid);
    let docExists = await checkPriceReqDocExist(priceReqRef);
    console.log('docExists', docExists);
    try {
        if (!docExists) {
            await db.collection('priceRequests').doc(uid).set(prObj);
            await db.collection('users').doc(uid).update({
                showPrices: false
            });
            await sendPriceReqMsg(uid);
            return {
                status: 'sent'
            };
        } else {
            return {
                status: 'already_sent'
            };
        }
    } catch (error) {
        console.dir(error);
        return {
            status: 'not_sent',
            error: error
        };
    }

});

async function sendPriceReqMsg(userId) {
    return new Promise(async (resolve, reject) => {
        const chatRef = db.collection('chats').doc(userId);
        const chatMessageRef = await db.collection('chats').doc(userId).get();
        const chatData = chatMessageRef.data();
        console.log('chatDoc', chatData);
        if (chatData.adminActive === false) {
            await chatRef.update({
                lastMessage: 'I want to see prices of the products.',
                lastMessageAt: new Date(),
                totalMsgs: chatData.totalMsgs + 1,
                unreadMsgs: chatData.unreadMsgs + 1
            });
            await db.collection('chats').doc(userId).collection('messages').add({
                type: 'txt',
                createdAt: new Date(),
                author: 'user',
                isRead: false,
                published: true,
                message: 'I want to see prices of the products.'
            });
            resolve(true);
        } else {
            await chatRef.update({
                lastMessage: 'I want to see prices of the products.',
                lastMessageAt: new Date(),
                totalMsgs: chatData.totalMsgs + 1
            });

            await db.collection('chats').doc(userId).collection('messages').add({
                type: 'txt',
                createdAt: new Date(),
                author: 'user',
                isRead: true,
                published: true,
                message: 'I want to see prices of the products.'
            });
            resolve(true);
        }
    });

}

function checkPriceReqDocExist(ref) {
    return new Promise((resolve, reject) => {
        ref.get().then((doc) => {
            if (doc.exists) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })
}

exports.acceptPriceRequest = functions.https.onCall(async (uid, context) => {
    try {
        await db.collection('priceRequests').doc(uid).update({
            active: true
        });
        await db.collection('users').doc(uid).update({
            showPrices: true
        });
        await acceptPriceRequestMsg(uid);
        return {
            status: 'accepted'
        };
    } catch (error) {
        console.log(error);
        return {
            status: 'not_accepted'
        }
    }
});

async function acceptPriceRequestMsg(userId) {
    return new Promise(async (resolve, reject) => {
        const chatRef = db.collection('chats').doc(userId);
        const chatMessageRef = await db.collection('chats').doc(userId).get();
        const chatData = chatMessageRef.data();
        console.log('chatDoc', chatData);
        if (chatData.userActive === false) {
            await chatRef.update({
                lastMessage: 'I have accepted your price request. You can now view prices or place orders.',
                lastMessageAt: new Date(),
                totalMsgs: chatData.totalMsgs + 1,
                unreadAdminMsgs: chatData.unreadAdminMsgs + 1
            });
            await db.collection('chats').doc(userId).collection('messages').add({
                type: 'txt',
                createdAt: new Date(),
                author: 'admin',
                isRead: false,
                published: true,
                message: 'I have accepted your price request. You can now view prices or place orders.'
            });
            resolve(true);
        } else {
            await chatRef.update({
                lastMessage: 'I have accepted your price request. You can now view prices or place orders.',
                lastMessageAt: new Date(),
                totalMsgs: chatData.totalMsgs + 1
            });

            await db.collection('chats').doc(userId).collection('messages').add({
                type: 'txt',
                createdAt: new Date(),
                author: 'admin',
                isRead: true,
                published: true,
                message: 'I have accepted your price request. You can now view prices or place orders.'
            });
            resolve(true);
        }
    });

}

exports.editProductFieldsOnCreate = functions.firestore.document('products/{productId}').onCreate(async (snap, context) => {
    let productData = snap.data();
    const pid = context.params.productId;

    let updatedProduct = getUpdatedProductFields(productData);
    const [categoryRegions, categoryNames] = await getRegionsAndName(productData.categories || [], 'categories');
    const [brandRegions, brandNames] = await getRegionsAndName(productData.brands || [], 'brands');

    productData['categoryRegions'] = categoryRegions;
    productData['brandRegions'] = brandRegions;
    updatedProduct['categoryRegions'] = categoryRegions;
    updatedProduct['brandRegions'] = brandRegions;
    updatedProduct['searchKeywords'] = categoryNames.concat(brandNames);

    if(productData.vendorId) {
        const vendor = await getVendorData(productData.vendorId);
        if(vendor && (vendor.name || vendor.displayName)) {
            updatedProduct['vendorName'] = vendor.displayName || vendor.name;
        }
    }

    if(JSON.stringify(productData) !== JSON.stringify(updatedProduct) || (categoryRegions.length > 0 || brandRegions.length > 0) || updatedProduct.searchKeywords.length > 0) {
        const updateRes = await updateProductFields(pid, updatedProduct);
        return updateRes;
    } else {
        return 'update not required';
    }
});

exports.editProductFieldsOnUpdate = functions.firestore.document('products/{productId}').onUpdate(async (change, context) => {
    let productData = change.after.data();
    const oldProductData = change.before.data();
    const pid = context.params.productId;
    let updatedProduct = getUpdatedProductFields(productData);
    
    let isUniversal = false;
    const envDoc = await db.collection('settings').doc('environment').get();
    if (envDoc.data() && envDoc.data().hasOwnProperty('isUniversal')){
        isUniversal = envDoc.data().isUniversal;
    }

    if (JSON.stringify(updatedProduct) !== JSON.stringify(oldProductData)) {
        console.log('data changed...');
        const [categoryRegions, categoryNames] = await getRegionsAndName(updatedProduct.categories || [], 'categories');
        const [brandRegions, brandNames] = await getRegionsAndName(updatedProduct.brands || [], 'brands');
        
        updatedProduct['categoryRegions'] = categoryRegions;
        updatedProduct['brandRegions'] = brandRegions;
        updatedProduct['searchKeywords'] = categoryNames.concat(brandNames);

        if(oldProductData.vendorId !== updatedProduct.vendorId) {
            const vendor = await getVendorData(updatedProduct.vendorId);
            if(vendor && (vendor.name || vendor.displayName)) {
                updatedProduct['vendorName'] = vendor.displayName || vendor.name;
            }
        }

        const updateRes = await updateProductFields(pid, updatedProduct); 

        if (isUniversal) {
            if (oldProductData.prodName!= productData.prodName || oldProductData.prodDesc != productData.prodDesc || oldProductData.discountedPrice != productData.discountedPrice) {
                // await universalFile.createJsonFile('products', 'edit', pid, {product: productData});
                await db.collection('management').doc('universal').collection('product-updates').doc(productData.slug.name).set({mode: 'edit', data: {product: productData}});
            }
            else if(oldProductData.slug.name != productData.slug.name) {
                await db.collection('management').doc('universal').collection('product-updates').doc(productData.slug.name).set({mode: 'new', data: {product: productData}});
            }
        }
        return updateRes;
    } else {
        return 'update not required';
    }
});

function getUpdatedProductFields(p) {
    if (!p.hasOwnProperty('subscription')) {
        p.subscription = {
            isAllowed: false,
            dailyDiscount: 0,
            monthlyDiscount: 0,
            weeklyDiscount: 0
        }
    }
    if (!p.isPriceList) {
        if (p.hasOwnProperty('discountedPrice') && (typeof p.discountedPrice === 'string' || p.discountedPrice instanceof String)) {
            p.discountedPrice = parseInt(p.discountedPrice);
        }
        if (p.hasOwnProperty('prodPrice') && (typeof p.prodPrice === 'string' || p.prodPrice instanceof String)) {
            p.prodPrice = parseInt(p.prodPrice);
        }
        if (p.hasOwnProperty('discountedPrice') && p.discountedPrice === null) {
            p.discountedPrice = parseInt(p.prodPrice);
        }
        if (!p.hasOwnProperty('discountedPrice')) {
            p.discountedPrice = parseInt(p.prodPrice);
        }
        p['discount'] = parseFloat((((p.prodPrice - p.discountedPrice) / p.prodPrice) * 100).toFixed(2));
        
        if(!p.hasOwnProperty('totalSku')) {
            if(p.productCode) {
                p.totalSku = [p.productCode];
            }
        }
    } else {
        let dPList = [];
        let plDiscountList = [];
        let makeProductQtyZero = false;
        let totalSku = [];
        p.priceList.map((pl) => {
            if (pl.hasOwnProperty('discountedPrice') && (typeof pl.discountedPrice === 'string' || pl.discountedPrice instanceof String)) {
                pl.discountedPrice = parseInt(pl.discountedPrice);
            }
            if (pl.hasOwnProperty('price') && (typeof pl.price === 'string' || pl.price instanceof String)) {
                pl.price = parseInt(pl.price);
            }
            if (pl.hasOwnProperty('discountedPrice') && pl.discountedPrice === null) {
                pl.discountedPrice = parseInt(pl.price);
            }
            if (!pl.hasOwnProperty('discountedPrice')) {
                pl.discountedPrice = parseInt(pl.price);
            }
            if (pl.hasOwnProperty('discountedPrice')) {
                dPList.push(pl.discountedPrice);
            }
            const plDiscount = ((pl.price - pl.discountedPrice) / pl.price) * 100;
            plDiscountList.push(plDiscount);
            if (pl.hasOwnProperty('totalQuantity') && pl.totalQuantity === '0') {
                makeProductQtyZero = true;
            }
            if(pl.sku) {
                totalSku.push(pl.sku);
            }
        });
        if(!totalSku.length && p.productCode) {
            totalSku = [p.productCode];
        }

        p.totalSku = p.totalSku || [];

        let sameSku = totalSku.length === p.totalSku.length &&
        totalSku.every((element) => {
          return p.totalSku.indexOf(element) !== -1;
        });

        if(!sameSku) {
            p.totalSku = totalSku;
        }

        const minPrice = Math.min(...dPList);
        p.discountedPrice = minPrice;
        p['discount'] = parseFloat((Math.max(...plDiscountList)).toFixed(2));
        if (makeProductQtyZero) {
            p['productQty'] = '0';
        } else {
            p['productQty'] = '';
        }
    }
    if(!p.hasOwnProperty('productType')) {
        p.productType = '';
    }
    return p;
}

async function getRegionsAndName(arr, type) {
    return new Promise(async (resolve, reject) => {
        let allRegions = [];
        let names = [];
        if(arr.length) {
            for (const id of arr) {
                const doc = await db.collection(`${type}`).doc(id).get();
                if (doc.data()) {
                    const data = doc.data();
                    names.push(data.name || '');
                    const regions = data.regionId || [];
                    for (const region of regions) {
                        if(!allRegions.includes(region)) {
                            allRegions.push(region);
                        }
                    }
                }
            }
        }
        resolve([allRegions, names]);
        
    });
}

async function updateProductFields(pid, updatedProduct) {
    return new Promise(async (resolve, reject) => {
        await db.collection('products').doc(pid).update({
            subscription: updatedProduct['subscription'],
            discountedPrice: updatedProduct['discountedPrice'],
            prodPrice: updatedProduct['prodPrice'] || null,
            discount: updatedProduct['discount'],
            productQty: updatedProduct['productQty'] || '',
            categoryRegions: updatedProduct['categoryRegions'],
            brandRegions: updatedProduct['brandRegions'],
            searchKeywords: admin.firestore.FieldValue.arrayUnion(...updatedProduct['searchKeywords']),
            vendorName: updatedProduct['vendorName'] || ''
        });
        resolve('product updated');
    });
}

exports.notifyUsersForProductStock = functions.runWith({ memory: '1GB', timeoutSeconds: 540 }).firestore.document('products/{productId}').onUpdate(async (change, context) => {
    const after = change.after.data();
    const before = change.before.data();
    const pid = context.params.productId;

    if(before.productQty === '0' && after.productQty !== '0') {
        await checkNotifications(after.prodName, pid);
    }
    return;
});

async function checkNotifications(productName, productId, optionId = '') {
    const productRef = db.collection('products').doc(productId);
    const chatData = {
        message: `Hurray! ${productName} you requested for is now available for ordering.`,
        title: 'Back In Stock!',
        author: 'admin',
        type: 'link',
        productId,
        productName,
        btns: [
            {
                txt: 'View Product',
                task: 'productView'
            },
        ]
    };
    const usersIds = [];
    if(optionId) {
        const notifRef = await productRef.collection('options').doc(optionId).collection('notifications').get();
        notifRef.forEach(doc => {
            if(doc && doc.id) {
                usersIds.push(doc.id);
            }
        });
    } else {
        const notifRef = await productRef.collection('notifications').get();
        notifRef.forEach(doc => {
            if(doc && doc.id) {
                usersIds.push(doc.id);
            }
        });
    }
    if(usersIds.length) {
        for (const uid of usersIds) {
            await globalFile.chatMessage(chatData, uid);
            if(optionId) {
                await productRef.collection('options').doc(optionId).collection('notifications').doc(uid).delete();
            } else {
                await productRef.collection('notifications').doc(uid).delete();
            }
        }
    }
}


async function getVendorData(vendorId) {
    return new Promise(async (resolve) => {
        try {
            const vendorRef = await db.collection('features').doc('multiVendor').collection('vendors').doc(vendorId).get();
            const vendor = vendorRef.data();
            resolve(vendor);
        } catch (error) {
            console.log(error);
        }
    });
}


exports.makeProductClones = functions.https.onCall(async (data, context) => {
    const clones = data.clones;
    const productId = data.productId;
    try {
        let success = await addClones(clones, productId);
        return {
            success: true
        };
    } catch (error) {
        console.log(error);
        return {
            success: false
        };
    }
})

async function addClones(clones, productId) {
    return new Promise(async (resolve, reject) => {
        try {
            const pdtRef = await db.collection('products').doc(productId).get();
            const pdtData = pdtRef.data();
            if (pdtData) {
                let productName = pdtData.prodName;
                for (let index = 0; index < clones; index++) {
                    console.log('for index', index);
                    pdtData.prodName = productName + ' ' + 'Clone' + ' ' + (index + 1);
                    pdtData.nameToSearch = pdtData.prodName.toLowerCase();
                    pdtData.createdAt = new Date();
                    pdtData.sortedAt = new Date();
                    pdtData.updatedAt = new Date();
                    await db.collection('products').add(pdtData);
                }
                resolve(true);
            } else {
                reject(false);
            }
        } catch (error) {
            console.log('error', error);
            reject(error);
        }
    });
}


exports.makeVariantsOnProductCreate = functions.firestore.document('products/{productId}').onCreate(async (snap, context) => {
    let product = snap.data();
    const productId = context.params.productId;
    if(product && product.priceList && product.priceList.length) {
        let option1 = [];
        let option2 = [];
        let needToUpdate = false;
        product.priceList.forEach(el => {
            if(el.weight && el.weight.includes('/')) {
                needToUpdate = true;
                const splittedWeight = el.weight.split('/');
                option1.push(splittedWeight[0].trim());
                option2.push(splittedWeight[1].trim());
            }
        });
        if(option1.length) {
            option1 = [...new Set(option1)];
        }
        if(option2.length) {
            option2 = [...new Set(option2)];
        }
        let variants = {
            option1, option2
        }
        if(needToUpdate) {
            await db.collection('products').doc(productId).update({variants});
        }
    }
});

exports.makeVariantsOnProductUpdate = functions.firestore.document('products/{productId}').onUpdate(async (change, context) => {
    let after = change.after.data();
    let before = change.before.data();
    const productId = context.params.productId;
    if(!before.priceList || !before.priceList.length) {
        before.priceList = [];
    }
    if(!after.priceList || !after.priceList.length) {
        after.priceList = [];
    }
    if(JSON.stringify(before.priceList) !== JSON.stringify(after.priceList) && after.priceList.length) {
        let option1 = [];
        let option2 = [];
        let needToUpdate = false;
        after.priceList.forEach(el => {
            if(el.weight && el.weight.includes('/')) {
                needToUpdate = true;
                const splittedWeight = el.weight.split('/');
                option1.push(splittedWeight[0].trim());
                option2.push(splittedWeight[1].trim());
            }
        });
        if(option1.length) {
            option1 = [...new Set(option1)];
        }
        if(option2.length) {
            option2 = [...new Set(option2)];
        }
        let variants = {
            option1, option2
        }
        if(needToUpdate) {
            await db.collection('products').doc(productId).update({variants});
        }
    }
});