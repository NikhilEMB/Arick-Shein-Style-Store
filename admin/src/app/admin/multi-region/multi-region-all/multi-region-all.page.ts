import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, Events, LoadingController, ToastController } from '@ionic/angular';
import { LabelService } from 'src/app/services/label/label.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-multi-region-all',
  templateUrl: './multi-region-all.page.html',
  styleUrls: ['./multi-region-all.page.scss'],
})
export class MultiRegionAllPage implements OnInit {

  SHARED_LABELS: any;
  ALL_REGIONS_LABELS: any;
  headerText: any;
  loading: HTMLIonLoadingElement;
  isMultiRegionActive = false;
  regions = [];
  multiRegion = false;
  type:any
  constructor(private events: Events,
              private labelService: LabelService,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private router: Router,
              private toastController: ToastController,
              private configService: ConfigService) { }

  async ionViewWillEnter(){
    this.multiRegion = this.configService.environment.multiRegion;
    if (this.multiRegion==false){
      const alert = await this.alertController.create({
        message: "Sorry, this feature is not available. Please upgrade your plan for access",
        buttons: ['ok']
      });
      alert.onWillDismiss().then(()=>{
        this.router.navigate(['admin-home']);
      })
      await alert.present();
    }
    else{
      this.events.publish('multi-region:getActiveStatus');
      this.events.publish('multi-region:getAllRegions');
    }
  }

  ngOnInit() {
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.ALL_REGIONS_LABELS = this.labelService.labels['ALL_REGIONS'];
    this.headerText = this.ALL_REGIONS_LABELS['header_text'];
    this.initializeSubscriptions();
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('multi-region:multiRegionActiveChanged', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentToast("Status changed successfully");
    });
    this.events.subscribe('multi-region:publishActiveStatus', (data) => {
      if(data) {
        this.isMultiRegionActive = data.active;
        if (data.regionType){
          this.type = data.regionType
        }
        else{
          this.type = 'pincodes'
        }
      }
      else{
        this.type = 'pincodes'
      }
    });
    this.events.subscribe('multi-region:publishAllRegions', (regions) => {
      if(regions.length) {
        this.regions = regions;
      } else {
        this.regions = [];
      }
    });
    this.events.subscribe('multi-region:regionActiveChanged', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentToast("Status changed successfully");
    });
    this.events.subscribe('multi-region:multiRegionTypeChanged', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentToast("Region type changed successfully");
    });
    this.events.subscribe('multi-region:regionDeleted', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert("Region deleted successfully");
      this.events.publish('multi-region:getAllRegions');
    });
  }

  async subscriptionsActiveToggle() {
    this.isMultiRegionActive = !this.isMultiRegionActive;
    await this.presentLoading(5000, "Please wait ...");
    this.events.publish('multi-region:toggleMultiRegionActive', this.isMultiRegionActive);
  }

  async toggleRegionActive(i: number) {
    this.regions[i].active = !this.regions[i].active;
    await this.presentLoading(5000, "Please wait ...");
    this.events.publish('multi-region:toggleRegionActive', this.regions[i].active, this.regions[i].id);
  }

  editRegion(i: number) {
    const navigationExtras: NavigationExtras = {
      state: {
        data: {
          regionData: this.regions[i],
          regionType: this.type
        }
      }
    };
    this.router.navigate(['multi-region-add'], navigationExtras);
  }

  async deleteRegion(id: string) {
    await this.presentLoading(5000, "Please wait ...");
    this.events.publish('multi-region:deleteRegion', id);
  }

  gotoMultiRegionAdd() {
    const navigationExtras: NavigationExtras = {
      state: {
        data: {
          regionType: this.type
        }
      }
    };
    this.router.navigate(['multi-region-add'], navigationExtras);
  }

  async changeType(e){
    this.type = e.target.value
    await this.presentLoading(5000, "Please wait ...");
    this.events.publish('multi-region:toggleRegionType', this.type);
  }

  async presentLoading(duration: number, msg: string) {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: duration,
    });
    await this.loading.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: this.SHARED_LABELS['ok'],
        handler: () => {
        }
      }]
    });

    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  removeSubscriptions() {
    this.events.unsubscribe('multi-region:multiRegionActiveChanged');
    this.events.unsubscribe('multi-region:publishActiveStatus');
    this.events.unsubscribe('multi-region:publishAllRegions');
    this.events.unsubscribe('multi-region:regionActiveChanged');
    this.events.unsubscribe('multi-region:regionDeleted');
    this.events.unsubscribe('multi-region:multiRegionTypeChanged');
  }

}
