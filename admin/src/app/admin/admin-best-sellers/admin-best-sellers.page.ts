import { Component, OnInit } from '@angular/core';
import { Events, AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BestSellersModalPage } from '../best-sellers-modal/best-sellers-modal.page';
import { BestSellersService } from 'src/app/services/best-sellers/best-sellers.service';

@Component({
  selector: 'app-admin-best-sellers',
  templateUrl: './admin-best-sellers.page.html',
  styleUrls: ['./admin-best-sellers.page.scss'],
})
export class AdminBestSellersPage implements OnInit {
  bsProducts: any = [];
  noBestSellerProducts: boolean = false;
  bestSellersActiveStatus: boolean;
  status: boolean;
  loading: any;
  constructor(private events: Events,
              private router: Router,
              private alertController: AlertController, 
              private loadingController: LoadingController,
              private modalController: ModalController,
              private toastController: ToastController,
              private bestSellersService: BestSellersService) { }

  ngOnInit() {
    this.initializeSubscriptions();
    this.events.publish('best-sellers:getBestSellers');
  }
  ionViewWillEnter() {
    this.events.publish('best-sellers:getBestSellersActiveStatus');
    this.events.subscribe('best-sellers:publishBestSellersActiveStatus', (status) => {
      // //console.log('status from db', status);
      if(!this.isEmptyObj(status)) {
        this.bestSellersActiveStatus = status.isActive;
        this.status = status.isActive;
      } else {
        this.bestSellersActiveStatus = true;
        this.status = true;
      }
    });
  }
  ionViewWillLeave() {
    this.events.unsubscribe('best-sellers:publishBestSellersActiveStatus');
  }
  ngOnDestroy() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('best-sellers:publishBestSellers', (bestSellers) => {
      this.bsProducts = bestSellers;
      this.noBestSellerProducts = false;
      
      // //console.log('this.bsProducts', this.bsProducts);
    });
    this.events.subscribe('best-sellers:noBestSellers', () => {
      this.noBestSellerProducts = true;
    });
    this.events.subscribe('best-sellers:changeBestSellersStatusSuccess', () => {
      this.loading.dismiss();
      this.presentToast('Status changed successfully!')
    });
    this.events.subscribe('best-sellers:deleteBestSellerProductSuccess', () => {
      this.loading.dismiss();
      this.presentAlert('Product deleted from best seller successfully!');
    });
    this.events.subscribe('best-sellers:updateBestSellersPositionSuccess', () => {
      this.loading.dismiss();
    });
  }
  isEmptyObj(object) {
    for(var key in object) {
      if(object.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  addNewBestSellerProduct() {
    this.modalController.create({
      component: BestSellersModalPage,
      cssClass: 'custom-modal'
    })
      .then(modalEl => {modalEl.present();
    });
  }
  async changeBestSellersStatus() {
    if(this.status) {
      await this.presentLoading();
      this.status = false;
      this.events.publish('best-sellers:changeBestSellersStatus', this.status);
    } else {
      await this.presentLoading();
      this.status = true;
      this.events.publish('best-sellers:changeBestSellersStatus', this.status);
    }
  }
  
  async deleteBestSellerProductConfirm(id: string, index: number) {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this best seller product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.deleteBestSellerProduct(id);
          }
        }
      ]
    });
  
    await alert.present();
  }
  async deleteBestSellerProduct(id: string) {
    await this.presentLoading();
    this.events.publish('best-sellers:deleteBestSellerProduct', id);
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 10000
    });
    await this.loading.present();
  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  async onReorderBestSeller(event: { detail: { from: any; to: any; complete: () => void; }; }) {
    await this.presentLoading();
    // //console.log(`Moving product from ${event.detail.from} to ${event.detail.to}`);
    const start = event.detail.from;
    // tslint:disable-next-line: variable-name
    const id = this.bsProducts[start].id;
    // //console.log('categoriesLength', this.bsProducts.length);
    // //console.log('start', start);
    const end = event.detail.to;
    // //console.log('end', end);
    if ( start < end && end !== this.bsProducts.length - 1) {
      // //console.log('from top to mid');
      const firstDate = this.bsProducts[end].sortedAt.toDate().getTime();
      const secondDate = this.bsProducts[end + 1].sortedAt.toDate().getTime();
      // //console.log('fistdate', firstDate);
      // //console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      // //console.log('finalDate', new Date(changedDate));
      this.bestSellersService.updateBestSellersPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else if (start < end && end === this.bsProducts.length - 1) {
      // //console.log('from top to bottom');
      const changedDate = this.bsProducts[end].sortedAt.toDate().getTime() - 5 * 60000;
      this.bestSellersService.updateBestSellersPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else if (start > end && end !== 0) {
      // //console.log('from bottom to mid');
      const firstDate = this.bsProducts[end].sortedAt.toDate().getTime();
      const secondDate = this.bsProducts[end - 1].sortedAt.toDate().getTime();
      // //console.log('fistdate', firstDate);
      // //console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      // //console.log('finalDate', new Date(changedDate));
      this.bestSellersService.updateBestSellersPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else {
      // //console.log('from bottom to top');
      const changedDate = this.bsProducts[end].sortedAt.toDate().getTime() + 5 * 60000;
      this.bestSellersService.updateBestSellersPosition(id, new Date(changedDate));
    }
    const draggedItem = this.bsProducts.splice(event.detail.from, 1)[0];
    this.bsProducts.splice(event.detail.to, 0, draggedItem);
    event.detail.complete();
  }
  removeSubscriptions() {
    this.events.unsubscribe('best-sellers:publishBestSellers');
    this.events.unsubscribe('best-sellers:noBestSellers');
    this.events.unsubscribe('best-sellers:changeBestSellersStatusSuccess');
    this.events.unsubscribe('best-sellers:deleteBestSellerProductSuccess');
    this.events.unsubscribe('best-sellers:updateBestSellersPositionSuccess');

    this.events.publish('best-sellers:removeSubscriptions');
  }
}
