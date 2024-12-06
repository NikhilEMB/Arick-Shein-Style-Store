(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-terms-settings-admin-terms-settings-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-terms-settings/admin-terms-settings.page.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-terms-settings/admin-terms-settings.page.html ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Terms and Policy</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"solid\" color=\"secondary\" >\r\n      <span class=\"icon\" slot=\"start\">\r\n        <i class=\"flaticon-null\" slot=\"start\"></i>\r\n        <span class=\"count\">5</span>\r\n      </span>\r\n    </ion-button>\r\n    <ion-button fill=\"solid\" color=\"secondary\" >\r\n      <span class=\"icon\" slot=\"start\">\r\n        <i class=\"flaticon-shopping-bag\" slot=\"start\"></i>\r\n        <span class=\"count\">2</span>\r\n      </span>\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n\r\n\r\n<super-tabs no-shadow no-border>\r\n    <super-tabs-toolbar slot=\"top\">\r\n      <super-tab-button>\r\n        <ion-label>Terms & Conditions</ion-label>    \r\n      </super-tab-button>\r\n      <super-tab-button>\r\n        <ion-label>Privacy Policy</ion-label>    \r\n      </super-tab-button>\r\n      <super-tab-button>\r\n        <ion-label>Cancellation Policy</ion-label>    \r\n      </super-tab-button>\r\n      <super-tab-button>\r\n        <ion-label>Refund Policy</ion-label>    \r\n      </super-tab-button>\r\n      <super-tab-button>\r\n        <ion-label>Shipping</ion-label>    \r\n      </super-tab-button>\r\n    </super-tabs-toolbar>\r\n\r\n    <super-tabs-container>\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container fix-height\">\r\n            <div class=\"flex-label\"><ion-label>Enable</ion-label>\r\n              <ion-toggle \r\n              [checked]=\"termsActiveStatus\" [(ngModel)]=\"termsActiveStatus\"></ion-toggle>\r\n            </div>\r\n          <ckeditor [(ngModel)]=\"termsContent\" [config]=\"ckeConfig\"></ckeditor>\r\n        </div>\r\n        </ion-content>\r\n      </super-tab>\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container fix-height\">\r\n            <div class=\"flex-label\"><ion-label>Enable</ion-label>\r\n              <ion-toggle \r\n              [checked]=\"privacyActiveStatus\" [(ngModel)]=\"privacyActiveStatus\"></ion-toggle>\r\n            </div>\r\n          <ckeditor [(ngModel)]=\"privacyContent\" [config]=\"ckeConfig\"></ckeditor>\r\n          </div>\r\n        </ion-content>\r\n      </super-tab>\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container fix-height\">\r\n            <div class=\"flex-label\"><ion-label>Enable</ion-label>\r\n              <ion-toggle \r\n              [checked]=\"cancelActiveStatus\" [(ngModel)]=\"cancelActiveStatus\"></ion-toggle>\r\n            </div>\r\n          <ckeditor [(ngModel)]=\"cancelContent\" [config]=\"ckeConfig\"></ckeditor>\r\n          </div>\r\n        </ion-content>\r\n      </super-tab>\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container fix-height\">\r\n            <div class=\"flex-label\"><ion-label>Enable</ion-label>\r\n              <ion-toggle \r\n              [checked]=\"refundActiveStatus\" [(ngModel)]=\"refundActiveStatus\"></ion-toggle>\r\n            </div>\r\n          <ckeditor [(ngModel)]=\"refundContent\" [config]=\"ckeConfig\"></ckeditor>\r\n          </div>\r\n        </ion-content>\r\n      </super-tab>\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container fix-height\">\r\n            <div class=\"flex-label\"><ion-label>Enable</ion-label>\r\n              <ion-toggle \r\n              [checked]=\"shippingActiveStatus\" [(ngModel)]=\"shippingActiveStatus\"></ion-toggle>\r\n            </div>\r\n          <ckeditor [(ngModel)]=\"shippingContent\" [config]=\"ckeConfig\"></ckeditor>\r\n          </div>\r\n        </ion-content>\r\n      </super-tab>\r\n    </super-tabs-container>\r\n  </super-tabs>\r\n\r\n<ion-footer  no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"onClickSaveTermsSettings()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/admin/admin-terms-settings/admin-terms-settings.module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/admin/admin-terms-settings/admin-terms-settings.module.ts ***!
  \***************************************************************************/
/*! exports provided: AdminTermsSettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminTermsSettingsPageModule", function() { return AdminTermsSettingsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_terms_settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-terms-settings.page */ "./src/app/admin/admin-terms-settings/admin-terms-settings.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm2015/ionic-super-tabs-angular.js");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");









const routes = [
    {
        path: '',
        component: _admin_terms_settings_page__WEBPACK_IMPORTED_MODULE_6__["AdminTermsSettingsPage"]
    }
];
let AdminTermsSettingsPageModule = class AdminTermsSettingsPageModule {
};
AdminTermsSettingsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"],
            ng2_ckeditor__WEBPACK_IMPORTED_MODULE_8__["CKEditorModule"]
        ],
        declarations: [_admin_terms_settings_page__WEBPACK_IMPORTED_MODULE_6__["AdminTermsSettingsPage"]]
    })
], AdminTermsSettingsPageModule);



/***/ }),

/***/ "./src/app/admin/admin-terms-settings/admin-terms-settings.page.scss":
/*!***************************************************************************!*\
  !*** ./src/app/admin/admin-terms-settings/admin-terms-settings.page.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".fix-height {\n  max-height: calc(100vh - 315px);\n  overflow-y: scroll;\n  padding: 16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tdGVybXMtc2V0dGluZ3MvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxhZG1pbi10ZXJtcy1zZXR0aW5nc1xcYWRtaW4tdGVybXMtc2V0dGluZ3MucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZG1pbi10ZXJtcy1zZXR0aW5ncy9hZG1pbi10ZXJtcy1zZXR0aW5ncy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSwrQkFBQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vYWRtaW4tdGVybXMtc2V0dGluZ3MvYWRtaW4tdGVybXMtc2V0dGluZ3MucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZpeC1oZWlnaHR7XHJcbiAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtIDMxNXB4KTtcclxuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcclxuICAgIHBhZGRpbmc6IDE2cHg7XHJcbn0iLCIuZml4LWhlaWdodCB7XG4gIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSAzMTVweCk7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgcGFkZGluZzogMTZweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/admin-terms-settings/admin-terms-settings.page.ts":
/*!*************************************************************************!*\
  !*** ./src/app/admin/admin-terms-settings/admin-terms-settings.page.ts ***!
  \*************************************************************************/
/*! exports provided: AdminTermsSettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminTermsSettingsPage", function() { return AdminTermsSettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");



let AdminTermsSettingsPage = class AdminTermsSettingsPage {
    constructor(platform, events, loadingController, alertController) {
        this.platform = platform;
        this.events = events;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.termsContent = '';
        this.privacyContent = '';
        this.cancelContent = '';
        this.refundContent = '';
        this.shippingContent = '';
        this.termsActiveStatus = true;
        this.privacyActiveStatus = true;
        this.cancelActiveStatus = true;
        this.refundActiveStatus = true;
        this.shippingActiveStatus = true;
    }
    ngOnInit() {
        this.initializeSubscriptions();
        this.events.publish('admin-settings:getTermsAndPrivacyData');
        const devHeight = this.platform.height();
        const editorHeight = devHeight - 245;
        this.ckeConfig = {
            allowedContent: true,
            height: editorHeight
        };
    }
    ngOnDestroy() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('admin-settings:saveTermsAndPrivacySuccess', () => {
            this.loading.dismiss();
            this.presentAlert('Data Saved Successfully!');
        });
        this.events.subscribe('admin-settings:publishTermsAndPrivacyData', (data) => {
            console.log(data);
            if (data) {
                this.termsContent = data.terms;
                this.privacyContent = data.privacy;
                this.cancelContent = data.cancel;
                this.refundContent = data.refund;
                this.shippingContent = data.shipping;
                this.termsActiveStatus = data.termsActiveStatus;
                this.privacyActiveStatus = data.privacyActiveStatus;
                this.cancelActiveStatus = data.cancelActiveStatus;
                this.refundActiveStatus = data.refundActiveStatus;
                this.shippingActiveStatus = data.shippingActiveStatus;
            }
        });
    }
    onClickSaveTermsSettings() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.termsContent === '') {
                this.presentAlert('Please enter some Terms!');
            }
            else if (this.privacyContent === '') {
                this.presentAlert('Please enter some Privacy!');
            }
            else {
                yield this.presentLoading();
                const termsAndPrivacyData = {
                    terms: this.termsContent,
                    privacy: this.privacyContent,
                    cancel: this.cancelContent,
                    refund: this.refundContent,
                    shipping: this.shippingContent,
                    termsActiveStatus: this.termsActiveStatus,
                    privacyActiveStatus: this.privacyActiveStatus,
                    cancelActiveStatus: this.cancelActiveStatus,
                    refundActiveStatus: this.refundActiveStatus,
                    shippingActiveStatus: this.shippingActiveStatus
                };
                this.events.publish('admin-settings:saveTermsAndPrivacy', termsAndPrivacyData);
            }
        });
    }
    presentAlert(desc) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: desc,
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Please Wait...',
                duration: 5000
            });
            yield this.loading.present();
        });
    }
    removeSubscriptions() {
        this.events.subscribe('admin-settings:saveTermsAndPrivacySuccess');
        this.events.subscribe('admin-settings:publishTermsAndPrivacyData');
    }
};
AdminTermsSettingsPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] }
];
AdminTermsSettingsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-admin-terms-settings',
        template: __webpack_require__(/*! raw-loader!./admin-terms-settings.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-terms-settings/admin-terms-settings.page.html"),
        styles: [__webpack_require__(/*! ./admin-terms-settings.page.scss */ "./src/app/admin/admin-terms-settings/admin-terms-settings.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]])
], AdminTermsSettingsPage);



/***/ })

}]);
//# sourceMappingURL=admin-admin-terms-settings-admin-terms-settings-module-es2015.js.map