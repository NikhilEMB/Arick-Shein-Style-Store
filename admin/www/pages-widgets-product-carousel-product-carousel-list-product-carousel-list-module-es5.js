(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-widgets-product-carousel-product-carousel-list-product-carousel-list-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/product-carousel/product-carousel-list/product-carousel-list.page.html":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/widgets/product-carousel/product-carousel-list/product-carousel-list.page.html ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\" defaultHref=\"homepage-setting\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">{{title}}</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"addNewCarousel()\">\r\n      <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n      Add New\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n  <div *ngIf=\"showLoader; else showData\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n\r\n  <ng-template #showData>\r\n    <ng-container *ngIf=\"noWidgets; else showWidgets\">\r\n         No Data Available\r\n    </ng-container>\r\n    <ng-template #showWidgets>\r\n      <ion-list class=\"widget-list\">\r\n        <ion-item *ngFor=\"let item of widgetList; let i=index\">\r\n          <ion-label>{{item.title}}</ion-label>\r\n          <i class=\"flaticon-null-21\" slot=\"end\" (click)=\"deleteWidgetConfirm(item.id)\"></i>\r\n          <i class=\"flaticon-pencil-edit-button\" slot=\"end\" (click)=\"editCarousel(item.id)\"></i>\r\n        </ion-item>\r\n      </ion-list>\r\n    </ng-template>\r\n  </ng-template>\r\n</div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/widgets/product-carousel/product-carousel-list/product-carousel-list.module.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/pages/widgets/product-carousel/product-carousel-list/product-carousel-list.module.ts ***!
  \******************************************************************************************************/
/*! exports provided: ProductCarouselListPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCarouselListPageModule", function() { return ProductCarouselListPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _product_carousel_list_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product-carousel-list.page */ "./src/app/pages/widgets/product-carousel/product-carousel-list/product-carousel-list.page.ts");







var routes = [
    {
        path: '',
        component: _product_carousel_list_page__WEBPACK_IMPORTED_MODULE_6__["ProductCarouselListPage"]
    }
];
var ProductCarouselListPageModule = /** @class */ (function () {
    function ProductCarouselListPageModule() {
    }
    ProductCarouselListPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_product_carousel_list_page__WEBPACK_IMPORTED_MODULE_6__["ProductCarouselListPage"]]
        })
    ], ProductCarouselListPageModule);
    return ProductCarouselListPageModule;
}());



/***/ }),

/***/ "./src/app/pages/widgets/product-carousel/product-carousel-list/product-carousel-list.page.scss":
/*!******************************************************************************************************!*\
  !*** ./src/app/pages/widgets/product-carousel/product-carousel-list/product-carousel-list.page.scss ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3dpZGdldHMvcHJvZHVjdC1jYXJvdXNlbC9wcm9kdWN0LWNhcm91c2VsLWxpc3QvcHJvZHVjdC1jYXJvdXNlbC1saXN0LnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/widgets/product-carousel/product-carousel-list/product-carousel-list.page.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/pages/widgets/product-carousel/product-carousel-list/product-carousel-list.page.ts ***!
  \****************************************************************************************************/
/*! exports provided: ProductCarouselListPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCarouselListPage", function() { return ProductCarouselListPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");






var ProductCarouselListPage = /** @class */ (function () {
    function ProductCarouselListPage(events, router, toastController, alertController, loadingController, activatedRoute, sharedService) {
        this.events = events;
        this.router = router;
        this.toastController = toastController;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.activatedRoute = activatedRoute;
        this.sharedService = sharedService;
        this.showLoader = true;
    }
    ProductCarouselListPage.prototype.ngOnInit = function () {
    };
    ProductCarouselListPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.initializeSubscriptions();
        this.activatedRoute.queryParams.subscribe(function (params) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (params && params.type) {
                    this.widgetType = params.type;
                    console.log(this.widgetType);
                    if (this.widgetType == "product-carousel") {
                        this.title = "Product Carousel";
                    }
                    else {
                        this.title = "Product List";
                    }
                    this.events.publish('widgets:getWidgetsList', this.widgetType);
                }
                return [2 /*return*/];
            });
        }); });
    };
    ProductCarouselListPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    ProductCarouselListPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('widgets:publishWidgetsListSuccess');
        this.events.unsubscribe('widgets:deleteWidgetSuccess');
        this.events.unsubscribe('widgets:deleteWidgetError');
    };
    ProductCarouselListPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('widgets:publishWidgetsListSuccess', function (widgetList) {
            _this.showLoader = false;
            console.log(widgetList);
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
        this.events.subscribe('widgets:deleteWidgetError', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.sharedService.presentAlert('Some Error Occured, please try again');
        });
    };
    ProductCarouselListPage.prototype.addNewCarousel = function () {
        var navigationExtras = {
            queryParams: {
                type: this.widgetType
            }
        };
        this.router.navigate(['edit-product-carousel'], navigationExtras);
    };
    ProductCarouselListPage.prototype.editCarousel = function (ID) {
        var navigationExtras = {
            queryParams: {
                ID: ID,
            }
        };
        this.router.navigate(['edit-product-carousel'], navigationExtras);
    };
    ProductCarouselListPage.prototype.deleteWidgetConfirm = function (id) {
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
    ProductCarouselListPage.prototype.deleteWidget = function (ID) {
        this.events.publish('widgets:deleteWidget', ID);
        this.presentLoading();
    };
    ProductCarouselListPage.prototype.presentToast = function (msg) {
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
    ProductCarouselListPage.prototype.presentLoading = function () {
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
    ProductCarouselListPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] }
    ]; };
    ProductCarouselListPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-product-carousel-list',
            template: __webpack_require__(/*! raw-loader!./product-carousel-list.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/product-carousel/product-carousel-list/product-carousel-list.page.html"),
            styles: [__webpack_require__(/*! ./product-carousel-list.page.scss */ "./src/app/pages/widgets/product-carousel/product-carousel-list/product-carousel-list.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"]])
    ], ProductCarouselListPage);
    return ProductCarouselListPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-widgets-product-carousel-product-carousel-list-product-carousel-list-module-es5.js.map