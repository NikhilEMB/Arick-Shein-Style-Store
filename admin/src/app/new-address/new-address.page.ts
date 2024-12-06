import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, Events, Platform, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Address } from '../models/address';
import { UserService } from '../services/user/user.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { StatesModalPage } from '../states-modal/states-modal.page';

declare var google;

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.page.html',
  styleUrls: ['./new-address.page.scss'],
})
export class NewAddressPage implements OnInit {
  addressObj: Address = {
    name: '',
    address: '',
    city: '',
    state: '',
    stateCode: '',
    pincode: '',
    phoneNo: '',
    createdAt: null,
    defaultAddress: true,
    lat: null,
    lng: null
  }
  loading: any;
  editAddressData: any;
  addressLength: number;
  routeFromCheckoutPage: boolean = false;
  routeFromSelectAddress: boolean = false;

  @ViewChild('map',{static: false}) mapElement: ElementRef;
  map: any;
  addressFromApi:string;
  latitude: any;
  longitude: any;
  watchLocationUpdates: any;
  marker: any;
  states: any = [];
  addressType: string = 'shipping';
  constructor(private events: Events, 
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private route: ActivatedRoute,
              private userService: UserService,
              private androidPermissions: AndroidPermissions,
              private geolocation: Geolocation,
              private locationAccuracy: LocationAccuracy,
              private platform: Platform,
              private modalController: ModalController) { 

                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.editAddressData = this.router.getCurrentNavigation().extras.state.addressData;
                    this.addressLength = this.router.getCurrentNavigation().extras.state.addressLength;
                    this.routeFromCheckoutPage = this.router.getCurrentNavigation().extras.state.routeFromCheckoutPage;
                    this.routeFromSelectAddress = this.router.getCurrentNavigation().extras.state.routeFromSelectAddress;
                    this.addressType = this.router.getCurrentNavigation().extras.state.type;
                    //console.log('editAddressData', this.editAddressData);
                  }
                });
              }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.initializeSubscriptions();
    this.addressObj.phoneNo = this.userService.getPhoneNo();
    
  } 
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('user:newAddressSaved', () => {
      this.loading.dismiss();
      if(this.routeFromCheckoutPage === true || this.routeFromSelectAddress === true) {
        this.router.navigate(['order-summary']);
      } else {
        this.presentAlert('Address saved successfully', true);
      }
    });
    this.events.subscribe('user:addressEditSuccess', () => {
      this.loading.dismiss();
      if(this.routeFromSelectAddress === true) {
        this.router.navigate(['order-summary']);
      } else {
        this.presentAlert('Address edited successfully', true);
      }
    });
    this.events.subscribe('user:errorInGettingAddress', () => {
      this.loading.dismiss();
      this.presentAlert('Error in getting address!');
    });
    this.events.subscribe('user:addressValueFromLatLng', (response) => {
      this.loading.dismiss();
      //console.log('address', response);
      this.getAddressFromResponse(response.results[0]);
    });
    
  }
  getAddressFromResponse(data) {
    if(!this.editAddressData) {
      this.addressObj.address = data.formatted_address;
      this.addressFromApi = data.formatted_address;
      for (let index = 0; index < data.address_components.length; index++) {
        for (let x = 0; x < data.address_components[index].types.length; x++) {
          if(data.address_components[index].types[x] === "postal_code") {
            this.addressObj.pincode = data.address_components[index].long_name;
          }
        }
      }
    } else {
      this.editAddressData.address = data.formatted_address;
      this.addressFromApi = data.formatted_address;
      for (let index = 0; index < data.address_components.length; index++) {
        for (let x = 0; x < data.address_components[index].types.length; x++) {
          if(data.address_components[index].types[x] === "postal_code") {
            this.editAddressData.pincode = data.address_components[index].long_name;
          }
        }
      }
    }
  }
  useCurrentLocation() {
    if(this.platform.is('android')) {
      this.checkGPSPermission();
    } else {
      this.getLocationCoordinates();
    }
  }

  //Check if application having GPS access permission  
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
 
          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
 
          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        //console.log(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        //console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              //console.log('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }
 
  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      async () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates()
      },
      error => {}
    );
  }
 
  // Methos to get device accurate coordinates using device GPS
  async getLocationCoordinates() {
    await this.presentLoading();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      alert('Error getting location' + error);
      //console.log(error);
    });
  }

  getAddressFromCoords(latitude, longitude) {
    //console.log("getAddressFromCoords "+latitude+" "+longitude);
    this.events.publish('user:getAddressFromLatLng', latitude, longitude);
  }

  async onClickSaveAddress() {
    if(this.addressObj.name === '') {
      this.presentAlert('Please enter name');
    } else if(this.addressObj.address === '') {
      this.presentAlert('Please enter address');
    } else if(this.addressObj.city === '') {
      this.presentAlert('Please enter city');
    } else if(this.addressObj.state === '') {
      this.presentAlert('Please enter state');
    } else if(this.addressObj.pincode === '') {
      this.presentAlert('Please enter pincode');
    } else if(this.addressObj.phoneNo === '') {
      this.presentAlert('Please enter phoneNo');
    } else {
      await this.presentLoading();
      this.addressObj.createdAt = new Date();
      if(this.addressFromApi === this.addressObj.address) {
        this.addressObj.lat = this.latitude;
        this.addressObj.lng = this.longitude;
      }
      this.events.publish('user:saveNewAddress', this.addressObj, this.addressType);
    } 
  }
  async onClickEditAddress() {
    if(this.editAddressData.name === '') {
      this.presentAlert('Please enter name');
    } else if(this.editAddressData.address === '') {
      this.presentAlert('Please enter address');
    } else if(this.editAddressData.city === '') {
      this.presentAlert('Please enter city');
    } else if(this.editAddressData.state === '') {
      this.presentAlert('Please enter state');
    } else if(this.editAddressData.pincode === '') {
      this.presentAlert('Please enter pincode');
    } else if(this.editAddressData.phoneNo === '') {
      this.presentAlert('Please enter phoneNo');
    } else {
      await this.presentLoading();
      this.editAddressData.createdAt = new Date();
      if(this.addressFromApi === this.editAddressData.address) {
        this.editAddressData.lat = this.latitude;
        this.editAddressData.lng = this.longitude;
      }
      this.events.publish('user:editSavedAddress', this.editAddressData, this.addressType);
    } 
  }
  updateNewAddressDefaultStatus() {
    if (this.addressObj.defaultAddress === true || this.addressObj.defaultAddress === null) {
      this.addressObj.defaultAddress = false;
    } else {
      this.addressObj.defaultAddress = true;
    }
  }
    updateEditAddressDefaultStatus(status: boolean) {
    if (status === true) {
      this.editAddressData.status = false;
    } else {
      this.editAddressData.status = true;
    }
  }

  goToPage(page: string) {
    this.router.navigate([page]);
  }
  addressChange() {
    this.editAddressData.lat = null;
    this.editAddressData.lng = null;
  }

  
  async openStateModal() {
    const modal = await this.modalController.create({
    component: StatesModalPage,
    });
    modal.onDidDismiss()
    .then((res) => {
      //console.log('data from modal', res);
      if(res.data) {
        //console.log(res.data);
        if(!this.editAddressData) {
          this.addressObj.state = res.data.state;
          this.addressObj.stateCode = res.data.code;
        } else {
          this.editAddressData.state =  res.data.state;
          this.editAddressData.stateCode =  res.data.code;
        }
        
      }
  });
    await modal.present();
  
  }
  async presentAlert(msg: string, action?:boolean) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
          //console.log('Confirm Okay');
          if(action === true) {
            this.router.navigate(['user-addresses']);
          }
        }
      }]
    });
    await alert.present();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 10000
    });
    await this.loading.present();
  }
  removeSubscriptions() {
    this.events.unsubscribe('user:newAddressSaved');
    this.events.unsubscribe('user:addressEditSuccess');
    this.events.unsubscribe('user:errorInGettingAddress');
    this.events.unsubscribe('user:addressValueFromLatLng');
  }

}
