const functions = require("firebase-functions");
var https = require('https');
const {
    googleMapKey,
    db,
    timeZone,
    currencySymbol
} = require('./admin');
var moment = require('moment-timezone');
var globalFile = require('./global');

exports.getPickDropCost = functions.https.onCall(async (data, context) => {
    const origin = {
        lat: data.obj.pickup.lat,
        lng: data.obj.pickup.lng
    };
    const destination = {
        lat: data.obj.drop.lat,
        lng: data.obj.drop.lng
    };
    try {
        let distanceRes = await getDistance(origin, destination);
        let distance = parseFloat((distanceRes.rows[0].elements[0].distance.value / 1000).toFixed(2));
        console.log('distance in kms', distance);
        let deliveryCost = 0;   
        if (distance < 1) {
            deliveryCost = data.settings.deliveryByKm.cost;
            console.log('deliveryCost:', deliveryCost);
        } else {
            deliveryCost = distance * data.settings.deliveryByKm.cost;
        }
        return deliveryCost;
    } catch (error) {
        return {
            success: false,
            error: error
        };
    }
});
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
exports.onCreatePickupOrder = functions.firestore.document('features/pickDrop/orders/{orderId}').onCreate(async (snap, context) => {
    const metaDataRef = db.collection('ordersMetaData').doc('metadata');
    const orderId = context.params.orderId;
    const order = snap.data();
    await db.runTransaction(t => {
        return t.get(metaDataRef)
        .then(async doc => {
            let lastPickupId = 1000;
            if(doc.exists) {
                lastPickupId = doc.data().lastPickupId || 1000;
            }
            t.update(metaDataRef, {lastPickupId: lastPickupId + 1});
            t.update(snap.ref, {orderId: lastPickupId + 1, createdAt: new Date(moment().tz(timeZone))})
            await saveOrderTimeLine(orderId, 'pending');
            if(order.payment && order.payment.mode === 'wallet') {
                await saveOrderLogs(orderId, 'Payment made using wallet at');
                const walletTxnData = {
                    amount: order.delivery.cost,
                    uid: order.user.id,
                    txnMsg: `Paid for Pickup OrderId: ${lastPickupId + 1}`,
                    chatMsg: `${currencySymbol}${order.delivery.cost} wallet amount used for Pick and Drop OrderId: ${lastPickupId + 1}`,
                    type: 'wallet'
                }
                await globalFile.debitFromUserWallet(walletTxnData);
            }
        });
    });
});
exports.onUpdatePickupOrder = functions.firestore.document('features/pickDrop/orders/{orderId}').onUpdate(async (snap, context) => {
    const orderId = context.params.orderId;
    const after = snap.after.data();
    const before = snap.before.data();
    if((JSON.stringify(after) !== JSON.stringify(before)) && (after.status !== before.status)) {
        await saveOrderTimeLine(orderId, after.status);
    }
});
async function saveOrderTimeLine(orderId, status) {
    return new Promise(async (resolve, reject) => {
        await db.collection('features').doc('pickDrop').collection('orders').doc(orderId).update({
            ['timeline.' + status]: {
                time: new Date(moment().tz(timeZone))
            }
        });
        const text = `Order ${status === 'pending' ? 'Placed' : status} at`;
        await saveOrderLogs(orderId, text);
        resolve(true);
    });
}
async function saveOrderLogs(orderId, text) {
    return new Promise(async (resolve, reject) => {
        await db.collection('features').doc('pickDrop').collection('orders').doc(orderId).collection('logs').add({
            text,
            time: new Date(moment().tz(timeZone))
        });
        resolve(true);
    });
}