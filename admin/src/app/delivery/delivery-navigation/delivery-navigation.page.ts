import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Events, AlertController, LoadingController, Platform } from '@ionic/angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { environment } from 'src/environments/environment';
declare var google;
@Component({
  selector: 'app-delivery-navigation',
  templateUrl: './delivery-navigation.page.html',
  styleUrls: ['./delivery-navigation.page.scss'],
})
export class DeliveryNavigationPage implements OnInit {
  map: any;
  @ViewChild('map',{static: false}) mapElement: ElementRef;
  watchLocationUpdates: any;
  deliveryLatLng: any;
  directionsService: any = new google.maps.DirectionsService;
  directionsDisplay: any;
  navigationInterval: any;
  geoLatitude: number;
  geoLongitude: number;
  orderId: any;
  icons = {
    start: {
      url: environment.deliveryBikeurl,
      scaledSize: new google.maps.Size(40, 40)
    },
    end: {
      url: environment.destinationMarkerUrl,
      scaledSize: new google.maps.Size(30, 30)
    }
  };
  loading: any;
  deliveryMarkers = [];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private androidPermissions: AndroidPermissions,
              private geolocation: Geolocation,
              private locationAccuracy: LocationAccuracy,
              private events: Events,
              private launchNavigator: LaunchNavigator,
              private alertController: AlertController,
              private loadingCtrl: LoadingController,
              private platform: Platform) {
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.deliveryLatLng = this.router.getCurrentNavigation().extras.state.deliveryLatLng;
                    this.orderId = this.router.getCurrentNavigation().extras.state.orderId;
                    //console.log('deliveryLatLng', this.deliveryLatLng);
                  }
                });
              }
  ngOnInit() {                 
  }
  async ionViewDidEnter() {
    await this.presentLoading("Initializing Map...");
    if(this.platform.is('android')) {
      this.checkGPSPermission();
    } else {
      this.loadMap();
    }
    
    this.initializeSubscriptions();
  } 
  ionViewWillLeave(){
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('delivery:finishedNavigationSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Order updated as delivered successfully!', true);
    });
  }
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
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.loadMap();
      },
      error => {}
    );
  }
  loadMap() {
    let latLng = new google.maps.LatLng(28.6863237, 77.1254335);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.directionsDisplay = new google.maps.DirectionsRenderer({
        map: this.map
      });
      const userLocation = {
        lat: this.deliveryLatLng.lat,
        lng: this.deliveryLatLng.lng
      };
      this.makeUserMarker(userLocation, this.icons.end, 'title', this.map);
      this.startNavigating();
      this.navigationInterval = setInterval(() => {
        this.startNavigating();
      }, environment.timeToUpdateAgentLocation)
  }
  startNavigating() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude; 
      //console.log('Position', resp.coords.latitude, resp.coords.longitude);
      this.events.publish('delivery:updateLatLongOfDeliveryAgent', resp.coords.latitude,resp.coords.longitude);
      this.setRouteInMap(resp.coords.latitude, resp.coords.longitude);
     }).catch((error) => {
       //console.log('Error getting location', error);
       this.presentAlert("Error in getting your location");
       clearInterval(this.navigationInterval);
     });
  }
  setRouteInMap(latitude, longitude) {
    this.directionsDisplay.setOptions({
      suppressMarkers: true
    });
    
    const request = {
      origin: {lat: latitude, lng: longitude},
      destination: {lat: this.deliveryLatLng.lat, lng: this.deliveryLatLng.lng},
      travelMode: google.maps.TravelMode['DRIVING']
    }
    this.directionsService.route(request, (res, status) => {

      if(status == google.maps.DirectionsStatus.OK){
         this.directionsDisplay.setDirections(res);
         this.removePreviousDeliveryMarkers();
          const start_pos = {
            lat: latitude,
            lng: longitude
          };
        this.makeDeliveryMarker(start_pos, this.icons.start, "title", this.map);
      } else {
          console.warn(status)
          this.presentAlert("There is some problem in setting up route. Please try again.");
          clearInterval(this.navigationInterval);
      }

  });
  }
  makeUserMarker(position, icon, title, map) {
    new google.maps.Marker({
        position: position,
        map: map,
        icon: icon,
        title: title
    });
}
  makeDeliveryMarker(position, icon, title, map) {
    let marker = new google.maps.Marker({
      position: position,
      map: map,
      icon: icon,
      title: title
    });
    this.deliveryMarkers.push(marker);
  }

  removePreviousDeliveryMarkers() {
    for (let index = 0; index < this.deliveryMarkers.length; index++) {
      this.deliveryMarkers[index].setMap(null);
    }
  }

  openGoogleMaps() {
    let options: LaunchNavigatorOptions = {
      start: [this.geoLatitude, this.geoLongitude],
    }
    this.launchNavigator.navigate([this.deliveryLatLng.lat, this.deliveryLatLng.lng], options)
    .then(
      success => //console.log('Launched navigator'),
      error => this.presentAlert('Unable to open google maps.' + ' ' + error)
    );
  }
  async finishNavigation() {
    await this.presentLoading("Please wait...");
    this.events.publish('delivery:updateDeliveryStatus', this.orderId, 'delivered');
  }
  async finishNavigationConfirm() {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to finish the navigation?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Finish',
          handler: () => {
            //console.log('Confirm Okay');
            this.finishNavigation();
          }
        }
      ]
    });
    await alert.present();
  }
  async presentLoading(msg: string) {
    this.loading = await this.loadingCtrl.create({
      message: msg,
      duration: 3000
    });
    await this.loading.present();
  }
  async presentAlert(msg: string, action?) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'OK',
        handler: () => {
          if(action) {
            this.router.navigate(['delivery-orders']);
          }
        }
      }]
    });
  
    await alert.present();
  }
  removeSubscriptions() {
    clearInterval(this.navigationInterval);

    this.events.unsubscribe('delivery:finishedNavigationSuccess');
  }

}
