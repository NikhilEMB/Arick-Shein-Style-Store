import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Events } from '@ionic/angular';
import { LoadingController,AlertController} from '@ionic/angular';
import { IntegrationsService } from 'src/app/services/integrations/integrations.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config/config.service';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
@Component({
  selector: 'app-integration-settings',
  templateUrl: './integration-settings.page.html',
  styleUrls: ['./integration-settings.page.scss'],
})
export class IntegrationSettingsPage implements OnInit {
  integrationChoice;
  sidemenuChoice;

  templateVal1 = '{{1}}'
  templateVal2 = '{{2}}'
  templateVal3 = '{{3}}'

  margDetails = {
    active: false,
    credentials: {
      margId: '',
      companyCode: '',
      key: ''
    },
  };

  shiprocketDetails = {
    active: false,
    credentials: {
      email: '',
      password: ''
    },
    metaData: {
      chargesManual: false
    }
  }

  shypliteDetails = {
    active: false,
    credentials: {
      appId: '',
      key: '',
      secret: '',
      sellerId: '',
      pickupAddressId: ''
    }
  }

  dunzoDetails = {
    active: false,
    credentials: {
      clientId: '',
      clientSecret: '',
      dunzoHost: ''
    },
    metaData: {
      chargesManual: false
    }
  }

  fastbeetleDetails = {
    active: false,
    credentials: {
      apiKey: '',
      merchantId: ''
    },
    metaData: {
      chargesManual: false
    }
  }

  nimbuspostDetails = {
    active: false,
    credentials: {
      email: '',
      password: ''
    },
    metaData: {
      chargesManual: false
    }
  }

  delhiveryDetails = {
    active: false,
    credentials: {
      warehouse: '',
      token: ''
    },
    metaData: {
      chargesManual: false
    }
  }

  pickrrDetails = {
    active: false,
    credentials: {
      authToken: ''
    },
    metaData: {
      chargesManual: false
    }
  }

  sendgridDetails = {
    active: false,
    credentials: {
      email: '',
      apiKey: ''
    }
  }

  omsGuruDetails = {
    active: false,
    credentials: {
      token: '',
      omscid: '',
      warehouseId: '',
      username: '',
      password: ''
    }
  }

  twilioOrderDetails = {
    active: false,
    credentials: {
      accountSid: '',
      authToken: '',
      twilioNumber: '',
    }
  }

  twilioDetails = {
    active: false,
    credentials: {
      accountSid: '',
      authToken: '',
      twilioNumber: '',
    },
    events: {
      onCreateUser: {
        active: false,
        body: ''
      }
    }
  }

  twilioPromotionDetails = {
    active: false,
    credentials: {
      accountSid: '',
      authToken: '',
      twilioNumber: '',
    },
    templateDetails: {
      templateBody: '',
      templateParams: []
    }
  }

  msg91Details = {
    active: false,
    credentials: {
      smsSenderId: '',
      smsKey: '',
      templateId: {
        cancelled: '',
        confirmed: '',
        delivered: '',
        dispatched: ''
      }
    }
  }

  // whatsapp
  aisensyDetails = {
    active: false,
    credentials: {
      apiKey: ''
    },
    campDetails: []
  };

  campArrayAisensy = [];
  campBodyAisensy = {
    campaignName: "",
    param: ""
  };

  zohoDetails = {
    active: false,
    credentials: {
      clientId: '',
      clientSecret: '',
      code: ''
    }
  }

  zohoInventoryGrantTokenLink = ''
  zohoInventoryDetails = {
    active: false,
    credentials: {
      clientId: '',
      clientSecret: '',
      redirectURI: '',
      generateZohoAuthLink: '',
      organizationId: '',
    },
    initProdSync: false,
    initSalesOrderSync: false,
    initCustomerSync: false
  }

  interaktDetailsPromotion = {
    active: false,
    credentials: {
      apiKey: ''
    },
    campDetails: []
  }
  campArrayInterakt = [];
  campBodyInterakt = {
    campaignName: "",
    param: ""
  };

  interaktDetailsOrder = {
    active: false,
    credentials: {
      apiKey: ''
    }
  }

  aisensyDetailsOrder = {
    active: false,
    credentials: {
      apiKey: ''
    }
  }

  shopifyOrdersSyncDetails = {
    active: false,
    credentials: {
      storeName: '',
      apiVersion: '',
      apiKey: '',
      apiSecret: '',
      storefrontApiKey: '',
      accessToken: ''
    }
  }

  porterDetails = {
    active: false,
    credentials: {
      apiKey: ''
    },
    metaData: {
      chargesManual: false
    }
  }

  middlewareUrl = this.configService.environment.middleware ? this.configService.environment.middleware : 'https://us-central1-bwi-middleware-dev.cloudfunctions.net'

  constructor(private sharedService: SharedService, private modalController: ModalController, private integrationService: IntegrationsService, private events: Events, private http: HttpClient, private alertController: AlertController, private configService: ConfigService,) {
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const integrationDetails: any = await this.integrationService.getSubChoiceSettings(this.sidemenuChoice, this.integrationChoice);
    if (integrationDetails) {
      Object.assign(this.getIntegrationChoiceObj(), integrationDetails);

      // aisensyDetails
      if (this.aisensyDetails.campDetails.length > 0) {
        this.campArrayAisensy = this.aisensyDetails.campDetails;
        // console.log("d", this.campArrayAisensy);
      }
      if (this.interaktDetailsPromotion.campDetails.length > 0) {
        this.campArrayInterakt = this.interaktDetailsPromotion.campDetails;
        // console.log("d", this.campArrayAisensy);
      }
    }
  }

  async addCampObj(type) {
    if (type === 'aisensy') {
      if (this.campBodyAisensy.campaignName == "") {
        this.sharedService.presentAlert("Campaign name missing!");
      }
      else {
        this.campArrayAisensy.push(
          {
            campaignName: this.campBodyAisensy.campaignName,
            param: ''
          }
        );
        this.campBodyAisensy.campaignName = "";
        this.campBodyAisensy.param = "";
        // console.log("camp Array:", this.campArrayAisensy);
      }
    }
    if (type === 'interakt') {
      if (this.campBodyInterakt.campaignName == "") {
        this.sharedService.presentAlert("Campaign name missing!");
      }
      else {
        this.campArrayInterakt.push(
          {
            campaignName: this.campBodyInterakt.campaignName,
            param: ''
          }
        );
        this.campBodyInterakt.campaignName = "";
        this.campBodyInterakt.param = "";
        // console.log("camp Array:", this.campArrayAisensy);
      }
    }
  }
  
  async deleteCampObj(type, i: number) {
    if (type === 'aisensy') {
      this.campArrayAisensy.splice(i,1);
    }
    if (type === 'interakt') {
      this.campArrayInterakt.splice(i,1);
    }
  }

  close() {
    this.modalController.dismiss();
  }

  disableSave() {
    let integrationDetails = this.getIntegrationChoiceObj();
    if (integrationDetails.active) {
      for (let i in integrationDetails.credentials) {
        if (integrationDetails.credentials[i] === '') {
          return true;
        }
      }
    }
  }

  getIntegrationChoiceObj() {
    if (this.integrationChoice === 'marg') {
      return this.margDetails;
    } else if (this.integrationChoice === 'shiprocket') {
      return this.shiprocketDetails;
    } else if (this.integrationChoice === 'shyplite') {
      return this.shypliteDetails;
    } else if (this.integrationChoice === 'dunzo') {
      return this.dunzoDetails;
    } else if (this.integrationChoice === 'nimbuspost') {
      return this.nimbuspostDetails;
    } else if (this.integrationChoice === 'fastbeetle') {
      return this.fastbeetleDetails;
    } else if (this.integrationChoice === 'delhivery') {
      return this.delhiveryDetails;
    } else if (this.integrationChoice === 'zoho') {
      return this.zohoDetails;
    } else if (this.integrationChoice === 'pickrr') {
      return this.pickrrDetails;
    } else if (this.integrationChoice === 'sendgrid') {
      this.sendgridDetails.credentials.email.trim()
      this.sendgridDetails.credentials.apiKey.trim()
      let emailSettings = {
        active: false,
        email: '',
        apiKey: '',
      };
      emailSettings.email = this.sendgridDetails.credentials.email.trim()
      emailSettings.apiKey = this.sendgridDetails.credentials.apiKey.trim()
      if (emailSettings.email !== '' && emailSettings.apiKey !== '') {
        this.events.publish('email-sms:saveSettings', emailSettings, 'email');
      }
      return this.sendgridDetails;
    } else if (this.integrationChoice === 'omsguru') {
      return this.omsGuruDetails;
    } else if (this.integrationChoice === 'msg91') {
      let smsSettings = {
        msg91: {
          active: this.msg91Details.active,
          smsSenderId: this.msg91Details.credentials.smsSenderId,
          smsKey: this.msg91Details.credentials.smsKey,
          templateId: {
            cancelled: this.msg91Details.credentials.templateId.cancelled,
            confirmed: this.msg91Details.credentials.templateId.confirmed,
            delivered: this.msg91Details.credentials.templateId.delivered,
            dispatched: this.msg91Details.credentials.templateId.dispatched
          }
        }
      }
      if (smsSettings.msg91.smsSenderId !== '' && smsSettings.msg91.smsKey !== '') {
        this.events.publish('email-sms:saveSettings', smsSettings, 'sms', 'msg91');
      }
      return this.msg91Details;
    } else if (this.integrationChoice === 'twilio') {
      this.twilioDetails.credentials.accountSid.trim()
      this.twilioDetails.credentials.authToken.trim()
      this.twilioDetails.credentials.twilioNumber.trim()
      let smsSettings = {
        active: this.twilioDetails.active,
        accountSid: this.twilioDetails.credentials.accountSid.trim(),
        authToken: this.twilioDetails.credentials.authToken.trim(),
        twilioNumber: this.twilioDetails.credentials.twilioNumber.trim(),
      }
      if (smsSettings.accountSid !== '' && smsSettings.authToken !== '' && smsSettings.twilioNumber !== '') {
        this.events.publish('email-sms:saveSettings', smsSettings, 'sms', 'twilio');
      }
      return this.twilioDetails;
    } else if (this.integrationChoice === 'twilio_promotion') {
      this.twilioPromotionDetails.credentials.accountSid.trim()
      this.twilioPromotionDetails.credentials.authToken.trim()
      this.twilioPromotionDetails.credentials.twilioNumber.trim()
      return this.twilioPromotionDetails;
    } else if (this.integrationChoice === 'twilio_order_notification') {
      this.twilioOrderDetails.credentials.accountSid.trim()
      this.twilioOrderDetails.credentials.authToken.trim()
      this.twilioOrderDetails.credentials.twilioNumber.trim()
      return this.twilioOrderDetails;
    } else if (this.integrationChoice === 'aisensy_promotion') {
      this.aisensyDetails.campDetails = this.campArrayAisensy;
      return this.aisensyDetails;
    } else if (this.integrationChoice === 'interakt_order_notification') {
      this.interaktDetailsOrder.credentials.apiKey.trim()
      return this.interaktDetailsOrder
    } else if (this.integrationChoice === 'aisensy_order_notification') {
      this.aisensyDetailsOrder.credentials.apiKey.trim()
      return this.aisensyDetailsOrder
    } else if (this.integrationChoice === 'interakt_promotion') {
      this.interaktDetailsPromotion.credentials.apiKey.trim()
      this.interaktDetailsPromotion.campDetails = this.campArrayInterakt;
      return this.interaktDetailsPromotion
    } else if (this.integrationChoice === 'zoho') {
      this.zohoDetails.credentials.clientId.trim()
      this.zohoDetails.credentials.clientSecret.trim()
      this.zohoDetails.credentials.code.trim()
      return this.zohoDetails;
    } else if (this.integrationChoice === 'zohoInventory') {
      this.zohoInventoryDetails.credentials.clientId.trim()
      this.zohoInventoryDetails.credentials.clientSecret.trim()
      this.zohoInventoryDetails.credentials.redirectURI.trim()
      return this.zohoInventoryDetails;
    } else if (this.integrationChoice === 'Shopify Orders Sync') {
      this.shopifyOrdersSyncDetails.credentials.storeName.trim()
      this.shopifyOrdersSyncDetails.credentials.apiVersion.trim()
      this.shopifyOrdersSyncDetails.credentials.apiKey.trim()
      this.shopifyOrdersSyncDetails.credentials.apiSecret.trim()
      this.shopifyOrdersSyncDetails.credentials.accessToken.trim()
      return this.shopifyOrdersSyncDetails;
    } else if (this.integrationChoice === 'porter') {
      this.porterDetails.credentials.apiKey.trim()
      return this.porterDetails
    }
  }

  async generateZohoAuthLink() {
    this.zohoInventoryDetails.credentials.generateZohoAuthLink = ''
    let baseURL = 'https://accounts.zoho.in/'
    let scope = 'ZohoInventory.FullAccess.all'
    let clientId = this.zohoInventoryDetails.credentials.clientId
    let response_type = 'code'
    let redirect_uri = this.zohoInventoryDetails.credentials.redirectURI
    let access_type = 'offline'
    let prompt = 'consent'
    this.zohoInventoryGrantTokenLink = baseURL + 'oauth/v2/auth?scope=' + scope + '&client_id=' + clientId + '&response_type=' + response_type + '&redirect_uri=' + redirect_uri + '&access_type=' + access_type + '&prompt=' + prompt
    console.log('link grant token : ', this.zohoInventoryGrantTokenLink)
    if (this.zohoInventoryGrantTokenLink) {
      alert('You will be shortly redirected to the authorization link! kindly copy the entire URL & paste it down below.')
      setTimeout(() => {
        window.open(this.zohoInventoryGrantTokenLink, '_blank')
      }, 3000); 
    }
  }

  addFormatting() {
    this.twilioDetails.events.onCreateUser.body += '\n' 
  }

  capitalizeFirstLetter(v) {
    let str = v.replace(/[_]/g, ' ')
		return str.charAt(0).toUpperCase().replace(/[_]/g, ' ') + str.slice(1)
	}

  async saveSettings() {
    await this.sharedService.presentLoading();
    let integrationDetails = this.getIntegrationChoiceObj();
    console.log('data:', integrationDetails, this.integrationChoice, this.sidemenuChoice);
    const success = await this.integrationService.saveSubChoiceSettings(integrationDetails, this.sidemenuChoice, this.integrationChoice);
    if (success) {
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
      this.sharedService.presentAlert('Settings saved successfully');
    }
  }

  containsWhitespace(str) {
    return /\s/.test(str);
  }

  disableSaveAdv() {
    if (this.integrationChoice === 'sendgrid') {
      if (!this.sendgridDetails.credentials.email || !this.sendgridDetails.credentials.apiKey) {
        return true;
      } else {
        return false;
      }
    } else if (this.integrationChoice === 'msg91') {
      if (!this.msg91Details.credentials.smsKey || !this.msg91Details.credentials.smsSenderId || !this.msg91Details.credentials.templateId.confirmed || !this.msg91Details.credentials.templateId.cancelled || !this.msg91Details.credentials.templateId.delivered || !this.msg91Details.credentials.templateId.dispatched) {
        return true
      } else {
        return false
      }
    } else if (this.integrationChoice === 'twilio') {
      if (!this.twilioDetails.credentials.accountSid || !this.twilioDetails.credentials.authToken || !this.twilioDetails.credentials.twilioNumber) {
        return true
      } else {
        return false
      }
    } else if (this.integrationChoice === 'twilio_order_notification') {
      if (!this.twilioOrderDetails.credentials.accountSid || !this.twilioOrderDetails.credentials.authToken || !this.twilioOrderDetails.credentials.twilioNumber) {
        return true
      } else {
        return false
      }
    } else if (this.integrationChoice === 'twilio_promotion') {
      if (!this.twilioPromotionDetails.credentials.accountSid || !this.twilioPromotionDetails.credentials.authToken || !this.twilioPromotionDetails.credentials.twilioNumber) {
        return true
      } else {
        return false
      }
    } else if (this.integrationChoice === 'zoho') {
      if ((!this.zohoDetails.credentials.clientId || this.containsWhitespace(this.zohoDetails.credentials.clientId)) || (!this.zohoDetails.credentials.clientSecret || this.containsWhitespace(this.zohoDetails.credentials.clientSecret)) || (!this.zohoDetails.credentials.code || this.containsWhitespace(this.zohoDetails.credentials.code))) {
        return true
      } else {
        return false
      }
    } else if (this.integrationChoice === 'interakt_promotion') {
      if (!this.interaktDetailsPromotion.credentials.apiKey || this.containsWhitespace(this.interaktDetailsPromotion.credentials.apiKey)) {
        return true
      } else {
        return false
      }
    } else if (this.integrationChoice === 'aisensy_promotion') {
      if (!this.aisensyDetails.credentials.apiKey || this.containsWhitespace(this.aisensyDetails.credentials.apiKey)) {
        return true
      } else {
        return false
      }
    } else if (this.integrationChoice === 'interakt_order_notification') {
      if (!this.interaktDetailsOrder.credentials.apiKey || this.containsWhitespace(this.interaktDetailsOrder.credentials.apiKey)) {
        return true
      } else {
        return false
      }
    } else if (this.integrationChoice === 'aisensy_order_notification') {
      if (!this.aisensyDetailsOrder.credentials.apiKey || this.containsWhitespace(this.aisensyDetailsOrder.credentials.apiKey)) {
        return true
      } else {
        return false
      }
    } else if (this.integrationChoice === 'fastbeetle') {
      if (!this.fastbeetleDetails.credentials.apiKey || this.containsWhitespace(this.fastbeetleDetails.credentials.apiKey)) {
        return true
      } else {
        return false
      }
    } else if (this.integrationChoice === 'zohoInventory') {
      if ((!this.zohoInventoryDetails.credentials.clientId || this.containsWhitespace(this.zohoInventoryDetails.credentials.clientId)) || (!this.zohoInventoryDetails.credentials.clientSecret || this.containsWhitespace(this.zohoInventoryDetails.credentials.clientSecret)) || (!this.zohoInventoryDetails.credentials.redirectURI || this.containsWhitespace(this.zohoInventoryDetails.credentials.redirectURI))) {
        return true
      } else {
        return false
      }
    } else {
      return false;
    }
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'ok',
        handler: () => {
        }
      }]
    });

    await alert.present();
  }

  async setShopifyWebhooks() {
    this.presentAlert('Shopify webhooks will be created automatically!')
    const setWebhook = firebase.functions().httpsCallable('shopifyOrdersSync_integration-setShopifyWebhook');
    setWebhook(this.shopifyOrdersSyncDetails).then((res) => {console.log(res.data);});
  }

  async initZohoInventoryServices(module: string) {
    if (module === 'product') {
      // if (this.zohoInventoryDetails.initProdSync === false) {
      let apiBody = {
        module: module,
        projectId: environment.firebase.projectId,
      }
      this.zohoInventoryDetails.initProdSync = true
      await this.saveSettings()
      setTimeout(async () => {
        console.log("Delayed for 3 seconds.");
        const initProdSync = firebase.functions().httpsCallable('zohoInventoryProducts-addExistingProductsToZohoInventory');
        await initProdSync(apiBody)
          .then((res) => {
            console.log(res.data);
          })
          .catch(error => {
            console.log(error)
          })
      }, 3000)
      // }
    }
    if (module === 'order') {
      if (this.zohoInventoryDetails.initSalesOrderSync === false) {
        this.zohoInventoryDetails.initSalesOrderSync = true
      }
    }
    if (module === 'customer') {
      // if (this.zohoInventoryDetails.initCustomerSync === false) {
      let apiBody = {
        projectId: environment.firebase.projectId,
      }
      this.zohoInventoryDetails.initCustomerSync = true
      await this.saveSettings()
      setTimeout(async () => {
        console.log("Delayed for 3 seconds.");
        const initCustomerSync = firebase.functions().httpsCallable('zohoInventoryCustomers-addExistingUsersToZohoInventory');
        await initCustomerSync(apiBody)
          .then((res) => {
            console.log(res.data);
          })
          .catch(error => {
            console.log(error)
          })
      }, 3000)
      // }
    }
  }

}
