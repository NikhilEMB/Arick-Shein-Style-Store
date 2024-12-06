import { Component, OnInit } from '@angular/core';
import { Events, AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.page.html',
  styleUrls: ['./order-payment.page.scss'],
})
export class OrderPaymentPage implements OnInit {
  phonepeNo: string = '';
  paytmNo: string = '';
  upiId: string = '';
  orderId: any;
  orderData: any;
  showLoader: boolean = true;
  totalPriceAfterDiscount: number = 0;
  loading: any;
  paytmActive: boolean = false;
  razorpayActive: boolean = false;
  razorpayId: any;
  orderAmount: number;
  userId: any;
  constructor(private events: Events,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private route: ActivatedRoute,
              private storage: Storage,
              private navCtrl: NavController) {
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.orderId = this.router.getCurrentNavigation().extras.state.orderId;
                    this.userId = this.router.getCurrentNavigation().extras.state.userId;
                    //console.log('orderId', this.orderId);
                  }
                });
               }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.events.publish('user:getOrderDetailsWithOrderId', this.orderId);
    this.events.publish('admin-settings:getPaytmData');
    this.events.publish('admin-settings:getRazorPayData');
    this.initializeSubscriptions();
  } 
  ionViewWillLeave() {
    this.removeSubscription();
  }
  initializeSubscriptions() {
    this.events.subscribe('user:publishOrderDetailsWithOrderId', (orderData) => {
      //console.log('orderData', orderData);
      this.orderData = orderData;
      this.showLoader = false;
    });
    this.events.subscribe('user:setPaymentModeOfOrderByUserSuccessfully', () => {
      this.loading.dismiss();
      this.presentAlert('Payment Mode has been set successfully');
    });
    this.events.subscribe('admin-settings:publishPaytmData', (data) => {
      if(data) {
        this.paytmActive = data.active;
      }
    });
    this.events.subscribe('admin-settings:publishRazorPayData', (data) => {
      if(data && data.active && data.id !== '') {
        this.razorpayActive = data.active;
        this.razorpayId = data.id;
      }
    });
    this.events.subscribe('order:modeSetToCashSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Payment Mode has been set to cash successfully');
    });
  }
  getTotalItems() {
    return this.orderData[0].products.length;  
  }
  
  async onClickPaymentMode(mode: string) {
    if(mode === 'cash') {
      await this.presentLoading();
      this.events.publish('order:payWithCash',  this.orderData[0].orderId, this.orderData[0].totalAmountToPaid);
    }
    if(mode === 'card' || mode === 'wallet' || mode === 'upi' || mode === 'netbanking') {
      await this.presentLoading();
      this.events.publish('order:payWithRazorPay', this.orderData[0].orderId, this.userId, this.orderData[0].totalAmountToPaid, this.razorpayId, mode);
    }
    if(mode === 'paytm') {
      await this.presentLoading();
      this.events.publish('order:payWithPaytm', this.orderData[0].orderId, this.userId, this.orderData[0].totalAmountToPaid);
    }
    
  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
            this.navCtrl.navigateRoot(['shop-categories']);
        }
      }]
    }); 
    await alert.present();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 5000
    });
    await this.loading.present();
  }
  async presentFailureAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['Try Again']
    });
    await alert.present();
  }
  removeSubscription() {
    this.events.unsubscribe('user:publishOrderDetailsWithOrderId');
    this.events.unsubscribe('user:setPaymentModeOfOrderByUserSuccessfully');
    this.events.unsubscribe('admin-settings:publishPaytmData');
    this.events.unsubscribe('admin-settings:publishRazorPayData');
    this.events.unsubscribe('order:modeSetToCashSuccess');
  }
}
