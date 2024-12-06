(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-language-settings-language-current-language-current-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/language-settings/language-current/language-current.page.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/language-settings/language-current/language-current.page.html ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Languages</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main\">\r\n    <div class=\"list-header\">\r\n      <ion-grid class=\"ion-no-padding\">\r\n        <ion-row>\r\n          <ion-col class=\"name\">\r\n            <p>Languages</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>Action</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>Reorder</p>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </div>\r\n    <div class=\"list-container\">\r\n      <ion-grid>\r\n        <ion-reorder-group (ionItemReorder)=\"onReorderLang($event)\" disabled=\"false\" class=\"ion-no-padding\">\r\n        <ion-row *ngFor=\"let item of languages; let i = index\" class=\"order-row\">\r\n          <ion-col class=\"name\">\r\n            <p class=\"ion-text-capitalize\">{{item.englishName}} ( {{item.langName}} )</p>\r\n          </ion-col>\r\n          <ion-col class=\"action\">\r\n            <ion-button (click)=\"makeDefault(item.id,i)\" class=\"btn-sml i-start\" fill=\"outline\"\r\n              shape=\"round\">\r\n              Make default\r\n            </ion-button>&nbsp;&nbsp;\r\n            <ion-button (click)=\"deleteLang(item.id,i)\" class=\"btn-sml i-start m-s-btn\" fill=\"outline\"\r\n              shape=\"round\">\r\n              Delete\r\n            </ion-button>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <ion-reorder>\r\n              <div class=\"flat-sort\">\r\n                <i class=\"flaticon-menu\"></i>\r\n              </div>\r\n            </ion-reorder>\r\n          </ion-col>\r\n        </ion-row>\r\n        </ion-reorder-group>\r\n      </ion-grid>\r\n    </div>\r\n    <br/><br/>\r\n    <ion-button shape=\"round\" class=\"btn-1 i-start\" (click)=\"gotoLanguageAdd()\">\r\n      Add Language\r\n    </ion-button>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/language-settings/language-current/language-current.module.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/admin/language-settings/language-current/language-current.module.ts ***!
  \*************************************************************************************/
/*! exports provided: LanguageCurrentPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguageCurrentPageModule", function() { return LanguageCurrentPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/shared.module */ "./src/app/components/shared.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _language_current_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./language-current.page */ "./src/app/admin/language-settings/language-current/language-current.page.ts");









const routes = [
    {
        path: '',
        component: _language_current_page__WEBPACK_IMPORTED_MODULE_8__["LanguageCurrentPage"]
    }
];
let LanguageCurrentPageModule = class LanguageCurrentPageModule {
};
LanguageCurrentPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forChild(routes),
            src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__["TranslateModule"]
        ],
        declarations: [_language_current_page__WEBPACK_IMPORTED_MODULE_8__["LanguageCurrentPage"]]
    })
], LanguageCurrentPageModule);



/***/ }),

/***/ "./src/app/admin/language-settings/language-current/language-current.page.scss":
/*!*************************************************************************************!*\
  !*** ./src/app/admin/language-settings/language-current/language-current.page.scss ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  padding-left: 50px;\n  padding-right: 50px;\n  padding-bottom: 30px;\n  background: white;\n  text-align: center;\n  width: 60vw;\n  margin: 0% auto;\n}\n\n.languages {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  width: 50%;\n}\n\n.tab {\n  display: -webkit-box;\n  display: flex;\n  justify-content: space-around;\n  border-bottom: 1px lightgray;\n  font-size: large !important;\n  font-weight: 500;\n  border-bottom: 1px solid lightgray;\n}\n\n.list-header {\n  position: relative;\n  width: 53.5vw;\n}\n\n.list-container {\n  margin-top: 90px;\n  width: 52vw;\n}\n\n.list-container ion-grid ion-row {\n  border-bottom: var(--ion-color-medium) 1px solid;\n}\n\n.list-container ion-grid ion-row ion-col {\n  -webkit-box-pack: center;\n          justify-content: center;\n  display: -webkit-inline-box;\n  display: inline-flex;\n}\n\n.f-d-c {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.f-d-c .m-s-btn {\n  margin-top: 15px;\n}\n\n.name {\n  width: 60vw;\n  max-width: 60vw;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vbGFuZ3VhZ2Utc2V0dGluZ3MvbGFuZ3VhZ2UtY3VycmVudC9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGxhbmd1YWdlLXNldHRpbmdzXFxsYW5ndWFnZS1jdXJyZW50XFxsYW5ndWFnZS1jdXJyZW50LnBhZ2Uuc2NzcyIsInNyYy9hcHAvYWRtaW4vbGFuZ3VhZ2Utc2V0dGluZ3MvbGFuZ3VhZ2UtY3VycmVudC9sYW5ndWFnZS1jdXJyZW50LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLFVBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDZCQUFBO0VBQ0EsNEJBQUE7RUFDQSwyQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0NBQUE7QUNDSjs7QURFQTtFQUNJLGtCQUFBO0VBQ0EsYUFBQTtBQ0NKOztBREVBO0VBQ0ksZ0JBQUE7RUFDQSxXQUFBO0FDQ0o7O0FEQ1E7RUFDQSxnREFBQTtBQ0NSOztBRENRO0VBQ0ksd0JBQUE7VUFBQSx1QkFBQTtFQUNBLDJCQUFBO0VBQUEsb0JBQUE7QUNDWjs7QURLQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNGSjs7QURJSTtFQUNFLGdCQUFBO0FDRk47O0FETUU7RUFDRSxXQUFBO0VBQ0EsZUFBQTtBQ0hKIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vbGFuZ3VhZ2Utc2V0dGluZ3MvbGFuZ3VhZ2UtY3VycmVudC9sYW5ndWFnZS1jdXJyZW50LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWlue1xyXG4gICAgcGFkZGluZy1sZWZ0OiA1MHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogNTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAzMHB4O1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB3aWR0aDogNjB2dztcclxuICAgIG1hcmdpbjogMCUgYXV0b1xyXG59XHJcblxyXG4ubGFuZ3VhZ2Vze1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgd2lkdGg6IDUwJVxyXG59XHJcblxyXG4udGFie1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IGxpZ2h0Z3JheTtcclxuICAgIGZvbnQtc2l6ZTogbGFyZ2UgIWltcG9ydGFudDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG59XHJcblxyXG4ubGlzdC1oZWFkZXJ7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB3aWR0aDogNTMuNXZ3O1xyXG4gIH1cclxuICBcclxuLmxpc3QtY29udGFpbmVye1xyXG4gICAgbWFyZ2luLXRvcDogOTBweDtcclxuICAgIHdpZHRoOiA1MnZ3O1xyXG4gICAgaW9uLWdyaWR7XHJcbiAgICAgICAgaW9uLXJvd3tcclxuICAgICAgICBib3JkZXItYm90dG9tOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XHJcbiAgICAgICAgLy8gbWFyZ2luLWxlZnQ6IDV2dztcclxuICAgICAgICBpb24tY29se1xyXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLmYtZC1jIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBcclxuICAgIC5tLXMtYnRuIHtcclxuICAgICAgbWFyZ2luLXRvcDogMTVweDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5uYW1le1xyXG4gICAgd2lkdGg6IDYwdnc7XHJcbiAgICBtYXgtd2lkdGg6IDYwdnc7XHJcbiAgfSIsIi5tYWluIHtcbiAgcGFkZGluZy1sZWZ0OiA1MHB4O1xuICBwYWRkaW5nLXJpZ2h0OiA1MHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMzBweDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDYwdnc7XG4gIG1hcmdpbjogMCUgYXV0bztcbn1cblxuLmxhbmd1YWdlcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogNTAlO1xufVxuXG4udGFiIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGJvcmRlci1ib3R0b206IDFweCBsaWdodGdyYXk7XG4gIGZvbnQtc2l6ZTogbGFyZ2UgIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cblxuLmxpc3QtaGVhZGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogNTMuNXZ3O1xufVxuXG4ubGlzdC1jb250YWluZXIge1xuICBtYXJnaW4tdG9wOiA5MHB4O1xuICB3aWR0aDogNTJ2dztcbn1cbi5saXN0LWNvbnRhaW5lciBpb24tZ3JpZCBpb24tcm93IHtcbiAgYm9yZGVyLWJvdHRvbTogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xufVxuLmxpc3QtY29udGFpbmVyIGlvbi1ncmlkIGlvbi1yb3cgaW9uLWNvbCB7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbn1cblxuLmYtZC1jIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5mLWQtYyAubS1zLWJ0biB7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG59XG5cbi5uYW1lIHtcbiAgd2lkdGg6IDYwdnc7XG4gIG1heC13aWR0aDogNjB2dztcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/language-settings/language-current/language-current.page.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/admin/language-settings/language-current/language-current.page.ts ***!
  \***********************************************************************************/
/*! exports provided: LanguageCurrentPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguageCurrentPage", function() { return LanguageCurrentPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var src_app_services_language_language_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/language/language.service */ "./src/app/services/language/language.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");






let LanguageCurrentPage = class LanguageCurrentPage {
    constructor(labelService, router, events, loadingController, languageService, alertController) {
        this.labelService = labelService;
        this.router = router;
        this.events = events;
        this.loadingController = loadingController;
        this.languageService = languageService;
        this.alertController = alertController;
        this.headerText = '';
        this.languages = [];
        this.showLoader = true;
        this.currentIndex = 0;
    }
    onReorderLang(event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading('Please wait', 3000);
            const start = event.detail.from;
            // tslint:disable-next-line: variable-name
            const id = this.languages[start].id;
            const end = event.detail.to;
            if (start < end && end !== this.languages.length - 1) {
                const firstDate = this.languages[end].sortedAt.toDate().getTime();
                const secondDate = this.languages[end + 1].sortedAt.toDate().getTime();
                const changedDate = (firstDate + secondDate) / 2;
                this.languageService.updateLangPosition(id, new Date(changedDate));
            }
            // tslint:disable-next-line: one-line
            else if (start < end && end === this.languages.length - 1) {
                const changedDate = this.languages[end].sortedAt.toDate().getTime() - 5 * 60000;
                this.languageService.updateLangPosition(id, new Date(changedDate));
            }
            // tslint:disable-next-line: one-line
            else if (start > end && end !== 0) {
                const firstDate = this.languages[end].sortedAt.toDate().getTime();
                const secondDate = this.languages[end - 1].sortedAt.toDate().getTime();
                const changedDate = (firstDate + secondDate) / 2;
                this.languageService.updateLangPosition(id, new Date(changedDate));
            }
            // tslint:disable-next-line: one-line
            else {
                const changedDate = this.languages[end].sortedAt.toDate().getTime() + 5 * 60000;
                this.languageService.updateLangPosition(id, new Date(changedDate));
            }
            const draggedItem = this.languages.splice(event.detail.from, 1)[0];
            this.languages.splice(event.detail.to, 0, draggedItem);
            event.detail.complete();
        });
    }
    ngOnInit() {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.ALL_LANGUAGES_LABELS = this.labelService.labels['ALL_LANGUAGES'];
        this.headerText = this.ALL_LANGUAGES_LABELS['header_text'];
        this.initializeSubscriptions();
        this.events.publish('language:getAddedLanguages');
    }
    ngOnDestroy() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('language:publishAddedLanguages', (langs) => {
            this.languages = langs;
            this.showLoader = false;
        });
        this.events.subscribe('language:updateLangPostionSucess', () => {
            if (this.loading) {
                this.loading.dismiss();
            }
        });
        this.events.subscribe('language:makeDefaultSuccess', (id) => {
            if (this.loading) {
                this.loading.dismiss();
            }
            this.presentAlert(this.languages[this.currentIndex].langName + ' ' + this.ALL_LANGUAGES_LABELS['make_default_success_msg']);
        });
        this.events.subscribe('language:deleteLangSuccess', (id) => {
            if (this.loading) {
                this.loading.dismiss();
            }
            this.presentAlert(this.languages[this.currentIndex].langName + ' ' + this.ALL_LANGUAGES_LABELS['delete_lang_success_msg']);
        });
    }
    makeDefault(id, i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading('Please wait', 5000);
            this.currentIndex = i;
            this.events.publish('language:makeDefault', id, this.languages);
        });
    }
    deleteLang(id, i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading('Please wait', 5000);
            this.currentIndex = i;
            this.events.publish('language:deleteLang', id, this.languages);
        });
    }
    gotoLanguageAdd() {
        this.router.navigate(['language-add']);
    }
    presentLoading(msg, duration) {
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
                buttons: [`${this.SHARED_LABELS['ok']}`]
            });
            yield alert.present();
        });
    }
    removeSubscriptions() {
        this.events.unsubscribe('language:publishAddedLanguages');
        this.events.unsubscribe('language:updateLangPostionSucess');
        this.events.unsubscribe('language:makeDefaultSuccess');
        this.events.unsubscribe('language:deleteLangSuccess');
    }
};
LanguageCurrentPage.ctorParameters = () => [
    { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_5__["LabelService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: src_app_services_language_language_service__WEBPACK_IMPORTED_MODULE_1__["LanguageService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] }
];
LanguageCurrentPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"])({
        selector: 'app-language-current',
        template: __webpack_require__(/*! raw-loader!./language-current.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/language-settings/language-current/language-current.page.html"),
        styles: [__webpack_require__(/*! ./language-current.page.scss */ "./src/app/admin/language-settings/language-current/language-current.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_5__["LabelService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        src_app_services_language_language_service__WEBPACK_IMPORTED_MODULE_1__["LanguageService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]])
], LanguageCurrentPage);



/***/ })

}]);
//# sourceMappingURL=admin-language-settings-language-current-language-current-module-es2015.js.map