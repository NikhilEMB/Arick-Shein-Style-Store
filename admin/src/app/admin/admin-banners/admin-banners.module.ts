import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminBannersPage } from './admin-banners.page';
import { ImagePreloader } from 'src/app/directives/img-placeholder.directive';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: AdminBannersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ApplicationDirectivesModule,
    SuperTabsModule,
    TranslateModule
  ],
  declarations: [AdminBannersPage]
})
export class AdminBannersPageModule {}
