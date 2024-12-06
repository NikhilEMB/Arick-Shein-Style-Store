import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BroadcastMsgPage } from './broadcast-msg.page';

const routes: Routes = [
  {
    path: '',
    component: BroadcastMsgPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BroadcastMsgPage]
})
export class BroadcastMsgPageModule {}
