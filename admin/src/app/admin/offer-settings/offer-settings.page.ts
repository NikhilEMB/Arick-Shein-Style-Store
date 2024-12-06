import { Component, OnInit } from '@angular/core';
import { Events, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { OfferService } from 'src/app/services/offer/offer.service';

@Component({
  selector: 'app-offer-settings',
  templateUrl: './offer-settings.page.html',
  styleUrls: ['./offer-settings.page.scss'],
})
export class OfferSettingsPage implements OnInit {
  showLoader: boolean = true;
  allOffers: any = [];
  loading: any;
  constructor(private events: Events,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private toastController: ToastController,
              private router: Router,
              private offerService: OfferService) { }

  ngOnInit() {
    this.initializeSubscriptions();
    this.events.publish('offer:getOffers');
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  initializeSubscriptions() {
    this.events.subscribe('offer:publishOffers', (offers) => {
      this.showLoader = false;
      this.allOffers = offers;
    });
    this.events.subscribe('offer:updateOffersPostionSucess', () => {
      if(this.loading) {
        this.loading.dismiss();
      }
    });
    this.events.subscribe('offer:deleteOfferSucess', () => {
      this.loading.dismiss();
      this.presentAlert('Offer deleted successfully!');
    });
  }

  addOffer() {
    this.router.navigate(['offer-create']);
  }

  async onReorderOffers(event: { detail: { from: any; to: any; complete: () => void; }; }) {
    await this.presentLoading('Please wait...', 3000);
    //console.log(`Moving category from ${event.detail.from} to ${event.detail.to}`);
    const start = event.detail.from;
    // tslint:disable-next-line: variable-name
    const id = this.allOffers[start].id;
    //console.log('allOffersLength', this.allOffers.length);
    //console.log('start', start);
    const end = event.detail.to;
    //console.log('end', end);
    if ( start < end && end !== this.allOffers.length - 1) {
      //console.log('from top to mid');
      const firstDate = this.allOffers[end].sortedAt.toDate().getTime();
      const secondDate = this.allOffers[end + 1].sortedAt.toDate().getTime();
      //console.log('fistdate', firstDate);
      //console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      //console.log('finalDate', new Date(changedDate));
      this.offerService.updateOffersPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else if (start < end && end === this.allOffers.length - 1) {
      //console.log('from top to bottom');
      const changedDate = this.allOffers[end].sortedAt.toDate().getTime() - 5 * 60000;
      this.offerService.updateOffersPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else if (start > end && end !== 0) {
      //console.log('from bottom to mid');
      const firstDate = this.allOffers[end].sortedAt.toDate().getTime();
      const secondDate = this.allOffers[end - 1].sortedAt.toDate().getTime();
      //console.log('fistdate', firstDate);
      //console.log('seconddate', secondDate);
      const changedDate = (firstDate + secondDate) / 2;
      //console.log('finalDate', new Date(changedDate));
      this.offerService.updateOffersPosition(id, new Date(changedDate));
    }
    // tslint:disable-next-line: one-line
    else {
      //console.log('from bottom to top');
      const changedDate = this.allOffers[end].sortedAt.toDate().getTime() + 5 * 60000;
      this.offerService.updateOffersPosition(id, new Date(changedDate));
    }
    const draggedItem = this.allOffers.splice(event.detail.from, 1)[0];
    this.allOffers.splice(event.detail.to, 0, draggedItem);
    event.detail.complete();
  }

  editOffer(offer: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        offerData: offer
      }
    };
    this.router.navigate(['offer-create'], navigationExtras);
  }

  async deleteOfferConfirm(oid: string) {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this offer?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Delete',
          handler: () => {
            //console.log('Confirm Okay');
            this.deleteOffer(oid);
          }
        }
      ]
    });

    await alert.present();
  }
  async deleteOffer(oid: string) {
    await this.presentLoading('Deleting offer...', 5000)
    this.events.publish('offer:deleteOffer', oid);
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['offer-settings']);
        }
      }]
    });
    await alert.present();
  }

  async presentLoading(msg: string, duration: number) {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: duration
    });
    await this.loading.present();
  }

  removeSubscriptions() {
    this.events.unsubscribe('offer:publishOffers');
    this.events.unsubscribe('offer:updateOffersPostionSucess');
    this.events.unsubscribe('offer:deleteOfferSucess');
  }

}
