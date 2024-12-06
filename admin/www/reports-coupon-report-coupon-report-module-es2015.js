(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reports-coupon-report-coupon-report-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/reports/coupon-report/coupon-report.page.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/reports/coupon-report/coupon-report.page.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Coupon Report</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content>\r\n  <div class=\"main-container no-padding\">\r\n    <div class=\"verticle-tab-container\">\r\n      <div class=\"tabs-buttons\">\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('sales-report')\">Sales</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('category-report')\">Category</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('products-report')\">Products</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('brands-report')\">Brands</ion-button>\r\n        <!-- <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('services-report')\">Services</ion-button> -->\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('users-report')\">Users</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('tax-report')\">Tax</ion-button>\r\n        <!-- <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('area-report')\">Area</ion-button> -->\r\n        <!-- <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('vendor-report')\" *ngIf=\"vendorReport\">Vendors</ion-button> -->\r\n        <ion-button expand=\"full\" class=\"btn-1 tab-btn\" (click)=\"goToPage('coupon-report')\">Coupons</ion-button>\r\n        <!-- <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('referral-report')\">Referral</ion-button> -->\r\n        </div>\r\n      <div class=\"tabs-content\" >\r\n        <ion-grid>\r\n          <ion-row>\r\n            <ion-col size=\"6\">\r\n              <ion-item>\r\n                <ion-label>Start Date</ion-label>\r\n                <ion-datetime displayFormat=\"DD MM YYYY\" [max]=\"endDate\" placeholder=\"Select Date\" [(ngModel)]=\"startDate\" (ionChange)=\"setStartDate()\"></ion-datetime>\r\n              </ion-item>\r\n            </ion-col>\r\n            <ion-col size=\"6\">\r\n              <ion-item>\r\n                <ion-label>End Date</ion-label>\r\n                <ion-datetime displayFormat=\"DD MM YYYY\" [min]=\"startDate\" placeholder=\"Select Date\" [(ngModel)]=\"endDate\" (ionChange)=\"setEndDate()\"></ion-datetime>\r\n              </ion-item>\r\n            </ion-col>\r\n          </ion-row>\r\n          <ion-row>\r\n            <ion-col style=\"text-align: center\">\r\n              <ion-button style=\"margin-right: 10px\" (click)=\"getReport()\">Generate Report</ion-button>\r\n              <ion-button color=\"tertiary\" (click)=\"exportReport()\">Export Generated Report</ion-button>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n        <ng-container>\r\n\r\n        <div class=\"report-table\">\r\n          <table>\r\n            <thead>\r\n              <tr>\r\n                <th class=\"name\">Coupon Name</th>\r\n                <th class=\"sales\">Usage</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let coupon of coupons; let i=index\">\r\n                <td>{{coupon.name}}</td>\r\n                <td>{{coupon.usage}}</td>\r\n              </tr>\r\n              \r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </ng-container>\r\n      <ng-template #noData>\r\n        <p>No Data Avilable</p>\r\n      </ng-template>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/reports/coupon-report/coupon-report.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/reports/coupon-report/coupon-report.module.ts ***!
  \***************************************************************/
/*! exports provided: CouponReportPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CouponReportPageModule", function() { return CouponReportPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _coupon_report_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./coupon-report.page */ "./src/app/reports/coupon-report/coupon-report.page.ts");







const routes = [
    {
        path: '',
        component: _coupon_report_page__WEBPACK_IMPORTED_MODULE_6__["CouponReportPage"]
    }
];
let CouponReportPageModule = class CouponReportPageModule {
};
CouponReportPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_coupon_report_page__WEBPACK_IMPORTED_MODULE_6__["CouponReportPage"]]
    })
], CouponReportPageModule);



/***/ }),

/***/ "./src/app/reports/coupon-report/coupon-report.page.scss":
/*!***************************************************************!*\
  !*** ./src/app/reports/coupon-report/coupon-report.page.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".report-table table tbody td {\n  color: black;\n}\n\n.name {\n  width: 40% !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVwb3J0cy9jb3Vwb24tcmVwb3J0L0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxyZXBvcnRzXFxjb3Vwb24tcmVwb3J0XFxjb3Vwb24tcmVwb3J0LnBhZ2Uuc2NzcyIsInNyYy9hcHAvcmVwb3J0cy9jb3Vwb24tcmVwb3J0L2NvdXBvbi1yZXBvcnQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtBQ0NKOztBRENBO0VBQU8scUJBQUE7QUNHUCIsImZpbGUiOiJzcmMvYXBwL3JlcG9ydHMvY291cG9uLXJlcG9ydC9jb3Vwb24tcmVwb3J0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yZXBvcnQtdGFibGUgdGFibGUgdGJvZHkgdGQge1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG59XHJcbi5uYW1leyB3aWR0aDogNDAlIWltcG9ydGFudDt9IiwiLnJlcG9ydC10YWJsZSB0YWJsZSB0Ym9keSB0ZCB7XG4gIGNvbG9yOiBibGFjaztcbn1cblxuLm5hbWUge1xuICB3aWR0aDogNDAlICFpbXBvcnRhbnQ7XG59Il19 */"

/***/ }),

/***/ "./src/app/reports/coupon-report/coupon-report.page.ts":
/*!*************************************************************!*\
  !*** ./src/app/reports/coupon-report/coupon-report.page.ts ***!
  \*************************************************************/
/*! exports provided: CouponReportPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CouponReportPage", function() { return CouponReportPage; });
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









let CouponReportPage = class CouponReportPage {
    // tslint:disable-next-line: max-line-length
    constructor(router, configService, events, loadingController, alertCtrl, storage, sharedService) {
        this.router = router;
        this.configService = configService;
        this.events = events;
        this.loadingController = loadingController;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.sharedService = sharedService;
        this.coupons = [];
        this.vendorReport = false;
    }
    goToPage(page) {
        this.router.navigate([page]);
    }
    ngOnInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.vendorReport = yield this.sharedService.getMultiVendorStatus();
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
        this.events.subscribe('reports:getReportSuccess', (couponsList) => {
            this.coupons = couponsList;
            //console.log('reports:', couponsList);
            // for (const report of reports) {
            //   if (!this.addIndividualProduct(report)) {
            //       this.coupons.push(report);
            //     }
            // }
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
        console.log('set called:', this.startDate);
        this.storage.set('reportStartDate', this.startDate);
    }
    setEndDate() {
        this.storage.set('reportEndDate', this.endDate);
    }
    // addIndividualProduct(product) {
    //   if (this.coupons.length > 0) {
    //       for (let i = 0; i < this.coupons.length; i++) {
    //         if (this.coupons[i].productId === product.productId) {
    //             this.coupons[i].sales += product.sales;
    //             this.coupons[i].items += product.items;
    //             return true;
    //         }
    //       }
    //   }
    //   return false;
    // }
    getReport() {
        let startingDate = new Date(this.startDate);
        let endingDate = new Date(this.endDate);
        const diffInMs = Math.abs(endingDate.getTime() - startingDate.getTime());
        const differenceInDays = diffInMs / (1000 * 60 * 60 * 24);
        let startYrMonth = moment__WEBPACK_IMPORTED_MODULE_8__(startingDate).format('YYYY-MM');
        let endYrMonth = moment__WEBPACK_IMPORTED_MODULE_8__(endingDate).format('YYYY-MM');
        if (startYrMonth === endYrMonth) {
            this.events.publish('reports:getReport', startingDate, endingDate, 'coupons');
        }
        else {
            if (differenceInDays <= 30) {
                this.events.publish('reports:getReport', startingDate, endingDate, 'coupons');
            }
            else {
                this.showAlert('End date cannot be more than 1 month of start Date');
            }
        }
    }
    exportReport() {
        var data = [];
        this.coupons.forEach((element) => {
            let obj = {
                couponName: element.name,
                usage: element.usage,
            };
            data.push(obj);
        });
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'Coupon Report',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: false,
            headers: ['coupon Name', 'Usage']
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
CouponReportPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"] }
];
CouponReportPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-coupon-report',
        template: __webpack_require__(/*! raw-loader!./coupon-report.page.html */ "./node_modules/raw-loader/index.js!./src/app/reports/coupon-report/coupon-report.page.html"),
        styles: [__webpack_require__(/*! ./coupon-report.page.scss */ "./src/app/reports/coupon-report/coupon-report.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"], src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"]])
], CouponReportPage);



/***/ })

}]);
//# sourceMappingURL=reports-coupon-report-coupon-report-module-es2015.js.map