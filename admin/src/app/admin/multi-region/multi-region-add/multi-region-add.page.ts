import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Events, LoadingController } from '@ionic/angular';
import { LabelService } from 'src/app/services/label/label.service';

/// <reference types="@types/googlemaps" />

@Component({
  selector: 'app-multi-region-add',
  templateUrl: './multi-region-add.page.html',
  styleUrls: ['./multi-region-add.page.scss'],
})


export class MultiRegionAddPage implements OnInit {

  SHARED_LABELS: any;
  ADD_REGION_LABELS: any;
  headerText: any;
  loading: any;
  region = {
    name: '',
    active: true,
    pincodes: [],
    createdAt: null
  };
  pincode: number;
  type:any
  center: google.maps.LatLngLiteral
  @ViewChild('GoogleMap', {static: false}) gmap: google.maps.Map;
  radius = 0
  latitude = 0
  longitude = 0

  constructor(private events: Events,
              private labelService: LabelService,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private router: Router,
              private route: ActivatedRoute,
              private ngZone: NgZone) {
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    const dataCurrent = this.router.getCurrentNavigation().extras.state.data;
                    if(dataCurrent && dataCurrent.regionType){
                      this.type = dataCurrent.regionType
                    }
                    if(dataCurrent && dataCurrent.regionData) {
                      this.region = dataCurrent.regionData;
                    }
                    if(dataCurrent){
                      if (this.region['center']){
                        this.center = this.region['center']
                        this.latitude = this.center.lat
                        this.longitude = this.center.lng
                      }
                      else{
                        navigator.geolocation.getCurrentPosition((position) => {
                          this.center = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                          }
                          this.latitude = this.center.lat
                          this.longitude = this.center.lng
                        })
                      }
                      if (this.region['radius']){
                        this.radius = this.region['radius']
                      }
                    }
                  }
                });
               }

  ngOnInit() {
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.ADD_REGION_LABELS = this.labelService.labels['ADD_REGION'];
    this.headerText = this.ADD_REGION_LABELS['header_text'];
  }

  async ionViewWillEnter() {
    this.initializeSubscriptions();
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('multi-region:regionSaved', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert("Region saved");
    });
  }

  toggleActive() {
    this.region.active = !this.region.active;
  }

  addPincode() {
    this.region.pincodes.push(this.pincode);
    this.pincode = null;
  }

  removePin(i: number) {
    this.region.pincodes.splice(i, 1);
  }

  async presentLoading(duration: number, msg: string) {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: duration,
    });
    await this.loading.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: this.SHARED_LABELS['ok'],
        handler: () => {
        }
      }]
    });

    await alert.present();
  }

  async saveRegion() {
    if(!this.region.name) {
      await this.presentAlert("Please add region name");
    } else {
      await this.presentLoading(5000, "Please wait ...");
      if (this.type == 'pincodes'){
        this.events.publish('multi-region:saveRegion', this.region);
      }
      else {
        this.events.publish('multi-region:saveRegionArea', this.region, JSON.parse(JSON.stringify(this.gmap.getCenter())), this.radius);
      }
    }
    
  }

  changeCenter(){
    this.center = {
      lat: this.latitude,
      lng: this.longitude,
    }
  }

  centerChanged(){
    let currentCenter = JSON.parse(JSON.stringify(this.gmap.getCenter()))
    this.latitude = currentCenter.lat
    this.longitude = currentCenter.lng
  }

  removeSubscriptions() {
    this.events.unsubscribe('multi-region:regionSaved');
  }

}
