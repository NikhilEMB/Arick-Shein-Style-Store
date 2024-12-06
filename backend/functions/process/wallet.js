const functions = require("firebase-functions");
const {
    db,
    orderIdPrefix,
    currencySymbol
} = require('./admin');

var request = require('request');

var globalFile = require('./global');



exports.addAmountToUsersByAdmin = functions.https.onCall(async (data, context) => {
    console.log('data', data);
    const amount = data.amount;
    const storeName = data.storeName;
    let users = [];
    const usersDocs = await db.collection('users').where('role', '==', 'user').where('active', '==', true).get();
    usersDocs.forEach((doc) => {
        if (doc && doc.id && doc.data()) {
            let userId = doc.id;
            users.push({uid:userId,user:doc.data()});
        }
    });
    for (var i = 0; i < users.length; i++) {
        try {
                let userData = users[i]['user'];
                let uid = users[i]['uid'];
                let userWallet = userData.wallet;
                let updatedAmnt = userWallet ? userWallet.balance + amount : amount;
                let transaction = {
                    amount: amount,
                    message: `Credited by ${storeName}`,
                    createdAt: new Date(),
                    type: 'credit'
                };
                await db.collection('users').doc(uid).update({
                    wallet: {
                        balance: updatedAmnt,
                        cashback: userWallet && userWallet.cashback ? userWallet.cashback : 0,
                        lastTransactions: transaction
                    }
                });
                await db.collection('users').doc(uid).collection('walletTransactions').add(transaction);
                let chatData = {
                    msg: `${storeName} has credited ${currencySymbol}${amount} to your wallet.`,
                    uid: uid,
                    author: 'admin'
                }
                await walletChatMsg(chatData);
        } catch (error) {
            console.log(error);
        }

    }
    return null;

});

exports.addAmountToUsers = functions.firestore.document('settings/wallet/transactions/{transactionId}').onCreate(async (snap, context) => {

    let data = snap.data();
    const amount = data.amount;
    const storeName = data.storeName;
    let users = [];
    const usersDocs = await db.collection('users').where('role', '==', 'user').where('active', '==', true).get();
    usersDocs.forEach((doc) => {
        if (doc && doc.id && doc.data()) {
            let userId = doc.id;
            users.push({uid:userId,user:doc.data()});
        }
    });
    for (var i = 0; i < users.length; i++) {
        try {
                let userData = users[i]['user'];
                let uid = users[i]['uid'];
                console.log("Adding money for user:"+uid);
                let userWallet = userData.wallet;
                let updatedAmnt = userWallet ? userWallet.balance + amount : amount;
                let transaction = {
                    amount: amount,
                    message: `Credited by ${storeName}`,
                    createdAt: new Date(),
                    type: 'credit'
                };
                await db.collection('users').doc(uid).update({
                    wallet: {
                        balance: updatedAmnt,
                        cashback: userWallet && userWallet.cashback ? userWallet.cashback : 0,
                        lastTransactions: transaction
                    }
                });
                await db.collection('users').doc(uid).collection('walletTransactions').add(transaction);
                let chatData = {
                    msg: `${storeName} has credited ${currencySymbol}${amount} to your wallet.`,
                    uid: uid,
                    author: 'admin'
                }
                await walletChatMsg(chatData);
                console.log("Added money for user:"+uid);
        } catch (error) {
            console.log(error);
        }

    }
    return null;
  });

exports.addMoneyToSingleUserWallet = functions.https.onCall(async (data, context) => {

    const response = await globalFile.addToUserWallet(data);
    if(response.status) {
        return {status: true}
    } else {
        return {status: false}
    }

});

exports.chargeUser = functions.https.onCall(async (data, context) => {
    try {
        const walletTxnData = {
            amount: data.amount,
            uid: data.uid,
            txnMsg: `Debited by ${data.storeName} from ${data.type || 'cashback'}`,
            chatMsg: data.reason || `Debited by ${data.storeName} from ${data.type || 'cashback'}`,
            type: data.type || 'cashback',
            reason: data.message || ''
        }
        const status = await globalFile.debitFromUserWallet(walletTxnData);
        return {status}
    } catch (error) {
        console.log(error);
        return {
            status: false
        }
    }

});

async function walletChatMsg(data) {
    return new Promise(async (resolve, reject) => {
        const chatRef = db.collection('chats').doc(data.uid);
        const chatMessageRef = await db.collection('chats').doc(data.uid).get();
        const chatData = chatMessageRef.data();
        let activeStatus = chatData.adminActive;

        if (data.author === 'admin') {
            activeStatus = chatData.userActive;
        }
        if (activeStatus === false) {
            await chatRef.update({
                lastMessage: data.msg,
                lastMessageAt: new Date(),
                totalMsgs: chatData.totalMsgs + 1,
                unreadAdminMsgs: chatData.unreadAdminMsgs + 1
            });
            await db.collection('chats').doc(data.uid).collection('messages').add({
                type: 'txt',
                createdAt: new Date(),
                author: data.author,
                isRead: false,
                published: true,
                message: data.msg
            });
            resolve(true);
        } else {
            await chatRef.update({
                lastMessage: data.msg,
                lastMessageAt: new Date(),
                totalMsgs: chatData.totalMsgs + 1
            });

            await db.collection('chats').doc(data.uid).collection('messages').add({
                type: 'txt',
                createdAt: new Date(),
                author: data.author,
                isRead: true,
                published: true,
                message: data.msg
            });
            resolve(true);
        }
    });

}


exports.addMoneyToWalletByUser = functions.https.onCall(async (data, context) => {
    console.log('data', data);
    const mode = data.mode;
    const txnDetails = data.txnDetails;
    const amount = data.amount;
    if (mode === 'razorpay') {
        let paymentId = txnDetails.paymentId;
        if (paymentId && paymentId.hasOwnProperty('razorpay_payment_id')) {
            paymentId =  paymentId['razorpay_payment_id'];
        }
        await walletPaymentCaptured(data);
        return {
            status: 'success'
        };
        // let captureRes = await captureWalletPayment(paymentId, amount);
        // if (captureRes.statusCode && captureRes.statusCode === 200) {
        //     await walletPaymentCaptured(data);
        //     return {
        //         status: 'success'
        //     };
        // } else {
        //     await walletPaymentNotCaptured(data);
        //     return {
        //         status: 'failed'
        //     };
        // }
    } else {
        await walletPaymentCaptured(data);
        return {
            status: 'success'
        };
    }
});

async function walletPaymentCaptured(data) {
    const uid = data.uid;
    const mode = data.mode;
    const txnDetails = data.txnDetails;
    const amount = data.amount;
    const balance = data.balance;
    const txnId = data.txnId;
    let transaction = {
        amount: amount,
        message: 'Wallet Refill',
        createdAt: new Date(),
        type: 'credit'
    };
    const userRef = await db.collection('users').doc(uid).get();
    let userData = userRef.data();
    let userWallet = userData.wallet;
    return new Promise(async (resolve, reject) => {
        await db.collection('users').doc(uid).update({
            wallet: {
                balance: amount + balance,
                cashback: userWallet && userWallet.cashback ? userWallet.cashback : 0, 
                lastTransactions: transaction
            }
        });
        await db.collection('users').doc(uid).collection('walletTransactions').doc(txnId).set(transaction);
        let chatData = {
            msg: `I have added ${currencySymbol}${amount} to my wallet.`,
            uid: uid,
            author: 'user'
        }
        await walletChatMsg(chatData);

        const paymnetHistory = {
            paidAt: new Date(),
            transactionId: txnId,
            userId: uid,
            mode: mode,
            details: txnDetails,
            orderAmount: amount,
            status: 'successful',
            type: 'wallet'
        }
        await db.collection('payment').doc('history').collection('payments').add(paymnetHistory);
        resolve(true);
    })

}

async function walletPaymentNotCaptured(data) {
    const uid = data.uid;
    const mode = data.mode;
    const txnDetails = data.txnDetails;
    const amount = data.amount;
    const balance = data.balance;
    const txnId = data.txnId;
    let transaction = {
        amount: amount,
        message: 'Wallet Refill Failed',
        createdAt: new Date(),
        type: 'credit'
    };
    const userRef = await db.collection('users').doc(uid).get();
    let userData = userRef.data();
    let userWallet = userData.wallet;
    return new Promise(async (resolve, reject) => {
        await db.collection('users').doc(uid).update({
            wallet: {
                balance: balance,
                cashback: userWallet && userWallet.cashback ? userWallet.cashback : 0, 
                lastTransactions: transaction
            }
        });
        await db.collection('users').doc(uid).collection('walletTransactions').doc(txnId).set(transaction);

        const paymnetHistory = {
            paidAt: new Date(),
            transactionId: txnId,
            userId: uid,
            mode: mode,
            details: txnDetails,
            orderAmount: amount,
            status: 'failed',
            type: 'wallet'
        }
        await db.collection('payment').doc('history').collection('payments').add(paymnetHistory);
        resolve(true);
    })

}

async function captureWalletPayment(pid, amount) {
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

exports.orderPaymentWithWallet = functions.https.onCall(async (data, context) => {
    if(!data) {
        await globalFile.dummyCallToRemoveColdStart();
        return true;
    }
    try {
        data['payment'] = {
            completed: true,
            mode: 'wallet',
            status: 'completed'
        }
        data['status'] = 'Confirmed';
        const uid = data.userId;
        const walletAmnt = data.walletAmount;
        const cashbackAmnt = data.cashbackAmount || 0;
        const userRef = await db.collection('users').doc(uid).get();
        let transaction = {
            amount: walletAmnt + cashbackAmnt,
            message: `Paid for Order`,
            createdAt: new Date(),
            type: 'debit',
            orderId: ''
        };
        let userData = userRef.data();
        let userWallet = userData.wallet;
        
        if(!data.hasOwnProperty('createdAt')){
            data['createdAt'] = new Date()
        }
        if(data.orderDocId && data.orderDocId !== undefined){
                    await db.collection('orders').doc(data.orderDocId).update({payment: data['payment'], status: data['status']});
                   
                    transaction['orderId'] = data.orderDocId;
        }
        else{
            const orderRef = await db.collection('orders').add(data);
            transaction['orderId'] = orderRef.id;
        }

        await db.collection('users').doc(uid).update({
            wallet: {
                balance: userWallet.balance >= walletAmnt ? userWallet.balance - walletAmnt : 0,
                cashback: userWallet && userWallet.cashback ? ((userWallet.cashback - cashbackAmnt) > 0 ? userWallet.cashback - cashbackAmnt : 0) : 0,
                lastTransactions: transaction
            }
        });

        await db.collection('orders').doc(transaction.orderId).update({
            'metaData.walletDeducted': true
        });

        await db.collection('users').doc(uid).collection('walletTransactions').add(transaction);

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


exports.newUserWalletAmnt = functions.firestore.document("users/{userId}").onCreate(async (snap, context) => {
    const userId = context.params.userId;
    let storeName = 'Admin';
    const storeData = await db.collection('settings').doc('store').get();
    if (storeData && storeData.data() && storeData.data().storeName) {
        storeName = storeData.data().storeName;
    }
    const walletSettings = await db.collection('settings').doc('wallet').get();
    if (walletSettings && walletSettings.data()) {
        const active = walletSettings.data().active;
        const newUserWalletAmnt = walletSettings.data().newUserWalletAmnt;
        if (active && newUserWalletAmnt) {
            const userRef = db.collection('users').doc(userId)
            await db.runTransaction(t => {
                return t.get(userRef).then(async (doc) => {
                    if(doc && doc.data()) {
                        const user = doc.data();
                        const userWallet = user.wallet;
                        let transaction = {
                            amount: newUserWalletAmnt,
                            message: `Credited by ${storeName}`,
                            createdAt: new Date(),
                            type: 'credit'
                        };
                        t.update(userRef, {
                            "wallet.cashback": userWallet && userWallet.cashback ? (userWallet.cashback + newUserWalletAmnt) : newUserWalletAmnt,
                            "wallet.lastTransactions": transaction
                        });
                        await db.collection('users').doc(userId).collection('walletTransactions').add(transaction);
                        let chatData = {
                            msg: `${storeName} has credited ${currencySymbol}${newUserWalletAmnt} to your wallet as cashback amount.`,
                            uid: userId,
                            author: 'admin'
                        }
                        await walletChatMsg(chatData);
                    }
                });
            });
        }
    }
});

exports.cashbackApi = functions.firestore.document("orders/{orderId}").onUpdate(async (change, context) => {
    const oldOrder = change.before.data();
    const orderData = change.after.data();
    const orderDocId = context.params.orderId;
    const status = orderData.status;
    const userId = orderData.userId;
    const oid = orderData.orderId;
    const paidAmnt = orderData.totalAmountToPaid;
    if ((status === 'Delivered') && (oldOrder.status !== 'Delivered')) {
        const cashbackRef = await db.collection('settings').doc('wallet').collection('cashbacks')
            .where('orderAmount', '<=', paidAmnt)
            .orderBy('orderAmount', 'desc').limit(1).get();
        cashbackRef.forEach(async (doc) => {
            if (doc.id && doc.data()) {
                const cashbackAmnt = doc.data().cashback;
                const perUser = doc.data().perUser;
                let totalUsages = [];
                const usage = await db.collection('settings').doc('wallet').collection('cashbacks').doc(doc.id).collection('usage').where('userId', '==', userId).get();
                if (usage) {
                    usage.forEach((usageDoc) => {
                        if (usageDoc && usageDoc.id) {
                            totalUsages.push(usageDoc.id);
                        }
                    })
                }
                if (totalUsages.length < perUser) {
                    await addCashbackToUserWallet(userId, cashbackAmnt, oid, orderDocId);
                    const usageRef = await db.collection('settings').doc('wallet').collection('cashbacks').doc(doc.id).collection('usage').add({
                        createdAt: new Date(),
                        userId: userId,
                        orderId: orderDocId
                    });
                    await db.collection('orders').doc(orderDocId).update({
                        cashback: {
                            amount: cashbackAmnt,
                            cashbackId: doc.id,
                            usageId: usageRef.id,
                            orderAmount: doc.data().orderAmount
                        }
                    });
                }
            }
        })

        if (orderData.hasOwnProperty('referrer')) {
            const referrerData = orderData.referrer;
            const userRef = db.collection('users').doc(userId);
            await db.runTransaction(t => {
                return t.get(userRef).then(async (doc) => {
                    if (doc && doc.data()) {
                        const user = doc.data();
                        const cashbacksLeft = user.referrer.cashbacksLeft;
                        if (cashbacksLeft >= 1) {
                            const referrerMsg = `Cashback for referring ${referrerData.friendName}`;
                            let cashbackAmount = 0;
                            const referrerCashbackType = 'referrerCashbackType' in referrerData ? referrerData.referrerCashbackType : 'flat';
                            const referrerCashbackPercent = 'referrerCashbackPercent' in referrerData ? referrerData.referrerCashbackPercent : 0;
                            if(referrerCashbackType === 'flat') {
                                cashbackAmount = referrerData.referrerCashback
                            } else {
                                cashbackAmount = orderData.totalAmountToPaid * (referrerCashbackPercent / 100);
                            }
                            await addReferralCashbackToUserWallet(referrerData.userId, cashbackAmount, referrerMsg);
                            let referrerChatData = {
                                msg: `Your friend (${referrerData.friendName}, ${referrerData.friendPhone}) successfully registered on our app using your referral link and placed the order. We have added ${currencySymbol}${cashbackAmount} as cashback amount to your wallet.`,
                                uid: referrerData.userId,
                                author: 'admin'
                            }
                            await walletChatMsg(referrerChatData);

                            t.update(userRef, {
                                "referrer.cashbacksLeft": cashbacksLeft - 1
                            });
                        }
                    }
                })
            })
        }
    }
});

async function addReferralCashbackToUserWallet(uid, cashbackAmnt, cashBackMsg) {
    return new Promise(async (resolve, reject) => {
        const userRef = await db.collection('users').doc(uid).get();
        try {
            let userData = userRef.data();
            let userWallet = userData.wallet;
            let updatedAmnt = userWallet && userWallet.cashback ? userWallet.cashback + cashbackAmnt : cashbackAmnt;
            let transaction = {
                amount: cashbackAmnt,
                message: cashBackMsg,
                createdAt: new Date(),
                type: 'credit'
            };
            await db.collection('users').doc(uid).update({
                wallet: {
                    cashback: updatedAmnt,
                    lastTransactions: transaction,
                    balance: userWallet && userWallet.balance ? userWallet.balance : 0,
                }
            });
            await db.collection('users').doc(uid).collection('walletTransactions').add(transaction);
            resolve(true);
        } catch (error) {
            console.log(error);
        }
    })
}

async function addCashbackToUserWallet(uid, cashbackAmnt, oid, orderDocId) {
    return new Promise(async (resolve, reject) => {
        const userRef = await db.collection('users').doc(uid).get();
        let storeName = 'Admin';
        const storeData = await db.collection('settings').doc('store').get();
        if (storeData && storeData.data() && storeData.data().storeName) {
            storeName = storeData.data().storeName;
        }
        try {
            let userData = userRef.data();
            let userWallet = userData.wallet;
            let updatedAmnt = userWallet && userWallet.cashback ? userWallet.cashback + cashbackAmnt : cashbackAmnt;
            let transaction = {
                amount: cashbackAmnt,
                message: `Cashback Received For ${orderIdPrefix + oid}`,
                createdAt: new Date(),
                type: 'credit',
                orderId: orderDocId
            };
            await db.collection('users').doc(uid).update({
                wallet: {
                    cashback: updatedAmnt,
                    lastTransactions: transaction,
                    balance: userWallet && userWallet.balance ? userWallet.balance : 0,
                }
            });
            await db.collection('users').doc(uid).collection('walletTransactions').add(transaction);
            let chatData = {
                msg: `${storeName} has credited ${currencySymbol}${cashbackAmnt} to your wallet as a cashback amount.`,
                uid: uid,
                author: 'admin'
            }
            await walletChatMsg(chatData);
            resolve(true);
        } catch (error) {
            console.log(error);
        }
    })
}
