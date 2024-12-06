import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductsToDeliverPage } from './products-to-deliver.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsToDeliverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductsToDeliverPage]
})
export class ProductsToDeliverPageModule {}
