(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["no-user-access-no-user-access-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/no-user-access/no-user-access.page.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/no-user-access/no-user-access.page.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n  \r\n  </ion-toolbar>\r\n  \r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container ion-text-center\">\r\n    <p class=\"ion-text-center\"><strong>You dont have access to view this page</strong></p>\r\n    <br>\r\n    <div class=\"m-t-16\">\r\n      <ion-button class=\"btn-1\" shape=\"round\" (click)=\"logout()\">\r\n        Sign out\r\n      </ion-button>\r\n    </div>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/no-user-access/no-user-access.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/no-user-access/no-user-access.module.ts ***!
  \*********************************************************/
/*! exports provided: NoUserAccessPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoUserAccessPageModule", function() { return NoUserAccessPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _no_user_access_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./no-user-access.page */ "./src/app/no-user-access/no-user-access.page.ts");







const routes = [
    {
        path: '',
        component: _no_user_access_page__WEBPACK_IMPORTED_MODULE_6__["NoUserAccessPage"]
    }
];
let NoUserAccessPageModule = class NoUserAccessPageModule {
};
NoUserAccessPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_no_user_access_page__WEBPACK_IMPORTED_MODULE_6__["NoUserAccessPage"]]
    })
], NoUserAccessPageModule);



/***/ }),

/***/ "./src/app/no-user-access/no-user-access.page.scss":
/*!*********************************************************!*\
  !*** ./src/app/no-user-access/no-user-access.page.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".img-wrap {\n  margin-top: 36px;\n  text-align: center;\n}\n.img-wrap img {\n  height: 100px;\n  width: auto;\n  margin-left: 16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbm8tdXNlci1hY2Nlc3MvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXG5vLXVzZXItYWNjZXNzXFxuby11c2VyLWFjY2Vzcy5wYWdlLnNjc3MiLCJzcmMvYXBwL25vLXVzZXItYWNjZXNzL25vLXVzZXItYWNjZXNzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0VBQ0Esa0JBQUE7QUNDSjtBREFJO0VBQ0ksYUFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtBQ0VSIiwiZmlsZSI6InNyYy9hcHAvbm8tdXNlci1hY2Nlc3Mvbm8tdXNlci1hY2Nlc3MucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmltZy13cmFwe1xyXG4gICAgbWFyZ2luLXRvcDogMzZweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGltZ3tcclxuICAgICAgICBoZWlnaHQ6IDEwMHB4O1xyXG4gICAgICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxNnB4O1xyXG4gICAgfVxyXG59IiwiLmltZy13cmFwIHtcbiAgbWFyZ2luLXRvcDogMzZweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLmltZy13cmFwIGltZyB7XG4gIGhlaWdodDogMTAwcHg7XG4gIHdpZHRoOiBhdXRvO1xuICBtYXJnaW4tbGVmdDogMTZweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/no-user-access/no-user-access.page.ts":
/*!*******************************************************!*\
  !*** ./src/app/no-user-access/no-user-access.page.ts ***!
  \*******************************************************/
/*! exports provided: NoUserAccessPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoUserAccessPage", function() { return NoUserAccessPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");



let NoUserAccessPage = class NoUserAccessPage {
    constructor(events) {
        this.events = events;
    }
    ngOnInit() {
    }
    logout() {
        this.events.publish('auth:logout');
    }
};
NoUserAccessPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] }
];
NoUserAccessPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-no-user-access',
        template: __webpack_require__(/*! raw-loader!./no-user-access.page.html */ "./node_modules/raw-loader/index.js!./src/app/no-user-access/no-user-access.page.html"),
        styles: [__webpack_require__(/*! ./no-user-access.page.scss */ "./src/app/no-user-access/no-user-access.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"]])
], NoUserAccessPage);



/***/ })

}]);
//# sourceMappingURL=no-user-access-no-user-access-module-es2015.js.map