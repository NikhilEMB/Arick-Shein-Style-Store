(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-import-export-manager-users-export-users-export-users-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/users/export-users/export-users.page.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/import-export-manager/users/export-users/export-users.page.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons style=\"margin-left: -8px;\" slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-menu-button style=\"margin-left: 8px;\" slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Export Users</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n\r\n        <ion-col id=\"scroll\" size=\"6\">\r\n          <div class=\"sectionArea\">\r\n            <h2>Configure Export Scheme</h2>\r\n            <div>\r\n              <!-- *** NEW FILTERS -->\r\n              <ion-card style=\"border-radius: 12px; background-color: #ddd;\">\r\n                <ion-card-header style=\"display: flex; justify-content: center; padding-bottom: 8px;\">\r\n                  <ion-card-title style=\"font-size: 20px; display: block;\">Filters</ion-card-title>\r\n                </ion-card-header>\r\n                <ion-card-header style=\"display: flex; justify-content: center; padding-top: 0;\">\r\n                  <ion-card-subtitle style=\"display: block;\">Select preferred user roles</ion-card-subtitle>\r\n                </ion-card-header>\r\n                <ion-card-content>\r\n                  <ion-card-title style=\"padding-bottom: 8px;\">Roles</ion-card-title>\r\n                  <div style=\"display: flex; justify-content: space-between;\"> \r\n                    <select class=\"customSelect\" style=\"width: 100%;\" (change)=\"setUserStatus($event.target.value)\">\r\n                      <option value=\"all\" selected>All</option>\r\n                      <option value=\"admin\">Admin</option>\r\n                      <option value=\"manager\">Manager</option>\r\n                      <option value=\"vendor\">Vendor</option>\r\n                      <option value=\"deliveryAgent\">Delivery Agent</option>\r\n                      <option value=\"user\">User</option>\r\n                    </select>\r\n                  </div>\r\n                </ion-card-content>\r\n              </ion-card>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col size=\"6\">\r\n          <div class=\"sectionArea\">\r\n            <h2>Instructions</h2>\r\n          </div>\r\n          <div style=\"margin-top: 10px;\">\r\n            <ol>\r\n              <li>Select the desired user role for export.</li>\r\n              <li>Click on Export Users for exporting the filtered users.</li>\r\n            </ol>\r\n          </div>\r\n        </ion-col>\r\n        \r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>\r\n\r\n<ion-footer no-border class=\"page-footer\" style=\"border-top: 1px solid #ccc;\">\r\n  <div class=\"main-container\" style=\"display: flex; align-content: center; justify-content: space-between; align-items: center;\">\r\n    <p style=\"font-size: 16px; font-weight: bold;\">Total Users Found : {{totalUsers.length}}</p>\r\n    <ion-button shape=\"round\" class=\"btn-1 i-start\" color=\"success\" [disabled]=\"saveDisable()\" (click)=\"exportUsersHandler()\">\r\n      Export Users\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/admin/import-export-manager/users/export-users/export-users.module.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/users/export-users/export-users.module.ts ***!
  \***************************************************************************************/
/*! exports provided: ExportUsersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExportUsersPageModule", function() { return ExportUsersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _export_users_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./export-users.page */ "./src/app/admin/import-export-manager/users/export-users/export-users.page.ts");







const routes = [
    {
        path: '',
        component: _export_users_page__WEBPACK_IMPORTED_MODULE_6__["ExportUsersPage"]
    }
];
let ExportUsersPageModule = class ExportUsersPageModule {
};
ExportUsersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_export_users_page__WEBPACK_IMPORTED_MODULE_6__["ExportUsersPage"]]
    })
], ExportUsersPageModule);



/***/ }),

/***/ "./src/app/admin/import-export-manager/users/export-users/export-users.page.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/users/export-users/export-users.page.scss ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  width: 100%;\n  padding: 0;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 75vh;\n  border-right: 1px solid lightgray;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 86vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n#scroll {\n  overflow: hidden;\n  height: calc(100vh - 157px);\n  border-right: 1px solid lightgray;\n}\n\n#scroll:hover {\n  overflow-y: auto;\n}\n\n.sectionArea h2 {\n  text-align: center;\n}\n\nh2 {\n  margin-top: 0;\n  font-size: 24px;\n}\n\n#mainField {\n  margin: 0 4px 8px 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n#mainFieldSelect {\n  height: 34px;\n  margin: 0 4px 8px 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n#subField {\n  margin: 0 8px 16px 40px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.dropdown {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  gap: 4px;\n}\n\n.hide {\n  visibility: hidden;\n  max-height: 0;\n  opacity: 0;\n  -webkit-transition: max-height 0.5s linear;\n  transition: max-height 0.5s linear;\n}\n\n#fieldSelection {\n  margin: 0 4px 8px 8px;\n}\n\n.customSelect {\n  width: 70%;\n  border-color: #ccc;\n  border-radius: 12px;\n  height: 25px;\n}\n\nion-datetime {\n  --padding-top: 0px ;\n}\n\n.date-picker {\n  position: relative;\n}\n\n.disable-date {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  border-top-left-radius: 12px;\n  border-top-right-radius: 12px;\n  height: 100%;\n  width: 100%;\n  background: black;\n  opacity: 0.2;\n  cursor: not-allowed;\n  z-index: 999;\n  -webkit-animation: fade-in 0.3s;\n          animation: fade-in 0.3s;\n}\n\n@-webkit-keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0.2;\n  }\n}\n\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0.2;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vaW1wb3J0LWV4cG9ydC1tYW5hZ2VyL3VzZXJzL2V4cG9ydC11c2Vycy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGltcG9ydC1leHBvcnQtbWFuYWdlclxcdXNlcnNcXGV4cG9ydC11c2Vyc1xcZXhwb3J0LXVzZXJzLnBhZ2Uuc2NzcyIsInNyYy9hcHAvYWRtaW4vaW1wb3J0LWV4cG9ydC1tYW5hZ2VyL3VzZXJzL2V4cG9ydC11c2Vycy9leHBvcnQtdXNlcnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFVBQUE7QUNDRjs7QURFQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGlDQUFBO0FDQ0Y7O0FEQUU7RUFDRSxnQkFBQTtBQ0VKOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0FDQ0Y7O0FEQUU7RUFDRSxnQkFBQTtBQ0VKOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSwyQkFBQTtFQUVBLGlDQUFBO0FDQUY7O0FEQ0U7RUFDRSxnQkFBQTtBQ0NKOztBREdFO0VBQ0Usa0JBQUE7QUNBSjs7QURJQTtFQUNFLGFBQUE7RUFDQSxlQUFBO0FDREY7O0FESUE7RUFDRSxxQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0FDREY7O0FESUE7RUFDRSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtBQ0RGOztBRElBO0VBQ0UsdUJBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtBQ0RGOztBRElBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLFFBQUE7QUNERjs7QURJQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLFVBQUE7RUFDQSwwQ0FBQTtFQUFBLGtDQUFBO0FDREY7O0FESUE7RUFDRSxxQkFBQTtBQ0RGOztBRElBO0VBQ0UsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FDREY7O0FESUE7RUFDRSxtQkFBQTtBQ0RGOztBREdBO0VBQ0Usa0JBQUE7QUNBRjs7QURFQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSx3Q0FBQTtVQUFBLGdDQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtBQ0NGOztBREVBO0VBQ0U7SUFBSyxVQUFBO0VDRUw7RUREQTtJQUFPLFlBQUE7RUNJUDtBQUNGOztBRFBBO0VBQ0U7SUFBSyxVQUFBO0VDRUw7RUREQTtJQUFPLFlBQUE7RUNJUDtBQUNGIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vaW1wb3J0LWV4cG9ydC1tYW5hZ2VyL3VzZXJzL2V4cG9ydC11c2Vycy9leHBvcnQtdXNlcnMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW4tY29udGFpbmVyIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiAwXHJcbn1cclxuXHJcbiNzY3JvbGwxIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogNzV2aDtcclxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxufVxyXG5cclxuI3Njcm9sbDIge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiA4NnZoO1xyXG4gICY6aG92ZXIge1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICB9XHJcbn1cclxuXHJcbiNzY3JvbGwge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTU3cHgpO1xyXG4gIC8vIGhlaWdodDogMTAwdmg7XHJcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICY6aG92ZXIge1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICB9XHJcbn1cclxuLnNlY3Rpb25BcmVhe1xyXG4gIGgyIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcbn1cclxuXHJcbmgyIHtcclxuICBtYXJnaW4tdG9wOiAwO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxufVxyXG5cclxuI21haW5GaWVsZCB7XHJcbiAgbWFyZ2luOiAwIDRweCA4cHggOHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuXHJcbiNtYWluRmllbGRTZWxlY3Qge1xyXG4gIGhlaWdodDogMzRweDtcclxuICBtYXJnaW46IDAgNHB4IDhweCA4cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5cclxuI3N1YkZpZWxkIHtcclxuICBtYXJnaW46IDAgOHB4IDE2cHggNDBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcblxyXG4uZHJvcGRvd24ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDRweDtcclxufVxyXG5cclxuLmhpZGUge1xyXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcclxuICBtYXgtaGVpZ2h0OiAwO1xyXG4gIG9wYWNpdHk6IDA7XHJcbiAgdHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjVzIGxpbmVhcjtcclxufVxyXG5cclxuI2ZpZWxkU2VsZWN0aW9uIHtcclxuICBtYXJnaW46IDAgNHB4IDhweCA4cHg7XHJcbn1cclxuXHJcbi5jdXN0b21TZWxlY3Qge1xyXG4gIHdpZHRoOiA3MCU7XHJcbiAgYm9yZGVyLWNvbG9yOiAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgaGVpZ2h0OiAyNXB4O1xyXG59XHJcblxyXG5pb24tZGF0ZXRpbWUge1xyXG4gIC0tcGFkZGluZy10b3A6IDBweFxyXG59XHJcbi5kYXRlLXBpY2tlcntcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuLmRpc2FibGUtZGF0ZXtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOjUwJTtcclxuICBsZWZ0OiA1MCU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTJweDtcclxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTJweDtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYmFja2dyb3VuZDogYmxhY2s7XHJcbiAgb3BhY2l0eTogMC4yO1xyXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XHJcbiAgei1pbmRleDogOTk5O1xyXG4gIGFuaW1hdGlvbjogZmFkZS1pbiAwLjNzO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIGZhZGUtaW4ge1xyXG4gIDAlIHsgb3BhY2l0eTogMDsgfTtcclxuICAxMDAlIHsgb3BhY2l0eTogMC4yOyB9XHJcbn0iLCIubWFpbi1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMDtcbn1cblxuI3Njcm9sbDEge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDc1dmg7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDg2dmg7XG59XG4jc2Nyb2xsMjpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbiNzY3JvbGwge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxNTdweCk7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cbiNzY3JvbGw6aG92ZXIge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG4uc2VjdGlvbkFyZWEgaDIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmgyIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgZm9udC1zaXplOiAyNHB4O1xufVxuXG4jbWFpbkZpZWxkIHtcbiAgbWFyZ2luOiAwIDRweCA4cHggOHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbiNtYWluRmllbGRTZWxlY3Qge1xuICBoZWlnaHQ6IDM0cHg7XG4gIG1hcmdpbjogMCA0cHggOHB4IDhweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4jc3ViRmllbGQge1xuICBtYXJnaW46IDAgOHB4IDE2cHggNDBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4uZHJvcGRvd24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDRweDtcbn1cblxuLmhpZGUge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIG1heC1oZWlnaHQ6IDA7XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246IG1heC1oZWlnaHQgMC41cyBsaW5lYXI7XG59XG5cbiNmaWVsZFNlbGVjdGlvbiB7XG4gIG1hcmdpbjogMCA0cHggOHB4IDhweDtcbn1cblxuLmN1c3RvbVNlbGVjdCB7XG4gIHdpZHRoOiA3MCU7XG4gIGJvcmRlci1jb2xvcjogI2NjYztcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgaGVpZ2h0OiAyNXB4O1xufVxuXG5pb24tZGF0ZXRpbWUge1xuICAtLXBhZGRpbmctdG9wOiAwcHggO1xufVxuXG4uZGF0ZS1waWNrZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5kaXNhYmxlLWRhdGUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMnB4O1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTJweDtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZDogYmxhY2s7XG4gIG9wYWNpdHk6IDAuMjtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgei1pbmRleDogOTk5O1xuICBhbmltYXRpb246IGZhZGUtaW4gMC4zcztcbn1cblxuQGtleWZyYW1lcyBmYWRlLWluIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgMTAwJSB7XG4gICAgb3BhY2l0eTogMC4yO1xuICB9XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/import-export-manager/users/export-users/export-users.page.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/users/export-users/export-users.page.ts ***!
  \*************************************************************************************/
/*! exports provided: ExportUsersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExportUsersPage", function() { return ExportUsersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/import-export-manager/import-export-manager.service */ "./src/app/services/import-export-manager/import-export-manager.service.ts");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");





let ExportUsersPage = class ExportUsersPage {
    constructor(importExportManagerService, toastController, loadingController) {
        this.importExportManagerService = importExportManagerService;
        this.toastController = toastController;
        this.loadingController = loadingController;
        this.totalUsers = 0;
        this.currentSelection = 'all';
        this.userFields = [
            'active',
            'name',
            'phoneNo',
            'role'
        ];
        this.options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            filename: 'Users' + new Date().toLocaleString(),
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'Exported Users ' + this.currentSelection,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };
    }
    ngOnInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () { });
    }
    presentLoading(msg, duration) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: msg || 'Please Wait...',
            });
            yield this.loading.present();
        });
    }
    presentToastWithOptions(header, message, errorCode) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                mode: 'ios',
                color: 'dark',
                header: header,
                message: message,
                duration: 4000,
                position: 'top',
                buttons: [
                    {
                        side: 'start',
                        text: errorCode,
                        handler: () => {
                            console.log('Favorite clicked');
                        }
                    }
                ]
            });
            toast.present();
        });
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.totalUsers = yield this.importExportManagerService.getUserByRole(this.currentSelection);
            console.log('totalUsers : ', this.totalUsers);
            yield this.loading.dismiss();
        });
    }
    setUserStatus(selection) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.totalUsers = [];
            this.currentSelection = selection;
            this.totalUsers = yield this.importExportManagerService.getUserByRole(this.currentSelection);
            yield this.loading.dismiss();
        });
    }
    saveDisable() {
        if (this.totalUsers && this.totalUsers.length) {
            return false;
        }
        else {
            return true;
        }
    }
    exportUsersHandler() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                if (this.totalUsers && this.totalUsers.length) {
                    let exportData = [], count = 0, erroneousUsers = [];
                    for (const user of this.totalUsers) {
                        if (user.active && user.phoneNo && user.role && user.name) {
                            count++;
                            exportData.push({
                                'S.no': count,
                                'Name': user.name,
                                'Role': user.role,
                                'PhoneNo': '\t' + user.phoneNo
                            });
                        }
                        else {
                            erroneousUsers.push(user);
                        }
                    }
                    console.log('Export data : ', exportData);
                    console.log('count : ', count);
                    console.log('total : ', this.totalUsers);
                    console.log('erroneousUsers : ', erroneousUsers);
                    if (count !== (this.totalUsers.length)) {
                        yield this.presentToastWithOptions('Warning In Export', `Found ${(this.totalUsers.length) - count} User(s) with details mismatch!`, 'ERR-103');
                    }
                    else {
                        yield this.presentToastWithOptions('Export Success!', `${count} user(s) found for current selection!`, 'LOG-200');
                    }
                    const csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_3__["ExportToCsv"](this.options);
                    csvExporter.generateCsv(exportData);
                    yield this.loading.dismiss();
                }
                else {
                    yield this.presentToastWithOptions('User(s) Not Found!', `No user(s) found for current selection!`, 'ERR-101');
                    this.reset();
                }
            }
            catch (error) {
                console.log('Error in exportUsersHandler : ', error);
                yield this.presentToastWithOptions('Something Went Wrong', `User Export Error!, Pls try again later.`, 'ERR-100');
                this.reset();
            }
        });
    }
    reset() {
        this.totalUsers = [];
    }
};
ExportUsersPage.ctorParameters = () => [
    { type: src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_2__["ImportExportManagerService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"] }
];
ExportUsersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-export-users',
        template: __webpack_require__(/*! raw-loader!./export-users.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/users/export-users/export-users.page.html"),
        styles: [__webpack_require__(/*! ./export-users.page.scss */ "./src/app/admin/import-export-manager/users/export-users/export-users.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_2__["ImportExportManagerService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"]])
], ExportUsersPage);



/***/ })

}]);
//# sourceMappingURL=admin-import-export-manager-users-export-users-export-users-module-es2015.js.map