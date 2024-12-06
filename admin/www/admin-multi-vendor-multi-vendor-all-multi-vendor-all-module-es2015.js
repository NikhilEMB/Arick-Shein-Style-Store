(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-multi-vendor-multi-vendor-all-multi-vendor-all-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/multi-vendor/multi-vendor-all/multi-vendor-all.page.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/multi-vendor/multi-vendor-all/multi-vendor-all.page.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>All Vendors</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <!-- <div class=\"main\"> -->\r\n  <div class=\"main-container\">\r\n    <br><br>\r\n    <ion-grid class=\"t-a-l\">\r\n      <ion-col *ngIf=\"settings.active && multiVendorDoc\" style=\"display: flex;justify-content: center;\">\r\n        <ion-button (click)=\"addVendor()\" class=\"btn-sml i-start m-s-btn\" fill=\"outline\" shape=\"round\">\r\n          + Add Vendor\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-grid>\r\n    <!-- <ion-col size=\"6\" style=\"display: flex;align-items: center;\">\r\n      <input placeholder=\"Enter name\" [(ngModel)]=\"searchUser\" style=\"background: white;border: 1px solid;padding: 5px;\" (click)='clearPhone()'>&nbsp;\r\n      <input placeholder=\"Enter number\" [maxlength]='phoneLimit' [(ngModel)]=\"searchUserPhone\" style=\"background: white;border: 1px solid;padding: 5px;\" (click)='clearName()'>&nbsp;\r\n      <ion-button (click)='fireSearchQuery()' size=\"small\">Search</ion-button>&nbsp;\r\n      <ion-button (click)='showAllUsers()' size=\"small\" >Show All</ion-button>\r\n    </ion-col> -->\r\n\r\n    <!-- <div class=\"list-header\" *ngIf=\"vendors.length && settings.active\">\r\n      <ion-grid class=\"ion-no-padding\">\r\n        <ion-row>\r\n          <ion-col class=\"name\">\r\n            <p>Vendor</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>Phone No</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>Action</p>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </div> -->\r\n\r\n    <!-- <div class=\"list-container\" *ngIf=\"vendors.length && settings.active\">\r\n      <ion-grid>\r\n        <ion-row *ngFor=\"let vendor of vendors; let i=index\" class=\"order-row\">\r\n          <ion-col class=\"name\">\r\n            <p class=\"ion-text-capitalize\" (click)=\"editVendor(vendor)\" style=\"cursor: pointer;\">{{vendor.name}}</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p class=\"ion-text-capitalize\">{{vendor.phoneNo}}</p>\r\n          </ion-col>\r\n          <ion-col class=\"action\">\r\n            <ion-button (click)=\"editVendor(vendor)\" class=\"btn-sml i-start\" fill=\"outline\" shape=\"round\">\r\n              Edit\r\n            </ion-button>&nbsp;&nbsp;\r\n            <ion-button (click)=\"deleteVendor(vendor.id)\" class=\"btn-sml i-start m-s-btn\" fill=\"outline\" shape=\"round\">\r\n              Delete\r\n            </ion-button>&nbsp;&nbsp;\r\n            <ion-button (click)=\"pageVendor(vendor.id,vendor.name)\" class=\"btn-sml i-start m-s-btn\" fill=\"outline\"\r\n              shape=\"round\">\r\n              Vendor Page\r\n            </ion-button>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </div> -->\r\n\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=\"12\">\r\n          <ng-container *ngIf=\"vendors.length && settings.active\">\r\n            <ion-searchbar [(ngModel)]=\"vendorSearch\" mode=\"ios\" animated showCancelButton=\"focus\"\r\n              placeholder=\"Search vendor\"></ion-searchbar>\r\n            <div class=\"tableArea\">\r\n              <table>\r\n                <thead>\r\n                  <tr>\r\n                    <!-- <th>Image</th> -->\r\n                    <th>SN.</th>\r\n                    <th>Vendor Name</th>\r\n                    <th>Phone No</th>\r\n                    <th>Actions</th>\r\n                    <!-- <th>Edit</th>\r\n                    <th>Vendor Page</th>\r\n                    <th>Delete</th> -->\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let vendor of vendors | filter: vendorSearch; let i=index\">\r\n                    <!-- <td (click)=\"editVendor(vendor)\" style=\"cursor: pointer;\">\r\n                        <ng-container *ngIf=\"vendor?.dP; else noImg\">\r\n                          <div class=\"productImage\">\r\n                            <img [src]=\"vendor.dP\" alt=\"\">\r\n                          </div>\r\n                        </ng-container>\r\n                        <ng-template #noImg>\r\n                          <div class=\"noImg\"></div>\r\n                        </ng-template>\r\n                      </td> -->\r\n                    <td class=\"editVendor\">{{i+1}}</td>\r\n                    <td class=\"editVendor\" (click)=\"editVendor(vendor)\">{{vendor.name}}</td>\r\n                    <td>{{vendor.phoneNo}}</td>\r\n                    <!-- <td>\r\n                        <ion-button (click)=\"editVendor(vendor)\" class=\"btn-sml\" fill=\"outline\" shape=\"round\">\r\n                          Edit\r\n                        </ion-button>\r\n                      </td>\r\n                      <td>\r\n                        <ion-button (click)=\"pageVendor(vendor.id,vendor.name)\" class=\"btn-sml\" fill=\"outline\" shape=\"round\">\r\n                          Vendor Page\r\n                        </ion-button>\r\n                      </td>\r\n                      <td>\r\n                        <ion-button (click)=\"deleteVendor(vendor.id)\" class=\"btn-sml\" fill=\"outline\" shape=\"round\" color=\"danger\">\r\n                          Delete\r\n                        </ion-button>\r\n                      </td> -->\r\n\r\n                    <td>\r\n                      <div class=\"actionBtn\">\r\n                        <ion-button (click)=\"editVendor(vendor)\" class=\"btn-sml\" fill=\"outline\" shape=\"round\">\r\n                          Edit\r\n                        </ion-button>\r\n                        <ion-button (click)=\"pageVendor(vendor.id,vendor.name)\" class=\"btn-sml\" fill=\"outline\"\r\n                          shape=\"round\">\r\n                          Vendor Page\r\n                        </ion-button>\r\n                        <ion-button (click)=\"deleteVendor(vendor.id)\" class=\"btn-sml\" fill=\"outline\" shape=\"round\"\r\n                          color=\"danger\">\r\n                          Delete\r\n                        </ion-button>\r\n                      </div>\r\n                    </td>\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          </ng-container>\r\n\r\n          <ng-container *ngIf=\"!vendors.length\">\r\n            <div class=\"no-data\" text-center>\r\n              <img src=\"assets/img/no-user.png\" alt=\"\">\r\n              <h6>No Vendor</h6>\r\n            </div>\r\n          </ng-container>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n  <br><br>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/multi-vendor/multi-vendor-all/multi-vendor-all.module.ts":
/*!********************************************************************************!*\
  !*** ./src/app/admin/multi-vendor/multi-vendor-all/multi-vendor-all.module.ts ***!
  \********************************************************************************/
/*! exports provided: MultiVendorAllPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiVendorAllPageModule", function() { return MultiVendorAllPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _multi_vendor_all_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./multi-vendor-all.page */ "./src/app/admin/multi-vendor/multi-vendor-all/multi-vendor-all.page.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.js");








const routes = [
    {
        path: '',
        component: _multi_vendor_all_page__WEBPACK_IMPORTED_MODULE_6__["MultiVendorAllPage"]
    }
];
let MultiVendorAllPageModule = class MultiVendorAllPageModule {
};
MultiVendorAllPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__["Ng2SearchPipeModule"]
        ],
        declarations: [_multi_vendor_all_page__WEBPACK_IMPORTED_MODULE_6__["MultiVendorAllPage"]]
    })
], MultiVendorAllPageModule);



/***/ }),

/***/ "./src/app/admin/multi-vendor/multi-vendor-all/multi-vendor-all.page.scss":
/*!********************************************************************************!*\
  !*** ./src/app/admin/multi-vendor/multi-vendor-all/multi-vendor-all.page.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  padding-left: 50px;\n  padding-right: 50px;\n  padding-bottom: 30px;\n  background: white;\n  text-align: center;\n  width: 60vw;\n  margin: 0% auto;\n}\n\n.toggle {\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 32vw;\n}\n\n.toggleSub {\n  font-size: large;\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 30vw;\n}\n\nion-toggle {\n  margin-top: -10px;\n}\n\n.item-inner {\n  min-height: 1px !important;\n}\n\n.label-md {\n  margin-bottom: 1px !important;\n  margin-top: 1px !important;\n}\n\ninput {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.item {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n.card {\n  border: 1px solid lightgray;\n  width: 30vw;\n  margin: 0% auto;\n}\n\n.buttons {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n#cardBtn1 {\n  border-radius: 10px;\n  color: white;\n  background: black;\n  padding: 5px;\n  width: 80px;\n}\n\n#cardBtn2 {\n  border-radius: 10px;\n  color: white;\n  background: var(--ion-color-primary);\n  padding: 5px;\n  width: 80px;\n}\n\n.tab {\n  display: -webkit-box;\n  display: flex;\n  justify-content: space-around;\n  border-bottom: 1px lightgray;\n  font-size: large !important;\n  font-weight: 500;\n  border-bottom: 1px solid lightgray;\n}\n\ninput {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.form {\n  text-align: left;\n  width: 20vw;\n  margin: 0% auto;\n}\n\n.vendorList {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 80;\n}\n\n.name {\n  width: calc(100% - 410px);\n  max-width: calc(100% - 410px);\n}\n\n.list-header {\n  margin-top: -40px;\n  width: 53.5vw;\n  position: relative;\n}\n\n.list-container {\n  margin-top: 90px;\n  width: 53.5vw;\n}\n\n.list-container ion-grid ion-row {\n  border-bottom: var(--ion-color-medium) 1px solid;\n  margin-left: 6.5vw;\n}\n\n.list-container ion-grid ion-row ion-col {\n  -webkit-box-align: center;\n          align-items: center;\n  display: -webkit-inline-box;\n  display: inline-flex;\n}\n\n.f-d-c {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.f-d-c .m-s-btn {\n  margin-top: 15px;\n}\n\n.big-modal {\n  --width: 50%;\n  --height: 90%;\n}\n\n.tableArea {\n  margin-top: 1rem;\n  border-radius: 6px;\n  padding: 0.5rem;\n}\n\n.tableArea table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.tableArea table thead tr {\n  border-bottom: 1px solid #ccc;\n}\n\n.tableArea table td,\n.tableArea table th {\n  text-align: left;\n  padding: 8px;\n}\n\n.tableArea table tr:hover {\n  border-radius: 6px;\n  background-color: #efefef;\n}\n\n.tableArea .productImage,\n.tableArea .noImg {\n  max-width: 85px;\n  height: 85px;\n  border: 1px solid #f0f0f0;\n  border-radius: 50rem;\n  overflow: hidden;\n}\n\n.tableArea .productImage img,\n.tableArea .noImg img {\n  width: 100%;\n  height: 100%;\n}\n\n.tableArea .noImg {\n  background: transparent url('img-preloader.png') center no-repeat;\n}\n\n.tableArea .editVendor {\n  cursor: pointer;\n  max-width: 300px;\n}\n\n.tableArea .textEnd {\n  text-align: end;\n}\n\n.actionBtn ion-button {\n  margin-right: 8px;\n  margin-bottom: 8px;\n}\n\n.displayFlex {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n          align-items: center;\n  gap: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vbXVsdGktdmVuZG9yL211bHRpLXZlbmRvci1hbGwvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxtdWx0aS12ZW5kb3JcXG11bHRpLXZlbmRvci1hbGxcXG11bHRpLXZlbmRvci1hbGwucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9tdWx0aS12ZW5kb3IvbXVsdGktdmVuZG9yLWFsbC9tdWx0aS12ZW5kb3ItYWxsLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksMkJBQUE7RUFBQSxvQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxXQUFBO0FDQ0o7O0FERUE7RUFDSSxnQkFBQTtFQUNBLDJCQUFBO0VBQUEsb0JBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EsV0FBQTtBQ0NKOztBREVBO0VBQ0ksaUJBQUE7QUNDSjs7QURFQTtFQUNJLDBCQUFBO0FDQ0o7O0FERUE7RUFDSSw2QkFBQTtFQUNBLDBCQUFBO0FDQ0o7O0FEU0E7RUFDSSxzQkFBQTtFQUNBLGtCQUFBO0FDTko7O0FEU0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtVQUFBLDZCQUFBO0FDTko7O0FEU0E7RUFDSSwyQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FDTko7O0FEU0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtVQUFBLDZCQUFBO0FDTko7O0FEU0E7RUFDSSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FDTko7O0FEU0E7RUFDSSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxvQ0FBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FDTko7O0FEU0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw2QkFBQTtFQUNBLDRCQUFBO0VBQ0EsMkJBQUE7RUFDQSxnQkFBQTtFQUNBLGtDQUFBO0FDTko7O0FEU0E7RUFDSSxzQkFBQTtFQUNBLGtCQUFBO0FDTko7O0FEU0E7RUFDSSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FDTko7O0FEU0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EsU0FBQTtBQ05KOztBRFNBO0VBQ0kseUJBQUE7RUFDQSw2QkFBQTtBQ05KOztBRFNBO0VBQ0ksaUJBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7QUNOSjs7QURTQTtFQUNJLGdCQUFBO0VBQ0EsYUFBQTtBQ05KOztBRFFRO0VBQ0EsZ0RBQUE7RUFDQSxrQkFBQTtBQ05SOztBRE9RO0VBQ0kseUJBQUE7VUFBQSxtQkFBQTtFQUNBLDJCQUFBO0VBQUEsb0JBQUE7QUNMWjs7QURXQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNSSjs7QURVSTtFQUNFLGdCQUFBO0FDUk47O0FEYUE7RUFDSSxZQUFBO0VBQ0EsYUFBQTtBQ1ZKOztBRGFBO0VBQ0ksZ0JBQUE7RUFFQSxrQkFBQTtFQUNBLGVBQUE7QUNYSjs7QURhSTtFQUNJLHlCQUFBO0VBQ0EsV0FBQTtBQ1hSOztBRGFRO0VBQ0ksNkJBQUE7QUNYWjs7QURjUTs7RUFFSSxnQkFBQTtFQUNBLFlBQUE7QUNaWjs7QUR1QlE7RUFDSSxrQkFBQTtFQUNBLHlCQUFBO0FDckJaOztBRHlCSTs7RUFHSSxlQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtBQ3hCUjs7QUQwQlE7O0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUN2Qlo7O0FEMkJJO0VBQ0ksaUVBQUE7QUN6QlI7O0FENEJJO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0FDMUJSOztBRDZCSTtFQUNJLGVBQUE7QUMzQlI7O0FEK0JJO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtBQzVCUjs7QURnQ0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFFQSx1QkFBQTtVQUFBLDJCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLFNBQUE7QUM5QkoiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9tdWx0aS12ZW5kb3IvbXVsdGktdmVuZG9yLWFsbC9tdWx0aS12ZW5kb3ItYWxsLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWlue1xyXG4gICAgcGFkZGluZy1sZWZ0OiA1MHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogNTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAzMHB4O1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB3aWR0aDogNjB2dztcclxuICAgIG1hcmdpbjogMCUgYXV0b1xyXG59XHJcblxyXG4udG9nZ2xle1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICB3aWR0aDogMzJ2dztcclxufVxyXG5cclxuLnRvZ2dsZVN1YntcclxuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIHdpZHRoOiAzMHZ3O1xyXG59XHJcblxyXG5pb24tdG9nZ2xle1xyXG4gICAgbWFyZ2luLXRvcDogLTEwcHhcclxufVxyXG5cclxuLml0ZW0taW5uZXJ7XHJcbiAgICBtaW4taGVpZ2h0OiAxcHggIWltcG9ydGFudDtcclxuICAgIH1cclxuXHJcbi5sYWJlbC1tZHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFweCFpbXBvcnRhbnQ7XHJcbiAgICBtYXJnaW4tdG9wOiAxcHghaW1wb3J0YW50O1xyXG59XHJcblxyXG4vLyBpb24taXRlbS1kaXZpZGVye1xyXG4vLyAgICAgbWFyZ2luLXRvcDogMHB4O1xyXG4vLyAgICAgbWluLWhlaWdodDogMXB4IWltcG9ydGFudDtcclxuLy8gICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcclxuLy8gICAgIG9wYWNpdHk6IDUwJVxyXG4vLyB9XHJcblxyXG5pbnB1dHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5pdGVte1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5XHJcbn1cclxuXHJcbi5jYXJke1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICAgd2lkdGg6IDMwdnc7XHJcbiAgICBtYXJnaW46IDAlIGF1dG9cclxufVxyXG5cclxuLmJ1dHRvbnN7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHlcclxufVxyXG5cclxuI2NhcmRCdG4xe1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQ6IGJsYWNrO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgd2lkdGg6IDgwcHhcclxufVxyXG5cclxuI2NhcmRCdG4ye1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIHdpZHRoOiA4MHB4XHJcbn1cclxuXHJcbi50YWJ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggbGlnaHRncmF5O1xyXG4gICAgZm9udC1zaXplOiBsYXJnZSAhaW1wb3J0YW50O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbn1cclxuXHJcbmlucHV0e1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLmZvcm17XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgd2lkdGg6IDIwdnc7XHJcbiAgICBtYXJnaW46IDAlIGF1dG9cclxufVxyXG5cclxuLnZlbmRvckxpc3R7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgd2lkdGg6IDgwXHJcbn1cclxuXHJcbi5uYW1le1xyXG4gICAgd2lkdGg6IGNhbGMoMTAwJSAtIDQxMHB4KTtcclxuICAgIG1heC13aWR0aDogY2FsYygxMDAlIC0gNDEwcHgpO1xyXG4gIH1cclxuXHJcbi5saXN0LWhlYWRlcntcclxuICAgIG1hcmdpbi10b3A6IC00MHB4O1xyXG4gICAgd2lkdGg6IDUzLjV2dztcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZVxyXG4gIH1cclxuICBcclxuLmxpc3QtY29udGFpbmVye1xyXG4gICAgbWFyZ2luLXRvcDogOTBweDtcclxuICAgIHdpZHRoOiA1My41dnc7XHJcbiAgICBpb24tZ3JpZHtcclxuICAgICAgICBpb24tcm93e1xyXG4gICAgICAgIGJvcmRlci1ib3R0b206IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pIDFweCBzb2xpZDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogNi41dnc7XHJcbiAgICAgICAgaW9uLWNvbHtcclxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLmYtZC1jIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBcclxuICAgIC5tLXMtYnRuIHtcclxuICAgICAgbWFyZ2luLXRvcDogMTVweDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFxyXG4uYmlnLW1vZGFsIHtcclxuICAgIC0td2lkdGg6IDUwJTtcclxuICAgIC0taGVpZ2h0OiA5MCU7XHJcbn1cclxuXHJcbi50YWJsZUFyZWEge1xyXG4gICAgbWFyZ2luLXRvcDogMXJlbTtcclxuICAgIC8vIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICBwYWRkaW5nOiAwLjVyZW07XHJcblxyXG4gICAgdGFibGUge1xyXG4gICAgICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcblxyXG4gICAgICAgIHRoZWFkIHRyIHtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZCxcclxuICAgICAgICB0aCB7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDhweDtcclxuICAgICAgICAgICAgLy8gbWF4LXdpZHRoOiAxMDBweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRyOm50aC1jaGlsZChldmVuKSB7XHJcbiAgICAgICAgLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkZGRkO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB0ciB0ZDpudGgtbGFzdC1jaGlsZCgtbiszKSB7XHJcbiAgICAgICAgLy8gICAgIHdpZHRoOiAxMDBweDtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIHRyOmhvdmVyIHtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAucHJvZHVjdEltYWdlLFxyXG4gICAgLm5vSW1nIHtcclxuICAgICAgICAvLyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXCIuLi8uLi8uLi8uLi9hc3NldHMvaW1nL2ltZy1wcmVsb2FkZXIucG5nXCIpIGNlbnRlciBuby1yZXBlYXQ7XHJcbiAgICAgICAgbWF4LXdpZHRoOiA4NXB4O1xyXG4gICAgICAgIGhlaWdodDogODVweDtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZjBmMGYwO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwcmVtO1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgLy8gcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIGltZyB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5ub0ltZyB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9pbWctcHJlbG9hZGVyLnBuZ1wiKSBjZW50ZXIgbm8tcmVwZWF0O1xyXG4gICAgfVxyXG5cclxuICAgIC5lZGl0VmVuZG9yIHtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAzMDBweDtcclxuICAgIH1cclxuXHJcbiAgICAudGV4dEVuZCB7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogZW5kO1xyXG4gICAgfVxyXG59XHJcbi5hY3Rpb25CdG57XHJcbiAgICBpb24tYnV0dG9ue1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogOHB4O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcclxuICAgIH1cclxufVxyXG5cclxuLmRpc3BsYXlGbGV4IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAvLyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDFyZW07XHJcbn0iLCIubWFpbiB7XG4gIHBhZGRpbmctbGVmdDogNTBweDtcbiAgcGFkZGluZy1yaWdodDogNTBweDtcbiAgcGFkZGluZy1ib3R0b206IDMwcHg7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiA2MHZ3O1xuICBtYXJnaW46IDAlIGF1dG87XG59XG5cbi50b2dnbGUge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogMzJ2dztcbn1cblxuLnRvZ2dsZVN1YiB7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAzMHZ3O1xufVxuXG5pb24tdG9nZ2xlIHtcbiAgbWFyZ2luLXRvcDogLTEwcHg7XG59XG5cbi5pdGVtLWlubmVyIHtcbiAgbWluLWhlaWdodDogMXB4ICFpbXBvcnRhbnQ7XG59XG5cbi5sYWJlbC1tZCB7XG4gIG1hcmdpbi1ib3R0b206IDFweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tdG9wOiAxcHggIWltcG9ydGFudDtcbn1cblxuaW5wdXQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG59XG5cbi5jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICB3aWR0aDogMzB2dztcbiAgbWFyZ2luOiAwJSBhdXRvO1xufVxuXG4uYnV0dG9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xufVxuXG4jY2FyZEJ0bjEge1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQ6IGJsYWNrO1xuICBwYWRkaW5nOiA1cHg7XG4gIHdpZHRoOiA4MHB4O1xufVxuXG4jY2FyZEJ0bjIge1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgcGFkZGluZzogNXB4O1xuICB3aWR0aDogODBweDtcbn1cblxuLnRhYiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBib3JkZXItYm90dG9tOiAxcHggbGlnaHRncmF5O1xuICBmb250LXNpemU6IGxhcmdlICFpbXBvcnRhbnQ7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbmlucHV0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4uZm9ybSB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHdpZHRoOiAyMHZ3O1xuICBtYXJnaW46IDAlIGF1dG87XG59XG5cbi52ZW5kb3JMaXN0IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogODA7XG59XG5cbi5uYW1lIHtcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDQxMHB4KTtcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSA0MTBweCk7XG59XG5cbi5saXN0LWhlYWRlciB7XG4gIG1hcmdpbi10b3A6IC00MHB4O1xuICB3aWR0aDogNTMuNXZ3O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5saXN0LWNvbnRhaW5lciB7XG4gIG1hcmdpbi10b3A6IDkwcHg7XG4gIHdpZHRoOiA1My41dnc7XG59XG4ubGlzdC1jb250YWluZXIgaW9uLWdyaWQgaW9uLXJvdyB7XG4gIGJvcmRlci1ib3R0b206IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pIDFweCBzb2xpZDtcbiAgbWFyZ2luLWxlZnQ6IDYuNXZ3O1xufVxuLmxpc3QtY29udGFpbmVyIGlvbi1ncmlkIGlvbi1yb3cgaW9uLWNvbCB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xufVxuXG4uZi1kLWMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmYtZC1jIC5tLXMtYnRuIHtcbiAgbWFyZ2luLXRvcDogMTVweDtcbn1cblxuLmJpZy1tb2RhbCB7XG4gIC0td2lkdGg6IDUwJTtcbiAgLS1oZWlnaHQ6IDkwJTtcbn1cblxuLnRhYmxlQXJlYSB7XG4gIG1hcmdpbi10b3A6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogMC41cmVtO1xufVxuLnRhYmxlQXJlYSB0YWJsZSB7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIHdpZHRoOiAxMDAlO1xufVxuLnRhYmxlQXJlYSB0YWJsZSB0aGVhZCB0ciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xufVxuLnRhYmxlQXJlYSB0YWJsZSB0ZCxcbi50YWJsZUFyZWEgdGFibGUgdGgge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBwYWRkaW5nOiA4cHg7XG59XG4udGFibGVBcmVhIHRhYmxlIHRyOmhvdmVyIHtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xufVxuLnRhYmxlQXJlYSAucHJvZHVjdEltYWdlLFxuLnRhYmxlQXJlYSAubm9JbWcge1xuICBtYXgtd2lkdGg6IDg1cHg7XG4gIGhlaWdodDogODVweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2YwZjBmMDtcbiAgYm9yZGVyLXJhZGl1czogNTByZW07XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4udGFibGVBcmVhIC5wcm9kdWN0SW1hZ2UgaW1nLFxuLnRhYmxlQXJlYSAubm9JbWcgaW1nIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cbi50YWJsZUFyZWEgLm5vSW1nIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9pbWctcHJlbG9hZGVyLnBuZ1wiKSBjZW50ZXIgbm8tcmVwZWF0O1xufVxuLnRhYmxlQXJlYSAuZWRpdFZlbmRvciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbWF4LXdpZHRoOiAzMDBweDtcbn1cbi50YWJsZUFyZWEgLnRleHRFbmQge1xuICB0ZXh0LWFsaWduOiBlbmQ7XG59XG5cbi5hY3Rpb25CdG4gaW9uLWJ1dHRvbiB7XG4gIG1hcmdpbi1yaWdodDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG59XG5cbi5kaXNwbGF5RmxleCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxcmVtO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/multi-vendor/multi-vendor-all/multi-vendor-all.page.ts":
/*!******************************************************************************!*\
  !*** ./src/app/admin/multi-vendor/multi-vendor-all/multi-vendor-all.page.ts ***!
  \******************************************************************************/
/*! exports provided: MultiVendorAllPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiVendorAllPage", function() { return MultiVendorAllPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var _add_vendor_modal_add_vendor_modal_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./add-vendor-modal/add-vendor-modal.page */ "./src/app/admin/multi-vendor/multi-vendor-all/add-vendor-modal/add-vendor-modal.page.ts");
/* harmony import */ var src_app_components_vendor_page_vendor_page_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/components/vendor-page/vendor-page.component */ "./src/app/components/vendor-page/vendor-page.component.ts");










let MultiVendorAllPage = class MultiVendorAllPage {
    constructor(events, labelService, router, sharedService, alertController, configService, vendorService, modalController) {
        this.events = events;
        this.labelService = labelService;
        this.router = router;
        this.sharedService = sharedService;
        this.alertController = alertController;
        this.configService = configService;
        this.vendorService = vendorService;
        this.modalController = modalController;
        this.vendors = [];
        this.multiVendor = false;
        this.multiVendorDoc = false;
        this.settings = {
            active: false,
            showVendorInfo: false,
            oneVendorPerRegion: false,
            vendorKmBased: false,
            vendorKmDistance: 0
        };
        this.searchUser = '';
        this.searchUserPhone = '';
        this.vendorSearch = '';
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.multiVendor = this.configService.environment.multiVendor;
            let multiRegionEnv = this.configService.environment.multiRegion;
            this.vendorsLimit = this.configService.environment.vendorsLimit;
            let multiRegionActive = yield this.vendorService.getMultiRegion();
            // if (multiRegionEnv && multiRegionActive && this.settings.oneVendorPerRegion) {
            //   this.settings.oneVendorPerRegion = true;
            // }
            if (this.multiVendor == false) {
                const alert = yield this.alertController.create({
                    message: "Sorry, this feature is not available. Please upgrade your plan for access",
                    buttons: ['ok']
                });
                alert.onWillDismiss().then(() => {
                    this.router.navigate(['admin-home']);
                });
                yield alert.present();
            }
            this.initializeSubscriptions();
            this.events.publish('vendor:getActiveStatus');
            this.vendors = yield this.vendorService.getAllVendors();
            console.log("vendors", this.vendors);
            // this.events.publish('vendor:getAllVendors');
        });
    }
    ngOnInit() {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.ALL_VENDORS_LABELS = this.labelService.labels['ALL_VENDORS'];
        this.headerText = this.ALL_VENDORS_LABELS['header_text'];
    }
    ngOnDestroy() {
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('vendor:setMultiVendorDetailsSuccess', () => {
            if (this.settings.active) {
                this.multiVendorDoc = true;
            }
            if (this.sharedService.loading) {
                this.sharedService.loading.dismiss();
            }
            this.sharedService.presentToast("Settings saved successfully");
        });
        this.events.subscribe('vendor:publishActiveStatus', (data) => {
            if (data) {
                this.multiVendorDoc = true;
                this.settings.active = data.active;
                this.settings.showVendorInfo = data.showVendorInfo ? data.showVendorInfo : this.settings.showVendorInfo;
                this.settings.oneVendorPerRegion = data.oneVendorPerRegion ? data.oneVendorPerRegion : this.settings.oneVendorPerRegion;
            }
            else {
                this.multiVendorDoc = false;
            }
        });
        // this.events.subscribe('vendor:publishAllVendors', (vendors) => {
        //   if(vendors.length) {
        //     this.vendors = vendors;
        //     console.log('if:', vendors);
        //   } else {
        //     console.log('else:', vendors);
        //     this.vendors = [];
        //   }
        // });
        this.events.subscribe('vendor:vendorDeleted', () => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.sharedService.loading) {
                this.sharedService.loading.dismiss();
            }
            this.sharedService.presentAlert("Vendor Deleted");
            this.vendors = yield this.vendorService.getAllVendors();
            //this.events.publish('vendor:getAllVendors');
        }));
    }
    saveSettings() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.settings.vendorKmBased == true && this.settings.vendorKmDistance <= 0) {
                yield this.sharedService.presentAlert("Distance cant be zero!");
                return;
            }
            else {
                yield this.sharedService.presentLoading();
                this.events.publish('vendor:setMultiVendorDetails', this.settings);
            }
        });
    }
    editVendor(vendorDetails) {
        console.log('vendor id ->', vendorDetails);
        const navigationExtras = {
            state: {
                data: {
                    vendorData: vendorDetails,
                    vendorList: this.vendors
                }
            }
        };
        // console.log('vendor data ->', this.vendors[i])
        this.router.navigate(['multi-vendor-add'], navigationExtras);
    }
    deleteVendor(id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.alertController.create({
                message: 'Are you sure you want to delete this vendor ?',
                buttons: [
                    {
                        role: 'cancel',
                        text: 'cancel',
                        cssClass: 'secondary',
                        handler: () => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                            console.log("cancelled");
                        })
                    }, {
                        text: 'Delete',
                        handler: () => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                            console.log("Delete vendor");
                            yield this.sharedService.presentLoading();
                            this.events.publish('vendor:deleteVendor', id);
                        })
                    }
                ]
            });
            yield modal.present();
        });
    }
    gotoMultiVendorAdd() {
        this.router.navigate(['multi-vendor-add']);
    }
    removeSubscriptions() {
        this.events.unsubscribe('vendor:multiVendorActiveChanged');
        this.events.unsubscribe('vendor:publishActiveStatus');
        // this.events.unsubscribe('vendor:publishAllVendors');
        this.events.unsubscribe('vendor:vendorActiveChanged');
        this.events.unsubscribe('vendor:vendorDeleted');
    }
    addVendor() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let multiVendor = yield this.vendorService.getActiveStatus('service');
            console.log('multiVendor:::', multiVendor);
            multiVendor['count'] = multiVendor.count ? multiVendor.count : 0;
            if (multiVendor.count < this.vendorsLimit) {
                const modal = yield this.modalController.create({
                    component: _add_vendor_modal_add_vendor_modal_page__WEBPACK_IMPORTED_MODULE_8__["AddVendorModalPage"],
                    cssClass: 'custom-modal',
                    showBackdrop: true,
                    backdropDismiss: false,
                });
                modal.onDidDismiss()
                    .then((res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                    console.log('data from modal', res);
                    if (res.data.length) {
                        this.vendors = yield this.vendorService.getAllVendors();
                    }
                }));
                yield modal.present();
            }
            else {
                this.sharedService.presentAlert('Vendor Limit Reached');
            }
        });
    }
    pageVendor(id, name) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_components_vendor_page_vendor_page_component__WEBPACK_IMPORTED_MODULE_9__["VendorPageComponent"],
                cssClass: 'custom-modal big-modal',
                componentProps: { vendorId: id, vendorName: name }
            });
            modal.onDidDismiss().then(() => {
            });
            yield modal.present();
        });
    }
};
MultiVendorAllPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
    { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"] },
    { type: src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_7__["VendorService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] }
];
MultiVendorAllPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-multi-vendor-all',
        template: __webpack_require__(/*! raw-loader!./multi-vendor-all.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/multi-vendor/multi-vendor-all/multi-vendor-all.page.html"),
        styles: [__webpack_require__(/*! ./multi-vendor-all.page.scss */ "./src/app/admin/multi-vendor/multi-vendor-all/multi-vendor-all.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
        src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
        src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"],
        src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_7__["VendorService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"]])
], MultiVendorAllPage);



/***/ })

}]);
//# sourceMappingURL=admin-multi-vendor-multi-vendor-all-multi-vendor-all-module-es2015.js.map