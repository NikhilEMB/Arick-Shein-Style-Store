import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-cancelled-reason',
  templateUrl: './cancelled-reason.page.html',
  styleUrls: ['./cancelled-reason.page.scss'],
})
export class CancelledReasonPage implements OnInit {

  reason = '';
  constructor(private modalController: ModalController,
    private sharedService: SharedService) { }

  ngOnInit() {
  }

  submit() {
    if(!this.reason) {
      this.sharedService.presentAlert('Please provide valid reason!');
      return;
    }
    this.closeModal(this.reason);
  }

  closeModal(reason?: string) {
    this.modalController.dismiss(reason);
  }
}
