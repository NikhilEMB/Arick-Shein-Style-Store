import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Events, AlertController, ActionSheetController, LoadingController, Platform, ModalController, IonContent } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { Storage } from '@ionic/storage';
import { ProductService } from 'src/app/services/product/product.service';
import { ColorsModalPage } from '../../variants/colors-modal/colors-modal.page';
import { TemplatesModalPage } from '../../variants/templates-modal/templates-modal.page';
import { ConfigService } from 'src/app/services/config/config.service';
import { LabelService } from 'src/app/services/label/label.service';
import { SelectFilterPage } from 'src/app/admin/filter-settings/select-filter/select-filter.page';
import { Location } from '@angular/common';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { ProductSectionPage } from 'src/app/admin/admin-shop/new-product/product-section/product-section.page'
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { UsersModalPage } from '../../users-modal/users-modal.page';
import { ImageEditorComponent } from 'src/app/components/image-editor/image-editor.component';
import { AttributesService } from 'src/app/services/attributes/attributes.service';
import { WidgetsService } from 'src/app/services/widgets/widgets.service';
import { ProductsModalPage } from '../../products-modal/products-modal.page';
import { MultiRegionService } from 'src/app/services/multi-region/multi-region.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {
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
    productType: '',
    categories: null,
    brands: null,
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
      showPrice: true,
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
  optionsforCamera: CameraOptions;
  imageResponse: any;
  optionsforGallery: any;
  imageURLs: string[] = [];
  listofbase64Image: any = [];
  editproductData: any;
  loader: any;
  editLoader: any;
  coverValue = false;
  editCoverValue = false;
  categories: any;
  selectedCategories: any[] = [];
  selectedBrands: any[] = [];
  devWidth: any;
  firstIteration: boolean = false;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  searchCategory: string = '';
  searchBrand: string = '';
  showNoCategories: boolean = false;
  showCategoriesLoader: boolean = true;
  editproductId: string = '';
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
  metaData = {
    pageTitle: "",
    metaDescription: "",
    metaKeywords: ""
  }
  limitedTimeDeal = false;
  minDate = new Date().toISOString();
  multiRegion = false;
  multiRegionData = [];
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
  sideMenu = []
  // selectedId = '0'
  selectedId = 'Barcode / Qr Code'
  showFooter = true
  fromAppointment = false
  groupName: any = ''
  groupOptions: any = ''
  variantImageOptions: any = []
  variantGrpSelectOptions: any = {
    header: 'Select Variants',
  };
  currentImage: any = ''
  currentVariants: any = {}

  attributesKey: any = [];
  attributesData: any = {};
  currencyCode: any;

  forms;
  subValues: any;
  currentDate = new Date();
  manufacturedDate: any = '';
  expiryDate: any = '';
  templatesArray: any;
  isUniversal = false;
  subOfSubCategories = {};
  subOfSubCategoryToggle = {};

  allRegions = {
    active: false,
    regions: []
  }
  customWidthVal: any = 4;
  customHeightVal: any = 3;

  video = {
    active: true,
    link: '',
    thumbnail: ''
  }

  constructor(
    private route: ActivatedRoute,
    private events: Events,
    private alertController: AlertController,
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private imagePicker: ImagePicker,
    private router: Router,
    public loadingController: LoadingController,
    private platform: Platform,
    private modalController: ModalController,
    private storage: Storage,
    private productService: ProductService,
    private configService: ConfigService,
    private angularFirestore: AngularFirestore,
    private labelService: LabelService,
    private _location: Location,
    private vendorService: VendorService,
    private attributeService: AttributesService,
    private widgetService: WidgetsService,
    private multiRegionService: MultiRegionService,
    public sharedService: SharedService,
    private categoryService: CategoriesService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.editproductId = this.router.getCurrentNavigation().extras.state.productId;
        this.routeFromCategories = this.router.getCurrentNavigation().extras.state.routeFromCategories;
        this.routeFromOptions = this.router.getCurrentNavigation().extras.state.routeFromOptions;
        this.isOptionProduct = this.router.getCurrentNavigation().extras.state.isOptionProduct;
        if (this.isOptionProduct) {
          this.optionId = this.router.getCurrentNavigation().extras.state.optionId;
        }
        if (this.router.getCurrentNavigation().extras.state.routeFromAppointment) {
          this.fromAppointment = this.router.getCurrentNavigation().extras.state.routeFromAppointment
        }
        let type = this.router.getCurrentNavigation().extras.state.type
        if (type) {
          if (type == 'variant') {
            this.priceToggle()
          }
          if (type == 'quotation') {
            this.product.productType = 'quotation'
          }
        }
      }
    });
  }

  ngOnInit() {
    this.sectionLimit = this.configService.environment.productSectionsLimit;
    this.RFQFeature = this.configService.environment.RFQFeature;
    let appointmentFeature = this.configService.environment.appointmentFeature;
    this.currencyCode = this.configService.environment.currencyCode;
    this.isUniversal = this.sharedService.isUniversal();
    this.productTypeArr.push('single', 'variant');
    if (this.RFQFeature) {
      this.productTypeArr.push('quotation');
    }
    if (appointmentFeature) {
      this.productTypeArr.push('appointment');
    }
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.ckeConfig = {
      allowedContent: true,
      height: 200
    }
  }

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
    this.multiRegion = this.configService.environment.multiRegion;
    if (this.multiRegion) {
      this.events.publish('multi-region:getActiveStatus');
      this.events.publish('multi-region:getAllActiveRegions');

      this.multiRegionData = await this.multiRegionService.getAllActiveRegions('service');
      console.log('multiRegionData:', this.multiRegionData);

      // Creating and Updating Region
      if (!this.editproductId) {
        if (this.allRegions.regions.length == 0) {
          this.createDefaultRegion();
        } else {
          this.updateRegion();
        }
      }
    }
    if (this.editproductId && !this.isOptionProduct) {
      this.events.publish('product:getProductWithId', this.editproductId);
      this.events.publish('product:getAllSubCategories');
      this.getSections()
    }
    if (this.editproductId && this.isOptionProduct) {
      //console.log('opt prd...');
      this.events.publish('product-options:getOptionData', this.editproductId, this.optionId);
      this.events.publish('product:getAllSubCategories');
    }
    this.taxType = this.configService.environment.taxType;
    this.subscriptionFeature = this.configService.environment.subscriptionFeature;
    this.priceForRetail = this.configService.environment.priceForRetail;
    this.limitedTimeDeal = this.configService.environment.limitedTimeDeal;
    this.multiVendor = this.configService.environment.multiVendor;
    this.selectRegionPh = this.SHARED_LABELS['select_region'];
    this.selectVendorPh = this.SHARED_LABELS['select_vendor'];
    this.selectFiltersPh = this.SHARED_LABELS['select_filters'];
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
    // this.sideMenu.push(
    //   'Add on',
    //   'Cash on Delivery',
    //   'Price Slabs',
    //   'Extra Charges',
    //   'Colors',
    //   'Vendor',
    //   'Filters',
    //   'Subscription',
    //   'Wholesale Price',
    //   'Limited Time Deal',
    //   'Specific User Discount',
    //   'Barcode / Qr Code',
    //   'Variant Groups',
    //   'Seo for Website',
    //   'Attributes',
    //   'Variant Chart',
    //   'Clone Product',
    //   'Custom Action',
    //   'Stock Attributes',
    //   'Bundle Products',
    //   'Regions',
    //   'Slug'
    // );
    this.sideMenu.push(
      'Barcode / Qr Code',
      'Seo for Website',
      'Slug',
      'video',
      'Filters',
      'Variant Chart',
    );

    let res: any = await this.attributeService.getProductAttributes();
    //console.log('res:', res);
    if (res) {
      this.attributesKey = res.attributes;
      this.subValues = res.subValues;
      for (const attribute of this.attributesKey) {
        let value = "";
        if (this.editproductData && "attributes" in this.editproductData) {
          value = this.editproductData.attributes[attribute] || "";
        }
        this.attributesData[attribute] = value;
      }

      // for(let i = 0; i<this.attributesKey.length; i++){
      //   let value = "";
      //   if(this.editproductData && "attributes" in this.editproductData){
      //     value = this.editproductData.attributes[this.attributesKey[i]] || "";
      //   }
      //   this.attributesData[this.attributesKey[i]] = value;
      // }
      //console.log('attributes:', this.attributesData);
    }
    const forms: any = await this.widgetService.getWidgetsList('form', 'service');
    if (forms && forms.length) {
      this.forms = forms;
    }
  }

  createDefaultRegion() {
    console.log("Default Region Created");

    for (let region of this.multiRegionData) {
      this.allRegions.regions.push(this.returnRegionObj(region));
    }

    console.log("allRegions", this.allRegions);
  }

  returnRegionObj(region: any) {
    // * if variant is true
    const data = this.editproductId ? this.editproductData : this.product;
    // console.log('region', region);
    // console.log('data.priceList', data.priceList);
    if (data.isPriceList) {
      const variants = [];
      if (data.priceList && data.priceList.length) {
        data.priceList.forEach((priceList) => {
          let variantIndex = -1;
          if (region && region.variants) {
            variantIndex = region.variants.findIndex((variant) => variant.weight === priceList.weight);
          }
          variants.push({
            weight: priceList.weight || null,
            price: variantIndex !== -1 ? region.variants[variantIndex].price : priceList.price,
            discountedPrice: variantIndex !== -1 ? region.variants[variantIndex].discountedPrice : priceList.discountedPrice,
            // qty: variantIndex !== -1 ? region.variants[variantIndex].qty : parseInt(priceList.totalQuantity),
          });
        })
      }
      return {
        name: region.name,
        id: region.id,
        active: 'active' in region ? region.active : false,
        variants
      }
    }
    // * if variant is false
    else {
      return {
        name: region.name,
        id: region.id,
        active: 'active' in region ? region.active : false,
        price: region.price || null,
        discountedPrice: region.discountedPrice || null,
        // qty: region.productQty ? parseInt(region.productQty) : null,
      }
    }
  }

  updateRegion() {
    // console.log('this.allRegions', this.allRegions);
    if (this.allRegions) {
      for (let i = 0; i < this.allRegions.regions.length; i++) {
        this.allRegions.regions[i] = this.returnRegionObj(this.allRegions.regions[i]);
      }
    }
    // console.log('this.allRegions.regions', this.allRegions.regions);
    // * Check if new region added
    let newRegions = this.multiRegionData.filter(newRegion =>
      !this.allRegions.regions.find(region => newRegion.id == region.id)
    );

    // * Check if any region deleted
    let removeRegions = this.allRegions.regions.filter(oldRegion =>
      !this.multiRegionData.find(region2 => oldRegion.id == region2.id)
    );
    // * Add new region if any update
    if (newRegions.length > 0) {
      // console.log('new region:', newRegions);
      for (let newRegion of newRegions) {
        this.allRegions.regions.push(
          this.returnRegionObj(newRegion)
        )
      }
    }
    // * Delete region if any removed
    if (removeRegions.length > 0) {
      // console.log('update region:', removeRegions);
      for (let region of removeRegions) {
        let index = this.allRegions.regions.findIndex(oldRegion => oldRegion.id == region.id);
        console.log('name:', index);
        this.allRegions.regions.splice(index, 1);
      }
    }
  }

  toggleRegion(index: number) {
    this.allRegions.regions[index].active = !this.allRegions.regions[index].active;
  }

  getTimeStamp(value: any, type: any) {
    let timeStamp: any = '';
    // console.log('valueTime:',typeof value, value);
    if (value !== '') {
      timeStamp = new Date(value);
    }
    if (type == 'expiry') {
      this.expiryDate = timeStamp;
      console.log('ex:', this.expiryDate);
    }
    else {
      this.manufacturedDate = timeStamp
      console.log('mx:', this.manufacturedDate);
    }
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  setVariantImages() {
    console.log('currentVariants before:', this.currentVariants);
    if (this.editproductData.isPriceList) {
      for (const variant of this.editproductData.priceList) {
        if (variant.hasOwnProperty('images') && variant.images.length > 0) {
          for (const image of variant.images) {
            if (!this.currentVariants[this.editproductData.images.findIndex(e => e.mob == image.mob)]) {
              this.currentVariants[this.editproductData.images.findIndex(e => e.mob == image.mob)] = []
            } else {
              this.currentVariants[this.editproductData.images.findIndex(e => e.mob == image.mob)].push(variant.weight)
            }
          }
          console.log('currentVariants:', this.currentVariants);
        }
        // else {
        //   this.currentVariants = []
        // }
      }
    }
  }
  async initializeSubscriptions() {
    // this.events.subscribe('vendor:getVendorDataSuccess', (vendorData)=>{
    //   this.roleVendorData = vendorData;
    //   if(this.userRole == 'vendor'){
    //     if (this.roleVendorData && this.roleVendorData.approveAllProducts) {
    //       this.product['approved'] = true;
    //       this.product.status = true;
    //     } else {
    //       this.product['approved'] = false;
    //       this.product.status = false;
    //     }
    //   }
    // });
    this.events.subscribe('product:publishgetProductWithId', (data) => {
      data = this.getUpdatedFields(data);
      this.editproductData = data;

      if (this.editproductData.productType == "") {
        if (this.editproductData.isPriceList == true) {
          this.editproductData.productType = 'variant';
          // console.log('prodType variant');      
        }
        else {
          this.editproductData.productType = 'single';
          // console.log('prodType single');      
        }
      }

      if (this.editproductData.variantType == 'variant') {
        this.editproductData.variantType = 'other'
      }
      if (!this.editproductData.deal.specificUsers) {
        this.editproductData.deal.specificUsers = this.product.deal.specificUsers;
      }
      if (!(this.editproductData.additionalInfo && this.editproductData.additionalInfo.sizeChart)) {
        this.editproductData.additionalInfo = this.product.additionalInfo;
      }
      if (!(this.editproductData.additionalInfo && this.editproductData.additionalInfo.link)) {
        this.editproductData.additionalInfo.link = this.product.additionalInfo.link;
      }
      this.barcode = this.editproductData.barcode ? this.editproductData.barcode : '';
      this.editproductData.showSubheading = 'showSubheading' in this.editproductData ? this.editproductData.showSubheading : false;
      this.showEditLoader = false;
      if (this.fromAppointment) {
        // this.editproductData['productType'] = '';
        if (this.editproductData.productType == 'appointment') {
          if (this.editproductData.isPriceList == true) {
            this.editproductData.productType = 'variant';
          }
          else {
            this.editproductData.productType = 'single';
          }
        }
      }
      if (this.editproductData.stockAttributes) {
        this.expiryDate = this.editproductData.stockAttributes.expiryDate ? this.editproductData.stockAttributes.expiryDate.toDate() : '';
        this.manufacturedDate = this.editproductData.stockAttributes.manufacturedDate ? this.editproductData.stockAttributes.manufacturedDate.toDate() : '';
        this.editproductData.stockAttributes.shelfLife = this.editproductData.stockAttributes.shelfLife ? this.editproductData.stockAttributes.shelfLife : '';
        console.log("get:", this.expiryDate, this.manufacturedDate);
      } else {
        this.editproductData.stockAttributes = this.editproductData.stockAttributes ? this.editproductData.stockAttributes : this.product.stockAttributes;
      }
      this.editproductData.bundleProducts = 'bundleProducts' in this.editproductData ? this.editproductData.bundleProducts : this.product.bundleProducts;
      // console.log('get',this.editproductData);
      this.allRegions = 'allRegions' in this.editproductData ? this.editproductData.allRegions : this.allRegions;
      this.product.templateId = this.editproductData.templateId || '';
      this.video = 'video' in this.editproductData ? this.editproductData.video : this.video;
      if (this.allRegions.regions.length == 0) {
        this.createDefaultRegion();
      }
      this.updateRegion();
      this.setVariantImages();
      console.log('this.currentVariants outside loop', this.currentVariants)
      this.events.publish('vendor:getVendorName', this.editproductData.vendorId)
      console.log("editProduct:", this.editproductData);
    })
    this.events.subscribe('product:addSuccess', (heading, desc) => {
      this.events.publish('product:getProductsForAdminProducts');
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
      option = this.getUpdatedFields(option);

      this.editproductData = option;
      if (!this.editproductData.deal.specificUsers) {
        this.editproductData.deal.specificUsers = this.product.deal.specificUsers;
      }
      this.barcode = this.editproductData.barcode ? this.editproductData.barcode : '';
      this.showEditLoader = false;
      if (this.fromAppointment) {
        // this.editproductData['productType'] = '';
        if (this.editproductData.productType == 'appointment') {
          if (this.editproductData.isPriceList == true) {
            this.editproductData.productType = 'variant';
          }
          else {
            this.editproductData.productType = 'single';
          }
        }
      }
      if (this.editproductData.stockAttributes) {
        this.expiryDate = this.editproductData.stockAttributes.expiryDate ? this.editproductData.stockAttributes.expiryDate.toDate() : '';
        this.manufacturedDate = this.editproductData.stockAttributes.manufacturedDate ? this.editproductData.stockAttributes.manufacturedDate.toDate() : '';
        this.editproductData.stockAttributes.shelfLife = this.editproductData.stockAttributes.shelfLife ? this.editproductData.stockAttributes.shelfLife : '';
        console.log("get:", this.expiryDate, this.manufacturedDate);
      } else {
        this.editproductData.stockAttributes = this.editproductData.stockAttributes ? this.editproductData.stockAttributes : this.product.stockAttributes;
      }
      this.events.publish('vendor:getVendorName', this.editproductData.vendorId)

      console.log("editProduct option:", this.editproductData);
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

    // this.events.subscribe('vendor:publishAllVendors', (vendors) => {
    //   if (this.loader){
    //     this.loader.dismiss();
    //   }
    //   if(vendors.length) {
    //     this.vendors = vendors;
    //   } else {
    //     this.multiVendor = false;
    //   }
    // });

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

    // console.log('editproductData:',this.editproductData);

    let res = await this.productService.getTemplates();
    if (res) {
      this.templatesArray = res;
      console.log(this.templatesArray);
    }
  }

  // showDisable(){
  //   console.log('userRole:', this.userRole);
  //   if (this.userRole == 'vendor') {
  //     console.log('this.roleVendorData:'), this.roleVendorData;
  //     if (this.roleVendorData && this.roleVendorData.approveAllProducts) {
  //       console.log('inside');
  //       return false;
  //     } else{ 
  //       return true;
  //     }
  //   } else{ 
  //     return false;
  //   } 
  // }

  changeTemplate(value: string) {
    console.log(value);
    this.product.templateId = value;
  }

  editShowDisable() {
    if (this.userRole == 'vendor') {
      if (this.editproductData.approved) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  addProductType(e, type) {
    if (e.target.value == 'appointment') {
      if (!this.editproductData['appointment']) {
        this.editproductData['appointment'] = this.product.appointment
      }
      const navigationExtras: NavigationExtras = {
        state: {
          productId: this.editproductId,
          productData: this.editproductData
        }
      };
      this.router.navigate(['appointment'], navigationExtras);
    }

    if (e.target.value === 'variant') {
      this[type === 'edit' ? 'editproductData' : 'product'].isPriceList = true;
    } else if (e.target.value === 'single') {
      this[type === 'edit' ? 'editproductData' : 'product'].isPriceList = false;
    } else {
      this[type === 'edit' ? 'editproductData' : 'product'].productType = e.target.value;
    }
  }

  async openUsersModal() {
    let alreadyAdded;
    if (this.editproductData) {
      alreadyAdded = this.editproductData.deal.specificUsers.users ? this.editproductData.deal.specificUsers.users : [];
    } else {
      alreadyAdded = this.product.deal.specificUsers.users ? this.product.deal.specificUsers.users : [];
    }
    const modal = await this.modalController.create({
      component: UsersModalPage,
      componentProps: {
        alreadyAddedUsers: alreadyAdded
      },
      cssClass: 'coupon-code-modal'
    });
    modal.onDidDismiss().then(res => {
      if (res && res.data) {
        console.log('res.data', res.data);
        if (this.editproductData) {
          this.editproductData.deal.specificUsers.users = res.data;
        } else {
          this.product.deal.specificUsers.users = res.data;
        }
      }
      console.log('this.product.deal.specificUsers:', this.product.deal.specificUsers.users);
    });
    await modal.present();
  }

  async removeUser(i) {
    if (this.editproductData) {
      this.editproductData.deal.specificUsers.users.splice(i, 1);
    } else {
      this.product.deal.specificUsers.users.splice(i, 1);
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
        text: 'Crop and upload from gallery',
        icon: 'image',
        handler: () => {
          this.addGallerySingleImage();
        }
      },
      {
        text: 'Multiple images from gallery',
        icon: 'images',
        handler: () => {
          this.addGalleryImages();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  addCameraImage() {
    this.optionsforCamera = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true
    };
    this.firstIteration = false;
    this.camera.getPicture(this.optionsforCamera).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      const base64Str = base64Image.split(',');
      const size = this.calculateImageSize(base64Str[1]);
      //console.log('len of listofbase64Image', this.listofbase64Image.length);
      if (this.editproductData) {
        if (this.firstIteration === false && this.listofbase64Image.length === 0 && this.editproductData.images && this.editproductData.images.length === 0) {
          this.listofbase64Image.push({ base64Img: base64Image, cover: true, size: size });
        } else {
          this.listofbase64Image.push({ base64Img: base64Image, cover: false, size: size });
        }
      } else {
        if (this.firstIteration === false && this.listofbase64Image.length === 0) {
          this.listofbase64Image.push({ base64Img: base64Image, cover: true, size: size });
        } else {
          this.listofbase64Image.push({ base64Img: base64Image, cover: false, size: size });
        }
      }

      this.firstIteration = true;
      setTimeout(() => {
        this.content.scrollToBottom(500);
      }, 500);

    }, (err) => {
      //console.log(err);
    });
  }
  addGallerySingleImage() {
    this.optionsforCamera = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true,
      sourceType: 0,
    };
    this.firstIteration = false;
    this.camera.getPicture(this.optionsforCamera).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      const base64Str = base64Image.split(',');
      const size = this.calculateImageSize(base64Str[1]);
      //console.log('len of listofbase64Image', this.listofbase64Image.length);
      if (this.editproductData) {
        if (this.firstIteration === false && this.listofbase64Image.length === 0 && this.editproductData.images && this.editproductData.images.length === 0) {
          this.listofbase64Image.push({ base64Img: base64Image, cover: true, size: size });
        } else {
          this.listofbase64Image.push({ base64Img: base64Image, cover: false, size: size });
        }
      } else {
        if (this.firstIteration === false && this.listofbase64Image.length === 0) {
          this.listofbase64Image.push({ base64Img: base64Image, cover: true, size: size });
        } else {
          this.listofbase64Image.push({ base64Img: base64Image, cover: false, size: size });
        }
      }

      this.firstIteration = true;
      setTimeout(() => {
        this.content.scrollToBottom(500);
      }, 500);

    }, (err) => {
      //console.log(err);
    });
  }
  addGalleryImages() {
    this.optionsforGallery = {
      quality: 50,
      outputType: 1
    };
    this.firstIteration = false;
    this.imagePicker.getPictures(this.optionsforGallery).then((results) => {
      if (results.length !== 0 && results !== 'OK') {
        for (let i = 0; i < results.length; i++) {
          const base64Str = 'data:image/jpeg;base64,' + results[i].split(',');
          const size = this.calculateImageSize(base64Str[1]);
          //console.log('len of listofbase64Image', this.listofbase64Image.length);
          if (this.editproductData) {
            if (this.firstIteration === false && this.listofbase64Image.length === 0 && this.editproductData.images && this.editproductData.images.length === 0) {
              this.listofbase64Image.push({ base64Img: 'data:image/jpeg;base64,' + results[i], cover: true, size: size });
            } else {
              this.listofbase64Image.push({ base64Img: 'data:image/jpeg;base64,' + results[i], cover: false, size: size });
            }
          } else {
            if (this.firstIteration === false && this.listofbase64Image.length === 0) {
              this.listofbase64Image.push({ base64Img: 'data:image/jpeg;base64,' + results[i], cover: true, size: size });
            } else {
              this.listofbase64Image.push({ base64Img: 'data:image/jpeg;base64,' + results[i], cover: false, size: size });
            }
          }

          this.firstIteration = true;
        }
        setTimeout(() => {
          this.content.scrollToBottom(500);
        }, 500);
      }

    }, (err) => {
      alert(err);
    });
  }
  removeImage(index) {
    this.listofbase64Image.splice(index, 1);
  }
  removeEditImageInData(index, url) {
    //console.log('in removeEditImageInData', index);]
    // if (this.currentVariants[index]) {
    //   this.currentVariants[index].forEach(weight => {
    //     let index = this.editproductData.priceList.findIndex(e => e.weight == weight);
    //     let imageIndex = this.editproductData.priceList[index].images.findIndex(e => e.url == url)
    //     this.editproductData.priceList[index].images.splice(imageIndex, 1)
    //   });
    // }
    for (const [i, variant] of this.editproductData.priceList.entries()) {
      if (variant.images) {
        for (const [j, img] of variant.images.entries()) {
          if (img.url == url) {
            console.log('i,j:', i, j);
            this.editproductData.priceList[i].images.splice(j, 1)
          }
        }
      }
    }
    this.currentVariants[index] = []
    this.editproductData.images.splice(index, 1);
    if (url === this.editproductData.coverPic.url) {
      this.editproductData.coverPic = { imageId: null, url: null };
    }
    this.needToUpdateImages = true;
  }
  removeEditImageInList(index) {
    //console.log('in removeEditImageInList', index);
    this.listofbase64Image.splice(index, 1);
  }

  async editProduct() {
    if (this.editproductData.deal.specificUsers && this.editproductData.deal.specificUsers.active) {
      for (const user of this.editproductData.deal.specificUsers.users) {
        if (user.discount == null) {
          this.presentAlert('', `Discount field cannot be empty for ${user.name} under UserList in Advance Tab`);
          return;
        } else if (user.discount < 0 || user.discount > 100) {
          this.presentAlert('', `Please provide a valid Discount field for ${user.name} under UserList in Advance Tab`);
          return;
        }
      }
    }
    if (this.editproductData.coverPic && this.editproductData.coverPic.url === null) {
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
    if (this.editproductData.isPriceList) {
      let dpList = [];
      let plDiscountList = [];
      for (let index = 0; index < this.editproductData.priceList.length; index++) {
        if (this.editproductData.priceList[index].discountedPrice === null) {
          this.editproductData.priceList[index].discountedPrice = this.editproductData.priceList[index].price;
        }
        dpList.push(this.editproductData.priceList[index].discountedPrice);
        const plDiscount = ((this.editproductData.priceList[index].price - this.editproductData.priceList[index].discountedPrice) / this.editproductData.priceList[index].price) * 100;
        plDiscountList.push(plDiscount);
        if (this.editproductData.priceList[index].weight === '' || this.editproductData.priceList[index].price === null || this.editproductData.priceList[index].totalQuantity === '') {
          priceListCheck = true;
          break;
        }
      }
      //console.log('priceListCheck', priceListCheck);
      this.editproductData.discountedPrice = Math.min(...dpList);
      this.editproductData.discount = parseFloat((Math.max(...plDiscountList)).toFixed(2));
    } else {
      if (this.editproductData.discountedPrice === null) {
        this.editproductData.discountedPrice = this.editproductData.prodPrice;
      }
      this.editproductData.discount = parseFloat((((this.editproductData.prodPrice - this.editproductData.discountedPrice) / this.editproductData.prodPrice) * 100).toFixed(2));
    }
    if (this.editproductData.productCode != '') {
      let prodCode: any = await this.productService.checkProductSKU(this.editproductData.productCode, this.editproductId);
      console.log('ts id : ', prodCode);
      console.log('ts pc : ', this.editproductData.productCode);
      console.log('ts mp : ', prodCode.length);
      let matchingProds: any = [];
      if (prodCode && prodCode.length) {
        for (let i = 0; i < prodCode.length; i++) {
          if (this.editproductId != prodCode[i].id) {
            matchingProds.push(prodCode[i].data.prodName)
          }
        }
        console.log('matchingProds : ', matchingProds);
      }
      if (matchingProds && matchingProds.length) {
        this.presentAlert('', `Please enter a unique product SKU Code - Matching Products are :- ${matchingProds}`);
        return;
      }
    }

    if (this.editproductData.prodName === null || this.editproductData.prodName === '') {
      this.presentAlert('', 'Please enter product name');
    } else if (this.editproductData.prodName.length > 200) {
      this.presentAlert('', 'Product name should be less than 200 characters!');
    } else if (!this.editproductData.isPriceList && !this.editproductData.prodPrice) {
      this.presentAlert('', 'Please enter product price');
    } else if (this.editproductData.productCode === null || this.editproductData.productCode === '') {
      this.presentAlert('', 'Please enter product SKU Code');
    }
    else if ((this.editproductData.isPriceList && priceListCheck) || (this.editproductData.isPriceList && !this.editproductData.priceList.length)) {
      this.presentAlert('', 'Please enter all variants data of product');
    } else if (this.editproductData.prodDesc === null || this.editproductData.prodDesc === '') {
      this.presentAlert('', 'Please enter product description');
    } else if (!(this.editproductData.categories && this.editproductData.categories.length) && !(this.editproductData.brands && this.editproductData.brands.length)) {
      this.presentAlert('', 'Please select any category or brand');
    } else if (this.editproductData.images.length !== 0 && this.listofbase64Image.length !== 0 && this.coverValue === false && this.editCoverValue === false) {
      this.presentAlert('', 'Please make any one image as cover picture');
    } else if (this.editproductData.gst && this.editproductData.gst > 100) {
      this.presentAlert('', `${this.taxType} value must be less than 100`);
    }
    else if (this.editproductData.additionalInfo && this.editproductData.additionalInfo.link && this.editproductData.additionalInfo.link.active && (!this.editproductData.additionalInfo.link.name || !this.editproductData.additionalInfo.link.value)) {
      this.presentAlert('', 'Please enter Custom Action Details');
      return;
    } else if (this.editproductData.bundleProducts && this.editproductData.bundleProducts.active && !this.editproductData.bundleProducts.title) {
      this.presentAlert('', 'Please enter Bundle Product Title');
      return;
    }
    else {
      if (this.isUniversal) {
        const slugName = this.sharedService.createSlugName(this.editproductData.slug.name);
        const sameSlugExists = await this.sharedService.sameSlugExists('products', this.editproductId, slugName);
        if (sameSlugExists) {
          this.presentAlert('', 'Same slug already exists, please try with another slug name');
          return;
        } else {
          this.editproductData.slug = {
            name: slugName,
            updatedAt: new Date(),
            updatedBy: 'admin'
          }
        }
      }
      await this.presentLoading()
      if (this.editproductData.vendorId && this.editproductData.vendorName == '') {
        this.addVendor({ target: { value: this.editproductData.vendorId } }, 'edit');
      }
      this.editproductData.updatedAt = new Date();
      this.editproductData.prodName = this.editproductData.prodName.trim();
      this.editproductData.prodName = this.editproductData.prodName[0].toUpperCase() + this.editproductData.prodName.slice(1);
      this.editproductData.productCode = this.editproductData.productCode.trim();
      this.editproductData.nameToSearch = this.editproductData.prodName.toLowerCase();
      this.editproductData.discountedPrice = this.editproductData.discountedPrice ? this.editproductData.discountedPrice : null;
      this.editproductData.productCode = this.editproductData.productCode ? this.editproductData.productCode : '';
      this.editproductData.productQty = this.editproductData.productQty ? this.editproductData.productQty : '';
      this.editproductData.stopWhenNoQty = this.editproductData.stopWhenNoQty ? this.editproductData.stopWhenNoQty : false;
      this.editproductData.shippingWeight = this.editproductData.shippingWeight ? this.editproductData.shippingWeight : null;
      this.editproductData.variantType = this.editproductData.variantType ? this.editproductData.variantType : '';
      this.editproductData.color = this.editproductData.color ? this.editproductData.color : {};
      this.editproductData.minQty = this.editproductData.minQty ? this.editproductData.minQty : null;
      this.editproductData.maxQty = this.editproductData.maxQty ? this.editproductData.maxQty : null;
      this.editproductData.gst = this.editproductData.gst ? this.editproductData.gst : null;
      this.editproductData.instaCoverImage = this.editproductData.instaCoverImage ? this.editproductData.instaCoverImage:  '';
      this.editproductData.instaReelUrl = this.editproductData.instaReelUrl ? this.editproductData.instaReelUrl:  '';
      this.editproductData.hsnCode = this.editproductData.hsnCode ? this.editproductData.hsnCode : '';
      this.editproductData.purchasePrice = this.editproductData.purchasePrice ? this.editproductData.purchasePrice : null;
      this.editproductData.showSubheading = 'showSubheading' in this.editproductData ? this.editproductData.showSubheading : false;
      if (this.editproductData.variantType === 'other') {
        this.editproductData.variantType = 'variant';
      }
      this.editproductData.metaData = this.metaData;
      this.editproductData.attributes = this.attributesData;
      if (!this.editproductData.prodPrice) {
        this.editproductData.prodPrice = null
      }
      if (['single', 'variant'].includes(this.editproductData.productType)) {
        this.editproductData.productType = '';
      }
      this.editproductData.stockAttributes.expiryDate = this.expiryDate;
      this.editproductData.stockAttributes.manufacturedDate = this.manufacturedDate;
      console.log('this.allRegions on edit product data', this.allRegions);
      this.editproductData.allRegions = this.allRegions;
      this.editproductData.templateId = this.product.templateId;
      // Dont remove, change to date time field
      // let startBlock:any = this.editproductData.deal.start.time.split(":")
      // let endBlock:any = this.editproductData.deal.end.time.split(":")
      // let timeStart = ((startBlock[0]%12+12*Number((startBlock[0]%12==0)))+":"+startBlock[1], startBlock[0] >= 12) ? 'PM' : 'AM'
      // let timeEnd = ((endBlock[0]%12+12*Number((endBlock[0]%12==0)))+":"+endBlock[1], endBlock[0] >= 12) ? 'PM' : 'AM'
      // if (this.editproductData.deal){
      //   this.editproductData.deal.start.date = moment(this.editproductData.deal.start.date).format()
      //   this.editproductData.deal.start.time = this.editproductData.deal.start.time+ ' ' + timeStart
      //   this.editproductData.deal.end.date = moment(this.editproductData.deal.end.date).format()
      //   this.editproductData.deal.end.time = this.editproductData.deal.end.time+ ' ' + timeEnd
      // }

      this.editproductData['video'] = this.video;

      if (!this.isOptionProduct) {
        this.events.publish('product:editProduct', this.editproductData, this.editproductId, this.listofbase64Image, this.editProductBarcode, this.needToUpdateImages);
      } else {
        this.events.publish('product-options:editProductOption', this.editproductData, this.editproductId, this.optionId, this.listofbase64Image, this.editProductBarcode, this.needToUpdateImages);
      }
    }
    // console.log("attributesData", this.attributesData);    
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

  async addProduct() {
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
        if (this.product.priceList[index].weight === '' || this.product.priceList[index].price === null || this.product.priceList[index].totalQuantity === '') {
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
    if (this.product.productCode != '') {
      let prodCode: any = await this.productService.checkProductSKU(this.product.productCode, '');
      console.log('ts id : ', prodCode);
      console.log('ts pc : ', this.product.productCode);
      console.log('ts mp : ', prodCode.length);

      if (prodCode && prodCode.length) {
        let matchingProds: any = [];
        for (let i = 0; i < prodCode.length; i++) {
          matchingProds.push(prodCode[i].data.prodName)
        }
        console.log('matchingProds : ', matchingProds);

        this.presentAlert('', `Please enter a unique product SKU Code - Matching Products are :- ${matchingProds}`);
        return;
      }
    }

    if (this.product.prodName === null || this.product.prodName === '') {
      this.presentAlert('', 'Please enter product name');
    } else if (this.product.prodName.length > 200) {
      this.presentAlert('', 'Product name should be less than 200 characters!');
    } else if (!this.product.isPriceList && !this.product.prodPrice) {
      this.presentAlert('', 'Please enter product price');
    } else if (this.product.productCode === null || this.product.productCode === '') {
      this.presentAlert('', 'Please enter product SKU Code');
    } else if ((this.product.isPriceList && priceListCheck) || (this.product.isPriceList && !this.product.priceList.length)) {
      this.presentAlert('', 'Please enter all variants data of product');
    } else if (this.product.prodDesc === null || this.product.prodDesc === '') {
      this.presentAlert('', 'Please enter product description');
    } else if (!this.selectedCategories.length && !this.selectedBrands.length) {
      this.presentAlert('', 'Please select any category or brand');
    } else if (this.listofbase64Image.length !== 0 && this.coverValue === false) {
      this.presentAlert('', 'Please make any one image as cover picture');
    } else if (this.product.gst && this.product.gst > 100) {
      this.presentAlert('', `${this.taxType} value must be less than 100`);
    }
    else if (this.product.additionalInfo && this.product.additionalInfo.link && this.product.additionalInfo.link.active && (!this.product.additionalInfo.link.name || !this.product.additionalInfo.link.value)) {
      this.presentAlert('', 'Please enter Custom Action Details');
      return;
    } else if (this.product.bundleProducts.active && !this.product.bundleProducts.title) {
      this.presentAlert('', 'Please enter Bundle Product Title');
      return;
    }
    else {
      await this.presentLoading();
      this.product.createdAt = new Date();
      this.product.updatedAt = new Date();
      this.product.sortedAt = new Date();
      this.product.categories = this.selectedCategories;
      this.product.brands = this.selectedBrands;
      this.product.prodName = this.product.prodName.trim();
      this.product.prodName = this.product.prodName[0].toUpperCase() + this.product.prodName.slice(1);
      this.product.productCode = this.product.productCode.trim();
      this.product.nameToSearch = this.product.prodName.toLowerCase();
      if (this.product.variantType === 'other') {
        this.product.variantType = 'variant';
      }
      this.product.metaData = this.metaData;
      this.product.attributes = this.attributesData;
      if (this.userRole === 'vendor') {
        this.product.vendorId = await this.storage.get('uid')
      }
      if (!this.product.prodPrice) {
        this.product.prodPrice = null
      }
      if (['single', 'variant'].includes(this.product.productType)) {
        this.product.productType = '';
      }
      this.product.stockAttributes.expiryDate = this.expiryDate;
      this.product.stockAttributes.manufacturedDate = this.manufacturedDate;
      this.product.allRegions = this.allRegions;
      if (this.product.vendorId) {
        this.addVendor({ target: { value: this.product.vendorId } }, 'new');
      }
      this.events.publish('product:addProduct', this.product, this.listofbase64Image, this.barcode);
    }
  }
  updateNewProductStatus() {
    // if (this.userRole == 'vendor' && !this.roleVendorData.approveAllProducts) {
    //   this.presentAlert('Alert', 'You cannot make this product active as it is not approved by Admin.');
    //   return;
    // }
    if (this.product.status === true || this.product.status === null) {
      this.product.status = false;
    } else {
      this.product.status = true;
    }
  }
  updateEditProductStatus(status: boolean) {
    console.log('this.editproductData.approved:', this.editproductData.approved);
    if (this.userRole == 'vendor' && !this.editproductData.approved) {
      this.presentAlert('Alert', 'You cannot make this product active as it is not approved by Admin.');
      return;
    }
    if (status === true) {
      console.log('status=false');
      this.editproductData.status = false;
    } else {
      console.log('status=true');
      this.editproductData.status = true;
    }
  }
  newProductCoverPic(index) {
    //console.log('index of cover pic', index);
    for (let i = 0; i < this.listofbase64Image.length; i++) {
      if (i === index) {
        this.listofbase64Image[index].cover = true;
      } else {
        this.listofbase64Image[i].cover = false;
      }
    }


  }
  editProductCoverPicInData(index) {
    const editImgData = this.editproductData.images[index];
    this.editproductData.coverPic = editImgData;
    for (let i = 0; this.listofbase64Image.length; i++) {
      this.listofbase64Image[i].cover = false;
    }
  }
  editProductCoverPicInList(index) {
    this.editproductData.coverPic = { imageId: null, url: null };
    for (let i = 0; i < this.listofbase64Image.length; i++) {
      if (i === index) {
        this.listofbase64Image[index].cover = true;
      } else {
        this.listofbase64Image[i].cover = false;
      }
    }
  }
  cancel() {
    //console.log('in cancel');
    this.router.navigate(['admin-products']);
  }
  onClickImage(img: any) {
    let imgZoomUrls = [];
    for (const img of this.listofbase64Image) {
      imgZoomUrls.push({ url: img.base64Img });
    }
    let imgIndex = this.listofbase64Image.indexOf(img);
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
    for (const img of this.listofbase64Image) {
      imgZoomUrls.push({ url: img.base64Img });
    }
    for (const img of this.editproductData.images) {
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
    if (!this.optionId) {
      this.events.publish('product:deleteProduct', this.editproductId);
    } else {
      this.events.publish('product-options:deleteProductOption', this.optionId, this.editproductId);
    }
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
    if (this.selectedCategories.indexOf(cid) === -1) {
      this.selectedCategories.push(cid);
    } else {
      const cidIndex = this.selectedCategories.indexOf(cid);
      this.selectedCategories.splice(cidIndex, 1);
    }
    //console.log('selectedCategories', this.selectedCategories);
  }
  onClickBrandCheckBox(bid: string) {
    if (this.selectedBrands.indexOf(bid) === -1) {
      this.selectedBrands.push(bid);
    } else {
      const bidIndex = this.selectedBrands.indexOf(bid);
      this.selectedBrands.splice(bidIndex, 1);
    }
    //console.log('selectedBrands', this.selectedBrands);
  }
  onClickEditCategoryCheckBox(cid: string) {
    if (this.editproductData.categories.indexOf(cid) === -1) {
      this.editproductData.categories.push(cid);
    } else {
      const cidIndex = this.editproductData.categories.indexOf(cid);
      this.editproductData.categories.splice(cidIndex, 1);
    }
    //console.log('editproductData.categories', this.editproductData.categories);
  }
  onClickEditBrandCheckBox(bid: string) {
    if (this.editproductData.brands) {
      if (this.editproductData.brands.indexOf(bid) === -1) {
        this.editproductData.brands.push(bid);
      } else {
        const bidIndex = this.editproductData.brands.indexOf(bid);
        this.editproductData.brands.splice(bidIndex, 1);
      }
    }
    else {
      this.editproductData.brands = []
      this.editproductData.brands.push(bid);
    }
    //console.log('editproductData.brands', this.editproductData.brands);
  }
  editCheckBoxValue(id: string) {
    if (this.editproductData.categories.indexOf(id) !== -1) {
      return true;
    } else {
      return false;
    }
  }
  editBrandCheckBoxValue(id: string) {
    if (this.editproductData.brands && this.editproductData.brands.length && this.editproductData.brands.indexOf(id) !== -1) {
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
  editPriceToggle() {
    this.editproductData.isPriceList = !this.editproductData.isPriceList;
    if (this.editproductData.isPriceList) {
      this.editproductData.priceSlabs.singleSlabs = [];
      this.setVariantImages();
    }
    else {
      this.editproductData.priceSlabs.variantSlabs = []
    }
    if (this.editproductData.isPriceList && this.editproductData.priceList.length === 0) {
      this.editproductData.priceList.push({
        weight: '',
        price: null,
        discountedPrice: null,
        totalQuantity: '',
        shippingWeight: null,
        purchasePrice: null,
        barcode: ''
      });
      //console.log('priceList', this.editproductData.priceList);
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
  onClickAddMoreInEditProductPriceList() {
    this.editproductData.priceList.push({
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
      // this.product.priceList.splice(index, 1);
    }
    //  else {
    //   this.product.priceList.splice(index, 1);
    // }

    let wValue = this.product.priceList[index].weight;
    this.product.priceList.splice(index, 1);
    this.removeVariantPriceSlab("new", wValue);
  }

  removeElementFromEditProductPriceList(index: number) {
    if (this.editproductData.priceList.length === 1) {
      this.editproductData.isPriceList = false;
      // this.editproductData.priceList.splice(index, 1);
    }
    // else {
    //   this.editproductData.priceList.splice(index, 1);
    // }

    let wValue = this.editproductData.priceList[index].weight;
    this.editproductData.priceList.splice(index, 1);
    this.removeVariantPriceSlab("edit", wValue);
  }

  removeVariantPriceSlab(type: any, weight: any) {
    console.log("weight", weight);

    const dataType = type === "new" ? "product" : "editproductData";
    if (this[dataType].priceSlabs
      && this[dataType].priceSlabs.variantSlabs
      && this[dataType].priceSlabs.variantSlabs.hasOwnProperty(weight)
    ) {
      delete this[dataType].priceSlabs.variantSlabs[weight];
    }
  }

  addSearchKeywords() {
    this.product.searchKeywords.push(this.keyword);
    this.keyword = '';
  }

  removeKeyword(i) {
    this.product.searchKeywords.splice(i, 1);
  }

  editProductAddSearchKeywords() {
    this.editproductData.searchKeywords.push(this.keyword);
    this.keyword = '';
  }

  editProductRemoveKeyword(i) {
    this.editproductData.searchKeywords.splice(i, 1);
  }

  async uploadBarCode(status: string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select any option',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.barcodeFromCamera(status);
        }
      }, {
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          this.barcodeFromGallery(status);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  barcodeFromCamera(status: string) {
    this.optionsforCamera = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true
    };
    this.camera.getPicture(this.optionsforCamera).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.barcode = base64Image;
      if (status === 'edit') {
        this.editProductBarcode = base64Image;
      }
    }, (err) => {
      //console.log(err);
    });
  }

  barcodeFromGallery(status: string) {
    this.optionsforCamera = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true,
      sourceType: 0
    };
    this.camera.getPicture(this.optionsforCamera).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.barcode = base64Image;
      if (status === 'edit') {
        this.editProductBarcode = base64Image;
      }
    }, (err) => {
      //console.log(err);
    });
  }

  removeBarcodeImage() {
    this.barcode = '';
  }

  async plUploadBarcodeActionSheet(index: number, status: string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select any option',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.plUploadBarcode(index, status, 'camera');
        }
      }, {
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          this.plUploadBarcode(index, status, 'gallery');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  plUploadBarcode(index: number, status: string, type: string) {
    const optionsforCamera = {
      quality: 25,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true
    };
    if (type === 'gallery') {
      optionsforCamera['sourceType'] = 0;
    }
    this.camera.getPicture(optionsforCamera).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      if (status === 'edit') {
        this.editproductData.priceList[index].barcode = base64Image;
      } else {
        this.product.priceList[index].barcode = base64Image;
      }
    }, (err) => {
      //console.log(err);
    });
  }

  plRemoveBarcode(index: number, status: string) {
    //console.log('plRemoveBarcode')
    if (status === 'new') {
      this.product.priceList[index].barcode = '';
    } else {
      this.editproductData.priceList[index].barcode = '';
    }
  }

  stopOrderWhenNoQtyToggle() {
    this.product.stopWhenNoQty = !this.product.stopWhenNoQty;
  }

  editProductStopOrderWhenNoQtyToggle(status) {
    if (status) {
      this.editproductData.stopWhenNoQty = false;
    } else {
      this.editproductData.stopWhenNoQty = true;
    }
  }

  imageZoom(img: any) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        imgs: [{ url: img }],
        index: 0
      }
    }).then(modal => modal.present());
  }

  async getSubcategories(cid) {
    if (!this.listOfSubcategories.hasOwnProperty(cid)) {
      let subcategories = []
      subcategories = await this.productService.getSubcategoriesInNewProduct(cid);
      if (this.userRole == 'vendor' && this.roleVendorId) {
        this.listOfSubcategories[cid] = subcategories.filter((subCat) => this.roleVendorData.categories.includes(subCat.id));
      } else {
        this.listOfSubcategories[cid] = subcategories;
      }
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
          if (!this.editproductData) {
            this.product.color = res.data;
          } else {
            this.editproductData.color = res.data;
          }
        }
      });
    await modal.present();
  }
  async updateVariantColor() {
    const modal = await this.modalController.create({
      component: ColorsModalPage,
      componentProps: {
        name: this.product.color.name,
        image: this.product.color.image,
        code: this.product.color.code
      }
    });
    modal.onDidDismiss()
      .then((res) => {
        //console.log('data from modal', res);
        if (res.data) {
          this.product.color = res.data;
        }
      });
    await modal.present();
  }
  async updateEditVariantColor() {
    const modal = await this.modalController.create({
      component: ColorsModalPage,
      componentProps: {
        name: this.editproductData.color.name,
        image: this.editproductData.color.image,
        code: this.editproductData.color.code
      }
    });
    modal.onDidDismiss()
      .then((res) => {
        //console.log('data from modal', res);
        if (res.data) {
          this.editproductData.color = res.data;
        }
      });
    await modal.present();
  }

  removeVariantColor() {
    this.product.color = {};
  }
  removeEditVariantColor() {
    this.editproductData.color = {};
  }

  async importTemplate() {
    const modal = await this.modalController.create({
      component: TemplatesModalPage
    });
    modal.onDidDismiss()
      .then((res) => {
        //console.log('data from modal', res);
        if (res.data) {
          if (!this.editproductData) {
            this.product.variantType = res.data.type;
            this.product.priceList = [];
            for (let index = 0; index < res.data.values.length; index++) {
              this.product.priceList.push({
                weight: res.data.values[index],
                price: null,
                discountedPrice: null,
                totalQuantity: '',
                shippingWeight: null,
                purchasePrice: null,
                barcode: ''
              });
            }
          } else {
            this.editproductData.variantType = res.data.type;
            this.editproductData.priceList = [];
            for (let index = 0; index < res.data.values.length; index++) {
              this.editproductData.priceList.push({
                weight: res.data.values[index],
                price: null,
                discountedPrice: null,
                totalQuantity: '',
                shippingWeight: null,
                purchasePrice: null,
                barcode: ''
              });
            }
          }

        }
      });
    await modal.present();
  }

  tripleTap() {
    this.tapCount += 1;
    if (this.tapCount === 3 && this.product.priceList.length > 1) {
      let dprice = this.product.priceList[0].discountedPrice;
      let price = this.product.priceList[0].price;
      let swt = this.product.priceList[0].shippingWeight;
      this.product.priceList.forEach(pl => {
        pl.discountedPrice = dprice;
        pl.price = price;
        pl.shippingWeight = swt;
      });
      this.tapCount = 0;
    }
  }
  editTripleTap() {
    this.tapCount += 1;
    if (this.tapCount === 3 && this.editproductData.priceList.length > 1) {
      let dprice = this.editproductData.priceList[0].discountedPrice;
      let price = this.editproductData.priceList[0].price;
      let swt = this.editproductData.priceList[0].shippingWeight;
      this.editproductData.priceList.forEach(pl => {
        pl.discountedPrice = dprice;
        pl.price = price;
        pl.shippingWeight = swt;
      });
      this.tapCount = 0;
    }
  }

  addVendor(e, type) {
    //console.log('vendorId', e.target.value);
    if (type === 'edit') {
      this.editproductData.vendorId = e.target.value;
      this.editproductData.vendorName = this.vendors.find(o => o.id === e.target.value).name;
      console.log('this.editproductData.vendorName:', this.editproductData.vendorName);
    } else {
      this.product.vendorId = e.target.value;
      this.product['vendorName'] = this.vendors.find(o => o.id === e.target.value).name;
    }
  }

  async addFilters(type) {

    const modal = await this.modalController.create({
      component: SelectFilterPage,
      componentProps: { addedFilters: type === 'new' ? this.product.filters : this.editproductData.filters }
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
          if (type === 'new') {
            this.product.filters = filtersObj;
          } else {
            this.editproductData.filters = filtersObj;
          }
        }

      }
    });
    await modal.present();
  }

  changeInPrice() {
    if (this.editproductData.discountedPrice === this.editproductData.prodPrice) {
      this.editproductData.discountedPrice = null;
    }
  }

  changeInPLPrice(i: number) {
    if (this.editproductData.priceList[i].discountedPrice === this.editproductData.priceList[i].price) {
      this.editproductData.priceList[i].discountedPrice = null;
    }
  }

  async onDrop(files: FileList) {
    // console.log('files:', files, '\n imglimit:', this.imagesLimit);
    //console.log(this.listofbase64Image,this.editproductData)
    let message = 'Sorry, total' + ' ' + this.imagesLimit.toString() + ' ' + 'images allowed'
    if (this.listofbase64Image && !this.editproductData && (this.listofbase64Image.length >= this.imagesLimit)) {
      // console.log('here1', this.listofbase64Image.length)
      this.presentAlert('Upload failed', message)
    }
    else if (this.editproductData && this.editproductData.images && (this.editproductData.images.length >= this.imagesLimit)) {
      // console.log('here2')
      this.presentAlert('Upload failed', message)
    }
    else if (this.listofbase64Image.length && this.editproductData && this.editproductData.images && (this.listofbase64Image.length + this.editproductData.images.length >= this.imagesLimit)) {
      // console.log('here3')
      this.presentAlert('Upload failed', message)
    }
    else {
      console.log('prod data : ', this.editproductData)
      const modal = await this.modalController.create({
        component: ImageEditorComponent,
        componentProps: {
          aspectRatioWidthVal: 1,
          aspectRatioHeightVal: 1,
          type: 'product',
          currentLimit: this.editproductData ? (this.editproductData.images ? this.editproductData.images.length : 0) : 0
        },
        cssClass: 'custom-img-editor'
      })
      await modal.present();
      modal.onDidDismiss().then(res => {
        if (res.data) {
          for (let i = 0; i < res.data.length; i++) {
            let size = this.calculateImageSize(res.data[i] || '')
            this.listofbase64Image.push({ base64Img: res.data[i] || '', cover: false, size: size });
            if (this.listofbase64Image.length > this.imagesLimit) {
              this.presentAlert('Upload failed', message)
              this.listofbase64Image = [];
            }
          }
        }
        // let size = this.calculateImageSize(res.data || '')
        // this.listofbase64Image.push({ base64Img: res.data || '', cover: false, size: size });
      })
      //console.log('here4')
      // for (let i = 0; i < files.length; i++) {
      //   let reader = new FileReader();
      //   reader.readAsDataURL(files.item(i))
      //   reader.onload = (event:any) => { // called once readAsDataURL is completed
      //     let base64Image:any = event.target.result;
      //     let base64Str = base64Image.split(',');
      //     let size = this.calculateImageSize(base64Str[1]);
      //     // console.log('size:', size);
      //     this.listofbase64Image.push({base64Img: base64Image, cover: false, size: size});
      //   }
      // }
    }
  }

  uploadQR(files: FileList, status: string) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        let base64Image: any = event.target.result;
        this.barcode = base64Image;
        this.editProductBarcode = base64Image;

      }
    }
  }

  uploadPriceListQR(files: FileList, index: number, status: string) {
    for (let i = 0; i < files.length; i++) {

      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        let base64Image: any = event.target.result;
        if (status === 'edit') {
          this.editproductData.priceList[index].barcode = base64Image;
        } else {
          this.product.priceList[index].barcode = base64Image;
        }

      }
    }
  }

  subIsAllowedToggle() {
    this.product.subscription.isAllowed = !this.product.subscription.isAllowed;
  }

  editSubIsAllowedToggle() {
    this.editproductData.subscription.isAllowed = !this.editproductData.subscription.isAllowed;
  }

  dealIsAllowedToggle() {
    this.product.deal.isAllowed = !this.product.deal.isAllowed;
  }

  editDealIsAllowedToggle() {
    this.editproductData.deal.isAllowed = !this.editproductData.deal.isAllowed;
  }

  getAddedFiltersLength(filters) {
    return Object.keys(filters).length;
  }

  imagesReorder(event) {
    let v = this.currentVariants[event.detail.from];
    this.currentVariants[event.detail.from] = this.currentVariants[event.detail.to];
    this.currentVariants[event.detail.to] = v;
    let b = this.editproductData.images[event.detail.from];
    this.editproductData.images[event.detail.from] = this.editproductData.images[event.detail.to];
    this.editproductData.images[event.detail.to] = b;
    this.needToUpdateImages = true;
    event.detail.complete();
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
      componentProps: { productId: this.editproductId }
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
          index: index,
          productId: this.editproductId
        }
      };
      this.router.navigate(['edit-banner'], navigationExtras);
    }
    if (type == "image-block") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          productId: this.editproductId
        }
      };
      this.router.navigate(['edit-image-block'], navigationExtras);
    }
    else if (type == "video-block") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          productId: this.editproductId
        }
      };
      this.router.navigate(['edit-video-block'], navigationExtras);
    }
    else if (type == "text-block") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          productId: this.editproductId
        }
      };
      this.router.navigate(['edit-text-block'], navigationExtras);
    }
    else if (type == "product-carousel" || type == "product-list") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          productId: this.editproductId
        }
      };
      this.router.navigate(['edit-product-carousel'], navigationExtras);
    }
  }

  async getSections() {
    try {
      let sections: any = await this.angularFirestore.collection('products').doc(this.editproductId).collection('sections').doc('productWidgets').valueChanges().pipe(first()).toPromise();
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
    await this.angularFirestore.collection('products').doc(this.editproductId).collection('sections').doc('productWidgets').set({ 'sections': this.productSections });
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
      await this.angularFirestore.collection('products').doc(this.editproductId).collection('sections').doc('productWidgets').update({ 'sections': this.productSections });
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
      await this.angularFirestore.collection('products').doc(this.editproductId).collection('sections').doc('productWidgets').set({ 'sections': this.productSections });
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert('Sections saved successfully!');
    } catch (error) {
      console.log(error)
      this.presentAlert('Some error occured, please try again');

    }

  }

  toggleCod() {
    this.product.isCod = !this.product.isCod
  }

  toggleGstExclusive() {
    this.product.gstExclusive = !this.product.gstExclusive
  }
  toggleShowSubheading() {
    this.product.showSubheading = !this.product.showSubheading
  }
  toggleExtraCharges() {
    this.product.extraCharges.active = !this.product.extraCharges.active
  }

  toggleChargeQty() {
    this.product.extraCharges.chargeAllQty = !this.product.extraCharges.chargeAllQty
  }

  toggleCodEdit() {
    this.editproductData.isCod = !this.editproductData.isCod
  }

  toggleGstExclusiveEdit() {
    this.editproductData.gstExclusive = !this.editproductData.gstExclusive
  }

  toggleExtraChargesEdit() {
    this.editproductData.extraCharges.active = !this.editproductData.extraCharges.active
  }

  toggleChargeQtyEdit() {
    this.editproductData.extraCharges.chargeAllQty = !this.editproductData.extraCharges.chargeAllQty
  }
  toggleShowSubheadingEdit() {
    this.editproductData.showSubheading = !this.editproductData.showSubheading
  }

  activeVariantGroups() {
    this.product.variantGroups.active = !this.product.variantGroups.active
  }

  activeVariantGroupsEdit() {
    if (this.editproductData.variantGroups) {
      this.editproductData.variantGroups.active = !this.editproductData.variantGroups.active
    }
  }


  activePriceSlab() {
    this.product.priceSlabs.active = !this.product.priceSlabs.active
  }

  activePriceSlabEdit() {
    if (this.editproductData.priceSlabs) {
      this.editproductData.priceSlabs.active = !this.editproductData.priceSlabs.active
    }
  }

  async enterPriceSlabData(type, weight) {
    let weightValue = weight
    if (type === 'edit') {
      let adminInput;
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
                if (this.editproductData.isPriceList && this.editproductData.priceList && this.editproductData.priceList.length > 0) {
                  if (!this.editproductData.priceSlabs.variantSlabs[weightValue]) {
                    this.editproductData.priceSlabs.variantSlabs[weightValue] = []
                  }
                  if (this.editproductData.priceSlabs.variantSlabs[weightValue].length == 0) {
                    this.editproductData.priceSlabs.variantSlabs[weightValue].push({
                      qty: [1, 1 + parseInt(data.qty)],
                      mrp: parseFloat(data.mrp),
                      price: parseFloat(data.price)
                    })
                  }
                  else {
                    let lastIndex = this.editproductData.priceSlabs.variantSlabs[weightValue].length
                    this.editproductData.priceSlabs.variantSlabs[weightValue].push({
                      qty: [this.editproductData.priceSlabs.variantSlabs[weightValue][lastIndex - 1].qty[1],
                      this.editproductData.priceSlabs.variantSlabs[weightValue][lastIndex - 1].qty[1] + parseInt(data.qty)],
                      mrp: parseFloat(data.mrp),
                      price: parseFloat(data.price)
                    })
                  }
                }
                else {
                  if (this.editproductData.priceSlabs.singleSlabs.length == 0) {
                    this.editproductData.priceSlabs.singleSlabs.push({
                      qty: [1, 1 + parseInt(data.qty)],
                      mrp: parseFloat(data.mrp),
                      price: parseFloat(data.price)
                    })
                  }
                  else {
                    let lastIndex = this.editproductData.priceSlabs.singleSlabs.length
                    this.editproductData.priceSlabs.singleSlabs.push({
                      qty: [this.editproductData.priceSlabs.singleSlabs[lastIndex - 1].qty[1],
                      this.editproductData.priceSlabs.singleSlabs[lastIndex - 1].qty[1] + parseInt(data.qty)],
                      mrp: parseFloat(data.mrp),
                      price: parseFloat(data.price)
                    })
                  }
                }
              }
            }
          }
        ]
      });
      await alert.present();
    } else {
      let adminInput;
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
                if (this.product.isPriceList && this.product.priceList && this.product.priceList.length > 0) {
                  if (!this.product.priceSlabs.variantSlabs[weightValue]) {
                    this.product.priceSlabs.variantSlabs[weightValue] = []
                  }
                  if (this.product.priceSlabs.variantSlabs[weightValue].length == 0) {
                    this.product.priceSlabs.variantSlabs[weightValue].push({
                      qty: [1, 1 + parseInt(data.qty)],
                      mrp: parseFloat(data.mrp),
                      price: parseFloat(data.price)
                    })
                  }
                  else {
                    let lastIndex = this.product.priceSlabs.variantSlabs[weightValue].length
                    this.product.priceSlabs.variantSlabs[weightValue].push({
                      qty: [this.product.priceSlabs.variantSlabs[weightValue][lastIndex - 1].qty[1],
                      this.product.priceSlabs.variantSlabs[weightValue][lastIndex - 1].qty[1] + parseInt(data.qty)],
                      mrp: parseFloat(data.mrp),
                      price: parseFloat(data.price)
                    })
                  }
                }
                else {
                  if (this.product.priceSlabs.singleSlabs.length == 0) {
                    this.product.priceSlabs.singleSlabs.push({
                      qty: [1, 1 + parseInt(data.qty)],
                      mrp: parseFloat(data.mrp),
                      price: parseFloat(data.price)
                    })
                  }
                  else {
                    let lastIndex = this.product.priceSlabs.singleSlabs.length
                    this.product.priceSlabs.singleSlabs.push({
                      qty: [this.product.priceSlabs.singleSlabs[lastIndex - 1].qty[1],
                      this.product.priceSlabs.singleSlabs[lastIndex - 1].qty[1] + parseInt(data.qty)],
                      mrp: parseFloat(data.mrp),
                      price: parseFloat(data.price)
                    })
                  }
                }
              }
            }
          }
        ]
      });
      await alert.present();
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
              this.editproductData.priceSlabs.singleSlabs[index]['mrp'] = parseFloat(data.mrp);
              this.editproductData.priceSlabs.singleSlabs[index]['price'] = parseFloat(data.price);
            }

          }
        }
      ]
    });
    await alert.present();
  }

  async editPriceSlabDataForVariantSlab(index: number, slab: any, weight: string) {

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
              this.editproductData.priceSlabs.variantSlabs[weight][index]['mrp'] = parseFloat(data.mrp);
              this.editproductData.priceSlabs.variantSlabs[weight][index]['price'] = parseFloat(data.price);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async removePriceSlabs(type, weight) {
    if (type === 'edit') {
      const alert = await this.alertController.create({
        subHeader: "Are you sure you want to remove all slabs?",
        buttons: [
          {
            text: "No",
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }, {
            text: "Yes",
            handler: async (data) => {
              if (weight != '') {
                // this.editproductData.priceSlabs.variantSlabs[weight] = []
                delete this.editproductData.priceSlabs.variantSlabs[weight]
              }
              else {
                this.editproductData.priceSlabs.singleSlabs = []
              }
            }
          }
        ]
      });
      await alert.present();
    }
    else {
      const alert = await this.alertController.create({
        subHeader: "Are you sure you want to remove all slabs?",
        buttons: [
          {
            text: "No",
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }, {
            text: "Yes",
            handler: async (data) => {
              if (weight != '') {
                // this.product.priceSlabs.variantSlabs[weight] = []
                delete this.product.priceSlabs.variantSlabs[weight];
              }
              else {
                this.product.priceSlabs.singleSlabs = []
              }
            }
          }
        ]
      });
      await alert.present();
    }
  }

  async enterVariantGroupsData(type) {
    let groupData = {
      name: this.groupName,
      variants: this.groupOptions
    }
    if (type == 'new') {
      this.product.variantGroups.groups.push(groupData)
    }
    else {
      this.editproductData.variantGroups.groups.push(groupData)
    }
  }

  deleteVariantGroup(type, index) {
    if (type == 'new') {
      this.product.variantGroups.groups.splice(index, 1)
    }
    else {
      this.editproductData.variantGroups.groups.splice(index, 1)
    }
  }

  // changeComponent(index) {
  changeComponent(name) {
    let prevMsgDiv = document.getElementById(this.selectedId);
    prevMsgDiv.style.background = 'white';
    // let msgDiv = document.getElementById(index.toString());
    let msgDiv = document.getElementById(name.toString());
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    // this.selectedId = index.toString()
    this.selectedId = name.toString()
  }

  saveVariantImage(image) {
    this.currentImage = image
  }

  onClickVariantOption(variantIndex: number, imgIndex: number) {
    console.log('onClickVariantOption...');
    const variant = this.editproductData.priceList[variantIndex];
    if (variant.images) {
      const index = variant.images.findIndex(img => img.url === this.editproductData.images[imgIndex].url);
      if (index !== -1) {
        this.editproductData.priceList[variantIndex].images.splice(index, 1);
      } else {
        this.editproductData.priceList[variantIndex].images.push(this.editproductData.images[imgIndex]);
      }
    } else {
      this.editproductData.priceList[variantIndex].images = [this.editproductData.images[imgIndex]];
    }
    console.log('this.editproductData.priceList', this.editproductData.priceList);
  }

  onChangeVariantImg(e, imgIndex: number) {
    const values = e.target.value;
    // console.log('values', values);
    for (let [i, variant] of this.editproductData.priceList.entries()) {
      //variant.images = [];
      if (values.includes(variant.weight)) {
        if (variant.images && variant.images.length) {
          if (!variant.images.some(img => img.url === this.editproductData.images[imgIndex].url)) {
            variant.images.push(this.editproductData.images[imgIndex])
          }
        } else {
          variant.images = [this.editproductData.images[imgIndex]];
        }
      }
      else {
        if (variant.images && variant.images.length) {
          const index = variant.images.findIndex(img => img.url == this.editproductData.images[imgIndex].url);
          if (index > -1) {
            console.log('i,index:', i, index);
            console.log('this.editproductData.priceList[i].images[index]:', this.editproductData.priceList[i].images[index])
            this.editproductData.priceList[i].images.splice(index, 1);
          }
        }
      }
    }
    //console.log('this.editproductData.priceList', this.editproductData.priceList);

  }

  getVariantImgsValues(imgIndex: number) {
    let variants = [];
    for (const variant of this.editproductData.priceList) {
      if (variant.images && variant.images.some(img => img.url === this.editproductData.images[imgIndex].url)) {
        variants.push(variant.weight);
      }
    }
    return variants;
  }

  onChangeVariantImage(event, i) {
    let imageObj: any = {
      mob: this.currentImage.mob,
      thumb: this.currentImage.thumb,
      url: this.currentImage.url
    }

    if (this.currentVariants[i]) {
      //removing unselected variants
      let removeArray = this.currentVariants[i].filter(x => !event.target.value.includes(x))
      console.log('removeArr:', removeArray);
      for (const weight of removeArray) {
        let index = this.editproductData.priceList.findIndex(e => e.weight == weight);
        let imageIndex = this.editproductData.priceList[index].images.findIndex(e => e.mob == imageObj.mob)
        this.editproductData.priceList[index].images.splice(imageIndex, 1)
      }

      //adding new selected variants
      console.log('currentVariants:', this.currentVariants);
      let addArray = event.target.value.filter(x => !this.currentVariants[i].includes(x))
      console.log('addArr:', addArray);
      for (const weight of addArray) {
        let index = this.editproductData.priceList.findIndex(e => e.weight == weight);
        console.log('index:', index);
        if (!this.editproductData.priceList[index].images) {
          this.editproductData.priceList[index].images = []
        } else {
          console.log('inside else with index:', index);
          this.editproductData.priceList[index].images.push(imageObj)
        }
      }
    }

    else {
      for (const weight of event.target.value) {
        let index = this.editproductData.priceList.findIndex(e => e.weight == weight);
        if (!this.editproductData.priceList[index].images) {
          this.editproductData.priceList[index].images = []
        } else {
          this.editproductData.priceList[index].images.push(imageObj)
        }
      }
    }

  }

  toggleAdditionalInfo(infoType, prodType) {
    if (prodType == 'new') {
      this.product.additionalInfo[infoType].active = !this.product.additionalInfo[infoType].active;
    } else {
      this.editproductData.additionalInfo[infoType].active = !this.editproductData.additionalInfo[infoType].active;
    }
  }
  removeAdditionalInfoImg(infoType, prodType) {
    if (prodType == 'new') {
      this.product.additionalInfo[infoType].img.url = '';
    }
    else if (prodType == 'edit') {
      this.editproductData.additionalInfo[infoType].img.url = '';
    }
  }

  uploadChart(files: FileList, infoType, prodType: string) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        let base64Image: any = event.target.result;
        if (prodType == 'new') {
          this.product.additionalInfo[infoType].img.url = base64Image;
        } else {
          this.editproductData.additionalInfo[infoType].img.url = base64Image
        }
      }
    }
  }

  changeRetailDiscountType() {
    let type = this.editproductId ? this.editproductData.retailDiscountType : this.product.retailDiscountType;
    if (type === 'percentage') {
      type = 'flat';
    } else {
      type = 'percentage';
    }
    this[this.editproductId ? 'editproductData' : 'product'].retailDiscountType = type;
  }

  getUpdatedFields(data) {
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
    if (!data.hasOwnProperty('retailDiscountType')) {
      data['retailDiscountType'] = this.product.retailDiscountType;
    }
    if (!data.hasOwnProperty('images')) {
      data['images'] = this.product.images;
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
              console.log('editproductId', this.editproductId);
              await this.productService.makeProductClones(clones, this.editproductId);
              this.presentAlert('Clones successful', 'Product Clones will be created in couple of minutes');
            } else {
              this.presentAlert('Warning', 'Provide valid input');
            }
          }
        }
      ]
    });
    await cloneAlert.present();
  }

  getSelectedValueOfProductType() {
    if (['single', 'variant'].includes(this.editproductData.productType) || !this.editproductData.productType) {
      if (this.editproductData.isPriceList) {
        return 'variant';
      } else {
        return 'single';
      }
    } else {
      return this.editproductData.productType;
    }
  }

  toggleBundleProducts(mode) {
    if (mode == 'new') {
      this.product.bundleProducts.active = !this.product.bundleProducts.active;
    } else {
      this.editproductData.bundleProducts.active = !this.editproductData.bundleProducts.active;
    }
  }

  async presentProductsModal(mode) {
    const modal = await this.modalController.create({
      component: ProductsModalPage,
      backdropDismiss: false,
      cssClass: "custom-modal",
      componentProps: {
        isBundleProducts: true,
        bundleList: this.editproductData ? this.editproductData.bundleProducts.products : this.product.bundleProducts.products,
      }
    });
    modal.onDidDismiss()
      .then((res) => {
        if (res.data && res.data.length) {
          for (let resData of res.data) {
            if (mode == 'new') {
              // this.product.bundleProducts.products.push({id: res.data.id, name: res.data.name});
              this.product.bundleProducts.products.push({ id: resData.id, name: resData.name });
            } else {
              // this.editproductData.bundleProducts.products.push({id: res.data.id, name: res.data.name});
              this.editproductData.bundleProducts.products.push({ id: resData.id, name: resData.name });
            }
          }
          // console.log('res.data',res.data);
          // this.limits[index].product.id = res.data.id;
          // this.limits[index].product.name = res.data.name;
          // if (res.data.variant) {
          //   this.limits[index].product['variant'] = res.data.variant;
          //   this.limits[index].product.type = 'variant';
          // } else{
          //   this.limits[index].product.type = 'single';
          //   delete this.limits[index].product['variant'];
          // }
          // console.log('variant:', this.limits[index].product['variant']);
        }
      });
    await modal.present();
  }

  removeBundleProduct(index, mode) {
    if (mode === 'new') {
      this.product.bundleProducts.products.splice(index, 1);
    } else {
      this.editproductData.bundleProducts.products.splice(index, 1);
    }
  }

  // ? Toggle checkbox function for various input.
  toggleCheckbox(type: string) {
    if (type == 'allRegions') {
      this.allRegions.active = !this.allRegions.active;
    }
  }
  // ? Toggle checkbox function for various input.

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

  async uploadImage(files: FileList) {
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
      console.log('res', res)
      if (res && res.data) {
        let size = this.calculateImageSize(res.data || '')
        console.log('fileSize :', size);
        if(this.product){
          this.product.instaCoverImage = res.data;
        }

        if(this.editproductData){
          this.editproductData.instaCoverImage = res.data;
        }
       
        console.log('this.product.instaCoverImage', this.product.instaCoverImage)
      }
    })
  }

  removeReelCoverImage() {
    this.product.instaCoverImage = ''
  }

  toggleVideoFeature() {
    this.video.active = !this.video.active;
  }

  async uploadDocument(event: any, type: string) {
    const file = event.target.files[0];
    console.log('file: ', file);

    const base64: any = await this.productService.getBase64FromFile(file);
    console.log('base64: ', base64);
    if (type === 'video') {
      this.video.link = base64;
    }
    else {
      this.video.thumbnail = base64;
    }
  }

  async addVideo() {
    try {
      if (!this.video.link || !this.video.thumbnail) {
        this.sharedService.presentAlert('Please enter a video and thumbnail');
        return;
      }

      await this.sharedService.presentLoading('Please Wait...', 10000);
      const videoRoute = `products/${this.editproductId}/instagram/video`;
      this.video.link = await this.productService.getUrlForUploadedFile(this.video.link, videoRoute);
      console.log("this.video.link", this.video.link);

      const thumbRoute = `products/${this.editproductId}/instagram/thumb`;
      this.video.thumbnail = await this.productService.getUrlForUploadedFile(this.video.thumbnail, thumbRoute);
      console.log("this.video.thumbnail", this.video.thumbnail);
      await this.sharedService.loading.dismiss();

      await this.sharedService.presentAlert('image uploaded successfully, now save the product');

    }
    catch (err) {
      console.error('add item err', err);
    }
  }

}
