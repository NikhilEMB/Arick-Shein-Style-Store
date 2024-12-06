(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-import-export-manager-orders-import-orders-import-orders-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/orders/import-orders/import-orders.page.html":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/import-export-manager/orders/import-orders/import-orders.page.html ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons style=\"margin-left: -8px;\" slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-menu-button style=\"margin-left: 8px;\" slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Import Orders</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n\r\n        <ion-col id=\"scroll\" size=\"6\">\r\n          <div class=\"sectionArea\">\r\n            <h2>Import fields</h2>\r\n            <div>\r\n\r\n              <ion-item>\r\n                <ion-label>Delivery Agent</ion-label>\r\n                <ion-checkbox slot=\"end\" mode=\"ios\" disabled [checked]=\"buttonState === 'Import'\"></ion-checkbox>\r\n              </ion-item>\r\n\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col size=\"6\">\r\n          <div class=\"sectionArea\">\r\n            <h2>Instructions</h2>\r\n          </div>\r\n          <div style=\"margin-top: 10px;\">\r\n            <ol>\r\n              <li>Simply select the CSV file containing the the list of delivery agent(s) phone no.</li>\r\n              <li style=\"font-weight: bold\">The format for the delivery agent is as follows : </li>\r\n              <ol>\r\n                <li>[ +919988776655 ]</li>\r\n              </ol>\r\n              <li>Right now only the updating of delivery agent is supported.</li>\r\n            </ol>\r\n          </div>\r\n        </ion-col>\r\n        \r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>\r\n\r\n<ion-footer no-border class=\"page-footer\" style=\"border-top: 1px solid #ccc;\">\r\n  <div class=\"main-container\" style=\"display: flex; align-content: center; justify-content: space-between; align-items: center;\">\r\n    <div class=\"upload-btn-wrapper\">\r\n      <ion-button [disabled]=\"saveDisable()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\" (click)=\"importOrdersHandler($event, buttonState)\" >\r\n        <i *ngIf=\"buttonState === 'Import'\" class=\"flaticon-null-20 margin-icon\"></i>\r\n        <i *ngIf=\"buttonState === 'Upload'\" class=\"flaticon-null-16\"></i>\r\n        {{buttonState}} CSV\r\n      </ion-button>\r\n      <ng-container *ngIf=\"buttonState !== 'Import'\">\r\n        <input type=\"file\" name=\"myfile\" (change)=\"importOrdersHandler($event, buttonState)\"/>\r\n      </ng-container>\r\n    </div>\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/admin/import-export-manager/orders/import-orders/import-orders.module.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/orders/import-orders/import-orders.module.ts ***!
  \******************************************************************************************/
/*! exports provided: ImportOrdersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportOrdersPageModule", function() { return ImportOrdersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _import_orders_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./import-orders.page */ "./src/app/admin/import-export-manager/orders/import-orders/import-orders.page.ts");







var routes = [
    {
        path: '',
        component: _import_orders_page__WEBPACK_IMPORTED_MODULE_6__["ImportOrdersPage"]
    }
];
var ImportOrdersPageModule = /** @class */ (function () {
    function ImportOrdersPageModule() {
    }
    ImportOrdersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_import_orders_page__WEBPACK_IMPORTED_MODULE_6__["ImportOrdersPage"]]
        })
    ], ImportOrdersPageModule);
    return ImportOrdersPageModule;
}());



/***/ }),

/***/ "./src/app/admin/import-export-manager/orders/import-orders/import-orders.page.scss":
/*!******************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/orders/import-orders/import-orders.page.scss ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  width: 100%;\n  padding: 0;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 75vh;\n  border-right: 1px solid lightgray;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 86vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n#scroll {\n  overflow: hidden;\n  height: calc(100vh - 157px);\n  border-right: 1px solid lightgray;\n}\n\n#scroll:hover {\n  overflow-y: auto;\n}\n\n.sectionArea h2 {\n  text-align: center;\n}\n\nh2 {\n  margin-top: 0;\n  font-size: 24px;\n}\n\n#mainField {\n  margin: 0 4px 8px 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n#mainFieldSelect {\n  height: 34px;\n  margin: 0 4px 8px 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n#subField {\n  margin: 0 8px 16px 40px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.dropdown {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  gap: 4px;\n}\n\n.hide {\n  visibility: hidden;\n  max-height: 0;\n  opacity: 0;\n  -webkit-transition: max-height 0.5s linear;\n  transition: max-height 0.5s linear;\n}\n\n#fieldSelection {\n  margin: 0 4px 8px 8px;\n}\n\n.customSelect {\n  width: 70%;\n  border-color: #ccc;\n  border-radius: 12px;\n  height: 25px;\n}\n\nion-datetime {\n  --padding-top: 0px ;\n}\n\nli {\n  font-size: 14px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vaW1wb3J0LWV4cG9ydC1tYW5hZ2VyL29yZGVycy9pbXBvcnQtb3JkZXJzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcaW1wb3J0LWV4cG9ydC1tYW5hZ2VyXFxvcmRlcnNcXGltcG9ydC1vcmRlcnNcXGltcG9ydC1vcmRlcnMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9pbXBvcnQtZXhwb3J0LW1hbmFnZXIvb3JkZXJzL2ltcG9ydC1vcmRlcnMvaW1wb3J0LW9yZGVycy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsVUFBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsaUNBQUE7QUNDRjs7QURBRTtFQUNFLGdCQUFBO0FDRUo7O0FERUE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7QUNDRjs7QURBRTtFQUNFLGdCQUFBO0FDRUo7O0FERUE7RUFDRSxnQkFBQTtFQUNBLDJCQUFBO0VBRUEsaUNBQUE7QUNBRjs7QURDRTtFQUNFLGdCQUFBO0FDQ0o7O0FER0U7RUFDRSxrQkFBQTtBQ0FKOztBRElBO0VBQ0UsYUFBQTtFQUNBLGVBQUE7QUNERjs7QURJQTtFQUNFLHFCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7QUNERjs7QURJQTtFQUNFLFlBQUE7RUFDQSxxQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0FDREY7O0FESUE7RUFDRSx1QkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0FDREY7O0FESUE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsUUFBQTtBQ0RGOztBRElBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0EsVUFBQTtFQUNBLDBDQUFBO0VBQUEsa0NBQUE7QUNERjs7QURJQTtFQUNFLHFCQUFBO0FDREY7O0FESUE7RUFDRSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUNERjs7QURJQTtFQUNFLG1CQUFBO0FDREY7O0FESUE7RUFDRSxlQUFBO0FDREYiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9pbXBvcnQtZXhwb3J0LW1hbmFnZXIvb3JkZXJzL2ltcG9ydC1vcmRlcnMvaW1wb3J0LW9yZGVycy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbi1jb250YWluZXIge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHBhZGRpbmc6IDBcclxufVxyXG5cclxuI3Njcm9sbDEge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiA3NXZoO1xyXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICAmOmhvdmVyIHtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgfVxyXG59XHJcblxyXG4jc2Nyb2xsMiB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDg2dmg7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxufVxyXG5cclxuI3Njcm9sbCB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxNTdweCk7XHJcbiAgLy8gaGVpZ2h0OiAxMDB2aDtcclxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxufVxyXG4uc2VjdGlvbkFyZWF7XHJcbiAgaDIge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxufVxyXG5cclxuaDIge1xyXG4gIG1hcmdpbi10b3A6IDA7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG59XHJcblxyXG4jbWFpbkZpZWxkIHtcclxuICBtYXJnaW46IDAgNHB4IDhweCA4cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5cclxuI21haW5GaWVsZFNlbGVjdCB7XHJcbiAgaGVpZ2h0OiAzNHB4O1xyXG4gIG1hcmdpbjogMCA0cHggOHB4IDhweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcblxyXG4jc3ViRmllbGQge1xyXG4gIG1hcmdpbjogMCA4cHggMTZweCA0MHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuXHJcbi5kcm9wZG93biB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogNHB4O1xyXG59XHJcblxyXG4uaGlkZSB7XHJcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xyXG4gIG1heC1oZWlnaHQ6IDA7XHJcbiAgb3BhY2l0eTogMDtcclxuICB0cmFuc2l0aW9uOiBtYXgtaGVpZ2h0IDAuNXMgbGluZWFyO1xyXG59XHJcblxyXG4jZmllbGRTZWxlY3Rpb24ge1xyXG4gIG1hcmdpbjogMCA0cHggOHB4IDhweDtcclxufVxyXG5cclxuLmN1c3RvbVNlbGVjdCB7XHJcbiAgd2lkdGg6IDcwJTtcclxuICBib3JkZXItY29sb3I6ICNjY2M7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBoZWlnaHQ6IDI1cHg7XHJcbn1cclxuXHJcbmlvbi1kYXRldGltZSB7XHJcbiAgLS1wYWRkaW5nLXRvcDogMHB4XHJcbn1cclxuXHJcbmxpIHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbn0iLCIubWFpbi1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMDtcbn1cblxuI3Njcm9sbDEge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDc1dmg7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDg2dmg7XG59XG4jc2Nyb2xsMjpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbiNzY3JvbGwge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxNTdweCk7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cbiNzY3JvbGw6aG92ZXIge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG4uc2VjdGlvbkFyZWEgaDIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmgyIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgZm9udC1zaXplOiAyNHB4O1xufVxuXG4jbWFpbkZpZWxkIHtcbiAgbWFyZ2luOiAwIDRweCA4cHggOHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbiNtYWluRmllbGRTZWxlY3Qge1xuICBoZWlnaHQ6IDM0cHg7XG4gIG1hcmdpbjogMCA0cHggOHB4IDhweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4jc3ViRmllbGQge1xuICBtYXJnaW46IDAgOHB4IDE2cHggNDBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4uZHJvcGRvd24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDRweDtcbn1cblxuLmhpZGUge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIG1heC1oZWlnaHQ6IDA7XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246IG1heC1oZWlnaHQgMC41cyBsaW5lYXI7XG59XG5cbiNmaWVsZFNlbGVjdGlvbiB7XG4gIG1hcmdpbjogMCA0cHggOHB4IDhweDtcbn1cblxuLmN1c3RvbVNlbGVjdCB7XG4gIHdpZHRoOiA3MCU7XG4gIGJvcmRlci1jb2xvcjogI2NjYztcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgaGVpZ2h0OiAyNXB4O1xufVxuXG5pb24tZGF0ZXRpbWUge1xuICAtLXBhZGRpbmctdG9wOiAwcHggO1xufVxuXG5saSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/import-export-manager/orders/import-orders/import-orders.page.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/orders/import-orders/import-orders.page.ts ***!
  \****************************************************************************************/
/*! exports provided: ImportOrdersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportOrdersPage", function() { return ImportOrdersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var ngx_papaparse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-papaparse */ "./node_modules/ngx-papaparse/fesm5/ngx-papaparse.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/import-export-manager/import-export-manager.service */ "./src/app/services/import-export-manager/import-export-manager.service.ts");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");







var ImportOrdersPage = /** @class */ (function () {
    function ImportOrdersPage(toastController, papa, importExportManagerService, sharedService, afs) {
        this.toastController = toastController;
        this.papa = papa;
        this.importExportManagerService = importExportManagerService;
        this.sharedService = sharedService;
        this.afs = afs;
        this.isDisableDatePicker = true;
        this.buttonState = 'Upload';
        this.updateObj = [];
        this.orderLength = 0;
        this.supportedUpdateFields = ['deliveryPhoneNo'];
        this.allDeliveryAgents = [];
    }
    ImportOrdersPage.prototype.ngOnInit = function () { };
    ImportOrdersPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.importExportManagerService.getAllDeliveryAgents()];
                    case 1:
                        _a.allDeliveryAgents = _b.sent();
                        console.log('allDeliveryAgents', this.allDeliveryAgents);
                        return [2 /*return*/];
                }
            });
        });
    };
    ImportOrdersPage.prototype.presentToastWithOptions = function (header, message, errorCode) {
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
    ImportOrdersPage.prototype.saveDisable = function () { };
    ImportOrdersPage.prototype.checkValidCSV = function (event, jsonData) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var i;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!event.target.files[0].name.includes('.csv')) return [3 /*break*/, 4];
                        // console.log('jsonData :', jsonData)
                        for (i = 0; i < jsonData.length; i++) {
                            if (jsonData[i].includes('orderId')) {
                                // console.log('jsonData[i]:', jsonData[i])
                                this.headerIndex = i;
                            }
                        }
                        console.log('headerIndex :', this.headerIndex);
                        if (!(jsonData[this.headerIndex].includes('orderId') && jsonData[this.headerIndex].includes('deliveryPhoneNo'))) return [3 /*break*/, 1];
                        return [2 /*return*/, true];
                    case 1: return [4 /*yield*/, this.presentToastWithOptions('Invalid CSV Format!', 'The CSV is either missing the orderId or the deliveryPhoneNo column(s)!', 'ERR-191')];
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
    ImportOrdersPage.prototype.formatDeliveryPhoneNo = function (phoneNo) {
        var formattedStr = phoneNo.replace('[', '');
        formattedStr = formattedStr.replace(']', '');
        return formattedStr.trim();
    };
    ImportOrdersPage.prototype.importOrdersHandler = function (event, state) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var jsonData, csv, options, _loop_1, this_1, _i, _a, order;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                jsonData = [];
                if (state === 'Upload') {
                    csv = event.target.files[0];
                    console.log('csv : ', csv);
                    options = {
                        complete: function (result, file) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            var validity, orderIdIndex, deliveryPhoneNoIndex_1, _loop_2, this_2, i, count, _loop_3, this_3, _i, _a, order, state_1;
                            var _this = this;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        jsonData = result.data;
                                        return [4 /*yield*/, this.checkValidCSV(event, jsonData)];
                                    case 1:
                                        validity = _b.sent();
                                        console.log('validity : ', validity);
                                        if (!validity) return [3 /*break*/, 6];
                                        orderIdIndex = jsonData[this.headerIndex].findIndex(function (f) { return f === 'orderId'; });
                                        deliveryPhoneNoIndex_1 = jsonData[this.headerIndex].findIndex(function (f) { return f === 'deliveryPhoneNo'; });
                                        console.log('orderIdIndex :', orderIdIndex);
                                        console.log('deliveryPhoneNoIndex :', deliveryPhoneNoIndex_1);
                                        _loop_2 = function (i) {
                                            if (jsonData[i][orderIdIndex] && jsonData[i][deliveryPhoneNoIndex_1]) {
                                                // console.log(jsonData[i])
                                                this_2.updateObj.push({
                                                    orderId: jsonData[i][orderIdIndex],
                                                    value: this_2.supportedUpdateFields.map(function (s) { return ({ field: s, data: _this.formatDeliveryPhoneNo(jsonData[i][deliveryPhoneNoIndex_1]), agentId: '' }); })
                                                });
                                            }
                                        };
                                        this_2 = this;
                                        for (i = this.headerIndex + 1; i < jsonData.length; i++) {
                                            _loop_2(i);
                                        }
                                        console.log(this.updateObj);
                                        count = 0;
                                        if (!(this.updateObj && this.updateObj.length)) return [3 /*break*/, 5];
                                        _loop_3 = function (order) {
                                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!(order.value && order.value.length)) return [3 /*break*/, 3];
                                                        if (!this_3.allDeliveryAgents.some(function (a) { return a.phoneNo === order.value[0].data; })) return [3 /*break*/, 1];
                                                        console.log('all good');
                                                        count++;
                                                        return [3 /*break*/, 3];
                                                    case 1:
                                                        console.log('error');
                                                        return [4 /*yield*/, this_3.presentToastWithOptions('Invalid Delivery Agent Phone Number!', 'The provided delivery agent phone number does not exist!', 'ERR-192')];
                                                    case 2:
                                                        _a.sent();
                                                        this_3.updateObj = [];
                                                        return [2 /*return*/, { value: void 0 }];
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        };
                                        this_3 = this;
                                        _i = 0, _a = this.updateObj;
                                        _b.label = 2;
                                    case 2:
                                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                                        order = _a[_i];
                                        return [5 /*yield**/, _loop_3(order)];
                                    case 3:
                                        state_1 = _b.sent();
                                        if (typeof state_1 === "object")
                                            return [2 /*return*/, state_1.value];
                                        _b.label = 4;
                                    case 4:
                                        _i++;
                                        return [3 /*break*/, 2];
                                    case 5:
                                        if (count == this.updateObj.length) {
                                            this.buttonState = 'Import';
                                        }
                                        _b.label = 6;
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); }
                    };
                    this.papa.parse(csv, options);
                }
                if (state === 'Import') {
                    console.log('Importing...');
                    if (this.updateObj && this.updateObj.length) {
                        _loop_1 = function (order) {
                            var agent = this_1.allDeliveryAgents.find(function (s) { return s.phoneNo === order.value[0].data; });
                            this_1.importExportManagerService.updateOrder(parseInt(order.orderId), agent.id);
                        };
                        this_1 = this;
                        for (_i = 0, _a = this.updateObj; _i < _a.length; _i++) {
                            order = _a[_i];
                            _loop_1(order);
                        }
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    ImportOrdersPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
        { type: ngx_papaparse__WEBPACK_IMPORTED_MODULE_3__["Papa"] },
        { type: src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_5__["ImportExportManagerService"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] },
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__["AngularFirestore"] }
    ]; };
    ImportOrdersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-import-orders',
            template: __webpack_require__(/*! raw-loader!./import-orders.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/orders/import-orders/import-orders.page.html"),
            styles: [__webpack_require__(/*! ./import-orders.page.scss */ "./src/app/admin/import-export-manager/orders/import-orders/import-orders.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            ngx_papaparse__WEBPACK_IMPORTED_MODULE_3__["Papa"],
            src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_5__["ImportExportManagerService"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__["AngularFirestore"]])
    ], ImportOrdersPage);
    return ImportOrdersPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-import-export-manager-orders-import-orders-import-orders-module-es5.js.map