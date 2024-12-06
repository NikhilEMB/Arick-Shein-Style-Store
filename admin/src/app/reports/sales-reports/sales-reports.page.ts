import { Component, OnInit, ViewChild  } from '@angular/core';
import { Chart } from 'chart.js';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-sales-reports',
  templateUrl: './sales-reports.page.html',
  styleUrls: ['./sales-reports.page.scss'],
})
export class SalesReportsPage implements OnInit {
  @ViewChild('orderChart', null) barChart;
  @ViewChild('salesChart', null) salesChart;

  bars: any;
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
  constructor(private router: Router,) { }

  ngOnInit() {
  }

  goToPage(page: string) {
    this.router.navigate([page]);
  }
  ionViewDidEnter() {
    this.createOrdersChart();
    this.createSalesChart();
  }



  createOrdersChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Orders',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: this.chartOptions
    });
  }

  createSalesChart() {
    this.bars = new Chart(this.salesChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Sales',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: '#4b526d', // array should have same number of elements as number of dataset
          borderColor: '#373f5d',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: this.chartOptions
    });
  }
}
