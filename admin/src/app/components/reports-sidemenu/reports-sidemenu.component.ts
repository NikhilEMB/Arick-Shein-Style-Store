import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports-sidemenu',
  templateUrl: './reports-sidemenu.component.html',
  styleUrls: ['./reports-sidemenu.component.scss'],
})
export class ReportsSidemenuComponent implements OnInit {
  
  vendorReport = false
  menu = [
    'Sales', 'Category', 'Products', 'Brands', 'Services', 'Users', 'Tax', 'Area', 'Vendors', 'Coupons', 'Referral'
  ];

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, 
    //private events: Events, 
    // private loadingController: LoadingController, private alertCtrl: AlertController, private storage: Storage, private sharedService: SharedService
    ) {
  }

  goToPage(page: string) {
    this.router.navigate([page]);
  }

  ngOnInit() {}

}
