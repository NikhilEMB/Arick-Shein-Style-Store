export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyAocXtMQCtr_u_fZvJ2Nee7VBwRPD0Dg-U",
    authDomain: "bwi-shein.firebaseapp.com",
    projectId: "bwi-shein",
    storageBucket: "bwi-shein.appspot.com",
    messagingSenderId: "876688672852",
    appId: "1:876688672852:web:330ceb480d0aa9739d85c1",
    measurementId: "G-1KDLLJZXQ9"
    
  //   apiKey: "AIzaSyBi6HFutTey8x5UCzgWeZW-75ne6Y-_Rrg",
  // authDomain: "pt-app-4148f.firebaseapp.com",
  // databaseURL: "https://pt-app-4148f.firebaseio.com",
  // projectId: "pt-app-4148f",
  // storageBucket: "pt-app-4148f.appspot.com",
  // messagingSenderId: "966816629874",
  // appId: "1:966816629874:web:2bae2a65d2cfeb8b932eeb"
  },
  shopProductsLimit: 100,
  timeToUpdateAgentLocation: 10000,
  deliveryBikeurl: 'assets/img/delivery-bike.png',
  destinationMarkerUrl: 'assets/img/map-marker.png',
  razorpay: {
    description: 'Credits towards consultation',
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
  envPaytmActive: true,
  storeName: 'Demo App',
  supportPhone: '+917678330040',
  scrollLimit: 100,
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
  phoneLength: 10,
  showFooterLogo: true,
  shiprocket: false,
  pageList: [{name: 'Orders',path:'admin-orders'},{name:'Products',path:'admin-products'},{name:'Messages',path:'admin-home'},{name:'Page Settings',path:'pages-setting'},{name:'Users',path:'admin-allusers'},{name:'Categories',path:'admin-categories'},{name:'Brands',path:'all-brands'},{name:'Service Requests',path:'service-requests'},{name:'Manage Services',path:'all-services'},{name:'Out of Stock Products',path:'dashboard'},{name:'Form Submissions ', path:'form-submissions'},
  {name:'Coupon Codes',path:'coupon-codes'},{name:'Promo Popup',path:'promo-popup-settings'},{name:'Extra Features',path:'feature-list'},{name:'Delivery Settings',path:'delivery-settings'},{name:'Payment Settings',path:'admin-payment-settings'},{name:'Admin Settings',path:'admin-settings'},{name:'Wallet Settings',path:'wallet-settings'},{name:'Referral Settings',path:'referral-settings'},{name:'Price Requests',path:'price-requests'},
  {name:'Reports',path:'sales-report'},{name:'Offers',path:'offer-settings'},{name:'Languages',path:'language-current'},{name:'Multi Region',path:'multi-region-all'},{name:'Multi Vendor',path:'multi-vendor-all'},{name:'Subscriptions',path:'subscriptions'},{name:'Filters',path:'all-filters'},{name:'Membership',path:'membership-settings'},{name:'Shiprocket Settings',path:'shiprocket-settings'},{name:'About Page',path:'about-setting'},
  {name:'Website Seo',path:'website-seo'},{name:'Feedback',path:'all-feedbacks'},{name:'App Usage',path:'app-usage'},{name:'Terms & Privacy',path:'admin-terms-settings'},{name:'Banners (deprecated)',path:'admin-banners'},{name:'Promo Video (deprecated)',path:'promo-video-settings'},{name:'Best Sellers (deprecated)',path:'admin-best-sellers'}],
  createUserOrder: false,
  broadcastLimit: 24,
  lockSystem: false,
  vendorsLimit: 10,
  allOrderStatuses: ['Pending', 'Rejected', 'Confirmed', 'Cancelled', 'Dispatched', 'Delivered', 'Returned']
};
