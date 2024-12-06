(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["website-seo-website-seo-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/website-seo/website-seo.page.html":
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/website-seo/website-seo.page.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Website SEO</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container fixed-height\">\r\n    <div class=\"spinner\" *ngIf=\"showLoader; else showWediteSEOData\">\r\n      <ion-spinner color=\"primary\"></ion-spinner>\r\n    </div>\r\n    <ng-template #showWediteSEOData>\r\n      <div style=\"text-align: center;\">\r\n        <ion-button  (click)=\"saveData()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\" fill=\"outline\">\r\n          <i class=\"flaticon-null-20 margin-icon\"></i>\r\n          Save\r\n        </ion-button>\r\n      </div>\r\n      <ion-grid >\r\n        <ion-row>\r\n          <ion-col size=\"12\">\r\n            <div class=\"input-wrap\">\r\n              <ion-label>Page Title</ion-label>\r\n              <ion-input class=\"form-input\" [(ngModel)]=\"websiteSEOData.pageTitle\"></ion-input>\r\n            </div>\r\n          </ion-col>\r\n          <ion-col size=\"12\">\r\n            <div class=\"input-wrap\">\r\n              <ion-label>Description</ion-label>\r\n              <ion-input class=\"form-input\" [(ngModel)]=\"websiteSEOData.metaDescription\"></ion-input>\r\n            </div>\r\n          </ion-col>\r\n          <ion-col size=\"12\">\r\n            <div class=\"input-wrap\">\r\n              <ion-label>Keywords</ion-label>\r\n              <ion-input class=\"form-input\" [(ngModel)]=\"websiteSEOData.metaKeywords\"></ion-input>\r\n            </div>\r\n          </ion-col>\r\n          <ion-col size=\"12\">\r\n            <div class=\"input-wrap\">\r\n              <ion-label>Social Media Title</ion-label>\r\n              <ion-input class=\"form-input\" [(ngModel)]=\"websiteSEOData.socialMediaTitle\"></ion-input>\r\n            </div>\r\n          </ion-col>\r\n\r\n          <ion-col size=\"12\">\r\n            <div class=\"input-wrap\">\r\n              <ion-label>Social Media Description</ion-label>\r\n              <ion-input class=\"form-input\" [(ngModel)]=\"websiteSEOData.socialMediaDescription\"></ion-input>\r\n            </div>\r\n          </ion-col>\r\n\r\n          <ion-col size=\"12\">\r\n            <div class=\"input-wrap\">\r\n              <ion-label>Social Media URL</ion-label>\r\n              <ion-input class=\"form-input\" [(ngModel)]=\"websiteSEOData.socialMediaURL\"></ion-input>\r\n            </div>\r\n          </ion-col>\r\n\r\n         <ion-col size=\"12\">\r\n            <div class=\"flex-space-between\">\r\n              <div class=\"upload-btn-wrapper\">\r\n                <ion-label>Social Media Image</ion-label>\r\n                <button class=\"upload-btn btn-1 i-start\"> <i class=\"flaticon-null-16\"></i>upload</button>\r\n                <input type=\"file\" name=\"myfile\" (change)=\"uploadImage($event.target.files)\" />\r\n              </div>\r\n            </div>\r\n          </ion-col>\r\n          <ion-col size=\"12\">\r\n            <div class=\"img-container\">\r\n              <div class=\"no-img\" *ngIf=\"!websiteSEOData.socialMediaBannerURL\">\r\n                <p>No attached image</p>\r\n              </div>\r\n              <div *ngIf=\"websiteSEOData.socialMediaBannerURL\">\r\n                <div class=\"img-wrap\">\r\n                  <img class=\"category-img\" [src]=\"websiteSEOData.socialMediaBannerURL\" />\r\n                  <div class=\"overlay\">\r\n                    <ion-button class=\"btn-2 remove\" shape=\"round\" fill=\"clear\" color=\"danger\"\r\n                    (click)=\"removeImage()\">\r\n                      <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\r\n                    </ion-button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </ion-col>\r\n\r\n\r\n\r\n        </ion-row>\r\n      </ion-grid>\r\n    </ng-template>\r\n    </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/website-seo/website-seo.module.ts":
/*!***************************************************!*\
  !*** ./src/app/website-seo/website-seo.module.ts ***!
  \***************************************************/
/*! exports provided: WebsiteSeoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebsiteSeoPageModule", function() { return WebsiteSeoPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _website_seo_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./website-seo.page */ "./src/app/website-seo/website-seo.page.ts");







const routes = [
    {
        path: '',
        component: _website_seo_page__WEBPACK_IMPORTED_MODULE_6__["WebsiteSeoPage"]
    }
];
let WebsiteSeoPageModule = class WebsiteSeoPageModule {
};
WebsiteSeoPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_website_seo_page__WEBPACK_IMPORTED_MODULE_6__["WebsiteSeoPage"]]
    })
], WebsiteSeoPageModule);



/***/ }),

/***/ "./src/app/website-seo/website-seo.page.scss":
/*!***************************************************!*\
  !*** ./src/app/website-seo/website-seo.page.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3dlYnNpdGUtc2VvL3dlYnNpdGUtc2VvLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/website-seo/website-seo.page.ts":
/*!*************************************************!*\
  !*** ./src/app/website-seo/website-seo.page.ts ***!
  \*************************************************/
/*! exports provided: WebsiteSeoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebsiteSeoPage", function() { return WebsiteSeoPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_admin_settings_admin_settings_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/admin-settings/admin-settings.service */ "./src/app/services/admin-settings/admin-settings.service.ts");




let WebsiteSeoPage = class WebsiteSeoPage {
    constructor(events, alertController, loadingController, toastController, adminSettingsService) {
        this.events = events;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.adminSettingsService = adminSettingsService;
        this.showLoader = false;
        this.websiteSEOData = {
            pageTitle: "",
            metaDescription: "",
            metaKeywords: "",
            socialMediaBannerURL: "",
            socialMediaTitle: "",
            socialMediaDescription: "",
            socialMediaURL: ""
        };
    }
    ngOnInit() {
        this.events.publish('admin-settings:getWebsiteSEOData');
        this.events.subscribe('admin-settings:saveWebsiteSEODataSuccess', () => {
            if (this.loading) {
                this.loading.dismiss();
            }
            if (!this.alert) {
                this.presentAlert('Settings saved successfully!');
            }
        });
        this.events.subscribe('admin-settings:publishSEOData', (seoData) => {
            this.websiteSEOData = seoData;
            /*if(seoData.socialMediaBannerURL){
              this.socialMediaBanner = seoData.socialMediaBannerURL;
            }*/
        });
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'please wait',
            });
            yield this.loading.present();
        });
    }
    presentToast() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: 'Your settings have been saved.',
                duration: 2000
            });
            toast.present();
        });
    }
    presentAlert(desc, action) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.alert = yield this.alertController.create({
                message: desc,
                buttons: [{
                        text: 'Ok',
                    }]
            });
            yield this.alert.present();
        });
    }
    saveData() {
        this.presentLoading();
        this.events.publish('admin-settings:saveWebsiteSEOData', this.websiteSEOData, this.socialMediaBanner);
    }
    uploadImage(files) {
        this.presentLoading();
        for (let i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = (event) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                let base64Image = event.target.result;
                this.socialMediaBanner = base64Image;
                this.websiteSEOData.socialMediaBannerURL = yield this.adminSettingsService.uploadSEOBanner(base64Image);
                if (this.loading) {
                    this.loading.dismiss();
                }
            });
        }
    }
    removeImage() {
        this.socialMediaBanner = '';
        this.websiteSEOData.socialMediaBannerURL = '';
    }
};
WebsiteSeoPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
    { type: _services_admin_settings_admin_settings_service__WEBPACK_IMPORTED_MODULE_3__["AdminSettingsService"] }
];
WebsiteSeoPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-website-seo',
        template: __webpack_require__(/*! raw-loader!./website-seo.page.html */ "./node_modules/raw-loader/index.js!./src/app/website-seo/website-seo.page.html"),
        styles: [__webpack_require__(/*! ./website-seo.page.scss */ "./src/app/website-seo/website-seo.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
        _services_admin_settings_admin_settings_service__WEBPACK_IMPORTED_MODULE_3__["AdminSettingsService"]])
], WebsiteSeoPage);



/***/ })

}]);
//# sourceMappingURL=website-seo-website-seo-module-es2015.js.map