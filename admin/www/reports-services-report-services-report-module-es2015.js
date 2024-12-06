(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reports-services-report-services-report-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/reports/services-report/services-report.page.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/reports/services-report/services-report.page.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Services Report</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content>\r\n  <div class=\"main-container no-padding\">\r\n    <div class=\"verticle-tab-container\">\r\n      <div class=\"tabs-buttons\">\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('sales-report')\">Sales</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('category-report')\">Category</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('products-report')\">Products</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('brands-report')\">Brands</ion-button>\r\n        <ion-button expand=\"full\" class=\"btn-1 tab-btn\" (click)=\"goToPage('services-report')\">Services</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('users-report')\">Users</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('tax-report')\">Tax</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('area-report')\">Area</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('vendor-report')\" *ngIf=\"vendorReport\">Vendors</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('coupon-report')\">Coupons</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('referral-report')\">Referral</ion-button>\r\n        </div>\r\n      <div class=\"tabs-content\" >\r\n        <ion-grid>\r\n          <ion-row>\r\n            <ion-col size=\"6\">\r\n              <ion-item>\r\n                <ion-label>Start Date</ion-label>\r\n                <ion-datetime displayFormat=\"DD MM YYYY\" [max]=\"endDate\" placeholder=\"Select Date\" [(ngModel)]=\"startDate\" (ionChange)=\"setStartDate()\"></ion-datetime>\r\n              </ion-item>\r\n            </ion-col>\r\n            <ion-col size=\"6\">\r\n              <ion-item>\r\n                <ion-label>End Date</ion-label>\r\n                <ion-datetime displayFormat=\"DD MM YYYY\" [min]=\"startDate\" placeholder=\"Select Date\" [(ngModel)]=\"endDate\" (ionChange)=\"setEndDate()\"></ion-datetime>\r\n              </ion-item>\r\n            </ion-col>\r\n          </ion-row>\r\n          <ion-row>\r\n            <ion-col style=\"text-align: center\">\r\n              <ion-button style=\"margin-right: 10px\" (click)=\"getReport()\">Generate Report</ion-button>\r\n              <ion-button color=\"tertiary\" (click)=\"exportReport()\">Export Generated Report</ion-button>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n        <ng-container>\r\n        \r\n        <div class=\"report-chart\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"6\">\r\n                <div class=\"report-pie-chart\">\r\n                  <h5>Completed</h5>\r\n                <canvas #salesChart></canvas>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"6\">\r\n                <div class=\"report-pie-chart\">\r\n                  <h5>Requests</h5>\r\n                <canvas #ordersChart></canvas>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n\r\n        <div class=\"report-table\">\r\n          <table>\r\n            <thead>\r\n              <tr>\r\n                <th class=\"name\">Service</th>\r\n                <th class=\"sales\">Completed</th>\r\n                <th class=\"items\">Requests</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let serviceReport of serviceReports; let i=index\">\r\n                <td>{{serviceReport.serviceName}}</td>\r\n                <td>{{serviceReport.completed}}</td>\r\n                <td>{{serviceReport.requests}}</td>\r\n              </tr>\r\n              \r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </ng-container>\r\n      <ng-template #noData>\r\n        <p>No Data Avilable</p>\r\n      </ng-template>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/reports/services-report/services-report.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/reports/services-report/services-report.module.ts ***!
  \*******************************************************************/
/*! exports provided: ServicesReportPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicesReportPageModule", function() { return ServicesReportPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_report_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services-report.page */ "./src/app/reports/services-report/services-report.page.ts");







const routes = [
    {
        path: '',
        component: _services_report_page__WEBPACK_IMPORTED_MODULE_6__["ServicesReportPage"]
    }
];
let ServicesReportPageModule = class ServicesReportPageModule {
};
ServicesReportPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_services_report_page__WEBPACK_IMPORTED_MODULE_6__["ServicesReportPage"]]
    })
], ServicesReportPageModule);



/***/ }),

/***/ "./src/app/reports/services-report/services-report.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/reports/services-report/services-report.page.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".report-table table tbody td {\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVwb3J0cy9zZXJ2aWNlcy1yZXBvcnQvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXHJlcG9ydHNcXHNlcnZpY2VzLXJlcG9ydFxcc2VydmljZXMtcmVwb3J0LnBhZ2Uuc2NzcyIsInNyYy9hcHAvcmVwb3J0cy9zZXJ2aWNlcy1yZXBvcnQvc2VydmljZXMtcmVwb3J0LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3JlcG9ydHMvc2VydmljZXMtcmVwb3J0L3NlcnZpY2VzLXJlcG9ydC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucmVwb3J0LXRhYmxlIHRhYmxlIHRib2R5IHRkIHtcclxuICAgIGNvbG9yOiBibGFjaztcclxufSIsIi5yZXBvcnQtdGFibGUgdGFibGUgdGJvZHkgdGQge1xuICBjb2xvcjogYmxhY2s7XG59Il19 */"

/***/ }),

/***/ "./src/app/reports/services-report/services-report.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/reports/services-report/services-report.page.ts ***!
  \*****************************************************************/
/*! exports provided: ServicesReportPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicesReportPage", function() { return ServicesReportPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/Chart.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(chart_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_services_data_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/data/data.service */ "./src/app/services/data/data.service.ts");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_9__);










let ServicesReportPage = class ServicesReportPage {
    // tslint:disable-next-line: max-line-length
    constructor(router, dataService, events, loadingController, alertCtrl, storage, sharedService) {
        this.router = router;
        this.dataService = dataService;
        this.events = events;
        this.loadingController = loadingController;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.sharedService = sharedService;
        this.chartOptions = {
            legend: {
                display: false
            },
            tooltips: {
                enabled: true
            }
        };
        this.chartColors = [];
        this.productNames = [];
        this.serviceReports = [];
        this.vendorReport = false;
    }
    goToPage(page) {
        this.router.navigate([page]);
    }
    ngOnInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.vendorReport = yield this.sharedService.getMultiVendorStatus();
            this.colorsData = this.dataService.colors;
        });
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const dateObj = yield this.sharedService.getReportDate();
            this.startDate = dateObj.startDate;
            this.endDate = dateObj.endDate;
            this.initializeSubscriptions();
        });
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
        let startYrMonth = moment__WEBPACK_IMPORTED_MODULE_9__(startingDate).format('YYYY-MM');
        let endYrMonth = moment__WEBPACK_IMPORTED_MODULE_9__(endingDate).format('YYYY-MM');
        if (startYrMonth === endYrMonth) {
            this.events.publish('reports:getReport', startingDate, endingDate, 'services');
        }
        else {
            if (differenceInDays <= 30) {
                this.events.publish('reports:getReport', startingDate, endingDate, 'services');
            }
            else {
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
        const csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_6__["ExportToCsv"](options);
        csvExporter.generateCsv(data);
    }
    setColors() {
        for (let i = 0; i < this.serviceReports.length; i++) {
            console.log();
            this.chartColors.push(this.colorsData[i]);
        }
    }
    setNames() {
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
        this.salesPieChart = new chart_js__WEBPACK_IMPORTED_MODULE_3__["Chart"](this.salesChart.nativeElement, {
            type: 'doughnut',
            data: {
                labels: this.productNames,
                datasets: [{
                        backgroundColor: this.chartColors,
                        data: salesData,
                        borderWidth: 0
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
        this.ordersPieChart = new chart_js__WEBPACK_IMPORTED_MODULE_3__["Chart"](this.ordersChart.nativeElement, {
            type: 'doughnut',
            data: {
                labels: this.productNames,
                datasets: [{
                        backgroundColor: this.chartColors,
                        data: ordersData,
                        borderWidth: 0
                    }]
            },
            options: this.chartOptions
        });
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Please wait...',
                duration: 4000
            });
            yield this.loading.present();
        });
    }
    showAlert(message) {
        this.alertCtrl.create({ header: 'Alert', message, buttons: ['Okay'] })
            .then(alertEl => alertEl.present());
    }
};
ServicesReportPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: src_app_services_data_data_service__WEBPACK_IMPORTED_MODULE_5__["DataService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_8__["SharedService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('salesChart', null),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], ServicesReportPage.prototype, "salesChart", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('ordersChart', null),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], ServicesReportPage.prototype, "ordersChart", void 0);
ServicesReportPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-services-report',
        template: __webpack_require__(/*! raw-loader!./services-report.page.html */ "./node_modules/raw-loader/index.js!./src/app/reports/services-report/services-report.page.html"),
        styles: [__webpack_require__(/*! ./services-report.page.scss */ "./src/app/reports/services-report/services-report.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], src_app_services_data_data_service__WEBPACK_IMPORTED_MODULE_5__["DataService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"], src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_8__["SharedService"]])
], ServicesReportPage);



/***/ })

}]);
//# sourceMappingURL=reports-services-report-services-report-module-es2015.js.map