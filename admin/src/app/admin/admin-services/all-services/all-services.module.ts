import { ApplicationDirectivesModule } from './../../../directives/application-directives.module';
import { SharedModule } from './../../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AllServicesPage } from './all-services.page';

const routes: Routes = [
  {
    path: '',
    component: AllServicesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    ApplicationDirectivesModule
  ],
  declarations: [AllServicesPage]
})
export class AllServicesPageModule {}
