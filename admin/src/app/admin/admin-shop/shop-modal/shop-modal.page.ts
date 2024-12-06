import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-shop-modal',
  templateUrl: './shop-modal.page.html',
  styleUrls: ['./shop-modal.page.scss'],
})
export class ShopModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
