import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { SubscriptionLike } from 'rxjs';
import { ImportExportManagerService } from 'src/app/services/import-export-manager/import-export-manager.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { map, first, take } from 'rxjs/operators';
import { ExportToCsv } from 'export-to-csv';
import * as moment from 'moment';
import { FileDetector } from 'protractor';
import { Events, MenuController, Platform, ModalController } from '@ionic/angular';
import { Papa } from 'ngx-papaparse';
import { CsvImportRulesPage } from '../csv-import-rules/csv-import-rules.page';

@Component({
  selector: 'app-product-csv-importer',
  templateUrl: './product-csv-importer.page.html',
  styleUrls: ['./product-csv-importer.page.scss'],
})
export class ProductCsvImporterPage implements OnInit {

  buttonState: string = ''
  prodLength: number = 0
  detectedFields: any[] = []
  allCategories: any[] = []
  allSubCategories: any[] = []
  allVendors: any[] = []
  allBrands: any[] = []
  allFilters: any = []
  allFields: any[] = ['Sku', 'Name', 'Barcode', 'Active', 'Is Variant', 'Type of Variant', 'Variant Value', 'Variant Name', 'Price', 'Discounted Price', 'Purchase Price', 'Vendor Phone Number', 'Stocks', 'Shipping Weight', 'Minimum Quantity', 'Maximum Quantity', 'Product Description', 'HSN Code', 'GST', 'Color', 'keywords', 'Out of Stock', 'Categories', 'Brands', 'Filters']
  allCSVProducts: any[] = []
  totalProcessed: number = 0
  needBrands: boolean = false;
  needCategories: boolean = false;
  brands: any;
  categories: any;
  isProgressBarActive: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private importExportManagerService: ImportExportManagerService,
    private toastController: ToastController,
    private papa: Papa,
    private afs: AngularFirestore,
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.sharedService.presentLoading();
    this.buttonState = 'Upload'
    this.allCategories = await this.importExportManagerService.getAllCategories()
    this.allSubCategories = await this.importExportManagerService.getAllSubCategories()
    this.allBrands = await this.importExportManagerService.getAllBrands()
    this.allVendors = await this.importExportManagerService.getAllVendors()
    this.allFilters = await this.importExportManagerService.getAllFilters()
    console.log('allFilters : ', this.allFilters)
    await this.sharedService.loading.dismiss();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  async presentToastWithOptions(header: string, message: string, errorCode: string) {
    const toast = await this.toastController.create({
      mode: 'ios',
      color: 'dark',
      header: header,
      message: message,
      duration: 5000,
      position: 'top',
      buttons: [
        {
          side: 'start',
          text: errorCode,
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async openCSVImportRules() {
    const modal = await this.modalController.create({
      component: CsvImportRulesPage,
      cssClass: 'custom-modalFull',
    });
    await modal.present();
  }

  getCSVHeaderValue(field: string) {
    switch (field) {
      case 'Sku':
        return 'sku'
        break;
      case 'Name':
        return 'name'
        break;
      case 'Barcode':
        return 'barcodeNo'
        break;
      case 'Active':
        return 'active'
        break;
      case 'Is Variant':
        return 'variants'
        break;
      case 'Type of Variant':
        return 'variantType'
        break;
      case 'Variant Name':
        return 'variantName'
        break;
      case 'Variant Value':
        return 'variantValue'
        break;
      case 'Price':
        return 'price'
        break;
      case 'Discounted Price':
        return 'discountedPrice'
        break;
      case 'Purchase Price':
        return 'purchasePrice'
        break;
      case 'Vendor Phone Number':
        return 'vendorPhoneNo'
        break;
      case 'Stocks':
        return 'quantity'
        break;
      case 'Shipping Weight':
        return 'shippingWt'
        break;
      case 'Minimum Quantity':
        return 'minQuantity'
        break;
      case 'Maximum Quantity':
        return 'maxQuantity'
        break;
      case 'Product Description':
        return 'prodDescription'
        break;
      case 'HSN Code':
        return 'hsnCode'
        break;
      case 'GST':
        return 'gst'
        break;
      case 'Color':
        return 'color'
        break;
      case 'Keywords':
        return 'keywords'
        break;
      case 'Out of Stock':
        return 'out_of_stock'
        break;
      case 'Categories':
        return 'catSubcat'
        break;
      case 'Brands':
        return 'brands'
        break;
      case 'Filters':
        return 'filters'
      default: // experimental
        return field
    }
  }

  async checkValidCSV(event: any, jsonData: any[]) {
    if (event.target.files[0].name.includes('.csv')) {
      for (const mainField of jsonData[0]) {
        if (this.allFields.some(field => field === mainField)) {
          return true
        }
        else {
          await this.presentToastWithOptions('Invalid CSV Column(s)!', 'Pls Check the CSV before uploading.', 'ERR-191')
          return false
        }
      }
    } else {
      await this.presentToastWithOptions('Invalid File Format!', 'The file should be only in [ .csv ] format.', 'ERR-190')
      return false
    }
  }

  getItem(detectedFields: any, csvProd: any) {
    // console.log('detectedFields: ', detectedFields);
    // console.log('csvProd: ', csvProd)
    let item = {}
    for (let i = 0; i < detectedFields.length; i++) {
      item[detectedFields[i].value] = csvProd[i]
    }
    // console.log('item : ', item)
    return item
  }

  async checkProductName(allCSVProducts: any) {
    console.log('ddddd : ', allCSVProducts)
    for (let i = 0; i < allCSVProducts.length; i++) {
      console.log('eeeee : ',i + 1, allCSVProducts[i][1])
      if (allCSVProducts[i][1] && allCSVProducts[i][1].length > 200) {
        await this.presentToastWithOptions('Invalid Product Name!', `Product - " ${JSON.stringify(allCSVProducts[i][1])} ", Name exceeding 200 character limit!`, 'ERR-195')
        return false
      }
    }
    return true
  }

  async importProductsHandler(event: any, state: string) {
    let jsonData = []
    if (state === 'Upload') {
      this.totalProcessed = 0
      this.allCSVProducts = []
      let csv = event.target.files[0]
      console.log('csv : ', csv)
      let options = {
        complete: async (result, file) => {
          jsonData = result.data
          let validity = await this.checkValidCSV(event, jsonData)
          console.log('validity : ', validity)
          if (validity) {
            console.log('jsonData : ', jsonData)
            this.detectedFields = []
            this.prodLength = jsonData.length - 1
            console.log('this.prodLength : ', this.prodLength);
            for (const field of jsonData[0]) {
              this.detectedFields.push({
                name: field,
                value: this.getCSVHeaderValue(field),
                active: false
              })
            }
            console.log('detectedFields : ', this.detectedFields)
            this.allCSVProducts = jsonData
            // * Remove headers
            this.allCSVProducts.shift()
            this.allCSVProducts.splice(-1,1)
            if (this.detectedFields.length && await this.checkProductName(this.allCSVProducts)) {
              this.buttonState = 'Import'
            }
          }
        }
      }
      this.papa.parse(csv, options)
    }
    if (state === 'Import') {
      console.log('importing');
      await this.presentToastWithOptions('NOTE','Please do not close this tab while products are being imported!','WR-19')
      for (const field of this.detectedFields) {
        field.active = true;
      }

      console.log('this.detectedFields.length : ' + this.detectedFields.length);
      console.log('this.allCSVProducts.length : ' + this.allCSVProducts.length);
      let chunkCount = 0
      if (this.allCSVProducts && this.allCSVProducts.length) {
        await this.sharedService.presentLoading("Please Wait...",1000000)
        console.log(this.allCSVProducts)
        for (var i = 0; i < this.allCSVProducts.length; i++) {

          // if (this.allCSVProducts[i][20] && this.allCSVProducts[i][20] != '') {
            this.needCategories = true;
          // }
    
          // if (this.allCSVProducts[i][21] && this.allCSVProducts[i][21] != '') {
            this.needBrands = true;
          // }
        }
        let catList = [];
        if (!this.brands && this.needBrands) {
          this.brands = {};
          const brandsRef = this.afs.collection('brands');
          const brandsSnap = brandsRef.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data: any = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            })));
          const brandsDocs = await brandsSnap.pipe(first()).toPromise();
    
    
          brandsDocs.forEach((brand: any) => {
    
            if (brand.name) {
              this.brands[(brand.name || '').toLowerCase().trim()] = brand.id;
            }
    
          });
        }
        if (!this.categories && this.needCategories) {
          this.categories = {};
          const catgeoryRef = this.afs.collection('categories');
          const catgeorySnap = catgeoryRef.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data: any = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            })));
          const catDocs = await catgeorySnap.pipe(first()).toPromise();
    
    
          catDocs.forEach((cat: any) => {
    
            this.categories[cat.name.toLowerCase().trim()] = { id: cat.id, subcategories: {} };
            catList.push({ id: cat.id, name: cat.name.toLowerCase().trim() });
    
          });
    
          for (var i = 0; i < catList.length; i++) {
    
            const subcatgeoryRef = this.afs.collection('categories').doc(catList[i]['id']).collection('subcategories');
            const subcatgeorySnap = subcatgeoryRef.snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              })));
    
            const subCatDocs = await subcatgeorySnap.pipe(first()).toPromise();
    
            subCatDocs.forEach(async (cat: any) => {
    
              this.categories[catList[i]['name']]['subcategories'][cat.name.toLowerCase().trim()] = cat.id;
    
            });
          }
    
    
        }
        let vendorId = '', vendorName = '';
        this.isProgressBarActive = true
        for (let i = 0; i < this.allCSVProducts.length; i++) {
          // let item = {
          //   sku: this.allCSVProducts[i][0],
          //   name: this.allCSVProducts[i][1],
          //   barcodeNo: this.allCSVProducts[i][2],
          //   active: this.allCSVProducts[i][3],
          //   variants: this.allCSVProducts[i][4],
          //   variantType: this.allCSVProducts[i][5],
          //   variantName: this.allCSVProducts[i][6],
          //   price: this.allCSVProducts[i][7],
          //   vendorPhoneNo: this.allCSVProducts[i][8],
          //   discountedPrice: this.allCSVProducts[i][9],
          //   purchasePrice: this.allCSVProducts[i][10],
          //   quantity: this.allCSVProducts[i][11],
          //   shippingWt: this.allCSVProducts[i][12],
          //   minQuantity: this.allCSVProducts[i][13],
          //   maxQuantity: this.allCSVProducts[i][14],
          //   productDescription: this.allCSVProducts[i][15],
          //   hsnCode: this.allCSVProducts[i][16],
          //   gst: this.allCSVProducts[i][17],
          //   color: this.allCSVProducts[i][18],
          //   keywords: this.allCSVProducts[i][19],
          //   out_of_stock: this.allCSVProducts[i][20],
          //   catSubcat: this.allCSVProducts[i][21],
          //   brands: this.allCSVProducts[i][22],
          // }
          let item = this.getItem(this.detectedFields, this.allCSVProducts[i])
          // console.log('item2 : ', item)
          let orgProduct: any = {};
          if (item['sku']) {
            let prodId = null, product = {};
            let formattedSKU = ''
              if (item['sku'].includes('\t')) {
                formattedSKU = item['sku'].slice(1)
              } else {
                formattedSKU = item['sku']
              }
            const prodRef = this.afs.collection("products", ref => ref.where("productCode", "==", formattedSKU));
            const productsSnap = prodRef.snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              }))
            );
            const pdtDocs = await productsSnap.pipe(first()).toPromise();
            // console.log('pdtDocs : ', pdtDocs);
            if (pdtDocs) {
              pdtDocs.forEach(async (pdt) => {
                prodId = pdt.id;
                orgProduct = pdt;
              });
            }
            let unformatted = '' 
            if (item['vendorPhoneNo']) {
              unformatted = item['vendorPhoneNo'].slice(1)
              unformatted = unformatted.slice(0, -1)
              // console.log('unformatted : ', unformatted.trim());
              if (this.allVendors.some(v => v.phoneNo === unformatted.trim())) {
                let vendorData = this.allVendors.find(v => v.phoneNo === unformatted.trim())
                vendorId = vendorData.id
                vendorName = vendorData.name
              }
              // console.log('vendorId : ', vendorId)
              // console.log('vendorName : ', vendorName)
            }
            if (prodId) {
              // if (productCode == item.sku) {
              //   console.log('match : ', item.name);
              //   matchingProds.push(item.name)
              //   console.log('mprds', matchingProds);
              //   if (matchingProds.length <= matchingProds.length - 1) {
              //     this.presentAlert('SKU already exists!', `Products with matching SKU Code are as follows :- ${matchingProds}`)
              //   }
              // }          
    
              if (item['name'] && item['name'].trim() != '') {
                product['prodName'] = item['name'] ? item['name'].trim() : '';
                product['nameToSearch'] = item['name'] ? item['name'].trim() : '';
              }
              if (item['active'] && item['active'].trim() != '') {
                product['status'] = item['active'] && item['active'].toLowerCase() == 'yes' ? true : false;
              }
              if (item['barcodeNo'] && item['barcodeNo'].trim() != '') {
                product['barcodeNo'] = item['barcodeNo'] ? item['barcodeNo'].trim() : '';
              }

              // console.log('vendor id : ', vendorId)
              // console.log('vendor name : ', vendorName)
              if (item['vendorPhoneNo'] && (item['vendorPhoneNo'].trim() != '')) {
                product['vendorId'] = vendorId ? vendorId : ''
                product['vendorName'] = vendorName ? vendorName : ''
              }
              product['updatedAt'] = new Date();
              product['productType'] = '';
    
              product['isPriceList'] = item['variants'] && item['variants'].toLowerCase() == 'yes' ? true : orgProduct && orgProduct.isPriceList ? orgProduct.isPriceList : false;
    
    
              if (!product['isPriceList']) {
    
                if (item['discountedPrice'] && item['discountedPrice'].trim() != '') {
                  product['discountedPrice'] = item['discountedPrice'] ? parseFloat(item['discountedPrice'].trim()) : parseFloat(item['price'].trim());
                }
                if (item['price'] && item['price'].trim() != '') {
                  product['prodPrice'] = parseFloat(item['price'].trim());
                }
                if (item['quantity'] && item['quantity'].trim() != '') {
                  product['productQty'] = item['quantity'] ? item['quantity'].trim() : 0;
                }
                if (item['shippingWt'] && item['shippingWt'].trim() != '') {
                  product['shippingWeight'] = parseInt(item['shippingWt'].trim());
                }
                if (item['purchasePrice'] && item['purchasePrice'].trim() != '') {
                  product['purchasePrice'] = parseFloat(item['purchasePrice'].trim());
                }
    
    
              }
              else {
                product['priceList'] = orgProduct.priceList ? orgProduct.priceList : [];
                if (item['variantName'] && item['variantName'].trim() != '') {
                  let variantItems = item['variantName'].split(',');
                  variantItems.forEach((variant, index) => {
                    if (!product['priceList'][index]) {
                      product['priceList'][index] = {};
                    }
                    product['priceList'][index]['name'] = variant.trim();
                  });
                }
                if (item['variantValue'] && item['variantValue'].trim() != '') {
                  let variantValues = item['variantValue'].split(',');
                  variantValues.forEach((variant, index) => {
                    if (!product['priceList'][index]) {
                      product['priceList'][index] = {};
                    }
                    product['priceList'][index]['weight'] = variant.trim();
                  });
                }
                if (item['price'] && item['price'].trim() != '') {
                  let priceItems = item['price'].split(',');
                  priceItems.forEach((price, index) => {
                    if (!product['priceList'][index]) {
                      product['priceList'][index] = {};
                    }
                    product['priceList'][index]['price'] = price ? parseFloat(price.trim()) : 0;
                  });
                }
                if (item['discountedPrice'] && item['discountedPrice'].trim() != '') {
                  let discountedPriceItems = item['discountedPrice'].split(',');
                  discountedPriceItems.forEach((discountedPrice, index) => {
                    if (!product['priceList'][index]) {
                      product['priceList'][index] = {};
                    }
                    product['priceList'][index]['discountedPrice'] = discountedPrice ? parseFloat(discountedPrice.trim()) : product['priceList'][index]['price'] ? parseFloat(product['priceList'][index]['price'].trim()) : 0;
                  });
                }
                if (item['purchasePrice'] && item['purchasePrice'].trim() != '') {
                  let purchasePriceItems = item['purchasePrice'].split(',');
                  purchasePriceItems.forEach((purchasePrice, index) => {
                    if (!product['priceList'][index]) {
                      product['priceList'][index] = {};
                    }
                    product['priceList'][index]['purchasePrice'] = purchasePrice ? parseFloat(purchasePrice.trim()) : 0;
                  });
                }
                if (item['quantity'] && item['quantity'].trim() != '') {
                  let quantityItems = item['quantity'].split(',');
                  quantityItems.forEach((quantity, index) => {
                    if (!product['priceList'][index]) {
                      product['priceList'][index] = {};
                    }
                    product['priceList'][index]['totalQuantity'] = quantity ? quantity.trim() : '0';
                  });
                }
                if (item['shippingWt'] && item['shippingWt'].trim() != '') {
                  let shippingItems = item['shippingWt'].split(',');
                  shippingItems.forEach((shippingWt, index) => {
                    if (!product['priceList'][index]) {
                      product['priceList'][index] = {};
                    }
                    product['priceList'][index]['shippingWeight'] = shippingWt ? shippingWt.trim() : '0';
                  });
                }
              }
    
              if (item['variantType'] && item['variantType'].trim() != '') {
                product['variantType'] = item['variantType'] ? item['variantType'].trim() : 'other';
              }
              if (item['prodDescription'] && item['prodDescription'].trim() != '') {
                product['prodDesc'] = item['prodDescription'] ? item['prodDescription'].trim() : '';
              }
              if (item['hsnCode'] && item['hsnCode'].trim() != '') {
                product['hsnCode'] = item['hsnCode'] ? item['hsnCode'].trim() : '';
              }
              if (item['gst'] && item['gst'].trim() != '') {
                product['gst'] = item['gst'] ? item['gst'] : 0;
              }
              if (item['brands'] && item['brands'].trim() != '') {
                product['brands'] = [];
                let bds = item['brands'].split(";");
    
                bds.forEach(brand => {
                  brand = brand.toLowerCase().trim();
                  if (this.brands[brand]) {
                    product['brands'].push(this.brands[brand]);
                  }
                });
              }
              if (item['catSubcat'] && item['catSubcat'].trim() != '') {
                product['categories'] = [];
                // console.log(this.categories);
                let cats = item['catSubcat'].split(";");
                // console.log(cats);
                cats.forEach(cat => {
                  cat = cat.toLowerCase().trim();
                  let catsubcat = cat.split("-");
    
                  if (catsubcat[0]) {
                    catsubcat[0] = catsubcat[0].trim();
                  }
                  if (catsubcat[1]) {
                    catsubcat[1] = catsubcat[1].trim();
                  }
    
                  if (catsubcat[0] && this.categories[catsubcat[0]] && this.categories[catsubcat[0]]['id'] && product['categories'].indexOf(this.categories[catsubcat[0]]['id']) < 0) {
                    product['categories'].push(this.categories[catsubcat[0]]['id']);
                  }
                  if (catsubcat[1] && this.categories[catsubcat[0]] && this.categories[catsubcat[0]]['id'] && this.categories[catsubcat[0]]['subcategories'] && this.categories[catsubcat[0]]['subcategories'][catsubcat[1]] && product['categories'].indexOf(this.categories[catsubcat[0]]['subcategories'][catsubcat[1]]) < 0) {
                    product['categories'].push(this.categories[catsubcat[0]]['subcategories'][catsubcat[1]]);
                  }
    
                  // console.log(product['categories']);
                });
              }
              if (item['filters'] && item['filters'].trim() != '') {
                let providedFilterData = item['filters'].split('|')
                let filter = {}
                for (let i = 0; i < providedFilterData.length; i++) {
                  let filterData = providedFilterData[i].split(':')
                  let filterName = filterData[0]
                  let filterValues = filterData[1].split(',')
                  for (let j = 0; j < filterValues.length; j++) {
                    filter[filterName] = [...filterValues]
                  }
                }
                console.log('provided filter : ', filter)
                // *** Verify Filters ***
                if (this.allFilters.length) {
                  product['filters'] = {}
                  for (let i = 0; i < this.allFilters.length; i++) {
                    if (filter[this.allFilters[i].name]) {
                      console.log('filters : ', filter[this.allFilters[i].name])
                      let valueState = filter[this.allFilters[i].name].every((el: any) => this.allFilters[i].value.includes(el))
                      if (valueState) {
                        product['filters'][this.allFilters[i].name] = filter[this.allFilters[i].name]
                      }
                    }
                  }
                  console.log('Final filters : ', product['filters'])
                }
              }
              if (item['color'] && item['color'].trim() != '') {
                let colorVals = item['color'].split(',');
                product['color'] = {
                  code: colorVals[1] ? colorVals[1].trim() : '',
                  name: colorVals[0] ? colorVals[0].trim() : ''
                }
              }
              if (item['keywords'] && item['keywords'].trim() != '') {
                product['searchKeywords'] = [];
                let keywords = item['keywords'].split(',');
                keywords.forEach(key => {
                  product['searchKeywords'].push(key.trim());
                });
              }
              if (item['out_of_stock'] && item['out_of_stock'].trim() != '') {
                product['stopWhenNoQty'] = item['out_of_stock'] && item['out_of_stock'].toLowerCase() == 'yes' ? true : false;
              }
              if (item['minQuantity'] && item['minQuantity'].trim() != '') {
                product['minQty'] = item['minQuantity'] ? parseInt(item['minQuantity'].trim()) : null;
              }
              if (item['maxQuantity'] && item['maxQuantity'].trim() != '') {
                product['maxQty'] = item['maxQuantity'] ? parseInt(item['maxQuantity'].trim()) : null;
              }
    
              // console.log(product);
              this.totalProcessed++
              this.afs.collection('products').doc(prodId).update(product);
    
            } else {
              // * CHECK IF PRODUCT IS NEW - PERFORM [ ADD ]
              console.log('else : ', prodId);
              product['productCode'] = item['sku'].trim();
              product['prodName'] = item['name'] ? item['name'].trim() : '';
              product['barcodeNo'] = item['barcodeNo'] ? item['barcodeNo'].trim() : '';

              console.log('vendor id else : ', vendorId)
              console.log('vendor name else : ', vendorName)
              product['vendorId'] = vendorId ? vendorId : ''
              product['vendorName'] = vendorName ? vendorName : ''
              product['productType'] = '';
              product['nameToSearch'] = item['name'] ? item['name'].trim() : '';
              product['createdAt'] = new Date();
              product['status'] = item['active'] && item['active'].toLowerCase() == 'yes' ? true : false;
              product['updatedAt'] = new Date();
              product['sortedAt'] = new Date();
              product['isPriceList'] = item['variants'] && item['variants'].toLowerCase() == 'yes' ? true : false;
              product['variantType'] = item['variantType'] ? item['variantType'].trim() : 'other';
              product['prodDesc'] = item['prodDescription'] ? item['prodDescription'].trim() : '';
              if (item['filters'] && item['filters'].trim() != '') {
                let providedFilterData = item['filters'].split('|')
                let filter = {}
                for (let i = 0; i < providedFilterData.length; i++) {
                  let filterData = providedFilterData[i].split(':')
                  let filterName = filterData[0]
                  let filterValues = filterData[1].split(',')
                  for (let j = 0; j < filterValues.length; j++) {
                    filter[filterName] = [...filterValues]
                  }
                }
                console.log('provided filter : ', filter)
                // *** Verify Filters ***
                if (this.allFilters.length) {
                  product['filters'] = {}
                  for (let i = 0; i < this.allFilters.length; i++) {
                    if (filter[this.allFilters[i].name]) {
                      console.log('filters : ', filter[this.allFilters[i].name])
                      let valueState = filter[this.allFilters[i].name].every((el: any) => this.allFilters[i].value.includes(el))
                      if (valueState) {
                        product['filters'][this.allFilters[i].name] = filter[this.allFilters[i].name]
                      }
                    }
                  }
                  console.log('Final filters : ', product['filters'])
                }
              }
              product['hsnCode'] = item['hsnCode'] ? item['hsnCode'].trim() : '';
              product['gst'] = item['gst'] ? item['gst'] : 0;
              product['categories'] = [];
              if (item['brands'] && item['brands'].trim() != '') {
                product['brands'] = [];
                let bds = item['brands'].split(";");

                bds.forEach(brand => {
                  brand = brand.toLowerCase().trim();
                  if (this.brands[brand]) {
                    product['brands'].push(this.brands[brand]);
                  }
                });
              }
              if (item['catSubcat'] && item['catSubcat'].trim() != '') {
                product['categories'] = [];

                let cats = item['catSubcat'].split(";");

                cats.forEach(cat => {
                  cat = cat.toLowerCase().trim();
                  let catsubcat = cat.split("-");

                  if (catsubcat[0]) {
                    catsubcat[0] = catsubcat[0].trim();
                  }
                  if (catsubcat[1]) {
                    catsubcat[1] = catsubcat[1].trim();
                  }

                  if (catsubcat[0] && this.categories[catsubcat[0]] && this.categories[catsubcat[0]]['id'] && product['categories'].indexOf(this.categories[catsubcat[0]]['id']) < 0) {
                    product['categories'].push(this.categories[catsubcat[0]]['id']);
                  }
                  if (catsubcat[1] && this.categories[catsubcat[0]] && this.categories[catsubcat[0]]['id'] && this.categories[catsubcat[0]]['subcategories'] && this.categories[catsubcat[0]]['subcategories'][catsubcat[1]] && product['categories'].indexOf(this.categories[catsubcat[0]]['subcategories'][catsubcat[1]]) < 0) {
                    product['categories'].push(this.categories[catsubcat[0]]['subcategories'][catsubcat[1]]);
                  }

                });
              }
              product['images'] = [];
              product['coverPic'] = {
                url: 'assets/img/placeholder-img.jpg',
                mob: 'assets/img/placeholder-img.jpg',
                thumb: 'assets/img/placeholder-img.jpg'
              };
              if (item['color']) {
                let colorVals = item['color'].split(',');
                product['color'] = {
                  code: colorVals[1] ? colorVals[1].trim() : '',
                  name: colorVals[0] ? colorVals[0].trim() : ''
                }
              }
              else {
                product['color'] = {}
              }
              product['searchKeywords'] = [];
              if (item['keywords']) {
                let keywords = item['keywords'].split(',');
                keywords.forEach(key => {
                  product['searchKeywords'].push(key.trim());
                });

              }
              product['stopWhenNoQty'] = item['out_of_stock'] && item['out_of_stock'].toLowerCase() == 'yes' ? true : false;
              product['minQty'] = item['minQuantity'] ? parseInt(item['minQuantity'].trim()) : null;
              product['maxQty'] = item['maxQuantity'] ? parseInt(item['maxQuantity'].trim()) : null;
              product['priceList'] = [];

              if (!product['isPriceList']) {
                product['discountedPrice'] = item['discountedPrice'] ? parseFloat(item['discountedPrice'].trim()) : parseFloat(item['price'].trim());
                product['prodPrice'] = item['price'] ? parseFloat(item['price'].trim()) : 0;
                product['purchasePrice'] = item['purchasePrice'] ? parseFloat(item['purchasePrice'].trim()) : 0;
                product['productQty'] = item['quantity'] ? item['quantity'].trim() : 0;
                product['shippingWeight'] = item['shippingWt'] ? item['shippingWt'].trim() : null;

              }
              else {

                if (item['variantName']) {
                  let variantItems = item['variantValue'].split(',');
                  let priceItems = item['price'].split(',');
                  let discountedPriceItems = item['discountedPrice'].split(',');
                  let purchasePriceItems = item['purchasePrice'].split(',');
                  let quantityItems = item['quantity'].split(',');
                  let shippingItems = item['shippingWt'].split(',');
                  let variantNames = item['variantName'] ? item['variantName'].split(',') : [null];
                  variantItems.forEach((variant, index) => {

                    product['priceList'].push({
                      price: priceItems[index] ? parseFloat(priceItems[index].trim()) : 0,
                      discountedPrice: discountedPriceItems[index] ? parseFloat(discountedPriceItems[index].trim()) : priceItems[index] ? parseFloat(priceItems[index].trim()) : 0,
                      purchasePrice: purchasePriceItems[index] ? parseFloat(purchasePriceItems[index].trim()) : 0,
                      weight: variant.trim(),
                      totalQuantity: quantityItems[index] ? quantityItems[index].trim() : '0',
                      shippingWeight: shippingItems[index] ? shippingItems[index].trim() : '',
                      name: variantNames[index] ? variantNames[index].trim() : ''
                    })
                  });
                }
              }

              // console.log(product);
              this.totalProcessed++
              this.afs.collection('products').add(product);
            }
            await this.sharedService.loading.dismiss();
          }
        }
        await this.sharedService.loading.dismiss();
        this.isProgressBarActive = false
        await this.presentToastWithOptions('Success!', 'Product imported successfully', 'SC-101')
        this.detectedFields = []
        this.buttonState = "Upload"
      } else {
        this.isProgressBarActive = false
        await this.presentToastWithOptions('Error in Processing File!', 'Please try again later.', 'ERR-192')
      }
    }
  }

  saveDisable() {
    if (this.buttonState === 'Upload') {
      return false
    } else if (this.buttonState === 'Import') {
      return false
    } else {
      return true
    }
  }

  calcProcessedEntities() {
    // console.log('this.allCSVProducts.length', this.allCSVProducts.length)
    if (this.allCSVProducts.length - 1 === -1) {
      return 0
    } else {
      return this.allCSVProducts.length
    }
  }

}
