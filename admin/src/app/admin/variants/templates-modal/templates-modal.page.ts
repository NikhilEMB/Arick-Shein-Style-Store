import { Component, OnInit } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';

@Component({
  selector: 'app-templates-modal',
  templateUrl: './templates-modal.page.html',
  styleUrls: ['./templates-modal.page.scss'],
})
export class TemplatesModalPage implements OnInit {
  templates: any = [];
  showTemplatesLoader: boolean = true;
  showTemplates: boolean = true;
  showTypes: boolean = false;
  type: string;
  values: any = [];
  selectedValues: any = [];
  selectAllValues: boolean = false;
  constructor(private modalController: ModalController,
              private events: Events) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.events.publish('variants:getAllTemplates');
  }

  ionViewWillLeave() {
    this.removeSubscriptions();
  }

  removeSubscriptions() {
    this.events.unsubscribe('variants:publishAllTemplates');
  }

  initializeSubscriptions() {
    this.events.subscribe('variants:publishAllTemplates', (templates) => {
      //console.log('templates', templates);
      this.templates = templates;
      this.showTemplatesLoader = false;
      
    });
  }

  onClickTemplate(template: any) {
    this.type = template.type;
    this.values = template.values;
    this.showTemplates = false;
    this.showTypes = true;
  }

  backTotemplates() {
    this.showTypes = false;
    this.showTemplates = true;
  }

  selectValues(value) {
    if(this.selectedValues.includes(value)) {
      let index = this.selectedValues.indexOf(value);
      this.selectedValues.splice(index, 1);
    } else {
      this.selectedValues.push(value);
    }
  }

  onClickAdd() {
    this.modalController.dismiss({
      values: this.selectedValues,
      type: this.type
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  onClickSelectAll() {
    if(this.selectAllValues) {
      this.selectAllValues = false;
    } else {
      this.selectAllValues = true;
      this.selectedValues = this.values.map(v => v);
    }
  }

}
