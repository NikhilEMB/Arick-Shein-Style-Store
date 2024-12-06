import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelectWidgetModalPage } from './select-widget-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SelectWidgetModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SelectWidgetModalPage]
})
export class SelectWidgetModalPageModule {}
