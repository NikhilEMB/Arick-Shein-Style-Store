import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminBestSellersPage } from './admin-best-sellers.page';
import { BestSellersModalPage } from '../best-sellers-modal/best-sellers-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AdminBestSellersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminBestSellersPage, BestSellersModalPage],
  entryComponents: [BestSellersModalPage]
})
export class AdminBestSellersPageModule {}
