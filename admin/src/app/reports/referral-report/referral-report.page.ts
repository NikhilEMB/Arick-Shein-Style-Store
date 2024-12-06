import { Component, OnInit } from '@angular/core';
import { Events, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';
import { Storage } from '@ionic/storage';
import { ConfigService } from 'src/app/services/config/config.service';
import { ReferredUsersModalPage } from './referred-users-modal/referred-users-modal.page';
import { SharedService } from 'src/app/services/shared/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-referral-report',
  templateUrl: './referral-report.page.html',
  styleUrls: ['./referral-report.page.scss'],
})
export class ReferralReportPage implements OnInit {

  endDate;
  startDate;
  reports = [];
  loading;
  currencyCode: any;
  vendorReport = false;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router,private configService: ConfigService, private events: Events, private loadingController: LoadingController, private alertCtrl: AlertController, private storage: Storage,
    private modalController: ModalController, private sharedService: SharedService) {
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
      this.reports = reports;
      this.loading.dismiss();
    });
    this.events.subscribe('reports:getReportFailure', (errMessage) => {
      console.log('deatils Failure', errMessage);
    });
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

  getReport() {
    let startingDate = new Date(this.startDate);
    let endingDate = new Date(this.endDate);
    const diffInMs = Math.abs(endingDate.getTime() - startingDate.getTime());
    const differenceInDays = diffInMs / (1000 * 60 * 60 * 24);
    let startYrMonth = moment(startingDate).format('YYYY-MM');
    let endYrMonth = moment(endingDate).format('YYYY-MM');
    if (startYrMonth === endYrMonth) {
      this.events.publish('reports:getReport', startingDate, endingDate, 'referral');
    } else{
      if (differenceInDays <= 30) {
        this.events.publish('reports:getReport', startingDate, endingDate, 'referral');
      } else {
        this.showAlert('End date cannot be more than 1 month of start Date');
      }
    }
  }

  exportReport() {
    var data = [];
    this.reports.forEach((element) => {
      let usersReferred = '';
      for (const user of element.usersReferred) {
        if (usersReferred.length != 0) {
          usersReferred += ','
        }
          usersReferred += user.name;
      }
        let obj = {
          referrer: element.name,
          count: element.count,
          usersReferred: usersReferred,
          totalCashbackEarned: element.cashbackEarned
        };
        data.push(obj);
    });
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      filename:'Referral Reports',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
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
  
  async showAll(reportIndex){
    const modal = await this.modalController.create({
    component: ReferredUsersModalPage,
    cssClass:'custom-modal',
    showBackdrop: true,
    backdropDismiss: false,
    componentProps: { users: this.reports[reportIndex].usersReferred}
    });
    modal.onDidDismiss()
    .then((res) => {
  });
    await modal.present();
  }

}
