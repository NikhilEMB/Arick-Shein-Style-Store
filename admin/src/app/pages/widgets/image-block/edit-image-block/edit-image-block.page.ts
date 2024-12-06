import { Component, OnInit } from '@angular/core';
import { Events, ModalController } from '@ionic/angular';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Location } from '@angular/common';
import { ImageEditorComponent } from 'src/app/components/image-editor/image-editor.component';
@Component({
  selector: 'app-edit-image-block',
  templateUrl: './edit-image-block.page.html',
  styleUrls: ['./edit-image-block.page.scss'],
})
export class EditImageBlockPage implements OnInit {
  widget: any;
  SHARED_LABELS: any;
  headerText = '';
  PROMO_image_SETTINGS_LABELS: any;
  widgetData: any = {
    title: '',
    description: '',
    displayType: 'image-left-text-right',
    type: 'image-block',
    coverImage: {
      org: ''
    },
  }

  loading: any;
  ckeConfig = {
    allowedContent: true,
    height: 300
  };
  pageId = ''
  productId = ''
  vendorId = ''
  widgetID: any;  
  sectionName = '';
  sectionIndex:any;
  sections:any;

  constructor(
    private sharedService: SharedService,
    private events: Events,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private angularFirestore: AngularFirestore,
    private router: Router, private _location: Location) { }

  ngOnInit() { }


  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe(async params => {
      if (params && params.ID) {
        this.widgetID = params.ID;
        console.log(this.widgetID);
        this.events.publish('widgets:getWidgetData', this.widgetID);
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
      if(params && params.index){        
        this.sectionIndex = params.index;
      }      
    });

    this.initializeSubscriptions();
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  removeSubscriptions() {
    this.events.unsubscribe('widgets:addVideoBlockSuccess');
    this.events.unsubscribe('widgets:addVideoBlockError');
    this.events.unsubscribe('widgets:updateVideoBlockSuccess');
    this.events.unsubscribe('widgets:updateVideoBlockError');
    this.events.unsubscribe('widgets:publishWidgetDataSuccess');
  }

  initializeSubscriptions() {

    this.events.subscribe('widgets:addVideoBlockSuccess', async (id) => {
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
      this.widgetID = id;
      this.widget = {
        widgetID: this.widgetID,
        widgetType: 'image-block',
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
        await this.angularFirestore.collection('features').doc('multiVendor').collection('vendors').doc(this.vendorId).update({ sections: firebase.firestore.FieldValue.arrayUnion(this.widget)})
      }
      this.sharedService.presentAlert('saved Successfully, image uploaded will updated shortly')
      this._location.back();
    });

    this.events.subscribe('widgets:addVideoBlockError', () => {
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
      this.sharedService.presentAlert('Some Error Occured, please try again')
    });

    this.events.subscribe('widgets:updateVideoBlockSuccess', async () => {
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
      //this.widgetID = id;
      if(this.sectionIndex && this.pageId ){
        this.sections[this.sectionIndex].sectionName = this.sectionName;
        // console.log(this.sections,this.pageId);        
        await this.angularFirestore.collection('pages').doc(this.pageId).update({'sections':this.sections});
      }
      if (this.sectionIndex && this.productId) {
        this.sections[this.sectionIndex].sectionName = this.sectionName;
        await this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets').update({ 'sections': this.sections });
      }
      this.sharedService.presentAlert('updated Successfully, image uploaded will updated shortly')
    });

    this.events.subscribe('widgets:updateVideoBlockError', () => {
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
      this.sharedService.presentAlert('Some Error Occured, please try again')
    });

    this.events.subscribe('widgets:publishWidgetDataSuccess', (data) => {
      if (data) {
        this.widgetData = data;
        console.log(this.widgetData)
      }
    });

    this.getSections();
    
  }

  async getSections() {
    let res: any;
    if (this.pageId) {
      console.log("this.pageId", this.pageId);
      res = await this.angularFirestore.collection('pages').doc(this.pageId).valueChanges().pipe(first()).toPromise();
    }
    if (this.productId && this.pageId == '') {
      console.log("productId",this.productId);
      res = await this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets').valueChanges().pipe(first()).toPromise();
    }
    console.log('sections', res);
    if (res && res.sections) {
      this.sections = res.sections;
      if (this.sectionIndex) {
        this.sectionName = res.sections[this.sectionIndex].sectionName ? res.sections[this.sectionIndex].sectionName : "";
      }
    }
  }

  removeImage() {
    this.widgetData.coverImage.mob = '';
  }

  imgZoom(img: any) {
    this.modalController.create({
      component: ImageModalPage,
      cssClass: 'photo-modal-class',
      componentProps: {
        imgs: [{ url: img }],
        index: 0
      }
    }).then(modal => modal.present());
  }

  async addwidgetData() {
    if (!this.widgetData.coverImage.mob) {
      this.sharedService.presentAlert('Please Add Cover Image');
    }
    else {
      await this.sharedService.presentLoading();
      this.events.publish('widgets:addVideoBlock', this.widgetData);
    }
  }

  async updatewidgetData() {
    if (!this.widgetData.coverImage.mob) {
      this.sharedService.presentAlert('Please Add Cover Image');
    }
    else {
      await this.sharedService.presentLoading();
      this.events.publish('widgets:updateVideoBlock', this.widgetData, this.widgetID);
    }
  }

  async uploadImage(files: FileList) {
    const modal = await this.modalController.create({
      component: ImageEditorComponent,
      cssClass: 'custom-img-editor',
      componentProps: {
        aspectRatioWidthVal: 1,
        aspectRatioHeightVal: 1,
      },
    })
    await modal.present();
    modal.onDidDismiss().then(res => {
      this.widgetData.coverImage.org = res.data || '';
      this.widgetData.coverImage.mob = res.data || '';
    })
    //console.log(type);
    // for (let i = 0; i < files.length; i++) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(files.item(i))
    //   reader.onload = (event: any) => { // called once readAsDataURL is completed
    //     let base64Image: any = event.target.result;
    //     this.widgetData.coverImage.org = base64Image;
    //     this.widgetData.coverImage.mob = base64Image;
    //   }
    // }
  }

}

