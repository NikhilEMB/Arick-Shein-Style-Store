(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["terms-conditions-terms-conditions-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/terms-conditions/terms-conditions.page.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/terms-conditions/terms-conditions.page.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>terms & conditions</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content>\r\n  <div class=\"content-card\">\r\n    <p>By signing up for App or by using any Services (as defined below), you are agreeing to be bound by the following terms and conditions (the \"Terms of Service\").  You must read, agree with and accept all of the terms and conditions contained or expressly referenced in these Terms of Service</p>\r\n    <h2>1. Account Terms</h2>\r\n      <p>To access and use the Services, you must register with us with your phone no and business details. We may reject your application for an Account, or cancel an existing Account, for any reason, in our sole discretion. You are responsible for all activity and content such as photos, images, written content, audio files, or data uploaded, collected, generated, stored, displayed, distributed, transmitted or exhibited on or in connection with your App Account. A breach or violation of any term in the Terms of Service, as determined may result in an immediate termination of your Services.</p>\r\n    <h2>2. Account</h2>\r\n    <p>The person signing up for the Service by opening an Account for app for the purposes of our Terms of Service and will be the person who is authorized to use any corresponding Account we may provide to the Store Owner in connection with the Service.</p>\r\n    <h2>3. Conditions</h2>\r\n    <p>You may not use the our Services for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). You will comply with all applicable laws, rules and regulations in your use of the Service and your performance of obligations under the Terms of Service. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Services, or access to the Services without the express written permission by you.</p>\r\n    <h2>4. Rights</h2>\r\n    <p>We reserve the right to modify or terminate the Services for any reason, without notice at any time. Not all Services and features are available in every jurisdiction and we are under no obligation to make any Services or features available in any jurisdiction.We reserve the right to refuse service to anyone for any reason at any time. e may, but have no obligation to, remove Materials and suspend or terminate Accounts if we determine in our sole discretion that the goods or services offered via a Store, or the Materials uploaded or posted to a Store, violate our Terms of Service.</p>\r\n    <h2>5. Liability</h2>\r\n    <p>You expressly understand and agree that, to the extent permitted by applicable laws, We shall not be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses resulting from the use of or inability to use the Service. To the extent permitted by applicable laws, in no event shall We or our suppliers be liable for lost profits or any special, incidental or consequential damages arising out of or in connection with our site, our Services or these Terms of Service. Your use of the Services is at your sole risk. The Services are provided on an \"as is\" and \"as available\" basis without any warranty or condition, express, implied or statutory. We does not warrant that the Services will be uninterrupted, timely, secure, or error-free. We does not warrant that the results that may be obtained from the use of the Services will be accurate or reliable.</p>\r\n    <h2>6. Privacy & Data Protection</h2>\r\n    <p> We are firmly committed to protecting the privacy of your personal information and the personal information of your customers.\r\n    </p>\r\n  </div>\r\n</ion-content>\r\n<ion-footer (click)=\"onClickAcceptConditions()\">\r\n  <ion-grid>\r\n    <ion-row class=\"ion-justify-content-center ion-align-items-center\">\r\n      <div class=\"app-footer-text\">\r\n        I Accept<span><i class=\"flaticon-null-20 app-footer-icon\"></i></span>\r\n    </div>\r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/terms-conditions/terms-conditions.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/terms-conditions/terms-conditions.module.ts ***!
  \*************************************************************/
/*! exports provided: TermsConditionsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermsConditionsPageModule", function() { return TermsConditionsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _terms_conditions_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./terms-conditions.page */ "./src/app/terms-conditions/terms-conditions.page.ts");







var routes = [
    {
        path: '',
        component: _terms_conditions_page__WEBPACK_IMPORTED_MODULE_6__["TermsConditionsPage"]
    }
];
var TermsConditionsPageModule = /** @class */ (function () {
    function TermsConditionsPageModule() {
    }
    TermsConditionsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_terms_conditions_page__WEBPACK_IMPORTED_MODULE_6__["TermsConditionsPage"]]
        })
    ], TermsConditionsPageModule);
    return TermsConditionsPageModule;
}());



/***/ }),

/***/ "./src/app/terms-conditions/terms-conditions.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/terms-conditions/terms-conditions.page.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-header ion-toolbar ion-title {\n  color: white;\n  text-align: center;\n  margin-left: 48px;\n}\n\nion-content {\n  --background: #f2f2f2;\n}\n\n.content-card {\n  background: white;\n  padding: 10px;\n  margin: 10px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVybXMtY29uZGl0aW9ucy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcdGVybXMtY29uZGl0aW9uc1xcdGVybXMtY29uZGl0aW9ucy5wYWdlLnNjc3MiLCJzcmMvYXBwL3Rlcm1zLWNvbmRpdGlvbnMvdGVybXMtY29uZGl0aW9ucy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQ0NKOztBRENBO0VBQ0kscUJBQUE7QUNFSjs7QURBQTtFQUNJLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FDR0oiLCJmaWxlIjoic3JjL2FwcC90ZXJtcy1jb25kaXRpb25zL3Rlcm1zLWNvbmRpdGlvbnMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWhlYWRlciBpb24tdG9vbGJhciBpb24tdGl0bGV7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tbGVmdDogNDhweDtcclxufVxyXG5pb24tY29udGVudHtcclxuICAgIC0tYmFja2dyb3VuZDogI2YyZjJmMjtcclxufVxyXG4uY29udGVudC1jYXJke1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG4iLCJpb24taGVhZGVyIGlvbi10b29sYmFyIGlvbi10aXRsZSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogNDhweDtcbn1cblxuaW9uLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6ICNmMmYyZjI7XG59XG5cbi5jb250ZW50LWNhcmQge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgcGFkZGluZzogMTBweDtcbiAgbWFyZ2luOiAxMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/terms-conditions/terms-conditions.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/terms-conditions/terms-conditions.page.ts ***!
  \***********************************************************/
/*! exports provided: TermsConditionsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermsConditionsPage", function() { return TermsConditionsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");





var TermsConditionsPage = /** @class */ (function () {
    function TermsConditionsPage(events, router, loadingCtrl, navCtrl, storage) {
        this.events = events;
        this.router = router;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.storage = storage;
    }
    TermsConditionsPage.prototype.ngOnInit = function () {
    };
    TermsConditionsPage.prototype.ionViewWillEnter = function () {
        this.initializeSubs();
    };
    TermsConditionsPage.prototype.ionViewWillLeave = function () {
        this.removeSubs();
    };
    TermsConditionsPage.prototype.initializeSubs = function () {
        var _this = this;
        this.events.subscribe('user:termsAndCondsAcceptedSuccess', function () {
            _this.loading.dismiss();
            _this.navCtrl.navigateRoot(['admin-home']);
        });
    };
    TermsConditionsPage.prototype.onClickAcceptConditions = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({
                                message: "Please Wait...",
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        this.loading.present();
                        this.storage.get('uid').then(function (val) {
                            _this.events.publish('user:acceptTermsAndConds', val);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TermsConditionsPage.prototype.removeSubs = function () {
        this.events.unsubscribe('user:termsAndCondsAcceptedSuccess');
    };
    TermsConditionsPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"] }
    ]; };
    TermsConditionsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-terms-conditions',
            template: __webpack_require__(/*! raw-loader!./terms-conditions.page.html */ "./node_modules/raw-loader/index.js!./src/app/terms-conditions/terms-conditions.page.html"),
            styles: [__webpack_require__(/*! ./terms-conditions.page.scss */ "./src/app/terms-conditions/terms-conditions.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"]])
    ], TermsConditionsPage);
    return TermsConditionsPage;
}());



/***/ })

}]);
//# sourceMappingURL=terms-conditions-terms-conditions-module-es5.js.map