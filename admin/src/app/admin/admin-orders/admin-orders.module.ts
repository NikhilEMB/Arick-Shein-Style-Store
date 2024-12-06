import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminOrdersPage } from './admin-orders.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { SharedModule } from 'src/app/components/shared.module';
import { StarRatingModule } from 'ionic4-star-rating';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: AdminOrdersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule,
    SuperTabsModule,
    StarRatingModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [AdminOrdersPage]
})
export class AdminOrdersPageModule {}
