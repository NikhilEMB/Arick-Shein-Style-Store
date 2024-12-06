(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-whatsapp-whatsapp-list-whatsapp-list-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/whatsapp/whatsapp-list/whatsapp-list.page.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/whatsapp/whatsapp-list/whatsapp-list.page.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Whatsapp List</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content style=\"--background: white\">\r\n  <!-- <div class=\"main-container\"> -->\r\n    <ion-grid>\r\n      <ion-row>\r\n        <!-- category -->\r\n        <ion-col size=\"4\" style=\"border-right: 1px solid black;\">\r\n          <ion-row>\r\n            <ion-label>Add New Category (Max 24 characters)</ion-label>\r\n            <ion-col size=\"8\">\r\n              <div class=\"input-wrap\">\r\n                <ion-input class=\"form-input\" type=\"text\" maxlength=\"24\" [(ngModel)]=\"newCategory\"></ion-input>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"4\" class=\"vertical-align-end\">\r\n              <div class=\"input-wrap\">\r\n                <ion-button (click)=\"addNewCategory()\">Add</ion-button>\r\n              </div>\r\n            </ion-col>\r\n            <ion-text color=\"danger\">\r\n              <p>Note: Maximum of 10 List can be added.</p>\r\n            </ion-text>\r\n          </ion-row>\r\n    \r\n            <h4>List</h4>\r\n            <div class=\"sr-all-requests\">\r\n              <div *ngFor=\"let list of menuButton3.list; let i = index\">\r\n                <div class=\"sr-request\">\r\n                  <p>{{list.title}}</p>\r\n                  <div class=\"btn-wrap\">\r\n                    <span><i class=\"flaticon-null-21 cursor-p\" (click)=\"showDeleteAlert(i, 'cat')\"></i></span>\r\n                    <span><i class=\"flaticon-pencil-edit-button cursor-p\" (click)=\"editList(i, 'cat')\"></i></span>\r\n                    <ion-button (click)=\"viewListDetails(i)\" shape=\"round\">\r\n                      View <i class=\"flaticon-null-7\"></i>\r\n                    </ion-button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n        </ion-col>\r\n\r\n        <!-- subcategory -->\r\n        <ion-col size=\"4\" style=\"border-right: 1px solid black;\" *ngIf=\"menuButton3.model == 'product'\">\r\n          <ion-text color=\"danger\" *ngIf=\"paidPlanNote.length\">\r\n            <p>{{paidPlanNote}}</p>\r\n          </ion-text>\r\n          <div class=\"toggle-btn\" *ngIf=\"!paidPlanNote.length\">\r\n            Show Subcategories\r\n            <label class=\"switch\">\r\n              <input color=\"primary\" type=\"checkbox\" [checked]=\"menuButton3.list[selectedCatIndex]?.isSubcategories\"\r\n                (click)=\"updateSubcategoryStatus($event.target.checked)\">\r\n              <span class=\"slider round\"></span>\r\n            </label>\r\n          </div>\r\n          <ng-container *ngIf=\"menuButton3.list[selectedCatIndex]?.isSubcategories\">\r\n          <h3 class=\"t-a-c\">{{menuButton3.list[selectedCatIndex]?.title}}</h3>\r\n          <ion-row>\r\n            <ion-label>Add New Subcategory (Max 24 characters)</ion-label>\r\n            <ion-col size=\"8\">\r\n              <div class=\"input-wrap\">\r\n                <ion-input class=\"form-input\" type=\"text\" maxlength=\"24\" [(ngModel)]=\"newSubcategory\"></ion-input>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"4\" class=\"vertical-align-end\">\r\n              <div class=\"input-wrap\">\r\n                <ion-button (click)=\"addSubcategory()\">Add</ion-button>\r\n              </div>\r\n            </ion-col>\r\n            <ion-text color=\"danger\">\r\n              <p>Note: Maximum of 10 List can be added.</p>\r\n            </ion-text>\r\n          </ion-row>\r\n    \r\n          <ng-container *ngIf=\"selectedCatSubcategories.list?.length\">\r\n            <h4>List</h4>\r\n            <div class=\"sr-all-requests\">\r\n              <div *ngFor=\"let list of selectedCatSubcategories.list; let i = index\">\r\n                <div class=\"sr-request\">\r\n                  <p>{{list.title}}</p>\r\n                  <div class=\"btn-wrap\">\r\n                    <span><i class=\"flaticon-null-21 cursor-p\" (click)=\"showDeleteAlert(i, 'subcat')\"></i></span>\r\n                    <span><i class=\"flaticon-pencil-edit-button cursor-p\" (click)=\"editList(i, 'subcat')\"></i></span>\r\n                    <ion-button (click)=\"viewSubcatProducts(i)\" shape=\"round\">\r\n                      View Products <i class=\"flaticon-null-7\"></i>\r\n                    </ion-button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n        </ng-container>\r\n        </ion-col>\r\n\r\n        <!-- Products -->\r\n        <ion-col size=\"4\">\r\n          <h3 class=\"t-a-c\" *ngIf=\"selectedSubcatIndex == -1\">{{menuButton3.list[selectedCatIndex]?.title}}</h3>\r\n          <h3 class=\"t-a-c\" *ngIf=\"selectedSubcatIndex != -1\">{{selectedCatSubcategories.list[selectedSubcatIndex]?.title}}</h3>\r\n          <ion-row>\r\n            <ion-col size=\"8\">\r\n              <div class=\"input-wrap\">\r\n                <ion-button (click)=\"presentProductsModal()\">Add Products</ion-button>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"4\">\r\n              <div class=\"input-wrap\">\r\n                <ion-button color=\"success\" (click)=\"saveProducts('new', menuButton3.list[selectedCatIndex].isSubcategories ? 'subcat' : 'cat')\">Save Products</ion-button>\r\n              </div>\r\n            </ion-col>\r\n            <ion-text color=\"danger\">\r\n              <p>Note: Maximum of 30 products can be added to the list.</p>\r\n            </ion-text>\r\n          </ion-row>\r\n          \r\n          <div class=\"m-t-10\" *ngIf=\"selectedCatProducts?.list?.length\">\r\n            <ion-grid class=\"ion-no-padding data-table ion-text-center\">\r\n              <ion-row class=\"ion-text-capitalize\">\r\n                <ion-col size=\"2\">SNO</ion-col>\r\n                <ion-col>Product</ion-col>\r\n                <ion-col size=\"2\">Action</ion-col>\r\n              </ion-row>\r\n              <ion-row *ngFor=\"let product of selectedCatProducts.list; let i=index;\">\r\n                <ion-col size=\"2\">\r\n                  {{i+1}}\r\n                </ion-col>\r\n                <ion-col>\r\n                  {{product.name}} <span *ngIf=\"product.variant\">(Variant: {{product.variant}})</span>\r\n                </ion-col>\r\n                <ion-col size=\"2\" (click)=\"removeProduct(i)\" class=\"cursor-p\">\r\n                  <i class=\"flaticon-null-17\"></i>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  <!-- </div> -->\r\n\r\n</ion-content>\r\n\r\n"

/***/ }),

/***/ "./src/app/admin/whatsapp/whatsapp-list/whatsapp-list.module.ts":
/*!**********************************************************************!*\
  !*** ./src/app/admin/whatsapp/whatsapp-list/whatsapp-list.module.ts ***!
  \**********************************************************************/
/*! exports provided: WhatsappListPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsappListPageModule", function() { return WhatsappListPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _whatsapp_list_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./whatsapp-list.page */ "./src/app/admin/whatsapp/whatsapp-list/whatsapp-list.page.ts");







var routes = [
    {
        path: '',
        component: _whatsapp_list_page__WEBPACK_IMPORTED_MODULE_6__["WhatsappListPage"]
    }
];
var WhatsappListPageModule = /** @class */ (function () {
    function WhatsappListPageModule() {
    }
    WhatsappListPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_whatsapp_list_page__WEBPACK_IMPORTED_MODULE_6__["WhatsappListPage"]]
        })
    ], WhatsappListPageModule);
    return WhatsappListPageModule;
}());



/***/ }),

/***/ "./src/app/admin/whatsapp/whatsapp-list/whatsapp-list.page.scss":
/*!**********************************************************************!*\
  !*** ./src/app/admin/whatsapp/whatsapp-list/whatsapp-list.page.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".vertical-align-end {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: end;\n          align-items: end;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n\n.data-table ion-col {\n  border: 1px solid gray;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  -webkit-user-select: text;\n     -moz-user-select: text;\n      -ms-user-select: text;\n          user-select: text;\n}\n\n.data-table ion-row:first-child {\n  background: lightgray;\n}\n\n.sr-all-requests {\n  font-size: 14px;\n  margin-top: 10px;\n}\n\n.sr-request {\n  margin-top: 10px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 10px;\n}\n\n.sr-request .btn-wrap {\n  text-align: right;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.sr-request span i {\n  font-size: 18px;\n  margin-right: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vd2hhdHNhcHAvd2hhdHNhcHAtbGlzdC9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXHdoYXRzYXBwXFx3aGF0c2FwcC1saXN0XFx3aGF0c2FwcC1saXN0LnBhZ2Uuc2NzcyIsInNyYy9hcHAvYWRtaW4vd2hhdHNhcHAvd2hhdHNhcHAtbGlzdC93aGF0c2FwcC1saXN0LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHNCQUFBO1VBQUEsZ0JBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0FDQ0o7O0FER0k7RUFDQSxzQkFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSx5QkFBQTtLQUFBLHNCQUFBO01BQUEscUJBQUE7VUFBQSxpQkFBQTtBQ0FKOztBREdFO0VBQ0UscUJBQUE7QUNESjs7QURLQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtBQ0ZKOztBREtBO0VBQ0ksZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtBQ0ZKOztBREdJO0VBQ0ksaUJBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxxQkFBQTtVQUFBLHlCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBQ0RSOztBRElRO0VBQ0ksZUFBQTtFQUNBLGtCQUFBO0FDRloiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi93aGF0c2FwcC93aGF0c2FwcC1saXN0L3doYXRzYXBwLWxpc3QucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnZlcnRpY2FsLWFsaWduLWVuZHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogZW5kO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5kYXRhLXRhYmxleyAgXHJcbiAgICBpb24tY29se1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcclxuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XHJcbiAgICB1c2VyLXNlbGVjdDogdGV4dDtcclxuICB9XHJcbiAgXHJcbiAgaW9uLXJvdzpmaXJzdC1jaGlsZHtcclxuICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JheVxyXG4gIH1cclxufVxyXG5cclxuLnNyLWFsbC1yZXF1ZXN0cyB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG59XHJcblxyXG4uc3ItcmVxdWVzdCB7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICAuYnRuLXdyYXB7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICB9XHJcbiAgICBzcGFuIHtcclxuICAgICAgICBpe1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIudmVydGljYWwtYWxpZ24tZW5kIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGVuZDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5kYXRhLXRhYmxlIGlvbi1jb2wge1xuICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xuICBwYWRkaW5nLXRvcDogMTBweDtcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gIHVzZXItc2VsZWN0OiB0ZXh0O1xufVxuLmRhdGEtdGFibGUgaW9uLXJvdzpmaXJzdC1jaGlsZCB7XG4gIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcbn1cblxuLnNyLWFsbC1yZXF1ZXN0cyB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbWFyZ2luLXRvcDogMTBweDtcbn1cblxuLnNyLXJlcXVlc3Qge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG4uc3ItcmVxdWVzdCAuYnRuLXdyYXAge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5zci1yZXF1ZXN0IHNwYW4gaSB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/whatsapp/whatsapp-list/whatsapp-list.page.ts":
/*!********************************************************************!*\
  !*** ./src/app/admin/whatsapp/whatsapp-list/whatsapp-list.page.ts ***!
  \********************************************************************/
/*! exports provided: WhatsappListPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsappListPage", function() { return WhatsappListPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/whatsapp-dashboard/whatsapp-dashboard.service */ "./src/app/services/whatsapp-dashboard/whatsapp-dashboard.service.ts");
/* harmony import */ var _products_modal_products_modal_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../products-modal/products-modal.page */ "./src/app/admin/products-modal/products-modal.page.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");







var WhatsappListPage = /** @class */ (function () {
    function WhatsappListPage(whatsappService, sharedService, modalController, alertController, configService) {
        this.whatsappService = whatsappService;
        this.sharedService = sharedService;
        this.modalController = modalController;
        this.alertController = alertController;
        this.configService = configService;
        this.selectedCatIndex = 0;
        this.selectedCatProducts = {
            bodyText: '',
            headerText: '',
            id: '',
            list: [],
            type: 'product_list'
        };
        this.menuEntryPoint = {
            id: 'menu-entry-point',
            bodyText: '',
            list: [
                { id: 'menu-button-1', title: '', active: false },
                { id: 'menu-button-2', title: '', active: false },
                { id: 'menu-button-3', title: '', active: false },
            ],
            type: 'button',
        };
        this.menuButton3 = {
            id: 'menu-button-3',
            bodyText: '',
            headerText: '',
            list: [],
            type: 'list',
            listButtonText: 'Select Here',
            model: 'product'
        };
        this.selectedSubcatIndex = -1;
        this.selectedCatSubcategories = {
            bodyText: '',
            headerText: '',
            id: '',
            list: [],
            type: 'list'
        };
        this.paidPlanNote = '';
    }
    WhatsappListPage.prototype.ngOnInit = function () {
    };
    WhatsappListPage.prototype.initSelectedCatSubcategories = function () {
        this.selectedSubcatIndex = -1;
        this.selectedCatSubcategories = {
            bodyText: '',
            headerText: '',
            id: '',
            list: [],
            type: 'list'
        };
    };
    WhatsappListPage.prototype.initSelectedCatProducts = function () {
        this.selectedCatProducts = {
            bodyText: '',
            headerText: '',
            id: '',
            list: [],
            type: 'product_list'
        };
    };
    WhatsappListPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _i, _b, menuItem, _c, _d, listItem;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (this.configService.environment.isFreeWhatsapp) {
                            this.paidPlanNote = 'Please upgrade your plan to make Subcategories.';
                        }
                        _a = this;
                        return [4 /*yield*/, this.whatsappService.getMenuItems()];
                    case 1:
                        _a.menuItems = _e.sent();
                        if (this.menuItems && this.menuItems.length) {
                            for (_i = 0, _b = this.menuItems; _i < _b.length; _i++) {
                                menuItem = _b[_i];
                                if (menuItem.id == 'menu-entry-point') {
                                    Object.assign(this.menuEntryPoint, menuItem);
                                }
                                if (menuItem.id == 'menu-button-3') {
                                    Object.assign(this.menuButton3, menuItem);
                                }
                            }
                        }
                        for (_c = 0, _d = this.menuButton3.list; _c < _d.length; _c++) {
                            listItem = _d[_c];
                            if (!listItem.hasOwnProperty('isSubcategories')) {
                                listItem['isSubcategories'] = false;
                            }
                        }
                        this.viewListDetails(0);
                        return [2 /*return*/];
                }
            });
        });
    };
    WhatsappListPage.prototype.viewListDetails = function (index) {
        this.selectedCatIndex = index;
        this.initSelectedCatSubcategories();
        this.initSelectedCatProducts();
        if (this.menuButton3.list[index] && this.menuButton3.list[index].isSubcategories) {
            for (var _i = 0, _a = this.menuItems; _i < _a.length; _i++) {
                var menuItem = _a[_i];
                if (this.menuButton3.list[index] && menuItem.id == this.menuButton3.list[index].id) {
                    this.selectedCatSubcategories = menuItem;
                    console.log('this.selectedCatSubcategories:', this.selectedCatSubcategories);
                    // break;
                }
            }
            for (var _b = 0, _c = this.menuItems; _b < _c.length; _b++) {
                var menuItem = _c[_b];
                if (menuItem.id && this.selectedCatSubcategories.list[0] && (menuItem.id == this.selectedCatSubcategories.list[0].id)) {
                    this.selectedCatProducts = menuItem;
                    break;
                }
            }
            this.selectedSubcatIndex = 0;
        }
        else {
            if (this.menuItems) {
                for (var _d = 0, _e = this.menuItems; _d < _e.length; _d++) {
                    var menuItem = _e[_d];
                    if (this.menuButton3.list[index] && menuItem.id == this.menuButton3.list[index].id) {
                        this.selectedCatProducts = menuItem;
                        break;
                    }
                }
            }
        }
        console.log('index', this.selectedCatIndex, 'products:', this.selectedCatProducts.list);
    };
    WhatsappListPage.prototype.viewSubcatProducts = function (index) {
        this.selectedSubcatIndex = index;
        this.initSelectedCatProducts();
        if (this.menuItems) {
            for (var _i = 0, _a = this.menuItems; _i < _a.length; _i++) {
                var menuItem = _a[_i];
                if (this.selectedCatSubcategories.list[index] && menuItem.id == this.selectedCatSubcategories.list[index].id) {
                    this.selectedCatProducts = menuItem;
                    break;
                }
            }
        }
    };
    WhatsappListPage.prototype.editList = function (index, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type == 'cat' ? this.selectedCatIndex = index : this.selectedSubcatIndex = index;
                        return [4 /*yield*/, this.alertController.create({
                                subHeader: 'Edit',
                                inputs: [{
                                        name: 'listName',
                                        type: 'text',
                                        placeholder: 'List',
                                        value: type == 'cat' ? this.menuButton3.list[index].title : this.selectedCatSubcategories.list[index].title
                                    }
                                ],
                                buttons: [{
                                        text: 'cancel',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function () {
                                            console.log('Confirm Cancel');
                                        }
                                    }, {
                                        text: 'Save',
                                        handler: function (plan) {
                                            if (!plan.listName) {
                                                _this.sharedService.presentToast('List name cannot be empty');
                                                return false;
                                            }
                                            else if (plan.listName.length > 24) {
                                                _this.sharedService.presentToast('Name cannot have more than 24 characters');
                                                return false;
                                            }
                                            else {
                                                type == 'cat' ? _this.menuButton3.list[index].title = plan.listName : _this.selectedCatSubcategories.list[index].title = plan.listName;
                                                // this.menuButton3.list[index].title = plan.listName;
                                                _this.saveProducts('edit', type);
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
    WhatsappListPage.prototype.showDeleteAlert = function (index, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var msg, alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type == 'cat') {
                            msg = "Are you sure you want to delete " + this.menuButton3.list[index].title + " and remove its subcategories & products ?";
                        }
                        else {
                            msg = "Are you sure you want to delete " + this.selectedCatSubcategories.list[index].title + " and remove its products ?";
                        }
                        return [4 /*yield*/, this.alertController.create({
                                message: msg,
                                buttons: [{
                                        text: 'Cancel',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function () {
                                            // //console.log('Confirm Cancel: blah');
                                        }
                                    }, {
                                        text: 'Okay',
                                        handler: function () {
                                            _this.deleteList(index, type);
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
    WhatsappListPage.prototype.deleteList = function (index, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var title, success;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.sharedService.presentLoading();
                        if (!(type == 'cat')) return [3 /*break*/, 2];
                        title = this.menuButton3.list[index].title;
                        return [4 /*yield*/, this.whatsappService.deleteList(this.menuItems, this.menuButton3, index)];
                    case 1:
                        success = _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        title = this.selectedCatSubcategories.list[index].title;
                        return [4 /*yield*/, this.whatsappService.deleteSubcat(this.menuButton3.list[this.selectedCatIndex].id, this.selectedCatSubcategories, index)];
                    case 3:
                        success = _a.sent();
                        _a.label = 4;
                    case 4:
                        this.sharedService.loading ? this.sharedService.loading.dismiss() : {};
                        if (success) {
                            if (type == 'cat') {
                                this.menuButton3.list.splice(index, 1);
                            }
                            else if (type == 'subcat') {
                                this.selectedCatSubcategories.list.splice(index, 1);
                            }
                            this.viewListDetails(0);
                            this.sharedService.presentAlert(title + " deleted Successfully");
                        }
                        else {
                            this.sharedService.presentAlert('Something went wrong. Please try again later.');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WhatsappListPage.prototype.addNewCategory = function () {
        var _this = this;
        if (this.newCategory) {
            if (this.menuButton3.list && this.menuButton3.list.length > 0) {
                var categoryExists = this.menuButton3.list.filter(function (item) { return item.title.toLowerCase() == _this.newCategory.toLowerCase(); });
                console.log('categoryExists:', categoryExists);
                if (categoryExists && categoryExists.length > 0) {
                    this.sharedService.presentAlert('Category with same name already exists. Please try with different Category Name');
                    return;
                }
            }
            if (this.menuButton3.list.length + 1 > 10) {
                this.sharedService.presentAlert('List cannot have more than 10.');
            }
            else {
                this.menuButton3.list.push({
                    id: "send-cat" + (this.getLastNumber('cat') + 1) + "-product",
                    title: this.newCategory
                });
                this.newCategory = '';
            }
        }
    };
    WhatsappListPage.prototype.addSubcategory = function () {
        var _this = this;
        var selectedCatId = this.menuButton3.list[this.selectedCatIndex].id;
        if (this.newSubcategory) {
            if (this.selectedCatSubcategories.list && this.selectedCatSubcategories.list.length > 0) {
                var subCatExists = this.selectedCatSubcategories.list.filter(function (item) { return item.title.toLowerCase() == _this.newSubcategory.toLowerCase(); });
                console.log('subCatExists:', subCatExists);
                if (subCatExists && subCatExists.length > 0) {
                    this.sharedService.presentAlert('Subcategory with same name already exists in this list. Please try with different Name');
                    return;
                }
            }
            if (this.selectedCatSubcategories.list.length + 1 > 10) {
                this.sharedService.presentAlert('List cannot have more than 10.');
            }
            else {
                this.selectedCatSubcategories.id = selectedCatId;
                this.selectedCatSubcategories.list.push({
                    id: "send-cat" + this.getLastNumber('catOfSubcat') + "-subcat" + (this.getLastNumber('subcat') + 1),
                    title: this.newSubcategory
                });
                this.newSubcategory = '';
            }
        }
    };
    WhatsappListPage.prototype.getLastNumber = function (type) {
        if (type == 'cat') {
            if (this.menuButton3.list.length) {
                var length_1 = this.menuButton3.list.length;
                var cat = this.menuButton3.list[length_1 - 1].id.split('-')[1];
                return parseInt(cat.replace(/^\D+/g, ''));
            }
            else {
                return 0;
            }
        }
        else if (type == 'catOfSubcat') {
            var id = this.selectedCatSubcategories.id;
            var catOfSubcat = id.split('-')[1];
            return parseInt(catOfSubcat.replace(/^\D+/g, ''));
        }
        else if (type == 'subcat') {
            if (this.selectedCatSubcategories.list.length) {
                var length_2 = this.selectedCatSubcategories.list.length;
                var subcat = this.selectedCatSubcategories.list[length_2 - 1].id.split('-')[2];
                return parseInt(subcat.replace(/^\D+/g, ''));
            }
            else {
                return 0;
            }
        }
    };
    WhatsappListPage.prototype.presentProductsModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _products_modal_products_modal_page__WEBPACK_IMPORTED_MODULE_5__["ProductsModalPage"],
                            backdropDismiss: false,
                            cssClass: "custom-modal",
                            componentProps: {
                                routeViaWhatsapp: true,
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (res) {
                            if (res.data && res.data.length) {
                                console.log('res.data:', res.data);
                                var _loop_1 = function (product) {
                                    res.data = res.data.filter(function (prod) { return _this.encodeProductId(prod) != product.id; });
                                };
                                for (var _i = 0, _a = _this.selectedCatProducts.list; _i < _a.length; _i++) {
                                    var product = _a[_i];
                                    _loop_1(product);
                                }
                                if (_this.selectedCatProducts.list.length + res.data.length > 30) {
                                    _this.sharedService.presentAlert('Product List is exceeding 30. Max 30 products are allowed.');
                                    return;
                                }
                                for (var _b = 0, _c = res.data; _b < _c.length; _b++) {
                                    var prod = _c[_b];
                                    prod.id = _this.encodeProductId(prod);
                                    _this.selectedCatProducts.list.push(prod);
                                    console.log('prod:', prod);
                                }
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WhatsappListPage.prototype.encodeProductId = function (product) {
        console.log("variant exists");
        if (product.variant) {
            var variantName = product.variant.replace(' ', '*');
            return product.id + "###" + variantName;
        }
        else {
            return product.id;
        }
    };
    WhatsappListPage.prototype.removeProduct = function (i) {
        this.selectedCatProducts.list.splice(i, 1);
    };
    WhatsappListPage.prototype.saveProducts = function (mode, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var success, selectedCatId;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.sharedService.presentLoading();
                        success = false;
                        if (!(type == 'cat')) return [3 /*break*/, 4];
                        if (!(this.selectedCatProducts.list.length == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sharedService.loading];
                    case 1:
                        (_a.sent()) ? this.sharedService.loading.dismiss() : {};
                        this.sharedService.presentAlert('Please add atleast one product to save the category.');
                        return [2 /*return*/];
                    case 2:
                        this.menuButton3.headerText = this.menuEntryPoint.list[0].title;
                        this.selectedCatProducts.id = this.menuButton3.list[this.selectedCatIndex].id;
                        this.selectedCatProducts.bodyText = this.menuButton3.list[this.selectedCatIndex].title;
                        this.selectedCatProducts.headerText = this.menuButton3.list[this.selectedCatIndex].title;
                        return [4 /*yield*/, this.whatsappService.setListProducts(this.menuButton3, this.selectedCatProducts)];
                    case 3:
                        success = _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (this.selectedCatSubcategories.list.length == 0) {
                            this.sharedService.presentAlert('Please add atleast one product to save.');
                            return [2 /*return*/];
                        }
                        selectedCatId = this.menuButton3.list[this.selectedCatIndex].id;
                        this.selectedCatSubcategories.id = selectedCatId;
                        this.selectedCatProducts.id = this.selectedCatSubcategories.list[this.selectedSubcatIndex].id;
                        this.selectedCatProducts.bodyText = this.selectedCatSubcategories.list[this.selectedSubcatIndex].title;
                        this.selectedCatProducts.headerText = this.selectedCatSubcategories.list[this.selectedSubcatIndex].title;
                        return [4 /*yield*/, this.whatsappService.setListWithSubcat(this.selectedCatSubcategories, this.selectedCatProducts)];
                    case 5:
                        success = _a.sent();
                        _a.label = 6;
                    case 6:
                        this.sharedService.loading ? this.sharedService.loading.dismiss() : {};
                        if (success) {
                            if (mode == 'edit') {
                                this.sharedService.presentAlert('List edited Successfully');
                            }
                            else {
                                this.sharedService.presentAlert('Products Saved Successfully');
                            }
                        }
                        else {
                            this.sharedService.presentAlert('Something went wrong. Please try again later.');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WhatsappListPage.prototype.updateSubcategoryStatus = function (status) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var success;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.sharedService.presentLoading();
                        console.log('status:', status);
                        this.menuButton3.list[this.selectedCatIndex].isSubcategories = status;
                        return [4 /*yield*/, this.whatsappService.changeSubcategoryStatus(this.menuButton3, this.selectedCatIndex)];
                    case 1:
                        success = _a.sent();
                        this.sharedService.loading ? this.sharedService.loading.dismiss() : {};
                        success ? this.sharedService.presentAlert("Subcategories is now " + (status ? 'Active' : 'Inactive')) : this.sharedService.presentAlert('Something went wrong. Please try again later');
                        return [2 /*return*/];
                }
            });
        });
    };
    WhatsappListPage.ctorParameters = function () { return [
        { type: src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_4__["WhatsappDashboardService"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"] }
    ]; };
    WhatsappListPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-whatsapp-list',
            template: __webpack_require__(/*! raw-loader!./whatsapp-list.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/whatsapp/whatsapp-list/whatsapp-list.page.html"),
            styles: [__webpack_require__(/*! ./whatsapp-list.page.scss */ "./src/app/admin/whatsapp/whatsapp-list/whatsapp-list.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_4__["WhatsappDashboardService"], src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"]])
    ], WhatsappListPage);
    return WhatsappListPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-whatsapp-whatsapp-list-whatsapp-list-module-es5.js.map