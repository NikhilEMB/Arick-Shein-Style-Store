import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor'; 
import { IonicModule } from '@ionic/angular';

import { AboutSettingPage } from './about-setting.page';

const routes: Routes = [
  {
    path: '',
    component: AboutSettingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CKEditorModule
  ],
  declarations: [AboutSettingPage]
})
export class AboutSettingPageModule {}
