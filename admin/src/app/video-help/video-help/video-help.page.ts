import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-video-help',
  templateUrl: './video-help.page.html',
  styleUrls: ['./video-help.page.scss'],
})
export class VideoHelpPage implements OnInit {
  constructor(private modalController: ModalController, private sanitizer: DomSanitizer) { }

  selectedRoute: string;
  safeLink: any;
  modalChoice: string;
  routeChoice: string;

  ngOnInit() {
    let videoLink: any;
    if (this.selectedRoute) {
      this.modalChoice = 'videoModal';
      videoLink = 'https://learning.estore.business/' + this.selectedRoute;
      // console.log(this.modalChoice);
    }
    else if (this.routeChoice) {
      this.modalChoice = 'featuresModal';
      if (this.routeChoice === 'features-history') {
        videoLink = 'https://featurestimeline.estore.business/';
      }
      else if (this.routeChoice === 'upcoming-features') {
        videoLink = 'https://upcomingfeatures.estore.business/';
      }
      // console.log(this.modalChoice);
    }
    this.safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(videoLink);
  }

  close() {
    this.modalController.dismiss();
  }
}
