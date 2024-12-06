import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManageShipmentPage } from './manage-shipment.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { ClipboardModule, ClipboardService } from 'ngx-clipboard';

const routes: Routes = [
  {
    path: '',
    component: ManageShipmentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SuperTabsModule,
    ClipboardModule
  ],
  providers: [
    ClipboardService
  ],
  declarations: [ManageShipmentPage]
})
export class ManageShipmentPageModule {}
