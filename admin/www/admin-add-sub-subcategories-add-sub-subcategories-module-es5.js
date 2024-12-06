(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-add-sub-subcategories-add-sub-subcategories-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/add-sub-subcategories/add-sub-subcategories.page.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/add-sub-subcategories/add-sub-subcategories.page.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\" defaultHref=\"admin-home\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title class=\"ion-text-center\">{{subcategoryData ? 'Edit' : 'New'}} sub of subcategory</ion-title>\r\n  </ion-toolbar>\r\n\r\n  <div class=\"header-cart-btn\" style=\"margin-right: 35px;\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"exportProducts()\" style=\"color: black;\">\r\n      Export products\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n<!-- New -->\r\n<ion-content *ngIf=\"subcategoryData === undefined; else editSubcategoryData\">\r\n  <div class=\"main-container\">\r\n\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <div class=\"flex-space-between\">\r\n              <div>\r\n                <ion-label>Subcategory Name</ion-label>\r\n              </div>\r\n              <div class=\"flex-label\">\r\n                <ion-label>Show</ion-label>\r\n                <ion-toggle (click)=\"updateNewSubcategoryStatus()\" checked></ion-toggle>\r\n              </div>\r\n            </div>\r\n            <ion-input class=\"form-input\" [(ngModel)]=\"categoryValue\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col>\r\n          <div class=\"headings\">Subcategory Description</div>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <ckeditor [(ngModel)]=\"description\" [config]=\"ckeConfig\"></ckeditor>\r\n        </ion-col>\r\n        <!-- <ion-col size=\"12\">\r\n        <div class=\"input-wrap\">\r\n          <div class=\"flex-label\">\r\n            <ion-label>Exclusive</ion-label>\r\n            <ion-toggle [(ngModel)]=\"subcategoryIsExclusive\"></ion-toggle>\r\n          </div>\r\n          <ion-text color=\"danger\">\r\n            <p>Note: This feature will allow order from only one Subcategory</p>\r\n          </ion-text>\r\n        </div>\r\n      </ion-col> -->\r\n        <ion-col size=\"12\">\r\n          <div class=\"flex-space-between\">\r\n            <div>\r\n              <ion-label>Subcategory Image</ion-label>\r\n              <ion-text color=\"danger\">\r\n                <p style=\"margin-top: 5px\">Image size for best view : 600x450 Px</p>\r\n              </ion-text>\r\n            </div>\r\n            <div class=\"upload-btn-wrapper\">\r\n              <button [disabled]=\"imageResponse.length !== 0\" class=\"upload-btn btn-1 i-start\"> <i\r\n                  class=\"flaticon-null-16\"></i>upload</button>\r\n              <input [disabled]=\"imageResponse.length !== 0\" type=\"file\" name=\"myfile\"\r\n                (change)=\"uploadImage($event.target.files,'catImg')\" />\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n    <div class=\"img-container\">\r\n      <div class=\"no-img\" *ngIf=\"!imageResponse.length\">\r\n        <p>No attached image</p>\r\n      </div>\r\n      <div *ngIf=\"imageResponse.length !== 0\">\r\n        <div class=\"img-wrap\">\r\n          <img class=\"category-img\" src=\"{{imageResponse[0].imgData}}\" (click)=\"imgZoom(imageResponse[0].imgData)\" />\r\n          <div class=\"overlay\">\r\n            <ion-button class=\"btn-2\" shape=\"round\" color=\"danger\" fill=\"clear\" (click)=\"removeImage('catImg')\">\r\n              <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\r\n            </ion-button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</ion-content>\r\n<ion-footer *ngIf=\"subcategoryData === undefined\">\r\n  <ion-button expand=\"full\" class=\"btn-1 i-start\" (click)=\"addSubOfSubCategory()\" color=\"success\">\r\n    <i class=\"flaticon-null-20 margin-icon\"></i>\r\n    Save\r\n  </ion-button>\r\n</ion-footer>\r\n\r\n<!-- Edit -->\r\n<ng-template #editSubcategoryData>\r\n  <super-tabs>\r\n    <super-tabs-toolbar slot=\"top\">\r\n      <super-tab-button>\r\n        <ion-label>information</ion-label>\r\n      </super-tab-button>\r\n      <super-tab-button>\r\n        <ion-label>products</ion-label>\r\n      </super-tab-button>\r\n    </super-tabs-toolbar>\r\n\r\n    <super-tabs-container>\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container\">\r\n            <ion-grid>\r\n              <ion-row>\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-space-between\">\r\n                      <div>\r\n                        <ion-label>Subcategory Name</ion-label>\r\n                      </div>\r\n                      <div class=\"flex-label\">\r\n                        <ion-label>Show&nbsp;&nbsp;</ion-label>\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\" (click)=\"updateEditSubcategoryStatus(subcategoryData.status)\"\r\n                              [checked]=\"subcategoryData.status == true\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <br>\r\n                    <ion-input class=\"ion-text-capitalize\" [(ngModel)]=\"subcategoryData.name\"\r\n                      style=\"border: 1px solid gray\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"12\">\r\n                  <div class=\"headings\">Subcategory Description</div>\r\n                </ion-col>\r\n                <ion-col size=\"12\">\r\n                  <ckeditor [(ngModel)]=\"subcategoryData.description\" [config]=\"ckeConfig\"></ckeditor>\r\n                </ion-col>\r\n                <!-- <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-label\">\r\n                      <ion-label>Exclusive</ion-label>\r\n                      <ion-toggle [(ngModel)]=\"subcategoryData.isExclusive\"></ion-toggle>\r\n                    </div>\r\n                    <ion-text color=\"danger\">\r\n                      <p>Note: This feature will allow order from only one Subcategory</p>\r\n                    </ion-text>\r\n                  </div>\r\n                </ion-col> -->\r\n                <ion-col size=\"12\">\r\n                  <div class=\"flex-space-between\">\r\n                    <div>\r\n                      <ion-label>Subcategory Image</ion-label>\r\n                      <ion-text color=\"danger\">\r\n                        <p style=\"margin-top: 5px\">Image size for best view : 600x450 Px</p>\r\n                      </ion-text>\r\n                    </div>\r\n                    <div class=\"upload-btn-wrapper\">\r\n                      <button\r\n                        [disabled]=\"imageResponse.length !== 0 || (subcategoryData.image && subcategoryData.image.url)\"\r\n                        class=\"upload-btn btn-1 i-start\"> <i class=\"flaticon-null-16\"></i>upload</button>\r\n                      <input\r\n                        [disabled]=\"imageResponse.length !== 0 ||  (subcategoryData.image && subcategoryData.image.url)\"\r\n                        type=\"file\" name=\"myfile\" (change)=\"uploadImage($event.target.files,'catImg')\" />\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"img-container\">\r\n                    <div class=\"no-img\"\r\n                      *ngIf=\"(!imageResponse.length && !(subcategoryData.image && subcategoryData.image.url))\">\r\n                      <p>No attached image</p>\r\n                    </div>\r\n                    <div *ngIf=\"subcategoryData.image\">\r\n                      <div class=\"img-wrap\" *ngIf=\"subcategoryData.image.url\">\r\n                        <img class=\"category-img\" [src]=\"subcategoryData.image.url\"\r\n                          (click)=\"imgZoom(subcategoryData.image.url)\" />\r\n                        <div class=\"overlay\">\r\n                          <ion-button class=\"btn-2\" shape=\"round\" fill=\"clear\" color=\"danger\"\r\n                            (click)=\"removeEditImage('catImg')\">\r\n                            <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\r\n                          </ion-button>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div *ngIf=\"imageResponse.length !== 0\">\r\n                      <div class=\"img-wrap\">\r\n                        <img class=\"category-img\" [src]=\"imageResponse[0].imgData\"\r\n                          (click)=\"imgZoom(imageResponse[0].imgData)\" />\r\n                        <div class=\"overlay\">\r\n                          <ion-button class=\"btn-2\" shape=\"round\" color=\"danger\" fill=\"clear\"\r\n                            (click)=\"removeImage('catImg')\">\r\n                            <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\r\n                          </ion-button>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"12\">\r\n                  <div class=\"flex-space-between\">\r\n                    <div>\r\n                      <ion-label>Banner Image</ion-label>\r\n                      <ion-text color=\"danger\">\r\n                        <p style=\"margin-top: 5px\">Image size for best view : 1366x400 Px</p>\r\n                      </ion-text>\r\n                    </div>\r\n                    <div class=\"upload-btn-wrapper\">\r\n                      <button [disabled]=\"banner.length !== 0 || (subcategoryData.banner && subcategoryData.banner.url)\"\r\n                        class=\"upload-btn btn-1 i-start\"> <i class=\"flaticon-null-16\"></i>Upload Banner Image</button>\r\n                      <input [disabled]=\"banner.length !== 0 || (subcategoryData.banner && subcategoryData.banner.url)\"\r\n                        type=\"file\" name=\"myfile\" (change)=\"uploadImage($event.target.files, 'bannerImg')\" />\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"img-container\">\r\n                    <div class=\"no-img\"\r\n                      *ngIf=\"(!banner.length && !(subcategoryData.banner && subcategoryData.banner.url))\">\r\n                      <p>No Banner image</p>\r\n                    </div>\r\n                    <div *ngIf=\"subcategoryData.banner\">\r\n                      <div class=\"img-wrap\" *ngIf=\"subcategoryData.banner.url\">\r\n                        <img class=\"category-img\" [src]=\"subcategoryData.banner.url\"\r\n                          (click)=\"imgZoom(subcategoryData.banner.url)\" />\r\n                        <div class=\"overlay\">\r\n                          <ion-button class=\"btn-2 remove\" shape=\"round\" fill=\"clear\" color=\"danger\"\r\n                            (click)=\"removeEditImage('bannerImg')\">\r\n                            <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\r\n                          </ion-button>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div *ngIf=\"banner.length !== 0\">\r\n                      <div class=\"img-wrap\">\r\n                        <img class=\"category-img\" [src]=\"banner[0].imgData\" (click)=\"imgZoom(banner[0].imgData)\" />\r\n                        <div class=\"overlay\">\r\n                          <ion-button class=\"btn-2 remove\" shape=\"round\" color=\"danger\" fill=\"clear\"\r\n                            (click)=\"removeImage('bannerImg')\">\r\n                            <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\r\n                          </ion-button>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n\r\n\r\n          </div>\r\n        </ion-content>\r\n      </super-tab>\r\n\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container\">\r\n            <div *ngIf=\"showLoader; else showListOfProducts\" class=\"spinner\">\r\n              <ion-spinner color=\"primary\"></ion-spinner>\r\n            </div>\r\n\r\n            <div class=\"no-data ion-text-center\" *ngIf=\"showNoProducts\">\r\n              <img src=\"assets/img/no-product.png\" alt=\"\">\r\n              <h6>No products</h6>\r\n            </div>\r\n\r\n\r\n\r\n            <ng-template #showListOfProducts>\r\n              <div class=\"section-search-wrap\" *ngIf=\"!showNoProducts\">\r\n                <ion-searchbar [(ngModel)]=\"searchProduct\" mode=\"ios\"></ion-searchbar>\r\n              </div>\r\n              <div class=\"product-headings\" *ngIf=\"!showNoProducts\">\r\n                <ion-grid class=\"ion-no-padding\">\r\n                  <ion-row>\r\n                    <ion-col>\r\n                      <p>Image</p>\r\n                    </ion-col>\r\n                    <ion-col>\r\n                      <p>Product</p>\r\n                    </ion-col>\r\n                    <ion-col>\r\n                      Action\r\n                    </ion-col>\r\n                    <ion-col class=\"ion-text-right\">\r\n                      <p>Reorder</p>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                </ion-grid>\r\n              </div>\r\n\r\n              <ion-list class=\"ion-no-padding row-border\" *ngIf=\"prod && prod.length !== 0 && !showNoProducts\">\r\n                <ion-reorder-group (ionItemReorder)=\"onRenderItems($event)\" [disabled]=\"prod.length==1\"\r\n                  class=\"ion-no-padding\">\r\n\r\n                  <ion-item class=\"ion-no-padding\" *ngFor=\"let item of prod | filter: searchProduct; let i = index\">\r\n                    <ion-grid class=\"ion-no-padding ion-align-items-center\">\r\n                      <ion-row class=\"row-background ion-align-items-center\">\r\n                        <ion-col>\r\n                          <ion-thumbnail>\r\n                            <img class=\"loading\" *ngIf=\"item.coverPic && !item.coverPic.thumb && item.coverPic.url\"\r\n                              src=\"{{item.coverPic.url}}\">\r\n                            <img class=\"loading\" *ngIf=\"item.coverPic && item.coverPic.thumb\"\r\n                              src=\"{{item.coverPic.thumb}}\">\r\n                            <img *ngIf=\"!item.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n                          </ion-thumbnail>\r\n                        </ion-col>\r\n                        <ion-col>\r\n                          <p class=\"ion-text-capitalize\">{{item.prodName}}</p>\r\n                        </ion-col>\r\n                        <ion-col>\r\n                          <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"editProduct(item)\">\r\n                            <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\"></i>\r\n                          </ion-button>\r\n                        </ion-col>\r\n                        <ion-col class=\"ion-text-right\">\r\n                          <ion-reorder>\r\n                            <div class=\"flat-sort\">\r\n                              <i class=\"flaticon-menu\"></i>\r\n                            </div>\r\n                          </ion-reorder>\r\n                        </ion-col>\r\n                      </ion-row>\r\n                    </ion-grid>\r\n                  </ion-item>\r\n\r\n                </ion-reorder-group>\r\n              </ion-list>\r\n            </ng-template>\r\n          </div>\r\n        </ion-content>\r\n      </super-tab>\r\n    </super-tabs-container>\r\n\r\n  </super-tabs>\r\n\r\n  <ion-footer>\r\n    <ion-grid class=\"ion-no-padding\">\r\n      <ion-row>\r\n        <ion-col size=\"6\" class=\"ion-no-padding\">\r\n          <ion-button (click)=\"deleteSubcategoryConfirm();\" expand=\"full\" class=\"btn-1 i-start\" color=\"danger\">\r\n            <i class=\"flaticon-null-21\"></i>\r\n            Delete\r\n          </ion-button>\r\n        </ion-col>\r\n        <ion-col size=\"6\" class=\"ion-no-padding\">\r\n          <ion-button (click)=\"editSubOfSubCategory()\" expand=\"full\" class=\"btn-1 i-start\" color=\"success\">\r\n            <i class=\"flaticon-null-20 margin-icon\"></i>\r\n            Save\r\n          </ion-button>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </ion-footer>\r\n\r\n</ng-template>"

/***/ }),

/***/ "./src/app/admin/add-sub-subcategories/add-sub-subcategories.module.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/admin/add-sub-subcategories/add-sub-subcategories.module.ts ***!
  \*****************************************************************************/
/*! exports provided: AddSubSubcategoriesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddSubSubcategoriesPageModule", function() { return AddSubSubcategoriesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _add_sub_subcategories_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./add-sub-subcategories.page */ "./src/app/admin/add-sub-subcategories/add-sub-subcategories.page.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");










var routes = [
    {
        path: '',
        component: _add_sub_subcategories_page__WEBPACK_IMPORTED_MODULE_6__["AddSubSubcategoriesPage"]
    }
];
var AddSubSubcategoriesPageModule = /** @class */ (function () {
    function AddSubSubcategoriesPageModule() {
    }
    AddSubSubcategoriesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_8__["SuperTabsModule"],
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_9__["Ng2SearchPipeModule"],
                ng2_ckeditor__WEBPACK_IMPORTED_MODULE_7__["CKEditorModule"]
            ],
            declarations: [_add_sub_subcategories_page__WEBPACK_IMPORTED_MODULE_6__["AddSubSubcategoriesPage"]]
        })
    ], AddSubSubcategoriesPageModule);
    return AddSubSubcategoriesPageModule;
}());



/***/ }),

/***/ "./src/app/admin/add-sub-subcategories/add-sub-subcategories.page.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/admin/add-sub-subcategories/add-sub-subcategories.page.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".img-container {\n  text-align: center;\n  padding-top: 20px;\n}\n.img-container .img-wrap {\n  width: 300px;\n  display: inline-block;\n  position: relative;\n  border: var(--ion-color-medium) 1px solid;\n  border-radius: 16px;\n  overflow: hidden;\n}\n.img-container .img-wrap ion-button {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}\n.product-headings {\n  background: var(--ion-color-medium);\n  padding: 8px;\n  margin: 0 -16px;\n}\n.loading {\n  background: transparent url(\"https://s5.gifyu.com/images/377-2.gif\") center no-repeat;\n}\nsuper-tabs,\nsuper-tabs-container,\nsuper-tab {\n  width: 100%;\n  max-width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRkLXN1Yi1zdWJjYXRlZ29yaWVzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcYWRkLXN1Yi1zdWJjYXRlZ29yaWVzXFxhZGQtc3ViLXN1YmNhdGVnb3JpZXMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZGQtc3ViLXN1YmNhdGVnb3JpZXMvYWRkLXN1Yi1zdWJjYXRlZ29yaWVzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0EsaUJBQUE7QUNDRjtBREFFO0VBQ0UsWUFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5Q0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUNFSjtBRERJO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtBQ0dOO0FERUE7RUFDRSxtQ0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FDQ0Y7QURFQTtFQUNFLHFGQUFBO0FDQ0Y7QURHQTs7O0VBR0UsV0FBQTtFQUNBLGVBQUE7QUNBRiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2FkZC1zdWItc3ViY2F0ZWdvcmllcy9hZGQtc3ViLXN1YmNhdGVnb3JpZXMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmltZy1jb250YWluZXIge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBwYWRkaW5nLXRvcDogMjBweDtcclxuICAuaW1nLXdyYXAge1xyXG4gICAgd2lkdGg6IDMwMHB4O1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYm9yZGVyOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGlvbi1idXR0b24ge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogOHB4O1xyXG4gICAgICByaWdodDogOHB4O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLnByb2R1Y3QtaGVhZGluZ3Mge1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gIHBhZGRpbmc6IDhweDtcclxuICBtYXJnaW46IDAgLTE2cHg7XHJcbn1cclxuXHJcbi5sb2FkaW5nIHtcclxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXCJodHRwczovL3M1LmdpZnl1LmNvbS9pbWFnZXMvMzc3LTIuZ2lmXCIpIGNlbnRlclxyXG4gICAgbm8tcmVwZWF0O1xyXG59XHJcblxyXG5zdXBlci10YWJzLFxyXG5zdXBlci10YWJzLWNvbnRhaW5lcixcclxuc3VwZXItdGFiIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXgtd2lkdGg6IDEwMCU7XHJcbn1cclxuIiwiLmltZy1jb250YWluZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmctdG9wOiAyMHB4O1xufVxuLmltZy1jb250YWluZXIgLmltZy13cmFwIHtcbiAgd2lkdGg6IDMwMHB4O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm9yZGVyOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4uaW1nLWNvbnRhaW5lciAuaW1nLXdyYXAgaW9uLWJ1dHRvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA4cHg7XG4gIHJpZ2h0OiA4cHg7XG59XG5cbi5wcm9kdWN0LWhlYWRpbmdzIHtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIHBhZGRpbmc6IDhweDtcbiAgbWFyZ2luOiAwIC0xNnB4O1xufVxuXG4ubG9hZGluZyB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcImh0dHBzOi8vczUuZ2lmeXUuY29tL2ltYWdlcy8zNzctMi5naWZcIikgY2VudGVyIG5vLXJlcGVhdDtcbn1cblxuc3VwZXItdGFicyxcbnN1cGVyLXRhYnMtY29udGFpbmVyLFxuc3VwZXItdGFiIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogMTAwJTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/add-sub-subcategories/add-sub-subcategories.page.ts":
/*!***************************************************************************!*\
  !*** ./src/app/admin/add-sub-subcategories/add-sub-subcategories.page.ts ***!
  \***************************************************************************/
/*! exports provided: AddSubSubcategoriesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddSubSubcategoriesPage", function() { return AddSubSubcategoriesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/product/product.service */ "./src/app/services/product/product.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/brands/brands.service */ "./src/app/services/brands/brands.service.ts");
/* harmony import */ var src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/categories/categories.service */ "./src/app/services/categories/categories.service.ts");











var AddSubSubcategoriesPage = /** @class */ (function () {
    function AddSubSubcategoriesPage(router, events, loadingController, alertController, camera, actionSheetController, route, modalController, productService, brandService, categoryService) {
        var _this = this;
        this.router = router;
        this.events = events;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.camera = camera;
        this.actionSheetController = actionSheetController;
        this.route = route;
        this.modalController = modalController;
        this.productService = productService;
        this.brandService = brandService;
        this.categoryService = categoryService;
        this.categoryValue = '';
        this.listofbase64Image = [];
        this.imageResponse = [];
        this.prod = [];
        this.showNoProducts = false;
        this.searchProduct = '';
        this.categoryStatus = true;
        this.showLoader = true;
        this.banner = [];
        this.subcategoryIsExclusive = false;
        this.options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            filename: 'Subcategory',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: false,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };
        this.description = '';
        this.route.queryParams.subscribe(function () {
            var routerState = _this.router.getCurrentNavigation().extras.state;
            console.log('subCategoryData', routerState);
            if (routerState) {
                _this.subcategoryData = routerState.subcategoryData;
                _this.categoryId = routerState.categoryId;
                _this.subCatId = routerState.subCategoryId;
            }
        });
    }
    AddSubSubcategoriesPage.prototype.onRenderItems = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, start, id, end, firstDate, secondDate, changedDate, changedDate, firstDate, secondDate, changedDate, changedDate, draggedItem;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
                                duration: 3000
                            })];
                    case 1:
                        _a.loader = _b.sent();
                        return [4 /*yield*/, this.loader.present()];
                    case 2:
                        _b.sent();
                        start = event.detail.from;
                        console.log(start);
                        id = this.prod[start].id;
                        end = event.detail.to;
                        console.log(end);
                        if (start < end && end !== this.prod.length - 1) {
                            firstDate = this.prod[end].sortedAt.toDate().getTime();
                            secondDate = this.prod[end + 1].sortedAt.toDate().getTime();
                            changedDate = (firstDate + secondDate) / 2;
                            this.productService.updateproductsPosition(id, new Date(changedDate));
                        }
                        // tslint:disable-next-line: one-line
                        else if (start < end && end === this.prod.length - 1) {
                            changedDate = this.prod[end].sortedAt.toDate().getTime() - 5 * 60000;
                            this.productService.updateproductsPosition(id, new Date(changedDate));
                        }
                        // tslint:disable-next-line: one-line
                        else if (start > end && end !== 0) {
                            firstDate = this.prod[end].sortedAt.toDate().getTime();
                            secondDate = this.prod[end - 1].sortedAt.toDate().getTime();
                            changedDate = (firstDate + secondDate) / 2;
                            this.productService.updateproductsPosition(id, new Date(changedDate));
                        }
                        // tslint:disable-next-line: one-line
                        else {
                            changedDate = this.prod[end].sortedAt.toDate().getTime() + 5 * 60000;
                            this.productService.updateproductsPosition(id, new Date(changedDate));
                        }
                        draggedItem = this.prod.splice(event.detail.from, 1)[0];
                        this.prod.splice(event.detail.to, 0, draggedItem);
                        event.detail.complete();
                        setTimeout(function () {
                            if (_this.loader) {
                                _this.loader.dismiss();
                            }
                        }, 3000);
                        return [2 /*return*/];
                }
            });
        });
    };
    AddSubSubcategoriesPage.prototype.ngOnInit = function () {
        if (this.subcategoryData && !this.subcategoryData.hasOwnProperty('banner')) {
            this.subcategoryData.banner = [{ size: null, url: null }];
        }
        this.ckeConfig = {
            allowedContent: true,
            toolbar: [
                ['Bold', 'Italic', 'Underline', '-', 'NumberedList', 'BulletedList',
                    '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Format', 'FontSize']
            ],
            height: 150
        };
    };
    AddSubSubcategoriesPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var productData;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.subcategoryData) return [3 /*break*/, 2];
                        this.subcategoryData.description = 'description' in this.subcategoryData ? this.subcategoryData.description : '';
                        console.log(this.subcategoryData);
                        return [4 /*yield*/, this.categoryService.getProductsForSubOfSubCategory(this.subcategoryData.id)];
                    case 1:
                        productData = _a.sent();
                        if (productData) {
                            console.log('proRes', productData);
                            this.prod = productData;
                            this.showNoProducts = false;
                            this.showLoader = false;
                        }
                        else {
                            console.log('no Prod', this.prod);
                            this.showLoader = false;
                            this.showNoProducts = true;
                        }
                        _a.label = 2;
                    case 2:
                        this.initializeSubscriptions();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddSubSubcategoriesPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    AddSubSubcategoriesPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('product:addSubcategorySuccess', function () {
            _this.loading.dismiss();
            _this.description = '';
            _this.categoryValue = null;
            _this.imageResponse = [];
            _this.banner = [];
            _this.presentAlert('Subcatgeory Added Successfully', true);
        });
        this.events.subscribe('product:deleteSubcategorySuccess', function () {
            _this.loading.dismiss();
            _this.presentAlert('Subcategory deleted successfully!', true);
        });
        this.events.subscribe('product:editSubcategorySuccess', function () {
            _this.loading.dismiss();
            _this.presentAlert('Subcategory edited successfully!', true);
        });
        // this.events.subscribe('product:publishProductsForSubcategory', (products) => {
        //   this.prod = products;
        //   console.log(this.prod)
        //   this.showNoProducts = false;
        //   this.showLoader = false;
        // });
        // this.events.subscribe('product:noProductsForSubcategory', () => {
        //   this.showLoader = false;
        //   this.showNoProducts = true;
        // });
        this.events.subscribe('product:updateProductPostionSucess', function () {
            _this.loader.dismiss();
        });
    };
    AddSubSubcategoriesPage.prototype.addSubOfSubCategory = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var subcategory, res;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.categoryValue === '')) return [3 /*break*/, 1];
                        this.presentAlert('Please enter category name');
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.presentLoading()];
                    case 2:
                        _a.sent();
                        subcategory = {
                            name: this.categoryValue,
                            status: this.categoryStatus,
                            isExclusive: this.subcategoryIsExclusive,
                            description: this.description
                        };
                        return [4 /*yield*/, this.categoryService.addSubOfSubCategory(subcategory, this.imageResponse, this.categoryId, this.banner, this.subCatId)];
                    case 3:
                        res = _a.sent();
                        this.loading.dismiss();
                        if (res) {
                            this.presentAlert('Sub of sub category added successfully.');
                        }
                        else {
                            this.presentAlert('Something went wrong !');
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AddSubSubcategoriesPage.prototype.updateNewSubcategoryStatus = function () {
        if (this.categoryStatus === true) {
            this.categoryStatus = false;
        }
        else {
            this.categoryStatus = true;
        }
    };
    AddSubSubcategoriesPage.prototype.updateEditSubcategoryStatus = function (status) {
        if (status === true) {
            this.categoryStatus = false;
        }
        else {
            this.categoryStatus = true;
        }
    };
    AddSubSubcategoriesPage.prototype.removeImage = function (type) {
        if (type === 'catImg') {
            this.imageResponse.splice(0, 1);
        }
        else {
            this.banner.splice(0, 1);
        }
    };
    AddSubSubcategoriesPage.prototype.removeEditImage = function (type) {
        if (type === 'catImg') {
            this.subcategoryData.image = { size: null, url: null };
        }
        else {
            this.subcategoryData.banner = { size: null, url: null };
        }
    };
    AddSubSubcategoriesPage.prototype.editSubOfSubCategory = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var subcategory, updateRes;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.subcategoryData.name) return [3 /*break*/, 1];
                        this.presentAlert('Please enter category name');
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.presentLoading()];
                    case 2:
                        _a.sent();
                        subcategory = {
                            name: this.subcategoryData.name,
                            status: this.categoryStatus,
                            image: this.subcategoryData.image,
                            banner: this.subcategoryData.banner,
                            isExclusive: this.subcategoryData.isExclusive,
                            description: this.subcategoryData.description
                        };
                        console.log('is:', this.subcategoryData.isExclusive);
                        console.log('data:', subcategory, 'img', this.imageResponse, 'catId', this.categoryId, 'subCatId', this.subCatId, 'subOfSubCatId', this.subcategoryData.id, 'banner', this.banner);
                        return [4 /*yield*/, this.categoryService.editSubOfSubCategory(subcategory, this.imageResponse, this.banner, this.categoryId, this.subCatId, this.subcategoryData.id)];
                    case 3:
                        updateRes = _a.sent();
                        this.loading.dismiss();
                        if (updateRes) {
                            this.presentAlert('Successfully Updated.');
                        }
                        else {
                            this.presentAlert('Update Failed.');
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AddSubSubcategoriesPage.prototype.deleteSubcategoryConfirm = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Are you sure you want to delete this category',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        ////console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Delete',
                                    handler: function () {
                                        ////console.log('Confirm Okay');
                                        _this.deleteSubcategory();
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
    AddSubSubcategoriesPage.prototype.deleteSubcategory = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var deleteRes;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        console.log(this.categoryId, this.subCatId, this.subcategoryData.id);
                        deleteRes = this.categoryService.deleteSubOfSubCategory(this.categoryId, this.subCatId, this.subcategoryData.id);
                        this.loading.dismiss();
                        if (deleteRes) {
                            this.presentAlert('Category successfully deleted.');
                        }
                        else {
                            this.presentAlert('category not deleted try after some time.');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AddSubSubcategoriesPage.prototype.uploadImage = function (files, type) {
        var _this = this;
        for (var i = 0; i < files.length; i++) {
            var reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = function (event) {
                var base64Image = event.target.result;
                var base64Str = base64Image.split(',');
                var size = _this.calculateImageSize(base64Str[1]);
                if (type == 'bannerImg') {
                    _this.banner = [];
                    _this.banner.push({ imgData: base64Image, imgSize: size });
                    console.log(_this.banner);
                }
                else {
                    _this.imageResponse = [];
                    _this.imageResponse.push({ imgData: base64Image, imgSize: size });
                }
            };
        }
    };
    AddSubSubcategoriesPage.prototype.imageActionSheet = function () {
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
                                        _this.addCameraImage();
                                    }
                                }, {
                                    text: 'Gallery',
                                    icon: 'images',
                                    handler: function () {
                                        _this.addGalleryImage();
                                    }
                                }, {
                                    text: 'Cancel',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                        ////console.log('Cancel clicked');
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
    AddSubSubcategoriesPage.prototype.addCameraImage = function () {
        var _this = this;
        this.imageResponse = [];
        this.optionsforCamera = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            allowEdit: true
        };
        this.camera.getPicture(this.optionsforCamera).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            var base64Str = base64Image.split(',');
            var size = _this.calculateImageSize(base64Str[1]);
            _this.imageResponse.push({ imgData: base64Image, imgSize: size });
        }, function (err) {
            console.log(err);
        });
    };
    AddSubSubcategoriesPage.prototype.addGalleryImage = function () {
        var _this = this;
        this.imageResponse = [];
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: 0,
            allowEdit: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            var base64Str = base64Image.split(',');
            var size = _this.calculateImageSize(base64Str[1]);
            _this.imageResponse.push({ imgData: base64Image, imgSize: size });
        }, function (err) {
            console.log(err);
        });
    };
    AddSubSubcategoriesPage.prototype.calculateImageSize = function (base64String) {
        var padding, inBytes, base64StringLength;
        if (base64String.endsWith('==')) {
            padding = 2;
        }
        else if (base64String.endsWith('=')) {
            padding = 1;
        }
        else {
            padding = 0;
        }
        base64StringLength = base64String.length;
        inBytes = (base64StringLength / 4) * 3 - padding;
        var kbytes = inBytes / 1000;
        return kbytes;
    };
    AddSubSubcategoriesPage.prototype.cancel = function () {
        this.router.navigate(['admin-categories']);
    };
    AddSubSubcategoriesPage.prototype.imgZoom = function (img) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_5__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: [{ url: img }],
                index: 0
            }
        }).then(function (modal) { return modal.present(); });
    };
    AddSubSubcategoriesPage.prototype.presentAlert = function (desc, action) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.alertController.create({
                                message: desc,
                                buttons: [{
                                        text: 'Ok',
                                        handler: function () {
                                        }
                                    }]
                            })];
                    case 1:
                        _a.alert = _b.sent();
                        return [4 /*yield*/, this.alert.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddSubSubcategoriesPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
                                duration: 5000
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
    AddSubSubcategoriesPage.prototype.clearSearchProduct = function () {
        this.searchProduct = '';
    };
    AddSubSubcategoriesPage.prototype.editProduct = function (item) {
        var navigationExtras = {
            state: {
                product: item,
                productId: item.id,
                routeFromCategories: true
            }
        };
        // this.dismiss();
        if (item.productType == 'booking') {
            this.router.navigate(['create-booking'], navigationExtras);
        }
        else if (item.productType == 'food') {
            this.router.navigate(['create-food-item'], navigationExtras);
        }
        else if (item.productType == 'voucher') {
            this.router.navigate(['create-voucher'], navigationExtras);
        }
        else {
            this.router.navigate(['new-product'], navigationExtras);
        }
    };
    AddSubSubcategoriesPage.prototype.getDateTimeFormat = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_7__(date).format('MMM D, YYYY hh:mm a');
    };
    AddSubSubcategoriesPage.prototype.getPriceListFields = function (priceList) {
        var fields = {
            type: [],
            price: [],
            discountedPrice: [],
            totalQuantity: [],
            shippingWeight: []
        };
        priceList.forEach(function (item, index) {
            fields.type[index] = item.weight ? item.weight : '';
            fields.price[index] = item.price ? item.price : 0,
                fields.discountedPrice[index] = item.discountedPrice ? item.discountedPrice : 0,
                fields.totalQuantity[index] = item.totalQuantity ? item.totalQuantity : '0';
            fields.shippingWeight[index] = item.shippingWeight ? item.shippingWeight : 0;
        });
        return fields;
    };
    AddSubSubcategoriesPage.prototype.exportProducts = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b, _c;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(this.prod && this.prod.length > 0)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _d.sent();
                        if (!!this.categories) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.productService.getAllCategoriesForSideMenu()];
                    case 2:
                        _a.categories = _d.sent();
                        _d.label = 3;
                    case 3:
                        if (!!this.brands) return [3 /*break*/, 5];
                        _b = this;
                        return [4 /*yield*/, this.brandService.getAllBrandsForSideMenu()];
                    case 4:
                        _b.brands = _d.sent();
                        _d.label = 5;
                    case 5:
                        if (!!this.allSubcategories) return [3 /*break*/, 7];
                        _c = this;
                        return [4 /*yield*/, this.productService.getAllSubcategoriesForSideMenu()];
                    case 6:
                        _c.allSubcategories = _d.sent();
                        _d.label = 7;
                    case 7:
                        this.downloadProducts();
                        return [3 /*break*/, 9];
                    case 8:
                        this.presentAlert('No products for exporting');
                        _d.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AddSubSubcategoriesPage.prototype.downloadProducts = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var products, csvExporter;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (this.subcategoryData) {
                    this.options.filename = this.subcategoryData.name + ' ' + this.getDateTimeFormat(new Date);
                }
                products = [];
                this.prod.forEach(function (item) {
                    var product = item;
                    var productCategories = product.categories;
                    var categoryList = [];
                    var productBrands = product.brands;
                    var brandList = [];
                    if (_this.categories) {
                        if (product.categories) {
                            productCategories.forEach(function (categoryId) {
                                var result = _this.categories.find(function (obj) {
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
                                        var catResult = _this.categories.find(function (obj) {
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
                    if (_this.brands) {
                        if (product.brands) {
                            productBrands.forEach(function (brandId) {
                                var result = _this.brands.find(function (obj) {
                                    return obj.id === brandId;
                                });
                                if (result) {
                                    brandList.push(result.name);
                                }
                            });
                        }
                    }
                    var fields = {};
                    if (product.isPriceList) {
                        fields = _this.getPriceListFields(product.priceList);
                    }
                    else {
                        product.price = product.price ? product.price : 0;
                        product.discountedPrice = product.discountedPrice ? product.discountedPrice : 0;
                        product.purchasePrice = product.purchasePrice ? product.purchasePrice : 0;
                        product.quanity = product.quanity ? product.quanity : '';
                        product.shippingWt = product.shippingWt ? product.shippingWt : 0;
                    }
                    products.push({
                        sku: product.productCode ? product.productCode : '',
                        name: product.prodName ? product.prodName : '',
                        active: product.status ? 'YES' : 'NO',
                        variants: product.isPriceList ? 'YES' : 'NO',
                        variantType: product.variantType ? product.variantType : 'other',
                        variantName: fields['type'] ? fields['type'].join() : '',
                        price: fields['price'] ? fields['price'].join() : product.prodPrice,
                        discountedPrice: fields['discountedPrice'] ? fields['discountedPrice'].join() : product.discountedPrice,
                        purchasePrice: fields['purchasePrice'] ? fields['purchasePrice'].join() : product.purchasePrice,
                        quantity: fields['totalQuantity'] ? fields['totalQuantity'].join() : product.productQty,
                        shippingWt: fields['shippingWeight'] ? fields['shippingWeight'].join() : product.shippingWt,
                        minQuanity: product.minQty ? product.minQty : '',
                        maxQuantity: product.maxQty ? product.maxQty : '',
                        productDescription: product.prodDesc ? product.prodDesc : '',
                        hsnCode: product.hsnCode ? product.hsnCode : '',
                        gst: product.gst ? product.gst : '',
                        color: product.color && product.color.name && product.color.code ? product.color.name + ',' + product.color.code : '',
                        keywords: product.searchKeywords ? product.searchKeywords.join() : '',
                        out_of_stock: product.stopWhenNoQty ? 'YES' : 'NO',
                        catSubcat: product.categories ? categoryList.join(';') : '',
                        brands: product.brands ? brandList.join(';') : '',
                    });
                });
                if (this.loading) {
                    this.loading.dismiss();
                }
                csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_8__["ExportToCsv"](this.options);
                csvExporter.generateCsv(products);
                return [2 /*return*/];
            });
        });
    };
    AddSubSubcategoriesPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('product:addSubcategorySuccess');
        this.events.unsubscribe('product:deleteSubcategorySuccess');
        this.events.unsubscribe('product:editSubcategorySuccess');
        this.events.unsubscribe('product:publishProductsForSubcategory');
        this.events.unsubscribe('product:noProductsForSubcategory');
        this.events.unsubscribe('product:updateProductPostionSucess');
    };
    AddSubSubcategoriesPage.prototype.dismiss = function () {
        this.modalController.dismiss();
    };
    AddSubSubcategoriesPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__["Camera"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ActionSheetController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
        { type: src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_6__["ProductService"] },
        { type: src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_9__["BrandsService"] },
        { type: src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_10__["CategoriesService"] }
    ]; };
    AddSubSubcategoriesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-sub-subcategories',
            template: __webpack_require__(/*! raw-loader!./add-sub-subcategories.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/add-sub-subcategories/add-sub-subcategories.page.html"),
            styles: [__webpack_require__(/*! ./add-sub-subcategories.page.scss */ "./src/app/admin/add-sub-subcategories/add-sub-subcategories.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__["Camera"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ActionSheetController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
            src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_6__["ProductService"],
            src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_9__["BrandsService"],
            src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_10__["CategoriesService"]])
    ], AddSubSubcategoriesPage);
    return AddSubSubcategoriesPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-add-sub-subcategories-add-sub-subcategories-module-es5.js.map