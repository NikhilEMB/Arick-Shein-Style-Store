import { Component, OnInit } from '@angular/core';
import { Events, LoadingController, ModalController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { ProductVariantPage } from '../admin-orders/create-order/product-variant/product-variant.page';

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.page.html',
  styleUrls: ['./products-modal.page.scss'],
})
export class ProductsModalPage implements OnInit {
  productName;
  productList = [];
  currencyCode: any;
  // productAdded = {
  //   id: '',
  //   name: ''
  // }

  typingTimer;
  doneTypingInterval = 500;
  loading: any;
  isBundleProducts;
  bundleList;
  productAddedList = [];

  routeViaWhatsapp;
  alreadyAddedWAProducts;
  model;

  constructor(private events: Events,
              private modalController: ModalController, private configService: ConfigService,) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.currencyCode = this.configService.environment.currencyCode;
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('search-engine:publishProductsToCreateOrder', (productList) => {
      // if (this.routeViaWhatsapp && this.alreadyAddedWAProducts) {
      //   this.bundleList = this.alreadyAddedWAProducts
      // }

      if (this.isBundleProducts) {
        console.log("productList",productList);
        let result = productList.filter(product => product.isPriceList == false);
        this.returnCheckAddedProducts(result);
      } else {
        this.returnCheckAddedProducts(productList);
      }

    });
    // console.log("bundle:",this.bundleList);
  }

  async returnCheckAddedProducts(data: any) {
    console.log("bundleList",this.bundleList);
    console.log('this.alreadyAddedWAProducts:',this.alreadyAddedWAProducts);
    if (data.length) {
      for (let prod of data) {
        if (this.bundleList && this.bundleList.find(bundleProd => bundleProd.id == prod.id)) {
          prod["added"] = true;
          // if (this.routeViaWhatsapp && this.alreadyAddedWAProducts && prod.isPriceList) {
          //   for (let variant of prod.priceList) {
          //     if (this.alreadyAddedWAProducts && this.alreadyAddedWAProducts.find(prod => prod.variant == variant[prod.variantType])) {
          //       console.log('variant[prod.variantType]:',variant[prod.variantType]);
          //       console.log('variant added');
          //       variant['added'] = true;
          //       prod["added"] = false;
          //     } else{
          //       variant['added'] = false;
          //     }
          //   }
          // }
          // console.log("matchedProd:", prod);
        } else {
          prod["added"] = false;
        }
      }
      // console.log("result", data);
      if (this.model == 'service' || this.model == 'product') {
        let productType = this.model == 'service' ? 'booking' : '';
        this.productList = data.filter((product)=> product.productType == productType)
      } else {
        this.productList = data;
      }
      console.log('this.productList:',this.productList);

    }
  }

  fireSearchQuery() {
    clearTimeout(this.typingTimer);
    if(this.productName.length > 2) {
      this.typingTimer = setTimeout(() => {
        console.log('in fireSearchQuery...');
        this.events.publish('search-engine:alogoliaSearchProductsToCreateOrder', this.productName, 0, 'new_search');
      }, this.doneTypingInterval);
    }
  }

  addProduct(product) {
    if (product.isPriceList) {
      this.presentProductVariantModal(product);
    } else {
      product.added = true;
      // this.productAdded.id = product.id;
      // this.productAdded.name = product.prodName;
      // this.closeModal();
      if (!this.productAddedList.find(prod => prod.id == product.id)) {
        this.productAddedList.push({
          id: product.id,
          name: product.prodName,
        });
      }
      if (!this.routeViaWhatsapp) {
        this.saveBundleProduct();
      }
      console.log("productAdded:",this.productAddedList);
    }
  }

  async presentProductVariantModal(product){
    const modal = await this.modalController.create({
    component: ProductVariantPage,
    backdropDismiss: false,
    componentProps: {
      product: product,
      addOnlyOneVariant: true,
      showSubscription: false,
    }
    });
    modal.onDidDismiss()
    .then((res) => {
      if(res.data) {
        res.data.forEach(variantIndex => {
          // this.productAdded.id = product.id;
          // this.productAdded.name = product.prodName;
          // this.productAdded['variant'] = product.priceList[variantIndex][variantType];
          // let variantType = product.variantType;
          this.productAddedList.push({
            id: product.id,
            name: product.prodName,
            // variant: product.priceList[variantIndex][variantType] || product.variantType,
            variant: product.priceList[variantIndex]['weight'],
          });
        });
        console.log("variant productAddedList", this.productAddedList);
      }
      if (!this.routeViaWhatsapp) {
        setTimeout(() => {
          // this.closeModal();
          this.saveBundleProduct();
        }, 100);
      }
  });
    await modal.present();
  }
  closeModal() {
    // this.modalController.dismiss(this.productAdded);
    this.modalController.dismiss();
  }
  removeSubscriptions() {
    this.events.unsubscribe('search-engine:publishProductsToCreateOrder');
  }

  saveBundleProduct() {
    console.log("productAddedList",this.productAddedList);
    this.modalController.dismiss(this.productAddedList);
  }

}
