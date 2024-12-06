import { Component, OnInit } from '@angular/core';
import { ModalController, Events, LoadingController, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-blogs-setting',
  templateUrl: './blogs-setting.page.html',
  styleUrls: ['./blogs-setting.page.scss'],
})
export class BlogsSettingPage implements OnInit {

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
    this.events.publish('page-setting:getPages', "blog");
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('page-setting:publishPagesSuccess', (pageData) => {
      if (pageData) {
        this.pages = pageData
      }
    });
    this.events.subscribe('page-setting:deletePageSuccess', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.events.publish('page-setting:getPages', "blog");
      this.presentAlert('Page deleted successfully')
    });
    this.events.subscribe('page-setting:pageAddedSuccess', () => {
      if (this.loading) {
        this.loading.dismiss()
      }
      this.events.publish('page-setting:getPages', "blog");
      this.presentAlert('Page added successfully')
    });
  }

  editPage(id: string, name: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        pageId: id,
        pageName: name
      }
    };
    this.router.navigate(['homepage-setting'], navigationExtras);
  }

  deletePage(id: string) {
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
      this.events.publish('page-setting:addPage', this.newPageName, "blog");
    }
    else {
      this.presentAlert('Please enter name for page')
    }
  }

  async presentAlert(msg: string) {
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
