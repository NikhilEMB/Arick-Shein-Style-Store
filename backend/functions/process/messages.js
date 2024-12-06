const functions = require('firebase-functions');
const { admin, db, adminName, orderIdPrefix, timeZone } = require('./admin');
var globalFile = require('./global');
var moment = require('moment-timezone');

function preparePayload(link, title, notifMessage, notifImg){
    let payload = {
        token: '',
        notification: {
            title: title,
            body: notifMessage ? notifMessage : '',
            image: notifImg ? notifImg : '',
        },
        "android": {
            "notification": {
                "sound": "default",
                "click_action" : "FCM_PLUGIN_ACTIVITY",
            },
            "priority":"high"
        },
        "apns": {
            "payload": {
                "aps": {
                    "sound": "default",
                    "click_action" : "FCM_PLUGIN_ACTIVITY",
                }
            },
            "headers":{
                "apns-priority":"10"
            }
        },
        "data": {
            "link": JSON.stringify(link)
        },
    };
    return payload;
}

async function sendNotification(receiverTokens, payload) {
    if (receiverTokens && receiverTokens.length > 0) {
        for (const token of receiverTokens) {
            payload.token = token;
            try {
                await admin.messaging().send(payload);
            } catch (error) {
                console.log(error);
            }
        }
    }
}

// For sending new chat msg or new broadcast msg to single user
exports.onCreateMessage = functions.runWith({ timeoutSeconds: 120 }).firestore
    .document('chats/{userId}/messages/{messageId}').onCreate(async (snap, context) => {
        const userId = context.params.userId;
        const messageId = context.params.messageId;
        const message = snap.data();    
        const userDoc = await db.collection('users').doc(userId).get();
        const user = userDoc.data();
        let sender = {
            name: ''
        };
        let receiverTokens = [];
        if (message.author && message.author == 'user') {
            sender = {
                name: user.name
            };
            const adminDocs = await db.collection('users').where('role', '==', 'admin').get();
            adminDocs.forEach((doc) => {
                if (doc && doc.id && doc.data()) {
                    let admin = doc.data();
                    if (admin.deviceTokens && admin.deviceTokens.length > 0) {
                        admin.deviceTokens.forEach(token => {
                            receiverTokens.push(token);
                        });
                    }
                }
            });
        } else {
            sender = {
                name: adminName
            };
            if (user.deviceTokens && user.deviceTokens.length > 0) {
                user.deviceTokens.forEach(token => {
                    receiverTokens.push(token);
                });
            }
        }
        let orderId = '';
        if (message.type === 'order') {
            orderId = `${orderIdPrefix}${message.orderId}`;
            const managersList = await db.collection('features').doc('managers').collection('managersList').orderBy("permissions", "asc").get();
            const managerDocs = await db.collection('users').where('role', '==', 'manager').get();
            managerDocs.forEach(async(doc) => {
                if (doc && doc.id && doc.data()) {
                    let manager = doc.data();
                    managersList.forEach((managerListDoc)=> {
                        if (managerListDoc.id === doc.id) {
                            if (managerListDoc.data() && managerListDoc.data().permissions.length && managerListDoc.data().permissions.includes("admin-orders")) {
                                if (manager.deviceTokens && manager.deviceTokens.length > 0) {
                                    manager.deviceTokens.forEach(token => {
                                        receiverTokens.push(token);
                                    });
                                }
                            }
                        }
                    })
                }
            });
        }
        let link = {
            id: [],
            name: '',
            type: 'None'
        };
        let title = '';
        let notifMessage;
        let notifImg;
        if (message.type === 'txt') {
            title = 'New Message from ' + sender.name;
            notifMessage = message.message && message.message.length > 240 ? message.message.substring(0, 237) + '...' : message.message;
        } 
        else if(message.type === 'link'){
            title = message.title ? message.title : '';
            notifMessage = message.message ? message.message : '';
        }
        else if (message.type === 'order' && message.status === "Pending") {
            title = `Order Received`;
            notifMessage = `You have got a new order from ${user.name ? user.name : 'user'}`;
        } 
        else if (message.type === 'order' && message.status === "Confirmed") {
            title = `Order Confirmed`;
            notifMessage = `Order with OrderID: ${orderId} is confirmed and now it is in packing stage`;
        } 
        else if (message.type === 'order' && (message.status === "Rejected" || message.status ==="Dispatched" || message.status ==="Delivered" || message.status ==="Returned")) {
            title = `Order ${message.status}`;
            notifMessage = `Your order with OrderID: ${orderId} is ${message.status}`;
        } 
        else if (message.type === 'order' && message.status === "Cancelled" && message.author === "user") {
            title = `Order ${message.status}`;
            notifMessage = `Order with OrderID: ${orderId} is cancelled`;
        } 
        else if (message.type === 'order' && message.status === "Cancelled" && message.author === "admin") {
            title = `Order ${message.status}`;
            notifMessage = `Your order with OrderID: ${orderId} is cancelled`;
        }
        else if(message.type === 'broadcast'){
            title = message.title && message.title.length > 64 ? message.title.substring(0, 61) + '...' : message.title;
            notifMessage = message.message && message.message.length > 240 ? message.message.substring(0, 237) + '...' : message.message;
            if(message.images && message.images.length>0 && message.images[0].url){
                notifImg = message.images[0].url;
            }
            if (message.bannerData) {
                link = message.bannerData.link;
            } else{
                link = {id: '', name:'', type: 'None'}
            }
        }
        if (message.author === 'admin' && message.type !== 'broadcast') {
            if (message.type == 'link' && message.btns && message.btns[0].task == 'cartView') {
                link.type = 'cart';
            } else if(message.type == 'link' && message.btns && message.btns[0].task == 'wishlistView'){
                link.type = 'wishlist';
            }
             else {
                link.type = 'adminMsg';
            }
        }
        if (message.author === 'user' && message.type !== 'broadcast') {
            link.id.push(`${userId}`);
            link.type = 'userMsg';
        }
        let payload = preparePayload(link, title, notifMessage, notifImg);
        if (message.type != 'image') {
            sendNotification(receiverTokens, payload);
        }
    });

// For sending chat img
    exports.onUpdateMessage = functions.runWith({ timeoutSeconds: 120 }).firestore
        .document('chats/{userId}/messages/{messageId}').onUpdate(async (change, context) => {
            const userId = context.params.userId;
            const message = change.after.data();
            const docBefore = change.before.data();
            const docAfter = change.after.data();
            if (message.type === 'image' && docBefore.images == null && docAfter.images && docAfter.images[0].url) {    
                const userDoc = await db.collection('users').doc(userId).get();
                const user = userDoc.data();
                let sender = {
                    name: ''
                };
                let receiverTokens = [];
                if (message.author && message.author == 'user') {
                    sender = {
                        name: user.name
                    };
                    const adminDocs = await db.collection('users').where('role', '==', 'admin').get();
                    adminDocs.forEach((doc) => {
                        if (doc && doc.id && doc.data()) {
                            let admin = doc.data();
                            if (admin.deviceTokens && admin.deviceTokens.length > 0) {
                                admin.deviceTokens.forEach(token => {
                                    receiverTokens.push(token);
                                });
                            }
                        }
                    });
                } else {
                    sender = {
                        name: adminName
                    };
                    if (user.deviceTokens && user.deviceTokens.length > 0) {
                        user.deviceTokens.forEach(token => {
                            receiverTokens.push(token);
                        });
                    }
                }
                let title = 'New Message from ' + sender.name;
                let notifMessage;
                let notifImg = message.images[0].url;
                let link = {
                    id: [],
                    name: '',
                    type: 'None'
                };
                if (message.author === 'admin') {
                    link.type = 'adminMsg';
                }
                else if (message.author === 'user') {
                    link.id.push(userId);
                    link.type = 'userMsg';
                }
                let payload = preparePayload(link, title, notifMessage, notifImg);
                sendNotification(receiverTokens, payload);
            }
        });


// Broadcast msg
exports.broadcastMessage = functions.runWith({ memory: '1GB', timeoutSeconds: 540 }).firestore.document("broadcast/{broadcastId}").onCreate(async (snap, context) => {
    const broadcastId = context.params.broadcastId;
    const broadcastMessage = snap.data();
    let users = [];
    let usersDocs;
    if (broadcastMessage.groups && broadcastMessage.groups.length) {
        usersDocs = await db.collection('users').where('groups', 'array-contains-any', broadcastMessage.groups).where('active', '==', true).get();
    } else {
        usersDocs = await db.collection('users').where('role', '==', 'user').where('active', '==', true).get();
    }
    usersDocs.forEach((doc) => {
        if (doc && doc.id && doc.data()) {
            let userId = doc.id;
            users.push(userId);
        }
    });
    console.log('list of user ids', users);
    for (var i = 0; i < users.length; i++) {
        try {
            broadcastMessage['published'] = true;
            const chatRef = db.collection('chats').doc(users[i]);
            const chatDoc = await db.collection('chats').doc(users[i]).get();
            if(chatDoc && chatDoc.data()) {
                await chatRef.collection('messages').add(broadcastMessage);
                let chatUpdateObj = {
                    lastMessage: 'Uploaded an image, click here to see details.',
                }
                if (!('updateLastMsgAt' in broadcastMessage && broadcastMessage.updateLastMsgAt == false)) {
                    chatUpdateObj['lastMessageAt'] = new Date()
                }
                if (broadcastMessage.message === null || broadcastMessage.message === '') {
                    chatRef.update(chatUpdateObj);

                } else if (!broadcastMessage.images || broadcastMessage.images.length === 0) {
                    chatUpdateObj.lastMessage = broadcastMessage.message;
                    chatRef.update(chatUpdateObj);
                    
                } else {
                    chatRef.update(chatUpdateObj);
                }
            }
        } catch (error) {
            console.log("error in broadcast message", error);
            return error;
        }
    }
    return "broadcast completed successfully."
});


// Sending notification to deliveryAgent
exports.onUpdateOrder = functions.runWith({ timeoutSeconds: 120 }).firestore
.document('orders/{orderId}').onUpdate(async (change, context) => {
    let receiverTokens = [];
    const before = change.before.data();
    const after = change.after.data();
    if (after.deliveryAgentId && ((before.deliveryAgentId !== after.deliveryAgentId) || (before.orderId !== after.orderId))) {
        console.log('after.deliveryAgentId:::::', after.deliveryAgentId);
            const userDoc = await db.collection('users').doc(after.deliveryAgentId).get();
            const deliveryAgentDoc = userDoc.data();
            if (deliveryAgentDoc && deliveryAgentDoc.deviceTokens && deliveryAgentDoc.deviceTokens.length > 0) {
                deliveryAgentDoc.deviceTokens.forEach(token => {
                    receiverTokens.push(token);
                });
            }
        let title = 'Order Received';
        let notifMessage = `You have got an order with OrderID: ${orderIdPrefix}${after.orderId}`;
        let notifImg;
        let link = {
            id: [after.orderId],
            name: '',
            type: 'deliveryMsg'
        }
        let payload = preparePayload(link, title, notifMessage, notifImg);
        sendNotification(receiverTokens, payload);
    }
});

// Sending notification to Admin for new user
exports.onCreateUser = functions.runWith({ timeoutSeconds: 120 }).firestore
.document('users/{userId}').onCreate(async (snap, context) => {
    const userId = context.params.userId;
    const user = snap.data();
    let receiverTokens = [];
    const adminDocs = await db.collection('users').where('role', '==', 'admin').get();
    adminDocs.forEach((doc) => {
        if (doc && doc.id && doc.data()) {
            let admin = doc.data();
            if (admin.deviceTokens && admin.deviceTokens.length > 0) {
                admin.deviceTokens.forEach(token => {
                    receiverTokens.push(token);
                });
            }
        }
    });
    let link = {
        id: [userId],
        name: '',
        type: 'userMsg'
    };
    let title = 'New Customer Registered';
    let notifMessage = `You have got a new customer with phone number: ${user.phoneNo}`;
    let notifImg;
    let payload = preparePayload(link, title, notifMessage, notifImg);
    sendNotification(receiverTokens, payload);
});


// Sending notification to admin for new query/request
exports.onCreateContactUs = functions.firestore
.document('contactUs/{id}').onCreate(async (snap, context) => {
    const userQueryDetails = snap.data();
    let receiverTokens = [];
    const adminDocs = await db.collection('users').where('role', '==', 'admin').get();
    adminDocs.forEach((doc) => {
        if (doc && doc.id && doc.data()) {
            let admin = doc.data();
            if (admin.deviceTokens && admin.deviceTokens.length > 0) {
                admin.deviceTokens.forEach(token => {
                    receiverTokens.push(token);
                });
            }
        }
    });
    let link = {
        id: [],
        name: '',
        type: 'home'
    };
    let title = `You have received a query from ${userQueryDetails.name}`;
    let notifMessage = `Please go to contact page settings in web admin to check the query`;
    let notifImg;
    let payload = preparePayload(link, title, notifMessage, notifImg);
    sendNotification(receiverTokens, payload);
});

exports.onCreateOrderMessage = functions.firestore
.document('orders/{orderId}/messages/{messageId}').onCreate(async (snap, context) => {
    const orderId = context.params.orderId;
    const message = snap.data();    
    const userId = message.userId;
    const userDoc = await db.collection('users').doc(userId).get();
    const user = userDoc.data();
    let sender = {
        name: ''
    };
    let receiverTokens = [];
    if (message.author && message.author == 'user') {
        sender = {
            name: user.name
        };
        const adminDocs = await db.collection('users').where('role', '==', 'admin').get();
        adminDocs.forEach((doc) => {
            if (doc && doc.id && doc.data()) {
                let admin = doc.data();
                if (admin.deviceTokens && admin.deviceTokens.length > 0) {
                    admin.deviceTokens.forEach(token => {
                        receiverTokens.push(token);
                    });
                }
            }
        });
    } else {
        sender = {
            name: adminName
        };
        if (user.deviceTokens && user.deviceTokens.length > 0) {
            user.deviceTokens.forEach(token => {
                receiverTokens.push(token);
            });
        }
    }
    const orderDetails = await db.collection('orders').doc(orderId).get();
    const link = {
        id: orderDetails.data().orderId, 
        name: '', 
        type: 'order-chat',
        orderDocId: orderId,
        userId: orderDetails.data().userId,
        author: message.author
    };
    const title = `New message received in order chat for ${orderIdPrefix}${orderDetails.data().orderId}`;
    const notifMessage = message.msg;
    const notifImg = '';
    let payload = preparePayload(link, title, notifMessage, notifImg);
    sendNotification(receiverTokens, payload);
});

exports.onCreateNearByDeliveryAgentOrder = functions.firestore
.document('users/{userId}/nearbyOrders/{orderId}').onCreate(async (snap, context) => {
    const orderId = context.params.orderId;
    const userId = context.params.userId;
    let receiverTokens = [];
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    if (userData && userData.deviceTokens && userData.deviceTokens.length > 0) {
        userData.deviceTokens.forEach(token => {
            receiverTokens.push(token);
        });
    }
    let title = 'Nearby Order Available!';
    let notifMessage = `You have got a nearby order. Please accept or reject it.`;
    let link = {
        id: [orderId],
        name: '',
        type: 'nearbyOrder'
    }
    let payload = preparePayload(link, title, notifMessage, '');
    sendNotification(receiverTokens, payload);
});

exports.onCreatePickupRequest = functions.firestore
.document('features/sellByUser/requests/{requestId}').onCreate(async (snap, context) => {
    const requestId = context.params.requestId;
    const request = snap.data();
    const userId = request.user.id;
    const chatData = {
        type: 'txt',
        createdAt: new Date(moment().tz(timeZone)),
        author: 'user',
        isRead: false,
        published: true,
        message: `Submitted a new pickup request.`,
        title: 'New Pickup Request!'
    }
    await globalFile.chatMessage(chatData, userId);
});