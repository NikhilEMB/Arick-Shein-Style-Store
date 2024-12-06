import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IntegrationSettingsPage } from './integration-settings.page';

const routes: Routes = [
  {
    path: '',
    component: IntegrationSettingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IntegrationSettingsPage]
})
export class IntegrationSettingsPageModule {}
