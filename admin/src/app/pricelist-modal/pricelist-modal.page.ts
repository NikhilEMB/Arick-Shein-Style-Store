import { Component, OnInit } from '@angular/core';
import { ModalController, Events, AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-pricelist-modal',
  templateUrl: './pricelist-modal.page.html',
  styleUrls: ['./pricelist-modal.page.scss'],
})
export class PricelistModalPage implements OnInit {
  product: any;
  userId: string;
  loading: any;
  cartProducts: any = [];
  listOfProductIdsInCart: any = [];
  listOfWeights: any = [];
  mainListOfWeightsAndPrices: any = [];
  constructor(private modalController: ModalController,
              private events: Events,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private userService: UserService,
              private router: Router,
              private storage: Storage) { }

  ngOnInit() {
    //console.log('product in modal', this.product);
    //console.log('listOfWeights in modal', this.listOfWeights);
    //console.log('cart products in modal', this.cartProducts);
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.userId = this.userService.getUserId();
    this.initialDisplayOfWeights();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initialDisplayOfWeights() {
    this.storage.get('listOfProductIdsInCart').then((val) => {
      this.listOfProductIdsInCart = val;
      //console.log('listOfProductIdsInCart in modal', this.listOfProductIdsInCart);
      if(this.userId !== '' && this.listOfProductIdsInCart && this.listOfProductIdsInCart.length && this.listOfProductIdsInCart.indexOf(this.product.id) !== -1){
        if(this.cartProducts && this.cartProducts.length) {
          for (let index = 0; index < this.cartProducts.length; index++) {
            if(this.cartProducts[index].productId === this.product.id) {
              let weightIndex = this.listOfWeights.indexOf(this.cartProducts[index].pack.weight);
              //console.log('weightIndex', weightIndex);
              if(weightIndex !== -1) {
                this.product.data.priceList[weightIndex].inCart = true;
                this.product.data.priceList[weightIndex].quantity = this.cartProducts[index].quantity;
                this.product.data.priceList[weightIndex].cartId = this.cartProducts[index].id;
              } else {
                this.product.data.priceList[weightIndex].inCart = false;
              }
            }
          }
        }
      } else {
        //console.log('price list product is not in cart');
        for (let index = 0; index < this.product.data.priceList.length; index++) {
          this.product.data.priceList[index].inCart = false;
        }
      }
      this.mainListOfWeightsAndPrices = this.product.data.priceList;
      //console.log('this.mainListOfWeightsAndPrices', this.mainListOfWeightsAndPrices);
    });
  }
  initializeSubscriptions() {
    this.events.subscribe('user:updateQuantityOfCartProductSuccessForPriceModal', () => {
      this.loading.dismiss();
    });
    this.events.subscribe('user:productRemovedFromCartForPriceModal', () => {
      //console.log('in productRemovedFromCartForPriceModal');
      this.loading.dismiss();
    });
    this.events.subscribe('user:productAddedToCartForPriceModal', (cartId, index) => {
      this.mainListOfWeightsAndPrices[index].cartId = cartId;
      //console.log('this.mainListOfWeightsAndPrices in add product', this.mainListOfWeightsAndPrices);
      this.loading.dismiss();
    });
  }
  
  async addProductToCart(index) {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else {
      this.storage.get('userRole').then(async (role) => {
        if(role === 'admin') {
          this.presentAlert('Admin can not place any order!');
       } else if(role === 'deliveryAgent') {
        this.presentAlert('Delivery agent can not place any order!');
       } else {
        await this.presentLoading();
        const cartObj = {
          name: this.product.data.prodName,
          quantity: 1,
          img: this.product.data.coverPic,
          description: this.product.data.priceList[index].weight,
          productId: this.product.id,
          commentMsg: '',
          commentImgs: [],
          pack: {
            weight: this.product.data.priceList[index].weight,
          }
        }
        if(this.product.data.discount && this.product.data.discount !== '' && this.product.data.discount !== '0') {
          let discount = Math.ceil(this.product.data.priceList[index].price - (this.product.data.priceList[index].price * ((this.product.data.discount * 1) / 100)));
          cartObj['price'] = discount;
          cartObj.pack['price'] = discount;
        } else {
          cartObj['price'] = this.product.data.priceList[index].price;
          cartObj.pack['price'] = this.product.data.priceList[index].price;
        }
        this.events.publish('user:addProductToCartForPriceModal', cartObj, index);
        this.mainListOfWeightsAndPrices[index].inCart = true;
        this.mainListOfWeightsAndPrices[index].quantity = 1;
       }
      });
    }
  }

  async decrementQuantity(index: number){
    if(this.mainListOfWeightsAndPrices[index].quantity > 1) {
      await this.presentLoading();
      this.events.publish('user:updateQuantityOfCartProductForPriceModal', this.mainListOfWeightsAndPrices[index].quantity - 1, this.mainListOfWeightsAndPrices[index].cartId);
      this.mainListOfWeightsAndPrices[index].quantity = this.mainListOfWeightsAndPrices[index].quantity - 1;
    } else {
      this.mainListOfWeightsAndPrices[index].inCart = false;
      this.removeProduct(this.mainListOfWeightsAndPrices[index].cartId);
    }
  }
  async incrementQuantity(index: number){
    await this.presentLoading();
    this.events.publish('user:updateQuantityOfCartProductForPriceModal', this.mainListOfWeightsAndPrices[index].quantity + 1, this.mainListOfWeightsAndPrices[index].cartId);
    this.mainListOfWeightsAndPrices[index].quantity = this.mainListOfWeightsAndPrices[index].quantity + 1;
  }
  async removeProduct(id: string) {
    //console.log('remove id', id);
    await this.presentLoading();
    this.events.publish('user:removeProductFromCartForPriceModal', id);
  }

  closePriceListModal() {
    this.modalController.dismiss();
  }
  goToCart() {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else {
      this.storage.get('userRole').then((role) => {
        if(role === 'admin') {
          this.presentAlert('Cart is available only for user not for admin.');
       } else if(role === 'deliveryAgent') {
        this.presentAlert('Cart is available only for user not for delivery agent.');
       }
        else {
          this.closePriceListModal();
          this.router.navigate(['user-cart']);
       }
      });
  }
  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 5000
    });
    await this.loading.present();
  }
  getDiscountedProduct(price, discount) {
    let discountedPrice = Math.ceil(price - (price * ((discount * 1) / 100)));
    return discountedPrice;
  }
  removeSubscriptions() {
    this.events.unsubscribe('user:updateQuantityOfCartProductSuccessForPriceModal');
    this.events.unsubscribe('user:productRemovedFromCartForPriceModal');
    this.events.unsubscribe('user:productAddedToCartForPriceModal');
  }
}
