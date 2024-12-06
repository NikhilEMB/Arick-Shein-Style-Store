import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AutoConfirmPaymentPage } from './auto-confirm-payment.page';

const routes: Routes = [
  {
    path: '',
    component: AutoConfirmPaymentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AutoConfirmPaymentPage]
})
export class AutoConfirmPaymentPageModule {}
