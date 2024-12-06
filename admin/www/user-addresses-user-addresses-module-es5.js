(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["user-addresses-user-addresses-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/user-addresses/user-addresses.page.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/user-addresses/user-addresses.page.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button class=\"custom-back-button\">\r\n        <img src=\"assets/img/menu-icon-white.png\" class=\"menu-img\">\r\n      </ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title text-center>my addresses</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"add-address-toolbar\" (click)=\"goToPage('new-address')\" *ngIf=\"showAddAddressBtn\">\r\n    <p>\r\n      + Add a new address\r\n    </p>\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"spinner\" *ngIf=\"showLoader\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n  <div *ngIf=\"!showLoader && addressesData\">\r\n    <div class=\"address-count\" *ngIf=\"!addressesData.length\">No saved addresses</div>\r\n    <div class=\"address-count\" *ngIf=\"addressesData.length == 1\">1 saved address</div>\r\n    <div class=\"address-count\" *ngIf=\"addressesData.length > 1\">{{addressesData.length}} saved addresses</div>\r\n      <div class=\"address-card\" *ngFor=\"let address of addressesData\">\r\n        <p class=\"user-name\">{{address.name}}</p>\r\n        <p class=\"address\">{{address.address}}</p>\r\n        <p class=\"phone-no\">{{address.phoneNo}}</p>\r\n        <ion-grid class=\"ion-no-padding\">\r\n          <ion-row>\r\n              <ion-button (click)=\"editAddress(address)\" fill=\"clear\">\r\n                edit\r\n              </ion-button>\r\n              <ion-button (click)=\"deleteAlertConfirm(address)\" fill=\"clear\">\r\n                delete\r\n              </ion-button>\r\n          </ion-row>\r\n        </ion-grid>\r\n      </div>\r\n  </div>\r\n  <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\" (click)=\"goToChat(true)\">\r\n    <ion-fab-button size=\"small\" color=\"dark\">\r\n      <i class=\"flaticon-chat fab-btn-chat\"></i>\r\n    </ion-fab-button>\r\n    <span class=\"unread-msg-badge\" *ngIf=\"unreadAdminMsgs !== 0\">{{unreadAdminMsgs}}</span>\r\n  </ion-fab>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/user-addresses/user-addresses.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/user-addresses/user-addresses.module.ts ***!
  \*********************************************************/
/*! exports provided: UserAddressesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserAddressesPageModule", function() { return UserAddressesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _user_addresses_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user-addresses.page */ "./src/app/user-addresses/user-addresses.page.ts");







var routes = [
    {
        path: '',
        component: _user_addresses_page__WEBPACK_IMPORTED_MODULE_6__["UserAddressesPage"]
    }
];
var UserAddressesPageModule = /** @class */ (function () {
    function UserAddressesPageModule() {
    }
    UserAddressesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_user_addresses_page__WEBPACK_IMPORTED_MODULE_6__["UserAddressesPage"]]
        })
    ], UserAddressesPageModule);
    return UserAddressesPageModule;
}());



/***/ }),

/***/ "./src/app/user-addresses/user-addresses.page.scss":
/*!*********************************************************!*\
  !*** ./src/app/user-addresses/user-addresses.page.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".add-address-toolbar p {\n  font-size: 15px;\n  padding-left: 3%;\n  color: var(--ion-color-primary);\n}\n\n.address-card {\n  background: white;\n  padding: 10px;\n  margin: 6px 12px 12px 12px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\nion-content {\n  --background: #F2F2F2;\n}\n\n.user-name {\n  font-size: 15px;\n}\n\n.address {\n  font-size: 13px;\n}\n\n.phone-no {\n  font-size: 13px;\n  margin-bottom: -5px;\n}\n\nion-grid ion-row {\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n\n.address-count {\n  font-size: small;\n  opacity: 0.5;\n  margin-top: 5%;\n  text-align: center;\n}\n\n.spinner {\n  text-align: center;\n  margin-top: 50%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlci1hZGRyZXNzZXMvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXHVzZXItYWRkcmVzc2VzXFx1c2VyLWFkZHJlc3Nlcy5wYWdlLnNjc3MiLCJzcmMvYXBwL3VzZXItYWRkcmVzc2VzL3VzZXItYWRkcmVzc2VzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtFQUNBLCtCQUFBO0FDQ0o7O0FEQ0E7RUFDSSxpQkFBQTtFQUNBLGFBQUE7RUFDQSwwQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7QUNFSjs7QURBQTtFQUNJLHFCQUFBO0FDR0o7O0FEREE7RUFDSSxlQUFBO0FDSUo7O0FERkE7RUFDSSxlQUFBO0FDS0o7O0FESEE7RUFDSSxlQUFBO0VBQ0EsbUJBQUE7QUNNSjs7QURKQTtFQUNJLHFCQUFBO1VBQUEseUJBQUE7QUNPSjs7QURMQTtFQUNJLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtBQ1FKOztBRE5BO0VBQ0ksa0JBQUE7RUFDQSxlQUFBO0FDU0oiLCJmaWxlIjoic3JjL2FwcC91c2VyLWFkZHJlc3Nlcy91c2VyLWFkZHJlc3Nlcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWRkLWFkZHJlc3MtdG9vbGJhciBwe1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAzJTtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbn1cclxuLmFkZHJlc3MtY2FyZHtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIG1hcmdpbjogNnB4IDEycHggMTJweCAxMnB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5pb24tY29udGVudHtcclxuICAgIC0tYmFja2dyb3VuZDogI0YyRjJGMjtcclxufVxyXG4udXNlci1uYW1le1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG59XHJcbi5hZGRyZXNze1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG59XHJcbi5waG9uZS1ub3tcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIG1hcmdpbi1ib3R0b206IC01cHg7XHJcbn1cclxuaW9uLWdyaWQgaW9uLXJvd3tcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7O1xyXG59XHJcbi5hZGRyZXNzLWNvdW50e1xyXG4gICAgZm9udC1zaXplOiBzbWFsbDtcclxuICAgIG9wYWNpdHk6IC41O1xyXG4gICAgbWFyZ2luLXRvcDogNSU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuLnNwaW5uZXJ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiA1MCU7XHJcbn0iLCIuYWRkLWFkZHJlc3MtdG9vbGJhciBwIHtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBwYWRkaW5nLWxlZnQ6IDMlO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xufVxuXG4uYWRkcmVzcy1jYXJkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbjogNnB4IDEycHggMTJweCAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbmlvbi1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiAjRjJGMkYyO1xufVxuXG4udXNlci1uYW1lIHtcbiAgZm9udC1zaXplOiAxNXB4O1xufVxuXG4uYWRkcmVzcyB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuLnBob25lLW5vIHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBtYXJnaW4tYm90dG9tOiAtNXB4O1xufVxuXG5pb24tZ3JpZCBpb24tcm93IHtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbn1cblxuLmFkZHJlc3MtY291bnQge1xuICBmb250LXNpemU6IHNtYWxsO1xuICBvcGFjaXR5OiAwLjU7XG4gIG1hcmdpbi10b3A6IDUlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5zcGlubmVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tdG9wOiA1MCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/user-addresses/user-addresses.page.ts":
/*!*******************************************************!*\
  !*** ./src/app/user-addresses/user-addresses.page.ts ***!
  \*******************************************************/
/*! exports provided: UserAddressesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserAddressesPage", function() { return UserAddressesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/user/user.service */ "./src/app/services/user/user.service.ts");






var UserAddressesPage = /** @class */ (function () {
    function UserAddressesPage(events, router, alertController, loadingController, storage, userService) {
        this.events = events;
        this.router = router;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.storage = storage;
        this.userService = userService;
        this.addressesData = [];
        this.showLoader = true;
        this.showAddAddressBtn = false;
        this.unreadAdminMsgs = 0;
    }
    UserAddressesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.initializeSubscription();
        this.events.publish('user:getAllSavedAddresses');
        setTimeout(function () {
            _this.showAddAddressBtn = true;
        }, 500);
    };
    UserAddressesPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('uid').then(function (val) {
            _this.events.publish('chat:getUnreadMsgOfAdmin', val);
        });
        this.events.subscribe('chat:publishUnreadMsgOfAdmin', function (unreadMsgs) {
            _this.unreadAdminMsgs = unreadMsgs;
        });
    };
    UserAddressesPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe('chat:publishUnreadMsgOfAdmin');
    };
    UserAddressesPage.prototype.ngOnDestroy = function () {
        this.removeSubscription();
    };
    UserAddressesPage.prototype.initializeSubscription = function () {
        var _this = this;
        this.events.subscribe('user:publishAllSavedAddresses', function (allAddresses) {
            _this.addressesData = allAddresses;
            //console.log('addressesData', this.addressesData);
            _this.showLoader = false;
        });
        this.events.subscribe('user:deleteAddressSuccess', function () {
            _this.loading.dismiss();
            _this.presentAlert('Address deleted successfully');
        });
    };
    UserAddressesPage.prototype.goToPage = function (page) {
        var navigationExtras = {
            state: {
                addressLength: this.addressesData.length,
            }
        };
        this.router.navigate([page], navigationExtras);
    };
    UserAddressesPage.prototype.editAddress = function (address) {
        var navigationExtras = {
            state: {
                addressData: address,
                addressLength: this.addressesData.length,
            }
        };
        this.router.navigate(['new-address'], navigationExtras);
    };
    UserAddressesPage.prototype.deleteAddress = function (address) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
                                duration: 5000
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        this.events.publish('user:deleteAddress', address);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserAddressesPage.prototype.deleteAlertConfirm = function (address) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Are you sure you want to delete this address?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        //console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Delete',
                                    handler: function () {
                                        //console.log('Confirm Okay');
                                        _this.deleteAddress(address);
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
    UserAddressesPage.prototype.presentAlert = function (msg, action) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: ['Ok']
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
    UserAddressesPage.prototype.goToChat = function (fromfab) {
        var _this = this;
        var userId = this.userService.getUserId();
        //console.log('uid in sc', userId);
        if (userId === '') {
            //console.log('in if of uid');
            this.router.navigate(['home']);
        }
        else {
            //console.log('in else of uid');
            this.storage.get('userRole').then(function (role) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                    if (role === 'admin') {
                        this.router.navigate(['admin-home']);
                    }
                    else {
                        this.router.navigate(['chat-bot']);
                    }
                    return [2 /*return*/];
                });
            }); });
        }
    };
    UserAddressesPage.prototype.removeSubscription = function () {
        this.events.unsubscribe('user:publishAllSavedAddresses');
        this.events.unsubscribe('user:deleteAddressSuccess');
    };
    UserAddressesPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"] },
        { type: _services_user_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"] }
    ]; };
    UserAddressesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-user-addresses',
            template: __webpack_require__(/*! raw-loader!./user-addresses.page.html */ "./node_modules/raw-loader/index.js!./src/app/user-addresses/user-addresses.page.html"),
            styles: [__webpack_require__(/*! ./user-addresses.page.scss */ "./src/app/user-addresses/user-addresses.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"], _services_user_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"]])
    ], UserAddressesPage);
    return UserAddressesPage;
}());



/***/ })

}]);
//# sourceMappingURL=user-addresses-user-addresses-module-es5.js.map