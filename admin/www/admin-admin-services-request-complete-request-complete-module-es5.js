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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _request_complete_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./request-complete.page */ "./src/app/admin/admin-services/request-complete/request-complete.page.ts");








var routes = [
    {
        path: '',
        component: _request_complete_page__WEBPACK_IMPORTED_MODULE_7__["RequestCompletePage"]
    }
];
var RequestCompletePageModule = /** @class */ (function () {
    function RequestCompletePageModule() {
    }
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
    return RequestCompletePageModule;
}());



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var RequestCompletePage = /** @class */ (function () {
    function RequestCompletePage(route, router) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.route.queryParams.subscribe(function (params) {
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.requestData = _this.router.getCurrentNavigation().extras.state.requestData;
            }
        });
    }
    RequestCompletePage.prototype.ngOnInit = function () {
    };
    RequestCompletePage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
    ]; };
    RequestCompletePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-request-complete',
            template: __webpack_require__(/*! raw-loader!./request-complete.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-services/request-complete/request-complete.page.html"),
            styles: [__webpack_require__(/*! ./request-complete.page.scss */ "./src/app/admin/admin-services/request-complete/request-complete.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], RequestCompletePage);
    return RequestCompletePage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-services-request-complete-request-complete-module-es5.js.map