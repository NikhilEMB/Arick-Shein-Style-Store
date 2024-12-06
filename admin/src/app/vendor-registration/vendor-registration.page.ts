import { Component, OnInit } from '@angular/core';
import { Events, ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ConfigService } from '../services/config/config.service';
import { VendorService } from '../services/vendor/vendor.service';
import { VendorRequestModalPage } from './vendor-request-modal/vendor-request-modal.page';

@Component({
  selector: 'app-vendor-registration',
  templateUrl: './vendor-registration.page.html',
  styleUrls: ['./vendor-registration.page.scss'],
})
export class VendorRegistrationPage implements OnInit {
  registrationFields = {
    autoApprove: false,
    title: '',
    description: ''
  };

  vendorRequests = [];
  approvedRequestId;
  vendorsLimit;
  constructor(private events: Events,
    private sharedService: SharedService,
    private modalController: ModalController,
    private configService: ConfigService,
    private vendorService: VendorService) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.vendorsLimit = this.configService.environment.vendorsLimit;
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {

    this.events.subscribe('vendor:setMultiVendorDetailsSuccess', () => {
      this.sharedService.loading.dismiss();
      this.sharedService.presentAlert('Settings saved successfully');
    });

    this.events.subscribe('vendor:publishActiveStatus', (doc) => {
      if (doc.autoApprove && doc.title && doc.description) {
        this.registrationFields = doc;
      }
      console.log('registrationFields:', this.registrationFields);
    });

    this.events.subscribe('vendor:getVendorRequestsSuccess', (docs) => {
      this.vendorRequests = docs;
    });

    this.events.subscribe('vendor:updateVendorRequestSuccess', () => {
      const index = this.vendorRequests.findIndex(request => request.id === this.approvedRequestId);
      this.vendorRequests[index].approved = true;
      this.sharedService.presentAlert('Vendor Successfully Approved');
    });

    this.events.publish('vendor:getActiveStatus');
    this.events.publish('vendor:getVendorRequests');

  }

  removeSubscriptions() {
    this.events.unsubscribe('vendor:setMultiVendorDetailsSuccess');
    this.events.unsubscribe('vendor:getVendorRequestsSuccess');
    this.events.unsubscribe('vendor:publishActiveStatus');
    this.events.unsubscribe('vendor:updateVendorRequestSuccess');
  }

  disableSave() {
    if (this.registrationFields.title === '' || this.registrationFields.description === '') {
      return true;
    } else {
      return false;
    }
  }

  async saveSettings() {
    await this.sharedService.presentLoading();
    this.events.publish('vendor:setMultiVendorDetails', this.registrationFields);
  }

  async viewRequest(index){
    const modal = await this.modalController.create({
    component: VendorRequestModalPage,
    cssClass:'custom-modal',
    showBackdrop: true,
    backdropDismiss: false,
    componentProps: { vendorDetails: this.vendorRequests[index] }
    });
    modal.onDidDismiss()
    .then((res) => {
      console.log('data from modal', res);
      if(res && res.data) {
        if (res.data.approved) {
          this.approve(this.vendorRequests[index].id);
        }
      }
  });
  
    await modal.present();
  }

  async approve(requestId){
    let multiVendor:any = await this.vendorService.getActiveStatus('service');
    if (multiVendor.count && multiVendor.count < this.vendorsLimit) {
      this.approvedRequestId = requestId;
      this.events.publish('vendor:updateVendorRequest', requestId, {approved: true});
    } else{
      this.sharedService.presentAlert('Vendor Limit Reached');
    }
  }

}
