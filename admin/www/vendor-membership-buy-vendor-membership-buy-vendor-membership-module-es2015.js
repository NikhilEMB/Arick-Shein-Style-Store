(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor-membership-buy-vendor-membership-buy-vendor-membership-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/vendor-membership/buy-vendor-membership/buy-vendor-membership.page.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/vendor-membership/buy-vendor-membership/buy-vendor-membership.page.html ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ng-container *ngIf=\"userMembership?.active\">\r\n      <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n        <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n      </ion-menu-button>\r\n    </ng-container>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Membership</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n\r\n    <!-- Vendor Membership -->\r\n    <ng-container *ngIf=\"userMembership && userMembership.active; else notMember;\">\r\n      <div class=\"userMembership\">\r\n        <h3>Your Membership</h3>\r\n        <p><strong>Purchased Plan: </strong>{{userMembership.name}}</p>\r\n        <p>\r\n          <strong>Plan Duration : </strong>\r\n          {{userMembership.months}} plan\r\n        </p>\r\n        <ng-container *ngIf=\"userMembership?.validTill\">\r\n          <p><strong>Total Days Left : </strong>{{totalDaysLeft()}} Days</p>\r\n          <p><strong>Valid Till : </strong>{{userMembership.validTill | date: 'dd/MM/yyyy'}}</p>\r\n        </ng-container>\r\n      </div>\r\n    </ng-container>\r\n\r\n    <!-- No Membership Active -->\r\n    <ng-template #notMember>\r\n      <ng-container *ngIf=\"!membershipSettings.active; else showPlans;\">\r\n        <div class=\"noData\">\r\n          <img src=\"assets/img/no-product.png\">\r\n          <h6>No Plans Available</h6>\r\n        </div>\r\n      </ng-container>\r\n\r\n      <!-- Membership Settings & Plans -->\r\n      <ng-template #showPlans>\r\n        <h2>{{membershipSettings.name}}</h2>\r\n\r\n        <ng-container *ngIf=\"membershipSettings.description\">\r\n          <p [innerHtml]=\"membershipSettings.description\"></p>\r\n        </ng-container>\r\n\r\n        <!-- <p><strong>Membership Name:</strong> {{membershipSettings.name}}</p>\r\n\r\n        <ng-container *ngIf=\"membershipSettings.description\">\r\n          <p class=\"m-t-16\"><strong>Membership Description:</strong></p>\r\n          <div [innerHtml]=\"membershipSettings.description\"></div>\r\n        </ng-container> -->\r\n\r\n        <div class=\"plans-wrapper\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ng-container *ngFor=\"let plan of membershipSettings.plans; index as i\">\r\n                <ion-col size=\"12\" size-md=\"4\">\r\n                  <div class=\"plan-wrapper\">\r\n                    <ion-card class=\"membership-card\">\r\n                      <ion-card-header>\r\n                        <ion-card-title>{{getMonths(plan.months)}}</ion-card-title>\r\n                      </ion-card-header>\r\n                      <ion-card-content>\r\n                        <ion-label class=\"price\">\r\n                          {{plan.discountedPrice | currency: currencyCode: true: '.2-2'}}\r\n                          <del class=\"price\" *ngIf=\"plan.discountedPrice < plan.price\">\r\n                            {{plan.price | currency:currencyCode: true: '.2-2'}}\r\n                          </del>\r\n                        </ion-label>\r\n                        <br>\r\n                        <ion-label class=\"discount\">\r\n                          Save {{getDiscount(plan.price,plan.discountedPrice)}}%\r\n                        </ion-label>\r\n                      </ion-card-content>\r\n                      <ion-button class=\"btn-1\" (click)=\"buyPlan(i)\" expand=\"full\" color=\"success\">\r\n                        Buy Plan\r\n                      </ion-button>\r\n                    </ion-card>\r\n                  </div>\r\n                </ion-col>\r\n              </ng-container>\r\n            </ion-row>\r\n          </ion-grid>\r\n\r\n        </div>\r\n      </ng-template>\r\n    </ng-template>\r\n\r\n  </div>\r\n\r\n</ion-content>"

/***/ }),

/***/ "./src/app/vendor-membership/buy-vendor-membership/buy-vendor-membership.module.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/vendor-membership/buy-vendor-membership/buy-vendor-membership.module.ts ***!
  \*****************************************************************************************/
/*! exports provided: BuyVendorMembershipPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuyVendorMembershipPageModule", function() { return BuyVendorMembershipPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _buy_vendor_membership_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./buy-vendor-membership.page */ "./src/app/vendor-membership/buy-vendor-membership/buy-vendor-membership.page.ts");







const routes = [
    {
        path: '',
        component: _buy_vendor_membership_page__WEBPACK_IMPORTED_MODULE_6__["BuyVendorMembershipPage"]
    }
];
let BuyVendorMembershipPageModule = class BuyVendorMembershipPageModule {
};
BuyVendorMembershipPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_buy_vendor_membership_page__WEBPACK_IMPORTED_MODULE_6__["BuyVendorMembershipPage"]]
    })
], BuyVendorMembershipPageModule);



/***/ }),

/***/ "./src/app/vendor-membership/buy-vendor-membership/buy-vendor-membership.page.scss":
/*!*****************************************************************************************!*\
  !*** ./src/app/vendor-membership/buy-vendor-membership/buy-vendor-membership.page.scss ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-content {\n  --background: #fff;\n}\n\n.main-container {\n  border: none;\n}\n\n.plans-wrapper {\n  margin-top: 32px;\n}\n\n.plans-wrapper .plan-wrapper .membership-card {\n  margin-bottom: 16px;\n  text-align: center;\n  border-radius: 16px;\n  box-shadow: 0 2px 5px #ccc;\n}\n\n.plans-wrapper .plan-wrapper .membership-card:hover {\n  box-shadow: 0 2px 10px #ccc;\n}\n\n.plans-wrapper .plan-wrapper .membership-card ion-card-header {\n  background: #ecf2ff;\n}\n\n.plans-wrapper .plan-wrapper .membership-card ion-card-header ion-card-title {\n  color: #000;\n  font-size: 18px;\n  font-weight: 500;\n  text-transform: capitalize;\n}\n\n.plans-wrapper .plan-wrapper .membership-card ion-card-content {\n  padding: 64px 0;\n  background: #f6f9ff;\n}\n\n.plans-wrapper .plan-wrapper .membership-card ion-card-content .price {\n  color: #000;\n  font-size: 26px;\n  font-weight: 500;\n}\n\n.plans-wrapper .plan-wrapper .membership-card ion-card-content .price del {\n  color: #aaa;\n  font-size: 18px;\n  margin-left: 6px;\n  font-weight: 300;\n}\n\n.plans-wrapper .plan-wrapper .membership-card ion-card-content .discount {\n  color: #f36523;\n  font-size: 18px;\n  margin-left: 0;\n  font-weight: 500;\n}\n\n.plans-wrapper .plan-wrapper .membership-card ion-button {\n  --background: var(--ion-color-medium);\n  --color: #000;\n}\n\n.plans-wrapper .plan-wrapper .membership-card ion-button:hover {\n  --background: #006015;\n}\n\n.noData {\n  text-align: center;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n\n.noData img {\n  width: 130px;\n}\n\n@media (max-width: 786px) {\n  .plans-wrapper {\n    flex-wrap: wrap;\n  }\n  .plans-wrapper .plan-wrapper {\n    min-width: 50%;\n  }\n}\n\n.userMembership {\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmVuZG9yLW1lbWJlcnNoaXAvYnV5LXZlbmRvci1tZW1iZXJzaGlwL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFx2ZW5kb3ItbWVtYmVyc2hpcFxcYnV5LXZlbmRvci1tZW1iZXJzaGlwXFxidXktdmVuZG9yLW1lbWJlcnNoaXAucGFnZS5zY3NzIiwic3JjL2FwcC92ZW5kb3ItbWVtYmVyc2hpcC9idXktdmVuZG9yLW1lbWJlcnNoaXAvYnV5LXZlbmRvci1tZW1iZXJzaGlwLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0FDQ0Y7O0FERUE7RUFFRSxZQUFBO0FDQUY7O0FER0E7RUFFRSxnQkFBQTtBQ0RGOztBRElJO0VBQ0UsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMEJBQUE7QUNGTjs7QURHTTtFQUNFLDJCQUFBO0FDRFI7O0FER007RUFDRSxtQkFBQTtBQ0RSOztBREVRO0VBQ0UsV0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDBCQUFBO0FDQVY7O0FER007RUFDRSxlQUFBO0VBQ0EsbUJBQUE7QUNEUjs7QURFUTtFQUNFLFdBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUNBVjs7QURDVTtFQUNFLFdBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQ0NaOztBREVRO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7QUNBVjs7QURJTTtFQUNFLHFDQUFBO0VBQ0EsYUFBQTtBQ0ZSOztBRElRO0VBQ0UscUJBQUE7QUNGVjs7QURpQkE7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSx3Q0FBQTtVQUFBLGdDQUFBO0FDZEY7O0FEZUU7RUFDRSxZQUFBO0FDYko7O0FEaUJBO0VBQ0U7SUFDRSxlQUFBO0VDZEY7RURlRTtJQUVFLGNBQUE7RUNkSjtBQUNGOztBRGlCQTtFQUNFLGtCQUFBO0FDZkYiLCJmaWxlIjoic3JjL2FwcC92ZW5kb3ItbWVtYmVyc2hpcC9idXktdmVuZG9yLW1lbWJlcnNoaXAvYnV5LXZlbmRvci1tZW1iZXJzaGlwLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jb250ZW50IHtcclxuICAtLWJhY2tncm91bmQ6ICNmZmY7XHJcbn1cclxuXHJcbi5tYWluLWNvbnRhaW5lciB7XHJcbiAgLy8gd2lkdGg6IDEwMCU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG59XHJcblxyXG4ucGxhbnMtd3JhcHBlciB7XHJcbiAgLy8gZGlzcGxheTogZmxleDtcclxuICBtYXJnaW4tdG9wOiAzMnB4O1xyXG4gIC5wbGFuLXdyYXBwZXIge1xyXG4gICAgLy8gd2lkdGg6IDMzLjMzJTtcclxuICAgIC5tZW1iZXJzaGlwLWNhcmQge1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XHJcbiAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDVweCAjY2NjO1xyXG4gICAgICAmOmhvdmVyIHtcclxuICAgICAgICBib3gtc2hhZG93OiAwIDJweCAxMHB4ICNjY2M7XHJcbiAgICAgIH1cclxuICAgICAgaW9uLWNhcmQtaGVhZGVyIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjZWNmMmZmO1xyXG4gICAgICAgIGlvbi1jYXJkLXRpdGxlIHtcclxuICAgICAgICAgIGNvbG9yOiAjMDAwO1xyXG4gICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpb24tY2FyZC1jb250ZW50IHtcclxuICAgICAgICBwYWRkaW5nOiA2NHB4IDA7XHJcbiAgICAgICAgYmFja2dyb3VuZDogI2Y2ZjlmZjtcclxuICAgICAgICAucHJpY2Uge1xyXG4gICAgICAgICAgY29sb3I6ICMwMDA7XHJcbiAgICAgICAgICBmb250LXNpemU6IDI2cHg7XHJcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgICAgICAgZGVsIHtcclxuICAgICAgICAgICAgY29sb3I6ICNhYWE7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDZweDtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLmRpc2NvdW50IHtcclxuICAgICAgICAgIGNvbG9yOiAjZjM2NTIzO1xyXG4gICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XHJcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaW9uLWJ1dHRvbiB7XHJcbiAgICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICAgICAgICAtLWNvbG9yOiAjMDAwO1xyXG5cclxuICAgICAgICAmOmhvdmVyIHtcclxuICAgICAgICAgIC0tYmFja2dyb3VuZDogIzAwNjAxNTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vICYuc2VsZWN0ZWQtcGxhbiB7XHJcbiAgICAvLyAgIC5tZW1iZXJzaGlwLWNhcmQge1xyXG4gICAgLy8gICAgIGJvcmRlcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpIDFweCBzb2xpZDtcclxuICAgIC8vICAgICBpb24tYnV0dG9uIHtcclxuICAgIC8vICAgICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgfVxyXG4gICAgLy8gfVxyXG4gIH1cclxufVxyXG5cclxuLm5vRGF0YSB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDUwJTtcclxuICBsZWZ0OiA1MCU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgaW1nIHtcclxuICAgIHdpZHRoOiAxMzBweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3ODZweCkge1xyXG4gIC5wbGFucy13cmFwcGVyIHtcclxuICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgIC5wbGFuLXdyYXBwZXIge1xyXG4gICAgICAvLyB3aWR0aDogNTAlO1xyXG4gICAgICBtaW4td2lkdGg6IDUwJTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuLnVzZXJNZW1iZXJzaGlwe1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4iLCJpb24tY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogI2ZmZjtcbn1cblxuLm1haW4tY29udGFpbmVyIHtcbiAgYm9yZGVyOiBub25lO1xufVxuXG4ucGxhbnMtd3JhcHBlciB7XG4gIG1hcmdpbi10b3A6IDMycHg7XG59XG4ucGxhbnMtd3JhcHBlciAucGxhbi13cmFwcGVyIC5tZW1iZXJzaGlwLWNhcmQge1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDVweCAjY2NjO1xufVxuLnBsYW5zLXdyYXBwZXIgLnBsYW4td3JhcHBlciAubWVtYmVyc2hpcC1jYXJkOmhvdmVyIHtcbiAgYm94LXNoYWRvdzogMCAycHggMTBweCAjY2NjO1xufVxuLnBsYW5zLXdyYXBwZXIgLnBsYW4td3JhcHBlciAubWVtYmVyc2hpcC1jYXJkIGlvbi1jYXJkLWhlYWRlciB7XG4gIGJhY2tncm91bmQ6ICNlY2YyZmY7XG59XG4ucGxhbnMtd3JhcHBlciAucGxhbi13cmFwcGVyIC5tZW1iZXJzaGlwLWNhcmQgaW9uLWNhcmQtaGVhZGVyIGlvbi1jYXJkLXRpdGxlIHtcbiAgY29sb3I6ICMwMDA7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG4ucGxhbnMtd3JhcHBlciAucGxhbi13cmFwcGVyIC5tZW1iZXJzaGlwLWNhcmQgaW9uLWNhcmQtY29udGVudCB7XG4gIHBhZGRpbmc6IDY0cHggMDtcbiAgYmFja2dyb3VuZDogI2Y2ZjlmZjtcbn1cbi5wbGFucy13cmFwcGVyIC5wbGFuLXdyYXBwZXIgLm1lbWJlcnNoaXAtY2FyZCBpb24tY2FyZC1jb250ZW50IC5wcmljZSB7XG4gIGNvbG9yOiAjMDAwO1xuICBmb250LXNpemU6IDI2cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG4ucGxhbnMtd3JhcHBlciAucGxhbi13cmFwcGVyIC5tZW1iZXJzaGlwLWNhcmQgaW9uLWNhcmQtY29udGVudCAucHJpY2UgZGVsIHtcbiAgY29sb3I6ICNhYWE7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgbWFyZ2luLWxlZnQ6IDZweDtcbiAgZm9udC13ZWlnaHQ6IDMwMDtcbn1cbi5wbGFucy13cmFwcGVyIC5wbGFuLXdyYXBwZXIgLm1lbWJlcnNoaXAtY2FyZCBpb24tY2FyZC1jb250ZW50IC5kaXNjb3VudCB7XG4gIGNvbG9yOiAjZjM2NTIzO1xuICBmb250LXNpemU6IDE4cHg7XG4gIG1hcmdpbi1sZWZ0OiAwO1xuICBmb250LXdlaWdodDogNTAwO1xufVxuLnBsYW5zLXdyYXBwZXIgLnBsYW4td3JhcHBlciAubWVtYmVyc2hpcC1jYXJkIGlvbi1idXR0b24ge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAtLWNvbG9yOiAjMDAwO1xufVxuLnBsYW5zLXdyYXBwZXIgLnBsYW4td3JhcHBlciAubWVtYmVyc2hpcC1jYXJkIGlvbi1idXR0b246aG92ZXIge1xuICAtLWJhY2tncm91bmQ6ICMwMDYwMTU7XG59XG5cbi5ub0RhdGEge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG59XG4ubm9EYXRhIGltZyB7XG4gIHdpZHRoOiAxMzBweDtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDc4NnB4KSB7XG4gIC5wbGFucy13cmFwcGVyIHtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gIH1cbiAgLnBsYW5zLXdyYXBwZXIgLnBsYW4td3JhcHBlciB7XG4gICAgbWluLXdpZHRoOiA1MCU7XG4gIH1cbn1cbi51c2VyTWVtYmVyc2hpcCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/vendor-membership/buy-vendor-membership/buy-vendor-membership.page.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/vendor-membership/buy-vendor-membership/buy-vendor-membership.page.ts ***!
  \***************************************************************************************/
/*! exports provided: BuyVendorMembershipPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuyVendorMembershipPage", function() { return BuyVendorMembershipPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");








let BuyVendorMembershipPage = class BuyVendorMembershipPage {
    constructor(configService, alertController, sharedService, vendorService, storage) {
        this.configService = configService;
        this.alertController = alertController;
        this.sharedService = sharedService;
        this.vendorService = vendorService;
        this.storage = storage;
        this.membershipSettings = {
            active: false,
            name: "",
            description: "",
            plans: [],
        };
    }
    ngOnInit() {
        this.currencyCode = this.configService.environment.currencyCode;
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            this.userId = yield this.storage.get('uid');
            const vendor = yield this.vendorService.getVendorData(this.userId, 'details');
            console.log("vendorData", vendor);
            this.userMembership = "membership" in vendor ? vendor.membership : undefined;
            const response = yield this.vendorService.getVendorMembership();
            yield this.sharedService.loading.dismiss();
            if (response) {
                this.membershipSettings = response;
            }
            else {
                yield this.sharedService.presentAlert('Something went wrong ! please try again.');
            }
        });
    }
    getMonths(months) {
        return months === 1 ? '1 Month' : `${months} Months`;
    }
    getDiscount(price, disPrice) {
        return parseInt((((price - disPrice) / price) * 100).toFixed(0));
    }
    totalDaysLeft() {
        const today = moment__WEBPACK_IMPORTED_MODULE_3__().format('YYYY-MM-DD');
        return moment__WEBPACK_IMPORTED_MODULE_3__(this.userMembership.validTill).diff(moment__WEBPACK_IMPORTED_MODULE_3__(today), 'days');
    }
    buyPlan(index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log("this.userId = ", this.userId);
            yield this.sharedService.presentLoading();
            const selectedPlan = this.membershipSettings.plans[index];
            const settings = Object.assign({}, this.membershipSettings);
            delete settings.plans;
            delete settings.active;
            settings["plan"] = selectedPlan;
            let orderObject = {
                status: true,
                orderType: "vendorMembership",
                quantity: 1,
                name: this.membershipSettings.name,
                membershipSettings: settings,
                description: this.getMonths(selectedPlan.months),
                img: {
                    url: "assets/img/shop-logo-color.png",
                    mob: "assets/img/shop-logo-color.png",
                    thumb: "assets/img/shop-logo-color.png"
                },
                commentMsg: '',
                commentImgs: [],
            };
            let membership = {
                active: true,
                name: this.membershipSettings.name,
                months: this.getMonths(selectedPlan.months),
                membershipSettings: settings,
            };
            if (selectedPlan.discountedPrice < selectedPlan.price) {
                orderObject['mrpPrice'] = selectedPlan.price;
                orderObject['price'] = selectedPlan.discountedPrice;
                membership['mrpPrice'] = selectedPlan.price;
                membership['price'] = selectedPlan.discountedPrice;
            }
            else {
                orderObject['price'] = selectedPlan.price;
                membership['price'] = selectedPlan.price;
            }
            const response = yield this.vendorService.updateVendorInfo(this.userId, { membership: membership });
            yield this.sharedService.loading.dismiss();
            if (response) {
                yield this.sharedService.presentAlert('Membership Purchased Successfully');
            }
            else {
                yield this.sharedService.presentAlert("Membership Purchase Failed");
            }
        });
    }
};
BuyVendorMembershipPage.ctorParameters = () => [
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"] },
    { type: src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_6__["VendorService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"] }
];
BuyVendorMembershipPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-buy-vendor-membership',
        template: __webpack_require__(/*! raw-loader!./buy-vendor-membership.page.html */ "./node_modules/raw-loader/index.js!./src/app/vendor-membership/buy-vendor-membership/buy-vendor-membership.page.html"),
        styles: [__webpack_require__(/*! ./buy-vendor-membership.page.scss */ "./src/app/vendor-membership/buy-vendor-membership/buy-vendor-membership.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"],
        src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_6__["VendorService"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"]])
], BuyVendorMembershipPage);



/***/ })

}]);
//# sourceMappingURL=vendor-membership-buy-vendor-membership-buy-vendor-membership-module-es2015.js.map