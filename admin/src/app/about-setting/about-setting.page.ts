import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, first } from 'rxjs/operators';
import { LoadingController,AlertController} from '@ionic/angular';
import { SharedService } from '../services/shared/shared.service';


@Component({
  selector: 'app-about-setting',
  templateUrl: './about-setting.page.html',
  styleUrls: ['./about-setting.page.scss'],
})
export class AboutSettingPage implements OnInit {
  ckeConfig =  {
    allowedContent: true,
    height: 700
};
  loading:any;
  aboutPageData:any = {
    pageTitle: '',
    bannerImageURL:{},
    pageContent:''
  }
  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private sharedService: SharedService
  ) {
    this.getPageData();
   }

   async getPageData(){
    let data = await this.angularFirestore.collection('pages').doc('about').valueChanges().pipe(first()).toPromise();
    if(data){
      this.aboutPageData = data;
    }
   }

   uploadImage(files: FileList) {
    this.presentLoading();
    
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = async (event:any) => { // called once readAsDataURL is completed
        let base64Image:any = event.target.result;
        this.aboutPageData.bannerImageURL['org'] = await this.uploadSEOBanner(base64Image);
        if(this.loading){
          this.loading.dismiss();
        }
        
      }
    }
  }

  removeImage(){
    this.aboutPageData.bannerImageURL.org = '';
    this.aboutPageData.bannerImageURL.mob = '';
    this.aboutPageData.bannerImageURL.thumb = '';
  }

   async uploadSEOBanner(socialMediaBannerImg){
    let imgType  = this.sharedService.getImageType(socialMediaBannerImg);
    const imgRef = this.angularFireStorage.ref('websiteSEOData/socialMediaBanner' + imgType);
    await imgRef.putString(socialMediaBannerImg, 'data_url');
    let downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
    return downloadURL;
  }

  saveData(){
    this.presentLoading();
    
    const dataRef = this.angularFirestore.collection('pages').doc('about');
    dataRef.get().subscribe(async (doc) => {
      if(doc.exists) {
        await dataRef.update(this.aboutPageData);
        if(this.loading){
          this.loading.dismiss();
        }
        this.presentAlert('Settings updated successfully')
      } else {
        await dataRef.set(this.aboutPageData);
        if(this.loading){
          this.loading.dismiss();
        }
        this.presentAlert('Settings saved successfully')
      }
    });

  }

  ngOnInit() {
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
       message: 'please wait',
     });
     await this.loading.present();
   }

   async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'ok',
        handler: () => {
        }
      }]
    });

    await alert.present();
  }

}
