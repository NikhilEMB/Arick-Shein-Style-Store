(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-plan-payments-plan-payments-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/plan-payments/plan-payments.page.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/plan-payments/plan-payments.page.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Plans and Payments</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs no-shadow no-border>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Plan Details</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Do Payment</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Payment History</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n  <super-tabs-container swipeEnabled=\"false\">\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <br>\r\n          <div style=\"display: flex; padding-left: 62px; padding-right: 62px; justify-content: space-around;\">\r\n            <strong>Current Plan : </strong><p>(Plus Plan)</p>\r\n            <br>\r\n            <strong>Due Amount : </strong><p>Rs 500</p>\r\n            <br>\r\n            <strong>Due Date : </strong><p>31/12/2020</p>\r\n          </div>\r\n          <br>\r\n          <div id=\"rowDisplay\" style=\"justify-content: center\">\r\n            <button (click)=\"gotoCompletePayment()\" style=\"margin-left: 0px\">Pay Now</button>\r\n          </div>\r\n          <br>\r\n          <div id=\"container\">\r\n              <strong>Select Plans & Add Ons</strong>\r\n          </div>\r\n            <br>\r\n            <div id=\"rowDisplayCard\">\r\n              <div>\r\n                <ion-card id=\"plan\">\r\n                  <ion-card-header>\r\n                    <ion-card-title>Lite</ion-card-title>\r\n                  </ion-card-header>\r\n                \r\n                  <ion-card-content>\r\n                    <p>Rs {{liteAmount}} / year</p>\r\n                  </ion-card-content>\r\n            \r\n                  <ion-footer>\r\n                    <ion-toolbar>\r\n                      <p (click)=\"gotoDetails('lite')\">More Details</p>\r\n                    </ion-toolbar>\r\n                  </ion-footer>\r\n                </ion-card>\r\n                <button (click)=\"changeAmount('lite')\">Select</button>\r\n              </div>\r\n              <div>\r\n                <ion-card id=\"plan\">\r\n                  <ion-card-header>\r\n                    <ion-card-title>Plus</ion-card-title>\r\n                  </ion-card-header>\r\n                \r\n                  <ion-card-content>\r\n                    <p>Rs {{plusAmount}} / year</p>\r\n                  </ion-card-content>\r\n            \r\n                  <ion-footer>\r\n                    <ion-toolbar>\r\n                      <p (click)=\"gotoDetails('plus')\">More Details</p>\r\n                    </ion-toolbar>\r\n                  </ion-footer>\r\n                </ion-card>\r\n                <button (click)=\"changeAmount('plus')\">Select</button>\r\n              </div>\r\n              <div>\r\n                <ion-card id=\"plan\">\r\n                  <ion-card-header>\r\n                    <ion-card-title>Premium</ion-card-title>\r\n                  </ion-card-header>\r\n                \r\n                  <ion-card-content>\r\n                    <p>Rs {{premiumAmount}} / year</p>\r\n                  </ion-card-content>\r\n            \r\n                  <ion-footer>\r\n                    <ion-toolbar>\r\n                      <p (click)=\"gotoDetails('premium')\">More Details</p>\r\n                    </ion-toolbar>\r\n                  </ion-footer>\r\n                </ion-card>\r\n                <button (click)=\"changeAmount('premium')\">Select</button>\r\n              </div>\r\n            </div>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <br>\r\n          <strong>Amount</strong>\r\n          <ion-input type=\"number\" class=\"form-input\" placeholder=\"Enter amount to pay\"></ion-input>\r\n          <div id=\"rowDisplay\" style=\"justify-content: center\">\r\n            <button (click)=\"gotoCompletePayment()\" style=\"margin-left: 0px\">Continue to Payment</button>\r\n          </div>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <ion-card>\r\n            <ion-card-content id=\"purchaseDetails\">\r\n              <div>\r\n                <p>Amount : Rs 5,000</p>\r\n                <p>Date : 10/11/2020</p>\r\n                <p>Plan Purchased</p>\r\n              </div>\r\n              <div>\r\n                <p><ion-icon name=\"checkmark-circle-outline\"></ion-icon> Success</p>\r\n                <button><ion-icon name=\"arrow-down-outline\"></ion-icon>Invoice</button>\r\n              </div>\r\n            </ion-card-content>\r\n          </ion-card>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n  </super-tabs-container> \r\n</super-tabs>\r\n"

/***/ }),

/***/ "./src/app/admin/plan-payments/plan-payments.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/admin/plan-payments/plan-payments.module.ts ***!
  \*************************************************************/
/*! exports provided: PlanPaymentsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanPaymentsPageModule", function() { return PlanPaymentsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");
/* harmony import */ var _plan_payments_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plan-payments.page */ "./src/app/admin/plan-payments/plan-payments.page.ts");








var routes = [
    {
        path: '',
        component: _plan_payments_page__WEBPACK_IMPORTED_MODULE_7__["PlanPaymentsPage"]
    }
];
var PlanPaymentsPageModule = /** @class */ (function () {
    function PlanPaymentsPageModule() {
    }
    PlanPaymentsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_6__["SuperTabsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_plan_payments_page__WEBPACK_IMPORTED_MODULE_7__["PlanPaymentsPage"]]
        })
    ], PlanPaymentsPageModule);
    return PlanPaymentsPageModule;
}());



/***/ }),

/***/ "./src/app/admin/plan-payments/plan-payments.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/admin/plan-payments/plan-payments.page.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#container {\n  margin-top: 20px;\n  text-align: center;\n}\n\n#container strong {\n  font-size: 20px;\n  line-height: 26px;\n}\n\n#container p {\n  font-size: 16px;\n  line-height: 22px;\n  color: #8c8c8c;\n  margin: 0;\n}\n\n#container a {\n  text-decoration: none;\n}\n\n#rowDisplayCard {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n  margin-top: 20px;\n  padding-bottom: 15px;\n}\n\n#rowDisplay {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  margin: 1rem auto;\n  margin-bottom: -10px;\n}\n\n#plan {\n  width: 300px;\n  text-align: center;\n}\n\nion-card ion-card-title {\n  font-size: 14px;\n}\n\nbutton {\n  border: 1px solid black;\n  padding: 5px;\n  margin-top: 20px;\n  margin-left: 150px;\n}\n\n#details {\n  font-size: 16px;\n  font-weight: 500;\n}\n\n#continue {\n  border: 1px solid black;\n  background: white;\n  padding: 5px;\n  margin: 1rem auto;\n  width: 200px;\n}\n\n#back {\n  margin-left: 10px;\n}\n\n#features {\n  position: absolute;\n  display: none;\n  text-align: center;\n  left: 30%;\n  top: 10%;\n  z-index: 999;\n  background: white;\n  width: 40vw;\n  height: -webkit-fit-content;\n  height: -moz-fit-content;\n  height: fit-content;\n  border: 1px solid;\n  padding: 15px;\n  box-shadow: 5px 10px 18px #888888;\n}\n\n#purchaseDetails {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  color: black;\n  font-size: 16px;\n}\n\nion-card-content button {\n  border: 1px solid black;\n  background: white;\n  padding-left: 10px;\n  padding-right: 10px;\n  padding-top: 5px;\n  padding-bottom: 5px;\n  display: -webkit-box;\n  display: flex;\n  justify-content: space-around;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vcGxhbi1wYXltZW50cy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXHBsYW4tcGF5bWVudHNcXHBsYW4tcGF5bWVudHMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9wbGFuLXBheW1lbnRzL3BsYW4tcGF5bWVudHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksZUFBQTtFQUNBLGlCQUFBO0FDQ0o7O0FERUE7RUFDSSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsU0FBQTtBQ0NKOztBREVBO0VBQ0kscUJBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO1VBQUEsNkJBQUE7RUFDQSxnQkFBQTtFQUNBLG9CQUFBO0FDQ0o7O0FER0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtBQ0FKOztBREdBO0VBQ0ksWUFBQTtFQUNBLGtCQUFBO0FDQUo7O0FER0E7RUFDSSxlQUFBO0FDQUo7O0FER0E7RUFDSSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FDQUo7O0FER0E7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7QUNBSjs7QURHQTtFQUNJLHVCQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0FDQUo7O0FER0E7RUFDSSxpQkFBQTtBQ0FKOztBREdBO0VBQ0ksa0JBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLFdBQUE7RUFDQSwyQkFBQTtFQUFBLHdCQUFBO0VBQUEsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxpQ0FBQTtBQ0FKOztBREdBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FDQUo7O0FER0E7RUFDSSx1QkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw2QkFBQTtBQ0FKIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vcGxhbi1wYXltZW50cy9wbGFuLXBheW1lbnRzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNjb250YWluZXIge1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlclxyXG59XHJcbiAgXHJcbiNjb250YWluZXIgc3Ryb25nIHtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAyNnB4XHJcbn1cclxuICBcclxuI2NvbnRhaW5lciBwIHtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAyMnB4O1xyXG4gICAgY29sb3I6ICM4YzhjOGM7XHJcbiAgICBtYXJnaW46IDA7XHJcbn1cclxuICBcclxuI2NvbnRhaW5lciBhIHtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG5cclxuI3Jvd0Rpc3BsYXlDYXJkIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMTVweDtcclxufVxyXG5cclxuXHJcbiNyb3dEaXNwbGF5IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBtYXJnaW46IDFyZW0gYXV0bztcclxuICAgIG1hcmdpbi1ib3R0b206IC0xMHB4XHJcbn1cclxuXHJcbiNwbGFuIHtcclxuICAgIHdpZHRoOiAzMDBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlclxyXG59XHJcblxyXG5pb24tY2FyZCBpb24tY2FyZC10aXRsZSB7XHJcbiAgICBmb250LXNpemU6IDE0cHhcclxufVxyXG5cclxuYnV0dG9uIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAxNTBweFxyXG59XHJcblxyXG4jZGV0YWlscyB7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBmb250LXdlaWdodDogNTAwXHJcbn1cclxuXHJcbiNjb250aW51ZXtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBtYXJnaW46IDFyZW0gYXV0bztcclxuICAgIHdpZHRoOiAyMDBweFxyXG59XHJcblxyXG4jYmFjayB7XHJcbiAgICBtYXJnaW4tbGVmdDogMTBweFxyXG59XHJcblxyXG4jZmVhdHVyZXN7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbGVmdDogMzAlO1xyXG4gICAgdG9wOiAxMCU7XHJcbiAgICB6LWluZGV4OiA5OTk7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIHdpZHRoOiA0MHZ3O1xyXG4gICAgaGVpZ2h0OiBmaXQtY29udGVudDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkO1xyXG4gICAgcGFkZGluZzogMTVweDtcclxuICAgIGJveC1zaGFkb3c6IDVweCAxMHB4IDE4cHggIzg4ODg4ODtcclxufVxyXG5cclxuI3B1cmNoYXNlRGV0YWlscyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgZm9udC1zaXplOiAxNnB4XHJcbn1cclxuXHJcbmlvbi1jYXJkLWNvbnRlbnQgYnV0dG9uIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xyXG4gICAgcGFkZGluZy10b3A6IDVweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiA1cHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmRcclxufSIsIiNjb250YWluZXIge1xuICBtYXJnaW4tdG9wOiAyMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbiNjb250YWluZXIgc3Ryb25nIHtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBsaW5lLWhlaWdodDogMjZweDtcbn1cblxuI2NvbnRhaW5lciBwIHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogMjJweDtcbiAgY29sb3I6ICM4YzhjOGM7XG4gIG1hcmdpbjogMDtcbn1cblxuI2NvbnRhaW5lciBhIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuXG4jcm93RGlzcGxheUNhcmQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgcGFkZGluZy1ib3R0b206IDE1cHg7XG59XG5cbiNyb3dEaXNwbGF5IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBtYXJnaW46IDFyZW0gYXV0bztcbiAgbWFyZ2luLWJvdHRvbTogLTEwcHg7XG59XG5cbiNwbGFuIHtcbiAgd2lkdGg6IDMwMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmlvbi1jYXJkIGlvbi1jYXJkLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG5idXR0b24ge1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgcGFkZGluZzogNXB4O1xuICBtYXJnaW4tdG9wOiAyMHB4O1xuICBtYXJnaW4tbGVmdDogMTUwcHg7XG59XG5cbiNkZXRhaWxzIHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4jY29udGludWUge1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHBhZGRpbmc6IDVweDtcbiAgbWFyZ2luOiAxcmVtIGF1dG87XG4gIHdpZHRoOiAyMDBweDtcbn1cblxuI2JhY2sge1xuICBtYXJnaW4tbGVmdDogMTBweDtcbn1cblxuI2ZlYXR1cmVzIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBkaXNwbGF5OiBub25lO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGxlZnQ6IDMwJTtcbiAgdG9wOiAxMCU7XG4gIHotaW5kZXg6IDk5OTtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHdpZHRoOiA0MHZ3O1xuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xuICBib3JkZXI6IDFweCBzb2xpZDtcbiAgcGFkZGluZzogMTVweDtcbiAgYm94LXNoYWRvdzogNXB4IDEwcHggMThweCAjODg4ODg4O1xufVxuXG4jcHVyY2hhc2VEZXRhaWxzIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBjb2xvcjogYmxhY2s7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn1cblxuaW9uLWNhcmQtY29udGVudCBidXR0b24ge1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbiAgcGFkZGluZy1yaWdodDogMTBweDtcbiAgcGFkZGluZy10b3A6IDVweDtcbiAgcGFkZGluZy1ib3R0b206IDVweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/plan-payments/plan-payments.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/admin/plan-payments/plan-payments.page.ts ***!
  \***********************************************************/
/*! exports provided: PlanPaymentsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanPaymentsPage", function() { return PlanPaymentsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_admin_plan_payments_add_ons_add_ons_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/admin/plan-payments/add-ons/add-ons.page */ "./src/app/admin/plan-payments/add-ons/add-ons.page.ts");





var PlanPaymentsPage = /** @class */ (function () {
    function PlanPaymentsPage(events, router, alertController, loadingController, modalController) {
        this.events = events;
        this.router = router;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.modalController = modalController;
        this.planSelected = "";
        this.showFeature = "none";
        this.totalAmount = 0;
        this.taxPercent = 18;
        this.taxAmount = 0;
        this.selectedAmount = 0;
        this.liteAmount = 0;
        this.plusAmount = 0;
        this.premiumAmount = 0;
        this.liteAmountYearly = 5000;
        this.plusAmountYearly = 10000;
        this.premiumAmountYearly = 20000;
    }
    PlanPaymentsPage.prototype.ngOnInit = function () {
        this.liteAmount = this.liteAmountYearly;
        this.plusAmount = this.plusAmountYearly;
        this.premiumAmount = this.premiumAmountYearly;
        // this.firebaseService.currentPlan.subscribe(data => {
        //   this.currentFeatures=data
        //   this.showDetails()
        // })
    };
    PlanPaymentsPage.prototype.changeAmount = function (name) {
        this.modalController.create({
            component: src_app_admin_plan_payments_add_ons_add_ons_page__WEBPACK_IMPORTED_MODULE_4__["AddOnsPage"],
            cssClass: 'custom-modal',
            componentProps: {}
        })
            .then(function (modalEl) {
            modalEl.present();
        });
    };
    PlanPaymentsPage.prototype.gotoDetails = function (planName) {
        // this.firebaseService.getPlans(planName)
        this.planSelected = planName;
    };
    PlanPaymentsPage.prototype.showDetails = function () {
        this.showFeature = "block";
    };
    PlanPaymentsPage.prototype.closeFeature = function () {
        this.showFeature = "none";
    };
    PlanPaymentsPage.prototype.changePrice = function () {
    };
    PlanPaymentsPage.prototype.gotoCompletePayment = function () {
        this.router.navigate(['/complete-payment']);
    };
    PlanPaymentsPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] }
    ]; };
    PlanPaymentsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-plan-payments',
            template: __webpack_require__(/*! raw-loader!./plan-payments.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/plan-payments/plan-payments.page.html"),
            styles: [__webpack_require__(/*! ./plan-payments.page.scss */ "./src/app/admin/plan-payments/plan-payments.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"]])
    ], PlanPaymentsPage);
    return PlanPaymentsPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-plan-payments-plan-payments-module-es5.js.map