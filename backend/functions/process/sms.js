const functions = require('firebase-functions');
var https = require('https');
var twilio = require('twilio');
const {
    db,
    smsKey,
    smsSenderId
} = require('./admin');
var options = {
    "method": "POST",
    "hostname": "api.msg91.com",
    "port": null,
    "path": "/api/v5/flow/",
    "headers": {
        "authkey": smsKey,
        "content-type": "application/json"
    }
};
var customSms = {
    active: false,
    accountSid: '',
    authToken: '',
    twilioNumber: ''
  }

// Twilio integration starts

function sendMsgFromTwilio(msg, sendTo){
    var accountSid = customSms.accountSid; // Your Account SID from www.twilio.com/console
    var authToken = customSms.authToken;   // Your Auth Token from www.twilio.com/console

    var client = new twilio(accountSid, authToken);
    client.messages.create({
        body: msg,
        to: sendTo,  // Text this number
        from: customSms.twilioNumber // From a valid Twilio number
    })
    .then((message) => console.log('msg sent'))
    .catch((err)=> console.log(err));
}
// Twilio integration ends


async function sendSMS(order, status) {
    let phoneNo = order.address && order.address.phoneNo ? order.address.phoneNo.replace('+', '') : null;
    
    const settingsDoc = await db.collection('settings').doc('store').get();
    const settings = settingsDoc.data();

    if(!phoneNo){
        return;
    }

    let storeName = '',
        storePhone = '';
    let orderId = order.orderId ? order.orderId : '';
    let smsCount = 0;
    if (order.address && order.address.name) {
        order.address.name = order.address.name.split(" ")[0];
    }
    if (customSms.active) {
        let msg = '';
        if (status == 'Delivered') {
            msg = `Hello ${order.address.name}, \nYour order with Order id ${orderId} is delivered at your selected address. Thank you for shopping with us. \n${settings.storeName}`;
        }
        else if (status == 'Confirmed') {
            msg = `Hello ${order.address.name}, \nThank you for your order. Your Order id ${orderId}. We will inform you when we dispatch your order. \n${settings.storeName}`;
        } 
        else if (status == 'Dispatched') {
            msg = `Hello ${order.address.name}, \nYour order with Order id ${orderId} is dispatched and will reach to you soon. \n${settings.storeName}`;
        } 
        else if (status == 'Cancelled') {
            msg = `Hello ${order.address.name}, \nYour order with Order id ${orderId} is cancelled. \n${settings.storeName}`;
        }
        sendMsgFromTwilio(msg, order.address.phoneNo);
    } else {
        const smsRef = db.collection('analytics').doc('sms');
        let analyticsDoc = await db.collection('analytics').doc('sms').get();
        const analyticsData = analyticsDoc.data();
        if (analyticsData) {
            if (settings && settings.storeName) {
                storeName = settings.storeName;
            }
            if (settings && settings.storePhone) {
                storePhone = settings.storePhone;
            }
            let data = {
                "template_id": "",
                "sender":smsSenderId,
                "recipients": [{
                    "mobiles": phoneNo,
                    "name": order.address.name,
                    "orderId": orderId,
                    "storeName": storeName
                }]
            }
            const smsSettingsDoc = await db.collection('settings').doc('sms').get();
            const smsSettings = smsSettingsDoc.data();
            if (smsSettings.msg91 && smsSettings.msg91.active) {
                options.headers.authkey = smsSettings.msg91.smsKey;
                data.sender = smsSettings.msg91.smsSenderId ? smsSettings.msg91.smsSenderId : smsSenderId;
            }
            console.log('status:', status);
            if (status) {
                if (status == 'Confirmed') {
                    data['template_id'] = smsSettings.msg91.active ? smsSettings.msg91.templateId.confirmed : '5f44c55fd6fc0561d638f430';
                }
                else if (status == 'Dispatched') {
                    data['template_id'] = smsSettings.msg91.active ? smsSettings.msg91.templateId.dispatched : '5f44f96cd6fc0551605cd667';
                } else if (status == 'Delivered') {
                    data['template_id'] = smsSettings.msg91.active ? smsSettings.msg91.templateId.delivered : '5f44fa58d6fc0532306528bf';
                } else if (status == 'Cancelled') {
                    data['template_id'] = smsSettings.msg91.active ? smsSettings.msg91.templateId.cancelled :'5f44fa9fd6fc0539551d80f8';
                }
                let postData = JSON.stringify(data);
                console.log("sending SMS");
                console.log(data);
                var req = https.request(options, function (res) {
                    var chunks = [];
                    res.on("data", function (chunk) {
                        chunks.push(chunk);
                    });
                    res.on("end", function () {
                        var body = Buffer.concat(chunks);
                        console.log(body.toString());
                    });
                });
                req.on('error', (e) => {
                    return console.error(e);
                });
                req.write(postData);
                req.end();
                await db.runTransaction(t => {
                    return t.get(smsRef)
                        .then(doc => {
                            var smsDoc = doc.data();
                            t.update(smsRef, {
                                count: smsDoc.count + 1
                            });
                        });
                });
            }
        }
    }
}

async function sendSMSToVendor(data) {
    const smsRef = db.collection('analytics').doc('sms');
    let postData = JSON.stringify(data);
            console.log("sending SMS");
            console.log(data);
            var req = https.request(options, function (res) {
                var chunks = [];
                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });
                res.on("end", function () {
                    var body = Buffer.concat(chunks);
                    console.log(body.toString());
                });
            });
            req.on('error', (e) => {
                return console.error(e);
            });
            req.write(postData);
            req.end();
            await db.runTransaction(t => {
                return t.get(smsRef)
                    .then(doc => {
                        var smsDoc = doc.data();
                        t.update(smsRef, {
                            count: smsDoc.count + 1
                        });
                    });
            });
}




exports.onUpdateOrder = functions.firestore
    .document('orders/{orderId}').onUpdate(async (change, context) => {
        const settingsSms = await db.collection('settings').doc('sms').get();
        if (settingsSms.data() && settingsSms.data().active) {
          customSms.active = settingsSms.data().active;
          customSms.accountSid = settingsSms.data().accountSid;
          customSms.authToken = settingsSms.data().authToken;
          customSms.twilioNumber = settingsSms.data().twilioNumber;
        } else{
            customSms.active = false;
        }
      
        const orderId = context.params.orderId;
        const orderDocBefore = change.before.data();
        const orderDocAfter = change.after.data();

          if(orderDocAfter.status === 'Confirmed' && orderDocBefore.status == 'Pending') {
            sendSMS(orderDocAfter, 'Confirmed');
          } else if(orderDocAfter.status === 'Dispatched' && orderDocBefore.status != 'Dispatched'){
            sendSMS(orderDocAfter, 'Dispatched');
          } else if(orderDocAfter.status === 'Cancelled' && orderDocBefore.status != 'Cancelled' ){
            sendSMS(orderDocAfter, 'Cancelled');
          } else if(orderDocAfter.status === 'Rejected' && orderDocBefore.status != 'Rejected' ){
             sendSMS(orderDocAfter, 'Cancelled');
          } else if(orderDocAfter.status === 'Delivered' && orderDocBefore.status != 'Delivered'){
             sendSMS(orderDocAfter, 'Delivered');
          } 
          else if(orderDocAfter.status === 'Confirmed' && orderDocBefore.orderId == null && orderDocAfter.orderId != null){
           
             sendSMS(orderDocAfter, 'Confirmed');
          }
 });




 exports.onOrderCreateOfVendor = functions.firestore.document("features/multiVendor/vendors/{vendorId}/orders/{orderId}").onCreate(async (snap, context) => {
    const vendorId = context.params.vendorId;
    const vendorOrder = snap.data();
    const vendorRef = await db.collection('features').doc('multiVendor').collection('vendors').doc(vendorId).get();
    const vendor = vendorRef.data();
    const vendorProducts = [];
    let storeName = '';

    if(vendorOrder.products.length) {
        vendorOrder.products.forEach(product => {
            vendorProducts.push(`${product.name}(QTY: ${product.quantity})`)
        });
    }

    const settingsDoc = await db.collection('settings').doc('store').get();
    const settings = settingsDoc.data();
    if (settings && settings.storeName) {
        storeName = settings.storeName;
    }

    const smsData = {
        "template_id": "60530d3f89a8734ded63e717",
        "sender": smsSenderId,
        "recipients": [{
            "mobiles": vendor.phone,
            "name": vendor.name,
            "orderId": vendorOrder.order.id,
            "storeName": storeName,
            "products": vendorProducts.toString()
        }]
    }

    await sendSMSToVendor(smsData);
})

exports.onCreateUser = functions.firestore.document('users/{userId}').onCreate(async (snap, context) => {
    const userDocId = context.params.userId
    const userData = snap.data()
    if (userData.phoneNo) {
        const twilioRef = await db.collection( 'integrations' ).doc( 'sms' ).collection( 'list' ).doc( 'twilio' ).get()
        let twilioData = twilioRef.data()
        if ( twilioData.active ) {
            if ( twilioData.credentials.twilioNumber && twilioData.credentials.authToken && twilioData.credentials.accountSid && twilioData.events.onCreateUser.active && twilioData.events.onCreateUser.body ) {
                // sendMsgFromTwilio(twilioData.events.onCreateUser.body, userData.phoneNo);
                var client = new twilio( twilioData.credentials.accountSid, twilioData.credentials.authToken );
                client.messages.create( {
                    body: twilioData.events.onCreateUser.body,
                    to: userData.phoneNo,  // Text this number
                    from: twilioData.credentials.twilioNumber // From a valid Twilio number
                } )
                    .then( ( message ) => console.log( 'msg sent' ) )
                    .catch( ( err ) => console.log( err ) );
            }
        }
    }
})

async function test() {
    const twilioRef = await db.collection('integrations').doc('sms').collection('list').doc('twilio').get()
    let twilioData = twilioRef.data() 
    if (twilioData.active) {
        if (twilioData.credentials.twilioNumber && twilioData.credentials.authToken && twilioData.credentials.accountSid && twilioData.events.onCreateUser.active && twilioData.events.onCreateUser.body) {
            var client = new twilio( twilioData.credentials.accountSid, twilioData.credentials.authToken );
                client.messages.create( {
                    body: twilioData.events.onCreateUser.body,
                    to: '+919911126237',  // Text this number
                    from: twilioData.credentials.twilioNumber // From a valid Twilio number
                } )
                    .then( ( message ) => console.log( 'msg sent', message ) )
                    .catch( ( err ) => console.log( err ) );
        }
    }
}
// test()

// async function PrepareTosendSMS(){
//     const settingsSms = await db.collection('settings').doc('sms').get();
//     if (settingsSms.data() && settingsSms.data().active) {
//       customSms.active = settingsSms.data().active;
//       customSms.accountSid = settingsSms.data().accountSid;
//       customSms.authToken = settingsSms.data().authToken;
//       customSms.twilioNumber = settingsSms.data().twilioNumber;
//     } else{
//         customSms.active = false;
//     }
//     console.log('customeSMS:', customSms);
//     const orderDocAfter = await db.collection('orders').doc('xXWxoGrBBjKn2UXzyhvj').get();
//     sendSMS(orderDocAfter.data(), 'Confirmed');
// };

// PrepareTosendSMS();
