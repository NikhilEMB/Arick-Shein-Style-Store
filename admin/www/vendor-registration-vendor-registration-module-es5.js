(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor-registration-vendor-registration-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/vendor-registration/vendor-registration.page.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/vendor-registration/vendor-registration.page.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Vendor Registration</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container fixed-height\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <div class=\"flex-label\">\r\n              <ion-label>Auto Approve Vendors</ion-label>\r\n              <ion-toggle [(ngModel)]=\"registrationFields.autoApprove\"></ion-toggle>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Form Title</ion-label>\r\n            <ion-input class=\"form-input\" [(ngModel)]=\"registrationFields.title\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Form Description</ion-label>\r\n            <ion-textarea rows=\"4\" type=\"text\" class=\"form-input\" [(ngModel)]=\"registrationFields.description\">\r\n            </ion-textarea>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div style=\"display: flex;justify-content: center\">\r\n            <ion-button (click)=\"saveSettings()\" [disabled]=\"disableSave()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n              Save Form Settings\r\n            </ion-button>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n      <ion-row *ngIf=\"vendorRequests.length\">\r\n        <ion-col>\r\n          <h4>Requests</h4>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div class=\"m-t-10\">\r\n            <ion-grid class=\"ion-no-padding data-table ion-text-center\">\r\n              <ion-row class=\"ion-text-capitalize\">\r\n                <ion-col>Vendor Name</ion-col>\r\n                <ion-col>Requests</ion-col>\r\n                <ion-col>Status</ion-col>\r\n              </ion-row>\r\n              <ion-row *ngFor=\"let vendor of vendorRequests; let i=index;\">\r\n                <ion-col>\r\n                  {{vendor.name}}\r\n                </ion-col>\r\n                <ion-col>\r\n                  <ion-button (click)=\"viewRequest(i)\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                    View Request\r\n                  </ion-button>\r\n                </ion-col>\r\n                <ion-col>\r\n                  <ng-container *ngIf=\"vendor.approved\"><b class=\"green\">Approved</b></ng-container>\r\n                  <ng-container *ngIf=\"!vendor.approved\">\r\n                    <ion-button (click)=\"approve(vendor.id)\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                      Approve\r\n                    </ion-button>\r\n                  </ng-container>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/vendor-registration/vendor-registration.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/vendor-registration/vendor-registration.module.ts ***!
  \*******************************************************************/
/*! exports provided: VendorRegistrationPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VendorRegistrationPageModule", function() { return VendorRegistrationPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _vendor_registration_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vendor-registration.page */ "./src/app/vendor-registration/vendor-registration.page.ts");







var routes = [
    {
        path: '',
        component: _vendor_registration_page__WEBPACK_IMPORTED_MODULE_6__["VendorRegistrationPage"]
    }
];
var VendorRegistrationPageModule = /** @class */ (function () {
    function VendorRegistrationPageModule() {
    }
    VendorRegistrationPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_vendor_registration_page__WEBPACK_IMPORTED_MODULE_6__["VendorRegistrationPage"]]
        })
    ], VendorRegistrationPageModule);
    return VendorRegistrationPageModule;
}());



/***/ }),

/***/ "./src/app/vendor-registration/vendor-registration.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/vendor-registration/vendor-registration.page.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".green {\n  color: var(--ion-color-success);\n}\n\n.data-table ion-col {\n  border: 1px solid gray;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n\n.data-table ion-row:first-child {\n  background: lightgray;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmVuZG9yLXJlZ2lzdHJhdGlvbi9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcdmVuZG9yLXJlZ2lzdHJhdGlvblxcdmVuZG9yLXJlZ2lzdHJhdGlvbi5wYWdlLnNjc3MiLCJzcmMvYXBwL3ZlbmRvci1yZWdpc3RyYXRpb24vdmVuZG9yLXJlZ2lzdHJhdGlvbi5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSwrQkFBQTtBQ0NKOztBREVJO0VBQ0Esc0JBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0FDQ0o7O0FERUU7RUFDRSxxQkFBQTtBQ0FKIiwiZmlsZSI6InNyYy9hcHAvdmVuZG9yLXJlZ2lzdHJhdGlvbi92ZW5kb3ItcmVnaXN0cmF0aW9uLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ncmVlbntcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbn1cclxuLmRhdGEtdGFibGV7ICBcclxuICAgIGlvbi1jb2x7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xyXG4gICAgcGFkZGluZy10b3A6IDEwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweFxyXG4gIH1cclxuICBcclxuICBpb24tcm93OmZpcnN0LWNoaWxke1xyXG4gICAgYmFja2dyb3VuZDogbGlnaHRncmF5XHJcbiAgfVxyXG59IiwiLmdyZWVuIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbn1cblxuLmRhdGEtdGFibGUgaW9uLWNvbCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbn1cbi5kYXRhLXRhYmxlIGlvbi1yb3c6Zmlyc3QtY2hpbGQge1xuICBiYWNrZ3JvdW5kOiBsaWdodGdyYXk7XG59Il19 */"

/***/ }),

/***/ "./src/app/vendor-registration/vendor-registration.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/vendor-registration/vendor-registration.page.ts ***!
  \*****************************************************************/
/*! exports provided: VendorRegistrationPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VendorRegistrationPage", function() { return VendorRegistrationPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var _services_config_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var _vendor_request_modal_vendor_request_modal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vendor-request-modal/vendor-request-modal.page */ "./src/app/vendor-registration/vendor-request-modal/vendor-request-modal.page.ts");







var VendorRegistrationPage = /** @class */ (function () {
    function VendorRegistrationPage(events, sharedService, modalController, configService, vendorService) {
        this.events = events;
        this.sharedService = sharedService;
        this.modalController = modalController;
        this.configService = configService;
        this.vendorService = vendorService;
        this.registrationFields = {
            autoApprove: false,
            title: '',
            description: ''
        };
        this.vendorRequests = [];
    }
    VendorRegistrationPage.prototype.ngOnInit = function () {
    };
    VendorRegistrationPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.vendorsLimit = this.configService.environment.vendorsLimit;
                this.initializeSubscriptions();
                return [2 /*return*/];
            });
        });
    };
    VendorRegistrationPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    VendorRegistrationPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('vendor:setMultiVendorDetailsSuccess', function () {
            _this.sharedService.loading.dismiss();
            _this.sharedService.presentAlert('Settings saved successfully');
        });
        this.events.subscribe('vendor:publishActiveStatus', function (doc) {
            if (doc.autoApprove && doc.title && doc.description) {
                _this.registrationFields = doc;
            }
            console.log('registrationFields:', _this.registrationFields);
        });
        this.events.subscribe('vendor:getVendorRequestsSuccess', function (docs) {
            _this.vendorRequests = docs;
        });
        this.events.subscribe('vendor:updateVendorRequestSuccess', function () {
            var index = _this.vendorRequests.findIndex(function (request) { return request.id === _this.approvedRequestId; });
            _this.vendorRequests[index].approved = true;
            _this.sharedService.presentAlert('Vendor Successfully Approved');
        });
        this.events.publish('vendor:getActiveStatus');
        this.events.publish('vendor:getVendorRequests');
    };
    VendorRegistrationPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('vendor:setMultiVendorDetailsSuccess');
        this.events.unsubscribe('vendor:getVendorRequestsSuccess');
        this.events.unsubscribe('vendor:publishActiveStatus');
        this.events.unsubscribe('vendor:updateVendorRequestSuccess');
    };
    VendorRegistrationPage.prototype.disableSave = function () {
        if (this.registrationFields.title === '' || this.registrationFields.description === '') {
            return true;
        }
        else {
            return false;
        }
    };
    VendorRegistrationPage.prototype.saveSettings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('vendor:setMultiVendorDetails', this.registrationFields);
                        return [2 /*return*/];
                }
            });
        });
    };
    VendorRegistrationPage.prototype.viewRequest = function (index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _vendor_request_modal_vendor_request_modal_page__WEBPACK_IMPORTED_MODULE_6__["VendorRequestModalPage"],
                            cssClass: 'custom-modal',
                            showBackdrop: true,
                            backdropDismiss: false,
                            componentProps: { vendorDetails: this.vendorRequests[index] }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (res) {
                            console.log('data from modal', res);
                            if (res && res.data) {
                                if (res.data.approved) {
                                    _this.approve(_this.vendorRequests[index].id);
                                }
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VendorRegistrationPage.prototype.approve = function (requestId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var multiVendor;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.vendorService.getActiveStatus('service')];
                    case 1:
                        multiVendor = _a.sent();
                        if (multiVendor.count && multiVendor.count < this.vendorsLimit) {
                            this.approvedRequestId = requestId;
                            this.events.publish('vendor:updateVendorRequest', requestId, { approved: true });
                        }
                        else {
                            this.sharedService.presentAlert('Vendor Limit Reached');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    VendorRegistrationPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"] },
        { type: _services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_5__["VendorService"] }
    ]; };
    VendorRegistrationPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-vendor-registration',
            template: __webpack_require__(/*! raw-loader!./vendor-registration.page.html */ "./node_modules/raw-loader/index.js!./src/app/vendor-registration/vendor-registration.page.html"),
            styles: [__webpack_require__(/*! ./vendor-registration.page.scss */ "./src/app/vendor-registration/vendor-registration.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"],
            _services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_5__["VendorService"]])
    ], VendorRegistrationPage);
    return VendorRegistrationPage;
}());



/***/ })

}]);
//# sourceMappingURL=vendor-registration-vendor-registration-module-es5.js.map