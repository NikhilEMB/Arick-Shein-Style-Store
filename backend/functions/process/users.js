const functions = require("firebase-functions");
const request = require('request');
const {
    admin,
    db,
    bucket,
    WEB_API_KEY,
    referralLinkInfo,
    currencySymbol
} = require('./admin');


exports.blockOrBlockAndDeleteDataOfUser = functions.firestore.document("block/{userId}").onCreate(async (snap, context) => {
    const userId = context.params.userId;
    console.log('userId in blockUser', userId);
    const blockData = snap.data();
    console.log('blockData in blockUser', blockData);
    if (blockData.deleteData === false) {
        admin.auth().updateUser(userId, {
            disabled: true
        });
    } else {
        await db.collection('users').doc(userId).delete();

        const chatDoc = await db.collection('chats').doc(userId).collection('messages').get();
        chatDoc.forEach(async (doc) => {
            await db.collection('chats').doc(userId).collection('messages').doc(doc.id).delete();
        });
        await db.collection('chats').doc(userId).delete();
        bucket.deleteFiles({
            prefix: `chats/${userId}`
        });
        bucket.deleteFiles({
            prefix: `profile/${userId}`
        });
        admin.auth().deleteUser(userId)
            .then(function () {
                console.log('Successfully deleted user');
            })
            .catch(function (error) {
                console.log('Error deleting user:', error);
            });
        const userAnalyticsRef = db.collection('analytics').doc('users');
        await db.runTransaction(t => {
            return t.get(userAnalyticsRef)
                .then(async (doc) => {
                    let userAnalyticsData = doc.data();
                    if (userAnalyticsData.count > 0) {
                        t.update(userAnalyticsRef, {
                            count: userAnalyticsData.count - 1
                        });
                    } else {
                        t.update(userAnalyticsRef, {
                            count: 0
                        });
                    }
                });
        });
    }
});

exports.unblockUser = functions.firestore.document("block/{userId}").onDelete((snap, context) => {
    const userId = context.params.userId;
    console.log('userId in unblockUser', userId);
    admin.auth().updateUser(userId, {
        disabled: false
    });
});


exports.getUserOrders = functions.https.onCall(async (uid, context) => {
    let orders = [];
    const userRef = await db.collection('orders').where('userId', '==', uid).orderBy('createdAt', 'desc').get();
    userRef.forEach((doc) => {
        const id = doc.id;
        const data = doc.data();
        const order = {
            id,
            ...data
        };
        orders.push(order);
    });
    return (orders);
});

exports.checkUserExistenceByPhone = functions.https.onCall(async (phoneNo, context) => {
    console.log('phoneNo', phoneNo);
    const status = await checkUserExistence(phoneNo);
    console.log('status', status);
    return status;
});

async function checkUserExistence(phoneNo) {
    return new Promise(async (resolve, reject) => {
        let status = {
            isExist: false,
            mode: ''
        };
        const userRef = await db.collection('users').where('phoneNo', '==', phoneNo).get();
        userRef.forEach((doc) => {
            if (doc && doc.id && doc.data()) {
                status.isExist = true;
                status.mode = doc.data().loginMode;
            }
        });
        resolve(status);
    });
}

exports.makeUserIfNotCreated = functions.firestore.document("users/{userId}/addresses/{addressId}").onCreate(async (snap, context) => {
    const address = snap.data();
    const userId = context.params.userId;
    const addressId = context.params.addressId;
    const userRef = await db.collection('users').doc(userId).get();
    const user = userRef.data();
    if (!user || user === undefined || !user.hasOwnProperty('name')) {
        const storeRef = await db.collection('settings').doc('store').get();
        const welcomeMsg = storeRef && storeRef.data() && storeRef.data().welcomeMsg ? storeRef.data().welcomeMsg : 'Welcome to the app.';
        const phoneNo = await getAuthData(userId);
        if (!phoneNo || phoneNo === '') {
            phoneNo = address && address.phoneNo ? address.phoneNo : '';
        }
        const name = address && address.name ? address.name : 'user';
        const defaultAddress = address ? {
            id: addressId,
            ...address
        } : null;
        const user = {
            name: name,
            email: '',
            phoneNo: phoneNo ? phoneNo : '',
            createdAt: new Date(),
            lastAccessAt: new Date(),
            active: true,
            role: 'user',
            dP: 'assets/img/user-pic.gif',
            readTerms: false,
            wallet: {
                balance: 0,
                cashback: 0,
                lastTransactions: {}
            },
            paymentInfo: null,
            defaultAddress: defaultAddress
        }
        const chat = {
            type: 'txt',
            createdAt: new Date(),
            isRead: false,
            author: 'admin',
            published: true,
            message: welcomeMsg,
            images: null,
            mob: null,
            thumb: null,
            imageCount: null
        }
        await db.collection('users').doc(userId).set(user);
        await db.collection('chats').doc(userId).set({
            lastMessage: welcomeMsg,
            lastMessageAt: new Date(),
            totalMsgs: 1,
            name: name,
            adminActive: false,
            unreadMsgs: 0,
            userActive: false,
            unreadAdminMsgs: 1,
            userPhoneNo: phoneNo ? phoneNo : ''
        });
        await db.collection('chats').doc(userId).collection('messages').add(chat);
    }
});

async function getAuthData(uid) {
    return new Promise(async (resolve, reject) => {
        admin.auth().getUser(uid)
            .then(function (userRecord) {
                console.log('Successfully fetched user data:', userRecord.toJSON().phoneNumber);
                resolve(userRecord.toJSON().phoneNumber);
            })
            .catch(function (error) {
                console.log('Error fetching user data:', error);
            });
    })
}

exports.referralProcess = functions.firestore
    .document('users/{userId}').onCreate(async (snap, context) => {
        const userData = snap.data();
        const userId = context.params.userId;
        const name = userData.name;
        const phone = userData.phoneNo;
        const referralLink = await getReferralLink(userId);
        await db.collection('users').doc(userId).update({
            referralLink: referralLink
        });
        if(userData.hasOwnProperty('referrer')) {
            const referrerUserId = userData.referrer.userId;
            const referrerDocRef = await db.collection('users').doc(referrerUserId).get();
            const referrerData = referrerDocRef.data();
            const referralSettingsRef = await db.collection('settings').doc('referral').get();
            const referralSettings = referralSettingsRef.data();
            const referrerCashback = referralSettings.referrerCashback ? referralSettings.referrerCashback : 0;
            const friendCashback = referralSettings.friendCashback ? referralSettings.friendCashback : 0;
            const referrerCashbackType = 'referrerCashbackType' in referralSettings ? referralSettings.referrerCashbackType : 'flat';
            const referrerCashbackPercent = 'referrerCashbackPercent' in referralSettings ? referralSettings.referrerCashbackPercent : 0;
            await db.collection('users').doc(userId).update({
                referrer: {
                    userId: referrerUserId,
                    name: referrerData.name ? referrerData.name : 'user',
                    phone: referrerData.phoneNo ? referrerData.phoneNo : '',
                    referrerCashback: referrerCashback,
                    friendCashback: friendCashback,
                    date: new Date(),
                    cashbacksLeft: referralSettings.cashbackCount || 1,
                    referrerCashbackType,
                    referrerCashbackPercent
                }
            });
            const friendMsg = `Cashback for referred by ${referrerData.name}`;
            await addReferralCashbackToUserWallet(userId, friendCashback, friendMsg);
            let friendChatData = {
                msg: `You have successfully registered using your friend (${referrerData.name}, ${referrerData.phoneNo}) referral link. We have added ${currencySymbol}${friendCashback} as cashback amount to your wallet.`,
                uid: userId,
                author: 'admin'
            }
            await walletChatMsg(friendChatData);
        }
    });

async function getReferralLink(uid) {
    return new Promise(async (resolve, reject) => {
        const body = {
            'dynamicLinkInfo': {
                'domainUriPrefix': referralLinkInfo.domainUriPrefix,
                'link': `${referralLinkInfo.deepLinkURL}/${uid}/`,
                "androidInfo": {
                    "androidPackageName": referralLinkInfo.androidPackageName
                },
                "iosInfo": {
                    "iosBundleId": referralLinkInfo.iosBundleId
                }
            }
        }
        request({
            url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${WEB_API_KEY}`,
            method: 'POST',
            json: true,
            body
        }, async function (error, response) {
            if (error) {
                console.log('Error :', error)
            } else {
                if (response && response.statusCode !== 200) {
                    console.log('Error on Request :', response.body.error.message)
                } else {
                    console.log('Dynamic Link :', response.body);
                    const referralLink = response.body.shortLink;
                    resolve(referralLink);
                }
            }
        });
    })

}

async function addReferralCashbackToUserWallet(uid, cashbackAmnt, cashBackMsg) {
    return new Promise(async (resolve, reject) => {
        const userRef = db.collection('users').doc(uid);
        await db.runTransaction(t => {
            return t.get(userRef).then(async (doc) => {
                if(doc && doc.data()) {
                    let userData = doc.data();
                    let userWallet = userData.wallet;
                    let updatedAmnt = userWallet && userWallet.cashback ? userWallet.cashback + cashbackAmnt : cashbackAmnt;
                    let transaction = {
                        amount: cashbackAmnt,
                        message: cashBackMsg,
                        createdAt: new Date(),
                        type: 'credit'
                    };
                    t.update(userRef, {
                        "wallet.cashback": updatedAmnt,
                        "wallet.lastTransactions": transaction
                    });
                    await db.collection('users').doc(uid).collection('walletTransactions').add(transaction);
                    resolve(true);
                } else {
                    resolve(true);
                }
            });
        });
    });
}

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
exports.addUserByAdmin = functions.https.onCall(async (details, context) => {
    let userDetails={
        phoneNumber: details.phoneNumber,
        displayName: details.name,
    };
    try {
        const user = await admin.auth().createUser(userDetails);
        await db.collection('usersByAdmin').doc(user.uid).set(userDetails);
        return {
            status: 'success'
        };
    } catch (error) {
        return {
            status: 'error'
        };
    }

});

exports.onUpdateUser = functions.firestore.document('users/{userId}').onUpdate(async (change, context) => {
    const userId = context.params.userId;
    const before = change.before.data();
    const after = change.after.data();
    if((before.dP !== after.dP) && after.dP.includes('assets/')) {
        try {
            return bucket.deleteFiles({
                prefix: `profile/${userId}`
            });
        } catch (error) {
            console.log(error);
        }
    }
});

exports.generateReferralLinkForSingleUser = functions.https.onCall(async (userId, context) => {
    try {
        const referralLink = await getReferralLink(userId);
        await db.collection('users').doc(userId).update({
            referralLink: referralLink
        });
        return {
            status: true,
            referralLink
        }
    } catch (error) {
        console.log(error);
        return {
            status: false
        }
    }
});