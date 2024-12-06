import { Component, OnInit } from '@angular/core';
import { Events, AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auto-confirm-payment',
  templateUrl: './auto-confirm-payment.page.html',
  styleUrls: ['./auto-confirm-payment.page.scss'],
})
export class AutoConfirmPaymentPage implements OnInit {
  orderData: any;
  loading: any;
  paytmActive: boolean = false;
  razorpayActive: boolean = false;
  razorpayId: any;
  showLoader: boolean = true;
  constructor(private events: Events,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private route: ActivatedRoute,
              private navCtrl: NavController) {
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.orderData = this.router.getCurrentNavigation().extras.state.orderData;
                    // //console.log('orderData', this.orderData);
                  }
                });
               }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.events.publish('admin-settings:getPaytmData');
    this.events.publish('admin-settings:getRazorPayData');
    this.initializeSubscriptions();
  } 
  ionViewWillLeave() {
    this.removeSubscription();
  }
  initializeSubscriptions() {
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
      this.showLoader = false;
    });
    this.events.subscribe('order:ac_modeSetToCashSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Order has been placed successfully!');
    });
  }
  getTotalItems() {
    return this.orderData.products.length;  
  }
  
  async onClickPaymentMode(mode: string) {
    if(mode === 'cash') {
      await this.presentLoading();
      this.events.publish('order:ac_payWithCash',  this.orderData);
    }
    if(mode === 'card' || mode === 'wallet' || mode === 'upi' || mode === 'netbanking') {
      await this.presentLoading();
      this.events.publish('order:ac_payWithRazorPay', this.orderData, this.razorpayId, mode);
    }
    if(mode === 'paytm') {
      await this.presentLoading();
      this.events.publish('order:ac_payWithPaytm', this.orderData);
    }
    
  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
            this.navCtrl.navigateRoot(['user-order-history']);
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
  removeSubscription() {
    this.events.unsubscribe('user:setPaymentModeOfOrderByUserSuccessfully');
    this.events.unsubscribe('admin-settings:publishPaytmData');
    this.events.unsubscribe('admin-settings:publishRazorPayData');
    this.events.unsubscribe('order:ac_modeSetToCashSuccess');
  }

}
