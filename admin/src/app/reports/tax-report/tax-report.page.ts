import { Component, OnInit  } from '@angular/core';
import { Events, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';
import { Storage } from '@ionic/storage';
import { ConfigService } from 'src/app/services/config/config.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tax-report',
  templateUrl: './tax-report.page.html',
  styleUrls: ['./tax-report.page.scss'],
})
export class TaxReportPage implements OnInit {

  endDate;
  startDate;
  totalTax = 0;
  finalTaxReport = [];
  loading;
  currencyCode: any;
  vendorReport = false;
  
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private configService: ConfigService,private events: Events, private loadingController: LoadingController, private alertCtrl: AlertController, private storage: Storage, private sharedService: SharedService) {
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
    this.events.subscribe('reports:getTaxReportSuccess', (taxReports) => {
      this.totalTax = 0;
      this.finalTaxReport = [];
      taxReports.forEach(report => {
        if(!this.addIndividualUserTax(report) && report.hasOwnProperty('defaultGst')){
          this.finalTaxReport.push(report);
        }
        if(!Number.isNaN(report.defaultGst) && report.hasOwnProperty('defaultGst')) {
          this.totalTax += report.defaultGst;
        }
      });
      this.loading.dismiss();
    });
    this.events.subscribe('reports:getTaxReportFailure', (errMessage) => {
      console.log('deatils Failure', errMessage);
    });
    this.getTaxReport();

  }

  removeSubscriptions() {
    this.events.unsubscribe('reports:getTaxReportSuccess');
    this.events.unsubscribe('reports:getTaxReportFailure');
  }
  setStartDate() {
    this.storage.set('reportStartDate', this.startDate);
  }
  setEndDate() {
    this.storage.set('reportEndDate', this.endDate);
  }

  getTaxReport() {
    let startingDate = new Date(this.startDate);
    let endingDate = new Date(this.endDate);
    const diffInMs = Math.abs(endingDate.getTime() - startingDate.getTime());
    const differenceInDays = diffInMs / (1000 * 60 * 60 * 24);
    let startYrMonth = moment(startingDate).format('YYYY-MM');
    let endYrMonth = moment(endingDate).format('YYYY-MM');
    if (startYrMonth === endYrMonth) {
      this.events.publish('reports:getTaxReport', startingDate, endingDate);
    } else{
      if (differenceInDays <= 30) {
        this.events.publish('reports:getTaxReport', startingDate, endingDate);
      } else {
        this.showAlert('End date cannot be more than 1 month of start Date');
      }
    }
  }

  exportReport() {
    var data = [];
    this.finalTaxReport.forEach((element) => {
        let obj = {
          customer: element.userName,
          gstNo: element.customerGstNo ? element.customerGstNo : 'NA',
          tax: element.defaultGst.toFixed(2),
        };
        data.push(obj);
    });
    const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Tax Report',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: false,
        headers: ['Customer', 'GST Number', 'Tax']
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }

  addIndividualUserTax(report){
    if(this.finalTaxReport.length > 0) {
      for(let obj of this.finalTaxReport){
        if(obj.userId === report.userId){
          // if(!Number.isNaN(report.defaultGst) && report.hasOwnProperty('defaultGst') && obj.hasOwnProperty('defaultGst')){
            obj.defaultGst += report.defaultGst;
            return true;
          // }
        }
      }
    }
    return false;
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


