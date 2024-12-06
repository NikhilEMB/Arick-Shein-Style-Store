const functions = require("firebase-functions");
var moment = require('moment-timezone');
const axios = require('axios').default;
const {
  db,
  timeZone,
  middleware,
  projectId
} = require('./admin');
const rawUrl = 'https://us-central1-bwi-middleware-dev.cloudfunctions.net/zohoInventoryOrders-addSalesOrderToZohoInventory'

exports.addSalesOrdersToZohoInventory = functions.firestore.document('orders/{orderId}').onUpdate(async (change, context) => {
  try {
    const afterOrderData = change.after.data()
    const beforeOrderData = change.before.data()
    const settingsDoc = await db.collection('settings').doc('store').get();
    const settings = settingsDoc.data();
    const zohoIntegrationDoc = await db.collection('integrations').doc('inventoryManagement').collection('list').doc('zohoInventory').get()
    const zohoIntegrationData = zohoIntegrationDoc.data()
    if (zohoIntegrationData.initSalesOrderSync === true) {
      if (beforeOrderData.orderId !== afterOrderData.orderId) {
        console.log('Running addSalesOrdersToZohoInventory for project : ', projectId);
        const userDataRef = await db.collection('users').doc(afterOrderData.userId).get()
        if (userDataRef.data()) {
          let userData = userDataRef.data()
          let apiBody = {
            projectId: projectId,
            order: afterOrderData,
            settings: settings,
            user: userData
          }
          axios.post(middleware.apiUrl + '/zohoInventoryOrders-addSalesOrderToZohoInventory', apiBody)
            .then(response => {
              console.log('Successful addSalesOrdersToZohoInventory : ', response.data)
            })
            .catch(error => {
              console.log('Error in addSalesOrdersToZohoInventory IC : ', error)
            })
        } else {
          console.log('Error in fetching user for order!')
        }
      }
    } else {
      console.log('ZohoIntegrationData initSalesOrderSync disabled!')
    }
  } catch (error) {
    console.log('Error in addSalesOrdersToZohoInventory OC : ', error)
  }
})

async function test() {
  // const userData = await db.collection('users').doc('dnwgz3hDGyUr8ikQXunnd8T9AT72').get()
  // console.log('userData', userData.data())
  db.collection('orders').where("orderId", "==", 5001).get().then((dataRef) => {
    // db.collection('orders').limit(1).get().then((dataRef) => {
    dataRef.forEach((doc) => {
      // const a = new Date(doc.data().createdAt.seconds * 1000).toISOString().slice(0, 10)
      console.log(JSON.stringify(doc.data()))
    })
  })

}
// test()

// db.collection("products").doc("Bgp0CKOFLaVKF7eQMjwp").get().then((data) => {
//   console.log(JSON.stringify(data.data()))
// })