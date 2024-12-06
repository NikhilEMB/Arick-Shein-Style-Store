import { Component, OnInit } from '@angular/core';
import { Events, AlertController, LoadingController, ActionSheetController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { StatesModalPage } from 'src/app/states-modal/states-modal.page';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/services/config/config.service';
import { AdminSettingsService } from 'src/app/services/admin-settings/admin-settings.service';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.page.html',
  styleUrls: ['./admin-settings.page.scss'],
})
export class AdminSettingsPage implements OnInit {
  storeName: string = '';
  storePhone: string = '';
  storeEmail: string = '';
  welcomeMsg: string = '';
  allowComment: boolean = true;
  commentMsg: string = '';
  showLoader: boolean = true;
  storeInfo: string = '';
  allowStoreInfo: boolean = true;
  loading: any;
  ckeConfig: any;
  storeAddress: any = {
    address: '',
    city: '',
    state: '',
    stateCode: '',
    lat: null,
    lng: null,
    pincode: null
  }
  signature: string = '';
  states: any = [];
  optionsforCamera: CameraOptions;
  storeLogo: string = '';
  defaultCountryCode: string;
  playstoreUrl: string = '';
  appStoreUrl: string = '';
  facebookUrl: string = '';
  twitterUrl: string = '';
  pinterestUrl: string = '';
  gmailUrl: string = '';
  linkedinUrl: string = '';
  instagramUrl: string = '';
  youtubeUrl: string = '';
  whatsappNumber: number = 0;
  shopInactive: boolean = false;
  inactiveMsg: string = '';
  externalContact = {
    name: '',
    link: ''
  }
  offerMsg = '';
  notificationMessage: string = '';
  allowImageUpload = {
    isActive: false,
    name: '',
    isMandatory: false,
  };
  loginPopup = {
    name: true,
    email: true,
    dob: true,
    gst: false,
    custom: {
      active: false,
      name: '',
    }
  };

  splashScreen = {
    active: false,
    bgColor: '',
    logo: '',
    timeout: '',
  }

  customOrder = {
    active: false,
    name: ''
  }
  customMessage = '';
  taxType: any = ''
  cancelTimeForUser = ''

  currencyCode: string;
  gstFirmName: any;
  extraCharges: any = 0;
  extraChargeType = 'flat';
  char: string = this.configService.environment.currencyCode;
  toggleState: any = 'flt';
  maxCharge: any = 0;
  chargeName: any = '';
  isCustomInvoiceNo = false;
  verifyDeliveryOtp = true;
  doPaymentInCod = true;
  deliveryAcceptanceModel = {
    active: false,
    radius: 0,
  }
  isUserGstAvailable: boolean = true;

  notificationSettings = {
    outOfStockProducts: null
  }

  constructor(private events: Events,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private modalController: ModalController,
    private configService: ConfigService,
    private settingService: AdminSettingsService) { }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: true,
      height: 200
    }
    this.initializeSubscriptions();
    this.currencyCode = this.configService.environment.currencyCode;
    this.events.publish('admin-settings:getSettingsData');
    this.events.publish('admin-settings:getInvoiceData');
    this.events.publish('admin-settings:getAppData');
    this.events.publish('admin-settings:getStatesData');
    this.defaultCountryCode = this.configService.environment.defaultCountryCode;
    this.taxType = this.configService.environment.taxType;
  }
  ngOnDestroy() {
    this.removeSubscriptions();
  }
  async initializeSubscriptions() {
    this.events.subscribe('admin-settings:saveSettingsDataSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Data saved successfully!');
    });
    this.events.subscribe('admin-settings:publishStatesData', (states) => {
      this.states = states;
    });
    this.events.subscribe('admin-settings:publishSettingsData', (data) => {
      console.log('publishSettingsData', data);
      this.showLoader = false;
      if (data) {
        this.storeName = data.storeName ? data.storeName : '';
        this.storeEmail = data.storeEmail ? data.storeEmail : '';
        this.storePhone = data.storePhone.slice(3) ? data.storePhone.slice(3) : '';
        this.welcomeMsg = data.welcomeMsg ? data.welcomeMsg : '';
        this.allowComment = 'allowComment' in data ? data.allowComment : true;
        this.commentMsg = data.commentMsg ? data.commentMsg : '';
        this.allowStoreInfo = data.allowStoreInfo ? data.allowStoreInfo : true;
        this.allowImageUpload = data.allowImageUpload ? data.allowImageUpload : this.allowImageUpload;
        this.storeInfo = data.storeInfo ? data.storeInfo : '';
        this.storeAddress = data.storeAddress ? data.storeAddress : this.storeAddress;
        this.facebookUrl = data.facebookUrl ? data.facebookUrl : '';
        this.twitterUrl = data.twitterUrl ? data.twitterUrl : '';
        this.pinterestUrl = data.pinterestUrl ? data.pinterestUrl : '';
        this.gmailUrl = data.gmailUrl ? data.gmailUrl : '';
        this.linkedinUrl = data.linkedinUrl ? data.linkedinUrl : '';
        this.instagramUrl = data.instagramUrl ? data.instagramUrl : '';
        this.youtubeUrl = data.youtubeUrl ? data.youtubeUrl : '';
        this.whatsappNumber = data.whatsappNumber ? data.whatsappNumber : 0;
        this.shopInactive = typeof data.shopInactive !== undefined ? data.shopInactive : false;
        this.inactiveMsg = data.inactiveMsg ? data.inactiveMsg : '';
        this.offerMsg = data.offerMsg ? data.offerMsg : '';
        this.externalContact = data.hasOwnProperty('externalContact') ? data.externalContact : this.externalContact;
        this.notificationMessage = data.notificationMessage ? data.notificationMessage : '';
        this.loginPopup = data.loginPopup ? data.loginPopup : this.loginPopup;
        this.splashScreen = data.splashScreen ? data.splashScreen : this.splashScreen;
        this.customMessage = data.customMessage ? data.customMessage : '';
        this.customOrder = data.custom ? data.custom : this.customOrder;
        this.cancelTimeForUser = data.cancelTimeForUser ? data.cancelTimeForUser : ''
        this.extraCharges = data.extraCharge ? (data.extraCharge.charge ? data.extraCharge.charge : 0) : 0;
        this.extraChargeType = data.extraCharge ? (data.extraCharge.type ? data.extraCharge.type : 'flat') : 'flat';
        this.maxCharge = data.extraCharge ? (data.extraCharge.maxCharge ? data.extraCharge.maxCharge : 0) : 0;
        this.chargeName = data.extraCharge ? (data.extraCharge.chargeName ? data.extraCharge.chargeName : '') : '';
        this.verifyDeliveryOtp = 'verifyDeliveryOtp' in data ? data.verifyDeliveryOtp : this.verifyDeliveryOtp;
        console.log('data:', data);
        this.doPaymentInCod = 'doPaymentInCod' in data ? data.doPaymentInCod : this.doPaymentInCod;
        this.deliveryAcceptanceModel = 'deliveryAcceptanceModel' in data ? data.deliveryAcceptanceModel : this.deliveryAcceptanceModel;

        // toggle state & char
        if (data.extraCharge && data.extraCharge.type == 'percentage') {
          this.toggleState = 'perc';
          this.char = '%';
        }
      }
    });
    this.events.subscribe('admin-settings:publishInvoiceData', (data) => {
      console.log('publishInvoiceData', data);
      if (data) {
        this.signature = data.signature ? data.signature : '';
        this.storeLogo = data.shopLogo ? data.shopLogo : '';
        this.customMessage = data.customMessage ? data.customMessage : '';
        this.gstFirmName = data.gstFirmName ? data.gstFirmName : '';
        this.isCustomInvoiceNo = 'isCustomInvoiceNo' in data ? data.isCustomInvoiceNo : false;
        this.isUserGstAvailable = 'isUserGstAvailable' in data ? data.isUserGstAvailable : true;
      }
    });
    this.events.subscribe('admin-settings:publishAppData', (data) => {
      console.log('publishInvoiceData', data);
      if (data) {
        this.appStoreUrl = data.appStoreUrl ? data.appStoreUrl : '';
        this.playstoreUrl = data.playstoreUrl ? data.playstoreUrl : '';
      }
    });
    const notificationSettingsData = await this.settingService.getNotificationData();
    if (notificationSettingsData) {
      this.notificationSettings = notificationSettingsData
    }
  }

  allowCommentToggleChange() {
    if (this.allowComment) {
      this.allowComment = false;
    } else {
      this.allowComment = true;
    }
  }
  allowStoreInfoToggleChange() {
    if (this.allowStoreInfo) {
      this.allowStoreInfo = false;
    } else {
      this.allowStoreInfo = true;
    }
  }
  shopInactiveToggle() {
    this.shopInactive = !this.shopInactive;
  }
  async onClickSaveSettings() {
    if (this.allowImageUpload.isActive && this.allowImageUpload.name === '') {
      this.presentAlert('Please fill Name under which image to be uploaded');
    }
    else if(this.splashScreen.active && (!this.splashScreen.bgColor || !this.splashScreen.logo)){
      this.presentAlert('Please upload Splash logo and background color');
    }
     else {
      await this.presentLoading();
      const settingsData = {
        storeName: this.storeName,
        storeEmail: this.storeEmail,
        storePhone: this.configService.environment.defaultCountryCode + this.storePhone,
        welcomeMsg: this.welcomeMsg,
        allowComment: this.allowComment,
        allowImageUpload: this.allowImageUpload,
        commentMsg: this.commentMsg,
        storeInfo: this.storeInfo,
        allowStoreInfo: this.allowStoreInfo,
        storeAddress: this.storeAddress,
        facebookUrl: this.facebookUrl,
        twitterUrl: this.twitterUrl,
        pinterestUrl: this.pinterestUrl,
        gmailUrl: this.gmailUrl,
        linkedinUrl: this.linkedinUrl,
        instagramUrl: this.instagramUrl,
        youtubeUrl: this.youtubeUrl,
        whatsappNumber: this.whatsappNumber,
        shopInactive: this.shopInactive,
        inactiveMsg: this.inactiveMsg,
        externalContact: this.externalContact,
        offerMsg: this.offerMsg,
        notificationMessage: this.notificationMessage,
        loginPopup: this.loginPopup,
        splashScreen: this.splashScreen,
        custom: this.customOrder,
        cancelTimeForUser: this.cancelTimeForUser,
        extraCharge: {
          type: this.extraChargeType || 'flat',
          charge: this.extraCharges || 0,
          maxCharge: this.maxCharge || 0,
          chargeName: this.chargeName || ''
        },
        verifyDeliveryOtp: this.verifyDeliveryOtp,
        doPaymentInCod: this.doPaymentInCod,
        deliveryAcceptanceModel: this.deliveryAcceptanceModel
      };
      const invoiceData = {
        signature: this.signature,
        shopLogo: this.storeLogo,
        customMessage: this.customMessage,
        gstFirmName: this.gstFirmName,
        isCustomInvoiceNo: this.isCustomInvoiceNo,
        isUserGstAvailable: this.isUserGstAvailable
      };
      const appData = {
        appStoreUrl: this.appStoreUrl,
        playstoreUrl: this.playstoreUrl
      };
      this.events.publish('admin-settings:saveSettingsData', settingsData, invoiceData, appData, this.notificationSettings);
      console.log('log data :', settingsData);
    }
  }

  async openStateModal() {
    const modal = await this.modalController.create({
      component: StatesModalPage,
    });
    modal.onDidDismiss()
      .then((res) => {
        console.log('data from modal', res);
        if (res.data) {
          console.log(res.data);
          this.storeAddress.state = res.data.state;
          this.storeAddress.stateCode = res.data.code;

        }
      });
    await modal.present();

  }

  async openImageActionSheet(imgType: string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select any option',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.uploadImg('camera', imgType);
        }
      }, {
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          this.uploadImg('gallery', imgType);
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

  uploadImg(cameraType: string, imgType: string) {
    const options: CameraOptions = {
      quality: 25,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true
    };
    if (cameraType === 'gallery') {
      options['sourceType'] = 0;
    }
    this.camera.getPicture(options).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      if (imgType === 'sign') {
        this.signature = base64Image;
      } else {
        this.storeLogo = base64Image;
      }
    }, (err) => {
      console.log(err);
    });
  }

  uploadImage(files: FileList, imgType) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        let base64Image: any = event.target.result;
        if (imgType === 'sign') {
          this.signature = base64Image;
        } else if(imgType === 'logo') {
          this.storeLogo = base64Image;
        }else{
          this.splashScreen.logo = base64Image;
        }
      }
    }
  }

  removeImg(imgType: string) {
    if (imgType === 'sign') {
      this.signature = '';
    } else if(imgType === 'logo') {
      this.storeLogo = '';
    }else{
      this.splashScreen.logo = ''
    }
  }

  imgZoom(img: any) {
    this.modalController.create({
      component: ImageModalPage,
      cssClass:'photo-modal-class',
      componentProps: {
        imgs: img,
        index: 0
      }
    }).then(modal => modal.present());
  }



  async presentAlert(desc: any) {
    const alert = await this.alertController.create({
      message: desc,
      buttons: ['Ok']
    });
    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
    });
    await this.loading.present();
  }

  async enterEstimatedTime() {
    let arr = []
    if (this.cancelTimeForUser.length > 0) {
      arr = this.cancelTimeForUser.split(':');
    }
    let mins = arr.length > 0 ? arr[0] : '00';
    let secs = arr.length > 0 ? arr[1] : '00';
    const alert = await this.alertController.create({
      subHeader: 'Order Cancel Time',
      inputs: [
        {
          name: 'mins',
          type: 'number',
          placeholder: 'Mins',
          value: parseInt(mins) == 0 ? null : mins
        },
        {
          name: 'secs',
          type: 'number',
          placeholder: 'Secs',
          value: parseInt(secs) == 0 ? null : secs
        }
      ],
      buttons: [{
        text: 'cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
        }
      }, {
        text: 'Add',
        handler: (plan) => {
          this.cancelTimeForUser = `${plan.mins ? plan.mins : '00'}:${plan.secs ? plan.secs : '00'}`;
        }
      }]
    });
    await alert.present();
  }

  async removeLimit() {
    let removeResult = await this.settingService.removeTimeLimit()
    if (removeResult) {
      this.presentAlert('Time Limit Removed!')
    }
    this.cancelTimeForUser = ''
    this.loading.dismiss()
  }

  removeSubscriptions() {
    this.events.unsubscribe('admin-settings:saveSettingsDataSuccess');
    this.events.unsubscribe('admin-settings:publishSettingsData');
    this.events.unsubscribe('admin-settings:publishStatesData');
    this.events.unsubscribe('admin-settings:publishInvoiceData');
    this.events.unsubscribe('admin-settings:publishAppData');
  }

  extraChargesType(event: any) {
    this.extraChargeType = event.target.checked ? 'percentage' : 'flat';
    console.log('Type :', this.extraChargeType);
    console.log('Charge :', this.extraCharges);
    console.log('Max Charge :', this.maxCharge);
    console.log('Charge Name:', this.chargeName);
    if (event.target.checked) {
      this.char = '%';
      this.toggleState = 'perc';
    } else {
      this.char = this.currencyCode;
      this.toggleState = 'flt';
    }
    console.log('char :', this.char)
  }

  allowCustomInvoiceNo(){
    this.isCustomInvoiceNo = !this.isCustomInvoiceNo;
  }

  verifyOtpToggle(){
    this.verifyDeliveryOtp = !this.verifyDeliveryOtp;
  }

  doPaymentInCodToggle(){
    this.doPaymentInCod = !this.doPaymentInCod;
  }

  deliveryAcceptanceToggle(){
    this.deliveryAcceptanceModel.active = !this.deliveryAcceptanceModel.active
  }

  // ? Use this function for toggle checkbox start
  toggleCheckbox(type: string) {
    if (type == "userGst") {
      this.isUserGstAvailable = !this.isUserGstAvailable;
    }
  }
  // ? Use this function for toggle checkbox end

}
