import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events, AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
declare var google;
@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.page.html',
  styleUrls: ['./location-map.page.scss'],
})
export class LocationMapPage implements OnInit {
  @ViewChild('map',{static: false}) mapElement: ElementRef;
  agentId: any;
  routeFromUserSide: boolean = false;
  map: any;
  directionsService: any = new google.maps.DirectionsService;
  directionsDisplay: any;
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
  deliveryLatLng: any;
  loading: any;
  deliveryAgentMarkers = [];
  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private events: Events,
              private loadingCtrl: LoadingController,
              private alertController: AlertController) {

                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.agentId = this.router.getCurrentNavigation().extras.state.agentId;
                    this.routeFromUserSide = this.router.getCurrentNavigation().extras.state.routeFromUserSide;
                    this.deliveryLatLng = this.router.getCurrentNavigation().extras.state.deliveryLatLng;
                  }
                });
               }
  ngOnInit() {                 
  }
  async ionViewDidEnter() {
    await this.presentLoading();
    this.loadMap(this.deliveryLatLng.lat, this.deliveryLatLng.lng);
    this.initializeSubscriptions();
    setTimeout(() => {
      this.events.publish('delivery:getLatestLatLngOfDeliveryAgent', this.agentId);
    }, 1000);

  } 
  ionViewWillLeave(){
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('delivery:publishLatestLatLngOfDeliveryAgent', (agentLat, agentLng) => {
      this.setRouteInMap(agentLat, agentLng);
      this.loading.dismiss();
    });
  }
  loadMap(lat, lng) {
    let latLng = new google.maps.LatLng(lat, lng);
    let mapOptions = {
      center: latLng,
      zoom: 13,
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
    this.makeUserMarker(userLocation, this.icons.end, "title", this.map);
  }
  
  setRouteInMap(agentLat, agentLng) {
    this.directionsDisplay.setOptions({
      suppressMarkers: true
    });
    const request = {
      origin: {lat: agentLat, lng: agentLng},
      destination: {lat: this.deliveryLatLng.lat, lng: this.deliveryLatLng.lng},
      travelMode: google.maps.TravelMode['DRIVING']
    }
    this.directionsService.route(request, (res, status) => {

      if(status == google.maps.DirectionsStatus.OK){
        this.directionsDisplay.setDirections(res);
        this.removePreviousAgentMarkers();
        const agentLocation = {
          lat: agentLat,
          lng: agentLng
        };
        this.makeAgentMarkers(agentLocation, this.icons.start, "title", this.map);
      } else {
          console.warn(status);
          this.presentAlert("There is some problem in setting up route. Please try again later.");
          this.events.unsubscribe('delivery:publishLatestLatLngOfDeliveryAgent');
      }

  });
  }
  makeAgentMarkers(position, icon, title, map) {
    let marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: icon,
        title: title
    });
    this.deliveryAgentMarkers.push(marker);
}
  makeUserMarker(position, icon, title, map) {
    new google.maps.Marker({
        position: position,
        map: map,
        icon: icon,
        title: title
    });
}
removePreviousAgentMarkers() {
  for (let index = 0; index < this.deliveryAgentMarkers.length; index++) {
    this.deliveryAgentMarkers[index].setMap(null);
  }
}
async presentLoading() {
  this.loading = await this.loadingCtrl.create({
    message: 'Initializing Map...',
    duration: 5000
  });
  await this.loading.present();
}
async presentAlert(msg: string) {
  const alert = await this.alertController.create({
    message: msg,
    backdropDismiss: false,
    buttons: [{
      text: 'Ok',
      handler: () => {
        if(this.routeFromUserSide) {
          this.router.navigate(['shop-categories']);
        } else {
          this.router.navigate(['admin-home']);
        }
      }
    }]
  });

  await alert.present();
}
  removeSubscriptions() {
    this.events.unsubscribe('delivery:publishLatestLatLngOfDeliveryAgent');
  }
}
