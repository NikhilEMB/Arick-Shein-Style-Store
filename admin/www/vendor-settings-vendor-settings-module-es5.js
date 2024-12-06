(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor-settings-vendor-settings-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/vendor-settings/vendor-settings.page.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/vendor-settings/vendor-settings.page.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Vendor Settings</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <br>\r\n    <ion-grid class=\"t-a-l\">\r\n      <ion-row>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <div class=\"flex-label\">\r\n              <ion-label>Active</ion-label>\r\n              <ion-toggle [(ngModel)]=\"settings.activeByVendor\"></ion-toggle>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n      <!-- Shop Timings -->\r\n      <ion-row>\r\n        <ion-col class=\"ion-no-padding\" style=\"display: flex;\">\r\n          <ion-label>Set Shop Timings</ion-label>&nbsp;&nbsp;\r\n          <div class=\"toggle-btn\">\r\n            <label class=\"switch\">\r\n              <input type=\"checkbox\" (click)=\"shopTimingsToggle()\"\r\n                [checked]=\"settings.shopTime.active\">\r\n              <span class=\"slider round\"></span>\r\n            </label>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n      <br>\r\n      <ion-row>\r\n        <ion-col size=\"6\">\r\n          <div class=\"headings\">\r\n            Start Time\r\n          </div>\r\n          <ion-row class=\"ion-align-items-center\">\r\n            <ion-col size=\"3\">\r\n              <ion-datetime class=\"input-border time-picker\" [disabled]=\"!settings.shopTime.active\" display-format=\"h:mm A\" picker-format=\"h:mm A\" minuteValues=\"0,30\" placeholder=\"Select Start Time\" [(ngModel)]=\"settings.shopTime.start\"></ion-datetime>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-col>\r\n        <ion-col size=\"6\">\r\n          <div class=\"headings\">\r\n            End Time\r\n          </div>\r\n          <ion-row class=\"ion-align-items-center\">\r\n            <ion-col size=\"3\">\r\n              <ion-datetime class=\"input-border time-picker\" [disabled]=\"!settings.shopTime.active\" display-format=\"h:mm A\" picker-format=\"h:mm A\" placeholder=\"Select End Time\" minuteValues=\"0,30\" [(ngModel)]=\"settings.shopTime.end\"></ion-datetime>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-col>\r\n      </ion-row>\r\n\r\n      <ion-row *ngIf=\"multipleVendorInvoices\">\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Billing Name</ion-label>\r\n            <ion-input class=\"form-input\"\r\n              [(ngModel)]=\"settings.invoiceSettings.billingName\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Billing Address</ion-label>\r\n            <ion-input class=\"form-input\"\r\n              [(ngModel)]=\"settings.invoiceSettings.address\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Telephone Number</ion-label>\r\n            <ion-input class=\"form-input\"\r\n              [(ngModel)]=\"settings.invoiceSettings.phoneNo\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"6\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>GST Number</ion-label>\r\n            <ion-input class=\"form-input\"\r\n              [(ngModel)]=\"settings.invoiceSettings.gstNo\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"6\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>PAN Number</ion-label>\r\n            <ion-input class=\"form-input\"\r\n              [(ngModel)]=\"settings.invoiceSettings.panNo\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Custom Message In Invoice</ion-label>\r\n            <ion-textarea rows=\"4\"\r\n              type=\"text\"\r\n              class=\"form-input\"\r\n              [(ngModel)]=\"settings.invoiceSettings.customMessage\"></ion-textarea>\r\n          </div>\r\n        </ion-col>\r\n\r\n\r\n        <ion-col size=\"12\" [hidden]=\"settings.invoiceSettings.logo.adminLogo == false\">\r\n          <div class=\"justify-content\">\r\n            <p>Logo (for Invoice) (Max Size: 200px by 200px)\r\n              <ion-text color=\"danger\">\r\n                <p>Only image files are allowed</p>\r\n              </ion-text>\r\n            </p>\r\n            <div class=\"upload-btn-wrapper\">\r\n              <button *ngIf=\"!settings.invoiceSettings.logo.url\"\r\n                class=\"upload-btn btn-1 i-start\"> <i\r\n                  class=\"flaticon-null-16\"></i>Upload</button>\r\n              <input *ngIf=\"!settings.invoiceSettings.logo.url\"\r\n                type=\"file\"\r\n                name=\"myfile\"\r\n                (change)=\"uploadInvoiceImg($event.target.files, 'logo')\"\r\n                accept=\"image/*\" />\r\n            </div>\r\n            <ion-button (click)=\"removeImg('logo')\"\r\n              fill=\"outline\"\r\n              color=\"dark\"\r\n              shape=\"round\"\r\n              size=\"small\"\r\n              *ngIf=\"settings.invoiceSettings.logo.url\">\r\n              Remove\r\n            </ion-button>\r\n          </div>\r\n          <div *ngIf=\"settings.invoiceSettings.logo.url\"\r\n            class=\"ion-text-center\">\r\n            <img src=\"{{settings.invoiceSettings.logo.url}}\"\r\n              class=\"sign-img\">\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col>\r\n          <div class=\"justify-content\">\r\n            <p>Authorized Signatory (for Invoice) (Max Size: 200px by\r\n              200px)<ion-text color=\"danger\">\r\n                <p>Only image files are allowed</p>\r\n              </ion-text>\r\n            </p>\r\n            <div class=\"upload-btn-wrapper\">\r\n              <button *ngIf=\"!settings.invoiceSettings.signature\"\r\n                class=\"upload-btn btn-1 i-start\"> <i\r\n                  class=\"flaticon-null-16\"></i>Upload</button>\r\n              <input *ngIf=\"!settings.invoiceSettings.signature\"\r\n                type=\"file\"\r\n                name=\"myfile\"\r\n                (change)=\"uploadInvoiceImg($event.target.files,'sign')\"\r\n                accept=\"image/*\" />\r\n            </div>\r\n            <ion-button (click)=\"removeImg('sign')\"\r\n              fill=\"outline\"\r\n              color=\"dark\"\r\n              shape=\"round\"\r\n              size=\"small\"\r\n              *ngIf=\"settings.invoiceSettings.signature\">\r\n              Remove\r\n            </ion-button>\r\n          </div>\r\n          <div *ngIf=\"settings.invoiceSettings.signature\"\r\n            class=\"ion-text-center\">\r\n            <img src=\"{{settings.invoiceSettings.signature}}\"\r\n              class=\"sign-img\">\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n\r\n</ion-content>\r\n\r\n<ion-footer no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"saveSettings()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/vendor-settings/vendor-settings.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/vendor-settings/vendor-settings.module.ts ***!
  \***********************************************************/
/*! exports provided: VendorSettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VendorSettingsPageModule", function() { return VendorSettingsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _vendor_settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vendor-settings.page */ "./src/app/vendor-settings/vendor-settings.page.ts");







var routes = [
    {
        path: '',
        component: _vendor_settings_page__WEBPACK_IMPORTED_MODULE_6__["VendorSettingsPage"]
    }
];
var VendorSettingsPageModule = /** @class */ (function () {
    function VendorSettingsPageModule() {
    }
    VendorSettingsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_vendor_settings_page__WEBPACK_IMPORTED_MODULE_6__["VendorSettingsPage"]]
        })
    ], VendorSettingsPageModule);
    return VendorSettingsPageModule;
}());



/***/ }),

/***/ "./src/app/vendor-settings/vendor-settings.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/vendor-settings/vendor-settings.page.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".input-border {\n  border: 1px solid lightgray;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmVuZG9yLXNldHRpbmdzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFx2ZW5kb3Itc2V0dGluZ3NcXHZlbmRvci1zZXR0aW5ncy5wYWdlLnNjc3MiLCJzcmMvYXBwL3ZlbmRvci1zZXR0aW5ncy92ZW5kb3Itc2V0dGluZ3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksMkJBQUE7RUFDQSxrQkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvdmVuZG9yLXNldHRpbmdzL3ZlbmRvci1zZXR0aW5ncy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW5wdXQtYm9yZGVye1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyXHJcbiAgfSIsIi5pbnB1dC1ib3JkZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/vendor-settings/vendor-settings.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/vendor-settings/vendor-settings.page.ts ***!
  \*********************************************************/
/*! exports provided: VendorSettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VendorSettingsPage", function() { return VendorSettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");





var VendorSettingsPage = /** @class */ (function () {
    function VendorSettingsPage(vendorService, storage, sharedService) {
        this.vendorService = vendorService;
        this.storage = storage;
        this.sharedService = sharedService;
        this.settings = {
            activeByVendor: true,
            shopTime: {
                active: false,
                start: new Date(),
                end: new Date()
            },
            invoiceSettings: {
                logo: {
                    adminLogo: true,
                    url: ''
                },
                billingName: '',
                address: '',
                phoneNo: '',
                gstNo: '',
                panNo: '',
                signature: '',
                customMessage: ''
            }
        };
        this.multipleVendorInvoices = false;
    }
    VendorSettingsPage.prototype.ngOnInit = function () {
    };
    VendorSettingsPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var uid, details, multiVendorSettings;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get('uid')];
                    case 1:
                        uid = _a.sent();
                        this.vendorId = uid;
                        return [4 /*yield*/, this.vendorService.getVendorData(uid, 'details')];
                    case 2:
                        details = _a.sent();
                        if (details) {
                            console.log('details:', details);
                            this.settings.activeByVendor = 'activeByVendor' in details ? details.activeByVendor : this.settings.activeByVendor;
                            this.settings['invoiceSettings'] = 'invoiceSettings' in details ? details.invoiceSettings : {};
                            if (details.shopTime) {
                                this.settings.shopTime = details.shopTime;
                                this.settings.shopTime.start = details.shopTime.start;
                                this.settings.shopTime.end = details.shopTime.end;
                            }
                        }
                        return [4 /*yield*/, this.vendorService.getActiveStatus('service')];
                    case 3:
                        multiVendorSettings = _a.sent();
                        if (multiVendorSettings) {
                            this.multipleVendorInvoices = 'multipleVendorInvoices' in multiVendorSettings ? multiVendorSettings.multipleVendorInvoices : this.multipleVendorInvoices;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    VendorSettingsPage.prototype.saveSettings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var success;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.settings.shopTime.active) {
                            if (!(this.settings.shopTime.start && this.settings.shopTime.end)) {
                                this.sharedService.presentAlert('Please select Start & End Timings');
                                return [2 /*return*/];
                            }
                        }
                        //this.settings.shopTime.start = new Date(this.settings.shopTime.start);
                        console.log('settingss:', this.settings);
                        return [4 /*yield*/, this.vendorService.updateVendorInfo(this.vendorId, this.settings)];
                    case 1:
                        success = _a.sent();
                        if (success) {
                            this.sharedService.presentAlert('Settingss Saved Successfully');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    VendorSettingsPage.prototype.shopTimingsToggle = function () {
        this.settings.shopTime.active = !this.settings.shopTime.active;
    };
    VendorSettingsPage.prototype.uploadInvoiceImg = function (files, imgType) {
        var _this = this;
        for (var i = 0; i < files.length; i++) {
            var reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = function (event) {
                var base64Image = event.target.result;
                if (imgType === 'sign') {
                    _this.settings.invoiceSettings.signature = base64Image;
                }
                else {
                    _this.settings.invoiceSettings.logo.url = base64Image;
                }
            };
        }
    };
    VendorSettingsPage.prototype.removeImg = function (imgType) {
        if (imgType === 'sign') {
            this.settings.invoiceSettings.signature = '';
        }
        else {
            this.settings.invoiceSettings.logo.url = '';
        }
    };
    VendorSettingsPage.ctorParameters = function () { return [
        { type: _services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_2__["VendorService"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"] },
        { type: _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] }
    ]; };
    VendorSettingsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-vendor-settings',
            template: __webpack_require__(/*! raw-loader!./vendor-settings.page.html */ "./node_modules/raw-loader/index.js!./src/app/vendor-settings/vendor-settings.page.html"),
            styles: [__webpack_require__(/*! ./vendor-settings.page.scss */ "./src/app/vendor-settings/vendor-settings.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_2__["VendorService"], _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"], _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"]])
    ], VendorSettingsPage);
    return VendorSettingsPage;
}());



/***/ })

}]);
//# sourceMappingURL=vendor-settings-vendor-settings-module-es5.js.map