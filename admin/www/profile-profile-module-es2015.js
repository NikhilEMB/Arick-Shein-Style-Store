(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["profile-profile-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/profile/profile.page.html":
/*!*********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/profile/profile.page.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Profile</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\" *ngIf=\"userData\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Name</ion-label>\r\n            <ion-input class=\"form-input\" [(ngModel)]=\"userData.name\" placeholder=\"Enter your name\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Display Name of Vendor</ion-label>\r\n            <ion-input class=\"form-input\" [(ngModel)]=\"userData.displayName\" placeholder=\"Enter your display name\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Phone Number</ion-label>\r\n            <ion-input class=\"form-input\" [(ngModel)]=\"userData.phoneNo\" disabled></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Description</ion-label>\r\n            <ion-input class=\"form-input\" [(ngModel)]=\"userData.description\" ></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"4\">\r\n          <div class=\"flex-space-between\" style=\"justify-content: space-evenly\">\r\n            <div>\r\n              <ion-label>Display Profile</ion-label>\r\n            </div>\r\n            <div class=\"upload-btn-wrapper\">\r\n              <button [disabled]=\"userData.image?.url\"\r\n                class=\"upload-btn btn-1 i-start\"\r\n                (click)=\"uploadImage($event.target.files)\"> <i\r\n                  class=\"flaticon-null-16\"></i>Upload Image</button>\r\n                  <input [disabled]=\"userData.image?.url\" type=\"file\" accept=\"image/*\" name=\"myfile\"\r\n                    (change)=\"uploadImage($event.target.files)\" />\r\n            </div>\r\n          </div>\r\n          <br>\r\n          <div class=\"img-container\">\r\n            <!-- <div class=\"no-img\"\r\n              *ngIf=\"!userData.image.url\">\r\n              <p>No attached image</p>\r\n            </div> -->\r\n            <div *ngIf=\"userData && userData.image?.url\">\r\n              <div class=\"img-wrap\">\r\n                <img class=\"category-img\"\r\n                  [src]=\"userData.image.url\" />\r\n                <div class=\"overlay\">\r\n                  <ion-button class=\"btn-2 remove\"\r\n                    shape=\"round\"\r\n                    fill=\"clear\"\r\n                    color=\"danger\"\r\n                    (click)=\"removeImage()\">\r\n                    <ion-icon name=\"trash\"\r\n                      slot=\"icon-only\"></ion-icon>\r\n                  </ion-button>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n\r\n    <!-- <div class=\"\">\r\n      <h5>Manage Profile Sections</h5>\r\n      <ion-button (click)=\"pageVendor(uid,userData.name)\">\r\n        edit Profile Sections\r\n      </ion-button>\r\n    </div> -->\r\n\r\n  </div>\r\n\r\n</ion-content>\r\n\r\n\r\n<ion-footer no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"update()\" [disabled]=\"userData?.name === ''\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Update\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/profile/profile.module.ts":
/*!*******************************************!*\
  !*** ./src/app/profile/profile.module.ts ***!
  \*******************************************/
/*! exports provided: ProfilePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile.page */ "./src/app/profile/profile.page.ts");







const routes = [
    {
        path: '',
        component: _profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"]
    }
];
let ProfilePageModule = class ProfilePageModule {
};
ProfilePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"]]
    })
], ProfilePageModule);



/***/ }),

/***/ "./src/app/profile/profile.page.scss":
/*!*******************************************!*\
  !*** ./src/app/profile/profile.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Byb2ZpbGUvcHJvZmlsZS5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/profile/profile.page.ts":
/*!*****************************************!*\
  !*** ./src/app/profile/profile.page.ts ***!
  \*****************************************/
/*! exports provided: ProfilePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePage", function() { return ProfilePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var _components_vendor_page_vendor_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/vendor-page/vendor-page.component */ "./src/app/components/vendor-page/vendor-page.component.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/user/user.service */ "./src/app/services/user/user.service.ts");







let ProfilePage = class ProfilePage {
    constructor(storage, userService, sharedService, modalController) {
        this.storage = storage;
        this.userService = userService;
        this.sharedService = sharedService;
        this.modalController = modalController;
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.role = yield this.storage.get('userRole');
            const userData = yield this.userService.getUserInfo('service', this.role);
            this.uid = yield this.storage.get('uid');
            // console.log('uid',this.uid);
            console.log('userData:', userData);
            if (userData) {
                this.userData = userData;
                if (userData.name === 'user') {
                    this.userData.name = '';
                }
            }
        });
    }
    ngOnInit() { }
    update() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.sharedService.presentLoading();
            const success = yield this.userService.updateUserDetails(this.userData, this.role);
            if (this.sharedService.loading) {
                this.sharedService.loading.dismiss();
            }
            if (success) {
                this.sharedService.presentAlert('Profile details updated successfully');
            }
            else {
                this.sharedService.presentAlert('Something went wrong. Please try again later.');
            }
        });
    }
    removeImage() {
        this.userData.image.url = '';
        this.userData.image.mob = '';
        this.userData.image.thumb = '';
    }
    uploadImage(files) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader();
                reader.readAsDataURL(files.item(i));
                reader.onload = (event) => {
                    let base64Image = event.target.result;
                    this.userData.image.url = base64Image;
                };
            }
        });
    }
    pageVendor(id, name) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log(id,name);
            const modal = yield this.modalController.create({
                component: _components_vendor_page_vendor_page_component__WEBPACK_IMPORTED_MODULE_3__["VendorPageComponent"],
                cssClass: 'custom-modal big-modal',
                componentProps: { vendorId: id, vendorName: name }
            });
            modal.onDidDismiss().then(() => {
            });
            yield modal.present();
        });
    }
};
ProfilePage.ctorParameters = () => [
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"] },
    { type: _services_user_user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"] },
    { type: _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] }
];
ProfilePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-profile',
        template: __webpack_require__(/*! raw-loader!./profile.page.html */ "./node_modules/raw-loader/index.js!./src/app/profile/profile.page.html"),
        styles: [__webpack_require__(/*! ./profile.page.scss */ "./src/app/profile/profile.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"],
        _services_user_user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"],
        _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"]])
], ProfilePage);



/***/ })

}]);
//# sourceMappingURL=profile-profile-module-es2015.js.map