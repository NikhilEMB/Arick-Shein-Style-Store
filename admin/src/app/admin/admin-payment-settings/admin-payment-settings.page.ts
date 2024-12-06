import { Component, OnInit } from '@angular/core';
import { Events, LoadingController, AlertController, ActionSheetController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LabelService } from 'src/app/services/label/label.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { Camera } from '@ionic-native/camera/ngx';
import { LogglyLoggerService } from 'src/app/services/loggly-logger/loggly-logger.service'
import { PaymentGatewaySettingsPage } from './payment-gateway-settings/payment-gateway-settings.page';

@Component({
  selector: 'app-admin-payment-settings',
  templateUrl: './admin-payment-settings.page.html',
  styleUrls: ['./admin-payment-settings.page.scss'],
})
export class AdminPaymentSettingsPage implements OnInit {
  paytmActive: boolean;
  paytmMerchantId: string = '';
  paytmKey: string = ''
  razorpayActive: boolean;
  razorpayInstantRefund: boolean;
  razorpayId: string = '';
  razorpayKeySecret: string = '';
  autoConfirmOrder: boolean;
  gstNo: string = '';
  defaultGst: string = '';
  minOrderAmount: string = '';
  maxOrderAmount: string = '';
  isPackagingCharges: boolean;
  packaging: any = {
    label: '',
    price: ''
  }
  loading: any;
  showLoader: boolean = true;
  isGstApplicable: boolean = true;
  panNo: string = '';
  isCod: boolean = true;
  codPercentage = 100;
  ADMIN_PAYMENT_SETTINGS_LABELS: any = {};
  SHARED_LABELS: any = {};
  upiManual = {
    active: false,
    upiId: '',
    qrCode: ''
  }
  currencyCode: string;
  taxName: string;
  generateInvoice = true;
  custom = {
    active: false,
    name: '',
    details: '',
    image: {
      url: ''
    },
    textMandatory: false,
    imageMandatory: false
  }
  sidemenu = []
  selectedId = '0'
  isCashFreeFeature = false

  extraCharges: any = 0;
  extraChargeType = 'flat';

  extraChargesRazorpay: any = 0;
  extraChargeTypeRazorpay = 'flat';
  maxChargeRazorpay: any = 0;
  chargeNameRazorpay: any = '';

  extraChargesPaytm: any = 0;
  extraChargeTypePaytm = 'flat';
  maxChargePaytm: any = 0;
  chargeNamePaytm: any = '';

  charCOD: any = this.configService.environment.currencyCode;
  charRZP: any = this.configService.environment.currencyCode;
  charPT: any = this.configService.environment.currencyCode;
  toggleStateCOD: any = 'flt';
  toggleStateRZP: any = 'flt';
  toggleStatePT: any = 'flt';
  maxCharge: any = 0;
  chargeName: any = '';

  constructor(private events: Events,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private labelService: LabelService,
    private configService: ConfigService,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private logglyService: LogglyLoggerService,
    private modalController: ModalController) { }
  ngOnInit() {
    this.initializeSubscriptions();
    this.currencyCode = this.configService.environment.currencyCode;
    this.taxName = this.configService.environment.taxName;
    this.isCashFreeFeature = (this.configService.environment.cashfree && this.configService.environment.cashfree.production)
    this.sidemenu.push('Auto Confirm Order', 'Generate Invoice', 'GST Applicable', this.taxName, 'Minimum Order Amount', 'Maximum Order Amount',
      'Allow Cash on Delivery')
    if (this.isCod) {
      this.sidemenu.push('Cash On Delivery')
    }
    this.sidemenu.push('RazorPay Settings', 'Paytm Settings', 'Payment Gateways', 'UPI Payment Settings', 'Custom Payment Option')
  }
  ionViewWillEnter() {
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.ADMIN_PAYMENT_SETTINGS_LABELS = this.labelService.labels['ADMIN_PAYMENT_SETTINGS'];
  }
  ngOnDestroy() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('admin-settings:savePaymentSettingsDataSuccess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert(`${this.ADMIN_PAYMENT_SETTINGS_LABELS['data_saved_successfully']}`);
    });
    this.events.subscribe('admin-settings:publishPaytmData', (data) => {
      this.showLoader = false;
      if (!this.isEmptyObj(data)) {
        this.paytmActive = data.active;
        this.paytmKey = data.key;
        this.paytmMerchantId = data.merchantId;
        this.extraChargesPaytm = data.extraChargePaytm ? (data.extraChargePaytm.charge ? data.extraChargePaytm.charge : 0) : 0;
        this.extraChargeTypePaytm = data.extraChargePaytm ? (data.extraChargePaytm.type ? data.extraChargePaytm.type : 'flat') : 'flat';
        this.maxChargePaytm = data.extraChargePaytm ? (data.extraChargePaytm.maxCharge ? data.extraChargePaytm.maxCharge : 0) : 0;
        this.chargeNamePaytm = data.extraChargePaytm ? (data.extraChargePaytm.chargeName ? data.extraChargePaytm.chargeName : '') : '';

        // toggle state & char
        if (data.extraChargePaytm && data.extraChargePaytm.type == 'percentage') {
          this.toggleStatePT = 'perc';
          this.charPT = '%';
        }
      }
    });
    this.events.subscribe('admin-settings:publishRazorPayData', (data) => {
      if (!this.isEmptyObj(data)) {
        this.razorpayActive = data.active;
        this.razorpayId = data.id;
        this.razorpayInstantRefund = data.instantRefund ? data.instantRefund : false
        this.razorpayKeySecret = data.keySecret ? data.keySecret : '';
        this.extraChargesRazorpay = data.extraChargeRazorpay ? (data.extraChargeRazorpay.charge ? data.extraChargeRazorpay.charge : 0) : 0;
        this.extraChargeTypeRazorpay = data.extraChargeRazorpay ? (data.extraChargeRazorpay.type ? data.extraChargeRazorpay.type : 'flat') : 'flat';
        this.maxChargeRazorpay = data.extraChargeRazorpay ? (data.extraChargeRazorpay.maxCharge ? data.extraChargeRazorpay.maxCharge : 0) : 0;
        this.chargeNameRazorpay = data.extraChargeRazorpay ? (data.extraChargeRazorpay.chargeName ? data.extraChargeRazorpay.chargeName : '') : '';

        // toggle state & char
        if (data.extraChargeRazorpay && data.extraChargeRazorpay.type == 'percentage') {
          this.toggleStateRZP = 'perc';
          this.charRZP = '%';
        }
      }
      this.events.publish('admin-settings:getPaytmData');
    });
    this.events.subscribe('admin-settings:publishPaymentInfoData', (data) => {
      if (this.loading) {
        this.loading.dismiss();
      }
      if (!this.isEmptyObj(data)) {
        this.autoConfirmOrder = data.autoConfirmOrder;
        this.gstNo = data.gstNo;
        this.defaultGst = data.defaultGst;
        this.minOrderAmount = data.minOrderAmount;
        this.maxOrderAmount = data.maxOrderAmount;
        this.isPackagingCharges = data.isPackagingCharges;
        if (!this.isEmptyObj(data.packaging)) {
          this.packaging.label = data.packaging.label;
          this.packaging.price = data.packaging.price;
        }
        this.isGstApplicable = typeof data.isGstApplicable !== 'undefined' ? data.isGstApplicable : true;
        this.isCod = typeof data.isCod !== 'undefined' ? data.isCod : true;
        this.codPercentage = data.codPercentage ? data.codPercentage : 100;
        this.panNo = data.panNo ? data.panNo : '';
        this.upiManual = data.upiManual ? data.upiManual : this.upiManual;
        this.generateInvoice = typeof data.generateInvoice !== 'undefined' ? data.generateInvoice : true;
        this.custom = data.custom ? data.custom : this.custom;
        this.extraCharges = data.extraCharge ? (data.extraCharge.charge ? data.extraCharge.charge : 0) : 0;
        this.extraChargeType = data.extraCharge ? (data.extraCharge.type ? data.extraCharge.type : 'flat') : 'flat';
        this.maxCharge = data.extraCharge ? (data.extraCharge.maxCharge ? data.extraCharge.maxCharge : 0) : 0;
        this.chargeName = data.extraCharge ? (data.extraCharge.chargeName ? data.extraCharge.chargeName : '') : '';

        // toggle state & char
        if (data.extraCharge && data.extraCharge.type == 'percentage') {
          this.toggleStateCOD = 'perc';
          this.charCOD = '%';
        }
      }
      this.events.publish('admin-settings:getRazorPayData');
    });

    this.presentLoading()
    this.events.publish('admin-settings:getPaymentInfoData');
  }

  isEmptyObj(object) {
    for (var key in object) {
      if (object.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  paytmToggleChange() {
    if (this.paytmActive) {
      this.paytmActive = false;
    } else {
      this.paytmActive = true;
    }
  }
  razorpayToggleChange() {
    if (this.razorpayActive) {
      this.razorpayActive = false;
    } else {
      this.razorpayActive = true;
    }
  }
  async onClickSavePaymentSettings() {
    if (this.isCod && (this.codPercentage > 100 || this.codPercentage < 0)) {
      this.presentAlert('Please enter appropriate COD Percentage');
    }
    else if (this.upiManual.active && (!this.upiManual.upiId || !this.upiManual.qrCode)) {
      this.presentAlert(this.ADMIN_PAYMENT_SETTINGS_LABELS['enter_upi_or_qr'])
    }
    else if (this.custom.active && (!this.custom.name)) {
      this.presentAlert('Please provide Payment Option Name under Custom Payment Option');
    } else {
      await this.presentLoading();
      const paymentData = {
        paytmActive: this.paytmActive ? this.paytmActive : false,
        paytmMerchantId: this.paytmMerchantId,
        paytmKey: this.paytmKey,
        extraChargePaytm: {
          type: this.extraChargeTypePaytm || 'flat',
          charge: this.extraChargesPaytm || 0,
          maxCharge: this.maxChargePaytm || 0,
          chargeName: this.chargeNamePaytm || ''
        },
        razorpayActive: this.razorpayActive ? this.razorpayActive : false,
        razorpayId: this.razorpayId,
        razorpayKeySecret: this.razorpayKeySecret,
        razorpayInstantRefund: this.razorpayInstantRefund ? this.razorpayInstantRefund : false,
        extraChargeRazorpay: {
          type: this.extraChargeTypeRazorpay || 'flat',
          charge: this.extraChargesRazorpay || 0,
          maxCharge: this.maxChargeRazorpay || 0,
          chargeName: this.chargeNameRazorpay || ''
        },
        autoConfirmOrder: this.autoConfirmOrder ? this.autoConfirmOrder : false,
        gstNo: this.gstNo,
        defaultGst: this.defaultGst,
        minOrderAmount: this.minOrderAmount,
        maxOrderAmount: this.maxOrderAmount,
        isPackagingCharges: this.isPackagingCharges ? this.isPackagingCharges : false,
        packaging: {
          label: this.packaging.label,
          price: this.packaging.price
        },
        isGstApplicable: this.isGstApplicable,
        isCod: this.isCod,
        codPercentage: this.codPercentage,
        panNo: this.panNo,
        upiManual: this.upiManual,
        generateInvoice: this.generateInvoice,
        custom: this.custom,
        extraCharge: {
          type: this.extraChargeType || 'flat',
          charge: this.extraCharges || 0,
          maxCharge: this.maxCharge || 0,
          chargeName: this.chargeName || ''
        }
      }
      this.events.publish('admin-settings:savePaymentSettingsData', paymentData);
    }
  }
  async presentAlert(desc: any) {
    const alert = await this.alertController.create({
      message: desc,
      buttons: [`${this.SHARED_LABELS['ok']}`]
    });
    await alert.present();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: this.SHARED_LABELS['please_wait'],
    });
    await this.loading.present();
  }

  autoConfirmOrderToggle() {
    this.autoConfirmOrder = !this.autoConfirmOrder;
  }

  packagingToggle() {
    this.isPackagingCharges = !this.isPackagingCharges;
  }

  gstToggle() {
    this.isGstApplicable = !this.isGstApplicable;
  }

  codToggleChange() {
    this.isCod = !this.isCod;
  }

  upiManualToggle() {
    this.upiManual.active = !this.upiManual.active;
  }

  removeImage(customPayment?) {
    if (customPayment) {
      this.custom.image.url = '';
    } else {
      this.upiManual.qrCode = '';
    }
  }

  onDrop(files: FileList, customPayment?) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        let base64Image: any = event.target.result;
        if (customPayment) {
          this.custom.image.url = '';
          this.custom.image.url = base64Image;
        } else {
          this.upiManual.qrCode = '';
          this.upiManual.qrCode = base64Image;
        }
      }
    }
  }
  generateInvoiceToggle() {
    this.generateInvoice = !this.generateInvoice;
  }

  removeSubscriptions() {
    this.events.subscribe('admin-settings:savePaymentSettingsDataSuccess');
    this.events.subscribe('admin-settings:publishPaytmData');
    this.events.subscribe('admin-settings:publishRazorPayData');
    this.events.subscribe('admin-settings:publishPaymentInfoData');
  }


  async openGatewaySettings(gatewayChoice) {
    const modal = await this.modalController.create({
      component: PaymentGatewaySettingsPage,
      backdropDismiss: false,
      cssClass: 'custom-modal',
      componentProps: {
        gatewayChoice: gatewayChoice,
      }
    });
    modal.onDidDismiss()
      .then((res) => {
        // if(res.data) {
        //   res.data.forEach(variantIndex => {
        //     this.productsAdded.push(this.getCartObj(product, variantIndex));
        //     this.statusIndex = 4;
        //   });
        // }
      });
    await modal.present();
  }

  changeComponent(index) {
    let prevMsgDiv = document.getElementById(this.selectedId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById(index.toString());
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.selectedId = index.toString()
  }

  extraChargesType(event: any) {
    this.extraChargeType = event.target.checked ? 'percentage' : 'flat';
    console.log('Type :', this.extraChargeType);
    console.log('Charge :', this.extraCharges);
    console.log('Max Charge :', this.maxCharge);
    console.log('Charge Name:', this.chargeName);
    if (event.target.checked) {
      this.charCOD = '%';
      this.toggleStateCOD = 'perc';
    } else {
      this.charCOD = this.currencyCode;
      this.toggleStateCOD = 'flt';
    }
    console.log('char :', this.charCOD)
  }

  extraChargesTypeRazorpay(event: any) {
    this.extraChargeTypeRazorpay = event.target.checked ? 'percentage' : 'flat';
    console.log('Type Razorpay :', this.extraChargeTypeRazorpay);
    console.log('Charge Razorpay :', this.extraChargesRazorpay);
    console.log('Max Charge Razorpay :', this.maxChargeRazorpay);
    console.log('Charge Name Razorpay :', this.chargeNameRazorpay);
    if (event.target.checked) {
      this.charRZP = '%';
      this.toggleStateRZP = 'perc';
    } else {
      this.charRZP = this.currencyCode;
      this.toggleStateRZP = 'flt';
    }
    console.log('char :', this.charRZP)
  }

  extraChargesTypePaytm(event: any) {
    this.extraChargeTypePaytm = event.target.checked ? 'percentage' : 'flat';
    console.log('Type Paytm :', this.extraChargeTypePaytm);
    console.log('Charge Paytm :', this.extraChargesPaytm);
    console.log('Max Charge Paytm:', this.maxChargePaytm);
    console.log('Charge Name Paytm:', this.chargeNamePaytm);
    if (event.target.checked) {
      this.charPT = '%';
      this.toggleStatePT = 'perc';
    } else {
      this.charPT = this.currencyCode;
      this.toggleStatePT = 'flt';
    }
    console.log('char :', this.charPT)
  }

  razorpayInstantRefundToggleChange() {
    this.razorpayInstantRefund = !this.razorpayInstantRefund
  }

}