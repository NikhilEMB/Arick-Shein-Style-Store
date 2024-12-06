import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoyaltyPointsSettingsPage } from './loyalty-points-settings.page';

const routes: Routes = [
  {
    path: '',
    component: LoyaltyPointsSettingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoyaltyPointsSettingsPage]
})
export class LoyaltyPointsSettingsPageModule {}
