(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-whatsapp-whatsapp-menu-whatsapp-menu-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/whatsapp/whatsapp-menu/whatsapp-menu.page.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/whatsapp/whatsapp-menu/whatsapp-menu.page.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Bot Menu</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=\"12\">\r\n          <div class=\"flex-label\">\r\n            <div class=\"flex-space-between\">\r\n              <div>\r\n                <ion-label>Header Image</ion-label>\r\n                <br>\r\n              </div>\r\n              <div class=\"upload-btn-wrapper\" style=\"margin-top: 8px;\">\r\n              <button\r\n                class=\"upload-btn btn-1 i-start\" style=\"margin-right: 0px;\"> <i\r\n                  class=\"flaticon-null-16\"></i>Upload</button>\r\n              <input type=\"file\" name=\"myfile\" (change)=\"uploadImage($event.target.files)\"\r\n                accept=\"image/*\" />\r\n              </div>\r\n            </div>\r\n            <div class=\"img-container\">\r\n                <div class=\"img-wrap\" style=\"margin-top: 8px;\"\r\n                  *ngIf=\"menuEntryPoint.header?.mediaUrl\">\r\n                  <img class=\"category-img\"\r\n                    [src]=\"menuEntryPoint.header?.mediaUrl\"/>\r\n                  <div class=\"overlay\">\r\n                    <ion-button class=\"btn-2 remove\" shape=\"round\" fill=\"clear\" color=\"danger\"\r\n                      (click)=\"removeImg('welcomeMsgImg')\">\r\n                      <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\r\n                    </ion-button>\r\n                  </div>\r\n                </div>\r\n            </div>\r\n\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Welcome Message (Max 1024 characters)<span class=\"red\">*</span></ion-label>\r\n            <ion-textarea rows=\"6\" maxlength=\"1024\" class=\"form-input\" [(ngModel)]=\"menuEntryPoint.bodyText\"></ion-textarea>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Footer Message (Max 60 characters)</ion-label>\r\n            <ion-input class=\"form-input\" maxlength=\"60\" [(ngModel)]=\"menuEntryPoint.footer\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <h3>Welcome Menu Buttons</h3>\r\n        <!-- menu button 1 start -->\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <div class=\"flex-label\">\r\n              <ion-label>Button 1</ion-label>\r\n              <ion-toggle [(ngModel)]=\"menuEntryPoint.list[0].active\"></ion-toggle>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ng-container *ngIf=\"menuEntryPoint.list[0].active\">\r\n        <ion-col size=\"4\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Button 1 Name (Max 20 characters)<span class=\"red\">*</span></ion-label>\r\n            <ion-input class=\"form-input\" maxlength=\"20\" [(ngModel)]=\"menuEntryPoint.list[0].title\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"4\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Button 1 Body Text (Max 72 characters)<span class=\"red\">*</span></ion-label>\r\n            <ion-input class=\"form-input\" maxlength=\"72\" [(ngModel)]=\"menuButton1.bodyText\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"4\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Type of List<span class=\"red\">*</span></ion-label>\r\n            <select class=\"form-input\" [(ngModel)]=\"menuButton1.model\" interface=\"popover\"\r\n              style=\"width: 100%; padding: 9px;\" (change)=\"changeListType($event.target.value, 'menu-button-1')\">\r\n              <option value=\"product\" selected>Product</option>\r\n              <option value=\"service\">Service</option>\r\n            </select>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\" class=\"vertical-align-end\">\r\n          <div class=\"input-wrap\">\r\n            <ion-button (click)=\"presentProductsModal(menuButton1.list, 'menu-button-1')\">Add {{menuButton1.model | titlecase}}</ion-button>\r\n          </div>\r\n        </ion-col>\r\n        <ng-container *ngIf=\"menuButton1.list?.length\">\r\n        <ion-col size=\"12\">\r\n          <h4>{{menuButton1.model | titlecase}} List</h4>\r\n          <!-- <h4 class=\"cursor-p\" (click)=\"showProductList1 = !showProductList1\">Products List \r\n            <i class=\"flaticon-download\" [ngClass]=\"showProductList1 ? 'arrowDown' : 'arrowActive'\"></i>\r\n          </h4> -->\r\n          <ion-text color=\"danger\">\r\n            <p>Note: Maximum of {{menuButton1.model == 'product' ? 30 : 10}} items can be added to the list.</p>\r\n          </ion-text>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div class=\"m-t-10\">\r\n            <ion-grid class=\"ion-no-padding data-table ion-text-center\">\r\n              <ion-row class=\"ion-text-capitalize\">\r\n                <ion-col>SNO</ion-col>\r\n                <ion-col>List</ion-col>\r\n                <ion-col>Action</ion-col>\r\n              </ion-row>\r\n              <ion-row *ngFor=\"let product of menuButton1.list; let i=index;\">\r\n                <ion-col>\r\n                  {{i+1}}\r\n                </ion-col>\r\n                <ion-col>\r\n                  {{product?.name || product?.title}} <span *ngIf=\"product.variant\">(Variant: {{product.variant}})</span>\r\n                </ion-col>\r\n                <ion-col (click)=\"removeProduct('btn1Products', i)\" class=\"cursor-p\">\r\n                  <i class=\"flaticon-null-17\"></i>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n        </ion-col>\r\n        </ng-container>\r\n      </ng-container>\r\n      <!-- menu button 1 end -->\r\n      \r\n        <!-- menu button 2 start -->\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <div class=\"flex-label\">\r\n              <ion-label>Button 2</ion-label>\r\n              <ion-toggle [(ngModel)]=\"menuEntryPoint.list[1].active\"></ion-toggle>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ng-container *ngIf=\"menuEntryPoint.list[1].active\">\r\n        <ion-col size=\"4\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Button 2 Name (Max 20 characters)<span class=\"red\">*</span></ion-label>\r\n            <ion-input class=\"form-input\" maxlength=\"20\" [(ngModel)]=\"menuEntryPoint.list[1].title\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"4\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Button 2 Body Text (Max 72 characters)<span class=\"red\">*</span></ion-label>\r\n            <ion-input class=\"form-input\" maxlength=\"72\" [(ngModel)]=\"menuButton2.bodyText\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"4\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Type of List<span class=\"red\">*</span></ion-label>\r\n            <select class=\"form-input\" [(ngModel)]=\"menuButton2.model\" interface=\"popover\"\r\n              style=\"width: 100%; padding: 9px;\" (change)=\"changeListType($event.target.value, 'menu-button-2')\">\r\n              <option value=\"product\" selected>Product</option>\r\n              <option value=\"service\">Service</option>\r\n            </select>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\" class=\"vertical-align-end\">\r\n          <ion-button (click)=\"presentProductsModal(menuButton2.list, 'menu-button-2')\">Add {{menuButton2.model | titlecase}}</ion-button>\r\n        </ion-col>\r\n        <ng-container *ngIf=\"menuButton2.list?.length\">\r\n        <ion-col size=\"12\">\r\n          <h4>{{menuButton2.model | titlecase}} List</h4>\r\n          <!-- <h4 class=\"cursor-p\" (click)=\"showProductList2 = !showProductList2\">Products List \r\n            <i class=\"flaticon-download\" [ngClass]=\"showProductList2 == true ? 'arrowDown' : 'arrowActive'\"></i>\r\n          </h4> -->\r\n          <ion-text color=\"danger\">\r\n            <p>Note: Maximum of {{menuButton2.model == 'product' ? 30 : 10}} items can be added to the list.</p>\r\n          </ion-text>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div class=\"m-t-10\">\r\n            <ion-grid class=\"ion-no-padding data-table ion-text-center\">\r\n              <ion-row class=\"ion-text-capitalize\">\r\n                <ion-col>SNO</ion-col>\r\n                <ion-col>List</ion-col>\r\n                <ion-col>Action</ion-col>\r\n              </ion-row>\r\n              <ion-row *ngFor=\"let product of menuButton2.list; let i=index;\">\r\n                <ion-col>\r\n                  {{i+1}}\r\n                </ion-col>\r\n                <ion-col>\r\n                  {{product?.name || product?.title}} <span *ngIf=\"product.variant\">(Variant: {{product.variant}})</span>\r\n                </ion-col>\r\n                <ion-col (click)=\"removeProduct('btn2Products', i)\" class=\"cursor-p\">\r\n                  <i class=\"flaticon-null-17\"></i>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n        </ion-col>\r\n        </ng-container>\r\n      </ng-container>\r\n      <!-- menu button 2 end -->\r\n\r\n      \r\n        <!-- menu button 3 start -->\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <div class=\"flex-label\">\r\n              <ion-label>Button 3</ion-label>\r\n              <ion-toggle [(ngModel)]=\"menuEntryPoint.list[2].active\"></ion-toggle>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ng-container *ngIf=\"menuEntryPoint.list[2].active\">\r\n        <ion-col size=\"4\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Button 3 Name (Max 20 characters)<span class=\"red\">*</span></ion-label>\r\n            <ion-input class=\"form-input\" maxlength=\"20\" [(ngModel)]=\"menuEntryPoint.list[2].title\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"4\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Button 3 Body Text (Max 72 characters)<span class=\"red\">*</span></ion-label>\r\n            <ion-input class=\"form-input\" maxlength=\"72\" [(ngModel)]=\"menuButton3.bodyText\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"4\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Type of List<span class=\"red\">*</span></ion-label>\r\n            <select class=\"form-input\" [(ngModel)]=\"menuButton3.model\" interface=\"popover\"\r\n              style=\"width: 100%; padding: 9px;\" (change)=\"changeListType($event.target.value, 'menu-button-3')\">\r\n              <option value=\"product\" selected>Product</option>\r\n              <option value=\"service\">Service</option>\r\n            </select>\r\n          </div>\r\n        </ion-col>\r\n      </ng-container>\r\n      <!-- menu button 3 end -->\r\n\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n\r\n</ion-content>\r\n\r\n<ion-footer no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"save()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/admin/whatsapp/whatsapp-menu/whatsapp-menu.module.ts":
/*!**********************************************************************!*\
  !*** ./src/app/admin/whatsapp/whatsapp-menu/whatsapp-menu.module.ts ***!
  \**********************************************************************/
/*! exports provided: WhatsappMenuPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsappMenuPageModule", function() { return WhatsappMenuPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _whatsapp_menu_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./whatsapp-menu.page */ "./src/app/admin/whatsapp/whatsapp-menu/whatsapp-menu.page.ts");







const routes = [
    {
        path: '',
        component: _whatsapp_menu_page__WEBPACK_IMPORTED_MODULE_6__["WhatsappMenuPage"]
    }
];
let WhatsappMenuPageModule = class WhatsappMenuPageModule {
};
WhatsappMenuPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_whatsapp_menu_page__WEBPACK_IMPORTED_MODULE_6__["WhatsappMenuPage"]]
    })
], WhatsappMenuPageModule);



/***/ }),

/***/ "./src/app/admin/whatsapp/whatsapp-menu/whatsapp-menu.page.scss":
/*!**********************************************************************!*\
  !*** ./src/app/admin/whatsapp/whatsapp-menu/whatsapp-menu.page.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".vertical-align-end {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: end;\n          align-items: end;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n\n.red {\n  color: red;\n}\n\n.arrowDown, .arrowActive {\n  font-size: 14px !important;\n}\n\n.arrowActive {\n  -webkit-transform: rotate(-90deg);\n          transform: rotate(-90deg);\n}\n\n.data-table ion-col {\n  border: 1px solid gray;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  -webkit-user-select: text;\n     -moz-user-select: text;\n      -ms-user-select: text;\n          user-select: text;\n}\n\n.data-table ion-row:first-child {\n  background: lightgray;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vd2hhdHNhcHAvd2hhdHNhcHAtbWVudS9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXHdoYXRzYXBwXFx3aGF0c2FwcC1tZW51XFx3aGF0c2FwcC1tZW51LnBhZ2Uuc2NzcyIsInNyYy9hcHAvYWRtaW4vd2hhdHNhcHAvd2hhdHNhcHAtbWVudS93aGF0c2FwcC1tZW51LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHNCQUFBO1VBQUEsZ0JBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0FDQ0o7O0FEQ0E7RUFDRSxVQUFBO0FDRUY7O0FEQUE7RUFDRSwwQkFBQTtBQ0dGOztBRERBO0VBQ0UsaUNBQUE7VUFBQSx5QkFBQTtBQ0lGOztBREFJO0VBQ0Esc0JBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EseUJBQUE7S0FBQSxzQkFBQTtNQUFBLHFCQUFBO1VBQUEsaUJBQUE7QUNHSjs7QURBRTtFQUNFLHFCQUFBO0FDRUoiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi93aGF0c2FwcC93aGF0c2FwcC1tZW51L3doYXRzYXBwLW1lbnUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnZlcnRpY2FsLWFsaWduLWVuZHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogZW5kO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuLnJlZHtcclxuICBjb2xvcjogcmVkO1xyXG59XHJcbi5hcnJvd0Rvd24sIC5hcnJvd0FjdGl2ZSB7XHJcbiAgZm9udC1zaXplOiAxNHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuLmFycm93QWN0aXZlIHtcclxuICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xyXG59XHJcblxyXG4uZGF0YS10YWJsZXsgIFxyXG4gICAgaW9uLWNvbHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XHJcbiAgICBwYWRkaW5nLXRvcDogMTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG4gICAgdXNlci1zZWxlY3Q6IHRleHQ7XHJcbiAgfVxyXG4gIFxyXG4gIGlvbi1yb3c6Zmlyc3QtY2hpbGR7XHJcbiAgICBiYWNrZ3JvdW5kOiBsaWdodGdyYXlcclxuICB9XHJcbn0iLCIudmVydGljYWwtYWxpZ24tZW5kIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGVuZDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5yZWQge1xuICBjb2xvcjogcmVkO1xufVxuXG4uYXJyb3dEb3duLCAuYXJyb3dBY3RpdmUge1xuICBmb250LXNpemU6IDE0cHggIWltcG9ydGFudDtcbn1cblxuLmFycm93QWN0aXZlIHtcbiAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcbn1cblxuLmRhdGEtdGFibGUgaW9uLWNvbCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbiAgdXNlci1zZWxlY3Q6IHRleHQ7XG59XG4uZGF0YS10YWJsZSBpb24tcm93OmZpcnN0LWNoaWxkIHtcbiAgYmFja2dyb3VuZDogbGlnaHRncmF5O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/whatsapp/whatsapp-menu/whatsapp-menu.page.ts":
/*!********************************************************************!*\
  !*** ./src/app/admin/whatsapp/whatsapp-menu/whatsapp-menu.page.ts ***!
  \********************************************************************/
/*! exports provided: WhatsappMenuPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsappMenuPage", function() { return WhatsappMenuPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/whatsapp-dashboard/whatsapp-dashboard.service */ "./src/app/services/whatsapp-dashboard/whatsapp-dashboard.service.ts");
/* harmony import */ var _products_modal_products_modal_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../products-modal/products-modal.page */ "./src/app/admin/products-modal/products-modal.page.ts");






let WhatsappMenuPage = class WhatsappMenuPage {
    constructor(whatsappService, sharedService, modalController, alertController) {
        this.whatsappService = whatsappService;
        this.sharedService = sharedService;
        this.modalController = modalController;
        this.alertController = alertController;
        this.showProductList1 = false;
        this.showProductList2 = false;
        this.menuEntryPoint = {
            id: 'menu-entry-point',
            bodyText: '',
            footer: '',
            header: { mediaUrl: '', type: '' },
            list: [
                { id: 'menu-button-1', title: '', active: false },
                { id: 'menu-button-2', title: '', active: false },
                { id: 'menu-button-3', title: '', active: false },
            ],
            type: 'button',
        };
        this.menuButton1 = {
            id: 'menu-button-1',
            bodyText: '',
            headerText: '',
            list: [],
            type: 'product_list',
            model: 'product'
        };
        this.menuButton2 = {
            id: 'menu-button-2',
            bodyText: '',
            headerText: '',
            list: [],
            type: 'product_list',
            model: 'product'
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
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.menuItems = yield this.whatsappService.getMenuItems();
            if (this.menuItems && this.menuItems.length) {
                for (const menuItem of this.menuItems) {
                    if (menuItem.id == 'menu-entry-point') {
                        this.menuEntryPoint = menuItem;
                    }
                    if (menuItem.id == 'menu-button-1') {
                        Object.assign(this.menuButton1, menuItem);
                    }
                    if (menuItem.id == 'menu-button-2') {
                        Object.assign(this.menuButton2, menuItem);
                    }
                    if (menuItem.id == 'menu-button-3') {
                        Object.assign(this.menuButton3, menuItem);
                    }
                }
            }
            this.menuButton3Model = this.menuButton3.model;
        });
    }
    presentProductsModal(alreadyAddedProducts, menuButton) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let alreadyAddedWAProducts = alreadyAddedProducts;
            // for (let [index,product] of alreadyAddedWAProducts.entries()) {
            //   alreadyAddedWAProducts[index] = this.decodeProductId(product);
            // }
            let model;
            if (menuButton == 'menu-button-1') {
                model = this.menuButton1.model;
            }
            else if (menuButton == 'menu-button-2') {
                model = this.menuButton2.model;
            }
            const modal = yield this.modalController.create({
                component: _products_modal_products_modal_page__WEBPACK_IMPORTED_MODULE_5__["ProductsModalPage"],
                backdropDismiss: false,
                cssClass: "custom-modal",
                componentProps: {
                    routeViaWhatsapp: true,
                    alreadyAddedWAProducts,
                    model
                }
            });
            modal.onDidDismiss()
                .then((res) => {
                if (res.data && res.data.length) {
                    console.log('res.data:', res.data);
                    if (menuButton == 'menu-button-1') {
                        for (const product of this.menuButton1.list) {
                            let productId = this.menuButton1.model == 'product' ? product.id : product.id.split('-')[2];
                            res.data = res.data.filter(prod => this.encodeProductId(prod) != productId);
                            // if (res.data.find(prod => this.encodeProductId(prod) == productId)) {
                            //   this.sharedService.presentAlert(`${product.name || product.title} is already added in your list.`);
                            //   return;
                            // }
                        }
                        let itemsLength = this.menuButton1.model == 'product' ? 30 : 10;
                        if (this.menuButton1.list.length + res.data.length > itemsLength) {
                            this.sharedService.presentAlert(`Item List is exceeding ${itemsLength}. Max ${itemsLength} items are allowed.`);
                            return;
                        }
                        for (let prod of res.data) {
                            prod.id = this.encodeProductId(prod);
                            if (this.menuButton1.model == 'service') {
                                this.menuButton1.list.push({ id: `send-service-${prod.id}`, title: prod.name });
                            }
                            else {
                                this.menuButton1.list.push(prod);
                            }
                            console.log('this.menuButton1.list:', this.menuButton1.list);
                        }
                    }
                    if (menuButton == 'menu-button-2') {
                        for (const product of this.menuButton2.list) {
                            let productId = this.menuButton2.model == 'product' ? product.id : product.id.split('-')[2];
                            res.data = res.data.filter(prod => this.encodeProductId(prod) != productId);
                            // if (res.data.find(prod => this.encodeProductId(prod) == productId)) {
                            //   this.sharedService.presentAlert(`${product.name} is already added in your list.`);
                            //   return;
                            // }
                        }
                        let itemsLength = this.menuButton2.model == 'product' ? 30 : 10;
                        if (this.menuButton2.list.length + res.data.length > itemsLength) {
                            this.sharedService.presentAlert(`Item List is exceeding ${itemsLength}. Max ${itemsLength} items are allowed.`);
                            return;
                        }
                        for (let prod of res.data) {
                            prod.id = this.encodeProductId(prod);
                            if (this.menuButton2.model == 'service') {
                                this.menuButton2.list.push({ id: `send-service-${prod.id}`, title: prod.name });
                            }
                            else {
                                this.menuButton2.list.push(prod);
                            }
                            console.log('prod:', prod);
                        }
                    }
                }
            });
            yield modal.present();
        });
    }
    changeListType(value, btn) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log(`value:${value}, btn:${btn}`);
            if (btn == 'menu-button-1') {
                this.menuButton1.type = value == 'product' ? 'product_list' : 'list';
                this.menuButton1.list = [];
            }
            else if (btn == 'menu-button-2') {
                this.menuButton2.type = value == 'product' ? 'product_list' : 'list';
                this.menuButton2.list = [];
            }
        });
    }
    removeProduct(btnProducts, i) {
        if (btnProducts == 'btn1Products') {
            this.menuButton1.list.splice(i, 1);
        }
        else {
            this.menuButton2.list.splice(i, 1);
        }
    }
    deleteContent() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: `Changing the list type of Menu Button 3 will lead to deletion of its content (if any). Are you sure you want to continue ?`,
                buttons: [{
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            // //console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Okay',
                        handler: () => {
                            this.proceedToSave(true);
                        }
                    }]
            });
            yield alert.present();
        });
    }
    save() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log('this.menuButton3Model:', this.menuButton3Model);
            console.log('this.menuButton3.model:', this.menuButton3.model);
            if (this.menuButton3Model != this.menuButton3.model) {
                yield this.deleteContent();
            }
            else {
                yield this.proceedToSave(false);
            }
        });
    }
    proceedToSave(deleteMenu3Items) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.menuButton1.headerText = this.menuEntryPoint.list[0].title;
            this.menuButton2.headerText = this.menuEntryPoint.list[1].title;
            this.menuButton3.headerText = this.menuEntryPoint.list[2].title;
            const isValid = this.checkValidation();
            if (!isValid) {
                this.sharedService.presentAlert('Please fill all required fields');
                return;
            }
            this.sharedService.presentLoading();
            this.menuButton1.headerText = this.menuEntryPoint.list[0].title;
            this.menuButton2.headerText = this.menuEntryPoint.list[1].title;
            this.menuButton3.headerText = this.menuEntryPoint.list[2].title;
            if (this.menuButton1.model == 'service') {
                for (let list of this.menuButton1.list) {
                    if (!list.id.includes('send-service')) {
                        list.id = `send-service-${list.id}`;
                    }
                }
            }
            if (this.menuButton2.model == 'service') {
                for (let list of this.menuButton2.list) {
                    if (!list.id.includes('send-service')) {
                        list.id = `send-service-${list.id}`;
                    }
                }
            }
            const success = yield this.whatsappService.setMenuItems(this.menuEntryPoint, this.menuButton1, this.menuButton2, this.menuButton3, { deleteMenu3Items, menuItems: this.menuItems });
            if (this.sharedService.loading) {
                this.sharedService.loading.dismiss();
            }
            if (success) {
                this.sharedService.presentAlert('Data Saved Successfully');
            }
            else {
                this.sharedService.presentAlert('Something went wrong. Please try again later.');
            }
        });
    }
    // fetch product ID, variant, and quantity
    decodeProductId(product) {
        const productDetails = {};
        if (product.id.includes('###')) {
            console.log('variant exists');
            const productDetailsArray = product.id.split('###');
            productDetails.id = productDetailsArray[0];
            productDetails.variant = productDetailsArray[1].replace('*', ' ');
        }
        else {
            console.log('variant not exists');
            productDetails.id = product.id;
        }
        return productDetails;
    }
    encodeProductId(product) {
        console.log("variant exists");
        if (product.variant) {
            const variantName = product.variant.replace(' ', '*');
            return `${product.id}###${variantName}`;
        }
        else {
            return product.id;
        }
    }
    checkValidation() {
        if (!this.menuEntryPoint.bodyText) {
            return false;
        }
        else if (this.menuEntryPoint.list[0].active && (!this.menuButton1.bodyText || !this.menuButton1.headerText || !this.menuButton1.list)) {
            console.log('this.menuButton1:', this.menuButton1);
            return false;
        }
        else if (this.menuEntryPoint.list[1].active && (!this.menuButton2.bodyText || !this.menuButton2.headerText || !this.menuButton2.list)) {
            console.log('this.menuButton2:', this.menuButton2);
            return false;
        }
        else if (this.menuEntryPoint.list[2].active && (!this.menuButton3.bodyText || !this.menuButton3.headerText)) {
            console.log('this.menuButton3:', this.menuButton3);
            return false;
        }
        else {
            return true;
        }
    }
    uploadImage(files) {
        for (let i = 0; i < files.length; i++) {
            console.log('files[i]:', files[i]);
            if (files[i].size / 1024 / 1024 > 5) { //Size of img is in bytes.
                this.sharedService.presentAlert('Image size cannot be greater than 5MB.');
                return;
            }
            let reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = (event) => {
                console.log('hello');
                this.menuEntryPoint.header['mediaUrl'] = event.target.result;
                // let base64Image: any = event.target.result;
            };
        }
    }
    removeImg(imgType) {
        if (imgType === 'welcomeMsgImg') {
            this.menuEntryPoint.header['mediaUrl'] = '';
        }
    }
};
WhatsappMenuPage.ctorParameters = () => [
    { type: src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_4__["WhatsappDashboardService"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] }
];
WhatsappMenuPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-whatsapp-menu',
        template: __webpack_require__(/*! raw-loader!./whatsapp-menu.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/whatsapp/whatsapp-menu/whatsapp-menu.page.html"),
        styles: [__webpack_require__(/*! ./whatsapp-menu.page.scss */ "./src/app/admin/whatsapp/whatsapp-menu/whatsapp-menu.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_4__["WhatsappDashboardService"], src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]])
], WhatsappMenuPage);



/***/ })

}]);
//# sourceMappingURL=admin-whatsapp-whatsapp-menu-whatsapp-menu-module-es2015.js.map