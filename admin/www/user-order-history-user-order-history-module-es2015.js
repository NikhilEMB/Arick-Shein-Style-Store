(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["user-order-history-user-order-history-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/user-order-history/user-order-history.page.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/user-order-history/user-order-history.page.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button class=\"custom-back-button\">\r\n        <img src=\"assets/img/menu-icon-white.png\" class=\"menu-img\">\r\n      </ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title text-center>My Orders</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div *ngIf=\"showLoader\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n  <div class=\"no-data\" *ngIf=\"noOrders && !showLoader && !orders.length; else showOrders\" text-center>\r\n    <img src=\"assets/img/no-orders.png\" alt=\"\">\r\n    <h6>No orders</h6>\r\n  </div>\r\n  <ng-template #showOrders>\r\n    <div *ngFor=\"let order of orders; let i=index\">\r\n      <div class=\"uo-order-id\">\r\n        Order Id: ORD{{order.orderId}}\r\n      </div>\r\n      <div class=\"uo-products-container\">\r\n        <div class=\"uo-placed-on\">\r\n          Placed On {{order.createdAt.toDate() | date}}\r\n        </div>\r\n        <hr class=\"line\">\r\n        <ion-list class=\"ion-no-padding\" lines=\"none\" *ngIf=\"order?.products[0]\">\r\n          <ion-item class=\"ion-no-padding\">\r\n            <div slot=\"start\"\r\n            [ngStyle]=\"{'background': 'url(' + order.products[0].img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n             class=\"uo-product-image\">\r\n             <div class=\"uo-more\" *ngIf=\"order.products.length > 1\">+ {{order.products.length - 1}} more</div></div>\r\n            <ion-label>\r\n              <h2 class=\"uo-product-price ion-text-wrap\">{{order.totalAmountToPaid | currency: 'INR':true}}</h2>\r\n              <h3 class=\"uo-product-name ion-text-wrap\">{{order.products[0].name}} <span *ngIf=\"order.products.length > 1\">+ {{order.products.length - 1}} more</span>\r\n              </h3>\r\n              <h5 *ngIf=\"order.status === 'Pending'\">Placed<span><i class=\"flaticon-null-20\"></i></span></h5>\r\n              <h5 *ngIf=\"order.status === 'Rejected'\">Rejected<span><i class=\"flaticon-null-19\"></i></span></h5>\r\n              <h5 *ngIf=\"order.status === 'Confirmed'\">Confirmed<span><i class=\"flaticon-null-20\"></i></span></h5>\r\n              <h5 *ngIf=\"order.status === 'Cancelled'\">Cancelled<span><i class=\"flaticon-null-19\"></i></span></h5>\r\n              <h5 *ngIf=\"order.status === 'Dispatched'\">Dispatched<span><i class=\"flaticon-null-20\"></i></span></h5>\r\n              <h5 *ngIf=\"order.status === 'Delivered'\">Delivered<span><i class=\"flaticon-null-20\"></i></span></h5>\r\n              <h5 *ngIf=\"order.status === 'Returned'\">Returned<span><i class=\"flaticon-null-20\"></i></span></h5>\r\n            </ion-label>\r\n          </ion-item>\r\n            <div class=\"uo-action-btn\" *ngIf=\"order.deliveryStatus === 'inProgress' && (order.status === 'Confirmed' || order.status === 'Dispatched'); else showOnlyViewOrder\">\r\n              <ion-grid class=\"ion-no-padding\">\r\n                <ion-row class=\"ion-no-padding\">\r\n                  <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                    <ion-button (click)=\"onClickViewDetails(order.orderId)\" size=\"small\" fill=\"clear\">\r\n                      View Order <i class=\"flaticon-null-7\"></i>\r\n                    </ion-button>\r\n                  </ion-col>\r\n                  <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                    <ion-button (click)=\"onClickTrackOrder(order.deliveryAgentId, order.deliveryLatLng)\" size=\"small\" color=\"dark\" fill=\"clear\">\r\n                      Track Order <i class=\"flaticon-null-7\"></i>\r\n                    </ion-button>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n            <ng-template #showOnlyViewOrder>\r\n              <div class=\"uo-view-details-btn\">\r\n                <ion-button (click)=\"onClickViewDetails(order.orderId)\" size=\"small\" fill=\"clear\">\r\n                  View Order <i class=\"flaticon-null-7\"></i>\r\n                </ion-button>\r\n              </div>\r\n            </ng-template>\r\n        </ion-list>\r\n      </div>\r\n    </div>\r\n  </ng-template>\r\n  <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\" (click)=\"goToChat(true)\">\r\n    <ion-fab-button size=\"small\" color=\"dark\">\r\n      <i class=\"flaticon-chat fab-btn-chat\"></i>\r\n    </ion-fab-button>\r\n    <span class=\"unread-msg-badge\" *ngIf=\"unreadAdminMsgs !== 0\">{{unreadAdminMsgs}}</span>\r\n  </ion-fab>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/user-order-history/user-order-history.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/user-order-history/user-order-history.module.ts ***!
  \*****************************************************************/
/*! exports provided: UserOrderHistoryPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserOrderHistoryPageModule", function() { return UserOrderHistoryPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _user_order_history_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user-order-history.page */ "./src/app/user-order-history/user-order-history.page.ts");







const routes = [
    {
        path: '',
        component: _user_order_history_page__WEBPACK_IMPORTED_MODULE_6__["UserOrderHistoryPage"]
    }
];
let UserOrderHistoryPageModule = class UserOrderHistoryPageModule {
};
UserOrderHistoryPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_user_order_history_page__WEBPACK_IMPORTED_MODULE_6__["UserOrderHistoryPage"]]
    })
], UserOrderHistoryPageModule);



/***/ }),

/***/ "./src/app/user-order-history/user-order-history.page.scss":
/*!*****************************************************************!*\
  !*** ./src/app/user-order-history/user-order-history.page.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-content {\n  --background: #F2F2F2;\n}\n\nion-list {\n  border-radius: 5px;\n}\n\n.uo-products-container {\n  margin: 0px 10px 10px 10px;\n  background: white;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 8px 5px 10px 2px;\n  position: relative;\n}\n\n.uo-product-image {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n  width: 85px;\n  height: 85px;\n  position: relative;\n  left: 3%;\n  border: 1px solid #f0f0f0;\n}\n\n.uo-more {\n  background: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(transparent));\n  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent);\n  bottom: 0;\n  height: 20px;\n  position: absolute;\n  width: 84px;\n  z-index: 2;\n  color: white;\n  font-size: 12px;\n  text-align: center;\n  padding: 5px;\n}\n\n.uo-product-name {\n  font-size: 14px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.uo-product-price {\n  color: var(--ion-color-primary);\n  font-size: 18px;\n}\n\nion-grid ion-row {\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n\n.no-data {\n  margin: 0;\n  position: absolute;\n  top: 40%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  left: 50%;\n  margin-left: -65px;\n}\n\n.no-data img {\n  width: 150px;\n}\n\n.spinner {\n  margin-top: 50%;\n  text-align: center;\n}\n\n.uo-placed-on {\n  font-size: 11px;\n  text-align: center;\n  opacity: 0.6;\n}\n\n.uo-order-id {\n  margin: 15px 10px 1px;\n  opacity: 0.8;\n  font-size: 13px;\n}\n\n.uo-view-details-btn {\n  text-align: end;\n  margin: -7px;\n}\n\n.uo-action-btn {\n  text-align: center;\n  margin: 0px -7px -7px -7px;\n}\n\n.flaticon-null-20::before {\n  color: var(--ion-color-success);\n  margin-left: 2px;\n}\n\n.flaticon-null-19::before {\n  color: var(--ion-color-danger);\n  margin-left: 2px;\n}\n\n.line {\n  border: 0;\n  clear: both;\n  display: block;\n  width: 93%;\n  background-color: #ccc;\n  height: 1px;\n  opacity: 0.3;\n}\n\nion-button .flaticon-null-7::before {\n  font-size: 10px;\n  margin-left: 3px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlci1vcmRlci1oaXN0b3J5L0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFx1c2VyLW9yZGVyLWhpc3RvcnlcXHVzZXItb3JkZXItaGlzdG9yeS5wYWdlLnNjc3MiLCJzcmMvYXBwL3VzZXItb3JkZXItaGlzdG9yeS91c2VyLW9yZGVyLWhpc3RvcnkucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0kscUJBQUE7QUNDSjs7QURDQTtFQUNJLGtCQUFBO0FDRUo7O0FEQUE7RUFDSSwwQkFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7QUNHSjs7QUREQTtFQUNJLHNHQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSx5QkFBQTtBQ0lKOztBREZBO0VBQ0ksc0dBQUE7RUFBQSxrRUFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FDS0o7O0FERkE7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQ0tKOztBREhBO0VBQ0ksK0JBQUE7RUFDQSxlQUFBO0FDTUo7O0FESkE7RUFDSSxxQkFBQTtVQUFBLHlCQUFBO0FDT0o7O0FETEE7RUFDSSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBRUEsbUNBQUE7VUFBQSwyQkFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtBQ1FKOztBRE5FO0VBQ0UsWUFBQTtBQ1NKOztBRFBFO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0FDVUo7O0FEUkE7RUFDSSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FDV0o7O0FEVEE7RUFDSSxxQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FDWUo7O0FEVkE7RUFDSSxlQUFBO0VBQ0EsWUFBQTtBQ2FKOztBRFhBO0VBQ0ksa0JBQUE7RUFDQSwwQkFBQTtBQ2NKOztBRFpBO0VBQ0ksK0JBQUE7RUFDQSxnQkFBQTtBQ2VKOztBRGJBO0VBQ0ksOEJBQUE7RUFDQSxnQkFBQTtBQ2dCSjs7QURkQTtFQUNJLFNBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLFVBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FDaUJKOztBRGZBO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0FDa0JKIiwiZmlsZSI6InNyYy9hcHAvdXNlci1vcmRlci1oaXN0b3J5L3VzZXItb3JkZXItaGlzdG9yeS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tY29udGVudHtcclxuICAgIC0tYmFja2dyb3VuZDogI0YyRjJGMjtcclxufVxyXG5pb24tbGlzdHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG4udW8tcHJvZHVjdHMtY29udGFpbmVye1xyXG4gICAgbWFyZ2luOiAwcHggMTBweCAxMHB4IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBwYWRkaW5nOiA4cHggNXB4IDEwcHggMnB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcbi51by1wcm9kdWN0LWltYWdle1xyXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKCdodHRwczovL3M1LmdpZnl1LmNvbS9pbWFnZXMvbG9hZGVyYmIxOWVmY2MyNzQ5ZTExNS5naWYnKSBjZW50ZXIgbm8tcmVwZWF0O1xyXG4gICAgd2lkdGg6IDg1cHg7XHJcbiAgICBoZWlnaHQ6IDg1cHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBsZWZ0OiAzJTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNmMGYwZjA7XHJcbn1cclxuLnVvLW1vcmV7XHJcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMGRlZyxyZ2JhKDAsMCwwLC41KSx0cmFuc3BhcmVudCk7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB3aWR0aDogODRweDtcclxuICAgIHotaW5kZXg6IDI7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbn1cclxuXHJcbi51by1wcm9kdWN0LW5hbWV7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG4udW8tcHJvZHVjdC1wcmljZXtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbn1cclxuaW9uLWdyaWQgaW9uLXJvd3tcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7O1xyXG59XHJcbi5uby1kYXRhe1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA0MCU7XHJcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgbWFyZ2luLWxlZnQ6IC02NXB4O1xyXG4gIH1cclxuICAubm8tZGF0YSBpbWd7XHJcbiAgICB3aWR0aDogMTUwcHg7XHJcbiAgfVxyXG4gIC5zcGlubmVye1xyXG4gICAgbWFyZ2luLXRvcDogNTAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi51by1wbGFjZWQtb257XHJcbiAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBvcGFjaXR5OiAuNjtcclxufVxyXG4udW8tb3JkZXItaWR7XHJcbiAgICBtYXJnaW46IDE1cHggMTBweCAxcHg7XHJcbiAgICBvcGFjaXR5OiAuODtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxufVxyXG4udW8tdmlldy1kZXRhaWxzLWJ0bntcclxuICAgIHRleHQtYWxpZ246IGVuZDtcclxuICAgIG1hcmdpbjotN3B4XHJcbn1cclxuLnVvLWFjdGlvbi1idG57XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW46IDBweCAtN3B4IC03cHggLTdweDtcclxufVxyXG4uZmxhdGljb24tbnVsbC0yMDo6YmVmb3JlIHtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbiAgICBtYXJnaW4tbGVmdDogMnB4O1xyXG59XHJcbi5mbGF0aWNvbi1udWxsLTE5OjpiZWZvcmUge1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDJweDtcclxufVxyXG4ubGluZXtcclxuICAgIGJvcmRlcjogMDtcclxuICAgIGNsZWFyOiBib3RoO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogOTMlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcclxuICAgIGhlaWdodDogMXB4O1xyXG4gICAgb3BhY2l0eTogLjM7XHJcbn1cclxuaW9uLWJ1dHRvbiAuZmxhdGljb24tbnVsbC03OjpiZWZvcmV7XHJcbiAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogM3B4O1xyXG59XHJcbi8vbWVkaWEgcXVlcmllc1xyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQobWluLXdpZHRoOjc2OHB4KXtcclxuICAgIFxyXG59XHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1pbi13aWR0aDoxMDI0cHgpe1xyXG4gICAgXHJcbn0iLCJpb24tY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogI0YyRjJGMjtcbn1cblxuaW9uLWxpc3Qge1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi51by1wcm9kdWN0cy1jb250YWluZXIge1xuICBtYXJnaW46IDBweCAxMHB4IDEwcHggMTBweDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcGFkZGluZzogOHB4IDVweCAxMHB4IDJweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4udW8tcHJvZHVjdC1pbWFnZSB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcImh0dHBzOi8vczUuZ2lmeXUuY29tL2ltYWdlcy9sb2FkZXJiYjE5ZWZjYzI3NDllMTE1LmdpZlwiKSBjZW50ZXIgbm8tcmVwZWF0O1xuICB3aWR0aDogODVweDtcbiAgaGVpZ2h0OiA4NXB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGxlZnQ6IDMlO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZjBmMGYwO1xufVxuXG4udW8tbW9yZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgwZGVnLCByZ2JhKDAsIDAsIDAsIDAuNSksIHRyYW5zcGFyZW50KTtcbiAgYm90dG9tOiAwO1xuICBoZWlnaHQ6IDIwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDg0cHg7XG4gIHotaW5kZXg6IDI7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDVweDtcbn1cblxuLnVvLXByb2R1Y3QtbmFtZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLnVvLXByb2R1Y3QtcHJpY2Uge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBmb250LXNpemU6IDE4cHg7XG59XG5cbmlvbi1ncmlkIGlvbi1yb3cge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xufVxuXG4ubm8tZGF0YSB7XG4gIG1hcmdpbjogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDQwJTtcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBsZWZ0OiA1MCU7XG4gIG1hcmdpbi1sZWZ0OiAtNjVweDtcbn1cblxuLm5vLWRhdGEgaW1nIHtcbiAgd2lkdGg6IDE1MHB4O1xufVxuXG4uc3Bpbm5lciB7XG4gIG1hcmdpbi10b3A6IDUwJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4udW8tcGxhY2VkLW9uIHtcbiAgZm9udC1zaXplOiAxMXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG9wYWNpdHk6IDAuNjtcbn1cblxuLnVvLW9yZGVyLWlkIHtcbiAgbWFyZ2luOiAxNXB4IDEwcHggMXB4O1xuICBvcGFjaXR5OiAwLjg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuLnVvLXZpZXctZGV0YWlscy1idG4ge1xuICB0ZXh0LWFsaWduOiBlbmQ7XG4gIG1hcmdpbjogLTdweDtcbn1cblxuLnVvLWFjdGlvbi1idG4ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbjogMHB4IC03cHggLTdweCAtN3B4O1xufVxuXG4uZmxhdGljb24tbnVsbC0yMDo6YmVmb3JlIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbn1cblxuLmZsYXRpY29uLW51bGwtMTk6OmJlZm9yZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbn1cblxuLmxpbmUge1xuICBib3JkZXI6IDA7XG4gIGNsZWFyOiBib3RoO1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDkzJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcbiAgaGVpZ2h0OiAxcHg7XG4gIG9wYWNpdHk6IDAuMztcbn1cblxuaW9uLWJ1dHRvbiAuZmxhdGljb24tbnVsbC03OjpiZWZvcmUge1xuICBmb250LXNpemU6IDEwcHg7XG4gIG1hcmdpbi1sZWZ0OiAzcHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/user-order-history/user-order-history.page.ts":
/*!***************************************************************!*\
  !*** ./src/app/user-order-history/user-order-history.page.ts ***!
  \***************************************************************/
/*! exports provided: UserOrderHistoryPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserOrderHistoryPage", function() { return UserOrderHistoryPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/user/user.service */ "./src/app/services/user/user.service.ts");






let UserOrderHistoryPage = class UserOrderHistoryPage {
    constructor(events, router, storage, userService) {
        this.events = events;
        this.router = router;
        this.storage = storage;
        this.userService = userService;
        this.orders = [];
        this.showLoader = true;
        this.noOrders = false;
        this.unreadAdminMsgs = 0;
    }
    ngOnInit() {
    }
    ionViewDidEnter() {
        this.initializeSubscription();
        this.events.publish('user:getAllOrdersOfUser');
        this.storage.get('uid').then((val) => {
            this.events.publish('chat:getUnreadMsgOfAdmin', val);
        });
    }
    ionViewWillLeave() {
        this.removeSubscription();
    }
    initializeSubscription() {
        this.events.subscribe('user:publishAllOrdersOfUser', (orders) => {
            //console.log('all orders of user', orders);
            this.orders = orders;
            this.showLoader = false;
        });
        this.events.subscribe('user:noOrderHistoryOfUser', () => {
            this.showLoader = false;
            this.noOrders = true;
        });
        this.events.subscribe('chat:publishUnreadMsgOfAdmin', (unreadMsgs) => {
            this.unreadAdminMsgs = unreadMsgs;
        });
    }
    onClickViewDetails(id) {
        const navigationextras = {
            state: {
                orderId: id
            }
        };
        this.router.navigate(['user-order-details'], navigationextras);
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
    removeSubscription() {
        this.events.unsubscribe('user:publishAllOrdersOfUser');
        this.events.unsubscribe('user:noOrderHistoryOfUser');
        this.events.unsubscribe('chat:publishUnreadMsgOfAdmin');
    }
};
UserOrderHistoryPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"] },
    { type: _services_user_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"] }
];
UserOrderHistoryPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-user-order-history',
        template: __webpack_require__(/*! raw-loader!./user-order-history.page.html */ "./node_modules/raw-loader/index.js!./src/app/user-order-history/user-order-history.page.html"),
        styles: [__webpack_require__(/*! ./user-order-history.page.scss */ "./src/app/user-order-history/user-order-history.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"], _services_user_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"]])
], UserOrderHistoryPage);



/***/ })

}]);
//# sourceMappingURL=user-order-history-user-order-history-module-es2015.js.map