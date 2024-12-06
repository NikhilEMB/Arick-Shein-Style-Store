import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {
  orderDetails;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
    console.log('orderDetails:', this.orderDetails)
  }

  close() {
    this.modalController.dismiss();
  }

  downloadInvoice(invoiceUrl){
    console.log('url:',invoiceUrl);
    window.open(invoiceUrl, "_blank");

  }

  getExtraChargeInvoice() {
    if('extraChargeOnOrder' in this.orderDetails && 'invoice' in this.orderDetails.extraChargeOnOrder && this.orderDetails.extraChargeOnOrder.invoice.url) {
      return this.orderDetails.extraChargeOnOrder.invoice.url;
    } else {
      return '';
    }
  }

}
