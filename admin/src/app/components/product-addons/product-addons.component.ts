import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-product-addons',
  templateUrl: './product-addons.component.html',
  styleUrls: ['./product-addons.component.scss'],
})
export class ProductAddonsComponent implements OnInit {
  @Input() product;
  currencyCode;
  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.currencyCode = this.configService.environment.currencyCode;
  }

  getPerAddonPrice(addonOption) {
    let price = 0;
    addonOption.value.forEach(addon => {
        addon.options.forEach(option => {
            price += option.price;
        })
    });
    return price;
}

}
