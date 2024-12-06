(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-widgets-widgets-list-widgets-list-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/widgets-list/widgets-list.page.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/widgets/widgets-list/widgets-list.page.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\" >Widgets</ion-title>\r\n    \r\n  </ion-toolbar>\r\n \r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n<ion-list class=\"widget-list\">\r\n  <ion-item>\r\n    <ion-label (click)=\"opneBannerWidget('banner-slider')\" detail>Banner Slider</ion-label>\r\n  </ion-item>\r\n  <ion-item>\r\n    <ion-label (click)=\"opneBannerWidget('image-banner')\" detail>Image Banner</ion-label>\r\n  </ion-item>\r\n  <ion-item>\r\n    <ion-label (click)=\"opneProductWidget('product-carousel')\" detail>Product Carousel</ion-label>\r\n  </ion-item>\r\n  <ion-item>\r\n    <ion-label (click)=\"opneProductWidget('product-list')\" detail>Product List</ion-label>\r\n  </ion-item>\r\n  <ion-item>\r\n    <ion-label (click)=\"opneWidget('image-block-list')\" detail>Image Block</ion-label>\r\n  </ion-item>\r\n  <ion-item>\r\n    <ion-label (click)=\"opneWidget('video-block-list')\" detail>Video Block</ion-label>\r\n  </ion-item>\r\n  <ion-item>\r\n    <ion-label (click)=\"opneWidget('text-block-list')\" detail>Text Block</ion-label>\r\n  </ion-item>\r\n</ion-list>\r\n</div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/pages/widgets/widgets-list/widgets-list.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/widgets/widgets-list/widgets-list.module.ts ***!
  \*******************************************************************/
/*! exports provided: WidgetsListPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetsListPageModule", function() { return WidgetsListPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _widgets_list_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./widgets-list.page */ "./src/app/pages/widgets/widgets-list/widgets-list.page.ts");







const routes = [
    {
        path: '',
        component: _widgets_list_page__WEBPACK_IMPORTED_MODULE_6__["WidgetsListPage"]
    }
];
let WidgetsListPageModule = class WidgetsListPageModule {
};
WidgetsListPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_widgets_list_page__WEBPACK_IMPORTED_MODULE_6__["WidgetsListPage"]]
    })
], WidgetsListPageModule);



/***/ }),

/***/ "./src/app/pages/widgets/widgets-list/widgets-list.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/pages/widgets/widgets-list/widgets-list.page.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3dpZGdldHMvd2lkZ2V0cy1saXN0L3dpZGdldHMtbGlzdC5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/widgets/widgets-list/widgets-list.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/widgets/widgets-list/widgets-list.page.ts ***!
  \*****************************************************************/
/*! exports provided: WidgetsListPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetsListPage", function() { return WidgetsListPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");



let WidgetsListPage = class WidgetsListPage {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    opneWidget(page) {
        console.log('goToPage', page);
        this.router.navigate([page]);
    }
    opneBannerWidget(type) {
        const navigationExtras = {
            queryParams: {
                type: type,
            }
        };
        this.router.navigate(['banner-slider-widgets-list'], navigationExtras);
    }
    opneProductWidget(type) {
        const navigationExtras = {
            queryParams: {
                type: type,
            }
        };
        this.router.navigate(['product-carousel-list'], navigationExtras);
    }
};
WidgetsListPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
WidgetsListPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-widgets-list',
        template: __webpack_require__(/*! raw-loader!./widgets-list.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/widgets-list/widgets-list.page.html"),
        styles: [__webpack_require__(/*! ./widgets-list.page.scss */ "./src/app/pages/widgets/widgets-list/widgets-list.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], WidgetsListPage);



/***/ })

}]);
//# sourceMappingURL=pages-widgets-widgets-list-widgets-list-module-es2015.js.map