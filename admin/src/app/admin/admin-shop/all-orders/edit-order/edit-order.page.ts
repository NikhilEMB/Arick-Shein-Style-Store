import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { OrderService } from 'src/app/services/order/order.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.page.html',
  styleUrls: ['./edit-order.page.scss'],
})
export class EditOrderPage implements OnInit {
  products: any = [];
  unavailable: any = {};
  currencyCode: any;
  order: any = {};
  unavailableInitial: any = {};
  constructor(private modalController: ModalController,
              private configService: ConfigService,
              private sharedService: SharedService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.products = [...this.order.products];
    this.unavailable = {...this.order.unavailable};
    this.unavailableInitial = {...this.order.unavailable};
    this.currencyCode = this.configService.environment.currencyCode;
    this.products.map((el, index) => {
      this.unavailable[index] = this.unavailable[index] || 0;
    });
    console.log('unavailable 2', this.unavailable);

  }

  closeModal() {
    this.modalController.dismiss();
  }

  getProductType(product: any) {
    if(!product.hasOwnProperty('pack')) {
      return 'single';
    }
    if(product.hasOwnProperty('pack')) {
      if(product.pack.variantType && product.pack.variantType === 'pieces') {
        return 'pieces';
      } else {
        return 'variant';
      }
    }
  }

  getProductPrice(product: any) {
    const type = this.getProductType(product);
    if(type === 'single' || type === 'variant') {
      return product.price * product.quantity;
    }
    if(type === 'pieces') {
      return product.price;
    }
  }

  getProductImg(product: any) {
    if(product.img.mob) {
      return product.img.mob;
    }
    if(!product.img.mob && product.img.url) {
      return product.img.url;
    }
    if(!product.img.mob && !product.img.url) {
      return 'assets/img/img-preloader.png';
    }
  }

  getProductDesc(product: any) {
    const type = this.getProductType(product);
    let desc = product.description;
    if(type === 'variant') {
      desc = `${product.pack.variantType}: ${desc}`;
    }
    if(type === 'pieces') {
      desc = `${product.pack.variantType}: ${desc} X ${product.quantity}`;
    }
    return desc;
  }

  decrementQty(index: number) {
    if(this.unavailable[index] > (this.unavailableInitial[index] || 0)) {
      this.unavailable[index] -= 1;
    }
  }

  incrementQty(index: number, orderedQty: number) {
    if(this.unavailable[index] < orderedQty) {
      this.unavailable[index] += 1;
    }
  }

  async saveUnavailable() {
    console.log('this.unavailable', this.unavailable);
    if(JSON.stringify(this.unavailable) === JSON.stringify(this.unavailableInitial)) {
      this.sharedService.presentAlert('Please update any unavailable quantity');
      return;
    }
    await this.sharedService.presentLoading();
    const unavailablePrice = this.calcUnavailablePrice();
    await this.orderService.saveUnavailableProducts(this.unavailable, unavailablePrice, this.order)
    this.sharedService.loading.dismiss();
    this.modalController.dismiss({
      unavailable: this.unavailable,
      unavailablePrice
    });
  }

  calcUnavailablePrice() {
    let total = 0;
    this.products.map((pdt, index) => {
      if(this.unavailable[index] !== this.unavailableInitial[index]) {
        const memDiscount = (pdt.membershipDiscount / pdt.quantity) || 0;
        const couponDiscount = (pdt.couponDiscount / pdt.quantity) || 0;
        const price = pdt.hasOwnProperty('pack') && (pdt.pack.variantType === 'pieces') ? pdt.pack.price : pdt.price;
        total += (price - memDiscount - couponDiscount) * (this.unavailable[index] - (this.unavailableInitial[index] || 0));
      }
    });
    return total;
  }

  remove(index: number, orderedQty: number) {
    this.unavailable[index] = orderedQty;
  }

}
