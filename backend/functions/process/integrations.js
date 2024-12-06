const functions = require("firebase-functions");
const axios = require('axios').default;
var moment = require('moment-timezone');

const {
    middleware,
    projectId,
    timeZone,
    db
} = require('./admin');


exports.setupIntegration = functions.firestore.document('integrations/{integrationType}/list/{integrationCode}').onCreate(async (snap, context) => {
    const data = {
        ...snap.data(),
        integrationCode: context.params.integrationCode,
        projectId,
        createdAt: new Date(moment().tz(timeZone))
    };
    try {
        axios.post(`${middleware.apiUrl}/setup-setupIntegration`, data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log('setupIntegration: error in calling middleware', error);
            });
    } catch (error) {
        console.log('error in setupIntegration', error);
    }

});

exports.integrationOnUpdate = functions.firestore.document('integrations/{integrationType}/list/{integrationCode}').onUpdate(async (change, context) => {
    const data = {
        ...change.after.data(),
        integrationCode: context.params.integrationCode,
        projectId,
        lastUpdatedAt: new Date(moment().tz(timeZone))
    };
    try {
        axios.post(`${middleware.apiUrl}/setup-updateIntegration`, data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log('updateIntegration: error in calling middleware', error);
            });
    } catch (error) {
        console.log('error in updateIntegration', error);
    }

});

exports.onCreateOrder = functions.firestore.document('integrations/{integrationType}/list/{integrationCode}/orders/{orderId}').onCreate(async (snap, context) => {
    try {
        const integrationCode = context.params.integrationCode;
        let orderId = context.params.orderId;
        let orderDocId = '';
        const alphaNumericRegExp = /[a-zA-Z]/g;
        if(alphaNumericRegExp.test(orderId)) {
            orderId = orderId.split('-')[0];
        }
        const orderRef = await db.collection('orders').where('orderId', '==', +orderId).get();
        orderRef.forEach(doc => {
            orderDocId = doc.id;
        });
        console.log('orderDocId', orderDocId);
        await db.collection('orders').doc(orderDocId).update({
            'externalIntegration.delivery.integrationCode': integrationCode
        });
    } catch (error) {}

});

exports.onUpdateOrder = functions.firestore.document('integrations/{integrationType}/list/{integrationCode}/orders/{orderId}').onUpdate(async (change, context) => {
    try {
        let orderId = context.params.orderId;
        const integrationCode = context.params.integrationCode;
        let orderDocId = '';
        const alphaNumericRegExp = /[a-zA-Z]/g;
        if(alphaNumericRegExp.test(orderId)) {
            orderId = orderId.split('-')[0];
        }
        const after = change.after.data();
        const before = change.before.data();
        const orderRef = await db.collection('orders').where('orderId', '==', +orderId).get();
        orderRef.forEach(doc => {
            orderDocId = doc.id;
        });
        if(after.cancelCount !== before.cancelCount) {
            await db.collection('orders').doc(orderDocId).update({
                'externalIntegration.delivery.integrationCode': ''
            });
        }
        if(after.status !== 'process_start' && before.status === 'process_start') {
            await db.collection('orders').doc(orderDocId).update({
                'externalIntegration.delivery.integrationCode': integrationCode
            });
        }
    } catch (error) {}

});