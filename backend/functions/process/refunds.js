const functions = require( "firebase-functions" );
var server = require( '../external/server' );
var router = require( '../external/router' );
const checksum_lib = require( '../external/paytm/checksum' );
const axios = require( 'axios' ).default;
const moment = require( 'moment-timezone' );
const {
  admin,
  db,
  websiteLink,
  currencyCode,
  timeZone,
  projectId,
} = require( './admin' );
const Razorpay = require( 'razorpay' );

async function getRazorpayCreds () {
  const razorpayRef = await db.collection( 'payment' ).doc( 'razorpay' ).get();
  const razorpay = razorpayRef.data();
  const keyId = razorpay.id;
  const keySecret = razorpay.keySecret;
  const InstantRefund = razorpay.instantRefund || false;
  return {
    keyId, keySecret, InstantRefund
  }
}

module.exports.processRazorpayRefund = async function ( data ) {
  try {
    let invokeTime = moment().tz(timeZone).toLocaleString()
    let { paymentId, invokingParty, orderDocId } = data
    const { keyId, keySecret, InstantRefund } = await getRazorpayCreds();
    const instance = new Razorpay( { key_id: keyId, key_secret: keySecret } );
    await instance.payments.refund( paymentId, {
      speed: InstantRefund ? ( InstantRefund === true ? 'optimum' : 'normal' ) : 'normal',
      notes: {
        notes_key_1: `Invoking Party - ${ invokingParty || 'N/A' }`,
        notes_key_2: `Invoking Time - ${invokeTime}`
      },
    }, async function ( err, refund ) {
      if ( err ) {
        console.log( 'Error while refunding!!!', err )
        return
      } else {
        if (refund.id) {
          console.log( 'Successful Refund Operation!!!', refund )
          await db.collection('orders').doc(orderDocId).update({
            'payment.details.refundId': refund.id
          })
        }
      }
    } ) 
  } catch (error) {
    console.log( 'Error in processRazorpayRefund : ', error )
  }
}

exports.processRazorpayRefundEndpoint = functions.https.onCall( async ( data, context ) => {
  try {
    await this.processRazorpayRefund(data)
  } catch ( error ) {
    console.log( 'Error in processRazorpayRefundEndpoint : ', error )
  }
} )

// async function testRefund() {
//   let orderDoc = await db.collection('orders').doc('iKM3ye7iKwkt3zVkSgOm').get()
//   let orderData = orderDoc.data()
//   if (orderData.payment.completed && orderData.payment.mode === 'razorpay' && orderData.paymentExtras.razorpayOrderId && orderData.payment.details.paymentId) {
//       let refundBody = {
//           paymentId: orderData.payment.details.paymentId,
//           invokingParty: projectId,
//           orderDocId: orderDoc.id
//       }
//       console.log(refundBody)
//       await this.processRazorpayRefund(refundBody)
//   }
// }
// testRefund()