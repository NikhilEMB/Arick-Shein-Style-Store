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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _coupon_report_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./coupon-report.page */ "./src/app/reports/coupon-report/coupon-report.page.ts");







var routes = [
    {
        path: '',
        component: _coupon_report_page__WEBPACK_IMPORTED_MODULE_6__["CouponReportPage"]
    }
];
var CouponReportPageModule = /** @class */ (function () {
    function CouponReportPageModule() {
    }
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
    return CouponReportPageModule;
}());



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);









var CouponReportPage = /** @class */ (function () {
    // tslint:disable-next-line: max-line-length
    function CouponReportPage(router, configService, events, loadingController, alertCtrl, storage, sharedService) {
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
    CouponReportPage.prototype.goToPage = function (page) {
        this.router.navigate([page]);
    };
    CouponReportPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.sharedService.getMultiVendorStatus()];
                    case 1:
                        _a.vendorReport = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CouponReportPage.prototype.ionViewWillEnter = function () {
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
    CouponReportPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    CouponReportPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('reports:getReportSuccess', function (couponsList) {
            _this.coupons = couponsList;
            //console.log('reports:', couponsList);
            // for (const report of reports) {
            //   if (!this.addIndividualProduct(report)) {
            //       this.coupons.push(report);
            //     }
            // }
            _this.loading.dismiss();
        });
        this.events.subscribe('reports:getReportFailure', function (errMessage) {
            console.log('deatils Failure', errMessage);
        });
        this.getReport();
    };
    CouponReportPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('reports:getReportSuccess');
        this.events.unsubscribe('reports:getReportFailure');
    };
    CouponReportPage.prototype.setStartDate = function () {
        console.log('set called:', this.startDate);
        this.storage.set('reportStartDate', this.startDate);
    };
    CouponReportPage.prototype.setEndDate = function () {
        this.storage.set('reportEndDate', this.endDate);
    };
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
    CouponReportPage.prototype.getReport = function () {
        var startingDate = new Date(this.startDate);
        var endingDate = new Date(this.endDate);
        var diffInMs = Math.abs(endingDate.getTime() - startingDate.getTime());
        var differenceInDays = diffInMs / (1000 * 60 * 60 * 24);
        var startYrMonth = moment__WEBPACK_IMPORTED_MODULE_8__(startingDate).format('YYYY-MM');
        var endYrMonth = moment__WEBPACK_IMPORTED_MODULE_8__(endingDate).format('YYYY-MM');
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
    };
    CouponReportPage.prototype.exportReport = function () {
        var data = [];
        this.coupons.forEach(function (element) {
            var obj = {
                couponName: element.name,
                usage: element.usage,
            };
            data.push(obj);
        });
        var options = {
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
        var csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_4__["ExportToCsv"](options);
        csvExporter.generateCsv(data);
    };
    CouponReportPage.prototype.presentLoading = function () {
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
    CouponReportPage.prototype.showAlert = function (message) {
        this.alertCtrl.create({ header: 'Alert', message: message, buttons: ['Okay'] })
            .then(function (alertEl) { return alertEl.present(); });
    };
    CouponReportPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"] }
    ]; };
    CouponReportPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-coupon-report',
            template: __webpack_require__(/*! raw-loader!./coupon-report.page.html */ "./node_modules/raw-loader/index.js!./src/app/reports/coupon-report/coupon-report.page.html"),
            styles: [__webpack_require__(/*! ./coupon-report.page.scss */ "./src/app/reports/coupon-report/coupon-report.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"], src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"]])
    ], CouponReportPage);
    return CouponReportPage;
}());



/***/ })

}]);
//# sourceMappingURL=reports-coupon-report-coupon-report-module-es5.js.map