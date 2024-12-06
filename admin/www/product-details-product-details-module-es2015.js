(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["product-details-product-details-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/product-details/product-details.page.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/product-details/product-details.page.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"shop\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center style=\"margin-left: 48px;\">product details</ion-title>\r\n    <ion-buttons slot=\"end\">\r\n      <ion-button (click)=\"goToCart()\">\r\n        <i class=\"flaticon-shopping-cart\"></i>\r\n        <span class=\"cart-badge\" *ngIf=\"cartLength !== 0\">{{cartLength}}</span>\r\n      </ion-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div *ngIf=\"showLoader\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n  <div *ngIf=\"data && !showLoader\">\r\n    <ion-slides pager=\"true\" [options]=\"slideOpts\" loop=\"true\" *ngIf=\"data.images.length !== 0\">\r\n      <ion-slide *ngFor=\"let img of data.images; let i = index;\">\r\n        <div class=\"product-images\"\r\n          [ngStyle]=\"{'background': 'url(' + img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n          (click)=\"imageZoom(data.images, i)\"></div>\r\n      </ion-slide>\r\n    </ion-slides>\r\n    <div *ngIf=\"data.images.length === 0\" class=\"product-image-default\"></div>\r\n\r\n  </div>\r\n  <ion-grid *ngIf=\"data && !showLoader\" class=\"padding\">\r\n    <div *ngIf=\"data.discount && data.discount !== '' && data.discount !== '0'\" class=\"pd-off-percent\">\r\n      {{data.discount}}% off\r\n    </div>\r\n    <div *ngIf=\"data.stopWhenNoQty && data.productQty === '0'\" style=\"color: var(--ion-color-danger-shade);text-transform: uppercase;\">\r\n      Out of Stock\r\n    </div>\r\n    <ion-row>\r\n      <ion-col>\r\n        <p class=\"prod-name\">{{data.prodName}}</p>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row class=\"ion-justify-content-between\" *ngIf=\"!data.isPriceList;else showPriceList\">\r\n      <ion-col size-xs=\"4\" size-sm=\"3\" size-md=\"3\">\r\n        <ion-row class=\"ion-justify-content-start counter\">\r\n          <ion-col size=\"3\" class=\"ion-no-padding\">\r\n            <ion-icon name=\"remove\" (click)=\"decrementQuantity()\" class=\"minus-icon\"></ion-icon>\r\n          </ion-col>\r\n          <ion-col size=\"6\" class=\"ion-no-padding\">\r\n            <span class=\"counter-value\">{{currentQuantity}}</span>\r\n          </ion-col>\r\n          <ion-col size=\"3\" class=\"ion-no-padding\">\r\n            <ion-icon name=\"add\" (click)=\"incrementQuantity()\" class=\"add-icon\"></ion-icon>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-col>\r\n      <ion-col>\r\n        <div *ngIf=\"!data.isPriceList;else showPriceList\" style=\"text-align: end;\">\r\n          <div *ngIf=\"data.discount && data.discount !== '' && data.discount !== '0'; else showOriginalPrice;\">\r\n            <span class=\"discounted-prod-price\">{{getDiscountedProduct(data.prodPrice, data.discount) | currency: 'INR':true:'0.0'}}</span>\r\n            <span class=\"pd-original-price\"><del>{{data.prodPrice | currency: 'INR':true:'0.0'}}</del></span>\r\n          </div>\r\n          <ng-template #showOriginalPrice>\r\n            <div class=\"prod-price\">\r\n              {{data.prodPrice * currentQuantity | currency: 'INR':true}}\r\n            </div>\r\n          </ng-template>          \r\n        </div>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ng-template #showPriceList>\r\n      <ion-row class=\"ion-justify-content-between\">\r\n        <ion-col>\r\n          <div class=\"prod-desc\">\r\n            {{data.priceList[0].weight}}\r\n          </div>\r\n        </ion-col>\r\n        <ion-col>\r\n          <div *ngIf=\"data.discount && data.discount !== '' && data.discount !== '0'; else showPriceListOriginalPrice;\">\r\n            <span class=\"discounted-prod-price\">{{getDiscountedProduct(data.priceList[0].price, data.discount) | currency: 'INR':true:'0.0'}}</span>\r\n            <span class=\"pd-original-price\"><del>{{data.priceList[0].price | currency: 'INR':true:'0.0'}}</del></span>\r\n          </div>\r\n          <ng-template #showPriceListOriginalPrice>\r\n            <div class=\"prod-price\">\r\n              {{data.priceList[0].price | currency: 'INR':true:'0.0'}}\r\n            </div>\r\n          </ng-template>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ng-template>\r\n    <ion-row>\r\n      <ion-col>\r\n        <p class=\"prod-desc\">{{data.prodDesc}}</p>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-content>\r\n\r\n<div [hidden]=\"data && data.stopWhenNoQty && data.productQty === '0'\">\r\n<ion-footer class=\"product-details-footer\" *ngIf=\"!showLoader && !data.isPriceList\">\r\n  <ion-grid class=\"ion-no-padding\">\r\n    <ion-row class=\"ion-no-padding\">\r\n      <ion-col size=\"6\" class=\"ion-no-padding\">\r\n        <ion-title class=\"add-to-cart-btn\" text-center (click)=\"addToCart();\" *ngIf=\"!showGoToCart\"><i\r\n            class=\"flaticon-shopping-cart\"></i><span class=\"bottom-buttons\">add to cart</span></ion-title>\r\n        <ion-title class=\"add-to-cart-btn\" text-center (click)=\"goToCart();\" *ngIf=\"showGoToCart\"><i\r\n            class=\"flaticon-shopping-cart\"></i><span class=\"bottom-buttons\">go to cart</span></ion-title>\r\n      </ion-col>\r\n      <ion-col size=\"6\" class=\"ion-no-padding\">\r\n        <ion-title class=\"buy-now-btn\" text-center (click)=\"buyNowOrder()\">\r\n          <span class=\"bottom-buttons\" style=\"margin-left: 0px;\">buy now</span><i\r\n            class=\"flaticon-null-20 margin-icon\"></i>\r\n        </ion-title>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-footer>\r\n\r\n<ion-footer class=\"product-details-footer\" *ngIf=\"!showLoader && data.isPriceList && !data.stopWhenNoQty && data.productQty !== '0'\">\r\n  <ion-grid class=\"ion-no-padding\">\r\n    <ion-row class=\"ion-no-padding\">\r\n      <ion-col size=\"6\" class=\"ion-no-padding\">\r\n        <ion-title class=\"add-to-cart-btn\" text-center (click)=\"priceListAddToCart();\"><i\r\n            class=\"flaticon-shopping-cart\"></i><span class=\"bottom-buttons\">add to cart</span></ion-title>\r\n      </ion-col>\r\n      <ion-col size=\"6\" class=\"ion-no-padding\">\r\n        <ion-title class=\"buy-now-btn\" text-center (click)=\"openBuyNowPriceListModal()\">\r\n          <span class=\"bottom-buttons\" style=\"margin-left: 0px;\">buy now</span><i\r\n            class=\"flaticon-null-20 margin-icon\"></i>\r\n        </ion-title>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-footer>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/product-details/product-details.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/product-details/product-details.module.ts ***!
  \***********************************************************/
/*! exports provided: ProductDetailsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductDetailsPageModule", function() { return ProductDetailsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _product_details_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product-details.page */ "./src/app/product-details/product-details.page.ts");
/* harmony import */ var _buynow_pricelist_modal_buynow_pricelist_modal_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../buynow-pricelist-modal/buynow-pricelist-modal.page */ "./src/app/buynow-pricelist-modal/buynow-pricelist-modal.page.ts");








const routes = [
    {
        path: '',
        component: _product_details_page__WEBPACK_IMPORTED_MODULE_6__["ProductDetailsPage"]
    }
];
let ProductDetailsPageModule = class ProductDetailsPageModule {
};
ProductDetailsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
        ],
        declarations: [_product_details_page__WEBPACK_IMPORTED_MODULE_6__["ProductDetailsPage"], _buynow_pricelist_modal_buynow_pricelist_modal_page__WEBPACK_IMPORTED_MODULE_7__["BuynowPricelistModalPage"]],
        entryComponents: [_buynow_pricelist_modal_buynow_pricelist_modal_page__WEBPACK_IMPORTED_MODULE_7__["BuynowPricelistModalPage"]]
    })
], ProductDetailsPageModule);



/***/ }),

/***/ "./src/app/product-details/product-details.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/product-details/product-details.page.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".product-images {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n  width: 100%;\n  height: 60vh;\n}\n\n.product-image-default {\n  background: url('placeholder-img.jpg') center no-repeat;\n  width: 100%;\n  height: 60vh;\n}\n\n.slides {\n  border: 1px solid var(--ion-color-border-rgb);\n  box-shadow: 0px 0px 13px 0px var(--ion-color-shadow-rgb);\n  border-radius: 15px;\n  margin: 35px;\n  padding: 10px;\n}\n\n.card {\n  border: 1px solid var(--ion-color-border-rgb);\n  box-shadow: 0px 0px 13px 0px var(--ion-color-shadow-rgb);\n  border-radius: 10px;\n  margin: 35px;\n}\n\n.spinner {\n  margin-top: 50%;\n  text-align: center;\n}\n\n.counter {\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n}\n\n.counter-value {\n  border-left: 1px solid #ccc;\n  border-right: 1px solid #ccc;\n  display: block;\n  padding: 2px;\n  font-size: 20px;\n  color: var(--ion-color-primary);\n}\n\n.minus-icon {\n  font-size: 17px;\n  margin-top: 5px;\n}\n\n.add-icon {\n  font-size: 17px;\n  margin-top: 5px;\n}\n\n.prod-price {\n  color: var(--ion-color-primary);\n  font-size: 20px;\n  position: absolute;\n  right: 10px;\n}\n\n.discounted-prod-price {\n  color: var(--ion-color-primary);\n  font-size: 20px;\n}\n\n.prod-name {\n  color: black;\n  font-size: 20px;\n}\n\n.pd-original-price {\n  font-size: 18px;\n  opacity: 0.6;\n  margin-left: 4%;\n}\n\n.prod-desc {\n  color: #030303;\n  white-space: pre-wrap;\n  word-break: break-word;\n  line-height: 1.5;\n}\n\n.margin-icon {\n  margin-left: 5px;\n}\n\n.add-to-cart-btn {\n  background-color: var(--ion-color-dark);\n  color: white;\n}\n\n.buy-now-btn {\n  background-color: var(--ion-color-primary);\n  color: white;\n}\n\n.loading {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n}\n\n.padding {\n  padding: 8px;\n}\n\n.bottom-buttons {\n  font-size: 15px;\n  margin-left: 5px;\n}\n\n.product-details-footer ion-title {\n  height: 45px;\n}\n\n.product-details-footer {\n  box-shadow: 0px -4px 4px 0px #cccc;\n}\n\n.cart-badge {\n  padding: 3px 4px 2px 4px;\n  background-color: var(--ion-color-primary);\n  border-radius: 25px;\n  color: white;\n  border: 1px solid white;\n  font-size: 10px;\n  margin-top: -10px;\n  position: relative;\n  right: 3px;\n  font-weight: 600;\n}\n\nion-button .flaticon-null-3::before {\n  font-size: 17px;\n}\n\n.flaticon-null-23::before {\n  font-size: 12px;\n}\n\n.pricelist-arrow {\n  opacity: 0.8;\n  margin-right: 5px;\n  border-left: 1px solid #ccc;\n  padding-left: 7px;\n  line-height: 25px;\n}\n\n.pricelist-box {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  border: 1px solid #ccc;\n  margin-left: 7px;\n  padding: 3px;\n  margin-bottom: 10px;\n}\n\n.pd-off-percent {\n  font-size: small;\n  background-color: #4cae1a;\n  width: 70px;\n  text-align: center;\n  color: white;\n  padding: 3px 3px 2px 3px;\n  border-radius: 3px;\n  text-transform: uppercase;\n}\n\n@media screen and (min-width: 600px) {\n  .slides {\n    margin: 0;\n  }\n}\n\n@media screen and (min-width: 768px) {\n  .prod-name {\n    font-size: 30px;\n  }\n\n  .prod-price {\n    font-size: 36px;\n  }\n\n  [class^=flaticon-]:before, [class*=\" flaticon-\"]:before, [class^=flaticon-]:after, [class*=\" flaticon-\"]:after {\n    font-size: 25px;\n  }\n\n  .bottom-button {\n    font-size: 25px;\n  }\n\n  .slides {\n    margin: auto;\n  }\n\n  .counter-value {\n    padding: 8px;\n    font-size: 30px;\n  }\n\n  .minus-icon {\n    font-size: 25px;\n  }\n\n  .add-icon {\n    font-size: 25px;\n  }\n\n  .ion-padding {\n    --padding-start: var(--ion-padding, 16px);\n    --padding-end: var(--ion-padding, 16px);\n    --padding-top: var(--ion-padding, 16px);\n    --padding-bottom: var(--ion-padding, 16px);\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .prod-name {\n    font-size: 35px;\n  }\n\n  .prod-price {\n    font-size: 40px;\n  }\n\n  [class^=flaticon-]:before, [class*=\" flaticon-\"]:before, [class^=flaticon-]:after, [class*=\" flaticon-\"]:after {\n    font-size: 30px;\n  }\n\n  .bottom-button {\n    font-size: 30px;\n  }\n\n  .counter-value {\n    padding: 12px;\n    font-size: 35px;\n  }\n\n  .minus-icon {\n    font-size: 30px;\n  }\n\n  .add-icon {\n    font-size: 30px;\n  }\n\n  .ion-padding {\n    --padding-start: var(--ion-padding, 16px);\n    --padding-end: var(--ion-padding, 16px);\n    --padding-top: var(--ion-padding, 16px);\n    --padding-bottom: var(--ion-padding, 16px);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvZHVjdC1kZXRhaWxzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxwcm9kdWN0LWRldGFpbHNcXHByb2R1Y3QtZGV0YWlscy5wYWdlLnNjc3MiLCJzcmMvYXBwL3Byb2R1Y3QtZGV0YWlscy9wcm9kdWN0LWRldGFpbHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksc0dBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQ0NKOztBRENBO0VBQ0ksdURBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQ0VKOztBREFBO0VBQ0ksNkNBQUE7RUFDQSx3REFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7QUNHSjs7QUREQTtFQUNJLDZDQUFBO0VBQ0Esd0RBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUNJSjs7QURGQTtFQUNJLGVBQUE7RUFDQSxrQkFBQTtBQ0tKOztBREhBO0VBQ0ksc0JBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0Esa0JBQUE7QUNNSjs7QURKQTtFQUNJLDJCQUFBO0VBQ0EsNEJBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSwrQkFBQTtBQ09KOztBRExBO0VBQ0ksZUFBQTtFQUNBLGVBQUE7QUNRSjs7QUROQTtFQUNJLGVBQUE7RUFDQSxlQUFBO0FDU0o7O0FEUEE7RUFDSSwrQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUNVSjs7QURSQTtFQUNJLCtCQUFBO0VBQ0EsZUFBQTtBQ1dKOztBRFRBO0VBQ0ksWUFBQTtFQUNBLGVBQUE7QUNZSjs7QURWQTtFQUNJLGVBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtBQ2FKOztBRFhBO0VBQ0ksY0FBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtBQ2NKOztBRFpBO0VBQ0ksZ0JBQUE7QUNlSjs7QURiQTtFQUNJLHVDQUFBO0VBQ0EsWUFBQTtBQ2dCSjs7QURkRTtFQUNFLDBDQUFBO0VBQ0EsWUFBQTtBQ2lCSjs7QURmQTtFQUNJLHNHQUFBO0FDa0JKOztBRGhCRTtFQUNFLFlBQUE7QUNtQko7O0FEakJFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FDb0JKOztBRGxCRTtFQUNFLFlBQUE7QUNxQko7O0FEbkJBO0VBQ0Usa0NBQUE7QUNzQkY7O0FEcEJBO0VBQ0ksd0JBQUE7RUFDQSwwQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7QUN1Qko7O0FEckJBO0VBQ0ksZUFBQTtBQ3dCSjs7QUR0QkE7RUFDSSxlQUFBO0FDeUJKOztBRHZCQTtFQUNJLFlBQUE7RUFDQSxpQkFBQTtFQUNBLDJCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtBQzBCSjs7QUR4QkE7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7QUMyQko7O0FEeEJBO0VBQ0ksZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSx3QkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7QUMyQko7O0FEWkE7RUFDTTtJQUNJLFNBQUE7RUNlUjtBQUNGOztBRFhBO0VBQ0k7SUFDSSxlQUFBO0VDYU47O0VEWEU7SUFDSSxlQUFBO0VDY047O0VEWEU7SUFDSSxlQUFBO0VDY047O0VEWk07SUFDSSxlQUFBO0VDZVY7O0VEYk07SUFDSSxZQUFBO0VDZ0JWOztFRGJFO0lBQ0ksWUFBQTtJQUNBLGVBQUE7RUNnQk47O0VEZEU7SUFDSSxlQUFBO0VDaUJOOztFRGZFO0lBQ0ksZUFBQTtFQ2tCTjs7RURoQkU7SUFDSSx5Q0FBQTtJQUNBLHVDQUFBO0lBQ0EsdUNBQUE7SUFDQSwwQ0FBQTtFQ21CTjtBQUNGOztBRGpCQTtFQUNJO0lBQ0ksZUFBQTtFQ21CTjs7RURqQkU7SUFDSSxlQUFBO0VDb0JOOztFRGpCRTtJQUNJLGVBQUE7RUNvQk47O0VEbEJNO0lBQ0ksZUFBQTtFQ3FCVjs7RURsQk07SUFDSSxhQUFBO0lBQ0EsZUFBQTtFQ3FCVjs7RURuQk07SUFDSSxlQUFBO0VDc0JWOztFRHBCTTtJQUNJLGVBQUE7RUN1QlY7O0VEckJNO0lBQ0kseUNBQUE7SUFDQSx1Q0FBQTtJQUNBLHVDQUFBO0lBQ0EsMENBQUE7RUN3QlY7QUFDRiIsImZpbGUiOiJzcmMvYXBwL3Byb2R1Y3QtZGV0YWlscy9wcm9kdWN0LWRldGFpbHMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnByb2R1Y3QtaW1hZ2Vze1xyXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKCdodHRwczovL3M1LmdpZnl1LmNvbS9pbWFnZXMvbG9hZGVyYmIxOWVmY2MyNzQ5ZTExNS5naWYnKSBjZW50ZXIgbm8tcmVwZWF0O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDYwdmg7XHJcbn1cclxuLnByb2R1Y3QtaW1hZ2UtZGVmYXVsdHtcclxuICAgIGJhY2tncm91bmQ6IHVybCgnLi4vLi4vYXNzZXRzL2ltZy9wbGFjZWhvbGRlci1pbWcuanBnJykgY2VudGVyIG5vLXJlcGVhdDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiA2MHZoO1xyXG59XHJcbi5zbGlkZXN7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItYm9yZGVyLXJnYik7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDEzcHggMHB4IHZhcigtLWlvbi1jb2xvci1zaGFkb3ctcmdiKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbiAgICBtYXJnaW46IDM1cHg7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcbi5jYXJkIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1ib3JkZXItcmdiKTtcclxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggMTNweCAwcHggdmFyKC0taW9uLWNvbG9yLXNoYWRvdy1yZ2IpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIG1hcmdpbjogMzVweDtcclxufVxyXG4uc3Bpbm5lcntcclxuICAgIG1hcmdpbi10b3A6IDUwJTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4uY291bnRlcntcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuLmNvdW50ZXItdmFsdWV7XHJcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBwYWRkaW5nOiAycHg7XHJcbiAgICBmb250LXNpemU6MjBweDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbn1cclxuLm1pbnVzLWljb257XHJcbiAgICBmb250LXNpemU6IDE3cHg7XHJcbiAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbn1cclxuLmFkZC1pY29ue1xyXG4gICAgZm9udC1zaXplOiAxN3B4O1xyXG4gICAgbWFyZ2luLXRvcDogNXB4O1xyXG59XHJcbi5wcm9kLXByaWNle1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHJpZ2h0OiAxMHB4O1xyXG59XHJcbi5kaXNjb3VudGVkLXByb2QtcHJpY2V7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG59XHJcbi5wcm9kLW5hbWV7XHJcbiAgICBjb2xvcjogcmdiKDAsIDAsIDApO1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG59XHJcbi5wZC1vcmlnaW5hbC1wcmljZSB7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBvcGFjaXR5OiAuNjtcclxuICAgIG1hcmdpbi1sZWZ0OiA0JTtcclxufVxyXG4ucHJvZC1kZXNje1xyXG4gICAgY29sb3I6IHJnYigzLCAzLCAzKTtcclxuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcclxuICAgIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XHJcbiAgICBsaW5lLWhlaWdodDogMS41O1xyXG59XHJcbi5tYXJnaW4taWNvbntcclxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbn1cclxuLmFkZC10by1jYXJ0LWJ0bntcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICAgIGNvbG9yOiB3aGl0ZVxyXG4gIH1cclxuICAuYnV5LW5vdy1idG57XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBjb2xvcjogd2hpdGVcclxuICB9XHJcbi5sb2FkaW5nIHtcclxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybCgnaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzL2xvYWRlcmJiMTllZmNjMjc0OWUxMTUuZ2lmJykgY2VudGVyIG5vLXJlcGVhdDtcclxuICB9XHJcbiAgLnBhZGRpbmcge1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG4gIH1cclxuICAuYm90dG9tLWJ1dHRvbnN7XHJcbiAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gIH1cclxuICAucHJvZHVjdC1kZXRhaWxzLWZvb3RlciBpb24tdGl0bGV7XHJcbiAgICBoZWlnaHQ6IDQ1cHg7XHJcbn1cclxuLnByb2R1Y3QtZGV0YWlscy1mb290ZXJ7XHJcbiAgYm94LXNoYWRvdzogMHB4IC00cHggNHB4IDBweCAjY2NjYztcclxufVxyXG4uY2FydC1iYWRnZXtcclxuICAgIHBhZGRpbmc6IDNweCA0cHggMnB4IDRweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIG1hcmdpbi10b3A6IC0xMHB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgcmlnaHQ6IDNweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuaW9uLWJ1dHRvbiAuZmxhdGljb24tbnVsbC0zOjpiZWZvcmV7XHJcbiAgICBmb250LXNpemU6IDE3cHg7XHJcbn1cclxuLmZsYXRpY29uLW51bGwtMjM6OmJlZm9yZSB7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbn1cclxuLnByaWNlbGlzdC1hcnJvdyB7XHJcbiAgICBvcGFjaXR5OiAuODtcclxuICAgIG1hcmdpbi1yaWdodDogNXB4O1xyXG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgcGFkZGluZy1sZWZ0OiA3cHg7XHJcbiAgICBsaW5lLWhlaWdodDogMjVweDtcclxufVxyXG4ucHJpY2VsaXN0LWJveHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIG1hcmdpbi1sZWZ0OiA3cHg7XHJcbiAgICBwYWRkaW5nOiAzcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4ucGQtb2ZmLXBlcmNlbnQge1xyXG4gICAgZm9udC1zaXplOiBzbWFsbDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NiwgMTc0LCAyNik7XHJcbiAgICB3aWR0aDogNzBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIHBhZGRpbmc6IDNweCAzcHggMnB4IDNweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbn1cclxuXHJcblxyXG4vL01FRElBIFFVRVJJRVNcclxuQG1lZGlhIHNjcmVlbiBhbmQobWF4LXdpZHRoOiAzNzVweCl7XHJcbiAgICBcclxufVxyXG5AbWVkaWEgc2NyZWVuIGFuZChtYXgtd2lkdGg6IDM2MHB4KXtcclxuICAgIFxyXG59XHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1heC13aWR0aDogMzIwcHgpe1xyXG4gICAgICBcclxuICBcclxuICB9XHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1pbi13aWR0aDogNjAwcHgpe1xyXG4gICAgICAuc2xpZGVze1xyXG4gICAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gIFxyXG4gIH1cclxuQG1lZGlhIHNjcmVlbiBhbmQobWluLXdpZHRoOjc2OHB4KXtcclxuICAgIC5wcm9kLW5hbWV7XHJcbiAgICAgICAgZm9udC1zaXplOiAzMHB4O1xyXG4gICAgfVxyXG4gICAgLnByb2QtcHJpY2V7XHJcbiAgICAgICAgZm9udC1zaXplOiAzNnB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBbY2xhc3NePVwiZmxhdGljb24tXCJdOmJlZm9yZSwgW2NsYXNzKj1cIiBmbGF0aWNvbi1cIl06YmVmb3JlLCBbY2xhc3NePVwiZmxhdGljb24tXCJdOmFmdGVyLCBbY2xhc3MqPVwiIGZsYXRpY29uLVwiXTphZnRlciB7XHJcbiAgICAgICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuYm90dG9tLWJ1dHRvbntcclxuICAgICAgICAgICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuc2xpZGVze1xyXG4gICAgICAgICAgICBtYXJnaW46IGF1dG87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgLmNvdW50ZXItdmFsdWV7XHJcbiAgICAgICAgcGFkZGluZzogOHB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMzBweDtcclxuICAgIH1cclxuICAgIC5taW51cy1pY29ue1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIH1cclxuICAgIC5hZGQtaWNvbntcclxuICAgICAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICB9XHJcbiAgICAuaW9uLXBhZGRpbmcge1xyXG4gICAgICAgIC0tcGFkZGluZy1zdGFydDogdmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpO1xyXG4gICAgICAgIC0tcGFkZGluZy1lbmQ6IHZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtcclxuICAgICAgICAtLXBhZGRpbmctdG9wOiB2YXIoLS1pb24tcGFkZGluZywgMTZweCk7XHJcbiAgICAgICAgLS1wYWRkaW5nLWJvdHRvbTogdmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpO1xyXG4gICAgfVxyXG59XHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1pbi13aWR0aDoxMDI0cHgpe1xyXG4gICAgLnByb2QtbmFtZXtcclxuICAgICAgICBmb250LXNpemU6IDM1cHg7XHJcbiAgICB9XHJcbiAgICAucHJvZC1wcmljZXtcclxuICAgICAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFtjbGFzc149XCJmbGF0aWNvbi1cIl06YmVmb3JlLCBbY2xhc3MqPVwiIGZsYXRpY29uLVwiXTpiZWZvcmUsIFtjbGFzc149XCJmbGF0aWNvbi1cIl06YWZ0ZXIsIFtjbGFzcyo9XCIgZmxhdGljb24tXCJdOmFmdGVyIHtcclxuICAgICAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ib3R0b20tYnV0dG9ue1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC5jb3VudGVyLXZhbHVle1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAxMnB4O1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDM1cHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5taW51cy1pY29ue1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5hZGQtaWNvbntcclxuICAgICAgICAgICAgZm9udC1zaXplOiAzMHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuaW9uLXBhZGRpbmcge1xyXG4gICAgICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IHZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtcclxuICAgICAgICAgICAgLS1wYWRkaW5nLWVuZDogdmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpO1xyXG4gICAgICAgICAgICAtLXBhZGRpbmctdG9wOiB2YXIoLS1pb24tcGFkZGluZywgMTZweCk7XHJcbiAgICAgICAgICAgIC0tcGFkZGluZy1ib3R0b206IHZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtcclxuICAgICAgICB9XHJcbn0iLCIucHJvZHVjdC1pbWFnZXMge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXCJodHRwczovL3M1LmdpZnl1LmNvbS9pbWFnZXMvbG9hZGVyYmIxOWVmY2MyNzQ5ZTExNS5naWZcIikgY2VudGVyIG5vLXJlcGVhdDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNjB2aDtcbn1cblxuLnByb2R1Y3QtaW1hZ2UtZGVmYXVsdCB7XG4gIGJhY2tncm91bmQ6IHVybChcIi4uLy4uL2Fzc2V0cy9pbWcvcGxhY2Vob2xkZXItaW1nLmpwZ1wiKSBjZW50ZXIgbm8tcmVwZWF0O1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA2MHZoO1xufVxuXG4uc2xpZGVzIHtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWJvcmRlci1yZ2IpO1xuICBib3gtc2hhZG93OiAwcHggMHB4IDEzcHggMHB4IHZhcigtLWlvbi1jb2xvci1zaGFkb3ctcmdiKTtcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgbWFyZ2luOiAzNXB4O1xuICBwYWRkaW5nOiAxMHB4O1xufVxuXG4uY2FyZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1ib3JkZXItcmdiKTtcbiAgYm94LXNoYWRvdzogMHB4IDBweCAxM3B4IDBweCB2YXIoLS1pb24tY29sb3Itc2hhZG93LXJnYik7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIG1hcmdpbjogMzVweDtcbn1cblxuLnNwaW5uZXIge1xuICBtYXJnaW4tdG9wOiA1MCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmNvdW50ZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5jb3VudGVyLXZhbHVlIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2NjO1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogMnB4O1xuICBmb250LXNpemU6IDIwcHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG59XG5cbi5taW51cy1pY29uIHtcbiAgZm9udC1zaXplOiAxN3B4O1xuICBtYXJnaW4tdG9wOiA1cHg7XG59XG5cbi5hZGQtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMTdweDtcbiAgbWFyZ2luLXRvcDogNXB4O1xufVxuXG4ucHJvZC1wcmljZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMTBweDtcbn1cblxuLmRpc2NvdW50ZWQtcHJvZC1wcmljZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLnByb2QtbmFtZSB7XG4gIGNvbG9yOiBibGFjaztcbiAgZm9udC1zaXplOiAyMHB4O1xufVxuXG4ucGQtb3JpZ2luYWwtcHJpY2Uge1xuICBmb250LXNpemU6IDE4cHg7XG4gIG9wYWNpdHk6IDAuNjtcbiAgbWFyZ2luLWxlZnQ6IDQlO1xufVxuXG4ucHJvZC1kZXNjIHtcbiAgY29sb3I6ICMwMzAzMDM7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbn1cblxuLm1hcmdpbi1pY29uIHtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cblxuLmFkZC10by1jYXJ0LWJ0biB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uYnV5LW5vdy1idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmxvYWRpbmcge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXCJodHRwczovL3M1LmdpZnl1LmNvbS9pbWFnZXMvbG9hZGVyYmIxOWVmY2MyNzQ5ZTExNS5naWZcIikgY2VudGVyIG5vLXJlcGVhdDtcbn1cblxuLnBhZGRpbmcge1xuICBwYWRkaW5nOiA4cHg7XG59XG5cbi5ib3R0b20tYnV0dG9ucyB7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cblxuLnByb2R1Y3QtZGV0YWlscy1mb290ZXIgaW9uLXRpdGxlIHtcbiAgaGVpZ2h0OiA0NXB4O1xufVxuXG4ucHJvZHVjdC1kZXRhaWxzLWZvb3RlciB7XG4gIGJveC1zaGFkb3c6IDBweCAtNHB4IDRweCAwcHggI2NjY2M7XG59XG5cbi5jYXJ0LWJhZGdlIHtcbiAgcGFkZGluZzogM3B4IDRweCAycHggNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgbWFyZ2luLXRvcDogLTEwcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcmlnaHQ6IDNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuaW9uLWJ1dHRvbiAuZmxhdGljb24tbnVsbC0zOjpiZWZvcmUge1xuICBmb250LXNpemU6IDE3cHg7XG59XG5cbi5mbGF0aWNvbi1udWxsLTIzOjpiZWZvcmUge1xuICBmb250LXNpemU6IDEycHg7XG59XG5cbi5wcmljZWxpc3QtYXJyb3cge1xuICBvcGFjaXR5OiAwLjg7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNjY2M7XG4gIHBhZGRpbmctbGVmdDogN3B4O1xuICBsaW5lLWhlaWdodDogMjVweDtcbn1cblxuLnByaWNlbGlzdC1ib3gge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIG1hcmdpbi1sZWZ0OiA3cHg7XG4gIHBhZGRpbmc6IDNweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLnBkLW9mZi1wZXJjZW50IHtcbiAgZm9udC1zaXplOiBzbWFsbDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRjYWUxYTtcbiAgd2lkdGg6IDcwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAzcHggM3B4IDJweCAzcHg7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjAwcHgpIHtcbiAgLnNsaWRlcyB7XG4gICAgbWFyZ2luOiAwO1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAucHJvZC1uYW1lIHtcbiAgICBmb250LXNpemU6IDMwcHg7XG4gIH1cblxuICAucHJvZC1wcmljZSB7XG4gICAgZm9udC1zaXplOiAzNnB4O1xuICB9XG5cbiAgW2NsYXNzXj1mbGF0aWNvbi1dOmJlZm9yZSwgW2NsYXNzKj1cIiBmbGF0aWNvbi1cIl06YmVmb3JlLCBbY2xhc3NePWZsYXRpY29uLV06YWZ0ZXIsIFtjbGFzcyo9XCIgZmxhdGljb24tXCJdOmFmdGVyIHtcbiAgICBmb250LXNpemU6IDI1cHg7XG4gIH1cblxuICAuYm90dG9tLWJ1dHRvbiB7XG4gICAgZm9udC1zaXplOiAyNXB4O1xuICB9XG5cbiAgLnNsaWRlcyB7XG4gICAgbWFyZ2luOiBhdXRvO1xuICB9XG5cbiAgLmNvdW50ZXItdmFsdWUge1xuICAgIHBhZGRpbmc6IDhweDtcbiAgICBmb250LXNpemU6IDMwcHg7XG4gIH1cblxuICAubWludXMtaWNvbiB7XG4gICAgZm9udC1zaXplOiAyNXB4O1xuICB9XG5cbiAgLmFkZC1pY29uIHtcbiAgICBmb250LXNpemU6IDI1cHg7XG4gIH1cblxuICAuaW9uLXBhZGRpbmcge1xuICAgIC0tcGFkZGluZy1zdGFydDogdmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpO1xuICAgIC0tcGFkZGluZy1lbmQ6IHZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtcbiAgICAtLXBhZGRpbmctdG9wOiB2YXIoLS1pb24tcGFkZGluZywgMTZweCk7XG4gICAgLS1wYWRkaW5nLWJvdHRvbTogdmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpO1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDI0cHgpIHtcbiAgLnByb2QtbmFtZSB7XG4gICAgZm9udC1zaXplOiAzNXB4O1xuICB9XG5cbiAgLnByb2QtcHJpY2Uge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgfVxuXG4gIFtjbGFzc149ZmxhdGljb24tXTpiZWZvcmUsIFtjbGFzcyo9XCIgZmxhdGljb24tXCJdOmJlZm9yZSwgW2NsYXNzXj1mbGF0aWNvbi1dOmFmdGVyLCBbY2xhc3MqPVwiIGZsYXRpY29uLVwiXTphZnRlciB7XG4gICAgZm9udC1zaXplOiAzMHB4O1xuICB9XG5cbiAgLmJvdHRvbS1idXR0b24ge1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgfVxuXG4gIC5jb3VudGVyLXZhbHVlIHtcbiAgICBwYWRkaW5nOiAxMnB4O1xuICAgIGZvbnQtc2l6ZTogMzVweDtcbiAgfVxuXG4gIC5taW51cy1pY29uIHtcbiAgICBmb250LXNpemU6IDMwcHg7XG4gIH1cblxuICAuYWRkLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgfVxuXG4gIC5pb24tcGFkZGluZyB7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiB2YXIoLS1pb24tcGFkZGluZywgMTZweCk7XG4gICAgLS1wYWRkaW5nLWVuZDogdmFyKC0taW9uLXBhZGRpbmcsIDE2cHgpO1xuICAgIC0tcGFkZGluZy10b3A6IHZhcigtLWlvbi1wYWRkaW5nLCAxNnB4KTtcbiAgICAtLXBhZGRpbmctYm90dG9tOiB2YXIoLS1pb24tcGFkZGluZywgMTZweCk7XG4gIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/product-details/product-details.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/product-details/product-details.page.ts ***!
  \*********************************************************/
/*! exports provided: ProductDetailsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductDetailsPage", function() { return ProductDetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var _pricelist_modal_pricelist_modal_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../pricelist-modal/pricelist-modal.page */ "./src/app/pricelist-modal/pricelist-modal.page.ts");
/* harmony import */ var _buynow_pricelist_modal_buynow_pricelist_modal_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../buynow-pricelist-modal/buynow-pricelist-modal.page */ "./src/app/buynow-pricelist-modal/buynow-pricelist-modal.page.ts");









let ProductDetailsPage = class ProductDetailsPage {
    constructor(route, router, events, userService, loadingController, platform, modalController, alertController, storage) {
        this.route = route;
        this.router = router;
        this.events = events;
        this.userService = userService;
        this.loadingController = loadingController;
        this.platform = platform;
        this.modalController = modalController;
        this.alertController = alertController;
        this.storage = storage;
        this.slideOpts = {
            initialSlide: 0,
            speed: 400
        };
        this.orderInfo = {
            productId: null,
            quantity: null,
            name: null,
            price: null,
            img: null
        };
        this.cartObj = {
            name: null,
            quantity: null,
            price: null,
            img: null,
            description: null,
            productId: null,
            commentMsg: '',
            commentImgs: []
        };
        this.currentQuantity = 1;
        this.showLoader = true;
        this.cartLength = 0;
        this.showGoToCart = false;
        this.cartProducts = [];
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.productId = this.router.getCurrentNavigation().extras.state.productId;
                //console.log('productId in product details', this.productId);
            }
        });
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        this.events.publish('product:getProductWithId', this.productId);
        this.storage.get('uid').then((val) => {
            this.events.publish('user:getLengthOfCartProducts', val);
        });
        this.initializeSubscriptions();
        this.devWidth = this.platform.width();
        if (this.devWidth <= 500) {
            this.useThumb = true;
        }
        else if (this.devWidth > 500) {
            this.useThumb = false;
        }
        this.storage.get('listOfProductIdsInCart').then((val) => {
            //console.log('productId in product details', this.productId);
            //console.log('listOfProductIdsInCart in product details', val.indexOf(this.productId));
            if (val.indexOf(this.productId) !== -1) {
                this.showGoToCart = true;
            }
        });
        this.events.publish('user:getUserCartProducts');
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('product:publishgetProductWithId', (productData) => {
            //console.log('productData', productData);
            this.data = productData;
            //console.log('p data', this.data);
            this.showLoader = false;
        });
        this.events.subscribe('user:orderSuccessfullyPlaced', () => {
            this.presentAlert('Order Placed! Do you wish to continue Shopping ?');
            this.loading.dismiss();
        });
        this.events.subscribe('user:productAddedToCart', () => {
            this.loading.dismiss();
            this.cartAlert('Item Added To Cart');
        });
        this.events.subscribe('user:publishLengthOfCartProducts', (cartLength) => {
            this.cartLength = cartLength;
        });
        this.events.subscribe('user:publishUserCartProducts', (cartProducts) => {
            this.cartProducts = cartProducts;
            //console.log('cartProducts', this.cartProducts);
        });
    }
    decrementQuantity() {
        if (this.currentQuantity > 1) {
            this.currentQuantity--;
        }
    }
    incrementQuantity() {
        this.currentQuantity++;
    }
    addToCart() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let userId = this.userService.getUserId();
            //console.log('uid in sc', userId);
            if (userId === '') {
                //console.log('in if of uid');
                this.router.navigate(['home']);
            }
            else {
                this.storage.get('userRole').then((role) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                    if (role === 'admin') {
                        this.adminOrDeliveryOrderAlert('Admin can not place any order!');
                    }
                    else if (role === 'deliveryAgent') {
                        this.adminOrDeliveryOrderAlert('Delivery agent can not place any order!');
                    }
                    else {
                        this.loading = yield this.loadingController.create({
                            message: 'Please Wait...',
                            duration: 5000,
                            backdropDismiss: false
                        });
                        yield this.loading.present();
                        this.cartObj.name = this.data.prodName;
                        this.cartObj.quantity = this.currentQuantity;
                        this.cartObj.img = this.data.coverPic;
                        this.cartObj.description = this.data.prodDesc;
                        this.cartObj.productId = this.productId;
                        if (this.data.discount && this.data.discount !== '' && this.data.discount !== '0') {
                            this.cartObj['price'] = Math.ceil(this.data.prodPrice - (this.data.prodPrice * ((this.data.discount * 1) / 100)));
                        }
                        else {
                            this.cartObj['price'] = this.data.prodPrice;
                        }
                        this.events.publish('user:addProductToCart', this.cartObj, true);
                    }
                }));
            }
        });
    }
    buyNowOrder() {
        let userId = this.userService.getUserId();
        //console.log('uid in sc', userId);
        if (userId === '') {
            //console.log('in if of uid');
            this.router.navigate(['home']);
        }
        else {
            this.storage.get('userRole').then((role) => {
                if (role === 'admin') {
                    this.adminOrDeliveryOrderAlert("Admin can not place any order!");
                }
                else if (role === 'deliveryAgent') {
                    this.adminOrDeliveryOrderAlert('Delivery agent can not place any order!');
                }
                else {
                    this.cartObj.name = this.data.prodName;
                    this.cartObj.quantity = this.currentQuantity;
                    this.cartObj.img = this.data.coverPic;
                    this.cartObj.description = this.data.prodDesc;
                    this.cartObj.productId = this.productId;
                    if (this.data.discount && this.data.discount !== '' && this.data.discount !== '0') {
                        this.cartObj['price'] = Math.ceil(this.data.prodPrice - (this.data.prodPrice * ((this.data.discount * 1) / 100)));
                    }
                    else {
                        this.cartObj['price'] = this.data.prodPrice;
                    }
                    let buyNowOrderProduct = [];
                    buyNowOrderProduct.push(this.cartObj);
                    this.storage.set('productsInCart', buyNowOrderProduct);
                    this.storage.set('buyNowOrder', true);
                    this.storage.get('userDefaultAddress').then((address) => {
                        //console.log(address);
                        if (!address) {
                            const navigationExtras = {
                                state: {
                                    routeFromCheckoutPage: true,
                                }
                            };
                            this.router.navigate(['new-address'], navigationExtras);
                        }
                        else {
                            this.router.navigate(['order-summary']);
                        }
                    });
                }
            });
        }
    }
    goToCart() {
        let userId = this.userService.getUserId();
        //console.log('uid in sc', userId);
        if (userId === '') {
            //console.log('in if of uid');
            this.router.navigate(['home']);
        }
        else {
            this.storage.get('userRole').then((role) => {
                if (role === 'admin') {
                    this.adminOrDeliveryOrderAlert('Cart is available only for user not for admin.');
                }
                else if (role === 'deliveryAgent') {
                    this.adminOrDeliveryOrderAlert('Cart is available only for user not for delivery agent.');
                }
                else {
                    const navigationExtras = {
                        state: {
                            routeFromProductDetailsPage: true,
                        }
                    };
                    this.router.navigate(['user-cart'], navigationExtras);
                }
            });
        }
    }
    imageZoom(images, index) {
        this.modalController.create({
            component: _image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_5__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: images,
                index: index
            }
        }).then(modal => modal.present());
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Please Wait...',
            });
            yield this.loading.present();
        });
    }
    presentAlert(desc) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: desc,
                buttons: [{
                        text: 'Continue',
                        handler: () => {
                            this.router.navigate(['shop']);
                        }
                    }, {
                        text: 'Check My Order',
                        handler: () => {
                            this.router.navigate(['chat-bot']);
                        }
                    }]
            });
            yield alert.present();
        });
    }
    cartAlert(desc) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: desc,
                buttons: [{
                        text: 'Continue',
                        handler: () => {
                            this.router.navigate(['shop']);
                        }
                    }, {
                        text: 'Go To Cart',
                        handler: () => {
                            const navigationExtras = {
                                state: {
                                    routeFromProductDetailsPage: true,
                                }
                            };
                            this.router.navigate(['user-cart'], navigationExtras);
                        }
                    }]
            });
            yield alert.present();
        });
    }
    adminOrDeliveryOrderAlert(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: [{
                        text: 'Ok',
                        handler: () => {
                            this.router.navigate(['shop']);
                        }
                    }]
            });
            yield alert.present();
        });
    }
    priceListAddToCart() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let userId = this.userService.getUserId();
            //console.log('uid in sc', userId);
            if (userId === '') {
                //console.log('in if of uid');
                this.router.navigate(['home']);
            }
            else {
                this.storage.get('userRole').then((role) => {
                    if (role === 'admin') {
                        this.adminOrDeliveryOrderAlert('Admin can not place any order!');
                    }
                    else if (role === 'deliveryAgent') {
                        this.adminOrDeliveryOrderAlert('Delivery agent can not place any order!');
                    }
                    else {
                        let listOfWeights = [];
                        for (let i = 0; i < this.data.priceList.length; i++) {
                            listOfWeights.push(this.data.priceList[i].weight);
                        }
                        this.data.priceList.map((entry) => {
                            entry.quantity = 0;
                        });
                        this.modalController.create({
                            component: _pricelist_modal_pricelist_modal_page__WEBPACK_IMPORTED_MODULE_7__["PricelistModalPage"],
                            cssClass: 'auto-height',
                            componentProps: {
                                product: {
                                    id: this.productId,
                                    data: this.data
                                },
                                listOfWeights: listOfWeights,
                                cartProducts: this.cartProducts
                            }
                        })
                            .then(modalEl => {
                            modalEl.present();
                        });
                    }
                });
            }
        });
    }
    openBuyNowPriceListModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let userId = this.userService.getUserId();
            //console.log('uid in sc', userId);
            if (userId === '') {
                //console.log('in if of uid');
                this.router.navigate(['home']);
            }
            else {
                this.storage.get('userRole').then((role) => {
                    if (role === 'admin') {
                        this.adminOrDeliveryOrderAlert('Admin can not place any order!');
                    }
                    else if (role === 'deliveryAgent') {
                        this.adminOrDeliveryOrderAlert('Delivery agent can not place any order!');
                    }
                    else {
                        this.data.priceList.map((entry) => {
                            entry.quantity = 1;
                        });
                        this.modalController.create({
                            component: _buynow_pricelist_modal_buynow_pricelist_modal_page__WEBPACK_IMPORTED_MODULE_8__["BuynowPricelistModalPage"],
                            cssClass: 'auto-height',
                            componentProps: {
                                product: {
                                    id: this.productId,
                                    data: this.data
                                },
                            }
                        })
                            .then(modalEl => {
                            modalEl.present();
                        });
                    }
                });
            }
        });
    }
    getDiscountedProduct(price, discount) {
        let discountedPrice = Math.ceil(price - (price * ((discount * 1) / 100)));
        return discountedPrice;
    }
    removeSubscriptions() {
        this.events.unsubscribe('product:publishgetProductWithId');
        this.events.unsubscribe('user:orderSuccessfullyPlaced');
        this.events.unsubscribe('user:productAddedToCart');
        this.events.unsubscribe('user:publishLengthOfCartProducts');
        this.events.unsubscribe('user:publishUserCartProducts');
    }
};
ProductDetailsPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
    { type: _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"] }
];
ProductDetailsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-product-details',
        template: __webpack_require__(/*! raw-loader!./product-details.page.html */ "./node_modules/raw-loader/index.js!./src/app/product-details/product-details.page.html"),
        encapsulation: 2,
        styles: [__webpack_require__(/*! ./product-details.page.scss */ "./src/app/product-details/product-details.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"], _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"]])
], ProductDetailsPage);



/***/ })

}]);
//# sourceMappingURL=product-details-product-details-module-es2015.js.map