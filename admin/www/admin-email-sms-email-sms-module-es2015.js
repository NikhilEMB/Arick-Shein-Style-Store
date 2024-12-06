(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-email-sms-email-sms-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/email-sms/email-sms.page.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/email-sms/email-sms.page.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Email & SMS Settings</ion-title>\r\n  </ion-toolbar>\r\n\r\n</ion-header>\r\n\r\n<super-tabs no-shadow no-border>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Email Settings</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>SMS Settings</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n  <super-tabs-container swipeEnabled=\"false\">\r\n    <!-- Email Tab -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <div class=\"flex-label\">\r\n                    <ion-label>Send Custom Emails with Sendgrid</ion-label>\r\n                    <ion-toggle [(ngModel)]=\"emailSettings.active\"></ion-toggle>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\" *ngIf=\"emailSettings.active\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Email</ion-label>\r\n                  <ion-input class=\"form-input\" [(ngModel)]=\"emailSettings.email\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\" *ngIf=\"emailSettings.active\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>API Key</ion-label>\r\n                  <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"emailSettings.apiKey\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n      <ion-footer no-border class=\"page-footer\">\r\n        <div class=\"main-container\">\r\n          <ion-button (click)=\"saveEmailSettings()\" [disabled] = disableEmailSave()\r\n            shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n            <i class=\"flaticon-null-20 margin-icon\"></i>\r\n            Save Email Settings\r\n          </ion-button>\r\n        </div>\r\n      </ion-footer>\r\n    </super-tab>\r\n\r\n    <!-- SMS Tab -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container fixed-height\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <div class=\"flex-label\">\r\n                    <ion-label>Send Custom SMS with Twilio</ion-label>\r\n                    <ion-toggle [(ngModel)]=\"smsSettings.active\"></ion-toggle>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\" *ngIf=\"smsSettings.active\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Account SID</ion-label>\r\n                  <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"smsSettings.accountSid\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\" *ngIf=\"smsSettings.active\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Auth Token</ion-label>\r\n                  <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"smsSettings.authToken\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\" *ngIf=\"smsSettings.active\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Valid Twilio number</ion-label>\r\n                  <ion-input type=\"text\" class=\"form-input\" placeholder=\"Ex: +1312626****\" [(ngModel)]=\"smsSettings.twilioNumber\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\">\r\n                <div class=\"flex-label\">\r\n                  <ion-label>Set your own msg91 credentials:</ion-label>\r\n                  <ion-toggle [(ngModel)]=\"smsSettings.msg91.active\"></ion-toggle>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\" *ngIf=\"smsSettings.msg91.active\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>SMS Sender Id:</ion-label>\r\n                  <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"smsSettings.msg91.smsSenderId\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\" *ngIf=\"smsSettings.msg91.active\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>SMS Key:</ion-label>\r\n                  <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"smsSettings.msg91.smsKey\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <br>\r\n              <p *ngIf=\"smsSettings.msg91.active\" style=\"text-decoration: underline;margin: 5px;\">Template Ids</p>\r\n              <br>\r\n              <ion-col size=\"12\" *ngIf=\"smsSettings.msg91.active\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Confirmed: </ion-label>\r\n                  <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"smsSettings.msg91.templateId.confirmed\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\" *ngIf=\"smsSettings.msg91.active\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Cancelled: </ion-label>\r\n                  <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"smsSettings.msg91.templateId.cancelled\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\" *ngIf=\"smsSettings.msg91.active\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Delivered: </ion-label>\r\n                  <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"smsSettings.msg91.templateId.delivered\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\" *ngIf=\"smsSettings.msg91.active\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Dispatched: </ion-label>\r\n                  <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"smsSettings.msg91.templateId.dispatched\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n      <ion-footer no-border class=\"page-footer\">\r\n        <div class=\"main-container\">\r\n          <ion-button (click)=\"saveSmsSettings()\" [disabled]=\"disableSmsSave()\"\r\n            shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n            <i class=\"flaticon-null-20 margin-icon\"></i>\r\n            Save SMS Settings\r\n          </ion-button>\r\n        </div>\r\n      </ion-footer>\r\n    </super-tab>\r\n\r\n  </super-tabs-container>\r\n</super-tabs>"

/***/ }),

/***/ "./src/app/admin/email-sms/email-sms.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/admin/email-sms/email-sms.module.ts ***!
  \*****************************************************/
/*! exports provided: EmailSmsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailSmsPageModule", function() { return EmailSmsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _email_sms_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./email-sms.page */ "./src/app/admin/email-sms/email-sms.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm2015/ionic-super-tabs-angular.js");








const routes = [
    {
        path: '',
        component: _email_sms_page__WEBPACK_IMPORTED_MODULE_6__["EmailSmsPage"]
    }
];
let EmailSmsPageModule = class EmailSmsPageModule {
};
EmailSmsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"]
        ],
        declarations: [_email_sms_page__WEBPACK_IMPORTED_MODULE_6__["EmailSmsPage"]]
    })
], EmailSmsPageModule);



/***/ }),

/***/ "./src/app/admin/email-sms/email-sms.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/admin/email-sms/email-sms.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2VtYWlsLXNtcy9lbWFpbC1zbXMucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/admin/email-sms/email-sms.page.ts":
/*!***************************************************!*\
  !*** ./src/app/admin/email-sms/email-sms.page.ts ***!
  \***************************************************/
/*! exports provided: EmailSmsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailSmsPage", function() { return EmailSmsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");





let EmailSmsPage = class EmailSmsPage {
    constructor(events, router, sharedService, alertController) {
        this.events = events;
        this.router = router;
        this.sharedService = sharedService;
        this.alertController = alertController;
        this.emailSettings = {
            active: false,
            email: '',
            apiKey: '',
        };
        this.smsSettings = {
            active: false,
            accountSid: '',
            authToken: '',
            twilioNumber: '',
            msg91: {
                active: false,
                smsSenderId: '',
                smsKey: '',
                templateId: {
                    cancelled: '',
                    confirmed: '',
                    delivered: '',
                    dispatched: ''
                }
            }
        };
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.initializeSubscriptions();
        });
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('email-sms:saveSettingsSuccess', (settingType) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.sharedService.loading.dismiss();
            this.sharedService.presentAlert(`${settingType.charAt(0).toUpperCase() + settingType.slice(1)} Settings Saved Successfully`);
        }));
        this.events.subscribe('email-sms:saveSettingsFailure', (errMessage) => {
            console.log('details Failure', errMessage);
        });
        this.events.subscribe('email-sms:getSettingsSuccess', (doc, settingType) => {
            console.log('doc:', doc);
            if (settingType === 'email' && doc.active) {
                this.emailSettings.active = doc.active;
                this.emailSettings.email = doc.email;
                this.emailSettings.apiKey = doc.apiKey;
            }
            else if (settingType === 'sms' && doc) {
                this.smsSettings.active = doc.active;
                this.smsSettings.accountSid = doc.accountSid;
                this.smsSettings.authToken = doc.authToken;
                this.smsSettings.twilioNumber = doc.twilioNumber;
                if (doc.msg91) {
                    this.smsSettings.msg91 = doc.msg91;
                }
            }
        });
        this.events.subscribe('email-sms:getSettingsFailure', (errMessage) => {
            console.log('details Failure', errMessage);
        });
        this.events.publish('email-sms:getSettings', 'email');
        this.events.publish('email-sms:getSettings', 'sms');
    }
    removeSubscriptions() {
        this.events.unsubscribe('email-sms:saveSettingsSuccess');
        this.events.unsubscribe('email-sms:saveSettingsFailure');
        this.events.unsubscribe('email-sms:getSettingsSuccess');
        this.events.unsubscribe('email-sms:getSettingsFailure');
    }
    disableEmailSave() {
        if (this.emailSettings.email === '' || this.emailSettings.apiKey === '') {
            return true;
        }
        else {
            return false;
        }
    }
    disableSmsSave() {
        if (this.smsSettings.active && (this.smsSettings.accountSid === '' || this.smsSettings.authToken === '' || this.smsSettings.twilioNumber === '')) {
            return true;
        }
        else {
            return false;
        }
    }
    saveEmailSettings() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log('emailsettings:', this.emailSettings);
            yield this.sharedService.presentLoading();
            this.emailSettings.email.trim();
            this.emailSettings.apiKey.trim();
            this.events.publish('email-sms:saveSettings', this.emailSettings, 'email', '');
        });
    }
    saveSmsSettings() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.smsSettings.msg91.active && (!this.smsSettings.msg91.smsKey || !this.smsSettings.msg91.templateId.cancelled || !this.smsSettings.msg91.templateId.confirmed
                || !this.smsSettings.msg91.templateId.dispatched || !this.smsSettings.msg91.templateId.delivered)) {
                yield this.sharedService.presentAlert('Please fill all details!');
            }
            else {
                yield this.sharedService.presentLoading();
                this.smsSettings.accountSid.trim();
                this.smsSettings.authToken.trim();
                this.smsSettings.twilioNumber.trim();
                this.events.publish('email-sms:saveSettings', this.smsSettings, 'sms', '');
            }
        });
    }
};
EmailSmsPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] }
];
EmailSmsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-email-sms',
        template: __webpack_require__(/*! raw-loader!./email-sms.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/email-sms/email-sms.page.html"),
        styles: [__webpack_require__(/*! ./email-sms.page.scss */ "./src/app/admin/email-sms/email-sms.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"]])
], EmailSmsPage);



/***/ })

}]);
//# sourceMappingURL=admin-email-sms-email-sms-module-es2015.js.map