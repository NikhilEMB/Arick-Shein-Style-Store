import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin-tab',
  templateUrl: './admin-tab.page.html',
  styleUrls: ['./admin-tab.page.scss'],
})
export class AdminTabPage implements OnInit {
  backButtonSubscription: any;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChild(IonRouterOutlet,{static:false}) routerOutlet: IonRouterOutlet;
  constructor(private platform: Platform, private toastController: ToastController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else {
        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
          navigator['app'].exitApp();

      } else {
          this.presentToast('Press back again to exit App.');
          this.lastTimeBackPress = new Date().getTime();
      }
      }
    });
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      color: 'dark',
      message: msg,
      duration: 2000,
      showCloseButton: true,
      cssClass: 'toast',
      animated: true,
      mode: "ios"
    });
    toast.present();
  }
  removeSubscriptions() {
    this.backButtonSubscription.unsubscribe();
  }
}
