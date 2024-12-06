(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reports-area-report-area-report-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/reports/area-report/area-report.page.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/reports/area-report/area-report.page.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Area Report</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content>\r\n  <div class=\"main-container no-padding\">\r\n    <div class=\"verticle-tab-container\">\r\n      <div class=\"tabs-buttons\">\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('sales-report')\">Sales</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('category-report')\">Category</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('products-report')\">Products</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('brands-report')\">Brands</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('services-report')\">Services</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('users-report')\">Users</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('tax-report')\">Tax</ion-button>\r\n        <ion-button expand=\"full\" class=\"btn-1 tab-btn\" (click)=\"goToPage('area-report')\">Area</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('vendor-report')\" *ngIf=\"vendorReport\">Vendors</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('coupon-report')\">Coupons</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('referral-report')\">Referral</ion-button>\r\n        </div>\r\n      <div class=\"tabs-content\" >\r\n        <ion-grid>\r\n          <ion-row>\r\n            <ion-col size=\"6\">\r\n              <ion-item>\r\n                <ion-label>Start Date</ion-label>\r\n                <ion-datetime displayFormat=\"DD MM YYYY\" [max]=\"endDate\" placeholder=\"Select Date\" [(ngModel)]=\"startDate\" (ionChange)=\"setStartDate()\"></ion-datetime>\r\n              </ion-item>\r\n            </ion-col>\r\n            <ion-col size=\"6\">\r\n              <ion-item>\r\n                <ion-label>End Date</ion-label>\r\n                <ion-datetime displayFormat=\"DD MM YYYY\" [min]=\"startDate\" placeholder=\"Select Date\" [(ngModel)]=\"endDate\" (ionChange)=\"setEndDate()\"></ion-datetime>\r\n              </ion-item>\r\n            </ion-col>\r\n          </ion-row>\r\n          <ion-row>\r\n            <ion-col style=\"text-align: center\">\r\n              <ion-button style=\"margin-right: 10px\" (click)=\"getReport()\">Generate Report</ion-button>\r\n              <ion-button color=\"tertiary\" (click)=\"exportReport()\">Export Generated Report</ion-button>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n        <ng-container>\r\n\r\n        <div class=\"report-table\">\r\n          <table>\r\n            <thead>\r\n              <tr>\r\n                <th class=\"name\">State</th>\r\n                <th class=\"items\">City</th>\r\n                <th class=\"items\">Pincode</th>\r\n                <th class=\"items\">Orders</th>\r\n                <th class=\"items\">Sales</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let areaReport of areaReports; let i=index\">\r\n                <td>{{areaReport.state}}</td>\r\n                <td>{{areaReport.city}}</td>\r\n                <td>{{areaReport.pincode}}</td>\r\n                <td>{{areaReport.orders}}</td>\r\n                <td>{{areaReport.sales | currency: currencyCode:true}}</td>\r\n              </tr>\r\n              \r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </ng-container>\r\n      <ng-template #noData>\r\n        <p>No Data Avilable</p>\r\n      </ng-template>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/reports/area-report/area-report.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/reports/area-report/area-report.module.ts ***!
  \***********************************************************/
/*! exports provided: AreaReportPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AreaReportPageModule", function() { return AreaReportPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _area_report_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./area-report.page */ "./src/app/reports/area-report/area-report.page.ts");







const routes = [
    {
        path: '',
        component: _area_report_page__WEBPACK_IMPORTED_MODULE_6__["AreaReportPage"]
    }
];
let AreaReportPageModule = class AreaReportPageModule {
};
AreaReportPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_area_report_page__WEBPACK_IMPORTED_MODULE_6__["AreaReportPage"]]
    })
], AreaReportPageModule);



/***/ }),

/***/ "./src/app/reports/area-report/area-report.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/reports/area-report/area-report.page.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".report-table table tbody td {\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVwb3J0cy9hcmVhLXJlcG9ydC9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxccmVwb3J0c1xcYXJlYS1yZXBvcnRcXGFyZWEtcmVwb3J0LnBhZ2Uuc2NzcyIsInNyYy9hcHAvcmVwb3J0cy9hcmVhLXJlcG9ydC9hcmVhLXJlcG9ydC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9yZXBvcnRzL2FyZWEtcmVwb3J0L2FyZWEtcmVwb3J0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yZXBvcnQtdGFibGUgdGFibGUgdGJvZHkgdGQge1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG59IiwiLnJlcG9ydC10YWJsZSB0YWJsZSB0Ym9keSB0ZCB7XG4gIGNvbG9yOiBibGFjaztcbn0iXX0= */"

/***/ }),

/***/ "./src/app/reports/area-report/area-report.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/reports/area-report/area-report.page.ts ***!
  \*********************************************************/
/*! exports provided: AreaReportPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AreaReportPage", function() { return AreaReportPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);









let AreaReportPage = class AreaReportPage {
    // tslint:disable-next-line: max-line-length
    constructor(router, events, loadingController, alertCtrl, storage, configService, sharedService) {
        this.router = router;
        this.events = events;
        this.loadingController = loadingController;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.configService = configService;
        this.sharedService = sharedService;
        this.areaReports = [];
        this.vendorReport = false;
    }
    goToPage(page) {
        this.router.navigate([page]);
    }
    ngOnInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.vendorReport = yield this.sharedService.getMultiVendorStatus();
            this.currencyCode = this.configService.environment.currencyCode;
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
        let startYrMonth = moment__WEBPACK_IMPORTED_MODULE_8__(startingDate).format('YYYY-MM');
        let endYrMonth = moment__WEBPACK_IMPORTED_MODULE_8__(endingDate).format('YYYY-MM');
        if (startYrMonth === endYrMonth) {
            this.events.publish('reports:getReport', startingDate, endingDate, 'area');
        }
        else {
            if (differenceInDays <= 30) {
                this.events.publish('reports:getReport', startingDate, endingDate, 'area');
            }
            else {
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
        const csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_4__["ExportToCsv"](options);
        csvExporter.generateCsv(data);
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
AreaReportPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"] }
];
AreaReportPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-area-report',
        template: __webpack_require__(/*! raw-loader!./area-report.page.html */ "./node_modules/raw-loader/index.js!./src/app/reports/area-report/area-report.page.html"),
        styles: [__webpack_require__(/*! ./area-report.page.scss */ "./src/app/reports/area-report/area-report.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"], src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"], src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"]])
], AreaReportPage);



/***/ })

}]);
//# sourceMappingURL=reports-area-report-area-report-module-es2015.js.map