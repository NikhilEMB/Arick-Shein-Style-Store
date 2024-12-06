import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AlertController, LoadingController } from "@ionic/angular";
import { CustomLanguageService } from "src/app/services/custom-language/custom-language.service";

@Component({
  selector: "app-custom-language",
  templateUrl: "./custom-language.page.html",
  styleUrls: ["./custom-language.page.scss"],
})
export class CustomLanguagePage implements OnInit {
  constructor(private fb: FormBuilder, private customLanguageService: CustomLanguageService, private alertController: AlertController, private loadingController: LoadingController) { }

  languageCodeData = ['ar', 'bn', 'de', 'en', 'es', 'fa', 'fr', 'gu', 'hi', 'it', 'ja', 'kn', 'ko', 'ml', 'mr', 'ne', 'nl', 'or', 'pa', 'pt', 'ru', 'sd', 'so', 'ta', 'te', 'th', 'ur', 'zh'];

  languageResult = {};
  loading: any;
  ngOnInit() { }

  languageForm = this.fb.group({
    platform: ['', Validators.required],
    languageCode: ['', Validators.required],
    parentKeyName: ['', Validators.required],
    childKeyName: ['', Validators.required],
    message: ['', Validators.required],
  });

  getLanguageData = this.fb.group({
    getPlatform: ['', Validators.required],
    getLanguageCode: ['', Validators.required],
    getParentKeyName: ['', Validators.required],
  })

  onSubmit() {
    let setData = this.customLanguageService.setCustomLanguage(this.languageForm.value);
    if (setData) {
      this.presentAlert('Message saved successfully');
    }
    this.getLanguageData.reset();
    this.languageResult = {};
  }

  async onGet() {
    await this.presentLoading();
    this.languageResult = await this.customLanguageService.getCustomLanguage(this.getLanguageData.value);
    if (this.loading) {
      await this.loading.dismiss();
    }
    if (!this.languageResult) {
      this.presentAlert('Please choose right location');
    }
  }

  checkObjLength() {
    if (this.languageResult == null) {
      return this.languageResult == '0';
    } else {
      return Object.keys(this.languageResult).length;
    }
  }

  async deleteField(key) {
    await this.presentLoading();
    delete this.languageResult[key];

    if (this.loading) {
      await this.loading.dismiss();
    }
    let updateData = this.customLanguageService.updateCustomLanguage(this.getLanguageData.value, this.languageResult);
    if (updateData) {
      this.presentAlert('Message deleted successfully');
    }
  }

  // updateResults() {
  //   let updateData = this.customLanguageService.updateCustomLanguage(this.getLanguageData.value, this.languageResult);
  //   if (updateData) {
  //     this.presentAlert('Messages updated successfully');
  //   }
  // }


  // ? Massage Modals 
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['ok']
    });
    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait ...'
    });
    await this.loading.present();
  }


}
