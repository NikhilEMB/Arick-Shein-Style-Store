import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IntegrationsService } from '../services/integrations/integrations.service';
import { SharedService } from '../services/shared/shared.service';
import { IntegrationSettingsPage } from './integration-settings/integration-settings.page';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.page.html',
  styleUrls: ['./integrations.page.scss'],
})
export class IntegrationsPage implements OnInit {
  // sidemenu = ['Delivery', 'Email', 'P.O.S', 'SMS', 'Whatsapp', 'CRM', 'Inventory Management', 'Website Analytics', 'App Analytics', 'App Stores', 'Ads', 'Marketplace', 'Shopify', 'Wordpress', 'Live Chat'];
  sidemenu = ['Delivery', 'Email', 'SMS'];
  component = 'delivery';

  delivery = {
    default: ''
  }
  email = {
    default: ''
  }
  sms = {
    default: ''
  }
  whatsapp_promotion = {
    default: ''
  }
  whatsapp_order_notification = {
    default: ''
  }
  crm = {
    default: ''
  }

  constructor(private sharedService: SharedService, private modalController: ModalController, private integrationService: IntegrationsService) { }

  ngOnInit() {
  }
  
  async ionViewWillEnter(){
    // temp fix
    const choiceDetailsDelivery: any = await this.integrationService.getChoiceSettings('delivery');
    const choiceDetailsEmail: any = await this.integrationService.getChoiceSettings('email');
    const choiceDetailsSMS: any = await this.integrationService.getChoiceSettings('sms');
    const choiceDetailsWhatsapp_promotion: any = await this.integrationService.getChoiceSettings('whatsapp_promotion');
    const choiceDetailsWhatsapp_order_notification: any = await this.integrationService.getChoiceSettings('whatsapp_order_notification');
    const choiceDetailsCRM: any = await this.integrationService.getChoiceSettings('crm');
    if (choiceDetailsDelivery) {
      this.delivery = choiceDetailsDelivery;
     // Object.assign(this.getIntegrationChoiceObj(), integrationDetails);
    }
    if (choiceDetailsEmail) {
      this.email = choiceDetailsEmail;
    }
    if (choiceDetailsSMS) {
      this.sms = choiceDetailsSMS;
    }
    if (choiceDetailsWhatsapp_promotion) {
      this.whatsapp_promotion = choiceDetailsWhatsapp_promotion;
    }
    if (choiceDetailsWhatsapp_order_notification) {
      this.whatsapp_order_notification = choiceDetailsWhatsapp_order_notification;
    }
    if (choiceDetailsCRM) {
      this.crm = choiceDetailsCRM;
    }
  }

  changeComponent(choice){
    this.component = choice.toLowerCase();
    console.log('component:', this.component);
  }

  async saveChoiceSettings(sidemenuChoice){   
    let settings;
    if (sidemenuChoice == 'delivery') {
      settings = this.delivery;
    }
    if (sidemenuChoice == 'email') {
      settings = this.email;
    }
    if (sidemenuChoice == 'sms') {
      settings = this.sms;
    }
    if (sidemenuChoice == 'whatsapp_promotion') {
      settings = this.whatsapp_promotion;
    }
    if (sidemenuChoice == 'whatsapp_order_notification') {
      settings = this.whatsapp_order_notification;
    }
    if (sidemenuChoice == 'crm') {
      settings = this.crm;
    }
    const success = await this.integrationService.saveChoiceSettings(sidemenuChoice, settings);
    if (success) {
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
      this.sharedService.presentAlert('Settings saved successfully');
    }
  }

  async openSettings(sidemenuChoice, integrationChoice) {
    const modal = await this.modalController.create({
      component: IntegrationSettingsPage,
      backdropDismiss: false,
      cssClass: 'custom-modal custom-modal-interakt' ,
      componentProps: {
        integrationChoice: integrationChoice,
        sidemenuChoice: sidemenuChoice
      }
    });
    await modal.present();
  }

}
