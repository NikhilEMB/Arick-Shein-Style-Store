import { Component, OnInit } from '@angular/core';
import { Events, LoadingController, AlertController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-requests',
  templateUrl: './price-requests.page.html',
  styleUrls: ['./price-requests.page.scss'],
})
export class PriceRequestsPage implements OnInit {
  showSearch: boolean = false;
  searchRequest: string = '';
  allRequests: any = [];
  showLoader: boolean = true;
  loading: any;
  isPriceReqFeature: boolean = false
  constructor(private events: Events,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private router: Router,
              private configService: ConfigService) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.isPriceReqFeature = this.configService.environment.priceReqFeature;
    if (this.isPriceReqFeature==false){
      const alert = await this.alertController.create({
        message: "Sorry, this feature is not available. Please upgrade your plan for access",
        buttons: ['ok']
      });
      alert.onWillDismiss().then(()=>{
        this.router.navigate(['admin-home']);
      })
      await alert.present();
    }
    this.initializeSubscriptions();
    this.events.publish('price-req:getAllPriceRequests');
  }

  initializeSubscriptions() {
    this.events.subscribe('price-req:publishAllPriceRequests', (requests) => {
      //console.log('requests', requests);
      this.allRequests = requests;
      this.showLoader = false;
    });
    this.events.subscribe('price-req:rejectPriceRequestSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Prices are now inactive for this user.');
    });
    this.events.subscribe('price-req:acceptPriceRequestSuccess', (msg) => {
      this.loading.dismiss();
      this.presentAlert(msg);
    });
  }

  async changePriceReqActive(status, uid) {
    if(status) {
      await this.presentLoading('Please wait...', 10000);
      this.events.publish('price-req:rejectPriceRequest', uid);
    } else {
      await this.presentLoading('Please wait...', 10000);
      this.events.publish('price-req:acceptPriceRequest', uid);
    }
  }

  async presentLoading(msg, duration) {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: duration,
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

  ionViewWillLeave() {
    this.showSearch = false;
    this.removeSubscriptions();  
  }

  removeSubscriptions() {
    this.events.unsubscribe('price-req:publishAllPriceRequests');
    this.events.unsubscribe('price-req:rejectPriceRequestSuccess');
    this.events.unsubscribe('price-req:acceptPriceRequestSuccess');

    this.events.publish('price-req:removePriceRequestsSubs');
  }

}
