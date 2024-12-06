import { Component, OnInit } from '@angular/core';
import { Events, ToastController,AlertController,LoadingController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';
@Component({
  selector: 'app-product-carousel-list',
  templateUrl: './product-carousel-list.page.html',
  styleUrls: ['./product-carousel-list.page.scss'],
})
export class ProductCarouselListPage implements OnInit {
  widgetList:any;
  widgetType:any;
  showLoader = true;
  noWidgets;
  seletedIndex:number;
  loading:any;
  title:any
 
  constructor(
    private events: Events,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private activatedRoute:ActivatedRoute,
    private sharedService:SharedService,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.initializeSubscriptions() ;
    this.activatedRoute.queryParams.subscribe(async params => {
      if (params && params.type) {
          this.widgetType = params.type;
          console.log(this.widgetType)
          if (this.widgetType=="product-carousel"){
            this.title = "Product Carousel"
          }
          else{
            this.title = "Product List"
          }
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
      if(this.loading){
        this.loading.dismiss();
      }
     });

     this.events.subscribe('widgets:deleteWidgetError', () => {
      if(this.loading){
        this.loading.dismiss();
      }
      this.sharedService.presentAlert('Some Error Occured, please try again')
     });
  }

 

  addNewCarousel(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        type:this.widgetType
      }
    };
    this.router.navigate(['edit-product-carousel'], navigationExtras);
  }

  editCarousel(ID){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ID: ID,
      }
    };
    this.router.navigate(['edit-product-carousel'], navigationExtras);
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
