(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-banners-admin-banners-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-banners/admin-banners.page.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-banners/admin-banners.page.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>{{'ADMIN_BANNERS.header_text' | translate}} \r\n      <p style=\"font-size: 16px !important\">*Note: Please use homepage (from sidemenu) for this feature if your system has been updated after 15th Feb</p></ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n\r\n<super-tabs>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Web Banners</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>App Banners</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <super-tabs-container>\r\n    <!-- app banner -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <div *ngIf=\"showWebLoader; else showWebBanners\" class=\"spinner\">\r\n            <ion-spinner color=\"primary\"></ion-spinner>\r\n          </div>\r\n          <ng-template #showWebBanners>\r\n            <!-- heading -->\r\n            <div class=\"list-header\">\r\n              <ion-grid class=\"ion-no-padding\">\r\n                <ion-row>\r\n                  <ion-col class=\"img\">\r\n                    <p>image</p>\r\n                  </ion-col>\r\n                  <ion-col class=\"name\">\r\n                    <p>name</p>\r\n                  </ion-col>\r\n                  <ion-col class=\"action\">\r\n                    <p>Action</p>\r\n                  </ion-col>\r\n                  <ion-col class=\"status\">\r\n                    <p>Status</p>\r\n\r\n                  </ion-col>\r\n\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n            <!-- heading -->\r\n            <div class=\"list-container\">\r\n            \r\n              <ion-list class=\"ion-no-padding row-border\">\r\n                <ion-item *ngFor=\"let banner of bannersLength ; let i = index\">\r\n                  <ion-grid class=\"ion-no-padding\">\r\n                    <ion-row>\r\n                      <ion-col class=\"img\">\r\n                        <ion-thumbnail class=\"thumbnail\">\r\n                          <ion-img [src]=\"getWebBannerImage(i)\"></ion-img>\r\n                        </ion-thumbnail>\r\n                      </ion-col>\r\n                      <ion-col class=\"name\">\r\n                        <p class=\"ion-text-capitalize\">Image {{i + 1}}</p>\r\n                      </ion-col>\r\n                      <ion-col class=\"action\">\r\n                        <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"editBanner(banner, i , 'web')\">\r\n                          <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\"></i>\r\n                        </ion-button>\r\n                      </ion-col>\r\n                      <ion-col class=\"status\">\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\" (click)=\"changeStatus($event, i, 'web')\" [checked]=\"getWebBannerStatus(i)\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                </ion-item>\r\n              </ion-list>\r\n            </div>\r\n          </ng-template>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n    <!-- app banner ends-->\r\n\r\n    <!-- web banner -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <div *ngIf=\"showAppLoader; else showAppBanners\" class=\"spinner\">\r\n            <ion-spinner color=\"primary\"></ion-spinner>\r\n          </div>\r\n          <ng-template #showAppBanners>\r\n            <!-- heading -->\r\n            <div class=\"list-header\">\r\n              <ion-grid class=\"ion-no-padding\">\r\n                <ion-row>\r\n                  <ion-col class=\"img\">\r\n                    <p>image</p>\r\n                  </ion-col>\r\n                  <ion-col class=\"name\">\r\n                    <p>name</p>\r\n                  </ion-col>\r\n                  <ion-col class=\"action\">\r\n                    <p>Action</p>\r\n                  </ion-col>\r\n                  <ion-col class=\"status\">\r\n                    <p>Status</p>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n            <!-- heading -->\r\n            <div class=\"list-container\">\r\n              <div class=\"add-btn-wrap\">\r\n               <!-- <ion-button shape=\"round\" (click)=\"addAppBanner()\">\r\n                  Add Banner\r\n                </ion-button>-->\r\n              </div>\r\n              <ion-list class=\"ion-no-padding row-border\">\r\n                <ion-item *ngFor=\"let banner of bannersLength ; let i = index\">\r\n                  <ion-grid class=\"ion-no-padding\">\r\n                    <ion-row>\r\n                      <ion-col class=\"img\">\r\n                        <ion-thumbnail class=\"thumbnail\">\r\n                          <ion-img [src]=\"getAppBannerImage(i)\"></ion-img>\r\n                        </ion-thumbnail>\r\n                      </ion-col>\r\n                      <ion-col class=\"name\">\r\n                        <p class=\"ion-text-capitalize\">Image{{i + 1}}</p>\r\n                      </ion-col>\r\n                      <ion-col class=\"action\">\r\n                        <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"editBanner(banner, i, 'app')\">\r\n                          <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\"></i>\r\n                        </ion-button>\r\n                        <!--<ion-button class=\"action-btn\" fill=\"clear\" (click)=\"deleteBannerConfirm(banner, 'app', i)\">\r\n                          <i class=\"flaticon-null-21\" slot=\"icon-only\"></i>\r\n                        </ion-button>-->\r\n                      </ion-col>\r\n                      <ion-col class=\"status\">\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\" (click)=\"changeStatus($event, i, 'app')\" [checked]=\"getAppBannerStatus(i)\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                </ion-item>\r\n              </ion-list>\r\n            </div>\r\n          </ng-template>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n    <!-- web banner ends-->\r\n\r\n\r\n  </super-tabs-container>\r\n</super-tabs>"

/***/ }),

/***/ "./src/app/admin/admin-banners/admin-banners.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/admin/admin-banners/admin-banners.module.ts ***!
  \*************************************************************/
/*! exports provided: AdminBannersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminBannersPageModule", function() { return AdminBannersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_banners_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-banners.page */ "./src/app/admin/admin-banners/admin-banners.page.ts");
/* harmony import */ var src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/directives/application-directives.module */ "./src/app/directives/application-directives.module.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");










var routes = [
    {
        path: '',
        component: _admin_banners_page__WEBPACK_IMPORTED_MODULE_6__["AdminBannersPage"]
    }
];
var AdminBannersPageModule = /** @class */ (function () {
    function AdminBannersPageModule() {
    }
    AdminBannersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_7__["ApplicationDirectivesModule"],
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_8__["SuperTabsModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateModule"]
            ],
            declarations: [_admin_banners_page__WEBPACK_IMPORTED_MODULE_6__["AdminBannersPage"]]
        })
    ], AdminBannersPageModule);
    return AdminBannersPageModule;
}());



/***/ }),

/***/ "./src/app/admin/admin-banners/admin-banners.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/admin/admin-banners/admin-banners.page.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".list-header {\n  top: 0;\n}\n\n.list-container {\n  margin-top: 60px;\n}\n\n.add-btn-wrap {\n  text-align: right;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tYmFubmVycy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGFkbWluLWJhbm5lcnNcXGFkbWluLWJhbm5lcnMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZG1pbi1iYW5uZXJzL2FkbWluLWJhbm5lcnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksTUFBQTtBQ0NKOztBREVBO0VBQ0ksZ0JBQUE7QUNDSjs7QURFQTtFQUNJLGlCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9hZG1pbi1iYW5uZXJzL2FkbWluLWJhbm5lcnMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxpc3QtaGVhZGVye1xyXG4gICAgdG9wOiAwO1xyXG59XHJcblxyXG4ubGlzdC1jb250YWluZXJ7XHJcbiAgICBtYXJnaW4tdG9wOjYwcHg7XHJcbn1cclxuXHJcbi5hZGQtYnRuLXdyYXB7XHJcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcclxufSIsIi5saXN0LWhlYWRlciB7XG4gIHRvcDogMDtcbn1cblxuLmxpc3QtY29udGFpbmVyIHtcbiAgbWFyZ2luLXRvcDogNjBweDtcbn1cblxuLmFkZC1idG4td3JhcCB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/admin-banners/admin-banners.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/admin/admin-banners/admin-banners.page.ts ***!
  \***********************************************************/
/*! exports provided: AdminBannersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminBannersPage", function() { return AdminBannersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");






var AdminBannersPage = /** @class */ (function () {
    function AdminBannersPage(events, domSanitizer, router, alertController, labelService, loadingController, toastController) {
        this.events = events;
        this.domSanitizer = domSanitizer;
        this.router = router;
        this.alertController = alertController;
        this.labelService = labelService;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.ADMIN_BANNERS_LABELS = {};
        this.showWebLoader = true;
        this.showAppLoader = true;
        this.webBanners = [];
        this.appBanners = [];
        this.bannersLength = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    AdminBannersPage.prototype.ngOnInit = function () {
    };
    AdminBannersPage.prototype.ionViewWillEnter = function () {
        console.log('ionViewWillEnter');
        this.ADMIN_BANNERS_LABELS = this.labelService.labels['ADMIN_BANNERS'];
        this.initializeSubscriptions();
    };
    AdminBannersPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    AdminBannersPage.prototype.getWebBannerImage = function (index) {
        var bindex = this.webBanners.findIndex(function (b) { return b.id === "image" + (index + 1); });
        if (bindex === -1) {
            return 'assets/img/img-preloader.png';
        }
        else {
            if (this.webBanners[bindex].thumb && this.webBanners[bindex].thumb !== '') {
                return this.webBanners[bindex].thumb;
            }
            else if (this.webBanners[bindex].org && this.webBanners[bindex].org !== '') {
                return this.webBanners[bindex].org;
            }
            else {
                return 'assets/img/img-preloader.png';
            }
        }
    };
    AdminBannersPage.prototype.getAppBannerImage = function (index) {
        var bindex = this.appBanners.findIndex(function (b) { return b.id === "image" + (index + 1); });
        if (bindex === -1) {
            return 'assets/img/img-preloader.png';
        }
        else {
            if (this.appBanners[bindex].thumb && this.appBanners[bindex].thumb !== '') {
                return this.appBanners[bindex].thumb;
            }
            else if (this.appBanners[bindex].org && this.appBanners[bindex].org !== '') {
                return this.appBanners[bindex].org;
            }
            else {
                return 'assets/img/img-preloader.png';
            }
        }
    };
    AdminBannersPage.prototype.getWebBannerStatus = function (index) {
        var bindex = this.webBanners.findIndex(function (b) { return b.id === "image" + (index + 1); });
        //console.log(this.webBanners[bindex]);
        if (bindex === -1) {
            return false;
        }
        else {
            return this.webBanners[bindex].active;
        }
    };
    AdminBannersPage.prototype.getAppBannerStatus = function (index) {
        var bindex = this.appBanners.findIndex(function (b) { return b.id === "image" + (index + 1); });
        //console.log(this.webBanners[bindex]);
        if (bindex === -1) {
            return false;
        }
        else {
            return this.appBanners[bindex].active;
        }
    };
    AdminBannersPage.prototype.changeStatus = function (event, index, bannerType) {
        var status = event.detail.checked;
        console.log(status);
        if (bannerType == 'app') {
            console.log('changeStatus app');
            var bindex = this.appBanners.findIndex(function (b) { return b.id === "image" + (index + 1); });
            if (bindex === -1) {
                this.presentAlert('Please add the banner');
            }
            else {
                this.events.publish('banners:changeBannerStatus', bindex + 1, status, bannerType);
            }
        }
        else {
            console.log('changeStatus web');
            var bindex = this.webBanners.findIndex(function (b) { return b.id === "image" + (index + 1); });
            console.log(bindex);
            if (bindex === -1) {
                this.presentAlert('Please add the banner');
            }
            else {
                this.events.publish('banners:changeBannerStatus', bindex + 1, status, bannerType);
            }
        }
    };
    AdminBannersPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('banners:publishWebBanners', function (banners) {
            if (banners) {
                _this.webBanners = banners;
            }
            _this.showWebLoader = false;
        });
        this.events.subscribe('banners:publishAppBanners', function (banners) {
            if (banners) {
                _this.appBanners = banners;
            }
            _this.showAppLoader = false;
        });
        this.events.subscribe('banners:updateBannerStatusSuccess', function () {
            _this.presentToast('Banner Upated Successfuly');
        });
        this.events.publish('banners:getAppBanners');
        this.events.publish('banners:getWebBanners');
    };
    AdminBannersPage.prototype.deleteBannerConfirm = function (ID, type, i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Are you sure you want to remove this banner?',
                            buttons: [{
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        // //console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Okay',
                                    handler: function () {
                                        _this.removeBanner(ID, type, i);
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
    AdminBannersPage.prototype.removeBanner = function (ID, type, i) {
        this.events.publish('banners:removeBanner', ID, type);
        this.currentIndex = i;
    };
    AdminBannersPage.prototype.editBanner = function (banner, index, bannerType) {
        var bannerData = null;
        if (bannerType == 'app') {
            this.appBanners.forEach(function (banner) {
                if (banner.id === "image" + (index + 1)) {
                    bannerData = banner;
                }
            });
        }
        else {
            this.webBanners.forEach(function (banner) {
                if (banner.id === "image" + (index + 1)) {
                    bannerData = banner;
                }
            });
        }
        var navigationExtras = {
            state: {
                bannerData: bannerData,
                bannerType: bannerType,
                index: index + 1
            }
        };
        this.router.navigate(['banner-settings'], navigationExtras);
    };
    AdminBannersPage.prototype.addWebBanner = function () {
        var navigationExtras = {
            state: {
                bannerType: 'web',
                bannerMode: 'new'
            }
        };
        this.router.navigate(['banner-settings'], navigationExtras);
    };
    AdminBannersPage.prototype.addAppBanner = function () {
        var navigationExtras = {
            state: {
                bannerType: 'app',
                bannerMode: 'new'
            }
        };
        this.router.navigate(['banner-settings'], navigationExtras);
    };
    AdminBannersPage.prototype.changeBannersStatus = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AdminBannersPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
                                duration: 10000
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
    AdminBannersPage.prototype.presentAlert = function (msg) {
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
    AdminBannersPage.prototype.presentToast = function (msg) {
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
    /*web banner */
    AdminBannersPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('banners:publishBanners');
        this.events.unsubscribe('banners:publishWebBanners');
    };
    AdminBannersPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__["LabelService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] }
    ]; };
    AdminBannersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-admin-banners',
            template: __webpack_require__(/*! raw-loader!./admin-banners.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-banners/admin-banners.page.html"),
            styles: [__webpack_require__(/*! ./admin-banners.page.scss */ "./src/app/admin/admin-banners/admin-banners.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__["LabelService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"]])
    ], AdminBannersPage);
    return AdminBannersPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-banners-admin-banners-module-es5.js.map