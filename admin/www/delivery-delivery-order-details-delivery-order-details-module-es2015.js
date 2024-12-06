(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["delivery-delivery-order-details-delivery-order-details-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/delivery/delivery-order-details/delivery-order-details.page.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/delivery/delivery-order-details/delivery-order-details.page.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"delivery-orders\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center>Order: ORD{{orderId}}</ion-title>\r\n    <ion-buttons slot =\"end\">\r\n      <ion-button (click)=\"callUser()\">\r\n        <i class=\"flaticon-call\"></i>\r\n      </ion-button>\r\n  </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div *ngIf=\"showLoader; else showOrderDetails\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n  <ng-template #showOrderDetails>\r\n    <div class=\"address-card\">\r\n      <p class=\"user-name\">{{orderData[0].address.name}}</p>\r\n      <p class=\"address\">{{orderData[0].address.address}}</p>\r\n      <p class=\"phone-no\">{{orderData[0].address.phoneNo}}</p>\r\n    </div>\r\n    <div class=\"products-container\">\r\n      <ion-list class=\"ion-no-padding\" lines=\"none\">\r\n        <ion-grid class=\"ion-no-padding\">\r\n          <ion-row class=\"ion-no-padding\">\r\n            <ion-col class=\"ion-no-padding\">\r\n              <div class=\"products-heading\">\r\n                Products\r\n              </div>\r\n            </ion-col>\r\n            <ion-col class=\"ion-no-padding\">\r\n              <div *ngIf=\"(orderData[0].status === 'Cancelled' || orderData[0].status === 'Delivered');else useDeliveryStatus\" class=\"order-status\">\r\n                {{orderData[0].status}}\r\n              </div>\r\n            </ion-col>\r\n            <ng-template #useDeliveryStatus>\r\n              <ion-col class=\"ion-no-padding\">\r\n                <div *ngIf=\"orderData[0].deliveryStatus === 'notStarted'\" class=\"order-status\">\r\n                  Not Started\r\n                </div>\r\n                <div *ngIf=\"orderData[0].deliveryStatus === 'inProgress'\" class=\"order-status\">\r\n                  Delivery In Progress\r\n                </div>\r\n                <div *ngIf=\"orderData[0].deliveryStatus === 'delivered'\" class=\"order-status\">\r\n                  Delivered\r\n                </div>\r\n              </ion-col>\r\n            </ng-template>\r\n          </ion-row>\r\n        </ion-grid>\r\n\r\n        <hr class=\"line\">\r\n        <div *ngFor=\"let product of orderData[0].products; let i=index\">\r\n          <ion-item class=\"ion-no-padding\" (click)=\"goToPrdouctDetails(product.productId)\">\r\n            <div slot=\"start\"\r\n              [ngStyle]=\"{'background': 'url(' + product.img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n              class=\"product-image\"></div>\r\n            <ion-label>\r\n              <h2 class=\"product-price ion-text-wrap\">{{product.price * product.quantity | currency: 'INR':true}}</h2>\r\n              <h3 class=\"product-name ion-text-wrap\">{{product.name}}</h3>\r\n              <h6 class=\"product-description\">{{product.description}}</h6>\r\n              <ion-grid>\r\n                <ion-row>\r\n                  <h3 class=\"product-quantity\">QTY: {{product.quantity}}</h3>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </ion-label>\r\n          </ion-item>\r\n          <hr class=\"line\" *ngIf=\"i !== orderData[0].products.length - 1\">\r\n        </div>\r\n      </ion-list>\r\n    </div>\r\n    \r\n  </ng-template>\r\n</ion-content>\r\n\r\n<ion-footer *ngIf=\"!showLoader && orderData[0].deliveryStatus === 'notStarted' && (orderData[0].status !== 'Cancelled' && orderData[0].status !== 'Delivered')\" (click)=\"onClickStartNavigation()\">\r\n  <ion-grid>\r\n    <ion-row class=\"ion-justify-content-center ion-align-items-center\">\r\n      <div class=\"app-footer-text\">\r\n        Start Navigation<span><i class=\"flaticon-address app-footer-icon\"></i></span>\r\n    </div>\r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-footer>\r\n\r\n<ion-footer *ngIf=\"!showLoader && orderData[0].deliveryStatus === 'inProgress' && (orderData[0].status !== 'Cancelled' && orderData[0].status !== 'Delivered')\" (click)=\"onClickContinueNavigation()\">\r\n  <ion-grid>\r\n    <ion-row class=\"ion-justify-content-center ion-align-items-center\">\r\n      <div class=\"app-footer-text\">\r\n        Continue Navigation<span><i class=\"flaticon-address app-footer-icon\"></i></span>\r\n    </div>\r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/delivery/delivery-order-details/delivery-order-details.module.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/delivery/delivery-order-details/delivery-order-details.module.ts ***!
  \**********************************************************************************/
/*! exports provided: DeliveryOrderDetailsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveryOrderDetailsPageModule", function() { return DeliveryOrderDetailsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _delivery_order_details_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./delivery-order-details.page */ "./src/app/delivery/delivery-order-details/delivery-order-details.page.ts");







const routes = [
    {
        path: '',
        component: _delivery_order_details_page__WEBPACK_IMPORTED_MODULE_6__["DeliveryOrderDetailsPage"]
    }
];
let DeliveryOrderDetailsPageModule = class DeliveryOrderDetailsPageModule {
};
DeliveryOrderDetailsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_delivery_order_details_page__WEBPACK_IMPORTED_MODULE_6__["DeliveryOrderDetailsPage"]]
    })
], DeliveryOrderDetailsPageModule);



/***/ }),

/***/ "./src/app/delivery/delivery-order-details/delivery-order-details.page.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/delivery/delivery-order-details/delivery-order-details.page.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".address-card {\n  background: white;\n  padding: 10px;\n  margin: 12px 12px 12px 12px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\nion-content {\n  --background: #F2F2F2;\n}\n\n.user-name {\n  font-size: 15px;\n}\n\n.address {\n  font-size: 13px;\n}\n\n.phone-no {\n  font-size: 13px;\n}\n\n.spinner {\n  text-align: center;\n  margin-top: 50%;\n}\n\nion-list {\n  border-radius: 5px;\n}\n\n.products-heading {\n  font-size: 14px;\n  text-transform: uppercase;\n  opacity: 0.7;\n  padding: 10px 0px 5px;\n}\n\n.products-container {\n  margin: 10px;\n  background: white;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 10px;\n  position: relative;\n}\n\n.product-image {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n  width: 100px;\n  height: 80px;\n}\n\n.product-name {\n  font-size: 13px;\n  margin-top: 7px;\n}\n\n.product-price {\n  color: var(--ion-color-primary);\n  font-size: 16px;\n}\n\n.product-description {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  margin-top: 7px;\n  opacity: 0.5;\n  margin-bottom: -3px;\n  font-size: 12px;\n}\n\n.product-quantity {\n  font-size: 12px;\n}\n\nion-grid ion-row {\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n\n.order-status {\n  text-align: end;\n  font-size: 13px;\n  text-transform: uppercase;\n  padding: 10px 0px 5px;\n}\n\n.line {\n  border: 0;\n  clear: both;\n  display: block;\n  width: 100%;\n  background-color: #ccc;\n  height: 1px;\n  opacity: 0.4;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGVsaXZlcnkvZGVsaXZlcnktb3JkZXItZGV0YWlscy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcZGVsaXZlcnlcXGRlbGl2ZXJ5LW9yZGVyLWRldGFpbHNcXGRlbGl2ZXJ5LW9yZGVyLWRldGFpbHMucGFnZS5zY3NzIiwic3JjL2FwcC9kZWxpdmVyeS9kZWxpdmVyeS1vcmRlci1kZXRhaWxzL2RlbGl2ZXJ5LW9yZGVyLWRldGFpbHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksaUJBQUE7RUFDQSxhQUFBO0VBQ0EsMkJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FDQ0o7O0FEQ0E7RUFDSSxxQkFBQTtBQ0VKOztBREFBO0VBQ0ksZUFBQTtBQ0dKOztBRERBO0VBQ0ksZUFBQTtBQ0lKOztBREZBO0VBQ0ksZUFBQTtBQ0tKOztBREhBO0VBQ0ksa0JBQUE7RUFDQSxlQUFBO0FDTUo7O0FESkE7RUFDSSxrQkFBQTtBQ09KOztBRExBO0VBQ0ksZUFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0FDUUo7O0FETkE7RUFDSSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FDU0o7O0FEUEE7RUFDSSxzR0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FDVUo7O0FEUkE7RUFDSSxlQUFBO0VBQ0EsZUFBQTtBQ1dKOztBRFRBO0VBQ0ksK0JBQUE7RUFDQSxlQUFBO0FDWUo7O0FEVkE7RUFDSSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQ2FKOztBRFhBO0VBQ0ksZUFBQTtBQ2NKOztBRFhBO0VBQ0kscUJBQUE7VUFBQSx5QkFBQTtBQ2NKOztBRFhBO0VBQ0ksZUFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0FDY0o7O0FEWkE7RUFDSSxTQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQ2VKIiwiZmlsZSI6InNyYy9hcHAvZGVsaXZlcnkvZGVsaXZlcnktb3JkZXItZGV0YWlscy9kZWxpdmVyeS1vcmRlci1kZXRhaWxzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hZGRyZXNzLWNhcmR7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBtYXJnaW46IDEycHggMTJweCAxMnB4IDEycHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcbmlvbi1jb250ZW50e1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAjRjJGMkYyO1xyXG59XHJcbi51c2VyLW5hbWV7XHJcbiAgICBmb250LXNpemU6IDE1cHg7XHJcbn1cclxuLmFkZHJlc3N7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbn1cclxuLnBob25lLW5ve1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG59XHJcbi5zcGlubmVye1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbWFyZ2luLXRvcDogNTAlO1xyXG59XHJcbmlvbi1saXN0e1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcbi5wcm9kdWN0cy1oZWFkaW5ne1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIG9wYWNpdHk6IC43O1xyXG4gICAgcGFkZGluZzogMTBweCAwcHggNXB4O1xyXG59XHJcbi5wcm9kdWN0cy1jb250YWluZXJ7XHJcbiAgICBtYXJnaW46IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcbi5wcm9kdWN0LWltYWdle1xyXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKCdodHRwczovL3M1LmdpZnl1LmNvbS9pbWFnZXMvbG9hZGVyYmIxOWVmY2MyNzQ5ZTExNS5naWYnKSBjZW50ZXIgbm8tcmVwZWF0O1xyXG4gICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgaGVpZ2h0OiA4MHB4O1xyXG59XHJcbi5wcm9kdWN0LW5hbWV7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBtYXJnaW4tdG9wOiA3cHg7XHJcbn1cclxuLnByb2R1Y3QtcHJpY2V7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG59XHJcbi5wcm9kdWN0LWRlc2NyaXB0aW9ue1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgIG1hcmdpbi10b3A6IDdweDtcclxuICAgIG9wYWNpdHk6IC41O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogLTNweDtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG4ucHJvZHVjdC1xdWFudGl0eXtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG5cclxuaW9uLWdyaWQgaW9uLXJvd3tcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7O1xyXG59XHJcblxyXG4ub3JkZXItc3RhdHVze1xyXG4gICAgdGV4dC1hbGlnbjogZW5kO1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIHBhZGRpbmc6IDEwcHggMHB4IDVweDtcclxufVxyXG4ubGluZXtcclxuICAgIGJvcmRlcjogMDtcclxuICAgIGNsZWFyOiBib3RoO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XHJcbiAgICBoZWlnaHQ6IDFweDtcclxuICAgIG9wYWNpdHk6IC40O1xyXG59IiwiLmFkZHJlc3MtY2FyZCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBwYWRkaW5nOiAxMHB4O1xuICBtYXJnaW46IDEycHggMTJweCAxMnB4IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuaW9uLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6ICNGMkYyRjI7XG59XG5cbi51c2VyLW5hbWUge1xuICBmb250LXNpemU6IDE1cHg7XG59XG5cbi5hZGRyZXNzIHtcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuXG4ucGhvbmUtbm8ge1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi5zcGlubmVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tdG9wOiA1MCU7XG59XG5cbmlvbi1saXN0IHtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4ucHJvZHVjdHMtaGVhZGluZyB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgb3BhY2l0eTogMC43O1xuICBwYWRkaW5nOiAxMHB4IDBweCA1cHg7XG59XG5cbi5wcm9kdWN0cy1jb250YWluZXIge1xuICBtYXJnaW46IDEwcHg7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnByb2R1Y3QtaW1hZ2Uge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXCJodHRwczovL3M1LmdpZnl1LmNvbS9pbWFnZXMvbG9hZGVyYmIxOWVmY2MyNzQ5ZTExNS5naWZcIikgY2VudGVyIG5vLXJlcGVhdDtcbiAgd2lkdGg6IDEwMHB4O1xuICBoZWlnaHQ6IDgwcHg7XG59XG5cbi5wcm9kdWN0LW5hbWUge1xuICBmb250LXNpemU6IDEzcHg7XG4gIG1hcmdpbi10b3A6IDdweDtcbn1cblxuLnByb2R1Y3QtcHJpY2Uge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi5wcm9kdWN0LWRlc2NyaXB0aW9uIHtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIG1hcmdpbi10b3A6IDdweDtcbiAgb3BhY2l0eTogMC41O1xuICBtYXJnaW4tYm90dG9tOiAtM3B4O1xuICBmb250LXNpemU6IDEycHg7XG59XG5cbi5wcm9kdWN0LXF1YW50aXR5IHtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuXG5pb24tZ3JpZCBpb24tcm93IHtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbn1cblxuLm9yZGVyLXN0YXR1cyB7XG4gIHRleHQtYWxpZ246IGVuZDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBwYWRkaW5nOiAxMHB4IDBweCA1cHg7XG59XG5cbi5saW5lIHtcbiAgYm9yZGVyOiAwO1xuICBjbGVhcjogYm90aDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xuICBoZWlnaHQ6IDFweDtcbiAgb3BhY2l0eTogMC40O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/delivery/delivery-order-details/delivery-order-details.page.ts":
/*!********************************************************************************!*\
  !*** ./src/app/delivery/delivery-order-details/delivery-order-details.page.ts ***!
  \********************************************************************************/
/*! exports provided: DeliveryOrderDetailsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveryOrderDetailsPage", function() { return DeliveryOrderDetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");





//import { CallNumber } from '@ionic-native/call-number/ngx';
let DeliveryOrderDetailsPage = class DeliveryOrderDetailsPage {
    constructor(events, router, alertController, loadingController, navCtrl, route, storage) {
        this.events = events;
        this.router = router;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.navCtrl = navCtrl;
        this.route = route;
        this.storage = storage;
        this.orderData = [];
        this.showLoader = true;
        this.unreadAdminMsgs = 0;
        this.totalPriceAfterDiscount = 0;
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.orderId = this.router.getCurrentNavigation().extras.state.orderId;
                //console.log('orderId', this.orderId);
            }
        });
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        this.events.publish('user:getOrderDetailsWithOrderId', this.orderId);
        this.initializeSubscriptions();
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
        this.events.subscribe('delivery:startDeliverySuccess', (orderId, location) => {
            this.loading.dismiss();
            const navigationextras = {
                state: {
                    deliveryLatLng: location,
                    orderId: orderId
                }
            };
            this.router.navigate(['delivery-navigation'], navigationextras);
        });
        this.events.subscribe('delivery:startDeliveryUnsuccessful', (msg) => {
            this.loading.dismiss();
            this.presentAlert(msg);
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
    onClickStartNavigation() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('delivery:startDelivery', this.orderId, this.orderData[0].address);
        });
    }
    onClickContinueNavigation() {
        const navigationextras = {
            state: {
                deliveryLatLng: this.orderData[0].deliveryLatLng,
                orderId: this.orderId
            }
        };
        this.router.navigate(['delivery-navigation'], navigationextras);
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Please wait...',
                duration: 20000
            });
            yield this.loading.present();
        });
    }
    callUser() {
        /* this.callNumber.callNumber(this.orderData[0].address.phoneNo, true)
         .then(res => console.log('Launched dialer!', res))
         .catch(err => console.log('Error launching dialer', err));*/
    }
    removeSubscriptions() {
        this.events.unsubscribe('user:publishOrderDetailsWithOrderId');
        this.events.unsubscribe('user:cancelledOrderByUserSuccessfully');
        this.events.unsubscribe('delivery:startDeliverySuccess');
        this.events.unsubscribe('delivery:startDeliveryUnsuccessful');
    }
};
DeliveryOrderDetailsPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
], DeliveryOrderDetailsPage.prototype, "content", void 0);
DeliveryOrderDetailsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-delivery-order-details',
        template: __webpack_require__(/*! raw-loader!./delivery-order-details.page.html */ "./node_modules/raw-loader/index.js!./src/app/delivery/delivery-order-details/delivery-order-details.page.html"),
        styles: [__webpack_require__(/*! ./delivery-order-details.page.scss */ "./src/app/delivery/delivery-order-details/delivery-order-details.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"]])
], DeliveryOrderDetailsPage);



/***/ })

}]);
//# sourceMappingURL=delivery-delivery-order-details-delivery-order-details-module-es2015.js.map