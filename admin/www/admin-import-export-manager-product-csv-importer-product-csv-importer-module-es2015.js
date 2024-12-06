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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _product_csv_importer_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product-csv-importer.page */ "./src/app/admin/import-export-manager/product-csv-importer/product-csv-importer.page.ts");







const routes = [
    {
        path: '',
        component: _product_csv_importer_page__WEBPACK_IMPORTED_MODULE_6__["ProductCsvImporterPage"]
    }
];
let ProductCsvImporterPageModule = class ProductCsvImporterPageModule {
};
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/import-export-manager/import-export-manager.service */ "./src/app/services/import-export-manager/import-export-manager.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var ngx_papaparse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-papaparse */ "./node_modules/ngx-papaparse/fesm2015/ngx-papaparse.js");
/* harmony import */ var _csv_import_rules_csv_import_rules_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../csv-import-rules/csv-import-rules.page */ "./src/app/admin/import-export-manager/csv-import-rules/csv-import-rules.page.ts");











let ProductCsvImporterPage = class ProductCsvImporterPage {
    constructor(router, route, sharedService, importExportManagerService, toastController, papa, afs, modalController) {
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
    ngOnInit() { }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            this.buttonState = 'Upload';
            this.allCategories = yield this.importExportManagerService.getAllCategories();
            this.allSubCategories = yield this.importExportManagerService.getAllSubCategories();
            this.allBrands = yield this.importExportManagerService.getAllBrands();
            this.allVendors = yield this.importExportManagerService.getAllVendors();
            this.allFilters = yield this.importExportManagerService.getAllFilters();
            console.log('allFilters : ', this.allFilters);
            yield this.sharedService.loading.dismiss();
        });
    }
    presentToast(message) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: message,
                duration: 3000
            });
            toast.present();
        });
    }
    presentToastWithOptions(header, message, errorCode) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
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
                        handler: () => {
                            console.log('Favorite clicked');
                        }
                    }, {
                        text: 'Done',
                        role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked');
                        }
                    }
                ]
            });
            toast.present();
        });
    }
    openCSVImportRules() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _csv_import_rules_csv_import_rules_page__WEBPACK_IMPORTED_MODULE_9__["CsvImportRulesPage"],
                cssClass: 'custom-modalFull',
            });
            yield modal.present();
        });
    }
    getCSVHeaderValue(field) {
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
    }
    checkValidCSV(event, jsonData) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (event.target.files[0].name.includes('.csv')) {
                for (const mainField of jsonData[0]) {
                    if (this.allFields.some(field => field === mainField)) {
                        return true;
                    }
                    else {
                        yield this.presentToastWithOptions('Invalid CSV Column(s)!', 'Pls Check the CSV before uploading.', 'ERR-191');
                        return false;
                    }
                }
            }
            else {
                yield this.presentToastWithOptions('Invalid File Format!', 'The file should be only in [ .csv ] format.', 'ERR-190');
                return false;
            }
        });
    }
    getItem(detectedFields, csvProd) {
        // console.log('detectedFields: ', detectedFields);
        // console.log('csvProd: ', csvProd)
        let item = {};
        for (let i = 0; i < detectedFields.length; i++) {
            item[detectedFields[i].value] = csvProd[i];
        }
        // console.log('item : ', item)
        return item;
    }
    checkProductName(allCSVProducts) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log('ddddd : ', allCSVProducts);
            for (let i = 0; i < allCSVProducts.length; i++) {
                console.log('eeeee : ', i + 1, allCSVProducts[i][1]);
                if (allCSVProducts[i][1] && allCSVProducts[i][1].length > 200) {
                    yield this.presentToastWithOptions('Invalid Product Name!', `Product - " ${JSON.stringify(allCSVProducts[i][1])} ", Name exceeding 200 character limit!`, 'ERR-195');
                    return false;
                }
            }
            return true;
        });
    }
    importProductsHandler(event, state) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let jsonData = [];
            if (state === 'Upload') {
                this.totalProcessed = 0;
                this.allCSVProducts = [];
                let csv = event.target.files[0];
                console.log('csv : ', csv);
                let options = {
                    complete: (result, file) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                        jsonData = result.data;
                        let validity = yield this.checkValidCSV(event, jsonData);
                        console.log('validity : ', validity);
                        if (validity) {
                            console.log('jsonData : ', jsonData);
                            this.detectedFields = [];
                            this.prodLength = jsonData.length - 1;
                            console.log('this.prodLength : ', this.prodLength);
                            for (const field of jsonData[0]) {
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
                            if (this.detectedFields.length && (yield this.checkProductName(this.allCSVProducts))) {
                                this.buttonState = 'Import';
                            }
                        }
                    })
                };
                this.papa.parse(csv, options);
            }
            if (state === 'Import') {
                console.log('importing');
                yield this.presentToastWithOptions('NOTE', 'Please do not close this tab while products are being imported!', 'WR-19');
                for (const field of this.detectedFields) {
                    field.active = true;
                }
                console.log('this.detectedFields.length : ' + this.detectedFields.length);
                console.log('this.allCSVProducts.length : ' + this.allCSVProducts.length);
                let chunkCount = 0;
                if (this.allCSVProducts && this.allCSVProducts.length) {
                    yield this.sharedService.presentLoading("Please Wait...", 1000000);
                    console.log(this.allCSVProducts);
                    for (var i = 0; i < this.allCSVProducts.length; i++) {
                        // if (this.allCSVProducts[i][20] && this.allCSVProducts[i][20] != '') {
                        this.needCategories = true;
                        // }
                        // if (this.allCSVProducts[i][21] && this.allCSVProducts[i][21] != '') {
                        this.needBrands = true;
                        // }
                    }
                    let catList = [];
                    if (!this.brands && this.needBrands) {
                        this.brands = {};
                        const brandsRef = this.afs.collection('brands');
                        const brandsSnap = brandsRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(actions => actions.map(a => {
                            const data = a.payload.doc.data();
                            const id = a.payload.doc.id;
                            return Object.assign({ id }, data);
                        })));
                        const brandsDocs = yield brandsSnap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])()).toPromise();
                        brandsDocs.forEach((brand) => {
                            if (brand.name) {
                                this.brands[(brand.name || '').toLowerCase().trim()] = brand.id;
                            }
                        });
                    }
                    if (!this.categories && this.needCategories) {
                        this.categories = {};
                        const catgeoryRef = this.afs.collection('categories');
                        const catgeorySnap = catgeoryRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(actions => actions.map(a => {
                            const data = a.payload.doc.data();
                            const id = a.payload.doc.id;
                            return Object.assign({ id }, data);
                        })));
                        const catDocs = yield catgeorySnap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])()).toPromise();
                        catDocs.forEach((cat) => {
                            this.categories[cat.name.toLowerCase().trim()] = { id: cat.id, subcategories: {} };
                            catList.push({ id: cat.id, name: cat.name.toLowerCase().trim() });
                        });
                        for (var i = 0; i < catList.length; i++) {
                            const subcatgeoryRef = this.afs.collection('categories').doc(catList[i]['id']).collection('subcategories');
                            const subcatgeorySnap = subcatgeoryRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(actions => actions.map(a => {
                                const data = a.payload.doc.data();
                                const id = a.payload.doc.id;
                                return Object.assign({ id }, data);
                            })));
                            const subCatDocs = yield subcatgeorySnap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])()).toPromise();
                            subCatDocs.forEach((cat) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                                this.categories[catList[i]['name']]['subcategories'][cat.name.toLowerCase().trim()] = cat.id;
                            }));
                        }
                    }
                    let vendorId = '', vendorName = '';
                    this.isProgressBarActive = true;
                    for (let i = 0; i < this.allCSVProducts.length; i++) {
                        // let item = {
                        //   sku: this.allCSVProducts[i][0],
                        //   name: this.allCSVProducts[i][1],
                        //   barcodeNo: this.allCSVProducts[i][2],
                        //   active: this.allCSVProducts[i][3],
                        //   variants: this.allCSVProducts[i][4],
                        //   variantType: this.allCSVProducts[i][5],
                        //   variantName: this.allCSVProducts[i][6],
                        //   price: this.allCSVProducts[i][7],
                        //   vendorPhoneNo: this.allCSVProducts[i][8],
                        //   discountedPrice: this.allCSVProducts[i][9],
                        //   purchasePrice: this.allCSVProducts[i][10],
                        //   quantity: this.allCSVProducts[i][11],
                        //   shippingWt: this.allCSVProducts[i][12],
                        //   minQuantity: this.allCSVProducts[i][13],
                        //   maxQuantity: this.allCSVProducts[i][14],
                        //   productDescription: this.allCSVProducts[i][15],
                        //   hsnCode: this.allCSVProducts[i][16],
                        //   gst: this.allCSVProducts[i][17],
                        //   color: this.allCSVProducts[i][18],
                        //   keywords: this.allCSVProducts[i][19],
                        //   out_of_stock: this.allCSVProducts[i][20],
                        //   catSubcat: this.allCSVProducts[i][21],
                        //   brands: this.allCSVProducts[i][22],
                        // }
                        let item = this.getItem(this.detectedFields, this.allCSVProducts[i]);
                        // console.log('item2 : ', item)
                        let orgProduct = {};
                        if (item['sku']) {
                            let prodId = null, product = {};
                            let formattedSKU = '';
                            if (item['sku'].includes('\t')) {
                                formattedSKU = item['sku'].slice(1);
                            }
                            else {
                                formattedSKU = item['sku'];
                            }
                            const prodRef = this.afs.collection("products", ref => ref.where("productCode", "==", formattedSKU));
                            const productsSnap = prodRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(actions => actions.map(a => {
                                const data = a.payload.doc.data();
                                const id = a.payload.doc.id;
                                return Object.assign({ id }, data);
                            })));
                            const pdtDocs = yield productsSnap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])()).toPromise();
                            // console.log('pdtDocs : ', pdtDocs);
                            if (pdtDocs) {
                                pdtDocs.forEach((pdt) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                                    prodId = pdt.id;
                                    orgProduct = pdt;
                                }));
                            }
                            let unformatted = '';
                            if (item['vendorPhoneNo']) {
                                unformatted = item['vendorPhoneNo'].slice(1);
                                unformatted = unformatted.slice(0, -1);
                                // console.log('unformatted : ', unformatted.trim());
                                if (this.allVendors.some(v => v.phoneNo === unformatted.trim())) {
                                    let vendorData = this.allVendors.find(v => v.phoneNo === unformatted.trim());
                                    vendorId = vendorData.id;
                                    vendorName = vendorData.name;
                                }
                                // console.log('vendorId : ', vendorId)
                                // console.log('vendorName : ', vendorName)
                            }
                            if (prodId) {
                                // if (productCode == item.sku) {
                                //   console.log('match : ', item.name);
                                //   matchingProds.push(item.name)
                                //   console.log('mprds', matchingProds);
                                //   if (matchingProds.length <= matchingProds.length - 1) {
                                //     this.presentAlert('SKU already exists!', `Products with matching SKU Code are as follows :- ${matchingProds}`)
                                //   }
                                // }          
                                if (item['name'] && item['name'].trim() != '') {
                                    product['prodName'] = item['name'] ? item['name'].trim() : '';
                                    product['nameToSearch'] = item['name'] ? item['name'].trim() : '';
                                }
                                if (item['active'] && item['active'].trim() != '') {
                                    product['status'] = item['active'] && item['active'].toLowerCase() == 'yes' ? true : false;
                                }
                                if (item['barcodeNo'] && item['barcodeNo'].trim() != '') {
                                    product['barcodeNo'] = item['barcodeNo'] ? item['barcodeNo'].trim() : '';
                                }
                                // console.log('vendor id : ', vendorId)
                                // console.log('vendor name : ', vendorName)
                                if (item['vendorPhoneNo'] && (item['vendorPhoneNo'].trim() != '')) {
                                    product['vendorId'] = vendorId ? vendorId : '';
                                    product['vendorName'] = vendorName ? vendorName : '';
                                }
                                product['updatedAt'] = new Date();
                                product['productType'] = '';
                                product['isPriceList'] = item['variants'] && item['variants'].toLowerCase() == 'yes' ? true : orgProduct && orgProduct.isPriceList ? orgProduct.isPriceList : false;
                                if (!product['isPriceList']) {
                                    if (item['discountedPrice'] && item['discountedPrice'].trim() != '') {
                                        product['discountedPrice'] = item['discountedPrice'] ? parseFloat(item['discountedPrice'].trim()) : parseFloat(item['price'].trim());
                                    }
                                    if (item['price'] && item['price'].trim() != '') {
                                        product['prodPrice'] = parseFloat(item['price'].trim());
                                    }
                                    if (item['quantity'] && item['quantity'].trim() != '') {
                                        product['productQty'] = item['quantity'] ? item['quantity'].trim() : 0;
                                    }
                                    if (item['shippingWt'] && item['shippingWt'].trim() != '') {
                                        product['shippingWeight'] = parseInt(item['shippingWt'].trim());
                                    }
                                    if (item['purchasePrice'] && item['purchasePrice'].trim() != '') {
                                        product['purchasePrice'] = parseFloat(item['purchasePrice'].trim());
                                    }
                                }
                                else {
                                    product['priceList'] = orgProduct.priceList ? orgProduct.priceList : [];
                                    if (item['variantName'] && item['variantName'].trim() != '') {
                                        let variantItems = item['variantName'].split(',');
                                        variantItems.forEach((variant, index) => {
                                            if (!product['priceList'][index]) {
                                                product['priceList'][index] = {};
                                            }
                                            product['priceList'][index]['name'] = variant.trim();
                                        });
                                    }
                                    if (item['variantValue'] && item['variantValue'].trim() != '') {
                                        let variantValues = item['variantValue'].split(',');
                                        variantValues.forEach((variant, index) => {
                                            if (!product['priceList'][index]) {
                                                product['priceList'][index] = {};
                                            }
                                            product['priceList'][index]['weight'] = variant.trim();
                                        });
                                    }
                                    if (item['price'] && item['price'].trim() != '') {
                                        let priceItems = item['price'].split(',');
                                        priceItems.forEach((price, index) => {
                                            if (!product['priceList'][index]) {
                                                product['priceList'][index] = {};
                                            }
                                            product['priceList'][index]['price'] = price ? parseFloat(price.trim()) : 0;
                                        });
                                    }
                                    if (item['discountedPrice'] && item['discountedPrice'].trim() != '') {
                                        let discountedPriceItems = item['discountedPrice'].split(',');
                                        discountedPriceItems.forEach((discountedPrice, index) => {
                                            if (!product['priceList'][index]) {
                                                product['priceList'][index] = {};
                                            }
                                            product['priceList'][index]['discountedPrice'] = discountedPrice ? parseFloat(discountedPrice.trim()) : product['priceList'][index]['price'] ? parseFloat(product['priceList'][index]['price'].trim()) : 0;
                                        });
                                    }
                                    if (item['purchasePrice'] && item['purchasePrice'].trim() != '') {
                                        let purchasePriceItems = item['purchasePrice'].split(',');
                                        purchasePriceItems.forEach((purchasePrice, index) => {
                                            if (!product['priceList'][index]) {
                                                product['priceList'][index] = {};
                                            }
                                            product['priceList'][index]['purchasePrice'] = purchasePrice ? parseFloat(purchasePrice.trim()) : 0;
                                        });
                                    }
                                    if (item['quantity'] && item['quantity'].trim() != '') {
                                        let quantityItems = item['quantity'].split(',');
                                        quantityItems.forEach((quantity, index) => {
                                            if (!product['priceList'][index]) {
                                                product['priceList'][index] = {};
                                            }
                                            product['priceList'][index]['totalQuantity'] = quantity ? quantity.trim() : '0';
                                        });
                                    }
                                    if (item['shippingWt'] && item['shippingWt'].trim() != '') {
                                        let shippingItems = item['shippingWt'].split(',');
                                        shippingItems.forEach((shippingWt, index) => {
                                            if (!product['priceList'][index]) {
                                                product['priceList'][index] = {};
                                            }
                                            product['priceList'][index]['shippingWeight'] = shippingWt ? shippingWt.trim() : '0';
                                        });
                                    }
                                }
                                if (item['variantType'] && item['variantType'].trim() != '') {
                                    product['variantType'] = item['variantType'] ? item['variantType'].trim() : 'other';
                                }
                                if (item['prodDescription'] && item['prodDescription'].trim() != '') {
                                    product['prodDesc'] = item['prodDescription'] ? item['prodDescription'].trim() : '';
                                }
                                if (item['hsnCode'] && item['hsnCode'].trim() != '') {
                                    product['hsnCode'] = item['hsnCode'] ? item['hsnCode'].trim() : '';
                                }
                                if (item['gst'] && item['gst'].trim() != '') {
                                    product['gst'] = item['gst'] ? item['gst'] : 0;
                                }
                                if (item['brands'] && item['brands'].trim() != '') {
                                    product['brands'] = [];
                                    let bds = item['brands'].split(";");
                                    bds.forEach(brand => {
                                        brand = brand.toLowerCase().trim();
                                        if (this.brands[brand]) {
                                            product['brands'].push(this.brands[brand]);
                                        }
                                    });
                                }
                                if (item['catSubcat'] && item['catSubcat'].trim() != '') {
                                    product['categories'] = [];
                                    // console.log(this.categories);
                                    let cats = item['catSubcat'].split(";");
                                    // console.log(cats);
                                    cats.forEach(cat => {
                                        cat = cat.toLowerCase().trim();
                                        let catsubcat = cat.split("-");
                                        if (catsubcat[0]) {
                                            catsubcat[0] = catsubcat[0].trim();
                                        }
                                        if (catsubcat[1]) {
                                            catsubcat[1] = catsubcat[1].trim();
                                        }
                                        if (catsubcat[0] && this.categories[catsubcat[0]] && this.categories[catsubcat[0]]['id'] && product['categories'].indexOf(this.categories[catsubcat[0]]['id']) < 0) {
                                            product['categories'].push(this.categories[catsubcat[0]]['id']);
                                        }
                                        if (catsubcat[1] && this.categories[catsubcat[0]] && this.categories[catsubcat[0]]['id'] && this.categories[catsubcat[0]]['subcategories'] && this.categories[catsubcat[0]]['subcategories'][catsubcat[1]] && product['categories'].indexOf(this.categories[catsubcat[0]]['subcategories'][catsubcat[1]]) < 0) {
                                            product['categories'].push(this.categories[catsubcat[0]]['subcategories'][catsubcat[1]]);
                                        }
                                        // console.log(product['categories']);
                                    });
                                }
                                if (item['filters'] && item['filters'].trim() != '') {
                                    let providedFilterData = item['filters'].split('|');
                                    let filter = {};
                                    for (let i = 0; i < providedFilterData.length; i++) {
                                        let filterData = providedFilterData[i].split(':');
                                        let filterName = filterData[0];
                                        let filterValues = filterData[1].split(',');
                                        for (let j = 0; j < filterValues.length; j++) {
                                            filter[filterName] = [...filterValues];
                                        }
                                    }
                                    console.log('provided filter : ', filter);
                                    // *** Verify Filters ***
                                    if (this.allFilters.length) {
                                        product['filters'] = {};
                                        for (let i = 0; i < this.allFilters.length; i++) {
                                            if (filter[this.allFilters[i].name]) {
                                                console.log('filters : ', filter[this.allFilters[i].name]);
                                                let valueState = filter[this.allFilters[i].name].every((el) => this.allFilters[i].value.includes(el));
                                                if (valueState) {
                                                    product['filters'][this.allFilters[i].name] = filter[this.allFilters[i].name];
                                                }
                                            }
                                        }
                                        console.log('Final filters : ', product['filters']);
                                    }
                                }
                                if (item['color'] && item['color'].trim() != '') {
                                    let colorVals = item['color'].split(',');
                                    product['color'] = {
                                        code: colorVals[1] ? colorVals[1].trim() : '',
                                        name: colorVals[0] ? colorVals[0].trim() : ''
                                    };
                                }
                                if (item['keywords'] && item['keywords'].trim() != '') {
                                    product['searchKeywords'] = [];
                                    let keywords = item['keywords'].split(',');
                                    keywords.forEach(key => {
                                        product['searchKeywords'].push(key.trim());
                                    });
                                }
                                if (item['out_of_stock'] && item['out_of_stock'].trim() != '') {
                                    product['stopWhenNoQty'] = item['out_of_stock'] && item['out_of_stock'].toLowerCase() == 'yes' ? true : false;
                                }
                                if (item['minQuantity'] && item['minQuantity'].trim() != '') {
                                    product['minQty'] = item['minQuantity'] ? parseInt(item['minQuantity'].trim()) : null;
                                }
                                if (item['maxQuantity'] && item['maxQuantity'].trim() != '') {
                                    product['maxQty'] = item['maxQuantity'] ? parseInt(item['maxQuantity'].trim()) : null;
                                }
                                // console.log(product);
                                this.totalProcessed++;
                                this.afs.collection('products').doc(prodId).update(product);
                            }
                            else {
                                // * CHECK IF PRODUCT IS NEW - PERFORM [ ADD ]
                                console.log('else : ', prodId);
                                product['productCode'] = item['sku'].trim();
                                product['prodName'] = item['name'] ? item['name'].trim() : '';
                                product['barcodeNo'] = item['barcodeNo'] ? item['barcodeNo'].trim() : '';
                                console.log('vendor id else : ', vendorId);
                                console.log('vendor name else : ', vendorName);
                                product['vendorId'] = vendorId ? vendorId : '';
                                product['vendorName'] = vendorName ? vendorName : '';
                                product['productType'] = '';
                                product['nameToSearch'] = item['name'] ? item['name'].trim() : '';
                                product['createdAt'] = new Date();
                                product['status'] = item['active'] && item['active'].toLowerCase() == 'yes' ? true : false;
                                product['updatedAt'] = new Date();
                                product['sortedAt'] = new Date();
                                product['isPriceList'] = item['variants'] && item['variants'].toLowerCase() == 'yes' ? true : false;
                                product['variantType'] = item['variantType'] ? item['variantType'].trim() : 'other';
                                product['prodDesc'] = item['prodDescription'] ? item['prodDescription'].trim() : '';
                                if (item['filters'] && item['filters'].trim() != '') {
                                    let providedFilterData = item['filters'].split('|');
                                    let filter = {};
                                    for (let i = 0; i < providedFilterData.length; i++) {
                                        let filterData = providedFilterData[i].split(':');
                                        let filterName = filterData[0];
                                        let filterValues = filterData[1].split(',');
                                        for (let j = 0; j < filterValues.length; j++) {
                                            filter[filterName] = [...filterValues];
                                        }
                                    }
                                    console.log('provided filter : ', filter);
                                    // *** Verify Filters ***
                                    if (this.allFilters.length) {
                                        product['filters'] = {};
                                        for (let i = 0; i < this.allFilters.length; i++) {
                                            if (filter[this.allFilters[i].name]) {
                                                console.log('filters : ', filter[this.allFilters[i].name]);
                                                let valueState = filter[this.allFilters[i].name].every((el) => this.allFilters[i].value.includes(el));
                                                if (valueState) {
                                                    product['filters'][this.allFilters[i].name] = filter[this.allFilters[i].name];
                                                }
                                            }
                                        }
                                        console.log('Final filters : ', product['filters']);
                                    }
                                }
                                product['hsnCode'] = item['hsnCode'] ? item['hsnCode'].trim() : '';
                                product['gst'] = item['gst'] ? item['gst'] : 0;
                                product['categories'] = [];
                                if (item['brands'] && item['brands'].trim() != '') {
                                    product['brands'] = [];
                                    let bds = item['brands'].split(";");
                                    bds.forEach(brand => {
                                        brand = brand.toLowerCase().trim();
                                        if (this.brands[brand]) {
                                            product['brands'].push(this.brands[brand]);
                                        }
                                    });
                                }
                                if (item['catSubcat'] && item['catSubcat'].trim() != '') {
                                    product['categories'] = [];
                                    let cats = item['catSubcat'].split(";");
                                    cats.forEach(cat => {
                                        cat = cat.toLowerCase().trim();
                                        let catsubcat = cat.split("-");
                                        if (catsubcat[0]) {
                                            catsubcat[0] = catsubcat[0].trim();
                                        }
                                        if (catsubcat[1]) {
                                            catsubcat[1] = catsubcat[1].trim();
                                        }
                                        if (catsubcat[0] && this.categories[catsubcat[0]] && this.categories[catsubcat[0]]['id'] && product['categories'].indexOf(this.categories[catsubcat[0]]['id']) < 0) {
                                            product['categories'].push(this.categories[catsubcat[0]]['id']);
                                        }
                                        if (catsubcat[1] && this.categories[catsubcat[0]] && this.categories[catsubcat[0]]['id'] && this.categories[catsubcat[0]]['subcategories'] && this.categories[catsubcat[0]]['subcategories'][catsubcat[1]] && product['categories'].indexOf(this.categories[catsubcat[0]]['subcategories'][catsubcat[1]]) < 0) {
                                            product['categories'].push(this.categories[catsubcat[0]]['subcategories'][catsubcat[1]]);
                                        }
                                    });
                                }
                                product['images'] = [];
                                product['coverPic'] = {
                                    url: 'assets/img/placeholder-img.jpg',
                                    mob: 'assets/img/placeholder-img.jpg',
                                    thumb: 'assets/img/placeholder-img.jpg'
                                };
                                if (item['color']) {
                                    let colorVals = item['color'].split(',');
                                    product['color'] = {
                                        code: colorVals[1] ? colorVals[1].trim() : '',
                                        name: colorVals[0] ? colorVals[0].trim() : ''
                                    };
                                }
                                else {
                                    product['color'] = {};
                                }
                                product['searchKeywords'] = [];
                                if (item['keywords']) {
                                    let keywords = item['keywords'].split(',');
                                    keywords.forEach(key => {
                                        product['searchKeywords'].push(key.trim());
                                    });
                                }
                                product['stopWhenNoQty'] = item['out_of_stock'] && item['out_of_stock'].toLowerCase() == 'yes' ? true : false;
                                product['minQty'] = item['minQuantity'] ? parseInt(item['minQuantity'].trim()) : null;
                                product['maxQty'] = item['maxQuantity'] ? parseInt(item['maxQuantity'].trim()) : null;
                                product['priceList'] = [];
                                if (!product['isPriceList']) {
                                    product['discountedPrice'] = item['discountedPrice'] ? parseFloat(item['discountedPrice'].trim()) : parseFloat(item['price'].trim());
                                    product['prodPrice'] = item['price'] ? parseFloat(item['price'].trim()) : 0;
                                    product['purchasePrice'] = item['purchasePrice'] ? parseFloat(item['purchasePrice'].trim()) : 0;
                                    product['productQty'] = item['quantity'] ? item['quantity'].trim() : 0;
                                    product['shippingWeight'] = item['shippingWt'] ? item['shippingWt'].trim() : null;
                                }
                                else {
                                    if (item['variantName']) {
                                        let variantItems = item['variantValue'].split(',');
                                        let priceItems = item['price'].split(',');
                                        let discountedPriceItems = item['discountedPrice'].split(',');
                                        let purchasePriceItems = item['purchasePrice'].split(',');
                                        let quantityItems = item['quantity'].split(',');
                                        let shippingItems = item['shippingWt'].split(',');
                                        let variantNames = item['variantName'] ? item['variantName'].split(',') : [null];
                                        variantItems.forEach((variant, index) => {
                                            product['priceList'].push({
                                                price: priceItems[index] ? parseFloat(priceItems[index].trim()) : 0,
                                                discountedPrice: discountedPriceItems[index] ? parseFloat(discountedPriceItems[index].trim()) : priceItems[index] ? parseFloat(priceItems[index].trim()) : 0,
                                                purchasePrice: purchasePriceItems[index] ? parseFloat(purchasePriceItems[index].trim()) : 0,
                                                weight: variant.trim(),
                                                totalQuantity: quantityItems[index] ? quantityItems[index].trim() : '0',
                                                shippingWeight: shippingItems[index] ? shippingItems[index].trim() : '',
                                                name: variantNames[index] ? variantNames[index].trim() : ''
                                            });
                                        });
                                    }
                                }
                                // console.log(product);
                                this.totalProcessed++;
                                this.afs.collection('products').add(product);
                            }
                            yield this.sharedService.loading.dismiss();
                        }
                    }
                    yield this.sharedService.loading.dismiss();
                    this.isProgressBarActive = false;
                    yield this.presentToastWithOptions('Success!', 'Product imported successfully', 'SC-101');
                    this.detectedFields = [];
                    this.buttonState = "Upload";
                }
                else {
                    this.isProgressBarActive = false;
                    yield this.presentToastWithOptions('Error in Processing File!', 'Please try again later.', 'ERR-192');
                }
            }
        });
    }
    saveDisable() {
        if (this.buttonState === 'Upload') {
            return false;
        }
        else if (this.buttonState === 'Import') {
            return false;
        }
        else {
            return true;
        }
    }
    calcProcessedEntities() {
        // console.log('this.allCSVProducts.length', this.allCSVProducts.length)
        if (this.allCSVProducts.length - 1 === -1) {
            return 0;
        }
        else {
            return this.allCSVProducts.length;
        }
    }
};
ProductCsvImporterPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__["SharedService"] },
    { type: src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_5__["ImportExportManagerService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
    { type: ngx_papaparse__WEBPACK_IMPORTED_MODULE_8__["Papa"] },
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] }
];
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



/***/ })

}]);
//# sourceMappingURL=admin-import-export-manager-product-csv-importer-product-csv-importer-module-es2015.js.map