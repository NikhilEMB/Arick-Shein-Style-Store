import { Component, OnInit } from '@angular/core';
import { Events, ModalController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { SharedService } from 'src/app/services/shared/shared.service';
@Component({
  selector: 'app-payment-gateway-settings',
  templateUrl: './payment-gateway-settings.page.html',
  styleUrls: ['./payment-gateway-settings.page.scss'],
})
export class PaymentGatewaySettingsPage implements OnInit {
  gatewayChoice;
  charStripe: any = this.configService.environment.currencyCode;
  charPaypal: any = this.configService.environment.currencyCode;
  charCashfree: any = this.configService.environment.currencyCode;
  charCCAvenue: any = this.configService.environment.currencyCode;
  toggleStateStripe: any = 'flt';
  toggleStatePaypal: any = 'flt';
  toggleStateCashfree: any = 'flt';
  toggleStateCCAvenue: any = 'flt';

  stripeDetails = {
    active: false,
    publishableKey: '',
    secretKey: '',
    extraChargeStripe: {
      type: 'flat',
      charge: 0,
      maxCharge: 0,
      chargeName: ''
    }
  };

  paypalDetails = {
    active: false,
    client_id: '',
    client_secret: '',
    extraChargePaypal: {
      type: 'flat',
      charge: 0,
      maxCharge: 0,
      chargeName: ''
    }
  };

  cashfreeDetails = {
    active: false,
    app_id: '',
    secret_key: '',
    extraChargeCashfree: {
      type: 'flat',
      charge: 0,
      maxCharge: 0,
      chargeName: ''
    }
  };

  payUDetails = {
    active: false,
    merchantID: '',
    key: '',
    salt: '',
  };

  atomDetails = {
    active: false,
    key: ''
  };

  paykunDetails = {
    active: false,
    merchantId: '',
    accessToken: '',
  };

  ccAvenueDetails = {
    active: false,
    merchantId: '',
    workingKey: '',
    accessCode: '',
    domain: '',
    extraChargeCCAvenue: {
      type: 'flat',
      charge: 0,
      maxCharge: 0,
      chargeName: ''
    }
  };
  constructor(private sharedService: SharedService, private modalController: ModalController, private events: Events, private configService: ConfigService) {
  }

  ngOnInit() { }
  async ionViewWillEnter() {
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {

    this.events.subscribe('payment-gateway:saveSettingsSuccess', async (gatewayChoice) => {
      this.sharedService.loading.dismiss();
      this.sharedService.presentAlert(`${gatewayChoice.charAt(0).toUpperCase() + gatewayChoice.slice(1)} Settings Saved Successfully`);
      this.close();
    });
    this.events.subscribe('payment-gateway:saveSettingsFailure', (errMessage) => {
      console.log('deatils Failure', errMessage);
    });

    this.events.subscribe('payment-gateway:getSettingsSuccess', (doc, settingType) => {
      if (doc) {
        Object.assign(this.getGatewayChoiceObj(), doc);
        console.log('gateway data :', doc);
        if (doc.extraChargeStripe) {
          if (doc.extraChargeStripe.type == 'percentage') {
            this.toggleStateStripe = 'perc';
            this.charStripe = '%';
          }
        }
        if (doc.extraChargePaypal) {
          if (doc.extraChargePaypal.type == 'percentage') {
            this.toggleStatePaypal = 'perc';
            this.charPaypal = '%';
          }
        }
        if (doc.extraChargeCashfree) {
          if (doc.extraChargeCashfree.type == 'percentage') {
            this.toggleStateCashfree = 'perc';
            this.charCashfree = '%';
          }
        }
        if (doc.extraChargeCCAvenue) {
          if (doc.extraChargeCCAvenue.type == 'percentage') {
            this.toggleStateCCAvenue = 'perc';
            this.charCCAvenue = '%';
          }
        }
      }
    });
    this.events.subscribe('payment-gateway:getSettingsFailure', (errMessage) => {
      console.log('deatils Failure', errMessage);
    });

    this.events.publish('payment-gateway:getSettings', this.gatewayChoice);

  }

  removeSubscriptions() {
    this.events.unsubscribe('payment-gateway:saveSettingsSuccess');
    this.events.unsubscribe('payment-gateway:saveSettingsFailure');
    this.events.unsubscribe('payment-gateway:getSettingsSuccess');
    this.events.unsubscribe('payment-gateway:getSettingsFailure');
  }

  close() {
    this.modalController.dismiss();
  }

  disableSave() {
    let gateway = this.getGatewayChoiceObj();
    if (gateway.active) {
      for (let i in gateway) {
        if (i != 'active' && gateway[i] === '') {
          return true;
        }
      }
    }
  }

  getGatewayChoiceObj() {
    if (this.gatewayChoice === 'stripe') {
      if (this.stripeDetails.extraChargeStripe.charge == null) {
        this.stripeDetails.extraChargeStripe.charge = 0;
      }
      if (this.stripeDetails.extraChargeStripe.maxCharge == null) {
        this.stripeDetails.extraChargeStripe.maxCharge = 0;
      }
      return this.stripeDetails;
    } else if (this.gatewayChoice === 'paypal') {
      if (this.paypalDetails.extraChargePaypal.charge == null) {
        this.paypalDetails.extraChargePaypal.charge = 0;
      }
      if (this.paypalDetails.extraChargePaypal.maxCharge == null) {
        this.paypalDetails.extraChargePaypal.maxCharge = 0;
      }
      return this.paypalDetails;
    } else if (this.gatewayChoice === 'cashfree') {
      if (this.cashfreeDetails.extraChargeCashfree.charge == null) {
        this.cashfreeDetails.extraChargeCashfree.charge = 0;
      }
      if (this.cashfreeDetails.extraChargeCashfree.maxCharge == null) {
        this.cashfreeDetails.extraChargeCashfree.maxCharge = 0;
      }
      return this.cashfreeDetails;
    } else if (this.gatewayChoice === 'payU') {
      return this.payUDetails;
    } else if (this.gatewayChoice === 'paykun') {
      return this.paykunDetails;
    } else if (this.gatewayChoice === 'atom') {
      return this.atomDetails;
    } else if (this.gatewayChoice === 'ccAvenue') {
      if (this.ccAvenueDetails.extraChargeCCAvenue.charge == null) {
        this.ccAvenueDetails.extraChargeCCAvenue.charge = 0;
      }
      if (this.ccAvenueDetails.extraChargeCCAvenue.maxCharge == null) {
        this.ccAvenueDetails.extraChargeCCAvenue.maxCharge = 0;
      }
      return this.ccAvenueDetails;
    }
  }

  async saveSettings() {
    this.events.publish('payment-gateway:saveSettings', this.getGatewayChoiceObj(), this.gatewayChoice);
    await this.sharedService.presentLoading();
  }

  extraChargesTypeStripe(event: any) {
    this.stripeDetails.extraChargeStripe.type = event.target.checked ? 'percentage' : 'flat';
    if (event.target.checked) {
      this.charStripe = '%';
      this.toggleStateStripe = 'perc';
    } else {
      this.charStripe = this.configService.environment.currencyCode;
      this.toggleStateStripe = 'flt';
    }
    console.log('char :', this.charStripe)
  }

  extraChargesTypePaypal(event: any) {
    this.paypalDetails.extraChargePaypal.type = event.target.checked ? 'percentage' : 'flat';
    if (event.target.checked) {
      this.charPaypal = '%';
      this.toggleStatePaypal = 'perc';
    } else {
      this.charPaypal = this.configService.environment.currencyCode;
      this.toggleStatePaypal = 'flt';
    }
    console.log('char :', this.charPaypal)
  }

  extraChargesTypeCashfree(event: any) {
    this.cashfreeDetails.extraChargeCashfree.type = event.target.checked ? 'percentage' : 'flat';
    if (event.target.checked) {
      this.charCashfree = '%';
      this.toggleStateCashfree = 'perc';
    } else {
      this.charCashfree = this.configService.environment.currencyCode;
      this.toggleStateCashfree = 'flt';
    }
    console.log('char :', this.charCashfree)
  }

  extraChargesTypeCCAvenue(event: any) {
    this.ccAvenueDetails.extraChargeCCAvenue.type = event.target.checked ? 'percentage' : 'flat';
    if (event.target.checked) {
      this.charCCAvenue = '%';
      this.toggleStateCCAvenue = 'perc';
    } else {
      this.charCCAvenue = this.configService.environment.currencyCode;
      this.toggleStateCCAvenue = 'flt';
    }
    console.log('char :', this.charCCAvenue)
  }

}
