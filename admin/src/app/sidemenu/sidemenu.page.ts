import { AdminSettingsService } from './../services/admin-settings/admin-settings.service';
import { SharedService } from './../services/shared/shared.service';
import { HomePageModule } from './../home/home.module';
import { ServicesFeatureService } from './../services/services-feature/services-feature.service';
import { BrandsService } from './../services/brands/brands.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events, MenuController, Platform, ToastController, ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { ProductService } from '../services/product/product.service';
//import { CallNumber } from '@ionic-native/call-number/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { environment } from 'src/environments/environment';
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { WalletService } from '../services/wallet/wallet.service';
import { HomePage } from '../home/home.page';
import { ConfigService } from '../services/config/config.service';
//import { AppRate } from '@ionic-native/app-rate/ngx';
import { ReferralService } from 'src/app/services/referral/referral.service';
import { VideoHelpPage } from '../video-help/video-help/video-help.page';
import { WhatsappDashboardService } from '../services/whatsapp-dashboard/whatsapp-dashboard.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {
  navigate: any;
  userName: string;
  userPic: string;
  showCategories:boolean = false;
  categoryPlusClicked: boolean = false;
  categoriesData: any[];
  loginStatus: boolean = false;
  role: string = 'user';
  storeName: string;
  storePhone: string;
  appVersionNumber: string;
  isPriceReqFeature: boolean;
  listOfSubcategories: any = {};
  isAndroid: boolean;
  appStoreUrl: string = '';
  playstoreUrl: string = '';
  isWalletActive: boolean = false;
  listOfSubcategoriesInView: any = {};
  showBrands = false;
  brands = [];
  brandPlusClicked = false;
  isServiceActive = false;
  showServices = false;
  shiprocket = false;
  multiRegion = false;
  multiVendor = false;
  isReferralActive = false;
  referralFeature = false;
  subscriptionFeature = false;
  isMembership = false;
  permissionData = [];
  showInventory = true
  showSettings = false
  showPromotions = false
  showWholesale = false
  showPolicies = false
  showLegacy = false;
  showStudio = false;
  showForm = false;
  pickDropActive = false;
  showVendors = false
  showOrders = true;
  showAdvance = false;
  isBwiClient = this.configService.environment.isBwiClient || false;
  showWhatsappDashboard: boolean = this.configService.environment.whatsapp || false;

  showFeatures = false;
  showUsers = false;
  showWhatsapp = false;
  menuButton3
  constructor(private storage: Storage, private events: Events, private router: Router,
              private userService: UserService, private productService: ProductService,
              private menuCtrl: MenuController,
              //private callNumber: CallNumber,
              private appVersion: AppVersion,
              //private socialSharing: SocialSharing,
              private platform: Platform,
              private toastController: ToastController,
              private walletService: WalletService,
              private brandsService: BrandsService,
              private servicesFeatureService: ServicesFeatureService,
              private modalController: ModalController,
              private sharedService: SharedService,
              private adminSettingsService: AdminSettingsService,
             private configService: ConfigService, private referralService: ReferralService,
             private whatsappService: WhatsappDashboardService,
             ) {
              this.events.subscribe('manager:getManagerDataSuccess', (receivedData) => {
                if (receivedData.permissions){
                  this.permissionData = receivedData.permissions
                  console.log(this.permissionData)
                }
                // console.log(this.currentPages)
              });
  }

  ngOnInit() {
  }
  async menuOpen() {
    this.getWhatsappMenu();
    this.storage.get('appUrls').then((urls) => {
      if (urls) {
        if (this.platform.is('ios')) {
          this.isAndroid = false;
          this.appStoreUrl = urls.appStoreUrl;
        } else {
          this.isAndroid = true;
          this.playstoreUrl = urls.playstoreUrl;
        }
      }
    });

    this.storage.get('storeInfo').then((data) => {
      this.storeName = data.storeName;
      this.storePhone = data.storePhone;
    });
    this.getUserData();
    setTimeout(() => {
    let userId = this.userService.getUserId();
    if(userId === '') {
      this.loginStatus = false;
    } else {
      this.loginStatus = true;
    }
    }, 100);
    this.appVersion.getVersionNumber().then((version) => {
      this.appVersionNumber = version;
    });
    this.isPriceReqFeature = this.configService.environment.priceReqFeature;
    const walletSettings: any = await this.walletService.getWalletSettings('sidemenu');
    this.isWalletActive = walletSettings && walletSettings.active ? walletSettings.active : false;
    const serviceStatus: any = await this.servicesFeatureService.getServicesActiveStatus('sidemenu');
    this.isServiceActive = serviceStatus && serviceStatus.isActive ? serviceStatus.isActive : false;
    this.shiprocket = this.configService.environment.shiprocket;
    this.subscriptionFeature = this.configService.environment.subscriptionFeature;
    this.multiRegion = this.configService.environment.multiRegion;
    this.multiVendor = this.configService.environment.multiVendor;
    const referralSettings: any = await this.referralService.getReferralSettings('sidemenu');
    this.isReferralActive = referralSettings && referralSettings.active ? referralSettings.active : false;
    this.referralFeature = this.configService.environment.referralFeature;
    this.isMembership = this.configService.environment.membership;
    this.pickDropActive = this.configService.environment.pickDrop;
  }
  menuClose() {
    this.menuCtrl.close();
  }

  async getWhatsappMenu(){    
    if (this.showWhatsappDashboard) {
      let menuItems = await this.whatsappService.getMenuItems();
      if (menuItems && menuItems.length) {
        for (const menuItem of menuItems) {
          if (menuItem.id == 'menu-button-3') {
            this.menuButton3 = menuItem;
          }
        }
      }
    }
  }

  toggleServices(){
    console.log('toggleServices', this.showServices);
    if (this.showServices) {
      this.showServices = false;
     } else {
      this.showServices = true;
      
    }
  }
  getUserData() {
    this.storage.get('userName').then((name) => {
      this.userName = name;
    });
    this.storage.get('userPic').then((url) => {
      this.userPic = url;
    });
    this.storage.get('userRole').then(async (role) => {
      if(!role) {
        this.role = 'user';
      } 
      else if (role=='manager'){
        this.role = role;
        let managerId = await this.storage.get('uid')
        this.events.publish('manager:getManagerData',managerId);
      }
      else {
        this.role = role;
      }
    });
  }
  
  goToPage(page: string) {
    console.log('goToPage', page);
    this.router.navigate([page]);
  }
  goToChat() {
    let userId = this.userService.getUserId();
    console.log('uid in sc', userId);
    if (userId === '') {
      console.log('in if of uid');
      this.sharedService.openLoginModal();
    } else {
      this.router.navigate(['chat-bot']);
    }
  }
  async getAllCategories() {
    if (this.categoryPlusClicked === false) {
      this.showCategories = true;
      this.categoriesData = await this.productService.getAllCategoriesForSideMenu();
      console.log('categoriesData', this.categoriesData);
      this.categoryPlusClicked = true;
    } else {
      this.showCategories = false;
      this.categoryPlusClicked = false;
    }
  }
  async getAllBrands() {
    if (this.brandPlusClicked === false) {
      this.showBrands = true;
      this.brands = await this.brandsService.getAllBrandsForSideMenu();
      this.brandPlusClicked = true;
    } else {
      this.showBrands = false;
      this.brandPlusClicked = false;
    }
  }

  onClickCategory(category) {
    const navigationExtras: NavigationExtras = {
      state: {
        categoryId: category.id,
        categoryName: category.name
      }
    };
    if(category.isSubcategories) {
      this.router.navigate(['shop-subcategories'], navigationExtras);
    } else {
      this.router.navigate(['shop'], navigationExtras);
    }
  }
  onClickBrand(brand) {
    const navigationExtras: NavigationExtras = {
      state: {
        brandId: brand.id,
        brandName: brand.name
      }
    };
    this.router.navigate(['shop'], navigationExtras);
  }

  onClickSubcategory(category) {
    const navigationExtras: NavigationExtras = {
      state: {
        categoryId: category.id,
        categoryName: category.name
      }
    };
    this.router.navigate(['shop'], navigationExtras);
  }
  callAdmin() {
   /* this.callNumber.callNumber(this.storePhone, true)
                    .then(res => console.log('Launched dialer!', res))
                    .catch(err => console.log('Error launching dialer', err));*/
  }

  logout() {
    this.menuCtrl.close();
    this.events.publish('auth:logout');
    this.events.publish('makeUnreadAdminMsgsZero');
  }
  async login() {
    this.menuCtrl.close();
    this.sharedService.openLoginModal();
  }

  /*shareApp() {
    let appUrl = '';
    if (this.isAndroid) {
      appUrl = this.playstoreUrl;
    } else {
      appUrl = this.appStoreUrl;
    }
    if (appUrl) {
      this.socialSharing.share(this.storeName + ' link:', '', environment.appSharingImg, appUrl).then(() => {
        console.log('app sharing works!');
      }) .catch(() => {
        console.log('app sharing not works!');
      });
    } else {
      this.presentToast('There is some problem in sharing of app.');
    }
  }
*/
 /* async rateApp() {
    const appData = await this.adminSettingsService.getAppData('sidemenu');
    this.appRate.preferences.storeAppURL = {
      ios: appData.iosAppId,
      android: `market://details?id=${appData.appPackageName}`,
    };
    this.appRate.promptForRating(true);
  }
*/
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async getSubCategories(cid) {
    if (!this.listOfSubcategories.hasOwnProperty(cid)) {
      let subcategories = [];
      subcategories = await this.productService.getSubcategoriesInNewProduct(cid);
      this.listOfSubcategories[cid] = subcategories;
      console.log('listOfSubcategories', this.listOfSubcategories);
      this.listOfSubcategoriesInView[cid] = {active: true};
    } else {
      if (!this.listOfSubcategoriesInView[cid].active) {
        this.listOfSubcategoriesInView[cid].active = true;
      } else {
        this.listOfSubcategoriesInView[cid].active = false;
      }
    }
  }

  toogleAdvance() {
    this.showAdvance = !this.showAdvance;
  }

  async openVideoModal(link: string){
    const modal = await this.modalController.create({
      component: VideoHelpPage,
      cssClass: 'custom-modalFull',
      componentProps: {
        selectedRoute: link
      }
    });
    modal.onDidDismiss().then(res => {
      console.log('modal onDidDismiss...',res);
        // if (res && res.data && res.data.selectedRoute) {
        //   this.filters = res.data.filters;
        // }
    });
    await modal.present();
  }

  async openFeaturesModal(link: string){
    const featureModal = await this.modalController.create({
      component: VideoHelpPage,
      cssClass: 'custom-modalFull',
      componentProps: {
        routeChoice: link
      }
    });
    await featureModal.present();
  }
 
}
