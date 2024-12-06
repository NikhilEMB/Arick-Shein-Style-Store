import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateShowcasePage } from './create-showcase.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from 'src/app/components/shared.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';

const routes: Routes = [
  {
    path: '',
    component: CreateShowcasePage
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
    ApplicationDirectivesModule
  ],
  declarations: [CreateShowcasePage ],
  entryComponents: []
})
export class CreateShowcasePageModule { }
