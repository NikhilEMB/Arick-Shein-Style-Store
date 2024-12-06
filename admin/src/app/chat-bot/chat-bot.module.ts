import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatBotPage } from './chat-bot.page';
import { AutosizeModule } from 'ngx-autosize';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ApplicationPipesModule } from '../pipes/application-pipes.module';

const routes: Routes = [
  {
    path: '',
    component: ChatBotPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AutosizeModule,
    Ng2SearchPipeModule,
    ApplicationPipesModule
  ],
  declarations: [ChatBotPage],
})
export class ChatBotPageModule {}
