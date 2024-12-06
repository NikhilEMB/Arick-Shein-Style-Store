import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { VendorMembership } from './vendor-membership.model';

@Component({
  selector: 'app-vendor-membership',
  templateUrl: './vendor-membership.page.html',
  styleUrls: ['./vendor-membership.page.scss'],
})
export class VendorMembershipPage implements OnInit {

  membershipSettings: VendorMembership = {
    active: false,
    name: "",
    description: "",
    plans: [],
  }

  membershipVendors = [];
  currencyCode: any;
  ckeConfig: any;

  constructor(
    private configService: ConfigService,
    private alertController: AlertController,
    private sharedService: SharedService,
    private vendorService: VendorService
  ) { }

  ngOnInit() {
    this.currencyCode = this.configService.environment.currencyCode;
    this.ckeConfig = {
      allowedContent: true,
      height: 150
    }
  }

  async ionViewWillEnter() {
    await this.sharedService.presentLoading();
    const response: any = await this.vendorService.getVendorMembership();
    await this.sharedService.loading.dismiss();
    if (response) {
      this.membershipSettings = response;
    } else {
      await this.sharedService.presentAlert('Something went wrong ! please try again.');
    }
  }

  toggleCheckbox() {
    this.membershipSettings.active = !this.membershipSettings.active;
  }

  async addPlan() {
    const alert = await this.alertController.create({
      subHeader: 'Plan Details',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name of plan'
        },
        {
          name: 'months',
          type: 'number',
          placeholder: 'Number of Months'
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'Enter price'
        },
        {
          name: 'discountedPrice',
          type: 'number',
          placeholder: 'Enter discounted price'
        },

      ],
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Add',
          handler: async (plan) => {
            if (!plan.name || !parseInt(plan.months) || !parseInt(plan.price) || !parseInt(plan.discountedPrice)) {
              await this.sharedService.presentAlert('Please fill all the details');
              return false;
            }
            else if (parseInt(plan.discountedPrice) > parseInt(plan.price)) {
              await this.sharedService.presentAlert('Discounted price greater');
              return false;
            }
            else {
              this.membershipSettings.plans.push({
                name: plan.name,
                months: parseInt(plan.months),
                price: parseInt(plan.price),
                discountedPrice: parseInt(plan.discountedPrice),
              });
              console.log("plans", this.membershipSettings.plans);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  removePlan(i: number) {
    this.membershipSettings.plans.splice(i, 1);
  }

  async saveSettings() {
    await this.sharedService.presentLoading();
    if (!this.membershipSettings.name) {
      await this.sharedService.loading.dismiss();
      await this.sharedService.presentAlert('Please enter a name');
    } else {
      let response: boolean = await this.vendorService.saveVendorMembership(this.membershipSettings);
      await this.sharedService.loading.dismiss();
      if (response) {
        await this.sharedService.presentAlert('Successfully Saved');
      } else {
        await this.sharedService.presentAlert("Save failed");
      }
    }
  }

}
