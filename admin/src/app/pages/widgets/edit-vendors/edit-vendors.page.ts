import { Component, OnInit } from '@angular/core';
import { AlertController, Events, LoadingController, ModalController } from '@ionic/angular';
import { LabelService } from 'src/app/services/label/label.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { WidgetsService } from 'src/app/services/widgets/widgets.service';

@Component({
  selector: 'app-edit-vendors',
  templateUrl: './edit-vendors.page.html',
  styleUrls: ['./edit-vendors.page.scss'],
})
export class EditVendorsPage implements OnInit {

  SELECT_CATEGORIES_LABELS: any;
    SHARED_LABELS: any;
    addedFilters = {};
    dataList: any = [];
    isLoading = true;
    type = 'vendors';
    linkedList = [];
    selectList=[];
    vendorWidgetId:any;
    sectionName:any;
    sectionIndex:any;
    sections:any
    loading: any
    pageId = ''

    constructor(private alertController: AlertController, private events: Events,private modalController: ModalController,
        private labelService: LabelService,private loadingController: LoadingController,
        private filtersService: FiltersService,private router: Router,private activatedRoute: ActivatedRoute, 
        private angularFirestore: AngularFirestore,private widgetService: WidgetsService) {
         }

    ionViewWillEnter() {
      this.activatedRoute.queryParams.subscribe(async params => {
          if (params && params.ID && params.index) {
            this.vendorWidgetId = params.ID;
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
          if (data.vendorsList.indexOf(element.id) > -1){
            element.active = true
            this.selectList.push(element.id)
          }
        });
        if (this.loading){
          this.loading.dismiss()
        }
      });
    }

    async ngOnInit() {
        this.SELECT_CATEGORIES_LABELS = this.labelService.labels['SELECT_CATEGORIES'];
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        let dbList: any = [];
        dbList = await this.widgetService.getAllVendorIds()
        this.dataList = dbList;
        this.isLoading = false;
        if (this.vendorWidgetId){
          this.presentLoading()
          this.events.publish('widgets:getWidgetData', this.vendorWidgetId);
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
      else if (this.selectList.length == 0){
        this.presentAlert('Please select atleast one Vendor!')
      }
       else{
         let indexArray = []
         for (let i=0 ; i<this.selectList.length; i++){
          indexArray.push(this.dataList.findIndex(ele => ele.id == this.selectList[i]))
        }
        this.bubbleSort(indexArray)
         if (this.vendorWidgetId){
          this.sections[this.sectionIndex].sectionName=this.sectionName
          await this.angularFirestore.collection('pages').doc(this.pageId).update({'sections':this.sections});
          let updateResult = await this.widgetService.updateVendors(this.vendorWidgetId, this.selectList)
          if (updateResult){
            this.presentAlert('Data Saved Successfully!')
          }
         }
         else{
          let updateResult = await this.widgetService.addVendors(this.selectList, this.sectionName, this.pageId)
          if (updateResult){
            this.presentAlert('Vendors Add Successfully!')
          }
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
      });
      await this.loading.present();
    }


}
