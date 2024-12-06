import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { ConfigService } from 'src/app/services/config/config.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { VendorMembership } from '../vendor-membership.model';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-buy-vendor-membership',
  templateUrl: './buy-vendor-membership.page.html',
  styleUrls: ['./buy-vendor-membership.page.scss'],
})
export class BuyVendorMembershipPage implements OnInit {
  membershipSettings: VendorMembership = {
    active: false,
    name: "",
    description: "",
    plans: [],
  }

  currencyCode: any;
  userMembership: any;
  userId: string;

  constructor(
    private configService: ConfigService,
    private alertController: AlertController,
    private sharedService: SharedService,
    private vendorService: VendorService,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.currencyCode = this.configService.environment.currencyCode;
  }

  async ionViewWillEnter() {
    await this.sharedService.presentLoading();
    this.userId = await this.storage.get('uid');

    const vendor: any = await this.vendorService.getVendorData(this.userId, 'details');
    console.log("vendorData", vendor);
    this.userMembership = "membership" in vendor ? vendor.membership : undefined;

    const response: any = await this.vendorService.getVendorMembership();
    await this.sharedService.loading.dismiss();
    if (response) {
      this.membershipSettings = response;
    } else {
      await this.sharedService.presentAlert('Something went wrong ! please try again.');
    }
  }

  getMonths(months) {
    return months === 1 ? '1 Month' : `${months} Months`;
  }
  getDiscount(price, disPrice): number {
    return parseInt((((price - disPrice) / price) * 100).toFixed(0));
  }
  totalDaysLeft() {
    const today = moment().format('YYYY-MM-DD');
    return moment(this.userMembership.validTill).diff(moment(today), 'days');
  }

  async buyPlan(index: number) {
    console.log("this.userId = ", this.userId);
    await this.sharedService.presentLoading();
    const selectedPlan = this.membershipSettings.plans[index];
    const settings = { ...this.membershipSettings };
    delete settings.plans;
    delete settings.active;
    settings["plan"] = selectedPlan;

    let orderObject = {
      status: true,
      orderType: "vendorMembership",
      quantity: 1,
      name: this.membershipSettings.name,
      membershipSettings: settings,
      description: this.getMonths(selectedPlan.months),
      img: {
        url: "assets/img/shop-logo-color.png",
        mob: "assets/img/shop-logo-color.png",
        thumb: "assets/img/shop-logo-color.png"
      },
      commentMsg: '',
      commentImgs: [],
    }

    let membership: any = {
      active: true,
      name: this.membershipSettings.name,
      months: this.getMonths(selectedPlan.months),
      membershipSettings: settings,
    }
    if (selectedPlan.discountedPrice < selectedPlan.price) {
      orderObject['mrpPrice'] = selectedPlan.price;
      orderObject['price'] = selectedPlan.discountedPrice;

      membership['mrpPrice'] = selectedPlan.price;
      membership['price'] = selectedPlan.discountedPrice;
    } else {
      orderObject['price'] = selectedPlan.price;
      membership['price'] = selectedPlan.price;
    }
    const response = await this.vendorService.updateVendorInfo(this.userId, { membership: membership });
    await this.sharedService.loading.dismiss();
    if (response) {
      await this.sharedService.presentAlert('Membership Purchased Successfully');
    } else {
      await this.sharedService.presentAlert("Membership Purchase Failed");
    }

  }
}
