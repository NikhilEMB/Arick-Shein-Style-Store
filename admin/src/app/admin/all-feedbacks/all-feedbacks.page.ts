import { FeedbackDetailsPage } from './../feedback-details/feedback-details.page';
import { Component, OnInit } from '@angular/core';
import { Events, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-all-feedbacks',
  templateUrl: './all-feedbacks.page.html',
  styleUrls: ['./all-feedbacks.page.scss'],
})
export class AllFeedbacksPage implements OnInit {
  feedbacks: any = [];
  showLoader = true;

  constructor(private events: Events,
              private modalController: ModalController) { }

  ngOnInit() {
    this.initializeSubscriptions();
    this.events.publish('feedback:getFeedbacks');
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('feedback:publishFeedbacks', (feedbacks) => {
      this.showLoader = false;
      this.feedbacks = feedbacks;
    });
  }

  async viewDetails(feed) {
    const modal = await this.modalController.create({
      component: FeedbackDetailsPage,
      componentProps: { desc: feed.description, images: feed.images }
      });
    await modal.present();
  }

  removeSubscriptions() {
    this.events.unsubscribe('feedback:publishFeedbacks');
  }

}
