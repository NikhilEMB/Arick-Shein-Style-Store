(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["user-order-details-user-order-details-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/user-order-details/user-order-details.page.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/user-order-details/user-order-details.page.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"user-cart\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center>Order: ORD{{orderId}}</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div *ngIf=\"showLoader; else showOrderDetails\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n  <ng-template #showOrderDetails>\r\n    <div class=\"do-payment\"\r\n      *ngIf=\"!orderData[0].payment.completed && orderData[0].payment.mode !== 'cash'  && (orderData[0].status === 'Confirmed' || orderData[0].status === 'Dispatched')\">\r\n      <ion-button (click)=\"onClickDoPayment()\" shape=\"round\">\r\n        do payment <i class=\"flaticon-credit-cards-payment\"></i>\r\n      </ion-button>\r\n    </div>\r\n    <div class=\"content-card\">\r\n      <p class=\"user-name\">{{orderData[0].address.name}}</p>\r\n      <p class=\"address\">{{orderData[0].address.address}}</p>\r\n      <p class=\"phone-no\">{{orderData[0].address.phoneNo}}</p>\r\n    </div>\r\n    <div class=\"content-card\" *ngIf=\"orderData[0].payment.completed\">\r\n      <p class=\"user-name\">Payment is successful <span><i class=\"flaticon-null-20\"></i></span></p>\r\n      <p *ngIf=\"orderData[0].deliveryStatus === 'inProgress' && (orderData[0].status === 'Confirmed' || orderData[0].status === 'Dispatched')\"\r\n        style=\"color: var(--ion-color-primary);\"\r\n        (click)=\"onClickTrackOrder(orderData[0].deliveryAgentId, orderData[0].deliveryLatLng)\">Track order</p>\r\n      <p *ngIf=\"orderData[0].deliveryStatus === 'notStarted' && orderData[0].status === 'Confirmed' || (!orderData[0].deliveryStatus && orderData[0].status === 'Confirmed')\">Delivery Not Started.</p>\r\n      <p *ngIf=\"orderData[0].deliveryStatus === 'delivered' && orderData[0].status === 'Delivered'\">Delivered</p>\r\n    </div>\r\n    <div class=\"content-card\" *ngIf=\"!orderData[0].payment.completed && orderData[0].payment.mode === 'cash'\">\r\n      <p class=\"user-name\">Pay {{orderData[0].totalAmountToPaid | currency: 'INR':true:'0.0'}} to delivery agent.\r\n      </p>\r\n      <p *ngIf=\"orderData[0].deliveryStatus === 'inProgress' && (orderData[0].status === 'Confirmed' || orderData[0].status === 'Dispatched')\"\r\n        style=\"color: var(--ion-color-primary);\"\r\n        (click)=\"onClickTrackOrder(orderData[0].deliveryAgentId, orderData[0].deliveryLatLng)\">Track order</p>\r\n      <p *ngIf=\"(orderData[0].deliveryStatus === 'notStarted' && orderData[0].status === 'Confirmed') || (!orderData[0].deliveryStatus && orderData[0].status === 'Confirmed')\">Delivery Not Started.</p>\r\n      <p *ngIf=\"orderData[0].deliveryStatus === 'delivered' && orderData[0].status === 'Delivered'\">Delivered</p>\r\n    </div>\r\n    <div class=\"content-card\" *ngIf=\"orderData[0].invoice?.status === 'generated'\">\r\n      <ion-item button (click)=\"openOrderInvoice(orderData[0].invoice.url)\" detail lines=\"none\" class=\"order-invoice ion-no-padding\">\r\n        <ion-label>\r\n          <h4>Order Invoice</h4>\r\n        </ion-label>\r\n      </ion-item>\r\n    </div>\r\n    <div class=\"products-container\">\r\n      <ion-list class=\"ion-no-padding\" lines=\"none\">\r\n        <ion-grid class=\"ion-no-padding\">\r\n          <ion-row class=\"ion-no-padding\">\r\n            <ion-col class=\"ion-no-padding\">\r\n              <div class=\"products-heading\">\r\n                Products\r\n              </div>\r\n            </ion-col>\r\n            <ion-col class=\"ion-no-padding\">\r\n              <div *ngIf=\"orderData[0].status === 'Pending'\" class=\"order-status\">\r\n                Placed <span><i class=\"flaticon-null-20\"></i></span>\r\n              </div>\r\n              <div *ngIf=\"orderData[0].status === 'Rejected'\" class=\"order-status\">\r\n                Rejected <span><i class=\"flaticon-null-19\"></i></span>\r\n              </div>\r\n              <div *ngIf=\"orderData[0].status === 'Confirmed'\" class=\"order-status\">\r\n                Confirmed <span><i class=\"flaticon-null-20\"></i></span>\r\n              </div>\r\n              <div *ngIf=\"orderData[0].status === 'Cancelled'\" class=\"order-status\">\r\n                Cancelled <span><i class=\"flaticon-null-19\"></i></span>\r\n              </div>\r\n              <div *ngIf=\"orderData[0].status === 'Dispatched'\" class=\"order-status\">\r\n                Dispatched <span><i class=\"flaticon-null-20\"></i></span>\r\n              </div>\r\n              <div *ngIf=\"orderData[0].status === 'Delivered'\" class=\"order-status\">\r\n                Delivered <span><i class=\"flaticon-null-20\"></i></span>\r\n              </div>\r\n              <div *ngIf=\"orderData[0].status === 'Returned'\" class=\"order-status\">\r\n                Returned <span><i class=\"flaticon-null-20\"></i></span>\r\n              </div>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n\r\n        <hr class=\"line\">\r\n        <div *ngFor=\"let product of orderData[0].products; let i=index\">\r\n          <ion-item class=\"ion-no-padding\" (click)=\"goToPrdouctDetails(product.productId)\">\r\n            <div slot=\"start\"\r\n              [ngStyle]=\"{'background': 'url(' + product.img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n              class=\"product-image\"></div>\r\n              \r\n            <ion-label>\r\n              <h2 class=\"product-price ion-text-wrap\">{{product.price * product.quantity | currency: 'INR':true}}</h2>\r\n              <h3 class=\"product-name ion-text-wrap\">{{product.name}}</h3>\r\n              <h6 class=\"product-description\">{{product.description}}</h6>\r\n              <ion-grid>\r\n                <ion-row>\r\n                  <h3 class=\"product-quantity\">QTY: {{product.quantity}}</h3>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </ion-label>\r\n          </ion-item>\r\n          <div class=\"comment-box\" *ngIf=\"product.commentMsg\">\r\n            Your Message: {{product.commentMsg}}\r\n          </div>\r\n          <div *ngIf=\"product.commentImgs.length !== 0\">\r\n            <ion-grid class=\"ion-no-padding\">\r\n              <ion-row class=\"ion-justify-content-start\">\r\n                <ion-col size=\"2\" class=\"comment-img-conatiner\"\r\n                  *ngFor=\"let img of product.commentImgs; let imgIndex = index\">\r\n                  <div\r\n                    [ngStyle]=\"{'background': 'url(' + img.thumb + ') no-repeat center', 'background-size': 'contain'}\"\r\n                    class=\"comment-img\"></div>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <hr class=\"line\" *ngIf=\"i !== orderData[0].products.length - 1\">\r\n        </div>\r\n\r\n      </ion-list>\r\n    </div>\r\n    <div class=\"price-card\">\r\n      <p class=\"price-details\">Price Details</p>\r\n      <hr class=\"line\">\r\n      <ion-grid class=\"ion-no-padding\">\r\n        <ion-row class=\"ion-justify-content-between ion-no-padding\">\r\n          <ion-col class=\"ion-no-padding\">\r\n            <p class=\"total-items\">Price ({{getTotalItems()}} items)</p>\r\n          </ion-col>\r\n          <ion-col class=\"ion-no-padding price-total\">\r\n            <p>{{orderData[0].productsPrice | currency: 'INR':true:'0.0'}}</p>\r\n          </ion-col>\r\n        </ion-row>\r\n\r\n        <ion-row class=\"ion-justify-content-between ion-no-padding\" *ngIf=\"orderData[0].couponDiscount !== 0\">\r\n          <ion-col class=\"ion-no-padding\">\r\n            <p class=\"total-items\">Coupon Discount</p>\r\n          </ion-col>\r\n          <ion-col class=\"ion-no-padding price-total\">\r\n            <p style=\"color: var(--ion-color-success);\">{{orderData[0].couponDiscount | currency: 'INR':true:'0.0'}}</p>\r\n          </ion-col>\r\n        </ion-row>\r\n\r\n        <ion-row class=\"ion-justify-content-between ion-no-padding\">\r\n          <ion-col class=\"ion-no-padding\">\r\n            <p class=\"total-items\">Delivery</p>\r\n          </ion-col>\r\n          <ion-col class=\"ion-no-padding price-total\">\r\n            <p *ngIf=\"orderData[0].delivery !== 0\">{{orderData[0].delivery | currency: 'INR':true:'0.0'}}</p>\r\n            <p *ngIf=\"orderData[0].delivery === 0\" style=\"color: var(--ion-color-success);\">Free</p>\r\n          </ion-col>\r\n        </ion-row>\r\n\r\n        <ion-row class=\"ion-justify-content-between ion-no-padding\" *ngIf=\"orderData[0].defaultGst !== 0\">\r\n          <ion-col class=\"ion-no-padding\">\r\n            <p class=\"total-items\">GST</p>\r\n          </ion-col>\r\n          <ion-col class=\"ion-no-padding price-total\">\r\n            <p>{{orderData[0].defaultGst | currency: 'INR':true:'0.0'}}</p>\r\n          </ion-col>\r\n        </ion-row>\r\n\r\n        <hr class=\"line\">\r\n        <ion-row class=\"ion-no-padding\">\r\n          <ion-col class=\"ion-no-padding\">\r\n            <p class=\"total-estimated\">Total Amount</p>\r\n          </ion-col>\r\n          <ion-col class=\"ion-no-padding estimated-price\">\r\n            <p>{{orderData[0].totalAmountToPaid | currency: 'INR':true:'0.0'}}</p>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </div>\r\n  </ng-template>\r\n</ion-content>\r\n<ion-footer *ngIf=\"!showLoader && (orderData[0].status === 'Pending' || (!orderData[0].payment.completed && orderData[0].status === 'Confirmed'))\" (click)=\"onClickCancelOrder()\">\r\n  <ion-grid>\r\n    <ion-row class=\"ion-justify-content-center ion-align-items-center\">\r\n      <div class=\"app-footer-text\">\r\n        Cancel Order<span><i class=\"flaticon-null-19 app-footer-icon\"></i></span>\r\n    </div>\r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/user-order-details/user-order-details.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/user-order-details/user-order-details.module.ts ***!
  \*****************************************************************/
/*! exports provided: UserOrderDetailsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserOrderDetailsPageModule", function() { return UserOrderDetailsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _user_order_details_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user-order-details.page */ "./src/app/user-order-details/user-order-details.page.ts");







const routes = [
    {
        path: '',
        component: _user_order_details_page__WEBPACK_IMPORTED_MODULE_6__["UserOrderDetailsPage"]
    }
];
let UserOrderDetailsPageModule = class UserOrderDetailsPageModule {
};
UserOrderDetailsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_user_order_details_page__WEBPACK_IMPORTED_MODULE_6__["UserOrderDetailsPage"]]
    })
], UserOrderDetailsPageModule);



/***/ }),

/***/ "./src/app/user-order-details/user-order-details.page.scss":
/*!*****************************************************************!*\
  !*** ./src/app/user-order-details/user-order-details.page.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content-card {\n  background: white;\n  padding: 10px;\n  margin: 6px 12px 12px 12px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\nion-content {\n  --background: #F2F2F2;\n}\n\n.user-name {\n  font-size: 15px;\n}\n\n.address {\n  font-size: 13px;\n}\n\n.phone-no {\n  font-size: 13px;\n}\n\n.spinner {\n  text-align: center;\n  margin-top: 50%;\n}\n\nion-list {\n  border-radius: 5px;\n}\n\n.products-heading {\n  font-size: 14px;\n  text-transform: uppercase;\n  opacity: 0.7;\n  padding: 10px 0px 5px;\n}\n\n.products-container {\n  margin: 10px;\n  background: white;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 10px;\n  position: relative;\n}\n\n.product-image {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n  width: 100px;\n  height: 80px;\n}\n\n.product-name {\n  font-size: 13px;\n  margin-top: 7px;\n}\n\n.product-price {\n  color: var(--ion-color-primary);\n  font-size: 16px;\n}\n\n.product-description {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  margin-top: 7px;\n  opacity: 0.5;\n  margin-bottom: -3px;\n  font-size: 12px;\n}\n\n.product-quantity {\n  font-size: 12px;\n}\n\nion-grid ion-row {\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n\n.comment-box {\n  opacity: 0.4;\n  font-size: 14px;\n  margin-left: 10px;\n}\n\n.comment-img-conatiner {\n  margin-right: 10px;\n}\n\n.comment-img {\n  border: 1px solid #ececec;\n  width: 50px;\n  height: 50px;\n}\n\n.price-card {\n  background: white;\n  padding: 10px 10px 0px 10px;\n  margin: 6px 12px 12px 12px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.price-details {\n  font-size: 14px;\n  text-transform: uppercase;\n  opacity: 0.7;\n}\n\n.line {\n  border: 0;\n  clear: both;\n  display: block;\n  width: 100%;\n  background-color: #ccc;\n  height: 1px;\n  opacity: 0.4;\n}\n\n.total-items {\n  font-size: 13px;\n}\n\n.price-total {\n  text-align: end;\n}\n\n.price-total p {\n  font-size: 15px;\n}\n\n.total-estimated {\n  font-size: 16px;\n}\n\n.estimated-price {\n  text-align: end;\n}\n\n.estimated-price p {\n  font-size: 17px;\n  color: var(--ion-color-primary);\n}\n\n.order-status {\n  text-align: end;\n  font-size: 14px;\n  text-transform: uppercase;\n  padding: 10px 0px 5px;\n}\n\n.flaticon-null-20::before {\n  color: var(--ion-color-success);\n}\n\n.flaticon-null-19::before {\n  color: var(--ion-color-danger);\n}\n\n.app-footer-text .flaticon-null-19::before {\n  color: white;\n}\n\n.do-payment {\n  text-align: center;\n  margin: 10px 10px;\n}\n\n.flaticon-credit-cards-payment::before {\n  margin-left: 3px;\n}\n\n.order-invoice {\n  --detail-icon-color: var(--ion-color-primary);\n  --detail-icon-opacity: 1;\n  --detail-icon-font-size: 13px;\n  --padding-start: 2%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlci1vcmRlci1kZXRhaWxzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFx1c2VyLW9yZGVyLWRldGFpbHNcXHVzZXItb3JkZXItZGV0YWlscy5wYWdlLnNjc3MiLCJzcmMvYXBwL3VzZXItb3JkZXItZGV0YWlscy91c2VyLW9yZGVyLWRldGFpbHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksaUJBQUE7RUFDQSxhQUFBO0VBQ0EsMEJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FDQ0o7O0FEQ0E7RUFDSSxxQkFBQTtBQ0VKOztBREFBO0VBQ0ksZUFBQTtBQ0dKOztBRERBO0VBQ0ksZUFBQTtBQ0lKOztBREZBO0VBQ0ksZUFBQTtBQ0tKOztBREhBO0VBQ0ksa0JBQUE7RUFDQSxlQUFBO0FDTUo7O0FESkE7RUFDSSxrQkFBQTtBQ09KOztBRExBO0VBQ0ksZUFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0FDUUo7O0FETkE7RUFDSSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FDU0o7O0FEUEE7RUFDSSxzR0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FDVUo7O0FEUkE7RUFDSSxlQUFBO0VBQ0EsZUFBQTtBQ1dKOztBRFRBO0VBQ0ksK0JBQUE7RUFDQSxlQUFBO0FDWUo7O0FEVkE7RUFDSSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQ2FKOztBRFhBO0VBQ0ksZUFBQTtBQ2NKOztBRFhBO0VBQ0kscUJBQUE7VUFBQSx5QkFBQTtBQ2NKOztBRFhBO0VBQ0ksWUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQ2NKOztBRFpBO0VBQ0ksa0JBQUE7QUNlSjs7QURiQTtFQUNJLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUNnQko7O0FEZEE7RUFDSSxpQkFBQTtFQUNBLDJCQUFBO0VBQ0EsMEJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FDaUJKOztBRGZBO0VBQ0ksZUFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtBQ2tCSjs7QURoQkE7RUFDSSxTQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQ21CSjs7QURqQkE7RUFDSSxlQUFBO0FDb0JKOztBRGxCQTtFQUNJLGVBQUE7QUNxQko7O0FEbkJBO0VBQ0ksZUFBQTtBQ3NCSjs7QURwQkE7RUFDSSxlQUFBO0FDdUJKOztBRHJCQTtFQUNJLGVBQUE7QUN3Qko7O0FEdEJBO0VBQ0ksZUFBQTtFQUNBLCtCQUFBO0FDeUJKOztBRHZCQTtFQUNJLGVBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQzBCSjs7QUR4QkE7RUFDSSwrQkFBQTtBQzJCSjs7QUR6QkE7RUFDSSw4QkFBQTtBQzRCSjs7QUQxQkE7RUFDSSxZQUFBO0FDNkJKOztBRDNCQTtFQUNJLGtCQUFBO0VBQ0EsaUJBQUE7QUM4Qko7O0FENUJBO0VBQ0ksZ0JBQUE7QUMrQko7O0FENUJBO0VBQ0ksNkNBQUE7RUFDQSx3QkFBQTtFQUNBLDZCQUFBO0VBQ0EsbUJBQUE7QUMrQkoiLCJmaWxlIjoic3JjL2FwcC91c2VyLW9yZGVyLWRldGFpbHMvdXNlci1vcmRlci1kZXRhaWxzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250ZW50LWNhcmR7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBtYXJnaW46IDZweCAxMnB4IDEycHggMTJweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuaW9uLWNvbnRlbnR7XHJcbiAgICAtLWJhY2tncm91bmQ6ICNGMkYyRjI7XHJcbn1cclxuLnVzZXItbmFtZXtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG4uYWRkcmVzc3tcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxufVxyXG4ucGhvbmUtbm97XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbn1cclxuLnNwaW5uZXJ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiA1MCU7XHJcbn1cclxuaW9uLWxpc3R7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuLnByb2R1Y3RzLWhlYWRpbmd7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgb3BhY2l0eTogLjc7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDBweCA1cHg7XHJcbn1cclxuLnByb2R1Y3RzLWNvbnRhaW5lcntcclxuICAgIG1hcmdpbjogMTBweDtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuLnByb2R1Y3QtaW1hZ2V7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoJ2h0dHBzOi8vczUuZ2lmeXUuY29tL2ltYWdlcy9sb2FkZXJiYjE5ZWZjYzI3NDllMTE1LmdpZicpIGNlbnRlciBuby1yZXBlYXQ7XHJcbiAgICB3aWR0aDogMTAwcHg7XHJcbiAgICBoZWlnaHQ6IDgwcHg7XHJcbn1cclxuLnByb2R1Y3QtbmFtZXtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIG1hcmdpbi10b3A6IDdweDtcclxufVxyXG4ucHJvZHVjdC1wcmljZXtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbn1cclxuLnByb2R1Y3QtZGVzY3JpcHRpb257XHJcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gICAgbWFyZ2luLXRvcDogN3B4O1xyXG4gICAgb3BhY2l0eTogLjU7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAtM3B4O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG59XHJcbi5wcm9kdWN0LXF1YW50aXR5e1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG59XHJcblxyXG5pb24tZ3JpZCBpb24tcm93e1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDs7XHJcbn1cclxuXHJcbi5jb21tZW50LWJveHtcclxuICAgIG9wYWNpdHk6IDAuNDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG59XHJcbi5jb21tZW50LWltZy1jb25hdGluZXJ7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbn1cclxuLmNvbW1lbnQtaW1ne1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2VjZWNlYztcclxuICAgIHdpZHRoOiA1MHB4O1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG59XHJcbi5wcmljZS1jYXJke1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDEwcHggMHB4IDEwcHg7XHJcbiAgICBtYXJnaW46IDZweCAxMnB4IDEycHggMTJweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuLnByaWNlLWRldGFpbHN7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgb3BhY2l0eTogLjc7XHJcbn1cclxuLmxpbmV7XHJcbiAgICBib3JkZXI6IDA7XHJcbiAgICBjbGVhcjogYm90aDtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xyXG4gICAgaGVpZ2h0OiAxcHg7XHJcbiAgICBvcGFjaXR5OiAuNDtcclxufVxyXG4udG90YWwtaXRlbXN7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbn1cclxuLnByaWNlLXRvdGFse1xyXG4gICAgdGV4dC1hbGlnbjogZW5kO1xyXG59XHJcbi5wcmljZS10b3RhbCBwe1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG59XHJcbi50b3RhbC1lc3RpbWF0ZWR7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbn1cclxuLmVzdGltYXRlZC1wcmljZXtcclxuICAgIHRleHQtYWxpZ246IGVuZDtcclxufVxyXG4uZXN0aW1hdGVkLXByaWNlIHB7XHJcbiAgICBmb250LXNpemU6IDE3cHg7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG59XHJcbi5vcmRlci1zdGF0dXN7XHJcbiAgICB0ZXh0LWFsaWduOiBlbmQ7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgcGFkZGluZzogMTBweCAwcHggNXB4O1xyXG59XHJcbi5mbGF0aWNvbi1udWxsLTIwOjpiZWZvcmUge1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxufVxyXG4uZmxhdGljb24tbnVsbC0xOTo6YmVmb3JlIHtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcclxufVxyXG4uYXBwLWZvb3Rlci10ZXh0IC5mbGF0aWNvbi1udWxsLTE5OjpiZWZvcmUge1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcbi5kby1wYXltZW50e1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbWFyZ2luOiAxMHB4IDEwcHg7XHJcbn1cclxuLmZsYXRpY29uLWNyZWRpdC1jYXJkcy1wYXltZW50OjpiZWZvcmUge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDNweDtcclxufVxyXG5cclxuLm9yZGVyLWludm9pY2V7XHJcbiAgICAtLWRldGFpbC1pY29uLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICAtLWRldGFpbC1pY29uLW9wYWNpdHk6IDE7XHJcbiAgICAtLWRldGFpbC1pY29uLWZvbnQtc2l6ZTogMTNweDtcclxuICAgIC0tcGFkZGluZy1zdGFydDogMiU7XHJcbn0iLCIuY29udGVudC1jYXJkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbjogNnB4IDEycHggMTJweCAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbmlvbi1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiAjRjJGMkYyO1xufVxuXG4udXNlci1uYW1lIHtcbiAgZm9udC1zaXplOiAxNXB4O1xufVxuXG4uYWRkcmVzcyB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuLnBob25lLW5vIHtcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuXG4uc3Bpbm5lciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogNTAlO1xufVxuXG5pb24tbGlzdCB7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLnByb2R1Y3RzLWhlYWRpbmcge1xuICBmb250LXNpemU6IDE0cHg7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIG9wYWNpdHk6IDAuNztcbiAgcGFkZGluZzogMTBweCAwcHggNXB4O1xufVxuXG4ucHJvZHVjdHMtY29udGFpbmVyIHtcbiAgbWFyZ2luOiAxMHB4O1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5wcm9kdWN0LWltYWdlIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzL2xvYWRlcmJiMTllZmNjMjc0OWUxMTUuZ2lmXCIpIGNlbnRlciBuby1yZXBlYXQ7XG4gIHdpZHRoOiAxMDBweDtcbiAgaGVpZ2h0OiA4MHB4O1xufVxuXG4ucHJvZHVjdC1uYW1lIHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBtYXJnaW4tdG9wOiA3cHg7XG59XG5cbi5wcm9kdWN0LXByaWNlIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG4ucHJvZHVjdC1kZXNjcmlwdGlvbiB7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBtYXJnaW4tdG9wOiA3cHg7XG4gIG9wYWNpdHk6IDAuNTtcbiAgbWFyZ2luLWJvdHRvbTogLTNweDtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuXG4ucHJvZHVjdC1xdWFudGl0eSB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbn1cblxuaW9uLWdyaWQgaW9uLXJvdyB7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG59XG5cbi5jb21tZW50LWJveCB7XG4gIG9wYWNpdHk6IDAuNDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBtYXJnaW4tbGVmdDogMTBweDtcbn1cblxuLmNvbW1lbnQtaW1nLWNvbmF0aW5lciB7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbn1cblxuLmNvbW1lbnQtaW1nIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2VjZWNlYztcbiAgd2lkdGg6IDUwcHg7XG4gIGhlaWdodDogNTBweDtcbn1cblxuLnByaWNlLWNhcmQge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgcGFkZGluZzogMTBweCAxMHB4IDBweCAxMHB4O1xuICBtYXJnaW46IDZweCAxMnB4IDEycHggMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4ucHJpY2UtZGV0YWlscyB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgb3BhY2l0eTogMC43O1xufVxuXG4ubGluZSB7XG4gIGJvcmRlcjogMDtcbiAgY2xlYXI6IGJvdGg7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcbiAgaGVpZ2h0OiAxcHg7XG4gIG9wYWNpdHk6IDAuNDtcbn1cblxuLnRvdGFsLWl0ZW1zIHtcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuXG4ucHJpY2UtdG90YWwge1xuICB0ZXh0LWFsaWduOiBlbmQ7XG59XG5cbi5wcmljZS10b3RhbCBwIHtcbiAgZm9udC1zaXplOiAxNXB4O1xufVxuXG4udG90YWwtZXN0aW1hdGVkIHtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG4uZXN0aW1hdGVkLXByaWNlIHtcbiAgdGV4dC1hbGlnbjogZW5kO1xufVxuXG4uZXN0aW1hdGVkLXByaWNlIHAge1xuICBmb250LXNpemU6IDE3cHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG59XG5cbi5vcmRlci1zdGF0dXMge1xuICB0ZXh0LWFsaWduOiBlbmQ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgcGFkZGluZzogMTBweCAwcHggNXB4O1xufVxuXG4uZmxhdGljb24tbnVsbC0yMDo6YmVmb3JlIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbn1cblxuLmZsYXRpY29uLW51bGwtMTk6OmJlZm9yZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbn1cblxuLmFwcC1mb290ZXItdGV4dCAuZmxhdGljb24tbnVsbC0xOTo6YmVmb3JlIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uZG8tcGF5bWVudCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luOiAxMHB4IDEwcHg7XG59XG5cbi5mbGF0aWNvbi1jcmVkaXQtY2FyZHMtcGF5bWVudDo6YmVmb3JlIHtcbiAgbWFyZ2luLWxlZnQ6IDNweDtcbn1cblxuLm9yZGVyLWludm9pY2Uge1xuICAtLWRldGFpbC1pY29uLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIC0tZGV0YWlsLWljb24tb3BhY2l0eTogMTtcbiAgLS1kZXRhaWwtaWNvbi1mb250LXNpemU6IDEzcHg7XG4gIC0tcGFkZGluZy1zdGFydDogMiU7XG59Il19 */"

/***/ }),

/***/ "./src/app/user-order-details/user-order-details.page.ts":
/*!***************************************************************!*\
  !*** ./src/app/user-order-details/user-order-details.page.ts ***!
  \***************************************************************/
/*! exports provided: UserOrderDetailsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserOrderDetailsPage", function() { return UserOrderDetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "./node_modules/@ionic-native/in-app-browser/ngx/index.js");







let UserOrderDetailsPage = class UserOrderDetailsPage {
    constructor(events, router, alertController, loadingController, navCtrl, route, storage, userService, inAppBrowser) {
        this.events = events;
        this.router = router;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.navCtrl = navCtrl;
        this.route = route;
        this.storage = storage;
        this.userService = userService;
        this.inAppBrowser = inAppBrowser;
        this.orderData = [];
        this.showLoader = true;
        this.unreadAdminMsgs = 0;
        this.totalPriceAfterDiscount = 0;
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.orderId = this.router.getCurrentNavigation().extras.state.orderId;
                //console.log('categoryId', this.orderId);
            }
        });
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        this.events.publish('user:getOrderDetailsWithOrderId', this.orderId);
        this.initializeSubscriptions();
        this.storage.get('uid').then((val) => {
            this.userId = val;
        });
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('user:publishOrderDetailsWithOrderId', (orderData) => {
            //console.log('orderData', orderData);
            this.orderData = orderData;
            this.showLoader = false;
        });
        this.events.subscribe('user:cancelledOrderByUserSuccessfully', (orderData) => {
            this.loading.dismiss();
            this.presentAlert('Order has been cancelled successfully');
        });
    }
    cancelOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Cancelling the order...',
                duration: 5000
            });
            yield this.loading.present();
            this.events.publish('user:cancelOrderByUser', this.orderId);
        });
    }
    getTotalItems() {
        return this.orderData[0].products.length;
    }
    scrollToBottom() {
        this.content.scrollToBottom(500);
    }
    goToPrdouctDetails(id) {
        //console.log('id in goToPrdouctDetails', id);
        const navigationExtras = {
            state: {
                productId: id,
            }
        };
        this.router.navigate(['product-details'], navigationExtras);
    }
    onClickCancelOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: "Are you sure you want to cancel this order?",
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Yes',
                        handler: () => {
                            //console.log('Confirm Yes');
                            this.cancelOrder();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    presentAlert(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: [{
                        text: 'Ok',
                        handler: () => {
                            //console.log('Confirm Okay');
                            this.navCtrl.navigateRoot(['user-order-history']);
                        }
                    }]
            });
            yield alert.present();
        });
    }
    goToChat(fromfab) {
        let userId = this.userService.getUserId();
        //console.log('uid in sc', userId);
        if (userId === '') {
            //console.log('in if of uid');
            this.router.navigate(['home']);
        }
        else {
            //console.log('in else of uid');
            this.storage.get('userRole').then((role) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                if (role === 'admin') {
                    this.router.navigate(['admin-home']);
                }
                else {
                    this.router.navigate(['chat-bot']);
                }
            }));
        }
    }
    onClickDoPayment() {
        const navigationExtras = {
            state: {
                orderId: this.orderId,
                userId: this.userId
            }
        };
        this.router.navigate(['order-payment'], navigationExtras);
    }
    onClickTrackOrder(agentId, deliveryLatLng) {
        const navigationExtras = {
            state: {
                agentId: agentId,
                routeFromUserSide: true,
                deliveryLatLng: deliveryLatLng
            }
        };
        this.router.navigate(['location-map'], navigationExtras);
    }
    openOrderInvoice(url) {
        const browser = this.inAppBrowser.create(url, '_system');
    }
    removeSubscriptions() {
        this.events.unsubscribe('user:publishOrderDetailsWithOrderId');
        this.events.unsubscribe('user:cancelledOrderByUserSuccessfully');
    }
};
UserOrderDetailsPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"] },
    { type: _services_user_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"] },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_6__["InAppBrowser"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
], UserOrderDetailsPage.prototype, "content", void 0);
UserOrderDetailsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-user-order-details',
        template: __webpack_require__(/*! raw-loader!./user-order-details.page.html */ "./node_modules/raw-loader/index.js!./src/app/user-order-details/user-order-details.page.html"),
        styles: [__webpack_require__(/*! ./user-order-details.page.scss */ "./src/app/user-order-details/user-order-details.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"],
        _services_user_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"],
        _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_6__["InAppBrowser"]])
], UserOrderDetailsPage);



/***/ })

}]);
//# sourceMappingURL=user-order-details-user-order-details-module-es2015.js.map