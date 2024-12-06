import { Component, OnInit, ViewChild  } from '@angular/core';
import { Events, AlertController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ConfigService } from 'src/app/services/config/config.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.page.html',
  styleUrls: ['./sales-report.page.scss'],
})
export class SalesReportPage implements OnInit {
  @ViewChild('orderChart', null) barChart;
  @ViewChild('salesChart', null) salesChart;

  orderChartInstance;
  salesChartInstance;
  colorArray: any;
  chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  endDate;
  startDate;
  sales = 0;
  profit = 0;
  orders = 0;
  chartSalesLabel = [];
  chartSalesData = [];
  chartOrderLabel = [];
  chartOrderData = [];
  currencyCode: any;
  vendorReport = false;
  constructor(private router: Router,
              private configService: ConfigService,
              private events: Events,
              private alertCtrl: AlertController,
              private storage: Storage, private sharedService: SharedService) { }

  async ngOnInit() {
    this.vendorReport = await this.sharedService.getMultiVendorStatus();
    this.currencyCode = this.configService.environment.currencyCode;
  }

  goToPage(page: string) {
    this.router.navigate([page]);
  }
  getDaysArray(start, end) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
  }
    return arr;
  }
  ionViewDidEnter() {
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
      console.log('sales reports', reports);
      this.sales = 0;
      this.profit = 0;
      this.orders = 0;
      this.chartSalesLabel = [];
      this.chartSalesData = [];
      this.chartOrderLabel = [];
      this.chartOrderData = [];
      
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      const dateArr = this.getDaysArray(startDate, endDate);
      for (const report of reports) {
        this.sales += report.sales;
        this.orders += report.orders;
        this.profit += report.profit;
        for (let i = 0; i < dateArr.length; i++) {
          let dateNumber = dateArr[i].getDate();
          this.chartSalesLabel.push(dateNumber.toString());
          this.chartOrderLabel.push(dateNumber.toString());
          if (report.date.toDate().getDate() == dateNumber) {
              this.chartOrderData.push(report.orders);
              this.chartSalesData.push(report.sales);
            } else {
              this.chartOrderData.push(0);
              this.chartSalesData.push(0);
            }
        }
      }
      this.createOrdersChart();
      this.createSalesChart();
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
  async setStartDate() {
    await this.storage.set('reportStartDate', this.startDate);
    console.log('set done');
  }
  async setEndDate() {
    await this.storage.set('reportEndDate', this.endDate);
  }

  getReport() {
    const startingDate = new Date(this.startDate);
    const endingDate = new Date(this.endDate);
    const diffInMs = Math.abs(endingDate.getTime() - startingDate.getTime());
    const differenceInDays = diffInMs / (1000 * 60 * 60 * 24);
    let startYrMonth = moment(startingDate).format('YYYY-MM');
    let endYrMonth = moment(endingDate).format('YYYY-MM');
    if (startYrMonth === endYrMonth) {
      this.events.publish('reports:getReport', startingDate, endingDate, 'sales');
    } else{
      if (differenceInDays <= 30) {
        this.events.publish('reports:getReport', startingDate, endingDate, 'sales');
      } else {
        this.showAlert('End date cannot be more than 1 month of start Date');
      }
    }
  }

  createOrdersChart() {
    if (this.orderChartInstance) {
      this.orderChartInstance.destroy();
    }
    this.orderChartInstance = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartOrderLabel,
        datasets: [{
          label: 'Orders',
          data: this.chartOrderData,
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: this.chartOptions
    });
  }

  createSalesChart() {
    if (this.salesChartInstance) {
      this.salesChartInstance.destroy();
    }
    this.salesChartInstance = new Chart(this.salesChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartSalesLabel,
        datasets: [{
          label: 'Sales',
          data: this.chartSalesData,
          backgroundColor: '#4b526d', // array should have same number of elements as number of dataset
          borderColor: '#373f5d', // array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: this.chartOptions
    });
  }

  private showAlert(message: string) {
    this.alertCtrl.create({ header: 'Alert', message, buttons: ['Okay'] })
      .then(alertEl => alertEl.present());
  }

}
