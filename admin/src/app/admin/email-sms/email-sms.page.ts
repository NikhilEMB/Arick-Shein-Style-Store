import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Events } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-email-sms',
  templateUrl: './email-sms.page.html',
  styleUrls: ['./email-sms.page.scss'],
})
export class EmailSmsPage implements OnInit {
  emailSettings = {
    active: false,
    email: '',
    apiKey: '',
  };
  smsSettings = {
    active: false,
    accountSid: '',
    authToken: '',
    twilioNumber: '',
    msg91: {
      active: false,
      smsSenderId: '',
      smsKey: '',
      templateId: {
        cancelled: '',
        confirmed: '',
        delivered: '',
        dispatched: ''
      }
    }
  };

  constructor(private events: Events,
              private router: Router,
              private sharedService: SharedService,
              private alertController: AlertController) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {

    this.events.subscribe('email-sms:saveSettingsSuccess', async (settingType) => {
      this.sharedService.loading.dismiss();
      this.sharedService.presentAlert(`${settingType.charAt(0).toUpperCase() + settingType.slice(1)} Settings Saved Successfully`);
    });
    this.events.subscribe('email-sms:saveSettingsFailure', (errMessage) => {
      console.log('details Failure', errMessage);
    });

    this.events.subscribe('email-sms:getSettingsSuccess', (doc, settingType) => {
      console.log('doc:', doc);
      if (settingType === 'email' && doc.active) {
        this.emailSettings.active = doc.active;
        this.emailSettings.email = doc.email;
        this.emailSettings.apiKey = doc.apiKey;
      } else if (settingType === 'sms' && doc) {
          this.smsSettings.active = doc.active;
          this.smsSettings.accountSid = doc.accountSid;
          this.smsSettings.authToken = doc.authToken;
          this.smsSettings.twilioNumber = doc.twilioNumber;
          if (doc.msg91){
            this.smsSettings.msg91 = doc.msg91;
          }
      }
    });
    this.events.subscribe('email-sms:getSettingsFailure', (errMessage) => {
      console.log('details Failure', errMessage);
    });

    this.events.publish('email-sms:getSettings', 'email');
    this.events.publish('email-sms:getSettings', 'sms');

  }

  removeSubscriptions() {
    this.events.unsubscribe('email-sms:saveSettingsSuccess');
    this.events.unsubscribe('email-sms:saveSettingsFailure');
    this.events.unsubscribe('email-sms:getSettingsSuccess');
    this.events.unsubscribe('email-sms:getSettingsFailure');
  }

  disableEmailSave() {
    if (this.emailSettings.email === '' || this.emailSettings.apiKey === '') {
      return true;
    } else {
      return false;
    }
  }

  disableSmsSave() {
    if (this.smsSettings.active && (this.smsSettings.accountSid === '' || this.smsSettings.authToken === '' || this.smsSettings.twilioNumber === '')) {
      return true;
    } else {
      return false;
    }
  }

  async saveEmailSettings() {
    console.log('emailsettings:', this.emailSettings);
    await this.sharedService.presentLoading();
    this.emailSettings.email.trim();
    this.emailSettings.apiKey.trim();
    this.events.publish('email-sms:saveSettings', this.emailSettings, 'email', '');
  }

  async saveSmsSettings() {
    if (this.smsSettings.msg91.active && (!this.smsSettings.msg91.smsKey || !this.smsSettings.msg91.templateId.cancelled || !this.smsSettings.msg91.templateId.confirmed
      || !this.smsSettings.msg91.templateId.dispatched || !this.smsSettings.msg91.templateId.delivered)){
        await this.sharedService.presentAlert('Please fill all details!')
    }
    else{
      await this.sharedService.presentLoading();
      this.smsSettings.accountSid.trim();
      this.smsSettings.authToken.trim();
      this.smsSettings.twilioNumber.trim();
      this.events.publish('email-sms:saveSettings', this.smsSettings, 'sms', '');
    }
  }

}
