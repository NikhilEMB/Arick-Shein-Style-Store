import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminChatPage } from './admin-chat.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AutosizeModule } from 'ngx-autosize';
import { DateAgoPipe } from 'src/app/pipes/date-ago.pipe';
import { ApplicationPipesModule } from 'src/app/pipes/application-pipes.module';

const routes: Routes = [
  {
    path: '',
    component: AdminChatPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule,
    AutosizeModule,
    ApplicationPipesModule
  ],
  declarations: [AdminChatPage]
})
export class AdminChatPageModule {}
