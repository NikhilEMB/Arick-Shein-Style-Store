import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NoUserAccessPage } from './no-user-access.page';

const routes: Routes = [
  {
    path: '',
    component: NoUserAccessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NoUserAccessPage]
})
export class NoUserAccessPageModule {}
