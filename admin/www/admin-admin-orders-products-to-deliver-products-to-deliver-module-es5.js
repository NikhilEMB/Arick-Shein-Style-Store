(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-orders-products-to-deliver-products-to-deliver-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-orders/products-to-deliver/products-to-deliver.page.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-orders/products-to-deliver/products-to-deliver.page.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"admin-orders\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Products to Deliver</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"exportProducts()\">\r\n      Export Products to Deliver\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <div *ngIf=\"showProductsNeedToDeliverLoader\" class=\"spinner\">\r\n      <ion-spinner color=\"primary\"></ion-spinner>\r\n    </div>\r\n    <div class=\"no-data\"\r\n      *ngIf=\"noProductsNeedToDeliver && !showProductsNeedToDeliverLoader && !uniqueProductsQtyPerOrder.length; else showProductsNeedToDeliver\"\r\n      text-center>\r\n      <img src=\"assets/img/no-product.png\" alt=\"\">\r\n      <h6>No products need to deliver</h6>\r\n    </div>\r\n\r\n\r\n    <ng-template #showProductsNeedToDeliver>\r\n\r\n      <div class=\"ion-padding ion-text-center border-bottom\">\r\n        List of products you need to deliver\r\n      </div>\r\n\r\n      <div *ngIf=\"uniqueProductsQtyPerOrder.length > 0\">\r\n\r\n\r\n        <ng-container *ngFor=\"let productObj of uniqueProductsQtyPerOrder; let i=index\">\r\n\r\n          <ion-row *ngFor=\"let item of productObj | keyvalue\" class=\"border-bottom\">\r\n            <ion-col size=\"1\">\r\n              <div\r\n                [ngStyle]=\"{'background': 'url(' + item.value.img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n                class=\"ao-product-image\"></div>\r\n            </ion-col>\r\n            <ion-col size=\"5\" class=\"product-name-col\">\r\n              <p class=\"name ion-text-wrap\">{{item.value.name}}</p>\r\n              <p class=\"total-qty ion-text-wrap\" *ngIf=\"!showVariantsQty(item.value.quantityPerOrder); else showVariants;\">Total Qty:\r\n                {{calcTotalQtyPerOrder(item.value.quantityPerOrder)}}</p>\r\n\r\n                <ng-template #showVariants>\r\n                  <ul>\r\n                    <li class=\"ion-text-wrap\" *ngFor=\"let variant of getVariantsQty(item.value.quantityPerOrder)\">\r\n                      Total {{variant.weight}} Qty: {{variant.qty}}\r\n                    </li>\r\n                  </ul>\r\n                </ng-template>\r\n              \r\n            </ion-col>\r\n            <ion-col size=\"6\">\r\n              <ng-container *ngFor=\"let qty of item.value.quantityPerOrder; let q = index\">\r\n                <ion-chip (click)=\"onClickViewDetails(qty.orderId)\">\r\n                  <ion-label>ORD{{qty.orderId}} - <strong>{{qty.quantity}}</strong></ion-label>\r\n                  &nbsp;\r\n                  <ion-label *ngIf=\"qty.weight\">({{qty.weight}})</ion-label>\r\n                </ion-chip>\r\n                <span *ngIf=\"q !== item.value.quantityPerOrder.length - 1\" class=\"qtys-plus\">+</span>\r\n              </ng-container>\r\n\r\n\r\n            </ion-col>\r\n\r\n          </ion-row>\r\n\r\n        </ng-container>\r\n\r\n      </div>\r\n    </ng-template>\r\n\r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/admin-orders/products-to-deliver/products-to-deliver.module.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/admin/admin-orders/products-to-deliver/products-to-deliver.module.ts ***!
  \**************************************************************************************/
/*! exports provided: ProductsToDeliverPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsToDeliverPageModule", function() { return ProductsToDeliverPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _products_to_deliver_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./products-to-deliver.page */ "./src/app/admin/admin-orders/products-to-deliver/products-to-deliver.page.ts");







var routes = [
    {
        path: '',
        component: _products_to_deliver_page__WEBPACK_IMPORTED_MODULE_6__["ProductsToDeliverPage"]
    }
];
var ProductsToDeliverPageModule = /** @class */ (function () {
    function ProductsToDeliverPageModule() {
    }
    ProductsToDeliverPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_products_to_deliver_page__WEBPACK_IMPORTED_MODULE_6__["ProductsToDeliverPage"]]
        })
    ], ProductsToDeliverPageModule);
    return ProductsToDeliverPageModule;
}());



/***/ }),

/***/ "./src/app/admin/admin-orders/products-to-deliver/products-to-deliver.page.scss":
/*!**************************************************************************************!*\
  !*** ./src/app/admin/admin-orders/products-to-deliver/products-to-deliver.page.scss ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".border-bottom {\n  border-bottom: 1px solid lightgray;\n}\n\n.ao-product-image {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n  width: 64px;\n  height: 64px;\n  position: relative;\n  border: 1px solid #f0f0f0;\n}\n\n.product-name-col {\n  line-height: 2;\n}\n\n.product-name-col .name {\n  font-size: 16px;\n  font-weight: bold;\n}\n\n.product-name-col ul {\n  -webkit-padding-start: 0;\n          padding-inline-start: 0;\n  list-style: inside;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tb3JkZXJzL3Byb2R1Y3RzLXRvLWRlbGl2ZXIvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxhZG1pbi1vcmRlcnNcXHByb2R1Y3RzLXRvLWRlbGl2ZXJcXHByb2R1Y3RzLXRvLWRlbGl2ZXIucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZG1pbi1vcmRlcnMvcHJvZHVjdHMtdG8tZGVsaXZlci9wcm9kdWN0cy10by1kZWxpdmVyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtDQUFBO0FDQ0o7O0FERUE7RUFDSSxzR0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtBQ0NKOztBREVBO0VBQ0ksY0FBQTtBQ0NKOztBREFJO0VBQ0ksZUFBQTtFQUNBLGlCQUFBO0FDRVI7O0FEQUk7RUFDSSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0Esa0JBQUE7QUNFUiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2FkbWluLW9yZGVycy9wcm9kdWN0cy10by1kZWxpdmVyL3Byb2R1Y3RzLXRvLWRlbGl2ZXIucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJvcmRlci1ib3R0b217XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG59XHJcbiAgXHJcbi5hby1wcm9kdWN0LWltYWdlIHtcclxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybCgnaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzL2xvYWRlcmJiMTllZmNjMjc0OWUxMTUuZ2lmJykgY2VudGVyIG5vLXJlcGVhdDtcclxuICAgIHdpZHRoOjY0cHg7XHJcbiAgICBoZWlnaHQ6IDY0cHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZjBmMGYwO1xyXG59XHJcblxyXG4ucHJvZHVjdC1uYW1lLWNvbCB7XHJcbiAgICBsaW5lLWhlaWdodDogMjtcclxuICAgIC5uYW1lIHtcclxuICAgICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICB9XHJcbiAgICB1bCB7XHJcbiAgICAgICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IDA7XHJcbiAgICAgICAgbGlzdC1zdHlsZTogaW5zaWRlO1xyXG4gICAgfVxyXG59IiwiLmJvcmRlci1ib3R0b20ge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgbGlnaHRncmF5O1xufVxuXG4uYW8tcHJvZHVjdC1pbWFnZSB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcImh0dHBzOi8vczUuZ2lmeXUuY29tL2ltYWdlcy9sb2FkZXJiYjE5ZWZjYzI3NDllMTE1LmdpZlwiKSBjZW50ZXIgbm8tcmVwZWF0O1xuICB3aWR0aDogNjRweDtcbiAgaGVpZ2h0OiA2NHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmMGYwZjA7XG59XG5cbi5wcm9kdWN0LW5hbWUtY29sIHtcbiAgbGluZS1oZWlnaHQ6IDI7XG59XG4ucHJvZHVjdC1uYW1lLWNvbCAubmFtZSB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4ucHJvZHVjdC1uYW1lLWNvbCB1bCB7XG4gIHBhZGRpbmctaW5saW5lLXN0YXJ0OiAwO1xuICBsaXN0LXN0eWxlOiBpbnNpZGU7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/admin-orders/products-to-deliver/products-to-deliver.page.ts":
/*!************************************************************************************!*\
  !*** ./src/app/admin/admin-orders/products-to-deliver/products-to-deliver.page.ts ***!
  \************************************************************************************/
/*! exports provided: ProductsToDeliverPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsToDeliverPage", function() { return ProductsToDeliverPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var src_app_admin_admin_home_view_order_view_order_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/admin/admin-home/view-order/view-order.page */ "./src/app/admin/admin-home/view-order/view-order.page.ts");
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var src_app_vendor_order_details_vendor_order_details_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/vendor-order-details/vendor-order-details.page */ "./src/app/vendor-order-details/vendor-order-details.page.ts");











var ProductsToDeliverPage = /** @class */ (function () {
    function ProductsToDeliverPage(modalController, events, router, loadingController, alertController, popoverController, userService, storage, vendorService, route) {
        var _this = this;
        this.modalController = modalController;
        this.events = events;
        this.router = router;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.popoverController = popoverController;
        this.userService = userService;
        this.storage = storage;
        this.vendorService = vendorService;
        this.route = route;
        this.productsNeedToDeliver = [];
        this.noProductsNeedToDeliver = false;
        this.showProductsNeedToDeliverLoader = true;
        this.uniqueProductsQtyPerOrder = [];
        this.exportType = 'products';
        this.options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            filename: 'Products',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'Exported Products',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true
        };
        this.role = "";
        this.orders = [];
        this.route.queryParams.subscribe(function (params) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var recieveData;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.router.getCurrentNavigation().extras.state) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.router.getCurrentNavigation().extras.state];
                    case 1:
                        recieveData = _a.sent();
                        if (recieveData) {
                            this.vendorId = recieveData.vendorId;
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    }
    ProductsToDeliverPage.prototype.ngOnInit = function () {
    };
    ProductsToDeliverPage.prototype.ionViewDidEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b, _c;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.storage.get('userRole')];
                    case 1:
                        _a.role = _d.sent();
                        if (!this.vendorId) return [3 /*break*/, 3];
                        _b = this;
                        return [4 /*yield*/, this.vendorService.getOrdersForProductsNeedToDeliver(this.vendorId)];
                    case 2:
                        _b.orders = _d.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        _c = this;
                        return [4 /*yield*/, this.userService.getProductsNeedToDeliverForAdmin()];
                    case 4:
                        _c.orders = _d.sent();
                        _d.label = 5;
                    case 5:
                        if (!this.orders.length) {
                            this.noProductsNeedToDeliver = true;
                            this.showProductsNeedToDeliverLoader = false;
                        }
                        else {
                            this.productsQuantityPerOrder(this.orders);
                            this.noProductsNeedToDeliver = false;
                            this.showProductsNeedToDeliverLoader = false;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductsToDeliverPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('user:publishProductsNeedToDeliverForAdmin', function (orders) {
            _this.productsQuantityPerOrder(orders);
            _this.noProductsNeedToDeliver = false;
            _this.showProductsNeedToDeliverLoader = false;
        });
        this.events.subscribe('user:noProductsNeedToDeliverForAdmin', function () {
            _this.noProductsNeedToDeliver = true;
            _this.showProductsNeedToDeliverLoader = false;
        });
        this.events.subscribe('user:noMoreProductsNeedToDeliverForAdmin', function () {
            _this.noMoreProductsNeedToDeliver = true;
        });
    };
    ProductsToDeliverPage.prototype.onClickViewDetails = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var order, modal, modal2;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.vendorId && this.role === 'vendor')) return [3 /*break*/, 4];
                        order = this.orders.find(function (o) { return o.orderId === id; });
                        if (!(order && typeof order === 'object' && Object.keys(order).length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.modalController.create({
                                component: src_app_vendor_order_details_vendor_order_details_page__WEBPACK_IMPORTED_MODULE_10__["VendorOrderDetailsPage"],
                                cssClass: 'custom-modal',
                                componentProps: {
                                    'order': order
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log("modal2 res", res);
                                        if (!(res && res.data && res.data.status)) return [3 /*break*/, 2];
                                        if (!(res.data.status === 'Delivered')) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.removeDeliveredOrder(id)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, this.modalController.create({
                            component: src_app_admin_admin_home_view_order_view_order_page__WEBPACK_IMPORTED_MODULE_6__["ViewOrderPage"],
                            cssClass: 'view-order-css',
                            componentProps: {
                                orderId: id
                            }
                        })];
                    case 5:
                        modal2 = _a.sent();
                        modal2.onDidDismiss().then(function (res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log("modal2 res", res);
                                        if (!(res && res.data && res.data.status)) return [3 /*break*/, 2];
                                        if (!(res.data.status === 'Delivered')) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.removeDeliveredOrder(id)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, modal2.present()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ProductsToDeliverPage.prototype.removeDeliveredOrder = function (orderId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _i, _a, productObj, itemObj, _b, _c, _d, orderObjIndex, orderObj;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_e) {
                for (_i = 0, _a = this.uniqueProductsQtyPerOrder; _i < _a.length; _i++) {
                    productObj = _a[_i];
                    // console.log("productObj",productObj);
                    for (itemObj in productObj) {
                        // console.log("itemObj",itemObj);
                        for (_b = 0, _c = productObj[itemObj].quantityPerOrder.entries(); _b < _c.length; _b++) {
                            _d = _c[_b], orderObjIndex = _d[0], orderObj = _d[1];
                            if (orderObj.orderId === orderId) {
                                console.log("orderObjIndex", orderObjIndex);
                                console.log("orderObj", orderObj);
                                productObj[itemObj].quantityPerOrder.splice(orderObjIndex, 1);
                            }
                        }
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    // async removeDeliveredOrder(orderId: any) {
    //   console.log("uniqueProductsQtyPerOrder", this.uniqueProductsQtyPerOrder);
    //   for (let [productObjIndex, productObj] of this.uniqueProductsQtyPerOrder.entries()) {
    //     for (let itemObj in productObj) {
    //       for (let [orderObjIndex, orderObj] of productObj[itemObj].quantityPerOrder.entries()) {
    //         if (orderObj.orderId === orderId) {
    //           console.log("productObj", productObj);
    //           console.log("itemObj", itemObj);
    //           console.log("orderObjIndex", orderObjIndex);
    //           console.log("orderObj", orderObj);
    //           if (productObj[itemObj].quantityPerOrder.length === 1) {
    //             console.log("productObjIndex", productObjIndex);
    //             this.uniqueProductsQtyPerOrder.splice(productObjIndex, 1);
    //           } else {
    //             console.log("orderObjIndex", orderObjIndex);
    //             productObj[itemObj].quantityPerOrder.splice(orderObjIndex, 1);
    //           }
    //           break;
    //         }
    //       }
    //     }
    //   }
    // }
    ProductsToDeliverPage.prototype.getProductsNeedToDeliverForAdmin = function () {
        this.exportType = 'products';
        if (this.productsNeedToDeliver.length === 0) {
            this.events.publish('user:getProductsNeedToDeliverForAdmin');
        }
    };
    ProductsToDeliverPage.prototype.productsQuantityPerOrder = function (orders) {
        var uniqueProdcuts = [];
        var productsQuantity = [];
        for (var index = 0; index < orders.length; index++) {
            var _loop_1 = function (x) {
                if (orders[index].status === 'Pending' || orders[index].status === 'Confirmed') {
                    var pid_1 = orders[index].products[x].productId;
                    var product = {};
                    product[pid_1] = {
                        quantity: this_1.getProductQty(orders[index], x),
                        orderId: orders[index].orderId,
                        weight: 'pack' in orders[index].products[x] ? orders[index].products[x].pack.weight : null
                    };
                    if (product[pid_1].quantity) {
                        productsQuantity.push(product);
                        if (!uniqueProdcuts.some(function (e) { return e.hasOwnProperty(pid_1); })) {
                            var uniqueProduct = {};
                            uniqueProduct[pid_1] = {
                                name: orders[index].products[x].name,
                                img: orders[index].products[x].img,
                                quantityPerOrder: []
                            };
                            uniqueProdcuts.push(uniqueProduct);
                        }
                    }
                }
            };
            var this_1 = this;
            for (var x = 0; x < orders[index].products.length; x++) {
                _loop_1(x);
            }
        }
        // console.log('productsQuantity', productsQuantity);
        // console.log('uniqueProdcuts', uniqueProdcuts);
        for (var index = 0; index < uniqueProdcuts.length; index++) {
            for (var _i = 0, _a = Object.entries(uniqueProdcuts[index]); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                for (var x = 0; x < productsQuantity.length; x++) {
                    for (var _c = 0, _d = Object.entries(productsQuantity[x]); _c < _d.length; _c++) {
                        var _e = _d[_c], pid = _e[0], qty = _e[1];
                        if (key === pid) {
                            uniqueProdcuts[index][key].quantityPerOrder.push(qty);
                        }
                    }
                }
            }
        }
        // console.log('uniqueProdcuts final', uniqueProdcuts);
        this.uniqueProductsQtyPerOrder = uniqueProdcuts;
    };
    ProductsToDeliverPage.prototype.getProductQty = function (order, productIndex) {
        var unavailableQty = 0;
        if ('unavailable' in order && order.unavailable[productIndex]) {
            unavailableQty = order.unavailable[productIndex];
        }
        return order.products[productIndex].quantity - unavailableQty;
    };
    ProductsToDeliverPage.prototype.showVariantsQty = function (quantities) {
        return quantities.some(function (q) { return q.weight !== null; });
    };
    ProductsToDeliverPage.prototype.getVariantsQty = function (quantities) {
        var variants = [];
        quantities.forEach(function (element) {
            var index = variants.findIndex(function (v) { return v.weight === element.weight; });
            if (index === -1) {
                if (element.weight) {
                    variants.push({
                        weight: element.weight,
                        qty: element.quantity
                    });
                }
                else {
                    variants.push({
                        weight: null,
                        qty: element.quantity
                    });
                }
            }
            else {
                variants[index].qty += element.quantity;
            }
        });
        return variants;
    };
    ProductsToDeliverPage.prototype.exportProducts = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var data_1, csvExporter;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (this.uniqueProductsQtyPerOrder && this.uniqueProductsQtyPerOrder.length) {
                    this.options.filename = 'Products for Delivery ' + this.getDateTimeFormat(new Date);
                    this.options.title = 'Products for Delivery ' + this.getDateTimeFormat(new Date);
                    data_1 = [];
                    this.uniqueProductsQtyPerOrder.forEach(function (product) {
                        if (product) {
                            var varientArray_1 = [];
                            var _loop_2 = function () {
                                var item = product[key];
                                item.quantityPerOrder.forEach(function (element) {
                                    if (varientArray_1.length == 0) {
                                        varientArray_1.push({ weight: element.weight, quantity: element.quantity });
                                    }
                                    else {
                                        var index = varientArray_1.findIndex(function (v) { return v.weight == element.weight; });
                                        if (index == -1) {
                                            varientArray_1.push({ weight: element.weight, quantity: element.quantity });
                                        }
                                        else {
                                            varientArray_1[index].quantity += element.quantity;
                                        }
                                    }
                                });
                                varientArray_1.forEach(function (element) {
                                    data_1.push({
                                        product: item.name || '',
                                        variant: element.weight || '-',
                                        quantity: element.quantity
                                    });
                                });
                            };
                            for (var key in product) {
                                _loop_2();
                            }
                        }
                    });
                    csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_5__["ExportToCsv"](this.options);
                    csvExporter.generateCsv(data_1);
                }
                return [2 /*return*/];
            });
        });
    };
    ProductsToDeliverPage.prototype.getDateTimeFormat = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_4__(date).format('MMM D, YYYY hh:mm a');
    };
    ProductsToDeliverPage.prototype.calcTotalQtyPerOrder = function (qty) {
        var totalQty = 0;
        for (var index = 0; index < qty.length; index++) {
            totalQty += qty[index].quantity;
        }
        return totalQty;
    };
    ProductsToDeliverPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"] },
        { type: src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_8__["Storage"] },
        { type: src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__["VendorService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
    ]; };
    ProductsToDeliverPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-products-to-deliver',
            template: __webpack_require__(/*! raw-loader!./products-to-deliver.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-orders/products-to-deliver/products-to-deliver.page.html"),
            styles: [__webpack_require__(/*! ./products-to-deliver.page.scss */ "./src/app/admin/admin-orders/products-to-deliver/products-to-deliver.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"],
            src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_8__["Storage"],
            src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__["VendorService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], ProductsToDeliverPage);
    return ProductsToDeliverPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-orders-products-to-deliver-products-to-deliver-module-es5.js.map