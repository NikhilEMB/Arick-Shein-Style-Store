import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Events, AlertController, ModalController } from '@ionic/angular';
import { LabelService } from 'src/app/services/label/label.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { AddVendorModalPage } from './add-vendor-modal/add-vendor-modal.page';
import { VendorPageComponent } from 'src/app/components/vendor-page/vendor-page.component';

@Component({
  selector: 'app-multi-vendor-all',
  templateUrl: './multi-vendor-all.page.html',
  styleUrls: ['./multi-vendor-all.page.scss'],
})
export class MultiVendorAllPage implements OnInit {

  SHARED_LABELS: any;
  ALL_VENDORS_LABELS: any;
  headerText: any;
  vendors = [];
  multiVendor = false;
  multiVendorDoc = false;
  settings = {
    active: false,
    showVendorInfo: false,
    oneVendorPerRegion: false,
    vendorKmBased: false,
    vendorKmDistance: 0
  };
  vendorsLimit;
  searchUser: string = '';
  searchUserPhone: string = '';
  vendorSearch: string = '';

  constructor(private events: Events,
    private labelService: LabelService,
    private router: Router,
    private sharedService: SharedService,
    private alertController: AlertController,
    private configService: ConfigService,
    private vendorService: VendorService,
    private modalController: ModalController) { }

  async ionViewWillEnter() {
    this.multiVendor = this.configService.environment.multiVendor;
    let multiRegionEnv = this.configService.environment.multiRegion;
    this.vendorsLimit = this.configService.environment.vendorsLimit;
    let multiRegionActive = await this.vendorService.getMultiRegion();
    // if (multiRegionEnv && multiRegionActive && this.settings.oneVendorPerRegion) {
    //   this.settings.oneVendorPerRegion = true;
    // }
    if (this.multiVendor == false) {
      const alert = await this.alertController.create({
        message: "Sorry, this feature is not available. Please upgrade your plan for access",
        buttons: ['ok']
      });
      alert.onWillDismiss().then(() => {
        this.router.navigate(['admin-home']);
      })
      await alert.present();
    }
    this.initializeSubscriptions();
    this.events.publish('vendor:getActiveStatus');
    this.vendors = await this.vendorService.getAllVendors();
    console.log("vendors", this.vendors);
    // this.events.publish('vendor:getAllVendors');
  }

  ngOnInit() {
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.ALL_VENDORS_LABELS = this.labelService.labels['ALL_VENDORS'];
    this.headerText = this.ALL_VENDORS_LABELS['header_text'];
  }

  ngOnDestroy() {
  }

  ionViewWillLeave() {
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
      if (data) {
        this.multiVendorDoc = true;
        this.settings.active = data.active;
        this.settings.showVendorInfo = data.showVendorInfo ? data.showVendorInfo : this.settings.showVendorInfo;
        this.settings.oneVendorPerRegion = data.oneVendorPerRegion ? data.oneVendorPerRegion : this.settings.oneVendorPerRegion;
      } else {
        this.multiVendorDoc = false;
      }
    });
    // this.events.subscribe('vendor:publishAllVendors', (vendors) => {
    //   if(vendors.length) {
    //     this.vendors = vendors;
    //     console.log('if:', vendors);
    //   } else {
    //     console.log('else:', vendors);
    //     this.vendors = [];
    //   }
    // });
    this.events.subscribe('vendor:vendorDeleted', async () => {
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
      this.sharedService.presentAlert("Vendor Deleted");
      this.vendors = await this.vendorService.getAllVendors();
      //this.events.publish('vendor:getAllVendors');
    });
  }

  async saveSettings() {
    if (this.settings.vendorKmBased == true && this.settings.vendorKmDistance <= 0) {
      await this.sharedService.presentAlert("Distance cant be zero!");
      return
    }
    else {
      await this.sharedService.presentLoading();
      this.events.publish('vendor:setMultiVendorDetails', this.settings);
    }
  }

  editVendor(vendorDetails) {
    console.log('vendor id ->', vendorDetails)
    const navigationExtras: NavigationExtras = {
      state: {
        data: {
          vendorData: vendorDetails,
          vendorList: this.vendors
        }
      }
    };
    // console.log('vendor data ->', this.vendors[i])
    this.router.navigate(['multi-vendor-add'], navigationExtras);
  }

  async deleteVendor(id: string) {
    const modal = await this.alertController.create({
      message: 'Are you sure you want to delete this vendor ?',
      buttons: [
        {
          role: 'cancel',
          text: 'cancel',
          cssClass: 'secondary',
          handler: async () => {
            console.log("cancelled");
          }
        }, {
          text: 'Delete',
          handler: async () => {
            console.log("Delete vendor");
            await this.sharedService.presentLoading();
            this.events.publish('vendor:deleteVendor', id);
          }
        }]
    })
    await modal.present();
  }

  gotoMultiVendorAdd() {
    this.router.navigate(['multi-vendor-add']);
  }

  removeSubscriptions() {
    this.events.unsubscribe('vendor:multiVendorActiveChanged');
    this.events.unsubscribe('vendor:publishActiveStatus');
    // this.events.unsubscribe('vendor:publishAllVendors');
    this.events.unsubscribe('vendor:vendorActiveChanged');
    this.events.unsubscribe('vendor:vendorDeleted');
  }


  async addVendor() {
    let multiVendor: any = await this.vendorService.getActiveStatus('service');
    console.log('multiVendor:::', multiVendor);
    multiVendor['count'] = multiVendor.count ? multiVendor.count : 0;
    if (multiVendor.count < this.vendorsLimit) {
      const modal = await this.modalController.create({
        component: AddVendorModalPage,
        cssClass: 'custom-modal',
        showBackdrop: true,
        backdropDismiss: false,
      });
      modal.onDidDismiss()
        .then(async (res) => {
          console.log('data from modal', res);
          if (res.data.length) {
            this.vendors = await this.vendorService.getAllVendors();
          }
        });
      await modal.present();
    } else {
      this.sharedService.presentAlert('Vendor Limit Reached');
    }
  }

  async pageVendor(id, name) {
    const modal = await this.modalController.create({
      component: VendorPageComponent,
      cssClass: 'custom-modal big-modal',
      componentProps: { vendorId: id, vendorName: name }
    });
    modal.onDidDismiss().then(() => {

    })
    await modal.present();
  }

}
