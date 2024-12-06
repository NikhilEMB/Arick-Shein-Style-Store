import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-subscription-calendar',
  templateUrl: './subscription-calendar.page.html',
  styleUrls: ['./subscription-calendar.page.scss'],
})
export class SubscriptionCalendarPage implements OnInit {
  options:any;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log('options--', this.options)
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
