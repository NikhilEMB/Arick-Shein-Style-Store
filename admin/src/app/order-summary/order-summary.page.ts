import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, AlertController, LoadingController, ActionSheetController, IonContent, NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import * as moment from 'moment';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
})
export class OrderSummaryPage implements OnInit {
  products: any = [];
  address: any;
  optionsforGallery: any;
  optionsforCamera: CameraOptions;
  showCommentBoxAndImage: boolean = false;
  loading: any;
  loader: any;
  listOfCommentImages: any[] = [];
  placeholderMsgInCommentBox: string;
  defaultDeliveryAmt: number = 0;
  freeDeliveryAmt: number = 0;
  minOrderAmount: number = 0;
  maxOrderAmount: number;
  productsPrice: any;
  totalAmountToPaid: number;
  showLoader: boolean = true;
  couponCode: string = '';
  couponDiscount: number = 0;
  @ViewChild(IonContent, {static: false}) content: IonContent;
  defaultGst: number = 0;
  couponApplied:boolean = false;
  couponId: string = '';
  timeSchedules: any = [];
  scheduledDates: any = [];
  isDeliverySchedule: boolean;
  selectedDate: any;
  selectedTime: any;
  gstAmount: number = 0;
  autoConfirmOrder: boolean;
  maxDaysOfDelivery: number;
  isOrderDeliverable: string;
  constructor(private events: Events,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private storage: Storage,
              private actionSheetController: ActionSheetController,
              private camera: Camera, 
              private imagePicker: ImagePicker,
              private navCtrl: NavController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.storage.get('productsInCart').then((products) => {
      //console.log('products in order summary', products);
      this.products = products;
      this.events.publish('delivery-settings:getDeliverySettingsData');
    });
    this.storage.get('userDefaultAddress').then((address) => {
      //console.log('default address in order summary', address);
      this.address = address;
    });
    this.storage.get('storeInfo').then((data) => {
      if(data.allowComment === true) {
        this.showCommentBoxAndImage = true;
      }
      this.placeholderMsgInCommentBox = data.commentMsg;
    });
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('user:orderSuccessfullyPlaced', () => {
      this.loading.dismiss();
      this.orderPlacedAlert();
    });
    this.events.subscribe('delivery-settings:publishDeliverySettingsData', (data) => {
      if(!this.isEmptyObj(data)) {
        if(data.freeDeliveryAmt !== '') {
          this.freeDeliveryAmt = parseInt(data.freeDeliveryAmt);
        }
        this.isDeliverySchedule = data.isDeliverySchedule;
        this.maxDaysOfDelivery = data.maxDaysOfDelivery;
        if(this.isDeliverySchedule) {
          if(data.deliveryDays.length > 0 && data.timeSchedules.length > 0) {
            this.getDeliveryDates(data.deliveryDays);
            this.timeSchedules = data.timeSchedules;
          }
          if(data.allowSameDayDelivery) {
            this.appendSameDateToDeliveryDates(data.lastDeliveryTime);
          }
        }
        this.events.publish('admin-settings:getPaymentInfoData');
      }
    });
    this.events.subscribe('admin-settings:publishPaymentInfoData', (data) => {
      if(!this.isEmptyObj(data)) {
        if(data.minOrderAmount !== '') {
          //console.log('in if...');
          this.minOrderAmount = parseInt(data.minOrderAmount);
        }
        if(data.maxOrderAmount !== '') {
          this.maxOrderAmount = parseInt(data.maxOrderAmount);
        }
        if(data.defaultGst !== '') {
          this.defaultGst = parseInt(data.defaultGst);
        }
        this.autoConfirmOrder = data.autoConfirmOrder;
        //console.log(this.minOrderAmount, this.maxOrderAmount);
        this.events.publish('delivery-settings:getPincodeDeliveryCost', this.address.pincode);
      }
    });
    this.events.subscribe('delivery-settings:publishDeliveryCost', (response) => {
      this.defaultDeliveryAmt = response.deliveryCost;
      this.isOrderDeliverable = response.status;
      this.getTotalPriceBeforeDelivery();
    });
    this.events.subscribe('coupon-codes:couponCodeNotApplied', (msg) => {
      this.loader.dismiss();
      this.presentAlert(msg);
    });
    this.events.subscribe('coupon-codes:couponCodeApplied', (response) => {
      this.getTotalPriceBeforeDelivery();
      let coupon = response.data;
      this.couponApplied = true;
      this.couponId = coupon.couponId;
      this.loader.dismiss();
      //console.log(response);
      if(coupon.type === 'flat') {
        this.couponDiscount = coupon.amount;
        if(this.totalAmountToPaid - this.couponDiscount < 0) {
          this.totalAmountToPaid = 0;
        } else {
          this.totalAmountToPaid -= this.couponDiscount;
        }
      } else {
        let applicableProducts = [];
        for (let index = 0; index < this.products.length; index++) {
          if(coupon.productsExempted.indexOf(this.products[index].productId) === -1) {
            applicableProducts.push(this.products[index]);
          }
        }
        let discount = 0;
        if(applicableProducts.length > 0) {
          for (let index = 0; index < applicableProducts.length; index++) {
            discount = Math.ceil(discount + ((applicableProducts[index].price * applicableProducts[index].quantity) * (coupon.amount / 100)));
          }
          if(discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
          this.couponDiscount = discount;
          this.totalAmountToPaid -= this.couponDiscount;
        } else {
          this.couponApplied = false;
          this.couponDiscount = 0;
          this.couponCode = '';
          this.presentAlert('This coupon code is not applicable on these products.');
        }
      }
    });
  }
  isEmptyObj(object) {
    for(var key in object) {
      if(object.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  
  getDeliveryDates(days) {
    this.scheduledDates = [];
    for(let index = 0; index < this.maxDaysOfDelivery; index++) { 
      let dayToCheck = moment().add(index+1, 'days');
      if(days.includes(dayToCheck.format('dddd'))){
        this.scheduledDates.push(dayToCheck.toDate());
      }
    }
  }

  appendSameDateToDeliveryDates(lastTime) {
    let now: any = moment().format('HH:mm');
    //console.log('now', now);
    let lastDeliveryTime: any = moment(lastTime, ["hh:mm A"]).format('HH:mm');
    //console.log('lastDeliveryTime', lastDeliveryTime);
    if(now < lastDeliveryTime) {
      this.scheduledDates.unshift(new Date());
    }
  }

  selectDate(e) {
    //console.log(e.target.value);
    this.selectedDate = e.target.value;
  }
  selectTime(e) {
    //console.log(e.target.value);
    this.selectedTime = e.target.value;
  }
  disableTime(time) {
    if(this.selectedDate) {
      if(this.selectedDate.getDate() !== new Date().getDate()) {
        return false;
      } else {
        let now: any = moment().format('HH:mm');
        let startTime = moment(time.start, ["hh:mm A"]).format('HH:mm');
        if(now > startTime) {
          return true;
         }
       }
    }
  }

  getTime(time) {
    return moment(time).format('hh:mm A')
  }

  getTotalPriceBeforeDelivery() {
    //console.log('in getTotalPriceBeforeDelivery');
    let price = 0;
    for (let index = 0; index < this.products.length; index++) {
      price += this.products[index].price * this.products[index].quantity;
    }
    this.productsPrice = price;
    this.getTotalPriceAfterDeliveryAndGst();
  }
  getTotalPriceAfterDeliveryAndGst() {
    if(this.productsPrice < this.freeDeliveryAmt) {
      this.totalAmountToPaid = this.productsPrice + this.defaultDeliveryAmt;
      this.gstAmount = Math.ceil(this.totalAmountToPaid * (this.defaultGst / 100));
      this.totalAmountToPaid = Math.ceil(this.totalAmountToPaid + this.gstAmount);
    } else {
      this.gstAmount = Math.ceil(this.productsPrice * (this.defaultGst / 100));
      //console.log('this.gstAmount', this.gstAmount);
      this.totalAmountToPaid = Math.ceil(this.productsPrice + this.gstAmount);
      //console.log('this.totalAmountToPaid', this.totalAmountToPaid);
    }
    this.showLoader = false;
  }
  async onClickPlaceOrder() {
    if(this.isOrderDeliverable === 'not_deliverable') {
      this.presentAlert('Order is not deliverable at your address.');
    } else if(this.productsPrice < this.minOrderAmount) {
      this.presentAlert('Minimum amount for placing order is Rs.' + this.minOrderAmount);
    } else if(this.maxOrderAmount && (this.productsPrice > this.maxOrderAmount)) {
      this.presentAlert('Maximum amount for placing order is Rs.' + this.maxOrderAmount);
    } else if(this.isDeliverySchedule && !(this.selectedDate && this.selectedTime)) {
      this.presentAlert('Please select delivery date and time.');
    }
     else {
       if(!this.autoConfirmOrder) {
        this.loading = await this.loadingController.create({
          message: 'Please Wait...',
          duration: 20000
        });
        await this.loading.present();
        //console.log('order to be placed...', this.products);
        if(this.productsPrice >= this.freeDeliveryAmt) {
          this.defaultDeliveryAmt = 0;
        } 
        const paymentData = {
          productsPrice: this.productsPrice,
          delivery: this.defaultDeliveryAmt,
          couponDiscount: this.couponDiscount,
          defaultGst: this.gstAmount,
          totalAmountToPaid: this.totalAmountToPaid,
          couponId: this.couponId,
          scheduledDate: this.selectedDate,
          scheduledTime: this.selectedTime
        }
        this.events.publish('user:placeOrder', this.products, this.listOfCommentImages, this.address, paymentData);
       } else {
        if(this.productsPrice >= this.freeDeliveryAmt) {
          this.defaultDeliveryAmt = 0;
        } 
        const paymentData = {
          productsPrice: this.productsPrice,
          delivery: this.defaultDeliveryAmt,
          couponDiscount: this.couponDiscount,
          defaultGst: this.gstAmount,
          totalAmountToPaid: this.totalAmountToPaid,
          couponId: this.couponId,
          scheduledDate: this.selectedDate,
          scheduledTime: this.selectedTime
        }
        this.events.publish('user:autoConfirmPlaceOrder', this.products, this.listOfCommentImages, this.address, paymentData);
       }
    }
  }
  onClickChangeOrAddAddress() {
    this.router.navigate(['select-address']);
  }
  async imageActionSheet(index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select any option',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.addCameraCommentImage(index);
        }
      }, {
        text: 'Gallery',
        icon: 'images',
        handler: () => {
          this.addGalleryCommentImages(index);
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
    await actionSheet.present();
  }
  addCameraCommentImage(index: number) {
    this.optionsforCamera = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation : true,
      allowEdit: true
    };
    //console.log('in addCameraCommentImage');
    this.camera.getPicture(this.optionsforCamera).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      const base64Str = base64Image.split(',');
      const size = this.calculateImageSize(base64Str[1]);
      //console.log('size of image', size);
      this.listOfCommentImages.push({
        productId: this.products[index].productId,
        url: base64Image,
        size: size
      });
      this.products[index].commentImgs.push({imgData: base64Image, size: size});
      //console.log('listOfCommentImages', this.listOfCommentImages);
     }, (err) => {
      //console.log(err);
    });
  }
  addGalleryCommentImages(index: number) {
    this.optionsforGallery = {
      quality: 50,
      outputType: 1
    };
    this.imagePicker.getPictures(this.optionsforGallery).then((results) => {
      if(results.length !== 0 && results !== 'OK') {
        for (let i = 0; i < results.length; i++) {
          const base64Str = 'data:image/jpeg;base64,' + results[i].split(',');
          const size = this.calculateImageSize(base64Str[1]);
          this.listOfCommentImages.push({
            productId: this.products[index].productId,
            url: 'data:image/jpeg;base64,' + results[i],
            size: size
          });
          this.products[index].commentImgs.push({imgData: 'data:image/jpeg;base64,' + results[i], size: size});
        }
        //console.log('listOfCommentImages', this.listOfCommentImages);
      }
    }, (err) => {
      alert(err);
    });
  }
  calculateImageSize(base64String: string) {
    let padding: number, inBytes: number, base64StringLength: number;
    if (base64String.endsWith('==')) { padding = 2;
    } else if (base64String.endsWith('=')) { padding = 1;
    } else { padding = 0; }
  
    base64StringLength = base64String.length;
    //console.log(base64StringLength);
    inBytes = (base64StringLength / 4 ) * 3 - padding;
    //console.log(inBytes);
    const kbytes = inBytes / 1000;
    return kbytes;
  }
  removeCommentImage(index, imgIndex, url) {
    this.products[index].commentImgs.splice(imgIndex, 1);
    for (let i = 0; i < this.listOfCommentImages.length; i++) {
      if(this.listOfCommentImages[i].url === url) {
        this.listOfCommentImages.splice(i, 1);
      }
    }
    //console.log('listOfCommentImages', this.listOfCommentImages);
  }
  
  getTotalItems() {
    return this.products.length;  
  }

  async applyCouponCode() {
    await this.presentLoading('Verifying coupon code...');
    const data = {
      code: this.couponCode,
      orderAmount: this.productsPrice
    }
    this.events.publish('coupon-codes:verifyCouponCode', data);
  }
  scrollToBottom() {
    this.content.scrollToBottom(500);
  }
  async orderPlacedAlert() {
    const alert = await this.alertController.create({
      header: "Your order has been placed",
      message: "We are reviewing your order. We will sent you payment link once your order is confirmed.",
      buttons: [{
        text: 'Ok',
        handler: () => {
          //console.log('Confirm Okay');
          this.navCtrl.navigateRoot(['user-order-history']);
        }
      }]
    }); 
    await alert.present();
  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  async presentLoading(msg: string) {
    this.loader = await this.loadingController.create({
      message: msg
    });
    await this.loader.present();
  }

  removeCouponCode() {
    this.getTotalPriceBeforeDelivery();
    this.couponApplied = false;
    this.couponDiscount = 0;
    this.couponCode = '';
  }

  textUppercase(couponCode) {
    this.couponCode = couponCode.toUpperCase();
    if(this.couponCode.includes(' ')) {
      this.couponCode = this.couponCode.replace(/\s/g,''); 
    }
  }
  
  removeSubscriptions() {
    this.events.unsubscribe('user:orderSuccessfullyPlaced');
    this.events.unsubscribe('delivery-settings:publishDeliverySettingsData');
    this.events.unsubscribe('admin-settings:publishPaymentInfoData');
    this.events.unsubscribe('coupon-codes:couponCodeNotApplied');
    this.events.unsubscribe('coupon-codes:couponCodeApplied');
    this.events.unsubscribe('delivery-settings:publishDeliveryCost');
  }
}
