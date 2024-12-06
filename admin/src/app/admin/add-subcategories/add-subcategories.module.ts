import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddSubcategoriesPage } from './add-subcategories.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CKEditorModule } from 'ng2-ckeditor';

const routes: Routes = [
  {
    path: '',
    component: AddSubcategoriesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SuperTabsModule,
    Ng2SearchPipeModule,
    CKEditorModule
  ],
  declarations: [AddSubcategoriesPage]
})
export class AddSubcategoriesPageModule {}
