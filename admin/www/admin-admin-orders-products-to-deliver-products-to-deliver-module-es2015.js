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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _products_to_deliver_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./products-to-deliver.page */ "./src/app/admin/admin-orders/products-to-deliver/products-to-deliver.page.ts");







const routes = [
    {
        path: '',
        component: _products_to_deliver_page__WEBPACK_IMPORTED_MODULE_6__["ProductsToDeliverPage"]
    }
];
let ProductsToDeliverPageModule = class ProductsToDeliverPageModule {
};
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var src_app_admin_admin_home_view_order_view_order_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/admin/admin-home/view-order/view-order.page */ "./src/app/admin/admin-home/view-order/view-order.page.ts");
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var src_app_vendor_order_details_vendor_order_details_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/vendor-order-details/vendor-order-details.page */ "./src/app/vendor-order-details/vendor-order-details.page.ts");











let ProductsToDeliverPage = class ProductsToDeliverPage {
    constructor(modalController, events, router, loadingController, alertController, popoverController, userService, storage, vendorService, route) {
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
        this.route.queryParams.subscribe((params) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.router.getCurrentNavigation().extras.state) {
                const recieveData = yield this.router.getCurrentNavigation().extras.state;
                if (recieveData) {
                    this.vendorId = recieveData.vendorId;
                }
            }
        }));
    }
    ngOnInit() {
    }
    ionViewDidEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.role = yield this.storage.get('userRole');
            if (this.vendorId) {
                this.orders = yield this.vendorService.getOrdersForProductsNeedToDeliver(this.vendorId);
            }
            else {
                this.orders = yield this.userService.getProductsNeedToDeliverForAdmin();
            }
            if (!this.orders.length) {
                this.noProductsNeedToDeliver = true;
                this.showProductsNeedToDeliverLoader = false;
            }
            else {
                this.productsQuantityPerOrder(this.orders);
                this.noProductsNeedToDeliver = false;
                this.showProductsNeedToDeliverLoader = false;
            }
        });
    }
    initializeSubscriptions() {
        this.events.subscribe('user:publishProductsNeedToDeliverForAdmin', (orders) => {
            this.productsQuantityPerOrder(orders);
            this.noProductsNeedToDeliver = false;
            this.showProductsNeedToDeliverLoader = false;
        });
        this.events.subscribe('user:noProductsNeedToDeliverForAdmin', () => {
            this.noProductsNeedToDeliver = true;
            this.showProductsNeedToDeliverLoader = false;
        });
        this.events.subscribe('user:noMoreProductsNeedToDeliverForAdmin', () => {
            this.noMoreProductsNeedToDeliver = true;
        });
    }
    onClickViewDetails(id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.vendorId && this.role === 'vendor') {
                const order = this.orders.find(o => o.orderId === id);
                if (order && typeof order === 'object' && Object.keys(order).length) {
                    const modal = yield this.modalController.create({
                        component: src_app_vendor_order_details_vendor_order_details_page__WEBPACK_IMPORTED_MODULE_10__["VendorOrderDetailsPage"],
                        cssClass: 'custom-modal',
                        componentProps: {
                            'order': order
                        }
                    });
                    modal.onDidDismiss().then((res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                        console.log("modal2 res", res);
                        if (res && res.data && res.data.status) {
                            if (res.data.status === 'Delivered') {
                                yield this.removeDeliveredOrder(id);
                            }
                        }
                    }));
                    yield modal.present();
                }
            }
            else {
                const modal2 = yield this.modalController.create({
                    component: src_app_admin_admin_home_view_order_view_order_page__WEBPACK_IMPORTED_MODULE_6__["ViewOrderPage"],
                    cssClass: 'view-order-css',
                    componentProps: {
                        orderId: id
                    }
                });
                modal2.onDidDismiss().then((res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                    console.log("modal2 res", res);
                    if (res && res.data && res.data.status) {
                        if (res.data.status === 'Delivered') {
                            yield this.removeDeliveredOrder(id);
                        }
                    }
                }));
                yield modal2.present();
            }
        });
    }
    removeDeliveredOrder(orderId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            for (let productObj of this.uniqueProductsQtyPerOrder) {
                // console.log("productObj",productObj);
                for (let itemObj in productObj) {
                    // console.log("itemObj",itemObj);
                    for (let [orderObjIndex, orderObj] of productObj[itemObj].quantityPerOrder.entries()) {
                        if (orderObj.orderId === orderId) {
                            console.log("orderObjIndex", orderObjIndex);
                            console.log("orderObj", orderObj);
                            productObj[itemObj].quantityPerOrder.splice(orderObjIndex, 1);
                        }
                    }
                }
            }
        });
    }
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
    getProductsNeedToDeliverForAdmin() {
        this.exportType = 'products';
        if (this.productsNeedToDeliver.length === 0) {
            this.events.publish('user:getProductsNeedToDeliverForAdmin');
        }
    }
    productsQuantityPerOrder(orders) {
        let uniqueProdcuts = [];
        let productsQuantity = [];
        for (let index = 0; index < orders.length; index++) {
            for (let x = 0; x < orders[index].products.length; x++) {
                if (orders[index].status === 'Pending' || orders[index].status === 'Confirmed') {
                    let pid = orders[index].products[x].productId;
                    let product = {};
                    product[pid] = {
                        quantity: this.getProductQty(orders[index], x),
                        orderId: orders[index].orderId,
                        weight: 'pack' in orders[index].products[x] ? orders[index].products[x].pack.weight : null
                    };
                    if (product[pid].quantity) {
                        productsQuantity.push(product);
                        if (!uniqueProdcuts.some(e => e.hasOwnProperty(pid))) {
                            let uniqueProduct = {};
                            uniqueProduct[pid] = {
                                name: orders[index].products[x].name,
                                img: orders[index].products[x].img,
                                quantityPerOrder: []
                            };
                            uniqueProdcuts.push(uniqueProduct);
                        }
                    }
                }
            }
        }
        // console.log('productsQuantity', productsQuantity);
        // console.log('uniqueProdcuts', uniqueProdcuts);
        for (let index = 0; index < uniqueProdcuts.length; index++) {
            for (const [key, value] of Object.entries(uniqueProdcuts[index])) {
                for (let x = 0; x < productsQuantity.length; x++) {
                    for (const [pid, qty] of Object.entries(productsQuantity[x])) {
                        if (key === pid) {
                            uniqueProdcuts[index][key].quantityPerOrder.push(qty);
                        }
                    }
                }
            }
        }
        // console.log('uniqueProdcuts final', uniqueProdcuts);
        this.uniqueProductsQtyPerOrder = uniqueProdcuts;
    }
    getProductQty(order, productIndex) {
        let unavailableQty = 0;
        if ('unavailable' in order && order.unavailable[productIndex]) {
            unavailableQty = order.unavailable[productIndex];
        }
        return order.products[productIndex].quantity - unavailableQty;
    }
    showVariantsQty(quantities) {
        return quantities.some(q => q.weight !== null);
    }
    getVariantsQty(quantities) {
        let variants = [];
        quantities.forEach(element => {
            const index = variants.findIndex(v => v.weight === element.weight);
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
    }
    exportProducts() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.uniqueProductsQtyPerOrder && this.uniqueProductsQtyPerOrder.length) {
                this.options.filename = 'Products for Delivery ' + this.getDateTimeFormat(new Date);
                this.options.title = 'Products for Delivery ' + this.getDateTimeFormat(new Date);
                let data = [];
                this.uniqueProductsQtyPerOrder.forEach(product => {
                    if (product) {
                        let varientArray = [];
                        for (var key in product) {
                            let item = product[key];
                            item.quantityPerOrder.forEach(element => {
                                if (varientArray.length == 0) {
                                    varientArray.push({ weight: element.weight, quantity: element.quantity });
                                }
                                else {
                                    const index = varientArray.findIndex(v => v.weight == element.weight);
                                    if (index == -1) {
                                        varientArray.push({ weight: element.weight, quantity: element.quantity });
                                    }
                                    else {
                                        varientArray[index].quantity += element.quantity;
                                    }
                                }
                            });
                            varientArray.forEach(element => {
                                data.push({
                                    product: item.name || '',
                                    variant: element.weight || '-',
                                    quantity: element.quantity
                                });
                            });
                        }
                    }
                });
                const csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_5__["ExportToCsv"](this.options);
                csvExporter.generateCsv(data);
            }
        });
    }
    getDateTimeFormat(date) {
        return moment__WEBPACK_IMPORTED_MODULE_4__(date).format('MMM D, YYYY hh:mm a');
    }
    calcTotalQtyPerOrder(qty) {
        let totalQty = 0;
        for (let index = 0; index < qty.length; index++) {
            totalQty += qty[index].quantity;
        }
        return totalQty;
    }
};
ProductsToDeliverPage.ctorParameters = () => [
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
];
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



/***/ })

}]);
//# sourceMappingURL=admin-admin-orders-products-to-deliver-products-to-deliver-module-es2015.js.map