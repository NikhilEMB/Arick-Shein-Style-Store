(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-custom-language-custom-language-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/custom-language/custom-language.page.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/custom-language/custom-language.page.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\">\r\n      <img src=\"../../../assets/img/shop-logo.png\" />\r\n    </div>\r\n    <ion-title>Custom Language</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs no-shadow no-border>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Add new message</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Saved messages</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n\r\n  <super-tabs-container>\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <div class=\"parentFlex\">\r\n            <div class=\"Fields\">\r\n              <h2>Add New Message</h2>\r\n\r\n              <form [formGroup]=\"languageForm\" (ngSubmit)=\"onSubmit()\">\r\n                <div class=\"dFlex\">\r\n                  <div class=\"inputField\">\r\n                    <label for=\"platform\">Choose a Platform:</label>\r\n                    <select formControlName=\"platform\" id=\"platform\">\r\n                      <option value=\"\" disabled selected hidden>Please choose</option>\r\n                      <option value=\"webLang\">Website</option>\r\n                      <option value=\"appLang\">App</option>\r\n                    </select>\r\n                  </div>\r\n                  <div class=\"inputField\">\r\n                    <label for=\"langCode\">Language Code</label>\r\n                    <select formControlName=\"languageCode\" id=\"langCode\">\r\n                      <option value=\"\" disabled selected hidden>Please choose</option>\r\n                      <option value=\"{{languageCode}}\" *ngFor=\"let languageCode of languageCodeData\">\r\n                        {{languageCode}}\r\n                      </option>\r\n                    </select>\r\n                  </div>\r\n                </div>\r\n                <div class=\"dFlex\">\r\n                  <div class=\"inputField\">\r\n                    <label for=\"parentName\">Parent Key Name</label>\r\n                    <input formControlName=\"parentKeyName\" id=\"parentName\" placeholder=\"Enter parent key here\"\r\n                      type=\"text\" />\r\n                  </div>\r\n                  <div class=\"inputField\">\r\n                    <label for=\"childName\">Child Key Name</label>\r\n                    <input formControlName=\"childKeyName\" id=\"childName\" placeholder=\"Enter Child key here\"\r\n                      type=\"text\" />\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"inputField\">\r\n                  <label for=\"message\">Message</label>\r\n                  <textarea formControlName=\"message\" id=\"message\" placeholder=\"Enter message here\" type=\"text\"\r\n                    cols=\"30\" rows=\"5\"></textarea>\r\n                </div>\r\n\r\n                <ion-button expand=\"block\" type=\"submit\" [disabled]=\"!languageForm.valid\">Save</ion-button>\r\n                <p class=\"impText\">\r\n                  Please contact support team after updating this, it will not work in real time !\r\n                </p>\r\n              </form>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <div class=\"parentFlex\">\r\n            <div class=\"fetchArea\">\r\n              <h2>Select Location</h2>\r\n              <form [formGroup]=\"getLanguageData\" (ngSubmit)=\"onGet()\">\r\n                <div class=\"dFlex\">\r\n                  <div class=\"inputField\">\r\n                    <label for=\"platform\">Choose a Platform:</label>\r\n                    <select formControlName=\"getPlatform\" id=\"platform\">\r\n                      <option value=\"\" disabled selected hidden>Please choose</option>\r\n                      <option value=\"webLang\">Website</option>\r\n                      <option value=\"appLang\">App</option>\r\n                    </select>\r\n                  </div>\r\n                  <div class=\"inputField\">\r\n                    <label for=\"langCode\">Language Code</label>\r\n                    <select formControlName=\"getLanguageCode\" id=\"langCode\">\r\n                      <option value=\"\" disabled selected hidden>Please choose</option>\r\n                      <option value=\"{{languageCode}}\" *ngFor=\"let languageCode of languageCodeData\">\r\n                        {{languageCode}}\r\n                      </option>\r\n                    </select>\r\n                  </div>\r\n                  <div class=\"inputField\">\r\n                    <label for=\"parentName\">Parent Key Name</label>\r\n                    <input formControlName=\"getParentKeyName\" id=\"parentName\" placeholder=\"Enter parent key here\"\r\n                      type=\"text\" />\r\n                  </div>\r\n                </div>\r\n                <ion-button expand=\"block\" type=\"submit\" [disabled]=\"!getLanguageData.valid\">Get Results</ion-button>\r\n              </form>\r\n\r\n\r\n              <div *ngIf=\"checkObjLength()\">\r\n                <h4>Your custom messages</h4>\r\n                <!-- <div class=\"dFlex\">\r\n                  <h4>Your custom messages</h4> <ion-button (click)=\"updateResults()\">Save Changes</ion-button>\r\n                </div> -->\r\n                <div class=\"resultArea\">\r\n                  <table>\r\n                    <thead>\r\n                      <th>#</th>\r\n                      <th>Message Key</th>\r\n                      <th>Message</th>\r\n                      <th>Remove</th>\r\n                    </thead>\r\n                    <tbody>\r\n                      <tr *ngFor=\"let item of languageResult | keyvalue , index as i\">\r\n                        <td>{{i+1}}</td>\r\n                        <td>{{item.key}}</td>\r\n                        <td>{{item.value}}</td>\r\n                        <td>\r\n                          <ion-button (click)=\"deleteField(item.key)\">\r\n                            <i class=\"flaticon-null-21\"></i>\r\n                          </ion-button>\r\n                        </td>\r\n                      </tr>\r\n                    </tbody>\r\n                  </table>\r\n                </div>\r\n              </div>\r\n\r\n              <div *ngIf=\"!checkObjLength()\">\r\n                <p class=\"impText\">Please select location to show results</p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n  </super-tabs-container>\r\n</super-tabs>"

/***/ }),

/***/ "./src/app/admin/custom-language/custom-language.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/admin/custom-language/custom-language.module.ts ***!
  \*****************************************************************/
/*! exports provided: CustomLanguagePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomLanguagePageModule", function() { return CustomLanguagePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _custom_language_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./custom-language.page */ "./src/app/admin/custom-language/custom-language.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");








var routes = [
    {
        path: '',
        component: _custom_language_page__WEBPACK_IMPORTED_MODULE_6__["CustomLanguagePage"]
    }
];
var CustomLanguagePageModule = /** @class */ (function () {
    function CustomLanguagePageModule() {
    }
    CustomLanguagePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_custom_language_page__WEBPACK_IMPORTED_MODULE_6__["CustomLanguagePage"]]
        })
    ], CustomLanguagePageModule);
    return CustomLanguagePageModule;
}());



/***/ }),

/***/ "./src/app/admin/custom-language/custom-language.page.scss":
/*!*****************************************************************!*\
  !*** ./src/app/admin/custom-language/custom-language.page.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h2 {\n  text-align: center;\n}\n\nlabel {\n  text-transform: capitalize;\n}\n\ninput,\nselect,\ntextarea {\n  height: 38px;\n  width: 100%;\n  padding: 8px;\n  border-radius: 6px;\n  border: 1px solid #ccc;\n}\n\ntextarea {\n  height: initial;\n}\n\ntable {\n  border-collapse: collapse;\n  width: 100%;\n}\n\ntd,\nth {\n  text-align: left;\n  padding: 8px;\n}\n\ntr:hover {\n  background-color: #efefef;\n}\n\n.parentFlex {\n  width: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  padding: 4px;\n}\n\n.parentFlex .Fields,\n.parentFlex .fetchArea {\n  width: 80%;\n  padding: 8px;\n}\n\n.inputField {\n  margin-bottom: 0.5rem;\n  width: 100%;\n}\n\n.dFlex {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  gap: 1rem;\n}\n\n.impText {\n  color: #cc0e0e;\n  margin-top: 0.5rem;\n}\n\n.resultArea {\n  margin-top: 1rem;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  padding: 0.5rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vY3VzdG9tLWxhbmd1YWdlL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcY3VzdG9tLWxhbmd1YWdlXFxjdXN0b20tbGFuZ3VhZ2UucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9jdXN0b20tbGFuZ3VhZ2UvY3VzdG9tLWxhbmd1YWdlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0FDQ0Y7O0FEQ0E7RUFDRSwwQkFBQTtBQ0VGOztBREFBOzs7RUFHRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0FDR0Y7O0FEREE7RUFDRSxlQUFBO0FDSUY7O0FEREE7RUFDRSx5QkFBQTtFQUNBLFdBQUE7QUNJRjs7QURGQTs7RUFFRSxnQkFBQTtFQUNBLFlBQUE7QUNLRjs7QURIQTtFQUNFLHlCQUFBO0FDTUY7O0FESEE7RUFDRSxXQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxZQUFBO0FDTUY7O0FESkU7O0VBRUUsVUFBQTtFQUNBLFlBQUE7QUNNSjs7QURIQTtFQUNFLHFCQUFBO0VBQ0EsV0FBQTtBQ01GOztBREpBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxTQUFBO0FDT0Y7O0FETEE7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7QUNRRjs7QUROQTtFQUNFLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUNTRiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2N1c3RvbS1sYW5ndWFnZS9jdXN0b20tbGFuZ3VhZ2UucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaDIge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5sYWJlbCB7XHJcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcbn1cclxuaW5wdXQsXHJcbnNlbGVjdCxcclxudGV4dGFyZWEge1xyXG4gIGhlaWdodDogMzhweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiA4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbn1cclxudGV4dGFyZWEge1xyXG4gIGhlaWdodDogaW5pdGlhbDtcclxufVxyXG5cclxudGFibGUge1xyXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxudGQsXHJcbnRoIHtcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gIHBhZGRpbmc6IDhweDtcclxufVxyXG50cjpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjtcclxufVxyXG5cclxuLnBhcmVudEZsZXgge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwYWRkaW5nOiA0cHg7XHJcblxyXG4gIC5GaWVsZHMsXHJcbiAgLmZldGNoQXJlYSB7XHJcbiAgICB3aWR0aDogODAlO1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG4gIH1cclxufVxyXG4uaW5wdXRGaWVsZCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbi5kRmxleCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDFyZW07XHJcbn1cclxuLmltcFRleHQge1xyXG4gIGNvbG9yOiByZ2IoMjA0LCAxNCwgMTQpO1xyXG4gIG1hcmdpbi10b3A6IDAuNXJlbTtcclxufVxyXG4ucmVzdWx0QXJlYSB7XHJcbiAgbWFyZ2luLXRvcDogMXJlbTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBwYWRkaW5nOiAwLjVyZW07XHJcbn1cclxuIiwiaDIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmxhYmVsIHtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG5cbmlucHV0LFxuc2VsZWN0LFxudGV4dGFyZWEge1xuICBoZWlnaHQ6IDM4cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbn1cblxudGV4dGFyZWEge1xuICBoZWlnaHQ6IGluaXRpYWw7XG59XG5cbnRhYmxlIHtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbnRkLFxudGgge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBwYWRkaW5nOiA4cHg7XG59XG5cbnRyOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjtcbn1cblxuLnBhcmVudEZsZXgge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDRweDtcbn1cbi5wYXJlbnRGbGV4IC5GaWVsZHMsXG4ucGFyZW50RmxleCAuZmV0Y2hBcmVhIHtcbiAgd2lkdGg6IDgwJTtcbiAgcGFkZGluZzogOHB4O1xufVxuXG4uaW5wdXRGaWVsZCB7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5kRmxleCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxcmVtO1xufVxuXG4uaW1wVGV4dCB7XG4gIGNvbG9yOiAjY2MwZTBlO1xuICBtYXJnaW4tdG9wOiAwLjVyZW07XG59XG5cbi5yZXN1bHRBcmVhIHtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBwYWRkaW5nOiAwLjVyZW07XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/custom-language/custom-language.page.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/custom-language/custom-language.page.ts ***!
  \***************************************************************/
/*! exports provided: CustomLanguagePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomLanguagePage", function() { return CustomLanguagePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_custom_language_custom_language_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/custom-language/custom-language.service */ "./src/app/services/custom-language/custom-language.service.ts");





var CustomLanguagePage = /** @class */ (function () {
    function CustomLanguagePage(fb, customLanguageService, alertController, loadingController) {
        this.fb = fb;
        this.customLanguageService = customLanguageService;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.languageCodeData = ['ar', 'bn', 'de', 'en', 'es', 'fa', 'fr', 'gu', 'hi', 'it', 'ja', 'kn', 'ko', 'ml', 'mr', 'ne', 'nl', 'or', 'pa', 'pt', 'ru', 'sd', 'so', 'ta', 'te', 'th', 'ur', 'zh'];
        this.languageResult = {};
        this.languageForm = this.fb.group({
            platform: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            languageCode: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            parentKeyName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            childKeyName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            message: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
        });
        this.getLanguageData = this.fb.group({
            getPlatform: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            getLanguageCode: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            getParentKeyName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
        });
    }
    CustomLanguagePage.prototype.ngOnInit = function () { };
    CustomLanguagePage.prototype.onSubmit = function () {
        var setData = this.customLanguageService.setCustomLanguage(this.languageForm.value);
        if (setData) {
            this.presentAlert('Message saved successfully');
        }
        this.getLanguageData.reset();
        this.languageResult = {};
    };
    CustomLanguagePage.prototype.onGet = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.customLanguageService.getCustomLanguage(this.getLanguageData.value)];
                    case 2:
                        _a.languageResult = _b.sent();
                        if (!this.loading) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!this.languageResult) {
                            this.presentAlert('Please choose right location');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomLanguagePage.prototype.checkObjLength = function () {
        if (this.languageResult == null) {
            return this.languageResult == '0';
        }
        else {
            return Object.keys(this.languageResult).length;
        }
    };
    CustomLanguagePage.prototype.deleteField = function (key) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var updateData;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        delete this.languageResult[key];
                        if (!this.loading) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        updateData = this.customLanguageService.updateCustomLanguage(this.getLanguageData.value, this.languageResult);
                        if (updateData) {
                            this.presentAlert('Message deleted successfully');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // updateResults() {
    //   let updateData = this.customLanguageService.updateCustomLanguage(this.getLanguageData.value, this.languageResult);
    //   if (updateData) {
    //     this.presentAlert('Messages updated successfully');
    //   }
    // }
    // ? Massage Modals 
    CustomLanguagePage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: ['ok']
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
    CustomLanguagePage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please wait ...'
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
    CustomLanguagePage.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: src_app_services_custom_language_custom_language_service__WEBPACK_IMPORTED_MODULE_4__["CustomLanguageService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] }
    ]; };
    CustomLanguagePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-custom-language",
            template: __webpack_require__(/*! raw-loader!./custom-language.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/custom-language/custom-language.page.html"),
            styles: [__webpack_require__(/*! ./custom-language.page.scss */ "./src/app/admin/custom-language/custom-language.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], src_app_services_custom_language_custom_language_service__WEBPACK_IMPORTED_MODULE_4__["CustomLanguageService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"]])
    ], CustomLanguagePage);
    return CustomLanguagePage;
}());



/***/ }),

/***/ "./src/app/services/custom-language/custom-language.service.ts":
/*!*********************************************************************!*\
  !*** ./src/app/services/custom-language/custom-language.service.ts ***!
  \*********************************************************************/
/*! exports provided: CustomLanguageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomLanguageService", function() { return CustomLanguageService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");




var CustomLanguageService = /** @class */ (function () {
    function CustomLanguageService(afs) {
        this.afs = afs;
    }
    CustomLanguageService.prototype.setCustomLanguage = function (formData) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var platform, languageCode, parentKeyName, childKeyName, message, msgObject;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                platform = formData.platform;
                languageCode = formData.languageCode;
                parentKeyName = formData.parentKeyName;
                childKeyName = formData.childKeyName;
                message = formData.message;
                msgObject = {};
                msgObject[childKeyName] = message;
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var docRef;
                        var _this = this;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.afs.collection('advanced').doc(platform).collection(languageCode).doc(parentKeyName)];
                                case 1:
                                    docRef = _a.sent();
                                    docRef.get().toPromise().then(function (doc) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                            if (doc.exists) {
                                                // console.warn('exist');
                                                docRef.update(msgObject);
                                            }
                                            else {
                                                // console.warn("not exist");
                                                docRef.set(msgObject);
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); }).catch(function (error) {
                                        console.error("Your Error Message", error);
                                    });
                                    resolve(true);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    CustomLanguageService.prototype.getCustomLanguage = function (data) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var getPlatform, getLanguageCode, getParentKey;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                getPlatform = data.getPlatform;
                getLanguageCode = data.getLanguageCode;
                getParentKey = data.getParentKeyName;
                // console.warn(data.value);
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var data, getDocRef;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    data = [];
                                    getDocRef = this.afs.collection('advanced').doc(getPlatform).collection(getLanguageCode).doc(getParentKey);
                                    return [4 /*yield*/, getDocRef.valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                                case 1:
                                    data = _a.sent();
                                    // if(data){
                                    //   console.log("no Data");
                                    // }
                                    resolve(data);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    CustomLanguageService.prototype.updateCustomLanguage = function (formData, result) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var getPlatform, getLanguageCode, getParentKey;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                getPlatform = formData.getPlatform;
                getLanguageCode = formData.getLanguageCode;
                getParentKey = formData.getParentKeyName;
                // console.warn(formData, result);
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var ref;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            ref = this.afs.collection('advanced').doc(getPlatform).collection(getLanguageCode).doc(getParentKey);
                            ref.set(result);
                            resolve(true);
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    CustomLanguageService.ctorParameters = function () { return [
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] }
    ]; };
    CustomLanguageService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"]])
    ], CustomLanguageService);
    return CustomLanguageService;
}());



/***/ })

}]);
//# sourceMappingURL=admin-custom-language-custom-language-module-es5.js.map