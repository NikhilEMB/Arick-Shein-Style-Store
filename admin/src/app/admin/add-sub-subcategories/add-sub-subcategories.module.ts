import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddSubSubcategoriesPage } from './add-sub-subcategories.page';
import { CKEditorModule } from 'ng2-ckeditor';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  {
    path: '',
    component: AddSubSubcategoriesPage
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
  declarations: [AddSubSubcategoriesPage]
})
export class AddSubSubcategoriesPageModule {}
