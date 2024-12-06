const functions = require("firebase-functions");
var moment = require('moment-timezone');
var globalFile = require('./global');

const {
    db,
	admin,
	orderIdPrefix,
    timeZone,
    subscriptionCronJob
} = require('./admin');

exports.scheduledSubscription = functions.pubsub.schedule(subscriptionCronJob || '0 20 * * *').timeZone(timeZone).onRun(async (context) => {
    const subscriptions = await db.collection('subscriptions').get();
    subscriptions.forEach(async (doc) => {
        if (doc && doc.id && doc.data()) {
            let tomorrow = moment().tz(timeZone).add(1, 'days').format('YYYY-MM-DD');
            console.log('tomorrow', tomorrow);
            const subData = doc.data();
            const subId = doc.id;
            let orderCreated = subData.hasOwnProperty('orderCreated') ? subData.orderCreated : 0;
            const ordersAt = subData.ordersAt ? subData.ordersAt : [];
            if (subData.active && (orderCreated < subData.totalDeliveries) && (ordersAt.length > 0)) {
                console.log('active sub');
                ordersAt.forEach(async (date) => {
                    if(moment(date).isSame(tomorrow, 'day')) {
                        console.log('order place');
                        orderCreated = orderCreated + 1;
                        const order = createOrderObj(subData, tomorrow, subId);
                        await db.collection('orders').add(order);
                        await db.collection('subscriptions').doc(subId).update({
                            orderCreated: orderCreated
                        });
                    }
                });
            }
        }
    });
});

function createOrderObj(subData, tomorrow, subId) {
    const product = subData.product;
    const userId = subData.userId;
    const userName = subData.userName;
    const chatRef = db.collection('chats').doc(userId).collection('messages').doc();
    const msgId = chatRef.id;
    const products = [{
        name: product.prodName,
        description: product.prodDesc,
        img: product.coverPic,
        barcode: product.barcode,
        hsn: product.hsnCode,
        sku: product.productCode,
        productId: product.productId,
        quantity: subData.qtyPerDay,
        commentMsg: subData.commentMsg
    }];
    const order = {
        orderId: null,
        orderType: 'subscription',
        products: products,
        status: 'Confirmed',
        createdAt: new Date(),
        address: subData.address,
        userId: userId,
        userName: userName,
        msgId: msgId,
        scheduledDate: new Date(tomorrow),
        scheduledTime: subData.deliverySlot,
        billingAddress: subData.billingAddress,
        subscriptionId: subId,
        payment: {}
    }

    return order;
}

exports.onCreateSubscription = functions.firestore.document('subscriptions/{subscriptionId}').onCreate(async (snap, context) => {
    const subData = snap.data();
    const uid = subData.userId;
    const productName = subData.product.prodName;
    let chatData = {
        msg: `You have subscribed for ${productName}`,
        uid: uid,
        author: 'admin'
    }
    await chatMsg(chatData);
});

exports.onUpdateSubscription = functions.firestore.document('subscriptions/{subscriptionId}').onUpdate(async (change, context) => {
    const afterData = change.after.data();
    const beforeData = change.before.data();
    const subscriptionId = context.params.subscriptionId;
    if((afterData.active === true) && (beforeData.active === false)) {
        console.log('update ordersAt');
        const totalDeliveriesLeft = afterData.totalDeliveriesLeft;
        const updatedOrdersAt = getAllOrdersDate(afterData, totalDeliveriesLeft);
        if(updatedOrdersAt.length > 0) {
            await db.collection('subscriptions').doc(subscriptionId).update({ordersAt: updatedOrdersAt});
        }
    }
    if((afterData.active === false) && (beforeData.active === true)) {
        const futureDates = getFutureDates(afterData.ordersAt);
        console.log('totalDeliveriesLeft', futureDates.length);
        await db.collection('subscriptions').doc(subscriptionId).update({totalDeliveriesLeft: futureDates.length});
    }

	// refund amount to wallet in case leave is added for a date by the user
	if (afterData.leaveDates) {
		const beforeLeaves = beforeData.leaveDates;
		let changeInLeaves;

		if (beforeLeaves) {
			changeInLeaves = afterData.leaveDates.length - beforeLeaves.length;
		} else {
			changeInLeaves = afterData.leaveDates.length;
		}

		if (changeInLeaves >= 1) {
			const numericOrderId = await getNumericOrderId(afterData.orderId);
			const refundAmount = changeInLeaves * (afterData.amountPayable / afterData.totalDeliveries);

			const data = {
				amount: refundAmount,
				uid: afterData.userId,
				msg: `Refund for ${orderIdPrefix}${numericOrderId}`,
				type: 'wallet'
			}

			await globalFile.addToUserWallet(data);
		}
	}
});

function getAllOrdersDate(subData, totalDeliveriesLeft) {
    let ordersAt = [];
    const deliveries = totalDeliveriesLeft;
    if(subData.type === 'daily') {
      for (let i = 1; i <= deliveries; i++) {
        ordersAt.push(moment().tz(timeZone).add(i, 'days').format('YYYY-MM-DD'))
      }
    } else if(subData.type === 'weekly') {
      const days = subData.deliveryDays;
      const totalWeeks = subData.totalWeeks;
      days.forEach((day) => {
        for (let i = 0; i <= totalWeeks; i++) {
          let date = moment().tz(timeZone).add(i, 'week').day(day).format('YYYY-MM-DD');
          ordersAt.push(date)
        }
      });
    } else {
      const dates = subData.deliveryDates;
      const totalMonths = subData.totalMonths;
      dates.forEach((date) => {
        for (let i = 0; i <= totalMonths; i++) {
          let dateOfMonth = moment().tz(timeZone).add(i, 'M').date(parseInt(date)).format('YYYY-MM-DD');
          ordersAt.push(dateOfMonth)
        }
      });
    }
    const futureDates = getFutureDates(ordersAt);
    const sortedDates = futureDates.sort((a, b) => moment(a).diff(moment(b), 'days'))
    if(deliveries < sortedDates.length) {
      const extras = sortedDates.length - deliveries;
      sortedDates.splice(-1, extras);
    }
    return sortedDates;
  }

  function getFutureDates(dates) {
    const futureDates = [];
    const today = moment().tz(timeZone).format('YYYY-MM-DD');
    dates.forEach(date => {
      const diff = moment(date).diff(moment(today), 'days');
      if(diff > 0) {
        futureDates.push(date);
      }
    });
    return futureDates;
  }

async function chatMsg(data) {
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

async function getNumericOrderId(orderId) {
	const orderSnap = await db.collection('orders').doc(orderId).get();
	return orderSnap.data().orderId;
}

exports.updateDatesBasedOnOrderDelivery = functions.firestore.document('orders/{orderId}').onUpdate(async (change, context) => {
	const beforeData = change.before.data();
	const afterData = change.after.data();

	if (afterData.subscriptionId && afterData.scheduledDate && afterData.orderType === 'subscription' && afterData.userId) {
		const subscriptionId = afterData.subscriptionId;
		const scheduledDate = moment(afterData.scheduledDate).format('YYYY-MM-DD');
		const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);

		// when order is set as delivered
		if (beforeData.status !== 'Delivered' && afterData.status === 'Delivered') {
			await subscriptionRef.update({
				deliveredDates: admin.firestore.FieldValue.arrayUnion(scheduledDate)
			});
		}

		// when order is set as cancelled / rejected
		if ((beforeData.status !== 'Cancelled' || beforeData.status !== 'Rejected') && (afterData.status === 'Cancelled' || afterData.status === 'Rejected')) {
			await subscriptionRef.update({
				notDeliveredDates: admin.firestore.FieldValue.arrayUnion(scheduledDate)
			});

			// refund to wallet
			const data = {
				amount: afterData.walletAmount,
				uid: afterData.userId,
				msg: `Refund for ${orderIdPrefix}${afterData.orderId}`,
				type: 'wallet'
			}

			await globalFile.addToUserWallet(data);
		}
	}
});