import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CsvImportRulesPage } from './csv-import-rules.page';

const routes: Routes = [
  {
    path: '',
    component: CsvImportRulesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CsvImportRulesPage]
})
export class CsvImportRulesPageModule {}
