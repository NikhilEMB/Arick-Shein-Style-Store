import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddAddressPage } from "../add-address/add-address.page";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
addresses = [
  {
    name:'Dinesh Singh',
    address:'Flat No. 100<br>Triveni Apartments<br>Pitam <br>NEW DELHI 110034<br>',
    type: 'Home',
    number: '9013339417'
  },
  {
    name:'Dinesh Singh',
    address:'Flat No. 100<br>Triveni Apartments<br>Pitam <br>NEW DELHI 110034<br>',
    type: 'Home',
    number: '9013339417'
  },
  {
    name:'Dinesh Singh',
    address:'Flat No. 100<br>Triveni Apartments<br>Pitam <br>NEW DELHI 110034<br>',
    type: 'Home',
    number: '9013339417'
  },
  {
    name:'Dinesh Singh',
    address:'Flat No. 100<br>Triveni Apartments<br>Pitam <br>NEW DELHI 110034<br>',
    type: 'Home',
    number: '9013339417'
  } 
];
selectedAddress;
couponCode;
couponStatus = 'not_applied';
couponMessage;

constructor(private modalController:ModalController) { }

  ngOnInit() {
  }

  selectAddress(i){
    this.selectedAddress = i;
    //console.log(this.selectedAddress)
  }

  verifyCoupon(){
    if (this.couponCode == "ABCDEF") {
      this.couponStatus = 'success';
      this.couponMessage = 'Coupon Applied Sucessfully';
    } else {
      this.couponStatus = 'error';
      this.couponMessage = 'Invalid or Expire Coupon';
    }
  }

  removeCoupon(){
    this.couponCode = '';
    this.couponStatus = 'not_applied';
  }

  async openAddAddressModal() {
    const modal = await this.modalController.create({
    component: AddAddressPage,
    cssClass: "custom-modal",
    });
  
    await modal.present();
  
  }

}
