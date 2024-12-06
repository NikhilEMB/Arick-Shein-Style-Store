import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, Events, AlertController, LoadingController, ActionSheetController, NavController, Platform, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
//import { CallNumber } from '@ionic-native/call-number/ngx';
import { ConfigService } from 'src/app/services/config/config.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ResaleOrderPage } from 'src/app/admin/resale-order/resale-order.page';
import { EditOrderPage } from '../edit-order/edit-order.page';
import { CancelledReasonPage } from '../cancelled-reason/cancelled-reason.page';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  orderData: any = [];
  loading: any;
  orderId: any;
  showLoader: boolean = true;
  @ViewChild(IonContent, {static: false}) content: IonContent;
  noDeliveryAgents: boolean = false;
  allDeliveryAgents: any = [];
  pdfObj = null;
  message = '';
  currencyCode: any;
  dateSchedule:any=''
  vendorData=[]
  deliveryAgentName:string
  // pageType: any = '';
  constructor(private events: Events,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private inAppBrowser: InAppBrowser,
              //private callNumber: CallNumber,
              private configService: ConfigService,
              private orderService: OrderService,
              private sharedService: SharedService,
              private modalController: ModalController
              ) {
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.orderId = this.router.getCurrentNavigation().extras.state.orderId;
                    // this.pageType = this.router.getCurrentNavigation().extras.state.pageType;
                    //console.log('orderId', this.orderId);
                  }
                });
               }

  ngOnInit() {
  }
  getStarColor(rating) {
    return this.sharedService.getStarColor(rating);
  }
  getDateTimeFormat(date){
    return moment(date).format('MMM D, YYYY hh:mm a');
  }
  ionViewWillEnter() {
    this.events.publish('user:getOrderDetailsWithOrderId', this.orderId);
    this.events.publish('user:getAllDeliveryAgents');
    this.initializeSubscriptions();
    this.currencyCode = this.configService.environment.currencyCode;
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('user:publishOrderDetailsWithOrderId', (orderData) => {
      console.log('orderData', orderData);
      if(!orderData[0].hasOwnProperty('unavailable')) {
        orderData[0]['unavailable'] = {}
      }
      if(orderData[0].payment.mode === 'cash' && !('amount' in orderData[0].payment.details)) {
        orderData[0].payment.details['amount'] = orderData[0].totalAmountToPaid - (orderData[0].walletAmount + orderData[0].cashbackAmount);
      }
      this.orderData = orderData;
      this.showLoader = false;
      if (orderData[0].scheduledDate){
        this.dateSchedule = orderData[0].scheduledDate.toDate()
      }
      if (orderData[0].vendorId){
        this.events.publish('vendor:getVendorName',orderData[0].vendorId)
      }
      if (orderData[0].deliveryAgentId){
        this.events.publish('delivery:getDeliveryAgentName',orderData[0].deliveryAgentId)
      }
    });
    this.events.subscribe('user:rejectedOrderSuccessfully', () => {
      this.loading.dismiss();
      this.presentAlert('Order has been rejected successfully', true);
    });
    this.events.subscribe('user:confirmedOrderSuccessfully', () => {
      this.loading.dismiss();
      this.presentAlert('Order has been confirmed successfully', true);
    });
    this.events.subscribe('user:cancelledOrderSuccessfully', () => {
      this.loading.dismiss();
      this.presentAlert('Order has been cancelled successfully', true);
    });
    this.events.subscribe('user:dispatchedOrderSuccessfully', () => {
      this.loading.dismiss();
      this.presentAlert('Order has been dispatched successfully', true);
    });
    this.events.subscribe('user:deliveredOrderSuccessfully', () => {
      this.loading.dismiss();
      this.presentAlert('Order has been delivered successfully', true);
    });
    this.events.subscribe('user:returnedOrderSuccessfully', () => {
      this.loading.dismiss();
      this.presentAlert('Order has been returned successfully', true);
    });
    this.events.subscribe('order:sendPaymentRequestSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Payment request has been send successfully');
    });
    this.events.subscribe('order:updatePaymentCompleteSuccess', () => {
      this.loading.dismiss();
      this.ionViewWillEnter();
      this.sharedService.presentAlert('Payment status changed to completed successfully');
    });
    this.events.subscribe('user:noDeliveryAgents', () => {
      this.noDeliveryAgents = true;
    });
    this.events.subscribe('user:publishAllDeliveryAgents', (agents) => {
      this.allDeliveryAgents = agents;
      this.noDeliveryAgents = false;
      //console.log(this.allDeliveryAgents);
    });
    this.events.subscribe('user:assignDeliveryAgentSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Delivery Agent has been assigned successfully!');
    });
    this.events.subscribe('vendor:getVendorNameSuccess', (data) => {
      this.vendorData = data
    });
    this.events.subscribe('delivery:getDeliveryAgentNameSuccess', (data) => {
      console.log(data)
      if (data){
        if (data.name){
          this.deliveryAgentName = data.name
        }
      }
    });
  }
  getTotalItems() {
    return this.orderData[0].products.length;  
  }
  
  async onClickConfirmOrder() {
    const alert = await this.alertController.create({
      message: "Are you sure you want to confirm this order?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            //console.log('Confirm Yes');
            this.confirmOrder();
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmOrder(){
    await this.presentLoading();
    this.events.publish('user:confirmOrderByAdmin', this.orderData[0], this.orderId);
  }

  async onClickDispatchOrder() {
    const alert = await this.alertController.create({
      message: "Are you sure you want to dispatch this order?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            //console.log('Confirm Yes');
            this.dispatchOrder();
          }
        }
      ]
    });
    await alert.present();
  }

  async dispatchOrder() {
    await this.presentLoading();
    this.events.publish('user:dispatchOrderByAdmin', this.orderId, this.message);
  }

  async onClickDeliverOrder() {
    const alert = await this.alertController.create({
      message: "Are you sure you want to change status to delivered?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            //console.log('Confirm Yes');
            this.deliverOrder();
          }
        }
      ]
    });
    await alert.present();
  }

  async deliverOrder(){
    await this.presentLoading();
    this.events.publish('user:deliverOrderByAdmin', this.orderId);
  }

  async onClickReturnOrder() {
    const alert = await this.alertController.create({
      message: "Are you sure you want to return this order?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            //console.log('Confirm Yes');
            this.returnOrder();
          }
        }
      ]
    });
    await alert.present();
  }

  async returnOrder(){
    await this.presentLoading();
    this.events.publish('user:returnOrderByAdmin', this.orderId);
  }

  removeProduct(i) {
    this.orderData[0].products.splice(i, 1);
  }
  covertTextToUrl(text: string) {
    const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    const text1 = text.replace(exp, '<a target="_blank" href=\'$1\'>$1</a>');
    const exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    const finalText = text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
    return finalText;
  }
  async onClickRejectOrder() {
    const alert = await this.alertController.create({
      message: "Are you sure you want to reject this order?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            //console.log('Confirm Yes');
            this.rejectOrder();
          }
        }
      ]
    });
    await alert.present();
  }

  async rejectOrder() {
    await this.presentLoading();
    this.events.publish('user:rejectOrderByAdmin', this.orderId);
  }

  async onClickCancelOrder() {
    const alert = await this.alertController.create({
      message: "Are you sure you want to cancel this order?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            //console.log('Confirm Yes');
            this.getCancelReason();
          }
        }
      ]
    });
    await alert.present();
  }

  async cancelOrder(cancelReason: string) {
    await this.presentLoading();
    this.events.publish('user:cancelOrderByAdmin', this.orderId, cancelReason);
  }

  async getCancelReason() {
    const modal = await this.modalController.create({
    component: CancelledReasonPage
    });

    modal.onDidDismiss().then(res => {
      if(res && res.data) {
        this.cancelOrder(res.data);
      }
    });
  
    await modal.present();
  }

  isCancelReasonAvailable() {
    return 'cancelData' in this.orderData[0] && this.orderData[0].cancelData.reason;
  }

  async removeProductAlert(i) {
    const alert = await this.alertController.create({
      message: "Are you sure you want to remove this order?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            //console.log('Confirm Yes');
            this.removeProduct(i);
          }
        }
      ]
    });
    await alert.present();
  }
  async presentAlert(msg: string, action?) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
          //console.log('Confirm Okay');
            this.navCtrl.navigateRoot(['admin-orders']);
        }
      }]
    }); 
    await alert.present();
  }
  async presentLoading(drn = 5000, msg = 'Please Wait...') {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: drn
    });
    await this.loading.present();
  }
  async onChangeDeliveryAgent(event) {
    //console.log('asasa...', event.target.value);
    let selectedDeliveryAgentId = event.target.value;
    await this.presentLoading();
    this.events.publish('user:assignDeliveryAgent', selectedDeliveryAgentId, this.orderId);
  }
  async sendPaymentRequest() {
    await this.presentLoading();
    this.events.publish('order:sendPaymentRequest', this.orderId, this.orderData[0].userId);

  }
  async onClickUpdatePaymentComplete() {
    await this.presentLoading();
    this.events.publish('order:updatePaymentComplete', this.orderId);
  }
  onSetupDeliveryAgent() {
    this.router.navigate(['admin-allusers']);
  }

  getTime(time) {
    return moment(time).format('hh:mm A');
  }

  openOrderInvoice(url) {
    const browser: InAppBrowserObject = this.inAppBrowser.create(url, '_system');
  }

  callUser() {
   /* this.callNumber.callNumber(this.orderData[0].address.phoneNo, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));*/
  }

  totalPieces(product: any, i: number) {
    let pieces = product.quantity * parseInt(product.pack.weight);
    this.orderData[0].products[i]['totalPieces'] = pieces;
    return pieces;
  }
  decrementPieces(i) {
    if(this.orderData[0].products[i].totalPieces > 1) {
      this.orderData[0].products[i].totalPieces = this.orderData[0].products[i].totalPieces - 1;
      this.orderData[0].products[i].price = this.orderData[0].products[i].totalPieces * this.orderData[0].products[i].pack.perPcPrice;
      //console.log(this.orderData[0].products[i].price);
      let prodPrice = 0;
      this.orderData[0].products.forEach(element => {
        //console.log(element);
        prodPrice = prodPrice + element.price;
      });
      this.orderData[0].productsPrice = prodPrice;
      this.orderData[0].totalAmountToPaid = this.orderData[0].productsPrice + this.orderData[0].couponDiscount + this.orderData[0].defaultGst + this.orderData[0].delivery;
    }
  }
  incrementPieces(i) {
    this.orderData[0].products[i].totalPieces = this.orderData[0].products[i].totalPieces + 1;
    this.orderData[0].products[i].price = this.orderData[0].products[i].totalPieces * this.orderData[0].products[i].pack.perPcPrice;
    let prodPrice = 0;
    this.orderData[0].products.forEach(element => {
      prodPrice = prodPrice + element.price;
    });
    this.orderData[0].productsPrice = prodPrice;
    this.orderData[0].totalAmountToPaid = this.orderData[0].productsPrice + this.orderData[0].couponDiscount + this.orderData[0].defaultGst + this.orderData[0].delivery;
  }
  getSinglePiecePrice(totalPieces, totalAmount) {
    return Math.ceil(totalAmount / totalPieces);
  }

  goToPrdouctDetails(product) {
    let stateObj = {};
    const navigationExtras: NavigationExtras = {
      state: {}
    };
    if(product.parentProductId) {
      stateObj = {
        optionId: product.productId,
        productId: product.parentProductId,
        isOptionProduct: true,
      }
      navigationExtras.state = stateObj;
    } else {
      stateObj = {
        productId: product.productId,
      }
      navigationExtras.state = stateObj;
    }
    this.router.navigate(['new-product'], navigationExtras);
  }

  reviewDate() {
    if(this.orderData[0].rating.createdAt instanceof Date) {
      return this.orderData[0].rating.createdAt;
    } else {
      return this.orderData[0].rating.createdAt.toDate();
    }
  }

  showGenInvoiceBtn() {
    if((!this.orderData[0].hasOwnProperty('invoice') || (this.orderData[0].invoice.status !== 'generated')) && (!this.orderData[0].hasOwnProperty('orderType') || (this.orderData[0].hasOwnProperty('orderType') && this.orderData[0].orderType !== 'subscription'))) {
      return true;
    } else {
      return false;
    }
  }

  async generateInvoice() {
    await this.presentLoading(100000, "Generating invoice, please wait...");
    const invoiceRes: any = await this.orderService.generateInvoice(this.orderData[0].id);
    this.loading.dismiss();
    if(invoiceRes.status === 'generated') {
      this.orderData[0]['invoice'] = invoiceRes;
      this.presentAlert("Invoice generated successfully!");
    } else {
      this.presentAlert("Invoice generation failed, please try again later.");
    }
  }

  openImg(url) {
    window.open(url, "_blank");
  }

  getFinalAmount() {
    let amount = this.orderData[0].totalAmountToPaid - this.orderData[0].walletAmount - (this.orderData[0].cashbackAmount || 0);
    if(this.isPartialOrder()) {
      amount -= this.orderData[0].partialPayment.online.amount
    }
    return amount;
  }

  isPartialOrder() {
    return ('partialPayment' in this.orderData[0]) && (this.orderData[0].partialPayment.status && this.orderData[0].partialPayment.online.completed) ? true : false;
  }

  isEstimatedTimeAvailable() {
    return ('estimatedDeliveryTime' in this.orderData[0]) && this.orderData[0].estimatedDeliveryTime !== '' ? true : false;
  }

  isDeliveryScheduled() {
    return this.orderData[0].scheduledDate ? true : false;
  }

  isInstantDelivery() {
    return ('instantDelivery' in this.orderData[0]) && this.orderData[0].instantDelivery.selected ? true : false;
  }

  isResaleOrder() {
    return 'resale' in this.orderData[0];
  }

  async onClickResaleBtn() {
    const modal = await this.modalController.create({
      component: ResaleOrderPage,
      componentProps: {
        resale: this.orderData[0].resale,
        products: this.orderData[0].products,
        orderId: this.orderData[0].id,
        viewBy: 'admin'
      }
    });
    await modal.present();
  }

  
  async editOrder() {
    const modal = await this.modalController.create({
      componentProps: {
        order: this.orderData[0]
      },
      component: EditOrderPage,
      cssClass:'custom-modal'
    });
    modal.onDidDismiss().then((res) => {
      if(res && res.data) {
        console.log('edit order modal res -> ', res.data);
        this.orderData[0]['unavailable'] = res.data.unavailable;
        this.orderData[0]['unavailablePrice'] = res.data.unavailablePrice;
      }
    });
    await modal.present();
  }

  showEditOrderBtn() {
    if(this.orderData[0].hasOwnProperty('autoConfirmOrder') && (this.orderData[0].status === 'Pending' || this.orderData[0].status === 'Confirmed' || this.orderData[0].status === 'Dispatched') && (!this.orderData[0].hasOwnProperty('orderType') || (this.orderData[0].hasOwnProperty('orderType') && this.orderData[0].orderType !== 'subscription'))) {
      return true;
    } else {
      return false;
    }
  }

  getUnavailableProductPrice(index: number) {
    const product = this.orderData[0].products[index];
    let price = 0;
    if(product.hasOwnProperty('pack') && (product.pack.variantType === 'pieces')) {
      price = product.pack.price;
    } else {
      price = product.price;
    }
    price = (price - (((product.membershipDiscount || 0) / product.quantity) + ((product.couponDiscount || 0) / product.quantity))) * this.orderData[0].unavailable[index];
    return price;
  }

  showUnavailablePrice() {
    if(this.orderData[0].unavailablePrice) {
      return true;
    } else {
      return false;
    }
  }

  removeSubscriptions() {
    this.events.unsubscribe('user:publishOrderDetailsWithOrderId');
    this.events.unsubscribe('user:rejectedOrderSuccessfully');
    this.events.unsubscribe('user:confirmedOrderSuccessfully');
    this.events.unsubscribe('user:cancelledOrderSuccessfully');
    this.events.unsubscribe('user:dispatchedOrderSuccessfully');
    this.events.unsubscribe('user:deliveredOrderSuccessfully');
    this.events.unsubscribe('user:returnedOrderSuccessfully');
    this.events.unsubscribe('user:noDeliveryAgents');
    this.events.unsubscribe('user:publishAllDeliveryAgents');
    this.events.unsubscribe('user:assignDeliveryAgentSuccess');
    this.events.unsubscribe('order:sendPaymentRequestSuccess');
    this.events.unsubscribe('order:updatePaymentCompleteSuccess');
    this.events.unsubscribe('vendor:getVendorNameSuccess');
    this.events.unsubscribe('vendor:getDeliveryAgentNameSuccess');
  }

}
