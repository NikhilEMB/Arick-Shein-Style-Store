(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-support-support-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/support/support.page.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/support/support.page.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Support</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"solid\" color=\"secondary\">\r\n      <span class=\"icon\" slot=\"start\">\r\n        <i class=\"flaticon-null\" slot=\"start\"></i>\r\n        <span class=\"count\">5</span>\r\n      </span>\r\n    </ion-button>\r\n    <ion-button fill=\"solid\" color=\"secondary\">\r\n      <span class=\"icon\" slot=\"start\">\r\n        <i class=\"flaticon-shopping-bag\" slot=\"start\"></i>\r\n        <span class=\"count\">2</span>\r\n      </span>\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n\r\n  <div *ngIf=\"showLoader; else showSupportContent\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n  <ng-template #showSupportContent>\r\n    <div class=\"container ion-padding\">\r\n      <div class=\"org-info\">\r\n        <img src=\"assets/img/bwi-logo.png\" class=\"bwi-logo\">\r\n        <br>\r\n        <ion-button (click)=\"callSupport()\" class=\"call-btn\">\r\n          Call: {{supportPhone}}\r\n        </ion-button>\r\n      </div>\r\n\r\n      <div class=\"sections\">\r\n        <h6>Plan Description:</h6>\r\n        <p [innerHtml]=\"planDesc\"></p>\r\n      </div>\r\n\r\n      <div class=\"sections\">\r\n        <h6>Plan Start Date:</h6>\r\n        <p>{{planStartDate.toDate() | date}}</p>\r\n      </div>\r\n\r\n      <div class=\"sections\">\r\n        <h6>Address:</h6>\r\n        <p>\r\n          651, 6<sup>th</sup> Floor, Aggarwal Metro Heights, Netaji Subash Palace, Pitampura, New Delhi, India-110034\r\n        </p>\r\n      </div>\r\n\r\n      <div class=\"copyright-info\">\r\n        <p>This app is a product of <strong>Build with Innovation Private Limited</strong></p>\r\n        <p class=\"copyright-line\">&#169;2020 Build with Innovation Private Limited</p>\r\n      </div>\r\n\r\n    </div>\r\n  </ng-template>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/support/support.module.ts":
/*!*************************************************!*\
  !*** ./src/app/admin/support/support.module.ts ***!
  \*************************************************/
/*! exports provided: SupportPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupportPageModule", function() { return SupportPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _support_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./support.page */ "./src/app/admin/support/support.page.ts");







var routes = [
    {
        path: '',
        component: _support_page__WEBPACK_IMPORTED_MODULE_6__["SupportPage"]
    }
];
var SupportPageModule = /** @class */ (function () {
    function SupportPageModule() {
    }
    SupportPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_support_page__WEBPACK_IMPORTED_MODULE_6__["SupportPage"]]
        })
    ], SupportPageModule);
    return SupportPageModule;
}());



/***/ }),

/***/ "./src/app/admin/support/support.page.scss":
/*!*************************************************!*\
  !*** ./src/app/admin/support/support.page.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n  text-align: justify;\n}\n\n.org-info {\n  text-align: center;\n}\n\np {\n  font-size: 15px;\n  margin-top: 0px;\n}\n\nh6 {\n  font-size: 14px;\n  font-weight: 600;\n}\n\n.bwi-logo {\n  width: 200px;\n}\n\n.call-btn {\n  --background: var(--ion-color-success);\n  margin: 0px 0px 10% 0px;\n}\n\n.sections {\n  margin: 0px 0px 10% 0px;\n}\n\n.spinner {\n  text-align: center;\n  margin-top: 50%;\n}\n\n.copyright-info {\n  text-align: center;\n}\n\n.copyright-line {\n  font-size: 12px;\n  opacity: 0.6;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vc3VwcG9ydC9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXHN1cHBvcnRcXHN1cHBvcnQucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9zdXBwb3J0L3N1cHBvcnQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksbUJBQUE7QUNDSjs7QURDQTtFQUNJLGtCQUFBO0FDRUo7O0FEQ0E7RUFDSSxlQUFBO0VBQ0EsZUFBQTtBQ0VKOztBRENBO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0FDRUo7O0FEQ0E7RUFDSSxZQUFBO0FDRUo7O0FEQ0E7RUFDSSxzQ0FBQTtFQUNBLHVCQUFBO0FDRUo7O0FEQ0E7RUFDSSx1QkFBQTtBQ0VKOztBRENBO0VBQ0ksa0JBQUE7RUFDQSxlQUFBO0FDRUo7O0FEQ0E7RUFDSSxrQkFBQTtBQ0VKOztBRENBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7QUNFSiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3N1cHBvcnQvc3VwcG9ydC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyIHtcclxuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XHJcbn1cclxuLm9yZy1pbmZvIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxucCB7XHJcbiAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICBtYXJnaW4tdG9wOiAwcHg7XHJcbn1cclxuXHJcbmg2IHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcbi5id2ktbG9nbyB7XHJcbiAgICB3aWR0aDogMjAwcHg7XHJcbn1cclxuXHJcbi5jYWxsLWJ0biB7XHJcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxuICAgIG1hcmdpbjogMHB4IDBweCAxMCUgMHB4O1xyXG59XHJcblxyXG4uc2VjdGlvbnMge1xyXG4gICAgbWFyZ2luOiAwcHggMHB4IDEwJSAwcHg7XHJcbn1cclxuXHJcbi5zcGlubmVye1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbWFyZ2luLXRvcDogNTAlO1xyXG59XHJcblxyXG4uY29weXJpZ2h0LWluZm8ge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uY29weXJpZ2h0LWxpbmUge1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgb3BhY2l0eTogLjY7XHJcbn0iLCIuY29udGFpbmVyIHtcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbn1cblxuLm9yZy1pbmZvIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5wIHtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBtYXJnaW4tdG9wOiAwcHg7XG59XG5cbmg2IHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uYndpLWxvZ28ge1xuICB3aWR0aDogMjAwcHg7XG59XG5cbi5jYWxsLWJ0biB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICBtYXJnaW46IDBweCAwcHggMTAlIDBweDtcbn1cblxuLnNlY3Rpb25zIHtcbiAgbWFyZ2luOiAwcHggMHB4IDEwJSAwcHg7XG59XG5cbi5zcGlubmVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tdG9wOiA1MCU7XG59XG5cbi5jb3B5cmlnaHQtaW5mbyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmNvcHlyaWdodC1saW5lIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBvcGFjaXR5OiAwLjY7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/support/support.page.ts":
/*!***********************************************!*\
  !*** ./src/app/admin/support/support.page.ts ***!
  \***********************************************/
/*! exports provided: SupportPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupportPage", function() { return SupportPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");




var SupportPage = /** @class */ (function () {
    function SupportPage(//private callNumber: CallNumber,
    events, configService) {
        this.events = events;
        this.configService = configService;
        this.showLoader = true;
    }
    SupportPage.prototype.ngOnInit = function () {
        this.initializeSubscriptions();
        this.supportPhone = this.configService.environment.supportPhone;
        this.events.publish('admin-settings:getPlanDetails');
    };
    SupportPage.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    SupportPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('admin-settings:publishPlanDetails', function (data) {
            if (data) {
                _this.planDesc = data.description;
                _this.planStartDate = data.startDate;
            }
            _this.showLoader = false;
        });
    };
    SupportPage.prototype.callSupport = function () {
        /* this.callNumber.callNumber(this.supportPhone, true)
         .then(res =>  console.log('Launched dialer!', res))
         .catch(err =>  console.log('Error launching dialer', err));*/
    };
    SupportPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('admin-settings:publishPlanDetails');
    };
    SupportPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_3__["ConfigService"] }
    ]; };
    SupportPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-support',
            template: __webpack_require__(/*! raw-loader!./support.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/support/support.page.html"),
            styles: [__webpack_require__(/*! ./support.page.scss */ "./src/app/admin/support/support.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_3__["ConfigService"]])
    ], SupportPage);
    return SupportPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-support-support-module-es5.js.map