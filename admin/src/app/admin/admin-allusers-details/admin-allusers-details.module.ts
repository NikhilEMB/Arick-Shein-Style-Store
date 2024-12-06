import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminAllusersDetailsPage } from './admin-allusers-details.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { ApplicationPipesModule } from 'src/app/pipes/application-pipes.module';

const routes: Routes = [
  {
    path: '',
    component: AdminAllusersDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SuperTabsModule,
    ApplicationPipesModule
  ],
  declarations: [AdminAllusersDetailsPage]
})
export class AdminAllusersDetailsPageModule {}
