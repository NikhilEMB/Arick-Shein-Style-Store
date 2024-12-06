import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, Events, AlertController, LoadingController, ActionSheetController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
//import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-delivery-order-details',
  templateUrl: './delivery-order-details.page.html',
  styleUrls: ['./delivery-order-details.page.scss'],
})
export class DeliveryOrderDetailsPage implements OnInit {

  orderData: any = [];
  loading: any;
  orderId: any;
  showLoader: boolean = true;
  unreadAdminMsgs: number = 0;
  @ViewChild(IonContent, {static: false}) content: IonContent;
  totalPriceAfterDiscount: number = 0;
  constructor(private events: Events,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private storage: Storage,
              //private callNumber: CallNumber
              ) {
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.orderId = this.router.getCurrentNavigation().extras.state.orderId;
                    //console.log('orderId', this.orderId);
                  }
                });
               }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.events.publish('user:getOrderDetailsWithOrderId', this.orderId);
    this.initializeSubscriptions();
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
    this.events.subscribe('delivery:startDeliverySuccess', (orderId, location) => {
      this.loading.dismiss();
      const navigationextras: NavigationExtras = {
        state: {
          deliveryLatLng: location,
          orderId: orderId
        }
      }
      this.router.navigate(['delivery-navigation'], navigationextras);
    });
    this.events.subscribe('delivery:startDeliveryUnsuccessful', (msg) => {
      this.loading.dismiss();
      this.presentAlert(msg);
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
  async onClickStartNavigation() {
    await this.presentLoading();
    this.events.publish('delivery:startDelivery', this.orderId, this.orderData[0].address);
  }
  onClickContinueNavigation() {
    const navigationextras: NavigationExtras = {
      state: {
        deliveryLatLng: this.orderData[0].deliveryLatLng,
        orderId: this.orderId
      }
    }
    this.router.navigate(['delivery-navigation'], navigationextras);
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 20000
    });
    await this.loading.present();
  }

  callUser() {
   /* this.callNumber.callNumber(this.orderData[0].address.phoneNo, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));*/
  }
  removeSubscriptions() {
    this.events.unsubscribe('user:publishOrderDetailsWithOrderId');
    this.events.unsubscribe('user:cancelledOrderByUserSuccessfully');
    this.events.unsubscribe('delivery:startDeliverySuccess');
    this.events.unsubscribe('delivery:startDeliveryUnsuccessful');
  }

}
