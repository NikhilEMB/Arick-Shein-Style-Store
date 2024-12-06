import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddBrandPage } from './add-brand.page';
import { SharedModule } from 'src/app/components/shared.module';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';
import { CKEditorModule } from 'ng2-ckeditor';

const routes: Routes = [
  {
    path: '',
    component: AddBrandPage
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
    SuperTabsModule,
    CKEditorModule
  ],
  declarations: [AddBrandPage]
})
export class AddBrandPageModule {}
