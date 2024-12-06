const functions = require("firebase-functions");
var https = require('https');
var moment = require('moment-timezone');
var globalFile = require('./global');
var paymentsFile = require('./payments');
const querystring = require('querystring');
const fmt = require('indian-number-format')
const axios = require('axios').default;
const QRCode = require('qrcode');
const stream = require('stream');

const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("../vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
    },
    SakalBharati: {
        normal: "SakalBharati_N_Ship.ttf",
        bold: 'SakalBharati_N_Ship.ttf',
        italics: 'SakalBharati_N_Ship.ttf',
        bolditalics: 'SakalBharati_N_Ship.ttf'
    }
};
const {
    db,
    bucket,
    orderIdPrefix,
    googleMapKey,
    currencySymbol,
    country,
    taxType,
    timeZone,
    taxName,
    middleware,
    projectId,
    firebaseLocation
} = require('./admin');

// const margAPI = require('../integrations/external/marg');

exports.onCreateOrderUpdateOrderId = functions.runWith({
    timeoutSeconds: 120
}).firestore.document('orders/{orderId}').onCreate(async (snap, context) => {
    const ordersMetaDataRef = db.collection('ordersMetaData').doc('metadata');
    const orderId = context.params.orderId;
    let order = snap.data();
    let lastOrderIdValue = 0;
    await db.runTransaction(t => {
        return t.get(ordersMetaDataRef)
            .then(async doc => {
                if (doc.exists) {
                    var ordersMetaData = doc.data();
                    lastOrderIdValue = ordersMetaData.lastOrderId + 1;
                    t.update(ordersMetaDataRef, {
                        lastOrderId: lastOrderIdValue
                    });
                    const orderRef = snap.ref;
                    t.update(orderRef, {
                        orderId: lastOrderIdValue
                    });
                    const orderData = snap.data();
                    const userId = orderData.userId;
                    const msgId = orderData.msgId;
                    const chatRef = db.collection('chats').doc(userId);
                    const chatMessageRef = await db.collection('chats').doc(userId).get();
                    const chatData = chatMessageRef.data();
                    if (chatData && chatData.adminActive === false) {
                        t.update(chatRef, {
                            lastMessage: 'A new order has been placed, click here to see details.',
                            lastMessageAt: new Date(),
                            totalMsgs: chatData.totalMsgs + 1,
                            unreadMsgs: chatData.unreadMsgs + 1
                        });
                        const msgRef = db.collection('chats').doc(userId).collection('messages').doc(msgId);
                        t.set(msgRef, {
                            type: 'order',
                            status: 'Pending',
                            createdAt: new Date(),
                            author: 'user',
                            isRead: false,
                            published: true,
                            orderId: lastOrderIdValue
                        })
                    } else {
                        if (chatData) {
                            t.update(chatRef, {
                                lastMessage: 'A new order has been placed, click here to see details.',
                                lastMessageAt: new Date(),
                                totalMsgs: chatData.totalMsgs + 1
                            });
                            const msgRef = db.collection('chats').doc(userId).collection('messages').doc(msgId);
                            t.set(msgRef, {
                                type: 'order',
                                status: 'Pending',
                                createdAt: new Date(),
                                author: 'user',
                                isRead: true,
                                published: true,
                                orderId: lastOrderIdValue
                            });
                        }
                    }


                } else {
                    t.set(ordersMetaDataRef, {
                        lastOrderId: 1001
                    });
                    const orderRef = snap.ref;
                    t.update(orderRef, {
                        orderId: 1001
                    });
                    const orderData = snap.data();
                    const userId = orderData.userId;
                    const msgId = orderData.msgId;
                    const chatRef = db.collection('chats').doc(userId);
                    const chatMessageRef = await db.collection('chats').doc(userId).get();
                    const chatData = chatMessageRef.data();
                    if (chatData && chatData.adminActive === false) {
                        t.update(chatRef, {
                            lastMessage: 'A new order has been placed, click here to see details.',
                            lastMessageAt: new Date(),
                            totalMsgs: chatData.totalMsgs + 1,
                            unreadMsgs: chatData.unreadMsgs + 1
                        });
                        const msgRef = db.collection('chats').doc(userId).collection('messages').doc(msgId);
                        t.set(msgRef, {
                            type: 'order',
                            status: 'Pending',
                            createdAt: new Date(),
                            author: 'user',
                            isRead: false,
                            published: true,
                            orderId: 1001
                        })
                    } else {
                        if (chatData) {
                            t.update(chatRef, {
                                lastMessage: 'A new order has been placed, click here to see details.',
                                lastMessageAt: new Date(),
                                totalMsgs: chatData.totalMsgs + 1
                            });
                            const msgRef = db.collection('chats').doc(userId).collection('messages').doc(msgId);
                            t.set(msgRef, {
                                type: 'order',
                                status: 'Pending',
                                createdAt: new Date(),
                                author: 'user',
                                isRead: true,
                                published: true,
                                orderId: 1001
                            })
                        }
                    }
                }
            });
    });

    order.orderId = lastOrderIdValue;


    if (order.couponId && order.userId && order.couponId !== '' && order.userId) {
        await db.collection('features').doc('coupons').collection('codes').doc(order.couponId).collection('usage').add({
            userId: order.userId,
            orderId: orderId,
            createdAt: new Date()
        });
        const couponRef = db.collection('features').doc('coupons').collection('codes').doc(order.couponId);
        await db.runTransaction(t => {
            return t.get(couponRef)
                .then(doc => {
                    var couponDoc = doc.data();
                    t.update(couponRef, {
                        usage: couponDoc.usage + 1
                    });

                });
        });
    }

    if(order.userName === 'mayank' || order.userName === 'user') {
        const userRef = await db.collection('users').doc(order.userId).get();
        const user = userRef.data();
        if(user) {
            await db.collection('orders').doc(orderId).update({userName: user.name});
            order.userName = user.name;
        }
    }

    if (order.products.length > 0 && (!order.hasOwnProperty('orderType') || (order.hasOwnProperty('orderType') && order.orderType !== 'subscription'))) {
        let products = order.products;
        let needToUpdate = false;
        for (let i = 0; i < products.length; i++) {
            if (products[i] && products[i].quantity) {
                needToUpdate = true;
                if (!products[i].img.hasOwnProperty('thumb') || !products[i].img.thumb) {
                    products[i].img.thumb = products[i].img.url;
                }
                if (!products[i].img.hasOwnProperty('mob') || !products[i].img.mob) {
                    products[i].img.mob = products[i].img.url;
                }
                if (products[i].hasOwnProperty('orderType') && products[i].orderType === 'subscription') {
                    let subData = products[i].subData;
                    let totalMrp = 0;
                    let offerDiscount = 0;
                    let amountPayable = 0;
                    if (products[i].hasOwnProperty('mrpPrice')) {
                        totalMrp = products[i].mrpPrice * products[i].quantity;
                    } else {
                        totalMrp = products[i].price * products[i].quantity;
                    }
                    amountPayable = products[i].price * products[i].quantity;
                    offerDiscount = totalMrp - amountPayable;
                    subData.offerDiscount = offerDiscount;
                    subData.amountPayable = amountPayable;
                    subData.totalMrp = totalMrp;
                    subData['address'] = order.address;
                    subData['billingAddress'] = order.billingAddress;
                    subData['payment'] = order.payment;
                    subData['createdAt'] = order.createdAt;
                    subData['deliveryLatLng'] = order.hasOwnProperty('deliveryLatLng') ? order.deliveryLatLng : {};
                    subData['userId'] = order.userId;
                    subData['userName'] = order.userName;
                    subData['orderId'] = orderId;
                    subData['commentMsg'] = products[i].commentMsg;
                    subData['deliverySlot'] = subData.deliverySlot === null ? {} : subData.deliverySlot;
                    products[i].subData = subData;
                    if (order.payment.mode === 'cash' || (order.payment && order.payment.completed)) {
                        subData['ordersAt'] = getAllOrdersDate(subData);
                        await db.collection('subscriptions').add(subData);
                    }

                } else {
                    if (order.payment.mode === 'cash' || (order.payment && order.payment.completed)) {
                        if (!('metaData' in order) || !order.metaData.inventoryManaged) {
                            await inventoryManagement(products[i]);
                        }
                        if (products[i].hasOwnProperty('orderType') && products[i].orderType === 'membership') {
                            await createMembership(products[i].membershipSettings, order, orderId);
                        }
                    }
                }
            }
            if (products[i].hasOwnProperty('pack') && products[i].pack.variantType === 'pieces') {
                needToUpdate = true;
                products[i]['totalPieces'] = parseInt(products[i].pack.weight) * products[i].quantity;
                products[i].price = products[i].price * products[i].quantity;
            }
        }
        if (needToUpdate) {
            const updateObj = {products};
            if (!('metaData' in order) || !order.metaData.inventoryManaged) {
                updateObj['metaData.inventoryManaged'] = true;
            }
            await db.collection('orders').doc(orderId).update(updateObj);
        }
    }

    if (!order.hasOwnProperty('defaultGst')) {
        let price = 0;
        if (order.products.length > 0 && (!order.hasOwnProperty('orderType') || (order.hasOwnProperty('orderType') && order.orderType !== 'subscription'))) {
            for (let i = 0; i < order.products.length; i++) {
                price += order.products[i].price * order.products[i].quantity;
            }
            await db.collection('orders').doc(orderId).update({
                couponDiscount: 0,
                couponId: '',
                defaultGst: 0,
                scheduledDate: '',
                scheduledTime: '',
                productsPrice: price,
                totalAmountToPaid: price + order.delivery
            });
        }
    }

    if (order.scheduledDate && order.scheduledDate !== '') {
        if (typeof order.scheduledDate === 'string' || order.scheduledDate instanceof String) {
            await db.collection('orders').doc(orderId).update({
                scheduledDate: new Date(order.scheduledDate)
            });
        }
    }


    if (!order.hasOwnProperty('billingAddress') || !order.billingAddress) {
        order['billingAddress'] = order.address;
        await db.collection('orders').doc(orderId).update({
            billingAddress: order.address
        });
    }
    if (!order.hasOwnProperty('customerGstNo')) {
        order['customerGstNo'] = '';
        await db.collection('orders').doc(orderId).update({
            customerGstNo: ''
        });
    }
    if (!order.hasOwnProperty('deliveryGstObj')) {
        order['deliveryGstObj'] = {
            total: 0,
            value: 0
        }
        await db.collection('orders').doc(orderId).update({
            deliveryGstObj: order['deliveryGstObj']
        });
    }
    if (!order.hasOwnProperty('discountOnMrp')) {
        order['discountOnMrp'] = 0;
        await db.collection('orders').doc(orderId).update({
            discountOnMrp: 0
        });
    }
    if (!order.hasOwnProperty('storePickupObj')) {
        order['storePickupObj'] = {};
        await db.collection('orders').doc(orderId).update({
            storePickupObj: order['storePickupObj']
        });
    }
    if (!order.hasOwnProperty('walletAmount')) {
        order['walletAmount'] = 0;
        await db.collection('orders').doc(orderId).update({
            walletAmount: 0
        });
    }
    let totalPrice = 0;
    if (order.products.length > 0 && (!order.hasOwnProperty('orderType') || (order.hasOwnProperty('orderType') && order.orderType !== 'subscription'))) {
        order.products.forEach((p) => {
            totalPrice += p.price * p.quantity;
        });
    }

    if (!order.hasOwnProperty('totalMrp') && order.products.length > 0 && (!order.hasOwnProperty('orderType') || (order.hasOwnProperty('orderType') && order.orderType !== 'subscription'))) {
        order['totalMrp'] = totalPrice;
        await db.collection('orders').doc(orderId).update({
            totalMrp: totalPrice
        });
    }

    if (!order.hasOwnProperty('couponName')) {
        const couponId = order.couponId ? order.couponId : '';
        if (couponId) {
            const name = await getCouponName(couponId);
            if (name !== 'no_coupon') {
                await db.collection('orders').doc(orderId).update({
                    couponName: name
                });
            }
        }
    }

    if (typeof order.totalAmountToPaid === 'string' || order.totalAmountToPaid instanceof String) {
        await db.collection('orders').doc(orderId).update({
            totalAmountToPaid: parseFloat(order.totalAmountToPaid)
        });
    }



    await updateGstValues(order, orderId);
    await assignDeliveryAgent(order.userId, orderId);

    if(order.status === 'Confirmed') {
        order.invoiceNo = await generateInvoiceNoForConfirmedOrders(orderId);
    }

    if ((order.payment.mode === 'cash' || (order.payment && order.payment.completed)) && (!order.hasOwnProperty('orderType') || (order.hasOwnProperty('orderType') && order.orderType !== 'subscription'))) {
        const paymentInfo = await getPaymentSettingsInfo();
        if (!paymentInfo.hasOwnProperty('generateInvoice') || paymentInfo.generateInvoice) {
            const orderInvoice = await generateInvoice(lastOrderIdValue, order, orderId);
            console.log('orderInvoice', orderInvoice);
        }
        await manageSlots(order, 'increase');
        await vendorsCheck(order, orderId);
    }

    await checkForReferrerCashback(order.userId, orderId);

    await addUserAdditionalInfo(order.userId, orderId);

    await addUsageLimitOfFreeProducts(order.freeProductsAdded || [], order.userId);

    if (order.hasOwnProperty('customerGstNo')) {
        await db.collection('users').doc(order.userId).update({
            customerGstNo: order.customerGstNo
        });
    }

    if (order.status === 'Pending') {
        await saveOrderTimeLine(orderId, 'Pending');
    } else {
        await saveOrderTimeLine(orderId, 'Pending');
        await saveOrderTimeLine(orderId, 'Confirmed');

    }

    if (order.payment.mode === 'cash') {
        await saveOrderLogs(orderId, 'Payment mode set to cash');
    }

    if (order.payment && order.payment.completed) {
        await saveOrderLogs(orderId, 'Payment completed');
    }

    if ('metaData' in order && order.metaData.source === 'ios') {
        updatePiecesPriceIssue(order, orderId);
    }

    if ('address' in order && (!order.address.lat || !order.address.lng)) {
        const userDoc = await db.collection('users').doc(order.userId).get();
        const user = userDoc.data();
        await db.collection('orders').doc(orderId).update({
            'address.lat': user.defaultAddress.lat,
            'address.lng': user.defaultAddress.lng,
        });
    }

    // await margAPI.insertOrderInMarg(order);

    order = await checkOrderAddressLatLngAvailability(order, orderId);

    if(order.status === 'Confirmed') {
        await checkNearbyDeliveryAgents(order, orderId);
    }
    
    await addDeliveryExternalIntegration(orderId);

    await generateDeliveryVerificationOtp(orderId);

    await generateQRCode(orderId);

    await clearUserCart(order.userId);

    if (!("userPhoneNo" in order) || order.userPhoneNo === '') {
        await addUserPhoneNoByUserId(order.userId, orderId);
    }

    return "Order process completed";

});

const addUserPhoneNoByUserId = async (userId, orderId) => {
    console.log("userId", userId);
    return new Promise(async (resolve) => {
        const userRef = await db.collection("users").doc(userId).get();
        const userData = userRef.data();
        const phoneNo = 'phoneNo' in userData ? userData.phoneNo : '';
        await db.collection('orders').doc(orderId).update({ userPhoneNo: phoneNo });
        resolve(true);
    }).catch((error) => {
        console.log("addUserPhoneNoByUserId error", error);
        resolve(false);
    });
}

async function checkNearbyDeliveryAgents(order, orderId) {
    const settingsDoc = await db.collection('settings').doc('store').get();
    const settings = settingsDoc.data();
    if(settings && 'deliveryAcceptanceModel' in settings && settings.deliveryAcceptanceModel.active) {
        const radius = settings.deliveryAcceptanceModel.radius;
        const deliveryAgents = [];
        // const nearbyAgents = [];
        const usersRef = await db.collection('users').where('role', '==', 'deliveryAgent').get();
        usersRef.forEach(doc => {
            if(doc && doc.id && doc.data()) {
                deliveryAgents.push({id: doc.id, ...doc.data()});
            }
        });

        const orderDeliveryLocation = {lat: order.address.lat, lng: order.address.lng}; 
        for (const agent of deliveryAgents) {
            const agentLocation = {lat: agent.latitude, lng: agent.longitude};
            let distanceRes = await getDistance(agentLocation, orderDeliveryLocation);
            let distance = 0;
            if (distanceRes.rows[0].elements && distanceRes.rows[0].elements[0] && distanceRes.rows[0].elements[0].distance) {
                distance = parseFloat((distanceRes.rows[0].elements[0].distance.value / 1000).toFixed(2));
            }
            if(radius >= distance) {
                // nearbyAgents.push(agent);
                await db.collection('users').doc(agent.id).collection('nearbyOrders').doc(orderId).set({...order});
            }
        }
    }
}

// async function test() {
//     const order = await db.collection('orders').doc('pTJs7D1887JR4XEgiiQX').get();
//     checkOrderAddressLatLngAvailability(order.data(), 'pTJs7D1887JR4XEgiiQX')
// }

// test()

async function checkOrderAddressLatLngAvailability(order, orderId) {
    try {
        let updateObj = {};
        if(order.address.id && !order.address.lat) {
            const userDoc = await db.collection('users').doc(order.userId).collection('addresses').doc(order.address.id).get();
            if(userDoc && userDoc.data()) {
                const lat = userDoc.data().lat;
                const lng = userDoc.data().lng;
                if(lat && lng) {
                    updateObj['address.lat'] = lat;
                    updateObj['address.lng'] = lng;
                    order.address.lat = lat;
                    order.address.lng = lng;
                }
            }
        }
        if(!order.deliveryLatLng) {
            updateObj['deliveryLatLng'] = {
                lat: order.address.lat,
                lng: order.address.lng
            }
        }
        if(Object.keys(updateObj).length > 0) {
            await db.collection('orders').doc(orderId).update(updateObj);
        }
        return order;
    } catch (error) {
        return order
    }
}

async function clearUserCart(userId) {
    return new Promise(async (resolve) => {
        const cartRef = db.collection('users').doc(userId).collection('cart');
        const cart = await cartRef.get();
        cart.forEach(async doc => {
            if(doc && doc.id) {
                await cartRef.doc(doc.id).delete();
            }
        });
        resolve(true);
    });
}

async function generateDeliveryVerificationOtp(orderId) {
    return new Promise(async (resolve) => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        await db.collection('orders').doc(orderId).update({
            'deliveryVerification.otp': otp
        });
        resolve(true);
    });
}

async function generateQRCode(orderId) {
    QRCode.toDataURL(orderId, { version: 2 }, async function (err, base64) {
      const mimeType = base64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
      const base64EncodedImageString = base64.replace(/^data:image\/\w+;base64,/, '')
       const imageBuffer = Buffer.from(base64EncodedImageString, 'base64');
       const bufferStream = new stream.PassThrough();
       bufferStream.end(imageBuffer);
       // Define file and fileName
       const file = bucket.file(`orders/${orderId}/qrCode.png`);
       bufferStream.pipe(file.createWriteStream({
           metadata: {
           contentType: mimeType
           },
           public: true,
           validation: "md5"
       }))
           .on('error', function (err) {
           console.log('error from image upload', err);
           })
           .on('finish', function () {
              // The file upload is complete.
              file.getSignedUrl({
              action: 'read',
              expires: '03-09-2491'
           }).then(async (signedUrls) => {
              // signedUrls[0] contains the file's public URL
               pictureURL = signedUrls[0];
               await db.collection('orders').doc(orderId).update({qrCode: pictureURL});
             });
          });    
  })
}

async function addDeliveryExternalIntegration(orderId) {
    const defaultIntegrationRef = await db.collection('integrations').doc('delivery').get();
    const defaultIntegration = defaultIntegrationRef.data() ? 'default' in defaultIntegrationRef.data() ? defaultIntegrationRef.data().default : '' : 'shiprocket';
    let integrationRef = null;
    if(defaultIntegration) {
        integrationRef = await db.collection('integrations').doc('delivery').collection('list').doc(defaultIntegration).get();
    }
    const integrationSettings = integrationRef && integrationRef.data() ? integrationRef.data() : {
        active: false
    };
    if (integrationSettings.active && ('metaData' in integrationSettings && 'chargesManual' in integrationSettings.metaData && !integrationSettings.metaData.chargesManual)) {
        await db.collection('orders').doc(orderId).update({
            'externalIntegration.delivery.integrationCode': defaultIntegration
        });
    }
    return true;
}

async function addUsageLimitOfFreeProducts(freeProductsAdded, userId) {
    if (freeProductsAdded.length) {
        for (const id of freeProductsAdded) {
            await db.collection('settings').doc('freeProductsLimit').collection('limits').doc(id).collection('usage').add({
                createdAt: new Date(),
                userId
            });
        }
    }
}

async function getPaymentSettingsInfo() {
    return new Promise(async (resolve, reject) => {
        const paymentRef = await db.collection('payment').doc('info').get(),
            paymentData = paymentRef.data() || {};
        resolve(paymentData);
    });
}

async function addUserAdditionalInfo(userId, orderId) {
    const userRef = await db.collection('users').doc(userId).get();
    const user = userRef.data();
    if (user && user.hasOwnProperty('additionalInfo') && user.additionalInfo) {
        await db.collection('orders').doc(orderId).update({
            additionalInfo: user.additionalInfo
        });
    }
}

async function runVendors() {
    const orderDoc = await db.collection('orders').doc('pzFTSHbdFzwI8pGp0Xc1').get();
    const order = orderDoc.data();
    await vendorsCheck(order, 'pzFTSHbdFzwI8pGp0Xc1');
}

// runVendors();

async function vendorsCheck(order, orderId) {
    try {
        const dbOrder = await db.collection('orders').doc(orderId).get();
        if(dbOrder && dbOrder.data()) {
            if('vendors' in dbOrder.data()) {
                return;
            }
        }
        const products = order.products;
        let vendorProducts = [];
        let vendors = [];
        let ismultiVendor = false;
        let mvDocData = null;
        if (products.length) {
            const env = await getEnvironmentVariables();
            ismultiVendor = env && env.multiVendor ? true : false;
            if (ismultiVendor) {
                const mvDoc = await db.collection('features').doc('multiVendor').get();
                mvDocData = mvDoc.data();
                ismultiVendor = mvDocData && mvDocData.active ? true : false;
            }

            if (ismultiVendor) {
                for (let index = 0; index < products.length; index++) {
                    const pdt = products[index];
                    const pid = pdt.productId;
                    if (pid) {
                        const pdtDoc = await db.collection('products').doc(pid).get();
                        const pdtData = pdtDoc.data();
                        const vendorId = pdtData && pdtData.vendorId ? pdtData.vendorId : null;
                        if (vendorId) {
                            const product = {
                                id: pid,
                                name: pdt.name,
                                quantity: pdt.quantity,
                                price: pdt.price,
                                pack: 'pack' in pdt ? pdt.pack : null
                            }
                            const vIndex = vendorProducts.findIndex(v => v.id === vendorId);
                            if (vIndex >= 0) {
                                vendorProducts[vIndex].products.push(product);
                            } else {
                                vendorProducts.push({
                                    id: vendorId,
                                    products: [product]
                                });
                            }
                            products[index]['vendorStatus'] = {
                                unavailableQty: 0,
                                status: 'notSet',
                                id: vendorId
                            };
                        }
                    }
                }

                if (vendorProducts.length) {
                    for (const vendor of vendorProducts) {
                        const vendorDoc = await db.collection('features').doc('multiVendor').collection('vendors').doc(vendor.id).get();
                        const vendorData = vendorDoc.data();
                        if (vendorData) {
                            
                            vendors.push({
                                id: vendor.id,
                                products: vendor.products,
                                vendor: {
                                    active: vendorData.active,
                                    displayName: 'displayName' in vendorData ? vendorData.displayName : '',
                                    name: vendorData.name,
                                    phoneNo: vendorData.phoneNo,
                                    invoiceSettings: vendorData.invoiceSettings,
                                    vendorAddress: 'vendorAddress' in vendorData ? vendorData.vendorAddress.address : null
                                }
                            });
                        }
                    }
                }

                if(vendors.length) {
                    const paymentData = await db.collection('payment').doc('info').get();
                    let isGstApplicable = typeof paymentData.data().isGstApplicable !== undefined ? paymentData.data().isGstApplicable : true;
                    const isInternationalUser = await checkIsInternationalUser(order.address);
                    if(isInternationalUser) {
                        isGstApplicable = false;
                    }
                    for (const vendor of vendors) {
                        const data = {
                            order,
                            vendorData: vendor.vendor,
                            vendorId: vendor.id,
                            vendorProducts: vendor.products,
                            multipleVendorInvoices: 'multipleVendorInvoices' in mvDocData ? mvDocData.multipleVendorInvoices : false,
                            totalVendors: vendors.length,
                            isGstApplicable,
                            orderId
                        }
                        let invoice = await generateInvoiceForVendor(data);
                        console.log('invoice', invoice);
                        if(invoice) {
                            vendor['invoice'] = invoice;
                        }
                        delete vendor.vendor['invoiceSettings'];
                        delete vendor.vendor['vendorAddress'];
                    }
                }

                console.log('vendors', vendors);
                if (vendors.length) {
                    await db.collection('orders').doc(orderId).update({
                        vendors,
                        products
                    });
                    for (const vendor of vendors) {
                        const orderObj = {
                            id: orderId,
                            createdAt: order.createdAt,
                            status: order.status,
                            scheduledDate: order.scheduledDate ? order.scheduledDate : '',
                            scheduledTime: order.scheduledTime ? order.scheduledTime : '',
                        };
                        await db.collection('features').doc('multiVendor').collection('vendors').doc(vendor.id).collection('orders').add({
                            products: vendor.products,
                            order: orderObj
                        });
                        const chatObj = {
                            type: 'txt',
                            createdAt: new Date(),
                            author: 'admin',
                            isRead: false,
                            published: true,
                            message: '',
                            title: ''
                        }
                        chatObj.message = `You have received a new order with OrderID: ${order.orderId}`;
                        chatObj.title = 'New Order Received!';
                        await sendChatMsg(chatObj, vendor.id);
                    }
                    const extraChargeInvoiceUrl = await generateInvoice(order.orderId, order, orderId, 'extraCharge');
                    console.log('extraChargeInvoiceUrl', extraChargeInvoiceUrl);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function generateInvoiceForVendor(data) {
    return new Promise(async (resolve) => {
        if (!data.multipleVendorInvoices) {
            resolve(null);
        } else {
            let order = JSON.parse(JSON.stringify(data.order));
            if ('invoiceSettings' in data.vendorData && data.vendorData.invoiceSettings) {
                data.vendorData.invoiceSettings.address = {
                    address: data.vendorData.invoiceSettings.address,
                    stateCode: data.vendorData.vendorAddress ? data.vendorData.vendorAddress.stateCode : ''
                }
                order['vendorInvoiceSettings'] = data.vendorData.invoiceSettings;
            }
            order.vendorId = data.vendorId;
            let products = [];
            let couponDiscount = 0;
            let membershipDiscount = 0;
            for (const vendorProduct of data.vendorProducts) {
                order.products.map((product, index) => {
                    if (product.productId === vendorProduct.id) {
                        if ('pack' in product) {
                            if (product.pack.weight === vendorProduct.pack.weight) {
                                if (product.pack.variantType === 'pieces') {
                                    product.price = product.pack.price;
                                }
                                products.push({
                                    ...product
                                });
                            }
                        } else {
                            products.push({
                                ...product
                            });
                        }
                        if('couponDiscount' in product) {
                            couponDiscount += product.couponDiscount;
                        }
                        if('membershipDiscount' in product) {
                            membershipDiscount += product.membershipDiscount;
                        }
                    }
                });
            }
            order.products = [...products];
            order.delivery /= data.totalVendors;
            order.cashbackAmount = (order.cashbackAmount || 0) / data.totalVendors;
            order.couponDiscount = couponDiscount;
            order.membershipDiscount = membershipDiscount;
            order.walletAmount /= data.totalVendors;
            order.discountOnMrp = calcDiscountOnMrp(products, data.isGstApplicable);
            order.totalMrp = calcTotalMrp(products, data.isGstApplicable);
            let extraChargeOnOrder = 0;
            let extraChargeOnPayment = 0;
            if('extraChargeOnOrder' in order && order.extraChargeOnOrder.charge) {
                extraChargeOnOrder = order.extraChargeOnOrder.charge / data.totalVendors; 
                order.extraChargeOnOrder.charge = extraChargeOnOrder;
            }
            if('extraChargeOnPayment' in order && order.extraChargeOnPayment.charge) {
                extraChargeOnPayment = order.extraChargeOnPayment.charge / data.totalVendors; 
                order.extraChargeOnPayment.charge = extraChargeOnPayment;
            }
            
            const gst = calcGst(products, {
                cost: order.delivery,
                gstValue: order.deliveryGstObj.value
            }, data.isGstApplicable, extraChargeOnOrder + extraChargeOnPayment);
            order.deliveryGstObj = gst.deliveryGstObj;
            order.defaultGst = gst.totalGst;
            order.totalAmountToPaid = parseFloat(((order.totalMrp + order.delivery + extraChargeOnOrder + extraChargeOnPayment) - (order.discountOnMrp + order.cashbackAmount + order.couponDiscount + order.membershipDiscount)).toFixed(2));
            const invoiceUrl = await generateInvoice(order.orderId, order, data.orderId, 'vendor');
            console.log('invoiceUrl', invoiceUrl);
            resolve(invoiceUrl);
        }

    });
}

async function getEnvironmentVariables() {
    return new Promise(async (resolve, reject) => {
        const envDoc = await db.collection('settings').doc('environment').get();
        const envData = envDoc.data();
        resolve(envData);
    });
}



async function assignDeliveryAgent(userId, orderId) {
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        const user = userDoc.data();
        if (user && user.hasOwnProperty('defaultDeliveryAgentId') && user.defaultDeliveryAgentId !== '') {
            const agentId = user.defaultDeliveryAgentId;
            await db.collection('orders').doc(orderId).update({
                deliveryAgentId: agentId,
                deliveryStatus: 'notStarted'
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const slotOperators = {
    '+': function (value) {
        return value + 1;
    },
    '-': function (value) {
        value = value > 0 ? value - 1 : 0;
        return value;
    }
}

async function manageSlots(order, type) {
    try {
        let scheduledDate = order.scheduledDate ? order.scheduledDate.toDate().toDateString() : '';
        const scheduledTime = order.scheduledTime;
        let slotOperator = '';
        if (type === 'increase') {
            slotOperator = '+';
        } else {
            slotOperator = '-';
        }
        if (scheduledDate && scheduledTime) {
            const manageSlotsRef = db.collection('features').doc('delivery').collection('manageSlots').doc(scheduledDate);
            await db.runTransaction(t => {
                return t.get(manageSlotsRef)
                    .then(async (doc) => {
                        if (doc && doc.data()) {
                            const slots = doc.data().slots;
                            if (slots.length) {
                                slots.map((slot) => {
                                    if ((slot.start === scheduledTime.start) && (slot.end === scheduledTime.end)) {
                                        const orderCreated = slot.orderCreated ? slot.orderCreated : 0;
                                        slot.orderCreated = slotOperators[slotOperator](orderCreated);
                                        t.update(manageSlotsRef, {
                                            slots: slots
                                        });
                                    }
                                });
                            }
                        }
                    });
            });
        }
    } catch (error) {
        console.log(error);
    }
}

async function checkForReferrerCashback(userId, orderId) {
    try {
        const userRef = await db.collection('users').doc(userId).get();
        const userData = userRef.data();
        if (userData.hasOwnProperty('referrer')) {
            userData.referrer['friendName'] = userData.name;
            userData.referrer['friendPhone'] = userData.phoneNo;
            await db.collection('orders').doc(orderId).update({
                referrer: userData.referrer
            });
        }
    } catch (error) {
        console.log(error);
    }
}

exports.orderPaymentCompleted = functions.runWith({
    timeoutSeconds: 120
}).firestore.document('orders/{orderId}').onUpdate(async (change, context) => {
    const orderData = change.after.data();
    const beforeOrderData = change.before.data();
    const orderDocId = context.params.orderId;
    let needToUpdate = false;
    let manualConfirmCashOrder = false;
    let isManualConfirmOrder = false;
    if ('autoConfirmOrder' in orderData) {
        isManualConfirmOrder = orderData.autoConfirmOrder ? false : true;
    } else {
        const paymentInfoRef = await db.collection('payment').doc('info').get();
        const paymentInfo = paymentInfoRef.data();
        isManualConfirmOrder = paymentInfo.autoConfirmOrder ? false : true;
    }
    if (isManualConfirmOrder) {
        console.log('manual confirm order');
        if (beforeOrderData.payment.mode !== 'cash' && orderData.payment.mode === 'cash') {
            console.log('needToUpdate invoice...');
            needToUpdate = true;
            manualConfirmCashOrder = true;
            await saveOrderLogs(orderDocId, 'Payment mode set to cash');
        }
    }
    if ((beforeOrderData.payment.completed !== orderData.payment.completed) && (orderData.payment.mode !== 'cash' && orderData.payment.mode !== 'wallet')) {
        needToUpdate = true;
        await saveOrderLogs(orderDocId, `Payment ${orderData.payment.completed ? `completed using ${orderData.payment.mode} at` : 'incompleted at'}`);
        if(!(orderData.metaData.hasOwnProperty('walletDeducted')) || !orderData.metaData.walletDeducted) {
            const data = {
                walletAmount: orderData.walletAmount,
                cashbackAmount: orderData.cashbackAmount,
                userId: orderData.userId,
                orderId: orderDocId
            }
            await paymentsFile.updateWalletAmount(data);
            orderData.metaData.walletDeducted = true;
        }
    }
    if (('partialPayment' in orderData && orderData.partialPayment.status) && (beforeOrderData.payment.mode !== 'cash' && orderData.payment.mode === 'cash')) {
        needToUpdate = true;
    }

    if(beforeOrderData.status !== 'Confirmed' && orderData.status === 'Confirmed') {
        orderData.invoiceNo = await generateInvoiceNoForConfirmedOrders(orderDocId);
        if((!(orderData.metaData.hasOwnProperty('walletDeducted')) || !orderData.metaData.walletDeducted) && (orderData.payment.mode !== 'cash' && orderData.payment.mode !== 'wallet')) {
            const data = {
                walletAmount: orderData.walletAmount,
                cashbackAmount: orderData.cashbackAmount,
                userId: orderData.userId,
                orderId: orderDocId
            }
            await paymentsFile.updateWalletAmount(data);
        }
    }

    if (needToUpdate) {
        console.log('generate invoice...');
        const products = orderData.products;
        if (orderData.payment.completed || manualConfirmCashOrder) {
            if (!orderData.hasOwnProperty('orderType') || (orderData.hasOwnProperty('orderType') && orderData.orderType !== 'subscription')) {
                if (products.length > 0) {
                    for (let i = 0; i < products.length; i++) {
                        if (products[i].hasOwnProperty('orderType') && products[i].orderType === 'subscription') {
                            let subData = products[i].subData;
                            subData.payment = orderData.payment;
                            subData.createdAt = new Date();
                            subData['ordersAt'] = getAllOrdersDate(subData)
                            await db.collection('subscriptions').add(subData);
                        } else if (products[i].hasOwnProperty('orderType') && products[i].orderType === 'membership') {
                            await createMembership(products[i].membershipSettings, orderData, orderDocId);
                        } else {
                            if (!('metaData' in orderData) || !orderData.metaData.inventoryManaged) {
                                await inventoryManagement(products[i]);
                            }
                        }
                    }
                }
                const paymentInfo = await getPaymentSettingsInfo();
                if (!paymentInfo.hasOwnProperty('generateInvoice') || paymentInfo.generateInvoice) {
                    const orderInvoice = await generateInvoice(orderData.orderId, orderData, orderDocId);
                    console.log('orderInvoice', orderInvoice);

                }
                await manageSlots(orderData, 'increase');
                await vendorsCheck(orderData, orderDocId);
            }

        }
    }

    if(beforeOrderData.status !== 'Confirmed' && orderData.status === 'Confirmed') {
        await saveOrderTimeLine(orderDocId, 'Confirmed');
        await checkNearbyDeliveryAgents(orderData, orderDocId);
        await manageInventoryAccordingToToggle(orderData, orderDocId);
        await vendorsCheck(orderData, orderDocId);
        await generateOrderInvoiceIfOrderTypeQuotation(orderData, orderDocId);
    }

    if (beforeOrderData.status !== 'Cancelled' && orderData.status === 'Cancelled' && orderData.payment.mode === 'cash') {
        await cashOrderCancelled(orderData);
    }

    if (beforeOrderData.status !== 'Delivered' && orderData.status === 'Delivered') {
        await orderDelivered(orderData, orderDocId);
        await saveOrderTimeLine(orderDocId, 'Delivered');
        await creditRewardToUser(orderData, 'Delivered');
    }

    if (beforeOrderData.status == 'Delivered' && orderData.status === 'Returned') {
        await creditRewardToUser(orderData, 'Returned');
    }

    if (beforeOrderData.status !== 'Dispatched' && orderData.status === 'Dispatched') {
        if (!orderData.payment || !orderData.payment.mode || orderData.payment.status === 'failed' || !orderData.payment.completed) {
            await db.collection('orders').doc(orderDocId).update({
                payment: {
                    completed: false,
                    mode: 'cash',
                    details: {}
                }
            });
        }
        await saveOrderTimeLine(orderDocId, 'Dispatched');
    }

    // if (orderData.autoConfirmOrder) {
        const oldUnavailable = beforeOrderData.unavailable || {};
        const newUnavailable = orderData.unavailable || {};

        if ((JSON.stringify(oldUnavailable) !== JSON.stringify(newUnavailable)) && Object.keys(newUnavailable).length) {
            let generateCreditNote = false;
            const unavailableProducts = [];
            orderData.products.map((product, index) => {
                if (newUnavailable[index]) {
                    generateCreditNote = true;
                    const memDiscount = (product.membershipDiscount / product.quantity) || 0;
                    const couponDiscount = (product.couponDiscount / product.quantity) || 0;
                    if (product.hasOwnProperty('pack') && (product.pack.variantType === 'pieces')) {
                        product.pack.price = product.pack.price - (memDiscount + couponDiscount);
                    } else {
                        product.price = product.price - (memDiscount + couponDiscount);
                    }
                    product.quantity = newUnavailable[index];
                    unavailableProducts.push(product);
                }
            });
            orderData.products = [...unavailableProducts];
            if (generateCreditNote && unavailableProducts.length) {
                await generateInvoice(orderData.orderId, orderData, orderDocId, 'credit');
                const editOrderMsg = {
                    message: `Your order with OrderId:${orderIdPrefix}${orderData.orderId} has been updated by store. Please review your order.`,
                    title: 'Order Updated!',
                    author: 'admin',
                    type: 'link',
                    orderId: orderData.orderId,
                    orderDocId: orderDocId,
                    btns: [{
                        txt: 'View Order',
                        task: 'orderView'
                    }, ]
                };
                await sendChatMsg(editOrderMsg, orderData.userId);
            } else {
                await db.collection('orders').doc(orderDocId).update({
                    creditNote: {
                        status: 'NA',
                        url: ''
                    }
                });
            }
            await saveOrderLogs(orderDocId, 'Product quantities updated at');
            // if('cashback' in orderData && orderData.cashback.amount && orderData.cashback.orderAmount) {
            //     if(orderData.totalAmountToPaid < orderData.cashback.orderAmount) {
            //         await revertOrderCashback(orderData, orderDocId);
            //     }
            // }
        }
    // }

    // resale invoice generation
    const beforeResaleData = 'resale' in beforeOrderData ? beforeOrderData.resale : {};
    const afterResaleData = 'resale' in orderData ? orderData.resale : {};
    if (JSON.stringify(beforeResaleData) !== JSON.stringify(afterResaleData)) {
        const updatedResaleOrder = prepareOrderForResellerInvoice(orderData, afterResaleData);
        await generateInvoice(orderData.orderId, updatedResaleOrder, orderDocId, 'resale');
        const resaleChatMsg = {
            message: `Reselling details has been added by ${afterResaleData.reseller.name} to order with OrderID:${orderIdPrefix}${orderData.orderId}`,
            title: 'Resale Order Received!',
            author: 'user',
            type: 'link',
            orderId: orderData.orderId,
            orderDocId: orderDocId,
            btns: [{
                txt: 'View Order',
                task: 'orderView'
            }, ]
        };
        await sendChatMsg(resaleChatMsg, orderData.userId);
    }

    //vendor status notifications
    await sendVendorStatusNotifications(orderData, beforeOrderData, orderDocId);

    //roll back product qty on order cancel
    if (beforeOrderData.status !== 'Cancelled' && orderData.status === 'Cancelled') {
        await orderCancelled(orderData, orderDocId);
        await saveOrderTimeLine(orderDocId, 'Cancelled');
    }

    if (beforeOrderData.status !== 'Returned' && orderData.status === 'Returned') {
        await saveOrderTimeLine(orderDocId, 'Returned');
        await couponCodeRestored(orderData, orderDocId);
        await revertOrderCashback(orderData, orderDocId, 'returned');
    }

    if (beforeOrderData.status !== 'Rejected' && orderData.status === 'Rejected') {
        await orderCancelled(orderData, orderDocId);
        await saveOrderTimeLine(orderDocId, 'Rejected');
    }


    const beforePaymentStatus = beforeOrderData.payment && beforeOrderData.payment.status ? beforeOrderData.payment.status : '';
    const afterPaymentStatus = orderData.payment && orderData.payment.status ? orderData.payment.status : '';
    if (afterPaymentStatus === 'failed' && beforePaymentStatus !== 'failed') {
        const timeline = orderData.timeline || {};
        if ('Confirmed' in timeline) {
            delete timeline['Confirmed'];
        }
        await db.collection('orders').doc(orderDocId).update({
            timeline,
            walletAmount: 0,
            cashbackAmount: 0,
            extraChargeOnPayment: {
                charge: 0
            },
        });
        const confirmLogIdRef = await db.collection('orders').doc(orderDocId).collection('logs').where('text', '==', 'Order Confirmed at').get();
        confirmLogIdRef.forEach(async doc => {
            if (doc && doc.id) {
                await db.collection('orders').doc(orderDocId).collection('logs').doc(doc.id).delete();
            }
        });
        await saveOrderLogs(orderDocId, 'Payment failed at');
    }

    if (JSON.stringify(orderData.timeline) !== JSON.stringify(beforeOrderData.timeline)) {
        if (afterPaymentStatus === 'failed') {
            const timeline = orderData.timeline || {};
            if ('Confirmed' in timeline) {
                delete timeline['Confirmed'];
                await db.collection('orders').doc(orderDocId).update({
                    timeline
                });
            }
            const confirmLogIdRef = await db.collection('orders').doc(orderDocId).collection('logs').where('text', '==', 'Order Confirmed at').get();
            confirmLogIdRef.forEach(async doc => {
                if (doc && doc.id) {
                    await db.collection('orders').doc(orderDocId).collection('logs').doc(doc.id).delete();
                }
            });
        }
    }

    //send quotation notifications
    if (orderData.orderType && orderData.orderType === 'quotation' && JSON.stringify(orderData.products) !== JSON.stringify(beforeOrderData.products)) {
        const chatMsg = {
            message: `Price / Quantity has been updated for quotation list with OrderID:${orderIdPrefix}${orderData.orderId}`,
            title: 'Quotation List Updated!',
            author: 'admin',
            type: 'link',
            orderId: orderData.orderId,
            orderDocId: orderDocId,
            btns: [{
                txt: 'View Order',
                task: 'orderView'
            }, ]
        };
        await sendChatMsg(chatMsg, orderData.userId);
    }

    if(beforeOrderData.status !== orderData.status) {
        await updateVendorOrderStatus(orderData, orderDocId);
    }


    if(beforeOrderData.orderId !== orderData.orderId) {
        await updateWalletChatMsgIfAny(orderData, orderDocId);
    }
});

async function creditRewardToUser(orderData, orderStatus) {
    // * orderStatus will be 'Delivered' or 'Returned'.
    console.log("creditRewardToUser...");
    try {
        const envData = await getEnvironmentVariables();

        // ? Execute when rewards feature is on from environment.
        if (envData && 'rewardsFeature' in envData && envData.rewardsFeature) {
            let currentRewards = 0;
            if (orderData && orderData.products.length) {
                // ? Get the currentRewards form users Doc
                const userRef = await db.collection('users').doc(orderData.userId).get();
                const userData = userRef.data();
                currentRewards = userData && 'rewards' in userData ? userData.rewards : 0;

                // ? Update the currentRewards form ordered products
                for (const product of orderData.products) {
                    if ('rewards' in product) {
                        if (orderStatus === 'Delivered') {
                            currentRewards += product.rewards;
                        }
                        else {
                            currentRewards -= product.rewards;
                        }
                    }
                }

                // ? Update the users doc with updated rewards
                await db.collection('users').doc(orderData.userId).update({ rewards: currentRewards });
                console.log("creditRewardToUser finished", currentRewards);
            }
        }
    } catch (err) {
        console.log("creditRewardToUser() error: ", err);
    }
}

async function updateWalletChatMsgIfAny(orderData, orderDocId) {
    if(orderData.walletAmount || orderData.cashbackAmount) {
        const userRef = await db.collection('users').doc(orderData.userId).get();
        const user = userRef.data();
        if(user.wallet && user.wallet.lastTransactions && user.wallet.lastTransactions.message === "Paid for Order") {
            await db.collection('users').doc(orderData.userId).update({
                'wallet.lastTransactions.message' : `Paid for Order (${orderData.orderId})`
            });
            const transactionRef = await db.collection('users').doc(orderData.userId).collection('walletTransactions').where("orderId", '==', orderDocId).get();
            let transactionId = '';
            transactionRef.forEach(doc => {
                if(doc && doc.id) {
                    transactionId = doc.id;
                }; 
            });
            if(transactionId) {
                await db.collection('users').doc(orderData.userId).collection('walletTransactions').doc(transactionId).update({
                    message: `Paid for Order (${orderData.orderId})`
                });
            }
        };
    };
}

async function updateVendorOrderStatus(orderData, orderDocId) {
    if(orderData.vendors && orderData.vendors.length) {
        for (const vendor of orderData.vendors) {
            const vendorOrderRef = db.collection('features').doc('multiVendor').collection('vendors').doc(vendor.id).collection('orders');
            const orderRef = await vendorOrderRef.where('order.id', '==', orderDocId).get();
            let orderId = '';
            orderRef.forEach(doc => {
                if(doc && doc.id && doc.data()) {
                    orderId = doc.id;
                }
            });
            if(orderId) {
                await vendorOrderRef.doc(orderId).update({
                    'order.status': orderData.status
                })
            }
        }
    }
}

async function generateOrderInvoiceIfOrderTypeQuotation(orderData, orderDocId) {
    if(orderData.orderType === 'quotation' && orderData.metaData && orderData.metaData.source === 'manual') {
        orderData.orderType = '';
        await db.collection('orders').doc(orderDocId).update({
            orderType: ''
        });
        await generateInvoice(orderData.orderId, orderData, orderDocId, 'invoice');
    }
}

async function orderCancelled(orderData, orderDocId) {
    try {
        if('inventoryManaged' in orderData.metaData && orderData.metaData.inventoryManaged) {
            for (const product of orderData.products) {
                await rollBackQty(product)
            }
            await db.collection('orders').doc(orderDocId).update({
                'metaData.inventoryManaged': false
            });
        }
        await couponCodeRestored(orderData, orderDocId);
        if(orderData.metaData.hasOwnProperty('walletDeducted') && orderData.metaData.walletDeducted) {
            await revertOrderCashback(orderData, orderDocId);
        }

    } catch (error) {
        console.log(error);
    }
}

async function revertOrderCashback(orderData, orderDocId, orderStatus = '') {
    return new Promise(async (resolve) => {
        if('cashback' in orderData && orderData.cashback.amount) {
            const cashbackUserRef = db.collection('settings').doc('wallet').collection('cashbacks').doc(orderData.cashback.cashbackId).collection('usage').doc(orderData.cashback.usageId);
            const isExist = await isDocExist(cashbackUserRef);
            if(isExist) {
                const walletTxnData = {
                    amount: orderData.cashback.amount,
                    uid: orderData.userId,
                    txnMsg: `Cashback reverted for OrderId: ${orderData.orderId}`,
                    chatMsg: `${currencySymbol}${orderData.cashback.amount} cashback amount reverted for OrderId: ${orderData.orderId}`,
                    type: 'cashback'
                }
                await globalFile.debitFromUserWallet(walletTxnData);
                await db.collection('settings').doc('wallet').collection('cashbacks').doc(orderData.cashback.cashbackId).collection('usage').doc(orderData.cashback.usageId).delete();
            }
        }
        if(orderStatus !== 'returned') {
            if(orderData.walletAmount) {
                const data = {
                    amount: orderData.walletAmount,
                    uid: orderData.userId,
                    msg: `Refund for ${orderIdPrefix}${orderData.orderId}`,
                    type: 'wallet'
                }
    
                await globalFile.addToUserWallet(data);
            }
            if(orderData.cashbackAmount) {
                const data = {
                    amount: orderData.cashbackAmount,
                    uid: orderData.userId,
                    msg: `Refund for ${orderIdPrefix}${orderData.orderId}`,
                    type: 'cashback'
                }
    
                await globalFile.addToUserWallet(data);
            }
        }
        resolve(true);
    });
}

async function isDocExist(docRef) {
    return new Promise((resolve) => {
        docRef.get().then(doc => {
            if(doc.exists) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    });
}

async function couponCodeRestored(orderData, orderDocId) {
    return new Promise(async (resolve) => {
        if (orderData.couponId) {
            const couponRef = db.collection('features').doc('coupons').collection('codes').doc(orderData.couponId);
            const couponUsageDocRef = await couponRef.collection('usage').where('orderId', '==', orderDocId).get();
            let couponUsageDocId = '';
            couponUsageDocRef.forEach(async (doc) => {
                if (doc && doc.id && doc.data()) {
                    couponUsageDocId = doc.id;
                }
            });
            await couponRef.collection('usage').doc(couponUsageDocId).delete();

            await db.runTransaction(t => {
                return t.get(couponRef)
                    .then(doc => {
                        var couponDoc = doc.data();
                        t.update(couponRef, {
                            usage: couponDoc.usage - 1
                        });
                    });
            });
        }
        resolve(true);
    });
}

async function sendVendorStatusNotifications(orderData, beforeOrderData, orderDocId) {
    if (orderData.vendors && orderData.vendors.length) {
        const vendorsForNotifs = [];
        if (!('vendors' in beforeOrderData)) {
            orderData.vendors.map(vendor => {
                if ('status' in vendor) {
                    vendorsForNotifs.push(vendor);
                }
            });
        } else {
            orderData.vendors.map((vendor, index) => {
                if (('status' in vendor) && (vendor.status !== beforeOrderData.vendors[index].status)) {
                    vendorsForNotifs.push(vendor);
                }
            });
        }
        if (vendorsForNotifs.length) {
            for (const vendor of vendorsForNotifs) {
                const chatObj = {
                    type: 'txt',
                    createdAt: new Date(),
                    author: 'user',
                    isRead: false,
                    published: true,
                    message: '',
                    title: ''
                }
                if (vendor.status === 'partiallyCancelled') {
                    chatObj.message = `${vendor.vendor.name}(Vendor) has some items unavailable for order with OrderID: ${orderData.orderId}`,
                        chatObj.title = 'Vendor items unavailable!'
                }
                if (vendor.status === 'cancelled') {
                    chatObj.message = `${vendor.vendor.name}(Vendor) has cancelled order with OrderID: ${orderData.orderId}`,
                        chatObj.title = 'Order cancelled by vendor!'
                }
                if (vendor.status === 'dispatched') {
                    chatObj.message = `${vendor.vendor.name}(Vendor) has dispatched order with OrderID: ${orderData.orderId}`,
                        chatObj.title = 'Order dispatched by vendor!'
                }
                if (vendor.status === 'prepared') {
                    chatObj.message = `${vendor.vendor.name}(Vendor) is ready to dispacth order with OrderID: ${orderData.orderId}`,
                        chatObj.title = 'Ready to dispatch by vendor!'
                }

                if (orderData.deliveryAgentId) {
                    const deliveryChatObj = {
                        ...chatObj
                    };
                    deliveryChatObj.author = 'admin';
                    await sendChatMsg(deliveryChatObj, orderData.deliveryAgentId)
                }
                await sendChatMsg(chatObj, vendor.id)

                await saveOrderLogs(orderDocId, chatObj.message)
            }

        }
        return 'notifications sent';
    }
}

function prepareOrderForResellerInvoice(orderData, afterResaleData) {
    orderData.products.map((product, index) => {
        const resaleAt = afterResaleData.order.products[index].resaleAt;
        if (product.hasOwnProperty('pack') && (product.pack.variantType === 'pieces')) {
            product.pack.price = resaleAt;
        } else {
            product.price = resaleAt;
        }
        product.mrpPrice = resaleAt;
        product.gstObj = afterResaleData.order.products[index].gstObj
    });
    orderData.delivery = 0;
    orderData.deliveryGstObj = {
        total: 0,
        value: 0
    };
    orderData.cashbackAmount = 0;
    orderData.couponDiscount = 0;
    orderData.couponId = '';
    orderData.couponName = '';
    orderData.createdAt = afterResaleData.order.createdAt;
    orderData.customerGstNo = afterResaleData.customer.gstNo || '';
    orderData.defaultGst = afterResaleData.order.priceDetails.gst;
    orderData.discountOnMrp = 0;
    orderData.membershipDiscount = 0;
    orderData.payment.mode = null;
    orderData.productsPrice = afterResaleData.order.priceDetails.resaleAt;
    orderData.scheduledDate = '';
    orderData.scheduledTime = '';
    orderData.storePickupObj = {};
    orderData.totalAmountToPaid = afterResaleData.order.priceDetails.resaleAt;
    orderData.totalMrp = afterResaleData.order.priceDetails.resaleAt;
    orderData.walletAmount = 0;
    const customerAddress = afterResaleData.customer.address;
    const shippingAddress = {
        ...customerAddress,
        name: afterResaleData.customer.name,
        address: customerAddress.complete,
        phoneNo: 'NA'
    }
    orderData.address = shippingAddress;
    orderData.billingAddress = shippingAddress;

    return orderData;
}

async function sendChatMsg(chatData, userId) {
    await globalFile.chatMessage(chatData, userId);
}

async function createMembership(settings, order, orderDocId) {
    try {
        const uid = order.userId;
        settings['validTill'] = moment().tz(timeZone).add(settings.plan.months, 'M').format('YYYY-MM-DD');
        const membership = {
            isMember: true,
            planConfig: settings,
            lastPayment: {
                paidAt: moment().tz(timeZone).format('YYYY-MM-DD'),
                mode: order.payment.mode
            }
        }
        const planHistory = {
            orderId: orderDocId,
            months: settings.plan.months,
            price: settings.plan.discountedPrice,
            paidAt: membership.lastPayment.paidAt
        }

        const batch = db.batch();
        const userRef = db.collection('users').doc(uid);
        const userMembershipHistoryRef = db.collection('users').doc(uid).collection('membershipHistory').doc();
        batch.update(userRef, {
            membership
        });
        batch.set(userMembershipHistoryRef, planHistory)
        batch.commit().then(async function () {
                if (('initialCashback' in settings.plan) && settings.plan.initialCashback > 0) {
                    const data = {
                        amount: settings.plan.initialCashback,
                        type: 'cashback',
                        uid: uid
                    }

                    await globalFile.addToUserWallet(data);
                }
                return 'membership created';
            })
            .catch(error => {
                console.log('error in batch commit create membership', error);
            });
    } catch (error) {
        console.log('error in create membership', error);
    }

}

async function cashOrderCancelled(order) {
    if (order.scheduledDate && order.scheduledTime) {
        await manageSlots(order, 'decrease');
    }
}

async function orderDelivered(orderData, orderDocId) {
    await checkAnyRefund(orderData, orderDocId);
    await sendReviewOrderMsg(orderData, orderDocId);
    await addDeliveryFeeAsCashback(orderData);
    await addDeliveryAgentCommission(orderData);
}

async function addDeliveryAgentCommission(order) {
    return new Promise(async (resolve, reject) => {
        if(!order.deliveryAgentId) {
            resolve(true);
            return;
        } 
        const agentRef = db.collection('users').doc(order.deliveryAgentId);
        await db.runTransaction(t => {
            return t.get(agentRef)
                .then(async doc => {
                    if(!doc.data().commission) {
                        resolve(true);              
                        return;
                    }
                    let totalUnpaid = doc.data().commission.unpaid || 0;
                    totalUnpaid += doc.data().commission.perOrder;
                    t.update(agentRef, {
                        'commission.unpaid': totalUnpaid
                    });
                    resolve(true);              
                });
        });
    });
}

async function addDeliveryFeeAsCashback(orderData) {
    return new Promise(async (resolve) => {
        const userRef = await db.collection('users').doc(orderData.userId).get();
        const userData = userRef.data();
        if (userData && orderData.delivery) {
            if (('membership' in userData) && userData.membership.isMember && userData.membership.planConfig.isDeliveryFeeAsCashback) {
                const data = {
                    amount: orderData.delivery,
                    uid: orderData.userId,
                    type: 'cashback'
                }

                await globalFile.addToUserWallet(data);
            }
        }
        resolve(true);
    });
}

async function checkAnyRefund(orderData, orderDocId) {
    if (orderData.unavailablePrice && (orderData.payment.completed && orderData.payment.mode !== 'cash')) {
        const storeInfo = await db.collection('settings').doc('store').get();
        let storeName = 'Store';
        if (storeInfo.data()) {
            storeName = storeInfo.data().storeName;
        }
        const data = {
            amount: orderData.unavailablePrice,
            storeName: storeName,
            uid: orderData.userId
        }

        await globalFile.addToUserWallet(data);

        const refundChatMsg = {
            message: `Refund of ${currencySymbol}${data.amount} for OrderID:${orderIdPrefix}${orderData.orderId} has been credited to your wallet.`,
            title: 'Refund Credited!',
            author: 'admin',
            type: 'link',
            orderId: orderData.orderId,
            orderDocId: orderDocId,
            btns: [{
                txt: 'View Order',
                task: 'orderView'
            }, ]
        }

        await sendChatMsg(refundChatMsg, orderData.userId);
    }
}

async function sendReviewOrderMsg(orderData, orderDocId) {
    const chatData = {
        message: 'Please review your latest order.',
        author: 'admin',
        type: 'link',
        orderId: orderData.orderId,
        orderDocId: orderDocId,
        btns: [{
                txt: 'Review Order',
                task: 'orderReview'
            },
            {
                txt: 'View Order',
                task: 'orderView'
            },
        ]
    };

    await sendChatMsg(chatData, orderData.userId)
}


function getAllOrdersDate(subData) {
    let ordersAt = [];
    const deliveries = subData.totalDeliveries;
    if (subData.type === 'daily') {
        for (let i = 1; i <= deliveries; i++) {
            ordersAt.push(moment().tz(timeZone).add(i, 'days').format('YYYY-MM-DD'))
        }
    } else if (subData.type === 'weekly') {
        const days = subData.deliveryDays;
        const totalWeeks = subData.totalWeeks;
        days.forEach((day) => {
            for (let i = 0; i <= totalWeeks; i++) {
                let date = moment().tz(timeZone).add(i, 'week').day(day).format('YYYY-MM-DD');
                ordersAt.push(date)
            }
        });
    } else {
        const dates = subData.deliveryDates;
        const totalMonths = subData.totalMonths;
        dates.forEach((date) => {
            for (let i = 0; i <= totalMonths; i++) {
                let dateOfMonth = moment().tz(timeZone).add(i, 'M').date(parseInt(date)).format('YYYY-MM-DD');
                ordersAt.push(dateOfMonth)
            }
        });
    }
    const futureDates = getFutureDates(ordersAt);
    const sortedDates = futureDates.sort((a, b) => moment(a).diff(moment(b), 'days'))
    if (deliveries < sortedDates.length) {
        const extras = sortedDates.length - deliveries;
        sortedDates.splice(-1, extras);
    }
    return sortedDates;
}

function getFutureDates(dates) {
    const futureDates = [];
    const today = moment().tz(timeZone).format('YYYY-MM-DD');
    dates.forEach(date => {
        const diff = moment(date).diff(moment(today), 'days');
        if (diff > 0) {
            futureDates.push(date);
        }
    });
    return futureDates;
}

async function getCouponName(cid) {
    return new Promise(async (resolve, reject) => {
        const couponRef = await db.collection('features').doc('coupons').collection('codes').doc(cid).get();
        const couponData = couponRef.data();
        if (couponData) {
            resolve(couponData.name);
        } else {
            resolve('no_coupon');
        }
    });
}

async function updateGstValues(order, orderId) {
    let products = order.products;
    if (products.length > 0) {
        let storeAddress = {};
        let storeStateCode = '';
        const orderAddress = order.address;
        const shippingStateCode = orderAddress.stateCode ? orderAddress.stateCode : '';
        const storeInfo = await db.collection('settings').doc('store').get();
        if (storeInfo.data()) {
            storeAddress = storeInfo.data().storeAddress ? storeInfo.data().storeAddress : {};
            storeStateCode = storeAddress.stateCode ? storeAddress.stateCode : '';
        }
        products.map((p) => {
            if (!p.hasOwnProperty('gstObj')) {
                p.gst = p.gst || 0;
                let gstValue = (p.price - (p.price / (1 + (p.gst / 100)))) * p.quantity;
                p.gstObj = {
                    value: p.gst,
                    total: gstValue,
                    cgst: p.gst / 2,
                    sgst: p.gst / 2,
                    igst: p.gst
                }
            }
            if (shippingStateCode === storeStateCode) {
                p.gstObj.igst = 0;
            } else {
                p.gstObj.cgst = 0;
                p.gstObj.sgst = 0;
            }
        });
        await db.collection('orders').doc(orderId).update({
            products: products
        });
    }

}

// function updateExistingSystems(order) {
//         if(!order.hasOwnProperty('billingAddress')) {
//             order['billingAddress'] = order.address;
//         }

//         if(!order.hasOwnProperty('customerGstNo')) {
//             order['customerGstNo'] = '';
//         }

//         if(!order.hasOwnProperty('deliveryGstObj')) {
//             order['deliveryGstObj'] = {
//               total: 0,
//               value: 0
//             }
//         }

//         if(!order.hasOwnProperty('discountOnMrp')) {
//             order['discountOnMrp'] = 0;
//         }

//         if(!order.hasOwnProperty('storePickupObj')) {
//             order['storePickupObj'] = {};
//         }

//         if(!order.hasOwnProperty('walletAmount')) {
//             order['walletAmount'] = 0;
//         }

//         let totalPrice = 0;
//         order.products.forEach((p) => {
//             totalPrice += p.price * p.quantity;
//         });

//         if(!order.hasOwnProperty('totalMrp')) {
//             order['totalMrp'] = totalPrice;
//         }

//         return order;

// }

// async function runPdf() {
//     const orderDoc = await db.collection('orders').doc('6sN6LDqUm136NV1Xd0JU').get();
//     const order = orderDoc.data();
//     await generateInvoice(1767, order, '6sN6LDqUm136NV1Xd0JU', 'extraCharge');
// }

// runPdf();

async function generateInvoice(orderId, order, orderDocId, invoiceType = 'invoice') {
    return new Promise(async (resolve, reject) => {
        try {
            let gstNo = '';
            let storeName = '';
            let storePhone = '';
            let shopLogoBase64 = '';
            let authorizedSign = '';
            let storeAddress = {};
            let panNo = '';
            let customerGstNo = order.customerGstNo ? order.customerGstNo : '';
            let isGstApplicable = true;
            let customMsg = '';
            let barcodeNumber = '';
            let invoiceNoPrefix = '';

            if (order.orderType && order.orderType === 'quotation') {
                invoiceType = 'quotation';
            }
            const storeInfo = await db.collection('settings').doc('store').get();
            if (storeInfo.data()) {
                storeName = invoiceType === 'resale' ? order.resale.reseller.name : storeInfo.data().storeName;
                storePhone = storeInfo.data().storePhone;
                storeAddress = storeInfo.data().storeAddress ? storeInfo.data().storeAddress : {};
            }
            const invoiceData = await db.collection('settings').doc('invoice').get();

            if (invoiceData.data()) {
                storeName = 'gstFirmName' in invoiceData.data() && invoiceData.data().gstFirmName ? invoiceData.data().gstFirmName : storeInfo.data().storeName;
                shopLogoBase64 = invoiceType === 'resale' ? '' : invoiceData.data().shopLogo;
                authorizedSign = invoiceData.data().signature ? invoiceData.data().signature : '';
                customMsg = 'customMessage' in invoiceData.data() ? invoiceData.data().customMessage : '';
            }
            const paymentData = await db.collection('payment').doc('info').get();

            if (paymentData.data()) {
                gstNo = invoiceType === 'resale' ? order.resale.reseller.gstNo : paymentData.data().gstNo;
                panNo = paymentData.data().panNo ? paymentData.data().panNo : '';
                isGstApplicable = typeof paymentData.data().isGstApplicable !== undefined ? paymentData.data().isGstApplicable : true;
                const isInternationalUser = await checkIsInternationalUser(order.address);
                if(isInternationalUser) {
                    isGstApplicable = false;
                }
            }
            let couponName = order.hasOwnProperty('couponName') ? order.couponName : '';
            if (!couponName && order.couponId) {
                const name = await getCouponName(order.couponId);
                if (name !== 'no_coupon') {
                    order.couponName = name;
                }
            }

            let invoiceNo = 'invoiceNo' in order ? order.invoiceNo : '';
            if(!invoiceNo) {
                const order = await db.collection('orders').doc(orderDocId).get();
                invoiceNo = order.data() && order.data().invoiceNo ? order.data().invoiceNo : '';
            }

            if('vendorInvoiceSettings' in order) {
                gstNo = order.vendorInvoiceSettings.gstNo || gstNo;
                storeName = order.vendorInvoiceSettings.billingName || storeName;
                storePhone = order.vendorInvoiceSettings.phoneNo || storePhone;
                if('logo' in order.vendorInvoiceSettings) {
                    if(!order.vendorInvoiceSettings.logo.adminLogo && order.vendorInvoiceSettings.logo.url) {
                        shopLogoBase64 = order.vendorInvoiceSettings.logo.url;
                    }
                }
                authorizedSign = order.vendorInvoiceSettings.signature || authorizedSign;
                storeAddress = order.vendorInvoiceSettings.address || storeAddress;
                panNo = order.vendorInvoiceSettings.panNo || panNo;
                customMsg = order.vendorInvoiceSettings.customMessage || customMsg;
                barcodeNumber = order.vendorInvoiceSettings.barcodeNumber || barcodeNumber;
                invoiceNoPrefix = order.vendorInvoiceSettings.invoiceNoPrefix || invoiceNoPrefix;
            }

            var docDefinition = {
                content: [
                    getBillHeading(isGstApplicable, invoiceType),
                    {
                        columns: [
                            getShopLogo(shopLogoBase64),
                            getStoreInfo(storeName, gstNo, storePhone, storeAddress, panNo, isGstApplicable),
                        ],
                        columnGap: 20,
                    },
                    {
                        columns: [
                            getCustomerAddressInfo(order.address, 'shipping'),
                            getCustomerAddressInfo(order.billingAddress || order.address, 'billing'),
                        ],
                        columnGap: 20
                    },
                    {
                        columns: [
                            getInvoiceInfo(orderId, order, order.products.length, invoiceType, invoiceNo, invoiceNoPrefix),
                            getPaymentInfo(orderId, order, customerGstNo, invoiceType),
                        ],
                    },
                    getProductTable(order, storeAddress, isGstApplicable, invoiceType),
                    getOrderPriceInfo(order, isGstApplicable, invoiceType),
                    printCustomMsg(customMsg),
                    // printBarcodeNumber(barcodeNumber),
                    getBarcodeImg(storeName, barcodeNumber),
                    //   {canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595-2*40, y2: 5, lineWidth: 1 }], margin: [0, 30, 0, 0],},
                    getAuthorizedSign(storeName, authorizedSign)
                ],
                styles: {
                    header: {
                        fontSize: 13,
                        bold: true,
                        alignment: 'center',
                        color: '#000000'
                    },
                    tableHeader: {
                        fontSize: 9,
                        color: '#000000',
                        bold: true,
                        fillColor: 'lightgrey',
                    },
                    subHeadings: {
                        bold: true,
                        color: '#000000',
                    },
                    tableDesc: {
                        fontSize: 10
                    },
                    hsnCode: {
                        fontSize: 8
                    }
                },
                defaultStyle: {
                    fontSize: 10,
                    color: '#2e2e2e',
                    font: 'SakalBharati',
                    lineHeight: 0.5
                },
                pageMargins: [40, 3, 40, 40],
            }

            console.log('pdf gen starts');
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            console.log("pdf generated");
            pdfDocGenerator.getBase64(async (data) => {
                console.log("saving pdf");
                if(invoiceType === 'vendor') {
                    const metaData = {
                        base64: data,
                        fileName: `orders/${orderDocId}/vendor/${order.vendorId}/invoice/${orderIdPrefix}${orderId}.pdf`
                    }
                    const invoiceUrl = await getInvoiceUrl(metaData);
                    resolve(invoiceUrl);
                } else {
                    const res = await savePdf(data, orderId, orderDocId, invoiceType);
                    resolve(res);
                }
            });
        } catch (error) {
            console.log(error);
            reject({
                status: 'not_generated'
            })
        }
    })
}

function getBillHeading(isGstApplicable, invoiceType = 'invoice') {
    let heading = {};
    if (invoiceType === 'credit') {
        heading = {
            text: 'Credit Note',
            style: 'header',
            margin: [0, 0, 0, 5]
        };
    } else if (invoiceType === 'quotation') {
        heading = {
            text: 'Quotation Proforma',
            style: 'header',
            margin: [0, 0, 0, 5]
        };
    } else {
        if (isGstApplicable) {
            heading = {
                text: 'Tax Invoice/Bill of Supply/Cash Memo',
                style: 'header',
                margin: [0, 0, 0, 5]
            };
        } else {
            heading = {
                text: 'Invoice/Bill of Supply/Cash Memo',
                style: 'header',
                margin: [0, 0, 0, 5]
            };
        }
    }

    return heading;
}

function getShopLogo(base64) {
    let logo = {};
    if (base64 !== '') {
        logo = {
            image: base64,
            width: 80,
            height: 70,
            alignment: 'left',
        }
    }
    return logo;
}

function getStoreInfo(name, gst, phone, storeAddress, panNo, isGstApplicable) {
    let storeInfo = {
        stack: [],
        alignment: 'right'
    };
    let tel_gst_pan_line = {
        text: []
    };
    if (name !== '') {
        storeInfo.stack.push({
            text: [{
                text: 'Sold By: ',
                style: 'subHeadings'
            }, {
                text: name
            }]
        })
    }
    if (storeAddress.hasOwnProperty('address')) {
        storeInfo.stack.push({
            text: [{
                text: 'Ship-from Address: ',
                style: 'subHeadings'
            }, {
                text: storeAddress.address
            }]
        });
    }
    if (phone !== '') {
        storeInfo.stack.push({
            text: [{
                text: 'Tel No: ',
                style: 'subHeadings'
            }, {
                text: phone
            }]
        })
    }
    if (gst !== '' && isGstApplicable && country && country.toLowerCase() === 'india') {
        tel_gst_pan_line.text.push({
            text: 'GSTIN: ',
            style: 'subHeadings'
        }, {
            text: gst
        });
    }
    if (panNo !== '') {
        tel_gst_pan_line.text.push({
            text: `, ${taxName}: `,
            style: 'subHeadings'
        }, {
            text: panNo
        });
    }
    storeInfo.stack.push(tel_gst_pan_line);
    return storeInfo;
}

function getCustomerAddressInfo(address, type) {
    let customerInfo = {
        width: '50%',
        stack: type === 'shipping' ? [{
            text: 'Shipping Address:',
            style: 'subHeadings'
        }] : [{
            text: 'Billing Address:',
            style: 'subHeadings'
        }],
        alignment: type === 'shipping' ? 'left' : 'right',
        margin: [0, 0, 0, 5]
    }
    customerInfo.stack.push(address.name);
    customerInfo.stack.push(`${address.address}, ${address.city}, ${address.state}, ${address.pincode}`);
    customerInfo.stack.push({
        text: [{
                text: 'Tel No: ',
                style: 'subHeadings'
            },
            {
                text: address.phoneNo
            }
        ]
    });
    return customerInfo;
}

function getInvoiceInfo(orderId, order, productsLength, invoiceType = 'invoice', invoiceNo, invoiceNoPrefix) {
    if (invoiceType === 'invoice' || invoiceType === 'vendor') {
        const invoiceNoText = invoiceNo ? `${invoiceNoPrefix}${invoiceNo}` : (invoiceNoPrefix ? invoiceNoPrefix : orderIdPrefix) + orderId;
        let invoice = {
            width: '50%',
            stack: [{
                    text: [{
                            text: 'Invoice No: ',
                            style: 'subHeadings'
                        },
                        {
                            text: invoiceNoText
                        }
                    ]
                },
                {
                    text: [{
                            text: 'Total Amount: ',
                            style: 'subHeadings'
                        },
                        {
                            text: `${currencySymbol}${numberFormatter(parseFloat(((order.totalAmountToPaid + (order.unavailablePrice || 0)) - (order.cashbackAmount || 0))))}`
                        }
                    ]
                },
                {
                    text: [{
                            text: 'No. of items: ',
                            style: 'subHeadings'
                        },
                        {
                            text: `${productsLength}`
                        }
                    ]
                },
            ],
            alignment: 'left'
        }
        return invoice;
    }
}

function getPaymentInfo(orderId, order, customerGstNo, invoiceType = 'invoice') {
    const paymentObj = order.payment;
    const scheduledDate = order.scheduledDate;
    const scheduledTime = order.scheduledTime;
    const orderDate = convertDate(order.createdAt);
    const orderSource = 'metaData' in order && order.metaData.source ? order.metaData.source : null;
    if (invoiceType === 'invoice' || invoiceType === 'vendor') {
        let payment = {
            width: '50%',
            stack: [{
                text: [{
                        text: 'Order Id: ',
                        style: 'subHeadings'
                    },
                    {
                        text: orderIdPrefix + orderId
                    }
                ]
            }],
            alignment: 'right'
        }
        if (orderDate) {
            // console.log('orderDate', orderDate);
            payment.stack.push({
                text: [{
                        text: 'Placed On: ',
                        style: 'subHeadings'
                    },
                    {
                        text: orderDate
                    }
                ]
            })
        }
        if (customerGstNo && country && country.toLowerCase() === 'india') {
            payment.stack.push({
                text: [{
                        text: 'Customer GST No: ',
                        style: 'subHeadings'
                    },
                    {
                        text: customerGstNo
                    }
                ]
            })
        }
        if (paymentObj.mode && orderSource && orderSource !== 'manual') {
            payment.stack.push({
                text: [{
                        text: 'Payment By: ',
                        style: 'subHeadings'
                    },
                    {
                        text: paymentObj.mode === 'custom' ? paymentObj.optionName : paymentObj.mode
                    }
                ]
            })
        }
        if (order.walletAmount) {
            payment.stack.push({
                text: [{
                        text: 'Wallet Amount Used: ',
                        style: 'subHeadings'
                    },
                    {
                        text: `${currencySymbol}${numberFormatter(order.walletAmount)}`
                    }
                ]
            })
        }
        // if (scheduledDate && scheduledTime) {
        //     payment.stack.push({
        //         text: [{
        //                 text: 'Delivery slot: ',
        //                 style: 'subHeadings'
        //             },
        //             {
        //                 text: formatDate(scheduledDate.toDate()) + ',' + ' ' + scheduledTime.start + '-' + scheduledTime.end
        //             }
        //         ]
        //     })
        // }
        return payment;
    }
}

function convertDate(date) {
    if(typeof date.toDate === 'function') {
        const utc = new Date(date.toDate()).toUTCString();
        return new Date(utc).getDate() + "/" + (new Date(utc).getMonth() + 1) +
        "/" + new Date(utc).getFullYear();
    } else {
        return null;
    }
}

function formatDate(d) {
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return day + '/' + month + '/' + year;
}

function getProductTable(order, storeAddress, isGstApplicable, invoiceType = 'invoice') {
    if(invoiceType !== 'extraCharge') {
    const products = order.products;
    const orderAddress = order.address;
    const storePickup = order.storePickupObj ? order.storePickupObj : {};
    const deliveryGstObj = order.deliveryGstObj;
    let shippingStateCode = orderAddress.stateCode ? orderAddress.stateCode : '';
    let storeStateCode = storeAddress.stateCode ? storeAddress.stateCode : '';
    let sameStates = false;
    let prodDoc = {
        alignment: 'center',
        margin: [0, 10, 0, 0],
        lineHeight: 0.8,
        fontSize: 9,
        table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: []
        },
    };
    let tableHeader = [{
            text: "S.No",
            style: 'tableHeader'
        },
        {
            text: 'Description',
            style: 'tableHeader'
        },
        {
            text: `MRP ${currencySymbol}`,
            style: 'tableHeader'
        },
        {
            text: `Unit Price ${currencySymbol}`,
            style: 'tableHeader'
        },
        {
            text: 'Qty',
            style: 'tableHeader'
        },
        {
            text: `Net Amount ${currencySymbol}`,
            style: 'tableHeader'
        }
    ]
    if (country && country.toLowerCase() === 'india') {
        if (shippingStateCode === storeStateCode && isGstApplicable) {
            sameStates = true;
            prodDoc.table.widths.push('auto');
            prodDoc.table.widths.push('auto');
            tableHeader.push({
                text: `CGST ${currencySymbol}`,
                style: 'tableHeader'
            }, {
                text: `SGST ${currencySymbol}`,
                style: 'tableHeader'
            });
        } else {
            if (isGstApplicable) {
                prodDoc.table.widths.push('auto');
                tableHeader.push({
                    text: `IGST ${currencySymbol}`,
                    style: 'tableHeader'
                });
            }
        }
    } else {
        if (isGstApplicable) {
            prodDoc.table.widths.push('auto');
            tableHeader.push({
                text: `${taxType} ${currencySymbol}`,
                style: 'tableHeader'
            });
        }
    }

    tableHeader.push({
        text: `Savings ${currencySymbol}`,
        style: 'tableHeader'
    }, )
    tableHeader.push({
        text: `Total Amount ${currencySymbol}`,
        style: 'tableHeader'
    }, )
    prodDoc.table.body.push(tableHeader);
    let deliveryRow = [];
    for (let i = 0; i < products.length; i++) {
        let qty = products[i].quantity;
        let unitPrice = 0;
        let totalAmnt = 0;
        let mrpPrice = 0;
        let savings = 0;
        if (isGstApplicable) {

            if (products[i].hasOwnProperty('pack') && products[i].pack.variantType === 'pieces') {
                unitPrice = (products[i].gstObj && products[i].gstObj.total && products[i].gstExclusive === false) ? ((products[i].pack.price) - (products[i].gstObj.total / qty)) : (products[i].pack.price);
                totalAmnt = parseFloat((products[i].pack.price * qty));
                mrpPrice = products[i].mrpPrice || products[i].pack.price;
                savings = (mrpPrice - products[i].pack.price) * qty;
            } else {
                unitPrice = (products[i].gstObj && products[i].gstObj.total && products[i].gstExclusive === false) ? ((products[i].price) - (products[i].gstObj.total / qty)) : (products[i].price);
                totalAmnt = parseFloat((products[i].price * qty));
                mrpPrice = products[i].mrpPrice || products[i].price;
                savings = (mrpPrice - products[i].price) * qty;
            }
            totalAmnt = 'gstExclusive' in products[i] && products[i].gstExclusive ? totalAmnt + (totalAmnt * products[i].gst / 100) : totalAmnt;

        } else {
            if (products[i].hasOwnProperty('pack') && products[i].pack.variantType === 'pieces') {
                unitPrice = (products[i].pack.price);
                totalAmnt = (products[i].pack.price * qty);
                mrpPrice = products[i].mrpPrice || products[i].pack.price;
                savings = (mrpPrice - products[i].pack.price) * qty;
            } else {
                unitPrice = (products[i].price);
                totalAmnt = (products[i].price * qty);
                mrpPrice = products[i].mrpPrice || products[i].price;
                savings = (mrpPrice - products[i].price) * qty;
            }
        }
        if (!savings) {
            savings = 0;
        } else {
            savings = savings;
        }

        let netAmnt = (unitPrice * qty);
        let cgstAmnt = (products[i].gstObj && products[i].gstObj.total) ? (products[i].gstObj.total / 2) : 0;
        let sgstAmnt = (products[i].gstObj && products[i].gstObj.total) ? (products[i].gstObj.total / 2) : 0;
        let igstAmnt = (products[i].gstObj && products[i].gstObj.total) ? (products[i].gstObj.total) : 0;

        unitPrice = numberFormatter(unitPrice);
        totalAmnt = numberFormatter(totalAmnt);
        mrpPrice = numberFormatter(mrpPrice);
        savings = numberFormatter(savings);
        netAmnt = numberFormatter(netAmnt);
        cgstAmnt = numberFormatter(cgstAmnt);
        sgstAmnt = numberFormatter(sgstAmnt);
        igstAmnt = numberFormatter(igstAmnt);


        let prodRow = [];
        let pname = {
            stack: [{
                text: products[i].hasOwnProperty('pack') ? `${products[i].name} (${products[i].pack.variantType || 'Variant'}:${products[i].pack.weight})` : products[i].name,
                style: 'tableDesc'
            }]
        };
        if (products[i].hasOwnProperty('hsn') && products[i].hsn !== '') {
            pname.stack.push({
                text: [{
                    text: '(HSN Code: '
                }, {
                    text: `${products[i].hsn})`
                }],
                style: 'hsnCode'
            })
        }
        if (products[i].hasOwnProperty('batches') && products[i].batches.length > 0 && products[i].hasOwnProperty('selectedBatches') && products[i].selectedBatches.length > 0) {
            let selectedBatch = products[i].batches.filter(batch => batch.name === products[i].selectedBatches[0].name);
            pname.stack.push({
                text: [{
                    text: '(Batch: '
                }, {
                    text: `${selectedBatch[0].name})`
                }],
                style: 'hsnCode'
            })
            pname.stack.push({
                text: [{
                    text: '(MFG Date: '
                }, {
                    text: `${moment(selectedBatch[0].manufacturedDate.toDate()).tz(timeZone).format('DD/MM/YYYY')})`
                }],
                style: 'hsnCode'
            })
            pname.stack.push({
                text: [{
                    text: '(Expiry Date: '
                }, {
                    text: `${moment(selectedBatch[0].expiryDate.toDate()).tz(timeZone).format('DD/MM/YYYY')})`
                }],
                style: 'hsnCode'
            })
        }
        if (sameStates && country && country.toLowerCase() === 'india') {
            if (isGstApplicable) {
                prodRow = [i + 1, pname, `${mrpPrice}`, `${unitPrice}`, qty, `${netAmnt}`, {
                    text: [{
                        text: `${cgstAmnt}`
                    }, {
                        text: ` (${products[i].gstObj.cgst}%)`
                    }]
                }, {
                    text: [{
                        text: `${sgstAmnt}`
                    }, {
                        text: ` (${products[i].gstObj.sgst}%)`
                    }]
                }, `${savings}`, `${totalAmnt}`];
            } else {
                prodRow = [i + 1, pname, `${mrpPrice}`, `${unitPrice}`, qty, `${netAmnt}`, `${savings}`, `${totalAmnt}`];
            }
        } else {
            if (isGstApplicable) {
                prodRow = [i + 1, pname, `${mrpPrice}`, `${unitPrice}`, qty, `${netAmnt}`, {
                    text: [{
                        text: `${igstAmnt}`
                    }, {
                        text: ` (${products[i].gstObj.igst}%)`
                    }]
                }, `${savings}`, `${totalAmnt}`];
            } else {
                prodRow = [i + 1, pname, `${mrpPrice}`, `${unitPrice}`, qty, `${netAmnt}`, `${savings}`, `${totalAmnt}`];
            }
        }
        prodDoc.table.body.push(prodRow);
    }

    if (invoiceType === 'invoice' || invoiceType === 'vendor') {
        if (sameStates) {
            if (storePickup.hasOwnProperty('charges')) {
                let pickupCharge = storePickup.charges - (storePickup.charges * (deliveryGstObj.value / 100));
                let cgst = ((storePickup.charges * (deliveryGstObj.value / 100)) / 2);
                let sgst = ((storePickup.charges * (deliveryGstObj.value / 100)) / 2);

                pickupCharge = numberFormatter(pickupCharge);
                cgst = numberFormatter(cgst);
                sgst = numberFormatter(sgst);

                if (isGstApplicable) {
                    deliveryRow = [' ', {
                        text: 'Store Pickup Charges',
                        style: 'tableDesc'
                    }, ' ', `${pickupCharge}`, ' ', `${pickupCharge}`, `${cgst}`, `${sgst}`, ' ', `${storePickup.charges}`];
                } else {
                    deliveryRow = [' ', {
                        text: 'Store Pickup Charges',
                        style: 'tableDesc'
                    }, ' ', `${pickupCharge}`, ' ', `${pickupCharge}`, ' ', `${storePickup.charges}`];
                }
            } else {
                let delivery = order.delivery - deliveryGstObj.total;
                let cgst = (deliveryGstObj.total / 2);
                let sgst = (deliveryGstObj.total / 2);

                delivery = numberFormatter(delivery);
                cgst = numberFormatter(cgst);
                sgst = numberFormatter(sgst);

                if (isGstApplicable) {
                    deliveryRow = [' ', {
                        text: 'Delivery Charges',
                        style: 'tableDesc'
                    }, ' ', `${delivery}`, ' ', `${delivery}`, `${cgst}`, `${sgst}`, ' ', `${order.delivery}`];
                } else {
                    deliveryRow = [' ', {
                        text: 'Delivery Charges',
                        style: 'tableDesc'
                    }, ' ', `${delivery}`, ' ', `${delivery}`, ' ', `${order.delivery}`];
                }
            }
        } else {
            if (storePickup.hasOwnProperty('charges')) {
                let pickupCharge = storePickup.charges - (storePickup.charges * (deliveryGstObj.value / 100));
                let igst = (storePickup.charges * (deliveryGstObj.value / 100));

                pickupCharge = numberFormatter(pickupCharge);
                igst = numberFormatter(igst);

                if (isGstApplicable) {
                    deliveryRow = [' ', {
                        text: 'Store Pickup Charges',
                        style: 'tableDesc'
                    }, ' ', `${pickupCharge}`, ' ', `${pickupCharge}`, `${igst}`, ' ', `${storePickup.charges}`];
                } else {
                    deliveryRow = [' ', {
                        text: 'Store Pickup Charges',
                        style: 'tableDesc'
                    }, ' ', `${pickupCharge}`, ' ', `${pickupCharge}`, ' ', `${storePickup.charges}`];
                }
            } else {
                let delivery = order.delivery - deliveryGstObj.total;
                let igst = deliveryGstObj.total;

                delivery = numberFormatter(delivery);
                igst = numberFormatter(igst);

                if (isGstApplicable) {
                    deliveryRow = [' ', {
                        text: 'Delivery Charges',
                        style: 'tableDesc'
                    }, ' ', `${delivery}`, ' ', `${delivery}`, `${igst}`, ' ', `${order.delivery}`];
                } else {
                    deliveryRow = [' ', {
                        text: 'Delivery Charges',
                        style: 'tableDesc'
                    }, ' ', `${delivery}`, ' ', `${delivery}`, ' ', `${order.delivery}`];
                }
            }
        }
        prodDoc.table.body.push(deliveryRow);
    }
    return prodDoc;
    }
}

function getOrderPriceInfo(order, isGstApplicable, invoiceType = 'invoice') {
    if (invoiceType === 'invoice' || invoiceType === 'resale' || invoiceType === 'vendor') {
        let productsPrice = (order.productsPrice);
        let couponDiscount = order.couponDiscount;
        let delivery = order.delivery;
        let totalGst = order.defaultGst;
        let totalAmountToPaid = parseFloat(((order.totalAmountToPaid + (order.unavailablePrice || 0)) - (order.cashbackAmount || 0)));
        let storePickup = order.storePickupObj ? order.storePickupObj : {};
        let membershipDiscount = order.membershipDiscount ? order.membershipDiscount : 0;
        let additionalDiscount = order.additionalDiscount || 0;
        let totalMrp = parseFloat((order.totalMrp));
        let discountOnMrp = parseFloat((order.discountOnMrp));

        let priceInfo = {
            alignment: 'center',
            margin: [0, 10, 0, 0],
            lineHeight: 0.8,
            fontSize: 9,
            table: {
                headerRows: 1,
                widths: ['*', '*'],
                body: []
            },
        };
        let tableHeader = [{
            text: `Total ${currencySymbol}`,
            style: 'tableHeader'
        }];
        let pricesRow = [`${numberFormatter(totalMrp - discountOnMrp - totalGst)}`];
        if (parseInt(couponDiscount)) {
            priceInfo.table.widths.push('*');
            tableHeader.push({
                text: `Coupon Discount ${currencySymbol} ${order.couponName ? `(${order.couponName})` : ''}`,
                style: 'tableHeader'
            });
            pricesRow.push(`${numberFormatter(couponDiscount)}`);
        }
        if (parseInt(membershipDiscount)) {
            priceInfo.table.widths.push('*');
            tableHeader.push({
                text: `Membership Discount ${currencySymbol}`,
                style: 'tableHeader'
            });
            pricesRow.push(`${numberFormatter(membershipDiscount)}`);
        }
        if (parseInt(additionalDiscount)) {
            priceInfo.table.widths.push('*');
            tableHeader.push({
                text: `Additional Discount ${currencySymbol}`,
                style: 'tableHeader'
            });
            pricesRow.push(`${numberFormatter(additionalDiscount)}`);
        }
        if (storePickup.hasOwnProperty('charges')) {
            priceInfo.table.widths.push('*');
            tableHeader.push({
                text: `Pickup Charges ${currencySymbol}`,
                style: 'tableHeader'
            });
            pricesRow.push(`${numberFormatter(storePickup.charges)}`);
        } else {
            if (invoiceType !== 'resale') {
                priceInfo.table.widths.push('*');
                tableHeader.push({
                    text: `Delivery Charges ${currencySymbol}`,
                    style: 'tableHeader'
                });
                pricesRow.push(`${numberFormatter(delivery)}`);
            }
        }
        if('extraChargeOnOrder' in order && order.extraChargeOnOrder.charge) {
            priceInfo.table.widths.push('*');
                tableHeader.push({
                    text: `${(order.extraChargeOnOrder.name || 'Extra Charge')} ${currencySymbol}` ,
                    style: 'tableHeader'
                });
                pricesRow.push(`${numberFormatter(order.extraChargeOnOrder.charge)}`);
        }

        if('extraChargeOnPayment' in order && order.extraChargeOnPayment.charge) {
            priceInfo.table.widths.push('*');
                tableHeader.push({
                    text: `${(order.extraChargeOnPayment.name || 'Payment Gateway Charge')} ${currencySymbol}` ,
                    style: 'tableHeader'
                });
                pricesRow.push(`${numberFormatter(order.extraChargeOnPayment.charge)}`);
        }
        if (isGstApplicable) {
            priceInfo.table.widths.push('*');
            tableHeader.push({
                text: `Total Tax ${currencySymbol}`,
                style: 'tableHeader'
            });
            pricesRow.push(`${numberFormatter(totalGst)}`);
        }
        if (order.cashbackAmount) {
            priceInfo.table.widths.push('*');
            tableHeader.push({
                text: `Cashback Used ${currencySymbol}`,
                style: 'tableHeader'
            });
            pricesRow.push(`${numberFormatter(order.cashbackAmount)}`);
        }
        if (order.totalAddonsPrice) {
            priceInfo.table.widths.push('*');
            tableHeader.push({
                text: `Add-ons Price ${currencySymbol}`,
                style: 'tableHeader'
            });
            pricesRow.push(`${numberFormatter(order.totalAddonsPrice)}`);
        }
        tableHeader.push({
            text: `Grand Total ${currencySymbol}`,
            style: 'tableHeader'
        });
        pricesRow.push(`${numberFormatter(totalAmountToPaid)}`);
        priceInfo.table.body.push(tableHeader);
        priceInfo.table.body.push(pricesRow);

        return priceInfo;
    } else if (invoiceType === 'credit' || invoiceType === 'quotation') {
        let total = 0;
        switch (invoiceType) {
            case 'credit':
                total = order.unavailablePrice;
                break;
            case 'quotation':
                total = order.totalAmountToPaid;
                break;
        }
        let priceInfo = {
            alignment: 'right',
            margin: [0, 10, 0, 0],
            lineHeight: 0.8,
            fontSize: 13,
            text: [{
                    text: 'Grand Total: ',
                },
                {
                    text: `${currencySymbol}${numberFormatter(total)}`
                }
            ]
        };
        return priceInfo;
    } else if(invoiceType === 'extraCharge') {
        let priceInfo = {
            alignment: 'center',
            margin: [0, 10, 0, 0],
            lineHeight: 0.8,
            fontSize: 9,
            table: {
                headerRows: 1,
                widths: ['*'],
                body: []
            },
        };
        let tableHeader = [];
        let pricesRow = [];

        let extraChargeOnOrder = 'extraChargeOnOrder' in order && order.extraChargeOnOrder.charge ? order.extraChargeOnOrder.charge : 0;
        let extraChargeOnPayment = 'extraChargeOnPayment' in order && order.extraChargeOnPayment.charge ? order.extraChargeOnPayment.charge : 0;

        if(extraChargeOnOrder || extraChargeOnPayment) {
            if(extraChargeOnOrder) {
                priceInfo.table.widths.push('*');
                tableHeader.push({
                    text: `${(order.extraChargeOnOrder.name || 'Extra Charge')} ${currencySymbol}` ,
                    style: 'tableHeader'
                });
                pricesRow.push(`${numberFormatter(order.extraChargeOnOrder.charge)}`);
            }
    
            if(extraChargeOnPayment) {
                priceInfo.table.widths.push('*');
                tableHeader.push({
                    text: `${(order.extraChargeOnPayment.name || 'Payment Gateway Charge')} ${currencySymbol}` ,
                    style: 'tableHeader'
                });
                pricesRow.push(`${numberFormatter(order.extraChargeOnPayment.charge)}`);
            }
    
            if (isGstApplicable && order.deliveryGstObj && order.deliveryGstObj.extraChargeGst) {
                priceInfo.table.widths.push('*');
                tableHeader.push({
                    text: `Total Tax Included ${currencySymbol}`,
                    style: 'tableHeader'
                });
                pricesRow.push(`${numberFormatter(order.deliveryGstObj.extraChargeGst)}`);
            }

            if(extraChargeOnOrder || extraChargeOnPayment) {
                priceInfo.table.widths.push('*');
                tableHeader.push({
                    text: `Total ${currencySymbol}`,
                    style: 'tableHeader'
                });
                pricesRow.push(`${numberFormatter(extraChargeOnOrder + extraChargeOnPayment)}`);
            }
    
            priceInfo.table.body.push(tableHeader);
            priceInfo.table.body.push(pricesRow);
        }
        return priceInfo;
    }
}

function printCustomMsg(msg) {
    let customMsg = {}
    if (msg) {
        customMsg = {
            text: msg,
            alignment: 'left',
            margin: [5, 0, 0, 5]
        };
    }
    return customMsg;
}

// function printBarcodeNumber(barcodeNumber) {
//     let barcodeSection = {}
//     if (barcodeNumber) {
//         barcodeSection = {
//             text: barcodeNumber,
//             alignment: 'left',
//             margin: [5, 0, 0, 5]
//         };
//     }
//     return barcodeSection;
// }

function getBarcodeImg(name, barcode) {
    let barcodeInfo = {
        alignment: 'right',
        stack: [],
        margin: [0, 10, 0, 0]
    }
    if (name && barcode) {
        barcodeInfo.stack.push({
            text: 'Barcode For ' + name + ' ' + ':',
            style: 'subHeadings',
            margin: [0, 0, 0, 10]
        });
        let barcodeImg = {
            image: barcode,
            width: 80,
            height: 70,
        }
        barcodeInfo.stack.push(barcodeImg);
        barcodeInfo.stack.push({
            text: 'Barcode',
            style: 'subHeadings'
        });
    }
    return barcodeInfo;
}

function getAuthorizedSign(name, sign) {
    let authSignInfo = {
        alignment: 'right',
        stack: [],
        margin: [0, 10, 0, 0]
    }
    if (name && sign) {
        authSignInfo.stack.push({
            text: 'For ' + name + ' ' + ':',
            style: 'subHeadings',
            margin: [0, 0, 0, 10]
        });
        let authSign = {
            image: sign,
            width: 80,
            height: 70,
        }
        authSignInfo.stack.push(authSign);
        authSignInfo.stack.push({
            text: 'Authorized Signature',
            style: 'subHeadings'
        });
    }

    return authSignInfo;
}



async function savePdf(data, orderId, orderDocId, invoiceType = 'invoice') {
    return new Promise(async (resolve, reject) => {
        try {
            var base64EncodedPdfString = data,
                mimeType = 'application/pdf',
                fileName = orderIdPrefix + orderId + '.pdf',
                pdfBuffer = new Buffer(base64EncodedPdfString, 'base64');

            if (invoiceType === 'credit') {
                var file = bucket.file('credit_note/' + fileName);
            } else if (invoiceType === 'resale') {
                var file = bucket.file('reseller/' + fileName);
            } else if(invoiceType === 'extraCharge') {
                var file = bucket.file('extraChargeInvoice/' + fileName);
            } else {
                var file = bucket.file('invoice/' + fileName);
            }
            file.save(pdfBuffer, {
                metadata: {
                    contentType: mimeType
                },
            });
            const config = {
                action: 'read',
                expires: '03-01-2500'
            };
            console.log("file saved");
            let downloadUrl = await file.getSignedUrl(config);
            const invoice = {
                status: 'generated',
                url: downloadUrl[0]
            };
            if (invoiceType === 'credit') {
                await db.collection('orders').doc(orderDocId).update({
                    creditNote: invoice
                });
            } else if (invoiceType === 'resale') {
                await db.collection('orders').doc(orderDocId).update({
                    "resale.order.invoice": invoice
                });
            } else if(invoiceType === 'extraCharge') {
                await db.collection('orders').doc(orderDocId).update({
                    "extraChargeOnOrder.invoice": invoice
                });
            } else {
                await db.collection('orders').doc(orderDocId).update({
                    invoice
                });
            }
            resolve(invoice);
        } catch (error) {
            console.log(error);
            reject({
                status: 'not_generated'
            });
        }

    });
}


exports.verifyCouponCode = functions.https.onCall(async (data, context) => {
    data['date'] = new Date();
    const code = data.code;
    const userId = data.userId;
    const date = data.date;
    const paymentDetails = data.paymentDetails;
    const isGstApplicable = data.isGstApplicable;
    const products = paymentDetails.products;
    const totalMrp = paymentDetails.totalMrp;
    const discountOnMrp = paymentDetails.discountOnMrp;
    const gstAmount = paymentDetails.totalGst;
    const totalAmountToPaid = paymentDetails.totalPayable;
    const delivery = {
        cost: paymentDetails.delivery.deliveryCost,
        gstValue: paymentDetails.deliveryGstObj.value
    };
    const orderAmount = totalMrp - discountOnMrp;
    let response = {
        success: false
    };
    let coupon = {
        id: ''
    };
    if (code && userId && date && orderAmount) {
        const matchedCoupons = await db.collection('features').doc('coupons').collection('codes').where('name', '==', code.toUpperCase()).get();
        matchedCoupons.forEach(async (doc) => {

            if (doc && doc.id && doc.data()) {
                coupon = {
                    id: doc.id,
                    ...doc.data()
                }
            }
        });
        if (coupon.id !== '') {
            let isValidCoupon = true;

            //check if coupon is available to specific users
            if (coupon.specificUsers.isAllowed && !coupon.specificUsers.users.some(u => u.id === userId)) {
                isValidCoupon = false;
                response['failureMsg'] = 'Invalid coupon code.';
                return response;
            }

            //check if order amount is more than coupon min order amount
            if (coupon.minOrderAmount > orderAmount) {
                isValidCoupon = false;
                response['failureMsg'] = `Minimum order amount to apply this coupon should be ${currencySymbol}${coupon.minOrderAmount}`;
            }
            //check if usage is not completed
            if (coupon.qty - coupon.usage < 1) {
                isValidCoupon = false;
                response['failureMsg'] = 'Invalid coupon code.';
            }
            //check if per user limit is available for user
            const userUsages = await db.collection('features').doc('coupons').collection('codes').doc(coupon.id).collection('usage').where('userId', '==', userId).get();
            let couponUsage = [];
            userUsages.forEach(async (user) => {
                if (user && user.id) {
                    couponUsage.push(user.id);
                }
            });
            console.log('couponUsage', couponUsage);
            if (couponUsage.length >= coupon.perUser) {
                isValidCoupon = false;
                response['failureMsg'] = 'Invalid coupon code.';
            }

            //Check if date is valid
            if (!moment(date).isSameOrBefore(moment(coupon.validUpto), 'day')) {
                isValidCoupon = false;
                response['failureMsg'] = 'This coupon code has been expired.';
            }


            if (isValidCoupon) {
                response['success'] = true;
                let productsExempted = [];
                if (coupon.notApplicableProducts && coupon.notApplicableProducts.length > 0) {
                    coupon.notApplicableProducts.forEach(product => {
                        productsExempted.push(product.id);
                    });
                }
                let applicableStatus = 'notApplicable';
                if (coupon.hasOwnProperty('applicableStatus')) {
                    applicableStatus = coupon.applicableStatus;
                }

                if (applicableStatus === 'all') {
                    productsExempted = [];
                }

                response['data'] = {
                    couponId: coupon.id,
                    amount: coupon.amount,
                    maxDiscount: coupon.maxDiscount,
                    type: coupon.type,
                    productsExempted: productsExempted,
                    applicableStatus: applicableStatus,
                    codAvailable: 'codAvailable' in coupon ? coupon.codAvailable : true
                }
                if (!coupon.hasOwnProperty('applicableStatus')) {
                    response.data['applicableStatus']
                }
                let details = paymentDetailsAfterCoupon(response.data, products, totalAmountToPaid, orderAmount, delivery, isGstApplicable);
                response['details'] = details;

                return response;
            } else {
                return response;
            }

        } else {
            response['failureMsg'] = 'Invalid coupon code.';
            return response;
        }

    } else {
        console.log(`totalMrp: ${totalMrp} & discountOnMrp: ${discountOnMrp}`);
        console.log(`code: ${code} && userId: ${userId} && date && orderAmount:${orderAmount}`);
        response['failureMsg'] = 'There is some problem in applying coupon code.';
        return response;
    }

});

var operators = {
    '!==': function (list, pid) {
        if (list.indexOf(pid) !== -1) {
            return true
        }
    },
    '===': function (list, pid) {
        if (list.indexOf(pid) === -1) {
            return true
        }
    },
}

function paymentDetailsAfterCoupon(coupon, products, totalAmountToPaid, orderAmount, delivery, isGstApplicable) {
    let couponAmnt = coupon.amount;
    let totalDiscount = 0;
    let isProductsApplicable = false;
    let applicableStatus = coupon.applicableStatus;
    let operator = '===';
    if (applicableStatus === 'applicable') {
        operator = '!==';
    }
    orderAmount = calcTotalMrpWithoutGst(products) - calcDiscountOnMrpWithoutGst(products);
    products.forEach((p) => {
        let productId = p.hasOwnProperty('parentProductId') ? p.parentProductId : p.productId || '';
        if (operators[operator](coupon.productsExempted, productId)) {
            isProductsApplicable = true;
            if (coupon.type === 'flat') {
                let discount = couponAmnt * (p.price / orderAmount);
                p.couponDiscount = (discount > p.price) ? (p.price * p.quantity) : (discount * p.quantity);

            } else {
                let discount = p.price * (couponAmnt / 100);
                totalDiscount += discount * p.quantity;
            }
        }
    });
    if (coupon.type === 'flat') {
        totalAmountToPaid = totalAmountToPaid - couponAmnt < 0 ? 0 : totalAmountToPaid - couponAmnt;
    } else {
        if (totalDiscount > coupon.maxDiscount) {
            totalDiscount = coupon.maxDiscount;
            products.forEach((p) => {
                let productId = p.hasOwnProperty('parentProductId') ? p.parentProductId : p.productId || '';

                if (operators[operator](coupon.productsExempted, productId)) {
                    let discount = totalDiscount * (p.price / orderAmount);
                    p.couponDiscount = (discount > p.price) ? (p.price * p.quantity) : (discount * p.quantity);
                }
            });
        } else {
            products.forEach((p) => {
                let productId = p.hasOwnProperty('parentProductId') ? p.parentProductId : p.productId || '';

                if (operators[operator](coupon.productsExempted, productId)) {
                    let discount = p.price * (couponAmnt / 100);
                    p.couponDiscount = (discount > p.price) ? (p.price * p.quantity) : (discount * p.quantity);
                }
            });
        }
        if (totalAmountToPaid - totalDiscount < 0) {
            totalAmountToPaid = 0;
        } else {
            totalAmountToPaid -= totalDiscount;
        }
    }

    const totalCouponDiscount = coupon.type === 'flat' ? couponAmnt : totalDiscount;
    
    let gst = calcGst(products, delivery, isGstApplicable);
    const totalMrp = calcTotalMrp(products, isGstApplicable);
    // const discountOnMrp = calcDiscountOnMrp(products, isGstApplicable);
    let excGstOnCouponDiscount = 0;
    products.forEach(product => {
        if ('gstExclusive' in product && product.gstExclusive && product.gst && isGstApplicable) {
            excGstOnCouponDiscount += (product.couponDiscount * (product.gst / 100));
        }
    });
    return {
        products: gst.products,
        totalGst: gst.totalGst,
        totalAmountToPaid: parseFloat(totalAmountToPaid.toFixed(2)) - (excGstOnCouponDiscount || 0),
        totalCouponDiscount,
        totalMrp,
        // discountOnMrp
    }

}

exports.getOrderPaymentDetails = functions.https.onCall(async (data, context) => {
    if (data) {
        const userId = context && context.auth ? context.auth.uid : null;
        let orderPincode = data.address && data.address.pincode ? (data.address.pincode).trim() : data.pincode ? (data.pincode).trim() : null;
        orderPincode = orderPincode ? orderPincode.replace(/[\W_]/g, "") : null;
        const products = data.products;
        const isGstApplicable = data.isGstApplicable;
        const paymentDetails = {};
        let dlvrySettingsData = {};
        let totalAddonsPrice = data.additionalInfo && data.additionalInfo.totalAddonsPrice ? data.additionalInfo.totalAddonsPrice : 0;
        if ('customDeliverySettings' in data && data.customDeliverySettings) {
            dlvrySettingsData = data.customDeliverySettings;
        } else {
            const dlvrySettingsRef = await db.collection('features').doc('delivery').get();
            dlvrySettingsData = dlvrySettingsRef.data();
        }
        const settingsRef = await db.collection('settings').doc('store').get();
        const settingsData = settingsRef.data();
        const storeLatLng = {
            lat: 0,
            lng: 0
        };
        let pickupPostcode = null;
        if (settingsData && settingsData.hasOwnProperty('storeAddress') && settingsData.storeAddress.lat) {
            storeLatLng.lat = settingsData.storeAddress.lat;
            storeLatLng.lng = settingsData.storeAddress.lng;
            pickupPostcode = parseInt(settingsData.storeAddress.pincode);
        }
        paymentDetails['totalMrp'] = calcTotalMrp(products, isGstApplicable);
        paymentDetails['discountOnMrp'] = calcDiscountOnMrp(products, isGstApplicable);
        const deliveryByWeightExist = dlvrySettingsData.hasOwnProperty('deliveryByWeight') && dlvrySettingsData.deliveryByWeight.active ? true : false;
        const amount = paymentDetails.totalMrp - paymentDetails.discountOnMrp;

        if(!orderPincode || !data.address) {
            console.log('***no orderpincode or address');
            paymentDetails['delivery'] = await getDeliveryCostBasedOnType(orderPincode, data.address || null, amount, dlvrySettingsData);
        } else {
            if (dlvrySettingsData) {
                const defaultIntegrationRef = await db.collection('integrations').doc('delivery').get();
                const defaultIntegration = defaultIntegrationRef.data() ? 'default' in defaultIntegrationRef.data() ? defaultIntegrationRef.data().default : '' : 'shiprocket';
                let integrationRef = null;
                if(defaultIntegration) {
                    integrationRef = await db.collection('integrations').doc('delivery').collection('list').doc(defaultIntegration).get();
                }
                const integrationSettings = integrationRef && integrationRef.data() ? integrationRef.data() : {
                    active: false
                };
                if (integrationSettings.active && ('metaData' in integrationSettings && 'chargesManual' in integrationSettings.metaData && !integrationSettings.metaData.chargesManual) && orderPincode && pickupPostcode) {
                    const allowFreeDelivery = 'allowFreeDelivery' in dlvrySettingsData ? dlvrySettingsData.allowFreeDelivery : true;
                    let userDoc = await db.collection('users').doc(userId).get()
                    const apiData = {
                        products,
                        orderPincode,
                        pickupPostcode,
                        freeDeliveryAmt: allowFreeDelivery ? parseInt(dlvrySettingsData.freeDeliveryAmt || 0) : Number.MAX_VALUE,
                        orderAmount: amount,
                        integrationCode: defaultIntegration,
                        dropLocation: {
                            lat: data.address.lat,
                            lng: data.address.lng,
                        },
                        pickupLocation: storeLatLng,
                        customer: userDoc.data() || {}
                    }
                    paymentDetails['delivery'] = await getDelieryCostOfIntegration(apiData);
                } else {
                    if (!dlvrySettingsData.isKmBasedDelivery && !deliveryByWeightExist) {
                        paymentDetails['delivery'] = await getDeliveryCostBasedOnType(orderPincode, data.address || null, amount, dlvrySettingsData)
    
                    } else if (dlvrySettingsData.isKmBasedDelivery && (data.address && data.address.lat) && storeLatLng.lat) {
                        paymentDetails['delivery'] = await getDeliveryCost(data.address, amount, dlvrySettingsData, storeLatLng, userId, products);
    
                    } else if (deliveryByWeightExist) {
                        paymentDetails['delivery'] = await getDeliveryCostByWeight(products, dlvrySettingsData, amount);
    
                    } else {
                        paymentDetails['delivery'] = await getDeliveryCostBasedOnType(orderPincode, data.address || null, amount, dlvrySettingsData);
                    }
                }
            } else {
                paymentDetails['delivery'] = await getDeliveryCostBasedOnType(orderPincode, data.address || null, amount, dlvrySettingsData);
            }
        }

        const vendorSettings = await db.collection('features').doc('multiVendor').get();
        if (vendorSettings && vendorSettings.data()) {
            paymentDetails.minVendorsAmount = await getMinVendorAmount(products);
            if(vendorSettings.data().multipleVendorInvoices) {
                paymentDetails.delivery.deliveryCost *= checkVendorsCount(products);
            }
        }

        //extra charge on order
        const extraChargeObj = 'extraCharge' in settingsData ? settingsData.extraCharge : {
            charge: 0,
            chargeName: '',
            type: 'flat',
            maxCharge: 0
        };
        let extraCharge = getExtraChargeAmount(extraChargeObj, amount);
        paymentDetails['extraCharge'] = extraCharge;
        paymentDetails['totalPayable'] = parseFloat((amount + paymentDetails.delivery.deliveryCost + extraCharge + totalAddonsPrice).toFixed(2));
        const gstOnDelivery = 'gstPerc' in dlvrySettingsData ? dlvrySettingsData.gstPerc : 0;
        const gst = calcGst(products, {
            cost: paymentDetails.delivery.deliveryCost,
            gstValue: gstOnDelivery
        }, isGstApplicable, extraCharge);
        paymentDetails['totalGst'] = gst.totalGst;
        paymentDetails['deliveryGstObj'] = gst.deliveryGstObj;
        if (paymentDetails.delivery.courierId) {
            paymentDetails.deliveryGstObj.courierId = paymentDetails.delivery.courierId;
        }
        paymentDetails['products'] = gst.products;
        return paymentDetails;
    } else {
        await globalFile.dummyCallToRemoveColdStart();
        return true;
    }
});

async function getMinVendorAmount(products) {
    const vendors = [];
    for (const product of products) {
        if (product.vendorId) {
            const index = vendors.findIndex(v => v.id === product.vendorId);
            if(index !== -1) {
                vendors[index].amount += getPriceWithoutPromos(product) * product.quantity
            } else {
                const data = {
                    id: product.vendorId,
                    amount: getPriceWithoutPromos(product) * product.quantity
                }
                vendors.push(data);
            }
        }
    }
    let minVendorsAmount = [];
    if(vendors.length) {
        for (const vendor of vendors) {
            const vendorRef = await db.collection('features').doc('multiVendor').collection('vendors').doc(vendor.id).get();
            const vendorData = vendorRef.data();
            if(vendorData && vendorData.minOrderAmount && vendor.amount < vendorData.minOrderAmount) {
                minVendorsAmount.push({
                    vendorName: vendorData.displayName || vendorData.name,
                    minOrderAmount: vendorData.minOrderAmount
                })
            }
        }
    }
    return minVendorsAmount;
}

function checkVendorsCount(products) {
    const vendorIds = [];
    products.forEach(product => {
        if (product.vendorId && !vendorIds.includes(product.vendorId)) {
            vendorIds.push(product.vendorId);
        }
    });
    return vendorIds.length || 1;
}

function getExtraChargeAmount(extraChargeObj, totalAmount) {
    let extraCharge = 0;
    if (Object.keys('extraChargeObj').length && extraChargeObj.charge) {
        if (extraChargeObj.type === 'flat') {
            extraCharge = extraChargeObj.charge;
        } else {
            extraCharge = totalAmount * (extraChargeObj.charge / 100);
            if (extraCharge > extraChargeObj.maxCharge) {
                extraCharge = extraChargeObj.maxCharge;
            }
        }
    }
    return extraCharge;
}

function calcTotalMrp(products, isGstApplicable) {
    let totalMrp = 0;
    products.map((p) => {
        let price = 0;
        price = p.hasOwnProperty('mrpPrice') ? p.mrpPrice : p.price;
        if ('gstExclusive' in p && p.gstExclusive && p.gst && isGstApplicable) {
            price += (getPriceWithoutPromos(p) * (p.gst / 100));
        }
        totalMrp += price * p.quantity;

    });
    console.log('totalMrp', totalMrp);
    return totalMrp;
}

function calcTotalMrpWithoutGst(products) {
    let totalMrp = 0;
    products.map((p) => {
        let price = 0;
        price = p.hasOwnProperty('mrpPrice') ? p.mrpPrice : p.price;
        totalMrp += price * p.quantity;
    });
    return totalMrp;
}

function calcDiscountOnMrpWithoutGst(products) {
    let discountOnMrp = 0;
    products.map((p) => {
        let discountedPrice = p.hasOwnProperty('mrpPrice') ? (p.mrpPrice - p.price) : 0;
        if (p.hasOwnProperty('mrpPrice')) {
            discountOnMrp += discountedPrice * p.quantity;
        }
    });
    return discountOnMrp;
}

function calcDiscountOnMrp(products, isGstApplicable) {
    let discountOnMrp = 0;
    products.map((p) => {
        let discountedPrice = p.hasOwnProperty('mrpPrice') ? (p.mrpPrice - getPriceWithoutPromos(p)) : 0;
        if (p.hasOwnProperty('mrpPrice')) {
            discountOnMrp += discountedPrice * p.quantity;
        }
    });
    console.log('discountOnMrp', discountOnMrp);
    return discountOnMrp;
}

function getPriceWithoutPromos(product) {
    return product.price - ((product.couponDiscount || 0) + (product.membershipDiscount || 0))
}

function calcGst(products, delivery, isGstApplicable, extraCharge = 0) {
    let totalGst = 0;
    let minGst = 0;
    let gstOnDelivery = 0;
    let deliveryGstObj = {};
    let allGst = [];
    let gstOnExtraCharge = 0;
    products.map((p) => {
        const price = getPriceWithoutPromos(p) + ('addOns' in p ? p.addOns.totalPrice : 0);
        if (p.gst && isGstApplicable) {
            let gstValue = 0;
            if ('gstExclusive' in p && p.gstExclusive) {
                gstValue = (price * (p.gst / 100)) * p.quantity;
            } else {
                gstValue = (price - (price / (1 + (p.gst / 100)))) * p.quantity;
            }
            allGst.push(p.gst);
            totalGst += gstValue;
            p.gstObj = {
                value: p.gst,
                total: gstValue,
                cgst: p.gst / 2,
                sgst: p.gst / 2,
                igst: p.gst
            }
        } else {
            p.gstObj = {
                value: 0,
                total: 0,
                cgst: 0,
                sgst: 0,
                igst: 0
            }
        }
    });
    if (allGst.length || delivery.gstValue) {
        minGst = allGst.length ? Math.min(...allGst) : 0;
        console.log('minGst', minGst);
        gstOnDelivery = (delivery.cost - (delivery.cost / (1 + ((delivery.gstValue || minGst) / 100))));
        gstOnExtraCharge = (extraCharge - (extraCharge / (1 + (minGst / 100))));
        totalGst += gstOnDelivery + gstOnExtraCharge;
    }
    deliveryGstObj = {
        value: delivery.gstValue || minGst,
        total: gstOnDelivery,
        extraChargeGst: gstOnExtraCharge
    }

    console.log('totalGst', totalGst);
    console.log('deliveryGstObj', deliveryGstObj);
    return {
        totalGst: totalGst,
        deliveryGstObj: deliveryGstObj,
        products: products
    };
}

async function getDeliveryCostBasedOnType(orderPincode, address, orderAmnt, deliveryData) {
    return new Promise(async (resolve, reject) => {
        const deliveryTypes = ['pincodes', 'areas'];
        const type = 'deliveryType' in deliveryData ? address ? deliveryData.deliveryType : deliveryTypes[0] : deliveryTypes[0];
        if (type === deliveryTypes[0]) {
            const response = await getPincodeDeliveryCost(orderPincode, orderAmnt, deliveryData);
            resolve(response);
        } else if (type === deliveryTypes[1]) {
            const response = await getAreaWiseDeliveryCost(address, orderAmnt, deliveryData);
            resolve(response);
        }
    });
}

async function getAreaWiseDeliveryCost(address, orderAmnt, deliveryData) {
    return new Promise(async (resolve, reject) => {
        let response = {
            status: 'not_deliverable',
            deliveryCost: 0
        }
        if (!address) {
            resolve(response);
        } else {
            try {
                const userLocation = {
                    lat: address.lat,
                    lng: address.lng
                };
                const areas = deliveryData.deliveryAreas || [];
                const distances = [];
                let nearestArea = {};

                //get distances array between user location and all available areas
                for (let index = 0; index < areas.length; index++) {
                    const areaLocation = {
                        lat: areas[index].lat,
                        lng: areas[index].lng
                    };
                    if (areaLocation.lat && areaLocation.lng && areas[index].active) {
                        const res = await getDistance(userLocation, areaLocation);
                        if (res && res.hasOwnProperty('rows')) {
                            const distanceInKm = res.rows[0].elements[0].distance.value / 1000;
                            distances.push({
                                index,
                                distance: distanceInKm
                            });
                            distances.sort((a, b) => a.distance - b.distance);
                        }
                    }
                }

                //get the nearest area w.r.t. radius 
                if (distances.length) {
                    for (const distance of distances) {
                        const candidateArea = areas[distance.index];
                        if (candidateArea.radius >= distance.distance) {
                            nearestArea = candidateArea;
                            break;
                        }
                    }
                }

                if (Object.keys(nearestArea).length) {
                    response.status = 'deliverable';
                    response.deliveryCost = nearestArea.cost || 0;
                    response['minAmount'] = nearestArea.minAmnt || 0;
                    const allowFreeDelivery = 'allowFreeDelivery' in deliveryData ? deliveryData.allowFreeDelivery : true;
                    let freeDeliveryAmt = allowFreeDelivery ? parseInt(nearestArea.freeDeliveryAmnt || 0) : Number.MAX_VALUE;
                    let storeEstimatedTime = 'isStoreDelivery' in deliveryData ? deliveryData.isStoreDelivery.estimatedTime : '';
                    response['freeDeliveryAmount'] = freeDeliveryAmt;
                    response['estimatedDeliveryTime'] = nearestArea.estimatedDeliveryTime || storeEstimatedTime;
                    resolve(response);
                } else {
                    resolve(response);
                }
            } catch (error) {
                console.log(error);
                response.status = 'not_deliverable';
                resolve(response);
            }
        }
    });
}

async function getPincodeDeliveryCost(orderPincode, orderAmnt = 0, deliveryData = {}) {
    return new Promise(async (resolve, reject) => {
        let response = {
            status: 'deliverable',
            deliveryCost: 0,
            minAmount: 0,
            freeDeliveryAmount: 0,
            estimatedDeliveryTime: ''
        }
        if(!deliveryData || (typeof deliveryData === 'object' && !Object.keys(deliveryData).length)) {
            const dlvrySettingsRef = await db.collection('features').doc('delivery').get();
            deliveryData = dlvrySettingsRef.data() || {};
        }
        const allowAllPincodes = deliveryData.isAllowAllPincodes;
        const deliveryPincodes = deliveryData.deliveryPincodes;
        const defaultDelivery = deliveryData.defaultDeliveryAmt ? deliveryData.defaultDeliveryAmt : '0';
        const allowFreeDelivery = 'allowFreeDelivery' in deliveryData ? deliveryData.allowFreeDelivery : true;
        let freeDeliveryAmt = allowFreeDelivery ? parseInt(deliveryData.freeDeliveryAmt || 0) : Number.MAX_VALUE;
        let storeEstimatedTime = 'isStoreDelivery' in deliveryData ? deliveryData.isStoreDelivery.estimatedTime : '';
        console.log('freeDeliveryAmt', freeDeliveryAmt);
        if (!allowAllPincodes) {
            if (deliveryPincodes.length > 0) {
                let pincodeFound = false;
                for (let index = 0; index < deliveryPincodes.length; index++) {
                    if (deliveryPincodes[index].pincode === orderPincode) {
                        if (deliveryPincodes[index].active) {
                            freeDeliveryAmt = allowFreeDelivery ? parseInt(deliveryPincodes[index].freeDeliveryAmnt || 0) : Number.MAX_VALUE;
                            console.log('freeDeliveryAmt', freeDeliveryAmt);
                            response['minAmount'] = deliveryPincodes[index].minAmnt || 0;
                            response['estimatedDeliveryTime'] = deliveryPincodes[index].estimatedDeliveryTime || storeEstimatedTime;
                            response['freeDeliveryAmount'] = freeDeliveryAmt;
                            if (orderAmnt < freeDeliveryAmt) {
                                response.deliveryCost = parseInt(deliveryPincodes[index].cost);
                            }
                            response.status = 'deliverable';
                        } else {
                            response['freeDeliveryAmount'] = freeDeliveryAmt;
                            response.status = 'not_deliverable';
                        }
                        pincodeFound = true;
                        break;
                    }
                }
                if(!pincodeFound) {
                    response['freeDeliveryAmount'] = freeDeliveryAmt;
                    response.status = 'not_deliverable';
                }
            } else {
                response.status = 'not_deliverable';
            }
        } else {
            if (deliveryPincodes.length > 0) {
                let pincodeFound = false;
                for (let index = 0; index < deliveryPincodes.length; index++) {
                    if (deliveryPincodes[index].pincode === orderPincode) {
                        if (deliveryPincodes[index].active) {
                            freeDeliveryAmt = allowFreeDelivery ? parseInt(deliveryPincodes[index].freeDeliveryAmnt || 0) : Number.MAX_VALUE;
                            console.log('freeDeliveryAmt', freeDeliveryAmt);
                            response['minAmount'] = deliveryPincodes[index].minAmnt || 0;
                            response['estimatedDeliveryTime'] = deliveryPincodes[index].estimatedDeliveryTime || storeEstimatedTime;
                            response['freeDeliveryAmount'] = freeDeliveryAmt;
                            if (orderAmnt < freeDeliveryAmt) {
                                response.deliveryCost = parseInt(deliveryPincodes[index].cost);
                            }
                        } else {
                            response['freeDeliveryAmount'] = freeDeliveryAmt;
                            if (orderAmnt < freeDeliveryAmt) {
                                response.deliveryCost = parseInt(defaultDelivery);
                            }
                        }
                        pincodeFound = true;
                        break;
                    }
                }
                if(!pincodeFound) {
                    response['freeDeliveryAmount'] = freeDeliveryAmt;
                    if (orderAmnt < freeDeliveryAmt) {
                        response.deliveryCost = parseInt(defaultDelivery);
                    }
                }
            } else {
                response['freeDeliveryAmount'] = freeDeliveryAmt;
                if (orderAmnt < freeDeliveryAmt) {
                    response.deliveryCost = parseInt(defaultDelivery);
                }
            }
        }
        resolve(response);
    });

}

async function getDeliveryCost(address, orderAmnt, dsData, destination, userId, products) {
    return new Promise(async (resolve, reject) => {
        let response = {
            status: 'deliverable',
            deliveryCost: 0,
            freeDeliveryAmount: 0
        }

        let origin = {
            lat: address.lat,
            lng: address.lng
        };

        if (!origin.lat || !origin.lng) {
            const userRef = await db.collection('users').doc(userId).get();
            const user = userRef.data();
            if ('defaultAddress' in user) {
                origin.lat = 'lat' in user.defaultAddress ? user.defaultAddress.lat : null;
                origin.lng = 'lng' in user.defaultAddress ? user.defaultAddress.lng : null;
            }
        }

        if (!origin.lat || !origin.lng) {
            const formattedAddress = `${address.address}, ${address.city}, ${address.state}, ${address.pincode}, ${country}`;
            let geometryData = await generateLatLng(formattedAddress);
            if (geometryData) {
                origin = geometryData.results[0].geometry.location;
            }
        }

        //check vendor distance
        const vendorId = products[0].vendorId || '';
        const isVendorExist = vendorId && products.every(p => p.vendorId === vendorId);
        let calcDeliveryBasedOnKm = false;
        if (isVendorExist) {
            const multiVendorRef = await db.collection('features').doc('multiVendor').get();
            const multiVendorData = multiVendorRef.data();
            calcDeliveryBasedOnKm = 'calcDeliveryBasedOnKm' in multiVendorData ? multiVendorData.calcDeliveryBasedOnKm : false;
            if (calcDeliveryBasedOnKm) {
                const vendorRef = await db.collection('features').doc('multiVendor').collection('vendors').doc(vendorId).get();
                const vendorData = vendorRef.data();
                if (vendorData && vendorData.vendorAddress && vendorData.vendorAddress.lat) {
                    destination.lat = vendorData.vendorAddress.lat;
                    destination.lng = vendorData.vendorAddress.lng;
                }
            }
        }

        let distanceRes = await getDistance(origin, destination);
        let distance = 0;
        if (distanceRes.rows[0].elements && distanceRes.rows[0].elements[0] && distanceRes.rows[0].elements[0].distance) {
            distance = parseFloat((distanceRes.rows[0].elements[0].distance.value / 1000).toFixed(2));
        }

        console.log('distance in kms', distance);

        if (!distance) {
            response.status = 'not_deliverable';
            resolve(response);
            return;
        }

        const allowFreeDelivery = 'allowFreeDelivery' in dsData ? dsData.allowFreeDelivery : true;

        if ('kmSlabs' in dsData && dsData.kmSlabs.active) {
            const slabs = dsData.kmSlabs.slabs;
            let finalRange = {};
            for (const element of slabs) {
                if ((distance > element.range[0]) && (distance <= element.range[1])) {
                    finalRange = element;
                    break;
                }
            }
            if (Object.keys(finalRange).length) {
                const freeDeliveryAmount = allowFreeDelivery ? parseInt(finalRange.freeDeliveryAmount || 0) : Number.MAX_VALUE;
                if (orderAmnt < freeDeliveryAmount) {
                    response.deliveryCost = finalRange.cost;
                }
                response.freeDeliveryAmount = freeDeliveryAmount;
            } else {
                response.status = 'not_deliverable';
                resolve(response);
                return;
            }
        } else {
            const freeDeliveryAmt = allowFreeDelivery ? parseInt(dsData.freeDeliveryAmt || 0) : Number.MAX_VALUE;
            const chargesPerKm = parseInt(dsData.chargesPerKm);
            const maxCost = parseInt(dsData.maxDeliveryOfKm);
            let deliveryCost = Math.ceil(distance * chargesPerKm);
            if (deliveryCost >= maxCost) {
                deliveryCost = maxCost;
            }
            if (orderAmnt < freeDeliveryAmt) {
                response.deliveryCost = deliveryCost;
            }
            response.freeDeliveryAmount = freeDeliveryAmt;
        }

        resolve(response);

    });
}

async function getDistance(origin, destination) {
    return new Promise(function (resolve, reject) {
        https.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${googleMapKey}`, (res) => {
            let data = '';
            res.on('data', (response) => {
                data = data + response;
            });
            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', (err) => {
            console.error(err);
            reject(err);
        });
    });
}

exports.getNearestStoreRegion = functions.https.onCall(async (data, context) => {
    try {
        let userLocation = 'location' in data ? data.location : {};

        if ('address' in data) {
            const formattedAddress = `${data.address.address}, ${data.address.city}, ${data.address.state}, ${data.address.pincode}, ${country}`;
            try {
                const geometryData = await generateLatLng(formattedAddress);
                userLocation = geometryData.results[0].geometry.location;
            } catch (error) {
                console.log(error);
                return {
                    status: 'failure'
                };
            }
        }

        if (!('lat' in userLocation)) {
            return {
                status: 'failure'
            };
        }
        const regions = data.regions;
        const distances = [];
        let finalRegion = {
            status: 'success',
            deliverable: true
        };

        let nearestRegion = {};

        for (const region of regions) {
            if (region && region.hasOwnProperty('center')) {
                const res = await getDistance(userLocation, region.center);
                if (res && res.hasOwnProperty('rows')) {
                    const distanceInKm = res.rows[0].elements[0].distance.value / 1000;
                    distances.push({
                        id: region.id,
                        distance: distanceInKm
                    });
                    distances.sort((a, b) => a.distance - b.distance);
                }
            }
        }
        if (distances.length) {
            for (const d of distances) {
                const region = regions.find(region => region.id === d.id);
                if (region.radius >= d.distance) {
                    nearestRegion = region;
                    break;
                }
            }
        }
        if (Object.keys(nearestRegion).length) {
            const region = {
                id: nearestRegion.id,
                name: nearestRegion.name,
                vendorId: nearestRegion.vendorId || ''
            }
            finalRegion['region'] = region;
            return finalRegion;
        } else {
            finalRegion['deliverable'] = false;
            return finalRegion;
        }

    } catch (error) {
        console.log(error);
        return {
            status: 'failure'
        };
    }
});

function generateLatLng(deliveryAddress) {
    const parameters = {
        address: deliveryAddress,
        key: googleMapKey
    };
    const get_request_args = querystring.stringify(parameters);
    console.log(get_request_args);
    return new Promise(function (resolve, reject) {
        https.get('https://maps.googleapis.com/maps/api/geocode/json?' + get_request_args, (res) => {
            let data = '';
            res.on('data', (response) => {
                data = data + response;
            });
            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', (err) => {
            console.error(err);
            reject(err);
        });
    });
}

async function getDeliveryCostByWeight(products, settings, orderAmnt) {
    return new Promise(async (resolve, reject) => {
        let response = {
            status: 'deliverable',
            deliveryCost: 0,
            freeDeliveryAmount: 0
        }
        const allowFreeDelivery = 'allowFreeDelivery' in settings ? settings.allowFreeDelivery : true;
        const freeDeliveryAmt = allowFreeDelivery ? parseInt(settings.freeDeliveryAmt || 0) : Number.MAX_VALUE;
        response.freeDeliveryAmount = freeDeliveryAmt;
        if (orderAmnt >= freeDeliveryAmt) {
            resolve(response)
        } else {
            let totalWt = 0;
            products.forEach(product => {
                if (product.hasOwnProperty('shippingWt')) {
                    totalWt += (product.shippingWt || 0) * product.quantity;
                }
            });
            if ('weightSlabs' in settings && settings.weightSlabs.active) {
                const slabs = settings.weightSlabs.slabs;
                let finalRange = {};
                for (const element of slabs) {
                    if ((totalWt > (element.range[0] * 1000)) && (totalWt <= (element.range[1] * 1000))) {
                        finalRange = element;
                        break;
                    }
                }
                if (Object.keys(finalRange).length) {
                    response.deliveryCost = finalRange.cost;
                } else {
                    response.status = 'not_deliverable';
                }
                resolve(response);
            } else {
                const cost = settings.deliveryByWeight.cost || 0;
                const grams = 100;
                const perGramCost = cost / grams;

                const baseWt = settings.deliveryByWeight.baseWeight || 0;
                const baseCost = settings.deliveryByWeight.baseCost || 0;
                if (totalWt > baseWt) {
                    response.deliveryCost = baseCost + Math.ceil((totalWt - baseWt) * perGramCost);
                } else {
                    response.deliveryCost = baseCost;
                }
                resolve(response);
            }
        }
    });
}

exports.generateInvoiceByAdmin = functions.https.onCall(async (data, context) => {
    try {
        const orderId = data.orderId,
            orderRef = await db.collection('orders').doc(orderId).get(),
            order = orderRef.data();

        order.invoiceNo = 'invoiceNo' in data && data.invoiceNo ? data.invoiceNo : order.invoiceNo;
        const res = await generateInvoice(order.orderId, order, orderId);
        return res;
    } catch (error) {
        console.log(error);
        return {
            status: 'not_generated'
        };
    }
});

exports.manageInventory = functions.runWith({
    memory: '1GB',
    timeoutSeconds: 540
}).https.onCall(async (data, context) => {
    if(!data) {
        await globalFile.dummyCallToRemoveColdStart();
        return true;
    }
    try {
        const products = data.products;
        let productUnavailable = false;
        let isInventoryManaged = false;
        if(data.orderId) {
            const orderDoc = await db.collection('orders').doc(data.orderId).get();
            isInventoryManaged = 'inventoryManaged' in orderDoc.data().metaData ? orderDoc.data().metaData.inventoryManaged : false;
        }
        if(!isInventoryManaged) {
            for (let index = 0; index < products.length; index++) {
                if (!(products[index]['orderType'] && products[index]['orderType'] == 'membership')) {
                    const qtyStatus = await checkQuantity(products[index]);
                    console.log('index', index, qtyStatus);
                    if (qtyStatus === 'not_available') {
                        productUnavailable = true;
                        break;
                    }
                }
            }
        }
        if (!productUnavailable) {
            if(!isInventoryManaged) {
                for (let index = 0; index < products.length; index++) {
                    if (!(products[index]['orderType'] && products[index]['orderType'] == 'membership')) {
                        await inventoryManagement(products[index]);
                    }
                }
                if(data.orderId) {
                    await db.collection('orders').doc(data.orderId).update({
                        'metaData.inventoryManaged': true
                    })
                }
            }
            return {
                status: true
            };
        } else {
            return {
                status: false
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: false
        };
    }
});

async function checkQuantity(product) {
    return new Promise(async (resolve, reject) => {
        try {
            if (product.productId || product.parentProductId) {
                if (!product.parentProductId) {
                    const productRef = db.collection('products').doc(product.productId);
                    await db.runTransaction(t => {
                        return t.get(productRef).then(async (doc) => {
                            const productDoc = doc.data();
                            if (!product.hasOwnProperty('pack') || (product.hasOwnProperty('pack') && product.name === product.pack.weight)) {
                                if (productDoc && productDoc.productQty && productDoc.productQty !== '') {
                                    if (parseInt(productDoc.productQty) >= product.quantity) {
                                        resolve('available');
                                    } else {
                                        if (parseInt(productDoc.productQty) === 0 && !productDoc.stopWhenNoQty) {
                                            resolve('available');
                                        } else {
                                            resolve('not_available');
                                        }
                                    }
                                } else {
                                    resolve('available');
                                }
                            } else {
                                if (!product.pack.variantType) {
                                    product.pack.variantType = 'variant';
                                }
                                let productFound = false;
                                for (let index = 0; index < productDoc.priceList.length; index++) {
                                    if (product.pack.weight === productDoc.priceList[index].weight) {
                                        productFound = true;
                                        if (productDoc.priceList[index].totalQuantity && productDoc.priceList[index].totalQuantity !== '') {
                                            if (parseInt(productDoc.priceList[index].totalQuantity) >= product.quantity) {
                                                resolve('available');
                                            } else {
                                                if (parseInt(productDoc.priceList[index].totalQuantity) === 0 && !productDoc.stopWhenNoQty) {
                                                    resolve('available');
                                                } else {
                                                    resolve('not_available');
                                                }
                                            }
                                        } else {
                                            resolve('available');
                                        }
                                    }
                                }
                                if(!productFound) {
                                    resolve('not_available');
                                }
                            }
                        });
                    });

                } else {
                    const productRef = db.collection('products').doc(product.parentProductId).collection('options').doc(product.productId);
                    await db.runTransaction(t => {
                        return t.get(productRef).then(async (doc) => {
                            const productDoc = doc.data();
                            if (!product.hasOwnProperty('pack') || (product.hasOwnProperty('pack') && product.name === product.pack.weight)) {
                                if (productDoc && productDoc.productQty && productDoc.productQty !== '') {
                                    if (parseInt(productDoc.productQty) >= product.quantity) {
                                        resolve('available');
                                    } else {
                                        if (parseInt(productDoc.productQty) === 0 && !productDoc.stopWhenNoQty) {
                                            resolve('available');
                                        } else {
                                            resolve('not_available');
                                        }
                                    }
                                } else {
                                    resolve('available');
                                }
                            } else {
                                if (!product.pack.variantType) {
                                    product.pack.variantType = 'variant';
                                }
                                let productFound = false;
                                for (let index = 0; index < productDoc.priceList.length; index++) {
                                    if (product.pack.weight === productDoc.priceList[index].weight) {
                                        productFound = true;
                                        if (productDoc.priceList[index].totalQuantity && productDoc.priceList[index].totalQuantity !== '') {
                                            if (parseInt(productDoc.priceList[index].totalQuantity) >= product.quantity) {
                                                resolve('available');
                                            } else {
                                                if (parseInt(productDoc.priceList[index].totalQuantity) === 0 && !productDoc.stopWhenNoQty) {
                                                    resolve('available');
                                                } else {
                                                    resolve('not_available');
                                                }
                                            }
                                        } else {
                                            resolve('available');
                                        }
                                    }
                                    if(!productFound) {
                                        resolve('not_available');
                                    }
                                }
                            }
                        });
                    });

                }
            } else {
                resolve('not_available');
            }

        } catch (error) {
            console.log(error);
            resolve('not_available');
        }
    });
}

async function inventoryManagement(product) {
    return new Promise(async (resolve, reject) => {
        try {
            if(product.orderType && product.orderType === 'membership') {
                resolve(true);
                return;
            }
            if (product.productId || product.parentProductId) {
                if (!product.parentProductId) {
                    const productRef = db.collection('products').doc(product.productId);
                    await db.runTransaction(t => {
                        return t.get(productRef).then(async (doc) => {
                            const productDoc = doc.data();
                            if (!product.hasOwnProperty('pack') || (product.hasOwnProperty('pack') && product.name === product.pack.weight)) {
                                if (productDoc && productDoc.productQty && productDoc.productQty !== '') {
                                    if (parseInt(productDoc.productQty) >= product.quantity) {
                                        productDoc.productQty = parseInt(productDoc.productQty) - product.quantity;
                                        t.update(productRef, {
                                            productQty: productDoc.productQty.toString()
                                        });
                                    }
                                }
                            } else {
                                if (!product.pack.variantType) {
                                    product.pack.variantType = 'variant';
                                }
                                for (let index = 0; index < productDoc.priceList.length; index++) {
                                    if (product.pack.weight === productDoc.priceList[index].weight) {
                                        if (productDoc.priceList[index].totalQuantity && (parseInt(productDoc.priceList[index].totalQuantity) >= product.quantity)) {
                                            productDoc.priceList[index].totalQuantity = (parseInt(productDoc.priceList[index].totalQuantity) - product.quantity).toString();
                                            t.update(productRef, {
                                                priceList: productDoc.priceList
                                            });
                                        }
                                    }
                                }
                            }
                        });
                    });

                } else {
                    const productRef = db.collection('products').doc(product.parentProductId).collection('options').doc(product.productId);
                    await db.runTransaction(t => {
                        return t.get(productRef).then(async (doc) => {
                            const productDoc = doc.data();
                            if (!product.hasOwnProperty('pack') || (product.hasOwnProperty('pack') && product.name === product.pack.weight)) {
                                if (productDoc && productDoc.productQty && productDoc.productQty !== '') {
                                    if (parseInt(productDoc.productQty) >= product.quantity) {
                                        productDoc.productQty = parseInt(productDoc.productQty) - product.quantity;
                                        t.update(productRef, {
                                            productQty: productDoc.productQty.toString()
                                        });
                                    }
                                }
                            } else {
                                if (!product.pack.variantType) {
                                    product.pack.variantType = 'variant';
                                }
                                for (let index = 0; index < productDoc.priceList.length; index++) {
                                    if (product.pack.weight === productDoc.priceList[index].weight) {
                                        if (productDoc.priceList[index].totalQuantity && (parseInt(productDoc.priceList[index].totalQuantity) >= product.quantity)) {
                                            productDoc.priceList[index].totalQuantity = (parseInt(productDoc.priceList[index].totalQuantity) - product.quantity).toString();
                                            t.update(productRef, {
                                                priceList: productDoc.priceList
                                            });
                                        }
                                    }
                                }
                            }
                        });
                    });

                }
            }
            resolve(true);

        } catch (error) {
            console.log(error);
        }
    });
}

exports.returnOrderByAdmin = functions.https.onCall(async (data, context) => {
    const order = data.order;
    const refundAmount = data.refundAmount;

    try {
        if (refundAmount > 0) {
            const storeInfo = await db.collection('settings').doc('store').get();
            let storeName = 'Store';
            if (storeInfo.data()) {
                storeName = storeInfo.data().storeName;
            }
            const data = {
                amount: refundAmount,
                storeName: storeName,
                uid: order.userId
            }

            await globalFile.addToUserWallet(data);

            const refundChatMsg = {
                message: `Refund of ${currencySymbol}${data.amount} for OrderID:${orderIdPrefix}${order.orderId} has been credited to your wallet.`,
                title: 'Refund Credited!',
                author: 'admin',
                type: 'link',
                orderId: order.orderId,
                orderDocId: order.id,
                btns: [{
                    txt: 'View Order',
                    task: 'orderView'
                }, ]
            }
            await sendChatMsg(refundChatMsg, order.userId);
        }

        await db.collection('orders').doc(order.id).update({
            status: 'Returned'
        });

        return {
            status: true
        }

    } catch (error) {
        console.log(error);
        return {
            status: false
        }
    }
});

async function rollBackQty(product) {
    return new Promise(async (resolve, reject) => {
        try {
            if(product.orderType && product.orderType === 'membership') {
                resolve(true);
                return;
            }
            if (product.productId || product.parentProductId) {
                if (!product.parentProductId) {
                    const productRef = db.collection('products').doc(product.productId);
                    await db.runTransaction(t => {
                        return t.get(productRef).then(async (doc) => {
                            const productDoc = doc.data();
                            if(productDoc) {
                                if (!product.hasOwnProperty('pack') || (product.hasOwnProperty('pack') && product.name === product.pack.weight)) {
                                    productDoc.productQty = parseInt(productDoc && productDoc.productQty && productDoc.productQty !== '' ? productDoc.productQty : '0') + product.quantity;
                                    t.update(productRef, {
                                        productQty: productDoc.productQty.toString()
                                    });
                                } else {
                                    if (!product.pack.variantType) {
                                        product.pack.variantType = 'variant';
                                    }
                                    for (let index = 0; index < productDoc.priceList.length; index++) {
                                        if (product.pack.weight === productDoc.priceList[index].weight) {
                                            productDoc.priceList[index].totalQuantity = (parseInt(productDoc.priceList[index].totalQuantity && productDoc.priceList[index].totalQuantity !== '' ? productDoc.priceList[index].totalQuantity : '0') + product.quantity).toString();
                                            t.update(productRef, {
                                                priceList: productDoc.priceList
                                            });
                                        }
                                    }
                                }
                            }
                        });
                    });

                } else {
                    const productRef = db.collection('products').doc(product.parentProductId).collection('options').doc(product.productId);
                    await db.runTransaction(t => {
                        return t.get(productRef).then(async (doc) => {
                            const productDoc = doc.data();
                            if(productDoc) {
                                if (!product.hasOwnProperty('pack') || (product.hasOwnProperty('pack') && product.name === product.pack.weight)) {
                                    productDoc.productQty = parseInt(productDoc && productDoc.productQty && productDoc.productQty !== '' ? productDoc.productQty : '0') + product.quantity;
                                    t.update(productRef, {
                                        productQty: productDoc.productQty.toString()
                                    });
                                } else {
                                    if (!product.pack.variantType) {
                                        product.pack.variantType = 'variant';
                                    }
                                    for (let index = 0; index < productDoc.priceList.length; index++) {
                                        if (product.pack.weight === productDoc.priceList[index].weight) {
                                            productDoc.priceList[index].totalQuantity = (parseInt(productDoc.priceList[index].totalQuantity && productDoc.priceList[index].totalQuantity !== '' ? productDoc.priceList[index].totalQuantity : '0') + product.quantity).toString();
                                            t.update(productRef, {
                                                priceList: productDoc.priceList
                                            });
                                        }
                                    }
                                }
                            }
                        });
                    });

                }
            }
            resolve(true);

        } catch (error) {
            console.log(error);
            resolve(false)
        }
    });
}

async function saveOrderTimeLine(orderId, status) {
    return new Promise(async (resolve, reject) => {
        await db.collection('orders').doc(orderId).update({
            ['timeline.' + status]: {
                time: new Date(moment().tz(timeZone))
            }
        });
        await db.collection('orders').doc(orderId).collection('logs').add({
            text: `Order ${status === 'Pending' ? 'Placed' : status} at`,
            time: new Date(moment().tz(timeZone))
        });
        resolve(true);
    });
}

async function saveOrderLogs(orderId, text) {
    return new Promise(async (resolve, reject) => {
        await db.collection('orders').doc(orderId).collection('logs').add({
            text,
            time: new Date(moment().tz(timeZone))
        });
        resolve(true);
    });
}

async function getDelieryCostOfIntegration(data) {
    return new Promise(async (resolve) => {
        let deliveryRes = {
            status: 'not_deliverable',
            deliveryCost: 0,
            courierId: null,
            freeDeliveryAmount: Number.MAX_VALUE
        }
        try {
            let totalWeight = 0;
            data.products.forEach(product => {
                totalWeight += ((product.shippingWt || 0) / 1000) || 0;
            });
            if (!totalWeight) {
                console.log('*****no shipping weight in order*****');
                resolve(deliveryRes);
            } else {
                console.log('totalWeight', totalWeight);
                const apiData = {
                    integrationCode: data.integrationCode,
                    projectId,
                    data: {
                        pickupPostcode: data.pickupPostcode,
                        deliveryPostcode: data.orderPincode,
                        weight: totalWeight,
                        dropLocation: data.dropLocation,
                        pickupLocation: data.pickupLocation,
                        orderAmount: data.orderAmount,
                        customer: data.customer
                    }
                };
                try {
                    axios.post(`${middleware.apiUrl}/delivery-getDeliveryCharges`, apiData)
                        .then(function (response) {
                            let deliveryCost = response.data.deliveryCost;
                            let courierId = response.data.courierId;
                            if(deliveryCost) {
                                if (data.orderAmount < data.freeDeliveryAmt) {
                                    deliveryRes.status = 'deliverable';
                                    deliveryRes.deliveryCost = deliveryCost;
                                    deliveryRes.courierId = courierId;
                                    console.log('deliveryRes', deliveryRes);
                                    resolve(deliveryRes);
                                } else {
                                    deliveryRes.status = 'deliverable';
                                    resolve(deliveryRes);
                                }
                            } else {
                                resolve(deliveryRes);
                            }
                        })
                        .catch(function (error) {
                            // console.log('getDelieryCostOfIntegration: error in calling middleware', error);
                            resolve(deliveryRes);
                        });
                } catch (error) {
                    // console.log('error in getDelieryCostOfIntegration', error);
                    resolve(deliveryRes);
                }
            }

        } catch (error) {
            console.log('error in shiprocket', error);
            resolve(deliveryRes);
        }
    });
}

function numberFormatter(number) {
    number = parseFloat(number);
    return fmt.formatFixed(number, 2);
}

async function updatePiecesPriceIssue(order, orderId) {
    try {
        if (order.products && order.products.length) {
            for (const product of order.products) {
                if (product && 'pack' in product && product.pack.variantType === 'pieces') {
                    product.price = product.pack.price * product.quantity;
                }
            }
            await db.collection('orders').doc(orderId).update({
                products: order.products
            });
        }
    } catch (error) {
        console.log(error);
    }
}


async function getInvoiceUrl(data) {
    return new Promise(async (resolve) => {
        try {
            var base64EncodedPdfString = data.base64,
                mimeType = 'application/pdf',
                pdfBuffer = new Buffer(base64EncodedPdfString, 'base64');

            var file = bucket.file(data.fileName);

            file.save(pdfBuffer, {
                metadata: {
                    contentType: mimeType
                },
            });
            const config = {
                action: 'read',
                expires: '03-01-2500'
            };
            console.log("file saved");
            let downloadUrl = await file.getSignedUrl(config);
            console.log('downloadUrl', downloadUrl);
            resolve(downloadUrl[0]);
        } catch (error) {
            resolve(null);
        }
    });
}

async function getAdminDefaultCountry() {
    return new Promise(async (resolve) => {
        let defaultCountry = {
            "countryCode": "IN",
            "countryName": "India",
            "currencyCode": "INR",
            "dialCode": "+91"
        };
        const countriesRef = await db.collection('features').doc('multiCountries').get();
        const countriesData = countriesRef.data();
        if(countriesData && countriesData.settings && countriesData.settings.defaultCountry) {
            defaultCountry = countriesData.settings.defaultCountry;
        }
        resolve(defaultCountry);
    }); 
}

async function checkIsInternationalUser(userAddress) {
    const adminCountry = await getAdminDefaultCountry();
    if(adminCountry.countryName && adminCountry.countryName.toLowerCase() === 'india' && userAddress.country && userAddress.country.toLowerCase() !== 'india') {
        return true;
    } else {
        return false;
    }
}

exports.getDistance = functions.https.onCall(async (data, context) => {
    if(data.origin && data.destination) {
        let distanceRes = await getDistance(data.origin, data.destination);
        let distance = 0;
        if (distanceRes.rows[0].elements && distanceRes.rows[0].elements[0] && distanceRes.rows[0].elements[0].distance) {
            distance = parseFloat((distanceRes.rows[0].elements[0].distance.value / 1000).toFixed(2));
        }
        return {distance};
    } else {
        return {
            distance: 0
        }
    }
});

let envData;
exports.orderScheduler = functions.runWith({ memory: '1GB', timeoutSeconds: 540 }).pubsub.schedule('* * * * *').timeZone(timeZone).onRun(async (context) => {
    const today = moment().tz(timeZone);
    const oneWeekAgo = moment(today).tz(timeZone).subtract(20, 'minutes');
    const pendingOrdersRef = await db.collection('orders')
        .where('createdAt', '>=', oneWeekAgo)
        .where('status', '==', 'Pending')
        .get();
    const pendingOrders = [];
    pendingOrdersRef.forEach(doc => {
        if (doc.id && doc.data()) {
            pendingOrders.push({ id: doc.id, ...doc.data() });
        }
    });
    if (pendingOrders.length) {
        const env = await getEnvironmentVariables();
        const revertTime = env.qtyRevertTime || 15;
        for (const order of pendingOrders) {
            if (order.payment.mode === 'razorpay' || ('paymentExtras' in order && order.paymentExtras.razorpayOrderId)) {
                let razorpayOrderId = 'paymentExtras' in order && order.paymentExtras.razorpayOrderId ? order.paymentExtras.razorpayOrderId : null;
                let paymentId = order.payment.details ? order.payment.details.paymentId : null;
                if (paymentId && paymentId.hasOwnProperty('razorpay_payment_id')) {
                    paymentId = paymentId['razorpay_payment_id'];
                }
                console.log('paymentId', paymentId);
                if (razorpayOrderId || paymentId) {
                    const paymentStatusRes = await paymentsFile.getRazorpayPaymentStatus({ paymentId, orderId: razorpayOrderId });
                    console.log('razorpayOrderId + payment_status', razorpayOrderId, paymentStatusRes.payment_status);
                    if (['authorized', 'captured'].includes(paymentStatusRes.payment_status)) {
                        const updateObj = {
                            'payment.completed': true,
                            'payment.status': 'completed',
                            status: 'Confirmed',
                        }
                        if(!order.payment || !order.payment.details || !order.payment.details.paymentId) {
                            updateObj['payment.details.paymentId'] = paymentStatusRes.paymentId;
                        }
                        await db.collection('orders').doc(order.id).update(updateObj);
                    }
                    if (paymentStatusRes.payment_status === 'failed' && order.payment.status !== 'failed') {
                        await db.collection('orders').doc(order.id).update({
                            'payment.completed': false,
                            'payment.status': 'failed',
                            status: 'Pending',
                            walletAmount: 0,
                            cashbackAmount: 0,
                            extraChargeOnPayment: {
                                charge: 0
                            },
                        });
                    }
                }
            }


            const now = moment().tz(timeZone);
            const duration = moment.duration(now.diff(moment(order.createdAt.toDate()).tz(timeZone)));
            const minutes = duration.asMinutes();
            if ((minutes >= revertTime) && order.metaData && order.metaData.inventoryManaged) {
                console.log('pending order', order.id, order.orderId);
                for (const product of order.products) {
                    console.log('product qty reverted name', product.name, product.productId);
                    await rollBackQty(product)
                }
                await db.collection('orders').doc(order.id).update({
                    'metaData.inventoryManaged': false
                });
            }
        }
    }

    const paymentCollectionRef = db.collection('payment').doc('history').collection('payments');
    const paymentRef = await paymentCollectionRef
        .where('mode', '==', 'razorpay')
        .where('status', '==', 'pending').get();
    const payments = [];
    paymentRef.forEach(doc => {
        if (doc && doc.data()) {
            payments.push({ id: doc.id, ...doc.data() });
        }
    });
    if (payments.length) {
        for (const payment of payments) {
            const orderRef = await db.collection(payment.type).doc(payment.orderId).get();
            const order = orderRef.data();
            let razorpayOrderId = null;
            if (order) {
                razorpayOrderId = 'paymentExtras' in order && order.paymentExtras.razorpayOrderId ? order.paymentExtras.razorpayOrderId : null;
            }
            let razorpayPaymentId = payment.details ? payment.details.paymentId : null;
            if (razorpayPaymentId && razorpayPaymentId.hasOwnProperty('razorpay_payment_id')) {
                razorpayPaymentId = razorpayPaymentId['razorpay_payment_id'];
            }
            if (razorpayOrderId || razorpayPaymentId) {
                const paymentStatusRes = await paymentsFile.getRazorpayPaymentStatus({ paymentId: razorpayPaymentId, orderId: razorpayOrderId });
                if (['authorized', 'captured'].includes(paymentStatusRes.payment_status)) {
                    await paymentCollectionRef.doc(payment.id).update({
                        status: 'successful'
                    });
                    await db.collection(payment.type).doc(payment.orderId).update({
                        'payment.completed': true,
                        'payment.status': 'completed',
                        status: payment.type === 'orders' ? 'Confirmed' : 'accepted'
                    });
                }
                if (paymentStatusRes.payment_status === 'failed' && order.payment.status !== 'failed') {
                    await paymentCollectionRef.doc(payment.id).update({
                        status: 'failed'
                    });
                    await db.collection(payment.type).doc(payment.orderId).update({
                        'payment.completed': false,
                        'payment.status': 'failed',
                        status: payment.type === 'orders' ? 'Pending' : 'pending'
                    });
                }
            }
        }
    }

    //for whatsapp hot reload
    try {
        if (!envData) {
            const envDataRef = await db.collection('settings').doc('environment').get()
            envData = envDataRef.data()
            console.log("fetched env data")
        }
        if (envData.whatsapp) {
            // console.log("called whatsapp api")
            await axios.post(`https://${firebaseLocation}-${projectId}.cloudfunctions.net/whatsappExpress-whatsappExpress/webhook`, { object: {} })
        }
    } catch (error) {
        console.log("error in whatsapp scheduler")
    }
    return;
});

async function manageInventoryAccordingToToggle(order, orderId) {
    if('inventoryManaged' in order.metaData && !order.metaData.inventoryManaged) {
        for (const product of order.products) {
            await inventoryManagement(product);
        }
    }
    await db.collection('orders').doc(orderId).update({
        'metaData.inventoryManaged': true
    });
    return true;
}

exports.checkProductsAvailability = functions.https.onCall(async (data, context) => {
    let isProductsAvailable = true;
    let unavailableProduct = '';
    for (const product of data.products) {
        if (!(product['orderType'] && product['orderType'] == 'membership')) {
            const qtyStatus = await checkQuantity(product);
            if (qtyStatus === 'not_available') {
                isProductsAvailable = false;
                unavailableProduct = product.name;
                break;
            }
        }
    }
    return {
        isProductsAvailable,
        unavailableProduct
    }
});

async function generateInvoiceNoForConfirmedOrders(orderDocId) {
    return new Promise(async (resolve) => {
        try {
            const metaDataRef = db.collection('ordersMetaData').doc('metadata');
            const orderRef = db.collection('orders').doc(orderDocId);
            await db.runTransaction(t => {
                return t.get(metaDataRef)
                    .then(async doc => {
                        let lastInvoiceNo = doc.data().lastInvoiceNo || doc.data().lastOrderId;
                        if(!lastInvoiceNo) {
                            return;
                        }
                        lastInvoiceNo = doc.data().lastOrderId === lastInvoiceNo ? lastInvoiceNo : lastInvoiceNo + 1;
                        t.update(metaDataRef, {
                            lastInvoiceNo 
                        });
                        t.update(orderRef, {
                            invoiceNo: lastInvoiceNo,
                        });  
                        resolve(lastInvoiceNo);              
                    });
            });
        } catch (error) {
            console.log(error);
            resolve('');
        }
    })
}

exports.getPincodeDeliveryAvailability = functions.https.onCall(async (data, context) => {
    try {
        if(!data.pincode) {
            return {
                status: false, 
                response: null 
            }
        }
        const response = await getPincodeDeliveryCost(data.pincode);
        return {
            status: true, 
            response
        }
    } catch (error) {
        console.log(error);
        return {
            status: false, 
            response: null 
        }
    }
});