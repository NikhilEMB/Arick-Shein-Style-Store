const functions = require( "firebase-functions" );
var moment = require( 'moment-timezone' );
const axios = require( 'axios' ).default;
const {
  db,
  timeZone,
  middleware,
  projectId
} = require( './admin' );
const rawUrl = 'https://us-central1-bwi-middleware-dev.cloudfunctions.net'

exports.addNewUserToZohoInventory = functions.firestore.document( 'users/{userId}' ).onCreate( async ( snap, context ) => {
  try {
    const userData = snap.data()
    const userDocId = context.params.userId
    userData[ 'userDocId' ] = userDocId
    if ( userData.role === 'user' ) {
      let apiBody = {
        projectId: projectId,
        user: userData
      }
      axios.post( middleware.apiUrl + '/zohoInventoryCustomers-addNewUserToZohoInventory', apiBody )
        .then( response => {
          console.log( 'Success response : ', response.data )
        } )
        .catch( error => {
          console.log( 'Error in addNewUserToZohoInventory IC : ', error )
        } )
    }
  } catch ( error ) {
    console.log( 'Error in addNewUsersToZohoInventory OC : ', error )
  }
} )

exports.updateUserOnZohoInventory = functions.firestore.document( 'users/{userId}' ).onUpdate( async ( change, context ) => {
  try {
    const afterUserData = change.after.data()
    const beforeUserData = change.before.data()
    const userDocId = context.params.userId
    if ( afterUserData.role === 'user' && beforeUserData.role === 'user' ) {
      afterUserData[ 'userDocId' ] = userDocId
      let apiBody = {
        projectId: projectId,
        user: afterUserData
      }
      axios.post( middleware.apiUrl + '/zohoInventoryCustomers-updateUserOnZohoInventory', apiBody )
        .then( response => {
          console.log( 'Success response : ', response.data )
        } )
        .catch( error => {
          console.log( 'Error in updateUserOnZohoInventory IC : ', error )
        } )
    }
  } catch ( error ) {
    console.log( 'Error in updateUserOnZohoInventory OC : ', error )
  }
} )

exports.addExistingUsersToZohoInventory = functions.https.onCall( async ( data, context ) => {
  try {
    const projectId = data.projectId
    const zohoIntegrationDoc = await db.collection( 'integrations' ).doc( 'inventoryManagement' ).collection( 'list' ).doc( 'zohoInventory' ).get()
    const zohoIntegrationData = zohoIntegrationDoc.data()
    if ( zohoIntegrationData.initCustomerSync === true ) {
      let userArr = []
      const userRef = await db.collection( 'users' ).where( 'role', '==', 'user' ).get()
      if ( userRef.empty ) {
        console.log( 'No users found for project : ', projectId )
      } else {
        userRef.forEach( ( user ) => {
          if (user.data().defaultAddress) {
            let userData = user.data()
            userData['userDocId'] = user.id
            userArr.push( userData )
          }
        } )
      }
      if ( userArr.length ) {
        let apiBody = {
          projectId: projectId,
          users: userArr
        }
        axios.post( middleware.apiUrl + '/zohoInventoryCustomers-addExistingUsersToZohoInventory', apiBody )
          .then( response => {
            console.log( 'Success response : ', response.data )
          } )
          .catch( error => {
            console.log( 'Error in addExistingUsersToZohoInventory IC : ', error )
          } )
      }
    } else {
      console.log( 'ZohoIntegrationData initCustomerSync disabled!' )
    }
  } catch ( error ) {
    console.log( 'Error in addExistingUsersToZohoInventory OC : ', error )
  }
} )