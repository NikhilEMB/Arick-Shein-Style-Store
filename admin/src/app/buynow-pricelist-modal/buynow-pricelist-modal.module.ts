import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuynowPricelistModalPage } from './buynow-pricelist-modal.page';

const routes: Routes = [
  {
    path: '',
    component: BuynowPricelistModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class BuynowPricelistModalPageModule {}