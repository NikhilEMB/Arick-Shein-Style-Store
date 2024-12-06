import { LabelService } from 'src/app/services/label/label.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Events, LoadingController, AlertController } from '@ionic/angular';
import { ExportToCsv } from 'export-to-csv';
import * as moment from 'moment';
import { ProductService } from 'src/app/services/product/product.service';
import { BrandsService } from 'src/app/services/brands/brands.service';
import { SharedService } from 'src/app/services/shared/shared.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  showLoader = true;
  products = [];
  DASHBOARD_LABELS = {};
  headerText = '';
  loading: any;
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    filename: 'Products',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: false,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
  categories: any;
  allSubcategories: any;
  brands: any;
  isAllProductSelect: boolean = false;
  selectedProducts: any= [];

  constructor(
    private events: Events,
    private router: Router,
    private labelService: LabelService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private productService: ProductService,
    private brandService: BrandsService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.DASHBOARD_LABELS = this.labelService.labels['DASHBOARD'];
    this.headerText = this.DASHBOARD_LABELS['header_text'];
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.events.publish('product:getOutOfStockProducts');
  }

  ngOnDestroy(): void {
    this.removeSubscriptions();
  }

  async initializeSubscriptions() {
    this.events.subscribe('product:publishOutOfStockProducts', (products) => {
      this.products = products;
      this.showLoader = false;
    });
    this.events.subscribe('product:editSuccess', (heading, desc) => {
      //console.log('in edit success sub');
      if (this.loading){
        this.loading.dismiss();
      }
      this.presentAlert(heading, desc);
    });
    this.events.subscribe('product:editFailure', (heading, desc) => {
      if(this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert(heading, desc);
    });
    if (!this.categories) {
      this.categories = await this.productService.getAllCategoriesForSideMenu()
    }
    if (!this.brands) {
      this.brands = await this.brandService.getAllBrandsForSideMenu()
    }
    if (!this.allSubcategories) {
      this.allSubcategories = await this.productService.getAllSubcategoriesForSideMenu()
    }
    console.log('categories : ', this.categories);
    console.log('allSubcategories : ', this.allSubcategories);
    console.log('brands : ', this.brands);
  }

  editProduct(itemId: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        productId: itemId
      }
    };
    this.router.navigate(['new-product'], navigationExtras);
  }

  async saveProduct(itemData, itemID) {
    await this.presentLoading()
    this.events.publish('product:editProduct', itemData, itemID,[],'');
  }

  async presentAlert(heading: any, desc: any) {
    const alert = await this.alertController.create({
      header: heading,
      message: desc,
      buttons: ['Ok']
    });
    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Please Wait...",
    });
    await this.loading.present();
  }

  getPriceListFields(priceList) {
    let fields = {
      type: [],
      price: [],
      discountedPrice: [],
      purchasePrice: [],
      totalQuantity: [],
      shippingWeight: []
    }
    priceList.forEach((item, index) => {
      fields.type[index] = item.weight ? item.weight : '';
      fields.price[index] = item.price ? item.price : 0,
      fields.discountedPrice[index] = item.discountedPrice ? item.discountedPrice : 0,
      fields.purchasePrice[index] = item.purchasePrice ? item.purchasePrice : 0,
      fields.totalQuantity[index] = item.totalQuantity ? item.totalQuantity : '0'
      fields.shippingWeight[index] = item.shippingWeight ? item.shippingWeight : 0
    });

    return fields;
  }

  getDateTimeFormat(date) {
    return moment(date).format('MMM D, YYYY hh:mm a');
  }

  async exportOutOfStockProducts() {
      this.options.filename = this.options.filename + ' ' + this.getDateTimeFormat(new Date);
      let products = [], count = 0;
      console.log('prod---:', this.products);
      this.products.forEach(item => {
        let product = item;
        let productCategories = product.categories
        let categoryList = []
        let productBrands = product.brands
        let brandList = []
        if (this.categories) {
          if (product.categories) {
            productCategories.forEach(categoryId => {
              let result = this.categories.find(obj => {
                return obj.id === categoryId
              })
              if (result) {
                categoryList.push(result.name)
              }
              if (this.allSubcategories) {
                let resultSub = this.allSubcategories.find(obj => {
                  return obj.id === categoryId
                })
                if (resultSub) {
                  let catResult = this.categories.find(obj => {
                    return obj.id === resultSub.categoryId
                  })
                  if (catResult) {
                    categoryList.push(catResult.name + '-' + resultSub.name)
                  }
                }
              }
            });
          }
        }
        if (this.brands) {
          if (product.brands) {
            productBrands.forEach(brandId => {
              let result = this.brands.find(obj => {
                return obj.id === brandId
              })
              if (result) {
                brandList.push(result.name)
              }
            });
          }
        }
        let fields = {};
        if (product.isPriceList) {
          fields = this.getPriceListFields(product.priceList);
  
        }
        else {
          product.price = product.price ? product.price : 0;
          product.discountedPrice = product.discountedPrice ? product.discountedPrice : 0;
          product.purchasePrice = product.purchasePrice ? product.purchasePrice : 0;
          product.quanity = product.quanity ? product.quanity : '';
          product.shippingWeight = product.shippingWeight ? product.shippingWeight : 0;
        }
        count ++
        products.push({
          sno: count,
          sku: product.productCode ? product.productCode : '',
          name: product.prodName ? product.prodName : '',
          barcodeNo: product.barcodeNo ? product.barcodeNo : '',
          active: product.status ? 'YES' : 'NO',
          variants: product.isPriceList ? 'YES' : 'NO',
          variantType: product.variantType ? product.variantType : 'other',
          variantName: product.isPriceList ? fields['type'].join() : '',
          price: product.isPriceList ? fields['price'].join(', ') : product.prodPrice,
          discountedPrice: product.isPriceList ? fields['discountedPrice'].join(', ') : product.discountedPrice,
          purchasePrice: product.isPriceList ? fields['purchasePrice'].join(', ') : product.purchasePrice,
          quantity: product.isPriceList ? fields['totalQuantity'].join(', ') : product.productQty,
          shippingWt: product.isPriceList ? fields['shippingWeight'].join(', ') : product.shippingWeight,
          minQuanity: product.minQty ? product.minQty : '',
          maxQuantity: product.maxQty ? product.maxQty : '',
          productDescription: product.prodDesc ? product.prodDesc : '',
          hsnCode: product.hsnCode ? product.hsnCode : '',
          gst: product.gst ? product.gst : '',
          color: product.color && product.color.name && product.color.code ? product.color.name + ',' + product.color.code : '',
          keywords: product.searchKeywords ? product.searchKeywords.join() : '',
          out_of_stock: product.stopWhenNoQty ? 'YES' : 'NO',
          catSubcat: product.categories ? categoryList.join(';') : '',
          brands: product.brands ? brandList.join(';') : '',
        });
  
      });
      if (this.loading) {
        this.loading.dismiss();
      }
      const csvExporter = new ExportToCsv(this.options);
      csvExporter.generateCsv(products);
  }

  removeSubscriptions() {
    this.events.unsubscribe('product:publishOutOfStockProducts');
    this.events.publish('product:removeOutOfStockSub');
  }

  // ? Delete Out-Of-Stock Products Functions Start

  selectAllProducts() {
    this.isAllProductSelect = !this.isAllProductSelect;
    if (this.isAllProductSelect) {
      this.selectedProducts = [];
      for (const item of this.products) {
        this.selectedProducts.push(item.id);
      }
    }
    else {
      this.selectedProducts = [];
    }
    console.log("selected product: " , this.selectedProducts);
  }

  onClickCheckBox(id: string) {
    if (this.selectedProducts.indexOf(id) === -1) {
      this.selectedProducts.push(id);
    }
    else {
      const index = this.selectedProducts.indexOf(id);
      this.selectedProducts.splice(index, 1);
    }
    console.log("Product selected: " , this.selectedProducts);
  }

  editCheckBoxValue(id: string) {
    if (this.selectedProducts.indexOf(id) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  async askDeleteProduct() {
    if (this.selectedProducts.length > 0) {
      const alert = await this.alertController.create({
        subHeader: "Are you sure you want to delete this products ?",
        buttons: [
          {
            text: "No",
            role: 'cancel',
            cssClass: 'secondary',
            handler: async () => {
            }
          }, {
            text: "Yes",
            handler: async () => {
              await this.deleteProducts();
            }
          }
        ]
      });
      await alert.present();
    } else {
      await this.sharedService.presentAlert("Please select a product to delete");
    }
  }

  async deleteProducts() {
    await this.sharedService.presentLoading();
    if (this.selectedProducts.length > 0) {
      console.log("product selected to delete: ", this.selectedProducts);

      let response = await this.productService.deleteOutOfStockProducts(this.selectedProducts);
      await this.sharedService.loading.dismiss();
      
      // console.log("response: ", response);
      if (response) {
        await this.sharedService.presentAlert("Products deleted successfully")
      } else {
        await this.sharedService.presentAlert("Something went wrong")
      }

    } else {
      await this.sharedService.loading.dismiss();
      await this.sharedService.presentAlert("Please select a product to delete");
    }
  }

  // ? Delete Out-Of-Stock Products Functions End

}
