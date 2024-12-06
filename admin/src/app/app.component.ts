//import { FiltersService } from './services/filters/filters.service';
import { NavigationExtras } from '@angular/router';
import { ServicesFeatureService } from './services/services-feature/services-feature.service';
import { Component } from '@angular/core';
import { Platform, Events, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth/auth.service';
import { ProductService } from './services/product/product.service';
import { MediaService } from './services/media/media.service';
import { ChatService } from './services/chat.service';
import { UserService } from './services/user/user.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SearchEngineService } from './services/search-engine/search-engine.service';
import { VersionCompareService } from './services/version-compare/version-compare.service';
import { DeliveryService } from './services/delivery/delivery.service';
// import { ImageLoaderConfigService } from 'ionic-image-loader';
//import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { AdminSettingsService } from './services/admin-settings/admin-settings.service';
import { OrderService } from './services/order/order.service';
import { BannersService } from './services/banners/banners.service';
import { BestSellersService } from './services/best-sellers/best-sellers.service';
import { CouponCodesService } from './services/coupon-codes/coupon-codes.service';
import { DeliverySettingsService } from './services/delivery-settings/delivery-settings.service';
import { HelpService } from './services/help/help.service';
import { VariantsService } from './services/variants/variants.service';
import { ProductOptionsService } from './services/product-options/product-options.service';
import { PriceRequestService } from './services/price-request/price-request.service';
import { WalletService } from './services/wallet/wallet.service';
import { UserDetailsService } from './services/user-details/user-details.service';
import { OfferService } from './services/offer/offer.service';
import { FeedbackService } from './services/feedback/feedback.service';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { BrandsService } from './services/brands/brands.service';
//import { WidgetsService } from './services/widgets/widgets.service';
//import { WishlistService } from './services/wishlist/wishlist.service';
import { AnalyticsService } from './services/analytics/analytics.service';
import { TranslateService } from '@ngx-translate/core';
import { LabelService } from './services/label/label.service';
import { PromoPopupService } from './services/promo-popup/promo-popup.service';
import { ReportsService } from './services/reports/reports.service';
import { WidgetsService } from './services/widgets/widgets.service';
import { LanguageService } from './services/language/language.service';
import { ReferralService } from './services/referral/referral.service';
import { MultiRegionService } from './services/multi-region/multi-region.service';
import { VendorService } from './services/vendor/vendor.service';
import { ManagerService } from './services/manager/manager.service';
import { ProductSubscriptionsService } from './services/product-subscriptions/product-subscriptions.service'
import { FiltersService } from './services/filters/filters.service';
import { MembershipService } from './services/membership/membership.service';
import { RatingApprovalService } from './services/rating-approval/rating-approval.service';
import { GuideService } from '../app/guide.service'
import { Subscription } from 'rxjs';
import { EmailSmsService } from './services/email-sms/email-sms.service';
import { PaymentGatewayService } from './services/payment-gateway/payment-gateway.service';
import { PageSettingService } from './services/page-setting/page-setting.service';
import { ContactUsService } from './services/contact-us/contact-us.service';
import { ManageShipmentService } from './services/manage-shipment/manage-shipment.service';
import { BookingService } from './services/booking/booking.service';
import { FoodItemService } from './services/food-item/food-item.service';
import { VoucherService } from './services/voucher/voucher.service';
import { ShowcaseService } from './services/showcase/showcase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  isSplashScreenVisible:boolean = true;
  navigate: any;
  subscription: Subscription;
  subscriptionClient: Subscription;
  showBtn:string = ''
  bwiClient:boolean=false
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private productService: ProductService,
    private mediaService: MediaService,
    private chatService: ChatService,
    private userService: UserService,
    private searchEngineService: SearchEngineService,
    private versionCompareService: VersionCompareService,
    private deliveryService: DeliveryService,
    private adminSettingsService: AdminSettingsService,
    private orderService: OrderService,
    private bannerService: BannersService,
    private bestSellersService: BestSellersService,
    private couponCodesService: CouponCodesService,
    private deliverySettingsService: DeliverySettingsService,
    private helpService: HelpService,
    private variantsService: VariantsService,
    private productOptionsService: ProductOptionsService,
    private priceRequestService: PriceRequestService,
    private walletService: WalletService,
    private userDetailsService: UserDetailsService,
    private offerService: OfferService,
    private feedbackService: FeedbackService,
    private brandsService: BrandsService,
    //private widgetsService: WidgetsService,
   // private wishlistService: WishlistService,
    private servicesFeatureService: ServicesFeatureService,
    private analyticsService: AnalyticsService,
    //private filtersService: FiltersService,
    private screenOrientation: ScreenOrientation,
    private reportsService: ReportsService,
    private contactUsService: ContactUsService,
   // private fcm: FCM,
    private events: Events,
    private navCtrl: NavController,
    private storage: Storage,
    private translateService: TranslateService,
    private labelService: LabelService,
    private promoPopupService: PromoPopupService,
    private widgetsService:WidgetsService,
    private languageService: LanguageService,
    private referralService: ReferralService,
    private multiRegionService: MultiRegionService,
    private vendorService: VendorService,
    private subscriptionService: ProductSubscriptionsService,
    private filterService:FiltersService,
    private membershipService:MembershipService,
    private ratingApprovalService:RatingApprovalService,
    private guideService: GuideService,
    private managerService: ManagerService,
    private emailSmsService: EmailSmsService,
    private paymentGatewayService: PaymentGatewayService,
    private pageSetting: PageSettingService,
    private manageShipmentService: ManageShipmentService,
    private bookingService: BookingService,
    private foodItemService: FoodItemService,
    private voucherService : VoucherService,
    private showcaseService: ShowcaseService
  ) {
    console.log('constructor hideSplashScreen...', new Date().getSeconds());
    this.initializeApp();
    this.statusBar.backgroundColorByHexString('#000000');
    this.storage.remove('reportStartDate');
    this.storage.remove('reportEndDate');
  }
  initializeApp() {
    this.translateService.setDefaultLang('en');
        this.translateService.use('en');
        this.labelService.intializeSubscriptions();
    this.authService.initializeSubscriptions();
    // this.handleSplashScreen();
    this.platform.ready().then(() => {
      console.log('platform hideSplashScreen...', new Date().getSeconds());
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.statusBar.styleLightContent();
      this.productService.initializeSubscriptions();
      this.mediaService.initializeSubscriptions();
      this.chatService.initializeSubscriptions();
      this.userService.initializeSubscriptions();
      this.searchEngineService.initializeSubscriptions();
      this.versionCompareService.initializeSubscriptions();
      this.deliveryService.initializeSubscriptions();
      this.adminSettingsService.initializeSubscriptions();
      this.orderService.initializeSubscriptions();
      this.bannerService.initializeSubscriptions();
      this.bestSellersService.initializeSubscriptions();
      this.couponCodesService.initializeSubscriptions();
      this.deliverySettingsService.initializeSubscriptions();
      this.helpService.initializeSubscriptions();
      this.variantsService.initializeSubscriptions();
      this.productOptionsService.initializeSubscriptions();
      this.priceRequestService.initializeSubscriptions();
      this.walletService.initializeSubscriptions();
      this.userDetailsService.initializeSubscriptions();
      this.offerService.initializeSubscriptions();
      this.feedbackService.initializeSubscriptions();
      this.brandsService.initializeSubscriptions();
      //this.widgetsService.initializeSubscriptions();
      //this.wishlistService.initializeSubscriptions();
      this.servicesFeatureService.initializeSubscriptions();
      this.analyticsService.initializeSubscriptions();
      
      this.reportsService.initializeSubscriptions();
      this.emailSmsService.initializeSubscriptions();
      this.paymentGatewayService.initializeSubscriptions();
      //this.filtersService.initializeSubscriptions();
      // this.navCtrl.navigateRoot(['shop-categories']);
      this.splashScreen.hide();
      //this.searchKeyCheckOnAppResume();
      this.callBackendApis();
     // this.checkForNotificationPermissions();
     this.promoPopupService.initializeSubscriptions();
     this.widgetsService.initializeSubscriptions();
     this.languageService.initializeSubscriptions();
     this.referralService.initializeSubscriptions();
     this.multiRegionService.initializeSubscriptions();
     this.vendorService.initializeSubscriptions();
     this.subscriptionService.initializeSubscriptions();
     this.filterService.initializeSubscriptions();
     this.membershipService.initializeSubscriptions();
     this.ratingApprovalService.initializeSubscriptions();
     this.managerService.initializeSubscriptions();
     this.pageSetting.initializeSubscriptions()
     this.manageShipmentService.initializeSubscriptions();
     this.bookingService.initializeSubscriptions();
     this.foodItemService.initializeSubscriptions();
     this.voucherService.initializeSubscriptions();
     this.showcaseService.initializeSubscriptions();
    });
  }
  handleSplashScreen() {
    this.events.subscribe('auth:hideSplashScreen', () => {
       if (this.isSplashScreenVisible) {
        console.log('subscribe hideSplashScreen...', new Date().getSeconds());
        this.isSplashScreenVisible = false;
       }
     });
 }

 
 /*searchKeyCheckOnAppResume() {
    this.platform.resume.subscribe(() => {
      this.authService.checkSearchKey();
  });
 }*/
 callBackendApis() {
    // cart.js
    const updatedCartProducts = firebase.functions().httpsCallable('cart-getUpdatedCartProducts');
    updatedCartProducts('').then((res) => {console.log(res.data);});
    // orders.js
    const orderPaymentDetails = firebase.functions().httpsCallable('orders-getOrderPaymentDetails');
    orderPaymentDetails().then((res) => {
      console.log(res.data);
    });
 }

  ngOnInit() {
    this.subscription = this.guideService.currentUrl.subscribe(message => {
      this.showBtn = message
    })
    this.subscriptionClient = this.guideService.currentClient.subscribe(value => {
      this.bwiClient = value
      console.log(this.bwiClient)
    })
  }

  gotoGuide(){
    let index=window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    console.log(index);
    window.open('https://bwi-learning.web.app/'+index,'_blank');
  }

}
