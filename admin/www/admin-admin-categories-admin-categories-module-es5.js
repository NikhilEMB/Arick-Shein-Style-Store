(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-categories-admin-categories-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-categories/admin-categories.page.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-categories/admin-categories.page.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Categories</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\" style=\"width: 100%;\">\r\n    <div class=\"no-data ion-text-center\" *ngIf=\"showNoCategories\">\r\n      <img src=\"assets/img/no-category.png\" alt=\"\">\r\n      <h6>No categories</h6>\r\n    </div>\r\n    <ion-grid>\r\n      <ion-row class=\"main-row\">\r\n        \r\n        <!-- Categories -->\r\n        <ion-col size=\"4\">\r\n          <div class=\"titleArea\">\r\n            <p class=\"titleFont\">Categories</p>\r\n            <ion-button (click)=\"goToAddNew('categories')\">Add New Category</ion-button>\r\n          </div>\r\n          <div class=\"inputArea\">\r\n            <ion-input placeholder=\"Enter Category Name\" class=\"inputSearch\" [(ngModel)]='searchCategory'></ion-input>\r\n            &nbsp;\r\n            <ion-button size=\"small\" (click)='clearSearchCategory()'>Clear</ion-button>\r\n          </div>\r\n          <div id=\"scroll1\" *ngIf='categories && categories.length !== 0 && !showNoCategories'>\r\n            <ion-reorder-group (ionItemReorder)=\"onRenderCategories($event)\" disabled=\"false\" class=\"ion-no-padding\">\r\n              <ion-item *ngFor=\"let category of categories | filter: searchCategory; let i = index\">\r\n                <ion-grid class=\"ion-no-padding categoryGrid\" (click)='getSubcategoryData(category,i)'\r\n                  style=\"cursor: pointer;\">\r\n                  <ion-row [id]=\"'category'+i\">\r\n                    <ion-col class=\"flexCenter\">\r\n                      <div class=\"toggle-btn\">\r\n                        <label class=\"switch\">\r\n                          <input color=\"primary\" type=\"checkbox\" [checked]=\"category.status\"\r\n                            (click)=\"updateEditCategoryStatus(category.id, category.status, i)\">\r\n                          <span class=\"slider round\"></span>\r\n                        </label>\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col>\r\n                      <ion-thumbnail class=\"thumbnail\">\r\n                        <img class=\"loading\" *ngIf=\"category.image && !category.image.thumb && category.image.url\"\r\n                          src=\"{{category.image.url}}\">\r\n                        <img class=\"loading\" *ngIf=\"category.image && category.image.thumb\"\r\n                          src=\"{{category.image.thumb}}\">\r\n                        <img *ngIf=\"category.image && !category.image.thumb && !category.image.url\"\r\n                          src=\"assets/img/placeholder-img.jpg\">\r\n                      </ion-thumbnail>\r\n                    </ion-col>\r\n                    <ion-col class=\"flexStart\">\r\n                      <p class=\"ion-text-capitalize\">{{category.name}}</p>\r\n                    </ion-col>\r\n                    <ion-col class=\"flexCenter\">\r\n                      <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"editCatgeory(category)\">\r\n                        <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\"></i>\r\n                      </ion-button>\r\n                      <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"deleteCategoryConfirm(category.id, i)\">\r\n                        <i class=\"flaticon-null-21\" slot=\"icon-only\"></i>\r\n                      </ion-button>\r\n                      <ion-reorder>\r\n                        <div class=\"flat-sort\">\r\n                          <i class=\"flaticon-menu\"></i>\r\n                        </div>\r\n                      </ion-reorder>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                </ion-grid>\r\n              </ion-item>\r\n            </ion-reorder-group>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <!-- Sub Categories -->\r\n        <ion-col size=\"4\" id=\"middleColumn\">\r\n          <div class=\"titleArea\">\r\n            <p class=\"titleFont\">Subcategories</p>\r\n            <ng-container *ngIf=\"!noSubcategories\">\r\n              <ion-col class=\"flexEnd\" *ngIf='categoryData'>\r\n                <!-- <ion-label>Show</ion-label>&nbsp; -->\r\n                <div class=\"toggle-btn\">\r\n                  <label class=\"switch\">\r\n                    <input color=\"primary\" type=\"checkbox\" [checked]=\"categoryData.isSubcategories\"\r\n                      (click)=\"changeSubcategoriesStatus('category')\">\r\n                    <span class=\"slider round\"></span>\r\n                  </label>\r\n                </div>&nbsp;&nbsp;\r\n              </ion-col>\r\n            </ng-container>\r\n            <ion-button (click)=\"openAddSubCategoryModal('subcategory')\">Add New Subcategory</ion-button>\r\n          </div>\r\n          <div class=\"inputArea\">\r\n            <ion-input placeholder=\"Enter Subcategory Name\" class=\"inputSearch\" [(ngModel)]='searchSubcategory'>\r\n            </ion-input>&nbsp;\r\n            <ion-button size=\"small\" (click)='clearSearchSubcategory()'>Clear</ion-button>\r\n          </div>\r\n          <div class=\"ion-text-center\" *ngIf=\"noSubcategories\">\r\n            <img src=\"assets/img/no-category.png\" alt=\"\" height=\"150px\">\r\n            <h6>No subcategories</h6>\r\n          </div>\r\n          <div class=\"ion-no-padding row-border\" *ngIf=\"subcategories && subcategories.length && !noSubcategories\"\r\n            id=\"scroll2\">\r\n            <ion-reorder-group (ionItemReorder)=\"onReorderSubcategoires($event)\" disabled=\"false\"\r\n              class=\"ion-no-padding\">\r\n              <ion-item class=\"ion-no-padding\" no-lines no-border\r\n                *ngFor=\"let item of subcategories | filter: searchSubcategory; let i = index\">\r\n                <ion-grid class=\"row-background ion-no-padding ion-align-items-center hoverGrid\"\r\n                  (click)='getSubOfSubCategory(item,i)' style=\"cursor: pointer;\">\r\n                  <ion-row class=\"ion-align-items-center\" [id]=\"'subCategory'+i\" [ngStyle]=\"{'background': item.id===activeSubCatId ? 'var(--ion-color-categories-background)':'white'}\">\r\n                    <ion-col class=\"flexCenter\">\r\n                      <div class=\"toggle-btn\">\r\n                        <label class=\"switch\">\r\n                          <input color=\"primary\" type=\"checkbox\" [checked]=\"item.status\"\r\n                            (click)=\"updateEditSubcategoryStatus(item.id, item.status, 'subcategories')\">\r\n                          <span class=\"slider round\"></span>\r\n                        </label>\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col class=\"ion-text-center\">\r\n                      <ion-thumbnail>\r\n                        <img class=\"loading\" *ngIf=\"item.image && !item.image.thumb && item.image.url\"\r\n                          src=\"{{item.image.url}}\">\r\n                        <img class=\"loading\" *ngIf=\"item.image && item.image.thumb\" src=\"{{item.image.thumb}}\">\r\n                        <img *ngIf=\"!item.image\" src=\"assets/img/placeholder-img.jpg\">\r\n                      </ion-thumbnail>\r\n                    </ion-col>\r\n                    <ion-col class=\"flexStart\">\r\n                      <p class=\"ion-text-capitalize\">{{item.name}}</p>\r\n                    </ion-col>\r\n                    <ion-col class=\"flexCenter\">\r\n                      <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"openEditSubCategoryModal(item, 'subcategory')\">\r\n                        <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\"></i>\r\n                      </ion-button>\r\n                      <ion-reorder>\r\n                        <div class=\"flat-sort\">\r\n                          <i class=\"flaticon-menu\"></i>\r\n                        </div>\r\n                      </ion-reorder>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                </ion-grid>\r\n              </ion-item>\r\n            </ion-reorder-group>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <!-- Sub-Sub Categories -->\r\n        <ion-col size=\"4\" id=\"middleRightColumn\">\r\n          <div class=\"titleArea\">\r\n            <p class=\"titleFont\">Sub-Subcategories</p>\r\n            <ng-container *ngIf=\"subOfSubcategories.length\">\r\n              <ion-col class=\"flexEnd\" *ngIf='categoryData'>\r\n                <!-- <ion-label>Show</ion-label>&nbsp; -->\r\n                <div class=\"toggle-btn\">\r\n                  <label class=\"switch\">\r\n                    <input color=\"primary\" type=\"checkbox\" [checked]=\"subCategoryData.isSubcategories\"\r\n                      (click)=\"changeSubcategoriesStatus('subcategory')\">\r\n                    <span class=\"slider round\"></span>\r\n                  </label>\r\n                </div>&nbsp;&nbsp;\r\n              </ion-col>\r\n            </ng-container>\r\n            <ion-button (click)=\"openAddSubCategoryModal('sub-subcategory')\">Add New Sub-Subcategory</ion-button>\r\n          </div>\r\n          <div class=\"inputArea\">\r\n            <ion-input placeholder=\"Enter Sub-Subcategory Name\" class=\"inputSearch\" [(ngModel)]='searchSubcategory'>\r\n            </ion-input>&nbsp;\r\n            <ion-button size=\"small\" (click)='clearSearchSubcategory()'>Clear</ion-button>\r\n          </div>\r\n          <div class=\"ion-text-center\" *ngIf=\"!subOfSubcategories.length\">\r\n            <img src=\"assets/img/no-category.png\" alt=\"\" height=\"150px\">\r\n            <h6>No sub-subcategories</h6>\r\n          </div>\r\n          <div class=\"ion-no-padding row-border\" *ngIf=\"subcategories && subcategories.length && subOfSubcategories.length\" id=\"scroll2\">\r\n            <ion-reorder-group (ionItemReorder)=\"onReorderSubOfSubcategoires($event)\" disabled=\"false\"\r\n              class=\"ion-no-padding\">\r\n              <ion-item class=\"ion-no-padding\" no-lines no-border\r\n                *ngFor=\"let item of subOfSubcategories | filter: searchSubOfSubcategory; let i = index\">\r\n                <ion-grid class=\"row-background ion-no-padding ion-align-items-center hoverGrid\"\r\n                  style=\"cursor: pointer;\" (click)='getProdsOfSubSubCategory(item)'>\r\n                  <ion-row class=\"ion-align-items-center\" [id]=\"'subCategory'+i\" [ngStyle]=\"{'background': item.id===activeSubSubCatId ? 'var(--ion-color-categories-background)':'white'}\">\r\n                    <ion-col class=\"flexCenter\">\r\n                      <div class=\"toggle-btn\">\r\n                        <label class=\"switch\">\r\n                          <input color=\"primary\" type=\"checkbox\" [checked]=\"item.status\"\r\n                            (click)=\"updateEditSubcategoryStatus(item.id, item.status, 'subsubcategories')\">\r\n                          <span class=\"slider round\"></span>\r\n                        </label>\r\n                      </div>\r\n                    </ion-col>\r\n                    <ion-col class=\"ion-text-center\">\r\n                      <ion-thumbnail>\r\n                        <img class=\"loading\" *ngIf=\"item.image && !item.image.thumb && item.image.url\"\r\n                          src=\"{{item.image.url}}\">\r\n                        <img class=\"loading\" *ngIf=\"item.image && item.image.thumb\" src=\"{{item.image.thumb}}\">\r\n                        <img *ngIf=\"!item.image\" src=\"assets/img/placeholder-img.jpg\">\r\n                      </ion-thumbnail>\r\n                    </ion-col>\r\n                    <ion-col class=\"flexStart\">\r\n                      <p class=\"ion-text-capitalize\">{{item.name}}</p>\r\n                    </ion-col>\r\n                    <ion-col class=\"flexCenter\">\r\n                      <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"openEditSubCategoryModal(item, 'subsubcategory')\">\r\n                        <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\"></i>\r\n                      </ion-button>\r\n                      <ion-reorder>\r\n                        <div class=\"flat-sort\">\r\n                          <i class=\"flaticon-menu\"></i>\r\n                        </div>\r\n                      </ion-reorder>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                </ion-grid>\r\n              </ion-item>\r\n            </ion-reorder-group>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <!-- Products -->\r\n        <!-- *ngIf=\"noSubcategories\" -->\r\n        <ion-col size=\"4\">\r\n          <div class=\"titleArea\">\r\n            <p class=\"titleFont\">Products</p>\r\n            <ion-button (click)=\"exportProducts()\">Export products</ion-button>\r\n          </div>\r\n          <div class=\"inputArea\">\r\n            <ion-input placeholder=\"Enter Product Name\" class=\"inputSearch\" [(ngModel)]='searchProduct'></ion-input>\r\n            &nbsp;\r\n            <ion-button size=\"small\" (click)='clearSearchProduct()'>Clear</ion-button>\r\n          </div>\r\n          <div class=\"ion-text-center\" *ngIf=\"showNoProducts\">\r\n            <img src=\"assets/img/no-product.png\" alt=\"\" height=\"150px\">\r\n            <h6>No products</h6>\r\n          </div>\r\n          <div *ngIf=\"showLoader; else showListOfProducts\" class=\"spinner\">\r\n            <ion-spinner color=\"primary\"></ion-spinner>\r\n          </div>\r\n          <ng-template #showListOfProducts>\r\n            <ion-list class=\"ion-no-padding row-border\" *ngIf=\"prod && prod.length !== 0 && !showNoProducts\"\r\n              id='scroll3'>\r\n              <div *ngIf=\"multiVendor && vendors.length\">\r\n                <ion-row>\r\n                  <div class=\"headings\">\r\n                    Add Vendor to All Products\r\n                  </div>\r\n                </ion-row>\r\n                <ion-row *ngIf=\"showSelectVendor == true\">\r\n                  <ion-col size=\"12\">\r\n                    <ion-select class=\"border i-s-p-10\" (ionChange)=\"addVendor($event)\" placeholder=\"Select Vendor\"\r\n                      style=\"border: 1px solid;\">\r\n                      <ion-select-option value=\"\">No Vendor\r\n                      </ion-select-option>\r\n                      <ion-select-option [value]=\"vendor.id\" *ngFor=\"let vendor of vendors\">{{vendor.name}}\r\n                      </ion-select-option>\r\n                    </ion-select>\r\n                  </ion-col>\r\n                </ion-row>\r\n                <br>\r\n              </div>\r\n              <div *ngIf=\"showSelectGst == true\">\r\n                <ion-row>\r\n                  <div class=\"headings\">\r\n                    Set Gst Exclusive / Inclusive for all Products\r\n                  </div>\r\n                </ion-row>\r\n                <ion-row>\r\n                  <ion-col size=\"12\">\r\n                    <ion-select class=\"border i-s-p-10\" [value]=\"categoryData?.gstExclusive\" (ionChange)=\"addGst($event)\" placeholder=\"Select Gst Type\"\r\n                      style=\"border: 1px solid;\">\r\n                      <ion-select-option [value]=\"true\">Exclusive\r\n                      </ion-select-option>\r\n                      <ion-select-option [value]=\"false\">Inclusive\r\n                      </ion-select-option>\r\n                    </ion-select>\r\n                  </ion-col>\r\n                </ion-row>\r\n                <br>\r\n              </div>\r\n              <ion-reorder-group (ionItemReorder)=\"onRenderItems($event)\" disabled=\"false\" class=\"ion-no-padding\">\r\n\r\n                <ion-item class=\"ion-no-padding\" *ngFor=\"let item of prod | filter: searchProduct; let i = index\">\r\n                  <ion-grid class=\"ion-no-padding ion-align-items-center\">\r\n                    <ion-row class=\"row-background ion-align-items-center\">\r\n                      <ion-col class=\"flexCenter\">\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input color=\"primary\" type=\"checkbox\" [checked]=\"item.status\"\r\n                              (click)=\"updateEditProductStatus(item.id, item.status)\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col>\r\n                        <ion-thumbnail>\r\n                          <img class=\"loading\" *ngIf=\"item.coverPic && !item.coverPic.thumb && item.coverPic.url\"\r\n                            src=\"{{item.coverPic.url}}\">\r\n                          <img class=\"loading\" *ngIf=\"item.coverPic && item.coverPic.thumb\"\r\n                            src=\"{{item.coverPic.thumb}}\">\r\n                          <img *ngIf=\"!item.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n                        </ion-thumbnail>\r\n                      </ion-col>\r\n                      <ion-col class=\"flexStart\">\r\n                        <p class=\"ion-text-capitalize\">{{item.prodName}}</p>\r\n                      </ion-col>\r\n                      <ion-col class=\"flexCenter\">\r\n                        <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"editProduct(item)\">\r\n                          <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\"></i>\r\n                        </ion-button>\r\n                        <ion-reorder>\r\n                          <div class=\"flat-sort\">\r\n                            <i class=\"flaticon-menu\"></i>\r\n                          </div>\r\n                        </ion-reorder>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                </ion-item>\r\n\r\n              </ion-reorder-group>\r\n            </ion-list>\r\n          </ng-template>\r\n        </ion-col>\r\n\r\n        <!-- Sub Sub-categories -->\r\n        <!-- <ion-col *ngIf=\"!noSubcategories\">\r\n          <p class=\"titleFont\">Sub sub-categories</p>\r\n          <div class=\"titleArea\">\r\n            <ion-col class=\"flexEnd\" *ngIf='categoryData'>\r\n              <ion-label>Show</ion-label>&nbsp;\r\n              <div class=\"toggle-btn\">\r\n                <label class=\"switch\">\r\n                  <input color=\"primary\" type=\"checkbox\" [checked]=\"subCategoryData?.isSubcategories\"\r\n                    (click)=\"changeSubOfSubCategoriesStatus()\">\r\n                  <span class=\"slider round\"></span>\r\n                </label>\r\n              </div>&nbsp;&nbsp;\r\n            </ion-col>\r\n            <ion-button (click)=\"AddSubOfSubCategory()\">Add Sub sub-Category</ion-button>\r\n          </div>\r\n          <div class=\"inputArea\">\r\n            <ion-input placeholder=\"Enter Sub sub-category Name\" class=\"inputSearch\" [(ngModel)]='searchSubOfSubCategory'>\r\n            </ion-input>&nbsp;\r\n            <ion-button size=\"small\" (click)='clearSearchSubOfSubCategory()'>Clear</ion-button>\r\n          </div>\r\n        \r\n          <div class=\"ion-text-center\" *ngIf=\"subOfSubcategories.length == 0\">\r\n            <img src=\"assets/img/no-category.png\" alt=\"\" height=\"150px\">\r\n            <h6>No sub-subcategories</h6>\r\n          </div>\r\n          <ng-container *ngIf=\"subOfSubcategories && subOfSubcategories.length\">\r\n            <div class=\"ion-no-padding row-border\" id=\"scroll2\">\r\n              <ion-reorder-group (ionItemReorder)=\"onReorderSubOfSubCategories($event)\" disabled=\"false\" class=\"ion-no-padding\">\r\n                <ion-item class=\"ion-no-padding\" no-lines no-border\r\n                  *ngFor=\"let item of subOfSubcategories | filter: searchSubOfSubCategory; index as i\">\r\n\r\n                  <ion-grid class=\"row-background ion-no-padding ion-align-items-center hoverGrid\" style=\"cursor: pointer;\">\r\n                    <ion-row class=\"ion-align-items-center\" [id]=\"'subCategory'+i\">\r\n                      <ion-col class=\"flexCenter\">\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input color=\"primary\" type=\"checkbox\" [checked]=\"item.status\"\r\n                              (click)=\"editSubOfSubCategoryStatus(item.id, item.status)\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col class=\"ion-text-center\">\r\n                        <ion-thumbnail>\r\n                          <img class=\"loading\" *ngIf=\"item.image && !item.image.thumb && item.image.url\"\r\n                            src=\"{{item.image.url}}\">\r\n                          <img class=\"loading\" *ngIf=\"item.image && item.image.thumb\" src=\"{{item.image.thumb}}\">\r\n                          <img *ngIf=\"!item.image\" src=\"assets/img/placeholder-img.jpg\">\r\n                        </ion-thumbnail>\r\n                      </ion-col>\r\n                      <ion-col class=\"flexStart\">\r\n                        <p class=\"ion-text-capitalize\">{{item.name}}</p>\r\n                      </ion-col>\r\n                      <ion-col class=\"flexCenter\">\r\n                        <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"editSubOfSubCategory(item)\">\r\n                          <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\"></i>\r\n                        </ion-button>\r\n                        <ion-reorder>\r\n                          <div class=\"flat-sort\">\r\n                            <i class=\"flaticon-menu\"></i>\r\n                          </div>\r\n                        </ion-reorder>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                </ion-item>\r\n              </ion-reorder-group>\r\n            </div>\r\n          </ng-container>\r\n        </ion-col> -->\r\n\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/admin-categories/admin-categories.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/admin/admin-categories/admin-categories.module.ts ***!
  \*******************************************************************/
/*! exports provided: AdminCategoriesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminCategoriesPageModule", function() { return AdminCategoriesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_categories_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-categories.page */ "./src/app/admin/admin-categories/admin-categories.page.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");








var routes = [
    {
        path: '',
        component: _admin_categories_page__WEBPACK_IMPORTED_MODULE_6__["AdminCategoriesPage"]
    }
];
var AdminCategoriesPageModule = /** @class */ (function () {
    function AdminCategoriesPageModule() {
    }
    AdminCategoriesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__["Ng2SearchPipeModule"]
            ],
            declarations: [_admin_categories_page__WEBPACK_IMPORTED_MODULE_6__["AdminCategoriesPage"]]
        })
    ], AdminCategoriesPageModule);
    return AdminCategoriesPageModule;
}());



/***/ }),

/***/ "./src/app/admin/admin-categories/admin-categories.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/admin/admin-categories/admin-categories.page.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ion-thumbnail {\n  width: 100%;\n  height: auto;\n}\n\nion-col.img {\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.name {\n  width: calc(100% - 310px);\n  max-width: calc(100% - 300px);\n}\n\nion-col.action {\n  width: 128px;\n  max-width: 100px;\n}\n\nion-col.reorder {\n  width: 75px;\n  max-width: 75px;\n}\n\n.product-active {\n  background-color: green;\n  width: 8px;\n  height: 8px;\n  min-width: 8px;\n  border-radius: 30px;\n  border: 1px solid green;\n  margin-right: 5px;\n}\n\n.product-inactive {\n  background-color: red;\n  width: 8px;\n  height: 8px;\n  min-width: 8px;\n  border-radius: 30px;\n  border: 1px solid red;\n  margin-right: 5px;\n}\n\n.categoryGrid:hover {\n  background: var(--ion-color-categories-background);\n}\n\n#middleColumn {\n  border-left: 1px solid lightgray;\n  border-right: 1px solid lightgray;\n}\n\n#middleRightColumn {\n  border-right: 1px solid lightgray;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 75vh;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 75vh;\n}\n\n#scroll3 {\n  overflow: hidden;\n  height: 75vh;\n}\n\n#scroll1:hover,\n#scroll2:hover,\n#scroll3:hover {\n  overflow-y: auto;\n}\n\nion-grid.hoverGrid:hover {\n  background-color: var(--ion-color-categories-background);\n}\n\n.titleArea {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  height: 5vh;\n}\n\n.titleFont {\n  font-size: medium;\n  font-weight: bold;\n}\n\n.inputArea {\n  height: 5vh;\n  text-align: center;\n  width: 100%;\n  font-weight: bold;\n  font-size: medium;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.inputSearch {\n  height: 4vh;\n  padding-top: 0px;\n  padding-bottom: 0px;\n  border: 1px solid lightgray;\n}\n\n.flexStart {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n}\n\n.flexCenter {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n\n.flexEnd {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n\n.main-row {\n  flex-wrap: nowrap;\n  overflow-x: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tY2F0ZWdvcmllcy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGFkbWluLWNhdGVnb3JpZXNcXGFkbWluLWNhdGVnb3JpZXMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZG1pbi1jYXRlZ29yaWVzL2FkbWluLWNhdGVnb3JpZXMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUNDRjs7QURFQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQ0NGOztBRENBO0VBQ0UseUJBQUE7RUFDQSw2QkFBQTtBQ0VGOztBREFBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0FDR0Y7O0FEREE7RUFDRSxXQUFBO0VBQ0EsZUFBQTtBQ0lGOztBREZBO0VBQ0UsdUJBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7QUNLRjs7QURIQTtFQUNFLHFCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0FDTUY7O0FESEE7RUFDRSxrREFBQTtBQ01GOztBREhBO0VBQ0UsZ0NBQUE7RUFDQSxpQ0FBQTtBQ01GOztBREhBO0VBQ0UsaUNBQUE7QUNNRjs7QURIQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtBQ01GOztBREhBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0FDTUY7O0FESEE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7QUNNRjs7QURIQTs7O0VBR0UsZ0JBQUE7QUNNRjs7QURIQTtFQUNFLHdEQUFBO0FDTUY7O0FESkE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLFdBQUE7QUNPRjs7QURMQTtFQUNFLGlCQUFBO0VBQ0EsaUJBQUE7QUNRRjs7QUROQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBQ1NGOztBRFBBO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtBQ1VGOztBRFJBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHVCQUFBO1VBQUEsMkJBQUE7QUNXRjs7QURUQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0FDWUY7O0FEVkE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EscUJBQUE7VUFBQSx5QkFBQTtBQ2FGOztBRFZBO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtBQ2FGIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vYWRtaW4tY2F0ZWdvcmllcy9hZG1pbi1jYXRlZ29yaWVzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pb24tdGh1bWJuYWlsIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IGF1dG87XHJcbn1cclxuXHJcbmlvbi1jb2wuaW1nIHtcclxuICB3aWR0aDogMTAwcHg7XHJcbiAgbWF4LXdpZHRoOiAxMDBweDtcclxufVxyXG5pb24tY29sLm5hbWUge1xyXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAzMTBweCk7XHJcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSAzMDBweCk7XHJcbn1cclxuaW9uLWNvbC5hY3Rpb24ge1xyXG4gIHdpZHRoOiAxMjhweDtcclxuICBtYXgtd2lkdGg6IDEwMHB4O1xyXG59XHJcbmlvbi1jb2wucmVvcmRlciB7XHJcbiAgd2lkdGg6IDc1cHg7XHJcbiAgbWF4LXdpZHRoOiA3NXB4O1xyXG59XHJcbi5wcm9kdWN0LWFjdGl2ZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XHJcbiAgd2lkdGg6IDhweDtcclxuICBoZWlnaHQ6IDhweDtcclxuICBtaW4td2lkdGg6IDhweDtcclxuICBib3JkZXItcmFkaXVzOiAzMHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyZWVuO1xyXG4gIG1hcmdpbi1yaWdodDogNXB4O1xyXG59XHJcbi5wcm9kdWN0LWluYWN0aXZlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XHJcbiAgd2lkdGg6IDhweDtcclxuICBoZWlnaHQ6IDhweDtcclxuICBtaW4td2lkdGg6IDhweDtcclxuICBib3JkZXItcmFkaXVzOiAzMHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcclxuICBtYXJnaW4tcmlnaHQ6IDVweDtcclxufVxyXG5cclxuLmNhdGVnb3J5R3JpZDpob3ZlciB7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWNhdGVnb3JpZXMtYmFja2dyb3VuZCk7XHJcbn1cclxuXHJcbiNtaWRkbGVDb2x1bW4ge1xyXG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxufVxyXG5cclxuI21pZGRsZVJpZ2h0Q29sdW1uIHtcclxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbn1cclxuXHJcbiNzY3JvbGwxIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogNzV2aDtcclxufVxyXG5cclxuI3Njcm9sbDIge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiA3NXZoO1xyXG59XHJcblxyXG4jc2Nyb2xsMyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDc1dmg7XHJcbn1cclxuXHJcbiNzY3JvbGwxOmhvdmVyLFxyXG4jc2Nyb2xsMjpob3ZlcixcclxuI3Njcm9sbDM6aG92ZXIge1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxuXHJcbmlvbi1ncmlkLmhvdmVyR3JpZDpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWNhdGVnb3JpZXMtYmFja2dyb3VuZCk7XHJcbn1cclxuLnRpdGxlQXJlYSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBoZWlnaHQ6IDV2aDtcclxufVxyXG4udGl0bGVGb250IHtcclxuICBmb250LXNpemU6IG1lZGl1bTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG4uaW5wdXRBcmVhIHtcclxuICBoZWlnaHQ6IDV2aDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgZm9udC1zaXplOiBtZWRpdW07XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi5pbnB1dFNlYXJjaCB7XHJcbiAgaGVpZ2h0OiA0dmg7XHJcbiAgcGFkZGluZy10b3A6IDBweDtcclxuICBwYWRkaW5nLWJvdHRvbTogMHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxufVxyXG4uZmxleFN0YXJ0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG59XHJcbi5mbGV4Q2VudGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuLmZsZXhFbmQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG59XHJcblxyXG4ubWFpbi1yb3cge1xyXG4gIGZsZXgtd3JhcDogbm93cmFwO1xyXG4gIG92ZXJmbG93LXg6IGF1dG87XHJcbn0iLCIuaW9uLXRodW1ibmFpbCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbmlvbi1jb2wuaW1nIHtcbiAgd2lkdGg6IDEwMHB4O1xuICBtYXgtd2lkdGg6IDEwMHB4O1xufVxuXG5pb24tY29sLm5hbWUge1xuICB3aWR0aDogY2FsYygxMDAlIC0gMzEwcHgpO1xuICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDMwMHB4KTtcbn1cblxuaW9uLWNvbC5hY3Rpb24ge1xuICB3aWR0aDogMTI4cHg7XG4gIG1heC13aWR0aDogMTAwcHg7XG59XG5cbmlvbi1jb2wucmVvcmRlciB7XG4gIHdpZHRoOiA3NXB4O1xuICBtYXgtd2lkdGg6IDc1cHg7XG59XG5cbi5wcm9kdWN0LWFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xuICB3aWR0aDogOHB4O1xuICBoZWlnaHQ6IDhweDtcbiAgbWluLXdpZHRoOiA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyZWVuO1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cblxuLnByb2R1Y3QtaW5hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gIHdpZHRoOiA4cHg7XG4gIGhlaWdodDogOHB4O1xuICBtaW4td2lkdGg6IDhweDtcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cblxuLmNhdGVnb3J5R3JpZDpob3ZlciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1jYXRlZ29yaWVzLWJhY2tncm91bmQpO1xufVxuXG4jbWlkZGxlQ29sdW1uIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cblxuI21pZGRsZVJpZ2h0Q29sdW1uIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgbGlnaHRncmF5O1xufVxuXG4jc2Nyb2xsMSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogNzV2aDtcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDc1dmg7XG59XG5cbiNzY3JvbGwzIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA3NXZoO1xufVxuXG4jc2Nyb2xsMTpob3ZlcixcbiNzY3JvbGwyOmhvdmVyLFxuI3Njcm9sbDM6aG92ZXIge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG5pb24tZ3JpZC5ob3ZlckdyaWQ6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItY2F0ZWdvcmllcy1iYWNrZ3JvdW5kKTtcbn1cblxuLnRpdGxlQXJlYSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgaGVpZ2h0OiA1dmg7XG59XG5cbi50aXRsZUZvbnQge1xuICBmb250LXNpemU6IG1lZGl1bTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5pbnB1dEFyZWEge1xuICBoZWlnaHQ6IDV2aDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uaW5wdXRTZWFyY2gge1xuICBoZWlnaHQ6IDR2aDtcbiAgcGFkZGluZy10b3A6IDBweDtcbiAgcGFkZGluZy1ib3R0b206IDBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xufVxuXG4uZmxleFN0YXJ0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xufVxuXG4uZmxleENlbnRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uZmxleEVuZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG59XG5cbi5tYWluLXJvdyB7XG4gIGZsZXgtd3JhcDogbm93cmFwO1xuICBvdmVyZmxvdy14OiBhdXRvO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/admin-categories/admin-categories.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/admin/admin-categories/admin-categories.page.ts ***!
  \*****************************************************************/
/*! exports provided: AdminCategoriesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminCategoriesPage", function() { return AdminCategoriesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/product/product.service */ "./src/app/services/product/product.service.ts");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/brands/brands.service */ "./src/app/services/brands/brands.service.ts");
/* harmony import */ var src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/services/categories/categories.service */ "./src/app/services/categories/categories.service.ts");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_13__);














var AdminCategoriesPage = /** @class */ (function () {
    function AdminCategoriesPage(modalController, events, router, loadingController, alertController, productService, platform, toastController, labelService, configService, brandService, vendorService, categoryService) {
        this.modalController = modalController;
        this.events = events;
        this.router = router;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.productService = productService;
        this.platform = platform;
        this.toastController = toastController;
        this.labelService = labelService;
        this.configService = configService;
        this.brandService = brandService;
        this.vendorService = vendorService;
        this.categoryService = categoryService;
        this.categories = [];
        this.searchCategory = '';
        this.showNoCategories = false;
        this.showSearch = false;
        this.category = {
            name: '',
            isExclusive: false,
        };
        this.metaData = {
            pageTitle: '',
            metaDescription: '',
            metaKeywords: ''
        };
        this.listofbase64Image = [];
        this.imageResponse = [];
        this.prod = [];
        this.showNoProducts = false;
        this.searchProduct = '';
        this.searchSubcategory = '';
        this.searchSubOfSubcategory = '';
        this.categoryStatus = true;
        this.showLoader = true;
        this.subcategories = [];
        this.noSubcategories = false;
        this.subcategoriesLoader = true;
        this.banner = [];
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
        this.CATEGORIES_LABELS = {};
        this.SHARED_LABELS = {};
        this.multiRegion = false;
        this.regions = [];
        this.regionId = [];
        this.previousId = 0;
        this.multiVendor = false;
        this.vendors = [];
        this.showSelectGst = false;
        this.showSelectVendor = false;
        this.subOfSubcategories = [];
        this.searchSubOfSubCategory = '';
        this.activeSubCatId = '';
        this.activeSubSubCatId = '';
    }
    AdminCategoriesPage.prototype.onRenderCategories = function (event) {
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
                        id = this.categories[start].id;
                        end = event.detail.to;
                        // //console.log('end', end);
                        if (start < end && end !== this.categories.length - 1) {
                            firstDate = this.categories[end].sortedAt.toDate().getTime();
                            secondDate = this.categories[end + 1].sortedAt.toDate().getTime();
                            changedDate = (firstDate + secondDate) / 2;
                            // //console.log('finalDate', new Date(changedDate));
                            this.productService.updateCategoriesPosition(id, new Date(changedDate));
                        }
                        // tslint:disable-next-line: one-line
                        else if (start < end && end === this.categories.length - 1) {
                            changedDate = this.categories[end].sortedAt.toDate().getTime() - 5 * 60000;
                            this.productService.updateCategoriesPosition(id, new Date(changedDate));
                        }
                        // tslint:disable-next-line: one-line
                        else if (start > end && end !== 0) {
                            firstDate = this.categories[end].sortedAt.toDate().getTime();
                            secondDate = this.categories[end - 1].sortedAt.toDate().getTime();
                            changedDate = (firstDate + secondDate) / 2;
                            // //console.log('finalDate', new Date(changedDate));
                            this.productService.updateCategoriesPosition(id, new Date(changedDate));
                        }
                        // tslint:disable-next-line: one-line
                        else {
                            changedDate = this.categories[end].sortedAt.toDate().getTime() + 5 * 60000;
                            this.productService.updateCategoriesPosition(id, new Date(changedDate));
                        }
                        draggedItem = this.categories.splice(event.detail.from, 1)[0];
                        this.categories.splice(event.detail.to, 0, draggedItem);
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
    AdminCategoriesPage.prototype.ionViewWillEnter = function () {
        // //console.log('ionViewWillEnter');
    };
    AdminCategoriesPage.prototype.ionViewDidEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // //console.log('in ionViewDidEnter');
                        this.initializeSubscriptions();
                        this.events.publish('product:getAllCategories');
                        this.devHeight = this.platform.height();
                        this.events.subscribe('product:deleteCategorySuccess', function () {
                            _this.loading.dismiss();
                            _this.events.publish('product:getAllCategories');
                            _this.presentAlert('Success', 'Category deleted successfully!');
                        });
                        this.SHARED_LABELS = this.labelService.labels['SHARED'];
                        this.CATEGORIES_LABELS = this.labelService.labels['CATEGORIES'];
                        this.multiRegion = this.configService.environment.multiRegion;
                        this.multiVendor = this.configService.environment.multiVendor;
                        if (!this.multiVendor) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.vendorService.getAllVendors()];
                    case 1:
                        _a.vendors = _b.sent();
                        if (this.vendors.length) {
                            this.vendors = this.vendors;
                        }
                        else {
                            this.multiVendor = false;
                        }
                        _b.label = 2;
                    case 2:
                        if (this.multiRegion) {
                            this.events.publish('multi-region:getActiveStatus');
                            this.events.publish('multi-region:getAllActiveRegions');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminCategoriesPage.prototype.ionViewWillLeave = function () {
        // //console.log('ionViewWillLeave');
        this.events.unsubscribe('product:deleteCategorySuccess');
        this.showSearch = false;
        this.removeSubscriptions();
    };
    AdminCategoriesPage.prototype.ngOnInit = function () {
    };
    AdminCategoriesPage.prototype.ngOnDestroy = function () {
    };
    AdminCategoriesPage.prototype.getDateTimeFormat = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_7__(date).format('MMM D, YYYY hh:mm a');
    };
    AdminCategoriesPage.prototype.getSubcategoryProduct = function (subCat, index) {
        this.showSelectGst = false;
        this.showSelectVendor = false;
        this.events.publish('product:getProductsForSubcategory', subCat.id);
    };
    AdminCategoriesPage.prototype.getSubcategoryData = function (category, index) {
        this.activeSubCatId = '';
        this.subOfSubcategories = [];
        this.showSelectGst = false;
        this.showSelectVendor = false;
        this.categoryData = category;
        var prevMsgDiv = document.getElementById('category' + this.previousId);
        prevMsgDiv.style.background = 'white';
        var msgDiv = document.getElementById('category' + index);
        msgDiv.style.background = 'var(--ion-color-categories-background)';
        this.previousId = index;
        this.events.publish('product:getProductsForCategory', category.id);
        this.events.publish('product:getSubcategories', category.id);
    };
    AdminCategoriesPage.prototype.initializeSubscriptions = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                // //console.log('in initializeSubscriptions');
                this.events.subscribe('product:publishAllCategoriesForAdmin', function (categories) {
                    // //console.log('in all categories SUBSCRIPTION');
                    _this.showNoCategories = false;
                    _this.categories = categories;
                    if (_this.categories && _this.categories.length > 0) {
                        setTimeout(function () {
                            _this.getSubcategoryData(_this.categories[0], 0);
                        }, 1000);
                    }
                });
                this.events.subscribe('product:noCategoryAvailable', function () {
                    _this.showNoCategories = true;
                });
                this.events.subscribe('product:deleteCategoryFailure', function () {
                    _this.presentAlert('Failure', 'Category not deleted successfully!');
                });
                this.events.subscribe('product:updateCategoriesPostionSucess', function () {
                    _this.loader.dismiss();
                });
                this.events.subscribe('product:exportCategoriesData', function (data) {
                    _this.loader.dismiss();
                    var csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_5__["ExportToCsv"](_this.options);
                    csvExporter.generateCsv(data);
                });
                this.events.subscribe('product:addCategorySuccess', function () {
                    _this.loading.dismiss();
                    _this.category.name = '';
                    _this.category.isExclusive = false;
                    _this.imageResponse = [];
                    _this.banner = [];
                    _this.presentAlert('Catgeory Added Successfully', true);
                });
                this.events.subscribe('product:editCategorySuccess', function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                        switch (_a.label) {
                            case 0: 
                            // console.log('in editCategorySuccess subscribe');
                            return [4 /*yield*/, this.loading.dismiss()];
                            case 1:
                                // console.log('in editCategorySuccess subscribe');
                                _a.sent();
                                this.presentAlert('Category edited successfully!', true);
                                return [2 /*return*/];
                        }
                    });
                }); });
                this.events.subscribe('product:deleteCategoryFailure', function () {
                    _this.loading.dismiss();
                    _this.presentAlert('', 'Category deleted failed');
                });
                this.events.subscribe('product:editCategoryFailure', function () {
                    _this.presentAlert('', 'Category edit failed');
                });
                this.events.subscribe('product:publishProductsForCategory', function (products) {
                    _this.prod = products;
                    _this.showNoProducts = false;
                    _this.showLoader = false;
                    _this.showSelectGst = true;
                    _this.showSelectVendor = true;
                });
                this.events.subscribe('product:publishProductsForSubcategory', function (products) {
                    _this.prod = products;
                    _this.showNoProducts = false;
                    _this.showLoader = false;
                    _this.showSelectGst = true;
                    _this.showSelectVendor = true;
                });
                this.events.subscribe('product:noProductsForSubcategory', function () {
                    _this.prod = [];
                    _this.showLoader = false;
                    _this.showNoProducts = true;
                });
                this.events.subscribe('product:noProducts', function () {
                    _this.prod = [];
                    _this.showLoader = false;
                    _this.showNoProducts = true;
                });
                this.events.subscribe('product:updateProductPostionSucess', function () {
                    _this.loader.dismiss();
                });
                this.events.subscribe('product:publishSubcategories', function (data) {
                    console.log('in publishSubcategories sub');
                    _this.subcategories = data;
                    _this.noSubcategories = false;
                    _this.subcategoriesLoader = false;
                    _this.getSubOfSubCategory(_this.subcategories[0], 0);
                });
                this.events.subscribe('product:noSubcategories', function () {
                    // console.log('in noSubcategories sub');
                    _this.noSubcategories = true;
                    _this.subcategoriesLoader = false;
                });
                this.events.subscribe('product:updateSubcategoriesPostionSucess', function () {
                    _this.loader.dismiss();
                });
                this.events.subscribe('product:changeSubcategoriesStatusSuccess', function () {
                    _this.presentAlert('', 'Subcategories status changed successfully!');
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
                this.events.subscribe('product:changeCategoryStatusSuccess', function () {
                    if (_this.loading) {
                        _this.loading.dismiss();
                    }
                    _this.presentAlert('', 'Status changed successfully');
                });
                this.events.subscribe('product:changeProductStatusSuccess', function () {
                    if (_this.loading) {
                        _this.loading.dismiss();
                    }
                    _this.presentAlert('', 'Status changed successfully');
                });
                this.events.subscribe('product:changeSubcategoryStatusSuccess', function () {
                    if (_this.loading) {
                        _this.loading.dismiss();
                    }
                    _this.presentAlert('', 'Status changed successfully');
                });
                return [2 /*return*/];
            });
        });
    };
    AdminCategoriesPage.prototype.onRenderItems = function (event) {
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
                        id = this.prod[start].id;
                        end = event.detail.to;
                        // console.log('end', end);
                        this.prod[end].sortedAt = this.convertInvalidDateObjectToTimestamp(this.prod[end].sortedAt);
                        this.prod[end - 1].sortedAt = this.convertInvalidDateObjectToTimestamp(this.prod[end - 1].sortedAt);
                        this.prod[end + 1].sortedAt = this.convertInvalidDateObjectToTimestamp(this.prod[end + 1].sortedAt);
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
                            // console.log('finalDate', new Date(changedDate));
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
    AdminCategoriesPage.prototype.onReorderSubcategoires = function (event) {
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
                        id = this.subcategories[start].id;
                        end = event.detail.to;
                        // console.log('end', end);
                        if (start < end && end !== this.subcategories.length - 1) {
                            firstDate = this.subcategories[end].sortedAt.toDate().getTime();
                            secondDate = this.subcategories[end + 1].sortedAt.toDate().getTime();
                            changedDate = (firstDate + secondDate) / 2;
                            // console.log('finalDate', new Date(changedDate));
                            this.productService.updateSubcategoriesPosition(id, new Date(changedDate), this.categoryData.id);
                        }
                        // tslint:disable-next-line: one-line
                        else if (start < end && end === this.subcategories.length - 1) {
                            changedDate = this.subcategories[end].sortedAt.toDate().getTime() - 5 * 60000;
                            this.productService.updateSubcategoriesPosition(id, new Date(changedDate), this.categoryData.id);
                        }
                        // tslint:disable-next-line: one-line
                        else if (start > end && end !== 0) {
                            firstDate = this.subcategories[end].sortedAt.toDate().getTime();
                            secondDate = this.subcategories[end - 1].sortedAt.toDate().getTime();
                            changedDate = (firstDate + secondDate) / 2;
                            // console.log('finalDate', new Date(changedDate));
                            this.productService.updateSubcategoriesPosition(id, new Date(changedDate), this.categoryData.id);
                        }
                        // tslint:disable-next-line: one-line
                        else {
                            changedDate = this.subcategories[end].sortedAt.toDate().getTime() + 5 * 60000;
                            this.productService.updateSubcategoriesPosition(id, new Date(changedDate), this.categoryData.id);
                        }
                        draggedItem = this.subcategories.splice(event.detail.from, 1)[0];
                        this.subcategories.splice(event.detail.to, 0, draggedItem);
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
    AdminCategoriesPage.prototype.onReorderSubOfSubcategoires = function (event) {
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
                        id = this.subOfSubcategories[start].id;
                        end = event.detail.to;
                        // console.log('end', end);
                        if (start < end && end !== this.subOfSubcategories.length - 1) {
                            firstDate = this.subOfSubcategories[end].sortedAt.toDate().getTime();
                            secondDate = this.subOfSubcategories[end + 1].sortedAt.toDate().getTime();
                            changedDate = (firstDate + secondDate) / 2;
                            // console.log('finalDate', new Date(changedDate));
                            this.productService.updateSubOfSubcategoriesPosition(id, new Date(changedDate), this.categoryData.id, this.activeSubCatId);
                        }
                        // tslint:disable-next-line: one-line
                        else if (start < end && end === this.subOfSubcategories.length - 1) {
                            changedDate = this.subOfSubcategories[end].sortedAt.toDate().getTime() - 5 * 60000;
                            this.productService.updateSubOfSubcategoriesPosition(id, new Date(changedDate), this.categoryData.id, this.activeSubCatId);
                        }
                        // tslint:disable-next-line: one-line
                        else if (start > end && end !== 0) {
                            firstDate = this.subOfSubcategories[end].sortedAt.toDate().getTime();
                            secondDate = this.subOfSubcategories[end - 1].sortedAt.toDate().getTime();
                            changedDate = (firstDate + secondDate) / 2;
                            // console.log('finalDate', new Date(changedDate));
                            this.productService.updateSubOfSubcategoriesPosition(id, new Date(changedDate), this.categoryData.id, this.activeSubCatId);
                        }
                        // tslint:disable-next-line: one-line
                        else {
                            changedDate = this.subOfSubcategories[end].sortedAt.toDate().getTime() + 5 * 60000;
                            this.productService.updateSubOfSubcategoriesPosition(id, new Date(changedDate), this.categoryData.id, this.activeSubCatId);
                        }
                        draggedItem = this.subOfSubcategories.splice(event.detail.from, 1)[0];
                        this.subOfSubcategories.splice(event.detail.to, 0, draggedItem);
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
    AdminCategoriesPage.prototype.convertInvalidDateObjectToTimestamp = function (dateObj) {
        if (typeof dateObj.toDate === 'function') {
            return dateObj;
        }
        var date = new Date(dateObj.seconds * 1000);
        return firebase__WEBPACK_IMPORTED_MODULE_13__["firestore"].Timestamp.fromDate(new Date(date));
    };
    AdminCategoriesPage.prototype.editCatgeory = function (category) {
        var navigationExtras = {
            state: {
                categoryData: category
            }
        };
        this.router.navigate(['categories'], navigationExtras);
    };
    AdminCategoriesPage.prototype.goToAddNew = function (page) {
        this.router.navigate([page]);
    };
    AdminCategoriesPage.prototype.deleteCategoryConfirm = function (categoryId, index) {
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
                                        // //console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Delete',
                                    handler: function () {
                                        // //console.log('Confirm Okay');
                                        _this.deleteCategory1(categoryId, index);
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
    AdminCategoriesPage.prototype.deleteCategory1 = function (categoryId, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
                                duration: 3000
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        this.events.publish('product:deleteCategory', categoryId);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminCategoriesPage.prototype.clearSearchCategory = function () {
        this.searchCategory = null;
    };
    AdminCategoriesPage.prototype.presentAlert = function (heading, desc) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: heading,
                            message: desc,
                            buttons: ['Ok']
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
    AdminCategoriesPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('product:publishAllCategoriesForAdmin');
        this.events.unsubscribe('product:deleteCategoryFailure');
        this.events.unsubscribe('product:noCategoryAvailable');
        this.events.unsubscribe('product:updateCategoriesPostionSucess');
        this.events.unsubscribe('product:exportCategoriesData');
        this.events.unsubscribe('product:addCategorySuccess');
        this.events.unsubscribe('product:editCategorySuccess');
        this.events.unsubscribe('product:deleteCategoryFailure');
        this.events.unsubscribe('product:editCategoryFailure');
        this.events.unsubscribe('product:publishProductsForCategory');
        this.events.unsubscribe('product:noProducts');
        this.events.unsubscribe('product:updateProductPostionSucess');
        this.events.unsubscribe('product:publishSubcategories');
        this.events.unsubscribe('product:noSubcategories');
        this.events.unsubscribe('product:updateSubcategoriesPostionSucess');
        this.events.unsubscribe('product:changeSubcategoriesStatusSuccess');
        this.events.unsubscribe('multi-region:publishActiveStatus');
        this.events.unsubscribe('multi-region:publishAllActiveRegions');
        this.events.unsubscribe('product:changeCategoryStatusSuccess');
        this.events.unsubscribe('product:changeProductStatusSuccess');
        this.events.unsubscribe('product:changeSubcategoryStatusSuccess');
        this.events.unsubscribe('product:publishProductsForSubcategory');
        this.events.unsubscribe('product:noProductsForSubcategory');
    };
    AdminCategoriesPage.prototype.exportCategories = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
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
                        this.events.publish('product:exportCategories');
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminCategoriesPage.prototype.addCategory = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.category.name === '')) return [3 /*break*/, 1];
                        this.presentAlert('', 'Please enter category name');
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.presentLoading()];
                    case 2:
                        _a.sent();
                        this.category.metaData = this.metaData;
                        this.events.publish('product:addCategory', this.category, this.imageResponse, this.categoryStatus, this.banner, this.regionId);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminCategoriesPage.prototype.addRegion = function (e, type) {
        // console.log('regionId', e.target.value);
        if (type === 'edit') {
            this.regionId = e.target.value;
            this.categoryData['regionId'] = e.target.value;
        }
        else {
            this.regionId = e.target.value;
        }
    };
    AdminCategoriesPage.prototype.updateNewCategoryStatus = function () {
        if (this.categoryStatus === true) {
            this.categoryStatus = true;
        }
        else {
            this.categoryStatus = false;
        }
    };
    AdminCategoriesPage.prototype.updateEditCategoryStatus = function (id, status, i) {
        // console.log("status", status);
        var newStatus;
        if (status == true) {
            newStatus = false;
        }
        else {
            newStatus = true;
        }
        this.categories[i].status = newStatus;
        // console.log("newStatus", newStatus); 
        this.events.publish('product:changeCategoryStatus', id, newStatus);
    };
    AdminCategoriesPage.prototype.updateEditSubcategoryStatus = function (subcatID, status, target) {
        var newStatus;
        if (status === true) {
            newStatus = false;
        }
        else {
            newStatus = true;
        }
        console.log('subcatID', subcatID);
        console.log(this.activeSubCatId);
        this.events.publish('product:changeSubcategoryStatus', this.categoryData.id, subcatID, newStatus, target === 'subcategories' ? '' : this.activeSubCatId);
    };
    AdminCategoriesPage.prototype.updateEditProductStatus = function (id, status) {
        var newStatus;
        if (status === true) {
            newStatus = false;
        }
        else {
            newStatus = true;
        }
        this.events.publish('product:changeProductStatus', id, newStatus);
    };
    AdminCategoriesPage.prototype.removeImage = function (type) {
        if (type === 'catImg') {
            this.imageResponse.splice(0, 1);
        }
        else {
            this.banner.splice(0, 1);
        }
    };
    AdminCategoriesPage.prototype.removeEditImage = function (type) {
        if (type === 'catImg') {
            this.categoryData.image = { size: null, url: null, thumb: null, mob: null };
        }
        else {
            this.categoryData.banner = { size: null, url: null, thumb: null, mob: null };
        }
    };
    AdminCategoriesPage.prototype.editCategory = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.categoryData.name === '' || this.categoryData.name === null)) return [3 /*break*/, 1];
                        this.presentAlert('', 'Please enter category name');
                        return [3 /*break*/, 4];
                    case 1:
                        // console.log('edit category logic...');
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
                                duration: 10000
                            })];
                    case 2:
                        // console.log('edit category logic...');
                        _a.loading = _b.sent();
                        this.categoryData.metaData = this.metaData;
                        // console.log('new', this.categoryData)
                        return [4 /*yield*/, this.loading.present()];
                    case 3:
                        // console.log('new', this.categoryData)
                        _b.sent();
                        this.events.publish('product:editCategory', this.categoryData, this.imageResponse, this.categoryStatus, this.banner, this.regionId);
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminCategoriesPage.prototype.deleteCategory = function (categoryId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
                                duration: 10000
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        this.events.publish('product:deleteCategory', categoryId);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminCategoriesPage.prototype.uploadImage = function (files, type) {
        var _this = this;
        // console.log(type);
        for (var i = 0; i < files.length; i++) {
            var reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = function (event) {
                var base64Image = event.target.result;
                var base64Str = base64Image.split(',');
                var size = _this.calculateImageSize(base64Str[1]);
                //this.imageResponse.push({imgData: base64Image, imgSize: size});
                if (type == 'bannerImg') {
                    // console.log('do banner image')
                    _this.banner = [];
                    _this.banner.push({ imgData: base64Image, imgSize: size });
                    // console.log("banner",this.banner,"categoryData",this.categoryData.banner)
                }
                else {
                    _this.imageResponse = [];
                    _this.imageResponse.push({ imgData: base64Image, imgSize: size });
                    // console.log("image",this.imageResponse,"categoryData",this.categoryData.image)
                }
            };
        }
    };
    AdminCategoriesPage.prototype.calculateImageSize = function (base64String) {
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
        // console.log(base64StringLength);
        inBytes = (base64StringLength / 4) * 3 - padding;
        // console.log(inBytes);
        var kbytes = inBytes / 1000;
        return kbytes;
    };
    AdminCategoriesPage.prototype.cancel = function () {
        this.router.navigate(['admin-categories']);
    };
    AdminCategoriesPage.prototype.imgZoom = function (img) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_6__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: [{ url: img }],
                index: 0
            }
        }).then(function (modal) { return modal.present(); });
    };
    AdminCategoriesPage.prototype.goToShop = function () {
        this.router.navigate(['admin-categories']);
    };
    AdminCategoriesPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
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
    AdminCategoriesPage.prototype.clearSearchProduct = function () {
        this.searchProduct = null;
    };
    AdminCategoriesPage.prototype.clearSearchSubcategory = function () {
        this.searchSubcategory = null;
    };
    AdminCategoriesPage.prototype.clearSearchSubOfSubcategory = function () {
        this.searchSubOfSubcategory = null;
    };
    AdminCategoriesPage.prototype.editProduct = function (item) {
        if (item.productType == 'appointment') {
            var navigationExtras = {
                state: {
                    productData: item,
                    productId: item.id,
                }
            };
            this.router.navigate(['appointment'], navigationExtras);
        }
        else {
            var navigationExtras = {
                state: {
                    product: item,
                    productId: item.id,
                    type: item.productType,
                    routeFromCategories: true
                }
            };
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
        }
    };
    AdminCategoriesPage.prototype.addSubcategory = function () {
        console.log('categoryData: ', this.categoryData);
        var navigationExtras = {
            state: {
                categoryId: this.categoryData.id
            }
        };
        this.router.navigate(['add-subcategories'], navigationExtras);
    };
    AdminCategoriesPage.prototype.openAddSubCategoryModal = function (title) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var navigationExtras;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                navigationExtras = {
                    state: {
                        title: title,
                        categoryId: this.categoryData.id,
                        subCategoryId: title === 'subcategory' ? '' : this.activeSubCatId,
                    }
                };
                this.router.navigate(['add-subcategories'], navigationExtras);
                return [2 /*return*/];
            });
        });
    };
    AdminCategoriesPage.prototype.openEditSubCategoryModal = function (item, target) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var navigationExtras;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                console.log('item before:', item);
                if (target === 'subcategory') {
                    this.activeSubCatId = item.id;
                }
                else
                    this.activeSubSubCatId = item.id;
                if (!item.hasOwnProperty('isExclusive')) {
                    item['isExclusive'] = false;
                }
                ;
                console.log('item after:', item);
                navigationExtras = {
                    state: {
                        categoryId: this.categoryData.id,
                        subcategoryData: item,
                        subCategoryId: this.activeSubCatId,
                    }
                };
                this.router.navigate(['add-subcategories'], navigationExtras);
                return [2 /*return*/];
            });
        });
    };
    AdminCategoriesPage.prototype.editSubcategory = function (item) {
        var navigationExtras = {
            state: {
                categoryId: this.categoryData.id,
                subcategoryData: item
            }
        };
        this.router.navigate(['add-subcategories'], navigationExtras);
    };
    AdminCategoriesPage.prototype.changeSubcategoriesStatus = function (target) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (target === 'category') {
                    if (this.categoryData.isSubcategories == true) {
                        this.categoryData.isSubcategories = false;
                    }
                    else {
                        this.categoryData.isSubcategories = true;
                    }
                    this.events.publish('product:changeSubcategoriesStatus', this.categoryData.isSubcategories, this.categoryData.id, '');
                }
                else if (target === 'subcategory') {
                    if (this.subCategoryData.isSubcategories == true) {
                        this.subCategoryData.isSubcategories = false;
                    }
                    else {
                        this.subCategoryData.isSubcategories = true;
                    }
                    this.events.publish('product:changeSubcategoriesStatus', this.subCategoryData.isSubcategories, this.categoryData.id, this.subCategoryData.id);
                }
                return [2 /*return*/];
            });
        });
    };
    AdminCategoriesPage.prototype.addVendor = function (e) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var flag, i, result;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        flag = 0;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < this.prod.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.vendorService.setVendorForProduct(this.prod[i].id, e.target.value)];
                    case 3:
                        result = _a.sent();
                        if (result == false) {
                            flag = 1;
                        }
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (flag == 0) {
                            if (this.loading) {
                                this.loading.dismiss();
                            }
                            this.presentAlert('', 'Vendor set for all Products!');
                        }
                        else {
                            if (this.loading) {
                                this.loading.dismiss();
                            }
                            this.presentAlert('', 'Vendor update Failed!');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminCategoriesPage.prototype.addGst = function (e) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var boolVal, flag, i, result;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (e.target.value == true) {
                            boolVal = true;
                            this.categoryData["gstExclusive"] = true;
                        }
                        else {
                            boolVal = false;
                            this.categoryData["gstExclusive"] = false;
                        }
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        flag = 0;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < this.prod.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.productService.setGstExclusiveForProduct(this.prod[i].id, boolVal)];
                    case 3:
                        result = _a.sent();
                        if (result == false) {
                            flag = 1;
                        }
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, this.categoryService.updateGstExclusiveCategoryProducts(this.categoryData.id, this.categoryData.gstExclusive)];
                    case 6:
                        _a.sent();
                        if (!(flag == 0)) return [3 /*break*/, 10];
                        if (!this.loading) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [4 /*yield*/, this.presentAlert('Success', 'Gst set for all Products!')];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 10:
                        if (!this.loading) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12: return [4 /*yield*/, this.presentAlert('Failed', 'Gst update Failed!')];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    AdminCategoriesPage.prototype.presentToast = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: msg,
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminCategoriesPage.prototype.getPriceListFields = function (priceList) {
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
    AdminCategoriesPage.prototype.exportProducts = function () {
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
                        this.presentAlert('', 'No products for exporting');
                        _d.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AdminCategoriesPage.prototype.downloadProducts = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var products, csvExporter;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.options.filename = this.categoryData.name + ' ' + this.getDateTimeFormat(new Date);
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
                csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_5__["ExportToCsv"](this.options);
                csvExporter.generateCsv(products);
                return [2 /*return*/];
            });
        });
    };
    // ? Sub Of Sub-category Start
    AdminCategoriesPage.prototype.getSubOfSubCategory = function (subCat, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var subOfSubData;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('subCat:', subCat);
                        this.subCategoryData = subCat;
                        this.activeSubCatId = subCat.id;
                        return [4 /*yield*/, this.categoryService.getSubOfSubCategories(this.categoryData.id, this.subCategoryData.id)];
                    case 1:
                        subOfSubData = _a.sent();
                        if (subOfSubData) {
                            this.subOfSubcategories = subOfSubData;
                            if (this.subOfSubcategories.length) {
                                this.getProdsOfSubSubCategory(this.subOfSubcategories[0]);
                            }
                            else
                                this.getSubcategoryProduct(subCat, 0);
                        }
                        else {
                            this.presentAlert('', 'Something went wrong !');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminCategoriesPage.prototype.getProdsOfSubSubCategory = function (subSubCat) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.activeSubSubCatId = subSubCat.id;
                this.events.publish('product:getProductsForSubcategory', subSubCat.id);
                return [2 /*return*/];
            });
        });
    };
    AdminCategoriesPage.prototype.changeSubOfSubCategoriesStatus = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var statusRes;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.subCategoryData.isSubcategories = !this.subCategoryData.isSubcategories;
                        return [4 /*yield*/, this.categoryService.changeSubOfSubCategoriesStatus(this.subCategoryData.isSubcategories, this.categoryData.id, this.subCategoryData.id)];
                    case 2:
                        statusRes = _a.sent();
                        this.loading.dismiss();
                        if (statusRes) {
                            this.presentAlert('Success', 'sub of sub category status changed successfully.');
                        }
                        else {
                            this.presentAlert('Failed', 'sub of sub category status change failed !');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminCategoriesPage.prototype.onReorderSubOfSubCategories = function (event) {
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
                        id = this.subOfSubcategories[start].id;
                        end = event.detail.to;
                        if (start < end && end !== this.subOfSubcategories.length - 1) {
                            firstDate = this.subOfSubcategories[end].sortedAt.toDate().getTime();
                            secondDate = this.subOfSubcategories[end + 1].sortedAt.toDate().getTime();
                            changedDate = (firstDate + secondDate) / 2;
                            // console.log('finalDate', new Date(changedDate));
                            this.categoryService.updateSubOfSubCategoriesPosition(id, new Date(changedDate), this.subCategoryData.id, this.categoryData.id);
                        }
                        // tslint:disable-next-line: one-line
                        else if (start < end && end === this.subOfSubcategories.length - 1) {
                            changedDate = this.subOfSubcategories[end].sortedAt.toDate().getTime() - 5 * 60000;
                            this.categoryService.updateSubOfSubCategoriesPosition(id, new Date(changedDate), this.subCategoryData.id, this.categoryData.id);
                        }
                        // tslint:disable-next-line: one-line
                        else if (start > end && end !== 0) {
                            firstDate = this.subOfSubcategories[end].sortedAt.toDate().getTime();
                            secondDate = this.subOfSubcategories[end - 1].sortedAt.toDate().getTime();
                            changedDate = (firstDate + secondDate) / 2;
                            // console.log('finalDate', new Date(changedDate));
                            this.categoryService.updateSubOfSubCategoriesPosition(id, new Date(changedDate), this.subCategoryData.id, this.categoryData.id);
                        }
                        // tslint:disable-next-line: one-line
                        else {
                            changedDate = this.subOfSubcategories[end].sortedAt.toDate().getTime() + 5 * 60000;
                            this.categoryService.updateSubOfSubCategoriesPosition(id, new Date(changedDate), this.subCategoryData.id, this.categoryData.id);
                        }
                        draggedItem = this.subOfSubcategories.splice(event.detail.from, 1)[0];
                        this.subOfSubcategories.splice(event.detail.to, 0, draggedItem);
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
    AdminCategoriesPage.prototype.editSubOfSubCategoryStatus = function (subOfSubCatID, status) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var newStatus, statusRes;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (status === true) {
                            newStatus = false;
                        }
                        else {
                            newStatus = true;
                        }
                        return [4 /*yield*/, this.categoryService.changeSubOfSubCategoryStatus(this.categoryData.id, this.subCategoryData.id, subOfSubCatID, newStatus)];
                    case 1:
                        statusRes = _a.sent();
                        if (statusRes) {
                            this.presentAlert('', 'Status changed successfully');
                        }
                        else {
                            this.presentAlert('', 'Something went wrong on changing status');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminCategoriesPage.prototype.AddSubOfSubCategory = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var navigationExtras;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                navigationExtras = {
                    state: {
                        categoryId: this.categoryData.id,
                        subCategoryId: this.subCategoryData.id,
                    }
                };
                this.router.navigate(['add-sub-subcategories'], navigationExtras);
                return [2 /*return*/];
            });
        });
    };
    AdminCategoriesPage.prototype.editSubOfSubCategory = function (item) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var navigationExtras;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                navigationExtras = {
                    state: {
                        categoryId: this.categoryData.id,
                        subCategoryId: this.subCategoryData.id,
                        subcategoryData: item
                    }
                };
                this.router.navigate(['add-sub-subcategories'], navigationExtras);
                return [2 /*return*/];
            });
        });
    };
    AdminCategoriesPage.prototype.clearSearchSubOfSubCategory = function () {
        this.searchSubOfSubCategory = null;
    };
    AdminCategoriesPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_4__["ProductService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_8__["LabelService"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_9__["ConfigService"] },
        { type: src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_10__["BrandsService"] },
        { type: src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_11__["VendorService"] },
        { type: src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_12__["CategoriesService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
    ], AdminCategoriesPage.prototype, "content", void 0);
    AdminCategoriesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-admin-categories',
            template: __webpack_require__(/*! raw-loader!./admin-categories.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-categories/admin-categories.page.html"),
            styles: [__webpack_require__(/*! ./admin-categories.page.scss */ "./src/app/admin/admin-categories/admin-categories.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_4__["ProductService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_8__["LabelService"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_9__["ConfigService"],
            src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_10__["BrandsService"],
            src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_11__["VendorService"],
            src_app_services_categories_categories_service__WEBPACK_IMPORTED_MODULE_12__["CategoriesService"]])
    ], AdminCategoriesPage);
    return AdminCategoriesPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-categories-admin-categories-module-es5.js.map