import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewProductPage } from './new-product.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from 'src/app/components/shared.module';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';
import { TemplatesModalPage } from '../../variants/templates-modal/templates-modal.page';
import { CKEditorModule } from 'ng2-ckeditor';  
import { ApplicationPipesModule } from 'src/app/pipes/application-pipes.module';
const routes: Routes = [
  {
    path: '',
    component: NewProductPage
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
    SharedModule,
    CKEditorModule,
    ApplicationDirectivesModule,
    ApplicationPipesModule
  ],
  declarations: [NewProductPage, TemplatesModalPage],
  entryComponents: [TemplatesModalPage]
})
export class NewProductPageModule {}
