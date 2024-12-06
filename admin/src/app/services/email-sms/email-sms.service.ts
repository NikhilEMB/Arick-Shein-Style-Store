import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Events } from '@ionic/angular';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailSmsService {

  constructor(private events: Events, private afs: AngularFirestore) { }

  initializeSubscriptions() {
    this.events.subscribe('email-sms:saveSettings', (settings, settingType, integrationType) => {
        this.saveSettings(settings, settingType, integrationType);
    });
    this.events.subscribe('email-sms:getSettings', (settingType) => {
        this.getSettings(settingType);
    });
  }

  async saveSettings(settings, settingType, integrationType) {
      try {
          if (settingType === 'email') {
              console.log('settings : ', settings, ' type : ', settingType);
              await this.afs.collection('settings').doc('email').set({
                  active: settings.active,
                  email: settings.email,
                  apiKey: settings.apiKey
              });
              this.events.publish('email-sms:saveSettingsSuccess', settingType);
          } else {
              if (integrationType == '') {
                await this.afs.collection('settings').doc('sms').set({
                    active: settings.active,
                    accountSid: settings.accountSid,
                    authToken: settings.authToken,
                    twilioNumber: settings.twilioNumber,
                    msg91: settings.msg91
                  });
                  this.events.publish('email-sms:saveSettingsSuccess', settingType);
              } else if (integrationType == 'msg91') {
                console.log('settings : msg91 ', settings, ' type : ', settingType, 'intType : ', integrationType);
                await this.afs.collection('settings').doc('sms').update({
                    msg91: settings.msg91
                  });
                  this.events.publish('email-sms:saveSettingsSuccess', settingType);
              } else if (integrationType == 'twilio') {
                console.log('settings twilio : ', settings, ' type : ', settingType, 'intType : ', integrationType);
                await this.afs.collection('settings').doc('sms').update({
                    active: settings.active,
                    accountSid: settings.accountSid,
                    authToken: settings.authToken,
                    twilioNumber: settings.twilioNumber,
                  });
                  this.events.publish('email-sms:saveSettingsSuccess', settingType);
              }
          }
      } catch (error) {
          this.events.publish('email-sms:saveSettingsFailure', error);
          console.log(error);
      }
  }

async getSettings(settingType) {
    try {
        const doc = await this.afs.collection('settings').doc(settingType).valueChanges().pipe(first()).toPromise();
        this.events.publish('email-sms:getSettingsSuccess', doc, settingType);
    } catch (error) {
        this.events.publish('email-sms:getSettingsFailure', error || 'Oops! Some error occured, Please try again later.');
        console.log(error);
    }
}


}
