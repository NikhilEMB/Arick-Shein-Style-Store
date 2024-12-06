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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _edit_slide_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./edit-slide.page */ "./src/app/pages/widgets/widget-banner-slider/edit-slide/edit-slide.page.ts");







const routes = [
    {
        path: '',
        component: _edit_slide_page__WEBPACK_IMPORTED_MODULE_6__["EditSlidePage"]
    }
];
let EditSlidePageModule = class EditSlidePageModule {
};
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_admin_banners_banner_linking_modal_banner_linking_modal_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../admin/admin-banners/banner-linking-modal/banner-linking-modal.page */ "./src/app/admin/admin-banners/banner-linking-modal/banner-linking-modal.page.ts");
/* harmony import */ var src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/components/image-editor/image-editor.component */ "./src/app/components/image-editor/image-editor.component.ts");







let EditSlidePage = class EditSlidePage {
    constructor(events, router, alertController, loadingController, toastController, labelService, activatedRoute, modalController) {
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
        this.activatedRoute.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                if (this.router.getCurrentNavigation().extras.state.bannerID) {
                    this.bannerID = this.router.getCurrentNavigation().extras.state.bannerID;
                    this.type = this.router.getCurrentNavigation().extras.state.type;
                    //console.log("type:",this.type)
                }
                if (this.router.getCurrentNavigation().extras.state.slideID) {
                    this.slideID = this.router.getCurrentNavigation().extras.state.slideID;
                    this.events.publish('widgets:getBannerSlide', this.bannerID, this.slideID, this.type);
                }
                else {
                    this.setNewSlide();
                }
                if (this.router.getCurrentNavigation().extras.state.widgetType) {
                    this.widgetType = this.router.getCurrentNavigation().extras.state.widgetType;
                }
                if (this.router.getCurrentNavigation().extras.state.slideData) {
                    let slideUrl = this.router.getCurrentNavigation().extras.state.slideData.link.url;
                    let slideType = this.router.getCurrentNavigation().extras.state.slideData.link.type;
                    if (slideType && slideType == 'external' && slideUrl) {
                        this.linkUrl = slideUrl;
                    }
                    if (slideType && slideType == 'pdf' && slideUrl) {
                        this.pdfUrl = slideUrl;
                    }
                }
            }
        });
    }
    setNewSlide() {
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
    }
    ngOnInit() {
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
    }
    ionViewWillEnter() {
        //console.log('edit slide ionViewWillEnter')
        this.initializeSubscriptions();
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    removeSubscriptions() {
        this.events.unsubscribe('widgets:addBannerSlideSuccess');
        this.events.unsubscribe('widgets:updateBannerSlideSuccess');
        this.events.unsubscribe('widgets:publishgetBannerSlideSuccess');
    }
    initializeSubscriptions() {
        //console.log('initializeSubscriptions ionViewWillEnter') 
        this.events.subscribe('widgets:addBannerSlideSuccess', (ID) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.loading) {
                this.loading.dismiss();
            }
            yield this.presentAlert('Slide added successfully, uploaded image will updated shortly');
            this.slideID = ID;
            this.goBack();
        }));
        this.events.subscribe('widgets:updateBannerSlideSuccess', () => {
            if (this.loading) {
                this.loading.dismiss();
            }
            this.presentAlert('Slide updated successfully,uploaded image will updated shortly');
            this.goBack();
        });
        this.events.subscribe('widgets:publishgetBannerSlideSuccess', (slideData) => {
            console.log('slide data:', slideData);
            this.slideData = slideData;
            this.currentType = "type" in this.slideData.link ? this.slideData.link.type : "";
            this.linkLength = "ids" in this.slideData.link ? this.slideData.link.ids.length : this.linkLength;
            //console.log(this.slideData)
        });
    }
    uploadImage(files) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // new code for image editor
            const modal = yield this.modalController.create({
                component: src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_6__["ImageEditorComponent"],
                componentProps: {
                    aspectRatioWidthVal: 3.42,
                    aspectRatioHeightVal: 1,
                },
                cssClass: 'custom-img-editor'
            });
            yield modal.present();
            modal.onDidDismiss().then(res => {
                if (res && res.data) {
                    console.log('modal data', res.data);
                    this.slideData.image.org = res.data || '';
                }
            });
            ////console.log(type);
            // for (let i = 0; i < files.length; i++) {
            //   let reader = new FileReader();
            //   reader.readAsDataURL(files.item(i))
            //   reader.onload = (event:any) => { // called once readAsDataURL is completed
            //     let base64Image:any = event.target.result;
            // this.slideData.image.org = res.data;
            //     ////console.log(this.slideData.org);
            //  }
            // }
        });
    }
    uploadPdf(file) {
        if (file[0]) {
            console.log(file[0]);
            this.slideData.link.url = file[0];
            this.newFile = true;
        }
    }
    selectLinkType(i) {
        const type = this.linkTypes[i];
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
    }
    presentModal(type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log('linkId:', this.slideData.link.ids);
            // console.log('currentType:', this.slideData.type);
            // console.log('modal linkType : ', type);
            // console.log('modal linkId : ', this.slideData.link.ids);
            // console.log('modal currentType : ', this.slideData.type);
            // console.log('modal status : ', this.statusType);
            if (type !== this.currentType) {
                this.slideData.link.ids = [];
            }
            const modal = yield this.modalController.create({
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
            });
            modal.onDidDismiss()
                .then((res) => {
                //console.log('data from modal', res);
                if (res && res.data) {
                    console.log('res.data : ', res.data);
                    this.slideData.link.ids = res.data.id || [];
                    if (res.data.id && res.data.id.length > 0) {
                        this.slideData.link.id = res.data.id[0];
                    }
                    else {
                        this.slideData.link.id = '';
                    }
                    this.linkLength = this.slideData.link.ids.length;
                    this.statusType = res.data.status || '';
                    this.currentType = res.data.type || '';
                    if (res.data.name) {
                        this.slideData.link.name = res.data.name;
                    }
                    if (res.data.hasOwnProperty('isSubcategories')) {
                        this.slideData.link['isSubcategories'] = res.data.isSubcategories;
                    }
                    if (type == 'subcategory') {
                        this.slideData.link['categoryId'] = res.data.categoryId;
                    }
                    if (res.data.hasOwnProperty('serviceData')) {
                        this.slideData.link['serviceData'] = res.data.serviceData;
                    }
                    this.statusType = res.data.status || '';
                }
                else {
                    this.defaultLinkType();
                }
            });
            yield modal.present();
        });
    }
    checkCurrentType(type) {
        if (type === this.currentType) {
            return true;
        }
        else {
            return false;
        }
    }
    defaultLinkType() {
        this.slideData.link.ids = [];
        this.slideData.link.name = '';
        this.slideData.link.type = this.BANNER_SETTINGS_LABELS['none'];
        delete this.slideData.link.url;
        this.linkUrl = '';
        this.linkLength = '';
    }
    selectStaticLink(type) {
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
                                this.presentAlert(this.BANNER_SETTINGS_LABELS['please_enter_valid_data']);
                            }
                            else {
                                this.slideData.link.name = data.searchTxt;
                            }
                        }
                    }
                ]
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
    updateSlide() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            //console.log(this.slideData,this.type)
            if (this.slideData.active && !this.slideData.image.org) {
                this.presentAlert(this.BANNER_SETTINGS_LABELS['upload_banner_msg']);
            }
            else {
                this.filterData();
                if (this.slideData.link && this.slideData.link.type == 'external') {
                    if (this.linkUrl != '' && this.isValidHttpUrl(this.linkUrl)) {
                        this.slideData.link.url = this.linkUrl;
                        yield this.presentLoading();
                        this.events.publish('widgets:updateBannerSlide', this.slideData, this.bannerID, this.slideID, this.type);
                    }
                    else {
                        this.presentAlert('Please enter a valid link');
                    }
                }
                else if (this.slideData.link && this.slideData.link.type == 'pdf') {
                    if (this.slideData.link.url) {
                        yield this.presentLoading();
                        this.events.publish('widgets:updateBannerSlide', this.slideData, this.bannerID, this.slideID, this.type);
                    }
                    else {
                        this.presentAlert('Please select a file to upload');
                    }
                }
                else {
                    yield this.presentLoading();
                    this.events.publish('widgets:updateBannerSlide', this.slideData, this.bannerID, this.slideID, this.type);
                }
            }
        });
    }
    isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        }
        catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }
    addSlide() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.slideData.active && !this.slideData.image.org) {
                this.presentAlert(this.BANNER_SETTINGS_LABELS['upload_banner_msg']);
            }
            else {
                this.filterData();
                if (this.slideData.link && this.slideData.link.type == 'external') {
                    if (this.linkUrl != '' && this.isValidHttpUrl(this.linkUrl)) {
                        this.slideData.link.url = this.linkUrl;
                        yield this.presentLoading();
                        this.events.publish('widgets:addBannerSlide', this.slideData, this.bannerID, this.type);
                    }
                    else {
                        this.presentAlert('Please enter a valid link');
                    }
                }
                else if (this.slideData.link && this.slideData.link.type == 'pdf') {
                    if (this.slideData.link.url) {
                        yield this.presentLoading();
                        this.events.publish('widgets:addBannerSlide', this.slideData, this.bannerID, this.type);
                    }
                    else {
                        this.presentAlert('Please select a file to upload');
                    }
                }
                else {
                    yield this.presentLoading();
                    this.events.publish('widgets:addBannerSlide', this.slideData, this.bannerID, this.type);
                }
            }
        });
    }
    presentAlert(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: [{
                        text: 'Okay',
                        handler: () => {
                            //console.log('Confirm Okay');
                        }
                    }]
            });
            yield alert.present();
        });
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
    filterData() {
        if (this.slideData.link.type !== this.BANNER_SETTINGS_LABELS['category'] && this.slideData.link.hasOwnProperty('isSubcategories')) {
            delete this.slideData.link.isSubcategories;
        }
        if (this.slideData.link.type !== this.BANNER_SETTINGS_LABELS['service'] && this.slideData.link.hasOwnProperty('serviceData')) {
            delete this.slideData.link.serviceData;
        }
    }
    removeImage() {
        this.slideData.image.org = '';
        this.slideData.image.mob = '';
        this.slideData.image.thumb = '';
    }
    goBack() {
        // this.navController.back();
        const navigationExtras = {
            queryParams: {
                ID: this.bannerID,
            }
        };
        this.router.navigate(['edit-banner'], navigationExtras);
    }
    uploadQR(files) {
        for (let i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = (event) => {
                let base64Image = event.target.result;
                this.slideData.url = base64Image;
            };
        }
    }
};
EditSlidePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"] },
    { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__["LabelService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] }
];
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



/***/ })

}]);
//# sourceMappingURL=pages-widgets-widget-banner-slider-edit-slide-edit-slide-module-es2015.js.map