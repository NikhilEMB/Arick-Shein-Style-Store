import { Component, OnInit } from '@angular/core';
import { Events, ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-delivery-partner-settings',
  templateUrl: './delivery-partner-settings.page.html',
  styleUrls: ['./delivery-partner-settings.page.scss'],
})
export class DeliveryPartnerSettingsPage implements OnInit {
  deliveryPartnerChoice;

  wefastDetails = {
    active: false,
    token: ''
  };  

  lalamoveDetails = {
    active: false,
    apiKey: '',
    secret: ''
  };  

  dunzoDetails = {
    active: false,
    clientId: '',
    secret: ''
  };
  constructor(private sharedService: SharedService, private modalController: ModalController, private events: Events) {
  }

  ngOnInit() { }
  async ionViewWillEnter() {
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {

    this.events.subscribe('delivery:setDeliveryPartnerSettingSuccess', async (deliveryPartnerChoice) => {
      this.sharedService.loading.dismiss();
      this.sharedService.presentAlert(`${deliveryPartnerChoice.charAt(0).toUpperCase() + deliveryPartnerChoice.slice(1)} Settings Saved Successfully`);
      this.close();
    });
    this.events.subscribe('delivery:setDeliveryPartnerSettingFailure', (errMessage) => {
      console.log('deatils Failure', errMessage);
    });

    this.events.subscribe('delivery:getDeliveryPartnerSettingSuccess', (doc) => {
      if (doc) {
        Object.assign(this.getDeliveryPartnerChoiceObj(), doc);
      }
    });
    this.events.subscribe('delivery:getDeliveryPartnerSettingFailure', (errMessage) => {
      console.log('deatils Failure', errMessage);
    });

    this.events.publish('delivery:getDeliveryPartnerSetting', this.deliveryPartnerChoice);

  }

  removeSubscriptions() {
    this.events.unsubscribe('delivery:setDeliveryPartnerSettingSuccess');
    this.events.unsubscribe('delivery:setDeliveryPartnerSettingFailure');
    this.events.unsubscribe('delivery:getDeliveryPartnerSettingSuccess');
    this.events.unsubscribe('delivery:getDeliveryPartnerSettingFailure');
  }

  close() {
    this.modalController.dismiss();
  }

  disableSave() {
    let deliveryPartner = this.getDeliveryPartnerChoiceObj();
    if (deliveryPartner.active) {
      for (let i in deliveryPartner) {
        if (i != 'active' && deliveryPartner[i] === '') {
          return true;
        }
      }
    }
  }

getDeliveryPartnerChoiceObj() {
  if (this.deliveryPartnerChoice === 'wefast') {
    return this.wefastDetails;
  } else if (this.deliveryPartnerChoice === 'lalamove') {
    return this.lalamoveDetails;
  } else if (this.deliveryPartnerChoice === 'dunzo') {
    return this.dunzoDetails;
  }
}

  async saveSettings() {
    this.events.publish('delivery:setDeliveryPartnerSetting', this.getDeliveryPartnerChoiceObj(), this.deliveryPartnerChoice);
    await this.sharedService.presentLoading();
  }

}
