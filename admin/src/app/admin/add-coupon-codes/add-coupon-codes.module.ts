import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddCouponCodesPage } from './add-coupon-codes.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { CouponCodeModalPage } from '../coupon-code-modal/coupon-code-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddCouponCodesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SuperTabsModule
  ],
  declarations: [AddCouponCodesPage, CouponCodeModalPage],
  entryComponents: [CouponCodeModalPage]
})
export class AddCouponCodesPageModule {}
