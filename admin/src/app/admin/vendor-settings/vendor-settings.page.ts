import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-vendor-settings',
  templateUrl: './vendor-settings.page.html',
  styleUrls: ['./vendor-settings.page.scss'],
})
export class VendorSettingsPage implements OnInit {

  settings = {
    active: false,
    showVendorInfo: false,
    oneVendorPerRegion: false,
    vendorKmBased: false,
    vendorKmDistance: 0,
    calcDeliveryBasedOnKm: false,
    multipleVendorInvoices: false
  };
  multiVendorDoc = false;
  isSeparateVendorInvoicesAllowed = true;
  constructor(private sharedService: SharedService,
    private events: Events,
    private configService: ConfigService) { }

  ngOnInit() {
    this.isSeparateVendorInvoicesAllowed = 'isSeparateVendorInvoicesAllowed' in this.configService.environment ? this.configService.environment.isSeparateVendorInvoicesAllowed : true;
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.events.publish('vendor:getActiveStatus');
  }

  ionViewWillLeave(){
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('vendor:setMultiVendorDetailsSuccess', () => {
      if (this.settings.active) {
        this.multiVendorDoc = true;
      }
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
      this.sharedService.presentToast("Settings saved successfully");
    });
    this.events.subscribe('vendor:publishActiveStatus', (data) => {
      if(data) {
        this.multiVendorDoc = true;
        this.settings.active = data.active;
        this.settings.showVendorInfo = data.showVendorInfo ? data.showVendorInfo : this.settings.showVendorInfo;
        this.settings.oneVendorPerRegion = data.oneVendorPerRegion ? data.oneVendorPerRegion : this.settings.oneVendorPerRegion;
        this.settings.multipleVendorInvoices = 'multipleVendorInvoices' in data ? data.multipleVendorInvoices : this.settings.multipleVendorInvoices;
        if (data.hasOwnProperty('vendorKmDistance')){
          this.settings.vendorKmDistance = data.vendorKmDistance
        } 
        if (data.hasOwnProperty('vendorKmBased')){
          this.settings.vendorKmBased = data.vendorKmBased
        } 
        if (data.hasOwnProperty('calcDeliveryBasedOnKm')){
          this.settings.calcDeliveryBasedOnKm = data.calcDeliveryBasedOnKm
        }
      } else{
        this.multiVendorDoc = false;
      }
    });
  }

  removeSubscriptions() {
    this.events.unsubscribe('vendor:setMultiVendorDetailsSuccess')
    this.events.unsubscribe('vendor:publishActiveStatus');
  }

  async saveSettings() {
    if (this.settings.vendorKmBased == true && this.settings.vendorKmDistance <= 0){
      await this.sharedService.presentAlert("Distance cant be zero!");
      return
    }
    else{
      await this.sharedService.presentLoading();
      this.events.publish('vendor:setMultiVendorDetails', this.settings);
    }
  }

}
