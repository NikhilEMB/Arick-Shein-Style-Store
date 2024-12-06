(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~admin-admin-shop-new-product-new-product-module~admin-variants-templates-modal-templates-modal-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/variants/templates-modal/templates-modal.page.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/variants/templates-modal/templates-modal.page.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header class=\"templates-header\">\r\n  <ion-toolbar>\r\n    <ion-title class=\"templates-header-title\">templates</ion-title>\r\n    <ion-buttons slot=\"end\">\r\n      <ion-button (click)=\"closeModal()\">\r\n        <ion-icon name=\"close\"></ion-icon>\r\n      </ion-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding\">\r\n  <div *ngIf=\"showTemplatesLoader; else templatesLoaded;\" class=\"temp-spinner\">\r\n    <ion-spinner name=\"dots\"></ion-spinner>\r\n  </div>\r\n  <ng-template #templatesLoaded>\r\n    <div *ngIf=\"!templates.length; else hasTemplates;\" class=\"no-temp\">\r\n      <p>No templates available.</p>\r\n    </div>\r\n    <ng-template #hasTemplates>\r\n      <ion-list *ngIf=\"showTemplates\">\r\n        <ion-label class=\"select-temp\">Select Template</ion-label>\r\n        <ion-item button detail lines=\"none\" class=\"template-name\" *ngFor=\"let item of templates\" (click)=\"onClickTemplate(item)\">\r\n          <ion-label>{{item.id}}</ion-label>\r\n        </ion-item>\r\n      </ion-list>\r\n      <ion-list *ngIf=\"showTypes\" lines=\"none\">\r\n        <div class=\"selects-wrapper\">\r\n          <ion-item style=\"--padding-start: 0px\" (click)=\"backTotemplates()\">\r\n            <ion-icon name=\"arrow-back\" ></ion-icon>\r\n            <ion-label class=\"select-type\">Select {{type}}</ion-label>\r\n          </ion-item>\r\n          <ion-item>\r\n            <ion-label class=\"select-type\">Select All</ion-label>\r\n            <ion-checkbox color=\"primary\" (click)=\"onClickSelectAll()\"></ion-checkbox>\r\n          </ion-item>\r\n        </div>\r\n        \r\n        <ion-item button class=\"template-name\" *ngFor=\"let value of values; let i = index;\">\r\n          <ion-label>{{value}}</ion-label>\r\n          <ion-checkbox color=\"primary\" (click)=\"selectValues(value)\" [checked]=\"selectAllValues\" mode=\"ios\"></ion-checkbox>\r\n        </ion-item>\r\n      </ion-list>\r\n    </ng-template>\r\n  </ng-template>\r\n</ion-content>\r\n\r\n<ion-footer *ngIf=\"showTypes\" class=\"bottom-add-btn\">\r\n  <ion-button (click)=\"onClickAdd()\" expand=\"block\">\r\n    Add\r\n  </ion-button>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/admin/variants/templates-modal/templates-modal.page.scss":
/*!**************************************************************************!*\
  !*** ./src/app/admin/variants/templates-modal/templates-modal.page.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-content {\n  --background:#fff;\n}\n\n.templates-header ion-toolbar {\n  --background: none;\n}\n\n.templates-header-title {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.template-name {\n  --detail-icon-color: var(--ion-color-primary);\n  --detail-icon-opacity: 1;\n  --detail-icon-font-size: 13px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  margin-top: 5%;\n}\n\n.select-temp {\n  opacity: 0.7;\n  font-size: 14px;\n  text-transform: capitalize;\n}\n\n.select-type {\n  opacity: 0.7;\n  font-size: 14px;\n  text-transform: capitalize;\n}\n\n.select-type span {\n  margin-left: 3%;\n}\n\n.select-wrapper ion-icon {\n  font-size: 20px;\n  margin-right: 4px;\n}\n\n.selects-wrapper ion-checkbox {\n  margin-left: 8px;\n}\n\n.temp-spinner {\n  text-align: center;\n  position: relative;\n  top: 30%;\n}\n\n.no-temp {\n  text-align: center;\n}\n\n.bottom-add-btn {\n  background-color: white;\n}\n\n.selects-wrapper {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vdmFyaWFudHMvdGVtcGxhdGVzLW1vZGFsL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcdmFyaWFudHNcXHRlbXBsYXRlcy1tb2RhbFxcdGVtcGxhdGVzLW1vZGFsLnBhZ2Uuc2NzcyIsInNyYy9hcHAvYWRtaW4vdmFyaWFudHMvdGVtcGxhdGVzLW1vZGFsL3RlbXBsYXRlcy1tb2RhbC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxpQkFBQTtBQ0NKOztBRENBO0VBQ0ksa0JBQUE7QUNFSjs7QURDQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FDRUo7O0FEQ0E7RUFDSSw2Q0FBQTtFQUNBLHdCQUFBO0VBQ0EsNkJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBQ0VKOztBRENBO0VBQ0ksWUFBQTtFQUNBLGVBQUE7RUFDQSwwQkFBQTtBQ0VKOztBREFBO0VBQ0ksWUFBQTtFQUNBLGVBQUE7RUFDQSwwQkFBQTtBQ0dKOztBREFBO0VBQ0ksZUFBQTtBQ0dKOztBREFBO0VBQ0ksZUFBQTtFQUNBLGlCQUFBO0FDR0o7O0FEQUE7RUFDSSxnQkFBQTtBQ0dKOztBREFBO0VBQ0ksa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7QUNHSjs7QURBQTtFQUNJLGtCQUFBO0FDR0o7O0FEQUE7RUFDSSx1QkFBQTtBQ0dKOztBREFBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNHSiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3ZhcmlhbnRzL3RlbXBsYXRlcy1tb2RhbC90ZW1wbGF0ZXMtbW9kYWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnR7XHJcbiAgICAtLWJhY2tncm91bmQ6I2ZmZjtcclxufVxyXG4udGVtcGxhdGVzLWhlYWRlciBpb24tdG9vbGJhciB7XHJcbiAgICAtLWJhY2tncm91bmQ6IG5vbmU7XHJcbn1cclxuXHJcbi50ZW1wbGF0ZXMtaGVhZGVyLXRpdGxlIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi50ZW1wbGF0ZS1uYW1le1xyXG4gICAgLS1kZXRhaWwtaWNvbi1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgLS1kZXRhaWwtaWNvbi1vcGFjaXR5OiAxO1xyXG4gICAgLS1kZXRhaWwtaWNvbi1mb250LXNpemU6IDEzcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgbWFyZ2luLXRvcDogNSU7XHJcbn1cclxuXHJcbi5zZWxlY3QtdGVtcCB7XHJcbiAgICBvcGFjaXR5OiAuNztcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG59XHJcbi5zZWxlY3QtdHlwZSB7XHJcbiAgICBvcGFjaXR5OiAuNztcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG59XHJcblxyXG4uc2VsZWN0LXR5cGUgc3BhbiB7XHJcbiAgICBtYXJnaW4tbGVmdDogMyU7XHJcbn1cclxuXHJcbi5zZWxlY3Qtd3JhcHBlciBpb24taWNvbiB7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDRweDtcclxufVxyXG5cclxuLnNlbGVjdHMtd3JhcHBlciBpb24tY2hlY2tib3gge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDhweDtcclxufVxyXG5cclxuLnRlbXAtc3Bpbm5lciB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB0b3A6IDMwJTtcclxufVxyXG5cclxuLm5vLXRlbXAge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uYm90dG9tLWFkZC1idG4ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi5zZWxlY3RzLXdyYXBwZXJ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufSIsImlvbi1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiNmZmY7XG59XG5cbi50ZW1wbGF0ZXMtaGVhZGVyIGlvbi10b29sYmFyIHtcbiAgLS1iYWNrZ3JvdW5kOiBub25lO1xufVxuXG4udGVtcGxhdGVzLWhlYWRlci10aXRsZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4udGVtcGxhdGUtbmFtZSB7XG4gIC0tZGV0YWlsLWljb24tY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgLS1kZXRhaWwtaWNvbi1vcGFjaXR5OiAxO1xuICAtLWRldGFpbC1pY29uLWZvbnQtc2l6ZTogMTNweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBtYXJnaW4tdG9wOiA1JTtcbn1cblxuLnNlbGVjdC10ZW1wIHtcbiAgb3BhY2l0eTogMC43O1xuICBmb250LXNpemU6IDE0cHg7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xufVxuXG4uc2VsZWN0LXR5cGUge1xuICBvcGFjaXR5OiAwLjc7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG5cbi5zZWxlY3QtdHlwZSBzcGFuIHtcbiAgbWFyZ2luLWxlZnQ6IDMlO1xufVxuXG4uc2VsZWN0LXdyYXBwZXIgaW9uLWljb24ge1xuICBmb250LXNpemU6IDIwcHg7XG4gIG1hcmdpbi1yaWdodDogNHB4O1xufVxuXG4uc2VsZWN0cy13cmFwcGVyIGlvbi1jaGVja2JveCB7XG4gIG1hcmdpbi1sZWZ0OiA4cHg7XG59XG5cbi50ZW1wLXNwaW5uZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiAzMCU7XG59XG5cbi5uby10ZW1wIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uYm90dG9tLWFkZC1idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLnNlbGVjdHMtd3JhcHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/variants/templates-modal/templates-modal.page.ts":
/*!************************************************************************!*\
  !*** ./src/app/admin/variants/templates-modal/templates-modal.page.ts ***!
  \************************************************************************/
/*! exports provided: TemplatesModalPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplatesModalPage", function() { return TemplatesModalPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");



var TemplatesModalPage = /** @class */ (function () {
    function TemplatesModalPage(modalController, events) {
        this.modalController = modalController;
        this.events = events;
        this.templates = [];
        this.showTemplatesLoader = true;
        this.showTemplates = true;
        this.showTypes = false;
        this.values = [];
        this.selectedValues = [];
        this.selectAllValues = false;
    }
    TemplatesModalPage.prototype.ngOnInit = function () {
    };
    TemplatesModalPage.prototype.ionViewWillEnter = function () {
        this.initializeSubscriptions();
        this.events.publish('variants:getAllTemplates');
    };
    TemplatesModalPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    TemplatesModalPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('variants:publishAllTemplates');
    };
    TemplatesModalPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('variants:publishAllTemplates', function (templates) {
            //console.log('templates', templates);
            _this.templates = templates;
            _this.showTemplatesLoader = false;
        });
    };
    TemplatesModalPage.prototype.onClickTemplate = function (template) {
        this.type = template.type;
        this.values = template.values;
        this.showTemplates = false;
        this.showTypes = true;
    };
    TemplatesModalPage.prototype.backTotemplates = function () {
        this.showTypes = false;
        this.showTemplates = true;
    };
    TemplatesModalPage.prototype.selectValues = function (value) {
        if (this.selectedValues.includes(value)) {
            var index = this.selectedValues.indexOf(value);
            this.selectedValues.splice(index, 1);
        }
        else {
            this.selectedValues.push(value);
        }
    };
    TemplatesModalPage.prototype.onClickAdd = function () {
        this.modalController.dismiss({
            values: this.selectedValues,
            type: this.type
        });
    };
    TemplatesModalPage.prototype.closeModal = function () {
        this.modalController.dismiss();
    };
    TemplatesModalPage.prototype.onClickSelectAll = function () {
        if (this.selectAllValues) {
            this.selectAllValues = false;
        }
        else {
            this.selectAllValues = true;
            this.selectedValues = this.values.map(function (v) { return v; });
        }
    };
    TemplatesModalPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] }
    ]; };
    TemplatesModalPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-templates-modal',
            template: __webpack_require__(/*! raw-loader!./templates-modal.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/variants/templates-modal/templates-modal.page.html"),
            styles: [__webpack_require__(/*! ./templates-modal.page.scss */ "./src/app/admin/variants/templates-modal/templates-modal.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"]])
    ], TemplatesModalPage);
    return TemplatesModalPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~admin-admin-shop-new-product-new-product-module~admin-variants-templates-modal-templates-modal-module-es5.js.map