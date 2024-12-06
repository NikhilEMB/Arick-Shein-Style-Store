import { Component, OnInit } from '@angular/core';
import { Events, AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LabelService } from 'src/app/services/label/label.service';
import { LogglyLoggerService } from 'src/app/services/loggly-logger/loggly-logger.service';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { BannerLinkingModalPage } from '../banner-linking-modal/banner-linking-modal.page';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-banner-settings',
  templateUrl: './banner-settings.page.html',
  styleUrls: ['./banner-settings.page.scss'],
})
export class BannerSettingsPage implements OnInit {
  bannerData: any = {};
  index: any;
  SHARED_LABELS: any;
  headerText: any;
  BANNER_SETTINGS_LABELS: any;
  linkTypes = [];
  loading: any;
  data: any;
  referralFeature = false;
  bannerType:any;
  bannerMode;
  constructor(private events: Events,
              private router: Router,
              public camera: Camera,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private labelService: LabelService,
              private logglyService: LogglyLoggerService,
              private route: ActivatedRoute,
              private modalController: ModalController,
              private configService: ConfigService) {
                this.route.queryParams.subscribe(params => {

                  if (this.router.getCurrentNavigation().extras.state) {

                    this.bannerData = this.router.getCurrentNavigation().extras.state.bannerData;
                    this.bannerType = this.router.getCurrentNavigation().extras.state.bannerType;
                    this.index = this.router.getCurrentNavigation().extras.state.index;
                    console.log('this.bannerData', this.bannerData, this.index);
                    
                  }
                });
               }

  ngOnInit() {
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.BANNER_SETTINGS_LABELS = this.labelService.labels['BANNER_SETTINGS'];
    this.headerText = `${this.BANNER_SETTINGS_LABELS['banner']} ${this.index}` ;
    this.referralFeature = this.configService.environment.referralFeature;
    this.linkTypes = [
      this.BANNER_SETTINGS_LABELS['none'],
      this.BANNER_SETTINGS_LABELS['product'],
      this.BANNER_SETTINGS_LABELS['category'],
      this.BANNER_SETTINGS_LABELS['brand'],
      this.BANNER_SETTINGS_LABELS['search'],
      this.BANNER_SETTINGS_LABELS['service']
    ]
    if(this.referralFeature) {
      this.linkTypes.push(this.BANNER_SETTINGS_LABELS['refer_and_earn'])
    }
    this.prepareData(this.bannerData);

  }

  prepareData(data: any) {
    if(!data) {
      data = {
        active: true,
        org: '',
        link: {
          type: this.BANNER_SETTINGS_LABELS['none'],
          id: '',
          name: ''
        }
      };
    } else {
      if(!data.hasOwnProperty('active')) {
        data['active'] = true;
      }
      if(!data.hasOwnProperty('link')) {
        data['link'] = {
          type: this.BANNER_SETTINGS_LABELS['none'],
          id: '',
          name: ''
        }
      }
    }
    this.bannerData = data;
    console.log('changes datas', this.bannerData)
    
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('banners:saveBannerSuccess', () => {
      if(this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert(this.BANNER_SETTINGS_LABELS['data_saved_msg'])
    });
  }

  toggleActive() {
    this.bannerData.active = !this.bannerData.active;
  }

  removeImage() {
    this.bannerData.org = '';
    this.bannerData.thumb = '';
    this.bannerData.mob = '';
  }

  imgZoom(img: any) {
    this.modalController.create({
      component: ImageModalPage,
      cssClass:'photo-modal-class',
      componentProps: {
        imgs: [{url: img}],
        index: 0
      }
    }).then(modal => modal.present());
  }


  uploadImage(files: FileList) {
    //console.log(type);
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        let base64Image:any = event.target.result;
        this.bannerData.org = base64Image;
        console.log(this.bannerData.org);
        
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: this.SHARED_LABELS['please_wait'],
      duration: 10000
    });
    await this.loading.present();
  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['ok']
    });

    await alert.present();
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  selectLinkType(i: number) {
    const type = this.linkTypes[i];
    this.bannerData.link.type = type;
    if(type === this.BANNER_SETTINGS_LABELS['product']) {
      this.presentModal(this.bannerData.link.type);
    } else if(type === this.BANNER_SETTINGS_LABELS['category']) {
      this.presentModal(this.bannerData.link.type);
    } else if(type === this.BANNER_SETTINGS_LABELS['brand']) {
      this.presentModal(this.bannerData.link.type);
    } else if(type === this.BANNER_SETTINGS_LABELS['service']) {
      this.presentModal(this.bannerData.link.type);
    } else if(type === this.BANNER_SETTINGS_LABELS['search']) {
      this.searchTextAlert();
    } else if(type === this.BANNER_SETTINGS_LABELS['refer_and_earn']) {
      return null;
    } else {
      return null;
    }
    this.bannerData.link.id = ''; 
    this.bannerData.link.name = ''; 
  }

  async presentModal(type: string) {
    const modal = await this.modalController.create({
    component: BannerLinkingModalPage,
    cssClass:'custom-modal',
    componentProps: { linkType: type, linkId: this.bannerData.link.id }
    });
    modal.onDidDismiss()
    .then((res) => {
      console.log('data from modal', res);
      if(res.data) {
        this.bannerData.link.id = res.data.id; 
        this.bannerData.link.name = res.data.name;
        if(res.data.hasOwnProperty('isSubcategories')) {
          this.bannerData.link['isSubcategories'] = res.data.isSubcategories;
        }
        if(res.data.hasOwnProperty('serviceData')) {
          this.bannerData.link['serviceData'] = res.data.serviceData;
        }
      } else {
        this.defaultLinkType();
      }
  });
  
    await modal.present();
  
  }

  async searchTextAlert() {
    const alert = await this.alertController.create({
      subHeader: this.BANNER_SETTINGS_LABELS['search_text'],
      inputs: [
        {
          name: 'searchTxt',
          type: 'text',
          placeholder: this.BANNER_SETTINGS_LABELS['enter_search_text']
        },
      ],
       buttons: [
            {
              text: this.SHARED_LABELS['cancel'],
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                this.defaultLinkType();
              }
            }, {
              text: this.SHARED_LABELS['add'],
              handler: (data) => {
                if(!data.searchTxt) {
                  this.defaultLinkType();
                  this.presentToast(this.BANNER_SETTINGS_LABELS['please_enter_valid_data']);
                }
                 else {
                  this.bannerData.link.name = data.searchTxt; 
                }
              } 
            }
          ]
  });
  await alert.present();
  }

  defaultLinkType() {
    this.bannerData.link.id = ''; 
    this.bannerData.link.name = ''; 
    this.bannerData.link.type = this.BANNER_SETTINGS_LABELS['none']; 
  }

  async saveBannerData() {
    if(this.bannerData.active && !this.bannerData.org) {
      this.presentAlert(this.BANNER_SETTINGS_LABELS['upload_banner_msg'])
    } else {
      this.filterData();
      await this.presentLoading();
      this.events.publish('banners:saveBanner', this.bannerData, this.index, this.bannerType);
    }
  }

  async addBanner() {
    if(this.bannerData.active && !this.bannerData.org) {
      this.presentAlert(this.BANNER_SETTINGS_LABELS['upload_banner_msg'])
    } else {
      this.filterData();
      await this.presentLoading();
      this.events.publish('banners:addBanner', this.bannerData, this.index, this.bannerType);
    }
  }

  
  filterData() {
    if(this.bannerData.link.type !== this.BANNER_SETTINGS_LABELS['category'] && this.bannerData.link.hasOwnProperty('isSubcategories')) {
      delete this.bannerData.link.isSubcategories;
    }
    if(this.bannerData.link.type !== this.BANNER_SETTINGS_LABELS['service'] && this.bannerData.link.hasOwnProperty('serviceData')) {
      delete this.bannerData.link.serviceData;
    }
  }

  removeSubscriptions() {
    this.events.unsubscribe('banners:saveBannerSuccess');
  }

}
