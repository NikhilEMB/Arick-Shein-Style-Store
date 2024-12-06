import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, AlertController, LoadingController, Platform, ModalController, IonContent } from '@ionic/angular';
import { Showcase } from 'src/app/models/showcase';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { Storage } from '@ionic/storage';
import { ShowcaseService } from 'src/app/services/showcase/showcase.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { Location } from '@angular/common';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { ProductSectionPage } from 'src/app/admin/admin-shop/new-product/product-section/product-section.page'
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { UsersModalPage } from '../../users-modal/users-modal.page';
import { ImageEditorComponent } from 'src/app/components/image-editor/image-editor.component';
import { MultiRegionService } from 'src/app/services/multi-region/multi-region.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ColorsModalPage } from '../../variants/colors-modal/colors-modal.page';
import { SelectFilterPage } from '../../filter-settings/select-filter/select-filter.page';

@Component({
  selector: 'app-create-showcase',
  templateUrl: './create-showcase.page.html',
  styleUrls: ['./create-showcase.page.scss'],
})
export class CreateShowcasePage implements OnInit {

  // Showcase Object Start
  showcase: Showcase = {
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
    discountedPrice: null,
    searchKeywords: [],
    productCode: '',
    coverPic: {
      imageId: '',
      mob: '',
      thumb: '',
      url: ''
    },
    hsnCode: '',
    discount: 0,
    metaData: {
      pageTitle: '',
      metaDescription: '',
      metaKeywords: ''
    },
    productType: 'showcase',
    slug: {
      name: null,
      updatedAt: new Date(),
      updatedBy: 'admin'
    },
    additionalInfo: {
      countryOfOrigin: "",
    },
    priceSlabs: {
      active: false,
      singleSlabs: [],
      // variantSlabs: {}
    },
    color: {},
    vendorId: '',
    filters: {},
  };
  // Showcase Object End

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
  multiRegion = false;
  multiRegionData = [];
  userRole = ""
  vendorData = []
  vendorName = 'Select Vendor'
  imagesLimit: any;
  roleVendorId: any;
  roleVendorData: any;
  sectionLimit: any
  productSections = []
  sideMenu = []
  selectedId = '0'
  fromAppointment = false
  needToUpdateImages = false;
  isUniversal = false;
  subOfSubCategories = {};
  subOfSubCategoryToggle = {};
  multiVendor = false;
  vendors = [];
  isFilterActive = false;

  constructor(
    private route: ActivatedRoute,
    private events: Events,
    private alertController: AlertController,
    private router: Router,
    public loadingController: LoadingController,
    private platform: Platform,
    private modalController: ModalController,
    private storage: Storage,
    private showcaseService: ShowcaseService,
    private configService: ConfigService,
    private angularFirestore: AngularFirestore,
    private _location: Location,
    private vendorService: VendorService,
    private multiRegionService: MultiRegionService,
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
    // this.SHARED_LABELS = this.labelService.labels['SHARED'];
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
        this.showcase['approved'] = true;
        this.showcase.status = true;
      } else {
        this.showcase['approved'] = false;
        this.showcase.status = false;
      }
    }
    this.imagesLimit = this.configService.environment.productImageLimit;
    this.events.publish('showcase:getAllCategories');
    this.events.publish('brands:getAllBrandsForAdmin');
    this.events.publish('variants:getVariantsTypeData');
    this.devWidth = this.platform.width();
    if (this.editProductId) {
      this.events.publish('showcase:getProductWithId', this.editProductId);
      this.events.publish('showcase:getAllSubCategories');
      this.getSections()
    }
    this.taxType = this.configService.environment.taxType;
    this.multiRegion = this.configService.environment.multiRegion;
    this.multiVendor = this.configService.environment.multiVendor;
    if (this.multiRegion) {
      this.events.publish('multi-region:getActiveStatus');
      this.events.publish('multi-region:getAllActiveRegions');
      this.multiRegionData = await this.multiRegionService.getAllActiveRegions('service');
      console.log('multiRegionData:', this.multiRegionData);

    }
    if (this.multiVendor) {
      this.vendors = await this.vendorService.getAllVendors();
      if (this.vendors.length) {
        this.vendors = this.vendors;
      } else {
        this.multiVendor = false;
      }
      //this.events.publish('vendor:getAllVendors');
    }
    this.events.publish('filters:getActiveStatus');
    this.sideMenu.push(
      // "Price Slabs",
      "Colors",
      "Vendors",
      "Filters",
      // "Wholesale Price",
      // "Variant Groups",
      "Seo for Website",
      // "Attributes",
      // "Variant Chart",
      // "Clone Showcase",
      // "Custom Action",
      // "Stock Attributes",
      "Slug Name",
    );
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  async initializeSubscriptions() {
    this.events.subscribe('showcase:publishgetProductWithId', (data) => {
      data = this.getUpdatedFields(data);
      this.showcase = data;
    })
    this.events.subscribe('showcase:addSuccess', (heading, desc) => {
      this.loader.dismiss();
      this.presentAlert(heading, desc, true);
      this.showcase.prodName = null;
      this.showcase.prodDesc = null;
      this.showcase.prodPrice = null;
      this.listOfBase64Image = [];
      this.selectedCategories = [];
      this.selectedBrands = [];
    });
    this.events.subscribe('showcase:addFailure', (heading, desc) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert(heading, desc);
    });
    this.events.subscribe('showcase:editSuccess', async (heading, desc) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      await this.presentAlert(heading, desc, true);
    });
    this.events.subscribe('showcase:editFailure', (heading, desc) => {
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
    this.events.subscribe('showcase:deleteSuccess', (heading, msg) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this._location.back();

    });
    this.events.subscribe('showcase:deleteFailure', (heading, msg) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert(heading, msg);
    });
    this.events.subscribe('showcase:publishAllCategoriesForAdmin', async (categories) => {
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
    this.events.subscribe('showcase:noCategoryAvailable', () => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.showNoCategories = true;
      this.showCategoriesLoader = false;
    });
    this.events.subscribe('brands:publishAllBrandsForAdmin', (brands) => {
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

      this.showcase = option;
      // if (!this.showcase.deal.specificUsers) {
      //   this.showcase.deal.specificUsers = this.showcase.deal.specificUsers;
      // }
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

    this.events.subscribe('filters:publishActiveStatus', (data) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      if (data) {
        this.isFilterActive = data.active;
      }
    });

  }

  editShowDisable() {
    if (this.userRole == 'vendor') {
      if (this.showcase.approved) {
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
    //console.log(base64StringLength);
    inBytes = (base64StringLength / 4) * 3 - padding;
    //console.log(inBytes);
    const kbytes = inBytes / 1000;
    return kbytes;
  }

  async saveProduct() {
    this.coverValue = true;
    if (this.showcase.coverPic && !this.showcase.coverPic.url) {
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
    if (this.showcase.discountedPrice === null) {
      this.showcase.discountedPrice = this.showcase.prodPrice;
    }
    this.showcase.discount = parseFloat((((this.showcase.prodPrice - this.showcase.discountedPrice) / this.showcase.prodPrice) * 100).toFixed(2));
    if (this.showcase.productCode != '') {
      let prodCode: any = await this.showcaseService.checkProductSKU(this.showcase.productCode, this.editProductId);
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
          this.presentAlert('', `Please enter a unique Showcase Code - Matching products are :- ${matchingProds}`);
          return;
        }
      }
    }

    if (this.showcase.prodName === null || this.showcase.prodName === '') {
      this.presentAlert('', 'Please enter showcase name');
    }
    else if (!this.showcase.prodPrice) {
      this.presentAlert('', 'Please enter showcase price');
    }
    else if (this.showcase.productCode === null || this.showcase.productCode === '') {
      this.presentAlert('', 'Please enter showcase Code');
    }
    else if (this.showcase.prodDesc === null || this.showcase.prodDesc === '') {
      this.presentAlert('', 'Please enter showcase description');
    }
    else if (!(this.showcase.categories && this.showcase.categories.length) && !(this.showcase.brands && this.showcase.brands.length)) {
      this.presentAlert('', 'Please select any category or brand');
    }
    else if (this.coverValue === false) {
      this.presentAlert('', 'Please make any one image as cover picture');
    }

    else {
      await this.presentLoading();
      this.showcase.createdAt = new Date();
      this.showcase.updatedAt = new Date();
      this.showcase.sortedAt = new Date();
      this.showcase.nameToSearch = this.showcase.prodName.toLowerCase();
      if (!this.showcase.prodPrice) {
        this.showcase.prodPrice = null;
      }
      if (this.userRole === 'vendor') {
        this.showcase.vendorId = await this.storage.get('uid')
      }
      if (this.isUniversal && this.editProductId) {
        const slugName = this.sharedService.createSlugName(this.showcase.slug.name);
        const sameSlugExists = await this.sharedService.sameSlugExists('products', this.showcase, slugName);
        if (sameSlugExists) {
          this.presentAlert('', 'Same slug already exists, please try with another slug name');
          return;
        } else {
          this.showcase.slug = {
            name: slugName,
            updatedAt: new Date(),
            updatedBy: 'admin'
          }
        }
      }
      if (this.editProductId) {
        console.log('edit prod');
        this.events.publish('showcase:editProduct', this.showcase, this.editProductId, this.listOfBase64Image, this.needToUpdateImages);
      } else {
        console.log('new prod');
        this.events.publish('showcase:addProduct', this.showcase, this.listOfBase64Image);
      }
    }
  }

  updateNewProductStatus(status: boolean) {
    console.log('this.showcase.approved:', this.showcase.approved);
    if (this.userRole == 'vendor' && !this.showcase.approved) {
      this.presentAlert('Alert', 'You cannot make this showcase active as it is not approved by Admin.');
      return;
    }
    if (status === true) {
      console.log('status=false');
      this.showcase.status = false;
    } else {
      console.log('status=true');
      this.showcase.status = true;
    }
  }

  newProductCoverPic(index) {
    //console.log('index of cover pic', index);
    for (let i = 0; i < this.listOfBase64Image.length; i++) {
      if (i === index) {
        this.listOfBase64Image[index].cover = true;
      } else {
        this.listOfBase64Image[i].cover = false;
      }
    }
  }

  editProductCoverPicInData(index) {
    const editImgData = this.showcase.images[index];
    this.showcase.coverPic = editImgData;
    for (let i = 0; this.listOfBase64Image.length; i++) {
      this.listOfBase64Image[i].cover = false;
    }
  }
  editProductCoverPicInList(index) {
    this.showcase.coverPic = {
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
    let b = this.showcase.images[event.detail.from];
    this.showcase.images[event.detail.from] = this.showcase.images[event.detail.to];
    this.showcase.images[event.detail.to] = b;
    this.needToUpdateImages = true;
    event.detail.complete();
  }

  removeEditImageInData(index: number, url: string) {
    this.showcase.images.splice(index, 1);
    if (url === this.showcase.coverPic.url) {
      this.showcase.coverPic = {
        imageId: null,
        mob: null,
        thumb: null,
        url: null,
      };
    }
    this.needToUpdateImages = true;
  }

  cancel() {
    //console.log('in cancel');
    this.router.navigate(['showcase']);
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
    for (const img of this.showcase.images) {
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
    this.events.publish('showcase:deleteProduct', this.editProductId);
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
    if (this.showcase.categories) {
      if (this.showcase.categories.indexOf(cid) === -1) {
        this.showcase.categories.push(cid);
      } else {
        const cidIndex = this.showcase.categories.indexOf(cid);
        this.showcase.categories.splice(cidIndex, 1);
      }
    }
    else {
      this.showcase.categories = []
      this.showcase.categories.push(cid);
    }

  }

  onClickBrandCheckBox(bid: string) {
    if (this.showcase.brands) {
      if (this.showcase.brands.indexOf(bid) === -1) {
        this.showcase.brands.push(bid);
      } else {
        const bidIndex = this.showcase.brands.indexOf(bid);
        this.showcase.brands.splice(bidIndex, 1);
      }
    }
    else {
      this.showcase.brands = []
      this.showcase.brands.push(bid);
    }
  }

  editCheckBoxValue(id: string) {
    if (this.showcase.categories) {
      if (this.showcase.categories.indexOf(id) !== -1) {
        return true;
      } else {
        return false;
      }
    }

  }
  editBrandCheckBoxValue(id: string) {
    if (this.showcase.brands && this.showcase.brands.length && this.showcase.brands.indexOf(id) !== -1) {
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

  addSearchKeywords() {
    this.showcase.searchKeywords.push(this.keyword);
    this.keyword = '';
  }

  removeKeyword(i) {
    this.showcase.searchKeywords.splice(i, 1);
  }

  editProductAddSearchKeywords() {
    this.showcase.searchKeywords.push(this.keyword);
    this.keyword = '';
  }

  editProductRemoveKeyword(i) {
    this.showcase.searchKeywords.splice(i, 1);
  }

  async getSubcategories(cid) {
    if (!this.listOfSubcategories.hasOwnProperty(cid)) {
      let subcategories = []
      subcategories = await this.showcaseService.getSubcategoriesInNewProduct(cid);
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
    if (this.showcase.discountedPrice === this.showcase.prodPrice) {
      this.showcase.discountedPrice = null;
    }
  }

  async onDrop(files: FileList) {
    // console.log('files:', files, '\n imgLimit:', this.imagesLimit);
    //console.log(this.listOfBase64Image,this.showcase)
    let message = 'Sorry, total' + ' ' + this.imagesLimit.toString() + ' ' + 'images allowed'
    if (this.listOfBase64Image && !this.showcase && (this.listOfBase64Image.length == this.imagesLimit)) {
      // console.log('here1', this.listOfBase64Image.length)
      this.presentAlert('Upload failed', message)
    }
    else if (this.showcase && this.showcase.images && (this.showcase.images.length == this.imagesLimit)) {
      // console.log('here2')
      this.presentAlert('Upload failed', message)
    }
    else if (this.listOfBase64Image.length && this.showcase && this.showcase.images && (this.listOfBase64Image.length + this.showcase.images.length == this.imagesLimit)) {
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
    if (!data.hasOwnProperty('additionalInfo')) {
      data['additionalInfo'] = this.showcase.additionalInfo;
    }
    return data;
  }

  async cloneProduct() {
    const cloneAlert = await this.alertController.create({
      subHeader: 'Clone Product',
      message: 'Use this to make clone of this product.',
      inputs: [
        {
          name: 'clones',
          type: 'number',
          placeholder: 'Enter the number of clones you want to make'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Add',
          handler: async (alertData) => {
            const clones = parseInt(alertData.clones);
            if (clones) {
              console.log('editProductId', this.editProductId);
              await this.showcaseService.makeProductClones(clones, this.editProductId);
              this.presentAlert('Clones successful', 'Product Clones will be created in couple of minutes.');
            } else {
              this.presentAlert('Warning', 'Provide valid input.');
            }
          }
        }
      ]
    });
    await cloneAlert.present();
  }


  // ? Toggle checkbox function for various input
  toggleCheckbox(type: string) {
    // Price Slab Toggle
    if (type == 'priceSlab') {
      this.showcase.priceSlabs.active = !this.showcase.priceSlabs.active;
    }
  }
  // ? Toggle checkbox function for various input

  // ? Price Slab Start
  // activePriceSlabEdit() {
  //   this.showcase.priceSlabs.active = !this.showcase.priceSlabs.active;
  // }

  async enterPriceSlabData() {
    let adminInput: any;
    adminInput = [
      {
        name: 'qty',
        type: 'number',
        placeholder: "Add quantity for slab"
      },
      {
        name: 'mrp',
        type: 'number',
        placeholder: "Add price"
      },
      {
        name: 'price',
        type: 'number',
        placeholder: "Add discount price"
      }
    ]
    const alert = await this.alertController.create({
      subHeader: "Enter Slab Details",
      inputs: adminInput,
      buttons: [
        {
          text: "cancel",
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: "done",
          handler: async (data) => {
            if (!data.qty || !data.price || !data.mrp) {
              this.presentAlert("Please enter all details!");
            }
            else {
              if (this.showcase.priceSlabs.singleSlabs.length == 0) {
                this.showcase.priceSlabs.singleSlabs.push({
                  qty: [1, 1 + parseInt(data.qty)],
                  mrp: parseFloat(data.mrp),
                  price: parseFloat(data.price)
                })
              }
              else {
                let lastIndex = this.showcase.priceSlabs.singleSlabs.length
                this.showcase.priceSlabs.singleSlabs.push({
                  qty: [this.showcase.priceSlabs.singleSlabs[lastIndex - 1].qty[1],
                  this.showcase.priceSlabs.singleSlabs[lastIndex - 1].qty[1] + parseInt(data.qty)],
                  mrp: parseFloat(data.mrp),
                  price: parseFloat(data.price)
                })
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async removePriceSlabs() {
    const alert = await this.alertController.create({
      subHeader: "Are you sure you want to remove all slabs ?",
      buttons: [
        {
          text: "No",
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: "Yes",
          handler: async (data) => {
            this.showcase.priceSlabs.singleSlabs = [];
          }
        }
      ]
    });
    await alert.present();
  }

  async editPriceSlabDataForSingleSlab(index: number, slab: any) {
    const alert = await this.alertController.create({
      subHeader: "Edit Slab Details",
      inputs: this.getEditSlabInputs(slab),
      buttons: [
        {
          text: "cancel",
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: "done",
          handler: async (data) => {
            if (!data.price || !data.mrp) {
              this.presentAlert("Please enter all details!");
            } else {
              this.showcase.priceSlabs.singleSlabs[index]['mrp'] = parseFloat(data.mrp);
              this.showcase.priceSlabs.singleSlabs[index]['price'] = parseFloat(data.price);
            }

          }
        }
      ]
    });
    await alert.present();
  }
  // ? Price Slab End


  // ? Colors Start
  async selectVariantColor() {
    const modal = await this.modalController.create({
      component: ColorsModalPage,
      componentProps: {
        name: '',
        image: '',
        code: ''
      }
    });
    modal.onDidDismiss()
      .then((res) => {
        //console.log('data from modal', res);
        if (res.data) {
          this.showcase.color = res.data;
        }
      });
    await modal.present();
  }

  async updateEditVariantColor() {
    const modal = await this.modalController.create({
      component: ColorsModalPage,
      componentProps: {
        name: this.showcase.color.name,
        image: this.showcase.color.image,
        code: this.showcase.color.code
      }
    });
    modal.onDidDismiss()
      .then((res) => {
        //console.log('data from modal', res);
        if (res.data) {
          this.showcase.color = res.data;
        }
      });
    await modal.present();
  }

  removeEditVariantColor() {
    this.showcase.color = {};
  }
  // ? Colors End

  // ? Vendors Start
  addVendor(e: any) {
    this.showcase.vendorId = e.target.value;
  }
  // ? Vendors End


  // ? Filter Start
  async addFilters() {
    const modal = await this.modalController.create({
      component: SelectFilterPage,
      componentProps: { addedFilters: this.showcase.filters }
    });

    modal.onDidDismiss().then((res: any) => {
      //console.log('res', res);
      if (res.data) {
        const addedFilters = res.data.addedFilters;
        //console.log('addedFilters', addedFilters);
        if (addedFilters.length) {
          let filtersObj = {};
          addedFilters.forEach(filter => {
            if (filter.active) {
              let values = []
              filter.values.forEach(v => {
                if (v.isChecked) {
                  values.push(v.value);
                }
              });
              filtersObj[filter.name] = values;
            }
          });
          //console.log('filtersObj', filtersObj);
          this.showcase.filters = filtersObj;
        }

      }
    });
    await modal.present();
  }

  getAddedFiltersLength(filters: any) {
    return Object.keys(filters).length;
  }
  // ? Filter End

  removeSubscriptions() {
    this.events.unsubscribe('showcase:addSuccess');
    this.events.unsubscribe('showcase:addFailure');
    this.events.unsubscribe('showcase:editSuccess');
    this.events.unsubscribe('showcase:editFailure');
    this.events.unsubscribe('product-options:editSuccess');
    this.events.unsubscribe('product-options:editFailure');
    this.events.unsubscribe('showcase:deleteSuccess');
    this.events.unsubscribe('showcase:deleteFailure');
    this.events.unsubscribe('showcase:publishAllCategoriesForAdmin');
    this.events.unsubscribe('showcase:publishgetProductWithId');
    this.events.unsubscribe('product-options:publishOptionData');
    this.events.unsubscribe('product-options:deleteProductOptionSuccess');
    this.events.unsubscribe('brands:publishAllBrandsForAdmin');
    this.events.unsubscribe('brands:noBrandAvailableForAdmin');
    this.events.unsubscribe('showcase:noCategoryAvailable');
    this.events.unsubscribe('vendor:getVendorNameSuccess');
    this.events.unsubscribe('filters:publishActiveStatus');
  }

}
