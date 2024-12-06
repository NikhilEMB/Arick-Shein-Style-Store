import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, LoadingController, IonRouterOutlet, ToastController, Platform, ModalController, AlertController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { PricelistModalPage } from 'src/app/pricelist-modal/pricelist-modal.page';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop-categories',
  templateUrl: './shop-categories.page.html',
  styleUrls: ['./shop-categories.page.scss'],
})
export class ShopCategoriesPage implements OnInit {
  bannerSlideOpts = {
    initialSlide: 0,
    speed: 400,
    disableOnInteraction: false,
    autoplay: {
      delay: 5000
    }
  };
  bestSellerSlideOpts = {
    initialSlide: 0,
    speed: 200,
    slidesPerView: 2.5
  };
  categories: any[] = [];
  loading: any;
  searchCategory: string = '';
  showLoader:boolean = true;
  showNoCategories:boolean = false;
  backButtonSubscription: any;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  useToolbar: boolean = true;
  @ViewChild(IonRouterOutlet,{static:false}) routerOutlet: IonRouterOutlet;
  showSearch;
  devWidth: any;
  useThumb: boolean;
  cartLength: number = 0;
  unreadAdminMsgs: number = 0;
  banners: any = [];
  bannersActiveStatus: boolean;
  bsProducts: any = [];
  bestSellersActiveStatus: boolean;
  cartProducts: any = [];
  storeInfo: string = '';
  allowStoreInfo: boolean;
  userId: any;
  listOfProductIdsInCart: any = [];
  storeName: string = environment.storeName;
  cartTotalPrice: number = 0;
  constructor(private events: Events, private router: Router, public loadingController: LoadingController, private toastController: ToastController,
              private platform: Platform, private storage: Storage, private userService: UserService,
               private modalController: ModalController, private alertController: AlertController, private chatService: ChatService,) { }

  ionViewWillEnter() {
    this.willEnterSubscriptions();
    this.devWidth = this.platform.width();
    if(this.platform.is('android')) {
      this.useToolbar = false;
    }
    if(this.devWidth <= 500) {
      this.useThumb = true;
    } else if(this.devWidth > 500){
      this.useThumb = false;
      this.bestSellerSlideOpts.slidesPerView = 3.5
    }
    this.storage.get('uid').then((val) => {
      if(val) {
        this.events.publish('chat:getUnreadMsgOfAdmin', val);
      }
    });
    this.userId = this.userService.getUserId();
    this.events.publish('user:getUserCartProducts');
    this.storage.get('storeInfo').then((data) => {
      this.storeInfo = data.storeInfo;
      this.allowStoreInfo = data.allowStoreInfo;
    });
    this.events.publish('banners:getBannersActiveStatus');
    this.events.publish('best-sellers:getBestSellersActiveStatus');
  }

  willEnterSubscriptions() {
    this.events.subscribe('makeUnreadAdminMsgsZero', () => {
      this.unreadAdminMsgs = 0;
    });
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else {
        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
          navigator['app'].exitApp();

      } else {
          this.presentToast('Press back again to exit App.');
          this.lastTimeBackPress = new Date().getTime();
      }
      }
    });
    this.events.subscribe('chat:publishUnreadMsgOfAdmin', (unreadMsgs) => {
      //console.log('publishUnreadMsgOfAdmin', unreadMsgs);
      this.unreadAdminMsgs = unreadMsgs;
    });
    this.events.subscribe('user:updateQuantityOfCartProductSuccess', () => {
      this.loading.dismiss();
    });
    this.events.subscribe('user:productRemovedFromCart', () => {
      this.loading.dismiss();
    });
    this.events.subscribe('user:productAddedToCart', () => {
      this.loading.dismiss();
    });
    this.events.subscribe('user:publishUserCartProducts', (cartProducts) => {
      this.cartProducts = cartProducts;
      this.cartLength = cartProducts.length;
      //console.log('cartProducts', this.cartProducts);
      let price = 0;
        for (let index = 0; index < cartProducts.length; index++) {
          price += cartProducts[index].price * cartProducts[index].quantity
        }
        this.cartTotalPrice = price;
    });
    this.events.subscribe('user:noProductsInCart', () => {
      this.cartTotalPrice = 0;
      this.cartLength = 0;
      this.events.publish('best-sellers:getBestSellersForShopCategory');
    });
    this.events.subscribe('banners:publishBannersActiveStatus', (status) => {
      //console.log('status from db', status);
      if(!this.isEmptyObj(status)) {
        this.bannersActiveStatus = status.isActive;
      } else {
        this.bannersActiveStatus = true;
      }
      //console.log('publishBannersActiveStatus', status);
    });
    this.events.subscribe('best-sellers:publishBestSellersActiveStatus', (status) => {
      //console.log('status from db', status);
      if(!this.isEmptyObj(status)) {
        this.bestSellersActiveStatus = status.isActive;
      } else {
        this.bestSellersActiveStatus = true;
      }
    });
  }
  ionViewWillLeave() {
    this.backButtonSubscription.unsubscribe();
    this.events.unsubscribe('chat:publishUnreadMsgOfAdmin');
    this.events.unsubscribe('user:updateQuantityOfCartProductSuccess');
    this.events.unsubscribe('user:productRemovedFromCart');
    this.events.unsubscribe('user:productAddedToCart');
    this.events.unsubscribe('user:publishUserCartProducts');
    this.events.unsubscribe('user:noProductsInCart');
    this.events.unsubscribe('banners:publishBannersActiveStatus');
    this.events.unsubscribe('best-sellers:publishBestSellersActiveStatus');
  }
  ngOnInit() {
    this.initializeSubscriptions();
    //console.log('in ngOnInit of shop category');
    this.events.publish('banners:getSubscribedBanners');
    
    setTimeout(() => {
      this.events.publish('product:getAllSubscribedCategories');
    },500);
    this.storage.get('listOfProductIdsInCart').then((val) => {
      this.listOfProductIdsInCart = val;
      this.events.publish('best-sellers:getBestSellersForShopCategory');
    })
  }
  ngOnDestroy() {
    //console.log('ng destroy of category');
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('product:publishAllSubscribedCategories', (categories) => {
        this.categories = categories;
        //console.log('categories', this.categories);
        this.showLoader = false;
        this.showNoCategories = false;
    });
    this.events.subscribe('product:noCategoryAvailable', () => {
        //console.log('in no data category');
        this.showLoader = false;
        this.showNoCategories = true;
    });
    this.events.subscribe('auth:logoutSuccess', () => {
      this.logoutAlert('Logged out successfully');
    });
    this.events.subscribe('banners:publishSubscribedBanners', (banners)=>{
      if(banners && banners.length) {
        var banners_sort_asc = function (a, b) {
          let i1 = parseInt(a.id.slice(5))
          let i2 = parseInt(b.id.slice(5))
          if (i1 > i2) {
            return 1
          };
          if (i1 < i2) return -1;
          return 0;
        };
        banners.sort(banners_sort_asc);
        this.banners = banners;
        //console.log(this.banners);
      } 
      
    });
    
    this.events.subscribe('best-sellers:publishBestSellersForShopCategory', (bestSellers) => {

      bestSellers.forEach(element => {
        if(this.userId !== '' && this.listOfProductIdsInCart && this.listOfProductIdsInCart.length && this.listOfProductIdsInCart.indexOf(element.id) !== -1){
          element.inCart = true;
        } else {
          element.inCart = false;
        }
      });
      this.bsProducts = bestSellers;
      //console.log('this.bsProducts', this.bsProducts);
    });
    
    
  }
  isEmptyObj(object) {
    for(var key in object) {
      if(object.hasOwnProperty(key))
        return false;
    }
    return true;
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
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 5000
    });
    await this.loading.present();
  }
  goToChat(fromfab: boolean) {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else { 
      //console.log('in else of uid');
      this.storage.get('userRole').then(async (role) => {
        if(role === 'admin') {
          this.router.navigate(['admin-home']);
        } else {
          this.router.navigate(['chat-bot']);
        }
      });
    }
  }
  onClickCart() {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else {
      this.storage.get('userRole').then((role) => {
        if(role === 'admin') {
          this.presentAlert('Cart is available only for user not for admin.');
       } else if(role === 'deliveryAgent') {
        this.presentAlert('Cart is available only for user not for delivery agent.');
       }
        else {
        this.router.navigate(['user-cart']);
       }
      });
  }
  }
  fireSearchQuery() {
    //console.log('in fireSearchQuery...');
    this.events.publish('search-engine:searchCategory', this.searchCategory);
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      color: 'dark',
      message: msg,
      duration: 2000,
      showCloseButton: true,
      cssClass: 'toast',
      animated: true,
      mode: 'ios'
    });
    toast.present();
  }
  async logoutAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons:[{
        text: 'Login Again',
        handler: () => {
          this.router.navigate(['home']);
        }
      },{
        text: 'Ok',
        handler: () => {
          this.cartLength = 0;
          for (let index = 0; index < this.bsProducts.length; index++) {
            this.bsProducts[index].inCart = false;
          }
        }
      }
    ]
    });
    await alert.present();
  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  onImageLoad() {
    //console.log('image ready');
  }
  
  bsProdcutQuantityInCart(id) {
    if(this.cartProducts.length) {
      for (let index = 0; index < this.cartProducts.length; index++) {
        if(this.cartProducts[index].productId === id){
          return this.cartProducts[index].quantity;
        }
      }
    }
  }
  bsProdcutDataInCart(id) {
    if(this.cartProducts.length) {
      for (let index = 0; index < this.cartProducts.length; index++) {
        if(this.cartProducts[index].productId === id){
          return {quantity: this.cartProducts[index].quantity,
                  cartProductId: this.cartProducts[index].id};
        }
      }
    }
  }
  async decrementQuantity(id: string, index: number){
    const data = this.bsProdcutDataInCart(id);
    //console.log('quantity', data.quantity);
    if(data.quantity > 1) {
      await this.presentLoading();
      this.events.publish('user:updateQuantityOfCartProduct', data.quantity - 1, data.cartProductId, false);
    } else {
      this.removeProduct(data.cartProductId);
      this.bsProducts[index].inCart = false;
    }
  }
  async incrementQuantity(id: string){
    const data = this.bsProdcutDataInCart(id);
    //console.log('quantity', data.quantity);
    await this.presentLoading();
    this.events.publish('user:updateQuantityOfCartProduct', data.quantity + 1, data.cartProductId, false);
  }
  async removeProduct(id: string) {
    await this.presentLoading();
    this.events.publish('user:removeProductFromCart', id, false);
  }
  async addToCart(product: any, index: number) {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else {
      this.storage.get('userRole').then(async (role) => {
        if(role === 'admin') {
          this.presentAlert('Admin can not place any order!');
       } else if(role === 'deliveryAgent') {
        this.presentAlert('Delivery agent can not place any order!');
       }
       else {
        await this.presentLoading();
        const cartObj = {
          name: product.data.prodName,
          quantity: 1,
          img: product.data.coverPic,
          description: product.data.prodDesc,
          productId: product.id,
          commentMsg: '',
          commentImgs: []
        }
        if(product.data.discount && product.data.discount !== '' && product.data.discount !== '0') {
          cartObj['price'] = Math.ceil(product.data.prodPrice - (product.data.prodPrice * ((product.data.discount * 1) / 100)));
        } else {
          cartObj['price'] = product.data.prodPrice;
        }
        this.events.publish('user:addProductToCart', cartObj, false);
        this.bsProducts[index].inCart = true;
       }
      });
    }
  }
  onClickProduct(id: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        productId: id
      }
    };
    this.router.navigate(['product-details'], navigationExtras);
  }
  async priceListAddToCart(product) {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else {
      this.storage.get('userRole').then(async (role) => {
        if(role === 'admin') {
          this.presentAlert('Admin can not place any order!');
       } else if(role === 'deliveryAgent') {
        this.presentAlert('Delivery agent can not place any order!');
       }
       else {
        let listOfWeights = [];
        for(let i = 0; i < product.data.priceList.length; i++) {
          listOfWeights.push(product.data.priceList[i].weight);
        }
        product.data.priceList.map((entry) => {
          entry.quantity = 0;
        });
        this.modalController.create({
          component: PricelistModalPage,
          cssClass: 'auto-height',
          componentProps: {
            product: product,
            listOfWeights: listOfWeights,
            cartProducts: this.cartProducts
          }
        })
      .then(modalEl => {modalEl.present();
    });
       }
      });
    }
    
  }
  getDiscountedProduct(price, discount) {
    let discountedPrice = Math.ceil(price - (price * ((discount * 1) / 100)));
    return discountedPrice;
  }
  removeSubscriptions() {
    this.events.unsubscribe('product:publishAllSubscribedCategories');
    this.events.unsubscribe('product:noCategoryAvailable');
    this.events.unsubscribe('auth:logoutSuccess');
    this.events.unsubscribe('makeUnreadAdminMsgsZero');
    this.events.unsubscribe('banners:publishSubscribedBanners');
    this.events.unsubscribe('best-sellers:publishBestSellersForShopCategory');
    
  }

}
