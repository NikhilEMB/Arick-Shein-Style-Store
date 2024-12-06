(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-products-admin-products-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-products/admin-products.page.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-products/admin-products.page.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <div class=\"search-bx\">\r\n      <ion-searchbar mode=\"ios\" placeholder=\"Search products\" [(ngModel)]=\"searchProduct\"\r\n        (ngModelChange)=\"fireSearchQuery()\"></ion-searchbar>\r\n    </div>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"goToAddNew()\" size='small'>\r\n      <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n      Add new Product\r\n    </ion-button>\r\n\r\n    <!-- !!! To Be Removed -->\r\n    <!-- <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"exportConfirm()\" size='small'\r\n      *ngIf=\"userRole != 'vendor'\">\r\n      Export Products\r\n    </ion-button>\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"importProducts()\" size='small'\r\n      *ngIf=\"userRole != 'vendor'\">\r\n      Import Products\r\n    </ion-button> -->\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-no-padding\">\r\n  <div class=\"main-container\" style=\"width: 100%;\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=2 id=\"scroll1\" *ngIf=\"userRole != 'vendor'\">\r\n          <div class=\"statusList\">\r\n            <p id=\"status1\" (click)=\"showAllProducts()\">All Products</p>\r\n            <p id=\"status2\" (click)=\"getCategories()\" [ngClass]=\"dataType == 'categories' ? 'flexDisplay' : ''\">\r\n              Categories\r\n              <span>\r\n                &nbsp;&nbsp;<strong>{{dataType == 'categories' ? '▲' : '▼'}}</strong>\r\n              </span>\r\n            </p>\r\n            <div class=\"statusList\" *ngIf=\"dataType == 'categories'\">\r\n              <div *ngFor=\"let item of dataList,let i = index\">\r\n                <p (click)='showSubList(i)' style=\"display: flex;justify-content: space-between;\" [id]=\"'category' + i\">\r\n                  {{item.name}}\r\n                  <span\r\n                    *ngIf='item.sublist && item.sublist.length > 0 && !item.active'>&nbsp;&nbsp;<strong>▼</strong></span>\r\n                  <span\r\n                    *ngIf='item.sublist && item.sublist.length > 0 && item.active'>&nbsp;&nbsp;<strong>▲</strong></span>\r\n                </p>\r\n                <div *ngIf='item.active'>\r\n                  <ng-container *ngFor='let subItem of item.sublist,let j = index'>\r\n                    \r\n                    <p (click)=\"showSubOfSubList(i,j)\" style=\"display: flex;justify-content: space-between;\"\r\n                      [id]=\"'subCategory' + j\">\r\n                      <span>{{(subItem.active && subItem.subOfSubCatList?.length > 0) ? '▼' : 'ᐅ'}}&nbsp;&nbsp;</span>{{subItem.name}}\r\n                    </p>\r\n                    <ng-container *ngIf=\"subItem.active && subItem.subOfSubCatList\">\r\n                      <p *ngFor=\"let subOfSubCat of subItem.subOfSubCatList,index as k\" (click)='selectSubOfSubCat(i,j,k)'\r\n                        [id]=\"'subOfSubCategory' + k\" style=\"display: flex;justify-content: space-between;\">\r\n                        {{subOfSubCat.name}}\r\n                      </p>\r\n                    </ng-container>\r\n                  \r\n                  </ng-container>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <p id=\"status3\" (click)=\"getBrands()\" [ngClass]=\"dataType == 'brands' ? 'flexDisplay' : ''\">Brands\r\n              <span *ngIf=\"dataType == 'brands'\">&nbsp;&nbsp;<strong>▼</strong></span>\r\n            </p>\r\n            <div class=\"statusList\" *ngIf=\"dataType ==  'brands'\">\r\n              <div *ngFor=\"let item of dataList,let i = index\">\r\n                <p (click)='selectListItem(i)' [id]=\"'brand' + i\">{{item.name}}</p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=10 id=\"scroll2\">\r\n          <div class=\"no-data\" *ngIf=\"showNoProducts\" text-center>\r\n            <img src=\"assets/img/no-product.png\" alt=\"\">\r\n            <h6>No products</h6>\r\n          </div>\r\n          <div *ngIf=\"showSearchLoader\" class=\"spinner\">\r\n            <ion-spinner color=\"primary\"></ion-spinner>\r\n          </div>\r\n\r\n          <!-- heading -->\r\n\r\n          <div class=\"list-header\"\r\n            *ngIf=\"productsData && productsData.length !== 0 && !showNoProducts && !showSearchLoader\"\r\n            style=\"margin-left: 12px;\">\r\n            <ion-grid class=\"ion-no-padding\">\r\n              <ion-row class=\"ion-align-items-center ion-justify-content-center\" class=\"total-products\"\r\n                *ngIf=\"dataType == ''\">\r\n                <ion-col size=\"6\" style=\"text-align: left;font-size: larger;text-decoration: underline;\"\r\n                  *ngIf=\"!totalProductsLoader && userRole != 'vendor'\">\r\n                  Total Products: {{totalProducts}}\r\n                </ion-col>\r\n                <!-- <ion-col size=\"6\" style=\"text-align: end;\" *ngIf=\"totalProductsLoader && userRole != 'vendor'\">\r\n                  <ion-spinner name=\"dots\" style=\"width: 20px;\"></ion-spinner>\r\n                </ion-col> -->\r\n                <!-- Vendor Login -->\r\n                <ion-col size=\"12\" *ngIf=\"userRole == 'vendor'\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>Make All Approved Products Inactive</ion-label>\r\n                      <ion-toggle [(ngModel)]=\"productsInactive\"></ion-toggle>\r\n                    </div>\r\n                    <ion-button class=\"m-l-16\" (click)=\"setAllProductsInactive()\" fill=\"outline\" shape=\"round\"\r\n                      size=\"small\">\r\n                      Save\r\n                    </ion-button>\r\n                  </div>\r\n                </ion-col>\r\n                <!-- Vendor Login end -->\r\n              </ion-row>\r\n              <ion-row>\r\n                <ion-col class=\"img\">\r\n                  <p>Image</p>\r\n                </ion-col>\r\n                <ion-col class=\"name\">\r\n                  <p>Name</p>\r\n                </ion-col>\r\n                <ion-col class=\"price\">\r\n                  <p>Price</p>\r\n                </ion-col>\r\n                <ion-col class=\"price\">\r\n                  <p>Discount Price</p>\r\n                </ion-col>\r\n                <ion-col class=\"price\">\r\n                  <p>QTY</p>\r\n                </ion-col>\r\n                <ion-col class=\"price\">\r\n                  <p>Purchase Price</p>\r\n                </ion-col>\r\n                <ion-col class=\"action\">\r\n                  <p>Action</p>\r\n                </ion-col>\r\n                <!-- <ion-col class=\"action\">\r\n                  <p>Colors</p>\r\n                </ion-col> -->\r\n\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <!-- heading -->\r\n          <!-- product  list -->\r\n          <div class=\"no-data\" *ngIf=\"productsData && productsData.length == 0\" text-center>\r\n            <img src=\"assets/img/no-product.png\" alt=\"\">\r\n            <h6>No products</h6>\r\n          </div>\r\n\r\n          <div class=\"list-container\"\r\n            *ngIf=\"productsData && productsData.length !== 0 && !showNoProducts && !showSearchLoader\">\r\n            <ion-list class=\"categories-list\">\r\n              <ion-item class=\"ion-no-padding\" no-lines no-border *ngFor=\"let item of productsData; let i = index\">\r\n                <div class=\"detail-wrapper\">\r\n                  <div class=\"product-wrapper\">\r\n                    <ion-grid class=\"ion-no-padding ion-align-items-center\">\r\n\r\n                      <ion-row class=\"row-background ion-align-items-center\">\r\n                        <ion-col class=\"img\">\r\n                          <ion-thumbnail style=\"margin-left: 5%;\" class=\"product-img-wrapper\">\r\n                            <img class=\"loading\"\r\n                              *ngIf=\"item.data.coverPic && !item.data.coverPic.thumb && item.data.coverPic.url\"\r\n                              src=\"{{item.data.coverPic.url}}\">\r\n                            <img class=\"loading\" *ngIf=\"item.data.coverPic && item.data.coverPic.thumb\"\r\n                              src=\"{{item.data.coverPic.thumb}}\">\r\n                            <img *ngIf=\"!item.data.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n                          </ion-thumbnail>\r\n                          <div class=\"out-of-stock\" *ngIf=\"checkPdtOutOfDelivery(item)\">\r\n                            Out of stock\r\n                          </div>\r\n                        </ion-col>\r\n                        <ion-col (click)=\"editProduct(item)\" class=\"name\">\r\n                          <div [ngClass]=\"{'product-active': item.data.status, 'product-inactive': !item.data.status}\">\r\n                          </div>\r\n                          <p text-capitalize text-center>{{item.data.prodName}}<br>{{'(SKU - '}}{{item.data.productCode || 'NA'}}{{')'}}&nbsp;&nbsp;\r\n                            <span style=\"color: red;\"\r\n                              *ngIf=\"item.data.productType && item.data.productType == 'appointment' \">\r\n                              (Appointment)\r\n                            </span>\r\n                          </p>\r\n                        </ion-col>\r\n\r\n\r\n                        <ion-col class=\"price\">\r\n                          <span *ngIf=\"!item.data.isPriceList\">\r\n                            <ion-input type=\"number\" min=\"0\" class=\"form-input\" [(ngModel)]=\"item.data.prodPrice\"></ion-input>\r\n                          </span>\r\n                        </ion-col>\r\n                        <ion-col class=\"price\">\r\n                          <span *ngIf=\"!item.data.isPriceList\">\r\n                            <ion-input type=\"number\" min=\"0\" class=\"form-input\" [(ngModel)]=\"item.data.discountedPrice\">\r\n                            </ion-input>\r\n                          </span>\r\n                        </ion-col>\r\n                        <ion-col class=\"price\">\r\n                          <span *ngIf=\"!item.data.isPriceList\">\r\n                            <ion-input type=\"text\" min=\"0\"\r\n                              [ngClass]=\"{'form-input':true,'out-of-stock-input':item.data.productQty == '0'}\"\r\n                              [(ngModel)]=\"item.data.productQty\"></ion-input>\r\n                          </span>\r\n                        </ion-col>\r\n                        <ion-col class=\"price\">\r\n                          <span *ngIf=\"!item.data.isPriceList\">\r\n                            <ion-input type=\"number\" min=\"0\" class=\"form-input\" [(ngModel)]=\"item.data.purchasePrice\">\r\n                            </ion-input>\r\n                          </span>\r\n                        </ion-col>\r\n                        <ion-col class=\"action\">\r\n                          <ion-button (click)=\"saveProduct(item.data, item.id)\" color=\"success\" fill=\"outline\"\r\n                            shape=\"round\" size=\"small\">\r\n                            Save\r\n                          </ion-button>&nbsp;\r\n                          <ion-button (click)=\"deleteAlertConfirm(item.id, i)\" color=\"danger\" fill=\"outline\"\r\n                            shape=\"round\" size=\"small\">\r\n                            Delete\r\n                          </ion-button>&nbsp;\r\n                          <ion-button\r\n                            *ngIf=\"item.data.options?.length > 0 && (!item.data.productType || (item.data.productType && item.data.productType != 'appointment'))\"\r\n                            (click)=\"viewProductOptions(item.id)\" color=\"dark\" fill=\"outline\" shape=\"round\"\r\n                            size=\"small\">\r\n                            View\r\n                          </ion-button>&nbsp;\r\n                          <ion-button\r\n                            *ngIf=\"item.data.options?.length > 0 && (!item.data.productType || (item.data.productType && item.data.productType != 'appointment'))\"\r\n                            (click)=\"addProductOptions(item)\" color=\"dark\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                            Add More\r\n                          </ion-button>\r\n                          <ion-button\r\n                            *ngIf=\"(!item.data.options || !item.data.options.length) && (!item.data.productType || (item.data.productType && item.data.productType != 'appointment'))\"\r\n                            color=\"dark\" fill=\"outline\" shape=\"round\" size=\"small\" (click)=\"addProductOptions(item)\"\r\n                            class=\"add-options-icon\">\r\n                            Add\r\n                          </ion-button>\r\n\r\n                          <!-- <ion-col class=\"productViews\">\r\n                            <ion-button color=\"dark\" fill=\"outline\"  shape=\"round\" (click)=\"presentViewsPopover($event, item.id)\" >\r\n                              <ion-icon name=\"eye\"></ion-icon>\r\n                            </ion-button>\r\n                          </ion-col> -->\r\n                        </ion-col>\r\n                        \r\n                      </ion-row>\r\n                    </ion-grid>\r\n                  </div>\r\n                  <div class=\"variant-wrapper\" *ngIf=\"item.data.isPriceList\">\r\n                    <ion-grid>\r\n                      <!--<ion-row>\r\n                        <ion-col class=\"variant-title\">Variant Title</ion-col>\r\n                        <ion-col class=\"variant-price\">Price</ion-col>\r\n                        <ion-col class=\"variant-price\">Discount Price</ion-col>\r\n                        <ion-col class=\"variant-price\">QTY</ion-col>\r\n                        <ion-col class=\"variant-action\"></ion-col>\r\n                      </ion-row>-->\r\n                      <ion-row *ngFor=\"let variant of item.data.priceList; let i=index\">\r\n                        <ion-col class=\"variant-title\">\r\n                          <div class=\"variant-title-text\">{{variant.weight}}</div>\r\n                        </ion-col>\r\n                        <ion-col class=\"variant-price\">\r\n                          <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"variant.price\"></ion-input>\r\n                        </ion-col>\r\n                        <ion-col class=\"variant-price\">\r\n                          <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"variant.discountedPrice\"></ion-input>\r\n                        </ion-col>\r\n                        <ion-col class=\"variant-price\">\r\n                          <ion-input [ngClass]=\"{'form-input':true,'out-of-stock-input':variant.totalQuantity == '0'}\"\r\n                            type=\"text\" [(ngModel)]=\"variant.totalQuantity\"></ion-input>\r\n                        </ion-col>\r\n                        <ion-col class=\"variant-price\">\r\n                          <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"variant.purchasePrice\"></ion-input>\r\n                        </ion-col>\r\n                        <ion-col class=\"variant-action\"></ion-col>\r\n                      </ion-row>\r\n                    </ion-grid>\r\n                  </div>\r\n                </div>\r\n              </ion-item>\r\n            </ion-list>\r\n\r\n            <ng-container *ngIf=\"searchProduct !== ''\">\r\n              <div class=\"loadMore\">\r\n                <ion-button (click)=\"searchMoreProducts()\" size=\"small\" shape=\"round\" [disabled]=\"loadMoreTypeSense\">\r\n                  Load more\r\n                </ion-button>\r\n              </div>\r\n            </ng-container>\r\n\r\n            <ion-grid\r\n              *ngIf=\"productsData && productsData.length !== 0 && !showNoProducts && !showSearchLoader && !searchProduct\">\r\n              <ion-row *ngIf=\"dataType == ''\">\r\n                <ion-col style=\"text-align: start;\">\r\n                  <ion-button (click)=\"loadPreviousProducts()\" size=\"small\" shape=\"round\"\r\n                    [disabled]=\"noPreviousProducts\">\r\n                    <span><i class=\"flaticon-null-8\"></i></span>Previous\r\n                  </ion-button>\r\n                </ion-col>\r\n                <ion-col>\r\n                  <ion-button (click)=\"loadMoreProducts()\" size=\"small\" shape=\"round\" [disabled]=\"noMoreProducts\">\r\n                    Next <span><i class=\"flaticon-null-7\"></i></span>\r\n                  </ion-button>\r\n                </ion-col>\r\n              </ion-row>\r\n              <ion-row *ngIf=\"dataType == 'categories' && selectedSubcatId\">\r\n                <ion-col class=\"t-a-c\">\r\n                  <ion-button (click)=\"loadMoreCategoryProducts()\" size=\"small\" shape=\"round\" [disabled]=\"noMoreCategoryProducts\">\r\n                    Load More \r\n                  </ion-button>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/admin-products/admin-products.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/admin-products/admin-products.module.ts ***!
  \***************************************************************/
/*! exports provided: AdminProductsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminProductsPageModule", function() { return AdminProductsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_products_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-products.page */ "./src/app/admin/admin-products/admin-products.page.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.js");








const routes = [
    {
        path: '',
        component: _admin_products_page__WEBPACK_IMPORTED_MODULE_6__["AdminProductsPage"]
    }
];
let AdminProductsPageModule = class AdminProductsPageModule {
};
AdminProductsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__["Ng2SearchPipeModule"]
        ],
        declarations: [_admin_products_page__WEBPACK_IMPORTED_MODULE_6__["AdminProductsPage"]]
    })
], AdminProductsPageModule);



/***/ }),

/***/ "./src/app/admin/admin-products/admin-products.page.scss":
/*!***************************************************************!*\
  !*** ./src/app/admin/admin-products/admin-products.page.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-col.img, ion-col.qty {\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.price {\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.name {\n  width: 150px;\n  max-width: 150px;\n  cursor: pointer;\n  word-break: break-word;\n}\n\nion-col.action {\n  text-align: center;\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.variant-title {\n  width: 450px;\n}\n\nion-col.variant-title .variant-title-text {\n  display: block;\n  text-align: right;\n  width: 100%;\n}\n\nion-col.variant-price {\n  width: 100px;\n  max-width: 100px;\n}\n\n.form-input {\n  margin-top: 0;\n}\n\n.product-img-wrapper {\n  position: relative;\n}\n\n.out-of-stock-input {\n  background: red;\n  color: #fff;\n}\n\n.out-of-stock {\n  width: 97px;\n  position: absolute;\n  color: red;\n  top: 50%;\n  left: 40%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  text-align: center;\n  text-shadow: 0px 1px 1px #3c3c3c;\n  background: white;\n  background-color: rgba(255, 255, 255, 0.9);\n  text-transform: uppercase;\n  font-size: 10px;\n  padding: 3px;\n}\n\n.product-active {\n  background-color: green;\n  width: 8px;\n  height: 8px;\n  min-width: 8px;\n  border-radius: 30px;\n  border: 1px solid green;\n  margin-right: 10%;\n}\n\n.product-inactive {\n  background-color: red;\n  width: 8px;\n  height: 8px;\n  min-width: 8px;\n  border-radius: 30px;\n  border: 1px solid red;\n  margin-right: 10%;\n}\n\n.form-input {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\nion-item.sc-ion-input-md-h:not(.item-label), ion-item:not(.item-label) .sc-ion-input-md-h {\n  --padding-start: 10px;\n}\n\n.add-btn {\n  margin-right: 20px;\n}\n\n.statusList {\n  text-align: center;\n}\n\n.statusList p {\n  font-size: medium;\n  border: 1px solid lightgray;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n}\n\n.backBtn {\n  display: -webkit-box;\n  display: flex;\n  width: 150px;\n  margin: auto;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 82vh;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 82vh;\n  border-left: 1px solid lightgray;\n  border-right: 1px solid lightgray;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1 {\n    height: 92vh;\n  }\n\n  #scroll2 {\n    height: 92vh;\n  }\n}\n\n@media screen and (max-width: 1440px) {\n  .list-header {\n    width: 1140px;\n  }\n}\n\n@media screen and (max-width: 1200px) {\n  .list-header {\n    width: 900px;\n  }\n}\n\n@media screen and (max-width: 1024px) {\n  .list-header {\n    width: 800px;\n  }\n}\n\n.flexDisplay {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.loadMore {\n  margin: 1rem auto;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tcHJvZHVjdHMvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxhZG1pbi1wcm9kdWN0c1xcYWRtaW4tcHJvZHVjdHMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZG1pbi1wcm9kdWN0cy9hZG1pbi1wcm9kdWN0cy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUNBRjs7QURHQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQ0FGOztBREdBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLHNCQUFBO0FDQUY7O0FESUE7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0RGOztBRElBO0VBQ0UsWUFBQTtBQ0RGOztBREVFO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtBQ0FKOztBREdBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0FDQUY7O0FER0E7RUFDRSxhQUFBO0FDQUY7O0FER0E7RUFDRSxrQkFBQTtBQ0FGOztBREdBO0VBQ0UsZUFBQTtFQUNBLFdBQUE7QUNBRjs7QURHQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLHdDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxrQkFBQTtFQUNBLGdDQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQ0FBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUNBRjs7QURHQTtFQUNFLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGlCQUFBO0FDQUY7O0FER0E7RUFDRSxxQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtBQ0FGOztBREdBO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtBQ0FGOztBREdBO0VBQ0cscUJBQUE7QUNBSDs7QURHQTtFQUNFLGtCQUFBO0FDQUY7O0FER0E7RUFDRSxrQkFBQTtBQ0FGOztBRENFO0VBQ0UsaUJBQUE7RUFDQSwyQkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREdBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QUNBRjs7QURHQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtBQ0FGOztBREdBO0VBQ0UsZ0JBQUE7QUNBRjs7QURHQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGdDQUFBO0VBQ0EsaUNBQUE7QUNBRjs7QURHQTtFQUNFLGdCQUFBO0FDQUY7O0FER0E7RUFDRTtJQUNJLFlBQUE7RUNBSjs7RURFQTtJQUNJLFlBQUE7RUNDSjtBQUNGOztBREVBO0VBQ0U7SUFDRSxhQUFBO0VDQUY7QUFDRjs7QURHQTtFQUNFO0lBQ0UsWUFBQTtFQ0RGO0FBQ0Y7O0FESUE7RUFDRTtJQUNFLFlBQUE7RUNGRjtBQUNGOztBRE1BO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtBQ0pGOztBRE9BO0VBQ0UsaUJBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBQ0pGIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vYWRtaW4tcHJvZHVjdHMvYWRtaW4tcHJvZHVjdHMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmlvbi1jb2wuaW1nLCBpb24tY29sLnF0eXtcclxuICB3aWR0aDogMTAwcHg7XHJcbiAgbWF4LXdpZHRoOiAxMDBweDtcclxufVxyXG5cclxuaW9uLWNvbC5wcmljZXtcclxuICB3aWR0aDoxMDBweDtcclxuICBtYXgtd2lkdGg6IDEwMHB4O1xyXG59XHJcblxyXG5pb24tY29sLm5hbWV7XHJcbiAgd2lkdGg6IDE1MHB4O1xyXG4gIG1heC13aWR0aDogMTUwcHg7XHJcbiAgY3Vyc29yOnBvaW50ZXI7XHJcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcclxuICAvLyBvdmVyZmxvdzogYXV0bztcclxufVxyXG5cclxuaW9uLWNvbC5hY3Rpb257XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHdpZHRoOiAxMDBweDtcclxuICBtYXgtd2lkdGg6IDEwMHB4O1xyXG59XHJcblxyXG5pb24tY29sLnZhcmlhbnQtdGl0bGV7XHJcbiAgd2lkdGg6IDQ1MHB4O1xyXG4gIC52YXJpYW50LXRpdGxlLXRleHR7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gICAgd2lkdGg6IDEwMCU7fVxyXG59XHJcblxyXG5pb24tY29sLnZhcmlhbnQtcHJpY2V7XHJcbiAgd2lkdGg6MTAwcHggO1xyXG4gIG1heC13aWR0aDogMTAwcHg7XHJcbn1cclxuXHJcbi5mb3JtLWlucHV0IHsgXHJcbiAgbWFyZ2luLXRvcDogMDtcclxufVxyXG5cclxuLnByb2R1Y3QtaW1nLXdyYXBwZXIge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuLm91dC1vZi1zdG9jay1pbnB1dHtcclxuICBiYWNrZ3JvdW5kOnJlZDtcclxuICBjb2xvcjojZmZmO1xyXG59XHJcblxyXG4ub3V0LW9mLXN0b2NrIHtcclxuICB3aWR0aDogOTdweDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgY29sb3I6IHJlZDtcclxuICB0b3A6IDUwJTtcclxuICBsZWZ0OiA0MCU7XHJcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgdGV4dC1zaGFkb3c6IDBweCAxcHggMXB4ICMzYzNjM2M7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwgMC45KTtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIGZvbnQtc2l6ZTogMTBweDtcclxuICBwYWRkaW5nOiAzcHg7XHJcbn1cclxuXHJcbi5wcm9kdWN0LWFjdGl2ZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XHJcbiAgd2lkdGg6IDhweDtcclxuICBoZWlnaHQ6IDhweDtcclxuICBtaW4td2lkdGg6IDhweDtcclxuICBib3JkZXItcmFkaXVzOiAzMHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyZWVuO1xyXG4gIG1hcmdpbi1yaWdodDogMTAlO1xyXG59XHJcblxyXG4ucHJvZHVjdC1pbmFjdGl2ZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xyXG4gIHdpZHRoOiA4cHg7XHJcbiAgaGVpZ2h0OiA4cHg7XHJcbiAgbWluLXdpZHRoOiA4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XHJcbiAgbWFyZ2luLXJpZ2h0OiAxMCU7XHJcbn1cclxuXHJcbi5mb3JtLWlucHV0e1xyXG4gIHBhZGRpbmctbGVmdDogOHB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDhweDtcclxufVxyXG5cclxuaW9uLWl0ZW0uc2MtaW9uLWlucHV0LW1kLWg6bm90KC5pdGVtLWxhYmVsKSwgaW9uLWl0ZW06bm90KC5pdGVtLWxhYmVsKSAuc2MtaW9uLWlucHV0LW1kLWgge1xyXG4gICAtLXBhZGRpbmctc3RhcnQ6IDEwcHg7IFxyXG59XHJcblxyXG4uYWRkLWJ0bntcclxuICBtYXJnaW4tcmlnaHQ6MjBweDtcclxufVxyXG5cclxuLnN0YXR1c0xpc3R7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHB7XHJcbiAgICBmb250LXNpemU6IG1lZGl1bTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBtYXJnaW46IDhweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcbn1cclxuXHJcbi5iYWNrQnRuIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHdpZHRoOiAxNTBweDtcclxuICBtYXJnaW46IGF1dG87XHJcbn1cclxuXHJcbiNzY3JvbGwxe1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiA4MnZoXHJcbn1cclxuXHJcbiNzY3JvbGwxOmhvdmVye1xyXG4gIG92ZXJmbG93LXk6IGF1dG9cclxufVxyXG5cclxuI3Njcm9sbDJ7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDgydmg7XHJcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgbGlnaHRncmF5O1xyXG59XHJcblxyXG4jc2Nyb2xsMjpob3ZlcntcclxuICBvdmVyZmxvdy15OiBhdXRvXHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xyXG4gICNzY3JvbGwxe1xyXG4gICAgICBoZWlnaHQ6IDkydmg7XHJcbiAgfVxyXG4gICNzY3JvbGwye1xyXG4gICAgICBoZWlnaHQ6IDkydmg7XHJcbiAgfVxyXG5cclxufVxyXG5AbWVkaWEgc2NyZWVuIGFuZChtYXgtd2lkdGg6IDE0NDBweCkge1xyXG4gIC5saXN0LWhlYWRlcntcclxuICAgIHdpZHRoOiAxMTQwcHggOyBcclxuICAgfVxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZChtYXgtd2lkdGg6IDEyMDBweCkge1xyXG4gIC5saXN0LWhlYWRlcntcclxuICAgIHdpZHRoOiA5MDBweCA7IFxyXG4gICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1heC13aWR0aDogMTAyNHB4KSB7XHJcbiAgLmxpc3QtaGVhZGVye1xyXG4gICAgd2lkdGg6IDgwMHB4IDsgXHJcbiAgfVxyXG59XHJcblxyXG5cclxuLmZsZXhEaXNwbGF5IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlblxyXG59XHJcblxyXG4ubG9hZE1vcmV7XHJcbiAgbWFyZ2luOiAxcmVtIGF1dG87XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59IiwiaW9uLWNvbC5pbWcsIGlvbi1jb2wucXR5IHtcbiAgd2lkdGg6IDEwMHB4O1xuICBtYXgtd2lkdGg6IDEwMHB4O1xufVxuXG5pb24tY29sLnByaWNlIHtcbiAgd2lkdGg6IDEwMHB4O1xuICBtYXgtd2lkdGg6IDEwMHB4O1xufVxuXG5pb24tY29sLm5hbWUge1xuICB3aWR0aDogMTUwcHg7XG4gIG1heC13aWR0aDogMTUwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcbn1cblxuaW9uLWNvbC5hY3Rpb24ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDBweDtcbiAgbWF4LXdpZHRoOiAxMDBweDtcbn1cblxuaW9uLWNvbC52YXJpYW50LXRpdGxlIHtcbiAgd2lkdGg6IDQ1MHB4O1xufVxuaW9uLWNvbC52YXJpYW50LXRpdGxlIC52YXJpYW50LXRpdGxlLXRleHQge1xuICBkaXNwbGF5OiBibG9jaztcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG5pb24tY29sLnZhcmlhbnQtcHJpY2Uge1xuICB3aWR0aDogMTAwcHg7XG4gIG1heC13aWR0aDogMTAwcHg7XG59XG5cbi5mb3JtLWlucHV0IHtcbiAgbWFyZ2luLXRvcDogMDtcbn1cblxuLnByb2R1Y3QtaW1nLXdyYXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5vdXQtb2Ytc3RvY2staW5wdXQge1xuICBiYWNrZ3JvdW5kOiByZWQ7XG4gIGNvbG9yOiAjZmZmO1xufVxuXG4ub3V0LW9mLXN0b2NrIHtcbiAgd2lkdGg6IDk3cHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgY29sb3I6IHJlZDtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDQwJTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdGV4dC1zaGFkb3c6IDBweCAxcHggMXB4ICMzYzNjM2M7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSk7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgcGFkZGluZzogM3B4O1xufVxuXG4ucHJvZHVjdC1hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcbiAgd2lkdGg6IDhweDtcbiAgaGVpZ2h0OiA4cHg7XG4gIG1pbi13aWR0aDogOHB4O1xuICBib3JkZXItcmFkaXVzOiAzMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCBncmVlbjtcbiAgbWFyZ2luLXJpZ2h0OiAxMCU7XG59XG5cbi5wcm9kdWN0LWluYWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xuICB3aWR0aDogOHB4O1xuICBoZWlnaHQ6IDhweDtcbiAgbWluLXdpZHRoOiA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbiAgbWFyZ2luLXJpZ2h0OiAxMCU7XG59XG5cbi5mb3JtLWlucHV0IHtcbiAgcGFkZGluZy1sZWZ0OiA4cHg7XG4gIHBhZGRpbmctcmlnaHQ6IDhweDtcbn1cblxuaW9uLWl0ZW0uc2MtaW9uLWlucHV0LW1kLWg6bm90KC5pdGVtLWxhYmVsKSwgaW9uLWl0ZW06bm90KC5pdGVtLWxhYmVsKSAuc2MtaW9uLWlucHV0LW1kLWgge1xuICAtLXBhZGRpbmctc3RhcnQ6IDEwcHg7XG59XG5cbi5hZGQtYnRuIHtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xufVxuXG4uc3RhdHVzTGlzdCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5zdGF0dXNMaXN0IHAge1xuICBmb250LXNpemU6IG1lZGl1bTtcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICBwYWRkaW5nOiAxMHB4O1xuICBtYXJnaW46IDhweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYmFja0J0biB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHdpZHRoOiAxNTBweDtcbiAgbWFyZ2luOiBhdXRvO1xufVxuXG4jc2Nyb2xsMSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogODJ2aDtcbn1cblxuI3Njcm9sbDE6aG92ZXIge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG4jc2Nyb2xsMiB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogODJ2aDtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cblxuI3Njcm9sbDI6aG92ZXIge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLWhlaWdodDogMTIwMHB4KSB7XG4gICNzY3JvbGwxIHtcbiAgICBoZWlnaHQ6IDkydmg7XG4gIH1cblxuICAjc2Nyb2xsMiB7XG4gICAgaGVpZ2h0OiA5MnZoO1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxNDQwcHgpIHtcbiAgLmxpc3QtaGVhZGVyIHtcbiAgICB3aWR0aDogMTE0MHB4O1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMjAwcHgpIHtcbiAgLmxpc3QtaGVhZGVyIHtcbiAgICB3aWR0aDogOTAwcHg7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDEwMjRweCkge1xuICAubGlzdC1oZWFkZXIge1xuICAgIHdpZHRoOiA4MDBweDtcbiAgfVxufVxuLmZsZXhEaXNwbGF5IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4ubG9hZE1vcmUge1xuICBtYXJnaW46IDFyZW0gYXV0bztcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/admin-products/admin-products.page.ts":
/*!*************************************************************!*\
  !*** ./src/app/admin/admin-products/admin-products.page.ts ***!
  \*************************************************************/
/*! exports provided: AdminProductsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminProductsPage", function() { return AdminProductsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/product/product.service */ "./src/app/services/product/product.service.ts");
/* harmony import */ var src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/brands/brands.service */ "./src/app/services/brands/brands.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var _admin_shop_new_product_product_type_product_type_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../admin-shop/new-product/product-type/product-type.component */ "./src/app/admin/admin-shop/new-product/product-type/product-type.component.ts");
/* harmony import */ var src_app_services_filters_filters_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/filters/filters.service */ "./src/app/services/filters/filters.service.ts");
/* harmony import */ var src_app_analytics_views_count_popover_views_count_popover_page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/analytics/views-count-popover/views-count-popover.page */ "./src/app/analytics/views-count-popover/views-count-popover.page.ts");



// import { AngularFirestore } from '@angular/fire/firestore';



// import { UserService } from 'src/app/services/user/user.service';







let AdminProductsPage = class AdminProductsPage {
    constructor(modalController, events, 
    // private afs: AngularFirestore,
    router, loadingController, alertController, filtersService, productService, 
    // private userService: UserService,
    platform, storage, toastController, brandService, vendorService, popoverController) {
        this.modalController = modalController;
        this.events = events;
        this.router = router;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.filtersService = filtersService;
        this.productService = productService;
        this.platform = platform;
        this.storage = storage;
        this.toastController = toastController;
        this.brandService = brandService;
        this.vendorService = vendorService;
        this.popoverController = popoverController;
        this.productsData = [];
        this.allProductsData = [];
        this.prod = [];
        this.showNoProducts = false;
        this.searchProduct = '';
        this.noMoreProducts = false;
        this.doneTypingInterval = 1000;
        this.showSearch = false;
        this.showSearchLoader = false;
        this.noPreviousProducts = true;
        this.totalProductsLoader = true;
        this.page = 0;
        this.noMoreSearchProducts = false;
        this.options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            filename: 'Products',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: false,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };
        this.previousId = 'status1';
        this.dataList = [];
        this.dataType = '';
        this.previousBrand = 'brand0';
        this.previousCategory = 'category0';
        this.previousListItem = 'status1';
        this.noMoreCategoryProducts = false;
        this.loadMoreTypeSense = false;
        // this.initializeSubscriptions();
    }
    ngOnInit() {
        // this.initializeSubscriptions()
        console.log('getting admin-products');
        // this.events.publish('product:getProductsForAdminProducts');
    }
    saveProduct(itemData, itemID) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.events.subscribe('product:editSuccess', (heading, desc) => {
                //console.log('in edit success sub');
                if (this.editLoader) {
                    this.editLoader.dismiss();
                }
                this.events.unsubscribe('product:editSuccess');
                this.presentAlert(heading, desc);
            });
            this.events.subscribe('product:editFailure', (heading, desc) => {
                if (this.editLoader) {
                    this.editLoader.dismiss();
                }
                this.events.unsubscribe('product:editFailure');
                this.presentAlert(heading, desc);
            });
            let priceListCheck = false;
            if (itemData.isPriceList) {
                let dpList = [];
                let plDiscountList = [];
                for (let index = 0; index < itemData.priceList.length; index++) {
                    if (itemData.priceList[index].discountedPrice === null) {
                        itemData.priceList[index].discountedPrice = itemData.priceList[index].price;
                    }
                    dpList.push(itemData.priceList[index].discountedPrice);
                    const plDiscount = ((itemData.priceList[index].price - itemData.priceList[index].discountedPrice) / itemData.priceList[index].price) * 100;
                    plDiscountList.push(plDiscount);
                    if (itemData.priceList[index].weight === '' || itemData.priceList[index].price === null || itemData.priceList[index].totalQuantity === '') {
                        priceListCheck = true;
                        break;
                    }
                }
                // console.log('priceListCheck', priceListCheck);
                itemData.discountedPrice = Math.min(...dpList);
                itemData.discount = parseFloat((Math.max(...plDiscountList)).toFixed(2));
            }
            else {
                if (itemData.discountedPrice === null) {
                    itemData.discountedPrice = itemData.prodPrice;
                }
                itemData.discount = parseFloat((((itemData.prodPrice - itemData.discountedPrice) / itemData.prodPrice) * 100).toFixed(2));
            }
            if (!itemData.isPriceList && !itemData.prodPrice) {
                this.presentAlert('', 'Please enter product price');
            }
            else if ((itemData.isPriceList && priceListCheck) || (itemData.isPriceList && !itemData.priceList.length)) {
                this.presentAlert('', 'Please enter all variants data of product');
            }
            else {
                this.editLoader = yield this.loadingController.create({
                    message: 'Please Wait...',
                });
                yield this.editLoader.present();
                itemData.updatedAt = new Date();
                //itemData.nameToSearch = itemData.prodName.toLowerCase();
                itemData.discountedPrice = itemData.discountedPrice ? itemData.discountedPrice : null;
                //itemData.searchKeywords = itemData.searchKeywords ? itemData.searchKeywords : [];
                //itemData.productCode = itemData.productCode ? itemData.productCode : '';
                itemData.productQty = itemData.productQty ? itemData.productQty : '';
                //itemData.stopWhenNoQty = itemData.stopWhenNoQty ? itemData.stopWhenNoQty : false;
                //itemData.shippingWeight = itemData.shippingWeight ? itemData.shippingWeight : null;
                // itemData.variantType = itemData.variantType ? itemData.variantType : '';
                //itemData.color = itemData.color ? itemData.color : {};
                //itemData.minQty = itemData.minQty ? itemData.minQty : null;
                ///itemData.maxQty = itemData.maxQty ? itemData.maxQty : null;
                //itemData.gst = itemData.gst ? itemData.gst : null;
                ///itemData.hsnCode = itemData.hsnCode ? itemData.hsnCode : '';
                itemData.purchasePrice = itemData.purchasePrice ? itemData.purchasePrice : null;
                let productData = {
                    discount: itemData.discount,
                    discountedPrice: itemData.discountedPrice,
                    isPriceList: itemData.isPriceList,
                    priceList: itemData.priceList ? itemData.priceList : [],
                    prodPrice: itemData.prodPrice ? itemData.prodPrice : null,
                    productQty: itemData.productQty,
                    purchasePrice: itemData.purchasePrice
                };
                this.events.publish('product:editProduct', productData, itemID, [], '');
            }
        });
    }
    getDateTimeFormat(date) {
        return moment__WEBPACK_IMPORTED_MODULE_7__(date).format('MMM D, YYYY hh:mm a');
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log('ionViewWillEnter admin-prod');
            this.initializeSubscriptions();
            this.devHeight = this.platform.height();
            if (this.searchProduct && this.searchProduct != '') {
                this.fireSearchQuery();
            }
            //console.log('height of device...', this.devHeight);
            console.log("selectedSubcatId", this.selectedSubcatId);
            if (this.selectedSubcatId) {
                let data = yield this.productService.getCategoryProducts(this.selectedSubcatId);
                if (data) {
                    this.productsData = data;
                    console.log('productsData:', this.productsData);
                }
            }
            else {
                this.events.publish('product:getProductsForAdminProducts');
            }
            // this.events.publish('product:getProductsForAdminProducts');
            this.events.publish('product:getAnalyticsProductsCount');
        });
    }
    ionViewWillLeave() {
        console.log('ionViewWillLeave');
        this.showSearch = false;
        this.removeSubscriptions();
    }
    // ngOnDestroy() {
    //   // this.removeSubscriptions();
    // }
    initializeSubscriptions() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.userRole = yield this.storage.get('userRole');
            this.userId = yield this.storage.get('uid');
            if (this.userRole == 'vendor') {
                this.vendorInfo = yield this.vendorService.getVendorData(this.userId, 'details');
                if (this.vendorInfo) {
                    this.productsInactive = this.vendorInfo.productsInactive ? this.vendorInfo.productsInactive : false;
                }
            }
            this.events.subscribe('product:publishProductsForAdminProducts', (products) => {
                console.log('publishProductsForAdminProducts', products);
                console.log('searchProduct', this.searchProduct);
                console.log('page', this.page);
                // if (this.searchProduct && this.page > 1) {
                //   this.productsData.push(...products);
                // } else {
                //   this.productsData = products;
                // }
                if (this.searchProduct === '') {
                    this.page = 0;
                }
                this.productsData = products;
                this.showNoProducts = false;
                this.showSearchLoader = false;
                this.loadMoreTypeSense = false;
                if (this.loading) {
                    this.loading.dismiss();
                }
                console.log('productsData', this.productsData);
            });
            this.events.subscribe('product:publishAllProductsForAdminProducts', (products) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                this.allProductsData = products;
                this.showNoProducts = false;
                this.showSearchLoader = false;
                if (!this.categories) {
                    this.categories = yield this.productService.getAllCategoriesForSideMenu();
                }
                if (!this.brands) {
                    this.brands = yield this.brandService.getAllBrandsForSideMenu();
                }
                if (!this.allSubcategories) {
                    this.allSubcategories = yield this.productService.getAllSubcategoriesForSideMenu();
                }
                this.exportProducts();
            }));
            this.events.subscribe('product:noProductsAvailable', () => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.showNoProducts = true;
                this.showSearchLoader = false;
            });
            this.events.subscribe('product:productsForAdminProductsLimitReached', () => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.noMoreProducts = true;
                this.loading.dismiss();
            });
            this.events.subscribe('product:previousProductsForAdminProductsLimitReached', () => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.noPreviousProducts = true;
                this.loading.dismiss();
            });
            this.events.subscribe('product:deleteSuccess', (heading, msg) => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.presentAlert(heading, msg);
                // this.events.publish('product:getProductsForAdminProducts');
                //this.events.publish('product:getProductsForAdminProducts');
            });
            this.events.subscribe('product:deleteFailure', (heading, msg) => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.presentAlert(heading, msg);
            });
            this.events.subscribe('product:publishAnalyticsProductsCount', (count) => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.totalProducts = count;
                this.totalProductsLoader = false;
            });
            this.events.subscribe('product:makeProductCopiesSuccess', () => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.presentAlert('', 'Options of the product has been added successfully.');
            });
            this.events.subscribe('product:makeProductCopiesFailure', () => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.presentAlert('', 'There is some problem in adding options of the product.');
            });
            this.events.subscribe('search-engine:noAdminSearchProductsAvailable', () => {
                console.log("noAdminSearchProductsAvailable");
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.showNoProducts = true;
                this.showSearchLoader = false;
                this.loadMoreTypeSense = true;
            });
            this.events.subscribe('search-engine:noMoreAdminSearchProducts', () => {
                console.log("noMoreAdminSearchProducts");
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.noMoreSearchProducts = true;
                this.showSearchLoader = false;
                this.loadMoreTypeSense = true;
            });
            this.events.subscribe('product:publishSubcategories', (data) => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.subcateogries = data;
            });
        });
    }
    loadMoreProducts() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            //console.log('loading more data...');
            this.noPreviousProducts = false;
            yield this.presentLoading();
            this.events.publish('product:loadMoreProductsForAdminProducts');
            // this.content.scrollToTop(0);
        });
    }
    loadMoreCategoryProducts() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            console.log("selectedSubCatId: ", this.selectedSubcatId);
            let products = yield this.productService.loadMoreCategoryProducts(this.selectedSubcatId);
            console.log('products:', products);
            if (products && products.length) {
                let result = products.filter(p => p.data.categories.includes(this.selectedSubcatId));
                console.log("filteredResult: ", result);
                this.productsData = result;
                // this.productsData = products;
                this.showNoProducts = false;
                this.showSearchLoader = false;
            }
            else {
                this.noMoreCategoryProducts = true;
            }
            if (this.loading) {
                this.loading.dismiss();
            }
        });
    }
    loadPreviousProducts() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.noMoreProducts = false;
            yield this.presentLoading();
            this.events.publish('product:loadPreviousProductsForAdminProducts');
            // this.content.scrollToTop(0);
        });
    }
    editProduct(item) {
        if (item.data.productType && item.data.productType == 'appointment') {
            const navigationExtras = {
                state: {
                    productId: item.id,
                    productData: item.data
                }
            };
            this.router.navigate(['appointment'], navigationExtras);
        }
        else {
            const navigationExtras = {
                state: {
                    productId: item.id
                }
            };
            this.router.navigate(['new-product'], navigationExtras);
        }
    }
    fireSearchQuery() {
        clearTimeout(this.typingTimer);
        if (this.searchProduct.length > 2) {
            this.typingTimer = setTimeout(() => {
                // console.log('in fireSearchQuery...');
                this.showSearchLoader = true;
                this.page = 1;
                this.events.publish('search-engine:alogoliaSearchProductsForAdmin', this.searchProduct, 0, 'new_search', '');
            }, this.doneTypingInterval);
        }
        else {
            if (!this.searchProduct.length) {
                this.events.publish('product:getProductsForAdminProducts');
            }
        }
    }
    searchMoreProducts() {
        console.log('searchProduct', this.searchProduct);
        console.log('page', this.page);
        if (this.searchProduct) {
            this.page += 1;
            this.events.publish('search-engine:alogoliaSearchProductsForAdmin', this.searchProduct, this.page, 'existing_search', '', this.productsData);
        }
    }
    deleteProduct(itemId, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Please Wait...',
                duration: 3000
            });
            yield this.loading.present();
            this.events.publish('product:deleteProduct', itemId);
            this.productsData.splice(index, 1);
        });
    }
    deleteAlertConfirm(itemId, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Are you sure you want to delete this product',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            //console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Delete',
                        handler: () => {
                            //console.log('Confirm Okay');
                            this.deleteProduct(itemId, index);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    checkForProdLimit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const allProds = yield this.productService.getAllProductsForVendor();
            console.log('this.vendorInfo.productLimit:', this.vendorInfo.productLimit, 'allProd:', allProds.length);
            if ('productLimit' in this.vendorInfo && this.vendorInfo.productLimit != null) {
                if (this.vendorInfo.productLimit > allProds.length) {
                    const modal = yield this.modalController.create({
                        component: _admin_shop_new_product_product_type_product_type_component__WEBPACK_IMPORTED_MODULE_10__["ProductTypeComponent"],
                        cssClass: 'custom-modal small-modal',
                    });
                    yield modal.present();
                }
                else {
                    this.presentAlert('Limit Reached', 'Products Adding Limit Reached, contact admin for more information');
                }
            }
            else {
                const modal = yield this.modalController.create({
                    component: _admin_shop_new_product_product_type_product_type_component__WEBPACK_IMPORTED_MODULE_10__["ProductTypeComponent"],
                    cssClass: 'custom-modal small-modal',
                });
                yield modal.present();
            }
        });
    }
    goToAddNew() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.userRole == 'vendor' && this.vendorInfo) {
                this.checkForProdLimit();
            }
            else {
                const modal = yield this.modalController.create({
                    component: _admin_shop_new_product_product_type_product_type_component__WEBPACK_IMPORTED_MODULE_10__["ProductTypeComponent"],
                    cssClass: 'custom-modal small-modal',
                });
                yield modal.present();
            }
        });
    }
    clearSearchProduct() {
        this.searchProduct = '';
        this.events.publish('product:getProductsForAdminProducts');
    }
    addProductOptions(item) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.copiesAlert = yield this.alertController.create({
                subHeader: 'Add Options',
                message: 'Use this to add different colors or patterns of this product.',
                inputs: [
                    {
                        name: 'copies',
                        type: 'number',
                        placeholder: 'Enter options count (max 10)'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Add',
                        handler: (alertData) => {
                            //console.log(alertData.copies);
                            if (alertData.copies > 10) {
                                this.presentToast('Maximum 10 copies are allowed');
                            }
                            else if (!alertData.copies) {
                                this.presentToast('Please enter a valid number.');
                            }
                            else {
                                this.addOptions(alertData.copies, item);
                            }
                        }
                    }
                ]
            });
            yield this.copiesAlert.present();
        });
    }
    addOptions(copies, item) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.copiesAlert.dismiss();
            yield this.presentLoading();
            this.events.publish('product:makeProductCopies', copies, item);
        });
    }
    viewProductOptions(pid) {
        const navigationExtras = {
            state: {
                pid: pid
            }
        };
        this.router.navigate(['admin-products-options'], navigationExtras);
    }
    checkPdtOutOfDelivery(pdt) {
        //console.log('in checkPdtOutOfDelivery...');
        let isOutOfStock = false;
        if (pdt.data.stopWhenNoQty) {
            if (!pdt.data.isPriceList) {
                if (pdt.data.productQty === '0') {
                    isOutOfStock = true;
                }
            }
            else {
                for (let pl of pdt.data.priceList) {
                    if (pl.totalQuantity === '0') {
                        isOutOfStock = true;
                        break;
                    }
                }
            }
        }
        //console.log('isOutOfStock', isOutOfStock);
        return isOutOfStock;
    }
    removeSubscriptions() {
        this.events.unsubscribe('product:publishProductsForAdminProducts');
        this.events.unsubscribe('product:deleteSuccess');
        this.events.unsubscribe('product:deleteFailure');
        this.events.unsubscribe('product:noProductsAvailable');
        this.events.unsubscribe('product:productsForAdminProductsLimitReached');
        this.events.unsubscribe('product:previousProductsForAdminProductsLimitReached');
        this.events.unsubscribe('product:publishAnalyticsProductsCount');
        this.events.unsubscribe('product:makeProductCopiesSuccess');
        this.events.unsubscribe('product:makeProductCopiesFailure');
        this.events.unsubscribe('search-engine:noAdminSearchProductsAvailable');
        this.events.unsubscribe('search-engine:noMoreAdminSearchProducts');
        this.events.unsubscribe('product:editSuccess');
        this.events.unsubscribe('product:editFailure');
        this.events.unsubscribe('product:publishAllProductsForAdminProducts');
    }
    getPriceListFields(priceList) {
        let fields = {
            type: [],
            price: [],
            discountedPrice: [],
            purchasePrice: [],
            totalQuantity: [],
            shippingWeight: []
        };
        priceList.forEach((item, index) => {
            fields.type[index] = item.weight ? item.weight : '';
            fields.price[index] = item.price ? item.price : 0,
                fields.discountedPrice[index] = item.discountedPrice ? item.discountedPrice : 0,
                fields.purchasePrice[index] = item.purchasePrice ? item.purchasePrice : 0,
                fields.totalQuantity[index] = item.totalQuantity ? item.totalQuantity : '0';
            fields.shippingWeight[index] = item.shippingWeight ? item.shippingWeight : 0;
        });
        return fields;
    }
    exportConfirm() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('product:getAllProductsForAdminProducts');
        });
    }
    exportProducts() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.options.filename = this.options.filename + ' ' + this.getDateTimeFormat(new Date);
            let products = [];
            console.log('prod---:', this.allProductsData);
            this.allProductsData.forEach(item => {
                let product = item;
                let productCategories = product.categories;
                let categoryList = [];
                let productBrands = product.brands;
                let brandList = [];
                if (this.categories) {
                    if (product.categories) {
                        productCategories.forEach(categoryId => {
                            let result = this.categories.find(obj => {
                                return obj.id === categoryId;
                            });
                            if (result) {
                                categoryList.push(result.name);
                            }
                            if (this.allSubcategories) {
                                let resultSub = this.allSubcategories.find(obj => {
                                    return obj.id === categoryId;
                                });
                                if (resultSub) {
                                    let catResult = this.categories.find(obj => {
                                        return obj.id === resultSub.categoryId;
                                    });
                                    if (catResult) {
                                        categoryList.push(catResult.name + '-' + resultSub.name);
                                    }
                                }
                            }
                        });
                    }
                }
                if (this.brands) {
                    if (product.brands) {
                        productBrands.forEach(brandId => {
                            let result = this.brands.find(obj => {
                                return obj.id === brandId;
                            });
                            if (result) {
                                brandList.push(result.name);
                            }
                        });
                    }
                }
                let fields = {};
                if (product.isPriceList) {
                    fields = this.getPriceListFields(product.priceList);
                }
                else {
                    product.price = product.price ? product.price : 0;
                    product.discountedPrice = product.discountedPrice ? product.discountedPrice : 0;
                    product.purchasePrice = product.purchasePrice ? product.purchasePrice : 0;
                    product.quanity = product.quanity ? product.quanity : '';
                    product.shippingWeight = product.shippingWeight ? product.shippingWeight : 0;
                }
                products.push({
                    sku: product.productCode ? "\t" + product.productCode : '',
                    name: product.prodName ? product.prodName : '',
                    barcodeNo: product.barcodeNo ? product.barcodeNo : '',
                    active: product.status ? 'YES' : 'NO',
                    variants: product.isPriceList ? 'YES' : 'NO',
                    variantType: product.variantType ? product.variantType : 'other',
                    variantName: product.isPriceList ? fields['type'].join() : '',
                    price: product.isPriceList ? fields['price'].join(', ') : product.prodPrice,
                    discountedPrice: product.isPriceList ? fields['discountedPrice'].join(', ') : product.discountedPrice,
                    purchasePrice: product.isPriceList ? fields['purchasePrice'].join(', ') : product.purchasePrice,
                    quantity: product.isPriceList ? fields['totalQuantity'].join(', ') : product.productQty,
                    shippingWt: product.isPriceList ? fields['shippingWeight'].join(', ') : product.shippingWeight,
                    minQuanity: product.minQty ? product.minQty : '',
                    maxQuantity: product.maxQty ? product.maxQty : '',
                    productDescription: product.prodDesc ? product.prodDesc : '',
                    hsnCode: product.hsnCode ? product.hsnCode : '',
                    gst: product.gst ? product.gst : '',
                    color: product.color && product.color.name && product.color.code ? product.color.name + ',' + product.color.code : '',
                    keywords: product.searchKeywords ? product.searchKeywords.join() : '',
                    out_of_stock: product.stopWhenNoQty ? 'YES' : 'NO',
                    catSubcat: product.categories ? categoryList.join(';') : '',
                    brands: product.brands ? brandList.join(';') : '',
                });
            });
            if (this.loading) {
                this.loading.dismiss();
            }
            const csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_8__["ExportToCsv"](this.options);
            csvExporter.generateCsv(products);
        });
    }
    importProducts() {
        this.router.navigate(['import-products']);
    }
    setAllProductsInactive() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log('productsInactive:', this.productsInactive);
            const success = yield this.vendorService.updateVendorInfo(this.userId, { productsInactive: this.productsInactive });
            if (success) {
                this.presentAlert('', `Products will be ${this.productsInactive ? 'Inactive' : 'Active'} in couple of minutes.`);
            }
        });
    }
    getCategories() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            let prevMsgDiv = document.getElementById(this.previousListItem);
            if (prevMsgDiv) {
                prevMsgDiv.style.background = 'white';
            }
            let msgDiv = document.getElementById('status2');
            if (msgDiv) {
                msgDiv.style.background = 'var(--ion-color-categories-background)';
            }
            this.previousListItem = 'status2';
            this.dataList = yield this.filtersService.getCategoriesWithSubcategories();
            this.dataType = 'categories';
            if (this.dataList && this.dataList.length != 0) {
                this.selectListItem[0];
            }
            if (this.loading) {
                yield this.loading.dismiss();
            }
        });
    }
    getBrands() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            let prevMsgDiv = document.getElementById(this.previousListItem);
            if (prevMsgDiv) {
                prevMsgDiv.style.background = 'white';
            }
            let msgDiv = document.getElementById('status3');
            if (msgDiv) {
                msgDiv.style.background = 'var(--ion-color-categories-background)';
            }
            this.previousListItem = 'status3';
            this.dataList = yield this.filtersService.getBrands();
            this.dataType = 'brands';
            if (this.dataList && this.dataList.length != 0) {
                this.selectListItem[0];
            }
            if (this.loading) {
                yield this.loading.dismiss();
            }
        });
    }
    showSubList(i) {
        this.dataList[i].active = !this.dataList[i].active;
        this.selectListItem(i);
    }
    showAllProducts() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            let prevMsgDiv = document.getElementById(this.previousListItem);
            if (prevMsgDiv) {
                prevMsgDiv.style.background = 'white';
            }
            let msgDiv = document.getElementById('status1');
            if (msgDiv) {
                msgDiv.style.background = 'var(--ion-color-categories-background)';
            }
            this.previousListItem = 'status1';
            this.dataType = '';
            this.selectedSubcatId = '';
            this.events.publish('product:getProductsForAdminProducts');
        });
    }
    selectListItem(i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            if (this.dataType == 'categories') {
                this.selectedSubcatId = this.dataList[i].id;
                console.log("selectedSubCatId: " + this.selectedSubcatId);
                this.noMoreCategoryProducts = false;
                let data = yield this.productService.getCategoryProducts(this.dataList[i].id);
                if (data) {
                    this.productsData = data;
                    console.log('productsData:', this.productsData);
                }
                let prevMsgDiv = document.getElementById(this.previousCategory);
                if (prevMsgDiv) {
                    prevMsgDiv.style.background = 'white';
                }
                let msgDiv = document.getElementById('category' + i);
                if (msgDiv) {
                    msgDiv.style.background = 'var(--ion-color-categories-background)';
                }
                this.previousCategory = 'category' + i;
            }
            if (this.dataType == 'brands') {
                let data = yield this.productService.getBrandProducts(this.dataList[i].id);
                if (data) {
                    this.productsData = data;
                }
                let prevMsgDiv = document.getElementById(this.previousBrand);
                if (prevMsgDiv) {
                    prevMsgDiv.style.background = 'white';
                }
                let msgDiv = document.getElementById('brand' + i);
                if (msgDiv) {
                    msgDiv.style.background = 'var(--ion-color-categories-background)';
                }
                this.previousBrand = 'brand' + i;
            }
            if (this.loading) {
                yield this.loading.dismiss();
            }
        });
    }
    selectSubCat(i, j) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // ? change active Color
            let prevMsgDiv = document.getElementById(this.previousCategory);
            if (prevMsgDiv) {
                prevMsgDiv.style.background = 'white';
            }
            let msgDiv = document.getElementById('subCategory' + j);
            if (msgDiv) {
                msgDiv.style.background = 'var(--ion-color-categories-background)';
            }
            this.previousCategory = 'subCategory' + j;
            // ? change active Color
            // console.log(this.dataList[i].sublist[j]);
            this.selectedSubcatId = this.dataList[i].sublist[j].id;
            this.noMoreCategoryProducts = false;
            let data = yield this.productService.getCategoryProducts(this.dataList[i].sublist[j].id);
            if (data) {
                this.productsData = data;
            }
        });
    }
    showSubOfSubList(i, j) {
        // console.log('sublist', this.dataList[i].sublist[j]);
        this.dataList[i].sublist[j].active = !this.dataList[i].sublist[j].active;
        this.selectSubCat(i, j);
    }
    selectSubOfSubCat(i, j, k) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // ? change active Color
            let prevMsgDiv = document.getElementById(this.previousCategory);
            if (prevMsgDiv) {
                prevMsgDiv.style.background = 'white';
            }
            let msgDiv = document.getElementById('subOfSubCategory' + k);
            if (msgDiv) {
                msgDiv.style.background = 'var(--ion-color-categories-background)';
            }
            this.previousCategory = 'subOfSubCategory' + k;
            // ? change active Color
            // console.log('subOfSubCatList:', this.dataList[i].sublist[j].subOfSubCatList[k]);
            this.selectedSubcatId = this.dataList[i].sublist[j].subOfSubCatList[k].id;
            this.noMoreCategoryProducts = false;
            let data = yield this.productService.getCategoryProducts(this.dataList[i].sublist[j].subOfSubCatList[k].id);
            if (data) {
                this.productsData = data;
            }
        });
    }
    presentViewsPopover(ev, productId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const popover = yield this.popoverController.create({
                component: src_app_analytics_views_count_popover_views_count_popover_page__WEBPACK_IMPORTED_MODULE_12__["ViewsCountPopoverPage"],
                mode: "ios",
                animated: true,
                event: ev,
                componentProps: {
                    productId: productId
                }
            });
            return yield popover.present();
        });
    }
    presentToast(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: msg,
                duration: 3000
            });
            toast.present();
        });
    }
    presentAlert(heading, desc) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: heading,
                message: desc,
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: "Please Wait...",
            });
            yield this.loading.present();
        });
    }
};
AdminProductsPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: src_app_services_filters_filters_service__WEBPACK_IMPORTED_MODULE_11__["FiltersService"] },
    { type: src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_4__["ProductService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
    { type: src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_5__["BrandsService"] },
    { type: src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__["VendorService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
], AdminProductsPage.prototype, "content", void 0);
AdminProductsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-admin-products',
        template: __webpack_require__(/*! raw-loader!./admin-products.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-products/admin-products.page.html"),
        styles: [__webpack_require__(/*! ./admin-products.page.scss */ "./src/app/admin/admin-products/admin-products.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        src_app_services_filters_filters_service__WEBPACK_IMPORTED_MODULE_11__["FiltersService"],
        src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_4__["ProductService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
        src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_5__["BrandsService"],
        src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__["VendorService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"]])
], AdminProductsPage);



/***/ })

}]);
//# sourceMappingURL=admin-admin-products-admin-products-module-es2015.js.map