import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewOrderPage } from './view-order.page';
import { StarRatingModule } from 'ionic4-star-rating';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/components/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ViewOrderPage
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
    SharedModule
  ],
  declarations: [ViewOrderPage]
})
export class ViewOrderPageModule {}
