import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WidgetTypeModalPage } from './widget-type-modal.page';

const routes: Routes = [
  {
    path: '',
    component: WidgetTypeModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WidgetTypeModalPage]
})
export class WidgetTypeModalPageModule {}
