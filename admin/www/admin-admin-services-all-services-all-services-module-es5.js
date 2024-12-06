(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-services-all-services-all-services-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-services/all-services/all-services.page.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-services/all-services/all-services.page.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\" defaultHref=\"admin-home\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n      <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"newService()\">\r\n        <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n        Add new Service\r\n      </ion-button>\r\n  </div>\r\n</ion-header>\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n  <div class=\"spinner\" *ngIf=\"showLoader; else dataLoaded;\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n  <ng-template #dataLoaded>\r\n    <br>\r\n    <div class=\"content-alignment sub-settings-fields\">\r\n      <div>Active</div>&nbsp;&nbsp;&nbsp;\r\n      <div class=\"toggle-btn\">\r\n        <label class=\"switch\">\r\n          <input type=\"checkbox\" (click)=\"changeStatus()\" [checked]=\"isActive\">\r\n          <span class=\"slider round\"></span>\r\n        </label>\r\n      </div>\r\n    </div>\r\n   \r\n\r\n    <ng-container *ngIf=\"services.length > 0; else noServices;\">\r\n      <div class=\"list-header list-header-services\">\r\n        <ion-grid class=\"ion-no-padding\">\r\n          <ion-row >\r\n            <ion-col class=\"img\">\r\n              <p>image</p>\r\n            </ion-col>\r\n            <ion-col class=\"name\">\r\n              <p>name</p>\r\n            </ion-col>\r\n            <ion-col class=\"date\">\r\n              <p>name</p>\r\n            </ion-col>\r\n            <ion-col class=\"action\">\r\n              <p>Action</p>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n        </div>\r\n        <div class=\"list-container\">\r\n      <ion-list class=\"ion-no-padding row-border\">\r\n          \r\n            <ion-item class=\"ion-no-padding\"  *ngFor=\"let service of services; let i = index\">\r\n              <ion-grid class=\"ion-no-padding\">\r\n                <ion-row>\r\n                  <ion-col class=\"img\">\r\n                    <ion-thumbnail style=\"margin-left: 5%;\" class=\"thumbnail\">\r\n                      <img *ngIf=\"service.banner && !service.banner.thumb && service.banner.url\" img-preloader=\"{{service.banner.url}}\">\r\n                      <img *ngIf=\"service.banner && service.banner.thumb\" img-preloader=\"{{service.banner.thumb}}\">\r\n                      <img *ngIf=\"service.banner && !service.banner.thumb && !service.banner.url\" src=\"assets/img/img-preloader.png\">\r\n                    </ion-thumbnail>\r\n                  </ion-col>\r\n                  <ion-col class=\"name\">\r\n                    <p class=\"ion-text-capitalize\">{{service.name}}</p>\r\n                  </ion-col>\r\n                  <ion-col class=\"date\">\r\n                    <p>{{getDateTimeFormat(service.createdAt.toDate())}}</p>\r\n                  </ion-col>\r\n                  <ion-col class=\"action\">\r\n                    <ion-button class=\"action-btn\" fill=\"clear\"  (click)=\"editService(service)\">\r\n                      <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\"></i>\r\n                    </ion-button>\r\n                    <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"deleteServiceConfirm(service.id)\">\r\n                      <i class=\"flaticon-null-21\" slot=\"icon-only\"></i>\r\n                    </ion-button>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </ion-item>\r\n          \r\n      </ion-list>\r\n\r\n     \r\n\r\n    </div>\r\n    </ng-container>\r\n\r\n    <ng-template #noServices>\r\n      <div class=\"no-data ion-text-center\">\r\n        <img src=\"assets/img/no-category.png\" alt=\"\">\r\n        <h6>No Services</h6>\r\n      </div>\r\n    </ng-template>\r\n  </ng-template>\r\n</div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/admin-services/all-services/all-services.module.ts":
/*!**************************************************************************!*\
  !*** ./src/app/admin/admin-services/all-services/all-services.module.ts ***!
  \**************************************************************************/
/*! exports provided: AllServicesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllServicesPageModule", function() { return AllServicesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _directives_application_directives_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../directives/application-directives.module */ "./src/app/directives/application-directives.module.ts");
/* harmony import */ var _components_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../components/shared.module */ "./src/app/components/shared.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _all_services_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./all-services.page */ "./src/app/admin/admin-services/all-services/all-services.page.ts");









var routes = [
    {
        path: '',
        component: _all_services_page__WEBPACK_IMPORTED_MODULE_8__["AllServicesPage"]
    }
];
var AllServicesPageModule = /** @class */ (function () {
    function AllServicesPageModule() {
    }
    AllServicesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forChild(routes),
                _components_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                _directives_application_directives_module__WEBPACK_IMPORTED_MODULE_1__["ApplicationDirectivesModule"]
            ],
            declarations: [_all_services_page__WEBPACK_IMPORTED_MODULE_8__["AllServicesPage"]]
        })
    ], AllServicesPageModule);
    return AllServicesPageModule;
}());



/***/ }),

/***/ "./src/app/admin/admin-services/all-services/all-services.page.scss":
/*!**************************************************************************!*\
  !*** ./src/app/admin/admin-services/all-services/all-services.page.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ion-thumbnail {\n  width: 100%;\n  height: auto;\n}\n\nion-col.img {\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.name {\n  width: calc(100% - 310px);\n  max-width: calc(100% - 300px);\n}\n\nion-col.action {\n  width: 128px;\n  max-width: 100px;\n}\n\nion-col.date {\n  width: 150;\n  max-width: 150;\n}\n\n.product-active {\n  background-color: green;\n  width: 8px;\n  height: 8px;\n  min-width: 8px;\n  border-radius: 30px;\n  border: 1px solid green;\n  margin-right: 10%;\n}\n\n.product-inactive {\n  background-color: red;\n  width: 8px;\n  height: 8px;\n  min-width: 8px;\n  border-radius: 30px;\n  border: 1px solid red;\n  margin-right: 10%;\n}\n\n.list-header-services {\n  position: relative;\n}\n\n.content-alignment {\n  display: -webkit-box;\n  display: flex;\n  margin: 0% auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tc2VydmljZXMvYWxsLXNlcnZpY2VzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcYWRtaW4tc2VydmljZXNcXGFsbC1zZXJ2aWNlc1xcYWxsLXNlcnZpY2VzLnBhZ2Uuc2NzcyIsInNyYy9hcHAvYWRtaW4vYWRtaW4tc2VydmljZXMvYWxsLXNlcnZpY2VzL2FsbC1zZXJ2aWNlcy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0VBQ0UsWUFBQTtBQ0NOOztBREVFO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0FDQ0o7O0FEQ0U7RUFDRSx5QkFBQTtFQUNBLDZCQUFBO0FDRUo7O0FEQUU7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUNHSjs7QURERTtFQUNFLFVBQUE7RUFDQSxjQUFBO0FDSUo7O0FEREU7RUFDRSx1QkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxpQkFBQTtBQ0lKOztBREZFO0VBQ0UscUJBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7QUNLSjs7QURIRTtFQUNFLGtCQUFBO0FDTUo7O0FERkE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxlQUFBO0FDS0YiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9hZG1pbi1zZXJ2aWNlcy9hbGwtc2VydmljZXMvYWxsLXNlcnZpY2VzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pb24tdGh1bWJuYWlse1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGhlaWdodDogYXV0bztcclxuICB9XHJcbiAgXHJcbiAgaW9uLWNvbC5pbWd7XHJcbiAgICB3aWR0aDogMTAwcHg7XHJcbiAgICBtYXgtd2lkdGg6IDEwMHB4O1xyXG4gIH1cclxuICBpb24tY29sLm5hbWV7XHJcbiAgICB3aWR0aDogY2FsYygxMDAlIC0gMzEwcHgpO1xyXG4gICAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSAzMDBweCk7XHJcbiAgfVxyXG4gIGlvbi1jb2wuYWN0aW9ue1xyXG4gICAgd2lkdGg6IDEyOHB4O1xyXG4gICAgbWF4LXdpZHRoOiAxMDBweDtcclxuICB9XHJcbiAgaW9uLWNvbC5kYXRle1xyXG4gICAgd2lkdGg6IDE1MDtcclxuICAgIG1heC13aWR0aDogMTUwO1xyXG4gIH1cclxuICBcclxuICAucHJvZHVjdC1hY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XHJcbiAgICB3aWR0aDogOHB4O1xyXG4gICAgaGVpZ2h0OiA4cHg7XHJcbiAgICBtaW4td2lkdGg6IDhweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBncmVlbjtcclxuICAgIG1hcmdpbi1yaWdodDogMTAlO1xyXG4gIH1cclxuICAucHJvZHVjdC1pbmFjdGl2ZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XHJcbiAgICB3aWR0aDogOHB4O1xyXG4gICAgaGVpZ2h0OiA4cHg7XHJcbiAgICBtaW4td2lkdGg6IDhweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwJTtcclxuICB9XHJcbiAgLmxpc3QtaGVhZGVyLXNlcnZpY2Vze1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIH1cclxuICBcclxuXHJcbi5jb250ZW50LWFsaWdubWVudHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIG1hcmdpbjogMCUgYXV0b1xyXG59XHJcblxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gICIsIi5pb24tdGh1bWJuYWlsIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn1cblxuaW9uLWNvbC5pbWcge1xuICB3aWR0aDogMTAwcHg7XG4gIG1heC13aWR0aDogMTAwcHg7XG59XG5cbmlvbi1jb2wubmFtZSB7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAzMTBweCk7XG4gIG1heC13aWR0aDogY2FsYygxMDAlIC0gMzAwcHgpO1xufVxuXG5pb24tY29sLmFjdGlvbiB7XG4gIHdpZHRoOiAxMjhweDtcbiAgbWF4LXdpZHRoOiAxMDBweDtcbn1cblxuaW9uLWNvbC5kYXRlIHtcbiAgd2lkdGg6IDE1MDtcbiAgbWF4LXdpZHRoOiAxNTA7XG59XG5cbi5wcm9kdWN0LWFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xuICB3aWR0aDogOHB4O1xuICBoZWlnaHQ6IDhweDtcbiAgbWluLXdpZHRoOiA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyZWVuO1xuICBtYXJnaW4tcmlnaHQ6IDEwJTtcbn1cblxuLnByb2R1Y3QtaW5hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gIHdpZHRoOiA4cHg7XG4gIGhlaWdodDogOHB4O1xuICBtaW4td2lkdGg6IDhweDtcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xuICBtYXJnaW4tcmlnaHQ6IDEwJTtcbn1cblxuLmxpc3QtaGVhZGVyLXNlcnZpY2VzIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uY29udGVudC1hbGlnbm1lbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBtYXJnaW46IDAlIGF1dG87XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/admin-services/all-services/all-services.page.ts":
/*!************************************************************************!*\
  !*** ./src/app/admin/admin-services/all-services/all-services.page.ts ***!
  \************************************************************************/
/*! exports provided: AllServicesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllServicesPage", function() { return AllServicesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);





var AllServicesPage = /** @class */ (function () {
    function AllServicesPage(events, router, loadingController, alertController, toastController) {
        this.events = events;
        this.router = router;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.toastController = toastController;
        this.isActive = false;
        this.services = [];
        this.showLoader = true;
    }
    AllServicesPage.prototype.ngOnInit = function () {
        this.initializeSubscriptions();
        this.events.publish('services-feature:getAllServices');
        this.events.publish('services-feature:getServicesActiveStatus');
    };
    AllServicesPage.prototype.getDateTimeFormat = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_4__(date).format('MMM D, YYYY hh:mm a');
    };
    AllServicesPage.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    AllServicesPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('services-feature:publishAllServices', function (services) {
            _this.services = services;
            _this.showLoader = false;
        });
        this.events.subscribe('services-feature:publishServicesActiveStatus', function (status) {
            if (!_this.isEmptyObj(status)) {
                _this.isActive = typeof status.isActive !== 'undefined' ? status.isActive : false;
            }
        });
        this.events.subscribe('services-feature:statusChangeSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentToast('Services active status changed successfully.');
        });
        this.events.subscribe('services-feature:deleteServiceSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('Service has been deleted successfully.');
        });
    };
    AllServicesPage.prototype.isEmptyObj = function (object) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    };
    AllServicesPage.prototype.changeStatus = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isActive) return [3 /*break*/, 2];
                        this.isActive = false;
                        return [4 /*yield*/, this.presentLoading('Changing Status...', 5000)];
                    case 1:
                        _a.sent();
                        this.events.publish('services-feature:changeServiceStatus', false);
                        return [3 /*break*/, 4];
                    case 2:
                        this.isActive = true;
                        return [4 /*yield*/, this.presentLoading('Changing Status...', 5000)];
                    case 3:
                        _a.sent();
                        this.events.publish('services-feature:changeServiceStatus', true);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllServicesPage.prototype.deleteServiceConfirm = function (sid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Are you sure you want to delete this service?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Delete',
                                    handler: function () {
                                        console.log('Confirm Okay');
                                        _this.deleteService(sid);
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
    AllServicesPage.prototype.deleteService = function (sid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading('Deleting Service...', 5000)];
                    case 1:
                        _a.sent();
                        this.events.publish('services-feature:deleteService', sid);
                        return [2 /*return*/];
                }
            });
        });
    };
    AllServicesPage.prototype.editService = function (data) {
        var navigationExtras = {
            state: {
                serviceData: data
            }
        };
        this.router.navigate(['create-service'], navigationExtras);
    };
    AllServicesPage.prototype.newService = function () {
        this.router.navigate(['create-service']);
    };
    AllServicesPage.prototype.presentLoading = function (msg, drn) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: msg,
                                duration: drn
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
    AllServicesPage.prototype.presentToast = function (msg) {
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
    AllServicesPage.prototype.presentAlert = function (msg) {
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
    AllServicesPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('services-feature:publishAllServices');
        this.events.unsubscribe('services-feature:publishServicesActiveStatus');
        this.events.unsubscribe('services-feature:statusChangeSuccess');
        this.events.unsubscribe('services-feature:deleteServiceSuccess');
    };
    AllServicesPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] }
    ]; };
    AllServicesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-all-services',
            template: __webpack_require__(/*! raw-loader!./all-services.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-services/all-services/all-services.page.html"),
            styles: [__webpack_require__(/*! ./all-services.page.scss */ "./src/app/admin/admin-services/all-services/all-services.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"]])
    ], AllServicesPage);
    return AllServicesPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-services-all-services-all-services-module-es5.js.map