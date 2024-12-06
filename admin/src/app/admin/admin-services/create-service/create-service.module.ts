import { ApplicationDirectivesModule } from './../../../directives/application-directives.module';
import { SharedModule } from './../../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateServicePage } from './create-service.page';
import { CKEditorModule } from 'ng2-ckeditor';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

const routes: Routes = [
  {
    path: '',
    component: CreateServicePage
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
    CKEditorModule,
    SuperTabsModule
  ],
  declarations: [CreateServicePage]
})
export class CreateServicePageModule {}
