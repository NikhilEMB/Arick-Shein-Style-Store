import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WhatsappPromotionsPage } from './whatsapp-promotions.page';

const routes: Routes = [
  {
    path: '',
    component: WhatsappPromotionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WhatsappPromotionsPage]
})
export class WhatsappPromotionsPageModule {}
