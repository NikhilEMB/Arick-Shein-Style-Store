import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VendorMembershipPage } from './vendor-membership.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { CKEditorModule } from 'ng2-ckeditor';  

const routes: Routes = [
  {
    path: '',
    component: VendorMembershipPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SuperTabsModule,
    CKEditorModule
  ],
  declarations: [VendorMembershipPage]
})
export class VendorMembershipPageModule {}
