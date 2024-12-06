import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupon-code-modal',
  templateUrl: './coupon-code-modal.page.html',
  styleUrls: ['./coupon-code-modal.page.scss'],
})
export class CouponCodeModalPage implements OnInit {

  searchProduct: string = '';
  typingTimer;
  doneTypingInterval = 500;
  showSearchLoader: boolean = false;
  showNoProducts = true;
  productsData: any = [];
  selectedIndex: number;
  loading: any;
  noMoreProducts: boolean = false;
  codeId: string;
  alreadyAddedProducts: any = [];
  page: number = 0;
  noMoreSearchProducts: boolean = false;
  applicableStatus: any;
  constructor(private events: Events,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private modalController: ModalController,
              private router: Router) { }

  ngOnInit() {
    // //console.log('code id ', this.codeId);
    // //console.log('alreadyAdded products', this.alreadyAddedProducts);
  }
  ionViewWillEnter() {
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('coupon-codes:publishProductsForCouponCodesModal', (products) => {
      // //console.log('in all products SUBSCRIPTION');
      console.log('this.alreadyAddedProducts', this.alreadyAddedProducts);
      for (let index = 0; index < products.length; index++) {
        for (let x = 0; x < this.alreadyAddedProducts.length; x++) {
          if(products[index].id === this.alreadyAddedProducts[x].id) {
            products[index]['isNotApplicable'] = true;
            break;
          } else {
            products[index]['isNotApplicable'] = false;
          }
        }

      }
      this.productsData = products;
      this.showNoProducts = false;
      this.showSearchLoader = false;
      // //console.log('all products', this.productsData);
    });
    this.events.subscribe('coupon-codes:noProductsAvailableForModal', () => {
      this.showNoProducts = true;
      this.showSearchLoader = false;
    });
    this.events.subscribe('coupon-codes:addProductAsNotApplicableSuccess', () => {
      this.productsData[this.selectedIndex].isNotApplicable = true;
      this.loading.dismiss();
      if(this.applicableStatus === 'notApplicable') {
        this.presentToast('Coupon code will not be applied on this product');
      } else {
        this.presentToast('Coupon code will be applied on this product');
      }
    });
    this.events.subscribe('coupon-codes:noMoreAdminSearchProducts', () => {
      this.noMoreSearchProducts = true;
      this.showSearchLoader = false;
    });
  }

  fireSearchQuery() {
    clearTimeout(this.typingTimer);
    if(this.searchProduct.length > 2) {
      this.typingTimer = setTimeout(() => {
        console.log('in fireSearchQuery...');
        this.showSearchLoader = true;
        this.showNoProducts = false;
        this.events.publish('search-engine:alogoliaSearchProductsForCouponCodes', this.searchProduct, 0, 'new_search');
      }, this.doneTypingInterval);

    } else {
      if (!this.searchProduct.length) {
        this.showNoProducts = true;
      }
    }

  }
  async searchMoreProducts(event) {
    console.log('loading more data...');
    this.page = this.page + 1;
    this.events.publish('search-engine:alogoliaSearchProductsForCouponCodes', this.searchProduct, this.page, 'existing_search');
    setTimeout(() => {
      event.target.complete();
    }, 1000);
    if (this.noMoreSearchProducts === true) {
      event.target.disabled = true;
    }
  }

  async addProductAsNotApplicable(item: any, index: number) {
    // //console.log('item:', item);
    await this.presentLoading();
    this.selectedIndex = index;
    this.events.publish('coupon-codes:addProductAsNotApplicable', this.getProductDataForNotApplicableArray(item), this.codeId);
    this.alreadyAddedProducts.push(this.getProductDataForNotApplicableArray(item));
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 10000
    });
    await this.loading.present();
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  closeModal() {
    this.modalController.dismiss(this.alreadyAddedProducts);
  }

  getProductDataForNotApplicableArray(product) {
    return {
      id: product.id,
      coverPic: {thumb: product.coverPic && Object.keys(product.coverPic).length ? product.coverPic.thumb || product.coverPic.url : ''},
      prodName: product.prodName
    }
  }

  removeSubscriptions() {
    this.events.unsubscribe('coupon-codes:noProductsAvailableForModal');
    this.events.unsubscribe('coupon-codes:addProductAsNotApplicableSuccess');
    this.events.unsubscribe('coupon-codes:publishProductsForCouponCodesModal');
    this.events.unsubscribe('coupon-codes:noMoreAdminSearchProducts');
  }
}
