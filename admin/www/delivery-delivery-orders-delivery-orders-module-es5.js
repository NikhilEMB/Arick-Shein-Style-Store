(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["delivery-delivery-orders-delivery-orders-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/delivery/delivery-orders/delivery-orders.page.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/delivery/delivery-orders/delivery-orders.page.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button class=\"custom-back-button\">\r\n        <img src=\"assets/img/menu-icon-white.png\" class=\"menu-img\">\r\n      </ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title text-center>orders</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs no-shadow no-border>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Pending</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Delivered</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <super-tabs-container>\r\n    <super-tab>\r\n      <ion-content>\r\n        <div *ngIf=\"showLoader\" class=\"spinner\">\r\n          <ion-spinner color=\"primary\"></ion-spinner>\r\n        </div>\r\n        <div class=\"no-data\" *ngIf=\"noDeliveryOrders && !showLoader && !allDeliveryOrders.length; else showPendingOrders\"\r\n          text-center>\r\n          <img src=\"assets/img/no-orders.png\" alt=\"\">\r\n          <h6>No orders</h6>\r\n        </div>\r\n        <ng-template #showPendingOrders>\r\n          <div *ngFor=\"let order of allDeliveryOrders; let i=index\">\r\n            <div *ngIf=\"(order.status !== 'Cancelled' && order.status !== 'Delivered') && (order.deliveryStatus === 'notStarted' || order.deliveryStatus === 'inProgress')\">\r\n              <div class=\"do-order-id\">\r\n                Order Id: ORD{{order.orderId}}\r\n              </div>\r\n              <div class=\"do-products-container\">\r\n                <div class=\"do-placed-on\">\r\n                  Placed On {{order.createdAt.toDate() | date}}\r\n                </div>\r\n                <ion-list class=\"ion-no-padding\" lines=\"none\" *ngIf=\"order?.products[0]\">\r\n                  <ion-item class=\"do-order-data ion-no-padding\">\r\n                    <div slot=\"start\"\r\n                      [ngStyle]=\"{'background': 'url(' + order.products[0].img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n                      class=\"do-product-image\">\r\n                      <div class=\"do-more\" *ngIf=\"order.products.length > 1\">+ {{order.products.length - 1}} more</div>\r\n                    </div>\r\n                    <ion-label>\r\n                      <h2 class=\"do-product-price ion-text-wrap\">{{order.totalAmountToPaid | currency: 'INR':true}}</h2>\r\n                      <h3 class=\"do-product-name ion-text-wrap\">{{order.products[0].name}} <span\r\n                          *ngIf=\"order.products.length > 1\">+ {{order.products.length - 1}} more</span>\r\n                      </h3>\r\n                      <h5 *ngIf=\"(order.status === 'Cancelled' || order.status === 'Delivered'); else useDeliveryStatus;\">\r\n                        Status: {{order.status}}</h5>\r\n                      <ng-template #useDeliveryStatus>\r\n                        <h5 *ngIf=\"order.deliveryStatus === 'notStarted'\">Status: Not Started</h5>\r\n                        <h5 *ngIf=\"order.deliveryStatus === 'inProgress'\">Status: Delivery In Progress</h5>\r\n                        <h5 *ngIf=\"order.deliveryStatus === 'delivered'\">Status: Delivered</h5>\r\n                      </ng-template>\r\n                    </ion-label>\r\n                  </ion-item>\r\n                  <div class=\"do-view-details-btn\"\r\n                    *ngIf=\"(order.status === 'Cancelled' || order.status === 'Delivered'); else useDeliveryStatusForAction;\">\r\n                    <div class=\"do-view-details-btn\">\r\n                      <ion-button (click)=\"onClickViewDetails(order.orderId)\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                        View Order\r\n                      </ion-button>\r\n                    </div>\r\n                  </div>\r\n                  <ng-template #useDeliveryStatusForAction>\r\n                    <div class=\"action-btns\" *ngIf=\"order.deliveryStatus === 'notStarted'\">\r\n                      <ion-grid>\r\n                        <ion-row>\r\n                          <ion-col size=\"6\">\r\n                            <ion-button (click)=\"onClickViewDetails(order.orderId)\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                              View Order\r\n                            </ion-button>\r\n                          </ion-col>\r\n                          <ion-col size=\"6\">\r\n                            <ion-button (click)=\"onClickStartNavigation(order.orderId, order.address)\" fill=\"outline\"\r\n                              shape=\"round\" size=\"small\">\r\n                              Start Delivery\r\n                            </ion-button>\r\n                          </ion-col>\r\n                        </ion-row>\r\n                      </ion-grid>\r\n                    </div>\r\n                    <div *ngIf=\"order.deliveryStatus === 'inProgress'\">\r\n                      <ion-grid>\r\n                        <ion-row>\r\n                          <ion-col size=\"6\">\r\n                            <ion-button (click)=\"onClickViewDetails(order.orderId)\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                              View Order\r\n                            </ion-button>\r\n                          </ion-col>\r\n                          <ion-col size=\"6\">\r\n                            <ion-button (click)=\"onClickContinueNavigation(order.orderId, order.deliveryLatLng)\" fill=\"outline\"\r\n                              shape=\"round\" size=\"small\">\r\n                              Continue Delivery\r\n                            </ion-button>\r\n                          </ion-col>\r\n                        </ion-row>\r\n                      </ion-grid>\r\n                    </div>\r\n                    <div class=\"do-view-details-btn\" *ngIf=\"order.deliveryStatus === 'delivered'\">\r\n                      <ion-button (click)=\"onClickViewDetails(order.orderId)\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                        View Order\r\n                      </ion-button>\r\n                    </div>\r\n                  </ng-template>\r\n                </ion-list>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </ng-template>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <super-tab>\r\n      <ion-content>\r\n        <div *ngIf=\"showLoader\" class=\"spinner\">\r\n          <ion-spinner color=\"primary\"></ion-spinner>\r\n        </div>\r\n        <div class=\"no-data\" *ngIf=\"noDeliveryOrders && !showLoader && !allDeliveryOrders.length; else showDeliveredOrders\"\r\n          text-center>\r\n          <img src=\"assets/img/no-orders.png\" alt=\"\">\r\n          <h6>No orders</h6>\r\n        </div>\r\n        <ng-template #showDeliveredOrders>\r\n          <div *ngFor=\"let order of allDeliveryOrders; let i=index\">\r\n            <div *ngIf=\"order.status === 'Cancelled' || order.status === 'Delivered' || order.deliveryStatus === 'delivered'\">\r\n              <div class=\"do-order-id\">\r\n                Order Id: ORD{{order.orderId}}\r\n              </div>\r\n              <div class=\"do-products-container\">\r\n                <div class=\"do-placed-on\">\r\n                  Placed On {{order.createdAt.toDate() | date}}\r\n                </div>\r\n                <ion-list class=\"ion-no-padding\" lines=\"none\" *ngIf=\"order?.products[0]\">\r\n                  <ion-item class=\"do-order-data ion-no-padding\">\r\n                    <div slot=\"start\"\r\n                      [ngStyle]=\"{'background': 'url(' + order.products[0].img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n                      class=\"do-product-image\">\r\n                      <div class=\"do-more\" *ngIf=\"order.products.length > 1\">+ {{order.products.length - 1}} more</div>\r\n                    </div>\r\n                    <ion-label>\r\n                      <h2 class=\"do-product-price ion-text-wrap\">{{order.totalAmountToPaid | currency: 'INR':true}}</h2>\r\n                      <h3 class=\"do-product-name ion-text-wrap\">{{order.products[0].name}} <span\r\n                          *ngIf=\"order.products.length > 1\">+ {{order.products.length - 1}} more</span>\r\n                      </h3>\r\n                      <h5 *ngIf=\"(order.status === 'Cancelled' || order.status === 'Delivered'); else useDeliveryStatus;\">\r\n                        Status: {{order.status}}</h5>\r\n                      <ng-template #useDeliveryStatus>\r\n                        <h5 *ngIf=\"order.deliveryStatus === 'notStarted'\">Status: Not Started</h5>\r\n                        <h5 *ngIf=\"order.deliveryStatus === 'inProgress'\">Status: Delivery In Progress</h5>\r\n                        <h5 *ngIf=\"order.deliveryStatus === 'delivered'\">Status: Delivered</h5>\r\n                      </ng-template>\r\n                    </ion-label>\r\n                  </ion-item>\r\n                  <div class=\"do-view-details-btn\"\r\n                    *ngIf=\"(order.status === 'Cancelled' || order.status === 'Delivered'); else useDeliveryStatusForAction;\">\r\n                    <div class=\"do-view-details-btn\">\r\n                      <ion-button (click)=\"onClickViewDetails(order.orderId)\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                        View Order\r\n                      </ion-button>\r\n                    </div>\r\n                  </div>\r\n                  <ng-template #useDeliveryStatusForAction>\r\n                    <div class=\"action-btns\" *ngIf=\"order.deliveryStatus === 'notStarted'\">\r\n                      <ion-grid>\r\n                        <ion-row>\r\n                          <ion-col size=\"6\">\r\n                            <ion-button (click)=\"onClickViewDetails(order.orderId)\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                              View Order\r\n                            </ion-button>\r\n                          </ion-col>\r\n                          <ion-col size=\"6\">\r\n                            <ion-button (click)=\"onClickStartNavigation(order.orderId, order.address)\" fill=\"outline\"\r\n                              shape=\"round\" size=\"small\">\r\n                              Start Delivery\r\n                            </ion-button>\r\n                          </ion-col>\r\n                        </ion-row>\r\n                      </ion-grid>\r\n                    </div>\r\n                    <div *ngIf=\"order.deliveryStatus === 'inProgress'\">\r\n                      <ion-grid>\r\n                        <ion-row>\r\n                          <ion-col size=\"6\">\r\n                            <ion-button (click)=\"onClickViewDetails(order.orderId)\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                              View Order\r\n                            </ion-button>\r\n                          </ion-col>\r\n                          <ion-col size=\"6\">\r\n                            <ion-button (click)=\"onClickContinueNavigation(order.orderId, order.deliveryLatLng)\" fill=\"outline\"\r\n                              shape=\"round\" size=\"small\">\r\n                              Continue Delivery\r\n                            </ion-button>\r\n                          </ion-col>\r\n                        </ion-row>\r\n                      </ion-grid>\r\n                    </div>\r\n                    <div class=\"do-view-details-btn\" *ngIf=\"order.deliveryStatus === 'delivered'\">\r\n                      <ion-button (click)=\"onClickViewDetails(order.orderId)\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                        View Order\r\n                      </ion-button>\r\n                    </div>\r\n                  </ng-template>\r\n                </ion-list>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </ng-template>\r\n      </ion-content>\r\n    </super-tab>\r\n  </super-tabs-container>\r\n</super-tabs>\r\n\r\n"

/***/ }),

/***/ "./src/app/delivery/delivery-orders/delivery-orders.module.ts":
/*!********************************************************************!*\
  !*** ./src/app/delivery/delivery-orders/delivery-orders.module.ts ***!
  \********************************************************************/
/*! exports provided: DeliveryOrdersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveryOrdersPageModule", function() { return DeliveryOrdersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _delivery_orders_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./delivery-orders.page */ "./src/app/delivery/delivery-orders/delivery-orders.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");








var routes = [
    {
        path: '',
        component: _delivery_orders_page__WEBPACK_IMPORTED_MODULE_6__["DeliveryOrdersPage"]
    }
];
var DeliveryOrdersPageModule = /** @class */ (function () {
    function DeliveryOrdersPageModule() {
    }
    DeliveryOrdersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"]
            ],
            declarations: [_delivery_orders_page__WEBPACK_IMPORTED_MODULE_6__["DeliveryOrdersPage"]]
        })
    ], DeliveryOrdersPageModule);
    return DeliveryOrdersPageModule;
}());



/***/ }),

/***/ "./src/app/delivery/delivery-orders/delivery-orders.page.scss":
/*!********************************************************************!*\
  !*** ./src/app/delivery/delivery-orders/delivery-orders.page.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-content {\n  --background: #F2F2F2;\n}\n\nion-list {\n  border-radius: 5px;\n}\n\n.do-products-container {\n  margin: 0px 10px 10px 10px;\n  background: white;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 15px 5px 10px 5px;\n  position: relative;\n}\n\n.do-product-image {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n  width: 85px;\n  height: 85px;\n  position: relative;\n  left: 3%;\n  border: 1px solid #f0f0f0;\n}\n\n.do-more {\n  background: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(transparent));\n  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent);\n  bottom: 0;\n  height: 20px;\n  position: absolute;\n  width: 84px;\n  z-index: 2;\n  color: white;\n  font-size: 12px;\n  text-align: center;\n  padding: 5px;\n}\n\n.do-product-name {\n  font-size: 14px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.do-product-price {\n  color: var(--ion-color-primary);\n  font-size: 18px;\n}\n\nion-grid ion-row {\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n\n.no-data {\n  margin: 0;\n  position: absolute;\n  top: 40%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  left: 50%;\n  margin-left: -65px;\n}\n\n.no-data img {\n  width: 150px;\n}\n\n.spinner {\n  margin-top: 50%;\n  text-align: center;\n}\n\n.do-placed-on {\n  font-size: 12px;\n  text-align: center;\n  opacity: 0.7;\n  margin-bottom: 3%;\n}\n\n.do-order-id {\n  margin: 15px 10px 1px;\n  opacity: 0.8;\n  font-size: 13px;\n}\n\n.do-view-details-btn {\n  text-align: center;\n}\n\n.flaticon-null-20::before {\n  color: var(--ion-color-success);\n  margin-left: 2px;\n}\n\n.flaticon-null-19::before {\n  color: var(--ion-color-danger);\n  margin-left: 2px;\n}\n\n.line {\n  border: 0;\n  clear: both;\n  display: block;\n  width: 100%;\n  background-color: #ccc;\n  height: 1px;\n  opacity: 0.4;\n}\n\n.action-btns {\n  margin-bottom: -10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGVsaXZlcnkvZGVsaXZlcnktb3JkZXJzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxkZWxpdmVyeVxcZGVsaXZlcnktb3JkZXJzXFxkZWxpdmVyeS1vcmRlcnMucGFnZS5zY3NzIiwic3JjL2FwcC9kZWxpdmVyeS9kZWxpdmVyeS1vcmRlcnMvZGVsaXZlcnktb3JkZXJzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHFCQUFBO0FDQ0o7O0FERUE7RUFDSSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksMEJBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQkFBQTtFQUNBLGtCQUFBO0FDQ0o7O0FERUE7RUFDSSxzR0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EseUJBQUE7QUNDSjs7QURFQTtFQUNJLHNHQUFBO0VBQUEsa0VBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVBO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUNDSjs7QURFQTtFQUNJLCtCQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0kscUJBQUE7VUFBQSx5QkFBQTtBQ0NKOztBREdBO0VBQ0ksU0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUVBLG1DQUFBO1VBQUEsMkJBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7QUNBSjs7QURHQTtFQUNJLFlBQUE7QUNBSjs7QURHQTtFQUNJLGVBQUE7RUFDQSxrQkFBQTtBQ0FKOztBREdBO0VBQ0ksZUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FDQUo7O0FER0E7RUFDSSxxQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FDQUo7O0FER0E7RUFDSSxrQkFBQTtBQ0FKOztBREdBO0VBQ0ksK0JBQUE7RUFDQSxnQkFBQTtBQ0FKOztBREdBO0VBQ0ksOEJBQUE7RUFDQSxnQkFBQTtBQ0FKOztBREdBO0VBQ0ksU0FBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUNBSjs7QURHQTtFQUNJLG9CQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC9kZWxpdmVyeS9kZWxpdmVyeS1vcmRlcnMvZGVsaXZlcnktb3JkZXJzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jb250ZW50IHtcclxuICAgIC0tYmFja2dyb3VuZDogI0YyRjJGMjtcclxufVxyXG5cclxuaW9uLWxpc3Qge1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcblxyXG4uZG8tcHJvZHVjdHMtY29udGFpbmVyIHtcclxuICAgIG1hcmdpbjogMHB4IDEwcHggMTBweCAxMHB4O1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgcGFkZGluZzogMTVweCA1cHggMTBweCA1cHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi5kby1wcm9kdWN0LWltYWdlIHtcclxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybCgnaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzL2xvYWRlcmJiMTllZmNjMjc0OWUxMTUuZ2lmJykgY2VudGVyIG5vLXJlcGVhdDtcclxuICAgIHdpZHRoOiA4NXB4O1xyXG4gICAgaGVpZ2h0OiA4NXB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgbGVmdDogMyU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZjBmMGYwO1xyXG59XHJcblxyXG4uZG8tbW9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgcmdiYSgwLCAwLCAwLCAuNSksIHRyYW5zcGFyZW50KTtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIGhlaWdodDogMjBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHdpZHRoOiA4NHB4O1xyXG4gICAgei1pbmRleDogMjtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDVweDtcclxufVxyXG5cclxuLmRvLXByb2R1Y3QtbmFtZSB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLmRvLXByb2R1Y3QtcHJpY2Uge1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxufVxyXG5cclxuaW9uLWdyaWQgaW9uLXJvdyB7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gICAgO1xyXG59XHJcblxyXG4ubm8tZGF0YSB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDQwJTtcclxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICBtYXJnaW4tbGVmdDogLTY1cHg7XHJcbn1cclxuXHJcbi5uby1kYXRhIGltZyB7XHJcbiAgICB3aWR0aDogMTUwcHg7XHJcbn1cclxuXHJcbi5zcGlubmVyIHtcclxuICAgIG1hcmdpbi10b3A6IDUwJTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmRvLXBsYWNlZC1vbiB7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBvcGFjaXR5OiAuNztcclxuICAgIG1hcmdpbi1ib3R0b206IDMlO1xyXG59XHJcblxyXG4uZG8tb3JkZXItaWQge1xyXG4gICAgbWFyZ2luOiAxNXB4IDEwcHggMXB4O1xyXG4gICAgb3BhY2l0eTogLjg7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbn1cclxuXHJcbi5kby12aWV3LWRldGFpbHMtYnRuIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmZsYXRpY29uLW51bGwtMjA6OmJlZm9yZSB7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDJweDtcclxufVxyXG5cclxuLmZsYXRpY29uLW51bGwtMTk6OmJlZm9yZSB7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XHJcbiAgICBtYXJnaW4tbGVmdDogMnB4O1xyXG59XHJcblxyXG4ubGluZSB7XHJcbiAgICBib3JkZXI6IDA7XHJcbiAgICBjbGVhcjogYm90aDtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xyXG4gICAgaGVpZ2h0OiAxcHg7XHJcbiAgICBvcGFjaXR5OiAuNDtcclxufVxyXG5cclxuLmFjdGlvbi1idG5zIHtcclxuICAgIG1hcmdpbi1ib3R0b206IC0xMHB4O1xyXG59XHJcblxyXG5cclxuLy9tZWRpYSBxdWVyaWVzXHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZChtaW4td2lkdGg6NzY4cHgpIHt9XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZChtaW4td2lkdGg6MTAyNHB4KSB7fSIsImlvbi1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiAjRjJGMkYyO1xufVxuXG5pb24tbGlzdCB7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLmRvLXByb2R1Y3RzLWNvbnRhaW5lciB7XG4gIG1hcmdpbjogMHB4IDEwcHggMTBweCAxMHB4O1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiAxNXB4IDVweCAxMHB4IDVweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uZG8tcHJvZHVjdC1pbWFnZSB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcImh0dHBzOi8vczUuZ2lmeXUuY29tL2ltYWdlcy9sb2FkZXJiYjE5ZWZjYzI3NDllMTE1LmdpZlwiKSBjZW50ZXIgbm8tcmVwZWF0O1xuICB3aWR0aDogODVweDtcbiAgaGVpZ2h0OiA4NXB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGxlZnQ6IDMlO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZjBmMGYwO1xufVxuXG4uZG8tbW9yZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgwZGVnLCByZ2JhKDAsIDAsIDAsIDAuNSksIHRyYW5zcGFyZW50KTtcbiAgYm90dG9tOiAwO1xuICBoZWlnaHQ6IDIwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDg0cHg7XG4gIHotaW5kZXg6IDI7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDVweDtcbn1cblxuLmRvLXByb2R1Y3QtbmFtZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLmRvLXByb2R1Y3QtcHJpY2Uge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBmb250LXNpemU6IDE4cHg7XG59XG5cbmlvbi1ncmlkIGlvbi1yb3cge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xufVxuXG4ubm8tZGF0YSB7XG4gIG1hcmdpbjogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDQwJTtcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBsZWZ0OiA1MCU7XG4gIG1hcmdpbi1sZWZ0OiAtNjVweDtcbn1cblxuLm5vLWRhdGEgaW1nIHtcbiAgd2lkdGg6IDE1MHB4O1xufVxuXG4uc3Bpbm5lciB7XG4gIG1hcmdpbi10b3A6IDUwJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZG8tcGxhY2VkLW9uIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG9wYWNpdHk6IDAuNztcbiAgbWFyZ2luLWJvdHRvbTogMyU7XG59XG5cbi5kby1vcmRlci1pZCB7XG4gIG1hcmdpbjogMTVweCAxMHB4IDFweDtcbiAgb3BhY2l0eTogMC44O1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi5kby12aWV3LWRldGFpbHMtYnRuIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZmxhdGljb24tbnVsbC0yMDo6YmVmb3JlIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbn1cblxuLmZsYXRpY29uLW51bGwtMTk6OmJlZm9yZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbn1cblxuLmxpbmUge1xuICBib3JkZXI6IDA7XG4gIGNsZWFyOiBib3RoO1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XG4gIGhlaWdodDogMXB4O1xuICBvcGFjaXR5OiAwLjQ7XG59XG5cbi5hY3Rpb24tYnRucyB7XG4gIG1hcmdpbi1ib3R0b206IC0xMHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/delivery/delivery-orders/delivery-orders.page.ts":
/*!******************************************************************!*\
  !*** ./src/app/delivery/delivery-orders/delivery-orders.page.ts ***!
  \******************************************************************/
/*! exports provided: DeliveryOrdersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveryOrdersPage", function() { return DeliveryOrdersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var DeliveryOrdersPage = /** @class */ (function () {
    function DeliveryOrdersPage(storage, events, router, loadingController, alertController) {
        this.storage = storage;
        this.events = events;
        this.router = router;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.noDeliveryOrders = false;
        this.allDeliveryOrders = [];
        this.showLoader = true;
    }
    DeliveryOrdersPage.prototype.ngOnInit = function () {
        var _this = this;
        this.initializeSubscriptions();
        setTimeout(function () {
            _this.storage.get('uid').then(function (val) {
                _this.events.publish('delivery:getAllOrdersOfDeliveryAgent', val);
            });
        }, 500);
    };
    DeliveryOrdersPage.prototype.ionViewWillEnter = function () {
    };
    DeliveryOrdersPage.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    DeliveryOrdersPage.prototype.ionViewWillLeave = function () {
    };
    DeliveryOrdersPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('delivery:noOrdersOfDeliveryAgent', function () {
            _this.noDeliveryOrders = true;
            _this.showLoader = false;
        });
        this.events.subscribe('delivery:publishAllOrdersOfDeliveryAgent', function (orders) {
            _this.noDeliveryOrders = false;
            _this.showLoader = false;
            _this.allDeliveryOrders = orders;
            //console.log('allDeliveryOrders', this.allDeliveryOrders);
        });
        this.events.subscribe('delivery:startDeliverySuccess', function (orderId, location) {
            _this.loading.dismiss();
            var navigationextras = {
                state: {
                    deliveryLatLng: location,
                    orderId: orderId
                }
            };
            _this.router.navigate(['delivery-navigation'], navigationextras);
        });
        this.events.subscribe('delivery:startDeliveryUnsuccessful', function (msg) {
            _this.loading.dismiss();
            _this.presentAlert(msg);
        });
    };
    DeliveryOrdersPage.prototype.onClickViewDetails = function (id) {
        var navigationextras = {
            state: {
                orderId: id
            }
        };
        this.router.navigate(['delivery-order-details'], navigationextras);
    };
    DeliveryOrdersPage.prototype.onClickStartNavigation = function (orderId, deliveryAddress) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('delivery:startDelivery', orderId, deliveryAddress);
                        return [2 /*return*/];
                }
            });
        });
    };
    DeliveryOrdersPage.prototype.onClickContinueNavigation = function (orderId, deliveryLatLng) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var navigationextras;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                navigationextras = {
                    state: {
                        deliveryLatLng: deliveryLatLng,
                        orderId: orderId
                    }
                };
                this.router.navigate(['delivery-navigation'], navigationextras);
                return [2 /*return*/];
            });
        });
    };
    DeliveryOrdersPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please wait...',
                                duration: 20000
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DeliveryOrdersPage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DeliveryOrdersPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('delivery:noOrdersOfDeliveryAgent');
        this.events.unsubscribe('delivery:publishAllOrdersOfDeliveryAgent');
        this.events.unsubscribe('delivery:startDeliverySuccess');
        this.events.unsubscribe('delivery:startDeliveryUnsuccessful');
    };
    DeliveryOrdersPage.ctorParameters = function () { return [
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] }
    ]; };
    DeliveryOrdersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-delivery-orders',
            template: __webpack_require__(/*! raw-loader!./delivery-orders.page.html */ "./node_modules/raw-loader/index.js!./src/app/delivery/delivery-orders/delivery-orders.page.html"),
            styles: [__webpack_require__(/*! ./delivery-orders.page.scss */ "./src/app/delivery/delivery-orders/delivery-orders.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"]])
    ], DeliveryOrdersPage);
    return DeliveryOrdersPage;
}());



/***/ })

}]);
//# sourceMappingURL=delivery-delivery-orders-delivery-orders-module-es5.js.map