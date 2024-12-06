import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddIssuesModalPage } from './add-issues-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddIssuesModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddIssuesModalPage]
})
export class AddIssuesModalPageModule {}
