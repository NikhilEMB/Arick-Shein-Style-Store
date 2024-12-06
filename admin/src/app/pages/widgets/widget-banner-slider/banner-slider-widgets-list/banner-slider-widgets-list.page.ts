import { Component, OnInit } from '@angular/core';
import { Events, ToastController,AlertController,LoadingController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-banner-slider-widgets-list',
  templateUrl: './banner-slider-widgets-list.page.html',
  styleUrls: ['./banner-slider-widgets-list.page.scss'],
})
export class BannerSliderWidgetsListPage implements OnInit {
  widgetList:any
  widgetType;
  showLoader = true;
  noWidgets;
  seletedIndex:number;
  loading:any;
  constructor(
    private events: Events,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
    ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.initializeSubscriptions() ;
    this.activatedRoute.queryParams.subscribe(async params => {
      if (params && params.type) {
          this.widgetType = params.type;
          console.log(this.widgetType)
          this.events.publish('widgets:getWidgetsList', this.widgetType);
          
      }
  });
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  removeSubscriptions(){
    this.events.unsubscribe('widgets:publishWidgetsListSuccess');
    this.events.unsubscribe('widgets:deleteWidgetSuccess');
  }

  initializeSubscriptions() {
    this.events.subscribe('widgets:publishWidgetsListSuccess', (widgetList) => {
      this.showLoader = false;
      console.log('widgetList', widgetList)
      if(widgetList.length){
         this.widgetList = widgetList;
         this.noWidgets = false;
      }
      else{
        this.noWidgets = true;
      }
    });

    this.events.subscribe('widgets:deleteWidgetSuccess', () => {
      if(this.loading){
        this.loading.dismiss();
      }
     });

  }

  
  addNewBannerSlider(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        type:this.widgetType
      }
    };
    this.router.navigate(['edit-banner'], navigationExtras);
  }

  editBanner(ID){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ID: ID,
      }
    };
    this.router.navigate(['edit-banner'], navigationExtras);
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

  deleteWidget(ID:string){
   
    this.events.publish('widgets:deleteWidget', ID);
    console.log(`deleteWidget ${this.seletedIndex}`)
    this.presentLoading();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait',
      duration: 2000,
    });
    await this.loading.present();
  }

}
