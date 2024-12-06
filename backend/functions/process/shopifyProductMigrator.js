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
var moment = require( 'moment-timezone' );
const Shopify = require( 'shopify-api-node' );
const jewelryCollectionId = '291477160109'

async function initializeShopify ( mode ) {
  let integrationData = mode === 'sender' ? await getShopifySenderCreds() : getShopifyReceiverCreds()
  if ( integrationData.status ) {
    const shopify = new Shopify( {
      shopName: integrationData.data.storeName || integrationData.storeName,
      apiKey: integrationData.data.apiKey || integrationData.apiKey,
      password: integrationData.data.accessToken || integrationData.accessToken
    } )
    return {
      status: true,
      data: shopify
    }
  }
  return {
    status: false,
    reason: integrationData.reason
  }
}

async function getShopifySenderCreds () {
  try {
    let shopifyCredsDoc = await db.collection( 'integrations' ).doc( 'shopify' ).collection( 'list' ).doc( 'Shopify Products Sync' ).get()
    let shopifyCredsData = shopifyCredsDoc.data()
    if ( shopifyCredsData && shopifyCredsData.credentials.storeName && shopifyCredsData.credentials.accessToken && shopifyCredsData.credentials.apiKey ) {
      console.log( 'Shopify Creds Found !' )
      return {
        status: true,
        data: shopifyCredsData.credentials
      }
    } else {
      console.log( 'Shopify Creds Invalid !' )
      return {
        status: false,
        reason: `Shopify Creds Invalid !`
      }
    }
  } catch ( error ) {
    console.log( 'Error in getShopifySenderCreds : ', error )
    return {
      status: false,
      reason: `Error in getShopifySenderCreds : , ${ error }`
    }
  }
}

function getShopifyReceiverCreds () {
  return {
    status: true,
    data: {
      storeName: '',
      apiKey: '',
      accessToken: ''
    }
  }
}

async function getTotalCountOfShopifyProducts () {
  try {
    let totalProductsCount = null
    let shopifyState = await initializeShopify( 'sender' )
    if ( !shopifyState.status ) {
      return {
        status: false,
        reason: `Error in shopify state : ${ shopifyState.reason }`
      }
    }
    await shopifyState.data.product.count()
      .then( async ( response ) => {
        totalProductsCount = response
      } )
      .catch( ( error ) => {
        console.log( 'Error in product count : ', error )
      } )
    if ( ( totalProductsCount <= 0 ) || ( totalProductsCount === null ) ) {
      console.log( 'No product(s) on shopify !' )
      return {
        status: false,
        reason: 'No product(s) on shopify !'
      }
    }
    return {
      status: true,
      data: totalProductsCount
    }
  } catch ( error ) {
    console.log( 'Error in getTotalCountOfShopifyProducts : ', error )
    return {
      status: false,
      reason: `Error in getTotalCountOfShopifyProducts : ${ error }`
    }
  }
}

const timeDelay = async ( time ) => {
  return new Promise( async ( resolve, rejects ) => {
    setTimeout( () => {
      resolve()
    }, time * 1000 );
  } )
}

async function getAllShopifyProducts () {
  try {
    let totalProducts = [], totalProductsCount = 0;
    let totalProductsCountState = await getTotalCountOfShopifyProducts()
    if ( !totalProductsCountState.status ) {
      return {
        status: false,
        reason: `Error in getAllShopifyProducts : ${ totalProductsCountState.reason }`
      }
    }
    totalProductsCount = totalProductsCountState.data
    let shopifyState = await initializeShopify( 'sender' )
    if ( !shopifyState.status ) {
      return {
        status: false,
        reason: `Error in getAllShopifyProducts : ${ shopifyState.status }`
      }
    }
    await shopifyState.data.product.list( { limit: 250 } )
      .then( async ( response ) => {
        if ( response && response.length ) {
          for ( let i = 0; i < response.length; i++ ) {
            totalProducts.push( response[ i ] )
          }
        }
      } )
    if ( totalProducts.length <= 0 ) {
      return {
        status: false,
        reason: 'No product(s) Fetched !'
      }
    }
    console.log( 'total products Pass 1 : ', totalProducts.length, ' / ', totalProductsCount )
    let count = 1
    // while ( totalProducts.length < totalProductsCount ) {
    while ( totalProducts.length < 3028 ) {
      count++
      await timeDelay( 2 )
      await shopifyState.data.product.list( { limit: 250, since_id: totalProducts[ totalProducts.length - 1 ].id } )
        .then( async ( response ) => {
          for ( let i = 0; i < response.length; i++ ) {
            totalProducts.push( response[ i ] )
            if ( totalProducts.length == 3028 ) {
              break;
            }
          }
          console.log( `total products Pass ${ count } : `, totalProducts.length, ' / ', totalProductsCount )
        } )
    }
    console.log( 'total products final : ', totalProducts.length )
    if ( totalProducts.length ) {
      return {
        status: true,
        data: totalProducts
      }
    }
  } catch ( error ) {
    console.log( 'Error in getAllShopifyProducts : ', error )
    return {
      state: false,
      reason: `Error in getAllShopifyProducts : , ${ error }`
    }
  }
}

async function ImportProductsToShopifyReceiver () {
  try {
    let shopifyState = await initializeShopify( 'receiver' )
    if ( !shopifyState.status ) {
      return {
        status: false,
        reason: `Error in ImportProductsToShopifyReceiver [T1] : ${ shopifyState.status }`
      }
    }
    let fetchProductState = await getAllShopifyProducts()
    if ( !fetchProductState.status ) {
      return {
        status: false,
        reason: `Error in ImportProductsToShopifyReceiver [T2] : ${ fetchProductState }`
      }
    }
    for ( let i = 0; i < fetchProductState.data.length; i++ ) {
      // await timeDelay( 1 )
      let product = fetchProductState.data[ i ]
      let formattedProduct = formatProduct( product )
      await shopifyState.data.product.create( formattedProduct )
        .then( async ( response ) => {
          let pid = response.id
          await shopifyState.data.collect.create( {
            product_id: pid,
            collection_id: jewelryCollectionId
          } )
            .then( ( response ) => {
              console.log( `Added Successfully : ${i+1} / ${fetchProductState.data.length}`, response.position )
            } )
            .catch( ( error ) => {
              console.log('Error in ImportProductsToShopifyReceiver [IIC] : ', error)
            } )
        } )
        .catch( ( error ) => {
          console.log('Error in ImportProductsToShopifyReceiver [IC] : ', error)
        } )
    }
  } catch ( error ) {
    console.log( 'Error in ImportProductsToShopifyReceiver [OC] : ', error )
    return {
      status: false,
      reason: `Error in ImportProductsToShopifyReceiver [OC] : ${ error }`
    }
  }
}

function formatProduct ( product ) {
  let finalProduct = {
    product: {
      title: product.title,
      body_html: '',
      vendor: product.vendor,
      product_type: product.product_type,
      price: product.variants[ 0 ].price,
      sku: product.variants[ 0 ].sku,
      variants: [ {
        option1: product.variants[ 0 ].option1,
        price: product.variants[ 0 ].price,
        sku: product.variants[ 0 ].sku
      } ],
      tags: [],
      status: 'draft',
      images: [],
      image: {}
    }
  }
  if ( product.images.length ) {
    for ( let img of product.images ) {
      if ( img.src ) {
        finalProduct.product.images.push( {
          src: img.src
        } )
      }
    }
  }
  if ( product.image && product.image.src ) {
    finalProduct.product.image = {
      src: product.image.src
    }
  }
  if ( product.tags ) {
    finalProduct.product.tags = product.tags.split( ', ' )
  }
  return finalProduct.product
}

function formatProduct_Custom ( product ) {
  let finalProduct = {
    product: {
      title: product.title,
      body_html: '',
      vendor: product.vendor,
      product_type: product.product_type,
      price: product.variants[ 0 ].price,
      sku: product.variants[ 0 ].sku,
      variants: [],
      tags: [],
      status: 'draft',
      images: [],
      image: {}
    }
  }
  if ( product.variants && product.variants.length ) {
    product.variants.map( v => {
      finalProduct.product.variants.push({
        option1: v.option1,
        price: v.price,
        sku: v.sku,
      })
    })
  }
  if ( product.images.length ) {
    for ( let img of product.images ) {
      if ( img.src ) {
        finalProduct.product.images.push( {
          src: img.src
        } )
      }
    }
  }
  if ( product.image && product.image.src ) {
    finalProduct.product.image = {
      src: product.image.src
    }
  }
  if ( product.tags ) {
    finalProduct.product.tags = product.tags.split( ', ' )
  }
  return finalProduct.product
}


async function importExecutable () {
  let importState = await ImportProductsToShopifyReceiver()
  console.log( 'importState : ', importState )
}
// importExecutable()

exports.pushNewProductToShopifyReceiver = functions.https.onRequest( async (req, res) => {
  try {
    res.sendStatus(200)
    let product = req.body
    console.log('Received product : ', product)
    let shopifyState = await initializeShopify( 'receiver' )
    if ( !shopifyState.status ) {
      console.log(`Error in pushNewProductToShopifyReceiver : ${ shopifyState.status }`)
      return
    }
    let formattedProduct = formatProduct_Custom( product )
    await shopifyState.data.product.create( formattedProduct )
      .then( async ( response ) => {
        let pid = response.id
        await shopifyState.data.collect.create( {
          product_id: pid,
          collection_id: jewelryCollectionId
        } )
          .then( ( response ) => {
            console.log( `Added Successfully : `, response.position )
          } )
          .catch( ( error ) => {
            console.log( 'Error in pushNewProductToShopifyReceiver [IIC] : ', error )
          } )
      } )
      .catch( ( error ) => {
        console.log( 'Error in pushNewProductToShopifyReceiver [IC] : ', error )
      } )
  } catch (error) {
    console.log('Error in pushNewProductToShopifyReceiver [OC] : ', error)
  }
} )

async function createNewProductWebhook () {
  try {
    let shopifyState = await initializeShopify( 'sender' )
    if ( !shopifyState.status ) {
      return {
        status: false,
        reason: `Error in shopify state : ${ shopifyState.reason }`
      }
    }
    await shopifyState.data.webhook.create({
      address: 'https://us-central1-bwi-arzonai-jewellery.cloudfunctions.net/shopifyProductMigrator-pushNewProductToShopifyReceiver',
      topic: 'products/create',
      format: 'json',
    })
      .then( ( response ) => {
        console.log( 'Webhook created : ', response )
      } )
      .catch( ( error ) => {
        console.log( 'Error creating webhook : ', error )
      } )
  } catch ( error ) {
    console.log( 'Error in createNewProductWebhook [OC] : ', error )
  }
}
// createNewProductWebhook()

async function getCount () {
  const shopify = new Shopify( {
    shopName: 'arjonai.myshopify.com',
    apiKey: '2b65932fe21667f3e6f5446bd0d97b43',
    password: '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',
    // shopName: 'miniwesst.myshopify.com',
    // apiKey: '92a9cb6e288a9d7d961ca929172628ba',
    // password: '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'
  } )
  let product = {}
  await shopify.product.get( 8052536934675 )
    .then( async ( response ) => {
      product = response
      console.log( 'Response : ', product )
      let finalProduct = formatProduct( product )
      console.log( 'final Product : ', finalProduct )
      let shopifyState = await initializeShopify( 'receiver' )
      await shopifyState.data.product.create( finalProduct )
        .then( async ( response ) => {
          console.log( 'Product Created successfully : ', response.id )
          await shopifyState.data.collect.create( {
            product_id: response.id,
            collection_id: jewelryCollectionId
          } )
            .then( ( response ) => {
              console.log( 'response: ', response )
            } )
            .catch( ( err ) => {
              console.log( 'error: ', err )
            } )
        } )
    } )
    .catch( ( err ) => {
      console.log( 'Error : ', err )
    } )
}
// getCount()

async function testFetch() {
  const shopify = new Shopify( {
    shopName: 'arjonai.myshopify.com',
    apiKey: '2b65932fe21667f3e6f5446bd0d97b43',
    password: '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',
    // shopName: 'miniwesst.myshopify.com',
    // apiKey: '92a9cb6e288a9d7d961ca929172628ba',
    // password: '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'
  } )
  await shopify.product.get( 8214227386643 )
  .then( (response) => {
    console.log('response : ', response)
    let finalProduct = formatProduct_Custom(response)
    console.log('finalProduct : ', finalProduct)
  } )
}
// testFetch()

//576
//1380
//1533
//1802
//2758