import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserOrderHistoryPage } from './user-order-history.page';

const routes: Routes = [
  {
    path: '',
    component: UserOrderHistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserOrderHistoryPage]
})
export class UserOrderHistoryPageModule {}
