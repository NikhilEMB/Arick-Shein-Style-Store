(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["faq-faq-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/faq/faq.page.html":
/*!*************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/faq/faq.page.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>FAQs</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container fixed-height\">\r\n    <ion-grid>\r\n      <ion-row *ngFor=\"let x of faq; let i = index;\">\r\n        <ion-col size=\"6\" class=\"vertical-center\">\r\n          <div>\r\n            <p>{{i+1}})</p>\r\n          </div>\r\n          <ion-textarea rows=\"3\" type=\"text\" placeholder=\"Question\" class=\"form-input\" [(ngModel)]=\"x.quest\">\r\n          </ion-textarea>\r\n        </ion-col>\r\n        <ion-col size=\"6\" class=\"vertical-center\">\r\n          <ion-textarea rows=\"3\" type=\"text\" placeholder=\"Answer\" class=\"form-input\" [(ngModel)]=\"x.ans\">\r\n          </ion-textarea>\r\n          <i class=\"flaticon-null-19 remove-icon\" (click)=\"remove(i)\"></i>\r\n        </ion-col>\r\n      </ion-row>\r\n      <ion-row class=\"ion-justify-content-center\">\r\n        <ion-button (click)=\"addMore()\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n          Add More FAQ\r\n        </ion-button>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n\r\n</ion-content>\r\n\r\n<ion-footer no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"saveDetails()\"  shape=\"round\" class=\"btn-1 i-start\"\r\n      color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/faq/faq.module.ts":
/*!***********************************!*\
  !*** ./src/app/faq/faq.module.ts ***!
  \***********************************/
/*! exports provided: FaqPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaqPageModule", function() { return FaqPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _faq_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./faq.page */ "./src/app/faq/faq.page.ts");







var routes = [
    {
        path: '',
        component: _faq_page__WEBPACK_IMPORTED_MODULE_6__["FaqPage"]
    }
];
var FaqPageModule = /** @class */ (function () {
    function FaqPageModule() {
    }
    FaqPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_faq_page__WEBPACK_IMPORTED_MODULE_6__["FaqPage"]]
        })
    ], FaqPageModule);
    return FaqPageModule;
}());



/***/ }),

/***/ "./src/app/faq/faq.page.scss":
/*!***********************************!*\
  !*** ./src/app/faq/faq.page.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".remove-icon {\n  cursor: pointer;\n  margin-top: 12px;\n  margin-left: 5px;\n  color: var(--ion-color-danger);\n  font-size: 16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZmFxL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxmYXFcXGZhcS5wYWdlLnNjc3MiLCJzcmMvYXBwL2ZhcS9mYXEucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2ZhcS9mYXEucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnJlbW92ZS1pY29ue1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgbWFyZ2luLXRvcDogMTJweDtcclxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgfSIsIi5yZW1vdmUtaWNvbiB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbWFyZ2luLXRvcDogMTJweDtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xuICBmb250LXNpemU6IDE2cHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/faq/faq.page.ts":
/*!*********************************!*\
  !*** ./src/app/faq/faq.page.ts ***!
  \*********************************/
/*! exports provided: FaqPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaqPage", function() { return FaqPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_contact_us_contact_us_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/contact-us/contact-us.service */ "./src/app/services/contact-us/contact-us.service.ts");
/* harmony import */ var _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");




var FaqPage = /** @class */ (function () {
    function FaqPage(sharedService, contactUsService) {
        this.sharedService = sharedService;
        this.contactUsService = contactUsService;
        this.faq = [{ quest: '', ans: '' }];
    }
    FaqPage.prototype.ngOnInit = function () {
    };
    FaqPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var details;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contactUsService.getContactPgDetails()];
                    case 1:
                        details = _a.sent();
                        if (details) {
                            this.faq = details.faq || this.faq;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FaqPage.prototype.addMore = function () {
        this.faq.push({ quest: '', ans: '' });
    };
    FaqPage.prototype.remove = function (index) {
        this.faq.splice(index, 1);
    };
    FaqPage.prototype.saveDetails = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var valid, _i, _a, faq, saved;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        valid = true;
                        for (_i = 0, _a = this.faq; _i < _a.length; _i++) {
                            faq = _a[_i];
                            if (!(faq.quest.length && faq.ans.length)) {
                                console.log('address:, ', faq.ans.length);
                                valid = false;
                            }
                        }
                        if (!valid) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.contactUsService.saveContactPgDetails({ faq: this.faq })];
                    case 1:
                        saved = _b.sent();
                        if (saved) {
                            this.sharedService.presentAlert('FAQs saved successfully.');
                        }
                        else {
                            this.sharedService.presentAlert('Something went wrong. Please try again later');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        this.sharedService.presentAlert('FAQ cant be empty, either remove the field or fill them');
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FaqPage.ctorParameters = function () { return [
        { type: _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"] },
        { type: _services_contact_us_contact_us_service__WEBPACK_IMPORTED_MODULE_2__["ContactUsService"] }
    ]; };
    FaqPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-faq',
            template: __webpack_require__(/*! raw-loader!./faq.page.html */ "./node_modules/raw-loader/index.js!./src/app/faq/faq.page.html"),
            styles: [__webpack_require__(/*! ./faq.page.scss */ "./src/app/faq/faq.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"],
            _services_contact_us_contact_us_service__WEBPACK_IMPORTED_MODULE_2__["ContactUsService"]])
    ], FaqPage);
    return FaqPage;
}());



/***/ })

}]);
//# sourceMappingURL=faq-faq-module-es5.js.map