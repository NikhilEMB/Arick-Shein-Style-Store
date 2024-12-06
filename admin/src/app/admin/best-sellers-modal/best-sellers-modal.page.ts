import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, LoadingController, ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-best-sellers-modal',
  templateUrl: './best-sellers-modal.page.html',
  styleUrls: ['./best-sellers-modal.page.scss'],
})
export class BestSellersModalPage implements OnInit {
  searchProduct: string = '';
  typingTimer;
  doneTypingInterval = 500;
  showSearchLoader: boolean = true;
  showNoProducts = false;
  productsData: any = [];
  selectedIndex: number;
  loading: any;
  noMoreProducts: boolean = false;
  noPreviousProducts: boolean = true;
  firstTimeProductsLength: any;
  page: number = 0;
  noMoreSearchProducts: boolean = false;
  constructor(private events: Events,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private modalController: ModalController) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.events.publish('best-sellers:getProductsForBestSellers');
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('best-sellers:publishProductsForBestSellers', (products, length?) => {
      // //console.log('in all products SUBSCRIPTION');
      this.productsData = products;
      this.showNoProducts = false;
      this.showSearchLoader = false;
      if(this.loading) {
        this.loading.dismiss();
      }
      // //console.log('all products', this.productsData);
      if(length) {
        this.firstTimeProductsLength = length;
      }
    });
    this.events.subscribe('best-sellers:noProductsAvailable', () => {
      this.showNoProducts = true;
      this.showSearchLoader = false;
    });
    this.events.subscribe('best-sellers:productsForBestSellersLimitReached', () => {
      this.noMoreProducts = true;
      this.loading.dismiss();
    });
    this.events.subscribe('best-sellers:previousProductsForBestSellersLimitReached', () => {
      this.noPreviousProducts = true;
      this.loading.dismiss();
    });
    this.events.subscribe('best-sellers:addBestSellerProductSuccess', () => {
      this.productsData[this.selectedIndex].isAdded = true;
      this.loading.dismiss();
      this.presentToast('Product saved as best seller.');
    });
    this.events.subscribe('best-sellers:maxProductsinBestSellers', () => {
      this.loading.dismiss();
      this.presentToast('Already 10 products in best sellers.');
    });
    this.events.subscribe('best-sellers:noMoreSearchProducts', () => {
      this.noMoreSearchProducts = true;
      this.showSearchLoader = false;
    });
  }
  async loadMoreProducts(){
    // //console.log('loading more data...');
    this.noPreviousProducts = false;
    await this.presentLoading();
    this.events.publish('best-sellers:loadMoreProductsForBestSellers');
    // this.content.scrollToTop(0);
  }
  async loadPreviousProducts(){
    this.noMoreProducts = false;
    await this.presentLoading();
    this.events.publish('best-sellers:loadPreviousProductsForBestSellers');
    // this.content.scrollToTop(0);
  }

  fireSearchQuery() {
    clearTimeout(this.typingTimer);
    if(this.searchProduct.length > 2) {
      this.typingTimer = setTimeout(() => {
        console.log('in fireSearchQuery...');
        this.showSearchLoader = true;
        this.showNoProducts = false;
        this.events.publish('search-engine:alogoliaSearchProductsForBestSellers', this.searchProduct, 0, 'new_search');
      }, this.doneTypingInterval);

    } else {
      if (!this.searchProduct.length) {
        this.events.publish('product:getProductsForBestSellers');
      }
    }

  }
  async searchMoreProducts(event) {
    console.log('loading more data...');
    this.page = this.page + 1;
    this.events.publish('search-engine:alogoliaSearchProductsForBestSellers', this.searchProduct, this.page, 'existing_search');
    setTimeout(() => {
      event.target.complete();
    }, 1000);
    if(this.noMoreSearchProducts === true) {
      event.target.disabled = true;
    }
  }

  async addProductAsBestSeller(item: any, index: number) {
    // //console.log('item:', item);
    await this.presentLoading();
    this.selectedIndex = index;
    this.events.publish('best-sellers:addBestSellerProduct', item);
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
    this.modalController.dismiss();
  }
  removeSubscriptions() {
    this.events.unsubscribe('best-sellers:noProductsAvailable');
    this.events.unsubscribe('best-sellers:addBestSellerProductSuccess');
    this.events.unsubscribe('best-sellers:maxProductsinBestSellers');
    this.events.unsubscribe('best-sellers:publishProductsForBestSellers');
    this.events.unsubscribe('best-sellers:productsForBestSellersLimitReached');
    this.events.unsubscribe('best-sellers:previousProductsForBestSellersLimitReached');
    this.events.unsubscribe('best-sellers:noMoreSearchProducts');

  }
}
