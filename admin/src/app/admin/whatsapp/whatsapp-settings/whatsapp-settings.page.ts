import { Component, OnInit } from '@angular/core';
import { WhatsappDashboardService } from '../../../services/whatsapp-dashboard/whatsapp-dashboard.service'
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-whatsapp-settings',
  templateUrl: './whatsapp-settings.page.html',
  styleUrls: ['./whatsapp-settings.page.scss'],
})
export class WhatsappSettingsPage implements OnInit {
  whatsappDashboardData: any
  credentials: any = {
    authToken: '',
    catalogueId: '',
    catalogueFeedId: '',
    phoneNumberId: '',
    webhookVerifyToken: '',
    businessId: '',
    businessPageId: '',
    devAppId: '',
  }
  selectedId: any;

  constructor(
    private WhatsappDashboardService: WhatsappDashboardService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.whatsappDashboardData = await this.WhatsappDashboardService.getWhatsappCredentials()
    if (this.whatsappDashboardData && this.whatsappDashboardData.credentials) {
      this.credentials = this.whatsappDashboardData.credentials;
    }
    // this.checkCredentials()
  }


  isValidCredentials() {
    // for (let key in this.credentials) {
    //   if (!this.credentials[key] || this.credentials[key] == '') {
    //     return false;
    //   }
    // }
    // return true;
    if (!this.credentials.authToken || !this.credentials.catalogueId || !this.credentials.catalogueFeedId || !this.credentials.phoneNumberId || !this.credentials.webhookVerifyToken || !this.credentials.businessId || !this.credentials.businessPageId || !this.credentials.devAppId) {
      return false
    } else {
      return true
    }
  }

  async saveWhatsappCredentials() {
    const validCredentials = this.isValidCredentials();
    if (!validCredentials) {
      this.sharedService.presentAlert('Please fill all credentials');
      return;
    }
    const success = await this.WhatsappDashboardService.saveWhatsappCredentials(this.credentials)
    if (success) {
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
      this.sharedService.presentAlert('Settings saved successfully');
    }
  }

  changeComponent(index) {
    this.selectedId = index.toString()
  }

  async syncProducts(){
    await this.WhatsappDashboardService.syncProducts();
    this.sharedService.presentAlert('Products will sync in couple of minutes');
  }

}
