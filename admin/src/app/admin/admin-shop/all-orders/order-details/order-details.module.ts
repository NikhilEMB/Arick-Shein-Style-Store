import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderDetailsPage } from './order-details.page';
import { StarRatingModule } from 'ionic4-star-rating';
import { TranslateModule } from '@ngx-translate/core';
import { CancelledReasonPage } from '../cancelled-reason/cancelled-reason.page';
import { ResaleOrderPage } from 'src/app/admin/resale-order/resale-order.page';
import { EditOrderPage } from '../edit-order/edit-order.page';
import { EditOrderPageModule } from '../edit-order/edit-order.module';

const routes: Routes = [
  {
    path: '',
    component: OrderDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    StarRatingModule,
    TranslateModule,
    ReactiveFormsModule,
    //EditOrderPageModule
  ],
  declarations: [OrderDetailsPage],
  entryComponents: []
})
export class OrderDetailsPageModule {}
