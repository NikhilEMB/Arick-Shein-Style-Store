(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-services-request-complete-request-complete-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-services/request-complete/request-complete.page.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-services/request-complete/request-complete.page.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\" defaultHref=\"admin-home\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    \r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content *ngIf=\"requestData\">\r\n  <div class=\"main-container\">\r\n  <app-service-details [request]=\"requestData\"></app-service-details>\r\n</div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/admin-services/request-complete/request-complete.module.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/admin/admin-services/request-complete/request-complete.module.ts ***!
  \**********************************************************************************/
/*! exports provided: RequestCompletePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestCompletePageModule", function() { return RequestCompletePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/shared.module */ "./src/app/components/shared.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _request_complete_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./request-complete.page */ "./src/app/admin/admin-services/request-complete/request-complete.page.ts");








const routes = [
    {
        path: '',
        component: _request_complete_page__WEBPACK_IMPORTED_MODULE_7__["RequestCompletePage"]
    }
];
let RequestCompletePageModule = class RequestCompletePageModule {
};
RequestCompletePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild(routes),
            src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"]
        ],
        declarations: [_request_complete_page__WEBPACK_IMPORTED_MODULE_7__["RequestCompletePage"]]
    })
], RequestCompletePageModule);



/***/ }),

/***/ "./src/app/admin/admin-services/request-complete/request-complete.page.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/admin/admin-services/request-complete/request-complete.page.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2FkbWluLXNlcnZpY2VzL3JlcXVlc3QtY29tcGxldGUvcmVxdWVzdC1jb21wbGV0ZS5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/admin/admin-services/request-complete/request-complete.page.ts":
/*!********************************************************************************!*\
  !*** ./src/app/admin/admin-services/request-complete/request-complete.page.ts ***!
  \********************************************************************************/
/*! exports provided: RequestCompletePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestCompletePage", function() { return RequestCompletePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");



let RequestCompletePage = class RequestCompletePage {
    constructor(route, router) {
        this.route = route;
        this.router = router;
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.requestData = this.router.getCurrentNavigation().extras.state.requestData;
            }
        });
    }
    ngOnInit() {
    }
};
RequestCompletePage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
RequestCompletePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-request-complete',
        template: __webpack_require__(/*! raw-loader!./request-complete.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-services/request-complete/request-complete.page.html"),
        styles: [__webpack_require__(/*! ./request-complete.page.scss */ "./src/app/admin/admin-services/request-complete/request-complete.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], RequestCompletePage);



/***/ })

}]);
//# sourceMappingURL=admin-admin-services-request-complete-request-complete-module-es2015.js.map