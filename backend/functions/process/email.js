const { db, websiteLink, currencySymbol, taxType, emailId, sendGridKey, middleware } = require('./admin');
const functions = require("firebase-functions");
const handlebars = require("handlebars");
const nodemailer = require('nodemailer');
const fs = require('file-system');
const axios = require('axios').default;
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

handlebars.registerHelper('ifCond', function(product, options) {
  if(product.hasOwnProperty('pack')) {
    return options.fn(this);
  }
  return options.inverse(this);
});

handlebars.registerHelper('ifCondPieces', function(product, options) {
  if(product.hasOwnProperty('pack') && product.pack.variantType === 'pieces') {
    return options.fn(this);
  }
  return options.inverse(this);
});

async function updateEmailCount(){
  const emailRef = db.collection('analytics').doc('emails');

  await db.runTransaction(t => {
    return t.get(emailRef)
        .then(doc => {
            var emailDoc = doc.data();
            t.update(emailRef, {
                count: emailDoc.count + 1
            });
        });
  });
  return;
}

async function verifyEmailLimit(){
  let analyticsDoc = await db.collection('analytics').doc('emails').get();
  const analyticsData = analyticsDoc.data();
  if (analyticsData && analyticsData['total'] && analyticsData['total'] - analyticsData['count'] > 0) {

    return true;
  }
  else{
    return false;
  }
}

var customEmail = {
  active: false,
  email: '',
  apiKey: ''
}

const options = {
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: sendGridKey
  }
}
async function sendEmail(hbsTemplate, sendTo, subject){

  let senderEmail = 'noreply@estore.business';
  if (customEmail.active) {
    senderEmail = customEmail.email;
    options.auth.pass = customEmail.apiKey;
  } else{
    await updateEmailCount();
  }
  let storeData = await db.collection('settings').doc('store').get();
  const storeEmailId = storeData.data().storeEmail;
  let email = {
    from: senderEmail,   // Should be verified in SendGrid under sender identity
    to: sendTo,
    cc: storeEmailId,
    subject: subject ? subject : 'Details',
    html: hbsTemplate
  };
  console.log(`email From: ${senderEmail} +++++ Email to:: ${sendTo}`);
  let client = nodemailer.createTransport(options);
  client.sendMail(email, async function(err, info){
      if (err){ console.log(err);  return null;}
      else {
        console.log('Message sent: ' + info.response);
        return null;
      }
  });

}

async function getDynamicProductLink(productId){
  const productDetails = await db.collection('products').doc(productId).get();
  if (productDetails && productDetails.data()) {
    const productLink = productDetails.data().dynamicLink ? productDetails.data().dynamicLink : websiteLink ;
    return productLink;
  } else{
    return websiteLink;
  }
}
function getTotalAmount(bookingDoc) {
  return {
    totalAmount: bookingDoc.item.price + (bookingDoc.payment.extraChargeOnPayment && bookingDoc.payment.extraChargeOnPayment.charge ? bookingDoc.payment.extraChargeOnPayment.charge : 0),
    totalGst: bookingDoc.item.totalGst
  }
}

async function prepareTemplateAndSendMail(fileData, orderDoc, status){
  let source = fileData.toString();
  let template = handlebars.compile(source);
  const settings = await db.collection('settings').doc('store').get();
  const settingsData = settings.data();
  
  let socialMedia = [];
  for (const key in settingsData) {
    if(key === 'facebookUrl'){
      socialMedia.push({url: settingsData[key], img: websiteLink+'/assets/emails/facebook.png'});
    }
    if (key === 'instagramUrl'){
      socialMedia.push({url: settingsData[key], img: websiteLink+'/assets/emails/instagram.png'});
    }
    if (key === 'twitterUrl'){
      socialMedia.push({url: settingsData[key], img: websiteLink+'/assets/emails/twitter.png'});
    }
    if (key === 'youtubeUrl'){
      socialMedia.push({url: settingsData[key], img: websiteLink+'/assets/emails/youtube.png'});
    }
  }
  let userDetails;
  let orderData;
  if (orderDoc.bookingId) {
    userDetails = await db.collection('users').doc(orderDoc.user.id).get();
    let product = orderDoc.item;
    if(product.coverPic.url.includes('assets/img')){
      product.coverPic.url =  websiteLink+'/assets/img/img-placeholder.png';
    }
    product.itemPrice = parseFloat((product.price - product.addOns.totalPrice - (product.gst.isExclusive ? product.gst.total : 0)).toFixed(2));
    product['dynamicLink'] = await getDynamicProductLink(product.id);
    orderData = {
      'orderDoc': orderDoc,
      'orderDate': orderDoc.createdAt.toDate().toDateString(),
      'product': product,
      'wallet': 0,
      'hasAddons': product.addOns.selectedOptions.length || 0,
      'defaultGst': getTotalAmount(orderDoc),
      'total': getTotalAmount(orderDoc),
      'settingsData': settingsData,
      'websiteLink': websiteLink,
      'termsAndCondition': websiteLink + '/terms-and-conditions',
      'logo': websiteLink+'/assets/img/shop-logo-center.png',
      'currencySymbol': currencySymbol,
      'taxType': taxType,
      'socialMedia': socialMedia
    };
    
  } else {
    userDetails = await db.collection('users').doc(orderDoc.userId).get();
    let products = [];
    //let subTotal = 0;
    for (let product of orderDoc.products) {
      if(product.img.url.includes('assets/img')){
        product.img.url =  websiteLink+'/assets/img/img-placeholder.png';
      }
      product.price = parseFloat(((product.price - (product.gstObj.total/product.quantity)) * product.quantity).toFixed(2));
      //subTotal += product.price; 
      let productDynamicLink = await getDynamicProductLink(product.productId);
      product['dynamicLink'] = productDynamicLink;
      products.push(product);
    }
    orderDoc.delivery = orderDoc.delivery ? orderDoc.delivery : 0;
    orderDoc.defaultGst = parseFloat(orderDoc.defaultGst.toFixed(2));
    let total = parseFloat(orderDoc.totalAmountToPaid.toFixed(2));
    let subTotal = parseFloat((orderDoc.totalMrp - orderDoc.defaultGst).toFixed(2));
    let offerDiscount = parseFloat((orderDoc.discountOnMrp ? orderDoc.discountOnMrp : 0).toFixed(2));
    let couponDiscount = parseFloat((orderDoc.couponDiscount ? orderDoc.couponDiscount : 0).toFixed(2));
    let walletAmount = orderDoc.walletAmount ? orderDoc.walletAmount : 0;
    let cashbackAmount = orderDoc.cashbackAmount ? orderDoc.cashbackAmount : 0;
    let wallet = parseFloat((walletAmount + cashbackAmount).toFixed(2));
    let storePickupCharges = 0;
    if (orderDoc.storePickupObj) {
      storePickupCharges = orderDoc.storePickupObj.charges ? orderDoc.storePickupObj.charges : 0;
    }
    let additionalDiscount = orderDoc.additionalDiscount ? orderDoc.additionalDiscount : 0;
    orderData = {
      'orderDoc': orderDoc,
      'orderDate': orderDoc.createdAt.toDate().toDateString(),
      'products': products,
      'subTotal': subTotal,
      'offerDiscount': offerDiscount,
      'couponDiscount': couponDiscount,
      'storePickupCharges': storePickupCharges,
      'additionalDiscount': additionalDiscount,
      'wallet' : wallet,
      'total': total - wallet,
      'settingsData': settingsData,
      'websiteLink': websiteLink,
      'termsAndCondition': websiteLink + '/terms-and-conditions',
      'logo': websiteLink+'/assets/img/shop-logo-center.png',
      'currencySymbol': currencySymbol,
      'taxType': taxType,
      'socialMedia': socialMedia,
      'cancelOrReject': status
    };
  }
  
  if (userDetails && userDetails.data()) {
    if (userDetails.data().hasOwnProperty('email')) {
      if (userDetails.data().email.length > 0) {
        const sendTo = userDetails.data().email;
        let hbsTemplate = template(orderData);
        let subject = 'Order Details';
        if (orderDoc.orderId) {
          subject = `Order Details with OrderID: ${orderDoc.orderId}`;
        }else if (orderDoc.bookingId) {
          subject = `Booking Details with BookingID: ${orderDoc.bookingId}`;
        }
        sendEmail(hbsTemplate, sendTo, subject);
      }
    }
  }
}

async function sendOrderPlacedMail(orderDoc){
  
  fs.readFile('./email-templates/order-placed/orderPlaced.hbs', function(err, fileData){
    if (fileData) {
      prepareTemplateAndSendMail(fileData, orderDoc, '');
    } else {
      console.log('error in reading file:', err);
    }
  });
}

async function sendOrderConfirmedMail(orderDoc){

  fs.readFile('./email-templates/order-confirmed/orderConfirmed.hbs', function(err, fileData){
    if (fileData) {
      prepareTemplateAndSendMail(fileData, orderDoc, '');
    } else {
      console.log('error in reading file:', err);
    }
  });
}

async function sendBookingMail(orderDoc){
  fs.readFile('./email-templates/booking/booking.hbs', function(err, fileData){
    if (fileData) {
      prepareTemplateAndSendMail(fileData, orderDoc, '');
    } else {
      console.log('error in reading file:', err);
    }
  });
}

async function sendOrderDispatchedMail(orderDoc){
  
  fs.readFile('./email-templates/order-dispatched/orderDispatched.hbs', function(err, fileData){
    if (fileData) {
      prepareTemplateAndSendMail(fileData, orderDoc, '');
    } else {
      console.log('error in reading file:', err);
    }
  });
}

async function sendOrderDeliveredMail(orderDoc){
 
  fs.readFile('./email-templates/order-delivered/orderDelivered.hbs', function(err, fileData){
    if (fileData) {
      prepareTemplateAndSendMail(fileData, orderDoc, '');
    } else {
      console.log('error in reading file:', err);
    }
  });
}
async function sendOrderCancelledMail(orderDoc, status){
 
  fs.readFile('./email-templates/order-cancelled/orderCancelled.hbs', function(err, fileData){
    if (fileData) {
      prepareTemplateAndSendMail(fileData, orderDoc, status);
    } else {
      console.log('error in reading file:', err);
    }
  });
}

async function customEmailConfig(){
  const settingsEmail = await db.collection('settings').doc('email').get();
  if (settingsEmail.data() && settingsEmail.data().email) {
    customEmail.active = settingsEmail.data().active;
    customEmail.email = settingsEmail.data().email;
    customEmail.apiKey = settingsEmail.data().apiKey;
  } else {
    customEmail.active = false;
  }
}

exports.onUpdateOrder = functions.firestore
    .document('orders/{orderId}').onUpdate(async (change, context) => {
      await customEmailConfig();

        if(verifyEmailLimit() || customEmail.active){
            const orderId = context.params.orderId;
            const orderDocBefore = change.before.data();
            const orderDocAfter = change.after.data();

              if(orderDocAfter.status === 'Confirmed' && orderDocBefore.status == 'Pending') {
                sendOrderConfirmedMail(orderDocAfter);
              } else if(orderDocAfter.status === 'Dispatched' && orderDocBefore.status != 'Dispatched'){
                sendOrderDispatchedMail(orderDocAfter);
              } else if(orderDocAfter.status === 'Cancelled' && orderDocBefore.status != 'Cancelled' ){
                sendOrderCancelledMail(orderDocAfter, 'Cancelled');
              } else if(orderDocAfter.status === 'Rejected' && orderDocBefore.status != 'Rejected' ){
                sendOrderCancelledMail(orderDocAfter, 'Rejected');
              } else if(orderDocAfter.status === 'Delivered' && orderDocBefore.status != 'Delivered'){
                sendOrderDeliveredMail(orderDocAfter);
              } else if(orderDocAfter.status === 'Pending' && orderDocBefore.status != 'Pending'){
                sendOrderPlacedMail(orderDocAfter);
              } 
              else if(orderDocAfter.status === 'Confirmed' && orderDocBefore.orderId == null && orderDocAfter.orderId != null){
                console.log('inside confiremd');
                if(orderDocAfter.payment && (orderDocAfter.payment.completed || orderDocAfter.payment.mode === 'cash')){
                  sendOrderConfirmedMail(orderDocAfter);
                }
              }
            }
    });

  exports.onUpdateBooking = functions.firestore
    .document('bookings/{bookingId}').onUpdate(async (change, context) => {
      await customEmailConfig();
        if(verifyEmailLimit() || customEmail.active){
            const bookingId = context.params.bookingId;
            const orderDocBefore = change.before.data();
            const orderDocAfter = change.after.data();

              if((orderDocAfter.status !== orderDocBefore.status) && orderDocAfter.bookingId ) {
                sendBookingMail(orderDocAfter);
              }
            }
    });


    async function prepareTemplate(fileData, userQueryDetails, adminDetails){
      let source = fileData.toString();
      let template = handlebars.compile(source);
      const settings = await db.collection('settings').doc('store').get();
      const settingsData = settings.data();
      let details = {
        'adminDetails': adminDetails,
        'userQueryDetails': userQueryDetails,
        'settingsData': settingsData,
        'termsAndCondition': websiteLink + '/terms-and-conditions',
        'logo': websiteLink+'/assets/img/shop-logo-center.png',
      };
      if (adminDetails) {
        if (adminDetails.hasOwnProperty('email')) {
          if (adminDetails.email.length > 0) {
            const sendTo = adminDetails.email;
            let hbsTemplate = template(details);
            sendEmail(hbsTemplate, sendTo, 'Query');
          }
        }
      }
    }
    async function sendEnquiryMailToAdmin(userQueryDetails, adminDetails){
      const settingsEmail = await db.collection('settings').doc('email').get();
      if (settingsEmail.data() && settingsEmail.data().email) {
        customEmail.active = settingsEmail.data().active;
        customEmail.email = settingsEmail.data().email;
        customEmail.apiKey = settingsEmail.data().apiKey;
      }
      fs.readFile('./email-templates/contact-us/contactUs.hbs', function(err, fileData){
        if (fileData) {
          prepareTemplate(fileData, userQueryDetails, adminDetails);
        } else {
          console.log('error in reading file:', err);
        }
      });
    }
    
    exports.onCreateContactUs = functions.firestore
        .document('contactUs/{id}').onCreate(async (snap, context) => {
          const userQueryDetails = snap.data();
          const contactUsSettings = await db.collection('settings').doc('contactUs').get();
          if (contactUsSettings && contactUsSettings.data() && contactUsSettings.data().receiveMail) {
            const adminDocs = await db.collection('users').where('role', '==', 'admin').get();
            // ! OLD CODE
            for (const adminDoc of adminDocs) {
              await sendEnquiryMailToAdmin(userQueryDetails, adminDoc.data());
            }
            // ! NEW CODE
            try {
              let storeData = await db.collection('settings').doc('store').get();
              const storeEmailId = storeData.data().storeEmail;
              const settingsEmail = await db.collection('settings').doc('email').get();
              const settings = await db.collection('settings').doc('store').get();
              const settingsData = settings.data();
              const data = {
                adminDocs: adminDocs,
                userQueryDetails: userQueryDetails,
                settingsEmail: settingsEmail,
                settingsData: settingsData,
                storeEmailId: storeEmailId,
              }
              
              axios.post(`${middleware.apiUrl}/email-onCreateContactUs`, data)
              .then(function (response) {

              })
              .catch(function (err) {

              })

            } catch (error) {
              
            }
          }
      });

async function sendFormMailToAdmin(userQueryDetails, adminDetails) {
  const settingsEmail = await db.collection('settings').doc('email').get();
  if (settingsEmail.data() && settingsEmail.data().email) {
    customEmail.active = settingsEmail.data().active;
    customEmail.email = settingsEmail.data().email;
    customEmail.apiKey = settingsEmail.data().apiKey;
  }
  fs.readFile('./email-templates/form/formSubmitted.hbs', function (err, fileData) {
    if (fileData) {
      prepareTemplate(fileData, userQueryDetails, adminDetails);
    } else {
      console.log('error in reading file:', err);
    }
  });
}

exports.onCreateFormSubmission = functions.firestore.document('forms/{id}').onCreate(async (snap, context) => {
  const formDetails = snap.data()
  const formContext = context.params.id
  console.log('formsDetails : ', formDetails);
  console.log('formsContext : ', formContext);
  const userDetails = await db.collection('users').doc(formDetails.userId.toString()).get();
  const adminDocs = await db.collection('users').where('role', '==', 'admin').get();
  for (const adminDoc of adminDocs) {
    await sendFormMailToAdmin(userDetails.data(), adminDoc.data());
  }
})

async function test() {
  const formDetails = await db.collection('forms').doc('Awhquc7tOBEgTlmjisrR').get()
  const adminDoc = await db.collection('users').doc('WlmyljIuVSRUj8ddXHpBBvUqPoq1').get();
  // await sendFormMailToAdmin(formDetails, adminDoc.data());
  console.log('formDetails : ', formDetails.data().userId);
  if (formDetails.data().userId) {
    let user = await db.collection('users').doc(formDetails.data().userId.toString()).get();
    console.log('admin : ', user.data());
  }
}
// test()

// async function PrepareTosendEmail(){
//   const settingsEmail = await db.collection('settings').doc('email').get();
//   if (settingsEmail.data() && settingsEmail.data().email) {
//     customEmail.active = settingsEmail.data().active;
//     customEmail.email = settingsEmail.data().email;
//     customEmail.apiKey = settingsEmail.data().apiKey;
//   } else {
//     customEmail.active = false;
//   }
//     const orderDocAfter = await db.collection('orders').doc('xXWxoGrBBjKn2UXzyhvj').get();
//     sendOrderConfirmedMail(orderDocAfter.data());
// };

// PrepareTosendEmail();

async function PrepareTosendEmail(){
  let adminDocsArr = [];
  const userQueryDetails = await db.collection('contactUs').doc('F1V42d0r8vm9Mva9h0NI').get()
  // * Working
  const adminDocs = await db.collection('users').where('role', '==', 'admin').get();
  adminDocs.forEach(function (adminDoc) {
    // console.log('adminDoc : ', adminDoc.data());
    adminDocsArr.push(adminDoc.data())
  })
  // * Working
  let storeData = await db.collection('settings').doc('store').get();
  const storeEmailId = storeData.data().storeEmail;
  // * Working
  const settingsEmail = await db.collection('settings').doc('email').get();
  // * Working
  const settings = await db.collection('settings').doc('store').get();
  const settingsData = settings.data();
  const data = {
    adminDocs: adminDocsArr,
    userQueryDetails: userQueryDetails, 
    settingsEmail: settingsEmail,
    settingsData: settingsData,
    storeEmailId: storeEmailId,
  }
  // console.log('storeEmailId : ', data);
              
  axios.post(`${middleware.apiUrl}/email-onCreateContactUs`, data)
  .then(function (response) {
    console.log('response : ', response.data);
  })
  .catch(function (err) {
    console.log('err : ', err);
  })
};

// PrepareTosendEmail();

async function testQuery() {
  let adminDocsArr = []

  // * Working
  // const settings = await db.collection('settings').doc('store').get();
  // const settingsData = settings.data();
  // console.log('settingsData : ', settingsData);

  // * Working
  // const settingsEmail = await db.collection('settings').doc('email').get();
  // console.log('settingsEmail : ', settingsEmail.data());

  // * Working [ Returns Empty ]
  let storeData = await db.collection('settings').doc('store').get();
  const storeEmailId = storeData.data().storeEmail;
  console.log('storeEmailId : ', storeEmailId);

  // * Working [ Diff Looping ]
  // const adminDocs = await db.collection('users').where('role', '==', 'admin').get();
  // adminDocs.forEach(function (adminDoc) {
  //   // console.log('adminDoc : ', adminDoc.data());
  //   adminDocsArr.push(adminDoc.data())
  // })

  // const data = {
  //   adminDocs: adminDocsArr
  // }

  // axios.post(`${middleware.apiUrl}/email-onCreateContactUs`, data)
  // .then(function (response) {
  //   console.log('response : ', response.data);
  // })
  // .catch(function (err) {
  //   console.log('err : ', err);
  // })
}

// testQuery()

let websitePopUpCoupon

const getWebsitePopUpCouponDetails = async () => {
  if (!websitePopUpCoupon) {
    await new Promise(async (resolve) => {
      await db.collection('/features/coupons/codes').where('websitePopUpCoupon', '==', true).onSnapshot((docs) => {
        docs.forEach((doc) => {
          if (doc && doc.data()) {
            websitePopUpCoupon = doc.data()
            console.log("fetched websitePopUpCoupon creds")
          }
        })
        resolve()
      })
    })
  }
  return websitePopUpCoupon
}

//send coupones to user email
exports.sendCouponsToUserEmail = functions.https.onCall(async (data) => {
  if (data && data.email) {
    if (await getWebsitePopUpCouponDetails()) {
      const { maxDiscount,type,name,amount} = websitePopUpCoupon
      let msg=''
      if(type=='percentage'){
        msg=`<p>Use coupon <strong>${name}</strong> and get ${amount}% off upto ${maxDiscount}*.</p>`
      }
      else if(type=='flat'){
        msg=`<p>Use coupon <strong>${name}</strong> and get flat ${currencySymbol?currencySymbol:"₹"}${amount}*.</p>`
      }
      if(msg){
        await sendEmail(msg, data.email,'Special offer for you')
      }
    }
  }
})
