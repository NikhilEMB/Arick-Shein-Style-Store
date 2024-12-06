(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["terms-privacy-terms-privacy-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/terms-privacy/terms-privacy.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/terms-privacy/terms-privacy.page.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button class=\"custom-back-button\">\r\n        <img src=\"assets/img/menu-icon-white.png\" class=\"menu-img\">\r\n      </ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title text-center>terms and privacy</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs no-shadow no-border>\r\n    <super-tabs-toolbar slot=\"top\">\r\n      <super-tab-button>\r\n        <ion-label>Terms</ion-label>    \r\n      </super-tab-button>\r\n      <super-tab-button>\r\n        <ion-label>Privacy</ion-label>    \r\n      </super-tab-button>\r\n    </super-tabs-toolbar>\r\n\r\n    <super-tabs-container>\r\n      <super-tab>\r\n        <ion-content class=\"ion-padding\">\r\n          <div [innerHtml]=\"termsContent\"></div>\r\n        </ion-content>\r\n      </super-tab>\r\n      <super-tab>\r\n        <ion-content class=\"ion-padding\">\r\n          <div [innerHtml]=\"privacyContent\"></div>\r\n        </ion-content>\r\n      </super-tab>\r\n    </super-tabs-container>\r\n  </super-tabs>"

/***/ }),

/***/ "./src/app/terms-privacy/terms-privacy.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/terms-privacy/terms-privacy.module.ts ***!
  \*******************************************************/
/*! exports provided: TermsPrivacyPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermsPrivacyPageModule", function() { return TermsPrivacyPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");
/* harmony import */ var _terms_privacy_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./terms-privacy.page */ "./src/app/terms-privacy/terms-privacy.page.ts");








var routes = [
    {
        path: '',
        component: _terms_privacy_page__WEBPACK_IMPORTED_MODULE_7__["TermsPrivacyPage"]
    }
];
var TermsPrivacyPageModule = /** @class */ (function () {
    function TermsPrivacyPageModule() {
    }
    TermsPrivacyPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_6__["SuperTabsModule"]
            ],
            declarations: [_terms_privacy_page__WEBPACK_IMPORTED_MODULE_7__["TermsPrivacyPage"]]
        })
    ], TermsPrivacyPageModule);
    return TermsPrivacyPageModule;
}());



/***/ }),

/***/ "./src/app/terms-privacy/terms-privacy.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/terms-privacy/terms-privacy.page.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Rlcm1zLXByaXZhY3kvdGVybXMtcHJpdmFjeS5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/terms-privacy/terms-privacy.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/terms-privacy/terms-privacy.page.ts ***!
  \*****************************************************/
/*! exports provided: TermsPrivacyPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermsPrivacyPage", function() { return TermsPrivacyPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");



var TermsPrivacyPage = /** @class */ (function () {
    function TermsPrivacyPage(events) {
        this.events = events;
        this.termsContent = '';
        this.privacyContent = '';
    }
    TermsPrivacyPage.prototype.ngOnInit = function () {
        this.initializeSubscriptions();
        this.events.publish('admin-settings:getTermsAndPrivacyData');
    };
    TermsPrivacyPage.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    TermsPrivacyPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('admin-settings:publishTermsAndPrivacyData', function (data) {
            if (data) {
                _this.termsContent = data.terms;
                _this.privacyContent = data.privacy;
            }
        });
    };
    TermsPrivacyPage.prototype.removeSubscriptions = function () {
        this.events.subscribe('admin-settings:publishTermsAndPrivacyData');
    };
    TermsPrivacyPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] }
    ]; };
    TermsPrivacyPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-terms-privacy',
            template: __webpack_require__(/*! raw-loader!./terms-privacy.page.html */ "./node_modules/raw-loader/index.js!./src/app/terms-privacy/terms-privacy.page.html"),
            styles: [__webpack_require__(/*! ./terms-privacy.page.scss */ "./src/app/terms-privacy/terms-privacy.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"]])
    ], TermsPrivacyPage);
    return TermsPrivacyPage;
}());



/***/ })

}]);
//# sourceMappingURL=terms-privacy-terms-privacy-module-es5.js.map