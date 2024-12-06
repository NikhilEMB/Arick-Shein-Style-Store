import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, Events, LoadingController, AlertController, IonContent, Platform, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { ExportToCsv } from 'export-to-csv';
import { CameraOptions } from '@ionic-native/camera/ngx';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { AddSubcategoriesPage } from "./../add-subcategories/add-subcategories.page";
import * as moment from 'moment';
import { LabelService } from 'src/app/services/label/label.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { BrandsService } from 'src/app/services/brands/brands.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.page.html',
  styleUrls: ['./admin-categories.page.scss'],
})
export class AdminCategoriesPage implements OnInit {
  loading: any;
  loader: any;
  categories: any = [];
  searchCategory: string = '';
  devHeight: any;
  showNoCategories: boolean = false;
  showSearch: boolean = false;
  @ViewChild(IonContent, {static: false}) content: IonContent;
  category:any = {
    name:'',
    isExclusive: false,
  }

  metaData  = {
  pageTitle:'',
  metaDescription:'',
  metaKeywords:''
  }
  alert: any;
  optionsforGallery: any;
  optionsforCamera: CameraOptions;
  listofbase64Image: any = [];
  imageResponse: any = [];
  categoryData: any;
  prod: any = [];
  showNoProducts:boolean = false;
  searchProduct: string = '';
  searchSubcategory: string = '';
  searchSubOfSubcategory: string = '';
  categoryStatus: boolean = true;
  showLoader: boolean = true;
  subcategories: any = [];
  noSubcategories: boolean = false;
  subcategoriesLoader: boolean = true;
  isSubcategories: boolean;
  isSubcategoriesStatus: boolean;

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
  brands:any
  allSubcategories:any
  previousId = 0
  multiVendor = false;
  vendors = [];
  showSelectGst = false
  showSelectVendor = false
  subCategoryData: any;
  subOfSubcategories: any = [];
  searchSubOfSubCategory: string = '';
  activeSubCatId = '';
  activeSubSubCatId = '';

  constructor(
    public modalController: ModalController,
    private events: Events,
    private router: Router,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private productService: ProductService,
    private platform: Platform,
    private toastController: ToastController,
    private labelService: LabelService,
    private configService: ConfigService,
    private brandService: BrandsService,
    private vendorService: VendorService,
    private categoryService: CategoriesService
  ) { }
  async onRenderCategories(event: { detail: { from: any; to: any; complete: () => void; }; }) {
    this.loader = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 3000
    });
    await this.loader.present();
    // //console.log(`Moving category from ${event.detail.from} to ${event.detail.to}`);
    const start = event.detail.from;
    // tslint:disable-next-line: variable-name
    const id = this.categories[start].id;
    // //console.log('categoriesLength', this.categories.length);
    // //console.log('start', start);
    const end = event.detail.to;
    // //console.log('end', end);
    if ( start < end && end !== this.categories.length - 1) {
      // //console.log('from top to mid');
      const firstDate = this.categories[end].sortedAt.toDate().getTime();
      const secondDate = this.categories[end + 1].sortedAt.toDate().getTime();
      // //console.log('fistdate', firstDate);
      // //console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      // //console.log('finalDate', new Date(changedDate));
      this.productService.updateCategoriesPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else if (start < end && end === this.categories.length - 1) {
      // //console.log('from top to bottom');
      const changedDate = this.categories[end].sortedAt.toDate().getTime() - 5 * 60000;
      this.productService.updateCategoriesPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else if (start > end && end !== 0) {
      // //console.log('from bottom to mid');
      const firstDate = this.categories[end].sortedAt.toDate().getTime();
      const secondDate = this.categories[end - 1].sortedAt.toDate().getTime();
      // //console.log('fistdate', firstDate);
      // //console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      // //console.log('finalDate', new Date(changedDate));
      this.productService.updateCategoriesPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else {
      // //console.log('from bottom to top');
      const changedDate = this.categories[end].sortedAt.toDate().getTime() + 5 * 60000;
      this.productService.updateCategoriesPosition(id, new Date(changedDate));
    }
    const draggedItem = this.categories.splice(event.detail.from, 1)[0];
    this.categories.splice(event.detail.to, 0, draggedItem);
    event.detail.complete();
    setTimeout(() => {
      if(this.loader) {
        this.loader.dismiss();
      }
    }, 3000);
  }

  ionViewWillEnter() {
    // //console.log('ionViewWillEnter');
  }
  async ionViewDidEnter(){
    // //console.log('in ionViewDidEnter');
    this.initializeSubscriptions();
    this.events.publish('product:getAllCategories');
    this.devHeight = this.platform.height();
    this.events.subscribe('product:deleteCategorySuccess', () => {
      this.loading.dismiss();
      this.events.publish('product:getAllCategories')
      this.presentAlert('Success','Category deleted successfully!');
    });
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.CATEGORIES_LABELS = this.labelService.labels['CATEGORIES'];
    this.multiRegion = this.configService.environment.multiRegion;
    this.multiVendor = this.configService.environment.multiVendor;
    if(this.multiVendor) {
      this.vendors = await this.vendorService.getAllVendors();
      if(this.vendors.length) {
        this.vendors = this.vendors;
      } else {
        this.multiVendor = false;
      }
      //this.events.publish('vendor:getAllVendors');
    }
    if(this.multiRegion) {
      this.events.publish('multi-region:getActiveStatus');
      this.events.publish('multi-region:getAllActiveRegions');
    }
  }
  ionViewWillLeave() {
    // //console.log('ionViewWillLeave');

    this.events.unsubscribe('product:deleteCategorySuccess');
    this.showSearch = false;
    this.removeSubscriptions();
  }
  ngOnInit() {
  }
    
  ngOnDestroy(){
  }

  getDateTimeFormat(date){
    return moment(date).format('MMM D, YYYY hh:mm a');
  }

  getSubcategoryProduct(subCat,index){
    this.showSelectGst = false;
    this.showSelectVendor = false;
    this.events.publish('product:getProductsForSubcategory', subCat.id);
  }

  getSubcategoryData(category,index){
    this.activeSubCatId = '';
    this.subOfSubcategories = [];
    this.showSelectGst = false
    this.showSelectVendor = false
    this.categoryData = category
    let prevMsgDiv = document.getElementById('category'+ this.previousId);
    prevMsgDiv.style.background = 'white';
    let msgDiv = document.getElementById('category'+ index);
    msgDiv.style.background = 'var(--ion-color-categories-background)';
    this.previousId = index
    this.events.publish('product:getProductsForCategory', category.id);
    this.events.publish('product:getSubcategories', category.id);
  }

  async  initializeSubscriptions() {
      // //console.log('in initializeSubscriptions');
      
      this.events.subscribe('product:publishAllCategoriesForAdmin', (categories) => {
        // //console.log('in all categories SUBSCRIPTION');
        this.showNoCategories = false;
        this.categories = categories;
        if (this.categories && this.categories.length > 0) {
          setTimeout(() => {
            this.getSubcategoryData(this.categories[0], 0)
          }, 1000);
        }
      });
      this.events.subscribe('product:noCategoryAvailable', () => {
        this.showNoCategories = true;
      });
      this.events.subscribe('product:deleteCategoryFailure', () => {
        this.presentAlert('Failure','Category not deleted successfully!');
      });
      this.events.subscribe('product:updateCategoriesPostionSucess', () => {
        this.loader.dismiss();
      });
      this.events.subscribe('product:exportCategoriesData', (data) => {
        this.loader.dismiss();
        const csvExporter = new ExportToCsv(this.options);
        csvExporter.generateCsv(data);
      });
      this.events.subscribe('product:addCategorySuccess', () => {
        this.loading.dismiss();
        this.category.name = '';
        this.category.isExclusive = false;
        this.imageResponse = [];
        this.banner = [];
        this.presentAlert('Catgeory Added Successfully', true);
      });
      this.events.subscribe('product:editCategorySuccess', async () => {
        // console.log('in editCategorySuccess subscribe');
        await this.loading.dismiss();
        this.presentAlert('Category edited successfully!', true);
      });
      this.events.subscribe('product:deleteCategoryFailure', () => {
        this.loading.dismiss();
        this.presentAlert('','Category deleted failed');
      });
      this.events.subscribe('product:editCategoryFailure', () => {
        this.presentAlert('','Category edit failed');
      });
      this.events.subscribe('product:publishProductsForCategory', (products) => {
        this.prod = products;
        this.showNoProducts = false;
        this.showLoader = false;
        this.showSelectGst = true
        this.showSelectVendor = true
      });
      this.events.subscribe('product:publishProductsForSubcategory', (products) => {
        this.prod = products;
        this.showNoProducts = false;
        this.showLoader = false;
        this.showSelectGst = true
        this.showSelectVendor = true
      });
      this.events.subscribe('product:noProductsForSubcategory', () => {
        this.prod = [];
        this.showLoader = false;
        this.showNoProducts = true;
      });
      this.events.subscribe('product:noProducts', () => {
        this.prod = [];
        this.showLoader = false;
        this.showNoProducts = true;
      });
      this.events.subscribe('product:updateProductPostionSucess', () => {
        this.loader.dismiss();
      });
  
      this.events.subscribe('product:publishSubcategories', (data) => {
        console.log('in publishSubcategories sub');
        this.subcategories = data;
        this.noSubcategories = false;
        this.subcategoriesLoader = false;
        this.getSubOfSubCategory(this.subcategories[0],0);
      });
      this.events.subscribe('product:noSubcategories', () => {
        // console.log('in noSubcategories sub');
        this.noSubcategories = true;
        this.subcategoriesLoader = false;
      });
  
      this.events.subscribe('product:updateSubcategoriesPostionSucess', () => {
        this.loader.dismiss();
      });
      this.events.subscribe('product:changeSubcategoriesStatusSuccess', () => {
        this.presentAlert('','Subcategories status changed successfully!');
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
      this.events.subscribe('product:changeCategoryStatusSuccess', () => {
        if (this.loading){
          this.loading.dismiss()
        }
        this.presentAlert('','Status changed successfully')
      });
      this.events.subscribe('product:changeProductStatusSuccess', () => {
        if (this.loading){
          this.loading.dismiss()
        }
        this.presentAlert('','Status changed successfully')
      });
      this.events.subscribe('product:changeSubcategoryStatusSuccess', () => {
        if (this.loading){
          this.loading.dismiss()
        }
        this.presentAlert('','Status changed successfully')
      });
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
      this.prod[end].sortedAt = this.convertInvalidDateObjectToTimestamp(this.prod[end].sortedAt);
      this.prod[end-1].sortedAt = this.convertInvalidDateObjectToTimestamp(this.prod[end-1].sortedAt);
      this.prod[end+1].sortedAt = this.convertInvalidDateObjectToTimestamp(this.prod[end+1].sortedAt);
      if ( start < end && end !== this.prod.length - 1) {
        // console.log('from top to mid');
        const firstDate = this.prod[end].sortedAt.toDate().getTime();
        const secondDate = this.prod[end + 1].sortedAt.toDate().getTime();
        const changedDate = (firstDate + secondDate) / 2;
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

    async onReorderSubOfSubcategoires(event: { detail: { from: any; to: any; complete: () => void; }; }) {
      this.loader = await this.loadingController.create({
        message: 'Please Wait...',
        duration: 3000
      });
      await this.loader.present();
      // console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
      const start = event.detail.from;
      // tslint:disable-next-line: variable-name
      const id = this.subOfSubcategories[start].id;
      // console.log('pLength', this.subcategories.length);
      // console.log('start', start);
      const end = event.detail.to;
      // console.log('end', end);
      if ( start < end && end !== this.subOfSubcategories.length - 1) {
        // console.log('from top to mid');
        const firstDate = this.subOfSubcategories[end].sortedAt.toDate().getTime();
        const secondDate = this.subOfSubcategories[end + 1].sortedAt.toDate().getTime();
        // console.log('fistdate', firstDate);
        // console.log('seconddate', secondDate);
        const changedDate = (firstDate + secondDate) / 2;
        // console.log('finalDate', new Date(changedDate));
        this.productService.updateSubOfSubcategoriesPosition(id, new Date(changedDate), this.categoryData.id, this.activeSubCatId);
      }
      // tslint:disable-next-line: one-line
      else if (start < end && end === this.subOfSubcategories.length - 1) {
        // console.log('from top to bottom');
        const changedDate = this.subOfSubcategories[end].sortedAt.toDate().getTime() - 5 * 60000;
        this.productService.updateSubOfSubcategoriesPosition(id, new Date(changedDate), this.categoryData.id, this.activeSubCatId);
      }
      // tslint:disable-next-line: one-line
      else if (start > end && end !== 0) {
        // console.log('from bottom to mid');
        const firstDate = this.subOfSubcategories[end].sortedAt.toDate().getTime();
        const secondDate = this.subOfSubcategories[end - 1].sortedAt.toDate().getTime();
        // console.log('fistdate', firstDate);
        // console.log('seconddate', secondDate);
        const changedDate = (firstDate + secondDate) / 2;
        // console.log('finalDate', new Date(changedDate));
        this.productService.updateSubOfSubcategoriesPosition(id, new Date(changedDate), this.categoryData.id, this.activeSubCatId);
      }
      // tslint:disable-next-line: one-line
      else {
        // console.log('from bottom to top');
        const changedDate = this.subOfSubcategories[end].sortedAt.toDate().getTime() + 5 * 60000;
        this.productService.updateSubOfSubcategoriesPosition(id, new Date(changedDate), this.categoryData.id, this.activeSubCatId);
      }
      const draggedItem = this.subOfSubcategories.splice(event.detail.from, 1)[0];
      this.subOfSubcategories.splice(event.detail.to, 0, draggedItem);
      event.detail.complete();
      setTimeout(() => {
        if(this.loader) {
          this.loader.dismiss();
        }
      }, 3000);
    }

    convertInvalidDateObjectToTimestamp(dateObj) {
      if (typeof dateObj.toDate === 'function') {
        return dateObj;
      }
      const date = new Date(dateObj.seconds * 1000);
      return firebase.firestore.Timestamp.fromDate(new Date(date));
    }
  
    editCatgeory(category: any) {
      const navigationExtras: NavigationExtras = {
        state: {
          categoryData: category
        }
      };
      this.router.navigate(['categories'], navigationExtras);
    }
    goToAddNew(page: string) {
      this.router.navigate([page]);
    }
    async deleteCategoryConfirm(categoryId: string, index: number) {
      const alert = await this.alertController.create({
        message: 'Are you sure you want to delete this category',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              // //console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Delete',
            handler: () => {
              // //console.log('Confirm Okay');
              this.deleteCategory1(categoryId, index);
            }
          }
        ]
      });
  
      await alert.present();
    }
    async deleteCategory1(categoryId: string, index: number) {
      this.loading = await this.loadingController.create({
        message: 'Please Wait...',
        duration: 3000
      });
      await this.loading.present();
      this.events.publish('product:deleteCategory', categoryId);
    }
    clearSearchCategory() {
      this.searchCategory = null;
    }
    async presentAlert(heading: any, desc: any) {
      const alert = await this.alertController.create({
        header: heading,
        message: desc,
        buttons: ['Ok']
      });
      await alert.present();
    }
    removeSubscriptions() {
      this.events.unsubscribe('product:publishAllCategoriesForAdmin');
      this.events.unsubscribe('product:deleteCategoryFailure');
      this.events.unsubscribe('product:noCategoryAvailable');
      this.events.unsubscribe('product:updateCategoriesPostionSucess');
      this.events.unsubscribe('product:exportCategoriesData');
      this.events.unsubscribe('product:addCategorySuccess');
      this.events.unsubscribe('product:editCategorySuccess');
      this.events.unsubscribe('product:deleteCategoryFailure');
      this.events.unsubscribe('product:editCategoryFailure');
      this.events.unsubscribe('product:publishProductsForCategory');
      this.events.unsubscribe('product:noProducts');
      this.events.unsubscribe('product:updateProductPostionSucess');
      this.events.unsubscribe('product:publishSubcategories');
      this.events.unsubscribe('product:noSubcategories');
      this.events.unsubscribe('product:updateSubcategoriesPostionSucess');
      this.events.unsubscribe('product:changeSubcategoriesStatusSuccess');
      this.events.unsubscribe('multi-region:publishActiveStatus');
      this.events.unsubscribe('multi-region:publishAllActiveRegions');
      this.events.unsubscribe('product:changeCategoryStatusSuccess');
      this.events.unsubscribe('product:changeProductStatusSuccess');
      this.events.unsubscribe('product:changeSubcategoryStatusSuccess')
      this.events.unsubscribe('product:publishProductsForSubcategory');
      this.events.unsubscribe('product:noProductsForSubcategory');
    }

    async exportCategories(){
      this.loader = await this.loadingController.create({
        message: 'Please Wait...',
        duration: 3000
      });
      await this.loader.present();
      this.events.publish('product:exportCategories');

    
    }

    async addCategory() {
      // console.log(this.category)
      if (this.category.name === '') {
        this.presentAlert('','Please enter category name');
      } else {
      await this.presentLoading();
      this.category.metaData = this.metaData;
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

  updateEditCategoryStatus(id,status, i) {
    // console.log("status", status);
    let newStatus;
    if (status == true) {
      newStatus = false;
    } else {
      newStatus = true;
    }
    this.categories[i].status = newStatus;
    // console.log("newStatus", newStatus); 
    this.events.publish('product:changeCategoryStatus', id, newStatus);
  }

  updateEditSubcategoryStatus(subcatID, status, target) {
    let newStatus;
    if (status === true) {
      newStatus = false;
    } else {
      newStatus = true;
    }
    console.log('subcatID', subcatID)
    console.log(this.activeSubCatId)
    this.events.publish('product:changeSubcategoryStatus', this.categoryData.id, subcatID, newStatus, target==='subcategories' ? '':this.activeSubCatId);
  }

  updateEditProductStatus(id,status) {
    let newStatus;
    if (status === true) {
      newStatus = false;
    } else {
      newStatus = true;
    }
    this.events.publish('product:changeProductStatus', id, newStatus);
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
      this.categoryData.image = {size: null, url: null, thumb:null, mob:null};
    } else {
      this.categoryData.banner = {size: null, url: null, thumb:null, mob:null};
    }
  }
  async editCategory() {
    if (this.categoryData.name === '' || this.categoryData.name === null) {
      this.presentAlert('','Please enter category name');
    } else {
      // console.log('edit category logic...');
      this.loading = await this.loadingController.create({
        message: 'Please Wait...',
        duration: 10000
      });
      this.categoryData.metaData = this.metaData;
      // console.log('new', this.categoryData)
      await this.loading.present();
      this.events.publish('product:editCategory', this.categoryData, this.imageResponse, this.categoryStatus, this.banner, this.regionId);
    }
  
  }

  async deleteCategory(categoryId: string) {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 10000
    });
    await this.loading.present();
    this.events.publish('product:deleteCategory', categoryId);
  }
  
  uploadImage(files: FileList, type) {
    // console.log(type);
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        let base64Image:any = event.target.result;
        let base64Str = base64Image.split(',');
        let size = this.calculateImageSize(base64Str[1]);
        //this.imageResponse.push({imgData: base64Image, imgSize: size});
        if(type == 'bannerImg'){
          // console.log('do banner image')
          this.banner = [];
          this.banner.push({imgData: base64Image, imgSize: size});
          // console.log("banner",this.banner,"categoryData",this.categoryData.banner)
          
        }
        else{
          this.imageResponse = [];
          this.imageResponse.push({imgData: base64Image, imgSize: size});
          // console.log("image",this.imageResponse,"categoryData",this.categoryData.image)
        }
      }
    }
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
    
    async presentLoading() {
      this.loading = await this.loadingController.create({
        message: 'Please Wait...',
      });
      await this.loading.present();
    }
    clearSearchProduct() {
      this.searchProduct = null;
    }
    clearSearchSubcategory() {
      this.searchSubcategory = null;
    }
    clearSearchSubOfSubcategory() {
      this.searchSubOfSubcategory = null;
    }
    editProduct(item: any) {
      if (item.productType == 'appointment'){
        const navigationExtras: NavigationExtras = {
          state: {
            productData: item,
            productId: item.id,
          }
        };
        this.router.navigate(['appointment'], navigationExtras);
      }
      else{
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
  
    addSubcategory() {
      console.log('categoryData: ', this.categoryData);
      const navigationExtras: NavigationExtras = {
        state: {
          categoryId: this.categoryData.id
        }
      };
      this.router.navigate(['add-subcategories'], navigationExtras);
    }
  
    async openAddSubCategoryModal(title:string) {
      const navigationExtras: NavigationExtras = {
        state: {
          title: title,
          categoryId: this.categoryData.id,
          subCategoryId: title==='subcategory' ? '' : this.activeSubCatId,
        }
      };
      this.router.navigate(['add-subcategories'], navigationExtras);
    }

    async openEditSubCategoryModal(item, target) {
      console.log('item before:', item);
      if(target==='subcategory') {
        this.activeSubCatId = item.id;
      } else this.activeSubSubCatId = item.id;
      if (!item.hasOwnProperty('isExclusive')) {
        item['isExclusive'] = false;
      };
      console.log('item after:', item);
      
      const navigationExtras: NavigationExtras = {
        state: {
          categoryId: this.categoryData.id,
          subcategoryData: item,
          subCategoryId: this.activeSubCatId,
        }
      };
      this.router.navigate(['add-subcategories'], navigationExtras);
    }
  
    editSubcategory(item) {
      const navigationExtras: NavigationExtras = {
        state: {
          categoryId: this.categoryData.id,
          subcategoryData: item
        }
      };
      this.router.navigate(['add-subcategories'], navigationExtras);
    }

    async changeSubcategoriesStatus(target:string) {
      if(target==='category') {
        if(this.categoryData.isSubcategories == true) {
          this.categoryData.isSubcategories = false;
        } else {
          this.categoryData.isSubcategories = true;
        }
        this.events.publish('product:changeSubcategoriesStatus', this.categoryData.isSubcategories, this.categoryData.id, '');
      } else if(target==='subcategory') {
        if(this.subCategoryData.isSubcategories == true) {
          this.subCategoryData.isSubcategories = false;
        } else {
          this.subCategoryData.isSubcategories = true;
        }
        this.events.publish('product:changeSubcategoriesStatus', this.subCategoryData.isSubcategories, this.categoryData.id, this.subCategoryData.id);
      }
    }

    async addVendor(e) {
      await this.presentLoading()
      let flag = 0
      for (let i = 0; i < this.prod.length; i++) {
        let result = await this.vendorService.setVendorForProduct(this.prod[i].id, e.target.value)
        if (result==false){
          flag = 1
        }
      }
      if (flag == 0){
        if (this.loading){
          this.loading.dismiss()
        }
        this.presentAlert('','Vendor set for all Products!')
      }
      else {
        if (this.loading){
          this.loading.dismiss()
        }
        this.presentAlert('','Vendor update Failed!')
      }
    }

  async addGst(e) {
    let boolVal;
    if (e.target.value == true) {
      boolVal = true;
      this.categoryData["gstExclusive"] = true;
    }
    else {
      boolVal = false
      this.categoryData["gstExclusive"] = false;
    }
    await this.presentLoading();
    let flag = 0
    for (let i = 0; i < this.prod.length; i++) {
      let result = await this.productService.setGstExclusiveForProduct(this.prod[i].id, boolVal)
      if (result == false) {
        flag = 1
      }
    }
    
    await this.categoryService.updateGstExclusiveCategoryProducts(this.categoryData.id, this.categoryData.gstExclusive);
    if (flag == 0) {
      if (this.loading) {
        await this.loading.dismiss()
      }
      await this.presentAlert('Success', 'Gst set for all Products!')
    }
    else {
      if (this.loading) {
        await this.loading.dismiss()
      }
      await this.presentAlert('Failed', 'Gst update Failed!')
    }
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
        this.presentAlert('','No products for exporting')
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

  // ? Sub Of Sub-category Start

  async getSubOfSubCategory(subCat: any, index: number) {
    console.log('subCat:', subCat);
    this.subCategoryData = subCat;
    this.activeSubCatId = subCat.id;

    let subOfSubData = await this.categoryService.getSubOfSubCategories(this.categoryData.id, this.subCategoryData.id);
    if (subOfSubData) {
      this.subOfSubcategories = subOfSubData;
      if(this.subOfSubcategories.length) {
        this.getProdsOfSubSubCategory(this.subOfSubcategories[0]);
      } else this.getSubcategoryProduct(subCat, 0);
    } else {
      this.presentAlert('', 'Something went wrong !');
    }
  }

  async getProdsOfSubSubCategory(subSubCat:any) {
    this.activeSubSubCatId = subSubCat.id;
    this.events.publish('product:getProductsForSubcategory', subSubCat.id);
  }

  async changeSubOfSubCategoriesStatus() {
    await this.presentLoading();
    this.subCategoryData.isSubcategories = !this.subCategoryData.isSubcategories;

    let statusRes = await this.categoryService.changeSubOfSubCategoriesStatus(this.subCategoryData.isSubcategories, this.categoryData.id, this.subCategoryData.id);
    this.loading.dismiss();
    if (statusRes) {
      this.presentAlert('Success', 'sub of sub category status changed successfully.');
    } else {
      this.presentAlert('Failed', 'sub of sub category status change failed !');
    }
  }

  async onReorderSubOfSubCategories(event: { detail: { from: any; to: any; complete: () => void; }; }) {
    this.loader = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 3000
    });
    await this.loader.present();
    // console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    const start = event.detail.from;
    // tslint:disable-next-line: variable-name
    const id = this.subOfSubcategories[start].id;
    const end = event.detail.to;
    if (start < end && end !== this.subOfSubcategories.length - 1) {
      const firstDate = this.subOfSubcategories[end].sortedAt.toDate().getTime();
      const secondDate = this.subOfSubcategories[end + 1].sortedAt.toDate().getTime();
      const changedDate = (firstDate + secondDate) / 2;
      // console.log('finalDate', new Date(changedDate));
      this.categoryService.updateSubOfSubCategoriesPosition(id, new Date(changedDate), this.subCategoryData.id, this.categoryData.id);
    }
    // tslint:disable-next-line: one-line
    else if (start < end && end === this.subOfSubcategories.length - 1) {
      // console.log('from top to bottom');
      const changedDate = this.subOfSubcategories[end].sortedAt.toDate().getTime() - 5 * 60000;
      this.categoryService.updateSubOfSubCategoriesPosition(id, new Date(changedDate), this.subCategoryData.id, this.categoryData.id);
    }
    // tslint:disable-next-line: one-line
    else if (start > end && end !== 0) {
      // console.log('from bottom to mid');
      const firstDate = this.subOfSubcategories[end].sortedAt.toDate().getTime();
      const secondDate = this.subOfSubcategories[end - 1].sortedAt.toDate().getTime();
      const changedDate = (firstDate + secondDate) / 2;
      // console.log('finalDate', new Date(changedDate));
      this.categoryService.updateSubOfSubCategoriesPosition(id, new Date(changedDate), this.subCategoryData.id, this.categoryData.id);
    }
    // tslint:disable-next-line: one-line
    else {
      // console.log('from bottom to top');
      const changedDate = this.subOfSubcategories[end].sortedAt.toDate().getTime() + 5 * 60000;
      this.categoryService.updateSubOfSubCategoriesPosition(id, new Date(changedDate), this.subCategoryData.id, this.categoryData.id);
    }
    const draggedItem = this.subOfSubcategories.splice(event.detail.from, 1)[0];
    this.subOfSubcategories.splice(event.detail.to, 0, draggedItem);
    event.detail.complete();
    setTimeout(() => {
      if (this.loader) {
        this.loader.dismiss();
      }
    }, 3000);
  }

  async editSubOfSubCategoryStatus(subOfSubCatID: any, status: any) {
    let newStatus;
    if (status === true) {
      newStatus = false;
    } else {
      newStatus = true;
    }
    let statusRes = await this.categoryService.changeSubOfSubCategoryStatus(this.categoryData.id, this.subCategoryData.id, subOfSubCatID, newStatus);
    if (statusRes) {
      this.presentAlert('', 'Status changed successfully');
    } else {
      this.presentAlert('', 'Something went wrong on changing status');
    }
  }

  async AddSubOfSubCategory() {
    // console.log('catData', this.categoryData);
    const navigationExtras: NavigationExtras = {
      state: {
        categoryId: this.categoryData.id,
        subCategoryId: this.subCategoryData.id,
      }
    };
    this.router.navigate(['add-sub-subcategories'], navigationExtras);
  }

  async editSubOfSubCategory(item: any) {
    // console.log('catData', this.categoryData);
    const navigationExtras: NavigationExtras = {
      state: {
        categoryId: this.categoryData.id,
        subCategoryId: this.subCategoryData.id,
        subcategoryData: item
      }
    };
    this.router.navigate(['add-sub-subcategories'], navigationExtras);
  }

  clearSearchSubOfSubCategory() {
    this.searchSubOfSubCategory = null;
  }

    // ? Sub Of Sub-category End

}
