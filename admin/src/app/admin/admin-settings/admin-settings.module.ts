import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminSettingsPage } from './admin-settings.page';
import { CKEditorModule } from 'ng2-ckeditor';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';

const routes: Routes = [
  {
    path: '',
    component: AdminSettingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CKEditorModule,
    ApplicationDirectivesModule,
    SuperTabsModule
  ],
  declarations: [AdminSettingsPage]
})
export class AdminSettingsPageModule {}
