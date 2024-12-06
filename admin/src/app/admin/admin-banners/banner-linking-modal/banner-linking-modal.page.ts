import { Component, OnInit } from '@angular/core';
import { Events, ModalController } from '@ionic/angular';
import { BrandsService } from 'src/app/services/brands/brands.service';
import { LabelService } from 'src/app/services/label/label.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ServicesFeatureService } from 'src/app/services/services-feature/services-feature.service';

@Component({
  selector: 'app-banner-linking-modal',
  templateUrl: './banner-linking-modal.page.html',
  styleUrls: ['./banner-linking-modal.page.scss'],
})
export class BannerLinkingModalPage implements OnInit {
  linkType;
  list = [];
  SHARED_LABELS: any;
  BANNER_LINKING_MODAL_LABELS: any;
  searchPh = '';
  searchValue = '';
  linkId = '';
  status = '';
  loading = true;
  showSearchLoader: boolean = false;
  showNoProducts = true;
  noMoreProducts: boolean = false;
  page: number = 0;
  typingTimer;
  doneTypingInterval = 1000;
  searchProduct = '';
  dataList:any = []
  data = {}
  name:any
  count = 0
  constructor(private productService: ProductService,
              private brandsService: BrandsService,
              private labelService: LabelService,
              private servicesFeatureService: ServicesFeatureService,
              private modalController: ModalController,
              private events: Events) { }

  ngOnInit() {
    ////console.log(this.linkType);
    console.log('LinkId from modal:',this.linkId);
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.BANNER_LINKING_MODAL_LABELS = this.labelService.labels['BANNER_LINKING_MODAL'];
    this.searchPh = this.BANNER_LINKING_MODAL_LABELS['search_placeholder'];  
    this.loading = false;
  }

  async ionViewWillEnter() {
    this.initializeSubscriptions();
    if (this.linkId){
      this.dataList = this.linkId
    }
    if (!this.linkType){
      this.dataList = []
    }
    console.log('dataList::', this.dataList);
    if(this.linkType === this.BANNER_LINKING_MODAL_LABELS['category']) {
      this.list = await this.productService.getAllCategoriesForSideMenu();
    } else if(this.linkType === 'subcategory') {
      this.list = await this.productService.getAllSubcategoriesForSideMenu();
      ////console.log(this.list)
    } else if(this.linkType === 'page') {
      this.events.publish('page-setting:getPages');
      ////console.log(this.list)
    } else if(this.linkType === this.BANNER_LINKING_MODAL_LABELS['brand']) {
      this.list = await this.brandsService.getAllBrandsForSideMenu();
    } else if(this.linkType === this.BANNER_LINKING_MODAL_LABELS['service']) {
      this.list = await this.servicesFeatureService.getAllServicesForHome('modal');
    }
  }

  initializeSubscriptions() {
    this.events.subscribe('page-setting:publishPagesSuccess', (pageData) => {
      if (pageData) {
        this.list = pageData
      }
    });
    this.events.subscribe('search-engine:productSearchResults', (products) => {
      let parentProds = [];
        products.map(p => {
          p['name'] = p.data.prodName;
          if(p.data.ptype === "parent") {
           parentProds.push(p);
          }
        });
        this.list = parentProds;
        this.showSearchLoader = false;
        this.showNoProducts = false;
        console.log('productsList:', this.list);
    });
    this.events.subscribe('search-engine:noSearchProductsAvailable', () => {
      this.showSearchLoader = false;
      this.showNoProducts = true;
    });
    this.events.subscribe('search-engine:noMoreSearchProducts', () => {
      this.noMoreProducts = true;
      this.showSearchLoader = false;
    });
  }

  selectIds(i: number,selectId?,selectName?) {
    console.log('selectIds : ', i, ' number : ', selectId, ' selectName : ', selectName);
    if ((this.dataList.indexOf(selectId) > -1) == false){
      this.dataList.push(selectId)
    }
    else if (this.dataList.indexOf(selectId) > -1){
      this.dataList.splice(this.dataList.indexOf(selectId),1)
    }
    this.data = {
      id: this.dataList
    }
    ////console.log(this.linkType)
    if(this.linkType === this.BANNER_LINKING_MODAL_LABELS['category']) {
      this.data['isSubcategories'] = this.list[i].isSubcategories ? this.list[i].isSubcategories : false;
    }
    ////console.log(data)
    // this.modalController.dismiss(data);
  }

  confirmSelection(){
    console.log('save datalist : ', this.dataList);
    let id = []
    for (let i = 0; i < this.dataList.length; i++) {
      id.push(this.dataList[i]);
    }
    let firstObj = this.list.find(x => x.id=== this.dataList[0])
    this.data['id'] = id
    this.data['name'] = (firstObj && firstObj.name) ? firstObj.name : '';
    this.data['type'] = this.linkType;
    this.data['status'] = this.linkType;
    this.modalController.dismiss(this.data);
  }

  closeModal() {
    this.confirmSelection()
    this.modalController.dismiss(this.data);
  }

  selectValue(i: number,selectId?,selectName?) {
    console.log('here selected')
    let data;
    if (selectId && selectName){
      data = {
        id: [selectId],
        name: selectName
      }
    }
    else{
      data = {
        id: [this.list[i].id],
        name: this.list[i].name
      }
    }
    if (this.linkType == 'page' && (selectId == 'about' || selectId == 'homepage')){
      data['name'] = selectId
    }
    ////console.log(this.linkType)
    if(this.linkType === this.BANNER_LINKING_MODAL_LABELS['category']) {
      data['isSubcategories'] = this.list[i].isSubcategories ? this.list[i].isSubcategories : false;
    }
    if(this.linkType === 'subcategory') {
      ////console.log('here',this.list[i].categoryId)
      data['categoryId'] = this.list[i].categoryId
    }
    if(this.linkType === this.BANNER_LINKING_MODAL_LABELS['service']) {
      data['serviceData'] = this.list[i];
    }
    ////console.log(data)
    
    data['type'] = this.linkType;
    data['status'] = this.linkType;
    this.modalController.dismiss(data);
  }

  fireSearchQuery() {
    clearTimeout(this.typingTimer);
    if(this.searchProduct.length > 2) {
      this.typingTimer = setTimeout(() => {
        ////console.log('in fireSearchQuery...');
        this.showSearchLoader = true;
        this.showNoProducts = false;
        this.events.publish('search-engine:alogoliaSearchProducts', this.searchProduct, 0, 'new_search');
      }, this.doneTypingInterval);
    } else {
      this.showNoProducts = true;
    }
  }
  async loadMoreProducts(event) {
    ////console.log('loading more data...');
    this.page = this.page + 1;
    this.events.publish('search-engine:alogoliaSearchProducts', this.searchProduct, this.page, 'existing_search');
    setTimeout(() => {
      event.target.complete();
    }, 1000);
    if (this.noMoreProducts === true) {
      event.target.disabled = true;
    }
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  removeSubscriptions() {
    this.events.unsubscribe('search-engine:noSearchProductsAvailable');
    this.events.unsubscribe('search-engine:productSearchResults');
    this.events.unsubscribe('search-engine:noMoreSearchProducts');
  }

}
