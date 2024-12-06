import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChangeBookingSlotPage } from './change-booking-slot.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeBookingSlotPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangeBookingSlotPage]
})
export class ChangeBookingSlotPageModule {}
