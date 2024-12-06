import { Component, OnInit } from '@angular/core';
import { Events, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-admin-products-options',
  templateUrl: './admin-products-options.page.html',
  styleUrls: ['./admin-products-options.page.scss'],
})
export class AdminProductsOptionsPage implements OnInit {
  productId: string;
  showLoader: boolean = true;
  options: any = [];
  loading: any;
  constructor(private events: Events,
              private router: Router,
              private route: ActivatedRoute,
              private loadingController: LoadingController) { 
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.productId = this.router.getCurrentNavigation().extras.state.pid;
                  }
                });
               }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.events.publish('product-options:getAllProductOptions', this.productId);
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  removeSubscriptions() {
    this.events.unsubscribe('product-options:publishAllProductOptions');
    this.events.unsubscribe('product-options:deleteProductOptionSuccess');
  }

  initializeSubscriptions() {
    this.events.subscribe('product-options:publishAllProductOptions', (options) => {
      //console.log('options', options);
      this.options = options;
      this.showLoader = false;
    });
    this.events.subscribe('product-options:deleteProductOptionSuccess', () => {
      this.loading.dismiss();

    });
  }

  editProductOption(item: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        product: item,
        optionId: item.id,
        productId: this.productId,
        isOptionProduct: true,
        routeFromOptions: true
      }
    };
    this.router.navigate(['new-product'], navigationExtras);
  }

  checkPdtOutOfDelivery(pdt: any) {
    //console.log('in checkPdtOutOfDelivery...');
    let isOutOfStock = false;
    if(!pdt.isPriceList) {
      if(pdt.productQty === '0') {
        isOutOfStock = true;
      }
    } else {
      for(let pl of pdt.priceList) {
        if(pl.totalQuantity === '0') {
          isOutOfStock = true;
          break;
        }
      }
    }
    //console.log('isOutOfStock', isOutOfStock);
    return isOutOfStock;
  }

  async deleteProductOption(optionId) {
    await this.presentLoading();
    this.events.publish('product-options:deleteProductOption', optionId, this.productId);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 5000
    });
    await this.loading.present();
  }

}
