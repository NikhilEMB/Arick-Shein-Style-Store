import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ModalController, Events, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { LabelService } from 'src/app/services/label/label.service';
import * as moment from 'moment';

@Component({
    selector: 'app-create-subscription',
    templateUrl: './create-subscription.page.html',
    styleUrls: ['./create-subscription.page.scss'],
})
export class CreateSubscriptionPage implements OnInit {
    headerText = '';
    SHARED_LABELS: any;
    CREATE_SUBSCRIPTION_LABELS: any;
    product: any;
    subSettings: any;
    currencyCode: any;
    subData = {
        qtyPerDay: 1,
        product: null,
        type: 'daily',
        active: true,
        deliverySlot: {},
        deliveryDays: [],
        deliveryDates: [],
        totalDeliveries: 0,
        totalWeeks: 0,
        totalMonths: 0,
        discount: 0,
        totalMrp: 0,
        offerDiscount: 0,
        amountPayable: 0
    };
    days = [];
    dates = [{ date: '01', active: false },
    { date: '02', active: false },
    { date: '03', active: false },
    { date: '04', active: false },
    { date: '05', active: false },
    { date: '06', active: false },
    { date: '07', active: false },
    { date: '08', active: false },
    { date: '09', active: false },
    { date: '10', active: false },
    { date: '11', active: false },
    { date: '12', active: false },
    { date: '13', active: false },
    { date: '14', active: false },
    { date: '15', active: false },
    { date: '16', active: false },
    { date: '17', active: false },
    { date: '18', active: false },
    { date: '19', active: false },
    { date: '20', active: false },
    { date: '21', active: false },
    { date: '22', active: false },
    { date: '23', active: false },
    { date: '24', active: false },
    { date: '25', active: false },
    { date: '26', active: false },
    { date: '27', active: false },
    { date: '28', active: false },
    { date: '29', active: false },
    { date: '30', active: false },
    { date: '31', active: false }];
    totalDeliveries: number;
    totalMonths: number;
    totalWeeks: number;
    timeSchedules = [];
    deliveryTime = null;
    loading: any;
    constructor(private labelService: LabelService,
        private modalController: ModalController,
        private configService: ConfigService,
        private events: Events,
        private toastController: ToastController,
        private router: Router,
        private alertController: AlertController,
        private storage: Storage,
        private loadingController: LoadingController) { }

    ngOnInit() {
        this.currencyCode = this.configService.environment.currencyCode;
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.CREATE_SUBSCRIPTION_LABELS = this.labelService.labels['CREATE_SUBSCRIPTION'];
        this.headerText = this.CREATE_SUBSCRIPTION_LABELS['header_text'];
        console.log('product', this.product);
        console.log('subSettings', this.subSettings);
        this.totalDeliveries = this.subSettings.dailyDeliveries.min;
        this.subData.discount = this.product.data.subscription.dailyDiscount ? this.product.data.subscription.dailyDiscount : 0;
        setTimeout(() => {
            this.product.data.discountedPrice = this.product.data.prodPrice - (this.product.data.prodPrice * (this.subData.discount / 100));
            this.product.data.prodName = !this.product.data.isPriceList ? this.product.data.prodName : `${this.product.data.prodName} (${this.product.data.variantValue})`;
            this.product.data.prodDesc = !this.product.data.isPriceList ? '' : this.product.data.variantValue;
        }, 100);
    }

    ionViewWillEnter() {
        this.initialiseSubscriptions();
        this.events.publish('delivery-settings:getDeliverySettingsData');
    }

    ionViewWillLeave() {
        this.removeSubscriptions();
    }

    initialiseSubscriptions() {
        this.events.subscribe('delivery-settings:publishDeliverySettingsData', (data) => {
            if (!this.isEmptyObj(data)) {
                if (data.deliveryDays.length > 0) {
                    for (const day of data.deliveryDays) {
                        this.days.push({ day: day, active: true });
                    }
                } else {
                    const days = [
                        { day: 'Sunday', active: true },
                        { day: 'Monday', active: true },
                        { day: 'Tuesday', active: true },
                        { day: 'Wednesday', active: true },
                        { day: 'Thursday', active: true },
                        { day: 'Friday', active: true },
                        { day: 'Saturday', active: true }
                    ];
                    for (const day of days) {
                        this.days.push(day);
                    }
                }

                if (data.timeSchedules.length > 0) {
                    this.timeSchedules = data.timeSchedules;
                }
            }
        });
    }

    isEmptyObj(object) {
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    decrementQuantity() {
        if (this.subData.qtyPerDay > 1) {
            this.subData.qtyPerDay -= 1;
        }
    }

    incrementQuantity() {
        this.subData.qtyPerDay += 1;
    }

    setSubType(type: string) {
        if (type === 'daily') {
            this.totalDeliveries = this.subSettings.dailyDeliveries.min;
            this.subData.discount = this.product.data.subscription.dailyDiscount ? this.product.data.subscription.dailyDiscount : 0;
            this.product.data.discountedPrice = this.product.data.prodPrice - (this.product.data.prodPrice * (this.subData.discount / 100));
        } else if (type === 'weekly') {
            this.totalDeliveries = this.subSettings.weeklyDeliveries.min;
            this.subData.discount = this.product.data.subscription.weeklyDiscount ? this.product.data.subscription.weeklyDiscount : 0;
            this.product.data.discountedPrice = this.product.data.prodPrice - (this.product.data.prodPrice * (this.subData.discount / 100));
        } else {
            this.totalDeliveries = this.subSettings.monthlyDeliveries.min;
            this.subData.discount = this.product.data.subscription.monthlyDiscount ? this.product.data.subscription.monthlyDiscount : 0;
            this.product.data.discountedPrice = this.product.data.prodPrice - (this.product.data.prodPrice * (this.subData.discount / 100));
        }
        this.subData.type = type;
    }

    daySelectToggle(i) {
        this.days[i].active = !this.days[i].active;
    }
    dateSelectToggle(i) {
        this.dates[i].active = !this.dates[i].active;
        console.log('this.dates', this.dates);
    }

    decrementDeliveries() {
        let minDeliveries;
        if (this.subData.type === 'daily') {
            minDeliveries = this.subSettings.dailyDeliveries.min;
        } else if (this.subData.type === 'weekly') {
            minDeliveries = this.subSettings.weeklyDeliveries.min;
        } else {
            minDeliveries = this.subSettings.monthlyDeliveries.min;
        }
        if (this.totalDeliveries > minDeliveries) {
            this.totalDeliveries -= 1;
        }
        if(this.totalDeliveries === minDeliveries) {
          this.presentToast(`Min value should be ${minDeliveries}`);
        }
    }

    incrementDeliveries() {
        let maxDeliveries;
        if (this.subData.type === 'daily') {
            maxDeliveries = this.subSettings.dailyDeliveries.max;
        } else if (this.subData.type === 'weekly') {
            maxDeliveries = this.subSettings.weeklyDeliveries.max;
        } else {
            maxDeliveries = this.subSettings.monthlyDeliveries.max;
        }
        if (this.totalDeliveries < maxDeliveries) {
            this.totalDeliveries += 1;
        }
        if(this.totalDeliveries === maxDeliveries) {
          this.presentToast(`Max value can be ${maxDeliveries}`);
        }
    }

    deliveriesInput() {
        let maxDeliveries;
        if (this.subData.type === 'daily') {
            maxDeliveries = this.subSettings.dailyDeliveries.max;
        } else if (this.subData.type === 'weekly') {
            maxDeliveries = this.subSettings.weeklyDeliveries.max;
        } else {
            maxDeliveries = this.subSettings.monthlyDeliveries.max;
        }
        let minDeliveries;
        if (this.subData.type === 'daily') {
            minDeliveries = this.subSettings.dailyDeliveries.min;
        } else if (this.subData.type === 'weekly') {
            minDeliveries = this.subSettings.weeklyDeliveries.min;
        } else {
            minDeliveries = this.subSettings.monthlyDeliveries.min;
        }
        if (this.totalDeliveries > maxDeliveries) {
            this.totalDeliveries = minDeliveries;
            this.presentToast(`Please enter value less than ${maxDeliveries}`);
        }
    }

    selectTime(e) {
        console.log(e.target.value);
        this.deliveryTime = e.target.value;
    }

    async subscribe() {
        const deliveryDays = [];
        const deliveryDates = [];
        this.subData.product = { productId: this.product.id, ...this.product.data };
        if (this.product.hasOwnProperty('parentProductId')) {
            this.subData.product['parentProductId'] = this.product.parentProductId;
        }
        this.subData.deliverySlot = this.deliveryTime ? this.deliveryTime : {};
        if (this.subData.type === 'daily') {
            this.subData.totalDeliveries = this.totalDeliveries * this.subData.qtyPerDay;
            this.subData.deliveryDays = [];
            this.subData.deliveryDates = [];
        } else if (this.subData.type === 'weekly') {
            this.days.forEach(d => {
                if (d.active) {
                    deliveryDays.push(d.day);
                }
            });
            if (!deliveryDays.length) {
                this.presentAlert(this.CREATE_SUBSCRIPTION_LABELS['select_some_days_of_week']);
            } else {
                this.subData.deliveryDays = deliveryDays;
                this.subData.totalWeeks = this.totalDeliveries;
                this.subData.totalDeliveries = this.totalDeliveries * this.subData.deliveryDays.length * this.subData.qtyPerDay;
                this.subData.deliveryDates = [];
                this.subData.totalMonths = 0;
            }
        } else {
            this.dates.forEach(d => {
                if (d.active) {
                    deliveryDates.push(d.date);
                }
            });
            if (!deliveryDates.length) {
                this.presentAlert(this.CREATE_SUBSCRIPTION_LABELS['select_any_date_of_month']);
            } else {
                this.subData.deliveryDates = deliveryDates;
                this.subData.totalMonths = this.totalDeliveries;
                this.subData.totalDeliveries = this.totalDeliveries * this.subData.deliveryDates.length * this.subData.qtyPerDay;
                this.subData.deliveryDays = [];
                this.subData.totalWeeks = 0;
            }
        }
        this.subData.totalMrp = this.subData.totalDeliveries * this.product.data.prodPrice;
        this.subData.amountPayable = this.subData.totalDeliveries * this.product.data.discountedPrice;
        this.subData.offerDiscount = this.subData.totalMrp - this.subData.amountPayable;
        console.log('subData', this.subData);
        if ((this.subData.type === 'weekly' && deliveryDays.length) || (this.subData.type === 'monthly' && deliveryDates.length) || this.subData.type === 'daily') {
            const product = this.product.data;
            this.subData['isCashAllowed'] = this.subSettings.isCashAllowed;
            // this.subData['ordersAt'] = ordersAt;
            const cartObj: any = {
                orderType: 'subscription',
                name: product.prodName,
                description: product.prodDesc,
                quantity: this.subData.totalDeliveries,
                img: product.coverPic,
                commentMsg: '',
                commentImgs: [],
                maxQty: null,
                minQty: null,
                gst: product.gst ? product.gst : 0,
                status: typeof product.status !== 'undefined' ? product.status : true,
                stopWhenNoQty: product.hasOwnProperty('stopWhenNoQty') && typeof product.stopWhenNoQty !== 'undefined' ? product.stopWhenNoQty : false,
                totalQty: product.productQty ? product.productQty : '',
                hsn: product.hsnCode ? product.hsnCode : '',
                sku: product.productCode ? product.productCode : '',
                barcode: product.barcode ? product.barcode : '',
                subData: this.subData,
                shippingWt: product.shippingWeight || 0,
                batches: 'batches' in product ? product.batches : []
            };
            if (product.discountedPrice && (product.discountedPrice !== product.prodPrice)) {
                cartObj['mrpPrice'] = product.prodPrice;
                cartObj['price'] = product.discountedPrice;
            } else {
                cartObj['price'] = product.prodPrice;
            }
            if (product.hasOwnProperty('color') && product.color.hasOwnProperty('name')) {
                cartObj['color'] = product.color;
            }
            if (product.hasOwnProperty('parentProductId')) {
                cartObj['parentProductId'] = product.parentProductId;
                cartObj['productId'] = this.product.id;
            } else {
                cartObj['productId'] = this.product.id;
            }
            let subMsg = '';
            console.log(moment().isBefore(moment({ hour: 20, minute: 0 })));
            if (moment().isBefore(moment({ hour: 20, minute: 0 }))) {
                subMsg = this.CREATE_SUBSCRIPTION_LABELS['subscription_active_msg_before_8'];
            } else {
                subMsg = this.CREATE_SUBSCRIPTION_LABELS['subscription_active_msg_after_8'];
            }
            this.subscriptionStartAlert(cartObj, subMsg)
        }
    }

    getFutureDates(dates) {
        const now = Date.now();
        const futureDates = dates.filter(date => {
            return date && (new Date(date)).getTime() > now;
        });
        return futureDates;
    }

    getDiscountedPrice() {
        const discountedPrice = this.product.data.prodPrice - (this.product.data.prodPrice * (this.subData.discount / 100));
        return discountedPrice;
    }

    async presentAlert(msg: string) {
        const alert = await this.alertController.create({
            message: msg,
            buttons: [`${this.SHARED_LABELS['ok']}`]
        });

        await alert.present();
    }

    async subscriptionStartAlert(cartObj, subMsg) {
        const alert = await this.alertController.create({
            message: subMsg,
            buttons: [{
                text: 'Continue',
                handler: async () => {
                    await this.presentLoading();
                    this.loading.dismiss();
                    if (this.product.data.isPriceList) {
                        this.events.publish('productVariantSubscribed', cartObj);
                    }
                    this.closeModal(cartObj);
                    this.presentToast('Your Product is subscribed');
                }
            }]
        });

        await alert.present();
    }

    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

    closeModal(cartObj) {
        this.modalController.dismiss(cartObj);
    }

    async presentLoading() {
        this.loading = await this.loadingController.create({
            message: this.CREATE_SUBSCRIPTION_LABELS['creating_subscription_loading_msg'],
            duration: 10000,
        });
        await this.loading.present();
    }

    async onClickQtyPerDay() {
        const alert = await this.alertController.create({
            subHeader: this.CREATE_SUBSCRIPTION_LABELS['enter_qty'],
            inputs: [
                {
                    name: 'qty',
                    type: 'number',
                    placeholder: this.CREATE_SUBSCRIPTION_LABELS['enter_qty_here']
                }
            ],
            buttons: [
                {
                    text: this.SHARED_LABELS['cancel'],
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: this.SHARED_LABELS['done'],
                    handler: (data) => {
                        if (!parseInt(data.qty)) {
                            this.presentToast('Please enter a valid quantity.');
                            return false;
                        } else {
                            this.subData.qtyPerDay = parseInt(data.qty);
                        }
                    }
                }
            ]
        });
        await alert.present();
    }

    async onClickTotalDeliveries() {
        const alert = await this.alertController.create({
            subHeader: this.CREATE_SUBSCRIPTION_LABELS['enter_value'],
            inputs: [
                {
                    name: 'value',
                    type: 'number',
                    placeholder: this.CREATE_SUBSCRIPTION_LABELS['enter_value_here']
                }
            ],
            buttons: [
                {
                    text: this.SHARED_LABELS['cancel'],
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: this.SHARED_LABELS['done'],
                    handler: (data) => {
                        if (!parseInt(data.value)) {
                            this.presentToast('Please enter a valid Value.');
                            return false;
                        } else {
                          let maxDeliveries;
                          if (this.subData.type === 'daily') {
                              maxDeliveries = this.subSettings.dailyDeliveries.max;
                          } else if (this.subData.type === 'weekly') {
                              maxDeliveries = this.subSettings.weeklyDeliveries.max;
                          } else {
                              maxDeliveries = this.subSettings.monthlyDeliveries.max;
                          }
                          let minDeliveries;
                          if (this.subData.type === 'daily') {
                              minDeliveries = this.subSettings.dailyDeliveries.min;
                          } else if (this.subData.type === 'weekly') {
                              minDeliveries = this.subSettings.weeklyDeliveries.min;
                          } else {
                              minDeliveries = this.subSettings.monthlyDeliveries.min;
                          }
                          if (parseInt(data.value) > maxDeliveries) {
                              this.totalDeliveries = minDeliveries;
                              this.presentToast(`Max value can be ${maxDeliveries}`);
                          } else if(parseInt(data.value) < minDeliveries) {
                            this.totalDeliveries = minDeliveries;
                            this.presentToast(`$Min value should be ${minDeliveries}`);
                          } else {
                            this.totalDeliveries = parseInt(data.value);
                          }
                        }
                    }
                }
            ]
        });
        await alert.present();
    }

    removeSubscriptions() {
        this.events.unsubscribe('delivery-settings:publishDeliverySettingsData');
    }

}