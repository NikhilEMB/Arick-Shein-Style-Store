import { Component, OnInit } from '@angular/core';
import { Events, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-settings',
  templateUrl: './wallet-settings.page.html',
  styleUrls: ['./wallet-settings.page.scss'],
})
export class WalletSettingsPage implements OnInit {
  showLoader: boolean = true;
  showCashbackLoader: boolean = true;
  active: boolean = true;
  maxUserWalletAmnt: number = 10000;
  minOrderAmnt: number = 0;
  maxWalletAmntPerOrder: number = 1000;
  newUserWalletAmnt: number = 0;
  loading: any;
  cashbacks: any = [];
  cashbackAlert: any;
  constructor(private events: Events,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private toastController: ToastController,
              private router: Router) { }

  ngOnInit() {
    this.initializeSubscriptions();
    this.events.publish('wallet:getWalletSettings');
    this.events.publish('wallet:getCashbackList');
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('wallet:publishWalletSettings', (data) => {
      if(!this.isEmptyObj(data)) {
        this.active = typeof data.active !== 'undefined' ? data.active : true;
        this.maxUserWalletAmnt = data.maxUserWalletAmnt ? data.maxUserWalletAmnt : 10000;
        this.minOrderAmnt = data.minOrderAmnt ? data.minOrderAmnt : 0;
        this.maxWalletAmntPerOrder = data.maxWalletAmntPerOrder ? data.maxWalletAmntPerOrder : 1000;
        this.newUserWalletAmnt = data.newUserWalletAmnt ? data.newUserWalletAmnt : 0;
      }
      this.showLoader = false;
    });

    this.events.subscribe('wallet:saveWalletSettingsSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Wallet settings saved successfully!');
    });

    this.events.subscribe('wallet:publishCashbackList', (data) => {
      this.cashbacks = data;
      this.showCashbackLoader = false;
    });

    this.events.subscribe('wallet:addNewCashbackSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Cashback added successfully!');
    });

    this.events.subscribe('wallet:deleteCashbackSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Cashback deleted successfully!');
    });
    this.events.subscribe('wallet:addAmountToUsersByAdminSuccess', (msg) => {
      this.loading.dismiss();
      this.presentAlert(msg);
    });
  }

  isEmptyObj(object) {
    for(var key in object) {
      if(object.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  async saveWalletSettings() {
    if(this.maxUserWalletAmnt > 10000) {
      this.presentAlert('Maximum amount in user wallet should be less than or equal to Rs.10000');
    } else if(!this.maxUserWalletAmnt) {
      this.presentAlert('Please enter Maximum amount in user wallet');
    }
     else {
      const wallet = {
        active: this.active,
        maxUserWalletAmnt: this.maxUserWalletAmnt ? this.maxUserWalletAmnt : 10000,
        minOrderAmnt: this.minOrderAmnt ? this.minOrderAmnt : 0,
        maxWalletAmntPerOrder: this.maxWalletAmntPerOrder ? this.maxWalletAmntPerOrder : 1000,
        newUserWalletAmnt: this.newUserWalletAmnt ? this.newUserWalletAmnt : 0
      }
      await this.presentLoading('Please wait...', 5000);
      this.events.publish('wallet:saveWalletSettings', wallet);
    }
  }

  walletActiveToggle() {
    this.active = !this.active;
  }

  async addNewCashback(cashbackData: any) {
    await this.presentLoading('Adding new cashback', 5000);
    this.events.publish('wallet:addNewCashback', cashbackData);
  }

  async addCashbackAlert() {
    this.cashbackAlert = await this.alertController.create({
      subHeader: 'Add cashback',
      inputs: [
        {
          name: 'orderAmnt',
          type: 'number',
          placeholder: 'Enter order amount'
        },
        {
          name: 'cashback',
          type: 'number',
          placeholder: 'Enter cashback amount'
        },
        {
          name: 'perUser',
          type: 'number',
          placeholder: 'No. of times it issued to a user'
        }
      ],    
       buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                //console.log('Confirm Cancel');
              }
            }, {
              text: 'Add',
              handler: (cashbackData) => {
                if(!parseInt(cashbackData.orderAmnt) || !parseInt(cashbackData.cashback) || !parseInt(cashbackData.perUser)) {
                  this.presentToast('Please enter valid data');
                }
                 else {
                  this.addNewCashback(cashbackData);
                }
            }
            }
          ]
  });
  await this.cashbackAlert.present();
  }

  async deleteCashbackConfirm(cid: string) {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this cashback?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.deleteCashback(cid);
          }
        }
      ]
    });
  
    await alert.present();
  }

  async deleteCashback(cid: string) {
    await this.presentLoading('Please wait...', 5000);
    this.events.publish('wallet:deleteCashback', cid);
  }

  showEditToast() {
    this.presentToast('Cashback data can not be edit. Delete and add desired cashback.');
  }

  async addAmountToUsersByAdmin(amount: number) {
    await this.presentLoading('Adding money...', 20000);
    this.events.publish('wallet:addAmountToUsersByAdmin', amount);
  }

  async addWalletAmountAlert() {
    const alert = await this.alertController.create({
      subHeader: 'Add money',
      inputs: [
        {
          name: 'amount',
          type: 'number',
          placeholder: 'Enter amount'
        }
      ],    
       buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                //console.log('Confirm Cancel');
              }
            }, {
              text: 'Add',
              handler: (amnt) => {
                if(!amnt.amount) {
                  this.presentToast('Please enter valid amount');
                }
                 else {
                  this.addAmountToUsersByAdmin(parseInt(amnt.amount));
                }
            }
            }
          ]
  });
  await alert.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentLoading(msg: string, duration: number) {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: duration
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  removeSubscriptions() {
    this.events.unsubscribe('wallet:publishWalletSettings');
    this.events.unsubscribe('wallet:saveWalletSettingsSuccess');
    this.events.unsubscribe('wallet:publishCashbackList');
    this.events.unsubscribe('wallet:addNewCashbackSuccess');
    this.events.unsubscribe('wallet:deleteCashbackSuccess');
    this.events.unsubscribe('wallet:addAmountToUsersByAdminSuccess');
  }

}
