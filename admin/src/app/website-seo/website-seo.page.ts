import { Component, OnInit } from '@angular/core';
import { Events, AlertController, LoadingController,ToastController } from '@ionic/angular';
import { AdminSettingsService } from "../services/admin-settings/admin-settings.service";

@Component({
  selector: 'app-website-seo',
  templateUrl: './website-seo.page.html',
  styleUrls: ['./website-seo.page.scss'],
})
export class WebsiteSeoPage implements OnInit {
  showLoader: boolean = false;
  websiteSEOData = {
    pageTitle:"",
    metaDescription:"",
    metaKeywords:"",
    socialMediaBannerURL:"",
    socialMediaTitle:"",
    socialMediaDescription:"",
    socialMediaURL:""
  }
  socialMediaBanner;
  alert: any;
  loading:any;

  constructor(
    private events: Events, 
    private alertController: AlertController, 
    private loadingController: LoadingController,
    private toastController:ToastController,
    private adminSettingsService: AdminSettingsService
  ) { }

  ngOnInit() {

    this.events.publish('admin-settings:getWebsiteSEOData');
    
    this.events.subscribe('admin-settings:saveWebsiteSEODataSuccess', () => {
      if(this.loading){
        this.loading.dismiss();
      }
      if (!this.alert){
        this.presentAlert('Settings saved successfully!')
      }
    });

    this.events.subscribe('admin-settings:publishSEOData', (seoData) => {
      this.websiteSEOData = seoData;
      /*if(seoData.socialMediaBannerURL){
        this.socialMediaBanner = seoData.socialMediaBannerURL;
      }*/
     });

    
  }

  async presentLoading() {
   this.loading = await this.loadingController.create({
      message: 'please wait',
    });
    await this.loading.present();
  }



  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(desc: string, action?: boolean) {
    this.alert = await this.alertController.create({
      message: desc,
      buttons: [{
        text: 'Ok',
      }]
    });
    await this.alert.present();
  }

  saveData(){
    this.presentLoading();
    this.events.publish('admin-settings:saveWebsiteSEOData', this.websiteSEOData, this.socialMediaBanner);
  }


  uploadImage(files: FileList) {
    this.presentLoading();
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = async (event:any) => { // called once readAsDataURL is completed
        let base64Image:any = event.target.result;
        this.socialMediaBanner = base64Image;
        this.websiteSEOData.socialMediaBannerURL = await this.adminSettingsService.uploadSEOBanner(base64Image);
        if(this.loading){
          this.loading.dismiss();
        }
        
      }
    }
  }

  removeImage(){
    this.socialMediaBanner = ''
    this.websiteSEOData.socialMediaBannerURL = ''
  }

}
