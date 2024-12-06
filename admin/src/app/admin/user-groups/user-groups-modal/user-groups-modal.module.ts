import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserGroupsModalPage } from './user-groups-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UserGroupsModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserGroupsModalPage]
})
export class UserGroupsModalPageModule {}
