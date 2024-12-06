import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-widgets-list',
  templateUrl: './widgets-list.page.html',
  styleUrls: ['./widgets-list.page.scss'],
})
export class WidgetsListPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  opneWidget(page: string) {
    console.log('goToPage', page);
    this.router.navigate([page]);
  }

  opneBannerWidget(type: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        type: type,
      }
    };
    this.router.navigate(['banner-slider-widgets-list'], navigationExtras);
  }

  opneProductWidget(type: string){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        type: type,
      }
    };
    this.router.navigate(['product-carousel-list'], navigationExtras);

  }

}
