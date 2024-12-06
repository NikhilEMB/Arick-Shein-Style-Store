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


// ? Start Create, Update Or Delete User In TypeSense
exports.createUserInSearch = functions.firestore.document('users/{userId}').onCreate(async (snap, context) => {
    // ? Get defaultCountryCode
    const envDoc = await db.collection('settings').doc('environment').get();
    const envData = envDoc.data();
    const defaultCountryCode = 'defaultCountryCode' in envData ? envData.defaultCountryCode : '+91';
    // ? //Get defaultCountryCode

    const userId = context.params.userId;
    let userData = getRequiredDataForUsers(snap.data());
    userData['id'] = userId;
    userData = prepareUserData(userData, defaultCountryCode);
    await typesense_createUserSchema();
    await typesense_addUserDocument(userData);
});

exports.updateUserInSearch = functions.firestore.document('users/{userId}').onUpdate(async (change, context) => {
    const userId = context.params.userId;
    let beforeData = getRequiredDataForUsers(change.before.data());
    let afterData = getRequiredDataForUsers(change.after.data());
    if (JSON.stringify(beforeData) !== JSON.stringify(afterData)) {
        // ? Get defaultCountryCode
        const envDoc = await db.collection('settings').doc('environment').get();
        const envData = envDoc.data();
        const defaultCountryCode = 'defaultCountryCode' in envData ? envData.defaultCountryCode : '+91';
        // ? //Get defaultCountryCode

        let updatedUser = { ...afterData };
        updatedUser['id'] = userId;
        updatedUser = prepareUserData(updatedUser, defaultCountryCode);
        await typesense_updateUserDocument(updatedUser);
    }
});

exports.deleteUserInSearch = functions.firestore.document("users/{userId}").onDelete(async (snap, context) => {
    const userId = context.params.userId;
    await typesense_deleteUserDocument(userId);
});

function typesense_getIndexUser() {
    return `${projectId}-users`;
}

function prepareUserData(user, defaultCountryCode) {
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

async function typesense_createUserSchema() {
    return new Promise(async (resolve, reject) => {
        let typesenseClient = await typesense_initClient();
        if (!typesenseClient) return;
        const collection = typesense_getIndexUser();
        const collectionExists = await typesense_checkCollectionExists(collection);
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
        typesenseClient.collections().create(userCollection);
        resolve(true);
    });
}

async function typesense_addUserDocument(user) {
    let typesenseClient = await typesense_initClient();
    if (!typesenseClient) return;
    return typesenseClient.collections(typesense_getIndexUser()).documents().create(user, {
        "dirty_values": "coerce_or_drop"
    });
}

async function typesense_updateUserDocument(user) {
    let typesenseClient = await typesense_initClient();
    if (!typesenseClient) return;
    return typesenseClient.collections(typesense_getIndexUser()).documents(user.id).update(user, {
        "dirty_values": "coerce_or_drop"
    });
}

async function typesense_deleteUserDocument(userId) {
    return new Promise(async resolve => {
        try {
            let typesenseClient = await typesense_initClient();
            if (!typesenseClient) return;
            await typesenseClient.collections(typesense_getIndexUser()).documents(userId).delete();
            resolve(true);
        } catch (error) {
            console.log('error in deleting documents from typesense', error);
            resolve(false);
        }
    });
}
// ? End Create, Update Or Delete User In TypeSense

runTypeSense()

function runTypeSense() {
}