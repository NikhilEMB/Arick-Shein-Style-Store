(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-multi-region-multi-region-all-multi-region-all-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/multi-region/multi-region-all/multi-region-all.page.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/multi-region/multi-region-all/multi-region-all.page.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<link rel=\"stylesheet\" href=\"https://www.w3schools.com/w3css/4/w3.css\">\r\n\r\n<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Mutiple Regions</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>  \r\n\r\n<ion-content>\r\n  <div class=\"main\">\r\n    <br><br>\r\n    <div class=\"toggle\">\r\n      <p>Active</p>\r\n      <div class=\"toggle-btn\">\r\n        <label class=\"switch\">\r\n          <input type=\"checkbox\" (click)=\"subscriptionsActiveToggle()\" [checked]=\"isMultiRegionActive\">\r\n          <span class=\"slider round\"></span>\r\n        </label>\r\n      </div>\r\n    </div>\r\n    <br>\r\n    <div class=\"toggle\" *ngIf='type'>\r\n      <p>Region type : </p>\r\n      <ion-select class=\"regionSelect\"  [(ngModel)]=\"type\"\r\n        (ionChange)=\"changeType($event)\" placeholder=\"Select Type\" style=\"border: 1px solid lightgray;margin-top: 5px\">\r\n        <ion-select-option value=\"pincodes\">Pincodes</ion-select-option>\r\n        <ion-select-option value=\"area\">Area</ion-select-option>\r\n      </ion-select>\r\n    </div>\r\n    <div class=\"list-header\">\r\n      <ion-grid class=\"ion-no-padding\">\r\n        <ion-row>\r\n          <ion-col class=\"name\">\r\n            <p>Region</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>Active</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>Action</p>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </div>\r\n    <div class=\"list-container\">\r\n      <ion-grid>\r\n        <ion-row *ngFor=\"let region of regions; let i = index\" class=\"order-row\">\r\n          <ion-col class=\"name\">\r\n            <p class=\"ion-text-capitalize\" (click)=\"editRegion(i)\">{{region.name}}</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <div class=\"toggle-btn\">\r\n              <label class=\"switch\">\r\n                <input type=\"checkbox\" (click)=\"toggleRegionActive(i)\" [checked]=\"region.active\">\r\n                <span class=\"slider round\"></span>\r\n              </label>\r\n            </div>\r\n          </ion-col>\r\n          <ion-col class=\"action\">\r\n            <ion-button (click)=\"editRegion(i)\" class=\"btn-sml i-start\" fill=\"outline\"\r\n              shape=\"round\">\r\n              Edit\r\n            </ion-button>&nbsp;&nbsp;\r\n            <ion-button (click)=\"deleteRegion(region.id)\" class=\"btn-sml i-start m-s-btn\" fill=\"outline\"\r\n              shape=\"round\">\r\n              Delete\r\n            </ion-button>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </div>\r\n    <br><br>\r\n    <div class=\"page-footer\">\r\n      <ion-row class=\"ion-justify-content-center\">\r\n        <ion-button fill=\"outline\" shape=\"round\" size=\"small\" (click)=\"gotoMultiRegionAdd()\">\r\n          Add New\r\n        </ion-button>\r\n      </ion-row>\r\n    </div>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/multi-region/multi-region-all/multi-region-all.module.ts":
/*!********************************************************************************!*\
  !*** ./src/app/admin/multi-region/multi-region-all/multi-region-all.module.ts ***!
  \********************************************************************************/
/*! exports provided: MultiRegionAllPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiRegionAllPageModule", function() { return MultiRegionAllPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _multi_region_all_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./multi-region-all.page */ "./src/app/admin/multi-region/multi-region-all/multi-region-all.page.ts");







const routes = [
    {
        path: '',
        component: _multi_region_all_page__WEBPACK_IMPORTED_MODULE_6__["MultiRegionAllPage"]
    }
];
let MultiRegionAllPageModule = class MultiRegionAllPageModule {
};
MultiRegionAllPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_multi_region_all_page__WEBPACK_IMPORTED_MODULE_6__["MultiRegionAllPage"]]
    })
], MultiRegionAllPageModule);



/***/ }),

/***/ "./src/app/admin/multi-region/multi-region-all/multi-region-all.page.scss":
/*!********************************************************************************!*\
  !*** ./src/app/admin/multi-region/multi-region-all/multi-region-all.page.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  padding-left: 50px;\n  padding-right: 50px;\n  padding-bottom: 30px;\n  background: white;\n  text-align: center;\n  width: 60vw;\n  margin: 0% auto;\n}\n\n.toggle {\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 32vw;\n}\n\n.toggleSub {\n  font-size: large;\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 30vw;\n}\n\nion-toggle {\n  margin-top: -10px;\n}\n\n.item-inner {\n  min-height: 1px !important;\n}\n\n.label-md {\n  margin-bottom: 1px !important;\n  margin-top: 1px !important;\n}\n\nion-item-divider {\n  margin-top: 0px;\n  min-height: 1px !important;\n  background: lightgray;\n  opacity: 50%;\n}\n\ninput {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.item {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n.card {\n  border: 1px solid lightgray;\n  width: 30vw;\n  margin: 0% auto;\n}\n\n.buttons {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n#cardBtn1 {\n  border-radius: 10px;\n  color: white;\n  background: black;\n  padding: 5px;\n  width: 80px;\n}\n\n#cardBtn2 {\n  border-radius: 10px;\n  color: white;\n  background: var(--ion-color-primary);\n  padding: 5px;\n  width: 80px;\n}\n\n.tab {\n  display: -webkit-box;\n  display: flex;\n  justify-content: space-around;\n  border-bottom: 1px lightgray;\n  font-size: large !important;\n  font-weight: 500;\n  border-bottom: 1px solid lightgray;\n}\n\ninput {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.form {\n  text-align: left;\n  width: 20vw;\n  margin: 0% auto;\n}\n\n.regionList {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 32vw;\n}\n\n.name {\n  width: 60vw;\n  max-width: 60vw;\n}\n\n.list-header {\n  width: 60vw;\n  position: relative;\n  margin-top: -10px;\n}\n\n.list-container {\n  margin-top: 90px;\n}\n\n.list-container ion-grid ion-row {\n  border-bottom: var(--ion-color-medium) 1px solid;\n}\n\n.list-container ion-grid ion-row ion-col {\n  -webkit-box-pack: center;\n          justify-content: center;\n  display: -webkit-inline-box;\n  display: inline-flex;\n}\n\n.f-d-c {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.f-d-c .m-s-btn {\n  margin-top: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vbXVsdGktcmVnaW9uL211bHRpLXJlZ2lvbi1hbGwvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxtdWx0aS1yZWdpb25cXG11bHRpLXJlZ2lvbi1hbGxcXG11bHRpLXJlZ2lvbi1hbGwucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9tdWx0aS1yZWdpb24vbXVsdGktcmVnaW9uLWFsbC9tdWx0aS1yZWdpb24tYWxsLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksMkJBQUE7RUFBQSxvQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxXQUFBO0FDQ0o7O0FERUE7RUFDSSxnQkFBQTtFQUNBLDJCQUFBO0VBQUEsb0JBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EsV0FBQTtBQ0NKOztBREVBO0VBQ0ksaUJBQUE7QUNDSjs7QURFQTtFQUNJLDBCQUFBO0FDQ0o7O0FERUE7RUFDSSw2QkFBQTtFQUNBLDBCQUFBO0FDQ0o7O0FERUE7RUFDSSxlQUFBO0VBQ0EsMEJBQUE7RUFDQSxxQkFBQTtFQUNBLFlBQUE7QUNDSjs7QURFQTtFQUNJLHNCQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO1VBQUEsNkJBQUE7QUNDSjs7QURFQTtFQUNJLDJCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO1VBQUEsNkJBQUE7QUNDSjs7QURFQTtFQUNJLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUNDSjs7QURFQTtFQUNJLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLG9DQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDZCQUFBO0VBQ0EsNEJBQUE7RUFDQSwyQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0NBQUE7QUNDSjs7QURFQTtFQUNJLHNCQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFQTtFQUNJLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxXQUFBO0FDQ0o7O0FERUE7RUFDSSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksV0FBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUNDSjs7QURFQTtFQUNJLGdCQUFBO0FDQ0o7O0FEQ1E7RUFDQSxnREFBQTtBQ0NSOztBRENRO0VBQ0ksd0JBQUE7VUFBQSx1QkFBQTtFQUNBLDJCQUFBO0VBQUEsb0JBQUE7QUNDWjs7QURLQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNGSjs7QURJSTtFQUNFLGdCQUFBO0FDRk4iLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9tdWx0aS1yZWdpb24vbXVsdGktcmVnaW9uLWFsbC9tdWx0aS1yZWdpb24tYWxsLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWlue1xyXG4gICAgcGFkZGluZy1sZWZ0OiA1MHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogNTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAzMHB4O1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB3aWR0aDogNjB2dztcclxuICAgIG1hcmdpbjogMCUgYXV0b1xyXG59XHJcblxyXG4udG9nZ2xle1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICB3aWR0aDogMzJ2dztcclxufVxyXG5cclxuLnRvZ2dsZVN1YntcclxuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIHdpZHRoOiAzMHZ3O1xyXG59XHJcblxyXG5pb24tdG9nZ2xle1xyXG4gICAgbWFyZ2luLXRvcDogLTEwcHhcclxufVxyXG5cclxuLml0ZW0taW5uZXJ7XHJcbiAgICBtaW4taGVpZ2h0OiAxcHggIWltcG9ydGFudDtcclxuICAgIH1cclxuXHJcbi5sYWJlbC1tZHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFweCFpbXBvcnRhbnQ7XHJcbiAgICBtYXJnaW4tdG9wOiAxcHghaW1wb3J0YW50O1xyXG59XHJcblxyXG5pb24taXRlbS1kaXZpZGVye1xyXG4gICAgbWFyZ2luLXRvcDogMHB4O1xyXG4gICAgbWluLWhlaWdodDogMXB4IWltcG9ydGFudDtcclxuICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcclxuICAgIG9wYWNpdHk6IDUwJVxyXG59XHJcblxyXG5pbnB1dHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5pdGVte1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5XHJcbn1cclxuXHJcbi5jYXJke1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICAgd2lkdGg6IDMwdnc7XHJcbiAgICBtYXJnaW46IDAlIGF1dG9cclxufVxyXG5cclxuLmJ1dHRvbnN7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHlcclxufVxyXG5cclxuI2NhcmRCdG4xe1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQ6IGJsYWNrO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgd2lkdGg6IDgwcHhcclxufVxyXG5cclxuI2NhcmRCdG4ye1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIHdpZHRoOiA4MHB4XHJcbn1cclxuXHJcbi50YWJ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggbGlnaHRncmF5O1xyXG4gICAgZm9udC1zaXplOiBsYXJnZSAhaW1wb3J0YW50O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbn1cclxuXHJcbmlucHV0e1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLmZvcm17XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgd2lkdGg6IDIwdnc7XHJcbiAgICBtYXJnaW46IDAlIGF1dG9cclxufVxyXG5cclxuLnJlZ2lvbkxpc3R7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgd2lkdGg6IDMydndcclxufVxyXG5cclxuLm5hbWV7XHJcbiAgICB3aWR0aDogNjB2dztcclxuICAgIG1heC13aWR0aDogNjB2dztcclxuICB9XHJcblxyXG4ubGlzdC1oZWFkZXJ7XHJcbiAgICB3aWR0aDogNjB2dztcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIG1hcmdpbi10b3A6IC0xMHB4XHJcbiAgfVxyXG4gIFxyXG4ubGlzdC1jb250YWluZXJ7XHJcbiAgICBtYXJnaW4tdG9wOiA5MHB4O1xyXG4gICAgaW9uLWdyaWR7XHJcbiAgICAgICAgaW9uLXJvd3tcclxuICAgICAgICBib3JkZXItYm90dG9tOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XHJcbiAgICAgICAgLy8gbWFyZ2luLWxlZnQ6IDV2dztcclxuICAgICAgICBpb24tY29se1xyXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLmYtZC1jIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBcclxuICAgIC5tLXMtYnRuIHtcclxuICAgICAgbWFyZ2luLXRvcDogMTVweDtcclxuICAgIH1cclxuICB9IiwiLm1haW4ge1xuICBwYWRkaW5nLWxlZnQ6IDUwcHg7XG4gIHBhZGRpbmctcmlnaHQ6IDUwcHg7XG4gIHBhZGRpbmctYm90dG9tOiAzMHB4O1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogNjB2dztcbiAgbWFyZ2luOiAwJSBhdXRvO1xufVxuXG4udG9nZ2xlIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgd2lkdGg6IDMydnc7XG59XG5cbi50b2dnbGVTdWIge1xuICBmb250LXNpemU6IGxhcmdlO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogMzB2dztcbn1cblxuaW9uLXRvZ2dsZSB7XG4gIG1hcmdpbi10b3A6IC0xMHB4O1xufVxuXG4uaXRlbS1pbm5lciB7XG4gIG1pbi1oZWlnaHQ6IDFweCAhaW1wb3J0YW50O1xufVxuXG4ubGFiZWwtbWQge1xuICBtYXJnaW4tYm90dG9tOiAxcHggIWltcG9ydGFudDtcbiAgbWFyZ2luLXRvcDogMXB4ICFpbXBvcnRhbnQ7XG59XG5cbmlvbi1pdGVtLWRpdmlkZXIge1xuICBtYXJnaW4tdG9wOiAwcHg7XG4gIG1pbi1oZWlnaHQ6IDFweCAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kOiBsaWdodGdyYXk7XG4gIG9wYWNpdHk6IDUwJTtcbn1cblxuaW5wdXQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG59XG5cbi5jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICB3aWR0aDogMzB2dztcbiAgbWFyZ2luOiAwJSBhdXRvO1xufVxuXG4uYnV0dG9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xufVxuXG4jY2FyZEJ0bjEge1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQ6IGJsYWNrO1xuICBwYWRkaW5nOiA1cHg7XG4gIHdpZHRoOiA4MHB4O1xufVxuXG4jY2FyZEJ0bjIge1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgcGFkZGluZzogNXB4O1xuICB3aWR0aDogODBweDtcbn1cblxuLnRhYiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBib3JkZXItYm90dG9tOiAxcHggbGlnaHRncmF5O1xuICBmb250LXNpemU6IGxhcmdlICFpbXBvcnRhbnQ7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbmlucHV0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4uZm9ybSB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHdpZHRoOiAyMHZ3O1xuICBtYXJnaW46IDAlIGF1dG87XG59XG5cbi5yZWdpb25MaXN0IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogMzJ2dztcbn1cblxuLm5hbWUge1xuICB3aWR0aDogNjB2dztcbiAgbWF4LXdpZHRoOiA2MHZ3O1xufVxuXG4ubGlzdC1oZWFkZXIge1xuICB3aWR0aDogNjB2dztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tdG9wOiAtMTBweDtcbn1cblxuLmxpc3QtY29udGFpbmVyIHtcbiAgbWFyZ2luLXRvcDogOTBweDtcbn1cbi5saXN0LWNvbnRhaW5lciBpb24tZ3JpZCBpb24tcm93IHtcbiAgYm9yZGVyLWJvdHRvbTogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xufVxuLmxpc3QtY29udGFpbmVyIGlvbi1ncmlkIGlvbi1yb3cgaW9uLWNvbCB7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbn1cblxuLmYtZC1jIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5mLWQtYyAubS1zLWJ0biB7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/multi-region/multi-region-all/multi-region-all.page.ts":
/*!******************************************************************************!*\
  !*** ./src/app/admin/multi-region/multi-region-all/multi-region-all.page.ts ***!
  \******************************************************************************/
/*! exports provided: MultiRegionAllPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiRegionAllPage", function() { return MultiRegionAllPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");






let MultiRegionAllPage = class MultiRegionAllPage {
    constructor(events, labelService, alertController, loadingController, router, toastController, configService) {
        this.events = events;
        this.labelService = labelService;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.router = router;
        this.toastController = toastController;
        this.configService = configService;
        this.isMultiRegionActive = false;
        this.regions = [];
        this.multiRegion = false;
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.multiRegion = this.configService.environment.multiRegion;
            if (this.multiRegion == false) {
                const alert = yield this.alertController.create({
                    message: "Sorry, this feature is not available. Please upgrade your plan for access",
                    buttons: ['ok']
                });
                alert.onWillDismiss().then(() => {
                    this.router.navigate(['admin-home']);
                });
                yield alert.present();
            }
            else {
                this.events.publish('multi-region:getActiveStatus');
                this.events.publish('multi-region:getAllRegions');
            }
        });
    }
    ngOnInit() {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.ALL_REGIONS_LABELS = this.labelService.labels['ALL_REGIONS'];
        this.headerText = this.ALL_REGIONS_LABELS['header_text'];
        this.initializeSubscriptions();
    }
    ngOnDestroy() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('multi-region:multiRegionActiveChanged', () => {
            if (this.loading) {
                this.loading.dismiss();
            }
            this.presentToast("Status changed successfully");
        });
        this.events.subscribe('multi-region:publishActiveStatus', (data) => {
            if (data) {
                this.isMultiRegionActive = data.active;
                if (data.regionType) {
                    this.type = data.regionType;
                }
                else {
                    this.type = 'pincodes';
                }
            }
            else {
                this.type = 'pincodes';
            }
        });
        this.events.subscribe('multi-region:publishAllRegions', (regions) => {
            if (regions.length) {
                this.regions = regions;
            }
            else {
                this.regions = [];
            }
        });
        this.events.subscribe('multi-region:regionActiveChanged', () => {
            if (this.loading) {
                this.loading.dismiss();
            }
            this.presentToast("Status changed successfully");
        });
        this.events.subscribe('multi-region:multiRegionTypeChanged', () => {
            if (this.loading) {
                this.loading.dismiss();
            }
            this.presentToast("Region type changed successfully");
        });
        this.events.subscribe('multi-region:regionDeleted', () => {
            if (this.loading) {
                this.loading.dismiss();
            }
            this.presentAlert("Region deleted successfully");
            this.events.publish('multi-region:getAllRegions');
        });
    }
    subscriptionsActiveToggle() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.isMultiRegionActive = !this.isMultiRegionActive;
            yield this.presentLoading(5000, "Please wait ...");
            this.events.publish('multi-region:toggleMultiRegionActive', this.isMultiRegionActive);
        });
    }
    toggleRegionActive(i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.regions[i].active = !this.regions[i].active;
            yield this.presentLoading(5000, "Please wait ...");
            this.events.publish('multi-region:toggleRegionActive', this.regions[i].active, this.regions[i].id);
        });
    }
    editRegion(i) {
        const navigationExtras = {
            state: {
                data: {
                    regionData: this.regions[i],
                    regionType: this.type
                }
            }
        };
        this.router.navigate(['multi-region-add'], navigationExtras);
    }
    deleteRegion(id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading(5000, "Please wait ...");
            this.events.publish('multi-region:deleteRegion', id);
        });
    }
    gotoMultiRegionAdd() {
        const navigationExtras = {
            state: {
                data: {
                    regionType: this.type
                }
            }
        };
        this.router.navigate(['multi-region-add'], navigationExtras);
    }
    changeType(e) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.type = e.target.value;
            yield this.presentLoading(5000, "Please wait ...");
            this.events.publish('multi-region:toggleRegionType', this.type);
        });
    }
    presentLoading(duration, msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: msg,
                duration: duration,
            });
            yield this.loading.present();
        });
    }
    presentAlert(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: [{
                        text: this.SHARED_LABELS['ok'],
                        handler: () => {
                        }
                    }]
            });
            yield alert.present();
        });
    }
    presentToast(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: msg,
                duration: 2000
            });
            toast.present();
        });
    }
    removeSubscriptions() {
        this.events.unsubscribe('multi-region:multiRegionActiveChanged');
        this.events.unsubscribe('multi-region:publishActiveStatus');
        this.events.unsubscribe('multi-region:publishAllRegions');
        this.events.unsubscribe('multi-region:regionActiveChanged');
        this.events.unsubscribe('multi-region:regionDeleted');
        this.events.unsubscribe('multi-region:multiRegionTypeChanged');
    }
};
MultiRegionAllPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
    { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__["ConfigService"] }
];
MultiRegionAllPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-multi-region-all',
        template: __webpack_require__(/*! raw-loader!./multi-region-all.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/multi-region/multi-region-all/multi-region-all.page.html"),
        styles: [__webpack_require__(/*! ./multi-region-all.page.scss */ "./src/app/admin/multi-region/multi-region-all/multi-region-all.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
        src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"],
        src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__["ConfigService"]])
], MultiRegionAllPage);



/***/ })

}]);
//# sourceMappingURL=admin-multi-region-multi-region-all-multi-region-all-module-es2015.js.map