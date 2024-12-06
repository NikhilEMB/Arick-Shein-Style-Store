(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-showcase-showcase-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/showcase/showcase.page.html":
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/showcase/showcase.page.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <div class=\"search-bx\">\r\n      <ion-searchbar mode=\"ios\" placeholder=\"Search Showcase\" [(ngModel)]=\"searchProduct\"\r\n        (ngModelChange)=\"fireSearchQuery()\"></ion-searchbar>\r\n    </div>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"goToAddNew()\" size='small'>\r\n      <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n      Add new Showcase\r\n    </ion-button>\r\n    <!-- <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"exportConfirm()\" size='small'\r\n      *ngIf=\"userRole != 'vendor'\">\r\n      Export Showcase\r\n    </ion-button>\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"importProducts()\" size='small'\r\n      *ngIf=\"userRole != 'vendor'\">\r\n      Import Showcase\r\n    </ion-button> -->\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-no-padding\">\r\n  <div class=\"main-container\" style=\"width: 100%;\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=2 id=\"scroll1\" *ngIf=\"userRole != 'vendor'\">\r\n          <div class=\"statusList\">\r\n            <p id=\"status1\" (click)=\"showAllProducts()\">All Showcase</p>\r\n            <p id=\"status2\" (click)=\"getCategories()\" [ngClass]=\"dataType == 'categories' ? 'flexDisplay' : ''\">\r\n              Categories\r\n              <span>\r\n                &nbsp;&nbsp;<strong>{{dataType == 'categories' ? '▲' : '▼'}}</strong>\r\n              </span>\r\n            </p>\r\n            <div class=\"statusList\" *ngIf=\"dataType == 'categories'\">\r\n              <div *ngFor=\"let item of dataList,let i = index\">\r\n                <p (click)='showSubList(i)' style=\"display: flex;justify-content: space-between;\" [id]=\"'category' + i\">\r\n                  {{item.name}}\r\n                  <span\r\n                    *ngIf='item.sublist && item.sublist.length > 0 && !item.active'>&nbsp;&nbsp;<strong>▼</strong></span>\r\n                  <span\r\n                    *ngIf='item.sublist && item.sublist.length > 0 && item.active'>&nbsp;&nbsp;<strong>▲</strong></span>\r\n                </p>\r\n                <div *ngIf='item.active'>\r\n                  <ng-container *ngFor='let subItem of item.sublist,let j = index'>\r\n\r\n                    <p (click)=\"showSubOfSubList(i,j)\" style=\"display: flex;justify-content: space-between;\"\r\n                      [id]=\"'subCategory' + j\">\r\n                      <span>{{(subItem.active && subItem.subOfSubCatList?.length > 0) ? '▼' :\r\n                        'ᐅ'}}&nbsp;&nbsp;</span>{{subItem.name}}\r\n                    </p>\r\n                    <ng-container *ngIf=\"subItem.active && subItem.subOfSubCatList\">\r\n                      <p *ngFor=\"let subOfSubCat of subItem.subOfSubCatList,index as k\"\r\n                        (click)='selectSubOfSubCat(i,j,k)' [id]=\"'subOfSubCategory' + k\"\r\n                        style=\"display: flex;justify-content: space-between;\">\r\n                        {{subOfSubCat.name}}\r\n                      </p>\r\n                    </ng-container>\r\n\r\n                  </ng-container>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <p id=\"status3\" (click)=\"getBrands()\" [ngClass]=\"dataType == 'brands' ? 'flexDisplay' : ''\">Brands\r\n              <span *ngIf=\"dataType == 'brands'\">&nbsp;&nbsp;<strong>▼</strong></span>\r\n            </p>\r\n            <div class=\"statusList\" *ngIf=\"dataType ==  'brands'\">\r\n              <div *ngFor=\"let item of dataList,let i = index\">\r\n                <p (click)='selectListItem(i)' [id]=\"'brand' + i\">{{item.name}}</p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=10 id=\"scroll2\">\r\n          <div class=\"no-data\" *ngIf=\"showNoProducts\" text-center>\r\n            <img src=\"assets/img/no-product.png\" alt=\"\">\r\n            <h6>No Showcase</h6>\r\n          </div>\r\n          <div *ngIf=\"showSearchLoader\" class=\"spinner\">\r\n            <ion-spinner color=\"primary\"></ion-spinner>\r\n          </div>\r\n\r\n          <!-- heading -->\r\n\r\n          <div class=\"list-header\"\r\n            *ngIf=\"productsData && productsData.length !== 0 && !showNoProducts && !showSearchLoader\"\r\n            style=\"margin-left: 12px;\">\r\n            <ion-grid class=\"ion-no-padding\">\r\n              <ion-row class=\"ion-align-items-center ion-justify-content-center\" class=\"total-products\"\r\n                *ngIf=\"dataType == ''\">\r\n                <!-- <ion-col size=\"6\" style=\"text-align: left;font-size: larger;text-decoration: underline;\"\r\n                  *ngIf=\"!totalProductsLoader && userRole != 'vendor'\">\r\n                  Total Products: {{totalProducts}}\r\n                </ion-col> -->\r\n                <!-- <ion-col size=\"6\" style=\"text-align: end;\" *ngIf=\"totalProductsLoader && userRole != 'vendor'\">\r\n                  <ion-spinner name=\"dots\" style=\"width: 20px;\"></ion-spinner>\r\n                </ion-col> -->\r\n                <!-- Vendor Login -->\r\n                <ion-col size=\"12\" *ngIf=\"userRole == 'vendor'\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>Make All Approved showcase Inactive</ion-label>\r\n                      <ion-toggle [(ngModel)]=\"productsInactive\"></ion-toggle>\r\n                    </div>\r\n                    <ion-button class=\"m-l-16\" (click)=\"setAllProductsInactive()\" fill=\"outline\" shape=\"round\"\r\n                      size=\"small\">\r\n                      Save\r\n                    </ion-button>\r\n                  </div>\r\n                </ion-col>\r\n                <!-- Vendor Login end -->\r\n              </ion-row>\r\n              <ion-row>\r\n                <ion-col class=\"img\">\r\n                  <p>Image</p>\r\n                </ion-col>\r\n                <ion-col class=\"name\">\r\n                  <p>Name</p>\r\n                </ion-col>\r\n                <ion-col class=\"price\">\r\n                  <p>Price</p>\r\n                </ion-col>\r\n                <ion-col class=\"price\">\r\n                  <p>Discount Price</p>\r\n                </ion-col>\r\n                <!-- <ion-col class=\"price\">\r\n                  <p>QTY</p>\r\n                </ion-col> -->\r\n                <!-- <ion-col class=\"price\">\r\n                  <p>Purchase Price</p>\r\n                </ion-col> -->\r\n                <ion-col class=\"action\">\r\n                  <p>Action</p>\r\n                </ion-col>\r\n                <!-- <ion-col class=\"action\">\r\n                  <p>Colors</p>\r\n                </ion-col> -->\r\n\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <!-- heading -->\r\n          <!-- product  list -->\r\n          <div class=\"no-data\" *ngIf=\"productsData && productsData.length == 0\" text-center>\r\n            <img src=\"assets/img/no-product.png\" alt=\"\">\r\n            <h6>No Showcase</h6>\r\n          </div>\r\n\r\n          <div class=\"list-container\"\r\n            *ngIf=\"productsData && productsData.length !== 0 && !showNoProducts && !showSearchLoader\">\r\n            <ion-list class=\"categories-list\">\r\n              <ion-item class=\"ion-no-padding\" no-lines no-border *ngFor=\"let item of productsData; let i = index\">\r\n                <div class=\"detail-wrapper\">\r\n                  <div class=\"product-wrapper\">\r\n                    <ion-grid class=\"ion-no-padding ion-align-items-center\">\r\n\r\n                      <ion-row class=\"row-background ion-align-items-center\">\r\n                        <ion-col class=\"img\">\r\n                          <ion-thumbnail style=\"margin-left: 5%;\" class=\"product-img-wrapper\">\r\n                            <img class=\"loading\"\r\n                              *ngIf=\"item.data.coverPic && !item.data.coverPic.thumb && item.data.coverPic.url\"\r\n                              src=\"{{item.data.coverPic.url}}\">\r\n                            <img class=\"loading\" *ngIf=\"item.data.coverPic && item.data.coverPic.thumb\"\r\n                              src=\"{{item.data.coverPic.thumb}}\">\r\n                            <img *ngIf=\"!item.data.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n                          </ion-thumbnail>\r\n                          <div class=\"out-of-stock\" *ngIf=\"checkPdtOutOfDelivery(item)\">\r\n                            Out of stock\r\n                          </div>\r\n                        </ion-col>\r\n                        <ion-col (click)=\"editProduct(item)\" class=\"name\">\r\n                          <div [ngClass]=\"{'product-active': item.data.status, 'product-inactive': !item.data.status}\">\r\n                          </div>\r\n                          <p text-capitalize text-center>{{item.data.prodName}}&nbsp;&nbsp;\r\n                            <span style=\"color: red;\"\r\n                              *ngIf=\"item.data.productType && item.data.productType == 'appointment' \">\r\n                              (Appointment)\r\n                            </span>\r\n                          </p>\r\n                        </ion-col>\r\n\r\n\r\n                        <ion-col class=\"price\">\r\n                          <!-- *ngIf=\"!item.data.isPriceList\" -->\r\n                          <span>\r\n                            <ion-input type=\"number\" min=\"0\" class=\"form-input\" [(ngModel)]=\"item.data.prodPrice\">\r\n                            </ion-input>\r\n                          </span>\r\n                        </ion-col>\r\n                        <ion-col class=\"price\">\r\n                          <!-- *ngIf=\"!item.data.isPriceList\" -->\r\n                          <span>\r\n                            <ion-input type=\"number\" min=\"0\" class=\"form-input\" [(ngModel)]=\"item.data.discountedPrice\">\r\n                            </ion-input>\r\n                          </span>\r\n                        </ion-col>\r\n                        <!-- <ion-col class=\"price\">\r\n                          <span>\r\n                            <ion-input type=\"text\" min=\"0\"\r\n                              [ngClass]=\"{'form-input':true,'out-of-stock-input':item.data.productQty == '0'}\"\r\n                              [(ngModel)]=\"item.data.productQty\"></ion-input>\r\n                          </span>\r\n                        </ion-col> -->\r\n                        <ion-col class=\"action\">\r\n                          <ion-button (click)=\"saveProduct(item.data, item.id)\" color=\"success\" fill=\"outline\"\r\n                            shape=\"round\" size=\"small\">\r\n                            Save\r\n                          </ion-button>&nbsp;\r\n                          <ion-button (click)=\"deleteAlertConfirm(item.id, i)\" color=\"danger\" fill=\"outline\"\r\n                            shape=\"round\" size=\"small\">\r\n                            Delete\r\n                          </ion-button>&nbsp;\r\n                        </ion-col>\r\n                      </ion-row>\r\n                    </ion-grid>\r\n                  </div>\r\n                </div>\r\n              </ion-item>\r\n            </ion-list>\r\n\r\n            <ion-grid\r\n              *ngIf=\"productsData && productsData.length !== 0 && !showNoProducts && !showSearchLoader && !searchProduct\">\r\n              <ion-row *ngIf=\"dataType == ''\">\r\n                <ion-col style=\"text-align: start;\">\r\n                  <ion-button (click)=\"loadPreviousProducts()\" size=\"small\" shape=\"round\"\r\n                    [disabled]=\"noPreviousProducts\">\r\n                    <span><i class=\"flaticon-null-8\"></i></span>Previous\r\n                  </ion-button>\r\n                </ion-col>\r\n                <ion-col>\r\n                  <ion-button (click)=\"loadMoreProducts()\" size=\"small\" shape=\"round\" [disabled]=\"noMoreProducts\">\r\n                    Next <span><i class=\"flaticon-null-7\"></i></span>\r\n                  </ion-button>\r\n                </ion-col>\r\n              </ion-row>\r\n              <ion-row *ngIf=\"dataType == 'categories' && selectedSubcatId\">\r\n                <ion-col class=\"t-a-c\">\r\n                  <ion-button (click)=\"loadMoreCategoryProducts()\" size=\"small\" shape=\"round\"\r\n                    [disabled]=\"noMoreCategoryProducts\">\r\n                    Load More\r\n                  </ion-button>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/showcase/showcase.module.ts":
/*!***************************************************!*\
  !*** ./src/app/admin/showcase/showcase.module.ts ***!
  \***************************************************/
/*! exports provided: ShowcasePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowcasePageModule", function() { return ShowcasePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _showcase_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./showcase.page */ "./src/app/admin/showcase/showcase.page.ts");







var routes = [
    {
        path: '',
        component: _showcase_page__WEBPACK_IMPORTED_MODULE_6__["ShowcasePage"]
    }
];
var ShowcasePageModule = /** @class */ (function () {
    function ShowcasePageModule() {
    }
    ShowcasePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_showcase_page__WEBPACK_IMPORTED_MODULE_6__["ShowcasePage"]]
        })
    ], ShowcasePageModule);
    return ShowcasePageModule;
}());



/***/ }),

/***/ "./src/app/admin/showcase/showcase.page.scss":
/*!***************************************************!*\
  !*** ./src/app/admin/showcase/showcase.page.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-col.img,\nion-col.qty {\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.price {\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.name {\n  width: 150px;\n  max-width: 150px;\n  cursor: pointer;\n}\n\nion-col.action {\n  text-align: center;\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.variant-title {\n  width: 450px;\n}\n\nion-col.variant-title .variant-title-text {\n  display: block;\n  text-align: right;\n  width: 100%;\n}\n\nion-col.variant-price {\n  width: 100px;\n  max-width: 100px;\n}\n\n.form-input {\n  margin-top: 0;\n}\n\n.product-img-wrapper {\n  position: relative;\n}\n\n.out-of-stock-input {\n  background: red;\n  color: #fff;\n}\n\n.out-of-stock {\n  width: 97px;\n  position: absolute;\n  color: red;\n  top: 50%;\n  left: 40%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  text-align: center;\n  text-shadow: 0px 1px 1px #3c3c3c;\n  background: white;\n  background-color: rgba(255, 255, 255, 0.9);\n  text-transform: uppercase;\n  font-size: 10px;\n  padding: 3px;\n}\n\n.product-active {\n  background-color: green;\n  width: 8px;\n  height: 8px;\n  min-width: 8px;\n  border-radius: 30px;\n  border: 1px solid green;\n  margin-right: 10%;\n}\n\n.product-inactive {\n  background-color: red;\n  width: 8px;\n  height: 8px;\n  min-width: 8px;\n  border-radius: 30px;\n  border: 1px solid red;\n  margin-right: 10%;\n}\n\n.form-input {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\nion-item.sc-ion-input-md-h:not(.item-label),\nion-item:not(.item-label) .sc-ion-input-md-h {\n  --padding-start: 10px;\n}\n\n.add-btn {\n  margin-right: 20px;\n}\n\n.statusList {\n  text-align: center;\n}\n\n.statusList p {\n  font-size: medium;\n  border: 1px solid lightgray;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n}\n\n.backBtn {\n  display: -webkit-box;\n  display: flex;\n  width: 150px;\n  margin: auto;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 82vh;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 82vh;\n  border-left: 1px solid lightgray;\n  border-right: 1px solid lightgray;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1 {\n    height: 92vh;\n  }\n\n  #scroll2 {\n    height: 92vh;\n  }\n}\n\n.flexDisplay {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vc2hvd2Nhc2UvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxzaG93Y2FzZVxcc2hvd2Nhc2UucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9zaG93Y2FzZS9zaG93Y2FzZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBRUUsWUFBQTtFQUNBLGdCQUFBO0FDQ0Y7O0FERUE7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUNDRjs7QURFQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUNDRjs7QURHQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FDQUY7O0FER0E7RUFDRSxZQUFBO0FDQUY7O0FEQ0U7RUFDRSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0FDQ0o7O0FER0E7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUNBRjs7QURHQTtFQUNFLGFBQUE7QUNBRjs7QURHQTtFQUNFLGtCQUFBO0FDQUY7O0FER0E7RUFDRSxlQUFBO0VBQ0EsV0FBQTtBQ0FGOztBREdBO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0Esd0NBQUE7RUFDQSxnQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxpQkFBQTtFQUNBLDBDQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBQ0FGOztBREdBO0VBQ0UsdUJBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7QUNBRjs7QURHQTtFQUNFLHFCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0FDQUY7O0FER0E7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0FDQUY7O0FER0E7O0VBRUUscUJBQUE7QUNBRjs7QURHQTtFQUNFLGtCQUFBO0FDQUY7O0FER0E7RUFDRSxrQkFBQTtBQ0FGOztBRENFO0VBQ0UsaUJBQUE7RUFDQSwyQkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREdBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QUNBRjs7QURHQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtBQ0FGOztBREdBO0VBQ0UsZ0JBQUE7QUNBRjs7QURHQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGdDQUFBO0VBQ0EsaUNBQUE7QUNBRjs7QURHQTtFQUNFLGdCQUFBO0FDQUY7O0FER0E7RUFDRTtJQUNFLFlBQUE7RUNBRjs7RURFQTtJQUNFLFlBQUE7RUNDRjtBQUNGOztBREVBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtBQ0FGIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vc2hvd2Nhc2Uvc2hvd2Nhc2UucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbC5pbWcsXHJcbmlvbi1jb2wucXR5IHtcclxuICB3aWR0aDogMTAwcHg7XHJcbiAgbWF4LXdpZHRoOiAxMDBweDtcclxufVxyXG5cclxuaW9uLWNvbC5wcmljZSB7XHJcbiAgd2lkdGg6IDEwMHB4O1xyXG4gIG1heC13aWR0aDogMTAwcHg7XHJcbn1cclxuXHJcbmlvbi1jb2wubmFtZSB7XHJcbiAgd2lkdGg6IDE1MHB4O1xyXG4gIG1heC13aWR0aDogMTUwcHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIC8vIG92ZXJmbG93OiBhdXRvO1xyXG59XHJcblxyXG5pb24tY29sLmFjdGlvbiB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHdpZHRoOiAxMDBweDtcclxuICBtYXgtd2lkdGg6IDEwMHB4O1xyXG59XHJcblxyXG5pb24tY29sLnZhcmlhbnQtdGl0bGUge1xyXG4gIHdpZHRoOiA0NTBweDtcclxuICAudmFyaWFudC10aXRsZS10ZXh0IHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbn1cclxuXHJcbmlvbi1jb2wudmFyaWFudC1wcmljZSB7XHJcbiAgd2lkdGg6IDEwMHB4O1xyXG4gIG1heC13aWR0aDogMTAwcHg7XHJcbn1cclxuXHJcbi5mb3JtLWlucHV0IHtcclxuICBtYXJnaW4tdG9wOiAwO1xyXG59XHJcblxyXG4ucHJvZHVjdC1pbWctd3JhcHBlciB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4ub3V0LW9mLXN0b2NrLWlucHV0IHtcclxuICBiYWNrZ3JvdW5kOiByZWQ7XHJcbiAgY29sb3I6ICNmZmY7XHJcbn1cclxuXHJcbi5vdXQtb2Ytc3RvY2sge1xyXG4gIHdpZHRoOiA5N3B4O1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBjb2xvcjogcmVkO1xyXG4gIHRvcDogNTAlO1xyXG4gIGxlZnQ6IDQwJTtcclxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB0ZXh0LXNoYWRvdzogMHB4IDFweCAxcHggIzNjM2MzYztcclxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSk7XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBmb250LXNpemU6IDEwcHg7XHJcbiAgcGFkZGluZzogM3B4O1xyXG59XHJcblxyXG4ucHJvZHVjdC1hY3RpdmUge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xyXG4gIHdpZHRoOiA4cHg7XHJcbiAgaGVpZ2h0OiA4cHg7XHJcbiAgbWluLXdpZHRoOiA4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCBncmVlbjtcclxuICBtYXJnaW4tcmlnaHQ6IDEwJTtcclxufVxyXG5cclxuLnByb2R1Y3QtaW5hY3RpdmUge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcclxuICB3aWR0aDogOHB4O1xyXG4gIGhlaWdodDogOHB4O1xyXG4gIG1pbi13aWR0aDogOHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xyXG4gIG1hcmdpbi1yaWdodDogMTAlO1xyXG59XHJcblxyXG4uZm9ybS1pbnB1dCB7XHJcbiAgcGFkZGluZy1sZWZ0OiA4cHg7XHJcbiAgcGFkZGluZy1yaWdodDogOHB4O1xyXG59XHJcblxyXG5pb24taXRlbS5zYy1pb24taW5wdXQtbWQtaDpub3QoLml0ZW0tbGFiZWwpLFxyXG5pb24taXRlbTpub3QoLml0ZW0tbGFiZWwpIC5zYy1pb24taW5wdXQtbWQtaCB7XHJcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxMHB4O1xyXG59XHJcblxyXG4uYWRkLWJ0biB7XHJcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG59XHJcblxyXG4uc3RhdHVzTGlzdCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHAge1xyXG4gICAgZm9udC1zaXplOiBtZWRpdW07XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgbWFyZ2luOiA4cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG59XHJcblxyXG4uYmFja0J0biB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICB3aWR0aDogMTUwcHg7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG59XHJcblxyXG4jc2Nyb2xsMSB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDgydmg7XHJcbn1cclxuXHJcbiNzY3JvbGwxOmhvdmVyIHtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcblxyXG4jc2Nyb2xsMiB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDgydmg7XHJcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgbGlnaHRncmF5O1xyXG59XHJcblxyXG4jc2Nyb2xsMjpob3ZlciB7XHJcbiAgb3ZlcmZsb3cteTogYXV0bztcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQobWluLWhlaWdodDogMTIwMHB4KSB7XHJcbiAgI3Njcm9sbDEge1xyXG4gICAgaGVpZ2h0OiA5MnZoO1xyXG4gIH1cclxuICAjc2Nyb2xsMiB7XHJcbiAgICBoZWlnaHQ6IDkydmg7XHJcbiAgfVxyXG59XHJcblxyXG4uZmxleERpc3BsYXkge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcbiIsImlvbi1jb2wuaW1nLFxuaW9uLWNvbC5xdHkge1xuICB3aWR0aDogMTAwcHg7XG4gIG1heC13aWR0aDogMTAwcHg7XG59XG5cbmlvbi1jb2wucHJpY2Uge1xuICB3aWR0aDogMTAwcHg7XG4gIG1heC13aWR0aDogMTAwcHg7XG59XG5cbmlvbi1jb2wubmFtZSB7XG4gIHdpZHRoOiAxNTBweDtcbiAgbWF4LXdpZHRoOiAxNTBweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5pb24tY29sLmFjdGlvbiB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDEwMHB4O1xuICBtYXgtd2lkdGg6IDEwMHB4O1xufVxuXG5pb24tY29sLnZhcmlhbnQtdGl0bGUge1xuICB3aWR0aDogNDUwcHg7XG59XG5pb24tY29sLnZhcmlhbnQtdGl0bGUgLnZhcmlhbnQtdGl0bGUtdGV4dCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbmlvbi1jb2wudmFyaWFudC1wcmljZSB7XG4gIHdpZHRoOiAxMDBweDtcbiAgbWF4LXdpZHRoOiAxMDBweDtcbn1cblxuLmZvcm0taW5wdXQge1xuICBtYXJnaW4tdG9wOiAwO1xufVxuXG4ucHJvZHVjdC1pbWctd3JhcHBlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLm91dC1vZi1zdG9jay1pbnB1dCB7XG4gIGJhY2tncm91bmQ6IHJlZDtcbiAgY29sb3I6ICNmZmY7XG59XG5cbi5vdXQtb2Ytc3RvY2sge1xuICB3aWR0aDogOTdweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBjb2xvcjogcmVkO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNDAlO1xuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB0ZXh0LXNoYWRvdzogMHB4IDFweCAxcHggIzNjM2MzYztcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBwYWRkaW5nOiAzcHg7XG59XG5cbi5wcm9kdWN0LWFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xuICB3aWR0aDogOHB4O1xuICBoZWlnaHQ6IDhweDtcbiAgbWluLXdpZHRoOiA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyZWVuO1xuICBtYXJnaW4tcmlnaHQ6IDEwJTtcbn1cblxuLnByb2R1Y3QtaW5hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gIHdpZHRoOiA4cHg7XG4gIGhlaWdodDogOHB4O1xuICBtaW4td2lkdGg6IDhweDtcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xuICBtYXJnaW4tcmlnaHQ6IDEwJTtcbn1cblxuLmZvcm0taW5wdXQge1xuICBwYWRkaW5nLWxlZnQ6IDhweDtcbiAgcGFkZGluZy1yaWdodDogOHB4O1xufVxuXG5pb24taXRlbS5zYy1pb24taW5wdXQtbWQtaDpub3QoLml0ZW0tbGFiZWwpLFxuaW9uLWl0ZW06bm90KC5pdGVtLWxhYmVsKSAuc2MtaW9uLWlucHV0LW1kLWgge1xuICAtLXBhZGRpbmctc3RhcnQ6IDEwcHg7XG59XG5cbi5hZGQtYnRuIHtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xufVxuXG4uc3RhdHVzTGlzdCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5zdGF0dXNMaXN0IHAge1xuICBmb250LXNpemU6IG1lZGl1bTtcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICBwYWRkaW5nOiAxMHB4O1xuICBtYXJnaW46IDhweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYmFja0J0biB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHdpZHRoOiAxNTBweDtcbiAgbWFyZ2luOiBhdXRvO1xufVxuXG4jc2Nyb2xsMSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogODJ2aDtcbn1cblxuI3Njcm9sbDE6aG92ZXIge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG4jc2Nyb2xsMiB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogODJ2aDtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cblxuI3Njcm9sbDI6aG92ZXIge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLWhlaWdodDogMTIwMHB4KSB7XG4gICNzY3JvbGwxIHtcbiAgICBoZWlnaHQ6IDkydmg7XG4gIH1cblxuICAjc2Nyb2xsMiB7XG4gICAgaGVpZ2h0OiA5MnZoO1xuICB9XG59XG4uZmxleERpc3BsYXkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/showcase/showcase.page.ts":
/*!*************************************************!*\
  !*** ./src/app/admin/showcase/showcase.page.ts ***!
  \*************************************************/
/*! exports provided: ShowcasePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowcasePage", function() { return ShowcasePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/brands/brands.service */ "./src/app/services/brands/brands.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var _admin_shop_new_product_product_type_product_type_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../admin-shop/new-product/product-type/product-type.component */ "./src/app/admin/admin-shop/new-product/product-type/product-type.component.ts");
/* harmony import */ var src_app_services_filters_filters_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/filters/filters.service */ "./src/app/services/filters/filters.service.ts");
/* harmony import */ var src_app_services_showcase_showcase_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/showcase/showcase.service */ "./src/app/services/showcase/showcase.service.ts");












var ShowcasePage = /** @class */ (function () {
    function ShowcasePage(modalController, events, router, loadingController, alertController, filtersService, 
    // private bookingService: BookingService,
    showcaseService, platform, storage, toastController, brandService, vendorService) {
        this.modalController = modalController;
        this.events = events;
        this.router = router;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.filtersService = filtersService;
        this.showcaseService = showcaseService;
        this.platform = platform;
        this.storage = storage;
        this.toastController = toastController;
        this.brandService = brandService;
        this.vendorService = vendorService;
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
        // totalProducts: number;
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
    }
    ShowcasePage.prototype.ngOnInit = function () {
        this.initializeSubscriptions();
        this.events.publish('showcase:getProductsForAdminProducts');
    };
    ShowcasePage.prototype.saveProduct = function (itemData, itemID) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, productData;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.events.subscribe('showcase:editSuccess', function (heading, desc) {
                            //console.log('in edit success sub');
                            if (_this.editLoader) {
                                _this.editLoader.dismiss();
                            }
                            _this.events.unsubscribe('showcase:editSuccess');
                            _this.presentAlert(heading, desc);
                        });
                        this.events.subscribe('showcase:editFailure', function (heading, desc) {
                            if (_this.editLoader) {
                                _this.editLoader.dismiss();
                            }
                            _this.events.unsubscribe('showcase:editFailure');
                            _this.presentAlert(heading, desc);
                        });
                        if (itemData.discountedPrice === null) {
                            itemData.discountedPrice = itemData.prodPrice;
                        }
                        itemData.discount = parseFloat((((itemData.prodPrice - itemData.discountedPrice) / itemData.prodPrice) * 100).toFixed(2));
                        if (!!itemData.prodPrice) return [3 /*break*/, 1];
                        console.log(itemData, itemData.prodPrice);
                        this.presentAlert('', 'Please enter product price');
                        return [3 /*break*/, 4];
                    case 1:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
                            })];
                    case 2:
                        _a.editLoader = _b.sent();
                        return [4 /*yield*/, this.editLoader.present()];
                    case 3:
                        _b.sent();
                        itemData.updatedAt = new Date();
                        itemData.discountedPrice = itemData.discountedPrice ? itemData.discountedPrice : null;
                        itemData.productQty = itemData.productQty ? itemData.productQty : '';
                        itemData.purchasePrice = itemData.purchasePrice ? itemData.purchasePrice : null;
                        productData = {
                            discount: itemData.discount,
                            discountedPrice: itemData.discountedPrice,
                            // isPriceList: itemData.isPriceList,
                            // priceList: itemData.priceList ? itemData.priceList : [],
                            // prodPrice: itemData.prodPrice,
                            price: itemData.prodPrice,
                            // productQty: itemData.productQty,
                            qty: itemData.productQty,
                            purchasePrice: itemData.purchasePrice
                        };
                        this.events.publish('showcase:editProduct', productData, itemID, [], '');
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.getDateTimeFormat = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_6__(date).format('MMM D, YYYY hh:mm a');
    };
    ShowcasePage.prototype.ionViewWillEnter = function () {
        this.devHeight = this.platform.height();
        // this.events.publish('showcase:getAnalyticsProductsCount');
        if (this.searchProduct && this.searchProduct != '') {
            this.fireSearchQuery();
        }
        //console.log('height of device...', this.devHeight);
    };
    ShowcasePage.prototype.ionViewWillLeave = function () {
        //console.log('ionViewWillLeave');
        this.showSearch = false;
    };
    ShowcasePage.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    ShowcasePage.prototype.initializeSubscriptions = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b, _c;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.storage.get('userRole')];
                    case 1:
                        _a.userRole = _d.sent();
                        _b = this;
                        return [4 /*yield*/, this.storage.get('uid')];
                    case 2:
                        _b.userId = _d.sent();
                        if (!(this.userRole == 'vendor')) return [3 /*break*/, 4];
                        _c = this;
                        return [4 /*yield*/, this.vendorService.getVendorData(this.userId, 'details')];
                    case 3:
                        _c.vendorInfo = _d.sent();
                        if (this.vendorInfo) {
                            this.productsInactive = this.vendorInfo.productsInactive ? this.vendorInfo.productsInactive : false;
                        }
                        _d.label = 4;
                    case 4:
                        this.events.subscribe('showcase:publishProductsForAdminProducts', function (products) {
                            //console.log('in all products SUBSCRIPTION');
                            _this.productsData = products;
                            _this.showNoProducts = false;
                            _this.showSearchLoader = false;
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            // console.log('all products', this.productsData);
                        });
                        this.events.subscribe('showcase:publishAllProductsForAdminProducts', function (products) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            var _a, _b, _c;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        this.allProductsData = products;
                                        this.showNoProducts = false;
                                        this.showSearchLoader = false;
                                        if (!!this.categories) return [3 /*break*/, 2];
                                        _a = this;
                                        return [4 /*yield*/, this.showcaseService.getAllCategoriesForSideMenu()];
                                    case 1:
                                        _a.categories = _d.sent();
                                        _d.label = 2;
                                    case 2:
                                        if (!!this.brands) return [3 /*break*/, 4];
                                        _b = this;
                                        return [4 /*yield*/, this.brandService.getAllBrandsForSideMenu()];
                                    case 3:
                                        _b.brands = _d.sent();
                                        _d.label = 4;
                                    case 4:
                                        if (!!this.allSubcategories) return [3 /*break*/, 6];
                                        _c = this;
                                        return [4 /*yield*/, this.showcaseService.getAllSubcategoriesForSideMenu()];
                                    case 5:
                                        _c.allSubcategories = _d.sent();
                                        _d.label = 6;
                                    case 6:
                                        this.exportProducts();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.events.subscribe('showcase:noProductsAvailable', function () {
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            _this.showNoProducts = true;
                            _this.showSearchLoader = false;
                        });
                        this.events.subscribe('showcase:productsForAdminProductsLimitReached', function () {
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            _this.noMoreProducts = true;
                            _this.loading.dismiss();
                        });
                        this.events.subscribe('showcase:previousProductsForAdminProductsLimitReached', function () {
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            _this.noPreviousProducts = true;
                            _this.loading.dismiss();
                        });
                        this.events.subscribe('showcase:deleteSuccess', function (heading, msg) {
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            _this.presentAlert(heading, msg);
                            // this.events.publish('showcase:getProductsForAdminProducts');
                            //this.events.publish('showcase:getProductsForAdminProducts');
                        });
                        this.events.subscribe('showcase:deleteFailure', function (heading, msg) {
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            _this.presentAlert(heading, msg);
                        });
                        // this.events.subscribe('showcase:publishAnalyticsProductsCount', (count) => {
                        //   if (this.loading) {
                        //     this.loading.dismiss();
                        //   }
                        //   this.totalProducts = count;
                        //   this.totalProductsLoader = false;
                        // });
                        this.events.subscribe('showcase:makeProductCopiesSuccess', function () {
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            _this.presentAlert('', 'Options of the product has been added successfully.');
                        });
                        this.events.subscribe('showcase:makeProductCopiesFailure', function () {
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            _this.presentAlert('', 'There is some problem in adding options of the product.');
                        });
                        this.events.subscribe('search-engine:noAdminSearchProductsAvailable', function () {
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            _this.showNoProducts = true;
                            _this.showSearchLoader = false;
                        });
                        this.events.subscribe('search-engine:noMoreAdminSearchProducts', function () {
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            _this.noMoreSearchProducts = true;
                            _this.showSearchLoader = false;
                        });
                        this.events.subscribe('showcase:publishSubcategories', function (data) {
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            _this.subcateogries = data;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.loadMoreProducts = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //console.log('loading more data...');
                        this.noPreviousProducts = false;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('showcase:loadMoreProductsForAdminProducts');
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.loadMoreCategoryProducts = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var products;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.showcaseService.loadMoreCategoryProducts(this.selectedSubcatId)];
                    case 2:
                        products = _a.sent();
                        console.log('products:', products);
                        if (products && products.length) {
                            this.productsData = products;
                            this.showNoProducts = false;
                            this.showSearchLoader = false;
                        }
                        else {
                            this.noMoreCategoryProducts = true;
                        }
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.loadPreviousProducts = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.noMoreProducts = false;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('showcase:loadPreviousProductsForAdminProducts');
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.editProduct = function (item) {
        if (item.data.productType && item.data.productType == 'appointment') {
            var navigationExtras = {
                state: {
                    productId: item.id,
                    productData: item.data
                }
            };
            this.router.navigate(['appointment'], navigationExtras);
        }
        else {
            var navigationExtras = {
                state: {
                    productId: item.id
                }
            };
            this.router.navigate(['create-showcase'], navigationExtras);
        }
    };
    ShowcasePage.prototype.fireSearchQuery = function () {
        var _this = this;
        clearTimeout(this.typingTimer);
        if (this.searchProduct.length > 2) {
            this.typingTimer = setTimeout(function () {
                // console.log('in fireSearchQuery...');
                _this.showSearchLoader = true;
                _this.events.publish('search-engine:alogoliaSearchProductsForAdmin', _this.searchProduct, 0, 'new_search');
            }, this.doneTypingInterval);
        }
        else {
            if (!this.searchProduct.length) {
                this.events.publish('showcase:getProductsForAdminProducts');
            }
        }
    };
    ShowcasePage.prototype.searchMoreProducts = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                // console.log('loading more data...');
                this.page = this.page + 1;
                this.events.publish('search-engine:alogoliaSearchProductsForAdmin', this.searchProduct, this.page, 'existing_search');
                setTimeout(function () {
                    event.target.complete();
                }, 1000);
                if (this.noMoreSearchProducts === true) {
                    event.target.disabled = true;
                }
                return [2 /*return*/];
            });
        });
    };
    ShowcasePage.prototype.deleteProduct = function (itemId, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
                                duration: 3000
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        this.events.publish('showcase:deleteProduct', itemId);
                        this.productsData.splice(index, 1);
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.deleteAlertConfirm = function (itemId, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Are you sure you want to delete this product',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        //console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Delete',
                                    handler: function () {
                                        //console.log('Confirm Okay');
                                        _this.deleteProduct(itemId, index);
                                    }
                                }
                            ]
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
    ShowcasePage.prototype.checkForProdLimit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var allProds, modal, modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.showcaseService.getAllProductsForVendor()];
                    case 1:
                        allProds = _a.sent();
                        console.log('this.vendorInfo.productLimit:', this.vendorInfo.productLimit, 'allProd:', allProds.length);
                        if (!('productLimit' in this.vendorInfo && this.vendorInfo.productLimit != null)) return [3 /*break*/, 6];
                        if (!(this.vendorInfo.productLimit > allProds.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.modalController.create({
                                component: _admin_shop_new_product_product_type_product_type_component__WEBPACK_IMPORTED_MODULE_9__["ProductTypeComponent"],
                                cssClass: 'custom-modal small-modal',
                            })];
                    case 2:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.presentAlert('Limit Reached', 'Products Adding Limit Reached, contact admin for more information');
                        _a.label = 5;
                    case 5: return [3 /*break*/, 9];
                    case 6: return [4 /*yield*/, this.modalController.create({
                            component: _admin_shop_new_product_product_type_product_type_component__WEBPACK_IMPORTED_MODULE_9__["ProductTypeComponent"],
                            cssClass: 'custom-modal small-modal',
                        })];
                    case 7:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.goToAddNew = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var navigationExtras;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (this.userRole == 'vendor' && this.vendorInfo) {
                    this.checkForProdLimit();
                }
                else {
                    navigationExtras = {
                    // state: {
                    //   type: type
                    // }
                    };
                    this.router.navigate(['create-showcase'], navigationExtras);
                }
                return [2 /*return*/];
            });
        });
    };
    ShowcasePage.prototype.clearSearchProduct = function () {
        this.searchProduct = '';
        this.events.publish('showcase:getProductsForAdminProducts');
    };
    ShowcasePage.prototype.addOptions = function (copies, item) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.copiesAlert.dismiss();
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('showcase:makeProductCopies', copies, item);
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.checkPdtOutOfDelivery = function (pdt) {
        //console.log('in checkPdtOutOfDelivery...');
        var isOutOfStock = false;
        if (pdt.data.stopWhenNoQty) {
            // if (!pdt.data.isPriceList) {
            if (pdt.data.productQty === '0') {
                isOutOfStock = true;
            }
            // } else {
            //   for (let pl of pdt.data.priceList) {
            //     if (pl.totalQuantity === '0') {
            //       isOutOfStock = true;
            //       break;
            //     }
            //   }
            // }
        }
        //console.log('isOutOfStock', isOutOfStock);
        return isOutOfStock;
    };
    ShowcasePage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('showcase:publishProductsForAdminProducts');
        this.events.unsubscribe('showcase:deleteSuccess');
        this.events.unsubscribe('showcase:deleteFailure');
        this.events.unsubscribe('showcase:noProductsAvailable');
        this.events.unsubscribe('showcase:productsForAdminProductsLimitReached');
        this.events.unsubscribe('showcase:previousProductsForAdminProductsLimitReached');
        // this.events.unsubscribe('showcase:publishAnalyticsProductsCount');
        this.events.unsubscribe('showcase:makeProductCopiesSuccess');
        this.events.unsubscribe('showcase:makeProductCopiesFailure');
        this.events.unsubscribe('search-engine:noAdminSearchProductsAvailable');
        this.events.unsubscribe('search-engine:noMoreAdminSearchProducts');
        this.events.unsubscribe('showcase:editSuccess');
        this.events.unsubscribe('showcase:editFailure');
        this.events.unsubscribe('showcase:publishAllProductsForAdminProducts');
    };
    // getPriceListFields(priceList) {
    //   let fields = {
    //     type: [],
    //     price: [],
    //     discountedPrice: [],
    //     purchasePrice: [],
    //     totalQuantity: [],
    //     shippingWeight: []
    //   }
    //   priceList.forEach((item, index) => {
    //     fields.type[index] = item.weight ? item.weight : '';
    //     fields.price[index] = item.price ? item.price : 0,
    //       fields.discountedPrice[index] = item.discountedPrice ? item.discountedPrice : 0,
    //       fields.purchasePrice[index] = item.purchasePrice ? item.purchasePrice : 0,
    //       fields.totalQuantity[index] = item.totalQuantity ? item.totalQuantity : '0'
    //     fields.shippingWeight[index] = item.shippingWeight ? item.shippingWeight : 0
    //   });
    //   return fields;
    // }
    ShowcasePage.prototype.exportConfirm = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('showcase:getAllProductsForAdminProducts');
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.exportProducts = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var products, csvExporter;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.options.filename = this.options.filename + ' ' + this.getDateTimeFormat(new Date);
                products = [];
                console.log('prod---:', this.allProductsData);
                this.allProductsData.forEach(function (item) {
                    var product = item;
                    var productCategories = product.categories;
                    var categoryList = [];
                    var productBrands = product.brands;
                    var brandList = [];
                    if (_this.categories) {
                        if (product.categories) {
                            productCategories.forEach(function (categoryId) {
                                var result = _this.categories.find(function (obj) {
                                    return obj.id === categoryId;
                                });
                                if (result) {
                                    categoryList.push(result.name);
                                }
                                if (_this.allSubcategories) {
                                    var resultSub_1 = _this.allSubcategories.find(function (obj) {
                                        return obj.id === categoryId;
                                    });
                                    if (resultSub_1) {
                                        var catResult = _this.categories.find(function (obj) {
                                            return obj.id === resultSub_1.categoryId;
                                        });
                                        if (catResult) {
                                            categoryList.push(catResult.name + '-' + resultSub_1.name);
                                        }
                                    }
                                }
                            });
                        }
                    }
                    if (_this.brands) {
                        if (product.brands) {
                            productBrands.forEach(function (brandId) {
                                var result = _this.brands.find(function (obj) {
                                    return obj.id === brandId;
                                });
                                if (result) {
                                    brandList.push(result.name);
                                }
                            });
                        }
                    }
                    // let fields = {};
                    // if (product.isPriceList) {
                    //   fields = this.getPriceListFields(product.priceList)
                    // }
                    else {
                        product.prodPrice = product.prodPrice ? product.prodPrice : 0;
                        product.discountedPrice = product.discountedPrice ? product.discountedPrice : 0;
                        product.purchasePrice = product.purchasePrice ? product.purchasePrice : 0;
                        product.quanity = product.quanity ? product.quanity : '';
                        product.shippingWeight = product.shippingWeight ? product.shippingWeight : 0;
                    }
                    products.push({
                        sku: product.productCode ? product.productCode : '',
                        name: product.prodName ? product.prodName : '',
                        barcodeNo: product.barcodeNo ? product.barcodeNo : '',
                        active: product.status ? 'YES' : 'NO',
                        // variants: product.isPriceList ? 'YES' : 'NO',
                        // variantType: product.variantType ? product.variantType : 'other',
                        // variantName: product.isPriceList ? fields['type'].join() : '',
                        // price: product.isPriceList ? fields['price'].join(', ') : product.prodPrice,
                        price: product.prodPrice,
                        // discountedPrice: product.isPriceList ? fields['discountedPrice'].join(', ') : product.discountedPrice,
                        discountedPrice: product.discountedPrice,
                        // purchasePrice: product.isPriceList ? fields['purchasePrice'].join(', ') : product.purchasePrice,
                        purchasePrice: product.purchasePrice,
                        // quantity: product.isPriceList ? fields['totalQuantity'].join(', ') : product.productQty,
                        quantity: product.productQty,
                        // shippingWt: product.isPriceList ? fields['shippingWeight'].join(', ') : product.shippingWeight,
                        shippingWt: product.shippingWeight,
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
                csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_7__["ExportToCsv"](this.options);
                csvExporter.generateCsv(products);
                return [2 /*return*/];
            });
        });
    };
    ShowcasePage.prototype.importProducts = function () {
        this.router.navigate(['import-products']);
    };
    ShowcasePage.prototype.setAllProductsInactive = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var success;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('productsInactive:', this.productsInactive);
                        return [4 /*yield*/, this.vendorService.updateVendorInfo(this.userId, { productsInactive: this.productsInactive })];
                    case 1:
                        success = _a.sent();
                        if (success) {
                            this.presentAlert('', "Products will be " + (this.productsInactive ? 'Inactive' : 'Active') + " in couple of minutes.");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.getCategories = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var prevMsgDiv, msgDiv, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _b.sent();
                        prevMsgDiv = document.getElementById(this.previousListItem);
                        if (prevMsgDiv) {
                            prevMsgDiv.style.background = 'white';
                        }
                        msgDiv = document.getElementById('status2');
                        if (msgDiv) {
                            msgDiv.style.background = 'var(--ion-color-categories-background)';
                        }
                        this.previousListItem = 'status2';
                        _a = this;
                        return [4 /*yield*/, this.filtersService.getCategoriesWithSubcategories()];
                    case 2:
                        _a.dataList = _b.sent();
                        this.dataType = 'categories';
                        if (this.dataList && this.dataList.length != 0) {
                            this.selectListItem[0];
                        }
                        if (!this.loading) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.getBrands = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var prevMsgDiv, msgDiv, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _b.sent();
                        prevMsgDiv = document.getElementById(this.previousListItem);
                        if (prevMsgDiv) {
                            prevMsgDiv.style.background = 'white';
                        }
                        msgDiv = document.getElementById('status3');
                        if (msgDiv) {
                            msgDiv.style.background = 'var(--ion-color-categories-background)';
                        }
                        this.previousListItem = 'status3';
                        _a = this;
                        return [4 /*yield*/, this.filtersService.getBrands()];
                    case 2:
                        _a.dataList = _b.sent();
                        this.dataType = 'brands';
                        if (this.dataList && this.dataList.length != 0) {
                            this.selectListItem[0];
                        }
                        if (!this.loading) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.showSubList = function (i) {
        this.dataList[i].active = !this.dataList[i].active;
        this.selectListItem(i);
    };
    ShowcasePage.prototype.showAllProducts = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var prevMsgDiv, msgDiv;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        prevMsgDiv = document.getElementById(this.previousListItem);
                        if (prevMsgDiv) {
                            prevMsgDiv.style.background = 'white';
                        }
                        msgDiv = document.getElementById('status1');
                        if (msgDiv) {
                            msgDiv.style.background = 'var(--ion-color-categories-background)';
                        }
                        this.previousListItem = 'status1';
                        this.dataType = '';
                        this.events.publish('showcase:getProductsForAdminProducts');
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.selectListItem = function (i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var data, prevMsgDiv, msgDiv, data, prevMsgDiv, msgDiv;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        if (!(this.dataType == 'categories')) return [3 /*break*/, 3];
                        this.selectedSubcatId = this.dataList[i].id;
                        this.noMoreCategoryProducts = false;
                        return [4 /*yield*/, this.showcaseService.getCategoryProducts(this.dataList[i].id)];
                    case 2:
                        data = _a.sent();
                        if (data) {
                            this.productsData = data;
                            console.log('productsData:', this.productsData);
                        }
                        prevMsgDiv = document.getElementById(this.previousCategory);
                        if (prevMsgDiv) {
                            prevMsgDiv.style.background = 'white';
                        }
                        msgDiv = document.getElementById('category' + i);
                        if (msgDiv) {
                            msgDiv.style.background = 'var(--ion-color-categories-background)';
                        }
                        this.previousCategory = 'category' + i;
                        _a.label = 3;
                    case 3:
                        if (!(this.dataType == 'brands')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.showcaseService.getBrandProducts(this.dataList[i].id)];
                    case 4:
                        data = _a.sent();
                        if (data) {
                            this.productsData = data;
                        }
                        prevMsgDiv = document.getElementById(this.previousBrand);
                        if (prevMsgDiv) {
                            prevMsgDiv.style.background = 'white';
                        }
                        msgDiv = document.getElementById('brand' + i);
                        if (msgDiv) {
                            msgDiv.style.background = 'var(--ion-color-categories-background)';
                        }
                        this.previousBrand = 'brand' + i;
                        _a.label = 5;
                    case 5:
                        if (!this.loading) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.selectSubCat = function (i, j) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var prevMsgDiv, msgDiv, data;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prevMsgDiv = document.getElementById(this.previousCategory);
                        if (prevMsgDiv) {
                            prevMsgDiv.style.background = 'white';
                        }
                        msgDiv = document.getElementById('subCategory' + j);
                        if (msgDiv) {
                            msgDiv.style.background = 'var(--ion-color-categories-background)';
                        }
                        this.previousCategory = 'subCategory' + j;
                        // ? change active Color
                        // console.log(this.dataList[i].sublist[j]);
                        this.selectedSubcatId = this.dataList[i].sublist[j].id;
                        this.noMoreCategoryProducts = false;
                        return [4 /*yield*/, this.showcaseService.getCategoryProducts(this.dataList[i].sublist[j].id)];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            this.productsData = data;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.showSubOfSubList = function (i, j) {
        // console.log('sublist', this.dataList[i].sublist[j]);
        this.dataList[i].sublist[j].active = !this.dataList[i].sublist[j].active;
        this.selectSubCat(i, j);
    };
    ShowcasePage.prototype.selectSubOfSubCat = function (i, j, k) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var prevMsgDiv, msgDiv, data;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prevMsgDiv = document.getElementById(this.previousCategory);
                        if (prevMsgDiv) {
                            prevMsgDiv.style.background = 'white';
                        }
                        msgDiv = document.getElementById('subOfSubCategory' + k);
                        if (msgDiv) {
                            msgDiv.style.background = 'var(--ion-color-categories-background)';
                        }
                        this.previousCategory = 'subOfSubCategory' + k;
                        // ? change active Color
                        // console.log('subOfSubCatList:', this.dataList[i].sublist[j].subOfSubCatList[k]);
                        this.selectedSubcatId = this.dataList[i].sublist[j].subOfSubCatList[k].id;
                        this.noMoreCategoryProducts = false;
                        return [4 /*yield*/, this.showcaseService.getCategoryProducts(this.dataList[i].sublist[j].subOfSubCatList[k].id)];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            this.productsData = data;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.presentToast = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: msg,
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcasePage.prototype.presentAlert = function (heading, desc) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: heading,
                            message: desc,
                            buttons: ['Ok']
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
    ShowcasePage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: "Please Wait...",
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
    ShowcasePage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: src_app_services_filters_filters_service__WEBPACK_IMPORTED_MODULE_10__["FiltersService"] },
        { type: src_app_services_showcase_showcase_service__WEBPACK_IMPORTED_MODULE_11__["ShowcaseService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
        { type: src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_4__["BrandsService"] },
        { type: src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_8__["VendorService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
    ], ShowcasePage.prototype, "content", void 0);
    ShowcasePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-showcase',
            template: __webpack_require__(/*! raw-loader!./showcase.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/showcase/showcase.page.html"),
            styles: [__webpack_require__(/*! ./showcase.page.scss */ "./src/app/admin/showcase/showcase.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            src_app_services_filters_filters_service__WEBPACK_IMPORTED_MODULE_10__["FiltersService"],
            src_app_services_showcase_showcase_service__WEBPACK_IMPORTED_MODULE_11__["ShowcaseService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_4__["BrandsService"],
            src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_8__["VendorService"]])
    ], ShowcasePage);
    return ShowcasePage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-showcase-showcase-module-es5.js.map