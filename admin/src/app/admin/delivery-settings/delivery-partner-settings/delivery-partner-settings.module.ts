import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeliveryPartnerSettingsPage } from './delivery-partner-settings.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryPartnerSettingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeliveryPartnerSettingsPage]
})
export class DeliveryPartnerSettingsPageModule {}
