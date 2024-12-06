import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuyVendorMembershipPage } from './buy-vendor-membership.page';

const routes: Routes = [
  {
    path: '',
    component: BuyVendorMembershipPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BuyVendorMembershipPage]
})
export class BuyVendorMembershipPageModule {}
