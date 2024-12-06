(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-import-export-manager-orders-export-orders-export-orders-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/orders/export-orders/export-orders.page.html":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/import-export-manager/orders/export-orders/export-orders.page.html ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons style=\"margin-left: -8px;\" slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-menu-button style=\"margin-left: 8px;\" slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Export Orders</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n\r\n        <ion-col id=\"scroll\" size=\"6\">\r\n          <div class=\"sectionArea\">\r\n            <h2>Configure Export Scheme</h2>\r\n            <div>\r\n              <!-- <ion-card>\r\n                <ion-card-header style=\"display: flex; justify-content: center; padding-bottom: 8px;\">\r\n                  <ion-card-title style=\"font-size: 20px; display: block;\">Filters</ion-card-title>\r\n                </ion-card-header>\r\n                <ion-card-header style=\"display: flex; justify-content: center; padding-top: 0;\">\r\n                  <ion-card-subtitle style=\"display: block;\">Select Only 1 filter at once</ion-card-subtitle>\r\n                </ion-card-header>\r\n                <ion-card-content>\r\n                  <ion-card-title style=\"padding-bottom: 8px;\">Region</ion-card-title>\r\n                  <select class=\"customSelect\"></select>\r\n                </ion-card-content>\r\n                <ion-card-content style=\"padding-top: 0;\">\r\n                  <ion-card-title style=\"padding-bottom: 8px;\">Group</ion-card-title>\r\n                  <select class=\"customSelect\"></select>\r\n                </ion-card-content>\r\n                <ion-card-content style=\"padding-bottom: 16p; padding-top: 0;\">\r\n                  <ion-card-title style=\"padding-bottom: 8px;\">Pincode</ion-card-title>\r\n                  <select class=\"customSelect\"></select>\r\n                </ion-card-content>\r\n              </ion-card> -->\r\n\r\n              <!-- *** NEW FILTERS -->\r\n              <ion-card style=\"border-radius: 12px; background-color: #ddd;\">\r\n                <ion-card-header style=\"display: flex; justify-content: center; padding-bottom: 8px;\">\r\n                  <ion-card-title style=\"font-size: 20px; display: block;\">Filters</ion-card-title>\r\n                </ion-card-header>\r\n                <ion-card-header style=\"display: flex; justify-content: center; padding-top: 0;\">\r\n                  <ion-card-subtitle style=\"display: block;\">Select preferred order status</ion-card-subtitle>\r\n                </ion-card-header>\r\n                <ion-card-content>\r\n                  <ion-card-title style=\"padding-bottom: 8px;\">Include Archived Orders</ion-card-title>\r\n                  <div class=\"toggle-btn\">\r\n                    <label class=\"switch\">\r\n                      <input type=\"checkbox\"\r\n                      (click)=\"disableArchiveState()\"\r\n                      checked>\r\n                      <span class=\"slider round\"></span>\r\n                    </label>\r\n                  </div>\r\n                  <ion-card-title style=\"padding-bottom: 8px;\">Status</ion-card-title>\r\n                  <div style=\"display: flex; justify-content: space-between;\"> \r\n                    <select class=\"customSelect\" style=\"width: 100%;\" (change)=\"setOrderStatus($event.target.value)\">\r\n                      <option value=\"Confirmed\" selected>Confirmed</option>\r\n                      <option value=\"Pending\">Pending</option>\r\n                      <option value=\"Dispatched\">Dispatched</option>\r\n                      <option value=\"Delivered\">Delivered</option>\r\n                      <option value=\"Cancelled\">Cancelled</option>\r\n                      <option value=\"Rejected\">Rejected</option>\r\n                      <option value=\"Returned\">Returned</option>\r\n                      <option value=\"Payment Pending\">Payment pending</option>\r\n                    </select>\r\n                    <!-- <ion-button mode=\"ios\" shape=\"round\" style=\"margin-left: 18px; height: 25px; margin-bottom: 12px;\">Apply</ion-button> -->\r\n                  </div>\r\n                </ion-card-content>\r\n              </ion-card>\r\n\r\n              <ion-card style=\"border-radius: 12px; background-color: #ddd;\">\r\n                <ion-card-header style=\"display: grid; justify-content: center; padding-bottom: 8px; width: 100%; grid-template-columns: 1fr max-content;\">\r\n                  <ion-card-title style=\"font-size: 20px; display: block; text-align: center; margin-left: 51px;\">Date Range</ion-card-title>\r\n                  <div class=\"toggle-btn\">\r\n                    <label class=\"switch\">\r\n                      <input type=\"checkbox\"\r\n                      (click)=\"disableDatePicker()\">\r\n                      <span class=\"slider round\"></span>\r\n                    </label>\r\n                  </div>\r\n                </ion-card-header>\r\n                <ion-card-header style=\"display: flex; justify-content: center; padding-top: 0;\">\r\n                  <ion-card-subtitle style=\"display: block;\">Select preferred preset / date range</ion-card-subtitle>\r\n                </ion-card-header>\r\n                <div class=\"date-picker\" (mouseover)=\"alertDatePicker()\">\r\n                  <div class=\"disable-date\" *ngIf=\"isDisableDatePicker\"></div>\r\n                  <ion-card-content>\r\n                  <ion-card-title style=\"padding-bottom: 8px;\">Select date preset</ion-card-title>\r\n                  <select class=\"customSelect\" style=\"width: 100%;\" (change)=\"setDateRange('preset', $event.target.value)\">\r\n                    <option value=0 selected>No Preset</option>\r\n                    <option value=7>Last 7 days</option>\r\n                    <option value=30>Last 30 days</option>\r\n                  </select>\r\n                  </ion-card-content>\r\n                  <p style=\"margin-left: 50%;\">Or</p>\r\n                  <ion-card-content>\r\n                  <ion-card-title style=\"padding-bottom: 8px;\">Select date range</ion-card-title>\r\n                  <ion-item style=\"border-radius: 12px;\">\r\n                    <ion-label>Start date</ion-label>\r\n                    <!-- <ion-datetime mode=\"ios\"\r\n                      displayFormat=\"DD-MM-YYYY\"\r\n                    ></ion-datetime> -->\r\n                    <input type=\"date\" style=\"width: 80%;\" [(ngModel)]=\"dateObj.startDate\" [disabled]=\"disableDatePickerRange\" (change)=\"filterDate('start')\">\r\n                  </ion-item>\r\n                  <ion-item style=\"margin-top: 12px; border-radius: 12px;\">\r\n                    <ion-label>End date</ion-label>\r\n                    <!-- <ion-datetime mode=\"ios\"\r\n                      displayFormat=\"DD-MM-YYYY\"\r\n                    ></ion-datetime> -->\r\n                    <input type=\"date\" style=\"width: 80%;\" [(ngModel)]=\"dateObj.endDate\" [disabled]=\"disableDatePickerRange\" (change)=\"filterDate('end')\">\r\n                  </ion-item>\r\n                  </ion-card-content>\r\n                </div>\r\n              </ion-card>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col size=\"6\">\r\n          <div class=\"sectionArea\">\r\n            <h2>Instructions</h2>\r\n          </div>\r\n          <div style=\"margin-top: 10px;\">\r\n            <ol>\r\n              <li>Select the desired order status for export.</li>\r\n              <li>You can also select the the date range by turning on the toggle for specific range of orders w.r.t date and/or date presets.</li>\r\n              <li>Click on Export Orders for exporting the filtered orders.</li>\r\n            </ol>\r\n          </div>\r\n        </ion-col>\r\n        \r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>\r\n\r\n<ion-footer no-border class=\"page-footer\" style=\"border-top: 1px solid #ccc;\">\r\n  <div class=\"main-container\" style=\"display: flex; align-content: center; justify-content: space-between; align-items: center;\">\r\n    <p style=\"font-size: 16px; font-weight: bold;\">Total Orders : {{totalOrders}}</p>\r\n    <p style=\"font-size: 16px; font-weight: bold;\">Filtered Orders : {{allOrders.length}} - {{currentOrderStatus || 'Confirmed'}}</p>\r\n    <ion-button (click)=\"exportAllOrders()\" [disabled]=\"saveDisable()\" shape=\"round\" class=\"btn-1 i-start\" color=\"warning\"><i class=\"flaticon-null-17 margin-icon\"></i>Export All Orders</ion-button>\r\n    <ion-button (click)=\"exportOrdersHandler()\" [disabled]=\"saveDisable()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Export Orders\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/admin/import-export-manager/orders/export-orders/export-orders.module.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/orders/export-orders/export-orders.module.ts ***!
  \******************************************************************************************/
/*! exports provided: ExportOrdersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExportOrdersPageModule", function() { return ExportOrdersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _export_orders_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./export-orders.page */ "./src/app/admin/import-export-manager/orders/export-orders/export-orders.page.ts");







const routes = [
    {
        path: '',
        component: _export_orders_page__WEBPACK_IMPORTED_MODULE_6__["ExportOrdersPage"]
    }
];
let ExportOrdersPageModule = class ExportOrdersPageModule {
};
ExportOrdersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_export_orders_page__WEBPACK_IMPORTED_MODULE_6__["ExportOrdersPage"]]
    })
], ExportOrdersPageModule);



/***/ }),

/***/ "./src/app/admin/import-export-manager/orders/export-orders/export-orders.page.scss":
/*!******************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/orders/export-orders/export-orders.page.scss ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  width: 100%;\n  padding: 0;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 75vh;\n  border-right: 1px solid lightgray;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 86vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n#scroll {\n  overflow: hidden;\n  height: calc(100vh - 157px);\n  border-right: 1px solid lightgray;\n}\n\n#scroll:hover {\n  overflow-y: auto;\n}\n\n.sectionArea h2 {\n  text-align: center;\n}\n\nh2 {\n  margin-top: 0;\n  font-size: 24px;\n}\n\n#mainField {\n  margin: 0 4px 8px 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n#mainFieldSelect {\n  height: 34px;\n  margin: 0 4px 8px 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n#subField {\n  margin: 0 8px 16px 40px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.dropdown {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  gap: 4px;\n}\n\n.hide {\n  visibility: hidden;\n  max-height: 0;\n  opacity: 0;\n  -webkit-transition: max-height 0.5s linear;\n  transition: max-height 0.5s linear;\n}\n\n#fieldSelection {\n  margin: 0 4px 8px 8px;\n}\n\n.customSelect {\n  width: 70%;\n  border-color: #ccc;\n  border-radius: 12px;\n  height: 25px;\n}\n\nion-datetime {\n  --padding-top: 0px ;\n}\n\n.date-picker {\n  position: relative;\n}\n\n.disable-date {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  border-top-left-radius: 12px;\n  border-top-right-radius: 12px;\n  height: 100%;\n  width: 100%;\n  background: black;\n  opacity: 0.2;\n  cursor: not-allowed;\n  z-index: 999;\n  -webkit-animation: fade-in 0.3s;\n          animation: fade-in 0.3s;\n}\n\n@-webkit-keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0.2;\n  }\n}\n\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0.2;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vaW1wb3J0LWV4cG9ydC1tYW5hZ2VyL29yZGVycy9leHBvcnQtb3JkZXJzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcaW1wb3J0LWV4cG9ydC1tYW5hZ2VyXFxvcmRlcnNcXGV4cG9ydC1vcmRlcnNcXGV4cG9ydC1vcmRlcnMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9pbXBvcnQtZXhwb3J0LW1hbmFnZXIvb3JkZXJzL2V4cG9ydC1vcmRlcnMvZXhwb3J0LW9yZGVycy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsVUFBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsaUNBQUE7QUNDRjs7QURBRTtFQUNFLGdCQUFBO0FDRUo7O0FERUE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7QUNDRjs7QURBRTtFQUNFLGdCQUFBO0FDRUo7O0FERUE7RUFDRSxnQkFBQTtFQUNBLDJCQUFBO0VBRUEsaUNBQUE7QUNBRjs7QURDRTtFQUNFLGdCQUFBO0FDQ0o7O0FER0U7RUFDRSxrQkFBQTtBQ0FKOztBRElBO0VBQ0UsYUFBQTtFQUNBLGVBQUE7QUNERjs7QURJQTtFQUNFLHFCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7QUNERjs7QURJQTtFQUNFLFlBQUE7RUFDQSxxQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0FDREY7O0FESUE7RUFDRSx1QkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0FDREY7O0FESUE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsUUFBQTtBQ0RGOztBRElBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0EsVUFBQTtFQUNBLDBDQUFBO0VBQUEsa0NBQUE7QUNERjs7QURJQTtFQUNFLHFCQUFBO0FDREY7O0FESUE7RUFDRSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUNERjs7QURJQTtFQUNFLG1CQUFBO0FDREY7O0FER0E7RUFDRSxrQkFBQTtBQ0FGOztBREVBO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLHdDQUFBO1VBQUEsZ0NBQUE7RUFDQSw0QkFBQTtFQUNBLDZCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSwrQkFBQTtVQUFBLHVCQUFBO0FDQ0Y7O0FERUE7RUFDRTtJQUFLLFVBQUE7RUNFTDtFRERBO0lBQU8sWUFBQTtFQ0lQO0FBQ0Y7O0FEUEE7RUFDRTtJQUFLLFVBQUE7RUNFTDtFRERBO0lBQU8sWUFBQTtFQ0lQO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9pbXBvcnQtZXhwb3J0LW1hbmFnZXIvb3JkZXJzL2V4cG9ydC1vcmRlcnMvZXhwb3J0LW9yZGVycy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbi1jb250YWluZXIge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHBhZGRpbmc6IDBcclxufVxyXG5cclxuI3Njcm9sbDEge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiA3NXZoO1xyXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICAmOmhvdmVyIHtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgfVxyXG59XHJcblxyXG4jc2Nyb2xsMiB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDg2dmg7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxufVxyXG5cclxuI3Njcm9sbCB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxNTdweCk7XHJcbiAgLy8gaGVpZ2h0OiAxMDB2aDtcclxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxufVxyXG4uc2VjdGlvbkFyZWF7XHJcbiAgaDIge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxufVxyXG5cclxuaDIge1xyXG4gIG1hcmdpbi10b3A6IDA7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG59XHJcblxyXG4jbWFpbkZpZWxkIHtcclxuICBtYXJnaW46IDAgNHB4IDhweCA4cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5cclxuI21haW5GaWVsZFNlbGVjdCB7XHJcbiAgaGVpZ2h0OiAzNHB4O1xyXG4gIG1hcmdpbjogMCA0cHggOHB4IDhweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcblxyXG4jc3ViRmllbGQge1xyXG4gIG1hcmdpbjogMCA4cHggMTZweCA0MHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuXHJcbi5kcm9wZG93biB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogNHB4O1xyXG59XHJcblxyXG4uaGlkZSB7XHJcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xyXG4gIG1heC1oZWlnaHQ6IDA7XHJcbiAgb3BhY2l0eTogMDtcclxuICB0cmFuc2l0aW9uOiBtYXgtaGVpZ2h0IDAuNXMgbGluZWFyO1xyXG59XHJcblxyXG4jZmllbGRTZWxlY3Rpb24ge1xyXG4gIG1hcmdpbjogMCA0cHggOHB4IDhweDtcclxufVxyXG5cclxuLmN1c3RvbVNlbGVjdCB7XHJcbiAgd2lkdGg6IDcwJTtcclxuICBib3JkZXItY29sb3I6ICNjY2M7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBoZWlnaHQ6IDI1cHg7XHJcbn1cclxuXHJcbmlvbi1kYXRldGltZSB7XHJcbiAgLS1wYWRkaW5nLXRvcDogMHB4XHJcbn1cclxuLmRhdGUtcGlja2Vye1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG4uZGlzYWJsZS1kYXRle1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6NTAlO1xyXG4gIGxlZnQ6IDUwJTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMnB4O1xyXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMnB4O1xyXG4gIGhlaWdodDogMTAwJTtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kOiBibGFjaztcclxuICBvcGFjaXR5OiAwLjI7XHJcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcclxuICB6LWluZGV4OiA5OTk7XHJcbiAgYW5pbWF0aW9uOiBmYWRlLWluIDAuM3M7XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgZmFkZS1pbiB7XHJcbiAgMCUgeyBvcGFjaXR5OiAwOyB9O1xyXG4gIDEwMCUgeyBvcGFjaXR5OiAwLjI7IH1cclxufSIsIi5tYWluLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAwO1xufVxuXG4jc2Nyb2xsMSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogNzV2aDtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgbGlnaHRncmF5O1xufVxuI3Njcm9sbDE6aG92ZXIge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG4jc2Nyb2xsMiB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogODZ2aDtcbn1cbiNzY3JvbGwyOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbCB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDE1N3B4KTtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgbGlnaHRncmF5O1xufVxuI3Njcm9sbDpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5zZWN0aW9uQXJlYSBoMiB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuaDIge1xuICBtYXJnaW4tdG9wOiAwO1xuICBmb250LXNpemU6IDI0cHg7XG59XG5cbiNtYWluRmllbGQge1xuICBtYXJnaW46IDAgNHB4IDhweCA4cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cblxuI21haW5GaWVsZFNlbGVjdCB7XG4gIGhlaWdodDogMzRweDtcbiAgbWFyZ2luOiAwIDRweCA4cHggOHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbiNzdWJGaWVsZCB7XG4gIG1hcmdpbjogMCA4cHggMTZweCA0MHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5kcm9wZG93biB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNHB4O1xufVxuXG4uaGlkZSB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgbWF4LWhlaWdodDogMDtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjVzIGxpbmVhcjtcbn1cblxuI2ZpZWxkU2VsZWN0aW9uIHtcbiAgbWFyZ2luOiAwIDRweCA4cHggOHB4O1xufVxuXG4uY3VzdG9tU2VsZWN0IHtcbiAgd2lkdGg6IDcwJTtcbiAgYm9yZGVyLWNvbG9yOiAjY2NjO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBoZWlnaHQ6IDI1cHg7XG59XG5cbmlvbi1kYXRldGltZSB7XG4gIC0tcGFkZGluZy10b3A6IDBweCA7XG59XG5cbi5kYXRlLXBpY2tlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmRpc2FibGUtZGF0ZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDEycHg7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMnB4O1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgb3BhY2l0eTogMC4yO1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICB6LWluZGV4OiA5OTk7XG4gIGFuaW1hdGlvbjogZmFkZS1pbiAwLjNzO1xufVxuXG5Aa2V5ZnJhbWVzIGZhZGUtaW4ge1xuICAwJSB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAwLjI7XG4gIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/import-export-manager/orders/export-orders/export-orders.page.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/orders/export-orders/export-orders.page.ts ***!
  \****************************************************************************************/
/*! exports provided: ExportOrdersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExportOrdersPage", function() { return ExportOrdersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/import-export-manager/import-export-manager.service */ "./src/app/services/import-export-manager/import-export-manager.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var src_app_services_pickUp_pick_up_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/pickUp/pick-up.service */ "./src/app/services/pickUp/pick-up.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");









let ExportOrdersPage = class ExportOrdersPage {
    constructor(importExportManagerService, sharedService, userService, pickup, toastController, loadingController) {
        this.importExportManagerService = importExportManagerService;
        this.sharedService = sharedService;
        this.userService = userService;
        this.pickup = pickup;
        this.toastController = toastController;
        this.loadingController = loadingController;
        this.archiveOrderState = true;
        this.isDisableDatePicker = true;
        this.allOrders = [];
        this.filteredOrders = [];
        this.currentOrderStatus = 'Confirmed';
        this.disableDatePickerRange = false;
        this.startOrders = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        this.endOrders = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
        this.receivedStart = false;
        this.dateObj = {
            startDate: '',
            endDate: ''
        };
        this.options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            filename: 'Orders',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'Exported Orders',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };
    }
    ngOnInit() { }
    animation() {
        document.querySelector('.disable-date').animate([
            { opacity: '0.2' },
            { opacity: '0' },
        ], {
            duration: 400,
        });
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            this.totalOrders = yield this.importExportManagerService.getAllOrdersLength();
            this.allOrders = yield this.importExportManagerService.getAllConfirmedOrders();
            // this.filteredOrders = this.allOrders
            console.log('Total Orders : ', this.totalOrders);
            console.log('All Orders : ', this.allOrders);
            yield this.sharedService.loading.dismiss();
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
    saveDisable() {
        if (this.allOrders && this.allOrders.length) {
            return false;
        }
        else {
            return true;
        }
    }
    disableArchiveState() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.archiveOrderState = !this.archiveOrderState;
            console.log('archiveOrderState : ', this.archiveOrderState);
            yield this.setOrderStatus(this.currentOrderStatus);
        });
    }
    disableDatePicker() {
        if (this.isDisableDatePicker) {
            // this.datePreset = 7
            // console.log('default date preset : ', this.datePreset)
            this.animation();
            setTimeout(() => {
                this.isDisableDatePicker = !this.isDisableDatePicker;
            }, 400);
        }
        else {
            this.datePreset = undefined;
            this.isDisableDatePicker = !this.isDisableDatePicker;
        }
    }
    filterDate(state) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (state === 'start') {
                if (this.dateObj.startDate) {
                    this.receivedStart = true;
                    if (this.dateObj.endDate) {
                        this.allOrders = yield this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.dateObj.endDate), new Date(this.dateObj.startDate));
                        // console.log('111 this.startDate = ' + this.startOrders)
                        // this.startOrders = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                        // this.endOrders = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000))
                    }
                }
                else {
                    this.receivedStart = false;
                }
            }
            if (state === 'end') {
                if (this.receivedStart) {
                    if (this.dateObj.endDate) {
                        this.allOrders = yield this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.dateObj.endDate), new Date(this.dateObj.startDate));
                        // console.log('222 this.startDate = ' + this.startOrders)
                        // this.startOrders = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                        // this.endOrders = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000))
                    }
                }
                else {
                    yield this.presentToastWithOptions('Date Range Warning!', `Please select both end & start date!`, 'WAR-127');
                }
            }
            if (!this.archiveOrderState) {
                this.filterArchiveOrders();
            }
        });
    }
    alertDatePicker() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.isDisableDatePicker) {
                yield this.presentToastWithOptions('Date Picker Warning!', `Enable the date range module via the toggle to proceed!`, 'WAR-124');
            }
        });
    }
    filterArchiveOrders() {
        let filteredOrders = [];
        for (let i = 0; i < this.allOrders.length; i++) {
            if (this.allOrders[i].subStatus && this.allOrders[i].subStatus.isArchive) {
                // filteredOrders.push(this.allOrders[i])
            }
            else {
                filteredOrders.push(this.allOrders[i]);
            }
        }
        this.allOrders = [];
        this.allOrders = filteredOrders;
    }
    setOrderStatus(status) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            this.currentOrderStatus = status;
            this.allOrders = [];
            switch (status) {
                case 'Confirmed':
                    if (this.datePreset) {
                        this.allOrders = yield this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders);
                    }
                    else {
                        this.allOrders = yield this.importExportManagerService.getAllConfirmedOrders();
                    }
                    break;
                case 'Pending':
                    if (this.datePreset) {
                        this.allOrders = yield this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders);
                    }
                    else {
                        this.allOrders = yield this.importExportManagerService.getAllPendingOrders();
                    }
                    break;
                case 'Dispatched':
                    if (this.datePreset) {
                        this.allOrders = yield this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders);
                    }
                    else {
                        this.allOrders = yield this.importExportManagerService.getAllDispatchedOrders();
                    }
                    break;
                case 'Delivered':
                    if (this.datePreset) {
                        this.allOrders = yield this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders);
                    }
                    else {
                        this.allOrders = yield this.importExportManagerService.getAllDeliveredOrders();
                    }
                    break;
                case 'Cancelled':
                    if (this.datePreset) {
                        this.allOrders = yield this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders);
                    }
                    else {
                        this.allOrders = yield this.importExportManagerService.getAllCancelledOrders();
                    }
                    break;
                case 'Rejected':
                    if (this.datePreset) {
                        this.allOrders = yield this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders);
                    }
                    else {
                        this.allOrders = yield this.importExportManagerService.getAllRejectedOrders();
                    }
                    break;
                case 'Returned':
                    if (this.datePreset) {
                        this.allOrders = yield this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders);
                    }
                    else {
                        this.allOrders = yield this.importExportManagerService.getAllReturnedOrders();
                    }
                    break;
                case 'Payment Pending':
                    if (this.datePreset) {
                        this.allOrders = yield this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders);
                    }
                    else {
                        this.allOrders = yield this.importExportManagerService.getAllPaymentPendingOrders();
                    }
                    break;
            }
            if (!this.archiveOrderState) {
                this.filterArchiveOrders();
            }
            yield this.sharedService.loading.dismiss();
            console.log(`selection ${status} : `, this.allOrders.length);
            // this.filteredOrders = this.allOrders
        });
    }
    customCaller(status) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.allOrders = [];
            switch (status) {
                case 'Confirmed':
                    this.allOrders = yield this.importExportManagerService.getAllConfirmedOrders();
                    break;
                case 'Pending':
                    this.allOrders = yield this.importExportManagerService.getAllPendingOrders();
                    break;
                case 'Dispatched':
                    this.allOrders = yield this.importExportManagerService.getAllDispatchedOrders();
                    break;
                case 'Delivered':
                    this.allOrders = yield this.importExportManagerService.getAllDeliveredOrders();
                    break;
                case 'Cancelled':
                    this.allOrders = yield this.importExportManagerService.getAllCancelledOrders();
                    break;
                case 'Rejected':
                    this.allOrders = yield this.importExportManagerService.getAllRejectedOrders();
                    break;
                case 'Returned':
                    this.allOrders = yield this.importExportManagerService.getAllReturnedOrders();
                    break;
                case 'Payment Pending':
                    this.allOrders = yield this.importExportManagerService.getAllPaymentPendingOrders();
                    break;
            }
        });
    }
    setDateRange(type, date) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            if (type === 'preset') {
                this.datePreset = date;
                if (this.datePreset == 0) {
                    this.disableDatePickerRange = false;
                    yield this.customCaller(this.currentOrderStatus);
                }
                else {
                    this.disableDatePickerRange = true;
                    this.allOrders = [];
                    this.endOrders = new Date(new Date().getTime() - (this.datePreset * 24 * 60 * 60 * 1000));
                    this.allOrders = yield this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders);
                }
                console.log('selected date preset : ', this.datePreset);
            }
            if (!this.archiveOrderState) {
                this.filterArchiveOrders();
            }
            yield this.sharedService.loading.dismiss();
        });
    }
    getProducts(products) {
        let prods = [];
        let sgst = 0, cgst = 0, igst = 0;
        products.forEach(product => {
            if (product.pack && product.pack.weight) {
                prods.push(product.name + '(' + product.pack.weight + ')(Qty:' + product.quantity + ')');
            }
            else {
                prods.push(product.name + '(Qty:' + product.quantity + ')');
            }
            if (product.gstObj && product.gstObj.sgst) {
                sgst = sgst + product.gstObj.sgst;
            }
            if (product.gstObj && product.gstObj.cgst) {
                cgst = cgst + product.gstObj.cgst;
            }
            if (product.gstObj && product.gstObj.igst) {
                igst = igst + product.gstObj.igst;
            }
        });
        return { prods, sgst, cgst, igst };
    }
    getVendorNameForCSV(vendorId, order) {
        if (order.vendors && order.vendors.length) {
            const vendor = order.vendors.filter(v => v.id === vendorId);
            // console.log('vendor : ', vendor)
            if (vendor && vendor.length && vendor[0].vendor) {
                return vendor[0].vendor.name;
            }
            else {
                return '';
            }
        }
        else {
            return '';
        }
    }
    getDateTimeFormat(date) {
        return moment__WEBPACK_IMPORTED_MODULE_3__(date).format('MMM D, YYYY hh:mm a');
    }
    presentLoading(msg, duration) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: msg || 'Please Wait...',
            });
            yield this.loading.present();
        });
    }
    exportAllOrders() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.allOrders = yield this.importExportManagerService.getAllOrders();
            // console.log('this.allOrders : ', this.allOrders)
            yield this.exportOrdersHandler();
        });
    }
    exportOrdersHandler() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            // *** Date toggle on
            if ((!this.isDisableDatePicker)) {
                console.log('execute with datePreset');
                console.log('Date Preset : ', this.datePreset);
                console.log('Date Object : ', this.dateObj);
                if (((this.datePreset === undefined) || (this.datePreset == 0)) && ((this.dateObj['startDate'] === '') && (this.dateObj['endDate'] === ''))) {
                    console.log('none selected');
                    yield this.presentToastWithOptions('Date Picker Error!', `Select either the date preset or the date range for filtering the orders!`, 'ERR-164');
                    return;
                }
                else {
                    console.log('selected');
                    if ((this.datePreset) && (this.datePreset != 0)) {
                        console.log('got preset');
                        this.allOrders = [];
                        this.endOrders = new Date(new Date().getTime() - (this.datePreset * 24 * 60 * 60 * 1000));
                        console.log('this.endOrders : ', this.endOrders);
                        this.allOrders = yield this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders);
                        console.log('allOrders : ', this.allOrders);
                        // this.dateObj.startDate = ''
                        // this.dateObj.endDate = ''
                        // this.datePreset = 0
                    }
                    if ((this.dateObj['startDate'] && this.dateObj['endDate'])) {
                        console.log('got range');
                        this.allOrders = [];
                        this.startOrders = new Date(this.dateObj['endDate']);
                        this.endOrders = new Date(this.dateObj['startDate']);
                        console.log('startOrders : ', this.startOrders);
                        console.log('endOrders : ', this.endOrders);
                        this.allOrders = yield this.importExportManagerService.getAllOrdersPreset(this.currentOrderStatus, this.startOrders, this.endOrders);
                        console.log('allOrders : ', this.allOrders);
                        // this.dateObj.startDate = ''
                        // this.dateObj.endDate = ''
                        // this.datePreset = 0
                    }
                }
            }
            console.log('execute without datePreset');
            this.options.filename = this.currentOrderStatus + ' ' + new Date().toLocaleString();
            this.options.title = this.currentOrderStatus + ' ' + new Date().toLocaleString();
            if (this.currentOrderStatus == 'Failed') {
                this.options.filename = 'Pending' + ' ' + new Date().toLocaleString();
                this.options.title = 'Pending' + ' ' + new Date().toLocaleString();
            }
            else if (this.currentOrderStatus == 'Pending') {
                this.options.filename = 'Confirmed' + ' ' + new Date().toLocaleString();
                this.options.title = 'Confirmed' + ' ' + new Date().toLocaleString();
            }
            let data = [], count = 0;
            for (const order of this.allOrders) {
                count++;
                // console.log('count : ', count)
                if (order.deliveryAgentId) {
                    let data = yield this.pickup.getDeliveryAgentName(order.deliveryAgentId);
                    order['deliveryName'] = (data && data['name']) ? data['name'] : '';
                    order['deliveryPhoneNo'] = (data && data['phoneNo']) ? `[ ${data['phoneNo']} ]` : '';
                }
                else {
                    order['deliveryName'] = '';
                    order['deliveryPhoneNo'] = '';
                }
                let products = {}, delivery_date = '';
                if (order.products) {
                    products = this.getProducts(order.products);
                }
                // if (order.scheduledDate && order.scheduledDate !== '' && order.scheduledDate !== {}) {
                if (order.scheduledDate && order.scheduledDate !== '') {
                    // console.log(order.scheduledDate);
                    if (typeof order.scheduledDate === 'string' || order.scheduledDate instanceof String) {
                        delivery_date = moment__WEBPACK_IMPORTED_MODULE_3__(new Date(order.scheduledDate)).format('MMM D, YYYY');
                    }
                    else if (order.scheduledDate.seconds) {
                        delivery_date = moment__WEBPACK_IMPORTED_MODULE_3__(order.scheduledDate.toDate()).format('MMM D, YYYY');
                    }
                }
                let quantityAll = 0;
                let orderIgst = 0;
                let orderSgst = 0;
                let orderCgst = 0;
                order.products.forEach((product, index) => {
                    quantityAll = quantityAll + this.getProductQty(index, order);
                    if (!isNaN(parseFloat(product['mrpPrice']))) {
                        if (product.gstObj && product.gstObj.igst && !isNaN(parseFloat(product.gstObj['igst']))) {
                            orderIgst = orderIgst + parseFloat((product.gstObj['igst'] * 0.01 * product['mrpPrice']).toFixed(2));
                        }
                        if (product.gstObj && product.gstObj.sgst && !isNaN(parseFloat(product.gstObj['sgst']))) {
                            orderSgst = orderSgst + parseFloat((product.gstObj['sgst'] * 0.01 * product['mrpPrice']).toFixed(2));
                        }
                        if (product.gstObj && product.gstObj.cgst && !isNaN(parseFloat(product.gstObj['cgst']))) {
                            orderCgst = orderCgst + parseFloat((product.gstObj['cgst'] * 0.01 * product['mrpPrice']).toFixed(2));
                        }
                    }
                });
                let totalAmount2Decimal = 0;
                if (!isNaN(parseFloat(order.defaultGst)) && order.defaultGst !== undefined) {
                    totalAmount2Decimal = totalAmount2Decimal + parseFloat(order.defaultGst.toFixed(2));
                }
                let obj = {
                    sno: count,
                    orderId: '',
                    name: '',
                    address: '',
                    city: '',
                    state: '',
                    pincode: '',
                    phone: '',
                    date: '',
                    status: '',
                    createdBy: '',
                    productName: '',
                    productCode: '',
                    productQuantity: '',
                    productPrice: '',
                    productDiscountPrice: '',
                    productGSTPercent: '',
                    productGSTAmount: '',
                    product_IGST: '',
                    product_SGST: '',
                    product_CGST: '',
                    totalQuantity: quantityAll,
                    vendorName: '',
                    totalDiscountPrice: order.discountOnMrp ? order.discountOnMrp : '',
                    cashbackAmount: order.cashbackAmount ? order.cashbackAmount : '',
                    totalGSTAmount: totalAmount2Decimal ? totalAmount2Decimal : '',
                    totalIGST: orderIgst,
                    totalSGST: orderSgst,
                    totalCGST: orderCgst,
                    subtotalInclGst: order.totalMrp ? order.totalMrp : '',
                    discount: order.discountOnMrp ? order.discountOnMrp : '',
                    delivery: order.delivery ? order.delivery : '',
                    totalInclGst: order.totalAmountToPaid ? order.totalAmountToPaid : '',
                    couponDiscount: order.couponDiscount ? order.couponDiscount : '',
                    couponCode: order.couponName ? order.couponName : '',
                    paymentCompleted: order.payment.completed ? 'YES' : 'NO',
                    paymentMode: order.payment.mode ? order.payment.mode : '',
                    walletAmountUsed: order.walletAmount ? order.walletAmount : '',
                    deliveryBy: order.deliveryName || '',
                    deliveryPhoneNo: order.deliveryPhoneNo || '',
                    deliveryDate: order.timeline ? order.timeline.Delivered ? this.getDateTimeFormat(order.timeline.Delivered.time.toDate()) : '' : '',
                    customerGST: order.customerGstNo ? order.customerGstNo : ''
                };
                obj.createdBy = order.metaData && order.metaData.orderBy ? `${order.metaData.orderBy.role} - ${order.metaData.orderBy.name}` : order.userName || 'NA';
                data.push(obj);
                for (let index = 0; index < order.products.length; index++) {
                    const product = order.products[index];
                    let productIgst = 0;
                    let productCgst = 0;
                    let productSgst = 0;
                    let productGst = 0;
                    let vendorName = '';
                    if (product.vendorStatus) {
                        // vendorName = await this.userService.getVendorNameCSV(product.vendorStatus.id)
                        if (order.orderId === 3282) {
                            console.log('csv order : ', order);
                        }
                        vendorName = this.getVendorNameForCSV(product.vendorStatus.id, order);
                    }
                    else {
                        vendorName = '';
                    }
                    // console.log('prodName : ', product.name, 'vendorName : ', vendorName);
                    if (!isNaN(parseFloat(product['mrpPrice']))) {
                        if (product.gstObj && product.gstObj.igst) {
                            productIgst = parseFloat((productIgst + product.gstObj['igst'] * 0.01 * product['mrpPrice']).toFixed(2));
                        }
                        if (product.gstObj && product.gstObj.sgst) {
                            productSgst = parseFloat((productSgst + product.gstObj['sgst'] * 0.01 * product['mrpPrice']).toFixed(2));
                        }
                        if (product.gstObj && product.gstObj.cgst) {
                            productCgst = parseFloat((productCgst + product.gstObj['cgst'] * 0.01 * product['mrpPrice']).toFixed(2));
                        }
                        if (product.gst) {
                            productGst = parseFloat((productGst + product['gst'] * 0.01 * product['mrpPrice']).toFixed(2));
                        }
                    }
                    data.push({
                        sno: '',
                        orderId: order.orderId ? order.orderId : '',
                        name: order.address && order.address.name ? order.address.name : '',
                        address: order.address && order.address.address ? order.address.address : '',
                        city: order.address && order.address.city ? order.address.city : '',
                        state: order.address && order.address.state ? order.address.state : '',
                        pincode: order.address && order.address.pincode ? order.address.pincode : '',
                        phone: order.address && order.address.phoneNo ? `[ ${order.address.phoneNo} ]` : '',
                        date: order.createdAt && order.createdAt.toDate() ? this.getDateTimeFormat(order.createdAt.toDate()) : '',
                        status: order.status ? order.status.toUpperCase() : '',
                        createdBy: order.userName || 'NA',
                        productName: product['name'] ? product['name'] : '',
                        productCode: product['sku'] ? product['sku'] : '',
                        productQuantity: this.getProductQty(index, order),
                        productPrice: product['mrpPrice'] ? product['mrpPrice'] : '',
                        productDiscountPrice: product['price'] ? product['price'] : '',
                        productGSTPercent: product['gst'] ? product['gst'] : '',
                        productGSTAmount: productGst,
                        product_IGST: productIgst,
                        product_SGST: productSgst,
                        product_CGST: productCgst,
                        totalQuantity: '',
                        vendorName: vendorName,
                        totalDiscountPrice: '',
                        cashbackAmount: '',
                        totalGSTAmount: '',
                        totalIGST: '',
                        totalSGST: '',
                        totalCGST: '',
                        subtotalInclGst: '',
                        discount: '',
                        delivery: '',
                        totalInclGst: '',
                        couponDiscount: '',
                        couponCode: '',
                        paymentCompleted: '',
                        paymentMode: '',
                        walletAmountUsed: '',
                        deliveryBy: '',
                        deliveryPhoneNo: '',
                        deliveryDate: '',
                        customerGST: ''
                    });
                }
            }
            const csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_6__["ExportToCsv"](this.options);
            csvExporter.generateCsv(data);
            yield this.loading.dismiss();
        });
    }
    getProductQty(index, order) {
        if ('unavailable' in order && order.unavailable[index]) {
            return order.products[index].quantity - order.unavailable[index];
        }
        else {
            return order.products[index].quantity;
        }
    }
};
ExportOrdersPage.ctorParameters = () => [
    { type: src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_2__["ImportExportManagerService"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] },
    { type: src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"] },
    { type: src_app_services_pickUp_pick_up_service__WEBPACK_IMPORTED_MODULE_7__["PickUpService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["ToastController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["LoadingController"] }
];
ExportOrdersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-export-orders',
        template: __webpack_require__(/*! raw-loader!./export-orders.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/orders/export-orders/export-orders.page.html"),
        styles: [__webpack_require__(/*! ./export-orders.page.scss */ "./src/app/admin/import-export-manager/orders/export-orders/export-orders.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_2__["ImportExportManagerService"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"],
        src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"],
        src_app_services_pickUp_pick_up_service__WEBPACK_IMPORTED_MODULE_7__["PickUpService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["ToastController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["LoadingController"]])
], ExportOrdersPage);



/***/ })

}]);
//# sourceMappingURL=admin-import-export-manager-orders-export-orders-export-orders-module-es2015.js.map