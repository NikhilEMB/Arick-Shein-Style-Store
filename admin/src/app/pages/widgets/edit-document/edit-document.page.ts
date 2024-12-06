import { Component, OnInit } from '@angular/core';
import { Events, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { first } from 'rxjs/operators';
import { ImageEditorComponent } from 'src/app/components/image-editor/image-editor.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.page.html',
  styleUrls: ['./edit-document.page.scss'],
})
export class EditDocumentPage implements OnInit {

  description: any;
  btnTxt: any = 'Download';
  loading: any;
  mode = 'new';
  widgetData: any = {
    coverImage: { org: '' }
  };
  widgetId: any
  pageId = ''
  type: any;
  pdfUrl = ''
  productId = ''
  newFile = false
  sectionName = '';
  sectionIndex:any;
  sections:any;

  constructor(private events: Events,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private angularFirestore: AngularFirestore,
    private _location: Location) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe(async params => {
      if (params && params.ID) {
        this.widgetId = params.ID;
        this.events.publish('widgets:getWidgetData', this.widgetId);
      }

      if (params && params.pageId) {
        this.pageId = params.pageId;
      }

      if (params && params.type) {
        this.type = params.type
      }

      if (params && params.productId) {
        this.productId = params.productId;
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
    this.events.unsubscribe('widgets:addDocumentSuccess');
  }

  initializeSubscriptions() {
    this.events.subscribe('widgets:publishWidgetDataSuccess', async (data) => {
      this.widgetData = data;
      this.pdfUrl = this.widgetData.pdfUrl
      this.mode = 'edit';
      if (this.widgetData && this.widgetData.description) {
        this.description = this.widgetData.description
      }
      if (this.widgetData && this.widgetData.btnTxt) {
        this.btnTxt = this.widgetData.btnTxt
      }
      if (this.loading) {
        this.loading.dismiss();
      }
    });

    this.events.subscribe('widgets:addDocumentSuccess', async (Id) => {
      this.widgetId = Id;
      let widget = {
        widgetID: this.widgetId,
        // widgetType: this.type,
        widgetType: "document",
        location: "all",
        sectionName: this.sectionName
      }
      if (this.pageId != '') {
        await this.angularFirestore.collection('pages').doc(this.pageId).update({ sections: firebase.firestore.FieldValue.arrayUnion(widget) });
      }
      else if (this.productId != '') {
        let sectionRef = await this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets')
        if (! await sectionRef.valueChanges().pipe(first()).toPromise()) {
          await sectionRef.set({ sections: firebase.firestore.FieldValue.arrayUnion(widget) });
        }
        else {
          await sectionRef.update({ sections: firebase.firestore.FieldValue.arrayUnion(widget) });
        }
      }
      this.presentAlert('Document saved successfully')
      this.mode = 'edit';
      if (this.loading) {
        this.loading.dismiss();
      }
      this._location.back();
    });

    this.events.subscribe('widgets:addDocumentError', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Save document failed, please try again')
    });

    this.getSections();    
  }

  async getSections(){
    if(this.pageId){
      let res:any = await this.angularFirestore.collection('pages').doc(this.pageId).valueChanges().pipe(first()).toPromise();
      if(res && res.sections) {
        this.sections = res.sections;
        if(this.sectionIndex) {
          this.sectionName = res.sections[this.sectionIndex].sectionName ? res.sections[this.sectionIndex].sectionName : "";
        }
      } 
    }
  }

  async saveWidget() {
    if (this.mode == 'new') {
      this.presentLoading()
      let widgetData = {
        description: this.description,
        btnTxt: this.btnTxt,
        coverImage: this.widgetData.coverImage,
        pdfUrl: this.widgetData.pdfUrl,
        type: this.type
      }
      this.events.publish('widgets:saveDocument', widgetData);
    }
    else {
      this.presentLoading()
      let widgetData = {
        description: this.description,
        btnTxt: this.btnTxt,
        coverImage: this.widgetData.coverImage,
        pdfUrl: this.widgetData.pdfUrl,
        type: 'document'
      }
      try {
        await this.angularFirestore.collection('widgets').doc(this.widgetId).update(widgetData);
        if(this.sectionIndex){          
          this.sections[this.sectionIndex].sectionName = this.sectionName;
          // console.log(this.sections,this.pageId);
          await this.angularFirestore.collection('pages').doc(this.pageId).update({'sections':this.sections});
        }
        if (this.loading) {
          this.loading.dismiss();
        }
        this.presentAlert('Document updated successfully')
        this._location.back();
      }
      catch (error) {
        if (this.loading) {
          this.loading.dismiss();
        }
        this.presentAlert('Document update failed')
      }
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
    })
    //console.log(type);
    // for (let i = 0; i < files.length; i++) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(files.item(i))
    //   reader.onload = (event:any) => { // called once readAsDataURL is completed
    //     let base64Image:any = event.target.result;
    //     this.widgetData.coverImage.org = base64Image;
    //   }
    // }
  }

  uploadPdf(file) {
    if (file[0]) {
      this.widgetData.pdfUrl = file[0];
      this.newFile = true
    }
  }

  removeImage() {
    this.widgetData.coverImage.org = '';
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...'
    });
    await this.loading.present();
  }

}
