(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-product-addons-product-addons-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/product-addons/product-addons.page.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/product-addons/product-addons.page.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\">\r\n      <img src=\"../../../assets/img/shop-logo.png\" />\r\n    </div>\r\n    <ion-title>Product Addons</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=\"4\" id=\"scroll1\">\r\n          <ion-button class=\"addTempBtn\" expand='block' (click)=\"addTemplate()\">Add Template</ion-button>\r\n          <div class=\"groupWrapper\">\r\n            <div class=\"groupItem\" *ngFor=\"let item of addOnsData; index as i \" (click)=\"changeAddOn(i)\"\r\n              [ngClass]=\"activeTile === i ? 'tile-bg-active' : 'tile-bg-inactive'\">\r\n              <div class=\"itemFlex\">\r\n                <p class=\"groupName\">{{item.name}}</p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col size=\"8\" id=\"scroll2\">\r\n          <ng-container *ngIf=\"selectedAddOn;\">\r\n            <ion-col size=\"12\">\r\n              <div style=\"text-align: center;\">\r\n                <ion-button (click)=\"saveAddOns()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n                  <i class=\"flaticon-null-20 margin-icon\"></i>\r\n                  Save\r\n                </ion-button>\r\n                <br><br>\r\n              </div>\r\n              <div class=\"input-wrap\">\r\n                <div class=\"flex-space-between\">\r\n                  <ion-label>Template Name</ion-label>\r\n                  <ion-button color=\"danger\" *ngIf=\"selectedAddOn?.id\" (click)=\"askConfirmDelete()\">Delete Template\r\n                  </ion-button>\r\n                </div>\r\n                <ion-input class=\"form-input\" type=\"text\" [(ngModel)]=\"selectedAddOn.name\" placeholder=\"Template name\">\r\n                </ion-input>\r\n              </div>\r\n            </ion-col>\r\n            <ng-container *ngFor=\"let item of selectedAddOn.sections; index as i\">\r\n              <ion-row class=\"sectionBox\">\r\n                <ion-col size=\"12\">\r\n                  <div class=\"input-wrap\">\r\n                    <div class=\"flex-space-between\">\r\n                      <ion-label for=\"\">Section Name</ion-label>\r\n                      <ion-button color=\"danger\" (click)=\"removeSection(i)\">Delete Section</ion-button>\r\n                    </div>\r\n                    <ion-input class=\"form-input\" type=\"text\" [(ngModel)]=\"item.name\" placeholder=\"Section name\">\r\n                    </ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"12\">\r\n                  <div class=\"flexJustify\">\r\n                    <div class=\"flex\">\r\n                      <div class=\"toggle-btn\">\r\n                        <label class=\"switch\">\r\n                          <input type=\"checkbox\" [checked]=\"item.active\" (click)=\"toggleCheckBox(i,'active')\">\r\n                          <span class=\"slider round\"></span>\r\n                        </label>\r\n                      </div>\r\n                      <ion-label>Active</ion-label>\r\n                    </div>\r\n                    <div class=\"flex\">\r\n                      <div class=\"toggle-btn\">\r\n                        <label class=\"switch\">\r\n                          <input type=\"checkbox\" [checked]=\"item.multiple\" (click)=\"toggleCheckBox(i,'multiple')\">\r\n                          <span class=\"slider round\"></span>\r\n                        </label>\r\n                      </div>\r\n                      <ion-label>Allow user to select multiple options</ion-label>\r\n                    </div>\r\n                    <div class=\"flex\">\r\n                      <div class=\"toggle-btn\">\r\n                        <label class=\"switch\">\r\n                          <input type=\"checkbox\" [checked]=\"item.required\" (click)=\"toggleCheckBox(i,'required')\">\r\n                          <span class=\"slider round\"></span>\r\n                        </label>\r\n                      </div>\r\n                      <ion-label>Mandatory</ion-label>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"optionsList\">\r\n                    <div class=\"inputWrapper\">\r\n                      <input class=\"slotInput\" type=\"text\" #name placeholder=\"Option name\">\r\n                      <input class=\"slotInput\" type=\"number\" #price placeholder=\"Enter price\">\r\n                    </div>\r\n                    <ion-button fill=\"outline\" color=\"dark\" (click)=\"addOption(i, name, price)\">\r\n                      add option\r\n                    </ion-button>\r\n                  </div>\r\n\r\n                  <div class=\"optionsList\" *ngFor=\"let option of item.options;index as j\">\r\n                    <div class=\"inputWrapper\">\r\n                      <input class=\"slotInput\" type=\"text\" [(ngModel)]=\"option.name\" placeholder=\"Option name\">\r\n                      <input class=\"slotInput\" type=\"number\" [(ngModel)]=\"option.price\" placeholder=\"Enter price\">\r\n                    </div>\r\n                    <ion-button class=\"slotBtn\" fill=\"clear\" (click)=\"removeOption(i,j)\">\r\n                      <i class=\"flaticon-null-21\"></i>\r\n                    </ion-button>\r\n                  </div>\r\n\r\n                </ion-col>\r\n              </ion-row>\r\n            </ng-container>\r\n\r\n            <ion-row class=\"flexCenter\">\r\n              <ion-col size=\"6\">\r\n                <ion-button expand=\"block\" (click)=\"addSection()\">add section</ion-button>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"!selectedAddOn;\">\r\n            <h3 class=\"text-center\">No Template Found !</h3>\r\n          </ng-container>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n\r\n  </div>\r\n</ion-content>\r\n\r\n<!-- <ion-footer no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"saveAddOns()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save\r\n    </ion-button>\r\n  </div>\r\n</ion-footer> -->"

/***/ }),

/***/ "./src/app/admin/product-addons/product-addons.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/product-addons/product-addons.module.ts ***!
  \***************************************************************/
/*! exports provided: ProductAddonsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductAddonsPageModule", function() { return ProductAddonsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _product_addons_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product-addons.page */ "./src/app/admin/product-addons/product-addons.page.ts");







const routes = [
    {
        path: '',
        component: _product_addons_page__WEBPACK_IMPORTED_MODULE_6__["ProductAddonsPage"]
    }
];
let ProductAddonsPageModule = class ProductAddonsPageModule {
};
ProductAddonsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_product_addons_page__WEBPACK_IMPORTED_MODULE_6__["ProductAddonsPage"]]
    })
], ProductAddonsPageModule);



/***/ }),

/***/ "./src/app/admin/product-addons/product-addons.page.scss":
/*!***************************************************************!*\
  !*** ./src/app/admin/product-addons/product-addons.page.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  width: 100%;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 74vh;\n  margin-top: 1rem;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 82vh;\n  margin-top: 8px;\n  border-left: 1px solid lightgray;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n.btn-1 {\n  margin-bottom: 1re;\n}\n\n.flex {\n  display: -webkit-box;\n  display: flex;\n  gap: 8px;\n}\n\n.flexJustify {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-bottom: 1rem;\n}\n\n.sectionBox {\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  padding: 8px;\n  width: 100%;\n  margin-bottom: 1rem;\n}\n\n.sectionBox:hover {\n  box-shadow: 0 2px 5px #ccc;\n}\n\n.optionsList {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-top: 8px;\n  margin-bottom: 16px;\n}\n\n.optionsList .inputWrapper {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n          align-items: center;\n  width: 80%;\n}\n\n.optionsList .slotInput {\n  width: 50%;\n  padding: 10px;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  margin-right: 8px;\n}\n\n.optionsList .slotInput:hover {\n  border: 1px solid #000;\n}\n\n.slotBtn {\n  color: #000;\n}\n\n.slotBtn i {\n  color: #4a4a4a;\n  font-size: 22px;\n}\n\n.slotBtn i:hover {\n  color: #000;\n}\n\n.groupWrapper .groupItem {\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  padding: 8px;\n  margin-bottom: 8px;\n  cursor: pointer;\n}\n\n.groupWrapper .groupItem:hover {\n  box-shadow: 0 2px 5px #ccc;\n  background: var(--ion-color-light);\n}\n\n.groupWrapper .groupItem .groupName {\n  font-size: 16px;\n  font-weight: 600;\n  text-transform: capitalize;\n}\n\n.groupWrapper .groupItem .groupSize {\n  font-size: 14px;\n}\n\n.addTempBtn {\n  margin-bottom: 1rem;\n}\n\n.flexCenter {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1,\n#scroll2,\n.tableScroll {\n    height: 92vh;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vcHJvZHVjdC1hZGRvbnMvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxwcm9kdWN0LWFkZG9uc1xccHJvZHVjdC1hZGRvbnMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9wcm9kdWN0LWFkZG9ucy9wcm9kdWN0LWFkZG9ucy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0NGOztBREFFO0VBQ0UsZ0JBQUE7QUNFSjs7QURFQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxnQ0FBQTtBQ0NGOztBREFFO0VBQ0UsZ0JBQUE7QUNFSjs7QURFQTtFQUNFLGtCQUFBO0FDQ0Y7O0FERUE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxRQUFBO0FDQ0Y7O0FERUE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLG1CQUFBO0FDQ0Y7O0FERUE7RUFDRSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtBQ0NGOztBREFFO0VBQ0UsMEJBQUE7QUNFSjs7QURFQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUNDRjs7QURBRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHVCQUFBO1VBQUEsMkJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsVUFBQTtBQ0VKOztBREFFO0VBQ0UsVUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBRUEsaUJBQUE7QUNDSjs7QURBSTtFQUNFLHNCQUFBO0FDRU47O0FERUE7RUFDRSxXQUFBO0FDQ0Y7O0FEQUU7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQ0VKOztBRERJO0VBQ0UsV0FBQTtBQ0dOOztBREdFO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUNBSjs7QURDSTtFQUNFLDBCQUFBO0VBQ0Esa0NBQUE7QUNDTjs7QURDSTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDBCQUFBO0FDQ047O0FEQ0k7RUFDRSxlQUFBO0FDQ047O0FER0E7RUFDRSxtQkFBQTtBQ0FGOztBREdBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNBRjs7QURHQTtFQUNFOzs7SUFHRSxZQUFBO0VDQUY7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3Byb2R1Y3QtYWRkb25zL3Byb2R1Y3QtYWRkb25zLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluLWNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbiNzY3JvbGwxIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogNzR2aDtcclxuICBtYXJnaW4tdG9wOiAxcmVtO1xyXG4gICY6aG92ZXIge1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICB9XHJcbn1cclxuXHJcbiNzY3JvbGwyIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogODJ2aDtcclxuICBtYXJnaW4tdG9wOiA4cHg7XHJcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxufVxyXG5cclxuLmJ0bi0xIHtcclxuICBtYXJnaW4tYm90dG9tOiAxcmU7XHJcbn1cclxuXHJcbi5mbGV4IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGdhcDogOHB4O1xyXG59XHJcblxyXG4uZmxleEp1c3RpZnkge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxufVxyXG5cclxuLnNlY3Rpb25Cb3gge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIHBhZGRpbmc6IDhweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gICY6aG92ZXIge1xyXG4gICAgYm94LXNoYWRvdzogMCAycHggNXB4ICNjY2M7XHJcbiAgfVxyXG59XHJcblxyXG4ub3B0aW9uc0xpc3Qge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tdG9wOiA4cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxuICAuaW5wdXRXcmFwcGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgd2lkdGg6IDgwJTtcclxuICB9XHJcbiAgLnNsb3RJbnB1dCB7XHJcbiAgICB3aWR0aDogNTAlO1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICAvLyBtYXJnaW46IDAgOHB4IDhweCAwO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuLnNsb3RCdG4ge1xyXG4gIGNvbG9yOiAjMDAwO1xyXG4gIGkge1xyXG4gICAgY29sb3I6ICM0YTRhNGE7XHJcbiAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgY29sb3I6ICMwMDA7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbi5ncm91cFdyYXBwZXIge1xyXG4gIC8vIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XHJcbiAgLmdyb3VwSXRlbSB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDVweCAjY2NjO1xyXG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gICAgfVxyXG4gICAgLmdyb3VwTmFtZSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcbiAgICB9XHJcbiAgICAuZ3JvdXBTaXplIHtcclxuICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4uYWRkVGVtcEJ0biB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxufVxyXG5cclxuLmZsZXhDZW50ZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQobWluLWhlaWdodDogMTIwMHB4KSB7XHJcbiAgI3Njcm9sbDEsXHJcbiAgI3Njcm9sbDIsXHJcbiAgLnRhYmxlU2Nyb2xsIHtcclxuICAgIGhlaWdodDogOTJ2aDtcclxuICB9XHJcbn1cclxuIiwiLm1haW4tY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbiNzY3JvbGwxIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA3NHZoO1xuICBtYXJnaW4tdG9wOiAxcmVtO1xufVxuI3Njcm9sbDE6aG92ZXIge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG4jc2Nyb2xsMiB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogODJ2aDtcbiAgbWFyZ2luLXRvcDogOHB4O1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cbiNzY3JvbGwyOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuLmJ0bi0xIHtcbiAgbWFyZ2luLWJvdHRvbTogMXJlO1xufVxuXG4uZmxleCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogOHB4O1xufVxuXG4uZmxleEp1c3RpZnkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbi5zZWN0aW9uQm94IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBwYWRkaW5nOiA4cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuLnNlY3Rpb25Cb3g6aG92ZXIge1xuICBib3gtc2hhZG93OiAwIDJweCA1cHggI2NjYztcbn1cblxuLm9wdGlvbnNMaXN0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xufVxuLm9wdGlvbnNMaXN0IC5pbnB1dFdyYXBwZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHdpZHRoOiA4MCU7XG59XG4ub3B0aW9uc0xpc3QgLnNsb3RJbnB1dCB7XG4gIHdpZHRoOiA1MCU7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgbWFyZ2luLXJpZ2h0OiA4cHg7XG59XG4ub3B0aW9uc0xpc3QgLnNsb3RJbnB1dDpob3ZlciB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG59XG5cbi5zbG90QnRuIHtcbiAgY29sb3I6ICMwMDA7XG59XG4uc2xvdEJ0biBpIHtcbiAgY29sb3I6ICM0YTRhNGE7XG4gIGZvbnQtc2l6ZTogMjJweDtcbn1cbi5zbG90QnRuIGk6aG92ZXIge1xuICBjb2xvcjogIzAwMDtcbn1cblxuLmdyb3VwV3JhcHBlciAuZ3JvdXBJdGVtIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiA4cHg7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmdyb3VwV3JhcHBlciAuZ3JvdXBJdGVtOmhvdmVyIHtcbiAgYm94LXNoYWRvdzogMCAycHggNXB4ICNjY2M7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG59XG4uZ3JvdXBXcmFwcGVyIC5ncm91cEl0ZW0gLmdyb3VwTmFtZSB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG4uZ3JvdXBXcmFwcGVyIC5ncm91cEl0ZW0gLmdyb3VwU2l6ZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLmFkZFRlbXBCdG4ge1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG4uZmxleENlbnRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLWhlaWdodDogMTIwMHB4KSB7XG4gICNzY3JvbGwxLFxuI3Njcm9sbDIsXG4udGFibGVTY3JvbGwge1xuICAgIGhlaWdodDogOTJ2aDtcbiAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/product-addons/product-addons.page.ts":
/*!*************************************************************!*\
  !*** ./src/app/admin/product-addons/product-addons.page.ts ***!
  \*************************************************************/
/*! exports provided: ProductAddonsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductAddonsPage", function() { return ProductAddonsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_product_addons_product_addons_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/product-addons/product-addons.service */ "./src/app/services/product-addons/product-addons.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");





let ProductAddonsPage = class ProductAddonsPage {
    constructor(addOnsService, sharedService, alertController) {
        this.addOnsService = addOnsService;
        this.sharedService = sharedService;
        this.alertController = alertController;
        this.activeTile = 0;
        this.addOnValid = false;
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            let res = yield this.addOnsService.getAddOns();
            yield this.sharedService.loading.dismiss();
            if (res) {
                this.addOnsData = res;
                this.changeAddOn(0);
                // console.log(this.addOnsData);
            }
        });
    }
    ngOnInit() {
    }
    defaultObj() {
        let section = {
            name: '',
            active: false,
            multiple: false,
            required: false,
            options: [
                {
                    name: '',
                    price: null,
                }
            ],
        };
        return section;
    }
    changeAddOn(i) {
        this.activeTile = i;
        this.selectedAddOn = this.addOnsData[i];
        // console.log(this.selectedAddOn);
    }
    addTemplate() {
        this.activeTile = 0;
        this.selectedAddOn = {
            name: '',
            type: 'product-addOn',
            sections: [],
        };
    }
    askConfirmDelete() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                subHeader: `Are you sure you want to delete ${this.selectedAddOn.name} ?`,
                buttons: [
                    {
                        text: "No",
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                        }
                    }, {
                        text: "Yes",
                        handler: () => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                            this.deleteTemplate();
                        })
                    }
                ]
            });
            yield alert.present();
        });
    }
    deleteTemplate() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            let res = yield this.addOnsService.deleteAddOn(this.selectedAddOn.id);
            yield this.sharedService.loading.dismiss();
            if (res) {
                this.ionViewWillEnter();
                this.sharedService.presentAlert('Deleted successfully');
            }
            else {
                this.sharedService.presentAlert('Something went wrong !');
            }
        });
    }
    addSection() {
        this.selectedAddOn.sections.push(this.defaultObj());
    }
    addOption(i, name, price) {
        // console.log(i, "name:", name.value, "price", price.value);
        if (name.value == "" || price.value == "") {
            this.sharedService.presentAlert("Please fill both detail");
        }
        else {
            this.selectedAddOn.sections[i].options.push({ name: name.value, price: parseFloat(price.value), });
            name.value = "";
            price.value = null;
        }
    }
    removeOption(i, j) {
        // console.log(i, j);
        this.selectedAddOn.sections[i].options.splice(j, 1);
    }
    removeSection(i) {
        this.selectedAddOn.sections.splice(i, 1);
    }
    toggleCheckBox(i, status) {
        if (status == 'active') {
            // console.log(i, status);
            this.selectedAddOn.sections[i].active = !this.selectedAddOn.sections[i].active;
        }
        if (status == 'multiple') {
            // console.log(i, status);
            this.selectedAddOn.sections[i].multiple = !this.selectedAddOn.sections[i].multiple;
        }
        if (status == 'required') {
            // console.log(i, status);
            this.selectedAddOn.sections[i].required = !this.selectedAddOn.sections[i].required;
        }
    }
    saveAddOns() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            let addObj = {
                name: this.selectedAddOn.name,
                sections: this.selectedAddOn.sections,
                type: this.selectedAddOn.type
            };
            // console.log(this.selectedAddOn.id);
            for (let section of this.selectedAddOn.sections) {
                // console.log(section);
                if (section.active && section.name == '') {
                    this.addOnValid = false;
                    // console.log(this.addOnValid);
                    break;
                }
                else {
                    this.addOnValid = true;
                    // console.log(this.addOnValid);
                }
            }
            if (this.selectedAddOn.name == '' || !this.addOnValid) {
                yield this.sharedService.loading.dismiss();
                this.sharedService.presentAlert('Please fill all details for addOns !');
            }
            else {
                let res = yield this.addOnsService.setAddons(this.selectedAddOn.id, addObj);
                yield this.sharedService.loading.dismiss();
                if (res) {
                    if (!this.selectedAddOn.id) {
                        console.log('ionViewWillEnter');
                        this.ionViewWillEnter();
                        this.sharedService.presentAlert('Saved successfully');
                    }
                    else {
                        this.sharedService.presentAlert('Updated successfully');
                    }
                }
                else {
                    this.sharedService.presentAlert('Something went wrong !');
                }
            }
        });
    }
};
ProductAddonsPage.ctorParameters = () => [
    { type: src_app_services_product_addons_product_addons_service__WEBPACK_IMPORTED_MODULE_3__["ProductAddonsService"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] }
];
ProductAddonsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-product-addons',
        template: __webpack_require__(/*! raw-loader!./product-addons.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/product-addons/product-addons.page.html"),
        styles: [__webpack_require__(/*! ./product-addons.page.scss */ "./src/app/admin/product-addons/product-addons.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_product_addons_product_addons_service__WEBPACK_IMPORTED_MODULE_3__["ProductAddonsService"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]])
], ProductAddonsPage);



/***/ }),

/***/ "./src/app/services/product-addons/product-addons.service.ts":
/*!*******************************************************************!*\
  !*** ./src/app/services/product-addons/product-addons.service.ts ***!
  \*******************************************************************/
/*! exports provided: ProductAddonsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductAddonsService", function() { return ProductAddonsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");



let ProductAddonsService = class ProductAddonsService {
    constructor(afs) {
        this.afs = afs;
    }
    setAddons(id, addOns) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    if (id) {
                        yield this.afs.collection('templates').doc(id).update(addOns);
                    }
                    else {
                        yield this.afs.collection('templates').add(addOns);
                    }
                    resolve(true);
                }
                catch (err) {
                    console.log('err:', err);
                    resolve(false);
                }
            }));
        });
    }
    getAddOns() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    let addOnsArray = [];
                    const docRef = this.afs.collection('templates', ref => ref.where('type', '==', 'product-addOn'));
                    docRef.get().subscribe((snapShot) => {
                        snapShot.forEach((doc) => {
                            addOnsArray.push(Object.assign({ id: doc.id }, doc.data()));
                        });
                        resolve(addOnsArray);
                    });
                }
                catch (err) {
                    console.log('err:', err);
                    resolve(false);
                }
            }));
        });
    }
    deleteAddOn(id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    if (id) {
                        yield this.afs.collection('templates').doc(id).delete();
                        resolve(true);
                    }
                }
                catch (err) {
                    console.log('err:', err);
                    resolve(false);
                }
            }));
        });
    }
};
ProductAddonsService.ctorParameters = () => [
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] }
];
ProductAddonsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"]])
], ProductAddonsService);



/***/ })

}]);
//# sourceMappingURL=admin-product-addons-product-addons-module-es2015.js.map