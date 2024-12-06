import { Component, OnInit } from '@angular/core';
import { ModalController, Events, LoadingController, AlertController, Platform } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-pages-setting',
  templateUrl: './pages-setting.page.html',
  styleUrls: ['./pages-setting.page.scss'],
})
export class PagesSettingPage implements OnInit {

  pages: any
  loading: any
  newPageName: any

  constructor(
    public modalController: ModalController,
    private events: Events,
    private router: Router,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    // this.initializeSubscriptions()
  }

  ionViewWillEnter() {
    this.initializeSubscriptions()
    this.events.publish('page-setting:getPages');
  }
  
  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('page-setting:publishPagesSuccess', (pageData) => {
      if (pageData) {
        let result = pageData.filter(page => page.type !== 'blog');
        this.pages = result;
      }
    });
    this.events.subscribe('page-setting:deletePageSuccess', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.events.publish('page-setting:getPages');
      this.presentAlert('Page deleted successfully')
    });
    this.events.subscribe('page-setting:pageAddedSuccess', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.events.publish('page-setting:getPages');
      this.presentAlert('Page added successfully')
    });
  }

  editPage(id, name) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        pageId: id,
        pageName: name
      }
    };
    this.router.navigate(['homepage-setting'], navigationExtras);
  }

  deletePage(id) {
    this.presentLoading()
    this.events.publish('page-setting:deletePage', id);
  }

  addPage() {
    if (this.newPageName) {
      if (this.newPageName.toLowerCase() == 'contact') {
        this.presentAlert('Contact page already exists for website, please create page with other name');
        return;
      }
      this.presentLoading()
      this.events.publish('page-setting:addPage', this.newPageName);
    }
    else {
      this.presentAlert('Please enter name for page')
    }
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Please Wait...",
    });
    await this.loading.present();
  }

  removeSubscriptions() {
    this.events.unsubscribe('page-setting:publishPagesSuccess');
    this.events.unsubscribe('page-setting:deletePageSuccess');
    this.events.unsubscribe('page-setting:pageAddedSuccess');
  }
}
