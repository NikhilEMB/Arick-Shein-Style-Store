(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-whatsapp-whatsapp-settings-whatsapp-settings-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/whatsapp/whatsapp-settings/whatsapp-settings.page.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/whatsapp/whatsapp-settings/whatsapp-settings.page.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Whatsapp Settings</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs>\r\n\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Account</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Insights</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <super-tabs-container>\r\n\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\" style=\"width: 100%;\">\r\n          <ion-card>\r\n            <ion-card-header>\r\n              <ion-card-subtitle>Whatsapp Credentials</ion-card-subtitle>\r\n              <ion-card-title>Auth Token<span class=\"red\">*</span></ion-card-title>\r\n              <ion-input class=\"form-input\" [(ngModel)]=\"credentials.authToken\"></ion-input>\r\n\r\n              <ion-card-title>Catalogue ID<span class=\"red\">*</span></ion-card-title>\r\n              <ion-input class=\"form-input\" [(ngModel)]=\"credentials.catalogueId\"></ion-input>\r\n\r\n              <ion-card-title>Catalogue Feed ID<span class=\"red\">*</span></ion-card-title>\r\n              <ion-input class=\"form-input\" [(ngModel)]=\"credentials.catalogueFeedId\"></ion-input>\r\n\r\n              <ion-card-title>Phone Number ID<span class=\"red\">*</span></ion-card-title>\r\n              <ion-input class=\"form-input\" [(ngModel)]=\"credentials.phoneNumberId\"></ion-input>\r\n\r\n              <ion-card-title>Webhook Verify Token<span class=\"red\">*</span></ion-card-title>\r\n              <ion-input class=\"form-input\" [(ngModel)]=\"credentials.webhookVerifyToken\"></ion-input>\r\n\r\n              <ion-card-title>Business Account Id<span class=\"red\">*</span></ion-card-title>\r\n              <ion-input class=\"form-input\" [(ngModel)]=\"credentials.businessId\"></ion-input>\r\n\r\n              <ion-card-title>Business Page Id<span class=\"red\">*</span></ion-card-title>\r\n              <ion-input class=\"form-input\" [(ngModel)]=\"credentials.businessPageId\"></ion-input>\r\n\r\n              <ion-card-title>Dev App Id<span class=\"red\">*</span></ion-card-title>\r\n              <ion-input class=\"form-input\" [(ngModel)]=\"credentials.devAppId\"></ion-input>\r\n\r\n              <ion-button style=\"margin-right: 16px;\" mode=\"ios\" shape=\"round\" (click)=\"saveWhatsappCredentials()\">Save\r\n                Credentials</ion-button>\r\n            </ion-card-header>\r\n          </ion-card>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\" style=\"width: 100%;\">\r\n          <ion-button style=\"margin-right: 16px;\" mode=\"ios\" shape=\"round\" (click)=\"syncProducts()\">Sync Products on Whatsapp</ion-button>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n  </super-tabs-container>\r\n\r\n</super-tabs>\r\n"

/***/ }),

/***/ "./src/app/admin/whatsapp/whatsapp-settings/whatsapp-settings.module.ts":
/*!******************************************************************************!*\
  !*** ./src/app/admin/whatsapp/whatsapp-settings/whatsapp-settings.module.ts ***!
  \******************************************************************************/
/*! exports provided: WhatsappSettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsappSettingsPageModule", function() { return WhatsappSettingsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _whatsapp_settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./whatsapp-settings.page */ "./src/app/admin/whatsapp/whatsapp-settings/whatsapp-settings.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm2015/ionic-super-tabs-angular.js");








const routes = [
    {
        path: '',
        component: _whatsapp_settings_page__WEBPACK_IMPORTED_MODULE_6__["WhatsappSettingsPage"]
    }
];
let WhatsappSettingsPageModule = class WhatsappSettingsPageModule {
};
WhatsappSettingsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"],
        ],
        declarations: [_whatsapp_settings_page__WEBPACK_IMPORTED_MODULE_6__["WhatsappSettingsPage"]]
    })
], WhatsappSettingsPageModule);



/***/ }),

/***/ "./src/app/admin/whatsapp/whatsapp-settings/whatsapp-settings.page.scss":
/*!******************************************************************************!*\
  !*** ./src/app/admin/whatsapp/whatsapp-settings/whatsapp-settings.page.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-card-subtitle {\n  font-size: large;\n  margin-bottom: 16px;\n  display: -webkit-box;\n  display: flex;\n  justify-content: space-around;\n}\n\nion-input {\n  margin-bottom: 16px;\n}\n\n.red {\n  color: var(--ion-color-danger);\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 82vh;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 82vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vd2hhdHNhcHAvd2hhdHNhcHAtc2V0dGluZ3MvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFx3aGF0c2FwcFxcd2hhdHNhcHAtc2V0dGluZ3NcXHdoYXRzYXBwLXNldHRpbmdzLnBhZ2Uuc2NzcyIsInNyYy9hcHAvYWRtaW4vd2hhdHNhcHAvd2hhdHNhcHAtc2V0dGluZ3Mvd2hhdHNhcHAtc2V0dGluZ3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDZCQUFBO0FDQ0o7O0FERUU7RUFDRSxtQkFBQTtBQ0NKOztBRENFO0VBQ0UsOEJBQUE7QUNFSjs7QURFRTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVHO0VBQ0MsZ0JBQUE7QUNDSjs7QURFRztFQUNDLGdCQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVHO0VBQ0MsZ0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3doYXRzYXBwL3doYXRzYXBwLXNldHRpbmdzL3doYXRzYXBwLXNldHRpbmdzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jYXJkLXN1YnRpdGxlIHtcclxuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG4gIH1cclxuICBcclxuICBpb24taW5wdXQge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxuICB9XHJcbiAgLnJlZHtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcclxuICB9XHJcbiAgXHJcbiAgLy8gTWFuYWdlbWVudFxyXG4gICNzY3JvbGwxe1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGhlaWdodDogODJ2aFxyXG4gICB9XHJcbiAgXHJcbiAgICNzY3JvbGwxOmhvdmVye1xyXG4gICAgb3ZlcmZsb3cteTogYXV0b1xyXG4gICB9XHJcbiAgXHJcbiAgICNzY3JvbGwye1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGhlaWdodDogODJ2aDtcclxuICAgfVxyXG4gIFxyXG4gICAjc2Nyb2xsMjpob3ZlcntcclxuICAgIG92ZXJmbG93LXk6IGF1dG9cclxuICAgfSIsImlvbi1jYXJkLXN1YnRpdGxlIHtcbiAgZm9udC1zaXplOiBsYXJnZTtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG59XG5cbmlvbi1pbnB1dCB7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG59XG5cbi5yZWQge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG59XG5cbiNzY3JvbGwxIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA4MnZoO1xufVxuXG4jc2Nyb2xsMTpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbiNzY3JvbGwyIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA4MnZoO1xufVxuXG4jc2Nyb2xsMjpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/whatsapp/whatsapp-settings/whatsapp-settings.page.ts":
/*!****************************************************************************!*\
  !*** ./src/app/admin/whatsapp/whatsapp-settings/whatsapp-settings.page.ts ***!
  \****************************************************************************/
/*! exports provided: WhatsappSettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsappSettingsPage", function() { return WhatsappSettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/whatsapp-dashboard/whatsapp-dashboard.service */ "./src/app/services/whatsapp-dashboard/whatsapp-dashboard.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");




let WhatsappSettingsPage = class WhatsappSettingsPage {
    constructor(WhatsappDashboardService, sharedService) {
        this.WhatsappDashboardService = WhatsappDashboardService;
        this.sharedService = sharedService;
        this.credentials = {
            authToken: '',
            catalogueId: '',
            catalogueFeedId: '',
            phoneNumberId: '',
            webhookVerifyToken: '',
            businessId: '',
            businessPageId: '',
            devAppId: '',
        };
    }
    ngOnInit() { }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.whatsappDashboardData = yield this.WhatsappDashboardService.getWhatsappCredentials();
            if (this.whatsappDashboardData && this.whatsappDashboardData.credentials) {
                this.credentials = this.whatsappDashboardData.credentials;
            }
            // this.checkCredentials()
        });
    }
    isValidCredentials() {
        // for (let key in this.credentials) {
        //   if (!this.credentials[key] || this.credentials[key] == '') {
        //     return false;
        //   }
        // }
        // return true;
        if (!this.credentials.authToken || !this.credentials.catalogueId || !this.credentials.catalogueFeedId || !this.credentials.phoneNumberId || !this.credentials.webhookVerifyToken || !this.credentials.businessId || !this.credentials.businessPageId || !this.credentials.devAppId) {
            return false;
        }
        else {
            return true;
        }
    }
    saveWhatsappCredentials() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const validCredentials = this.isValidCredentials();
            if (!validCredentials) {
                this.sharedService.presentAlert('Please fill all credentials');
                return;
            }
            const success = yield this.WhatsappDashboardService.saveWhatsappCredentials(this.credentials);
            if (success) {
                if (this.sharedService.loading) {
                    this.sharedService.loading.dismiss();
                }
                this.sharedService.presentAlert('Settings saved successfully');
            }
        });
    }
    changeComponent(index) {
        this.selectedId = index.toString();
    }
    syncProducts() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.WhatsappDashboardService.syncProducts();
            this.sharedService.presentAlert('Products will sync in couple of minutes');
        });
    }
};
WhatsappSettingsPage.ctorParameters = () => [
    { type: _services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_2__["WhatsappDashboardService"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"] }
];
WhatsappSettingsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-whatsapp-settings',
        template: __webpack_require__(/*! raw-loader!./whatsapp-settings.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/whatsapp/whatsapp-settings/whatsapp-settings.page.html"),
        styles: [__webpack_require__(/*! ./whatsapp-settings.page.scss */ "./src/app/admin/whatsapp/whatsapp-settings/whatsapp-settings.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_2__["WhatsappDashboardService"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"]])
], WhatsappSettingsPage);



/***/ })

}]);
//# sourceMappingURL=admin-whatsapp-whatsapp-settings-whatsapp-settings-module-es2015.js.map