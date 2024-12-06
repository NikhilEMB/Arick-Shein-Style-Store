(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-wallet-settings-wallet-settings-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/wallet-settings/wallet-settings.page.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/wallet-settings/wallet-settings.page.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Wallet / cashback's Setting</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs no-shadow no-border>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Settings</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Cashbacks</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <super-tabs-container>\r\n    <super-tab>\r\n      <ion-content class=\"content-wrapper\">\r\n        <div class=\"main-container\">\r\n        <div class=\"spinner\" *ngIf=\"showLoader; else walletDataLoaded;\">\r\n          <ion-spinner color=\"primary\"></ion-spinner>\r\n        </div>\r\n\r\n        <ng-template #walletDataLoaded>\r\n          <ion-list lines=\"none\">\r\n\r\n            <ion-item>\r\n              <ion-label>Active</ion-label>\r\n              <div class=\"toggle-btn\" slot=\"end\">\r\n                <label class=\"switch\" style=\"top: 0px;\">\r\n                  <input type=\"checkbox\" (click)=\"walletActiveToggle()\" [checked]=\"active\">\r\n                  <span class=\"slider round\"></span>\r\n                </label>\r\n              </div>\r\n            </ion-item>\r\n\r\n            <ion-item>\r\n              <ion-label class=\"ion-text-wrap\">Maximum amount in user's wallet</ion-label>\r\n              <ion-input slot=\"end\" class=\"input-box\" type=\"number\" [(ngModel)]=\"maxUserWalletAmnt\"></ion-input>\r\n            </ion-item>\r\n\r\n            <ion-item>\r\n              <ion-label class=\"ion-text-wrap\">Minimum order amount to use cashback</ion-label>\r\n              <ion-input slot=\"end\" class=\"input-box\" type=\"number\" [(ngModel)]=\"minOrderAmnt\"></ion-input>\r\n            </ion-item>\r\n\r\n            <ion-item>\r\n              <ion-label class=\"ion-text-wrap\">Maximum amount can be used from cashback in an order</ion-label>\r\n              <ion-input slot=\"end\" class=\"input-box\" type=\"number\" [(ngModel)]=\"maxWalletAmntPerOrder\"></ion-input>\r\n            </ion-item>\r\n\r\n            <ion-item>\r\n              <ion-label class=\"ion-text-wrap\">Amount as Cashback for new users</ion-label>\r\n              <ion-input slot=\"end\" class=\"input-box\" type=\"number\" [(ngModel)]=\"newUserWalletAmnt\"></ion-input>\r\n            </ion-item>\r\n\r\n            <div class=\"btn-wrap\">\r\n              <ion-button (click)=\"addWalletAmountAlert()\" fill=\"outline\" shape=\"round\">\r\n                add money to all user's wallet\r\n              </ion-button>\r\n            </div>\r\n\r\n          </ion-list>\r\n        </ng-template>\r\n        <div class=\"page-footer\">\r\n          <ion-button (click)=\"saveWalletSettings()\"shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n            <i class=\"flaticon-null-20 margin-icon\"></i>\r\n            Save\r\n          </ion-button>\r\n        </div>\r\n      </div>\r\n      </ion-content>\r\n      <!-- <ion-footer no-border class=\"page-footer\">\r\n        <div class=\"main-container\">\r\n          <ion-button (click)=\"saveWalletSettings()\"shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n            <i class=\"flaticon-null-20 margin-icon\"></i>\r\n            Save\r\n          </ion-button>\r\n        </div>\r\n      </ion-footer> -->\r\n    </super-tab>\r\n\r\n    <super-tab>\r\n      <ion-content class=\"content-wrapper\">\r\n        <div class=\"main-container\">\r\n        <div class=\"spinner\" *ngIf=\"showCashbackLoader; else cashbacksListLoaded;\">\r\n          <ion-spinner color=\"primary\"></ion-spinner>\r\n        </div>\r\n        <ion-row class=\"btn-wrap\">\r\n          <ion-button (click)=\"addCashbackAlert()\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n            Add Cashback\r\n          </ion-button>\r\n        </ion-row>\r\n        <ng-template #cashbacksListLoaded>\r\n          <div *ngIf=\"!cashbacks.length; else cashbacksHasLength;\" class=\"no-cashbacks\">\r\n            No data in Cashback List\r\n          </div>\r\n          <ng-template #cashbacksHasLength>\r\n            <ion-list lines=\"none\">\r\n              <div style=\"text-align: center;\">\r\n                <ion-label>Cashback List</ion-label>\r\n              </div>\r\n              <div *ngFor=\"let cb of cashbacks; let i = index;\">\r\n                <ion-item>\r\n                  <ion-label>Cashback {{i + 1}}</ion-label>\r\n                  <ion-icon name=\"trash\" (click)=\"deleteCashbackConfirm(cb.id)\"></ion-icon>\r\n                </ion-item>\r\n                <ion-item>\r\n                  <ion-label class=\"ion-text-wrap\">Order Amount</ion-label>\r\n                  <ion-input slot=\"end\" class=\"input-box\" [value]=\"cb.orderAmount\" readOnly (click)=\"showEditToast()\"></ion-input>\r\n                </ion-item>\r\n                <ion-item>\r\n                  <ion-label class=\"ion-text-wrap\">Cashback</ion-label>\r\n                  <ion-input slot=\"end\" class=\"input-box\" [value]=\"cb.cashback\" readOnly (click)=\"showEditToast()\"></ion-input>\r\n                </ion-item>\r\n                <ion-item>\r\n                  <ion-label class=\"ion-text-wrap\">No. of times cashback issued to a user</ion-label>\r\n                  <ion-input slot=\"end\" class=\"input-box\" [value]=\"cb.perUser\" readOnly (click)=\"showEditToast()\"></ion-input>\r\n                </ion-item>\r\n                <ion-item-divider *ngIf=\"i !== (cashbacks.length - 1)\"></ion-item-divider>\r\n              </div>\r\n            </ion-list>\r\n          </ng-template>\r\n        </ng-template>\r\n        </div>\r\n      </ion-content>\r\n      <!-- <div class=\"footer-super-tabs\">\r\n        <ion-footer (click)=\"addCashbackAlert()\">\r\n          <ion-grid>\r\n            <ion-row class=\"ion-justify-content-center ion-align-items-center\">\r\n              <div class=\"app-footer-text\">\r\n                add new<span><i class=\"flaticon-null-20 app-footer-icon\"></i></span>\r\n              </div>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </ion-footer>\r\n      </div> -->\r\n    </super-tab>\r\n\r\n  </super-tabs-container>\r\n</super-tabs>\r\n\r\n"

/***/ }),

/***/ "./src/app/admin/wallet-settings/wallet-settings.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/admin/wallet-settings/wallet-settings.module.ts ***!
  \*****************************************************************/
/*! exports provided: WalletSettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletSettingsPageModule", function() { return WalletSettingsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _wallet_settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./wallet-settings.page */ "./src/app/admin/wallet-settings/wallet-settings.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm2015/ionic-super-tabs-angular.js");








const routes = [
    {
        path: '',
        component: _wallet_settings_page__WEBPACK_IMPORTED_MODULE_6__["WalletSettingsPage"]
    }
];
let WalletSettingsPageModule = class WalletSettingsPageModule {
};
WalletSettingsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"]
        ],
        declarations: [_wallet_settings_page__WEBPACK_IMPORTED_MODULE_6__["WalletSettingsPage"]]
    })
], WalletSettingsPageModule);



/***/ }),

/***/ "./src/app/admin/wallet-settings/wallet-settings.page.scss":
/*!*****************************************************************!*\
  !*** ./src/app/admin/wallet-settings/wallet-settings.page.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content-wrapper {\n  --padding-bottom: 50px;\n}\n\n.content-wrapper ion-list {\n  margin-top: 15px;\n}\n\n.content-wrapper ion-list ion-item ion-label {\n  font-size: 14px;\n}\n\n.content-wrapper ion-list ion-item {\n  margin-bottom: 10px;\n}\n\n.spinner {\n  text-align: center;\n  margin-top: 45%;\n}\n\n.input-box {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  margin-left: 5px;\n}\n\n:host .item-interactive.ion-valid {\n  --highlight-background: none;\n}\n\n:host .item-interactive.item-has-focus {\n  --highlight-background: none;\n}\n\n.page-footer {\n  text-align: center;\n}\n\n.no-cashbacks {\n  text-align: center;\n  opacity: 0.7;\n  font-size: 15px;\n  margin-top: 20%;\n}\n\n.btn-wrap {\n  margin: 26px auto;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vd2FsbGV0LXNldHRpbmdzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcd2FsbGV0LXNldHRpbmdzXFx3YWxsZXQtc2V0dGluZ3MucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi93YWxsZXQtc2V0dGluZ3Mvd2FsbGV0LXNldHRpbmdzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHNCQUFBO0FDQ0o7O0FEQ0E7RUFDSSxnQkFBQTtBQ0VKOztBREFBO0VBQ0ksZUFBQTtBQ0dKOztBRERBO0VBQ0ksbUJBQUE7QUNJSjs7QURGQTtFQUNJLGtCQUFBO0VBQ0EsZUFBQTtBQ0tKOztBREZBO0VBQ0ksc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FDS0o7O0FEREk7RUFDRSw0QkFBQTtBQ0lOOztBRENJO0VBQ0ksNEJBQUE7QUNFUjs7QURDQTtFQUNJLGtCQUFBO0FDRUo7O0FEQ0E7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBQ0VKOztBRENBO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtBQ0VKIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vd2FsbGV0LXNldHRpbmdzL3dhbGxldC1zZXR0aW5ncy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGVudC13cmFwcGVyIHtcclxuICAgIC0tcGFkZGluZy1ib3R0b206IDUwcHg7XHJcbn0gXHJcbi5jb250ZW50LXdyYXBwZXIgaW9uLWxpc3Qge1xyXG4gICAgbWFyZ2luLXRvcDogMTVweDtcclxufVxyXG4uY29udGVudC13cmFwcGVyIGlvbi1saXN0IGlvbi1pdGVtIGlvbi1sYWJlbCB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbn0gXHJcbi5jb250ZW50LXdyYXBwZXIgaW9uLWxpc3QgaW9uLWl0ZW0ge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufSBcclxuLnNwaW5uZXIge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbWFyZ2luLXRvcDogNDUlO1xyXG59XHJcblxyXG4uaW5wdXQtYm94IHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG59XHJcblxyXG46aG9zdCB7XHJcbiAgICAuaXRlbS1pbnRlcmFjdGl2ZS5pb24tdmFsaWR7XHJcbiAgICAgIC0taGlnaGxpZ2h0LWJhY2tncm91bmQ6IG5vbmU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuOmhvc3Qge1xyXG4gICAgLml0ZW0taW50ZXJhY3RpdmUuaXRlbS1oYXMtZm9jdXMge1xyXG4gICAgICAgIC0taGlnaGxpZ2h0LWJhY2tncm91bmQ6IG5vbmU7XHJcbiAgICB9XHJcbn1cclxuLnBhZ2UtZm9vdGVye1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4ubm8tY2FzaGJhY2tzIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG9wYWNpdHk6IC43O1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgbWFyZ2luLXRvcDogMjAlO1xyXG59XHJcblxyXG4uYnRuLXdyYXB7XHJcbiAgICBtYXJnaW46IDI2cHggYXV0bztcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufSIsIi5jb250ZW50LXdyYXBwZXIge1xuICAtLXBhZGRpbmctYm90dG9tOiA1MHB4O1xufVxuXG4uY29udGVudC13cmFwcGVyIGlvbi1saXN0IHtcbiAgbWFyZ2luLXRvcDogMTVweDtcbn1cblxuLmNvbnRlbnQtd3JhcHBlciBpb24tbGlzdCBpb24taXRlbSBpb24tbGFiZWwge1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5jb250ZW50LXdyYXBwZXIgaW9uLWxpc3QgaW9uLWl0ZW0ge1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uc3Bpbm5lciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogNDUlO1xufVxuXG4uaW5wdXQtYm94IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuXG46aG9zdCAuaXRlbS1pbnRlcmFjdGl2ZS5pb24tdmFsaWQge1xuICAtLWhpZ2hsaWdodC1iYWNrZ3JvdW5kOiBub25lO1xufVxuXG46aG9zdCAuaXRlbS1pbnRlcmFjdGl2ZS5pdGVtLWhhcy1mb2N1cyB7XG4gIC0taGlnaGxpZ2h0LWJhY2tncm91bmQ6IG5vbmU7XG59XG5cbi5wYWdlLWZvb3RlciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLm5vLWNhc2hiYWNrcyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgb3BhY2l0eTogMC43O1xuICBmb250LXNpemU6IDE1cHg7XG4gIG1hcmdpbi10b3A6IDIwJTtcbn1cblxuLmJ0bi13cmFwIHtcbiAgbWFyZ2luOiAyNnB4IGF1dG87XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/wallet-settings/wallet-settings.page.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/wallet-settings/wallet-settings.page.ts ***!
  \***************************************************************/
/*! exports provided: WalletSettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletSettingsPage", function() { return WalletSettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");




let WalletSettingsPage = class WalletSettingsPage {
    constructor(events, loadingController, alertController, toastController, router) {
        this.events = events;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.toastController = toastController;
        this.router = router;
        this.showLoader = true;
        this.showCashbackLoader = true;
        this.active = true;
        this.maxUserWalletAmnt = 10000;
        this.minOrderAmnt = 0;
        this.maxWalletAmntPerOrder = 1000;
        this.newUserWalletAmnt = 0;
        this.cashbacks = [];
    }
    ngOnInit() {
        this.initializeSubscriptions();
        this.events.publish('wallet:getWalletSettings');
        this.events.publish('wallet:getCashbackList');
    }
    ngOnDestroy() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('wallet:publishWalletSettings', (data) => {
            if (!this.isEmptyObj(data)) {
                this.active = typeof data.active !== 'undefined' ? data.active : true;
                this.maxUserWalletAmnt = data.maxUserWalletAmnt ? data.maxUserWalletAmnt : 10000;
                this.minOrderAmnt = data.minOrderAmnt ? data.minOrderAmnt : 0;
                this.maxWalletAmntPerOrder = data.maxWalletAmntPerOrder ? data.maxWalletAmntPerOrder : 1000;
                this.newUserWalletAmnt = data.newUserWalletAmnt ? data.newUserWalletAmnt : 0;
            }
            this.showLoader = false;
        });
        this.events.subscribe('wallet:saveWalletSettingsSuccess', () => {
            this.loading.dismiss();
            this.presentAlert('Wallet settings saved successfully!');
        });
        this.events.subscribe('wallet:publishCashbackList', (data) => {
            this.cashbacks = data;
            this.showCashbackLoader = false;
        });
        this.events.subscribe('wallet:addNewCashbackSuccess', () => {
            this.loading.dismiss();
            this.presentAlert('Cashback added successfully!');
        });
        this.events.subscribe('wallet:deleteCashbackSuccess', () => {
            this.loading.dismiss();
            this.presentAlert('Cashback deleted successfully!');
        });
        this.events.subscribe('wallet:addAmountToUsersByAdminSuccess', (msg) => {
            this.loading.dismiss();
            this.presentAlert(msg);
        });
    }
    isEmptyObj(object) {
        for (var key in object) {
            if (object.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    saveWalletSettings() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.maxUserWalletAmnt > 10000) {
                this.presentAlert('Maximum amount in user wallet should be less than or equal to Rs.10000');
            }
            else if (!this.maxUserWalletAmnt) {
                this.presentAlert('Please enter Maximum amount in user wallet');
            }
            else {
                const wallet = {
                    active: this.active,
                    maxUserWalletAmnt: this.maxUserWalletAmnt ? this.maxUserWalletAmnt : 10000,
                    minOrderAmnt: this.minOrderAmnt ? this.minOrderAmnt : 0,
                    maxWalletAmntPerOrder: this.maxWalletAmntPerOrder ? this.maxWalletAmntPerOrder : 1000,
                    newUserWalletAmnt: this.newUserWalletAmnt ? this.newUserWalletAmnt : 0
                };
                yield this.presentLoading('Please wait...', 5000);
                this.events.publish('wallet:saveWalletSettings', wallet);
            }
        });
    }
    walletActiveToggle() {
        this.active = !this.active;
    }
    addNewCashback(cashbackData) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading('Adding new cashback', 5000);
            this.events.publish('wallet:addNewCashback', cashbackData);
        });
    }
    addCashbackAlert() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.cashbackAlert = yield this.alertController.create({
                subHeader: 'Add cashback',
                inputs: [
                    {
                        name: 'orderAmnt',
                        type: 'number',
                        placeholder: 'Enter order amount'
                    },
                    {
                        name: 'cashback',
                        type: 'number',
                        placeholder: 'Enter cashback amount'
                    },
                    {
                        name: 'perUser',
                        type: 'number',
                        placeholder: 'No. of times it issued to a user'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Add',
                        handler: (cashbackData) => {
                            if (!parseInt(cashbackData.orderAmnt) || !parseInt(cashbackData.cashback) || !parseInt(cashbackData.perUser)) {
                                this.presentToast('Please enter valid data');
                            }
                            else {
                                this.addNewCashback(cashbackData);
                            }
                        }
                    }
                ]
            });
            yield this.cashbackAlert.present();
        });
    }
    deleteCashbackConfirm(cid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Are you sure you want to delete this cashback?',
                buttons: [
                    {
                        text: 'No',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            //console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Yes',
                        handler: () => {
                            this.deleteCashback(cid);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    deleteCashback(cid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading('Please wait...', 5000);
            this.events.publish('wallet:deleteCashback', cid);
        });
    }
    showEditToast() {
        this.presentToast('Cashback data can not be edit. Delete and add desired cashback.');
    }
    addAmountToUsersByAdmin(amount) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading('Adding money...', 20000);
            this.events.publish('wallet:addAmountToUsersByAdmin', amount);
        });
    }
    addWalletAmountAlert() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                subHeader: 'Add money',
                inputs: [
                    {
                        name: 'amount',
                        type: 'number',
                        placeholder: 'Enter amount'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Add',
                        handler: (amnt) => {
                            if (!amnt.amount) {
                                this.presentToast('Please enter valid amount');
                            }
                            else {
                                this.addAmountToUsersByAdmin(parseInt(amnt.amount));
                            }
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    presentAlert(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
    presentLoading(msg, duration) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: msg,
                duration: duration
            });
            yield this.loading.present();
        });
    }
    presentToast(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: msg,
                duration: 2000
            });
            toast.present();
        });
    }
    removeSubscriptions() {
        this.events.unsubscribe('wallet:publishWalletSettings');
        this.events.unsubscribe('wallet:saveWalletSettingsSuccess');
        this.events.unsubscribe('wallet:publishCashbackList');
        this.events.unsubscribe('wallet:addNewCashbackSuccess');
        this.events.unsubscribe('wallet:deleteCashbackSuccess');
        this.events.unsubscribe('wallet:addAmountToUsersByAdminSuccess');
    }
};
WalletSettingsPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
WalletSettingsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-wallet-settings',
        template: __webpack_require__(/*! raw-loader!./wallet-settings.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/wallet-settings/wallet-settings.page.html"),
        styles: [__webpack_require__(/*! ./wallet-settings.page.scss */ "./src/app/admin/wallet-settings/wallet-settings.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], WalletSettingsPage);



/***/ })

}]);
//# sourceMappingURL=admin-wallet-settings-wallet-settings-module-es2015.js.map