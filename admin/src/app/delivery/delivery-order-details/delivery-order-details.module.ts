import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeliveryOrderDetailsPage } from './delivery-order-details.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryOrderDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeliveryOrderDetailsPage]
})
export class DeliveryOrderDetailsPageModule {}
