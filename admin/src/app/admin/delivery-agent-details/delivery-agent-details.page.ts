import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/services/config/config.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UserService } from 'src/app/services/user/user.service';
import { ViewOrderPage } from '../admin-home/view-order/view-order.page';

@Component({
  selector: 'app-delivery-agent-details',
  templateUrl: './delivery-agent-details.page.html',
  styleUrls: ['./delivery-agent-details.page.scss'],
})
export class DeliveryAgentDetailsPage implements OnInit {
  userId: any;
  userData: any;
  sideMenu = [];
  activeTile = 0;
  currencyCode: any;
  orders = [];
  ordersData: any;

  // assignOrders: any = [];
  unAssignOrders: any = [];
  selectedOrders: any = [];
  isAllOrderSelect: boolean = false;
  searchOrder: string = "";
  // noMoreUsers: boolean = false;

  unAssignOrdersSub: Subscription;
  assignOrdersSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private configService: ConfigService,
    public modalController: ModalController,
    private sharedService: SharedService
  ) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userId = this.router.getCurrentNavigation().extras.state.uid;
        this.userData = this.router.getCurrentNavigation().extras.state.udata;
      }
    });
  }

  ngOnInit() {
    this.sideMenu.push('Pending', 'Delivered');
    this.currencyCode = this.configService.environment.currencyCode;
  }

  async ionViewDidEnter() {
    this.ordersData = [];
    await this.sharedService.presentLoading();
    this.initSubscription();
    // this.ordersData = await this.userService.getDeliveryAgentOrders(this.userId);

    await this.getUnAssignOrders();
    // await this.getAssignedOrders();

    // if (this.ordersData) {
    //   await this.changeComponent(0);
    // } else {
    this.sharedService.loading.dismiss();
    // this.sharedService.presentAlert('Something went wrong ! please try again.')
    // }
  }



  initSubscription() {
    this.unAssignOrdersSub = this.userService.getUnassignOrdersListener().subscribe((data) => {
      console.log("unAssignOrdersSub", data)
      if (data && data.length > 0) {
        this.unAssignOrders = data;
      }
    });

    this.assignOrdersSub = this.userService.getAssignedOrdersListener().subscribe((data) => {
      // this.assignOrders = data;
      this.ordersData = data;
      console.log("assignOrdersSub", data)
      if (data && data.length > 0) {
        this.changeComponent(0);
      }
    })

  }

  ionViewDidLeave() {
    this.unAssignOrdersSub.unsubscribe();
    this.userService.unAssignOrdersSub.unsubscribe();

    this.assignOrdersSub.unsubscribe();
    this.userService.assignedOrdersSub.unsubscribe();

    this.userService.assignedOrders$.next([]);
    this.userService.unAssignOrders$.next([]);
  }

  async getAssignedOrders() {
    // if (!this.ordersData.length) {
    await this.sharedService.presentLoading();
    this.ordersData = await this.userService.getDeliveryAgentOrders(this.userId);
    console.log("ordersData ", this.ordersData);
    this.sharedService.loading.dismiss();
    // }
  }

  async changeComponent(index: any) {
    this.activeTile = index;
    await this.filterOrder();
  }

  async filterOrder() {
    if (this.sharedService.loading) {
      this.sharedService.loading.dismiss();
    }

    await this.sharedService.presentLoading();

    if (this.ordersData) {
      this.orders = [];
      if (this.activeTile == 0) {
        const result = await this.ordersData.filter(order => ['Confirmed', 'Dispatched'].includes(order.status));
        this.orders = result;
        // console.log('pending-orders', this.orders);
      } else {
        const result = await this.ordersData.filter(order => order.status == 'Delivered');
        this.orders = result;
        // console.log('delivered-orders', this.orders);
      }
      this.sharedService.loading.dismiss();
    } else {
      this.sharedService.loading.dismiss();
      this.sharedService.presentAlert('Something went wrong ! please try again.')
    }
  }

  async onClickViewDetails(id: any, index) {
    const modal = await this.modalController.create({
      component: ViewOrderPage,
      cssClass: 'view-order-css',
      componentProps: {
        orderId: id
      }
    });
    modal.onDidDismiss().then((res) => {
      // console.log("res data:", res.data);
      if (res && res.data && res.data.status) {
        this.orders[index].status = res.data.status;
      }
    })
    await modal.present();
  }

  onClickTrackOrder(agentId: any, deliveryLatLng: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        agentId: agentId,
        deliveryLatLng: deliveryLatLng
      }
    }
    this.router.navigate(['location-map'], navigationExtras);
  }

  async getPendingOrdersPdf() {
    let getPdf = false;
    for (let order of this.orders) {
      if (['Confirmed', 'Dispatched'].includes(order.status)) {
        getPdf = true;
        break;
      }
    }

    if (!getPdf) {
      this.sharedService.presentAlert('No Pending Orders Available.');
    } else {
      await this.sharedService.presentLoading();
      const res = await this.userService.generateDeliveryAgentOrdersPdf(this.userId);
      if (res) {
        this.sharedService.loading.dismiss();
      } else {
        await this.sharedService.presentAlert('Something went wrong please try again.');
      }
    }
  }

  showOrder(order) {
    if (this.activeTile == 0) {
      return ['Confirmed', 'Dispatched'].includes(order.status);
    } else {
      return order.status === 'Delivered';
    }
  }

  // ? Start Assigning Orders Function
  async getUnAssignOrders() {
    let responseUnAssignOrders = await this.userService.getAllOrders(this.userId);
    console.log("orders", responseUnAssignOrders);
    this.unAssignOrders = responseUnAssignOrders;
  }

  async saveAssignOrders() {
    await this.sharedService.presentLoading();
    if (this.selectedOrders.length > 0) {
      let response = await this.userService.assignDeliveryAgentToOrders(this.userId, this.selectedOrders);
      // await this.getAssignOrders();
      await this.sharedService.loading.dismiss();

      console.log("response: ", response);
      if (response) {
        await this.sharedService.presentAlert("Delivery Agent assigned successfully");
      } else {
        await this.sharedService.presentAlert("Delivery Agent not assigned");
      }
    }
    else {
      await this.sharedService.loading.dismiss();
      await this.sharedService.presentAlert("Please select a order");
    }
  }

  // async loadMoreOrders(event: any) {
  //   // this.events.publish('user:loadMoreUsersForAdminUsers',this.sortValue);
  //   setTimeout(() => {
  //     event.target.complete();
  //   }, 1000);
  //   if (this.noMoreUsers === true) {
  //     event.target.disabled = true;
  //   }
  // }

  async searchOrderById() {
    await this.sharedService.presentLoading();
    if (!isNaN(parseInt(this.searchOrder))) {
      let data: any = await this.userService.returnOrderWithOrderId(parseInt(this.searchOrder), this.userId);
      console.log('res:', data);
      this.sharedService.loading.dismiss();
      if (data && data.length > 0) {
        this.unAssignOrders = data;
        // this.bookingOrders = data;
        // this.viewBooking(0);
      } else {
        this.sharedService.presentAlert('No such Order found !');
      }
    } else {
      this.sharedService.loading.dismiss();
      this.sharedService.presentAlert('Please enter a valid number');
      return
    }
  }

  async resetSearch() {
    await this.sharedService.presentLoading();
    this.searchOrder = '';
    // await this.getAssignOrders();
    await this.sharedService.loading.dismiss();
    // await this.ionViewDidEnter();
  }

  async selectAllOrder() {
    await this.sharedService.presentLoading();
    this.isAllOrderSelect = !this.isAllOrderSelect;
    if (this.isAllOrderSelect) {
      this.selectedOrders = [];
      for (const item of this.unAssignOrders) {
        this.selectedOrders.push(item.id);
      }
    }
    else {
      this.selectedOrders = [];
    }
    console.log("selected order: ", this.selectedOrders);
    await this.sharedService.loading.dismiss();
  }

  onClickCheckBox(id: string) {
    if (this.selectedOrders.indexOf(id) === -1) {
      this.selectedOrders.push(id);
    }
    else {
      const index = this.selectedOrders.indexOf(id);
      this.selectedOrders.splice(index, 1);
    }
    console.log("order selected: ", this.selectedOrders);
  }

  editCheckBoxValue(id: string) {
    if (this.selectedOrders.indexOf(id) !== -1) {
      return true;
    } else {
      return false;
    }
  }
  // ? End Assigning Orders Function

}
