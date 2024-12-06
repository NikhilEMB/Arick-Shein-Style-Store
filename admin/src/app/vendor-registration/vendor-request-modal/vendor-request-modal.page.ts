import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vendor-request-modal',
  templateUrl: './vendor-request-modal.page.html',
  styleUrls: ['./vendor-request-modal.page.scss'],
})
export class VendorRequestModalPage implements OnInit {
  vendorDetails;
  approved = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  close() {
    this.modalController.dismiss({approved: this.approved });
  }

approve() {
  this.approved = true;
  this.close();
}

  isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }
}
