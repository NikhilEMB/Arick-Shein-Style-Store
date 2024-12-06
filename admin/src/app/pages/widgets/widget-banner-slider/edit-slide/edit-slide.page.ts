import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LabelService } from 'src/app/services/label/label.service';
import { Events, AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { BannerLinkingModalPage } from '../../../../admin/admin-banners/banner-linking-modal/banner-linking-modal.page';
import { ImageEditorComponent } from 'src/app/components/image-editor/image-editor.component';

@Component({
  selector: 'app-edit-slide',
  templateUrl: './edit-slide.page.html',
  styleUrls: ['./edit-slide.page.scss'],
})
export class EditSlidePage implements OnInit {

  bannerID;
  slideID;
  slideData: any;
  linkTypes = [];
  BANNER_SETTINGS_LABELS: any;
  SHARED_LABELS: any;
  loading;
  mode = 'edit';
  type: any
  linkLength: any
  widgetType: any
  linkUrl = ''
  pdfUrl = ''
  newFile = false;
  statusType = '';
  currentType = ''
  constructor(
    private events: Events,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private labelService: LabelService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (this.router.getCurrentNavigation().extras.state.bannerID) {
          this.bannerID = this.router.getCurrentNavigation().extras.state.bannerID;
          this.type = this.router.getCurrentNavigation().extras.state.type;
          //console.log("type:",this.type)
        }
        if (this.router.getCurrentNavigation().extras.state.slideID) {
          this.slideID = this.router.getCurrentNavigation().extras.state.slideID;
          this.events.publish('widgets:getBannerSlide', this.bannerID, this.slideID, this.type);
        }
        else {
          this.setNewSlide();
        }
        if (this.router.getCurrentNavigation().extras.state.widgetType) {
          this.widgetType = this.router.getCurrentNavigation().extras.state.widgetType;
        }
        if (this.router.getCurrentNavigation().extras.state.slideData) {
          let slideUrl = this.router.getCurrentNavigation().extras.state.slideData.link.url
          let slideType = this.router.getCurrentNavigation().extras.state.slideData.link.type
          if (slideType && slideType == 'external' && slideUrl) {
            this.linkUrl = slideUrl
          }
          if (slideType && slideType == 'pdf' && slideUrl) {
            this.pdfUrl = slideUrl
          }
        }
      }
    });
  }

  setNewSlide() {
    this.slideData = {
      active: true,
      image: {
        org: '',
        thumb: '',
        mob: '',
      },
      link: {
        type: 'none',
        id: '',
        name: ''
      },
      caption: ''
    };
  }
  ngOnInit() {
    //this.setNewSlide();


    this.BANNER_SETTINGS_LABELS = this.labelService.labels['BANNER_SETTINGS'];
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.linkTypes = [
      this.BANNER_SETTINGS_LABELS['none'],
      this.BANNER_SETTINGS_LABELS['product'],
      this.BANNER_SETTINGS_LABELS['category'],
      'subcategory',
      this.BANNER_SETTINGS_LABELS['brand'],
      //this.BANNER_SETTINGS_LABELS['search'],
      // this.BANNER_SETTINGS_LABELS['service'],
      // 'page'
    ]
  }

  ionViewWillEnter() {
    //console.log('edit slide ionViewWillEnter')
    this.initializeSubscriptions();
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  removeSubscriptions() {
    this.events.unsubscribe('widgets:addBannerSlideSuccess');
    this.events.unsubscribe('widgets:updateBannerSlideSuccess');
    this.events.unsubscribe('widgets:publishgetBannerSlideSuccess');
  }


  initializeSubscriptions() {
    //console.log('initializeSubscriptions ionViewWillEnter') 

    this.events.subscribe('widgets:addBannerSlideSuccess', async (ID) => {
      if (this.loading) {
        this.loading.dismiss();
      }
      await this.presentAlert('Slide added successfully, uploaded image will updated shortly');
      this.slideID = ID;
      this.goBack();
    });

    this.events.subscribe('widgets:updateBannerSlideSuccess', () => {

      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Slide updated successfully,uploaded image will updated shortly');
      this.goBack();
    });

    this.events.subscribe('widgets:publishgetBannerSlideSuccess', (slideData) => {
      console.log('slide data:', slideData);
      this.slideData = slideData;
      this.currentType = "type" in this.slideData.link ? this.slideData.link.type : "";
      this.linkLength =  "ids" in this.slideData.link ? this.slideData.link.ids.length : this.linkLength;
      //console.log(this.slideData)
    });

  }

  async uploadImage(files: FileList) {
    // new code for image editor
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
      if (res && res.data) {
        console.log('modal data', res.data);
        this.slideData.image.org = res.data || '';
      }
    });
    ////console.log(type);
    // for (let i = 0; i < files.length; i++) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(files.item(i))
    //   reader.onload = (event:any) => { // called once readAsDataURL is completed
    //     let base64Image:any = event.target.result;
    // this.slideData.image.org = res.data;
    //     ////console.log(this.slideData.org);
    //  }
    // }
  }

  uploadPdf(file) {
    if (file[0]) {
      console.log(file[0])
      this.slideData.link.url = file[0];
      this.newFile = true
    }
  }

  selectLinkType(i: number) {
    const type = this.linkTypes[i];
    this.slideData.link.type = type;
    if (type === this.BANNER_SETTINGS_LABELS['product']) {
      this.presentModal(this.slideData.link.type);
    } else if (type === this.BANNER_SETTINGS_LABELS['category']) {
      this.presentModal(this.slideData.link.type);
    } else if (type === 'subcategory') {
      this.presentModal(this.slideData.link.type);
    } else if (type === 'page') {
      this.presentModal(this.slideData.link.type);
    } else if (type === this.BANNER_SETTINGS_LABELS['brand']) {
      this.presentModal(this.slideData.link.type);
    } else if (type === this.BANNER_SETTINGS_LABELS['service']) {
      this.presentModal(this.slideData.link.type);
    } else if (type === this.BANNER_SETTINGS_LABELS['search']) {
      this.searchTextAlert();
    } else if (type === this.BANNER_SETTINGS_LABELS['refer_and_earn']) {
      return null;
    } else {
      // return null;
      this.defaultLinkType();
    }
    this.slideData.link.ids = [];
    this.slideData.link.name = '';
  }

  async presentModal(type: string) {
    // console.log('linkId:', this.slideData.link.ids);
    // console.log('currentType:', this.slideData.type);
    // console.log('modal linkType : ', type);
    // console.log('modal linkId : ', this.slideData.link.ids);
    // console.log('modal currentType : ', this.slideData.type);
    // console.log('modal status : ', this.statusType);

    if (type !== this.currentType) {
      this.slideData.link.ids = [];
    }

    const modal = await this.modalController.create({
      component: BannerLinkingModalPage,
      cssClass: 'custom-modal',
      showBackdrop: true,
      backdropDismiss: false,
      componentProps: {
        linkType: type,
        linkId: this.slideData.link.ids,
        currentType: this.slideData.type,
        status: this.statusType
      }
    });
    modal.onDidDismiss()
      .then((res) => {
        //console.log('data from modal', res);
        if (res && res.data) {
          console.log('res.data : ', res.data);
          this.slideData.link.ids = res.data.id || [];
          if (res.data.id && res.data.id.length > 0) {
            this.slideData.link.id = res.data.id[0]
          }
          else {
            this.slideData.link.id = ''
          }
          this.linkLength = this.slideData.link.ids.length
          this.statusType = res.data.status || '';
          this.currentType = res.data.type || '';
          if (res.data.name) {
            this.slideData.link.name = res.data.name;
          }
          if (res.data.hasOwnProperty('isSubcategories')) {
            this.slideData.link['isSubcategories'] = res.data.isSubcategories;
          }
          if (type == 'subcategory') {
            this.slideData.link['categoryId'] = res.data.categoryId;
          }
          if (res.data.hasOwnProperty('serviceData')) {
            this.slideData.link['serviceData'] = res.data.serviceData;
          }
          this.statusType = res.data.status || '';
        }
        else {
          this.defaultLinkType()
        }
      });

    await modal.present();

  }

  checkCurrentType(type: string) {
    if (type === this.currentType) {
      return true
    } else {
      return false
    }
  }

  defaultLinkType() {
    this.slideData.link.ids = [];
    this.slideData.link.name = '';
    this.slideData.link.type = this.BANNER_SETTINGS_LABELS['none'];
    delete this.slideData.link.url
    this.linkUrl = '';
    this.linkLength = '';
  }

  selectStaticLink(type) {
    this.slideData.link.ids = [];
    this.slideData.link.name = '';
    if (type == 'contactUs') {
      this.slideData.link.type = 'contactUs';
    }
    else if (type == 'referEarn') {
      this.slideData.link.type = 'referEarn';
    }
    else if (type == 'feedback') {
      this.slideData.link.type = 'feedback';
    }
    else if (type == 'offers') {
      this.slideData.link.type = 'offers';
    }
    else if (type == 'membership') {
      this.slideData.link.type = 'membership';
    }
    else if (type == 'external') {
      this.slideData.link.type = 'external';
      this.slideData.link.url = this.linkUrl;
    }
    else if (type == 'pdf') {
      this.slideData.link.type = 'pdf';
    }
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
            if (!data.searchTxt) {
              this.defaultLinkType();
              this.presentAlert(this.BANNER_SETTINGS_LABELS['please_enter_valid_data']);
            }
            else {
              this.slideData.link.name = data.searchTxt;
            }
          }
        }
      ]
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

  async updateSlide() {
    //console.log(this.slideData,this.type)
    if (this.slideData.active && !this.slideData.image.org) {
      this.presentAlert(this.BANNER_SETTINGS_LABELS['upload_banner_msg'])
    } else {
      this.filterData();
      if (this.slideData.link && this.slideData.link.type == 'external') {
        if (this.linkUrl != '' && this.isValidHttpUrl(this.linkUrl)) {
          this.slideData.link.url = this.linkUrl
          await this.presentLoading();
          this.events.publish('widgets:updateBannerSlide', this.slideData, this.bannerID, this.slideID, this.type);
        }
        else {
          this.presentAlert('Please enter a valid link')
        }
      }
      else if (this.slideData.link && this.slideData.link.type == 'pdf') {
        if (this.slideData.link.url) {
          await this.presentLoading();
          this.events.publish('widgets:updateBannerSlide', this.slideData, this.bannerID, this.slideID, this.type);
        }
        else {
          this.presentAlert('Please select a file to upload')
        }
      }
      else {
        await this.presentLoading();
        this.events.publish('widgets:updateBannerSlide', this.slideData, this.bannerID, this.slideID, this.type);
      }
    }
  }

  isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  async addSlide() {
    if (this.slideData.active && !this.slideData.image.org) {
      this.presentAlert(this.BANNER_SETTINGS_LABELS['upload_banner_msg'])
    } else {
      this.filterData();
      if (this.slideData.link && this.slideData.link.type == 'external') {
        if (this.linkUrl != '' && this.isValidHttpUrl(this.linkUrl)) {
          this.slideData.link.url = this.linkUrl
          await this.presentLoading();
          this.events.publish('widgets:addBannerSlide', this.slideData, this.bannerID, this.type);
        }
        else {
          this.presentAlert('Please enter a valid link')
        }
      }
      else if (this.slideData.link && this.slideData.link.type == 'pdf') {
        if (this.slideData.link.url) {
          await this.presentLoading();
          this.events.publish('widgets:addBannerSlide', this.slideData, this.bannerID, this.type);
        }
        else {
          this.presentAlert('Please select a file to upload')
        }
      }
      else {
        await this.presentLoading();
        this.events.publish('widgets:addBannerSlide', this.slideData, this.bannerID, this.type);
      }
    }
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'Okay',
        handler: () => {
          //console.log('Confirm Okay');
        }
      }]
    });
    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: this.SHARED_LABELS['please_wait'],
      duration: 10000
    });
    await this.loading.present();
  }

  filterData() {
    if (this.slideData.link.type !== this.BANNER_SETTINGS_LABELS['category'] && this.slideData.link.hasOwnProperty('isSubcategories')) {
      delete this.slideData.link.isSubcategories;
    }
    if (this.slideData.link.type !== this.BANNER_SETTINGS_LABELS['service'] && this.slideData.link.hasOwnProperty('serviceData')) {
      delete this.slideData.link.serviceData;
    }
  }

  removeImage() {
    this.slideData.image.org = '';
    this.slideData.image.mob = '';
    this.slideData.image.thumb = '';
  }

  goBack() {
    // this.navController.back();
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ID: this.bannerID,
      }
    };
    this.router.navigate(['edit-banner'], navigationExtras);
  }

  uploadQR(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event: any) => {
        let base64Image: any = event.target.result;
        this.slideData.url = base64Image
      }
    }
  }


}
