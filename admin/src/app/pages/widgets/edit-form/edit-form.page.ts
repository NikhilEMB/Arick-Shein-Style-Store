import { Component, OnInit } from '@angular/core';
import { Events, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AddInputPage } from 'src/app/pages/widgets/edit-form/add-input/add-input.page'
import { PreviewFormPage } from 'src/app/pages/widgets/edit-form/preview-form/preview-form.page'
import { ImageEditorComponent } from 'src/app/components/image-editor/image-editor.component';
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.page.html',
  styleUrls: ['./edit-form.page.scss'],
})
export class EditFormPage implements OnInit {

  formTitle: any;
  buttonName: any;
  loading: any;
  mode = 'new';
  widgetData: any = {
    banner: { url: '' }
  };
  widgetId: any
  pageId = ''
  type: any
  inputs = []
  multipleSubmissions = false
  formType = 'others'

  constructor(private events: Events,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private angularFirestore: AngularFirestore) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe(async params => {
      if (params && params.ID) {
        console.log('here', params.ID)
        this.widgetId = params.ID;
        this.events.publish('widgets:getWidgetData', this.widgetId);
      }

      if (params && params.pageId) {
        this.pageId = params.pageId;
      }

      if (params && params.type) {
        this.type = params.type
      }
    });

    this.initializeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('widgets:publishWidgetDataSuccess', async (data) => {
      this.widgetData = data;
      this.mode = 'edit';
      if (this.widgetData && this.widgetData.formTitle) {
        this.formTitle = this.widgetData.formTitle
      }
      if (this.widgetData && this.widgetData.buttonName) {
        this.buttonName = this.widgetData.buttonName
      }
      if (this.widgetData && this.widgetData.inputs) {
        this.inputs = this.widgetData.inputs
      }
      if (this.widgetData && this.widgetData.multipleSubmissions) {
        this.multipleSubmissions = this.widgetData.multipleSubmissions
      }
      this.formType = "formType" in this.widgetData ? this.widgetData.formType : this.formType;
      if (this.loading) {
        this.loading.dismiss();
      }
    });

    this.events.subscribe('widgets:addFormSuccess', async (Id) => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Form saved successfully')
      this.mode = 'edit';
      this.router.navigate(['forms']);
      // this.widgetId = Id;
      // let widget = {
      //   widgetID: this.widgetId,
      //   widgetType: this.type,
      //   location: "all"
      // }
      // await this.angularFirestore.collection('pages').doc(this.pageId).update({ sections: firebase.firestore.FieldValue.arrayUnion(widget) });
      // this.presentAlert('Form saved successfully')
      // this.mode = 'edit';
      // if (this.loading) {
      //   this.loading.dismiss();
      // }
    });

    this.events.subscribe('widgets:addFormError', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Save form failed, please try again')
    });

  }

  async saveWidget() {
    if (!this.formTitle) {
      this.presentAlert('Please fill the form title')
    }
    else if (!this.buttonName) {
      this.presentAlert('Please fill the button name')
    }
    else {
      if (this.mode == 'new') {
        this.type = 'form';
        this.presentLoading()
        let widgetData = {
          formTitle: this.formTitle,
          buttonName: this.buttonName,
          inputs: this.inputs,
          banner: this.widgetData.banner,
          type: this.type,
          multipleSubmissions: this.multipleSubmissions,
          formType: this.formType,
        }
        this.events.publish('widgets:saveForm', widgetData);
      }
      else {
        this.presentLoading()
        let widgetData = {
          formTitle: this.formTitle,
          buttonName: this.buttonName,
          inputs: this.inputs,
          banner: this.widgetData.banner,
          type: 'form',
          multipleSubmissions: this.multipleSubmissions,
          formType: this.formType,
        }
        try {
          await this.angularFirestore.collection('widgets').doc(this.widgetId).update(widgetData);
          if (this.loading) {
            this.loading.dismiss();
          }
          this.presentAlert('Form updated successfully')
        }
        catch (error) {
          console.log(error)
          if (this.loading) {
            this.loading.dismiss();
          }
          this.presentAlert('Form update failed')
        }
      }
    }
  }

  async uploadImage(files: FileList) {
    const modal = await this.modalController.create({
      component: ImageEditorComponent,
      cssClass: 'custom-img-editor',
      componentProps: {
        aspectRatioWidthVal: 3.42,
        aspectRatioHeightVal: 1,
      },
    })
    await modal.present();
    modal.onDidDismiss().then(res => {
      this.widgetData.banner.url = res.data || '';
    })
    //console.log(type);
    // for (let i = 0; i < files.length; i++) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(files.item(i))
    //   reader.onload = (event:any) => { // called once readAsDataURL is completed
    //     let base64Image:any = event.target.result;
    //     this.widgetData.banner.url = base64Image;
    //     console.log(this.widgetData.banner.url)
    //   }
    // }
  }

  removeImage() {
    this.widgetData.banner.url = '';
  }

  async addInput() {
    const modal = await this.modalController.create({
      component: AddInputPage,
      cssClass: 'custom-modal'
    })
    modal.onDidDismiss()
      .then((res) => {
        if (res.data) {
          this.inputs.push(res.data)
          console.log(this.inputs)
        }
      })
    await modal.present();
  }

  async previewForm() {
    const modal = await this.modalController.create({
      component: PreviewFormPage,
      cssClass: 'custom-modal',
      componentProps: {
        'formData': {
          formTitle: this.formTitle,
          buttonName: this.buttonName,
          inputs: this.inputs,
          banner: this.widgetData.banner
        }
      }
    })
    await modal.present();
  }

  removeInput(i) {
    this.inputs.splice(i, 1);
  }

  onReorderInputs(event) {
    const draggedItem = this.inputs.splice(event.detail.from, 1)[0];
    this.inputs.splice(event.detail.to, 0, draggedItem);
    event.detail.complete();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...'
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

  changeMultipleStatus() {
    this.multipleSubmissions = !this.multipleSubmissions
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  removeSubscriptions() {
    this.events.unsubscribe('widgets:publishWidgetDataSuccess');
    this.events.unsubscribe('widgets:widgetAddedSuccess');
    this.events.unsubscribe('widgets:addFormSuccess');
    this.events.unsubscribe('widgets:addFormError');
  }

}
