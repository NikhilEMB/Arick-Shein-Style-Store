import { Component, OnInit } from '@angular/core';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.page.html',
  styleUrls: ['./feedback-details.page.scss'],
})
export class FeedbackDetailsPage implements OnInit {
  desc = '';
  images = [];
  feedSlideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.desc);
    console.log(this.images);
  }

  imageZoom(images: any, index: number) {
    this.modalController.create({
      component: ImageModalPage,
      cssClass: 'photo-modal-class',
      componentProps: {
        imgs: images,
        index: index
      }
    }).then(modal => modal.present());
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
