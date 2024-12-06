import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Events, IonContent, ActionSheetController, LoadingController, Platform, ModalController } from '@ionic/angular';
import { ChatMsg } from 'src/app/models/message';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UserService } from 'src/app/services/user/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { Storage } from '@ionic/storage';
//import { CallNumber } from '@ionic-native/call-number/ngx';
@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.page.html',
  styleUrls: ['./admin-chat.page.scss'],
})
export class AdminChatPage implements OnInit {
  userid: any;
  allMsgs: any[] = [];
  searchMsg: string;
  msg: ChatMsg = {
    type: null,
    message: null,
    createdAt: null,
    images: null,
    isRead: null,
    author: null,
    published: null,
    thumb: [],
    mob: [],
    imageCount: null
  };
  optionsforCamera: CameraOptions;
  optionsforGallery: any;
  imageResponse: any[];
  userDetails: any;
  loader: any;
  uid: string;
  chatLoader: boolean = false;
  enableScroll: boolean = true;
  showSearch;
  devWidth: any;
  devHeight: any;
  maxMessageWidth: any;
  showNoMsgs: boolean = false;
  showMsgLoader: boolean = false;
  showLoader: boolean = true;
  imgGridWidth: any;
  @ViewChild(IonContent, {static: false}) content: IonContent;
  @ViewChild('myInput', {static: false}) myInput: ElementRef;
  disableSendBtn: boolean = true;
  imgUrls: any[] = [];
  setFirstImage: boolean = false;
  adminMsgText: string = '';
  useThumb: boolean;
  unsavedImages: any= {};
  showFooter: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private events: Events,
              private actionSheetController: ActionSheetController,
              private camera: Camera, private imagePicker: ImagePicker,
              private loadingController: LoadingController, 
              private userService: UserService,private chatService: ChatService, private paltform: Platform,
              private keyboard: Keyboard, private modalController: ModalController, private storage: Storage,
              //private callNumber: CallNumber
              ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userid = this.router.getCurrentNavigation().extras.state.userId;
      }
      this.storage.get('unsavedImages').then((val) => {
        if(val) {
          this.unsavedImages = val;
          // //console.log('val of unsavedImages', this.unsavedImages);
        }
      })
    });
    window.addEventListener('keyboardWillShow', () => {
      // //console.log("Keyboard will Show");
      setTimeout(() => {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom(0);
        }
    }, 0);
    });
  }
  ngOnInit() {
    setTimeout(() => {
    
          this.content.scrollToBottom(0);
     
  }, 2000);
  }
  ionViewWillEnter() {
    var objDiv = document.getElementById("scrollDown");
    objDiv.scrollTop = objDiv.scrollHeight;
    this.initializeSubscriptions();
    this.devWidth = this.paltform.width();
    this.devHeight = this.paltform.height();
    // //console.log('devWidth', this.devWidth);
    // //console.log('devHeight', this.devHeight);
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
    setTimeout(() => {
      this.showFooter = true;
    }, 500);

  }
  async ionViewDidEnter() {
    this.events.publish('user:getUserDetails', this.userid);
    this.events.publish('chat:getMsgs', this.userid, 'admin');
    this.chatService.makeadminActiveTrue(this.userid);
  }
  ionViewWillLeave() {
    this.chatService.makeadminActiveFalse(this.userid);
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('chat:publishMsgs', (msgs) => {
      // //console.log('publish user msgs', msgs);
      this.allMsgs = msgs;
      this.adminMsgText = '';
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
      //   this.scrollToFirstMessage('chatMessage' + 0);
      // }
      this.allMsgs = msgs;
      // //console.log('more msgs', this.allMsgs);
      this.chatLoader = false;
      this.scrollToFirstMessage('chatMessage' + 1);
      this.makeImageUrls();
    });
    this.events.subscribe('chat:noMoreMsgs', () => {
      this.chatLoader = false;
      this.showNoMsgs = true;
    });
    this.events.subscribe('user:publishUserDetails', (user) => {
      this.userDetails = user;
    });
    this.events.subscribe('media:chatImageSuccess', () => {
      // this.loader.dismiss();
    });
    this.events.subscribe('media:showUnsavedImages', (msgId, imageResponse) => {
      this.unsavedImages[msgId] = imageResponse;
      this.storage.set('unsavedImages', this.unsavedImages);
      // //console.log('unsavedImages', this.unsavedImages);
    });
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
  scrollToBottomOnInit() {
    // //console.log('in scrollToBottomOnInit...');
    setTimeout(() => {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom(0);
        }
    }, 1000);
  }
  getNameWithPhoneNo() {
    return this.userDetails.name !== 'user' ? this.userDetails.name : `${this.userDetails.name} ${this.userDetails.phoneNo ? `(${this.userDetails.phoneNo})` : ''}`
  }
  logScrolling($event) {
    if ($event.detail.scrollTop === 0 && !this.searchMsg) {
      this.chatLoader = true;
      this.showNoMsgs = false;
      this.events.publish('chat:getMoreMsgs', this.userid);
    }
    }
    scrollToFirstMessage(elementId: string) {
      let y = document.getElementById(elementId).offsetTop;
      // //console.log('y position', y);
      this.content.scrollToPoint(0, y);
    }
    makeImageUrls() {
      // //console.log('in makeImageUrls');
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
    }
    preventFocusChange(e) {
      e.preventDefault();
  }
    resize() {
      this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }
  sendMessage() {
    if(this.adminMsgText !== '') {
    this.content.scrollToBottom(0);
    this.myInput.nativeElement.style.height = 40 + 'px';
    this.enableScroll = false;
    this.showMsgLoader = true;
    const msg = {
      type: 'txt',
      createdAt: new Date(),
      isRead: null,
      author: 'admin',
      published: false,
      message: this.adminMsgText
    }
    this.allMsgs.push({msgData: msg});
    this.events.publish('chat:sendMsg', msg, this.userid);
    this.adminMsgText = '';
  }
}

uploadImage(files: FileList) {
  const imageResponse: any = [];
  for (let i = 0; i < files.length; i++) {
    let reader = new FileReader();
    reader.readAsDataURL(files.item(i))
    reader.onload = (event:any) => { // called once readAsDataURL is completed

      
      let base64Image:any = event.target.result;
      let base64Str = base64Image.split(',');
      let size = this.calculateImageSize(base64Str[1]);
      imageResponse.push({url: base64Image, size: size});
        // //console.log('size of image', size);
        this.msg.type = 'image';
        this.msg.createdAt = new Date();
        this.msg.isRead = null;
        this.msg.author = 'admin';
        this.msg.published = false;
        this.allMsgs.push(this.msg);
        this.events.publish('media:addChatImage', this.userid, this.msg, imageResponse);
    }
  }
}

  async imageActionSheet() {
    if(this.adminMsgText === '')
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
          // //console.log('Cancel clicked');
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
    const imageResponse: any = [];
    this.camera.getPicture(this.optionsforCamera).then((imageData) => {
      if(imageData.length !== 0) {
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        const base64Str = base64Image.split(',');
        const size = this.calculateImageSize(base64Str[1]);
        imageResponse.push({url: base64Image, size: size});
        // //console.log('size of image', size);
        this.msg.type = 'image';
        this.msg.createdAt = new Date();
        this.msg.isRead = null;
        this.msg.author = 'admin';
        this.msg.published = false;
        this.allMsgs.push(this.msg);
        this.events.publish('media:addChatImage', this.userid, this.msg, imageResponse);
      }
     }, (err) => {
      // //console.log(err);
    });
  }
  addGalleryImages() {
    this.optionsforGallery = {
      quality: 50,
      outputType: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.optionsforGallery).then((results) => {
      if(results.length !== 0 && results !== 'OK') {
        for (let i = 0; i < results.length; i++) {
          const base64Image = 'data:image/jpeg;base64,' + results[i];
          const base64Str = base64Image.split(',');
          const imgSize = this.calculateImageSize(base64Str[1]);
          this.imageResponse.push({url: 'data:image/jpeg;base64,' + results[i], size: imgSize});
        }
        this.msg.type = 'image';
        this.msg.createdAt = new Date();
        this.msg.isRead = null;
        this.msg.author = 'admin';
        this.msg.published = false;
        this.allMsgs.push(this.msg);
        this.events.publish('media:addChatImage', this.userid, this.msg, this.imageResponse);
      }
    }, (err) => {
      // //console.log(err);
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

  hideSearchMessage() {
    this.searchMsg = null;
    this.content.scrollToBottom(0);
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
  changeInMsgInput() {
    this.disableSendBtn = false;
  }
  isDate(date) {
    return date instanceof Date;
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
  onClickViewOrder(orderId) {
    const navigationExtras : NavigationExtras = {
      state: {
        orderId: orderId
      }
    }
    this.router.navigate(['order-details'], navigationExtras)
  }
  async presentLoading() {
    this.loader = await this.loadingController.create({
      message: 'Please Wait...',
    });
    await this.loader.present();
  }

  callUser() {
   /* this.callNumber.callNumber(this.userDetails.phoneNo, true)
    .then(res =>  console.log('Launched dialer!', res))
    .catch(err =>  console.log('Error launching dialer', err));*/
  }

  onClickTrackOrder(agentId, deliveryLatLng) {
    const navigationExtras: NavigationExtras = {
      state: {
        agentId: agentId,
        deliveryLatLng: deliveryLatLng
      }
    }
    this.router.navigate(['location-map'], navigationExtras);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Orders',
        icon: 'cube',
        handler: () => {
          this.openUserDetails(0);
        }
      }, {
        text: 'Addresses',
        icon: 'locate',
        handler: () => {
          this.openUserDetails(1);
        }
      }, {
        text: 'Wallet',
        icon: 'wallet',
        handler: () => {
          this.openUserDetails(2);
        }
      }, {
        text: 'Settings',
        icon: 'settings',
        handler: () => {
          this.openUserDetails(3);
        }
      },{
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

  openUserDetails(index: number) {
    this.userDetails['defaultDeliveryAgentId'] = this.userDetails.hasOwnProperty('defaultDeliveryAgentId') ? this.userDetails.defaultDeliveryAgentId : '';
    const navigationExtras: NavigationExtras = {
      state: {
        uid: this.userid,
        udata: this.userDetails,
        activeTabIndex: index
      }
    };
    this.router.navigate(['admin-allusers-details'], navigationExtras);
  }

  messageModifications(msg) {
    msg = msg.trim();
    const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    const text1 = msg.replace(exp, '<a href=\'$1\'>$1</a>');
    const exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    const finalText = text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
    return finalText;
  }


  removeSubscriptions() {
    this.events.unsubscribe('chat:publishMsgs');
    this.events.unsubscribe('chat:publishMoreMsgs');
    this.events.unsubscribe('user:publishUserDetails');
    this.events.unsubscribe('media:chatImageSuccess');
    this.events.unsubscribe('media:showUnsavedImages');
    this.events.unsubscribe('chat:noMoreMsgs');
    this.events.publish('chat:removeGetMsgsSubscription');
  }
}
