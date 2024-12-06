import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VendorRequestModalPage } from './vendor-request-modal.page';

const routes: Routes = [
  {
    path: '',
    component: VendorRequestModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VendorRequestModalPage]
})
export class VendorRequestModalPageModule {}
