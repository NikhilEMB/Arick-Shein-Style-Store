import { Component, OnInit } from '@angular/core';
import {ModalController,AlertController,LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-edit-widget',
  templateUrl: './edit-widget.page.html',
  styleUrls: ['./edit-widget.page.scss'],
})
export class EditWidgetPage implements OnInit {

  constructor(private modalController: ModalController,private router:Router) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss();
  }

  openBannerWidget(type: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        type: type,
      }
    };
    this.router.navigate(['banner-slider-widgets-list'], navigationExtras);
  }

  openProductWidget(type: string){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        type: type,
      }
    };
    this.router.navigate(['product-carousel-list'], navigationExtras);

  }

}
