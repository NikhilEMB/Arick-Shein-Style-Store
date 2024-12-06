import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Events, LoadingController, AlertController, ActionSheetController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { LabelService } from 'src/app/services/label/label.service';
import { LogglyLoggerService } from 'src/app/services/loggly-logger/loggly-logger.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ImageEditorComponent } from 'src/app/components/image-editor/image-editor.component';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.page.html',
  styleUrls: ['./add-brand.page.scss'],
})
export class AddBrandPage implements OnInit {
  status = true;
  name = '';
  metaData = {
    pageTitle : '',
    metaDescription : '',
     metaKeywords : '',
  }
  image: any = [];
  banner: any = [];
  brandData: any;
  brandId = '';
  loading: any;
  sortedAt: any;
  ADD_BRAND_LABELS: any = {};
  SHARED_LABELS: any = {};
  selectRegionPh: any;
  multiRegion = false;
  regions = [];
  regionId = [];
  ckeConfig: any;
  description = '';

  customWidthVal: any = 4;
  customHeightVal: any = 3;
  slug = {
    name:'',
    updatedAt: new Date(),
    updatedBy: 'admin'
  }
  isUniversal = false;

  constructor(private router: Router,
              private events: Events,
              private loadingController: LoadingController,
              public alertController: AlertController,
              private camera: Camera,
              private actionSheetController: ActionSheetController,
              private route: ActivatedRoute,
              private modalController: ModalController,
              private labelService: LabelService,
              private logglyService: LogglyLoggerService,
              private configService: ConfigService,
              public sharedService: SharedService) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.brandData = this.router.getCurrentNavigation().extras.state.brandData;
          if (this.brandData) {
            this.name = this.brandData.name;
            this.status = this.brandData.status;
            this.slug = this.brandData.slug || this.slug;
            if(this.brandData.metaData){
              this.metaData = this.brandData.metaData
            }


            this.image = this.brandData.image.hasOwnProperty('url') ? [{...this.brandData.image}] : [];
            this.banner = this.brandData.banner.hasOwnProperty('url') ? [{...this.brandData.banner}] : [];
            this.brandId = this.brandData.id;
            this.sortedAt = this.brandData.sortedAt;
            this.regionId = this.brandData.hasOwnProperty('regionId') ? this.brandData.regionId : this.regionId;
            this.description = 'description' in this.brandData ? this.brandData.description : '';
          }
        }
      });
    }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: true,
      toolbar: [
      [ 'Bold', 'Italic', 'Underline', '-','NumberedList', 'BulletedList',
      '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Format', 'FontSize', 'Link' ]
        ],
      height: 150
    };
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.ADD_BRAND_LABELS = this.labelService.labels['ADD_BRAND'];
    this.selectRegionPh = this.SHARED_LABELS['select_region'];
    this.multiRegion = this.configService.environment.multiRegion;
    this.isUniversal = this.sharedService.isUniversal();
    if(this.multiRegion) {
      this.events.publish('multi-region:getActiveStatus');
      this.events.publish('multi-region:getAllActiveRegions');
    }
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('brands:saveBrandSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Brand Saved Successfully', true);
    });
    this.events.subscribe('brands:deleteBrandSuccess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Brand deleted successfully!', true);
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

  async saveBrand() {
    if (!this.name) {
      this.presentAlert('Please enter brand name');
    } else {
      let brandData = {
        name: this.name,
        metaData: this.metaData,
        status: this.status,
        regionId: this.regionId,
        description: this.description
      };
      if (this.isUniversal && this.brandId) {
        const slugName = this.sharedService.createSlugName(this.slug.name);
        const sameSlugExists = await this.sharedService.sameSlugExists('brands', this.brandId, slugName);
        if (sameSlugExists) {
          this.presentAlert('Same slug already exists, please try with another slug name');
          return;
        } else{
          brandData['slug'] = {
            name: slugName,
            updatedAt: new Date(),
            updatedBy: 'admin'
          }
        }
      }
    await this.presentLoading('Saving brand details...', 10000);
    brandData['sortedAt'] = this.brandId ? this.sortedAt : new Date();

    console.log(brandData);
    this.events.publish('brands:saveBrand', brandData, this.image, this.banner, this.brandId);
  }
}
// updateStatus() {
 
//   if (this.status === true) {
//     this.status = true;
//   } else {
//     this.status = false;
//   }

//   console.log()
// }

removeImage(type: string) {
  if (type === 'brandImg') {
    this.image.splice(0, 1);
  } else {
    this.banner.splice(0, 1);
  }
}

async deleteConfirm() {
  const alert = await this.alertController.create({
    message: 'Are you sure you want to delete this brand?',
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
          this.deleteBrand();
        }
      }
    ]
  });

  await alert.present();
}
async deleteBrand() {
  await this.presentLoading('Deleting brand...', 5000);
  this.events.publish('brands:deleteBrand', this.brandId);
}



async imageActionSheet(type: string) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Select any option',
    buttons: [{
      text: 'Camera',
      icon: 'camera',
      handler: () => {
        this.addCameraImage('camera', type);
      }
    }, {
      text: 'Gallery',
      icon: 'images',
      handler: () => {
        this.addCameraImage('gallery', type);
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
addCameraImage(ctype: string, type: string) {
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
    if (type === 'brandImg') {
      this.banner = [];
      this.banner.push({url: base64Image});
    } else {
      this.image = [];
      this.image.push({url: base64Image});
    }
   }, (err) => {
    console.log(err);
  });
}

async uploadImage(files: FileList, type) {
  if(type == 'brandBanner') {
    this.customWidthVal = 3.42;
    this.customHeightVal = 1;
  }
  console.log(type);
  const modal = await this.modalController.create({
    component: ImageEditorComponent,
    componentProps: {
      aspectRatioWidthVal: this.customWidthVal,
      aspectRatioHeightVal: this.customHeightVal,
    },
    cssClass: 'custom-img-editor'
  })
  await modal.present();
  modal.onDidDismiss().then(res => {
    if (type === 'brandImg') {
      this.image = [];
      this.image.push({url: res.data || ''});
    } else {
      this.banner = [];
      this.banner.push({url: res.data || ''});
    }
  })
  // for (let i = 0; i < files.length; i++) {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(files.item(i))
  //   reader.onload = (event:any) => { // called once readAsDataURL is completed
  //     let base64Image:any = event.target.result;
  //     console.log(base64Image);
  //     let base64Str = base64Image.split(',');
  //     //let size = this.calculateImageSize(base64Str[1]);
  //     //this.imageResponse.push({imgData: base64Image, imgSize: size});
    //   if (type === 'brandImg') {
    //   this.image = [];
    //   this.image.push({url: base64Image});
    // } else {
    //   this.banner = [];
    //   this.banner.push({url: base64Image});
    // }
   
  //   }
  // }
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

async presentAlert(msg: string, action?: boolean) {
  const alert = await this.alertController.create({
    message: msg,
    buttons: [{
      text: 'OK',
      handler: () => {
        if (action) {
          this.router.navigate(['all-brands']);
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

  addRegion(e) {
    console.log('regionId', e.target.value);
    this.regionId = e.target.value;
  }


  removeSubscriptions() {
    this.events.unsubscribe('brands:saveBrandSuccess');
    this.events.unsubscribe('brands:deleteBrandSuccess');
    this.events.unsubscribe('multi-region:publishActiveStatus');
    this.events.unsubscribe('multi-region:publishAllActiveRegions');
    this.events.publish('brands:removeBrandsSubs');
  }

}