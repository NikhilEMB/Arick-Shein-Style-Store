import { LanguageService } from 'src/app/services/language/language.service';
import { AlertController, Events, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/services/label/label.service';

@Component({
  selector: 'app-language-current',
  templateUrl: './language-current.page.html',
  styleUrls: ['./language-current.page.scss'],
})
export class LanguageCurrentPage implements OnInit {

  headerText = '';
  SHARED_LABELS: any;
  ALL_LANGUAGES_LABELS: any;
  languages = [];
  showLoader = true;
  loading: any;
  currentIndex=0
  constructor(private labelService: LabelService,
              private router: Router,
              private events: Events,
              private loadingController: LoadingController,
              private languageService: LanguageService,
              private alertController: AlertController) { }

  async onReorderLang(event: { detail: { from: any; to: any; complete: () => void; }; }) {
    await this.presentLoading('Please wait', 3000);
    const start = event.detail.from;
    // tslint:disable-next-line: variable-name
    const id = this.languages[start].id;
    const end = event.detail.to;
    if ( start < end && end !== this.languages.length - 1) {
      const firstDate = this.languages[end].sortedAt.toDate().getTime();
      const secondDate = this.languages[end + 1].sortedAt.toDate().getTime();
      const changedDate = (firstDate + secondDate) / 2;
      this.languageService.updateLangPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else if (start < end && end === this.languages.length - 1) {
      const changedDate = this.languages[end].sortedAt.toDate().getTime() - 5 * 60000;
      this.languageService.updateLangPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else if (start > end && end !== 0) {
      const firstDate = this.languages[end].sortedAt.toDate().getTime();
      const secondDate = this.languages[end - 1].sortedAt.toDate().getTime();
      const changedDate = (firstDate + secondDate) / 2;
      this.languageService.updateLangPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else {
      const changedDate = this.languages[end].sortedAt.toDate().getTime() + 5 * 60000;
      this.languageService.updateLangPosition(id, new Date(changedDate));
    }
    const draggedItem = this.languages.splice(event.detail.from, 1)[0];
    this.languages.splice(event.detail.to, 0, draggedItem);
    event.detail.complete();
  }

  ngOnInit() {
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.ALL_LANGUAGES_LABELS = this.labelService.labels['ALL_LANGUAGES'];
    this.headerText = this.ALL_LANGUAGES_LABELS['header_text'];
    this.initializeSubscriptions();
    this.events.publish('language:getAddedLanguages');
  }
  ngOnDestroy() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('language:publishAddedLanguages', (langs) => {
      this.languages = langs;
      this.showLoader = false;
    });
    this.events.subscribe('language:updateLangPostionSucess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
    });
    this.events.subscribe('language:makeDefaultSuccess',(id) => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert(this.languages[this.currentIndex].langName+' '+this.ALL_LANGUAGES_LABELS['make_default_success_msg']);
    });
    this.events.subscribe('language:deleteLangSuccess', (id) => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert(this.languages[this.currentIndex].langName+' '+this.ALL_LANGUAGES_LABELS['delete_lang_success_msg']);
    });
  }

  async makeDefault(id: string,i) {
    await this.presentLoading('Please wait', 5000);
    this.currentIndex=i
    this.events.publish('language:makeDefault', id, this.languages);
  }

  async deleteLang(id: string,i) {
    await this.presentLoading('Please wait', 5000);
    this.currentIndex=i
    this.events.publish('language:deleteLang', id, this.languages);
  }

  gotoLanguageAdd() {
    this.router.navigate(['language-add']);
  }

  async presentLoading(msg: string, duration: number) {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: duration,
    });
    await this.loading.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [`${this.SHARED_LABELS['ok']}`]
    });

    await alert.present();
  }

  removeSubscriptions() {
    this.events.unsubscribe('language:publishAddedLanguages');
    this.events.unsubscribe('language:updateLangPostionSucess');
    this.events.unsubscribe('language:makeDefaultSuccess');
    this.events.unsubscribe('language:deleteLangSuccess');
  }

}
