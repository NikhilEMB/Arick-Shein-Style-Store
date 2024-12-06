(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["order-payment-order-payment-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/order-payment/order-payment.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/order-payment/order-payment.page.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"chat-bot\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center *ngIf=\"orderData\">Order: ORD{{orderData[0].orderId}}</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <br>\r\n  <div *ngIf=\"showLoader; else showOrderDetails\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n  <ng-template #showOrderDetails>\r\n    <div class=\"price-card\">\r\n      <p class=\"price-details\">Price Details</p>\r\n      <hr class=\"line\">\r\n        <ion-grid class=\"ion-no-padding\">\r\n          <ion-row class=\"ion-justify-content-between ion-no-padding\">\r\n            <ion-col class=\"ion-no-padding\">\r\n              <p class=\"total-items\">Price ({{getTotalItems()}} items)</p>\r\n            </ion-col>\r\n            <ion-col class=\"ion-no-padding price-total\">\r\n              <p>{{orderData[0].productsPrice | currency: 'INR':true:'0.0'}}</p>\r\n            </ion-col>\r\n          </ion-row>\r\n\r\n          <ion-row class=\"ion-no-padding\" *ngIf=\"orderData[0].couponDiscount !== 0\">\r\n            <ion-col class=\"ion-no-padding\">\r\n              <p class=\"total-items\">Coupon Discount</p>\r\n            </ion-col>\r\n            <ion-col class=\"ion-no-padding price-total\">\r\n              <p style=\"color: var(--ion-color-success);\">{{orderData[0].couponDiscount | currency: 'INR':true:'0.0'}}</p>\r\n            </ion-col>\r\n          </ion-row>\r\n\r\n          <ion-row class=\"ion-no-padding\">\r\n            <ion-col class=\"ion-no-padding\">\r\n              <p class=\"total-items\">Delivery</p>\r\n            </ion-col>\r\n            <ion-col class=\"ion-no-padding price-total\">\r\n              <p *ngIf=\"orderData[0].delivery !== 0\">{{orderData[0].delivery | currency: 'INR':true:'0.0'}}</p>\r\n              <p *ngIf=\"orderData[0].delivery === 0\" style=\"color: var(--ion-color-success);\">Free</p>\r\n            </ion-col>\r\n          </ion-row>\r\n\r\n          <ion-row class=\"ion-no-padding\" *ngIf=\"orderData[0].defaultGst !== 0\">\r\n            <ion-col class=\"ion-no-padding\">\r\n              <p class=\"total-items\">GST</p>\r\n            </ion-col>\r\n            <ion-col class=\"ion-no-padding price-total\">\r\n              <p>{{orderData[0].defaultGst | currency: 'INR':true:'0.0'}}</p>\r\n            </ion-col>\r\n          </ion-row>\r\n\r\n          <hr class=\"line\">\r\n          <ion-row class=\"ion-no-padding\">\r\n            <ion-col class=\"ion-no-padding\">\r\n              <p class=\"total-estimated\">Total Amount</p>\r\n            </ion-col>\r\n            <ion-col class=\"ion-no-padding estimated-price\">\r\n              <p>{{orderData[0].totalAmountToPaid | currency: 'INR':true:'0.0'}}</p>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n    </div>\r\n    <div class=\"payment-methods\">\r\n      <p class=\"payment-modes\">Payment Modes</p>\r\n      <hr class=\"line\">\r\n      <ion-list lines=\"none\">\r\n          <ion-item button (click)=\"onClickPaymentMode('cash')\" detail class=\"ion-no-padding ion-item\">\r\n            <ion-label>\r\n              <h4>Cash On Delivery</h4>\r\n            </ion-label>\r\n          </ion-item>\r\n          <ion-item button (click)=\"onClickPaymentMode('paytm')\" detail *ngIf=\"paytmActive\" class=\"ion-no-padding ion-item\">\r\n            <ion-label>\r\n              <h4>Paytm</h4>\r\n            </ion-label>\r\n          </ion-item>\r\n\r\n          <ion-item button (click)=\"onClickPaymentMode('card')\" detail *ngIf=\"razorpayActive\" class=\"ion-no-padding ion-item\">\r\n            <ion-label class=\"ion-text-wrap\">\r\n              <h4>Credit/Debit Cards</h4>\r\n            </ion-label>\r\n          </ion-item>\r\n\r\n          <ion-item button (click)=\"onClickPaymentMode('wallet')\" detail *ngIf=\"razorpayActive\" class=\"ion-no-padding ion-item\">\r\n            <ion-label class=\"ion-text-wrap\">\r\n              <h4>Wallets</h4>\r\n            </ion-label>\r\n          </ion-item>\r\n\r\n          <ion-item button (click)=\"onClickPaymentMode('upi')\" detail *ngIf=\"razorpayActive\" class=\"ion-no-padding ion-item\">\r\n            <ion-label class=\"ion-text-wrap\">\r\n              <h4>UPI</h4>\r\n            </ion-label>\r\n          </ion-item>\r\n\r\n          <ion-item button (click)=\"onClickPaymentMode('netbanking')\" detail *ngIf=\"razorpayActive\" class=\"ion-no-padding\">\r\n            <ion-label class=\"ion-text-wrap\">\r\n              <h4>Netbanking</h4>\r\n            </ion-label>\r\n          </ion-item>\r\n\r\n      </ion-list>\r\n    </div>\r\n  </ng-template>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/order-payment/order-payment.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/order-payment/order-payment.module.ts ***!
  \*******************************************************/
/*! exports provided: OrderPaymentPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderPaymentPageModule", function() { return OrderPaymentPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _order_payment_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./order-payment.page */ "./src/app/order-payment/order-payment.page.ts");







const routes = [
    {
        path: '',
        component: _order_payment_page__WEBPACK_IMPORTED_MODULE_6__["OrderPaymentPage"]
    }
];
let OrderPaymentPageModule = class OrderPaymentPageModule {
};
OrderPaymentPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_order_payment_page__WEBPACK_IMPORTED_MODULE_6__["OrderPaymentPage"]]
    })
], OrderPaymentPageModule);



/***/ }),

/***/ "./src/app/order-payment/order-payment.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/order-payment/order-payment.page.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-content {\n  --background: #F2F2F2;\n}\n\n.price-card {\n  background: white;\n  padding: 10px 10px 0px 10px;\n  margin: 6px 12px 12px 12px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.price-details {\n  font-size: 14px;\n  text-transform: uppercase;\n  opacity: 0.7;\n}\n\n.line {\n  border: 0;\n  clear: both;\n  display: block;\n  width: 100%;\n  background-color: #ccc;\n  height: 1px;\n  opacity: 0.4;\n}\n\n.total-items {\n  font-size: 13px;\n}\n\n.price-total {\n  text-align: end;\n}\n\n.price-total p {\n  font-size: 15px;\n}\n\n.total-estimated {\n  font-size: 16px;\n}\n\n.estimated-price {\n  text-align: end;\n}\n\n.estimated-price p {\n  font-size: 17px;\n  color: var(--ion-color-primary);\n}\n\n.payment-methods {\n  background: white;\n  padding: 10px 10px 10px 10px;\n  margin: 6px 12px 12px 12px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.payment-modes {\n  font-size: 14px;\n  text-transform: uppercase;\n  opacity: 0.7;\n}\n\n.spinner {\n  text-align: center;\n  margin-top: 50%;\n}\n\nion-item {\n  --detail-icon-color: var(--ion-color-primary);\n  --detail-icon-opacity: 1;\n  --detail-icon-font-size: 13px;\n  --padding-start: 4%;\n}\n\nion-item ion-thumbnail {\n  width: 35px;\n  height: 35px;\n}\n\nion-item ion-label {\n  font-size: 14px;\n}\n\nion-item ion-label p {\n  font-size: 12px;\n  margin-top: 5px;\n}\n\n.ion-item {\n  --padding-bottom: 5%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvb3JkZXItcGF5bWVudC9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcb3JkZXItcGF5bWVudFxcb3JkZXItcGF5bWVudC5wYWdlLnNjc3MiLCJzcmMvYXBwL29yZGVyLXBheW1lbnQvb3JkZXItcGF5bWVudC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxxQkFBQTtBQ0NKOztBRENBO0VBQ0ksaUJBQUE7RUFDQSwyQkFBQTtFQUNBLDBCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQ0VKOztBREFBO0VBQ0ksZUFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtBQ0dKOztBRERBO0VBQ0ksU0FBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUNJSjs7QURGQTtFQUNJLGVBQUE7QUNLSjs7QURIQTtFQUNJLGVBQUE7QUNNSjs7QURKQTtFQUNJLGVBQUE7QUNPSjs7QURMQTtFQUNJLGVBQUE7QUNRSjs7QUROQTtFQUNJLGVBQUE7QUNTSjs7QURQQTtFQUNJLGVBQUE7RUFDQSwrQkFBQTtBQ1VKOztBRFJBO0VBQ0ksaUJBQUE7RUFDQSw0QkFBQTtFQUNBLDBCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQ1dKOztBRFRBO0VBQ0ksZUFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtBQ1lKOztBRFRBO0VBQ0ksa0JBQUE7RUFDQSxlQUFBO0FDWUo7O0FEVkE7RUFDSSw2Q0FBQTtFQUNBLHdCQUFBO0VBQ0EsNkJBQUE7RUFDQSxtQkFBQTtBQ2FKOztBRFhBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUNjSjs7QURaQTtFQUNJLGVBQUE7QUNlSjs7QURiQTtFQUNJLGVBQUE7RUFDQSxlQUFBO0FDZ0JKOztBRGRBO0VBQ0ksb0JBQUE7QUNpQkoiLCJmaWxlIjoic3JjL2FwcC9vcmRlci1wYXltZW50L29yZGVyLXBheW1lbnQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnR7XHJcbiAgICAtLWJhY2tncm91bmQ6ICNGMkYyRjI7XHJcbn1cclxuLnByaWNlLWNhcmR7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIHBhZGRpbmc6IDEwcHggMTBweCAwcHggMTBweDtcclxuICAgIG1hcmdpbjogNnB4IDEycHggMTJweCAxMnB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG4ucHJpY2UtZGV0YWlsc3tcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICBvcGFjaXR5OiAuNztcclxufVxyXG4ubGluZXtcclxuICAgIGJvcmRlcjogMDtcclxuICAgIGNsZWFyOiBib3RoO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XHJcbiAgICBoZWlnaHQ6IDFweDtcclxuICAgIG9wYWNpdHk6IC40O1xyXG59XHJcbi50b3RhbC1pdGVtc3tcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxufVxyXG4ucHJpY2UtdG90YWx7XHJcbiAgICB0ZXh0LWFsaWduOiBlbmQ7XHJcbn1cclxuLnByaWNlLXRvdGFsIHB7XHJcbiAgICBmb250LXNpemU6IDE1cHg7XHJcbn1cclxuLnRvdGFsLWVzdGltYXRlZHtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxufVxyXG4uZXN0aW1hdGVkLXByaWNle1xyXG4gICAgdGV4dC1hbGlnbjogZW5kO1xyXG59XHJcbi5lc3RpbWF0ZWQtcHJpY2UgcHtcclxuICAgIGZvbnQtc2l6ZTogMTdweDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbn1cclxuLnBheW1lbnQtbWV0aG9kc3tcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgcGFkZGluZzogMTBweCAxMHB4IDEwcHggMTBweDtcclxuICAgIG1hcmdpbjogNnB4IDEycHggMTJweCAxMnB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG4ucGF5bWVudC1tb2Rlc3tcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICBvcGFjaXR5OiAuNztcclxufVxyXG5cclxuLnNwaW5uZXJ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiA1MCU7XHJcbn1cclxuaW9uLWl0ZW17XHJcbiAgICAtLWRldGFpbC1pY29uLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICAtLWRldGFpbC1pY29uLW9wYWNpdHk6IDE7XHJcbiAgICAtLWRldGFpbC1pY29uLWZvbnQtc2l6ZTogMTNweDtcclxuICAgIC0tcGFkZGluZy1zdGFydDogNCU7XHJcbn1cclxuaW9uLWl0ZW0gaW9uLXRodW1ibmFpbCB7XHJcbiAgICB3aWR0aDogMzVweDtcclxuICAgIGhlaWdodDogMzVweDtcclxufVxyXG5pb24taXRlbSBpb24tbGFiZWwge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcbmlvbi1pdGVtIGlvbi1sYWJlbCBwIHtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIG1hcmdpbi10b3A6IDVweDtcclxufVxyXG4uaW9uLWl0ZW17XHJcbiAgICAtLXBhZGRpbmctYm90dG9tOiA1JTtcclxufSIsImlvbi1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiAjRjJGMkYyO1xufVxuXG4ucHJpY2UtY2FyZCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBwYWRkaW5nOiAxMHB4IDEwcHggMHB4IDEwcHg7XG4gIG1hcmdpbjogNnB4IDEycHggMTJweCAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5wcmljZS1kZXRhaWxzIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBvcGFjaXR5OiAwLjc7XG59XG5cbi5saW5lIHtcbiAgYm9yZGVyOiAwO1xuICBjbGVhcjogYm90aDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xuICBoZWlnaHQ6IDFweDtcbiAgb3BhY2l0eTogMC40O1xufVxuXG4udG90YWwtaXRlbXMge1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi5wcmljZS10b3RhbCB7XG4gIHRleHQtYWxpZ246IGVuZDtcbn1cblxuLnByaWNlLXRvdGFsIHAge1xuICBmb250LXNpemU6IDE1cHg7XG59XG5cbi50b3RhbC1lc3RpbWF0ZWQge1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi5lc3RpbWF0ZWQtcHJpY2Uge1xuICB0ZXh0LWFsaWduOiBlbmQ7XG59XG5cbi5lc3RpbWF0ZWQtcHJpY2UgcCB7XG4gIGZvbnQtc2l6ZTogMTdweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn1cblxuLnBheW1lbnQtbWV0aG9kcyB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBwYWRkaW5nOiAxMHB4IDEwcHggMTBweCAxMHB4O1xuICBtYXJnaW46IDZweCAxMnB4IDEycHggMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4ucGF5bWVudC1tb2RlcyB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgb3BhY2l0eTogMC43O1xufVxuXG4uc3Bpbm5lciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogNTAlO1xufVxuXG5pb24taXRlbSB7XG4gIC0tZGV0YWlsLWljb24tY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgLS1kZXRhaWwtaWNvbi1vcGFjaXR5OiAxO1xuICAtLWRldGFpbC1pY29uLWZvbnQtc2l6ZTogMTNweDtcbiAgLS1wYWRkaW5nLXN0YXJ0OiA0JTtcbn1cblxuaW9uLWl0ZW0gaW9uLXRodW1ibmFpbCB7XG4gIHdpZHRoOiAzNXB4O1xuICBoZWlnaHQ6IDM1cHg7XG59XG5cbmlvbi1pdGVtIGlvbi1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuaW9uLWl0ZW0gaW9uLWxhYmVsIHAge1xuICBmb250LXNpemU6IDEycHg7XG4gIG1hcmdpbi10b3A6IDVweDtcbn1cblxuLmlvbi1pdGVtIHtcbiAgLS1wYWRkaW5nLWJvdHRvbTogNSU7XG59Il19 */"

/***/ }),

/***/ "./src/app/order-payment/order-payment.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/order-payment/order-payment.page.ts ***!
  \*****************************************************/
/*! exports provided: OrderPaymentPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderPaymentPage", function() { return OrderPaymentPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");





let OrderPaymentPage = class OrderPaymentPage {
    constructor(events, router, alertController, loadingController, route, storage, navCtrl) {
        this.events = events;
        this.router = router;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.route = route;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.phonepeNo = '';
        this.paytmNo = '';
        this.upiId = '';
        this.showLoader = true;
        this.totalPriceAfterDiscount = 0;
        this.paytmActive = false;
        this.razorpayActive = false;
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.orderId = this.router.getCurrentNavigation().extras.state.orderId;
                this.userId = this.router.getCurrentNavigation().extras.state.userId;
                //console.log('orderId', this.orderId);
            }
        });
    }
    ngOnInit() {
    }
    ionViewDidEnter() {
        this.events.publish('user:getOrderDetailsWithOrderId', this.orderId);
        this.events.publish('admin-settings:getPaytmData');
        this.events.publish('admin-settings:getRazorPayData');
        this.initializeSubscriptions();
    }
    ionViewWillLeave() {
        this.removeSubscription();
    }
    initializeSubscriptions() {
        this.events.subscribe('user:publishOrderDetailsWithOrderId', (orderData) => {
            //console.log('orderData', orderData);
            this.orderData = orderData;
            this.showLoader = false;
        });
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
        });
        this.events.subscribe('order:modeSetToCashSuccess', () => {
            this.loading.dismiss();
            this.presentAlert('Payment Mode has been set to cash successfully');
        });
    }
    getTotalItems() {
        return this.orderData[0].products.length;
    }
    onClickPaymentMode(mode) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (mode === 'cash') {
                yield this.presentLoading();
                this.events.publish('order:payWithCash', this.orderData[0].orderId, this.orderData[0].totalAmountToPaid);
            }
            if (mode === 'card' || mode === 'wallet' || mode === 'upi' || mode === 'netbanking') {
                yield this.presentLoading();
                this.events.publish('order:payWithRazorPay', this.orderData[0].orderId, this.userId, this.orderData[0].totalAmountToPaid, this.razorpayId, mode);
            }
            if (mode === 'paytm') {
                yield this.presentLoading();
                this.events.publish('order:payWithPaytm', this.orderData[0].orderId, this.userId, this.orderData[0].totalAmountToPaid);
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
                            this.navCtrl.navigateRoot(['shop-categories']);
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
    presentFailureAlert(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: ['Try Again']
            });
            yield alert.present();
        });
    }
    removeSubscription() {
        this.events.unsubscribe('user:publishOrderDetailsWithOrderId');
        this.events.unsubscribe('user:setPaymentModeOfOrderByUserSuccessfully');
        this.events.unsubscribe('admin-settings:publishPaytmData');
        this.events.unsubscribe('admin-settings:publishRazorPayData');
        this.events.unsubscribe('order:modeSetToCashSuccess');
    }
};
OrderPaymentPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"] }
];
OrderPaymentPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-order-payment',
        template: __webpack_require__(/*! raw-loader!./order-payment.page.html */ "./node_modules/raw-loader/index.js!./src/app/order-payment/order-payment.page.html"),
        styles: [__webpack_require__(/*! ./order-payment.page.scss */ "./src/app/order-payment/order-payment.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"]])
], OrderPaymentPage);



/***/ })

}]);
//# sourceMappingURL=order-payment-order-payment-module-es2015.js.map