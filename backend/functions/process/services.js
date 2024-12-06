const functions = require("firebase-functions");
var universalFile = require('../universal/universal');

const {
    db
} = require('./admin');


// exports.onCreateServices = functions.firestore
//     .document("services/{serviceId}")
//     .onCreate(async (snap, context) => {
//         const serviceId = context.params.serviceId;
//         const serviceData = snap.data();
//         let isUniversal = false;
//         const envDoc = await db.collection('settings').doc('environment').get();
//         if (envDoc.data() && envDoc.data().hasOwnProperty('isUniversal')){
//             isUniversal = envDoc.data().isUniversal;
//         }
//         if (isUniversal) {
//             //await universalFile.createJsonFile('services', 'new', serviceId, {data: serviceData});
//             await db.collection('management').doc('universal').collection('service-updates').doc(serviceId).set({mode: 'new', data: {data: serviceData}});
//         }
//     });

// exports.onUpdateService = functions.firestore.document("services/{serviceId}")
//     .onUpdate(async (change, context) => {
//         let serviceData = change.after.data();
//         const serviceId = context.params.serviceId;
//         let isUniversal = false;
//         const envDoc = await db.collection('settings').doc('environment').get();
//         if (envDoc.data() && envDoc.data().hasOwnProperty('isUniversal')){
//             isUniversal = envDoc.data().isUniversal;
//         }
//         if (isUniversal) {
//            // await universalFile.createJsonFile('services', 'edit', serviceId, {data: serviceData});
//             await db.collection('management').doc('universal').collection('service-updates').doc(serviceId).set({mode: 'edit', data: {data: serviceData}});
//         }
//     });