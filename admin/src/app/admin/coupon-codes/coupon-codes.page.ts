import { Component, OnInit } from '@angular/core';
import { Events, LoadingController, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { CouponCodesService } from 'src/app/services/coupon-codes/coupon-codes.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-coupon-codes',
  templateUrl: './coupon-codes.page.html',
  styleUrls: ['./coupon-codes.page.scss'],
})
export class CouponCodesPage implements OnInit {
  couponCodes: any = [];
  noCouponCodes: boolean = false;
  loading: any;
  showAllCoupons = true;
  constructor(private events: Events,
              private router: Router,
              private loadingController: LoadingController, private sharedService: SharedService,
              private alertController: AlertController, private couponCodesService: CouponCodesService) { }

  async ngOnInit() {
    this.initializeSubscriptions();
    this.events.publish('coupon-codes:getAllCouponCodes');
    const couponDetails:any = await this.couponCodesService.getCouponDetails();
    if (couponDetails) {
      this.showAllCoupons = couponDetails.showAllCoupons
    }
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('coupon-codes:publishAllCouponCodes', (codes) => {
      this.couponCodes = codes;
      this.noCouponCodes = false;
    });
    this.events.subscribe('coupon-codes:noCouponCodes', () => {
      this.noCouponCodes = true;
    });
    this.events.subscribe('coupon-codes:deleteCouponCodeSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Coupon Code deleted successfully!');
    });
  }

  setShowAllCoupons(){
    this.showAllCoupons = !this.showAllCoupons  
    const success = this.couponCodesService.setCouponDetails({showAllCoupons: this.showAllCoupons});
    if (success) {
      this.sharedService.presentToast('Coupon settings saved successfully');
    }
  }

  addNewCouponCode() {
    // //console.log('add new code');
    this.router.navigate(['add-coupon-codes'])
  }
  editCouponCode(code) {
    // console.log('edit code', code);
    const navigationExtras: NavigationExtras = {
      state: {
        editCodeData: code
      }
    }
    this.router.navigate(['add-coupon-codes'], navigationExtras);
  }

  async deleteCouponCode(id: string) {
    await this.presentLoading();
    this.events.publish('coupon-codes:deleteCouponCode', id);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wiat...',
      duration: 10000,
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

  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this coupon code?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteCouponCode(id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  removeSubscriptions() {
    this.events.unsubscribe('coupon-codes:publishAllCouponCodes');
    this.events.unsubscribe('coupon-codes:noCouponCodes');
    this.events.unsubscribe('coupon-codes:deleteCouponCodeSuccess');

    this.events.publish('coupon-codes:removeSubs');
  }

}
