(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["homepage-homepage-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/homepage/homepage.page.html":
/*!***********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/homepage/homepage.page.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n<ion-content>\r\n\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/homepage/homepage.module.ts":
/*!*********************************************!*\
  !*** ./src/app/homepage/homepage.module.ts ***!
  \*********************************************/
/*! exports provided: HomepagePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomepagePageModule", function() { return HomepagePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _homepage_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./homepage.page */ "./src/app/homepage/homepage.page.ts");







var routes = [
    {
        path: '',
        component: _homepage_page__WEBPACK_IMPORTED_MODULE_6__["HomepagePage"]
    }
];
var HomepagePageModule = /** @class */ (function () {
    function HomepagePageModule() {
    }
    HomepagePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_homepage_page__WEBPACK_IMPORTED_MODULE_6__["HomepagePage"]]
        })
    ], HomepagePageModule);
    return HomepagePageModule;
}());



/***/ }),

/***/ "./src/app/homepage/homepage.page.scss":
/*!*********************************************!*\
  !*** ./src/app/homepage/homepage.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hvbWVwYWdlL2hvbWVwYWdlLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/homepage/homepage.page.ts":
/*!*******************************************!*\
  !*** ./src/app/homepage/homepage.page.ts ***!
  \*******************************************/
/*! exports provided: HomepagePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomepagePage", function() { return HomepagePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _home_home_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../home/home.page */ "./src/app/home/home.page.ts");
/* harmony import */ var _app_guide_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../app/guide.service */ "./src/app/guide.service.ts");





var HomepagePage = /** @class */ (function () {
    function HomepagePage(modalController, guideService) {
        this.modalController = modalController;
        this.guideService = guideService;
        this.openLoginModal();
    }
    HomepagePage.prototype.ngOnInit = function () {
        this.guideService.changeUrl("homepage");
    };
    HomepagePage.prototype.openLoginModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _home_home_page__WEBPACK_IMPORTED_MODULE_3__["HomePage"],
                            backdropDismiss: false,
                            cssClass: "custom-modal login-modal hide-close noRadios",
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomepagePage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _app_guide_service__WEBPACK_IMPORTED_MODULE_4__["GuideService"] }
    ]; };
    HomepagePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-homepage',
            template: __webpack_require__(/*! raw-loader!./homepage.page.html */ "./node_modules/raw-loader/index.js!./src/app/homepage/homepage.page.html"),
            styles: [__webpack_require__(/*! ./homepage.page.scss */ "./src/app/homepage/homepage.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"], _app_guide_service__WEBPACK_IMPORTED_MODULE_4__["GuideService"]])
    ], HomepagePage);
    return HomepagePage;
}());



/***/ })

}]);
//# sourceMappingURL=homepage-homepage-module-es5.js.map