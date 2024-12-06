import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events, LoadingController, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-delivery-orders',
  templateUrl: './delivery-orders.page.html',
  styleUrls: ['./delivery-orders.page.scss'],
})
export class DeliveryOrdersPage implements OnInit {
  noDeliveryOrders: boolean = false;
  allDeliveryOrders: any = [];
  showLoader: boolean = true;
  loading: any;
  constructor(private storage: Storage,
              private events: Events,
              private router: Router,
              private loadingController: LoadingController,
              private alertController: AlertController) { }

  ngOnInit() {
    this.initializeSubscriptions();
    setTimeout(() => {
      this.storage.get('uid').then((val) => {
        this.events.publish('delivery:getAllOrdersOfDeliveryAgent', val);
      });
    }, 500);
  }
  ionViewWillEnter() {
    
  }
  ngOnDestroy() {
    this.removeSubscriptions();
  }
  ionViewWillLeave() {
    
  }
  initializeSubscriptions() {
    this.events.subscribe('delivery:noOrdersOfDeliveryAgent', () => {
        this.noDeliveryOrders = true;
        this.showLoader = false;
    });
    this.events.subscribe('delivery:publishAllOrdersOfDeliveryAgent', (orders) => {
        this.noDeliveryOrders = false;
        this.showLoader = false;
        this.allDeliveryOrders = orders;
        //console.log('allDeliveryOrders', this.allDeliveryOrders);
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
  
  onClickViewDetails(id) {
    const navigationextras: NavigationExtras = {
      state: {
        orderId: id
      }
    }
    this.router.navigate(['delivery-order-details'], navigationextras);
  }

  async onClickStartNavigation(orderId, deliveryAddress) {
    await this.presentLoading();
    this.events.publish('delivery:startDelivery', orderId, deliveryAddress);
  }

  async onClickContinueNavigation(orderId, deliveryLatLng) {
    const navigationextras: NavigationExtras = {
      state: {
        deliveryLatLng: deliveryLatLng,
        orderId: orderId
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

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  removeSubscriptions() {
    this.events.unsubscribe('delivery:noOrdersOfDeliveryAgent');
    this.events.unsubscribe('delivery:publishAllOrdersOfDeliveryAgent');
    this.events.unsubscribe('delivery:startDeliverySuccess');
    this.events.unsubscribe('delivery:startDeliveryUnsuccessful');
  }
}
