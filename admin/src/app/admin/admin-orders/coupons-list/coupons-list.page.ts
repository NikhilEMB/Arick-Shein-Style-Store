import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { CouponCodesService } from 'src/app/services/coupon-codes/coupon-codes.service';
import { LabelService } from 'src/app/services/label/label.service';

@Component({
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.page.html',
  styleUrls: ['./coupons-list.page.scss'],
})
export class CouponsListPage implements OnInit {
  COUPONS_LIST_LABELS: any;
  couponName = '';
  isLoading = true;
  coupons = [];
  currencyCode: any;
  uid:string;
  constructor(
    private modalController: ModalController,
    private labelService: LabelService,
    private couponCodesService: CouponCodesService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.COUPONS_LIST_LABELS = this.labelService.labels['COUPONS_LIST'];
    this.currencyCode = this.configService.environment.currencyCode;
  }
  async ionViewWillEnter() {
    this.coupons = await this.couponCodesService.getCouponCodesForUser(this.uid) || [];
    this.isLoading = false;
  }

  closeModal() {
    this.modalController.dismiss();
  }

  applyCoupon(coupon?) {
    this.modalController.dismiss({couponName: (coupon || this.couponName).toUpperCase()})
  }

}
