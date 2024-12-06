import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ConfigService } from 'src/app/services/config/config.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { ImageModalPage } from '../image-modal/image-modal.page';

@Component({
  selector: 'app-vendor-order-details',
  templateUrl: './vendor-order-details.page.html',
  styleUrls: ['./vendor-order-details.page.scss'],
})
export class VendorOrderDetailsPage implements OnInit {

  products: any = [];
  currencyCode: any;
  orderId: string;
  orderDocId: any;
  orderIdPrefix: any;
  VENDOR_ORDER_DETAILS_LABELS: any;
  SHARED_LABELS: any;
  originalProducts: any = [];
  vendorStatus = 'notSet';
  showOrderInfo = false;
  order;
  taxType: any;
  constructor(private configService: ConfigService,
      private sharedService: SharedService,
      private vendorService: VendorService,
      private alertController: AlertController,
      private storage: Storage, private modalController: ModalController
  ) { }

  async ngOnInit() {
    console.log('orders:', this.order);
    this.products = this.order.products;
    this.orderDocId = this.order.id;
    this.orderId = this.order.orderId;
    this.originalProducts = this.order.originalProducts;
      this.orderIdPrefix = this.configService.environment.orderIdPrefix;
      this.currencyCode = this.configService.environment.currencyCode;
      this.taxType = this.configService.environment.taxType;
      // this.VENDOR_ORDER_DETAILS_LABELS = this.labelService.labels['VENDOR_ORDER_DETAILS'];
      // this.SHARED_LABELS = this.labelService.labels['SHARED'];

      for (const product of this.products) {
          let breakFor = false;
          switch (product.vendorStatus.status) {
              case 'notSet':
                  this.vendorStatus = 'notSet';
                  breakFor = true;
                  break;
              case 'dispatched':
                  this.vendorStatus = 'dispatched';
                  breakFor = true;
                  break;
              case 'prepared':
                  this.vendorStatus = 'prepared';
                  breakFor = true;
                  break;
              case 'cancelled':
                  this.vendorStatus = 'cancelled';
                  break;
          }
          if (breakFor) {
              break;
          }
      }

    const mvDocData: any = await this.vendorService.getActiveStatus('service');

    if(mvDocData.multipleVendorInvoices) {
        this.showOrderInfo = true;
    } else {
        const vendorData = await this.vendorService.getVendorDataWithId();
        this.showOrderInfo = 'showUserDetails' in vendorData ? vendorData.showUserDetails : false;
    }
  }

  
  closeModal(data?: any) {
    this.modalController.dismiss(data);
  }

  getProductType(product: any) {
      if (!product.hasOwnProperty('pack')) {
          return 'single';
      }
      if (product.hasOwnProperty('pack')) {
          if (product.pack.variantType && product.pack.variantType === 'pieces') {
              return 'pieces';
          } else {
              return 'variant';
          }
      }
  }

  getProductPrice(product: any) {
      const type = this.getProductType(product);
      if (type === 'single' || type === 'variant') {
          return product.price * product.quantity;
      }
      if (type === 'pieces') {
          return product.price;
      }
  }

  getProductImg(product: any) {
      if (product.img.mob) {
          return product.img.mob;
      }
      if (!product.img.mob && product.img.url) {
          return product.img.url;
      }
      if (!product.img.mob && !product.img.url) {
          return 'assets/img/img-preloader.png';
      }
  }

  getProductDesc(product: any) {
      const type = this.getProductType(product);
      let desc = product.description;
      if (type === 'variant') {
          desc = `${product.pack.variantType}: ${desc}`;
      }
      if (type === 'pieces') {
          desc = `${product.pack.variantType}: ${desc} X ${product.quantity}`;
      }
      return desc;
  }

  decrementQty(index: number) {
      if (this.products[index].vendorStatus.unavailableQty > 0) {
          this.products[index].vendorStatus.unavailableQty -= 1;
      }
  }

  incrementQty(index: number, orderedQty: number) {
      if (this.products[index].vendorStatus.unavailableQty < orderedQty) {
          this.products[index].vendorStatus.unavailableQty += 1;
      }
  }

  remove(index: number, orderedQty: number) {
      this.products[index].vendorStatus.unavailableQty = orderedQty;
  }

  getStatusColor(status: string) {
      switch (status) {
          case 'prepared':
          case 'dispatched':
              return 'success';

          case 'cancelled':
              return 'danger';

          default:
              return 'dark'
      }
  }

  async presentAlertConfirm(header: string) {
      return new Promise<boolean>(async resolve => {
          const alert = await this.alertController.create({
              message: header,
              buttons: [
                  {
                      text: 'No',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: () => {
                          resolve(false);
                      }
                  }, {
                      text: 'Yes',
                      handler: () => {
                          resolve(true);
                      }
                  }
              ]
          });

          await alert.present();
      });

  }

  async cancelOrder() {
      const confirm = await this.presentAlertConfirm('Are you sure you want to cancel this order?');
      if (confirm) {
          this.saveData('cancelled', 'Order has been cancelled successfully!');
      }
  }

  async dispatchReady() {
      const confirm = await this.presentAlertConfirm("Are you sure you are ready to dispatch this order?");
      if (confirm) {
          this.saveData('prepared', "Order set to ready for dispatch successfully!");
      }
  }

  async dispatched() {
      const confirm = await this.presentAlertConfirm("Are you sure you are ready to dispatch this order?");
      if (confirm) {
          this.saveData('dispatched', "Order has been dispatched successfully!");
      }
  }

  async saveChanges() {
      this.saveData('notSet', "Unavailable quantities have been set successfully!");
  }

  async saveData(status: string, successMsg: string) {
      await this.sharedService.presentLoading('Please Wait...', 10000);
      const vendorId = await this.storage.get('uid');
      for (let i = 0; i < this.products.length; i++) {
          this.originalProducts[i]['vendorStatus'] = {
              id: vendorId,
              unavailableQty: this.products[i].vendorStatus.unavailableQty,
              status: this.products[i].vendorStatus.status === 'cancelled' ? 'cancelled' : this.products[i].vendorStatus.unavailableQty === this.products[i].quantity ? 'cancelled' : status
          };
      }

      if(status === 'notSet') {
          for (const p of this.originalProducts) {
              if(p.vendorStatus.status === 'cancelled' || p.vendorStatus.unavailableQty > 0) {
                  status = 'partiallyCancelled';
                  break;
              }
          }
      }

      if (this.order.vendors && this.order.vendors.length) {
          for (const vendor of this.order.vendors) {
              if (vendor.id === vendorId) {
                  vendor['status'] = status;
                  break;
              }
          }
      }

      const res = await this.vendorService.setVendorStatus(this.originalProducts, this.order.vendors, this.orderDocId);
      this.sharedService.loading.dismiss();
      if (res) {
          let updatedOrder = {
              products: this.originalProducts,
              vendors: this.order.vendors,
              id: this.orderDocId,
              isUpdated: true, //? is order data updated or not
          }

          this.sharedService.presentAlert(successMsg);
          this.closeModal(updatedOrder);
      } else {
          this.sharedService.presentAlert('An Error Occurred');
      }
  }

  isVendorQtyUnavialble(product) {
    return product.vendorStatus.unavailableQty > 0 && product.vendorStatus.unavailableQty !== product.quantity;
}

    imgZoom(img: any) {
        this.modalController.create({
            component: ImageModalPage,
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: [{ url: img }],
                index: 0
            }
        }).then(modal => modal.present());
    }

}
