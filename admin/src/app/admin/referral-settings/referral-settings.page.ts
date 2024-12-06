import { Component, OnInit } from '@angular/core';
import { AlertController, Events, LoadingController } from '@ionic/angular';
import { LabelService } from 'src/app/services/label/label.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-referral-settings',
  templateUrl: './referral-settings.page.html',
  styleUrls: ['./referral-settings.page.scss'],
})
export class ReferralSettingsPage implements OnInit {

  headerText = '';
  SHARED_LABELS: any;
  REFERRAL_SETTINGS_LABELS: any;
  settings = {
    active: false,
    referrerCashback: 0,
    friendCashback: 0,
    cashbackCount: 1,
    referrerCashbackType: 'flat',
    referrerCashbackPercent: 0
  }
  loading: any;
  referralFeature = false;
  constructor(private labelService: LabelService,
              private events: Events,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private configService: ConfigService,
              private router: Router) { }

  async ionViewWillEnter(){
    this.referralFeature = this.configService.environment.referralFeature;
    if (this.referralFeature==false){
      const alert = await this.alertController.create({
        message: "Sorry, this feature is not available. Please upgrade your plan for access",
        buttons: ['ok']
      });
      alert.onWillDismiss().then(()=>{
        this.router.navigate(['admin-home']);
      })
      await alert.present();
    }
  }

  ngOnInit() {
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.REFERRAL_SETTINGS_LABELS = this.labelService.labels['REFERRAL_SETTINGS'];
    this.headerText = this.REFERRAL_SETTINGS_LABELS['header_text'];
    this.initializeSubscriptions();
    this.events.publish('referral:getReferralSettings');
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }


  initializeSubscriptions() {
    this.events.subscribe('referral:publishReferralSettings', (data) => {
      console.log("running")
      if(!this.isEmptyObj(data)) {
        this.settings = {...this.settings, ...data};
        console.log('settings', this.settings);
      }
    });
    this.events.subscribe('referral:saveSettingsSuccess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert(this.REFERRAL_SETTINGS_LABELS['save_settings_msg'])
    });
  }

  isEmptyObj(object) {
    for(var key in object) {
      if(object.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  async onClickSave() {
    if(!this.settings.friendCashback || !this.settings.referrerCashback) {
      this.presentAlert(this.REFERRAL_SETTINGS_LABELS['provide_valid_details']);
    } else {
      await this.presentLoading();
      this.events.publish('referral:saveSettings', this.settings);
    }
    
  }

  referralActiveToggle() {
    this.settings.active = !this.settings.active;
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: this.SHARED_LABELS['please_wait'],
      duration: 5000,
    });
    await this.loading.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [`${this.SHARED_LABELS['ok']}`]
    });

    await alert.present();
  }

  referrerCashbackTypeToggle() {
    if(this.settings.referrerCashbackType === 'flat') {
      this.settings.referrerCashbackType = 'percentage';
    } else {
      this.settings.referrerCashbackType = 'flat';
    }
  }

  removeSubscriptions() {
    this.events.unsubscribe('referral:publishReferralSettings');
    this.events.unsubscribe('referral:saveSettingsSuccess');
  }

}
