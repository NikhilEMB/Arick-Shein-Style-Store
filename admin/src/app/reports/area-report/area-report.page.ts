import { Component, OnInit  } from '@angular/core';
import { Events, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';
import { Storage } from '@ionic/storage';
import { ConfigService } from 'src/app/services/config/config.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-area-report',
  templateUrl: './area-report.page.html',
  styleUrls: ['./area-report.page.scss'],
})
export class AreaReportPage implements OnInit {
  endDate;
  startDate;
  areaReports = [];
  loading;
  currencyCode: any;
  vendorReport = false;
  
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private events: Events, private loadingController: LoadingController, private alertCtrl: AlertController, private storage: Storage, private configService: ConfigService, private sharedService: SharedService) {
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
      this.areaReports = [];
      for (const report of reports) {
        if (!this.addIndividualProduct(report)) {
            this.areaReports.push(report);
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
    console.log('set:', this.startDate);
    this.storage.set('reportStartDate', this.startDate);
  }
  setEndDate() {
    this.storage.set('reportEndDate', this.endDate);
  }

  addIndividualProduct(area) {
    if (this.areaReports.length > 0) {
        for (let i = 0; i < this.areaReports.length; i++) {
          if (this.areaReports[i].pincode === area.pincode) {
              this.areaReports[i].sales += area.sales;
              this.areaReports[i].orders += area.orders;
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
      this.events.publish('reports:getReport', startingDate, endingDate, 'area');
    } else{
      if (differenceInDays <= 30) {
        this.events.publish('reports:getReport', startingDate, endingDate, 'area');
      } else {
        this.showAlert('End date cannot be more than 1 month of start Date');
      }
    }
  }

  exportReport() {
    var data = [];
    this.areaReports.forEach((element) => {
        let obj = {
          state: element.state,
          city: element.city,
          pincode: element.pincode,
          orders: element.orders,
          sales: element.sales
        };
        data.push(obj);
    });
    const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Area Report',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: false,
        headers: ['State', 'City', 'Pincode', 'Orders', 'Sales']
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
