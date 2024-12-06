import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditProductCarouselPage } from './edit-product-carousel.page';

const routes: Routes = [
  {
    path: '',
    component: EditProductCarouselPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditProductCarouselPage]
})
export class EditProductCarouselPageModule {}
