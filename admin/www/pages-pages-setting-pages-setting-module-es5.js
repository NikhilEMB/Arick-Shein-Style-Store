(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-pages-setting-pages-setting-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/pages-setting/pages-setting.page.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/pages-setting/pages-setting.page.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">Pages</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <div class=\"flexInput\">\r\n      <input [(ngModel)]='newPageName' placeholder=\"Enter name of page\" />\r\n      <ion-button (click)=\"addPage()\" class=\"btn-sml i-start m-s-btn\">\r\n        + Add Page\r\n      </ion-button>\r\n    </div>\r\n\r\n    <div class=\"list-header\">\r\n      <ion-grid class=\"ion-no-padding\">\r\n        <ion-row>\r\n          <ion-col class=\"name\">\r\n            <p>Name</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>Sections</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>Action</p>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </div>\r\n    <!-- heading -->\r\n    <div class=\"list-container\">\r\n      <ion-grid class=\"ion-no-padding\">\r\n\r\n        <ng-container *ngFor=\"let item of pages; index as i\">\r\n          <ng-container *ngIf=\"item.id == 'homepage' || item.id == 'about'\">\r\n            <ion-row class=\"alignCenter\">\r\n              <ion-col class=\"name\">\r\n                <p class=\"ion-text-capitalize pinTop\" *ngIf=\"!item.name && item.id == 'homepage'\">Home Page</p>\r\n                <p class=\"ion-text-capitalize\" *ngIf=\"!item.name && item.id == 'about'\">About Page</p>\r\n              </ion-col>\r\n              <ion-col class=\"name\">\r\n                <p class=\"ion-text-capitalize\" *ngIf=\"item.sections\">{{item.sections.length}}</p>\r\n                <p class=\"ion-text-capitalize\" *ngIf=\"!item.sections\">0</p>\r\n              </ion-col>\r\n              <ion-col class=\"action\">\r\n                <ion-button (click)=\"editPage(item.id,item.name)\" class=\"btn-sml i-start\" fill=\"outline\" shape=\"round\">\r\n                  Edit\r\n                </ion-button>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ng-container>\r\n        </ng-container>\r\n\r\n        <ng-container *ngFor=\"let item of pages; index as i\">\r\n          <ng-container *ngIf=\"item.id !== 'homepage' && item.id !== 'about'\">\r\n            <ion-row class=\"alignCenter\">\r\n              <ion-col class=\"name\">\r\n                <p class=\"ion-text-capitalize\" *ngIf=\"item.name\">{{item.name}}</p>\r\n              </ion-col>\r\n              <ion-col class=\"name\">\r\n                <p class=\"ion-text-capitalize\" *ngIf=\"item.sections\">{{item.sections.length}}</p>\r\n                <p class=\"ion-text-capitalize\" *ngIf=\"!item.sections\">0</p>\r\n              </ion-col>\r\n              <ion-col class=\"action\">\r\n                <ion-button (click)=\"editPage(item.id,item.name)\" class=\"btn-sml i-start\" fill=\"outline\" shape=\"round\">\r\n                  Edit\r\n                </ion-button>&nbsp;&nbsp;\r\n                <ion-button (click)=\"deletePage(item.id)\" class=\"btn-sml i-start m-s-btn\" fill=\"outline\"\r\n                  *ngIf=\"(item.id != 'homepage') && (item.id != 'about')\" shape=\"round\">\r\n                  Delete\r\n                </ion-button>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ng-container>\r\n        </ng-container>\r\n\r\n      </ion-grid>\r\n    </div>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/pages-setting/pages-setting.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/pages-setting/pages-setting.module.ts ***!
  \*************************************************************/
/*! exports provided: PagesSettingPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesSettingPageModule", function() { return PagesSettingPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _pages_setting_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages-setting.page */ "./src/app/pages/pages-setting/pages-setting.page.ts");







var routes = [
    {
        path: '',
        component: _pages_setting_page__WEBPACK_IMPORTED_MODULE_6__["PagesSettingPage"]
    }
];
var PagesSettingPageModule = /** @class */ (function () {
    function PagesSettingPageModule() {
    }
    PagesSettingPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_pages_setting_page__WEBPACK_IMPORTED_MODULE_6__["PagesSettingPage"]]
        })
    ], PagesSettingPageModule);
    return PagesSettingPageModule;
}());



/***/ }),

/***/ "./src/app/pages/pages-setting/pages-setting.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/pages/pages-setting/pages-setting.page.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".name {\n  width: calc(100% - 410px);\n  max-width: calc(100% - 410px);\n}\n\n.list-header {\n  position: relative;\n  text-align: center;\n}\n\n.list-container {\n  margin-top: 90px;\n  text-align: center;\n}\n\n.flexInput {\n  text-align: center;\n  margin: 0% auto;\n  display: -webkit-box;\n  display: flex;\n  width: 200px;\n}\n\n.flexInput input {\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  margin-right: 8px;\n  padding: 4px;\n}\n\n.alignCenter {\n  border-bottom: var(--ion-color-medium) 1px solid;\n  -webkit-box-align: center;\n          align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvcGFnZXMtc2V0dGluZy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxccGFnZXNcXHBhZ2VzLXNldHRpbmdcXHBhZ2VzLXNldHRpbmcucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9wYWdlcy1zZXR0aW5nL3BhZ2VzLXNldHRpbmcucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0kseUJBQUE7RUFDQSw2QkFBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksZ0JBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EsWUFBQTtBQ0NGOztBRENFO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVBO0VBQ0UsZ0RBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9wYWdlcy1zZXR0aW5nL3BhZ2VzLXNldHRpbmcucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm5hbWV7XHJcbiAgICB3aWR0aDogY2FsYygxMDAlIC0gNDEwcHgpO1xyXG4gICAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSA0MTBweCk7XHJcbiAgfVxyXG5cclxuLmxpc3QtaGVhZGVye1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyXHJcbiAgfVxyXG4gIFxyXG4ubGlzdC1jb250YWluZXJ7XHJcbiAgICBtYXJnaW4tdG9wOiA5MHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyXHJcbn1cclxuXHJcbi5mbGV4SW5wdXQge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW46IDAlIGF1dG87XHJcbiAgZGlzcGxheTogZmxleDtcclxuICB3aWR0aDogMjAwcHg7XHJcblxyXG4gIGlucHV0IHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcclxuICAgIHBhZGRpbmc6IDRweDtcclxuICB9XHJcbn1cclxuLmFsaWduQ2VudGVyIHtcclxuICBib3JkZXItYm90dG9tOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlclxyXG59IiwiLm5hbWUge1xuICB3aWR0aDogY2FsYygxMDAlIC0gNDEwcHgpO1xuICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDQxMHB4KTtcbn1cblxuLmxpc3QtaGVhZGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5saXN0LWNvbnRhaW5lciB7XG4gIG1hcmdpbi10b3A6IDkwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmZsZXhJbnB1dCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luOiAwJSBhdXRvO1xuICBkaXNwbGF5OiBmbGV4O1xuICB3aWR0aDogMjAwcHg7XG59XG4uZmxleElucHV0IGlucHV0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBtYXJnaW4tcmlnaHQ6IDhweDtcbiAgcGFkZGluZzogNHB4O1xufVxuXG4uYWxpZ25DZW50ZXIge1xuICBib3JkZXItYm90dG9tOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59Il19 */"

/***/ }),

/***/ "./src/app/pages/pages-setting/pages-setting.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/pages-setting/pages-setting.page.ts ***!
  \***********************************************************/
/*! exports provided: PagesSettingPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesSettingPage", function() { return PagesSettingPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var PagesSettingPage = /** @class */ (function () {
    function PagesSettingPage(modalController, events, router, loadingController, alertController) {
        this.modalController = modalController;
        this.events = events;
        this.router = router;
        this.loadingController = loadingController;
        this.alertController = alertController;
    }
    PagesSettingPage.prototype.ngOnInit = function () {
        // this.initializeSubscriptions()
    };
    PagesSettingPage.prototype.ionViewWillEnter = function () {
        this.initializeSubscriptions();
        this.events.publish('page-setting:getPages');
    };
    PagesSettingPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    PagesSettingPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('page-setting:publishPagesSuccess', function (pageData) {
            if (pageData) {
                var result = pageData.filter(function (page) { return page.type !== 'blog'; });
                _this.pages = result;
            }
        });
        this.events.subscribe('page-setting:deletePageSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.events.publish('page-setting:getPages');
            _this.presentAlert('Page deleted successfully');
        });
        this.events.subscribe('page-setting:pageAddedSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.events.publish('page-setting:getPages');
            _this.presentAlert('Page added successfully');
        });
    };
    PagesSettingPage.prototype.editPage = function (id, name) {
        var navigationExtras = {
            queryParams: {
                pageId: id,
                pageName: name
            }
        };
        this.router.navigate(['homepage-setting'], navigationExtras);
    };
    PagesSettingPage.prototype.deletePage = function (id) {
        this.presentLoading();
        this.events.publish('page-setting:deletePage', id);
    };
    PagesSettingPage.prototype.addPage = function () {
        if (this.newPageName) {
            if (this.newPageName.toLowerCase() == 'contact') {
                this.presentAlert('Contact page already exists for website, please create page with other name');
                return;
            }
            this.presentLoading();
            this.events.publish('page-setting:addPage', this.newPageName);
        }
        else {
            this.presentAlert('Please enter name for page');
        }
    };
    PagesSettingPage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: ['OK']
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
    PagesSettingPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: "Please Wait...",
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
    PagesSettingPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('page-setting:publishPagesSuccess');
        this.events.unsubscribe('page-setting:deletePageSuccess');
        this.events.unsubscribe('page-setting:pageAddedSuccess');
    };
    PagesSettingPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] }
    ]; };
    PagesSettingPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-pages-setting',
            template: __webpack_require__(/*! raw-loader!./pages-setting.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/pages-setting/pages-setting.page.html"),
            styles: [__webpack_require__(/*! ./pages-setting.page.scss */ "./src/app/pages/pages-setting/pages-setting.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]])
    ], PagesSettingPage);
    return PagesSettingPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-pages-setting-pages-setting-module-es5.js.map