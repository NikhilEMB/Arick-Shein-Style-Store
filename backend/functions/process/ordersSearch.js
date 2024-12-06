const functions = require("firebase-functions");
const {
    admin,
    db,
    bucket,
    projectId,
    typesenseCred
} = require('./admin');

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
            console.log('error in initializing typesense client');
            resolve(null);
        }
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


// ? Start Create, Update Or Delete Orders In TypeSense
exports.createOrderInSearch = functions.firestore.document('orders/{orderId}').onCreate(async (snap, context) => {
    // ? Get defaultCountryCode
    const envDoc = await db.collection('settings').doc('environment').get();
    const envData = envDoc.data();
    const defaultCountryCode = 'defaultCountryCode' in envData ? envData.defaultCountryCode : '+91';
    // ? //Get defaultCountryCode

    const orderId = context.params.orderId;
    let orderData = prepareOrderDataForTypesense(snap.data());
    orderData = removeCountryCode(orderData, defaultCountryCode);
    orderData['id'] = orderId;
    await typesense_createOrdersSchema();
    await typesense_addOrderDocument(orderData);
});

exports.updateOrderInSearch = functions.firestore.document('orders/{orderId}').onUpdate(async (change, context) => {
    const orderId = context.params.orderId;
    const beforeData = prepareOrderDataForTypesense(change.before.data());
    const afterData = prepareOrderDataForTypesense(change.after.data());

    if (JSON.stringify(beforeData) !== JSON.stringify(afterData)) {
        // ? Get defaultCountryCode
        const envDoc = await db.collection('settings').doc('environment').get();
        const envData = envDoc.data();
        const defaultCountryCode = 'defaultCountryCode' in envData ? envData.defaultCountryCode : '+91';
        // ? //Get defaultCountryCode

        let updatedOrder = { ...afterData };
        updatedOrder = removeCountryCode(updatedOrder, defaultCountryCode);
        // updatedOrder = getRequiredDataForOrders(updatedOrder);
        updatedOrder['id'] = orderId;
        await typesense_updateOrderDocument(updatedOrder);
    }
});

exports.deleteOrderInSearch = functions.firestore.document('orders/{orderId}').onDelete(async (snap, context) => {
    const orderId = context.params.orderId;
    await typesense_deleteOrderDocument(orderId);
});

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

function prepareOrderDataForTypesense(order) {
    order['orderType'] = 'orderType' in order ? order.orderType : '';
    order['isArchive'] = 'subStatus' in order ? 'isArchive' in order.subStatus ? order.subStatus.isArchive : false : false;
    order['orderSource'] = 'metaData' in order ? 'source' in order.metaData ? order.metaData.source : '' : '';
    order['productNames'] = order['products'].map(p => p.name);
    order['userPhoneNo'] = 'userPhoneNo' in order ? order.userPhoneNo : '';
    order = getRequiredDataForOrders(order);
    order['orderId'] = String(order.orderId); // ! typesense does not support dataType number for queryBy so changing dataType to string 
    return order;
}

function removeCountryCode(order, defaultCountryCode) {
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
            const collectionExists = await typesense_checkCollectionExists(collection);
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
            console.log("typesense_createOrdersSchema", error);
        }
    })
}

async function typesense_addOrderDocument(order) {
    let typesenseClient = await typesense_initClient();
    if (!typesenseClient) return;
    return typesenseClient.collections(typesense_getIndexOrders()).documents().create(order, {
        "dirty_values": "coerce_or_drop"
    });
}

async function typesense_updateOrderDocument(order) {
    let typesenseClient = await typesense_initClient();
    if (!typesenseClient) return;
    return typesenseClient.collections(typesense_getIndexOrders()).documents(order.id).update(order, {
        "dirty_values": "coerce_or_drop"
    });
}

async function typesense_deleteOrderDocument(orderId) {
    return new Promise(async resolve => {
        try {
            let typesenseClient = await typesense_initClient();
            if (!typesenseClient) return;
            await typesenseClient.collections(typesense_getIndexOrders()).documents(orderId).delete();
            resolve(true);
        } catch (error) {
            console.log('error in deleting documents from typesense', error);
            resolve(false);
        }
    });
}
// ? End Create, Update Or Delete Orders In TypeSense

runTypeSense()

function runTypeSense() {
}
