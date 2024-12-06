(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-coupon-codes-coupon-codes-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/coupon-codes/coupon-codes.page.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/coupon-codes/coupon-codes.page.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"addNewCouponCode()\">\r\n      <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n      Add new Coupon\r\n    </ion-button>\r\n    <ion-button fill=\"solid\" color=\"secondary\">\r\n      <span class=\"icon\" slot=\"start\">\r\n        <i class=\"flaticon-null\" slot=\"start\"></i>\r\n        <span class=\"count\">5</span>\r\n      </span>\r\n    </ion-button>\r\n    <ion-button fill=\"solid\" color=\"secondary\">\r\n      <span class=\"icon\" slot=\"start\">\r\n        <i class=\"flaticon-shopping-bag\" slot=\"start\"></i>\r\n        <span class=\"count\">2</span>\r\n      </span>\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n\r\n  <div class=\"no-data ion-text-center\" *ngIf=\"noCouponCodes; else showCouponCodes\">\r\n    <img src=\"assets/img/no-product.png\" alt=\"\">\r\n    <h6>No Coupon Codes</h6>\r\n  </div>\r\n  <ng-template #showCouponCodes>\r\n     <!-- heading -->\r\n    <div class=\"list-header\" >\r\n      <ion-grid class=\"ion-no-padding\">\r\n        <ion-row>\r\n          <ion-col>\r\n          <div class=\"input-wrap\">\r\n            <div class=\"flex-label\">\r\n              <div>Show All Coupons To Users</div>&nbsp;&nbsp;\r\n              <div class=\"toggle-btn\">\r\n                <label class=\"switch\">\r\n                  <input type=\"checkbox\" (click)=\"setShowAllCoupons()\" [checked]=\"showAllCoupons\">\r\n                  <span class=\"slider round\"></span>\r\n                </label>\r\n              </div>\r\n            </div>\r\n            <br>\r\n            <ion-text color=\"danger\" style=\"text-transform: none;\">When OFF, the customers will not see any coupon but they can use the coupons by entering the coupon code manually.</ion-text>\r\n          </div>\r\n          </ion-col>\r\n        </ion-row>\r\n        <ion-row >\r\n          <ion-col size=\"3\">\r\n            <p >Coupon Code</p>\r\n          </ion-col>\r\n          <ion-col size=\"3\">\r\n            <p>Qty</p>\r\n          </ion-col>\r\n          <ion-col size=\"3\">\r\n            <p>Discount</p>\r\n          </ion-col>\r\n          <ion-col size=\"3\">\r\n            <p>Action</p>\r\n          </ion-col>\r\n          \r\n        </ion-row>\r\n      </ion-grid>\r\n      </div>\r\n      <!-- heading -->\r\n      <!-- coupon  list -->\r\n      <div class=\"list-container\">\r\n    <ion-list class=\"ion-no-padding row-border\" *ngIf=\"couponCodes.length; else loadingCouponCodes\">\r\n  \r\n          <ion-item class=\"ion-no-padding\"  *ngFor=\"let code of couponCodes; let i = index\">\r\n            <ion-grid class=\"row-background ion-no-padding ion-align-items-center\">\r\n              <ion-row class=\"ion-align-items-center\">\r\n                <ion-col size=\"3\" class=\"ion-text-center\">\r\n                  <p class=\"ion-text-capitalize\">{{code.name}}</p>\r\n                </ion-col>\r\n                <ion-col size=\"3\" >\r\n                  <p class=\"ion-text-capitalize\">{{code.usage}}/{{code.qty}}</p>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <p class=\"ion-text-capitalize\" *ngIf=\"code.type === 'percentage'\">{{code.amount}}%</p>\r\n                  <p class=\"ion-text-capitalize\" *ngIf=\"code.type === 'flat'\">{{code.amount | currency: 'INR':true:'0.0'}}</p>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"editCouponCode(code)\">\r\n                    <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\"></i>\r\n                  </ion-button>\r\n                  <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"presentAlertConfirm(code.id)\">\r\n                    <i class=\"flaticon-null-21\" slot=\"icon-only\"></i>\r\n                  </ion-button>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </ion-item>\r\n       \r\n    </ion-list>\r\n    <ng-template #loadingCouponCodes>\r\n      <ion-grid class=\"row-border ion-no-padding\" *ngIf=\"!couponCodes.length\">\r\n        <ion-row class=\"row-background\" *ngFor=\"let x of [1,2,3,4,5,6,7,8,9,10]\">\r\n          <ion-col size=\"5\">\r\n            <h3>\r\n              <ion-skeleton-text animated style=\"width: 90%;margin: auto;\"></ion-skeleton-text>\r\n            </h3>\r\n          </ion-col>\r\n          <ion-col size=\"4\">\r\n            <h3>\r\n              <ion-skeleton-text animated style=\"width: 60%;margin: auto;\"></ion-skeleton-text>\r\n            </h3>\r\n          </ion-col>\r\n          <ion-col size=\"3\">\r\n            <h3>\r\n              <ion-skeleton-text animated style=\"width: 60%;margin: auto;\"></ion-skeleton-text>\r\n            </h3>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </ng-template>\r\n    </div>\r\n     <!-- coupon  list -->\r\n  </ng-template>\r\n</div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/coupon-codes/coupon-codes.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/admin/coupon-codes/coupon-codes.module.ts ***!
  \***********************************************************/
/*! exports provided: CouponCodesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CouponCodesPageModule", function() { return CouponCodesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _coupon_codes_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./coupon-codes.page */ "./src/app/admin/coupon-codes/coupon-codes.page.ts");







var routes = [
    {
        path: '',
        component: _coupon_codes_page__WEBPACK_IMPORTED_MODULE_6__["CouponCodesPage"]
    }
];
var CouponCodesPageModule = /** @class */ (function () {
    function CouponCodesPageModule() {
    }
    CouponCodesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_coupon_codes_page__WEBPACK_IMPORTED_MODULE_6__["CouponCodesPage"]]
        })
    ], CouponCodesPageModule);
    return CouponCodesPageModule;
}());



/***/ }),

/***/ "./src/app/admin/coupon-codes/coupon-codes.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/admin/coupon-codes/coupon-codes.page.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2NvdXBvbi1jb2Rlcy9jb3Vwb24tY29kZXMucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/admin/coupon-codes/coupon-codes.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/admin/coupon-codes/coupon-codes.page.ts ***!
  \*********************************************************/
/*! exports provided: CouponCodesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CouponCodesPage", function() { return CouponCodesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_coupon_codes_coupon_codes_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/coupon-codes/coupon-codes.service */ "./src/app/services/coupon-codes/coupon-codes.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");






var CouponCodesPage = /** @class */ (function () {
    function CouponCodesPage(events, router, loadingController, sharedService, alertController, couponCodesService) {
        this.events = events;
        this.router = router;
        this.loadingController = loadingController;
        this.sharedService = sharedService;
        this.alertController = alertController;
        this.couponCodesService = couponCodesService;
        this.couponCodes = [];
        this.noCouponCodes = false;
        this.showAllCoupons = true;
    }
    CouponCodesPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var couponDetails;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.initializeSubscriptions();
                        this.events.publish('coupon-codes:getAllCouponCodes');
                        return [4 /*yield*/, this.couponCodesService.getCouponDetails()];
                    case 1:
                        couponDetails = _a.sent();
                        if (couponDetails) {
                            this.showAllCoupons = couponDetails.showAllCoupons;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CouponCodesPage.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    CouponCodesPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('coupon-codes:publishAllCouponCodes', function (codes) {
            _this.couponCodes = codes;
            _this.noCouponCodes = false;
        });
        this.events.subscribe('coupon-codes:noCouponCodes', function () {
            _this.noCouponCodes = true;
        });
        this.events.subscribe('coupon-codes:deleteCouponCodeSuccess', function () {
            _this.loading.dismiss();
            _this.presentAlert('Coupon Code deleted successfully!');
        });
    };
    CouponCodesPage.prototype.setShowAllCoupons = function () {
        this.showAllCoupons = !this.showAllCoupons;
        var success = this.couponCodesService.setCouponDetails({ showAllCoupons: this.showAllCoupons });
        if (success) {
            this.sharedService.presentToast('Coupon settings saved successfully');
        }
    };
    CouponCodesPage.prototype.addNewCouponCode = function () {
        // //console.log('add new code');
        this.router.navigate(['add-coupon-codes']);
    };
    CouponCodesPage.prototype.editCouponCode = function (code) {
        // console.log('edit code', code);
        var navigationExtras = {
            state: {
                editCodeData: code
            }
        };
        this.router.navigate(['add-coupon-codes'], navigationExtras);
    };
    CouponCodesPage.prototype.deleteCouponCode = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('coupon-codes:deleteCouponCode', id);
                        return [2 /*return*/];
                }
            });
        });
    };
    CouponCodesPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wiat...',
                                duration: 10000,
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
    CouponCodesPage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: ['OK']
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
    CouponCodesPage.prototype.presentAlertConfirm = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Are you sure you want to delete this coupon code?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        // //console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Okay',
                                    handler: function () {
                                        _this.deleteCouponCode(id);
                                    }
                                }
                            ]
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
    CouponCodesPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('coupon-codes:publishAllCouponCodes');
        this.events.unsubscribe('coupon-codes:noCouponCodes');
        this.events.unsubscribe('coupon-codes:deleteCouponCodeSuccess');
        this.events.publish('coupon-codes:removeSubs');
    };
    CouponCodesPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: src_app_services_coupon_codes_coupon_codes_service__WEBPACK_IMPORTED_MODULE_4__["CouponCodesService"] }
    ]; };
    CouponCodesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-coupon-codes',
            template: __webpack_require__(/*! raw-loader!./coupon-codes.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/coupon-codes/coupon-codes.page.html"),
            styles: [__webpack_require__(/*! ./coupon-codes.page.scss */ "./src/app/admin/coupon-codes/coupon-codes.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"], src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], src_app_services_coupon_codes_coupon_codes_service__WEBPACK_IMPORTED_MODULE_4__["CouponCodesService"]])
    ], CouponCodesPage);
    return CouponCodesPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-coupon-codes-coupon-codes-module-es5.js.map