import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events, ActionSheetController, LoadingController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ChatMsg } from 'src/app/models/message';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { LabelService } from 'src/app/services/label/label.service';
import { BannerLinkingModalPage } from '../../admin-banners/banner-linking-modal/banner-linking-modal.page';
import { ConfigService } from 'src/app/services/config/config.service';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { UserGroupsService } from 'src/app/services/user-groups/user-groups.service';
import { ManagerService } from 'src/app/services/manager/manager.service';

@Component({
  selector: 'app-broadcast-msg',
  templateUrl: './broadcast-msg.page.html',
  styleUrls: ['./broadcast-msg.page.scss'],
})
export class BroadcastMsgPage implements OnInit {
  msg = {
    type: null,
    title: '',
    message: null,
    createdAt: null,
    images: [],
    isRead: null,
    author: null,
    published: null,
    mob: null,
    thumb: null,
    imageCount: null,
    groups: []
  };
  optionsforCamera: CameraOptions;
  optionsforGallery: any;
  imageResponse: any[] = [];
  loader: any;
  accessDenied = false;
  msgBroadcasted = false;

  // Notification Linking
  linkTypes = [];
  bannerData: any = {};
  BANNER_SETTINGS_LABELS: any;
  SHARED_LABELS: any;
  allMessages: any

  broadcastHrs: any;

  // groups
  groups;

  constructor(private router: Router, private events: Events,
    private actionSheetController: ActionSheetController,
    private camera: Camera, private imagePicker: ImagePicker,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalController: ModalController,
    private toastController: ToastController,
    private labelService: LabelService,
    private configService: ConfigService,
    private userGroupsService: UserGroupsService,
    private managerService: ManagerService,
    private storage: Storage) { }

  ngOnInit() {
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
    if (!data) {
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
      if (!data.hasOwnProperty('active')) {
        data['active'] = true;
      }
      if (!data.hasOwnProperty('link')) {
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
    this.events.publish('media:getAllBroadcastMessages')
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  async initializeSubscriptions() {
    this.events.subscribe('media:broadcastMessageSuccess', () => {
      this.loader.dismiss();
      this.msg.title = '';
      this.msg.message = '';
      this.imageResponse = [];
      this.msgBroadcasted = true;
      this.presentAlert('Success', 'Message successfully broadcasted to all the active users.');
    });
    this.events.subscribe('media:broadcastMessageFailure', () => {
      this.loader.dismiss();
      this.msg.message = '';
      this.imageResponse = [];
      this.presentAlert('Failure', 'There is some problem in sending message.');
    });
    this.events.subscribe('media:PermissionToBroadcastSuccess', (doc) => {
      let todaysDay = new Date().getTime();
      let lastDate = doc.createdAt.toDate().getTime();
      console.log(todaysDay, " ", lastDate);
      let hours = (todaysDay - lastDate) / 36e5;
      console.log('hours:', hours);
      let hoursLimit = this.configService.environment.broadcastLimit ? this.configService.environment.broadcastLimit : 24;
      this.broadcastHrs = hoursLimit;
      console.log('hoursLimit:', hoursLimit);
      if (hours < hoursLimit) {
        this.accessDenied = true;
        this.presentAlert('Limit Reached', `Please Wait for ${(hoursLimit - hours).toFixed(1)} hours to send a broadcast message again`);
      }
    });
    this.events.subscribe('media:PermissionToBroadcastFailure', (err) => {
      this.presentAlert(err, '');
    });
    this.events.subscribe('media:publishAllBroadcastMessages', (data) => {
      if (data) {
        this.allMessages = data
      }
    });
    this.events.publish('media:PermissionToBroadcast');
    
    let groups: any = await this.userGroupsService.getAllGroups();
    const userRole = await this.storage.get('userRole');
    if(userRole == 'manager'){
      const uid = await this.storage.get('uid');
      const managerDetails: any = await this.managerService.getManagerData(uid, 'service');
      if (managerDetails && managerDetails.groups && managerDetails.groups.length) {
        this.groups = await groups.filter(group => managerDetails.groups.includes(group.id));
      } else {
        this.groups = [];
      }
    } else{
          this.groups = groups;
    }
  }

  uploadImage(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event: any) => { // called once readAsDataURL is completed


        let base64Image: any = event.target.result;
        let base64Str = base64Image.split(',');
        let size = this.calculateImageSize(base64Str[1]);
        this.imageResponse = [{ url: base64Image, imgSize: size }];
      }
    }
  }

  async imageActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select any option',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.addCameraImage();
        }
      }, {
        text: 'Gallery',
        icon: 'images',
        handler: () => {
          this.addGalleryImages();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // // //console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  addCameraImage() {
    this.optionsforCamera = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true
    };
    // // //console.log('in addChatImage');
    this.camera.getPicture(this.optionsforCamera).then((imageData) => {
      if (imageData.length !== 0) {
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        const base64Str = base64Image.split(',');
        const imgSize = this.calculateImageSize(base64Str[1]);
        // // //console.log('size of image', imgSize);
        this.imageResponse.push({ url: base64Image, size: imgSize });
      }
    }, (err) => {
      // // //console.log(err);
    });
  }
  addGalleryImages() {
    this.optionsforGallery = {
      quality: 50,
      outputType: 1
    };
    this.imagePicker.getPictures(this.optionsforGallery).then((results) => {
      if (results.length !== 0 && results !== 'OK') {
        for (let i = 0; i < results.length; i++) {
          const base64Image = 'data:image/jpeg;base64,' + results[i];
          const base64Str = base64Image.split(',');
          const imgSize = this.calculateImageSize(base64Str[1]);
          this.imageResponse.push({ url: 'data:image/jpeg;base64,' + results[i], size: imgSize });
        }
      }
    }, (err) => {
      alert(err);
    });
  }
  calculateImageSize(base64String: string) {
    let padding: number, inBytes: number, base64StringLength: number;
    if (base64String.endsWith('==')) {
      padding = 2;
    } else if (base64String.endsWith('=')) {
      padding = 1;
    } else { padding = 0; }

    base64StringLength = base64String.length;
    // // //console.log(base64StringLength);
    inBytes = (base64StringLength / 4) * 3 - padding;
    // // //console.log(inBytes);
    const kbytes = inBytes / 1000;
    return kbytes;
  }
  removeImage(index: number) {
    this.imageResponse.splice(index, 1);
  }

  async sendMessage() {
    if (this.msg.groups && this.msg.groups.length>10) {
      this.presentAlert('Only 10 groups can be selected.', ''); // Max limit for group-users searching is 10 on backend
      return;
    }
    if (this.msg.title === '') {
      this.presentAlert('Please enter notification title', '');
      return;
    }
    this.msg.type = 'broadcast';
    this.msg.createdAt = new Date();
    this.msg.isRead = false;
    this.msg.author = 'admin';
    if ((this.msg.message === null || this.msg.message === '') && this.imageResponse.length === 0) {
      this.presentAlert('Please enter a message', '');
    } else {
      this.loader = await this.loadingController.create({
        message: 'Please Wait...',
      });
      await this.loader.present();
      this.msg['bannerData'] = this.bannerData;
      console.log('msg:', this.msg);
      this.events.publish('media:broadcastMessage', this.imageResponse, this.msg);
    }
  }
  imageZoom(message) {
    let imageZoomUrls: any = [];
    imageZoomUrls.push({ url: message.images[0].url });
    let imgIndex = 0;
    this.modalController.create({
      component: ImageModalPage,
      cssClass: 'photo-modal-class',
      componentProps: {
        imgs: imageZoomUrls,
        index: imgIndex
      }
    }).then(modal => modal.present());
  }
  async presentAlert(heading: any, desc: any) {
    const alert = await this.alertController.create({
      header: heading,
      message: desc,
      backdropDismiss: false,
      buttons: [{
        text: 'OK',
        handler: () => {
          if (this.accessDenied || this.msgBroadcasted) {
            this.router.navigate(['admin-home']);
          }
        }
      }]
    });
    await alert.present();
  }

  removeSubscriptions() {
    this.events.unsubscribe('media:broadcastMessageSuccess');
    this.events.unsubscribe('media:broadcastMessageFailure');
    this.events.unsubscribe('media:PermissionToBroadcastSuccess');
    this.events.unsubscribe('media:PermissionToBroadcastFailure');
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  defaultLinkType() {
    this.bannerData.link.ids = '';
    this.bannerData.link.name = '';
    this.bannerData.link.type = this.BANNER_SETTINGS_LABELS['none'];
  }

  async presentModal(type: string) {
    const modal = await this.modalController.create({
      component: BannerLinkingModalPage,
      cssClass: 'custom-modal',
      showBackdrop: true,
      componentProps: { linkType: type, linkId: this.bannerData.link.ids, currentType: this.bannerData.type }
    });
    modal.onDidDismiss()
      .then((res) => {
        console.log('data from modal', res);
        if (res.data) {
          this.bannerData.link.ids = res.data.id;
          if (res.data.id.length > 0) {
            this.bannerData.link.id = res.data.id[0]
          }
          else {
            this.bannerData.link.id = ''
          }
          if (res.data.name) {
            this.bannerData.link.name = res.data.name;
          }
          if (res.data.hasOwnProperty('isSubcategories')) {
            this.bannerData.link['isSubcategories'] = res.data.isSubcategories;
          }
          if (type == 'subcategory') {
            this.bannerData.link['categoryId'] = res.data.categoryId;
          }
          if (res.data.hasOwnProperty('serviceData')) {
            this.bannerData.link['serviceData'] = res.data.serviceData;
          }
        }
        else {
          this.defaultLinkType()
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
            if (!data.searchTxt) {
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

  selectLinkType(i: number) {
    const type = this.linkTypes[i];
    this.bannerData.link.type = type;
    if (type === this.BANNER_SETTINGS_LABELS['product']) {
      this.presentModal(this.bannerData.link.type);
    } else if (type === this.BANNER_SETTINGS_LABELS['category']) {
      this.presentModal(this.bannerData.link.type);
    } else if (type === 'subcategory') {
      this.presentModal(this.bannerData.link.type);
    } else if (type === this.BANNER_SETTINGS_LABELS['brand']) {
      this.presentModal(this.bannerData.link.type);
    } else if (type === this.BANNER_SETTINGS_LABELS['service']) {
      this.presentModal(this.bannerData.link.type);
    } else if (type === this.BANNER_SETTINGS_LABELS['search']) {
      this.searchTextAlert();
    } else if (type === this.BANNER_SETTINGS_LABELS['refer_and_earn']) {
      return null;
    } else {
      return null;
    }
    this.bannerData.link.ids = '';
    this.bannerData.link.name = '';
  }

  getDateTimeFormat(date) {
    return moment(date).format('D MMM, YYYY hh:mm a');
  }

  sendMessageAgain(message) {
    this.imageResponse = []
    this.msg.title = message.title
    this.msg.message = message.message
    if (message.images && message.images.length > 0 && message.images[0].url) {
      this.imageResponse = [{ url: message.images[0].url }]
    }
    this.presentAlert('', 'All message content copied in broadcast sender. Please make changes and send')
  }

}
