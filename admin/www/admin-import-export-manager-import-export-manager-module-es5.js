(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-import-export-manager-import-export-manager-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/import-export-manager.page.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/import-export-manager/import-export-manager.page.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">Import / Export Management</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <button class=\"accordion\">\r\n          <div class=\"flexTitle\">\r\n            <h2>Product</h2>\r\n            <!-- <hr> -->\r\n            <div style=\"display: flex;\r\n            justify-content: space-between;\r\n            align-items: center;\">\r\n              <ion-button shape=\"round\" style=\"padding-right: 14px;\">\r\n                <a href=\"../../../assets/files/sample-csv-format.csv\" download>Download CSV Format</a>\r\n              </ion-button>\r\n              <i class=\"flaticon-download\" [ngClass]=\"isProductAccordion == true ? 'arrowDown' : 'arrowActive'\" (click)=\"toggleAccordion('product')\"></i>\r\n            </div>\r\n          </div>\r\n        </button>\r\n        <div class=\"panel\" [ngClass]=\"isProductAccordion == true ? 'active' : ''\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"flexStart\">\r\n                  <ion-button shape=\"round\" fill=\"outline\" (click)=\"openProductCSVCreator('import products')\">Import Products</ion-button>\r\n                  <ion-button shape=\"round\" fill=\"outline\" (click)=\"openProductCSVCreator('export products')\">Export Products</ion-button>\r\n                  <ion-button shape=\"round\" fill=\"outline\" (click)=\"openProductCSVCreator('import products images')\">Import Bulk Images</ion-button>\r\n                  <ion-button shape=\"round\" fill=\"outline\" (click)=\"openProductCSVCreator('delete bulk product(s)')\">Delete Bulk Product(s)</ion-button>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-row>\r\n\r\n      <ion-row>\r\n        <button class=\"accordion\">\r\n          <div class=\"flexTitle\">\r\n            <h2>Orders</h2>\r\n            <!-- <hr> -->\r\n            <div style=\"display: flex;\r\n            justify-content: space-between;\r\n            align-items: center;\">\r\n              <!-- <ion-button shape=\"round\" style=\"padding-right: 14px;\">\r\n                <a href=\"../../../assets/files/sample-csv-format.csv\" download>Download CSV Format</a>\r\n              </ion-button> -->\r\n              <i class=\"flaticon-download\" [ngClass]=\"isOrdersAccordion == true ? 'arrowDown' : 'arrowActive'\" (click)=\"toggleAccordion('orders')\"></i>\r\n            </div>\r\n          </div>\r\n        </button>\r\n        <div class=\"panel\" [ngClass]=\"isOrdersAccordion == true ? 'active' : ''\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"flexStart\">\r\n                  <ion-button shape=\"round\" fill=\"outline\" (click)=\"openOrdersImportExport('export orders')\">Export Orders</ion-button>\r\n                  <ion-button shape=\"round\" fill=\"outline\" (click)=\"openOrdersImportExport('import orders')\">Import Orders</ion-button>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-row>\r\n\r\n      <ion-row>\r\n        <button class=\"accordion\">\r\n          <div class=\"flexTitle\">\r\n            <h2>Users</h2>\r\n            <!-- <hr> -->\r\n            <div style=\"display: flex;\r\n            justify-content: space-between;\r\n            align-items: center;\">\r\n              <!-- <ion-button shape=\"round\" style=\"padding-right: 14px;\">\r\n                <a href=\"../../../assets/files/sample-csv-format.csv\" download>Download CSV Format</a>\r\n              </ion-button> -->\r\n              <i class=\"flaticon-download\" [ngClass]=\"isUsersAccordion == true ? 'arrowDown' : 'arrowActive'\" (click)=\"toggleAccordion('users')\"></i>\r\n            </div>\r\n          </div>\r\n        </button>\r\n        <div class=\"panel\" [ngClass]=\"isUsersAccordion == true ? 'active' : ''\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"flexStart\">\r\n                  <ion-button shape=\"round\" fill=\"outline\" (click)=\"openUsersImportExport('export users')\">Export Users</ion-button>\r\n                  <ion-button shape=\"round\" fill=\"outline\" (click)=\"openUsersImportExport('import users')\">Import Users</ion-button>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/import-export-manager/import-export-manager.module.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/import-export-manager.module.ts ***!
  \*****************************************************************************/
/*! exports provided: ImportExportManagerPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportExportManagerPageModule", function() { return ImportExportManagerPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _import_export_manager_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./import-export-manager.page */ "./src/app/admin/import-export-manager/import-export-manager.page.ts");







var routes = [
    {
        path: '',
        component: _import_export_manager_page__WEBPACK_IMPORTED_MODULE_6__["ImportExportManagerPage"]
    }
];
var ImportExportManagerPageModule = /** @class */ (function () {
    function ImportExportManagerPageModule() {
    }
    ImportExportManagerPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_import_export_manager_page__WEBPACK_IMPORTED_MODULE_6__["ImportExportManagerPage"]]
        })
    ], ImportExportManagerPageModule);
    return ImportExportManagerPageModule;
}());



/***/ }),

/***/ "./src/app/admin/import-export-manager/import-export-manager.page.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/import-export-manager.page.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  width: 100%;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 75vh;\n  border-right: 1px solid lightgray;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 86vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n.flexTitle {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  padding: 0 8px;\n}\n\n.flexTitle h2 {\n  margin-top: 0.5rem;\n}\n\n.flexTitle a, .flexTitle a:hover, .flexTitle a:focus, .flexTitle a:active {\n  text-decoration: none;\n  color: inherit;\n}\n\n.flexStart {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n          align-items: center;\n  gap: 1.5rem;\n}\n\n.arrowDown,\n.arrowActive {\n  font-size: 14px !important;\n}\n\n.arrowActive {\n  -webkit-transform: rotate(-90deg);\n          transform: rotate(-90deg);\n}\n\n.accordion {\n  background-color: #eee;\n  cursor: pointer;\n  width: 100%;\n  border: none;\n  text-align: left;\n  outline: none;\n  font-size: 15px;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\n.active,\n.accordion:hover {\n  background-color: #ccc;\n}\n\n.panel {\n  background-color: white;\n  max-height: 0;\n  overflow: hidden;\n  visibility: hidden;\n  -webkit-transition: max-height 0.2s ease-out;\n  transition: max-height 0.2s ease-out;\n}\n\n.active {\n  max-height: 200px;\n  visibility: visible;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vaW1wb3J0LWV4cG9ydC1tYW5hZ2VyL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcaW1wb3J0LWV4cG9ydC1tYW5hZ2VyXFxpbXBvcnQtZXhwb3J0LW1hbmFnZXIucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9pbXBvcnQtZXhwb3J0LW1hbmFnZXIvaW1wb3J0LWV4cG9ydC1tYW5hZ2VyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLFdBQUE7QUNERjs7QURJQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGlDQUFBO0FDREY7O0FERUU7RUFDRSxnQkFBQTtBQ0FKOztBRElBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0FDREY7O0FERUU7RUFDRSxnQkFBQTtBQ0FKOztBRElBO0VBR0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxjQUFBO0FDSEY7O0FESUU7RUFDRSxrQkFBQTtBQ0ZKOztBRFFFO0VBQ0UscUJBQUE7RUFDQSxjQUFBO0FDTko7O0FEVUE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx1QkFBQTtVQUFBLDJCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLFdBQUE7QUNQRjs7QURVQTs7RUFFRSwwQkFBQTtBQ1BGOztBRFNBO0VBQ0UsaUNBQUE7VUFBQSx5QkFBQTtBQ05GOztBRFNBO0VBQ0Usc0JBQUE7RUFFQSxlQUFBO0VBRUEsV0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0VBQ0Esd0JBQUE7RUFBQSxnQkFBQTtBQ1JGOztBRFdBOztFQUVFLHNCQUFBO0FDUkY7O0FEV0E7RUFFRSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsNENBQUE7RUFBQSxvQ0FBQTtBQ1RGOztBRFdBO0VBRUUsaUJBQUE7RUFDQSxtQkFBQTtBQ1RGIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vaW1wb3J0LWV4cG9ydC1tYW5hZ2VyL2ltcG9ydC1leHBvcnQtbWFuYWdlci5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkbGlnaHRHcmV5OiAjMzQzNDM0O1xyXG5cclxuLm1haW4tY29udGFpbmVyIHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuI3Njcm9sbDEge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiA3NXZoO1xyXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICAmOmhvdmVyIHtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgfVxyXG59XHJcblxyXG4jc2Nyb2xsMiB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDg2dmg7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxufVxyXG5cclxuLmZsZXhUaXRsZSB7XHJcbiAgLy8gICBAZXh0ZW5kIC5mbGV4U3RhcnQ7XHJcbiAgLy8gICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogMCA4cHg7XHJcbiAgaDIge1xyXG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xyXG4gIH1cclxuICAvLyAgIGhyIHtcclxuICAvLyAgICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgLy8gICAgIHdpZHRoOiAxMDAlO1xyXG4gIC8vICAgfVxyXG4gIGEsIGE6aG92ZXIsIGE6Zm9jdXMsIGE6YWN0aXZlIHtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGNvbG9yOiBpbmhlcml0O1xyXG59XHJcbn1cclxuXHJcbi5mbGV4U3RhcnQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAxLjVyZW07XHJcbn1cclxuXHJcbi5hcnJvd0Rvd24sXHJcbi5hcnJvd0FjdGl2ZSB7XHJcbiAgZm9udC1zaXplOiAxNHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuLmFycm93QWN0aXZlIHtcclxuICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xyXG59XHJcblxyXG4uYWNjb3JkaW9uIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xyXG4gIC8vICAgY29sb3I6ICM0NDQ7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIC8vICAgcGFkZGluZzogMThweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxuICBvdXRsaW5lOiBub25lO1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxuICB0cmFuc2l0aW9uOiAwLjRzO1xyXG59XHJcblxyXG4uYWN0aXZlLFxyXG4uYWNjb3JkaW9uOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xyXG59XHJcblxyXG4ucGFuZWwge1xyXG4gIC8vICAgcGFkZGluZzogMCAxOHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gIG1heC1oZWlnaHQ6IDA7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB2aXNpYmlsaXR5OiBoaWRkZW47XHJcbiAgdHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjJzIGVhc2Utb3V0O1xyXG59XHJcbi5hY3RpdmUge1xyXG4gIC8vICAgZGlzcGxheTogYmxvY2s7XHJcbiAgbWF4LWhlaWdodDogMjAwcHg7XHJcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcclxufVxyXG4iLCIubWFpbi1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbn1cblxuI3Njcm9sbDEge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDc1dmg7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDg2dmg7XG59XG4jc2Nyb2xsMjpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5mbGV4VGl0bGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDAgOHB4O1xufVxuLmZsZXhUaXRsZSBoMiB7XG4gIG1hcmdpbi10b3A6IDAuNXJlbTtcbn1cbi5mbGV4VGl0bGUgYSwgLmZsZXhUaXRsZSBhOmhvdmVyLCAuZmxleFRpdGxlIGE6Zm9jdXMsIC5mbGV4VGl0bGUgYTphY3RpdmUge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGNvbG9yOiBpbmhlcml0O1xufVxuXG4uZmxleFN0YXJ0IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEuNXJlbTtcbn1cblxuLmFycm93RG93bixcbi5hcnJvd0FjdGl2ZSB7XG4gIGZvbnQtc2l6ZTogMTRweCAhaW1wb3J0YW50O1xufVxuXG4uYXJyb3dBY3RpdmUge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xufVxuXG4uYWNjb3JkaW9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiBub25lO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBvdXRsaW5lOiBub25lO1xuICBmb250LXNpemU6IDE1cHg7XG4gIHRyYW5zaXRpb246IDAuNHM7XG59XG5cbi5hY3RpdmUsXG4uYWNjb3JkaW9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcbn1cblxuLnBhbmVsIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIG1heC1oZWlnaHQ6IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgdHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjJzIGVhc2Utb3V0O1xufVxuXG4uYWN0aXZlIHtcbiAgbWF4LWhlaWdodDogMjAwcHg7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/import-export-manager/import-export-manager.page.ts":
/*!***************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/import-export-manager.page.ts ***!
  \***************************************************************************/
/*! exports provided: ImportExportManagerPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportExportManagerPage", function() { return ImportExportManagerPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");




var ImportExportManagerPage = /** @class */ (function () {
    function ImportExportManagerPage(router, sharedService) {
        this.router = router;
        this.sharedService = sharedService;
        this.isProductAccordion = true;
        this.isOrdersAccordion = true;
        this.isUsersAccordion = true;
    }
    ImportExportManagerPage.prototype.ngOnInit = function () {
    };
    ImportExportManagerPage.prototype.downloadSampleCSV = function () {
    };
    ImportExportManagerPage.prototype.toggleAccordion = function (status) {
        if (status == "product") {
            this.isProductAccordion = !this.isProductAccordion;
        }
        if (status == "orders") {
            this.isOrdersAccordion = !this.isOrdersAccordion;
        }
        if (status == "users") {
            this.isUsersAccordion = !this.isUsersAccordion;
        }
    };
    ImportExportManagerPage.prototype.openProductCSVCreator = function (status) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var navigationExtras;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                navigationExtras = {
                    queryParams: {
                        type: status,
                    }
                };
                if (status === "export products") {
                    this.router.navigate(['product-csv-creator'], navigationExtras);
                }
                if (status === "import products") {
                    this.router.navigate(['product-csv-importer'], navigationExtras);
                }
                if (status === "import products images") {
                    this.router.navigate(['product-image-importer'], navigationExtras);
                }
                if (status === "delete bulk product(s)") {
                    this.router.navigate(['bulk-product-delete'], navigationExtras);
                }
                return [2 /*return*/];
            });
        });
    };
    ImportExportManagerPage.prototype.openOrdersImportExport = function (status) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var navigationExtras;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                navigationExtras = {
                    queryParams: {
                        type: status,
                    }
                };
                if (status === "export orders") {
                    this.router.navigate(['export-orders'], navigationExtras);
                }
                if (status === "import orders") {
                    this.router.navigate(['import-orders'], navigationExtras);
                }
                return [2 /*return*/];
            });
        });
    };
    ImportExportManagerPage.prototype.openUsersImportExport = function (status) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var navigationExtras;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                navigationExtras = {
                    queryParams: {
                        type: status,
                    }
                };
                if (status === "export users") {
                    this.router.navigate(['export-users'], navigationExtras);
                }
                if (status === "import users") {
                    this.router.navigate(['import-users'], navigationExtras);
                }
                return [2 /*return*/];
            });
        });
    };
    ImportExportManagerPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"] }
    ]; };
    ImportExportManagerPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-import-export-manager',
            template: __webpack_require__(/*! raw-loader!./import-export-manager.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/import-export-manager.page.html"),
            styles: [__webpack_require__(/*! ./import-export-manager.page.scss */ "./src/app/admin/import-export-manager/import-export-manager.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"]])
    ], ImportExportManagerPage);
    return ImportExportManagerPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-import-export-manager-import-export-manager-module-es5.js.map