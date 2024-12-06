const functions = require("firebase-functions");
var https = require('https');
const querystring = require('querystring');

const {
    db,
    googleMapKey,
    country
} = require('./admin');

const codes = [
    {code: "37", state: "Andhra Pradesh"},
    {code: "12", state: "Arunachal Pradesh"},
    {code: "18", state: "Assam"},
    {code: "35", state: "Andaman and Nicobar Islands"},
    {code: "10", state: "Bihar"},
    {code: "22", state: "Chattisgarh"},
    {code: "07", state: "Delhi"},
    {code: "30", state: "Goa"},
    {code: "24", state: "Gujarat"},
    {code: "06", state: "Haryana"},
    {code: "02", state: "Himachal Pradesh"},
    {code: "01", state: "Jammu and Kashmir"},
    {code: "20", state: "Jharkhand"},
    {code: "29", state: "Karnataka"},
    {code: "32", state: "Kerala"},
    {code: "31", state: "Lakshadweep Islands"},
    {code: "23", state: "Madhya Pradesh"},
    {code: "27", state: "Maharashtra"},
    {code: "14", state: "Manipur"},
    {code: "17", state: "Meghalaya"},
    {code: "15", state: "Mizoram"},
    {code: "13", state: "Nagaland"},
    {code: "21", state: "Odisha"},
    {code: "34", state: "Pondicherry"},
    {code: "03", state: "Punjab"},
    {code: "08", state: "Rajasthan"},
    {code: "11", state: "Sikkim"},
    {code: "33", state: "Tamil Nadu"},
    {code: "36", state: "Telangana"},
    {code: "16", state: "Tripura"},
    {code: "09", state: "Uttar Pradesh"},
    {code: "05", state: "Uttarakhand"},
    {code: "19", state: "West Bengal"},
];

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


exports.getLatLng = functions.https.onCall(async (data, context) => {
    const orderId = data.orderId;
    let docId = '';
    let adrsData = {};
    const orderRef = await db.collection('orders').where('orderId', '==', orderId).get();
    orderRef.forEach(async (doc) => {
        if (doc && doc.id && doc.data()) {
            docId = doc.id;
            adrsData = doc.data().address;
        }
    });
    if (docId && adrsData) {
        const formattedAddress = `${adrsData.address}, ${adrsData.city}, ${adrsData.state}, ${adrsData.pincode}, ${country}`;
        let geometryData = await generateLatLng(formattedAddress);
        await db.collection('orders').doc(docId).update({
            deliveryLatLng: geometryData.results[0].geometry.location
        });
        return geometryData;
    } else {
        return {
            status: 'failed'
        };
    }

});

exports.getLatLngFromAddress = functions.https.onCall(async (data, context) => {
    let adrsData = data;
    if (adrsData) {
        const formattedAddress = `${adrsData.address}, ${adrsData.city}, ${adrsData.state}, ${adrsData.pincode}, ${country}`;
        let geometryData = await generateLatLng(formattedAddress);
        return geometryData;
    } else {
        return {
            status: 'failed'
        };
    }
});

exports.getAddressFromLatLng = functions.https.onCall(async (data, context) => {
    const lat = data.lat;
    const lng = data.lng;
    console.log('lat', lat);
    console.log('lng', lng);
    try {
        let address = await getAddress(lat, lng);
        return address;
    } catch (error) {
        return {
            success: false
        };
    }
});

function getAddress(lat, lng) {
    return new Promise(function (resolve, reject) {
        https.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapKey}`, (res) => {
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

exports.onCreateUserAddress = functions.firestore.document('users/{userId}/addresses/{addressId}').onCreate(async (snap, context) => {
    const userId = context.params.userId;
    const adrsId = context.params.addressId;
    const adrsData = snap.data();
    const formattedAddress = `${adrsData.address}, ${adrsData.city}, ${adrsData.state}, ${adrsData.pincode}, ${country}`;
    if (adrsData && (!adrsData.lat && !adrsData.lng)) {
        let geometryData = await generateLatLng(formattedAddress);
        let adrsLat = geometryData.results[0].geometry.location.lat;
        let adrsLng = geometryData.results[0].geometry.location.lng;
        adrsData['lat'] = adrsLat;
        adrsData['lng'] = adrsLng;
        await db.collection('users').doc(userId).collection('addresses').doc(adrsId).update({
            lat: adrsLat,
            lng: adrsLng
        });
    }
    if(!adrsData.stateCode){
        console.log("setting address:")
        let stateCode = '';
        stateCode = getStateCode(adrsData);
        adrsData['stateCode'] = stateCode;
        await db.collection('users').doc(userId).collection('addresses').doc(adrsId).update({stateCode: stateCode});
    }

    if(adrsData.defaultAddress) {
        setTimeout(async () => {
            await db.collection('users').doc(userId).update({defaultAddress: adrsData});
        }, 3000);
    }
});
exports.onUpdateUserAddress = functions.firestore.document('users/{userId}/addresses/{addressId}').onUpdate(async (change, context) => {
    const userId = context.params.userId;
    const adrsId = context.params.addressId;
    const oldAdrsData = change.before.data();
    const newAdrsData = change.after.data();
    const formattedAddress = `${newAdrsData.address}, ${newAdrsData.city}, ${newAdrsData.state}, ${newAdrsData.pincode}, ${country}`;
    if ((oldAdrsData.address !== newAdrsData.address || oldAdrsData.city !== newAdrsData.city || oldAdrsData.state !== newAdrsData.state || oldAdrsData.pincode !== newAdrsData.pincode) || (!newAdrsData.lat && !newAdrsData.lng)) {
        let geometryData = await generateLatLng(formattedAddress);
        let adrsLat = geometryData.results[0].geometry.location.lat;
        let adrsLng = geometryData.results[0].geometry.location.lng;
        newAdrsData['lat'] = adrsLat;
        newAdrsData['lng'] = adrsLng;
        await db.collection('users').doc(userId).collection('addresses').doc(adrsId).update({
            lat: adrsLat,
            lng: adrsLng
        });
    }
    if(oldAdrsData.state !== newAdrsData.state || !newAdrsData.hasOwnProperty('stateCode')) {
        let stateCode = '';
        stateCode = getStateCode(newAdrsData);
        newAdrsData['stateCode'] = stateCode;
        await db.collection('users').doc(userId).collection('addresses').doc(adrsId).update({stateCode: stateCode});
    }

    if(newAdrsData.defaultAddress) {
        setTimeout(async () => {
            await db.collection('users').doc(userId).update({defaultAddress: newAdrsData});
        }, 3000);
    }
});

function getStateCode(adrsData) {
    let existingState = adrsData.state.toLowerCase().trim();
    let stateCode = '';
    for (let c of codes) {
        if(c.state.toLowerCase() === existingState) {
            console.log("state matched, updating");
        stateCode = c.code;
        break;
        }
    }
    return stateCode;
}