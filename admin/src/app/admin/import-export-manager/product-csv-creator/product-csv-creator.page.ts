import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { ImportExportManagerService } from 'src/app/services/import-export-manager/import-export-manager.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ExportToCsv } from 'export-to-csv';
import * as moment from 'moment';
import { FileDetector } from 'protractor';

import { ProductService } from 'src/app/services/product/product.service';
import { BrandsService } from 'src/app/services/brands/brands.service';
@Component({
  selector: 'app-product-csv-creator',
  templateUrl: './product-csv-creator.page.html',
  styleUrls: ['./product-csv-creator.page.scss'],
})
export class ProductCsvCreatorPage implements OnInit {
  currentType: string;
  allProducts = [];
  allCategories = [];
  allSubcategories = [];
  allVendors = [];
  allBrands = [];
  showDropdown: boolean = false;
  loading: any;
  fieldLoader: boolean = true;
  selectAlternator: boolean;
  categoryAlternator: boolean;
  brandAlternator: boolean;
  sno: number = 0
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
  showBrand: boolean = true;
  showCategory: boolean = true;
  selectedFields = []
  subCatDisable = false
  subBrandDisable = false
  productFields = [
    // {
    //   name: 'Sku',
    //   value: 'skuCode',
    //   active: true
    // },
    {
      name: 'Name',
      value: 'prodName',
      active: false
    },
    {
      name: 'Barcode',
      value: 'barcodeNo',
      active: false
    },
    {
      name: 'Active',
      value: 'status',
      active: false
    },
    {
      name: 'Is Variant',
      value: 'isPriceList',
      active: false
    },
    {
      name: 'Type of Variant',
      value: 'variantType',
      active: false
    },
    {
      name: 'Variant Name',
      value: 'variantName',
      active: false
    },
    {
      name: 'Variant Value',
      value: 'variantValue',
      active: false
    },
    {
      name: 'Price',
      value: 'prodPrice',
      active: false
    },
    {
      name: 'Vendor Phone Number',
      value: 'vendorId',
      active: false
    },
    {
      name: 'Discounted Price',
      value: 'discountedPrice',
      active: false
    },
    {
      name: 'Purchase Price',
      value: 'purchasePrice',
      active: false
    },
    {
      name: 'Shipping Weight',
      value: 'shippingWeight',
      active: false
    },
    {
      name: 'Stocks',
      value: 'productQty',
      active: false
    },
    {
      name: 'Minimum Quantity',
      value: 'minQty',
      active: false
    },
    {
      name: 'Maximum Quantity',
      value: 'maxQty',
      active: false
    },
    {
      name: 'Product Description',
      value: 'prodDesc',
      active: false
    },
    {
      name: 'HSN Code',
      value: 'hsnCode',
      active: false
    },
    {
      name: 'GST',
      value: 'gst',
      active: false
    },
    {
      name: 'Color',
      value: 'prodColor',
      active: false
    },
    {
      name: 'Keywords',
      value: 'searchKeywords',
      active: false
    },
    {
      name: 'Out of Stock',
      value: 'stopWhenNoQty',
      active: false
    },
    {
      name: 'Images Link',
      value: 'images',
      active: false
    },
    {
      name: 'Categories',
      value: 'categories',
      fields: [],
      active: false
    },
    {
      name: 'Brands',
      value: 'brands',
      fields: [],
      active: false
    }
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private importExportManagerService: ImportExportManagerService,
    private productService: ProductService,
    private brandService: BrandsService,
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.route.queryParams.subscribe(async param => {
      console.log("params : ", param);
      if (param) {
        this.currentType = param.type;
        if (this.currentType === 'export products') {
          // this.allCategories = await this.importExportManagerService.getAllCategories()
          this.allCategories = await this.productService.getAllCategoriesForSideMenu()
          // this.allSubcategories = await this.importExportManagerService.getAllSubCategories();
          this.allSubcategories = await this.productService.getAllSubcategoriesForSideMenu()
          // this.allBrands = await this.importExportManagerService.getAllBrands()
          this.allBrands = await this.brandService.getAllBrandsForSideMenu()
          this.allVendors = await this.importExportManagerService.getAllVendors()
          this.allProducts = await this.importExportManagerService.getAllProducts()
          console.log('allCategories', this.allCategories)
          console.log('allSubcategories', this.allSubcategories)
          console.log('allBrands: ', this.allBrands)
          console.log('allVendors : ', this.allVendors)
          console.log('allProducts: ', this.allProducts)
          this.setCategories()
          this.setBrands()
          this.fieldLoader = false
          // TODO : Export all products
          // await this.exportProductsHandler()
        } else if (this.currentType === 'import products') {
          // TODO : Import all products
          await this.importProductsHandler()
        }
      }
    })
  }

  getDateTimeFormat(date) {
    return moment(date).format('MMM D, YYYY hh:mm a');
  }

  getPriceListFields(priceList) {
    let fields = {
      type: [],
      name: [],
      price: [],
      discountedPrice: [],
      purchasePrice: [],
      totalQuantity: [],
      shippingWeight: []
    }
    priceList.forEach((item, index) => {
      fields.type[index] = item.weight ? item.weight : '';
      fields.name[index] = item.name ? item.name : '';
      fields.price[index] = item.price ? item.price : 0,
      fields.discountedPrice[index] = item.discountedPrice ? item.discountedPrice : 0,
      fields.purchasePrice[index] = item.purchasePrice ? item.purchasePrice : 0,
      fields.totalQuantity[index] = item.totalQuantity ? item.totalQuantity : '0'
      fields.shippingWeight[index] = item.shippingWeight ? item.shippingWeight : 0
    });

    return fields;
  }

  selectAllFields() {
    console.log('before selectAllFields : ', this.productFields);
    this.selectAlternator = !this.selectAlternator
    for (const field of this.productFields) {
      field.active = this.selectAlternator
    }
    console.log('after selectAllFields : ', this.productFields);
    if (this.selectAlternator) {
      this.selectedFields = this.productFields
    } else {
      this.selectedFields = []
    }
  }

  getSelectedFields2(type, field, index) {
    if (field.value === 'categories') {
      this.productFields[index].fields.map(field => field.active = !this.productFields[index].active)
      this.subCatDisable = !this.productFields[index].active
    }
    if (field.value === 'brands') {
      this.productFields[index].fields.map(field => field.active = !this.productFields[index].active)
      this.subBrandDisable = !this.productFields[index].active
    }
    // * If already exists then remove
    if (this.selectedFields.some(selectField => selectField.value === field.value)) {
      let selectIndex = this.selectedFields.findIndex(selectField => selectField.value === field.value)
      this.selectedFields.splice(selectIndex, 1)
    }
    // * If not then push 
    else {
      this.selectedFields.push(field)
    }
  }

  getSelectedFields(type, field, indexMain) {
    console.log('field : ', field);
    console.log('index : ', indexMain)
    // * Set all categories & brands to true on parent selection
    if (field.value === 'categories') {
      console.log('categories : ', this.productFields[indexMain]);
      // * Set all Categories active on global selection & vice versa
      this.productFields[indexMain].fields.map(field => {
        field.active = !this.productFields[indexMain].active
        // * Remove all selected Categories from selectedFields on global deselection
        let selIndex = this.selectedFields.findIndex(select => select.value === field.value)
        this.selectedFields.splice(selIndex, 1)
      })
      // this.subDisable = !this.subDisable
    } else if (field.value === 'brands') {
      console.log('brands : ', this.productFields[indexMain]);
      // * Set all Brands active on global selection & vice versa
      this.productFields[indexMain].fields.map(field => {
        field.active = !this.productFields[indexMain].active
        // * Remove all selected Brands from selectedFields on global deselection
        let selIndex = this.selectedFields.findIndex(select => select.value === field.value)
        this.selectedFields.splice(selIndex, 1)
      })
      // this.subDisable = !this.subDisable
    }
    // * Check for all active fields & put in selected fields array
    if (this.selectedFields.length) {
      console.log('length true');
      // * Remove already selected fields
        if (this.selectedFields.some(select => select.value === field.value)) {
          console.log('got existing selection : ', field.value);
          console.log('index : ', indexMain);
          let index = this.selectedFields.findIndex(select => select.value === field.value)
          this.selectedFields.splice(index, 1)
        } else {
          this.selectedFields.push(this.productFields[indexMain])  
        }
      } else {
        this.selectedFields.push(this.productFields[indexMain])
    }
    console.log('this.selectedFields : ', this.selectedFields)
    console.log('this.productFields :', this.productFields);
  }

  productObjSetter(selectedFields: any[], product, fields: any, categoryList: any, brandList: any, vendorPhoneNo: any) {
    let csvObj = {}
    selectedFields.unshift({
      name: 'Sku',
      value: 'productCode',
      active: true
    })
    // for (let i = 0; i < selectedFields.length; i++) {
    //   csvObj[selectedFields[i].name] = product[selectedFields[i].value]
    // }
    for (let i = 0; i < selectedFields.length; i++) {
      // console.log('selectedFields : ', selectedFields[i].name);
      switch (selectedFields[i].name) {
        case 'Sku': // productCode
          csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? "\t"+product[selectedFields[i].value] : ''
          break;
        case 'Name': // productName
          csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product[selectedFields[i].value] : ''
          break;
        case 'Barcode': // barcodeNo
          csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product[selectedFields[i].value] : ''
          break;
        case 'Active': // status
          csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? 'Yes' : 'No'
          break;
        case 'Is Variant': // isPriceList
          csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? 'Yes' : 'No'
          break;
        case 'Type of Variant': // variantType
          csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product[selectedFields[i].value] : 'Other'
          break;
        case 'Variant Name': // variantName - *self_proclaimed
          csvObj[selectedFields[i].name] = product['isPriceList'] ? fields['name'].join(', ') : ''
          break;
        case 'Variant Value': // variantValue - *self_proclaimed
          csvObj[selectedFields[i].name] = product['isPriceList'] ? fields['type'].join(', ') : ''
          break;
        case 'Price': // prodPrice
          csvObj[selectedFields[i].name] = product['isPriceList'] ? fields['price'].join(', ') : product[selectedFields[i].value]
          break;
        case 'Discounted Price': // discountedPrice
          csvObj[selectedFields[i].name] = product['isPriceList'] ? fields['discountedPrice'].join(', ') : product[selectedFields[i].value]
          break;
        case 'Purchase Price': // purchasePrice
          csvObj[selectedFields[i].name] = product['isPriceList'] ? fields['purchasePrice'].join(', ') : product[selectedFields[i].value]
          break;
        case 'Vendor Phone Number': // vendorPhoneNo - *self_proclaimed
          csvObj[selectedFields[i].name] = product['vendorId'] ? vendorPhoneNo : ''
          break;
        case 'Stocks': // productQty
          csvObj[selectedFields[i].name] = product['isPriceList'] ? fields['totalQuantity'].join(', ') : (product[selectedFields[i].value] ? product[selectedFields[i].value] : '')
          break;
        case 'Shipping Weight': // shippingWeight
          csvObj[selectedFields[i].name] = product['isPriceList'] ? fields['shippingWeight'].join(', ') : product[selectedFields[i].value]
          break;
        case 'Minimum Quantity': // minQty
          csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product[selectedFields[i].value] : ''
          break;
        case 'Maximum Quantity': // maxQty
          csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product[selectedFields[i].value] : ''
          break;
        case 'Product Description': // prodDesc
          csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product[selectedFields[i].value] : ''
          break;
        case 'HSN Code': // hsnCode
          csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product[selectedFields[i].value] : ''
          break;
        case 'GST': // gst
          csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product[selectedFields[i].value] : ''
          break;
        case 'Color': // prodColor - *self_proclaimed
          csvObj[selectedFields[i].name] = product.color && product.color.name && product.color.code ? product.color.name + ',' + product.color.code : ''
          break;
        case 'Keywords': // stopWhenNoQty
          csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product.searchKeywords.join() : ''
          break;
        case 'Out of Stock': // stopWhenNoQty
          csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? 'Yes' : 'No'
          break;
        case 'Images Link': // custom
          csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? this.getImagesLink(product) : ''
          break;
        case 'Categories': // categories
          csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? categoryList.join(';') : ''
          break;
        case 'Brands': // brands
          csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? brandList.join(';') : ''
          break;
      }
    }
    selectedFields.shift()
    return csvObj
  }

  getImagesLink(product: any) {
    if(product.images) {
      let imagesURL = ''
      imagesURL += product.images.map(e => e.url).join(', ')
      return imagesURL
    } else {
      return ''
    }
  }

  isEmpty(products: any) {
    return Object.keys(products).length === 0;
  }

  async exportProductsHandler() {
    console.log('productFields : ', this.productFields)
    this.options.filename = this.options.filename + ' ' + this.getDateTimeFormat(new Date);
    let products = [];
    let csvProductIds = [];
    this.allProducts.forEach(async item => {
      let product = item;
      let productCategories = product.categories
      let categoryList = []
      let productBrands = product.brands
      let brandList = []
      let vendorPhoneNo = ''
      if (this.allCategories) {
        if (product.categories) {
          productCategories.forEach(categoryId => {
            let result = this.allCategories.find(obj => {
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
                let catResult = this.allCategories.find(obj => {
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
      if (this.allBrands) {
        if (product.brands) {
          productBrands.forEach(brandId => {
            let result = this.allBrands.find(obj => {
              return obj.id === brandId
            })
            if (result) {
              brandList.push(result.name)
            }
          });
        }
      }
      if (this.allVendors) {
        if (product.vendorId && (this.allVendors.some(v => v.id === product.vendorId))) {
          let vendorData = this.allVendors.find(v => v.id === product.vendorId)
          console.log('vendorData', vendorData.phoneNo);
          vendorPhoneNo = ('[ ' + vendorData.phoneNo + ' ]') || ''
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
        product.quantity = product.quantity ? product.quantity : '';
        product.shippingWeight = product.shippingWeight ? product.shippingWeight : 0;
      }

      this.sno++
      // if (product.productCode === 'import-export-test') {
      //   console.log(product);  
      // }
      // TODO : CHECK FOR CATEGORIES & BRANDS SELECTION
      let filter = []
      for (const field of this.selectedFields) {
        let catIndex = this.productFields.findIndex(field => field.value === 'categories');
        let brandIndex = this.productFields.findIndex(field => field.value === 'brands');
        // check in categories
        if (this.productFields[catIndex].fields.some(select => select.value === field.value)) {
          filter.push(field);
          // console.log('cat field : ', field)
        }
        // check in brands
        if (this.productFields[brandIndex].fields.some(select => select.value === field.value)) {
          filter.push(field);
          // console.log('brand field : ', field)
        }
      }
      // console.log('filter : ', filter)
      if (filter.length) {
        for (const sub of filter) {
          if (((categoryList.some(cat => cat === sub.value)) || (brandList.some(brand => brand === sub.value))) && (!csvProductIds.includes(product.id))) {
            let csvObject: any = this.productObjSetter(this.selectedFields, product, fields, categoryList, brandList, vendorPhoneNo);
            products.push(csvObject);  
            csvProductIds.push(product.id);      
          }
        }
      } else {
        let csvObject: any = this.productObjSetter(this.selectedFields, product, fields, categoryList, brandList, vendorPhoneNo)
        products.push(csvObject);
      }
    });
    console.log('products', products)

    if (this.loading) {
      this.loading.dismiss();
    }

    console.log(products);
    if (this.isEmpty(products)) {
      this.sharedService.presentAlert('No products found with the current selection!')
    } else {
      const csvExporter = new ExportToCsv(this.options);
      csvExporter.generateCsv(products);
    }
  }

  async importProductsHandler() {
    
  }

  setCategories() {
    if (this.allCategories && this.allCategories.length) {
      let objIndex = this.productFields.findIndex((obj => obj.value == 'categories'));
      this.productFields[objIndex].fields = []
      this.allCategories.map((category) => {
        this.productFields[objIndex].fields.push({
          name: category.name,
          value: category.name,
          active: false
        })
      })
    }
  }

  setBrands() {
    if (this.allBrands && this.allBrands.length) {
      let objIndex = this.productFields.findIndex((obj => obj.value == 'brands'));
      this.productFields[objIndex].fields = []
      this.allBrands.map((brand) => {
        this.productFields[objIndex].fields.push({
          name: brand.name,
          value: brand.name,
          active: false
        })
      })
    }
  }

  checkForTrue() {
    if (this.productFields.find(active => {
      if (active.active) {
        return true
      } 
      if (active.fields && active.fields.find(active => {
        if (active.active) {
          return true
        }
      })) {
        return true
      }
    }
    )) {
      return true
    }
  }

  saveDisable() {
    if (this.currentType === 'export products') {
      if (this.checkForTrue()) {
        return false
      } else {
        return true
      }
    } else if (this.currentType === 'import products') {
      // TODO : When starting import
      return true
    }
  }

  defaultSku(defaultSku: string) {
    console.log(defaultSku);
    
    if (defaultSku === 'productCode') {
      return true
    }
  }

  handleSelections(type: string ,field: string, index: number, mainField?: string) {
    this.getSelectedFields2(type, field, index)
    // console.log('productFields : ', this.productFields);
  }
 
  dropdown(state: boolean, selection: string) {
    console.log('state : ', state, ' selection : ', selection)
    if (selection === 'categories') {
      this.showCategory = !this.showCategory
    }
    if (selection === 'brands') {
      this.showBrand = !this.showBrand
    }
  }

}
