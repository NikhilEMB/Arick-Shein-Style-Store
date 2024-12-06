(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-dashboard-dashboard-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/dashboard/dashboard.page.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/dashboard/dashboard.page.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Out of Stock Products</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"exportOutOfStockProducts()\" size='small'>\r\n      <ion-icon name=\"md-arrow-down\" slot=\"start\"></ion-icon>\r\n      Export Out of Stock Products\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main\">\r\n    <div *ngIf=\"showLoader; else productsLoaded\" class=\"spinner\">\r\n      <ion-spinner color=\"primary\"></ion-spinner>\r\n    </div>\r\n    <ng-template #productsLoaded>\r\n      <div class=\"no-data\" *ngIf=\"!products.length; else showProducts\" text-center>\r\n        <img src=\"assets/img/no-product.png\" alt=\"\">\r\n        <h6>No Products</h6>\r\n      </div>\r\n      <ng-template #showProducts>\r\n        <div class=\"list-header\">\r\n          <ion-grid class=\"ion-no-padding\">\r\n            <ion-row>\r\n              <ion-col class=\"name\">\r\n                <p>Image</p>\r\n              </ion-col>\r\n              <ion-col class=\"name\">\r\n                <p>Product</p>\r\n              </ion-col>\r\n              <ion-col class=\"name\">\r\n                <p>Quantity</p>\r\n              </ion-col>\r\n              <ion-col class=\"name\">\r\n                <p>Action</p>\r\n              </ion-col>\r\n              <ion-col class=\"name\">\r\n                <p>Delete</p>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n        <div class=\"list-container\">\r\n          <div class=\"dFlex\">\r\n            <div class=\"dFlex\">\r\n              <ion-label>Select All Product</ion-label>\r\n              <div class=\"toggle-btn\">\r\n                <label class=\"switch\">\r\n                  <input type=\"checkbox\" (click)=\"selectAllProducts()\" [checked]=\"isAllProductSelect\">\r\n                  <span class=\"slider round\"></span>\r\n                </label>\r\n              </div>\r\n            </div>\r\n            <ion-button (click)=\"askDeleteProduct()\" color=\"danger\">delete Products</ion-button>\r\n          </div>\r\n          <ion-grid>\r\n            <ion-row *ngFor=\"let item of products; let i = index\" class=\"order-row\" style=\"display: flex;align-items: center;\">\r\n              <ion-col class=\"name\">\r\n                <div class=\"product-img-wrapper\">\r\n                  <ion-thumbnail style=\"margin-left: 5%;\">\r\n                    <img class=\"loading\" *ngIf=\"item.coverPic && !item.coverPic.thumb && item.coverPic.url\"\r\n                      src=\"{{item.coverPic.url}}\">\r\n                    <img class=\"loading\" *ngIf=\"item.coverPic && item.coverPic.thumb\" src=\"{{item.coverPic.thumb}}\">\r\n                    <img *ngIf=\"!item.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n                  </ion-thumbnail>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col class=\"name\">\r\n                  <p text-capitalize text-center>{{item.prodName}}</p>\r\n              </ion-col>\r\n              <ion-col class=\"name\">\r\n                <span *ngIf=\"!item.isPriceList\">\r\n                  <ion-input type=\"text\" class='form-input' [(ngModel)]=\"item.productQty\" style=\"margin-top: 0px;\"></ion-input>\r\n                </span>&nbsp;&nbsp;\r\n                <div class=\"variant-wrapper\" *ngIf=\"item.isPriceList\">\r\n                  <ion-grid >\r\n                    <ion-row *ngFor=\"let variant of item.priceList; let i=index\" style=\"align-items: center;\">\r\n                      <ion-col class=\"variant-title\"><div class=\"variant-title-text\">{{variant.weight}}</div></ion-col>\r\n                      <ion-col class=\"variant-price\"><ion-input  class='form-input' type=\"text\" [(ngModel)]=\"variant.totalQuantity\" style=\"margin-top: 0px;\"></ion-input></ion-col>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col class=\"name\">\r\n                <ion-button (click)=\"saveProduct(item, item.id)\" color=\"success\" fill=\"outline\" shape=\"round\" size=\"small\"\r\n                  shape=\"round\">\r\n                  Update\r\n                </ion-button>&nbsp;&nbsp;\r\n                <ion-button (click)=\"editProduct(item.id)\" class=\"btn-sml i-start\" fill=\"outline\"\r\n                  shape=\"round\">\r\n                  Open Product\r\n                </ion-button>\r\n              </ion-col>\r\n              <ion-col class=\"name\">\r\n                <div (click)=\"onClickCheckBox(item.id)\" style=\"width: 100%;\">\r\n                  <ion-label>{{item.name}}</ion-label>\r\n                  <ion-checkbox [checked]=\"editCheckBoxValue(item.id)\" color=\"primary\" slot=\"start\">\r\n                  </ion-checkbox>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ng-template>\r\n    </ng-template>\r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/dashboard/dashboard.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/admin/dashboard/dashboard.module.ts ***!
  \*****************************************************/
/*! exports provided: DashboardPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPageModule", function() { return DashboardPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _dashboard_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard.page */ "./src/app/admin/dashboard/dashboard.page.ts");







const routes = [
    {
        path: '',
        component: _dashboard_page__WEBPACK_IMPORTED_MODULE_6__["DashboardPage"]
    }
];
let DashboardPageModule = class DashboardPageModule {
};
DashboardPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_dashboard_page__WEBPACK_IMPORTED_MODULE_6__["DashboardPage"]]
    })
], DashboardPageModule);



/***/ }),

/***/ "./src/app/admin/dashboard/dashboard.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/admin/dashboard/dashboard.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  padding-left: 50px;\n  padding-right: 50px;\n  padding-bottom: 30px;\n  background: white;\n  text-align: center;\n  width: 70vw;\n  margin: 0% auto;\n}\n\n.item-inner {\n  min-height: 1px !important;\n}\n\n.label-md {\n  margin-bottom: 1px !important;\n  margin-top: 1px !important;\n}\n\nion-item-divider {\n  margin-top: 0px;\n  min-height: 1px !important;\n  background: lightgray;\n  opacity: 50%;\n}\n\ninput {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.item {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n.card {\n  border: 1px solid lightgray;\n  width: 30vw;\n  margin: 0% auto;\n}\n\n.buttons {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n#cardBtn1 {\n  border-radius: 10px;\n  color: white;\n  background: black;\n  padding: 5px;\n  width: 80px;\n}\n\n#cardBtn2 {\n  border-radius: 10px;\n  color: white;\n  background: var(--ion-color-primary);\n  padding: 5px;\n  width: 80px;\n}\n\n.tab {\n  display: -webkit-box;\n  display: flex;\n  justify-content: space-around;\n  border-bottom: 1px lightgray;\n  font-size: large !important;\n  font-weight: 500;\n  border-bottom: 1px solid lightgray;\n}\n\ninput {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.form {\n  text-align: left;\n  width: 20vw;\n  margin: 0% auto;\n}\n\n.regionList {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 32vw;\n}\n\n.name {\n  width: 60vw;\n  max-width: 60vw;\n}\n\n.list-header {\n  width: 63.5vw;\n  position: relative;\n}\n\n.list-container {\n  margin-top: 90px;\n  width: 62vw;\n}\n\n.list-container ion-grid ion-row {\n  border-bottom: var(--ion-color-medium) 1px solid;\n}\n\n.list-container ion-grid ion-row ion-col {\n  -webkit-box-pack: center;\n          justify-content: center;\n  display: -webkit-inline-box;\n  display: inline-flex;\n}\n\n.f-d-c {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.f-d-c .m-s-btn {\n  margin-top: 15px;\n}\n\n.dFlex {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n  -webkit-box-align: center;\n          align-items: center;\n  gap: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vZGFzaGJvYXJkL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcZGFzaGJvYXJkXFxkYXNoYm9hcmQucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9kYXNoYm9hcmQvZGFzaGJvYXJkLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksMEJBQUE7QUNDSjs7QURFQTtFQUNJLDZCQUFBO0VBQ0EsMEJBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7RUFDQSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVBO0VBQ0ksc0JBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7VUFBQSw2QkFBQTtBQ0NKOztBREVBO0VBQ0ksMkJBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7VUFBQSw2QkFBQTtBQ0NKOztBREVBO0VBQ0ksbUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQ0NKOztBREVBO0VBQ0ksbUJBQUE7RUFDQSxZQUFBO0VBQ0Esb0NBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNkJBQUE7RUFDQSw0QkFBQTtFQUNBLDJCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQ0FBQTtBQ0NKOztBREVBO0VBQ0ksc0JBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLFdBQUE7QUNDSjs7QURFQTtFQUNJLFdBQUE7RUFDQSxlQUFBO0FDQ0o7O0FERUE7RUFDSSxhQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFQTtFQUNJLGdCQUFBO0VBQ0EsV0FBQTtBQ0NKOztBRENRO0VBQ0EsZ0RBQUE7QUNDUjs7QURDUTtFQUNJLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSwyQkFBQTtFQUFBLG9CQUFBO0FDQ1o7O0FES0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FDRko7O0FESUk7RUFDRSxnQkFBQTtBQ0ZOOztBRE1FO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EscUJBQUE7VUFBQSx5QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxTQUFBO0FDSEoiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9kYXNoYm9hcmQvZGFzaGJvYXJkLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWlue1xyXG4gICAgcGFkZGluZy1sZWZ0OiA1MHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogNTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAzMHB4O1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB3aWR0aDogNzB2dztcclxuICAgIG1hcmdpbjogMCUgYXV0b1xyXG59XHJcblxyXG4uaXRlbS1pbm5lcntcclxuICAgIG1pbi1oZWlnaHQ6IDFweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG5cclxuLmxhYmVsLW1ke1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXB4IWltcG9ydGFudDtcclxuICAgIG1hcmdpbi10b3A6IDFweCFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbmlvbi1pdGVtLWRpdmlkZXJ7XHJcbiAgICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgICBtaW4taGVpZ2h0OiAxcHghaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZDogbGlnaHRncmF5O1xyXG4gICAgb3BhY2l0eTogNTAlXHJcbn1cclxuXHJcbmlucHV0e1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLml0ZW17XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHlcclxufVxyXG5cclxuLmNhcmR7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICB3aWR0aDogMzB2dztcclxuICAgIG1hcmdpbjogMCUgYXV0b1xyXG59XHJcblxyXG4uYnV0dG9uc3tcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seVxyXG59XHJcblxyXG4jY2FyZEJ0bjF7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYmFja2dyb3VuZDogYmxhY2s7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICB3aWR0aDogODBweFxyXG59XHJcblxyXG4jY2FyZEJ0bjJ7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgd2lkdGg6IDgwcHhcclxufVxyXG5cclxuLnRhYntcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBsaWdodGdyYXk7XHJcbiAgICBmb250LXNpemU6IGxhcmdlICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxufVxyXG5cclxuaW5wdXR7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcblxyXG4uZm9ybXtcclxuICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICB3aWR0aDogMjB2dztcclxuICAgIG1hcmdpbjogMCUgYXV0b1xyXG59XHJcblxyXG4ucmVnaW9uTGlzdHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICB3aWR0aDogMzJ2d1xyXG59XHJcblxyXG4ubmFtZXtcclxuICAgIHdpZHRoOiA2MHZ3O1xyXG4gICAgbWF4LXdpZHRoOiA2MHZ3O1xyXG4gIH1cclxuXHJcbi5saXN0LWhlYWRlcntcclxuICAgIHdpZHRoOiA2My41dnc7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmVcclxuICB9XHJcbiAgXHJcbi5saXN0LWNvbnRhaW5lcntcclxuICAgIG1hcmdpbi10b3A6IDkwcHg7XHJcbiAgICB3aWR0aDogNjJ2dztcclxuICAgIGlvbi1ncmlke1xyXG4gICAgICAgIGlvbi1yb3d7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xyXG4gICAgICAgIC8vIG1hcmdpbi1sZWZ0OiA1dnc7XHJcbiAgICAgICAgaW9uLWNvbHtcclxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi5mLWQtYyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgXHJcbiAgICAubS1zLWJ0biB7XHJcbiAgICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuZEZsZXh7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDFyZW07XHJcbiAgfSIsIi5tYWluIHtcbiAgcGFkZGluZy1sZWZ0OiA1MHB4O1xuICBwYWRkaW5nLXJpZ2h0OiA1MHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMzBweDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDcwdnc7XG4gIG1hcmdpbjogMCUgYXV0bztcbn1cblxuLml0ZW0taW5uZXIge1xuICBtaW4taGVpZ2h0OiAxcHggIWltcG9ydGFudDtcbn1cblxuLmxhYmVsLW1kIHtcbiAgbWFyZ2luLWJvdHRvbTogMXB4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi10b3A6IDFweCAhaW1wb3J0YW50O1xufVxuXG5pb24taXRlbS1kaXZpZGVyIHtcbiAgbWFyZ2luLXRvcDogMHB4O1xuICBtaW4taGVpZ2h0OiAxcHggIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZDogbGlnaHRncmF5O1xuICBvcGFjaXR5OiA1MCU7XG59XG5cbmlucHV0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4uaXRlbSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xufVxuXG4uY2FyZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgd2lkdGg6IDMwdnc7XG4gIG1hcmdpbjogMCUgYXV0bztcbn1cblxuLmJ1dHRvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbn1cblxuI2NhcmRCdG4xIHtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgcGFkZGluZzogNXB4O1xuICB3aWR0aDogODBweDtcbn1cblxuI2NhcmRCdG4yIHtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIHBhZGRpbmc6IDVweDtcbiAgd2lkdGg6IDgwcHg7XG59XG5cbi50YWIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IGxpZ2h0Z3JheTtcbiAgZm9udC1zaXplOiBsYXJnZSAhaW1wb3J0YW50O1xuICBmb250LXdlaWdodDogNTAwO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgbGlnaHRncmF5O1xufVxuXG5pbnB1dCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLmZvcm0ge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICB3aWR0aDogMjB2dztcbiAgbWFyZ2luOiAwJSBhdXRvO1xufVxuXG4ucmVnaW9uTGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgd2lkdGg6IDMydnc7XG59XG5cbi5uYW1lIHtcbiAgd2lkdGg6IDYwdnc7XG4gIG1heC13aWR0aDogNjB2dztcbn1cblxuLmxpc3QtaGVhZGVyIHtcbiAgd2lkdGg6IDYzLjV2dztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ubGlzdC1jb250YWluZXIge1xuICBtYXJnaW4tdG9wOiA5MHB4O1xuICB3aWR0aDogNjJ2dztcbn1cbi5saXN0LWNvbnRhaW5lciBpb24tZ3JpZCBpb24tcm93IHtcbiAgYm9yZGVyLWJvdHRvbTogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xufVxuLmxpc3QtY29udGFpbmVyIGlvbi1ncmlkIGlvbi1yb3cgaW9uLWNvbCB7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbn1cblxuLmYtZC1jIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5mLWQtYyAubS1zLWJ0biB7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG59XG5cbi5kRmxleCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMXJlbTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/dashboard/dashboard.page.ts":
/*!***************************************************!*\
  !*** ./src/app/admin/dashboard/dashboard.page.ts ***!
  \***************************************************/
/*! exports provided: DashboardPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPage", function() { return DashboardPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/product/product.service */ "./src/app/services/product/product.service.ts");
/* harmony import */ var src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/brands/brands.service */ "./src/app/services/brands/brands.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");










let DashboardPage = class DashboardPage {
    constructor(events, router, labelService, loadingController, alertController, productService, brandService, sharedService) {
        this.events = events;
        this.router = router;
        this.labelService = labelService;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.productService = productService;
        this.brandService = brandService;
        this.sharedService = sharedService;
        this.showLoader = true;
        this.products = [];
        this.DASHBOARD_LABELS = {};
        this.headerText = '';
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
        this.isAllProductSelect = false;
        this.selectedProducts = [];
    }
    ngOnInit() {
        this.DASHBOARD_LABELS = this.labelService.labels['DASHBOARD'];
        this.headerText = this.DASHBOARD_LABELS['header_text'];
    }
    ionViewWillEnter() {
        this.initializeSubscriptions();
        this.events.publish('product:getOutOfStockProducts');
    }
    ngOnDestroy() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.events.subscribe('product:publishOutOfStockProducts', (products) => {
                this.products = products;
                this.showLoader = false;
            });
            this.events.subscribe('product:editSuccess', (heading, desc) => {
                //console.log('in edit success sub');
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.presentAlert(heading, desc);
            });
            this.events.subscribe('product:editFailure', (heading, desc) => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.presentAlert(heading, desc);
            });
            if (!this.categories) {
                this.categories = yield this.productService.getAllCategoriesForSideMenu();
            }
            if (!this.brands) {
                this.brands = yield this.brandService.getAllBrandsForSideMenu();
            }
            if (!this.allSubcategories) {
                this.allSubcategories = yield this.productService.getAllSubcategoriesForSideMenu();
            }
            console.log('categories : ', this.categories);
            console.log('allSubcategories : ', this.allSubcategories);
            console.log('brands : ', this.brands);
        });
    }
    editProduct(itemId) {
        const navigationExtras = {
            state: {
                productId: itemId
            }
        };
        this.router.navigate(['new-product'], navigationExtras);
    }
    saveProduct(itemData, itemID) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('product:editProduct', itemData, itemID, [], '');
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
    getDateTimeFormat(date) {
        return moment__WEBPACK_IMPORTED_MODULE_6__(date).format('MMM D, YYYY hh:mm a');
    }
    exportOutOfStockProducts() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.options.filename = this.options.filename + ' ' + this.getDateTimeFormat(new Date);
            let products = [], count = 0;
            console.log('prod---:', this.products);
            this.products.forEach(item => {
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
                count++;
                products.push({
                    sno: count,
                    sku: product.productCode ? product.productCode : '',
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
            const csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_5__["ExportToCsv"](this.options);
            csvExporter.generateCsv(products);
        });
    }
    removeSubscriptions() {
        this.events.unsubscribe('product:publishOutOfStockProducts');
        this.events.publish('product:removeOutOfStockSub');
    }
    // ? Delete Out-Of-Stock Products Functions Start
    selectAllProducts() {
        this.isAllProductSelect = !this.isAllProductSelect;
        if (this.isAllProductSelect) {
            this.selectedProducts = [];
            for (const item of this.products) {
                this.selectedProducts.push(item.id);
            }
        }
        else {
            this.selectedProducts = [];
        }
        console.log("selected product: ", this.selectedProducts);
    }
    onClickCheckBox(id) {
        if (this.selectedProducts.indexOf(id) === -1) {
            this.selectedProducts.push(id);
        }
        else {
            const index = this.selectedProducts.indexOf(id);
            this.selectedProducts.splice(index, 1);
        }
        console.log("Product selected: ", this.selectedProducts);
    }
    editCheckBoxValue(id) {
        if (this.selectedProducts.indexOf(id) !== -1) {
            return true;
        }
        else {
            return false;
        }
    }
    askDeleteProduct() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.selectedProducts.length > 0) {
                const alert = yield this.alertController.create({
                    subHeader: "Are you sure you want to delete this products ?",
                    buttons: [
                        {
                            text: "No",
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: () => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                            })
                        }, {
                            text: "Yes",
                            handler: () => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                                yield this.deleteProducts();
                            })
                        }
                    ]
                });
                yield alert.present();
            }
            else {
                yield this.sharedService.presentAlert("Please select a product to delete");
            }
        });
    }
    deleteProducts() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            if (this.selectedProducts.length > 0) {
                console.log("product selected to delete: ", this.selectedProducts);
                let response = yield this.productService.deleteOutOfStockProducts(this.selectedProducts);
                yield this.sharedService.loading.dismiss();
                // console.log("response: ", response);
                if (response) {
                    yield this.sharedService.presentAlert("Products deleted successfully");
                }
                else {
                    yield this.sharedService.presentAlert("Something went wrong");
                }
            }
            else {
                yield this.sharedService.loading.dismiss();
                yield this.sharedService.presentAlert("Please select a product to delete");
            }
        });
    }
};
DashboardPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_1__["LabelService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] },
    { type: src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_7__["ProductService"] },
    { type: src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_8__["BrandsService"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_9__["SharedService"] }
];
DashboardPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__(/*! raw-loader!./dashboard.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/dashboard/dashboard.page.html"),
        styles: [__webpack_require__(/*! ./dashboard.page.scss */ "./src/app/admin/dashboard/dashboard.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_1__["LabelService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"],
        src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_7__["ProductService"],
        src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_8__["BrandsService"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_9__["SharedService"]])
], DashboardPage);



/***/ })

}]);
//# sourceMappingURL=admin-dashboard-dashboard-module-es2015.js.map