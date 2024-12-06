import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.page.html',
  styleUrls: ['./product-review.page.scss'],
})
export class ProductReviewPage implements OnInit {
  ratingDetails;
  approved = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  close() {
    this.modalController.dismiss(this.approved);
  }

approve() {
  this.approved = true;
  this.close();
}

}
