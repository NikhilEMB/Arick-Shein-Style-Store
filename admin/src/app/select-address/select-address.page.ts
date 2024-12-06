import { Component, OnInit } from '@angular/core';
import { Events, PopoverController, AlertController, LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.page.html',
  styleUrls: ['./select-address.page.scss'],
})
export class SelectAddressPage implements OnInit {
  addressesData: any[] = [];
  showLoader: boolean = true;
  loading: any;
  showAddAddressBtn: boolean = false;
  selectedAddress: any;
  addressFromStorage: any;

  constructor(private events: Events,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private storage: Storage) { }

  ngOnInit() {
    this.initializeSubscription();
    this.events.publish('user:getAllSavedAddresses');
    setTimeout(() => {
      this.showAddAddressBtn = true;
    }, 500);
  }
  ionViewWillEnter() {
    this.storage.get('userDefaultAddress').then((address) => {
      //console.log('default address in order summary', address);
      this.addressFromStorage = address;
    });
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
  }
  
  radioSelect(event) {
    //console.log(event.target.value);
    this.selectedAddress = event.target.value;
  }
  goToPage(page: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        routeFromSelectAddress: true,
      }
    };
    this.router.navigate([page], navigationExtras);
  }
  onClickDeliverHere() {
    if(!this.selectedAddress) {
      this.selectedAddress = this.addressesData[0];
    }
    //console.log('this.selectedAddress', this.selectedAddress);
    this.storage.set('userDefaultAddress', this.selectedAddress);
    this.router.navigate(['order-summary']);
  }
  editAddress(address: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        addressData: address,
        addressLength: this.addressesData.length,
        routeFromSelectAddress: true
      }
    };
    this.router.navigate(['new-address'], navigationExtras);
  }
  removeSubscription() {
    this.events.unsubscribe('user:publishAllSavedAddresses');
  }

}
