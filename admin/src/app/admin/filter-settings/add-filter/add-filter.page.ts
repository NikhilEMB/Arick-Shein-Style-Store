import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Events, LoadingController, ModalController } from '@ionic/angular';
import { LabelService } from 'src/app/services/label/label.service';
import { SelectCategoriesPage } from './../../select-categories/select-categories.page';

@Component({
  selector: 'app-add-filter',
  templateUrl: './add-filter.page.html',
  styleUrls: ['./add-filter.page.scss'],
})
export class AddFilterPage implements OnInit {

    SHARED_LABELS: any;
    ADD_FILTER_LABELS: any;
    headerText: any;
    loading: any;
    filter = {
        name: '',
        active: true,
        values: [],
        categories: [],
        brands: []
    };
    value: string;
    constructor(private events: Events,
        private labelService: LabelService,
        private alertController: AlertController,
        private loadingController: LoadingController,
        private router: Router,
        private route: ActivatedRoute,
        private modalController: ModalController) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                const filterData = this.router.getCurrentNavigation().extras.state.filterData;
                if (filterData) {
                    filterData['categories'] = filterData.categories || [];
                    filterData['brands'] = filterData.brands || [];
                    this.filter = filterData;
                }
            }
        });
    }

    ngOnInit() {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.ADD_FILTER_LABELS = this.labelService.labels['ADD_FILTER'];
        if (this.filter.name) {
            this.headerText = this.ADD_FILTER_LABELS['header_text_2'];
        } else {
            this.headerText = this.ADD_FILTER_LABELS['header_text_1'];
        }
    }

    async ionViewWillEnter() {
        this.initializeSubscriptions();
    }

    ionViewWillLeave() {
        this.removeSubscriptions();
    }

    initializeSubscriptions() {
        this.events.subscribe('filters:filterSaved', () => {
            if (this.loading) {
                this.loading.dismiss();
            }
            this.presentAlert("Filter saved successfully !");
        });
    }

    toggleActive() {
        this.filter.active = !this.filter.active;
    }

    addFilter() {
        this.filter.values.push(this.value.toLowerCase());
        this.value = null;
    }

    removeFilter(i: number) {
        this.filter.values.splice(i, 1);
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
                handler: () => {
                }
            }]
        });

        await alert.present();
    }

    async saveFilter() {
        if (!this.filter.name) {
            await this.presentAlert('Please add filter name');
        } else if (!this.filter.values.length) {
            await this.presentAlert('Please fill filter values correctly');
        } else {
            this.filter.name = this.filter.name.toLowerCase();
            await this.presentLoading(5000, this.SHARED_LABELS['please_wait']);
            this.events.publish('filters:saveFilter', this.filter);
        }
    }

    getLinkedLength(type: string) {
        return this.filter[type].length;
    }

    async onClickAdd(type: string) {
        const modal = await this.modalController.create({
            component: SelectCategoriesPage,
            componentProps: { type, linkedList: this.filter[type] }
        });

        modal.onDidDismiss().then(res => {
            if (res.data && res.data.list.length) {
              let linkedList = [];
              res.data.list.forEach(parent => {
                if(parent.active) {
                  linkedList.push(parent.id);
                  if(parent.sublist.length) {
                    parent.sublist.forEach(child => {
                      if(child.active) {
                        linkedList.push(child.id);
                      }
                    });
                  }
                }
              });
              console.log('linkedList', linkedList);
              this.filter[type] = linkedList;
            }
        });

        await modal.present();
    }

    removeSubscriptions() {
        this.events.unsubscribe('filters:filterSaved');
    }

}
