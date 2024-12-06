(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-banners-banner-settings-banner-settings-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-banners/banner-settings/banner-settings.page.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-banners/banner-settings/banner-settings.page.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Image {{index}} </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content>\r\n \r\n    <div class=\"main-container info-container fixed-height\">\r\n      <ng-container *ngIf=\"bannerData\">\r\n      \r\n      <ion-grid>\r\n        <ion-row>\r\n          <ion-col size=\"12\">\r\n            <div class=\"input-wrap\">\r\n              <div class=\"flex-space-between\">\r\n                <div>\r\n                  <ion-label >Image {{index}} </ion-label>\r\n                </div>\r\n                <div class=\"flex-label\">\r\n                  <ion-label>Show</ion-label>\r\n                  <ion-toggle  *ngIf=\"bannerData\" [(ngModel)]=\"bannerData.active\" [checked]=\"bannerData.active\"></ion-toggle>\r\n                </div>\r\n              </div>\r\n              \r\n            </div>\r\n          </ion-col>\r\n\r\n          <ion-col size=\"12\">\r\n            <div class=\"flex-space-between\">\r\n              <div>\r\n                <ion-label>Banner Image</ion-label>\r\n              </div>\r\n              <div class=\"upload-btn-wrapper\">\r\n                <button [disabled]=\"bannerData.org\"\r\n                  class=\"upload-btn btn-1 i-start\"> <i class=\"flaticon-null-16\"></i>Upload Banner Image</button>\r\n                <input [disabled]=\"bannerData.org\" type=\"file\" accept=\"image/*\" name=\"myfile\" (change)=\"uploadImage($event.target.files)\" />\r\n              </div>\r\n            </div>\r\n            <div class=\"img-container\">\r\n              <div class=\"no-img\" *ngIf=\"!bannerData.org\">\r\n                <p>No attached image</p>\r\n              </div>\r\n              <div *ngIf=\"bannerData && bannerData.org\">\r\n                <div class=\"img-wrap\" >\r\n                  <img class=\"category-img\" [src]=\"bannerData.org\" (click)=\"imgZoom(bannerData.org)\" />\r\n                  <div class=\"overlay\">\r\n                    <ion-button class=\"btn-2 remove\" shape=\"round\" fill=\"clear\" color=\"danger\"\r\n                      (click)=\"removeImage()\">\r\n                      <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\r\n                    </ion-button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </ion-col>\r\n\r\n          <ion-col size=\"12\">\r\n            <ion-list>\r\n              <ion-radio-group [value]=\"bannerData.link.type\">\r\n                  <ion-item class=\"bs-links\" *ngFor=\"let link of linkTypes; let i=index;\"\r\n                      lines=\"none\" (click)=\"selectLinkType(i)\">\r\n                      <ion-radio slot=\"start\" [value]=\"link\"></ion-radio>\r\n                      <ion-label>\r\n                          {{link}} : <ng-container *ngIf=\"(link === bannerData.link.type) \">{{bannerData.link.name}}</ng-container>\r\n                      </ion-label>\r\n                  </ion-item>\r\n              </ion-radio-group>\r\n  \r\n          </ion-list>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </ng-container>\r\n    </div>\r\n </ion-content>\r\n\r\n <ion-footer  no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n  \r\n      <!--<ion-button (click)=\"deleteCategoryConfirm(categoryData.id);\" shape=\"round\" class=\"btn-1 i-start\"\r\n        color=\"danger\">\r\n        <i class=\"flaticon-null-21\"></i>\r\n        Delete\r\n      </ion-button>-->\r\n      <ion-button *ngIf=\"bannerMode != 'new'\" (click)=\"saveBannerData()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n        <i class=\"flaticon-null-20 margin-icon\"></i>\r\n        Save\r\n      </ion-button>\r\n     <!-- <ion-button *ngIf=\"bannerMode == 'new'\" (click)=\"addBanner()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n        <i class=\"flaticon-null-20 margin-icon\"></i>\r\n        Add\r\n      </ion-button>-->\r\n    \r\n    </div>\r\n    </ion-footer>"

/***/ }),

/***/ "./src/app/admin/admin-banners/banner-settings/banner-settings.module.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/admin-banners/banner-settings/banner-settings.module.ts ***!
  \*******************************************************************************/
/*! exports provided: BannerSettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannerSettingsPageModule", function() { return BannerSettingsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _banner_settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./banner-settings.page */ "./src/app/admin/admin-banners/banner-settings/banner-settings.page.ts");







const routes = [
    {
        path: '',
        component: _banner_settings_page__WEBPACK_IMPORTED_MODULE_6__["BannerSettingsPage"]
    }
];
let BannerSettingsPageModule = class BannerSettingsPageModule {
};
BannerSettingsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_banner_settings_page__WEBPACK_IMPORTED_MODULE_6__["BannerSettingsPage"]]
    })
], BannerSettingsPageModule);



/***/ }),

/***/ "./src/app/admin/admin-banners/banner-settings/banner-settings.page.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/admin-banners/banner-settings/banner-settings.page.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2FkbWluLWJhbm5lcnMvYmFubmVyLXNldHRpbmdzL2Jhbm5lci1zZXR0aW5ncy5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/admin/admin-banners/banner-settings/banner-settings.page.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/admin/admin-banners/banner-settings/banner-settings.page.ts ***!
  \*****************************************************************************/
/*! exports provided: BannerSettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannerSettingsPage", function() { return BannerSettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var src_app_services_loggly_logger_loggly_logger_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/loggly-logger/loggly-logger.service */ "./src/app/services/loggly-logger/loggly-logger.service.ts");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var _banner_linking_modal_banner_linking_modal_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../banner-linking-modal/banner-linking-modal.page */ "./src/app/admin/admin-banners/banner-linking-modal/banner-linking-modal.page.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");










let BannerSettingsPage = class BannerSettingsPage {
    constructor(events, router, camera, alertController, loadingController, toastController, labelService, logglyService, route, modalController, configService) {
        this.events = events;
        this.router = router;
        this.camera = camera;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.labelService = labelService;
        this.logglyService = logglyService;
        this.route = route;
        this.modalController = modalController;
        this.configService = configService;
        this.bannerData = {};
        this.linkTypes = [];
        this.referralFeature = false;
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.bannerData = this.router.getCurrentNavigation().extras.state.bannerData;
                this.bannerType = this.router.getCurrentNavigation().extras.state.bannerType;
                this.index = this.router.getCurrentNavigation().extras.state.index;
                console.log('this.bannerData', this.bannerData, this.index);
            }
        });
    }
    ngOnInit() {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.BANNER_SETTINGS_LABELS = this.labelService.labels['BANNER_SETTINGS'];
        this.headerText = `${this.BANNER_SETTINGS_LABELS['banner']} ${this.index}`;
        this.referralFeature = this.configService.environment.referralFeature;
        this.linkTypes = [
            this.BANNER_SETTINGS_LABELS['none'],
            this.BANNER_SETTINGS_LABELS['product'],
            this.BANNER_SETTINGS_LABELS['category'],
            this.BANNER_SETTINGS_LABELS['brand'],
            this.BANNER_SETTINGS_LABELS['search'],
            this.BANNER_SETTINGS_LABELS['service']
        ];
        if (this.referralFeature) {
            this.linkTypes.push(this.BANNER_SETTINGS_LABELS['refer_and_earn']);
        }
        this.prepareData(this.bannerData);
    }
    prepareData(data) {
        if (!data) {
            data = {
                active: true,
                org: '',
                link: {
                    type: this.BANNER_SETTINGS_LABELS['none'],
                    id: '',
                    name: ''
                }
            };
        }
        else {
            if (!data.hasOwnProperty('active')) {
                data['active'] = true;
            }
            if (!data.hasOwnProperty('link')) {
                data['link'] = {
                    type: this.BANNER_SETTINGS_LABELS['none'],
                    id: '',
                    name: ''
                };
            }
        }
        this.bannerData = data;
        console.log('changes datas', this.bannerData);
    }
    ionViewWillEnter() {
        this.initializeSubscriptions();
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('banners:saveBannerSuccess', () => {
            if (this.loading) {
                this.loading.dismiss();
            }
            this.presentAlert(this.BANNER_SETTINGS_LABELS['data_saved_msg']);
        });
    }
    toggleActive() {
        this.bannerData.active = !this.bannerData.active;
    }
    removeImage() {
        this.bannerData.org = '';
        this.bannerData.thumb = '';
        this.bannerData.mob = '';
    }
    imgZoom(img) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_7__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: [{ url: img }],
                index: 0
            }
        }).then(modal => modal.present());
    }
    uploadImage(files) {
        //console.log(type);
        for (let i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = (event) => {
                let base64Image = event.target.result;
                this.bannerData.org = base64Image;
                console.log(this.bannerData.org);
            };
        }
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: this.SHARED_LABELS['please_wait'],
                duration: 10000
            });
            yield this.loading.present();
        });
    }
    presentAlert(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: ['ok']
            });
            yield alert.present();
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
    selectLinkType(i) {
        const type = this.linkTypes[i];
        this.bannerData.link.type = type;
        if (type === this.BANNER_SETTINGS_LABELS['product']) {
            this.presentModal(this.bannerData.link.type);
        }
        else if (type === this.BANNER_SETTINGS_LABELS['category']) {
            this.presentModal(this.bannerData.link.type);
        }
        else if (type === this.BANNER_SETTINGS_LABELS['brand']) {
            this.presentModal(this.bannerData.link.type);
        }
        else if (type === this.BANNER_SETTINGS_LABELS['service']) {
            this.presentModal(this.bannerData.link.type);
        }
        else if (type === this.BANNER_SETTINGS_LABELS['search']) {
            this.searchTextAlert();
        }
        else if (type === this.BANNER_SETTINGS_LABELS['refer_and_earn']) {
            return null;
        }
        else {
            return null;
        }
        this.bannerData.link.id = '';
        this.bannerData.link.name = '';
    }
    presentModal(type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _banner_linking_modal_banner_linking_modal_page__WEBPACK_IMPORTED_MODULE_8__["BannerLinkingModalPage"],
                cssClass: 'custom-modal',
                componentProps: { linkType: type, linkId: this.bannerData.link.id }
            });
            modal.onDidDismiss()
                .then((res) => {
                console.log('data from modal', res);
                if (res.data) {
                    this.bannerData.link.id = res.data.id;
                    this.bannerData.link.name = res.data.name;
                    if (res.data.hasOwnProperty('isSubcategories')) {
                        this.bannerData.link['isSubcategories'] = res.data.isSubcategories;
                    }
                    if (res.data.hasOwnProperty('serviceData')) {
                        this.bannerData.link['serviceData'] = res.data.serviceData;
                    }
                }
                else {
                    this.defaultLinkType();
                }
            });
            yield modal.present();
        });
    }
    searchTextAlert() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                subHeader: this.BANNER_SETTINGS_LABELS['search_text'],
                inputs: [
                    {
                        name: 'searchTxt',
                        type: 'text',
                        placeholder: this.BANNER_SETTINGS_LABELS['enter_search_text']
                    },
                ],
                buttons: [
                    {
                        text: this.SHARED_LABELS['cancel'],
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            this.defaultLinkType();
                        }
                    }, {
                        text: this.SHARED_LABELS['add'],
                        handler: (data) => {
                            if (!data.searchTxt) {
                                this.defaultLinkType();
                                this.presentToast(this.BANNER_SETTINGS_LABELS['please_enter_valid_data']);
                            }
                            else {
                                this.bannerData.link.name = data.searchTxt;
                            }
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    defaultLinkType() {
        this.bannerData.link.id = '';
        this.bannerData.link.name = '';
        this.bannerData.link.type = this.BANNER_SETTINGS_LABELS['none'];
    }
    saveBannerData() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.bannerData.active && !this.bannerData.org) {
                this.presentAlert(this.BANNER_SETTINGS_LABELS['upload_banner_msg']);
            }
            else {
                this.filterData();
                yield this.presentLoading();
                this.events.publish('banners:saveBanner', this.bannerData, this.index, this.bannerType);
            }
        });
    }
    addBanner() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.bannerData.active && !this.bannerData.org) {
                this.presentAlert(this.BANNER_SETTINGS_LABELS['upload_banner_msg']);
            }
            else {
                this.filterData();
                yield this.presentLoading();
                this.events.publish('banners:addBanner', this.bannerData, this.index, this.bannerType);
            }
        });
    }
    filterData() {
        if (this.bannerData.link.type !== this.BANNER_SETTINGS_LABELS['category'] && this.bannerData.link.hasOwnProperty('isSubcategories')) {
            delete this.bannerData.link.isSubcategories;
        }
        if (this.bannerData.link.type !== this.BANNER_SETTINGS_LABELS['service'] && this.bannerData.link.hasOwnProperty('serviceData')) {
            delete this.bannerData.link.serviceData;
        }
    }
    removeSubscriptions() {
        this.events.unsubscribe('banners:saveBannerSuccess');
    }
};
BannerSettingsPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__["Camera"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
    { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_5__["LabelService"] },
    { type: src_app_services_loggly_logger_loggly_logger_service__WEBPACK_IMPORTED_MODULE_6__["LogglyLoggerService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_9__["ConfigService"] }
];
BannerSettingsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-banner-settings',
        template: __webpack_require__(/*! raw-loader!./banner-settings.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-banners/banner-settings/banner-settings.page.html"),
        styles: [__webpack_require__(/*! ./banner-settings.page.scss */ "./src/app/admin/admin-banners/banner-settings/banner-settings.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__["Camera"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
        src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_5__["LabelService"],
        src_app_services_loggly_logger_loggly_logger_service__WEBPACK_IMPORTED_MODULE_6__["LogglyLoggerService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_9__["ConfigService"]])
], BannerSettingsPage);



/***/ })

}]);
//# sourceMappingURL=admin-admin-banners-banner-settings-banner-settings-module-es2015.js.map