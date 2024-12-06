(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-import-export-manager-users-import-users-import-users-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/users/import-users/import-users.page.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/import-export-manager/users/import-users/import-users.page.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons style=\"margin-left: -8px;\" slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-menu-button style=\"margin-left: 8px;\" slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Export Users</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n\r\n        <ion-col id=\"scroll\" size=\"4\">\r\n          <div class=\"sectionArea\">\r\n            <h2>Uploaded Users</h2>\r\n            <p class=\"ion-text-center\" *ngIf=\"!updateObj.length\">\r\n              Please Upload CSV\r\n            </p>\r\n            <ion-card>\r\n              <ion-card-header>\r\n                <ion-card-title>Ready to import user(s)</ion-card-title>\r\n                <ion-card-subtitle style=\"color: green;\">✅ Total Found - {{updateObj.length || 0}}</ion-card-subtitle>\r\n                <div class=\"stateDiv\" *ngFor=\"let user of updateObj; let i = index\">\r\n                  <ion-card-subtitle>{{i+1}} ) Name - <p class=\"customIdentifier\">{{user.name}}</p> Number - <p class=\"customIdentifier\">{{user.phoneNumber}}</p></ion-card-subtitle>\r\n                </div>\r\n              </ion-card-header>\r\n            </ion-card>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col id=\"scroll\" size=\"4\">\r\n          <div class=\"sectionArea\">\r\n            <h2>Imported Users</h2>\r\n            <p class=\"ion-text-center\" *ngIf=\"!finalUsers.length\">\r\n              Please Import CSV\r\n            </p>\r\n            <ion-card>\r\n              <ion-card-header>\r\n                <ion-card-title>Imported user(s)</ion-card-title>\r\n                <ion-card-subtitle style=\"color: green;\">✅ Total Imported - {{finalUsers.length || 0}}</ion-card-subtitle>\r\n                <div class=\"stateDiv\" *ngFor=\"let user of finalUsers; let i = index\">\r\n                  <ion-card-subtitle>{{i+1}} ) Name - <p class=\"customIdentifier\">{{user.data.name}}</p> Number - <p class=\"customIdentifier\">{{user.data.phoneNumber}}</p></ion-card-subtitle>\r\n                </div>\r\n              </ion-card-header>\r\n            </ion-card>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col size=\"4\">\r\n          <div class=\"sectionArea\">\r\n            <h2>Instructions</h2>\r\n          </div>\r\n          <div style=\"margin-top: 10px;\">\r\n            <ol>\r\n              <li style=\"font-weight: bold\">Before Uploading</li>\r\n                <ion-button expand=\"block\" shape=\"round\" mode=\"ios\" style=\"margin: 10px 0 10px 0\">\r\n                  <a href=\"../../../../../assets/files/sample-csv-add-users.csv\" download>Download Sample CSV</a>\r\n                </ion-button>\r\n                <ol>\r\n                  <li>You can use the sample csv format provided for formatting the users accordingly.</li>\r\n                  <li>Make sure to input the phone numbers as [9999999999] format only.</li>\r\n                </ol>\r\n              <li style=\"font-weight: bold\">While Uploading</li>\r\n              <ol>\r\n                <li>Make sure that the file is of .csv format.</li>\r\n              </ol>\r\n              <li style=\"font-weight: bold\">While Importing</li>\r\n              <ol>\r\n                <li>Please wait while the importing of users is undergoing & make sure to not close this tab.</li>\r\n              </ol>\r\n            </ol>\r\n          </div>\r\n        </ion-col>\r\n        \r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>\r\n\r\n<ion-footer no-border class=\"page-footer\" style=\"border-top: 1px solid #ccc;\">\r\n  <div class=\"main-container\" style=\"display: flex; align-content: center; justify-content: space-between; align-items: center;\">\r\n    <div class=\"upload-btn-wrapper\">\r\n      <ion-button [disabled]=\"saveDisable()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\" (click)=\"importOrdersHandler($event, buttonState)\" >\r\n        <i *ngIf=\"buttonState === 'Import'\" class=\"flaticon-null-20 margin-icon\"></i>\r\n        <i *ngIf=\"buttonState === 'Upload'\" class=\"flaticon-null-16\"></i>\r\n        {{buttonState}} CSV\r\n      </ion-button>\r\n      <ng-container *ngIf=\"buttonState !== 'Import'\">\r\n        <input type=\"file\" name=\"myfile\" (change)=\"importOrdersHandler($event, buttonState)\"/>\r\n      </ng-container>\r\n    </div>\r\n  </div>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/admin/import-export-manager/users/import-users/import-users.module.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/users/import-users/import-users.module.ts ***!
  \***************************************************************************************/
/*! exports provided: ImportUsersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportUsersPageModule", function() { return ImportUsersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _import_users_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./import-users.page */ "./src/app/admin/import-export-manager/users/import-users/import-users.page.ts");







var routes = [
    {
        path: '',
        component: _import_users_page__WEBPACK_IMPORTED_MODULE_6__["ImportUsersPage"]
    }
];
var ImportUsersPageModule = /** @class */ (function () {
    function ImportUsersPageModule() {
    }
    ImportUsersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_import_users_page__WEBPACK_IMPORTED_MODULE_6__["ImportUsersPage"]]
        })
    ], ImportUsersPageModule);
    return ImportUsersPageModule;
}());



/***/ }),

/***/ "./src/app/admin/import-export-manager/users/import-users/import-users.page.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/users/import-users/import-users.page.scss ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  width: 100%;\n  padding: 0;\n}\n\na, a:hover, a:focus, a:active {\n  text-decoration: none;\n  color: inherit;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 75vh;\n  border-right: 1px solid lightgray;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 86vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n#scroll {\n  overflow: hidden;\n  height: calc(100vh - 157px);\n  border-right: 1px solid lightgray;\n}\n\n#scroll:hover {\n  overflow-y: auto;\n}\n\n.sectionArea h2 {\n  text-align: center;\n}\n\nh2 {\n  margin-top: 0;\n  font-size: 24px;\n}\n\n#mainField {\n  margin: 0 4px 8px 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n#mainFieldSelect {\n  height: 34px;\n  margin: 0 4px 8px 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n#subField {\n  margin: 0 8px 16px 40px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.dropdown {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  gap: 4px;\n}\n\n.hide {\n  visibility: hidden;\n  max-height: 0;\n  opacity: 0;\n  -webkit-transition: max-height 0.5s linear;\n  transition: max-height 0.5s linear;\n}\n\n#fieldSelection {\n  margin: 0 4px 8px 8px;\n}\n\n.customSelect {\n  width: 70%;\n  border-color: #ccc;\n  border-radius: 12px;\n  height: 25px;\n}\n\nion-datetime {\n  --padding-top: 0px ;\n}\n\n.date-picker {\n  position: relative;\n}\n\n.disable-date {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  border-top-left-radius: 12px;\n  border-top-right-radius: 12px;\n  height: 100%;\n  width: 100%;\n  background: black;\n  opacity: 0.2;\n  cursor: not-allowed;\n  z-index: 999;\n  -webkit-animation: fade-in 0.3s;\n          animation: fade-in 0.3s;\n}\n\n@-webkit-keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0.2;\n  }\n}\n\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0.2;\n  }\n}\n\n.customIdentifier {\n  color: green;\n  display: inline;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vaW1wb3J0LWV4cG9ydC1tYW5hZ2VyL3VzZXJzL2ltcG9ydC11c2Vycy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGltcG9ydC1leHBvcnQtbWFuYWdlclxcdXNlcnNcXGltcG9ydC11c2Vyc1xcaW1wb3J0LXVzZXJzLnBhZ2Uuc2NzcyIsInNyYy9hcHAvYWRtaW4vaW1wb3J0LWV4cG9ydC1tYW5hZ2VyL3VzZXJzL2ltcG9ydC11c2Vycy9pbXBvcnQtdXNlcnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFVBQUE7QUNDRjs7QURFQTtFQUNFLHFCQUFBO0VBQ0EsY0FBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsaUNBQUE7QUNDRjs7QURBRTtFQUNFLGdCQUFBO0FDRUo7O0FERUE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7QUNDRjs7QURBRTtFQUNFLGdCQUFBO0FDRUo7O0FERUE7RUFDRSxnQkFBQTtFQUNBLDJCQUFBO0VBRUEsaUNBQUE7QUNBRjs7QURDRTtFQUNFLGdCQUFBO0FDQ0o7O0FER0U7RUFDRSxrQkFBQTtBQ0FKOztBRElBO0VBQ0UsYUFBQTtFQUNBLGVBQUE7QUNERjs7QURJQTtFQUNFLHFCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7QUNERjs7QURJQTtFQUNFLFlBQUE7RUFDQSxxQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0FDREY7O0FESUE7RUFDRSx1QkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0FDREY7O0FESUE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsUUFBQTtBQ0RGOztBRElBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0EsVUFBQTtFQUNBLDBDQUFBO0VBQUEsa0NBQUE7QUNERjs7QURJQTtFQUNFLHFCQUFBO0FDREY7O0FESUE7RUFDRSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUNERjs7QURJQTtFQUNFLG1CQUFBO0FDREY7O0FER0E7RUFDRSxrQkFBQTtBQ0FGOztBREVBO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLHdDQUFBO1VBQUEsZ0NBQUE7RUFDQSw0QkFBQTtFQUNBLDZCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSwrQkFBQTtVQUFBLHVCQUFBO0FDQ0Y7O0FERUE7RUFDRTtJQUFLLFVBQUE7RUNFTDtFRERBO0lBQU8sWUFBQTtFQ0lQO0FBQ0Y7O0FEUEE7RUFDRTtJQUFLLFVBQUE7RUNFTDtFRERBO0lBQU8sWUFBQTtFQ0lQO0FBQ0Y7O0FERkE7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQ0lGIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vaW1wb3J0LWV4cG9ydC1tYW5hZ2VyL3VzZXJzL2ltcG9ydC11c2Vycy9pbXBvcnQtdXNlcnMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW4tY29udGFpbmVyIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiAwXHJcbn1cclxuXHJcbmEsIGE6aG92ZXIsIGE6Zm9jdXMsIGE6YWN0aXZlIHtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgY29sb3I6IGluaGVyaXQ7XHJcbn1cclxuXHJcbiNzY3JvbGwxIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogNzV2aDtcclxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxufVxyXG5cclxuI3Njcm9sbDIge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiA4NnZoO1xyXG4gICY6aG92ZXIge1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICB9XHJcbn1cclxuXHJcbiNzY3JvbGwge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTU3cHgpO1xyXG4gIC8vIGhlaWdodDogMTAwdmg7XHJcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICY6aG92ZXIge1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICB9XHJcbn1cclxuLnNlY3Rpb25BcmVhe1xyXG4gIGgyIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcbn1cclxuXHJcbmgyIHtcclxuICBtYXJnaW4tdG9wOiAwO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxufVxyXG5cclxuI21haW5GaWVsZCB7XHJcbiAgbWFyZ2luOiAwIDRweCA4cHggOHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuXHJcbiNtYWluRmllbGRTZWxlY3Qge1xyXG4gIGhlaWdodDogMzRweDtcclxuICBtYXJnaW46IDAgNHB4IDhweCA4cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5cclxuI3N1YkZpZWxkIHtcclxuICBtYXJnaW46IDAgOHB4IDE2cHggNDBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcblxyXG4uZHJvcGRvd24ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDRweDtcclxufVxyXG5cclxuLmhpZGUge1xyXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcclxuICBtYXgtaGVpZ2h0OiAwO1xyXG4gIG9wYWNpdHk6IDA7XHJcbiAgdHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjVzIGxpbmVhcjtcclxufVxyXG5cclxuI2ZpZWxkU2VsZWN0aW9uIHtcclxuICBtYXJnaW46IDAgNHB4IDhweCA4cHg7XHJcbn1cclxuXHJcbi5jdXN0b21TZWxlY3Qge1xyXG4gIHdpZHRoOiA3MCU7XHJcbiAgYm9yZGVyLWNvbG9yOiAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgaGVpZ2h0OiAyNXB4O1xyXG59XHJcblxyXG5pb24tZGF0ZXRpbWUge1xyXG4gIC0tcGFkZGluZy10b3A6IDBweFxyXG59XHJcbi5kYXRlLXBpY2tlcntcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuLmRpc2FibGUtZGF0ZXtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOjUwJTtcclxuICBsZWZ0OiA1MCU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTJweDtcclxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTJweDtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYmFja2dyb3VuZDogYmxhY2s7XHJcbiAgb3BhY2l0eTogMC4yO1xyXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XHJcbiAgei1pbmRleDogOTk5O1xyXG4gIGFuaW1hdGlvbjogZmFkZS1pbiAwLjNzO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIGZhZGUtaW4ge1xyXG4gIDAlIHsgb3BhY2l0eTogMDsgfTtcclxuICAxMDAlIHsgb3BhY2l0eTogMC4yOyB9XHJcbn1cclxuXHJcbi5jdXN0b21JZGVudGlmaWVyIHtcclxuICBjb2xvcjogZ3JlZW47XHJcbiAgZGlzcGxheTogaW5saW5lO1xyXG59IiwiLm1haW4tY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbmEsIGE6aG92ZXIsIGE6Zm9jdXMsIGE6YWN0aXZlIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjb2xvcjogaW5oZXJpdDtcbn1cblxuI3Njcm9sbDEge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDc1dmg7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDg2dmg7XG59XG4jc2Nyb2xsMjpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbiNzY3JvbGwge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxNTdweCk7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cbiNzY3JvbGw6aG92ZXIge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG4uc2VjdGlvbkFyZWEgaDIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmgyIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgZm9udC1zaXplOiAyNHB4O1xufVxuXG4jbWFpbkZpZWxkIHtcbiAgbWFyZ2luOiAwIDRweCA4cHggOHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbiNtYWluRmllbGRTZWxlY3Qge1xuICBoZWlnaHQ6IDM0cHg7XG4gIG1hcmdpbjogMCA0cHggOHB4IDhweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4jc3ViRmllbGQge1xuICBtYXJnaW46IDAgOHB4IDE2cHggNDBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4uZHJvcGRvd24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDRweDtcbn1cblxuLmhpZGUge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIG1heC1oZWlnaHQ6IDA7XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246IG1heC1oZWlnaHQgMC41cyBsaW5lYXI7XG59XG5cbiNmaWVsZFNlbGVjdGlvbiB7XG4gIG1hcmdpbjogMCA0cHggOHB4IDhweDtcbn1cblxuLmN1c3RvbVNlbGVjdCB7XG4gIHdpZHRoOiA3MCU7XG4gIGJvcmRlci1jb2xvcjogI2NjYztcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgaGVpZ2h0OiAyNXB4O1xufVxuXG5pb24tZGF0ZXRpbWUge1xuICAtLXBhZGRpbmctdG9wOiAwcHggO1xufVxuXG4uZGF0ZS1waWNrZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5kaXNhYmxlLWRhdGUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMnB4O1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTJweDtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZDogYmxhY2s7XG4gIG9wYWNpdHk6IDAuMjtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgei1pbmRleDogOTk5O1xuICBhbmltYXRpb246IGZhZGUtaW4gMC4zcztcbn1cblxuQGtleWZyYW1lcyBmYWRlLWluIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgMTAwJSB7XG4gICAgb3BhY2l0eTogMC4yO1xuICB9XG59XG4uY3VzdG9tSWRlbnRpZmllciB7XG4gIGNvbG9yOiBncmVlbjtcbiAgZGlzcGxheTogaW5saW5lO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/import-export-manager/users/import-users/import-users.page.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/users/import-users/import-users.page.ts ***!
  \*************************************************************************************/
/*! exports provided: ImportUsersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportUsersPage", function() { return ImportUsersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var ngx_papaparse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-papaparse */ "./node_modules/ngx-papaparse/fesm5/ngx-papaparse.js");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/import-export-manager/import-export-manager.service */ "./src/app/services/import-export-manager/import-export-manager.service.ts");






var ImportUsersPage = /** @class */ (function () {
    function ImportUsersPage(toastController, papa, importExportManagerService, loadingController, configService) {
        this.toastController = toastController;
        this.papa = papa;
        this.importExportManagerService = importExportManagerService;
        this.loadingController = loadingController;
        this.configService = configService;
        this.updateObj = [];
        this.supportedUpdateFields = ['Phone Number', 'Name'];
        this.buttonState = 'Upload';
        this.allUsers = [];
        this.countryCode = this.configService.environment.defaultCountryCode;
        this.finalUsers = [];
    }
    ImportUsersPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    ImportUsersPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.importExportManagerService.getUserByRole('user', 'custom-justNumbers')];
                    case 2:
                        _a.allUsers = _b.sent();
                        console.log('allUsers', this.allUsers);
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ImportUsersPage.prototype.presentLoading = function (msg, duration) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: msg || 'Please Wait...',
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
    ImportUsersPage.prototype.presentToastWithOptions = function (header, message, errorCode) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
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
                                    handler: function () {
                                        console.log('Favorite clicked');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ImportUsersPage.prototype.saveDisable = function () {
        if (this.allUsers && this.allUsers.length) {
            return false;
        }
        else {
            return true;
        }
    };
    ImportUsersPage.prototype.checkValidCSV = function (event, jsonData) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var i;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!event.target.files[0].name.includes('.csv')) return [3 /*break*/, 4];
                        console.log('jsonData :', jsonData);
                        for (i = 0; i < jsonData.length; i++) {
                            if (jsonData[i].includes('Name') && jsonData[i].includes('Phone Number')) {
                                this.headerIndex = i;
                            }
                        }
                        console.log('headerIndex :', this.headerIndex);
                        if (!(jsonData[this.headerIndex].includes('Name') && jsonData[this.headerIndex].includes('Phone Number'))) return [3 /*break*/, 1];
                        return [2 /*return*/, true];
                    case 1: return [4 /*yield*/, this.presentToastWithOptions('Invalid CSV Format!', 'The CSV is either missing the Name or the Phone Number column(s)!', 'ERR-191')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.presentToastWithOptions('Invalid File Format!', 'The file should be only in [ .csv ] format.', 'ERR-190')];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ImportUsersPage.prototype.formatDeliveryPhoneNo = function (phoneNo) {
        var formattedStr = phoneNo.replace('[', '');
        formattedStr = formattedStr.replace(']', '');
        return formattedStr.trim();
    };
    ImportUsersPage.prototype.importOrdersHandler = function (event, state) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var jsonData, csv, options, _i, _a, user, _b, _c, _d;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _e.sent();
                        jsonData = [];
                        if (!(state === 'Upload')) return [3 /*break*/, 3];
                        this.updateObj = [];
                        this.finalUsers = [];
                        csv = event.target.files[0];
                        console.log('csv : ', csv);
                        options = {
                            complete: function (result, file) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                var validity, nameIndex, phoneNumberIndex, i, count, _i, _a, user;
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            jsonData = result.data;
                                            return [4 /*yield*/, this.checkValidCSV(event, jsonData)];
                                        case 1:
                                            validity = _b.sent();
                                            console.log('validity : ', validity);
                                            if (!validity) return [3 /*break*/, 9];
                                            nameIndex = jsonData[this.headerIndex].findIndex(function (f) { return f === 'Name'; });
                                            phoneNumberIndex = jsonData[this.headerIndex].findIndex(function (f) { return f === 'Phone Number'; });
                                            console.log('nameIndex :', nameIndex);
                                            console.log('phoneNumberIndex :', phoneNumberIndex);
                                            for (i = this.headerIndex + 1; i < jsonData.length; i++) {
                                                if (jsonData[i][nameIndex] && jsonData[i][phoneNumberIndex]) {
                                                    // console.log(jsonData[i])
                                                    this.updateObj.push({
                                                        name: jsonData[i][nameIndex],
                                                        phoneNumber: this.formatDeliveryPhoneNo(jsonData[i][phoneNumberIndex])
                                                    });
                                                }
                                            }
                                            console.log(this.updateObj);
                                            count = 0;
                                            if (!(this.updateObj && this.updateObj.length)) return [3 /*break*/, 8];
                                            _i = 0, _a = this.updateObj;
                                            _b.label = 2;
                                        case 2:
                                            if (!(_i < _a.length)) return [3 /*break*/, 8];
                                            user = _a[_i];
                                            console.log('user : ', user);
                                            if (!(user.phoneNumber.toString().length != 10)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, this.presentToastWithOptions('Invalid Phone Number!', "The user : " + user.name + " has invalid phone number : " + user.phoneNumber + " . You should provide a number with at least 10 digits", 'ERR-190')];
                                        case 3:
                                            _b.sent();
                                            this.updateObj = [];
                                            return [2 /*return*/];
                                        case 4:
                                            if (!this.allUsers.includes(this.countryCode + user.phoneNumber)) return [3 /*break*/, 6];
                                            return [4 /*yield*/, this.presentToastWithOptions('Already Exists!', "The user : " + user.name + " with phone number : " + user.phoneNumber + " already exists!.", 'ERR-191')];
                                        case 5:
                                            _b.sent();
                                            this.updateObj = [];
                                            return [2 /*return*/];
                                        case 6:
                                            count++;
                                            _b.label = 7;
                                        case 7:
                                            _i++;
                                            return [3 /*break*/, 2];
                                        case 8:
                                            if (count == this.updateObj.length) {
                                                this.buttonState = 'Import';
                                            }
                                            _b.label = 9;
                                        case 9: return [2 /*return*/];
                                    }
                                });
                            }); }
                        };
                        this.papa.parse(csv, options);
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 2:
                        _e.sent();
                        _e.label = 3;
                    case 3:
                        if (!(state === 'Import')) return [3 /*break*/, 10];
                        _i = 0, _a = this.updateObj;
                        _e.label = 4;
                    case 4:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        user = _a[_i];
                        user.phoneNumber = this.countryCode + user.phoneNumber;
                        _c = (_b = this.finalUsers).push;
                        return [4 /*yield*/, this.importExportManagerService.addUserByAdmin(user)];
                    case 5:
                        _c.apply(_b, [_e.sent()]);
                        _e.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        console.log('state : ', this.finalUsers);
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 8:
                        _e.sent();
                        if (!(this.finalUsers && this.finalUsers.length)) return [3 /*break*/, 10];
                        this.allUsers = [];
                        _d = this;
                        return [4 /*yield*/, this.importExportManagerService.getUserByRole('user', 'custom-justNumbers')];
                    case 9:
                        _d.allUsers = _e.sent();
                        this.buttonState = 'Upload';
                        _e.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ImportUsersPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
        { type: ngx_papaparse__WEBPACK_IMPORTED_MODULE_3__["Papa"] },
        { type: src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_5__["ImportExportManagerService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"] }
    ]; };
    ImportUsersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-import-users',
            template: __webpack_require__(/*! raw-loader!./import-users.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/users/import-users/import-users.page.html"),
            styles: [__webpack_require__(/*! ./import-users.page.scss */ "./src/app/admin/import-export-manager/users/import-users/import-users.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            ngx_papaparse__WEBPACK_IMPORTED_MODULE_3__["Papa"],
            src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_5__["ImportExportManagerService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"]])
    ], ImportUsersPage);
    return ImportUsersPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-import-export-manager-users-import-users-import-users-module-es5.js.map