import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ProductService } from '../services/product/product.service';
import { SharedService } from '../services/shared/shared.service';
import { ProductReviewPage } from './product-review/product-review.page';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.page.html',
  styleUrls: ['./product-reviews.page.scss'],
})
export class ProductReviewsPage implements OnInit {

  products = [];

  constructor(
    private productService: ProductService,
    private modalController: ModalController,
    private sharedService: SharedService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initializeSubscriptions();
  }

  async initializeSubscriptions() {
    await this.sharedService.presentLoading('Please Wait...',10000);
    let products:any = await this.productService.getProductsWithRating();
    for (const product of products) {
      let ratings:any = await this.productService.getRatings(product.id);
      //  && product.rating && Object.keys(product.rating).length
      if (ratings.length) {
        product.ratings = ratings;
        console.log('product:::', product);
      } else{
        product.ratings = []
      }
    }
    this.products = products;
    console.log('productsWithRating:', products);
    if (this.sharedService.loading) {
      console.log('dismiss');
      this.sharedService.loading.dismiss();
    }
  }

  getStarColor(rating) {
    if (rating >= 3) {
        return '#20c020';
    } else if (rating < 3 && rating >= 2) {
        return '#FF9F00';
    } else {
        return '#ff6161';
    }
}

  // async viewReview(prodIndex, ratingIndex){
  //   const modal = await this.modalController.create({
  //   component: ProductReviewPage,
  //   cssClass:'custom-modal',
  //   showBackdrop: true,
  //   backdropDismiss: false,
  //   componentProps: { ratingDetails: this.products[prodIndex].ratings[ratingIndex] }
  //   });
  //   modal.onDidDismiss()
  //   .then((res) => {
  //     console.log('data from modal', res);
  //     if(res.data) {
  //       if (res.data.approved) {
  //         this.approve(prodIndex, ratingIndex);
  //       }
  //     }
  // });
  //   await modal.present();
  // }

  async approve(prodIndex, ratingIndex, i,j){
   let approved =  await this.productService.updateRating(prodIndex, ratingIndex, {status: 'approved'});
   if (approved) {
    this.products[i].ratings[j].status = 'approved';
   }
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

}
