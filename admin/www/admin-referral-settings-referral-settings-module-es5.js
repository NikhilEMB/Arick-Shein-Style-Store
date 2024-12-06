(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-referral-settings-referral-settings-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/referral-settings/referral-settings.page.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/referral-settings/referral-settings.page.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Refer And Earn</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main\">\r\n    <br><br>\r\n    <div class=\"active\">\r\n      <p>Active</p>\r\n      <div class=\"toggle-btn\">\r\n        <label class=\"switch\">\r\n          <input type=\"checkbox\" (click)=\"referralActiveToggle()\" [checked]=\"settings.active\">\r\n          <span class=\"slider round\"></span>\r\n        </label>\r\n      </div>\r\n    </div>\r\n    <br><br>\r\n    <div class=\"cashback\">\r\n      <p>Cashback for referrer</p>\r\n      <div class=\"cashback-type\">\r\n        <span class=\"flat\">FLAT</span> \r\n        <div class=\"toggle-btn\">\r\n          <label class=\"switch\">\r\n            <input type=\"checkbox\" (click)=\"referrerCashbackTypeToggle()\" [checked]=\"settings.referrerCashbackType === 'percentage'\">\r\n            <span class=\"slider round\"></span>\r\n          </label>\r\n        </div>\r\n        <span class=\"percent\">%</span>\r\n      </div>\r\n      <input placeholder=\"Enter cashback amount\" [(ngModel)]=\"settings.referrerCashback\" type=\"number\" class=\"form-input\" *ngIf=\"settings.referrerCashbackType === 'flat'\"/>\r\n      <input placeholder=\"Enter cashback in percentage\" [(ngModel)]=\"settings.referrerCashbackPercent\" type=\"number\" class=\"form-input\" *ngIf=\"settings.referrerCashbackType === 'percentage'\"/>\r\n      <br><br>\r\n      <p>Cashback for friends who sign up</p>\r\n      <input [(ngModel)]=\"settings.friendCashback\" type=\"number\" class=\"form-input\"/>\r\n      <br><br>\r\n      <p>Number of times cashback to referrer</p>\r\n      <input [(ngModel)]=\"settings.cashbackCount\" type=\"number\" class=\"form-input\"/>\r\n    </div>\r\n    <br>\r\n    <div class=\"page-footer\">\r\n      <ion-row class=\"ion-justify-content-center\">\r\n        <ion-button fill=\"outline\" shape=\"round\" size=\"small\" (click)=\"onClickSave()\">\r\n          Save\r\n        </ion-button>\r\n      </ion-row>\r\n    </div>\r\n  </div>\r\n</ion-content>\r\n  "

/***/ }),

/***/ "./src/app/admin/referral-settings/referral-settings.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/admin/referral-settings/referral-settings.module.ts ***!
  \*********************************************************************/
/*! exports provided: ReferralSettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReferralSettingsPageModule", function() { return ReferralSettingsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _referral_settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./referral-settings.page */ "./src/app/admin/referral-settings/referral-settings.page.ts");







var routes = [
    {
        path: '',
        component: _referral_settings_page__WEBPACK_IMPORTED_MODULE_6__["ReferralSettingsPage"]
    }
];
var ReferralSettingsPageModule = /** @class */ (function () {
    function ReferralSettingsPageModule() {
    }
    ReferralSettingsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_referral_settings_page__WEBPACK_IMPORTED_MODULE_6__["ReferralSettingsPage"]]
        })
    ], ReferralSettingsPageModule);
    return ReferralSettingsPageModule;
}());



/***/ }),

/***/ "./src/app/admin/referral-settings/referral-settings.page.scss":
/*!*********************************************************************!*\
  !*** ./src/app/admin/referral-settings/referral-settings.page.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  padding-left: 50px;\n  padding-right: 50px;\n  padding-bottom: 30px;\n  background: white;\n  text-align: center;\n  width: 60vw;\n  margin: 0% auto;\n}\n\n.active {\n  font-size: large;\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 200px;\n}\n\ninput {\n  margin-top: 10px;\n  width: 200px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  height: 30px;\n  padding: 10px;\n}\n\nion-toggle {\n  margin-top: -10px;\n}\n\n.cashback-type {\n  margin-top: 10px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n\n.cashback-type .flat {\n  margin-right: 10px;\n}\n\n.cashback-type .percent {\n  margin-left: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vcmVmZXJyYWwtc2V0dGluZ3MvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxyZWZlcnJhbC1zZXR0aW5nc1xccmVmZXJyYWwtc2V0dGluZ3MucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9yZWZlcnJhbC1zZXR0aW5ncy9yZWZlcnJhbC1zZXR0aW5ncy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLGdCQUFBO0VBQ0EsMkJBQUE7RUFBQSxvQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxZQUFBO0FDQ0o7O0FERUE7RUFDSSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7QUNDSjs7QURFQTtFQUNJLGlCQUFBO0FDQ0o7O0FER0k7RUFDSSxnQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7QUNBUjs7QURDUTtFQUNJLGtCQUFBO0FDQ1o7O0FEQ1E7RUFDSSxpQkFBQTtBQ0NaIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vcmVmZXJyYWwtc2V0dGluZ3MvcmVmZXJyYWwtc2V0dGluZ3MucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW57XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDUwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiA1MHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDMwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHdpZHRoOiA2MHZ3O1xyXG4gICAgbWFyZ2luOiAwJSBhdXRvXHJcbn1cclxuXHJcbi5hY3RpdmV7XHJcbiAgICBmb250LXNpemU6IGxhcmdlO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICB3aWR0aDogMjAwcHhcclxufVxyXG5cclxuaW5wdXR7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgd2lkdGg6IDIwMHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIGhlaWdodDogMzBweDtcclxuICAgIHBhZGRpbmc6IDEwcHhcclxufVxyXG5cclxuaW9uLXRvZ2dsZXtcclxuICAgIG1hcmdpbi10b3A6IC0xMHB4XHJcbn1cclxuXHJcbi5jYXNoYmFjayB7XHJcbiAgICAmLXR5cGUge1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICAuZmxhdCB7XHJcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnBlcmNlbnQge1xyXG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMTBweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIubWFpbiB7XG4gIHBhZGRpbmctbGVmdDogNTBweDtcbiAgcGFkZGluZy1yaWdodDogNTBweDtcbiAgcGFkZGluZy1ib3R0b206IDMwcHg7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiA2MHZ3O1xuICBtYXJnaW46IDAlIGF1dG87XG59XG5cbi5hY3RpdmUge1xuICBmb250LXNpemU6IGxhcmdlO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogMjAwcHg7XG59XG5cbmlucHV0IHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgd2lkdGg6IDIwMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGhlaWdodDogMzBweDtcbiAgcGFkZGluZzogMTBweDtcbn1cblxuaW9uLXRvZ2dsZSB7XG4gIG1hcmdpbi10b3A6IC0xMHB4O1xufVxuXG4uY2FzaGJhY2stdHlwZSB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuLmNhc2hiYWNrLXR5cGUgLmZsYXQge1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG4uY2FzaGJhY2stdHlwZSAucGVyY2VudCB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/referral-settings/referral-settings.page.ts":
/*!*******************************************************************!*\
  !*** ./src/app/admin/referral-settings/referral-settings.page.ts ***!
  \*******************************************************************/
/*! exports provided: ReferralSettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReferralSettingsPage", function() { return ReferralSettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");






var ReferralSettingsPage = /** @class */ (function () {
    function ReferralSettingsPage(labelService, events, loadingController, alertController, configService, router) {
        this.labelService = labelService;
        this.events = events;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.configService = configService;
        this.router = router;
        this.headerText = '';
        this.settings = {
            active: false,
            referrerCashback: 0,
            friendCashback: 0,
            cashbackCount: 1,
            referrerCashbackType: 'flat',
            referrerCashbackPercent: 0
        };
        this.referralFeature = false;
    }
    ReferralSettingsPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert_1;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.referralFeature = this.configService.environment.referralFeature;
                        if (!(this.referralFeature == false)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                message: "Sorry, this feature is not available. Please upgrade your plan for access",
                                buttons: ['ok']
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        alert_1.onWillDismiss().then(function () {
                            _this.router.navigate(['admin-home']);
                        });
                        return [4 /*yield*/, alert_1.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReferralSettingsPage.prototype.ngOnInit = function () {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.REFERRAL_SETTINGS_LABELS = this.labelService.labels['REFERRAL_SETTINGS'];
        this.headerText = this.REFERRAL_SETTINGS_LABELS['header_text'];
        this.initializeSubscriptions();
        this.events.publish('referral:getReferralSettings');
    };
    ReferralSettingsPage.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    ReferralSettingsPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('referral:publishReferralSettings', function (data) {
            console.log("running");
            if (!_this.isEmptyObj(data)) {
                _this.settings = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _this.settings, data);
                console.log('settings', _this.settings);
            }
        });
        this.events.subscribe('referral:saveSettingsSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert(_this.REFERRAL_SETTINGS_LABELS['save_settings_msg']);
        });
    };
    ReferralSettingsPage.prototype.isEmptyObj = function (object) {
        for (var key in object) {
            if (object.hasOwnProperty(key))
                return false;
        }
        return true;
    };
    ReferralSettingsPage.prototype.onClickSave = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.settings.friendCashback || !this.settings.referrerCashback)) return [3 /*break*/, 1];
                        this.presentAlert(this.REFERRAL_SETTINGS_LABELS['provide_valid_details']);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.presentLoading()];
                    case 2:
                        _a.sent();
                        this.events.publish('referral:saveSettings', this.settings);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReferralSettingsPage.prototype.referralActiveToggle = function () {
        this.settings.active = !this.settings.active;
    };
    ReferralSettingsPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: this.SHARED_LABELS['please_wait'],
                                duration: 5000,
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
    ReferralSettingsPage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: ["" + this.SHARED_LABELS['ok']]
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
    ReferralSettingsPage.prototype.referrerCashbackTypeToggle = function () {
        if (this.settings.referrerCashbackType === 'flat') {
            this.settings.referrerCashbackType = 'percentage';
        }
        else {
            this.settings.referrerCashbackType = 'flat';
        }
    };
    ReferralSettingsPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('referral:publishReferralSettings');
        this.events.unsubscribe('referral:saveSettingsSuccess');
    };
    ReferralSettingsPage.ctorParameters = function () { return [
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__["LabelService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }
    ]; };
    ReferralSettingsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-referral-settings',
            template: __webpack_require__(/*! raw-loader!./referral-settings.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/referral-settings/referral-settings.page.html"),
            styles: [__webpack_require__(/*! ./referral-settings.page.scss */ "./src/app/admin/referral-settings/referral-settings.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__["LabelService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], ReferralSettingsPage);
    return ReferralSettingsPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-referral-settings-referral-settings-module-es5.js.map