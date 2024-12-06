(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["contact-settings-contact-settings-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/contact-settings/contact-settings.page.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/contact-settings/contact-settings.page.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Contact Page Settings</ion-title>\r\n  </ion-toolbar>\r\n\r\n</ion-header>\r\n\r\n<super-tabs no-shadow no-border>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button (click)=\"showDetailsFooter(true)\">\r\n      <ion-label>Details</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button (click)=\"showDetailsFooter(false)\">\r\n      <ion-label>Requests</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n  <super-tabs-container swipeEnabled=\"false\">\r\n    <!-- Details Tab -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n          <ion-grid class=\"ion-no-padding\">\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div>\r\n                  <div class=\"flex-label\">\r\n                    <ion-label>Recieve mail for every enquiry made by customer</ion-label>\r\n                    <ion-toggle [(ngModel)]=\"receiveMail\"></ion-toggle>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div>\r\n                  <div class=\"flex-label\">\r\n                    <ion-label>Show map on contact page</ion-label>\r\n                    <ion-toggle [(ngModel)]=\"location.active\"></ion-toggle>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n              <ion-row *ngIf=\"location.active\">\r\n                <ion-col size=\"4\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Latitude</ion-label>\r\n                    <ion-input class=\"form-input\" [(ngModel)]=\"location.lat\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"4\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Longitude</ion-label>\r\n                    <ion-input class=\"form-input\" [(ngModel)]=\"location.lng\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"1\" class=\"vertical-center\">\r\n                  <p class=\"or-text m-t-16\">OR</p>\r\n                </ion-col>\r\n                <ion-col size=\"3\" class=\"vertical-center\">\r\n                  <ion-button (click)=\"openMapModal()\" class=\"m-t-16\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                    Add location through map\r\n                  </ion-button>\r\n                </ion-col>\r\n              </ion-row>\r\n            <ion-row>\r\n              <ion-col>\r\n                <h4>Store Addresses</h4>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row *ngFor=\"let x of address; let i = index;\">\r\n              <ion-col size=\"1\" class=\"vertical-center\">\r\n                <p>{{i+1}})</p>\r\n              </ion-col>\r\n              <ion-col size=\"10\">\r\n                <ion-row>\r\n                  <ion-col size=\"6\">\r\n                    <ion-input type=\"text\" placeholder=\"Address Heading\" class=\"form-input\" [(ngModel)]=\"x.heading\">\r\n                    </ion-input>\r\n                  </ion-col>\r\n                  <ion-col size=\"6\">\r\n                    <ion-input type=\"text\" placeholder=\"Address\" class=\"form-input\" [(ngModel)]=\"x.address\"></ion-input>\r\n                  </ion-col>\r\n                  <ion-col size=\"6\">\r\n                    <ion-input type=\"text\" placeholder=\"Email\" class=\"form-input\" [(ngModel)]=\"x.email\"></ion-input>\r\n                  </ion-col>\r\n                  <ion-col size=\"6\">\r\n                    <ion-input type=\"text\" placeholder=\"Phone Number\" class=\"form-input\" [(ngModel)]=\"x.phoneNo\">\r\n                    </ion-input>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-col>\r\n              <ion-col size=\"1\" class=\"vertical-center\">\r\n                <i class=\"flaticon-null-19 remove-icon\" (click)=\"remove(i)\"></i>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row class=\"ion-justify-content-center\">\r\n              <ion-button (click)=\"addMore()\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                Add More Address\r\n              </ion-button>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Requests Tab -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n          <ion-grid class=\"ion-no-padding data-table t-a-c\" *ngIf=\"queries.length; else noData\">\r\n            <ion-row class=\"ion-text-capitalize\">\r\n              <ion-col size=\"1\">SNo.</ion-col>\r\n              <ion-col size=\"3\">Name</ion-col>\r\n              <ion-col size=\"2\">Contact Details</ion-col>\r\n              <ion-col size=\"2\">Date</ion-col>\r\n              <ion-col size=\"4\">Reason</ion-col>\r\n            </ion-row>\r\n            <ion-row *ngFor=\"let query of queries; let i=index;\">\r\n              <ion-col size=\"1\"> {{i+1}} </ion-col>\r\n              <ion-col size=\"3\"> {{query.name}} </ion-col>\r\n              <ion-col size=\"2\"> {{query.phoneNo}} <br><br> {{query.email}}\r\n              </ion-col>\r\n              <ion-col size=\"2\">{{query.createdAt.toDate() | date}}, {{query.createdAt.toDate() | date:'shortTime'}}</ion-col>\r\n              <ion-col size=\"4\" class=\"t-a-l\">\r\n                <b>Reason - </b> {{query.reason}}\r\n                <!-- <br>\r\n                <b>Other Details - </b> {{query.otherInfo}} -->\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n          <ng-template #noData>\r\n            <div class=\"vertical-center\">\r\n              No Data Available\r\n            </div>\r\n          </ng-template>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n  </super-tabs-container>\r\n</super-tabs>\r\n\r\n\r\n<ion-footer no-border class=\"page-footer\" *ngIf=\"detailsFooter\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"saveDetails()\" [disabled]=\"disableSave()\" shape=\"round\" class=\"btn-1 i-start\"\r\n      color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save Details\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/contact-settings/contact-settings.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/contact-settings/contact-settings.module.ts ***!
  \*************************************************************/
/*! exports provided: ContactSettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactSettingsPageModule", function() { return ContactSettingsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _contact_settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./contact-settings.page */ "./src/app/contact-settings/contact-settings.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");








var routes = [
    {
        path: '',
        component: _contact_settings_page__WEBPACK_IMPORTED_MODULE_6__["ContactSettingsPage"]
    }
];
var ContactSettingsPageModule = /** @class */ (function () {
    function ContactSettingsPageModule() {
    }
    ContactSettingsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"]
            ],
            declarations: [_contact_settings_page__WEBPACK_IMPORTED_MODULE_6__["ContactSettingsPage"]]
        })
    ], ContactSettingsPageModule);
    return ContactSettingsPageModule;
}());



/***/ }),

/***/ "./src/app/contact-settings/contact-settings.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/contact-settings/contact-settings.page.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".or-text {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  margin: 0px 10px;\n  margin-bottom: 0px !important;\n}\n\n.remove-icon {\n  cursor: pointer;\n  margin-top: 12px;\n  margin-left: 5px;\n  color: var(--ion-color-danger);\n  font-size: 16px;\n}\n\nh4 {\n  margin: 0px;\n}\n\n.data-table ion-col {\n  border: 1px solid gray;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  -webkit-user-select: text;\n     -moz-user-select: text;\n      -ms-user-select: text;\n          user-select: text;\n}\n\n.data-table ion-row:first-child {\n  background: lightgray;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGFjdC1zZXR0aW5ncy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcY29udGFjdC1zZXR0aW5nc1xcY29udGFjdC1zZXR0aW5ncy5wYWdlLnNjc3MiLCJzcmMvYXBwL2NvbnRhY3Qtc2V0dGluZ3MvY29udGFjdC1zZXR0aW5ncy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSw2QkFBQTtBQ0FGOztBREVBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7QUNDRjs7QURDQTtFQUFHLFdBQUE7QUNHSDs7QURDSTtFQUNBLHNCQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtFQUNBLHlCQUFBO0tBQUEsc0JBQUE7TUFBQSxxQkFBQTtVQUFBLGlCQUFBO0FDRUo7O0FEQ0U7RUFDRSxxQkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvY29udGFjdC1zZXR0aW5ncy9jb250YWN0LXNldHRpbmdzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4ub3ItdGV4dHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luOiAwcHggMTBweDtcclxuICBtYXJnaW4tYm90dG9tOiAwcHghaW1wb3J0YW50O1xyXG59XHJcbi5yZW1vdmUtaWNvbntcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgbWFyZ2luLXRvcDogMTJweDtcclxuICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbn1cclxuaDR7bWFyZ2luOiAwcHg7fVxyXG5cclxuLy8gUmVxdWVzdHMgVGFiXHJcbi5kYXRhLXRhYmxleyAgXHJcbiAgICBpb24tY29se1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcclxuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XHJcbiAgICB1c2VyLXNlbGVjdDogdGV4dDtcclxuICB9XHJcbiAgXHJcbiAgaW9uLXJvdzpmaXJzdC1jaGlsZHtcclxuICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JheVxyXG4gIH1cclxufVxyXG4iLCIub3ItdGV4dCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbjogMHB4IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDBweCAhaW1wb3J0YW50O1xufVxuXG4ucmVtb3ZlLWljb24ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG1hcmdpbi10b3A6IDEycHg7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG5oNCB7XG4gIG1hcmdpbjogMHB4O1xufVxuXG4uZGF0YS10YWJsZSBpb24tY29sIHtcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICB1c2VyLXNlbGVjdDogdGV4dDtcbn1cbi5kYXRhLXRhYmxlIGlvbi1yb3c6Zmlyc3QtY2hpbGQge1xuICBiYWNrZ3JvdW5kOiBsaWdodGdyYXk7XG59Il19 */"

/***/ }),

/***/ "./src/app/contact-settings/contact-settings.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/contact-settings/contact-settings.page.ts ***!
  \***********************************************************/
/*! exports provided: ContactSettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactSettingsPage", function() { return ContactSettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var _admin_delivery_settings_area_modal_area_modal_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../admin/delivery-settings/area-modal/area-modal.page */ "./src/app/admin/delivery-settings/area-modal/area-modal.page.ts");
/* harmony import */ var _services_contact_us_contact_us_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/contact-us/contact-us.service */ "./src/app/services/contact-us/contact-us.service.ts");






var ContactSettingsPage = /** @class */ (function () {
    function ContactSettingsPage(sharedService, contactUsService, modalController) {
        this.sharedService = sharedService;
        this.contactUsService = contactUsService;
        this.modalController = modalController;
        this.detailsFooter = true;
        this.receiveMail = true;
        this.address = [{ heading: '', address: '', email: '', phoneNo: '' }];
        this.location = { active: false, lat: '', lng: '' };
        this.queries = [];
    }
    ContactSettingsPage.prototype.ngOnInit = function () { };
    ContactSettingsPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var queries, details;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contactUsService.getAllQueries()];
                    case 1:
                        queries = _a.sent();
                        if (queries) {
                            this.queries = queries || this.queries;
                        }
                        console.log('queries:', queries);
                        return [4 /*yield*/, this.contactUsService.getContactPgDetails()];
                    case 2:
                        details = _a.sent();
                        if (details) {
                            this.address = details.address || this.address;
                            this.location = details.location || this.location;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ContactSettingsPage.prototype.showDetailsFooter = function (boolean) {
        this.detailsFooter = boolean;
    };
    ContactSettingsPage.prototype.disableSave = function () {
        if (this.location.active) {
            if (this.location.lat && this.location.lng) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    ContactSettingsPage.prototype.saveDetails = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var valid, _i, _a, address, saved;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        valid = true;
                        for (_i = 0, _a = this.address; _i < _a.length; _i++) {
                            address = _a[_i];
                            if (!(address.address.length)) {
                                console.log('address:, ', address.address.length);
                                valid = false;
                            }
                        }
                        if (!valid) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.contactUsService.saveContactPgDetails({
                                address: this.address,
                                location: this.location,
                                receiveMail: this.receiveMail
                            })];
                    case 1:
                        saved = _b.sent();
                        if (saved) {
                            this.sharedService.presentAlert('Contact Page Settings saved successfully.');
                        }
                        else {
                            this.sharedService.presentAlert('Something went wrong. Please try again later');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        this.sharedService.presentAlert('Address cant be empty, either remove the field or fill them');
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContactSettingsPage.prototype.addMore = function () {
        this.address.push({ heading: '', address: '', email: '', phoneNo: '' });
    };
    ContactSettingsPage.prototype.remove = function (index) {
        this.address.splice(index, 1);
    };
    ContactSettingsPage.prototype.openMapModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _admin_delivery_settings_area_modal_area_modal_page__WEBPACK_IMPORTED_MODULE_4__["AreaModalPage"],
                            cssClass: 'custom-modal big-modal',
                            backdropDismiss: false,
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (res) {
                            if (res.data && res.data.lat != 0 && res.data.lng != 0) {
                                _this.location.lat = res.data.lat;
                                _this.location.lng = res.data.lng;
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
    ContactSettingsPage.ctorParameters = function () { return [
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"] },
        { type: _services_contact_us_contact_us_service__WEBPACK_IMPORTED_MODULE_5__["ContactUsService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] }
    ]; };
    ContactSettingsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-contact-settings',
            template: __webpack_require__(/*! raw-loader!./contact-settings.page.html */ "./node_modules/raw-loader/index.js!./src/app/contact-settings/contact-settings.page.html"),
            styles: [__webpack_require__(/*! ./contact-settings.page.scss */ "./src/app/contact-settings/contact-settings.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"],
            _services_contact_us_contact_us_service__WEBPACK_IMPORTED_MODULE_5__["ContactUsService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]])
    ], ContactSettingsPage);
    return ContactSettingsPage;
}());



/***/ })

}]);
//# sourceMappingURL=contact-settings-contact-settings-module-es5.js.map