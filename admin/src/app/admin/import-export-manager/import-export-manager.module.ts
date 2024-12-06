import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ImportExportManagerPage } from './import-export-manager.page';

const routes: Routes = [
  {
    path: '',
    component: ImportExportManagerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ImportExportManagerPage]
})
export class ImportExportManagerPageModule {}
