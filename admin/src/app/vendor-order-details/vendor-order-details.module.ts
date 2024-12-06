import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VendorOrderDetailsPage } from './vendor-order-details.page';

const routes: Routes = [
  {
    path: '',
    component: VendorOrderDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VendorOrderDetailsPage]
})
export class VendorOrderDetailsPageModule {}
