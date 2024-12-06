import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import {ModalController,AlertController,LoadingController } from '@ionic/angular';
import { SelectWidgetModalPage } from './select-widget-modal/select-widget-modal.page';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config.service';
import { EditWidgetPage } from './edit-widget/edit-widget.page';
import { Events} from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-homepage-setting',
  templateUrl: './homepage-setting.page.html',
  styleUrls: ['./homepage-setting.page.scss'],
})
export class HomepageSettingPage implements OnInit {
  pageData:any = [];
  appSections:any = [];
  selectedWebSection;
  selectedAppSection;
  selectedSectionType;
  selectedWidgetData;
  selectedSectionIndex;
  webLoader = true;
  appLoader = true;
  nopageData = false;
  noAppSections = false;
  loading:any;
  sectionLimit:any
  pageId = 'homepage'
  pageName = ''
  pages = []
  widgets = ['banner-slider','image-banner','product-carousel','product-list','image-block-list','video-block-list','text-block-list']
  regionId = [];
  multiRegion = false;
  regions = [];
  slug = {
    name:'',
    updatedAt: new Date(),
    updatedBy: 'admin'
  }
  isUniversal = false;

  constructor(private modalController: ModalController, 
    private angularFirestore: AngularFirestore,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router:Router, private configService: ConfigService,private events: Events,private route: ActivatedRoute, public sharedService: SharedService
    ) { 
      this.route.queryParams.subscribe(params => {
        if (params && params.pageId) {
          this.pageId = params.pageId
        }
        if (params && params.pageName) {
          this.pageName = params.pageName
        }
      });
    }

  ngOnInit() {
    this.sectionLimit = this.configService.environment.sectionsLimit;
    this.isUniversal = this.sharedService.isUniversal();
  }

   ionViewWillEnter() {
    //  console.log("here")
    this.getSections();
    this.initializeSubscriptions();
    this.multiRegion = this.configService.environment.multiRegion;
    if(this.multiRegion) {
      this.events.publish('multi-region:getActiveStatus');
      this.events.publish('multi-region:getAllActiveRegions');
    }
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('multi-region:publishActiveStatus', (data) => {
      if(data) {
        this.multiRegion = data.active;
      }
    });
    this.events.subscribe('multi-region:publishAllActiveRegions', (regions) => {
      if(regions.length) {
        this.regions = regions;
      }
      console.log(regions)
    });
  }

  openWidget(page: string) {
    // console.log('goToPage', page);
    this.router.navigate([page]);
  }

  openBannerWidget(type: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        type: type,
      }
    };
    this.router.navigate(['banner-slider-widgets-list'], navigationExtras);
  }

  goToSample(){
    this.router.navigate(['sample-homepage'])
  }


  openProductWidget(type: string){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        type: type,
      }
    };
    this.router.navigate(['product-carousel-list'], navigationExtras);

  }

  async getSections(){
    try {
     let sections:any = await this.angularFirestore.collection('pages').doc(this.pageId).valueChanges().pipe(first()).toPromise();
         this.appSections = sections.appData;
         this.appLoader = false;
         if(sections && sections.sections){
           this.pageData = sections.sections;
         }
         this.slug = sections.slug || this.slug;
         // console.log("sections:",this.pageData)
         this.webLoader = false;
    } catch (error) {
      console.log(error);
    }
   }
    

  appSectionReorder(event){
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
     let draggedItem = this.appSections.splice(event.detail.from,1)[0];
     this.appSections.splice(event.detail.to,0,draggedItem)
    //this.listItems = reorderArray(this.listItems, event.detail.from, event.detail.to);
    console.table(this.appSections);
    event.detail.complete();
  }

  async webSectionReorder(event){
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
     let draggedItem = this.pageData.splice(event.detail.from,1)[0];
     this.pageData.splice(event.detail.to,0,draggedItem)
    //this.listItems = reorderArray(this.listItems, event.detail.from, event.detail.to);
    console.table(this.pageData);
    event.detail.complete();
    await this.angularFirestore.collection('pages').doc(this.pageId).update({'sections':this.pageData});
    if(this.loading){
      this.loading.dismiss();
    }
    this.presentAlert('Page Save Successfully');
  }

  openWidgetEdit(type,id, index){
    if (type=="image-banner" || type=="banner-slider"){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          pageId: this.pageId
        }
      };
      this.router.navigate(['edit-banner'], navigationExtras);
    }
    else if (type=="product-carousel" || type=="product-list"){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          pageId: this.pageId,
          type: type
        }
      };
      this.router.navigate(['edit-product-carousel'], navigationExtras);
    }
    else if (type=="image-block"){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          pageId: this.pageId
        }
      };
      this.router.navigate(['edit-image-block'], navigationExtras);
    }
    else if (type=="video-block"){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          pageId: this.pageId
        }
      };
      this.router.navigate(['edit-video-block'], navigationExtras);
    }
    else if (type=="text-block"){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          pageId: this.pageId
        }
      };
      this.router.navigate(['edit-text-block'], navigationExtras);
    }
    else if (type=="categories"){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          pageId: this.pageId
        }
      };
      this.router.navigate(['edit-categories'], navigationExtras);
    }
    else if (type=="brands"){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          pageId: this.pageId
        }
      };
      this.router.navigate(['edit-brands'], navigationExtras);
    }
    else if (type=="services"){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          pageId: this.pageId
        }
      };
      this.router.navigate(['edit-services'], navigationExtras);
    }
    else if (type=="form"){
      this.presentAlert('Please edit this Form from Forms List in sidemenu')
      // const navigationExtras: NavigationExtras = {
      //   queryParams: {
      //     ID: id,
      //     index: index,
      //     pageId: this.pageId
      //   }
      // };
      // this.router.navigate(['edit-form'], navigationExtras);
    }
    else if (type=="document"){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          pageId: this.pageId
        }
      };
      this.router.navigate(['edit-document'], navigationExtras);
    }
    else if (type=="vendors"){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ID: id,
          index: index,
          pageId: this.pageId
        }
      };
      this.router.navigate(['edit-vendors'], navigationExtras);
    }
  }

  async openSelectWidgetModal(index?:number, type?:string) {
    if(typeof index === 'number'){
      this.selectedSectionIndex = index;
      console.log('index',index)
    }
    if(type){
      this.selectedSectionType = type;
      console.log(type)
    }
    const modal = await this.modalController.create({
    component: SelectWidgetModalPage,
    backdropDismiss:false,
    cssClass:'custom-modal',
    componentProps: { pageId: this.pageId }
    });
    modal.onDidDismiss().then(()=>{
      this.getSections()
    })
    await modal.present();
  }

  async openEditWidgetModal() {
    console.log("openEdit")
    const modal = await this.modalController.create({
    component: EditWidgetPage,
    backdropDismiss:false,
    cssClass:'custom-modal'
    });
    await modal.present();
  }

  async changeLocationStatus(index,type){
    await this.presentLoading();
    if (type=="app"){
      if (this.pageData[index].location=="app"){
        this.pageData[index].location="none";
      }
      else if (this.pageData[index].location=="none"){
        this.pageData[index].location="app";
      }
      else if (this.pageData[index].location=="all"){
        console.log(3)
        this.pageData[index].location="web";
      }
      else if (this.pageData[index].location=="web"){
        this.pageData[index].location="all";
      }
    }
    else if (type=="web"){
      if (this.pageData[index].location=="web"){
        this.pageData[index].location="none";
      }
      else if (this.pageData[index].location=="none"){
        this.pageData[index].location="web";
      }
      else if (this.pageData[index].location=="all"){
        this.pageData[index].location="app";
      }
      else if (this.pageData[index].location=="app"){
        this.pageData[index].location="all";
      }
    }
    console.log("new",this.pageData[index].location,index,this.pageData)
    try {
      await this.angularFirestore.collection('pages').doc(this.pageId).update({'sections':this.pageData});
      if(this.loading){
        this.loading.dismiss();
      }
      this.presentAlert('Page Save Successfully');
    } catch (error) {
      console.log(error)
      this.presentAlert('Some error occured, please try again');
      
    }

  }

  addNewSection(){
    if (this.pageData.length<this.sectionLimit)
    {
      this.openSelectWidgetModal();
      this.selectedSectionType = "web";
      this.selectedSectionIndex = null;
    }
    else{
      this.presentAlert('Sections limit reached, Max '+this.sectionLimit+' allowed');
    }
  }

  addDatatoSection(index?){
    if (this.selectedSectionType == 'web') {
      if (typeof index === 'number') {
        this.pageData[index] = this.selectedWidgetData;
        console.log('web', this.pageData)
        
      } else {
        this.pageData.push(this.selectedWidgetData);
        console.log('web', this.pageData)
      }
    } 
    else {
      if (typeof index === 'number') {
        this.appSections[index] = this.selectedWidgetData;
        console.log('app', this.appSections)
        
      } else {
        this.appSections.push(this.selectedWidgetData);
        console.log('app', this.appSections)
      }  
    }
  }

  selectWidget(name){
    console.log(name.target.value)
    const navigationExtras: NavigationExtras = {
      queryParams: {
        type: name.target.value,
      }
    };
    this.router.navigate(['banner-slider-widgets-list'], navigationExtras);
  }

  async save(){
    this.presentLoading();
    try {
      await this.angularFirestore.collection('pages').doc(this.pageId).set({'sections':this.pageData});
      if(this.loading){
        this.loading.dismiss();
      }
      this.presentAlert('Page Save Successfully');
    } catch (error) {
      console.log(error)
      this.presentAlert('Some error occured, please try again');
      
    }
  }

  async deleteSectionConfirm(widgetID,index: number, type:string) {
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
            if (type == 'form') {
              this.deleteSection(index, type);
            } else {
              this.events.publish('widgets:deleteWidget', widgetID);
              this.deleteSection(index, type);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteSection(index:number, type:string){
    this.presentLoading();
    console.log('delete', type, index)
    if (type == 'web') {
      this.pageData.splice(index, 1);
    } else {
      this.appSections.splice(index, 1);
    }
    try {
      await this.angularFirestore.collection('pages').doc(this.pageId).update({'sections':this.pageData});
      if(this.loading){
        this.loading.dismiss();
      }
      this.presentAlert('Page Save Successfully');
    } catch (error) {
      console.log(error)
      this.presentAlert('Some error occured, please try again');
    }
  }

  async changeName(){
    try {
      let updatedPageData = {
        name: this.pageName
      }
      if (this.isUniversal) {
        const slugName = this.sharedService.createSlugName(this.slug.name);
        const sameSlugExists = await this.sharedService.sameSlugExists('pages', this.pageId, slugName);
        console.log('sameSlug:', sameSlugExists);
        if (sameSlugExists) {
          this.presentAlert('Same slug already exists, please try with another slug name');
          return;
        } else{
          updatedPageData['slug'] = {
            name: slugName,
            updatedAt: new Date(),
            updatedBy: 'admin'
          }
        }
      }
      this.presentLoading();
      await this.angularFirestore.collection('pages').doc(this.pageId).update(updatedPageData);
      if(this.loading){
        this.loading.dismiss();
      }
      this.presentAlert('Name saved successfully');
    } catch (error) {
      console.dir(error);
      if(this.loading){
        this.loading.dismiss();
      }
      this.presentAlert('Some error occured, please try again');
    }
  }

  async addRegion(e,index) {
    await this.presentLoading();
    this.pageData[index].regionId = e.target.value;
    await this.angularFirestore.collection('pages').doc(this.pageId).update({'sections':this.pageData});
    if(this.loading){
      this.loading.dismiss();
    }
    this.presentAlert('Region saved successfully!');

  }

  removeSubscriptions() {
    this.events.unsubscribe('multi-region:publishActiveStatus');
    this.events.unsubscribe('multi-region:publishAllActiveRegions')
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
      message: 'Please Wait',
      duration: 2000,
    });
    await this.loading.present();
  }

}
