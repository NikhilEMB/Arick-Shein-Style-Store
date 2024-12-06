(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["shop-shop-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/shop/shop.page.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/shop/shop.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"shop-categories\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center style=\"margin-left: 48px;\">{{categoryName}}</ion-title>\r\n    <ion-buttons slot=\"end\">\r\n      <ion-button (click)=\"goToSearchItemsPage()\">\r\n        <i class=\"flaticon-null-23\"></i>\r\n      </ion-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n\r\n<ion-content>\r\n  <div *ngIf=\"showLoader\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n  <div *ngIf=\"showSearchLoader\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n  <div class=\"no-data\" *ngIf=\"showNoProducts\" text-center>\r\n    <img src=\"assets/img/no-product.png\" alt=\"\">\r\n    <h6>No products</h6>\r\n  </div>\r\n  <ion-grid *ngIf=\"!showNoProducts && !showSearchLoader\" class=\"ion-no-padding\">\r\n    <ion-row>\r\n      <ion-col size-xs=\"6\" size-sm=\"4\" size-md=\"4\" size-lg=\"3\" *ngFor=\"let product of products; let i = index\"\r\n        class=\"ion-no-padding\">\r\n        <div class=\"grid-border\" *ngIf=\"product.data\">\r\n          <div style=\"position: relative;\">\r\n            <ion-thumbnail (click)=\"onClickProduct(product.id)\">\r\n              <img class=\"loading\" *ngIf=\"product.data.coverPic && product.data.coverPic.mob\"\r\n                src=\"{{product.data.coverPic.mob}}\">\r\n              <img class=\"loading\"\r\n                *ngIf=\"product.data.coverPic && !product.data.coverPic.mob && product.data.coverPic.url\"\r\n                src=\"{{product.data.coverPic.url}}\">\r\n              <img *ngIf=\"!product.data.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n            </ion-thumbnail>\r\n            <div *ngIf=\"product.data.discount && product.data.discount !== '' && product.data.discount !== '0'\" class=\"off-percent\">\r\n              {{product.data.discount}}% off\r\n            </div>\r\n            <div class=\"out-of-stock\" *ngIf=\"product.data.stopWhenNoQty && product.data.productQty === '0'\">\r\n              Out of stock\r\n            </div>\r\n          </div>\r\n          <div>\r\n            <p class=\"product-name\">{{product.data.prodName.trim()}}</p>\r\n          </div>\r\n\r\n          <div *ngIf=\"!product.data.isPriceList; else showPriceList\">\r\n            <div>\r\n              <p class=\"product-desc\">{{product.data.prodDesc.trim()}}</p>\r\n            </div>\r\n            <div *ngIf=\"product.data.discount && product.data.discount !== '' && product.data.discount !== '0'; else showOriginalPrice;\" class=\"price\">\r\n              <p>\r\n                {{getDiscountedProduct(product.data.prodPrice, product.data.discount) | currency: 'INR':true:'0.0'}}<del class=\"original-price\">{{product.data.prodPrice | currency: 'INR':true:'0.0'}}</del>\r\n              </p>\r\n            </div>\r\n            <ng-template #showOriginalPrice>\r\n              <div class=\"price\">\r\n                <p>\r\n                  {{product.data.prodPrice | currency: 'INR':true:'0.0'}}\r\n                </p>\r\n              </div>\r\n            </ng-template>\r\n            \r\n            <div class=\"add-item-to-cart\" *ngIf=\"!product.inCart; else productInCart\">\r\n              <ion-button (click)=\"addProductToCart(product, i)\" expand=\"block\" size=\"small\" [disabled]=\"product.data.stopWhenNoQty && product.data.productQty === '0'\">\r\n                Add Item +\r\n              </ion-button>\r\n            </div>\r\n            <ng-template #productInCart>\r\n              <div *ngIf=\"true\" class=\"cart-counter\">\r\n                <div class=\"cart-counter-minus\">\r\n                  <ion-icon name=\"remove\" (click)=\"decrementQuantity(product.id, i)\" class=\"bs-minus-icon\"></ion-icon>\r\n                </div>\r\n                <div class=\"cart-counter-value\">\r\n                  {{productQuantityInCart(product.id, i)}}\r\n                </div>\r\n                <div class=\"cart-counter-plus\">\r\n                  <ion-icon name=\"add\" (click)=\"incrementQuantity(product.id)\" class=\"bs-add-icon\"></ion-icon>\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n          </div>\r\n          <ng-template #showPriceList>\r\n            <div>\r\n              <p class=\"product-desc\">{{product.data.priceList[0].weight}}</p>\r\n            </div>\r\n            <div *ngIf=\"product.data.discount && product.data.discount !== '' && product.data.discount !== '0'; else showPriceListOriginalPrice;\" class=\"price\">\r\n              <p>\r\n                {{getDiscountedProduct(product.data.priceList[0].price, product.data.discount) | currency: 'INR':true:'0.0'}}<del class=\"original-price\">{{product.data.priceList[0].price | currency: 'INR':true:'0.0'}}</del>\r\n              </p>\r\n            </div>\r\n            <ng-template #showPriceListOriginalPrice>\r\n              <div class=\"price\">\r\n                <p>\r\n                  {{product.data.priceList[0].price | currency: 'INR':true:'0.0'}}\r\n                </p>\r\n              </div>\r\n            </ng-template>\r\n            <div class=\"add-item-to-cart\">\r\n              <ion-button (click)=\"openPriceModal(product)\" expand=\"block\" size=\"small\" [disabled]=\"product.data.stopWhenNoQty && product.data.productQty === '0'\">\r\n                Add Item +\r\n              </ion-button>\r\n            </div>\r\n          </ng-template>          \r\n        </div>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n  <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\" (click)=\"goToChat(true)\">\r\n    <ion-fab-button size=\"small\" color=\"dark\">\r\n      <i class=\"flaticon-chat fab-btn-chat\"></i>\r\n    </ion-fab-button>\r\n    <span class=\"unread-msg-badge\" *ngIf=\"unreadAdminMsgs !== 0\">{{unreadAdminMsgs}}</span>\r\n  </ion-fab>\r\n  <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadMoreProducts($event)\" *ngIf=\"searchProduct === ''\">\r\n    <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more products...\">\r\n    </ion-infinite-scroll-content>\r\n  </ion-infinite-scroll>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/shop/shop.module.ts":
/*!*************************************!*\
  !*** ./src/app/shop/shop.module.ts ***!
  \*************************************/
/*! exports provided: ShopPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopPageModule", function() { return ShopPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _shop_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shop.page */ "./src/app/shop/shop.page.ts");








var routes = [
    {
        path: '',
        component: _shop_page__WEBPACK_IMPORTED_MODULE_7__["ShopPage"]
    }
];
var ShopPageModule = /** @class */ (function () {
    function ShopPageModule() {
    }
    ShopPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_6__["Ng2SearchPipeModule"]
            ],
            declarations: [_shop_page__WEBPACK_IMPORTED_MODULE_7__["ShopPage"]],
        })
    ], ShopPageModule);
    return ShopPageModule;
}());



/***/ }),

/***/ "./src/app/shop/shop.page.scss":
/*!*************************************!*\
  !*** ./src/app/shop/shop.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".grid-border {\n  border: 1px solid #eeeded;\n  margin: 0 -1px -1px 0;\n}\n\n.spinner {\n  margin-top: 50%;\n  text-align: center;\n}\n\n.search-product {\n  border: 1px solid #ccc;\n  border-radius: 25px;\n}\n\n.margining {\n  margin-top: 10px;\n  margin-right: 20px;\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n\np {\n  -webkit-margin-before: 5%;\n          margin-block-start: 5%;\n  -webkit-margin-after: 5%;\n          margin-block-end: 5%;\n}\n\n.product-name {\n  color: #2f2f2f;\n  font-weight: 600;\n  position: relative;\n  margin-left: 5%;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-size: 14px;\n}\n\n.product-desc {\n  color: #9f9f9f;\n  margin-left: 5%;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-size: 13px;\n}\n\n.price {\n  color: var(--ion-color-primary);\n  font-size: 16px;\n  margin-left: 5%;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.original-price {\n  font-size: smaller;\n  opacity: 0.6;\n  margin-left: 2%;\n  color: black;\n}\n\n:host .item-interactive.ion-valid {\n  --highlight-background: var(--ion-color-primary);\n}\n\nion-thumbnail {\n  --size: 170px;\n  width: 100%;\n}\n\n.loading {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n}\n\n.flaticon-null-22::before {\n  margin: 15px;\n  color: #ccc;\n}\n\n.loadmore-btn {\n  margin-top: 5%;\n  margin-bottom: 5%;\n}\n\n.no-data {\n  margin: 0;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  left: 50%;\n  margin-left: -65px;\n}\n\n.no-data img {\n  width: 130px;\n}\n\n.bottom-border {\n  border-bottom: 1px solid #ccc;\n}\n\nion-input {\n  --padding-bottom: 3px;\n  --padding-top: 5px;\n  --padding-start: 10px;\n  --padding-end: 10px;\n}\n\n.close-btn {\n  position: absolute;\n  color: #ccc;\n  right: 2px;\n}\n\n.message-box {\n  position: relative;\n}\n\n.flaticon-null-19::before {\n  font-size: 20px;\n}\n\nion-thumbnail img {\n  padding: 5px;\n}\n\n.flaticon-null-23::before {\n  font-size: 12px;\n}\n\n.pricelist-arrow {\n  opacity: 0.8;\n  margin-right: 5px;\n  border-left: 1px solid #ccc;\n  padding-left: 7px;\n  line-height: 25px;\n}\n\n.pricelist-box {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  border: 1px solid #ccc;\n  margin-left: 7px;\n  width: 55%;\n}\n\n.add-item-to-cart {\n  margin: 5px;\n}\n\n.cart-counter-value {\n  font-size: 15px;\n}\n\n.cart-counter {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-top: 5px;\n  margin-bottom: 10px;\n  margin-left: 5px;\n}\n\n.cart-counter-minus {\n  background: var(--ion-color-primary);\n  color: white;\n  padding: 5px 5px 0px 5px;\n  border-radius: 3px;\n  font-size: 13px;\n}\n\n.cart-counter-plus {\n  background: var(--ion-color-primary);\n  color: white;\n  padding: 5px 5px 0px 5px;\n  border-radius: 3px;\n  font-size: 13px;\n  margin-right: 30px;\n}\n\n.out-of-stock {\n  width: 100%;\n  position: absolute;\n  color: red;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  text-align: center;\n  text-shadow: 0px 1px 1px #3c3c3c;\n  background: white;\n  background-color: rgba(255, 255, 255, 0.9);\n  text-transform: uppercase;\n  font-size: 14px;\n  padding: 5px;\n}\n\n.off-percent {\n  font-size: small;\n  background-color: #4cae1a;\n  width: 40%;\n  text-align: center;\n  color: white;\n  padding: 3px 3px 2px 3px;\n  border-radius: 3px;\n  text-transform: uppercase;\n  position: absolute;\n  top: 15px;\n  left: 15px;\n}\n\n@media screen and (max-width: 375px) {\n  .bottom-icon {\n    top: -15px;\n  }\n\n  ion-thumbnail {\n    --size: 150px;\n  }\n\n  .product-name {\n    font-size: 13px;\n  }\n\n  .product-desc {\n    font-size: 12px;\n  }\n}\n\n@media screen and (max-width: 320px) {\n  .bottom-icon {\n    top: -20px;\n  }\n\n  ion-thumbnail {\n    --size: 124px;\n  }\n\n  .price {\n    font-size: 15px;\n  }\n\n  .product-name {\n    font-size: 12px;\n  }\n\n  .product-desc {\n    font-size: 11px;\n  }\n}\n\n@media screen and (min-width: 768px) {\n  .price {\n    font-size: 25px;\n  }\n\n  ion-input {\n    font-size: 26px;\n  }\n\n  .search-icon {\n    font-size: 36px;\n  }\n\n  .flaticon-null {\n    font-size: 40px;\n  }\n\n  ion-thumbnail {\n    --size: 220px;\n  }\n\n  .margining {\n    margin-right: 50px;\n    margin-left: 50px;\n    margin-bottom: 20px;\n  }\n\n  .product-name {\n    font-size: 20px;\n  }\n\n  .product-desc {\n    font-size: 18px;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .prod-name {\n    font-size: 35px;\n  }\n\n  .price {\n    font-size: 30px;\n  }\n\n  ion-input {\n    font-size: 28px;\n  }\n\n  .search-icon {\n    font-size: 40px;\n  }\n\n  .flaticon-null {\n    font-size: 50px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hvcC9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcc2hvcFxcc2hvcC5wYWdlLnNjc3MiLCJzcmMvYXBwL3Nob3Avc2hvcC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx5QkFBQTtFQUNBLHFCQUFBO0FDQ0o7O0FEQ0E7RUFDSSxlQUFBO0VBQ0Esa0JBQUE7QUNFSjs7QURBQTtFQUNJLHNCQUFBO0VBQ0EsbUJBQUE7QUNHSjs7QUREQTtFQUNJLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0FDSUo7O0FEREE7RUFDSSx5QkFBQTtVQUFBLHNCQUFBO0VBQ0Esd0JBQUE7VUFBQSxvQkFBQTtBQ0lKOztBREZBO0VBQ0ksY0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtBQ0tKOztBREhBO0VBQ0ksY0FBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0FDTUo7O0FESkE7RUFDSSwrQkFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0FDT0o7O0FETEE7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBQ1FKOztBRExJO0VBQ0UsZ0RBQUE7QUNRTjs7QURMQTtFQUNJLGFBQUE7RUFDQSxXQUFBO0FDUUo7O0FETkE7RUFDSSxzR0FBQTtBQ1NKOztBRFBFO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QUNVSjs7QURSRTtFQUNJLGNBQUE7RUFDQSxpQkFBQTtBQ1dOOztBRFRFO0VBQ0UsU0FBQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUVBLG1DQUFBO1VBQUEsMkJBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7QUNZTjs7QURWRTtFQUNFLFlBQUE7QUNhSjs7QURYQTtFQUNJLDZCQUFBO0FDY0o7O0FEWkE7RUFDSSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtBQ2VKOztBRGJFO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtBQ2dCSjs7QURkRTtFQUNFLGtCQUFBO0FDaUJKOztBRGZFO0VBQ0UsZUFBQTtBQ2tCSjs7QURmRTtFQUNFLFlBQUE7QUNrQko7O0FEaEJBO0VBQ0ksZUFBQTtBQ21CSjs7QURqQkE7RUFDSSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSwyQkFBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7QUNvQko7O0FEbEJBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EsVUFBQTtBQ3FCSjs7QURuQkE7RUFDSSxXQUFBO0FDc0JKOztBRHBCQTtFQUNJLGVBQUE7QUN1Qko7O0FEckJBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtBQ3dCSjs7QUR0QkE7RUFDSSxvQ0FBQTtFQUNBLFlBQUE7RUFDQSx3QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQ3lCSjs7QUR2QkE7RUFDSSxvQ0FBQTtFQUNBLFlBQUE7RUFDQSx3QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FDMEJKOztBRHZCQTtFQUNJLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLHdDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxrQkFBQTtFQUNBLGdDQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQ0FBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUMwQko7O0FEdkJBO0VBQ0ksZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSx3QkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0FDMEJKOztBRHRCQTtFQUNJO0lBQ0ksVUFBQTtFQ3lCTjs7RUR2QkU7SUFDSSxhQUFBO0VDMEJOOztFRHhCRTtJQUNJLGVBQUE7RUMyQk47O0VEekJFO0lBQ0ksZUFBQTtFQzRCTjtBQUNGOztBRHRCQTtFQUNJO0lBQ00sVUFBQTtFQ3dCUjs7RUR0Qkk7SUFDSSxhQUFBO0VDeUJSOztFRHZCSTtJQUNJLGVBQUE7RUMwQlI7O0VEeEJJO0lBQ0UsZUFBQTtFQzJCTjs7RUR6QkU7SUFDSSxlQUFBO0VDNEJOO0FBQ0Y7O0FEeEJBO0VBQ0k7SUFDSSxlQUFBO0VDMEJOOztFRHhCRTtJQUNJLGVBQUE7RUMyQk47O0VEekJFO0lBQ0ksZUFBQTtFQzRCTjs7RUQxQkU7SUFDSSxlQUFBO0VDNkJOOztFRDNCRTtJQUNJLGFBQUE7RUM4Qk47O0VENUJFO0lBQ0ksa0JBQUE7SUFDQSxpQkFBQTtJQUNBLG1CQUFBO0VDK0JOOztFRDdCRTtJQUNJLGVBQUE7RUNnQ047O0VEOUJFO0lBQ0ksZUFBQTtFQ2lDTjtBQUNGOztBRDlCQTtFQUNJO0lBQ0ksZUFBQTtFQ2dDTjs7RUQ5QkU7SUFDSSxlQUFBO0VDaUNOOztFRC9CRTtJQUNJLGVBQUE7RUNrQ047O0VEaENFO0lBQ0ksZUFBQTtFQ21DTjs7RURqQ0U7SUFDSSxlQUFBO0VDb0NOO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9zaG9wL3Nob3AucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmdyaWQtYm9yZGVye1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2VlZWRlZDtcclxuICAgIG1hcmdpbjowIC0xcHggLTFweCAwO1xyXG59XHJcbi5zcGlubmVye1xyXG4gICAgbWFyZ2luLXRvcDogNTAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi5zZWFyY2gtcHJvZHVjdHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xyXG59XHJcbi5tYXJnaW5pbmd7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG5we1xyXG4gICAgbWFyZ2luLWJsb2NrLXN0YXJ0OiA1JTtcclxuICAgIG1hcmdpbi1ibG9jay1lbmQ6IDUlO1xyXG59XHJcbi5wcm9kdWN0LW5hbWV7XHJcbiAgICBjb2xvcjogIzJmMmYyZjtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBtYXJnaW4tbGVmdDogNSU7XHJcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcbi5wcm9kdWN0LWRlc2N7XHJcbiAgICBjb2xvcjogIzlmOWY5ZjtcclxuICAgIG1hcmdpbi1sZWZ0OiA1JTtcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbn1cclxuLnByaWNle1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIG1hcmdpbi1sZWZ0OiA1JTtcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbn1cclxuLm9yaWdpbmFsLXByaWNlIHtcclxuICAgIGZvbnQtc2l6ZTogc21hbGxlcjtcclxuICAgIG9wYWNpdHk6IC42O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDIlO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG59XHJcbjpob3N0IHtcclxuICAgIC5pdGVtLWludGVyYWN0aXZlLmlvbi12YWxpZHtcclxuICAgICAgLS1oaWdobGlnaHQtYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgfVxyXG4gIH1cclxuaW9uLXRodW1ibmFpbHtcclxuICAgIC0tc2l6ZTogMTcwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG4ubG9hZGluZyB7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoJ2h0dHBzOi8vczUuZ2lmeXUuY29tL2ltYWdlcy9sb2FkZXJiYjE5ZWZjYzI3NDllMTE1LmdpZicpIGNlbnRlciBuby1yZXBlYXQ7XHJcbiAgfVxyXG4gIC5mbGF0aWNvbi1udWxsLTIyOjpiZWZvcmUge1xyXG4gICAgbWFyZ2luOiAxNXB4O1xyXG4gICAgY29sb3I6ICNjY2M7XHJcbiAgfVxyXG4gIC5sb2FkbW9yZS1idG57XHJcbiAgICAgIG1hcmdpbi10b3A6IDUlO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiA1JTtcclxuICB9XHJcbiAgLm5vLWRhdGF7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgdG9wOiA1MCU7XHJcbiAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgICAgbGVmdDogNTAlO1xyXG4gICAgICBtYXJnaW4tbGVmdDogLTY1cHg7XHJcbiAgfVxyXG4gIC5uby1kYXRhIGltZ3tcclxuICAgIHdpZHRoOiAxMzBweDtcclxuICB9XHJcbi5ib3R0b20tYm9yZGVye1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XHJcbn1cclxuaW9uLWlucHV0e1xyXG4gICAgLS1wYWRkaW5nLWJvdHRvbTogM3B4O1xyXG4gICAgLS1wYWRkaW5nLXRvcDogNXB4O1xyXG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAxMHB4O1xyXG4gICAgLS1wYWRkaW5nLWVuZDogMTBweDtcclxuICB9XHJcbiAgLmNsb3NlLWJ0bntcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgXHJcbiAgICBjb2xvcjogI2NjYztcclxuICAgIHJpZ2h0OiAycHg7XHJcbiAgfVxyXG4gIC5tZXNzYWdlLWJveHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB9XHJcbiAgLmZsYXRpY29uLW51bGwtMTk6OmJlZm9yZXtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICB9XHJcblxyXG4gIGlvbi10aHVtYm5haWwgaW1nIHtcclxuICAgIHBhZGRpbmc6IDVweDtcclxufVxyXG4uZmxhdGljb24tbnVsbC0yMzo6YmVmb3JlIHtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG4ucHJpY2VsaXN0LWFycm93IHtcclxuICAgIG9wYWNpdHk6IC44O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDdweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xyXG59XHJcbi5wcmljZWxpc3QtYm94e1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDdweDtcclxuICAgIHdpZHRoOiA1NSU7XHJcbn1cclxuLmFkZC1pdGVtLXRvLWNhcnR7XHJcbiAgICBtYXJnaW46IDVweDtcclxufVxyXG4uY2FydC1jb3VudGVyLXZhbHVle1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG59XHJcbi5jYXJ0LWNvdW50ZXJ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIG1hcmdpbi10b3A6IDVweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG59XHJcbi5jYXJ0LWNvdW50ZXItbWludXN7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBwYWRkaW5nOiA1cHggNXB4IDBweCA1cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbn1cclxuLmNhcnQtY291bnRlci1wbHVze1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgcGFkZGluZzogNXB4IDVweCAwcHggNXB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xyXG59XHJcblxyXG4ub3V0LW9mLXN0b2NrIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgY29sb3I6IHJlZDtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgdGV4dC1zaGFkb3c6IDBweCAxcHggMXB4ICMzYzNjM2M7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsIDAuOSk7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG59XHJcblxyXG4ub2ZmLXBlcmNlbnQge1xyXG4gICAgZm9udC1zaXplOiBzbWFsbDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig3NiwgMTc0LCAyNik7XHJcbiAgICB3aWR0aDogNDAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgcGFkZGluZzogM3B4IDNweCAycHggM3B4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMTVweDtcclxuICAgIGxlZnQ6IDE1cHg7XHJcbn1cclxuXHJcbi8vTUVESUEgUVVFUklFU1xyXG5AbWVkaWEgc2NyZWVuIGFuZChtYXgtd2lkdGg6IDM3NXB4KXtcclxuICAgIC5ib3R0b20taWNvbntcclxuICAgICAgICB0b3A6IC0xNXB4O1xyXG4gICAgfVxyXG4gICAgaW9uLXRodW1ibmFpbHtcclxuICAgICAgICAtLXNpemU6IDE1MHB4O1xyXG4gICAgfVxyXG4gICAgLnByb2R1Y3QtbmFtZXtcclxuICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICB9XHJcbiAgICAucHJvZHVjdC1kZXNje1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1heC13aWR0aDogMzYwcHgpe1xyXG4gICAgXHJcbn1cclxuQG1lZGlhIHNjcmVlbiBhbmQobWF4LXdpZHRoOiAzMjBweCl7XHJcbiAgICAuYm90dG9tLWljb257XHJcbiAgICAgICAgICB0b3A6IC0yMHB4O1xyXG4gICAgICB9XHJcbiAgICAgIGlvbi10aHVtYm5haWx7XHJcbiAgICAgICAgICAtLXNpemU6IDEyNHB4O1xyXG4gICAgICB9XHJcbiAgICAgIC5wcmljZXtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgICAgfVxyXG4gICAgICAucHJvZHVjdC1uYW1le1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIH1cclxuICAgIC5wcm9kdWN0LWRlc2N7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMXB4O1xyXG4gICAgfVxyXG4gICBcclxuICBcclxuICB9XHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1pbi13aWR0aDo3NjhweCl7XHJcbiAgICAucHJpY2V7XHJcbiAgICAgICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgfVxyXG4gICAgaW9uLWlucHV0e1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjZweDtcclxuICAgIH1cclxuICAgIC5zZWFyY2gtaWNvbntcclxuICAgICAgICBmb250LXNpemU6IDM2cHg7XHJcbiAgICB9XHJcbiAgICAuZmxhdGljb24tbnVsbHtcclxuICAgICAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICB9XHJcbiAgICBpb24tdGh1bWJuYWlse1xyXG4gICAgICAgIC0tc2l6ZTogMjIwcHg7XHJcbiAgICB9XHJcbiAgICAubWFyZ2luaW5ne1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogNTBweDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogNTBweDtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgfVxyXG4gICAgLnByb2R1Y3QtbmFtZXtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcbiAgICAucHJvZHVjdC1kZXNje1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIH1cclxuICAgXHJcbn1cclxuQG1lZGlhIHNjcmVlbiBhbmQobWluLXdpZHRoOjEwMjRweCl7XHJcbiAgICAucHJvZC1uYW1le1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMzVweDtcclxuICAgIH1cclxuICAgIC5wcmljZXtcclxuICAgICAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgICB9XHJcbiAgICBpb24taW5wdXR7XHJcbiAgICAgICAgZm9udC1zaXplOiAyOHB4O1xyXG4gICAgfVxyXG4gICAgLnNlYXJjaC1pY29ue1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIH1cclxuICAgIC5mbGF0aWNvbi1udWxse1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNTBweDtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgXHJcbn0iLCIuZ3JpZC1ib3JkZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZWVlZGVkO1xuICBtYXJnaW46IDAgLTFweCAtMXB4IDA7XG59XG5cbi5zcGlubmVyIHtcbiAgbWFyZ2luLXRvcDogNTAlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5zZWFyY2gtcHJvZHVjdCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XG59XG5cbi5tYXJnaW5pbmcge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG5wIHtcbiAgbWFyZ2luLWJsb2NrLXN0YXJ0OiA1JTtcbiAgbWFyZ2luLWJsb2NrLWVuZDogNSU7XG59XG5cbi5wcm9kdWN0LW5hbWUge1xuICBjb2xvcjogIzJmMmYyZjtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tbGVmdDogNSU7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5wcm9kdWN0LWRlc2Mge1xuICBjb2xvcjogIzlmOWY5ZjtcbiAgbWFyZ2luLWxlZnQ6IDUlO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuXG4ucHJpY2Uge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBmb250LXNpemU6IDE2cHg7XG4gIG1hcmdpbi1sZWZ0OiA1JTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi5vcmlnaW5hbC1wcmljZSB7XG4gIGZvbnQtc2l6ZTogc21hbGxlcjtcbiAgb3BhY2l0eTogMC42O1xuICBtYXJnaW4tbGVmdDogMiU7XG4gIGNvbG9yOiBibGFjaztcbn1cblxuOmhvc3QgLml0ZW0taW50ZXJhY3RpdmUuaW9uLXZhbGlkIHtcbiAgLS1oaWdobGlnaHQtYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xufVxuXG5pb24tdGh1bWJuYWlsIHtcbiAgLS1zaXplOiAxNzBweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5sb2FkaW5nIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzL2xvYWRlcmJiMTllZmNjMjc0OWUxMTUuZ2lmXCIpIGNlbnRlciBuby1yZXBlYXQ7XG59XG5cbi5mbGF0aWNvbi1udWxsLTIyOjpiZWZvcmUge1xuICBtYXJnaW46IDE1cHg7XG4gIGNvbG9yOiAjY2NjO1xufVxuXG4ubG9hZG1vcmUtYnRuIHtcbiAgbWFyZ2luLXRvcDogNSU7XG4gIG1hcmdpbi1ib3R0b206IDUlO1xufVxuXG4ubm8tZGF0YSB7XG4gIG1hcmdpbjogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBsZWZ0OiA1MCU7XG4gIG1hcmdpbi1sZWZ0OiAtNjVweDtcbn1cblxuLm5vLWRhdGEgaW1nIHtcbiAgd2lkdGg6IDEzMHB4O1xufVxuXG4uYm90dG9tLWJvcmRlciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xufVxuXG5pb24taW5wdXQge1xuICAtLXBhZGRpbmctYm90dG9tOiAzcHg7XG4gIC0tcGFkZGluZy10b3A6IDVweDtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxMHB4O1xuICAtLXBhZGRpbmctZW5kOiAxMHB4O1xufVxuXG4uY2xvc2UtYnRuIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBjb2xvcjogI2NjYztcbiAgcmlnaHQ6IDJweDtcbn1cblxuLm1lc3NhZ2UtYm94IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uZmxhdGljb24tbnVsbC0xOTo6YmVmb3JlIHtcbiAgZm9udC1zaXplOiAyMHB4O1xufVxuXG5pb24tdGh1bWJuYWlsIGltZyB7XG4gIHBhZGRpbmc6IDVweDtcbn1cblxuLmZsYXRpY29uLW51bGwtMjM6OmJlZm9yZSB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbn1cblxuLnByaWNlbGlzdC1hcnJvdyB7XG4gIG9wYWNpdHk6IDAuODtcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2NjYztcbiAgcGFkZGluZy1sZWZ0OiA3cHg7XG4gIGxpbmUtaGVpZ2h0OiAyNXB4O1xufVxuXG4ucHJpY2VsaXN0LWJveCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgbWFyZ2luLWxlZnQ6IDdweDtcbiAgd2lkdGg6IDU1JTtcbn1cblxuLmFkZC1pdGVtLXRvLWNhcnQge1xuICBtYXJnaW46IDVweDtcbn1cblxuLmNhcnQtY291bnRlci12YWx1ZSB7XG4gIGZvbnQtc2l6ZTogMTVweDtcbn1cblxuLmNhcnQtY291bnRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogNXB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuXG4uY2FydC1jb3VudGVyLW1pbnVzIHtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDVweCA1cHggMHB4IDVweDtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi5jYXJ0LWNvdW50ZXItcGx1cyB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiA1cHggNXB4IDBweCA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XG59XG5cbi5vdXQtb2Ytc3RvY2sge1xuICB3aWR0aDogMTAwJTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBjb2xvcjogcmVkO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNTAlO1xuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB0ZXh0LXNoYWRvdzogMHB4IDFweCAxcHggIzNjM2MzYztcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBwYWRkaW5nOiA1cHg7XG59XG5cbi5vZmYtcGVyY2VudCB7XG4gIGZvbnQtc2l6ZTogc21hbGw7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0Y2FlMWE7XG4gIHdpZHRoOiA0MCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAzcHggM3B4IDJweCAzcHg7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDE1cHg7XG4gIGxlZnQ6IDE1cHg7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM3NXB4KSB7XG4gIC5ib3R0b20taWNvbiB7XG4gICAgdG9wOiAtMTVweDtcbiAgfVxuXG4gIGlvbi10aHVtYm5haWwge1xuICAgIC0tc2l6ZTogMTUwcHg7XG4gIH1cblxuICAucHJvZHVjdC1uYW1lIHtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gIH1cblxuICAucHJvZHVjdC1kZXNjIHtcbiAgICBmb250LXNpemU6IDEycHg7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDMyMHB4KSB7XG4gIC5ib3R0b20taWNvbiB7XG4gICAgdG9wOiAtMjBweDtcbiAgfVxuXG4gIGlvbi10aHVtYm5haWwge1xuICAgIC0tc2l6ZTogMTI0cHg7XG4gIH1cblxuICAucHJpY2Uge1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgfVxuXG4gIC5wcm9kdWN0LW5hbWUge1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgfVxuXG4gIC5wcm9kdWN0LWRlc2Mge1xuICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgLnByaWNlIHtcbiAgICBmb250LXNpemU6IDI1cHg7XG4gIH1cblxuICBpb24taW5wdXQge1xuICAgIGZvbnQtc2l6ZTogMjZweDtcbiAgfVxuXG4gIC5zZWFyY2gtaWNvbiB7XG4gICAgZm9udC1zaXplOiAzNnB4O1xuICB9XG5cbiAgLmZsYXRpY29uLW51bGwge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgfVxuXG4gIGlvbi10aHVtYm5haWwge1xuICAgIC0tc2l6ZTogMjIwcHg7XG4gIH1cblxuICAubWFyZ2luaW5nIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDUwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IDUwcHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgfVxuXG4gIC5wcm9kdWN0LW5hbWUge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgfVxuXG4gIC5wcm9kdWN0LWRlc2Mge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAyNHB4KSB7XG4gIC5wcm9kLW5hbWUge1xuICAgIGZvbnQtc2l6ZTogMzVweDtcbiAgfVxuXG4gIC5wcmljZSB7XG4gICAgZm9udC1zaXplOiAzMHB4O1xuICB9XG5cbiAgaW9uLWlucHV0IHtcbiAgICBmb250LXNpemU6IDI4cHg7XG4gIH1cblxuICAuc2VhcmNoLWljb24ge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgfVxuXG4gIC5mbGF0aWNvbi1udWxsIHtcbiAgICBmb250LXNpemU6IDUwcHg7XG4gIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/shop/shop.page.ts":
/*!***********************************!*\
  !*** ./src/app/shop/shop.page.ts ***!
  \***********************************/
/*! exports provided: ShopPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopPage", function() { return ShopPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_search_engine_search_engine_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/search-engine/search-engine.service */ "./src/app/services/search-engine/search-engine.service.ts");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _pricelist_modal_pricelist_modal_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../pricelist-modal/pricelist-modal.page */ "./src/app/pricelist-modal/pricelist-modal.page.ts");








var ShopPage = /** @class */ (function () {
    // @ViewChild('searchInput', {static: false}) searchInputRef: TextInput;
    function ShopPage(route, events, router, loadingController, platform, searchEngineService, storage, userService, modalController, alertController) {
        var _this = this;
        this.route = route;
        this.events = events;
        this.router = router;
        this.loadingController = loadingController;
        this.platform = platform;
        this.searchEngineService = searchEngineService;
        this.storage = storage;
        this.userService = userService;
        this.modalController = modalController;
        this.alertController = alertController;
        this.products = [];
        // tslint:disable-next-line: no-unused-expression
        this.searchProduct = '';
        this.showNoProducts = false;
        this.countOfProducts = 0;
        this.showLoader = true;
        this.noMoreProducts = false;
        this.doneTypingInterval = 500;
        this.showSearchLoader = false;
        this.unreadAdminMsgs = 0;
        this.cartProducts = [];
        this.listOfProductIdsInCart = [];
        this.route.queryParams.subscribe(function (params) {
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.categoryId = _this.router.getCurrentNavigation().extras.state.categoryId;
                _this.categoryName = _this.router.getCurrentNavigation().extras.state.categoryName;
                //console.log('categoryId', this.categoryId);
            }
        });
    }
    ShopPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.willEnterSubs();
        this.storage.get('uid').then(function (val) {
            _this.events.publish('chat:getUnreadMsgOfAdmin', val);
        });
        this.events.subscribe('chat:publishUnreadMsgOfAdmin', function (unreadMsgs) {
            _this.unreadAdminMsgs = unreadMsgs;
        });
        this.devWidth = this.platform.width();
        //console.log('devWidth', this.devWidth);
        if (this.devWidth <= 500) {
            this.useThumb = true;
        }
        else if (this.devWidth > 500) {
            this.useThumb = false;
        }
        this.userId = this.userService.getUserId();
        this.events.publish('user:getUserCartProducts');
    };
    ShopPage.prototype.willEnterSubs = function () {
        var _this = this;
        this.events.subscribe('user:updateQuantityOfCartProductSuccess', function () {
            _this.loading.dismiss();
        });
        this.events.subscribe('user:productRemovedFromCart', function () {
            _this.loading.dismiss();
        });
        this.events.subscribe('user:productAddedToCart', function () {
            _this.loading.dismiss();
        });
        this.events.subscribe('user:publishUserCartProducts', function (cartProducts) {
            _this.cartProducts = cartProducts;
            //console.log('cartProducts', this.cartProducts);
        });
    };
    ShopPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe('chat:publishUnreadMsgOfAdmin');
        this.events.unsubscribe('user:updateQuantityOfCartProductSuccess');
        this.events.unsubscribe('user:productRemovedFromCart');
        this.events.unsubscribe('user:productAddedToCart');
        this.events.unsubscribe('user:publishUserCartProducts');
    };
    ShopPage.prototype.ngOnInit = function () {
        //console.log('in ngOnInit of shop');
        this.initializeSubscriptions();
        this.events.publish('user:getUserCartProducts');
        this.events.publish('product:getProducts', this.categoryId);
    };
    ShopPage.prototype.ngOnDestroy = function () {
        //console.log('in ng on destroy of products');
        this.removeSubscriptions();
    };
    ShopPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('product:publishProducts', function (products) {
            //console.log('cart products in logic...', this.cartProducts);
            _this.storage.get('listOfProductIdsInCart').then(function (val) {
                _this.listOfProductIdsInCart = val;
                //console.log('listOfProductIdsInCart', this.listOfProductIdsInCart);
                products.forEach(function (element) {
                    if (_this.userId !== '' && _this.listOfProductIdsInCart && _this.listOfProductIdsInCart.length && _this.listOfProductIdsInCart.indexOf(element.id) !== -1) {
                        //console.log('id in listOfProductIdsInCart');
                        element.inCart = true;
                    }
                    else {
                        //console.log('product is not in cart...');
                        element.inCart = false;
                    }
                });
            });
            _this.products = products;
            //console.log('products', this.products);
            _this.showLoader = false;
            _this.showSearchLoader = false;
            _this.showNoProducts = false;
        });
        this.events.subscribe('product:noProductAvailable', function () {
            //console.log('in no data shop');
            _this.showLoader = false;
            _this.showNoProducts = true;
            _this.showSearchLoader = false;
        });
        this.events.subscribe('product:productsLimitReached', function () {
            //console.log('in productsLimitReached sub...');
            _this.noMoreProducts = true;
        });
    };
    ShopPage.prototype.onClickProduct = function (id) {
        var navigationExtras = {
            state: {
                productId: id
            }
        };
        this.router.navigate(['product-details'], navigationExtras);
    };
    ShopPage.prototype.clearSearchProduct = function () {
        this.events.publish('product:getProducts', this.categoryId);
        this.searchProduct = '';
    };
    ShopPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
                                duration: 5000
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
    ShopPage.prototype.loadMoreProducts = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                //console.log('loading more data...');
                this.events.publish('product:loadMoreProducts', this.categoryId);
                setTimeout(function () {
                    event.target.complete();
                }, 1000);
                if (this.noMoreProducts === true) {
                    event.target.disabled = true;
                }
                return [2 /*return*/];
            });
        });
    };
    ShopPage.prototype.fireSearchQuery = function () {
        var _this = this;
        clearTimeout(this.typingTimer);
        if (this.searchProduct !== '') {
            this.typingTimer = setTimeout(function () {
                //console.log('in fireSearchQuery...');
                _this.showSearchLoader = true;
                _this.events.publish('search-engine:searchProduct', _this.searchProduct, _this.categoryId);
            }, this.doneTypingInterval);
        }
        else {
            this.events.publish('product:getProducts', this.categoryId);
        }
    };
    ShopPage.prototype.goToChat = function (fromfab) {
        var _this = this;
        var userId = this.userService.getUserId();
        //console.log('uid in sc', userId);
        if (userId === '') {
            //console.log('in if of uid');
            this.router.navigate(['home']);
        }
        else {
            //console.log('in else of uid');
            this.storage.get('userRole').then(function (role) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                    if (role === 'admin') {
                        this.router.navigate(['admin-home']);
                    }
                    else {
                        this.router.navigate(['chat-bot']);
                    }
                    return [2 /*return*/];
                });
            }); });
        }
    };
    ShopPage.prototype.goToSearchItemsPage = function () {
        this.router.navigate(['search-items']);
    };
    ShopPage.prototype.openPriceModal = function (product) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var userId;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                userId = this.userService.getUserId();
                //console.log('uid in sc', userId);
                if (userId === '') {
                    //console.log('in if of uid');
                    this.router.navigate(['home']);
                }
                else {
                    this.storage.get('userRole').then(function (role) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var listOfWeights, i;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            if (role === 'admin') {
                                this.presentAlert('Admin can not place the order!');
                            }
                            else if (role === 'deliveryAgent') {
                                this.presentAlert('Delivery agent can not place any order!');
                            }
                            else {
                                listOfWeights = [];
                                for (i = 0; i < product.data.priceList.length; i++) {
                                    listOfWeights.push(product.data.priceList[i].weight);
                                }
                                product.data.priceList.map(function (entry) {
                                    entry.quantity = 0;
                                });
                                this.modalController.create({
                                    component: _pricelist_modal_pricelist_modal_page__WEBPACK_IMPORTED_MODULE_7__["PricelistModalPage"],
                                    cssClass: 'auto-height',
                                    componentProps: {
                                        product: product,
                                        listOfWeights: listOfWeights,
                                        cartProducts: this.cartProducts
                                    }
                                })
                                    .then(function (modalEl) {
                                    modalEl.present();
                                });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                }
                return [2 /*return*/];
            });
        });
    };
    ShopPage.prototype.addProductToCart = function (product, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var userId;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                userId = this.userService.getUserId();
                //console.log('uid in sc', userId);
                if (userId === '') {
                    //console.log('in if of uid');
                    this.router.navigate(['home']);
                }
                else {
                    this.storage.get('userRole').then(function (role) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var cartObj;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(role === 'admin')) return [3 /*break*/, 1];
                                    this.presentAlert('Admin can not place the order!');
                                    return [3 /*break*/, 4];
                                case 1:
                                    if (!(role === 'deliveryAgent')) return [3 /*break*/, 2];
                                    this.presentAlert('Delivery agent can not place any order!');
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, this.presentLoading()];
                                case 3:
                                    _a.sent();
                                    cartObj = {
                                        name: product.data.prodName,
                                        quantity: 1,
                                        img: product.data.coverPic,
                                        description: product.data.prodDesc,
                                        productId: product.id,
                                        commentMsg: '',
                                        commentImgs: []
                                    };
                                    if (product.data.discount && product.data.discount !== '' && product.data.discount !== '0') {
                                        cartObj['price'] = Math.ceil(product.data.prodPrice - (product.data.prodPrice * ((product.data.discount * 1) / 100)));
                                    }
                                    else {
                                        cartObj['price'] = product.data.prodPrice;
                                    }
                                    this.events.publish('user:addProductToCart', cartObj);
                                    this.products[index].inCart = true;
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [2 /*return*/];
            });
        });
    };
    ShopPage.prototype.productQuantityInCart = function (id, i) {
        if (this.cartProducts.length) {
            for (var index = 0; index < this.cartProducts.length; index++) {
                if (this.cartProducts[index].productId === id) {
                    return this.cartProducts[index].quantity;
                }
            }
        }
    };
    ShopPage.prototype.prodcutDataInCart = function (id) {
        if (this.cartProducts.length) {
            for (var index = 0; index < this.cartProducts.length; index++) {
                if (this.cartProducts[index].productId === id) {
                    return { quantity: this.cartProducts[index].quantity,
                        cartProductId: this.cartProducts[index].id };
                }
            }
        }
    };
    ShopPage.prototype.decrementQuantity = function (id, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var data;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.prodcutDataInCart(id);
                        if (!(data.quantity > 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('user:updateQuantityOfCartProduct', data.quantity - 1, data.cartProductId);
                        return [3 /*break*/, 3];
                    case 2:
                        this.removeProduct(data.cartProductId);
                        this.products[index].inCart = false;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShopPage.prototype.incrementQuantity = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var data;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.prodcutDataInCart(id);
                        //console.log('quantity', data.quantity);
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        //console.log('quantity', data.quantity);
                        _a.sent();
                        this.events.publish('user:updateQuantityOfCartProduct', data.quantity + 1, data.cartProductId);
                        return [2 /*return*/];
                }
            });
        });
    };
    ShopPage.prototype.removeProduct = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('user:removeProductFromCart', id);
                        return [2 /*return*/];
                }
            });
        });
    };
    ShopPage.prototype.presentAlert = function (msg) {
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
    ShopPage.prototype.getDiscountedProduct = function (price, discount) {
        var discountedPrice = Math.ceil(price - (price * ((discount * 1) / 100)));
        return discountedPrice;
    };
    ShopPage.prototype.removeSubscriptions = function () {
        this.events.publish('product:removeSusbcriptions');
        this.events.unsubscribe('product:publishProducts');
        this.events.unsubscribe('product:noProductAvailable');
        this.events.unsubscribe('product:productsLimitReached');
    };
    ShopPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
        { type: _services_search_engine_search_engine_service__WEBPACK_IMPORTED_MODULE_4__["SearchEngineService"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"] },
        { type: _services_user_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] }
    ]; };
    ShopPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-shop',
            template: __webpack_require__(/*! raw-loader!./shop.page.html */ "./node_modules/raw-loader/index.js!./src/app/shop/shop.page.html"),
            styles: [__webpack_require__(/*! ./shop.page.scss */ "./src/app/shop/shop.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"], _services_search_engine_search_engine_service__WEBPACK_IMPORTED_MODULE_4__["SearchEngineService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"], _services_user_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]])
    ], ShopPage);
    return ShopPage;
}());



/***/ })

}]);
//# sourceMappingURL=shop-shop-module-es5.js.map