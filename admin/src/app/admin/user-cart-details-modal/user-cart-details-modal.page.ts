import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { UserDetailsService } from 'src/app/services/user-details/user-details.service';

@Component({
  selector: 'app-user-cart-details-modal',
  templateUrl: './user-cart-details-modal.page.html',
  styleUrls: ['./user-cart-details-modal.page.scss'],
})
export class UserCartDetailsModalPage implements OnInit {

  @Input() uid: any;
  @Input() data: any;
  cartItems:any = [];
  searchItems:any = [];
  showWarning = false;
  showLimit = 3;
  showLoading: boolean = true;

  constructor(
    public modalController: ModalController,
    private userDetailService: UserDetailsService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.getCartItems();
    this.showLoading = false;
  }

  async getCartItems(){
    this.cartItems = await this.userDetailService.getCartItems(this.uid);
  }

  getTotalAmount(product: any) {
    return {
        totalAmount: product.quantity * product.price,
    }
  }

  close() {
    return this.modalController.dismiss();
  }

}
