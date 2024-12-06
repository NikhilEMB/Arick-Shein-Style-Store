import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Events, LoadingController, Platform, ModalController, AlertController } from '@ionic/angular';
import { Product } from '../models/product';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { SearchEngineService } from '../services/search-engine/search-engine.service';
import { UserService } from '../services/user/user.service';
import { Storage } from '@ionic/storage';
import { PricelistModalPage } from '../pricelist-modal/pricelist-modal.page';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  products: any[] = [];
  loading: any;
  productsLength: number;
  // tslint:disable-next-line: no-unused-expression
  searchProduct: string = '';
  showNoProducts = false;
  categoryId: string;
  categoryName: string;
  countOfProducts: number = 0;
  showLoader = true;
  devWidth:number;
  showSearch;
  useThumb: boolean;
  noMoreProducts: boolean = false;
  typingTimer;                
  doneTypingInterval = 500;
  showSearchLoader: boolean = false;
  unreadAdminMsgs: number = 0;
  userId: string;
  cartProducts: any = [];
  listOfProductIdsInCart: any = [];
  // @ViewChild('searchInput', {static: false}) searchInputRef: TextInput;
  constructor(private route: ActivatedRoute, private events: Events, private router: Router, public loadingController: LoadingController, 
              private platform: Platform, private searchEngineService: SearchEngineService,
              private storage: Storage, private userService: UserService,
              private modalController: ModalController,
              private alertController: AlertController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.categoryId = this.router.getCurrentNavigation().extras.state.categoryId;
        this.categoryName = this.router.getCurrentNavigation().extras.state.categoryName;
        //console.log('categoryId', this.categoryId);
      }
    });
  }

  ionViewWillEnter() {
    this.willEnterSubs();
    this.storage.get('uid').then((val) => {
      this.events.publish('chat:getUnreadMsgOfAdmin', val);
    });
    this.events.subscribe('chat:publishUnreadMsgOfAdmin', (unreadMsgs) => {
      this.unreadAdminMsgs = unreadMsgs;
    });
    this.devWidth = this.platform.width();
    //console.log('devWidth', this.devWidth);
    if(this.devWidth <= 500) {
      this.useThumb = true;
    } else if(this.devWidth > 500){
      this.useThumb = false;
    }
    this.userId = this.userService.getUserId();
    this.events.publish('user:getUserCartProducts');
  }
  willEnterSubs() {
    this.events.subscribe('user:updateQuantityOfCartProductSuccess', () => {
      this.loading.dismiss();
    });
    this.events.subscribe('user:productRemovedFromCart', () => {
      this.loading.dismiss();
    });
    this.events.subscribe('user:productAddedToCart', () => {
      this.loading.dismiss();
    });
    this.events.subscribe('user:publishUserCartProducts', (cartProducts) => {
      this.cartProducts = cartProducts;
      //console.log('cartProducts', this.cartProducts);
    });
  }
  ionViewWillLeave() {
    this.events.unsubscribe('chat:publishUnreadMsgOfAdmin');
    this.events.unsubscribe('user:updateQuantityOfCartProductSuccess');
    this.events.unsubscribe('user:productRemovedFromCart');
    this.events.unsubscribe('user:productAddedToCart');
    this.events.unsubscribe('user:publishUserCartProducts');
  }
  
  ngOnInit() {
    //console.log('in ngOnInit of shop');
    this.initializeSubscriptions();
    this.events.publish('user:getUserCartProducts');
    this.events.publish('product:getProducts', this.categoryId);
  } 
  ngOnDestroy() {
    //console.log('in ng on destroy of products');
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('product:publishProducts', (products) => {
      //console.log('cart products in logic...', this.cartProducts);
      this.storage.get('listOfProductIdsInCart').then((val) => {
        this.listOfProductIdsInCart = val;
        //console.log('listOfProductIdsInCart', this.listOfProductIdsInCart);
        products.forEach(element => {
          if(this.userId !== '' && this.listOfProductIdsInCart && this.listOfProductIdsInCart.length && this.listOfProductIdsInCart.indexOf(element.id) !== -1){
            //console.log('id in listOfProductIdsInCart');
            element.inCart = true;
          } else {
            //console.log('product is not in cart...');
            element.inCart = false;
          }
        });
      });
        this.products = products;
        //console.log('products', this.products);
        this.showLoader = false;
        this.showSearchLoader = false;
        this.showNoProducts = false;
    });
    this.events.subscribe('product:noProductAvailable', () => {
      //console.log('in no data shop');
      this.showLoader = false;
      this.showNoProducts = true;
      this.showSearchLoader = false;
    });
    this.events.subscribe('product:productsLimitReached', () => {
      //console.log('in productsLimitReached sub...');
      this.noMoreProducts = true;
    });
  }

  onClickProduct(id: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        productId: id
      }
    };
    this.router.navigate(['product-details'], navigationExtras);
  }
  clearSearchProduct() {
    this.events.publish('product:getProducts', this.categoryId);
    this.searchProduct = '';
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 5000
    });
    await this.loading.present();
  }
  async loadMoreProducts(event) {
    //console.log('loading more data...');
    this.events.publish('product:loadMoreProducts', this.categoryId);
    setTimeout(() => {
      event.target.complete();
    }, 1000);
    if(this.noMoreProducts === true) {
      event.target.disabled = true;
    }
  }
  fireSearchQuery() {
    clearTimeout(this.typingTimer);
    if(this.searchProduct !== '') {
      this.typingTimer = setTimeout(() => {
        //console.log('in fireSearchQuery...');
        this.showSearchLoader = true;
        this.events.publish('search-engine:searchProduct', this.searchProduct, this.categoryId);
      }, this.doneTypingInterval);
      
    } else {
      this.events.publish('product:getProducts', this.categoryId);
    }
    
  }
  goToChat(fromfab: boolean) {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else { 
      //console.log('in else of uid');
      this.storage.get('userRole').then(async (role) => {
        if(role === 'admin') {
          this.router.navigate(['admin-home']);
        } else {
          this.router.navigate(['chat-bot']);
        }
      });
    }
  }
  goToSearchItemsPage(){
    this.router.navigate(['search-items']);
  }

  async openPriceModal(product) {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else {
      this.storage.get('userRole').then(async (role) => {
        if(role === 'admin') {
          this.presentAlert('Admin can not place the order!');
       } else if(role === 'deliveryAgent') {
        this.presentAlert('Delivery agent can not place any order!');
       }
        else {
          let listOfWeights = [];
          for(let i = 0; i < product.data.priceList.length; i++) {
            listOfWeights.push(product.data.priceList[i].weight);
          }
          product.data.priceList.map((entry) => {
            entry.quantity = 0;
          });
          this.modalController.create({
            component: PricelistModalPage,
            cssClass: 'auto-height',
            componentProps: {
              product: product,
              listOfWeights: listOfWeights,
              cartProducts: this.cartProducts
            }
          })
            .then(modalEl => {modalEl.present();
          });
       }
      });
    }

    
  }
  async addProductToCart(product, index) {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else {
      this.storage.get('userRole').then(async (role) => {
        if(role === 'admin') {
          this.presentAlert('Admin can not place the order!');
       } else if(role === 'deliveryAgent') {
        this.presentAlert('Delivery agent can not place any order!');
       }
        else {
        await this.presentLoading();
        const cartObj = {
          name: product.data.prodName,
          quantity: 1,
          img: product.data.coverPic,
          description: product.data.prodDesc,
          productId: product.id,
          commentMsg: '',
          commentImgs: []
        }
        if(product.data.discount && product.data.discount !== '' && product.data.discount !== '0') {
          cartObj['price'] = Math.ceil(product.data.prodPrice - (product.data.prodPrice * ((product.data.discount * 1) / 100)));
        } else {
          cartObj['price'] = product.data.prodPrice;
        }
        this.events.publish('user:addProductToCart', cartObj);
        
        this.products[index].inCart = true;
       }
      });
    }
  }

  productQuantityInCart(id, i) {
    if(this.cartProducts.length) {
      for (let index = 0; index < this.cartProducts.length; index++) {
        if(this.cartProducts[index].productId === id){
          return this.cartProducts[index].quantity;
        }
      }
    }
  }
  prodcutDataInCart(id) {
    if(this.cartProducts.length) {
      for (let index = 0; index < this.cartProducts.length; index++) {
        if(this.cartProducts[index].productId === id){
          return {quantity: this.cartProducts[index].quantity,
                  cartProductId: this.cartProducts[index].id};
        }
      }
    }
  }
  async decrementQuantity(id: string, index: number){
    const data = this.prodcutDataInCart(id);
    //console.log('quantity', data.quantity);
    if(data.quantity > 1) {
      await this.presentLoading();
      this.events.publish('user:updateQuantityOfCartProduct', data.quantity - 1, data.cartProductId);
    } else {
      this.removeProduct(data.cartProductId);
      this.products[index].inCart = false;
    }
  }
  async incrementQuantity(id: string){
    const data = this.prodcutDataInCart(id);
    //console.log('quantity', data.quantity);
    await this.presentLoading();
    this.events.publish('user:updateQuantityOfCartProduct', data.quantity + 1, data.cartProductId);
  }
  async removeProduct(id: string) {
    await this.presentLoading();
    this.events.publish('user:removeProductFromCart', id);
  }


  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  getDiscountedProduct(price, discount) {
    let discountedPrice = Math.ceil(price - (price * ((discount * 1) / 100)));
    return discountedPrice;
  }
  removeSubscriptions() {
    this.events.publish('product:removeSusbcriptions');
    this.events.unsubscribe('product:publishProducts');
    this.events.unsubscribe('product:noProductAvailable');
    this.events.unsubscribe('product:productsLimitReached');
  }

}
