import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { ProductSubscriptionsService } from 'src/app/services/product-subscriptions/product-subscriptions.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { CreateSubscriptionPage } from '../create-subscription/create-subscription.page';

@Component({
  selector: 'app-product-variant',
  templateUrl: './product-variant.page.html',
  styleUrls: ['./product-variant.page.scss'],
})
export class ProductVariantPage implements OnInit {
  product;
  currencyCode: any;
  productSelectedIndex = [];
  subscriptionFeature = false;

  // For adding only one Variant without subscription
  addOnlyOneVariant;
  showSubscription;
  constructor(private modalController: ModalController, private configService: ConfigService, private productSubscriptionsService: ProductSubscriptionsService, private sharedService: SharedService) {
  }

  ngOnInit() {
    this.product.priceList.forEach(prodVariant => {
      if (!prodVariant.hasOwnProperty('added') && !prodVariant.added) {
        prodVariant['added'] = false;
      }
    });
    if (this.showSubscription == undefined) {
      this.subscriptionFeature = this.configService.environment.subscriptionFeature;
      this.showSubscription = this.subscriptionFeature;
    }
  }
  ionViewWillEnter() {
    this.subscriptionFeature = this.configService.environment.subscriptionFeature;
    this.currencyCode = this.configService.environment.currencyCode;
}

  close() {
    this.modalController.dismiss(this.productSelectedIndex);
  }

checkPdtStock(pdt, priceListIndex) {
  let isOutOfStock = false;
  if (!pdt.isPriceList) {
      if (pdt.productQty === '0' && pdt.stopWhenNoQty) {
          isOutOfStock = true;
      }
  } else {
      if (pdt.stopWhenNoQty) {
          if(pdt.priceList[priceListIndex].totalQuantity !== '0') {
              isOutOfStock = false;
          } else {
              isOutOfStock = true;
          }
      }
  }
  return isOutOfStock;
}

  addProduct(product, index) {
    console.log('productVariant:', product);
    const outOfStock = this.checkPdtStock(this.product, index);
    if(outOfStock) {
      this.sharedService.presentAlert('This product is out of stock.');
      return;
    }
    this.product.priceList[index].added = true;
    this.productSelectedIndex.push(index);
    if (this.addOnlyOneVariant) {
      this.close();
    }
  }

  
async subscribe(i) {
  let subsData:any = await this.productSubscriptionsService.getSettings('return');
  const productObj = {
    id: this.product.id,
    data: this.product,
};
  productObj.data.prodPrice = productObj.data.priceList[i].price;
  productObj.data.discountedPrice = productObj.data.priceList[i].discountedPrice;
  productObj.data['variantValue'] = productObj.data.priceList[i].weight;
  this.close();    
  this.modalController.create({
    component: CreateSubscriptionPage,
    componentProps: {
      product: productObj,
      subSettings: subsData
    }
  }).then(modalEl => {modalEl.present(); });
}

}
