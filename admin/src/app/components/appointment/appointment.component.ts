import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActionSheetController, AlertController, Events, LoadingController, ModalController, Platform } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { Location } from '@angular/common';
import { ConfigService } from 'src/app/services/config/config.service';
import { LabelService } from 'src/app/services/label/label.service';
import { ProductService } from 'src/app/services/product/product.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { AppointmentScheduleComponent } from '../appointment-schedule/appointment-schedule.component';
import { first } from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { Storage } from '@ionic/storage';
import { SelectFilterPage } from 'src/app/admin/filter-settings/select-filter/select-filter.page';
import { ImageEditorComponent } from 'src/app/components/image-editor/image-editor.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {

  product: Product = {
    prodName: null,
    nameToSearch: null,
    prodDesc: null,
    prodShortDesc: null,
    prodPrice: null,
    status: true,
    createdAt: null,
    updatedAt: null,
    sortedAt: null,
    productType: 'appointment',
    categories: [],
    brands: [],
    images: [],
    isPriceList: false,
    priceList: [],
    gst: null,
    discountedPrice: null,
    searchKeywords: [],
    productCode: '',
    productQty: '',
    stopWhenNoQty: false,
    shippingWeight: null,
    variantType: 'other',
    color: {},
    minQty: null,
    maxQty: null,
    hsnCode: '',
    purchasePrice: null,
    discount: 0,
    subscription: {
      isAllowed: false,
      dailyDiscount: null,
      weeklyDiscount: null,
      monthlyDiscount: null
    },
    retailDiscount: 0,
    retailDiscountType: 'percentage',
    deal: {
      isAllowed: false,
      discount: 0,
      start: {
        date: null,
        time: null
      },
      end: {
        date: null,
        time: null
      },
      specificUsers: {
        active: false,
        users: []
      }
    },
    vendorId: '',
    filters: {},
    metaData: {},
    barcodeNo: null,
    extraCharges: {
      active: false,
      label: '',
      charge: 0,
      chargeAllQty: false
    },
    gstExclusive: false,
    isCod: true,
    priceSlabs: {
      active: false,
      singleSlabs: [],
      variantSlabs: {}
    },
    appointment: {
      schedules: {
        single: {
          schedules: [],
          maxDays: 7
        },
        variant: []
      }
    },
    variantGroups: {
      active: false,
      groups: []
    },
    attributes: {},
    additionalInfo: {
      link: {
        active: false,
        name: '',
        type: 'link',
        value: ''
      },
      showPrice: false,
      sizeChart: {
        active: false,
        name: '',
        img: { url: '' }
      },
      countryOfOrigin: '',
    },
    stockAttributes: {
      expiryDate: '',
      manufacturedDate: '',
      shelfLife: '',
    },
    bundleProducts: {
      active: false,
      title: '',
      maxProducts: 0,
      products: []
    },
    allRegions: {
      active: false,
      regions: []
    },
    templateId: '',
    showSubheading: false,
    instaCoverImage: '',
    instaReelUrl: ''
  };
  imageResponse: any;
  optionsforGallery: any;
  imageURLs: string[] = [];
  listofbase64Image: any = [];
  loader: any;
  editLoader: any;
  coverValue = false;
  editCoverValue = false;
  categories: any;
  selectedCategories: any[] = [];
  selectedBrands: any[] = [];
  devWidth: any;
  firstIteration: boolean = false;
  searchCategory: string = '';
  searchBrand: string = '';
  showNoCategories: boolean = false;
  showCategoriesLoader: boolean = true;
  productId: string = '';
  routeFromCategories: boolean = false;
  keyword: string = '';
  barcode: string = '';
  editProductBarcode: string = '';
  subcategories: any = [];
  selectedSubCategoriesArray = [];
  alreadySelectedSubcats = [];
  listOfSubcategories = {};
  variantsAttributes: any = [];
  variantTypeLoader: boolean = true;
  ckeConfig: any;
  isOptionProduct: boolean = false;
  optionId: string;
  routeFromOptions: boolean = false;
  showEditLoader: boolean = true;
  listOfSubcategoriesInView: any = {};
  tapCount: number = 0;
  taxType: any;
  showNoBrands: boolean = false;
  brands = [];
  metaData:any = {
    pageTitle: "",
    metaDescription: "",
    metaKeywords: ""
  }
  limitedTimeDeal = false;
  minDate = new Date().toISOString();
  multiRegion = false;
  regions = [];
  selectRegionPh: any;
  multiVendor = false;
  vendors = [];
  selectVendorPh: any;
  NEW_PRODUCT_LABELS = {};
  SHARED_LABELS = {};
  subscriptionFeature = false;
  priceForRetail = false;
  needToUpdateImages = false;
  isFilterActive = false;
  filters = null;
  selectFiltersPh: any;
  editProductFiltersKeys = [];
  userRole = ""
  vendorData = []
  vendorName = 'Select Vendor'
  imagesLimit: any;
  // role vendor
  roleVendorId;
  roleVendorData;
  sectionLimit: any
  productSections = []

  // specific users list
  moreUsers = true;

  RFQFeature = false;
  productTypeArr = [];
  sidemenu = []
  selectedId = '0'
  showFooter = true
  isEdit = false
  groupName:any = ''
  groupOptions:any = ''
  variantImageOptions:any = []
  variantGrpSelectOptions: any = {
    header: 'Select Variants',
  };
  currentImage: any = ''
  currentVariants: any = {}

  constructor(private route: ActivatedRoute, private events: Events, private alertController: AlertController, private camera: Camera,
    private actionSheetController: ActionSheetController, private imagePicker: ImagePicker,
    private router: Router, public loadingController: LoadingController,
    private platform: Platform, private modalController: ModalController, private storage: Storage,
    private productService: ProductService, private configService: ConfigService, private angularFirestore: AngularFirestore,
    private labelService: LabelService, private _location: Location, private vendorService: VendorService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.productId = this.router.getCurrentNavigation().extras.state.productId
        this.isEdit = true
      }
    });
  }

  ngOnInit() { }

  async ionViewWillEnter() {
    await this.initializeSubscriptions();
    this.userRole = await this.storage.get('userRole');
    if (this.userRole == 'vendor') {
      this.roleVendorId = await this.storage.get('uid');
      this.roleVendorData = await this.vendorService.getVendorData(this.roleVendorId, 'details');
      if (this.roleVendorData && this.roleVendorData.approveAllProducts) {
        this.product['approved'] = true;
        this.product.status = true;
      } else {
        this.product['approved'] = false;
        this.product.status = false;
      }
      //this.events.publish('vendor:getVendorData', this.roleVendorId);
    }
    this.imagesLimit = this.configService.environment.productImageLimit;
    this.events.publish('product:getAllCategories');
    this.events.publish('brands:getAllBrandsForAdmin');
    this.events.publish('variants:getVariantsTypeData');
    this.devWidth = this.platform.width();
    if (this.productId && !this.isOptionProduct) {
      this.events.publish('product:getProductWithId', this.productId);
      this.events.publish('product:getAllSubCategories');
      this.getSections()
    }
    if (this.productId && this.isOptionProduct) {
      //console.log('opt prd...');
      this.events.publish('product-options:getOptionData', this.productId, this.optionId);
      this.events.publish('product:getAllSubCategories');
    }
    this.taxType = this.configService.environment.taxType;
    this.subscriptionFeature = this.configService.environment.subscriptionFeature;
    this.priceForRetail = this.configService.environment.priceForRetail;
    this.limitedTimeDeal = this.configService.environment.limitedTimeDeal;
    this.multiRegion = this.configService.environment.multiRegion;
    this.multiVendor = this.configService.environment.multiVendor;
    this.selectRegionPh = this.SHARED_LABELS['select_region'];
    this.selectVendorPh = this.SHARED_LABELS['select_vendor'];
    this.selectFiltersPh = this.SHARED_LABELS['select_filters'];
    if (this.multiRegion) {
      this.events.publish('multi-region:getActiveStatus');
      this.events.publish('multi-region:getAllActiveRegions');
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
    this.sidemenu.push('Vendor', 'Filters', 'Variant Groups', 'Seo for Website')
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  async initializeSubscriptions() {
    this.events.subscribe('product:publishgetProductWithId', (data) => {
      if (!data.hasOwnProperty('deal')) {
        data['deal'] = this.product.deal;
      }
      if (data.metaData) {
        this.metaData = data.metaData;
      }
      if (!data.hasOwnProperty('vendorId')) {
        data['vendorId'] = this.product.vendorId;
      }
      if (!data.hasOwnProperty('filters')) {
        data['filters'] = this.product.filters;
      }
      if (!data.hasOwnProperty('extraCharges')) {
        data['extraCharges'] = this.product.extraCharges;
      }
      if (!data.hasOwnProperty('gstExclusive')) {
        data['gstExclusive'] = this.product.gstExclusive;
      }
      if (!data.hasOwnProperty('isCod')) {
        data['isCod'] = this.product.isCod;
      }
      if (!data.hasOwnProperty('priceSlabs')) {
        data['priceSlabs'] = this.product.priceSlabs;
      }
      if (!data.hasOwnProperty('variantGroups')) {
        data['variantGroups'] = this.product.variantGroups;
      }
      this.product = data;
      if (this.product.variantType == 'variant') {
        this.product.variantType = 'other'
      }
      if (!this.product.deal.specificUsers) {
        this.product.deal.specificUsers = this.product.deal.specificUsers;
      }
      this.showEditLoader = false;
      if (this.product.isPriceList){
        this.product.priceList.forEach(variant => {
          if (variant.hasOwnProperty('images') && variant.images.length > 0){
            variant.images.forEach(image => {
              if (!this.currentVariants[this.product.images.findIndex(e => e.mob == image.mob)]){
                this.currentVariants[this.product.images.findIndex(e => e.mob == image.mob)] = []
              }
              this.currentVariants[this.product.images.findIndex(e => e.mob == image.mob)].push(variant.weight)
            });
          }
          else{
            this.currentVariants = []
          }
        });
      }
      this.events.publish('vendor:getVendorName', this.product.vendorId)
    })
    this.events.subscribe('product:addSuccess', (heading, desc) => {
      this.loader.dismiss();
      this.presentAlert(heading, desc, true);
      this.product.prodName = null;
      this.product.prodDesc = null;
      this.product.prodPrice = null;
      this.listofbase64Image = [];
      this.selectedCategories = [];
      this.selectedBrands = [];
    });
    this.events.subscribe('product:addFailure', (heading, desc) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert(heading, desc);
    });
    this.events.subscribe('product:editSuccess', async (heading, desc) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      await this.presentAlert(heading, desc, true);
    });
    this.events.subscribe('product:editFailure', (heading, desc) => {
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
    this.events.subscribe('product:deleteSuccess', (heading, msg) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this._location.back();

    });
    this.events.subscribe('product:deleteFailure', (heading, msg) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert(heading, msg);
    });
    this.events.subscribe('product:publishAllCategoriesForAdmin', async (categories) => {
      // console.log('categories:', categories);
      if (this.loader) {
        this.loader.dismiss();
      }
      if (this.userRole == 'vendor' && this.roleVendorId) {
        let allCategories = categories;
        // console.log('this.roleVendorData.categories:', this.roleVendorData.categories);
        this.categories = allCategories.filter((category) => this.roleVendorData.categories.includes(category.id));
        // console.log('this.categories', this.categories);
      } else {
        this.categories = categories;
      }
      this.showCategoriesLoader = false;
      this.showNoCategories = false;
    });
    this.events.subscribe('product:noCategoryAvailable', () => {
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
    this.events.subscribe('variants:publishVariantsTypeData', (attributes) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.variantsAttributes = attributes;
      this.variantTypeLoader = false;
    });

    this.events.subscribe('product-options:publishOptionData', (option, productOptions) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      if (!option.hasOwnProperty('deal')) {
        option['deal'] = this.product.deal;
      }
      if (option.metaData) {
        this.metaData = option.metaData;
      }
      if (!option.hasOwnProperty('vendorId')) {
        option['vendorId'] = this.product.vendorId;
      }
      if (!option.hasOwnProperty('filters')) {
        option['filters'] = this.product.filters;
      }
      if (!option.hasOwnProperty('extraCharges')) {
        option['extraCharges'] = this.product.extraCharges;
      }
      if (!option.hasOwnProperty('gstExclusive')) {
        option['gstExclusive'] = this.product.gstExclusive;
      }
      if (!option.hasOwnProperty('isCod')) {
        option['isCod'] = this.product.isCod;
      }
      if (!option.hasOwnProperty('priceSlabs')) {
        option['priceSlabs'] = this.product.priceSlabs;
      }
      if (!option.hasOwnProperty('variantGroups')) {
        option['variantGroups'] = this.product.variantGroups;
      }
      this.product = option;
      if (!this.product.deal.specificUsers) {
        this.product.deal.specificUsers = this.product.deal.specificUsers;
      }
      this.showEditLoader = false;
      this.events.publish('vendor:getVendorName', this.product.vendorId)
    });

    this.events.subscribe('product-options:deleteProductOptionSuccess', () => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert('', 'Option Deleted Successfully!', true);
    });

    this.events.subscribe('vendor:publishActiveStatus', (data) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      if (data) {
        this.multiVendor = data.active;
        if (this.multiVendor) {
          this.events.publish('vendor:getAllActiveVendors');
        }
      }
    });

    this.events.subscribe('filters:publishActiveStatus', (data) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      if (data) {
        this.isFilterActive = data.active;
      }
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

    // console.log('product:',this.product);
  }

  removeSubscriptions() {
    this.events.unsubscribe('product:addSuccess');
    this.events.unsubscribe('product:addFailure');
    this.events.unsubscribe('product:editSuccess');
    this.events.unsubscribe('product:editFailure');
    this.events.unsubscribe('product-options:editSuccess');
    this.events.unsubscribe('product-options:editFailure');
    this.events.unsubscribe('product:deleteSuccess');
    this.events.unsubscribe('product:deleteFailure');
    this.events.unsubscribe('product:publishAllCategoriesForAdmin');
    this.events.unsubscribe('product:publishgetProductWithId');
    this.events.unsubscribe('variants:publishVariantsTypeData');
    this.events.unsubscribe('product-options:publishOptionData');
    this.events.unsubscribe('product-options:deleteProductOptionSuccess');
    this.events.unsubscribe('brands:publishAllBrandsForAdmin');
    this.events.unsubscribe('brands:noBrandAvailableForAdmin');
    this.events.unsubscribe('vendor:publishActiveStatus');
    //this.events.unsubscribe('vendor:publishAllVendors');
    this.events.unsubscribe('product:noCategoryAvailable');
    this.events.unsubscribe('filters:publishActiveStatus');
    this.events.unsubscribe('vendor:getVendorNameSuccess');
  }

  priceToggle() {
    this.product.isPriceList = !this.product.isPriceList;
    if (this.product.isPriceList) {
      this.product.priceSlabs.singleSlabs = []
    }
    else {
      this.product.priceSlabs.variantSlabs = []
    }
    if (this.product.isPriceList && this.product.priceList.length === 0) {
      this.product.priceList.push({
        weight: '',
        price: null,
        discountedPrice: null,
        totalQuantity: '',
        shippingWeight: null,
        purchasePrice: null,
        barcode: ''
      });
      //console.log('priceList', this.product.priceList);
    }
  }

  onClickAddMoreInPriceList() {
    this.product.priceList.push({
      weight: '',
      price: null,
      discountedPrice: null,
      totalQuantity: '',
      shippingWeight: null,
      purchasePrice: null,
      barcode: ''
    });
  }

  removeElementFromPriceList(index: number) {
    if (this.product.priceList.length === 1) {
      this.product.isPriceList = false;
      this.product.priceList.splice(index, 1);
    } else {
      this.product.priceList.splice(index, 1);
    }
  }

  async openScheduleComponent() {
    if (!this.product.appointment) {
      this.product['appointment'] = {
        schedules: {
          single: {
            schedules: [],
            maxDays: 7
          },
          variant: []
        }
      }
    }
    const modal = await this.modalController.create({
      component: AppointmentScheduleComponent,
      cssClass: 'custom-modal',
      componentProps: { days: this.product.appointment['schedules']['single']['schedules'], maxDays: this.product.appointment['schedules']['single']['maxDays'] }
    });
    modal.onDidDismiss()
      .then((res) => {
        if (res.data) {
          this.product.appointment['schedules']['single']['schedules'] = res.data[0]
          this.product.appointment['schedules']['single']['maxDays'] = res.data[1]
        }
      });
    await modal.present();
  }

  async openVariantScheduleComponent(i) {
    if (!this.product.appointment) {
      this.product['appointment'] = {
        schedules: {
          single: {
            schedules: [],
            maxDays: 7
          },
          variant: []
        }
      }
    }
    const modal = await this.modalController.create({
      component: AppointmentScheduleComponent,
      cssClass: 'custom-modal',
      componentProps: { variants: this.product.appointment['schedules']['variant'], variantIndex: i }
    });
    modal.onDidDismiss()
      .then((res) => {
        if (res.data) {
          this.product.appointment['schedules']['variant'][i] =
          {
            name: this.product.priceList[i].weight,
            schedules: res.data[0],
            maxDays: res.data[1]
          }
        }
      });
    await modal.present();
  }

  async getSections() {
    try {
      let sections: any = await this.angularFirestore.collection('products').doc(this.productId).collection('sections')
        .doc('productWidgets').valueChanges().pipe(first()).toPromise();
      if (sections && sections.sections) {
        this.productSections = sections.sections;
      }
    } catch (error) {
      console.log(error);
    }
  }

  changeComponent(index) {
    let prevMsgDiv = document.getElementById(this.selectedId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById(index.toString());
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.selectedId = index.toString()
  }

  async addProduct() {
    if (!this.product.productType || this.product.productType != 'appointment') {
      this.product.productType = 'appointment'
    }
    if (this.isEdit == false) {
      if (this.product.deal.specificUsers.active) {
        for (const user of this.product.deal.specificUsers.users) {
          if (user.discount == null) {
            this.presentAlert('', `Discount field cannot be empty for ${user.name} under UserList in Advance Tab`);
            return;
          } else if (user.discount < 0 || user.discount > 100) {
            this.presentAlert('', `Please provide a valid Discount field for ${user.name} under UserList in Advance Tab`);
            return;
          }
        }
      }
      for (let i = 0; i < this.listofbase64Image.length; i++) {
        if (this.listofbase64Image[i].cover === true) {
          this.coverValue = true;
          break;
        } else {
          this.coverValue = false;
        }
      }
      let priceListCheck: boolean = false;
      if (this.product.isPriceList) {
        let dpList = [];
        let plDiscountList = [];
        for (let index = 0; index < this.product.priceList.length; index++) {
          if (this.product.priceList[index].discountedPrice === null) {
            this.product.priceList[index].discountedPrice = this.product.priceList[index].price;
          }
          dpList.push(this.product.priceList[index].discountedPrice);
          const plDiscount = ((this.product.priceList[index].price - this.product.priceList[index].discountedPrice) / this.product.priceList[index].price) * 100;
          plDiscountList.push(plDiscount);
          if (this.product.priceList[index].weight === '' || this.product.priceList[index].price === null) {
            priceListCheck = true;
            break;
          }
        }
        this.product.discountedPrice = Math.min(...dpList);
        this.product.discount = parseFloat((Math.max(...plDiscountList)).toFixed(2));
      } else {
        if (this.product.discountedPrice === null) {
          this.product.discountedPrice = this.product.prodPrice;
        }
        this.product.discount = parseFloat((((this.product.prodPrice - this.product.discountedPrice) / this.product.prodPrice) * 100).toFixed(2));
      }

      if (this.product.prodName === null || this.product.prodName === '') {
        this.presentAlert('', 'Please enter product name');
      } else if (!this.product.isPriceList && !this.product.prodPrice) {
        this.presentAlert('', 'Please enter product price');
      } else if ((this.product.isPriceList && priceListCheck) || (this.product.isPriceList && !this.product.priceList.length)) {
        this.presentAlert('', 'Please enter all variants data of product');
      } else if (this.product.prodDesc === null || this.product.prodDesc === '') {
        this.presentAlert('', 'Please enter product description');
      } else if (!this.product.categories.length && !this.product.brands.length) {
        this.presentAlert('', 'Please select any category or brand');
      } else if (this.listofbase64Image.length !== 0 && this.coverValue === false) {
        this.presentAlert('', 'Please make any one image as cover picture');
      } else if (this.product.gst && this.product.gst > 100) {
        this.presentAlert('', `${this.taxType} value must be less than 100`);
      }
      else {
        await this.presentLoading();
        this.product.createdAt = new Date();
        this.product.updatedAt = new Date();
        this.product.sortedAt = new Date();
        this.product.categories = this.selectedCategories;
        this.product.brands = this.selectedBrands;
        this.product.nameToSearch = this.product.prodName.toLowerCase();
        if (this.product.variantType === 'other') {
          this.product.variantType = 'variant';
        }
        this.product.metaData = this.metaData;
        if (this.userRole === 'vendor') {
          this.product.vendorId = await this.storage.get('uid')
        }
        if (!this.product.prodPrice) {
          this.product.prodPrice = null
        }
        this.events.publish('product:addProduct', this.product, this.listofbase64Image, this.barcode);
      }
    }
    else {
      if (this.product.deal.specificUsers && this.product.deal.specificUsers.active) {
        for (const user of this.product.deal.specificUsers.users) {
          if (user.discount == null) {
            this.presentAlert('', `Discount field cannot be empty for ${user.name} under UserList in Advance Tab`);
            return;
          } else if (user.discount < 0 || user.discount > 100) {
            this.presentAlert('', `Please provide a valid Discount field for ${user.name} under UserList in Advance Tab`);
            return;
          }
        }
      }
      if (this.product['coverPic'] && this.product['coverPic'].url === null) {
        this.editCoverValue = false;
      } else {
        this.editCoverValue = true;
      }
      for (let i = 0; i < this.listofbase64Image.length; i++) {
        if (this.listofbase64Image[i].cover === true) {
          this.coverValue = true;
          break;
        } else {
          this.coverValue = false;
        }
      }
      // console.log('this.listofbase64Image',this.listofbase64Image);
      let priceListCheck: boolean = false;
      if (this.product.isPriceList) {
        let dpList = [];
        let plDiscountList = [];
        for (let index = 0; index < this.product.priceList.length; index++) {
          if (this.product.priceList[index].discountedPrice === null) {
            this.product.priceList[index].discountedPrice = this.product.priceList[index].price;
          }
          dpList.push(this.product.priceList[index].discountedPrice);
          const plDiscount = ((this.product.priceList[index].price - this.product.priceList[index].discountedPrice) / this.product.priceList[index].price) * 100;
          plDiscountList.push(plDiscount);
          if (this.product.priceList[index].weight === '' || this.product.priceList[index].price === null) {
            priceListCheck = true;
            break;
          }
        }
        //console.log('priceListCheck', priceListCheck);
        this.product.discountedPrice = Math.min(...dpList);
        this.product.discount = parseFloat((Math.max(...plDiscountList)).toFixed(2));
      } else {
        if (this.product.discountedPrice === null) {
          this.product.discountedPrice = this.product.prodPrice;
        }
        this.product.discount = parseFloat((((this.product.prodPrice - this.product.discountedPrice) / this.product.prodPrice) * 100).toFixed(2));
      }
      console.log()
      if (this.product.prodName === null || this.product.prodName === '') {
        this.presentAlert('', 'Please enter product name');
      } else if (!this.product.isPriceList && !this.product.prodPrice) {
        this.presentAlert('', 'Please enter product price');
      } else if ((this.product.isPriceList && priceListCheck) || (this.product.isPriceList && !this.product.priceList.length)) {
        this.presentAlert('', 'Please enter all variants data of product');
      } else if (this.product.prodDesc === null || this.product.prodDesc === '') {
        this.presentAlert('', 'Please enter product description');
      } else if (!this.product.categories.length && !this.product.brands.length) {
        this.presentAlert('', 'Please select any category or brand');
      } else if (this.product.images.length !== 0 && this.listofbase64Image.length !== 0 && this.coverValue === false && this.editCoverValue === false) {
        this.presentAlert('', 'Please make any one image as cover picture');
      } else if (this.product.gst && this.product.gst > 100) {
        this.presentAlert('', `${this.taxType} value must be less than 100`);
      }
      else {
        await this.presentLoading()
        this.product.updatedAt = new Date();
        this.product.nameToSearch = this.product.prodName.toLowerCase();
        this.product.discountedPrice = this.product.discountedPrice ? this.product.discountedPrice : null;
        this.product.productCode = this.product.productCode ? this.product.productCode : '';
        this.product.productQty = this.product.productQty ? this.product.productQty : '';
        this.product.stopWhenNoQty = this.product.stopWhenNoQty ? this.product.stopWhenNoQty : false;
        this.product.shippingWeight = this.product.shippingWeight ? this.product.shippingWeight : null;
        this.product.variantType = this.product.variantType ? this.product.variantType : '';
        this.product.color = this.product.color ? this.product.color : {};
        this.product.minQty = this.product.minQty ? this.product.minQty : null;
        this.product.maxQty = this.product.maxQty ? this.product.maxQty : null;
        this.product.gst = this.product.gst ? this.product.gst : null;
        this.product.hsnCode = this.product.hsnCode ? this.product.hsnCode : '';
        this.product.purchasePrice = this.product.purchasePrice ? this.product.purchasePrice : null;
        if (this.product.variantType === 'other') {
          this.product.variantType = 'variant';
        }
        this.product.metaData = this.metaData;
        if (!this.product.prodPrice) {
          this.product.prodPrice = null
        }
        if (!this.product.deal.specificUsers) {
          this.product.deal.specificUsers = {
            active: false,
            users: []
          }
        }
        // Dont remove, change to date time field
        // let startBlock:any = this.product.deal.start.time.split(":")
        // let endBlock:any = this.product.deal.end.time.split(":")
        // let timeStart = ((startBlock[0]%12+12*Number((startBlock[0]%12==0)))+":"+startBlock[1], startBlock[0] >= 12) ? 'PM' : 'AM'
        // let timeEnd = ((endBlock[0]%12+12*Number((endBlock[0]%12==0)))+":"+endBlock[1], endBlock[0] >= 12) ? 'PM' : 'AM'
        // if (this.product.deal){
        //   this.product.deal.start.date = moment(this.product.deal.start.date).format()
        //   this.product.deal.start.time = this.product.deal.start.time+ ' ' + timeStart
        //   this.product.deal.end.date = moment(this.product.deal.end.date).format()
        //   this.product.deal.end.time = this.product.deal.end.time+ ' ' + timeEnd
        // }
        if (!this.isOptionProduct) {
          this.events.publish('product:editProduct', this.product, this.productId, this.listofbase64Image, this.editProductBarcode, this.needToUpdateImages);
        } else {
          this.events.publish('product-options:editProductOption', this.product, this.productId, this.optionId, this.listofbase64Image, this.editProductBarcode, this.needToUpdateImages);
        }
      }
    }
  }

  onClickCategoryCheckBox(cid: string) {
    if (this.product.categories.indexOf(cid) === -1) {
      this.product.categories.push(cid);
    } else {
      const cidIndex = this.product.categories.indexOf(cid);
      this.product.categories.splice(cidIndex, 1);
    }
  }

  onClickBrandCheckBox(bid: string) {
    if (this.product.brands) {
      if (this.product.brands.indexOf(bid) === -1) {
        this.product.brands.push(bid);
      } else {
        const bidIndex = this.product.brands.indexOf(bid);
        this.product.brands.splice(bidIndex, 1);
      }
    }
    else {
      this.product.brands = []
      this.product.brands.push(bid);
    }
    //console.log('selectedBrands', this.selectedBrands);
  }

  updateNewProductStatus() {
    if (this.product.status === true) {
      this.product.status = false;
    } else {
      this.product.status = true;
    }
  }

  async getSubcategories(cid) {
    if (!this.listOfSubcategories.hasOwnProperty(cid)) {
      let subcategories = []
      subcategories = await this.productService.getSubcategoriesInNewProduct(cid);
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

  newProductCoverPic(index) {
    for (let i = 0; i < this.listofbase64Image.length; i++) {
      if (i === index) {
        this.listofbase64Image[index].cover = true;
      } else {
        this.listofbase64Image[i].cover = false;
      }
    }
  }

  onClickEditImage(img: any) {
    let imgZoomUrls = [];
    let imgurl = { url: img };
    for (const img of this.listofbase64Image) {
      imgZoomUrls.push({ url: img.base64Img });
    }
    for (const img of this.product.images) {
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

  removeImage(index) {
    this.listofbase64Image.splice(index, 1);
  }

  addVendor(e, type) {
    this.product.vendorId = e.target.value;
  }

  getAddedFiltersLength(filters) {
    return Object.keys(filters).length;
  }

  async addFilters(type) {

    const modal = await this.modalController.create({
      component: SelectFilterPage,
      componentProps: { addedFilters: this.product.filters }
    });

    modal.onDidDismiss().then((res: any) => {
      if (res.data) {
        const addedFilters = res.data.addedFilters;
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
          this.product.filters = filtersObj;
        }
      }
    });
    await modal.present();
  }

  async onDrop(files: FileList) {
    let message = 'Sorry, total' + ' ' + this.imagesLimit.toString() + ' ' + 'images allowed'
    if (this.listofbase64Image && !this.product && (this.listofbase64Image.length == this.imagesLimit)) {
      //console.log('here1')
      this.presentAlert('Upload failed', message)
    }
    else if (this.product && this.product.images && (this.product.images.length == this.imagesLimit)) {
      //console.log('here2')
      this.presentAlert('Upload failed', message)
    }
    else if (this.listofbase64Image.length && this.product && this.product.images && (this.listofbase64Image.length + this.product.images.length == this.imagesLimit)) {
      //console.log('here3')
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
        if(res.data) {
          for (let i = 0; i < res.data.length; i++) {
            let size = this.calculateImageSize(res.data[i] || '')
            this.listofbase64Image.push({ base64Img: res.data[i] || '', cover: false, size: size });
          }
        }
        // let size = this.calculateImageSize(res.data || '')
        // this.listofbase64Image.push({ base64Img: res.data || '', cover: false, size: size });
      })
      //console.log('here4')
      // for (let i = 0; i < files.length; i++) {
      //   let reader = new FileReader();
      //   reader.readAsDataURL(files.item(i))
      //   reader.onload = (event: any) => { // called once readAsDataURL is completed
      //     let base64Image: any = event.target.result;
      //     let base64Str = base64Image.split(',');
      //     let size = this.calculateImageSize(base64Str[1]);
      //     // console.log('size:', size);
      //     this.listofbase64Image.push({ base64Img: base64Image, cover: false, size: size });
      //   }
      // }
    }
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
    if (!this.optionId) {
      this.events.publish('product:deleteProduct', this.productId);
    } else {
      this.events.publish('product-options:deleteProductOption', this.optionId, this.productId);
    }
  }

  checkBoxValue(id: string) {
    if (this.product.categories && this.product.categories.length && this.product.categories.indexOf(id) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  brandCheckBoxValue(id: string) {
    if (this.product.brands && this.product.brands.length && this.product.brands.indexOf(id) !== -1) {
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

  switchNormal() {
    const navigationExtras: NavigationExtras = {
      state: {
        productId: this.productId,
        routeFromAppointment: 'true'
      }
    };
    this.router.navigate(['new-product'], navigationExtras);
  }

  activeVariantGroups() {
    this.product.variantGroups.active = !this.product.variantGroups.active
  }

  activeVariantGroupsEdit() {
    if (this.product.variantGroups) {
      this.product.variantGroups.active = !this.product.variantGroups.active
    }
  }


  async enterVariantGroupsData() {
    let groupData = {
      name: this.groupName,
      variants: this.groupOptions
    }
    this.product.variantGroups.groups.push(groupData)
  }

  deleteVariantGroup(index) {
    this.product.variantGroups.groups.splice(index, 1)
  }

  onClickImage(img: any) {
    let imgZoomUrls = [];
    for(const img of this.listofbase64Image) {
      imgZoomUrls.push({url: img.base64Img});
    }
    let imgIndex = this.listofbase64Image.indexOf(img);
    this.modalController.create({
      component: ImageModalPage,
      cssClass:'photo-modal-class',
      componentProps: {
        imgs: imgZoomUrls,
        index: imgIndex
      }
    }).then(modal => modal.present());
  }

  removeImageInData(index, url) {
    //console.log('in removeEditImageInData', index);
    if (this.currentVariants[index]){
      this.currentVariants[index].forEach(weight => {
        let index = this.product.priceList.findIndex(e => e.weight == weight);
        let imageIndex = this.product.priceList[index].images.findIndex(e => e.url == url)
        this.product.priceList[index].images.splice(imageIndex,1)
      });
    }
    this.currentVariants[index] = []
    this.product.images.splice(index, 1);
    if (url === this.product['coverPic'].url) {
      this.product['coverPic'] = {imageId: null, url: null};
    }
    this.needToUpdateImages = true;
  }

  editProductCoverPicInData(index) {
    const editImgData = this.product.images[index];
    this.product['coverPic'] = editImgData;
    for (let i = 0; this.listofbase64Image.length; i++) {
      this.listofbase64Image[i].cover = false;
    }
  }

  imagesReorder(event){
    let v = this.currentVariants[event.detail.from];
    this.currentVariants[event.detail.from] = this.currentVariants[event.detail.to];
    this.currentVariants[event.detail.to] = v;
    let b = this.product.images[event.detail.from];
    this.product.images[event.detail.from] = this.product.images[event.detail.to];
    this.product.images[event.detail.to] = b;
    this.needToUpdateImages = true;
    event.detail.complete();
  }

  saveVariantImage(image){
    this.currentImage = image
  }

  onChangeVariantImage(event, i){
    let imageObj:any = {
      mob: this.currentImage.mob,
      thumb: this.currentImage.thumb,
      url: this.currentImage.url
    }

    if (this.currentVariants[i]){
      //removing unselected variants
      let removeArray = this.currentVariants[i].filter(x => !event.target.value.includes(x))
      removeArray.forEach(weight => {
        let index = this.product.priceList.findIndex(e => e.weight == weight);
        let imageIndex = this.product.priceList[index].images.findIndex(e => e.mob == imageObj.mob)
        this.product.priceList[index].images.splice(imageIndex,1)
      });
  
      //adding new selected variants
      let addArray = event.target.value.filter(x => !this.currentVariants[i].includes(x))
      addArray.forEach(weight => {
        let index = this.product.priceList.findIndex(e => e.weight == weight);
        if (!this.product.priceList[index].images){
          this.product.priceList[index].images = []
        }
        this.product.priceList[index].images.push(imageObj)
      });
    }

    else {
      event.target.value.forEach(weight => {
        let index = this.product.priceList.findIndex(e => e.weight == weight);
        if (!this.product.priceList[index].images){
          this.product.priceList[index].images = []
        }
        this.product.priceList[index].images.push(imageObj)
      });
    }
  }

  async presentAlert(heading?: any, desc?: any, action?: boolean) {
    const alert = await this.alertController.create({
      header: heading,
      message: desc,
      buttons: [{
        text: 'Ok',
        handler: () => {
          if (action == true) {
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



}
