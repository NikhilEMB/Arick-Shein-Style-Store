(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-widgets-widget-banner-slider-banners-list-banners-list-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/widget-banner-slider/banners-list/banners-list.page.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/widgets/widget-banner-slider/banners-list/banners-list.page.html ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\" >Banners</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"addNewSlide()\">\r\n      <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n      Add new Slide\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n\r\n  <ion-content>\r\n    <div class=\"main-container\">\r\n  <ion-list class=\"widget-list\">\r\n    <ion-item>\r\n      <ion-label detail>Banner Slider</ion-label>\r\n    </ion-item>\r\n  </ion-list>\r\n  </div>\r\n  </ion-content>\r\n  \r\n"

/***/ }),

/***/ "./src/app/pages/widgets/widget-banner-slider/banners-list/banners-list.module.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/pages/widgets/widget-banner-slider/banners-list/banners-list.module.ts ***!
  \****************************************************************************************/
/*! exports provided: BannersListPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannersListPageModule", function() { return BannersListPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _banners_list_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./banners-list.page */ "./src/app/pages/widgets/widget-banner-slider/banners-list/banners-list.page.ts");







var routes = [
    {
        path: '',
        component: _banners_list_page__WEBPACK_IMPORTED_MODULE_6__["BannersListPage"]
    }
];
var BannersListPageModule = /** @class */ (function () {
    function BannersListPageModule() {
    }
    BannersListPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_banners_list_page__WEBPACK_IMPORTED_MODULE_6__["BannersListPage"]]
        })
    ], BannersListPageModule);
    return BannersListPageModule;
}());



/***/ }),

/***/ "./src/app/pages/widgets/widget-banner-slider/banners-list/banners-list.page.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/pages/widgets/widget-banner-slider/banners-list/banners-list.page.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3dpZGdldHMvd2lkZ2V0LWJhbm5lci1zbGlkZXIvYmFubmVycy1saXN0L2Jhbm5lcnMtbGlzdC5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/widgets/widget-banner-slider/banners-list/banners-list.page.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/pages/widgets/widget-banner-slider/banners-list/banners-list.page.ts ***!
  \**************************************************************************************/
/*! exports provided: BannersListPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannersListPage", function() { return BannersListPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");



var BannersListPage = /** @class */ (function () {
    function BannersListPage(events) {
        this.events = events;
    }
    BannersListPage.prototype.ngOnInit = function () {
    };
    BannersListPage.prototype.ionViewWillEnter = function () {
    };
    BannersListPage.prototype.addNewSlide = function () {
    };
    BannersListPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] }
    ]; };
    BannersListPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-banners-list',
            template: __webpack_require__(/*! raw-loader!./banners-list.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/widget-banner-slider/banners-list/banners-list.page.html"),
            styles: [__webpack_require__(/*! ./banners-list.page.scss */ "./src/app/pages/widgets/widget-banner-slider/banners-list/banners-list.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"]])
    ], BannersListPage);
    return BannersListPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-widgets-widget-banner-slider-banners-list-banners-list-module-es5.js.map