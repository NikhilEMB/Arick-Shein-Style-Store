import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, LoadingController, ToastController, ModalController, NavParams } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';


@Component({
  selector: 'app-product-list-modal',
  templateUrl: './product-list-modal.page.html',
  styleUrls: ['./product-list-modal.page.scss'],
})
export class ProductListModalPage implements OnInit{
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
  widgetID;
  vendorId = '';
  widgetProductsLimit = this.configService.environment.widgetProductsLimit || 10;
  constructor(private events: Events,
              private navParams: NavParams,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private modalController: ModalController,
              private configService: ConfigService) { }

  ngOnInit() {

  }
  async ionViewWillEnter() {
    this.initializeSubscriptions();
     this.widgetID = await this.navParams.get('widgetID');
     console.log('modal enter')
  }

  ionViewWillLeave() {
    console.log('modal leave')
    this.removeSubscriptions();
  }

  removeSubscriptions() {
    this.events.unsubscribe('widgets:publishProductsForProductCarousel');
    this.events.unsubscribe('widgets:productsForProductCarouselLimitReached');
    this.events.unsubscribe('widgets:previousProductsForProductCarouselLimitReached');
    this.events.unsubscribe('widgets:noMoreSearchProducts');
    this.events.unsubscribe('widgets:noProductsAvailable');
    this.events.unsubscribe('widgets:addCarouselPoductSuccess');
    this.events.unsubscribe('widgets:maxProductsinCarousel');
  }

  async filteredByVendorProduct(products: any) {
    if (this.vendorId) {
      let filteredByVendorProduct = products.filter(product => product.data.vendorId === this.vendorId);
      console.log("filteredByVendorProduct", filteredByVendorProduct);
      if (filteredByVendorProduct.length) {
        return filteredByVendorProduct;
      } else {
        this.noMoreProducts = true;
        return this.productsData;
      }
    } else {
      return products;
    }
  }

  initializeSubscriptions() {
    console.log('modal initializeSubscriptions')
    this.events.subscribe('widgets:publishProductsForProductCarousel', async(products, length?) => {
      console.log("vendorId", this.vendorId);
      console.log("products", products);
      
      // this.productsData = products;
      this.productsData = await this.filteredByVendorProduct(products);
      console.log('modal productsData', this.productsData,length)
      this.showNoProducts = false;
      this.showSearchLoader = false;
      if(this.loading) {
        this.loading.dismiss();
      }
      if(length) {
        this.firstTimeProductsLength = length;
      }
    });

    this.events.subscribe('widgets:productsForProductCarouselLimitReached', () => {
      this.noMoreProducts = true;
      this.loading.dismiss();
    });
    this.events.subscribe('widgets:previousProductsForProductCarouselLimitReached', () => {
      this.noPreviousProducts = true;
      this.loading.dismiss();
    });

    this.events.subscribe('widgets:noMoreSearchProducts', () => {
      this.noMoreSearchProducts = true;
      this.showSearchLoader = false;
    });

    this.events.subscribe('widgets:noProductsAvailable', () => {
      this.showNoProducts = true;
      this.showSearchLoader = false;
    });

    this.events.subscribe('widgets:addCarouselPoductSuccess', () => {
      if(this.loading){
        this.loading.dismiss();
      }
      this.presentToast('Product Added Successfully');
      this.productsData[this.selectedIndex].isAdded = true;
      
    });

    this.events.subscribe('widgets:maxProductsinCarousel', () => {
      if(this.loading){
        this.loading.dismiss();
      }
      this.presentToast(`Sorry, only ${this.widgetProductsLimit} products can be added`);
      
    });

    // if (this.vendorId == ''){
      this.events.publish('widgets:getProductsForProductCarousel', this.widgetID);
    // }

    
  }
  async loadMoreProducts(){
    console.log("loadmore")
    this.noPreviousProducts = false;
    await this.presentLoading();
    this.events.publish('widgets:loadMoreProductsForProductCarousel', this.widgetID);
  }
  async loadPreviousProducts(){
    this.noMoreProducts = false;
    await this.presentLoading();
    this.events.publish('widgets:loadPreviousProductsForProductCarousel', this.widgetID);
  }

  fireSearchQuery() {
    clearTimeout(this.typingTimer);
    if(this.searchProduct.length > 2) {
      this.typingTimer = setTimeout(() => {
        console.log('in fireSearchQuery...');
        this.showSearchLoader = true;
        this.showNoProducts = false;
        this.events.publish('search-engine:alogoliaSearchProductsForProductCarousel', this.searchProduct, 0, 'new_search', this.widgetID, this.vendorId);
      }, this.doneTypingInterval);

    } else {
      if (!this.searchProduct.length) {
        // if (this.vendorId == ''){
          this.events.publish('widgets:getProductsForProductCarousel', this.widgetID);
        // }
      }
    }

  }
  async searchMoreProducts(event) {
    console.log('loading more data...');
    this.page = this.page + 1;
    this.events.publish('search-engine:alogoliaSearchProductsForProductCarousel', this.searchProduct, this.page, 'existing_search', this.widgetID, this.vendorId);
    setTimeout(() => {
      event.target.complete();
    }, 1000);
    if(this.noMoreSearchProducts === true) {
      event.target.disabled = true;
    }
  }

  async addProductToCarousel(item: any, index: number) {
    console.log('item:', this.widgetID);
    await this.presentLoading();
    this.selectedIndex = index;
    this.events.publish('widgets:addProductToCarousel', item, this.widgetID, this.vendorId);
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
    this.removeSubscriptions();
    this.modalController.dismiss();
  }
  
}
