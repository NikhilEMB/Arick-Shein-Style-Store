import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ServicesFeatureService } from '../services/services-feature/services-feature.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loyalty-points-settings',
  templateUrl: './loyalty-points-settings.page.html',
  styleUrls: ['./loyalty-points-settings.page.scss'],
})
export class LoyaltyPointsSettingsPage implements OnInit {

  data = {
    active: false,
    pointName: 'loyality points',
    conversionRate: 0,
    minOrderAmount: 0,
    percentRate: 0,
    redeem: {
      minOrderAmt: 0,
      percent: 0,
    }
  }
  loading: any;
  loyaltySubscription:Subscription;

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private featureService: ServicesFeatureService
  ) { }

  async ngOnInit() {
    await this.getLoyaltyPointsDetails();
  }

  async getLoyaltyPointsDetails () {
    await this.presentLoading();
    this.loyaltySubscription = this.featureService.getLoyaltyPointsDetails().subscribe(res => {
      const data:any = res;
      console.log('data...', data)
      if(data) {
        this.data.active = data.active,
        this.data.pointName = data.pointName,
        this.data.conversionRate = data.conversionRate,
        this.data.minOrderAmount = data.minOrderAmount,
        this.data.percentRate = data.percentRate,
        this.data.redeem.percent = data.redeem.percent,
        this.data.redeem.minOrderAmt = data.redeem.minOrderAmt
      }
    })
    this.loading.dismiss();
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
    });
    await this.loading.present();
  }

  async saveSettings() {
    await this.presentLoading();
    console.log('data', this.data);
    const res = await this.featureService.setLoyaltyPointsDetails(this.data);
    if(res) {
      await this.presentAlert('Loyalty settings save successfully!');
    }
    this.loading.dismiss();
  }

  ngOnDestroy() {
    this.loyaltySubscription.unsubscribe();
  }

}
