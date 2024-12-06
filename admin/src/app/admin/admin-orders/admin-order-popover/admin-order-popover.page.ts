import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Events, PopoverController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-admin-order-popover',
  templateUrl: './admin-order-popover.page.html',
  styleUrls: ['./admin-order-popover.page.scss'],
})
export class AdminOrderPopoverPage implements OnInit {
  id;
  order;
  showShiprocket;
  isArchive = false;

  constructor(private sharedService: SharedService, private router: Router, private events: Events, public popoverController: PopoverController) { }

  ngOnInit() {}
  ionViewWillEnter(){
    console.log('show:::', this.showShiprocket);
    this.initializeSubscriptions();
  }
  
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('order:updateOrderArchiveSuccess', ()=>{
      this.isArchive = true;
      this.sharedService.presentAlert('Order is moved to Archive List');
      this.dismiss();
    });
    this.events.subscribe('order:updateOrderArchiveFailure', ()=>{
      this.sharedService.presentAlert('Please try again later.');
    });
  }
  removeSubscriptions(){
    this.events.unsubscribe('order:updateOrderArchiveSuccess');
    this.events.unsubscribe('order:updateOrderArchiveFailure');
  }

  dismiss() {
    this.popoverController.dismiss({
      dismissed: true,
      data: {
        isArchive: this.isArchive,
      }
    });
  }
  
  onClickViewDetails() {
    const navigationextras: NavigationExtras = {
      state: {
        orderId: this.id
      }
    }
    console.log('id:', this.id);
    this.router.navigate(['order-details'], navigationextras);
    this.dismiss();
  }

  goToManageShipment() {
    if(this.order.status === 'Pending') {
      this.sharedService.presentAlert('Please Confirm order before managing shipment in Shiprocket');
    } else {
      this.router.navigate([`manage-shipment/${this.id}`]);
    }
    this.dismiss();
  }

  archiveOrder(){
    let obj = {
      subStatus: {
        isArchive: true
      }
    };
    this.events.publish('order:updateOrderArchive', this.order.id, obj);
  }

}
