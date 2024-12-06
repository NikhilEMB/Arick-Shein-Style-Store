(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-sample-homepage-sample-homepage-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/sample-homepage/sample-homepage.page.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/sample-homepage/sample-homepage.page.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">Sample Designs</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <super-tabs no-shadow no-border>\r\n    <super-tabs-toolbar slot=\"top\">\r\n      <super-tab-button>\r\n        <ion-label>Grocery</ion-label>\r\n      </super-tab-button>\r\n      <super-tab-button>\r\n        <ion-label>Fashion</ion-label>\r\n      </super-tab-button>\r\n    </super-tabs-toolbar>\r\n\r\n    <super-tabs-container>\r\n      <super-tab>\r\n        <ion-content class=\"sub-list-content\">\r\n            <div class=\"main-container\" style=\"text-align: center\">\r\n                <p>Website</p>\r\n                <video class=\"videoPlayerWeb\" controls>\r\n                  <source src=\"https://firebasestorage.googleapis.com/v0/b/bwi-catalog.appspot.com/o/videos%2Fdemo%2Fgrocery%2Fgrocery-web-demo.mp4?alt=media&token=a0ad6db5-527a-468c-aaa8-071f87643624\" type=\"video/mp4\">\r\n                </video>  \r\n                <br><br>\r\n                <p>App</p>\r\n                <video class=\"videoPlayerApp\" controls>\r\n                  <source src=\"https://firebasestorage.googleapis.com/v0/b/bwi-catalog.appspot.com/o/videos%2Fdemo%2Fgrocery%2Fgrocery-app-demo.mp4?alt=media&token=cd84a474-041d-4ce2-9135-6fc1d6c81278\" type=\"video/mp4\">\r\n                </video>                  \r\n            </div>\r\n        </ion-content>\r\n      </super-tab>\r\n      <super-tab>\r\n        <ion-content class=\"sub-list-content\">\r\n            <div class=\"main-container\" style=\"text-align: center\">\r\n                <p>Website</p>\r\n                <video class=\"videoPlayerWeb\" controls>\r\n                  <source src=\"https://firebasestorage.googleapis.com/v0/b/bwi-catalog.appspot.com/o/videos%2Fdemo%2Ffashion%2Ffashion-web-demo.mp4?alt=media&token=a4c20401-a25c-4372-85db-2c2385bb1641\" type=\"video/mp4\">\r\n                </video>  \r\n                <br><br>\r\n                <p>App</p>\r\n                <video class=\"videoPlayerApp\" controls>\r\n                  <source src=\"https://firebasestorage.googleapis.com/v0/b/bwi-catalog.appspot.com/o/videos%2Fdemo%2Ffashion%2Ffashion-app-demo.mp4?alt=media&token=4ec024bb-28d2-4360-beed-5e0f54886eaa\" type=\"video/mp4\">\r\n                </video>                  \r\n            </div>\r\n        </ion-content>\r\n      </super-tab>\r\n    </super-tabs-container>\r\n  </super-tabs>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/sample-homepage/sample-homepage.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/admin/sample-homepage/sample-homepage.module.ts ***!
  \*****************************************************************/
/*! exports provided: SampleHomepagePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SampleHomepagePageModule", function() { return SampleHomepagePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _sample_homepage_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sample-homepage.page */ "./src/app/admin/sample-homepage/sample-homepage.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm2015/ionic-super-tabs-angular.js");








const routes = [
    {
        path: '',
        component: _sample_homepage_page__WEBPACK_IMPORTED_MODULE_6__["SampleHomepagePage"]
    }
];
let SampleHomepagePageModule = class SampleHomepagePageModule {
};
SampleHomepagePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"]
        ],
        declarations: [_sample_homepage_page__WEBPACK_IMPORTED_MODULE_6__["SampleHomepagePage"]]
    })
], SampleHomepagePageModule);



/***/ }),

/***/ "./src/app/admin/sample-homepage/sample-homepage.page.scss":
/*!*****************************************************************!*\
  !*** ./src/app/admin/sample-homepage/sample-homepage.page.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".videoPlayerWeb {\n  margin-top: 10px;\n  height: 40vh;\n  width: 60vw;\n}\n\n.videoPlayerApp {\n  margin-top: 10px;\n  height: 60vh;\n  width: 20vw;\n}\n\np {\n  font-size: 16px;\n  font-weight: 500;\n  text-decoration: underline;\n  -webkit-text-decoration-color: blue;\n          text-decoration-color: blue;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vc2FtcGxlLWhvbWVwYWdlL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcc2FtcGxlLWhvbWVwYWdlXFxzYW1wbGUtaG9tZXBhZ2UucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9zYW1wbGUtaG9tZXBhZ2Uvc2FtcGxlLWhvbWVwYWdlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUNDSjs7QURFQTtFQUNJLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDBCQUFBO0VBQ0EsbUNBQUE7VUFBQSwyQkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vc2FtcGxlLWhvbWVwYWdlL3NhbXBsZS1ob21lcGFnZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudmlkZW9QbGF5ZXJXZWJ7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgaGVpZ2h0OiA0MHZoO1xyXG4gICAgd2lkdGg6IDYwdndcclxufVxyXG5cclxuLnZpZGVvUGxheWVyQXBwe1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIGhlaWdodDogNjB2aDtcclxuICAgIHdpZHRoOiAyMHZ3XHJcbn1cclxuXHJcbnB7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbiAgICB0ZXh0LWRlY29yYXRpb24tY29sb3I6IGJsdWVcclxufSIsIi52aWRlb1BsYXllcldlYiB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIGhlaWdodDogNDB2aDtcbiAgd2lkdGg6IDYwdnc7XG59XG5cbi52aWRlb1BsYXllckFwcCB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIGhlaWdodDogNjB2aDtcbiAgd2lkdGg6IDIwdnc7XG59XG5cbnAge1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICB0ZXh0LWRlY29yYXRpb24tY29sb3I6IGJsdWU7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/sample-homepage/sample-homepage.page.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/sample-homepage/sample-homepage.page.ts ***!
  \***************************************************************/
/*! exports provided: SampleHomepagePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SampleHomepagePage", function() { return SampleHomepagePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let SampleHomepagePage = class SampleHomepagePage {
    constructor() { }
    ngOnInit() {
    }
};
SampleHomepagePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-sample-homepage',
        template: __webpack_require__(/*! raw-loader!./sample-homepage.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/sample-homepage/sample-homepage.page.html"),
        styles: [__webpack_require__(/*! ./sample-homepage.page.scss */ "./src/app/admin/sample-homepage/sample-homepage.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], SampleHomepagePage);



/***/ })

}]);
//# sourceMappingURL=admin-sample-homepage-sample-homepage-module-es2015.js.map