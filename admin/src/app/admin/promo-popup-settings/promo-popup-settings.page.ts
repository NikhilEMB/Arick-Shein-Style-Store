import { Component, OnInit } from '@angular/core';
import { AlertController, Events, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { LabelService } from 'src/app/services/label/label.service';
import { BannerLinkingModalPage } from '../admin-banners/banner-linking-modal/banner-linking-modal.page';
import { ConfigService } from 'src/app/services/config/config.service';
import { ImageEditorComponent } from 'src/app/components/image-editor/image-editor.component';

@Component({
  selector: 'app-promo-popup-settings',
  templateUrl: './promo-popup-settings.page.html',
  styleUrls: ['./promo-popup-settings.page.scss'],
})
export class PromoPopupSettingsPage implements OnInit {
  SHARED_LABELS: any;
  headerText = '';
  PROMO_POPUP_SETTINGS_LABELS: any;
  popup: any = {
    active: false,
    banner: {
      url: ''
    },
    link: {
      type: '',
      name: '',
      id: ''
    }
  }

  linkTypes = [];
  loading: any;
  referralFeature = false;
  linkUrl: string = ''
  newFile: boolean = false;
  pdfUrl: string = '';
  statusType: string = '';
  currentType: string = '';
  linkLength: any;

  constructor(
    private labelService: LabelService,
    private events: Events,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalController: ModalController,
    private toastController: ToastController,
    private configService: ConfigService
  ) { }


  ngOnInit() {
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.PROMO_POPUP_SETTINGS_LABELS = this.labelService.labels['PROMO_POPUP_SETTINGS'];
    this.headerText = this.PROMO_POPUP_SETTINGS_LABELS['header_text'];
    this.referralFeature = this.configService.environment.referralFeature;
    this.initializeSubscriptions();

    this.linkTypes = [
      this.PROMO_POPUP_SETTINGS_LABELS['none'],
      this.PROMO_POPUP_SETTINGS_LABELS['product'],
      this.PROMO_POPUP_SETTINGS_LABELS['category'],
      this.PROMO_POPUP_SETTINGS_LABELS['brand'],
      this.PROMO_POPUP_SETTINGS_LABELS['search'],
      this.PROMO_POPUP_SETTINGS_LABELS['service'],
      'page'
    ]
    if (this.referralFeature) {
      this.linkTypes.push(this.PROMO_POPUP_SETTINGS_LABELS['refer_and_earn'])
    }
    this.popup.link.type = this.PROMO_POPUP_SETTINGS_LABELS['none'];
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    console.log('initializeSubscriptions pro')
    this.events.subscribe('promo-popup:savePopupSuccess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert(this.PROMO_POPUP_SETTINGS_LABELS['data_saved_msg'])
    });

    this.events.subscribe('promo-popup:publishPopupData', (data) => {
      // console.log('Popup Data', data)
      if (data) {
        this.popup = data;
        this.linkUrl = data.link.type == 'external' ? data.link.url : "";
        this.pdfUrl = data.link.type == 'pdf' ? data.link.url : "";
        this.currentType = "type" in data.link ? data.link.type : "";
        this.linkLength =  "ids" in data.link ? data.link.ids.length : this.linkLength;
      }
    });

    this.events.publish('promo-popup:getPopupData');
  }

  toggleActive() {
    this.popup.active = !this.popup.active;
  }

  removeImage() {
    this.popup.banner.url = '';
  }

  imgZoom(img: any) {
    this.modalController.create({
      component: ImageModalPage,
      cssClass: 'photo-modal-class',
      componentProps: {
        imgs: [{ url: img }],
        index: 0
      }
    }).then(modal => modal.present());
  }


  selectLinkType(i: number) {
    const type = this.linkTypes[i];
    this.popup.link.type = type;
    if (type === this.PROMO_POPUP_SETTINGS_LABELS['product']) {
      this.presentModal(this.popup.link.type);
    }
    else if (type === this.PROMO_POPUP_SETTINGS_LABELS['category']) {
      this.presentModal(this.popup.link.type);
    }
    else if (type === 'subcategory') {
      this.presentModal(this.popup.link.type);
    }
    else if (type === this.PROMO_POPUP_SETTINGS_LABELS['brand']) {
      this.presentModal(this.popup.link.type);
    }
    else if (type === this.PROMO_POPUP_SETTINGS_LABELS['service']) {
      this.presentModal(this.popup.link.type);
    }
    else if (type === this.PROMO_POPUP_SETTINGS_LABELS['search']) {
      this.searchTextAlert();
    }
    else if (type === 'page') {
      this.presentModal(this.popup.link.type);
    }
    else if (type === this.PROMO_POPUP_SETTINGS_LABELS['refer_and_earn']) {
      return null;
    }
    else {
      return null;
    }
    this.popup.link.ids = [];
    this.popup.link.name = '';
  }

  async presentModal(type: string) { 
  // console.log('modal linkType : ', type);
  // console.log('modal linkId : ', this.popup.link.ids);
  // console.log('modal currentType : ', this.popup.type);
  // console.log('modal status : ', this.statusType);

    if (type !== this.currentType) {
      this.popup.link.ids = [];
    }

    const modal = await this.modalController.create({
      component: BannerLinkingModalPage,
      cssClass: 'custom-modal',
      showBackdrop: true,
      backdropDismiss: false,
      componentProps: {
        linkType: type,
        linkId: this.popup.link.ids,
        currentType: this.popup.type,
        status: this.statusType
      }
    });
    modal.onDidDismiss()
      .then((res) => {
        if (res && res.data) {
          console.log('data from modal', res.data);
          this.popup.link.ids = res.data.id || [];
          if (res.data.id && res.data.id.length > 0) {
            this.popup.link.id = res.data.id[0]
          }
          else {
            this.popup.link.id = ''
          }
          this.popup.link.name = res.data.name;
          this.linkLength = this.popup.link.ids.length
          this.statusType = res.data.status || '';
          this.currentType = res.data.type || '';
          if (res.data.hasOwnProperty('isSubcategories')) {
            this.popup.link['isSubcategories'] = res.data.isSubcategories;
          }
          if (type == 'subcategory') {
            this.popup.link['categoryId'] = res.data.categoryId;
          }
          if (res.data.hasOwnProperty('serviceData')) {
            this.popup.link['serviceData'] = res.data.serviceData;
          }
        } else {
          this.defaultLinkType();
        }
      });

    await modal.present();

  }

  async searchTextAlert() {
    const alert = await this.alertController.create({
      subHeader: this.PROMO_POPUP_SETTINGS_LABELS['search_text'],
      inputs: [
        {
          name: 'searchTxt',
          type: 'text',
          placeholder: this.PROMO_POPUP_SETTINGS_LABELS['enter_search_text']
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
              this.presentToast(this.PROMO_POPUP_SETTINGS_LABELS['please_enter_valid_data']);
            }
            else {
              this.popup.link.name = data.searchTxt;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  defaultLinkType() {
    this.popup.link.ids = [];
    this.popup.link.name = '';
    this.popup.link.type = this.PROMO_POPUP_SETTINGS_LABELS['none'];
    delete this.popup.link.url
    this.linkUrl = '';
    this.linkLength = '';
  }

  async savePopup() {
    // console.log("this.popup",this.popup);
    if (!this.popup.banner) {
      this.popup.banner = { url: '' }
    }
    else if (this.popup.active && (this.popup.banner && !this.popup.banner.url)) {
      this.presentAlert(this.PROMO_POPUP_SETTINGS_LABELS['upload_banner_msg'])
    }
    else if (this.popup.link && this.popup.link.type == 'pdf' && !this.popup.link.url) {
      this.presentAlert('Please select a file to upload');
    }
    else if (this.popup.link && this.popup.link.type == 'external') {
      if (this.linkUrl != '' && this.isValidHttpUrl(this.linkUrl)) {
        this.popup.link.url = this.linkUrl;
        this.filterData();
        await this.presentLoading();
        console.log("promo-popup:savePopup");
        this.events.publish('promo-popup:savePopup', this.popup);
      }
      else {
        this.presentAlert('Please enter a valid link')
      }
    }
    else {
      this.filterData();
      await this.presentLoading();
      console.log("promo-popup:savePopup");
      this.events.publish('promo-popup:savePopup', this.popup);
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

  filterData() {
    if (this.popup.link.type !== this.PROMO_POPUP_SETTINGS_LABELS['category'] && this.popup.link.hasOwnProperty('isSubcategories')) {
      delete this.popup.link.isSubcategories;
    }
    if (this.popup.link.type !== this.PROMO_POPUP_SETTINGS_LABELS['service'] && this.popup.link.hasOwnProperty('serviceData')) {
      delete this.popup.link.serviceData;
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: this.SHARED_LABELS['please_wait'],
      duration: 10000,
    });
    await this.loading.present();
  }

  async uploadImage(files: FileList) {
    const modal = await this.modalController.create({
      component: ImageEditorComponent,
      componentProps: {
        aspectRatioWidthVal: 1,
        aspectRatioHeightVal: 1,
      },
      cssClass: 'custom-img-editor'
    })
    await modal.present();
    modal.onDidDismiss().then(res => {
      if (!this.popup.banner) {
        this.popup.banner = { url: '' }
      }
      this.popup.banner.url = res.data || '';
    })
    //console.log(type);
    // for (let i = 0; i < files.length; i++) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(files.item(i))
    //   reader.onload = (event:any) => { // called once readAsDataURL is completed
    //     let base64Image:any = event.target.result;
    // if (!this.popup.banner){
    //   this.popup.banner = {url: ''}
    // }
    // this.popup.banner.url = base64Image;
    // }
    // }
  }

  checkCurrentType(type: string) {
    return type === this.currentType;
  }

  selectStaticLink(type) {
    this.popup.link.ids = [];
    this.popup.link.name = '';
    if (type == 'contactUs') {
      this.popup.link.type = 'contactUs';
    }
    // else if (type == 'referEarn') {
    //   this.popup.link.type = 'referEarn';
    // }
    else if (type == 'feedback') {
      this.popup.link.type = 'feedback';
    }
    else if (type == 'offers') {
      this.popup.link.type = 'offers';
    }
    else if (type == 'membership') {
      this.popup.link.type = 'membership';
    }
    else if (type == 'external') {
      this.popup.link.type = 'external';
      this.popup.link.url = this.linkUrl;
    }
    else if (type == 'pdf') {
      this.popup.link.type = 'pdf';
    }
  }

  uploadPdf(file: any) {
    if (file[0]) {
      console.log(file[0])
      this.popup.link.url = file[0];
      this.newFile = true
    }
  }

  removeSubscriptions() {
    this.events.unsubscribe('promo-popup:publishPopupData');
    this.events.unsubscribe('promo-popup:savePopupSuccess');
  }

}

