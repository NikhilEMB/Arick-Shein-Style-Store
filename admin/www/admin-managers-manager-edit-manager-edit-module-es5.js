(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-managers-manager-edit-manager-edit-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/managers/manager-edit/manager-edit.page.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/managers/manager-edit/manager-edit.page.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">Edit Manager</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main\">\r\n    <br><br>\r\n    <div class=\"data-field\">\r\n      <p>Active</p>\r\n      <div class=\"toggle-btn\">\r\n        <label class=\"switch\">\r\n          <input type=\"checkbox\" *ngIf=\"receivedManagerData\" (click)=\"toggleActive()\" [checked]=\"receivedManagerData.active\">\r\n          <span class=\"slider round\"></span>\r\n        </label>\r\n      </div>\r\n    </div>\r\n    <br><br>\r\n    <div>\r\n      <h2><strong>Permissions</strong></h2>&nbsp;&nbsp;&nbsp;<ion-button class=\"btn-sml i-start\" fill=\"outline\"\r\n      shape=\"round\" (click)=\"updatePermissions()\">Update</ion-button>\r\n        <!-- For Groups -->\r\n        <ion-list>\r\n          <div class=\"toggle\" *ngIf=\"groups\">\r\n            <p>\r\n              Select Groups\r\n            </p>\r\n            <ion-select class=\"regionSelect\" placeholder=\"Select Groups\" multiple [(ngModel)]=\"selectedGroups\">\r\n              <ng-container *ngFor=\"let group of groups\">\r\n                <ion-select-option value=\"{{group.id}}\">{{group.name}}</ion-select-option>\r\n              </ng-container>\r\n            </ion-select>\r\n          </div>\r\n        </ion-list>\r\n      <ng-container *ngFor=\"let page of pagesList; let i = index\">\r\n      <ion-list lines=\"none\">\r\n        <ion-item>\r\n          <div class=\"permission\">\r\n            <p style=\"text-transform: capitalize;\">{{page.name}}</p>\r\n            <div class=\"toggle-btn\">\r\n              <label class=\"switch\">\r\n                <input type=\"checkbox\" (click)=\"givePermission(i)\" [checked]='currentPages.includes(pagesList[i].path)'>\r\n                <span class=\"slider round\"></span>\r\n              </label>\r\n            </div>\r\n          </div>\r\n          <br>\r\n        </ion-item>\r\n      </ion-list>\r\n      <ion-list>\r\n        <div class=\"toggle\" *ngIf=\"page.name == 'Orders' && currentPages.includes(pagesList[i].path)\">\r\n          <p>\r\n            Select Region For Orders\r\n          </p>\r\n          <ion-select class=\"regionSelect\" placeholder=\"Select Order Region\" multiple [(ngModel)]=\"selectedRegion\">\r\n            <ng-container *ngFor=\"let region of regions\">\r\n              <ion-select-option value=\"{{region.id}}\">{{region.name}}</ion-select-option>\r\n            </ng-container>\r\n          </ion-select>\r\n        </div>\r\n      </ion-list>\r\n    </ng-container>\r\n    </div>\r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/managers/manager-edit/manager-edit.module.ts":
/*!********************************************************************!*\
  !*** ./src/app/admin/managers/manager-edit/manager-edit.module.ts ***!
  \********************************************************************/
/*! exports provided: ManagerEditPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerEditPageModule", function() { return ManagerEditPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _manager_edit_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./manager-edit.page */ "./src/app/admin/managers/manager-edit/manager-edit.page.ts");







var routes = [
    {
        path: '',
        component: _manager_edit_page__WEBPACK_IMPORTED_MODULE_6__["ManagerEditPage"]
    }
];
var ManagerEditPageModule = /** @class */ (function () {
    function ManagerEditPageModule() {
    }
    ManagerEditPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_manager_edit_page__WEBPACK_IMPORTED_MODULE_6__["ManagerEditPage"]]
        })
    ], ManagerEditPageModule);
    return ManagerEditPageModule;
}());



/***/ }),

/***/ "./src/app/admin/managers/manager-edit/manager-edit.page.scss":
/*!********************************************************************!*\
  !*** ./src/app/admin/managers/manager-edit/manager-edit.page.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  padding-left: 50px;\n  padding-right: 50px;\n  padding-bottom: 30px;\n  background: white;\n  text-align: center;\n  width: 60vw;\n  margin: 0% auto;\n  height: -webkit-fit-content;\n  height: -moz-fit-content;\n  height: fit-content;\n}\n\n.toggle {\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 40vw;\n  margin-bottom: 10px;\n  margin-top: 10px;\n}\n\n.toggleSub {\n  font-size: large;\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 30vw;\n}\n\nion-toggle {\n  margin-top: -10px;\n}\n\n.item-inner {\n  min-height: 1px !important;\n}\n\n.label-md {\n  margin-bottom: 1px !important;\n  margin-top: 1px !important;\n}\n\nion-item-divider {\n  margin-top: 0px;\n  min-height: 1px !important;\n  background: lightgray;\n  opacity: 50%;\n}\n\ninput {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.item {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n.card {\n  border: 1px solid lightgray;\n  width: 30vw;\n  margin: 0% auto;\n}\n\n.buttons {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n#cardBtn1 {\n  border-radius: 10px;\n  color: white;\n  background: black;\n  padding: 5px;\n  width: 80px;\n}\n\n#cardBtn2 {\n  border-radius: 10px;\n  color: white;\n  background: var(--ion-color-primary);\n  padding: 5px;\n  width: 80px;\n}\n\n.tab {\n  display: -webkit-box;\n  display: flex;\n  justify-content: space-around;\n  border-bottom: 1px lightgray;\n  font-size: large !important;\n  font-weight: 500;\n  border-bottom: 1px solid lightgray;\n}\n\ninput, textarea {\n  border: 1px solid gray;\n  border-radius: 5px;\n  padding: 8px;\n  width: 20vw;\n  max-width: 40vw;\n}\n\n.form {\n  text-align: left;\n  width: 20vw;\n  margin: 0% auto;\n}\n\n.data-field {\n  text-align: center;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.regionSelect {\n  border: 1px solid lightgray;\n  padding: 5px;\n}\n\n.removeBtn {\n  color: #f40d30;\n  padding: 5px;\n  margin-top: 5px;\n  border: 1px solid #f40d30;\n  background: white;\n}\n\nion-list {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n\n.permission {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 40vw;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vbWFuYWdlcnMvbWFuYWdlci1lZGl0L0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcbWFuYWdlcnNcXG1hbmFnZXItZWRpdFxcbWFuYWdlci1lZGl0LnBhZ2Uuc2NzcyIsInNyYy9hcHAvYWRtaW4vbWFuYWdlcnMvbWFuYWdlci1lZGl0L21hbmFnZXItZWRpdC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSwyQkFBQTtFQUFBLHdCQUFBO0VBQUEsbUJBQUE7QUNDSjs7QURFQTtFQUNJLDJCQUFBO0VBQUEsb0JBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUNDSjs7QURFQTtFQUNJLGdCQUFBO0VBQ0EsMkJBQUE7RUFBQSxvQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxXQUFBO0FDQ0o7O0FERUE7RUFDSSxpQkFBQTtBQ0NKOztBREVBO0VBQ0ksMEJBQUE7QUNDSjs7QURFQTtFQUNJLDZCQUFBO0VBQ0EsMEJBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7RUFDQSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVBO0VBQ0ksc0JBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7VUFBQSw2QkFBQTtBQ0NKOztBREVBO0VBQ0ksMkJBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7VUFBQSw2QkFBQTtBQ0NKOztBREVBO0VBQ0ksbUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQ0NKOztBREVBO0VBQ0ksbUJBQUE7RUFDQSxZQUFBO0VBQ0Esb0NBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNkJBQUE7RUFDQSw0QkFBQTtFQUNBLDJCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQ0FBQTtBQ0NKOztBREVBO0VBQ0ksc0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0FDQ0o7O0FERUE7RUFDSSwyQkFBQTtFQUNBLFlBQUE7QUNDSjs7QURFQTtFQUNJLGNBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxXQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9tYW5hZ2Vycy9tYW5hZ2VyLWVkaXQvbWFuYWdlci1lZGl0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWlue1xyXG4gICAgcGFkZGluZy1sZWZ0OiA1MHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogNTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAzMHB4O1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB3aWR0aDogNjB2dztcclxuICAgIG1hcmdpbjogMCUgYXV0bztcclxuICAgIGhlaWdodDogZml0LWNvbnRlbnRcclxufVxyXG5cclxuLnRvZ2dsZXtcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgd2lkdGg6IDQwdnc7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMTBweFxyXG59XHJcblxyXG4udG9nZ2xlU3Vie1xyXG4gICAgZm9udC1zaXplOiBsYXJnZTtcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgd2lkdGg6IDMwdnc7XHJcbn1cclxuXHJcbmlvbi10b2dnbGV7XHJcbiAgICBtYXJnaW4tdG9wOiAtMTBweFxyXG59XHJcblxyXG4uaXRlbS1pbm5lcntcclxuICAgIG1pbi1oZWlnaHQ6IDFweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG5cclxuLmxhYmVsLW1ke1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXB4IWltcG9ydGFudDtcclxuICAgIG1hcmdpbi10b3A6IDFweCFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbmlvbi1pdGVtLWRpdmlkZXJ7XHJcbiAgICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgICBtaW4taGVpZ2h0OiAxcHghaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZDogbGlnaHRncmF5O1xyXG4gICAgb3BhY2l0eTogNTAlXHJcbn1cclxuXHJcbmlucHV0e1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLml0ZW17XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHlcclxufVxyXG5cclxuLmNhcmR7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICB3aWR0aDogMzB2dztcclxuICAgIG1hcmdpbjogMCUgYXV0b1xyXG59XHJcblxyXG4uYnV0dG9uc3tcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seVxyXG59XHJcblxyXG4jY2FyZEJ0bjF7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYmFja2dyb3VuZDogYmxhY2s7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICB3aWR0aDogODBweFxyXG59XHJcblxyXG4jY2FyZEJ0bjJ7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgd2lkdGg6IDgwcHhcclxufVxyXG5cclxuLnRhYntcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBsaWdodGdyYXk7XHJcbiAgICBmb250LXNpemU6IGxhcmdlICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxufVxyXG5cclxuaW5wdXQsdGV4dGFyZWF7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG4gICAgd2lkdGg6IDIwdnc7XHJcbiAgICBtYXgtd2lkdGg6IDQwdnc7XHJcbn1cclxuXHJcbi5mb3Jte1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgIHdpZHRoOiAyMHZ3O1xyXG4gICAgbWFyZ2luOiAwJSBhdXRvXHJcbn1cclxuXHJcbi5kYXRhLWZpZWxke1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlblxyXG59XHJcblxyXG4ucmVnaW9uU2VsZWN0e1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICAgcGFkZGluZzogNXB4XHJcbn1cclxuXHJcbi5yZW1vdmVCdG57XHJcbiAgICBjb2xvcjogI2Y0MGQzMDtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIG1hcmdpbi10b3A6IDVweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNmNDBkMzA7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZVxyXG59XHJcblxyXG5pb24tbGlzdHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLnBlcm1pc3Npb257XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgd2lkdGg6IDQwdndcclxuXHJcbn0iLCIubWFpbiB7XG4gIHBhZGRpbmctbGVmdDogNTBweDtcbiAgcGFkZGluZy1yaWdodDogNTBweDtcbiAgcGFkZGluZy1ib3R0b206IDMwcHg7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiA2MHZ3O1xuICBtYXJnaW46IDAlIGF1dG87XG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XG59XG5cbi50b2dnbGUge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogNDB2dztcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgbWFyZ2luLXRvcDogMTBweDtcbn1cblxuLnRvZ2dsZVN1YiB7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAzMHZ3O1xufVxuXG5pb24tdG9nZ2xlIHtcbiAgbWFyZ2luLXRvcDogLTEwcHg7XG59XG5cbi5pdGVtLWlubmVyIHtcbiAgbWluLWhlaWdodDogMXB4ICFpbXBvcnRhbnQ7XG59XG5cbi5sYWJlbC1tZCB7XG4gIG1hcmdpbi1ib3R0b206IDFweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tdG9wOiAxcHggIWltcG9ydGFudDtcbn1cblxuaW9uLWl0ZW0tZGl2aWRlciB7XG4gIG1hcmdpbi10b3A6IDBweDtcbiAgbWluLWhlaWdodDogMXB4ICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcbiAgb3BhY2l0eTogNTAlO1xufVxuXG5pbnB1dCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLml0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbn1cblxuLmNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIHdpZHRoOiAzMHZ3O1xuICBtYXJnaW46IDAlIGF1dG87XG59XG5cbi5idXR0b25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG59XG5cbiNjYXJkQnRuMSB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZDogYmxhY2s7XG4gIHBhZGRpbmc6IDVweDtcbiAgd2lkdGg6IDgwcHg7XG59XG5cbiNjYXJkQnRuMiB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBwYWRkaW5nOiA1cHg7XG4gIHdpZHRoOiA4MHB4O1xufVxuXG4udGFiIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGJvcmRlci1ib3R0b206IDFweCBsaWdodGdyYXk7XG4gIGZvbnQtc2l6ZTogbGFyZ2UgIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cblxuaW5wdXQsIHRleHRhcmVhIHtcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiA4cHg7XG4gIHdpZHRoOiAyMHZ3O1xuICBtYXgtd2lkdGg6IDQwdnc7XG59XG5cbi5mb3JtIHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgd2lkdGg6IDIwdnc7XG4gIG1hcmdpbjogMCUgYXV0bztcbn1cblxuLmRhdGEtZmllbGQge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cblxuLnJlZ2lvblNlbGVjdCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgcGFkZGluZzogNXB4O1xufVxuXG4ucmVtb3ZlQnRuIHtcbiAgY29sb3I6ICNmNDBkMzA7XG4gIHBhZGRpbmc6IDVweDtcbiAgbWFyZ2luLXRvcDogNXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZjQwZDMwO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbn1cblxuaW9uLWxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLnBlcm1pc3Npb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiA0MHZ3O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/managers/manager-edit/manager-edit.page.ts":
/*!******************************************************************!*\
  !*** ./src/app/admin/managers/manager-edit/manager-edit.page.ts ***!
  \******************************************************************/
/*! exports provided: ManagerEditPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerEditPage", function() { return ManagerEditPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var src_app_services_multi_region_multi_region_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/multi-region/multi-region.service */ "./src/app/services/multi-region/multi-region.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/user-groups/user-groups.service */ "./src/app/services/user-groups/user-groups.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");









var ManagerEditPage = /** @class */ (function () {
    function ManagerEditPage(events, labelService, router, route, sharedService, alertController, loadingController, multiRegionService, userGroupsService) {
        var _this = this;
        this.events = events;
        this.labelService = labelService;
        this.router = router;
        this.route = route;
        this.sharedService = sharedService;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.multiRegionService = multiRegionService;
        this.userGroupsService = userGroupsService;
        this.receivedManagerData = [];
        this.currentPages = [];
        this.selectedRegion = [];
        this.selectedGroups = [];
        this.route.queryParams.subscribe(function (params) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var managerData;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.router.getCurrentNavigation().extras.state) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.router.getCurrentNavigation().extras.state.managerData];
                    case 1:
                        managerData = _a.sent();
                        if (managerData) {
                            this.manager = managerData;
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    }
    ManagerEditPage.prototype.ngOnInit = function () {
    };
    ManagerEditPage.prototype.ionViewWillEnter = function () {
        this.pagesList = src_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"]['pageList'];
        this.initializeSubscriptions();
        this.events.publish('manager:getManagerData', this.manager);
        this.events.publish('manager:getPermissions', this.manager);
    };
    ManagerEditPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    ManagerEditPage.prototype.initializeSubscriptions = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var regions, groups;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.events.subscribe('manager:getManagerDataSuccess', function (receivedData) {
                            console.log('revieved data:', receivedData);
                            _this.receivedManagerData = receivedData;
                            if (receivedData.permissions) {
                                _this.currentPages = receivedData.permissions;
                                _this.selectedRegion = receivedData.region || [];
                            }
                            _this.selectedGroups = receivedData.groups || [];
                            // console.log(this.currentPages)
                        });
                        this.events.subscribe('manager:changePermissionsSuccess', function () {
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            _this.presentAlert("Permissions changed successfully");
                            // console.log('changed')
                        });
                        return [4 /*yield*/, this.multiRegionService.getAllRegions('service')];
                    case 1:
                        regions = _a.sent();
                        if (regions) {
                            this.regions = regions;
                        }
                        return [4 /*yield*/, this.userGroupsService.getAllGroups()];
                    case 2:
                        groups = _a.sent();
                        if (groups) {
                            this.groups = groups;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ManagerEditPage.prototype.givePermission = function (index) {
        if (this.currentPages.includes(this.pagesList[index].path)) {
            this.currentPages.splice(this.currentPages.indexOf(this.pagesList[index].path), 1);
        }
        else {
            this.currentPages.push(this.pagesList[index].path);
        }
        // console.log(this.currentPages)
    };
    ManagerEditPage.prototype.updatePermissions = function () {
        this.presentLoading("Please wait...");
        this.events.publish("manager:changePermissions", this.manager, this.currentPages, this.selectedRegion, this.selectedGroups);
    };
    ManagerEditPage.prototype.toggleActive = function () {
        this.receivedManagerData.active = !this.receivedManagerData.active;
        this.events.publish('manager:changeActiveStatusManager', this.manager, this.receivedManagerData.active);
    };
    ManagerEditPage.prototype.presentLoading = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: msg
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
    ManagerEditPage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: [{
                                    text: 'ok',
                                    handler: function () {
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
    ManagerEditPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('manager:getManagerDataSuccess');
        this.events.unsubscribe('manager:changePermissionsSuccess');
    };
    ManagerEditPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__["SharedService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
        { type: src_app_services_multi_region_multi_region_service__WEBPACK_IMPORTED_MODULE_5__["MultiRegionService"] },
        { type: src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_7__["UserGroupsService"] }
    ]; };
    ManagerEditPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-manager-edit',
            template: __webpack_require__(/*! raw-loader!./manager-edit.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/managers/manager-edit/manager-edit.page.html"),
            styles: [__webpack_require__(/*! ./manager-edit.page.scss */ "./src/app/admin/managers/manager-edit/manager-edit.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
            src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__["SharedService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
            src_app_services_multi_region_multi_region_service__WEBPACK_IMPORTED_MODULE_5__["MultiRegionService"],
            src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_7__["UserGroupsService"]])
    ], ManagerEditPage);
    return ManagerEditPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-managers-manager-edit-manager-edit-module-es5.js.map