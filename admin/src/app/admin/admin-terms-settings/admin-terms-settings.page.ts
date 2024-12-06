import { Component, OnInit } from '@angular/core';
import { Platform, Events, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-terms-settings',
  templateUrl: './admin-terms-settings.page.html',
  styleUrls: ['./admin-terms-settings.page.scss'],
})
export class AdminTermsSettingsPage implements OnInit {
  ckeConfig: any;
  termsContent: string = '';
  privacyContent: string = '';
  cancelContent: string = '';
  refundContent: string = '';
  shippingContent: string = '';
  termsActiveStatus = true;
  privacyActiveStatus = true;
  cancelActiveStatus = true;
  refundActiveStatus = true;
  shippingActiveStatus = true;
  loading: any;
  constructor(private platform: Platform,
              private events: Events, 
              private loadingController: LoadingController, 
              private alertController: AlertController) { }

  ngOnInit() {
    this.initializeSubscriptions();
    this.events.publish('admin-settings:getTermsAndPrivacyData');
    const devHeight = this.platform.height();
    const editorHeight = devHeight - 245;
    this.ckeConfig = {    
      allowedContent: true,
      height: editorHeight
  }
}
ngOnDestroy() {
  this.removeSubscriptions();
}
initializeSubscriptions() {
  this.events.subscribe('admin-settings:saveTermsAndPrivacySuccess', () => {
    this.loading.dismiss();
    this.presentAlert('Data Saved Successfully!');
  });
  this.events.subscribe('admin-settings:publishTermsAndPrivacyData', (data) => {
    console.log(data)
    if(data) {
      this.termsContent = data.terms;
      this.privacyContent = data.privacy;
      this.cancelContent = data.cancel;
      this.refundContent = data.refund;
      this.shippingContent = data.shipping;
      this.termsActiveStatus =  data.termsActiveStatus;
      this.privacyActiveStatus =  data.privacyActiveStatus;
      this.cancelActiveStatus =  data.cancelActiveStatus;
      this.refundActiveStatus = data.refundActiveStatus;
      this.shippingActiveStatus = data.shippingActiveStatus;
    }
  });
} 

  async onClickSaveTermsSettings() {
    if(this.termsContent === '') {
      this.presentAlert('Please enter some Terms!');
    } else if(this.privacyContent === '') {
      this.presentAlert('Please enter some Privacy!');
    } else {
      await this.presentLoading();
      const termsAndPrivacyData = {
        terms: this.termsContent,
        privacy: this.privacyContent,
        cancel:this.cancelContent,
        refund:this.refundContent,
        shipping:this.shippingContent,
        termsActiveStatus: this.termsActiveStatus,
        privacyActiveStatus: this.privacyActiveStatus,
        cancelActiveStatus:this.cancelActiveStatus,
        refundActiveStatus:this.refundActiveStatus,
        shippingActiveStatus:this.shippingActiveStatus

      }
      this.events.publish('admin-settings:saveTermsAndPrivacy', termsAndPrivacyData);
    }
  }
  async presentAlert(desc: any) {
    const alert = await this.alertController.create({
      message: desc,
      buttons: ['Ok']
    });
    await alert.present();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 5000
    });
    await this.loading.present();
  }
  removeSubscriptions() {
    this.events.subscribe('admin-settings:saveTermsAndPrivacySuccess');
    this.events.subscribe('admin-settings:publishTermsAndPrivacyData');
  }
}
