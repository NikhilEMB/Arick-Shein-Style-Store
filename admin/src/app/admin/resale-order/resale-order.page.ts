import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { LabelService } from 'src/app/services/label/label.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { StatesModalPage } from 'src/app/states-modal/states-modal.page';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-resale-order',
  templateUrl: './resale-order.page.html',
  styleUrls: ['./resale-order.page.scss'],
})
export class ResaleOrderPage implements OnInit {

  resale: any;
    onlyView = true;
    resellerForm: FormGroup;
    customerForm: FormGroup;
    taxType: any;
    products: any[] = [];
    currencyCode: string = 'INR';
    isSubmitted: boolean = false;
    SHARED_LABELS: any;
    RESALE_ORDER_LABELS: any;
    orderId: string;
    viewBy: string;
    constructor(private router: Router,
        private configService: ConfigService,
        private modalController: ModalController,
        private sharedService: SharedService,
        private labelService: LabelService,
        private inAppBrowser: InAppBrowser,) {
    }

    ngOnInit() {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.RESALE_ORDER_LABELS = this.labelService.labels['RESALE_ORDER'];
        this.taxType = this.configService.environment.taxType;
        this.currencyCode = this.configService.environment.currencyCode;

        if (!Object.keys(this.resale).length) {
            this.onlyView = false;
            this.initResaleOrderObj();
        }
    }

    ionViewWillEnter() {
        this.initForms();
    }

    async initForms() {
        this.resellerForm = new FormGroup({
            'name': new FormControl(this.getFieldValue('reseller', 'name'), Validators.required),
            'gstNo': new FormControl(this.getFieldValue('reseller', 'gstNo'))
        });

        // this.resale.reseller = {
        //     uid: await this.sharedService.getStorageUid(),
        //     ...this.resellerForm.value
        // }

        this.customerForm = new FormGroup({
            'name': new FormControl(this.getFieldValue('customer', 'name'), Validators.required),
            'gstNo': new FormControl(this.getFieldValue('customer', 'gstNo')),
            'address': new FormGroup({
                'complete': new FormControl(this.getSubFieldValue('customer', 'address', 'complete'), Validators.required),
                'pincode': new FormControl(this.getSubFieldValue('customer', 'address', 'pincode'), Validators.required),
                'city': new FormControl(this.getSubFieldValue('customer', 'address', 'city'), Validators.required),
                'state': new FormControl(this.getSubFieldValue('customer', 'address', 'state'), Validators.required),
                'stateCode': new FormControl(this.getSubFieldValue('customer', 'address', 'stateCode'), Validators.required),
            })
        });

        // this.resale.customer = { ...this.customerForm.value };
    }

    getFieldValue(key: string, field: string) {
        return !this.onlyView ? '' : this.resale[key][field];
    }

    getSubFieldValue(key: string, field: string, subfield: string) {
        return !this.onlyView ? '' : this.resale[key][field][subfield];
    }

    async openStateModal() {
        if (this.onlyView) {
            return;
        }
        const modal = await this.modalController.create({
            component: StatesModalPage,
        });
        modal.onDidDismiss()
            .then((res) => {
                console.log('data from modal', res);
                if (res.data) {
                    this.customerForm.patchValue({
                        'address': {
                            'state': res.data.state,
                            'stateCode': res.data.code
                        }
                    });
                }
            });
        await modal.present();
    }

    getProductType(product: any) {
        if (!product.hasOwnProperty('pack')) {
            return 'single';
        }
        if (product.hasOwnProperty('pack')) {
            if (product.pack.variantType && product.pack.variantType === 'pieces') {
                return 'pieces';
            } else {
                return 'variant';
            }
        }
    }

    getProductPrice(product: any) {
        const type = this.getProductType(product);
        if (type === 'single' || type === 'variant') {
            return product.price;
        }
        if (type === 'pieces') {
            return product.pack.price;
        }
    }

    getProductImg(product: any) {
        if (product.img.mob) {
            return product.img.mob;
        }
        if (!product.img.mob && product.img.url) {
            return product.img.url;
        }
        if (!product.img.mob && !product.img.url) {
            return 'assets/img/img-preloader.png';
        }
    }

    getProductDesc(product: any) {
        const type = this.getProductType(product);
        let desc = product.description;
        if (type === 'variant') {
            desc = `${product.pack.variantType}: ${desc}`;
        }
        if (type === 'pieces') {
            desc = `${product.pack.variantType}: ${desc} X ${product.quantity}`;
        }
        return desc;
    }

    getPrices(index: number, type: string) {
        return this.resale.order.products[index][type];
    }
    getQty(index: number) {
        return this.resale.order.products[index].quantity;
    }

    initResaleOrderObj() {
        this.resale['order'] = {
            createdAt: null,
            products: [],
            priceDetails: {
                subtotal: 0,
                gst: 0,
                resaleAt: 0,
                purchasedAt: 0,
                profit: 0,
            },
            invoice: {
                status: '',
                url: ''
            }
        }
        this.products.forEach(product => {
            this.resale.order.products.push({
                purchasedAt: this.getProductPrice(product),
                resaleAt: this.getProductPrice(product),
                gst: product.gst || 0,
                gstObj: {},
                quantity: product.quantity
            });
        });
        this.calculatePriceDetails();

    }

    calculatePriceDetails() {
        let subtotal = 0;
        let gst = 0;
        let resaleAt = 0;
        let purchasedAt = 0;
        let profit = 0;
        this.resale.order.products.forEach(product => {
            let gstValue = (product.resaleAt - (product.resaleAt / (1 + (product.gst / 100)))) * product.quantity;
            product.gstObj = {
                value: product.gst,
                total: gstValue,
                cgst: product.gst / 2,
                sgst: product.gst / 2,
                igst: product.gst
            }
            let resale = product.resaleAt * product.quantity;
            let purchase = product.purchasedAt * product.quantity;
            let profitValue = resale - purchase;
            subtotal += (resale - gstValue);
            gst += gstValue;
            resaleAt += resale;
            purchasedAt += purchase;
            profit += profitValue
        });
        this.resale.order.priceDetails = { subtotal, gst, resaleAt, purchasedAt, profit };
    }

    async saveResale() {
        this.isSubmitted = true;
        let isDataValid = true;
        let invalidProductName = '';
        this.resale.order.products.map((product, index) => {
            if (product.purchasedAt > product.resaleAt) {
                isDataValid = false;
                invalidProductName = this.products[index].name;
            }
        });

        if (!this.customerForm.valid || !this.resellerForm.valid) {
            this.sharedService.presentAlert(this.SHARED_LABELS['please_fill_all_the_details']);
        } else if (!isDataValid) {
            this.sharedService.presentAlert(`${this.RESALE_ORDER_LABELS['invalid_price_alert_msg']} ${invalidProductName}`);
        } else {
            this.resale.customer = this.customerForm.value;
            this.resale.reseller = this.resellerForm.value;
            this.resale.order.createdAt = new Date();

            await this.sharedService.presentLoading();
            // const res = await this.orderService.saveResaleData(this.resale, this.orderId);
            this.sharedService.loading.dismiss();
            // if (!res) {
            //     this.sharedService.presentAlert(this.SHARED_LABELS['some_issue_msg']);
            // } else {
            //     this.sharedService.presentAlert(this.RESALE_ORDER_LABELS['order_created_msg']);
            //     this.router.navigate(['tabs/tabs/user-order-history']);
            // }
        }
    }

    isResellerControlValid(control: string) {
        return this.resellerForm.get(control).invalid && this.isSubmitted ? false : true;
    }

    isCustomerControlValid(control: string, group?: string) {
        const path = group ? `${group}.${control}` : control
        return this.customerForm.get(path).invalid && this.isSubmitted ? false : true;
    }

    checkViewBy() {
        return this.viewBy === 'reseller' ? 'RESALE_ORDER.your' : 'RESALE_ORDER.reseller';
    }

    viewInvoice() {
        const browser: InAppBrowserObject = this.inAppBrowser.create(this.resale.order.invoice.url, '_system');
    }

    closeModal() {
      this.modalController.dismiss();
    }
}
