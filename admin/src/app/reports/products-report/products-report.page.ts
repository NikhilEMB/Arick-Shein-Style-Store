import { Component, OnInit  } from '@angular/core';
import { Events, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';
import { Storage } from '@ionic/storage';
import { ConfigService } from 'src/app/services/config/config.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-products-report',
  templateUrl: './products-report.page.html',
  styleUrls: ['./products-report.page.scss'],
})
export class ProductsReportPage implements OnInit {

  endDate;
  startDate;
  productReports = [];
  loading;
  currencyCode: any;
  vendorReport = false;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router,private configService: ConfigService, private events: Events, private loadingController: LoadingController, private alertCtrl: AlertController, private storage: Storage, private sharedService: SharedService) {
  }

  goToPage(page: string) {
    this.router.navigate([page]);
  }

  async ngOnInit() {
    this.vendorReport = await this.sharedService.getMultiVendorStatus();
    this.currencyCode = this.configService.environment.currencyCode;
  }

  async ionViewWillEnter() {
    const dateObj = await this.sharedService.getReportDate();
    this.startDate = dateObj.startDate;
    this.endDate = dateObj.endDate;
    this.initializeSubscriptions();
  }
  ionViewWillLeave() {
    this.removeSubscriptions();
  }
  initializeSubscriptions() {
    this.events.subscribe('reports:getReportSuccess', (reports) => {
      this.productReports = [];
      for (const report of reports) {
        if (!this.addIndividualProduct(report)) {
            this.productReports.push(report);
          }
      }
      this.loading.dismiss();
    });
    this.events.subscribe('reports:getReportFailure', (errMessage) => {
      console.log('deatils Failure', errMessage);
    });
    this.getReport();
  }

  removeSubscriptions() {
    this.events.unsubscribe('reports:getReportSuccess');
    this.events.unsubscribe('reports:getReportFailure');
  }

  setStartDate() {
    console.log('set called:',this.startDate);
    this.storage.set('reportStartDate', this.startDate);
  }
  setEndDate() {
    this.storage.set('reportEndDate', this.endDate);
  }

  addIndividualProduct(product) {
    if (this.productReports.length > 0) {
        for (let i = 0; i < this.productReports.length; i++) {
          if (this.productReports[i].productId === product.productId) {
              this.productReports[i].sales += product.sales;
              this.productReports[i].items += product.items;
              this.productReports[i].gstObj.total += product.gstObj.total;
              this.productReports[i].gstObj.cgst += product.gstObj.cgst;
              this.productReports[i].gstObj.sgst += product.gstObj.sgst;
              this.productReports[i].gstObj.igst += product.gstObj.igst;
              return true;
          }
        }
    }
    return false;
  }

  getReport() {
    let startingDate = new Date(this.startDate);
    let endingDate = new Date(this.endDate);
    const diffInMs = Math.abs(endingDate.getTime() - startingDate.getTime());
    const differenceInDays = diffInMs / (1000 * 60 * 60 * 24);
    let startYrMonth = moment(startingDate).format('YYYY-MM');
    let endYrMonth = moment(endingDate).format('YYYY-MM');
    if (startYrMonth === endYrMonth) {
      this.events.publish('reports:getReport', startingDate, endingDate, 'products');
    } else{
      if (differenceInDays <= 30) {
        this.events.publish('reports:getReport', startingDate, endingDate, 'products');
      } else {
        this.showAlert('End date cannot be more than 1 month of start Date');
      }
    }
  }

  exportReport() {
    var data = [];
    this.productReports.forEach((element) => {
        let obj = {
          product: element.productName,
          sales: element.sales,
          items: element.items,
          GST: element.gstObj.value,
          GSTAmount: element.gstObj.total.toFixed(2)
        };
        data.push(obj);
    });
    const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Product Report',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: false,
        headers: ['Product', 'Sales', 'Items Ordered', 'GST %', 'GST Amount']
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 4000
    });
    await this.loading.present();
  }

  private showAlert(message: string) {
    this.alertCtrl.create({ header: 'Alert', message, buttons: ['Okay'] })
      .then(alertEl => alertEl.present());
  }

}

