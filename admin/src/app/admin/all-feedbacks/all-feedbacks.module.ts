import { FeedbackDetailsPage } from './../feedback-details/feedback-details.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AllFeedbacksPage } from './all-feedbacks.page';

const routes: Routes = [
  {
    path: '',
    component: AllFeedbacksPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AllFeedbacksPage, FeedbackDetailsPage],
  entryComponents: [FeedbackDetailsPage]
})
export class AllFeedbacksPageModule {}
