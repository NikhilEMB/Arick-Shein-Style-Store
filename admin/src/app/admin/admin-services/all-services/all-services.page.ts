import { Component, OnInit } from '@angular/core';
import { Events, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.page.html',
  styleUrls: ['./all-services.page.scss'],
})
export class AllServicesPage implements OnInit {
  isActive = false;
  services = [];
  loading: any;
  showLoader = true;
  constructor(private events: Events,
              private router: Router,
              public loadingController: LoadingController,
              public alertController: AlertController,
              private toastController: ToastController) { }

  ngOnInit() {
    this.initializeSubscriptions();
    this.events.publish('services-feature:getAllServices');
    this.events.publish('services-feature:getServicesActiveStatus');
  }

  getDateTimeFormat(date){
    return moment(date).format('MMM D, YYYY hh:mm a');
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('services-feature:publishAllServices', (services) => {
      this.services = services;
      this.showLoader = false;
    });
    this.events.subscribe('services-feature:publishServicesActiveStatus', (status) => {
      if (!this.isEmptyObj(status)) {
        this.isActive = typeof status.isActive !== 'undefined' ? status.isActive : false;
      }
    });
    this.events.subscribe('services-feature:statusChangeSuccess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentToast('Services active status changed successfully.');
    });
    this.events.subscribe('services-feature:deleteServiceSuccess', () => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.presentAlert('Service has been deleted successfully.');
    });
  }

  isEmptyObj(object) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  async changeStatus() {
    if (this.isActive) {
      this.isActive = false;
      await this.presentLoading('Changing Status...', 5000);
      this.events.publish('services-feature:changeServiceStatus', false);
    } else {
      this.isActive = true;
      await this.presentLoading('Changing Status...', 5000);
      this.events.publish('services-feature:changeServiceStatus', true);
    }
  }

  async deleteServiceConfirm(sid: string) {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this service?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteService(sid);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteService(sid: string) {
    await this.presentLoading('Deleting Service...', 5000);
    this.events.publish('services-feature:deleteService', sid);
  }

  editService(data: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        serviceData: data
      }
    };
    this.router.navigate(['create-service'], navigationExtras);
  }

  newService() {
    this.router.navigate(['create-service']);
  }

  async presentLoading(msg: string, drn: number) {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: drn
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  removeSubscriptions() {
    this.events.unsubscribe('services-feature:publishAllServices');
    this.events.unsubscribe('services-feature:publishServicesActiveStatus');
    this.events.unsubscribe('services-feature:statusChangeSuccess');
    this.events.unsubscribe('services-feature:deleteServiceSuccess');
  }

}
