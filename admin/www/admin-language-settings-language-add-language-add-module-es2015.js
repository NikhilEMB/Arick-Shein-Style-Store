(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-language-settings-language-add-language-add-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/language-settings/language-add/language-add.page.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/language-settings/language-add/language-add.page.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">Select Languages to Add</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main\">\r\n    <br/>\r\n    <div class=\"languages\" *ngFor=\"let item of languages; let i = index\">\r\n      <div class=\"lang\" (click)=\"toggleLangAdd(i)\" >\r\n        <div>\r\n          <p style=\"font-weight: 600\">{{item.englishName}}</p>\r\n          <p style=\"font-weight: 400\">( {{item.langName}} )</p>\r\n        </div>\r\n        <div>\r\n          <input type=\"checkbox\" id=\"{{'checkbutton' +i}}\" color=\"primary\" [checked]=\"item.isAdded\" class=\"checkLang\">\r\n          <!-- <ion-checkbox id=\"{{'checkbutton' +i}}\" color=\"primary\" style=\"margin-top: 8px\" (click)=\"toggleLangAdd(i)\" [checked]=\"item.isAdded\"></ion-checkbox> -->\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <br/>\r\n    <br/>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/language-settings/language-add/language-add.module.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/admin/language-settings/language-add/language-add.module.ts ***!
  \*****************************************************************************/
/*! exports provided: LanguageAddPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguageAddPageModule", function() { return LanguageAddPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _language_add_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./language-add.page */ "./src/app/admin/language-settings/language-add/language-add.page.ts");







const routes = [
    {
        path: '',
        component: _language_add_page__WEBPACK_IMPORTED_MODULE_6__["LanguageAddPage"]
    }
];
let LanguageAddPageModule = class LanguageAddPageModule {
};
LanguageAddPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_language_add_page__WEBPACK_IMPORTED_MODULE_6__["LanguageAddPage"]]
    })
], LanguageAddPageModule);



/***/ }),

/***/ "./src/app/admin/language-settings/language-add/language-add.page.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/admin/language-settings/language-add/language-add.page.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  padding-left: 50px;\n  padding-right: 50px;\n  padding-bottom: 30px;\n  background: white;\n  text-align: center;\n  width: 60vw;\n  margin: 0% auto;\n}\n\n.languages {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n\n.lang {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 60vw;\n  border: 2px solid var(--ion-color-primary);\n  padding-top: 5px;\n  padding-bottom: 5px;\n  padding-left: 10px;\n  padding-right: 10px;\n  margin-bottom: 8px;\n  height: 55px;\n  cursor: pointer;\n}\n\n.checkLang {\n  margin-top: 15px;\n  border-radius: 50%;\n  width: 30px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vbGFuZ3VhZ2Utc2V0dGluZ3MvbGFuZ3VhZ2UtYWRkL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcbGFuZ3VhZ2Utc2V0dGluZ3NcXGxhbmd1YWdlLWFkZFxcbGFuZ3VhZ2UtYWRkLnBhZ2Uuc2NzcyIsInNyYy9hcHAvYWRtaW4vbGFuZ3VhZ2Utc2V0dGluZ3MvbGFuZ3VhZ2UtYWRkL2xhbmd1YWdlLWFkZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxXQUFBO0VBQ0EsMENBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9sYW5ndWFnZS1zZXR0aW5ncy9sYW5ndWFnZS1hZGQvbGFuZ3VhZ2UtYWRkLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWlue1xyXG4gICAgcGFkZGluZy1sZWZ0OiA1MHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogNTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAzMHB4O1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB3aWR0aDogNjB2dztcclxuICAgIG1hcmdpbjogMCUgYXV0b1xyXG59XHJcblxyXG4ubGFuZ3VhZ2Vze1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyXHJcbn1cclxuXHJcbi5sYW5ne1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIHdpZHRoOiA2MHZ3O1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgcGFkZGluZy10b3A6IDVweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiA1cHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6MTBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbiAgICBoZWlnaHQ6IDU1cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXJcclxufVxyXG5cclxuLmNoZWNrTGFuZ3tcclxuICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICB3aWR0aDogMzBweFxyXG59IiwiLm1haW4ge1xuICBwYWRkaW5nLWxlZnQ6IDUwcHg7XG4gIHBhZGRpbmctcmlnaHQ6IDUwcHg7XG4gIHBhZGRpbmctYm90dG9tOiAzMHB4O1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogNjB2dztcbiAgbWFyZ2luOiAwJSBhdXRvO1xufVxuXG4ubGFuZ3VhZ2VzIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5sYW5nIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogNjB2dztcbiAgYm9yZGVyOiAycHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBwYWRkaW5nLXRvcDogNXB4O1xuICBwYWRkaW5nLWJvdHRvbTogNXB4O1xuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgaGVpZ2h0OiA1NXB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5jaGVja0xhbmcge1xuICBtYXJnaW4tdG9wOiAxNXB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIHdpZHRoOiAzMHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/language-settings/language-add/language-add.page.ts":
/*!***************************************************************************!*\
  !*** ./src/app/admin/language-settings/language-add/language-add.page.ts ***!
  \***************************************************************************/
/*! exports provided: LanguageAddPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguageAddPage", function() { return LanguageAddPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");





let LanguageAddPage = class LanguageAddPage {
    constructor(events, labelService, alertController, loadingController, router) {
        this.events = events;
        this.labelService = labelService;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.router = router;
        this.headerText = '';
        this.languages = [];
        this.showLoader = true;
    }
    ngOnInit() {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.ADD_LANGUAGES_LABELS = this.labelService.labels['ADD_LANGUAGES'];
        this.headerText = this.ADD_LANGUAGES_LABELS['header_text'];
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.initializeSubscriptions();
            this.events.publish('language:getAvailableLanguages');
        });
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('language:publishAvailableLanguages', (languages) => {
            this.languages = languages;
            this.showLoader = false;
        });
        this.events.subscribe('language:addLanguagesSuccess', () => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.loading) {
                yield this.loading.dismiss();
            }
            yield this.presentAlert(this.ADD_LANGUAGES_LABELS['languages_saved_success_msg']);
        }));
    }
    presentLoading(duration, msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: msg,
                duration: duration,
            });
            yield this.loading.present();
        });
    }
    presentAlert(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: [{
                        text: this.SHARED_LABELS['ok'],
                    }]
            });
            yield alert.present();
        });
    }
    toggleLangAdd(i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.languages[i].isAdded = !this.languages[i].isAdded;
            yield this.presentLoading(10000, this.SHARED_LABELS['please_wait']);
            this.events.publish('language:addLanguages', this.languages);
        });
    }
    onClickSave() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading(5000, this.SHARED_LABELS['please_wait']);
            this.events.publish('language:addLanguages', this.languages);
        });
    }
    removeSubscriptions() {
        this.events.unsubscribe('language:publishAvailableLanguages');
        this.events.unsubscribe('language:addLanguagesSuccess');
    }
};
LanguageAddPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
    { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_1__["LabelService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
LanguageAddPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-language-add',
        template: __webpack_require__(/*! raw-loader!./language-add.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/language-settings/language-add/language-add.page.html"),
        styles: [__webpack_require__(/*! ./language-add.page.scss */ "./src/app/admin/language-settings/language-add/language-add.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
        src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_1__["LabelService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
], LanguageAddPage);



/***/ })

}]);
//# sourceMappingURL=admin-language-settings-language-add-language-add-module-es2015.js.map