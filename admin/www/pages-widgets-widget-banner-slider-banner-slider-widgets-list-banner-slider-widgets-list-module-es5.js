(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-widgets-widget-banner-slider-banner-slider-widgets-list-banner-slider-widgets-list-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/widget-banner-slider/banner-slider-widgets-list/banner-slider-widgets-list.page.html":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/widgets/widget-banner-slider/banner-slider-widgets-list/banner-slider-widgets-list.page.html ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\" defaultHref=\"homepage-setting\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\" *ngIf=\"widgetType === 'image-banner'\">Image Banner</ion-title>\r\n    <ion-title class=\"ion-text-center\" *ngIf=\"widgetType === 'banner-slider'\">Banner Slider</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"addNewBannerSlider()\">\r\n      <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n      Add new\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n  <div *ngIf=\"showLoader; else showData\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n\r\n  <ng-template #showData>\r\n    <ng-container *ngIf=\"noWidgets; else showWidgets\">\r\n         No Data Avilable\r\n    </ng-container>\r\n    <ng-template #showWidgets>\r\n      <ion-list class=\"widget-list\">\r\n        <ion-item *ngFor=\"let item of widgetList; let i=index\" >\r\n          <ion-label>{{item.title}}</ion-label>\r\n          <i class=\"flaticon-null-21\" slot=\"end\" (click)=\"deleteWidgetConfirm(item.id)\"></i>\r\n          <i class=\"flaticon-pencil-edit-button\" slot=\"end\" (click)=\"editBanner(item.id)\"></i>\r\n        </ion-item>\r\n      </ion-list>\r\n    </ng-template>\r\n  </ng-template>\r\n</div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/widgets/widget-banner-slider/banner-slider-widgets-list/banner-slider-widgets-list.module.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/app/pages/widgets/widget-banner-slider/banner-slider-widgets-list/banner-slider-widgets-list.module.ts ***!
  \********************************************************************************************************************/
/*! exports provided: BannerSliderWidgetsListPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannerSliderWidgetsListPageModule", function() { return BannerSliderWidgetsListPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _banner_slider_widgets_list_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./banner-slider-widgets-list.page */ "./src/app/pages/widgets/widget-banner-slider/banner-slider-widgets-list/banner-slider-widgets-list.page.ts");







var routes = [
    {
        path: '',
        component: _banner_slider_widgets_list_page__WEBPACK_IMPORTED_MODULE_6__["BannerSliderWidgetsListPage"]
    }
];
var BannerSliderWidgetsListPageModule = /** @class */ (function () {
    function BannerSliderWidgetsListPageModule() {
    }
    BannerSliderWidgetsListPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_banner_slider_widgets_list_page__WEBPACK_IMPORTED_MODULE_6__["BannerSliderWidgetsListPage"]]
        })
    ], BannerSliderWidgetsListPageModule);
    return BannerSliderWidgetsListPageModule;
}());



/***/ }),

/***/ "./src/app/pages/widgets/widget-banner-slider/banner-slider-widgets-list/banner-slider-widgets-list.page.scss":
/*!********************************************************************************************************************!*\
  !*** ./src/app/pages/widgets/widget-banner-slider/banner-slider-widgets-list/banner-slider-widgets-list.page.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3dpZGdldHMvd2lkZ2V0LWJhbm5lci1zbGlkZXIvYmFubmVyLXNsaWRlci13aWRnZXRzLWxpc3QvYmFubmVyLXNsaWRlci13aWRnZXRzLWxpc3QucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/pages/widgets/widget-banner-slider/banner-slider-widgets-list/banner-slider-widgets-list.page.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/app/pages/widgets/widget-banner-slider/banner-slider-widgets-list/banner-slider-widgets-list.page.ts ***!
  \******************************************************************************************************************/
/*! exports provided: BannerSliderWidgetsListPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannerSliderWidgetsListPage", function() { return BannerSliderWidgetsListPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var BannerSliderWidgetsListPage = /** @class */ (function () {
    function BannerSliderWidgetsListPage(events, router, activatedRoute, toastController, alertController, loadingController) {
        this.events = events;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.toastController = toastController;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.showLoader = true;
    }
    BannerSliderWidgetsListPage.prototype.ngOnInit = function () { };
    BannerSliderWidgetsListPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.initializeSubscriptions();
        this.activatedRoute.queryParams.subscribe(function (params) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (params && params.type) {
                    this.widgetType = params.type;
                    console.log(this.widgetType);
                    this.events.publish('widgets:getWidgetsList', this.widgetType);
                }
                return [2 /*return*/];
            });
        }); });
    };
    BannerSliderWidgetsListPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    BannerSliderWidgetsListPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('widgets:publishWidgetsListSuccess');
        this.events.unsubscribe('widgets:deleteWidgetSuccess');
    };
    BannerSliderWidgetsListPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('widgets:publishWidgetsListSuccess', function (widgetList) {
            _this.showLoader = false;
            console.log('widgetList', widgetList);
            if (widgetList.length) {
                _this.widgetList = widgetList;
                _this.noWidgets = false;
            }
            else {
                _this.noWidgets = true;
            }
        });
        this.events.subscribe('widgets:deleteWidgetSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
        });
    };
    BannerSliderWidgetsListPage.prototype.addNewBannerSlider = function () {
        var navigationExtras = {
            queryParams: {
                type: this.widgetType
            }
        };
        this.router.navigate(['edit-banner'], navigationExtras);
    };
    BannerSliderWidgetsListPage.prototype.editBanner = function (ID) {
        var navigationExtras = {
            queryParams: {
                ID: ID,
            }
        };
        this.router.navigate(['edit-banner'], navigationExtras);
    };
    BannerSliderWidgetsListPage.prototype.deleteWidgetConfirm = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Are you sure you want to delete',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        // //console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Delete',
                                    handler: function () {
                                        _this.deleteWidget(id);
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
    BannerSliderWidgetsListPage.prototype.deleteWidget = function (ID) {
        this.events.publish('widgets:deleteWidget', ID);
        console.log("deleteWidget " + this.seletedIndex);
        this.presentLoading();
    };
    BannerSliderWidgetsListPage.prototype.presentToast = function (msg) {
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
    BannerSliderWidgetsListPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait',
                                duration: 2000,
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
    BannerSliderWidgetsListPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] }
    ]; };
    BannerSliderWidgetsListPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-banner-slider-widgets-list',
            template: __webpack_require__(/*! raw-loader!./banner-slider-widgets-list.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/widget-banner-slider/banner-slider-widgets-list/banner-slider-widgets-list.page.html"),
            styles: [__webpack_require__(/*! ./banner-slider-widgets-list.page.scss */ "./src/app/pages/widgets/widget-banner-slider/banner-slider-widgets-list/banner-slider-widgets-list.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"]])
    ], BannerSliderWidgetsListPage);
    return BannerSliderWidgetsListPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-widgets-widget-banner-slider-banner-slider-widgets-list-banner-slider-widgets-list-module-es5.js.map