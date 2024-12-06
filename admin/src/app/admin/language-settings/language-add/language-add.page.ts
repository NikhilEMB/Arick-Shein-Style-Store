import { LabelService } from 'src/app/services/label/label.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, Events, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-add',
  templateUrl: './language-add.page.html',
  styleUrls: ['./language-add.page.scss'],
})
export class LanguageAddPage implements OnInit {

  headerText = '';
  SHARED_LABELS: any;
  ADD_LANGUAGES_LABELS: any;
  languages: any = [];
  loading: any;
  showLoader = true;
  constructor(private events: Events,
              private labelService: LabelService,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private router: Router) { }

  ngOnInit() {
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.ADD_LANGUAGES_LABELS = this.labelService.labels['ADD_LANGUAGES'];
    this.headerText = this.ADD_LANGUAGES_LABELS['header_text'];
  }

  async ionViewWillEnter() {
    this.initializeSubscriptions();
    this.events.publish('language:getAvailableLanguages');
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('language:publishAvailableLanguages', (languages) => {
      this.languages = languages;
      this.showLoader = false;
    });
    this.events.subscribe('language:addLanguagesSuccess',async () => {
      if (this.loading) {
        await this.loading.dismiss();
      }
      await this.presentAlert(this.ADD_LANGUAGES_LABELS['languages_saved_success_msg']);
    });
  }

  async presentLoading(duration: number, msg: string) {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: duration,
    });
    await this.loading.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: this.SHARED_LABELS['ok'],
      }]
    });

    await alert.present();
  }

  async toggleLangAdd(i: number) {
    this.languages[i].isAdded = !this.languages[i].isAdded;
    await this.presentLoading(10000, this.SHARED_LABELS['please_wait']);
    this.events.publish('language:addLanguages', this.languages);
  }

  async onClickSave() {
    await this.presentLoading(5000, this.SHARED_LABELS['please_wait']);
    this.events.publish('language:addLanguages', this.languages);
  }

  removeSubscriptions() {
    this.events.unsubscribe('language:publishAvailableLanguages');
    this.events.unsubscribe('language:addLanguagesSuccess');
  }

}
