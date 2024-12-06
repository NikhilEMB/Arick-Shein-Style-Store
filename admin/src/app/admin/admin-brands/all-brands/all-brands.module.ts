import { ApplicationDirectivesModule } from './../../../directives/application-directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AllBrandsPage } from './all-brands.page';
import { SharedModule } from 'src/app/components/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  {
    path: '',
    component: AllBrandsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    ApplicationDirectivesModule,
    Ng2SearchPipeModule
  ],
  declarations: [AllBrandsPage]
})
export class AllBrandsPageModule {}
