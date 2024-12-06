const functions = require("firebase-functions");
var moment = require('moment-timezone');
var globalFile = require('./global');

const {
    db,
    timeZone
} = require('./admin');

exports.scheduledAbandonedCart = functions.runWith({ memory: '1GB', timeoutSeconds: 540 }).pubsub.schedule('0 10 * * *').timeZone(timeZone).onRun(async (context) => {
    let todaysDay = moment().tz(timeZone).day();
    if (todaysDay == 3 || todaysDay == 5 || todaysDay == 7) {
        const users = await db.collection('users').where('role', '==', 'user').where('active', '==', true).get();
        const usersArr = [];
        users.forEach(async (user) => {
            if (user && user.id) {
                usersArr.push(user.id);
            }
        });
        for (let index = 0; index < usersArr.length; index++) {
            try {
                let cart = await db.collection('users').doc(usersArr[index]).collection('cart').get();
                if (cart && cart.size > 0) {
                    console.log('length:', cart.size);
                    const chatData = {
                        message: `You have ${cart.size} items in your cart. Place order now.`,
                        title: 'Looks Like You Forgot Something!',
                        author: 'admin',
                        type: 'link',
                        btns: [
                            {
                                txt: 'View Cart',
                                task: 'cartView'
                            },
                        ]
                    };
                    const chatObj = await db.collection('chats').doc(usersArr[index]).get();
                    if (chatObj && chatObj.data()) {
                        await globalFile.chatMessage(chatData, usersArr[index]);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
});


exports.scheduledWishlist = functions.runWith({ memory: '1GB', timeoutSeconds: 540 }).pubsub.schedule('0 11 * * *').timeZone(timeZone).onRun(async (context) => {
    let env = await db.collection('settings').doc('environment').get();
    let msgDay = env.data().wishlistMsgDay ? env.data().wishlistMsgDay : 7;
    let todaysDay = moment().tz(timeZone).day();
    if (todaysDay == msgDay) {
        const users = await db.collection('users').where('role', '==', 'user').where('active', '==', true).get();
        const usersArr = [];
        users.forEach(async (user) => {
            if (user && user.id) {
                usersArr.push(user.id);
            }
        });
        for (const user of usersArr) {
            try {
                let wishlist = await db.collection('users').doc(user).collection('wishlist').get();
                if (wishlist && wishlist.size > 0) {
                    console.log('length:', wishlist.size);
                    const chatData = {
                        message: `You have ${wishlist.size} items in your Wishlist. Place order now, Limited stock available.`,
                        title: `It's Now or Never!`,
                        author: 'admin',
                        type: 'link',
                        btns: [
                            {
                                txt: 'View Wishlist',
                                task: 'wishlistView'
                            },
                        ]
                    };
                    const chatObj = await db.collection('chats').doc(user).get();
                    if (chatObj && chatObj.data()) {
                        await globalFile.chatMessage(chatData, user);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
});


// Vendor Timings
exports.scheduledCheckForVendor = functions.runWith({ memory: '1GB', timeoutSeconds: 540 })
.pubsub.schedule('0,30 0-23 * * *').timeZone(timeZone).onRun(async (context) => {
    const allVendorSnapshots = await db.collection('features').doc('multiVendor').collection('vendors').get();
    let vendors = [];
    allVendorSnapshots.forEach(async (doc) => {
        vendors.push({id: doc.id, ...doc.data()});
    });
    for (const vendor of vendors) {
        if (vendor.active && vendor.shopTime && vendor.shopTime.active) {
            let currentTime = moment().tz(timeZone).format('HH:mm');
            if (currentTime == vendor.shopTime.start) {
                await db.collection('features').doc('multiVendor').collection('vendors').doc(vendor.id).update({activeByVendor: true});
            }
            else if (currentTime == vendor.shopTime.end) {
                await db.collection('features').doc('multiVendor').collection('vendors').doc(vendor.id).update({activeByVendor: false});
            }
        }
    }
});

// Birthday wishes - run everyday at 10am - 0 10 * * *
exports.scheduledBirthdayWish = functions.runWith({ memory: '1GB', timeoutSeconds: 540 }).pubsub.schedule('0 10 * * *').timeZone(timeZone).onRun(async (context) => {
    const users = await db.collection('users').where('role', '==', 'user').where('active', '==', true).get();
    let usersArr = [];
    users.forEach(async (user) => {
        if (user && user.id) {
            usersArr.push({id: user.id, ...user.data()});
        }
    });
    for (const user of usersArr) {
        if (user.birthday && user.birthday.length) {
            let todaysDate = moment().tz(timeZone).format("DD");
            let todaysMonth = moment().tz(timeZone).format("MMMM");
            let userBirthDate = moment(user.birthday).tz(timeZone).format("DD");
            let userBirthDay = moment(user.birthday).tz(timeZone).format("MMMM");
            if (userBirthDate == todaysDate && userBirthDay == todaysMonth) {
                const chatData = {
                    message: `We hope that your day is filled with love, laughter and joy. Enjoy your special day.`,
                    title: `Happy Birthday! ${user.name}`,
                    author: 'admin',
                    type: 'txt',
                };
                const chatObj = await db.collection('chats').doc(user.id).get();
                if (chatObj && chatObj.data()) {
                    await globalFile.chatMessage(chatData, user.id);
                }
                
            }
            
        }
    }
});