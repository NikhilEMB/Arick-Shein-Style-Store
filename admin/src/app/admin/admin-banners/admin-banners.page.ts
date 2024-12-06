import { Component, OnInit } from '@angular/core';
import { Events, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { LabelService } from 'src/app/services/label/label.service';
import { NavigationExtras, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-banners',
  templateUrl: './admin-banners.page.html',
  styleUrls: ['./admin-banners.page.scss'],
})
export class AdminBannersPage implements OnInit {
  loading: any;
  ADMIN_BANNERS_LABELS: any = {};
  showWebLoader = true;
  showAppLoader = true;
  webBanners: any = [];
  appBanners: any = [];
  currentIndex;
  currentType;
  bannersLength = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  constructor(private events: Events,
      private domSanitizer: DomSanitizer,
      private router: Router,
      private alertController: AlertController,
      private labelService: LabelService,
      private loadingController: LoadingController,
      private toastController: ToastController) {}

  ngOnInit() {


  }
  ionViewWillEnter() {
      console.log('ionViewWillEnter');
      this.ADMIN_BANNERS_LABELS = this.labelService.labels['ADMIN_BANNERS'];
      this.initializeSubscriptions();
  }

  ionViewWillLeave() {
      this.removeSubscriptions();
  }

  getWebBannerImage(index) {
    let bindex = this.webBanners.findIndex(b => b.id === `image${index + 1}`);
    if (bindex === -1) {
        return 'assets/img/img-preloader.png';
    } else {
        if (this.webBanners[bindex].thumb && this.webBanners[bindex].thumb !== '') {
            return this.webBanners[bindex].thumb;
        } else if(this.webBanners[bindex].org && this.webBanners[bindex].org !== ''){
            return this.webBanners[bindex].org;
        }
        else{
          return 'assets/img/img-preloader.png';
        }
    }
}

getAppBannerImage(index) {
    let bindex = this.appBanners.findIndex(b => b.id === `image${index + 1}`);
    if (bindex === -1) {
        return 'assets/img/img-preloader.png';
    } else {
        if (this.appBanners[bindex].thumb && this.appBanners[bindex].thumb !== '') {
            return this.appBanners[bindex].thumb;
        }
        else if(this.appBanners[bindex].org && this.appBanners[bindex].org !== ''){
          return this.appBanners[bindex].org;
       }
       else{
          return 'assets/img/img-preloader.png';
          }
    }
}
  getWebBannerStatus(index) {
      let bindex = this.webBanners.findIndex(b => b.id === `image${index + 1}`);
      //console.log(this.webBanners[bindex]);
      if (bindex === -1) {
          return false;
      } else {
          return this.webBanners[bindex].active;
      }
  }


  getAppBannerStatus(index) {
      let bindex = this.appBanners.findIndex(b => b.id === `image${index + 1}`);
      //console.log(this.webBanners[bindex]);
      if (bindex === -1) {
          return false;
      } else {
          return this.appBanners[bindex].active;
      }
  }

  changeStatus(event, index, bannerType) {
    let status = event.detail.checked;
    console.log(status)
      if (bannerType == 'app') {
        console.log('changeStatus app')

          let bindex = this.appBanners.findIndex(b => b.id === `image${index + 1}`);
          if (bindex === -1) {
              this.presentAlert('Please add the banner')
          } else {
              this.events.publish('banners:changeBannerStatus', bindex + 1, status, bannerType);
          }

      } else {
        console.log('changeStatus web')
          let bindex = this.webBanners.findIndex(b => b.id === `image${index + 1}`);
          console.log(bindex)
          
          if (bindex === -1) {
              this.presentAlert('Please add the banner')
          } else {
              this.events.publish('banners:changeBannerStatus', bindex + 1, status, bannerType);
          }

      }

  }

  initializeSubscriptions() {
      this.events.subscribe('banners:publishWebBanners', (banners) => {
          if (banners) {
              this.webBanners = banners;
             }
             this.showWebLoader = false;
      });

      this.events.subscribe('banners:publishAppBanners', (banners) => {
          if (banners) {
              this.appBanners = banners;
          }
          this.showAppLoader = false;
      });

      this.events.subscribe('banners:updateBannerStatusSuccess', () => {
          this.presentToast('Banner Upated Successfuly');

      });


      this.events.publish('banners:getAppBanners');
      this.events.publish('banners:getWebBanners');
  }


  async deleteBannerConfirm(ID, type, i) {
      const alert = await this.alertController.create({
          message: 'Are you sure you want to remove this banner?',
          buttons: [{
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                  // //console.log('Confirm Cancel: blah');
              }
          }, {
              text: 'Okay',
              handler: () => {
                  this.removeBanner(ID, type, i);
              }
          }]
      });

      await alert.present();
  }

  removeBanner(ID, type, i) {
      this.events.publish('banners:removeBanner', ID, type);
      this.currentIndex = i;
  }




  editBanner(banner, index, bannerType) {
      let bannerData = null;

      if (bannerType == 'app') {
          this.appBanners.forEach(banner => {
              if (banner.id === `image${index + 1}`) {
                  bannerData = banner;
              }
          });

      } else {
          this.webBanners.forEach(banner => {
              if (banner.id === `image${index + 1}`) {
                  bannerData = banner;
              }
          });

      }

      const navigationExtras: NavigationExtras = {
          state: {
              bannerData: bannerData,
              bannerType: bannerType,
              index: index + 1
          }
      };
      this.router.navigate(['banner-settings'], navigationExtras);
  }



  addWebBanner() {
      const navigationExtras: NavigationExtras = {
          state: {
              bannerType: 'web',
              bannerMode: 'new'
          }
      };
      this.router.navigate(['banner-settings'], navigationExtras);
  }

  addAppBanner() {
      const navigationExtras: NavigationExtras = {
          state: {
              bannerType: 'app',
              bannerMode: 'new'
          }
      };
      this.router.navigate(['banner-settings'], navigationExtras);

  }

  async changeBannersStatus() {
      /* if(this.status) {
         await this.presentLoading();
         this.status = false;
         this.events.publish('banners:changeBannersStatus', this.status);
       } else {
         await this.presentLoading();
         this.status = true;
         this.events.publish('banners:changeBannersStatus', this.status);
       }*/
  }


  async presentLoading() {
      this.loading = await this.loadingController.create({
          message: 'Please Wait...',
          duration: 10000
      });
      await this.loading.present();
  }
  async presentAlert(msg: string) {
      const alert = await this.alertController.create({
          message: msg,
          buttons: ['OK']
      });

      await alert.present();
  }
  async presentToast(msg: string) {
      const toast = await this.toastController.create({
          message: msg,
          duration: 2000
      });
      toast.present();
  }

  /*web banner */

  removeSubscriptions() {
      this.events.unsubscribe('banners:publishBanners');
      this.events.unsubscribe('banners:publishWebBanners');
  }




}