(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-products-options-admin-products-options-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-products-options/admin-products-options.page.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-products-options/admin-products-options.page.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-no-padding\">\r\n  <div *ngIf=\"showLoader; else optionsLoaded\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n  <ng-template #optionsLoaded>\r\n    <div class=\"main-container\">\r\n    <div class=\"no-data\" *ngIf=\"!options.length; else showOptions\" text-center>\r\n      <img src=\"assets/img/no-product.png\" alt=\"\">\r\n      <h6>No options</h6>\r\n    </div>\r\n    <ng-template #showOptions>\r\n      <div class=\"list-header\">\r\n        <ion-grid class=\"ion-no-padding\" >\r\n          <ion-row class=\"ion-align-items-center ion-justify-content-center\" class=\"total-products\">\r\n            <ion-col size=\"6\">\r\n              Total Options\r\n            </ion-col>\r\n            <ion-col size=\"6\" style=\"text-align: end;font-size: larger;\">\r\n              {{options.length}}\r\n            </ion-col>\r\n            <ion-col size=\"12\">\r\n              <p> Options can be used to add different colours and variants of a product. These would be displayed as alternate options in that product\r\n              </p>\r\n            </ion-col>\r\n          </ion-row>\r\n          <ion-row >\r\n            <ion-col class=\"img\">\r\n              <p>Image</p>\r\n            </ion-col>\r\n            <ion-col class=\"name\">\r\n              <p>Name</p>\r\n            </ion-col>\r\n            <ion-col class=\"action\">\r\n              <p>Action</p>\r\n            </ion-col>\r\n            \r\n          </ion-row>\r\n        </ion-grid>\r\n      </div>\r\n      <div class=\"list-container\" *ngIf=\"options\">\r\n        <ion-list class=\"categories-list\" >\r\n              <ion-item class=\"ion-no-padding\" no-lines no-border *ngFor=\"let item of options; let i = index\">\r\n                <ion-grid class=\"ion-no-padding ion-align-items-center\">\r\n                  <ion-row class=\"row-background ion-align-items-center\">\r\n                    <ion-col  class=\"img\">\r\n                      <ion-thumbnail style=\"margin-left: 5%;\" class=\"product-img-wrapper\">\r\n                        <img class=\"loading\" *ngIf=\"item.coverPic && !item.coverPic.thumb && item.coverPic.url\"\r\n                          src=\"{{item.coverPic.url}}\">\r\n                        <img class=\"loading\" *ngIf=\"item.coverPic && item.coverPic.thumb\" src=\"{{item.coverPic.thumb}}\">\r\n                        <img *ngIf=\"!item.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n                      </ion-thumbnail>\r\n                      <div class=\"out-of-stock\" *ngIf=\"checkPdtOutOfDelivery(item)\">\r\n                        Out of stock\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col  class=\"name\">\r\n                      <div [ngClass]=\"{'product-active': item.status, 'product-inactive': !item.status}\">\r\n                      </div>\r\n                      <p text-capitalize text-center>{{item.prodName}}</p>\r\n                    </ion-col>\r\n                   \r\n                    <ion-col class=\"action\">\r\n                      <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"editProductOption(item)\">\r\n                        <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\"></i>\r\n                      </ion-button>\r\n                      <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"deleteProductOption(item.id)\">\r\n                        <i class=\"flaticon-null-21\" slot=\"icon-only\"></i>\r\n                      </ion-button>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                </ion-grid>\r\n              </ion-item>\r\n        </ion-list>\r\n        </div>\r\n    </ng-template>\r\n  </div>\r\n  </ng-template>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/admin-products-options/admin-products-options.module.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/admin-products-options/admin-products-options.module.ts ***!
  \*******************************************************************************/
/*! exports provided: AdminProductsOptionsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminProductsOptionsPageModule", function() { return AdminProductsOptionsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_products_options_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-products-options.page */ "./src/app/admin/admin-products-options/admin-products-options.page.ts");







const routes = [
    {
        path: '',
        component: _admin_products_options_page__WEBPACK_IMPORTED_MODULE_6__["AdminProductsOptionsPage"]
    }
];
let AdminProductsOptionsPageModule = class AdminProductsOptionsPageModule {
};
AdminProductsOptionsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_admin_products_options_page__WEBPACK_IMPORTED_MODULE_6__["AdminProductsOptionsPage"]]
    })
], AdminProductsOptionsPageModule);



/***/ }),

/***/ "./src/app/admin/admin-products-options/admin-products-options.page.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/admin-products-options/admin-products-options.page.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-col.img {\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.name {\n  width: calc(100% - 360px);\n  max-width: calc(100% - 300px);\n}\n\nion-col.action {\n  width: 128px;\n  max-width: 100px;\n}\n\n.product-img-wrapper {\n  position: relative;\n}\n\n.list-header {\n  background: #fff;\n  padding: 16px;\n  margin: auto;\n  font-weight: 600;\n  top: 64px;\n  z-index: 9;\n  -webkit-transform: translateX(-16px);\n          transform: translateX(-16px);\n  text-transform: capitalize;\n}\n\n.list-container {\n  margin-top: 100px;\n}\n\n.out-of-stock {\n  width: 97px;\n  position: absolute;\n  color: red;\n  top: 50%;\n  left: 40%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  text-align: center;\n  text-shadow: 0px 1px 1px #3c3c3c;\n  background: white;\n  background-color: rgba(255, 255, 255, 0.9);\n  text-transform: uppercase;\n  font-size: 10px;\n  padding: 3px;\n}\n\n.product-active {\n  background-color: green;\n  width: 8px;\n  height: 8px;\n  min-width: 8px;\n  border-radius: 30px;\n  border: 1px solid green;\n  margin-right: 10%;\n}\n\n.product-inactive {\n  background-color: red;\n  width: 8px;\n  height: 8px;\n  min-width: 8px;\n  border-radius: 30px;\n  border: 1px solid red;\n  margin-right: 10%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tcHJvZHVjdHMtb3B0aW9ucy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGFkbWluLXByb2R1Y3RzLW9wdGlvbnNcXGFkbWluLXByb2R1Y3RzLW9wdGlvbnMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZG1pbi1wcm9kdWN0cy1vcHRpb25zL2FkbWluLXByb2R1Y3RzLW9wdGlvbnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksWUFBQTtFQUNBLGdCQUFBO0FDQUo7O0FERUU7RUFDRSx5QkFBQTtFQUNBLDZCQUFBO0FDQ0o7O0FEQ0U7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUNFSjs7QURBRTtFQUNFLGtCQUFBO0FDR0o7O0FEREU7RUFDRSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtFQUNBLG9DQUFBO1VBQUEsNEJBQUE7RUFDQSwwQkFBQTtBQ0lKOztBREZBO0VBQ0ksaUJBQUE7QUNLSjs7QURIRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLHdDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxrQkFBQTtFQUNBLGdDQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQ0FBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUNNSjs7QURKRTtFQUNFLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGlCQUFBO0FDT0o7O0FETEU7RUFDRSxxQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtBQ1FKIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vYWRtaW4tcHJvZHVjdHMtb3B0aW9ucy9hZG1pbi1wcm9kdWN0cy1vcHRpb25zLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pb24tY29sLmltZ3tcclxuICAgIHdpZHRoOiAxMDBweDtcclxuICAgIG1heC13aWR0aDogMTAwcHg7XHJcbiAgfVxyXG4gIGlvbi1jb2wubmFtZXtcclxuICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAzNjBweCk7XHJcbiAgICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDMwMHB4KTtcclxuICB9XHJcbiAgaW9uLWNvbC5hY3Rpb257XHJcbiAgICB3aWR0aDogMTI4cHg7XHJcbiAgICBtYXgtd2lkdGg6IDEwMHB4O1xyXG4gIH1cclxuICAucHJvZHVjdC1pbWctd3JhcHBlciB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgfVxyXG4gIC5saXN0LWhlYWRlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgcGFkZGluZzogMTZweDtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICB0b3A6IDY0cHg7XHJcbiAgICB6LWluZGV4OiA5O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xNnB4KTtcclxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG59XHJcbi5saXN0LWNvbnRhaW5lcntcclxuICAgIG1hcmdpbi10b3A6MTAwcHg7XHJcbn1cclxuICAub3V0LW9mLXN0b2NrIHtcclxuICAgIHdpZHRoOiA5N3B4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgY29sb3I6IHJlZDtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgbGVmdDogNDAlO1xyXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgdGV4dC1zaGFkb3c6IDBweCAxcHggMXB4ICMzYzNjM2M7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsIDAuOSk7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgcGFkZGluZzogM3B4O1xyXG4gIH1cclxuICAucHJvZHVjdC1hY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XHJcbiAgICB3aWR0aDogOHB4O1xyXG4gICAgaGVpZ2h0OiA4cHg7XHJcbiAgICBtaW4td2lkdGg6IDhweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBncmVlbjtcclxuICAgIG1hcmdpbi1yaWdodDogMTAlO1xyXG4gIH1cclxuICAucHJvZHVjdC1pbmFjdGl2ZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XHJcbiAgICB3aWR0aDogOHB4O1xyXG4gICAgaGVpZ2h0OiA4cHg7XHJcbiAgICBtaW4td2lkdGg6IDhweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwJTtcclxuICB9XHJcbiAgIiwiaW9uLWNvbC5pbWcge1xuICB3aWR0aDogMTAwcHg7XG4gIG1heC13aWR0aDogMTAwcHg7XG59XG5cbmlvbi1jb2wubmFtZSB7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAzNjBweCk7XG4gIG1heC13aWR0aDogY2FsYygxMDAlIC0gMzAwcHgpO1xufVxuXG5pb24tY29sLmFjdGlvbiB7XG4gIHdpZHRoOiAxMjhweDtcbiAgbWF4LXdpZHRoOiAxMDBweDtcbn1cblxuLnByb2R1Y3QtaW1nLXdyYXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5saXN0LWhlYWRlciB7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIG1hcmdpbjogYXV0bztcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgdG9wOiA2NHB4O1xuICB6LWluZGV4OiA5O1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTE2cHgpO1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbn1cblxuLmxpc3QtY29udGFpbmVyIHtcbiAgbWFyZ2luLXRvcDogMTAwcHg7XG59XG5cbi5vdXQtb2Ytc3RvY2sge1xuICB3aWR0aDogOTdweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBjb2xvcjogcmVkO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNDAlO1xuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB0ZXh0LXNoYWRvdzogMHB4IDFweCAxcHggIzNjM2MzYztcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBwYWRkaW5nOiAzcHg7XG59XG5cbi5wcm9kdWN0LWFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xuICB3aWR0aDogOHB4O1xuICBoZWlnaHQ6IDhweDtcbiAgbWluLXdpZHRoOiA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyZWVuO1xuICBtYXJnaW4tcmlnaHQ6IDEwJTtcbn1cblxuLnByb2R1Y3QtaW5hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gIHdpZHRoOiA4cHg7XG4gIGhlaWdodDogOHB4O1xuICBtaW4td2lkdGg6IDhweDtcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xuICBtYXJnaW4tcmlnaHQ6IDEwJTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/admin-products-options/admin-products-options.page.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/admin/admin-products-options/admin-products-options.page.ts ***!
  \*****************************************************************************/
/*! exports provided: AdminProductsOptionsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminProductsOptionsPage", function() { return AdminProductsOptionsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");




let AdminProductsOptionsPage = class AdminProductsOptionsPage {
    constructor(events, router, route, loadingController) {
        this.events = events;
        this.router = router;
        this.route = route;
        this.loadingController = loadingController;
        this.showLoader = true;
        this.options = [];
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.productId = this.router.getCurrentNavigation().extras.state.pid;
            }
        });
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        this.initializeSubscriptions();
        this.events.publish('product-options:getAllProductOptions', this.productId);
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    removeSubscriptions() {
        this.events.unsubscribe('product-options:publishAllProductOptions');
        this.events.unsubscribe('product-options:deleteProductOptionSuccess');
    }
    initializeSubscriptions() {
        this.events.subscribe('product-options:publishAllProductOptions', (options) => {
            //console.log('options', options);
            this.options = options;
            this.showLoader = false;
        });
        this.events.subscribe('product-options:deleteProductOptionSuccess', () => {
            this.loading.dismiss();
        });
    }
    editProductOption(item) {
        const navigationExtras = {
            state: {
                product: item,
                optionId: item.id,
                productId: this.productId,
                isOptionProduct: true,
                routeFromOptions: true
            }
        };
        this.router.navigate(['new-product'], navigationExtras);
    }
    checkPdtOutOfDelivery(pdt) {
        //console.log('in checkPdtOutOfDelivery...');
        let isOutOfStock = false;
        if (!pdt.isPriceList) {
            if (pdt.productQty === '0') {
                isOutOfStock = true;
            }
        }
        else {
            for (let pl of pdt.priceList) {
                if (pl.totalQuantity === '0') {
                    isOutOfStock = true;
                    break;
                }
            }
        }
        //console.log('isOutOfStock', isOutOfStock);
        return isOutOfStock;
    }
    deleteProductOption(optionId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('product-options:deleteProductOption', optionId, this.productId);
        });
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Please wait...',
                duration: 5000
            });
            yield this.loading.present();
        });
    }
};
AdminProductsOptionsPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] }
];
AdminProductsOptionsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-admin-products-options',
        template: __webpack_require__(/*! raw-loader!./admin-products-options.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-products-options/admin-products-options.page.html"),
        styles: [__webpack_require__(/*! ./admin-products-options.page.scss */ "./src/app/admin/admin-products-options/admin-products-options.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"]])
], AdminProductsOptionsPage);



/***/ })

}]);
//# sourceMappingURL=admin-admin-products-options-admin-products-options-module-es2015.js.map