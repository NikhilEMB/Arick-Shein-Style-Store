import { Component, OnInit, ViewChild  } from '@angular/core';
import { Events, LoadingController, AlertController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { ExportToCsv } from 'export-to-csv';
import { Storage } from '@ionic/storage';
import { SharedService } from 'src/app/services/shared/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-services-report',
  templateUrl: './services-report.page.html',
  styleUrls: ['./services-report.page.scss'],
})
export class ServicesReportPage implements OnInit {
  @ViewChild('salesChart', null) salesChart;
  @ViewChild('ordersChart', null) ordersChart;
  
  salesPieChart;
  ordersPieChart;
  chartOptions = {
    legend: {
       display: false
    },
    tooltips: {
       enabled: true
    }
    };
  colorsData;
  chartColors = [];

  productNames = [];
  endDate;
  startDate;
  serviceReports = [];
  loading;
  vendorReport = false;
  
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private dataService: DataService, private events: Events, private loadingController: LoadingController, private alertCtrl: AlertController, private storage: Storage, private sharedService: SharedService) { 
    
  }

  goToPage(page: string) {
    this.router.navigate([page]);
  }

  async ngOnInit() {
    this.vendorReport = await this.sharedService.getMultiVendorStatus();
    this.colorsData = this.dataService.colors;
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
      this.serviceReports = [];
      for (const report of reports) {
        if (!this.addIndividualService(report)) {
            this.serviceReports.push(report);
          }
      }
      this.setNames();
      this.setColors();
      this.createSalesChart();
      this.createOrdersChart();
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
    this.storage.set('reportStartDate', this.startDate);
  }
  setEndDate() {
    this.storage.set('reportEndDate', this.endDate);
  }

  addIndividualService(service) {
    if (this.serviceReports.length > 0) {
        for (let i = 0; i < this.serviceReports.length; i++) {
          if (this.serviceReports[i].serviceId === service.serviceId) {
              this.serviceReports[i].completed += service.completed;
              this.serviceReports[i].requests += service.requests;
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
      this.events.publish('reports:getReport', startingDate, endingDate, 'services');
    } else{
      if (differenceInDays <= 30) {
        this.events.publish('reports:getReport', startingDate, endingDate, 'services');
      } else {
        this.showAlert('End date cannot be more than 1 month of start Date');
      }
    }
  }

  exportReport() {
    var data = [];
    this.serviceReports.forEach((element) => {
        let obj = {
          service: element.serviceName,
          requests: element.requests,
          completed: element.completed,
        };
        data.push(obj);
    });
    const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Service Report',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: false,
        headers: ['Service', 'Requests', 'completed']
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }

  setColors(){
    for (let i = 0; i < this.serviceReports.length; i++) {
      console.log ();
      this.chartColors.push(this.colorsData[i]);
    }

  }

  setNames(){
    this.serviceReports.forEach((value) => {
      this.productNames.push(value.serviceName);
    });
  }

  createSalesChart() {
    let salesData = [];
    this.serviceReports.forEach((value) => {
      salesData.push(value.completed);
    });

    if (this.salesPieChart) {
      this.salesPieChart.destroy();
    }

    this.salesPieChart = new Chart(this.salesChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.productNames,
        datasets: [{
          backgroundColor: this.chartColors,
          data: salesData,
          borderWidth:0
        }]
      },
      options: this.chartOptions
    });
  }

  createOrdersChart() {
    let ordersData = [];
    this.serviceReports.forEach((value) => {
      ordersData.push(value.requests);
    });

    if (this.ordersPieChart) {
      this.ordersPieChart.destroy();
    }
    
    this.ordersPieChart = new Chart(this.ordersChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.productNames,
        datasets: [{
          backgroundColor: this.chartColors,
          data: ordersData,
          borderWidth:0
        }]
      },
      options: this.chartOptions
    });
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

