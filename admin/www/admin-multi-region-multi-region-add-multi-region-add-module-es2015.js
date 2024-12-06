(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-multi-region-multi-region-add-multi-region-add-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/multi-region/multi-region-add/multi-region-add.page.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/multi-region/multi-region-add/multi-region-add.page.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">Add Multi Region</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main\">\r\n    <br><br>\r\n    <div class=\"data-field\">\r\n      <p>Active</p>\r\n      <div class=\"toggle-btn\">\r\n        <label class=\"switch\">\r\n          <input type=\"checkbox\" (click)=\"toggleActive()\" [checked]=\"region.active\">\r\n          <span class=\"slider round\"></span>\r\n        </label>\r\n      </div>\r\n    </div>\r\n    <br><br>\r\n    <div class=\"data-field\">\r\n      <div class=\"data-field-txt\">\r\n        Region Name\r\n      </div>\r\n      <br>\r\n      <div>\r\n        <input type=\"text\" [(ngModel)]=\"region.name\" />\r\n      </div>\r\n    </div>\r\n    <br><br>\r\n    <div *ngIf=\"type && (type == 'pincodes')\">\r\n      <div class=\"data-field\">\r\n        <div class=\"data-field-txt\">\r\n          Region Pincodes\r\n        </div>\r\n        <br>\r\n        <div>\r\n          <input type=\"number\" [(ngModel)]=\"pincode\" class=\"pincode-input\"/>&nbsp;&nbsp;&nbsp;&nbsp;\r\n          <ion-button fill=\"outline\" shape=\"round\" size=\"small\" (click)=\"addPincode()\" [disabled]=\"!pincode\">\r\n            Add\r\n          </ion-button>\r\n        </div>\r\n      </div>\r\n      <br>\r\n      <div style=\"justify-content: center;padding: 10px\">\r\n        <div *ngIf=\"region.pincodes.length\">\r\n          <br><br>\r\n          <ion-grid class=\"ion-no-padding data-table ion-text-center\">\r\n              <ion-row class=\"ion-text-capitalize\">\r\n                <ion-col>Pincode</ion-col>\r\n                <ion-col>Remove</ion-col>\r\n              </ion-row>\r\n              <ion-row *ngFor=\"let  pin of region.pincodes; let i=index;\">\r\n                <ion-col>\r\n                    {{pin}}\r\n                </ion-col>\r\n                <ion-col (click)=\"removePin(i)\">\r\n                    <i class=\"flaticon-null-17\"></i>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"type && (type == 'area')\">\r\n      <div class=\"data-field\">\r\n        <div class=\"data-field-txt\">\r\n          Radius for region (in Kms)\r\n        </div>\r\n        <br>\r\n        <div>\r\n          <input type=\"number\" [(ngModel)]=\"radius\" />\r\n        </div>\r\n      </div>\r\n      <br>\r\n      <div class=\"data-field\" *ngIf=\"center\">\r\n        <div class=\"data-field-txt\">\r\n          Current latitude\r\n        </div>\r\n        <br>\r\n        <div>\r\n          <input type=\"number\" [(ngModel)]=\"latitude\" />\r\n        </div>\r\n      </div>\r\n      <br>\r\n      <div class=\"data-field\" *ngIf=\"center\">\r\n        <div class=\"data-field-txt\">\r\n          Current longitude\r\n        </div>\r\n        <br>\r\n        <div>\r\n          <input type=\"number\" [(ngModel)]=\"longitude\" />\r\n        </div>\r\n      </div>\r\n      <br>\r\n      <ion-button fill=\"outline\" shape=\"round\" (click)=\"changeCenter()\">\r\n        Change center\r\n      </ion-button>\r\n      <br>\r\n      <p>Drag the map and place marker on the center of region</p>\r\n      <br>\r\n      <div id=\"centerMarker\">\r\n        <img src=\"../../../../assets/img/location.png\" title=\"Current center for region\"/>\r\n      </div>\r\n      <google-map height=\"500px\" width=\"100%\" [center]=\"center\" #GoogleMap (centerChanged)='centerChanged()'>\r\n      </google-map>\r\n    </div>\r\n    <br>\r\n    <div class=\"page-footer\">\r\n        <ion-button fill=\"outline\" shape=\"round\" (click)=\"saveRegion()\">\r\n          Save\r\n        </ion-button>\r\n    </div>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/multi-region/multi-region-add/multi-region-add.module.ts":
/*!********************************************************************************!*\
  !*** ./src/app/admin/multi-region/multi-region-add/multi-region-add.module.ts ***!
  \********************************************************************************/
/*! exports provided: MultiRegionAddPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiRegionAddPageModule", function() { return MultiRegionAddPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _multi_region_add_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./multi-region-add.page */ "./src/app/admin/multi-region/multi-region-add/multi-region-add.page.ts");
/* harmony import */ var _angular_google_maps__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/google-maps */ "./node_modules/@angular/google-maps/fesm2015/google-maps.js");








const routes = [
    {
        path: '',
        component: _multi_region_add_page__WEBPACK_IMPORTED_MODULE_6__["MultiRegionAddPage"]
    }
];
let MultiRegionAddPageModule = class MultiRegionAddPageModule {
};
MultiRegionAddPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _angular_google_maps__WEBPACK_IMPORTED_MODULE_7__["GoogleMapsModule"]
        ],
        declarations: [_multi_region_add_page__WEBPACK_IMPORTED_MODULE_6__["MultiRegionAddPage"]]
    })
], MultiRegionAddPageModule);



/***/ }),

/***/ "./src/app/admin/multi-region/multi-region-add/multi-region-add.page.scss":
/*!********************************************************************************!*\
  !*** ./src/app/admin/multi-region/multi-region-add/multi-region-add.page.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  padding-left: 50px;\n  padding-right: 50px;\n  padding-bottom: 30px;\n  background: white;\n  text-align: center;\n  width: 60vw;\n  margin: 0% auto;\n}\n\n.toggle {\n  font-size: large;\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n  width: 300px;\n}\n\n.toggleSub {\n  font-size: large;\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 30vw;\n}\n\nion-toggle {\n  margin-top: -10px;\n}\n\n.item-inner {\n  min-height: 1px !important;\n}\n\n.label-md {\n  margin-bottom: 1px !important;\n  margin-top: 1px !important;\n}\n\nion-item-divider {\n  margin-top: 0px;\n  min-height: 1px !important;\n  background: lightgray;\n  opacity: 50%;\n}\n\ninput {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.item {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n.card {\n  border: 1px solid lightgray;\n  width: 30vw;\n  margin: 0% auto;\n}\n\n.buttons {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n#cardBtn1 {\n  border-radius: 10px;\n  color: white;\n  background: black;\n  padding: 5px;\n  width: 80px;\n}\n\n#cardBtn2 {\n  border-radius: 10px;\n  color: white;\n  background: var(--ion-color-primary);\n  padding: 5px;\n  width: 80px;\n}\n\n.tab {\n  display: -webkit-box;\n  display: flex;\n  justify-content: space-around;\n  border-bottom: 1px lightgray;\n  font-size: large !important;\n  font-weight: 500;\n  border-bottom: 1px solid lightgray;\n}\n\ninput {\n  border: 1px solid gray;\n  border-radius: 5px;\n  padding: 8px;\n  width: 20vw;\n  max-width: 40vw;\n}\n\n.form {\n  text-align: left;\n  width: 20vw;\n  margin: 0% auto;\n}\n\n.data-field {\n  text-align: center;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\nion-col {\n  border: 1px solid gray;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n\nion-row:first-child {\n  background: lightgray;\n}\n\n#centerMarker {\n  position: absolute;\n  width: 50px;\n  left: 50%;\n  top: 650px;\n  margin-left: -8px;\n  z-index: 999;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vbXVsdGktcmVnaW9uL211bHRpLXJlZ2lvbi1hZGQvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxtdWx0aS1yZWdpb25cXG11bHRpLXJlZ2lvbi1hZGRcXG11bHRpLXJlZ2lvbi1hZGQucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9tdWx0aS1yZWdpb24vbXVsdGktcmVnaW9uLWFkZC9tdWx0aS1yZWdpb24tYWRkLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksZ0JBQUE7RUFDQSwyQkFBQTtFQUFBLG9CQUFBO0VBQ0EsOEJBQUE7VUFBQSw2QkFBQTtFQUNBLFlBQUE7QUNDSjs7QURFQTtFQUNJLGdCQUFBO0VBQ0EsMkJBQUE7RUFBQSxvQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxXQUFBO0FDQ0o7O0FERUE7RUFDSSxpQkFBQTtBQ0NKOztBREVBO0VBQ0ksMEJBQUE7QUNDSjs7QURFQTtFQUNJLDZCQUFBO0VBQ0EsMEJBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7RUFDQSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVBO0VBQ0ksc0JBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7VUFBQSw2QkFBQTtBQ0NKOztBREVBO0VBQ0ksMkJBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7VUFBQSw2QkFBQTtBQ0NKOztBREVBO0VBQ0ksbUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQ0NKOztBREVBO0VBQ0ksbUJBQUE7RUFDQSxZQUFBO0VBQ0Esb0NBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNkJBQUE7RUFDQSw0QkFBQTtFQUNBLDJCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQ0FBQTtBQ0NKOztBREVBO0VBQ0ksc0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0FDQ0o7O0FERUE7RUFDSSxzQkFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7QUNDSjs7QURFRTtFQUNFLHFCQUFBO0FDQ0o7O0FERUU7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vbXVsdGktcmVnaW9uL211bHRpLXJlZ2lvbi1hZGQvbXVsdGktcmVnaW9uLWFkZC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbntcclxuICAgIHBhZGRpbmctbGVmdDogNTBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDUwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMzBweDtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgd2lkdGg6IDYwdnc7XHJcbiAgICBtYXJnaW46IDAlIGF1dG9cclxufVxyXG5cclxuLnRvZ2dsZXtcclxuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xyXG4gICAgd2lkdGg6IDMwMHB4O1xyXG59XHJcblxyXG4udG9nZ2xlU3Vie1xyXG4gICAgZm9udC1zaXplOiBsYXJnZTtcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgd2lkdGg6IDMwdnc7XHJcbn1cclxuXHJcbmlvbi10b2dnbGV7XHJcbiAgICBtYXJnaW4tdG9wOiAtMTBweFxyXG59XHJcblxyXG4uaXRlbS1pbm5lcntcclxuICAgIG1pbi1oZWlnaHQ6IDFweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG5cclxuLmxhYmVsLW1ke1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXB4IWltcG9ydGFudDtcclxuICAgIG1hcmdpbi10b3A6IDFweCFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbmlvbi1pdGVtLWRpdmlkZXJ7XHJcbiAgICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgICBtaW4taGVpZ2h0OiAxcHghaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZDogbGlnaHRncmF5O1xyXG4gICAgb3BhY2l0eTogNTAlXHJcbn1cclxuXHJcbmlucHV0e1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLml0ZW17XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHlcclxufVxyXG5cclxuLmNhcmR7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICB3aWR0aDogMzB2dztcclxuICAgIG1hcmdpbjogMCUgYXV0b1xyXG59XHJcblxyXG4uYnV0dG9uc3tcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seVxyXG59XHJcblxyXG4jY2FyZEJ0bjF7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYmFja2dyb3VuZDogYmxhY2s7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICB3aWR0aDogODBweFxyXG59XHJcblxyXG4jY2FyZEJ0bjJ7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgd2lkdGg6IDgwcHhcclxufVxyXG5cclxuLnRhYntcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBsaWdodGdyYXk7XHJcbiAgICBmb250LXNpemU6IGxhcmdlICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxufVxyXG5cclxuaW5wdXR7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG4gICAgd2lkdGg6IDIwdnc7XHJcbiAgICBtYXgtd2lkdGg6IDQwdnc7XHJcbn1cclxuXHJcbi5mb3Jte1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIHdpZHRoOiAyMHZ3O1xyXG4gICAgbWFyZ2luOiAwJSBhdXRvXHJcbn1cclxuXHJcbi5kYXRhLWZpZWxke1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlblxyXG59XHJcblxyXG5pb24tY29se1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcclxuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDEwcHhcclxuICB9XHJcbiAgXHJcbiAgaW9uLXJvdzpmaXJzdC1jaGlsZHtcclxuICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JheVxyXG4gIH1cclxuXHJcbiAgI2NlbnRlck1hcmtlcntcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHdpZHRoOiA1MHB4O1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgdG9wOiA2NTBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAtOHB4O1xyXG4gICAgei1pbmRleDogOTk5O1xyXG4gIH0iLCIubWFpbiB7XG4gIHBhZGRpbmctbGVmdDogNTBweDtcbiAgcGFkZGluZy1yaWdodDogNTBweDtcbiAgcGFkZGluZy1ib3R0b206IDMwcHg7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiA2MHZ3O1xuICBtYXJnaW46IDAlIGF1dG87XG59XG5cbi50b2dnbGUge1xuICBmb250LXNpemU6IGxhcmdlO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG4gIHdpZHRoOiAzMDBweDtcbn1cblxuLnRvZ2dsZVN1YiB7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAzMHZ3O1xufVxuXG5pb24tdG9nZ2xlIHtcbiAgbWFyZ2luLXRvcDogLTEwcHg7XG59XG5cbi5pdGVtLWlubmVyIHtcbiAgbWluLWhlaWdodDogMXB4ICFpbXBvcnRhbnQ7XG59XG5cbi5sYWJlbC1tZCB7XG4gIG1hcmdpbi1ib3R0b206IDFweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tdG9wOiAxcHggIWltcG9ydGFudDtcbn1cblxuaW9uLWl0ZW0tZGl2aWRlciB7XG4gIG1hcmdpbi10b3A6IDBweDtcbiAgbWluLWhlaWdodDogMXB4ICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcbiAgb3BhY2l0eTogNTAlO1xufVxuXG5pbnB1dCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLml0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbn1cblxuLmNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIHdpZHRoOiAzMHZ3O1xuICBtYXJnaW46IDAlIGF1dG87XG59XG5cbi5idXR0b25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG59XG5cbiNjYXJkQnRuMSB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZDogYmxhY2s7XG4gIHBhZGRpbmc6IDVweDtcbiAgd2lkdGg6IDgwcHg7XG59XG5cbiNjYXJkQnRuMiB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBwYWRkaW5nOiA1cHg7XG4gIHdpZHRoOiA4MHB4O1xufVxuXG4udGFiIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGJvcmRlci1ib3R0b206IDFweCBsaWdodGdyYXk7XG4gIGZvbnQtc2l6ZTogbGFyZ2UgIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cblxuaW5wdXQge1xuICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDhweDtcbiAgd2lkdGg6IDIwdnc7XG4gIG1heC13aWR0aDogNDB2dztcbn1cblxuLmZvcm0ge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICB3aWR0aDogMjB2dztcbiAgbWFyZ2luOiAwJSBhdXRvO1xufVxuXG4uZGF0YS1maWVsZCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG5pb24tY29sIHtcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuXG5pb24tcm93OmZpcnN0LWNoaWxkIHtcbiAgYmFja2dyb3VuZDogbGlnaHRncmF5O1xufVxuXG4jY2VudGVyTWFya2VyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogNTBweDtcbiAgbGVmdDogNTAlO1xuICB0b3A6IDY1MHB4O1xuICBtYXJnaW4tbGVmdDogLThweDtcbiAgei1pbmRleDogOTk5O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/multi-region/multi-region-add/multi-region-add.page.ts":
/*!******************************************************************************!*\
  !*** ./src/app/admin/multi-region/multi-region-add/multi-region-add.page.ts ***!
  \******************************************************************************/
/*! exports provided: MultiRegionAddPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiRegionAddPage", function() { return MultiRegionAddPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");





/// <reference types="@types/googlemaps" />
let MultiRegionAddPage = class MultiRegionAddPage {
    constructor(events, labelService, alertController, loadingController, router, route, ngZone) {
        this.events = events;
        this.labelService = labelService;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.router = router;
        this.route = route;
        this.ngZone = ngZone;
        this.region = {
            name: '',
            active: true,
            pincodes: [],
            createdAt: null
        };
        this.radius = 0;
        this.latitude = 0;
        this.longitude = 0;
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                const dataCurrent = this.router.getCurrentNavigation().extras.state.data;
                if (dataCurrent && dataCurrent.regionType) {
                    this.type = dataCurrent.regionType;
                }
                if (dataCurrent && dataCurrent.regionData) {
                    this.region = dataCurrent.regionData;
                }
                if (dataCurrent) {
                    if (this.region['center']) {
                        this.center = this.region['center'];
                        this.latitude = this.center.lat;
                        this.longitude = this.center.lng;
                    }
                    else {
                        navigator.geolocation.getCurrentPosition((position) => {
                            this.center = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };
                            this.latitude = this.center.lat;
                            this.longitude = this.center.lng;
                        });
                    }
                    if (this.region['radius']) {
                        this.radius = this.region['radius'];
                    }
                }
            }
        });
    }
    ngOnInit() {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.ADD_REGION_LABELS = this.labelService.labels['ADD_REGION'];
        this.headerText = this.ADD_REGION_LABELS['header_text'];
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.initializeSubscriptions();
        });
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('multi-region:regionSaved', () => {
            if (this.loading) {
                this.loading.dismiss();
            }
            this.presentAlert("Region saved");
        });
    }
    toggleActive() {
        this.region.active = !this.region.active;
    }
    addPincode() {
        this.region.pincodes.push(this.pincode);
        this.pincode = null;
    }
    removePin(i) {
        this.region.pincodes.splice(i, 1);
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
    saveRegion() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (!this.region.name) {
                yield this.presentAlert("Please add region name");
            }
            else {
                yield this.presentLoading(5000, "Please wait ...");
                if (this.type == 'pincodes') {
                    this.events.publish('multi-region:saveRegion', this.region);
                }
                else {
                    this.events.publish('multi-region:saveRegionArea', this.region, JSON.parse(JSON.stringify(this.gmap.getCenter())), this.radius);
                }
            }
        });
    }
    changeCenter() {
        this.center = {
            lat: this.latitude,
            lng: this.longitude,
        };
    }
    centerChanged() {
        let currentCenter = JSON.parse(JSON.stringify(this.gmap.getCenter()));
        this.latitude = currentCenter.lat;
        this.longitude = currentCenter.lng;
    }
    removeSubscriptions() {
        this.events.unsubscribe('multi-region:regionSaved');
    }
};
MultiRegionAddPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
    { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('GoogleMap', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", google.maps.Map)
], MultiRegionAddPage.prototype, "gmap", void 0);
MultiRegionAddPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-multi-region-add',
        template: __webpack_require__(/*! raw-loader!./multi-region-add.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/multi-region/multi-region-add/multi-region-add.page.html"),
        styles: [__webpack_require__(/*! ./multi-region-add.page.scss */ "./src/app/admin/multi-region/multi-region-add/multi-region-add.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
        src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
], MultiRegionAddPage);



/***/ })

}]);
//# sourceMappingURL=admin-multi-region-multi-region-add-multi-region-add-module-es2015.js.map