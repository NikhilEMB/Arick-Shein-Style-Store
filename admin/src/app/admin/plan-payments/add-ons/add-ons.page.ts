import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-ons',
  templateUrl: './add-ons.page.html',
  styleUrls: ['./add-ons.page.scss'],
})
export class AddOnsPage implements OnInit {

  totalAmount=0
  taxPercent=18
  taxAmount=0
  selectedAmount=0
  listAddONs:any

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoCompletePayment() {
    this.router.navigate(['/complete-payment']);
  }

}
