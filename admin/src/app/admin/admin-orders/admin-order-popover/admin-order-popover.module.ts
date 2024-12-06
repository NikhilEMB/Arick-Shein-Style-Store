import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminOrderPopoverPage } from './admin-order-popover.page';

const routes: Routes = [
  {
    path: '',
    component: AdminOrderPopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminOrderPopoverPage]
})
export class AdminOrderPopoverPageModule {}
