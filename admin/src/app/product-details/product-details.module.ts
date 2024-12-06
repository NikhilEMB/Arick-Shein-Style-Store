import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsPage } from './product-details.page';
import { BuynowPricelistModalPage } from '../buynow-pricelist-modal/buynow-pricelist-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProductDetailsPage, BuynowPricelistModalPage],
  entryComponents: [BuynowPricelistModalPage]
})
export class ProductDetailsPageModule {}
