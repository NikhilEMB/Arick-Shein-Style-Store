(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-forms-forms-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/forms/forms.page.html":
/*!***********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/forms/forms.page.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\">\r\n      <img src=\"../../../assets/img/shop-logo.png\">\r\n    </div>\r\n    <ion-title>Forms</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <ion-grid>\r\n    <ion-row>\r\n      <ion-col class=\"t-a-c\">\r\n        <ion-button size=\"small\" color=\"danger\" (click)=\"addForm()\">Add New Form</ion-button>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col>\r\n        <div *ngIf=\"showLoader; else showForms\" class=\"spinner\">\r\n          <ion-spinner color=\"primary\"></ion-spinner>\r\n        </div>\r\n\r\n        <div class=\"no-data ion-text-center\" *ngIf=\"forms && forms.length==0\">\r\n          <img src=\"assets/img/no-product.png\" alt=\"\">\r\n          <h6>No Forms Available</h6>\r\n        </div>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ng-template #showForms>\r\n      <ion-row>\r\n        <ion-col>\r\n          <div class=\"tableArea\">\r\n           <table>\r\n             <thead>\r\n               <tr class=\"header\">\r\n                 <th>S.No</th>\r\n                 <th>Form Title</th>\r\n                 <th>Action</th>\r\n               </tr>\r\n             </thead>\r\n             <tbody>\r\n               <tr *ngFor=\"let form of forms; let i = index\">\r\n                 <td>{{i+1}}</td>\r\n                 <td class=\"cursor-p\" (click)=\"viewForm(form.id)\">{{form.formTitle}}</td>\r\n                 <td>\r\n                  <ion-button fill=\"outline\" shape=\"round\" (click)=\"viewForm(form.id)\">\r\n                    View Form\r\n                  </ion-button>\r\n                 </td>\r\n                 <!-- <td>\r\n                  <i class=\"flaticon-null-21 cursor-p deleteIcon\" (click)=\"deleteForm(form.id, i)\"></i>\r\n                 </td> -->\r\n               </tr>\r\n             </tbody>\r\n           </table>\r\n          </div> \r\n        </ion-col>\r\n      </ion-row>\r\n    </ng-template>\r\n  </ion-grid>\r\n\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/forms/forms.module.ts":
/*!*********************************************!*\
  !*** ./src/app/admin/forms/forms.module.ts ***!
  \*********************************************/
/*! exports provided: FormsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormsPageModule", function() { return FormsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _forms_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./forms.page */ "./src/app/admin/forms/forms.page.ts");







const routes = [
    {
        path: '',
        component: _forms_page__WEBPACK_IMPORTED_MODULE_6__["FormsPage"]
    }
];
let FormsPageModule = class FormsPageModule {
};
FormsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_forms_page__WEBPACK_IMPORTED_MODULE_6__["FormsPage"]]
    })
], FormsPageModule);



/***/ }),

/***/ "./src/app/admin/forms/forms.page.scss":
/*!*********************************************!*\
  !*** ./src/app/admin/forms/forms.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".tableArea {\n  margin-top: 1rem;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.tableArea table {\n  border-collapse: collapse;\n  width: 100%;\n}\n.tableArea table td,\n.tableArea table th {\n  border: 1px solid #dddddd;\n  text-align: center;\n  padding: 8px;\n}\n.tableArea table tr:hover {\n  background-color: #efefef;\n}\n.tableArea .header {\n  background: lightgray;\n}\n.tableArea .deleteIcon {\n  font-size: 18px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vZm9ybXMvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxmb3Jtc1xcZm9ybXMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9mb3Jtcy9mb3Jtcy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRSxnQkFBQTtFQUVBLGtCQUFBO0VBQ0EsZ0JBQUE7QUNERjtBREdFO0VBQ0UseUJBQUE7RUFDQSxXQUFBO0FDREo7QURHSTs7RUFFRSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ0ROO0FER0k7RUFDRSx5QkFBQTtBQ0ROO0FESUU7RUFBUSxxQkFBQTtBQ0RWO0FERUU7RUFDRSxlQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9mb3Jtcy9mb3Jtcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLnRhYmxlQXJlYXtcclxuICBtYXJnaW4tdG9wOiAxcmVtO1xyXG4gLy8gYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgdGFibGUge1xyXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgXHJcbiAgICB0ZCxcclxuICAgIHRoIHtcclxuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZGRkZDtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBwYWRkaW5nOiA4cHg7XHJcbiAgICB9XHJcbiAgICB0cjpob3ZlciB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC5oZWFkZXJ7YmFja2dyb3VuZDogbGlnaHRncmF5O31cclxuICAuZGVsZXRlSWNvbntcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxufVxyXG59IiwiLnRhYmxlQXJlYSB7XG4gIG1hcmdpbi10b3A6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbi50YWJsZUFyZWEgdGFibGUge1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICB3aWR0aDogMTAwJTtcbn1cbi50YWJsZUFyZWEgdGFibGUgdGQsXG4udGFibGVBcmVhIHRhYmxlIHRoIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZGRkZDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiA4cHg7XG59XG4udGFibGVBcmVhIHRhYmxlIHRyOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjtcbn1cbi50YWJsZUFyZWEgLmhlYWRlciB7XG4gIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcbn1cbi50YWJsZUFyZWEgLmRlbGV0ZUljb24ge1xuICBmb250LXNpemU6IDE4cHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/forms/forms.page.ts":
/*!*******************************************!*\
  !*** ./src/app/admin/forms/forms.page.ts ***!
  \*******************************************/
/*! exports provided: FormsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormsPage", function() { return FormsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_services_widgets_widgets_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/widgets/widgets.service */ "./src/app/services/widgets/widgets.service.ts");




let FormsPage = class FormsPage {
    constructor(widgetService, router) {
        this.widgetService = widgetService;
        this.router = router;
        this.showLoader = true;
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const forms = yield this.widgetService.getWidgetsList('form', 'service');
            console.log('forms:', forms);
            if (forms && forms.length) {
                console.log('forms:', forms);
                this.forms = forms;
            }
            this.showLoader = false;
        });
    }
    addForm() {
        this.router.navigate(['edit-form']);
    }
    viewForm(id) {
        const navigationExtras = {
            queryParams: {
                ID: id,
            }
        };
        this.router.navigate(['edit-form'], navigationExtras);
    }
};
FormsPage.ctorParameters = () => [
    { type: src_app_services_widgets_widgets_service__WEBPACK_IMPORTED_MODULE_3__["WidgetsService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
FormsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-forms',
        template: __webpack_require__(/*! raw-loader!./forms.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/forms/forms.page.html"),
        styles: [__webpack_require__(/*! ./forms.page.scss */ "./src/app/admin/forms/forms.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_widgets_widgets_service__WEBPACK_IMPORTED_MODULE_3__["WidgetsService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], FormsPage);



/***/ })

}]);
//# sourceMappingURL=admin-forms-forms-module-es2015.js.map