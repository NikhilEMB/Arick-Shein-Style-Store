import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';
import { AreaModalPage } from '../admin/delivery-settings/area-modal/area-modal.page';
import { ContactUsService } from '../services/contact-us/contact-us.service';

@Component({
  selector: 'app-contact-settings',
  templateUrl: './contact-settings.page.html',
  styleUrls: ['./contact-settings.page.scss'],
})
export class ContactSettingsPage implements OnInit {
detailsFooter = true;
receiveMail = true;
address = [ {heading: '', address: '', email: '', phoneNo: ''} ];

location = {active: false, lat: '', lng: ''};
queries = [];

  constructor(
    private sharedService: SharedService,
    private contactUsService: ContactUsService,
    private modalController: ModalController,
  ) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    let queries:any = await this.contactUsService.getAllQueries();
    if (queries) {
      this.queries = queries || this.queries;
    }
    console.log('queries:',queries);
    let details = await this.contactUsService.getContactPgDetails();
    if (details) {
      this.address = details.address || this.address;
      this.location = details.location || this.location;
    }
  }
  showDetailsFooter(boolean){
    this.detailsFooter = boolean;
  }


  disableSave() {
    if (this.location.active) {
      if (this.location.lat && this.location.lng) {
        return false;
      } else {
        return true;
      }
    }
  }

  async saveDetails(){
    let valid = true;
    for (const address of this.address) {
      if (!(address.address.length)) {
        console.log('address:, ',address.address.length);
        valid = false;
      }
    }
    if (valid) {
      let saved = await this.contactUsService.saveContactPgDetails({
        address: this.address,
        location: this.location,
        receiveMail: this.receiveMail
      });
      if (saved) {
        this.sharedService.presentAlert('Contact Page Settings saved successfully.');
      } else {
        this.sharedService.presentAlert('Something went wrong. Please try again later');
      }
      
    } else {
      this.sharedService.presentAlert('Address cant be empty, either remove the field or fill them');
      
    }
  }

  addMore() {
    this.address.push({ heading: '', address: '', email: '', phoneNo: '' });
  }

  remove(index) {
    this.address.splice(index, 1);
  }
  
  async openMapModal() {
    const modal = await this.modalController.create({
    component: AreaModalPage,
    cssClass: 'custom-modal big-modal',
    backdropDismiss: false,
    });
    modal.onDidDismiss()
    .then((res) => {
      if (res.data && res.data.lat !=0 && res.data.lng !=0) {
        this.location.lat = res.data.lat;
        this.location.lng = res.data.lng;
      }
  });
    await modal.present();
  }


}
