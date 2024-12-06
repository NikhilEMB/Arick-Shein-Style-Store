(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-product-settings-product-settings-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/product-settings/product-settings.page.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/product-settings/product-settings.page.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">Product Settings</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=\"4\">\r\n          <div class=\"dFlex\">\r\n            <ion-label>Show price slab to users</ion-label>\r\n            <div class=\"toggle-btn\">\r\n              <label class=\"switch\">\r\n                <input type=\"checkbox\" (click)=\"toggleCheckbox()\" [checked]=\"showPriceSlab\">\r\n                <span class=\"slider round\"></span>\r\n              </label>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div class=\"sub-heading\">\r\n            <h3>Product Subheading</h3>\r\n            <div class=\"setting\">\r\n              \r\n              <div class=\"setting-text dFlex\">\r\n                <p>Text</p>&nbsp;&nbsp;\r\n                <ion-input type=\"text\" placeholder=\"please enter your sub-heading\" class=\"form-input\" [(ngModel)]=\"subheading.text\"></ion-input>\r\n              </div>\r\n              <div class=\"setting-img dFlex\">\r\n                <p>Img</p>\r\n                <div class=\"upload-btn-wrapper\">\r\n                  <button class=\"upload-btn btn-1 i-start\"> <i class=\"flaticon-null-16\"></i>Upload SubHeading Image</button>\r\n                  <input type=\"file\" name=\"myfile\" (change)=\"uploadLogo($event.target.files)\" />\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"subheading.img\">\r\n                <div class=\"dFlex\">\r\n                  <p>Image Preview</p>\r\n                  <ion-button shape=\"round\" size=\"small\" color=\"danger\" (click)=\"deleteWidgetBgImage()\">\r\n                    <i class=\"flaticon-null-21\"></i>&nbsp;\r\n                    Delete image\r\n                  </ion-button>\r\n                </div>\r\n                <br>\r\n                <img id='widgetImage' class=\"widgetImage\" [src]='subheading.img'>\r\n              </div>\r\n  \r\n  \r\n  \r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>\r\n\r\n<ion-footer no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"saveSettings()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save Settings\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/admin/product-settings/product-settings.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/admin/product-settings/product-settings.module.ts ***!
  \*******************************************************************/
/*! exports provided: ProductSettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductSettingsPageModule", function() { return ProductSettingsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _product_settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product-settings.page */ "./src/app/admin/product-settings/product-settings.page.ts");







const routes = [
    {
        path: '',
        component: _product_settings_page__WEBPACK_IMPORTED_MODULE_6__["ProductSettingsPage"]
    }
];
let ProductSettingsPageModule = class ProductSettingsPageModule {
};
ProductSettingsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_product_settings_page__WEBPACK_IMPORTED_MODULE_6__["ProductSettingsPage"]]
    })
], ProductSettingsPageModule);



/***/ }),

/***/ "./src/app/admin/product-settings/product-settings.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/admin/product-settings/product-settings.page.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dFlex {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  gap: 1rem;\n  margin-top: 15px;\n}\n.dFlex ion-input {\n  margin-top: 0px;\n}\n.widgetImage {\n  width: 100px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vcHJvZHVjdC1zZXR0aW5ncy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXHByb2R1Y3Qtc2V0dGluZ3NcXHByb2R1Y3Qtc2V0dGluZ3MucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9wcm9kdWN0LXNldHRpbmdzL3Byb2R1Y3Qtc2V0dGluZ3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHVCQUFBO1VBQUEsMkJBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7QUNDRjtBREFFO0VBQ0UsZUFBQTtBQ0VKO0FERUE7RUFDRSxZQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9wcm9kdWN0LXNldHRpbmdzL3Byb2R1Y3Qtc2V0dGluZ3MucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmRGbGV4IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gIGdhcDogMXJlbTtcclxuICBtYXJnaW4tdG9wOiAxNXB4O1xyXG4gIGlvbi1pbnB1dHtcclxuICAgIG1hcmdpbi10b3A6IDBweDtcclxuICB9XHJcbn1cclxuXHJcbi53aWRnZXRJbWFnZXtcclxuICB3aWR0aDogMTAwcHg7XHJcbn1cclxuIiwiLmRGbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBnYXA6IDFyZW07XG4gIG1hcmdpbi10b3A6IDE1cHg7XG59XG4uZEZsZXggaW9uLWlucHV0IHtcbiAgbWFyZ2luLXRvcDogMHB4O1xufVxuXG4ud2lkZ2V0SW1hZ2Uge1xuICB3aWR0aDogMTAwcHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/product-settings/product-settings.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/admin/product-settings/product-settings.page.ts ***!
  \*****************************************************************/
/*! exports provided: ProductSettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductSettingsPage", function() { return ProductSettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_product_setting_product_setting_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/product-setting/product-setting.service */ "./src/app/services/product-setting/product-setting.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _angular_fire_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/storage */ "./node_modules/@angular/fire/storage/es2015/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");







let ProductSettingsPage = class ProductSettingsPage {
    constructor(sharedService, loadingController, angularFireStorage, productSettingsService) {
        this.sharedService = sharedService;
        this.loadingController = loadingController;
        this.angularFireStorage = angularFireStorage;
        this.productSettingsService = productSettingsService;
        this.showPriceSlab = false;
        this.subheading = { text: '', img: '' };
    }
    ngOnInit() {
    }
    uploadImg(logoImg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let imgType = this.sharedService.getImageType(logoImg);
            const imgRef = this.angularFireStorage.ref('settings/product/subheadingImg' + imgType);
            yield imgRef.putString(logoImg, 'data_url');
            let downloadURL = yield imgRef.getDownloadURL().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise();
            return downloadURL;
        });
    }
    uploadLogo(files) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.presentLoading();
            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader();
                reader.readAsDataURL(files.item(i));
                reader.onload = (event) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                    let base64Image = event.target.result;
                    this.subheading.img = yield this.uploadImg(base64Image);
                    if (this.loading) {
                        this.loading.dismiss();
                    }
                });
            }
        });
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Please wait ...'
            });
            yield this.loading.present();
        });
    }
    deleteWidgetBgImage() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.subheading.img = "";
        });
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            let response = yield this.productSettingsService.getProductSettings();
            console.log("response", response);
            if (response) {
                this.showPriceSlab = response.showPriceSlabBtn || false;
                this.subheading = response.subheading ? response.subheading : this.subheading;
            }
            yield this.sharedService.loading.dismiss();
        });
    }
    toggleCheckbox() {
        this.showPriceSlab = !this.showPriceSlab;
    }
    saveSettings() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            let dataObj = {
                showPriceSlabBtn: this.showPriceSlab,
                subheading: this.subheading
            };
            let response = yield this.productSettingsService.saveProductSettings(dataObj);
            yield this.sharedService.loading.dismiss();
            if (response) {
                yield this.sharedService.presentAlert("Settings saved successfully");
            }
            else {
                yield this.sharedService.presentAlert("Something went wrong");
            }
        });
    }
};
ProductSettingsPage.ctorParameters = () => [
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["LoadingController"] },
    { type: _angular_fire_storage__WEBPACK_IMPORTED_MODULE_5__["AngularFireStorage"] },
    { type: src_app_services_product_setting_product_setting_service__WEBPACK_IMPORTED_MODULE_2__["ProductSettingService"] }
];
ProductSettingsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-product-settings',
        template: __webpack_require__(/*! raw-loader!./product-settings.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/product-settings/product-settings.page.html"),
        styles: [__webpack_require__(/*! ./product-settings.page.scss */ "./src/app/admin/product-settings/product-settings.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["LoadingController"],
        _angular_fire_storage__WEBPACK_IMPORTED_MODULE_5__["AngularFireStorage"],
        src_app_services_product_setting_product_setting_service__WEBPACK_IMPORTED_MODULE_2__["ProductSettingService"]])
], ProductSettingsPage);



/***/ }),

/***/ "./src/app/services/product-setting/product-setting.service.ts":
/*!*********************************************************************!*\
  !*** ./src/app/services/product-setting/product-setting.service.ts ***!
  \*********************************************************************/
/*! exports provided: ProductSettingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductSettingService", function() { return ProductSettingService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");




let ProductSettingService = class ProductSettingService {
    constructor(afs) {
        this.afs = afs;
    }
    getProductSettings() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                let data = [];
                let docRef = this.afs.collection("settings").doc("product");
                data = yield docRef.valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise();
                return data;
            }
            catch (err) {
                console.log("Error getting product settings: " + err);
                return false;
            }
        });
    }
    saveProductSettings(data) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                let docRef = this.afs.collection("settings").doc("product");
                docRef.get().toPromise().then((doc) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                    if (doc.exists) {
                        yield docRef.update(data);
                    }
                    else {
                        yield docRef.set(data);
                    }
                }));
                return true;
            }
            catch (err) {
                console.log("Error saving product settings: " + err);
                return false;
            }
        });
    }
};
ProductSettingService.ctorParameters = () => [
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] }
];
ProductSettingService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"]])
], ProductSettingService);



/***/ })

}]);
//# sourceMappingURL=admin-product-settings-product-settings-module-es2015.js.map