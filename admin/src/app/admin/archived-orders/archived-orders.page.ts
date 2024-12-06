import { Component, OnInit } from '@angular/core';
import { Events, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { OrderService } from 'src/app/services/order/order.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-archived-orders',
  templateUrl: './archived-orders.page.html',
  styleUrls: ['./archived-orders.page.scss'],
})
export class ArchivedOrdersPage implements OnInit {

  pendingOrders: any = [];
  showPendingLoader: boolean = true;
  noPendingOrders: boolean = true;

  searchOrder: any;
  orderIndex;

  constructor( private events: Events,
    public loadingController: LoadingController,
    // private storage: Storage, private configService: ConfigService, public alertController: AlertController
    private sharedService: SharedService, private orderService: OrderService
    ) {}

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.pendingOrders = await this.orderService.getArchiveOrders()
    if (this.pendingOrders){
      this.noPendingOrders = false
      this.showPendingLoader = false
    }
    this.initializeSubscriptions();
  }  
  ionViewWillLeave(){
    this.removeSubscriptions();
  }

  initializeSubscriptions(){
    this.events.subscribe('order:removeOrderArchiveSuccess', ()=>{
      this.sharedService.presentAlert('Order has been removed from archive!');
    });
    this.events.subscribe('order:removeOrderArchiveFailure', ()=>{
      this.sharedService.presentAlert('Please try again later.');
    });
  }
  removeSubscriptions() {
    this.events.unsubscribe('order:removeOrderArchiveSuccess');
    this.events.unsubscribe('order:removeOrderArchiveFailure');
  }

  clearSearchOrder() {
    this.searchOrder = null;
  }
  
  getDateTimeFormat(date){
    return moment(date).format('MMM D, YYYY hh:mm a');
  }

  remove(orderId, order, index){
    let obj = {
      subStatus: {
        isArchive: false
      }
    };
    this.pendingOrders[index].subStatus.isArchive = false;
    this.events.publish('order:removeOrderArchive', order.id,obj);
  }

}

