import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, LoadingController, ToastController, IonRouterOutlet, IonContent, ActionSheetController, ModalController } from '@ionic/angular';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { GuideService } from 'src/app/guide.service'
import { ConfigService } from 'src/app/services/config/config.service';
import { Storage } from '@ionic/storage';
import { LabelService } from 'src/app/services/label/label.service';
import { ChatMsg } from 'src/app/models/message';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UserService } from 'src/app/services/user/user.service';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { ViewOrderPage } from './view-order/view-order.page';
import * as moment from 'moment';
import { UserGroupsService } from 'src/app/services/user-groups/user-groups.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { WhatsappDashboardService } from 'src/app/services/whatsapp-dashboard/whatsapp-dashboard.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {
  lastMsgs: any;
  showLoader = true;
  backButtonSubscription: any;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  showSearch: boolean = false;
  searchUser: string = '';
  searchUserPhone: string = '';
  noMoreMsgs: boolean = false;
  @ViewChild(IonRouterOutlet,{static:false}) routerOutlet: IonRouterOutlet;
  loadingTxt = '';
  ADMIN_HOME_LABELS: any = {};
  loadMoreEv: any;
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
  // showSearch;
  devWidth: any;
  devHeight: any;
  maxMessageWidth: any;
  showNoMsgs: boolean = false;
  showMsgLoader: boolean = false;
  // showLoader: boolean = true;
  imgGridWidth: any;
  @ViewChild(IonContent, {static: false}) content: IonContent;
  disableSendBtn: boolean = true;
  imgUrls: any[] = [];
  setFirstImage: boolean = false;
  adminMsgText: string = '';
  useThumb: boolean;
  unsavedImages: any= {};
  showFooter: boolean = false;
  balance: any;
  cashbackBalance = 0;
  transactions: any = [];
  currencyCode: any;
  orders: any = [];
  ordersLoader: boolean = true;
  previousIndex = 0
  registeredDate:any;
  lastActiveDate:any
  typingTimer;
  doneTypingInterval = 1000;
  phoneLimit = 0

  // groups
  groups;
  selectedGroups;

  // whatsapp
  sendToWhatsapp = false;
  whatsapp = false;
  phoneNo;
  insights;
  constructor(private events: Events, private router: Router,
              private toastController: ToastController, private chatService: ChatService
              ,private guideService: GuideService, private configService:ConfigService,private labelService: LabelService,
              private storage: Storage,private route: ActivatedRoute,
              private actionSheetController: ActionSheetController,
              private camera: Camera, private imagePicker: ImagePicker,
              private loadingController: LoadingController, 
              private userService: UserService,
              private userGroupsService: UserGroupsService, private modalController: ModalController,
              private sharedService: SharedService,
              private managerService: ManagerService,
              private whatsappService: WhatsappDashboardService) { }

  ngOnInit() {
    this.guideService.changeUrl("admin-home")
    this.guideService.checkClient(this.configService.environment.isBwiClient)
    this.currencyCode = this.configService.environment.currencyCode;
    this.phoneLimit = this.configService.environment.phoneLength;
    this.whatsapp = this.configService.environment.whatsapp;
  }
  ngOnDestroy() {
   
  }
  async ionViewWillEnter() {
    this.initializeSubscriptions();
    this.events.publish('chat:getLastMsgs', this.selectedGroups);
    this.ADMIN_HOME_LABELS = this.labelService.labels['ADMIN_HOME'];
    this.loadingTxt = this.ADMIN_HOME_LABELS['loading_more_messages'];
    if(this.loadMoreEv) {
      console.log('in ifff');
      this.noMoreMsgs = false;
      this.loadMoreEv.target.disabled = false;
    }
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
    let account:any = await this.whatsappService.getWhatsappCredentials();
    this.insights = account.insights || null;
  }
  ionViewDidEnter(){
    setTimeout(() => {
      this.onClickLastMsg(this.lastMsgs[0].id,this.previousIndex)
    }, 1000);
  }
  ionViewWillLeave() {
    this.showSearch = false;
    this.searchUser = '';
    this.searchUserPhone = '';
    this.chatService.makeadminActiveFalse(this.userid);
    this.removeSubscriptions();
  }
  async initializeSubscriptions() {
    const uid = await this.storage.get('uid');
    this.events.subscribe('chat:publishLastMsgs', async (msgs) => {
      const index = msgs.findIndex(msg => msg.id === uid);
      if (index !== -1) {
        msgs.splice(index, 1);
      }
      this.lastMsgs = msgs;
      this.showLoader = false;
    });
    this.events.subscribe('chat:publishMoreLastMsgs', async (msgs) => {
      const uid = await this.storage.get('uid');
      const index = msgs.findIndex(msg => msg.id === uid);
      if (index !== -1) {
        msgs.splice(index, 1);
      }
      this.lastMsgs = msgs;
      this.showLoader = false;
      var objDiv2 = document.getElementById("scroll1");
      if (objDiv2){
        objDiv2.scrollTop = objDiv2.scrollHeight;
      }
    });
    this.events.subscribe('chat:msgsForAdminHomeLimitReached', () => {
      console.log('in msgsForAdminHomeLimitReached');
      this.noMoreMsgs = true;
    });
    this.events.subscribe('chat:publishMsgs', async (msgs) => {
      this.allMsgs = msgs;
      console.log('msgs:', msgs);
      this.showMsgLoader = false;
      this.showLoader = false;
      await this.checkLastWhatsappMsg(this.userid);
      if(this.allMsgs) {
        this.makeImageUrls();
      }
      this.removeSavedImagesFromStorage();
      setTimeout(() => {
        this.enableScroll = true;
      }, 2000);
    });
    this.events.subscribe('chat:publishMoreMsgs', (msgs) => {
      this.allMsgs = msgs;
      this.chatLoader = false;
      this.makeImageUrls();
    });
    this.events.subscribe('chat:noMoreMsgs', () => {
      this.chatLoader = false;
      this.showNoMsgs = true;
    });
    this.events.subscribe('user:publishUserDetails', (user) => {
      this.userDetails = user;
      this.phoneNo = user.phoneNo;
      this.registeredDate = this.userDetails.createdAt
      this.lastActiveDate = this.userDetails.lastAccessAt
    });
    this.events.subscribe('media:chatImageSuccess', () => {
    });
    this.events.subscribe('media:showUnsavedImages', (msgId, imageResponse) => {
      this.unsavedImages[msgId] = imageResponse;
      this.storage.set('unsavedImages', this.unsavedImages);
    });
    this.events.subscribe('wallet:publishUserWalletDetails', (data) => {
      if (data) {
          this.balance = data.wallet ? data.wallet.balance : 0;
          this.cashbackBalance = data.wallet && data.wallet.cashback ? data.wallet.cashback : 0;
      }
    });
    this.events.subscribe('wallet:publishWalletTrans', (transactions) => {
      this.transactions = transactions && transactions.length ? transactions : [];
    });
    this.events.subscribe('user:publishAllOrdersOfUser', (orders) => {
      this.orders = orders && orders.length ? orders : [];
      this.ordersLoader = false;
    });
    this.events.subscribe('user:noOrderHistoryOfUser', () => {
        this.ordersLoader = false;
        this.orders = [];
    });
  }
  async onClickLastMsg(id,i) {
    this.events.publish('chat:removeGetMsgsSubscription');
    this.userid = id
    this.events.publish('user:getUserDetails', id);
    this.events.publish('chat:getMsgs', id, 'admin');
    this.events.publish('wallet:getWalletTrans', id);
    this.events.publish('wallet:getUserWalletDetails', id);
    this.events.publish('user:getAllOrdersOfUser', id);
    this.chatService.makeadminActiveTrue(id);
    this.lastMsgs[i].unreadMsgs = 0
    this.showFooter = true;
    setTimeout(() => {
      var objDiv = document.getElementById("scroll2");
      if (objDiv){
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    }, 1000);
    var prevMsgDiv = document.getElementById("message"+this.previousIndex);
    prevMsgDiv.style.background = 'white';
    var msgDiv = document.getElementById("message"+i);
    msgDiv.style.background = 'var( --ion-color-categories-background)'; 
    this.previousIndex = i
    await this.checkLastWhatsappMsg(id);
  }

  async checkLastWhatsappMsg(id){
    this.sendToWhatsapp = false;
    const lastWhatsappMsg:any = await this.chatService.getLastWhatsappMsg(id);
    console.log('lastWhatsappMsg:', lastWhatsappMsg);
    if (lastWhatsappMsg && this.whatsapp) {
      const lastWhatsappMsgTime = this.calculateTimeDiff(lastWhatsappMsg.createdAt.toDate())
      console.log('lastWhatsappMsgTime:',lastWhatsappMsgTime);
      if (lastWhatsappMsg && lastWhatsappMsgTime<24) {
        this.sendToWhatsapp = true;
      }
    }
  }
  goToBroadcastMsg() {
    this.router.navigate(['broadcast-msg']);
  }
  calculateHoursDiff(lastMessageAt) {
    const currentHours = new Date();
    let diffHours = (lastMessageAt.toDate().getTime() - currentHours.getTime()) / 1000;
    diffHours /= (60 * 60);
    return Math.abs(Math.round(diffHours));
  }
  clearSearchUser() {
    this.searchUser = null;
  }
  loadMoreMessagesForAdminHome(event) {
    this.loadMoreEv = event;
    console.log('loading more messages...');
    this.events.publish('chat:loadMoreMessagesForAdminHome', this.selectedGroups);
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
  removeSubscriptions() {
    this.events.unsubscribe('chat:publishLastMsgs');
    this.events.unsubscribe('chat:publishMoreLastMsgs');
    this.events.unsubscribe('chat:msgsForAdminHomeLimitReached');
    this.events.unsubscribe('chat:publishMsgs');
    this.events.unsubscribe('chat:publishMoreMsgs');
    this.events.unsubscribe('user:publishUserDetails');
    this.events.unsubscribe('media:chatImageSuccess');
    this.events.unsubscribe('media:showUnsavedImages');
    this.events.unsubscribe('chat:noMoreMsgs');
    this.events.publish('chat:removeGetMsgsSubscription');
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
    if (this.userDetails)
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
  async sendMessage() {
    if(this.adminMsgText !== '') {
    // this.content.scrollToBottom(0);
    this.enableScroll = false;
    this.showMsgLoader = true;
    if (this.whatsapp && this.sendToWhatsapp) {
      if (this.insights && this.insights.creditsUsed >= this.insights.chatLimit) {
        this.sharedService.presentAlert('You have reached your free limit for whatsapp, kindly upgrade your plan to use the services.');
        return;
      }
      const data = {
        type: 'msg',
        userId: this.userid,
        msg: {
          type: 'txt',
          createdAt: new Date(),
          isRead: null,
          author: 'admin',
          published: false,
          message: this.adminMsgText
        },
        phoneNo: this.phoneNo
      }
      this.allMsgs.push({msgData: data.msg});
      await this.chatService.sendMsgOnWhatsapp(data)
    } else {
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
    }
    this.adminMsgText = '';
    var objDiv = document.getElementById("scroll2");
    objDiv.scrollTop = objDiv.scrollHeight;
    // this.events.publish('chat:getMsgs', this.previousIndex, 'admin');
  }
}

uploadImage(files: FileList) {
  const imageResponse: any = [];
  for (let i = 0; i < files.length; i++) {
    if (files[i].size/1024/1024 > 5) { //Size of img is in bytes.
      this.sharedService.presentAlert('Image size cannot be greater than 5MB.');
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(files.item(i))
    reader.onload = async (event:any) => { // called once readAsDataURL is completed

      
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
        if (this.whatsapp && this.sendToWhatsapp) {
          if (this.insights && this.insights.creditsUsed >= this.insights.chatLimit) {
            this.sharedService.presentAlert('You have reached your free limit for whatsapp, kindly upgrade your plan to use the services.');
            return;
          } else{
            await this.chatService.sendImgOnWhatsapp(this.userid, this.msg, imageResponse, this.phoneNo)
          }
        } else{
          this.events.publish('media:addChatImage', this.userid, this.msg, imageResponse);
        }
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
    // this.content.scrollToBottom(0);
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
    this.modalController.create({
      component: ViewOrderPage,
      cssClass: 'view-order-css',
      componentProps: {
        orderId: orderId
      }
    }).then(modal => modal.present());
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

  onClickViewDetails(id) {
    this.modalController.create({
      component: ViewOrderPage,
      cssClass: 'view-order-css',
      componentProps: {
        orderId: id
      }
    }).then(modal => modal.present());
  }

  getDateTimeFormat(date){
    return moment(date).format('D MMM, YYYY hh:mm a');
  }

  clearPhone(){
    this.searchUserPhone = ''
    this.events.publish('chat:getLastMsgs', this.selectedGroups);
  }

  clearName(){
    this.searchUser = ''
    this.events.publish('chat:getLastMsgs', this.selectedGroups);
  }

  fireSearchQuery() {
    if (this.searchUserPhone != ''){
      this.events.publish('chat:searchUserByPhone', this.configService.environment.defaultCountryCode + this.searchUserPhone );
    }
    if (this.searchUser != ''){
      this.events.publish('chat:searchUser', this.searchUser);
    }
  }

  showAllMsgs(){
    this.searchUser = ''
    this.searchUserPhone = ''
    this.selectedGroups = [];
    this.events.publish('chat:getLastMsgs', this.selectedGroups);
  }

  async getGroupUsers(event){
    this.selectedGroups = await event.target.value;
    if (this.selectedGroups && this.selectedGroups.length >10) {
      this.sharedService.presentAlert('You can only select upto 10 Groups');
      this.selectedGroups = [];
      event.target.value = []
    } else {
      this.events.publish('chat:getLastMsgs', this.selectedGroups);
    }
  }
  
  calculateTimeDiff(date) {
    const PT:any = new Date(date);
    const CT:any = new Date();
    let hours = (CT - PT) / 36e5;
    console.log('hours', hours);
    return hours;
  } 
  
  async sendWATemplate(){
    await this.sharedService.presentLoading();
    const data = {
      type: 'template',
      userId: this.userid,
      phoneNo: this.phoneNo
    }
    const success:any = await this.chatService.sendMsgOnWhatsapp(data);
    if (this.sharedService.loading) {
      this.sharedService.loading.dismiss();
    }
    if (success) {
      this.sharedService.presentAlert('Template sent successfully');
    } else{
      this.sharedService.presentAlert('Something went wrong, Please try again later.');
    }
  }

  async openDoc(url){
    window.open(url, "_blank");
  }
  
  showErrMsg(){
    this.presentToast('Message failed to send because more than 24 hours have passed since the customer last replied to this number.')
  }
  
}