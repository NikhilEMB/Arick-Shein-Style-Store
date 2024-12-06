const functions = require("firebase-functions");

const {
    db
} = require('./admin');

async function isUserCreatedByAdmin(uid) {
    return new Promise((resolve, reject) => {
        const ref = db.collection('usersByAdmin').doc(uid)
        ref.get().then(async doc => {
            if(doc.exists) {
                console.log('uer created by Admin', uid);
                resolve(true);
            }
            resolve(false);
        });
    });
}


exports.createUser = functions.auth.user().onCreate(async (user) => {
    const uid = user.uid;
    const name = user.displayName ? user.displayName : 'user';
    const lowercaseName = user.displayName ? user.displayName.toLowerCase() : 'user';
    const email = user.email ? user.email : '';
    const phoneNo = user.phoneNumber ? user.phoneNumber : '';
    const storeRef = await db.collection('settings').doc('store').get();
    const welcomeMsg = storeRef && storeRef.data() && storeRef.data().welcomeMsg ? storeRef.data().welcomeMsg : 'Welcome to the app.';
    setTimeout(async () => {
        const userRef = await db.collection('users').doc(uid).get();
        const userData = userRef.data();
        if (!userData || userData === undefined || !userData.hasOwnProperty('name')) {
            const isAdminUser = await isUserCreatedByAdmin(uid);
            let loginMode = '';
            const providerId = user.providerData[0].providerId;
            if (providerId === 'phone') {
                loginMode = 'otp';
            } else if (providerId === 'google.com') {
                loginMode = 'google';
            } else if (providerId === 'facebook.com') {
                loginMode = 'facebook';
            } else {
                loginMode = 'otp';
            }
            const userObj = {
                name: name,
                lowercaseName: lowercaseName,
                email: email,
                phoneNo: phoneNo,
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
                defaultAddress: null,
                loginMode: loginMode,
                setFromUI: isAdminUser ? true : false,
            }
            await db.collection('users').doc(uid).set(userObj);
        }
    }, 3000);


    const chatObj = {
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

    await db.collection('chats').doc(uid).set({
        lastMessage: welcomeMsg,
        lastMessageAt: new Date(),
        totalMsgs: 1,
        name: name,
        adminActive: false,
        unreadMsgs: 0,
        userActive: false,
        unreadAdminMsgs: 1,
        userPhoneNo: phoneNo
    }, { merge: true });
    await db.collection('chats').doc(uid).collection('messages').add(chatObj);
    
    // await db.collection('usersByAdmin').doc(uid).delete();
});