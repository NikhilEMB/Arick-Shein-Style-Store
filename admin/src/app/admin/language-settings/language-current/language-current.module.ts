import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LanguageCurrentPage } from './language-current.page';

const routes: Routes = [
  {
    path: '',
    component: LanguageCurrentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule
  ],
  declarations: [LanguageCurrentPage]
})
export class LanguageCurrentPageModule {}
