(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-add-coupon-codes-add-coupon-codes-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/add-coupon-codes/add-coupon-codes.page.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/add-coupon-codes/add-coupon-codes.page.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center *ngIf=\"editCodeData === undefined\">New coupon code</ion-title>\r\n    <ion-title text-center *ngIf=\"editCodeData !== undefined\">Edit coupon code</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"solid\" color=\"secondary\" >\r\n      <span class=\"icon\" slot=\"start\">\r\n        <i class=\"flaticon-null\" slot=\"start\"></i>\r\n        <span class=\"count\">5</span>\r\n      </span>\r\n    </ion-button>\r\n    <ion-button fill=\"solid\" color=\"secondary\" >\r\n      <span class=\"icon\" slot=\"start\">\r\n        <i class=\"flaticon-shopping-bag\" slot=\"start\"></i>\r\n        <span class=\"count\">2</span>\r\n      </span>\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n\r\n<super-tabs no-shadow no-border>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Details</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Products</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <super-tabs-container>\r\n    <super-tab>\r\n      <ion-content >\r\n        <div class=\"main-container\">\r\n          <ion-grid >\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Code name</ion-label>\r\n                  <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"name\" (ionChange)=\"toUpperCaseInput(name)\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Description</ion-label>\r\n                  <ion-input type=\"text\" class=\"form-input\" [(ngModel)]=\"description\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>QTY</ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"qty\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Usage / User</ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"perUser\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Applicable above order amount</ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"minOrderAmount\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\">\r\n                <div class=\"flex-label\">\r\n                  <ion-label>Discount type</ion-label>\r\n                  <div class=\"flex-label ion-padding-start\">\r\n                    <span>Flat</span>\r\n                    <ion-toggle color=\"primary\" (ionChange)=\"changeDiscountType()\" [checked]=\"type === 'percentage'\"></ion-toggle>\r\n                    <span>%</span>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n              <ng-container *ngIf=\"type === 'percentage'; else flatDiscountType\">\r\n              \r\n              <ion-col size=\"4\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Percentage</ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"amount\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Max Discount</ion-label>\r\n                  <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"maxDiscount\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Valid upto</ion-label>\r\n                  <ion-datetime class=\"form-input\" [(ngModel)]=\"validUpto\" displayFormat=\"D MMM YYYY\" placeholder=\"Select Date\"\r\n                [min]=\"minDate\" max=\"2099-10-31\"></ion-datetime>\r\n                </div>\r\n              </ion-col>\r\n              </ng-container>\r\n              <ng-template class=\"acc-space-bwn\" #flatDiscountType>\r\n                <ion-col size=\"6\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Flat Amount</ion-label>\r\n                    <ion-input type=\"number\" class=\"form-input\" [(ngModel)]=\"amount\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"6\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Valid upto</ion-label>\r\n                    <ion-datetime class=\"form-input\" [(ngModel)]=\"validUpto\" displayFormat=\"D MMM YYYY\" placeholder=\"Select Date\"\r\n                  [min]=\"minDate\" max=\"2099-10-31\"></ion-datetime>\r\n                  </div>\r\n                </ion-col>\r\n              </ng-template>\r\n              \r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <div class=\"flex-label\">\r\n                    <ion-label>Applicable on Cash On Delivery</ion-label>\r\n                    <ion-toggle [(ngModel)]=\"codAvailable\"></ion-toggle>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n              \r\n              <ion-col size=\"3\">\r\n                <div class=\"input-wrap\">\r\n                  <div class=\"flex-label\">\r\n                    <ion-label>Make this coupon user specific</ion-label>\r\n                    <ion-toggle [(ngModel)]=\"specificUsers.isAllowed\"></ion-toggle>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n              \r\n              <ion-col size=\"9\">\r\n                <ion-button class=\"btn-2 i-start\" (click)=\"openUsersModal()\" shape=\"round\" fill=\"outline\" *ngIf=\"specificUsers.isAllowed\">\r\n                  <i class=\"flaticon-null-5 margin-icon\"></i>\r\n                  Add Users\r\n                </ion-button>\r\n              </ion-col>\r\n              \r\n            </ion-row>\r\n          </ion-grid>\r\n          <div class=\"ion-no-padding\" *ngIf=\"specificUsers.users.length>0 && specificUsers.isAllowed\">\r\n            <div class=\"list-header\">\r\n              <ion-grid class=\"ion-no-padding\">\r\n                <ion-row class=\"headings\">\r\n                  <ion-col size=\"3\">\r\n                    <p>Name</p>\r\n                  </ion-col>\r\n                  <ion-col size=\"6\" >\r\n                    <p>Phone Number</p>\r\n                  </ion-col>\r\n                  <ion-col size=\"1\">\r\n                    <p>Delete</p>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n            <div class=\"list-container\">\r\n                <ion-item *ngFor=\"let item of specificUsers.users; let i = index\">\r\n                  <ion-grid class=\"row-background ion-no-padding ion-align-items-center\">\r\n                    <ion-row class=\"ion-align-items-center\">\r\n                      <ion-col size=\"3\">\r\n                        <p class=\"ion-text-capitalize ion-text-center\">{{item.name}}</p>\r\n                      </ion-col>\r\n                      <ion-col size=\"6\">\r\n                        <p class=\"ion-text-capitalize ion-text-center\">{{item.phoneNo}}</p>\r\n                      </ion-col>\r\n                      <ion-col size=\"1\" class=\"ion-text-center\">\r\n                        <div class=\"ion-text-center\" (click)=\"removeUser(i)\">\r\n                          <i class=\"flaticon-null-21\"></i>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                </ion-item>\r\n              </div>\r\n          </div>\r\n        </div>\r\n      </ion-content>\r\n \r\n\r\n          \r\n    </super-tab>\r\n\r\n    <super-tab class=\"products-tab\">\r\n      \r\n        <ion-content>\r\n          <div class=\"main-container\">\r\n          <p *ngIf=\"editCodeData === undefined; else notApplicableProducts;\" style=\"text-align: center;\">This can be access when coupon code is saved.\r\n          </p>\r\n            \r\n          <ng-template #notApplicableProducts>\r\n            <ion-list lines=\"none\" class=\"applicable-status-box\">\r\n              <br>\r\n              <p *ngIf=\"type === 'flat'\" class=\"m-l-5-p info-txt\">Products can only be added in case of PERCENTAGE discount type</p>\r\n              <ion-list-header>\r\n                <ion-label>Applicable status</ion-label>\r\n              </ion-list-header>\r\n              <hr class=\"line\">\r\n              <ion-item (click)=\"applicableStatusToggle('all')\">\r\n                <ion-label>All</ion-label>\r\n                <ion-radio value=\"all\" slot=\"end\" [checked]=\"applicableStatus === 'all'\"></ion-radio>\r\n              </ion-item>\r\n              <ion-item (click)=\"applicableStatusToggle('applicable')\">\r\n                <ion-label>Applicable</ion-label>\r\n                <ion-radio value=\"applicable\" slot=\"end\" [checked]=\"applicableStatus === 'applicable'\"></ion-radio>\r\n              </ion-item>\r\n              <ion-item (click)=\"applicableStatusToggle('notApplicable')\">\r\n                <ion-label>Not applicable</ion-label>\r\n                <ion-radio value=\"notApplicable\" slot=\"end\" [checked]=\"applicableStatus === 'notApplicable'\"></ion-radio>\r\n              </ion-item>\r\n          </ion-list>\r\n          <div class=\"flex-space-between ion-padding\">\r\n            <p class=\"ion-text-capitalize\" *ngIf=\"applicableStatus === 'notApplicable'\">\r\n              Products on which coupon will not be applied</p>\r\n            <p class=\"ion-text-capitalize\" *ngIf=\"applicableStatus === 'applicable'\">\r\n              Products on which coupon will be applied</p>\r\n            <div>\r\n              <ion-button class=\"btn-2 i-start\" (click)=\"openSelectProductModal('categories')\" shape=\"round\" fill=\"outline\" *ngIf=\"applicableStatus !== 'all' && editCodeData !== undefined && type === 'percentage'\">\r\n                <i class=\"flaticon-null-5 margin-icon\"></i>\r\n                Add Categories\r\n              </ion-button>&nbsp;&nbsp;\r\n              <ion-button class=\"btn-2 i-start\" (click)=\"openSelectProductModal('brands')\" shape=\"round\" fill=\"outline\" *ngIf=\"applicableStatus !== 'all' && editCodeData !== undefined && type === 'percentage'\">\r\n                <i class=\"flaticon-null-5 margin-icon\"></i>\r\n                Add Brands\r\n              </ion-button>&nbsp;&nbsp;\r\n              <ion-button class=\"btn-2 i-start\" (click)=\"openCouponCodeModal()\" shape=\"round\" fill=\"outline\" *ngIf=\"applicableStatus !== 'all' && editCodeData !== undefined && type === 'percentage'\">\r\n                <i class=\"flaticon-null-5 margin-icon\"></i>\r\n                Add Product\r\n              </ion-button>\r\n            </div>\r\n          </div>\r\n          <div class=\"ion-no-padding\" *ngIf=\"applicableStatus !== 'all'\">\r\n          <!-- <div class=\"no-data ion-text-center\" *ngIf=\"!editCodeData.notApplicableProducts.length; else showProducts\">\r\n            <img src=\"assets/img/no-product.png\" alt=\"\">\r\n            <h6>No Products</h6>\r\n          </div> -->\r\n          <ng-container *ngIf=\"editCodeData.notApplicableProducts.length\">\r\n              <div class=\"list-header\" >\r\n              <ion-grid class=\"ion-no-padding\">\r\n                <ion-row class=\"headings\">\r\n                  <ion-col size=\"3\">\r\n                    <p>Image</p>\r\n                  </ion-col>\r\n                  <ion-col size=\"6\" >\r\n                    <p>Name</p>\r\n                  </ion-col>\r\n                  <ion-col size=\"1\">\r\n                    <p>Delete</p>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n            <div class=\"list-container\">\r\n                <ion-item *ngFor=\"let item of editCodeData.notApplicableProducts; let i = index\">\r\n                  <ion-grid class=\"row-background ion-no-padding ion-align-items-center\">\r\n                    <ion-row class=\"ion-align-items-center\" *ngIf='item.data'>\r\n                      <ion-col size=\"3\" class=\"ion-text-center\">\r\n                        <ion-thumbnail style=\"margin: auto;\" class=\"thumbnail\">\r\n                          <img class=\"loading\"\r\n                            *ngIf=\"item.data.coverPic && !item.data.coverPic.thumb && item.data.coverPic.url\"\r\n                            src=\"{{item.data.coverPic.url}}\">\r\n                          <img class=\"loading\" *ngIf=\"item.data.coverPic && item.data.coverPic.thumb\"\r\n                            src=\"{{item.data.coverPic.thumb}}\">\r\n                          <img *ngIf=\"!item.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n                        </ion-thumbnail>\r\n                      </ion-col>\r\n                      <ion-col size=\"6\">\r\n                        <p class=\"ion-text-capitalize ion-text-center\">{{item.data.prodName}}</p>\r\n                      </ion-col>\r\n                      <ion-col size=\"1\" class=\"ion-text-center\">\r\n                        <div class=\"ion-text-center cursor-p\" (click)=\"removeNotApplicableProduct(i)\">\r\n                          <i class=\"flaticon-null-21\"></i>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                    <ion-row class=\"ion-align-items-center\" *ngIf='!item.data'>\r\n                      <ion-col size=\"3\" class=\"ion-text-center\">\r\n                        <ion-thumbnail style=\"margin: auto;\" class=\"thumbnail\">\r\n                          <img class=\"loading\"\r\n                            *ngIf=\"item.coverPic && !item.coverPic.thumb && item.coverPic.url\"\r\n                            src=\"{{item.coverPic.url}}\">\r\n                          <img class=\"loading\" *ngIf=\"item.coverPic && item.coverPic.thumb\"\r\n                            src=\"{{item.coverPic.thumb}}\">\r\n                          <img *ngIf=\"!item.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n                        </ion-thumbnail>\r\n                      </ion-col>\r\n                      <ion-col size=\"6\">\r\n                        <p class=\"ion-text-capitalize ion-text-center\">{{item.prodName}}</p>\r\n                      </ion-col>\r\n                      <ion-col size=\"1\" class=\"ion-text-center\">\r\n                        <div class=\"ion-text-center\" (click)=\"removeNotApplicableProduct(i)\">\r\n                          <i class=\"flaticon-null-21\"></i>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                </ion-item>\r\n              </div>\r\n            </ng-container>\r\n          </div>\r\n        </ng-template>\r\n        </div>\r\n        </ion-content>\r\n      \r\n    </super-tab>\r\n  </super-tabs-container>\r\n</super-tabs>\r\n\r\n<!-- New Code Footer-->\r\n<ion-footer *ngIf=\"editCodeData === undefined\"  no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"addNewCouponCode()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>\r\n<!-- New code Footer-->\r\n\r\n<!-- Edit Code Footer-->\r\n<ion-footer *ngIf=\"editCodeData !== undefined\" no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"presentAlertConfirm();\" shape=\"round\" class=\"btn-1 i-start\" color=\"danger\">\r\n      <i class=\"flaticon-null-21\"></i>\r\n      Delete\r\n    </ion-button>\r\n    <ion-button (click)=\"editCouponCode()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>\r\n<!-- Edit Code Footer-->"

/***/ }),

/***/ "./src/app/admin/add-coupon-codes/add-coupon-codes.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/admin/add-coupon-codes/add-coupon-codes.module.ts ***!
  \*******************************************************************/
/*! exports provided: AddCouponCodesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddCouponCodesPageModule", function() { return AddCouponCodesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _add_coupon_codes_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./add-coupon-codes.page */ "./src/app/admin/add-coupon-codes/add-coupon-codes.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");
/* harmony import */ var _coupon_code_modal_coupon_code_modal_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../coupon-code-modal/coupon-code-modal.page */ "./src/app/admin/coupon-code-modal/coupon-code-modal.page.ts");









var routes = [
    {
        path: '',
        component: _add_coupon_codes_page__WEBPACK_IMPORTED_MODULE_6__["AddCouponCodesPage"]
    }
];
var AddCouponCodesPageModule = /** @class */ (function () {
    function AddCouponCodesPageModule() {
    }
    AddCouponCodesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"]
            ],
            declarations: [_add_coupon_codes_page__WEBPACK_IMPORTED_MODULE_6__["AddCouponCodesPage"], _coupon_code_modal_coupon_code_modal_page__WEBPACK_IMPORTED_MODULE_8__["CouponCodeModalPage"]],
            entryComponents: [_coupon_code_modal_coupon_code_modal_page__WEBPACK_IMPORTED_MODULE_8__["CouponCodeModalPage"]]
        })
    ], AddCouponCodesPageModule);
    return AddCouponCodesPageModule;
}());



/***/ }),

/***/ "./src/app/admin/add-coupon-codes/add-coupon-codes.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/admin/add-coupon-codes/add-coupon-codes.page.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".list-header {\n  position: static;\n  text-align: center;\n}\n\n.list-container {\n  margin-top: 0;\n}\n\n.info-txt {\n  color: red;\n  font-size: 14px;\n  font-weight: bold;\n}\n\n.m-l-5-p {\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRkLWNvdXBvbi1jb2Rlcy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGFkZC1jb3Vwb24tY29kZXNcXGFkZC1jb3Vwb24tY29kZXMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZGQtY291cG9uLWNvZGVzL2FkZC1jb3Vwb24tY29kZXMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQWEsZ0JBQUE7RUFBaUIsa0JBQUE7QUNHOUI7O0FERkE7RUFBZ0IsYUFBQTtBQ01oQjs7QURMQTtFQUNJLFVBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUNRSjs7QURMQTtFQUNJLGtCQUFBO0FDUUoiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9hZGQtY291cG9uLWNvZGVzL2FkZC1jb3Vwb24tY29kZXMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxpc3QtaGVhZGVye3Bvc2l0aW9uOiBzdGF0aWM7dGV4dC1hbGlnbjogY2VudGVyfVxyXG4ubGlzdC1jb250YWluZXJ7bWFyZ2luLXRvcDogMDt9XHJcbi5pbmZvLXR4dCB7XHJcbiAgICBjb2xvcjogcmVkO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGRcclxufVxyXG5cclxuLm0tbC01LXAge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyXHJcbn0iLCIubGlzdC1oZWFkZXIge1xuICBwb3NpdGlvbjogc3RhdGljO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5saXN0LWNvbnRhaW5lciB7XG4gIG1hcmdpbi10b3A6IDA7XG59XG5cbi5pbmZvLXR4dCB7XG4gIGNvbG9yOiByZWQ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5tLWwtNS1wIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/add-coupon-codes/add-coupon-codes.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/admin/add-coupon-codes/add-coupon-codes.page.ts ***!
  \*****************************************************************/
/*! exports provided: AddCouponCodesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddCouponCodesPage", function() { return AddCouponCodesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _coupon_code_modal_coupon_code_modal_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../coupon-code-modal/coupon-code-modal.page */ "./src/app/admin/coupon-code-modal/coupon-code-modal.page.ts");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var _users_modal_users_modal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../users-modal/users-modal.page */ "./src/app/admin/users-modal/users-modal.page.ts");
/* harmony import */ var _select_categories_select_categories_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../select-categories/select-categories.page */ "./src/app/admin/select-categories/select-categories.page.ts");
/* harmony import */ var src_app_services_coupon_codes_coupon_codes_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/coupon-codes/coupon-codes.service */ "./src/app/services/coupon-codes/coupon-codes.service.ts");









var AddCouponCodesPage = /** @class */ (function () {
    function AddCouponCodesPage(events, router, loadingController, alertController, route, modalController, labelService, toastController, ngZone, couponCodesService) {
        var _this = this;
        this.events = events;
        this.router = router;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.route = route;
        this.modalController = modalController;
        this.labelService = labelService;
        this.toastController = toastController;
        this.ngZone = ngZone;
        this.couponCodesService = couponCodesService;
        this.minDate = new Date().toISOString();
        this.name = '';
        this.description = '';
        this.perUser = 1;
        this.type = 'percentage';
        this.validUpto = new Date().toISOString();
        this.usage = 0;
        this.SHARED_LABELS = {};
        this.ADD_COUPON_CODES_LABELS = {};
        this.applicableStatus = 'all';
        this.selectDatePh = '';
        this.codAvailable = false;
        this.specificUsers = {
            isAllowed: false,
            users: []
        };
        this.route.queryParams.subscribe(function (params) {
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.editCodeData = _this.router.getCurrentNavigation().extras.state.editCodeData;
                //  //console.log('editproductData', this.editCodeData);
                _this.name = _this.editCodeData.name;
                _this.description = _this.editCodeData.description ? _this.editCodeData.description : '';
                _this.qty = _this.editCodeData.qty;
                _this.perUser = _this.editCodeData.perUser;
                _this.minOrderAmount = _this.editCodeData.minOrderAmount;
                _this.type = _this.editCodeData.type;
                _this.amount = _this.editCodeData.amount;
                _this.maxDiscount = _this.editCodeData.maxDiscount;
                _this.validUpto = _this.editCodeData.validUpto;
                _this.codAvailable = _this.editCodeData.codAvailable ? _this.editCodeData.codAvailable : false;
                _this.specificUsers = _this.editCodeData.specificUsers ? _this.editCodeData.specificUsers : _this.specificUsers;
                _this.ngZone.run(function () {
                    _this.applicableStatus = _this.editCodeData && _this.editCodeData.hasOwnProperty('applicableStatus') ? _this.editCodeData.applicableStatus : 'all';
                });
            }
        });
    }
    AddCouponCodesPage.prototype.ngOnInit = function () {
    };
    AddCouponCodesPage.prototype.ionViewWillEnter = function () {
        this.initializeSubscriptions();
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.ADD_COUPON_CODES_LABELS = this.labelService.labels['ADD_COUPON_CODES'];
        this.selectDatePh = this.ADD_COUPON_CODES_LABELS['select_date'];
    };
    AddCouponCodesPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    AddCouponCodesPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('coupon-codes:addNewCouponCodeSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('New Coupon Code generated successfully!', false);
        });
        this.events.subscribe('coupon-codes:editCouponCodeSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('Coupon Code edited successfully!', false);
        });
        this.events.subscribe('coupon-codes:deleteEditCouponCodeSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('Coupon Code deleted successfully!', true);
        });
        this.events.subscribe('coupon-codes:removeNotApplicableProductSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('Product removed successfully!', false);
        });
        this.events.subscribe('coupon-codes:couponCodeAlreadyExists', function (name) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert("Coupon code with name <b>" + name + "</b> already exists!");
        });
        this.events.subscribe('coupon-codes:updateApplicableStatusSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentToast(_this.ADD_COUPON_CODES_LABELS['status_changed']);
        });
        this.events.subscribe('coupon-codes:dataNotSaved', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentToast(_this.SHARED_LABELS['some_issue']);
        });
    };
    AddCouponCodesPage.prototype.addNewCouponCode = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var codeData;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.name === '' || !this.qty || !this.amount || !this.perUser || !this.minOrderAmount || (this.type === 'percentage' && !this.maxDiscount))) return [3 /*break*/, 1];
                        this.presentAlert("Please fill all the details!");
                        return [3 /*break*/, 4];
                    case 1:
                        if (!this.name.includes(' ')) return [3 /*break*/, 2];
                        this.presentAlert('Please remove space from the code name');
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.presentLoading()];
                    case 3:
                        _a.sent();
                        if (this.type === 'flat') {
                            this.maxDiscount = 0;
                        }
                        codeData = {
                            name: this.name.toUpperCase(),
                            description: this.description,
                            qty: this.qty,
                            perUser: this.perUser,
                            minOrderAmount: this.minOrderAmount,
                            type: this.type,
                            amount: this.amount,
                            maxDiscount: this.maxDiscount,
                            validUpto: this.validUpto,
                            usage: this.usage,
                            notApplicableProducts: [],
                            applicableStatus: this.applicableStatus,
                            codAvailable: this.codAvailable,
                            specificUsers: this.specificUsers,
                        };
                        this.events.publish('coupon-codes:addNewCouponCode', codeData);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AddCouponCodesPage.prototype.editCouponCode = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var codeData;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.name === '' || !this.qty || !this.amount || !this.perUser || !this.minOrderAmount || (this.type === 'percentage' && !this.maxDiscount))) return [3 /*break*/, 1];
                        this.presentAlert("Please fill all the details!");
                        return [3 /*break*/, 4];
                    case 1:
                        if (!this.name.includes(' ')) return [3 /*break*/, 2];
                        this.presentAlert('Please remove space from the code name');
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.presentLoading()];
                    case 3:
                        _a.sent();
                        if (this.type === 'flat') {
                            this.maxDiscount = 0;
                        }
                        codeData = {
                            name: this.name.toUpperCase(),
                            description: this.description,
                            qty: this.qty,
                            perUser: this.perUser,
                            minOrderAmount: this.minOrderAmount,
                            type: this.type,
                            amount: this.amount,
                            maxDiscount: this.maxDiscount,
                            validUpto: this.validUpto,
                            applicableStatus: this.applicableStatus,
                            codAvailable: this.codAvailable,
                            specificUsers: this.specificUsers,
                            notApplicableProducts: this.editCodeData.notApplicableProducts
                        };
                        this.events.publish('coupon-codes:editCouponCode', this.editCodeData.id, codeData);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AddCouponCodesPage.prototype.deleteCouponCode = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('coupon-codes:deleteEditCouponCode', this.editCodeData.id);
                        return [2 /*return*/];
                }
            });
        });
    };
    AddCouponCodesPage.prototype.changeDiscountType = function () {
        if (this.type === 'percentage') {
            this.type = 'flat';
        }
        else {
            this.type = 'percentage';
        }
    };
    AddCouponCodesPage.prototype.presentLoading = function (duration) {
        if (duration === void 0) { duration = 10000; }
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
                                duration: duration,
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
    AddCouponCodesPage.prototype.presentAlert = function (msg, action) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: [{
                                    text: 'Ok',
                                    handler: function () {
                                        if (action) {
                                            _this.router.navigate(['coupon-codes']);
                                        }
                                    }
                                }]
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
    AddCouponCodesPage.prototype.presentAlertConfirm = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Are you sure you want to delete this coupon code?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        //console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Okay',
                                    handler: function () {
                                        _this.deleteCouponCode();
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
    AddCouponCodesPage.prototype.applicableStatusToggle = function (status) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.applicableStatus = status;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('coupon-codes:updateApplicableStatus', status, this.editCodeData.id);
                        return [2 /*return*/];
                }
            });
        });
    };
    AddCouponCodesPage.prototype.presentToast = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: msg,
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddCouponCodesPage.prototype.openCouponCodeModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _coupon_code_modal_coupon_code_modal_page__WEBPACK_IMPORTED_MODULE_4__["CouponCodeModalPage"],
                            componentProps: {
                                codeId: this.editCodeData.id,
                                alreadyAddedProducts: this.editCodeData.notApplicableProducts,
                                applicableStatus: this.applicableStatus
                            },
                            cssClass: 'coupon-code-modal'
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (res) {
                            //console.log('modal onDidDismiss...',res);
                            if (res && res.data) {
                                var products_1 = [];
                                res.data.forEach(function (product) {
                                    products_1.push(_this.getProductDataForNotApplicableArray(product));
                                });
                                _this.editCodeData.notApplicableProducts = products_1;
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddCouponCodesPage.prototype.openSelectProductModal = function (type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _select_categories_select_categories_page__WEBPACK_IMPORTED_MODULE_7__["SelectCategoriesPage"],
                            componentProps: { type: type, linkedList: [] }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            var linkedList_1, dataArray, _i, dataArray_1, cid, productList, _a, dataArray_2, cid, productList;
                            var _this = this;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(res.data && res.data.list.length)) return [3 /*break*/, 12];
                                        linkedList_1 = [];
                                        res.data.list.forEach(function (parent) {
                                            if (parent.active) {
                                                linkedList_1.push(parent.id);
                                                if (parent.sublist.length) {
                                                    parent.sublist.forEach(function (child) {
                                                        if (child.active) {
                                                            linkedList_1.push(child.id);
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                        dataArray = linkedList_1;
                                        if (!(type == 'categories')) return [3 /*break*/, 6];
                                        return [4 /*yield*/, this.presentLoading(1000000)];
                                    case 1:
                                        _b.sent();
                                        _i = 0, dataArray_1 = dataArray;
                                        _b.label = 2;
                                    case 2:
                                        if (!(_i < dataArray_1.length)) return [3 /*break*/, 5];
                                        cid = dataArray_1[_i];
                                        return [4 /*yield*/, this.couponCodesService.getProductsForCategory(cid)];
                                    case 3:
                                        productList = _b.sent();
                                        console.log('productList', productList);
                                        productList.forEach(function (product) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                                if (product && !this.editCodeData.notApplicableProducts.some(function (p) { return p.id == product.id; })) {
                                                    this.editCodeData.notApplicableProducts.push(this.getProductDataForNotApplicableArray(product));
                                                }
                                                return [2 /*return*/];
                                            });
                                        }); });
                                        console.log('this.editCodeData.notApplicableProducts', this.editCodeData.notApplicableProducts);
                                        _b.label = 4;
                                    case 4:
                                        _i++;
                                        return [3 /*break*/, 2];
                                    case 5:
                                        this.loading.dismiss();
                                        return [3 /*break*/, 12];
                                    case 6:
                                        if (!(type == 'brands')) return [3 /*break*/, 12];
                                        return [4 /*yield*/, this.presentLoading(1000000)];
                                    case 7:
                                        _b.sent();
                                        _a = 0, dataArray_2 = dataArray;
                                        _b.label = 8;
                                    case 8:
                                        if (!(_a < dataArray_2.length)) return [3 /*break*/, 11];
                                        cid = dataArray_2[_a];
                                        return [4 /*yield*/, this.couponCodesService.getProductsForBrands(cid)];
                                    case 9:
                                        productList = _b.sent();
                                        productList.forEach(function (product) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                                if (product && this.editCodeData.notApplicableProducts.includes(product) != true) {
                                                    this.editCodeData.notApplicableProducts.push(this.getProductDataForNotApplicableArray(product));
                                                }
                                                return [2 /*return*/];
                                            });
                                        }); });
                                        _b.label = 10;
                                    case 10:
                                        _a++;
                                        return [3 /*break*/, 8];
                                    case 11:
                                        this.loading.dismiss();
                                        _b.label = 12;
                                    case 12: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddCouponCodesPage.prototype.removeNotApplicableProduct = function (i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.editCodeData.notApplicableProducts.splice(i, 1);
                        this.events.publish('coupon-codes:removeNotApplicableProduct', this.editCodeData.notApplicableProducts, this.editCodeData.id);
                        return [2 /*return*/];
                }
            });
        });
    };
    AddCouponCodesPage.prototype.toUpperCaseInput = function (name) {
        this.name = name.toUpperCase();
        if (this.name.includes(' ')) {
            this.name = this.name.replace(/\s/g, '');
        }
    };
    AddCouponCodesPage.prototype.openUsersModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _users_modal_users_modal_page__WEBPACK_IMPORTED_MODULE_6__["UsersModalPage"],
                            componentProps: {
                                alreadyAddedUsers: this.specificUsers.users
                            },
                            cssClass: 'coupon-code-modal'
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (res) {
                            if (res && res.data) {
                                //console.log('res.data', res.data);
                                _this.specificUsers.users = res.data;
                            }
                            //console.log('specificUSers:',this.specificUsers.users);
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddCouponCodesPage.prototype.removeUser = function (i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.specificUsers.users.splice(i, 1);
                return [2 /*return*/];
            });
        });
    };
    AddCouponCodesPage.prototype.getProductDataForNotApplicableArray = function (product) {
        return {
            id: product.id,
            coverPic: { thumb: product.coverPic && Object.keys(product.coverPic).length ? product.coverPic.thumb || product.coverPic.url : '' },
            prodName: product.prodName
        };
    };
    AddCouponCodesPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('coupon-codes:addNewCouponCodeSuccess');
        this.events.unsubscribe('coupon-codes:editCouponCodeSuccess');
        this.events.unsubscribe('coupon-codes:deleteEditCouponCodeSuccess');
        this.events.unsubscribe('coupon-codes:removeNotApplicableProductSuccess');
        this.events.unsubscribe('coupon-codes:couponCodeAlreadyExists');
        this.events.unsubscribe('coupon-codes:updateApplicableStatusSuccess');
        this.events.unsubscribe('coupon-codes:dataNotSaved');
    };
    AddCouponCodesPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_5__["LabelService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
        { type: src_app_services_coupon_codes_coupon_codes_service__WEBPACK_IMPORTED_MODULE_8__["CouponCodesService"] }
    ]; };
    AddCouponCodesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-coupon-codes',
            template: __webpack_require__(/*! raw-loader!./add-coupon-codes.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/add-coupon-codes/add-coupon-codes.page.html"),
            styles: [__webpack_require__(/*! ./add-coupon-codes.page.scss */ "./src/app/admin/add-coupon-codes/add-coupon-codes.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_5__["LabelService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            src_app_services_coupon_codes_coupon_codes_service__WEBPACK_IMPORTED_MODULE_8__["CouponCodesService"]])
    ], AddCouponCodesPage);
    return AddCouponCodesPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-add-coupon-codes-add-coupon-codes-module-es5.js.map