import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, AlertController, LoadingController, Platform, ModalController, IonContent } from '@ionic/angular';
import { Booking } from 'src/app/models/booking';
// import { CameraOptions } from '@ionic-native/camera/ngx';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { Storage } from '@ionic/storage';
import { BookingService } from 'src/app/services/booking/booking.service';
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

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.page.html',
  styleUrls: ['./create-booking.page.scss'],
})

export class CreateBookingPage implements OnInit {

  // Booking Object Start
  booking: Booking = {
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
    // productQty: '',
    // stopWhenNoQty: false,
    coverPic: {
      imageId: '',
      mob: '',
      thumb: '',
      url: ''
    },
    // minQty: null,
    // maxQty: null,
    hsnCode: '',
    purchasePrice: null,
    discount: 0,
    subscription: {
      isAllowed: false,
      dailyDiscount: null,
      weeklyDiscount: null,
      monthlyDiscount: null
    },
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
    metaData: {
      pageTitle: '',
      metaDescription: '',
      metaKeywords: ''
    },
    barcodeNo: null,
    extraCharges: {
      active: false,
      label: '',
      charge: 0,
      chargeAllQty: false
    },
    gstExclusive: false,
    isCod: true,
    scheduleData: {
      maxDays: null,
      active: true,
      isPredefined: false,
      duration: {
        months: null,
        days: null,
        hours: null,
        minutes: null,
      },
      schedules: [],
    },
    allowPayment: false,
    allRegions: {
      active: false,
      regions: []
    },
    templateId: '',
    productType: 'booking',
    allowAddress: false,
    slug: {
      name: null,
      updatedAt: new Date(),
      updatedBy: 'admin'
    },
    additionalInfo: {
      customInput: {
        active: false,
        label: "",
        required: false
      }
    },
    vendorId: ""
  };
  // Booking Object End

  // optionsForCamera: CameraOptions;
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
  limitedTimeDeal = false;
  minDate = new Date().toISOString();
  multiRegion = false;
  multiRegionData = [];
  subscriptionFeature = false;
  userRole = ""
  vendorData = []
  vendorName = 'Select Vendor'
  imagesLimit: any;
  roleVendorId: any;
  roleVendorData: any;
  sectionLimit: any
  productSections = []
  moreUsers = true;
  sideMenu = []
  selectedId = '0'
  fromAppointment = false
  templatesArray: any;
  // currentVariants: any = {} // check this again
  needToUpdateImages = false;

  // For Booking
  slotValid: boolean = true;
  // For Booking
  isUniversal = false;
  subOfSubCategories = {};
  subOfSubCategoryToggle = {};
  multiVendor = false;
  vendors = [];

  constructor(
    private route: ActivatedRoute,
    private events: Events,
    private alertController: AlertController,
    private router: Router,
    public loadingController: LoadingController,
    private platform: Platform,
    private modalController: ModalController,
    private storage: Storage,
    private bookingService: BookingService,
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
        this.booking['approved'] = true;
        this.booking.status = true;
      } else {
        this.booking['approved'] = false;
        this.booking.status = false;
      }
    }
    this.imagesLimit = this.configService.environment.productImageLimit;
    this.events.publish('booking:getAllCategories');
    this.events.publish('brands:getAllBrandsForAdmin');
    this.events.publish('variants:getVariantsTypeData');
    this.devWidth = this.platform.width();
    if (this.editProductId) {
      this.events.publish('booking:getProductWithId', this.editProductId);
      this.events.publish('booking:getAllSubCategories');
      this.getSections()
    }
    this.taxType = this.configService.environment.taxType;
    this.subscriptionFeature = this.configService.environment.subscriptionFeature;
    this.limitedTimeDeal = this.configService.environment.limitedTimeDeal;
    this.multiRegion = this.configService.environment.multiRegion;
    this.multiVendor = this.configService.environment.multiVendor;
    if (this.multiRegion) {
      this.events.publish('multi-region:getActiveStatus');
      this.events.publish('multi-region:getAllActiveRegions');
      this.multiRegionData = await this.multiRegionService.getAllActiveRegions('service');
      console.log('multiRegionData:', this.multiRegionData);

      // Creating and Updating Region
      if (this.booking.allRegions.regions.length == 0) {
        this.createDefaultRegion();
      } else {
        this.updateRegion();
      }

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
      // 'Cash on Delivery',
      // 'Extra Charges',
      // 'Subscription',
      // 'Limited Time Deal',
      // 'Specific User Discount',
      'Seo for Website',
      "Vendor",
      'Add Ons',
      'Slug Name',
      'Custom Input',
      'Regions',
      // 'Clone Service',
    );

    if (this.booking.scheduleData.schedules && this.booking.scheduleData.schedules.length == 0) {
      this.booking.scheduleData.schedules = [
        { day: 'Monday', active: false, schedule: [] },
        { day: 'Tuesday', active: false, schedule: [] },
        { day: 'Wednesday', active: false, schedule: [] },
        { day: 'Thursday', active: false, schedule: [] },
        { day: 'Friday', active: false, schedule: [] },
        { day: 'Saturday', active: false, schedule: [] },
        { day: 'Sunday', active: false, schedule: [] }
      ]
    }
  }

  createDefaultRegion() {
    console.log("loopStart");
    for (let region of this.multiRegionData) {
      this.booking.allRegions.regions.push(
        this.returnRegionObj(region)
      )
    }
  }

  returnRegionObj(region: any) {
    return {
      name: region.name,
      id: region.id,
      active: false,
      price: null,
      discountedPrice: null,
      // qty: null,
    }
  }

  updateRegion() {
    // * Check if new region added
    let newRegions = this.multiRegionData.filter(newRegion =>
      !this.booking.allRegions.regions.find(region => newRegion.id == region.id)
    );

    // * Check if any region deleted
    let removeRegions = this.booking.allRegions.regions.filter(oldRegion =>
      !this.multiRegionData.find(region2 => oldRegion.id == region2.id)
    );

    // * Add new region if any update
    if (newRegions.length > 0) {
      console.log('new region:', newRegions);
      for (let newRegion of newRegions) {
        this.booking.allRegions.regions.push(
          this.returnRegionObj(newRegion)
        )
      }
    }

    // * Delete region if any removed
    if (removeRegions.length > 0) {
      console.log('update region:', removeRegions);
      for (let region of removeRegions) {
        let index = this.booking.allRegions.regions.findIndex(oldRegion => oldRegion.id == region.id);
        console.log('name:', index);
        this.booking.allRegions.regions.splice(index, 1);
      }
    }
  }

  toggleRegion(index: number) {
    this.booking.allRegions.regions[index].active = !this.booking.allRegions.regions[index].active;
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  async initializeSubscriptions() {
    this.events.subscribe('booking:publishgetProductWithId', (data) => {
      data = this.getUpdatedFields(data);
      this.booking = data;
      if (!this.booking.deal.specificUsers) {
        this.booking.deal.specificUsers = this.booking.deal.specificUsers;
      }
      // console.log('this.currentVariants outside loop', this.currentVariants)
    })
    this.events.subscribe('booking:addSuccess', (heading, desc) => {
      this.loader.dismiss();
      this.presentAlert(heading, desc, true);
      this.booking.prodName = null;
      this.booking.prodDesc = null;
      this.booking.prodPrice = null;
      this.listOfBase64Image = [];
      this.selectedCategories = [];
      this.selectedBrands = [];
    });
    this.events.subscribe('booking:addFailure', (heading, desc) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert(heading, desc);
    });
    this.events.subscribe('booking:editSuccess', async (heading, desc) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      await this.presentAlert(heading, desc, true);
    });
    this.events.subscribe('booking:editFailure', (heading, desc) => {
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
    this.events.subscribe('booking:deleteSuccess', (heading, msg) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this._location.back();

    });
    this.events.subscribe('booking:deleteFailure', (heading, msg) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert(heading, msg);
    });
    this.events.subscribe('booking:publishAllCategoriesForAdmin', async (categories) => {
      // console.log('categories:', categories);
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
    this.events.subscribe('booking:noCategoryAvailable', () => {
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

      this.booking = option;
      if (!this.booking.deal.specificUsers) {
        this.booking.deal.specificUsers = this.booking.deal.specificUsers;
      }
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

    let res = await this.bookingService.getTemplates();
    if (res) {
      this.templatesArray = res;
      console.log(this.templatesArray);
    }

  }

  changeTemplate(value: string) {
    console.log(value);
    this.booking.templateId = value;
  }

  editShowDisable() {
    if (this.userRole == 'vendor') {
      if (this.booking.approved) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  async openUsersModal() {
    let alreadyAdded;
    alreadyAdded = this.booking.deal.specificUsers.users ? this.booking.deal.specificUsers.users : [];
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
        if (this.booking) {
          this.booking.deal.specificUsers.users = res.data;
        } else {
          this.booking.deal.specificUsers.users = res.data;
        }
      }
      console.log('this.booking.deal.specificUsers:', this.booking.deal.specificUsers.users);
    });
    await modal.present();
  }

  async removeUser(i) {
    this.booking.deal.specificUsers.users.splice(i, 1);
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

  async saveBooking() {
    if (this.booking.deal.specificUsers.active) {
      for (const user of this.booking.deal.specificUsers.users) {
        if (user.discount == null) {
          this.presentAlert('', `Discount field cannot be empty for ${user.name} under UserList in Advance Tab`);
          return;
        } else if (user.discount < 0 || user.discount > 100) {
          this.presentAlert('', `Please provide a valid Discount field for ${user.name} under UserList in Advance Tab`);
          return;
        }
      }
    }
    this.coverValue = true;
    if (this.booking.coverPic && !this.booking.coverPic.url) {
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
    if (this.booking.discountedPrice === null) {
      this.booking.discountedPrice = this.booking.prodPrice;
    }
    this.booking.discount = parseFloat((((this.booking.prodPrice - this.booking.discountedPrice) / this.booking.prodPrice) * 100).toFixed(2));
    if (this.booking.productCode != '') {
      let prodCode: any = await this.bookingService.checkProductSKU(this.booking.productCode, this.editProductId);
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
          this.presentAlert('', `Please enter a unique Service Code - Matching service are :- ${matchingProds}`);
          return;
        }
      }
    }

    if (this.booking.scheduleData.schedules) {
      await this.slotValidation();
    }

    if (this.booking.prodName === null || this.booking.prodName === '') {
      this.presentAlert('', 'Please enter service name');
    }
    else if (!this.booking.prodPrice && this.booking.prodPrice !== 0) {
      this.presentAlert('', 'Please enter service price');
    }
    else if (this.booking.productCode === null || this.booking.productCode === '') {
      this.presentAlert('', 'Please enter service Code');
    }
    else if (this.booking.prodDesc === null || this.booking.prodDesc === '') {
      this.presentAlert('', 'Please enter service description');
    }
    else if (!(this.booking.categories && this.booking.categories.length) && !(this.booking.brands && this.booking.brands.length)) {
      this.presentAlert('', 'Please select any category or brand');
    }
    else if (this.coverValue === false) {
      this.presentAlert('', 'Please make any one image as cover picture');
    }
    else if (this.booking.gst && this.booking.gst > 100) {
      this.presentAlert('', `${this.taxType} value must be less than 100`);
    }
    else if (!this.durationValidation()) {
      this.presentAlert('', 'Please fill all details of duration !');
    }
    else if (!this.slotValid) {
      this.presentAlert('', 'Please fill all details of slot !');
    }

    else {
      this.booking.createdAt = new Date();
      this.booking.updatedAt = new Date();
      this.booking.sortedAt = new Date();
      this.booking.nameToSearch = this.booking.prodName.toLowerCase();
      // if (!this.booking.prodPrice) {
      //   this.booking.prodPrice = null;
      // }
      if (this.isUniversal && this.editProductId) {
        const slugName = this.sharedService.createSlugName(this.booking.slug.name);
        const sameSlugExists = await this.sharedService.sameSlugExists('products', this.editProductId, slugName);
        if (sameSlugExists) {
          this.presentAlert('', 'Same slug already exists, please try with another slug name');
          return;
        } else {
          this.booking.slug = {
            name: slugName,
            updatedAt: new Date(),
            updatedBy: 'admin'
          }
        }
      }
      await this.presentLoading();
      if (this.userRole === 'vendor') {
        this.booking.vendorId = await this.storage.get('uid');
      }
      if (this.booking.vendorId) {
        const vendorData: any = await this.vendorService.getVendorName(this.booking.vendorId, 'service');
        this.booking['vendorName'] = vendorData.name || vendorData.displayName || "";
      }
      if (this.editProductId) {
        console.log('edit prod');
        this.events.publish('booking:editProduct', this.booking, this.editProductId, this.listOfBase64Image, this.needToUpdateImages);
      } else {
        console.log('new prod');
        this.events.publish('booking:addProduct', this.booking, this.listOfBase64Image);
      }
    }
  }

  updateNewProductStatus(status: boolean) {
    console.log('this.booking.approved:', this.booking.approved);
    if (this.userRole == 'vendor' && !this.booking.approved) {
      this.presentAlert('Alert', 'You cannot make this service active as it is not approved by Admin.');
      return;
    }
    if (status === true) {
      console.log('status=false');
      this.booking.status = false;
    } else {
      console.log('status=true');
      this.booking.status = true;
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
    const editImgData = this.booking.images[index];
    this.booking.coverPic = editImgData;
    for (let i = 0; this.listOfBase64Image.length; i++) {
      this.listOfBase64Image[i].cover = false;
    }
  }
  editProductCoverPicInList(index) {
    this.booking.coverPic = {
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
    let b = this.booking.images[event.detail.from];
    this.booking.images[event.detail.from] = this.booking.images[event.detail.to];
    this.booking.images[event.detail.to] = b;
    this.needToUpdateImages = true;
    event.detail.complete();
  }

  removeEditImageInData(index: number, url: string) {
    this.booking.images.splice(index, 1);
    if (url === this.booking.coverPic.url) {
      this.booking.coverPic = {
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
    this.router.navigate(['booking']);
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
    for (const img of this.booking.images) {
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
    this.events.publish('booking:deleteProduct', this.editProductId);
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
    if (this.booking.categories) {
      if (this.booking.categories.indexOf(cid) === -1) {
        this.booking.categories.push(cid);
      } else {
        const cidIndex = this.booking.categories.indexOf(cid);
        this.booking.categories.splice(cidIndex, 1);
      }
    }
    else {
      this.booking.categories = []
      this.booking.categories.push(cid);
    }

  }

  onClickBrandCheckBox(bid: string) {
    if (this.booking.brands) {
      if (this.booking.brands.indexOf(bid) === -1) {
        this.booking.brands.push(bid);
      } else {
        const bidIndex = this.booking.brands.indexOf(bid);
        this.booking.brands.splice(bidIndex, 1);
      }
    }
    else {
      this.booking.brands = []
      this.booking.brands.push(bid);
    }
  }

  editCheckBoxValue(id: string) {
    if (this.booking.categories) {
      if (this.booking.categories.indexOf(id) !== -1) {
        return true;
      } else {
        return false;
      }
    }

  }
  editBrandCheckBoxValue(id: string) {
    if (this.booking.brands && this.booking.brands.length && this.booking.brands.indexOf(id) !== -1) {
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
    this.booking.allowPayment = !this.booking.allowPayment;
  }

  addSearchKeywords() {
    this.booking.searchKeywords.push(this.keyword);
    this.keyword = '';
  }

  removeKeyword(i) {
    this.booking.searchKeywords.splice(i, 1);
  }

  editProductAddSearchKeywords() {
    this.booking.searchKeywords.push(this.keyword);
    this.keyword = '';
  }

  editProductRemoveKeyword(i) {
    this.booking.searchKeywords.splice(i, 1);
  }

  // stopOrderWhenNoQtyToggle() {
  //   this.booking.stopWhenNoQty = !this.booking.stopWhenNoQty;
  // }

  // editProductStopOrderWhenNoQtyToggle(status) {
  //   if (status) {
  //     this.booking.stopWhenNoQty = false;
  //   } else {
  //     this.booking.stopWhenNoQty = true;
  //   }
  // }

  async getSubcategories(cid) {
    if (!this.listOfSubcategories.hasOwnProperty(cid)) {
      let subcategories = []
      subcategories = await this.bookingService.getSubcategoriesInNewProduct(cid);
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
    if (this.booking.discountedPrice === this.booking.prodPrice) {
      this.booking.discountedPrice = null;
    }
  }

  async onDrop(files: FileList) {
    // console.log('files:', files, '\n imgLimit:', this.imagesLimit);
    //console.log(this.listOfBase64Image,this.booking)
    let message = 'Sorry, total' + ' ' + this.imagesLimit.toString() + ' ' + 'images allowed'
    if (this.listOfBase64Image && !this.booking && (this.listOfBase64Image.length == this.imagesLimit)) {
      // console.log('here1', this.listOfBase64Image.length)
      this.presentAlert('Upload failed', message)
    }
    else if (this.booking && this.booking.images && (this.booking.images.length == this.imagesLimit)) {
      // console.log('here2')
      this.presentAlert('Upload failed', message)
    }
    else if (this.listOfBase64Image.length && this.booking && this.booking.images && (this.listOfBase64Image.length + this.booking.images.length == this.imagesLimit)) {
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

  subIsAllowedToggle() {
    this.booking.subscription.isAllowed = !this.booking.subscription.isAllowed;
  }

  dealIsAllowedToggle() {
    this.booking.deal.isAllowed = !this.booking.deal.isAllowed;
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

  toggleCod() {
    this.booking.isCod = !this.booking.isCod
  }

  toggleGstExclusive() {
    this.booking.gstExclusive = !this.booking.gstExclusive
  }

  toggleExtraCharges() {
    this.booking.extraCharges.active = !this.booking.extraCharges.active
  }

  toggleChargeQty() {
    this.booking.extraCharges.chargeAllQty = !this.booking.extraCharges.chargeAllQty
  }

  toggleGstExclusiveEdit() {
    this.booking.gstExclusive = !this.booking.gstExclusive
  }

  toggleChargeQtyEdit() {
    this.booking.extraCharges.chargeAllQty = !this.booking.extraCharges.chargeAllQty
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
    if (!data.hasOwnProperty('deal')) {
      data['deal'] = this.booking.deal;
    }
    if (!data.hasOwnProperty('extraCharges')) {
      data['extraCharges'] = this.booking.extraCharges;
    }
    if (!data.hasOwnProperty('gstExclusive')) {
      data['gstExclusive'] = this.booking.gstExclusive;
    }
    if (!data.hasOwnProperty('isCod')) {
      data['isCod'] = this.booking.isCod;
    }
    if (!data.hasOwnProperty('additionalInfo')) {
      data['additionalInfo'] = this.booking.additionalInfo;
    }
    data["allRegions"] = "allRegions" in data ? data.allRegions : this.booking.allRegions;
    return data;
  }

  // async cloneProduct() {
  //   const cloneAlert = await this.alertController.create({
  //     subHeader: 'Clone Product',
  //     message: 'Use this to make clone of this product.',
  //     inputs: [
  //       {
  //         name: 'clones',
  //         type: 'number',
  //         placeholder: 'Enter the number of clones you want to make'
  //       }],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //         }
  //       }, {
  //         text: 'Add',
  //         handler: async (alertData) => {
  //           const clones = parseInt(alertData.clones);
  //           if (clones) {
  //             console.log('editproductId', this.editProductId);
  //             await this.bookingService.makeProductClones(clones, this.editProductId);
  //             this.presentAlert('Clones successful', 'Product Clones will be created in couple of minutes');
  //           } else {
  //             this.presentAlert('Warning', 'Provide valid input');
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   await cloneAlert.present();
  // }

  // ? Schedule Functions Start

  async selectDefaultSchedule() {
    await this.presentLoading();
    let response = await this.bookingService.getAppointmentSettings()
    if (response) {
      this.booking.scheduleData.schedules = response['days'];
      this.booking.scheduleData.maxDays = response['maxDays'];
      this.loader.dismiss();
    }
    else {
      this.loader.dismiss();
      this.presentAlert('No default settings Found!')
    }
  }

  // ? Toggle checkbox function for various input.
  toggleCheckbox(type: string) {
    // Schedule input toggle
    if (type == 'isSchedule') {
      this.booking.scheduleData.active = !this.booking.scheduleData.active;
    }
    // Schedule predefined input toggle
    if (type == 'predefinedSlot') {
      this.booking.scheduleData.isPredefined = !this.booking.scheduleData.isPredefined;
    }
    // Allow address input toggle
    if (type == 'allowAddress') {
      this.booking.allowAddress = !this.booking.allowAddress;
    }
    // Custom input toggle
    if (type == 'customInput') {
      this.booking.additionalInfo.customInput.active = !this.booking.additionalInfo.customInput.active;
    }
    // Custom input required toggle
    if (type == 'customInputRequired') {
      this.booking.additionalInfo.customInput.required = !this.booking.additionalInfo.customInput.required;
    }
    // Region Prices Toggle
    if (type == 'allRegions') {
      this.booking.allRegions.active = !this.booking.allRegions.active;
    }
  }
  // ? Toggle checkbox function for various

  changeSchedule(index: number) {
    this.booking.scheduleData.schedules[index].active = !this.booking.scheduleData.schedules[index].active
  }

  addSlot(index: number) {
    this.booking.scheduleData.schedules[index].schedule.push(
      { start: null, end: null, slotLimit: null }
    );
  }

  removeSlot(index: number, sIndex: number) {
    console.log(index, sIndex);
    this.booking.scheduleData.schedules[index].schedule.splice(sIndex, 1);
  }

  removeTimeSchedule(slotIndex: number, timeIndex: number) {
    this.booking.scheduleData.schedules[slotIndex].schedule.splice(timeIndex, 1);
  }

  getSelectOption(myIndex: number, indexArray: any) {
    for (let index of indexArray) {
      let slotData = JSON.parse(JSON.stringify(this.booking.scheduleData.schedules[myIndex].schedule));
      if (this.booking.scheduleData.schedules[index].schedule == 0) {
        this.booking.scheduleData.schedules[index].schedule = [...slotData];
      } else {
        this.booking.scheduleData.schedules[index].schedule.push(...slotData);
      }
    }
  }

  customActionSheetOptions: any = {
    // header: 'Copy',
    subHeader: 'COPY ITEMS TO...',
  };

  async slotValidation() {
    for (let scheduleArray of this.booking.scheduleData.schedules) {
      if (scheduleArray.schedule.length > 0) {
        for (let schedule of scheduleArray.schedule) {
          if (!schedule.start || !schedule.end || schedule.slotLimit === null) {
            this.slotValid = false;
            break;
          } else {
            this.slotValid = true;
          }
        }
      }
      if (!this.slotValid) {
        break;
      }
    }
    console.log('slotValid', this.slotValid);
  }

  durationValidation() {
    if (
      this.booking.scheduleData.duration.months === null
      || this.booking.scheduleData.duration.days === null
      || this.booking.scheduleData.duration.hours === null
      || this.booking.scheduleData.duration.minutes === null
    ) {
      // console.log('false');
      return false;
    } else {
      // console.log('true');
      return true;
    }
  }

  // ? Schedule Functions End

  // ? Vendors Start
  addVendor(e: any) {
    this.booking.vendorId = e.target.value;
  }
  // ? Vendors End

  removeSubscriptions() {
    this.events.unsubscribe('booking:addSuccess');
    this.events.unsubscribe('booking:addFailure');
    this.events.unsubscribe('booking:editSuccess');
    this.events.unsubscribe('booking:editFailure');
    this.events.unsubscribe('product-options:editSuccess');
    this.events.unsubscribe('product-options:editFailure');
    this.events.unsubscribe('booking:deleteSuccess');
    this.events.unsubscribe('booking:deleteFailure');
    this.events.unsubscribe('booking:publishAllCategoriesForAdmin');
    this.events.unsubscribe('booking:publishgetProductWithId');
    this.events.unsubscribe('product-options:publishOptionData');
    this.events.unsubscribe('product-options:deleteProductOptionSuccess');
    this.events.unsubscribe('brands:publishAllBrandsForAdmin');
    this.events.unsubscribe('brands:noBrandAvailableForAdmin');
    this.events.unsubscribe('booking:noCategoryAvailable');
    this.events.unsubscribe('vendor:getVendorNameSuccess');
  }

}
