(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-booking-booking-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/booking/booking.page.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/booking/booking.page.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <div class=\"search-bx\">\r\n      <ion-searchbar mode=\"ios\" placeholder=\"Search services\" [(ngModel)]=\"searchProduct\"\r\n        (ngModelChange)=\"fireSearchQuery()\"></ion-searchbar>\r\n    </div>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"goToAddNew()\" size='small'>\r\n      <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n      Add new Service\r\n    </ion-button>\r\n    <!-- <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"exportConfirm()\" size='small'\r\n      *ngIf=\"userRole != 'vendor'\">\r\n      Export Services\r\n    </ion-button>\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"importProducts()\" size='small'\r\n      *ngIf=\"userRole != 'vendor'\">\r\n      Import Services\r\n    </ion-button> -->\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-no-padding\">\r\n  <div class=\"main-container\" style=\"width: 100%;\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=2 id=\"scroll1\" *ngIf=\"userRole != 'vendor'\">\r\n          <div class=\"statusList\">\r\n            <p id=\"status1\" (click)=\"showAllProducts()\">All Services</p>\r\n            <p id=\"status2\" (click)=\"getCategories()\" [ngClass]=\"dataType == 'categories' ? 'flexDisplay' : ''\">\r\n              Categories\r\n              <span>\r\n                &nbsp;&nbsp;<strong>{{dataType == 'categories' ? '▲' : '▼'}}</strong>\r\n              </span>\r\n            </p>\r\n            <div class=\"statusList\" *ngIf=\"dataType == 'categories'\">\r\n              <div *ngFor=\"let item of dataList,let i = index\">\r\n                <p (click)='showSubList(i)' style=\"display: flex;justify-content: space-between;\" [id]=\"'category' + i\">\r\n                  {{item.name}}\r\n                  <span\r\n                    *ngIf='item.sublist && item.sublist.length > 0 && !item.active'>&nbsp;&nbsp;<strong>▼</strong></span>\r\n                  <span\r\n                    *ngIf='item.sublist && item.sublist.length > 0 && item.active'>&nbsp;&nbsp;<strong>▲</strong></span>\r\n                </p>\r\n                <div *ngIf='item.active'>\r\n                  <ng-container *ngFor='let subItem of item.sublist,let j = index'>\r\n\r\n                    <p (click)=\"showSubOfSubList(i,j)\" style=\"display: flex;justify-content: space-between;\"\r\n                      [id]=\"'subCategory' + j\">\r\n                      <span>{{(subItem.active && subItem.subOfSubCatList?.length > 0) ? '▼' :\r\n                        'ᐅ'}}&nbsp;&nbsp;</span>{{subItem.name}}\r\n                    </p>\r\n                    <ng-container *ngIf=\"subItem.active && subItem.subOfSubCatList\">\r\n                      <p *ngFor=\"let subOfSubCat of subItem.subOfSubCatList,index as k\"\r\n                        (click)='selectSubOfSubCat(i,j,k)' [id]=\"'subOfSubCategory' + k\"\r\n                        style=\"display: flex;justify-content: space-between;\">\r\n                        {{subOfSubCat.name}}\r\n                      </p>\r\n                    </ng-container>\r\n\r\n                  </ng-container>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <p id=\"status3\" (click)=\"getBrands()\" [ngClass]=\"dataType == 'brands' ? 'flexDisplay' : ''\">Brands\r\n              <span *ngIf=\"dataType == 'brands'\">&nbsp;&nbsp;<strong>▼</strong></span>\r\n            </p>\r\n            <div class=\"statusList\" *ngIf=\"dataType ==  'brands'\">\r\n              <div *ngFor=\"let item of dataList,let i = index\">\r\n                <p (click)='selectListItem(i)' [id]=\"'brand' + i\">{{item.name}}</p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=10 id=\"scroll2\">\r\n          <div class=\"no-data\" *ngIf=\"showNoProducts\" text-center>\r\n            <img src=\"assets/img/no-product.png\" alt=\"\">\r\n            <h6>No services</h6>\r\n          </div>\r\n          <div *ngIf=\"showSearchLoader\" class=\"spinner\">\r\n            <ion-spinner color=\"primary\"></ion-spinner>\r\n          </div>\r\n\r\n          <!-- heading -->\r\n\r\n          <div class=\"list-header\"\r\n            *ngIf=\"productsData && productsData.length !== 0 && !showNoProducts && !showSearchLoader\"\r\n            style=\"margin-left: 12px;\">\r\n            <ion-grid class=\"ion-no-padding\">\r\n              <ion-row class=\"ion-align-items-center ion-justify-content-center\" class=\"total-products\"\r\n                *ngIf=\"dataType == ''\">\r\n                <!-- <ion-col size=\"6\" style=\"text-align: left;font-size: larger;text-decoration: underline;\"\r\n                  *ngIf=\"!totalProductsLoader && userRole != 'vendor'\">\r\n                  Total Products: {{totalProducts}}\r\n                </ion-col> -->\r\n                <!-- <ion-col size=\"6\" style=\"text-align: end;\" *ngIf=\"totalProductsLoader && userRole != 'vendor'\">\r\n                  <ion-spinner name=\"dots\" style=\"width: 20px;\"></ion-spinner>\r\n                </ion-col> -->\r\n                <!-- Vendor Login -->\r\n                <ion-col size=\"12\" *ngIf=\"userRole == 'vendor'\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>Make All Approved services Inactive</ion-label>\r\n                      <ion-toggle [(ngModel)]=\"productsInactive\"></ion-toggle>\r\n                    </div>\r\n                    <ion-button class=\"m-l-16\" (click)=\"setAllProductsInactive()\" fill=\"outline\" shape=\"round\"\r\n                      size=\"small\">\r\n                      Save\r\n                    </ion-button>\r\n                  </div>\r\n                </ion-col>\r\n                <!-- Vendor Login end -->\r\n              </ion-row>\r\n              <ion-row>\r\n                <ion-col class=\"img\">\r\n                  <p>Image</p>\r\n                </ion-col>\r\n                <ion-col class=\"name\">\r\n                  <p>Name</p>\r\n                </ion-col>\r\n                <ion-col class=\"price\">\r\n                  <p>Price</p>\r\n                </ion-col>\r\n                <ion-col class=\"price\">\r\n                  <p>Discount Price</p>\r\n                </ion-col>\r\n                <!-- <ion-col class=\"price\">\r\n                  <p>QTY</p>\r\n                </ion-col> -->\r\n                <!-- <ion-col class=\"price\">\r\n                  <p>Purchase Price</p>\r\n                </ion-col> -->\r\n                <ion-col class=\"action\">\r\n                  <p>Action</p>\r\n                </ion-col>\r\n                <!-- <ion-col class=\"action\">\r\n                  <p>Colors</p>\r\n                </ion-col> -->\r\n\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <!-- heading -->\r\n          <!-- product  list -->\r\n          <div class=\"no-data\" *ngIf=\"productsData && productsData.length == 0\" text-center>\r\n            <img src=\"assets/img/no-product.png\" alt=\"\">\r\n            <h6>No services</h6>\r\n          </div>\r\n\r\n          <div class=\"list-container\"\r\n            *ngIf=\"productsData && productsData.length !== 0 && !showNoProducts && !showSearchLoader\">\r\n            <ion-list class=\"categories-list\">\r\n              <ion-item class=\"ion-no-padding\" no-lines no-border *ngFor=\"let item of productsData; let i = index\">\r\n                <div class=\"detail-wrapper\">\r\n                  <div class=\"product-wrapper\">\r\n                    <ion-grid class=\"ion-no-padding ion-align-items-center\">\r\n\r\n                      <ion-row class=\"row-background ion-align-items-center\">\r\n                        <ion-col class=\"img\">\r\n                          <ion-thumbnail style=\"margin-left: 5%;\" class=\"product-img-wrapper\">\r\n                            <img class=\"loading\"\r\n                              *ngIf=\"item.data.coverPic && !item.data.coverPic.thumb && item.data.coverPic.url\"\r\n                              src=\"{{item.data.coverPic.url}}\">\r\n                            <img class=\"loading\" *ngIf=\"item.data.coverPic && item.data.coverPic.thumb\"\r\n                              src=\"{{item.data.coverPic.thumb}}\">\r\n                            <img *ngIf=\"!item.data.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n                          </ion-thumbnail>\r\n                          <div class=\"out-of-stock\" *ngIf=\"checkPdtOutOfDelivery(item)\">\r\n                            Out of stock\r\n                          </div>\r\n                        </ion-col>\r\n                        <ion-col (click)=\"editProduct(item)\" class=\"name\">\r\n                          <div [ngClass]=\"{'product-active': item.data.status, 'product-inactive': !item.data.status}\">\r\n                          </div>\r\n                          <p text-capitalize text-center>{{item.data.prodName}}&nbsp;&nbsp;\r\n                            <span style=\"color: red;\"\r\n                              *ngIf=\"item.data.productType && item.data.productType == 'appointment' \">\r\n                              (Appointment)\r\n                            </span>\r\n                          </p>\r\n                        </ion-col>\r\n\r\n\r\n                        <ion-col class=\"price\">\r\n                          <!-- *ngIf=\"!item.data.isPriceList\" -->\r\n                          <span>\r\n                            <ion-input type=\"number\" min=\"0\" class=\"form-input\" [(ngModel)]=\"item.data.prodPrice\">\r\n                            </ion-input>\r\n                          </span>\r\n                        </ion-col>\r\n                        <ion-col class=\"price\">\r\n                          <!-- *ngIf=\"!item.data.isPriceList\" -->\r\n                          <span>\r\n                            <ion-input type=\"number\" min=\"0\" class=\"form-input\" [(ngModel)]=\"item.data.discountedPrice\">\r\n                            </ion-input>\r\n                          </span>\r\n                        </ion-col>\r\n                        <!-- <ion-col class=\"price\">\r\n                          <span>\r\n                            <ion-input type=\"text\" min=\"0\"\r\n                              [ngClass]=\"{'form-input':true,'out-of-stock-input':item.data.productQty == '0'}\"\r\n                              [(ngModel)]=\"item.data.productQty\"></ion-input>\r\n                          </span>\r\n                        </ion-col> -->\r\n                        <ion-col class=\"action\">\r\n                          <ion-button (click)=\"saveProduct(item.data, item.id)\" color=\"success\" fill=\"outline\"\r\n                            shape=\"round\" size=\"small\">\r\n                            Save\r\n                          </ion-button>&nbsp;\r\n                          <ion-button (click)=\"deleteAlertConfirm(item.id, i)\" color=\"danger\" fill=\"outline\"\r\n                            shape=\"round\" size=\"small\">\r\n                            Delete\r\n                          </ion-button>&nbsp;\r\n                        </ion-col>\r\n                      </ion-row>\r\n                    </ion-grid>\r\n                  </div>\r\n                </div>\r\n              </ion-item>\r\n            </ion-list>\r\n\r\n            <ion-grid\r\n              *ngIf=\"productsData && productsData.length !== 0 && !showNoProducts && !showSearchLoader && !searchProduct\">\r\n              <ion-row *ngIf=\"dataType == ''\">\r\n                <ion-col style=\"text-align: start;\">\r\n                  <ion-button (click)=\"loadPreviousProducts()\" size=\"small\" shape=\"round\"\r\n                    [disabled]=\"noPreviousProducts\">\r\n                    <span><i class=\"flaticon-null-8\"></i></span>Previous\r\n                  </ion-button>\r\n                </ion-col>\r\n                <ion-col>\r\n                  <ion-button (click)=\"loadMoreProducts()\" size=\"small\" shape=\"round\" [disabled]=\"noMoreProducts\">\r\n                    Next <span><i class=\"flaticon-null-7\"></i></span>\r\n                  </ion-button>\r\n                </ion-col>\r\n              </ion-row>\r\n              <ion-row *ngIf=\"dataType == 'categories' && selectedSubcatId\">\r\n                <ion-col class=\"t-a-c\">\r\n                  <ion-button (click)=\"loadMoreCategoryProducts()\" size=\"small\" shape=\"round\"\r\n                    [disabled]=\"noMoreCategoryProducts\">\r\n                    Load More\r\n                  </ion-button>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/booking/booking.module.ts":
/*!*************************************************!*\
  !*** ./src/app/admin/booking/booking.module.ts ***!
  \*************************************************/
/*! exports provided: BookingPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookingPageModule", function() { return BookingPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _booking_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./booking.page */ "./src/app/admin/booking/booking.page.ts");







const routes = [
    {
        path: '',
        component: _booking_page__WEBPACK_IMPORTED_MODULE_6__["BookingPage"]
    }
];
let BookingPageModule = class BookingPageModule {
};
BookingPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_booking_page__WEBPACK_IMPORTED_MODULE_6__["BookingPage"]]
    })
], BookingPageModule);



/***/ }),

/***/ "./src/app/admin/booking/booking.page.scss":
/*!*************************************************!*\
  !*** ./src/app/admin/booking/booking.page.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-col.img, ion-col.qty {\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.price {\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.name {\n  width: 150px;\n  max-width: 150px;\n  cursor: pointer;\n}\n\nion-col.action {\n  text-align: center;\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.variant-title {\n  width: 450px;\n}\n\nion-col.variant-title .variant-title-text {\n  display: block;\n  text-align: right;\n  width: 100%;\n}\n\nion-col.variant-price {\n  width: 100px;\n  max-width: 100px;\n}\n\n.form-input {\n  margin-top: 0;\n}\n\n.product-img-wrapper {\n  position: relative;\n}\n\n.out-of-stock-input {\n  background: red;\n  color: #fff;\n}\n\n.out-of-stock {\n  width: 97px;\n  position: absolute;\n  color: red;\n  top: 50%;\n  left: 40%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  text-align: center;\n  text-shadow: 0px 1px 1px #3c3c3c;\n  background: white;\n  background-color: rgba(255, 255, 255, 0.9);\n  text-transform: uppercase;\n  font-size: 10px;\n  padding: 3px;\n}\n\n.product-active {\n  background-color: green;\n  width: 8px;\n  height: 8px;\n  min-width: 8px;\n  border-radius: 30px;\n  border: 1px solid green;\n  margin-right: 10%;\n}\n\n.product-inactive {\n  background-color: red;\n  width: 8px;\n  height: 8px;\n  min-width: 8px;\n  border-radius: 30px;\n  border: 1px solid red;\n  margin-right: 10%;\n}\n\n.form-input {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\nion-item.sc-ion-input-md-h:not(.item-label), ion-item:not(.item-label) .sc-ion-input-md-h {\n  --padding-start: 10px;\n}\n\n.add-btn {\n  margin-right: 20px;\n}\n\n.statusList {\n  text-align: center;\n}\n\n.statusList p {\n  font-size: medium;\n  border: 1px solid lightgray;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n}\n\n.backBtn {\n  display: -webkit-box;\n  display: flex;\n  width: 150px;\n  margin: auto;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 82vh;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 82vh;\n  border-left: 1px solid lightgray;\n  border-right: 1px solid lightgray;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1 {\n    height: 92vh;\n  }\n\n  #scroll2 {\n    height: 92vh;\n  }\n}\n\n.flexDisplay {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYm9va2luZy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGJvb2tpbmdcXGJvb2tpbmcucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9ib29raW5nL2Jvb2tpbmcucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksWUFBQTtFQUNBLGdCQUFBO0FDQUo7O0FER0U7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUNBSjs7QURHRTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUNBSjs7QURJRTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FDREo7O0FESUU7RUFDRSxZQUFBO0FDREo7O0FERUk7RUFDRSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0FDQU47O0FER0U7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUNBSjs7QURHRTtFQUNFLGFBQUE7QUNBSjs7QURHRTtFQUNFLGtCQUFBO0FDQUo7O0FER0U7RUFDRSxlQUFBO0VBQ0EsV0FBQTtBQ0FKOztBREdFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0Esd0NBQUE7RUFDQSxnQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxpQkFBQTtFQUNBLDBDQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBQ0FKOztBREdFO0VBQ0UsdUJBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7QUNBSjs7QURHRTtFQUNFLHFCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0FDQUo7O0FER0U7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0FDQUo7O0FER0U7RUFDRyxxQkFBQTtBQ0FMOztBREdFO0VBQ0Usa0JBQUE7QUNBSjs7QURHRTtFQUNFLGtCQUFBO0FDQUo7O0FEQ0k7RUFDRSxpQkFBQTtFQUNBLDJCQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FDQ047O0FER0U7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtBQ0FKOztBREdFO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0FDQUo7O0FER0U7RUFDRSxnQkFBQTtBQ0FKOztBREdFO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsZ0NBQUE7RUFDQSxpQ0FBQTtBQ0FKOztBREdFO0VBQ0UsZ0JBQUE7QUNBSjs7QURHRTtFQUNFO0lBQ0ksWUFBQTtFQ0FOOztFREVFO0lBQ0ksWUFBQTtFQ0NOO0FBQ0Y7O0FERUU7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9ib29raW5nL2Jvb2tpbmcucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmlvbi1jb2wuaW1nLCBpb24tY29sLnF0eXtcclxuICAgIHdpZHRoOiAxMDBweDtcclxuICAgIG1heC13aWR0aDogMTAwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIGlvbi1jb2wucHJpY2V7XHJcbiAgICB3aWR0aDoxMDBweDtcclxuICAgIG1heC13aWR0aDogMTAwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIGlvbi1jb2wubmFtZXtcclxuICAgIHdpZHRoOiAxNTBweDtcclxuICAgIG1heC13aWR0aDogMTUwcHg7XHJcbiAgICBjdXJzb3I6cG9pbnRlcjtcclxuICAgIC8vIG92ZXJmbG93OiBhdXRvO1xyXG4gIH1cclxuICBcclxuICBpb24tY29sLmFjdGlvbntcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHdpZHRoOiAxMDBweDtcclxuICAgIG1heC13aWR0aDogMTAwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIGlvbi1jb2wudmFyaWFudC10aXRsZXtcclxuICAgIHdpZHRoOiA0NTBweDtcclxuICAgIC52YXJpYW50LXRpdGxlLXRleHR7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgICAgd2lkdGg6IDEwMCU7fVxyXG4gIH1cclxuICBcclxuICBpb24tY29sLnZhcmlhbnQtcHJpY2V7XHJcbiAgICB3aWR0aDoxMDBweCA7XHJcbiAgICBtYXgtd2lkdGg6IDEwMHB4O1xyXG4gIH1cclxuICBcclxuICAuZm9ybS1pbnB1dCB7IFxyXG4gICAgbWFyZ2luLXRvcDogMDtcclxuICB9XHJcbiAgXHJcbiAgLnByb2R1Y3QtaW1nLXdyYXBwZXIge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIH1cclxuICBcclxuICAub3V0LW9mLXN0b2NrLWlucHV0e1xyXG4gICAgYmFja2dyb3VuZDpyZWQ7XHJcbiAgICBjb2xvcjojZmZmO1xyXG4gIH1cclxuICBcclxuICAub3V0LW9mLXN0b2NrIHtcclxuICAgIHdpZHRoOiA5N3B4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgY29sb3I6IHJlZDtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgbGVmdDogNDAlO1xyXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgdGV4dC1zaGFkb3c6IDBweCAxcHggMXB4ICMzYzNjM2M7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsIDAuOSk7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgcGFkZGluZzogM3B4O1xyXG4gIH1cclxuICBcclxuICAucHJvZHVjdC1hY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XHJcbiAgICB3aWR0aDogOHB4O1xyXG4gICAgaGVpZ2h0OiA4cHg7XHJcbiAgICBtaW4td2lkdGg6IDhweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBncmVlbjtcclxuICAgIG1hcmdpbi1yaWdodDogMTAlO1xyXG4gIH1cclxuICBcclxuICAucHJvZHVjdC1pbmFjdGl2ZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XHJcbiAgICB3aWR0aDogOHB4O1xyXG4gICAgaGVpZ2h0OiA4cHg7XHJcbiAgICBtaW4td2lkdGg6IDhweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwJTtcclxuICB9XHJcbiAgXHJcbiAgLmZvcm0taW5wdXR7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDhweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDhweDtcclxuICB9XHJcbiAgXHJcbiAgaW9uLWl0ZW0uc2MtaW9uLWlucHV0LW1kLWg6bm90KC5pdGVtLWxhYmVsKSwgaW9uLWl0ZW06bm90KC5pdGVtLWxhYmVsKSAuc2MtaW9uLWlucHV0LW1kLWgge1xyXG4gICAgIC0tcGFkZGluZy1zdGFydDogMTBweDsgXHJcbiAgfVxyXG4gIFxyXG4gIC5hZGQtYnRue1xyXG4gICAgbWFyZ2luLXJpZ2h0OjIwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5zdGF0dXNMaXN0e1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcHtcclxuICAgICAgZm9udC1zaXplOiBtZWRpdW07XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICAgICAgcGFkZGluZzogMTBweDtcclxuICAgICAgbWFyZ2luOiA4cHg7XHJcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLmJhY2tCdG4ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIHdpZHRoOiAxNTBweDtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICB9XHJcbiAgXHJcbiAgI3Njcm9sbDF7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgaGVpZ2h0OiA4MnZoXHJcbiAgfVxyXG4gIFxyXG4gICNzY3JvbGwxOmhvdmVye1xyXG4gICAgb3ZlcmZsb3cteTogYXV0b1xyXG4gIH1cclxuICBcclxuICAjc2Nyb2xsMntcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBoZWlnaHQ6IDgydmg7XHJcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICB9XHJcbiAgXHJcbiAgI3Njcm9sbDI6aG92ZXJ7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvXHJcbiAgfVxyXG4gIFxyXG4gIEBtZWRpYSBzY3JlZW4gYW5kKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xyXG4gICAgI3Njcm9sbDF7XHJcbiAgICAgICAgaGVpZ2h0OiA5MnZoO1xyXG4gICAgfVxyXG4gICAgI3Njcm9sbDJ7XHJcbiAgICAgICAgaGVpZ2h0OiA5MnZoO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAuZmxleERpc3BsYXkge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlblxyXG4gIH0iLCJpb24tY29sLmltZywgaW9uLWNvbC5xdHkge1xuICB3aWR0aDogMTAwcHg7XG4gIG1heC13aWR0aDogMTAwcHg7XG59XG5cbmlvbi1jb2wucHJpY2Uge1xuICB3aWR0aDogMTAwcHg7XG4gIG1heC13aWR0aDogMTAwcHg7XG59XG5cbmlvbi1jb2wubmFtZSB7XG4gIHdpZHRoOiAxNTBweDtcbiAgbWF4LXdpZHRoOiAxNTBweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5pb24tY29sLmFjdGlvbiB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDEwMHB4O1xuICBtYXgtd2lkdGg6IDEwMHB4O1xufVxuXG5pb24tY29sLnZhcmlhbnQtdGl0bGUge1xuICB3aWR0aDogNDUwcHg7XG59XG5pb24tY29sLnZhcmlhbnQtdGl0bGUgLnZhcmlhbnQtdGl0bGUtdGV4dCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbmlvbi1jb2wudmFyaWFudC1wcmljZSB7XG4gIHdpZHRoOiAxMDBweDtcbiAgbWF4LXdpZHRoOiAxMDBweDtcbn1cblxuLmZvcm0taW5wdXQge1xuICBtYXJnaW4tdG9wOiAwO1xufVxuXG4ucHJvZHVjdC1pbWctd3JhcHBlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLm91dC1vZi1zdG9jay1pbnB1dCB7XG4gIGJhY2tncm91bmQ6IHJlZDtcbiAgY29sb3I6ICNmZmY7XG59XG5cbi5vdXQtb2Ytc3RvY2sge1xuICB3aWR0aDogOTdweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBjb2xvcjogcmVkO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNDAlO1xuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB0ZXh0LXNoYWRvdzogMHB4IDFweCAxcHggIzNjM2MzYztcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBwYWRkaW5nOiAzcHg7XG59XG5cbi5wcm9kdWN0LWFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xuICB3aWR0aDogOHB4O1xuICBoZWlnaHQ6IDhweDtcbiAgbWluLXdpZHRoOiA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyZWVuO1xuICBtYXJnaW4tcmlnaHQ6IDEwJTtcbn1cblxuLnByb2R1Y3QtaW5hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gIHdpZHRoOiA4cHg7XG4gIGhlaWdodDogOHB4O1xuICBtaW4td2lkdGg6IDhweDtcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xuICBtYXJnaW4tcmlnaHQ6IDEwJTtcbn1cblxuLmZvcm0taW5wdXQge1xuICBwYWRkaW5nLWxlZnQ6IDhweDtcbiAgcGFkZGluZy1yaWdodDogOHB4O1xufVxuXG5pb24taXRlbS5zYy1pb24taW5wdXQtbWQtaDpub3QoLml0ZW0tbGFiZWwpLCBpb24taXRlbTpub3QoLml0ZW0tbGFiZWwpIC5zYy1pb24taW5wdXQtbWQtaCB7XG4gIC0tcGFkZGluZy1zdGFydDogMTBweDtcbn1cblxuLmFkZC1idG4ge1xuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG59XG5cbi5zdGF0dXNMaXN0IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLnN0YXR1c0xpc3QgcCB7XG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbjogOHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5iYWNrQnRuIHtcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IDE1MHB4O1xuICBtYXJnaW46IGF1dG87XG59XG5cbiNzY3JvbGwxIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA4MnZoO1xufVxuXG4jc2Nyb2xsMTpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbiNzY3JvbGwyIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA4MnZoO1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgbGlnaHRncmF5O1xufVxuXG4jc2Nyb2xsMjpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4taGVpZ2h0OiAxMjAwcHgpIHtcbiAgI3Njcm9sbDEge1xuICAgIGhlaWdodDogOTJ2aDtcbiAgfVxuXG4gICNzY3JvbGwyIHtcbiAgICBoZWlnaHQ6IDkydmg7XG4gIH1cbn1cbi5mbGV4RGlzcGxheSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/booking/booking.page.ts":
/*!***********************************************!*\
  !*** ./src/app/admin/booking/booking.page.ts ***!
  \***********************************************/
/*! exports provided: BookingPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookingPage", function() { return BookingPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_services_booking_booking_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/booking/booking.service */ "./src/app/services/booking/booking.service.ts");
/* harmony import */ var src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/brands/brands.service */ "./src/app/services/brands/brands.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var src_app_services_filters_filters_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/filters/filters.service */ "./src/app/services/filters/filters.service.ts");











let BookingPage = class BookingPage {
    constructor(modalController, events, router, loadingController, alertController, filtersService, bookingService, platform, storage, toastController, brandService, vendorService) {
        this.modalController = modalController;
        this.events = events;
        this.router = router;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.filtersService = filtersService;
        this.bookingService = bookingService;
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
    ngOnInit() {
        this.initializeSubscriptions();
        this.events.publish('booking:getProductsForAdminProducts');
    }
    saveProduct(itemData, itemID) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.events.subscribe('booking:editSuccess', (heading, desc) => {
                //console.log('in edit success sub');
                if (this.editLoader) {
                    this.editLoader.dismiss();
                }
                this.events.unsubscribe('booking:editSuccess');
                this.presentAlert(heading, desc);
            });
            this.events.subscribe('booking:editFailure', (heading, desc) => {
                if (this.editLoader) {
                    this.editLoader.dismiss();
                }
                this.events.unsubscribe('booking:editFailure');
                this.presentAlert(heading, desc);
            });
            if (itemData.discountedPrice === null) {
                itemData.discountedPrice = itemData.prodPrice;
            }
            itemData.discount = parseFloat((((itemData.prodPrice - itemData.discountedPrice) / itemData.prodPrice) * 100).toFixed(2));
            if (!itemData.prodPrice && itemData.prodPrice !== 0) {
                console.log(itemData, itemData.prodPrice);
                this.presentAlert('', 'Please enter product price');
            }
            else {
                this.editLoader = yield this.loadingController.create({
                    message: 'Please Wait...',
                });
                yield this.editLoader.present();
                itemData.updatedAt = new Date();
                itemData.discountedPrice = itemData.discountedPrice ? itemData.discountedPrice : null;
                itemData.productQty = itemData.productQty ? itemData.productQty : '';
                itemData.purchasePrice = itemData.purchasePrice ? itemData.purchasePrice : null;
                let productData = {
                    discount: itemData.discount,
                    discountedPrice: itemData.discountedPrice,
                    // isPriceList: itemData.isPriceList,
                    // priceList: itemData.priceList ? itemData.priceList : [],
                    prodPrice: itemData.prodPrice,
                    price: itemData.prodPrice,
                    // productQty: itemData.productQty,
                    qty: itemData.productQty,
                    purchasePrice: itemData.purchasePrice
                };
                this.events.publish('booking:editProduct', productData, itemID, [], '');
            }
        });
    }
    getDateTimeFormat(date) {
        return moment__WEBPACK_IMPORTED_MODULE_7__(date).format('MMM D, YYYY hh:mm a');
    }
    ionViewWillEnter() {
        this.devHeight = this.platform.height();
        // this.events.publish('booking:getAnalyticsProductsCount');
        if (this.searchProduct && this.searchProduct != '') {
            this.fireSearchQuery();
        }
        //console.log('height of device...', this.devHeight);
    }
    ionViewWillLeave() {
        //console.log('ionViewWillLeave');
        this.showSearch = false;
    }
    ngOnDestroy() {
        this.removeSubscriptions();
    }
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
            this.events.subscribe('booking:publishProductsForAdminProducts', (products) => {
                //console.log('in all products SUBSCRIPTION');
                this.productsData = products;
                this.showNoProducts = false;
                this.showSearchLoader = false;
                if (this.loading) {
                    this.loading.dismiss();
                }
                // console.log('all products', this.productsData);
            });
            this.events.subscribe('booking:publishAllProductsForAdminProducts', (products) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                this.allProductsData = products;
                this.showNoProducts = false;
                this.showSearchLoader = false;
                if (!this.categories) {
                    this.categories = yield this.bookingService.getAllCategoriesForSideMenu();
                }
                if (!this.brands) {
                    this.brands = yield this.brandService.getAllBrandsForSideMenu();
                }
                if (!this.allSubcategories) {
                    this.allSubcategories = yield this.bookingService.getAllSubcategoriesForSideMenu();
                }
                this.exportProducts();
            }));
            this.events.subscribe('booking:noProductsAvailable', () => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.showNoProducts = true;
                this.showSearchLoader = false;
            });
            this.events.subscribe('booking:productsForAdminProductsLimitReached', () => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.noMoreProducts = true;
                this.loading.dismiss();
            });
            this.events.subscribe('booking:previousProductsForAdminProductsLimitReached', () => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.noPreviousProducts = true;
                this.loading.dismiss();
            });
            this.events.subscribe('booking:deleteSuccess', (heading, msg) => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.presentAlert(heading, msg);
                // this.events.publish('booking:getProductsForAdminProducts');
                //this.events.publish('booking:getProductsForAdminProducts');
            });
            this.events.subscribe('booking:deleteFailure', (heading, msg) => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.presentAlert(heading, msg);
            });
            // this.events.subscribe('booking:publishAnalyticsProductsCount', (count) => {
            //   if (this.loading) {
            //     this.loading.dismiss();
            //   }
            //   this.totalProducts = count;
            //   this.totalProductsLoader = false;
            // });
            this.events.subscribe('booking:makeProductCopiesSuccess', () => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.presentAlert('', 'Options of the product has been added successfully.');
            });
            this.events.subscribe('booking:makeProductCopiesFailure', () => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.presentAlert('', 'There is some problem in adding options of the product.');
            });
            this.events.subscribe('search-engine:noAdminSearchProductsAvailable', () => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.showNoProducts = true;
                this.showSearchLoader = false;
            });
            this.events.subscribe('search-engine:noMoreAdminSearchProducts', () => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.noMoreSearchProducts = true;
                this.showSearchLoader = false;
            });
            this.events.subscribe('booking:publishSubcategories', (data) => {
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
            this.events.publish('booking:loadMoreProductsForAdminProducts');
            // this.content.scrollToTop(0);
        });
    }
    loadMoreCategoryProducts() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            const products = yield this.bookingService.loadMoreCategoryProducts(this.selectedSubcatId);
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
        });
    }
    loadPreviousProducts() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.noMoreProducts = false;
            yield this.presentLoading();
            this.events.publish('booking:loadPreviousProductsForAdminProducts');
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
            this.router.navigate(['create-booking'], navigationExtras);
        }
    }
    fireSearchQuery() {
        clearTimeout(this.typingTimer);
        if (this.searchProduct.length > 2) {
            this.typingTimer = setTimeout(() => {
                // console.log('in fireSearchQuery...');
                this.showSearchLoader = true;
                this.events.publish('search-engine:alogoliaSearchProductsForAdmin', this.searchProduct, 0, 'new_search', 'booking');
            }, this.doneTypingInterval);
        }
        else {
            if (!this.searchProduct.length) {
                this.events.publish('booking:getProductsForAdminProducts');
            }
        }
    }
    searchMoreProducts(event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log('loading more data...');
            this.page = this.page + 1;
            this.events.publish('search-engine:alogoliaSearchProductsForAdmin', this.searchProduct, this.page, 'existing_search', 'booking');
            setTimeout(() => {
                event.target.complete();
            }, 1000);
            if (this.noMoreSearchProducts === true) {
                event.target.disabled = true;
            }
        });
    }
    deleteProduct(itemId, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Please Wait...',
                duration: 3000
            });
            yield this.loading.present();
            this.events.publish('booking:deleteProduct', itemId);
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
            const allProds = yield this.bookingService.getAllProductsForVendor();
            console.log('this.vendorInfo.productLimit:', this.vendorInfo.productLimit, 'allProd:', allProds.length);
            if ('productLimit' in this.vendorInfo && this.vendorInfo.productLimit != null) {
                if (this.vendorInfo.productLimit > allProds.length) {
                    this.router.navigate(['create-booking']);
                }
                else {
                    this.presentAlert('Limit Reached', 'Products Adding Limit Reached, contact admin for more information');
                }
            }
            else {
                this.router.navigate(['create-booking']);
            }
        });
    }
    goToAddNew() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.userRole == 'vendor' && this.vendorInfo) {
                this.checkForProdLimit();
            }
            else {
                const navigationExtras = {
                // state: {
                //   type: type
                // }
                };
                this.router.navigate(['create-booking'], navigationExtras);
            }
        });
    }
    clearSearchProduct() {
        this.searchProduct = '';
        this.events.publish('booking:getProductsForAdminProducts');
    }
    addOptions(copies, item) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.copiesAlert.dismiss();
            yield this.presentLoading();
            this.events.publish('booking:makeProductCopies', copies, item);
        });
    }
    checkPdtOutOfDelivery(pdt) {
        //console.log('in checkPdtOutOfDelivery...');
        let isOutOfStock = false;
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
    }
    removeSubscriptions() {
        this.events.unsubscribe('booking:publishProductsForAdminProducts');
        this.events.unsubscribe('booking:deleteSuccess');
        this.events.unsubscribe('booking:deleteFailure');
        this.events.unsubscribe('booking:noProductsAvailable');
        this.events.unsubscribe('booking:productsForAdminProductsLimitReached');
        this.events.unsubscribe('booking:previousProductsForAdminProductsLimitReached');
        // this.events.unsubscribe('booking:publishAnalyticsProductsCount');
        this.events.unsubscribe('booking:makeProductCopiesSuccess');
        this.events.unsubscribe('booking:makeProductCopiesFailure');
        this.events.unsubscribe('search-engine:noAdminSearchProductsAvailable');
        this.events.unsubscribe('search-engine:noMoreAdminSearchProducts');
        this.events.unsubscribe('booking:editSuccess');
        this.events.unsubscribe('booking:editFailure');
        this.events.unsubscribe('booking:publishAllProductsForAdminProducts');
    }
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
    exportConfirm() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('booking:getAllProductsForAdminProducts');
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
            this.events.publish('booking:getProductsForAdminProducts');
        });
    }
    selectListItem(i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            if (this.dataType == 'categories') {
                this.selectedSubcatId = this.dataList[i].id;
                this.noMoreCategoryProducts = false;
                let data = yield this.bookingService.getCategoryProducts(this.dataList[i].id);
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
                let data = yield this.bookingService.getBrandProducts(this.dataList[i].id);
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
            let data = yield this.bookingService.getCategoryProducts(this.dataList[i].sublist[j].id);
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
            let data = yield this.bookingService.getCategoryProducts(this.dataList[i].sublist[j].subOfSubCatList[k].id);
            if (data) {
                this.productsData = data;
            }
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
BookingPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: src_app_services_filters_filters_service__WEBPACK_IMPORTED_MODULE_10__["FiltersService"] },
    { type: src_app_services_booking_booking_service__WEBPACK_IMPORTED_MODULE_4__["BookingService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
    { type: src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_5__["BrandsService"] },
    { type: src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__["VendorService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
], BookingPage.prototype, "content", void 0);
BookingPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-booking',
        template: __webpack_require__(/*! raw-loader!./booking.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/booking/booking.page.html"),
        styles: [__webpack_require__(/*! ./booking.page.scss */ "./src/app/admin/booking/booking.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        src_app_services_filters_filters_service__WEBPACK_IMPORTED_MODULE_10__["FiltersService"],
        src_app_services_booking_booking_service__WEBPACK_IMPORTED_MODULE_4__["BookingService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
        src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_5__["BrandsService"],
        src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_9__["VendorService"]])
], BookingPage);



/***/ })

}]);
//# sourceMappingURL=admin-booking-booking-module-es2015.js.map