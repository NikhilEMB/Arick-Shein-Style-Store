import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, Events, LoadingController, AlertController, IonContent, Platform, PopoverController, NavController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import * as moment from 'moment';
import { ExportToCsv } from 'export-to-csv';
import { ViewOrderPage } from 'src/app/admin/admin-home/view-order/view-order.page';
import { UserService } from 'src/app/services/user/user.service';
import { Storage } from '@ionic/storage';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { VendorOrderDetailsPage } from 'src/app/vendor-order-details/vendor-order-details.page';

@Component({
  selector: 'app-products-to-deliver',
  templateUrl: './products-to-deliver.page.html',
  styleUrls: ['./products-to-deliver.page.scss'],
})
export class ProductsToDeliverPage implements OnInit {

  productsNeedToDeliver: any = [];
  noProductsNeedToDeliver: boolean = false;
  showProductsNeedToDeliverLoader: boolean = true;
  noMoreProductsNeedToDeliver: boolean;
  uniqueProductsQtyPerOrder: any = [];
  exportType = 'products'
  options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    filename:'Products',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title:'Exported Products',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true
  };
  role = "";
  orders = [];
  vendorId: any;

  constructor(public modalController: ModalController, private events: Events, private router: Router,
    public loadingController: LoadingController, public alertController: AlertController,public popoverController: PopoverController,
    private userService: UserService,
    private storage: Storage,
    private vendorService: VendorService,
    private route: ActivatedRoute) {
      this.route.queryParams.subscribe(async (params) => {
        if (this.router.getCurrentNavigation().extras.state) {
          const recieveData = await this.router.getCurrentNavigation().extras.state;
          if (recieveData) {
            this.vendorId = recieveData.vendorId;
          }
        }
      });
     }

  ngOnInit() {

  }

  async ionViewDidEnter(){
    this.role = await this.storage.get('userRole');
    if(this.vendorId) {
      this.orders = await this.vendorService.getOrdersForProductsNeedToDeliver(this.vendorId);
    } else {
      this.orders = await this.userService.getProductsNeedToDeliverForAdmin();
    }
    if(!this.orders.length) {
      this.noProductsNeedToDeliver = true;
      this.showProductsNeedToDeliverLoader = false;
    } else {
      this.productsQuantityPerOrder(this.orders);
      this.noProductsNeedToDeliver = false;
      this.showProductsNeedToDeliverLoader = false;
    }
  }

  initializeSubscriptions() {
    this.events.subscribe('user:publishProductsNeedToDeliverForAdmin', (orders) => {
      this.productsQuantityPerOrder(orders);
      this.noProductsNeedToDeliver = false;
      this.showProductsNeedToDeliverLoader = false;
    });
    this.events.subscribe('user:noProductsNeedToDeliverForAdmin', () => {
      this.noProductsNeedToDeliver = true;
      this.showProductsNeedToDeliverLoader = false;
    });
    this.events.subscribe('user:noMoreProductsNeedToDeliverForAdmin', () => {
      this.noMoreProductsNeedToDeliver = true;
    });
  }

  async onClickViewDetails(id) {

    if(this.vendorId && this.role === 'vendor') {
      const order = this.orders.find(o => o.orderId === id);
      if(order && typeof order === 'object' && Object.keys(order).length) {
        const modal = await this.modalController.create({
          component: VendorOrderDetailsPage,
          cssClass: 'custom-modal',
          componentProps: {
            'order': order
          }
        });
        modal.onDidDismiss().then(async (res) => {
          console.log("modal2 res", res);
          if (res && res.data && res.data.status) {
            if (res.data.status === 'Delivered') {
              await this.removeDeliveredOrder(id);
            }
          }
        });
        await modal.present();
      }
    } else {
     const modal2 = await this.modalController.create({
        component: ViewOrderPage,
        cssClass: 'view-order-css',
        componentProps: {
          orderId: id
        }
      });
      modal2.onDidDismiss().then(async (res) => {
        console.log("modal2 res", res);
        if (res && res.data && res.data.status) {
          if (res.data.status === 'Delivered') {
            await this.removeDeliveredOrder(id);
          }
        }
      });
      await modal2.present();
    }

  }

  async removeDeliveredOrder(orderId: any) {
    for (let productObj of this.uniqueProductsQtyPerOrder) {
      // console.log("productObj",productObj);
      for (let itemObj in productObj) {
        // console.log("itemObj",itemObj);
        for (let [orderObjIndex, orderObj] of productObj[itemObj].quantityPerOrder.entries()) {
          if (orderObj.orderId === orderId) {
            console.log("orderObjIndex", orderObjIndex);
            console.log("orderObj", orderObj);
            productObj[itemObj].quantityPerOrder.splice(orderObjIndex, 1);
          }
        }
      }
    }
  }

  // async removeDeliveredOrder(orderId: any) {
  //   console.log("uniqueProductsQtyPerOrder", this.uniqueProductsQtyPerOrder);
  //   for (let [productObjIndex, productObj] of this.uniqueProductsQtyPerOrder.entries()) {
  //     for (let itemObj in productObj) {
  //       for (let [orderObjIndex, orderObj] of productObj[itemObj].quantityPerOrder.entries()) {
  //         if (orderObj.orderId === orderId) {
  //           console.log("productObj", productObj);
  //           console.log("itemObj", itemObj);
  //           console.log("orderObjIndex", orderObjIndex);
  //           console.log("orderObj", orderObj);

  //           if (productObj[itemObj].quantityPerOrder.length === 1) {
  //             console.log("productObjIndex", productObjIndex);
  //             this.uniqueProductsQtyPerOrder.splice(productObjIndex, 1);
  //           } else {
  //             console.log("orderObjIndex", orderObjIndex);
  //             productObj[itemObj].quantityPerOrder.splice(orderObjIndex, 1);
  //           }

  //           break;

  //         }
  //       }
  //     }
  //   }
  // }

  getProductsNeedToDeliverForAdmin() {
    this.exportType = 'products'
    if(this.productsNeedToDeliver.length === 0) {
      this.events.publish('user:getProductsNeedToDeliverForAdmin');
    }
  }

  productsQuantityPerOrder(orders) {
    let uniqueProdcuts = [];
    let productsQuantity = [];
    for (let index = 0; index < orders.length; index++) {
      for (let x = 0; x < orders[index].products.length; x++) {
        if(orders[index].status === 'Pending' || orders[index].status === 'Confirmed') {
          let pid = orders[index].products[x].productId;
          let product = {};
          product[pid] = {
            quantity: this.getProductQty(orders[index], x),
            orderId: orders[index].orderId,
            weight: 'pack' in orders[index].products[x] ? orders[index].products[x].pack.weight : null
          }
          if(product[pid].quantity) {
            productsQuantity.push(product);
            if(!uniqueProdcuts.some(e => e.hasOwnProperty(pid))) {
              let uniqueProduct = {}
              uniqueProduct[pid] = {
                name: orders[index].products[x].name,
                img: orders[index].products[x].img,
                quantityPerOrder: []
              }
              uniqueProdcuts.push(uniqueProduct)
            }
          }
        }
      }
    }
    // console.log('productsQuantity', productsQuantity);
    // console.log('uniqueProdcuts', uniqueProdcuts);
    for (let index = 0; index < uniqueProdcuts.length; index++) {
      for(const [key, value] of Object.entries(uniqueProdcuts[index])) {
        for (let x = 0; x < productsQuantity.length; x++) {
          for(const [pid, qty] of Object.entries(productsQuantity[x])) {
            if(key === pid) {
              uniqueProdcuts[index][key].quantityPerOrder.push(qty);
            }
          }
        }
      }
    }
    // console.log('uniqueProdcuts final', uniqueProdcuts);
    this.uniqueProductsQtyPerOrder = uniqueProdcuts
  }

  getProductQty(order, productIndex) {
    let unavailableQty = 0;
    if('unavailable' in order && order.unavailable[productIndex]) {
      unavailableQty = order.unavailable[productIndex];
    }
    return order.products[productIndex].quantity - unavailableQty;
  }

  showVariantsQty(quantities) {
    return quantities.some(q => q.weight !== null);
  }

  getVariantsQty(quantities) {
    let variants = [];
    quantities.forEach(element => {
      const index = variants.findIndex(v => v.weight === element.weight);
      if(index === -1) {
        if(element.weight) {
          variants.push({
            weight: element.weight,
            qty: element.quantity
          });
        }
        else {
          variants.push({
            weight: null,
            qty: element.quantity
          });
        }
      } else {
        variants[index].qty += element.quantity
      }
    });
    return variants;
  }

  async exportProducts(){
    if(this.uniqueProductsQtyPerOrder && this.uniqueProductsQtyPerOrder.length){

      this.options.filename =  'Products for Delivery '+this.getDateTimeFormat(new Date);
      this.options.title = 'Products for Delivery '+this.getDateTimeFormat(new Date);
      let data = [];

      this.uniqueProductsQtyPerOrder.forEach(product => {

        if(product){
          let varientArray = []
          for(var key in product){
            let item = product[key];

            item.quantityPerOrder.forEach(element => {
              if (varientArray.length == 0){
                varientArray.push({weight: element.weight, quantity: element.quantity})
              }
              else{
                const index = varientArray.findIndex(v => v.weight == element.weight)
                if (index == -1){
                  varientArray.push({weight: element.weight, quantity: element.quantity})
                }
                else {
                  varientArray[index].quantity += element.quantity
                }
              }
            });
            varientArray.forEach(element => {
              data.push({
                product: item.name || '',
                variant: element.weight || '-',
                quantity: element.quantity
              })
            });
          }

        }
      
      });

      const csvExporter = new ExportToCsv(this.options);
      csvExporter.generateCsv(data);

    }
  }

  getDateTimeFormat(date){
    return moment(date).format('MMM D, YYYY hh:mm a');
  }

  calcTotalQtyPerOrder(qty) {
    let totalQty = 0;
    for (let index = 0; index < qty.length; index++) {
      totalQty += qty[index].quantity;
    }
    return totalQty;
  }

}