import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OfferSettingsPage } from './offer-settings.page';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';

const routes: Routes = [
  {
    path: '',
    component: OfferSettingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ApplicationDirectivesModule
  ],
  declarations: [OfferSettingsPage]
})
export class OfferSettingsPageModule {}
