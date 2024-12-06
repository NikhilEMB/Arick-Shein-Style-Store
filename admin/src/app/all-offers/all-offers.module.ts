import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AllOffersPage } from './all-offers.page';
import { ApplicationDirectivesModule } from '../directives/application-directives.module';

const routes: Routes = [
  {
    path: '',
    component: AllOffersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ApplicationDirectivesModule
  ],
  declarations: [AllOffersPage]
})
export class AllOffersPageModule {}
