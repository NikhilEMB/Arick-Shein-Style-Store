const functions = require("firebase-functions");
const {
  db,
  middleware,
  projectId,
  timeZone
} = require('../../process/admin');
var moment = require('moment-timezone');
const axios = require('axios').default;

function paginate(arr, size) {
  return arr.reduce((acc, val, i) => {
    let idx = Math.floor(i / size)
    let page = acc[idx] || (acc[idx] = [])
    page.push(val)

    return acc
  }, [])
}
// let myArr = ['1','2','3','4','5','6','7'];
// let finalArr = []
// finalArr = paginate(myArr, 1)
// let pageNo = 1;
// console.log(finalArr[pageNo - 1]);


exports.getOrders = functions.https.onRequest(async (req, res) => {
  try {
    const order = req.body || {};
    if (!order) {
      res.status(400).send({
        message: "No order received !!!",
        status: false
      });
      return;
    }
    if (!order.page_size || !order.page_number || !order.order_date_from || !order.order_date_to) {
      res.status(400).send({
        message: "All values must be present",
        status: false
      });
      return;
    }
    console.log('order page size : ', order.page_size);
    console.log('order page number : ', order.page_number);
    console.log('order date from : ', order.order_date_from);
    console.log('order date to : ', order.order_date_to);
    console.log('ALL FIELDS SHOWN ABOVE');
    if (!order.status) {
      const orderDoc = await db.collection('orders').where('createdAt', '>=', new Date(order.order_date_from)).where('createdAt', '<=', new Date(order.order_date_to)).limit(order.page_size * order.page_number).get();
    if (orderDoc.empty) {
      console.log('No matching documents.');
      res.status(400).send({
        message: "Order not found !!!",
        status: false
      });
      return;
    }
    // console.log('here : ', orderDoc);
    let orders = [];
    orderDoc.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      orders.push({
        id: doc.id,
        order: doc.data()
      })
    });
    console.log('received here!!!!!!!', orders.length);
    let pages = paginate(orders, order.page_size);
    res.status(200).send({
      order: pages[order.page_number - 1],
      status: true
    })
    } else {
      let status = order.status;
      if (status == 'pending') {
        status = 'Pending'
      } else if (status == 'new') {
        status = 'Confirmed'
      } else if (status == 'packed') {
        status = 'Confirmed'
      } else if (status == 'ready_to_ship') {
        status = 'Confirmed'
      } else if (status == 'in_transit') {
        status = 'Dispatched'
      } else if (status == 'delivered') {
        status = 'Delivered'
      } else if (status == 'cancelled') {
        status = 'Cancelled'
      } else if (status == 'customer_return') {
        status = 'Returned'
      } else if (status == 'courier_return') {
        status = 'Returned'
      } else {
        res.status(400).send({
          message: "Status unsupported !!!",
          status: false,
        });
      }
      const orderDoc = await db.collection('orders').where('status', '==', status).where('createdAt', '>=', new Date(order.order_date_from)).where('createdAt', '<=', new Date(order.order_date_to)).limit(order.page_size * order.page_number).get();
    if (orderDoc.empty) {
      console.log('No matching documents.');
      res.status(400).send({
        message: "Order not found !!!",
        status: false
      });
      return;
    }
    // console.log('here : ', orderDoc);
    let orders = [];
    orderDoc.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      orders.push({
        id: doc.id,
        order: doc.data()
      })
    });
    console.log('received if here with status : ', orders.length);
    let pages = paginate(orders, order.page_size);
    console.log('pages length : ', pages.length);
    // console.log('pages req : ', pages[order.page_number - 1]);
    res.status(200).send({
      order: pages[order.page_number - 1],
      status: true
    })
    }
    
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong !!!",
      status: false,
      error: error
    });
    return;
  }
})

exports.getOrder = functions.https.onRequest(async (req, res) => {
  try {
    const order = req.body || {};
    if (!order) {
      res.status(400).send({
        message: "No order received !!!",
        status: false
      });
      return;
    }
    if (!order.order_id) {
      res.status(400).send({
        message: "All values must be present",
        status: false
      });
      return;
    }
    const orderDoc = await db.collection('orders').where('orderId', '==', order.order_id).get();
    if (orderDoc.empty) {
      console.log('No matching documents.');
      res.status(400).send({
        message: "Product with this order id not found",
        status: false
      });
      return;
    }
    let orders = [];
    orderDoc.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      orders.push({
        id: doc.id,
        order: doc.data()
      })
    });
    res.status(200).send({
      order: orders,
      status: true
    })
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong !!!",
      status: false
    });
    return;
  }
})

async function testDoc() {
  const orderDoc = await db.collection('orders').where('orderId', '==', 3115).get();
  if (orderDoc.empty) {
    console.log('No matching documents.');
    res.status(400).send({
      message: "Product with this order id not found",
      status: false
    });
    return;
  }
  let orders = [];
  orderDoc.forEach(doc => {
    // console.log(doc.id, '=>', doc.data());
    orders.push({
      id: doc.id,
      order: doc.data()
    })
  });
  // console.log('orders : ', orders);
}
// testDoc()


// function testDate() {
//   // console.log(new Date('2022-10-05'));
//   let date = new Date(moment('2022-03-16').tz(timeZone));
//   console.log('date', date);
// }
async function testDate() {
  const orderDoc = await db.collection('orders').where('createdAt', '>=', new Date('2022-01-16')).where('createdAt', '<=', new Date('2022-05-16')).limit(5).get();
  if (orderDoc.empty) {
    console.log('No matching documents.');
    return;
  }
  let orders = []
  orderDoc.forEach(doc => {
    orders.push(doc.data())
    // console.log(doc.data());
  })
  console.log(orders.length);
}
// testDate()

exports.getReturnedOrders = functions.https.onRequest(async (req, res) => {
  try {
    const returnOrder = req.body || {};
    if (!returnOrder) {
      res.status(400).send({
        message: "No order received !!!",
        status: false
      });
      return;
    }
    if (!returnOrder.page_size || !returnOrder.page_number || !returnOrder.return_date_from || !returnOrder.return_date_to) {
      res.status(400).send({
        message: "All values must be present",
        status: false
      });
      return;
    }
    const returnedOrderDoc = await db.collection('orders').where("status", "==", "Returned").where('createdAt', '>=', new Date(returnOrder.return_date_from)).where('createdAt', '<=', new Date(returnOrder.return_date_to)).limit(returnOrder.page_size * returnOrder.page_number).get();
    if (returnedOrderDoc.empty) {
      console.log('No matching documents.');
      return;
    }
    let returnedOrders = [];
    returnedOrderDoc.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      returnedOrders.push({
        id: doc.id,
        order: doc.data()
      })
    });
    let pages = paginate(returnedOrders, returnOrder.page_size);
    res.status(200).send({
      order: pages[returnOrder.page_number - 1],
      status: true
    })
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong !!!",
      status: false
    });
    return;
  }
})

exports.getCancelledOrders = functions.https.onRequest(async (req, res) => {
  try {
    const cancelledOrder = req.body || {};
    if (!cancelledOrder) {
      res.status(400).send({
        message: "No order received !!!",
        status: false
      });
      return;
    }
    if (!cancelledOrder.page_size || !cancelledOrder.page_number || !cancelledOrder.cancel_date_from || !cancelledOrder.cancel_date_to) {
      res.status(400).send({
        message: "All values must be present",
        status: false
      });
      return;
    }
    const cancelledOrderDoc = await db.collection('orders').where("status", "==", "Cancelled").where('createdAt', '>=', new Date(cancelledOrder.cancel_date_from)).where('createdAt', '<=', new Date(cancelledOrder.cancel_date_to)).limit(cancelledOrder.page_size * cancelledOrder.page_number).get();
    if (cancelledOrderDoc.empty) {
      console.log('No matching documents.');
      return;
    }
    let cancelledOrders = [];
    cancelledOrderDoc.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      cancelledOrders.push({
        id: doc.id,
        order: doc.data()
      })
    });
    let pages = paginate(cancelledOrders, cancelledOrder.page_size);
    res.status(200).send({
      order: pages[cancelledOrder.page_number - 1],
      status: true
    })
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong !!!",
      status: false
    });
    return;
  }
})

async function testFuncCancel() {
  const cancelledOrderDoc = await db.collection('orders').where("status", "==", "Cancelled").where('createdAt', '>=', new Date("2022-01-10")).where('createdAt', '<=', new Date("2022-03-10")).limit(5).get();
  if (cancelledOrderDoc.empty) {
    console.log('No matching documents.');
    return;
  }
  let cancelledOrders = [];
  cancelledOrderDoc.forEach(doc => {
    // console.log(doc.id, '=>', doc.data());
    cancelledOrders.push({
      id: doc.id,
      cancelledOrder: doc.data()
    })
  });
  // console.log('cancelledOrders : ', cancelledOrders);
  // res.status(200).send({
  //   order: cancelledOrders,
  //   status: true
  // })
}
// testFuncCancel()

exports.postOrderDispatch = functions.https.onRequest(async (req, res) => {
  try {
    const dispatchOrder = req.body || {};
    if (!dispatchOrder) {
      res.status(400).send({
        message: "No order received !!!",
        status: false
      });
      return;
    }
    if (!dispatchOrder.order_id) {
      res.status(400).send({
        message: "All values must be present",
        status: false
      });
      return;
    }
    let docId = '';
    const orderDoc = await db.collection('orders').where('orderId', '==', dispatchOrder.order_id).get();
    orderDoc.forEach(doc => {
      docId = doc.id
    })
    await db.collection('orders').doc(docId).update({
      "status": "Dispatched",
    });
    res.status(200).send({
      order_id: dispatchOrder.order_id,
      status: true,
    })
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong !!!",
      status: false,
      error: error
    });
    return;
  }
})

async function testDispatch() {
  let order_id = 3115
  let docId = ''
  const orderDoc = await db.collection('orders').where('orderId', '==', order_id).get();
  orderDoc.forEach(doc => {
    console.log('doc : ', doc.id);
    docId = doc.id;
  })
  const temp = await db.collection('orders').doc(docId.toString()).update({
    "status": "Dispatched",
  });
  // console.log('temp : ', temp);
}
// testDispatch()

exports.updateOrderStatus = functions.https.onRequest(async (req, res) => {
  try {
    const integrationCode = req.body.integrationCode;
    const data = req.body.data;
    const status = req.body.status;
    if (!integrationCode || !data) {
      res.status(400).send({
        message: "integrationCode / data - empty / not received !!!",
        status: false
      });
      return;
    } 
    // TODO : GET ORDER FOR UPDATING

    const intDoc = await db.collection('integrations').doc('delivery').collection('list').doc(integrationCode).collection('orders').where(`${data.key}`, '==', `${data.value}`).get();
    if (intDoc.empty) {
      console.log('No matching documents.');
      res.status(400).send({
        message: "Order not found !!!",
        status: false
      });
      return;
    }
    let orderId;
    intDoc.forEach(async doc => {
      console.log('docId : ', doc.id);
      orderId = doc.id;
      let orderDocId
      // TODO : FIND ORDER(ID)
      console.log('orderId : ', orderId);
      const orderDoc = await db.collection('orders').where('orderId', '==', parseInt(orderId)).get();
      if (orderDoc.empty) {
        console.log('No matching order.');
        res.status(400).send({
          message: "Order not found !!!",
          status: false
        });
        return;
      }
      orderDoc.forEach(doc => {
        console.log('orderDoc : ', doc.id, doc.data());
        orderDocId = doc.id;
      })
      // TODO : UPDATE FETCHED ORDER
      await db.collection('orders').doc(orderDocId).update({
        "status": status,
      });
    })
    res.status(200).send({
      message: `Successfully updated order - ${orderDocId}`,
      status: true,
      code: integrationCode
    });

  } catch (error) {
    res.status(400).send({
      message: "in catch",
      status: false,
      error: error
    });
  }
})

async function sendOrderStatus(sendStatus, integrationCode, projectId, afterOrderData, settings) {
  if (sendStatus) {
    return new Promise(async (resolve) => {
      try {
        let apiBody = {
          projectId: projectId,
          integrationCode: integrationCode,
          afterData: afterOrderData,
          storeName: settings.storeName
        }
        // * use PROD link here
        axios.post('https://us-central1-bwi-middleware.cloudfunctions.net/promotion-broadcastOrderStatus', apiBody)
        .then((response) => {
          console.log('response : ', response);
        })
        .catch((error) => {
          console.log('error IC : ', error);
        })
      } catch (error) {
        console.log('error OC : ', error);
      }
    })
  } else {
    console.log('Send Status Error!!!');
  }
}

function checkSendStatus(beforeOrderData, afterOrderData) {
  if ((beforeOrderData.orderId != afterOrderData.orderId) || (beforeOrderData.status != afterOrderData.status)) {
    return true
  } else {
    return false
  }
}

exports.broadcastOrderStatusOnUpdate = functions.firestore.document('orders/{orderId}').onUpdate(async (change, context) => {
  const afterOrderData = change.after.data()
  const beforeOrderData = change.before.data()
  const settingsDoc = await db.collection('settings').doc('store').get();
  const settings = settingsDoc.data();
  // ! Updated Code for WA Integration Check
  // ****************************************************************
  const integrationDocNew = await db.collection('integrations').doc('whatsapp_order_notification').get();
  if (!integrationDocNew.exists) {
    console.log('No integration data found!!!');
  } else {
    let integrationData = integrationDocNew.data()
    if (integrationData.default === 'twilio') {
      const twilioDoc = await db.collection('integrations').doc('whatsapp_order_notification').collection('list').doc('twilio_order_notification').get()
      if (!twilioDoc.exists) {
        console.log('Twilio : Integration data not found!!!');
      } else {
        let twilioData = twilioDoc.data()
        if (twilioData.active && twilioData.credentials.accountSid && twilioData.credentials.authToken && twilioData.credentials.twilioNumber) {
          let sendStatus = checkSendStatus(beforeOrderData, afterOrderData)
          await sendOrderStatus(sendStatus, integrationData.default + '_order_notification', projectId, afterOrderData, settings)
        } else {
          console.log('Twilio : Missing Credentials / Not Active!!!');
        }
      } 
    }
    if (integrationData.default === 'interakt') {
      const interaktDoc = await db.collection('integrations').doc('whatsapp_order_notification').collection('list').doc('interakt_order_notification').get()
      if (!interaktDoc.exists) {
        console.log('Interakt : Integration data not found!!!');
      } else {
        let interaktData = interaktDoc.data()
        if (interaktData.active && interaktData.credentials.apiKey) {
          let sendStatus = checkSendStatus(beforeOrderData, afterOrderData)
          await sendOrderStatus(sendStatus, integrationData.default + '_order_notification', projectId, afterOrderData, settings)
        } else {
          console.log('Interakt : Missing Credentials / Not Active!!!');
        }
      }
    } 
    if (integrationData.default === 'aisensy') {
      const aisensyDoc = await db.collection('integrations').doc('whatsapp_order_notification').collection('list').doc('aisensy_order_notification').get()
      if (!aisensyDoc.exists) {
        console.log('Aisensy : Integration data not found!!!');
      } else {
        let aisensyData = aisensyDoc.data()
        if (aisensyData.active && aisensyData.credentials.apiKey) {
          let sendStatus = checkSendStatus(beforeOrderData, afterOrderData)
          await sendOrderStatus(sendStatus, integrationData.default + '_order_notification', projectId, afterOrderData, settings)
        } else {
          console.log('Interakt : Missing Credentials / Not Active!!!');
        }
      }
    }
    if (integrationData.default === '') {
      console.log('No Default Selected!!!');
    }
  }
  // ****************************************************************
})