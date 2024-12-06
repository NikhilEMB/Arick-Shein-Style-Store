(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-import-export-manager-product-csv-importer-product-csv-importer-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/product-csv-importer/product-csv-importer.page.html":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/import-export-manager/product-csv-importer/product-csv-importer.page.html ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons style=\"margin-left: -8px;\" slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Product CSV Importer</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col id=\"scroll\" size=\"6\">\r\n          <div class=\"sectionArea\">\r\n            <h2>Detected Fields</h2>\r\n            <p class=\"ion-text-center\" *ngIf=\"!detectedFields.length\">\r\n              Please Upload CSV\r\n            </p>\r\n            <!-- <ion-progress-bar  type=\"indeterminate\"></ion-progress-bar> -->\r\n            <ion-list *ngIf=\"detectedFields.length\">\r\n              <div id=\"mainField\" *ngFor=\"let entry of detectedFields; let i = index\">\r\n                <ion-label>{{entry.name}}</ion-label>\r\n                <ion-checkbox mode=\"ios\" slot=\"end\" [disabled]=\"true\" [(ngModel)]=\"entry.active\"></ion-checkbox>\r\n              </div>\r\n            </ion-list>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col id=\"scroll\" size=\"6\">\r\n          <div class=\"sectionArea\">\r\n            <h2>Instructions</h2>\r\n          </div>\r\n          <div>\r\n            <ol>\r\n              <li style=\"font-weight: bold\">Before Uploading</li>\r\n                <ion-button expand=\"block\" shape=\"round\" mode=\"ios\" style=\"margin: 10px 0 10px 0\" (click)=\"openCSVImportRules()\">View Rules</ion-button>\r\n              <li style=\"font-weight: bold\">While Uploading</li>\r\n              <ol>\r\n                <li>Make sure that the file is of .csv format.</li>\r\n                <li>You can use the sample csv format provided for formatting the products accordingly.</li>\r\n              </ol>\r\n              <li style=\"font-weight: bold\">While Importing</li>\r\n              <ol>\r\n                <li>Please wait while the importing of products is undergoing & make sure to not close this tab.</li>\r\n              </ol>\r\n            </ol>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>\r\n\r\n<ion-footer no-border class=\"page-footer\">\r\n  <!-- <ion-progress-bar *ngIf=\"isProgressBarActive\" value=\"progressValue\" buffer=\"progressBuffer\"></ion-progress-bar> -->\r\n  <ion-progress-bar *ngIf=\"isProgressBarActive\" type=\"indeterminate\"></ion-progress-bar>\r\n  <div class=\"main-container\" style=\"display: flex; justify-content: space-between; align-items: center;\">\r\n    <div class=\"status-update\">\r\n      <strong style=\"display: inline;\">Total Products Imported : {{totalProcessed}} / {{calcProcessedEntities()}}</strong>\r\n    </div>\r\n    <div class=\"upload-btn-wrapper\">\r\n      <ion-button [disabled]=\"saveDisable() || isProgressBarActive\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\" (click)=\"importProductsHandler($event, buttonState)\" >\r\n        <i *ngIf=\"buttonState === 'Import'\" class=\"flaticon-null-20 margin-icon\"></i>\r\n        <i *ngIf=\"buttonState === 'Upload'\" class=\"flaticon-null-16\"></i>\r\n        {{buttonState}} CSV\r\n      </ion-button>\r\n      <ng-container *ngIf=\"!isProgressBarActive && buttonState !== 'Import'\">\r\n        <input type=\"file\" name=\"myfile\" (change)=\"importProductsHandler($event, buttonState)\"/>\r\n      </ng-container>\r\n    </div>\r\n  </div>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/admin/import-export-manager/product-csv-importer/product-csv-importer.module.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/product-csv-importer/product-csv-importer.module.ts ***!
  \*************************************************************************************************/
/*! exports provided: ProductCsvImporterPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCsvImporterPageModule", function() { return ProductCsvImporterPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _product_csv_importer_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product-csv-importer.page */ "./src/app/admin/import-export-manager/product-csv-importer/product-csv-importer.page.ts");







var routes = [
    {
        path: '',
        component: _product_csv_importer_page__WEBPACK_IMPORTED_MODULE_6__["ProductCsvImporterPage"]
    }
];
var ProductCsvImporterPageModule = /** @class */ (function () {
    function ProductCsvImporterPageModule() {
    }
    ProductCsvImporterPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_product_csv_importer_page__WEBPACK_IMPORTED_MODULE_6__["ProductCsvImporterPage"]]
        })
    ], ProductCsvImporterPageModule);
    return ProductCsvImporterPageModule;
}());



/***/ }),

/***/ "./src/app/admin/import-export-manager/product-csv-importer/product-csv-importer.page.scss":
/*!*************************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/product-csv-importer/product-csv-importer.page.scss ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  width: 100%;\n  padding: 0;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 75vh;\n  border-right: 1px solid lightgray;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 86vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n#scroll {\n  overflow: hidden;\n  height: calc(100vh - 107px);\n  border-right: 1px solid lightgray;\n}\n\n#scroll:hover {\n  overflow-y: auto;\n}\n\n.sectionArea h2 {\n  text-align: center;\n}\n\nh2 {\n  margin-top: 0;\n  font-size: 24px;\n}\n\n#mainField {\n  margin: 0 4px 8px 8px;\n  padding: 4px 0 4px 0;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.upload-btn-wrapper input[type=file] {\n  font-size: 100px;\n  position: absolute;\n  left: 0;\n  top: 0;\n  opacity: 0;\n  z-index: 99;\n}\n\n.page-footer {\n  border-top: 1px solid #ccc;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vaW1wb3J0LWV4cG9ydC1tYW5hZ2VyL3Byb2R1Y3QtY3N2LWltcG9ydGVyL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcaW1wb3J0LWV4cG9ydC1tYW5hZ2VyXFxwcm9kdWN0LWNzdi1pbXBvcnRlclxccHJvZHVjdC1jc3YtaW1wb3J0ZXIucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9pbXBvcnQtZXhwb3J0LW1hbmFnZXIvcHJvZHVjdC1jc3YtaW1wb3J0ZXIvcHJvZHVjdC1jc3YtaW1wb3J0ZXIucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFVBQUE7QUNDRjs7QURFQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGlDQUFBO0FDQ0Y7O0FEQUU7RUFDRSxnQkFBQTtBQ0VKOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0FDQ0Y7O0FEQUU7RUFDRSxnQkFBQTtBQ0VKOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSwyQkFBQTtFQUNBLGlDQUFBO0FDQ0Y7O0FEQUU7RUFDRSxnQkFBQTtBQ0VKOztBREdFO0VBQ0Usa0JBQUE7QUNBSjs7QURJQTtFQUNFLGFBQUE7RUFDQSxlQUFBO0FDREY7O0FESUE7RUFDRSxxQkFBQTtFQUNBLG9CQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7QUNERjs7QURJQTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxPQUFBO0VBQ0EsTUFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0FDREY7O0FER0E7RUFDRSwwQkFBQTtBQ0FGIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vaW1wb3J0LWV4cG9ydC1tYW5hZ2VyL3Byb2R1Y3QtY3N2LWltcG9ydGVyL3Byb2R1Y3QtY3N2LWltcG9ydGVyLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluLWNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgcGFkZGluZzogMDtcclxufVxyXG5cclxuI3Njcm9sbDEge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiA3NXZoO1xyXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICAmOmhvdmVyIHtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgfVxyXG59XHJcblxyXG4jc2Nyb2xsMiB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDg2dmg7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxufVxyXG5cclxuI3Njcm9sbCB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxMDdweCk7XHJcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICY6aG92ZXIge1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICB9XHJcbn1cclxuXHJcbi5zZWN0aW9uQXJlYXtcclxuICBoMiB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG59XHJcblxyXG5oMiB7XHJcbiAgbWFyZ2luLXRvcDogMDtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbn1cclxuXHJcbiNtYWluRmllbGQge1xyXG4gIG1hcmdpbjogMCA0cHggOHB4IDhweDtcclxuICBwYWRkaW5nOiA0cHggMCA0cHggMDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcblxyXG4udXBsb2FkLWJ0bi13cmFwcGVyIGlucHV0W3R5cGU9ZmlsZV0ge1xyXG4gIGZvbnQtc2l6ZTogMTAwcHg7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGxlZnQ6IDA7XHJcbiAgdG9wOiAwO1xyXG4gIG9wYWNpdHk6IDA7XHJcbiAgei1pbmRleDogOTk7XHJcbn1cclxuLnBhZ2UtZm9vdGVye1xyXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjO1xyXG59IiwiLm1haW4tY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbiNzY3JvbGwxIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA3NXZoO1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG4jc2Nyb2xsMTpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbiNzY3JvbGwyIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA4NnZoO1xufVxuI3Njcm9sbDI6aG92ZXIge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG4jc2Nyb2xsIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTA3cHgpO1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG4jc2Nyb2xsOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuLnNlY3Rpb25BcmVhIGgyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5oMiB7XG4gIG1hcmdpbi10b3A6IDA7XG4gIGZvbnQtc2l6ZTogMjRweDtcbn1cblxuI21haW5GaWVsZCB7XG4gIG1hcmdpbjogMCA0cHggOHB4IDhweDtcbiAgcGFkZGluZzogNHB4IDAgNHB4IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cblxuLnVwbG9hZC1idG4td3JhcHBlciBpbnB1dFt0eXBlPWZpbGVdIHtcbiAgZm9udC1zaXplOiAxMDBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIG9wYWNpdHk6IDA7XG4gIHotaW5kZXg6IDk5O1xufVxuXG4ucGFnZS1mb290ZXIge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2NjYztcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/import-export-manager/product-csv-importer/product-csv-importer.page.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/product-csv-importer/product-csv-importer.page.ts ***!
  \***********************************************************************************************/
/*! exports provided: ProductCsvImporterPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCsvImporterPage", function() { return ProductCsvImporterPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/import-export-manager/import-export-manager.service */ "./src/app/services/import-export-manager/import-export-manager.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var ngx_papaparse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-papaparse */ "./node_modules/ngx-papaparse/fesm5/ngx-papaparse.js");
/* harmony import */ var _csv_import_rules_csv_import_rules_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../csv-import-rules/csv-import-rules.page */ "./src/app/admin/import-export-manager/csv-import-rules/csv-import-rules.page.ts");











var ProductCsvImporterPage = /** @class */ (function () {
    function ProductCsvImporterPage(router, route, sharedService, importExportManagerService, toastController, papa, afs, modalController) {
        this.router = router;
        this.route = route;
        this.sharedService = sharedService;
        this.importExportManagerService = importExportManagerService;
        this.toastController = toastController;
        this.papa = papa;
        this.afs = afs;
        this.modalController = modalController;
        this.buttonState = '';
        this.prodLength = 0;
        this.detectedFields = [];
        this.allCategories = [];
        this.allSubCategories = [];
        this.allVendors = [];
        this.allBrands = [];
        this.allFilters = [];
        this.allFields = ['Sku', 'Name', 'Barcode', 'Active', 'Is Variant', 'Type of Variant', 'Variant Value', 'Variant Name', 'Price', 'Discounted Price', 'Purchase Price', 'Vendor Phone Number', 'Stocks', 'Shipping Weight', 'Minimum Quantity', 'Maximum Quantity', 'Product Description', 'HSN Code', 'GST', 'Color', 'keywords', 'Out of Stock', 'Categories', 'Brands', 'Filters'];
        this.allCSVProducts = [];
        this.totalProcessed = 0;
        this.needBrands = false;
        this.needCategories = false;
        this.isProgressBarActive = false;
    }
    ProductCsvImporterPage.prototype.ngOnInit = function () { };
    ProductCsvImporterPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _f.sent();
                        this.buttonState = 'Upload';
                        _a = this;
                        return [4 /*yield*/, this.importExportManagerService.getAllCategories()];
                    case 2:
                        _a.allCategories = _f.sent();
                        _b = this;
                        return [4 /*yield*/, this.importExportManagerService.getAllSubCategories()];
                    case 3:
                        _b.allSubCategories = _f.sent();
                        _c = this;
                        return [4 /*yield*/, this.importExportManagerService.getAllBrands()];
                    case 4:
                        _c.allBrands = _f.sent();
                        _d = this;
                        return [4 /*yield*/, this.importExportManagerService.getAllVendors()];
                    case 5:
                        _d.allVendors = _f.sent();
                        _e = this;
                        return [4 /*yield*/, this.importExportManagerService.getAllFilters()];
                    case 6:
                        _e.allFilters = _f.sent();
                        console.log('allFilters : ', this.allFilters);
                        return [4 /*yield*/, this.sharedService.loading.dismiss()];
                    case 7:
                        _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductCsvImporterPage.prototype.presentToast = function (message) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductCsvImporterPage.prototype.presentToastWithOptions = function (header, message, errorCode) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            mode: 'ios',
                            color: 'dark',
                            header: header,
                            message: message,
                            duration: 5000,
                            position: 'top',
                            buttons: [
                                {
                                    side: 'start',
                                    text: errorCode,
                                    handler: function () {
                                        console.log('Favorite clicked');
                                    }
                                }, {
                                    text: 'Done',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
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
    ProductCsvImporterPage.prototype.openCSVImportRules = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _csv_import_rules_csv_import_rules_page__WEBPACK_IMPORTED_MODULE_9__["CsvImportRulesPage"],
                            cssClass: 'custom-modalFull',
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductCsvImporterPage.prototype.getCSVHeaderValue = function (field) {
        switch (field) {
            case 'Sku':
                return 'sku';
                break;
            case 'Name':
                return 'name';
                break;
            case 'Barcode':
                return 'barcodeNo';
                break;
            case 'Active':
                return 'active';
                break;
            case 'Is Variant':
                return 'variants';
                break;
            case 'Type of Variant':
                return 'variantType';
                break;
            case 'Variant Name':
                return 'variantName';
                break;
            case 'Variant Value':
                return 'variantValue';
                break;
            case 'Price':
                return 'price';
                break;
            case 'Discounted Price':
                return 'discountedPrice';
                break;
            case 'Purchase Price':
                return 'purchasePrice';
                break;
            case 'Vendor Phone Number':
                return 'vendorPhoneNo';
                break;
            case 'Stocks':
                return 'quantity';
                break;
            case 'Shipping Weight':
                return 'shippingWt';
                break;
            case 'Minimum Quantity':
                return 'minQuantity';
                break;
            case 'Maximum Quantity':
                return 'maxQuantity';
                break;
            case 'Product Description':
                return 'prodDescription';
                break;
            case 'HSN Code':
                return 'hsnCode';
                break;
            case 'GST':
                return 'gst';
                break;
            case 'Color':
                return 'color';
                break;
            case 'Keywords':
                return 'keywords';
                break;
            case 'Out of Stock':
                return 'out_of_stock';
                break;
            case 'Categories':
                return 'catSubcat';
                break;
            case 'Brands':
                return 'brands';
                break;
            case 'Filters':
                return 'filters';
            default: // experimental
                return field;
        }
    };
    ProductCsvImporterPage.prototype.checkValidCSV = function (event, jsonData) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _loop_1, this_1, _i, _a, mainField, state_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!event.target.files[0].name.includes('.csv')) return [3 /*break*/, 5];
                        _loop_1 = function (mainField) {
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!this_1.allFields.some(function (field) { return field === mainField; })) return [3 /*break*/, 1];
                                        return [2 /*return*/, { value: true }];
                                    case 1: return [4 /*yield*/, this_1.presentToastWithOptions('Invalid CSV Column(s)!', 'Pls Check the CSV before uploading.', 'ERR-191')];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/, { value: false }];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = jsonData[0];
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        mainField = _a[_i];
                        return [5 /*yield**/, _loop_1(mainField)];
                    case 2:
                        state_1 = _b.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.presentToastWithOptions('Invalid File Format!', 'The file should be only in [ .csv ] format.', 'ERR-190')];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ProductCsvImporterPage.prototype.getItem = function (detectedFields, csvProd) {
        // console.log('detectedFields: ', detectedFields);
        // console.log('csvProd: ', csvProd)
        var item = {};
        for (var i = 0; i < detectedFields.length; i++) {
            item[detectedFields[i].value] = csvProd[i];
        }
        // console.log('item : ', item)
        return item;
    };
    ProductCsvImporterPage.prototype.checkProductName = function (allCSVProducts) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var i;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('ddddd : ', allCSVProducts);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < allCSVProducts.length)) return [3 /*break*/, 4];
                        console.log('eeeee : ', i + 1, allCSVProducts[i][1]);
                        if (!(allCSVProducts[i][1] && allCSVProducts[i][1].length > 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.presentToastWithOptions('Invalid Product Name!', "Product - \" " + JSON.stringify(allCSVProducts[i][1]) + " \", Name exceeding 200 character limit!", 'ERR-195')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    ProductCsvImporterPage.prototype.importProductsHandler = function (event, state) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var jsonData, csv, options, _i, _a, field, chunkCount, i, catList_1, brandsRef, brandsSnap, brandsDocs, catgeoryRef, catgeorySnap, catDocs, i, subcatgeoryRef, subcatgeorySnap, subCatDocs, vendorId, vendorName, _loop_2, this_2, i_1;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jsonData = [];
                        if (state === 'Upload') {
                            this.totalProcessed = 0;
                            this.allCSVProducts = [];
                            csv = event.target.files[0];
                            console.log('csv : ', csv);
                            options = {
                                complete: function (result, file) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                    var validity, _i, _a, field, _b;
                                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                jsonData = result.data;
                                                return [4 /*yield*/, this.checkValidCSV(event, jsonData)];
                                            case 1:
                                                validity = _c.sent();
                                                console.log('validity : ', validity);
                                                if (!validity) return [3 /*break*/, 4];
                                                console.log('jsonData : ', jsonData);
                                                this.detectedFields = [];
                                                this.prodLength = jsonData.length - 1;
                                                console.log('this.prodLength : ', this.prodLength);
                                                for (_i = 0, _a = jsonData[0]; _i < _a.length; _i++) {
                                                    field = _a[_i];
                                                    this.detectedFields.push({
                                                        name: field,
                                                        value: this.getCSVHeaderValue(field),
                                                        active: false
                                                    });
                                                }
                                                console.log('detectedFields : ', this.detectedFields);
                                                this.allCSVProducts = jsonData;
                                                // * Remove headers
                                                this.allCSVProducts.shift();
                                                this.allCSVProducts.splice(-1, 1);
                                                _b = this.detectedFields.length;
                                                if (!_b) return [3 /*break*/, 3];
                                                return [4 /*yield*/, this.checkProductName(this.allCSVProducts)];
                                            case 2:
                                                _b = (_c.sent());
                                                _c.label = 3;
                                            case 3:
                                                if (_b) {
                                                    this.buttonState = 'Import';
                                                }
                                                _c.label = 4;
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                }); }
                            };
                            this.papa.parse(csv, options);
                        }
                        if (!(state === 'Import')) return [3 /*break*/, 18];
                        console.log('importing');
                        return [4 /*yield*/, this.presentToastWithOptions('NOTE', 'Please do not close this tab while products are being imported!', 'WR-19')];
                    case 1:
                        _b.sent();
                        for (_i = 0, _a = this.detectedFields; _i < _a.length; _i++) {
                            field = _a[_i];
                            field.active = true;
                        }
                        console.log('this.detectedFields.length : ' + this.detectedFields.length);
                        console.log('this.allCSVProducts.length : ' + this.allCSVProducts.length);
                        chunkCount = 0;
                        if (!(this.allCSVProducts && this.allCSVProducts.length)) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.sharedService.presentLoading("Please Wait...", 1000000)];
                    case 2:
                        _b.sent();
                        console.log(this.allCSVProducts);
                        for (i = 0; i < this.allCSVProducts.length; i++) {
                            // if (this.allCSVProducts[i][20] && this.allCSVProducts[i][20] != '') {
                            this.needCategories = true;
                            // }
                            // if (this.allCSVProducts[i][21] && this.allCSVProducts[i][21] != '') {
                            this.needBrands = true;
                            // }
                        }
                        catList_1 = [];
                        if (!(!this.brands && this.needBrands)) return [3 /*break*/, 4];
                        this.brands = {};
                        brandsRef = this.afs.collection('brands');
                        brandsSnap = brandsRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (actions) { return actions.map(function (a) {
                            var data = a.payload.doc.data();
                            var id = a.payload.doc.id;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                        }); }));
                        return [4 /*yield*/, brandsSnap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])()).toPromise()];
                    case 3:
                        brandsDocs = _b.sent();
                        brandsDocs.forEach(function (brand) {
                            if (brand.name) {
                                _this.brands[(brand.name || '').toLowerCase().trim()] = brand.id;
                            }
                        });
                        _b.label = 4;
                    case 4:
                        if (!(!this.categories && this.needCategories)) return [3 /*break*/, 9];
                        this.categories = {};
                        catgeoryRef = this.afs.collection('categories');
                        catgeorySnap = catgeoryRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (actions) { return actions.map(function (a) {
                            var data = a.payload.doc.data();
                            var id = a.payload.doc.id;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                        }); }));
                        return [4 /*yield*/, catgeorySnap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])()).toPromise()];
                    case 5:
                        catDocs = _b.sent();
                        catDocs.forEach(function (cat) {
                            _this.categories[cat.name.toLowerCase().trim()] = { id: cat.id, subcategories: {} };
                            catList_1.push({ id: cat.id, name: cat.name.toLowerCase().trim() });
                        });
                        i = 0;
                        _b.label = 6;
                    case 6:
                        if (!(i < catList_1.length)) return [3 /*break*/, 9];
                        subcatgeoryRef = this.afs.collection('categories').doc(catList_1[i]['id']).collection('subcategories');
                        subcatgeorySnap = subcatgeoryRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (actions) { return actions.map(function (a) {
                            var data = a.payload.doc.data();
                            var id = a.payload.doc.id;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                        }); }));
                        return [4 /*yield*/, subcatgeorySnap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])()).toPromise()];
                    case 7:
                        subCatDocs = _b.sent();
                        subCatDocs.forEach(function (cat) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                this.categories[catList_1[i]['name']]['subcategories'][cat.name.toLowerCase().trim()] = cat.id;
                                return [2 /*return*/];
                            });
                        }); });
                        _b.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 6];
                    case 9:
                        vendorId = '', vendorName = '';
                        this.isProgressBarActive = true;
                        _loop_2 = function (i_1) {
                            var item, orgProduct, prodId_1, product_1, formattedSKU_1, prodRef, productsSnap, pdtDocs, unformatted_1, vendorData, variantItems, variantValues, priceItems, discountedPriceItems, purchasePriceItems, quantityItems, shippingItems, bds, cats, providedFilterData, filter, i_2, filterData, filterName, filterValues, j, _loop_3, i_3, colorVals, keywords, providedFilterData, filter, i_4, filterData, filterName, filterValues, j, _loop_4, i_5, bds, cats, colorVals, keywords, variantItems, priceItems_1, discountedPriceItems_1, purchasePriceItems_1, quantityItems_1, shippingItems_1, variantNames_1;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        item = this_2.getItem(this_2.detectedFields, this_2.allCSVProducts[i_1]);
                                        orgProduct = {};
                                        if (!item['sku']) return [3 /*break*/, 3];
                                        prodId_1 = null, product_1 = {};
                                        formattedSKU_1 = '';
                                        if (item['sku'].includes('\t')) {
                                            formattedSKU_1 = item['sku'].slice(1);
                                        }
                                        else {
                                            formattedSKU_1 = item['sku'];
                                        }
                                        prodRef = this_2.afs.collection("products", function (ref) { return ref.where("productCode", "==", formattedSKU_1); });
                                        productsSnap = prodRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (actions) { return actions.map(function (a) {
                                            var data = a.payload.doc.data();
                                            var id = a.payload.doc.id;
                                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: id }, data);
                                        }); }));
                                        return [4 /*yield*/, productsSnap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])()).toPromise()];
                                    case 1:
                                        pdtDocs = _a.sent();
                                        // console.log('pdtDocs : ', pdtDocs);
                                        if (pdtDocs) {
                                            pdtDocs.forEach(function (pdt) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                                    prodId_1 = pdt.id;
                                                    orgProduct = pdt;
                                                    return [2 /*return*/];
                                                });
                                            }); });
                                        }
                                        unformatted_1 = '';
                                        if (item['vendorPhoneNo']) {
                                            unformatted_1 = item['vendorPhoneNo'].slice(1);
                                            unformatted_1 = unformatted_1.slice(0, -1);
                                            // console.log('unformatted : ', unformatted.trim());
                                            if (this_2.allVendors.some(function (v) { return v.phoneNo === unformatted_1.trim(); })) {
                                                vendorData = this_2.allVendors.find(function (v) { return v.phoneNo === unformatted_1.trim(); });
                                                vendorId = vendorData.id;
                                                vendorName = vendorData.name;
                                            }
                                            // console.log('vendorId : ', vendorId)
                                            // console.log('vendorName : ', vendorName)
                                        }
                                        if (prodId_1) {
                                            // if (productCode == item.sku) {
                                            //   console.log('match : ', item.name);
                                            //   matchingProds.push(item.name)
                                            //   console.log('mprds', matchingProds);
                                            //   if (matchingProds.length <= matchingProds.length - 1) {
                                            //     this.presentAlert('SKU already exists!', `Products with matching SKU Code are as follows :- ${matchingProds}`)
                                            //   }
                                            // }          
                                            if (item['name'] && item['name'].trim() != '') {
                                                product_1['prodName'] = item['name'] ? item['name'].trim() : '';
                                                product_1['nameToSearch'] = item['name'] ? item['name'].trim() : '';
                                            }
                                            if (item['active'] && item['active'].trim() != '') {
                                                product_1['status'] = item['active'] && item['active'].toLowerCase() == 'yes' ? true : false;
                                            }
                                            if (item['barcodeNo'] && item['barcodeNo'].trim() != '') {
                                                product_1['barcodeNo'] = item['barcodeNo'] ? item['barcodeNo'].trim() : '';
                                            }
                                            // console.log('vendor id : ', vendorId)
                                            // console.log('vendor name : ', vendorName)
                                            if (item['vendorPhoneNo'] && (item['vendorPhoneNo'].trim() != '')) {
                                                product_1['vendorId'] = vendorId ? vendorId : '';
                                                product_1['vendorName'] = vendorName ? vendorName : '';
                                            }
                                            product_1['updatedAt'] = new Date();
                                            product_1['productType'] = '';
                                            product_1['isPriceList'] = item['variants'] && item['variants'].toLowerCase() == 'yes' ? true : orgProduct && orgProduct.isPriceList ? orgProduct.isPriceList : false;
                                            if (!product_1['isPriceList']) {
                                                if (item['discountedPrice'] && item['discountedPrice'].trim() != '') {
                                                    product_1['discountedPrice'] = item['discountedPrice'] ? parseFloat(item['discountedPrice'].trim()) : parseFloat(item['price'].trim());
                                                }
                                                if (item['price'] && item['price'].trim() != '') {
                                                    product_1['prodPrice'] = parseFloat(item['price'].trim());
                                                }
                                                if (item['quantity'] && item['quantity'].trim() != '') {
                                                    product_1['productQty'] = item['quantity'] ? item['quantity'].trim() : 0;
                                                }
                                                if (item['shippingWt'] && item['shippingWt'].trim() != '') {
                                                    product_1['shippingWeight'] = parseInt(item['shippingWt'].trim());
                                                }
                                                if (item['purchasePrice'] && item['purchasePrice'].trim() != '') {
                                                    product_1['purchasePrice'] = parseFloat(item['purchasePrice'].trim());
                                                }
                                            }
                                            else {
                                                product_1['priceList'] = orgProduct.priceList ? orgProduct.priceList : [];
                                                if (item['variantName'] && item['variantName'].trim() != '') {
                                                    variantItems = item['variantName'].split(',');
                                                    variantItems.forEach(function (variant, index) {
                                                        if (!product_1['priceList'][index]) {
                                                            product_1['priceList'][index] = {};
                                                        }
                                                        product_1['priceList'][index]['name'] = variant.trim();
                                                    });
                                                }
                                                if (item['variantValue'] && item['variantValue'].trim() != '') {
                                                    variantValues = item['variantValue'].split(',');
                                                    variantValues.forEach(function (variant, index) {
                                                        if (!product_1['priceList'][index]) {
                                                            product_1['priceList'][index] = {};
                                                        }
                                                        product_1['priceList'][index]['weight'] = variant.trim();
                                                    });
                                                }
                                                if (item['price'] && item['price'].trim() != '') {
                                                    priceItems = item['price'].split(',');
                                                    priceItems.forEach(function (price, index) {
                                                        if (!product_1['priceList'][index]) {
                                                            product_1['priceList'][index] = {};
                                                        }
                                                        product_1['priceList'][index]['price'] = price ? parseFloat(price.trim()) : 0;
                                                    });
                                                }
                                                if (item['discountedPrice'] && item['discountedPrice'].trim() != '') {
                                                    discountedPriceItems = item['discountedPrice'].split(',');
                                                    discountedPriceItems.forEach(function (discountedPrice, index) {
                                                        if (!product_1['priceList'][index]) {
                                                            product_1['priceList'][index] = {};
                                                        }
                                                        product_1['priceList'][index]['discountedPrice'] = discountedPrice ? parseFloat(discountedPrice.trim()) : product_1['priceList'][index]['price'] ? parseFloat(product_1['priceList'][index]['price'].trim()) : 0;
                                                    });
                                                }
                                                if (item['purchasePrice'] && item['purchasePrice'].trim() != '') {
                                                    purchasePriceItems = item['purchasePrice'].split(',');
                                                    purchasePriceItems.forEach(function (purchasePrice, index) {
                                                        if (!product_1['priceList'][index]) {
                                                            product_1['priceList'][index] = {};
                                                        }
                                                        product_1['priceList'][index]['purchasePrice'] = purchasePrice ? parseFloat(purchasePrice.trim()) : 0;
                                                    });
                                                }
                                                if (item['quantity'] && item['quantity'].trim() != '') {
                                                    quantityItems = item['quantity'].split(',');
                                                    quantityItems.forEach(function (quantity, index) {
                                                        if (!product_1['priceList'][index]) {
                                                            product_1['priceList'][index] = {};
                                                        }
                                                        product_1['priceList'][index]['totalQuantity'] = quantity ? quantity.trim() : '0';
                                                    });
                                                }
                                                if (item['shippingWt'] && item['shippingWt'].trim() != '') {
                                                    shippingItems = item['shippingWt'].split(',');
                                                    shippingItems.forEach(function (shippingWt, index) {
                                                        if (!product_1['priceList'][index]) {
                                                            product_1['priceList'][index] = {};
                                                        }
                                                        product_1['priceList'][index]['shippingWeight'] = shippingWt ? shippingWt.trim() : '0';
                                                    });
                                                }
                                            }
                                            if (item['variantType'] && item['variantType'].trim() != '') {
                                                product_1['variantType'] = item['variantType'] ? item['variantType'].trim() : 'other';
                                            }
                                            if (item['prodDescription'] && item['prodDescription'].trim() != '') {
                                                product_1['prodDesc'] = item['prodDescription'] ? item['prodDescription'].trim() : '';
                                            }
                                            if (item['hsnCode'] && item['hsnCode'].trim() != '') {
                                                product_1['hsnCode'] = item['hsnCode'] ? item['hsnCode'].trim() : '';
                                            }
                                            if (item['gst'] && item['gst'].trim() != '') {
                                                product_1['gst'] = item['gst'] ? item['gst'] : 0;
                                            }
                                            if (item['brands'] && item['brands'].trim() != '') {
                                                product_1['brands'] = [];
                                                bds = item['brands'].split(";");
                                                bds.forEach(function (brand) {
                                                    brand = brand.toLowerCase().trim();
                                                    if (_this.brands[brand]) {
                                                        product_1['brands'].push(_this.brands[brand]);
                                                    }
                                                });
                                            }
                                            if (item['catSubcat'] && item['catSubcat'].trim() != '') {
                                                product_1['categories'] = [];
                                                cats = item['catSubcat'].split(";");
                                                // console.log(cats);
                                                cats.forEach(function (cat) {
                                                    cat = cat.toLowerCase().trim();
                                                    var catsubcat = cat.split("-");
                                                    if (catsubcat[0]) {
                                                        catsubcat[0] = catsubcat[0].trim();
                                                    }
                                                    if (catsubcat[1]) {
                                                        catsubcat[1] = catsubcat[1].trim();
                                                    }
                                                    if (catsubcat[0] && _this.categories[catsubcat[0]] && _this.categories[catsubcat[0]]['id'] && product_1['categories'].indexOf(_this.categories[catsubcat[0]]['id']) < 0) {
                                                        product_1['categories'].push(_this.categories[catsubcat[0]]['id']);
                                                    }
                                                    if (catsubcat[1] && _this.categories[catsubcat[0]] && _this.categories[catsubcat[0]]['id'] && _this.categories[catsubcat[0]]['subcategories'] && _this.categories[catsubcat[0]]['subcategories'][catsubcat[1]] && product_1['categories'].indexOf(_this.categories[catsubcat[0]]['subcategories'][catsubcat[1]]) < 0) {
                                                        product_1['categories'].push(_this.categories[catsubcat[0]]['subcategories'][catsubcat[1]]);
                                                    }
                                                    // console.log(product['categories']);
                                                });
                                            }
                                            if (item['filters'] && item['filters'].trim() != '') {
                                                providedFilterData = item['filters'].split('|');
                                                filter = {};
                                                for (i_2 = 0; i_2 < providedFilterData.length; i_2++) {
                                                    filterData = providedFilterData[i_2].split(':');
                                                    filterName = filterData[0];
                                                    filterValues = filterData[1].split(',');
                                                    for (j = 0; j < filterValues.length; j++) {
                                                        filter[filterName] = filterValues.slice();
                                                    }
                                                }
                                                console.log('provided filter : ', filter);
                                                // *** Verify Filters ***
                                                if (this_2.allFilters.length) {
                                                    product_1['filters'] = {};
                                                    _loop_3 = function (i_3) {
                                                        if (filter[this_2.allFilters[i_3].name]) {
                                                            console.log('filters : ', filter[this_2.allFilters[i_3].name]);
                                                            var valueState = filter[this_2.allFilters[i_3].name].every(function (el) { return _this.allFilters[i_3].value.includes(el); });
                                                            if (valueState) {
                                                                product_1['filters'][this_2.allFilters[i_3].name] = filter[this_2.allFilters[i_3].name];
                                                            }
                                                        }
                                                    };
                                                    for (i_3 = 0; i_3 < this_2.allFilters.length; i_3++) {
                                                        _loop_3(i_3);
                                                    }
                                                    console.log('Final filters : ', product_1['filters']);
                                                }
                                            }
                                            if (item['color'] && item['color'].trim() != '') {
                                                colorVals = item['color'].split(',');
                                                product_1['color'] = {
                                                    code: colorVals[1] ? colorVals[1].trim() : '',
                                                    name: colorVals[0] ? colorVals[0].trim() : ''
                                                };
                                            }
                                            if (item['keywords'] && item['keywords'].trim() != '') {
                                                product_1['searchKeywords'] = [];
                                                keywords = item['keywords'].split(',');
                                                keywords.forEach(function (key) {
                                                    product_1['searchKeywords'].push(key.trim());
                                                });
                                            }
                                            if (item['out_of_stock'] && item['out_of_stock'].trim() != '') {
                                                product_1['stopWhenNoQty'] = item['out_of_stock'] && item['out_of_stock'].toLowerCase() == 'yes' ? true : false;
                                            }
                                            if (item['minQuantity'] && item['minQuantity'].trim() != '') {
                                                product_1['minQty'] = item['minQuantity'] ? parseInt(item['minQuantity'].trim()) : null;
                                            }
                                            if (item['maxQuantity'] && item['maxQuantity'].trim() != '') {
                                                product_1['maxQty'] = item['maxQuantity'] ? parseInt(item['maxQuantity'].trim()) : null;
                                            }
                                            // console.log(product);
                                            this_2.totalProcessed++;
                                            this_2.afs.collection('products').doc(prodId_1).update(product_1);
                                        }
                                        else {
                                            // * CHECK IF PRODUCT IS NEW - PERFORM [ ADD ]
                                            console.log('else : ', prodId_1);
                                            product_1['productCode'] = item['sku'].trim();
                                            product_1['prodName'] = item['name'] ? item['name'].trim() : '';
                                            product_1['barcodeNo'] = item['barcodeNo'] ? item['barcodeNo'].trim() : '';
                                            console.log('vendor id else : ', vendorId);
                                            console.log('vendor name else : ', vendorName);
                                            product_1['vendorId'] = vendorId ? vendorId : '';
                                            product_1['vendorName'] = vendorName ? vendorName : '';
                                            product_1['productType'] = '';
                                            product_1['nameToSearch'] = item['name'] ? item['name'].trim() : '';
                                            product_1['createdAt'] = new Date();
                                            product_1['status'] = item['active'] && item['active'].toLowerCase() == 'yes' ? true : false;
                                            product_1['updatedAt'] = new Date();
                                            product_1['sortedAt'] = new Date();
                                            product_1['isPriceList'] = item['variants'] && item['variants'].toLowerCase() == 'yes' ? true : false;
                                            product_1['variantType'] = item['variantType'] ? item['variantType'].trim() : 'other';
                                            product_1['prodDesc'] = item['prodDescription'] ? item['prodDescription'].trim() : '';
                                            if (item['filters'] && item['filters'].trim() != '') {
                                                providedFilterData = item['filters'].split('|');
                                                filter = {};
                                                for (i_4 = 0; i_4 < providedFilterData.length; i_4++) {
                                                    filterData = providedFilterData[i_4].split(':');
                                                    filterName = filterData[0];
                                                    filterValues = filterData[1].split(',');
                                                    for (j = 0; j < filterValues.length; j++) {
                                                        filter[filterName] = filterValues.slice();
                                                    }
                                                }
                                                console.log('provided filter : ', filter);
                                                // *** Verify Filters ***
                                                if (this_2.allFilters.length) {
                                                    product_1['filters'] = {};
                                                    _loop_4 = function (i_5) {
                                                        if (filter[this_2.allFilters[i_5].name]) {
                                                            console.log('filters : ', filter[this_2.allFilters[i_5].name]);
                                                            var valueState = filter[this_2.allFilters[i_5].name].every(function (el) { return _this.allFilters[i_5].value.includes(el); });
                                                            if (valueState) {
                                                                product_1['filters'][this_2.allFilters[i_5].name] = filter[this_2.allFilters[i_5].name];
                                                            }
                                                        }
                                                    };
                                                    for (i_5 = 0; i_5 < this_2.allFilters.length; i_5++) {
                                                        _loop_4(i_5);
                                                    }
                                                    console.log('Final filters : ', product_1['filters']);
                                                }
                                            }
                                            product_1['hsnCode'] = item['hsnCode'] ? item['hsnCode'].trim() : '';
                                            product_1['gst'] = item['gst'] ? item['gst'] : 0;
                                            product_1['categories'] = [];
                                            if (item['brands'] && item['brands'].trim() != '') {
                                                product_1['brands'] = [];
                                                bds = item['brands'].split(";");
                                                bds.forEach(function (brand) {
                                                    brand = brand.toLowerCase().trim();
                                                    if (_this.brands[brand]) {
                                                        product_1['brands'].push(_this.brands[brand]);
                                                    }
                                                });
                                            }
                                            if (item['catSubcat'] && item['catSubcat'].trim() != '') {
                                                product_1['categories'] = [];
                                                cats = item['catSubcat'].split(";");
                                                cats.forEach(function (cat) {
                                                    cat = cat.toLowerCase().trim();
                                                    var catsubcat = cat.split("-");
                                                    if (catsubcat[0]) {
                                                        catsubcat[0] = catsubcat[0].trim();
                                                    }
                                                    if (catsubcat[1]) {
                                                        catsubcat[1] = catsubcat[1].trim();
                                                    }
                                                    if (catsubcat[0] && _this.categories[catsubcat[0]] && _this.categories[catsubcat[0]]['id'] && product_1['categories'].indexOf(_this.categories[catsubcat[0]]['id']) < 0) {
                                                        product_1['categories'].push(_this.categories[catsubcat[0]]['id']);
                                                    }
                                                    if (catsubcat[1] && _this.categories[catsubcat[0]] && _this.categories[catsubcat[0]]['id'] && _this.categories[catsubcat[0]]['subcategories'] && _this.categories[catsubcat[0]]['subcategories'][catsubcat[1]] && product_1['categories'].indexOf(_this.categories[catsubcat[0]]['subcategories'][catsubcat[1]]) < 0) {
                                                        product_1['categories'].push(_this.categories[catsubcat[0]]['subcategories'][catsubcat[1]]);
                                                    }
                                                });
                                            }
                                            product_1['images'] = [];
                                            product_1['coverPic'] = {
                                                url: 'assets/img/placeholder-img.jpg',
                                                mob: 'assets/img/placeholder-img.jpg',
                                                thumb: 'assets/img/placeholder-img.jpg'
                                            };
                                            if (item['color']) {
                                                colorVals = item['color'].split(',');
                                                product_1['color'] = {
                                                    code: colorVals[1] ? colorVals[1].trim() : '',
                                                    name: colorVals[0] ? colorVals[0].trim() : ''
                                                };
                                            }
                                            else {
                                                product_1['color'] = {};
                                            }
                                            product_1['searchKeywords'] = [];
                                            if (item['keywords']) {
                                                keywords = item['keywords'].split(',');
                                                keywords.forEach(function (key) {
                                                    product_1['searchKeywords'].push(key.trim());
                                                });
                                            }
                                            product_1['stopWhenNoQty'] = item['out_of_stock'] && item['out_of_stock'].toLowerCase() == 'yes' ? true : false;
                                            product_1['minQty'] = item['minQuantity'] ? parseInt(item['minQuantity'].trim()) : null;
                                            product_1['maxQty'] = item['maxQuantity'] ? parseInt(item['maxQuantity'].trim()) : null;
                                            product_1['priceList'] = [];
                                            if (!product_1['isPriceList']) {
                                                product_1['discountedPrice'] = item['discountedPrice'] ? parseFloat(item['discountedPrice'].trim()) : parseFloat(item['price'].trim());
                                                product_1['prodPrice'] = item['price'] ? parseFloat(item['price'].trim()) : 0;
                                                product_1['purchasePrice'] = item['purchasePrice'] ? parseFloat(item['purchasePrice'].trim()) : 0;
                                                product_1['productQty'] = item['quantity'] ? item['quantity'].trim() : 0;
                                                product_1['shippingWeight'] = item['shippingWt'] ? item['shippingWt'].trim() : null;
                                            }
                                            else {
                                                if (item['variantName']) {
                                                    variantItems = item['variantValue'].split(',');
                                                    priceItems_1 = item['price'].split(',');
                                                    discountedPriceItems_1 = item['discountedPrice'].split(',');
                                                    purchasePriceItems_1 = item['purchasePrice'].split(',');
                                                    quantityItems_1 = item['quantity'].split(',');
                                                    shippingItems_1 = item['shippingWt'].split(',');
                                                    variantNames_1 = item['variantName'] ? item['variantName'].split(',') : [null];
                                                    variantItems.forEach(function (variant, index) {
                                                        product_1['priceList'].push({
                                                            price: priceItems_1[index] ? parseFloat(priceItems_1[index].trim()) : 0,
                                                            discountedPrice: discountedPriceItems_1[index] ? parseFloat(discountedPriceItems_1[index].trim()) : priceItems_1[index] ? parseFloat(priceItems_1[index].trim()) : 0,
                                                            purchasePrice: purchasePriceItems_1[index] ? parseFloat(purchasePriceItems_1[index].trim()) : 0,
                                                            weight: variant.trim(),
                                                            totalQuantity: quantityItems_1[index] ? quantityItems_1[index].trim() : '0',
                                                            shippingWeight: shippingItems_1[index] ? shippingItems_1[index].trim() : '',
                                                            name: variantNames_1[index] ? variantNames_1[index].trim() : ''
                                                        });
                                                    });
                                                }
                                            }
                                            // console.log(product);
                                            this_2.totalProcessed++;
                                            this_2.afs.collection('products').add(product_1);
                                        }
                                        return [4 /*yield*/, this_2.sharedService.loading.dismiss()];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_2 = this;
                        i_1 = 0;
                        _b.label = 10;
                    case 10:
                        if (!(i_1 < this.allCSVProducts.length)) return [3 /*break*/, 13];
                        return [5 /*yield**/, _loop_2(i_1)];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12:
                        i_1++;
                        return [3 /*break*/, 10];
                    case 13: return [4 /*yield*/, this.sharedService.loading.dismiss()];
                    case 14:
                        _b.sent();
                        this.isProgressBarActive = false;
                        return [4 /*yield*/, this.presentToastWithOptions('Success!', 'Product imported successfully', 'SC-101')];
                    case 15:
                        _b.sent();
                        this.detectedFields = [];
                        this.buttonState = "Upload";
                        return [3 /*break*/, 18];
                    case 16:
                        this.isProgressBarActive = false;
                        return [4 /*yield*/, this.presentToastWithOptions('Error in Processing File!', 'Please try again later.', 'ERR-192')];
                    case 17:
                        _b.sent();
                        _b.label = 18;
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    ProductCsvImporterPage.prototype.saveDisable = function () {
        if (this.buttonState === 'Upload') {
            return false;
        }
        else if (this.buttonState === 'Import') {
            return false;
        }
        else {
            return true;
        }
    };
    ProductCsvImporterPage.prototype.calcProcessedEntities = function () {
        // console.log('this.allCSVProducts.length', this.allCSVProducts.length)
        if (this.allCSVProducts.length - 1 === -1) {
            return 0;
        }
        else {
            return this.allCSVProducts.length;
        }
    };
    ProductCsvImporterPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__["SharedService"] },
        { type: src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_5__["ImportExportManagerService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
        { type: ngx_papaparse__WEBPACK_IMPORTED_MODULE_8__["Papa"] },
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] }
    ]; };
    ProductCsvImporterPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-product-csv-importer',
            template: __webpack_require__(/*! raw-loader!./product-csv-importer.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/product-csv-importer/product-csv-importer.page.html"),
            styles: [__webpack_require__(/*! ./product-csv-importer.page.scss */ "./src/app/admin/import-export-manager/product-csv-importer/product-csv-importer.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__["SharedService"],
            src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_5__["ImportExportManagerService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            ngx_papaparse__WEBPACK_IMPORTED_MODULE_8__["Papa"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]])
    ], ProductCsvImporterPage);
    return ProductCsvImporterPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-import-export-manager-product-csv-importer-product-csv-importer-module-es5.js.map