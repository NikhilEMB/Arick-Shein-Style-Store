import { Component, OnInit } from '@angular/core';
import { Events, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';
import { Storage } from '@ionic/storage';
import { ConfigService } from 'src/app/services/config/config.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-vendor-report',
  templateUrl: './vendor-report.page.html',
  styleUrls: ['./vendor-report.page.scss'],
})
export class VendorReportPage implements OnInit {

  endDate;
  startDate;
  vendors = [];
  reports=[];
  loading;
  currencyCode: any;
  selectedVendorId;

  // Vendor Login
  userRole;
  userId;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router,private configService: ConfigService, private events: Events, private alertCtrl: AlertController, private storage: Storage, private sharedService: SharedService) {
  }

  goToPage(page: string) {
    this.router.navigate([page]);
  }

  ngOnInit() {
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
  async initializeSubscriptions() {
    this.events.subscribe('user:getUserByRoleSuccess', (vendorsList) => {
      this.vendors = vendorsList;
      if (this.loading) {
        this.loading.dismiss();
      }
    });
    this.events.subscribe('user:getUserByRoleFailure', (errMessage) => {
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
      console.log('deatils Failure', errMessage);
    });
    this.events.subscribe('reports:getReportSuccess', (reports) => {
      if (this.sharedService.loading) {
        this.sharedService.loading.dismiss();
      }
      this.reports = []
      console.log('reports:', reports);
      if (this.userRole == 'vendor') {
        this.reports = reports.filter(report => report.id === this.selectedVendorId);
        console.log('reports:', this.reports);
        if (this.loading) {
          this.loading.dismiss();
        }
      } else{
        for (let report of reports) {
          console.log('report.id:', report.id);
          const search = vendor => vendor.id === report.id;
          const vendorIndex = this.reports.findIndex(search);
          console.log('vendorIndex:', vendorIndex);
          if (vendorIndex > -1) {
            for (const product of report.products) {
              this.reports[vendorIndex].commission += product.commission;
              this.reports[vendorIndex].sales += product.sales;
            }
          } else{
            let sales = 0,commission = 0;
            for (const product of report.products) {
              commission += product.commission;
              sales += product.sales;
            }
            this.reports.push({
              id: report.id,
              name: report.name,
              sales: sales,
              commission: commission,
            })
          }
        }
      }
    });
    this.events.subscribe('reports:getReportFailure', (errMessage) => {
      console.log('deatils Failure', errMessage);
    });
    
    this.userRole = await this.storage.get('userRole');
    if (this.userRole == 'vendor') {
      this.userId = await this.storage.get('uid');
      this.selectedVendorId = this.userId;
    } else{
      this.events.publish('user:getUserByRole', 'vendor');
    }
  }

  removeSubscriptions() {
    this.events.unsubscribe('reports:getReportSuccess');
    this.events.unsubscribe('reports:getReportFailure');
    this.events.unsubscribe('user:getUserByRoleSuccess');
    this.events.unsubscribe('user:getUserByRoleFailure');
  }

  setStartDate() {
    console.log('set called:',this.startDate);
    this.storage.set('reportStartDate', this.startDate);
  }
  setEndDate() {
    this.storage.set('reportEndDate', this.endDate);
  }


  getVendorReport(ev){
    this.selectedVendorId = ev.detail.value;
  }

  getReport() {
    this.sharedService.presentLoading();
    let startingDate = new Date(this.startDate);
    let endingDate = new Date(this.endDate);
    const diffInMs = Math.abs(endingDate.getTime() - startingDate.getTime());
    const differenceInDays = diffInMs / (1000 * 60 * 60 * 24);
    let startYrMonth = moment(startingDate).format('YYYY-MM');
    let endYrMonth = moment(endingDate).format('YYYY-MM');
    if (startYrMonth === endYrMonth) {
      this.events.publish('reports:getReport', startingDate, endingDate, 'vendors');
    } else{
      if (differenceInDays <= 30) {
        this.events.publish('reports:getReport', startingDate, endingDate, 'vendors');
      } else {
        this.showAlert('End date cannot be more than 1 month of start Date');
      }
    }
  }

  exportReport() {
    var data = [];
    if (this.userRole == 'vendor') {
      this.reports.forEach((report) => {
        for (const product of report.products) {
          let obj = {
            product: product.name,
            sales: product.sales,
            items: product.quantity,
            commission: product.commission,
          };
          data.push(obj);
        }
      }); 
    } else {
      for (const report of this.reports) {
        let obj = {
          name: report.name,
          sales: report.sales,
          commission: report.commission,
        };
        data.push(obj);
      }
    }
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      filename:'Vendor Report',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }

  private showAlert(message: string) {
    this.alertCtrl.create({ header: 'Alert', message, buttons: ['Okay'] })
      .then(alertEl => alertEl.present());
  }

}
