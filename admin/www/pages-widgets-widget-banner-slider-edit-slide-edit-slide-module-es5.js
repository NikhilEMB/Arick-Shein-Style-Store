(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-widgets-widget-banner-slider-edit-slide-edit-slide-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/widget-banner-slider/edit-slide/edit-slide.page.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/widgets/widget-banner-slider/edit-slide/edit-slide.page.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\" defaultHref=\"edit-banner\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>{{slideID ? 'Edit' : 'New'}} Slide</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content>\r\n\r\n  <div class=\"main-container info-container fixed-height\">\r\n    <ng-container *ngIf=\"slideData\">\r\n\r\n      <ion-grid>\r\n        <ion-row>\r\n          <ion-col size=\"12\">\r\n            <div class=\"input-wrap\">\r\n              <div class=\"flex-space-between\">\r\n                <div>\r\n                  <ion-label>Slide</ion-label>\r\n                </div>\r\n                <div class=\"flex-label\">\r\n                  <ion-label>Show</ion-label>\r\n                  <ion-toggle *ngIf=\"slideData\" [(ngModel)]=\"slideData.active\" [checked]=\"slideData.active\">\r\n                  </ion-toggle>\r\n                </div>\r\n              </div>\r\n\r\n            </div>\r\n          </ion-col>\r\n\r\n          <ion-col size=\"12\">\r\n            <div class=\"flex-space-between\">\r\n              <div>\r\n                <ion-label>Banner Image</ion-label>\r\n              </div>\r\n              <div class=\"upload-btn-wrapper\">\r\n                <button class=\"upload-btn btn-1 i-start\" (click)=\"uploadImage($event.target.files)\">\r\n                  <i class=\"flaticon-null-16\"></i>Upload Slide Image\r\n                </button>\r\n              </div>\r\n            </div>\r\n            <ion-text color=\"danger\" *ngIf=\"type=='app' && widgetType == 'image-banner'\">\r\n              <p>Image size for best view</p>\r\n              <p>Banner Slider : 1920x1080 Px</p>\r\n              <p>Image Banner (1 image in row) : 1920x1080 Px</p>\r\n              <p>Image Banner (2 images in row) : 960x1080 Px</p>\r\n              <p>Image Banner (3 images in row) : 640x1080 Px\r\n              <p>\r\n                <br>\r\n            </ion-text>\r\n            <ion-text color=\"danger\" *ngIf=\"type=='web' && widgetType == 'image-banner'\">\r\n              <p>Image size for best view</p>\r\n              <p>Banner Slider : 1366x400 Px</p>\r\n              <p>Image Banner (1 image in row) : 1366x400 Px</p>\r\n              <p>Image Banner (2 images in row) : 733x400 Px</p>\r\n              <p>Image Banner (3 images in row) : 455x400 Px\r\n              <p>\r\n                <br>\r\n            </ion-text>\r\n            <div class=\"img-container\">\r\n              <div class=\"no-img\" *ngIf=\"!slideData.image.org\">\r\n                <p>No attached image</p>\r\n              </div>\r\n              <div *ngIf=\"slideData && slideData.image.org\">\r\n                <div class=\"img-wrap\">\r\n                  <img class=\"category-img\" [src]=\"slideData.image.org\" />\r\n                  <div class=\"overlay\">\r\n                    <ion-button class=\"btn-2 remove\" shape=\"round\" fill=\"clear\" color=\"danger\" (click)=\"removeImage()\">\r\n                      <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\r\n                    </ion-button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </ion-col>\r\n\r\n          <ion-col size=\"12\">\r\n            <div class=\"input-wrap\">\r\n              <ion-label>Image Caption</ion-label>\r\n              <ion-textarea class=\"form-input\" [(ngModel)]=\"slideData.caption\" placeholder=\"Type image Caption here\">\r\n              </ion-textarea>\r\n            </div>\r\n          </ion-col>\r\n\r\n          <ion-col size=\"12\">\r\n            <ion-list>\r\n              <ion-radio-group [value]=\"slideData.link.type\">\r\n                <ion-item class=\"bs-links\" *ngFor=\"let link of linkTypes; let i=index;\" lines=\"none\"\r\n                  (click)=\"selectLinkType(i)\">\r\n                  <ion-radio slot=\"start\" [value]=\"link\"></ion-radio>\r\n                  <ion-label style=\"text-transform: capitalize\">\r\n                    {{link}} : <ng-container *ngIf=\"(link === slideData.link.type) && (!linkLength || linkLength == 1) && checkCurrentType(slideData.link.type)\">\r\n                      {{slideData.link.name}}</ng-container>\r\n                    <ng-container *ngIf=\"(link === slideData.link.type) && (linkLength > 1) && checkCurrentType(slideData.link.type)\">\r\n                      {{linkLength}} {{link}} selected</ng-container>\r\n                  </ion-label>\r\n                </ion-item>\r\n                <!-- <ion-item class=\"bs-links\" lines=\"none\" (click)=\"selectStaticLink('external')\">\r\n                  <ion-radio slot=\"start\" value=\"external\"></ion-radio>\r\n                  <ion-label style=\"text-transform: capitalize\">\r\n                    External Link :\r\n                  </ion-label>&nbsp;\r\n                  <ion-input [(ngModel)]='linkUrl' style=\"border: 1px solid;max-width: 250px;\"></ion-input>\r\n                </ion-item>\r\n                <ion-item class=\"bs-links\" lines=\"none\" (click)=\"selectStaticLink('contactUs')\">\r\n                  <ion-radio slot=\"start\" value=\"contactUs\"></ion-radio>\r\n                  <ion-label style=\"text-transform: capitalize\">\r\n                    Contact Us\r\n                  </ion-label>\r\n                </ion-item>\r\n                <ion-item class=\"bs-links\" lines=\"none\" (click)=\"selectStaticLink('referEarn')\">\r\n                  <ion-radio slot=\"start\" value=\"referEarn\"></ion-radio>\r\n                  <ion-label style=\"text-transform: capitalize\">\r\n                    Refer and Earn\r\n                  </ion-label>\r\n                </ion-item>\r\n                <ion-item class=\"bs-links\" lines=\"none\" (click)=\"selectStaticLink('feedback')\">\r\n                  <ion-radio slot=\"start\" value=\"feedback\"></ion-radio>\r\n                  <ion-label style=\"text-transform: capitalize\">\r\n                    Feedback\r\n                  </ion-label>\r\n                </ion-item>\r\n                <ion-item class=\"bs-links\" lines=\"none\" (click)=\"selectStaticLink('offers')\">\r\n                  <ion-radio slot=\"start\" value=\"offers\"></ion-radio>\r\n                  <ion-label style=\"text-transform: capitalize\">\r\n                    Offers\r\n                  </ion-label>\r\n                </ion-item>\r\n                <ion-item class=\"bs-links\" lines=\"none\" (click)=\"selectStaticLink('membership')\">\r\n                  <ion-radio slot=\"start\" value=\"membership\"></ion-radio>\r\n                  <ion-label style=\"text-transform: capitalize\">\r\n                    Membership\r\n                  </ion-label>\r\n                </ion-item>\r\n                <div style=\"display: flex; align-items: center\">\r\n                  <ion-item class=\"bs-links\" lines=\"none\" (click)=\"selectStaticLink('pdf')\">\r\n                    <ion-radio slot=\"start\" value=\"pdf\"></ion-radio>\r\n                    <p>PDF File</p>\r\n                    <div class=\"upload-btn-wrapper\">\r\n                      <button class=\"upload-btn btn-1 i-start\"> <i class=\"flaticon-null-16\"></i>Upload Pdf File</button>\r\n                      <input type=\"file\" name=\"myfile\" (change)=\"uploadPdf($event.target.files)\" />\r\n                    </div>\r\n                    <br>\r\n                  </ion-item>\r\n                  <a href=\"{{pdfUrl}}\" target=\"_blank\" *ngIf=\"pdfUrl != '' \">Uploaded File</a>&nbsp;&nbsp;\r\n                  <p *ngIf=\"slideData.link && slideData.link.type == 'pdf' && slideData.link.url && newFile == true\">\r\n                    Selected File : {{slideData.link.url.name}}</p>\r\n                </div> -->\r\n              </ion-radio-group>\r\n\r\n            </ion-list>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </ng-container>\r\n  </div>\r\n</ion-content>\r\n\r\n<ion-footer no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n\r\n    <ion-button *ngIf=\"!slideID\" (click)=\"addSlide()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Publish Slide\r\n    </ion-button>\r\n\r\n    <ion-button *ngIf=\"slideID\" (click)=\"updateSlide()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Update Slide\r\n    </ion-button>\r\n\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/pages/widgets/widget-banner-slider/edit-slide/edit-slide.module.ts":
/*!************************************************************************************!*\
  !*** ./src/app/pages/widgets/widget-banner-slider/edit-slide/edit-slide.module.ts ***!
  \************************************************************************************/
/*! exports provided: EditSlidePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditSlidePageModule", function() { return EditSlidePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _edit_slide_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./edit-slide.page */ "./src/app/pages/widgets/widget-banner-slider/edit-slide/edit-slide.page.ts");







var routes = [
    {
        path: '',
        component: _edit_slide_page__WEBPACK_IMPORTED_MODULE_6__["EditSlidePage"]
    }
];
var EditSlidePageModule = /** @class */ (function () {
    function EditSlidePageModule() {
    }
    EditSlidePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_edit_slide_page__WEBPACK_IMPORTED_MODULE_6__["EditSlidePage"]]
        })
    ], EditSlidePageModule);
    return EditSlidePageModule;
}());



/***/ }),

/***/ "./src/app/pages/widgets/widget-banner-slider/edit-slide/edit-slide.page.scss":
/*!************************************************************************************!*\
  !*** ./src/app/pages/widgets/widget-banner-slider/edit-slide/edit-slide.page.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3dpZGdldHMvd2lkZ2V0LWJhbm5lci1zbGlkZXIvZWRpdC1zbGlkZS9lZGl0LXNsaWRlLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/widgets/widget-banner-slider/edit-slide/edit-slide.page.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/pages/widgets/widget-banner-slider/edit-slide/edit-slide.page.ts ***!
  \**********************************************************************************/
/*! exports provided: EditSlidePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditSlidePage", function() { return EditSlidePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_admin_banners_banner_linking_modal_banner_linking_modal_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../admin/admin-banners/banner-linking-modal/banner-linking-modal.page */ "./src/app/admin/admin-banners/banner-linking-modal/banner-linking-modal.page.ts");
/* harmony import */ var src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/components/image-editor/image-editor.component */ "./src/app/components/image-editor/image-editor.component.ts");







var EditSlidePage = /** @class */ (function () {
    function EditSlidePage(events, router, alertController, loadingController, toastController, labelService, activatedRoute, modalController) {
        var _this = this;
        this.events = events;
        this.router = router;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.labelService = labelService;
        this.activatedRoute = activatedRoute;
        this.modalController = modalController;
        this.linkTypes = [];
        this.mode = 'edit';
        this.linkUrl = '';
        this.pdfUrl = '';
        this.newFile = false;
        this.statusType = '';
        this.currentType = '';
        this.activatedRoute.queryParams.subscribe(function (params) {
            if (_this.router.getCurrentNavigation().extras.state) {
                if (_this.router.getCurrentNavigation().extras.state.bannerID) {
                    _this.bannerID = _this.router.getCurrentNavigation().extras.state.bannerID;
                    _this.type = _this.router.getCurrentNavigation().extras.state.type;
                    //console.log("type:",this.type)
                }
                if (_this.router.getCurrentNavigation().extras.state.slideID) {
                    _this.slideID = _this.router.getCurrentNavigation().extras.state.slideID;
                    _this.events.publish('widgets:getBannerSlide', _this.bannerID, _this.slideID, _this.type);
                }
                else {
                    _this.setNewSlide();
                }
                if (_this.router.getCurrentNavigation().extras.state.widgetType) {
                    _this.widgetType = _this.router.getCurrentNavigation().extras.state.widgetType;
                }
                if (_this.router.getCurrentNavigation().extras.state.slideData) {
                    var slideUrl = _this.router.getCurrentNavigation().extras.state.slideData.link.url;
                    var slideType = _this.router.getCurrentNavigation().extras.state.slideData.link.type;
                    if (slideType && slideType == 'external' && slideUrl) {
                        _this.linkUrl = slideUrl;
                    }
                    if (slideType && slideType == 'pdf' && slideUrl) {
                        _this.pdfUrl = slideUrl;
                    }
                }
            }
        });
    }
    EditSlidePage.prototype.setNewSlide = function () {
        this.slideData = {
            active: true,
            image: {
                org: '',
                thumb: '',
                mob: '',
            },
            link: {
                type: 'none',
                id: '',
                name: ''
            },
            caption: ''
        };
    };
    EditSlidePage.prototype.ngOnInit = function () {
        //this.setNewSlide();
        this.BANNER_SETTINGS_LABELS = this.labelService.labels['BANNER_SETTINGS'];
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.linkTypes = [
            this.BANNER_SETTINGS_LABELS['none'],
            this.BANNER_SETTINGS_LABELS['product'],
            this.BANNER_SETTINGS_LABELS['category'],
            'subcategory',
            this.BANNER_SETTINGS_LABELS['brand'],
        ];
    };
    EditSlidePage.prototype.ionViewWillEnter = function () {
        //console.log('edit slide ionViewWillEnter')
        this.initializeSubscriptions();
    };
    EditSlidePage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    EditSlidePage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('widgets:addBannerSlideSuccess');
        this.events.unsubscribe('widgets:updateBannerSlideSuccess');
        this.events.unsubscribe('widgets:publishgetBannerSlideSuccess');
    };
    EditSlidePage.prototype.initializeSubscriptions = function () {
        //console.log('initializeSubscriptions ionViewWillEnter') 
        var _this = this;
        this.events.subscribe('widgets:addBannerSlideSuccess', function (ID) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        return [4 /*yield*/, this.presentAlert('Slide added successfully, uploaded image will updated shortly')];
                    case 1:
                        _a.sent();
                        this.slideID = ID;
                        this.goBack();
                        return [2 /*return*/];
                }
            });
        }); });
        this.events.subscribe('widgets:updateBannerSlideSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('Slide updated successfully,uploaded image will updated shortly');
            _this.goBack();
        });
        this.events.subscribe('widgets:publishgetBannerSlideSuccess', function (slideData) {
            console.log('slide data:', slideData);
            _this.slideData = slideData;
            _this.currentType = "type" in _this.slideData.link ? _this.slideData.link.type : "";
            _this.linkLength = "ids" in _this.slideData.link ? _this.slideData.link.ids.length : _this.linkLength;
            //console.log(this.slideData)
        });
    };
    EditSlidePage.prototype.uploadImage = function (files) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_6__["ImageEditorComponent"],
                            componentProps: {
                                aspectRatioWidthVal: 3.42,
                                aspectRatioHeightVal: 1,
                            },
                            cssClass: 'custom-img-editor'
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        modal.onDidDismiss().then(function (res) {
                            if (res && res.data) {
                                console.log('modal data', res.data);
                                _this.slideData.image.org = res.data || '';
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    EditSlidePage.prototype.uploadPdf = function (file) {
        if (file[0]) {
            console.log(file[0]);
            this.slideData.link.url = file[0];
            this.newFile = true;
        }
    };
    EditSlidePage.prototype.selectLinkType = function (i) {
        var type = this.linkTypes[i];
        this.slideData.link.type = type;
        if (type === this.BANNER_SETTINGS_LABELS['product']) {
            this.presentModal(this.slideData.link.type);
        }
        else if (type === this.BANNER_SETTINGS_LABELS['category']) {
            this.presentModal(this.slideData.link.type);
        }
        else if (type === 'subcategory') {
            this.presentModal(this.slideData.link.type);
        }
        else if (type === 'page') {
            this.presentModal(this.slideData.link.type);
        }
        else if (type === this.BANNER_SETTINGS_LABELS['brand']) {
            this.presentModal(this.slideData.link.type);
        }
        else if (type === this.BANNER_SETTINGS_LABELS['service']) {
            this.presentModal(this.slideData.link.type);
        }
        else if (type === this.BANNER_SETTINGS_LABELS['search']) {
            this.searchTextAlert();
        }
        else if (type === this.BANNER_SETTINGS_LABELS['refer_and_earn']) {
            return null;
        }
        else {
            // return null;
            this.defaultLinkType();
        }
        this.slideData.link.ids = [];
        this.slideData.link.name = '';
    };
    EditSlidePage.prototype.presentModal = function (type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // console.log('linkId:', this.slideData.link.ids);
                        // console.log('currentType:', this.slideData.type);
                        // console.log('modal linkType : ', type);
                        // console.log('modal linkId : ', this.slideData.link.ids);
                        // console.log('modal currentType : ', this.slideData.type);
                        // console.log('modal status : ', this.statusType);
                        if (type !== this.currentType) {
                            this.slideData.link.ids = [];
                        }
                        return [4 /*yield*/, this.modalController.create({
                                component: _admin_admin_banners_banner_linking_modal_banner_linking_modal_page__WEBPACK_IMPORTED_MODULE_5__["BannerLinkingModalPage"],
                                cssClass: 'custom-modal',
                                showBackdrop: true,
                                backdropDismiss: false,
                                componentProps: {
                                    linkType: type,
                                    linkId: this.slideData.link.ids,
                                    currentType: this.slideData.type,
                                    status: this.statusType
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (res) {
                            //console.log('data from modal', res);
                            if (res && res.data) {
                                console.log('res.data : ', res.data);
                                _this.slideData.link.ids = res.data.id || [];
                                if (res.data.id && res.data.id.length > 0) {
                                    _this.slideData.link.id = res.data.id[0];
                                }
                                else {
                                    _this.slideData.link.id = '';
                                }
                                _this.linkLength = _this.slideData.link.ids.length;
                                _this.statusType = res.data.status || '';
                                _this.currentType = res.data.type || '';
                                if (res.data.name) {
                                    _this.slideData.link.name = res.data.name;
                                }
                                if (res.data.hasOwnProperty('isSubcategories')) {
                                    _this.slideData.link['isSubcategories'] = res.data.isSubcategories;
                                }
                                if (type == 'subcategory') {
                                    _this.slideData.link['categoryId'] = res.data.categoryId;
                                }
                                if (res.data.hasOwnProperty('serviceData')) {
                                    _this.slideData.link['serviceData'] = res.data.serviceData;
                                }
                                _this.statusType = res.data.status || '';
                            }
                            else {
                                _this.defaultLinkType();
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditSlidePage.prototype.checkCurrentType = function (type) {
        if (type === this.currentType) {
            return true;
        }
        else {
            return false;
        }
    };
    EditSlidePage.prototype.defaultLinkType = function () {
        this.slideData.link.ids = [];
        this.slideData.link.name = '';
        this.slideData.link.type = this.BANNER_SETTINGS_LABELS['none'];
        delete this.slideData.link.url;
        this.linkUrl = '';
        this.linkLength = '';
    };
    EditSlidePage.prototype.selectStaticLink = function (type) {
        this.slideData.link.ids = [];
        this.slideData.link.name = '';
        if (type == 'contactUs') {
            this.slideData.link.type = 'contactUs';
        }
        else if (type == 'referEarn') {
            this.slideData.link.type = 'referEarn';
        }
        else if (type == 'feedback') {
            this.slideData.link.type = 'feedback';
        }
        else if (type == 'offers') {
            this.slideData.link.type = 'offers';
        }
        else if (type == 'membership') {
            this.slideData.link.type = 'membership';
        }
        else if (type == 'external') {
            this.slideData.link.type = 'external';
            this.slideData.link.url = this.linkUrl;
        }
        else if (type == 'pdf') {
            this.slideData.link.type = 'pdf';
        }
    };
    EditSlidePage.prototype.searchTextAlert = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
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
                                    handler: function () {
                                        _this.defaultLinkType();
                                    }
                                }, {
                                    text: this.SHARED_LABELS['add'],
                                    handler: function (data) {
                                        if (!data.searchTxt) {
                                            _this.defaultLinkType();
                                            _this.presentAlert(_this.BANNER_SETTINGS_LABELS['please_enter_valid_data']);
                                        }
                                        else {
                                            _this.slideData.link.name = data.searchTxt;
                                        }
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
    EditSlidePage.prototype.presentToast = function (msg) {
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
    EditSlidePage.prototype.updateSlide = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.slideData.active && !this.slideData.image.org)) return [3 /*break*/, 1];
                        this.presentAlert(this.BANNER_SETTINGS_LABELS['upload_banner_msg']);
                        return [3 /*break*/, 11];
                    case 1:
                        this.filterData();
                        if (!(this.slideData.link && this.slideData.link.type == 'external')) return [3 /*break*/, 5];
                        if (!(this.linkUrl != '' && this.isValidHttpUrl(this.linkUrl))) return [3 /*break*/, 3];
                        this.slideData.link.url = this.linkUrl;
                        return [4 /*yield*/, this.presentLoading()];
                    case 2:
                        _a.sent();
                        this.events.publish('widgets:updateBannerSlide', this.slideData, this.bannerID, this.slideID, this.type);
                        return [3 /*break*/, 4];
                    case 3:
                        this.presentAlert('Please enter a valid link');
                        _a.label = 4;
                    case 4: return [3 /*break*/, 11];
                    case 5:
                        if (!(this.slideData.link && this.slideData.link.type == 'pdf')) return [3 /*break*/, 9];
                        if (!this.slideData.link.url) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.presentLoading()];
                    case 6:
                        _a.sent();
                        this.events.publish('widgets:updateBannerSlide', this.slideData, this.bannerID, this.slideID, this.type);
                        return [3 /*break*/, 8];
                    case 7:
                        this.presentAlert('Please select a file to upload');
                        _a.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, this.presentLoading()];
                    case 10:
                        _a.sent();
                        this.events.publish('widgets:updateBannerSlide', this.slideData, this.bannerID, this.slideID, this.type);
                        _a.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    EditSlidePage.prototype.isValidHttpUrl = function (string) {
        var url;
        try {
            url = new URL(string);
        }
        catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    };
    EditSlidePage.prototype.addSlide = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.slideData.active && !this.slideData.image.org)) return [3 /*break*/, 1];
                        this.presentAlert(this.BANNER_SETTINGS_LABELS['upload_banner_msg']);
                        return [3 /*break*/, 11];
                    case 1:
                        this.filterData();
                        if (!(this.slideData.link && this.slideData.link.type == 'external')) return [3 /*break*/, 5];
                        if (!(this.linkUrl != '' && this.isValidHttpUrl(this.linkUrl))) return [3 /*break*/, 3];
                        this.slideData.link.url = this.linkUrl;
                        return [4 /*yield*/, this.presentLoading()];
                    case 2:
                        _a.sent();
                        this.events.publish('widgets:addBannerSlide', this.slideData, this.bannerID, this.type);
                        return [3 /*break*/, 4];
                    case 3:
                        this.presentAlert('Please enter a valid link');
                        _a.label = 4;
                    case 4: return [3 /*break*/, 11];
                    case 5:
                        if (!(this.slideData.link && this.slideData.link.type == 'pdf')) return [3 /*break*/, 9];
                        if (!this.slideData.link.url) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.presentLoading()];
                    case 6:
                        _a.sent();
                        this.events.publish('widgets:addBannerSlide', this.slideData, this.bannerID, this.type);
                        return [3 /*break*/, 8];
                    case 7:
                        this.presentAlert('Please select a file to upload');
                        _a.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, this.presentLoading()];
                    case 10:
                        _a.sent();
                        this.events.publish('widgets:addBannerSlide', this.slideData, this.bannerID, this.type);
                        _a.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    EditSlidePage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: [{
                                    text: 'Okay',
                                    handler: function () {
                                        //console.log('Confirm Okay');
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
    EditSlidePage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: this.SHARED_LABELS['please_wait'],
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
    EditSlidePage.prototype.filterData = function () {
        if (this.slideData.link.type !== this.BANNER_SETTINGS_LABELS['category'] && this.slideData.link.hasOwnProperty('isSubcategories')) {
            delete this.slideData.link.isSubcategories;
        }
        if (this.slideData.link.type !== this.BANNER_SETTINGS_LABELS['service'] && this.slideData.link.hasOwnProperty('serviceData')) {
            delete this.slideData.link.serviceData;
        }
    };
    EditSlidePage.prototype.removeImage = function () {
        this.slideData.image.org = '';
        this.slideData.image.mob = '';
        this.slideData.image.thumb = '';
    };
    EditSlidePage.prototype.goBack = function () {
        // this.navController.back();
        var navigationExtras = {
            queryParams: {
                ID: this.bannerID,
            }
        };
        this.router.navigate(['edit-banner'], navigationExtras);
    };
    EditSlidePage.prototype.uploadQR = function (files) {
        var _this = this;
        for (var i = 0; i < files.length; i++) {
            var reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = function (event) {
                var base64Image = event.target.result;
                _this.slideData.url = base64Image;
            };
        }
    };
    EditSlidePage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"] },
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__["LabelService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] }
    ]; };
    EditSlidePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-edit-slide',
            template: __webpack_require__(/*! raw-loader!./edit-slide.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/widget-banner-slider/edit-slide/edit-slide.page.html"),
            styles: [__webpack_require__(/*! ./edit-slide.page.scss */ "./src/app/pages/widgets/widget-banner-slider/edit-slide/edit-slide.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"],
            src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__["LabelService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"]])
    ], EditSlidePage);
    return EditSlidePage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-widgets-widget-banner-slider-edit-slide-edit-slide-module-es5.js.map