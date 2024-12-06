import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { SharedService } from 'src/app/services/shared/shared.service';
import { BookingService } from 'src/app/services/booking/booking.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';
import { ConfigService } from 'src/app/services/config/config.service';
import { ChangeBookingSlotPage } from './change-booking-slot/change-booking-slot.page';

@Component({
  selector: 'app-booking-orders',
  templateUrl: './booking-orders.page.html',
  styleUrls: ['./booking-orders.page.scss'],
})
export class BookingOrdersPage implements OnInit {

  bookingOrders: any = [];
  selectedOrder: any;
  activeTile = 0;
  searchOrder: string = '';
  vendorName = '';
  taxType: any;
  currencyCode: any;
  userId: string;
  userRole: string;

  constructor(
    private storage: Storage,
    private sharedService: SharedService,
    private bookingService: BookingService,
    private alertController: AlertController,
    private modalController: ModalController,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.taxType = this.configService.environment.taxType;
    this.currencyCode = this.configService.environment.currencyCode;
  }

  async ionViewDidEnter() {
    await this.sharedService.presentLoading();
    this.userId = await this.storage.get('uid');
    this.userRole = await this.storage.get('userRole');
    await this.getBookingOrders();
    await this.sharedService.loading.dismiss();
  }

  async getBookingOrders() {
    let data: any = await this.bookingService.getAllBookingOrders();
    // console.log('Data:', data);
    if (data && data.length > 0) {
      this.bookingOrders = data;
      await this.viewBooking(0);
    }
  }

  async viewBooking(index: number) {
    this.activeTile = index;
    this.selectedOrder = this.bookingOrders[index];
    // console.log(this.selectedOrder);

    if (this.userRole !== "vendor") {
      await this.getVendorName();
    }
  }

  async getVendorName() {
    if (this.selectedOrder.vendor && this.selectedOrder.vendor.id) {
      let vendorData = await this.bookingService.getVendorName(this.selectedOrder.vendor.id);
      this.vendorName = vendorData ? vendorData['name'] : '';
    } else {
      this.vendorName = '';
    }
  }

  getDateTimeFormat(date: any) {
    return moment(date).format('MMM D, YYYY hh:mm a');
  }

  convert24to12(time) {
    return moment(time, ['HH:mm']).format('hh:mm A');
  }

  async searchBookingById() {
    await this.sharedService.presentLoading();
    if (!isNaN(parseInt(this.searchOrder))) {
      let data: any = await this.bookingService.returnBookingDetailsWithOrderId(parseInt(this.searchOrder));
      // console.log('res:', data);
      this.sharedService.loading.dismiss();
      if (data && data.length > 0) {
        this.bookingOrders = data;
        this.viewBooking(0);
      } else {
        this.sharedService.presentAlert('No such booking found !');
      }
    } else {
      this.sharedService.loading.dismiss();
      this.sharedService.presentAlert('Please enter a valid number');
      return
    }
  }

  async resetSearch() {
    this.searchOrder = '';
    await this.ionViewDidEnter();
  }

  async askUpdateStatus(status: string) {
    const alert = await this.alertController.create({
      subHeader: "Are you sure ?",
      buttons: [
        {
          text: "No",
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: "Yes",
          handler: async () => {
            this.changeBookingStatus(status);
          }
        }
      ]
    });
    await alert.present();
  }

  async changeBookingStatus(status: string) {
    await this.sharedService.presentLoading();
    this.selectedOrder.status = status;
    let response = await this.bookingService.updateBookingStatus(this.selectedOrder.id, this.selectedOrder.status);
    this.sharedService.loading.dismiss();
    if (response) {
      await this.sharedService.presentAlert(`Booking has been ${status}`);
    } else {
      await this.sharedService.presentAlert('Something went wrong !');
    }
  }

  getTotalAmount() {
    return {
      totalAmount: this.selectedOrder.item.price + (this.selectedOrder.payment.extraChargeOnPayment && this.selectedOrder.payment.extraChargeOnPayment.charge ? this.selectedOrder.payment.extraChargeOnPayment.charge : 0),
      totalGst: this.selectedOrder.item.totalGst + (this.selectedOrder.payment.extraChargeOnPayment && this.selectedOrder.payment.extraChargeOnPayment.gst ? this.selectedOrder.payment.extraChargeOnPayment.gst : 0),
    }
  }

  async showInvoice(url: any) {
    if (url) {
      window.open(url, '_blank');
    } else {
      this.sharedService.presentAlert('Something went wrong, Please try again !');
    }
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

  getBookingItemPrice() {
    return this.selectedOrder.item.price - this.selectedOrder.item.addOns.totalPrice - (this.selectedOrder.item.gst.isExclusive ? this.selectedOrder.item.gst.total : 0);
  }

  async changeBookingSlotModal() {
    const modal = await this.modalController.create({
      component: ChangeBookingSlotPage,
      cssClass: 'custom-modal',
      componentProps: {
        bookingDocId: this.selectedOrder.id,
        productId: this.selectedOrder.item.id,
      }
    });

    modal.onDidDismiss().then(res => {
      if (res && res.data && res.data.schedule) {
        // console.log('modal res:', res.data);
        this.selectedOrder.schedule = res.data.schedule;
      }
    })

    await modal.present();
  }

  async askUpdatePaymentStatus() {
    const openPrompt = await this.alertController.create({
      subHeader: "Are you sure you want to update payment status ?",
      buttons: [
        {
          text: "No",
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: "Yes",
          handler: async () => {
            await this.changePaymentStatus();
          }
        }
      ]
    });
    await openPrompt.present();
  }

  async changePaymentStatus() {
    await this.sharedService.presentLoading();
    let paymentStatus: any;

    if (this.isPartialPayment()) {
      this.selectedOrder.payment.partial.status = 'completed';
      paymentStatus = {
        'payment.partial.status': 'completed',
      }
    } else {
      this.selectedOrder.payment.completed = true;
      this.selectedOrder.payment.status = 'completed';
      paymentStatus = {
        'payment.completed': true,
        'payment.status': 'completed',
      }
    }

    let response = await this.bookingService.updatePaymentStatus(this.selectedOrder.id, paymentStatus);
    await this.sharedService.loading.dismiss();
    if (response) {
      await this.sharedService.presentAlert('Payment status updated successfully.');
    } else {
      await this.sharedService.presentAlert('Something went wrong !');
    }
  }

  isPartialPayment() {
    return this.selectedOrder.payment.partial && this.selectedOrder.payment.partial.cod;
  }
}
