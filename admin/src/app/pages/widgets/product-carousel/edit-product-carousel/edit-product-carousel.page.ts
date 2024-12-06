import { Component, OnInit } from '@angular/core';
import { Events, AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductListModalPage } from '../../product-list-modal/product-list-modal.page';
import { ActivatedRoute } from '@angular/router';
import { WidgetsService } from '../../../../services/widgets/widgets.service'
import { SharedService } from 'src/app/services/shared/shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-edit-product-carousel',
  templateUrl: './edit-product-carousel.page.html',
  styleUrls: ['./edit-product-carousel.page.scss'],
})
export class EditProductCarouselPage implements OnInit {
  widget: any;
  webSections: any = [];
  widgetID;
  widgetData: any;
  mode = 'new';
  noCaraouselProducts = true;
  caraouselProducts;
  caraouselProductsData: any;
  loading: any;
  sectionName: any;
  title: any
  sectionIndex: any
  pageId = ''
  productId = ''
  vendorId = ''
  imgUrlData = '';
  productsWithReel: any = false;
  widgetProductsLimit = this.configService.environment.widgetProductsLimit || 10;
  constructor(private events: Events,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private widgetsService: WidgetsService,
    private sharedServic: SharedService,
    private toastController: ToastController,
    private angularFirestore: AngularFirestore,
    private storage: Storage,
    private _location: Location,
    private configService: ConfigService) {
    //console.log('constructor');

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe(async params => {
      if (params && params.ID) {
        this.widgetID = params.ID;
        this.events.publish('widgets:getWidgetData', this.widgetID);
      }

      if (params && params.pageId) {
        this.pageId = params.pageId;
      }

      if (params && params.vendorId) {
        this.vendorId = params.vendorId;
      }

      if (params && params.type) {
        this.widgetData = {
          title: '',
          type: params.type,
        }
        if (params.type == "product-carousel") {
          this.title = "Product Carousel"
        }
        else {
          this.title = "Product List"
        }
      }
      if (params && params.index) {
        this.sectionIndex = params.index
      }
      if (params && params.productId) {
        // console.log('cc');
        this.productId = params.productId;
      }
      // console.log('param',params); 
    });
    // console.log(this.productId);
    this.initializeSubscriptions();
    if (this.widgetData.type == "'product-carousel" && this.widgetData.sectionType == "video-products") {
      this.productsWithReel = true
    }
    console.log('widgetdata', this.widgetData)
  }

  removeSubscriptions() {
    this.events.unsubscribe('widgets:publishCarouselProduct');
    this.events.unsubscribe('widgets:noCarouselProducts');
    this.events.unsubscribe('widgets:publishWidgetDataSuccess');
    this.events.unsubscribe('widgets:widgetAddedSuccess');
    this.events.unsubscribe('widgets:widgetAddedError');
    this.events.unsubscribe('widgets:widgetUpdateSuccess');
    this.events.unsubscribe('widgets:widgetUpdateError');
    this.events.unsubscribe('widgets:deleteCarouselProductSuccess');
    this.events.unsubscribe('widgets:deleteCarouselProductError');
    this.events.unsubscribe('widgets:updateProductCaraouselPositionSuccess');
  }
  initializeSubscriptions() {
    this.events.subscribe('widgets:publishCarouselProducts', (data) => {
      this.caraouselProducts = data;
      console.log('carouselProd:', data);
      this.noCaraouselProducts = false;
      if (this.loading) {
        this.loading.dismiss();
      }
    });

    this.events.subscribe('widgets:noCarouselProducts', () => {
      this.noCaraouselProducts = true;
      if (this.loading) {
        this.loading.dismiss();
      }
    });


    this.events.subscribe('widgets:publishWidgetDataSuccess', async (data) => {
      this.widgetData = data;
      if (!this.widgetData.hasOwnProperty('groups')) {
        this.widgetData['groups'] = [];
      }
      this.imgUrlData = this.widgetData.showcaseImg ? this.widgetData.showcaseImg : '';
      console.log('widgetData:', data);
      let sections: any;
      if (this.pageId != '') {
        sections = await this.angularFirestore.collection('pages').doc(this.pageId).valueChanges().pipe(first()).toPromise();
        if (sections && sections.sections) {
          this.webSections = sections.sections;
          this.sectionName = sections.sections[this.sectionIndex].sectionName;
        }
      }
      else if (this.productId != '') {
        sections = await this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets').valueChanges().pipe(first()).toPromise();
        if (sections && sections.sections) {
          this.webSections = sections.sections;
          this.sectionName = sections.sections[this.sectionIndex].sectionName;
        }
      }
      else if (this.vendorId != '') {
        sections = await this.angularFirestore.collection('features').doc('multiVendor').collection('vendors').doc(this.vendorId).valueChanges().pipe(first()).toPromise();
        if (sections && sections.sections) {
          this.webSections = sections.sections;
          this.sectionName = sections.sections[this.sectionIndex].sectionName;
        }
      }
      this.mode = 'edit';
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentLoading()
      this.events.publish('widgets:getCarouselProducts', this.widgetID);
    });

    this.events.subscribe('widgets:widgetAddedSuccess', async (ID) => {
      // if (this.loading) {
      //   this.loading.dismiss();
      // }
      this.widgetID = ID;
      this.widget = {
        widgetID: this.widgetID,
        widgetType: this.widgetData.type,
        sectionName: this.sectionName,
        location: "all"
      }

      // if(this.widget.widgetType === "product-carousel"){
      //   this.widget.sectionType = "video-products"
      // }

      if (this.widgetData.type == "'product-carousel" && this.productsWithReel == true) {
        this.widgetData.sectionType == "video-products"
      }

      if (this.pageId != '') {
        await this.angularFirestore.collection('pages').doc(this.pageId).update({ sections: firebase.firestore.FieldValue.arrayUnion(this.widget) });
      }
      else if (this.productId != '') {
        let sectionRef = await this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets')
        if (! await sectionRef.valueChanges().pipe(first()).toPromise()) {
          await sectionRef.set({ sections: firebase.firestore.FieldValue.arrayUnion(this.widget) });
        }
        else {
          await sectionRef.update({ sections: firebase.firestore.FieldValue.arrayUnion(this.widget) });
        }
      }
      else if (this.vendorId != '') {
        await this.angularFirestore.collection('features').doc('multiVendor').collection('vendors').doc(this.vendorId).update({ sections: firebase.firestore.FieldValue.arrayUnion(this.widget) })
      }
      if (this.widgetData.type == 'product-list') {
        await this.widgetsService.setProductListImg(this.imgUrlData, this.widgetID);
        // console.log(this.imgUrlData);        
        if (this.loading) {
          this.loading.dismiss();
        }
      }
      if (this.widgetData.type == 'product-list') {
        this.sharedServic.presentAlert('Product List Saved Successfully, Now Start Adding Products');
      }
      else {
        this.sharedServic.presentAlert('Carousel Saved Successfully, Now Start Adding Products');
      }
      this.mode = 'edit';
      this.events.publish('widgets:getCarouselProducts', this.widgetID);
      if (this.loading) {
        this.loading.dismiss();
      }
      this._location.back();
    });

    this.events.subscribe('widgets:widgetAddedError', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.sharedServic.presentAlert('Some Error Occured, please try again');
    });

    this.events.subscribe('widgets:widgetUpdateSuccess', async () => {
      if (this.widgetData.type == 'product-list') {
        await this.widgetsService.setProductListImg(this.imgUrlData, this.widgetID);
      }
      if (this.loading) {
        this.loading.dismiss();
      }
      if (this.widgetData.type == 'product-list') {
        this.sharedServic.presentAlert('Product List Updated Successfully');
      }
      else {
        this.sharedServic.presentAlert('Carousel Updated Successfully');
      }
    });

    this.events.subscribe('widgets:widgetUpdateError', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.sharedServic.presentAlert('Some Error Occured, please try again');
    });


    this.events.subscribe('widgets:deleteCarouselProductSuccess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.sharedServic.presentAlert('Product Deleted Successfuly');
    });

    this.events.subscribe('widgets:deleteCarouselProductError', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.sharedServic.presentAlert('Some Error Occured, please try again');
    });

    this.events.subscribe('widgets:updateProductCaraouselPositionSuccess', () => {
      this.events.publish('widgets:getCarouselProducts', this.widgetID);

    });


  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  async saveWidget() {
    if (!this.sectionName) {
      this.presentAlert('Please Fill the name Properly')
    }
    else if (this.sectionName.length < 5) {
      this.presentAlert('Name should be atleast 5 characters')
    }
    else {
      if (this.mode == 'new') {
        this.events.publish('widgets:addWidget', this.widgetData);
        this.presentLoading()
      }
      else {
        this.presentLoading()
        if (this.sectionIndex) {
          this.webSections[this.sectionIndex].sectionName = this.sectionName;
          console.log('this.widgetData', this.widgetData)
          console.log('this.productsWithReel ', this.productsWithReel)
          if (this.widgetData.type == "product-carousel" && this.productsWithReel == true) {
            // this.productsWithReel = true 
            console.log('true')
            this.webSections[this.sectionIndex].sectionType = "video-products";
            console.log('this.webSections[this.sectionIndex].sectionType', this.webSections[this.sectionIndex].sectionType)
          }

        }
        let userRole = await this.storage.get('userRole');
        if (userRole !== 'vendor') {
          if (this.pageId != '') {
            console.log('insidde pg:', this.pageId);
            await this.angularFirestore.collection('pages').doc(this.pageId).update({ 'sections': this.webSections });
          }
          else if (this.productId != '') {
            await this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets').set({ 'sections': this.webSections });
          }
          else if (this.vendorId != '') {
            await this.angularFirestore.collection('features').doc('multiVendor').collection('vendors').doc(this.vendorId).update({ 'sections': this.webSections })
          }
        } else if (userRole == 'vendor') {
          //let vendorId = await this.storage.get('uid');
          console.log('vendor:', this.vendorId);
          await this.angularFirestore.collection('features').doc('multiVendor').collection('vendors').doc(this.vendorId).update({ 'sections': this.webSections })
        }
        console.log('name:', this.sectionName);
        this.events.publish('widgets:updateWidget', this.widgetData, this.widgetID);
      }

    }

  }

  addNewProduct() {
    if (this.caraouselProducts && this.caraouselProducts.length > (this.widgetProductsLimit - 1) && this.vendorId == '') {
      this.presentAlert(`Sorry, max ${this.widgetProductsLimit} products can be added`)
    }
    else {
      this.modalController.create({
        component: ProductListModalPage,
        cssClass: 'custom-modal',
        componentProps: {
          'widgetID': this.widgetID,
          'vendorId': this.vendorId
        }
      })
        .then(modalEl => {
          modalEl.present();
        });
    }
  }



  async deleteCaraouselProductsConfirm(id: string, index: number) {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.deleteBestSellerProduct(id, index);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteBestSellerProduct(id: string, index: number) {
    await this.presentLoading();
    this.caraouselProducts.splice(index, 1)
    this.events.publish('widgets:deleteCarouselProduct', this.widgetID, id);
  }

  async onReorderProducts(event) {
    await this.presentLoading();
    // //console.log(`Moving product from ${event.detail.from} to ${event.detail.to}`);
    const start = event.detail.from;
    // tslint:disable-next-line: variable-name
    const id = this.caraouselProducts[start].productID;
    // //console.log('categoriesLength', this.caraouselProducts.length);
    // //console.log('start', start);
    const end = event.detail.to;
    // //console.log('end', end);
    if (start < end && end !== this.caraouselProducts.length - 1) {
      // //console.log('from top to mid');
      const firstDate = await this.caraouselProducts[end].sortedAt.toDate().getTime();
      const secondDate = await this.caraouselProducts[end + 1].sortedAt.toDate().getTime();
      // //console.log('fistdate', firstDate);
      // //console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      // //console.log('finalDate', new Date(changedDate));
      this.events.publish('widgets:updateProductCaraouselPosition', this.widgetID, id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else if (start < end && end === this.caraouselProducts.length - 1) {
      // //console.log('from top to bottom');
      console.log(this.caraouselProducts[end].sortedAt)
      const changedDate = await this.caraouselProducts[end].sortedAt.toDate().getTime() - 5 * 60000;
      this.events.publish('widgets:updateProductCaraouselPosition', this.widgetID, id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else if (start > end && end !== 0) {
      // //console.log('from bottom to mid');
      const firstDate = await this.caraouselProducts[end].sortedAt.toDate().getTime();
      const secondDate = await this.caraouselProducts[end - 1].sortedAt.toDate().getTime();
      // //console.log('fistdate', firstDate);
      // //console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      // //console.log('finalDate', new Date(changedDate));
      this.events.publish('widgets:updateProductCaraouselPosition', this.widgetID, id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else {
      // //console.log('from bottom to top');
      const changedDate = await this.caraouselProducts[end].sortedAt.toDate().getTime() + 5 * 60000;
      this.events.publish('widgets:updateProductCaraouselPosition', this.widgetID, id, new Date(changedDate));
    }
    const draggedItem = this.caraouselProducts.splice(event.detail.from, 1)[0];
    this.caraouselProducts.splice(event.detail.to, 0, draggedItem);
    event.detail.complete();
  }


  async uploadShowcaseImg(files: FileList) {
    this.presentLoading();
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = async (event: any) => {
        // ? called once readAsDataURL is completed
        let base64Image = event.target.result;
        this.imgUrlData = await this.widgetsService.uploadImg(base64Image, this.widgetID);
        // console.log(base64Image);
        if (this.loading) {
          this.loading.dismiss();
        }
      }
    }
  }

  deleteShowcaseImage() {
    this.imgUrlData = "";
    this.presentAlert('Background image deleted successfully');
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
    });
    await this.loading.present();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }


  async addGroup() {
    const alert = await this.alertController.create({
      subHeader: 'Add Group',
      inputs: [
        {
          name: 'groupName',
          type: 'text',
          placeholder: 'Enter Group Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Add',
          handler: (data) => {
            if (!data.groupName) {
              this.presentToast('Please enter valid group name');
            }
            else {
              this.widgetData['groups'].push({ name: data.groupName, groupImg: '', products: [] })
            }
          }
        }
      ]
    });
    await alert.present();
  }

  removeGroup(index) {
    this.widgetData['groups'].splice(index, 1)
  }

  async saveGroups() {
    let prodLength: any;
    console.log('widgetData:', this.widgetData, ' id:', this.widgetID);
    await this.sharedServic.presentLoading();

    if (this.widgetData.groups && this.widgetData.groups.length) {
      for (const group of this.widgetData.groups) {
        prodLength = group.products.length;
        console.log(prodLength);

        if (prodLength > 10) {
          if (this.sharedServic.loading) {
            this.sharedServic.loading.dismiss();
          }
          this.sharedServic.presentAlert('Only 10 products per group allowed');
          return;
        }
      }
    }
    const success = await this.widgetsService.updateWidgetData(this.widgetID, { groups: this.widgetData.groups });
    if (success) {
      this.sharedServic.presentAlert('Data saved Successfully');
      if (this.sharedServic.loading) {
        this.sharedServic.loading.dismiss();
      }
    }

  }

  async uploadGroupImage(files: FileList, groupId) {
    let groupImgUrl;
    this.presentLoading();
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = async (event: any) => {
        // ? called once readAsDataURL is completed
        let base64Image: any = event.target.result;
        groupImgUrl = await this.widgetsService.uploadGroupImg(base64Image, groupId, this.widgetID);
        this.widgetData.groups[groupId].groupImg = groupImgUrl;
        // console.log(this.widgetData.groups[groupId],groupImgUrl);
        if (this.loading) {
          this.loading.dismiss();
        }
      }
    }
  }



}
