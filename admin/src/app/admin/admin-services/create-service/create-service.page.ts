import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Events, LoadingController, AlertController, ActionSheetController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import * as moment from 'moment';
import { LabelService } from 'src/app/services/label/label.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ImageEditorComponent } from 'src/app/components/image-editor/image-editor.component';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.page.html',
  styleUrls: ['./create-service.page.scss'],
})
export class CreateServicePage implements OnInit {
  serviceData: any;
  serviceId = '';
  name = '';
  description = '';
  banner:any = [];
  imageMandatory = true;
  createdAt: any;
  loading: any;
  ckeConfig: any;
  CREATE_SERVICE_LABELS: any = {};
  SHARED_LABELS: any = {};
  metaData = {pageTitle : '',
  metaDescription : '',
  metaKeywords :''}
  schedule = {
    active: false,
    mandatory: false,
    maxDays: 7,
    days: [],
    timeSchedules: []
  };
  days: any = [
    {day: 'Sunday',active: false}, {day: 'Monday',active: false}, {day: 'Tuesday',active: false}, {day: 'Wednesday',active: false},
    {day: 'Thursday',active: false}, {day: 'Friday',active: false}, {day: 'Saturday',active: false}
  ];
  time: any = {
    start: null,
    end: null,
  };
  selectRegionPh: any;
  regionId = [];
  multiRegion = false;
  regions = [];

  constructor(private router: Router,
              private events: Events,
              private loadingController: LoadingController,
              public alertController: AlertController,
              private camera: Camera,
              private actionSheetController: ActionSheetController,
              private route: ActivatedRoute,
              private modalController: ModalController,
              private labelService: LabelService,
              private configService: ConfigService) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.serviceData = this.router.getCurrentNavigation().extras.state.serviceData;
          if (this.serviceData) {
            this.name = this.serviceData.name;
            this.description = this.serviceData.description;
            this.imageMandatory = this.serviceData.imageMandatory;
            this.createdAt = this.serviceData.createdAt;
            this.banner = this.serviceData.banner.hasOwnProperty('url') ? [{...this.serviceData.banner}] : [];
            console.log(this.banner)
            this.serviceId = this.serviceData.id;
            this.schedule = this.serviceData.hasOwnProperty('schedule') ? this.serviceData.schedule : this.schedule;
            this.regionId = this.serviceData.hasOwnProperty('regionId') ? this.serviceData.regionId : this.regionId;
            for (let index = 0; index < this.days.length; index++) {
              if (this.schedule.days.indexOf(this.days[index].day)!=-1) {
                this.days[index].active = true
              }
            }
            if(this.serviceData.metaData){
              this.metaData = this.serviceData.metaData
            }
          }
        }
      });
    }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: true,
      toolbar: [
      [ 'Bold', 'Italic', 'Underline', '-','NumberedList', 'BulletedList',
      '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Format', 'FontSize' ]
        ],
      height: 150
    };
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.CREATE_SERVICE_LABELS = this.labelService.labels['CREATE_SERVICE'];
    this.selectRegionPh = this.SHARED_LABELS['select_region'];
    this.multiRegion = this.configService.environment.multiRegion;
    if(this.multiRegion) {
      this.events.publish('multi-region:getActiveStatus');
      this.events.publish('multi-region:getAllActiveRegions');
    }
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('services-feature:saveServiceSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Service Saved Successfully', true);
    });
    this.events.subscribe('services-feature:deleteServiceSuccess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Service deleted successfully!', true);
    });
    this.events.subscribe('multi-region:publishActiveStatus', (data) => {
      if(data) {
        this.multiRegion = data.active;
      }
    });
    this.events.subscribe('multi-region:publishAllActiveRegions', (regions) => {
      if(regions.length) {
        this.regions = regions;
      }
    });
  }


  imageMandatoryStatus() {
    this.imageMandatory = !this.imageMandatory;
  }

  async saveService() {
    if (!this.name || !this.description) {
      this.presentAlert('Please enter all service details');
    } else {
    await this.presentLoading('Saving service details...', 10000);
    let daysData = []
    for (let index = 0; index < this.days.length; index++) {
      if (this.days[index].active == true) {
        daysData.push(this.days[index].day)
      }
    }
    let scheduleData = {
      active: this.schedule.active,
      mandatory: this.schedule.mandatory,
      maxDays: this.schedule.maxDays,
      days: daysData,
      timeSchedules: this.schedule.timeSchedules
    }
    const serviceData = {
      name: this.name,
      description: this.description,
      imageMandatory: this.imageMandatory,
      metaData: this.metaData,
      schedule: scheduleData,
      regionId: this.regionId
    };
    serviceData['createdAt'] = this.serviceId ? this.createdAt : new Date();
    this.events.publish('services-feature:saveService', serviceData, this.banner, this.serviceId);
  }
}

removeImage() {
  this.banner.splice(0, 1);
}

async deleteConfirm() {
  const alert = await this.alertController.create({
    message: 'Are you sure you want to delete this service?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Delete',
        handler: () => {
          console.log('Confirm Okay');
          this.deleteService();
        }
      }
    ]
  });

  await alert.present();
}
async deleteService() {
  await this.presentLoading('Deleting service...', 5000);
  this.events.publish('services-feature:deleteService', this.serviceId);
}

async imageActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Select any option',
    buttons: [{
      text: 'Camera',
      icon: 'camera',
      handler: () => {
        this.addCameraImage('camera');
      }
    }, {
      text: 'Gallery',
      icon: 'images',
      handler: () => {
        this.addCameraImage('gallery');
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();
}
addCameraImage(ctype: string) {
  const optionsforCamera: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation : true,
    allowEdit: true
  };
  if (ctype === 'gallery') {
    optionsforCamera['sourceType'] = 0;
  }
  this.camera.getPicture(optionsforCamera).then((imageData) => {
    const base64Image = 'data:image/jpeg;base64,' + imageData;
    this.banner = [];
    this.banner.push({url: base64Image});
   }, (err) => {
    console.log(err);
  });
}

async uploadImage(files: FileList) {
  const modal = await this.modalController.create({
    component: ImageEditorComponent,
    componentProps: {
      aspectRatioWidthVal: 3.42,
      aspectRatioHeightVal: 1,
    },
    cssClass: 'custom-img-editor'
  })
  await modal.present();
  modal.onDidDismiss().then(res => {
    this.banner = [];
    this.banner.push({url: res.data || ''});
  })
  //console.log(type);
  // for (let i = 0; i < files.length; i++) {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(files.item(i))
  //   reader.onload = (event:any) => { // called once readAsDataURL is completed
  //     let base64Image:any = event.target.result;
  //     let base64Str = base64Image.split(',');
  //     this.banner = [];
  //     this.banner.push({url: base64Image});
   
  //   }
  // }
}

imgZoom(img: any) {
  this.modalController.create({
    component: ImageModalPage,
    cssClass: 'photo-modal-class',
    componentProps: {
      imgs: [{url: img}],
      index: 0
    }
  }).then(modal => modal.present());
}

async presentAlert(msg: string, action?: boolean) {
  const alert = await this.alertController.create({
    message: msg,
    buttons: [{
      text: 'OK',
      handler: () => {
        if (action) {
          this.router.navigate(['all-services']);
        }
      }
    }]
  });
  await alert.present();
}

async presentLoading(msg: string, drn: number) {
  this.loading = await this.loadingController.create({
    message: msg,
    duration: drn
  });
  await this.loading.present();
}

  serviceScheduleToggle() {
    this.schedule.active = !this.schedule.active;
  }

  serviceScheduleMandatoryToggle() {
    this.schedule.mandatory = !this.schedule.mandatory;
  }

  daySelectToggle(i) {
    this.days[i].active = !this.days[i].active;
  }

  addTimeSchedule() {
    this.schedule.timeSchedules.push({
      start: moment(this.time.start).format('hh:mm A'),
      end: moment(this.time.end).format('hh:mm A')
    });
    this.time.start = null;
    this.time.end = null;
  }

  disableAddTimeSchedule() {
    if (!this.time.start || !this.time.end) {
      return true;
    } else {
      return false;
    }
  }

  removeTimeSchedule(index) {
    this.schedule.timeSchedules.splice(index, 1);
  }

  addRegion(e) {
    console.log('regionId', e.target.value);
    this.regionId = e.target.value;
  }

  removeSubscriptions() {
    this.events.unsubscribe('services-feature:saveServiceSuccess');
    this.events.unsubscribe('services-feature:deleteServiceSuccess');
    this.events.unsubscribe('multi-region:publishActiveStatus');
    this.events.unsubscribe('multi-region:publishAllActiveRegions')
  }

}
