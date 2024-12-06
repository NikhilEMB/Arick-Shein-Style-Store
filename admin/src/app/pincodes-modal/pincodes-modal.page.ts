import { Component, OnInit } from '@angular/core';
import { Events, LoadingController, ModalController } from '@ionic/angular';
import * as pincodesJson from "src/assets/json/pincodes.json";
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-pincodes-modal',
  templateUrl: './pincodes-modal.page.html',
  styleUrls: ['./pincodes-modal.page.scss'],
})
export class PincodesModalPage implements OnInit {
  state = '';
  pincodeToBeSearch = '';
  allStatePincodes = [];
  pincodeList = [];
  alreadyAddedPincodes;
  showPincodeSearch = false;

  loading: any;
  constructor(private events: Events, private sharedService: SharedService,
              private modalController: ModalController, private loadingController: LoadingController,) { }

  ngOnInit() {
    this.allStatePincodes = pincodesJson.results;
  }
  ionViewWillEnter() {
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    for (let x = 0; x < this.alreadyAddedPincodes.length; x++) {
      for (let index = 0; index < this.allStatePincodes.length; index++) {
        if (this.allStatePincodes[index].pincode == this.alreadyAddedPincodes[x].pincode) {
          this.allStatePincodes[index]['selected'] = true;
          this.allStatePincodes[index]['cost'] = this.alreadyAddedPincodes[x].cost;
          this.allStatePincodes[index]['active'] = this.alreadyAddedPincodes[x].active;
          this.allStatePincodes[index]['minAmnt'] = this.alreadyAddedPincodes[x].minAmnt;
          this.allStatePincodes[index]['freeDeliveryAmnt'] = this.alreadyAddedPincodes[x].freeDeliveryAmnt;
          this.allStatePincodes[index]['estimatedDeliveryTime'] = this.alreadyAddedPincodes[x].estimatedDeliveryTime;
          //break;
        } else {
          if (!this.allStatePincodes[index].selected) {
            this.allStatePincodes[index]['selected'] = false;
            this.allStatePincodes[index]['cost'] = 0;
            this.allStatePincodes[index]['active'] = true;
            this.allStatePincodes[index]['minAmnt'] = null;
            this.allStatePincodes[index]['freeDeliveryAmnt'] = null;
            this.allStatePincodes[index]['estimatedDeliveryTime'] = '';
          }
        }
      }
    }
  }

  searchByState() {
    this.showPincodeSearch = true;
    this.pincodeList = this.allStatePincodes.filter(a => a.stateName == this.state.toUpperCase());
    if (this.pincodeList.length === 0) {
      this.sharedService.presentAlert(`No Pincode found for ${this.state}`);
    }
  }

  searchPincode() {
    this.pincodeList = this.pincodeList.filter(a => a.pincode.toString().includes(this.pincodeToBeSearch));
    if (this.pincodeToBeSearch.length == 0) {
      this.pincodeList = this.allStatePincodes.filter(a => a.stateName == this.state.toUpperCase());
    }
  }

  selectAllPincodes(event) {
    console.log('event', event);
    for (let i = 0; i < this.pincodeList.length; i++) {
      this.pincodeList[i]['selected'] = event.target.checked;
      for (let j = 0; j < this.allStatePincodes.length; j++) {
        if (this.pincodeList[i].pincode === this.allStatePincodes[j].pincode) {
          this.allStatePincodes[j].selected = event.target.checked;
        }
      }
    }
  }

  checkboxClicked(pincodeObj){
    for (let index = 0; index < this.allStatePincodes.length; index++) {
      if (pincodeObj.pincode === this.allStatePincodes[index].pincode) {
        this.allStatePincodes[index].selected = pincodeObj.selected;
      }
    }
  }


  closeModal() {
    //this.presentLoading();
    this.alreadyAddedPincodes = this.allStatePincodes.filter(a => a.selected == true);
    this.modalController.dismiss(this.alreadyAddedPincodes);
  }
  removeSubscriptions() {
    this.events.unsubscribe('user:getUserToCreateOrderSuccess');
  }

  savePincodes(){
    this.closeModal();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 3000,
    });
    await this.loading.present();
  }

}
