import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, Events } from '@ionic/angular';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.page.html',
  styleUrls: ['./payment-modal.page.scss'],
})
export class PaymentModalPage implements OnInit {

  loading: any;
  paymentData: any;
  loader: boolean;

  constructor(private events: Events, private loadingController: LoadingController, private modalController: ModalController) { }

  ngOnInit() {}
  async ionViewWillEnter() {
    this.loader = true;
    this.initializeSubscriptions();
    this.events.publish('chat:getPaymentDetails');
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('chat:publishPaymentDetails', (paymentData) => {
      this.paymentData = paymentData;
      this.loader = false;
    });
  }
  closeModal() {
    this.modalController.dismiss();
  }
  removeSubscriptions() {
    this.events.unsubscribe('chat:publishPaymentDetails');
  }
 
}
