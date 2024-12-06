import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { SharedModule } from 'src/app/components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServiceRequestsPage } from './service-requests.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceRequestsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    SuperTabsModule
  ],
  declarations: [ServiceRequestsPage]
})
export class ServiceRequestsPageModule {}
