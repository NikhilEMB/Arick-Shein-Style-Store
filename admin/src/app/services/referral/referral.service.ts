import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { LogglyLoggerService } from '../loggly-logger/loggly-logger.service';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {

  referralRef = this.afs.collection('settings').doc('referral');
  constructor(private events: Events,
              private afs: AngularFirestore,
              private logglyService: LogglyLoggerService) { }

  initializeSubscriptions() {
    this.events.subscribe('referral:saveSettings', (data) => {
      this.saveSettings(data);
    });
    this.events.subscribe('referral:getReferralSettings', () => {
      this.getReferralSettings();
    });
  }

  async getReferralSettings(route?) {
    console.log(123)
    try {
      const settings = await this.referralRef.valueChanges().pipe(first()).toPromise();
      if(!route) {
        this.events.publish('referral:publishReferralSettings', settings);
      } else {
        return settings;
      }
    } catch (error) {
      console.dir(error);
      error['location'] = 'referral-service:getReferralSettings';
      this.logglyService.log(error);
    }
  }

  async saveSettings(data: any) {
    try {
      await this.referralRef.set(data);
      this.events.publish('referral:saveSettingsSuccess');
      this.events.publish('referral:getReferralSettings');
    } catch (error) {
      console.dir(error);
      error['location'] = 'referral-service:saveSettings';
      this.logglyService.log(error);
    }
  }

}
