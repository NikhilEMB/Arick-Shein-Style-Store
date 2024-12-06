import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PriceRequestsPage } from './price-requests.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';

const routes: Routes = [
  {
    path: '',
    component: PriceRequestsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule,
    ApplicationDirectivesModule
  ],
  declarations: [PriceRequestsPage]
})
export class PriceRequestsPageModule {}
