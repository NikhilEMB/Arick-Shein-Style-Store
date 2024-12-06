import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../services/user/user.service';
@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.page.html',
  styleUrls: ['./search-items.page.scss'],
})
export class SearchItemsPage implements OnInit {
  cartLength: number = 0;
  searchProduct: string = '';
  typingTimer;                
  doneTypingInterval = 500;
  showSearchLoader: boolean = false;
  showNoProducts = true;
  products: any[] = [];
  @ViewChild('searchInput', {static: false}) searchInput;
  constructor(private storage: Storage,
              private events: Events,
              private router: Router,
              private alertController: AlertController,
              private userService: UserService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.initializeSubscriptions();
    this.storage.get('uid').then((val) => {
      this.events.publish('user:getLengthOfCartProducts', val);
    });
    setTimeout(() => {
      this.searchInput.setFocus();
    }, 500);
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('user:publishLengthOfCartProducts', (cartLength) => {
      this.cartLength = cartLength;
    });
    this.events.subscribe('product:publishProductsForAdminProducts', (products) => {
      this.products = products;
      //console.log('products', this.products);
      this.showSearchLoader = false;
      this.showNoProducts = false;
  });
  this.events.subscribe('product:noProductsAvailable', () => {
    //console.log('in no data shop');
    this.showNoProducts = true;
    this.showSearchLoader = false;
  });
  }
  fireSearchQuery() {
    clearTimeout(this.typingTimer);
    if(this.searchProduct !== '') {
      this.typingTimer = setTimeout(() => {
        //console.log('in fireSearchQuery...');
        this.showSearchLoader = true;
        this.showNoProducts = false;
        this.events.publish('search-engine:searchProductForAdminProducts', this.searchProduct);
      }, this.doneTypingInterval);
      
    } else {
      this.showNoProducts = true;
    }
  }
  onClickBackBtn() {
    this.router.navigate(['shop']);
  }
  goToCart() {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else {
      this.storage.get('userRole').then((role) => {
        if(role === 'admin') {
          this.presentAlert('Cart is available only for user not for admin.');
       } else if(role === 'deliveryAgent') {
        this.presentAlert('Cart is available only for user not for delivery agent.');
       }
        else {
          const navigationExtras: NavigationExtras = {
            state: {
              routeFromSearchItemsPage: true,
            }
          };
          this.router.navigate(['user-cart'], navigationExtras);
       }
      });
  }
    
  }
  onClickProduct(id: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        productId: id
      }
    };
    this.router.navigate(['product-details'], navigationExtras);
  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  removeSubscriptions() {
    this.events.unsubscribe('user:publishLengthOfCartProducts');
    this.events.unsubscribe('product:noProductsAvailable');
    this.events.unsubscribe('product:publishProductsForAdminProducts');
  }
}
