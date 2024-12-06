import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductCarouselListPage } from './product-carousel-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProductCarouselListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductCarouselListPage]
})
export class ProductCarouselListPageModule {}
