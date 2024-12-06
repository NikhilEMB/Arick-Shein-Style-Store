// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // firebase: {
  //   apiKey: "AIzaSyBy3NENBO-6_Rl5-NqOR2gh6tq4wj_DWcw",
  //   authDomain: "bwi-cthp.firebaseapp.com",
  //   projectId: "bwi-cthp",
  //   storageBucket: "bwi-cthp.appspot.com",
  //   messagingSenderId: "1030192852776",
  //   appId: "1:1030192852776:web:46c81eba98b64d850f2a1d",
  //   measurementId: "G-KPX7CDPTTP"
  // },
  firebase: {
    // apiKey: "AIzaSyBi6HFutTey8x5UCzgWeZW-75ne6Y-_Rrg",
    // authDomain: "pt-app-4148f.firebaseapp.com",
    // databaseURL: "https://pt-app-4148f.firebaseio.com",
    // projectId: "pt-app-4148f",
    // storageBucket: "pt-app-4148f.appspot.com",
    // messagingSenderId: "966816629874",
    // appId: "1:966816629874:web:2bae2a65d2cfeb8b932eeb"  

    apiKey: "AIzaSyAocXtMQCtr_u_fZvJ2Nee7VBwRPD0Dg-U",
    authDomain: "bwi-shein.firebaseapp.com",
    projectId: "bwi-shein",
    storageBucket: "bwi-shein.appspot.com",
    messagingSenderId: "876688672852",
    appId: "1:876688672852:web:330ceb480d0aa9739d85c1",
    measurementId: "G-1KDLLJZXQ9"
    
  // apiKey: "AIzaSyA8qQBWDVwubpM5RoFLFeDuyQu02dBkkkI",
  // authDomain: "bwi-baby-products-demo.firebaseapp.com",
  // databaseURL: "https://bwi-baby-products-demo.firebaseio.com",
  // projectId: "bwi-baby-products-demo",
  // storageBucket: "bwi-baby-products-demo.appspot.com",
  // messagingSenderId: "542733200099",
  // appId: "1:542733200099:web:b0b840606200d04245b3d6",
  // measurementId: "G-S4M9QD69ZD"
  },
  shopProductsLimit: 20,
  timeToUpdateAgentLocation: 30000,
  deliveryBikeurl: 'assets/img/delivery-bike.png',
  destinationMarkerUrl: 'assets/img/map-marker.png',
  razorpay: {
    description: 'This is description',
    currency: 'INR',
    image: '',
    theme: {
      color: '#F02155'
    }
  },
  paytm: {
    CHANNEL_ID: 'WAP',
    WEBSITE: 'WEBSTAGING',
    INDUSTRY_TYPE_ID: 'Retail',
    ENVIRONMENT: 'staging'
  },
  envPaytmActive: false,
  storeName: 'Demo App',
  supportPhone: '+917678330040',
  scrollLimit: 20,
  priceReqFeature: false,
  appSharingImg: 'https://storage.googleapis.com/raymond-app-fc456.appspot.com/banners/images/image1/image1.png?GoogleAccessId=firebase-adminsdk-mzr9r%40raymond-app-fc456.iam.gserviceaccount.com&Expires=16730323200&Signature=JYh80UnDip5ZWyDdHy1F5o8H%2B5luQhsV6LfBIf3WUTYN9KE4147jjUhn6pDisdNLhI2NYAIk9QQQp7Sny8BpStu%2B14YZtvSO22GZQJjK6oFVVk89pNpFE%2BNH3Cit7aXaB%2FFJkJv5GAAOIJfjkJTXHLrFF3umuLX%2B9iScOoBzovVnqqFwNCCmXBfY%2BCDJetcIiyohb%2Beqw2iwUjdbvmoQg%2Bs%2FmFuc%2F50nCH2PLWtTioUUVbO06%2BCaoQ08NxojKSNq%2FYnfuJ3nLDCf3sr9UkfNFgckRzGr6mo8Bn%2BN9VNWTb2%2B%2BrDLsRib2P7e1Vl8sma6gHjtXnzjONdI4rngW0x8Xw%3D%3D',
  deliveryFeature: true,
  ALGOLIA_APP_ID: 'DEYL6OZL2B',
  isDeliveryBasedKm: true,
  orderIdPrefix: 'ORD',
  defaultCountryCode: '+91',
  currencyCode: 'INR',
  taxType: 'GST',
  socialSigin: true,
  defaultProductView: 'list',
  webClientId: '848017653865-odhpf6oa7llc2hs6aod65fjel0vjokp4.apps.googleusercontent.com',
  productSharing: true,
  openAlgoliaSearch: false,
  phoneLength: 10,
  shiprocket: false,
  pageList: [{name: 'Orders',path:'admin-orders'},{name:'Products',path:'admin-products'},{name:'Messages',path:'admin-home'},{name:'Page Settings',path:'pages-setting'},{name:'Users',path:'admin-allusers'},{name:'Categories',path:'admin-categories'},{name:'Brands',path:'all-brands'},{name:'Out of Stock Products',path:'dashboard'}],
  createUserOrder: false,
  broadcastLimit: 24,
  lockSystem: false,
  resellingFeature: false,
  vendorsLimit: 10,
  allOrderStatuses: ['Pending', 'Rejected', 'Confirmed', 'Cancelled', 'Dispatched', 'Delivered', 'Returned']
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
