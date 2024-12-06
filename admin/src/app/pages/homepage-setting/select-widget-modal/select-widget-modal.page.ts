import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, Events, ModalController, AlertController, IonSelect } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { WidgetsService } from 'src/app/services/widgets/widgets.service';

@Component({
  selector: 'app-select-widget-modal',
  templateUrl: './select-widget-modal.page.html',
  styleUrls: ['./select-widget-modal.page.scss'],
})
export class SelectWidgetModalPage implements OnInit {
  @ViewChild('formSelect', {static: false}) formSelect: IonSelect ;
  loading: any;
  enableSubmit = false;
  showWidgetList = false;
  widgetList: any;
  widgetName: any;
  chackSubmit = false;
  noWidgetList;
  data: any = {};
  webSections: any = [];
  pageId = ''
  vendorId = '';
  
  forms = [];

  constructor(
    private loadingController: LoadingController,
    private events: Events,
    private modalController: ModalController,
    private alertController: AlertController,
    private sharedService: SharedService,
    private router: Router,
    private angularFirestore: AngularFirestore,
    private widgetService: WidgetsService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const forms: any = await this.widgetService.getWidgetsList('form', 'service');
    if (forms && forms.length) {
      this.forms = forms;
    }
    this.initializeSubscriptions();
  }

  initializeSubscriptions() {

    this.events.subscribe('widgets:publishWidgetsListSuccess', (widgetList) => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.showWidgetList = true;
      //console.log(widgetList);
      if (widgetList.length) {
        this.widgetList = widgetList;
      }
      else {
        this.noWidgetList = true;
      }
    });
  }
  getWidgetList(type) {
    //console.log(type)
    if (type == "banner-slider" || type == "image-banner") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          type: type,
          pageId: this.pageId,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-banner'], navigationExtras)
      this.modalController.dismiss()
    }
    else if (type == "product-carousel" || type == "product-list") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          type: type,
          pageId: this.pageId,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-product-carousel'], navigationExtras);
      this.modalController.dismiss()
    }
    else if (type == "image-block") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          pageId: this.pageId,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-image-block'], navigationExtras);
      this.modalController.dismiss()
    }
    else if (type == "video-block") {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          pageId: this.pageId,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-video-block'], navigationExtras);
      this.modalController.dismiss()
    }
    else if (type == 'text-block') {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          pageId: this.pageId,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-text-block'], navigationExtras);
      this.modalController.dismiss()
    }
    else if (type == 'categories') {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          pageId: this.pageId,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-categories'], navigationExtras);
      this.modalController.dismiss()
    }
    else if (type == 'brands') {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          pageId: this.pageId,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-brands'], navigationExtras);
      this.modalController.dismiss()
    }
    else if (type == 'services') {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          pageId: this.pageId,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-services'], navigationExtras);
      this.modalController.dismiss()
    }
    else if (type == 'form') {
      this.openFormSelect();
    }
    else if (type == 'document') {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          type: type,
          pageId: this.pageId,
          vendorId: this.vendorId
        }
      };
      this.router.navigate(['edit-document'], navigationExtras);
      this.modalController.dismiss()
    }
    else if (type == 'vendors') {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          type: type,
          pageId: this.pageId
        }
      };
      this.router.navigate(['edit-vendors'], navigationExtras);
      this.modalController.dismiss()
    }
  }

  async selectWidget(item) {
    this.data.widgetID = item.id;
    this.data.widgetTitle = item.title;
    this.data.widgetType = item.type;
    //console.log(this.data)
    //await this.modalController.dismiss(this.data);
  }

  async submitWidget() {
    let flag = 0
    if (this.data.widgetType == 'banner-slider' || this.data.widgetType == 'image-banner'
      || this.data.widgetType == 'image-block' || this.data.widgetType == 'video-block') {
      flag = 1
    }
    if ((!this.data.sectionName || this.data.sectionName.length < 5) && flag == 0) {
      if (!this.data.sectionName) {
        this.presentAlert('Please fill the name')
      }
      else {
        this.presentAlert('Name should be atleast 5 characters')
      }
    }

    else if (!this.data.widgetType) {
      this.presentAlert('Please Select Widget')
    }

    else if (this.data.widgetType == 'video-block' || this.data.widgetType == 'text-block' || this.data.widgetType == 'image-block'
      || this.data.widgetType == 'banner-slider' || this.data.widgetType == 'image-banner' || this.data.widgetType == 'product-carousel'
      || this.data.widgetType == 'product-list') {
      if (!this.data.widgetID) {
        this.presentAlert('Please Select Widget')
      }
      else {
        await this.modalController.dismiss(this.data);
      }
    }

    else {
      await this.modalController.dismiss(this.data);
    }


  }

  dismiss() {
    this.modalController.dismiss(false);
  }

  async selectStaticWidget(title, type) {
    this.data.widgetTitle = title;
    this.data.widgetType = type;
    console.table(this.data)
    const alert = await this.alertController.create({
      subHeader: "Enter Section Name",
      inputs: [
        {
          name: 'secName',
          type: 'text',
          placeholder: "Name"
        }
      ],
      buttons: [
        {
          text: "cancel",
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: "done",
          handler: async (data) => {
            if (!data.secName) {
              this.sharedService.presentToast("Please enter valid name");
              return false;
            } else {
              let sections: any = await this.angularFirestore.collection('pages').doc(this.pageId).valueChanges().pipe(first()).toPromise();
              this.webSections = sections.sections;
              let widget = {
                widgetType: this.data.widgetType,
                sectionName: data.secName,
                location: "all"
              }
              this.webSections.push(widget);
              await this.angularFirestore.collection('pages').doc(this.pageId).set({ 'sections': this.webSections });
              this.modalController.dismiss()
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait',
      duration: 2000,
    });
    await this.loading.present();
  }

  doBack() {
    this.showWidgetList = false;
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  openFormSelect() {
    this.formSelect.open();
  }

  async goToForm(e){
    this.presentLoading();
    const formId = e.target.value;
    console.log('formId:', formId);
    let widget = {
      widgetID: formId,
      widgetType: 'form',
      location: "all"
    }
    const success = await this.widgetService.addFormToPage(this.pageId, widget);
    if (this.loading) {
      this.loading.dismiss();
    }
    if (success) {
      this.presentAlert('Form added successfully');
    } else{
      this.presentAlert('Something went wrong, Please try again later.');
    }
    this.modalController.dismiss()
  }

}
