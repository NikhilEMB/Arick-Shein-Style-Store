import { Component, OnInit } from '@angular/core';
import { Events, AlertController, LoadingController } from '@ionic/angular';
import { Papa } from 'ngx-papaparse';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, first, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-import-products',
  templateUrl: './import-products.page.html',
  styleUrls: ['./import-products.page.scss'],
})
export class ImportProductsPage implements OnInit {
  /* csvFilePath='<path to csv file>';
   csv=require(csvtojson);*/
  jsonData;
  categories: any;
  brands: any;
  loading: any;
  isValidCSV: boolean = false;
  importedProducts: any = {};
  isImporting: boolean = false;
  needBrands: boolean = false;
  needCategories: boolean = false;
  allProducts: any[] = [];
  skuArr: any[] = [];
  importSkuArr: any[] = [];
  skuCount: any = 0
  headers: any = ["SKU", "NAME", "BARCODE", "ACTIVE", "IS VARIANT", "VARIANT TYPE", "VARIANT NAME", "PRICE", "DISCOUNTED PRICE", "PURCHASE PRICE", "QUANTITY", "SHIPPING WEIGHT", "MIN QUANTITY", "MAX QUANTITY", "DESCRIPTION", "HSN CODE", "TAX", "COLOR", "KEYWORDS", "OUT OF STOCK", "CATEGORIES - SUBCATEGORIES", "BRANDS"];
  constructor(private papa: Papa, private events: Events, public alertController: AlertController, public loadingController: LoadingController, private afs: AngularFirestore) { }

  ngOnInit() {
    this.initializeSubscriptions()
    this.fetchCategoriesBrands();
    this.fetchAllProducts();
  }

  async fetchCategoriesBrands() {

  }

  async presentAlert(heading: any, desc: any) {
    const alert = await this.alertController.create({
      header: heading,
      message: desc,
      buttons: ['Ok']
    });
    await alert.present();
  }

  initializeSubscriptions() {
  }
  async presentLoading(duration?) {
    this.loading = await this.loadingController.create({
      message: "Please Wait...",
      duration: duration ? duration : 10000
    });
    await this.loading.present();
  }

  async fetchAllProducts() {
    const productRef = this.afs.collection('products');
    let allProductsref: Subscription = productRef.get().subscribe((querySnapshot: any) => {
      querySnapshot.forEach((doc) => {
      this.allProducts.push({id: doc.id, ...doc.data()})
    });
    for(let i = 0; i < this.allProducts.length; i++) {
      this.skuArr.push(this.allProducts[i].productCode);
    }
    console.log('all skus : ', this.skuArr);
  })
  }

  checkValidCsv(data) {
    let isValid = true;
    if (data[0].indexOf('sku') < 0 || data[0].length > 22) {
      isValid = false;
    }
    return isValid;
  }

  async convertFile(csv: any) {
    this.jsonData = [];
    await this.presentLoading();
    this.isValidCSV = false;
    this.isImporting = false;
    this.importedProducts = {};
    let csvFile = csv.target.files[0];
    //let csvData = '"Hello","World!"';
    let options = {
      complete: async (results, file) => {
        // console.log('Parsed: ', results, file);

        if (this.loading) {
          this.loading.dismiss();
        }

        if (results.data && results.data.length > 5001) {
          this.presentAlert('Product Limit Reached', 'Please import less than 1000 product in a single import process');
        }
        else {
          this.jsonData = results.data;
          let block: boolean = false;
          let productsAll = this.jsonData;
          let impSkuArr: any[] = [];
          // console.log('productsAll : ', productsAll);
          
          for(let i = 1; i < productsAll.length; i++) {
            impSkuArr.push(productsAll[i][0])
            if (this.skuArr.includes(productsAll[i][0])) {
              console.log('matched!!!');
              this.skuCount += 1
              block = false
            } else {
              console.log('not matched!!!');
              block = true
            }
          }
          console.log('SKU-JSON : ', impSkuArr);

          // if (impSkuArr.length) {
          //   if () {
          //     console.log('matched!!!');
          //     this.skuCount += 1
          //     block = false
          //   } else {
          //     console.log('not matched!!!');
          //     block = true
          //   }
          // }

          // if (this.checkValidCsv(this.jsonData) && block) {
            if (this.checkValidCsv(this.jsonData)) {
            this.isValidCSV = true;
            this.presentAlert('Products ready to import !', 'Please review all products and click on start Import Process');
          }
          else {
            this.presentAlert('Invalid CSV !', 'Please check that CSV upload is correct. Please download sample csv format to get correct CSV');
            if(this.skuCount > 0) {
              this.presentAlert('Matching SKU Alert!', 'There are product(s) in your CSV with matching SKUs to already existing products.')
              // block = false
            }
          }

        }

      }
      // Add your options here
    };
    this.papa.parse(csvFile, options);

    /*this.papa.parse(csvFile, {
      complete: function(results) {
        console.log(results);
      }
    });*/
  }


  async importProducts() {
    this.isImporting = true;
    this.presentAlert('Import process Started !', 'It may take few mins. Please do not close the browser or go back. Products which are successfully imported will turn to green.');
    let products = this.jsonData;

    for (var i = 1; i < products.length; i++) {

      if (products[i][20] && products[i][20] != '') {
        this.needCategories = true;
      }

      if (products[i][21] && products[i][21] != '') {
        this.needBrands = true;
      }
    }




    let catList = [];
    let subCategories = [];

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

        this.brands[brand.name.toLowerCase().trim()] = brand.id;

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

    console.log('this.brands : ' + JSON.stringify(this.brands));
    console.log('this.categories : ' + JSON.stringify(this.categories));
    

    let matchingProds: any = [];

    for (var i = 1; i < products.length; i++) {

      let item = {
        sku: products[i][0],
        name: products[i][1],
        barcodeNo: products[i][2],
        active: products[i][3],
        variants: products[i][4],
        variantType: products[i][5],
        variantName: products[i][6],
        price: products[i][7],
        discountedPrice: products[i][8],
        purchasePrice: products[i][9],
        quantity: products[i][10],
        shippingWt: products[i][11],
        minQuantity: products[i][12],
        maxQuantity: products[i][13],
        productDescription: products[i][14],
        hsnCode: products[i][15],
        gst: products[i][16],
        color: products[i][17],
        keywords: products[i][18],
        out_of_stock: products[i][19],
        catSubcat: products[i][20],
        brands: products[i][21],
      };


      let orgProduct: any = {};

      if (item.sku) {
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
        console.log('pdtDocs : ', pdtDocs);
        if (pdtDocs) {
          pdtDocs.forEach(async (pdt) => {
            prodId = pdt.id;
            orgProduct = pdt;
          });
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
            product['status'] = item['active'] && item.active.toLowerCase() == 'yes' ? true : false;
          }
          product['barcodeNo'] = item['barcodeNo'] ? item['barcodeNo'].trim() : '';
          product['updatedAt'] = new Date();
          product['productType'] = '';

          product['isPriceList'] = item.variants && item.variants.toLowerCase() == 'yes' ? true : orgProduct && orgProduct.isPriceList ? orgProduct.isPriceList : false;


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
          if (item['productDescription'] && item['productDescription'].trim() != '') {
            product['prodDesc'] = item['productDescription'] ? item['productDescription'].trim() : '';
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
          this.afs.collection('products').doc(prodId).update(product);

        }
        else {


          product['productCode'] = item['sku'].trim();
          product['prodName'] = item['name'] ? item['name'].trim() : '';
          product['barcodeNo'] = item['barcodeNo'] ? item['barcodeNo'].trim() : '';
          product['productType'] = '';
          product['nameToSearch'] = item['name'] ? item['name'].trim() : '';
          product['createdAt'] = new Date();
          product['status'] = item['active'] && item.active.toLowerCase() == 'yes' ? true : false;
          product['updatedAt'] = new Date();
          product['sortedAt'] = new Date();
          product['isPriceList'] = item.variants && item.variants.toLowerCase() == 'yes' ? true : false;
          product['variantType'] = item['variantType'] ? item['variantType'].trim() : 'other';
          product['prodDesc'] = item['productDescription'] ? item['productDescription'].trim() : '';

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
            product['purchasePrice'] = parseFloat(item['purchasePrice'].trim());
            product['productQty'] = item['quantity'] ? item['quantity'].trim() : 0;
            product['shippingWeight'] = item['shippingWt'] ? item['shippingWt'].trim() : null;

          }
          else {

            if (item['variantName']) {
              let variantItems = item['variantName'].split(',');
              let priceItems = item['price'].split(',');
              let discountedPriceItems = item['discountedPrice'].split(',');
              let purchasePriceItems = item['purchasePrice'].split(',');
              let quantityItems = item['quantity'].split(',');
              let shippingItems = item['shippingWt'].split(',');
              variantItems.forEach((variant, index) => {

                product['priceList'].push({
                  price: priceItems[index] ? parseFloat(priceItems[index].trim()) : 0,
                  discountedPrice: discountedPriceItems[index] ? parseFloat(discountedPriceItems[index].trim()) : priceItems[index] ? parseFloat(priceItems[index].trim()) : 0,
                  purchasePrice: purchasePriceItems[index] ? parseFloat(purchasePriceItems[index].trim()) : 0,
                  weight: variant.trim(),
                  totalQuantity: quantityItems[index] ? quantityItems[index].trim() : '0',
                  shippingWeight: shippingItems[index] ? shippingItems[index].trim() : ''
                })
              });
            }
          }

          // console.log(product);
          this.afs.collection('products').add(product);
        }

        this.importedProducts[i] = true;

      }
    }

    this.isImporting = false;
    this.presentAlert('Import process Finished !', 'Products which are in green colour are successfully imported.');
  }

}