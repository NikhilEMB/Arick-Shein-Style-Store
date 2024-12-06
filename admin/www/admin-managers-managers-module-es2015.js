(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-managers-managers-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/managers/managers.page.html":
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/managers/managers.page.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Managers Assigned</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>  \r\n\r\n<ion-content>\r\n  <div class=\"main\">\r\n    <div class=\"list-header\">\r\n      <ion-grid class=\"ion-no-padding\">\r\n        <ion-row>\r\n          <ion-col class=\"name\">\r\n            <p>Manager</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>Phone No</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>Action</p>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </div>\r\n    <!-- heading -->\r\n    <div class=\"list-container\" *ngIf=\"managers.length\">\r\n      <ion-grid>\r\n        <ion-row *ngFor=\"let manager of managers; let i=index\" class=\"order-row\">\r\n          <ion-col class=\"name\">\r\n            <p class=\"ion-text-capitalize\" (click)=\"editManager(i)\">{{manager.name}}</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p class=\"ion-text-capitalize\">{{manager.phoneNo}}</p>\r\n          </ion-col>\r\n          <ion-col class=\"action\">\r\n            <ion-button (click)=\"editManager(manager.id)\" class=\"btn-sml i-start\" fill=\"outline\"\r\n              shape=\"round\">\r\n              Edit\r\n            </ion-button>&nbsp;&nbsp;\r\n            <ion-button (click)=\"deleteManager(manager.id)\" class=\"btn-sml i-start m-s-btn\" fill=\"outline\"\r\n              shape=\"round\">\r\n              Delete\r\n            </ion-button>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </div>\r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/managers/managers.module.ts":
/*!***************************************************!*\
  !*** ./src/app/admin/managers/managers.module.ts ***!
  \***************************************************/
/*! exports provided: ManagersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagersPageModule", function() { return ManagersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _managers_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./managers.page */ "./src/app/admin/managers/managers.page.ts");







const routes = [
    {
        path: '',
        component: _managers_page__WEBPACK_IMPORTED_MODULE_6__["ManagersPage"]
    }
];
let ManagersPageModule = class ManagersPageModule {
};
ManagersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_managers_page__WEBPACK_IMPORTED_MODULE_6__["ManagersPage"]]
    })
], ManagersPageModule);



/***/ }),

/***/ "./src/app/admin/managers/managers.page.scss":
/*!***************************************************!*\
  !*** ./src/app/admin/managers/managers.page.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  padding-left: 50px;\n  padding-right: 50px;\n  padding-bottom: 30px;\n  background: white;\n  text-align: center;\n  width: 60vw;\n  margin: 0% auto;\n}\n\n.toggle {\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 32vw;\n}\n\n.toggleSub {\n  font-size: large;\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 30vw;\n}\n\nion-toggle {\n  margin-top: -10px;\n}\n\n.item-inner {\n  min-height: 1px !important;\n}\n\n.label-md {\n  margin-bottom: 1px !important;\n  margin-top: 1px !important;\n}\n\ninput {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.item {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n.card {\n  border: 1px solid lightgray;\n  width: 30vw;\n  margin: 0% auto;\n}\n\n.buttons {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n#cardBtn1 {\n  border-radius: 10px;\n  color: white;\n  background: black;\n  padding: 5px;\n  width: 80px;\n}\n\n#cardBtn2 {\n  border-radius: 10px;\n  color: white;\n  background: var(--ion-color-primary);\n  padding: 5px;\n  width: 80px;\n}\n\n.tab {\n  display: -webkit-box;\n  display: flex;\n  justify-content: space-around;\n  border-bottom: 1px lightgray;\n  font-size: large !important;\n  font-weight: 500;\n  border-bottom: 1px solid lightgray;\n}\n\ninput {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.form {\n  text-align: left;\n  width: 20vw;\n  margin: 0% auto;\n}\n\n.vendorList {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  width: 80;\n}\n\n.name {\n  width: calc(100% - 410px);\n  max-width: calc(100% - 410px);\n}\n\n.list-header {\n  width: 53.5vw;\n  position: relative;\n}\n\n.list-container {\n  margin-top: 90px;\n  width: 53.5vw;\n}\n\n.list-container ion-grid ion-row {\n  border-bottom: var(--ion-color-medium) 1px solid;\n  margin-left: 6.5vw;\n}\n\n.list-container ion-grid ion-row ion-col {\n  -webkit-box-align: center;\n          align-items: center;\n  display: -webkit-inline-box;\n  display: inline-flex;\n}\n\n.f-d-c {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.f-d-c .m-s-btn {\n  margin-top: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vbWFuYWdlcnMvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxtYW5hZ2Vyc1xcbWFuYWdlcnMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9tYW5hZ2Vycy9tYW5hZ2Vycy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLDJCQUFBO0VBQUEsb0JBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EsV0FBQTtBQ0NKOztBREVBO0VBQ0ksZ0JBQUE7RUFDQSwyQkFBQTtFQUFBLG9CQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLFdBQUE7QUNDSjs7QURFQTtFQUNJLGlCQUFBO0FDQ0o7O0FERUE7RUFDSSwwQkFBQTtBQ0NKOztBREVBO0VBQ0ksNkJBQUE7RUFDQSwwQkFBQTtBQ0NKOztBRFNBO0VBQ0ksc0JBQUE7RUFDQSxrQkFBQTtBQ05KOztBRFNBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7VUFBQSw2QkFBQTtBQ05KOztBRFNBO0VBQ0ksMkJBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ05KOztBRFNBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7VUFBQSw2QkFBQTtBQ05KOztBRFNBO0VBQ0ksbUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQ05KOztBRFNBO0VBQ0ksbUJBQUE7RUFDQSxZQUFBO0VBQ0Esb0NBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQ05KOztBRFNBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNkJBQUE7RUFDQSw0QkFBQTtFQUNBLDJCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQ0FBQTtBQ05KOztBRFNBO0VBQ0ksc0JBQUE7RUFDQSxrQkFBQTtBQ05KOztBRFNBO0VBQ0ksZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ05KOztBRFNBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLFNBQUE7QUNOSjs7QURTQTtFQUNJLHlCQUFBO0VBQ0EsNkJBQUE7QUNOSjs7QURTQTtFQUNJLGFBQUE7RUFDQSxrQkFBQTtBQ05KOztBRFNBO0VBQ0ksZ0JBQUE7RUFDQSxhQUFBO0FDTko7O0FEUVE7RUFDQSxnREFBQTtFQUNBLGtCQUFBO0FDTlI7O0FET1E7RUFDSSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsMkJBQUE7RUFBQSxvQkFBQTtBQ0xaOztBRFdBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBQ1JKOztBRFVJO0VBQ0UsZ0JBQUE7QUNSTiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL21hbmFnZXJzL21hbmFnZXJzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWlue1xyXG4gICAgcGFkZGluZy1sZWZ0OiA1MHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogNTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAzMHB4O1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB3aWR0aDogNjB2dztcclxuICAgIG1hcmdpbjogMCUgYXV0b1xyXG59XHJcblxyXG4udG9nZ2xle1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICB3aWR0aDogMzJ2dztcclxufVxyXG5cclxuLnRvZ2dsZVN1YntcclxuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIHdpZHRoOiAzMHZ3O1xyXG59XHJcblxyXG5pb24tdG9nZ2xle1xyXG4gICAgbWFyZ2luLXRvcDogLTEwcHhcclxufVxyXG5cclxuLml0ZW0taW5uZXJ7XHJcbiAgICBtaW4taGVpZ2h0OiAxcHggIWltcG9ydGFudDtcclxuICAgIH1cclxuXHJcbi5sYWJlbC1tZHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFweCFpbXBvcnRhbnQ7XHJcbiAgICBtYXJnaW4tdG9wOiAxcHghaW1wb3J0YW50O1xyXG59XHJcblxyXG4vLyBpb24taXRlbS1kaXZpZGVye1xyXG4vLyAgICAgbWFyZ2luLXRvcDogMHB4O1xyXG4vLyAgICAgbWluLWhlaWdodDogMXB4IWltcG9ydGFudDtcclxuLy8gICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcclxuLy8gICAgIG9wYWNpdHk6IDUwJVxyXG4vLyB9XHJcblxyXG5pbnB1dHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5pdGVte1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5XHJcbn1cclxuXHJcbi5jYXJke1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICAgd2lkdGg6IDMwdnc7XHJcbiAgICBtYXJnaW46IDAlIGF1dG9cclxufVxyXG5cclxuLmJ1dHRvbnN7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHlcclxufVxyXG5cclxuI2NhcmRCdG4xe1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQ6IGJsYWNrO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgd2lkdGg6IDgwcHhcclxufVxyXG5cclxuI2NhcmRCdG4ye1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIHdpZHRoOiA4MHB4XHJcbn1cclxuXHJcbi50YWJ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggbGlnaHRncmF5O1xyXG4gICAgZm9udC1zaXplOiBsYXJnZSAhaW1wb3J0YW50O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbn1cclxuXHJcbmlucHV0e1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLmZvcm17XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgd2lkdGg6IDIwdnc7XHJcbiAgICBtYXJnaW46IDAlIGF1dG9cclxufVxyXG5cclxuLnZlbmRvckxpc3R7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgd2lkdGg6IDgwXHJcbn1cclxuXHJcbi5uYW1le1xyXG4gICAgd2lkdGg6IGNhbGMoMTAwJSAtIDQxMHB4KTtcclxuICAgIG1heC13aWR0aDogY2FsYygxMDAlIC0gNDEwcHgpO1xyXG4gIH1cclxuXHJcbi5saXN0LWhlYWRlcntcclxuICAgIHdpZHRoOiA1My41dnc7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmVcclxuICB9XHJcbiAgXHJcbi5saXN0LWNvbnRhaW5lcntcclxuICAgIG1hcmdpbi10b3A6IDkwcHg7XHJcbiAgICB3aWR0aDogNTMuNXZ3O1xyXG4gICAgaW9uLWdyaWR7XHJcbiAgICAgICAgaW9uLXJvd3tcclxuICAgICAgICBib3JkZXItYm90dG9tOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDYuNXZ3O1xyXG4gICAgICAgIGlvbi1jb2x7XHJcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi5mLWQtYyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgXHJcbiAgICAubS1zLWJ0biB7XHJcbiAgICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgICB9XHJcbiAgfSIsIi5tYWluIHtcbiAgcGFkZGluZy1sZWZ0OiA1MHB4O1xuICBwYWRkaW5nLXJpZ2h0OiA1MHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMzBweDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDYwdnc7XG4gIG1hcmdpbjogMCUgYXV0bztcbn1cblxuLnRvZ2dsZSB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAzMnZ3O1xufVxuXG4udG9nZ2xlU3ViIHtcbiAgZm9udC1zaXplOiBsYXJnZTtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgd2lkdGg6IDMwdnc7XG59XG5cbmlvbi10b2dnbGUge1xuICBtYXJnaW4tdG9wOiAtMTBweDtcbn1cblxuLml0ZW0taW5uZXIge1xuICBtaW4taGVpZ2h0OiAxcHggIWltcG9ydGFudDtcbn1cblxuLmxhYmVsLW1kIHtcbiAgbWFyZ2luLWJvdHRvbTogMXB4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi10b3A6IDFweCAhaW1wb3J0YW50O1xufVxuXG5pbnB1dCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLml0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbn1cblxuLmNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIHdpZHRoOiAzMHZ3O1xuICBtYXJnaW46IDAlIGF1dG87XG59XG5cbi5idXR0b25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG59XG5cbiNjYXJkQnRuMSB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZDogYmxhY2s7XG4gIHBhZGRpbmc6IDVweDtcbiAgd2lkdGg6IDgwcHg7XG59XG5cbiNjYXJkQnRuMiB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBwYWRkaW5nOiA1cHg7XG4gIHdpZHRoOiA4MHB4O1xufVxuXG4udGFiIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGJvcmRlci1ib3R0b206IDFweCBsaWdodGdyYXk7XG4gIGZvbnQtc2l6ZTogbGFyZ2UgIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cblxuaW5wdXQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5mb3JtIHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgd2lkdGg6IDIwdnc7XG4gIG1hcmdpbjogMCUgYXV0bztcbn1cblxuLnZlbmRvckxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiA4MDtcbn1cblxuLm5hbWUge1xuICB3aWR0aDogY2FsYygxMDAlIC0gNDEwcHgpO1xuICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDQxMHB4KTtcbn1cblxuLmxpc3QtaGVhZGVyIHtcbiAgd2lkdGg6IDUzLjV2dztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ubGlzdC1jb250YWluZXIge1xuICBtYXJnaW4tdG9wOiA5MHB4O1xuICB3aWR0aDogNTMuNXZ3O1xufVxuLmxpc3QtY29udGFpbmVyIGlvbi1ncmlkIGlvbi1yb3cge1xuICBib3JkZXItYm90dG9tOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XG4gIG1hcmdpbi1sZWZ0OiA2LjV2dztcbn1cbi5saXN0LWNvbnRhaW5lciBpb24tZ3JpZCBpb24tcm93IGlvbi1jb2wge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbn1cblxuLmYtZC1jIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5mLWQtYyAubS1zLWJ0biB7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/managers/managers.page.ts":
/*!*************************************************!*\
  !*** ./src/app/admin/managers/managers.page.ts ***!
  \*************************************************/
/*! exports provided: ManagersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagersPage", function() { return ManagersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");







let ManagersPage = class ManagersPage {
    constructor(events, labelService, router, sharedService, alertController, configService) {
        this.events = events;
        this.labelService = labelService;
        this.router = router;
        this.sharedService = sharedService;
        this.alertController = alertController;
        this.configService = configService;
        this.managers = [];
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.initializeSubscriptions();
            this.events.publish('manager:getAllManagers');
        });
    }
    ngOnInit() {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
    }
    ngOnDestroy() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('manager:publishAllManagers', (managerData) => {
            if (managerData.length) {
                this.managers = managerData;
                console.log(this.managers);
            }
            else {
                this.managers = [];
            }
        });
        this.events.subscribe('manager:managerDeleted', () => {
            if (this.sharedService.loading) {
                this.sharedService.loading.dismiss();
            }
            this.sharedService.presentAlert("Manager Deleted");
            this.events.publish('manager:getAllManagers');
        });
    }
    editManager(id) {
        const navigationExtras = {
            state: {
                managerData: id
            }
        };
        // console.log('vendor data ->', this.vendors[i])
        this.router.navigate(['manager-edit'], navigationExtras);
    }
    deleteManager(id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            this.events.publish('manager:deleteManager', id);
        });
    }
    removeSubscriptions() {
        this.events.unsubscribe('manager:publishAllManagers');
        this.events.unsubscribe('manager:managerDeleted');
    }
};
ManagersPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
    { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"] }
];
ManagersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-managers',
        template: __webpack_require__(/*! raw-loader!./managers.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/managers/managers.page.html"),
        styles: [__webpack_require__(/*! ./managers.page.scss */ "./src/app/admin/managers/managers.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
        src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
        src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"]])
], ManagersPage);



/***/ })

}]);
//# sourceMappingURL=admin-managers-managers-module-es2015.js.map