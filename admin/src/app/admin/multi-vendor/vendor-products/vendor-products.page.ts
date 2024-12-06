import { Component, OnInit } from '@angular/core';
import { Events, LoadingController, ToastController, ModalController, NavParams, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vendor-products',
  templateUrl: './vendor-products.page.html',
  styleUrls: ['./vendor-products.page.scss'],
})
export class VendorProductsPage implements OnInit {

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
  vendorId:any;
  productLength:any
  selectedLength:any
  unselectedLength:any
  productList = []
  vendors = []
  copyToVendor:any
  constructor(private events: Events,
              private navParams: NavParams,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private alertController: AlertController,
              private modalController: ModalController) { }

  ngOnInit() {

  }
  async ionViewWillEnter() {
    this.initializeSubscriptions();
    this.vendorId = await this.navParams.get('vendorId');
    this.vendors = await this.navParams.get('vendorList');
    this.vendors = this.vendors.filter(item => item.id !== this.vendorId);
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  removeSubscriptions() {
    this.events.unsubscribe('vendor:publishProductsForVendor');
    this.events.unsubscribe('vendor:noProductsAvailableVendor');
    this.events.unsubscribe('vendor:copiedProductsToVendor');
    this.events.unsubscribe('vendor:copyProductsToVendorFailed');

  }

  initializeSubscriptions() {
    this.events.subscribe('vendor:publishProductsForVendor', (products, length?) => {
      this.productsData = products;
      this.productList = this.productsData.slice()
      if (this.productsData.length){
        this.productLength = products.length
        this.selectedLength = products.length
        this.unselectedLength = 0
      }
      this.showNoProducts = false;
      this.showSearchLoader = false;
      if(this.loading) {
        this.loading.dismiss();
      }
      if(length) {
        this.firstTimeProductsLength = length;
      }
    });

    this.events.subscribe('vendor:noProductsAvailableVendor', () => {
      this.showNoProducts = true;
      this.showSearchLoader = false;
    });

    this.events.subscribe('vendor:copiedProductsToVendor', () => {
      if (this.loading){
        this.loading.dismiss()
      }
      this.presentAlert("Products copied successfully")
    });

    this.events.subscribe('vendor:copyProductsToVendorFailed', () => {
      if (this.loading){
        this.loading.dismiss()
      }
      this.presentAlert("Copy products to vendor failed")
    });

    this.events.publish('vendor:getProductsForVendor', this.vendorId);

    
  }

  // fireSearchQuery() {
  //   clearTimeout(this.typingTimer);
  //   if(this.searchProduct.length > 2) {
  //     this.typingTimer = setTimeout(() => {
  //       console.log('in fireSearchQuery...');
  //       this.showSearchLoader = true;
  //       this.showNoProducts = false;
  //       this.events.publish('search-engine:alogoliaSearchProductsForProductCarousel', this.searchProduct, 0, 'new_search', this.vendorId);
  //     }, this.doneTypingInterval);

  //   } else {
  //     if (!this.searchProduct.length) {
  //       this.events.publish('widgets:getProductsForProductCarousel', this.vendorId);
  //     }
  //   }

  // }

  selectAll(){
    this.productList = this.productsData.slice()
    this.unselectedLength = 0
    this.selectedLength = this.productsData.length
  }

  unselectAll(){
    this.productList = []
    this.unselectedLength = this.productsData.length
    this.selectedLength = 0
  }

  chooseProducts(index,product){
    if (this.productList.indexOf(product) > -1){
      this.productList.splice(this.productList.indexOf(product),1)
      this.selectedLength -= 1
      this.unselectedLength += 1
    }
    else{
      this.productList.push(product)
      this.selectedLength += 1
      this.unselectedLength -= 1
    }
  }

  addVendor(e) {
    this.copyToVendor = e.target.value
  }

  copyProducts(){
    if (this.productList && this.productList.length == 0){
      this.presentAlert('Please choose atleast 1 product')
    }
    else if (!this.copyToVendor){
      this.presentAlert('Please select a vendor')
    }
    else{
      this.presentLoading()
      this.events.publish('vendor:copyProductsVendor', this.vendorId,this.copyToVendor,this.productList)
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...'
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

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'ok',
        handler: () => {
        }
      }]
    });

    await alert.present();
  }

  closeModal() {
    this.removeSubscriptions();
    this.modalController.dismiss();
  }

}
