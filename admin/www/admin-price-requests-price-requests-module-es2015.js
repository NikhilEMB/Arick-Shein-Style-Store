(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-price-requests-price-requests-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/price-requests/price-requests.page.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/price-requests/price-requests.page.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border no-shadow>\r\n  <ion-toolbar class=\"toolbar\" mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Price Requests</ion-title>\r\n    <ion-buttons slot=\"end\">\r\n      <ion-button (click)=\"showSearch = !showSearch\">\r\n        <i class=\"flaticon-null-23\"></i>\r\n      </ion-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n  <div class=\"bottom-border\" [hidden]=\"!showSearch\">\r\n    <ion-grid class=\"search-product margining\">\r\n      <div class=\"message-box\">\r\n        <ion-row class=\"ion-align-items-center\">\r\n          <div>\r\n            <i class=\"flaticon-null-22\"></i>\r\n          </div>\r\n          <div class=\"search-input\">\r\n            <ion-input type=\"text\" placeholder=\"Search\" [(ngModel)]=\"searchRequest\" clearInput></ion-input>\r\n          </div>\r\n        </ion-row>\r\n      </div>\r\n    </ion-grid>\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n  <div *ngIf=\"showLoader;else requestsLoaded;\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n\r\n  <ng-template #requestsLoaded>\r\n    <div class=\"no-data\" *ngIf=\"!allRequests.length\" text-center>\r\n      <img src=\"assets/img/no-user.png\" alt=\"\">\r\n      <h6>No price requests</h6>\r\n    </div>\r\n    <ion-grid *ngIf=\"allRequests.length > 0\" class=\"grid-wrapper\">\r\n      <ion-row *ngFor=\"let req of allRequests | filter: searchRequest; let i = index;\" class=\"ion-align-items-center req-row\">\r\n        <ion-col size=\"3\">\r\n          <ion-avatar class=\"pic-avatar\">\r\n            <img img-preloader=\"{{req.profilePic}}\">\r\n          </ion-avatar>\r\n        </ion-col>\r\n        <ion-col size=\"6\">\r\n          <p>\r\n            {{req.name}}\r\n          </p>\r\n          <p>\r\n            ({{req.phoneNo}})\r\n          </p>\r\n        </ion-col>\r\n        <ion-col size=\"3\">\r\n          <div class=\"toggle-btn\">\r\n            <label class=\"switch\" style=\"top: 0px\">\r\n              <input type=\"checkbox\" (click)=\"changePriceReqActive(req.active, req.id)\"\r\n                [checked]=\"req.active\">\r\n              <span class=\"slider round\"></span>\r\n            </label>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </ng-template>\r\n\r\n</div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/price-requests/price-requests.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/price-requests/price-requests.module.ts ***!
  \***************************************************************/
/*! exports provided: PriceRequestsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriceRequestsPageModule", function() { return PriceRequestsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _price_requests_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./price-requests.page */ "./src/app/admin/price-requests/price-requests.page.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.js");
/* harmony import */ var src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/directives/application-directives.module */ "./src/app/directives/application-directives.module.ts");









const routes = [
    {
        path: '',
        component: _price_requests_page__WEBPACK_IMPORTED_MODULE_6__["PriceRequestsPage"]
    }
];
let PriceRequestsPageModule = class PriceRequestsPageModule {
};
PriceRequestsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__["Ng2SearchPipeModule"],
            src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_8__["ApplicationDirectivesModule"]
        ],
        declarations: [_price_requests_page__WEBPACK_IMPORTED_MODULE_6__["PriceRequestsPage"]]
    })
], PriceRequestsPageModule);



/***/ }),

/***/ "./src/app/admin/price-requests/price-requests.page.scss":
/*!***************************************************************!*\
  !*** ./src/app/admin/price-requests/price-requests.page.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bottom-border {\n  border-bottom: 1px solid #ccc;\n}\n\n.search-product {\n  border: 1px solid #ccc;\n  border-radius: 25px;\n}\n\n.margining {\n  margin-top: 10px;\n  margin-right: 20px;\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n\n.message-box {\n  position: relative;\n}\n\n.flaticon-null-22::before {\n  margin: 15px;\n  color: #ccc;\n}\n\nion-input {\n  --padding-bottom: 3px;\n  --padding-top: 5px;\n  --padding-start: 10px;\n  --padding-end: 10px;\n  width: 80vw;\n}\n\n:host .item-interactive.ion-valid {\n  --highlight-background: var(--ion-color-primary);\n}\n\n.spinner {\n  text-align: center;\n  margin-top: 50%;\n}\n\n.no-data {\n  margin: 0;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  left: 50%;\n  margin-left: -65px;\n}\n\n.no-data img {\n  width: 130px;\n}\n\n.pic-avatar {\n  width: 50px;\n  height: 50px;\n}\n\n.grid-wrapper {\n  padding-left: 0px;\n  padding-right: 0px;\n  padding-top: 0px;\n  text-align: center;\n}\n\n.req-row {\n  background: white;\n  border-bottom: 1px solid #dedede;\n}\n\n.flaticon-null-23 {\n  color: white;\n  font-size: 16px;\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vcHJpY2UtcmVxdWVzdHMvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxwcmljZS1yZXF1ZXN0c1xccHJpY2UtcmVxdWVzdHMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9wcmljZS1yZXF1ZXN0cy9wcmljZS1yZXF1ZXN0cy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSw2QkFBQTtBQ0NKOztBREVFO0VBQ0Usc0JBQUE7RUFDQSxtQkFBQTtBQ0NKOztBREVFO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUNDSjs7QURFRTtFQUNFLGtCQUFBO0FDQ0o7O0FERUU7RUFDRSxZQUFBO0VBQ0EsV0FBQTtBQ0NKOztBREVFO0VBQ0UscUJBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FDQ0o7O0FER0k7RUFDRSxnREFBQTtBQ0FOOztBRElFO0VBQ0ksa0JBQUE7RUFDQSxlQUFBO0FDRE47O0FESUU7RUFDRSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBRUEsbUNBQUE7VUFBQSwyQkFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtBQ0RKOztBRElFO0VBQ0UsWUFBQTtBQ0RKOztBRElFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUNESjs7QURJRTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FDREo7O0FESUU7RUFDRSxpQkFBQTtFQUNBLGdDQUFBO0FDREo7O0FESUU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FDREoiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9wcmljZS1yZXF1ZXN0cy9wcmljZS1yZXF1ZXN0cy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYm90dG9tLWJvcmRlciB7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcclxuICB9XHJcbiAgXHJcbiAgLnNlYXJjaC1wcm9kdWN0IHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xyXG4gIH1cclxuICBcclxuICAubWFyZ2luaW5nIHtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5tZXNzYWdlLWJveCB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgfVxyXG4gIFxyXG4gIC5mbGF0aWNvbi1udWxsLTIyOjpiZWZvcmUge1xyXG4gICAgbWFyZ2luOiAxNXB4O1xyXG4gICAgY29sb3I6ICNjY2M7XHJcbiAgfVxyXG4gIFxyXG4gIGlvbi1pbnB1dCB7XHJcbiAgICAtLXBhZGRpbmctYm90dG9tOiAzcHg7XHJcbiAgICAtLXBhZGRpbmctdG9wOiA1cHg7XHJcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDEwcHg7XHJcbiAgICAtLXBhZGRpbmctZW5kOiAxMHB4O1xyXG4gICAgd2lkdGg6IDgwdndcclxuICB9XHJcbiAgXHJcbiAgOmhvc3Qge1xyXG4gICAgLml0ZW0taW50ZXJhY3RpdmUuaW9uLXZhbGlkIHtcclxuICAgICAgLS1oaWdobGlnaHQtYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnNwaW5uZXIge1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIG1hcmdpbi10b3A6IDUwJTtcclxuICB9XHJcblxyXG4gIC5uby1kYXRhIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIG1hcmdpbi1sZWZ0OiAtNjVweDtcclxuICB9XHJcbiAgXHJcbiAgLm5vLWRhdGEgaW1nIHtcclxuICAgIHdpZHRoOiAxMzBweDtcclxuICB9XHJcblxyXG4gIC5waWMtYXZhdGFyIHtcclxuICAgIHdpZHRoOiA1MHB4O1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG4gIH1cclxuXHJcbiAgLmdyaWQtd3JhcHBlciB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDBweDtcclxuICAgIHBhZGRpbmctdG9wOiAwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXJcclxuICB9XHJcblxyXG4gIC5yZXEtcm93IHtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZWRlZGU7XHJcbiAgfVxyXG5cclxuICAuZmxhdGljb24tbnVsbC0yM3tcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkXHJcbiAgfSIsIi5ib3R0b20tYm9yZGVyIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XG59XG5cbi5zZWFyY2gtcHJvZHVjdCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XG59XG5cbi5tYXJnaW5pbmcge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4ubWVzc2FnZS1ib3gge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5mbGF0aWNvbi1udWxsLTIyOjpiZWZvcmUge1xuICBtYXJnaW46IDE1cHg7XG4gIGNvbG9yOiAjY2NjO1xufVxuXG5pb24taW5wdXQge1xuICAtLXBhZGRpbmctYm90dG9tOiAzcHg7XG4gIC0tcGFkZGluZy10b3A6IDVweDtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxMHB4O1xuICAtLXBhZGRpbmctZW5kOiAxMHB4O1xuICB3aWR0aDogODB2dztcbn1cblxuOmhvc3QgLml0ZW0taW50ZXJhY3RpdmUuaW9uLXZhbGlkIHtcbiAgLS1oaWdobGlnaHQtYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xufVxuXG4uc3Bpbm5lciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogNTAlO1xufVxuXG4ubm8tZGF0YSB7XG4gIG1hcmdpbjogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBsZWZ0OiA1MCU7XG4gIG1hcmdpbi1sZWZ0OiAtNjVweDtcbn1cblxuLm5vLWRhdGEgaW1nIHtcbiAgd2lkdGg6IDEzMHB4O1xufVxuXG4ucGljLWF2YXRhciB7XG4gIHdpZHRoOiA1MHB4O1xuICBoZWlnaHQ6IDUwcHg7XG59XG5cbi5ncmlkLXdyYXBwZXIge1xuICBwYWRkaW5nLWxlZnQ6IDBweDtcbiAgcGFkZGluZy1yaWdodDogMHB4O1xuICBwYWRkaW5nLXRvcDogMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5yZXEtcm93IHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGVkZWRlO1xufVxuXG4uZmxhdGljb24tbnVsbC0yMyB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/price-requests/price-requests.page.ts":
/*!*************************************************************!*\
  !*** ./src/app/admin/price-requests/price-requests.page.ts ***!
  \*************************************************************/
/*! exports provided: PriceRequestsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriceRequestsPage", function() { return PriceRequestsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");





let PriceRequestsPage = class PriceRequestsPage {
    constructor(events, loadingController, alertController, router, configService) {
        this.events = events;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.router = router;
        this.configService = configService;
        this.showSearch = false;
        this.searchRequest = '';
        this.allRequests = [];
        this.showLoader = true;
        this.isPriceReqFeature = false;
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.isPriceReqFeature = this.configService.environment.priceReqFeature;
            if (this.isPriceReqFeature == false) {
                const alert = yield this.alertController.create({
                    message: "Sorry, this feature is not available. Please upgrade your plan for access",
                    buttons: ['ok']
                });
                alert.onWillDismiss().then(() => {
                    this.router.navigate(['admin-home']);
                });
                yield alert.present();
            }
            this.initializeSubscriptions();
            this.events.publish('price-req:getAllPriceRequests');
        });
    }
    initializeSubscriptions() {
        this.events.subscribe('price-req:publishAllPriceRequests', (requests) => {
            //console.log('requests', requests);
            this.allRequests = requests;
            this.showLoader = false;
        });
        this.events.subscribe('price-req:rejectPriceRequestSuccess', () => {
            this.loading.dismiss();
            this.presentAlert('Prices are now inactive for this user.');
        });
        this.events.subscribe('price-req:acceptPriceRequestSuccess', (msg) => {
            this.loading.dismiss();
            this.presentAlert(msg);
        });
    }
    changePriceReqActive(status, uid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (status) {
                yield this.presentLoading('Please wait...', 10000);
                this.events.publish('price-req:rejectPriceRequest', uid);
            }
            else {
                yield this.presentLoading('Please wait...', 10000);
                this.events.publish('price-req:acceptPriceRequest', uid);
            }
        });
    }
    presentLoading(msg, duration) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: msg,
                duration: duration,
            });
            yield this.loading.present();
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
    ionViewWillLeave() {
        this.showSearch = false;
        this.removeSubscriptions();
    }
    removeSubscriptions() {
        this.events.unsubscribe('price-req:publishAllPriceRequests');
        this.events.unsubscribe('price-req:rejectPriceRequestSuccess');
        this.events.unsubscribe('price-req:acceptPriceRequestSuccess');
        this.events.publish('price-req:removePriceRequestsSubs');
    }
};
PriceRequestsPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_3__["ConfigService"] }
];
PriceRequestsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-price-requests',
        template: __webpack_require__(/*! raw-loader!./price-requests.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/price-requests/price-requests.page.html"),
        styles: [__webpack_require__(/*! ./price-requests.page.scss */ "./src/app/admin/price-requests/price-requests.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
        src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_3__["ConfigService"]])
], PriceRequestsPage);



/***/ })

}]);
//# sourceMappingURL=admin-price-requests-price-requests-module-es2015.js.map