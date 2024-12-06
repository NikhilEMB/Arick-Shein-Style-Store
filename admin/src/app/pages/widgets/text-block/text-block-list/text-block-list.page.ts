import { Component, OnInit } from '@angular/core';
import { Events , AlertController} from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-text-block-list',
  templateUrl: './text-block-list.page.html',
  styleUrls: ['./text-block-list.page.scss'],
})
export class TextBlockListPage implements OnInit {
  noWidgets;
  seletedIndex:number;
  widgetList:any;
  showLoader = true;
  constructor(private events: Events, 
    private sharedService:SharedService,
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.initializeSubscriptions() ;
  }

  ionViewWillLeave() {
    this.removeSubscriptions()
    
  }
  removeSubscriptions(){
    this.events.unsubscribe('widgets:publishWidgetsListSuccess');
    this.events.unsubscribe('widgets:deleteWidgetSuccess');
    this.events.unsubscribe('widgets:deleteWidgetError');
  }

  initializeSubscriptions(){
    this.events.subscribe('widgets:publishWidgetsListSuccess', (widgetList) => {
      this.showLoader = false;
      console.log(widgetList)
      if(widgetList.length){
         this.widgetList = widgetList;
         this.noWidgets = false;
      }
      else{
        this.noWidgets = true;
      }
    });

    this.events.subscribe('widgets:deleteWidgetSuccess', () => {
      if(this.sharedService.loading){
        this.sharedService.loading.dismiss();
      }
     });

     this.events.subscribe('widgets:deleteWidgetError', () => {
      
      if(this.sharedService.loading){
        this.sharedService.loading.dismiss();
      }
      this.sharedService.presentAlert('Some Error Occured, please try again')
     });
    this.events.publish('widgets:getWidgetsList', 'text-block');
  }

  addNewVideoBlock(){
    this.router.navigate(['edit-text-block']);
  }

  editWidget(ID){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ID: ID,
      }
    };
    this.router.navigate(['edit-text-block'], navigationExtras);
  }

  async deleteWidgetConfirm(id: string) {
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
            this.deleteWidget(id);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteWidget(ID){
    this.events.publish('widgets:deleteWidget', ID);
    this.sharedService.presentLoading();
  }
}
