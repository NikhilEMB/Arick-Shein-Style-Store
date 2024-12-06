import { Component, OnInit } from '@angular/core';
import { Events, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-states-modal',
  templateUrl: './states-modal.page.html',
  styleUrls: ['./states-modal.page.scss'],
})
export class StatesModalPage implements OnInit {
  states: any = [];
  searchState: string = '';
  stateName: string = '';
  stateCode: string = '';
  showLoader: boolean = true;
  constructor(private events: Events,
    private modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.events.publish('admin-settings:getStatesData');
  }

  ionViewDidLeave() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('admin-settings:publishStatesData', (states) => {
      this.states = states;
      this.showLoader = false;
    });
  }

  onClickState(s: any) {
    this.stateName = s.state;
    this.stateCode = s.code;
    this.modalController.dismiss({
      state: this.stateName,
      code: this.stateCode
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  removeSubscriptions() {
    this.events.unsubscribe('admin-settings:publishStatesData');
  }

}
