import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminHomePage } from './admin-home.page';
import { DateAgoPipe } from 'src/app/pipes/date-ago.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ApplicationPipesModule } from 'src/app/pipes/application-pipes.module';

const routes: Routes = [
  {
    path: '',
    component: AdminHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule,
    ApplicationPipesModule
  ],
  declarations: [AdminHomePage],
})
export class AdminHomePageModule {}
