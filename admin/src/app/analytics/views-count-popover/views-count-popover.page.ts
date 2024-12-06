import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-views-count-popover',
  templateUrl: './views-count-popover.page.html',
  styleUrls: ['./views-count-popover.page.scss'],
})
export class ViewsCountPopoverPage implements OnInit {

  productId: string;
  viewsCount: number;
  isFetching: boolean = false;

  constructor(
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.isFetching = true;
    console.log("productId: ", this.productId);
    await this.getProductViewsCount(this.productId);
    this.isFetching = false;
  }

  async getProductViewsCount(productId: string) {
    let response = await this.analyticsService.getProductViews(productId);
    console.log("productViews", response.viewsCount);
    if (response) {
      this.viewsCount = response.viewsCount;
    } else {
      this.viewsCount = 0;
    }
  }

}
