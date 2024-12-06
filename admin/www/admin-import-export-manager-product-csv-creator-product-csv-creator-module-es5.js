(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-import-export-manager-product-csv-creator-product-csv-creator-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/product-csv-creator/product-csv-creator.page.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/import-export-manager/product-csv-creator/product-csv-creator.page.html ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons style=\"margin-left: -8px;\" slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-menu-button style=\"margin-left: 8px;\" slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>{{currentType}} CSV Creator</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n\r\n        <ion-col id=\"scroll\" size=\"4\">\r\n          <div class=\"sectionArea\">\r\n            <h2>Select Fields</h2>\r\n            <div id=\"fields\">\r\n              <ion-progress-bar *ngIf=\"fieldLoader\" type=\"indeterminate\"></ion-progress-bar>\r\n              <ion-list>\r\n                <div id=\"mainField\">\r\n                  <ion-label>Select All</ion-label>\r\n                  <ion-checkbox slot=\"end\" mode=\"ios\" id=\"mainField\" (click)=\"selectAllFields()\"></ion-checkbox>\r\n                </div>\r\n                <div id=\"mainField\">\r\n                  <ion-label>Sku</ion-label>\r\n                  <ion-checkbox slot=\"end\" mode=\"ios\" id=\"mainField\" [checked]=\"true\" [disabled]=\"true\"></ion-checkbox>\r\n                </div>\r\n                <div *ngFor=\"let mainField of productFields; let i = index;\">\r\n                  <div id=\"mainField\">\r\n                    <ion-label>{{mainField.name}}</ion-label>\r\n                    <div class=\"dropdown\">\r\n                      <i *ngIf=\"mainField.fields\" class=\"flaticon-download\" (click)=\"dropdown(showDropdown, mainField.value)\"></i>\r\n                      <ion-checkbox slot=\"end\" mode=\"ios\" id=\"mainField\" [(ngModel)]=\"mainField.active\" (click)=\"handleSelections('main', mainField, i)\"></ion-checkbox>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div *ngIf=\"mainField.fields && mainField.value === 'categories'\" [class.hide]=\"showCategory\">\r\n                      <div *ngFor=\"let subField of mainField.fields; let i = index\" id=\"subField\">\r\n                        <p>{{subField.name}}</p>\r\n                        <ion-checkbox slot=\"end\" mode=\"ios\" [(ngModel)]=\"subField.active\" (click)=\"handleSelections('sub', subField, i)\" [disabled]=\"subCatDisable\"></ion-checkbox>\r\n                      </div>\r\n                  </div>\r\n\r\n                  <div *ngIf=\"mainField.fields && mainField.value === 'brands'\" [class.hide]=\"showBrand\">\r\n                    <div *ngFor=\"let subField of mainField.fields; let i = index\" id=\"subField\">\r\n                      <p>{{subField.name}}</p>\r\n                      <ion-checkbox slot=\"end\" mode=\"ios\" [(ngModel)]=\"subField.active\" (click)=\"handleSelections('sub', subField, i)\" [disabled]=\"subBrandDisable\"></ion-checkbox>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n              </ion-list>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col id=\"scroll\" size=\"4\">\r\n          <div class=\"sectionArea\">\r\n            <h2>Selected Fields</h2>\r\n            <ion-progress-bar *ngIf=\"!selectedFields[0]\" value=\"0.25\" buffer=\"0.5\"></ion-progress-bar>\r\n            <ion-list *ngIf=\"selectedFields[0]\">\r\n              <div id=\"mainFieldSelect\">\r\n                <ion-label>Sku</ion-label>\r\n              </div>\r\n              <div id=\"mainFieldSelect\" *ngFor=\"let selection of selectedFields\">\r\n                <ion-label>{{selection.name}}</ion-label>\r\n              </div>\r\n            </ion-list>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col size=\"4\">\r\n          <div class=\"sectionArea\" *ngIf=\"currentType === 'export products'\">\r\n            <h2>Instructions</h2>\r\n          </div>\r\n          <div style=\"margin-top: 10px;\">\r\n            <ol>\r\n              <li>SKU is a mandatory field & will be present in all exported csv's.</li>\r\n              <li>You just have to select the required fields for exporting & then click the following button for the same.</li>\r\n            </ol>\r\n          </div>\r\n        </ion-col>\r\n        \r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>\r\n\r\n<ion-footer no-border class=\"page-footer\" style=\"border-top: 1px solid #ccc;\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"exportProductsHandler()\" [disabled]=\"saveDisable()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      {{currentType}} CSV\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/admin/import-export-manager/product-csv-creator/product-csv-creator.module.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/product-csv-creator/product-csv-creator.module.ts ***!
  \***********************************************************************************************/
/*! exports provided: ProductCsvCreatorPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCsvCreatorPageModule", function() { return ProductCsvCreatorPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _product_csv_creator_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product-csv-creator.page */ "./src/app/admin/import-export-manager/product-csv-creator/product-csv-creator.page.ts");







var routes = [
    {
        path: '',
        component: _product_csv_creator_page__WEBPACK_IMPORTED_MODULE_6__["ProductCsvCreatorPage"]
    }
];
var ProductCsvCreatorPageModule = /** @class */ (function () {
    function ProductCsvCreatorPageModule() {
    }
    ProductCsvCreatorPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_product_csv_creator_page__WEBPACK_IMPORTED_MODULE_6__["ProductCsvCreatorPage"]]
        })
    ], ProductCsvCreatorPageModule);
    return ProductCsvCreatorPageModule;
}());



/***/ }),

/***/ "./src/app/admin/import-export-manager/product-csv-creator/product-csv-creator.page.scss":
/*!***********************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/product-csv-creator/product-csv-creator.page.scss ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  width: 100%;\n  padding: 0;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 75vh;\n  border-right: 1px solid lightgray;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 86vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n#scroll {\n  overflow: hidden;\n  height: calc(100vh - 107px);\n  border-right: 1px solid lightgray;\n}\n\n#scroll:hover {\n  overflow-y: auto;\n}\n\n.sectionArea h2 {\n  text-align: center;\n}\n\nh2 {\n  margin-top: 0;\n  font-size: 24px;\n}\n\n#mainField {\n  margin: 0 4px 8px 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n#mainFieldSelect {\n  height: 34px;\n  margin: 0 4px 8px 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n#subField {\n  margin: 0 8px 16px 40px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.dropdown {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  gap: 4px;\n}\n\n.hide {\n  visibility: hidden;\n  max-height: 0;\n  opacity: 0;\n  -webkit-transition: max-height 0.5s linear;\n  transition: max-height 0.5s linear;\n}\n\n#fieldSelection {\n  margin: 0 4px 8px 8px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vaW1wb3J0LWV4cG9ydC1tYW5hZ2VyL3Byb2R1Y3QtY3N2LWNyZWF0b3IvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxpbXBvcnQtZXhwb3J0LW1hbmFnZXJcXHByb2R1Y3QtY3N2LWNyZWF0b3JcXHByb2R1Y3QtY3N2LWNyZWF0b3IucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9pbXBvcnQtZXhwb3J0LW1hbmFnZXIvcHJvZHVjdC1jc3YtY3JlYXRvci9wcm9kdWN0LWNzdi1jcmVhdG9yLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxVQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxpQ0FBQTtBQ0NGOztBREFFO0VBQ0UsZ0JBQUE7QUNFSjs7QURFQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtBQ0NGOztBREFFO0VBQ0UsZ0JBQUE7QUNFSjs7QURFQTtFQUNFLGdCQUFBO0VBQ0EsMkJBQUE7RUFDQSxpQ0FBQTtBQ0NGOztBREFFO0VBQ0UsZ0JBQUE7QUNFSjs7QURFRTtFQUNFLGtCQUFBO0FDQ0o7O0FER0E7RUFDRSxhQUFBO0VBQ0EsZUFBQTtBQ0FGOztBREdBO0VBQ0UscUJBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtBQ0FGOztBREdBO0VBQ0UsWUFBQTtFQUNBLHFCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7QUNBRjs7QURHQTtFQUNFLHVCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7QUNBRjs7QURHQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxRQUFBO0FDQUY7O0FER0E7RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0VBQ0EsMENBQUE7RUFBQSxrQ0FBQTtBQ0FGOztBREdBO0VBQ0UscUJBQUE7QUNBRiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2ltcG9ydC1leHBvcnQtbWFuYWdlci9wcm9kdWN0LWNzdi1jcmVhdG9yL3Byb2R1Y3QtY3N2LWNyZWF0b3IucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW4tY29udGFpbmVyIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiAwXHJcbn1cclxuXHJcbiNzY3JvbGwxIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogNzV2aDtcclxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxufVxyXG5cclxuI3Njcm9sbDIge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiA4NnZoO1xyXG4gICY6aG92ZXIge1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICB9XHJcbn1cclxuXHJcbiNzY3JvbGwge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTA3cHgpO1xyXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICAmOmhvdmVyIHtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgfVxyXG59XHJcbi5zZWN0aW9uQXJlYXtcclxuICBoMiB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG59XHJcblxyXG5oMiB7XHJcbiAgbWFyZ2luLXRvcDogMDtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbn1cclxuXHJcbiNtYWluRmllbGQge1xyXG4gIG1hcmdpbjogMCA0cHggOHB4IDhweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcblxyXG4jbWFpbkZpZWxkU2VsZWN0IHtcclxuICBoZWlnaHQ6IDM0cHg7XHJcbiAgbWFyZ2luOiAwIDRweCA4cHggOHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuXHJcbiNzdWJGaWVsZCB7XHJcbiAgbWFyZ2luOiAwIDhweCAxNnB4IDQwcHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5cclxuLmRyb3Bkb3duIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiA0cHg7XHJcbn1cclxuXHJcbi5oaWRlIHtcclxuICB2aXNpYmlsaXR5OiBoaWRkZW47XHJcbiAgbWF4LWhlaWdodDogMDtcclxuICBvcGFjaXR5OiAwO1xyXG4gIHRyYW5zaXRpb246IG1heC1oZWlnaHQgMC41cyBsaW5lYXI7XHJcbn1cclxuXHJcbiNmaWVsZFNlbGVjdGlvbiB7XHJcbiAgbWFyZ2luOiAwIDRweCA4cHggOHB4O1xyXG59IiwiLm1haW4tY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbiNzY3JvbGwxIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA3NXZoO1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG4jc2Nyb2xsMTpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbiNzY3JvbGwyIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA4NnZoO1xufVxuI3Njcm9sbDI6aG92ZXIge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG4jc2Nyb2xsIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTA3cHgpO1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG4jc2Nyb2xsOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuLnNlY3Rpb25BcmVhIGgyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5oMiB7XG4gIG1hcmdpbi10b3A6IDA7XG4gIGZvbnQtc2l6ZTogMjRweDtcbn1cblxuI21haW5GaWVsZCB7XG4gIG1hcmdpbjogMCA0cHggOHB4IDhweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4jbWFpbkZpZWxkU2VsZWN0IHtcbiAgaGVpZ2h0OiAzNHB4O1xuICBtYXJnaW46IDAgNHB4IDhweCA4cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cblxuI3N1YkZpZWxkIHtcbiAgbWFyZ2luOiAwIDhweCAxNnB4IDQwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cblxuLmRyb3Bkb3duIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA0cHg7XG59XG5cbi5oaWRlIHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICBtYXgtaGVpZ2h0OiAwO1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2l0aW9uOiBtYXgtaGVpZ2h0IDAuNXMgbGluZWFyO1xufVxuXG4jZmllbGRTZWxlY3Rpb24ge1xuICBtYXJnaW46IDAgNHB4IDhweCA4cHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/import-export-manager/product-csv-creator/product-csv-creator.page.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/product-csv-creator/product-csv-creator.page.ts ***!
  \*********************************************************************************************/
/*! exports provided: ProductCsvCreatorPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCsvCreatorPage", function() { return ProductCsvCreatorPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/import-export-manager/import-export-manager.service */ "./src/app/services/import-export-manager/import-export-manager.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/product/product.service */ "./src/app/services/product/product.service.ts");
/* harmony import */ var src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/brands/brands.service */ "./src/app/services/brands/brands.service.ts");









var ProductCsvCreatorPage = /** @class */ (function () {
    function ProductCsvCreatorPage(router, route, sharedService, importExportManagerService, productService, brandService) {
        this.router = router;
        this.route = route;
        this.sharedService = sharedService;
        this.importExportManagerService = importExportManagerService;
        this.productService = productService;
        this.brandService = brandService;
        this.allProducts = [];
        this.allCategories = [];
        this.allSubcategories = [];
        this.allVendors = [];
        this.allBrands = [];
        this.showDropdown = false;
        this.fieldLoader = true;
        this.sno = 0;
        this.options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            filename: 'Products',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: false,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };
        this.showBrand = true;
        this.showCategory = true;
        this.selectedFields = [];
        this.subCatDisable = false;
        this.subBrandDisable = false;
        this.productFields = [
            // {
            //   name: 'Sku',
            //   value: 'skuCode',
            //   active: true
            // },
            {
                name: 'Name',
                value: 'prodName',
                active: false
            },
            {
                name: 'Barcode',
                value: 'barcodeNo',
                active: false
            },
            {
                name: 'Active',
                value: 'status',
                active: false
            },
            {
                name: 'Is Variant',
                value: 'isPriceList',
                active: false
            },
            {
                name: 'Type of Variant',
                value: 'variantType',
                active: false
            },
            {
                name: 'Variant Name',
                value: 'variantName',
                active: false
            },
            {
                name: 'Variant Value',
                value: 'variantValue',
                active: false
            },
            {
                name: 'Price',
                value: 'prodPrice',
                active: false
            },
            {
                name: 'Vendor Phone Number',
                value: 'vendorId',
                active: false
            },
            {
                name: 'Discounted Price',
                value: 'discountedPrice',
                active: false
            },
            {
                name: 'Purchase Price',
                value: 'purchasePrice',
                active: false
            },
            {
                name: 'Shipping Weight',
                value: 'shippingWeight',
                active: false
            },
            {
                name: 'Stocks',
                value: 'productQty',
                active: false
            },
            {
                name: 'Minimum Quantity',
                value: 'minQty',
                active: false
            },
            {
                name: 'Maximum Quantity',
                value: 'maxQty',
                active: false
            },
            {
                name: 'Product Description',
                value: 'prodDesc',
                active: false
            },
            {
                name: 'HSN Code',
                value: 'hsnCode',
                active: false
            },
            {
                name: 'GST',
                value: 'gst',
                active: false
            },
            {
                name: 'Color',
                value: 'prodColor',
                active: false
            },
            {
                name: 'Keywords',
                value: 'searchKeywords',
                active: false
            },
            {
                name: 'Out of Stock',
                value: 'stopWhenNoQty',
                active: false
            },
            {
                name: 'Images Link',
                value: 'images',
                active: false
            },
            {
                name: 'Categories',
                value: 'categories',
                fields: [],
                active: false
            },
            {
                name: 'Brands',
                value: 'brands',
                fields: [],
                active: false
            }
        ];
    }
    ProductCsvCreatorPage.prototype.ngOnInit = function () { };
    ProductCsvCreatorPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.route.queryParams.subscribe(function (param) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                    var _a, _b, _c, _d, _e;
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                console.log("params : ", param);
                                if (!param) return [3 /*break*/, 8];
                                this.currentType = param.type;
                                if (!(this.currentType === 'export products')) return [3 /*break*/, 6];
                                // this.allCategories = await this.importExportManagerService.getAllCategories()
                                _a = this;
                                return [4 /*yield*/, this.productService.getAllCategoriesForSideMenu()
                                    // this.allSubcategories = await this.importExportManagerService.getAllSubCategories();
                                ];
                            case 1:
                                // this.allCategories = await this.importExportManagerService.getAllCategories()
                                _a.allCategories = _f.sent();
                                // this.allSubcategories = await this.importExportManagerService.getAllSubCategories();
                                _b = this;
                                return [4 /*yield*/, this.productService.getAllSubcategoriesForSideMenu()
                                    // this.allBrands = await this.importExportManagerService.getAllBrands()
                                ];
                            case 2:
                                // this.allSubcategories = await this.importExportManagerService.getAllSubCategories();
                                _b.allSubcategories = _f.sent();
                                // this.allBrands = await this.importExportManagerService.getAllBrands()
                                _c = this;
                                return [4 /*yield*/, this.brandService.getAllBrandsForSideMenu()];
                            case 3:
                                // this.allBrands = await this.importExportManagerService.getAllBrands()
                                _c.allBrands = _f.sent();
                                _d = this;
                                return [4 /*yield*/, this.importExportManagerService.getAllVendors()];
                            case 4:
                                _d.allVendors = _f.sent();
                                _e = this;
                                return [4 /*yield*/, this.importExportManagerService.getAllProducts()];
                            case 5:
                                _e.allProducts = _f.sent();
                                console.log('allCategories', this.allCategories);
                                console.log('allSubcategories', this.allSubcategories);
                                console.log('allBrands: ', this.allBrands);
                                console.log('allVendors : ', this.allVendors);
                                console.log('allProducts: ', this.allProducts);
                                this.setCategories();
                                this.setBrands();
                                this.fieldLoader = false;
                                return [3 /*break*/, 8];
                            case 6:
                                if (!(this.currentType === 'import products')) return [3 /*break*/, 8];
                                // TODO : Import all products
                                return [4 /*yield*/, this.importProductsHandler()];
                            case 7:
                                // TODO : Import all products
                                _f.sent();
                                _f.label = 8;
                            case 8: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    ProductCsvCreatorPage.prototype.getDateTimeFormat = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_6__(date).format('MMM D, YYYY hh:mm a');
    };
    ProductCsvCreatorPage.prototype.getPriceListFields = function (priceList) {
        var fields = {
            type: [],
            name: [],
            price: [],
            discountedPrice: [],
            purchasePrice: [],
            totalQuantity: [],
            shippingWeight: []
        };
        priceList.forEach(function (item, index) {
            fields.type[index] = item.weight ? item.weight : '';
            fields.name[index] = item.name ? item.name : '';
            fields.price[index] = item.price ? item.price : 0,
                fields.discountedPrice[index] = item.discountedPrice ? item.discountedPrice : 0,
                fields.purchasePrice[index] = item.purchasePrice ? item.purchasePrice : 0,
                fields.totalQuantity[index] = item.totalQuantity ? item.totalQuantity : '0';
            fields.shippingWeight[index] = item.shippingWeight ? item.shippingWeight : 0;
        });
        return fields;
    };
    ProductCsvCreatorPage.prototype.selectAllFields = function () {
        console.log('before selectAllFields : ', this.productFields);
        this.selectAlternator = !this.selectAlternator;
        for (var _i = 0, _a = this.productFields; _i < _a.length; _i++) {
            var field = _a[_i];
            field.active = this.selectAlternator;
        }
        console.log('after selectAllFields : ', this.productFields);
        if (this.selectAlternator) {
            this.selectedFields = this.productFields;
        }
        else {
            this.selectedFields = [];
        }
    };
    ProductCsvCreatorPage.prototype.getSelectedFields2 = function (type, field, index) {
        var _this = this;
        if (field.value === 'categories') {
            this.productFields[index].fields.map(function (field) { return field.active = !_this.productFields[index].active; });
            this.subCatDisable = !this.productFields[index].active;
        }
        if (field.value === 'brands') {
            this.productFields[index].fields.map(function (field) { return field.active = !_this.productFields[index].active; });
            this.subBrandDisable = !this.productFields[index].active;
        }
        // * If already exists then remove
        if (this.selectedFields.some(function (selectField) { return selectField.value === field.value; })) {
            var selectIndex = this.selectedFields.findIndex(function (selectField) { return selectField.value === field.value; });
            this.selectedFields.splice(selectIndex, 1);
        }
        // * If not then push 
        else {
            this.selectedFields.push(field);
        }
    };
    ProductCsvCreatorPage.prototype.getSelectedFields = function (type, field, indexMain) {
        var _this = this;
        console.log('field : ', field);
        console.log('index : ', indexMain);
        // * Set all categories & brands to true on parent selection
        if (field.value === 'categories') {
            console.log('categories : ', this.productFields[indexMain]);
            // * Set all Categories active on global selection & vice versa
            this.productFields[indexMain].fields.map(function (field) {
                field.active = !_this.productFields[indexMain].active;
                // * Remove all selected Categories from selectedFields on global deselection
                var selIndex = _this.selectedFields.findIndex(function (select) { return select.value === field.value; });
                _this.selectedFields.splice(selIndex, 1);
            });
            // this.subDisable = !this.subDisable
        }
        else if (field.value === 'brands') {
            console.log('brands : ', this.productFields[indexMain]);
            // * Set all Brands active on global selection & vice versa
            this.productFields[indexMain].fields.map(function (field) {
                field.active = !_this.productFields[indexMain].active;
                // * Remove all selected Brands from selectedFields on global deselection
                var selIndex = _this.selectedFields.findIndex(function (select) { return select.value === field.value; });
                _this.selectedFields.splice(selIndex, 1);
            });
            // this.subDisable = !this.subDisable
        }
        // * Check for all active fields & put in selected fields array
        if (this.selectedFields.length) {
            console.log('length true');
            // * Remove already selected fields
            if (this.selectedFields.some(function (select) { return select.value === field.value; })) {
                console.log('got existing selection : ', field.value);
                console.log('index : ', indexMain);
                var index = this.selectedFields.findIndex(function (select) { return select.value === field.value; });
                this.selectedFields.splice(index, 1);
            }
            else {
                this.selectedFields.push(this.productFields[indexMain]);
            }
        }
        else {
            this.selectedFields.push(this.productFields[indexMain]);
        }
        console.log('this.selectedFields : ', this.selectedFields);
        console.log('this.productFields :', this.productFields);
    };
    ProductCsvCreatorPage.prototype.productObjSetter = function (selectedFields, product, fields, categoryList, brandList, vendorPhoneNo) {
        var csvObj = {};
        selectedFields.unshift({
            name: 'Sku',
            value: 'productCode',
            active: true
        });
        // for (let i = 0; i < selectedFields.length; i++) {
        //   csvObj[selectedFields[i].name] = product[selectedFields[i].value]
        // }
        for (var i = 0; i < selectedFields.length; i++) {
            // console.log('selectedFields : ', selectedFields[i].name);
            switch (selectedFields[i].name) {
                case 'Sku': // productCode
                    csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? "\t" + product[selectedFields[i].value] : '';
                    break;
                case 'Name': // productName
                    csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product[selectedFields[i].value] : '';
                    break;
                case 'Barcode': // barcodeNo
                    csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product[selectedFields[i].value] : '';
                    break;
                case 'Active': // status
                    csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? 'Yes' : 'No';
                    break;
                case 'Is Variant': // isPriceList
                    csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? 'Yes' : 'No';
                    break;
                case 'Type of Variant': // variantType
                    csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product[selectedFields[i].value] : 'Other';
                    break;
                case 'Variant Name': // variantName - *self_proclaimed
                    csvObj[selectedFields[i].name] = product['isPriceList'] ? fields['name'].join(', ') : '';
                    break;
                case 'Variant Value': // variantValue - *self_proclaimed
                    csvObj[selectedFields[i].name] = product['isPriceList'] ? fields['type'].join(', ') : '';
                    break;
                case 'Price': // prodPrice
                    csvObj[selectedFields[i].name] = product['isPriceList'] ? fields['price'].join(', ') : product[selectedFields[i].value];
                    break;
                case 'Discounted Price': // discountedPrice
                    csvObj[selectedFields[i].name] = product['isPriceList'] ? fields['discountedPrice'].join(', ') : product[selectedFields[i].value];
                    break;
                case 'Purchase Price': // purchasePrice
                    csvObj[selectedFields[i].name] = product['isPriceList'] ? fields['purchasePrice'].join(', ') : product[selectedFields[i].value];
                    break;
                case 'Vendor Phone Number': // vendorPhoneNo - *self_proclaimed
                    csvObj[selectedFields[i].name] = product['vendorId'] ? vendorPhoneNo : '';
                    break;
                case 'Stocks': // productQty
                    csvObj[selectedFields[i].name] = product['isPriceList'] ? fields['totalQuantity'].join(', ') : (product[selectedFields[i].value] ? product[selectedFields[i].value] : '');
                    break;
                case 'Shipping Weight': // shippingWeight
                    csvObj[selectedFields[i].name] = product['isPriceList'] ? fields['shippingWeight'].join(', ') : product[selectedFields[i].value];
                    break;
                case 'Minimum Quantity': // minQty
                    csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product[selectedFields[i].value] : '';
                    break;
                case 'Maximum Quantity': // maxQty
                    csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product[selectedFields[i].value] : '';
                    break;
                case 'Product Description': // prodDesc
                    csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product[selectedFields[i].value] : '';
                    break;
                case 'HSN Code': // hsnCode
                    csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product[selectedFields[i].value] : '';
                    break;
                case 'GST': // gst
                    csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product[selectedFields[i].value] : '';
                    break;
                case 'Color': // prodColor - *self_proclaimed
                    csvObj[selectedFields[i].name] = product.color && product.color.name && product.color.code ? product.color.name + ',' + product.color.code : '';
                    break;
                case 'Keywords': // stopWhenNoQty
                    csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? product.searchKeywords.join() : '';
                    break;
                case 'Out of Stock': // stopWhenNoQty
                    csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? 'Yes' : 'No';
                    break;
                case 'Images Link': // custom
                    csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? this.getImagesLink(product) : '';
                    break;
                case 'Categories': // categories
                    csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? categoryList.join(';') : '';
                    break;
                case 'Brands': // brands
                    csvObj[selectedFields[i].name] = product[selectedFields[i].value] ? brandList.join(';') : '';
                    break;
            }
        }
        selectedFields.shift();
        return csvObj;
    };
    ProductCsvCreatorPage.prototype.getImagesLink = function (product) {
        if (product.images) {
            var imagesURL = '';
            imagesURL += product.images.map(function (e) { return e.url; }).join(', ');
            return imagesURL;
        }
        else {
            return '';
        }
    };
    ProductCsvCreatorPage.prototype.isEmpty = function (products) {
        return Object.keys(products).length === 0;
    };
    ProductCsvCreatorPage.prototype.exportProductsHandler = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var products, csvProductIds, csvExporter;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                console.log('productFields : ', this.productFields);
                this.options.filename = this.options.filename + ' ' + this.getDateTimeFormat(new Date);
                products = [];
                csvProductIds = [];
                this.allProducts.forEach(function (item) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                    var product, productCategories, categoryList, productBrands, brandList, vendorPhoneNo, vendorData, fields, filter, _loop_1, this_1, _i, _a, field, _loop_2, this_2, _b, filter_1, sub, csvObject;
                    var _this = this;
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                        product = item;
                        productCategories = product.categories;
                        categoryList = [];
                        productBrands = product.brands;
                        brandList = [];
                        vendorPhoneNo = '';
                        if (this.allCategories) {
                            if (product.categories) {
                                productCategories.forEach(function (categoryId) {
                                    var result = _this.allCategories.find(function (obj) {
                                        return obj.id === categoryId;
                                    });
                                    if (result) {
                                        categoryList.push(result.name);
                                    }
                                    if (_this.allSubcategories) {
                                        var resultSub_1 = _this.allSubcategories.find(function (obj) {
                                            return obj.id === categoryId;
                                        });
                                        if (resultSub_1) {
                                            var catResult = _this.allCategories.find(function (obj) {
                                                return obj.id === resultSub_1.categoryId;
                                            });
                                            if (catResult) {
                                                categoryList.push(catResult.name + '-' + resultSub_1.name);
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        if (this.allBrands) {
                            if (product.brands) {
                                productBrands.forEach(function (brandId) {
                                    var result = _this.allBrands.find(function (obj) {
                                        return obj.id === brandId;
                                    });
                                    if (result) {
                                        brandList.push(result.name);
                                    }
                                });
                            }
                        }
                        if (this.allVendors) {
                            if (product.vendorId && (this.allVendors.some(function (v) { return v.id === product.vendorId; }))) {
                                vendorData = this.allVendors.find(function (v) { return v.id === product.vendorId; });
                                console.log('vendorData', vendorData.phoneNo);
                                vendorPhoneNo = ('[ ' + vendorData.phoneNo + ' ]') || false;
                            }
                        }
                        fields = {};
                        if (product.isPriceList) {
                            fields = this.getPriceListFields(product.priceList);
                        }
                        else {
                            product.price = product.price ? product.price : 0;
                            product.discountedPrice = product.discountedPrice ? product.discountedPrice : 0;
                            product.purchasePrice = product.purchasePrice ? product.purchasePrice : 0;
                            product.quantity = product.quantity ? product.quantity : '';
                            product.shippingWeight = product.shippingWeight ? product.shippingWeight : 0;
                        }
                        this.sno++;
                        filter = [];
                        _loop_1 = function (field) {
                            var catIndex = this_1.productFields.findIndex(function (field) { return field.value === 'categories'; });
                            var brandIndex = this_1.productFields.findIndex(function (field) { return field.value === 'brands'; });
                            // check in categories
                            if (this_1.productFields[catIndex].fields.some(function (select) { return select.value === field.value; })) {
                                filter.push(field);
                                // console.log('cat field : ', field)
                            }
                            // check in brands
                            if (this_1.productFields[brandIndex].fields.some(function (select) { return select.value === field.value; })) {
                                filter.push(field);
                                // console.log('brand field : ', field)
                            }
                        };
                        this_1 = this;
                        for (_i = 0, _a = this.selectedFields; _i < _a.length; _i++) {
                            field = _a[_i];
                            _loop_1(field);
                        }
                        // console.log('filter : ', filter)
                        if (filter.length) {
                            _loop_2 = function (sub) {
                                if (((categoryList.some(function (cat) { return cat === sub.value; })) || (brandList.some(function (brand) { return brand === sub.value; }))) && (!csvProductIds.includes(product.id))) {
                                    var csvObject = this_2.productObjSetter(this_2.selectedFields, product, fields, categoryList, brandList, vendorPhoneNo);
                                    products.push(csvObject);
                                    csvProductIds.push(product.id);
                                }
                            };
                            this_2 = this;
                            for (_b = 0, filter_1 = filter; _b < filter_1.length; _b++) {
                                sub = filter_1[_b];
                                _loop_2(sub);
                            }
                        }
                        else {
                            csvObject = this.productObjSetter(this.selectedFields, product, fields, categoryList, brandList, vendorPhoneNo);
                            products.push(csvObject);
                        }
                        return [2 /*return*/];
                    });
                }); });
                console.log('products', products);
                if (this.loading) {
                    this.loading.dismiss();
                }
                console.log(products);
                if (this.isEmpty(products)) {
                    this.sharedService.presentAlert('No products found with the current selection!');
                }
                else {
                    csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_5__["ExportToCsv"](this.options);
                    csvExporter.generateCsv(products);
                }
                return [2 /*return*/];
            });
        });
    };
    ProductCsvCreatorPage.prototype.importProductsHandler = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ProductCsvCreatorPage.prototype.setCategories = function () {
        var _this = this;
        if (this.allCategories && this.allCategories.length) {
            var objIndex_1 = this.productFields.findIndex((function (obj) { return obj.value == 'categories'; }));
            this.productFields[objIndex_1].fields = [];
            this.allCategories.map(function (category) {
                _this.productFields[objIndex_1].fields.push({
                    name: category.name,
                    value: category.name,
                    active: false
                });
            });
        }
    };
    ProductCsvCreatorPage.prototype.setBrands = function () {
        var _this = this;
        if (this.allBrands && this.allBrands.length) {
            var objIndex_2 = this.productFields.findIndex((function (obj) { return obj.value == 'brands'; }));
            this.productFields[objIndex_2].fields = [];
            this.allBrands.map(function (brand) {
                _this.productFields[objIndex_2].fields.push({
                    name: brand.name,
                    value: brand.name,
                    active: false
                });
            });
        }
    };
    ProductCsvCreatorPage.prototype.checkForTrue = function () {
        if (this.productFields.find(function (active) {
            if (active.active) {
                return true;
            }
            if (active.fields && active.fields.find(function (active) {
                if (active.active) {
                    return true;
                }
            })) {
                return true;
            }
        })) {
            return true;
        }
    };
    ProductCsvCreatorPage.prototype.saveDisable = function () {
        if (this.currentType === 'export products') {
            if (this.checkForTrue()) {
                return false;
            }
            else {
                return true;
            }
        }
        else if (this.currentType === 'import products') {
            // TODO : When starting import
            return true;
        }
    };
    ProductCsvCreatorPage.prototype.defaultSku = function (defaultSku) {
        console.log(defaultSku);
        if (defaultSku === 'productCode') {
            return true;
        }
    };
    ProductCsvCreatorPage.prototype.handleSelections = function (type, field, index, mainField) {
        this.getSelectedFields2(type, field, index);
        // console.log('productFields : ', this.productFields);
    };
    ProductCsvCreatorPage.prototype.dropdown = function (state, selection) {
        console.log('state : ', state, ' selection : ', selection);
        if (selection === 'categories') {
            this.showCategory = !this.showCategory;
        }
        if (selection === 'brands') {
            this.showBrand = !this.showBrand;
        }
    };
    ProductCsvCreatorPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] },
        { type: src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_3__["ImportExportManagerService"] },
        { type: src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_7__["ProductService"] },
        { type: src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_8__["BrandsService"] }
    ]; };
    ProductCsvCreatorPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-product-csv-creator',
            template: __webpack_require__(/*! raw-loader!./product-csv-creator.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/product-csv-creator/product-csv-creator.page.html"),
            styles: [__webpack_require__(/*! ./product-csv-creator.page.scss */ "./src/app/admin/import-export-manager/product-csv-creator/product-csv-creator.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"],
            src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_3__["ImportExportManagerService"],
            src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_7__["ProductService"],
            src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_8__["BrandsService"]])
    ], ProductCsvCreatorPage);
    return ProductCsvCreatorPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-import-export-manager-product-csv-creator-product-csv-creator-module-es5.js.map