import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserCartDetailsModalPage } from './user-cart-details-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UserCartDetailsModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserCartDetailsModalPage]
})
export class UserCartDetailsModalPageModule {}
