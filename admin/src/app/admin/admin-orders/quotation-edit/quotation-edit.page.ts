import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ConfigService } from 'src/app/services/config/config.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-quotation-edit',
  templateUrl: './quotation-edit.page.html',
  styleUrls: ['./quotation-edit.page.scss'],
})
export class QuotationEditPage implements OnInit {

  products: any = [];
  currencyCode: any;
  order: any = {};
  currentPrices:any = []
  totalPrice: any = 0
  userRole = "";

  constructor(
    private configService: ConfigService,
    private orderService: OrderService,
    private alertController: AlertController,
    private modalController: ModalController,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    this.products = [...this.order.products];
    // this.getCurrentPrice()
    this.currencyCode = this.configService.environment.currencyCode;
    this.userRole = await this.storage.get('userRole');
  }

  async getCurrentPrice(){
    this.currentPrices = await this.orderService.getCurrentPrice(this.products)
    console.log(this.currentPrices)

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

  async saveEditOrder(){
    for (let i = 0; i < this.products.length; i++){
      if (this.products[i].quantity == null){
        this.presentAlert('Please fill the quantity!')
        return
      }
      if (this.getProductType(this.products[i]) == 'pieces'){
        if (this.products[i].pack.price == null){
          this.presentAlert('Please fill the price!')
          return
        }
        this.products[i].price = this.products[i].pack.price * this.products[i].quantity
        this.totalPrice += this.products[i].pack.price * this.products[i].quantity
      }
      else{
        if (this.products[i].price == null){
          this.presentAlert('Please fill the price!')
          return
        }
        this.totalPrice += (this.products[i].price * this.products[i].quantity) + (this.order.delivery || 0);
      }
    }
    let editResult = await this.orderService.saveEditQuotation(this.order.id,this.products,this.totalPrice)
    if (editResult){
      this.presentAlert('Order Edited Successfully!')
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }


  async presentAlert(desc: any) {
    const alert = await this.alertController.create({
      message: desc,
      buttons: ['Ok']
    });
    await alert.present();
  }

}
