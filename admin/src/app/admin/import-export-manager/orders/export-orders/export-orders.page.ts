import { Component, OnInit } from '@angular/core';
import { ImportExportManagerService } from 'src/app/services/import-export-manager/import-export-manager.service';
import * as moment from 'moment';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UserService } from 'src/app/services/user/user.service';
import { ExportToCsv } from 'export-to-csv';
import { ProductService } from 'src/app/services/product/product.service';
import { PickUpService } from 'src/app/services/pickUp/pick-up.service';
import { ModalController, AlertController, NavController, LoadingController, ToastController, Events } from '@ionic/angular';
@Component({
  selector: 'app-export-orders',
  templateUrl: './export-orders.page.html',
  styleUrls: ['./export-orders.page.scss'],
})
export class ExportOrdersPage implements OnInit {
  archiveOrderState: boolean = true;
  isDisableDatePicker: boolean = true;
  totalOrders: any
  allOrders: any = []
  filteredOrders: any = []
  currentOrderStatus: string = 'Confirmed'
  loading: any;
  datePreset: number
  disableDatePickerRange: boolean = false
  startOrders = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  endOrders = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000))
  receivedStart: boolean = false
  dateObj = {
    startDate: '',
    endDate: ''
  }
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    filename: 'Orders',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Exported Orders',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
  
  constructor(
    private importExportManagerService: ImportExportManagerService,
    private sharedService: SharedService,
    private userService: UserService,
    private pickup: PickUpService,
    private toastController: ToastController,
    private loadingController: LoadingController,
  ) {}
  
  ngOnInit() {}

  animation() {
    document.querySelector('.disable-date').animate(
      [
        { opacity: '0.2' },
        { opacity: '0' },
      ],
      {
        duration: 400,
      }
    );
  }
  
  
  async ionViewWillEnter() {
    await this.sharedService.presentLoading();
    this.totalOrders = await this.importExportManagerService.getAllOrdersLength()
    this.allOrders = await this.importExportManagerService.getAllConfirmedOrders()
    // this.filteredOrders = this.allOrders
    console.log('Total Orders : ', this.totalOrders)
    console.log('All Orders : ', this.allOrders)
    await this.sharedService.loading.dismiss();
  }

  async presentToastWithOptions(header: string, message: string, errorCode: string) {
    const toast = await this.toastController.create({
      mode: 'ios',
      color: 'dark',
      header: header,
      message: message,
      duration: 4000,
      position: 'top',
      buttons: [
        {
          side: 'start',
          text: errorCode,
          handler: () => {
            console.log('Favorite clicked');
          }
        }
      ]
    });
    toast.present();
  }


  saveDisable() {
    if (this.allOrders && this.allOrders.length) {
      return false
    } else {
      return true
    }
  }

  async disableArchiveState() {
    this.archiveOrderState = !this.archiveOrderState
    console.log('archiveOrderState : ', this.archiveOrderState)
    await this.setOrderStatus(this.currentOrderStatus)
  }

  disableDatePicker() {
    if (this.isDisableDatePicker) {
      // this.datePreset = 7
      // console.log('default date preset : ', this.datePreset)
      this.animation()
      setTimeout(() => {
        this.isDisableDatePicker = !this.isDisableDatePicker;
      }, 400)
    }
    else {
      this.datePreset = undefined
      this.isDisableDatePicker = !this.isDisableDatePicker;
    }
  }

  async filterDate(state: string) {
    if (state === 'start') {
      if (this.dateObj.startDate) {
        this.receivedStart = true
        if (this.dateObj.endDate) {
          this.allOrders = await this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.dateObj.endDate), new Date(this.dateObj.startDate))
          // console.log('111 this.startDate = ' + this.startOrders)
          // this.startOrders = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
          // this.endOrders = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000))
        }
      } else {
        this.receivedStart = false
      }
    }
    if (state === 'end') {
      if (this.receivedStart) {
        if (this.dateObj.endDate) {
          this.allOrders = await this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.dateObj.endDate), new Date(this.dateObj.startDate))
          // console.log('222 this.startDate = ' + this.startOrders)
          // this.startOrders = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
          // this.endOrders = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000))
        }
      } else {
        await this.presentToastWithOptions('Date Range Warning!', `Please select both end & start date!`, 'WAR-127')  
      }
    }
    if (!this.archiveOrderState) {
      this.filterArchiveOrders()
    }
  }

  async alertDatePicker() {
    if (this.isDisableDatePicker) {
      await this.presentToastWithOptions('Date Picker Warning!', `Enable the date range module via the toggle to proceed!`, 'WAR-124')
    }
  }

  filterArchiveOrders() {
    let filteredOrders = []
    for (let i = 0; i < this.allOrders.length; i++) {
      if (this.allOrders[i].subStatus && this.allOrders[i].subStatus.isArchive) {
        // filteredOrders.push(this.allOrders[i])
      } else {
        filteredOrders.push(this.allOrders[i])
      }
    }
    this.allOrders = []
    this.allOrders = filteredOrders
  }

  async setOrderStatus(status: string) {
    await this.sharedService.presentLoading();
    this.currentOrderStatus = status
    this.allOrders = []
    switch (status) {
      case 'Confirmed':
        if (this.datePreset) {
          this.allOrders = await this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders)
        } else {
          this.allOrders = await this.importExportManagerService.getAllConfirmedOrders()
        }
        break;
      case 'Pending':
        if (this.datePreset) {
          this.allOrders = await this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders)
        } else {
          this.allOrders = await this.importExportManagerService.getAllPendingOrders()
        }
        break;
      case 'Dispatched':
        if (this.datePreset) {
          this.allOrders = await this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders)
        } else {
          this.allOrders = await this.importExportManagerService.getAllDispatchedOrders()
        }
        break;
      case 'Delivered':
        if (this.datePreset) {
          this.allOrders = await this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders)
        } else {
          this.allOrders = await this.importExportManagerService.getAllDeliveredOrders()
        }
        break;
      case 'Cancelled':
        if (this.datePreset) {
          this.allOrders = await this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders)
        } else {
          this.allOrders = await this.importExportManagerService.getAllCancelledOrders()
        }
        break;
      case 'Rejected':
        if (this.datePreset) {
          this.allOrders = await this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders)
        } else {
          this.allOrders = await this.importExportManagerService.getAllRejectedOrders()
        }
        break;
      case 'Returned':
        if (this.datePreset) {
          this.allOrders = await this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders)
        } else {
          this.allOrders = await this.importExportManagerService.getAllReturnedOrders()
        }
        break;
      case 'Payment Pending':
        if (this.datePreset) {
          this.allOrders = await this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders)
        } else {
          this.allOrders = await this.importExportManagerService.getAllPaymentPendingOrders()
        }
        break;
    }
    if (!this.archiveOrderState) {
      this.filterArchiveOrders()
    }
    await this.sharedService.loading.dismiss();
    console.log(`selection ${status} : `, this.allOrders.length)
    // this.filteredOrders = this.allOrders
  }

  async customCaller(status: string) {
    this.allOrders = []
    switch (status) {
      case 'Confirmed':
        this.allOrders = await this.importExportManagerService.getAllConfirmedOrders()
        break;
      case 'Pending':
        this.allOrders = await this.importExportManagerService.getAllPendingOrders()
        break;
      case 'Dispatched':
        this.allOrders = await this.importExportManagerService.getAllDispatchedOrders()
        break;
      case 'Delivered':
        this.allOrders = await this.importExportManagerService.getAllDeliveredOrders()
        break;
      case 'Cancelled':
        this.allOrders = await this.importExportManagerService.getAllCancelledOrders()
        break;
      case 'Rejected':
        this.allOrders = await this.importExportManagerService.getAllRejectedOrders()
        break;
      case 'Returned':
        this.allOrders = await this.importExportManagerService.getAllReturnedOrders()
        break;
      case 'Payment Pending':
        this.allOrders = await this.importExportManagerService.getAllPaymentPendingOrders()
        break;
    }
  }

  async setDateRange(type: string, date: number) {
    await this.sharedService.presentLoading();
    if (type === 'preset') {
      this.datePreset = date
      if (this.datePreset == 0) {
        this.disableDatePickerRange = false
        await this.customCaller(this.currentOrderStatus)
      } else {
        this.disableDatePickerRange = true
        this.allOrders = []
        this.endOrders = new Date(new Date().getTime() - (this.datePreset * 24 * 60 * 60 * 1000))
        this.allOrders = await this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders)
      }
      console.log('selected date preset : ', this.datePreset)
    }
    if (!this.archiveOrderState) {
      this.filterArchiveOrders()
    }
    await this.sharedService.loading.dismiss();
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

  getDateTimeFormat(date) {
    return moment(date).format('MMM D, YYYY hh:mm a');
  }

  async presentLoading(msg?, duration?) {
    this.loading = await this.loadingController.create({
      message: msg || 'Please Wait...',
    });
    await this.loading.present();
  }

  async exportAllOrders() {
    this.allOrders = await this.importExportManagerService.getAllOrders()
    // console.log('this.allOrders : ', this.allOrders)
    await this.exportOrdersHandler()
  }

  async exportOrdersHandler() {
    await this.presentLoading();
    // *** Date toggle on
    if ((!this.isDisableDatePicker)) {
      console.log('execute with datePreset')
      console.log('Date Preset : ', this.datePreset)
      console.log('Date Object : ', this.dateObj)
      if (((this.datePreset === undefined) || (this.datePreset == 0)) && ((this.dateObj['startDate'] === '') && (this.dateObj['endDate'] === ''))) {
        console.log('none selected')
        await this.presentToastWithOptions('Date Picker Error!', `Select either the date preset or the date range for filtering the orders!`, 'ERR-164')
        return
      } else {
        console.log('selected')
        if ((this.datePreset) && (this.datePreset != 0)) {
          console.log('got preset')
          this.allOrders = []
          this.endOrders = new Date(new Date().getTime() - (this.datePreset * 24 * 60 * 60 * 1000))
          console.log('this.endOrders : ', this.endOrders)
          this.allOrders = await this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders)
          console.log('allOrders : ', this.allOrders)
          // this.dateObj.startDate = ''
          // this.dateObj.endDate = ''
          // this.datePreset = 0
        }
        if ((this.dateObj['startDate'] && this.dateObj['endDate'])) {
          console.log('got range')
          this.allOrders = []
          this.startOrders = new Date(this.dateObj['endDate'])
          this.endOrders = new Date(this.dateObj['startDate'])
          console.log('startOrders : ', this.startOrders)
          console.log('endOrders : ', this.endOrders)
          this.allOrders = await this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, this.startOrders, this.endOrders)
          console.log('allOrders : ', this.allOrders)
          // this.dateObj.startDate = ''
          // this.dateObj.endDate = ''
          // this.datePreset = 0
        }
      }
    }
    console.log('execute without datePreset')
    this.options.filename = this.currentOrderStatus + ' ' + new Date().toLocaleString()
    this.options.title = this.currentOrderStatus + ' ' + new Date().toLocaleString()
    if (this.currentOrderStatus == 'Failed') {
      this.options.filename = 'Pending' + ' ' + new Date().toLocaleString()
      this.options.title = 'Pending' + ' ' + new Date().toLocaleString()
    } else if (this.currentOrderStatus == 'Pending') {
      this.options.filename = 'Confirmed' + ' ' + new Date().toLocaleString()
      this.options.title = 'Confirmed' + ' ' + new Date().toLocaleString()
    }
    let data = [], count = 0;
    for (const order of this.allOrders) {
      count++
      // console.log('count : ', count)
      if (order.deliveryAgentId) {
        let data = await this.pickup.getDeliveryAgentName(order.deliveryAgentId)
        order['deliveryName'] = (data && data['name']) ? data['name'] : '';
        order['deliveryPhoneNo'] = (data && data['phoneNo']) ? `[ ${data['phoneNo']} ]` : '';
      }
      else {
        order['deliveryName'] = ''
        order['deliveryPhoneNo'] = '';
      }
      let products: any = {}, delivery_date = '';
      if (order.products) {
        products = this.getProducts(order.products);
      }
      // if (order.scheduledDate && order.scheduledDate !== '' && order.scheduledDate !== {}) {
      if (order.scheduledDate && order.scheduledDate !== '') {
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
      order.products.forEach((product, index) => {
        quantityAll = quantityAll + this.getProductQty(index, order);
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
      });
      let totalAmount2Decimal = 0
      if (!isNaN(parseFloat(order.defaultGst)) && order.defaultGst !== undefined) {
        totalAmount2Decimal = totalAmount2Decimal + parseFloat(order.defaultGst.toFixed(2))
      }
      let obj = {
        sno: count,
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
        deliveryPhoneNo: order.deliveryPhoneNo || '',
        deliveryDate: order.timeline ? order.timeline.Delivered ? this.getDateTimeFormat(order.timeline.Delivered.time.toDate()) : '' : '',
        customerGST: order.customerGstNo ? order.customerGstNo : ''
      }
      obj.createdBy = order.metaData && order.metaData.orderBy ? `${order.metaData.orderBy.role} - ${order.metaData.orderBy.name}` : order.userName || 'NA';
      data.push(obj);
      for (let index = 0; index < order.products.length; index++) {
        const product = order.products[index];
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
          orderId: order.orderId ? order.orderId : '',
          name: order.address && order.address.name ? order.address.name : '',
          address: order.address && order.address.address ? order.address.address : '',
          city: order.address && order.address.city ? order.address.city : '',
          state: order.address && order.address.state ? order.address.state : '',
          pincode: order.address && order.address.pincode ? order.address.pincode : '',
          phone: order.address && order.address.phoneNo ? `[ ${order.address.phoneNo} ]` : '',
          date: order.createdAt && order.createdAt.toDate() ? this.getDateTimeFormat(order.createdAt.toDate()) : '',
          status: order.status ? order.status.toUpperCase() : '',
          createdBy: order.userName || 'NA',
          productName: product['name'] ? product['name'] : '',
          productCode: product['sku'] ? product['sku'] : '',
          productQuantity: this.getProductQty(index, order),
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
          deliveryPhoneNo: '',
          deliveryDate: '',
          customerGST: ''
        })
      }
    }
    const csvExporter = new ExportToCsv(this.options);
    csvExporter.generateCsv(data);
    await this.loading.dismiss();
  }

  getProductQty(index, order) {
    if('unavailable' in order && order.unavailable[index]) {
      return order.products[index].quantity - order.unavailable[index];
    } else {
      return order.products[index].quantity;
    }
  }

}
