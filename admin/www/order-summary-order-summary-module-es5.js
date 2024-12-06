(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["order-summary-order-summary-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/order-summary/order-summary.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/order-summary/order-summary.page.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"user-cart\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center>Order Summary</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content *ngIf=\"showLoader; else contentLoaded\">\r\n  <div class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n</ion-content>\r\n\r\n<ng-template #contentLoaded>\r\n  <ion-content *ngIf=\"products.length && address\">\r\n\r\n    <div class=\"address-card\">\r\n      <p class=\"user-name\">{{address.name}}</p>\r\n      <p class=\"address\">{{address.address}}</p>\r\n      <p class=\"phone-no\">{{address.phoneNo}}</p>\r\n      <div class=\"change-address-btn\">\r\n        <ion-button (click)=\"onClickChangeOrAddAddress()\" expand=\"block\">\r\n          Change Or Add Address\r\n        </ion-button>\r\n      </div>\r\n    </div>\r\n    <div class=\"products-container\" *ngFor=\"let product of products; let i=index\">\r\n      <ion-list class=\"ion-no-padding\" lines=\"none\">\r\n        <ion-item class=\"ion-no-padding\">\r\n          <div slot=\"start\"\r\n            [ngStyle]=\"{'background': 'url(' + product.img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n            class=\"product-image\"></div>\r\n          <ion-label>\r\n            <h2 class=\"product-price ion-text-wrap\">{{product.price * product.quantity | currency: 'INR':true}}</h2>\r\n            <h3 class=\"product-name ion-text-wrap\">{{product.name}}</h3>\r\n            <h6 class=\"product-description\">{{product.description}}</h6>\r\n            <ion-grid>\r\n              <ion-row>\r\n                <h3 class=\"product-quantity\">QTY: {{product.quantity}}</h3>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </ion-label>\r\n        </ion-item>\r\n        <div class=\"comment-box\" *ngIf=\"showCommentBoxAndImage\">\r\n          <ion-textarea row=\"2\" [placeholder]=\"placeholderMsgInCommentBox\" [(ngModel)]=\"product.commentMsg\" autocapitalize>\r\n          </ion-textarea>\r\n        </div>\r\n        <!-- <div *ngIf=\"showCommentBoxAndImage\">\r\n          <ion-grid class=\"ion-no-padding\">\r\n            <ion-row class=\"ion-justify-content-start\">\r\n              <ion-button (click)=\"imageActionSheet(i)\" expand=\"block\" fill=\"clear\">\r\n                Attach Images\r\n              </ion-button>\r\n            </ion-row>\r\n            <ion-row class=\"ion-justify-content-start\" style=\"margin-left: 3%;\">\r\n              <ion-col size=\"2\" class=\"comment-img-conatiner\"\r\n                *ngFor=\"let img of product.commentImgs; let imgIndex = index\">\r\n                <div\r\n                  [ngStyle]=\"{'background': 'url(' + img.imgData + ') no-repeat center', 'background-size': 'contain'}\"\r\n                  class=\"comment-img\"></div>\r\n                <div class=\"remove-btn\" (click)=\"removeCommentImage(i, imgIndex, img.imgData)\">\r\n                  <i class=\"flaticon-null-17\"></i>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div> -->\r\n      </ion-list>\r\n    </div>\r\n\r\n    <div class=\"delivery-schedule-section\"\r\n      *ngIf=\"isDeliverySchedule && scheduledDates.length > 0\">\r\n      <p class=\"price-details\">Delivery Schedule</p>\r\n      <hr class=\"line\">\r\n      <ion-list lines=\"none\" class=\"ion-no-padding\">\r\n        <ion-item class=\"delivery-date-time\">\r\n          <ion-label>Delivery on:</ion-label>\r\n          <ion-select interface=\"popover\" (ionChange)=\"selectDate($event)\">\r\n            <ion-select-option [value]=\"date\" *ngFor=\"let date of scheduledDates\">{{date | date}}</ion-select-option>\r\n          </ion-select>\r\n        </ion-item>\r\n\r\n        <ion-item class=\"delivery-date-time\">\r\n          <ion-label>Time:</ion-label>\r\n          <ion-select interface=\"popover\" (ionChange)=\"selectTime($event)\" [disabled]=\"!this.selectedDate\">\r\n            <ion-select-option [value]=\"time\" *ngFor=\"let time of timeSchedules\" [disabled]=\"disableTime(time)\">{{time.start}} - {{time.end}}</ion-select-option>\r\n          </ion-select>\r\n        </ion-item>\r\n      </ion-list>\r\n    </div>\r\n\r\n    <div class=\"coupon-code-section\">\r\n      <div class=\"inline-alignment\">\r\n        <div class=\"coupon-code-input\">\r\n          <ion-input type=\"text\" placeholder=\"Enter coupon code\" [(ngModel)]=\"couponCode\" [readonly]=\"couponApplied\" (ionChange)=\"textUppercase(couponCode)\">\r\n          </ion-input>\r\n        </div>\r\n        <div>\r\n          <ion-button (click)=\"applyCouponCode()\" expand=\"block\" shape=\"round\" size=\"small\" [disabled]=\"couponCode === ''\"\r\n            *ngIf=\"!couponApplied\">\r\n            Apply\r\n          </ion-button>\r\n          <ion-button (click)=\"removeCouponCode()\" color=\"dark\" expand=\"block\" shape=\"round\" size=\"small\"\r\n            *ngIf=\"couponApplied\">\r\n            Remove\r\n          </ion-button>\r\n        </div>\r\n      </div>\r\n      <div class=\"code-applied\" *ngIf=\"couponApplied\">\r\n        Coupon Applied!\r\n      </div>\r\n    </div>\r\n    <div class=\"price-card\">\r\n      <p class=\"price-details\">Price Details</p>\r\n      <hr class=\"line\">\r\n      <ion-grid class=\"ion-no-padding\">\r\n        <ion-row class=\"ion-justify-content-between ion-no-padding ion-align-items-center\">\r\n          <ion-col class=\"ion-no-padding\">\r\n            <p class=\"total-items\">Price ({{getTotalItems()}} items)</p>\r\n          </ion-col>\r\n          <ion-col class=\"ion-no-padding price-total\">\r\n            <p>{{productsPrice | currency: 'INR':true}}</p>\r\n          </ion-col>\r\n        </ion-row>\r\n\r\n        <ion-row class=\"ion-justify-content-between ion-no-padding ion-align-items-center\" *ngIf=\"couponDiscount !== 0\">\r\n          <ion-col class=\"ion-no-padding\">\r\n            <p class=\"total-items\">Coupon Discount</p>\r\n          </ion-col>\r\n          <ion-col class=\"ion-no-padding price-total\">\r\n            <p style=\"color: var(--ion-color-success);\">{{couponDiscount | currency: 'INR':true}}</p>\r\n          </ion-col>\r\n        </ion-row>\r\n\r\n        <ion-row class=\"ion-justify-content-between ion-no-padding ion-align-items-center\">\r\n          <ion-col class=\"ion-no-padding\">\r\n            <p class=\"total-items\">Delivery Fee</p>\r\n          </ion-col>\r\n          <ion-col class=\"ion-no-padding price-total\">\r\n            <p *ngIf=\"productsPrice < freeDeliveryAmt; else freeDelivery\">{{defaultDeliveryAmt | currency: 'INR':true}}\r\n            </p>\r\n            <ng-template #freeDelivery>\r\n              <p style=\"color: var(--ion-color-success);\">Free</p>\r\n            </ng-template>\r\n          </ion-col>\r\n        </ion-row>\r\n\r\n        <ion-row class=\"ion-justify-content-between ion-no-padding ion-align-items-center\" *ngIf=\"defaultGst !== 0\">\r\n          <ion-col class=\"ion-no-padding\">\r\n            <p class=\"total-items\">GST ({{defaultGst}}%)</p>\r\n          </ion-col>\r\n          <ion-col class=\"ion-no-padding price-total\">\r\n            <p>{{gstAmount | currency: 'INR':true:'0.0'}}</p>\r\n          </ion-col>\r\n        </ion-row>\r\n\r\n        <hr class=\"line\">\r\n        <ion-row class=\"ion-no-padding\">\r\n          <ion-col class=\"ion-no-padding\">\r\n            <p class=\"total-estimated\">Total Amount</p>\r\n          </ion-col>\r\n          <ion-col class=\"ion-no-padding estimated-price\">\r\n            <p>{{totalAmountToPaid | currency: 'INR':true}}</p>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </div>\r\n  </ion-content>\r\n</ng-template>\r\n\r\n<ion-footer *ngIf=\"!showLoader\">\r\n  <ion-toolbar>\r\n    <ion-grid class=\"ion-no-padding\">\r\n      <ion-row class=\"ion-no-padding ion-align-items-center\">\r\n        <ion-col class=\"ion-no-padding\">\r\n          <div (click)=\"scrollToBottom()\">\r\n            <h6>{{totalAmountToPaid | currency: 'INR':true}}</h6>\r\n            <p class=\"view-price-details\">View Price Details</p>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col class=\"ion-no-padding\">\r\n          <ion-button expand=\"block\" (click)=\"onClickPlaceOrder()\">\r\n            Place Order\r\n          </ion-button>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </ion-toolbar>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/order-summary/order-summary.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/order-summary/order-summary.module.ts ***!
  \*******************************************************/
/*! exports provided: OrderSummaryPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderSummaryPageModule", function() { return OrderSummaryPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _order_summary_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./order-summary.page */ "./src/app/order-summary/order-summary.page.ts");







var routes = [
    {
        path: '',
        component: _order_summary_page__WEBPACK_IMPORTED_MODULE_6__["OrderSummaryPage"]
    }
];
var OrderSummaryPageModule = /** @class */ (function () {
    function OrderSummaryPageModule() {
    }
    OrderSummaryPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_order_summary_page__WEBPACK_IMPORTED_MODULE_6__["OrderSummaryPage"]]
        })
    ], OrderSummaryPageModule);
    return OrderSummaryPageModule;
}());



/***/ }),

/***/ "./src/app/order-summary/order-summary.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/order-summary/order-summary.page.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".address-card {\n  background: white;\n  padding: 10px;\n  margin: 6px 12px 12px 12px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\nion-content {\n  --background: #F2F2F2;\n}\n\n.user-name {\n  font-size: 15px;\n}\n\n.address {\n  font-size: 13px;\n}\n\n.phone-no {\n  font-size: 13px;\n  margin-bottom: -5px;\n}\n\n.spinner {\n  text-align: center;\n  margin-top: 50%;\n}\n\n.change-address-btn {\n  text-align: center;\n  margin-top: 5%;\n}\n\nion-list {\n  border-radius: 5px;\n}\n\n.products-container {\n  margin: 10px;\n  background: white;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 15px 5px 10px 2px;\n  position: relative;\n}\n\n.product-image {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n  width: 100px;\n  height: 80px;\n}\n\n.product-name {\n  font-size: 13px;\n  margin-top: 7px;\n}\n\n.product-price {\n  color: var(--ion-color-primary);\n  font-size: 16px;\n}\n\n.product-description {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  margin-top: 7px;\n  opacity: 0.5;\n  margin-bottom: -3px;\n  font-size: 12px;\n}\n\n.product-quantity {\n  font-size: 12px;\n}\n\nion-grid ion-row {\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n\nion-footer {\n  height: 54px;\n}\n\nion-footer ion-toolbar {\n  --background: white;\n  text-align: center;\n}\n\n.comment-box {\n  border: 1px solid #ececec;\n  border-radius: 5px;\n  margin: 10px;\n  font-size: 14px;\n}\n\n.remove-btn {\n  position: absolute;\n  top: -4px;\n  right: -5px;\n  color: var(--ion-color-primary);\n}\n\n.comment-img-conatiner {\n  margin-right: 10px;\n}\n\n.comment-img {\n  border: 1px solid #ececec;\n  width: 50px;\n  height: 50px;\n}\n\n.price-card {\n  background: white;\n  padding: 10px 10px 0px 10px;\n  margin: 6px 12px 12px 12px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.price-details {\n  font-size: 14px;\n  text-transform: uppercase;\n  opacity: 0.7;\n}\n\n.line {\n  border: 0;\n  clear: both;\n  display: block;\n  width: 100%;\n  background-color: #ccc;\n  height: 1px;\n  opacity: 0.4;\n}\n\n.total-items {\n  font-size: 13px;\n}\n\n.price-total {\n  text-align: end;\n}\n\n.price-total p {\n  font-size: 15px;\n}\n\n.total-estimated {\n  font-size: 16px;\n}\n\n.estimated-price {\n  text-align: end;\n}\n\n.estimated-price p {\n  font-size: 17px;\n  color: var(--ion-color-primary);\n}\n\n.view-price-details {\n  margin-top: -10px;\n  font-size: 10px;\n  color: var(--ion-color-primary);\n}\n\nion-textarea {\n  --padding-top: 0px;\n}\n\n.spinner {\n  margin-top: 50%;\n  text-align: center;\n}\n\n.coupon-code-section {\n  background: white;\n  padding: 15px;\n  margin: 12px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.coupon-code-input {\n  border: 1px solid #e8e8e8;\n  border-radius: 5px;\n  font-size: 13px;\n  width: 70%;\n}\n\n.delivery-schedule-section {\n  background: white;\n  padding: 10px;\n  margin: 12px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.inline-alignment {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.code-applied {\n  color: var(--ion-color-success);\n  margin-top: 10px;\n  font-size: 12px;\n}\n\n.delivery-date-time {\n  font-size: 14px;\n  --padding-start: 0px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvb3JkZXItc3VtbWFyeS9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcb3JkZXItc3VtbWFyeVxcb3JkZXItc3VtbWFyeS5wYWdlLnNjc3MiLCJzcmMvYXBwL29yZGVyLXN1bW1hcnkvb3JkZXItc3VtbWFyeS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxpQkFBQTtFQUNBLGFBQUE7RUFDQSwwQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFQTtFQUNJLHFCQUFBO0FDQ0o7O0FERUE7RUFDSSxlQUFBO0FDQ0o7O0FERUE7RUFDSSxlQUFBO0FDQ0o7O0FERUE7RUFDSSxlQUFBO0VBQ0EsbUJBQUE7QUNDSjs7QURFQTtFQUNJLGtCQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7RUFDQSxjQUFBO0FDQ0o7O0FERUE7RUFDSSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksWUFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLDBCQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFQTtFQUNJLHNHQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7RUFDQSxlQUFBO0FDQ0o7O0FERUE7RUFDSSwrQkFBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FDQ0o7O0FERUE7RUFDSSxlQUFBO0FDQ0o7O0FERUE7RUFDSSxxQkFBQTtVQUFBLHlCQUFBO0FDQ0o7O0FER0E7RUFDSSxZQUFBO0FDQUo7O0FER0E7RUFDSSxtQkFBQTtFQUNBLGtCQUFBO0FDQUo7O0FER0E7RUFDSSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUNBSjs7QURHQTtFQUNJLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSwrQkFBQTtBQ0FKOztBREdBO0VBQ0ksa0JBQUE7QUNBSjs7QURHQTtFQUNJLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUNBSjs7QURHQTtFQUNJLGlCQUFBO0VBQ0EsMkJBQUE7RUFDQSwwQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7QUNBSjs7QURHQTtFQUNJLGVBQUE7RUFDQSx5QkFBQTtFQUNBLFlBQUE7QUNBSjs7QURHQTtFQUNJLFNBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FDQUo7O0FER0E7RUFDSSxlQUFBO0FDQUo7O0FER0E7RUFDSSxlQUFBO0FDQUo7O0FER0E7RUFDSSxlQUFBO0FDQUo7O0FER0E7RUFDSSxlQUFBO0FDQUo7O0FER0E7RUFDSSxlQUFBO0FDQUo7O0FER0E7RUFDSSxlQUFBO0VBQ0EsK0JBQUE7QUNBSjs7QURHQTtFQUNJLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLCtCQUFBO0FDQUo7O0FER0E7RUFDSSxrQkFBQTtBQ0FKOztBREdBO0VBQ0ksZUFBQTtFQUNBLGtCQUFBO0FDQUo7O0FER0E7RUFDSSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQ0FKOztBREdBO0VBQ0kseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxVQUFBO0FDQUo7O0FER0E7RUFDSSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQ0FKOztBREdBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNBSjs7QURHQTtFQUNJLCtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FDQUo7O0FER0E7RUFDSSxlQUFBO0VBQ0Esb0JBQUE7QUNBSiIsImZpbGUiOiJzcmMvYXBwL29yZGVyLXN1bW1hcnkvb3JkZXItc3VtbWFyeS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWRkcmVzcy1jYXJkIHtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIG1hcmdpbjogNnB4IDEycHggMTJweCAxMnB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuaW9uLWNvbnRlbnQge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAjRjJGMkYyO1xyXG59XHJcblxyXG4udXNlci1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG5cclxuLmFkZHJlc3Mge1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG59XHJcblxyXG4ucGhvbmUtbm8ge1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogLTVweDtcclxufVxyXG5cclxuLnNwaW5uZXIge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbWFyZ2luLXRvcDogNTAlO1xyXG59XHJcblxyXG4uY2hhbmdlLWFkZHJlc3MtYnRuIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG1hcmdpbi10b3A6IDUlO1xyXG59XHJcblxyXG5pb24tbGlzdCB7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5wcm9kdWN0cy1jb250YWluZXIge1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgcGFkZGluZzogMTVweCA1cHggMTBweCAycHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi5wcm9kdWN0LWltYWdlIHtcclxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybCgnaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzL2xvYWRlcmJiMTllZmNjMjc0OWUxMTUuZ2lmJykgY2VudGVyIG5vLXJlcGVhdDtcclxuICAgIHdpZHRoOiAxMDBweDtcclxuICAgIGhlaWdodDogODBweDtcclxufVxyXG5cclxuLnByb2R1Y3QtbmFtZSB7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBtYXJnaW4tdG9wOiA3cHg7XHJcbn1cclxuXHJcbi5wcm9kdWN0LXByaWNlIHtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbn1cclxuXHJcbi5wcm9kdWN0LWRlc2NyaXB0aW9uIHtcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICBtYXJnaW4tdG9wOiA3cHg7XHJcbiAgICBvcGFjaXR5OiAuNTtcclxuICAgIG1hcmdpbi1ib3R0b206IC0zcHg7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbn1cclxuXHJcbi5wcm9kdWN0LXF1YW50aXR5IHtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG5cclxuaW9uLWdyaWQgaW9uLXJvdyB7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gICAgO1xyXG59XHJcblxyXG5pb24tZm9vdGVyIHtcclxuICAgIGhlaWdodDogNTRweDtcclxufVxyXG5cclxuaW9uLWZvb3RlciBpb24tdG9vbGJhciB7XHJcbiAgICAtLWJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uY29tbWVudC1ib3gge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2VjZWNlYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIG1hcmdpbjogMTBweDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5cclxuLnJlbW92ZS1idG4ge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAtNHB4O1xyXG4gICAgcmlnaHQ6IC01cHg7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG59XHJcblxyXG4uY29tbWVudC1pbWctY29uYXRpbmVyIHtcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG5cclxuLmNvbW1lbnQtaW1nIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlY2VjZWM7XHJcbiAgICB3aWR0aDogNTBweDtcclxuICAgIGhlaWdodDogNTBweDtcclxufVxyXG5cclxuLnByaWNlLWNhcmQge1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDEwcHggMHB4IDEwcHg7XHJcbiAgICBtYXJnaW46IDZweCAxMnB4IDEycHggMTJweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5wcmljZS1kZXRhaWxzIHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICBvcGFjaXR5OiAuNztcclxufVxyXG5cclxuLmxpbmUge1xyXG4gICAgYm9yZGVyOiAwO1xyXG4gICAgY2xlYXI6IGJvdGg7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcclxuICAgIGhlaWdodDogMXB4O1xyXG4gICAgb3BhY2l0eTogLjQ7XHJcbn1cclxuXHJcbi50b3RhbC1pdGVtcyB7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbn1cclxuXHJcbi5wcmljZS10b3RhbCB7XHJcbiAgICB0ZXh0LWFsaWduOiBlbmQ7XHJcbn1cclxuXHJcbi5wcmljZS10b3RhbCBwIHtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG5cclxuLnRvdGFsLWVzdGltYXRlZCB7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbn1cclxuXHJcbi5lc3RpbWF0ZWQtcHJpY2Uge1xyXG4gICAgdGV4dC1hbGlnbjogZW5kO1xyXG59XHJcblxyXG4uZXN0aW1hdGVkLXByaWNlIHAge1xyXG4gICAgZm9udC1zaXplOiAxN3B4O1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxufVxyXG5cclxuLnZpZXctcHJpY2UtZGV0YWlscyB7XHJcbiAgICBtYXJnaW4tdG9wOiAtMTBweDtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbn1cclxuXHJcbmlvbi10ZXh0YXJlYSB7XHJcbiAgICAtLXBhZGRpbmctdG9wOiAwcHg7XHJcbn1cclxuXHJcbi5zcGlubmVyIHtcclxuICAgIG1hcmdpbi10b3A6IDUwJTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmNvdXBvbi1jb2RlLXNlY3Rpb24ge1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBwYWRkaW5nOiAxNXB4O1xyXG4gICAgbWFyZ2luOiAxMnB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLmNvdXBvbi1jb2RlLWlucHV0IHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlOGU4ZTg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICB3aWR0aDogNzAlO1xyXG59XHJcblxyXG4uZGVsaXZlcnktc2NoZWR1bGUtc2VjdGlvbiB7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBtYXJnaW46IDEycHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcblxyXG4uaW5saW5lLWFsaWdubWVudCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLmNvZGUtYXBwbGllZCB7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG5cclxuLmRlbGl2ZXJ5LWRhdGUtdGltZSB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDBweDtcclxufSIsIi5hZGRyZXNzLWNhcmQge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgcGFkZGluZzogMTBweDtcbiAgbWFyZ2luOiA2cHggMTJweCAxMnB4IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuaW9uLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6ICNGMkYyRjI7XG59XG5cbi51c2VyLW5hbWUge1xuICBmb250LXNpemU6IDE1cHg7XG59XG5cbi5hZGRyZXNzIHtcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuXG4ucGhvbmUtbm8ge1xuICBmb250LXNpemU6IDEzcHg7XG4gIG1hcmdpbi1ib3R0b206IC01cHg7XG59XG5cbi5zcGlubmVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tdG9wOiA1MCU7XG59XG5cbi5jaGFuZ2UtYWRkcmVzcy1idG4ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDUlO1xufVxuXG5pb24tbGlzdCB7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLnByb2R1Y3RzLWNvbnRhaW5lciB7XG4gIG1hcmdpbjogMTBweDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcGFkZGluZzogMTVweCA1cHggMTBweCAycHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnByb2R1Y3QtaW1hZ2Uge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXCJodHRwczovL3M1LmdpZnl1LmNvbS9pbWFnZXMvbG9hZGVyYmIxOWVmY2MyNzQ5ZTExNS5naWZcIikgY2VudGVyIG5vLXJlcGVhdDtcbiAgd2lkdGg6IDEwMHB4O1xuICBoZWlnaHQ6IDgwcHg7XG59XG5cbi5wcm9kdWN0LW5hbWUge1xuICBmb250LXNpemU6IDEzcHg7XG4gIG1hcmdpbi10b3A6IDdweDtcbn1cblxuLnByb2R1Y3QtcHJpY2Uge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi5wcm9kdWN0LWRlc2NyaXB0aW9uIHtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIG1hcmdpbi10b3A6IDdweDtcbiAgb3BhY2l0eTogMC41O1xuICBtYXJnaW4tYm90dG9tOiAtM3B4O1xuICBmb250LXNpemU6IDEycHg7XG59XG5cbi5wcm9kdWN0LXF1YW50aXR5IHtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuXG5pb24tZ3JpZCBpb24tcm93IHtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbn1cblxuaW9uLWZvb3RlciB7XG4gIGhlaWdodDogNTRweDtcbn1cblxuaW9uLWZvb3RlciBpb24tdG9vbGJhciB7XG4gIC0tYmFja2dyb3VuZDogd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmNvbW1lbnQtYm94IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2VjZWNlYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBtYXJnaW46IDEwcHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLnJlbW92ZS1idG4ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogLTRweDtcbiAgcmlnaHQ6IC01cHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG59XG5cbi5jb21tZW50LWltZy1jb25hdGluZXIge1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5cbi5jb21tZW50LWltZyB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlY2VjZWM7XG4gIHdpZHRoOiA1MHB4O1xuICBoZWlnaHQ6IDUwcHg7XG59XG5cbi5wcmljZS1jYXJkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHBhZGRpbmc6IDEwcHggMTBweCAwcHggMTBweDtcbiAgbWFyZ2luOiA2cHggMTJweCAxMnB4IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLnByaWNlLWRldGFpbHMge1xuICBmb250LXNpemU6IDE0cHg7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIG9wYWNpdHk6IDAuNztcbn1cblxuLmxpbmUge1xuICBib3JkZXI6IDA7XG4gIGNsZWFyOiBib3RoO1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XG4gIGhlaWdodDogMXB4O1xuICBvcGFjaXR5OiAwLjQ7XG59XG5cbi50b3RhbC1pdGVtcyB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuLnByaWNlLXRvdGFsIHtcbiAgdGV4dC1hbGlnbjogZW5kO1xufVxuXG4ucHJpY2UtdG90YWwgcCB7XG4gIGZvbnQtc2l6ZTogMTVweDtcbn1cblxuLnRvdGFsLWVzdGltYXRlZCB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn1cblxuLmVzdGltYXRlZC1wcmljZSB7XG4gIHRleHQtYWxpZ246IGVuZDtcbn1cblxuLmVzdGltYXRlZC1wcmljZSBwIHtcbiAgZm9udC1zaXplOiAxN3B4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xufVxuXG4udmlldy1wcmljZS1kZXRhaWxzIHtcbiAgbWFyZ2luLXRvcDogLTEwcHg7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn1cblxuaW9uLXRleHRhcmVhIHtcbiAgLS1wYWRkaW5nLXRvcDogMHB4O1xufVxuXG4uc3Bpbm5lciB7XG4gIG1hcmdpbi10b3A6IDUwJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uY291cG9uLWNvZGUtc2VjdGlvbiB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBwYWRkaW5nOiAxNXB4O1xuICBtYXJnaW46IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLmNvdXBvbi1jb2RlLWlucHV0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2U4ZThlODtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBmb250LXNpemU6IDEzcHg7XG4gIHdpZHRoOiA3MCU7XG59XG5cbi5kZWxpdmVyeS1zY2hlZHVsZS1zZWN0aW9uIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbjogMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4uaW5saW5lLWFsaWdubWVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmNvZGUtYXBwbGllZCB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIGZvbnQtc2l6ZTogMTJweDtcbn1cblxuLmRlbGl2ZXJ5LWRhdGUtdGltZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwcHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/order-summary/order-summary.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/order-summary/order-summary.page.ts ***!
  \*****************************************************/
/*! exports provided: OrderSummaryPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderSummaryPage", function() { return OrderSummaryPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/image-picker/ngx */ "./node_modules/@ionic-native/image-picker/ngx/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);








var OrderSummaryPage = /** @class */ (function () {
    function OrderSummaryPage(events, router, alertController, loadingController, storage, actionSheetController, camera, imagePicker, navCtrl) {
        this.events = events;
        this.router = router;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.storage = storage;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.imagePicker = imagePicker;
        this.navCtrl = navCtrl;
        this.products = [];
        this.showCommentBoxAndImage = false;
        this.listOfCommentImages = [];
        this.defaultDeliveryAmt = 0;
        this.freeDeliveryAmt = 0;
        this.minOrderAmount = 0;
        this.showLoader = true;
        this.couponCode = '';
        this.couponDiscount = 0;
        this.defaultGst = 0;
        this.couponApplied = false;
        this.couponId = '';
        this.timeSchedules = [];
        this.scheduledDates = [];
        this.gstAmount = 0;
    }
    OrderSummaryPage.prototype.ngOnInit = function () {
    };
    OrderSummaryPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('productsInCart').then(function (products) {
            //console.log('products in order summary', products);
            _this.products = products;
            _this.events.publish('delivery-settings:getDeliverySettingsData');
        });
        this.storage.get('userDefaultAddress').then(function (address) {
            //console.log('default address in order summary', address);
            _this.address = address;
        });
        this.storage.get('storeInfo').then(function (data) {
            if (data.allowComment === true) {
                _this.showCommentBoxAndImage = true;
            }
            _this.placeholderMsgInCommentBox = data.commentMsg;
        });
        this.initializeSubscriptions();
    };
    OrderSummaryPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    OrderSummaryPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('user:orderSuccessfullyPlaced', function () {
            _this.loading.dismiss();
            _this.orderPlacedAlert();
        });
        this.events.subscribe('delivery-settings:publishDeliverySettingsData', function (data) {
            if (!_this.isEmptyObj(data)) {
                if (data.freeDeliveryAmt !== '') {
                    _this.freeDeliveryAmt = parseInt(data.freeDeliveryAmt);
                }
                _this.isDeliverySchedule = data.isDeliverySchedule;
                _this.maxDaysOfDelivery = data.maxDaysOfDelivery;
                if (_this.isDeliverySchedule) {
                    if (data.deliveryDays.length > 0 && data.timeSchedules.length > 0) {
                        _this.getDeliveryDates(data.deliveryDays);
                        _this.timeSchedules = data.timeSchedules;
                    }
                    if (data.allowSameDayDelivery) {
                        _this.appendSameDateToDeliveryDates(data.lastDeliveryTime);
                    }
                }
                _this.events.publish('admin-settings:getPaymentInfoData');
            }
        });
        this.events.subscribe('admin-settings:publishPaymentInfoData', function (data) {
            if (!_this.isEmptyObj(data)) {
                if (data.minOrderAmount !== '') {
                    //console.log('in if...');
                    _this.minOrderAmount = parseInt(data.minOrderAmount);
                }
                if (data.maxOrderAmount !== '') {
                    _this.maxOrderAmount = parseInt(data.maxOrderAmount);
                }
                if (data.defaultGst !== '') {
                    _this.defaultGst = parseInt(data.defaultGst);
                }
                _this.autoConfirmOrder = data.autoConfirmOrder;
                //console.log(this.minOrderAmount, this.maxOrderAmount);
                _this.events.publish('delivery-settings:getPincodeDeliveryCost', _this.address.pincode);
            }
        });
        this.events.subscribe('delivery-settings:publishDeliveryCost', function (response) {
            _this.defaultDeliveryAmt = response.deliveryCost;
            _this.isOrderDeliverable = response.status;
            _this.getTotalPriceBeforeDelivery();
        });
        this.events.subscribe('coupon-codes:couponCodeNotApplied', function (msg) {
            _this.loader.dismiss();
            _this.presentAlert(msg);
        });
        this.events.subscribe('coupon-codes:couponCodeApplied', function (response) {
            _this.getTotalPriceBeforeDelivery();
            var coupon = response.data;
            _this.couponApplied = true;
            _this.couponId = coupon.couponId;
            _this.loader.dismiss();
            //console.log(response);
            if (coupon.type === 'flat') {
                _this.couponDiscount = coupon.amount;
                if (_this.totalAmountToPaid - _this.couponDiscount < 0) {
                    _this.totalAmountToPaid = 0;
                }
                else {
                    _this.totalAmountToPaid -= _this.couponDiscount;
                }
            }
            else {
                var applicableProducts = [];
                for (var index = 0; index < _this.products.length; index++) {
                    if (coupon.productsExempted.indexOf(_this.products[index].productId) === -1) {
                        applicableProducts.push(_this.products[index]);
                    }
                }
                var discount = 0;
                if (applicableProducts.length > 0) {
                    for (var index = 0; index < applicableProducts.length; index++) {
                        discount = Math.ceil(discount + ((applicableProducts[index].price * applicableProducts[index].quantity) * (coupon.amount / 100)));
                    }
                    if (discount > coupon.maxDiscount) {
                        discount = coupon.maxDiscount;
                    }
                    _this.couponDiscount = discount;
                    _this.totalAmountToPaid -= _this.couponDiscount;
                }
                else {
                    _this.couponApplied = false;
                    _this.couponDiscount = 0;
                    _this.couponCode = '';
                    _this.presentAlert('This coupon code is not applicable on these products.');
                }
            }
        });
    };
    OrderSummaryPage.prototype.isEmptyObj = function (object) {
        for (var key in object) {
            if (object.hasOwnProperty(key))
                return false;
        }
        return true;
    };
    OrderSummaryPage.prototype.getDeliveryDates = function (days) {
        this.scheduledDates = [];
        for (var index = 0; index < this.maxDaysOfDelivery; index++) {
            var dayToCheck = moment__WEBPACK_IMPORTED_MODULE_7__().add(index + 1, 'days');
            if (days.includes(dayToCheck.format('dddd'))) {
                this.scheduledDates.push(dayToCheck.toDate());
            }
        }
    };
    OrderSummaryPage.prototype.appendSameDateToDeliveryDates = function (lastTime) {
        var now = moment__WEBPACK_IMPORTED_MODULE_7__().format('HH:mm');
        //console.log('now', now);
        var lastDeliveryTime = moment__WEBPACK_IMPORTED_MODULE_7__(lastTime, ["hh:mm A"]).format('HH:mm');
        //console.log('lastDeliveryTime', lastDeliveryTime);
        if (now < lastDeliveryTime) {
            this.scheduledDates.unshift(new Date());
        }
    };
    OrderSummaryPage.prototype.selectDate = function (e) {
        //console.log(e.target.value);
        this.selectedDate = e.target.value;
    };
    OrderSummaryPage.prototype.selectTime = function (e) {
        //console.log(e.target.value);
        this.selectedTime = e.target.value;
    };
    OrderSummaryPage.prototype.disableTime = function (time) {
        if (this.selectedDate) {
            if (this.selectedDate.getDate() !== new Date().getDate()) {
                return false;
            }
            else {
                var now = moment__WEBPACK_IMPORTED_MODULE_7__().format('HH:mm');
                var startTime = moment__WEBPACK_IMPORTED_MODULE_7__(time.start, ["hh:mm A"]).format('HH:mm');
                if (now > startTime) {
                    return true;
                }
            }
        }
    };
    OrderSummaryPage.prototype.getTime = function (time) {
        return moment__WEBPACK_IMPORTED_MODULE_7__(time).format('hh:mm A');
    };
    OrderSummaryPage.prototype.getTotalPriceBeforeDelivery = function () {
        //console.log('in getTotalPriceBeforeDelivery');
        var price = 0;
        for (var index = 0; index < this.products.length; index++) {
            price += this.products[index].price * this.products[index].quantity;
        }
        this.productsPrice = price;
        this.getTotalPriceAfterDeliveryAndGst();
    };
    OrderSummaryPage.prototype.getTotalPriceAfterDeliveryAndGst = function () {
        if (this.productsPrice < this.freeDeliveryAmt) {
            this.totalAmountToPaid = this.productsPrice + this.defaultDeliveryAmt;
            this.gstAmount = Math.ceil(this.totalAmountToPaid * (this.defaultGst / 100));
            this.totalAmountToPaid = Math.ceil(this.totalAmountToPaid + this.gstAmount);
        }
        else {
            this.gstAmount = Math.ceil(this.productsPrice * (this.defaultGst / 100));
            //console.log('this.gstAmount', this.gstAmount);
            this.totalAmountToPaid = Math.ceil(this.productsPrice + this.gstAmount);
            //console.log('this.totalAmountToPaid', this.totalAmountToPaid);
        }
        this.showLoader = false;
    };
    OrderSummaryPage.prototype.onClickPlaceOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, paymentData, paymentData;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.isOrderDeliverable === 'not_deliverable')) return [3 /*break*/, 1];
                        this.presentAlert('Order is not deliverable at your address.');
                        return [3 /*break*/, 8];
                    case 1:
                        if (!(this.productsPrice < this.minOrderAmount)) return [3 /*break*/, 2];
                        this.presentAlert('Minimum amount for placing order is Rs.' + this.minOrderAmount);
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(this.maxOrderAmount && (this.productsPrice > this.maxOrderAmount))) return [3 /*break*/, 3];
                        this.presentAlert('Maximum amount for placing order is Rs.' + this.maxOrderAmount);
                        return [3 /*break*/, 8];
                    case 3:
                        if (!(this.isDeliverySchedule && !(this.selectedDate && this.selectedTime))) return [3 /*break*/, 4];
                        this.presentAlert('Please select delivery date and time.');
                        return [3 /*break*/, 8];
                    case 4:
                        if (!!this.autoConfirmOrder) return [3 /*break*/, 7];
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
                                duration: 20000
                            })];
                    case 5:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 6:
                        _b.sent();
                        //console.log('order to be placed...', this.products);
                        if (this.productsPrice >= this.freeDeliveryAmt) {
                            this.defaultDeliveryAmt = 0;
                        }
                        paymentData = {
                            productsPrice: this.productsPrice,
                            delivery: this.defaultDeliveryAmt,
                            couponDiscount: this.couponDiscount,
                            defaultGst: this.gstAmount,
                            totalAmountToPaid: this.totalAmountToPaid,
                            couponId: this.couponId,
                            scheduledDate: this.selectedDate,
                            scheduledTime: this.selectedTime
                        };
                        this.events.publish('user:placeOrder', this.products, this.listOfCommentImages, this.address, paymentData);
                        return [3 /*break*/, 8];
                    case 7:
                        if (this.productsPrice >= this.freeDeliveryAmt) {
                            this.defaultDeliveryAmt = 0;
                        }
                        paymentData = {
                            productsPrice: this.productsPrice,
                            delivery: this.defaultDeliveryAmt,
                            couponDiscount: this.couponDiscount,
                            defaultGst: this.gstAmount,
                            totalAmountToPaid: this.totalAmountToPaid,
                            couponId: this.couponId,
                            scheduledDate: this.selectedDate,
                            scheduledTime: this.selectedTime
                        };
                        this.events.publish('user:autoConfirmPlaceOrder', this.products, this.listOfCommentImages, this.address, paymentData);
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    OrderSummaryPage.prototype.onClickChangeOrAddAddress = function () {
        this.router.navigate(['select-address']);
    };
    OrderSummaryPage.prototype.imageActionSheet = function (index) {
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
                                        _this.addCameraCommentImage(index);
                                    }
                                }, {
                                    text: 'Gallery',
                                    icon: 'images',
                                    handler: function () {
                                        _this.addGalleryCommentImages(index);
                                    }
                                }, {
                                    text: 'Cancel',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                        //console.log('Cancel clicked');
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
    OrderSummaryPage.prototype.addCameraCommentImage = function (index) {
        var _this = this;
        this.optionsforCamera = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            allowEdit: true
        };
        //console.log('in addCameraCommentImage');
        this.camera.getPicture(this.optionsforCamera).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            var base64Str = base64Image.split(',');
            var size = _this.calculateImageSize(base64Str[1]);
            //console.log('size of image', size);
            _this.listOfCommentImages.push({
                productId: _this.products[index].productId,
                url: base64Image,
                size: size
            });
            _this.products[index].commentImgs.push({ imgData: base64Image, size: size });
            //console.log('listOfCommentImages', this.listOfCommentImages);
        }, function (err) {
            //console.log(err);
        });
    };
    OrderSummaryPage.prototype.addGalleryCommentImages = function (index) {
        var _this = this;
        this.optionsforGallery = {
            quality: 50,
            outputType: 1
        };
        this.imagePicker.getPictures(this.optionsforGallery).then(function (results) {
            if (results.length !== 0 && results !== 'OK') {
                for (var i = 0; i < results.length; i++) {
                    var base64Str = 'data:image/jpeg;base64,' + results[i].split(',');
                    var size = _this.calculateImageSize(base64Str[1]);
                    _this.listOfCommentImages.push({
                        productId: _this.products[index].productId,
                        url: 'data:image/jpeg;base64,' + results[i],
                        size: size
                    });
                    _this.products[index].commentImgs.push({ imgData: 'data:image/jpeg;base64,' + results[i], size: size });
                }
                //console.log('listOfCommentImages', this.listOfCommentImages);
            }
        }, function (err) {
            alert(err);
        });
    };
    OrderSummaryPage.prototype.calculateImageSize = function (base64String) {
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
        //console.log(base64StringLength);
        inBytes = (base64StringLength / 4) * 3 - padding;
        //console.log(inBytes);
        var kbytes = inBytes / 1000;
        return kbytes;
    };
    OrderSummaryPage.prototype.removeCommentImage = function (index, imgIndex, url) {
        this.products[index].commentImgs.splice(imgIndex, 1);
        for (var i = 0; i < this.listOfCommentImages.length; i++) {
            if (this.listOfCommentImages[i].url === url) {
                this.listOfCommentImages.splice(i, 1);
            }
        }
        //console.log('listOfCommentImages', this.listOfCommentImages);
    };
    OrderSummaryPage.prototype.getTotalItems = function () {
        return this.products.length;
    };
    OrderSummaryPage.prototype.applyCouponCode = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var data;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading('Verifying coupon code...')];
                    case 1:
                        _a.sent();
                        data = {
                            code: this.couponCode,
                            orderAmount: this.productsPrice
                        };
                        this.events.publish('coupon-codes:verifyCouponCode', data);
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderSummaryPage.prototype.scrollToBottom = function () {
        this.content.scrollToBottom(500);
    };
    OrderSummaryPage.prototype.orderPlacedAlert = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: "Your order has been placed",
                            message: "We are reviewing your order. We will sent you payment link once your order is confirmed.",
                            buttons: [{
                                    text: 'Ok',
                                    handler: function () {
                                        //console.log('Confirm Okay');
                                        _this.navCtrl.navigateRoot(['user-order-history']);
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
    OrderSummaryPage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: ['OK']
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
    OrderSummaryPage.prototype.presentLoading = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: msg
                            })];
                    case 1:
                        _a.loader = _b.sent();
                        return [4 /*yield*/, this.loader.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderSummaryPage.prototype.removeCouponCode = function () {
        this.getTotalPriceBeforeDelivery();
        this.couponApplied = false;
        this.couponDiscount = 0;
        this.couponCode = '';
    };
    OrderSummaryPage.prototype.textUppercase = function (couponCode) {
        this.couponCode = couponCode.toUpperCase();
        if (this.couponCode.includes(' ')) {
            this.couponCode = this.couponCode.replace(/\s/g, '');
        }
    };
    OrderSummaryPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('user:orderSuccessfullyPlaced');
        this.events.unsubscribe('delivery-settings:publishDeliverySettingsData');
        this.events.unsubscribe('admin-settings:publishPaymentInfoData');
        this.events.unsubscribe('coupon-codes:couponCodeNotApplied');
        this.events.unsubscribe('coupon-codes:couponCodeApplied');
        this.events.unsubscribe('delivery-settings:publishDeliveryCost');
    };
    OrderSummaryPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ActionSheetController"] },
        { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_5__["Camera"] },
        { type: _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_6__["ImagePicker"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
    ], OrderSummaryPage.prototype, "content", void 0);
    OrderSummaryPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-order-summary',
            template: __webpack_require__(/*! raw-loader!./order-summary.page.html */ "./node_modules/raw-loader/index.js!./src/app/order-summary/order-summary.page.html"),
            styles: [__webpack_require__(/*! ./order-summary.page.scss */ "./src/app/order-summary/order-summary.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ActionSheetController"],
            _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_5__["Camera"],
            _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_6__["ImagePicker"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"]])
    ], OrderSummaryPage);
    return OrderSummaryPage;
}());



/***/ })

}]);
//# sourceMappingURL=order-summary-order-summary-module-es5.js.map