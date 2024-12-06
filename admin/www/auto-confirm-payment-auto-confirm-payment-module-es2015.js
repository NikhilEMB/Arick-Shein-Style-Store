(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["auto-confirm-payment-auto-confirm-payment-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/auto-confirm-payment/auto-confirm-payment.page.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/auto-confirm-payment/auto-confirm-payment.page.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"chat-bot\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center *ngIf=\"orderData\">Order Payment</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content *ngIf=\"orderData\">\r\n  <br>\r\n  <div class=\"price-card\">\r\n    <p class=\"price-details\">Price Details</p>\r\n    <hr class=\"line\">\r\n    <ion-grid class=\"ion-no-padding\">\r\n      <ion-row class=\"ion-justify-content-between ion-no-padding\">\r\n        <ion-col class=\"ion-no-padding\">\r\n          <p class=\"total-items\">Price ({{getTotalItems()}} items)</p>\r\n        </ion-col>\r\n        <ion-col class=\"ion-no-padding price-total\">\r\n          <p>{{orderData.productsPrice | currency: 'INR':true:'0.0'}}</p>\r\n        </ion-col>\r\n      </ion-row>\r\n\r\n      <ion-row class=\"ion-no-padding\" *ngIf=\"orderData.couponDiscount !== 0\">\r\n        <ion-col class=\"ion-no-padding\">\r\n          <p class=\"total-items\">Coupon Discount</p>\r\n        </ion-col>\r\n        <ion-col class=\"ion-no-padding price-total\">\r\n          <p style=\"color: var(--ion-color-success);\">{{orderData.couponDiscount | currency: 'INR':true:'0.0'}}</p>\r\n        </ion-col>\r\n      </ion-row>\r\n\r\n      <ion-row class=\"ion-no-padding\">\r\n        <ion-col class=\"ion-no-padding\">\r\n          <p class=\"total-items\">Delivery</p>\r\n        </ion-col>\r\n        <ion-col class=\"ion-no-padding price-total\">\r\n          <p *ngIf=\"orderData.delivery !== 0\">{{orderData.delivery | currency: 'INR':true:'0.0'}}</p>\r\n          <p *ngIf=\"orderData.delivery === 0\" style=\"color: var(--ion-color-success);\">Free</p>\r\n        </ion-col>\r\n      </ion-row>\r\n\r\n      <ion-row class=\"ion-no-padding\" *ngIf=\"orderData.defaultGst !== 0\">\r\n        <ion-col class=\"ion-no-padding\">\r\n          <p class=\"total-items\">GST</p>\r\n        </ion-col>\r\n        <ion-col class=\"ion-no-padding price-total\">\r\n          <p>{{orderData.defaultGst | currency: 'INR':true:'0.0'}}</p>\r\n        </ion-col>\r\n      </ion-row>\r\n\r\n      <hr class=\"line\">\r\n      <ion-row class=\"ion-no-padding\">\r\n        <ion-col class=\"ion-no-padding\">\r\n          <p class=\"total-estimated\">Total Amount</p>\r\n        </ion-col>\r\n        <ion-col class=\"ion-no-padding estimated-price\">\r\n          <p>{{orderData.totalAmountToPaid | currency: 'INR':true:'0.0'}}</p>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n  <div class=\"payment-methods\">\r\n    <p class=\"payment-modes\">Payment Modes</p>\r\n    <hr class=\"line\">\r\n    <div class=\"spinner\" *ngIf=\"showLoader; else modesLoaded\">\r\n      <ion-spinner color=\"primary\"></ion-spinner>\r\n    </div>\r\n    <ng-template #modesLoaded>\r\n      <ion-list lines=\"none\">\r\n        <ion-item button (click)=\"onClickPaymentMode('cash')\" detail class=\"ion-no-padding ion-item\">\r\n          <ion-label>\r\n            <h4>Cash On Delivery</h4>\r\n          </ion-label>\r\n        </ion-item>\r\n        <ion-item button (click)=\"onClickPaymentMode('paytm')\" detail *ngIf=\"paytmActive\" class=\"ion-no-padding ion-item\">\r\n          <ion-label>\r\n            <h4>Paytm</h4>\r\n          </ion-label>\r\n        </ion-item>\r\n  \r\n        <ion-item button (click)=\"onClickPaymentMode('card')\" detail *ngIf=\"razorpayActive\"\r\n          class=\"ion-no-padding ion-item\">\r\n          <ion-label class=\"ion-text-wrap\">\r\n            <h4>Credit/Debit Cards</h4>\r\n          </ion-label>\r\n        </ion-item>\r\n  \r\n        <ion-item button (click)=\"onClickPaymentMode('wallet')\" detail *ngIf=\"razorpayActive\"\r\n          class=\"ion-no-padding ion-item\">\r\n          <ion-label class=\"ion-text-wrap\">\r\n            <h4>Wallets</h4>\r\n          </ion-label>\r\n        </ion-item>\r\n  \r\n        <ion-item button (click)=\"onClickPaymentMode('upi')\" detail *ngIf=\"razorpayActive\"\r\n          class=\"ion-no-padding ion-item\">\r\n          <ion-label class=\"ion-text-wrap\">\r\n            <h4>UPI</h4>\r\n          </ion-label>\r\n        </ion-item>\r\n  \r\n        <ion-item button (click)=\"onClickPaymentMode('netbanking')\" detail *ngIf=\"razorpayActive\" class=\"ion-no-padding\">\r\n          <ion-label class=\"ion-text-wrap\">\r\n            <h4>Netbanking</h4>\r\n          </ion-label>\r\n        </ion-item>\r\n  \r\n      </ion-list>\r\n    </ng-template>    \r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/auto-confirm-payment/auto-confirm-payment.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/auto-confirm-payment/auto-confirm-payment.module.ts ***!
  \*********************************************************************/
/*! exports provided: AutoConfirmPaymentPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutoConfirmPaymentPageModule", function() { return AutoConfirmPaymentPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _auto_confirm_payment_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auto-confirm-payment.page */ "./src/app/auto-confirm-payment/auto-confirm-payment.page.ts");







const routes = [
    {
        path: '',
        component: _auto_confirm_payment_page__WEBPACK_IMPORTED_MODULE_6__["AutoConfirmPaymentPage"]
    }
];
let AutoConfirmPaymentPageModule = class AutoConfirmPaymentPageModule {
};
AutoConfirmPaymentPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_auto_confirm_payment_page__WEBPACK_IMPORTED_MODULE_6__["AutoConfirmPaymentPage"]]
    })
], AutoConfirmPaymentPageModule);



/***/ }),

/***/ "./src/app/auto-confirm-payment/auto-confirm-payment.page.scss":
/*!*********************************************************************!*\
  !*** ./src/app/auto-confirm-payment/auto-confirm-payment.page.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-content {\n  --background: #F2F2F2;\n}\n\n.price-card {\n  background: white;\n  padding: 10px 10px 0px 10px;\n  margin: 6px 12px 12px 12px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.price-details {\n  font-size: 14px;\n  text-transform: uppercase;\n  opacity: 0.7;\n}\n\n.line {\n  border: 0;\n  clear: both;\n  display: block;\n  width: 100%;\n  background-color: #ccc;\n  height: 1px;\n  opacity: 0.4;\n}\n\n.total-items {\n  font-size: 13px;\n}\n\n.price-total {\n  text-align: end;\n}\n\n.price-total p {\n  font-size: 15px;\n}\n\n.total-estimated {\n  font-size: 16px;\n}\n\n.estimated-price {\n  text-align: end;\n}\n\n.estimated-price p {\n  font-size: 17px;\n  color: var(--ion-color-primary);\n}\n\n.payment-methods {\n  background: white;\n  padding: 10px 10px 10px 10px;\n  margin: 6px 12px 12px 12px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.payment-modes {\n  font-size: 14px;\n  text-transform: uppercase;\n  opacity: 0.7;\n}\n\n.spinner {\n  text-align: center;\n  margin-top: 5%;\n}\n\nion-item {\n  --detail-icon-color: var(--ion-color-primary);\n  --detail-icon-opacity: 1;\n  --detail-icon-font-size: 13px;\n  --padding-start: 4%;\n}\n\nion-item ion-thumbnail {\n  width: 35px;\n  height: 35px;\n}\n\nion-item ion-label {\n  font-size: 14px;\n}\n\nion-item ion-label p {\n  font-size: 12px;\n  margin-top: 5px;\n}\n\n.ion-item {\n  --padding-bottom: 5%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0by1jb25maXJtLXBheW1lbnQvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGF1dG8tY29uZmlybS1wYXltZW50XFxhdXRvLWNvbmZpcm0tcGF5bWVudC5wYWdlLnNjc3MiLCJzcmMvYXBwL2F1dG8tY29uZmlybS1wYXltZW50L2F1dG8tY29uZmlybS1wYXltZW50LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHFCQUFBO0FDQ0o7O0FEQ0E7RUFDSSxpQkFBQTtFQUNBLDJCQUFBO0VBQ0EsMEJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FDRUo7O0FEQUE7RUFDSSxlQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0FDR0o7O0FEREE7RUFDSSxTQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQ0lKOztBREZBO0VBQ0ksZUFBQTtBQ0tKOztBREhBO0VBQ0ksZUFBQTtBQ01KOztBREpBO0VBQ0ksZUFBQTtBQ09KOztBRExBO0VBQ0ksZUFBQTtBQ1FKOztBRE5BO0VBQ0ksZUFBQTtBQ1NKOztBRFBBO0VBQ0ksZUFBQTtFQUNBLCtCQUFBO0FDVUo7O0FEUkE7RUFDSSxpQkFBQTtFQUNBLDRCQUFBO0VBQ0EsMEJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FDV0o7O0FEVEE7RUFDSSxlQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0FDWUo7O0FEVEE7RUFDSSxrQkFBQTtFQUNBLGNBQUE7QUNZSjs7QURWQTtFQUNJLDZDQUFBO0VBQ0Esd0JBQUE7RUFDQSw2QkFBQTtFQUNBLG1CQUFBO0FDYUo7O0FEWEE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQ2NKOztBRFpBO0VBQ0ksZUFBQTtBQ2VKOztBRGJBO0VBQ0ksZUFBQTtFQUNBLGVBQUE7QUNnQko7O0FEZEE7RUFDSSxvQkFBQTtBQ2lCSiIsImZpbGUiOiJzcmMvYXBwL2F1dG8tY29uZmlybS1wYXltZW50L2F1dG8tY29uZmlybS1wYXltZW50LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jb250ZW50e1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAjRjJGMkYyO1xyXG59XHJcbi5wcmljZS1jYXJke1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDEwcHggMHB4IDEwcHg7XHJcbiAgICBtYXJnaW46IDZweCAxMnB4IDEycHggMTJweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuLnByaWNlLWRldGFpbHN7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgb3BhY2l0eTogLjc7XHJcbn1cclxuLmxpbmV7XHJcbiAgICBib3JkZXI6IDA7XHJcbiAgICBjbGVhcjogYm90aDtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xyXG4gICAgaGVpZ2h0OiAxcHg7XHJcbiAgICBvcGFjaXR5OiAuNDtcclxufVxyXG4udG90YWwtaXRlbXN7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbn1cclxuLnByaWNlLXRvdGFse1xyXG4gICAgdGV4dC1hbGlnbjogZW5kO1xyXG59XHJcbi5wcmljZS10b3RhbCBwe1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG59XHJcbi50b3RhbC1lc3RpbWF0ZWR7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbn1cclxuLmVzdGltYXRlZC1wcmljZXtcclxuICAgIHRleHQtYWxpZ246IGVuZDtcclxufVxyXG4uZXN0aW1hdGVkLXByaWNlIHB7XHJcbiAgICBmb250LXNpemU6IDE3cHg7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG59XHJcbi5wYXltZW50LW1ldGhvZHN7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIHBhZGRpbmc6IDEwcHggMTBweCAxMHB4IDEwcHg7XHJcbiAgICBtYXJnaW46IDZweCAxMnB4IDEycHggMTJweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuLnBheW1lbnQtbW9kZXN7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgb3BhY2l0eTogLjc7XHJcbn1cclxuXHJcbi5zcGlubmVye1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbWFyZ2luLXRvcDogNSU7XHJcbn1cclxuaW9uLWl0ZW17XHJcbiAgICAtLWRldGFpbC1pY29uLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICAtLWRldGFpbC1pY29uLW9wYWNpdHk6IDE7XHJcbiAgICAtLWRldGFpbC1pY29uLWZvbnQtc2l6ZTogMTNweDtcclxuICAgIC0tcGFkZGluZy1zdGFydDogNCU7XHJcbn1cclxuaW9uLWl0ZW0gaW9uLXRodW1ibmFpbCB7XHJcbiAgICB3aWR0aDogMzVweDtcclxuICAgIGhlaWdodDogMzVweDtcclxufVxyXG5pb24taXRlbSBpb24tbGFiZWwge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcbmlvbi1pdGVtIGlvbi1sYWJlbCBwIHtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIG1hcmdpbi10b3A6IDVweDtcclxufVxyXG4uaW9uLWl0ZW17XHJcbiAgICAtLXBhZGRpbmctYm90dG9tOiA1JTtcclxufSIsImlvbi1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiAjRjJGMkYyO1xufVxuXG4ucHJpY2UtY2FyZCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBwYWRkaW5nOiAxMHB4IDEwcHggMHB4IDEwcHg7XG4gIG1hcmdpbjogNnB4IDEycHggMTJweCAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5wcmljZS1kZXRhaWxzIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBvcGFjaXR5OiAwLjc7XG59XG5cbi5saW5lIHtcbiAgYm9yZGVyOiAwO1xuICBjbGVhcjogYm90aDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xuICBoZWlnaHQ6IDFweDtcbiAgb3BhY2l0eTogMC40O1xufVxuXG4udG90YWwtaXRlbXMge1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi5wcmljZS10b3RhbCB7XG4gIHRleHQtYWxpZ246IGVuZDtcbn1cblxuLnByaWNlLXRvdGFsIHAge1xuICBmb250LXNpemU6IDE1cHg7XG59XG5cbi50b3RhbC1lc3RpbWF0ZWQge1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi5lc3RpbWF0ZWQtcHJpY2Uge1xuICB0ZXh0LWFsaWduOiBlbmQ7XG59XG5cbi5lc3RpbWF0ZWQtcHJpY2UgcCB7XG4gIGZvbnQtc2l6ZTogMTdweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn1cblxuLnBheW1lbnQtbWV0aG9kcyB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBwYWRkaW5nOiAxMHB4IDEwcHggMTBweCAxMHB4O1xuICBtYXJnaW46IDZweCAxMnB4IDEycHggMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4ucGF5bWVudC1tb2RlcyB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgb3BhY2l0eTogMC43O1xufVxuXG4uc3Bpbm5lciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogNSU7XG59XG5cbmlvbi1pdGVtIHtcbiAgLS1kZXRhaWwtaWNvbi1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAtLWRldGFpbC1pY29uLW9wYWNpdHk6IDE7XG4gIC0tZGV0YWlsLWljb24tZm9udC1zaXplOiAxM3B4O1xuICAtLXBhZGRpbmctc3RhcnQ6IDQlO1xufVxuXG5pb24taXRlbSBpb24tdGh1bWJuYWlsIHtcbiAgd2lkdGg6IDM1cHg7XG4gIGhlaWdodDogMzVweDtcbn1cblxuaW9uLWl0ZW0gaW9uLWxhYmVsIHtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG5pb24taXRlbSBpb24tbGFiZWwgcCB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgbWFyZ2luLXRvcDogNXB4O1xufVxuXG4uaW9uLWl0ZW0ge1xuICAtLXBhZGRpbmctYm90dG9tOiA1JTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/auto-confirm-payment/auto-confirm-payment.page.ts":
/*!*******************************************************************!*\
  !*** ./src/app/auto-confirm-payment/auto-confirm-payment.page.ts ***!
  \*******************************************************************/
/*! exports provided: AutoConfirmPaymentPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutoConfirmPaymentPage", function() { return AutoConfirmPaymentPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");




let AutoConfirmPaymentPage = class AutoConfirmPaymentPage {
    constructor(events, router, alertController, loadingController, route, navCtrl) {
        this.events = events;
        this.router = router;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.route = route;
        this.navCtrl = navCtrl;
        this.paytmActive = false;
        this.razorpayActive = false;
        this.showLoader = true;
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.orderData = this.router.getCurrentNavigation().extras.state.orderData;
                // //console.log('orderData', this.orderData);
            }
        });
    }
    ngOnInit() {
    }
    ionViewDidEnter() {
        this.events.publish('admin-settings:getPaytmData');
        this.events.publish('admin-settings:getRazorPayData');
        this.initializeSubscriptions();
    }
    ionViewWillLeave() {
        this.removeSubscription();
    }
    initializeSubscriptions() {
        this.events.subscribe('user:setPaymentModeOfOrderByUserSuccessfully', () => {
            this.loading.dismiss();
            this.presentAlert('Payment Mode has been set successfully');
        });
        this.events.subscribe('admin-settings:publishPaytmData', (data) => {
            if (data) {
                this.paytmActive = data.active;
            }
        });
        this.events.subscribe('admin-settings:publishRazorPayData', (data) => {
            if (data && data.active && data.id !== '') {
                this.razorpayActive = data.active;
                this.razorpayId = data.id;
            }
            this.showLoader = false;
        });
        this.events.subscribe('order:ac_modeSetToCashSuccess', () => {
            this.loading.dismiss();
            this.presentAlert('Order has been placed successfully!');
        });
    }
    getTotalItems() {
        return this.orderData.products.length;
    }
    onClickPaymentMode(mode) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (mode === 'cash') {
                yield this.presentLoading();
                this.events.publish('order:ac_payWithCash', this.orderData);
            }
            if (mode === 'card' || mode === 'wallet' || mode === 'upi' || mode === 'netbanking') {
                yield this.presentLoading();
                this.events.publish('order:ac_payWithRazorPay', this.orderData, this.razorpayId, mode);
            }
            if (mode === 'paytm') {
                yield this.presentLoading();
                this.events.publish('order:ac_payWithPaytm', this.orderData);
            }
        });
    }
    presentAlert(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: [{
                        text: 'Ok',
                        handler: () => {
                            this.navCtrl.navigateRoot(['user-order-history']);
                        }
                    }]
            });
            yield alert.present();
        });
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Please Wait...',
                duration: 5000
            });
            yield this.loading.present();
        });
    }
    removeSubscription() {
        this.events.unsubscribe('user:setPaymentModeOfOrderByUserSuccessfully');
        this.events.unsubscribe('admin-settings:publishPaytmData');
        this.events.unsubscribe('admin-settings:publishRazorPayData');
        this.events.unsubscribe('order:ac_modeSetToCashSuccess');
    }
};
AutoConfirmPaymentPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"] }
];
AutoConfirmPaymentPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-auto-confirm-payment',
        template: __webpack_require__(/*! raw-loader!./auto-confirm-payment.page.html */ "./node_modules/raw-loader/index.js!./src/app/auto-confirm-payment/auto-confirm-payment.page.html"),
        styles: [__webpack_require__(/*! ./auto-confirm-payment.page.scss */ "./src/app/auto-confirm-payment/auto-confirm-payment.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"]])
], AutoConfirmPaymentPage);



/***/ })

}]);
//# sourceMappingURL=auto-confirm-payment-auto-confirm-payment-module-es2015.js.map