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
import { CancelledReasonPage } from 'src/app/admin/admin-shop/all-orders/cancelled-reason/cancelled-reason.page';
import { InvoicesPage } from '../../admin-orders/invoices/invoices.page';
import { AdminSettingsService } from 'src/app/services/admin-settings/admin-settings.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.page.html',
  styleUrls: ['./view-order.page.scss'],
})
export class ViewOrderPage implements OnInit {

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
  orderStatus = "";
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
              private modalController: ModalController,
              private adminSettingsService: AdminSettingsService
              ) {
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
                    this.orderId = this.router.getCurrentNavigation().extras.state.orderId;
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
      if (!orderData[0].hasOwnProperty('unavailable')) {
        orderData[0]['unavailable'] = {}
      }
      if (orderData[0].payment.details) {
        if (orderData[0].payment.mode === 'cash' && !(orderData[0].payment.details && ('amount' in orderData[0].payment.details))) {
          orderData[0].payment.details['amount'] = orderData[0].totalAmountToPaid - (orderData[0].walletAmount + orderData[0].cashbackAmount);
        }
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
      this.modalController.dismiss({status:'Rejected'});
      this.presentAlert('Order has been rejected successfully', true);
    });
    this.events.subscribe('user:confirmedOrderSuccessfully', () => {
      this.loading.dismiss();
      this.modalController.dismiss({status:'Confirmed'});
      this.presentAlert('Order has been confirmed successfully', true);
    });
    this.events.subscribe('user:cancelledOrderSuccessfully', () => {
      this.loading.dismiss();
      this.modalController.dismiss({status:'Cancelled'});
      this.presentAlert('Order has been cancelled successfully', true);
    });
    this.events.subscribe('user:dispatchedOrderSuccessfully', () => {
      this.loading.dismiss();
      this.modalController.dismiss({status:'Dispatched'});
      this.presentAlert('Order has been dispatched successfully', true);
    });
    this.events.subscribe('user:deliveredOrderSuccessfully', () => {
      this.loading.dismiss();
      this.modalController.dismiss({status:'Delivered'});
      this.presentAlert('Order has been delivered successfully', true);
    });
    this.events.subscribe('user:returnedOrderSuccessfully', () => {
      this.loading.dismiss();
      this.modalController.dismiss({status:'Returned'});
      this.presentAlert('Order has been returned successfully', true);
    });
    this.events.subscribe('order:sendPaymentRequestSuccess', () => {
      this.loading.dismiss();
      this.modalController.dismiss();
      this.presentAlert('Payment request has been send successfully');
    });
    this.events.subscribe('order:updatePaymentCompleteSuccess', () => {
      this.loading.dismiss();
      this.modalController.dismiss();
      this.presentAlert('Payment status changed to completed successfully', true);
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

  async returnOrder(refundAmount: number) {
    await this.presentLoading();
    this.events.publish('user:returnOrderByAdmin', this.orderId, refundAmount, this.orderData[0]);
  }

  async getRefundedAmount() {
    const alert = await this.alertController.create({
      subHeader: 'Enter Refund Amount',
      inputs: [
        {
          name: 'amount',
          type: 'number',
          value: this.orderData[0].totalAmountToPaid
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        }, {
          text: 'Add',
          handler: (amnt) => {
            this.returnOrder(parseInt(amnt.amount) || 0);
          }
        }
      ]
    });
    await alert.present();
  }

  async refundAmountConfirm() {
    const alert = await this.alertController.create({
      message: 'Do you want to add refund amount to user wallet?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          cssClass: 'secondary',
          handler: () => {
            this.returnOrder(0);
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.getRefundedAmount();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        },
      ]
    });
    await alert.present();
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
    this.modalController.dismiss();
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

  goToProductDetails(product) {
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
    this.modalController.dismiss();
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

  getVendorStatusColor(status: string) {
    switch (status) {
      case 'prepared':
      case 'dispatched':
        return 'success';

      case 'cancelled':
        return 'danger';

      default:
        return 'dark'
    }
  }

  getVendorName(vendorId: string) {
    if (this.orderData[0].vendors && this.orderData[0].vendors.length) {
      const vendor = this.orderData[0].vendors.filter(v => v.id === vendorId);
      if (vendor && vendor.length) {
        return vendor[0].vendor.name;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  isVendorQtyUnavialble(product) {
    return product.vendorStatus.unavailableQty > 0 && product.vendorStatus.unavailableQty !== product.quantity;
  }

  getCodAmount() {
    return this.orderData[0].payment.details.amount;
  }

  getUnavailableProductPrice(index: number) {
    const product = this.orderData[0].products[index];
    let price = 0;
    if (product.hasOwnProperty('pack') && (product.pack.variantType === 'pieces')) {
      price = product.pack.price;
    } else {
      price = product.price;
    }
    price = (price - (((product.membershipDiscount || 0) / product.quantity) + ((product.couponDiscount || 0) / product.quantity))) * this.orderData[0].unavailable[index];
    return price;
  }

  async showInvoiceModal() {
    const modal = await this.modalController.create({
      component: InvoicesPage,
      cssClass: 'custom-modal',
      componentProps: {
        orderDetails: this.orderData[0],
      }
    });
    await modal.present();
  }

  showRegenInvoiceBtn() {
    if ((!this.orderData[0].hasOwnProperty('orderType') || (this.orderData[0].hasOwnProperty('orderType') && this.orderData[0].orderType !== 'subscription'))) {
      return true;
    } else {
      return false;
    }
  }

  async showCustomAlert() {
    return new Promise(async (resolve)=>{
      const alert = await this.alertController.create({
        subHeader: 'Enter Custom Invoice Number',
        inputs: [
            {
                name: 'invoiceNo',
                type: 'text',
                placeholder: 'Enter Custom Invoice Number'
            }
        ],
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                    console.log('Confirm Cancel');
                }
            }, {
                text: 'Done',
                handler: (data) => {
                  console.log('data:',data)
                    if (data.invoiceNo && data.invoiceNo.length > 0) {
                      console.log('data.invoiceNo:',data.invoiceNo)
                      resolve(data.invoiceNo)
                        //return data.invoiceNo;
                    } else {
                      console.log('inside else');
                      this.presentAlert('Enter Invoice number')
                      //this.sharedService.presentToast('Enter Invoice number');
                      resolve('');
                    }
                }
            }
        ] 
    });
    await alert.present();
    })
  }

  async proceedInvoiceGeneration(customInvoiceNo){
    console.log('inisde generation')
    await this.presentLoading(5000, "Generating invoice, please wait...");
    const invoiceRes: any = await this.orderService.generateInvoice(this.orderData[0].id, {active: true, invoiceNo: customInvoiceNo});
    this.loading.dismiss();
    if (invoiceRes.status === 'generated') {
      this.orderData[0]['invoice'] = invoiceRes;
      this.presentAlert("Invoice generated successfully! Please download the new invoice after couple of minutes.");
    } else {
      this.presentAlert("Invoice generation failed, please try again later.");
    }
  }
  
    async generateInvoice() {
      const invoiceData = await this.adminSettingsService.getInvoiceData('getInvoiceData');
      console.log('invoiceData:', invoiceData);
      if (invoiceData && invoiceData.isCustomInvoiceNo) {
        let customInvoiceNo:any = await this.showCustomAlert();
        console.log('customInvoiceNo:',customInvoiceNo);
        if (customInvoiceNo) {
          this.proceedInvoiceGeneration(customInvoiceNo);
        }
      } else{
        console.log('inisde else')
        await this.presentLoading(5000, "Generating invoice, please wait...");
        const invoiceRes: any = await this.orderService.generateInvoice(this.orderData[0].id);
        this.loading.dismiss();
        if (invoiceRes.status === 'generated') {
          this.orderData[0]['invoice'] = invoiceRes;
          this.presentAlert("Invoice generated successfully!");
        } else {
          this.presentAlert("Invoice generation failed, please try again later.");
        }
      }
    }

  isAddonAvailable(product) {
    return product.addOns && product.addOns.options && Object.keys(product.addOns.options).length;
  }

  getSubTotalPrice() {
    return this.sharedService.getSubTotalPrice(this.orderData[0]);
  }

  getTotalGst() {
      return this.sharedService.getTotalGst(this.orderData[0]);
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

  closeModal() {
    this.modalController.dismiss();
  }


}
