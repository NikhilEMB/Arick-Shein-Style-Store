import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WidgetsBannerSliderPage } from './widgets-banner-slider.page';

const routes: Routes = [
  {
    path: '',
    component: WidgetsBannerSliderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WidgetsBannerSliderPage]
})
export class WidgetsBannerSliderPageModule {}
