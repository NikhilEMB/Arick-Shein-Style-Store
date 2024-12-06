import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomePage } from "../home/home.page";
import { GuideService } from '../../app/guide.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  constructor(private modalController: ModalController,private guideService: GuideService) { 
    this.openLoginModal();
  }

  ngOnInit() {
    this.guideService.changeUrl("homepage")
  }

  async openLoginModal() {
    const modal = await this.modalController.create({
    component: HomePage,
    backdropDismiss: false,
    cssClass: "custom-modal login-modal hide-close noRadios",
    });
    await modal.present();
  }

}
