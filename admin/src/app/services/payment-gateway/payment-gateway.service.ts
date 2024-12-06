import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentGatewayService {

  constructor(private events: Events, private afs: AngularFirestore) { }

  initializeSubscriptions() {
    this.events.subscribe('payment-gateway:saveSettings', (settings, gatewayChoice) => {
        this.saveSettings(settings, gatewayChoice);
    });
    this.events.subscribe('payment-gateway:getSettings', (gatewayChoice) => {
        this.getSettings(gatewayChoice);
    });
  }

  async saveSettings(settings, gatewayChoice) {
      try {
        await this.afs.collection('payment').doc(gatewayChoice).set(settings);
        this.events.publish('payment-gateway:saveSettingsSuccess', gatewayChoice);
      } catch (error) {
          this.events.publish('payment-gateway:saveSettingsFailure', error);
          console.log(error);
      }
  }

async getSettings(gatewayChoice) {
    try {
        const doc = await this.afs.collection('payment').doc(gatewayChoice).valueChanges().pipe(first()).toPromise();
        this.events.publish('payment-gateway:getSettingsSuccess', doc, gatewayChoice);
    } catch (error) {
        this.events.publish('payment-gateway:getSettingsFailure', error || 'Oops! Some error occured, Please try again later.');
        console.log(error);
    }
}
}
