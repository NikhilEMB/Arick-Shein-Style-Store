import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductImageExporterPage } from './product-image-exporter.page';

const routes: Routes = [
  {
    path: '',
    component: ProductImageExporterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductImageExporterPage]
})
export class ProductImageExporterPageModule {}
