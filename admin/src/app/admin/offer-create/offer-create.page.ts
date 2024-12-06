import { Component, OnInit } from '@angular/core';
import { Events, LoadingController, AlertController, ToastController, ActionSheetController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { LabelService } from 'src/app/services/label/label.service';
import { BannerLinkingModalPage } from '../admin-banners/banner-linking-modal/banner-linking-modal.page';

@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.page.html',
  styleUrls: ['./offer-create.page.scss'],
})
export class OfferCreatePage implements OnInit {
  ckeConfig: any;
  optionsforCamera: CameraOptions;
  optionsforGallery: any;
  name: string = '';
  description: string = '';
  images: any = [];
  loading: any;
  offerId: string = '';
  sortedAt: any;
  offerData: any;

    // Offer Linking
    linkTypes = [];
    bannerData: any = {};
    BANNER_SETTINGS_LABELS: any;
    SHARED_LABELS: any;
  constructor(private events: Events,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private toastController: ToastController,
              private router: Router,
              private camera: Camera,
              private modalController: ModalController,
              private actionSheetController: ActionSheetController,
              private imagePicker: ImagePicker,
              private labelService: LabelService,
              private route: ActivatedRoute) {
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.offerData = this.router.getCurrentNavigation().extras.state.offerData;
                    this.name = this.offerData.name;
                    this.description = this.offerData.description;
                    this.sortedAt = this.offerData.sortedAt;
                    this.images = this.offerData.images;
                    this.offerId = this.offerData.id;
                    this.bannerData = this.offerData.link;
                    //console.log('offerData', this.offerData);
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
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.BANNER_SETTINGS_LABELS = this.labelService.labels['BANNER_SETTINGS'];
    this.linkTypes = [
    this.BANNER_SETTINGS_LABELS['none'],
    this.BANNER_SETTINGS_LABELS['product'],
    this.BANNER_SETTINGS_LABELS['category'],
    'subcategory',
    this.BANNER_SETTINGS_LABELS['brand'],
    this.BANNER_SETTINGS_LABELS['service']
  ];
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
    this.events.subscribe('offer:saveOfferSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Offer data saved successfully. Any images added will be uploaded after couple of minutes.');
    });
    this.events.subscribe('offer:deleteOfferSucess', () => {
      this.loading.dismiss();
      this.presentAlert('Offer deleted successfully!');
    });
  }

  async saveOffer() {
    if(!this.name) {
      this.presentAlert('Please enter offer name');
    } else {
      await this.presentLoading('Saving offer data...', 20000);
      const offerData = {
        name: this.name,
        description: this.description,
        sortedAt: this.sortedAt,
        link: this.bannerData
      }
      if(!this.offerId) {
        offerData['sortedAt'] = new Date();
      }
      this.events.publish('offer:saveOffer', offerData, this.images, this.offerId);
    }
  }

  async deleteAlertConfirm() {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this offer?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Delete',
          handler: () => {
            //console.log('Confirm Okay');
            this.deleteOffer();
          }
        }
      ]
    });

    await alert.present();
  }
  async deleteOffer() {
    await this.presentLoading('Deleting offer...', 5000)
    this.events.publish('offer:deleteOffer', this.offerId);
  }

  

  async openImageActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select any option',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.uploadSingleImage('camera');
        }
      }, {
        text: 'Crop and upload from gallery',
        icon: 'image',
        handler: () => {
         this.uploadSingleImage('gallery');
        }
      },{
        text: 'Multiple images from gallery',
        icon: 'images',
        handler: () => {
         this.uploadMultipleImages();
        }
      },
       {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  uploadSingleImage(type: string) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true
    };
    if(type === 'gallery') {
      options['sourceType'] = 0;
    }
    this.camera.getPicture(options).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.images.push({url: base64Image});
     }, (err) => {
      //console.log(err);
    });
  }

  uploadMultipleImages() {
    this.optionsforGallery = {
      quality: 50,
      outputType: 1
    };
    this.imagePicker.getPictures(this.optionsforGallery).then((results) => {
      if(results.length !== 0 && results !== 'OK') {
        if(results.length <= 3) {
          for (let i = 0; i < results.length; i++) {
            const base64Img = 'data:image/jpeg;base64,' + results[i];
            this.images.push({url: base64Img});
          }
        } else {
          this.presentAlert('Please select maximum <strong>3</strong> images from gallery');
        }
        
      }
      
    }, (err) => {
      alert(err);
    });
  }

  uploadImage(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        let base64Image:any = event.target.result;
        this.images.push({url: base64Image});
      }
    }
  }

  removeImage(index) {
    this.images.splice(index, 1);
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['offer-settings']);
        }
      }]
    });
    await alert.present();
  }

  async presentLoading(msg: string, duration: number) {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: duration
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  removeSubscriptions() {
    this.events.unsubscribe('offer:saveOfferSuccess');
    this.events.unsubscribe('offer:deleteOfferSucess');
  }

  
  selectLinkType(i: number) {
    const type = this.linkTypes[i];
    this.bannerData.link.type = type;
    if(type === this.BANNER_SETTINGS_LABELS['product']) {
      this.presentModal(this.bannerData.link.type);
    } else if(type === this.BANNER_SETTINGS_LABELS['category']) {
      this.presentModal(this.bannerData.link.type);
    } else if(type === 'subcategory') {
      this.presentModal(this.bannerData.link.type);
    } else if(type === this.BANNER_SETTINGS_LABELS['brand']) {
      this.presentModal(this.bannerData.link.type);
    } else if(type === this.BANNER_SETTINGS_LABELS['service']) {
      this.presentModal(this.bannerData.link.type);
    } else if(type === this.BANNER_SETTINGS_LABELS['refer_and_earn']) {
      return null;
    } else {
      return null;
    }
    this.bannerData.link.ids = ''; 
    this.bannerData.link.name = ''; 
  }
  
  async presentModal(type: string) {
    const modal = await this.modalController.create({
    component: BannerLinkingModalPage,
    cssClass:'custom-modal',
    showBackdrop: true,
    backdropDismiss: false,
    componentProps: { linkType: type, linkId: this.bannerData.link.ids, currentType:this.bannerData.type }
    });
    modal.onDidDismiss()
    .then((res) => {
      console.log('data from modal', res);
      if(res.data) {
        this.bannerData.link.ids = res.data.id;
        if (res.data.id.length > 0)
        {
          this.bannerData.link.id = res.data.id[0]
        }
        else{
          this.bannerData.link.id = '' 
        }
        if (res.data.name){
          this.bannerData.link.name = res.data.name;
        }
        if(res.data.hasOwnProperty('isSubcategories')) {
          this.bannerData.link['isSubcategories'] = res.data.isSubcategories;
        }
        if(type=='subcategory') {
          this.bannerData.link['categoryId'] = res.data.categoryId;
        }
        if(res.data.hasOwnProperty('serviceData')) {
          this.bannerData.link['serviceData'] = res.data.serviceData;
        }
      }
  });
    await modal.present();
  }

}
