(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor-orders-vendor-orders-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/vendor-orders/vendor-orders.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/vendor-orders/vendor-orders.page.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\"\r\n      class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\"\r\n        name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\"\r\n      slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Orders</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"createOrder()\">\r\n      Create Order\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <ng-container *ngIf=\"showLoader; else loaded;\">\r\n    <div class=\"main-container\">\r\n      <div class=\"spinner\">\r\n        <ion-spinner color=\"primary\"></ion-spinner>\r\n      </div>\r\n    </div>\r\n  </ng-container>\r\n\r\n  <ng-template #loaded>\r\n    <ng-container *ngIf=\"!orders.length; else showOrders\">\r\n      <div class=\"main-container fixed-height\">\r\n        <div class=\"no-data\"\r\n          text-center>\r\n          <img src=\"assets/img/no-orders.png\"\r\n            alt=\"\">\r\n          <h6>No Orders</h6>\r\n        </div>\r\n      </div>\r\n    </ng-container>\r\n\r\n    <ng-template #showOrders>\r\n      <div class=\"main-container\">\r\n        <ion-button (click)='checkProductToDeliver()'>\r\n          Check products to deliver\r\n        </ion-button>\r\n        <div *ngFor=\"let order of orders; let i=index\">\r\n          <div class=\"vo-order-id\">\r\n            Order ID: {{orderIdPrefix}}{{order.orderId}}\r\n          </div>\r\n          <div class=\"vo-products-container\">\r\n            <div class=\"vo-placed-on\">\r\n              Placed On: {{order.createdAt.toDate() | date: 'dd/MM/yyyy'}}\r\n            </div>\r\n            <hr class=\"line\">\r\n\r\n            <ion-list class=\"ion-no-padding\"\r\n              lines=\"none\"\r\n              *ngIf=\"order?.products[0]\">\r\n              <ion-item class=\"ion-no-padding\">\r\n                <div *ngIf=\"order.products[0].img.mob\"\r\n                  slot=\"start\"\r\n                  [ngStyle]=\"{'background': 'url(' + order.products[0].img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n                  class=\"vo-product-image\">\r\n                  <div class=\"vo-more\"\r\n                    *ngIf=\"order.products.length > 1\">+ {{order.products.length\r\n                    - 1}}\r\n                    more</div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"!order.products[0].img.mob && order.products[0].img.url\"\r\n                  slot=\"start\"\r\n                  [ngStyle]=\"{'background': 'url(' + order.products[0].img.url + ') no-repeat center', 'background-size': 'contain'}\"\r\n                  class=\"vo-product-image\">\r\n                  <div class=\"vo-more\"\r\n                    *ngIf=\"order.products.length > 1\">+ {{order.products.length\r\n                    - 1}}\r\n                    more</div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"!order.products[0].img.mob && !order.products[0].img.url\"\r\n                  slot=\"start\"\r\n                  class=\"vo-no-product-image\">\r\n                  <div class=\"vo-more\"\r\n                    *ngIf=\"order.products.length > 1\">+ {{order.products.length\r\n                    - 1}}\r\n                    more</div>\r\n                </div>\r\n                <ion-label>\r\n                  <h2 class=\"vo-product-price ion-text-wrap\"\r\n                    *ngIf=\"order.totalAmountToPaid\">\r\n                    {{order.totalAmountToPaid | currency: currencyCode:true}}\r\n                  </h2>\r\n                  <h3 class=\"vo-product-name ion-text-wrap\">\r\n                    {{order.products[0].name}} <span\r\n                      *ngIf=\"order.products.length > 1\">+\r\n                      {{order.products.length - 1}}\r\n                      more</span>\r\n                  </h3>\r\n                  <h5 *ngIf=\"order.status === 'Pending'\">Pending</h5>\r\n                  <h5 *ngIf=\"order.status === 'Rejected'\">Rejected<span><i\r\n                        class=\"flaticon-null-19\"></i></span></h5>\r\n                  <h5 *ngIf=\"order.status === 'Confirmed'\">Confirmed<span><i\r\n                        class=\"flaticon-null-20\"></i></span></h5>\r\n                  <h5 *ngIf=\"order.status === 'Cancelled'\">Cancelled<span><i\r\n                        class=\"flaticon-null-19\"></i></span></h5>\r\n                  <h5 *ngIf=\"order.status === 'Dispatched'\">Dispatched<span><i\r\n                        class=\"flaticon-null-20\"></i></span></h5>\r\n                  <h5 *ngIf=\"order.status === 'Delivered'\">Delivered<span><i\r\n                        class=\"flaticon-null-20\"></i></span></h5>\r\n                  <h5 *ngIf=\"order.status === 'Returned'\">Returned<span><i\r\n                        class=\"flaticon-null-20\"></i></span></h5>\r\n                  <h5\r\n                    *ngIf=\"order.payment.hasOwnProperty('status') && order.payment.status === 'failed'\">\r\n                    Payment Failed<span><i class=\"flaticon-null-19\"></i></span>\r\n                  </h5>\r\n                </ion-label>\r\n              </ion-item>\r\n              <div class=\"vo-view-details-btn\">\r\n                <ion-button (click)=\"downloadInvoice(order)\" *ngIf=\"multipleVendorInvoices\" style=\"margin: 10px;\"\r\n                  size=\"small\"\r\n                  fill=\"outline\">\r\n                  Download Invoice\r\n                </ion-button>\r\n\r\n                <ion-button (click)=\"onClickViewDetails(order)\"\r\n                  size=\"small\"\r\n                  fill=\"outline\">\r\n                  View Order\r\n                </ion-button>\r\n\r\n                <ion-button (click)=\"goToManageShipment(order.orderId, order)\"\r\n                  size=\"small\"\r\n                  fill=\"outline\"\r\n                  *ngIf=\"!isSubOrMembershipOrder(order) && (order.status == 'Pending' || order.status == 'Confirmed' )\">\r\n                  Manage Shipment\r\n                </ion-button>\r\n              </div>\r\n            </ion-list>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </ng-template>\r\n  </ng-template>\r\n\r\n  <ion-infinite-scroll threshold=\"100px\"\r\n    (ionInfinite)=\"loadMoreOrders($event)\"\r\n    *ngIf=\"orders.length\">\r\n    <ion-infinite-scroll-content loadingSpinner=\"bubbles\"\r\n      loadingText=\"Load More Orders\">\r\n    </ion-infinite-scroll-content>\r\n  </ion-infinite-scroll>\r\n\r\n</ion-content>"

/***/ }),

/***/ "./src/app/vendor-orders/vendor-orders.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/vendor-orders/vendor-orders.module.ts ***!
  \*******************************************************/
/*! exports provided: VendorOrdersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VendorOrdersPageModule", function() { return VendorOrdersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _vendor_orders_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vendor-orders.page */ "./src/app/vendor-orders/vendor-orders.page.ts");







const routes = [
    {
        path: '',
        component: _vendor_orders_page__WEBPACK_IMPORTED_MODULE_6__["VendorOrdersPage"]
    }
];
let VendorOrdersPageModule = class VendorOrdersPageModule {
};
VendorOrdersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_vendor_orders_page__WEBPACK_IMPORTED_MODULE_6__["VendorOrdersPage"]]
    })
], VendorOrdersPageModule);



/***/ }),

/***/ "./src/app/vendor-orders/vendor-orders.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/vendor-orders/vendor-orders.page.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-content {\n  --background: #F2F2F2;\n}\n\nion-list {\n  border-radius: 5px;\n}\n\n.vo-products-container {\n  margin: 0px 10px 10px 10px;\n  background: white;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 10px;\n  position: relative;\n}\n\n.vo-product-image {\n  background: transparent url('img-preloader.png') center no-repeat;\n  width: 85px;\n  height: 85px;\n  position: relative;\n  border: 1px solid #f0f0f0;\n}\n\n.vo-no-product-image {\n  background: url('img-preloader.png') center no-repeat;\n  background-size: contain;\n  width: 85px;\n  height: 85px;\n  position: relative;\n  border: 1px solid #e8e8e8;\n}\n\n.vo-more {\n  background: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(transparent));\n  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent);\n  bottom: 0;\n  height: 20px;\n  position: absolute;\n  width: 84px;\n  z-index: 2;\n  color: white;\n  font-size: 12px;\n  text-align: center;\n  padding: 5px;\n}\n\n.vo-product-name {\n  font-size: 14px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.vo-product-price {\n  color: var(--ion-color-primary);\n  font-size: 18px;\n}\n\nion-grid ion-row {\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n\n.no-data {\n  margin: 0;\n  position: absolute;\n  top: 40%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  left: 50%;\n  margin-left: -65px;\n}\n\n.no-data img {\n  width: 150px;\n}\n\n.spinner {\n  text-align: center;\n}\n\n.vo-placed-on {\n  font-size: 11px;\n  text-align: center;\n  opacity: 0.6;\n}\n\n.vo-order-id {\n  margin: 15px 10px 1px;\n  opacity: 0.8;\n  font-size: 13px;\n}\n\n.vo-view-details-btn {\n  text-align: end;\n}\n\n.vo-view-details-btn ion-button {\n  margin: 10px;\n}\n\n.vo-action-btn {\n  text-align: center;\n  margin: 0px -7px -7px -7px;\n}\n\n.flaticon-null-20::before {\n  color: var(--ion-color-success);\n  margin-left: 2px;\n}\n\n.flaticon-null-19::before {\n  color: var(--ion-color-danger);\n  margin-left: 2px;\n}\n\nion-button .flaticon-null-7::before {\n  font-size: 10px;\n  margin-left: 3px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmVuZG9yLW9yZGVycy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcdmVuZG9yLW9yZGVyc1xcdmVuZG9yLW9yZGVycy5wYWdlLnNjc3MiLCJzcmMvYXBwL3ZlbmRvci1vcmRlcnMvdmVuZG9yLW9yZGVycy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxxQkFBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7QUNDSjs7QURFQTtFQUNJLDBCQUFBO0VBQ0EsaUJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FDQ0o7O0FERUE7RUFDSSxpRUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtBQ0NKOztBREVBO0VBQ0kscURBQUE7RUFDQSx3QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtBQ0NKOztBREVBO0VBQ0ksc0dBQUE7RUFBQSxrRUFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FDQ0o7O0FERUE7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQ0NKOztBREVBO0VBQ0ksK0JBQUE7RUFDQSxlQUFBO0FDQ0o7O0FERUE7RUFDSSxxQkFBQTtVQUFBLHlCQUFBO0FDQ0o7O0FER0E7RUFDSSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBRUEsbUNBQUE7VUFBQSwyQkFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtBQ0FKOztBREdBO0VBQ0ksWUFBQTtBQ0FKOztBREVBO0VBRUksa0JBQUE7QUNBSjs7QURHQTtFQUNJLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUNBSjs7QURHQTtFQUNJLHFCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUNBSjs7QURHQTtFQUNJLGVBQUE7QUNBSjs7QURDSTtFQUNJLFlBQUE7QUNDUjs7QURHQTtFQUNJLGtCQUFBO0VBQ0EsMEJBQUE7QUNBSjs7QURHQTtFQUNJLCtCQUFBO0VBQ0EsZ0JBQUE7QUNBSjs7QURHQTtFQUNJLDhCQUFBO0VBQ0EsZ0JBQUE7QUNBSjs7QURHQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtBQ0FKIiwiZmlsZSI6InNyYy9hcHAvdmVuZG9yLW9yZGVycy92ZW5kb3Itb3JkZXJzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jb250ZW50IHtcclxuICAgIC0tYmFja2dyb3VuZDogI0YyRjJGMjtcclxufVxyXG5cclxuaW9uLWxpc3Qge1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcblxyXG4udm8tcHJvZHVjdHMtY29udGFpbmVyIHtcclxuICAgIG1hcmdpbjogMHB4IDEwcHggMTBweCAxMHB4O1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuLnZvLXByb2R1Y3QtaW1hZ2Uge1xyXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKCdzcmMvYXNzZXRzL2ltZy9pbWctcHJlbG9hZGVyLnBuZycpIGNlbnRlciBuby1yZXBlYXQ7XHJcbiAgICB3aWR0aDogODVweDtcclxuICAgIGhlaWdodDogODVweDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNmMGYwZjA7XHJcbn1cclxuXHJcbi52by1uby1wcm9kdWN0LWltYWdlIHtcclxuICAgIGJhY2tncm91bmQ6IHVybCgnc3JjL2Fzc2V0cy9pbWcvaW1nLXByZWxvYWRlci5wbmcnKSBjZW50ZXIgbm8tcmVwZWF0O1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xyXG4gICAgd2lkdGg6IDg1cHg7XHJcbiAgICBoZWlnaHQ6IDg1cHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZThlOGU4O1xyXG59XHJcblxyXG4udm8tbW9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgcmdiYSgwLCAwLCAwLCAuNSksIHRyYW5zcGFyZW50KTtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIGhlaWdodDogMjBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHdpZHRoOiA4NHB4O1xyXG4gICAgei1pbmRleDogMjtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDVweDtcclxufVxyXG5cclxuLnZvLXByb2R1Y3QtbmFtZSB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLnZvLXByb2R1Y3QtcHJpY2Uge1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxufVxyXG5cclxuaW9uLWdyaWQgaW9uLXJvdyB7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gICAgO1xyXG59XHJcblxyXG4ubm8tZGF0YSB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDQwJTtcclxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICBtYXJnaW4tbGVmdDogLTY1cHg7XHJcbn1cclxuXHJcbi5uby1kYXRhIGltZyB7XHJcbiAgICB3aWR0aDogMTUwcHg7XHJcbn1cclxuLnNwaW5uZXIge1xyXG4gICAgLy8gbWFyZ2luLXRvcDogNDAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4udm8tcGxhY2VkLW9uIHtcclxuICAgIGZvbnQtc2l6ZTogMTFweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG9wYWNpdHk6IC42O1xyXG59XHJcblxyXG4udm8tb3JkZXItaWQge1xyXG4gICAgbWFyZ2luOiAxNXB4IDEwcHggMXB4O1xyXG4gICAgb3BhY2l0eTogLjg7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbn1cclxuXHJcbi52by12aWV3LWRldGFpbHMtYnRuIHtcclxuICAgIHRleHQtYWxpZ246IGVuZDtcclxuICAgIGlvbi1idXR0b24ge1xyXG4gICAgICAgIG1hcmdpbjogMTBweDtcclxuICAgIH1cclxufVxyXG5cclxuLnZvLWFjdGlvbi1idG4ge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbWFyZ2luOiAwcHggLTdweCAtN3B4IC03cHg7XHJcbn1cclxuXHJcbi5mbGF0aWNvbi1udWxsLTIwOjpiZWZvcmUge1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxuICAgIG1hcmdpbi1sZWZ0OiAycHg7XHJcbn1cclxuXHJcbi5mbGF0aWNvbi1udWxsLTE5OjpiZWZvcmUge1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDJweDtcclxufVxyXG5cclxuaW9uLWJ1dHRvbiAuZmxhdGljb24tbnVsbC03OjpiZWZvcmUge1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDNweDtcclxufSIsImlvbi1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiAjRjJGMkYyO1xufVxuXG5pb24tbGlzdCB7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLnZvLXByb2R1Y3RzLWNvbnRhaW5lciB7XG4gIG1hcmdpbjogMHB4IDEwcHggMTBweCAxMHB4O1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi52by1wcm9kdWN0LWltYWdlIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwic3JjL2Fzc2V0cy9pbWcvaW1nLXByZWxvYWRlci5wbmdcIikgY2VudGVyIG5vLXJlcGVhdDtcbiAgd2lkdGg6IDg1cHg7XG4gIGhlaWdodDogODVweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZjBmMGYwO1xufVxuXG4udm8tbm8tcHJvZHVjdC1pbWFnZSB7XG4gIGJhY2tncm91bmQ6IHVybChcInNyYy9hc3NldHMvaW1nL2ltZy1wcmVsb2FkZXIucG5nXCIpIGNlbnRlciBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgd2lkdGg6IDg1cHg7XG4gIGhlaWdodDogODVweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZThlOGU4O1xufVxuXG4udm8tbW9yZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgwZGVnLCByZ2JhKDAsIDAsIDAsIDAuNSksIHRyYW5zcGFyZW50KTtcbiAgYm90dG9tOiAwO1xuICBoZWlnaHQ6IDIwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDg0cHg7XG4gIHotaW5kZXg6IDI7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDVweDtcbn1cblxuLnZvLXByb2R1Y3QtbmFtZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLnZvLXByb2R1Y3QtcHJpY2Uge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBmb250LXNpemU6IDE4cHg7XG59XG5cbmlvbi1ncmlkIGlvbi1yb3cge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xufVxuXG4ubm8tZGF0YSB7XG4gIG1hcmdpbjogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDQwJTtcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBsZWZ0OiA1MCU7XG4gIG1hcmdpbi1sZWZ0OiAtNjVweDtcbn1cblxuLm5vLWRhdGEgaW1nIHtcbiAgd2lkdGg6IDE1MHB4O1xufVxuXG4uc3Bpbm5lciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnZvLXBsYWNlZC1vbiB7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBvcGFjaXR5OiAwLjY7XG59XG5cbi52by1vcmRlci1pZCB7XG4gIG1hcmdpbjogMTVweCAxMHB4IDFweDtcbiAgb3BhY2l0eTogMC44O1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi52by12aWV3LWRldGFpbHMtYnRuIHtcbiAgdGV4dC1hbGlnbjogZW5kO1xufVxuLnZvLXZpZXctZGV0YWlscy1idG4gaW9uLWJ1dHRvbiB7XG4gIG1hcmdpbjogMTBweDtcbn1cblxuLnZvLWFjdGlvbi1idG4ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbjogMHB4IC03cHggLTdweCAtN3B4O1xufVxuXG4uZmxhdGljb24tbnVsbC0yMDo6YmVmb3JlIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbn1cblxuLmZsYXRpY29uLW51bGwtMTk6OmJlZm9yZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbn1cblxuaW9uLWJ1dHRvbiAuZmxhdGljb24tbnVsbC03OjpiZWZvcmUge1xuICBmb250LXNpemU6IDEwcHg7XG4gIG1hcmdpbi1sZWZ0OiAzcHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/vendor-orders/vendor-orders.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/vendor-orders/vendor-orders.page.ts ***!
  \*****************************************************/
/*! exports provided: VendorOrdersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VendorOrdersPage", function() { return VendorOrdersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_config_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var _vendor_order_details_vendor_order_details_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../vendor-order-details/vendor-order-details.page */ "./src/app/vendor-order-details/vendor-order-details.page.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");









let VendorOrdersPage = class VendorOrdersPage {
    constructor(router, configService, navController, vendorService, modalController, storage, sharedService, alertController) {
        this.router = router;
        this.configService = configService;
        this.navController = navController;
        this.vendorService = vendorService;
        this.modalController = modalController;
        this.storage = storage;
        this.sharedService = sharedService;
        this.alertController = alertController;
        this.orders = [];
        this.showLoader = true;
        this.multipleVendorInvoices = false;
        this.createUserOrderEnabled = false;
    }
    ngOnInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.orderIdPrefix = this.configService.environment.orderIdPrefix;
            this.currencyCode = this.configService.environment.currencyCode;
            this.createUserOrderEnabled = this.configService.environment.createUserOrder;
            this.vendorId = yield this.storage.get('uid');
        });
    }
    loadOrders() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.showLoader = true;
            this.orders = yield this.vendorService.getOrders();
            this.showLoader = false;
        });
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.checkVendorAccess();
            this.showLoader = true;
            this.orders = yield this.vendorService.getOrders();
            this.ordersSub = this.vendorService.getVendorOrdersListener().subscribe(orders => {
                this.orders = orders;
            });
            this.showLoader = false;
            const multiVendorSettings = yield this.vendorService.getActiveStatus('service');
            if (multiVendorSettings) {
                this.multipleVendorInvoices = multiVendorSettings.multipleVendorInvoices;
            }
        });
    }
    checkVendorAccess() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.userId = yield this.storage.get('uid');
            console.log("userId: ", this.userId);
            const vendor = yield this.vendorService.getVendorData(this.userId, 'details');
            console.log("vendor: ", vendor);
            if (!vendor) {
                yield this.sharedService.presentAlert("vendor not found!");
                this.navController.navigateRoot(['no-user-access']);
                return;
            }
            if (vendor && !vendor.active) {
                this.navController.navigateRoot(['no-user-access']);
                return;
            }
            // else {
            //   await this.checkVendorMembershipAccess(vendor);
            // }
        });
    }
    checkVendorMembershipAccess(vendor) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const response = yield this.vendorService.getVendorMembership();
            console.log("vendor", vendor);
            if (!response.active) {
                return;
            }
            else {
                if (!vendor.membership || !vendor.membership.active) {
                    this.sharedService.presentAlert("Your membership is expired. Please purchase membership to continue.");
                    this.navController.navigateRoot(['buy-vendor-membership']);
                    return;
                }
            }
        });
    }
    ionViewWillLeave() {
        this.vendorService.unsubscribeVendorOrderSub();
        this.ordersSub.unsubscribe();
    }
    getImgUrl(img) {
        if (img.mob) {
            return 'mob';
        }
        if (!img.mob && img.url) {
            return 'url';
        }
    }
    onClickViewDetails(order) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log("order", order);
            const modal = yield this.modalController.create({
                component: _vendor_order_details_vendor_order_details_page__WEBPACK_IMPORTED_MODULE_6__["VendorOrderDetailsPage"],
                cssClass: 'custom-modal',
                componentProps: {
                    'order': order
                }
            });
            modal.onDidDismiss().then((res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                if (res && res.data) {
                    // console.log("resData", res);
                    if (res.data.isUpdated) {
                        if (this.orders.length) {
                            for (let order of this.orders) {
                                if (order.id === res.data.id) {
                                    console.log("order.id", order.id);
                                    console.log("res.data.id", res.data.id);
                                    order.originalProducts = res.data.products;
                                    order.products = res.data.products;
                                    order.vendors = res.data.vendors;
                                    break;
                                }
                            }
                        }
                        // console.log("isUpdated");
                    }
                }
            }));
            yield modal.present();
        });
    }
    loadMoreOrders(event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const orders = yield this.vendorService.loadMoreOrders();
            setTimeout(() => {
                event.target.complete();
            }, 1000);
            if (!orders.length) {
                event.target.disabled = true;
            }
        });
    }
    checkProductToDeliver() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const uid = yield this.storage.get('uid');
            const navigationExtras = {
                state: {
                    vendorId: uid
                }
            };
            this.router.navigate(['products-to-deliver'], navigationExtras);
        });
    }
    downloadInvoice(order) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log('order:', order);
            for (const vendor of order.vendors) {
                if (vendor.id == this.userId && vendor.invoice) {
                    window.open(vendor.invoice, "_blank");
                }
                else {
                    this.sharedService.presentAlert('Invoice not available');
                }
            }
        });
    }
    isSubOrMembershipOrder(order) {
        if (order.hasOwnProperty('orderType') && (order.orderType === 'subscription' || order.orderType === 'membership')) {
            return true;
        }
        else {
            return false;
        }
    }
    goToManageShipment(id, order) {
        if (order.status === 'Pending') {
            this.sharedService.presentAlert('Please Confirm order before managing shipment');
        }
        else {
            this.router.navigate([`manage-shipment/${id}/${this.vendorId}`]);
        }
    }
    createOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.createUserOrderEnabled == false) {
                const alert = yield this.alertController.create({
                    message: "Sorry, this feature is not available. Please upgrade your plan for access",
                    buttons: ['ok']
                });
                yield alert.present();
            }
            else {
                this.router.navigate(['create-order']);
            }
        });
    }
};
VendorOrdersPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"] },
    { type: _services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_5__["VendorService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"] },
    { type: _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_8__["SharedService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] }
];
VendorOrdersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-vendor-orders',
        template: __webpack_require__(/*! raw-loader!./vendor-orders.page.html */ "./node_modules/raw-loader/index.js!./src/app/vendor-orders/vendor-orders.page.html"),
        styles: [__webpack_require__(/*! ./vendor-orders.page.scss */ "./src/app/vendor-orders/vendor-orders.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"],
        _services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_5__["VendorService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"],
        _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_8__["SharedService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"]])
], VendorOrdersPage);



/***/ })

}]);
//# sourceMappingURL=vendor-orders-vendor-orders-module-es2015.js.map