(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-brands-add-brand-add-brand-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-brands/add-brand/add-brand.page.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-brands/add-brand/add-brand.page.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\"\r\n      slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\"\r\n      *ngIf=\"brandData === undefined\">New Brand</ion-title>\r\n    <ion-title class=\"ion-text-center\"\r\n      *ngIf=\"brandData !== undefined\">Edit Brand</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs>\r\n\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Basic</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Advanced (optional)</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <super-tabs-container>\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <div style=\"text-align: center;\">\r\n            <ion-button (click)=\"saveBrand()\"\r\n              shape=\"round\"\r\n              class=\"btn-1 i-start\"\r\n              color=\"success\"\r\n              fill=\"outline\">\r\n              <i class=\"flaticon-null-20 margin-icon\"></i>\r\n              Save\r\n            </ion-button>&nbsp;&nbsp;\r\n            <ion-button *ngIf=\"brandData\"\r\n              (click)=\"deleteConfirm()\"\r\n              shape=\"round\"\r\n              class=\"btn-1 i-start\"\r\n              color=\"danger\"\r\n              fill=\"outline\">\r\n              <i class=\"flaticon-null-21\"></i>\r\n              Delete\r\n            </ion-button>\r\n          </div>\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <div class=\"flex-space-between\">\r\n                    <div>\r\n                      <ion-label>Brand Name</ion-label>\r\n                    </div>\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>Active</ion-label>\r\n                      <ion-toggle [checked]=\"status\"\r\n                        [(ngModel)]=\"status\"></ion-toggle>\r\n                    </div>\r\n                  </div>\r\n                  <ion-input class=\"form-input\"\r\n                    [(ngModel)]=\"name\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\">\r\n                <div class=\"ab-data-sections\">\r\n                  <div class=\"ab-headings\">Description</div>\r\n                  <ckeditor [(ngModel)]=\"description\"\r\n                    [config]=\"ckeConfig\"></ckeditor>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\">\r\n                <div class=\"flex-space-between\">\r\n                  <div>\r\n                    <ion-label>Brand Image</ion-label>\r\n                  </div>\r\n                  <div class=\"upload-btn-wrapper\">\r\n                    <button class=\"upload-btn btn-1 i-start\"\r\n                      (click)=\"uploadImage($event.target.files, 'brandImg')\"> <i\r\n                        class=\"flaticon-null-16\"></i>Upload Brand Image</button>\r\n                    <!-- <input type=\"file\" name=\"myfile\"\r\n                      (change)=\"uploadImage($event.target.files, 'brandImg')\" /> -->\r\n                  </div>\r\n                </div>\r\n                <div class=\"img-container\">\r\n                  <div\r\n                    *ngIf=\"image[0] && image[0].hasOwnProperty('url') && image[0].url != ''\">\r\n                    <div class=\"img-wrap\"\r\n                      *ngFor=\"let img of image; let i=index;\">\r\n                      <img class=\"category-img\"\r\n                        [src]=\"img.url\"\r\n                        (click)=\"imgZoom(img.url)\" />\r\n                      <div class=\"overlay\">\r\n                        <ion-button class=\"btn-2 remove\"\r\n                          shape=\"round\"\r\n                          fill=\"clear\"\r\n                          color=\"danger\"\r\n                          (click)=\"removeImage('brandImg')\">\r\n                          <ion-icon name=\"trash\"\r\n                            slot=\"icon-only\"></ion-icon>\r\n                        </ion-button>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n\r\n              <ion-col size=\"12\">\r\n                <div class=\"flex-space-between\">\r\n                  <div>\r\n                    <ion-label>Brand Banner</ion-label>\r\n                  </div>\r\n                  <div class=\"upload-btn-wrapper\">\r\n                    <button class=\"upload-btn btn-1 i-start\"\r\n                      (click)=\"uploadImage($event.target.files, 'brandBanner')\">\r\n                      <i class=\"flaticon-null-16\"></i>Upload Brand\r\n                      Banner</button>\r\n                    <!-- <input type=\"file\"\r\n                      name=\"myfile\"\r\n                      (change)=\"uploadImage($event.target.files, 'brandBanner')\" /> -->\r\n                  </div>\r\n                </div>\r\n                <div class=\"img-container\">\r\n                  <div\r\n                    *ngIf=\"banner[0] && banner[0].hasOwnProperty('url') && banner[0].url != ''\">\r\n                    <div class=\"img-wrap\"\r\n                      *ngFor=\"let img of banner; let i=index;\">\r\n                      <img class=\"category-img\"\r\n                        [src]=\"img.url\"\r\n                        (click)=\"imgZoom(img.url)\" />\r\n                      <div class=\"overlay\">\r\n                        <ion-button class=\"btn-2 remove\"\r\n                          shape=\"round\"\r\n                          fill=\"clear\"\r\n                          color=\"danger\"\r\n                          (click)=\"removeImage('brandBanner')\">\r\n                          <ion-icon name=\"trash\"\r\n                            slot=\"icon-only\"></ion-icon>\r\n                        </ion-button>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <div style=\"text-align: center;\">\r\n            <ion-button (click)=\"saveBrand()\"\r\n              shape=\"round\"\r\n              class=\"btn-1 i-start\"\r\n              color=\"success\"\r\n              fill=\"outline\">\r\n              <i class=\"flaticon-null-20 margin-icon\"></i>\r\n              Save\r\n            </ion-button>\r\n          </div>\r\n          <ion-col>\r\n            <!-- region select -->\r\n            <div *ngIf=\"multiRegion && regions.length\"\r\n              class=\"ab-data-sections\">\r\n              <div class=\"ab-headings\">\r\n                Add Region\r\n              </div>\r\n              <ion-select multiple=\"true\"\r\n                [value]=\"regionId\"\r\n                class=\"border f-s-14 i-s-p-10\"\r\n                (ionChange)=\"addRegion($event)\"\r\n                placeholder=\"Select Region\"\r\n                style=\"border: 1px solid gray; width: 300px;\">\r\n                <ion-select-option [value]=\"region.id\"\r\n                  *ngFor=\"let region of regions\">{{region.name}}\r\n                </ion-select-option>\r\n              </ion-select>\r\n              <br>\r\n            </div>\r\n            <!-- region select -->\r\n          </ion-col>\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <h3>Website SEO</h3>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Meta Title</ion-label>\r\n                  <ion-input class=\"form-input\"\r\n                    [(ngModel)]=\"metaData.pageTitle\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Meta Description</ion-label>\r\n                  <ion-input class=\"form-input\"\r\n                    [(ngModel)]=\"metaData.metaDescription\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Meta Keywords</ion-label>\r\n                  <ion-input class=\"form-input\"\r\n                    [(ngModel)]=\"metaData.metaKeywords\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row *ngIf=\"isUniversal && brandData !== undefined\">\r\n              <ion-col size=\"12\">\r\n                <h3>Brand Slug</h3>\r\n              </ion-col>\r\n              <ion-col>\r\n                <div class=\"input-wrap\">\r\n                <ion-label>Slug Name <ion-text color=\"danger\">(<b class=\"cursor-p\" \r\n                  (click)=\"sharedService.presentSlugAlert()\">CLICK HERE</b> for Slug Instructions)</ion-text>\r\n                </ion-label>\r\n                 <ion-input type=\"text\" class=\"form-input\" [(ngModel)]='slug.name'></ion-input>\r\n              </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n  </super-tabs-container>\r\n\r\n</super-tabs>"

/***/ }),

/***/ "./src/app/admin/admin-brands/add-brand/add-brand.module.ts":
/*!******************************************************************!*\
  !*** ./src/app/admin/admin-brands/add-brand/add-brand.module.ts ***!
  \******************************************************************/
/*! exports provided: AddBrandPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddBrandPageModule", function() { return AddBrandPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _add_brand_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./add-brand.page */ "./src/app/admin/admin-brands/add-brand/add-brand.page.ts");
/* harmony import */ var src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/components/shared.module */ "./src/app/components/shared.module.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");
/* harmony import */ var src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/directives/application-directives.module */ "./src/app/directives/application-directives.module.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");











var routes = [
    {
        path: '',
        component: _add_brand_page__WEBPACK_IMPORTED_MODULE_6__["AddBrandPage"]
    }
];
var AddBrandPageModule = /** @class */ (function () {
    function AddBrandPageModule() {
    }
    AddBrandPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
                src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_9__["ApplicationDirectivesModule"],
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_8__["SuperTabsModule"],
                ng2_ckeditor__WEBPACK_IMPORTED_MODULE_10__["CKEditorModule"]
            ],
            declarations: [_add_brand_page__WEBPACK_IMPORTED_MODULE_6__["AddBrandPage"]]
        })
    ], AddBrandPageModule);
    return AddBrandPageModule;
}());



/***/ }),

/***/ "./src/app/admin/admin-brands/add-brand/add-brand.page.scss":
/*!******************************************************************!*\
  !*** ./src/app/admin/admin-brands/add-brand/add-brand.page.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ab-wrapper {\n  font-size: 14px;\n}\n\n.ab-headings {\n  margin-top: 20px;\n  margin-bottom: 10px;\n}\n\n.ab-data-container ion-input {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.ab-data-sections {\n  margin-top: 15px;\n}\n\n.ab-upload-imgs {\n  text-align: center;\n}\n\n.ab-offer-imgs div {\n  max-width: 100%;\n  position: relative;\n  text-align: center;\n}\n\n.ab-offer-imgs div img {\n  width: 90%;\n  height: 20vh;\n  margin: 10px;\n  -o-object-fit: contain;\n     object-fit: contain;\n  border: 1px solid #ccc;\n}\n\n.ab-offer-imgs div div {\n  position: absolute;\n  top: 0px;\n  right: 10px;\n  font-size: 20px;\n}\n\n.cancel-btn {\n  background-color: var(--ion-color-dark);\n  color: white;\n}\n\n.save-btn {\n  background-color: var(--ion-color-primary);\n  color: var(--ion-color-primary-contrast);\n}\n\n.margin-icon {\n  margin-left: 5px;\n}\n\nion-footer ion-title {\n  height: 45px;\n}\n\n.bottom-buttons {\n  font-size: 15px;\n  margin-left: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tYnJhbmRzL2FkZC1icmFuZC9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGFkbWluLWJyYW5kc1xcYWRkLWJyYW5kXFxhZGQtYnJhbmQucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZG1pbi1icmFuZHMvYWRkLWJyYW5kL2FkZC1icmFuZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxlQUFBO0FDQ0o7O0FERUE7RUFDSSxnQkFBQTtFQUNBLG1CQUFBO0FDQ0o7O0FERUE7RUFDSSxzQkFBQTtFQUNBLGtCQUFBO0FDQ0o7O0FERUE7RUFDSSxnQkFBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0FDQ0o7O0FEQUk7RUFDSSxVQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtLQUFBLG1CQUFBO0VBQ0Esc0JBQUE7QUNFUjs7QURBSTtFQUNJLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FDRVI7O0FERUE7RUFDSSx1Q0FBQTtFQUNBLFlBQUE7QUNDSjs7QURFRTtFQUNFLDBDQUFBO0VBQ0Esd0NBQUE7QUNDSjs7QURFRTtFQUNFLGdCQUFBO0FDQ0o7O0FERUU7RUFDRSxZQUFBO0FDQ0o7O0FERUU7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2FkbWluLWJyYW5kcy9hZGQtYnJhbmQvYWRkLWJyYW5kLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hYi13cmFwcGVyIHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5cclxuLmFiLWhlYWRpbmdzIHtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uYWItZGF0YS1jb250YWluZXIgaW9uLWlucHV0IHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5hYi1kYXRhLXNlY3Rpb25zIHtcclxuICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbn1cclxuXHJcbi5hYi11cGxvYWQtaW1ncyB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5hYi1vZmZlci1pbWdzIGRpdiB7XHJcbiAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBpbWcge1xyXG4gICAgICAgIHdpZHRoOiA5MCU7XHJcbiAgICAgICAgaGVpZ2h0OiAyMHZoO1xyXG4gICAgICAgIG1hcmdpbjogMTBweDtcclxuICAgICAgICBvYmplY3QtZml0OiBjb250YWluO1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICB9XHJcbiAgICBkaXYge1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB0b3A6IDBweDtcclxuICAgICAgICByaWdodDogMTBweDtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5jYW5jZWwtYnRuIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICAgIGNvbG9yOiB3aGl0ZVxyXG4gIH1cclxuXHJcbiAgLnNhdmUtYnRuIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XHJcbiAgfVxyXG5cclxuICAubWFyZ2luLWljb24ge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICB9XHJcblxyXG4gIGlvbi1mb290ZXIgaW9uLXRpdGxlIHtcclxuICAgIGhlaWdodDogNDVweDtcclxuICB9XHJcblxyXG4gIC5ib3R0b20tYnV0dG9ucyB7XHJcbiAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gIH0iLCIuYWItd3JhcHBlciB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLmFiLWhlYWRpbmdzIHtcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLmFiLWRhdGEtY29udGFpbmVyIGlvbi1pbnB1dCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLmFiLWRhdGEtc2VjdGlvbnMge1xuICBtYXJnaW4tdG9wOiAxNXB4O1xufVxuXG4uYWItdXBsb2FkLWltZ3Mge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5hYi1vZmZlci1pbWdzIGRpdiB7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uYWItb2ZmZXItaW1ncyBkaXYgaW1nIHtcbiAgd2lkdGg6IDkwJTtcbiAgaGVpZ2h0OiAyMHZoO1xuICBtYXJnaW46IDEwcHg7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG59XG4uYWItb2ZmZXItaW1ncyBkaXYgZGl2IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDBweDtcbiAgcmlnaHQ6IDEwcHg7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLmNhbmNlbC1idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLnNhdmUtYnRuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xufVxuXG4ubWFyZ2luLWljb24ge1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuXG5pb24tZm9vdGVyIGlvbi10aXRsZSB7XG4gIGhlaWdodDogNDVweDtcbn1cblxuLmJvdHRvbS1idXR0b25zIHtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBtYXJnaW4tbGVmdDogNXB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/admin-brands/add-brand/add-brand.page.ts":
/*!****************************************************************!*\
  !*** ./src/app/admin/admin-brands/add-brand/add-brand.page.ts ***!
  \****************************************************************/
/*! exports provided: AddBrandPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddBrandPage", function() { return AddBrandPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var src_app_services_loggly_logger_loggly_logger_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/loggly-logger/loggly-logger.service */ "./src/app/services/loggly-logger/loggly-logger.service.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/components/image-editor/image-editor.component */ "./src/app/components/image-editor/image-editor.component.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");











var AddBrandPage = /** @class */ (function () {
    function AddBrandPage(router, events, loadingController, alertController, camera, actionSheetController, route, modalController, labelService, logglyService, configService, sharedService) {
        var _this = this;
        this.router = router;
        this.events = events;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.camera = camera;
        this.actionSheetController = actionSheetController;
        this.route = route;
        this.modalController = modalController;
        this.labelService = labelService;
        this.logglyService = logglyService;
        this.configService = configService;
        this.sharedService = sharedService;
        this.status = true;
        this.name = '';
        this.metaData = {
            pageTitle: '',
            metaDescription: '',
            metaKeywords: '',
        };
        this.image = [];
        this.banner = [];
        this.brandId = '';
        this.ADD_BRAND_LABELS = {};
        this.SHARED_LABELS = {};
        this.multiRegion = false;
        this.regions = [];
        this.regionId = [];
        this.description = '';
        this.customWidthVal = 4;
        this.customHeightVal = 3;
        this.slug = {
            name: '',
            updatedAt: new Date(),
            updatedBy: 'admin'
        };
        this.isUniversal = false;
        this.route.queryParams.subscribe(function (params) {
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.brandData = _this.router.getCurrentNavigation().extras.state.brandData;
                if (_this.brandData) {
                    _this.name = _this.brandData.name;
                    _this.status = _this.brandData.status;
                    _this.slug = _this.brandData.slug || _this.slug;
                    if (_this.brandData.metaData) {
                        _this.metaData = _this.brandData.metaData;
                    }
                    _this.image = _this.brandData.image.hasOwnProperty('url') ? [tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _this.brandData.image)] : [];
                    _this.banner = _this.brandData.banner.hasOwnProperty('url') ? [tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _this.brandData.banner)] : [];
                    _this.brandId = _this.brandData.id;
                    _this.sortedAt = _this.brandData.sortedAt;
                    _this.regionId = _this.brandData.hasOwnProperty('regionId') ? _this.brandData.regionId : _this.regionId;
                    _this.description = 'description' in _this.brandData ? _this.brandData.description : '';
                }
            }
        });
    }
    AddBrandPage.prototype.ngOnInit = function () {
        this.ckeConfig = {
            allowedContent: true,
            toolbar: [
                ['Bold', 'Italic', 'Underline', '-', 'NumberedList', 'BulletedList',
                    '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Format', 'FontSize', 'Link']
            ],
            height: 150
        };
    };
    AddBrandPage.prototype.ionViewWillEnter = function () {
        this.initializeSubscriptions();
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.ADD_BRAND_LABELS = this.labelService.labels['ADD_BRAND'];
        this.selectRegionPh = this.SHARED_LABELS['select_region'];
        this.multiRegion = this.configService.environment.multiRegion;
        this.isUniversal = this.sharedService.isUniversal();
        if (this.multiRegion) {
            this.events.publish('multi-region:getActiveStatus');
            this.events.publish('multi-region:getAllActiveRegions');
        }
    };
    AddBrandPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    AddBrandPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('brands:saveBrandSuccess', function () {
            _this.loading.dismiss();
            _this.presentAlert('Brand Saved Successfully', true);
        });
        this.events.subscribe('brands:deleteBrandSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('Brand deleted successfully!', true);
        });
        this.events.subscribe('multi-region:publishActiveStatus', function (data) {
            if (data) {
                _this.multiRegion = data.active;
            }
        });
        this.events.subscribe('multi-region:publishAllActiveRegions', function (regions) {
            if (regions.length) {
                _this.regions = regions;
            }
        });
    };
    AddBrandPage.prototype.saveBrand = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var brandData, slugName, sameSlugExists;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.name) return [3 /*break*/, 1];
                        this.presentAlert('Please enter brand name');
                        return [3 /*break*/, 5];
                    case 1:
                        brandData = {
                            name: this.name,
                            metaData: this.metaData,
                            status: this.status,
                            regionId: this.regionId,
                            description: this.description
                        };
                        if (!(this.isUniversal && this.brandId)) return [3 /*break*/, 3];
                        slugName = this.sharedService.createSlugName(this.slug.name);
                        return [4 /*yield*/, this.sharedService.sameSlugExists('brands', this.brandId, slugName)];
                    case 2:
                        sameSlugExists = _a.sent();
                        if (sameSlugExists) {
                            this.presentAlert('Same slug already exists, please try with another slug name');
                            return [2 /*return*/];
                        }
                        else {
                            brandData['slug'] = {
                                name: slugName,
                                updatedAt: new Date(),
                                updatedBy: 'admin'
                            };
                        }
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.presentLoading('Saving brand details...', 10000)];
                    case 4:
                        _a.sent();
                        brandData['sortedAt'] = this.brandId ? this.sortedAt : new Date();
                        console.log(brandData);
                        this.events.publish('brands:saveBrand', brandData, this.image, this.banner, this.brandId);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // updateStatus() {
    //   if (this.status === true) {
    //     this.status = true;
    //   } else {
    //     this.status = false;
    //   }
    //   console.log()
    // }
    AddBrandPage.prototype.removeImage = function (type) {
        if (type === 'brandImg') {
            this.image.splice(0, 1);
        }
        else {
            this.banner.splice(0, 1);
        }
    };
    AddBrandPage.prototype.deleteConfirm = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Are you sure you want to delete this brand?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Delete',
                                    handler: function () {
                                        console.log('Confirm Okay');
                                        _this.deleteBrand();
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
    AddBrandPage.prototype.deleteBrand = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading('Deleting brand...', 5000)];
                    case 1:
                        _a.sent();
                        this.events.publish('brands:deleteBrand', this.brandId);
                        return [2 /*return*/];
                }
            });
        });
    };
    AddBrandPage.prototype.imageActionSheet = function (type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: 'Select any option',
                            buttons: [{
                                    text: 'Camera',
                                    icon: 'camera',
                                    handler: function () {
                                        _this.addCameraImage('camera', type);
                                    }
                                }, {
                                    text: 'Gallery',
                                    icon: 'images',
                                    handler: function () {
                                        _this.addCameraImage('gallery', type);
                                    }
                                }, {
                                    text: 'Cancel',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddBrandPage.prototype.addCameraImage = function (ctype, type) {
        var _this = this;
        var optionsforCamera = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            allowEdit: true
        };
        if (ctype === 'gallery') {
            optionsforCamera['sourceType'] = 0;
        }
        this.camera.getPicture(optionsforCamera).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            if (type === 'brandImg') {
                _this.banner = [];
                _this.banner.push({ url: base64Image });
            }
            else {
                _this.image = [];
                _this.image.push({ url: base64Image });
            }
        }, function (err) {
            console.log(err);
        });
    };
    AddBrandPage.prototype.uploadImage = function (files, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type == 'brandBanner') {
                            this.customWidthVal = 3.42;
                            this.customHeightVal = 1;
                        }
                        console.log(type);
                        return [4 /*yield*/, this.modalController.create({
                                component: src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_9__["ImageEditorComponent"],
                                componentProps: {
                                    aspectRatioWidthVal: this.customWidthVal,
                                    aspectRatioHeightVal: this.customHeightVal,
                                },
                                cssClass: 'custom-img-editor'
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        modal.onDidDismiss().then(function (res) {
                            if (type === 'brandImg') {
                                _this.image = [];
                                _this.image.push({ url: res.data || '' });
                            }
                            else {
                                _this.banner = [];
                                _this.banner.push({ url: res.data || '' });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AddBrandPage.prototype.imgZoom = function (img) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_5__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: [{ url: img }],
                index: 0
            }
        }).then(function (modal) { return modal.present(); });
    };
    AddBrandPage.prototype.presentAlert = function (msg, action) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: [{
                                    text: 'OK',
                                    handler: function () {
                                        if (action) {
                                            _this.router.navigate(['all-brands']);
                                        }
                                    }
                                }]
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
    AddBrandPage.prototype.presentLoading = function (msg, drn) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: msg,
                                duration: drn
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
    AddBrandPage.prototype.addRegion = function (e) {
        console.log('regionId', e.target.value);
        this.regionId = e.target.value;
    };
    AddBrandPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('brands:saveBrandSuccess');
        this.events.unsubscribe('brands:deleteBrandSuccess');
        this.events.unsubscribe('multi-region:publishActiveStatus');
        this.events.unsubscribe('multi-region:publishAllActiveRegions');
        this.events.publish('brands:removeBrandsSubs');
    };
    AddBrandPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__["Camera"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ActionSheetController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_6__["LabelService"] },
        { type: src_app_services_loggly_logger_loggly_logger_service__WEBPACK_IMPORTED_MODULE_7__["LogglyLoggerService"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_8__["ConfigService"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_10__["SharedService"] }
    ]; };
    AddBrandPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-brand',
            template: __webpack_require__(/*! raw-loader!./add-brand.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-brands/add-brand/add-brand.page.html"),
            styles: [__webpack_require__(/*! ./add-brand.page.scss */ "./src/app/admin/admin-brands/add-brand/add-brand.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__["Camera"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ActionSheetController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
            src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_6__["LabelService"],
            src_app_services_loggly_logger_loggly_logger_service__WEBPACK_IMPORTED_MODULE_7__["LogglyLoggerService"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_8__["ConfigService"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_10__["SharedService"]])
    ], AddBrandPage);
    return AddBrandPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-brands-add-brand-add-brand-module-es5.js.map