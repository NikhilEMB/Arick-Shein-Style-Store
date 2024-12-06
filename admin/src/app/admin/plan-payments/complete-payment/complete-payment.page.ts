import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-complete-payment',
  templateUrl: './complete-payment.page.html',
  styleUrls: ['./complete-payment.page.scss'],
})
export class CompletePaymentPage implements OnInit {
  inputAmount:number=0

  constructor(private router: Router) { }

  ngOnInit() {
  }

  razorpayCheckout(e) {
    this.router.navigate(['/razorpay']);
    e.preventDefault();
  }

  gotoPrevious() {
    this.router.navigate(['/options']);
  }

  newAmount(){
    // this.inputAmount=this.firebaseService.amountSelected
  }

}
