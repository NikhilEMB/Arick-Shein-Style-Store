(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-vendor-settings-vendor-settings-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/vendor-settings/vendor-settings.page.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/vendor-settings/vendor-settings.page.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Vendor Settings</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <br>\r\n    <ion-grid class=\"t-a-l\">\r\n      <ion-row>\r\n        <ion-col size=\"12\" style=\"display: flex;justify-content: center;\">\r\n          <ion-button (click)=\"saveSettings()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\"\r\n            fill=\"outline\">\r\n            <i class=\"flaticon-null-20 margin-icon\"></i>\r\n            Save Settings\r\n          </ion-button>\r\n        </ion-col>\r\n        <ion-col size=\"12\" style=\"margin-top: 8px;\">\r\n          <div class=\"input-wrap\">\r\n            <div style=\"display:flex\">\r\n              <ion-label>Active</ion-label>\r\n              <ion-toggle [(ngModel)]=\"settings.active\"></ion-toggle>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\" *ngIf=\"settings.active\">\r\n          <div class=\"input-wrap\">\r\n            <div style=\"display:flex\">\r\n              <ion-label>Show Vendor Details To Users</ion-label>\r\n              <ion-toggle [(ngModel)]=\"settings.showVendorInfo\"></ion-toggle>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n        <!-- <ion-col size=\"12\" *ngIf=\"settings.active\">\r\n          <div class=\"input-wrap\">\r\n            <div style=\"display:flex\">\r\n              <ion-label>Allow only 1 vendor in a region</ion-label>\r\n              <ion-toggle [(ngModel)]=\"settings.oneVendorPerRegion\"></ion-toggle>\r\n            </div>\r\n          </div>\r\n        </ion-col> -->\r\n        <ion-col size=\"12\" *ngIf=\"settings.active\">\r\n          <div class=\"input-wrap\">\r\n            <div style=\"display:flex\">\r\n              <ion-label>Show Vendors based on KM</ion-label>\r\n              <ion-toggle [(ngModel)]=\"settings.vendorKmBased\"></ion-toggle>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\" *ngIf=\"settings.active && settings.vendorKmBased\">\r\n          <div class=\"input-wrap\">\r\n            <div style=\"display:flex; align-items: center;\">\r\n              <ion-label>Max Distance for vendors to be visible</ion-label>&nbsp;&nbsp;\r\n              <ion-input type='number' [(ngModel)]=\"settings.vendorKmDistance\"\r\n                style=\"border: 1px solid;max-width: 200px;\" min='0'></ion-input>&nbsp;&nbsp;Kms\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\" *ngIf=\"settings.active && settings.vendorKmBased\">\r\n          <div class=\"input-wrap\">\r\n            <div style=\"display:flex\">\r\n              <ion-label>Calculate delivery cost based on km</ion-label>\r\n              <ion-toggle [(ngModel)]=\"settings.calcDeliveryBasedOnKm\"></ion-toggle>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\" *ngIf=\"settings.active && isSeparateVendorInvoicesAllowed\">\r\n          <div class=\"input-wrap\">\r\n            <div style=\"display:flex\">\r\n              <ion-label>Make seperate invoices for vendors</ion-label>\r\n              <ion-toggle [(ngModel)]=\"settings.multipleVendorInvoices\"></ion-toggle>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/vendor-settings/vendor-settings.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/admin/vendor-settings/vendor-settings.module.ts ***!
  \*****************************************************************/
/*! exports provided: VendorSettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VendorSettingsPageModule", function() { return VendorSettingsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _vendor_settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vendor-settings.page */ "./src/app/admin/vendor-settings/vendor-settings.page.ts");







var routes = [
    {
        path: '',
        component: _vendor_settings_page__WEBPACK_IMPORTED_MODULE_6__["VendorSettingsPage"]
    }
];
var VendorSettingsPageModule = /** @class */ (function () {
    function VendorSettingsPageModule() {
    }
    VendorSettingsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_vendor_settings_page__WEBPACK_IMPORTED_MODULE_6__["VendorSettingsPage"]]
        })
    ], VendorSettingsPageModule);
    return VendorSettingsPageModule;
}());



/***/ }),

/***/ "./src/app/admin/vendor-settings/vendor-settings.page.scss":
/*!*****************************************************************!*\
  !*** ./src/app/admin/vendor-settings/vendor-settings.page.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  padding-left: 50px;\n  padding-right: 50px;\n  padding-bottom: 30px;\n  background: white;\n  text-align: center;\n  width: 60vw;\n  margin: 0% auto;\n}\n\n.toggle {\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 32vw;\n}\n\n.toggleSub {\n  font-size: large;\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 30vw;\n}\n\nion-toggle {\n  margin-top: -10px;\n}\n\n.item-inner {\n  min-height: 1px !important;\n}\n\n.label-md {\n  margin-bottom: 1px !important;\n  margin-top: 1px !important;\n}\n\ninput {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.item {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n.card {\n  border: 1px solid lightgray;\n  width: 30vw;\n  margin: 0% auto;\n}\n\n.buttons {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n#cardBtn1 {\n  border-radius: 10px;\n  color: white;\n  background: black;\n  padding: 5px;\n  width: 80px;\n}\n\n#cardBtn2 {\n  border-radius: 10px;\n  color: white;\n  background: var(--ion-color-primary);\n  padding: 5px;\n  width: 80px;\n}\n\n.tab {\n  display: -webkit-box;\n  display: flex;\n  justify-content: space-around;\n  border-bottom: 1px lightgray;\n  font-size: large !important;\n  font-weight: 500;\n  border-bottom: 1px solid lightgray;\n}\n\ninput {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.form {\n  text-align: left;\n  width: 20vw;\n  margin: 0% auto;\n}\n\n.vendorList {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 80;\n}\n\n.name {\n  width: calc(100% - 410px);\n  max-width: calc(100% - 410px);\n}\n\n.list-header {\n  width: 53.5vw;\n  position: relative;\n}\n\n.list-container {\n  margin-top: 90px;\n  width: 53.5vw;\n}\n\n.list-container ion-grid ion-row {\n  border-bottom: var(--ion-color-medium) 1px solid;\n  margin-left: 6.5vw;\n}\n\n.list-container ion-grid ion-row ion-col {\n  -webkit-box-align: center;\n          align-items: center;\n  display: -webkit-inline-box;\n  display: inline-flex;\n}\n\n.f-d-c {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.f-d-c .m-s-btn {\n  margin-top: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vdmVuZG9yLXNldHRpbmdzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcdmVuZG9yLXNldHRpbmdzXFx2ZW5kb3Itc2V0dGluZ3MucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi92ZW5kb3Itc2V0dGluZ3MvdmVuZG9yLXNldHRpbmdzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksMkJBQUE7RUFBQSxvQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxXQUFBO0FDQ0o7O0FERUE7RUFDSSxnQkFBQTtFQUNBLDJCQUFBO0VBQUEsb0JBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EsV0FBQTtBQ0NKOztBREVBO0VBQ0ksaUJBQUE7QUNDSjs7QURFQTtFQUNJLDBCQUFBO0FDQ0o7O0FERUE7RUFDSSw2QkFBQTtFQUNBLDBCQUFBO0FDQ0o7O0FEU0E7RUFDSSxzQkFBQTtFQUNBLGtCQUFBO0FDTko7O0FEU0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtVQUFBLDZCQUFBO0FDTko7O0FEU0E7RUFDSSwyQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FDTko7O0FEU0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtVQUFBLDZCQUFBO0FDTko7O0FEU0E7RUFDSSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FDTko7O0FEU0E7RUFDSSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxvQ0FBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FDTko7O0FEU0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw2QkFBQTtFQUNBLDRCQUFBO0VBQ0EsMkJBQUE7RUFDQSxnQkFBQTtFQUNBLGtDQUFBO0FDTko7O0FEU0E7RUFDSSxzQkFBQTtFQUNBLGtCQUFBO0FDTko7O0FEU0E7RUFDSSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FDTko7O0FEU0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EsU0FBQTtBQ05KOztBRFNBO0VBQ0kseUJBQUE7RUFDQSw2QkFBQTtBQ05KOztBRFNBO0VBQ0ksYUFBQTtFQUNBLGtCQUFBO0FDTko7O0FEU0E7RUFDSSxnQkFBQTtFQUNBLGFBQUE7QUNOSjs7QURRUTtFQUNBLGdEQUFBO0VBQ0Esa0JBQUE7QUNOUjs7QURPUTtFQUNJLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSwyQkFBQTtFQUFBLG9CQUFBO0FDTFo7O0FEV0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FDUko7O0FEVUk7RUFDRSxnQkFBQTtBQ1JOIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vdmVuZG9yLXNldHRpbmdzL3ZlbmRvci1zZXR0aW5ncy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbntcclxuICAgIHBhZGRpbmctbGVmdDogNTBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDUwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMzBweDtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgd2lkdGg6IDYwdnc7XHJcbiAgICBtYXJnaW46IDAlIGF1dG9cclxufVxyXG5cclxuLnRvZ2dsZXtcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgd2lkdGg6IDMydnc7XHJcbn1cclxuXHJcbi50b2dnbGVTdWJ7XHJcbiAgICBmb250LXNpemU6IGxhcmdlO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICB3aWR0aDogMzB2dztcclxufVxyXG5cclxuaW9uLXRvZ2dsZXtcclxuICAgIG1hcmdpbi10b3A6IC0xMHB4XHJcbn1cclxuXHJcbi5pdGVtLWlubmVye1xyXG4gICAgbWluLWhlaWdodDogMXB4ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcblxyXG4ubGFiZWwtbWR7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcHghaW1wb3J0YW50O1xyXG4gICAgbWFyZ2luLXRvcDogMXB4IWltcG9ydGFudDtcclxufVxyXG5cclxuLy8gaW9uLWl0ZW0tZGl2aWRlcntcclxuLy8gICAgIG1hcmdpbi10b3A6IDBweDtcclxuLy8gICAgIG1pbi1oZWlnaHQ6IDFweCFpbXBvcnRhbnQ7XHJcbi8vICAgICBiYWNrZ3JvdW5kOiBsaWdodGdyYXk7XHJcbi8vICAgICBvcGFjaXR5OiA1MCVcclxuLy8gfVxyXG5cclxuaW5wdXR7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcblxyXG4uaXRlbXtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seVxyXG59XHJcblxyXG4uY2FyZHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICAgIHdpZHRoOiAzMHZ3O1xyXG4gICAgbWFyZ2luOiAwJSBhdXRvXHJcbn1cclxuXHJcbi5idXR0b25ze1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5XHJcbn1cclxuXHJcbiNjYXJkQnRuMXtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIHdpZHRoOiA4MHB4XHJcbn1cclxuXHJcbiNjYXJkQnRuMntcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICB3aWR0aDogODBweFxyXG59XHJcblxyXG4udGFie1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IGxpZ2h0Z3JheTtcclxuICAgIGZvbnQtc2l6ZTogbGFyZ2UgIWltcG9ydGFudDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG59XHJcblxyXG5pbnB1dHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5mb3Jte1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIHdpZHRoOiAyMHZ3O1xyXG4gICAgbWFyZ2luOiAwJSBhdXRvXHJcbn1cclxuXHJcbi52ZW5kb3JMaXN0e1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIHdpZHRoOiA4MFxyXG59XHJcblxyXG4ubmFtZXtcclxuICAgIHdpZHRoOiBjYWxjKDEwMCUgLSA0MTBweCk7XHJcbiAgICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDQxMHB4KTtcclxuICB9XHJcblxyXG4ubGlzdC1oZWFkZXJ7XHJcbiAgICB3aWR0aDogNTMuNXZ3O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlXHJcbiAgfVxyXG4gIFxyXG4ubGlzdC1jb250YWluZXJ7XHJcbiAgICBtYXJnaW4tdG9wOiA5MHB4O1xyXG4gICAgd2lkdGg6IDUzLjV2dztcclxuICAgIGlvbi1ncmlke1xyXG4gICAgICAgIGlvbi1yb3d7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA2LjV2dztcclxuICAgICAgICBpb24tY29se1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4uZi1kLWMge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIFxyXG4gICAgLm0tcy1idG4ge1xyXG4gICAgICBtYXJnaW4tdG9wOiAxNXB4O1xyXG4gICAgfVxyXG4gIH0iLCIubWFpbiB7XG4gIHBhZGRpbmctbGVmdDogNTBweDtcbiAgcGFkZGluZy1yaWdodDogNTBweDtcbiAgcGFkZGluZy1ib3R0b206IDMwcHg7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiA2MHZ3O1xuICBtYXJnaW46IDAlIGF1dG87XG59XG5cbi50b2dnbGUge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogMzJ2dztcbn1cblxuLnRvZ2dsZVN1YiB7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAzMHZ3O1xufVxuXG5pb24tdG9nZ2xlIHtcbiAgbWFyZ2luLXRvcDogLTEwcHg7XG59XG5cbi5pdGVtLWlubmVyIHtcbiAgbWluLWhlaWdodDogMXB4ICFpbXBvcnRhbnQ7XG59XG5cbi5sYWJlbC1tZCB7XG4gIG1hcmdpbi1ib3R0b206IDFweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tdG9wOiAxcHggIWltcG9ydGFudDtcbn1cblxuaW5wdXQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG59XG5cbi5jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICB3aWR0aDogMzB2dztcbiAgbWFyZ2luOiAwJSBhdXRvO1xufVxuXG4uYnV0dG9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xufVxuXG4jY2FyZEJ0bjEge1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQ6IGJsYWNrO1xuICBwYWRkaW5nOiA1cHg7XG4gIHdpZHRoOiA4MHB4O1xufVxuXG4jY2FyZEJ0bjIge1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgcGFkZGluZzogNXB4O1xuICB3aWR0aDogODBweDtcbn1cblxuLnRhYiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBib3JkZXItYm90dG9tOiAxcHggbGlnaHRncmF5O1xuICBmb250LXNpemU6IGxhcmdlICFpbXBvcnRhbnQ7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbmlucHV0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4uZm9ybSB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHdpZHRoOiAyMHZ3O1xuICBtYXJnaW46IDAlIGF1dG87XG59XG5cbi52ZW5kb3JMaXN0IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogODA7XG59XG5cbi5uYW1lIHtcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDQxMHB4KTtcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSA0MTBweCk7XG59XG5cbi5saXN0LWhlYWRlciB7XG4gIHdpZHRoOiA1My41dnc7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmxpc3QtY29udGFpbmVyIHtcbiAgbWFyZ2luLXRvcDogOTBweDtcbiAgd2lkdGg6IDUzLjV2dztcbn1cbi5saXN0LWNvbnRhaW5lciBpb24tZ3JpZCBpb24tcm93IHtcbiAgYm9yZGVyLWJvdHRvbTogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xuICBtYXJnaW4tbGVmdDogNi41dnc7XG59XG4ubGlzdC1jb250YWluZXIgaW9uLWdyaWQgaW9uLXJvdyBpb24tY29sIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG59XG5cbi5mLWQtYyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uZi1kLWMgLm0tcy1idG4ge1xuICBtYXJnaW4tdG9wOiAxNXB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/vendor-settings/vendor-settings.page.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/vendor-settings/vendor-settings.page.ts ***!
  \***************************************************************/
/*! exports provided: VendorSettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VendorSettingsPage", function() { return VendorSettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");





var VendorSettingsPage = /** @class */ (function () {
    function VendorSettingsPage(sharedService, events, configService) {
        this.sharedService = sharedService;
        this.events = events;
        this.configService = configService;
        this.settings = {
            active: false,
            showVendorInfo: false,
            oneVendorPerRegion: false,
            vendorKmBased: false,
            vendorKmDistance: 0,
            calcDeliveryBasedOnKm: false,
            multipleVendorInvoices: false
        };
        this.multiVendorDoc = false;
        this.isSeparateVendorInvoicesAllowed = true;
    }
    VendorSettingsPage.prototype.ngOnInit = function () {
        this.isSeparateVendorInvoicesAllowed = 'isSeparateVendorInvoicesAllowed' in this.configService.environment ? this.configService.environment.isSeparateVendorInvoicesAllowed : true;
    };
    VendorSettingsPage.prototype.ionViewWillEnter = function () {
        this.initializeSubscriptions();
        this.events.publish('vendor:getActiveStatus');
    };
    VendorSettingsPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    VendorSettingsPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('vendor:setMultiVendorDetailsSuccess', function () {
            if (_this.settings.active) {
                _this.multiVendorDoc = true;
            }
            if (_this.sharedService.loading) {
                _this.sharedService.loading.dismiss();
            }
            _this.sharedService.presentToast("Settings saved successfully");
        });
        this.events.subscribe('vendor:publishActiveStatus', function (data) {
            if (data) {
                _this.multiVendorDoc = true;
                _this.settings.active = data.active;
                _this.settings.showVendorInfo = data.showVendorInfo ? data.showVendorInfo : _this.settings.showVendorInfo;
                _this.settings.oneVendorPerRegion = data.oneVendorPerRegion ? data.oneVendorPerRegion : _this.settings.oneVendorPerRegion;
                _this.settings.multipleVendorInvoices = 'multipleVendorInvoices' in data ? data.multipleVendorInvoices : _this.settings.multipleVendorInvoices;
                if (data.hasOwnProperty('vendorKmDistance')) {
                    _this.settings.vendorKmDistance = data.vendorKmDistance;
                }
                if (data.hasOwnProperty('vendorKmBased')) {
                    _this.settings.vendorKmBased = data.vendorKmBased;
                }
                if (data.hasOwnProperty('calcDeliveryBasedOnKm')) {
                    _this.settings.calcDeliveryBasedOnKm = data.calcDeliveryBasedOnKm;
                }
            }
            else {
                _this.multiVendorDoc = false;
            }
        });
    };
    VendorSettingsPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('vendor:setMultiVendorDetailsSuccess');
        this.events.unsubscribe('vendor:publishActiveStatus');
    };
    VendorSettingsPage.prototype.saveSettings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.settings.vendorKmBased == true && this.settings.vendorKmDistance <= 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sharedService.presentAlert("Distance cant be zero!")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 3:
                        _a.sent();
                        this.events.publish('vendor:setMultiVendorDetails', this.settings);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VendorSettingsPage.ctorParameters = function () { return [
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_3__["ConfigService"] }
    ]; };
    VendorSettingsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-vendor-settings',
            template: __webpack_require__(/*! raw-loader!./vendor-settings.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/vendor-settings/vendor-settings.page.html"),
            styles: [__webpack_require__(/*! ./vendor-settings.page.scss */ "./src/app/admin/vendor-settings/vendor-settings.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_3__["ConfigService"]])
    ], VendorSettingsPage);
    return VendorSettingsPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-vendor-settings-vendor-settings-module-es5.js.map