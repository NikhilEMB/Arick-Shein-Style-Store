import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { PlanPaymentsPage } from './plan-payments.page';

const routes: Routes = [
  {
    path: '',
    component: PlanPaymentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperTabsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlanPaymentsPage]
})
export class PlanPaymentsPageModule {}
