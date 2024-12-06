const functions = require("firebase-functions");
const request = require('request');
var moment = require('moment-timezone');
const axios = require('axios').default;
const algoliasearch = require('algoliasearch');
//var pincodesJson = require('../email-templates/pincodes.json');
const fs = require('fs');
const {
    admin,
    db,
    WEB_API_KEY,
    dynamicLinkInfo,
    coutryPhoneCode,
    referralLinkInfo,
    timeZone,
    projectId,
    algolia,
    country,
    typesenseCred
} = require('./admin');
// const vendorJs = require('vendor');

const usersModule = require('../integrations/core/users')

const ALGOLIA_ID = algolia.id;
const ALGOLIA_ADMIN_KEY = algolia.adminKey;
const ALGOLIA_INDEX_NAME = projectId;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const algoliaIndex = client.initIndex(ALGOLIA_INDEX_NAME);

async function makePricesNumScript() {
    const pdtRef = await db.collection('products').get();
    pdtRef.forEach(async (doc) => {
        if (doc.id && doc.data()) {
            const p = doc.data();
            let isUpdatedRequired = false;
            if (!p.isPriceList) {
                if (p.hasOwnProperty('discountedPrice') && (typeof p.discountedPrice === 'string' || p.discountedPrice instanceof String)) {
                    p.discountedPrice = parseInt(p.discountedPrice);
                    isUpdatedRequired = true;
                }
                if (p.hasOwnProperty('prodPrice') && (typeof p.prodPrice === 'string' || p.prodPrice instanceof String)) {
                    p.prodPrice = parseInt(p.prodPrice);
                    isUpdatedRequired = true;
                }
            } else {
                p.priceList.map((pl) => {
                    if (pl.hasOwnProperty('discountedPrice') && (typeof pl.discountedPrice === 'string' || pl.discountedPrice instanceof String)) {
                        pl.discountedPrice = parseInt(pl.discountedPrice);
                        isUpdatedRequired = true;
                    }
                    if (pl.hasOwnProperty('price') && (typeof pl.price === 'string' || pl.price instanceof String)) {
                        pl.price = parseInt(pl.price);
                        isUpdatedRequired = true;
                    }
                });
            }
            if (isUpdatedRequired) {
                console.log("Updating Product prices");
                await db.collection('products').doc(doc.id).update(p);
            } else {
                console.log("already updated");
            }
        }
    });
}



async function discountedPriceUpdateScript() {
    const pdtRef = await db.collection('products').get();
    pdtRef.forEach(async (doc) => {
        if (doc.id && doc.data()) {
            const p = doc.data();
            if (!p.isPriceList) {
                if (p.hasOwnProperty('discountedPrice') && p.discountedPrice === null) {
                    p.discountedPrice = parseInt(p.prodPrice);
                }
            } else {
                p.priceList.map((pl) => {
                    if (pl.hasOwnProperty('discountedPrice') && pl.discountedPrice === null) {
                        pl.discountedPrice = parseInt(pl.price);
                    }
                });
            }
            await db.collection('products').doc(doc.id).update(p);
        }
    });
}

async function discountedPriceFieldAddScript() {
    const pdtRef = await db.collection('products').get();
    pdtRef.forEach(async (doc) => {
        if (doc.id && doc.data()) {
            const p = doc.data();
            if (!p.isPriceList) {
                if (!p.hasOwnProperty('discountedPrice')) {
                    p.discountedPrice = parseInt(p.prodPrice);
                }
            } else {
                p.priceList.map((pl) => {
                    if (!pl.hasOwnProperty('discountedPrice')) {
                        pl.discountedPrice = parseInt(pl.price);
                    }
                });
            }
            await db.collection('products').doc(doc.id).update(p);
        }
    });
}

async function generateDynamicLinksScript() {
    const pdtRef = await db.collection('products').get();
    pdtRef.forEach(async (doc) => {
        if (doc.id && doc.data()) {
            const pid = doc.id;
            const name = doc.data().prodName;
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
    });
}

async function priceListMinDiscountedPriceScript() {
    const pdtRef = await db.collection('products').get();
    pdtRef.forEach(async (doc) => {
        if (doc.id && doc.data()) {
            const p = doc.data();
            if (p.isPriceList) {
                let dPList = [];
                p.priceList.map((pl) => {
                    if (pl.hasOwnProperty('discountedPrice')) {
                        dPList.push(pl.discountedPrice);
                    }
                });
                const minPrice = Math.min(...dPList);
                await db.collection('products').doc(doc.id).update({
                    discountedPrice: minPrice
                });
            }
        }
    });
}

async function generateDiscountPercentageScript() {
    const pdtRef = await db.collection('products').get();
    pdtRef.forEach(async (doc) => {
        if (doc.id && doc.data()) {
            const p = doc.data();
            let discount = 0;
            if (!p.isPriceList) {
                discount = parseFloat((((p.prodPrice - p.discountedPrice) / p.prodPrice) * 100).toFixed(2));
            } else {
                let plDiscountList = [];
                p.priceList.map((pl) => {
                    const plDiscount = ((pl.price - pl.discountedPrice) / pl.price) * 100;
                    plDiscountList.push(plDiscount);
                });
                discount = parseFloat((Math.max(...plDiscountList)).toFixed(2));
            }
            await db.collection('products').doc(doc.id).update({
                discount: discount
            });
        }
    });
}

async function latLngUpdateScript() {
    const usersRef = await db.collection('users').get();
    usersRef.forEach(async (userDoc) => {
        if (userDoc && userDoc.id && userDoc.data()) {
            const adrsRef = await db.collection('users').doc(userDoc.id).collection('addresses').get();
            adrsRef.forEach(async (doc) => {
                if (doc && doc.id && doc.data()) {
                    const adrsData = doc.data();
                    const formattedAddress = `${adrsData.address}, ${adrsData.city}, ${adrsData.state}, ${adrsData.pincode}, ${country}`;
                    let geometryData = await generateLatLng(formattedAddress);
                    adrsLat = geometryData.results[0].geometry.location.lat;
                    adrsLng = geometryData.results[0].geometry.location.lng;
                    await db.collection('users').doc(userDoc.id).collection('addresses').doc(doc.id).update({
                        lat: adrsLat,
                        lng: adrsLng
                    })
                }
            })
        }
    })
}

async function addCouponNameInOrdersScript() {
    const orderRef = await db.collection('orders').get();
    orderRef.forEach(async (doc) => {
        if (doc.id && doc.data()) {
            const order = doc.data();
            const couponId = order.couponId ? order.couponId : '';
            if (couponId) {
                const name = await getCouponName(couponId);
                if (name !== 'no_coupon') {
                    await db.collection('orders').doc(doc.id).update({
                        couponName: name
                    });
                }
            }
        }
    });
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


async function saveUserIfNotCreatedOnAuth() {
    const authDocs = await admin.auth().listUsers(1000);
    authDocs.users.forEach(async (userDoc) => {
        let authUser = userDoc.toJSON();
        // console.log(authUser.uid);
        // console.log(authUser.phoneNumber);
        if (authUser && authUser.uid) {
            // console.log(doc.id);
            const userDoc = await db.collection('users').doc(authUser.uid).get();
            const user = userDoc.data();
            if (!user || user === undefined || !user.hasOwnProperty('name')) {
                const storeRef = await db.collection('settings').doc('store').get();
                const welcomeMsg = storeRef && storeRef.data() && storeRef.data().welcomeMsg ? storeRef.data().welcomeMsg : 'Welcome to the app.';
                const phoneNo = authUser.phoneNumber;
                const user = {
                    name: 'user',
                    email: '',
                    phoneNo: phoneNo ? phoneNo : '',
                    createdAt: new Date(),
                    lastAccessAt: new Date(),
                    active: true,
                    role: 'user',
                    dP: 'assets/img/user-pic.gif',
                    readTerms: false,
                    wallet: {
                        balance: 0,
                        cashback: 0,
                        lastTransactions: {}
                    },
                    paymentInfo: null,
                    defaultAddress: null,
                }
                const chat = {
                    type: 'txt',
                    createdAt: new Date(),
                    isRead: false,
                    author: 'admin',
                    published: true,
                    message: welcomeMsg,
                    images: null,
                    mob: null,
                    thumb: null,
                    imageCount: null
                }
                console.log(authUser.uid);
                console.log(user);
                await db.collection('users').doc(authUser.uid).set(user);
                await db.collection('chats').doc(authUser.uid).set({
                    lastMessage: welcomeMsg,
                    lastMessageAt: new Date(),
                    totalMsgs: 1,
                    name: 'user',
                    adminActive: false,
                    unreadMsgs: 0,
                    userActive: false,
                    unreadAdminMsgs: 1,
                    userPhoneNo: ''
                });
                await db.collection('chats').doc(authUser.uid).collection('messages').add(chat);
            }
        }
    });
}


async function addPhoneCodeAndSetFromUIFlagToExistingUserScript() {
    const userRef = await db.collection('users').get();
    userRef.forEach(async (doc) => {
        if (doc && doc.id && doc.data()) {
            const user = doc.data();
            let phoneNo = user.phoneNo ? user.phoneNo : '';
            if (!phoneNo.includes(coutryPhoneCode)) {
                phoneNo = coutryPhoneCode + phoneNo;
                await db.collection('users').doc(doc.id).update({
                    phoneNo: phoneNo
                });
            }
            await db.collection('users').doc(doc.id).update({
                setFromUI: true
            });
        }
    });
}

async function priceListQtyUpdateScript() {
    const pdtRef = await db.collection('products').get();
    pdtRef.forEach(async (doc) => {
        if (doc.id && doc.data()) {
            const p = doc.data();
            if (p.isPriceList) {
                let makePdtQtyZero = false;
                p.priceList.map((pl) => {
                    if (pl.hasOwnProperty('totalQuantity') && pl.totalQuantity === '0') {
                        makePdtQtyZero = true;
                    }
                });
                if (makePdtQtyZero) {
                    p['productQty'] = '0';
                } else {
                    p['productQty'] = '';
                }
                await db.collection('products').doc(doc.id).update({
                    productQty: p['productQty']
                });
            }
        }
    });
}

async function createReferralLinkScript() {
    const userRef = await db.collection('users').get();
    userRef.forEach(async (doc) => {
        if (doc && doc.id && doc.data()) {
            const user = doc.data();
            const userId = doc.id;
            let phoneNo = user.phoneNo ? user.phoneNo : '';
            let name = user.name ? user.name : 'user';
            const referralLink = await getReferralLink(userId, name, phoneNo);
            if (referralLink) {
                await db.collection('users').doc(userId).update({
                    referralLink: referralLink
                });
            }

        }
    });
}

async function getReferralLink(uid, name, phone) {
    return new Promise(async (resolve, reject) => {
        const body = {
            'dynamicLinkInfo': {
                'domainUriPrefix': referralLinkInfo.domainUriPrefix,
                'link': `${referralLinkInfo.deepLinkURL}/${uid}/`,
                "androidInfo": {
                    "androidPackageName": referralLinkInfo.androidPackageName
                },
                "iosInfo": {
                    "iosBundleId": referralLinkInfo.iosBundleId
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
                    const referralLink = response.body.shortLink;
                    resolve(referralLink);
                }
            }
        });
    });

}

async function feedRatings() {
    let uids = [];
    const users = await db.collection('users').limit(50).get();
    users.forEach(doc => {
        uids.push(doc.id);
    });
    for (const uid of uids) {
        let rating = Math.floor(Math.random() * 5) + 1;
        const data = {
            createdAt: new Date(),
            userName: 'Mayank',
            photos: [{
                thumb: 'https://storage.googleapis.com/raymond-app-fc456.appspot.com/productRatings/LWfYYeJ3BIwN5t0FWuhj/E9G4HtMHrXf8J8zUadZ8K0jn0Zo1/images/thumb_1605774377267.png?GoogleAccessId=firebase-adminsdk-mzr9r%40raymond-app-fc456.iam.gserviceaccount.com&Expires=16730323200&Signature=kswmTnu9Nmh3g89e8acCbycYh3icfvuMjVms4K2hwEsMVbgIjwsGlS2CS2p9e0SZkx86fYjKXBCK8DsGzNWmJYylBKEbrKNk1Y1EODmVzuAUDEasj97HfXLqGwlysqY2jR%2BPCgajNFEd12sBdSp%2BO%2BptjSynw0FtnMuoSkqScWb1jkYN8hj6BFHLH%2Fu%2B%2B5qQKipoQGx9Xin55VN5iQdr7j82m%2BIoNipYcYERoKgk0l0ufsJZcFPx83TCV%2B%2FfL3TBwDN2TjWDaLQx3f0e0lawdAalMFN0nvx0YE%2FOcJ9WWSW4TvIUttlzKNyOvsYGV%2FUtamZuhgvpIcWoJ%2BjFBXC9NQ%3D%3D'
            }],
            rating: rating,
            review: 'Very good product',
            status: 'pending'
        }
        await db.collection('productRatings').doc('LWfYYeJ3BIwN5t0FWuhj').collection('ratings').doc(uid).set(data);
    }
}

async function approveRatings() {
    const ratingsRef = await db.collection('productRatings').doc('LWfYYeJ3BIwN5t0FWuhj').collection('ratings').get();
    ratingsRef.forEach(async (doc) => {
        await db.collection('productRatings').doc('LWfYYeJ3BIwN5t0FWuhj').collection('ratings').doc(doc.id).update({
            status: 'approved'
        });
    });
}

async function setUserLoginMode() {
    let userIds = [];
    const usersRef = await db.collection('users').get();
    usersRef.forEach((doc) => {
        if (doc && doc.id) {
            userIds.push(doc.id);
        }
    });
    for (const uid of userIds) {
        const user = await getAuthData(uid);
        let loginMode = '';
        const providerId = user.providerData[0].providerId;
        if (providerId === 'phone') {
            loginMode = 'otp';
        } else if (providerId === 'google.com') {
            loginMode = 'google';
        } else if (providerId === 'facebook.com') {
            loginMode = 'facebook';
        } else {
            loginMode = 'otp';
        }

        await db.collection('users').doc(uid).update({
            loginMode: loginMode
        });
    }
}

async function getAuthData(uid) {
    return new Promise(async (resolve, reject) => {
        admin.auth().getUser(uid)
            .then(function (userRecord) {
                console.log('Successfully fetched user data:', userRecord.toJSON());
                resolve(userRecord.toJSON());
            })
            .catch(function (error) {
                console.log('Error fetching user data:', error);
            });
    })
}


async function createSubscriptions() {
    const orderRef = await db.collection('orders').get();
    orderRef.forEach(async (doc) => {
        if (doc.id && doc.data()) {
            const order = doc.data();
            if (order.products.length > 0 && (!order.hasOwnProperty('orderType') || (order.hasOwnProperty('orderType') && order.orderType !== 'subscription'))) {
                let products = order.products;
                for (let i = 0; i < products.length; i++) {
                    if (products[i] && products[i].productId && products[i].quantity) {
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
                            subData['orderId'] = doc.id;
                            subData['commentMsg'] = products[i].commentMsg;
                            products[i].subData = subData;
                            if (order.payment.mode === 'cash' || order.payment.completed) {
                                subData['ordersAt'] = getAllOrdersDate(subData);
                                console.log('subData', subData);
                                await db.collection('subscriptions').add(subData);
                            }

                        }
                    }
                }


            }
        }
    });
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

async function fixSubscriptions() {
    const subscriptions = await db.collection('subscriptions').get();
    subscriptions.forEach(async (doc) => {
        if (doc && doc.id && doc.data()) {
            const subData = doc.data();
            if (subData.deliverySlot === null) {
                await db.collection('subscriptions').doc(doc.id).update({
                    deliverySlot: {}
                });
            }
        }
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


async function addLanguages() {
    let languages = [{
            code: 'en',
            lang: 'English',
            langName: 'English'
        },
        {
            code: 'ar',
            lang: 'Arabic',
            langName: 'عربى'
        },
        {
            code: 'bn',
            lang: 'Bengali',
            langName: 'বাংলা'
        },
        {
            code: 'zh',
            lang: 'Chinese',
            langName: '中文'
        },
        {
            code: 'nl',
            lang: 'Dutch',
            langName: 'Nederlands'
        },
        {
            code: 'fr',
            lang: 'French',
            langName: 'français'
        },
        {
            code: 'de',
            lang: 'German',
            langName: 'Deutsche'
        },
        {
            code: 'gu',
            lang: 'Gujarati',
            langName: 'ગુજરાતી'
        },
        {
            code: 'hi',
            lang: 'Hindi',
            langName: 'हिंदी'
        },
        {
            code: 'it',
            lang: 'Italian',
            langName: 'Italiana'
        },
        {
            code: 'ja',
            lang: 'Japanese',
            langName: '日本人'
        },
        {
            code: 'kn',
            lang: 'Kannada',
            langName: 'ಕನ್ನಡ'
        },
        {
            code: 'ml',
            lang: 'Malayalam',
            langName: 'മലയാളം'
        },
        {
            code: 'mr',
            lang: 'Marathi',
            langName: 'मराठी'
        },
        {
            code: 'ne',
            lang: 'Nepali',
            langName: 'नेपाली'
        },
        {
            code: 'or',
            lang: 'Oriya',
            langName: 'ଓଡିଆ'
        },
        {
            code: 'fa',
            lang: 'Persian',
            langName: 'فارسی'
        },
        {
            code: 'pa',
            lang: 'Punjabi',
            langName: 'ਪੰਜਾਬੀ'
        },
        {
            code: 'ru',
            lang: 'Russian',
            langName: 'русский'
        },
        {
            code: 'sd',
            lang: 'Sindhi',
            langName: 'سنڌي'
        },
        {
            code: 'es',
            lang: 'Spanish',
            langName: 'Española'
        },
        {
            code: 'so',
            lang: 'Somali',
            langName: 'Soomaali'
        },
        {
            code: 'ta',
            lang: 'Tamil',
            langName: 'தமிழ்'
        },
        {
            code: 'te',
            lang: 'Telugu',
            langName: 'తెలుగు'
        },
        {
            code: 'th',
            lang: 'Thai',
            langName: 'ไทย'
        },
        {
            code: 'ur',
            lang: 'Urdu',
            langName: 'اردو'
        }
    ];

    languages.forEach(async (lng) => {

        await db.collection('languages').doc(lng.code).set({
            code: lng.code,
            englishName: lng.lang,
            isAdded: lng.code == 'en' ? true : false,
            isDefault: lng.code == 'en' ? true : false,
            langName: lng.langName,
            sortedAt: new Date()
        });
    })
}

async function changeRegionIds() {
    const categories = await db.collection('categories').get();
    categories.forEach(async (doc) => {
        if (doc && doc.id) {
            await db.collection('categories').doc(doc.id).update({
                regionId: []
            });
        }
    });
    const brands = await db.collection('brands').get();
    brands.forEach(async (doc) => {
        if (doc && doc.id) {
            await db.collection('brands').doc(doc.id).update({
                regionId: []
            });
        }
    });
    const services = await db.collection('services').get();
    services.forEach(async (doc) => {
        if (doc && doc.id) {
            await db.collection('services').doc(doc.id).update({
                regionId: []
            });
        }
    });
}
async function makeWidgetsScript() {
    const banners = await getBanners();
    const webBanners = await getWebBanners();
    const bestsellers = await getBestSellers();
    const videoBlock = await getPromoVideo();
    const textBlock = await getStoreInfoTxt();
    const categories = await getCategoriesServicesAndBrands('categories');
    const brands = await getCategoriesServicesAndBrands('brands');
    const services = await getCategoriesServicesAndBrands('services');

    const batch = db.batch();

    const bannersWidgetsRef = db.collection('widgets').doc();
    const bannersWidgetId = bannersWidgetsRef.id;
    if (banners.length || webBanners.length) {
        batch.set(bannersWidgetsRef, {
            createdAt: new Date(),
            title: '',
            type: 'banner-slider'
        });
        if (banners.length) {
            for (const banner of banners) {
                const slidesRef = db.collection('widgets').doc(bannersWidgetId).collection('slides').doc();
                batch.set(slidesRef, banner);
            }
        }
        if (webBanners.length) {
            for (const banner of webBanners) {
                const slidesRef = db.collection('widgets').doc(bannersWidgetId).collection('webSlides').doc();
                batch.set(slidesRef, banner);
            }
        } else {
            for (const banner of banners) {
                const slidesRef = db.collection('widgets').doc(bannersWidgetId).collection('webSlides').doc();
                batch.set(slidesRef, banner);
            }
        }

    }

    const bestsellersWidgetRef = db.collection('widgets').doc();
    const bestsellersWidgetId = bestsellersWidgetRef.id;
    if (bestsellers.length) {
        batch.set(bestsellersWidgetRef, {
            createdAt: new Date(),
            title: '',
            type: 'product-carousel'
        });
        for (const bestseller of bestsellers) {
            productsRef = db.collection('widgets').doc(bestsellersWidgetId).collection('products').doc(bestseller.id);
            batch.set(productsRef, bestseller);
        }
    }


    const videoWidgetRef = db.collection('widgets').doc();
    const videoWidgetId = videoWidgetRef.id;
    if (videoBlock) {
        batch.set(videoWidgetRef, videoBlock);
    }

    const textBlockWidgetRef = db.collection('widgets').doc();
    const textBlockWidgetId = textBlockWidgetRef.id;
    if (textBlock && textBlock.allowStoreInfo) {
        batch.set(textBlockWidgetRef, textBlock.textInfo);
    }

    const categoryWidgetRef = db.collection('widgets').doc();
    const categoryWidgetId = categoryWidgetRef.id;
    if(categories && categories.length) {
        batch.set(categoryWidgetRef, {
            categoryList: categories,
            createdAt: new Date(),
            type: 'categories'
        });
    }
    const serviceWidgetRef = db.collection('widgets').doc();
    const serviceWidgetId = serviceWidgetRef.id;
    if(services && services.length) {
        batch.set(serviceWidgetRef, {
            serviceList: services,
            createdAt: new Date(),
            type: 'services'
        });
    }
    const brandsWidgetRef = db.collection('widgets').doc();
    const brandsWidgetId = brandsWidgetRef.id;
    if(brands && brands.length) {
        batch.set(brandsWidgetRef, {
            brandList: brands,
            createdAt: new Date(),
            type: 'brands'
        });
    }

    let sections = [];
    if (banners.length || webBanners.length) {
        sections.push({
            widgetID: bannersWidgetId,
            widgetType: 'banner-slider',
            location: 'all'
        });
    }
    if (bestsellers.length) {
        sections.push({
            sectionName: 'Best Sellers',
            widgetID: bestsellersWidgetId,
            widgetType: 'product-carousel',
            location: 'all'
        });
    }
    sections.push({
        sectionName: 'Shop By Categories',
        widgetType: 'categories',
        location: 'all',
        widgetID: categoryWidgetId
    });
    sections.push({
        sectionName: 'Services',
        widgetType: 'services',
        location: 'all',
        widgetID: serviceWidgetId

    });
    sections.push({
        sectionName: 'Shop By Brands',
        widgetType: 'brands',
        location: 'all',
        widgetID: brandsWidgetId
    });
    if (videoBlock) {
        sections.push({
            widgetID: videoWidgetId,
            widgetType: 'video-block',
            location: 'all'
        });
    }
    if (textBlock && textBlock.allowStoreInfo) {
        sections.push({
            sectionName: '',
            widgetID: textBlockWidgetId,
            widgetType: 'text-block',
            location: 'all'
        });
    }

    // const homepage = await db.collection('pages').doc('homepage').get();
    // const homepageData = homepage.data();
    // let webSections = [];
    // if(homepageData && homepageData !== undefined) {
    //     webSections = homepageData.webData || [];
    // }
    const homepageRef = db.collection('pages').doc('homepage');
    batch.set(homepageRef, {
        sections: sections
    });

    batch.commit().then(() => {
            console.log('widgets and sections created successfully');
        })
        .catch(error => {
            console.log('err in creating widgets and sections', error);
        });

}

async function getCategoriesServicesAndBrands(type) {
    return new Promise(async (resolve) => {
        const ids = [];
        const ref = await db.collection(type).get();
        ref.forEach(doc => {
            if(doc && doc.id && doc.data()) {
                ids.push(doc.id);
            }
        });
        resolve(ids);
    });
}


async function getBanners() {
    return new Promise(async (resolve, reject) => {
        let banners = [];
        const bannersRef = await db.collection('features').doc('banners').collection('images').get();
        bannersRef.forEach(async (doc) => {
            if (doc && doc.id) {
                const data = doc.data();
                const banner = {
                    active: data['active'] || true,
                    createdAt: data['uploadedAt'] || new Date(),
                    link: data['link'] || {
                        id: '',
                        name: '',
                        type: 'None'
                    },
                    image: {
                        mob: data['mob'] || '',
                        thumb: data['thumb'] || '',
                        org: data['org'] || '',
                    }
                }
                banners.push(banner)
            }

        });
        console.log('banners', banners);
        resolve(banners);
    });
}

async function getWebBanners() {
    return new Promise(async (resolve, reject) => {
        let webBanners = [];
        const bannersRef = await db.collection('features').doc('webbanners').collection('images').get();
        bannersRef.forEach(async (doc) => {
            if (doc && doc.id) {
                const data = doc.data();
                console.log('doc webbaner', data);
                const banner = {
                    active: data['active'] || true,
                    createdAt: data['uploadedAt'] || new Date(),
                    link: data['link'] || {
                        id: '',
                        name: '',
                        type: 'None'
                    },
                    image: {
                        mob: data['mob'] || '',
                        thumb: data['thumb'] || '',
                        org: data['org'] || '',
                    }
                }
                webBanners.push(banner)
            }

        });
        console.log('webBanners', webBanners);
        resolve(webBanners);
    });
}

async function getBestSellers() {
    return new Promise(async (resolve, reject) => {
        let products = [];
        const bestsellersRef = await db.collection('features').doc('bestsellers').collection('products').get();
        bestsellersRef.forEach(async (doc) => {
            if (doc && doc.id) {
                const data = doc.data();
                const product = {
                    id: doc.id,
                    data: data['data'],
                    sortedAt: data['sortedAt']
                }
                products.push(product);
            }
        });
        resolve(products);
    });
}

async function getPromoVideo() {
    return new Promise(async (resolve, reject) => {
        const videoRef = await db.collection('videos').doc('promo').get();
        const data = videoRef.data();
        if (data) {
            const video = {
                coverImage: {
                    mob: data['thumbnail']['mob'] || '',
                    thumb: data['thumbnail']['thumb'] || '',
                    org: data['thumbnail']['url'] || '',
                },
                createdAt: data['lastUpdatedAt'] || new Date(),
                videoID: data['videoId'],
                type: 'video-block',
                title: '',
                displayType: 'video-left-text-right',
                description: ''
            }
            resolve(video);
        } else {
            resolve(null);
        }

    });
}

async function getStoreInfoTxt() {
    return new Promise(async (resolve, reject) => {
        const storeRef = await db.collection('settings').doc('store').get();
        const data = storeRef.data();
        if (data) {
            const textBlock = {
                textInfo: {
                    createdAt: new Date(),
                    description: data['storeInfo'] || '',
                    title: '',
                    type: 'text-block',

                },
                allowStoreInfo: typeof data['allowStoreInfo'] !== 'undefined' ? data['allowStoreInfo'] : false
            }
            resolve(textBlock);
        } else {
            resolve(null);
        }

    });
}


async function setAlgoliaAttributesFaceting() {
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
      if(filtersRef) {
          filtersRef.forEach(async(doc) => {
            if(doc && doc.id && doc.data()) {
              const filter = doc.data();
              if(filter.active) {
                attributes.push(`filterOnly(filters.${filter.name})`);
              }
            }
        });
      }
    algoliaIndex.setSettings({
        attributesForFaceting: attributes
    }).then(() => {
        return 'attributesForFaceting created';
    }).catch(err => {
        console.log(err);
    })
}

async function changeDateCreatedFieldName() {
    const widgetsRef = await db.collection('widgets').where('type', 'in', ['banner-slider', 'video-block']).get();
    const bsWid = [];
    const vbWid = [];
    widgetsRef.forEach(doc => {
        if (doc && doc.data()) {
            const widget = doc.data();
            if (widget.type === 'banner-slider') {
                bsWid.push(doc.id);
            } else {
                vbWid.push(doc.id);
            }
        }
    });
    for (const wid of bsWid) {
        const slidesRef = await db.collection('widgets').doc(wid).collection('slides').get();
        slidesRef.forEach(async (slide) => {
            if (slide && slide.data()) {
                const data = slide.data();
                if (data.hasOwnProperty('createAt')) {
                    const {
                        createAt,
                        ...newData
                    } = data;
                    newData['createdAt'] = createAt;
                    await db.collection('widgets').doc(wid).collection('slides').doc(slide.id).set(newData);
                }
                if (data.hasOwnProperty('createdAt') && Object.keys(data.createdAt).length > 0) {
                    await db.collection('widgets').doc(wid).collection('slides').doc(slide.id).update({
                        createdAt: new Date()
                    });
                }
            }
        });
        const webSlidesRef = await db.collection('widgets').doc(wid).collection('webSlides').get();
        webSlidesRef.forEach(async (slide) => {
            if (slide && slide.data()) {
                const data = slide.data();
                if (data.hasOwnProperty('createAt')) {
                    const {
                        createAt,
                        ...newData
                    } = data;
                    newData['createdAt'] = createAt;
                    await db.collection('widgets').doc(wid).collection('webSlides').doc(slide.id).set(newData);
                }
                if (data.hasOwnProperty('createdAt') && Object.keys(data.createdAt).length > 0) {
                    await db.collection('widgets').doc(wid).collection('webSlides').doc(slide.id).update({
                        createdAt: new Date()
                    });
                }
            }
        });
    }
    for (const wid of vbWid) {
        console.log('wid', wid);
        const videoRef = await db.collection('widgets').doc(wid).get();
        const video = videoRef.data();
        if (video && video.hasOwnProperty('createAt')) {
            const {
                createAt,
                ...newData
            } = video;
            newData['createdAt'] = createAt;
            await db.collection('widgets').doc(wid).set(newData);
        }
    }
}

async function feedSearchKeywords() {
    try {
        const categories = await getCatAndBrandName('categories');
        const brands = await getCatAndBrandName('brands');
        const productsRef = await db.collection('products').get();
        productsRef.forEach(async (doc) => {
            if (doc && doc.id) {
                const product = doc.data();
                const keywords = product.searchKeywords;
                const catIds = product.categories;
                const brandIds = product.brands;
                const requiredNames = [];
                let needToUpdate = false;
                catIds.forEach(id => {
                    requiredNames.push(categories[id])
                });
                brandIds.forEach(id => {
                    requiredNames.push(brands[id])
                });
                requiredNames.forEach(name => {
                    if(!keywords.includes(name)) {
                        keywords.push(name);
                        needToUpdate = true;
                    }
                });
                if(needToUpdate) {
                    await db.collection('products').doc(doc.id).update({
                        searchKeywords: keywords
                    });
                }
            }
        });
    } catch (error) {
        console.log('error', error);
    }
}

async function getCatAndBrandName(type) {
    return new Promise(async (resolve, reject) => {
        let names = {};
        const ref = await db.collection(`${type}`).get();
        ref.forEach(doc => {
            if (doc.data()) {
                const data = doc.data();
                names[`${doc.id}`] = data.name || '';
            }
        });
        resolve(names);
    });
}

async function lowerCaseUserName() {
    try {
        const users = [];
        const usersRef = await db.collection('users').get();
        usersRef.forEach(doc => {
            if(doc && doc.id) {
                const user = doc.data();
                users.push({id: doc.id, name: user.name});
            }
        });
        for (const user of users) {
            await db.collection('users').doc(user.id).update({
                lowercaseName: user.name.toLowerCase()
            });
        }
    } catch (error) {
        console.log(error);
    }
}

async function makeCategoriesBrandsServicesWidgets() {
    const homepageDoc = await db.collection('pages').doc('homepage').get(),
        homepageData = homepageDoc.data() || null,
        sections = homepageData.sections || [];

        if(sections && sections.length) {

            const batch = db.batch();

            for (let i = 0; i < sections.length; i++) {
                if((sections[i].widgetType === 'categories' || sections[i].widgetType === 'brands' || sections[i].widgetType === 'services') && (!sections[i].hasOwnProperty('widgetID'))) {
                    const ids = await getCBSIds(sections[i].widgetType) || [];
                    if(ids.length) {
                        const widgetRef = db.collection('widgets').doc();
                        const widgetId = widgetRef.id;
                        const widgetData = {
                            createdAt: new Date(),
                            type: sections[i].widgetType
                        }
                        
                        if(sections[i].widgetType === 'categories') {
                            widgetData['categoryList'] = ids;
                        }
                        if(sections[i].widgetType === 'brands') {
                            widgetData['brandList'] = ids;
                        }
                        if(sections[i].widgetType === 'services') {
                            widgetData['serviceList'] = ids;
                        }
                        
                        batch.set(widgetRef, widgetData)
                        
                        sections[i].widgetID = widgetId;
                    }
                }
            }

            batch.commit().then(async () => {
                console.log('categories, brands, services widgets created successfully');
                await db.collection('pages').doc('homepage').update({sections});

            })
            .catch(error => {
                console.log('err in creating widgets', error);
            });
        }
}

async function getCBSIds(type) {
    return new Promise(async (resolve, reject) => {
        let ids = [];
        const ref = await db.collection(type).get();
        ref.forEach(doc => {
            if(doc && doc.id) {
                const data = doc.data();
                if(data) {
                    if((type === 'categories' || type === 'brands') && (data.status)) {
                        ids.push(doc.id);
                    }
                    if(type === 'services') {
                        ids.push(doc.id);
                    }
                }
            }
        });
        resolve(ids);
    });
}
// to remove duplicate pincodes from pincode.json
function removeDuplicates(data, key) {
    return [
      ...new Map(data.map(item => [key(item), item])).values()
    ]
  };

  function writeFile() {
      let arr = removeDuplicates(pincodesJson.results, item => item.pincode);
      let json = { results: arr}
    translatedJson = JSON.stringify(json);
    fs.writeFile(`../email-templates/pin.json`, translatedJson, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  }
  
async function makeWidgetsSlidesLinkIdToArray() {
    try {
        const batch = db.batch();
        const widgetsRef = await db.collection('widgets').where('type', 'in', ['image-banner', 'banner-slider']).get();
        const finalUpdates = [];
        const widgetIds = [];
        widgetsRef.forEach(async (widget) => {
            if(widget && widget.id) {
                widgetIds.push(widget.id);
            }
        });
        if(widgetIds.length) {
            for (const wid of widgetIds) {
                const slideUpdates = await updateSlideLinkData('slides', wid);
                finalUpdates.push(...slideUpdates);
                const webSlidesUpdates = await updateSlideLinkData('webSlides', wid);
                finalUpdates.push(...webSlidesUpdates);
            }
        }
        if(finalUpdates.length) {
            finalUpdates.forEach(update => {
                batch.update(update.ref, {link: update.data});
            });
        }
        batch.commit().then(() => {
            console.log('slides link id made to array successfully!');
        })
        .catch(error => console.log('error in making slides link id to array', error));
    } catch (error) {
        console.log(error);
    }
}

async function updateSlideLinkData(type, widgetId) {
    return new Promise(async (resolve, reject) => {
        const slidesRef = db.collection('widgets').doc(widgetId).collection(type);
        const slides = await slidesRef.get();
        const updates = [];
        slides.forEach(slide => {
            if(slide && slide.id && slide.data()) {
                const slideData = slide.data();
                if(slideData.hasOwnProperty('link')) {
                    if(typeof slideData.link.id === 'string') {
                        slideData.link['ids'] = slideData.link.id ? [slideData.link.id] : [];
                    }
                    if(Array.isArray(slideData.link.id)) {
                        slideData.link['ids'] = slideData.link.id;
                        slideData.link['id'] = slideData.link.id[0];
                    }
                    updates.push({ref: slidesRef.doc(slide.id), data: slideData.link});
                }
            }
        });
        resolve(updates);
    })
}

async function addReferralCashbackLimitToUser() {
    try {
        const users = [];
        const usersRef = await db.collection('users').get();
        usersRef.forEach(doc => {
            if(doc && doc.id && doc.data()) {
                users.push({id: doc.id, ...doc.data()});
            }
        });
        for (const user of users) {
            if(user.hasOwnProperty('referrer') && !user.referrer.hasOwnProperty('cashbacksLeft')) {
                db.collection('orders').where('userId', '==', user.id).get().then(async (doc) => {
                    const totalOrders = doc.size;
                    if(totalOrders >= 1) {
                        await db.collection('users').doc(user.id).update({
                            "referrer.cashbacksLeft": 0
                        });
                    } else {
                        await db.collection('users').doc(user.id).update({
                            "referrer.cashbacksLeft": 1
                        });
                    }
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function addNewFieldsInCoupons() {
    try {
        const batch = db.batch();
        const couponsCollection = db.collection('features').doc('coupons').collection('codes');
        const couponsRef = await couponsCollection.get();
        couponsRef.forEach(doc => {
            if(doc && doc.id && doc.data() && !(doc.data().hasOwnProperty('codAvailable'))) {
                const newData = {
                    codAvailable: true,
                    specificUsers: {
                        isAllowed: false,
                        users: []
                    }
                }
                batch.update(couponsCollection.doc(doc.id), newData);
            }
        });
        batch.commit().then(() => {
            console.log('coupons data updated successfully');
        }) 
        .catch(() => console.log('failed to update coupon data.'));

    } catch (error) {
        console.log(error);
    }
}

async function changeTypeInDeliveryPincodesArray() {
    try {
        const deliveryRef = await db.collection('features').doc('delivery').get();
        if(deliveryRef.data()) {
            const deliveryPincodes = deliveryRef.data().deliveryPincodes || [];
            deliveryPincodes.forEach(pin => {
                if(('freeDeliveryAmnt' in pin) && (typeof pin.freeDeliveryAmnt === 'string')) {
                    pin.freeDeliveryAmnt = parseInt(pin.freeDeliveryAmnt);
                } 
                if(('minAmnt' in pin) && (typeof pin.minAmnt === 'string')) {
                    pin.minAmnt = parseInt(pin.minAmnt);
                } 
            });
            await db.collection('features').doc('delivery').update({deliveryPincodes});
        }
    } catch (error) {
        console.log('Error in updating delivery pincodes field type', error);
    }
}

async function updateProductsHavingNoGstObj() {
    try {
        const orders = [];
        const ordersRef = await db.collection('orders').get();
        ordersRef.forEach(doc => {
            if(doc && doc.id && doc.data()) {
                orders.push({id: doc.id, ...doc.data()});
            }
        });
        for (const order of orders) {
            let needToUpdate = false;
            if(!order.hasOwnProperty('invoice') || !order.invoice.url) {
                order.products.map((p) => {
                    if(!p.hasOwnProperty('gstObj')) {
                        needToUpdate = true;
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
                });
            }
            if(needToUpdate) {
                await db.collection('orders').doc(order.id).update({
                    products: order.products
                });
            }
        }

    } catch (error) {
        console.log(error);
    }
}

async function addProdPriceFieldInProduct() {
    const productRef = await db.collection('products').get();
    const ids = [];
    productRef.forEach(async (doc) => {
        if (doc && doc.id && doc.data()) {
            if(!('prodPrice' in doc.data())) {
                ids.push(doc.id);
            }
        }
    });
    if(ids.length) {
        for (const id of ids) {
            await db.collection('products').doc(id).update({prodPrice: null});
        }
    }
}


async function ratingFieldInProduct(){
    try {
        const allProductsSnapshots = await db.collection("products").get();
        let products = [];
        allProductsSnapshots.forEach(async (doc) => {
            products.push({id: doc.id, ...doc.data()});
        });
        for (const product of products) {
            if (!('rating' in product)) {
                const ratings = await db.collection('products').doc(product.id).collection('ratings').get();
                if (ratings.size > 0) {
                    await db.collection('products').doc(product.id).update({rating: {}});
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function addDateInForms() {
    const formsRef = await db.collection('forms').get();
    formsRef.forEach(async doc => {
        if(doc && doc.id) {
            if(!doc.data().createdAt) {
                await db.collection('forms').doc(doc.id).update({
                    createdAt: new Date()
                });
            }
        }
    });
}

async function addVendorNameInProducts() {
    try {
        const vendors = [];
        const vendorRef = await db.collection('features').doc('multiVendor').collection('vendors').get();
        vendorRef.forEach(doc => {
            if(doc && doc.id) {
                vendors.push({id: doc.id, ...doc.data()})
            }
        });
        if(vendors.length) {
            for (const vendor of vendors) {
                const products = await getVendorProducts(vendor.id);
                for (const product of products) {
                    await db.collection('products').doc(product.id).update({
                        vendorName: vendor.displayName || vendor.name
                    });
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function getVendorProducts(vendorId) {
    return new Promise(async (resolve, reject) => {
        try {
            const products = [];
            const productRef = await db.collection('products').where('vendorId', '==', vendorId).get();
            productRef.forEach(doc => {
                if (doc && doc.id && doc.data()) {
                    products.push({
                        id: doc.id
                    });
                }
            });
            resolve(products);
        } catch (error) {
            console.log('error', error);
            resolve([]);
        }

    });
}

async function designStudioScript() {
    try {
        console.log('design studio script runs...');
        const studioRef = await db.collection('studio').doc('website').get();
        const studioData = studioRef.data();
        if(!studioData || (typeof studioData === 'object' && !studioData.hasOwnProperty('active'))) {
            await db.collection('studio').doc('website').set({active: false});
        }
        await addGlobalObjForDesignStudio();
        await addDesignStudioDefaultHeader();
        console.log('design studio script ends...');
    } catch (error) {
        console.log('error in design studio script', error);
    }
}

async function addGlobalObjForDesignStudio() {
    return new Promise(async (resolve) => {
        const global = {
            productStyle: {
                gridColumn: {
                    sm: 1,
                    md: 3,
                    lg: 5
                },
                fixedHeight: 150,
                isFixedHeight: true,
                style: "product-one"
            },
            itemStyle: {
                isFixedHeight: true,
                fixedHeight: 200,
                gridColumn: {
                    lg: 5,
                    md: 3,
                    sm: 1
                },
                style: "category-one",
                showFilter: true
            }
        }

        const globalDocRef = await db.collection('studio').doc('website').collection('sections').doc('global').get();
        const globalData = globalDocRef.data();
        if(!globalData || (typeof globalData === 'object' && !Object.keys(globalData).length)) {
            await db.collection('studio').doc('website').collection('sections').doc('global').set(global);
        }
        resolve(true);

    });
}

async function addDesignStudioDefaultHeader() {
    return new Promise(async (resolve) => {
        const color = {
            backgroundColor: {
                hex: '',
                rgb: {}
            },
            foregroundColor: {
                hex: '',
                rgb: {}
            }
        };

        const cartButton = {
            color,
            show: true,
            text: 'My Cart'
        };

        const headerStyle = 'header-one';

        const infoBar = {
            color,
            leftText: '',
            rightText: '',
            show: false
        };

        const loginButton = {
            color, 
            show: true,
            text: 'Login'
        };

        const logo = {
            width: 150,
            height: 150
        };

        const notificationBar = {
            color, 
            show: false,
            text: ''
        };

        const search = {
            placeholderText: 'Search...',
            show: true
        }

        const wishlistButton = {
            color, 
            show: true,
            text: 'Wishlist'
        }

        const menuData = {
            color,
            show: true
        }

        const defaultHeaderDocRef = await db.collection('studio').doc('website').collection('sections').doc('defaultHeader').get();
        const defaultHeaderData = defaultHeaderDocRef.data();

        const headerDocRef = await db.collection('studio').doc('website').collection('sections').doc('header').get();
        const headerData = headerDocRef.data();

        let isNoDefaultHeader = false;
        let isNoHeader = false;

        if(!defaultHeaderData || (typeof defaultHeaderData === 'object' && (!Object.keys(defaultHeaderData).length || Object.keys(defaultHeaderData).length < 9))) {
            isNoDefaultHeader = true;
        }
        if(!headerData || (typeof headerData === 'object' && (!Object.keys(headerData).length || Object.keys(headerData).length < 9))) {
            isNoHeader = true;
        }

        if (headerData && headerData.menuData && !headerData.menuData.slugsPresent) {
            isNoHeader = true;
        }
        if (defaultHeaderData && defaultHeaderData.menuData && !defaultHeaderData.menuData.slugsPresent) {
            isNoDefaultHeader = true;
        }

        if(isNoDefaultHeader || isNoHeader) {
            let menuItems = await getMenuItems();
            menuData['menuItems'] = menuItems;

            if(isNoDefaultHeader) {
                await db.collection('studio').doc('website').collection('sections').doc('defaultHeader').set({
                    color,
                    cartButton,
                    headerStyle,
                    infoBar,
                    loginButton,
                    logo,
                    notificationBar,
                    search,
                    wishlistButton,
                    menuData: {...menuData, slugsPresent: true}
                });
            }

            if(isNoHeader) {
                await db.collection('studio').doc('website').collection('sections').doc('header').set({
                    color,
                    cartButton,
                    headerStyle,
                    infoBar,
                    loginButton,
                    logo,
                    notificationBar,
                    search,
                    wishlistButton,
                    menuData: {...menuData, slugsPresent: true}
                });
            }
        }

        resolve(true);

    });
}

async function getMenuItems() {
    return new Promise(async (resolve) => {
        const menuItems = [];

        const homeLink = {
            id: 'homepage',
            link: '/',
            title: 'Home'
        }

        const aboutLink = {
            id: 'about',
            link: 'about',
            title: 'About us'
        }

        const contactLink = {
            id: 'contact',
            link: 'contact',
            title: 'Contact us'
        }

        const envDoc = await db.collection('settings').doc('environment').get();
        const envData = envDoc.data();
        const isUniversal = 'isUniversal' in envData ? envData.isUniversal : false; 

        const categoryMenu = await getCategoriesForHeader(isUniversal);
        
        const brandsMenu = await getBrandsForHeader(isUniversal);

        const servicesMenu = await getServicesForHeader();

        menuItems.push(homeLink, categoryMenu, brandsMenu, servicesMenu, aboutLink, contactLink);

        resolve(menuItems);
    });
};

async function getCategoriesForHeader(isUniversal) {
    return new Promise(async (resolve) => {
        const categories = [];
        const categoriesRef = await db.collection('categories').orderBy('sortedAt', 'desc').limit(10).get();
        
        categoriesRef.forEach(doc => {
            if(doc && doc.id && doc.data()) {
                categories.push({id: doc.id, ...doc.data()});
            } 
        });

        const categoryMenu = {
            dropdownMenu: false,
            dropdownMenuData: [],
            title: "Shop By Category"
        };

        if(categories.length) {
            categoryMenu.dropdownMenu = true;
            for (const category of categories) {

                const data = {
                    title: category.name,
                    id: category.id
                }

                if(category.isSubcategories) {
                    if(isUniversal) {
                        data['link'] = `/subcategory/${category.slug.name}`;
                    } else {
                        data['link'] = `/shop-subcategories/${urlName(category.name)}/${category.id}`;
                    }
                    const subcategories = [];
                    const subCatRef = await db.collection('categories').doc(category.id).collection('subcategories').orderBy('sortedAt', 'desc').limit(10).get();
                    subCatRef.forEach(doc => {
                        if(doc && doc.id && doc.data()) {
                            subcategories.push({id: doc.id, ...doc.data()});
                        }
                    });
                    if(subcategories.length) {
                        data['subMenu'] = true;
                        data['subMenuData'] = [];
                        for (const subcat of subcategories) {
                            data.subMenuData.push({
                                id: subcat.id,
                                title: subcat.name,
                                link: isUniversal ? `/category/${category.slug.name}/${subcat.slug.name}` : `/shop/category/${urlName(category.name)}/${category.id}/${urlName(subcat.name)}/${subcat.id}`
                            });
                        }
                    }
                } else {
                    if(isUniversal) {
                        data['link'] = `/category/${category.slug.name}`;
                    } else {
                        data['link'] = `/shop/category/${urlName(category.name)}/${category.id}`;
                    }
                }
                categoryMenu.dropdownMenuData.push(data);
            }
        }
        resolve(categoryMenu);
    });
}

async function getBrandsForHeader(isUniversal) {
    return new Promise(async resolve => {
        const brands = [];
        const brandsRef = await db.collection('brands').get();
        brandsRef.forEach(doc => {
            if(doc && doc.id && doc.data()) {
                brands.push({id: doc.id, ...doc.data()});
            }
        });

        const brandMenu = {
            dropdownMenu: false,
            dropdownMenuData: [],
            title: "Shop By Brand"
        };

        if(brands.length) {
            brandMenu.dropdownMenu = true;
            for (const brand of brands) {
                const data = {
                    title: brand.name,
                    id: brand.id,
                    link: isUniversal ? `/brand/${brand.slug.name}` : `/shop/brand/${urlName(brand.name)}/${brand.id}`
                }
                brandMenu.dropdownMenuData.push(data);
            }
        }
        
        resolve(brandMenu);
    });
}

async function getServicesForHeader() {
    return new Promise(async (resolve) => {
        const services = [];
        const servicesRef = await db.collection('services').get();
        servicesRef.forEach(doc => {
            if(doc && doc.id && doc.data()) {
                services.push({id: doc.id, ...doc.data()});
            }
        });

        const servicesMenu = {
            dropdownMenu: false,
            dropdownMenuData: [],
            title: "Services"
        };

        if(services.length) {
            servicesMenu.dropdownMenu = true;
            for (const service of services) {
                const data = {
                    title: service.name,
                    id: service.id,
                    link: `/service-response/${urlName(service.name)}/${service.id}`
                }
                servicesMenu.dropdownMenuData.push(data);
            }
        }

        resolve(servicesMenu);
    });
}

function urlName(pname) {
    return encodeURL(pname);
}

function encodeURL(url) {
    return escape(encodeURIComponent(url.toLowerCase().trim().replace(/ /g, '-')));
}

async function addTotalSkuInProducts() {
    const productRef = await db.collection('products').get();
    const products = [];
    productRef.forEach(async (doc) => {
        if (doc && doc.id && doc.data()) {
            if(!('totalSku' in doc.data())) {
                products.push({id: doc.id, ...doc.data()});
            }
        }
    });
    if(products.length) {
        for (const product of products) {
            const totalSku = [];
            if(!product.isPriceList) {
                if(product.productCode) {
                    totalSku.push(product.productCode);
                }
            } else {
                product.priceList.forEach(pl => {
                    if(pl.sku) {
                        totalSku.push(pl.sku); 
                    }
                });
                if(!totalSku.length) {
                    if(product.productCode) {
                        totalSku.push(product.productCode);
                    }
                }
            }
            await db.collection('products').doc(product.id).update({totalSku});
        }
    }
}


async function addGroupsField() {
    try {
        const users = [];
        const usersRef = await db.collection('users').get();
        usersRef.forEach(doc => {
            if(doc && doc.id) {
                users.push({id: doc.id, ...doc.data()});
            }
        });
        for (const user of users) {
            if (!user.hasOwnProperty('groups')) {
                await db.collection('users').doc(user.id).update({
                    groups: []
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function addCountries() {
    try {
        const data = {
            countries: [
                {
                    "countryCode": "AE",
                    "countryName": "United Arab Emirates",
                    "currencyCode": "AED",
                    "dialCode": "+971",
                    "active": false
                },
                {
                    "countryCode": "IN",
                    "countryName": "India",
                    "currencyCode": "INR",
                    "dialCode": "+91",
                    "active": true
                },
                {
                    "countryCode": "GB",
                    "countryName": "United Kingdom",
                    "currencyCode": "GBP",
                    "dialCode": "+44",
                    "active": false
                },
                {
                    "countryCode": "US",
                    "countryName": "United States",
                    "currencyCode": "USD",
                    "dialCode": "+1",
                    "active": false
                },
            ],
            settings: {
                autoExchange: true,
                defaultCountry: {
                    "countryCode": "IN",
                    "countryName": "India",
                    "currencyCode": "INR",
                    "dialCode": "+91",
                    "active": true
                },
            }
        }

        data.countries.forEach(function (country) {
            country.countryCode = country.countryCode.toLowerCase();
        });
        data.settings.defaultCountry.countryCode = data.settings.defaultCountry.countryCode.toLowerCase();
        const multiCountriesDoc = db.collection('features').doc('multiCountries');
        multiCountriesDoc.get().then(async doc => {
            if(!doc.exists) {
                await multiCountriesDoc.set(data);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function addSubCatNameInAlgoliaProducts() {
    const productRef = await db.collection('products').get();
    const products = [];
    productRef.forEach(async (doc) => {
        if (doc && doc.id && doc.data()) {
            products.push({id: doc.id, ...doc.data()});
        }
    });
    if(products.length) {
        for (const prod of products) {
            let {images, barcode, nameToSearch, ...product} = prod;
            product['categories'] = await getCatSubcatNames(product['categories']);
            product['objectID'] = product.id;
            product['ptype'] = 'parent';
            product['prodDesc'] = product["prodDesc"].replace(/<[^>]*>?/gm, '');
            algoliaIndex.saveObject(product);

            const optionsRef = await db.collection('products').doc(product.id).collection('options').get();
            let options = [];
            optionsRef.forEach(doc => {
                if(doc && doc.id) {
                    options.push(doc.id);
                }
            });
            if(options.length) {
                for (const opt of options) {
                    let {images, barcode, nameToSearch, ...option} = opt;
                    option['categories'] = await getCatSubcatNames(option['categories']);
                    option['objectID'] = option.id;
                    option['ptype'] = 'child';
                    option['parentId'] = product.id;
                    option['prodDesc'] = option["prodDesc"].replace(/<[^>]*>?/gm, '');
                    algoliaIndex.saveObject(option);
                }
            }
        }
    }
}

async function getCatSubcatNames(categories) {
    return new Promise(async (resolve, reject) => {
      try {
        let categoryNames = [];
        for (const catId of categories) {
          const catDoc = await db.collection('categories').doc(catId).get();
          let categoryData = catDoc.data();
          if (categoryData) {
            categoryNames.push(categoryData.name);
            if(categoryData.isSubcategories) {
              const subcategoriesRef = await db.collection('categories').doc(catId).collection('subcategories').get();
              subcategoriesRef.forEach(doc => {
                if(doc && doc.id && doc.data() && categories.includes(doc.id)) {
                  categoryNames.push(doc.data().name);
                }
              });
            }
          }
        }
        console.log('categoryNames', categoryNames);
        resolve(categoryNames);
      } catch (error) {
        console.log(error);
        resolve([]);
      }
    });
}


// async function addQrCodeToVendors() {
//     try {
//         const users = [];
//         const usersRef = await db.collection('features').doc('multiVendor').collection('vendors').get();
//         usersRef.forEach(doc => {
//             if(doc && doc.id) {
//                 users.push({id: doc.id, ...doc.data()});
//             }
//         });
//         for (const user of users) {
//             if (!(user.hasOwnProperty('qrCode') && user.qrCode.length)) {
//                 await vendorJs.generateQRCode(user.id, user);
//             }
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }
async function checkProductType() {
    const productRef = await db.collection('products').where('productType', 'in', ['variant', 'single']).get();
    const products = [];
    productRef.forEach(async (doc) => {
        if (doc && doc.id && doc.data()) {
            products.push({id: doc.id, ...doc.data()});
        }
    });
    console.log('products', products);
    if(products.length) {
        for (const product of products) {
            await db.collection('products').doc(product.id).update({
                productType: ''
            });
        }
    }
}

async function updateProductTypeInUsersCart() {
    const users = [];
    let date = moment('2022-03-16').tz(timeZone);
    console.log('date', date);
    const usersRef = await db.collection('users').where('lastAccessAt', '>', date).get();
    usersRef.forEach(doc => {
        if(doc && doc.id) {
            users.push(doc.id);
        }
    });
    for (const user of users) {
        const cartRef = await db.collection('users').doc(user).collection('cart').where('orderType', 'in', ['single', 'variant']).get();
        const cart = [];
        cartRef.forEach(doc => {
            if(doc && doc.id) {
                cart.push(doc.id);
            }
        });
        if(cart.length) {
            for (const cartId of cart) {
                await db.collection('users').doc(user).collection('cart').doc(cartId).update({
                    orderType: ''
                });
            }
        }
    }
}

async function addProductTypeFieldInProducts() {
    const productRef = await db.collection('products').get();
    const products = [];
    productRef.forEach(async (doc) => {
        if (doc && doc.id && doc.data() && !('productType' in doc.data())) {
            products.push({id: doc.id, ...doc.data()});
        }
    });
    if(products.length) {
        for (const product of products) {
            await db.collection('products').doc(product.id).update({
                productType: ''
            });
        }
    }
}

async function fixUserAddress(){
    const usersRef = await db.collection('users').get();
    let allUsers = [];
    usersRef.forEach(doc => {
        allUsers.push({id: doc.id, ...doc.data()})
    });
    for (const user of allUsers) {
        if ('defaultAddress' in user && user.defaultAddress!=null && !user.defaultAddress.createdAt) {
            user.defaultAddress.createdAt = new Date();
            user.defaultAddress.name = user.name;
            user.defaultAddress.defaultAddress = true;
            console.log('updating for user:', user.id);
            await db.collection('users').doc(user.id).update({defaultAddress: user.defaultAddress});
            const addressesRef = await db.collection('users').doc(user.id).collection('addresses').get();
            addressesRef.forEach(async (doc) => {
                const address = doc.data();
                if (!('createdAt' in address)) {
                    await db.collection('users').doc(user.id).collection('addresses').doc(doc.id).update({
                        createdAt: new Date(),
                        name: user.name,
                        defaultAddress: true
                    })
                }
            });
        }
        
    }
}
// async function getAllUsersCRM() {
//     // const usersRef = await db.collection('users').where('role', '==', 'user').get()
//     const usersRef = await db.collection('users').where('name', '==', 'Saif').get()
//     if (usersRef.empty) {
//       console.log(`CRM : ${projectId} : No User(s) Data Found!`);
//       return
//     }
//     let usersArr = [], apiResponse = {}
//     usersRef.forEach(async doc => {
//       usersArr.push(doc.data())
//     })
//     if (usersArr.length) {
//       for (const user of usersArr) {
//         let payload = await usersModule.getApiBody(projectId, user)
//         let operationType = 'createUserCRM'
//         apiResponse = await usersModule.invokeCRM(payload, operationType)
//         // console.log(apiResponse);
//       }
//     }
//     console.log('[ EXISTING ] onCreateUserCRM Response : ', apiResponse)
// }


async function updatePageType() {
    const scriptStatus = await isScriptAvailable('updatePageType');
    console.log('scriptStatus', scriptStatus);
    if(scriptStatus) return;
    const pageRef = db.collection('pages')
    const snapshot = await pageRef.get()
    snapshot.forEach(async doc => {
        // console.log('doc id : ', doc.id, ' doc data : ', doc.data());
        if (!doc.data().type) {
            console.log('doc with no type : ', doc.id)
            await db.collection('pages').doc(doc.id).update({ type: 'page'})
        }
    })
    await makeScriptStatusAvailable('updatePageType');
}

async function vendorOrdersStatusUpdateScript() {
    try {
        const scriptStatus = await isScriptAvailable('vendorOrdersStatusUpdateScript');
        console.log('scriptStatus', scriptStatus);
        if(scriptStatus) return;
        let vendors = [];
        const multiVendorRef = db.collection('features').doc('multiVendor').collection('vendors');
        const vendorsRef = await multiVendorRef.get();
        vendorsRef.forEach(doc => {
            if(doc && doc.id && doc.data()) {
                vendors.push({id: doc.id})
            }
        })
        if(vendors.length) {
            for(let vendor of vendors) {
                const orders = [];
                const ordersRef = await multiVendorRef.doc(vendor.id).collection('orders').get();
                ordersRef.forEach(doc => {
                    if(doc && doc.id && doc.data()) {
                        orders.push({id: doc.id, ...doc.data()});
                    }
                });
                if(orders.length) {
                    for (const order of orders) {
                        if(order.order && order.order.id) {
                            const dbOrderRef = await db.collection('orders').doc(order.order.id).get();
                            const dbOrder = dbOrderRef.data();
                            if(dbOrder && dbOrder.status !== order.status) {
                                await multiVendorRef.doc(vendor.id).collection('orders').doc(order.id).update({
                                    'order.status': dbOrder.status
                                });
                            }
                        }
                    }
                }
            }
        }
        await makeScriptStatusAvailable('vendorOrdersStatusUpdateScript');
    } catch (error) {
        console.log(error);
    }
}

async function isScriptAvailable(scriptName) {
    return new Promise(async (resolve, reject) => {
        let status = false;
        await db.collection('scripts').doc(scriptName).get().then((doc) => {
            if(doc.exists && doc.data() && doc.data().status) {
                status = true;
            }
            resolve(status);
        });
    });
}

async function makeScriptStatusAvailable(scriptName) {
    await db.collection('scripts').doc(scriptName).set({status: true});
}

async function importProductsToTypesense() {
    const scriptStatus = await isScriptAvailable('importProductsToTypesense');
    if(scriptStatus) return;

    const client = await typesense_initClient();
    if(!client) return;

    await typesense_createProductSchema(client);

    //add products to typesense
    const productRef = await db.collection('products').get();
    const products = [];
    productRef.forEach(async (doc) => {
        if (doc && doc.id && doc.data()) {
            products.push({id: doc.id, ...doc.data()});
        }
    });
    if(products.length) {
        console.log('products fetched');
        let finalProducts = [];
        for (const prod of products) {
            let product = getRequiredData(prod);
            product['id'] = product.id;
            product['ptype'] = 'parent';
            product['prodDesc'] = product["prodDesc"].replace(/<[^>]*>?/gm, '');
            product = flattenedObjForFiltering(product);
            product = stringifyArrayOfObjects(product);
            finalProducts.push(product);

            const optionsRef = await db.collection('products').doc(product.id).collection('options').get();
            let options = [];
            optionsRef.forEach(doc => {
                if(doc && doc.id && doc.data()){
                    options.push({id: doc.id, ...doc.data()});
                }
            });
            if(options.length) {
                for (const opt of options) {
                    let option = getRequiredData(opt);
                    option['id'] = option.id;
                    option['ptype'] = 'child';
                    option['parentId'] = product.id;
                    option['prodDesc'] = option["prodDesc"].replace(/<[^>]*>?/gm, '');
                    option = flattenedObjForFiltering(option);
                    option = stringifyArrayOfObjects(option);
                    finalProducts.push(option);
                }
            }
        }

        console.log('products length', finalProducts.length);
        client.collections(typesense_getIndex()).documents().import(finalProducts, {action: 'upsert', dirty_values: "coerce_or_drop"})
        .then(async res => {
            console.log('products imported to typesense successfully');
            await makeScriptStatusAvailable('importProductsToTypesense');
        })
        .catch(function(error) {
            console.log('error in import products to typesense', error);
        });
    }
}

function typesense_initClient() {
    return new Promise((resolve, reject) => {
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
    })
}

function typesense_getIndex() {
    return `${projectId}-products`;
}

async function typesense_createProductSchema(client) {
    return new Promise(async (resolve, reject) => {
        try {
            const collection = typesense_getIndex();
            const collectionExists = await typesense_checkCollectionExists(client, collection);
            console.log('collectionExists', collectionExists);
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
                        "type": "auto",
                        facet: true
                    },
                    {
                        "name": "categories",
                        "type": "auto",
                        facet: true
                    },
                    {
                        "name": "discount",
                        "type": "float"
                    },
                    {
                        "name": "discountedPrice",
                        "type": "float"
                    },
                    {
                        "name": "prodPrice",
                        "type": "float"
                    }
                ]
            }
            client.collections().create(productsCollection).then(() => {
                console.log('schema created');
                resolve(true);
            })
            .catch((error) => {
                console.log('error in creating schema', error);
                resolve(false);
            })
        } catch (error) {
            console.log('error in creating schema', error);
            resolve(false);
        }

    });
}

async function typesense_checkCollectionExists(client, collection) {
    return new Promise(async (resolve) => {
        try {
            await client.collections(collection).retrieve().then(() => {
                resolve(true);
            })
            .catch((error) => {
                console.log('error in retrieving collection', error);
                resolve(false);
            })
        } catch (error) {
            console.log('error', error);
            resolve(false);
        }
    });
}

function stringifyArrayOfObjects(object) {
    for (const key in object) {
      if ((Array.isArray(object[key]) && object[key].length && typeof object[key][0] == 'object') || (Array.isArray(object[key]) && !object[key].length)) {
        object[key] = JSON.stringify(object[key]);
      }
    }
    return object;
}

function flattenedObjForFiltering(product) {
    if(product.filters && Object.keys(product.filters).length) {
      for(var key in product.filters) {
        product[`filters.${key}`] = product.filters[key];
      }
    }
    if(product.rating && Object.keys(product.rating).length) {
      for(var key in product.rating) {
        product[`rating.${key}`] = product.rating[key];
      }
    }
    return product;
  }

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
      ...requiredData } = data;
    return requiredData;
  }



async function setShopifyWebhook() {
    try {
        // const scriptStatus = await isScriptAvailable('setShopifyWebhook');
        // if(scriptStatus) return;

        const store_Name = 'gifty.pe'
        const api_Version = '2022-10'
        const api_Key = 'fbd2f04ee785f886746025d07011f7df'
        const api_Secret = 'fbda1eef60c996cbb36f5172016b39e2'
        const storefront_Api_Key = 'f1c4437adc83148b40eaa09a80e7c21b'
        const access_Token = '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'

        let configObj = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let apiBody = {
            address: "https://us-central1-bwi-middleware.cloudfunctions.net/delivery_webhooks-getOrderShopify",
            format: "json",
            topic: "orders/create",
        }

        axios.post( `https://${ api_Key }:${ access_Token }@${ store_Name }.myshopify.com/admin/api/${ api_Version }/webhooks.json`, JSON.stringify( apiBody ), configObj )
        .then((response) => {
            console.log('Set Shopify Webhook Success TN : ', response.data)
        })
        .catch((error) => {
            console.log('Set Shopify Webhook failed IC : ', error)
        })

        // await makeScriptStatusAvailable('setShopifyWebhook');
    } catch (error) {
        console.log('Set Shopify Webhook failed OC : ', error)
    }
}
// setShopifyWebhook()

// ? Start Create Or Import Users In TypeSense
function prepareUserData(user, defaultCountryCode) {
    user['name'] = user.name || '';
    user['dP'] = user.dP || '';
    user['phoneNo'] = user.phoneNo || '';
    user['email'] = user.email || '';
    user['role'] = user.role || '';
    // user['birthday'] = user.birthday || '';
    // user['lastAccessAt'] = user.lastAccessAt || '';

    // ? remove country code from Phone Number
    if (user.phoneNo) {
        if (user.phoneNo.startsWith(defaultCountryCode)) {
            user.phoneNo = user.phoneNo.substring(defaultCountryCode.length);
        }
    }

    return user;
}

function getRequiredDataForUsers(data) {
    const {
        createdAt,
        defaultAddress,
        loginMode,
        lowercaseName,
        paymentInfo,
        readTerms,
        referralLink,
        setFromUI,
        subRole,
        wallet,
        groups,
        customerGstNo,
        customInput,
        vacations,
        deviceTokens,
        longitude,
        latitude,
        additionalInfo,
        defaultDeliveryAgentId,
        accessByAdmin,
        showPrices,
        shiprocketToken,
        referrer,
        ...requiredData
    } = data;
    return requiredData;
}

function typesense_getIndexUser() {
    return `${projectId}-users`;
}

async function typesense_createUserSchema(client) {
    return new Promise(async (resolve) => {
        try {
            const collection = typesense_getIndexUser();
            const collectionExists = await typesense_checkCollectionExists(client, collection);
            console.log('collectionExists', collectionExists);
            if (collectionExists) {
                resolve(true);
                return;
            }

            const userCollection = {
                'name': collection,
                "enable_nested_fields": true,
                'fields': [
                    {
                        "name": ".*",
                        "type": "auto"
                    },
                ]

            }
            client.collections().create(userCollection).then(() => {
                console.log('schema created');
                resolve(true);
            })
                .catch((error) => {
                    console.log('error in creating schema', error);
                    resolve(false);
                })

        }
        catch (error) {
            console.log("typesense_createUserSchema", error);
        }
    })
}

async function importSingleUserToTypesense(userId) {
    try {
        const client = await typesense_initClient();
        const userRef = await db.collection('users').doc(userId).get();

        // ? Get defaultCountryCode
        const envDoc = await db.collection('settings').doc('environment').get();
        const envData = envDoc.data();
        const defaultCountryCode = 'defaultCountryCode' in envData ? envData.defaultCountryCode : '+91';
        // ? //Get defaultCountryCode

        let user = getRequiredDataForUsers(userRef.data());
        user['id'] = userId;
        user = prepareUserData(user, defaultCountryCode);
        return client.collections(`${projectId}-users`).documents().create(user, { "dirty_values": "coerce_or_drop" });
    } catch (error) {
        console.log('error in importing single product to typesense', error);
    }
}

async function importUsersToTypesense() {
    const scriptStatus = await isScriptAvailable('importUsersToTypesense');
    if (scriptStatus) return;

    const client = await typesense_initClient();
    console.log('typeSense client initialized...');
    if (!client) return;

    await typesense_createUserSchema(client);

    // ? Get defaultCountryCode
    const envDoc = await db.collection('settings').doc('environment').get();
    const envData = envDoc.data();
    const defaultCountryCode = 'defaultCountryCode' in envData ? envData.defaultCountryCode : '+91';
    // ? //Get defaultCountryCode

    // ? Add Users to TypeSense
    const usersRef = await db.collection('users').get();
    const users = [];
    usersRef.forEach(async (doc) => {
        if (doc && doc.id && doc.data()) {
            users.push({ ...doc.data(), id: doc.id });
        }
    });

    if (users.length) {
        console.log('users fetched');
        let finalUsers = [];
        for (let user of users) {
            let userData = getRequiredDataForUsers(user);
            userData['id'] = user.id;
            userData = prepareUserData(userData, defaultCountryCode);
            // console.log("user: ", userData);
            finalUsers.push(userData);
        }

        // ? Import users To TypeSense
        client.collections(typesense_getIndexUser()).documents().import(finalUsers, {
            action: 'upsert',
            dirty_values: "coerce_or_drop"
        })
            .then(async res => {
                console.log('users imported to typeSense successfully');
                await makeScriptStatusAvailable('importUsersToTypesense');
            })
            .catch(function (error) {
                console.log('error in import users to typeSense', error);
            });

    }

}
// ? End Create Or Import Users In TypeSense


// ? Start Create Or Import Orders In TypeSense
function typesense_getIndexOrders() {
    return `${projectId}-orders`;
}

function getRequiredDataForOrders(order) {
    // ! [isArchive, orderSource, productNames] this fields are not related to Original Order Object.
    const {
        createdAt,
        orderId,
        status,
        // totalMrp,
        userId,
        userName,
        userPhoneNo,
        totalAmountToPaid,
        orderType,
        isArchive,
        orderSource,
        productNames,
        ...requiredData
    } = order;
    return {
        createdAt,
        orderId,
        status,
        // totalMrp,
        userId,
        userName,
        userPhoneNo,
        totalAmountToPaid,
        orderType,
        isArchive,
        orderSource,
        productNames,
    };
}

function prepareOrderDataForTypesense(order, defaultCountryCode) {
    console.log("orderId", order.id);
    order['orderType'] = 'orderType' in order ? order.orderType : '';
    order['isArchive'] = 'subStatus' in order ? 'isArchive' in order.subStatus ? order.subStatus.isArchive : false : false;
    order['orderSource'] = 'metaData' in order ? 'source' in order.metaData ? order.metaData.source : '' : '';
    order['productNames'] = order['products'].map(p => p.name);
    order['userPhoneNo'] = 'userPhoneNo' in order ? order.userPhoneNo : '';
    order = getRequiredDataForOrders(order);
    order['orderId'] = String(order.orderId); // ! typesense does not support dataType number for queryBy so changing dataType to string 

    // ? remove country code from Phone Number
    if (order.userPhoneNo) {
        if (order.userPhoneNo.startsWith(defaultCountryCode)) {
            order.userPhoneNo = order.userPhoneNo.substring(defaultCountryCode.length);
        }
    }

    return order;
}

async function typesense_createOrdersSchema(client) {
    return new Promise(async (resolve) => {
        try {
            const collection = typesense_getIndexOrders();
            const collectionExists = await typesense_checkCollectionExists(client, collection);
            console.log('collectionExists', collectionExists);
            if (collectionExists) {
                resolve(true);
                return;
            }

            const orderCollection = {
                'name': collection,
                "enable_nested_fields": true,
                'fields': [
                    {
                        "name": ".*",
                        "type": "auto"
                    },
                ]

            }
            client.collections().create(orderCollection).then(() => {
                console.log('schema created');
                resolve(true);
            })
                .catch((error) => {
                    console.log('error in creating schema', error);
                    resolve(false);
                })

        }
        catch (error) {
            console.log("typesense_createUserSchema", error);
        }
    })
}

async function importSingleOrderToTypesense(orderId) {
    try {
        const client = await typesense_initClient();
        const orderRef = await db.collection('orders').doc(orderId).get();

        // ? Get defaultCountryCode
        const envDoc = await db.collection('settings').doc('environment').get();
        const envData = envDoc.data();
        const defaultCountryCode = 'defaultCountryCode' in envData ? envData.defaultCountryCode : '+91';
        // ? //Get defaultCountryCode

        let order = prepareOrderDataForTypesense(orderRef.data(), defaultCountryCode);
        order['id'] = orderId; 

        return client.collections(`${projectId}-orders`).documents().create(order, { "dirty_values": "coerce_or_drop" });
    } catch (error) {
        console.log('error in importing single product to typesense', error);
    }
}

async function importOrdersToTypesense() {
    const scriptStatus = await isScriptAvailable('importOrdersToTypesense');
    if (scriptStatus) return;

    const client = await typesense_initClient();
    console.log('typeSense client initialized...');
    if (!client) return;

    await typesense_createOrdersSchema(client);

    // ? Get defaultCountryCode
    const envDoc = await db.collection('settings').doc('environment').get();
    const envData = envDoc.data();
    const defaultCountryCode = 'defaultCountryCode' in envData ? envData.defaultCountryCode : '+91';
    // ? //Get defaultCountryCode

    // ? Get all orders
    const ordersRef = await db.collection('orders').get();
    const orders = [];
    ordersRef.forEach(async (doc) => {
        if (doc && doc.id && doc.data()) {
            orders.push({ ...doc.data(), id: doc.id });
        }
    });

    console.log("orders.length",orders.length);
    if (orders.length) {
        console.log('orders fetched');
        let finalOrders = [];
        for (let order of orders) {
            let orderData = prepareOrderDataForTypesense(order, defaultCountryCode);
            orderData['id'] = order.id;
            // console.log("orderData", orderData);
            finalOrders.push(orderData);
        }

        // ? Import users To TypeSense
        client.collections(typesense_getIndexOrders()).documents().import(finalOrders, {
            action: 'upsert',
            dirty_values: "coerce_or_drop"
        }).then(async res => {
            console.log('orders imported to typeSense successfully');
            await makeScriptStatusAvailable('importOrdersToTypesense');
        }).catch((error) => {
            console.log('error in import orders to typeSense', error);
        });
    }

}
// ? End Create Or Import Orders In TypeSense