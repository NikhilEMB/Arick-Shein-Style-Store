import { Component, OnInit } from '@angular/core';
import { Events, LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss'],
})
export class TermsConditionsPage implements OnInit {
  loading: any;

  constructor(private events: Events,
              private router: Router,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private storage: Storage) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.initializeSubs();
  }
  ionViewWillLeave() {
    this.removeSubs();
  }
  initializeSubs() {
    this.events.subscribe('user:termsAndCondsAcceptedSuccess', () => {
      this.loading.dismiss();
      this.navCtrl.navigateRoot(['admin-home']);
    });
  }
  async onClickAcceptConditions() {
    this.loading = await this.loadingCtrl.create({
      message: "Please Wait...",
    });
    this.loading.present();
    this.storage.get('uid').then((val) => {
      this.events.publish('user:acceptTermsAndConds', val);
    });
  }
  removeSubs() {
    this.events.unsubscribe('user:termsAndCondsAcceptedSuccess');
  }
}
