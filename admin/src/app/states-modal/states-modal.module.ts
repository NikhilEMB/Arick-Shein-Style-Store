import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StatesModalPage } from './states-modal.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  {
    path: '',
    component: StatesModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule
  ],
  declarations: [StatesModalPage]
})
export class StatesModalPageModule {}