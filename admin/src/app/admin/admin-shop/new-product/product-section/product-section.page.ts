import { Component, OnInit } from '@angular/core';
import { LoadingController, Events,ModalController, AlertController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.page.html',
  styleUrls: ['./product-section.page.scss'],
})
export class ProductSectionPage implements OnInit {

  productId = ''

  constructor(
    private modalController: ModalController,
    private router: Router) { }

  ngOnInit() {
  }

  getWidgetList(type){
    if (type=="image-banner"){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          type:type,
          productId: this.productId
        }
      };
      this.router.navigate(['edit-banner'], navigationExtras)
      this.modalController.dismiss()
    }
    else if (type=="image-block"){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          productId: this.productId
        }
      };
      this.router.navigate(['edit-image-block'], navigationExtras);
      this.modalController.dismiss()
    }
    else if (type=="video-block"){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          productId: this.productId
        }
      };
      this.router.navigate(['edit-video-block'], navigationExtras);
      this.modalController.dismiss()
    }
    else if (type=='text-block'){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          productId: this.productId
        }
      };
      this.router.navigate(['edit-text-block'], navigationExtras);
      this.modalController.dismiss()
    }
    else if (type=='product-carousel'){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          type: type,
          productId: this.productId
        }
      };
      this.router.navigate(['edit-product-carousel'], navigationExtras);
      this.modalController.dismiss()
    }
    else if (type=='document'){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          productId: this.productId
        }
      };
      this.router.navigate(['edit-document'], navigationExtras);
      this.modalController.dismiss()
    }
  }

  dismiss(){
    this.modalController.dismiss(false);
  }

}
