import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminAllusersPage } from './admin-allusers.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

const routes: Routes = [
  {
    path: '',
    component: AdminAllusersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule,
    SuperTabsModule
  ],
  declarations: [AdminAllusersPage, SearchFilterPipe],
  exports: [SearchFilterPipe]
})
export class AdminAllusersPageModule {}
