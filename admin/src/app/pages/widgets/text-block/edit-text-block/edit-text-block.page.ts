import { Component, OnInit } from '@angular/core';
import { Events, ModalController, LoadingController } from '@ionic/angular';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-text-block',
  templateUrl: './edit-text-block.page.html',
  styleUrls: ['./edit-text-block.page.scss'],
})
export class EditTextBlockPage implements OnInit {
  SHARED_LABELS: any;
  headerText = '';
  PROMO_image_SETTINGS_LABELS: any;
  widgetData: any = {
    title: '',
    description: '',
    type: 'text-block'
  }
  sectionName: any;
  widget: any;
  webSections: any = [];
  loading: any;
  ckeConfig = {
    allowedContent: true,
    height: 300
  };
  sectionIndex: any
  pageId = ''
  productId = ''
  vendorId = ''
  widgetID: any;
  constructor(
    private sharedService: SharedService,
    private events: Events,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private router: Router,
    private angularFirestore: AngularFirestore,
    private loadingController: LoadingController, private _location: Location) { }

  ngOnInit() { }


  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe(async params => {
      if (params && params.ID) {
        this.widgetID = params.ID;
        console.log(this.widgetID);
        this.events.publish('widgets:getWidgetData', this.widgetID);
      }
      if (params && params.index) {
        this.sectionIndex = params.index
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
    });

    this.initializeSubscriptions();
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  removeSubscriptions() {
    this.events.unsubscribe('widgets:addVideoBlockSucces');
    this.events.unsubscribe('widgets:updateVideoBlockSuccess');
    this.events.unsubscribe('widgets:publishWidgetDataSuccess');
    this.events.unsubscribe('widgets:addVideoBlockError');
    this.events.unsubscribe('widgets:updateVideoBlockError');
    this.events.unsubscribe('widgets:publishWidgetDataError');
    this.events.unsubscribe('widgets:widgetAddedSuccess');
    this.events.unsubscribe('widgets:widgetAddedError');
    this.events.unsubscribe('widgets:updateTextBlockSuccess');
    this.events.unsubscribe('widgets:updateTextBlockError');
  }

  initializeSubscriptions() {

    this.events.subscribe('widgets:widgetAddedSuccess', async (id) => {
      this.widgetID = id;
      console.log(this.widgetID);
      this.widget = {
        widgetID: this.widgetID,
        widgetType: 'text-block',
        sectionName: this.sectionName,
        location: "all"
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
        await this.angularFirestore.collection('features').doc('multiVendor').collection('vendors').doc(this.vendorId).update({ sections: firebase.firestore.FieldValue.arrayUnion(this.widget)})
      }
      if (this.loading) {
        this.loading.dismiss();
      }
      this._location.back();
    });

    this.events.subscribe('widgets:widgetAddedError', (id) => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.sharedService.presentAlert('Some error occured, please try again')
    });

    this.events.subscribe('widgets:updateTextBlockSuccess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      //this.widgetID = id;
      this.sharedService.presentAlert('updated')
    });

    this.events.subscribe('widgets:updateTextBlockError', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      //this.widgetID = id;
      this.sharedService.presentAlert('Some error occured, please try again')
    });

    this.events.subscribe('widgets:publishWidgetDataSuccess', async (data) => {
      if (this.loading) {
        this.loading.dismiss();
      }
      if (data) {
        let sections;
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
        this.widgetData = data;
      }
    });
  }

  async addwidgetData() {
    if (!this.sectionName) {
      this.sharedService.presentAlert('Please fill the name properly')
    }
    else if (this.sectionName.length < 5) {
      this.sharedService.presentAlert('Name should be atleast 5 characters')
    }
    else {
      this.presentLoading();
      this.events.publish('widgets:addWidget', this.widgetData);
    }
  }

  async updatewidgetData() {
    if (!this.sectionName) {
      this.sharedService.presentAlert('Please fill the name properly')
    }
    else if (this.sectionName.length < 5) {
      this.sharedService.presentAlert('Name should be atleast 5 characters')
    }
    else if (!this.widgetData.description) {
      this.sharedService.presentAlert('Please add description');
    }
    else {
      await this.presentLoading();
      this.webSections[this.sectionIndex].sectionName = this.sectionName
      if (this.pageId != '') {
        await this.angularFirestore.collection('pages').doc(this.pageId).update({ 'sections': this.webSections });
      }
      else if (this.productId != ''){
        await this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets').set({ 'sections': this.webSections });
      }
      else if (this.vendorId != '') {
        await this.angularFirestore.collection('features').doc('multiVendor').collection('vendors').doc(this.vendorId).update({ 'sections': this.webSections })
      }
      this.events.publish('widgets:updateTextBlock', this.widgetData, this.widgetID);
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait'
    });
    await this.loading.present();
  }

}

