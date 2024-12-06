const functions = require( "firebase-functions" );
const {
  admin,
  db,
  middleware,
  WEB_API_KEY,
  dynamicLinkInfo,
  coutryPhoneCode,
  referralLinkInfo,
  timeZone,
  projectId,
  algolia,
  country
} = require( './admin' );
const axios = require( 'axios' ).default;
var moment = require('moment-timezone');
const Shopify = require( 'shopify-api-node' );
// const shopName = 'BWI-Products-Orders-Sync'
// const apiKey = '30c31090d8e4806435b6aa3dc98d8604'
// const password = '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'
const shopName = projectId === 'bwi-alpha' ? 'BWI-Products-Orders-Sync' : 'arjonai'
const apiKey = projectId === 'bwi-alpha' ? '30c31090d8e4806435b6aa3dc98d8604' : '6f38aa0e34af7bcab372411c3214efc2'
const password = projectId === 'bwi-alpha' ? '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' : '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'
const shopify = new Shopify( {
  shopName: shopName,
  apiKey: apiKey,
  password: password
} )

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const testOrder = {
  userName: 'Saif Nizami',
  orderId: '6776',
  orderDocId: generateString(10),
  billingAddress: {
    address: 'NSP NEW DELHI',
    city: 'New DELHI',
    phoneNo: '+918851655683',
    pincode: '110034',
    country: 'India'
  },
  address: {
    address: 'NSP NEW DELHI',
    city: 'New DELHI',
    phoneNo: '+918851655683',
    pincode: '110034',
    country: 'India'
  },
  products: [{
    name: 'Test Product - 001',
    price: 899,
    maxQty: 4
  }]
}

function verifyOrders ( order ) {
  if ( order.billingAddress && order.address && order.userName ) {
    return true
  } else {
    return false
  }
}

async function formatOrder ( order ) {
  let shopifyId = 6777613091118
  console.log('shopifyId : ', shopifyId)
  let finalOrder = {
    order: {
      line_items: [],
      billing_address: {
        address1: order.billingAddress.address,
        city: order.billingAddress.city,
        phone: order.billingAddress.phoneNo,
        zip: order.billingAddress.pincode,
        name: order.userName,
        country_code: "IN",
        country: order.billingAddress.country || 'India',
      },
      shipping_address: {
        address1: order.address.address,
        city: order.address.city,
        phone: order.billingAddress.phoneNo,
        zip: order.address.pincode,
        country_code: "IN",
        country: order.address.country || 'India',
        name: order.userName,
      },
      customer: {
        id: shopifyId,
        first_name: order.userName,
        last_name: " ",
        phone: order.billingAddress.phoneNo,
        currency: "INR",
      },
      // transactions: {
      //   kind: 'sale',
      //   status: setOrderStatus(order),
      //   amount: order.totalAmountToPaid
      // }
    }
  }
  if ( order.products.length ) {
    order.products.map( product => {
      finalOrder.order.line_items.push( {
        title: product.name,
        price: product.price,
        quantity: product.maxQty,
      } )
    } )
  }
  return finalOrder
}

async function addOrderToShopify ( order ) {
  try {
    let params = await formatOrder( order )
    // console.log( 'params : ', params.order )
    await shopify.order.create( params.order )
      .then( async ( response ) => {
        console.log( 'Successfully added order : ', order.orderId,' - ',response.id )
        await addSuccessOrders(order.orderDocId, response.id)
      } )
      .catch( async ( error ) => {
        console.log( 'error adding order : ', order.orderId )
        await addErrorOrders(order.orderDocId, error, params.order)
      } )
  } catch ( error ) {
    console.log( 'Error in addExistingOrdersToShopify : ', error )
  }
}
// addOrderToShopify(testOrder)

async function addErrorOrders ( orderDocId, error, order ) {
  await db.collection( 'integrations' ).doc( 'shopify' ).collection( 'errorOrders' ).doc( orderDocId ).set( {error: JSON.stringify(error), order: order} )
}
// addErrorOrders('1234567890', {test: 123})
async function addSuccessOrders ( orderDocId, response ) {
  await db.collection( 'integrations' ).doc( 'shopify' ).collection( 'successOrders' ).doc( orderDocId ).set( {response} )
}
// addSuccessOrders('1234567890', {id:'123'})

async function extractOrders () {
  try {
    let ordersArr = []
    // let ordersRef = await db.collection( 'orders' ).orderBy( 'orderId', 'asc' ).limit( 5 ).get()
    let ordersRef = await db.collection( 'orders' ).orderBy( 'orderId', 'asc' ).get()
    // let ordersRef = await db.collection('orders').doc('hVXga7HhmFMbZuyd0Tz6').get()
    ordersRef.forEach( orderDoc => {
      if (verifyOrders(orderDoc.data())) {
        ordersArr.push( { ...orderDoc.data(), orderDocId: orderDoc.id } )
      }
    } )
    for ( let i = 0; i < ordersArr.length; i++ ) {
      console.log( i + 1, ' - ', ordersArr[ i ].orderId )
      await addOrderToShopify( ordersArr[ i ] )
    }
    // console.log( 'ordersArr.length : ', ordersArr.length )
  } catch ( error ) {
    console.log( 'Error in extractOrders : ', error )
  }
}
// extractOrders()

// exports.CreateOrderOnShopify = functions.firestore.document('orders/{orderId}').onUpdate( async ( change, context ) => {
//   const afterOrderData = change.after.data()
//   const beforeOrderData = change.before.data()
//   afterOrderData['orderDocId'] = context.params.orderId
//   if (beforeOrderData.orderId != afterOrderData.orderId) {
//     if (verifyOrders(afterOrderData)) {
//       await addOrderToShopify( afterOrderData )
//     }
//   }
// })

async function supportWaloKiGalti() {
  try {
    
    // *** Get all successful orders
    // let successfulOrders = []
    // let ordersRef = await db.collection('integrations').doc('shopify').collection('successOrders').get()
    // ordersRef.forEach( async (orderDoc) => {
    //   successfulOrders.push({...orderDoc.data(), orderDocId: orderDoc.id})
    // })
    // console.log('successfulOrders Length : ', successfulOrders.length)

    // *** Fetch order details
    // for (let i = 0; i < successfulOrders.length; i++) {
    //   await shopify.order.get(successfulOrders[i].response)
    //   .then((response) => {
    //     console.log('Successful Order fetch : ',i + 1, ' : ', response.id)
    //     console.log('--------------------------------------------------------')
    //   })
    //   .catch((error) => {
    //     console.log('Error in fetch order details : ', error)
    //   })
    // }

    // *** Cancel an order
    await shopify.order.cancel(5262807990574, { email: true })
    .then((response) => {
      console.log('Successful Order cancel : ', response)
    })
    .catch((error) => {
      console.log('error in cancel order : ', error)
    })

    // *** Close an order
    // await shopify.order.close(5262803501358)
    // .then((response) => {
    //   console.log('Successful Order close : ', response)
    // })
    // .catch((error) => {
    //   console.log('error in close order : ', error)
    // })

    // *** Delete an order
    // axios.delete(`https://${ apiKey }:${ password }@${ shopName }.myshopify.com/admin/api/2022-07/orders/5262805106990.json`)
    // .then((response) => {
    //   console.log('success in delete order : ', response)
    // })
    // .catch((error) => {
    //   console.log('error in delete order : ', error)
    // })
    
  } catch (error) {
    console.log('Error in supportWaloKiGalti : ', error)
  }
}
// supportWaloKiGalti()

// *** Webhooks for shopify ***

function setOrderStatus(status) {
  switch (status) {
    case 'cancelled':
      return 'Cancelled'
      break;
    case 'create':
      return 'Pending'
      break;
    case 'delete':
      return 'Rejected'
      break;
    case 'fulfilled':
      return 'Delivered'
      break;
    case 'paid':
      return 'Confirmed'
      break;
  }
}

function setMsgId(userId) {
  const ref = db.collection( 'chats' ).doc(userId).collection('messages').doc()
  console.log( 'refTest', ref.id )
  return ref.id
}
// console.log(setMsgId('GBGX4SgRnxL5Touuufqg'))

async function mapOrderObj(order, status, products, userData) {
  console.log('found product final : ', products)
  let orderObj = {
    address: {
      address: order.customer.default_address.address1,
      city: order.customer.default_address.city,
      country: order.customer.default_address.country,
      createdAt: new Date(),
      defaultAddress: true,
      lat: 0,
      lng: 0,
      name: order.customer.last_name ? order.customer.first_name + ' ' + order.customer.last_name : order.customer.first_name,
      phoneNo: order.customer.default_address.phone,
      pincode: order.customer.default_address.zip,
      state: order.customer.default_address.province,
      stateCode: order.customer.default_address.province_code
    },
    autoConfirmOrder: true,
    billingAddress: {
      address: order.billing_address.address1,
      city: order.billing_address.city,
      country: order.billing_address.country,
      createdAt: new Date(),
      defaultAddress: true,
      lat: 0,
      lng: 0,
      name: order.billing_address.name,
      phoneNo: order.billing_address.phone,
      pincode: order.billing_address.zip,
      state: order.billing_address.province,
      stateCode: order.billing_address.province_code
    },
    couponDiscount: order.current_total_discounts,
    couponId: "",
    couponName: "",
    createdAt: admin.firestore.Timestamp.fromDate(new Date(order.created_at)),
    custom: {
      active: false,
      name: ""
    },
    customDeliveryType: "standard",
    customerGstNo: "",
    defaultGst: 0,
    delivery: 0,
    deliveryGstObj: {
      extraChargeGst: 0,
      total: 0,
      value: 18,
    },
    deliveryLatLng: {
      lat: 0,
      lng: 0,
    },
    deliveryVerification: {
      otp: 0
    },
    discount: 0,
    discountOnMrp: 0,
    estimatedDeliveryTime: "",
    extraChargeOnOrder: {
      charge: 0,
      name: "",
    },
    freeProductsAdded: [],
    instantDelivery: {
      selected: false
    },
    invoiceNo: 0, // !!! orderId
    membershipDiscount: 0,
    metaData: {
      inventoryManaged: false, 
      source: "browser"
    },
    msgId: setMsgId(userData.docId),
    orderId: null, // !!! orderId
    payment: {
      completed: false,
      details: null,
      mode: null
    },
    products: [], // !!! 
    productsPrice: parseFloat(order.current_subtotal_price),
    qrCode: "",
    region: "",
    scheduledDate: "",
    scheduledTime: "",
    status: setOrderStatus(status),
    storePickupObj: {},
    timeline: null,
    totalAddonsPrice: 0,
    totalAmountToPaid: parseFloat(order.current_subtotal_price),
    totalMrp: parseFloat(order.current_total_price),
    uploadedDoc: {
      name: "",
      uploads: [],
    },
    userId: userData.docId,
    userName: userData.name,
    vendorId: "",
    walletAmount: 0,
    integrationExtras: {
      shopifyOrderId: order.id
    }
  }
  products.map((prod, i) => {
    orderObj.products.push({
      barcode: prod.barcode || "",
      barcodeNo: prod.barcodeNo || "",
      batches: prod.batches || [],
      commentImgs: prod.commentImgs || [],
      commentMsg: prod.commentMsg || "",
      description: prod.prodDesc || "",
      extraCharges: prod.extraCharges || {},
      gst: prod.gst || 0,
      gstExclusive: prod.gstExclusive || false,
      gstObj: {
        cgst: 0,
        igst: prod.gst || 0,
        sgst: 0,
        total: parseFloat(order.line_items[i].tax_lines[0].price) || 0,
        value: prod.gst || 0
      },
      hsn: prod.hsnCode || "",
      img: prod.images[0] || {},
      isCod: prod.isCod || false,
      maxQty: prod.maxQty || 0,
      minQty: prod.minQty || 0,
      mrpPrice: prod.prodPrice || 0,
      name: prod.prodName || "",
      price: prod.discountedPrice || 0,
      priceSlabs: prod.priceSlabs ? { active : prod.priceSlabs.active } : false,
      productId: prod.id || "",
      quantity: order.line_items[i].quantity || 0,
      shippingWt: prod.shippingWeight === null ? "0" : prod.shippingWeight.toString(),
      sku: prod.productCode || "",
      slug: {},
      status: prod.status || false,
      stopWhenNoQty: prod.stopWhenNoQty || false,
      totalQty: parseInt(prod.productQty) + order.line_items[i].quantity || "0",
      vendorId: prod.vendorId || "",
    })
  }) 
  return orderObj
}

function mapProductObj(resProduct) {
  let finalProduct = {
    prodName: resProduct.title,
    nameToSearch: resProduct.title,
    status: resProduct.status === 'active' ? true : false,
    barcodeNo: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    sortedAt: new Date(),
    productCode: '',
    productType: '',
    isPriceList: true,
    discountedPrice: '',
    prodPrice: '',
    productQty: '',
    shippingWeight: null,
    purchasePrice: '',
    priceList: [],
    variantType: 'weight',
    prodDesc: resProduct.body_html || '',
    hsnCode: '',
    gst: 0,
    brands: [],
    categories: projectId === 'bwi-arzonai-jewellery' ? ['IJYSJch7YxUyfg0jDJht'] : ['16W3fYyt4zj5mxbKsd5F'],
    color: {},
    searchKeywords: [],
    stopWhenNoQty: true,
    minQty: null,
    maxQty: null,
    images: [],
    coverPic: {
      url: resProduct.image ? resProduct.image.src : 'assets/img/placeholder-img.jpg',
      mob: resProduct.image ? resProduct.image.src : 'assets/img/placeholder-img.jpg',
      thumb: resProduct.image ? resProduct.image.src : 'assets/img/placeholder-img.jpg',
    }
  }
  // if (resProduct.variants.length == 1) {
  if (resProduct.variants[0].title === 'Default Title' && (resProduct.variants.length == 1)) {
    console.log('Normal product')
    finalProduct.isPriceList = false
    finalProduct.discountedPrice = parseFloat(resProduct.variants[0].price) || 0
    finalProduct.prodPrice = parseFloat(resProduct.variants[0].price) || 0
    finalProduct.purchasePrice = parseFloat(resProduct.variants[0].price) || 0
    finalProduct.productQty = resProduct.variants[0].inventory_quantity || 0
    finalProduct.productCode = resProduct.variants[0].sku || resProduct.title
    // finalProduct.priceList.push( {
      // price: parseFloat(resProduct.variants[0].price) || 0,
      // discountedPrice: parseFloat(resProduct.variants[0].price) || 0,
      // purchasePrice: parseFloat(resProduct.variants[0].price) || 0,
      // weight: resProduct.variants[0].title || '',
      // totalQuantity: resProduct.variants[0].inventory_quantity || 0,
      // shippingWeight: ''
    // } )
  } else {
    console.log('Variant product')
    let dp = 0, pp = 0, pq = 0
    resProduct.variants.map((resProd, i) => {
      dp += parseFloat(resProd.price)
      pp += parseFloat(resProd.price)
      pq += parseInt(resProd.inventory_quantity)
      finalProduct.priceList.push( {
        price: parseFloat(resProd.price) || 0,
        discountedPrice: parseFloat(resProd.price) || 0,
        purchasePrice: parseFloat(resProd.price) || 0,
        weight: resProd.title || '',
        totalQuantity: resProd.inventory_quantity || 0,
        shippingWeight: ''
      } )
    })
    finalProduct.discountedPrice = parseFloat(dp) || 0
    finalProduct.prodPrice = parseFloat(pp) || 0
    finalProduct.purchasePrice = parseFloat(pp) || 0
    finalProduct.productQty = pq || 0
    finalProduct.productCode = resProduct.variants[0].sku || resProduct.title
  }
  if (resProduct.images.length) {
    resProduct.images.map((img, i) => {
      finalProduct.images.push( {
        mob: img.src,
        thumb: img.src,
        url: img.src,
      } )
    })
  }
  return finalProduct
}

async function checkOrderId(orderId) {
  if (orderId) {
    return new Promise( async (resolve, reject) => {
      try {
        const orderRef = await db.collection('orders').where('integrationExtras.shopifyOrderId', '==', parseInt(orderId)).get();
        if (orderRef.empty) {
          console.log('No matching documents.');
          resolve({
            status: false
          })
          return 
        }
        let orderData
        orderRef.forEach(doc => {
          orderData = {...doc.data(), docId: doc.id}
        })
        resolve({
          status: true,
          data: orderData
        })
      } catch (error) {
        console.log('Error in check order id : ', error)
        resolve({
          status: false
        })
      }
    })
  }  
}

async function checkUserId(phoneNo) {
  return new Promise( async (resolve, reject) => {
    try {
      const userRef = await db.collection('users').where('phoneNo', '==', phoneNo.toString()).get()
      if (userRef.empty) {
        console.log('No matching documents.');
        resolve({
          status: false
        })
        return 
      }
      let userData
      userRef.forEach(doc => {
        userData = {...doc.data(), docId: doc.id}
      })
      resolve({
        status: true,
        data: userData
      })
    } catch (error) {
      console.log('Error in check user id : ', error)
      resolve({
        status: false
      })
    }
  })
}

async function checkProdName(prodName) {
  return new Promise( async ( resolve, reject ) => {
    try {
      let foundProduct = {}
      const productRef = await db.collection( 'products' ).where( 'prodName', '==', prodName ).get()
      if ( productRef.empty ) {
        resolve( {
          status: false
        } )
        return
      } else {
        productRef.forEach( ( prodDoc ) => {
          foundProduct = { ...prodDoc.data(), docId: prodDoc.id }
        } )
        resolve({
          status: true,
          data: foundProduct
        })
      }
    } catch ( error ) {
      console.log( 'Error in check product : ', error )
      resolve( {
        status: false
      } )
    }
  } )
}

async function checkProduct(products) {
  return new Promise( async (resolve, reject) => {
    try {
      let foundProducts = []
      for ( let i = 0; i < products.length; i++ ) {
        const productRef = await db.collection( 'products' ).where( 'prodName', '==', products[i].name ).get()
        if ( productRef.empty ) {
          resolve( {
            status: false
          } )
          return
        } else {
          productRef.forEach((prodDoc) => {
            foundProducts.push({...prodDoc.data(), docId: prodDoc.id})
          })
        }
      }
      if (products.length == foundProducts.length) {
        resolve({
          status: true,
          data: foundProducts
        })
      } else {
        resolve({
          status: false
        })
      }
    } catch (error) {
      console.log('Error in check product : ', error)
      resolve({
        status: false
      })
    }
  })
}

async function setShopifyWebhooks() {
  try {
    let supportedWebhookTopics = [
      // {
      //   urlSuffix: 'getShopifyCreatedOrders',
      //   topic : 'orders/create'
      // },
      // {
      //   urlSuffix: 'getShopifyCancelledOrders',
      //   topic : 'orders/cancelled'
      // },
      // {
      //   urlSuffix: 'getShopifyDeletedOrders',
      //   topic : 'orders/delete'
      // },
      // {
      //   urlSuffix: 'getShopifyFulfilledOrders',
      //   topic : 'orders/fulfilled'
      // },
      // {
      //   urlSuffix: 'getShopifyPaidOrders',
      //   topic : 'orders/paid'
      // },
      // {
      //   urlSuffix: 'getShopifyCreatedCustomers',
      //   topic : 'customers/create'
      // },
      // {
      //   urlSuffix: 'getShopifyCreatedProducts',
      //   topic : 'products/create'
      // },
      {
        urlSuffix: 'getShopifyUpdatedProducts',
        topic : 'products/update'
      }

    ]
    let configObj = {
      headers: {
          'Content-Type': 'application/json'
      }
    }
    for (const webhook of supportedWebhookTopics) {
      let apiBody = {
        webhook: {
          address: `https://us-central1-${ projectId }.cloudfunctions.net/testOrdersShopify_2-${ webhook.urlSuffix }`,
          format: "json",
          topic: webhook.topic,
          metafield_namespaces: [
            projectId
          ]
        }
      }
      // console.log('apiBody', apiBody)
      axios.post( `https://${ apiKey }:${ password }@${ shopName }.myshopify.com/admin/api/2022-07/webhooks.json`, JSON.stringify( apiBody ), configObj )
      .then(response => {
        console.log('Create Shopify Webhook TN : ', response.data)
      })
      .catch(error => {
        console.log('Error in Shopify Webhook IC : ', error)
      })
    }
  } catch (error) {
    console.log('Error in setShopifyWebhooks : ', error)
  }
}
// setShopifyWebhooks()

exports.getShopifyCreatedCustomers = functions.https.onRequest( async (req, res) => {
  res.sendStatus( 200 );
  const customer = req.body
  try {
    console.log( 'Received created customer name : ', customer.first_name )
    console.log( 'Received created customer phone : ', customer.phone )
    let userSate = await checkUserId(customer.phone)
    if (!userSate.status) {
      let userData = {
        phoneNumber: customer.phone,
        displayName: customer.last_name ? customer.first_name + ' ' + customer.last_name : customer.first_name
      }
      let dbUserData = await admin.auth().createUser(userData)
      let userId = dbUserData.uid
      console.log('customer created successfully : ', userId)
    } else {
      console.log('Customer already exists name : ', customer.name)
      console.log('Customer already exists phone : ', customer.phone)
    }
  } catch (error) { 
    console.log('Error in getShopifyCreatedCustomers : ', error)
  }
})

exports.getShopifyCreatedProducts = functions.https.onRequest( async (req, res) => {
  res.sendStatus( 200 );
  const product = req.body
  try {
    console.log( 'Received created product name : ', product.title )
    await timeDelay(10)
    let response = await getDetailedShopifyProductObj(product.id)
    await db.collection('integrations').doc('shopify').collection('testProductObj').doc(product.title).set({...response, createdAt: moment().tz(timeZone).toLocaleString()})

    let productState = await checkProdName(product.title)
    if (productState.status) {
      console.log('Product already exist!!!')
    } else {
      console.log('********************************')
      let formattedProduct = mapProductObj(response)
      // *** Add product *** 
      // console.log('formattedProduct : ', formattedProduct)
      await db.collection('products').add({...formattedProduct, integrationExtras: {shopifyProductId: product.id}})
    }

  } catch (error) { 
    console.log('Error in getShopifyCreatedProducts : ', error)
  }
})

exports.getShopifyUpdatedProducts = functions.https.onRequest( async (req, res) => {
  res.sendStatus( 200 );
  const product = req.body
  try {
    console.log( 'Received created product name : ', product.title )
    await timeDelay(10)
    let response = await getDetailedShopifyProductObj(product.id)
    let productState = await checkProdName(product.title)
    if (productState.status) {
      console.log('Product already exist!!!')
      let formattedProduct = mapProductObj(response)
      await db.collection('products').doc(productState.data.docId).update({...formattedProduct, integrationExtras: {shopifyProductId: product.id}})
    } else {
      console.log('No such product found!!!')
    }
  } catch (error) {
    console.log('Error in getShopifyUpdatedProducts : ', error) 
  }
} )

async function test222() {
  let productState = await checkProdName('BWI-001-N')
  console.log('state : ', productState)
  if (productState.status) {
    console.log('Product already exist!!!')
    let formattedProduct = mapProductObj(response)
    // await db.collection('products').doc(productState.data.docId).update({...formattedProduct, integrationExtras: {shopifyProductId: product.id}})
  } else {
    console.log('No such product found!!!')
  }
}
// test222()

async function testProdX() {
  let productDoc = await db.collection('integrations').doc('shopify').collection('testProductObj').doc('variant-401').get()
  let productData = productDoc.data()
  console.log('productData : ', productData)
  console.log('********************************')
  let productState = await checkProdName(productData.title)
  console.log('productState : ', productState)
  let formattedProduct = mapProductObj(productData)
      // *** Add product *** 
      console.log('********************************')
      console.log('formattedProduct : ', formattedProduct)
  process.exit()
}
// testProdX()

exports.getShopifyCreatedOrders = functions.https.onRequest( async (req, res) => {
  res.sendStatus( 200 );
  const order = req.body
  const orderId = req.body.order_number
  try {
    console.log( 'Received created orderId : ', orderId )
    console.log( 'Received created order : ', order.financial_status ) 
    await db.collection('integrations').doc('shopify').collection('testOrderObj').doc(orderId.toString()).set({...order, createdAt: moment().tz(timeZone).toLocaleString()})
    let orderState = await checkOrderId(orderId)
    if (!orderState.status) {
      console.log('New Order Found!!!', orderState)

      // *** Check Customer
      let customerState = await checkUserId(order.customer.phone)

      // *** Check Product
      let productState = await checkProduct(order.line_items)

      // *** Validate Order
      if (customerState.status && productState.status) {
        let formattedOrder = await mapOrderObj(order, 'create', productState.data, customerState.data)
        console.log('formattedOrder : ', formattedOrder)

        // *** Create Order
        await db.collection('orders').add({...formattedOrder, integrationExtras: { shopifyOrderId: orderId }})

      } else {
        console.log('failed to create order : ', orderId)
        console.log('failed customerState : ', customerState)
        console.log('failed productState : ', productState)
      }
    } else {
      console.log('Order already exists !!! : ', orderId)
      console.log('Order already exists data : ', orderState)
    }
  } catch (error) { 
    console.log('Error in getShopifyCreatedOrders : ', error)
  }
})

function formatDate(dateStr) {
  console.log('nd : ', new Date(dateStr))
  console.log('date : ', admin.firestore.Timestamp.fromDate(new Date(dateStr)))
  // return admin.firestore.Timestamp.fromDate(dateStr);
}
// formatDate('2023-02-11T09:56:56-05:00')

exports.getShopifyCancelledOrders = functions.https.onRequest( async (req, res) => {
  res.sendStatus( 200 );
  const order = req.body
  const orderId = req.body.order_number
  try {
    console.log( 'Received cancelled orderId : ', orderId )
    console.log( 'Received cancelled order : ', order.financial_status ) 
    let orderState = await checkOrderId(orderId)
    if (orderState.status) {
      await db.collection('orders').doc(orderState.data.docId).update({
        status: 'Cancelled'
      })
    } else {
      console.log('No Order Found : ', orderId)
    }
  } catch (error) {
    console.log('Error in getShopifyCancelledOrders : ', error)
  }
})

exports.getShopifyDeletedOrders = functions.https.onRequest( async (req, res) => {
  res.sendStatus( 200 );
  const order = req.body
  const orderId = req.body.order_number
  try {
    console.log( 'Received deleted orderId : ', orderId )
    console.log( 'Received deleted order : ', order.financial_status ) 
    let orderState = await checkOrderId(orderId)
    if (orderState.status) {
      await db.collection('orders').doc(orderState.data.docId).update({
        status: 'Rejected'
      })
    } else {
      console.log('No Order Found : ', orderId)
    }
  } catch (error) {
    console.log('Error in getShopifyDeletedOrders : ', error)
  }
})

exports.getShopifyFulfilledOrders = functions.https.onRequest( async (req, res) => {
  res.sendStatus( 200 );
  const order = req.body
  const orderId = req.body.order_number
  try {
    console.log( 'Received fulfilled orderId : ', orderId )
    console.log( 'Received fulfilled order : ', order.financial_status ) 
    let orderState = await checkOrderId(orderId)
    if (orderState.status) {
      await db.collection('orders').doc(orderState.data.docId).update({
        status: 'Confirmed'
      })
    } else {
      console.log('No Order Found : ', orderId)
    }
  } catch (error) {
    console.log('Error in getShopifyFulfilledOrders : ', error)
  }
})

exports.getShopifyPaidOrders = functions.https.onRequest( async (req, res) => {
  res.sendStatus( 200 );
  const order = req.body
  const orderId = req.body.order_number
  try {
    console.log( 'Received paid orderId : ', orderId )
    console.log( 'Received paid order : ', order.financial_status ) 
    let orderState = await checkOrderId(orderId)
    if (orderState.status) {
      await db.collection('orders').doc(orderState.data.docId).update({
        'payment.completed': true,
        'payment.status': 'completed',
        'status': 'Confirmed'
      })
    } else {
      console.log('No Order Found : ', orderId)
    }
  } catch (error) {
    console.log('Error in getShopifyPaidOrders : ', error)
  }
})

async function getDetailedShopifyProductObj(id) {
  let data = {}
  try {
    await shopify.product.get(id)
    .then((response) => {
      console.log('successfully fetched product : ')
      data = response
      return data
    })
    .catch((error) => {
      console.log('error in getImages IC : ', error)
    })
    return data
  } catch (error) {
    console.log('error in getImages OC : ', error)
  }
} 
// getDetailedShopifyProductObj(8135947026734)

const timeDelay = async (time) => {
  return new Promise(async (resolve, rejects) => {
      setTimeout(() => {
          resolve()
      }, time * 1000);
  })
}

