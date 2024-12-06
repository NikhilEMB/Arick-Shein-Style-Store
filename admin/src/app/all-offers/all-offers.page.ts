import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.page.html',
  styleUrls: ['./all-offers.page.scss'],
})
export class AllOffersPage implements OnInit {
  showLoader: boolean = true;
  allOffers: any = [];
  offerSlideOpts = {
    initialSlide: 0,
    speed: 400,
    disableOnInteraction: false,
    autoplay: {
      delay: 5000
    }
  };
  constructor(private events: Events) { }

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
  }

  removeSubscriptions() {
    this.events.unsubscribe('offer:publishOffers');
  }

}
