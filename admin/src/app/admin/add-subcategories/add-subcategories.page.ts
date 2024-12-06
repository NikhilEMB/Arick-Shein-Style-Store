import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Events, LoadingController, AlertController, ActionSheetController, ModalController, NavParams } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { ProductService } from 'src/app/services/product/product.service';
import * as moment from 'moment';
import { ExportToCsv } from 'export-to-csv';
import { BrandsService } from 'src/app/services/brands/brands.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-add-subcategories',
  templateUrl: './add-subcategories.page.html',
  styleUrls: ['./add-subcategories.page.scss'],
})
export class AddSubcategoriesPage implements OnInit {

  categoryValue: string = '';
  loading: any;
  alert: any;
  optionsforGallery: any;
  optionsforCamera: CameraOptions;
  listofbase64Image: any = [];
  imageResponse: any = [];
  subcategoryData: any;
  prod: any = [];
  loader: any;
  showNoProducts:boolean = false;
  searchProduct: string = '';
  categoryStatus: boolean = true;
  showLoader: boolean = true;
  categoryId: string;
  banner: any = [];
  subcategoryIsExclusive = false;
  categories:any
  brands:any
  options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    filename:'Subcategory',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: false,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  }
  allSubcategories:any;
  description = '';
  ckeConfig: any;
  isUniversal = false;
  metaData = {
    pageTitle: '',
    metaDescription: '',
    metaKeywords: ''
  }
  
  selectedId = 0;
  sideMenu = ["Web Seo","FAQ","Slug Name"];
  faq = [];
  subCategoryId: string;
  title = '';

  constructor(
    private router: Router,
    private events: Events,
    private loadingController: LoadingController,
    public alertController: AlertController,
    private camera: Camera,
    // private imagePicker: ImagePicker,
    // private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private productService: ProductService,
    private brandService: BrandsService,
    public sharedService: SharedService
  ) {
    /* if (navParams.get('categoryId')) {
       this.categoryId = navParams.get('categoryId');
     }
     if (navParams.get('subcategoryData')) {
      this.subcategoryData = navParams.get('subcategoryData');
     }*/

    this.route.queryParams.subscribe(params => {
      const state = this.router.getCurrentNavigation().extras.state;
      if (state) {
        this.subcategoryData = state.subcategoryData;
        this.categoryId = state.categoryId;
        this.subCategoryId = state.subCategoryId;
        this.title = state.title;
        //console.log('subcategoryData', this.subcategoryData);
        //console.log('categoryId', this.categoryId);
      }
    });
  }
           
  changeComponent(i: number) {
    this.selectedId = i;
  }
              
  async onRenderItems(event: { detail: { from: any; to: any; complete: () => void; }; }) {
    this.loader = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 3000
    });
    await this.loader.present();
    ////console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    const start = event.detail.from;
    console.log(start)
    // tslint:disable-next-line: variable-name
    const id = this.prod[start].id;
    ////console.log('pLength', this.prod.length);
    ////console.log('start', start);
    const end = event.detail.to;
    console.log(end)
    ////console.log('end', end);
    if ( start < end && end !== this.prod.length - 1) {
      ////console.log('from top to mid');
      const firstDate = this.prod[end].sortedAt.toDate().getTime();
      const secondDate = this.prod[end + 1].sortedAt.toDate().getTime();
      ////console.log('fistdate', firstDate);
      ////console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      ////console.log('finalDate', new Date(changedDate));
      this.productService.updateproductsPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else if (start < end && end === this.prod.length - 1) {
      ////console.log('from top to bottom');
      const changedDate = this.prod[end].sortedAt.toDate().getTime() - 5 * 60000;
      this.productService.updateproductsPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else if (start > end && end !== 0) {
      ////console.log('from bottom to mid');
      const firstDate = this.prod[end].sortedAt.toDate().getTime();
      const secondDate = this.prod[end - 1].sortedAt.toDate().getTime();
      ////console.log('fistdate', firstDate);
      ////console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      ////console.log('finalDate', new Date(changedDate));
      this.productService.updateproductsPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else {
      ////console.log('from bottom to top');
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
  
  ngOnInit() {
    if (this.subcategoryData && !this.subcategoryData.hasOwnProperty('banner')) {
      this.subcategoryData.banner = [{size: null, url: null}];
    }
    this.ckeConfig = {
      allowedContent: true,
      toolbar: [
      [ 'Bold', 'Italic', 'Underline', '-','NumberedList', 'BulletedList',
      '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Format', 'FontSize' ]
        ],
      height: 150
    };
  }
  ionViewWillEnter() {
    if(this.subcategoryData) {
      this.subcategoryData.description = 'description' in this.subcategoryData ? this.subcategoryData.description : '';
      console.log(this.subcategoryData)
      this.events.publish('product:getProductsForSubcategory', this.subcategoryData.id);
      if (this.subcategoryData.metaData) {
        this.metaData = this.subcategoryData.metaData;
      }
      this.faq = "faq" in this.subcategoryData ? this.subcategoryData.faq : this.faq;
    }
    this.initializeSubscriptions();
    this.isUniversal = this.sharedService.isUniversal();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('product:addSubcategorySuccess', () => {
      this.loading.dismiss();
      this.description = '';
      this.categoryValue = null;
      this.imageResponse = [];
      this.banner = [];
      this.presentAlert('Subcatgeory Added Successfully', true);
    });
    this.events.subscribe('product:deleteSubcategorySuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Subcategory deleted successfully!', true);
      this.dismiss();
    });
    this.events.subscribe('product:editSubcategorySuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Subcategory edited successfully!', true);
    });
    this.events.subscribe('product:publishProductsForSubcategory', (products) => {
      this.prod = products;
      console.log(this.prod)
      this.showNoProducts = false;
      this.showLoader = false;
    });
    this.events.subscribe('product:noProductsForSubcategory', () => {
      this.showLoader = false;
      this.showNoProducts = true;
    });
    this.events.subscribe('product:updateProductPostionSucess', () => {
      this.loader.dismiss();
    });
  }
  async addSubcategory() {
    if (this.categoryValue === '' || this.categoryValue === null) {
      this.presentAlert('Please enter category name');
    }
    else if(!this.validateFaq()) {
      this.sharedService.presentAlert('FAQ cant be empty, either remove the field or fill them');
    }
    else {
      await this.presentLoading();
      const subcategory = {
        name: this.categoryValue,
        status: this.categoryStatus,
        isExclusive: this.subcategoryIsExclusive,
        description: this.description,
        metaData: this.metaData,
        faq: this.faq
      }
      this.events.publish('product:addSubcategory', subcategory, this.imageResponse, this.categoryId, this.banner, this.subCategoryId);
      this.dismiss();
  }
}
updateNewSubcategoryStatus() {
  if (this.categoryStatus === true) {
    this.categoryStatus = false;
  } else {
    this.categoryStatus = true;
  }
}
  updateEditSubcategoryStatus(status: boolean) {
  if (status === true) {
    this.categoryStatus = false;
  } else {
    this.categoryStatus = true;
  }
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
    this.subcategoryData.image = {size: null, url: ''};
  } else {
    this.subcategoryData.banner = {size: null, url: ''};
  }
}
async editSubcategory() {
  if(this.subcategoryData.name === '' || this.subcategoryData.name === null){
    this.presentAlert('Please enter category name')
  }
  else if(!this.validateFaq()) {
    this.sharedService.presentAlert('FAQ cant be empty, either remove the field or fill them');
  }
  else {
    let subcategory = {
      name: this.subcategoryData.name,
      status: this.categoryStatus,
      image: this.subcategoryData.image,
      banner: this.subcategoryData.banner,
      isExclusive: this.subcategoryData.isExclusive,
      description: this.subcategoryData.description,
      metaData: this.metaData,
      faq: this.faq
    }
    if (this.isUniversal) {
      const slugName = this.sharedService.createSlugName(this.subcategoryData.slug.name);
      const sameSlugExists = await this.sharedService.sameSlugExists(this.subCategoryId ? 'subsubcategories':'subcategories', this.subCategoryId ? {subCatId: this.subCategoryId, subSubCatId: this.subcategoryData.id}:this.subcategoryData.id, slugName, this.categoryId);
      if (sameSlugExists) {
        this.presentAlert('Same slug already exists, please try with another slug name');
        return;
      } else {
        subcategory['slug'] = {
          name: slugName,
          updatedAt: new Date(),
          updatedBy: 'admin'
        }
      }
    }
    console.log('edit category logic...', subcategory);
    await this.presentLoading();
    console.log('is:', this.subcategoryData.isExclusive);
    this.events.publish('product:editSubcategory', subcategory, this.imageResponse, this.subcategoryData.id, this.categoryId, this.banner, this.subCategoryId);
  }
}
async deleteSubcategoryConfirm() {
  const alert = await this.alertController.create({
    message: 'Are you sure you want to delete this category',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          ////console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Delete',
        handler: () => {
          ////console.log('Confirm Okay');
          this.deleteSubcategory();
        }
      }
    ]
  });

  await alert.present();
}
async deleteSubcategory() {
  await this.presentLoading()
  this.events.publish('product:deleteSubcategory', this.subcategoryData.id, this.categoryId, this.subCategoryId);
}

uploadImage(files: FileList, type) {
  for (let i = 0; i < files.length; i++) {
    let reader = new FileReader();
    reader.readAsDataURL(files.item(i))
    reader.onload = (event:any) => { // called once readAsDataURL is completed
      let base64Image:any = event.target.result;
      let base64Str = base64Image.split(',');
      let size = this.calculateImageSize(base64Str[1]);

      if(type == 'bannerImg'){
      
        this.banner = [];
        this.banner.push({imgData: base64Image, imgSize: size});
        console.log(this.banner)
        
      }
      else{
        this.imageResponse = [];
        this.imageResponse.push({imgData: base64Image, imgSize: size});
        
      }
    }
  }
}

async imageActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Select any option',
    buttons: [{
      text: 'Camera',
      icon: 'camera',
      handler: () => {
        this.addCameraImage();
      }
    }, {
      text: 'Gallery',
      icon: 'images',
      handler: () => {
        this.addGalleryImage();
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        ////console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();
}
addCameraImage() {
  this.imageResponse = [];
  this.optionsforCamera = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation : true,
    allowEdit: true
  };
  ////console.log('in addImage');
  this.camera.getPicture(this.optionsforCamera).then((imageData) => {
    const base64Image = 'data:image/jpeg;base64,' + imageData;
    const base64Str = base64Image.split(',');
    const size = this.calculateImageSize(base64Str[1]);
    ////console.log('size of image', size);
    this.imageResponse.push({imgData: base64Image, imgSize: size});
    ////console.log('image Response', this.imageResponse);
   }, (err) => {
    ////console.log(err);
  });
}
addGalleryImage() {
  this.imageResponse = [];
  const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType: 0,
    allowEdit: true
  };
  this.camera.getPicture(options).then((imageData) => {
    const base64Image = 'data:image/jpeg;base64,' + imageData;
    const base64Str = base64Image.split(',');
    const size = this.calculateImageSize(base64Str[1]);
    ////console.log('size of image', size);
    this.imageResponse.push({imgData: base64Image, imgSize: size});
   }, (err) => {
    ////console.log(err);
  });
}
calculateImageSize(base64String: string) {
  let padding: number, inBytes: number, base64StringLength: number;
  if (base64String.endsWith('==')) { padding = 2;
  } else if (base64String.endsWith('=')) { padding = 1;
  } else { padding = 0; }

  base64StringLength = base64String.length;
  ////console.log(base64StringLength);
  inBytes = (base64StringLength / 4 ) * 3 - padding;
  ////console.log(inBytes);
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
  async presentAlert(desc: string, action?: boolean) {
    this.alert = await this.alertController.create({
      message: desc,
      buttons: [{
        text: 'Ok',
        handler: () => {
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
      duration: 5000
    });
    await this.loading.present();
  }
  clearSearchProduct() {
    this.searchProduct = '';
  }
  editProduct(item: any) {
    //// //console.log(item);
    const navigationExtras: NavigationExtras = {
      state: {
        product: item,
        productId: item.id,
        routeFromCategories: true
      }
    };
    this.dismiss()
    if (item.productType == 'booking') {
      this.router.navigate(['create-booking'], navigationExtras);
    }
    else if (item.productType == 'food') {
      this.router.navigate(['create-food-item'], navigationExtras);
    }
    else if (item.productType == 'voucher') {
      this.router.navigate(['create-voucher'], navigationExtras);
    }
    else {
      this.router.navigate(['new-product'], navigationExtras);
    }
  }

  getDateTimeFormat(date){
    return moment(date).format('MMM D, YYYY hh:mm a');
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

    if (this.subcategoryData){
      this.options.filename = this.subcategoryData.name+' '+this.getDateTimeFormat(new Date);
    }
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
    this.events.unsubscribe('product:addSubcategorySuccess');
    this.events.unsubscribe('product:deleteSubcategorySuccess');
    this.events.unsubscribe('product:editSubcategorySuccess');
    this.events.unsubscribe('product:publishProductsForSubcategory');
    this.events.unsubscribe('product:noProductsForSubcategory');
    this.events.unsubscribe('product:updateProductPostionSucess');
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
