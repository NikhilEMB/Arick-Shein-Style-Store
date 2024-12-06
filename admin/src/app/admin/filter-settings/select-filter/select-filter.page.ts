import { Component, OnInit } from '@angular/core';
import { Events, ModalController } from '@ionic/angular';
import { LabelService } from 'src/app/services/label/label.service';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.page.html',
  styleUrls: ['./select-filter.page.scss'],
})
export class SelectFilterPage implements OnInit {

  SELECT_FILTERS_LABELS: any;
  SHARED_LABELS: any;
  addedFilters = {};
  adminFilters = [];
  isLoading = true;
  constructor(private events: Events,
              private modalController: ModalController,
              private labelService: LabelService,) { }

  ngOnInit() {
    console.log('addedFilters', this.addedFilters);
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.SELECT_FILTERS_LABELS = this.labelService.labels['SELECT_FILTERS'];
    this.SHARED_LABELS = this.labelService.labels['SHARED'];
    this.events.publish('filters:getAllActiveFilters');
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('filters:publishAllActiveFilters', (filters) => {
      if(filters.length) {
        filters.map(f => {
          let values = [];
          if(this.addedFilters.hasOwnProperty(f.name)) {
            f.active = true;
            f.values.map(v => {
              const arr = this.addedFilters[f.name];
              if(arr.includes(v)) {
                values.push({value: v, isChecked: true});
              } else {
                values.push({value: v, isChecked: false});
              }
            });
          } else {
            f.active = false;
            f.values.map(v => {
              values.push({value: v, isChecked: false});
            });
          }
          f.values = values;
        });
        this.adminFilters = filters;
        this.isLoading = false;
      }
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  toggleFiltersActive(i) {
    this.adminFilters[i].active = !this.adminFilters[i].active;
  }

  selectFilters(i, j) {
    this.adminFilters[i].values[j].isChecked = !this.adminFilters[i].values[j].isChecked;
  }

  onClickSave() {
    this.modalController.dismiss({
      addedFilters: this.adminFilters
    });
  }

  removeSubscriptions() {
    this.events.unsubscribe('filters:publishAllActiveFilters');
  }


}
