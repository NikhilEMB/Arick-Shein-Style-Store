const functions = require('firebase-functions');
const admin = require("firebase-admin");
const serviceAccount = require("../service-account.json");
const getSymbolFromCurrency = require('currency-symbol-map')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pt-app-4148f.firebaseio.com",
  storageBucket: "pt-app-4148f.appspot.com"
});
const db = admin.firestore();
const bucket = admin.storage().bucket();
const adminName = "PT APP";
const algolia = {
  id: 'DEYL6OZL2B',
  adminKey: '475f38e9439f62cbfd03050c3a464677',
  searchKey: 'd7f75c2a6d20c84da946c70a08039dbc'
}

const projectId = serviceAccount.project_id;
const orderIdPrefix = "ORD";
const googleMapKey =  "AIzaSyCeLpuoKnSjox3aZAKf0OB_cn0KGXhl_hA"; 
const currencyCode = 'INR';
const coutryPhoneCode = '+91';
const currencySymbol = getSymbolFromCurrency(currencyCode);
const country = 'India';
const taxType = 'GST';
const smsKey = '325590AZyHeLCvgrz5e8b22a1P1';
const WEB_API_KEY = 'AIzaSyBi6HFutTey8x5UCzgWeZW-75ne6Y-_Rrg';
const allowOpenSearch = false;
const emailId = 'ptapp@estore.business'
const sendGridKey = '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';
const smsSenderId = 'BWINNO'

const dynamicLinkInfo = {
  domainUriPrefix: 'https://ptapp.buildwithinnovation.com/share',
  deepLinkURL: 'https://ptapp.buildwithinnovation.com/product-details',
  androidPackageName: 'com.bwi.store.ptapp',
  iosBundleId: 'com.bwi.store.ptapp'
}

const websiteLink = 'https://grocerydemo.buildwithinnovation.com';

const referralLinkInfo = {
  domainUriPrefix: 'https://ptapp.buildwithinnovation.com/refer',
  deepLinkURL: 'https://ptapp.buildwithinnovation.com/',
  androidPackageName: 'com.bwi.store.ptapp',
  iosBundleId: 'com.bwi.store.ptapp'
}
const timeZone = 'Asia/Kolkata';
const taxName = 'PAN No.';
const firebaseLocation = 'us-central1';
const middleware = {
  apiUrl: `https://${firebaseLocation}-bwi-middleware.cloudfunctions.net`
}

module.exports = {
  admin,
  db,
  bucket,
  adminName,
  projectId,
  algolia,
  orderIdPrefix,
  googleMapKey,
  currencySymbol,
  country,
  taxType,
  smsKey,
  WEB_API_KEY,
  dynamicLinkInfo,
  coutryPhoneCode,
  allowOpenSearch,
  referralLinkInfo,
  websiteLink,
  timeZone,
  emailId,
  sendGridKey,
  smsSenderId,
  taxName,
  middleware
}

