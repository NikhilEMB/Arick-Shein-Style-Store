(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["loyalty-points-settings-loyalty-points-settings-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/loyalty-points-settings/loyalty-points-settings.page.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/loyalty-points-settings/loyalty-points-settings.page.html ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\"\r\n      class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\"\r\n        name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\"\r\n      slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>loyalty-points-settings</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n\r\n\r\n<ion-content style=\"--background: white;\">\r\n  <div style=\"padding: 20px 30px;\">\r\n    <ion-grid>\r\n      <ion-row>\r\n\r\n        <ion-col>\r\n          <div class=\"input-wrap active-toggle\">\r\n            <ion-label>Active</ion-label>\r\n            <ion-toggle [(ngModel)]=\"data.active\"></ion-toggle>\r\n          </div>\r\n        </ion-col>\r\n  \r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Conversion Rate (1 loyalty point is equal to how much RS)</ion-label>\r\n            <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"data.conversionRate\" autocapitalize></ion-input>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Minimum Order Amount</ion-label>\r\n            <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"data.minOrderAmount\" autocapitalize></ion-input>\r\n          </div>\r\n        </ion-col>\r\n  \r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Loyalty Point is what Percentage of Order Amount</ion-label>\r\n            <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"data.percentRate\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n  \r\n        <ion-col size=\"12\">\r\n          <h6>Redeem</h6>\r\n        </ion-col>\r\n  \r\n        <ion-col size=\"6\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Min order amount</ion-label>\r\n            <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"data.redeem.minOrderAmt\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n  \r\n        <ion-col size=\"6\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>How much % of order amount user can redeem loyalty points</ion-label>\r\n            <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"data.redeem.percent\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col size=\"12\">\r\n          <ion-button (click)=\"saveSettings()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n            <i class=\"flaticon-null-20 margin-icon\"></i> Save\r\n          </ion-button>\r\n        </ion-col>\r\n  \r\n      </ion-row>\r\n    </ion-grid>\r\n  \r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/loyalty-points-settings/loyalty-points-settings.module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/loyalty-points-settings/loyalty-points-settings.module.ts ***!
  \***************************************************************************/
/*! exports provided: LoyaltyPointsSettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoyaltyPointsSettingsPageModule", function() { return LoyaltyPointsSettingsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _loyalty_points_settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loyalty-points-settings.page */ "./src/app/loyalty-points-settings/loyalty-points-settings.page.ts");







var routes = [
    {
        path: '',
        component: _loyalty_points_settings_page__WEBPACK_IMPORTED_MODULE_6__["LoyaltyPointsSettingsPage"]
    }
];
var LoyaltyPointsSettingsPageModule = /** @class */ (function () {
    function LoyaltyPointsSettingsPageModule() {
    }
    LoyaltyPointsSettingsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_loyalty_points_settings_page__WEBPACK_IMPORTED_MODULE_6__["LoyaltyPointsSettingsPage"]]
        })
    ], LoyaltyPointsSettingsPageModule);
    return LoyaltyPointsSettingsPageModule;
}());



/***/ }),

/***/ "./src/app/loyalty-points-settings/loyalty-points-settings.page.scss":
/*!***************************************************************************!*\
  !*** ./src/app/loyalty-points-settings/loyalty-points-settings.page.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".active-toggle {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG95YWx0eS1wb2ludHMtc2V0dGluZ3MvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGxveWFsdHktcG9pbnRzLXNldHRpbmdzXFxsb3lhbHR5LXBvaW50cy1zZXR0aW5ncy5wYWdlLnNjc3MiLCJzcmMvYXBwL2xveWFsdHktcG9pbnRzLXNldHRpbmdzL2xveWFsdHktcG9pbnRzLXNldHRpbmdzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2xveWFsdHktcG9pbnRzLXNldHRpbmdzL2xveWFsdHktcG9pbnRzLXNldHRpbmdzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hY3RpdmUtdG9nZ2xle1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn0iLCIuYWN0aXZlLXRvZ2dsZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59Il19 */"

/***/ }),

/***/ "./src/app/loyalty-points-settings/loyalty-points-settings.page.ts":
/*!*************************************************************************!*\
  !*** ./src/app/loyalty-points-settings/loyalty-points-settings.page.ts ***!
  \*************************************************************************/
/*! exports provided: LoyaltyPointsSettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoyaltyPointsSettingsPage", function() { return LoyaltyPointsSettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_services_feature_services_feature_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/services-feature/services-feature.service */ "./src/app/services/services-feature/services-feature.service.ts");




var LoyaltyPointsSettingsPage = /** @class */ (function () {
    function LoyaltyPointsSettingsPage(loadingController, alertController, featureService) {
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.featureService = featureService;
        this.data = {
            active: false,
            pointName: 'loyality points',
            conversionRate: 0,
            minOrderAmount: 0,
            percentRate: 0,
            redeem: {
                minOrderAmt: 0,
                percent: 0,
            }
        };
    }
    LoyaltyPointsSettingsPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLoyaltyPointsDetails()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoyaltyPointsSettingsPage.prototype.getLoyaltyPointsDetails = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.loyaltySubscription = this.featureService.getLoyaltyPointsDetails().subscribe(function (res) {
                            var data = res;
                            console.log('data...', data);
                            if (data) {
                                _this.data.active = data.active,
                                    _this.data.pointName = data.pointName,
                                    _this.data.conversionRate = data.conversionRate,
                                    _this.data.minOrderAmount = data.minOrderAmount,
                                    _this.data.percentRate = data.percentRate,
                                    _this.data.redeem.percent = data.redeem.percent,
                                    _this.data.redeem.minOrderAmt = data.redeem.minOrderAmt;
                            }
                        });
                        this.loading.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoyaltyPointsSettingsPage.prototype.presentAlert = function (desc) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: desc,
                            buttons: ['Ok']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoyaltyPointsSettingsPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
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
    LoyaltyPointsSettingsPage.prototype.saveSettings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var res;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        console.log('data', this.data);
                        return [4 /*yield*/, this.featureService.setLoyaltyPointsDetails(this.data)];
                    case 2:
                        res = _a.sent();
                        if (!res) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.presentAlert('Loyalty settings save successfully!')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.loading.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoyaltyPointsSettingsPage.prototype.ngOnDestroy = function () {
        this.loyaltySubscription.unsubscribe();
    };
    LoyaltyPointsSettingsPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _services_services_feature_services_feature_service__WEBPACK_IMPORTED_MODULE_3__["ServicesFeatureService"] }
    ]; };
    LoyaltyPointsSettingsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-loyalty-points-settings',
            template: __webpack_require__(/*! raw-loader!./loyalty-points-settings.page.html */ "./node_modules/raw-loader/index.js!./src/app/loyalty-points-settings/loyalty-points-settings.page.html"),
            styles: [__webpack_require__(/*! ./loyalty-points-settings.page.scss */ "./src/app/loyalty-points-settings/loyalty-points-settings.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _services_services_feature_services_feature_service__WEBPACK_IMPORTED_MODULE_3__["ServicesFeatureService"]])
    ], LoyaltyPointsSettingsPage);
    return LoyaltyPointsSettingsPage;
}());



/***/ })

}]);
//# sourceMappingURL=loyalty-points-settings-loyalty-points-settings-module-es5.js.map