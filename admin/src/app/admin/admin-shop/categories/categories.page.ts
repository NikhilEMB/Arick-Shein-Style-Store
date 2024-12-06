import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Events, LoadingController, AlertController, ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { ProductService } from 'src/app/services/product/product.service';
import { AddSubcategoriesPage } from "../../add-subcategories/add-subcategories.page";
import * as moment from 'moment';
import { ExportToCsv } from 'export-to-csv';
import { LabelService } from 'src/app/services/label/label.service';
import { LogglyLoggerService } from 'src/app/services/loggly-logger/loggly-logger.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { BrandsService } from 'src/app/services/brands/brands.service';
import { ImageEditorComponent } from 'src/app/components/image-editor/image-editor.component';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  category:any = {
    name:'',
    isExclusive: false,
  }

  metaData  = {
  pageTitle:'',
  metaDescription:'',
  metaKeywords:''
  }
  loading: any;
  alert: any;
  optionsforGallery: any;
  optionsforCamera: CameraOptions;
  listofbase64Image: any = [];
  imageResponse: any = [];
  categoryData: any = {};
  prod: any = [];
  loader: any;
  showNoProducts:boolean = false;
  searchProduct: string = '';
  categoryStatus: boolean = true;
  showLoader: boolean = true;
  subcategories: any = [];
  noSubcategories: boolean = false;
  subcategoriesLoader: boolean = true;
  isSubcategories: boolean;
  isSubcategoriesStatus: boolean;

  customWidthVal: any = 4;
  customHeightVal: any = 3;

  banner: any = [];
  options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    filename:'Products',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: false,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  }
  CATEGORIES_LABELS = {};
  SHARED_LABELS = {};
  multiRegion = false;
  regions = [];
  regionId = [];
  categories:any
  brands:any
  allSubcategories:any;
  ckeConfig: any;
  description = '';
  slug = {
    name:'',
    updatedAt: new Date(),
    updatedBy: 'admin'
  }
  isUniversal = false;
  sideMenu = ["Web Seo","FAQ","Region","Slug Name"];
  selectedId = 0;
  faq = [];

  constructor(
    private router: Router,
    private events: Events,
    private loadingController: LoadingController,
    public alertController: AlertController,
    // private camera: Camera,
    // private imagePicker: ImagePicker,
    // private actionSheetController: ActionSheetController,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private productService: ProductService,
    private toastController: ToastController,
    private labelService: LabelService,
    // private logglyService: LogglyLoggerService,
    private configService: ConfigService,
    private brandService: BrandsService,
    public sharedService: SharedService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.categoryData = this.router.getCurrentNavigation().extras.state.categoryData;
        // console.log(this.categoryData);
        if (this.categoryData.metaData) {
          this.metaData = this.categoryData.metaData;
        }
        this.isSubcategories = this.categoryData.isSubcategories;
        this.isSubcategoriesStatus = this.categoryData.isSubcategories;
        if (this.categoryData) {
          this.categoryStatus = this.categoryData.status ? true : false;
          if (!this.categoryData.hasOwnProperty('banner')) {
            this.categoryData.banner = [{ size: null, url: '' }];
          }
        }
        // console.log('categoryData', this.categoryData);
        // console.log('categoryData isSubcategories', this.isSubcategories);
        if (this.categoryData.regionId) {
          this.regionId = this.categoryData.regionId
        }
      }
    });
  }

  changeComponent(i: number){
    this.selectedId = i
  }

  async onRenderItems(event: { detail: { from: any; to: any; complete: () => void; }; }) {
    this.loader = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 3000
    });
    await this.loader.present();
    // console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    const start = event.detail.from;
    // tslint:disable-next-line: variable-name
    const id = this.prod[start].id;
    // console.log('pLength', this.prod.length);
    // console.log('start', start);
    const end = event.detail.to;
    // console.log('end', end);
    if ( start < end && end !== this.prod.length - 1) {
      // console.log('from top to mid');
      const firstDate = this.prod[end].sortedAt.toDate().getTime();
      const secondDate = this.prod[end + 1].sortedAt.toDate().getTime();
      // console.log('fistdate', firstDate);
      // console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      // console.log('finalDate', new Date(changedDate));
      this.productService.updateproductsPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else if (start < end && end === this.prod.length - 1) {
      // console.log('from top to bottom');
      const changedDate = this.prod[end].sortedAt.toDate().getTime() - 5 * 60000;
      this.productService.updateproductsPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else if (start > end && end !== 0) {
      // console.log('from bottom to mid');
      const firstDate = this.prod[end].sortedAt.toDate().getTime();
      const secondDate = this.prod[end - 1].sortedAt.toDate().getTime();
      // console.log('fistdate', firstDate);
      // console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      // console.log('finalDate', new Date(changedDate));
      this.productService.updateproductsPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else {
      // console.log('from bottom to top');
      const changedDate = this.prod[end].sortedAt.toDate().getTime() + 5 * 60000;
      this.productService.updateproductsPosition(id, new Date(changedDate));
    }
    const draggedItem = this.prod.splice(event.detail.from, 1)[0];
    this.prod.splice(event.detail.to, 0, draggedItem);
    event.detail.complete();
    setTimeout(() => {
      if(this.loader) {
        this.loader.dismiss();
      }
    }, 3000);
  }
  async onReorderSubcategoires(event: { detail: { from: any; to: any; complete: () => void; }; }) {
    this.loader = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 3000
    });
    await this.loader.present();
    // console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    const start = event.detail.from;
    // tslint:disable-next-line: variable-name
    const id = this.subcategories[start].id;
    // console.log('pLength', this.subcategories.length);
    // console.log('start', start);
    const end = event.detail.to;
    // console.log('end', end);
    if ( start < end && end !== this.subcategories.length - 1) {
      // console.log('from top to mid');
      const firstDate = this.subcategories[end].sortedAt.toDate().getTime();
      const secondDate = this.subcategories[end + 1].sortedAt.toDate().getTime();
      // console.log('fistdate', firstDate);
      // console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      // console.log('finalDate', new Date(changedDate));
      this.productService.updateSubcategoriesPosition(id, new Date(changedDate), this.categoryData.id);
    }
    // tslint:disable-next-line: one-line
    else if (start < end && end === this.subcategories.length - 1) {
      // console.log('from top to bottom');
      const changedDate = this.subcategories[end].sortedAt.toDate().getTime() - 5 * 60000;
      this.productService.updateSubcategoriesPosition(id, new Date(changedDate), this.categoryData.id);
    }
    // tslint:disable-next-line: one-line
    else if (start > end && end !== 0) {
      // console.log('from bottom to mid');
      const firstDate = this.subcategories[end].sortedAt.toDate().getTime();
      const secondDate = this.subcategories[end - 1].sortedAt.toDate().getTime();
      // console.log('fistdate', firstDate);
      // console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      // console.log('finalDate', new Date(changedDate));
      this.productService.updateSubcategoriesPosition(id, new Date(changedDate), this.categoryData.id);
    }
    // tslint:disable-next-line: one-line
    else {
      // console.log('from bottom to top');
      const changedDate = this.subcategories[end].sortedAt.toDate().getTime() + 5 * 60000;
      this.productService.updateSubcategoriesPosition(id, new Date(changedDate), this.categoryData.id);
    }
    const draggedItem = this.subcategories.splice(event.detail.from, 1)[0];
    this.subcategories.splice(event.detail.to, 0, draggedItem);
    event.detail.complete();
    setTimeout(() => {
      if(this.loader) {
        this.loader.dismiss();
      }
    }, 3000);
  }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: true,
      toolbar: [
      [ 'Bold', 'Italic', 'Underline', '-','NumberedList', 'BulletedList',
      '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Format', 'FontSize', 'Link' ]
        ],
      height: 150
    };
  }
  getDateTimeFormat(date){
    return moment(date).format('MMM D, YYYY hh:mm a');
  }
  ionViewWillEnter() {
    if(this.categoryData) {
      this.categoryData.description = 'description' in this.categoryData ? this.categoryData.description : '';
      this.categoryData.isExclusive = 'isExclusive' in this.categoryData ? this.categoryData.isExclusive : this.category.isExclusive;
      this.events.publish('product:getProductsForCategory', this.categoryData.id);
      this.events.publish('product:getSubcategories', this.categoryData.id);      
      if (!this.categoryData.hasOwnProperty('banner')) {
        this.categoryData.banner = [{size: null, url: null}];
      }
      this.faq = "faq" in this.categoryData ? this.categoryData.faq : this.faq;
    }
    this.initializeSubscriptions();
    this.description = '';
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.CATEGORIES_LABELS = this.labelService.labels['CATEGORIES'];
    this.multiRegion = this.configService.environment.multiRegion;
    this.isUniversal = this.sharedService.isUniversal();
    if(this.multiRegion) {
      this.events.publish('multi-region:getActiveStatus');
      this.events.publish('multi-region:getAllActiveRegions');
    }
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('product:addCategorySuccess', () => {
      this.loading.dismiss();
      this.category.name = '';
      this.category.isExclusive = false;
      this.imageResponse = [];
      this.banner = [];
      this.presentAlert('Category Added Successfully', true);
    });
    this.events.subscribe('product:deleteCategorySuccess', () => {
      // console.log('in deleteCategorySuccess subscription');
      this.loading.dismiss();
      this.presentAlert('Category deleted successfully!', true);
    });
    this.events.subscribe('product:editCategorySuccess', () => {
      // console.log('in editCategorySuccess subscribe');
      this.loading.dismiss();
      this.presentAlert('Category edited successfully!', true);
    });
    this.events.subscribe('product:deleteCategoryFailure', () => {
      this.loading.dismiss();
      this.presentAlert('Category deleted failed');
    });
    this.events.subscribe('product:editCategoryFailure', () => {
      this.presentAlert('Category edit failed');
    });
    this.events.subscribe('product:publishProductsForCategory', (products) => {
      this.prod = products;
      this.showNoProducts = false;
      this.showLoader = false;
    });
    this.events.subscribe('product:noProducts', () => {
      this.showLoader = false;
      this.showNoProducts = true;
    });
    this.events.subscribe('product:updateProductPostionSucess', () => {
      this.loader.dismiss();
    });

    this.events.subscribe('product:publishSubcategories', (data) => {
      // console.log('in publishSubcategories sub');
      this.subcategories = data;
      this.noSubcategories = false;
      this.subcategoriesLoader = false;
    });
    this.events.subscribe('product:noSubcategories', () => {
      // console.log('in noSubcategories sub');
      this.noSubcategories = true;
      this.subcategoriesLoader = false;
    });

    this.events.subscribe('product:updateSubcategoriesPostionSucess', () => {
      this.loader.dismiss();
    });
    this.events.subscribe('multi-region:publishActiveStatus', (data) => {
      if(data) {
        this.multiRegion = data.active;
      }
    });
    this.events.subscribe('multi-region:publishAllActiveRegions', (regions) => {
      if(regions.length) {
        this.regions = regions;
      }
    });
  }
  async addCategory() {
    // console.log(this.category)
    if (this.category.name === '') {
      this.presentAlert('Please enter category name');
    }
    else if(!this.validateFaq()) {
      this.sharedService.presentAlert('FAQ cant be empty, either remove the field or fill them');
    }
    else {
    await this.presentLoading();
    this.category.metaData = this.metaData;
    this.category.faq = this.faq;
    this.events.publish('product:addCategory', this.category, this.imageResponse, this.categoryStatus, this.banner, this.regionId);
  }
}

addRegion(e, type) {
  // console.log('regionId', e.target.value);
  if(type === 'edit') {
    this.regionId = e.target.value;
    this.categoryData['regionId'] = e.target.value;
  } else {
    this.regionId = e.target.value;
  }
}

updateNewCategoryStatus() {
  if (this.categoryStatus === true) {
    this.categoryStatus = true;
  } else {
    this.categoryStatus = false;
  }
}
  updateEditCategoryStatus() {
  if (this.categoryStatus === true) {
    this.categoryStatus = true;
  } else {
    this.categoryStatus = false;
  }

  // console.log(this.categoryStatus);
}
removeImage(type: string) {
  if (type === 'catImg') {
    this.imageResponse.splice(0, 1);
  } else {
    this.banner.splice(0, 1);
  }
}
removeEditImage(type: string) {
  if (type === 'catImg') {
    this.categoryData.image = {size: null, url: '', thumb: '', mob: ''};
  } else {
    this.categoryData.banner = {size: null, url: '', thumb: '', mob: ''};
  }
}
async editCategory() {
  console.log("this.validateFaq()",this.validateFaq());
  if (this.categoryData.name === '' || this.categoryData.name === null) {
    this.presentAlert('Please enter category name');
  }
  else if(!this.validateFaq()) {
    this.sharedService.presentAlert('FAQ cant be empty, either remove the field or fill them');
  }
  else {
    if (this.isUniversal) {
      const slugName = this.sharedService.createSlugName(this.categoryData.slug.name);
      const sameSlugExists = await this.sharedService.sameSlugExists('categories', this.categoryData.id, slugName);
      if (sameSlugExists) {
        this.presentAlert('Same slug already exists, please try with another slug name');
        return;
      } else {
        this.categoryData['slug'] = {
          name: slugName,
          updatedAt: new Date(),
          updatedBy: 'admin'
        }
      }
    }
    // console.log('edit category logic...');
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 10000
    });
    this.categoryData.metaData = this.metaData;
    this.categoryData.faq = this.faq;
    console.log('edit', this.categoryData)
    await this.loading.present();
    this.events.publish('product:editCategory', this.categoryData, this.imageResponse, this.categoryStatus, this.banner, this.regionId);
  }

}
async deleteCategoryConfirm(categoryId: string) {
  const alert = await this.alertController.create({
    message: 'Are you sure you want to delete this category',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          // console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Delete',
        handler: () => {
          // console.log('Confirm Okay');
          this.deleteCategory(categoryId);
        }
      }
    ]
  });

  await alert.present();
}
async deleteCategory(categoryId: string) {
  this.loading = await this.loadingController.create({
    message: 'Please Wait...',
    duration: 10000
  });
  await this.loading.present();
  this.events.publish('product:deleteCategory', categoryId);
}

async uploadImage(files: FileList, type) {
  if(type == 'bannerImg') {
    this.customWidthVal = 3.42;
    this.customHeightVal = 1
  }
  const modal = await this.modalController.create({
    component: ImageEditorComponent,
    componentProps: {
      aspectRatioWidthVal: this.customWidthVal,
      aspectRatioHeightVal: this.customHeightVal,
    },
    cssClass: 'custom-img-editor'
  })
  await modal.present();
  modal.onDidDismiss().then(res => {
    if (res && res.data) {
      let size = this.calculateImageSize(res.data || '')
      // console.log('fileSize :', size);
      if (type == 'bannerImg') {
        // console.log('do banner image')
        this.banner = [];
        this.banner.push({ imgData: res.data || '', imgSize: size });
        // console.log("banner",this.banner,"categoryData",this.categoryData.banner)
      }
      else {
        this.imageResponse = [];
        this.imageResponse.push({ imgData: res.data || '', imgSize: size });
        // console.log("image",this.imageResponse,"categoryData",this.categoryData.image)
      }
    }
  })
}

calculateImageSize(base64String: string) {
  let padding: number, inBytes: number, base64StringLength: number;
  if (base64String.endsWith('==')) { padding = 2;
  } else if (base64String.endsWith('=')) { padding = 1;
  } else { padding = 0; }

  base64StringLength = base64String.length;
  // console.log(base64StringLength);
  inBytes = (base64StringLength / 4 ) * 3 - padding;
  // console.log(inBytes);
  const kbytes = inBytes / 1000;
  return kbytes;
}


  cancel() {
    this.router.navigate(['admin-categories']);
  }
  imgZoom(img: any) {
    this.modalController.create({
      component: ImageModalPage,
      cssClass:'photo-modal-class',
      componentProps: {
        imgs: [{url: img}],
        index: 0
      }
    }).then(modal => modal.present());
  }
  goToShop() {
    this.router.navigate(['admin-categories']);
  }
  async presentAlert(desc: string, action?: boolean) {
    this.alert = await this.alertController.create({
      message: desc,
      buttons: [{
        text: 'Ok',
        handler: () => {
          // console.log('Confirm Okay');
          if(action === true) {
            this.router.navigate(['admin-categories']);
          }
        }
      }]
    });
    await this.alert.present();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 10000
    });
    await this.loading.present();
  }
  clearSearchProduct() {
    this.searchProduct = null;
  }
  editProduct(item: any) {
    // console.log(item);
    const navigationExtras: NavigationExtras = {
      state: {
        product: item,
        productId: item.id,
        routeFromCategories: true
      }
    };
    this.router.navigate(['new-product'], navigationExtras);
  }

  // addSubcategory() {
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       categoryId: this.categoryData.id
  //     }
  //   };
  //   this.router.navigate(['add-subcategories'], navigationExtras);
  // }

  // async openAddSubCategoryModal() {
  //   const modal = await this.modalController.create({
  //   component: AddSubcategoriesPage,
  //   cssClass: 'custom-modal',
  //   componentProps: { categoryId: this.categoryData.id }
  //   });
  //   await modal.present();
  // }

  // async openEditSubCategoryModal(item) {
  //   console.log('item before:', item);
  //   if (!item.hasOwnProperty('isExclusive')) {
  //     item['isExclusive'] = false;
  //   };
  //   console.log('item after:', item);
  //   const modal = await this.modalController.create({
  //   component: AddSubcategoriesPage,
  //   cssClass: 'custom-modal big-modal',
  //   componentProps: { 
  //     categoryId: this.categoryData.id,
  //     subcategoryData: item
  //   }
  //   });
  //   await modal.present();
  // }

  editSubcategory(item) {
    const navigationExtras: NavigationExtras = {
      state: {
        categoryId: this.categoryData.id,
        subcategoryData: item
      }
    };
    this.router.navigate(['add-subcategories'], navigationExtras);
  }
  async changeSubcategoriesStatus() {
    if(this.isSubcategoriesStatus) {
      this.isSubcategoriesStatus = false;
    } else {
      this.isSubcategoriesStatus = true;
    }
    await this.presentLoading();
    this.events.publish('product:changeSubcategoriesStatus', this.isSubcategoriesStatus, this.categoryData.id);
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  getPriceListFields(priceList){
    let fields = {
      type:[],
      price:[],
      discountedPrice:[],
      totalQuantity:[],
      shippingWeight:[]
    }
    priceList.forEach((item,index) => {
      fields.type[index] = item.weight ? item.weight : '';
      fields.price[index] = item.price ? item.price : 0,
      fields.discountedPrice[index] = item.discountedPrice ? item.discountedPrice : 0,
      fields.totalQuantity[index] = item.totalQuantity ? item.totalQuantity : '0'
      fields.shippingWeight[index] = item.shippingWeight ? item.shippingWeight : 0
    });

    return fields;
  }

  async exportProducts(){
    if (this.prod && this.prod.length > 0){
      await this.presentLoading()
      if (!this.categories)
      {
        this.categories = await this.productService.getAllCategoriesForSideMenu()
      }
      if (!this.brands){
        this.brands = await this.brandService.getAllBrandsForSideMenu()
      }
      if (!this.allSubcategories){
        this.allSubcategories = await this.productService.getAllSubcategoriesForSideMenu()
      }
      this.downloadProducts()
    }
    else {
      this.presentAlert('No products for exporting')
    }
  }

  async downloadProducts(){

    this.options.filename = this.categoryData.name+' '+this.getDateTimeFormat(new Date);
    let products = [];
   
    this.prod.forEach(item => {
      let product = item;
      let productCategories = product.categories
      let categoryList = []
      let productBrands = product.brands
      let brandList = []
      if (this.categories){
        if (product.categories){
          productCategories.forEach(categoryId => {
            let result = this.categories.find(obj => {
              return obj.id === categoryId
            })
            if (result){
              categoryList.push(result.name)
            }
            if (this.allSubcategories){
              let resultSub = this.allSubcategories.find(obj => {
                return obj.id === categoryId
              })
              if (resultSub){
                let catResult = this.categories.find(obj => {
                  return obj.id === resultSub.categoryId
                })
                if (catResult){
                  categoryList.push(catResult.name + '-' + resultSub.name)
                }
              }
            }
          });
        }
      }
      if (this.brands){
        if (product.brands){
          productBrands.forEach(brandId => {
            let result = this.brands.find(obj => {
              return obj.id === brandId
            })
            if (result){
              brandList.push(result.name)
            }
          });
        }
      }
      let fields = {};
      if(product.isPriceList){
        fields = this.getPriceListFields(product.priceList);
        
      }
      else{
        product.price = product.price ? product.price : 0;
        product.discountedPrice = product.discountedPrice ? product.discountedPrice : 0;
        product.purchasePrice = product.purchasePrice ? product.purchasePrice : 0;
        product.quanity = product.quanity ? product.quanity : '';
        product.shippingWt = product.shippingWt ? product.shippingWt : 0;
      }
                             
      products.push({
        sku:product.productCode ? product.productCode : '',
        name:product.prodName ? product.prodName : '',
        active:product.status ? 'YES' : 'NO',
        variants:product.isPriceList ? 'YES' : 'NO',
        variantType:product.variantType ? product.variantType : 'other',
        variantName: fields['type'] ? fields['type'].join() : '',
        price: fields['price'] ? fields['price'].join() : product.prodPrice,
        discountedPrice: fields['discountedPrice'] ? fields['discountedPrice'].join() : product.discountedPrice,
        purchasePrice: fields['purchasePrice'] ? fields['purchasePrice'].join() : product.purchasePrice,
        quantity: fields['totalQuantity'] ? fields['totalQuantity'].join() : product.productQty,
        shippingWt: fields['shippingWeight'] ? fields['shippingWeight'].join() : product.shippingWt,
        minQuanity:product.minQty ? product.minQty : '',
        maxQuantity:product.maxQty ? product.maxQty : '',
        productDescription: product.prodDesc ? product.prodDesc : '',
        hsnCode: product.hsnCode ? product.hsnCode : '',
        gst: product.gst ? product.gst : '',
        color: product.color && product.color.name && product.color.code ? product.color.name+','+product.color.code : '',
        keywords : product.searchKeywords ? product.searchKeywords.join() : '',
        out_of_stock:product.stopWhenNoQty ? 'YES' : 'NO',
        catSubcat:product.categories ? categoryList.join(';') : '',
        brands: product.brands ? brandList.join(';') : '',
      });
  
    });
    if(this.loading) {
      this.loading.dismiss();
    }
    const csvExporter = new ExportToCsv(this.options);
    csvExporter.generateCsv(products);
  }

  changeExclusive(){
    if (this.category.hasOwnProperty('isExclusive')){
      this.category.isExclusive = !this.category.isExclusive
    }
    else{
      this.category['isExclusive'] = true
    }
  }

  changeExclusiveEdit(){
    if (this.categoryData.hasOwnProperty('isExclusive')){
      this.categoryData.isExclusive = !this.categoryData.isExclusive
    }
    else{
      this.categoryData['isExclusive'] = true
    }
  }
  

  // ? FAQ Functions Start
  removeFaq(i: number) {
    this.faq.splice(i, 1);
  }

  addMoreFaq() {
    this.faq.push({ quest: '', ans: '' });
  }

  validateFaq() {
    let valid = true;
    for (const faq of this.faq) {
      if (!(faq.quest.length && faq.ans.length)) {
        console.log('address:, ', faq.ans.length);
        valid = false;
      }
    }
    return valid;
  }
   // ? FAQ Functions End


  removeSubscriptions() {
    this.events.unsubscribe('product:addCategorySuccess');
    this.events.unsubscribe('product:deleteCategorySuccess');
    this.events.unsubscribe('product:editCategorySuccess');
    this.events.unsubscribe('product:deleteCategoryFailure');
    this.events.unsubscribe('product:editCategoryFailure');
    this.events.unsubscribe('product:publishProductsForCategory');
    this.events.unsubscribe('product:noProducts');
    this.events.unsubscribe('product:updateProductPostionSucess');
    this.events.unsubscribe('product:publishSubcategories');
    this.events.unsubscribe('product:noSubcategories');
    this.events.unsubscribe('product:updateSubcategoriesPostionSucess');
    this.events.unsubscribe('multi-region:publishActiveStatus');
    this.events.unsubscribe('multi-region:publishAllActiveRegions');
  }
}
