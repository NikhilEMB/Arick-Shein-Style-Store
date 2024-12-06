const functions = require("firebase-functions");
const {
    db
} = require('./admin');


exports.onCreateUser = functions.firestore
    .document('users/{userId}').onCreate(async (snap, context) => {
        const userAnalyticsRef = db.collection('analytics').doc('users');
        await db.runTransaction(t => {
            return t.get(userAnalyticsRef)
                .then(async (doc) => {
                    if (doc.exists) {
                        let userAnalyticsData = doc.data();
                        t.update(userAnalyticsRef, {
                            count: userAnalyticsData.count + 1
                        });
                    } else {
                        let totalUsers = await getTotalUsers();
                        t.set(userAnalyticsRef, {
                            count: totalUsers
                        });
                    }
                });
        });
    });

function getTotalUsers() {
    return new Promise(function (resolve, reject) {
        db.collection('users').get().then((docs) => {
            console.log('docs', docs.size);
            resolve(docs.size);
        });
    });
}

exports.updateProductsCount = functions.firestore
    .document('products/{productId}').onCreate(async (snap, context) => {
        const productAnalyticsRef = db.collection('analytics').doc('products');
        await db.runTransaction(t => {
            return t.get(productAnalyticsRef)
                .then(async (doc) => {
                    if (doc.exists) {
                        let productsAnayticsData = doc.data();
                        console.log('productsAnayticsData', productsAnayticsData);
                        t.update(productAnalyticsRef, {
                            count: productsAnayticsData.count + 1
                        });
                    } else {
                        let totalProducts = await getTotalProducts();
                        t.set(productAnalyticsRef, {
                            count: totalProducts
                        });
                    }
                });
        });
    });
exports.updateSubProductsCount = functions.firestore
    .document('products/{productId}/options/{optionId}').onCreate(async (snap, context) => {
        const productAnalyticsRef = db.collection('analytics').doc('products');
        await db.runTransaction(t => {
            return t.get(productAnalyticsRef)
                .then(async (doc) => {
                    let productsAnayticsData = doc.data();
                    console.log('productsAnayticsData', productsAnayticsData);
                    t.update(productAnalyticsRef, {
                        count: productsAnayticsData.count + 1
                    });
                });
        });
    });

function getTotalProducts() {
    return new Promise(function (resolve, reject) {
        db.collection('products').get().then((docs) => {
            console.log('docs', docs.size);
            resolve(docs.size);
        });
    });
}