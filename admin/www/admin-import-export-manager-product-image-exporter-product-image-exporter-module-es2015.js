(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-import-export-manager-product-image-exporter-product-image-exporter-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/product-image-exporter/product-image-exporter.page.html":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/import-export-manager/product-image-exporter/product-image-exporter.page.html ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons style=\"margin-left: -8px;\" slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-menu-button style=\"margin-left: 8px;\" slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Product Bulk Image Exporter</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/import-export-manager/product-image-exporter/product-image-exporter.module.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/product-image-exporter/product-image-exporter.module.ts ***!
  \*****************************************************************************************************/
/*! exports provided: ProductImageExporterPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductImageExporterPageModule", function() { return ProductImageExporterPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _product_image_exporter_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product-image-exporter.page */ "./src/app/admin/import-export-manager/product-image-exporter/product-image-exporter.page.ts");







const routes = [
    {
        path: '',
        component: _product_image_exporter_page__WEBPACK_IMPORTED_MODULE_6__["ProductImageExporterPage"]
    }
];
let ProductImageExporterPageModule = class ProductImageExporterPageModule {
};
ProductImageExporterPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_product_image_exporter_page__WEBPACK_IMPORTED_MODULE_6__["ProductImageExporterPage"]]
    })
], ProductImageExporterPageModule);



/***/ }),

/***/ "./src/app/admin/import-export-manager/product-image-exporter/product-image-exporter.page.scss":
/*!*****************************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/product-image-exporter/product-image-exporter.page.scss ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2ltcG9ydC1leHBvcnQtbWFuYWdlci9wcm9kdWN0LWltYWdlLWV4cG9ydGVyL3Byb2R1Y3QtaW1hZ2UtZXhwb3J0ZXIucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/admin/import-export-manager/product-image-exporter/product-image-exporter.page.ts":
/*!***************************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/product-image-exporter/product-image-exporter.page.ts ***!
  \***************************************************************************************************/
/*! exports provided: ProductImageExporterPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductImageExporterPage", function() { return ProductImageExporterPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ProductImageExporterPage = class ProductImageExporterPage {
    constructor() { }
    ngOnInit() {
    }
};
ProductImageExporterPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-product-image-exporter',
        template: __webpack_require__(/*! raw-loader!./product-image-exporter.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/product-image-exporter/product-image-exporter.page.html"),
        styles: [__webpack_require__(/*! ./product-image-exporter.page.scss */ "./src/app/admin/import-export-manager/product-image-exporter/product-image-exporter.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], ProductImageExporterPage);



/***/ })

}]);
//# sourceMappingURL=admin-import-export-manager-product-image-exporter-product-image-exporter-module-es2015.js.map