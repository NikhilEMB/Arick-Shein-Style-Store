(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-custom-code-custom-code-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/custom-code/custom-code.page.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/custom-code/custom-code.page.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Custom Code</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n\r\n    <ion-text color=\"danger\">\r\n      <p>Please contact support team after updating this, it will not work in real time</p>\r\n    </ion-text>\r\n    <br />\r\n\r\n    <div style=\"display: flex;\">\r\n      <p>Custom Meta Tags</p>&nbsp;&nbsp;\r\n      <ion-text color=\"danger\">\r\n        <p>( add any custom meta tags for your website )</p>\r\n      </ion-text>\r\n    </div>\r\n    <textarea type=\"text\" [(ngModel)]='settings.meta'></textarea>\r\n    <br><br>\r\n\r\n    <div style=\"display: flex;\">\r\n      <p>Custom Scripts</p>&nbsp;&nbsp;\r\n      <ion-text color=\"danger\">\r\n        <p>( add any custom scripts like google analytics, google tag manager, facebook pixel etc )</p>\r\n      </ion-text>\r\n    </div>\r\n    <textarea type=\"text\" [(ngModel)]='settings.scripts'></textarea>\r\n    <br><br>\r\n\r\n    <div style=\"display: flex;\">\r\n      <p>Custom Css</p>&nbsp;&nbsp;\r\n      <ion-text color=\"danger\">\r\n        <p>( use it for minor designing changes )</p>\r\n      </ion-text>\r\n    </div>\r\n    <textarea type=\"text\" [(ngModel)]='settings.css'></textarea>\r\n    <br><br>\r\n\r\n    <div style=\"display: flex;\">\r\n      <p>Custom Head Tags</p>&nbsp;&nbsp;\r\n    </div>\r\n    <textarea type=\"text\" [(ngModel)]='settings.head'></textarea>\r\n    <br><br>\r\n\r\n    <div style=\"display: flex;\">\r\n      <p>Custom Body Tags</p>&nbsp;&nbsp;\r\n      <!-- <ion-text color=\"danger\">\r\n        <p>( use it for minor designing changes )</p>\r\n      </ion-text> -->\r\n    </div>\r\n    <textarea type=\"text\" [(ngModel)]='settings.body'></textarea>\r\n    <br><br>\r\n\r\n    <ion-button size=\"large\" (click)='saveSettings()'><i class=\"flaticon-null-20\"></i>&nbsp;Save</ion-button>\r\n\r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/custom-code/custom-code.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/admin/custom-code/custom-code.module.ts ***!
  \*********************************************************/
/*! exports provided: CustomCodePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomCodePageModule", function() { return CustomCodePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _custom_code_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./custom-code.page */ "./src/app/admin/custom-code/custom-code.page.ts");







const routes = [
    {
        path: '',
        component: _custom_code_page__WEBPACK_IMPORTED_MODULE_6__["CustomCodePage"]
    }
];
let CustomCodePageModule = class CustomCodePageModule {
};
CustomCodePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_custom_code_page__WEBPACK_IMPORTED_MODULE_6__["CustomCodePage"]]
    })
], CustomCodePageModule);



/***/ }),

/***/ "./src/app/admin/custom-code/custom-code.page.scss":
/*!*********************************************************!*\
  !*** ./src/app/admin/custom-code/custom-code.page.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "textarea {\n  width: 60%;\n  height: 20vh;\n  padding: 8px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vY3VzdG9tLWNvZGUvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxjdXN0b20tY29kZVxcY3VzdG9tLWNvZGUucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9jdXN0b20tY29kZS9jdXN0b20tY29kZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxVQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2N1c3RvbS1jb2RlL2N1c3RvbS1jb2RlLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInRleHRhcmVhIHtcclxuICAgIHdpZHRoOiA2MCU7XHJcbiAgICBoZWlnaHQ6IDIwdmg7XHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbn0iLCJ0ZXh0YXJlYSB7XG4gIHdpZHRoOiA2MCU7XG4gIGhlaWdodDogMjB2aDtcbiAgcGFkZGluZzogOHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/custom-code/custom-code.page.ts":
/*!*******************************************************!*\
  !*** ./src/app/admin/custom-code/custom-code.page.ts ***!
  \*******************************************************/
/*! exports provided: CustomCodePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomCodePage", function() { return CustomCodePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_customCode_custom_code_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/customCode/custom-code.service */ "./src/app/services/customCode/custom-code.service.ts");




let CustomCodePage = class CustomCodePage {
    constructor(customCodeService, loadingController, alertController) {
        this.customCodeService = customCodeService;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.settings = {
            meta: null,
            scripts: null,
            css: null,
            head: null,
            body: null,
        };
    }
    ngOnInit() {
    }
    ionViewDidEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let data = yield this.customCodeService.getCustomCode();
            if (data) {
                this.settings = data;
            }
        });
    }
    saveSettings() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let saveResult = yield this.customCodeService.setCustomCode(this.settings);
            if (saveResult) {
                this.presentAlert('Custom Code Saved Successfully!');
            }
        });
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: "Please Wait...",
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
};
CustomCodePage.ctorParameters = () => [
    { type: src_app_services_customCode_custom_code_service__WEBPACK_IMPORTED_MODULE_3__["CustomCodeService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] }
];
CustomCodePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-custom-code',
        template: __webpack_require__(/*! raw-loader!./custom-code.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/custom-code/custom-code.page.html"),
        styles: [__webpack_require__(/*! ./custom-code.page.scss */ "./src/app/admin/custom-code/custom-code.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_customCode_custom_code_service__WEBPACK_IMPORTED_MODULE_3__["CustomCodeService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]])
], CustomCodePage);



/***/ }),

/***/ "./src/app/services/customCode/custom-code.service.ts":
/*!************************************************************!*\
  !*** ./src/app/services/customCode/custom-code.service.ts ***!
  \************************************************************/
/*! exports provided: CustomCodeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomCodeService", function() { return CustomCodeService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");




let CustomCodeService = class CustomCodeService {
    constructor(afs) {
        this.afs = afs;
    }
    setCustomCode(settings) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    yield this.afs.collection('settings').doc('customCode').set(settings);
                    resolve(true);
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    getCustomCode() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                try {
                    resolve(yield this.afs.collection('settings').doc('customCode').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise());
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
};
CustomCodeService.ctorParameters = () => [
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] }
];
CustomCodeService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"]])
], CustomCodeService);



/***/ })

}]);
//# sourceMappingURL=admin-custom-code-custom-code-module-es2015.js.map