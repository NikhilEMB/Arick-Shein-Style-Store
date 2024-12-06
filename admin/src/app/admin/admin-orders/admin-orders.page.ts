import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController, Events, LoadingController, AlertController, IonContent, Platform, PopoverController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { ExportToCsv } from 'export-to-csv';
import { ConfigService } from 'src/app/services/config/config.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { AdminOrderPopoverPage } from './admin-order-popover/admin-order-popover.page';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { OrderService } from 'src/app/services/order/order.service';
import { ResaleOrderPage } from 'src/app/admin/resale-order/resale-order.page';
import { EditOrderPage } from 'src/app/admin/admin-shop/all-orders/edit-order/edit-order.page';
import { CancelledReasonPage } from 'src/app/admin/admin-shop/all-orders/cancelled-reason/cancelled-reason.page';
import { environment } from 'src/environments/environment';
import { QuotationChatPage } from './quotation-chat/quotation-chat.page';
import { QuotationEditPage } from './quotation-edit/quotation-edit.page';
import { PickUpService } from 'src/app/services/pickUp/pick-up.service';
import { AdminSettingsService } from 'src/app/services/admin-settings/admin-settings.service';
import { InvoicesPage } from './invoices/invoices.page';
import { FiltersPage } from './filters/filters.page';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { WhatsappDashboardService } from 'src/app/services/whatsapp-dashboard/whatsapp-dashboard.service';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { SearchEngineService } from 'src/app/services/search-engine/search-engine.service';
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.page.html',
  styleUrls: ['./admin-orders.page.scss'],
})
export class AdminOrdersPage implements OnInit {

  productSetting:any;
  paymentFailedOrders: any = [];
  allPaymentFailedOrders: any = [];
  showPaymentFailedLoader: boolean = true;
  noPaymentFailedOrders: boolean = false;
  noMorePaymentFailedOrders: boolean;

  paymentPendingOrders: any = [];
  allPaymentPendingOrders: any = [];
  showPaymentPendingLoader: boolean = true;
  noPaymentPendingOrders: boolean = false;
  noMorePaymentPendingOrders: boolean;

  cancelledOrders: any = [];
  allCancelledOrders: any = [];
  showCancelledOrdersLoader: boolean = true;
  noCancelledOrders: boolean = false;
  noMoreCancelledOrders: boolean;

  rejectedOrders: any = [];
  allRejectedOrders: any = [];
  showRejectedOrdersLoader: boolean = true;
  noRejectedOrders: boolean = false;
  noMoreRejectedOrders: boolean;

  returnedOrders: any = [];
  allReturnedOrders: any = [];
  showReturnedOrdersLoader: boolean = true;
  noReturnedOrders: boolean = false;
  noMoreReturnedOrders: boolean;

  pendingOrders: any = [];
  allPendingOrders: any = [];
  showPendingLoader: boolean = true;
  noPendingOrders: boolean = false;
  noMorePendingOrders: boolean;

  dispatchedOrders: any = [];
  allDispatchedOrders: any = [];
  showDispatchedLoader: boolean = true;
  noDispatchedOrders: boolean = false;
  noMoreDispatchedOrders: boolean;

  completedorders: any = [];
  allCompletedOrders: any = [];
  noCompletedOrders: boolean = false;
  showCompletedLoader: boolean = true;
  noMoreCompletedOrders: boolean;

  productsNeedToDeliver: any = [];
  noProductsNeedToDeliver: boolean = false;
  showProductsNeedToDeliverLoader: boolean = true;
  noMoreProductsNeedToDeliver: boolean;

  totalQuantity: number = 0;
  showSearch: boolean = false;
  uniqueProductsQtyPerOrder: any = [];
  devHeight: any;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    filename: 'Products',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Exported Products',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
  createUserOrderEnabled = false;

  ordersText: any
  allTypeOrders: any

  exportType = 'orders'

  orderData: any = [{
    orderId: '',
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    date: '',
    status: '',
    payment: '',
    createdAt: { nanoseconds: 18800000, seconds: 1609740181 },
    products: '',
    productName: '',
    productQuantity: '',
    productPrice: '',
    productDiscountPrice: '',
    productGSTPercent: '',
    productGSTAmount: '',
    product_IGST: '',
    product_SGST: '',
    product_CGST: '',
    totalQuantity: '',
    totalDiscountPrice: '',
    totalGSTAmount: '',
    totalIGST: '',
    totalSGST: '',
    totalCGST: '',
    subtotalInclGst: '',
    discount: '',
    delivery: '',
    totalInclGst: '',
    couponDiscount: '',
    couponCode: '',
    paymentCompleted: '',
    paymentMode: '',
    walletAmountUsed: '',
    deliveryDate: '',
    deliveryTime: '',
    customerGST: ''
  }];
  loading: any;
  orderId: any = '';
  showLoader: boolean = true;
  // @ViewChild(IonContent, {static: false}) content: IonContent;
  noDeliveryAgents: boolean = false;
  allDeliveryAgents: any = [];
  pdfObj = null;
  message = '';
  currencyCode: any;
  dateSchedule: any = ''
  vendorData = []
  deliveryAgentName: string

  ordersList: any = []
  previousId = 'status2'
  currentOrders = 'pending'
  noMoreOrders = false
  searchOrder: string = ''
  showLoadMoreBtn = true
  monthsFilter: any = ''
  startOrders = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  endOrders = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000))
  currentDays = 7
  currentFilter = 'Last 7 Days'
  startDate: any
  endDate: any
  archiveIndex: any
  count = 0
  paymentId: any = '';
  taxType;
  allOrderStatuses = []
  showHistory = false
  logData: any = []
  showLabels = false
  labels: any = []
  newLabelName = ''
  chosenIndex = 0;

  user = {
    role: '',
    id: ''
  };
  managerDetails;
  filters = {
    region: '',
    pincode: ''
  };
  dateFiltered = false;
  defaultCountryCode: any;
  isPrintingInvoice: boolean = false;  
  
  // whatsapp
  whatsapp = false;
  insights;
  page = 0;
  branches: any[] = [];

  constructor(public modalController: ModalController, private events: Events, private afs: AngularFirestore, private router: Router,
    public loadingController: LoadingController, public alertController: AlertController, private navCtrl: NavController,
    private productService: ProductService, private userService: UserService, private platform: Platform,
    private storage: Storage, private configService: ConfigService, private inAppBrowser: InAppBrowser,
    private sharedService: SharedService, public popoverController: PopoverController, private orderService: OrderService,
    private pickup: PickUpService, private adminSettingsService: AdminSettingsService, private managerService: ManagerService,
    private _renderer2: Renderer2, private whatsappService: WhatsappDashboardService,
    private searchEngineService: SearchEngineService) { }

  async ionViewDidEnter() {
    this.checkSystemLock();
    this.devHeight = this.platform.height();
    this.showSearch = false;
    // console.log('createUserOrderEnabled:', this.configService.environment.createUserOrder);
    this.createUserOrderEnabled = this.configService.environment.createUserOrder;
    this.isPrintingInvoice = this.configService.environment.isPrintingInvoice;
    this.ordersText = 'Pending Orders'
    this.initializeSubscriptions();
    this.getPendingOrders();
    this.events.publish('user:getAllDeliveryAgents');
    this.currencyCode = this.configService.environment.currencyCode;
    this.taxType = this.configService.environment.taxType;
    this.allOrderStatuses = environment.allOrderStatuses;
    let labelsData = await this.userService.getOrderLabels()
    if (labelsData && labelsData['labels'] ) {
      this.labels = labelsData['labels']
    }
    const userRole = await this.storage.get('userRole');
    if(userRole == 'manager'){
      this.user.role = 'manager';
      const uid = await this.storage.get('uid');
      this.user.id = uid;
      const managerDetails: any = await this.managerService.getManagerData(uid, 'service');
      this.managerDetails = managerDetails;
      if (managerDetails && managerDetails.region && typeof(managerDetails.region)=='string') {
        this.filters.region = managerDetails.region ? managerDetails.region : '';
      }
      else if (managerDetails && managerDetails.region && Array.isArray(managerDetails.region)) {
        this.filters.region = managerDetails.region[0] ? managerDetails.region[0]: [];
      }
    }
    this.defaultCountryCode = this.configService.environment.defaultCountryCode;
    this.whatsapp = this.configService.environment.whatsapp;
    const accountDetails: any = await this.whatsappService.getWhatsappCredentials();
    if (accountDetails) {
      this.insights = accountDetails.insights;
    }

    await this.getAllBranch();
    console.log("branches", this.branches);
  }

  async getAllBranch() {
    try {
      const data = await this.adminSettingsService.getAllBranch() as [];
      if (data) {
        this.branches = data;
      }
    }
    catch (e) {
      console.log("getAllBranch error", e);
    }
    
  }

  async addFreshdeskScript(){
    const userRole = await this.storage.get('userRole');
    if(userRole == 'admin'){
      let script = this._renderer2.createElement('script');
      script.type = `text/javascript`;
      script.text = `function initFreshChat() {
        window.fcWidget.init({
          token: "cca1f4b5-1496-4ec2-ba35-681145241f59",
          host: "https://wchat.in.freshchat.com"
        });
      }
      function initialize(i,t){var e;i.getElementById(t)?initFreshChat():((e=i.createElement("script")).id=t,e.async=!0,e.src="https://wchat.in.freshchat.com/js/widget.js",e.onload=initFreshChat,i.head.appendChild(e))}function initiateCall(){initialize(document,"Freshdesk Messaging-js-sdk")}window.addEventListener?window.addEventListener("load",initiateCall,!1):window.attachEvent("load",initiateCall,!1);console.log('log from script');initiateCall()`;
      this._renderer2.appendChild(document.body, script);
    }
  }

  async ngOnInit() {
    // this.addFreshdeskScript();
    this.productSetting = await this.productService.getProductSetting()
		console.log("this is product setting",this.productSetting);
  }
  getDateTimeFormat(date) {
    return moment(date).format('MMM D, YYYY hh:mm a');
  }
  ngOnDestroy() {

  }
  ionViewWillLeave() {
    this.showSearch = false;
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('user:publishPaymentFailedOrders', (orders) => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.ordersList = orders;
      this.noMoreOrders = false
      if (this.count == 0) {
        this.onClickViewDetails(this.ordersList[0].orderId)
      }
      this.count = 1
    });
    this.events.subscribe('user:noPaymentFailedOrders', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.noPaymentFailedOrders = true;
      this.showPaymentFailedLoader = false;
    });
    this.events.subscribe('user:noMorePaymentFailedOrders', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.noMoreOrders = true;
    });
    this.events.subscribe('user:publishPaymentPendingOrders', (orders) => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.ordersList = orders;
      this.noMoreOrders = false
      if (this.count == 0) {
        this.onClickViewDetails(this.ordersList[0].orderId)
      }
      this.count = 1
    });
    this.events.subscribe('user:noPaymentPendingOrders', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.noPaymentPendingOrders = true;
      this.showPaymentPendingLoader = false;
    });
    this.events.subscribe('user:noMorePaymentPendingOrders', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.noMoreOrders = true;
    });
    this.events.subscribe('user:publishCancelledOrders', (orders) => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.ordersList = orders;
      this.noMoreOrders = false
      if (this.count == 0) {
        this.onClickViewDetails(this.ordersList[0].orderId)
      }
      this.count = 1
    });
    this.events.subscribe('user:noCancelledOrders', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.noCancelledOrders = true;
      this.showCancelledOrdersLoader = false;
    });
    this.events.subscribe('user:noMoreCancelledOrders', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.noMoreOrders = true;
    });
    // rejected
    this.events.subscribe('user:publishRejectedOrders', (orders) => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.ordersList = orders;
      this.noMoreOrders = false
      if (this.count == 0) {
        this.onClickViewDetails(this.ordersList[0].orderId)
      }
      this.count = 1
    });
    this.events.subscribe('user:noRejectedOrders', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.noRejectedOrders = true;
      this.showRejectedOrdersLoader = false;
    });
    this.events.subscribe('user:noMoreRejectedOrders', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.noMoreOrders = true;
    });
    // Returned
    this.events.subscribe('user:publishReturnedOrders', (orders) => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.ordersList = orders;
      this.noMoreOrders = false
      if (this.count == 0) {
        this.onClickViewDetails(this.ordersList[0].orderId)
      }
      this.count = 1
    });
    this.events.subscribe('user:noReturnedOrders', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.noReturnedOrders = true;
      this.showReturnedOrdersLoader = false;
    });
    this.events.subscribe('user:noMoreReturnedOrders', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.noMoreOrders = true;
    });
    this.events.subscribe('user:publishPendingOrdersForAdmin', (orders) => {
      if (this.loading) {
        this.loading.dismiss()
      }
      // console.log('orders pending', orders);
      this.ordersList = orders;
      this.noMoreOrders = false
      if (this.count == 0) {
        this.onClickViewDetails(this.ordersList[0].orderId)
      }
      this.count = 1
    });
    this.events.subscribe('user:publishCompletedOrdersForAdmin', (orders) => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.ordersList = orders;
      this.noMoreOrders = false
      if (this.count == 0) {
        this.onClickViewDetails(this.ordersList[0].orderId)
        // console.log("user:publishCompletedOrdersForAdmin");
      }
      this.count = 1
    });

    this.events.subscribe('user:noCompletedOrdersForAdmin', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.noCompletedOrders = true;
      this.showCompletedLoader = false;
    });
    this.events.subscribe('user:noMorePendingOrdersForAdmin', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.noMoreOrders = true;

    });
    this.events.subscribe('user:noMoreCompletedOrdersForAdmin', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.noMoreOrders = true;
    });

    this.events.subscribe('user:publishDispatchedOrdersForAdmin', (orders) => {
      if (this.loading) {
        this.loading.dismiss()
      }
      // console.log('Dispatched Orders', orders);
      this.ordersList = orders;
      this.noMoreOrders = false
      if (this.count == 0) {
        this.onClickViewDetails(this.ordersList[0].orderId)
      }
      this.count = 1
    });

    this.events.subscribe('user:noDispatchedOrdersForAdmin', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.noDispatchedOrders = true;
      this.showDispatchedLoader = false;
    });

    this.events.subscribe('user:noMoreDispatchedOrdersForAdmin', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.noMoreOrders = true;
    });

    this.events.subscribe('user:noPendingOrdersForAdmin', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.noPendingOrders = true;
      this.showPendingLoader = false;
    });

    this.events.subscribe('user:publishOrderDetailsWithOrderId', async (orderData) => {
      console.log("publishOrderDetailsWithOrderId: ", orderData);
      if (!orderData[0].hasOwnProperty('unavailable')) {
        orderData[0]['unavailable'] = {}
      }
      if (orderData[0].payment.details) {
        if (orderData[0].payment.mode === 'cash' && !(orderData[0].payment.details && ('amount' in orderData[0].payment.details))) {
          orderData[0].payment.details['amount'] = orderData[0].totalAmountToPaid - (orderData[0].walletAmount + orderData[0].cashbackAmount);
        }
      }
      this.orderData = orderData;
      if (orderData[0].payment && orderData[0].payment.details && orderData[0].payment.details.paymentId) {
        console.log("paymentId",orderData[0].payment.details.paymentId);
        this.paymentId = orderData[0].payment.details.paymentId;
        if (this.paymentId && this.paymentId.hasOwnProperty('razorpay_payment_id')) {
          this.paymentId = this.paymentId['razorpay_payment_id'];
        }
      }
      else {
        this.paymentId = '';
      }
      this.showLoader = false;
      if (orderData[0].scheduledDate) {
        this.dateSchedule = orderData[0].scheduledDate.toDate()
      }
      if (orderData[0].vendorId) {
        this.events.publish('vendor:getVendorName', orderData[0].vendorId)
      }
      if (orderData[0].deliveryAgentId) {
        this.events.publish('delivery:getDeliveryAgentName', orderData[0].deliveryAgentId)
      }
      if(!this.isWalletDeducted()) {
        this.orderData[0].walletAmount = 0;
        this.orderData[0].cashbackAmount = 0;
      }
      this.logData = await this.userService.getOrderLogs(orderData[0].id)
      // for (const [index, product] of this.orderData[0].products.entries()) {
      //   // console.log('product:', product);
      //   const prodData: any = await this.productService.getProductWithId(product.productId, 'service');
      //   if (prodData) {
      //     this.orderData[0].products[index].showSubheading = 'showSubheading' in prodData ? prodData.showSubheading : false;
      //   }
      // }


      if (!orderData[0].hasOwnProperty('branchData')) {
        orderData[0]['branchData'] = {};
        orderData[0]['branchData']['id'] = '';
      }
    });
    this.events.subscribe('user:rejectedOrderSuccessfully', () => {
      this.loading.dismiss();
      this.setButtonActive("rejected");
      this.onClickViewDetails(this.orderId)
      this.presentAlert('Order has been rejected successfully', true);
    });
    this.events.subscribe('user:confirmedOrderSuccessfully', () => {
      this.loading.dismiss();
      this.setButtonActive("confirmed");
      // console.log("check", "getPendingOrders");
      this.onClickViewDetails(this.orderId)
      this.presentAlert('Order has been confirmed successfully', true);
    });
    this.events.subscribe('user:cancelledOrderSuccessfully', () => {
      this.loading.dismiss();
      this.setButtonActive("cancelled");
      this.onClickViewDetails(this.orderId)
      this.presentAlert('Order has been cancelled successfully', true);
    });
    this.events.subscribe('user:dispatchedOrderSuccessfully', () => {
      this.loading.dismiss();
      this.setButtonActive("dispatched");
      this.onClickViewDetails(this.orderId)
      this.presentAlert('Order has been dispatched successfully', true);
    });
    this.events.subscribe('user:deliveredOrderSuccessfully', () => {
      this.loading.dismiss();
      this.onClickViewDetails(this.orderId)
      this.setButtonActive("delivered");
      // console.log("deliveredOrderSuccessfully");
      this.presentAlert('Order has been delivered successfully', true);
    });
    this.events.subscribe('user:returnedOrderSuccessfully', () => {
      this.loading.dismiss();
      this.setButtonActive("returned");
      this.onClickViewDetails(this.orderId)
      // console.log("returnedOrderSuccessfully");
      this.presentAlert('Order has been returned successfully', true);
    });
    this.events.subscribe('order:sendPaymentRequestSuccess', () => {
      this.loading.dismiss();
      this.setButtonActive("paymentSuccess");
      this.onClickViewDetails(this.orderId)
      this.presentAlert('Payment request has been send successfully', true);
    });
    this.events.subscribe('order:updatePaymentCompleteSuccess', () => {
      this.loading.dismiss();
      this.onClickViewDetails(this.orderId)
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
      this.presentAlert('Delivery Agent has been assigned successfully!', true);
    });
    this.events.subscribe('vendor:getVendorNameSuccess', (data) => {
      this.vendorData = data
    });
    this.events.subscribe('delivery:getDeliveryAgentNameSuccess', (data) => {
      if (data) {
        if (data.name) {
          this.deliveryAgentName = data.name
        }
      }
    });
    this.events.subscribe('order:updateOrderArchiveSuccess', async () => {
      await this.ordersList.splice(this.archiveIndex, 1)
      this.presentAlert('Order is moved to Archive List');
    });
    this.events.subscribe('order:updateOrderArchiveFailure', () => {
      this.presentAlert('Please try again later.');
    });

    this.events.subscribe('user:returnedOrderFailure', () => {
      this.loading.dismiss();
      this.presentAlert('Something went wrong, please try again later.');
    });

  }
  getProductsNeedToDeliverForAdmin() {
    this.exportType = 'products'
    if (this.productsNeedToDeliver.length === 0) {
      this.events.publish('user:getProductsNeedToDeliverForAdmin');
    }
  }
  productsQuantityPerOrder(orders) {
    let uniqueProdcuts = [];
    let productsQuantity = [];
    for (let index = 0; index < orders.length; index++) {
      for (let x = 0; x < orders[index].products.length; x++) {
        if (orders[index].status === 'Pending' || orders[index].status === 'Confirmed') {
          let pid = orders[index].products[x].productId;
          let product = {};
          product[pid] = {
            quantity: orders[index].products[x].quantity,
            orderId: orders[index].orderId
          }
          productsQuantity.push(product);
          if (!uniqueProdcuts.some(e => e.hasOwnProperty(pid))) {
            let uniqueProduct = {}
            uniqueProduct[pid] = {
              name: orders[index].products[x].name,
              img: orders[index].products[x].img,
              quantityPerOrder: []
            }
            uniqueProdcuts.push(uniqueProduct)
          }
        }
      }
    }
    //console.log('productsQuantity', productsQuantity);
    //console.log('uniqueProdcuts', uniqueProdcuts);
    for (let index = 0; index < uniqueProdcuts.length; index++) {
      for (const [key, value] of Object.entries(uniqueProdcuts[index])) {
        for (let x = 0; x < productsQuantity.length; x++) {
          for (const [pid, qty] of Object.entries(productsQuantity[x])) {
            if (key === pid) {
              uniqueProdcuts[index][key].quantityPerOrder.push(qty);
            }
          }
        }
      }
    }
    //console.log('uniqueProdcuts final', uniqueProdcuts);
    this.uniqueProductsQtyPerOrder = uniqueProdcuts
  }

  calcTotalQtyPerOrder(qty) {
    let totalQty = 0;
    for (let index = 0; index < qty.length; index++) {
      totalQty += qty[index].quantity;
    }
    return totalQty;
  }

  onClickViewDetails(orderId) {
    this.orderId = orderId
    this.events.publish('user:getOrderDetailsWithOrderId', orderId);
  }
  goToManageShipment(id, order) {
    if (order.status === 'Pending') {
      this.sharedService.presentAlert('Please Confirm order before managing shipment');
    } else {
      this.router.navigate([`manage-shipment/${id}`]);
    }
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

  setButtonActive(status: string) {
    // console.log("status : ", status);
    let prevMsgDiv = document.getElementById(this.previousId);
    prevMsgDiv.style.background = 'white';
    if (status == "delivered") {
      console.log("status : ", status);
      this.currentOrders = 'completed'
      this.ordersText = 'Delivered Orders'
      this.events.publish('user:getCompletedOrdersForAdmin',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
    }
    if (status == "rejected") {
      console.log("status : ", status);
      this.currentOrders = 'rejected'
      this.ordersText = 'Rejected Orders'
      this.events.publish('user:getRejectedOrders',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
    }
    if (status == "cancelled") {
      console.log("status : ", status);
      this.currentOrders = 'cancelled'
      this.ordersText = 'Cancelled Orders'
      this.events.publish('user:getCancelledOrders',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
    }
    if (status == "dispatched") {
      console.log("status : ", status);
      this.currentOrders = 'dispatched'
      this.ordersText = 'Dispatched Orders'
      this.events.publish('user:getDispatchedOrdersForAdmin',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
    }
    if (status == "confirmed") {
      console.log("status : ", status);
      this.currentOrders = 'pending'
      this.ordersText = 'Confirmed Orders'
      this.events.publish('user:getPendingOrdersForAdmin',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
    }
    if (status == "returned") {
      console.log("status : ", status);
      this.currentOrders = 'returned'
      this.ordersText = 'Returned Orders'
      this.events.publish('user:getReturnedOrders',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
    }
    if (status == "paymentSuccess") {
      console.log("status : ", status);
      this.currentOrders = 'paymentPending'
      this.ordersText = 'Orders with payment pending'
      this.events.publish('user:getPaymentPendingOrders',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
    }
  }

  getPendingOrders() {
    this.currentOrders = 'pending'
    this.showHistory = false
    this.count = 0
    this.ordersList = []
    this.orderId = ''
    let prevMsgDiv = document.getElementById(this.previousId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById('status2');
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.previousId = 'status2'
    this.exportType = 'orders'
    this.ordersText = 'Confirmed Orders'
    this.events.publish('user:getPendingOrdersForAdmin',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
    let objDiv = document.getElementById("scroll2");
    if (objDiv) {
      objDiv.scrollTop = 0;
    }
  }

  getCompletedOrders() {
    this.currentOrders = 'completed'
    this.showHistory = false
    this.count = 0
    this.ordersList = []
    this.orderId = ''
    let prevMsgDiv = document.getElementById(this.previousId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById('status4');
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.previousId = 'status4'
    this.exportType = 'orders'
    this.ordersText = 'Delivered Orders'
    this.events.publish('user:getCompletedOrdersForAdmin',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
    let objDiv = document.getElementById("scroll2");
    if (objDiv) {
      objDiv.scrollTop = 0;
    }
    // this.events.publish('user:getAllCompletedOrdersForAdmin');
  }

  getDispatchedOrders() {
    this.currentOrders = 'dispatched'
    this.showHistory = false
    this.count = 0
    this.ordersList = []
    this.orderId = ''
    let prevMsgDiv = document.getElementById(this.previousId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById('status3');
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.previousId = 'status3'
    this.exportType = 'orders'
    this.ordersText = 'Dispatched Orders'
    this.events.publish('user:getDispatchedOrdersForAdmin',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
    let objDiv = document.getElementById("scroll2");
    if (objDiv) {
      objDiv.scrollTop = 0;
    }
    // this.events.publish('user:getAllDispatchedOrdersForAdmin');
  }

  getPaymentPendingOrders() {
    this.currentOrders = 'paymentPending'
    this.showHistory = false
    this.count = 0
    this.ordersList = []
    this.orderId = ''
    let prevMsgDiv = document.getElementById(this.previousId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById('status7');
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.previousId = 'status7'
    this.exportType = 'orders'
    this.ordersText = 'Orders with payment pending'
    this.events.publish('user:getPaymentPendingOrders',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
    let objDiv = document.getElementById("scroll2");
    if (objDiv) {
      objDiv.scrollTop = 0;
    }
    // this.events.publish('user:getAllPaymentPendingOrders');
  }

  getPaymentFailedOrders() {
    this.currentOrders = 'failed'
    this.showHistory = false
    this.count = 0
    this.ordersList = []
    this.orderId = ''
    let prevMsgDiv = document.getElementById(this.previousId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById('status1');
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.previousId = 'status1'
    this.exportType = 'orders'
    this.ordersText = 'Pending Orders'
    this.events.publish('user:getPaymentFailedOrders',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
    let objDiv = document.getElementById("scroll2");
    if (objDiv) {
      objDiv.scrollTop = 0;
    }
    // this.events.publish('user:getAllPaymentFailedOrders');
  }

  getCancelledOrders() {
    this.currentOrders = 'cancelled'
    this.showHistory = false
    this.count = 0
    this.ordersList = []
    this.orderId = ''
    let prevMsgDiv = document.getElementById(this.previousId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById('status5');
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.previousId = 'status5'
    this.exportType = 'orders'
    this.ordersText = 'Cancelled Orders'
    this.events.publish('user:getCancelledOrders',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
    let objDiv = document.getElementById("scroll2");
    if (objDiv) {
      objDiv.scrollTop = 0;
    }
    // this.events.publish('user:getAllCancelledOrders');
  }
 
  getRejectedOrders() {
    this.currentOrders = 'rejected'
    this.showHistory = false
    this.count = 0
    this.ordersList = []
    this.orderId = ''
    let prevMsgDiv = document.getElementById(this.previousId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById('status8');
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.previousId = 'status8'
    this.exportType = 'orders'
    this.ordersText = 'Rejected Orders'
    this.events.publish('user:getRejectedOrders',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
    let objDiv = document.getElementById("scroll2");
    if (objDiv) {
      objDiv.scrollTop = 0;
    }
    // this.events.publish('user:getAllCancelledOrders');
  }

  getReturnedOrders() {
    this.currentOrders = 'returned'
    this.showHistory = false
    this.count = 0
    this.ordersList = []
    this.orderId = ''
    let prevMsgDiv = document.getElementById(this.previousId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById('status6');
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.previousId = 'status6'
    this.exportType = 'orders'
    this.ordersText = 'Returned Orders'
    this.events.publish('user:getReturnedOrders',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
    let objDiv = document.getElementById("scroll2");
    if (objDiv) {
      objDiv.scrollTop = 0;
    }
    // this.events.publish('user:getAllReturnedOrders');
  }


  loadMorePaymentPendingOrders() {
    //console.log('loading more pending orders...');
    this.events.publish('user:loadMorePaymentPendingOrders',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
  }
  loadMorePaymentFailedOrders() {
    //console.log('loading more pending orders...');
    this.events.publish('user:loadMorePaymentFailedOrders',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
  }

  loadMoreCancelledOrders() {
    //console.log('loading more pending orders...');
    this.events.publish('user:loadMoreCancelledOrders',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
  }

  loadMoreReturnedOrders() {
    //console.log('loading more pending orders...');
    this.events.publish('user:loadMoreReturnedOrders',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
  }

  loadMorePendingOrdersForAdmin() {
    //console.log('loading more pending orders...');
    this.events.publish('user:loadMorePendingOrdersForAdmin',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
  }
  loadMoreDispatchedOrdersForAdmin() {
    //console.log('loading more pending orders...');
    this.events.publish('user:loadMoreDispatchedOrdersForAdmin',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
  }
  loadMoreCompletedOrdersForAdmin() {
    //console.log('loading more completed orders...');
    this.events.publish('user:loadMoreCompletedOrdersForAdmin',new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000),this.endOrders, this.filters);
  }
  loadMoreProductsNeedToDeliverForAdmin(event) {
    //console.log('loading more need to deliver products...');
    this.events.publish('user:loadMoreProductsNeedToDeliverForAdmin');
    setTimeout(() => {
      event.target.complete();
    }, 1000);
    if (this.noMoreProductsNeedToDeliver === true) {
      event.target.disabled = true;
    }
  }

  async getOrderWithLables(label, i) {
    this.chosenIndex = i
    this.currentOrders = label
    this.showHistory = false
    this.ordersList = []
    this.orderId = ''
    this.exportType = 'orders'
    this.ordersText = label + ' ' + 'Orders'
    console.log(this.previousId)
    let prevMsgDiv = document.getElementById(this.previousId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById('labelStatus' + i);
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.previousId = 'labelStatus' + i
    await this.presentLoading()
    let orders = await this.userService.getOrdersByLabel(label, this.startOrders, this.endOrders)
    this.ordersList = orders;
    this.noMoreOrders = false
    if (this.loading) {
      this.loading.dismiss()
    }
    if (this.count == 0) {
      this.onClickViewDetails(this.ordersList[0].orderId)
    }
    this.count = 1
    let objDiv = document.getElementById("scroll2");
    if (objDiv) {
      objDiv.scrollTop = 0;
    }
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

  getVendorNameForCSV(vendorId: string, order) {
    if (order.vendors && order.vendors.length) {
      const vendor = order.vendors.filter(v => v.id === vendorId)
      // console.log('vendor : ', vendor)
      if (vendor && vendor.length && vendor[0].vendor) {
        return vendor[0].vendor.name;
      } else {
        return ''
      }
    } else {
      return ''
    }
  }

  isVendorQtyUnavialble(product) {
    return product.vendorStatus.unavailableQty > 0 && product.vendorStatus.unavailableQty !== product.quantity;
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
    this.events.unsubscribe('user:publishPendingOrdersForAdmin');
    this.events.unsubscribe('user:publishAllPendingOrdersForAdmin');
    this.events.unsubscribe('user:publishCompletedOrdersForAdmin');
    this.events.unsubscribe('user:publishAllCompletedOrdersForAdmin');
    this.events.unsubscribe('user:publishDispatchedOrdersForAdmin');
    this.events.unsubscribe('user:publishAllDispatchedOrdersForAdmin');
    this.events.unsubscribe('user:noPendingOrdersForAdmin');
    this.events.unsubscribe('user:noCompletedOrdersForAdmin');
    this.events.unsubscribe('user:noDispatchedOrdersForAdmin');
    this.events.unsubscribe('user:noMoreCompletedOrdersForAdmin');
    this.events.unsubscribe('user:noMorePendingOrdersForAdmin');
    this.events.unsubscribe('user:publishPaymentPendingOrders');
    this.events.unsubscribe('user:publishAllPaymentPendingOrders')
    this.events.unsubscribe('user:noPaymentPendingOrders');
    this.events.unsubscribe('user:noMorePaymentPendingOrders');
    this.events.unsubscribe('user:publishPaymentFailedOrders');
    this.events.unsubscribe('user:publishAllPaymentFailedOrders')
    this.events.unsubscribe('user:noPaymentFailedOrders');
    this.events.unsubscribe('user:noMorePaymentFailedOrders');
    this.events.unsubscribe('user:publishCancelledOrders');
    this.events.unsubscribe('user:publishAllCancelledOrders')
    this.events.unsubscribe('user:noCancelledOrders');
    this.events.unsubscribe('user:noMoreCancelledOrders');
    this.events.unsubscribe('user:publishReturnedOrders');
    this.events.unsubscribe('user:publishAllReturnedOrders')
    this.events.unsubscribe('user:noReturnedOrders');
    this.events.unsubscribe('user:noMoreReturnedOrders')
    this.events.unsubscribe('order:updateOrderArchiveSuccess');
    this.events.unsubscribe('order:updateOrderArchiveFailure');
    this.events.unsubscribe('user:returnedOrderFailure');
  }

  getProducts(products) {

    let prods = [];
    let sgst = 0, cgst = 0, igst = 0;
    products.forEach(product => {
      if (product.pack && product.pack.weight) {
        prods.push(product.name + '(' + product.pack.weight + ')(Qty:' + product.quantity + ')');
      }
      else {
        prods.push(product.name + '(Qty:' + product.quantity + ')');
      }

      if (product.gstObj && product.gstObj.sgst) {
        sgst = sgst + product.gstObj.sgst
      }
      if (product.gstObj && product.gstObj.cgst) {
        cgst = cgst + product.gstObj.cgst
      }
      if (product.gstObj && product.gstObj.igst) {
        igst = igst + product.gstObj.igst
      }
    });

    return { prods, sgst, cgst, igst };

  }

  async exportOrders(name, orders) {
    await this.presentLoading()
    let dateObj = {start: new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), end: this.endOrders};
    if (this.currentOrders == 'pending') {
      if (this.dateFiltered) {
        this.allPendingOrders = await this.userService.getAllPendingOrdersForAdmin(dateObj)
      } else{
        this.allPendingOrders = await this.userService.getAllPendingOrdersForAdmin();
      }
      this.allTypeOrders = this.allPendingOrders
    }
    else if (this.currentOrders == 'failed') {
      if (this.dateFiltered) {
        this.allPaymentFailedOrders = await this.userService.getAllPaymentFailedOrders(dateObj)
      } else{
        this.allPaymentFailedOrders = await this.userService.getAllPaymentFailedOrders();
      }
      this.allTypeOrders = this.allPaymentFailedOrders
    }
    else if (this.currentOrders == 'paymentPending') {
      if (this.dateFiltered) {
        this.allPaymentPendingOrders = await this.userService.getAllPaymentPendingOrders(dateObj)
      } else{
        this.allPaymentPendingOrders = await this.userService.getAllPaymentPendingOrders();
      }
      this.allTypeOrders = this.allPaymentPendingOrders
    }
    else if (this.currentOrders == 'cancelled') {
      if (this.dateFiltered) {
        this.allCancelledOrders = await this.userService.getAllCancelledOrders(dateObj)
      } else{
        this.allCancelledOrders = await this.userService.getAllCancelledOrders();
      }
      this.allTypeOrders = this.allCancelledOrders
    }
    else if (this.currentOrders == 'rejected') {
      if (this.dateFiltered) {
        this.allRejectedOrders = await this.userService.getAllRejectedOrders(dateObj);
      } else{
        this.allRejectedOrders = await this.userService.getAllRejectedOrders();
      }
      this.allTypeOrders = this.allRejectedOrders
    }
    else if (this.currentOrders == 'returned') {
      if (this.dateFiltered) {
        this.allReturnedOrders = await this.userService.getAllReturnedOrders(dateObj)
      } else{      
        this.allReturnedOrders = await this.userService.getAllReturnedOrders();
      }
      this.allTypeOrders = this.allReturnedOrders
    }
    else if (this.currentOrders == 'completed') {
      if (this.dateFiltered) {
        this.allCompletedOrders = await this.userService.getAllCompletedOrdersForAdmin(dateObj)
      } else{
        this.allCompletedOrders = await this.userService.getAllCompletedOrdersForAdmin();
      }
      this.allTypeOrders = this.allCompletedOrders
    }
    else {
      if (this.dateFiltered) {
        this.allDispatchedOrders = await this.userService.getAllDispatchedOrdersForAdmin(dateObj)
      } else{
        this.allDispatchedOrders = await this.userService.getAllDispatchedOrdersForAdmin();
      }
      this.allTypeOrders = this.allDispatchedOrders;
    }
    if (this.loading) {
      this.loading.dismiss()
    }
    this.presentAlert('Please wait for sometime as Export order can take couple of minutes');
    this.downloadOrders(this.currentOrders, this.allTypeOrders)
  }


  async downloadOrders(name, orders) {
    console.log('CSV LOG ORDERS : ', orders);
    if (orders && orders.length > 0) {

      this.options.filename = name + ' ' + this.getDateTimeFormat(new Date);
      this.options.title = name + ' ' + this.getDateTimeFormat(new Date);
      if (name == 'failed') {
        this.options.filename = 'Pending' + ' ' + this.getDateTimeFormat(new Date);
        this.options.title = 'Pending' + ' ' + this.getDateTimeFormat(new Date);
      } else if(name == 'pending'){
        this.options.filename = 'Confirmed' + ' ' + this.getDateTimeFormat(new Date);
        this.options.title = 'confirmed' + ' ' + this.getDateTimeFormat(new Date);
      }
      let data = [], count = 0;
      for (const order of orders){
        count++
        if (order.deliveryAgentId){
          let data = await this.pickup.getDeliveryAgentName(order.deliveryAgentId)
          order['deliveryName'] = (data && data['name']) ? data['name'] : '';
        }
        else{
          order['deliveryName'] = ''
        }
        let products: any = {}, delivery_date = '';
        if (order.products) {
          products = this.getProducts(order.products);
        }
        if (order.scheduledDate && order.scheduledDate !== '' && order.scheduledDate !== {}) {
          // console.log(order.scheduledDate);
          if (typeof order.scheduledDate === 'string' || order.scheduledDate instanceof String) {
            delivery_date = moment(new Date(order.scheduledDate)).format('MMM D, YYYY');
          }
          else if (order.scheduledDate.seconds) {
            delivery_date = moment(order.scheduledDate.toDate()).format('MMM D, YYYY');
          }
        }
        let quantityAll = 0
        let orderIgst = 0
        let orderSgst = 0
        let orderCgst = 0
        order.products.forEach(product => {
          quantityAll = quantityAll + product['quantity']
          if (!isNaN(parseFloat(product['mrpPrice']))) {
            if (product.gstObj && product.gstObj.igst && !isNaN(parseFloat(product.gstObj['igst']))) {
              orderIgst = orderIgst + parseFloat((product.gstObj['igst'] * 0.01 * product['mrpPrice']).toFixed(2))
            }
            if (product.gstObj && product.gstObj.sgst && !isNaN(parseFloat(product.gstObj['sgst']))) {
              orderSgst = orderSgst + parseFloat((product.gstObj['sgst'] * 0.01 * product['mrpPrice']).toFixed(2))
            }
            if (product.gstObj && product.gstObj.cgst && !isNaN(parseFloat(product.gstObj['cgst']))) {
              orderCgst = orderCgst + parseFloat((product.gstObj['cgst'] * 0.01 * product['mrpPrice']).toFixed(2))
            }
          }
        })
        let totalAmount2Decimal = 0
        if (!isNaN(parseFloat(order.defaultGst)) && order.defaultGst !== undefined) {
          totalAmount2Decimal = totalAmount2Decimal + parseFloat(order.defaultGst.toFixed(2))
        }
        let obj = {
          sno: count,
          orderId: order.orderId ? order.orderId : '',
          name: order.address && order.address.name ? order.address.name : '',
          address: order.address && order.address.address ? order.address.address : '',
          city: order.address && order.address.city ? order.address.city : '',
          state: order.address && order.address.state ? order.address.state : '',
          pincode: order.address && order.address.pincode ? order.address.pincode : '',
          phone: order.address && order.address.phoneNo ? order.address.phoneNo : '',
          date: order.createdAt && order.createdAt.toDate() ? this.getDateTimeFormat(order.createdAt.toDate()) : '',
          status: order.status ? order.status.toUpperCase() : '',
          createdBy: order.userName || 'NA',
          productName: '',
          productCode: '',
          productQuantity: '',
          productPrice: '',
          productDiscountPrice: '',
          productGSTPercent: '',
          productGSTAmount: '',
          product_IGST: '',
          product_SGST: '',
          product_CGST: '',
          totalQuantity: quantityAll,
          vendorName: '',
          totalDiscountPrice: order.discountOnMrp ? order.discountOnMrp : '',
          cashbackAmount: order.cashbackAmount ? order.cashbackAmount : '',
          totalGSTAmount: totalAmount2Decimal ? totalAmount2Decimal : '',
          totalIGST: orderIgst,
          totalSGST: orderSgst,
          totalCGST: orderCgst,
          subtotalInclGst: order.totalMrp ? order.totalMrp : '',
          discount: order.discountOnMrp ? order.discountOnMrp : '',
          delivery: order.delivery ? order.delivery : '',
          totalInclGst: order.totalAmountToPaid ? order.totalAmountToPaid : '',
          couponDiscount: order.couponDiscount ? order.couponDiscount : '',
          couponCode: order.couponName ? order.couponName : '',
          paymentCompleted: order.payment.completed ? 'YES' : 'NO',
          paymentMode: order.payment.mode ? order.payment.mode : '',
          walletAmountUsed: order.walletAmount ? order.walletAmount : '',
          deliveryBy: order.deliveryName || '',
          deliveryDate: order.timeline ? order.timeline.Delivered ? this.getDateTimeFormat(order.timeline.Delivered.time.toDate()) : '' : '',
          customerGST: order.customerGstNo ? order.customerGstNo : ''
        }
        obj.createdBy = order.metaData && order.metaData.orderBy ? `${order.metaData.orderBy.role} - ${order.metaData.orderBy.name}`: order.userName || 'NA' ;
        data.push(obj);
        for (let product of order.products) {
          let productIgst = 0
          let productCgst = 0
          let productSgst = 0
          let productGst = 0
          let vendorName = ''
          if (product.vendorStatus) {
            // vendorName = await this.userService.getVendorNameCSV(product.vendorStatus.id)
            if (order.orderId === 3282) {
              console.log('csv order : ', order);
            }
            vendorName = this.getVendorNameForCSV(product.vendorStatus.id, order)
          } else {
            vendorName = ''
          }
          // console.log('prodName : ', product.name, 'vendorName : ', vendorName);
          
          if (!isNaN(parseFloat(product['mrpPrice']))) {
            if (product.gstObj && product.gstObj.igst) {
              productIgst = parseFloat((productIgst + product.gstObj['igst'] * 0.01 * product['mrpPrice']).toFixed(2))
            }
            if (product.gstObj && product.gstObj.sgst) {
              productSgst = parseFloat((productSgst + product.gstObj['sgst'] * 0.01 * product['mrpPrice']).toFixed(2))
            }
            if (product.gstObj && product.gstObj.cgst) {
              productCgst = parseFloat((productCgst + product.gstObj['cgst'] * 0.01 * product['mrpPrice']).toFixed(2))
            }
            if (product.gst) {
              productGst = parseFloat((productGst + product['gst'] * 0.01 * product['mrpPrice']).toFixed(2))
            }
          }
          data.push({
            sno: '',
            orderId: '',
            name: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            phone: '',
            date: '',
            status: '',
            createdBy: '',
            productName: product['name'] ? product['name'] : '',
            productCode: product['sku'] ? product['sku'] : '',
            productQuantity: product['quantity'] ? product['quantity'] : '',
            productPrice: product['mrpPrice'] ? product['mrpPrice'] : '',
            productDiscountPrice: product['price'] ? product['price'] : '',
            productGSTPercent: product['gst'] ? product['gst'] : '',
            productGSTAmount: productGst,
            product_IGST: productIgst,
            product_SGST: productSgst,
            product_CGST: productCgst,
            totalQuantity: '',
            vendorName: vendorName,
            totalDiscountPrice: '',
            cashbackAmount: '',
            totalGSTAmount: '',
            totalIGST: '',
            totalSGST: '',
            totalCGST: '',
            subtotalInclGst: '',
            discount: '',
            delivery: '',
            totalInclGst: '',
            couponDiscount: '',
            couponCode: '',
            paymentCompleted: '',
            paymentMode: '',
            walletAmountUsed: '',
            deliveryBy: '',
            deliveryDate: '',
            customerGST: ''
          })
        }
      }
      console.log('CSV LOG : ', data);
      const csvExporter = new ExportToCsv(this.options);
      csvExporter.generateCsv(data);
      if (this.loading) {
        await this.loading.dismiss()
      }
    }
    else {
      if (this.loading) {
        await this.loading.dismiss()
      }
      this.presentAlert('No orders to export!')
    }
  }


  async exportProducts() {
    if (this.uniqueProductsQtyPerOrder && this.uniqueProductsQtyPerOrder.length > 1) {

      this.options.filename = 'Products for Delivery ' + this.getDateTimeFormat(new Date);
      this.options.title = 'Products for Delivery ' + this.getDateTimeFormat(new Date);
      let data = [];

      this.uniqueProductsQtyPerOrder.forEach(product => {

        if (product) {

          for (var key in product) {
            let item = product[key];
            data.push({
              product: item && item.name ? item.name : '',
              quantity: item && item.quantityPerOrder ? this.calcTotalQtyPerOrder(item.quantityPerOrder) : 0

            });
          }
        }

      });

      const csvExporter = new ExportToCsv(this.options);
      csvExporter.generateCsv(data);

    }
  }

  isSubOrMembershipOrder(order) {
    if (order.hasOwnProperty('orderType') && (order.orderType === 'subscription' || order.orderType === 'membership')) {
      return true;
    } else {
      return false;
    }
  }

  async createOrder() {
    if (this.createUserOrderEnabled == false) {
      const alert = await this.alertController.create({
        message: "Sorry, this feature is not available. Please upgrade your plan for access",
        buttons: ['ok']
      });
      await alert.present();
    } else {
      this.router.navigate(['create-order']);
    }
  }

  goToArchivedOrders() {
    this.router.navigate(['archived-orders']);
  }

  checkSystemLock() {
    const lockSystem = this.configService.environment.lockSystem;
    if (lockSystem) {
      this.sharedService.presentAlert('This app is closed and not accepting any orders. Please contact support team.', false, 'none');
    }
  }

  getTotalItems() {
    return this.orderData[0].products.length;
  }

  async onClickConfirmOrder() {
    if (this.whatsapp && this.orderData[0].metaData && this.orderData[0].metaData.source === 'whatsapp') {
      if (this.insights && this.insights.creditsUsed >= this.insights.chatLimit) {
        this.sharedService.presentAlert('You have reached your free limit for whatsapp, kindly upgrade your plan to use the services.');
        return;
      }
    }
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

  async confirmOrder() {
    await this.presentLoading();
    let data: any = await this.userService.checkProductAvailability(this.orderData[0]);
    // console.log(data);
    if (data.isProductsAvailable) {
      this.events.publish('user:confirmOrderByAdmin', this.orderData[0], this.orderId);
    } else {
      this.loading.dismiss();
      this.presentAlert(`${data.unavailableProduct} is currently unavailable. Please check its stock !`);
    }
  }

  async onClickDispatchOrder() {

    // if (this.orderData[0]['branchData'].id === '' && !this.orderData[0]['selectedNone']) {
    //   await this.sharedService.presentAlert('Please assign branch to this order.');
    //   return;
    // }

    if (this.whatsapp && this.orderData[0].metaData && this.orderData[0].metaData.source === 'whatsapp') {
      if (this.insights && this.insights.creditsUsed >= this.insights.chatLimit) {
        this.sharedService.presentAlert('You have reached your free limit for whatsapp, kindly upgrade your plan to use the services.');
        return;
      }
    }
    let msg = 'Are you sure you want to dispatch this order?';
    if (!(this.orderData[0].payment && this.orderData[0].payment.completed)) {
      msg = 'Payment is Incomplete, Are you sure you want to dispatch this order?'
    }
    const alert = await this.alertController.create({
      message: msg,
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

  async deliverOrder() {
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
      if (res && res.data) {
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
  async presentLoading(msg = 'Please Wait...') {
    this.loading = await this.loadingController.create({
      message: msg
    });
    await this.loading.present();
  }
  async onChangeDeliveryAgent(event) {
    // console.log('asasa...', event.target.value);
    let selectedDeliveryAgentId = event.target.value;
    await this.presentLoading();
    this.events.publish('user:assignDeliveryAgent', selectedDeliveryAgentId, this.orderId);
  }

  async onChangeBranch(event: any) {
    const selectedBranchId = event.target.value;
    console.log('onChangeBranch', selectedBranchId);
    const matchedIndex = this.branches.findIndex(el => el.id === selectedBranchId);
    console.log('matchedIndex', matchedIndex);

    if (selectedBranchId) {
      if (matchedIndex > -1) {
        this.orderData[0]['branchData'] = this.branches[matchedIndex];
      }else{
        this.orderData[0]['selectedNone'] = true
      }
    }
    else {
      this.orderData[0]['branchData'] = {};
      this.orderData[0]['branchData']['id'] = '';
    }

    const updateObj = {
      branchData: this.orderData[0].branchData
    }

    console.log('this.orderData[0].branchData', this.orderData[0].branchData);
    await this.sharedService.presentLoading();
    const res = await this.orderService.updateOrderData(this.orderData[0].id, updateObj);
    await this.sharedService.loading.dismiss();
    if (res) {
      await this.sharedService.presentAlert('Branch assigned successfully')
    }
    else {
      await this.sharedService.presentAlert('Something went wrong!');
    }

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
    if (this.orderData[0].products[i].totalPieces > 1) {
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
    if (product.parentProductId) {
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
    if (this.orderData[0].rating.createdAt instanceof Date) {
      return this.orderData[0].rating.createdAt;
    } else {
      return this.orderData[0].rating.createdAt.toDate();
    }
  }

  showGenInvoiceBtn() {
    if ((!this.orderData[0].hasOwnProperty('invoice') || (this.orderData[0].invoice.status !== 'generated')) && (!this.orderData[0].hasOwnProperty('orderType') || (this.orderData[0].hasOwnProperty('orderType') && this.orderData[0].orderType !== 'subscription'))) {
      return true;
    } else {
      return false;
    }
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
  await this.presentLoading("Generating invoice, please wait...");
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
      await this.presentLoading("Generating invoice, please wait...");
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

  openImg(url) {
    window.open(url, "_blank");
  }

  getFinalAmount() {
    let amount = this.orderData[0].totalAmountToPaid - this.orderData[0].walletAmount - (this.orderData[0].cashbackAmount || 0);
    if (this.isPartialOrder()) {
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
      cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then((res) => {
      if (res && res.data) {
        this.events.publish('user:getOrderDetailsWithOrderId', this.orderId);
      }
    });
    await modal.present();
  }

  showEditOrderBtn() {
    if (this.orderData[0].hasOwnProperty('autoConfirmOrder') && (this.orderData[0].status === 'Pending' || this.orderData[0].status === 'Confirmed' || this.orderData[0].status === 'Dispatched') && (!this.orderData[0].hasOwnProperty('orderType') || (this.orderData[0].hasOwnProperty('orderType') && this.orderData[0].orderType !== 'subscription'))) {
      return true;
    } else {
      return false;
    }
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

  showUnavailablePrice() {
    if (this.orderData[0].unavailablePrice) {
      return true;
    } else {
      return false;
    }
  }

  getStarColor(rating) {
    return this.sharedService.getStarColor(rating);
  }

  loadMoreOrders(event?) {
    if (this.currentOrders == 'typeSense') {
      this.loadMoreUsersTypeSense(event);
    }
    else if (this.currentOrders == 'pending') {
      this.loadMorePendingOrdersForAdmin()
    }
    else if (this.currentOrders == 'failed') {
      this.loadMorePaymentFailedOrders()
    }
    else if (this.currentOrders == 'paymentPending') {
      this.loadMorePaymentPendingOrders()
    }
    else if (this.currentOrders == 'cancelled') {
      this.loadMoreCancelledOrders()
    }
    else if (this.currentOrders == 'returned') {
      this.loadMoreReturnedOrders()
    }
    else if (this.currentOrders == 'completed') {
      this.loadMoreCompletedOrdersForAdmin()
    }
    else {
      this.loadMoreDispatchedOrdersForAdmin()
    }
  }

  checkProductToDeliver() {
    this.router.navigate(['products-to-deliver']);
  }

  
  async typeSenseSearchQuery() {
    if (this.searchOrder != '') {
      this.page = 1;
      await this.sharedService.presentLoading();
      const typeSenseResponse = await this.searchEngineService.getSearchOrdersFromTypeSenseUsingSingleSearch(this.searchOrder, this.page, 'new_search', []);
      console.log("typeSenseResponse", typeSenseResponse);
      await this.sharedService.loading.dismiss();
      if (typeSenseResponse && typeSenseResponse.status === 'available' && typeSenseResponse.orders.length) {
        this.ordersList = typeSenseResponse.orders;
        this.onClickViewDetails(this.ordersList[0].orderId)
        this.showLoadMoreBtn = true;
        this.currentOrders = 'typeSense';
      } else {
        await this.sharedService.presentAlert("Search item not available!");
        this.resetSearch();
      }
    }
    else {
      await this.sharedService.presentAlert("Please enter valid details!");
    }
  }

  async loadMoreUsersTypeSense(event) {
    console.log('loading more data...');
    this.page += 1;
    const typeSenseResponse = await this.searchEngineService.getSearchOrdersFromTypeSenseUsingSingleSearch(this.searchOrder, this.page, 'existing_search', this.ordersList);
    if (typeSenseResponse && typeSenseResponse.status === 'available' && typeSenseResponse.orders.length) {
      this.ordersList = typeSenseResponse.orders;
      this.onClickViewDetails(this.ordersList[0].orderId);
      this.showLoadMoreBtn = true;
      this.noMoreOrders = false
    } else {
      this.noMoreOrders = true;
    }
    // setTimeout(() => {
    //   event.target.complete();
    // }, 1000);
    // if (this.noMoreUsers === true) {
    //   event.target.disabled = true;
    // }
  }

  async searchOrderById() {
    if (!isNaN(parseInt(this.searchOrder))) {
      this.ordersList = await this.userService.returnOrderDetailsWithOrderId(parseInt(this.searchOrder))
      // console.log(this.ordersList)
      if (this.ordersList && this.ordersList.length > 0) {
        this.onClickViewDetails(this.ordersList[0].orderId)
        this.showLoadMoreBtn = false
      }
      else {
        this.presentAlert('No such order found')
        this.resetSearch()
      }
    } else {
      this.presentAlert('Please enter a valid number')
      return
    }
    // this.events.publish('user:getOrderDetailsWithOrderId', parseInt(this.searchOrder));
  }

  resetSearch() {
    this.searchOrder = ''
    this.showLoadMoreBtn = true
    if (this.currentOrders == 'pending') {
      this.getPendingOrders()
    }
    else if (this.currentOrders == 'failed') {
      this.getPaymentFailedOrders()
    }
    else if (this.currentOrders == 'paymentPending') {
      this.getPaymentPendingOrders()
    }
    else if (this.currentOrders == 'cancelled') {
      this.getCancelledOrders()
    }
    else if (this.currentOrders == 'rejected') {
      this.getRejectedOrders()
    }
    else if (this.currentOrders == 'returned') {
      this.getReturnedOrders()
    }
    else if (this.currentOrders == 'completed') {
      this.getCompletedOrders()
    }
    else {
      this.getDispatchedOrders()
    }
  }


  filterOrder() {
    if (!this.startDate && !this.endDate) {
      let days = (<HTMLInputElement>document.getElementById('days')).value;
      this.currentDays = parseInt(days)
      this.currentFilter = 'Last ' + this.currentDays + ' Days'
      this.endOrders = new Date(new Date().getTime() - (this.currentDays * 24 * 60 * 60 * 1000))
      this.resetSearch()
    }
    else if (!this.startDate || !this.endDate) {
      this.presentAlert('Please enter both start date and end date')
    }
    else {
      this.startOrders = new Date(this.endDate)
      this.endOrders = new Date(this.startDate)
      this.dateFiltered = true;
      this.currentFilter = 'Orders from ' + moment(new Date(this.startDate)).format('D MMM, YYYY') + ' to ' + moment(new Date(this.endDate)).format('D MMM, YYYY')
      this.resetSearch()
    }
  }

  clearFilter() {
    this.startDate = undefined
    this.endDate = undefined
    this.currentDays = 7
    this.currentFilter = 'Last ' + this.currentDays + ' Days'
    this.startOrders = new Date()
    this.endOrders = new Date(new Date().getTime() - (this.currentDays * 24 * 60 * 60 * 1000))
    this.resetSearch()
    this.dateFiltered = true;
  }

  selectDate(dateSelected) {
    this.startDate = undefined
    this.endDate = undefined
    this.currentDays = dateSelected
    this.currentFilter = 'Last ' + this.currentDays + ' Days'
    this.startOrders = new Date()
    this.endOrders = new Date(new Date().getTime() - (this.currentDays * 24 * 60 * 60 * 1000))
    this.resetSearch()
  }

  archiveOrder(id, index) {
    let obj = {
      subStatus: {
        isArchive: true
      }
    };
    this.archiveIndex = index
    this.events.publish('order:updateOrderArchive', id, obj);
  }

  isStatusTimelinePresent(status: string) {
    return this.orderData[0].timeline.hasOwnProperty(status);
  }

  isStatusCancelled(status: string) {
    return ['Cancelled', 'Rejected'].includes(status);
  }

  hideStatuses(status: string) {
    const rejectedHides = ['Confirmed', 'Cancelled', 'Dispatched', 'Delivered', 'Returned'];
    const cancelledHides = ['Rejected', 'Dispatched', 'Delivered', 'Returned'];
    const returnedHides = ['Rejected', 'Cancelled'];
    const cancelOrReturnedStatuses = ['Cancelled', 'Rejected', 'Returned'];

    if(this.orderData[0].status === 'Rejected') {
      return rejectedHides.includes(status);
    }

    if(this.orderData[0].status === 'Cancelled') {
      return cancelledHides.includes(status);
    }

    if(this.orderData[0].status === 'Returned') {
      return returnedHides.includes(status);
    }

    if(!(cancelOrReturnedStatuses.includes(this.orderData[0].status))) {
      return cancelOrReturnedStatuses.includes(status);
    }
  }

  isLastStatus(status: string) {
    return this.orderData[0].status !== 'Returned' && status === 'Delivered';
  }

  activeLabels() {
    this.showLabels = !this.showLabels;
    if (!this.showLabels) {
      this.previousId = 'status2'
      this.currentOrders = 'pending'
      this.resetSearch()
    }
    else {
      this.previousId = 'labelStatus0'
    }
  }

  async addLabel() {
    this.labels.push(this.newLabelName)
    await this.presentLoading();
    let updated = await this.userService.updateOrderLabels(this.labels)
    await this.loading.dismiss()
    if (updated) {
      await this.presentAlert('Label Added Successfully!')
    }
  }

  async deleteLabel(index) {
    this.labels.splice(index, 1)
    await this.presentLoading();
    let deleted = await this.userService.deleteLabels(this.labels)
    await this.loading.dismiss()
    if (deleted) {
      await this.presentAlert('Label Deleted Successfully!')
    }
  }

  async onChangeLabel(event) {
    let selectedLabel = event.target.value;
    await this.presentLoading();
    let assignLabel = await this.userService.assignLabelToOrder(selectedLabel, this.orderData[0].id)
    await this.loading.dismiss()
    if (assignLabel) {
      await this.presentAlert('Label Assigned Successfully!')
    }
  }

  async removeLabel() {
    await this.presentLoading();
    let removeLabel = await this.userService.removeLabel(this.orderData[0].id)
    await delete this.orderData[0].label
    await this.loading.dismiss()
    if (removeLabel) {
      await this.presentAlert('Label Removed Successfully!')
      this.getOrderWithLables(this.currentOrders, this.chosenIndex)
    }
  }

  async editQuotation() {
    const modal = await this.modalController.create({
      componentProps: {
        order: this.orderData[0]
      },
      component: QuotationEditPage,
      cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then((res) => {
      if (res && res.data) {
        console.log('edit order modal res -> ', res.data);
      }
    });
    await modal.present();
  }

  async openChatModal() {
    const modal = await this.modalController.create({
      componentProps: {
        order: this.orderData[0]
      },
      component: QuotationChatPage,
      cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then((res) => {
      if (res && res.data) {
        console.log('edit order modal res -> ', res.data);
      }
    });
    await modal.present();
  }

  async addComment(){
    await this.presentLoading();
    let commentData;
    if (this.orderData[0].orderComment){
      commentData = this.orderData[0].orderComment
    }
    else{
      commentData = ''
    }
    let commentAdded = await this.userService.addComment(this.orderData[0].id,commentData)
    await this.loading.dismiss()
    if (commentAdded){
      await this.presentAlert('Added Comment Successfully!')
    }
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

  async openFilterModal(){
    const modal = await this.modalController.create({
      component: FiltersPage,
      cssClass: 'custom-modal',
      componentProps: {
        selectedFilters: this.filters,
        userDetails: this.user,
        managerDetails: this.managerDetails,
      }
    });
    modal.onDidDismiss().then(res => {
      console.log('modal onDidDismiss...',res);
        if (res && res.data && res.data.filters) {
          console.log('inside dismiss:', this.filters);
          this.filters = res.data.filters;
          this.resetSearch();
        }
        console.log('filter to modal:', this.filters)
    });
    await modal.present();
  }

  getCodAmount() {
    return this.orderData[0].payment.details.amount;
  }

  isAddonAvailable(product) {
    return product.addOns && product.addOns.options && Object.keys(product.addOns.options).length;
  }

  isWalletDeducted() {
    return this.orderData[0].metaData && this.orderData[0].metaData.walletDeducted;
  }

  getPhoneNo(phoneNo: any) {
    if (phoneNo) {
      if (phoneNo.charAt(0) === '0') {
        phoneNo = this.defaultCountryCode + phoneNo;
      }
      return phoneNo;
    }
  }

  getSubTotalPrice() {
    return this.sharedService.getSubTotalPrice(this.orderData[0]);
  }

  getTotalGst() {
      return this.sharedService.getTotalGst(this.orderData[0]);
  }

  async generatePrintingInvoice() {
    await this.sharedService.presentLoading();
    const invoiceRes: any = await this.orderService.generatePrintingInvoice(this.orderData[0].id);
    await this.sharedService.loading.dismiss();
    console.log("invoiceRes", invoiceRes);
    if (invoiceRes && invoiceRes.status === 'generated') {
      await this.sharedService.presentAlert("Printing Invoice generated successfully!");
      window.open(invoiceRes.url, '_blank');
    }
    else {
      await this.sharedService.presentAlert("Invoice generation failed, please try again later.");
    }
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

}