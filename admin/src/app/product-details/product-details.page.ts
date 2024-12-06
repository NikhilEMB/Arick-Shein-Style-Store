import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Events, LoadingController, Platform, ModalController, AlertController } from '@ionic/angular';
import { Order } from '../models/order';
import { OrderMsg } from '../models/order-msg';
import { UserService } from '../services/user/user.service';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { Storage } from '@ionic/storage';
import { Cart } from '../models/cart';
import { PricelistModalPage } from '../pricelist-modal/pricelist-modal.page';
import { BuynowPricelistModalPage } from '../buynow-pricelist-modal/buynow-pricelist-modal.page';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  encapsulation: 2
})
export class ProductDetailsPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  orderInfo: Order = {
    productId: null,
    quantity: null,
    name: null,
    price: null,
    img: null
  };
  cartObj: Cart = {
    name: null,
    quantity: null,
    price: null,
    img: null,
    description: null,
    productId: null,
    commentMsg: '',
    commentImgs: []
  }
  currentQuantity = 1;
  productId: string;
  data: any;
  loading: any;
  showLoader = true;
  devWidth: number;
  useThumb: boolean;
  cartLength: number = 0;
  showGoToCart: boolean = false;
  cartProducts: any = [];
  constructor(private route: ActivatedRoute, private router: Router, private events: Events, private userService: UserService,
              private loadingController: LoadingController,
              private platform: Platform, private modalController: ModalController, private alertController: AlertController,
              private storage: Storage) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.productId = this.router.getCurrentNavigation().extras.state.productId;
        //console.log('productId in product details', this.productId);
      }
    });
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.events.publish('product:getProductWithId', this.productId);
    this.storage.get('uid').then((val) => {
      this.events.publish('user:getLengthOfCartProducts', val);
    });
    this.initializeSubscriptions();
    this.devWidth = this.platform.width();
    if(this.devWidth <= 500) {
      this.useThumb = true;
    } else if(this.devWidth > 500){
      this.useThumb = false;
    }
    this.storage.get('listOfProductIdsInCart').then((val) => {
      //console.log('productId in product details', this.productId);
      //console.log('listOfProductIdsInCart in product details', val.indexOf(this.productId));

      if(val.indexOf(this.productId) !== -1) {
        this.showGoToCart = true;
      }
    });
    this.events.publish('user:getUserCartProducts');
  }
  
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('product:publishgetProductWithId', (productData) => {
      //console.log('productData', productData);
      this.data = productData;
      //console.log('p data', this.data);
      this.showLoader = false;
    });
    this.events.subscribe('user:orderSuccessfullyPlaced', () => {
      this.presentAlert('Order Placed! Do you wish to continue Shopping ?');
      this.loading.dismiss();
    });
    this.events.subscribe('user:productAddedToCart', () => {
      this.loading.dismiss();
      this.cartAlert('Item Added To Cart');
    });
    this.events.subscribe('user:publishLengthOfCartProducts', (cartLength) => {
      this.cartLength = cartLength;
    });
    this.events.subscribe('user:publishUserCartProducts', (cartProducts) => {
      this.cartProducts = cartProducts;
      //console.log('cartProducts', this.cartProducts);
    });
  }
  decrementQuantity() {
    if (this.currentQuantity > 1) {
      this.currentQuantity--;
    }
  }
  incrementQuantity() {
      this.currentQuantity++;
  }
  async addToCart() {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else {
      this.storage.get('userRole').then(async (role) => {
        if(role === 'admin') {
          this.adminOrDeliveryOrderAlert('Admin can not place any order!');
       } else if(role === 'deliveryAgent') {
        this.adminOrDeliveryOrderAlert('Delivery agent can not place any order!');
       }
        else {
        this.loading = await this.loadingController.create({
          message: 'Please Wait...',
          duration: 5000,
          backdropDismiss: false
        });
        await this.loading.present();
          this.cartObj.name = this.data.prodName;
          this.cartObj.quantity = this.currentQuantity;
          this.cartObj.img = this.data.coverPic;
          this.cartObj.description = this.data.prodDesc
          this.cartObj.productId = this.productId;
          if(this.data.discount && this.data.discount !== '' && this.data.discount !== '0') {
            this.cartObj['price'] = Math.ceil(this.data.prodPrice - (this.data.prodPrice * ((this.data.discount * 1) / 100)));
          } else {
            this.cartObj['price'] = this.data.prodPrice;
          }
          this.events.publish('user:addProductToCart', this.cartObj, true);
        
       }
      });
    }
  }
  buyNowOrder() {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else {
      this.storage.get('userRole').then((role) => {
        if(role === 'admin') {
          this.adminOrDeliveryOrderAlert("Admin can not place any order!");
       }else if(role === 'deliveryAgent') {
        this.adminOrDeliveryOrderAlert('Delivery agent can not place any order!');
       }
        else {
          this.cartObj.name = this.data.prodName;
          this.cartObj.quantity = this.currentQuantity;
          this.cartObj.img = this.data.coverPic;
          this.cartObj.description = this.data.prodDesc
          this.cartObj.productId = this.productId;
          if(this.data.discount && this.data.discount !== '' && this.data.discount !== '0') {
            this.cartObj['price'] = Math.ceil(this.data.prodPrice - (this.data.prodPrice * ((this.data.discount * 1) / 100)));
          } else {
            this.cartObj['price'] = this.data.prodPrice;
          }
          let buyNowOrderProduct = [];
          buyNowOrderProduct.push(this.cartObj);
          this.storage.set('productsInCart', buyNowOrderProduct);
          this.storage.set('buyNowOrder', true);
          this.storage.get('userDefaultAddress').then((address) => {
            //console.log(address);
            if(!address) {
              const navigationExtras: NavigationExtras = {
                state: {
                  routeFromCheckoutPage: true,
                }
              };
              this.router.navigate(['new-address'], navigationExtras);
            } else {
              this.router.navigate(['order-summary']);
            }
        });
        
      }
      });
  }
    
    
  }
  goToCart() {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else {
      this.storage.get('userRole').then((role) => {
        if(role === 'admin') {
          this.adminOrDeliveryOrderAlert('Cart is available only for user not for admin.');
       } else if(role === 'deliveryAgent') {
        this.adminOrDeliveryOrderAlert('Cart is available only for user not for delivery agent.');
       }
        else {
          const navigationExtras: NavigationExtras = {
            state: {
              routeFromProductDetailsPage: true,
            }
          };
          this.router.navigate(['user-cart'], navigationExtras);
       }
      });
  }
    
  }
  imageZoom(images: any, index: number) {
    this.modalController.create({
      component: ImageModalPage,
      cssClass:'photo-modal-class',
      componentProps: {
        imgs: images,
        index: index
      }
    }).then(modal => modal.present());
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
    });
    await this.loading.present();
  }
  async presentAlert(desc: string) {
    const alert = await this.alertController.create({
      message: desc,
      buttons: [{
        text: 'Continue',
        handler: () => {
          this.router.navigate(['shop']);
        }
      },{
        text: 'Check My Order',
        handler: () => {
          this.router.navigate(['chat-bot']);
      }
      }]
    });
    await alert.present();
  }
  async cartAlert(desc: string) {
    const alert = await this.alertController.create({
      message: desc,
      buttons: [{
        text: 'Continue',
        handler: () => {
          this.router.navigate(['shop']);
        }
      },{
        text: 'Go To Cart',
        handler: () => {
          const navigationExtras: NavigationExtras = {
            state: {
              routeFromProductDetailsPage: true,
            }
          };
          this.router.navigate(['user-cart'], navigationExtras);
      }
      }]
    });
    await alert.present();
  }
  async adminOrDeliveryOrderAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.router.navigate(['shop']);
        }
      }]
    });
    await alert.present();
  }
  async priceListAddToCart() {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else {
      this.storage.get('userRole').then((role) => {
        if(role === 'admin') {
          this.adminOrDeliveryOrderAlert('Admin can not place any order!');
       } else if(role === 'deliveryAgent') {
        this.adminOrDeliveryOrderAlert('Delivery agent can not place any order!');
       }
        else {
          let listOfWeights = [];
          for(let i = 0; i < this.data.priceList.length; i++) {
            listOfWeights.push(this.data.priceList[i].weight);
          }
          this.data.priceList.map((entry) => {
            entry.quantity = 0;
          });
          this.modalController.create({
            component: PricelistModalPage,
            cssClass: 'auto-height',
            componentProps: {
              product: {
                id: this.productId,
                data: this.data
              },
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
  async openBuyNowPriceListModal() {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else {
      this.storage.get('userRole').then((role) => {
        if(role === 'admin') {
          this.adminOrDeliveryOrderAlert('Admin can not place any order!');
       } else if(role === 'deliveryAgent') {
        this.adminOrDeliveryOrderAlert('Delivery agent can not place any order!');
       }
        else {
          this.data.priceList.map((entry) => {
            entry.quantity = 1;
          });
          this.modalController.create({
            component: BuynowPricelistModalPage,
            cssClass: 'auto-height',
            componentProps: {
              product: {
                id: this.productId,
                data: this.data
              },
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
    this.events.unsubscribe('product:publishgetProductWithId');
    this.events.unsubscribe('user:orderSuccessfullyPlaced');
    this.events.unsubscribe('user:productAddedToCart');
    this.events.unsubscribe('user:publishLengthOfCartProducts');
    this.events.unsubscribe('user:publishUserCartProducts');
  }
}
