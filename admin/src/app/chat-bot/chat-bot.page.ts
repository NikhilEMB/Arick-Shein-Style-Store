import { Component, OnInit, ViewChild, ElementRef, Input, NgZone } from '@angular/core';
import { Events, IonContent, ActionSheetController, LoadingController, ModalController, AlertController, Platform, IonRouterOutlet, ToastController } from '@ionic/angular';
import { ChatMsg } from '../models/message';
import { UserService } from '../services/user/user.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Storage } from '@ionic/storage';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
//import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.page.html',
  styleUrls: ['./chat-bot.page.scss'],
})
export class ChatBotPage implements OnInit {
  chatMsg: string;
  userMsgTxt: string = '';
  msg: ChatMsg = {
    type: null,
    message: null,
    createdAt: null,
    images: null,
    isRead: null,
    author: null,
    published: null,
    mob: null,
    thumb: null,
    imageCount: null
  };
  allMsgs: any[] = [];
  adminMsgs: any;
  searchMsg: string;
  optionsforCamera: CameraOptions;
  optionsforGallery: any;
  @ViewChild(IonContent, {static: false}) content: IonContent;
  uid: string;
  userData: any;
  loading: any;
  loader: any;
  chatLoader: boolean = false;
  enableScroll: boolean = true;
  devWidth: any;
  devHeight: any;
  maxMessageWidth: any;
  showNoMsgs: boolean = false;
  showMsgLoader: boolean = false;
  showLoader: boolean = true;
  backButtonSubscription: any;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  imgUrls: any[] = [];
  useToolbar: boolean = true;
  @ViewChild(IonRouterOutlet,{static:false}) routerOutlet: IonRouterOutlet;
  @ViewChild('myInput', {static: false}) myInput: ElementRef;
  disableSendBtn: boolean = true;
  imgGridWidth: number;
  newOrderStatus: boolean;
  showSearch: boolean = false;
  setFirstImage: boolean = false;
  unsavedImages: any= {};
  useThumb: boolean;
  showFooter: boolean = false;
  constructor(private events: Events, private userService: UserService, private actionSheetController: ActionSheetController,
              private camera: Camera, private imagePicker: ImagePicker, private loadingController: LoadingController,
              private router: Router, public modalController: ModalController, private ngZone: NgZone,
              private alertController: AlertController, private platform: Platform, private chatService: ChatService,
              private toastController: ToastController, private keyboard: Keyboard, private route: ActivatedRoute, private storage: Storage,
              //private callNumber: CallNumber
              ) { 
                window.addEventListener('keyboardWillShow', () => {
                  //console.log("Keyboard will Show");
                  setTimeout(() => {
                    this.ngZone.run(() => {
                    if (this.content.scrollToBottom) {
                        this.content.scrollToBottom(0);
                    }
                  });
                }, 0);
                });
                this.storage.get('unsavedImages').then((val) => {
                  if(val) {
                    this.unsavedImages = val;
                    //console.log('val of unsavedImages', this.unsavedImages);
                  }
                });
              }

  ionViewWillEnter() {
    if(this.platform.is('android')) {
      this.useToolbar = false;
    }
    this.devWidth = this.platform.width();
    this.devHeight = this.platform.height();
    //console.log('devWidth', this.devWidth);
    //console.log('devHeight', this.devHeight);
    if(this.devWidth <= 500) {
      this.useThumb = true;
    } else if(this.devWidth > 500){
      this.useThumb = false;
    }
    if(this.devWidth < 700) {
      this.maxMessageWidth = this.devWidth - 70;
    } else if(this.devWidth >=700 && this.devWidth <= 1000) {
      this.maxMessageWidth = this.devWidth - 90;
    } else {
      this.maxMessageWidth = this.devWidth - 100;
    }
    if(this.devWidth < 600) {
      this.imgGridWidth = this.devWidth - 106;
    } else if(this.devWidth >=600 && this.devWidth <= 700) {
      this.imgGridWidth = this.devWidth - 124;
    } else if(this.devWidth >=700 && this.devWidth <= 1000) {
      this.imgGridWidth = this.devWidth - 168;
    } else{
      this.imgGridWidth = this.devWidth - 224;
    }
  }
  preventFocusChange(e) {
    e.preventDefault();
}
  async ionViewDidEnter() {
    this.chatService.makeUserActiveTrue(this.uid);
    setTimeout(() => {
      this.showFooter = true;
    }, 500);
  }
  ionViewWillLeave() {
    this.events.publish('chat:removeGetMsgsSubscription');
    this.chatService.makeUserActiveFalse(this.uid);
  }
  ngOnInit() {

    //console.log('in ngOnInit');
    this.storage.get('uid').then((val) => {
      //console.log('user id in chat-bot', val);
      this.uid = val;
      this.events.publish('chat:getMsgs', this.uid, 'user');
      this.events.publish('user:getUserDetails', this.uid);
    });
    this.initializeSubscriptions();
    
  }
  ngOnDestroy() {
    //console.log('in ngOnDestroyed');
    this.removeSubscriptions();
  }
  scrollToBottomOnInit() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
          this.content.scrollToBottom(0);
      }
  }, 500);
}

logScrolling($event) {
if ($event.detail.scrollTop === 0 && !this.searchMsg) {
  //console.log('in scroll top zero', $event.detail.scrollTop);
  this.chatLoader = true;
  this.showNoMsgs = false;
  this.events.publish('chat:getMoreMsgs', this.uid);
}
}
scrollToFirstMessage(elementId: string) {
  let y = document.getElementById(elementId).offsetTop;
  //console.log('y position', y);
  this.content.scrollToPoint(0, y);
}

  initializeSubscriptions() {
    this.events.subscribe('chat:publishMsgs', (msgs) => {
      this.allMsgs = msgs;
      // if(this.newOrderStatus === true) {
      //   this.loader.dismiss();
      // }
      //console.log('publish user msgs', msgs);
      this.showMsgLoader = false;
      this.showLoader = false;
      this.scrollToBottomOnInit();
      if(this.allMsgs) {
        this.makeImageUrls();
      }
      this.removeSavedImagesFromStorage();
      setTimeout(() => {
        this.enableScroll = true;
      }, 2000);
    });
    this.events.subscribe('chat:publishMoreMsgs', (msgs) => {
      // for (const msg of msgs) {
      //   this.chatLoader = false;
      //   this.allMsgs.unshift(msg.payload.doc.data());
      // }
      this.allMsgs = msgs;
      //console.log('more msgs', this.allMsgs);
        this.chatLoader = false;
      this.scrollToFirstMessage('chatMessage' + 1);
        this.makeImageUrls();
    });
    this.events.subscribe('chat:noMoreMsgs', () => {
      this.chatLoader = false;
      this.showNoMsgs = true;
    });
    this.events.subscribe('user:publishUserDetails', (user) => {
      this.userData = user;
    });
    this.events.subscribe('media:chatImageSuccess', () => {
      // this.loader.dismiss();
    });
    this.events.subscribe('user:cancelOrderSuccess', () => {
      this.loader.dismiss();
    });
    this.events.subscribe('media:showUnsavedImages', (msgId, imageResponse) => {
      this.unsavedImages[msgId] = imageResponse;
      this.storage.set('unsavedImages', this.unsavedImages);
      //console.log('unsavedImages', this.unsavedImages);
    });
    this.events.subscribe('user:deleteProductSuccesss', () => {
      this.presentAlert('Product Deleted Successfully!');
      this.loading.dismiss();
    })
  }
  removeSavedImagesFromStorage() {
    let arrayOfUnsavedImagesIds:any = [];
    arrayOfUnsavedImagesIds = Object.keys(this.unsavedImages);
    for(let i=0; i<this.allMsgs.length; i++) {
        for(let j=0; j<arrayOfUnsavedImagesIds.length; j++) {
          if(this.allMsgs[i].id === arrayOfUnsavedImagesIds[j] && this.allMsgs[i].msgData.published === true) {
            this.unsavedImages[arrayOfUnsavedImagesIds[j]] = null;
            this.storage.set('unsavedImages', this.unsavedImages);
          } 
        }
      }
  }
  makeImageUrls() {
    //console.log('in makeImageUrls');
    if(this.allMsgs.length) {
      for(let i=0; i<this.allMsgs.length; i++) {
        if(this.allMsgs[i].msgData.images && (this.allMsgs[i].msgData.type === "image" || this.allMsgs[i].msgData.type === "broadcast")) {
          for(let y=0; y<this.allMsgs[i].msgData.images.length; y++) {
            this.imgUrls.push(this.allMsgs[i].msgData.images[y])
          }
        }
        else if(this.allMsgs[i].msgData.type === "order" && this.allMsgs[i].msgData.img) {
          this.imgUrls.push(this.allMsgs[i].msgData.img);
        }
        else{
          continue;
        }
      }
    }
    //console.log('imgUrls', this.imgUrls);
  }
  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
}

  sendMessage() {
    if(this.userMsgTxt.length !== 0) {
      this.content.scrollToBottom(0);
      this.myInput.nativeElement.style.height = 40 + 'px';
      this.enableScroll = false;
      this.showMsgLoader = true;
      const msg = {
        type: 'txt',
        createdAt: new Date(),
        isRead: false,
        author: 'user',
        published: false,
        message: this.userMsgTxt
      }
      this.allMsgs.push({msgData: msg});
      this.events.publish('chat:sendMsg', msg, this.uid);
      this.userMsgTxt = ''
    }
  }

  async imageActionSheet() {
    if(this.userMsgTxt === '')
    {this.enableScroll = false;
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
          //console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();}
  }
  addCameraImage() {
    this.optionsforCamera = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation : true,
      allowEdit: true
    };
    //console.log('in addChatImage');
    const imageResponse: any = [];
    this.camera.getPicture(this.optionsforCamera).then((imageData) => {
      if(imageData.length !== 0) {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      const base64Str = base64Image.split(',');
      const size = this.calculateImageSize(base64Str[1]);
      imageResponse.push({url: base64Image, size: size});
      //console.log('size of image', size);
      this.msg.type = 'image';
      this.msg.createdAt = new Date();
      this.msg.isRead = false;
      this.msg.author = 'user';
      this.msg.published = false;
      this.allMsgs.push(this.msg);
      //console.log('url in camera', imageResponse);
      this.events.publish('media:addChatImage', this.uid, this.msg, imageResponse);
      }
     }, (err) => {
      //console.log(err);
    });
  }
  addGalleryImages() {
    this.optionsforGallery = {
      quality: 50,
      outputType: 1
    };
    const imageResponse: any = [];
    this.imagePicker.getPictures(this.optionsforGallery).then((results) => {
      if(results.length !== 0 && results !== 'OK') {
      for (let i = 0; i < results.length; i++) {
        const base64Image = 'data:image/jpeg;base64,' + results[i];
        const base64Str = base64Image.split(',');
        const imgSize = this.calculateImageSize(base64Str[1]);
        imageResponse.push({url: 'data:image/jpeg;base64,' + results[i], size: imgSize});
      }
      this.msg.type = 'image';
      this.msg.createdAt = new Date();
      this.msg.isRead = false;
      this.msg.author = 'user';
      this.msg.published = false;
      this.allMsgs.push(this.msg);
      //console.log('allMsgs in gallery', this.allMsgs);
      this.events.publish('media:addChatImage', this.uid, this.msg, imageResponse);
    }
    }, (err) => {
      //console.log(err);
    });
  }
  calculateImageSize(base64String: string) {
    let padding: number, inBytes: number, base64StringLength: number;
    if (base64String.endsWith('==')) { padding = 2;
    } else if (base64String.endsWith('=')) { padding = 1;
    } else { padding = 0; }

    base64StringLength = base64String.length;
    inBytes = (base64StringLength / 4 ) * 3 - padding;
    const kbytes = inBytes / 1000;
    return kbytes;
  }
  imageZoom(img: any) {
    //console.log("img", img);
    let imgIndex = this.imgUrls.indexOf(img);
    this.modalController.create({
      component: ImageModalPage,
      cssClass:'photo-modal-class',
      componentProps: {
        imgs: this.imgUrls,
        index: imgIndex
      }
    }).then(modal => modal.present());
  }
  
  gridImageZoom(imgs) {
    this.modalController.create({
      component: ImageModalPage,
      cssClass:'photo-modal-class',
      componentProps: {
        imgs: imgs,
        index: 0
      }
    }).then(modal => modal.present());
  }
  singleImageZoom(img: any) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        imgs: [{url: img}],
        index: 0
      }
    }).then(modal => modal.present());
  }
  calcTotalAmount(products: any) {
    let totalAmount = 0;
    for(let i=0; i<products.length; i++) {
      totalAmount += products[i].price;
    }
    return totalAmount;
  }
  showDeleteProduct(msgTime) {
    // let lastOrderCheckTime = moment().subtract(environment.multipleOrdersTimeLimit,'minutes');
    // if(moment(msgTime.toDate()).isSameOrAfter(lastOrderCheckTime)) {
    //   return true;
    // } else{
    //    return false;
    // }
  }
  
  isDate(date) {
    return date instanceof Date;
  }
  async cancelOrder(orderId: string){
    this.loader = await this.loadingController.create({
      message: 'Please Wait...',
    });
    await this.loader.present();
    this.events.publish('user:cancelOrder', orderId);
  }
  async cancelOrderConfirm(orderId: string) {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to cancel this order?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'dark',
          handler: (blah) => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            //console.log('Confirm Okay');
            this.cancelOrder(orderId);
          }
        }
      ]
    });

    await alert.present();
  }
  calculateMsgTime(time) {
    let hours = '0';
    let minutes = '0';
    if(time.toDate().getHours().toString().length > 1) {
      hours = time.toDate().getHours();
    } else {
      hours = '0' + time.toDate().getHours();
    }
    if(time.toDate().getMinutes().toString().length > 1) {
      minutes = time.toDate().getMinutes();
    } else {
      minutes = '0' + time.toDate().getMinutes();
    }
    return hours + ':' + minutes; 
  }
  clearSearchMsg() {
    this.searchMsg = null;
    this.content.scrollToBottom(0);
  }
  

  goToProfile() {
    this.router.navigate(['profile']);
  }
  onClickSearchBtn() {
    //console.log('in onClickSearchBtn');
    this.showSearch = !this.showSearch;
  }
  onClickViewOrder(orderId) {
    const navigationExtras : NavigationExtras = {
      state: {
        orderId: orderId
      }
    }
    this.router.navigate(['user-order-details'], navigationExtras)
  }
  onClickDoPayment(orderId) {
    const navigationExtras: NavigationExtras = {
      state: {
        orderId: orderId,
        userId: this.uid
      }
    }
    this.router.navigate(['order-payment'], navigationExtras)
  }
  async onClickDeleteProduct(orderId: string, msgId: string,productId: string){
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 10000
    });
    await this.loading.present();
    this.events.publish('user:deletePrdouctFromChatAndOrders', orderId, msgId, productId);
  }
  async onClickDeleteProductConfirm(orderId: string, msgId: string,productId: string) {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'dark',
          handler: (blah) => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            //console.log('Confirm Okay');
            this.onClickDeleteProduct(orderId, msgId,productId);
          }
        }
      ]
    });

    await alert.present();
  }


  async presentLoading() {
    this.loader = await this.loadingController.create({
      message: 'Please Wait...',
    });
    await this.loader.present();
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      color: 'medium',
      message: msg,
      duration: 2000,
      showCloseButton: true,
      cssClass: 'toast',
      animated: true
    });
    toast.present();
  }
  async presentAlert(desc: any) {
    const alert = await this.alertController.create({
      message: desc,
      buttons: ['Ok']
    });
    await alert.present();
  }
  callAdmin() {
   /* this.storage.get('storeInfo').then((data) => {
      this.callNumber.callNumber(data.storePhone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    })*/
  }
  onClickTrackOrder(agentId, deliveryLatLng) {
    const navigationExtras: NavigationExtras = {
      state: {
        agentId: agentId,
        routeFromUserSide: true,
        deliveryLatLng: deliveryLatLng
      }
    }
    this.router.navigate(['location-map'], navigationExtras);
  }
  removeSubscriptions() {
    this.events.unsubscribe('chat:publishMsgs');
    this.events.unsubscribe('chat:publishMoreMsgs');
    this.events.unsubscribe('user:publishUserDetails');
    this.events.unsubscribe('media:chatImageSuccess');
    this.events.unsubscribe('media:showUnsavedImages');
    this.events.unsubscribe('user:cancelOrderSuccess');
    this.events.unsubscribe('user:deleteProductSuccesss');
    this.events.unsubscribe('chat:noMoreMsgs');

  }
}
