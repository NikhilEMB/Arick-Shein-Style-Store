import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WalletService } from 'src/app/services/wallet/wallet.service';

@Component({
  selector: 'app-add-points',
  templateUrl: './add-points.page.html',
  styleUrls: ['./add-points.page.scss'],
})
export class AddPointsPage implements OnInit {
  pointDetails = {
    type: '',
    point: null,
    msg: ''
  }
  uid:any;

  constructor(private modalController: ModalController,
    private walletService: WalletService
  ) { }

  ngOnInit() {
    console.log('uid coming form users page', this.uid)
  }

  async onClickSubmit() {
    console.log('point-details', this.pointDetails)
    const data = {
      ...this.pointDetails,
      userId: this.uid
    }

    const response = await this.walletService.addLoyaltyPoints(data);
    if(response) {
      this.modalController.dismiss(true);
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
