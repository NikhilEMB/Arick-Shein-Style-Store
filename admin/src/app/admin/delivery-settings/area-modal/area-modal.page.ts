import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, LoadingController, ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';
import { StatesModalPage } from 'src/app/states-modal/states-modal.page';

/// <reference types="@types/googlemaps" />

@Component({
  selector: 'app-area-modal',
  templateUrl: './area-modal.page.html',
  styleUrls: ['./area-modal.page.scss'],
})
export class AreaModalPage implements OnInit {
  address = {
    address: '',
    city: '',
    state: '',
    stateCode: '',
    pincode: '',
  };

  latitude = 0;
  longitude = 0;

  showMap = false;

  loading: any;
  type:any
  center: google.maps.LatLngLiteral
  @ViewChild('GoogleMap', {static: false}) gmap: google.maps.Map;
  constructor(private events: Events, private sharedService: SharedService,
              private modalController: ModalController, private loadingController: LoadingController, ) {
              }

  ngOnInit() {
  }

  async ionViewWillEnter() {

    // navigator.geolocation.getCurrentPosition((position) => {
    //   console.log('position:', position.coords);
    //   this.center = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   };
    //   this.latitude = this.center.lat
    //   this.longitude = this.center.lng
    // });
    // console.log('center of me:', this.center);
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('delivery-settings:getLatLongFromAddressSuccess', async (latLngObj) => {
      console.log('latLng:', latLngObj);
      console.log('latLng:', latLngObj.results[0].geometry.location);
      this.center = {
        lat: latLngObj.results[0].geometry.location.lat,
        lng: latLngObj.results[0].geometry.location.lng,
      }
      this.latitude = this.center.lat;
      this.longitude = this.center.lng;
      this.showMap = true;
      this.loading.dismiss();
    });
    this.events.subscribe('delivery-settings:getLatLongFromAddressFailure', (errMessage) => {
      this.sharedService.presentAlert('Please try again later');
      console.log('deatils Failure', errMessage);
    });

  }

  removeSubscriptions() {
    this.events.unsubscribe('delivery-settings:getLatLongFromAddressSuccess');
    this.events.unsubscribe('delivery-settings:getLatLongFromAddressFailure');
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async openStateModal() {
    const modal = await this.modalController.create({
    component: StatesModalPage,
    backdropDismiss: false,
    });
    modal.onDidDismiss()
    .then((res) => {
      if(res.data) {
        this.address.state = res.data.state;
        this.address.stateCode = res.data.code;
      }
  });
    await modal.present();
}

disableShowArea() {
  for (let property in this.address) {
  if (this.address[property] == '') {
    return true;
  }
}
  return false;
}

disableSave(){
  if (this.latitude == 0 || this.longitude == 0) {
    return true;
  }
  return false;
}


centerChanged(){
  let currentCenter = JSON.parse(JSON.stringify(this.gmap.getCenter()))
  this.latitude = currentCenter.lat;
  this.longitude = currentCenter.lng;
}

getLatLong(){
  // this.center = {
  //   lat: 28.661396,
  //   lng: 77.2203529
  // };
  this.presentLoading('Fetching Area...');
  this.events.publish('delivery-settings:getLatLongFromAddress', this.address);
}

saveArea(){
  let obj = {
    lat: this.latitude,
    lng: this.longitude,
    address: this.address
  };
  this.modalController.dismiss(obj);
}


async presentLoading(msg: string) {
  this.loading = await this.loadingController.create({
    message: msg,
    duration: 3000
  });
  this.loading.present();
}

}
