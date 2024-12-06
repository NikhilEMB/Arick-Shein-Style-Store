import { Component, OnInit } from '@angular/core';
import { ProductSettingService } from 'src/app/services/product-setting/product-setting.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { first, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.page.html',
  styleUrls: ['./product-settings.page.scss'],
})
export class ProductSettingsPage implements OnInit {
  showPriceSlab: boolean = false;
  subheading = {text: '', img: ''};
  loading: any

  constructor(
    private sharedService: SharedService,
    private loadingController: LoadingController,
    private angularFireStorage: AngularFireStorage,
    private productSettingsService: ProductSettingService
  ) { }

  ngOnInit() {
  }

  async uploadImg(logoImg) {
    let imgType = this.sharedService.getImageType(logoImg);
    const imgRef = this.angularFireStorage.ref('settings/product/subheadingImg' + imgType);
    await imgRef.putString(logoImg, 'data_url');
    let downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
    return downloadURL;
  }
  async uploadLogo(files: FileList) {
    this.presentLoading();
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files.item(i))
      reader.onload = async (event: any) => { // called once readAsDataURL is completed
        let base64Image: any = event.target.result;
        this.subheading.img = await this.uploadImg(base64Image);
        if (this.loading) {
          this.loading.dismiss();
        }
      }
    }
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait ...'
    });
    await this.loading.present();
  }
  async deleteWidgetBgImage() {
    this.subheading.img = "";
  }
  async ionViewWillEnter() {
    await this.sharedService.presentLoading();
    let response: any = await this.productSettingsService.getProductSettings();
    console.log("response", response);
    if (response) {
      this.showPriceSlab = response.showPriceSlabBtn || false;
      this.subheading = response.subheading ? response.subheading : this.subheading;
    }
    await this.sharedService.loading.dismiss();
  }

  toggleCheckbox() {
    this.showPriceSlab = !this.showPriceSlab;
  }

  async saveSettings() {
    await this.sharedService.presentLoading();
    let dataObj = {
      showPriceSlabBtn: this.showPriceSlab,
      subheading: this.subheading
    }
    let response: any = await this.productSettingsService.saveProductSettings(dataObj);
    await this.sharedService.loading.dismiss();
    if (response) {
      await this.sharedService.presentAlert("Settings saved successfully");
    } else {
      await this.sharedService.presentAlert("Something went wrong");
    }
  }
}
