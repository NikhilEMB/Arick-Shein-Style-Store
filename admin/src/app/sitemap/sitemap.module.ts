import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SitemapPage } from './sitemap.page';
import { ApplicationPipesModule } from '../pipes/application-pipes.module';

const routes: Routes = [
  {
    path: '',
    component: SitemapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ApplicationPipesModule
  ],
  declarations: [SitemapPage]
})
export class SitemapPageModule {}
