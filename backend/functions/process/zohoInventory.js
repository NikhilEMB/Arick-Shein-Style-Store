const functions = require("firebase-functions");
var moment = require('moment-timezone');
const axios = require('axios').default;
const {
    db,
    timeZone
} = require('./admin');

exports.generateFirstTimeZohoInventoryToken = functions.firestore.document( 'integrations/inventoryManagement/list/zohoInventory' ).onUpdate( async ( change, context ) => {
  try {
    const inventoryCollection = await db.collection( 'integrations' ).doc( 'inventoryManagement' ).collection( 'list' ).get()
    if ( !inventoryCollection.empty ) {
      let docsArr = []
      inventoryCollection.forEach( ( doc ) => {
        docsArr.push( { name: doc.id, ...doc.data() } )
      } )
      if ( docsArr && docsArr.length ) {
        if ( docsArr.some( int => int.name === 'zohoInventory' ) ) {
          let zohoInventory = docsArr.find( int => int.name === 'zohoInventory' )
          console.log( zohoInventory )
          if ( zohoInventory.credentials.generateZohoAuthLink ) {
            let url = new URL( zohoInventory.credentials.generateZohoAuthLink )
            let authCode = url.searchParams.get( 'code' )
            if ( authCode ) {
              let clientId = zohoInventory.credentials.clientId
              let clientSecret = zohoInventory.credentials.clientSecret
              let redirect_uri = zohoInventory.credentials.redirectURI
              let oauth2URL = `https://accounts.zoho.in/oauth/v2/token?code=${ authCode }&client_id=${ clientId }&client_secret=${ clientSecret }&redirect_uri=${ redirect_uri }&grant_type=authorization_code`
              axios.post( oauth2URL )
                .then( async response => {
                  if ( response.data.hasOwnProperty( 'error' ) ) {
                    console.log( 'Zoho Inventory OAuth2.0 Error : ', response.data )
                  } else {
                    await db.collection( 'integrations' ).doc( 'inventoryManagement' ).collection( 'list' ).doc( 'zohoInventory' ).update( {
                      'credentials.oauth2Creds': response.data,
                      'credentials.unix': new Date()
                    } )
                    console.log( 'Zoho Inventory OAuth2.0 Success : ', response.data )
                  }
                } )
                .catch( error => {
                  console.log( 'Zoho Inventory Error Axios!!! : ', error )
                } )
            } else {
              console.log( 'Zoho Inventory Auth Code not found!!!' )
            }
          } else {
            console.log( 'Zoho Inventory Auth Link not setup in admin!!!' )
          }
        } else {
          console.log( 'Zoho Inventory not setup in admin!!!' )
        }
      }
    }
  } catch ( error ) {
    console.log( 'Zoho Inventory Catch : ', error )
  }
} )


async function test () {
  const inventoryCollection = await db.collection( 'integrations' ).doc( 'inventoryManagement' ).collection( 'list' ).get()
  if ( !inventoryCollection.empty ) {
    let docsArr = []
    inventoryCollection.forEach( ( doc ) => {
      docsArr.push( { name: doc.id, ...doc.data() } )
    } )
    if ( docsArr && docsArr.length ) {
      if ( docsArr.some( int => int.name === 'zohoInventory' ) ) {
        let zohoInventory = docsArr.find( int => int.name === 'zohoInventory' )
        console.log( zohoInventory )
        if ( zohoInventory.credentials.generateZohoAuthLink ) {
          let url = new URL( zohoInventory.credentials.generateZohoAuthLink )
          let authCode = url.searchParams.get( 'code' )
          if ( authCode ) {
            console.log('authCode : ', authCode)
            let clientId = zohoInventory.credentials.clientId
            let clientSecret = zohoInventory.credentials.clientSecret
            let redirect_uri = zohoInventory.credentials.redirectURI
            let oauth2URL = `https://accounts.zoho.in/oauth/v2/token?code=${ authCode }&client_id=${ clientId }&client_secret=${ clientSecret }&redirect_uri=${ redirect_uri }&grant_type=authorization_code`
            console.log('oauth2URL : ', oauth2URL)
            axios.post( oauth2URL )
              .then( async response => {
                if ( response.data.hasOwnProperty( 'error' ) ) {
                  console.log( 'Zoho Inventory OAuth-2.0 Error : ', response.data )
                } else {
                  await db.collection( 'integrations' ).doc( 'inventoryManagement' ).collection( 'list' ).doc( 'zohoInventory' ).update( {
                    'credentials.oauth2Creds': response.data,
                    'credentials.unix': Math.round((new Date()).getTime() / 1000)
                  } )
                  console.log( 'Zoho Inventory OAuth2.0 Success : ', response.data )
                }
              } )
              .catch( error => {
                console.log( 'Zoho Inventory Error Axios!!! : ', error )
              } )
          } else {
            console.log( 'Zoho Inventory Auth Code not found!!!' )
          }
        } else {
          console.log( 'Zoho Inventory Auth Link not setup in admin!!!' )
        }
      } else {
        console.log( 'Zoho Inventory not setup in admin!!!' )
      }
    }
  }
}
// test()

async function dbTest() {
  const productRef = await db.collection('products').get()
  if (productRef.empty) {
    console.log('No products found!!!')
  } else {
    productRef.forEach(doc => {
      console.log('product name : ', doc.data().prodName)
    })
  }
}
// dbTest()