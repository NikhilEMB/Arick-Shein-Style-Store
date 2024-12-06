import { Component, OnInit } from '@angular/core';
import { Events , AlertController} from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-video-block-list',
  templateUrl: './video-block-list.page.html',
  styleUrls: ['./video-block-list.page.scss'],
})
export class VideoBlockListPage implements OnInit {
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
    this.removeSubscriptions();
  }

  removeSubscriptions() {
      this.events.unsubscribe('widgets:publishWidgetsListSuccess')
      this.events.unsubscribe('widgets:deleteWidgetSuccess')
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
    this.events.publish('widgets:getWidgetsList', 'video-block');
  }

  addNewVideoBlock(){
    this.router.navigate(['edit-video-block']);
  }

  editWidget(ID){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ID: ID,
      }
    };
    this.router.navigate(['edit-video-block'], navigationExtras);
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
