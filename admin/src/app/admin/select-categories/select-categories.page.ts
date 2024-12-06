import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { LabelService } from 'src/app/services/label/label.service';

@Component({
  selector: 'app-select-categories',
  templateUrl: './select-categories.page.html',
  styleUrls: ['./select-categories.page.scss'],
})
export class SelectCategoriesPage implements OnInit {

  SELECT_CATEGORIES_LABELS: any;
    SHARED_LABELS: any;
    addedFilters = {};
    dataList: any = [];
    isLoading = true;
    type = 'categories';
    linkedList = [];
    constructor(private modalController: ModalController,
        private labelService: LabelService,
        private filtersService: FiltersService) { }

    async ngOnInit() {
        this.SELECT_CATEGORIES_LABELS = this.labelService.labels['SELECT_CATEGORIES'];
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        let dbList: any = [];
        if (this.type === 'categories') {
            dbList = await this.filtersService.getCategoriesWithSubcategories(); 
        }
        if (this.type === 'brands') {
            dbList = await this.filtersService.getBrands();
        }
          if(this.linkedList.length) {
            dbList.map(parent => {
              if(this.linkedList.includes(parent.id)) {
                parent.active = true;
              }
              if(parent.sublist.length) {
                parent.sublist.map(child => {
                  if(this.linkedList.includes(child.id)) {
                    child.active = true;
                  }
                });
              }
            });
          }

        this.dataList = dbList;
        console.log('this.dataList', this.dataList);
        this.isLoading = false;
    }

    closeModal() {
        this.modalController.dismiss();
    }

    toggleParentCheck(i) {
        this.dataList[i].active = !this.dataList[i].active;
    }

    selectParent(i) {
      this.dataList[i].active = !this.dataList[i].active;
    }

    selectChild(i, j) {
        this.dataList[i].sublist[j].active = !this.dataList[i].sublist[j].active;
    }

    onClickSave() {
        this.modalController.dismiss({
            list: this.dataList
        });
    }

}
