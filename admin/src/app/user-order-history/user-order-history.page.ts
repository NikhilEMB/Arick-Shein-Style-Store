import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user/user.service';
@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.page.html',
  styleUrls: ['./user-order-history.page.scss'],
})
export class UserOrderHistoryPage implements OnInit {

  orders: any = [];
  showLoader: boolean = true;
  noOrders: boolean = false;
  unreadAdminMsgs: number = 0;
  constructor(private events: Events,
              private router: Router,
              private storage: Storage, private userService: UserService,
              ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.initializeSubscription();
    this.events.publish('user:getAllOrdersOfUser');
    this.storage.get('uid').then((val) => {
      this.events.publish('chat:getUnreadMsgOfAdmin', val);
    });
  } 
  ionViewWillLeave() {
    this.removeSubscription();
  }
  initializeSubscription() {
    this.events.subscribe('user:publishAllOrdersOfUser', (orders) => {
      //console.log('all orders of user', orders);
      this.orders = orders;
      this.showLoader = false;
    });
    this.events.subscribe('user:noOrderHistoryOfUser', () => {
      this.showLoader = false;
      this.noOrders = true;
    });
    this.events.subscribe('chat:publishUnreadMsgOfAdmin', (unreadMsgs) => {
      this.unreadAdminMsgs = unreadMsgs;
    });
  }
  
  onClickViewDetails(id) {
    const navigationextras: NavigationExtras = {
      state: {
        orderId: id
      }
    }
    this.router.navigate(['user-order-details'], navigationextras);
  }
  goToChat(fromfab: boolean) {
    let userId = this.userService.getUserId();
    //console.log('uid in sc', userId);
    if(userId === '') {
      //console.log('in if of uid');
      this.router.navigate(['home']);
    } else { 
      //console.log('in else of uid');
      this.storage.get('userRole').then(async (role) => {
        if(role === 'admin') {
          
          this.router.navigate(['admin-home']);
        } else {
          
          this.router.navigate(['chat-bot']);
        }
      });
    }
  }
  onClickTrackOrder(agentId, deliveryLatLng) {
    const navigationExtras: NavigationExtras = {
      state: {
        agentId: agentId,
        routeFromUserSide: true,
        deliveryLatLng: deliveryLatLng
      }
    }
    this.router.navigate(['location-map'], navigationExtras);
  }
  removeSubscription() {
    this.events.unsubscribe('user:publishAllOrdersOfUser');
    this.events.unsubscribe('user:noOrderHistoryOfUser');
    this.events.unsubscribe('chat:publishUnreadMsgOfAdmin');
  }


}
