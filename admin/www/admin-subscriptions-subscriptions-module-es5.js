(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-subscriptions-subscriptions-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/subscriptions/subscriptions.page.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/subscriptions/subscriptions.page.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Subscriptions</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <super-tabs no-shadow no-border>\r\n    <super-tabs-toolbar slot=\"top\">\r\n      <super-tab-button>\r\n        <ion-label>List</ion-label>\r\n      </super-tab-button>\r\n      <super-tab-button>\r\n        <ion-label>Settings</ion-label>\r\n      </super-tab-button>\r\n    </super-tabs-toolbar>\r\n\r\n    <super-tabs-container>\r\n      <super-tab>\r\n        <ion-content class=\"sub-list-content\">\r\n            <div class=\"main-container\">\r\n          <div *ngIf=\"showLoader; else subsLoaded;\" class=\"spinner\">\r\n            <ion-spinner color=\"primary\"></ion-spinner>\r\n          </div>\r\n          <ng-template #subsLoaded>\r\n            <div class=\"no-data\" *ngIf=\"!subscriptions.length; else showSubscriptions\" text-center>\r\n              <img src=\"assets/img/no-orders.png\" alt=\"\">\r\n              <h6>No subscriptions</h6>\r\n            </div>\r\n            <ng-template #showSubscriptions>\r\n              <div *ngFor=\"let sub of subscriptions; let i=index\">\r\n                <div class=\"ps-products-container\">\r\n                  <div class=\"ps-placed-on\">\r\n                    Subscribed on {{sub.createdAt.toDate() | date: 'short'}}\r\n                  </div>\r\n                  <hr class=\"line\">\r\n\r\n                  <ion-item lines=\"none\">\r\n                    <div *ngIf=\"sub.product.coverPic.mob\" slot=\"start\"\r\n                      [ngStyle]=\"{'background': 'url(' + sub.product.coverPic.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n                      class=\"ps-product-image\">\r\n                    </div>\r\n                    <div *ngIf=\"!sub.product.coverPic.mob && sub.product.coverPic.url\" slot=\"start\"\r\n                      [ngStyle]=\"{'background': 'url(' + sub.product.coverPic.url + ') no-repeat center', 'background-size': 'contain'}\"\r\n                      class=\"ps-product-image\">\r\n                    </div>\r\n                    <div *ngIf=\"!sub.product.coverPic.mob && !sub.product.coverPic.url\" slot=\"start\"\r\n                      class=\"ps-no-product-image\">\r\n                    </div>\r\n                    <ion-label>\r\n                      <div class=\"price-arrow\">\r\n                        <h2 class=\"ps-product-price ion-text-wrap\" *ngIf=\"sub.amountPayable\">\r\n                          {{sub.amountPayable | currency: currencyCode:true}}</h2>\r\n                        <i (click)=\"openSubscriptionCalendar(sub)\" class=\"flaticon-null-12\"></i>\r\n                      </div>\r\n                      <h3 (click)=\"openSubscriptionCalendar(sub)\" class=\"ps-product-name ion-text-wrap\">{{sub.product.prodName}}</h3>\r\n                      <h3 class=\"ps-sub-by ion-text-wrap\" *ngIf=\"sub.userName\">\r\n                        Subscribed by\r\n                        <span (click)=\"messageUser(sub.userId)\">{{sub.userName}}</span>\r\n                      </h3>\r\n                      <h3 class=\"ps-completed ion-text-wrap\" *ngIf=\"sub.hasOwnProperty('orderCreated') && sub.orderCreated === sub.totalDeliveries\">\r\n                        Completed <i class=\"flaticon-null-20\"></i>\r\n                      </h3>\r\n                    </ion-label>\r\n                  </ion-item>\r\n\r\n                  <div class=\"ps-next-order\" *ngIf=\"!sub.hasOwnProperty('orderCreated') || (sub.hasOwnProperty('orderCreated') && sub.orderCreated < sub.totalDeliveries)\">\r\n\t\t\t\t\t<div *ngIf=\"hasSubscriptionCompleted(sub); else ongoingSubscription\">\r\n                        Completed <i class=\"flaticon-null-20\"></i>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<ng-template #ongoingSubscription>\r\n\t\t\t\t\t\t<span>Next order on <span class=\"ps-next-order-bold\">{{getNextDate(sub) | date}}</span></span>\r\n\t\t\t\t\t\t<span *ngIf=\"sub.deliverySlot && sub.deliverySlot.hasOwnProperty('start')\">\r\n\t\t\t\t\t\t  at <span class=\"ps-next-order-bold\">{{sub.deliverySlot.start}} - {{sub.deliverySlot.end}}</span>\r\n\t\t\t\t\t\t</span>\r\n\t\t\t\t\t</ng-template>\r\n                  </div>\r\n\r\n                  <!-- <div class=\"delivery-dates\" *ngIf=\"sub?.ordersAt?.length > 0\">\r\n                    <ion-text color=\"primary\" (click)=\"sub.viewDates = !sub.viewDates\">\r\n                      <span>\r\n                        Check Dates\r\n                      </span>\r\n                      <span *ngIf=\"!sub.viewDates\">\r\n                          <i class=\"flaticon-down-arrow\"></i>\r\n                      </span>\r\n                      <span *ngIf=\"sub.viewDates\">\r\n                          <i class=\"flaticon-upload\"></i>\r\n                      </span>\r\n                    </ion-text>\r\n\r\n                    <ng-container *ngIf=\"sub.viewDates\">\r\n                      <div class=\"f-s-14 m-t-16 m-b-16\">\r\n                        <ul>\r\n                          <li *ngFor=\"let date of sub.ordersAt\">\r\n                            {{date | date}}\r\n                          </li>\r\n                        </ul>\r\n                      </div>\r\n                    </ng-container>\r\n                  </div> -->\r\n\r\n                  <div class=\"ps-action-btn\" *ngIf=\"!sub.hasOwnProperty('orderCreated') || (sub.hasOwnProperty('orderCreated') && sub.orderCreated < sub.totalDeliveries)\">\r\n                    <ion-grid class=\"ion-no-padding\">\r\n                      <ion-row class=\"ion-no-padding\">\r\n                        <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                          <ion-button (click)=\"removeSubConfirm(i)\" size=\"small\" color=\"dark\" shape=\"round\">\r\n                            Remove <ion-icon name=\"trash\"></ion-icon>\r\n                          </ion-button>\r\n                        </ion-col>\r\n                        <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                          <ion-button (click)=\"toggleActive(i)\" size=\"small\" shape=\"round\">\r\n                            <span *ngIf=\"sub.active\">Pause <ion-icon name=\"pause\"></ion-icon></span>\r\n                            <span *ngIf=\"!sub.active\">Resume <i class=\"flaticon-refresh\"></i></span>\r\n                          </ion-button>\r\n                        </ion-col>\r\n                      </ion-row>\r\n                    </ion-grid>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n          </ng-template>\r\n            </div>\r\n        </ion-content>\r\n      </super-tab>\r\n      <super-tab>\r\n        <ion-content class=\"ion-padding\">\r\n            <div class=\"main-container\">\r\n          <div class=\"content-alignment sub-settings-fields\">\r\n            <div>Active</div>\r\n            <div class=\"toggle-btn\">\r\n              <label class=\"switch\">\r\n                <input type=\"checkbox\" (click)=\"activeToggle()\" [checked]=\"isActive\">\r\n                <span class=\"slider round\"></span>\r\n              </label>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"content-alignment sub-settings-fields\">\r\n            <div>Cash Payment</div>\r\n            <div class=\"toggle-btn\">\r\n              <label class=\"switch\">\r\n                <input type=\"checkbox\" (click)=\"cashAllowedToggle()\" [checked]=\"isCashAllowed\">\r\n                <span class=\"slider round\"></span>\r\n              </label>\r\n            </div>\r\n          </div>\r\n          <hr class=\"line\">\r\n\r\n          <div class=\"sub-settings-fields\">\r\n            <h6>Daily: </h6>\r\n\r\n            <div class=\"content-alignment sub-settings-fields\">\r\n              <div>Minimum Deliveries</div>\r\n              <ion-input class=\"sub-settings-input\" type=\"number\" [(ngModel)]=\"dailyDeliveries.min\"></ion-input>\r\n            </div>\r\n\r\n            <div class=\"content-alignment sub-settings-fields\">\r\n              <div>Maximum Deliveries</div>\r\n              <ion-input class=\"sub-settings-input\" type=\"number\" [(ngModel)]=\"dailyDeliveries.max\"></ion-input>\r\n            </div>\r\n          </div>\r\n          <hr class=\"line\">\r\n\r\n          <div class=\"sub-settings-fields\">\r\n            <h6>Weekly: </h6>\r\n\r\n            <div class=\"content-alignment sub-settings-fields\">\r\n              <div>Minimum Deliveries</div>\r\n              <ion-input class=\"sub-settings-input\" type=\"number\" [(ngModel)]=\"weeklyDeliveries.min\"></ion-input>\r\n            </div>\r\n\r\n            <div class=\"content-alignment sub-settings-fields\">\r\n              <div>Maximum Deliveries</div>\r\n              <ion-input class=\"sub-settings-input\" type=\"number\" [(ngModel)]=\"weeklyDeliveries.max\"></ion-input>\r\n            </div>\r\n          </div>\r\n          <hr class=\"line\">\r\n\r\n          <div class=\"sub-settings-fields\">\r\n            <h6>Monthly: </h6>\r\n\r\n            <div class=\"content-alignment sub-settings-fields\">\r\n              <div>Minimum Deliveries</div>\r\n              <ion-input class=\"sub-settings-input\" type=\"number\" [(ngModel)]=\"monthlyDeliveries.min\"></ion-input>\r\n            </div>\r\n\r\n            <div class=\"content-alignment sub-settings-fields\">\r\n              <div>Maximum Deliveries</div>\r\n              <ion-input class=\"sub-settings-input\" type=\"number\" [(ngModel)]=\"monthlyDeliveries.max\"></ion-input>\r\n            </div>\r\n          </div>\r\n          <div class=\"page-footer\">\r\n              <ion-button (click)=\"saveSettings()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n                <i class=\"flaticon-null-20 margin-icon\"></i>\r\n                Save\r\n              </ion-button>\r\n          </div>\r\n          </div>\r\n        </ion-content>\r\n      </super-tab>\r\n    </super-tabs-container>\r\n  </super-tabs>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/subscriptions/subscriptions.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/admin/subscriptions/subscriptions.module.ts ***!
  \*************************************************************/
/*! exports provided: SubscriptionsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubscriptionsPageModule", function() { return SubscriptionsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _subscriptions_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./subscriptions.page */ "./src/app/admin/subscriptions/subscriptions.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");








var routes = [
    {
        path: '',
        component: _subscriptions_page__WEBPACK_IMPORTED_MODULE_6__["SubscriptionsPage"]
    }
];
var SubscriptionsPageModule = /** @class */ (function () {
    function SubscriptionsPageModule() {
    }
    SubscriptionsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"]
            ],
            declarations: [_subscriptions_page__WEBPACK_IMPORTED_MODULE_6__["SubscriptionsPage"]]
        })
    ], SubscriptionsPageModule);
    return SubscriptionsPageModule;
}());



/***/ }),

/***/ "./src/app/admin/subscriptions/subscriptions.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/admin/subscriptions/subscriptions.page.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  padding-left: 50px;\n  padding-right: 50px;\n  padding-bottom: 30px;\n  background: white;\n  text-align: center;\n  width: 60vw;\n  margin: 0% auto;\n}\n\n.sub-settings-input {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  max-width: 40%;\n}\n\n.sub-settings-content {\n  font-size: 14px;\n  --padding-top: 25px;\n}\n\n.sub-settings-fields {\n  margin-bottom: 25px;\n}\n\n.sub-list-content {\n  --background: #F2F2F2;\n}\n\nion-list {\n  border-radius: 5px;\n}\n\n.ps-sub-by {\n  font-size: 13px;\n  opacity: 0.9;\n}\n\n.ps-sub-by span {\n  color: var(--ion-color-primary);\n  text-decoration: underline;\n  margin-left: 2px;\n  font-size: 14px;\n  font-weight: bold;\n}\n\n.ps-products-container {\n  margin: 10px 10px 10px 10px;\n  background: white;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 10px;\n  position: relative;\n}\n\n.ps-products-container ion-item {\n  --padding-start: 10px;\n}\n\n.ps-product-image {\n  background: transparent url('img-preloader.png') center no-repeat;\n  width: 85px;\n  height: 85px;\n  position: relative;\n  border: 1px solid #f0f0f0;\n}\n\n.ps-no-product-image {\n  background: url('img-preloader.png') center no-repeat;\n  background-size: contain;\n  width: 85px;\n  height: 85px;\n  position: relative;\n  border: 1px solid #e8e8e8;\n}\n\n.ps-more {\n  background: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(transparent));\n  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent);\n  bottom: 0;\n  height: 20px;\n  position: absolute;\n  width: 84px;\n  z-index: 2;\n  color: white;\n  font-size: 12px;\n  text-align: center;\n  padding: 5px;\n}\n\n.ps-product-name {\n  font-size: 14px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  text-transform: capitalize;\n  font-weight: bold;\n  cursor: pointer;\n}\n\n.ps-product-price {\n  color: var(--ion-color-primary);\n  font-size: 18px;\n}\n\n.ps-placed-on {\n  font-size: 11px;\n  text-align: center;\n  opacity: 0.6;\n}\n\n.ps-action-btn {\n  text-align: center;\n  margin-top: 10px;\n}\n\n.ps-action-btn span {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.ps-action-btn ion-icon {\n  margin-left: 5px;\n}\n\n.ps-action-btn .flaticon-refresh::before {\n  margin-left: 5px;\n}\n\n.ps-completed .flaticon-null-20::before {\n  color: var(--ion-color-success);\n  margin-left: 2px;\n}\n\n.flaticon-null-19::before {\n  color: var(--ion-color-danger);\n  margin-left: 2px;\n}\n\nion-button .flaticon-null-7::before {\n  font-size: 10px;\n  margin-left: 3px;\n}\n\n.ps-active-wrapper {\n  padding-left: 10px;\n  padding-top: 14px;\n  padding-right: 10px;\n}\n\n.ps-active-wrapper-txt {\n  font-size: 14px;\n}\n\n.ps-remove-btn {\n  text-align: center;\n}\n\n.ps-next-order {\n  border: 1px solid #e2e2e2;\n  border-radius: 5px;\n  padding: 5px;\n  font-size: 13px;\n  opacity: 0.9;\n  margin-top: 10px;\n}\n\n.ps-next-order-bold {\n  font-weight: bold;\n  font-size: 14px;\n}\n\n.content-alignment {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  text-align: center;\n}\n\n.page-footer {\n  text-align: center;\n}\n\n.delivery-dates {\n  margin-top: 10px;\n}\n\n.delivery-dates ion-text span {\n  font-size: 13px;\n}\n\n.delivery-dates ion-text .flaticon-down-arrow::before {\n  font-size: 11px;\n}\n\n.delivery-dates ion-text .flaticon-upload::before {\n  font-size: 11px;\n}\n\n.delivery-dates ul {\n  list-style: circle;\n  -webkit-padding-start: 20px;\n          padding-inline-start: 20px;\n  line-height: 1.8;\n}\n\n.delivery-dates ul li {\n  font-size: 11px;\n}\n\n.price-arrow {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.price-arrow .flaticon-null-12 {\n  font-size: 20px;\n  padding-top: 3px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vc3Vic2NyaXB0aW9ucy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXHN1YnNjcmlwdGlvbnNcXHN1YnNjcmlwdGlvbnMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9zdWJzY3JpcHRpb25zL3N1YnNjcmlwdGlvbnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FDQ0o7O0FERUE7RUFDSSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBQ0NKOztBREVBO0VBQ0ksZUFBQTtFQUNBLG1CQUFBO0FDQ0o7O0FERUE7RUFDSSxtQkFBQTtBQ0NKOztBREVBO0VBQ0kscUJBQUE7QUNDSjs7QURFQTtFQUNJLGtCQUFBO0FDQ0o7O0FERUE7RUFDSSxlQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREFJO0VBQ0ksK0JBQUE7RUFDQSwwQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FDRVI7O0FESUE7RUFDSSwyQkFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtBQ0RKOztBREVJO0VBQ0kscUJBQUE7QUNBUjs7QURJQTtFQUNJLGlFQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0FDREo7O0FESUE7RUFDSSxxREFBQTtFQUNBLHdCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0FDREo7O0FESUE7RUFDSSxzR0FBQTtFQUFBLGtFQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUNESjs7QURJQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMEJBQUE7RUFDQSxpQkFBQTtFQUNILGVBQUE7QUNERDs7QURJQTtFQUNJLCtCQUFBO0VBQ0EsZUFBQTtBQ0RKOztBRElBO0VBQ0ksZUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ0RKOztBRElBO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtBQ0RKOztBREVJO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBQ0FSOztBREVJO0VBQ0ksZ0JBQUE7QUNBUjs7QURHSTtFQUNJLGdCQUFBO0FDRFI7O0FET0k7RUFDSSwrQkFBQTtFQUNBLGdCQUFBO0FDSlI7O0FEU0E7RUFDSSw4QkFBQTtFQUNBLGdCQUFBO0FDTko7O0FEU0E7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7QUNOSjs7QURTQTtFQUNJLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtBQ05KOztBRE9JO0VBQ0ksZUFBQTtBQ0xSOztBRFNBO0VBQ0ksa0JBQUE7QUNOSjs7QURTQTtFQUNJLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ05KOztBRE9JO0VBQ0ksaUJBQUE7RUFDQSxlQUFBO0FDTFI7O0FEU0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0Esa0JBQUE7QUNOSjs7QURTQTtFQUNJLGtCQUFBO0FDTko7O0FEU0E7RUFDSSxnQkFBQTtBQ05KOztBRFFRO0VBQ0ksZUFBQTtBQ05aOztBRFFRO0VBQ0ksZUFBQTtBQ05aOztBRFFRO0VBQ0ksZUFBQTtBQ05aOztBRFNJO0VBQ0ksa0JBQUE7RUFDQSwyQkFBQTtVQUFBLDBCQUFBO0VBQ0EsZ0JBQUE7QUNQUjs7QURRUTtFQUNJLGVBQUE7QUNOWjs7QURVQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FDUEo7O0FEUUk7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FDTlIiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9zdWJzY3JpcHRpb25zL3N1YnNjcmlwdGlvbnMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW57XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDUwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiA1MHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDMwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHdpZHRoOiA2MHZ3O1xyXG4gICAgbWFyZ2luOiAwJSBhdXRvXHJcbn1cclxuXHJcbi5zdWItc2V0dGluZ3MtaW5wdXQge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIG1heC13aWR0aDogNDAlO1xyXG59XHJcblxyXG4uc3ViLXNldHRpbmdzLWNvbnRlbnQge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgLS1wYWRkaW5nLXRvcDogMjVweDtcclxufVxyXG5cclxuLnN1Yi1zZXR0aW5ncy1maWVsZHMge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjVweDtcclxufVxyXG5cclxuLnN1Yi1saXN0LWNvbnRlbnQge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAjRjJGMkYyO1xyXG59XHJcblxyXG5pb24tbGlzdCB7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5wcy1zdWItYnkge1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgb3BhY2l0eTogLjk7XHJcbiAgICBzcGFuIHtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAycHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbi5wcy1wcm9kdWN0cy1jb250YWluZXIge1xyXG4gICAgbWFyZ2luOiAxMHB4IDEwcHggMTBweCAxMHB4O1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGlvbi1pdGVtIHtcclxuICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IDEwcHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5wcy1wcm9kdWN0LWltYWdlIHtcclxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybCgnc3JjL2Fzc2V0cy9pbWcvaW1nLXByZWxvYWRlci5wbmcnKSBjZW50ZXIgbm8tcmVwZWF0O1xyXG4gICAgd2lkdGg6IDg1cHg7XHJcbiAgICBoZWlnaHQ6IDg1cHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZjBmMGYwO1xyXG59XHJcblxyXG4ucHMtbm8tcHJvZHVjdC1pbWFnZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB1cmwoJ3NyYy9hc3NldHMvaW1nL2ltZy1wcmVsb2FkZXIucG5nJykgY2VudGVyIG5vLXJlcGVhdDtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcclxuICAgIHdpZHRoOiA4NXB4O1xyXG4gICAgaGVpZ2h0OiA4NXB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2U4ZThlODtcclxufVxyXG5cclxuLnBzLW1vcmUge1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDBkZWcsIHJnYmEoMCwgMCwgMCwgLjUpLCB0cmFuc3BhcmVudCk7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB3aWR0aDogODRweDtcclxuICAgIHotaW5kZXg6IDI7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbn1cclxuXHJcbi5wcy1wcm9kdWN0LW5hbWUge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG5cdGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLnBzLXByb2R1Y3QtcHJpY2Uge1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxufVxyXG5cclxuLnBzLXBsYWNlZC1vbiB7XHJcbiAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBvcGFjaXR5OiAuNjtcclxufVxyXG5cclxuLnBzLWFjdGlvbi1idG4ge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIHNwYW4ge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIH1cclxuICAgIGlvbi1pY29uIHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5mbGF0aWNvbi1yZWZyZXNoOjpiZWZvcmUge1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4ucHMtY29tcGxldGVkIHtcclxuICAgIC5mbGF0aWNvbi1udWxsLTIwOjpiZWZvcmUge1xyXG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDJweDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi5mbGF0aWNvbi1udWxsLTE5OjpiZWZvcmUge1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDJweDtcclxufVxyXG5cclxuaW9uLWJ1dHRvbiAuZmxhdGljb24tbnVsbC03OjpiZWZvcmUge1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDNweDtcclxufVxyXG5cclxuLnBzLWFjdGl2ZS13cmFwcGVyIHtcclxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxuICAgIHBhZGRpbmctdG9wOiAxNHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMTBweDtcclxuICAgICYtdHh0IHtcclxuICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5wcy1yZW1vdmUtYnRuIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLnBzLW5leHQtb3JkZXIge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDIyNiwgMjI2LCAyMjYpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgb3BhY2l0eTogLjk7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgJi1ib2xkIHtcclxuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5jb250ZW50LWFsaWdubWVudHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXJcclxufVxyXG5cclxuLnBhZ2UtZm9vdGVye1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uZGVsaXZlcnktZGF0ZXMge1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIGlvbi10ZXh0IHtcclxuICAgICAgICBzcGFuIHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZmxhdGljb24tZG93bi1hcnJvdzo6YmVmb3JlIHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxMXB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZmxhdGljb24tdXBsb2FkOjpiZWZvcmUge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdWwge1xyXG4gICAgICAgIGxpc3Qtc3R5bGU6IGNpcmNsZTtcclxuICAgICAgICBwYWRkaW5nLWlubGluZS1zdGFydDogMjBweDtcclxuICAgICAgICBsaW5lLWhlaWdodDogMS44O1xyXG4gICAgICAgIGxpIHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxMXB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4ucHJpY2UtYXJyb3d7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIC5mbGF0aWNvbi1udWxsLTEye1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgICBwYWRkaW5nLXRvcDogM3B4O1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIH1cclxufSIsIi5tYWluIHtcbiAgcGFkZGluZy1sZWZ0OiA1MHB4O1xuICBwYWRkaW5nLXJpZ2h0OiA1MHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMzBweDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDYwdnc7XG4gIG1hcmdpbjogMCUgYXV0bztcbn1cblxuLnN1Yi1zZXR0aW5ncy1pbnB1dCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgbWF4LXdpZHRoOiA0MCU7XG59XG5cbi5zdWItc2V0dGluZ3MtY29udGVudCB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgLS1wYWRkaW5nLXRvcDogMjVweDtcbn1cblxuLnN1Yi1zZXR0aW5ncy1maWVsZHMge1xuICBtYXJnaW4tYm90dG9tOiAyNXB4O1xufVxuXG4uc3ViLWxpc3QtY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogI0YyRjJGMjtcbn1cblxuaW9uLWxpc3Qge1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5wcy1zdWItYnkge1xuICBmb250LXNpemU6IDEzcHg7XG4gIG9wYWNpdHk6IDAuOTtcbn1cbi5wcy1zdWItYnkgc3BhbiB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICBtYXJnaW4tbGVmdDogMnB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4ucHMtcHJvZHVjdHMtY29udGFpbmVyIHtcbiAgbWFyZ2luOiAxMHB4IDEwcHggMTBweCAxMHB4O1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4ucHMtcHJvZHVjdHMtY29udGFpbmVyIGlvbi1pdGVtIHtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxMHB4O1xufVxuXG4ucHMtcHJvZHVjdC1pbWFnZSB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcInNyYy9hc3NldHMvaW1nL2ltZy1wcmVsb2FkZXIucG5nXCIpIGNlbnRlciBuby1yZXBlYXQ7XG4gIHdpZHRoOiA4NXB4O1xuICBoZWlnaHQ6IDg1cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2YwZjBmMDtcbn1cblxuLnBzLW5vLXByb2R1Y3QtaW1hZ2Uge1xuICBiYWNrZ3JvdW5kOiB1cmwoXCJzcmMvYXNzZXRzL2ltZy9pbWctcHJlbG9hZGVyLnBuZ1wiKSBjZW50ZXIgbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gIHdpZHRoOiA4NXB4O1xuICBoZWlnaHQ6IDg1cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2U4ZThlODtcbn1cblxuLnBzLW1vcmUge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgcmdiYSgwLCAwLCAwLCAwLjUpLCB0cmFuc3BhcmVudCk7XG4gIGJvdHRvbTogMDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiA4NHB4O1xuICB6LWluZGV4OiAyO1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiA1cHg7XG59XG5cbi5wcy1wcm9kdWN0LW5hbWUge1xuICBmb250LXNpemU6IDE0cHg7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ucHMtcHJvZHVjdC1wcmljZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cblxuLnBzLXBsYWNlZC1vbiB7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBvcGFjaXR5OiAwLjY7XG59XG5cbi5wcy1hY3Rpb24tYnRuIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuLnBzLWFjdGlvbi1idG4gc3BhbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4ucHMtYWN0aW9uLWJ0biBpb24taWNvbiB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG4ucHMtYWN0aW9uLWJ0biAuZmxhdGljb24tcmVmcmVzaDo6YmVmb3JlIHtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cblxuLnBzLWNvbXBsZXRlZCAuZmxhdGljb24tbnVsbC0yMDo6YmVmb3JlIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbn1cblxuLmZsYXRpY29uLW51bGwtMTk6OmJlZm9yZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbn1cblxuaW9uLWJ1dHRvbiAuZmxhdGljb24tbnVsbC03OjpiZWZvcmUge1xuICBmb250LXNpemU6IDEwcHg7XG4gIG1hcmdpbi1sZWZ0OiAzcHg7XG59XG5cbi5wcy1hY3RpdmUtd3JhcHBlciB7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbiAgcGFkZGluZy10b3A6IDE0cHg7XG4gIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG59XG4ucHMtYWN0aXZlLXdyYXBwZXItdHh0IHtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4ucHMtcmVtb3ZlLWJ0biB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnBzLW5leHQtb3JkZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZTJlMmUyO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDVweDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBvcGFjaXR5OiAwLjk7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG4ucHMtbmV4dC1vcmRlci1ib2xkIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLmNvbnRlbnQtYWxpZ25tZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5wYWdlLWZvb3RlciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmRlbGl2ZXJ5LWRhdGVzIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbn1cbi5kZWxpdmVyeS1kYXRlcyBpb24tdGV4dCBzcGFuIHtcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuLmRlbGl2ZXJ5LWRhdGVzIGlvbi10ZXh0IC5mbGF0aWNvbi1kb3duLWFycm93OjpiZWZvcmUge1xuICBmb250LXNpemU6IDExcHg7XG59XG4uZGVsaXZlcnktZGF0ZXMgaW9uLXRleHQgLmZsYXRpY29uLXVwbG9hZDo6YmVmb3JlIHtcbiAgZm9udC1zaXplOiAxMXB4O1xufVxuLmRlbGl2ZXJ5LWRhdGVzIHVsIHtcbiAgbGlzdC1zdHlsZTogY2lyY2xlO1xuICBwYWRkaW5nLWlubGluZS1zdGFydDogMjBweDtcbiAgbGluZS1oZWlnaHQ6IDEuODtcbn1cbi5kZWxpdmVyeS1kYXRlcyB1bCBsaSB7XG4gIGZvbnQtc2l6ZTogMTFweDtcbn1cblxuLnByaWNlLWFycm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLnByaWNlLWFycm93IC5mbGF0aWNvbi1udWxsLTEyIHtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBwYWRkaW5nLXRvcDogM3B4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/subscriptions/subscriptions.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/admin/subscriptions/subscriptions.page.ts ***!
  \***********************************************************/
/*! exports provided: SubscriptionsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubscriptionsPage", function() { return SubscriptionsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var _subscription_calendar_subscription_calendar_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../subscription-calendar/subscription-calendar.page */ "./src/app/admin/subscription-calendar/subscription-calendar.page.ts");









var SubscriptionsPage = /** @class */ (function () {
    function SubscriptionsPage(labelService, events, loadingController, alertController, toastController, modalController, configService, sharedService, router) {
        this.labelService = labelService;
        this.events = events;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.toastController = toastController;
        this.modalController = modalController;
        this.configService = configService;
        this.sharedService = sharedService;
        this.router = router;
        this.headerText = '';
        this.isActive = false;
        this.isCashAllowed = false;
        this.dailyDeliveries = {
            min: null,
            max: null
        };
        this.weeklyDeliveries = {
            min: null,
            max: null
        };
        this.monthlyDeliveries = {
            min: null,
            max: null
        };
        this.subscriptions = [];
        this.showLoader = true;
        this.subscriptionFeature = false;
    }
    SubscriptionsPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert_1;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.subscriptionFeature = this.configService.environment.subscriptionFeature;
                        if (!(this.subscriptionFeature == false)) return [3 /*break*/, 3];
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
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SubscriptionsPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.SHARED_LABELS = this.labelService.labels['SHARED'];
                this.PRODUCT_SUBSCRIPTIONS_LABELS = this.labelService.labels['PRODUCT_SUBSCRIPTIONS'];
                this.headerText = this.PRODUCT_SUBSCRIPTIONS_LABELS['header_text'];
                this.initializeSubscriptions();
                this.events.publish('product-subscriptions:getSettings');
                this.events.publish('product-subscriptions:getSubscriptions');
                this.currencyCode = this.configService.environment.currencyCode;
                return [2 /*return*/];
            });
        });
    };
    SubscriptionsPage.prototype.ngAfterContentInit = function () {
    };
    SubscriptionsPage.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    SubscriptionsPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('product-subscriptions:publishSettings', function (data) {
            if (!_this.isEmptyObj(data)) {
                _this.isActive = typeof data.isActive !== 'undefined' ? data.isActive : false;
                _this.isCashAllowed = typeof data.isCashAllowed !== 'undefined' ? data.isCashAllowed : false;
                _this.dailyDeliveries = data.dailyDeliveries;
                _this.weeklyDeliveries = data.weeklyDeliveries;
                _this.monthlyDeliveries = data.monthlyDeliveries;
            }
        });
        this.events.subscribe('product-subscriptions:saveSettingsSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert(_this.PRODUCT_SUBSCRIPTIONS_LABELS['settings_has_been_saved_successfully']);
        });
        this.events.subscribe('product-subscriptions:publishSubscriptions', function (subscriptions) {
            _this.subscriptions = subscriptions;
            _this.showLoader = false;
        });
        this.events.subscribe('product-subscriptions:toggleActiveSuccess', function (index) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.subscriptions[index].active = !_this.subscriptions[index].active;
            _this.presentToast(_this.PRODUCT_SUBSCRIPTIONS_LABELS['status_changed_msg']);
        });
        this.events.subscribe('product-subscriptions:removeSubSuccess', function (index) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.subscriptions.splice(index, 1);
            _this.presentAlert(_this.PRODUCT_SUBSCRIPTIONS_LABELS['sub_removed_success']);
        });
    };
    SubscriptionsPage.prototype.isEmptyObj = function (object) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    };
    SubscriptionsPage.prototype.messageUser = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var navigationExtras;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                navigationExtras = {
                    state: {
                        userId: id
                    }
                };
                this.router.navigate(['admin-chat'], navigationExtras);
                return [2 /*return*/];
            });
        });
    };
    SubscriptionsPage.prototype.activeToggle = function () {
        this.isActive = !this.isActive;
    };
    SubscriptionsPage.prototype.cashAllowedToggle = function () {
        this.isCashAllowed = !this.isCashAllowed;
    };
    SubscriptionsPage.prototype.saveSettings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var data;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.isNoData(this.dailyDeliveries) || this.isNoData(this.weeklyDeliveries) || this.isNoData(this.monthlyDeliveries))) return [3 /*break*/, 1];
                        this.presentAlert(this.PRODUCT_SUBSCRIPTIONS_LABELS['please_fill_all_the_details']);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.presentLoading(this.SHARED_LABELS['please_wait'], 5000)];
                    case 2:
                        _a.sent();
                        data = {
                            isActive: this.isActive,
                            isCashAllowed: this.isCashAllowed,
                            dailyDeliveries: this.dailyDeliveries,
                            weeklyDeliveries: this.weeklyDeliveries,
                            monthlyDeliveries: this.monthlyDeliveries
                        };
                        this.events.publish('product-subscriptions:saveSettings', data);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SubscriptionsPage.prototype.isNoData = function (obj) {
        if (!obj.min || !obj.max) {
            return true;
        }
    };
    SubscriptionsPage.prototype.toggleActive = function (i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading(this.SHARED_LABELS['please_wait'], 5000)];
                    case 1:
                        _a.sent();
                        this.events.publish('product-subscriptions:toggleActive', this.subscriptions[i].id, !this.subscriptions[i].active, i);
                        return [2 /*return*/];
                }
            });
        });
    };
    SubscriptionsPage.prototype.removeSub = function (i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading(this.SHARED_LABELS['please_wait'], 5000)];
                    case 1:
                        _a.sent();
                        this.events.publish('product-subscriptions:removeSub', this.subscriptions[i].id, i);
                        return [2 /*return*/];
                }
            });
        });
    };
    SubscriptionsPage.prototype.getNextDate = function (subData) {
        var futureDates = [];
        var today = moment__WEBPACK_IMPORTED_MODULE_4__().format('YYYY-MM-DD');
        subData.ordersAt.forEach(function (date) {
            var diff = moment__WEBPACK_IMPORTED_MODULE_4__(date).diff(moment__WEBPACK_IMPORTED_MODULE_4__(today), 'days');
            if (diff > 0) {
                futureDates.push(date);
            }
        });
        var nextDeliverableDate;
        if (subData.leaveDates && subData.notDeliveredDates) {
            // Returns the first date that is not added as a leave by the user or added as not delivered already for the future by the admin.
            nextDeliverableDate = futureDates.find(function (date) {
                return !subData.leaveDates.includes(date) && !subData.notDeliveredDates.includes(date);
            });
        }
        else if (subData.leaveDates && !subData.notDeliveredDates) {
            nextDeliverableDate = futureDates.find(function (date) {
                return !subData.leaveDates.includes(date);
            });
        }
        else if (!subData.leaveDates && subData.notDeliveredDates) {
            nextDeliverableDate = futureDates.find(function (date) {
                return !subData.notDeliveredDates.includes(date);
            });
        }
        else {
            nextDeliverableDate = futureDates[0];
        }
        if (nextDeliverableDate) {
            return nextDeliverableDate;
        }
        else {
            return 'Completed';
        }
    };
    SubscriptionsPage.prototype.hasSubscriptionCompleted = function (sub) {
        var nextDeliverableDate = this.getNextDate(sub);
        if (nextDeliverableDate === 'Completed') {
            return true;
        }
        else {
            return false;
        }
    };
    SubscriptionsPage.prototype.removeSubConfirm = function (i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: this.PRODUCT_SUBSCRIPTIONS_LABELS['remove_sub_alert_msg'],
                            buttons: [
                                {
                                    text: this.SHARED_LABELS['cancel'],
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: this.PRODUCT_SUBSCRIPTIONS_LABELS['remove'],
                                    handler: function () {
                                        _this.removeSub(i);
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
    SubscriptionsPage.prototype.presentLoading = function (msg, duration) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: msg,
                                duration: duration
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
    SubscriptionsPage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: ['ok']
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
    SubscriptionsPage.prototype.presentToast = function (msg) {
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
    SubscriptionsPage.prototype.openSubscriptionCalendar = function (sub) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var calendarOptions, orderDateSpan, subscriptionCalendar;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        calendarOptions = {
                            from: new Date(sub.ordersAt[0]),
                            to: new Date(sub.ordersAt[sub.ordersAt.length - 1]),
                            disableWeeks: [0, 1, 2, 3, 4, 5, 6]
                        };
                        orderDateSpan = this.sharedService.getDatesBetween(calendarOptions.from, calendarOptions.to);
                        calendarOptions.daysConfig = this.getDaysConfig(orderDateSpan, sub);
                        return [4 /*yield*/, this.modalController.create({
                                component: _subscription_calendar_subscription_calendar_page__WEBPACK_IMPORTED_MODULE_8__["SubscriptionCalendarPage"],
                                componentProps: {
                                    options: calendarOptions
                                }
                            })];
                    case 1:
                        subscriptionCalendar = _a.sent();
                        return [4 /*yield*/, subscriptionCalendar.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SubscriptionsPage.prototype.getDaysConfig = function (orderDateSpan, sub) {
        var ordersAt = sub.ordersAt;
        var orderLeaves = sub.leaveDates ? sub.leaveDates : [];
        var notDeliveredDates = sub.notDeliveredDates ? sub.notDeliveredDates : [];
        var deliveredDates = sub.deliveredDates ? sub.deliveredDates : [];
        var daysConfig = [];
        for (var _i = 0, orderDateSpan_1 = orderDateSpan; _i < orderDateSpan_1.length; _i++) {
            var dateString = orderDateSpan_1[_i];
            var date = new Date(dateString);
            dateString = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + (date.getDate()).toString().padStart(2, '0');
            var dateConfig = {
                date: date
            };
            if (ordersAt.includes(dateString)) {
                dateConfig.cssClass = 'delivery-dates';
            }
            if (orderLeaves.includes(dateString)) {
                dateConfig.cssClass = 'leave-dates';
            }
            else if (notDeliveredDates.includes(dateString)) {
                dateConfig.cssClass = 'not-delivered-dates';
            }
            else if (deliveredDates.includes(dateString)) {
                dateConfig.title = '\u2713';
                dateConfig.cssClass = 'delivered-dates';
                dateConfig.marked = true;
            }
            daysConfig.push(dateConfig);
        }
        return daysConfig;
    };
    SubscriptionsPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('product-subscriptions:publishSettings');
        this.events.unsubscribe('product-subscriptions:saveSettingsSuccess');
        this.events.unsubscribe('product-subscriptions:toggleActiveSuccess');
        this.events.unsubscribe('product-subscriptions:removeSubSuccess');
    };
    SubscriptionsPage.ctorParameters = function () { return [
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__["LabelService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__["ConfigService"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }
    ]; };
    SubscriptionsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-subscriptions',
            template: __webpack_require__(/*! raw-loader!./subscriptions.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/subscriptions/subscriptions.page.html"),
            styles: [__webpack_require__(/*! ./subscriptions.page.scss */ "./src/app/admin/subscriptions/subscriptions.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__["LabelService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__["ConfigService"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
    ], SubscriptionsPage);
    return SubscriptionsPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-subscriptions-subscriptions-module-es5.js.map