import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditImageBannerPage } from './edit-image-banner.page';

const routes: Routes = [
  {
    path: '',
    component: EditImageBannerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditImageBannerPage]
})
export class EditImageBannerPageModule {}
