(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-blogs-setting-blogs-setting-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/blogs-setting/blogs-setting.page.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/blogs-setting/blogs-setting.page.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">Blogs</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <div class=\"flexInput\">\r\n      <input [(ngModel)]='newPageName' placeholder=\"Enter name of blog\" />\r\n      <ion-button (click)=\"addPage()\" class=\"btn-sml i-start m-s-btn\">\r\n        + Add Blog\r\n      </ion-button>\r\n    </div>\r\n\r\n    <div class=\"list-header\">\r\n      <ion-grid class=\"ion-no-padding\">\r\n        <ion-row>\r\n          <ion-col class=\"name\">\r\n            <p>Name</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>Sections</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>Action</p>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </div>\r\n    <!-- heading -->\r\n    <div class=\"list-container\">\r\n      <ion-grid class=\"ion-no-padding\">\r\n        <ng-container *ngFor=\"let item of pages; index as i\">\r\n          <ion-row class=\"alignCenter\">\r\n            <ion-col class=\"name\">\r\n              <p class=\"ion-text-capitalize\" *ngIf=\"item.name\">{{item.name}}</p>\r\n            </ion-col>\r\n            <ion-col class=\"name\">\r\n              <p class=\"ion-text-capitalize\" *ngIf=\"item.sections\">{{item.sections.length}}</p>\r\n              <p class=\"ion-text-capitalize\" *ngIf=\"!item.sections\">0</p>\r\n            </ion-col>\r\n            <ion-col class=\"action\">\r\n              <ion-button (click)=\"editPage(item.id,item.name)\" class=\"btn-sml i-start\" fill=\"outline\" shape=\"round\">\r\n                Edit\r\n              </ion-button>&nbsp;&nbsp;\r\n              <ion-button (click)=\"deletePage(item.id)\" class=\"btn-sml i-start m-s-btn\" fill=\"outline\" shape=\"round\">\r\n                Delete\r\n              </ion-button>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ng-container>\r\n      </ion-grid>\r\n    </div>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/blogs-setting/blogs-setting.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/blogs-setting/blogs-setting.module.ts ***!
  \*************************************************************/
/*! exports provided: BlogsSettingPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlogsSettingPageModule", function() { return BlogsSettingPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _blogs_setting_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./blogs-setting.page */ "./src/app/pages/blogs-setting/blogs-setting.page.ts");







var routes = [
    {
        path: '',
        component: _blogs_setting_page__WEBPACK_IMPORTED_MODULE_6__["BlogsSettingPage"]
    }
];
var BlogsSettingPageModule = /** @class */ (function () {
    function BlogsSettingPageModule() {
    }
    BlogsSettingPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_blogs_setting_page__WEBPACK_IMPORTED_MODULE_6__["BlogsSettingPage"]]
        })
    ], BlogsSettingPageModule);
    return BlogsSettingPageModule;
}());



/***/ }),

/***/ "./src/app/pages/blogs-setting/blogs-setting.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/pages/blogs-setting/blogs-setting.page.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".name {\n  width: calc(100% - 410px);\n  max-width: calc(100% - 410px);\n}\n\n.list-header {\n  position: relative;\n  text-align: center;\n}\n\n.list-container {\n  margin-top: 90px;\n  text-align: center;\n}\n\n.flexInput {\n  text-align: center;\n  margin: 0% auto;\n  display: -webkit-box;\n  display: flex;\n  width: 200px;\n}\n\n.flexInput input {\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  margin-right: 8px;\n  padding: 4px;\n}\n\n.alignCenter {\n  border-bottom: var(--ion-color-medium) 1px solid;\n  -webkit-box-align: center;\n          align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvYmxvZ3Mtc2V0dGluZy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxccGFnZXNcXGJsb2dzLXNldHRpbmdcXGJsb2dzLXNldHRpbmcucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9ibG9ncy1zZXR0aW5nL2Jsb2dzLXNldHRpbmcucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UseUJBQUE7RUFDQSw2QkFBQTtBQ0NGOztBREVBO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EsWUFBQTtBQ0NGOztBRENFO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREdBO0VBQ0UsZ0RBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FDQUYiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9ibG9ncy1zZXR0aW5nL2Jsb2dzLXNldHRpbmcucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm5hbWUge1xyXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA0MTBweCk7XHJcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSA0MTBweCk7XHJcbn1cclxuXHJcbi5saXN0LWhlYWRlciB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmxpc3QtY29udGFpbmVyIHtcclxuICBtYXJnaW4tdG9wOiA5MHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmZsZXhJbnB1dCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbjogMCUgYXV0bztcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHdpZHRoOiAyMDBweDtcclxuXHJcbiAgaW5wdXQge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIG1hcmdpbi1yaWdodDogOHB4O1xyXG4gICAgcGFkZGluZzogNHB4O1xyXG4gIH1cclxufVxyXG5cclxuLmFsaWduQ2VudGVyIHtcclxuICBib3JkZXItYm90dG9tOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG4iLCIubmFtZSB7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA0MTBweCk7XG4gIG1heC13aWR0aDogY2FsYygxMDAlIC0gNDEwcHgpO1xufVxuXG4ubGlzdC1oZWFkZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmxpc3QtY29udGFpbmVyIHtcbiAgbWFyZ2luLXRvcDogOTBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZmxleElucHV0IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW46IDAlIGF1dG87XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHdpZHRoOiAyMDBweDtcbn1cbi5mbGV4SW5wdXQgaW5wdXQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIG1hcmdpbi1yaWdodDogOHB4O1xuICBwYWRkaW5nOiA0cHg7XG59XG5cbi5hbGlnbkNlbnRlciB7XG4gIGJvcmRlci1ib3R0b206IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pIDFweCBzb2xpZDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/blogs-setting/blogs-setting.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/blogs-setting/blogs-setting.page.ts ***!
  \***********************************************************/
/*! exports provided: BlogsSettingPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlogsSettingPage", function() { return BlogsSettingPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var BlogsSettingPage = /** @class */ (function () {
    function BlogsSettingPage(modalController, events, router, loadingController, alertController) {
        this.modalController = modalController;
        this.events = events;
        this.router = router;
        this.loadingController = loadingController;
        this.alertController = alertController;
    }
    BlogsSettingPage.prototype.ngOnInit = function () {
        // this.initializeSubscriptions()
    };
    BlogsSettingPage.prototype.ionViewWillEnter = function () {
        this.initializeSubscriptions();
        this.events.publish('page-setting:getPages', "blog");
    };
    BlogsSettingPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    BlogsSettingPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('page-setting:publishPagesSuccess', function (pageData) {
            if (pageData) {
                _this.pages = pageData;
            }
        });
        this.events.subscribe('page-setting:deletePageSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.events.publish('page-setting:getPages', "blog");
            _this.presentAlert('Page deleted successfully');
        });
        this.events.subscribe('page-setting:pageAddedSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.events.publish('page-setting:getPages', "blog");
            _this.presentAlert('Page added successfully');
        });
    };
    BlogsSettingPage.prototype.editPage = function (id, name) {
        var navigationExtras = {
            queryParams: {
                pageId: id,
                pageName: name
            }
        };
        this.router.navigate(['homepage-setting'], navigationExtras);
    };
    BlogsSettingPage.prototype.deletePage = function (id) {
        this.presentLoading();
        this.events.publish('page-setting:deletePage', id);
    };
    BlogsSettingPage.prototype.addPage = function () {
        if (this.newPageName) {
            if (this.newPageName.toLowerCase() == 'contact') {
                this.presentAlert('Contact page already exists for website, please create page with other name');
                return;
            }
            this.presentLoading();
            this.events.publish('page-setting:addPage', this.newPageName, "blog");
        }
        else {
            this.presentAlert('Please enter name for page');
        }
    };
    BlogsSettingPage.prototype.presentAlert = function (msg) {
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
    BlogsSettingPage.prototype.presentLoading = function () {
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
    BlogsSettingPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('page-setting:publishPagesSuccess');
        this.events.unsubscribe('page-setting:deletePageSuccess');
        this.events.unsubscribe('page-setting:pageAddedSuccess');
    };
    BlogsSettingPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] }
    ]; };
    BlogsSettingPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-blogs-setting',
            template: __webpack_require__(/*! raw-loader!./blogs-setting.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/blogs-setting/blogs-setting.page.html"),
            styles: [__webpack_require__(/*! ./blogs-setting.page.scss */ "./src/app/pages/blogs-setting/blogs-setting.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]])
    ], BlogsSettingPage);
    return BlogsSettingPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-blogs-setting-blogs-setting-module-es5.js.map