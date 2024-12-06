import { Component, OnInit } from '@angular/core';
import { AlertController, Events, LoadingController, ModalController } from '@ionic/angular';
import { LabelService } from 'src/app/services/label/label.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.page.html',
  styleUrls: ['./edit-categories.page.scss'],
})
export class EditCategoriesPage implements OnInit {

  SELECT_CATEGORIES_LABELS: any;
    SHARED_LABELS: any;
    addedFilters = {};
    dataList: any = [];
    isLoading = true;
    type = 'categories';
    linkedList = [];
    selectList=[];
    categoryId:any;
    sectionName:any;
    sectionIndex:any;
    sections:any
    loading: any
    pageId = ''
    designType: string = "normal";
    todaysDateTime = moment(new Date()).format('YYYY-MM-DDTHH:mm'); 
    endAt = null;

  constructor(
    private alertController: AlertController,
    private events: Events,
    private modalController: ModalController,
    private labelService: LabelService,
    private loadingController: LoadingController,
    private filtersService: FiltersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private angularFirestore: AngularFirestore) {
  }

    ionViewWillEnter() {
      this.activatedRoute.queryParams.subscribe(async params => {
          if (params && params.ID && params.index) {
            this.categoryId = params.ID;
            this.sectionIndex = params.index
          }
          if (params && params.pageId) {
            this.pageId = params.pageId;
          }
        });

      this.initializeSubscriptions();
    }

    ionViewWillLeave(){
      this.removeSubscriptions()
    }

    removeSubscriptions(){
      this.events.unsubscribe('widgets:addCategoriesSuccess');
      this.events.unsubscribe('widgets:publishWidgetDataSuccess');
      this.events.unsubscribe('widgets:categoryUpdateSuccess');
    }

    initializeSubscriptions(){
      this.events.subscribe('widgets:addCategoriesSuccess', () => {
        this.presentAlert('Section created successfully')
        this.router.navigate(['homepage-setting']);
      });
      this.events.subscribe('widgets:categoryUpdateSuccess', () => {
        this.presentAlert('Section updated successfully')
        this.router.navigate(['homepage-setting']);
      });
      this.events.subscribe('widgets:publishWidgetDataSuccess',async (data) => {
        let sections:any = await this.angularFirestore.collection('pages').doc(this.pageId).valueChanges().pipe(first()).toPromise();
        if(sections && sections.sections){
          this.sections = sections.sections;
          this.sectionName = sections.sections[this.sectionIndex].sectionName;
        }
        this.dataList.forEach(element => {
          if (data.categoryList.indexOf(element.id) > -1){
            element.active = true
            this.selectList.push(element.id)
          }
        });
        this.designType = 'designType' in data ? data.designType : this.designType;
        this.endAt = 'endAt' in data ? data.endAt : this.endAt;
        if (this.loading){
          this.loading.dismiss()
        }
      });
    }

    async ngOnInit() {
        this.SELECT_CATEGORIES_LABELS = this.labelService.labels['SELECT_CATEGORIES'];
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        let dbList: any = [];
        if (this.type === 'categories') {
            dbList = await this.filtersService.getCategoriesWithSubcategories(); 
        }
        if (this.type === 'brands') {
            dbList = await this.filtersService.getBrands();
        }
          if(this.linkedList.length) {
            dbList.map(parent => {
              if(this.linkedList.includes(parent.id)) {
                parent.active = true;
              }
              if(parent.sublist.length) {
                parent.sublist.map(child => {
                  if(this.linkedList.includes(child.id)) {
                    child.active = true;
                  }
                });
              }
            });
          }

        this.dataList = dbList;
        this.isLoading = false;
        if (this.categoryId){
          this.presentLoading()
          this.events.publish('widgets:getWidgetData', this.categoryId);
        }
    }

    closeModal() {
        this.modalController.dismiss();
    }

    toggleParentCheck(i) {
        this.dataList[i].active = !this.dataList[i].active;
    }

    selectParent(i) {
      this.dataList[i].active = !this.dataList[i].active;
      if ((this.selectList.indexOf(this.dataList[i].id) > -1) == false){
        this.selectList.push(this.dataList[i].id)
      }
      else if (this.selectList.indexOf(this.dataList[i].id) > -1){
        this.selectList.splice(this.selectList.indexOf(this.dataList[i].id),1)
      }
    }

    async onClickSave() {
      if(!this.sectionName){
        this.presentAlert('Please Fill the name Properly')
       }
      else if(this.sectionName.length < 5){
        this.presentAlert('Name should be atleast 5 characters')
      }
       else{
         let indexArray = []
         for (let i=0 ; i<this.selectList.length; i++){
          indexArray.push(this.dataList.findIndex(ele => ele.id == this.selectList[i]))
        }
        this.bubbleSort(indexArray)
         if (this.categoryId){
          this.sections[this.sectionIndex].sectionName=this.sectionName
          this.sections[this.sectionIndex]['designType'] = this.designType;
          if (this.designType === 'normal') this.endAt = null; 
          this.sections[this.sectionIndex]['endAt'] = this.endAt;
          await this.angularFirestore.collection('pages').doc(this.pageId).update({'sections':this.sections});
          await this.angularFirestore.collection('widgets').doc(this.categoryId).update({
             'designType': this.designType,
             'endAt': this.endAt
            });
          this.events.publish('widgets:updateCategories', this.categoryId, this.selectList);
         }
         else{
          this.events.publish('widgets:addCategories', this.selectList, this.sectionName, this.pageId);
         }
       }
    }

    bubbleSort(arr){
      var len = arr.length;
      for (var i = len-1; i>=0; i--){
        for(var j = 1; j<=i; j++){
          if(arr[j-1]>arr[j]){
              var temp = arr[j-1];
              arr[j-1] = arr[j];
              arr[j] = temp;
              var temp2 = this.selectList[j-1];
              this.selectList[j-1] = this.selectList[j];
              this.selectList[j] = temp2;
           }
        }
      }
      return arr;
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
        message: 'Please Wait...',
        duration: 10000
      });
      await this.loading.present();
    }

}
