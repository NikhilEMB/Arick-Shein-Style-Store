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
import { UsersModalPage } from '../../users-modal/users-modal.page';
import { ImageEditorComponent } from 'src/app/components/image-editor/image-editor.component';
import { MultiRegionService } from 'src/app/services/multi-region/multi-region.service';
import { FoodItem } from 'src/app/models/food-item';
import { FoodItemService } from 'src/app/services/food-item/food-item.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-create-food-item',
  templateUrl: './create-food-item.page.html',
  styleUrls: ['./create-food-item.page.scss'],
})
export class CreateFoodItemPage implements OnInit {

  // Food Object Start
  food: FoodItem = {
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
    allowPayment: false,
    regions: [],
    templateId: '',
    productType: 'food',
    foodType: '',
    slug: {
      name: null,
      updatedAt: new Date(),
      updatedBy: 'admin'
    }
  };
  // Food Object End

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
  foodTypes = ['none', 'veg', 'non-veg', 'only-egg'];
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
    private foodItemService: FoodItemService,
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
        this.food['approved'] = true;
        this.food.status = true;
      } else {
        this.food['approved'] = false;
        this.food.status = false;
      }
    }
    this.imagesLimit = this.configService.environment.productImageLimit;
    this.events.publish('food-item:getAllCategories');
    this.events.publish('brands:getAllBrandsForAdmin');
    this.events.publish('variants:getVariantsTypeData');
    this.devWidth = this.platform.width();
    if (this.editProductId) {
      this.events.publish('food-item:getProductWithId', this.editProductId);
      this.events.publish('food-item:getAllSubCategories');
      this.getSections()
    }
    this.taxType = this.configService.environment.taxType;
    this.subscriptionFeature = this.configService.environment.subscriptionFeature;
    this.limitedTimeDeal = this.configService.environment.limitedTimeDeal;
    this.multiRegion = this.configService.environment.multiRegion;
    if (this.multiRegion) {
      this.events.publish('multi-region:getActiveStatus');
      this.events.publish('multi-region:getAllActiveRegions');
      this.multiRegionData = await this.multiRegionService.getAllActiveRegions('service');
      // console.log('multiRegionData:', this.multiRegionData);

      // ? Creating and Updating Region Start
      if (this.food.regions.length == 0) {
        this.createDefaultRegion();
      } else {
        this.updateRegion()
      }
      // ? Creating and Updating Region End

    }
    this.events.publish('filters:getActiveStatus');
    this.sideMenu.push(
      'Cash on Delivery',
      'Extra Charges',
      'Subscription',
      'Limited Time Deal',
      'Specific User Discount',
      'Seo for Website',
      'Regions',
      'Add Ons',
      'Slug Name'
      // 'Clone Service',
    );

  }

  createDefaultRegion() {
    console.log("loopStart");
    for (let region of this.multiRegionData) {
      this.food.regions.push(
        {
          name: region.name,
          id: region.id,
          active: false,
          price: null,
          discountedPrice: null,
          qty: null,
        }
      )
    }
  }

  updateRegion() {
    let newRegions = this.multiRegionData.filter(newRegion =>
      !this.food.regions.find(region => newRegion.id == region.id)
    );
    let removeRegions = this.food.regions.filter(oldRegion =>
      !this.multiRegionData.find(region2 => oldRegion.id == region2.id)
    );
    if (newRegions.length > 0) {
      console.log('new region:', newRegions);
      for (let newRegion of newRegions) {
        this.food.regions.push(
          {
            name: newRegion.name,
            id: newRegion.id,
            active: false,
            price: null,
            discountedPrice: null,
            qty: null,
          }
        )
      }
    }
    if (removeRegions.length > 0) {
      console.log('update region:', removeRegions);
      for (let region of removeRegions) {
        let index = this.food.regions.findIndex(oldRegion => oldRegion.id == region.id);
        console.log('name:', index);
        this.food.regions.splice(index, 1);
      }
    }
  }

  toggleRegion(index: number) {
    this.food.regions[index].active = !this.food.regions[index].active;
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  async initializeSubscriptions() {
    this.events.subscribe('food-item:publishgetProductWithId', (data) => {
      data = this.getUpdatedFields(data);
      this.food = data;
      if (!this.food.deal.specificUsers) {
        this.food.deal.specificUsers = this.food.deal.specificUsers;
      }
    })
    this.events.subscribe('food-item:addSuccess', (heading, desc) => {
      this.loader.dismiss();
      this.presentAlert(heading, desc, true);
      this.food.prodName = null;
      this.food.prodDesc = null;
      this.food.prodPrice = null;
      this.listOfBase64Image = [];
      this.selectedCategories = [];
      this.selectedBrands = [];
    });
    this.events.subscribe('food-item:addFailure', (heading, desc) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert(heading, desc);
    });
    this.events.subscribe('food-item:editSuccess', async (heading, desc) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      await this.presentAlert(heading, desc, true);
    });
    this.events.subscribe('food-item:editFailure', (heading, desc) => {
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
    this.events.subscribe('food-item:deleteSuccess', (heading, msg) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this._location.back();

    });
    this.events.subscribe('food-item:deleteFailure', (heading, msg) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.presentAlert(heading, msg);
    });
    this.events.subscribe('food-item:publishAllCategoriesForAdmin', async (categories) => {
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
    this.events.subscribe('food-item:noCategoryAvailable', () => {
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

      this.food = option;
      if (!this.food.deal.specificUsers) {
        this.food.deal.specificUsers = this.food.deal.specificUsers;
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

    let res = await this.foodItemService.getTemplates();
    if (res) {
      this.templatesArray = res;
      // console.log(this.templatesArray);
    }

  }

  changeTemplate(value: string) {
    console.log(value);
    this.food.templateId = value;
  }

  changeFoodType(value: string) {
    console.log(value);
    this.food.foodType = value;
    console.log(this.food);
  }

  editShowDisable() {
    if (this.userRole == 'vendor') {
      if (this.food.approved) {
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
    alreadyAdded = this.food.deal.specificUsers.users ? this.food.deal.specificUsers.users : [];
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
        if (this.food) {
          this.food.deal.specificUsers.users = res.data;
        } else {
          this.food.deal.specificUsers.users = res.data;
        }
      }
      console.log('this.food.deal.specificUsers:', this.food.deal.specificUsers.users);
    });
    await modal.present();
  }

  async removeUser(i) {
    this.food.deal.specificUsers.users.splice(i, 1);
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

  async saveFoodItem() {
    if (this.food.deal.specificUsers.active) {
      for (const user of this.food.deal.specificUsers.users) {
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
    if (this.food.coverPic && !this.food.coverPic.url) {
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
    if (this.food.discountedPrice === null) {
      this.food.discountedPrice = this.food.prodPrice;
    }
    this.food.discount = parseFloat((((this.food.prodPrice - this.food.discountedPrice) / this.food.prodPrice) * 100).toFixed(2));
    if (this.food.productCode != '') {
      let prodCode: any = await this.foodItemService.checkProductSKU(this.food.productCode, this.editProductId);
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
          this.presentAlert('', `Please enter a unique food Code - Matching food are :- ${matchingProds}`);
          return;
        }
      }
    }

    if (this.food.prodName === null || this.food.prodName === '') {
      this.presentAlert('', 'Please enter food name');
    }
    else if (!this.food.prodPrice) {
      this.presentAlert('', 'Please enter food price');
    }
    else if (this.food.productCode === null || this.food.productCode === '') {
      this.presentAlert('', 'Please enter food Code');
    }
    else if (this.food.prodDesc === null || this.food.prodDesc === '') {
      this.presentAlert('', 'Please enter food description');
    }
    else if (!(this.food.categories && this.food.categories.length) && !(this.food.brands && this.food.brands.length)) {
      this.presentAlert('', 'Please select any category or brand');
    }
    else if (this.coverValue === false) {
      this.presentAlert('', 'Please make any one image as cover picture');
    }
    else if (this.food.gst && this.food.gst > 100) {
      this.presentAlert('', `${this.taxType} value must be less than 100`);
    }

    else {
      await this.presentLoading();
      this.food.createdAt = new Date();
      this.food.updatedAt = new Date();
      this.food.sortedAt = new Date();
      this.food.nameToSearch = this.food.prodName.toLowerCase();
      if (!this.food.prodPrice) {
        this.food.prodPrice = null;
      }
      if (this.isUniversal && this.editProductId) {
        const slugName = this.sharedService.createSlugName(this.food.slug.name);
        const sameSlugExists = await this.sharedService.sameSlugExists('products', this.food, slugName);
        if (sameSlugExists) {
          this.presentAlert('', 'Same slug already exists, please try with another slug name');
          return;
        } else {
          this.food.slug = {
            name: slugName,
            updatedAt: new Date(),
            updatedBy: 'admin'
          }
        }
      }
      if (this.editProductId) {
        console.log('edit prod');
        this.events.publish('food-item:editProduct', this.food, this.editProductId, this.listOfBase64Image, this.needToUpdateImages);
      } else {
        console.log('new prod');
        this.events.publish('food-item:addProduct', this.food, this.listOfBase64Image);
      }
    }
  }

  updateNewProductStatus(status: boolean) {
    // console.log('this.food.approved:', this.food.approved);
    if (this.userRole == 'vendor' && !this.food.approved) {
      this.presentAlert('Alert', 'You cannot make this food active as it is not approved by Admin.');
      return;
    }
    if (status === true) {
      console.log('status=false');
      this.food.status = false;
    } else {
      console.log('status=true');
      this.food.status = true;
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
    const editImgData = this.food.images[index];
    this.food.coverPic = editImgData;
    for (let i = 0; this.listOfBase64Image.length; i++) {
      this.listOfBase64Image[i].cover = false;
    }
  }
  editProductCoverPicInList(index) {
    this.food.coverPic = {
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
    let b = this.food.images[event.detail.from];
    this.food.images[event.detail.from] = this.food.images[event.detail.to];
    this.food.images[event.detail.to] = b;
    this.needToUpdateImages = true;
    event.detail.complete();
  }

  removeEditImageInData(index: number, url: string) {
    this.food.images.splice(index, 1);
    if (url === this.food.coverPic.url) {
      this.food.coverPic = {
        imageId: null,
        mob: null,
        thumb: null,
        url: null,
      };
    }
    this.needToUpdateImages = true;
  }

  cancel() {
    this.router.navigate(['food-items']);
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
    for (const img of this.food.images) {
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
    this.events.publish('food-item:deleteProduct', this.editProductId);
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
    if (this.food.categories) {
      if (this.food.categories.indexOf(cid) === -1) {
        this.food.categories.push(cid);
      } else {
        const cidIndex = this.food.categories.indexOf(cid);
        this.food.categories.splice(cidIndex, 1);
      }
    }
    else {
      this.food.categories = []
      this.food.categories.push(cid);
    }

  }

  onClickBrandCheckBox(bid: string) {
    if (this.food.brands) {
      if (this.food.brands.indexOf(bid) === -1) {
        this.food.brands.push(bid);
      } else {
        const bidIndex = this.food.brands.indexOf(bid);
        this.food.brands.splice(bidIndex, 1);
      }
    }
    else {
      this.food.brands = []
      this.food.brands.push(bid);
    }
  }

  editCheckBoxValue(id: string) {
    if (this.food.categories) {
      if (this.food.categories.indexOf(id) !== -1) {
        return true;
      } else {
        return false;
      }
    }

  }
  editBrandCheckBoxValue(id: string) {
    if (this.food.brands && this.food.brands.length && this.food.brands.indexOf(id) !== -1) {
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
    this.food.allowPayment = !this.food.allowPayment;
  }

  addSearchKeywords() {
    this.food.searchKeywords.push(this.keyword);
    this.keyword = '';
  }

  removeKeyword(i) {
    this.food.searchKeywords.splice(i, 1);
  }

  editProductAddSearchKeywords() {
    this.food.searchKeywords.push(this.keyword);
    this.keyword = '';
  }

  editProductRemoveKeyword(i) {
    this.food.searchKeywords.splice(i, 1);
  }

  stopOrderWhenNoQtyToggle() {
    this.food.stopWhenNoQty = !this.food.stopWhenNoQty;
  }

  editProductStopOrderWhenNoQtyToggle(status) {
    if (status) {
      this.food.stopWhenNoQty = false;
    } else {
      this.food.stopWhenNoQty = true;
    }
  }

  async getSubcategories(cid) {
    if (!this.listOfSubcategories.hasOwnProperty(cid)) {
      let subcategories = []
      subcategories = await this.foodItemService.getSubcategoriesInNewProduct(cid);
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
    if (this.food.discountedPrice === this.food.prodPrice) {
      this.food.discountedPrice = null;
    }
  }

  async onDrop(files: FileList) {
    // console.log('files:', files, '\n imgLimit:', this.imagesLimit);
    //console.log(this.listOfBase64Image,this.food)
    let message = 'Sorry, total' + ' ' + this.imagesLimit.toString() + ' ' + 'images allowed'
    if (this.listOfBase64Image && !this.food && (this.listOfBase64Image.length == this.imagesLimit)) {
      // console.log('here1', this.listOfBase64Image.length)
      this.presentAlert('Upload failed', message)
    }
    else if (this.food && this.food.images && (this.food.images.length == this.imagesLimit)) {
      // console.log('here2')
      this.presentAlert('Upload failed', message)
    }
    else if (this.listOfBase64Image.length && this.food && this.food.images && (this.listOfBase64Image.length + this.food.images.length == this.imagesLimit)) {
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
    this.food.subscription.isAllowed = !this.food.subscription.isAllowed;
  }

  dealIsAllowedToggle() {
    this.food.deal.isAllowed = !this.food.deal.isAllowed;
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
    this.food.isCod = !this.food.isCod
  }

  toggleGstExclusive() {
    this.food.gstExclusive = !this.food.gstExclusive
  }

  toggleExtraCharges() {
    this.food.extraCharges.active = !this.food.extraCharges.active
  }

  toggleChargeQty() {
    this.food.extraCharges.chargeAllQty = !this.food.extraCharges.chargeAllQty
  }

  toggleGstExclusiveEdit() {
    this.food.gstExclusive = !this.food.gstExclusive
  }

  toggleChargeQtyEdit() {
    this.food.extraCharges.chargeAllQty = !this.food.extraCharges.chargeAllQty
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
      data['deal'] = this.food.deal;
    }
    if (!data.hasOwnProperty('extraCharges')) {
      data['extraCharges'] = this.food.extraCharges;
    }
    if (!data.hasOwnProperty('gstExclusive')) {
      data['gstExclusive'] = this.food.gstExclusive;
    }
    if (!data.hasOwnProperty('isCod')) {
      data['isCod'] = this.food.isCod;
    }
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
  //             await this.foodItemService.makeProductClones(clones, this.editProductId);
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

  removeSubscriptions() {
    this.events.unsubscribe('food-item:addSuccess');
    this.events.unsubscribe('food-item:addFailure');
    this.events.unsubscribe('food-item:editSuccess');
    this.events.unsubscribe('food-item:editFailure');
    this.events.unsubscribe('product-options:editSuccess');
    this.events.unsubscribe('product-options:editFailure');
    this.events.unsubscribe('food-item:deleteSuccess');
    this.events.unsubscribe('food-item:deleteFailure');
    this.events.unsubscribe('food-item:publishAllCategoriesForAdmin');
    this.events.unsubscribe('food-item:publishgetProductWithId');
    this.events.unsubscribe('product-options:publishOptionData');
    this.events.unsubscribe('product-options:deleteProductOptionSuccess');
    this.events.unsubscribe('brands:publishAllBrandsForAdmin');
    this.events.unsubscribe('brands:noBrandAvailableForAdmin');
    this.events.unsubscribe('food-item:noCategoryAvailable');
    this.events.unsubscribe('vendor:getVendorNameSuccess');
  }


}
