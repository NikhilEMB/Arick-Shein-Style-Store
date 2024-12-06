import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ConfigService } from '../services/config/config.service';
import { VendorService } from '../services/vendor/vendor.service';
import { VendorOrderDetailsPage } from '../vendor-order-details/vendor-order-details.page';
import { Storage } from '@ionic/storage';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-vendor-orders',
  templateUrl: './vendor-orders.page.html',
  styleUrls: ['./vendor-orders.page.scss'],
})
export class VendorOrdersPage implements OnInit {

  orders: any = [];
  showLoader: boolean = true;
  orderIdPrefix: string;
  currencyCode: any;
  ordersSub: Subscription;

  userId;
  multipleVendorInvoices: any = false;
  vendorId: any;
  createUserOrderEnabled: boolean = false;

  constructor(
    private router: Router,
    private configService: ConfigService,
    private navController: NavController,
    private vendorService: VendorService,
    private modalController: ModalController,
    private storage: Storage,
    private sharedService: SharedService,
    private alertController: AlertController,
  ) { }

  async ngOnInit() {
    this.orderIdPrefix = this.configService.environment.orderIdPrefix;
    this.currencyCode = this.configService.environment.currencyCode;
    this.createUserOrderEnabled = this.configService.environment.createUserOrder;
    this.vendorId = await this.storage.get('uid');
  }

  async loadOrders() {
    this.showLoader = true;
    this.orders = await this.vendorService.getOrders();
    this.showLoader = false;
  }

  async ionViewWillEnter() {
    await this.checkVendorAccess();
    this.showLoader = true;
    this.orders = await this.vendorService.getOrders();
    this.ordersSub = this.vendorService.getVendorOrdersListener().subscribe(orders => {
      this.orders = orders;
    });
    this.showLoader = false;
    const multiVendorSettings: any = await this.vendorService.getActiveStatus('service');
    if (multiVendorSettings) {
      this.multipleVendorInvoices = multiVendorSettings.multipleVendorInvoices;
    }
  }

  async checkVendorAccess() {
    this.userId = await this.storage.get('uid');
    console.log("userId: ", this.userId);
    const vendor: any = await this.vendorService.getVendorData(this.userId, 'details');
    console.log("vendor: ", vendor);
    if (!vendor) {
      await this.sharedService.presentAlert("vendor not found!");
      this.navController.navigateRoot(['no-user-access']);
      return;
    }
    if (vendor && !vendor.active) {
      this.navController.navigateRoot(['no-user-access']);
      return;
    }
    // else {
    //   await this.checkVendorMembershipAccess(vendor);
    // }
  }

  async checkVendorMembershipAccess(vendor: any) {
    const response: any = await this.vendorService.getVendorMembership();
    console.log("vendor", vendor);
    if (!response.active) {
      return
    }
    else {
      if (!vendor.membership || !vendor.membership.active) {
        this.sharedService.presentAlert("Your membership is expired. Please purchase membership to continue.");
        this.navController.navigateRoot(['buy-vendor-membership']);
        return;
      }
    }
  }

  ionViewWillLeave() {
    this.vendorService.unsubscribeVendorOrderSub();
    this.ordersSub.unsubscribe();
  }

  getImgUrl(img: any) {
    if (img.mob) {
      return 'mob';
    }

    if (!img.mob && img.url) {
      return 'url';
    }
  }


  async onClickViewDetails(order) {
    // console.log("order", order);
    const modal = await this.modalController.create({
      component: VendorOrderDetailsPage,
      cssClass: 'custom-modal',
      componentProps: {
        'order': order
      }
    });
    modal.onDidDismiss().then(async (res) => {
      if (res && res.data) {
        // console.log("resData", res);
        if (res.data.isUpdated) {
          if (this.orders.length) {
            for (let order of this.orders) {
              if (order.id === res.data.id) {
                console.log("order.id", order.id);
                console.log("res.data.id", res.data.id);
                order.originalProducts = res.data.products;
                order.products = res.data.products;
                order.vendors = res.data.vendors;
                break;
              }
            }
          }
          // console.log("isUpdated");
        }

      }
    });
    await modal.present();
  }

  async loadMoreOrders(event) {
    const orders = await this.vendorService.loadMoreOrders();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
    if (!orders.length) {
      event.target.disabled = true;
    }
  }

  async checkProductToDeliver() {
    const uid = await this.storage.get('uid');
    const navigationExtras: NavigationExtras = {
      state: {
        vendorId: uid
      }
    }
    this.router.navigate(['products-to-deliver'], navigationExtras);
  }

  async downloadInvoice(order){
    console.log('order:', order);
    for (const vendor of order.vendors) {
      if (vendor.id == this.userId && vendor.invoice) {
        window.open(vendor.invoice, "_blank");
      } else{
        this.sharedService.presentAlert('Invoice not available');
      }
    }
  }

  isSubOrMembershipOrder(order) {
    if (order.hasOwnProperty('orderType') && (order.orderType === 'subscription' || order.orderType === 'membership')) {
      return true;
    } else {
      return false;
    }
  }

  goToManageShipment(id, order) {
    if (order.status === 'Pending') {
      this.sharedService.presentAlert('Please Confirm order before managing shipment');
    } else {
      this.router.navigate([`manage-shipment/${id}/${this.vendorId}`]);
    }
  }

  async createOrder() {
    if (this.createUserOrderEnabled == false) {
      const alert = await this.alertController.create({
        message: "Sorry, this feature is not available. Please upgrade your plan for access",
        buttons: ['ok']
      });
      await alert.present();
    } else {
      this.router.navigate(['create-order']);
    }
  }

}
