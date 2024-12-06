import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, AlertController, LoadingController, Platform, ModalController, IonContent } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { Storage } from '@ionic/storage';
import { ConfigService } from 'src/app/services/config/config.service';
import { Location } from '@angular/common';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { ProductSectionPage } from 'src/app/admin/admin-shop/new-product/product-section/product-section.page'
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { ImageEditorComponent } from 'src/app/components/image-editor/image-editor.component';
import { VoucherService } from 'src/app/services/voucher/voucher.service';
import { Voucher } from 'src/app/models/voucher';
import { SharedService } from 'src/app/services/shared/shared.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-create-voucher',
  templateUrl: './create-voucher.page.html',
  styleUrls: ['./create-voucher.page.scss'],
})
export class CreateVoucherPage implements OnInit {

  // Voucher Object Start
  voucher: Voucher = {
    approved: false,
    prodName: null,
    nameToSearch: null,
    prodDesc: null,
    prodShortDesc: null,
    prodPrice: null,
    status: true,
    createdAt: null,
    updatedAt: null,
    sortedAt: null,
    categories: null,
    brands: null,
    images: [],
    gst: null,
    discountedPrice: null,
    searchKeywords: [],
    productCode: '',
    productQty: '',
    stopWhenNoQty: false,
    coverPic: {
      imageId: '',
      mob: '',
      thumb: '',
      url: ''
    },
    minQty: null,
    maxQty: null,
    hsnCode: '',
    purchasePrice: null,
    discount: 0,
    vendorId: '',
    gstExclusive: false,
    allowPayment: false,
    productType: 'voucher',
    slug: {
      name: null,
      updatedAt: new Date(),
      updatedBy: 'admin'
    }
  };
  // Voucher Object End

  listOfBase64Image: any = [];
  loader: any;
  coverValue = false;
  categories: any;
  selectedCategories: any[] = [];
  selectedBrands: any[] = [];
  devWidth: any;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  searchCategory: string = '';
  searchBrand: string = '';
  showNoCategories: boolean = false;
  showCategoriesLoader: boolean = true;
  editProductId: string = '';
  routeFromCategories: boolean = false;
  keyword: string = '';
  subcategories: any = [];
  listOfSubcategories = {};
  ckeConfig: any;
  routeFromOptions: boolean = false;
  listOfSubcategoriesInView: any = {};
  taxType: any;
  showNoBrands: boolean = false;
  brands = [];
  subscriptionFeature = false;
  userRole = ""
  vendorData = []
  vendorName = 'Select Vendor'
  imagesLimit: any;
  multiVendor: boolean = false;
  vendors = [];
  roleVendorId: any;
  roleVendorData: any;
  sectionLimit: any
  productSections = []
  sideMenu = []
  selectedId = '0'
  fromAppointment = false;
  needToUpdateImages = false;
  isUniversal = false;
  subOfSubCategories = {};
  subOfSubCategoryToggle = {};

  constructor(
    private route: ActivatedRoute,
    private events: Events,
    private alertController: AlertController,
    private router: Router,
    public loadingController: LoadingController,
    private platform: Platform,
    private modalController: ModalController,
    private storage: Storage,
    private voucherService: VoucherService,
    private configService: ConfigService,
    private angularFirestore: AngularFirestore,
    private _location: Location,
    private vendorService: VendorService,
    public sharedService: SharedService,
    private categoryService: CategoriesService
  ) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.editProductId = this.router.getCurrentNavigation().extras.state.productId;
        this.routeFromCategories = this.router.getCurrentNavigation().extras.state.routeFromCategories;
        this.routeFromOptions = this.router.getCurrentNavigation().extras.state.routeFromOptions;
        if (this.router.getCurrentNavigation().extras.state.routeFromAppointment) {
          this.fromAppointment = this.router.getCurrentNavigation().extras.state.routeFromAppointment
        }
      }
    });
  }

  ngOnInit() {
    this.sectionLimit = this.configService.environment.productSectionsLimit;
    this.ckeConfig = {
      allowedContent: true,
      height: 200
    }
    this.isUniversal = this.sharedService.isUniversal();
  }

  async ionViewWillEnter() {
    await this.initializeSubscriptions();
    this.userRole = await this.storage.get('userRole');
    if (this.userRole == 'vendor') {
      this.roleVendorId = await this.storage.get('uid');
      this.roleVendorData = await this.vendorService.getVendorData(this.roleVendorId, 'details');
      if (this.roleVendorData && this.roleVendorData.approveAllProducts) {
        this.voucher['approved'] = true;
        this.voucher.status = true;
      } else {
        this.voucher['approved'] = false;
        this.voucher.status = false;
      }
    }
    this.imagesLimit = this.configService.environment.productImageLimit;
    this.events.publish('voucher:getAllCategories');
    this.events.publish('brands:getAllBrandsForAdmin');
    this.events.publish('variants:getVariantsTypeData');
    this.devWidth = this.platform.width();
    if (this.editProductId) {
      this.events.publish('voucher:getProductWithId', this.editProductId);
      this.events.publish('voucher:getAllSubCategories');
      this.getSections()
    }
    this.taxType = this.configService.environment.taxType;
    this.subscriptionFeature = this.configService.environment.subscriptionFeature;
    this.multiVendor = this.configService.environment.multiVendor;
    if (this.multiVendor) {
      let vendorRes = await this.vendorService.getAllVendors();
      console.log('vendors', vendorRes);
      if (vendorRes.length) {
        this.vendors = vendorRes;
      } else {
        this.multiVendor = false;
      }
      //this.events.publish('vendor:getAllVendors');
    }
    this.events.publish('filters:getActiveStatus');
    this.sideMenu.push(
      'Vendor',
      'Slug Name'
    );

  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  async initializeSubscriptions() {
    this.events.subscribe('voucher:publishgetProductWithId', (data) => {
      data = this.getUpdatedFields(data);
      this.voucher = data;

      this.events.publish('vendor:getVendorName', this.voucher.vendorId);
    })
    this.events.subscribe('voucher:addSuccess', (heading, desc) => {
      this.loader.dismiss();
      this.presentAlert(heading, desc, true);
      this.voucher.prodName = null;
      this.voucher.prodDesc = null;
      this.voucher.prodPrice = null;
      this.listOfBase64Image = [];
      this.selectedCategories = [];
      this.selectedBrands = [];
    });
    this.events.subscribe('voucher:addFailure', (heading, desc) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert(heading, desc);
    });
    this.events.subscribe('voucher:editSuccess', async (heading, desc) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      await this.presentAlert(heading, desc, true);
    });
    this.events.subscribe('voucher:editFailure', (heading, desc) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert(heading, desc);
    });
    this.events.subscribe('product-options:editSuccess', (heading, desc) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert(heading, desc, true);
    });
    this.events.subscribe('product-options:editFailure', (heading, desc) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert(heading, desc);
    });
    this.events.subscribe('voucher:deleteSuccess', (heading, msg) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this._location.back();

    });
    this.events.subscribe('voucher:deleteFailure', (heading, msg) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert(heading, msg);
    });
    this.events.subscribe('voucher:publishAllCategoriesForAdmin', async (categories) => {
      console.log('categories:', categories);
      if (this.loader) {
        this.loader.dismiss();
      }
      if (this.userRole == 'vendor' && this.roleVendorId) {
        let allCategories = categories;
        this.categories = allCategories.filter((category: any) => this.roleVendorData.categories.includes(category.id));
      } else {
        this.categories = categories;
      }
      this.showCategoriesLoader = false;
      this.showNoCategories = false;
    });
    this.events.subscribe('voucher:noCategoryAvailable', () => {
      console.log('no categories');
      if (this.loader) {
        this.loader.dismiss();
      }
      this.showNoCategories = true;
      this.showCategoriesLoader = false;
    });
    this.events.subscribe('brands:publishAllBrandsForAdmin', (brands) => {
      console.log('brands:', brands);
      if (this.loader) {
        this.loader.dismiss();
      }
      if (this.userRole == 'vendor' && this.roleVendorId) {
        let allBrands = brands;
        console.log('brands', brands);
        console.log('this.roleVendorData:', this.roleVendorData);
        this.brands = allBrands.filter((brand) => this.roleVendorData.brands.includes(brand.id));
      } else {
        this.brands = brands;
      }
      this.showNoBrands = false;
      //console.log('brands', brands);
    });
    this.events.subscribe('brands:noBrandAvailableForAdmin', () => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.showNoBrands = true;
    });
    this.events.subscribe('product-options:publishOptionData', (option, productOptions) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      option = this.getUpdatedFields(option);

      this.voucher = option;
    });

    this.events.subscribe('product-options:deleteProductOptionSuccess', () => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert('', 'Option Deleted Successfully!', true);
    });

    this.events.subscribe('vendor:getVendorNameSuccess', (data) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      if (data) {
        this.vendorData = data
      }
      this.vendorName = this.vendorData['name']
    });

  }

  editShowDisable() {
    if (this.userRole == 'vendor') {
      if (this.voucher.approved) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  removeImage(index) {
    this.listOfBase64Image.splice(index, 1);
  }

  calculateImageSize(base64String: string) {
    let padding: number, inBytes: number, base64StringLength: number;
    if (base64String.endsWith('==')) {
      padding = 2;
    } else if (base64String.endsWith('=')) {
      padding = 1;
    } else { padding = 0; }

    base64StringLength = base64String.length;
    inBytes = (base64StringLength / 4) * 3 - padding;
    const kbytes = inBytes / 1000;
    return kbytes;
  }

  async saveVoucher() {
    this.coverValue = true;
    if (this.voucher.coverPic && !this.voucher.coverPic.url) {
      this.coverValue = false;
    } else {
      this.coverValue = true;
    }
    if (!this.coverValue && this.listOfBase64Image.length) {
      console.log('this.listOfBase64Image', this.listOfBase64Image);
      for (let i = 0; i < this.listOfBase64Image.length; i++) {
        if (this.listOfBase64Image[i].cover === true) {
          this.coverValue = true;
          break;
        } else {
          this.coverValue = false;
        }
      }
    }
    if (this.voucher.discountedPrice === null) {
      this.voucher.discountedPrice = this.voucher.prodPrice;
    }
    this.voucher.discount = parseFloat((((this.voucher.prodPrice - this.voucher.discountedPrice) / this.voucher.prodPrice) * 100).toFixed(2));
    if (this.voucher.productCode != '') {
      let prodCode: any = await this.voucherService.checkProductSKU(this.voucher.productCode, this.editProductId);
      if (prodCode && prodCode.length) {
        let matchingProds: any = [];
        for (let i = 0; i < prodCode.length; i++) {
          if (this.editProductId) {
            if (this.editProductId != prodCode[i].id) {
              matchingProds.push(prodCode[i].data.name)
            }
          } else {
            matchingProds.push(prodCode[i].data.name)
          }
        }
        if (matchingProds && matchingProds.length) {
          this.presentAlert('', `Please enter a unique voucher Code - Matching voucher are :- ${matchingProds}`);
          return;
        }
      }
    }

    if (this.voucher.prodName === null || this.voucher.prodName === '') {
      this.presentAlert('', 'Please enter voucher name');
    }
    else if (!this.voucher.prodPrice) {
      this.presentAlert('', 'Please enter voucher price');
    }
    else if (this.voucher.productCode === null || this.voucher.productCode === '') {
      this.presentAlert('', 'Please enter voucher Code');
    }
    else if (this.voucher.prodDesc === null || this.voucher.prodDesc === '') {
      this.presentAlert('', 'Please enter voucher description');
    }
    else if (!(this.voucher.categories && this.voucher.categories.length) && !(this.voucher.brands && this.voucher.brands.length)) {
      this.presentAlert('', 'Please select any category or brand');
    }
    else if (this.listOfBase64Image.length !== 0 && this.coverValue === false) {
      this.presentAlert('', 'Please make any one image as cover picture');
    }
    else if (this.voucher.gst && this.voucher.gst > 100) {
      this.presentAlert('', `${this.taxType} value must be less than 100`);
    }

    else {
      await this.presentLoading();
      this.voucher.createdAt = new Date();
      this.voucher.updatedAt = new Date();
      this.voucher.sortedAt = new Date();
      this.voucher.nameToSearch = this.voucher.prodName.toLowerCase();
      if (!this.voucher.prodPrice) {
        this.voucher.prodPrice = null;
      }
      if (this.userRole === 'vendor') {
        this.voucher.vendorId = await this.storage.get('uid');
      }
      if (this.isUniversal && this.editProductId) {
        const slugName = this.sharedService.createSlugName(this.voucher.slug.name);
        const sameSlugExists = await this.sharedService.sameSlugExists('products', this.voucher, slugName);
        if (sameSlugExists) {
          this.presentAlert('', 'Same slug already exists, please try with another slug name');
          return;
        } else {
          this.voucher.slug = {
            name: slugName,
            updatedAt: new Date(),
            updatedBy: 'admin'
          }
        }
      }
      if (this.editProductId) {
        console.log('edit prod');
        this.events.publish('voucher:editProduct', this.voucher, this.editProductId, this.listOfBase64Image, this.needToUpdateImages);
      } else {
        console.log('new prod');
        this.events.publish('voucher:addProduct', this.voucher, this.listOfBase64Image);
      }
    }
  }

  updateNewProductStatus(status: boolean) {
    // console.log('this.voucher.approved:', this.voucher.approved);
    if (this.userRole == 'vendor' && !this.voucher.approved) {
      this.presentAlert('Alert', 'You cannot make this voucher active as it is not approved by Admin.');
      return;
    }
    if (status === true) {
      console.log('status=false');
      this.voucher.status = false;
    } else {
      console.log('status=true');
      this.voucher.status = true;
    }
  }

  newProductCoverPic(index: number) {
    //console.log('index of cover pic', index);
    for (let i = 0; i < this.listOfBase64Image.length; i++) {
      if (i === index) {
        this.listOfBase64Image[index].cover = true;
      } else {
        this.listOfBase64Image[i].cover = false;
      }
    }
  }

  editProductCoverPicInData(index: number) {
    const editImgData = this.voucher.images[index];
    this.voucher.coverPic = editImgData;
    for (let i = 0; this.listOfBase64Image.length; i++) {
      this.listOfBase64Image[i].cover = false;
    }
  }

  editProductCoverPicInList(index: number) {
    this.voucher.coverPic = {
      imageId: null,
      mob: null,
      thumb: null,
      url: null
    };
    for (let i = 0; i < this.listOfBase64Image.length; i++) {
      if (i === index) {
        this.listOfBase64Image[index].cover = true;
      } else {
        this.listOfBase64Image[i].cover = false;
      }
    }
  }

  imagesReorder(event: any) {
    let b = this.voucher.images[event.detail.from];
    this.voucher.images[event.detail.from] = this.voucher.images[event.detail.to];
    this.voucher.images[event.detail.to] = b;
    this.needToUpdateImages = true;
    event.detail.complete();
  }

  removeEditImageInData(index: number, url: string) {
    this.voucher.images.splice(index, 1);
    if (url === this.voucher.coverPic.url) {
      this.voucher.coverPic = {
        imageId: null,
        mob: null,
        thumb: null,
        url: null,
      };
    }
    this.needToUpdateImages = true;
  }

  cancel() {
    this.router.navigate(['voucher']);
  }
  onClickImage(img: any) {
    let imgZoomUrls = [];
    for (const img of this.listOfBase64Image) {
      imgZoomUrls.push({ url: img.base64Img });
    }
    let imgIndex = this.listOfBase64Image.indexOf(img);
    this.modalController.create({
      component: ImageModalPage,
      cssClass: 'photo-modal-class',
      componentProps: {
        imgs: imgZoomUrls,
        index: imgIndex
      }
    }).then(modal => modal.present());
  }
  onClickEditImage(img: any) {
    let imgZoomUrls = [];
    let imgurl = { url: img };
    for (const img of this.listOfBase64Image) {
      imgZoomUrls.push({ url: img.base64Img });
    }
    for (const img of this.voucher.images) {
      imgZoomUrls.push({ url: img.url });
    }
    let imgIndex = imgZoomUrls.indexOf(imgurl);
    this.modalController.create({
      component: ImageModalPage,
      cssClass: 'photo-modal-class',
      componentProps: {
        imgs: imgZoomUrls,
        index: imgIndex
      }
    }).then(modal => modal.present());
  }
  async deleteAlertConfirm() {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Delete',
          handler: () => {
            //console.log('Confirm Okay');
            this.deleteProduct();
          }
        }
      ]
    });

    await alert.present();
  }
  async deleteProduct() {
    this.loader = await this.loadingController.create({
      message: 'Please Wait...',
    });
    await this.loader.present();
    this.events.publish('voucher:deleteProduct', this.editProductId);
  }
  async presentAlert(heading?: any, desc?: any, action?: boolean) {
    const alert = await this.alertController.create({
      header: heading,
      message: desc,
      buttons: [{
        text: 'Ok',
        handler: () => {
          //console.log('Confirm Okay', this.routeFromCategories, action);
          if (action === true && !this.routeFromCategories && !this.routeFromOptions && !this.fromAppointment) {
            this._location.back();
          } else if (action === true && this.routeFromCategories) {
            this._location.back();
          } else if (action === true && this.routeFromOptions) {
            this._location.back();
          }
          else if (action === true && this.fromAppointment) {
            this.router.navigate(['admin-products']);
          }
        }
      }]
    });
    await alert.present();
  }
  async presentLoading() {
    this.loader = await this.loadingController.create({
      message: 'Please Wait...',
    });
    await this.loader.present();
  }
  onClickCategoryCheckBox(cid: string) {
    if (this.voucher.categories) {
      if (this.voucher.categories.indexOf(cid) === -1) {
        this.voucher.categories.push(cid);
      } else {
        const cidIndex = this.voucher.categories.indexOf(cid);
        this.voucher.categories.splice(cidIndex, 1);
      }
    }
    else {
      this.voucher.categories = []
      this.voucher.categories.push(cid);
    }

  }

  onClickBrandCheckBox(bid: string) {
    if (this.voucher.brands) {
      if (this.voucher.brands.indexOf(bid) === -1) {
        this.voucher.brands.push(bid);
      } else {
        const bidIndex = this.voucher.brands.indexOf(bid);
        this.voucher.brands.splice(bidIndex, 1);
      }
    }
    else {
      this.voucher.brands = []
      this.voucher.brands.push(bid);
    }
  }

  editCheckBoxValue(id: string) {
    if (this.voucher.categories) {
      if (this.voucher.categories.indexOf(id) !== -1) {
        return true;
      } else {
        return false;
      }
    }

  }
  editBrandCheckBoxValue(id: string) {
    if (this.voucher.brands && this.voucher.brands.length && this.voucher.brands.indexOf(id) !== -1) {
      return true;
    } else {
      return false;
    }
  }
  clearSearchCategory() {
    this.searchCategory = null;
  }
  clearSearchBrand() {
    this.searchBrand = null;
  }

  allowPaymentToggle() {
    this.voucher.allowPayment = !this.voucher.allowPayment;
  }

  addSearchKeywords() {
    this.voucher.searchKeywords.push(this.keyword);
    this.keyword = '';
  }

  removeKeyword(i) {
    this.voucher.searchKeywords.splice(i, 1);
  }

  editProductAddSearchKeywords() {
    this.voucher.searchKeywords.push(this.keyword);
    this.keyword = '';
  }

  editProductRemoveKeyword(i) {
    this.voucher.searchKeywords.splice(i, 1);
  }

  stopOrderWhenNoQtyToggle() {
    this.voucher.stopWhenNoQty = !this.voucher.stopWhenNoQty;
  }

  editProductStopOrderWhenNoQtyToggle(status) {
    if (status) {
      this.voucher.stopWhenNoQty = false;
    } else {
      this.voucher.stopWhenNoQty = true;
    }
  }

  async getSubcategories(cid) {
    if (!this.listOfSubcategories.hasOwnProperty(cid)) {
      let subcategories = []
      subcategories = await this.voucherService.getSubcategoriesInNewProduct(cid);
      // console.log('subCate:::', subcategories);
      if (this.userRole == 'vendor' && this.roleVendorId) {
        this.listOfSubcategories[cid] = subcategories.filter((subCat) => this.roleVendorData.categories.includes(subCat.id));
      } else {
        this.listOfSubcategories[cid] = subcategories;
      }
      //console.log('listOfSubcategories', this.listOfSubcategories);
      this.listOfSubcategoriesInView[cid] = { active: true };
    } else {
      if (!this.listOfSubcategoriesInView[cid].active) {
        this.listOfSubcategoriesInView[cid].active = true;
      } else {
        this.listOfSubcategoriesInView[cid].active = false;
      }
    }
  }

  async getSubOfSubCategories(catId: any, subCatId: any) {
    // console.log('catId:', catId, 'subCatId:', subCatId);
    if (!this.subOfSubCategories.hasOwnProperty(subCatId)) {
      let subOfSubCategoriesData: any = [];
      subOfSubCategoriesData = await this.categoryService.getSubOfSubCategories(catId, subCatId);

      if (this.userRole == 'vendor' && this.roleVendorId) {
        this.subOfSubCategories[subCatId] = subOfSubCategoriesData.filter((subCat: any) =>
          this.roleVendorData.categories.includes(subCat.id)
        );
      } else {
        this.subOfSubCategories[subCatId] = subOfSubCategoriesData;
      }
      this.subOfSubCategoryToggle[subCatId] = { active: true };
      // console.log('subOfSubCategories:', this.subOfSubCategories);
    } else {
      this.subOfSubCategoryToggle[subCatId].active = !this.subOfSubCategoryToggle[subCatId].active;
      // console.log('subOfSubCategoryToggle:', this.subOfSubCategoryToggle[subCatId]);
    }
  }

  changeInPrice() {
    if (this.voucher.discountedPrice === this.voucher.prodPrice) {
      this.voucher.discountedPrice = null;
    }
  }

  async onDrop(files: FileList) {
    // console.log('files:', files, '\n imgLimit:', this.imagesLimit);
    //console.log(this.listOfBase64Image,this.voucher)
    let message = 'Sorry, total' + ' ' + this.imagesLimit.toString() + ' ' + 'images allowed'
    if (this.listOfBase64Image && !this.voucher && (this.listOfBase64Image.length == this.imagesLimit)) {
      // console.log('here1', this.listOfBase64Image.length)
      this.presentAlert('Upload failed', message)
    }
    else if (this.voucher && this.voucher.images && (this.voucher.images.length == this.imagesLimit)) {
      // console.log('here2')
      this.presentAlert('Upload failed', message)
    }
    else if (this.listOfBase64Image.length && this.voucher && this.voucher.images && (this.listOfBase64Image.length + this.voucher.images.length == this.imagesLimit)) {
      // console.log('here3')
      this.presentAlert('Upload failed', message)
    }
    else {
      const modal = await this.modalController.create({
        component: ImageEditorComponent,
        componentProps: {
          aspectRatioWidthVal: 1,
          aspectRatioHeightVal: 1,
          type: 'product',
        },
        cssClass: 'custom-img-editor'
      })
      await modal.present();
      modal.onDidDismiss().then(res => {
        if (res.data) {
          for (let i = 0; i < res.data.length; i++) {
            let size = this.calculateImageSize(res.data[i] || '')
            this.listOfBase64Image.push({ base64Img: res.data[i] || '', cover: false, size: size });
          }
        }
      })
    }
  }

  addNewSection() {
    if (this.productSections.length < this.sectionLimit) {
      this.openProductSectionModal();
    }
    else {
      this.presentAlert('Sections limit reached, Max ' + this.sectionLimit + ' allowed');
    }
  }

  async openProductSectionModal() {
    const modal = await this.modalController.create({
      component: ProductSectionPage,
      backdropDismiss: false,
      cssClass: 'custom-modal',
      componentProps: { productId: this.editProductId }
    });
    modal.onDidDismiss().then(() => {
      this.getSections()
    })
    await modal.present();
  }

  openWidgetEdit(type, id, index) {
    if (type == "image-banner") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          productId: this.editProductId
        }
      };
      this.router.navigate(['edit-banner'], navigationExtras);
    }
    if (type == "image-block") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          productId: this.editProductId
        }
      };
      this.router.navigate(['edit-image-block'], navigationExtras);
    }
    else if (type == "video-block") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          productId: this.editProductId
        }
      };
      this.router.navigate(['edit-video-block'], navigationExtras);
    }
    else if (type == "text-block") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          productId: this.editProductId
        }
      };
      this.router.navigate(['edit-text-block'], navigationExtras);
    }
    else if (type == "product-carousel" || type == "product-list") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          productId: this.editProductId
        }
      };
      this.router.navigate(['edit-product-carousel'], navigationExtras);
    }
  }

  async getSections() {
    try {
      let sections: any = await this.angularFirestore.collection('products').doc(this.editProductId).collection('sections').doc('productWidgets').valueChanges().pipe(first()).toPromise();
      if (sections && sections.sections) {
        this.productSections = sections.sections;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async SectionReorder(event) {
    let draggedItem = this.productSections.splice(event.detail.from, 1)[0];
    this.productSections.splice(event.detail.to, 0, draggedItem)
    event.detail.complete();
    await this.angularFirestore.collection('products').doc(this.editProductId).collection('sections').doc('productWidgets').set({ 'sections': this.productSections });
    this.presentAlert('Sections saved successfully!');
  }

  async deleteSectionConfirm(widgetID, index: number, type: string) {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this section?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.events.publish('widgets:deleteWidget', widgetID);
            this.deleteSection(index, type);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteSection(index: number, type: string) {
    this.presentLoading();
    this.productSections.splice(index, 1);
    try {
      await this.angularFirestore.collection('products').doc(this.editProductId).collection('sections').doc('productWidgets').update({ 'sections': this.productSections });
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert('Sections saved successfully!');
    } catch (error) {
      console.log(error)
      this.presentAlert('Some error occured, please try again');

    }
  }

  async changeLocationStatus(index, type) {
    await this.presentLoading();
    if (type == "app") {
      if (this.productSections[index].location == "app") {
        this.productSections[index].location = "none";
      }
      else if (this.productSections[index].location == "none") {
        this.productSections[index].location = "app";
      }
      else if (this.productSections[index].location == "all") {
        this.productSections[index].location = "web";
      }
      else if (this.productSections[index].location == "web") {
        this.productSections[index].location = "all";
      }
    }
    else if (type == "web") {
      if (this.productSections[index].location == "web") {
        this.productSections[index].location = "none";
      }
      else if (this.productSections[index].location == "none") {
        this.productSections[index].location = "web";
      }
      else if (this.productSections[index].location == "all") {
        this.productSections[index].location = "app";
      }
      else if (this.productSections[index].location == "app") {
        this.productSections[index].location = "all";
      }
    }
    try {
      await this.angularFirestore.collection('products').doc(this.editProductId).collection('sections').doc('productWidgets').set({ 'sections': this.productSections });
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert('Sections saved successfully!');
    } catch (error) {
      console.log(error)
      this.presentAlert('Some error occured, please try again');

    }

  }

  toggleGstExclusive() {
    this.voucher.gstExclusive = !this.voucher.gstExclusive
  }

  toggleGstExclusiveEdit() {
    this.voucher.gstExclusive = !this.voucher.gstExclusive
  }

  getEditSlabInputs(slab) {
    let adminInput;
    adminInput = [
      {
        name: 'mrp',
        type: 'number',
        placeholder: "Edit price",
        value: slab.mrp
      },
      {
        name: 'price',
        type: 'number',
        placeholder: "Edit discount price",
        value: slab.price
      }
    ]
    return adminInput;
  }

  changeComponent(index: number) {
    let prevMsgDiv = document.getElementById(this.selectedId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById(index.toString());
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.selectedId = index.toString()
  }

  getUpdatedFields(data) {
    if (!data.hasOwnProperty('gstExclusive')) {
      data['gstExclusive'] = this.voucher.gstExclusive;
    }
    return data;
  }

  addVendor(e) {
    //console.log('vendorId', e.target.value);
    this.voucher.vendorId = e.target.value;

  }

  removeSubscriptions() {
    this.events.unsubscribe('voucher:addSuccess');
    this.events.unsubscribe('voucher:addFailure');
    this.events.unsubscribe('voucher:editSuccess');
    this.events.unsubscribe('voucher:editFailure');
    this.events.unsubscribe('product-options:editSuccess');
    this.events.unsubscribe('product-options:editFailure');
    this.events.unsubscribe('voucher:deleteSuccess');
    this.events.unsubscribe('voucher:deleteFailure');
    this.events.unsubscribe('voucher:publishAllCategoriesForAdmin');
    this.events.unsubscribe('voucher:publishgetProductWithId');
    this.events.unsubscribe('product-options:publishOptionData');
    this.events.unsubscribe('product-options:deleteProductOptionSuccess');
    this.events.unsubscribe('brands:publishAllBrandsForAdmin');
    this.events.unsubscribe('brands:noBrandAvailableForAdmin');
    this.events.unsubscribe('voucher:noCategoryAvailable');
    this.events.unsubscribe('vendor:getVendorNameSuccess');
  }

}
