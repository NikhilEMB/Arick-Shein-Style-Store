import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShopCategoriesPage } from './shop-categories.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ImagePreloader } from 'src/app/directives/img-placeholder.directive';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';
// import { IonicImageLoader } from 'ionic-image-loader';

const routes: Routes = [
  {
    path: '',
    component: ShopCategoriesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule,
    ApplicationDirectivesModule
    // IonicImageLoader
  ],
  declarations: [ShopCategoriesPage],
})
export class ShopCategoriesPageModule {}
