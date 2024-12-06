import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, Events, ModalController } from '@ionic/angular';
import { LabelService } from 'src/app/services/label/label.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { VendorProductsPage } from 'src/app/admin/multi-vendor/vendor-products/vendor-products.page'
import { ProductService } from 'src/app/services/product/product.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { BrandsService } from 'src/app/services/brands/brands.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { ViewOrderPage } from 'src/app/admin/admin-home/view-order/view-order.page';
import { ExportToCsv } from 'export-to-csv';
import { AreaModalPage } from '../../../admin/delivery-settings/area-modal/area-modal.page';
import { ImageEditorComponent } from 'src/app/components/image-editor/image-editor.component';
import { CategoriesService } from 'src/app/services/categories/categories.service';
@Component({
  selector: 'app-multi-vendor-add',
  templateUrl: './multi-vendor-add.page.html',
  styleUrls: ['./multi-vendor-add.page.scss'],
})
export class MultiVendorAddPage implements OnInit {
  SHARED_LABELS: any;
  ADD_VENDOR_LABELS: any;
  headerText: any;
  vendor: any
  pincode: number;
  regions = [];
  regionsAvailable = [];
  receivedVendorData: any = []
  currentRegion: any = ""
  vendors = []
  totalOrderAmt = 0;
  buttonActive = 'Profile';

  vendorDetails = {
    appointmentSlotLimit: 0,
    displayName: '',
    description: '',
    minOrderAmount:0,
    deliveryIntegration: {
      pickupId: ''
  },
    address: '',
    approveAllProducts: false,
    name: '',
    phoneNo: '',
    image: {
      url: '',
      mob: '',
      thumb: ''
    },
    isExclusive: false,
    vendorAddress: {
      address: {
        address: '',
        city: '',
        state: '',
        pincode: '',
      }
    },
    showUserDetails: false,
    productLimit: null,
    qrCode: ''
  }
  loader: any;
  categories: any;
  searchCategory: string = '';
  searchBrand: string = '';
  showNoCategories: boolean = false;
  showCategoriesLoader: boolean = true;
  listOfSubcategories = {};
  listOfSubcategoriesInView: any = {};
  selectedCategories: any[] = [];
  showNoBrands: boolean = false;
  brands = [];
  selectedBrands: any[] = [];
  slug = {
    name:'',
    updatedAt: new Date(),
    updatedBy: 'admin'
  }
  isUniversal = false;

  // Invoice Tab
  multipleVendorInvoices = false;
  invoiceSettings = {
    logo: {
      adminLogo: true,
      url: ''
    },
    billingName: '',
    address: '',
    phoneNo: '',
    gstNo: '',
    panNo: '',
    signature: '',
    customMessage: ''
  }

  // Products Tab
  commissionType = 'productWise';
  singleCommission;
  showNoProducts: boolean = false;
  loading: any;
  productsData: any[] = [];
  allProductsData: any[] = [];

  // Orders Tab
  orders = [];
  noMoreOrders: boolean = false;

  // Reports Tab
  endDate = new Date().toISOString();
  tempDate = new Date();
  startDate = new Date(this.tempDate.setDate(this.tempDate.getDate() - 7)).toISOString();
  reports = [];
  details = [];
  activeProjectIndex: number = 0;
  totalPrice = 0;
  totalCommission = 0;
  currencyCode: any;
  startOrders = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  endOrders = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000))
  currentDays = 7
  subOfSubCategories = {};
  subOfSubCategoryToggle = {}; 
  searchProduct: string = '';
  vendorOrdersLoading = false;
  activeTab = '';
  constructor(private events: Events,
    private labelService: LabelService,
    private router: Router,
    private route: ActivatedRoute,
    private modalController: ModalController, private productService: ProductService, private vendorService: VendorService, private brandService: BrandsService, private orderService: OrderService,
    public sharedService: SharedService, private configService: ConfigService, private alertController: AlertController,
    private categoryService: CategoriesService
    ) {
    this.route.queryParams.subscribe(async (params) => {
      console.log(params)
      if (this.router.getCurrentNavigation().extras.state) {
        const recieveData = await this.router.getCurrentNavigation().extras.state.data
        if (recieveData) {
          this.vendor = recieveData.vendorData.id;
          this.vendorDetails.name = recieveData.vendorData.name;
          this.vendorDetails.description = recieveData.vendorData.description || "";
          this.vendorDetails.phoneNo = recieveData.vendorData.phoneNo;
          this.vendors = recieveData.vendorList
          console.log(this.vendors)
          console.log('this.vendor', this.vendor);
        }
      }
    });
  }

  ngOnInit() {
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.ADD_VENDOR_LABELS = this.labelService.labels['ADD_VENDOR'];
    if (this.vendor && this.vendor.name) {
      this.headerText = this.ADD_VENDOR_LABELS['header_text_2'];
    } else {
      this.headerText = this.ADD_VENDOR_LABELS['header_text_1'];
    }
    this.currencyCode = this.configService.environment.currencyCode;
    this.isUniversal = this.sharedService.isUniversal();
    this.details = [
      'Profile','Categories & Brands','Settings', 'Region'
    ]
  }

  async ionViewWillEnter() {
    this.initializeSubscriptions();
    this.events.publish('vendor:getVendorData', this.vendor);
    this.events.publish('product:getAllCategories');
    //this.events.publish('brands:getAllBrandsForAdmin');
    if (this.activeTab == 'products') {
      await this.loadProducts();
    }
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  async initializeSubscriptions() {
    this.events.subscribe('vendor:vendorSaved', () => {
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
      this.sharedService.presentAlert("Vendor saved !");
    });
    this.events.subscribe('multi-region:publishAllActiveRegions', (regions) => {
      if (regions.length) {
        this.regions = regions;
        this.regionsAvailable = regions;
        console.log('this.regionsAvailable:', this.regionsAvailable);
        for (let i = 0; i < regions.length; i++) {
          // if (!regions[i]['vendorId']) {
          //   this.regionsAvailable.push(regions[i])
          // }
          if (regions[i]['id'] == this.receivedVendorData.regionId) {
            this.currentRegion = regions[i]['name']
          }
        }
      }

    });
    this.events.subscribe('vendor:changeRegionSuccess', () => {
      this.sharedService.presentAlert("Region saved successfully !");
      this.events.publish('multi-region:getAllActiveRegions');
    });
    this.events.subscribe('vendor:getVendorDataSuccess', (receivedData) => {
      this.receivedVendorData = receivedData;
      this.vendorDetails.appointmentSlotLimit = receivedData.appointmentSlotLimit ? receivedData.appointmentSlotLimit : 0;
      this.vendorDetails.minOrderAmount = receivedData.minOrderAmount ? receivedData.minOrderAmount : 0;
      this.vendorDetails.displayName = receivedData.displayName ? receivedData.displayName : '';
      this.vendorDetails.description = receivedData.description ? receivedData.description : '';

      this.vendorDetails.address = receivedData.address ? receivedData.address : '';
      this.vendorDetails.productLimit = 'productLimit' in receivedData ? receivedData.productLimit : null;
      if (receivedData.vendorAddress) {
        this.vendorDetails.vendorAddress = receivedData.vendorAddress
      }
      this.vendorDetails.approveAllProducts = receivedData.approveAllProducts ? receivedData.approveAllProducts : false;
      console.log('revievedData:', receivedData);
      this.vendorDetails.qrCode = receivedData.qrCode ? receivedData.qrCode : '';
      if (receivedData.image) {
        this.vendorDetails.image = receivedData.image
      }

      if (receivedData.deliveryIntegration) {
        this.vendorDetails.deliveryIntegration = receivedData.deliveryIntegration
      }

      if (receivedData.isExclusive) {
        this.vendorDetails.isExclusive = receivedData.isExclusive
      }
      if (receivedData.showUserDetails) {
        this.vendorDetails.showUserDetails = receivedData.showUserDetails;
      }
      if (this.isUniversal) {
        this.slug =  "slug" in receivedData ? receivedData.slug : this.slug;
      }
      this.selectedCategories = receivedData.categories ? receivedData.categories : [];
      this.selectedBrands = receivedData.brands ? receivedData.brands : [];
      this.invoiceSettings = 'invoiceSettings' in receivedData ? receivedData.invoiceSettings : this.invoiceSettings;
      console.log(this.vendorDetails)
      this.events.publish('multi-region:getAllActiveRegions');
    });
    this.events.subscribe('vendor:changeActiveStatusVendorSuccess', () => {
      this.sharedService.presentAlert("Status changed successfully !");
    });
    this.events.subscribe('vendor:removeRegionSuccess', () => {
      this.sharedService.presentAlert("Region removed successfully !");
      this.currentRegion = ''
    });
    const multiVendorSettings: any = await this.vendorService.getActiveStatus('service');
    if (multiVendorSettings) {
      this.multipleVendorInvoices = multiVendorSettings.multipleVendorInvoices;
    }
    // Categories & brands in Details Tab
    this.events.subscribe('product:publishAllCategoriesForAdmin', (categories) => {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.categories = categories;
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
    // this.events.subscribe('brands:publishAllBrandsForAdmin', (brands) => {
    //   if (this.loader) {
    //     this.loader.dismiss();
    //   }
    //   this.showNoBrands = false;
    //   this.brands = brands;
    //   console.log('brands for admin:', this.brands);
    // });
    // this.events.subscribe('brands:noBrandAvailableForAdmin', () => {
    //   if (this.loader) {
    //     this.loader.dismiss();
    //   }
    //   this.showNoBrands = true;
    // });
    const brands: any = await this.brandService.getAllBrands();
    if (brands && brands.length) {
      if (this.loader) {
        this.loader.dismiss();
      }
      this.showNoBrands = false;
      this.brands = brands;
      console.log('brands for admin:', this.brands);
    } else{
      if (this.loader) {
        this.loader.dismiss();
      }
      this.showNoBrands = true;
    }

    // Orders Tab
    this.events.subscribe('vendor:NoOrders', () => {
      this.noMoreOrders = true;
    });

    this.events.subscribe('vendor:OrdersLimitReached', () => {
      this.noMoreOrders = true;
    });

    this.events.subscribe('vendor:getMoreVendorOrdersSuccess', async (orders) => {
      for (let order of orders) {
        order['details'] = await this.orderService.getOrderDetails(order.order.id);
        let productAmt = 0
        for (let product of order.details['products']) {
          if (product.vendorStatus) {
            if (product.vendorStatus.id == this.vendor) {
              if (product.pack && product.pack.variantType && product.pack.variantType == "pieces") {
                productAmt += product.pack.price * product.quantity
              }
              else {
                productAmt += product.price * product.quantity
              }
            }
          }
        }
        order.details.totalAmountToPaid = productAmt
        this.totalOrderAmt += productAmt
      }
      this.orders = this.orders.concat(orders);
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
    });
  
    // Main Product
    this.events.subscribe('product:editSuccess', (heading, desc) => {
      this.sharedService.loading.dismiss();
      this.events.unsubscribe('product:editSuccess');
      this.presentAlert(desc);
    });
    this.events.subscribe('product:editFailure', (heading, desc) => {
      this.sharedService.loading.dismiss();
      this.events.unsubscribe('product:editFailure');
      this.presentAlert(desc);
    });

    // Bookings
    this.events.subscribe('booking:editSuccess', (heading, desc) => {
      this.sharedService.loading.dismiss();
      this.events.unsubscribe('booking:editSuccess');
      this.presentAlert(desc);
    });
    this.events.subscribe('booking:editFailure', (heading, desc) => {
      this.sharedService.loading.dismiss();
      this.events.unsubscribe('booking:editFailure');
      this.presentAlert(desc);
    });

    // Food
    this.events.subscribe('food-item:editSuccess', (heading, desc) => {
      this.sharedService.loading.dismiss();
      this.events.unsubscribe('food-item:editSuccess');
      this.presentAlert(desc);
    });
    this.events.subscribe('food-item:editFailure', (heading, desc) => {
      this.sharedService.loading.dismiss();
      this.events.unsubscribe('food-item:editFailure');
      this.presentAlert(desc);
    });

    // Voucher
    this.events.subscribe('voucher:editSuccess', (heading, desc) => {
      this.sharedService.loading.dismiss();
      this.events.unsubscribe('voucher:editSuccess');
      this.presentAlert(desc);
    });
    this.events.subscribe('voucher:editFailure', (heading, desc) => {
      this.sharedService.loading.dismiss();
      this.events.unsubscribe('voucher:editFailure');
      this.presentAlert(desc);
    });

    // Showcase
    this.events.subscribe('showcase:editSuccess', (heading, desc) => {
      this.sharedService.loading.dismiss();
      this.events.unsubscribe('showcase:editSuccess');
      this.presentAlert(desc);
    });
    this.events.subscribe('showcase:editFailure', (heading, desc) => {
      this.sharedService.loading.dismiss();
      this.events.unsubscribe('showcase:editFailure');
      this.presentAlert(desc);
    });

  }

  // Products Tab
  async loadProducts() {
    //this.sharedService.presentLoading();
    let products = await this.productService.getVendorProducts(this.vendor);
    for (let product of products) {
      //product['approved'] = product['approved'] ? product['approved'] : this.vendorDetails.approveAllProducts;
      product['commission'] = product['commission'] ? product['commission'] : 0;
    }
    this.productsData = products;
    if (this.productsData.length == 0) {
      this.showNoProducts = true;
    }
    if (this.loading) {
      this.loading.dismiss();
    }

    // this.events.subscribe('product:editSuccess', (status, msg) => {
    //   this.sharedService.presentAlert(msg);
    // });
  }

  // Orders Tab
  async loadOrders() {
    this.vendorOrdersLoading = true;
    // this.sharedService.presentLoading();
    //this.events.publish('vendor:getVendorOrders', this.vendor);
    this.totalOrderAmt = 0;
    const orders = await this.vendorService.getVendorOrders(this.vendor, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders);
    await this.processVendorOrders(orders);
    this.vendorOrdersLoading = false;
  }

  async processVendorOrders(orders) {
    for (let order of orders) {
      order['details'] = await this.orderService.getOrderDetails(order.order.id);
      let productAmt = 0
      for (let product of order.details['products']) {
        if (product.vendorStatus) {
          if (product.vendorStatus.id == this.vendor) {
            if (product.pack && product.pack.variantType && product.pack.variantType == "pieces") {
              productAmt += product.pack.price * product.quantity
            }
            else {
              productAmt += product.price * product.quantity
            }
          }
        }
      }
      order.details.totalAmountToPaid = productAmt
      this.totalOrderAmt += productAmt
    }
    this.orders = orders;
  }

  async loadMoreOrders(event) {
    await this.vendorService.loadMoreVendorOrders(this.vendor, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders);
    setTimeout(() => {
      event.target.complete();
    }, 1000);
    if (this.noMoreOrders === true) {
      event.target.disabled = true;
    }
  }

  filterOrder() {
    if (!this.startDate && !this.endDate) {
      let days = (<HTMLInputElement>document.getElementById('days')).value;
      this.currentDays = parseInt(days)
      this.endOrders = new Date(new Date().getTime() - (this.currentDays * 24 * 60 * 60 * 1000))
      this.loadOrders()
    }
    else if (!this.startDate || !this.endDate) {
      this.presentAlert('Please enter both start date and end date')
    }
    else {
      this.startOrders = new Date(this.endDate)
      this.endOrders = new Date(this.startDate)
      this.loadOrders()
    }
  }

  clearFilter() {
    this.startDate = undefined
    this.endDate = undefined
    this.currentDays = 7
    this.startOrders = new Date()
    this.endOrders = new Date(new Date().getTime() - (this.currentDays * 24 * 60 * 60 * 1000))
    this.loadOrders()
  }

  // Reports Tab
  async loadReports() {
    this.events.subscribe('reports:getReportSuccess', (reports) => {
      this.totalPrice = 0;
      this.totalCommission = 0;
      console.log('reports:', reports);
      this.reports = reports.filter(report => report.id === this.vendor);
      for (const report of this.reports) {
        for (const product of report.products) {
          this.totalCommission += product.commission;
          this.totalPrice += product.sales;
        }
      }
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
    });
    this.getReport();
  }

  addRegion(e) {
    this.events.publish('vendor:changeRegion', e.target.value, this.vendor);
  }

  removeRegion() {
    this.events.publish('vendor:removeRegion', this.vendor);
  }

  toggleActive() {
    this.receivedVendorData.active = !this.receivedVendorData.active;
    this.events.publish('vendor:changeActiveStatusVendor', this.vendor, this.receivedVendorData.active);
  }

  async saveVendor() {
    if (this.isUniversal) {
      const slugName = this.sharedService.createSlugName(this.slug.name);
      const sameSlugExists = await this.sharedService.sameSlugExists('vendors', this.vendor, slugName);
      if (sameSlugExists) {
        this.presentAlert('Same slug already exists, please try with another slug name');
        return;
      } else {
        this.vendorDetails['slug'] = {
          name: slugName,
          updatedAt: new Date(),
          updatedBy: 'admin'
        }
      }
    }
    await this.sharedService.presentLoading();
    let obj = { ...this.vendorDetails }
    obj['categories'] = this.selectedCategories;
    obj['brands'] = this.selectedBrands;
    obj['invoiceSettings'] = this.invoiceSettings;
    this.events.publish('vendor:saveVendor', this.vendor, obj);
  }

  copyProducts() {
    this.modalController.create({
      component: VendorProductsPage,
      cssClass: 'custom-modal',
      componentProps: {
        'vendorId': this.vendor,
        'vendorList': this.vendors
      }
    })
      .then(modalEl => {
        modalEl.present();
      });
  }

  removeSubscriptions() {
    this.events.unsubscribe('vendor:vendorSaved');
    this.events.unsubscribe('multi-region:publishAllActiveRegions');
    this.events.unsubscribe('vendor:changeRegionSuccess');
    this.events.unsubscribe('vendor:getVendorDataSuccess');
    this.events.unsubscribe('vendor:changeActiveStatusVendorSuccess');
    this.events.unsubscribe('vendor:removeRegionSuccess');
    this.events.unsubscribe('reports:getReportSuccess');

    this.events.unsubscribe('product:editSuccess');
    this.events.unsubscribe('product:editFailure');

    this.events.unsubscribe('booking:editSuccess');
    this.events.unsubscribe('booking:editFailure');

    this.events.unsubscribe('food-item:editSuccess');
    this.events.unsubscribe('food-item:editFailure');

    this.events.unsubscribe('voucher:editSuccess');
    this.events.unsubscribe('voucher:editFailure');

    this.events.unsubscribe('showcase:editSuccess');
    this.events.unsubscribe('showcase:editFailure');
  }

  // Details Tab
  async getSubcategories(cid) {
    if (!this.listOfSubcategories.hasOwnProperty(cid)) {
      let subcategories = []
      subcategories = await this.productService.getSubcategoriesInNewProduct(cid);
      this.listOfSubcategories[cid] = subcategories;
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

      this.subOfSubCategories[subCatId] = subOfSubCategoriesData;
      this.subOfSubCategoryToggle[subCatId] = { active: true };
      // console.log('subOfSubCategories:', this.subOfSubCategories);
    } else {
      this.subOfSubCategoryToggle[subCatId].active = !this.subOfSubCategoryToggle[subCatId].active;
      // console.log('subOfSubCategoryToggle:', this.subOfSubCategoryToggle[subCatId]);
    }
  }

  onClickCategoryCheckBox(cid: string) {
    if (this.selectedCategories.indexOf(cid) === -1) {
      this.selectedCategories.push(cid);
      // if (catIdForSubCat && this.selectedCategories.indexOf(catIdForSubCat) === -1) {
      //   this.selectedCategories.push(catIdForSubCat);
      // }
    } else {
      const cidIndex = this.selectedCategories.indexOf(cid);
      this.selectedCategories.splice(cidIndex, 1);
      // if (catIdForSubCat && this.selectedCategories.indexOf(catIdForSubCat) === -1) {
      //   this.selectedCategories.push(catIdForSubCat);
      // }
      // if (catIdForSubCat) {
      //   const index = this.selectedCategories.indexOf(catIdForSubCat);
      //   this.selectedCategories.splice(index, 1);
      // }
    }
  }
  onClickBrandCheckBox(bid: string) {
    if (this.selectedBrands.indexOf(bid) === -1) {
      this.selectedBrands.push(bid);
    } else {
      const bidIndex = this.selectedBrands.indexOf(bid);
      this.selectedBrands.splice(bidIndex, 1);
    }
  }
  editCheckBoxValue(id: string) {
    if (this.selectedCategories.indexOf(id) !== -1) {
      return true;
    } else {
      return false;
    }
  }
  editBrandCheckBoxValue(id: string) {
    if (this.selectedBrands.indexOf(id) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  // Products Tab
  selectCommissionType(commissionType) {
    this.commissionType = commissionType;
  }

  async setCommission() {
    await this.sharedService.presentLoading()
    for (const product of this.productsData) {
      product.commission = this.singleCommission;
      await this.vendorService.setCommissionForProduct(product.id, this.singleCommission)
    }
    await this.sharedService.loading.dismiss()
    await this.sharedService.presentAlert('Commission set for all products!')
  }

  async saveProduct(productData, itemID) {
    await this.sharedService.presentLoading();
    productData.status = productData.approved ? productData.approved : productData.status ;
    console.log("product : ", productData);

    if (productData.productType == "booking") {
      this.events.publish('booking:editProduct', productData, itemID, [], '');
    }
    else if (productData.productType == "food") {
      this.events.publish('food-item:editProduct', productData, itemID, [], '');
    }
    else if (productData.productType == "voucher") {
      this.events.publish('voucher:editProduct', productData, itemID, [], '');
    }
    else if (productData.productType == "showcase") {
      this.events.publish('showcase:editProduct', productData, itemID, [], '');
    }
    else {
      this.events.publish('product:editProduct', productData, itemID, [], '');
    }

  }

  // Reports Tab

  getReport() {
    let startingDate = new Date(this.startDate);
    let endingDate = new Date(this.endDate);
    const diffInMs = Math.abs(endingDate.getTime() - startingDate.getTime());
    const differenceInDays = diffInMs / (1000 * 60 * 60 * 24);
    if (differenceInDays <= 30) {
      this.sharedService.presentLoading();
      this.events.publish('reports:getReport', new Date(this.startDate), new Date(this.endDate), 'vendors');
    } else {
      this.sharedService.presentAlert('End date cannot be more than 1 month of start Date');
    }
  }

  exportReport() {
    var data = [];
    this.reports.forEach((report) => {
      for (const product of report.products) {
        let obj = {
          product: product.name,
          sales: product.sales,
          items: product.quantity,
          commission: product.commission,
        };
        data.push(obj);
      }
    });
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      filename: `Vendor Report (${this.vendorDetails.name})`,
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }

  onClickViewOrder(orderId) {
    this.modalController.create({
      component: ViewOrderPage,
      cssClass: 'view-order-css',
      componentProps: {
        orderId: orderId
      }
    }).then(modal => modal.present());
  }



  async uploadImage(files: FileList) {
    // const modal = await this.modalController.create({
    //   component: ImageEditorComponent,
    //   componentProps: {
    //     aspectRatioWidthVal: 1,
    //     aspectRatioHeightVal: 1,
    //   },
    //   cssClass: 'custom-img-editor'
    // })
    // await modal.present();
    // modal.onDidDismiss().then(res => {
    //   this.vendorDetails.image.url = res.data || '';
    // })
    //console.log(type);
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event:any) => { 
        let base64Image:any = event.target.result;
        this.vendorDetails.image.url = base64Image;
      }
    }
  }

  removeImage() {
    this.vendorDetails.image.url = '';
    this.vendorDetails.image.mob = '';
    this.vendorDetails.image.thumb = '';
  }

  async openAreaModal() {
    const modal = await this.modalController.create({
      component: AreaModalPage,
      cssClass: 'custom-modal big-modal',
      backdropDismiss: false,
    });
    modal.onDidDismiss()
      .then((res) => {
        if (res.data && res.data.lat != 0 && res.data.lng != 0) {
          this.vendorDetails.vendorAddress['lat'] = res.data.lat
          this.vendorDetails.vendorAddress['lng'] = res.data.lng
          this.vendorDetails.vendorAddress['address'] = res.data.address
        }
      });
    await modal.present();
  }

  selectDate(dateSelected) {
    this.startDate = undefined
    this.endDate = undefined
    this.currentDays = dateSelected
    this.startOrders = new Date()
    this.endOrders = new Date(new Date().getTime() - (this.currentDays * 24 * 60 * 60 * 1000))
    this.loadOrders()
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
        }
      }]
    });
    await alert.present();
  }

  showUserDetailsToVendor() {
    this.vendorDetails.showUserDetails = !this.vendorDetails.showUserDetails;
  }

  checkProductToDeliver() {
    const navigationExtras: NavigationExtras = {
      state: {
        vendorId: this.vendor
      }
    }
    this.router.navigate(['products-to-deliver'], navigationExtras);
  }

  showAdminLogoToggle(){
    this.invoiceSettings.logo.adminLogo = !this.invoiceSettings.logo.adminLogo;
  }

  
  uploadInvoiceImg(files: FileList, imgType) {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        let base64Image: any = event.target.result;
        if (imgType === 'sign') {
          this.invoiceSettings.signature = base64Image;
        } else {
          this.invoiceSettings.logo.url = base64Image;
        }
      }
    }
  }

  removeImg(imgType: string) {
    if (imgType === 'sign') {
      this.invoiceSettings.signature = '';
    } else {
      this.invoiceSettings.logo.url = '';
    }
  }

  onClickStatustItem(index,name){
    this.activeProjectIndex = index;
    console.log(name);
    this.buttonActive = name;
  }
  
  openImg(url) {
    window.open(url, "_blank");
  }

  async editProduct(item: any) {
    this.activeTab = 'products';
    if (item.productType == 'appointment') {
      const navigationExtras: NavigationExtras = {
        state: {
          productData: item,
          productId: item.id,
        }
      };
      this.router.navigate(['appointment'], navigationExtras);
    }
    else {
      const navigationExtras: NavigationExtras = {
        state: {
          product: item,
          productId: item.id,
          type: item.productType,
          routeFromCategories: true
        }
      };
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
  }

}
