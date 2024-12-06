import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WhatsappListServicesPage } from './whatsapp-list-services.page';

const routes: Routes = [
  {
    path: '',
    component: WhatsappListServicesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WhatsappListServicesPage]
})
export class WhatsappListServicesPageModule {}
