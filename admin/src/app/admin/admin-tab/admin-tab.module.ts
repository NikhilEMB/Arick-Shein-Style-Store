import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminTabPage } from './admin-tab.page';


const routes: Routes = [
  {
    path: 'admin-tab',
    component: AdminTabPage,
    children: [
      
    ]
  },
  {
    path: '',
    redirectTo: '/admin-tab/admin-tab/admin-home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminTabPage]
})
export class AdminTabPageModule {}
