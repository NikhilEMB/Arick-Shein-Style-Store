import { Component, OnInit } from '@angular/core';
import { Events, PopoverController, AlertController, LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user/user.service';
@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.page.html',
  styleUrls: ['./user-addresses.page.scss'],
})
export class UserAddressesPage implements OnInit {
  addressesData: any[] = [];
  showLoader: boolean = true;
  loading: any;
  showAddAddressBtn: boolean = false;
  unreadAdminMsgs: number = 0;
  constructor(private events: Events,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private storage: Storage, private userService: UserService,) { }

  ngOnInit() {
    this.initializeSubscription();
    this.events.publish('user:getAllSavedAddresses');
    setTimeout(() => {
      this.showAddAddressBtn = true;
    }, 500);
  }
  ionViewDidEnter() {
    this.storage.get('uid').then((val) => {
      this.events.publish('chat:getUnreadMsgOfAdmin', val);
    });
    this.events.subscribe('chat:publishUnreadMsgOfAdmin', (unreadMsgs) => {
      this.unreadAdminMsgs = unreadMsgs;
    });
  } 
  ionViewWillLeave() {
    this.events.unsubscribe('chat:publishUnreadMsgOfAdmin');
  }
  ngOnDestroy() {
    this.removeSubscription();
  }
  initializeSubscription() {
    this.events.subscribe('user:publishAllSavedAddresses', (allAddresses) => {
      this.addressesData = allAddresses;
      //console.log('addressesData', this.addressesData);
      this.showLoader = false;
    })
    this.events.subscribe('user:deleteAddressSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Address deleted successfully');
    })
  }
  goToPage(page: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        addressLength: this.addressesData.length,
      }
    };
    this.router.navigate([page], navigationExtras);
  }
  editAddress(address: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        addressData: address,
        addressLength: this.addressesData.length,
      }
    };
    this.router.navigate(['new-address'], navigationExtras);
  }
  async deleteAddress(address: any) {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 5000
    });
    await this.loading.present();
    this.events.publish('user:deleteAddress', address);
  }
  async deleteAlertConfirm(address: any) {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this address?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            //console.log('Confirm Okay');
            this.deleteAddress(address);
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlert(msg: string, action?:boolean) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['Ok']
    });
    await alert.present();
  }
  goToChat(fromfab: boolean) {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else { 
      //console.log('in else of uid');
      this.storage.get('userRole').then(async (role) => {
        if(role === 'admin') {
          this.router.navigate(['admin-home']);
        } else {
          this.router.navigate(['chat-bot']);
        }
      });
    }
  }
  
  removeSubscription() {
    this.events.unsubscribe('user:publishAllSavedAddresses');
    this.events.unsubscribe('user:deleteAddressSuccess');
  }

}
