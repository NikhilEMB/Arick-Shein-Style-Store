import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OfferCreatePage } from './offer-create.page';
import { CKEditorModule } from 'ng2-ckeditor';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';

const routes: Routes = [
  {
    path: '',
    component: OfferCreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CKEditorModule,
    ApplicationDirectivesModule
  ],
  declarations: [OfferCreatePage]
})
export class OfferCreatePageModule {}
