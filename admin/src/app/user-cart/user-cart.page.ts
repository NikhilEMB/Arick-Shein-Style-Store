import { Component, OnInit } from '@angular/core';
import { Events, AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.page.html',
  styleUrls: ['./user-cart.page.scss'],
})
export class UserCartPage implements OnInit {
  quantity = 1;
  cartProducts: any[] = [];
  noCartProducts: boolean = false;
  showLoader: boolean = true;
  loading: any;
  routeFromProductDetailsPage: boolean = false;
  unreadAdminMsgs: number = 0;
  routeFromSearchItemsPage: boolean = false;
  constructor(private events: Events,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private storage: Storage,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private userService: UserService,) { 
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.routeFromProductDetailsPage = this.router.getCurrentNavigation().extras.state.routeFromProductDetailsPage;
                    this.routeFromSearchItemsPage = this.router.getCurrentNavigation().extras.state.routeFromSearchItemsPage;
                  }
                });
              }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.initializeSubscription();
    this.events.publish('user:getUserCartProducts');
    this.storage.get('uid').then((val) => {
      this.events.publish('chat:getUnreadMsgOfAdmin', val);
    });
  } 
  ionViewWillLeave() {
    this.removeSubscription();
  }
  initializeSubscription() {
    this.events.subscribe('user:publishUserCartProducts', (cartProducts) => {
      this.cartProducts = cartProducts;
      this.noCartProducts = false;
      this.showLoader = false;
      //console.log('cartProducts', this.cartProducts);
    });
    this.events.subscribe('user:noProductsInCart', () => {
      this.noCartProducts = true;
      this.showLoader = false;
    });
    this.events.subscribe('user:updateQuantityOfCartProductSuccess', () => {
      this.loading.dismiss();
    });
    this.events.subscribe('user:productRemovedFromCart', () => {
      this.loading.dismiss();
    });
    this.events.subscribe('chat:publishUnreadMsgOfAdmin', (unreadMsgs) => {
      this.unreadAdminMsgs = unreadMsgs;
    });
  }
  async decrementQuantity(quantity, index, id){
    if(quantity > 1) {
      this.loading = await this.loadingController.create({
        message: 'Please Wait...',
        duration: 5000
      });
      await this.loading.present();
      this.events.publish('user:updateQuantityOfCartProduct', this.cartProducts[index].quantity - 1, id, true);
    } else {
      this.removeAlertConfirm(id);
    }
  }
  async incrementQuantity(quantity, index, id){
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 5000
    });
    await this.loading.present();
    this.events.publish('user:updateQuantityOfCartProduct', this.cartProducts[index].quantity + 1, id, true);
  }
  onClickStartShopping() {
    this.navCtrl.navigateRoot(['shop-categories']);
  }
  async presentAlert(msg: string, action?:boolean) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['Ok']
    });
    await alert.present();
  }
  async removeAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to remove this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Remove',
          handler: () => {
            //console.log('Confirm Okay');
            this.removeProduct(id);
          }
        }
      ]
    });
    await alert.present();
  }
  async removeProduct(id: string) {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 5000
    });
    await this.loading.present();
    this.events.publish('user:removeProductFromCart', id, true);
  }
  async onClickCheckout() {
    this.storage.set('productsInCart', this.cartProducts);
    this.storage.set('buyNowOrder', false);
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
  goToPrdouctDetails(id: string) {
    //console.log('id in goToPrdouctDetails', id);
    const navigationExtras: NavigationExtras = {
      state: {
        productId: id,
      }
    };
    this.router.navigate(['product-details'], navigationExtras);
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
  
  removeSubscription() {
    this.events.unsubscribe('user:publishUserCartProducts');
    this.events.unsubscribe('user:noProductsInCart');
    this.events.unsubscribe('user:updateQuantityOfCartProductSuccess');
    this.events.unsubscribe('user:productRemovedFromCart');
    this.events.unsubscribe('chat:publishUnreadMsgOfAdmin');
  }

}
