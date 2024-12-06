import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, Events, AlertController, LoadingController, ActionSheetController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user/user.service';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-order-details.page.html',
  styleUrls: ['./user-order-details.page.scss'],
})
export class UserOrderDetailsPage implements OnInit {
  orderData: any = [];
  loading: any;
  orderId: any;
  showLoader: boolean = true;
  unreadAdminMsgs: number = 0;
  @ViewChild(IonContent, {static: false}) content: IonContent;
  totalPriceAfterDiscount: number = 0;
  userId: any;
  constructor(private events: Events,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private storage: Storage, 
              private userService: UserService,
              private inAppBrowser: InAppBrowser,
              
              ) {
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.orderId = this.router.getCurrentNavigation().extras.state.orderId;
                    //console.log('categoryId', this.orderId);
                  }
                });
               }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.events.publish('user:getOrderDetailsWithOrderId', this.orderId);
    this.initializeSubscriptions();
    this.storage.get('uid').then((val) => {
      this.userId = val;
    });
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('user:publishOrderDetailsWithOrderId', (orderData) => {
      //console.log('orderData', orderData);
      this.orderData = orderData;
      this.showLoader = false;
    });
    this.events.subscribe('user:cancelledOrderByUserSuccessfully', (orderData) => {
      this.loading.dismiss();
      this.presentAlert('Order has been cancelled successfully');
    });
  }
  async cancelOrder() {
    this.loading = await this.loadingController.create({
      message: 'Cancelling the order...',
      duration: 5000
    });
    await this.loading.present();
    this.events.publish('user:cancelOrderByUser', this.orderId);
  }
  getTotalItems() {
    return this.orderData[0].products.length;  
  }
  
  scrollToBottom() {
    this.content.scrollToBottom(500);
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
  async onClickCancelOrder() {
    const alert = await this.alertController.create({
      message: "Are you sure you want to cancel this order?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            //console.log('Confirm Yes');
            this.cancelOrder();
          }
        }
      ]
    });
    await alert.present();
  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
          //console.log('Confirm Okay');
          this.navCtrl.navigateRoot(['user-order-history']);
        }
      }]
    }); 
    await alert.present();
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
  onClickDoPayment() {
    const navigationExtras: NavigationExtras = {
      state: {
        orderId: this.orderId,
        userId: this.userId
      }
    }
    this.router.navigate(['order-payment'], navigationExtras)
  }
  onClickTrackOrder(agentId, deliveryLatLng) {
    const navigationExtras: NavigationExtras = {
      state: {
        agentId: agentId,
        routeFromUserSide: true,
        deliveryLatLng: deliveryLatLng
      }
    }
    this.router.navigate(['location-map'], navigationExtras);
  }
  openOrderInvoice(url) {
    const browser: InAppBrowserObject = this.inAppBrowser.create(url, '_system');
  }
  removeSubscriptions() {
    this.events.unsubscribe('user:publishOrderDetailsWithOrderId');
    this.events.unsubscribe('user:cancelledOrderByUserSuccessfully');
  }

}
