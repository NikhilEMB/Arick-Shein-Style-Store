(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-multi-countries-multi-countries-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/multi-countries/multi-countries.page.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/multi-countries/multi-countries.page.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>multi Countries</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <div style=\"margin-bottom: 2rem;\">\r\n      <h2>Auto Convert</h2>\r\n\r\n      <div style=\"display: flex;\">\r\n        <div class=\"toggle-btn\">\r\n          <label class=\"switch\">\r\n            <input type=\"checkbox\" (click)=\"activeAutoExchange()\" [checked]=\"countryData.settings.autoExchange\">\r\n            <span class=\"slider round\"></span>\r\n          </label>\r\n        </div>&nbsp;&nbsp;\r\n        <div>Auto convert prices based on current exchange rates.</div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"flex-label\">\r\n      <span class=\"\">\r\n        <ion-select class=\"form-input\" [value]=\"countryData.settings.defaultCountry?.countryCode\"\r\n          placeholder=\"Select Default Country\" (ionChange)=\"onChangeDefaultCountry($event)\">\r\n          <ng-container *ngFor=\"let country of countryData.countries\">\r\n            <ion-select-option [value]=\"country.countryCode\" *ngIf=\"country.active\">\r\n              {{country.countryName}}\r\n            </ion-select-option>\r\n          </ng-container>\r\n        </ion-select>\r\n      </span>&nbsp;&nbsp;\r\n      <span class=\"heading\">Default Country</span>\r\n    </div>\r\n\r\n    <div class=\"\">\r\n      <h2>Select Countries</h2>\r\n      <!-- List of Countries -->\r\n      <ion-list>\r\n        <ion-item *ngFor=\"let item of countryData?.countries,index as i\">\r\n          <div class=\"toggle\">\r\n            <div class=\"toggle-btn\">\r\n              <label class=\"switch\">\r\n                <input type=\"checkbox\" (click)=\"activeCountry(i)\" [checked]=\"item.active\">\r\n                <span class=\"slider round\"></span>\r\n              </label>\r\n            </div>\r\n            <p>{{item.countryName | uppercase}}</p>\r\n          </div>\r\n        </ion-item>\r\n      </ion-list>\r\n    </div>\r\n  </div>\r\n</ion-content>\r\n\r\n<ion-footer>\r\n  <div style=\"text-align: center;\">\r\n    <ion-button (click)=\"saveMultiCountry()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/admin/multi-countries/multi-countries.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/admin/multi-countries/multi-countries.module.ts ***!
  \*****************************************************************/
/*! exports provided: MultiCountriesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiCountriesPageModule", function() { return MultiCountriesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _multi_countries_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./multi-countries.page */ "./src/app/admin/multi-countries/multi-countries.page.ts");







var routes = [
    {
        path: '',
        component: _multi_countries_page__WEBPACK_IMPORTED_MODULE_6__["MultiCountriesPage"]
    }
];
var MultiCountriesPageModule = /** @class */ (function () {
    function MultiCountriesPageModule() {
    }
    MultiCountriesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_multi_countries_page__WEBPACK_IMPORTED_MODULE_6__["MultiCountriesPage"]]
        })
    ], MultiCountriesPageModule);
    return MultiCountriesPageModule;
}());



/***/ }),

/***/ "./src/app/admin/multi-countries/multi-countries.page.scss":
/*!*****************************************************************!*\
  !*** ./src/app/admin/multi-countries/multi-countries.page.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-footer {\n  padding: 1rem;\n}\n\n.toggle {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n          align-items: center;\n  gap: 1rem;\n}\n\n.form-input {\n  margin-top: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vbXVsdGktY291bnRyaWVzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcbXVsdGktY291bnRyaWVzXFxtdWx0aS1jb3VudHJpZXMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9tdWx0aS1jb3VudHJpZXMvbXVsdGktY291bnRyaWVzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7QUNDRjs7QURTQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHVCQUFBO1VBQUEsMkJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsU0FBQTtBQ05GOztBRFFBO0VBQ0UsYUFBQTtBQ0xGIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vbXVsdGktY291bnRyaWVzL211bHRpLWNvdW50cmllcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tZm9vdGVyIHtcclxuICBwYWRkaW5nOiAxcmVtO1xyXG59XHJcbi8vIGlucHV0IFt0eXBlPVwiY2hlY2tib3hcIl1bZGlzYWJsZWRdIHtcclxuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjayAhaW1wb3J0YW50O1xyXG4vLyAgIGN1cnNvcjogbm90LWFsbG93ZWQgIWltcG9ydGFudDtcclxuLy8gfVxyXG4vLyAubXlEaXNhYmxlZCB7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYyAhaW1wb3J0YW50O1xyXG4vLyAgIGN1cnNvcjogbm90LWFsbG93ZWQgIWltcG9ydGFudDtcclxuLy8gfVxyXG4udG9nZ2xlIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMXJlbTtcclxufVxyXG4uZm9ybS1pbnB1dCB7XHJcbiAgbWFyZ2luLXRvcDogMDtcclxufVxyXG4iLCJpb24tZm9vdGVyIHtcbiAgcGFkZGluZzogMXJlbTtcbn1cblxuLnRvZ2dsZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxcmVtO1xufVxuXG4uZm9ybS1pbnB1dCB7XG4gIG1hcmdpbi10b3A6IDA7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/multi-countries/multi-countries.page.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/multi-countries/multi-countries.page.ts ***!
  \***************************************************************/
/*! exports provided: MultiCountriesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiCountriesPage", function() { return MultiCountriesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_multi_countries_multi_countries_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/multi-countries/multi-countries.service */ "./src/app/services/multi-countries/multi-countries.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");




var MultiCountriesPage = /** @class */ (function () {
    function MultiCountriesPage(multiCountriesService, sharedService) {
        this.multiCountriesService = multiCountriesService;
        this.sharedService = sharedService;
        this.countryData = {
            countries: [],
            settings: {
                autoExchange: false,
                defaultCountry: {}
            }
        };
    }
    MultiCountriesPage.prototype.ngOnInit = function () {
    };
    MultiCountriesPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var countryData;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.multiCountriesService.getMultiCountries()];
                    case 2:
                        countryData = _a.sent();
                        this.countryData = countryData || this.countryData;
                        this.sharedService.loading.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    MultiCountriesPage.prototype.activeAutoExchange = function () {
        this.countryData.settings.autoExchange = !this.countryData.settings.autoExchange;
    };
    MultiCountriesPage.prototype.activeCountry = function (i) {
        if (this.countryData.countries[i].countryCode == this.countryCode) {
            event.preventDefault();
            this.sharedService.presentAlert('Default Country cannot be toggled');
        }
        else {
            this.countryData.countries[i].active = !this.countryData.countries[i].active;
        }
    };
    MultiCountriesPage.prototype.saveMultiCountry = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var res;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.multiCountriesService.saveMultiCountries(this.countryData)];
                    case 2:
                        res = _a.sent();
                        this.sharedService.loading.dismiss();
                        if (res) {
                            this.sharedService.presentAlert('Settings saved successfully');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MultiCountriesPage.prototype.onChangeDefaultCountry = function (e) {
        var _this = this;
        this.countryCode = e.target.value;
        this.countryData.settings.defaultCountry = this.countryData.countries.find(function (country) { return country.countryCode === _this.countryCode; });
    };
    MultiCountriesPage.ctorParameters = function () { return [
        { type: src_app_services_multi_countries_multi_countries_service__WEBPACK_IMPORTED_MODULE_2__["MultiCountriesService"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"] }
    ]; };
    MultiCountriesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-multi-countries',
            template: __webpack_require__(/*! raw-loader!./multi-countries.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/multi-countries/multi-countries.page.html"),
            styles: [__webpack_require__(/*! ./multi-countries.page.scss */ "./src/app/admin/multi-countries/multi-countries.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_multi_countries_multi_countries_service__WEBPACK_IMPORTED_MODULE_2__["MultiCountriesService"], src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"]])
    ], MultiCountriesPage);
    return MultiCountriesPage;
}());



/***/ }),

/***/ "./src/app/services/multi-countries/multi-countries.service.ts":
/*!*********************************************************************!*\
  !*** ./src/app/services/multi-countries/multi-countries.service.ts ***!
  \*********************************************************************/
/*! exports provided: MultiCountriesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiCountriesService", function() { return MultiCountriesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");




var MultiCountriesService = /** @class */ (function () {
    function MultiCountriesService(afs) {
        this.afs = afs;
    }
    MultiCountriesService.prototype.getMultiCountries = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var data, err_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.afs.collection('features').doc('multiCountries').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 2:
                        err_1 = _a.sent();
                        console.log('ERROR:', err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MultiCountriesService.prototype.saveMultiCountries = function (dataObj) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var err_2;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.afs.collection('features').doc('multiCountries').update(dataObj)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        err_2 = _a.sent();
                        console.log('ERROR', err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MultiCountriesService.ctorParameters = function () { return [
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] }
    ]; };
    MultiCountriesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"]])
    ], MultiCountriesService);
    return MultiCountriesService;
}());



/***/ })

}]);
//# sourceMappingURL=admin-multi-countries-multi-countries-module-es5.js.map