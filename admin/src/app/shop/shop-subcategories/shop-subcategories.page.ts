import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-shop-subcategories',
  templateUrl: './shop-subcategories.page.html',
  styleUrls: ['./shop-subcategories.page.scss'],
})
export class ShopSubcategoriesPage implements OnInit {
  subcategories: any = [];
  showLoader: boolean = true;
  showNoSubcategories: boolean = false;
  categoryId: string;
  categoryName: string;
  constructor(private events: Events,
              private router: Router,
              private route: ActivatedRoute) {
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.categoryId = this.router.getCurrentNavigation().extras.state.categoryId;
                    this.categoryName = this.router.getCurrentNavigation().extras.state.categoryName;
                    //console.log('categoryId', this.categoryId);
                  }
                });
               }

  ngOnInit() {
    this.initializeSubscriptions();
    this.events.publish('product:getSubcategoriesForUser', this.categoryId);
  }
  ngOnDestroy() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('product:publishSubcategoriesForUser', (data) => {
      this.subcategories = data;
      this.showLoader = false;
      this.showNoSubcategories = false;
    });
    this.events.subscribe('product:noSubcategoriesForUser', () => {
      this.showLoader = false;
      this.showNoSubcategories = true;
    });
  }

  onClickSubcategory(category) {
    const navigationExtras: NavigationExtras = {
      state: {
        categoryId: category.id,
        categoryName: category.name
      }
    };
    this.router.navigate(['shop'], navigationExtras);
  }

  removeSubscriptions() {
    this.events.unsubscribe('product:publishSubcategoriesForUser');
    this.events.unsubscribe('product:noSubcategoriesForUser');
  }

}
