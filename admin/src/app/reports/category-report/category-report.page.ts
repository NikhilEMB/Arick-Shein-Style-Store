import { Component, OnInit, ViewChild  } from '@angular/core';
import { Events, LoadingController, AlertController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { ExportToCsv } from 'export-to-csv';
import { Storage } from '@ionic/storage';
import { ConfigService } from 'src/app/services/config/config.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-category-report',
  templateUrl: './category-report.page.html',
  styleUrls: ['./category-report.page.scss'],
})
export class CategoryReportPage implements OnInit {
  @ViewChild('salesChart', null) salesChart;
  @ViewChild('ordersChart', null) ordersChart;

   // @ViewChild('salesChart') salesChart;
   //@ViewChild('salesChart', null) public salesChart:ElementRef
   //@ViewChild('ordersChart', null) public ordersChart:ElementRef
   //@ViewChild('salesChart', {static: false}) public salesChart: ElementRef;
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

  categoryNames = [];
  endDate;
  startDate;
  categoryReports = [];
  loading;
  currencyCode: any;
  vendorReport = false;
  
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router,  private configService: ConfigService,private dataService: DataService, private events: Events, private loadingController: LoadingController, private alertCtrl: AlertController, private storage: Storage, private sharedService: SharedService) {
  }

  goToPage(page: string) {
    this.router.navigate([page]);
  }

  async ngOnInit() {
    this.vendorReport = await this.sharedService.getMultiVendorStatus();
    this.colorsData = this.dataService.colors;
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
      this.categoryReports = [];
      for (const report of reports) {
        if (!this.addIndividualCategory(report)) {
          this.categoryReports.push(report);
        }
      }
      this.setcategoryNames();
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

  addIndividualCategory(category) {
    if (this.categoryReports.length > 0) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.categoryReports.length; i++) {
          if (this.categoryReports[i].categoryId === category.categoryId) {
              this.categoryReports[i].sales += category.sales;
              this.categoryReports[i].items += category.items;
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
      this.events.publish('reports:getReport', startingDate, endingDate, 'category');
    } else{
      if (differenceInDays <= 30) {
        this.events.publish('reports:getReport', startingDate, endingDate, 'category');
      } else {
        this.showAlert('End date cannot be more than 1 month of start Date');
      }
    }
  }

  exportReport() {
    var data = [];
    this.categoryReports.forEach((element) => {
        let obj = {
          category: element.categoryName,
          sales: element.sales,
          items: element.items,
        };
        data.push(obj);
    });
    const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Category Report',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: false,
        headers: ['Category', 'Sales', 'Items Ordered']
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }

  setColors(){
    for (let i = 0; i < this.categoryReports.length; i++) {
      this.chartColors.push(this.colorsData[i]);
    }
  }

  setcategoryNames(){
    this.categoryReports.forEach((value) => {
      this.categoryNames.push(value.categoryName);
    });
  }

  createSalesChart() {
    let salesData = [];
    this.categoryReports.forEach((value) => {
      salesData.push(value.sales);
    });

    if (this.salesPieChart) {
      this.salesPieChart.destroy();
    }

    this.salesPieChart = new Chart(this.salesChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.categoryNames,
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
    this.categoryReports.forEach((value) => {
      ordersData.push(value.items);
    });

    if (this.ordersPieChart) {
      this.ordersPieChart.destroy();
    }
    
    this.ordersPieChart = new Chart(this.ordersChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.categoryNames,
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
