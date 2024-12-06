import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, Events, LoadingController,ToastController  } from '@ionic/angular';
import { LabelService } from 'src/app/services/label/label.service';

@Component({
  selector: 'app-all-filters',
  templateUrl: './all-filters.page.html',
  styleUrls: ['./all-filters.page.scss'],
})
export class AllFiltersPage implements OnInit {

    SHARED_LABELS: any;
    ALL_FILTERS_LABELS: any;
    headerText: any;
    loading: HTMLIonLoadingElement;
    isFilterActive = false;
    filters = [];
    constructor(private events: Events,
                private labelService: LabelService,
                private alertController: AlertController,
                private loadingController: LoadingController,
                private router: Router,
                private toastController: ToastController) { }
  
    ngOnInit() {
      this.SHARED_LABELS = this.labelService.labels['SHARED'];
      this.ALL_FILTERS_LABELS = this.labelService.labels['ALL_FILTERS'];
      this.headerText = this.ALL_FILTERS_LABELS['header_text'];
      this.initializeSubscriptions();
      this.events.publish('filters:getActiveStatus');
      this.events.publish('filters:getAllFilters');
    }
  
    ngOnDestroy() {
      this.removeSubscriptions();
    }
  
    initializeSubscriptions() {
      this.events.subscribe('filters:filtersActiveChanged', () => {
        if (this.loading) {
          this.loading.dismiss();
        }
        this.presentToast('Status changed successfully');
      });
      this.events.subscribe('filters:publishActiveStatus', (data) => {
        if(data) {
          this.isFilterActive = data.active;
        }
      });
      this.events.subscribe('filters:publishAllFilters', (filters) => {
        console.log(filters)
        if(filters.length) {
          this.filters = filters;
        } else {
          this.filters = [];
        }
      });
      this.events.subscribe('filters:singleFilterActiveChanged', () => {
        if (this.loading) {
          this.loading.dismiss();
        }
        this.presentToast('Status changed successfully');
      });
      this.events.subscribe('filters:filterDeleted', () => {
        if (this.loading) {
          this.loading.dismiss();
        }
        this.presentAlert('Filter deleted successfully');
      });
    }
  
    async toggleActive() {
      this.isFilterActive = !this.isFilterActive;
      await this.presentLoading(5000, 'Please wait');
      this.events.publish('filters:toggleFiltersActive', this.isFilterActive);
    }
  
    async toggleFilterActive(i: number) {
      this.filters[i].active = !this.filters[i].active;
      await this.presentLoading(5000, 'Please wait');
      this.events.publish('filters:toggleSingleFilterActive', this.filters[i].active, this.filters[i].id);
    }
  
    editFilter(i: number) {
      const navigationExtras: NavigationExtras = {
        state: {
          filterData: this.filters[i]
        }
      };
      this.router.navigate(['add-filter'], navigationExtras);
    }
  
    async deleteFilter(id: string) {
      await this.presentLoading(5000, 'please wait');
      this.events.publish('filters:deleteFilter', id);
    }
  
    addNewFilter() {
      this.router.navigate(['add-filter']);
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
          text: 'ok',
          handler: () => {
          }
        }]
      });
  
      await alert.present();
    }
  
    async presentToast(msg) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }
  
    removeSubscriptions() {
      this.events.unsubscribe('filters:filtersActiveChanged');
      this.events.unsubscribe('filters:publishActiveStatus');
      this.events.unsubscribe('filters:publishAllFilters');
      this.events.unsubscribe('filters:singleFilterActiveChanged');
      this.events.unsubscribe('filters:filterDeleted');
    }

}
