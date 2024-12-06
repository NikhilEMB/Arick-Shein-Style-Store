import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor'; 
import { IonicModule } from '@ionic/angular';

import { EditVideoBlockPage } from './edit-video-block.page';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: EditVideoBlockPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    CKEditorModule
  ],
  declarations: [EditVideoBlockPage]
})
export class EditVideoBlockPageModule {}
