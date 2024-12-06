(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["about-setting-about-setting-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/about-setting/about-setting.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/about-setting/about-setting.page.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">About Page</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container fixed-height\">\r\n    <ion-grid *ngIf=\"aboutPageData\">\r\n        <ion-row>\r\n          <ion-col size=\"12\">\r\n            <div class=\"input-wrap\">\r\n              <div class=\"flex-space-between\">\r\n                <div><ion-label>Page Title</ion-label></div>\r\n                <div class=\"flex-label\"><ion-label>Enable</ion-label>\r\n                  <ion-toggle \r\n                  [checked]=\"aboutPageData.activeStatus\" [(ngModel)]=\"aboutPageData.activeStatus\"></ion-toggle>\r\n                </div>\r\n              </div>\r\n              \r\n              <ion-input class=\"form-input\" [(ngModel)]=\"aboutPageData.pageTitle\"></ion-input>\r\n            </div>\r\n          </ion-col>\r\n          <ion-col size=\"12\">\r\n            <div class=\"flex-space-between\">\r\n              <div><ion-label>Banner Image</ion-label></div>\r\n              <div class=\"upload-btn-wrapper\">\r\n                <button class=\"upload-btn btn-1 i-start\"> <i class=\"flaticon-null-16\"></i>upload</button>\r\n                <input type=\"file\" name=\"myfile\" (change)=\"uploadImage($event.target.files)\" />\r\n              </div>\r\n            </div>\r\n          </ion-col>\r\n          <ion-col size=\"12\">\r\n            <div class=\"img-container\">\r\n              <div class=\"no-img\" *ngIf=\"!aboutPageData.bannerImageURL.org\">\r\n                <p>No attached image</p>\r\n              </div>\r\n              <div *ngIf=\"aboutPageData.bannerImageURL\">\r\n                <div class=\"img-wrap\">\r\n                  <img class=\"category-img\" [src]=\"aboutPageData.bannerImageURL.org\" />\r\n                  <div class=\"overlay\">\r\n                    <ion-button class=\"btn-2 remove\" shape=\"round\" fill=\"clear\" color=\"danger\"\r\n                      (click)=\"removeImage()\">\r\n                      <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\r\n                    </ion-button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </ion-col>\r\n          <ion-col size=\"12\">\r\n            <div class=\"input-wrap\">\r\n              <ion-label>Page Content</ion-label>\r\n              <ckeditor [(ngModel)]=\"aboutPageData.pageContent\" [config]=\"ckeConfig\"></ckeditor>\r\n            </div>\r\n          </ion-col>\r\n\r\n          </ion-row>\r\n          </ion-grid>\r\n  \r\n    </div>\r\n</ion-content>\r\n\r\n<ion-footer   *ngIf=\"aboutPageData\" no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"saveData()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/about-setting/about-setting.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/about-setting/about-setting.module.ts ***!
  \*******************************************************/
/*! exports provided: AboutSettingPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutSettingPageModule", function() { return AboutSettingPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _about_setting_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./about-setting.page */ "./src/app/about-setting/about-setting.page.ts");








const routes = [
    {
        path: '',
        component: _about_setting_page__WEBPACK_IMPORTED_MODULE_7__["AboutSettingPage"]
    }
];
let AboutSettingPageModule = class AboutSettingPageModule {
};
AboutSettingPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ng2_ckeditor__WEBPACK_IMPORTED_MODULE_5__["CKEditorModule"]
        ],
        declarations: [_about_setting_page__WEBPACK_IMPORTED_MODULE_7__["AboutSettingPage"]]
    })
], AboutSettingPageModule);



/***/ }),

/***/ "./src/app/about-setting/about-setting.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/about-setting/about-setting.page.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Fib3V0LXNldHRpbmcvYWJvdXQtc2V0dGluZy5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/about-setting/about-setting.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/about-setting/about-setting.page.ts ***!
  \*****************************************************/
/*! exports provided: AboutSettingPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutSettingPage", function() { return AboutSettingPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var _angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/storage */ "./node_modules/@angular/fire/storage/es2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");







let AboutSettingPage = class AboutSettingPage {
    constructor(angularFirestore, angularFireStorage, alertController, loadingController, sharedService) {
        this.angularFirestore = angularFirestore;
        this.angularFireStorage = angularFireStorage;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.sharedService = sharedService;
        this.ckeConfig = {
            allowedContent: true,
            height: 700
        };
        this.aboutPageData = {
            pageTitle: '',
            bannerImageURL: {},
            pageContent: ''
        };
        this.getPageData();
    }
    getPageData() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let data = yield this.angularFirestore.collection('pages').doc('about').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
            if (data) {
                this.aboutPageData = data;
            }
        });
    }
    uploadImage(files) {
        this.presentLoading();
        for (let i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = (event) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                let base64Image = event.target.result;
                this.aboutPageData.bannerImageURL['org'] = yield this.uploadSEOBanner(base64Image);
                if (this.loading) {
                    this.loading.dismiss();
                }
            });
        }
    }
    removeImage() {
        this.aboutPageData.bannerImageURL.org = '';
        this.aboutPageData.bannerImageURL.mob = '';
        this.aboutPageData.bannerImageURL.thumb = '';
    }
    uploadSEOBanner(socialMediaBannerImg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let imgType = this.sharedService.getImageType(socialMediaBannerImg);
            const imgRef = this.angularFireStorage.ref('websiteSEOData/socialMediaBanner' + imgType);
            yield imgRef.putString(socialMediaBannerImg, 'data_url');
            let downloadURL = yield imgRef.getDownloadURL().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
            return downloadURL;
        });
    }
    saveData() {
        this.presentLoading();
        const dataRef = this.angularFirestore.collection('pages').doc('about');
        dataRef.get().subscribe((doc) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (doc.exists) {
                yield dataRef.update(this.aboutPageData);
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.presentAlert('Settings updated successfully');
            }
            else {
                yield dataRef.set(this.aboutPageData);
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.presentAlert('Settings saved successfully');
            }
        }));
    }
    ngOnInit() {
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'please wait',
            });
            yield this.loading.present();
        });
    }
    presentAlert(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: [{
                        text: 'ok',
                        handler: () => {
                        }
                    }]
            });
            yield alert.present();
        });
    }
};
AboutSettingPage.ctorParameters = () => [
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] },
    { type: _angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__["AngularFireStorage"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["LoadingController"] },
    { type: _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__["SharedService"] }
];
AboutSettingPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-about-setting',
        template: __webpack_require__(/*! raw-loader!./about-setting.page.html */ "./node_modules/raw-loader/index.js!./src/app/about-setting/about-setting.page.html"),
        styles: [__webpack_require__(/*! ./about-setting.page.scss */ "./src/app/about-setting/about-setting.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"],
        _angular_fire_storage__WEBPACK_IMPORTED_MODULE_3__["AngularFireStorage"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["LoadingController"],
        _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_6__["SharedService"]])
], AboutSettingPage);



/***/ })

}]);
//# sourceMappingURL=about-setting-about-setting-module-es2015.js.map