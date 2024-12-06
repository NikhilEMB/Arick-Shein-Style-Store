(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-membership-settings-membership-settings-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/membership-settings/membership-settings.page.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/membership-settings/membership-settings.page.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\"\r\n      class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\"\r\n        name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\"\r\n      slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Membership Settings</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <super-tabs no-shadow\r\n    no-border>\r\n    <super-tabs-toolbar slot=\"top\">\r\n      <super-tab-button>\r\n        <ion-label>Current Users</ion-label>\r\n      </super-tab-button>\r\n      <super-tab-button>\r\n        <ion-label>Settings</ion-label>\r\n      </super-tab-button>\r\n    </super-tabs-toolbar>\r\n    <super-tabs-container>\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container\">\r\n            <div *ngIf=\"membershipUsers.length == 0\">\r\n              <p style=\"font-weight: bold;font-size: medium;\">Sorry! No user\r\n                with membership active</p>\r\n            </div>\r\n            <div *ngIf=\"membershipUsers.length > 0\"\r\n              class=\"m-t-10\">\r\n              <ion-grid class=\"ion-no-padding data-table ion-text-center\">\r\n                <ion-row class=\"ion-text-capitalize\">\r\n                  <ion-col>Name</ion-col>\r\n                  <ion-col>Plan Price ({{currencyCode}})</ion-col>\r\n                  <ion-col>Plan Discounted Price ({{currencyCode}})</ion-col>\r\n                  <ion-col>Discount</ion-col>\r\n                  <ion-col>Max Discount ({{currencyCode}})</ion-col>\r\n                  <ion-col>Free Delivery</ion-col>\r\n                  <ion-col>Delivery Fee as Cashback</ion-col>\r\n                  <ion-col>Delivery Free Above Amount ({{currencyCode}})\r\n                  </ion-col>\r\n                  <ion-col>Initial Cashback ({{currencyCode}})</ion-col>\r\n                  <ion-col>Months</ion-col>\r\n                  <ion-col>Valid Till</ion-col>\r\n                </ion-row>\r\n                <ion-row *ngFor=\"let user of membershipUsers; let i=index;\">\r\n                  <ion-col>\r\n                    {{user.name}}\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    {{user.membership.planConfig.plan.price}}\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    {{user.membership.planConfig.plan.discountedPrice}}\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    {{user.membership.planConfig.discount}} %\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    {{user.membership.planConfig.maxDiscount}}\r\n                  </ion-col>\r\n                  <ion-col\r\n                    *ngIf='user.membership.planConfig.isDeliveryFree == true'>\r\n                    Yes\r\n                  </ion-col>\r\n                  <ion-col\r\n                    *ngIf='user.membership.planConfig.isDeliveryFree != true'>\r\n                    No\r\n                  </ion-col>\r\n                  <ion-col\r\n                    *ngIf='user.membership.planConfig.isDeliveryFeeAsCashback == true'>\r\n                    Yes\r\n                  </ion-col>\r\n                  <ion-col\r\n                    *ngIf='user.membership.planConfig.isDeliveryFeeAsCashback != true'>\r\n                    No\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    {{user.membership.planConfig.deliveryFreeAmount}}\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    {{user.membership.planConfig.plan.initialCashback}}\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    {{user.membership.planConfig.plan.months}}\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    {{getDateTimeFormat(user.membership.planConfig.validTill)}}\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n          </div>\r\n        </ion-content>\r\n      </super-tab>\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container\">\r\n            <div class=\"toggle\">\r\n              <p>Active</p>&nbsp;&nbsp;&nbsp;\r\n              <div class=\"toggle-btn\">\r\n                <label class=\"switch\">\r\n                  <input type=\"checkbox\"\r\n                    (click)=\"toggleActive()\"\r\n                    [checked]=\"membership.active\">\r\n                  <span class=\"slider round\"></span>\r\n                </label>\r\n              </div>\r\n            </div>\r\n            <br>\r\n            <div class=\"data-field\">\r\n              <div class=\"data-field-txt\">\r\n                Membership Name\r\n              </div>\r\n              <div>\r\n                <ion-input type=\"text\"\r\n                  [(ngModel)]=\"membership.name\"\r\n                  class=\"form-input\"></ion-input>\r\n              </div>\r\n            </div>\r\n            <br>\r\n            <div class=\"data-field\">\r\n              <div class=\"data-field-txt\">\r\n                <p>Membership Description</p>\r\n                <br>\r\n                <ckeditor [(ngModel)]=\"membership.description\"\r\n                  [config]=\"ckeConfig\"></ckeditor>\r\n              </div>\r\n            </div>\r\n            <div class=\"data-field\">\r\n              <div class=\"data-field-txt\">\r\n                Discount on total bill (%)\r\n              </div>\r\n              <div>\r\n                <ion-input type=\"number\"\r\n                  [(ngModel)]=\"membership.discount\"\r\n                  class=\"form-input\"></ion-input>\r\n              </div>\r\n            </div>\r\n            <br>\r\n            <div class=\"data-field\">\r\n              <div class=\"data-field-txt\">\r\n                Max discount({{currencyCode}})\r\n              </div>\r\n              <div>\r\n                <ion-input type=\"number\"\r\n                  [(ngModel)]=\"membership.maxDiscount\"\r\n                  class=\"form-input\"></ion-input>\r\n              </div>\r\n            </div>\r\n            <br>\r\n            <div class=\"toggle\">\r\n              <p>Delivery free</p>&nbsp;&nbsp;&nbsp;\r\n              <div class=\"toggle-btn\">\r\n                <label class=\"switch\">\r\n                  <input type=\"checkbox\"\r\n                    (click)=\"toggleDeliveryFreeActive()\"\r\n                    [checked]=\"membership.isDeliveryFree\">\r\n                  <span class=\"slider round\"></span>\r\n                </label>\r\n              </div>\r\n            </div>\r\n            <br>\r\n            <!-- TODO - delivery fee as cashback -->\r\n            <div class=\"toggle\">\r\n              <p>Delivery fee as cashback</p>&nbsp;&nbsp;&nbsp;\r\n              <div class=\"toggle-btn\">\r\n                <label class=\"switch\">\r\n                  <input type=\"checkbox\"\r\n                    (click)=\"toggleDeliveryFreeAsCashback()\"\r\n                    [disabled]=\"membership.isDeliveryFree\"\r\n                    [checked]=\"membership.isDeliveryFeeAsCashback\">\r\n                  <span class=\"slider round\"></span>\r\n                </label>\r\n              </div>\r\n            </div>\r\n            <br>\r\n            <div class=\"data-field\">\r\n              <div class=\"data-field-txt\">\r\n                Delivery free on order above({{currencyCode}})\r\n              </div>\r\n              <div>\r\n                <ion-input type=\"number\"\r\n                  [(ngModel)]=\"membership.deliveryFreeAmount\"\r\n                  class=\"form-input\"></ion-input>\r\n              </div>\r\n            </div>\r\n            <br>\r\n            <div class=\"data-field\">\r\n              <div class=\"content-alignment\">\r\n                <div class=\"data-field-txt\">\r\n                  Membership plans\r\n                </div>\r\n                <br>\r\n                <ion-button (click)=\"addPlan()\"\r\n                  fill=\"outline\"\r\n                  shape=\"round\"\r\n                  size=\"small\">\r\n                  + Add\r\n                </ion-button>\r\n              </div>\r\n            </div>\r\n            <br>\r\n            <div *ngIf=\"membership.plans.length\"\r\n              class=\"m-t-10\">\r\n              <ion-grid class=\"ion-no-padding data-table ion-text-center\">\r\n                <ion-row class=\"ion-text-capitalize\">\r\n                  <ion-col>Months</ion-col>\r\n                  <ion-col>Price</ion-col>\r\n                  <ion-col>Discounted Price</ion-col>\r\n                  <ion-col>Initial Cashback</ion-col>\r\n                  <ion-col>Remove</ion-col>\r\n                </ion-row>\r\n                <ion-row *ngFor=\"let plan of membership.plans; let i=index;\">\r\n                  <ion-col>\r\n                    {{plan.months}}\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    {{plan.price | currency: currencyCode: true: '0.0'}}\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    {{plan.discountedPrice | currency: currencyCode: true:\r\n                    '0.0'}}\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    {{(plan.initialCashback || 0) | currency: currencyCode:\r\n                    true:\r\n                    '0.0'}}\r\n                  </ion-col>\r\n                  <ion-col (click)=\"removePlan(i)\">\r\n                    <i class=\"flaticon-null-17\"></i>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n            <br>\r\n            <div style=\"display: flex;justify-content: center\">\r\n              <ion-button (click)=\"saveMembership()\"\r\n                shape=\"round\"\r\n                class=\"btn-1 i-start\">\r\n                Save\r\n              </ion-button>\r\n            </div>\r\n          </div>\r\n        </ion-content>\r\n      </super-tab>\r\n    </super-tabs-container>\r\n  </super-tabs>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/membership-settings/membership-settings.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/admin/membership-settings/membership-settings.module.ts ***!
  \*************************************************************************/
/*! exports provided: MembershipSettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MembershipSettingsPageModule", function() { return MembershipSettingsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _membership_settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./membership-settings.page */ "./src/app/admin/membership-settings/membership-settings.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");









var routes = [
    {
        path: '',
        component: _membership_settings_page__WEBPACK_IMPORTED_MODULE_6__["MembershipSettingsPage"]
    }
];
var MembershipSettingsPageModule = /** @class */ (function () {
    function MembershipSettingsPageModule() {
    }
    MembershipSettingsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"],
                ng2_ckeditor__WEBPACK_IMPORTED_MODULE_8__["CKEditorModule"]
            ],
            declarations: [_membership_settings_page__WEBPACK_IMPORTED_MODULE_6__["MembershipSettingsPage"]]
        })
    ], MembershipSettingsPageModule);
    return MembershipSettingsPageModule;
}());



/***/ }),

/***/ "./src/app/admin/membership-settings/membership-settings.page.scss":
/*!*************************************************************************!*\
  !*** ./src/app/admin/membership-settings/membership-settings.page.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-toggle {\n  margin-top: -10px;\n}\n\n.toggle {\n  display: -webkit-box;\n  display: flex;\n  margin: 0% auto;\n}\n\n.data-field {\n  display: block;\n}\n\n.list-header {\n  position: relative;\n  width: 53.5vw;\n}\n\n.list-container {\n  margin-top: 90px;\n  width: 52vw;\n}\n\n.list-container ion-grid ion-row {\n  border-bottom: var(--ion-color-medium) 1px solid;\n}\n\n.list-container ion-grid ion-row ion-col {\n  -webkit-box-pack: center;\n          justify-content: center;\n  display: -webkit-inline-box;\n  display: inline-flex;\n}\n\n.f-d-c {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.f-d-c .m-s-btn {\n  margin-top: 15px;\n}\n\n.name {\n  width: 60vw;\n  max-width: 60vw;\n}\n\nion-input {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\nion-col {\n  border: 1px solid gray;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n\nion-row:first-child {\n  background: lightgray;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vbWVtYmVyc2hpcC1zZXR0aW5ncy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXG1lbWJlcnNoaXAtc2V0dGluZ3NcXG1lbWJlcnNoaXAtc2V0dGluZ3MucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9tZW1iZXJzaGlwLXNldHRpbmdzL21lbWJlcnNoaXAtc2V0dGluZ3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQ0ksaUJBQUE7QUNBTjs7QURHRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLGVBQUE7QUNBSjs7QURHRTtFQUNFLGNBQUE7QUNBSjs7QURHQTtFQUNJLGtCQUFBO0VBQ0EsYUFBQTtBQ0FKOztBREdBO0VBQ0ksZ0JBQUE7RUFDQSxXQUFBO0FDQUo7O0FERVE7RUFDQSxnREFBQTtBQ0FSOztBREVRO0VBQ0ksd0JBQUE7VUFBQSx1QkFBQTtFQUNBLDJCQUFBO0VBQUEsb0JBQUE7QUNBWjs7QURNQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNISjs7QURLSTtFQUNBLGdCQUFBO0FDSEo7O0FET0E7RUFDSSxXQUFBO0VBQ0EsZUFBQTtBQ0pKOztBRE9BO0VBQ0ksc0JBQUE7RUFDQSxrQkFBQTtBQ0pKOztBRE9FO0VBQ0Usc0JBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0FDSko7O0FET0U7RUFDRSxxQkFBQTtBQ0pKIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vbWVtYmVyc2hpcC1zZXR0aW5ncy9tZW1iZXJzaGlwLXNldHRpbmdzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGlvbi10b2dnbGV7XHJcbiAgICAgIG1hcmdpbi10b3A6IC0xMHB4XHJcbiAgfVxyXG5cclxuICAudG9nZ2xle1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIG1hcmdpbjogMCUgYXV0b1xyXG4gIH1cclxuICBcclxuICAuZGF0YS1maWVsZHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gIH1cclxuXHJcbi5saXN0LWhlYWRlcntcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHdpZHRoOiA1My41dnc7XHJcbn1cclxuXHJcbi5saXN0LWNvbnRhaW5lcntcclxuICAgIG1hcmdpbi10b3A6IDkwcHg7XHJcbiAgICB3aWR0aDogNTJ2dztcclxuICAgIGlvbi1ncmlke1xyXG4gICAgICAgIGlvbi1yb3d7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xyXG4gICAgICAgIC8vIG1hcmdpbi1sZWZ0OiA1dnc7XHJcbiAgICAgICAgaW9uLWNvbHtcclxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi5mLWQtYyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgLm0tcy1idG4ge1xyXG4gICAgbWFyZ2luLXRvcDogMTVweDtcclxuICAgIH1cclxufVxyXG5cclxuLm5hbWV7XHJcbiAgICB3aWR0aDogNjB2dztcclxuICAgIG1heC13aWR0aDogNjB2dztcclxufVxyXG5cclxuaW9uLWlucHV0e1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuICBpb24tY29se1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcclxuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDEwcHhcclxuICB9XHJcbiAgXHJcbiAgaW9uLXJvdzpmaXJzdC1jaGlsZHtcclxuICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JheVxyXG4gIH0iLCJpb24tdG9nZ2xlIHtcbiAgbWFyZ2luLXRvcDogLTEwcHg7XG59XG5cbi50b2dnbGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBtYXJnaW46IDAlIGF1dG87XG59XG5cbi5kYXRhLWZpZWxkIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5saXN0LWhlYWRlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDUzLjV2dztcbn1cblxuLmxpc3QtY29udGFpbmVyIHtcbiAgbWFyZ2luLXRvcDogOTBweDtcbiAgd2lkdGg6IDUydnc7XG59XG4ubGlzdC1jb250YWluZXIgaW9uLWdyaWQgaW9uLXJvdyB7XG4gIGJvcmRlci1ib3R0b206IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pIDFweCBzb2xpZDtcbn1cbi5saXN0LWNvbnRhaW5lciBpb24tZ3JpZCBpb24tcm93IGlvbi1jb2wge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG59XG5cbi5mLWQtYyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uZi1kLWMgLm0tcy1idG4ge1xuICBtYXJnaW4tdG9wOiAxNXB4O1xufVxuXG4ubmFtZSB7XG4gIHdpZHRoOiA2MHZ3O1xuICBtYXgtd2lkdGg6IDYwdnc7XG59XG5cbmlvbi1pbnB1dCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuaW9uLWNvbCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbn1cblxuaW9uLXJvdzpmaXJzdC1jaGlsZCB7XG4gIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/membership-settings/membership-settings.page.ts":
/*!***********************************************************************!*\
  !*** ./src/app/admin/membership-settings/membership-settings.page.ts ***!
  \***********************************************************************/
/*! exports provided: MembershipSettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MembershipSettingsPage", function() { return MembershipSettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);








var MembershipSettingsPage = /** @class */ (function () {
    function MembershipSettingsPage(events, labelService, router, sharedService, configService, alertController) {
        this.events = events;
        this.labelService = labelService;
        this.router = router;
        this.sharedService = sharedService;
        this.configService = configService;
        this.alertController = alertController;
        this.membership = {
            active: false,
            name: '',
            description: '',
            discount: 0,
            maxDiscount: 0,
            isDeliveryFree: false,
            isDeliveryFeeAsCashback: false,
            deliveryFreeAmount: 0,
            plans: [],
            initialCashback: 0
        };
        this.isMembership = false;
        this.membershipUsers = [];
    }
    MembershipSettingsPage.prototype.ngOnInit = function () {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.MEMBERSHIP_SETTINGS_LABELS = this.labelService.labels['MEMBERSHIP_SETTINGS'];
        this.headerText = this.MEMBERSHIP_SETTINGS_LABELS['header_text'];
        this.currencyCode = this.configService.environment.currencyCode;
        this.ckeConfig = {
            allowedContent: true,
            height: 200
        };
    };
    MembershipSettingsPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert_1;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isMembership = this.configService.environment.membership;
                        if (!(this.isMembership == false)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                message: "Sorry, this feature is not available. Please upgrade your plan for access",
                                buttons: ['ok']
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        alert_1.onWillDismiss().then(function () {
                            _this.router.navigate(['admin-home']);
                        });
                        return [4 /*yield*/, alert_1.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.initializeSubscriptions();
                        return [4 /*yield*/, this.sharedService.presentLoading("Loading data ...")];
                    case 4:
                        _a.sent();
                        this.events.publish('membership:getMembershipUsers');
                        this.events.publish('membership:getMembershipSettings');
                        return [2 /*return*/];
                }
            });
        });
    };
    MembershipSettingsPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    MembershipSettingsPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('membership:membershipSettingsSaved', function () {
            if (_this.sharedService.loading) {
                _this.sharedService.loading.dismiss();
            }
            _this.sharedService.presentAlert('Membership data saved');
        });
        this.events.subscribe('membership:membershipSettings', function (settings) {
            if (_this.sharedService.loading) {
                _this.sharedService.loading.dismiss();
            }
            if (settings && settings !== undefined) {
                _this.membership = settings;
            }
        });
        this.events.subscribe('membership:publishAllMembers', function (userData) {
            if (_this.sharedService.loading) {
                _this.sharedService.loading.dismiss();
            }
            _this.membershipUsers = userData;
        });
    };
    MembershipSettingsPage.prototype.getDateTimeFormat = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_7__(date).format('MMM D, YYYY hh:mm a');
    };
    MembershipSettingsPage.prototype.toggleActive = function () {
        this.membership.active = !this.membership.active;
    };
    MembershipSettingsPage.prototype.toggleDeliveryFreeActive = function () {
        this.membership.isDeliveryFree = !this.membership.isDeliveryFree;
        if (this.membership.isDeliveryFree) {
            this.membership.isDeliveryFeeAsCashback = false;
        }
    };
    MembershipSettingsPage.prototype.toggleDeliveryFreeAsCashback = function () {
        this.membership.isDeliveryFeeAsCashback = !this.membership.isDeliveryFeeAsCashback;
    };
    MembershipSettingsPage.prototype.addPlan = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            subHeader: 'Plan Details',
                            inputs: [
                                {
                                    name: 'months',
                                    type: 'number',
                                    placeholder: 'No of months'
                                },
                                {
                                    name: 'price',
                                    type: 'number',
                                    placeholder: 'Enter price'
                                },
                                {
                                    name: 'discountedPrice',
                                    type: 'number',
                                    placeholder: 'Enter discounted price'
                                },
                                {
                                    name: 'initialCashback',
                                    type: 'number',
                                    placeholder: 'Enter initial cashback'
                                },
                            ],
                            buttons: [
                                {
                                    text: 'cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Add',
                                    handler: function (plan) {
                                        if (!parseInt(plan.months) || !parseInt(plan.price) || !parseInt(plan.discountedPrice)) {
                                            _this.sharedService.presentToast('Please fill all the details');
                                            return false;
                                        }
                                        else if (parseInt(plan.discountedPrice) > parseInt(plan.price)) {
                                            _this.sharedService.presentToast('Discounted price greater');
                                            return false;
                                        }
                                        else {
                                            _this.membership.plans.push({
                                                months: parseInt(plan.months),
                                                price: parseInt(plan.price),
                                                discountedPrice: parseInt(plan.discountedPrice),
                                                initialCashback: parseInt(plan.initialCashback)
                                            });
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
    MembershipSettingsPage.prototype.removePlan = function (i) {
        this.membership.plans.splice(i, 1);
    };
    MembershipSettingsPage.prototype.saveMembership = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var emptyFields;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emptyFields = this.membership.active && (!this.membership.name || !this.membership.description ||
                            (this.membership.discount && !this.membership.maxDiscount) ||
                            (this.membership.isDeliveryFree && !this.membership.deliveryFreeAmount) ||
                            !this.membership.plans.length) ? true : false;
                        if (!emptyFields) return [3 /*break*/, 1];
                        this.sharedService.presentAlert('Please fill all the details');
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.sharedService.presentLoading('Please wait ...')];
                    case 2:
                        _a.sent();
                        this.events.publish('membership:saveMembershipSettings', this.membership);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MembershipSettingsPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('membership:membershipSettingsSaved');
        this.events.unsubscribe('membership:membershipSettings');
        this.events.unsubscribe('membership:publishAllMembers');
    };
    MembershipSettingsPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_5__["LabelService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__["SharedService"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] }
    ]; };
    MembershipSettingsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-membership-settings',
            template: __webpack_require__(/*! raw-loader!./membership-settings.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/membership-settings/membership-settings.page.html"),
            styles: [__webpack_require__(/*! ./membership-settings.page.scss */ "./src/app/admin/membership-settings/membership-settings.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
            src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_5__["LabelService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__["SharedService"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"]])
    ], MembershipSettingsPage);
    return MembershipSettingsPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-membership-settings-membership-settings-module-es5.js.map