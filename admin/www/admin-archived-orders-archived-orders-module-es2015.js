(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-archived-orders-archived-orders-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/archived-orders/archived-orders.page.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/archived-orders/archived-orders.page.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"admin-orders\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Archived Order</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <div *ngIf=\"showPendingLoader && !noPendingOrders\" class=\"spinner\">\r\n      <ion-spinner color=\"primary\"></ion-spinner>\r\n    </div>\r\n    <div class=\"no-data\" *ngIf=\"noPendingOrders && showPendingLoader; else showPendingOrders\"\r\n      text-center>\r\n      <img src=\"assets/img/no-orders.png\" alt=\"\">\r\n      <h6>No archived orders</h6>\r\n    </div>\r\n    <ng-template #showPendingOrders>\r\n      <!-- heading -->\r\n      <div class=\"list-header\">\r\n        <ion-grid class=\"ion-no-padding\">\r\n          <ion-row>\r\n            <ion-col class=\"name\">\r\n              <p>Customer</p>\r\n            </ion-col>\r\n            <ion-col class=\"name\">\r\n              <p>Products</p>\r\n            </ion-col>\r\n            <ion-col class=\"name\">\r\n              <p>Amount</p>\r\n            </ion-col>\r\n            <ion-col class=\"name\">\r\n              <p>Payment</p>\r\n            </ion-col>\r\n            <ion-col class=\"id\">\r\n              <p>Order ID</p>\r\n            </ion-col>\r\n            <ion-col class=\"date\">\r\n              <p>Date</p>\r\n            </ion-col>\r\n            <ion-col class=\"status\">\r\n              <p>Status</p>\r\n            </ion-col>\r\n            <ion-col class=\"action\">\r\n              <p>Remove</p>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n      </div>\r\n      <!-- heading -->\r\n      <!-- Order  list -->\r\n      <div class=\"list-container\">\r\n        <ion-grid>\r\n          <ng-container *ngFor=\"let order of pendingOrders; let i=index\">\r\n          <ion-row class=\"order-row\" *ngIf=\"order.subStatus && order.subStatus.isArchive == true\">\r\n            <ion-col class=\"name\">\r\n              <p *ngIf=\"order.userName\">{{order.userName}}</p>\r\n            </ion-col>\r\n            <ion-col class=\"name\">\r\n              <p *ngIf=\"order.products[0]\">{{order.products[0].name}} <span *ngIf=\"order.products.length > 1\">+\r\n                  {{order.products.length - 1}} more</span></p>\r\n            </ion-col>\r\n            <ion-col class=\"name\">\r\n              {{order.totalAmountToPaid}}\r\n            </ion-col>\r\n            <ion-col class=\"name\">\r\n              <p *ngIf=\"order.orderType && (order.orderType == 'subscription'); else notSubscription\">Subscription</p>\r\n              <ng-template #notSubscription>\r\n                <p *ngIf=\"order.payment && (order.payment.completed == true)\">Paid</p>\r\n                <p *ngIf=\"order.payment && (order.payment.completed == false) && (order.payment.mode != 'cash')\">Unpaid\r\n                </p>\r\n                <p *ngIf=\"order.payment && (order.payment.completed == false) && (order.payment.mode == 'cash')\">Unpaid\r\n                  (Cash)</p>\r\n              </ng-template>\r\n            </ion-col>\r\n            <ion-col class=\"id\">\r\n              <p>{{order.orderId}}</p>\r\n            </ion-col>\r\n            <ion-col class=\"date\">\r\n              <p>{{getDateTimeFormat(order.createdAt.toDate())}}</p>\r\n            </ion-col>\r\n            <ion-col class=\"status\">\r\n              <p>{{order.status}}</p>\r\n            </ion-col>\r\n            <ion-col class=\"action f-d-c \">\r\n              <ion-button (click)=\"remove(order.orderId, order, i)\" class=\"btn-sml i-start\" fill=\"outline\"\r\n              shape=\"round\">\r\n              Remove\r\n            </ion-button>\r\n            </ion-col>\r\n\r\n          </ion-row>\r\n        </ng-container>\r\n        </ion-grid>\r\n      </div>\r\n      <!-- Order  list -->\r\n\r\n    </ng-template>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/archived-orders/archived-orders.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/admin/archived-orders/archived-orders.module.ts ***!
  \*****************************************************************/
/*! exports provided: ArchivedOrdersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArchivedOrdersPageModule", function() { return ArchivedOrdersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _archived_orders_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./archived-orders.page */ "./src/app/admin/archived-orders/archived-orders.page.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.js");








const routes = [
    {
        path: '',
        component: _archived_orders_page__WEBPACK_IMPORTED_MODULE_6__["ArchivedOrdersPage"]
    }
];
let ArchivedOrdersPageModule = class ArchivedOrdersPageModule {
};
ArchivedOrdersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__["Ng2SearchPipeModule"],
        ],
        declarations: [_archived_orders_page__WEBPACK_IMPORTED_MODULE_6__["ArchivedOrdersPage"]]
    })
], ArchivedOrdersPageModule);



/***/ }),

/***/ "./src/app/admin/archived-orders/archived-orders.page.scss":
/*!*****************************************************************!*\
  !*** ./src/app/admin/archived-orders/archived-orders.page.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".list-container {\n  margin-top: 55px;\n}\n.list-container ion-grid {\n  padding: 0;\n}\n.list-container ion-grid ion-row {\n  border-bottom: var(--ion-color-medium) 1px solid;\n}\n.list-container ion-grid ion-row ion-col {\n  padding: 16px 8px;\n  -webkit-box-align: center;\n          align-items: center;\n  display: -webkit-inline-box;\n  display: inline-flex;\n}\n.id, .date, .status {\n  width: 100px;\n  max-width: 100px;\n  /*text-align: center;*/\n}\n.action {\n  width: 110px;\n  max-width: 110px;\n  text-align: center;\n}\n.name {\n  width: calc(100% - 410px);\n  max-width: calc(100% - 410px);\n}\n.ao-product-image {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n  width: 64px;\n  height: 64px;\n  position: relative;\n  border: 1px solid #f0f0f0;\n}\n.border-bottom {\n  border-bottom: var(--ion-color-medium) 1px solid;\n}\n.f-d-c {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.f-d-c .m-s-btn {\n  margin-top: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYXJjaGl2ZWQtb3JkZXJzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcYXJjaGl2ZWQtb3JkZXJzXFxhcmNoaXZlZC1vcmRlcnMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hcmNoaXZlZC1vcmRlcnMvYXJjaGl2ZWQtb3JkZXJzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJRTtFQUNFLGdCQUFBO0FDSEo7QURJSTtFQUNFLFVBQUE7QUNGTjtBREdNO0VBQ0UsZ0RBQUE7QUNEUjtBREVRO0VBQ0UsaUJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsMkJBQUE7RUFBQSxvQkFBQTtBQ0FWO0FETUU7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtBQ0hKO0FES0U7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQ0ZKO0FES0U7RUFDRSx5QkFBQTtFQUNBLDZCQUFBO0FDRko7QURLRTtFQUNFLHNHQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0FDRko7QURLRTtFQUNFLGdEQUFBO0FDRko7QURLRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNGSjtBRElJO0VBQ0UsZ0JBQUE7QUNGTiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2FyY2hpdmVkLW9yZGVycy9hcmNoaXZlZC1vcmRlcnMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxpc3QtaGVhZGVye1xyXG4gICAgLy90b3A6IDBweDtcclxuICB9XHJcbiAgXHJcbiAgLmxpc3QtY29udGFpbmVye1xyXG4gICAgbWFyZ2luLXRvcDogNTVweDtcclxuICAgIGlvbi1ncmlke1xyXG4gICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICBpb24tcm93e1xyXG4gICAgICAgIGJvcmRlci1ib3R0b206IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pIDFweCBzb2xpZDtcclxuICAgICAgICBpb24tY29se1xyXG4gICAgICAgICAgcGFkZGluZzoxNnB4IDhweDtcclxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLmlkLC5kYXRlLC5zdGF0dXN7XHJcbiAgICB3aWR0aDogMTAwcHg7XHJcbiAgICBtYXgtd2lkdGg6IDEwMHB4O1xyXG4gICAgLyp0ZXh0LWFsaWduOiBjZW50ZXI7Ki9cclxuICB9XHJcbiAgLmFjdGlvbntcclxuICAgIHdpZHRoOiAxMTBweDtcclxuICAgIG1heC13aWR0aDogMTEwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG4gIFxyXG4gIC5uYW1le1xyXG4gICAgd2lkdGg6IGNhbGMoMTAwJSAtIDQxMHB4KTtcclxuICAgIG1heC13aWR0aDogY2FsYygxMDAlIC0gNDEwcHgpO1xyXG4gIH1cclxuICBcclxuICAuYW8tcHJvZHVjdC1pbWFnZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoJ2h0dHBzOi8vczUuZ2lmeXUuY29tL2ltYWdlcy9sb2FkZXJiYjE5ZWZjYzI3NDllMTE1LmdpZicpIGNlbnRlciBuby1yZXBlYXQ7XHJcbiAgICB3aWR0aDo2NHB4O1xyXG4gICAgaGVpZ2h0OiA2NHB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2YwZjBmMDtcclxuICB9XHJcbiAgXHJcbiAgLmJvcmRlci1ib3R0b217XHJcbiAgICBib3JkZXItYm90dG9tOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XHJcbiAgfVxyXG4gIFxyXG4gIC5mLWQtYyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgXHJcbiAgICAubS1zLWJ0biB7XHJcbiAgICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgICB9XHJcbiAgfSIsIi5saXN0LWNvbnRhaW5lciB7XG4gIG1hcmdpbi10b3A6IDU1cHg7XG59XG4ubGlzdC1jb250YWluZXIgaW9uLWdyaWQge1xuICBwYWRkaW5nOiAwO1xufVxuLmxpc3QtY29udGFpbmVyIGlvbi1ncmlkIGlvbi1yb3cge1xuICBib3JkZXItYm90dG9tOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XG59XG4ubGlzdC1jb250YWluZXIgaW9uLWdyaWQgaW9uLXJvdyBpb24tY29sIHtcbiAgcGFkZGluZzogMTZweCA4cHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xufVxuXG4uaWQsIC5kYXRlLCAuc3RhdHVzIHtcbiAgd2lkdGg6IDEwMHB4O1xuICBtYXgtd2lkdGg6IDEwMHB4O1xuICAvKnRleHQtYWxpZ246IGNlbnRlcjsqL1xufVxuXG4uYWN0aW9uIHtcbiAgd2lkdGg6IDExMHB4O1xuICBtYXgtd2lkdGg6IDExMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5uYW1lIHtcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDQxMHB4KTtcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSA0MTBweCk7XG59XG5cbi5hby1wcm9kdWN0LWltYWdlIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzL2xvYWRlcmJiMTllZmNjMjc0OWUxMTUuZ2lmXCIpIGNlbnRlciBuby1yZXBlYXQ7XG4gIHdpZHRoOiA2NHB4O1xuICBoZWlnaHQ6IDY0cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2YwZjBmMDtcbn1cblxuLmJvcmRlci1ib3R0b20ge1xuICBib3JkZXItYm90dG9tOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XG59XG5cbi5mLWQtYyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uZi1kLWMgLm0tcy1idG4ge1xuICBtYXJnaW4tdG9wOiAxNXB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/archived-orders/archived-orders.page.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/archived-orders/archived-orders.page.ts ***!
  \***************************************************************/
/*! exports provided: ArchivedOrdersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArchivedOrdersPage", function() { return ArchivedOrdersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_app_services_order_order_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/order/order.service */ "./src/app/services/order/order.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");






let ArchivedOrdersPage = class ArchivedOrdersPage {
    constructor(events, loadingController, 
    // private storage: Storage, private configService: ConfigService, public alertController: AlertController
    sharedService, orderService) {
        this.events = events;
        this.loadingController = loadingController;
        this.sharedService = sharedService;
        this.orderService = orderService;
        this.pendingOrders = [];
        this.showPendingLoader = true;
        this.noPendingOrders = true;
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.pendingOrders = yield this.orderService.getArchiveOrders();
            if (this.pendingOrders) {
                this.noPendingOrders = false;
                this.showPendingLoader = false;
            }
            this.initializeSubscriptions();
        });
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('order:removeOrderArchiveSuccess', () => {
            this.sharedService.presentAlert('Order has been removed from archive!');
        });
        this.events.subscribe('order:removeOrderArchiveFailure', () => {
            this.sharedService.presentAlert('Please try again later.');
        });
    }
    removeSubscriptions() {
        this.events.unsubscribe('order:removeOrderArchiveSuccess');
        this.events.unsubscribe('order:removeOrderArchiveFailure');
    }
    clearSearchOrder() {
        this.searchOrder = null;
    }
    getDateTimeFormat(date) {
        return moment__WEBPACK_IMPORTED_MODULE_3__(date).format('MMM D, YYYY hh:mm a');
    }
    remove(orderId, order, index) {
        let obj = {
            subStatus: {
                isArchive: false
            }
        };
        this.pendingOrders[index].subStatus.isArchive = false;
        this.events.publish('order:removeOrderArchive', order.id, obj);
    }
};
ArchivedOrdersPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"] },
    { type: src_app_services_order_order_service__WEBPACK_IMPORTED_MODULE_4__["OrderService"] }
];
ArchivedOrdersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-archived-orders',
        template: __webpack_require__(/*! raw-loader!./archived-orders.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/archived-orders/archived-orders.page.html"),
        styles: [__webpack_require__(/*! ./archived-orders.page.scss */ "./src/app/admin/archived-orders/archived-orders.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"], src_app_services_order_order_service__WEBPACK_IMPORTED_MODULE_4__["OrderService"]])
], ArchivedOrdersPage);



/***/ })

}]);
//# sourceMappingURL=admin-archived-orders-archived-orders-module-es2015.js.map