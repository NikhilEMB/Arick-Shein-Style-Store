(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-import-export-manager-delete-bulk-products-delete-bulk-products-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/delete-bulk-products/delete-bulk-products.page.html":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/import-export-manager/delete-bulk-products/delete-bulk-products.page.html ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons style=\"margin-left: -8px;\" slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-menu-button style=\"margin-left: 8px;\" slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Delete Bulk Product(s)</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col id=\"scroll\" size=\"6\">\r\n          <div class=\"sectionArea\">\r\n            <h2>Provided SKU(s) / Products</h2>\r\n            <p class=\"ion-text-center\" *ngIf=\"!detectedFields.length\">\r\n              Please Upload CSV\r\n            </p>\r\n            <ion-card *ngIf=\"successSKU && successSKU.length\">\r\n              <ion-card-header>\r\n                <ion-card-title>Ready to delete SKU(s)</ion-card-title>\r\n                <ion-card-subtitle style=\"color: green;\">✅ Total Matched - {{successSKU.length || 0}}</ion-card-subtitle>\r\n                <div class=\"stateDiv\" *ngFor=\"let item of successSKU; let i = index\">\r\n                  <ion-card-subtitle style=\"color: green;\">{{i+1}} - SKU - {{item}}</ion-card-subtitle>\r\n                </div>\r\n              </ion-card-header>\r\n            </ion-card>\r\n            <ion-card *ngIf=\"failSKU && failSKU.length\">\r\n              <ion-card-header>\r\n                <ion-card-title>Invalid SKU(s) found!</ion-card-title>\r\n                <ion-card-subtitle style=\"color: red;\">❌ Total Invalid - {{failSKU.length || 0}}</ion-card-subtitle>\r\n                <div class=\"stateDiv\" *ngFor=\"let item of failSKU; let i = index\">\r\n                  <ion-card-subtitle style=\"color: red;\">{{i+1}} - SKU - {{item}}</ion-card-subtitle>\r\n                </div>\r\n              </ion-card-header>\r\n            </ion-card>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col id=\"scroll\" size=\"6\">\r\n          <div class=\"sectionArea\">\r\n            <h2>Instructions</h2>\r\n          </div>\r\n          <div>\r\n            <ol>\r\n              <li style=\"font-weight: bold\">Before Uploading</li>\r\n                <ion-button expand=\"block\" shape=\"round\" mode=\"ios\" style=\"margin: 10px 0 10px 0\">\r\n                  <a href=\"../../../../assets/files/sample-csv-product-delete.csv\" download>Download Sample CSV</a>\r\n                </ion-button>\r\n              <li style=\"font-weight: bold\">While Uploading</li>\r\n              <ol>\r\n                <li>Make sure that the file is of .csv format.</li>\r\n                <li>You can use the sample csv format provided for formatting the products accordingly.</li>\r\n              </ol>\r\n              <li style=\"font-weight: bold\">While Importing</li>\r\n              <ol>\r\n                <li>Please wait while the deletion of products is undergoing & make sure to not close this tab.</li>\r\n              </ol>\r\n            </ol>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>\r\n\r\n<ion-footer no-border class=\"page-footer\">\r\n  <!-- <ion-progress-bar *ngIf=\"isProgressBarActive\" value=\"progressValue\" buffer=\"progressBuffer\"></ion-progress-bar> -->\r\n  <ion-progress-bar *ngIf=\"isProgressBarActive\" type=\"indeterminate\"></ion-progress-bar>\r\n  <div class=\"main-container\" style=\"margin-bottom: -6px\">\r\n    <div class=\"upload-btn-wrapper\">\r\n      <ion-button [disabled]=\"saveDisable() || isProgressBarActive\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\" (click)=\"deleteProductsHandler($event, buttonState)\" >\r\n        <i *ngIf=\"buttonState === 'Delete'\" class=\"flaticon-null-20 margin-icon\"></i>\r\n        <i *ngIf=\"buttonState === 'Upload'\" class=\"flaticon-null-16\"></i>\r\n        {{buttonState}} CSV\r\n      </ion-button>\r\n      <ng-container *ngIf=\"!isProgressBarActive && buttonState !== 'Delete'\">\r\n        <input type=\"file\" name=\"myfile\" (change)=\"deleteProductsHandler($event, buttonState)\"/>\r\n      </ng-container>\r\n    </div>\r\n  </div>\r\n</ion-footer>\r\n\r\n"

/***/ }),

/***/ "./src/app/admin/import-export-manager/delete-bulk-products/delete-bulk-products.module.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/delete-bulk-products/delete-bulk-products.module.ts ***!
  \*************************************************************************************************/
/*! exports provided: DeleteBulkProductsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteBulkProductsPageModule", function() { return DeleteBulkProductsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _delete_bulk_products_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./delete-bulk-products.page */ "./src/app/admin/import-export-manager/delete-bulk-products/delete-bulk-products.page.ts");







var routes = [
    {
        path: '',
        component: _delete_bulk_products_page__WEBPACK_IMPORTED_MODULE_6__["DeleteBulkProductsPage"]
    }
];
var DeleteBulkProductsPageModule = /** @class */ (function () {
    function DeleteBulkProductsPageModule() {
    }
    DeleteBulkProductsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_delete_bulk_products_page__WEBPACK_IMPORTED_MODULE_6__["DeleteBulkProductsPage"]]
        })
    ], DeleteBulkProductsPageModule);
    return DeleteBulkProductsPageModule;
}());



/***/ }),

/***/ "./src/app/admin/import-export-manager/delete-bulk-products/delete-bulk-products.page.scss":
/*!*************************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/delete-bulk-products/delete-bulk-products.page.scss ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  width: 100%;\n  padding: 0;\n}\n\na, a:hover, a:focus, a:active {\n  text-decoration: none;\n  color: inherit;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 75vh;\n  border-right: 1px solid lightgray;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 86vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n#scroll {\n  overflow: hidden;\n  height: calc(100vh - 107px);\n  border-right: 1px solid lightgray;\n}\n\n#scroll:hover {\n  overflow-y: auto;\n}\n\n.sectionArea h2 {\n  text-align: center;\n}\n\nh2 {\n  margin-top: 0;\n  font-size: 24px;\n}\n\n#mainField {\n  margin: 0 4px 8px 8px;\n  padding: 4px 0 4px 0;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.upload-btn-wrapper input[type=file] {\n  font-size: 100px;\n  position: absolute;\n  left: 0;\n  top: 0;\n  opacity: 0;\n  z-index: 99;\n}\n\n.page-footer {\n  border-top: 1px solid #ccc;\n}\n\n.stateDiv {\n  margin-top: 8px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vaW1wb3J0LWV4cG9ydC1tYW5hZ2VyL2RlbGV0ZS1idWxrLXByb2R1Y3RzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcaW1wb3J0LWV4cG9ydC1tYW5hZ2VyXFxkZWxldGUtYnVsay1wcm9kdWN0c1xcZGVsZXRlLWJ1bGstcHJvZHVjdHMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9pbXBvcnQtZXhwb3J0LW1hbmFnZXIvZGVsZXRlLWJ1bGstcHJvZHVjdHMvZGVsZXRlLWJ1bGstcHJvZHVjdHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFVBQUE7QUNDRjs7QURFQTtFQUNFLHFCQUFBO0VBQ0EsY0FBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsaUNBQUE7QUNDRjs7QURBRTtFQUNFLGdCQUFBO0FDRUo7O0FERUE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7QUNDRjs7QURBRTtFQUNFLGdCQUFBO0FDRUo7O0FERUE7RUFDRSxnQkFBQTtFQUNBLDJCQUFBO0VBQ0EsaUNBQUE7QUNDRjs7QURBRTtFQUNFLGdCQUFBO0FDRUo7O0FER0U7RUFDRSxrQkFBQTtBQ0FKOztBRElBO0VBQ0UsYUFBQTtFQUNBLGVBQUE7QUNERjs7QURJQTtFQUNFLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtBQ0RGOztBRElBO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxNQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7QUNERjs7QURHQTtFQUNFLDBCQUFBO0FDQUY7O0FER0E7RUFDRSxlQUFBO0FDQUYiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9pbXBvcnQtZXhwb3J0LW1hbmFnZXIvZGVsZXRlLWJ1bGstcHJvZHVjdHMvZGVsZXRlLWJ1bGstcHJvZHVjdHMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW4tY29udGFpbmVyIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiAwO1xyXG59XHJcblxyXG5hLCBhOmhvdmVyLCBhOmZvY3VzLCBhOmFjdGl2ZSB7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIGNvbG9yOiBpbmhlcml0O1xyXG59XHJcblxyXG4jc2Nyb2xsMSB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDc1dmg7XHJcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICY6aG92ZXIge1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICB9XHJcbn1cclxuXHJcbiNzY3JvbGwyIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogODZ2aDtcclxuICAmOmhvdmVyIHtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgfVxyXG59XHJcblxyXG4jc2Nyb2xsIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDEwN3B4KTtcclxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxufVxyXG5cclxuLnNlY3Rpb25BcmVhe1xyXG4gIGgyIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcbn1cclxuXHJcbmgyIHtcclxuICBtYXJnaW4tdG9wOiAwO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxufVxyXG5cclxuI21haW5GaWVsZCB7XHJcbiAgbWFyZ2luOiAwIDRweCA4cHggOHB4O1xyXG4gIHBhZGRpbmc6IDRweCAwIDRweCAwO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuXHJcbi51cGxvYWQtYnRuLXdyYXBwZXIgaW5wdXRbdHlwZT1maWxlXSB7XHJcbiAgZm9udC1zaXplOiAxMDBweDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbGVmdDogMDtcclxuICB0b3A6IDA7XHJcbiAgb3BhY2l0eTogMDtcclxuICB6LWluZGV4OiA5OTtcclxufVxyXG4ucGFnZS1mb290ZXJ7XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7XHJcbn1cclxuXHJcbi5zdGF0ZURpdiB7XHJcbiAgbWFyZ2luLXRvcDogOHB4O1xyXG59IiwiLm1haW4tY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbmEsIGE6aG92ZXIsIGE6Zm9jdXMsIGE6YWN0aXZlIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjb2xvcjogaW5oZXJpdDtcbn1cblxuI3Njcm9sbDEge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDc1dmg7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDg2dmg7XG59XG4jc2Nyb2xsMjpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbiNzY3JvbGwge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxMDdweCk7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cbiNzY3JvbGw6aG92ZXIge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG4uc2VjdGlvbkFyZWEgaDIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmgyIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgZm9udC1zaXplOiAyNHB4O1xufVxuXG4jbWFpbkZpZWxkIHtcbiAgbWFyZ2luOiAwIDRweCA4cHggOHB4O1xuICBwYWRkaW5nOiA0cHggMCA0cHggMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4udXBsb2FkLWJ0bi13cmFwcGVyIGlucHV0W3R5cGU9ZmlsZV0ge1xuICBmb250LXNpemU6IDEwMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgb3BhY2l0eTogMDtcbiAgei1pbmRleDogOTk7XG59XG5cbi5wYWdlLWZvb3RlciB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjO1xufVxuXG4uc3RhdGVEaXYge1xuICBtYXJnaW4tdG9wOiA4cHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/import-export-manager/delete-bulk-products/delete-bulk-products.page.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/admin/import-export-manager/delete-bulk-products/delete-bulk-products.page.ts ***!
  \***********************************************************************************************/
/*! exports provided: DeleteBulkProductsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteBulkProductsPage", function() { return DeleteBulkProductsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/import-export-manager/import-export-manager.service */ "./src/app/services/import-export-manager/import-export-manager.service.ts");
/* harmony import */ var ngx_papaparse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-papaparse */ "./node_modules/ngx-papaparse/fesm5/ngx-papaparse.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");






var DeleteBulkProductsPage = /** @class */ (function () {
    function DeleteBulkProductsPage(importExportManagerService, alertController, toastController, papa) {
        this.importExportManagerService = importExportManagerService;
        this.alertController = alertController;
        this.toastController = toastController;
        this.papa = papa;
        this.buttonState = '';
        this.isProgressBarActive = false;
        this.providedProducts = [];
        this.skuArr = [];
        this.detectedFields = [];
        this.allCSVProducts = [];
        this.prodLength = 0;
        this.failSKU = [];
        this.successSKU = [];
    }
    DeleteBulkProductsPage.prototype.ngOnInit = function () { };
    DeleteBulkProductsPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.buttonState = 'Upload';
                        _a = this;
                        return [4 /*yield*/, this.importExportManagerService.fetchAllSKU()];
                    case 1:
                        _a.skuArr = _b.sent();
                        console.log('skuArr', this.skuArr);
                        return [2 /*return*/];
                }
            });
        });
    };
    DeleteBulkProductsPage.prototype.presentToast = function (message) {
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
    DeleteBulkProductsPage.prototype.presentAlertConfirm = function (message, action) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirm deletion of provided SKUs!',
                            message: message,
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Okay',
                                    handler: function () {
                                        console.log('Confirm Okay');
                                        if (action === 'delete') {
                                            _this.processDeletion();
                                        }
                                    }
                                }
                            ]
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
    DeleteBulkProductsPage.prototype.presentToastWithOptions = function (header, message, errorCode) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            mode: 'ios',
                            color: 'dark',
                            header: header,
                            message: message,
                            duration: 3000,
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
    DeleteBulkProductsPage.prototype.saveDisable = function () {
        if (this.buttonState === 'Upload') {
            return false;
        }
        else if (this.buttonState = 'Delete') {
            return false;
        }
        else {
            return true;
        }
    };
    DeleteBulkProductsPage.prototype.checkValidCSV = function (event, jsonData) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _i, _a, mainField;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!event.target.files[0].name.includes('.csv')) return [3 /*break*/, 6];
                        _i = 0, _a = jsonData[0];
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        mainField = _a[_i];
                        if (!((mainField === 'Sku') || (mainField === 'sku'))) return [3 /*break*/, 2];
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, this.presentToastWithOptions('Invalid CSV Column(s)!', 'Pls Check the CSV before uploading.', 'ERR-191')];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, false];
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.presentToastWithOptions('Invalid File Format!', 'The file should be only in [ .csv ] format.', 'ERR-190')];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, false];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    DeleteBulkProductsPage.prototype.getCSVHeaderValue = function (field) {
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
            default: // experimental
                return field;
        }
    };
    DeleteBulkProductsPage.prototype.deleteProductsHandler = function (event, state) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var jsonData, csv, options;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jsonData = [];
                        if (state === 'Upload') {
                            csv = event.target.files[0];
                            console.log('csv : ', csv);
                            options = {
                                complete: function (result, file) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                    var validity, _i, _a, field, _loop_1, this_1, _b, _c, sortSKU;
                                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_d) {
                                        switch (_d.label) {
                                            case 0:
                                                jsonData = result.data;
                                                validity = this.checkValidCSV(event, jsonData);
                                                console.log('validity : ', validity);
                                                if (!validity) return [3 /*break*/, 3];
                                                this.detectedFields = [];
                                                this.prodLength = jsonData.length - 1;
                                                for (_i = 0, _a = jsonData[0]; _i < _a.length; _i++) {
                                                    field = _a[_i];
                                                    this.detectedFields.push({
                                                        name: field,
                                                        value: this.getCSVHeaderValue(field),
                                                        active: false
                                                    });
                                                }
                                                // if (this.detectedFields.length) {
                                                //   this.buttonState = 'Delete'
                                                // }
                                                this.allCSVProducts = jsonData;
                                                // * Remove headers
                                                this.allCSVProducts.shift();
                                                console.log('csv: ', this.allCSVProducts);
                                                console.log('detectedFields: ', this.detectedFields);
                                                console.log('prodLength: ', this.prodLength);
                                                _loop_1 = function (sortSKU) {
                                                    console.log('sortSKU', sortSKU[0]);
                                                    if (sortSKU[0] !== '') {
                                                        if (this_1.skuArr.some(function (sku) { return sku.productCode === sortSKU[0]; })) {
                                                            this_1.successSKU.push(sortSKU[0]);
                                                        }
                                                        else {
                                                            this_1.failSKU.push(sortSKU[0]);
                                                        }
                                                    }
                                                };
                                                this_1 = this;
                                                // * Check SKU Validity
                                                for (_b = 0, _c = this.allCSVProducts; _b < _c.length; _b++) {
                                                    sortSKU = _c[_b];
                                                    _loop_1(sortSKU);
                                                }
                                                // for (const sortSKU of this.allCSVProducts) {
                                                //   console.log('sortSKU', sortSKU[0])
                                                //   if (this.skuArr.some(sku => {
                                                //     if (sku.productCode === sortSKU[0]) {
                                                //       this.successSKU.push({
                                                //         productCode: sortSKU[0],
                                                //         pid: sku.pid
                                                //       })
                                                //     } 
                                                //   })) { }  
                                                // }
                                                // for (const sortSKU of this.allCSVProducts) {
                                                //   if (this.skuArr.some(sku => sku.productCode !== sortSKU[0])) {
                                                //     this.failSKU.push({
                                                //       productCode: sortSKU[0]
                                                //     })
                                                //   }
                                                // }
                                                console.log('success sku : ', this.successSKU);
                                                console.log('fail sku : ', this.failSKU);
                                                if (!(this.failSKU && this.failSKU.length)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, this.presentToastWithOptions('SKU Mismatch!', "Unidentified SKUs found in " + this.failSKU.length + " entries!", 'ERR-163')
                                                    // return
                                                ];
                                            case 1:
                                                _d.sent();
                                                _d.label = 2;
                                            case 2:
                                                if (this.successSKU && this.successSKU.length && this.detectedFields.length) {
                                                    this.buttonState = 'Delete';
                                                }
                                                _d.label = 3;
                                            case 3: return [2 /*return*/];
                                        }
                                    });
                                }); }
                            };
                            this.papa.parse(csv, options);
                        }
                        if (!(state === 'Delete')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.presentAlertConfirm('Are you sure you want to delete the provided SKUs?', 'delete')];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DeleteBulkProductsPage.prototype.processDeletion = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var finalArr, _loop_2, this_2, _i, _a, skuObj, response;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.successSKU && this.successSKU.length)) return [3 /*break*/, 7];
                        finalArr = [];
                        console.log('this.successSKU : ', this.successSKU);
                        _loop_2 = function (skuObj) {
                            if (this_2.successSKU.some(function (sku) { return sku === skuObj.productCode; })) {
                                finalArr.push(skuObj.pid);
                            }
                        };
                        this_2 = this;
                        for (_i = 0, _a = this.skuArr; _i < _a.length; _i++) {
                            skuObj = _a[_i];
                            _loop_2(skuObj);
                        }
                        console.log('finalArr', finalArr);
                        return [4 /*yield*/, this.importExportManagerService.deleteBulkProducts(finalArr)];
                    case 1:
                        response = _b.sent();
                        console.log('response', response);
                        if (!response) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.resetState()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.presentToastWithOptions('Successfully deleted SKUs!', "Total Deleted - " + response, 'TRU-144')];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 4: 
                    // this.resetState()
                    return [4 /*yield*/, this.presentToastWithOptions('Error', 'Error while deleting', 'ERR-121')];
                    case 5:
                        // this.resetState()
                        _b.sent();
                        _b.label = 6;
                    case 6: return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.presentToastWithOptions('Success SKU not found!', 'Not found - 404', 'ERR-161')
                        // this.resetState()  
                    ];
                    case 8:
                        _b.sent();
                        // this.resetState()  
                        return [2 /*return*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    DeleteBulkProductsPage.prototype.resetState = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.skuArr = [];
                        _a = this;
                        return [4 /*yield*/, this.importExportManagerService.fetchAllSKU()];
                    case 1:
                        _a.skuArr = _b.sent();
                        this.buttonState = 'Upload';
                        this.detectedFields = [];
                        this.allCSVProducts = [];
                        this.prodLength = 0;
                        this.failSKU = [];
                        this.successSKU = [];
                        return [2 /*return*/];
                }
            });
        });
    };
    DeleteBulkProductsPage.ctorParameters = function () { return [
        { type: src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_2__["ImportExportManagerService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"] },
        { type: ngx_papaparse__WEBPACK_IMPORTED_MODULE_3__["Papa"] }
    ]; };
    DeleteBulkProductsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-delete-bulk-products',
            template: __webpack_require__(/*! raw-loader!./delete-bulk-products.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/import-export-manager/delete-bulk-products/delete-bulk-products.page.html"),
            styles: [__webpack_require__(/*! ./delete-bulk-products.page.scss */ "./src/app/admin/import-export-manager/delete-bulk-products/delete-bulk-products.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_import_export_manager_import_export_manager_service__WEBPACK_IMPORTED_MODULE_2__["ImportExportManagerService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"],
            ngx_papaparse__WEBPACK_IMPORTED_MODULE_3__["Papa"]])
    ], DeleteBulkProductsPage);
    return DeleteBulkProductsPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-import-export-manager-delete-bulk-products-delete-bulk-products-module-es5.js.map