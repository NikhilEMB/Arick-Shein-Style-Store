(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["shop-shop-categories-shop-categories-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/shop/shop-categories/shop-categories.page.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/shop/shop-categories/shop-categories.page.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"header-toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button class=\"header-menu\">\r\n        <img src=\"assets/img/menu-icon.png\" class=\"menu-img\">\r\n      </ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title>{{storeName}}</ion-title>\r\n    <ion-buttons slot=\"end\">\r\n      <ion-button (click)=\"onClickCart()\" class=\"header-cart-btn\">\r\n        <img src=\"assets/img/cart-outline.png\" class=\"header-cart-img\">\r\n        <span class=\"header-cart-badge\" *ngIf=\"cartLength !== 0\">{{cartLength}}</span>\r\n        <span class=\"header-cart-price\" *ngIf=\"cartTotalPrice !== 0\">{{cartTotalPrice | currency: 'INR': true: '0.0'}}</span>\r\n        <span class=\"header-cart-price\" style=\"margin-left: 5px;\" *ngIf=\"cartTotalPrice === 0\">My Cart</span>\r\n      </ion-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-no-padding\">\r\n  <div *ngIf=\"showLoader\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n\r\n  <div class=\"no-data\" *ngIf=\"showNoCategories && !showLoader\" text-center>\r\n    <img src=\"assets/img/no-category.png\" alt=\"\">\r\n    <h6>No categories</h6>\r\n  </div>\r\n\r\n  <div *ngIf=\"!showLoader && !showNoCategories && bannersActiveStatus\">\r\n    <ion-slides pager=\"true\" [options]=\"bannerSlideOpts\" loop=\"true\" *ngIf=\"banners.length\">\r\n      <ion-slide *ngFor=\"let banner of banners; let i = index;\">\r\n        <div class=\"banner-images\"\r\n          [ngStyle]=\"{'background': 'url(' + banner.mob + ') no-repeat center', 'background-size': '100%'}\"></div>\r\n      </ion-slide>\r\n    </ion-slides>\r\n  </div>\r\n  <div class=\"best-sellers-container\" *ngIf=\"!showLoader && !showNoCategories && bestSellersActiveStatus\">\r\n    <h6 class=\"content-heading\">Best Sellers</h6>\r\n    <ion-slides [options]=\"bestSellerSlideOpts\" loop=\"true\" *ngIf=\"bsProducts.length\">\r\n      <ion-slide *ngFor=\"let product of bsProducts; let i=index;\">\r\n        <ion-card class=\"bs-card\">\r\n          <div style=\"position: relative;\">\r\n            <img *ngIf=\"product.data.coverPic && product.data.coverPic.mob\" img-preloader=\"{{product.data.coverPic.mob}}\" (click)=\"onClickProduct(product.id)\">\r\n            <img *ngIf=\"product.data.coverPic && !product.data.coverPic.mob && product.data.coverPic.url\" img-preloader=\"{{product.data.coverPic.url}}\" (click)=\"onClickProduct(product.id)\">\r\n            <img *ngIf=\"!product.data.coverPic\" img-preloader=\"assets/img/placeholder-img.jpg\" (click)=\"onClickProduct(product.id)\">\r\n          </div>\r\n          <div *ngIf=\"product.data.discount && product.data.discount !== '' && product.data.discount !== '0'\" class=\"bs-off-percent\">\r\n            {{product.data.discount}}% off\r\n          </div>\r\n          <div class=\"bs-out-of-stock\" *ngIf=\"product.data.stopWhenNoQty && product.data.productQty === '0'\">\r\n            out of stock\r\n          </div>\r\n          <ion-card-content *ngIf=\"!product.data.isPriceList; else hasPriceList;\">\r\n            <p class=\"bs-price\" *ngIf=\"product.data.discount && product.data.discount !== '' && product.data.discount !== '0'; else showOriginalPrice;\">\r\n              {{getDiscountedProduct(product.data.prodPrice, product.data.discount) | currency: 'INR':true:'0.0'}}<del class=\"del-price\">{{product.data.prodPrice  | currency: 'INR':true:'0.0'}}</del>\r\n            </p>\r\n            <ng-template #showOriginalPrice>\r\n              <p class=\"bs-price\">{{product.data.prodPrice | currency: 'INR':true:'0.0'}}</p>\r\n            </ng-template>\r\n            <p class=\"bs-name\">{{product.data.prodName.trim()}}</p>\r\n            <p class=\"bs-desc\">{{product.data.prodDesc.trim()}}</p>\r\n          </ion-card-content>\r\n          <ng-template #hasPriceList>\r\n            <ion-card-content>\r\n              <p class=\"bs-price\" *ngIf=\"product.data.discount && product.data.discount !== '' && product.data.discount !== '0'; else showPriceListOriginalPrice;\">\r\n                {{getDiscountedProduct(product.data.priceList[0].price, product.data.discount) | currency: 'INR':true:'0.0'}}<del class=\"del-price\">{{product.data.priceList[0].price | currency: 'INR':true:'0.0'}}</del>\r\n              </p>\r\n              <ng-template #showPriceListOriginalPrice>\r\n                <p class=\"bs-price\">{{product.data.priceList[0].price | currency: 'INR':true:'0.0'}}</p>\r\n              </ng-template>\r\n              <p class=\"bs-name\">{{product.data.prodName.trim()}}</p>\r\n              <p class=\"bs-desc\">{{product.data.priceList[0].weight}}</p>\r\n            </ion-card-content>\r\n          </ng-template>\r\n          <br>\r\n          <div [hidden]=\"product.data.stopWhenNoQty && product.data.productQty === '0'\">\r\n            <div class=\"bs-bottom-btn\" *ngIf=\"!product.data.isPriceList; else usePriceList;\">\r\n              <div class=\"bs-plus-minus\" *ngIf=\"product.inCart; else bsProductNotIncart;\">\r\n                <ion-grid class=\"ion-no-padding\">\r\n                  <ion-row class=\"ion-no-padding\">\r\n                    <ion-col size-xs=\"12\" class=\"ion-no-padding\">\r\n                      <ion-row class=\"ion-justify-content-start bs-counter\">\r\n                        <ion-col size=\"3\" class=\"ion-no-padding\">\r\n                            <ion-icon name=\"remove\" (click)=\"decrementQuantity(product.id, i)\" class=\"bs-minus-icon\"></ion-icon>\r\n                        </ion-col>\r\n                        <ion-col class=\"ion-no-padding\">\r\n                            <span class=\"bs-counter-value\">{{bsProdcutQuantityInCart(product.id)}}</span>\r\n                        </ion-col>\r\n                        <ion-col size=\"3\" class=\"ion-no-padding\">\r\n                            <ion-icon name=\"add\" (click)=\"incrementQuantity(product.id)\" class=\"bs-add-icon\"></ion-icon>\r\n                        </ion-col>\r\n                      </ion-row>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                </ion-grid>\r\n              </div>\r\n              <ng-template #bsProductNotIncart>\r\n                <div class=\"bs-add-to-cart\" (click)=\"addToCart(product, i)\">\r\n                  Add to Cart\r\n                </div>\r\n              </ng-template>            \r\n            </div>\r\n            <ng-template #usePriceList>\r\n              <div class=\"bs-bottom-btn\">\r\n                <div class=\"bs-add-to-cart\" (click)=\"priceListAddToCart(product)\">\r\n                  Add to Cart\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n          </div>\r\n          \r\n          </ion-card>\r\n      </ion-slide>\r\n    </ion-slides>\r\n  </div>\r\n\r\n  <div class=\"categories-container\" *ngIf=\"!showLoader && !showNoCategories\">\r\n    <h6 class=\"content-heading\">Shop By Categories</h6>\r\n  </div>\r\n  <ion-grid class=\"ion-no-padding\">\r\n    <ion-row>\r\n      <ion-col size-xs=\"6\" size-sm=\"4\" size-md=\"4\" size-lg=\"3\"\r\n        *ngFor=\"let category of categories; let i = index\" class=\"ion-no-padding\">\r\n        <div class=\"categories-content\" (click)=\"onClickCategory(category)\">\r\n          <img class=\"categories-img\" *ngIf=\"category.image.mob\" img-preloader=\"{{category.image.mob}}\">\r\n          <img class=\"categories-img\" *ngIf=\"!category.image.mob && category.image.url\" img-preloader=\"{{category.image.url}}\">\r\n          <img class=\"categories-img\" *ngIf=\"!category.image.mob && !category.image.url\" img-preloader=\"assets/img/placeholder-img.jpg\">\r\n          <div class=\"categories-overlay\">\r\n            <div class=\"categories-name\">\r\n              <div>\r\n                {{category.name.trim()}}\r\n              </div>\r\n              <div>\r\n                <img src=\"assets/img/right-arrow.png\" alt=\"\">\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n  <div class=\"store-info ion-padding\" *ngIf=\"allowStoreInfo && !showLoader && !showNoCategories\">\r\n    <div [innerHtml]=\"storeInfo\"></div>\r\n  </div>\r\n  <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\" (click)=\"goToChat(true)\">\r\n    <ion-fab-button size=\"small\" color=\"dark\">\r\n      <i class=\"flaticon-chat fab-btn-chat\"></i>\r\n    </ion-fab-button>\r\n    <div class=\"unread-msg-badge\" *ngIf=\"unreadAdminMsgs !== 0\">{{unreadAdminMsgs}}</div>\r\n  </ion-fab>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/shop/shop-categories/shop-categories.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/shop/shop-categories/shop-categories.module.ts ***!
  \****************************************************************/
/*! exports provided: ShopCategoriesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopCategoriesPageModule", function() { return ShopCategoriesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _shop_categories_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shop-categories.page */ "./src/app/shop/shop-categories/shop-categories.page.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.js");
/* harmony import */ var src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/directives/application-directives.module */ "./src/app/directives/application-directives.module.ts");









// import { IonicImageLoader } from 'ionic-image-loader';
const routes = [
    {
        path: '',
        component: _shop_categories_page__WEBPACK_IMPORTED_MODULE_6__["ShopCategoriesPage"]
    }
];
let ShopCategoriesPageModule = class ShopCategoriesPageModule {
};
ShopCategoriesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__["Ng2SearchPipeModule"],
            src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_8__["ApplicationDirectivesModule"]
            // IonicImageLoader
        ],
        declarations: [_shop_categories_page__WEBPACK_IMPORTED_MODULE_6__["ShopCategoriesPage"]],
    })
], ShopCategoriesPageModule);



/***/ }),

/***/ "./src/app/shop/shop-categories/shop-categories.page.scss":
/*!****************************************************************!*\
  !*** ./src/app/shop/shop-categories/shop-categories.page.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header-toolbar {\n  --background: var(--ion-color-primary);\n  color: white;\n}\n\n.header-toolbar ion-title {\n  font-weight: 600;\n}\n\n.header-menu {\n  border-radius: 50%;\n  background-color: white;\n  margin-left: 5px;\n  height: 33px;\n  width: 33px;\n  min-width: 33px;\n}\n\n.header-cart-img {\n  width: 18px;\n}\n\n.header-cart-btn {\n  background: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.07)), to(transparent));\n  background: linear-gradient(0deg, rgba(0, 0, 0, 0.07), transparent);\n  min-height: 45px;\n  margin-right: -5px;\n}\n\n.header-cart-badge {\n  padding: 2px 3px 1px 3px;\n  background-color: white;\n  border-radius: 25px;\n  color: var(--ion-color-primary);\n  font-size: 10px;\n  position: relative;\n  right: 3px;\n  bottom: 8px;\n  font-weight: 600;\n  margin-left: -5px;\n}\n\n.header-cart-price {\n  font-size: smaller;\n  margin-top: 2px;\n}\n\n.spinner {\n  margin-top: 50%;\n  text-align: center;\n}\n\n.loading {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n}\n\n.no-data {\n  margin: 0;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  left: 50%;\n  margin-left: -65px;\n}\n\n.no-data img {\n  width: 130px;\n}\n\n.flaticon-shopping-cart::before {\n  color: var(--ion-color-primary);\n  font-weight: 600;\n  font-size: 20px;\n  padding: 10px;\n}\n\n.banner-images {\n  background: transparent url('img-preloader.png') center no-repeat;\n  width: 100%;\n  height: 30vh;\n}\n\n.content-heading {\n  margin-left: 15px;\n}\n\n.bs-card {\n  background: #fff;\n  border-radius: 10px;\n}\n\n.bs-card ion-card-content {\n  text-align: start;\n}\n\n.bs-card img {\n  width: 100%;\n  height: 120px;\n  padding: 5px;\n  -o-object-fit: contain;\n     object-fit: contain;\n}\n\n.best-sellers-container ion-slide {\n  width: 155px;\n}\n\n.bs-price {\n  font-size: 13px;\n  color: black;\n}\n\n.bs-name {\n  font-size: 12px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.bs-desc {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-size: 11px;\n  opacity: 0.6;\n}\n\n.bs-bottom-btn {\n  position: absolute;\n  bottom: -15px;\n  right: -2px;\n  left: -2px;\n  background-color: var(--ion-color-primary);\n  color: white;\n  height: 43px;\n  text-align: center;\n}\n\n.bs-add-to-cart {\n  margin-top: 7px;\n  opacity: 0.9;\n  font-size: 12px;\n}\n\n.bs-plus-minus {\n  margin: 7px 7px 0px 7px;\n  opacity: 0.9;\n  font-size: 12px;\n}\n\n.bs-minus-icon {\n  font-size: 14px;\n}\n\n.bs-add-icon {\n  font-size: 14px;\n}\n\n.bs-counter {\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n}\n\n.bs-out-of-stock {\n  width: 100%;\n  position: absolute;\n  color: red;\n  top: 60px;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  text-align: center;\n  text-shadow: 0px 1px 1px #3c3c3c;\n  background: white;\n  background-color: rgba(255, 255, 255, 0.9);\n  text-transform: uppercase;\n  font-size: 14px;\n  padding: 5px;\n}\n\n.sc-ion-card-md-h {\n  -webkit-margin-end: 3px;\n          margin-inline-end: 3px;\n  box-shadow: none;\n  border: 1px solid #e3e3e3;\n}\n\n.card-content-md {\n  padding-top: 5px;\n  -webkit-padding-start: 6px;\n          padding-inline-start: 6px;\n  padding-bottom: 18px;\n}\n\n.categories-content {\n  margin: 8px;\n  position: relative;\n}\n\n.categories-img {\n  width: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 10px;\n  border: 1px solid #ccc;\n  height: 137px;\n}\n\n.categories-overlay {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  width: 100%;\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n  background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(transparent));\n  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent);\n  z-index: 2;\n}\n\n.categories-name {\n  color: white;\n  font-size: 15px;\n  margin: 10px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  text-transform: capitalize;\n}\n\n.categories-name img {\n  width: 13px;\n}\n\n.store-info {\n  background-color: var(--ion-color-chat-background);\n  border: 2px solid var(--ion-color-chat-border);\n  font-size: 14px;\n  padding: 5px;\n  border-radius: 10px;\n  margin: 15px 10px 15px 10px;\n}\n\n.del-price {\n  opacity: 0.6;\n  margin-left: 3%;\n  font-size: smaller;\n}\n\n.bs-off-percent {\n  font-size: small;\n  background-color: #4cae1a;\n  width: 70px;\n  text-align: center;\n  color: white;\n  padding: 3px 3px 2px 3px;\n  border-radius: 3px;\n  text-transform: uppercase;\n  position: absolute;\n  top: 8px;\n  left: 10px;\n}\n\n@media screen and (max-width: 375px) {\n  .flaticon-shopping-cart::before {\n    font-size: 19px;\n  }\n}\n\n@media screen and (max-width: 360px) {\n  .flaticon-shopping-cart::before {\n    font-size: 18px;\n  }\n}\n\n@media screen and (max-width: 320px) {\n  .flaticon-shopping-cart::before {\n    font-size: 15px;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .flaticon-shopping-cart::before {\n    font-size: 27px;\n  }\n}\n\n@media screen and (min-width: 768px) {\n  .flaticon-shopping-cart::before {\n    font-size: 35px;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .flaticon-shopping-cart::before {\n    font-size: 45px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hvcC9zaG9wLWNhdGVnb3JpZXMvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXHNob3BcXHNob3AtY2F0ZWdvcmllc1xcc2hvcC1jYXRlZ29yaWVzLnBhZ2Uuc2NzcyIsInNyYy9hcHAvc2hvcC9zaG9wLWNhdGVnb3JpZXMvc2hvcC1jYXRlZ29yaWVzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHNDQUFBO0VBQ0EsWUFBQTtBQ0NKOztBRENBO0VBQ0ksZ0JBQUE7QUNFSjs7QURBQTtFQUNJLGtCQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0dKOztBRERBO0VBQ0ksV0FBQTtBQ0lKOztBRERBO0VBQ0ksdUdBQUE7RUFBQSxtRUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNJSjs7QUREQTtFQUNJLHdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLCtCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FDSUo7O0FEREE7RUFDSSxrQkFBQTtFQUNBLGVBQUE7QUNJSjs7QUREQTtFQUNJLGVBQUE7RUFDQSxrQkFBQTtBQ0lKOztBRERBO0VBQ0ksc0dBQUE7QUNJSjs7QUREQTtFQUNJLFNBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFFQSxtQ0FBQTtVQUFBLDJCQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0FDSUo7O0FEREE7RUFDSSxZQUFBO0FDSUo7O0FEREE7RUFDSSwrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7QUNJSjs7QUREQTtFQUNJLGlFQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUNJSjs7QUREQTtFQUNJLGlCQUFBO0FDSUo7O0FEREE7RUFDSSxnQkFBQTtFQUNBLG1CQUFBO0FDSUo7O0FEREE7RUFDSSxpQkFBQTtBQ0lKOztBRERBO0VBQ0ksV0FBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7S0FBQSxtQkFBQTtBQ0lKOztBRERBO0VBQ0ksWUFBQTtBQ0lKOztBRERBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7QUNJSjs7QURGQTtFQUNJLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUNLSjs7QURGQTtFQUNJLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0FDS0o7O0FERkE7RUFDSSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLDBDQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQ0tKOztBREZBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FDS0o7O0FESEE7RUFDSSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FDTUo7O0FESEE7RUFDSSxlQUFBO0FDTUo7O0FESEE7RUFDSSxlQUFBO0FDTUo7O0FESEE7RUFDSSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLGtCQUFBO0FDTUo7O0FESEE7RUFDSSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLFNBQUE7RUFDQSx3Q0FBQTtFQUNBLGdDQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsMENBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0FDTUo7O0FESEE7RUFDSSx1QkFBQTtVQUFBLHNCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtBQ01KOztBREhBO0VBQ0ksZ0JBQUE7RUFDQSwwQkFBQTtVQUFBLHlCQUFBO0VBQ0Esb0JBQUE7QUNNSjs7QURIQTtFQUNJLFdBQUE7RUFDQSxrQkFBQTtBQ01KOztBREhBO0VBQ0ksV0FBQTtFQUNBLG9CQUFBO0tBQUEsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsYUFBQTtBQ01KOztBREhBO0VBQ0ksa0JBQUE7RUFDQSxNQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtFQUNBLDRCQUFBO0VBQ0EsNkJBQUE7RUFDQSxzR0FBQTtFQUFBLG9FQUFBO0VBQ0EsVUFBQTtBQ01KOztBREhBO0VBQ0ksWUFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLDBCQUFBO0FDTUo7O0FESEE7RUFDSSxXQUFBO0FDTUo7O0FESkE7RUFDSSxrREFBQTtFQUNBLDhDQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0FDT0o7O0FETEE7RUFDSSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FDUUo7O0FETEE7RUFDSSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLHdCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7QUNRSjs7QURKQTtFQUVJO0lBQ0ksZUFBQTtFQ01OO0FBQ0Y7O0FERkE7RUFFSTtJQUNJLGVBQUE7RUNHTjtBQUNGOztBRENBO0VBRUk7SUFDSSxlQUFBO0VDQU47QUFDRjs7QURHQTtFQUVJO0lBQ0ksZUFBQTtFQ0ZOO0FBQ0Y7O0FETUE7RUFFSTtJQUNJLGVBQUE7RUNMTjtBQUNGOztBRFNBO0VBRUk7SUFDSSxlQUFBO0VDUk47QUFDRiIsImZpbGUiOiJzcmMvYXBwL3Nob3Avc2hvcC1jYXRlZ29yaWVzL3Nob3AtY2F0ZWdvcmllcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZGVyLXRvb2xiYXIge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbn1cclxuLmhlYWRlci10b29sYmFyIGlvbi10aXRsZSB7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG59XHJcbi5oZWFkZXItbWVudSB7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgICBoZWlnaHQ6IDMzcHg7XHJcbiAgICB3aWR0aDogMzNweDtcclxuICAgIG1pbi13aWR0aDogMzNweDtcclxufVxyXG4uaGVhZGVyLWNhcnQtaW1nIHtcclxuICAgIHdpZHRoOiAxOHB4O1xyXG59XHJcblxyXG4uaGVhZGVyLWNhcnQtYnRuIHtcclxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgwZGVnLCByZ2JhKDAsIDAsIDAsIC4wNyksIHRyYW5zcGFyZW50KTtcclxuICAgIG1pbi1oZWlnaHQ6IDQ1cHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IC01cHg7XHJcbn1cclxuXHJcbi5oZWFkZXItY2FydC1iYWRnZSB7XHJcbiAgICBwYWRkaW5nOiAycHggM3B4IDFweCAzcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgcmlnaHQ6IDNweDtcclxuICAgIGJvdHRvbTogOHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xyXG59XHJcblxyXG4uaGVhZGVyLWNhcnQtcHJpY2Uge1xyXG4gICAgZm9udC1zaXplOiBzbWFsbGVyO1xyXG4gICAgbWFyZ2luLXRvcDogMnB4O1xyXG59XHJcblxyXG4uc3Bpbm5lciB7XHJcbiAgICBtYXJnaW4tdG9wOiA1MCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5sb2FkaW5nIHtcclxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybCgnaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzL2xvYWRlcmJiMTllZmNjMjc0OWUxMTUuZ2lmJykgY2VudGVyIG5vLXJlcGVhdDtcclxufVxyXG5cclxuLm5vLWRhdGEge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgbWFyZ2luLWxlZnQ6IC02NXB4O1xyXG59XHJcblxyXG4ubm8tZGF0YSBpbWcge1xyXG4gICAgd2lkdGg6IDEzMHB4O1xyXG59XHJcblxyXG4uZmxhdGljb24tc2hvcHBpbmctY2FydDo6YmVmb3JlIHtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgcGFkZGluZzogMTBweDtcclxufVxyXG5cclxuLmJhbm5lci1pbWFnZXMge1xyXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKCcuLi8uLi8uLi9hc3NldHMvaW1nL2ltZy1wcmVsb2FkZXIucG5nJykgY2VudGVyIG5vLXJlcGVhdDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAzMHZoO1xyXG59XHJcblxyXG4uY29udGVudC1oZWFkaW5nIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAxNXB4O1xyXG59XHJcblxyXG4uYnMtY2FyZCB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxufVxyXG5cclxuLmJzLWNhcmQgaW9uLWNhcmQtY29udGVudHtcclxuICAgIHRleHQtYWxpZ246IHN0YXJ0O1xyXG59XHJcblxyXG4uYnMtY2FyZCBpbWcge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEyMHB4O1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcclxufVxyXG5cclxuLmJlc3Qtc2VsbGVycy1jb250YWluZXIgaW9uLXNsaWRlIHtcclxuICAgIHdpZHRoOiAxNTVweDtcclxufVxyXG5cclxuLmJzLXByaWNlIHtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIGNvbG9yOiBibGFjaztcclxufVxyXG4uYnMtbmFtZXtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbn1cclxuXHJcbi5icy1kZXNje1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgIGZvbnQtc2l6ZTogMTFweDtcclxuICAgIG9wYWNpdHk6IC42O1xyXG59XHJcblxyXG4uYnMtYm90dG9tLWJ0biB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBib3R0b206IC0xNXB4O1xyXG4gICAgcmlnaHQ6IC0ycHg7XHJcbiAgICBsZWZ0OiAtMnB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgaGVpZ2h0OiA0M3B4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uYnMtYWRkLXRvLWNhcnQge1xyXG4gICAgbWFyZ2luLXRvcDogN3B4O1xyXG4gICAgb3BhY2l0eTogLjk7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbn1cclxuLmJzLXBsdXMtbWludXN7XHJcbiAgICBtYXJnaW46IDdweCA3cHggMHB4IDdweDtcclxuICAgIG9wYWNpdHk6IC45O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG59XHJcblxyXG4uYnMtbWludXMtaWNvbntcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5cclxuLmJzLWFkZC1pY29ue1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcblxyXG4uYnMtY291bnRlcntcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmJzLW91dC1vZi1zdG9jayB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGNvbG9yOiByZWQ7XHJcbiAgICB0b3A6IDYwcHg7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB0ZXh0LXNoYWRvdzogMHB4IDFweCAxcHggIzNjM2MzYztcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwgMC45KTtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbn1cclxuXHJcbi5zYy1pb24tY2FyZC1tZC1oIHtcclxuICAgIG1hcmdpbi1pbmxpbmUtZW5kOiAzcHg7XHJcbiAgICBib3gtc2hhZG93OiBub25lO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2UzZTNlMztcclxufVxyXG5cclxuLmNhcmQtY29udGVudC1tZCB7XHJcbiAgICBwYWRkaW5nLXRvcDogNXB4O1xyXG4gICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IDZweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxOHB4O1xyXG59XHJcblxyXG4uY2F0ZWdvcmllcy1jb250ZW50IHtcclxuICAgIG1hcmdpbjogOHB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4uY2F0ZWdvcmllcy1pbWcge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgaGVpZ2h0OiAxMzdweDtcclxufVxyXG5cclxuLmNhdGVnb3JpZXMtb3ZlcmxheSB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDEwcHg7XHJcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTBweDtcclxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsIHJnYmEoMCwgMCwgMCwgLjUpLCB0cmFuc3BhcmVudCk7XHJcbiAgICB6LWluZGV4OiAyO1xyXG59XHJcblxyXG4uY2F0ZWdvcmllcy1uYW1lIHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIG1hcmdpbjogMTBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxufVxyXG5cclxuLmNhdGVnb3JpZXMtbmFtZSBpbWcge1xyXG4gICAgd2lkdGg6IDEzcHg7XHJcbn1cclxuLnN0b3JlLWluZm97XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItY2hhdC1iYWNrZ3JvdW5kKTtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1jaGF0LWJvcmRlcik7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgbWFyZ2luOiAxNXB4IDEwcHggMTVweCAxMHB4O1xyXG59XHJcbi5kZWwtcHJpY2Uge1xyXG4gICAgb3BhY2l0eTogLjY7XHJcbiAgICBtYXJnaW4tbGVmdDogMyU7XHJcbiAgICBmb250LXNpemU6IHNtYWxsZXI7XHJcbn1cclxuXHJcbi5icy1vZmYtcGVyY2VudCB7XHJcbiAgICBmb250LXNpemU6IHNtYWxsO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc2LCAxNzQsIDI2KTtcclxuICAgIHdpZHRoOiA3MHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgcGFkZGluZzogM3B4IDNweCAycHggM3B4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogOHB4O1xyXG4gICAgbGVmdDogMTBweDtcclxufVxyXG5cclxuLy9NRURJQSBRVUVSSUVTXHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1heC13aWR0aDogMzc1cHgpIHtcclxuXHJcbiAgICAuZmxhdGljb24tc2hvcHBpbmctY2FydDo6YmVmb3JlIHtcclxuICAgICAgICBmb250LXNpemU6IDE5cHg7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZChtYXgtd2lkdGg6IDM2MHB4KSB7XHJcbiAgICBcclxuICAgIC5mbGF0aWNvbi1zaG9wcGluZy1jYXJ0OjpiZWZvcmUge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1heC13aWR0aDogMzIwcHgpIHtcclxuXHJcbiAgICAuZmxhdGljb24tc2hvcHBpbmctY2FydDo6YmVmb3JlIHtcclxuICAgICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1pbi13aWR0aDogNjAwcHgpIHtcclxuXHJcbiAgICAuZmxhdGljb24tc2hvcHBpbmctY2FydDo6YmVmb3JlIHtcclxuICAgICAgICBmb250LXNpemU6IDI3cHg7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZChtaW4td2lkdGg6NzY4cHgpIHtcclxuXHJcbiAgICAuZmxhdGljb24tc2hvcHBpbmctY2FydDo6YmVmb3JlIHtcclxuICAgICAgICBmb250LXNpemU6IDM1cHg7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZChtaW4td2lkdGg6MTAyNHB4KSB7XHJcblxyXG4gICAgLmZsYXRpY29uLXNob3BwaW5nLWNhcnQ6OmJlZm9yZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiA0NXB4O1xyXG4gICAgfVxyXG5cclxufSIsIi5oZWFkZXItdG9vbGJhciB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5oZWFkZXItdG9vbGJhciBpb24tdGl0bGUge1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uaGVhZGVyLW1lbnUge1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBtYXJnaW4tbGVmdDogNXB4O1xuICBoZWlnaHQ6IDMzcHg7XG4gIHdpZHRoOiAzM3B4O1xuICBtaW4td2lkdGg6IDMzcHg7XG59XG5cbi5oZWFkZXItY2FydC1pbWcge1xuICB3aWR0aDogMThweDtcbn1cblxuLmhlYWRlci1jYXJ0LWJ0biB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgwZGVnLCByZ2JhKDAsIDAsIDAsIDAuMDcpLCB0cmFuc3BhcmVudCk7XG4gIG1pbi1oZWlnaHQ6IDQ1cHg7XG4gIG1hcmdpbi1yaWdodDogLTVweDtcbn1cblxuLmhlYWRlci1jYXJ0LWJhZGdlIHtcbiAgcGFkZGluZzogMnB4IDNweCAxcHggM3B4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHJpZ2h0OiAzcHg7XG4gIGJvdHRvbTogOHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBtYXJnaW4tbGVmdDogLTVweDtcbn1cblxuLmhlYWRlci1jYXJ0LXByaWNlIHtcbiAgZm9udC1zaXplOiBzbWFsbGVyO1xuICBtYXJnaW4tdG9wOiAycHg7XG59XG5cbi5zcGlubmVyIHtcbiAgbWFyZ2luLXRvcDogNTAlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5sb2FkaW5nIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzL2xvYWRlcmJiMTllZmNjMjc0OWUxMTUuZ2lmXCIpIGNlbnRlciBuby1yZXBlYXQ7XG59XG5cbi5uby1kYXRhIHtcbiAgbWFyZ2luOiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gIGxlZnQ6IDUwJTtcbiAgbWFyZ2luLWxlZnQ6IC02NXB4O1xufVxuXG4ubm8tZGF0YSBpbWcge1xuICB3aWR0aDogMTMwcHg7XG59XG5cbi5mbGF0aWNvbi1zaG9wcGluZy1jYXJ0OjpiZWZvcmUge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBmb250LXNpemU6IDIwcHg7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbi5iYW5uZXItaW1hZ2VzIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiLi4vLi4vLi4vYXNzZXRzL2ltZy9pbWctcHJlbG9hZGVyLnBuZ1wiKSBjZW50ZXIgbm8tcmVwZWF0O1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAzMHZoO1xufVxuXG4uY29udGVudC1oZWFkaW5nIHtcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XG59XG5cbi5icy1jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuLmJzLWNhcmQgaW9uLWNhcmQtY29udGVudCB7XG4gIHRleHQtYWxpZ246IHN0YXJ0O1xufVxuXG4uYnMtY2FyZCBpbWcge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMjBweDtcbiAgcGFkZGluZzogNXB4O1xuICBvYmplY3QtZml0OiBjb250YWluO1xufVxuXG4uYmVzdC1zZWxsZXJzLWNvbnRhaW5lciBpb24tc2xpZGUge1xuICB3aWR0aDogMTU1cHg7XG59XG5cbi5icy1wcmljZSB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgY29sb3I6IGJsYWNrO1xufVxuXG4uYnMtbmFtZSB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi5icy1kZXNjIHtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgb3BhY2l0eTogMC42O1xufVxuXG4uYnMtYm90dG9tLWJ0biB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAtMTVweDtcbiAgcmlnaHQ6IC0ycHg7XG4gIGxlZnQ6IC0ycHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgY29sb3I6IHdoaXRlO1xuICBoZWlnaHQ6IDQzcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmJzLWFkZC10by1jYXJ0IHtcbiAgbWFyZ2luLXRvcDogN3B4O1xuICBvcGFjaXR5OiAwLjk7XG4gIGZvbnQtc2l6ZTogMTJweDtcbn1cblxuLmJzLXBsdXMtbWludXMge1xuICBtYXJnaW46IDdweCA3cHggMHB4IDdweDtcbiAgb3BhY2l0eTogMC45O1xuICBmb250LXNpemU6IDEycHg7XG59XG5cbi5icy1taW51cy1pY29uIHtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uYnMtYWRkLWljb24ge1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5icy1jb3VudGVyIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmJzLW91dC1vZi1zdG9jayB7XG4gIHdpZHRoOiAxMDAlO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGNvbG9yOiByZWQ7XG4gIHRvcDogNjBweDtcbiAgbGVmdDogNTAlO1xuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB0ZXh0LXNoYWRvdzogMHB4IDFweCAxcHggIzNjM2MzYztcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBwYWRkaW5nOiA1cHg7XG59XG5cbi5zYy1pb24tY2FyZC1tZC1oIHtcbiAgbWFyZ2luLWlubGluZS1lbmQ6IDNweDtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2UzZTNlMztcbn1cblxuLmNhcmQtY29udGVudC1tZCB7XG4gIHBhZGRpbmctdG9wOiA1cHg7XG4gIHBhZGRpbmctaW5saW5lLXN0YXJ0OiA2cHg7XG4gIHBhZGRpbmctYm90dG9tOiAxOHB4O1xufVxuXG4uY2F0ZWdvcmllcy1jb250ZW50IHtcbiAgbWFyZ2luOiA4cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmNhdGVnb3JpZXMtaW1nIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBoZWlnaHQ6IDEzN3B4O1xufVxuXG4uY2F0ZWdvcmllcy1vdmVybGF5IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMHB4O1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTBweDtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgwLCAwLCAwLCAwLjUpLCB0cmFuc3BhcmVudCk7XG4gIHotaW5kZXg6IDI7XG59XG5cbi5jYXRlZ29yaWVzLW5hbWUge1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgbWFyZ2luOiAxMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xufVxuXG4uY2F0ZWdvcmllcy1uYW1lIGltZyB7XG4gIHdpZHRoOiAxM3B4O1xufVxuXG4uc3RvcmUtaW5mbyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1jaGF0LWJhY2tncm91bmQpO1xuICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItY2hhdC1ib3JkZXIpO1xuICBmb250LXNpemU6IDE0cHg7XG4gIHBhZGRpbmc6IDVweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgbWFyZ2luOiAxNXB4IDEwcHggMTVweCAxMHB4O1xufVxuXG4uZGVsLXByaWNlIHtcbiAgb3BhY2l0eTogMC42O1xuICBtYXJnaW4tbGVmdDogMyU7XG4gIGZvbnQtc2l6ZTogc21hbGxlcjtcbn1cblxuLmJzLW9mZi1wZXJjZW50IHtcbiAgZm9udC1zaXplOiBzbWFsbDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRjYWUxYTtcbiAgd2lkdGg6IDcwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAzcHggM3B4IDJweCAzcHg7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDhweDtcbiAgbGVmdDogMTBweDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzc1cHgpIHtcbiAgLmZsYXRpY29uLXNob3BwaW5nLWNhcnQ6OmJlZm9yZSB7XG4gICAgZm9udC1zaXplOiAxOXB4O1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzNjBweCkge1xuICAuZmxhdGljb24tc2hvcHBpbmctY2FydDo6YmVmb3JlIHtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDMyMHB4KSB7XG4gIC5mbGF0aWNvbi1zaG9wcGluZy1jYXJ0OjpiZWZvcmUge1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjAwcHgpIHtcbiAgLmZsYXRpY29uLXNob3BwaW5nLWNhcnQ6OmJlZm9yZSB7XG4gICAgZm9udC1zaXplOiAyN3B4O1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAuZmxhdGljb24tc2hvcHBpbmctY2FydDo6YmVmb3JlIHtcbiAgICBmb250LXNpemU6IDM1cHg7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMjRweCkge1xuICAuZmxhdGljb24tc2hvcHBpbmctY2FydDo6YmVmb3JlIHtcbiAgICBmb250LXNpemU6IDQ1cHg7XG4gIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/shop/shop-categories/shop-categories.page.ts":
/*!**************************************************************!*\
  !*** ./src/app/shop/shop-categories/shop-categories.page.ts ***!
  \**************************************************************/
/*! exports provided: ShopCategoriesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopCategoriesPage", function() { return ShopCategoriesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var src_app_pricelist_modal_pricelist_modal_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/pricelist-modal/pricelist-modal.page */ "./src/app/pricelist-modal/pricelist-modal.page.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");









let ShopCategoriesPage = class ShopCategoriesPage {
    constructor(events, router, loadingController, toastController, platform, storage, userService, modalController, alertController, chatService) {
        this.events = events;
        this.router = router;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.platform = platform;
        this.storage = storage;
        this.userService = userService;
        this.modalController = modalController;
        this.alertController = alertController;
        this.chatService = chatService;
        this.bannerSlideOpts = {
            initialSlide: 0,
            speed: 400,
            disableOnInteraction: false,
            autoplay: {
                delay: 5000
            }
        };
        this.bestSellerSlideOpts = {
            initialSlide: 0,
            speed: 200,
            slidesPerView: 2.5
        };
        this.categories = [];
        this.searchCategory = '';
        this.showLoader = true;
        this.showNoCategories = false;
        this.lastTimeBackPress = 0;
        this.timePeriodToExit = 2000;
        this.useToolbar = true;
        this.cartLength = 0;
        this.unreadAdminMsgs = 0;
        this.banners = [];
        this.bsProducts = [];
        this.cartProducts = [];
        this.storeInfo = '';
        this.listOfProductIdsInCart = [];
        this.storeName = src_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].storeName;
        this.cartTotalPrice = 0;
    }
    ionViewWillEnter() {
        this.willEnterSubscriptions();
        this.devWidth = this.platform.width();
        if (this.platform.is('android')) {
            this.useToolbar = false;
        }
        if (this.devWidth <= 500) {
            this.useThumb = true;
        }
        else if (this.devWidth > 500) {
            this.useThumb = false;
            this.bestSellerSlideOpts.slidesPerView = 3.5;
        }
        this.storage.get('uid').then((val) => {
            if (val) {
                this.events.publish('chat:getUnreadMsgOfAdmin', val);
            }
        });
        this.userId = this.userService.getUserId();
        this.events.publish('user:getUserCartProducts');
        this.storage.get('storeInfo').then((data) => {
            this.storeInfo = data.storeInfo;
            this.allowStoreInfo = data.allowStoreInfo;
        });
        this.events.publish('banners:getBannersActiveStatus');
        this.events.publish('best-sellers:getBestSellersActiveStatus');
    }
    willEnterSubscriptions() {
        this.events.subscribe('makeUnreadAdminMsgsZero', () => {
            this.unreadAdminMsgs = 0;
        });
        this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(0, () => {
            if (this.routerOutlet && this.routerOutlet.canGoBack()) {
                this.routerOutlet.pop();
            }
            else {
                if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                    navigator['app'].exitApp();
                }
                else {
                    this.presentToast('Press back again to exit App.');
                    this.lastTimeBackPress = new Date().getTime();
                }
            }
        });
        this.events.subscribe('chat:publishUnreadMsgOfAdmin', (unreadMsgs) => {
            //console.log('publishUnreadMsgOfAdmin', unreadMsgs);
            this.unreadAdminMsgs = unreadMsgs;
        });
        this.events.subscribe('user:updateQuantityOfCartProductSuccess', () => {
            this.loading.dismiss();
        });
        this.events.subscribe('user:productRemovedFromCart', () => {
            this.loading.dismiss();
        });
        this.events.subscribe('user:productAddedToCart', () => {
            this.loading.dismiss();
        });
        this.events.subscribe('user:publishUserCartProducts', (cartProducts) => {
            this.cartProducts = cartProducts;
            this.cartLength = cartProducts.length;
            //console.log('cartProducts', this.cartProducts);
            let price = 0;
            for (let index = 0; index < cartProducts.length; index++) {
                price += cartProducts[index].price * cartProducts[index].quantity;
            }
            this.cartTotalPrice = price;
        });
        this.events.subscribe('user:noProductsInCart', () => {
            this.cartTotalPrice = 0;
            this.cartLength = 0;
            this.events.publish('best-sellers:getBestSellersForShopCategory');
        });
        this.events.subscribe('banners:publishBannersActiveStatus', (status) => {
            //console.log('status from db', status);
            if (!this.isEmptyObj(status)) {
                this.bannersActiveStatus = status.isActive;
            }
            else {
                this.bannersActiveStatus = true;
            }
            //console.log('publishBannersActiveStatus', status);
        });
        this.events.subscribe('best-sellers:publishBestSellersActiveStatus', (status) => {
            //console.log('status from db', status);
            if (!this.isEmptyObj(status)) {
                this.bestSellersActiveStatus = status.isActive;
            }
            else {
                this.bestSellersActiveStatus = true;
            }
        });
    }
    ionViewWillLeave() {
        this.backButtonSubscription.unsubscribe();
        this.events.unsubscribe('chat:publishUnreadMsgOfAdmin');
        this.events.unsubscribe('user:updateQuantityOfCartProductSuccess');
        this.events.unsubscribe('user:productRemovedFromCart');
        this.events.unsubscribe('user:productAddedToCart');
        this.events.unsubscribe('user:publishUserCartProducts');
        this.events.unsubscribe('user:noProductsInCart');
        this.events.unsubscribe('banners:publishBannersActiveStatus');
        this.events.unsubscribe('best-sellers:publishBestSellersActiveStatus');
    }
    ngOnInit() {
        this.initializeSubscriptions();
        //console.log('in ngOnInit of shop category');
        this.events.publish('banners:getSubscribedBanners');
        setTimeout(() => {
            this.events.publish('product:getAllSubscribedCategories');
        }, 500);
        this.storage.get('listOfProductIdsInCart').then((val) => {
            this.listOfProductIdsInCart = val;
            this.events.publish('best-sellers:getBestSellersForShopCategory');
        });
    }
    ngOnDestroy() {
        //console.log('ng destroy of category');
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('product:publishAllSubscribedCategories', (categories) => {
            this.categories = categories;
            //console.log('categories', this.categories);
            this.showLoader = false;
            this.showNoCategories = false;
        });
        this.events.subscribe('product:noCategoryAvailable', () => {
            //console.log('in no data category');
            this.showLoader = false;
            this.showNoCategories = true;
        });
        this.events.subscribe('auth:logoutSuccess', () => {
            this.logoutAlert('Logged out successfully');
        });
        this.events.subscribe('banners:publishSubscribedBanners', (banners) => {
            if (banners && banners.length) {
                var banners_sort_asc = function (a, b) {
                    let i1 = parseInt(a.id.slice(5));
                    let i2 = parseInt(b.id.slice(5));
                    if (i1 > i2) {
                        return 1;
                    }
                    ;
                    if (i1 < i2)
                        return -1;
                    return 0;
                };
                banners.sort(banners_sort_asc);
                this.banners = banners;
                //console.log(this.banners);
            }
        });
        this.events.subscribe('best-sellers:publishBestSellersForShopCategory', (bestSellers) => {
            bestSellers.forEach(element => {
                if (this.userId !== '' && this.listOfProductIdsInCart && this.listOfProductIdsInCart.length && this.listOfProductIdsInCart.indexOf(element.id) !== -1) {
                    element.inCart = true;
                }
                else {
                    element.inCart = false;
                }
            });
            this.bsProducts = bestSellers;
            //console.log('this.bsProducts', this.bsProducts);
        });
    }
    isEmptyObj(object) {
        for (var key in object) {
            if (object.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    onClickCategory(category) {
        const navigationExtras = {
            state: {
                categoryId: category.id,
                categoryName: category.name
            }
        };
        if (category.isSubcategories) {
            this.router.navigate(['shop-subcategories'], navigationExtras);
        }
        else {
            this.router.navigate(['shop'], navigationExtras);
        }
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Please Wait...',
                duration: 5000
            });
            yield this.loading.present();
        });
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
    onClickCart() {
        let userId = this.userService.getUserId();
        //console.log('uid in sc', userId);
        if (userId === '') {
            //console.log('in if of uid');
            this.router.navigate(['home']);
        }
        else {
            this.storage.get('userRole').then((role) => {
                if (role === 'admin') {
                    this.presentAlert('Cart is available only for user not for admin.');
                }
                else if (role === 'deliveryAgent') {
                    this.presentAlert('Cart is available only for user not for delivery agent.');
                }
                else {
                    this.router.navigate(['user-cart']);
                }
            });
        }
    }
    fireSearchQuery() {
        //console.log('in fireSearchQuery...');
        this.events.publish('search-engine:searchCategory', this.searchCategory);
    }
    presentToast(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                color: 'dark',
                message: msg,
                duration: 2000,
                showCloseButton: true,
                cssClass: 'toast',
                animated: true,
                mode: 'ios'
            });
            toast.present();
        });
    }
    logoutAlert(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: [{
                        text: 'Login Again',
                        handler: () => {
                            this.router.navigate(['home']);
                        }
                    }, {
                        text: 'Ok',
                        handler: () => {
                            this.cartLength = 0;
                            for (let index = 0; index < this.bsProducts.length; index++) {
                                this.bsProducts[index].inCart = false;
                            }
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
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
    onImageLoad() {
        //console.log('image ready');
    }
    bsProdcutQuantityInCart(id) {
        if (this.cartProducts.length) {
            for (let index = 0; index < this.cartProducts.length; index++) {
                if (this.cartProducts[index].productId === id) {
                    return this.cartProducts[index].quantity;
                }
            }
        }
    }
    bsProdcutDataInCart(id) {
        if (this.cartProducts.length) {
            for (let index = 0; index < this.cartProducts.length; index++) {
                if (this.cartProducts[index].productId === id) {
                    return { quantity: this.cartProducts[index].quantity,
                        cartProductId: this.cartProducts[index].id };
                }
            }
        }
    }
    decrementQuantity(id, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const data = this.bsProdcutDataInCart(id);
            //console.log('quantity', data.quantity);
            if (data.quantity > 1) {
                yield this.presentLoading();
                this.events.publish('user:updateQuantityOfCartProduct', data.quantity - 1, data.cartProductId, false);
            }
            else {
                this.removeProduct(data.cartProductId);
                this.bsProducts[index].inCart = false;
            }
        });
    }
    incrementQuantity(id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const data = this.bsProdcutDataInCart(id);
            //console.log('quantity', data.quantity);
            yield this.presentLoading();
            this.events.publish('user:updateQuantityOfCartProduct', data.quantity + 1, data.cartProductId, false);
        });
    }
    removeProduct(id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('user:removeProductFromCart', id, false);
        });
    }
    addToCart(product, index) {
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
                        this.presentAlert('Admin can not place any order!');
                    }
                    else if (role === 'deliveryAgent') {
                        this.presentAlert('Delivery agent can not place any order!');
                    }
                    else {
                        yield this.presentLoading();
                        const cartObj = {
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
                        this.events.publish('user:addProductToCart', cartObj, false);
                        this.bsProducts[index].inCart = true;
                    }
                }));
            }
        });
    }
    onClickProduct(id) {
        const navigationExtras = {
            state: {
                productId: id
            }
        };
        this.router.navigate(['product-details'], navigationExtras);
    }
    priceListAddToCart(product) {
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
                        this.presentAlert('Admin can not place any order!');
                    }
                    else if (role === 'deliveryAgent') {
                        this.presentAlert('Delivery agent can not place any order!');
                    }
                    else {
                        let listOfWeights = [];
                        for (let i = 0; i < product.data.priceList.length; i++) {
                            listOfWeights.push(product.data.priceList[i].weight);
                        }
                        product.data.priceList.map((entry) => {
                            entry.quantity = 0;
                        });
                        this.modalController.create({
                            component: src_app_pricelist_modal_pricelist_modal_page__WEBPACK_IMPORTED_MODULE_7__["PricelistModalPage"],
                            cssClass: 'auto-height',
                            componentProps: {
                                product: product,
                                listOfWeights: listOfWeights,
                                cartProducts: this.cartProducts
                            }
                        })
                            .then(modalEl => {
                            modalEl.present();
                        });
                    }
                }));
            }
        });
    }
    getDiscountedProduct(price, discount) {
        let discountedPrice = Math.ceil(price - (price * ((discount * 1) / 100)));
        return discountedPrice;
    }
    removeSubscriptions() {
        this.events.unsubscribe('product:publishAllSubscribedCategories');
        this.events.unsubscribe('product:noCategoryAvailable');
        this.events.unsubscribe('auth:logoutSuccess');
        this.events.unsubscribe('makeUnreadAdminMsgsZero');
        this.events.unsubscribe('banners:publishSubscribedBanners');
        this.events.unsubscribe('best-sellers:publishBestSellersForShopCategory');
    }
};
ShopCategoriesPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"] },
    { type: src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_6__["ChatService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonRouterOutlet"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonRouterOutlet"])
], ShopCategoriesPage.prototype, "routerOutlet", void 0);
ShopCategoriesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-shop-categories',
        template: __webpack_require__(/*! raw-loader!./shop-categories.page.html */ "./node_modules/raw-loader/index.js!./src/app/shop/shop-categories/shop-categories.page.html"),
        styles: [__webpack_require__(/*! ./shop-categories.page.scss */ "./src/app/shop/shop-categories/shop-categories.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"], _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"], src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_6__["ChatService"]])
], ShopCategoriesPage);



/***/ })

}]);
//# sourceMappingURL=shop-shop-categories-shop-categories-module-es2015.js.map