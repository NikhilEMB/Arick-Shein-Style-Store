import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BannerSliderWidgetsListPage } from './banner-slider-widgets-list.page';

const routes: Routes = [
  {
    path: '',
    component: BannerSliderWidgetsListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BannerSliderWidgetsListPage]
})
export class BannerSliderWidgetsListPageModule {}
