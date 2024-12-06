import { Component, OnInit } from '@angular/core';
import { ModalController, Events, AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-buynow-pricelist-modal',
  templateUrl: './buynow-pricelist-modal.page.html',
  styleUrls: ['./buynow-pricelist-modal.page.scss'],
})
export class BuynowPricelistModalPage implements OnInit {

  product: any;
  userId: string;
  loading: any;
  constructor(private modalController: ModalController,
              private events: Events,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private userService: UserService,
              private router: Router,
              private storage: Storage) { }

  ngOnInit() {
    //console.log('product in modal', this.product);
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.userId = this.userService.getUserId();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    
  }

  closePriceListModal() {
    this.modalController.dismiss();
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

  decrementQuantity(i) {
    if(this.product.data.priceList[i].quantity > 1) {
      this.product.data.priceList[i].quantity--;
    }
  }

  incrementQuantity(i) {
    this.product.data.priceList[i].quantity++;
  }

  buyNowOrder(i) {
    this.closePriceListModal();           
    const cartObj = {
      name: this.product.data.prodName,
      quantity: this.product.data.priceList[i].quantity,
      price: this.product.data.priceList[i].price,
      img: this.product.data.coverPic,
      description: this.product.data.priceList[i].weight,
      productId: this.product.id,
      commentMsg: '',
      commentImgs: [],
      pack: {
        weight: this.product.data.priceList[i].weight,
        price: this.product.data.priceList[i].price
      }
    }
    if(this.product.data.discount && this.product.data.discount !== '' && this.product.data.discount !== '0') {
      let discount = Math.ceil(this.product.data.priceList[i].price - (this.product.data.priceList[i].price * ((this.product.data.discount * 1) / 100)));
      cartObj['price'] = discount;
      cartObj.pack['price'] = discount;
    } else {
      cartObj['price'] = this.product.data.priceList[i].price;
      cartObj.pack['price'] = this.product.data.priceList[i].price;
    }
    let buyNowOrderProduct = [];
    buyNowOrderProduct.push(cartObj);
    this.storage.set('productsInCart', buyNowOrderProduct);
    this.storage.set('buyNowOrder', true);
    this.storage.get('userDefaultAddress').then((address) => {
      //console.log(address);
      if(!address) {
        const navigationExtras: NavigationExtras = {
          state: {
            routeFromCheckoutPage: true,
          }
        };
        this.router.navigate(['new-address'], navigationExtras);
      } else {
        this.router.navigate(['order-summary']);
      }
    });
         
  }

  removeSubscriptions() {
  }
}
