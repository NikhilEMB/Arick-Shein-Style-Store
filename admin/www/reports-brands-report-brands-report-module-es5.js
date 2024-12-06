(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reports-brands-report-brands-report-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/reports/brands-report/brands-report.page.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/reports/brands-report/brands-report.page.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Brands Report</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content>\r\n  <div class=\"main-container no-padding\">\r\n    <div class=\"verticle-tab-container\">\r\n      <div class=\"tabs-buttons\">\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('sales-report')\">Sales</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('category-report')\">Category</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('products-report')\">Products</ion-button>\r\n        <ion-button expand=\"full\" class=\"btn-1 tab-btn\" (click)=\"goToPage('brands-report')\">Brands</ion-button>\r\n        <!-- <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('services-report')\">Services</ion-button> -->\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('users-report')\">Users</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('tax-report')\">Tax</ion-button>\r\n        <!-- <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('area-report')\">Area</ion-button> -->\r\n        <!-- <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('vendor-report')\" *ngIf=\"vendorReport\">Vendors</ion-button> -->\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('coupon-report')\">Coupons</ion-button>\r\n        <!-- <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('referral-report')\">Referral</ion-button> -->\r\n        </div>\r\n      <div class=\"tabs-content\" >\r\n        <ion-grid>\r\n          <ion-row>\r\n            <ion-col size=\"6\">\r\n              <ion-item>\r\n                <ion-label>Start Date</ion-label>\r\n                <ion-datetime displayFormat=\" DD MM YYYY\" [max]=\"endDate\" placeholder=\"Select Date\" [(ngModel)]=\"startDate\" (ionChange)=\"setStartDate()\"></ion-datetime>\r\n              </ion-item>\r\n            </ion-col>\r\n            <ion-col size=\"6\">\r\n              <ion-item>\r\n                <ion-label>End Date</ion-label>\r\n                <ion-datetime displayFormat=\"DD MM YYYY\" [min]=\"startDate\" placeholder=\"Select Date\" [(ngModel)]=\"endDate\" (ionChange)=\"setEndDate()\"></ion-datetime>\r\n              </ion-item>\r\n            </ion-col>\r\n          </ion-row>\r\n          <ion-row>\r\n            <ion-col style=\"text-align: center\">\r\n              <ion-button style=\"margin-right: 10px\" (click)=\"getReport()\">Generate Report</ion-button>\r\n              <ion-button color=\"tertiary\" (click)=\"exportReport()\">Export Generated Report</ion-button>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n        <ng-container>\r\n          \r\n        <div class=\"report-chart\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"6\">\r\n                <div class=\"report-pie-chart\">\r\n                  <h5>Sales</h5>\r\n                <canvas #salesChart></canvas>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"6\">\r\n                <div class=\"report-pie-chart\">\r\n                  <h5>Orders</h5>\r\n                <canvas #ordersChart></canvas>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n\r\n        <div class=\"report-table\">\r\n          <table>\r\n            <thead>\r\n              <tr>\r\n                <th class=\"name\">Brand</th>\r\n                <th class=\"sales\">Sales</th>\r\n                <th class=\"items\">No of items Ordered</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <!--  [style.background-color]=\"chartColors[i]\" -->\r\n              <tr *ngFor=\"let brandReport of brandReports; let i=index\">\r\n                <td>{{brandReport.brandName}}</td>\r\n                <td>{{brandReport.sales | currency: currencyCode:true}}</td>\r\n                <td>{{brandReport.items}}</td>\r\n              </tr>\r\n              \r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </ng-container>\r\n      <ng-template #noData>\r\n        <p>No Data Avilable</p>\r\n      </ng-template>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/reports/brands-report/brands-report.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/reports/brands-report/brands-report.module.ts ***!
  \***************************************************************/
/*! exports provided: BrandsReportPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrandsReportPageModule", function() { return BrandsReportPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _brands_report_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./brands-report.page */ "./src/app/reports/brands-report/brands-report.page.ts");







var routes = [
    {
        path: '',
        component: _brands_report_page__WEBPACK_IMPORTED_MODULE_6__["BrandsReportPage"]
    }
];
var BrandsReportPageModule = /** @class */ (function () {
    function BrandsReportPageModule() {
    }
    BrandsReportPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_brands_report_page__WEBPACK_IMPORTED_MODULE_6__["BrandsReportPage"]]
        })
    ], BrandsReportPageModule);
    return BrandsReportPageModule;
}());



/***/ }),

/***/ "./src/app/reports/brands-report/brands-report.page.scss":
/*!***************************************************************!*\
  !*** ./src/app/reports/brands-report/brands-report.page.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".report-table table tbody td {\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVwb3J0cy9icmFuZHMtcmVwb3J0L0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxyZXBvcnRzXFxicmFuZHMtcmVwb3J0XFxicmFuZHMtcmVwb3J0LnBhZ2Uuc2NzcyIsInNyYy9hcHAvcmVwb3J0cy9icmFuZHMtcmVwb3J0L2JyYW5kcy1yZXBvcnQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvcmVwb3J0cy9icmFuZHMtcmVwb3J0L2JyYW5kcy1yZXBvcnQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnJlcG9ydC10YWJsZSB0YWJsZSB0Ym9keSB0ZCB7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbn0iLCIucmVwb3J0LXRhYmxlIHRhYmxlIHRib2R5IHRkIHtcbiAgY29sb3I6IGJsYWNrO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/reports/brands-report/brands-report.page.ts":
/*!*************************************************************!*\
  !*** ./src/app/reports/brands-report/brands-report.page.ts ***!
  \*************************************************************/
/*! exports provided: BrandsReportPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrandsReportPage", function() { return BrandsReportPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/Chart.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(chart_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_data_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/data/data.service */ "./src/app/services/data/data.service.ts");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);











var BrandsReportPage = /** @class */ (function () {
    // tslint:disable-next-line: max-line-length
    function BrandsReportPage(router, configService, dataService, events, loadingController, alertCtrl, storage, sharedService) {
        this.router = router;
        this.configService = configService;
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
        this.brandReports = [];
        this.vendorReport = false;
    }
    BrandsReportPage.prototype.goToPage = function (page) {
        this.router.navigate([page]);
    };
    BrandsReportPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.sharedService.getMultiVendorStatus()];
                    case 1:
                        _a.vendorReport = _b.sent();
                        this.currencyCode = this.configService.environment.currencyCode;
                        this.colorsData = this.dataService.colors;
                        this.setNames();
                        this.setColors();
                        this.createSalesChart();
                        this.createOrdersChart();
                        return [2 /*return*/];
                }
            });
        });
    };
    BrandsReportPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var dateObj;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.getReportDate()];
                    case 1:
                        dateObj = _a.sent();
                        this.startDate = dateObj.startDate;
                        this.endDate = dateObj.endDate;
                        this.initializeSubscriptions();
                        return [2 /*return*/];
                }
            });
        });
    };
    BrandsReportPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    BrandsReportPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('reports:getReportSuccess', function (reports) {
            _this.brandReports = [];
            for (var _i = 0, reports_1 = reports; _i < reports_1.length; _i++) {
                var report = reports_1[_i];
                if (!_this.addIndividualBrand(report)) {
                    _this.brandReports.push(report);
                }
            }
            _this.setNames();
            _this.setColors();
            _this.createSalesChart();
            _this.createOrdersChart();
            _this.loading.dismiss();
        });
        this.events.subscribe('reports:getReportFailure', function (errMessage) {
            console.log('deatils Failure', errMessage);
        });
        this.getReport();
    };
    BrandsReportPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('reports:getReportSuccess');
        this.events.unsubscribe('reports:getReportFailure');
    };
    BrandsReportPage.prototype.setStartDate = function () {
        console.log('set from brands');
        this.storage.set('reportStartDate', this.startDate);
    };
    BrandsReportPage.prototype.setEndDate = function () {
        this.storage.set('reportEndDate', this.endDate);
    };
    BrandsReportPage.prototype.addIndividualBrand = function (brand) {
        if (this.brandReports.length > 0) {
            for (var i = 0; i < this.brandReports.length; i++) {
                if (this.brandReports[i].brandId === brand.brandId) {
                    this.brandReports[i].sales += brand.sales;
                    this.brandReports[i].items += brand.items;
                    return true;
                }
            }
        }
        return false;
    };
    BrandsReportPage.prototype.getReport = function () {
        var startingDate = new Date(this.startDate);
        var endingDate = new Date(this.endDate);
        var diffInMs = Math.abs(endingDate.getTime() - startingDate.getTime());
        var differenceInDays = diffInMs / (1000 * 60 * 60 * 24);
        var startYrMonth = moment__WEBPACK_IMPORTED_MODULE_10__(startingDate).format('YYYY-MM');
        var endYrMonth = moment__WEBPACK_IMPORTED_MODULE_10__(endingDate).format('YYYY-MM');
        if (startYrMonth === endYrMonth) {
            this.events.publish('reports:getReport', startingDate, endingDate, 'brands');
        }
        else {
            if (differenceInDays <= 30) {
                this.events.publish('reports:getReport', startingDate, endingDate, 'brands');
            }
            else {
                this.showAlert('End date cannot be more than 1 month of start Date');
            }
        }
    };
    BrandsReportPage.prototype.exportReport = function () {
        var data = [];
        this.brandReports.forEach(function (element) {
            var obj = {
                brand: element.brandName,
                sales: element.sales,
                items: element.items,
            };
            data.push(obj);
        });
        var options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'Brand Report',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: false,
            headers: ['Brand', 'Sales', 'Items Ordered']
        };
        var csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_6__["ExportToCsv"](options);
        csvExporter.generateCsv(data);
    };
    BrandsReportPage.prototype.setColors = function () {
        for (var i = 0; i < this.brandReports.length; i++) {
            console.log();
            this.chartColors.push(this.colorsData[i]);
        }
    };
    BrandsReportPage.prototype.setNames = function () {
        var _this = this;
        this.brandReports.forEach(function (value) {
            _this.productNames.push(value.brandName);
        });
    };
    BrandsReportPage.prototype.createSalesChart = function () {
        var salesData = [];
        this.brandReports.forEach(function (value) {
            salesData.push(value.sales);
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
    };
    BrandsReportPage.prototype.createOrdersChart = function () {
        var ordersData = [];
        this.brandReports.forEach(function (value) {
            ordersData.push(value.items);
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
    };
    BrandsReportPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please wait...',
                                duration: 4000
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BrandsReportPage.prototype.showAlert = function (message) {
        this.alertCtrl.create({ header: 'Alert', message: message, buttons: ['Okay'] })
            .then(function (alertEl) { return alertEl.present(); });
    };
    BrandsReportPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_8__["ConfigService"] },
        { type: src_app_services_data_data_service__WEBPACK_IMPORTED_MODULE_5__["DataService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_9__["SharedService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('salesChart', null),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], BrandsReportPage.prototype, "salesChart", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('ordersChart', null),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], BrandsReportPage.prototype, "ordersChart", void 0);
    BrandsReportPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-brands-report',
            template: __webpack_require__(/*! raw-loader!./brands-report.page.html */ "./node_modules/raw-loader/index.js!./src/app/reports/brands-report/brands-report.page.html"),
            styles: [__webpack_require__(/*! ./brands-report.page.scss */ "./src/app/reports/brands-report/brands-report.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_8__["ConfigService"], src_app_services_data_data_service__WEBPACK_IMPORTED_MODULE_5__["DataService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"], src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_9__["SharedService"]])
    ], BrandsReportPage);
    return BrandsReportPage;
}());



/***/ })

}]);
//# sourceMappingURL=reports-brands-report-brands-report-module-es5.js.map