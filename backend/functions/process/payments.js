const functions = require("firebase-functions");
var server = require('../external/server');
var router = require('../external/router');
const moment = require( 'moment-timezone' );
const checksum_lib = require('../external/paytm/checksum');
server.start(router.route);
var request = require('request');
const axios = require('axios').default;
var globalFile = require('./global');


const {
    db,
    websiteLink,
    currencyCode,
    timeZone,
    projectId,
} = require('./admin');
const crypto = require('crypto');
const Razorpay = require('razorpay');
var globalFile = require('./global');

function genCheckSum(paytmParams, key) {
    return new Promise(function (resolve, reject) {
        checksum_lib.genchecksum(paytmParams, key, function (err, checksum) {
            console.log('checksum in cloud func', checksum);
            resolve(checksum);
        });
    });
}

exports.getCheckSumApi = functions.https.onCall(async (data, context) => {
    if(!data) {
        await globalFile.dummyCallToRemoveColdStart();
        return true;
    }
    const paytmRef = await db.collection('payment').doc('paytm').get();
    const paytmData = await paytmRef.data();
    console.log('paytmData', paytmData);
    console.log('data from callable function', data);
    const OrderId = data.orderId;
    const CustomerId = data.customerId;
    const Amount = data.txnAmount;
    const ChannelId = 'WAP';
    const MerchantId = paytmData.merchantId;
    const Website = 'DEFAULT';
    const CallBackUrl = "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" + data.orderId;
    const IndustryTypeId = 'Retail';
    const MobileNo = data.phoneNo;
    const paytmParams = {
        MID: MerchantId,
        ORDER_ID: OrderId,
        CUST_ID: CustomerId,
        CHANNEL_ID: ChannelId,
        TXN_AMOUNT: Amount,
        WEBSITE: Website,
        CALLBACK_URL: CallBackUrl,
        INDUSTRY_TYPE_ID: IndustryTypeId,
        MOBILE_NO: MobileNo
    };
    let checksumValue = await genCheckSum(paytmParams, paytmData.key);
    console.log('cs before return', checksumValue);
    return {
        checksum: checksumValue,
        mid: paytmData.merchantId
    };
});


exports.razorpayAutoCapturePayments = functions.firestore.document('payment/history/payments/{paymentId}').onCreate(async (snap, context) => {
    const paymentData = snap.data();
    const paymentDocId = context.params.paymentId;
    let orderAmount;
    if (paymentData.type === 'subscription') {
        if (paymentData.mode === 'razorpay') {
            const paymentId = paymentData.details.paymentId;
            const amount = paymentData.amount;
            let captureRes = await autoCaptureApi(paymentId, amount);
            if (captureRes.statusCode && captureRes.statusCode === 200) {
                await db.collection('payment').doc('history').collection('payments').doc(paymentDocId).update({
                    status: 'successful'
                });
            } else {
                await db.collection('payment').doc('history').collection('payments').doc(paymentDocId).update({
                    status: 'failed'
                });
            }
        }
    } else {
        if (paymentData.mode === 'razorpay' && (!paymentData.type || paymentData.type && paymentData.type === 'order')) {
            let paymentId = paymentData.details.paymentId;
            if (paymentId && paymentId.hasOwnProperty('razorpay_payment_id')) {
                paymentId =  paymentId['razorpay_payment_id'];
            }
            if (!paymentData.hasOwnProperty('orderAmount')) {
                const orderId = paymentData.orderId;
                const orderData = await db.collection('orders').doc(orderId).get();
                if (orderData && orderData.data()) {
                    orderAmount = orderData.data().totalAmountToPaid;
                }
            } else {
                orderAmount = paymentData.orderAmount;
            }
            console.log('orderAmount', orderAmount);
            let captureRes = await autoCaptureApi(paymentId, orderAmount);
            if (captureRes.statusCode && captureRes.statusCode === 200) {
                await db.collection('payment').doc('history').collection('payments').doc(paymentDocId).update({
                    status: 'successful'
                });
            } else {
                await db.collection('payment').doc('history').collection('payments').doc(paymentDocId).update({
                    status: 'pending'
                });
            }
        }
    }
});

async function autoCaptureApi(pid, amount) {
    return new Promise(async (resolve, reject) => {
        const razorpayRef = await db.collection('payment').doc('razorpay').get();
        const razorpay = razorpayRef.data();
        const keyId = razorpay.id;
        const keySecret = razorpay.keySecret;
        console.log('keyId', keyId);
        console.log('keySecret', keySecret);
        request({
            method: 'POST',
            url: `https://${keyId}:${keySecret}@api.razorpay.com/v1/payments/${pid}/capture`,
            form: {
                amount: amount * 100,
                currency: 'INR'
            }
        }, function (error, response, body) {
            console.log('Status:', response.statusCode);
            console.log('Headers:', JSON.stringify(response.headers));
            console.log('Response:', body);
            resolve(response);
        });
    });
}

exports.ac_saveOrderPaymentDetails = functions.https.onCall(async (data, context) => {
    if(!data) {
        await globalFile.dummyCallToRemoveColdStart();
        return true;
    }
    try {
        const order = data.order;
        const orderDocId = order.orderDocId;
        console.log('order scheduled', order.scheduledDate);
        const mode = data.mode;
        const txnRes = data.txnRes;
        const amount = data.amount;
        order['cashbackAmount'] = order.cashbackAmount || 0;
        order['payment'] = {
            completed: true,
            mode: mode,
            details: txnRes,
            status: 'completed'
        }
        order['status'] = 'Confirmed';
        
        let paymnetHistory = {
            paidAt: new Date(),
            orderId: '',
            userId: order.userId,
            mode: mode,
            details: txnRes,
            type: 'order'
        }
        console.log(orderDocId);
        if(!order.hasOwnProperty('createdAt')){
            order['createdAt'] = new Date()
        }


        if(order.hasOwnProperty('listOfCommentImages')) {
            delete order['listOfCommentImages'];
        }

        if('partialPayment' in order && order.partialPayment.status) {

            order.partialPayment.online = {...order.partialPayment.online, ...order['payment']}

            order['payment'] = {
                mode: 'cash',
                completed: false,
                details: {
                    amount: order.partialPayment.cod
                }
            }
        } else {
            order.partialPayment = {
                status: false
            }
        }

        if(orderDocId && orderDocId !== undefined){
            await db.collection('orders').doc(orderDocId).update({
                payment: order['payment'], 
                partialPayment: order.partialPayment,
                status: order['status']
            });
            // if (order.walletAmount > 0 || order.cashbackAmount > 0) {
            //     await updateWalletAmount(order.walletAmount, order.cashbackAmount, order.userId, orderDocId);
            // }
            paymnetHistory['orderId'] = orderDocId;
            
        }
        else{
            order['createdAt'] = new Date();
            const orderRef = await db.collection('orders').add(order);
            // if(order.walletAmount > 0 || order.cashbackAmount > 0) {
            //     await updateWalletAmount(order.walletAmount, order.cashbackAmount, order.userId, orderRef.id);
            // }
            console.log("inside 2 nd condition");
            paymnetHistory['orderId'] = orderRef.id;

        }
        
        if (mode === 'razorpay') {
            paymnetHistory['status'] = 'pending';
            paymnetHistory['orderAmount'] = amount / 100;
        } else {
            paymnetHistory['status'] = 'successful';
            paymnetHistory['orderAmount'] = amount;
        }
        await db.collection('payment').doc('history').collection('payments').add(paymnetHistory);
        return {
            status: 'success'
        };

    } catch (error) {
        console.log(error);
        return {
            status: 'failed'
        };
    }
});


async function updateWalletAmount(walletAmnt, cashbackAmnt, uid, oid, orderType = 'order') {
    return new Promise(async (resolve, reject) => {
        try {
            if(walletAmnt > 0 || cashbackAmnt > 0) {
                let orderNumberId, 
                txnMsg = orderType === 'order' ? 'Paid for Order' : `Paid for ${orderType}`;
                if(oid && typeof oid !== 'number') {
                    const orderDoc = await db.collection('orders').doc(oid).get();
                    if(orderDoc && orderDoc.data()) {
                        orderNumberId = orderDoc.data().orderId;
                    }
                }
                if(orderNumberId) {
                    txnMsg = orderType === 'order' ? `Paid for Order(${orderNumberId}):` : `Paid for ${orderType}(${orderNumberId})`;
                }

                const userRef = await db.collection('users').doc(uid).get();
                let userData = userRef.data();
                let userWallet = userData.wallet;
                let transaction = {
                    amount: walletAmnt + cashbackAmnt,
                    message: txnMsg,
                    createdAt: new Date(),
                    type: 'debit',
                    orderId: oid
                };
                await db.collection('users').doc(uid).update({
                    wallet: {
                        balance: userWallet.balance >= walletAmnt ? userWallet.balance - walletAmnt : 0,
                        cashback: userWallet && userWallet.cashback ? ((userWallet.cashback - cashbackAmnt) > 0 ? userWallet.cashback - cashbackAmnt : 0) : 0,
                        lastTransactions: transaction
                    }
                });
                await db.collection('orders').doc(oid).update({
                    'metaData.walletDeducted': true
                });

                await db.collection('users').doc(uid).collection('walletTransactions').add(transaction);
            }
            resolve(true);
        } catch (error) {
            console.log(error);
            resolve(false);
        }
    });

}

exports.completePaymentWithWallet = functions.https.onCall(async (data, context) => {
    try {
        const cashbackAmnt = data.cashbackAmount || 0;
        const orderRef = await db.collection('orders').where('orderId', '==', data.orderId).get();
        orderRef.forEach(async (doc) => {
            if (doc.id) {
                await db.collection('orders').doc(doc.id).update({
                    payment: {
                        completed: true,
                        mode: 'wallet',
                        status: 'completed'
                    },
                    walletAmount: data.walletAmount,
                    cashbackAmnt: cashbackAmnt,
                    status: 'Confirmed',
                });
                await updateWalletAmount(data.walletAmount, cashbackAmnt, data.userId, doc.id);
            }
        });
        return {
            status: 'success'
        };
    } catch (error) {
        console.log(error);
        return {
            status: 'failed'
        };
    }
});

exports.saveOrderPaymentDetails = functions.https.onCall(async (data, context) => {
    try {
        const order = data.order;
        order['cashbackAmount'] = order.cashbackAmount || 0;
        const orderRef = await db.collection('orders').where('orderId', '==', order.orderId).get();
        const orderStatus = order.status === 'Pending' ? 'Confirmed': order.status;

        order['payment'] = {
            completed: true,
            mode: data.mode,
            details: data.txnRes,
            status: 'completed'
        };

        if('partialPayment' in order && order.partialPayment.status) {

            order.partialPayment.online = {...order.partialPayment.online, ...order['payment']}

            order['payment'] = {
                mode: 'cash',
                completed: false,
                details: {
                    amount: order.partialPayment.cod
                }
            }
        } else {
            order.partialPayment = {
                status: false
            }
        }

        orderRef.forEach(async (doc) => {
            if (doc.id) {
                await db.collection('orders').doc(doc.id).update({
                    payment: order['payment'],
                    walletAmount: order.walletAmount,
                    cashbackAmount: order.cashbackAmount,
                    status: orderStatus,
                    scheduledDate: order.scheduledDate ? new Date(order.scheduledDate) : '',
                    scheduledTime: order.scheduledTime,
                    partialPayment: order.partialPayment,
                    extraChargeOnPayment: order.extraChargeOnPayment || { charge: 0, type: 'flat', chargeName: '', maxCharge: 0 }
                });
                const paymnetHistory = {
                    paidAt: new Date(),
                    orderId: doc.id,
                    userId: order.userId,
                    mode: data.mode,
                    details: data.txnRes,
                    type: 'order'
                }
                if (data.mode === 'razorpay') {
                    paymnetHistory['status'] = 'pending';
                    paymnetHistory['orderAmount'] = data.amount / 100;
                } else {
                    paymnetHistory['status'] = 'successful';
                    paymnetHistory['orderAmount'] = data.amount;
                }
                await db.collection('payment').doc('history').collection('payments').add(paymnetHistory);
                // if (order.walletAmount > 0 || order.cashbackAmount > 0) {
                //     await updateWalletAmount(order.walletAmount, order.cashbackAmount, order.userId, doc.id);
                // }
            }
        });
        return {
            status: 'success'
        };
    } catch (error) {
        console.log(error);
        return {
            status: 'failed'
        };
    }
});

exports.ac_paymentWithCash = functions.https.onCall(async (order, context) => {
    if(!order) {
        await globalFile.dummyCallToRemoveColdStart();
        return true;
    }
    try {
        order['createdAt'] = new Date();
        order['status'] = 'Confirmed';
        if (order.scheduledDate) {
            order.scheduledDate = new Date(order.scheduledDate);
        }
        order['cashbackAmount'] = order.cashbackAmount || 0;

        if(order.hasOwnProperty('listOfCommentImages')) {
            delete order['listOfCommentImages'];
        }

        if(order.hasOwnProperty('uploadedDoc') && order.uploadedDoc.uploads.length) {
            delete order.uploadedDoc.uploads;
        }

        let orderId = '';

        if(order.orderDocId) {
            orderId = order.orderDocId;
        } else {
            const orderRef = await db.collection('orders').add(order);
            orderId = orderRef.id;
        }

        if (order.walletAmount > 0 || order.cashbackAmount > 0) {
            await updateWalletAmount(order.walletAmount, order.cashbackAmount, order.userId, orderId);
        }

        
        return {
            status: 'success',
            orderDocId: orderId
        };

    } catch (error) {
        console.log(error);
        return {
            status: 'failed'
        };
    }
});

exports.paymentWithCash = functions.https.onCall(async (order, context) => {
    try {
        order['cashbackAmount'] = order.cashbackAmount || 0;
        const orderRef = await db.collection('orders').where('orderId', '==', order.orderId).get();
        orderRef.forEach(async (doc) => {
            if (doc.id) {
                await db.collection('orders').doc(doc.id).update({
                    payment: {
                        completed: false,
                        mode: 'cash',
                        details: {
                            amount: order.totalAmountToPaid - order.walletAmount - order.cashbackAmount
                        }
                    },
                    status: 'Confirmed',
                    walletAmount: order.walletAmount,
                    cashbackAmount: order.cashbackAmount,
                    scheduledDate: order.scheduledDate ? new Date(order.scheduledDate) : '',
                    scheduledTime: order.scheduledTime
                });
                if ((order.walletAmount > 0 || order.cashbackAmount > 0) && !isWalletDeducted(doc.data())) {
                    await updateWalletAmount(order.walletAmount, order.cashbackAmount, order.userId, doc.id);
                }
            }
        });
        return {
            status: 'success'
        };
    } catch (error) {
        console.log(error);
        return {
            status: 'failed'
        };
    }
});

exports.updateUserWalletAmount = functions.https.onCall(async (data, context) => {
    data['cashbackAmount'] = data.cashbackAmount || 0;
    await updateWalletAmount(data.walletAmount, data.cashbackAmount, data.userId, data.orderId);
    return {
        status: 'success'
    };
})

exports.payWithStripe = functions.https.onCall(async (data, context) => {
    try {
        const stripeRef = await db.collection('payment').doc('stripe').get();
        if(!stripeRef || !stripeRef.data() || !stripeRef.data().secretKey) {
            console.log('no stripe secret key present');
            return {
                status: 'failed'
            };
        }
        const stripe = require('stripe')(`${stripeRef.data().secretKey}`);
        const charge = await stripe.charges.create({
            amount: data.amount,
            currency: data.currency,
            source: data.token,
        });
        console.log('stripe charge id', charge.id);
        return {
            status: 'success',
            txnRes: {id: charge.id}
        };
    } catch (error) {
        console.log('err in pay with stripe', error);
        return {
            status: 'failed'
        };
    }
});


function createCashfreeOrder(data){
    return new Promise(async (resolve, reject) => {
        const cashfreeDoc = await db.collection('payment').doc('cashfree').get();
        const cashfreeDetails = cashfreeDoc.data();
        const envDoc = await db.collection('settings').doc('environment').get();
        const env = envDoc.data();
        let currencyCode = '';
        let userEmail = '';
        let phoneNo = '';
        let userId = '';
        if(data.source === 'website-universal' || data.source === 'website-v2') {
            currencyCode = data.currencyCode;
            userEmail = data.user.email;
            phoneNo = data.user.phoneNo;
            userId = data.user.id;
        } else {
            const userDoc = await db.collection('users').doc(data.userId).get();
            const userDetails = userDoc.data();
            currencyCode = env.currencyCode;
            userEmail = userDetails.email ? userDetails.email : '';
            phoneNo = userDetails.phoneNo;
            userId = data.userId;
        }
        console.log('data:', data);
        let returnUrl;

        // For testing
        // let url = 'https://sandbox.cashfree.com/pg/orders';

        //For production
        let url = 'https://api.cashfree.com/pg/orders'; 

        if (env.hasOwnProperty('cashfree') && env.cashfree.development){
            url = 'https://sandbox.cashfree.com/pg/orders';
        }

        if (data.source == 'app') {
            returnUrl = null;
        } else {
            returnUrl = `${websiteLink}/order-summary/cashfree?cf_id={order_id}&cf_token={order_token}`;
            if (data.source === 'website-universal') {
                returnUrl = `${websiteLink}/user/order-summary/cashfree?cf_id={order_id}&cf_token={order_token}`;
            }
        }
        request({
            headers: {
                'Content-Type': 'application/json',
                'x-api-version': '2021-05-21',
               'x-client-id': cashfreeDetails.app_id,
               'x-client-secret': cashfreeDetails.secret_key
            },
            json: true,
            method: 'POST',
            url,
            body: {
                "order_amount": data.orderAmnt,
                "order_currency": currencyCode,
                "customer_details": {
                    "customer_id": userId,
                    "customer_email": userEmail,
                    "customer_phone": phoneNo
                },
                "order_meta": {
                    "return_url": returnUrl,
                },
            }
        }, function (error, response, body) {
            console.log('err:', error);
            resolve(body);
            });
        });
}

exports.createOrderCashfree = functions.https.onCall(async (data, context) => {
    if(!data) {
        await globalFile.dummyCallToRemoveColdStart();
        return true;
    }
    const response = await createCashfreeOrder(data);
    return response;
})

function getCashfreeOrderDetails(data){
    return new Promise(async (resolve, reject) => {
        const cashfreeDoc = await db.collection('payment').doc('cashfree').get();
        const cashfreeDetails = cashfreeDoc.data();
        console.log('data:', data);
        const envDoc = await db.collection('settings').doc('environment').get();

        //For production
        let url = `https://api.cashfree.com/pg/orders/${data.cashfreeOrderId}`;
        
        if (envDoc.data() && envDoc.data().hasOwnProperty('cashfree') && envDoc.data().cashfree.development){
            url = `https://sandbox.cashfree.com/pg/orders/${data.cashfreeOrderId}`;
        }

        //For testing
        // let url = `https://sandbox.cashfree.com/pg/orders/${data.cashfreeOrderId}`;

        //For production
       // url = `https://api.cashfree.com/pg/orders/${data.cashfreeOrderId}`;
        
        request({
            headers: {
                'Content-Type': 'application/json',
                'x-api-version': '2021-05-21',
               'x-client-id': cashfreeDetails.app_id,
               'x-client-secret': cashfreeDetails.secret_key
            },
            json: true,
            method: 'GET',
            url,
        }, function (error, response, body) {
            console.log('err:', error);
            resolve(body);
            });
        });
}

exports.getOrderDetailsCashfree = functions.https.onCall(async (data, context) => {
    if(!data) {
        await globalFile.dummyCallToRemoveColdStart();
        return true;
    }
    const response = await getCashfreeOrderDetails(data);
    return response;
})

exports.razorpay_createOrder = functions.https.onCall(async (data, context) => {
    if(!data) {
        await globalFile.dummyCallToRemoveColdStart();
        return true;
    }
    const response = await createOrderInRazorpay(data);
    if(response.orderId) {
        const collection = data.collection || 'orders';
        if(data.orderDocId) {
            await db.collection(collection).doc(data.orderDocId).update({
                'paymentExtras.razorpayOrderId': response.orderId,
                'payment.mode': 'razorpay'
            });
        }
    }
    return {orderId: response.orderId}
});

exports.razorpay_verifySignature = functions.https.onCall(async (data, context) => {
    if(!data) {
        await globalFile.dummyCallToRemoveColdStart();
        return true;
    }
    const {keyId, keySecret} = await getRazorpayCreds();
    let body = data.razorpay_order_id + "|" + data.razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', keySecret)
                                  .update(body.toString())
                                  .digest('hex');
    const response = {signatureIsValid: false}
    if(expectedSignature === data.razorpay_signature) {
        response.signatureIsValid = true;
    }
    return response;
});

async function createOrderInRazorpay(data) {
    return new Promise(async (resolve, reject) => {
        const {keyId, keySecret} = await getRazorpayCreds();
        const instance = new Razorpay({ key_id: keyId, key_secret: keySecret });
        const options = {
            amount: data.amount,
            currency: currencyCode,
            receipt: `receipt_${data.orderDocId || 'new'}`
        }
        instance.orders.create(options, function(err, order) {
            if(err) { 
                resolve({orderId: null});
                return;
            }
            resolve({orderId: order && order.id ? order.id : null});
        });
    })
}

async function getRazorpayCreds() {
    const razorpayRef = await db.collection('payment').doc('razorpay').get();
    const razorpay = razorpayRef.data();
    const keyId = razorpay.id;
    const keySecret = razorpay.keySecret;
    return {
        keyId, keySecret
    }
}

async function getRazorpayPaymentStatus ( data ) {
    return new Promise( async ( resolve ) => {
        const { keyId, keySecret } = await getRazorpayCreds();
        const instance = new Razorpay( { key_id: keyId, key_secret: keySecret } );
        if ( data.orderId ) {
            instance.orders.fetchPayments( data.orderId, function ( err, order ) {
                console.log('order', order);
                if ( err || !order || !order.items || !order.items.length ) {
                    resolve( { payment_status: 'error' } );
                    return;
                }
                let paymentId = '';
                let status = '';
                for ( const item of order.items ) {
                    if ( [ 'authorized', 'captured' ].includes( item ) ) {
                        status = item.status;
                        paymentId = item.id;
                        break;
                    }
                }
                if ( !status ) {
                    status = order.items[ order.items.length - 1 ].status;
                }
                resolve( { payment_status: status, paymentId } );
            } );
            return;
        }
        if ( data.paymentId ) {
            instance.payments.fetch( data.paymentId, function ( err, order ) {
                if ( err ) {
                    resolve( { payment_status: 'error' } );
                    return;
                }
                resolve( { payment_status: order.status } );
            } );
            return;
        }
        resolve( { payment_status: 'error' } );
    } );
}


exports.onCreatePaymentHistory = functions.firestore.document('payment/history/payments/{paymentId}').onCreate(async (snap, context) => {
    const paymentData = snap.data();
    if((paymentData.walletAmount || paymentData.cashbackAmount) && paymentData.mode !== 'razorpay' && paymentData.status === 'successful' && paymentData.type !== 'order') {
        await updateWalletAmount(paymentData.walletAmount, paymentData.cashbackAmount, paymentData.userId, paymentData.orderId, paymentData.type);
    }
});

function isWalletDeducted(order) {
    return (order.metaData && order.metaData.walletDeducted);
}

module.exports.getRazorpayPaymentStatus = async function (data) {
    return new Promise(async (resolve) => {
        const response = await getRazorpayPaymentStatus(data);
        resolve(response);
    });
}

module.exports.updateWalletAmount = async function (data) {
    await updateWalletAmount(data.walletAmount, data.cashbackAmount, data.userId, data.orderId, 'order');
}

async function ac_saveOrderPaymentDetailsCC ( data ) {
    try {
        const order = data.order;
        const orderDocId = order.orderDocId;
        console.log( 'order scheduled', order.scheduledDate );
        const mode = data.mode;
        const txnRes = data.txnRes;
        const amount = data.amount;
        order[ 'cashbackAmount' ] = order.cashbackAmount || 0;
        order[ 'payment' ] = {
            completed: true,
            mode: mode,
            details: txnRes,
            status: 'completed'
        }
        order[ 'status' ] = 'Confirmed';

        let paymnetHistory = {
            paidAt: new Date(),
            orderId: '',
            userId: order.userId,
            mode: mode,
            details: txnRes,
            type: 'order'
        }
        console.log( orderDocId );
        if ( !order.hasOwnProperty( 'createdAt' ) ) {
            order[ 'createdAt' ] = new Date()
        }


        if ( order.hasOwnProperty( 'listOfCommentImages' ) ) {
            delete order[ 'listOfCommentImages' ];
        }

        if ( 'partialPayment' in order && order.partialPayment.status ) {

            order.partialPayment.online = { ...order.partialPayment.online, ...order[ 'payment' ] }

            order[ 'payment' ] = {
                mode: 'cash',
                completed: false,
                details: {
                    amount: order.partialPayment.cod
                }
            }
        } else {
            order.partialPayment = {
                status: false
            }
        }

        if ( orderDocId && orderDocId !== undefined ) {
            await db.collection( 'orders' ).doc( orderDocId ).update( {
                payment: order[ 'payment' ],
                partialPayment: order.partialPayment,
                status: order[ 'status' ]
            } );
            // if (order.walletAmount > 0 || order.cashbackAmount > 0) {
            //     await updateWalletAmount(order.walletAmount, order.cashbackAmount, order.userId, orderDocId);
            // }
            paymnetHistory[ 'orderId' ] = orderDocId;

        }
        else {
            order[ 'createdAt' ] = new Date();
            const orderRef = await db.collection( 'orders' ).add( order );
            // if(order.walletAmount > 0 || order.cashbackAmount > 0) {
            //     await updateWalletAmount(order.walletAmount, order.cashbackAmount, order.userId, orderRef.id);
            // }
            console.log( "inside 2 nd condition" );
            paymnetHistory[ 'orderId' ] = orderRef.id;

        }

        if ( mode === 'razorpay' ) {
            paymnetHistory[ 'status' ] = 'pending';
            paymnetHistory[ 'orderAmount' ] = amount / 100;
        } else {
            paymnetHistory[ 'status' ] = 'successful';
            paymnetHistory[ 'orderAmount' ] = amount;
        }
        await db.collection( 'payment' ).doc( 'history' ).collection( 'payments' ).add( paymnetHistory );
        return {
            status: 'success'
        };
    } catch ( error ) {
        console.log( error );
        return {
            status: 'failed'
        };
    }
}

async function saveOrderPaymentDetailsCC( data ) {
    try {
        const order = data;
        order['cashbackAmount'] = order.cashbackAmount || 0;
        const orderRef = await db.collection('orders').where('orderId', '==', order.orderId).get();
        const orderStatus = order.status === 'Pending' ? 'Confirmed': order.status;

        order['payment'] = {
            completed: true,
            mode: data.mode,
            details: data.txnRes,
            status: 'completed'
        };

        if('partialPayment' in order && order.partialPayment.status) {

            order.partialPayment.online = {...order.partialPayment.online, ...order['payment']}

            order['payment'] = {
                mode: 'cash',
                completed: false,
                details: {
                    amount: order.partialPayment.cod
                }
            }
        } else {
            order.partialPayment = {
                status: false
            }
        }

        orderRef.forEach(async (doc) => {
            if (doc.id) {
                await db.collection('orders').doc(doc.id).update({
                    payment: order['payment'],
                    walletAmount: order.walletAmount,
                    cashbackAmount: order.cashbackAmount,
                    status: orderStatus,
                    scheduledDate: order.scheduledDate ? new Date(order.scheduledDate) : '',
                    scheduledTime: order.scheduledTime,
                    partialPayment: order.partialPayment,
                    extraChargeOnPayment: order.extraChargeOnPayment || { charge: 0, type: 'flat', chargeName: '', maxCharge: 0 }
                });
                const paymnetHistory = {
                    paidAt: new Date(),
                    orderId: doc.id,
                    userId: order.userId,
                    mode: data.mode,
                    details: data.txnRes,
                    type: 'order'
                }
                if (data.mode === 'razorpay') {
                    paymnetHistory['status'] = 'pending';
                    paymnetHistory['orderAmount'] = data.amount / 100;
                } else {
                    paymnetHistory['status'] = 'successful';
                    paymnetHistory['orderAmount'] = data.amount;
                }
                await db.collection('payment').doc('history').collection('payments').add(paymnetHistory);
                // if (order.walletAmount > 0 || order.cashbackAmount > 0) {
                //     await updateWalletAmount(order.walletAmount, order.cashbackAmount, order.userId, doc.id);
                // }
            }
        });
        return {
            status: 'success'
        };
    } catch (error) {
        console.log(error);
        return {
            status: 'failed'
        };   
    }
}

// *** CCAvenue ***

exports.ccAvenueRequestModulator_Encrypt = functions.https.onCall(
    async (data, context) => {
      try {
        const CryptoJS = require("crypto-js");
        console.log("received data : ", data);
        if (data.type === "encrypt") {
          let plaintext = JSON.stringify(data);
          console.log("plaintext : ", plaintext);
          const passphrase = "PayU-BWI-346";
          let encryptedData = CryptoJS.AES.encrypt(
            plaintext,
            passphrase
          ).toString();
          console.log("encrypted data : ", encryptedData);
          return {
            status: true,
            mode: data.type,
            data: encryptedData,
          };
        } else if (data.type === "decrypt") {
          let state = ccAvenueRequestModulator_Decrypt(data);
          return {
            status: true,
            mode: data.type,
            data: state,
          };
        }
      } catch (error) {
        return {
          status: false,
          pos: "OC",
          error,
        };
      }
    }
  );
  
  function ccAvenueRequestModulator_Decrypt(data) {
    const CryptoJS = require("crypto-js");
    const passphrase = "PayU-BWI-346";
    const bytes = CryptoJS.AES.decrypt(data, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }
  
  exports.processCCAvenuePayload = functions.https.onCall(
    async (data, context) => {
      try {
        const CCAvenueDoc = await db
          .collection("Integrations")
          .doc("CCAvenue")
          .get();
          console.log('data', data);
          console.log('projectid', projectId);

          console.log('CCAvenueDoc.data()', CCAvenueDoc.data());
        let ccAvenueCreds = CCAvenueDoc.data().credentials;
        if (
          ccAvenueCreds.merchantId &&
          ccAvenueCreds.workingKey &&
          ccAvenueCreds.accessCode
        ) {
          const nodeCCAvenue = require("node-ccavenue");
          const ccav = new nodeCCAvenue.Configure({
            merchant_id: ccAvenueCreds.merchantId,
            working_key: ccAvenueCreds.workingKey,
          });
          let orderParams;
  
          orderParams = {
            order_id: data.txnId,
            currency: "INR",
            amount: data.amount,
            redirect_url: `https://us-central1-${projectId}.cloudfunctions.net/payments-hdfcRedirectLink`,
            cancel_url: `https://us-central1-${projectId}.cloudfunctions.net/payments-hdfcCancelLink`,
            language: "EN",
          };

          // ? For wallet recharge functionality
          if ("uid" in data) {
            orderParams["uid"] = data.uid;
          }

          const encryptedOrderData = ccav.getEncryptedOrder(orderParams);
          console.log(encryptedOrderData);
          const encData = JSON.stringify(encryptedOrderData);
          await db.collection('Integrations').doc('test').set({encData: encData})
          return {
            status: true,
            encryptedData: encryptedOrderData,
            accessCode: ccAvenueCreds.accessCode,
          };
        } else {
          return {
            status: false,
            reason: "Incomplete credentials received!",
            ccAvenueCreds,
          };
        }
      } catch (error) {
        console.log("Error in processCCAvenuePayload : ", error);
        return {
          status: false,
          reason: "Error in processCCAvenuePayload !",
          error,
        };
      }
    }
  );
  
  async function localCCDecrypt(data) {
    const CCAvenueDoc = await db.collection("Integrations").doc("CCAvenue").get();
    let ccAvenueCreds = CCAvenueDoc.data().credentials;
    const nodeCCAvenue = require("node-ccavenue");
    const ccav = new nodeCCAvenue.Configure({
      merchant_id: ccAvenueCreds.merchantId,
      working_key: ccAvenueCreds.workingKey,
    });
    const decryptedOrderData = ccav.redirectResponseToJson(data);
    return decryptedOrderData;
  }
  
  exports.hdfcRedirectLink = functions.https.onRequest(async (req, res) => {
    const dataReceived = req.body;
    let decryptedResponse = await localCCDecrypt(dataReceived.encResp);
    let orderId=''
    try {
      console.log("Received Redirect Data : ", decryptedResponse);
      let data = {
        txnid: decryptedResponse.order_id,
        payment_source: "CCAvenue",
        ...decryptedResponse,
      };

      if(projectId=='bwi-1256'){
            const status= await sendCCavenuePaymentStatus(data.order_id, data.tracking_id,decryptedResponse.order_id)
            console.log("api verification status : ", status)
        }
      const env = await db.collection('settings').doc('environment').get();
      let envData = env.data();
      console.log("websiteLink",websiteLink);
      let updatedWebsiteLink = envData.isUniversal ? `${websiteLink}/user` : `${websiteLink}`;
      const orderDoc=(await db.collection('orders').doc(data.order_id).get()).data()
      orderId=orderDoc?orderDoc.orderId:""
      if (decryptedResponse.order_status === "Success") {
        // console.log('Payment successful : ', decryptedResponse)
        res.send(
          passTemplate(
            "Success",
            "✓",
            "Payment verified successfully!",
            "Thank you so much.",
            data.txnid,
            data.amount,
            updatedWebsiteLink,
            orderId
          )
        );

         if (data.txnid === "wallet") {
            console.log('addToUserWallet data', data);
            data['uid'] = orderDoc.userId || "";
            const walletRes = await globalFile.addToUserWallet(data);
            console.log('walletRes', walletRes);
         } else {
           await setOrderState(data, "success");
         }

      } else if (decryptedResponse.order_status === "Failure") {
        res.send(
          passTemplate(
            "Failed",
            "X",
            "Payment could not be verified!",
            `Reason - ${decryptedResponse.status_message || "NA"}`,
            data.txnid,
            data.amount,
            updatedWebsiteLink
          )
        );
        console.log("Payment failed : ", decryptedResponse);
        if (data.txnid !== "wallet") {
            await setOrderState(data, "fail");
        }
      }
    } catch (error) {
      let data = {
        txnid: decryptedResponse.order_id,
        payment_source: "CCAvenue",
        ...decryptedResponse,
      };
  
      res.send(
        passTemplate(
          "Failed",
          "X",
          "Payment could not be verified!",
          "Please try again.",
          data.txnid,
          data.amount,
          updatedWebsiteLink,
          orderId
        )
      );
        if (data.txnid !== "wallet") {
            await setOrderState(data, "fail");
        }
      console.log("Error in hdfcRedirectLink : ", error);
    }
  });
  
  async function setOrderState(data, state) {
    if (state === "success") {
      await db.collection("orders").doc(data.txnid).update({
        "payment.status": "completed",
        "payment.mode": data.payment_source,
        "payment.details": data,
        "payment.completed": true,
        status: "Confirmed",
      });
    } else if (state === "cancel") {
      await db.collection("orders").doc(data.txnid).update({
        "payment.status": "cancelled",
        "payment.mode": data.payment_source,
        "payment.details": data,
      });
    } else {
      await db.collection("orders").doc(data.txnid).update({
        "payment.status": "failed",
        "payment.mode": data.payment_source,
        "payment.details": data,
      });
    }
  }
  
  exports.hdfcCancelLink = functions.https.onRequest(async (req, res) => {
    try {
      const dataRecieved = req.body;
      let decryptedResponse = await localCCDecrypt(dataRecieved.encResp);
      console.log("Received Cancel Data : ", decryptedResponse);
      let data = {
        txnid: decryptedResponse.order_id,
        payment_source: "CCAvenue",
        ...decryptedResponse,
      };
      if(projectId=='bwi-1256'){
        const status= await sendCCavenuePaymentStatus(data.order_id, data.tracking_id,decryptedResponse.order_id)
        console.log("api verification status : ", status)
        }
      const env = await db.collection('settings').doc('environment').get();
      let envData = env.data();
      let updatedWebsiteLink = envData.isUniversal ? `${websiteLink}/user` : `${websiteLink}`;
      const { orderId}=(await db.collection('orders').doc(data.order_id).get()).data()
      res.send(
        passTemplate(
          "Cancelled",
          "X",
          "Payment could not be verified!",
          "Please try again.",
          data.txnid,
          data.amount,
          updatedWebsiteLink,
          orderId
        )
      );
      
      if (data.txnid !== "wallet") {
        await setOrderState(data, "cancel");
      }

    } catch (error) {
      console.log("Error in hdfcCancelLink : ", error);
    }
  });
  
  async function updateOrderStatus(type, orderDocId) {
    try {
      if (type === "success") {
        await db.collection("orders").doc(orderDocId).update({
          "payment.status": "completed",
          "payment.mode": "ccAvenue",
          "payment.completed": true,
          status: "Confirmed",
        });
      } else {
        await db.collection("orders").doc(orderDocId).update({
          "payment.status": "failed",
          "payment.mode": "ccAvenue",
          "payment.completed": false,
          status: "Pending",
        });
      }
    } catch (error) {
      console.log("Error in updateOrderStatus!!! : ", error);
    }
  }
  
  exports.ccAvenueOrderStatusTracker = functions.https.onCall(
    async (data, context) => {
      return new Promise(async (resolve, reject) => {
        try {
          console.log("received Data : ", data);
          let orderNo = data.oid;
          await axios
            .get(`http://139.59.18.73/api/hdfcapi.php?orderno=${orderNo}`)
            .then(async (response) => {
              let receivedStatus = JSON.parse(response.data.status);
              console.log("Received Response : ", receivedStatus);
              if (
                receivedStatus.Order_Status_Result.status === 0 &&
                (receivedStatus.Order_Status_Result.order_status ===
                  "Successful" ||
                  receivedStatus.Order_Status_Result.order_status === "Shipped")
              ) {
                console.log("success");
                resolve({
                  status: true,
                  data: receivedStatus.Order_Status_Result,
                  loc: "T",
                });
                await updateOrderStatus("success", orderNo);
              } else {
                resolve({
                  status: false,
                  data: data,
                  reason: "IF",
                  loc: "IF",
                });
                await updateOrderStatus("fail", orderNo);
              }
            })
            .catch((error) => {
              resolve({
                status: false,
                data: data,
                reason: error,
                loc: "IC",
              });
            });
        } catch (error) {
          resolve({
            status: false,
            data: data,
            reason: error,
            loc: "OC",
          });
        }
      });
    }
  );

function passTemplate(type, icon, msg, subMsg, id, amount, updatedWebsiteLink,orderNo) {
  let bg = '',
    font = ''
  if (type === 'Success') {
    bg = '#F8FAF5'
    font = '#88B04B'
  } else {
    bg = '#FFC6D2'
    font = '#DC0000'
  }
  let pageContentUrl = `'${updatedWebsiteLink}/user-order-history'`;
  let transactionMsg = `Transaction ID - ${id}<br/>Amount - ₹${amount}`;
  if (id === "wallet") {
    pageContentUrl = `'${updatedWebsiteLink}/user-wallet'`;
    transactionMsg = `Your wallet recharge ${type === 'Success' ? 'is successful' : 'Failed'}`;
  }
  const template = `<html>
<head>
  <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
  <script>
        setTimeout(()=>{
        window.open(${pageContentUrl}, '_self')
        }, 7000)
  </script>
</head>
  <style>
    body {
      text-align: center;
      padding: 40px 0;
      background: #EBF0F5;
    }
      h1 {
        color: ${ font };
        font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
        font-weight: 900;
        font-size: 40px;
        margin-bottom: 10px;
      }
      p {
        color: #404F5E;
        font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
        font-size:20px;
        margin: 0;
      }
    i {
      color: ${ font };
      font-size: 100px;
      line-height: 200px;
      margin-left:-15px;
    }
    .card {
      background: white;
      padding: 60px;
      border-radius: 4px;
      box-shadow: 0 2px 3px #C8D0D8;
      display: inline-block;
      margin: 0 auto;
    }
  </style>
  <body>
    <div class="card">
    <div style="border-radius:200px; height:200px; width:200px; background: ${ bg }; margin:0 auto;">
      <i class="checkmark">${ icon }</i>
    </div>
      <h1>${ type }</h1> 
      <p>${ msg }<br/>${ subMsg }</p><br/>
      <p>${ transactionMsg }</p>
      <p>Order No - ${ orderNo }</p>
      <p>You will be shortly redirected back to the app in 5 seconds...</p>
    </div>
  </body>
</html>`
  return template
}

//phonepe integration

function encodeRequest(payload) {
    return  Buffer.from(JSON.stringify(payload)).toString("base64");
  }
  
  function signRequest(payload) {
    return crypto
      .createHash("sha256")
      .update(payload.toString())
      .digest("hex");
  }

async function getPhonepeCheckoutUrl(data) {
    return new Promise(async (resolve, reject) => {
        const phonepeRef = await db.collection('payment').doc('phonepe').get();
        const envRef = await db.collection('settings').doc('environment').get();
        const cred = phonepeRef.data();
        const env = envRef.data();
        const payload = {
            merchantId: cred.merchantId,
            merchantTransactionId: data.orderDocId,
            amount: data.amount * 100,
            merchantUserId: data.userId,
            redirectUrl: data.mode === 'app' ? `https://us-central1-${projectId}.cloudfunctions.net/payments-phonepeResponseHandler`: env.websiteLink,
            redirectMode: "POST",
            callbackUrl: `https://us-central1-${projectId}.cloudfunctions.net/payments-phonepeResponseHandler`,
            paymentInstrument: {
                "type": "PAY_PAGE"
            }
          };
      
          const base64 = encodeRequest(payload);
          const sign = base64 + "/pg/v1/pay" + cred.merchantKey;
          const X_VERIFY = signRequest(sign) + "###" + cred.merchantIndex;
          const url = cred.production ? "https://api.phonepe.com/apis/hermes" : "https://api-preprod.phonepe.com/apis/pg-sandbox"
          try {
            const response = await axios.post(
                `${url}/pg/v1/pay`,
                {request: base64},
                {
                    headers: {
                        'X-VERIFY': X_VERIFY,
                        'accept': 'application/json',
                        'content-type': 'application/json'
                    }
                }
            )
            const data = response.data.data;
            console.log('data', data);
            if(response.data.success && data.instrumentResponse && data.instrumentResponse.redirectInfo && data.instrumentResponse.redirectInfo.url) {
                resolve(data.instrumentResponse.redirectInfo.url);
            } else {
                resolve('');
            }   
          } catch (error) {
            console.log('error', error);
            resolve('');
          }
    });
}

exports.getPhonepeCheckoutUrl = functions.https.onCall(async (data, context) => {
    const url = await getPhonepeCheckoutUrl(data);
    return url;
});

exports.phonepeResponseHandler = functions.https.onRequest(async (req, res) => {
    const body = req.body;
    console.log('body', body.code);
    if(!body || !body.code) {
        res.sendStatus(200);
        return;
    }
    if(body.code === "PAYMENT_SUCCESS") {
        await db.collection('orders').doc(body.transactionId).update({
            status: 'Confirmed',
            'payment.completed': true,
            'payment.status': 'completed',
            'payment.mode': 'phonepe',
            'payment.details': {providerReferenceId: body.providerReferenceId || ''},
        }, { merge: true })
    } else {
        await db.collection('orders').doc(body.transactionId).update({
            status: 'Pending',
            'payment.completed': false,
            'payment.status': 'failed',
            'payment.mode': 'phonepe',
            'payment.details': {providerReferenceId: body.providerReferenceId || ''},
        }, { merge: true })
    }
    res.sendStatus(200);
});


//caching variable
let ccAvenueCreds

const fetchCCavenueCreds = async () => {
    if (!ccAvenueCreds) {
        await new Promise(async (resolve) => {
            await db.doc('/Integrations/CCAvenue').onSnapshot((doc) => {
                if (doc && doc.data()) {
                    const {credentials,...otherData}=doc.data()
                    if(credentials){
                        ccAvenueCreds = {...otherData,...credentials}
                    }
                    console.log("fetched ccavenue creds")
                }
                resolve()
            })
        })
    }
    return ccAvenueCreds
}

const sendCCavenuePaymentStatus = async (order_no, reference_no,orderDocId) => {
    const nodeCCAvenue = require('node-ccavenue');
    let result = 0
    if(order_no&& reference_no){
        try {
            if (await fetchCCavenueCreds()) {
                const { merchantId, workingKey, accessCode, production,prodUrl ,testUrl} = ccAvenueCreds
                const ccav = new nodeCCAvenue.Configure({
                    merchant_id: merchantId,
                    working_key: workingKey
                });
                const log={}
                log.request=JSON.stringify({ reference_no, order_no })
                const enc_request = ccav.encrypt(JSON.stringify({ reference_no, order_no }))
                await axios.post(`${production?prodUrl:testUrl}?enc_request=${enc_request}&access_code=${accessCode}&command=orderStatusTracker&request_type=JSON&response_type=JSON&version=1.1`).then((res) => {
                    if (res.data.includes('status=0') && res.data.includes('enc_response=')) {
                        const encRes = res.data.split('enc_response=')[1]
                        const decRes = ccav.decrypt(encRes)
                        log.response=decRes
                        if (decRes && decRes.includes('"order_status":"Shipped"')) {
                            console.log("success")
                            result = 1
                        } else {
                            console.log("fail: ", decRes)
                            result = 2
                        }
                    } else {
                        console.log("error in refundApi : ", res.data)
                    }
                }).catch((error) => {
                    console.log("error : ", error)
                })
                await db.collection(`/orders/${orderDocId}/logs/`).add({text:'CCavenue Payment verification Log',log})
            } else {
                console.log("ccavenue creds are not availble")
            }
        } catch (error) {
            console.log("error in sendCCavenuePaymentStatus, error : ", error)
        }
    }else{
        console.log("sendCCavenuePaymentStatus missing info")
    }
    return result
}

// exports.ccAvenuePaymentStatus = functions.https.onCall(async(data)=>{
//     let res={status:false}
//     if(data){
//         const {order_no, reference_no}=data
//         if(order_no&& reference_no){
//             switch (await sendCCavenuePaymentStatus(order_no, reference_no)) {
//                 case 1:
//                     res.status=true
//                     break;
//                 case 2:
//                     res.status=false
//                     res.msg='payment is not successful'
//                     break;
//                 default:
//                     break;
//             }
//         }else{
//             res.error='insufficient info : order_no reference_no not available'
//         }
//     }else{
//         res.error='insufficient info'
//     }
//     return res
// })