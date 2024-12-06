import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubscriptionCalendarPage } from './subscription-calendar.page';
import { CalendarModule } from 'ion2-calendar';
const routes: Routes = [
  {
    path: '',
    component: SubscriptionCalendarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubscriptionCalendarPage]
})
export class SubscriptionCalendarPageModule {}
