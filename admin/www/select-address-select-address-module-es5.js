(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["select-address-select-address-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/select-address/select-address.page.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/select-address/select-address.page.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"order-summary\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center>Select Address</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"add-address-toolbar\" (click)=\"goToPage('new-address')\" *ngIf=\"showAddAddressBtn\">\r\n    <p>\r\n      + Add a new address\r\n    </p>\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"spinner\" *ngIf=\"showLoader\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n  <ion-list lines=\"none\" *ngIf=\"!showLoader && addressesData\">\r\n    <ion-radio-group [value]=\"addressesData[0]\" (ionChange)=\"radioSelect($event)\">\r\n      <div class=\"selectable-address-item\" *ngFor=\"let address of addressesData; let i=index\">\r\n        <ion-item>\r\n          <ion-label>\r\n            <p class=\"s-user-name ion-text-wrap\">{{address.name}}</p>\r\n            <p class=\"s-address ion-text-wrap\">{{address.address}}</p>\r\n            <p class=\"s-phone-no\">{{address.phoneNo}}</p>\r\n          </ion-label>\r\n          <ion-radio slot=\"start\" color=\"primary\" mode=\"ios\" [value]=\"addressesData[i]\"></ion-radio>\r\n        </ion-item>\r\n        <div style=\"text-align: end;margin: -10px;\">\r\n          <ion-button (click)=\"editAddress(address)\" fill=\"clear\">\r\n            edit\r\n          </ion-button>\r\n        </div>\r\n      </div>\r\n    </ion-radio-group>\r\n  </ion-list>\r\n</ion-content>\r\n<ion-footer (click)=\"onClickDeliverHere()\">\r\n  <ion-grid>\r\n    <ion-row class=\"ion-justify-content-center ion-align-items-center\">\r\n      <div class=\"app-footer-text\">\r\n        Deliver Here<span><i class=\"flaticon-null-20 app-footer-icon\"></i></span>\r\n    </div>\r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/select-address/select-address.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/select-address/select-address.module.ts ***!
  \*********************************************************/
/*! exports provided: SelectAddressPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectAddressPageModule", function() { return SelectAddressPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _select_address_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./select-address.page */ "./src/app/select-address/select-address.page.ts");







var routes = [
    {
        path: '',
        component: _select_address_page__WEBPACK_IMPORTED_MODULE_6__["SelectAddressPage"]
    }
];
var SelectAddressPageModule = /** @class */ (function () {
    function SelectAddressPageModule() {
    }
    SelectAddressPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_select_address_page__WEBPACK_IMPORTED_MODULE_6__["SelectAddressPage"]]
        })
    ], SelectAddressPageModule);
    return SelectAddressPageModule;
}());



/***/ }),

/***/ "./src/app/select-address/select-address.page.scss":
/*!*********************************************************!*\
  !*** ./src/app/select-address/select-address.page.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-content {\n  --background: #f2f2f2;\n}\n\n.add-address-toolbar p {\n  font-size: 15px;\n  padding-left: 3%;\n  color: var(--ion-color-primary);\n}\n\n.selectable-address-item {\n  background: white;\n  padding: 10px;\n  margin: 6px 12px 12px 12px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\nion-list {\n  background: none;\n}\n\n.s-user-name {\n  font-size: 15px;\n  color: black;\n}\n\n.s-address {\n  font-size: 13px;\n  color: black;\n}\n\n.s-phone-no {\n  font-size: 13px;\n  margin-bottom: -5px;\n  color: black;\n}\n\n.spinner {\n  text-align: center;\n  margin-top: 50%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VsZWN0LWFkZHJlc3MvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXHNlbGVjdC1hZGRyZXNzXFxzZWxlY3QtYWRkcmVzcy5wYWdlLnNjc3MiLCJzcmMvYXBwL3NlbGVjdC1hZGRyZXNzL3NlbGVjdC1hZGRyZXNzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHFCQUFBO0FDQ0o7O0FEQ0E7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSwrQkFBQTtBQ0VKOztBREFBO0VBQ0ksaUJBQUE7RUFDQSxhQUFBO0VBQ0EsMEJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FDR0o7O0FEREE7RUFDSSxnQkFBQTtBQ0lKOztBREZBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7QUNLSjs7QURIQTtFQUNJLGVBQUE7RUFDQSxZQUFBO0FDTUo7O0FESkE7RUFDSSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FDT0o7O0FETEE7RUFDSSxrQkFBQTtFQUNBLGVBQUE7QUNRSiIsImZpbGUiOiJzcmMvYXBwL3NlbGVjdC1hZGRyZXNzL3NlbGVjdC1hZGRyZXNzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jb250ZW50e1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAjZjJmMmYyO1xyXG59XHJcbi5hZGQtYWRkcmVzcy10b29sYmFyIHB7XHJcbiAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDMlO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxufVxyXG4uc2VsZWN0YWJsZS1hZGRyZXNzLWl0ZW0ge1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgbWFyZ2luOiA2cHggMTJweCAxMnB4IDEycHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcbmlvbi1saXN0e1xyXG4gICAgYmFja2dyb3VuZDogbm9uZTtcclxufVxyXG4ucy11c2VyLW5hbWV7XHJcbiAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbn1cclxuLnMtYWRkcmVzc3tcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIGNvbG9yOiBibGFjaztcclxufVxyXG4ucy1waG9uZS1ub3tcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIG1hcmdpbi1ib3R0b206IC01cHg7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbn1cclxuLnNwaW5uZXJ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiA1MCU7XHJcbn1cclxuIiwiaW9uLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6ICNmMmYyZjI7XG59XG5cbi5hZGQtYWRkcmVzcy10b29sYmFyIHAge1xuICBmb250LXNpemU6IDE1cHg7XG4gIHBhZGRpbmctbGVmdDogMyU7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG59XG5cbi5zZWxlY3RhYmxlLWFkZHJlc3MtaXRlbSB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBwYWRkaW5nOiAxMHB4O1xuICBtYXJnaW46IDZweCAxMnB4IDEycHggMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG5pb24tbGlzdCB7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG59XG5cbi5zLXVzZXItbmFtZSB7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgY29sb3I6IGJsYWNrO1xufVxuXG4ucy1hZGRyZXNzIHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjb2xvcjogYmxhY2s7XG59XG5cbi5zLXBob25lLW5vIHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBtYXJnaW4tYm90dG9tOiAtNXB4O1xuICBjb2xvcjogYmxhY2s7XG59XG5cbi5zcGlubmVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tdG9wOiA1MCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/select-address/select-address.page.ts":
/*!*******************************************************!*\
  !*** ./src/app/select-address/select-address.page.ts ***!
  \*******************************************************/
/*! exports provided: SelectAddressPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectAddressPage", function() { return SelectAddressPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");





var SelectAddressPage = /** @class */ (function () {
    function SelectAddressPage(events, router, alertController, loadingController, storage) {
        this.events = events;
        this.router = router;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.storage = storage;
        this.addressesData = [];
        this.showLoader = true;
        this.showAddAddressBtn = false;
    }
    SelectAddressPage.prototype.ngOnInit = function () {
        var _this = this;
        this.initializeSubscription();
        this.events.publish('user:getAllSavedAddresses');
        setTimeout(function () {
            _this.showAddAddressBtn = true;
        }, 500);
    };
    SelectAddressPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('userDefaultAddress').then(function (address) {
            //console.log('default address in order summary', address);
            _this.addressFromStorage = address;
        });
    };
    SelectAddressPage.prototype.ngOnDestroy = function () {
        this.removeSubscription();
    };
    SelectAddressPage.prototype.initializeSubscription = function () {
        var _this = this;
        this.events.subscribe('user:publishAllSavedAddresses', function (allAddresses) {
            _this.addressesData = allAddresses;
            //console.log('addressesData', this.addressesData);
            _this.showLoader = false;
        });
    };
    SelectAddressPage.prototype.radioSelect = function (event) {
        //console.log(event.target.value);
        this.selectedAddress = event.target.value;
    };
    SelectAddressPage.prototype.goToPage = function (page) {
        var navigationExtras = {
            state: {
                routeFromSelectAddress: true,
            }
        };
        this.router.navigate([page], navigationExtras);
    };
    SelectAddressPage.prototype.onClickDeliverHere = function () {
        if (!this.selectedAddress) {
            this.selectedAddress = this.addressesData[0];
        }
        //console.log('this.selectedAddress', this.selectedAddress);
        this.storage.set('userDefaultAddress', this.selectedAddress);
        this.router.navigate(['order-summary']);
    };
    SelectAddressPage.prototype.editAddress = function (address) {
        var navigationExtras = {
            state: {
                addressData: address,
                addressLength: this.addressesData.length,
                routeFromSelectAddress: true
            }
        };
        this.router.navigate(['new-address'], navigationExtras);
    };
    SelectAddressPage.prototype.removeSubscription = function () {
        this.events.unsubscribe('user:publishAllSavedAddresses');
    };
    SelectAddressPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"] }
    ]; };
    SelectAddressPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-select-address',
            template: __webpack_require__(/*! raw-loader!./select-address.page.html */ "./node_modules/raw-loader/index.js!./src/app/select-address/select-address.page.html"),
            styles: [__webpack_require__(/*! ./select-address.page.scss */ "./src/app/select-address/select-address.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"]])
    ], SelectAddressPage);
    return SelectAddressPage;
}());



/***/ })

}]);
//# sourceMappingURL=select-address-select-address-module-es5.js.map