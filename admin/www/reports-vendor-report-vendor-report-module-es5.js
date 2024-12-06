(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reports-vendor-report-vendor-report-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/reports/vendor-report/vendor-report.page.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/reports/vendor-report/vendor-report.page.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Vendor Report</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content>\r\n  <div class=\"main-container no-padding\">\r\n    <div class=\"verticle-tab-container\">\r\n      <div class=\"tabs-buttons\" *ngIf=\"userRole!='vendor'\">\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('sales-report')\">Sales\r\n        </ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('category-report')\">Category\r\n        </ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('products-report')\">Products\r\n        </ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('brands-report')\">Brands\r\n        </ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('services-report')\">Services\r\n        </ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('users-report')\">Users\r\n        </ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('tax-report')\">Tax</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('area-report')\">Area\r\n        </ion-button>\r\n        <ion-button expand=\"full\" class=\"btn-1 tab-btn\" (click)=\"goToPage('vendor-report')\">Vendors</ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('coupon-report')\">Coupons\r\n        </ion-button>\r\n        <ion-button expand=\"full\" fill=\"outline\" class=\"btn-1 tab-btn\" (click)=\"goToPage('referral-report')\">Referral\r\n        </ion-button>\r\n      </div>\r\n      <div class=\"tabs-content\" [ngClass]=\"{'width-100': userRole=='vendor'}\">\r\n        <ion-grid>\r\n          <ion-row>\r\n            <ion-col size=\"6\">\r\n              <ion-item>\r\n                <ion-label>Start Date</ion-label>\r\n                <ion-datetime displayFormat=\"DD MM YYYY\" [max]=\"endDate\" placeholder=\"Select Date\"\r\n                  [(ngModel)]=\"startDate\" (ionChange)=\"setStartDate()\"></ion-datetime>\r\n              </ion-item>\r\n            </ion-col>\r\n            <ion-col size=\"6\">\r\n              <ion-item>\r\n                <ion-label>End Date</ion-label>\r\n                <ion-datetime displayFormat=\"DD MM YYYY\" [min]=\"startDate\" placeholder=\"Select Date\"\r\n                  [(ngModel)]=\"endDate\" (ionChange)=\"setEndDate()\"></ion-datetime>\r\n              </ion-item>\r\n            </ion-col>\r\n            <!-- <ion-col size=\"4\" *ngIf=\"userRole != 'vendor'\">\r\n              <ion-item>\r\n                <ion-label>Vendor Name</ion-label>\r\n                <ion-select interface=\"popover\" mode=\"ios\" (ionChange)=\"getVendorReport($event)\">\r\n                  <ion-select-option value=\"{{vendor.id}}\" *ngFor=\"let vendor of vendors\">{{vendor.name}}\r\n                  </ion-select-option>\r\n                </ion-select>\r\n              </ion-item>\r\n            </ion-col> -->\r\n          </ion-row>\r\n          <ion-row>\r\n            <ion-col style=\"text-align: center\">\r\n              <ion-button style=\"margin-right: 10px\" (click)=\"getReport()\">Generate Report</ion-button>\r\n              <ion-button color=\"tertiary\" (click)=\"exportReport()\">Export Generated Report</ion-button>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n\r\n        <ng-container *ngIf=\"userRole == 'vendor'\">\r\n          <ng-container *ngIf=\"reports.length else noData\">\r\n            <div class=\"report-table\">\r\n              <table>\r\n                <thead>\r\n                  <tr>\r\n                    <th class=\"name\">Product</th>\r\n                    <th class=\"sales\">Sales</th>\r\n                    <th class=\"items\">No of items Sold</th>\r\n                    <th class=\"items\">Total Commission</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let report of reports; let i=index\">\r\n                    <ng-container *ngFor=\"let product of report.products\">\r\n                      <tr>\r\n                        <td>{{product.name}}</td>\r\n                        <td>{{product.sales | currency: currencyCode:true}}</td>\r\n                        <td>{{product.quantity}}</td>\r\n                        <td>{{product.commission}}</td>\r\n                      </tr>\r\n                    </ng-container>\r\n                  </tr>\r\n  \r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          </ng-container>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"userRole !='vendor'\">\r\n          <ng-container *ngIf=\"reports.length else noData\">\r\n            <div class=\"report-table\">\r\n              <table>\r\n                <thead>\r\n                  <tr>\r\n                    <th class=\"name\">Vendor</th>\r\n                    <th class=\"sales\">Sales</th>\r\n                    <th class=\"items\">Total Commission</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let report of reports; let i=index\">\r\n                    <td>{{report.name}}</td>\r\n                    <td>{{report.sales | currency: currencyCode:true}}</td>\r\n                    <td>{{report.commission | currency: currencyCode:true}}</td>\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          </ng-container>\r\n        </ng-container>\r\n        <ng-template #noData>\r\n          <p class=\"t-a-c m-t-16\">No Data Available</p>\r\n        </ng-template>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/reports/vendor-report/vendor-report.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/reports/vendor-report/vendor-report.module.ts ***!
  \***************************************************************/
/*! exports provided: VendorReportPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VendorReportPageModule", function() { return VendorReportPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _vendor_report_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vendor-report.page */ "./src/app/reports/vendor-report/vendor-report.page.ts");







var routes = [
    {
        path: '',
        component: _vendor_report_page__WEBPACK_IMPORTED_MODULE_6__["VendorReportPage"]
    }
];
var VendorReportPageModule = /** @class */ (function () {
    function VendorReportPageModule() {
    }
    VendorReportPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_vendor_report_page__WEBPACK_IMPORTED_MODULE_6__["VendorReportPage"]]
        })
    ], VendorReportPageModule);
    return VendorReportPageModule;
}());



/***/ }),

/***/ "./src/app/reports/vendor-report/vendor-report.page.scss":
/*!***************************************************************!*\
  !*** ./src/app/reports/vendor-report/vendor-report.page.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".report-table table tbody td {\n  color: black;\n}\n\n.name {\n  width: 40% !important;\n}\n\n.width-100 {\n  width: 100% !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVwb3J0cy92ZW5kb3ItcmVwb3J0L0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxyZXBvcnRzXFx2ZW5kb3ItcmVwb3J0XFx2ZW5kb3ItcmVwb3J0LnBhZ2Uuc2NzcyIsInNyYy9hcHAvcmVwb3J0cy92ZW5kb3ItcmVwb3J0L3ZlbmRvci1yZXBvcnQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtBQ0NKOztBRENBO0VBQU8scUJBQUE7QUNHUDs7QURGQTtFQUNJLHNCQUFBO0FDS0oiLCJmaWxlIjoic3JjL2FwcC9yZXBvcnRzL3ZlbmRvci1yZXBvcnQvdmVuZG9yLXJlcG9ydC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucmVwb3J0LXRhYmxlIHRhYmxlIHRib2R5IHRkIHtcclxuICAgIGNvbG9yOiBibGFjaztcclxufVxyXG4ubmFtZXsgd2lkdGg6IDQwJSFpbXBvcnRhbnQ7fVxyXG4ud2lkdGgtMTAwe1xyXG4gICAgd2lkdGg6IDEwMCUhaW1wb3J0YW50O1xyXG59IiwiLnJlcG9ydC10YWJsZSB0YWJsZSB0Ym9keSB0ZCB7XG4gIGNvbG9yOiBibGFjaztcbn1cblxuLm5hbWUge1xuICB3aWR0aDogNDAlICFpbXBvcnRhbnQ7XG59XG5cbi53aWR0aC0xMDAge1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/reports/vendor-report/vendor-report.page.ts":
/*!*************************************************************!*\
  !*** ./src/app/reports/vendor-report/vendor-report.page.ts ***!
  \*************************************************************/
/*! exports provided: VendorReportPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VendorReportPage", function() { return VendorReportPage; });
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









var VendorReportPage = /** @class */ (function () {
    // tslint:disable-next-line: max-line-length
    function VendorReportPage(router, configService, events, alertCtrl, storage, sharedService) {
        this.router = router;
        this.configService = configService;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.sharedService = sharedService;
        this.vendors = [];
        this.reports = [];
    }
    VendorReportPage.prototype.goToPage = function (page) {
        this.router.navigate([page]);
    };
    VendorReportPage.prototype.ngOnInit = function () {
        this.currencyCode = this.configService.environment.currencyCode;
    };
    VendorReportPage.prototype.ionViewWillEnter = function () {
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
    VendorReportPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    VendorReportPage.prototype.initializeSubscriptions = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.events.subscribe('user:getUserByRoleSuccess', function (vendorsList) {
                            _this.vendors = vendorsList;
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                        });
                        this.events.subscribe('user:getUserByRoleFailure', function (errMessage) {
                            if (_this.sharedService.loading) {
                                _this.sharedService.loading.dismiss();
                            }
                            console.log('deatils Failure', errMessage);
                        });
                        this.events.subscribe('reports:getReportSuccess', function (reports) {
                            if (_this.sharedService.loading) {
                                _this.sharedService.loading.dismiss();
                            }
                            _this.reports = [];
                            console.log('reports:', reports);
                            if (_this.userRole == 'vendor') {
                                _this.reports = reports.filter(function (report) { return report.id === _this.selectedVendorId; });
                                console.log('reports:', _this.reports);
                                if (_this.loading) {
                                    _this.loading.dismiss();
                                }
                            }
                            else {
                                var _loop_1 = function (report) {
                                    console.log('report.id:', report.id);
                                    var search = function (vendor) { return vendor.id === report.id; };
                                    var vendorIndex = _this.reports.findIndex(search);
                                    console.log('vendorIndex:', vendorIndex);
                                    if (vendorIndex > -1) {
                                        for (var _i = 0, _a = report.products; _i < _a.length; _i++) {
                                            var product = _a[_i];
                                            _this.reports[vendorIndex].commission += product.commission;
                                            _this.reports[vendorIndex].sales += product.sales;
                                        }
                                    }
                                    else {
                                        var sales = 0, commission = 0;
                                        for (var _b = 0, _c = report.products; _b < _c.length; _b++) {
                                            var product = _c[_b];
                                            commission += product.commission;
                                            sales += product.sales;
                                        }
                                        _this.reports.push({
                                            id: report.id,
                                            name: report.name,
                                            sales: sales,
                                            commission: commission,
                                        });
                                    }
                                };
                                for (var _i = 0, reports_1 = reports; _i < reports_1.length; _i++) {
                                    var report = reports_1[_i];
                                    _loop_1(report);
                                }
                            }
                        });
                        this.events.subscribe('reports:getReportFailure', function (errMessage) {
                            console.log('deatils Failure', errMessage);
                        });
                        _a = this;
                        return [4 /*yield*/, this.storage.get('userRole')];
                    case 1:
                        _a.userRole = _c.sent();
                        if (!(this.userRole == 'vendor')) return [3 /*break*/, 3];
                        _b = this;
                        return [4 /*yield*/, this.storage.get('uid')];
                    case 2:
                        _b.userId = _c.sent();
                        this.selectedVendorId = this.userId;
                        return [3 /*break*/, 4];
                    case 3:
                        this.events.publish('user:getUserByRole', 'vendor');
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VendorReportPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('reports:getReportSuccess');
        this.events.unsubscribe('reports:getReportFailure');
        this.events.unsubscribe('user:getUserByRoleSuccess');
        this.events.unsubscribe('user:getUserByRoleFailure');
    };
    VendorReportPage.prototype.setStartDate = function () {
        console.log('set called:', this.startDate);
        this.storage.set('reportStartDate', this.startDate);
    };
    VendorReportPage.prototype.setEndDate = function () {
        this.storage.set('reportEndDate', this.endDate);
    };
    VendorReportPage.prototype.getVendorReport = function (ev) {
        this.selectedVendorId = ev.detail.value;
    };
    VendorReportPage.prototype.getReport = function () {
        this.sharedService.presentLoading();
        var startingDate = new Date(this.startDate);
        var endingDate = new Date(this.endDate);
        var diffInMs = Math.abs(endingDate.getTime() - startingDate.getTime());
        var differenceInDays = diffInMs / (1000 * 60 * 60 * 24);
        var startYrMonth = moment__WEBPACK_IMPORTED_MODULE_8__(startingDate).format('YYYY-MM');
        var endYrMonth = moment__WEBPACK_IMPORTED_MODULE_8__(endingDate).format('YYYY-MM');
        if (startYrMonth === endYrMonth) {
            this.events.publish('reports:getReport', startingDate, endingDate, 'vendors');
        }
        else {
            if (differenceInDays <= 30) {
                this.events.publish('reports:getReport', startingDate, endingDate, 'vendors');
            }
            else {
                this.showAlert('End date cannot be more than 1 month of start Date');
            }
        }
    };
    VendorReportPage.prototype.exportReport = function () {
        var data = [];
        if (this.userRole == 'vendor') {
            this.reports.forEach(function (report) {
                for (var _i = 0, _a = report.products; _i < _a.length; _i++) {
                    var product = _a[_i];
                    var obj = {
                        product: product.name,
                        sales: product.sales,
                        items: product.quantity,
                        commission: product.commission,
                    };
                    data.push(obj);
                }
            });
        }
        else {
            for (var _i = 0, _a = this.reports; _i < _a.length; _i++) {
                var report = _a[_i];
                var obj = {
                    name: report.name,
                    sales: report.sales,
                    commission: report.commission,
                };
                data.push(obj);
            }
        }
        var options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            filename: 'Vendor Report',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: false,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };
        var csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_4__["ExportToCsv"](options);
        csvExporter.generateCsv(data);
    };
    VendorReportPage.prototype.showAlert = function (message) {
        this.alertCtrl.create({ header: 'Alert', message: message, buttons: ['Okay'] })
            .then(function (alertEl) { return alertEl.present(); });
    };
    VendorReportPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"] }
    ]; };
    VendorReportPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-vendor-report',
            template: __webpack_require__(/*! raw-loader!./vendor-report.page.html */ "./node_modules/raw-loader/index.js!./src/app/reports/vendor-report/vendor-report.page.html"),
            styles: [__webpack_require__(/*! ./vendor-report.page.scss */ "./src/app/reports/vendor-report/vendor-report.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"], src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"]])
    ], VendorReportPage);
    return VendorReportPage;
}());



/***/ })

}]);
//# sourceMappingURL=reports-vendor-report-vendor-report-module-es5.js.map