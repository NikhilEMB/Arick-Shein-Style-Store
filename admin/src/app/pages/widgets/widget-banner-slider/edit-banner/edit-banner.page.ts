import { Component, OnInit } from '@angular/core';
import { Events, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { WidgetsService } from '../../../../services/widgets/widgets.service'
import { ConfigService } from 'src/app/services/config/config.service'
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.page.html',
  styleUrls: ['./edit-banner.page.scss'],
})
export class EditBannerPage implements OnInit {
  widget: any;
  bannerID: any;
  bannerData: any;
  bannerType: any;
  slidesData = [];
  webSlidesData = [];
  loading: any;
  seletedIndex;
  mode = 'new';
  imageLimit: any;
  widgetType: any;
  pageId = ''
  productId = ''
  vendorId = ''
  sectionName = '';
  sectionIndex: any;
  sections: any

  constructor(
    private events: Events,
    private toastController: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private widgetsService: WidgetsService,
    private angularFirestore: AngularFirestore,
    private configService: ConfigService
  ) {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe(async params => {
      if (params && params.ID) {
        this.bannerID = params.ID;
        console.log(this.bannerID);
        this.events.publish('widgets:getWidgetData', this.bannerID);
      }

      if (params && params.pageId) {
        this.pageId = params.pageId;
      }

      if (params && params.productId) {
        this.productId = params.productId;
      }

      if (params && params.vendorId) {
        this.vendorId = params.vendorId;
      }

      if (params && params.type) {
        this.bannerData = {
          title: '',
          type: params.type,
        }
        this.widgetType = params.type;
        this.saveBanner()
      }
      if (params && params.index) {
        this.sectionIndex = params.index;
      }
    });
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  removeSubscriptions() {
    this.events.unsubscribe('widgets:widgetAddedSuccess');
    this.events.unsubscribe('widgets:widgetAddedError');
    this.events.unsubscribe('widgets:widgetUpdateSuccess');
    this.events.unsubscribe('widgets:widgetUpdateError');
    this.events.unsubscribe('widgets:publishWidgetDataSuccess');
    this.events.unsubscribe('widgets:publishgetBannerSlidesSuccess');
    this.events.unsubscribe('widgets:deleteSlideSuccess');
    this.events.unsubscribe('widgets:deleteSlideError');
    this.events.unsubscribe('widgets:slideStatusUpdateSuccess');
    this.events.unsubscribe('widgets:slideStatusUpdateError');
    this.events.unsubscribe('widgets:updateBannerCaraouselPositionSuccess');

  }

  async onReorderBanners(event: { detail: { from: any; to: any; complete: () => void; }; }) {
    await this.presentLoading();
    // //console.log(`Moving product from ${event.detail.from} to ${event.detail.to}`);
    const start = event.detail.from;
    // tslint:disable-next-line: variable-name
    const id = this.slidesData[start].id;
    // //console.log('categoriesLength', this.caraouselProducts.length);
    // //console.log('start', start);
    const end = event.detail.to;
    // //console.log('end', end);
    if (start < end && end !== this.slidesData.length - 1) {
      // //console.log('from top to mid');
      const firstDate = this.slidesData[end].createdAt.toDate().getTime();
      const secondDate = this.slidesData[end + 1].createdAt.toDate().getTime();
      // //console.log('fistdate', firstDate);
      // //console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      // //console.log('finalDate', new Date(changedDate));
      this.widgetsService.updateBannerCaraouselPosition(this.bannerID, id, new Date(changedDate), 'app');
    }
    // tslint:disable-next-line: one-line
    else if (start < end && end === this.slidesData.length - 1) {
      // //console.log('from top to bottom');
      console.log(this.slidesData[end].createdAt)
      const changedDate = this.slidesData[end].createdAt.toDate().getTime() - 5 * 60000;
      this.widgetsService.updateBannerCaraouselPosition(this.bannerID, id, new Date(changedDate), 'app');
    }
    // tslint:disable-next-line: one-line
    else if (start > end && end !== 0) {
      // //console.log('from bottom to mid');
      const firstDate = this.slidesData[end].createdAt.toDate().getTime();
      const secondDate = this.slidesData[end - 1].createdAt.toDate().getTime();
      // //console.log('fistdate', firstDate);
      // //console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      // //console.log('finalDate', new Date(changedDate));
      this.widgetsService.updateBannerCaraouselPosition(this.bannerID, id, new Date(changedDate), 'app');
    }
    // tslint:disable-next-line: one-linesortedAt
    else {
      // //console.log('from bottom to top');
      const changedDate = this.slidesData[end].createdAt.toDate().getTime() + 5 * 60000;
      this.widgetsService.updateBannerCaraouselPosition(this.bannerID, id, new Date(changedDate), 'app');
    }
    const draggedItem = this.slidesData.splice(event.detail.from, 1)[0];
    this.slidesData.splice(event.detail.to, 0, draggedItem);
    event.detail.complete();
  }

  async onReorderWebBanners(event: { detail: { from: any; to: any; complete: () => void; }; }) {
    await this.presentLoading();
    // //console.log(`Moving product from ${event.detail.from} to ${event.detail.to}`);
    const start = event.detail.from;
    // tslint:disable-next-line: variable-name
    const id = this.webSlidesData[start].id;
    // //console.log('categoriesLength', this.caraouselProducts.length);
    // //console.log('start', start);
    const end = event.detail.to;
    if (start < end && end !== this.webSlidesData.length - 1) {
      // //console.log('from top to mid');
      const firstDate = this.webSlidesData[end].createdAt.toDate().getTime();
      const secondDate = this.webSlidesData[end + 1].createdAt.toDate().getTime();
      // //console.log('fistdate', firstDate);
      // //console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      // //console.log('finalDate', new Date(changedDate));
      this.widgetsService.updateBannerCaraouselPosition(this.bannerID, id, new Date(changedDate), 'web');
    }
    // tslint:disable-next-line: one-line
    else if (start < end && end === this.webSlidesData.length - 1) {
      // //console.log('from top to bottom');
      console.log(this.webSlidesData[end].createdAt)
      const changedDate = this.webSlidesData[end].createdAt.toDate().getTime() - 5 * 60000;
      this.widgetsService.updateBannerCaraouselPosition(this.bannerID, id, new Date(changedDate), 'web');
    }
    // tslint:disable-next-line: one-line
    else if (start > end && end !== 0) {
      // //console.log('from bottom to mid');
      const firstDate = this.webSlidesData[end].createdAt.toDate().getTime();
      const secondDate = this.webSlidesData[end - 1].createdAt.toDate().getTime();
      // //console.log('fistdate', firstDate);
      // //console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      // //console.log('finalDate', new Date(changedDate));
      this.widgetsService.updateBannerCaraouselPosition(this.bannerID, id, new Date(changedDate), 'web');
    }
    // tslint:disable-next-line: one-linesortedAt
    else {
      // //console.log('from bottom to top');
      const changedDate = this.webSlidesData[end].createdAt.toDate().getTime() + 5 * 60000;
      this.widgetsService.updateBannerCaraouselPosition(this.bannerID, id, new Date(changedDate), 'web');
    }
    const draggedItem = this.webSlidesData.splice(event.detail.from, 1)[0];
    this.webSlidesData.splice(event.detail.to, 0, draggedItem);
    event.detail.complete();
  }

  initializeSubscriptions() {
    this.events.subscribe('widgets:widgetAddedSuccess', async (ID) => {
      this.bannerID = ID;
      this.widget = {
        widgetID: this.bannerID,
        widgetType: this.bannerData.type,
        location: "all",
        sectionName: this.sectionName
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
      this.events.publish('widgets:getBannerSlides', this.bannerID);
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Banner added successfuly, please start adding slides');
      this.mode = 'edit';
    });

    this.events.subscribe('widgets:widgetAddedError', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Some error occured, please try again')
    });


    this.events.subscribe('widgets:widgetUpdateSuccess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Banner updated successfuly');
    });

    this.events.subscribe('widgets:widgetUpdateError', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Some error occured, please try again')
    });


    this.events.subscribe('widgets:publishWidgetDataSuccess', async (data) => {
      // console.log('data',data);
      if (this.pageId) {
        let sections: any = await this.angularFirestore.collection('pages').doc(this.pageId).valueChanges().pipe(first()).toPromise();
        // console.log('sections', sections);      
        if (sections && sections.sections) {
          this.sections = sections.sections;
          if (this.sectionIndex) {
            this.sectionName = sections.sections[this.sectionIndex].sectionName ? sections.sections[this.sectionIndex].sectionName : "";
          }
        }
      }
      if (this.productId != '') {
        let sections: any = await this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets').valueChanges().pipe(first()).toPromise();
        console.log('sections', sections);
        if (sections && sections.sections) {
          this.sections = sections.sections;
          if (this.sectionIndex) {
            this.sectionName = sections.sections[this.sectionIndex].sectionName ? sections.sections[this.sectionIndex].sectionName : "";
          }
        }
      }

      this.bannerData = data;
      this.mode = 'edit';
      this.events.publish('widgets:getBannerSlides', this.bannerID);
      this.widgetType = data.type;
      if (this.widgetType == 'image-banner') {
        if (this.configService.environment.imageBannerLimit) {
          this.imageLimit = this.configService.environment.imageBannerLimit;
          console.log('imageBannerLimit (in) :', this.imageLimit);
        } else {
          this.imageLimit = 5
          console.log('imageBannerLimit (out) :', this.imageLimit);
        }
      }
      else {
        this.imageLimit = 10;
      }
      console.log(this.imageLimit)
      if (this.loading) {
        this.loading.dismiss();
      }
    });

    this.events.subscribe('widgets:publishgetBannerSlidesSuccess', (slideData, webSlideData) => {
      this.slidesData = slideData;
      this.webSlidesData = webSlideData
      console.log("slidesData:", this.slidesData, "webSlidesData:", this.webSlidesData)
    });

    this.events.subscribe('widgets:deleteSlideSuccess', (type) => {
      if (type == 'app') {
        this.slidesData = this.slidesData.splice(this.seletedIndex);
      }
      else {
        this.webSlidesData = this.webSlidesData.splice(this.seletedIndex);
      }
      this.events.publish('widgets:getWidgetData', this.bannerID);
      if (this.loading) {
        this.loading.dismiss();
      }
    });

    this.events.subscribe('widgets:deleteSlideError', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Some error occured, please try again')
    });



    this.events.subscribe('widgets:slideStatusUpdateSuccess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Status changed successfully')
    });

    this.events.subscribe('widgets:slideStatusUpdateError', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Some error occured, please try again')
    });

    this.events.subscribe('widgets:updateBannerCaraouselPositionSuccess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }

    });


  }

  async saveBanner() {
    console.log('banner data', this.bannerID, this.bannerData)
    await this.presentLoading();
    if (this.mode == 'new') {
      this.events.publish('widgets:addWidget', this.bannerData);
    }
  }

  addNewSlide(type) {
    if (type == 'app') {
      if (this.slidesData.length == this.imageLimit) {
        this.presentAlert(`you can add only ${this.imageLimit} app slides`)
      }
      else {
        const navigationExtras: NavigationExtras = {
          state: {
            bannerID: this.bannerID,
            type: type
          }
        };
        this.router.navigate(['edit-slide'], navigationExtras);
      }
    }
    if (type == 'web') {
      if (this.webSlidesData.length == this.imageLimit) {
        this.presentAlert(`you can add only ${this.imageLimit} web slides`)
      }
      else {
        const navigationExtras: NavigationExtras = {
          state: {
            bannerID: this.bannerID,
            type: type
          }
        };
        this.router.navigate(['edit-slide'], navigationExtras);
      }
    }

  }

  editSlide(ID, type, data) {
    const navigationExtras: NavigationExtras = {
      state: {
        bannerID: this.bannerID,
        slideID: ID,
        type: type,
        widgetType: this.widgetType,
        slideData: data
      }
    };
    this.router.navigate(['edit-slide'], navigationExtras);
  }

  async deleteSlideConfirm(ID, index, type) {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete',
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
            this.deleteSlide(ID, index, type);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteSlide(ID, index, type) {
    console.log(ID)
    this.presentLoading()
    this.events.publish('widgets:deleteSlide', this.bannerID, ID, type);
    this.seletedIndex = index;
  }


  async changeSlideStatus(event, ID, type) {
    let status = event.detail.checked;
    this.events.publish('widgets:changeSlideStatus', this.bannerID, ID, status, type);
    await this.presentLoading()
  }

  async saveSection() {
    await this.presentLoading();
    console.log('pageId', this.pageId, 'sections:', this.sections);
    if (this.sectionIndex) {
      this.sections[this.sectionIndex].sectionName = this.sectionName;
      if (this.productId != '') {
        await this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets').update({ 'sections': this.sections });
      }
      if (this.pageId != '') {
        await this.angularFirestore.collection('pages').doc(this.pageId).update({ 'sections': this.sections });
      }
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Name Updated Successfully!');
    }
    else {
      let res: any = await this.widgetsService.addNewBanner(this.sectionName, this.pageId);
      if (res) {
        if (this.loading) {
          this.loading.dismiss();
        }
        this.presentAlert('Name Saved Successfully!');
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait',
      duration: 2000,
    });
    await this.loading.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


}
