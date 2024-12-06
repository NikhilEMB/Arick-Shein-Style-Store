(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-plan-payments-complete-payment-complete-payment-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/plan-payments/complete-payment/complete-payment.page.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/plan-payments/complete-payment/complete-payment.page.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">Complete Payment</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n    <div class=\"main-container\">\r\n      <ion-card class=\"welcome-card\">\r\n        <ion-card-header>\r\n          <ion-card-subtitle>Build With Innovation</ion-card-subtitle>\r\n          <ion-card-title>Razorpay Payment</ion-card-title>\r\n          <ion-row>\r\n            <ion-col>\r\n              Total Payment\r\n            </ion-col>\r\n            <ion-col>\r\n              500\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-card-header>\r\n        <ion-card-content>\r\n          <ion-button expand=\"full\" color=\"success\">Make Payment</ion-button>\r\n        </ion-card-content>\r\n      </ion-card>\r\n    </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/plan-payments/complete-payment/complete-payment.module.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/admin/plan-payments/complete-payment/complete-payment.module.ts ***!
  \*********************************************************************************/
/*! exports provided: CompletePaymentPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletePaymentPageModule", function() { return CompletePaymentPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _complete_payment_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./complete-payment.page */ "./src/app/admin/plan-payments/complete-payment/complete-payment.page.ts");







const routes = [
    {
        path: '',
        component: _complete_payment_page__WEBPACK_IMPORTED_MODULE_6__["CompletePaymentPage"]
    }
];
let CompletePaymentPageModule = class CompletePaymentPageModule {
};
CompletePaymentPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_complete_payment_page__WEBPACK_IMPORTED_MODULE_6__["CompletePaymentPage"]]
    })
], CompletePaymentPageModule);



/***/ }),

/***/ "./src/app/admin/plan-payments/complete-payment/complete-payment.page.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/admin/plan-payments/complete-payment/complete-payment.page.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#back {\n  margin-left: 10px;\n}\n\n.vl {\n  border-left: 1px solid lightgray;\n  height: 30px;\n}\n\n#rowDisplay {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 80vw;\n  margin: 1rem auto;\n  margin-bottom: -40px;\n}\n\nbutton {\n  border: 1px solid black;\n  background: white;\n  padding: 10px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n#rowDisplayCard {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n  width: 90vw;\n  margin: 1rem auto;\n  margin-bottom: -40px;\n}\n\nion-card {\n  width: 500px;\n  text-align: center;\n  margin: 0% auto;\n  margin-top: 30px;\n}\n\n#optionsCard2 {\n  width: auto;\n}\n\nion-card ion-card-title {\n  font-size: 16px !important;\n}\n\n#link {\n  text-align: center;\n}\n\n#title {\n  display: -webkit-box !important;\n  display: flex !important;\n  margin-right: 20px;\n}\n\n#settings {\n  margin-right: 5px;\n  font-size: 18px;\n  vertical-align: text-top;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vcGxhbi1wYXltZW50cy9jb21wbGV0ZS1wYXltZW50L0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxccGxhbi1wYXltZW50c1xcY29tcGxldGUtcGF5bWVudFxcY29tcGxldGUtcGF5bWVudC5wYWdlLnNjc3MiLCJzcmMvYXBwL2FkbWluL3BsYW4tcGF5bWVudHMvY29tcGxldGUtcGF5bWVudC9jb21wbGV0ZS1wYXltZW50LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFBO0FDQ0o7O0FERUE7RUFDSSxnQ0FBQTtFQUNBLFlBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtBQ0NKOztBREVBO0VBQ0ksdUJBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FDQ0o7O0FERUE7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtVQUFBLDZCQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7QUNDSjs7QURFQTtFQUNJLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQ0NKOztBREVBO0VBQ0ksV0FBQTtBQ0NKOztBREVBO0VBQ0ksMEJBQUE7QUNDSjs7QURFQTtFQUNJLGtCQUFBO0FDQ0o7O0FERUE7RUFDSSwrQkFBQTtFQUFBLHdCQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFQTtFQUNJLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLHdCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9wbGFuLXBheW1lbnRzL2NvbXBsZXRlLXBheW1lbnQvY29tcGxldGUtcGF5bWVudC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjYmFjayB7XHJcbiAgICBtYXJnaW4tbGVmdDogMTBweFxyXG59XHJcblxyXG4udmwge1xyXG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgfVxyXG5cclxuI3Jvd0Rpc3BsYXkge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIHdpZHRoOiA4MHZ3O1xyXG4gICAgbWFyZ2luOiAxcmVtIGF1dG87XHJcbiAgICBtYXJnaW4tYm90dG9tOiAtNDBweFxyXG59XHJcblxyXG5idXR0b24ge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcclxuICAgIG1hcmdpbi1yaWdodDogYXV0b1xyXG59XHJcblxyXG4jcm93RGlzcGxheUNhcmQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xyXG4gICAgd2lkdGg6IDkwdnc7XHJcbiAgICBtYXJnaW46IDFyZW0gYXV0bztcclxuICAgIG1hcmdpbi1ib3R0b206IC00MHB4XHJcbn1cclxuXHJcbmlvbi1jYXJkIHtcclxuICAgIHdpZHRoOiA1MDBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG1hcmdpbjogMCUgYXV0bztcclxuICAgIG1hcmdpbi10b3A6IDMwcHhcclxufVxyXG5cclxuI29wdGlvbnNDYXJkMiB7XHJcbiAgICB3aWR0aDogYXV0b1xyXG59XHJcblxyXG5pb24tY2FyZCBpb24tY2FyZC10aXRsZSB7XHJcbiAgICBmb250LXNpemU6IDE2cHggIWltcG9ydGFudFxyXG59XHJcblxyXG4jbGluayB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXJcclxufVxyXG5cclxuI3RpdGxlIHtcclxuICAgIGRpc3BsYXk6IGZsZXggIWltcG9ydGFudDtcclxuICAgIG1hcmdpbi1yaWdodDogMjBweFxyXG59XHJcblxyXG4jc2V0dGluZ3Mge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdGV4dC10b3BcclxufSIsIiNiYWNrIHtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG59XG5cbi52bCB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgbGlnaHRncmF5O1xuICBoZWlnaHQ6IDMwcHg7XG59XG5cbiNyb3dEaXNwbGF5IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogODB2dztcbiAgbWFyZ2luOiAxcmVtIGF1dG87XG4gIG1hcmdpbi1ib3R0b206IC00MHB4O1xufVxuXG5idXR0b24ge1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG59XG5cbiNyb3dEaXNwbGF5Q2FyZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICB3aWR0aDogOTB2dztcbiAgbWFyZ2luOiAxcmVtIGF1dG87XG4gIG1hcmdpbi1ib3R0b206IC00MHB4O1xufVxuXG5pb24tY2FyZCB7XG4gIHdpZHRoOiA1MDBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW46IDAlIGF1dG87XG4gIG1hcmdpbi10b3A6IDMwcHg7XG59XG5cbiNvcHRpb25zQ2FyZDIge1xuICB3aWR0aDogYXV0bztcbn1cblxuaW9uLWNhcmQgaW9uLWNhcmQtdGl0bGUge1xuICBmb250LXNpemU6IDE2cHggIWltcG9ydGFudDtcbn1cblxuI2xpbmsge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbiN0aXRsZSB7XG4gIGRpc3BsYXk6IGZsZXggIWltcG9ydGFudDtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xufVxuXG4jc2V0dGluZ3Mge1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbiAgZm9udC1zaXplOiAxOHB4O1xuICB2ZXJ0aWNhbC1hbGlnbjogdGV4dC10b3A7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/plan-payments/complete-payment/complete-payment.page.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/plan-payments/complete-payment/complete-payment.page.ts ***!
  \*******************************************************************************/
/*! exports provided: CompletePaymentPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletePaymentPage", function() { return CompletePaymentPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");



let CompletePaymentPage = class CompletePaymentPage {
    constructor(router) {
        this.router = router;
        this.inputAmount = 0;
    }
    ngOnInit() {
    }
    razorpayCheckout(e) {
        this.router.navigate(['/razorpay']);
        e.preventDefault();
    }
    gotoPrevious() {
        this.router.navigate(['/options']);
    }
    newAmount() {
        // this.inputAmount=this.firebaseService.amountSelected
    }
};
CompletePaymentPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
CompletePaymentPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-complete-payment',
        template: __webpack_require__(/*! raw-loader!./complete-payment.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/plan-payments/complete-payment/complete-payment.page.html"),
        styles: [__webpack_require__(/*! ./complete-payment.page.scss */ "./src/app/admin/plan-payments/complete-payment/complete-payment.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], CompletePaymentPage);



/***/ })

}]);
//# sourceMappingURL=admin-plan-payments-complete-payment-complete-payment-module-es2015.js.map