(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-filter-settings-all-filters-all-filters-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/filter-settings/all-filters/all-filters.page.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/filter-settings/all-filters/all-filters.page.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Filters</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>  \r\n\r\n<ion-content>\r\n    <div class=\"main\">\r\n  <div *ngIf=\"!filters.length\" class=\"no-data ion-text-center\">\r\n    <img src=\"assets/img/no-category.png\" alt=\"\">\r\n    <h6>No filters</h6>\r\n  </div>\r\n  <div *ngIf=\"filters.length\">\r\n    <br><br>\r\n    <div class=\"toggle\">\r\n      <p>Active</p>\r\n      <div class=\"toggle-btn\">\r\n        <label class=\"switch\">\r\n          <input type=\"checkbox\" (click)=\"toggleActive()\" [checked]=\"isFilterActive\">\r\n          <span class=\"slider round\"></span>\r\n        </label>\r\n      </div>\r\n    </div>\r\n    <div class=\"list-header\">\r\n      <ion-grid class=\"ion-no-padding\">\r\n        <ion-row>\r\n          <ion-col class=\"name\">\r\n            <p>Filters</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>Active</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>Action</p>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </div>\r\n    <div class=\"list-container\">\r\n      <ion-grid>\r\n        <ion-row *ngFor=\"let filter of filters; let i = index; let i = index\" class=\"order-row\">\r\n          <ion-col class=\"name\">\r\n            <p class=\"ion-text-capitalize\" (click)=\"editFilter(i)\">{{filter.name}}</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <div class=\"toggle-btn\">\r\n              <label class=\"switch\">\r\n                <input type=\"checkbox\" (click)=\"toggleFilterActive(i)\" [checked]=\"filter.active\">\r\n                <span class=\"slider round\"></span>\r\n              </label>\r\n            </div>\r\n          </ion-col>\r\n          <ion-col class=\"action\">\r\n            <ion-button (click)=\"editFilter(i)\" class=\"btn-sml i-start\" fill=\"outline\"\r\n              shape=\"round\">\r\n              Edit\r\n            </ion-button>&nbsp;&nbsp;\r\n            <ion-button (click)=\"deleteFilter(filter.id)\" class=\"btn-sml i-start m-s-btn\" fill=\"outline\"\r\n              shape=\"round\">\r\n              Delete\r\n            </ion-button>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </div>\r\n  </div>\r\n  <br><br>\r\n  <div style=\"display: flex;justify-content: center\">\r\n    <ion-button (click)=\"addNewFilter()\" shape=\"round\" class=\"btn-1 i-start\">\r\n      Add New\r\n    </ion-button>\r\n  </div>\r\n    </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/filter-settings/all-filters/all-filters.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/admin/filter-settings/all-filters/all-filters.module.ts ***!
  \*************************************************************************/
/*! exports provided: AllFiltersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllFiltersPageModule", function() { return AllFiltersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _all_filters_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./all-filters.page */ "./src/app/admin/filter-settings/all-filters/all-filters.page.ts");







var routes = [
    {
        path: '',
        component: _all_filters_page__WEBPACK_IMPORTED_MODULE_6__["AllFiltersPage"]
    }
];
var AllFiltersPageModule = /** @class */ (function () {
    function AllFiltersPageModule() {
    }
    AllFiltersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_all_filters_page__WEBPACK_IMPORTED_MODULE_6__["AllFiltersPage"]]
        })
    ], AllFiltersPageModule);
    return AllFiltersPageModule;
}());



/***/ }),

/***/ "./src/app/admin/filter-settings/all-filters/all-filters.page.scss":
/*!*************************************************************************!*\
  !*** ./src/app/admin/filter-settings/all-filters/all-filters.page.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  padding-left: 50px;\n  padding-right: 50px;\n  padding-bottom: 30px;\n  background: white;\n  text-align: center;\n  width: 60vw;\n  margin: 0% auto;\n}\n\nion-toggle {\n  margin-top: -10px;\n}\n\n.toggle {\n  display: -webkit-box;\n  display: flex;\n  justify-content: space-around;\n  text-align: center;\n}\n\n.list-header {\n  position: relative;\n  width: 53.5vw;\n  margin-top: -30px;\n}\n\n.list-container {\n  margin-top: 90px;\n  width: 52vw;\n}\n\n.list-container ion-grid ion-row {\n  border-bottom: var(--ion-color-medium) 1px solid;\n}\n\n.list-container ion-grid ion-row ion-col {\n  -webkit-box-pack: center;\n          justify-content: center;\n  display: -webkit-inline-box;\n  display: inline-flex;\n}\n\n.f-d-c {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.f-d-c .m-s-btn {\n  margin-top: 15px;\n}\n\n.name {\n  width: 60vw;\n  max-width: 60vw;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vZmlsdGVyLXNldHRpbmdzL2FsbC1maWx0ZXJzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcZmlsdGVyLXNldHRpbmdzXFxhbGwtZmlsdGVyc1xcYWxsLWZpbHRlcnMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9maWx0ZXItc2V0dGluZ3MvYWxsLWZpbHRlcnMvYWxsLWZpbHRlcnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FDQ0Y7O0FERUE7RUFDSSxpQkFBQTtBQ0NKOztBREVBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNkJBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0ksa0JBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7QUNDSjs7QURFQTtFQUNJLGdCQUFBO0VBQ0EsV0FBQTtBQ0NKOztBRENRO0VBQ0EsZ0RBQUE7QUNDUjs7QURDUTtFQUNJLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSwyQkFBQTtFQUFBLG9CQUFBO0FDQ1o7O0FES0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FDRko7O0FESUk7RUFDRSxnQkFBQTtBQ0ZOOztBRE1FO0VBQ0UsV0FBQTtFQUNBLGVBQUE7QUNISiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2ZpbHRlci1zZXR0aW5ncy9hbGwtZmlsdGVycy9hbGwtZmlsdGVycy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbntcclxuICBwYWRkaW5nLWxlZnQ6IDUwcHg7XHJcbiAgcGFkZGluZy1yaWdodDogNTBweDtcclxuICBwYWRkaW5nLWJvdHRvbTogMzBweDtcclxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgd2lkdGg6IDYwdnc7XHJcbiAgbWFyZ2luOiAwJSBhdXRvXHJcbn1cclxuXHJcbmlvbi10b2dnbGV7XHJcbiAgICBtYXJnaW4tdG9wOiAtMTBweFxyXG59XHJcblxyXG4udG9nZ2xle1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyXHJcbn1cclxuXHJcbi5saXN0LWhlYWRlcntcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHdpZHRoOiA1My41dnc7XHJcbiAgICBtYXJnaW4tdG9wOiAtMzBweFxyXG4gIH1cclxuICBcclxuLmxpc3QtY29udGFpbmVye1xyXG4gICAgbWFyZ2luLXRvcDogOTBweDtcclxuICAgIHdpZHRoOiA1MnZ3O1xyXG4gICAgaW9uLWdyaWR7XHJcbiAgICAgICAgaW9uLXJvd3tcclxuICAgICAgICBib3JkZXItYm90dG9tOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XHJcbiAgICAgICAgLy8gbWFyZ2luLWxlZnQ6IDV2dztcclxuICAgICAgICBpb24tY29se1xyXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLmYtZC1jIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBcclxuICAgIC5tLXMtYnRuIHtcclxuICAgICAgbWFyZ2luLXRvcDogMTVweDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5uYW1le1xyXG4gICAgd2lkdGg6IDYwdnc7XHJcbiAgICBtYXgtd2lkdGg6IDYwdnc7XHJcbiAgfSIsIi5tYWluIHtcbiAgcGFkZGluZy1sZWZ0OiA1MHB4O1xuICBwYWRkaW5nLXJpZ2h0OiA1MHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMzBweDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDYwdnc7XG4gIG1hcmdpbjogMCUgYXV0bztcbn1cblxuaW9uLXRvZ2dsZSB7XG4gIG1hcmdpbi10b3A6IC0xMHB4O1xufVxuXG4udG9nZ2xlIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmxpc3QtaGVhZGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogNTMuNXZ3O1xuICBtYXJnaW4tdG9wOiAtMzBweDtcbn1cblxuLmxpc3QtY29udGFpbmVyIHtcbiAgbWFyZ2luLXRvcDogOTBweDtcbiAgd2lkdGg6IDUydnc7XG59XG4ubGlzdC1jb250YWluZXIgaW9uLWdyaWQgaW9uLXJvdyB7XG4gIGJvcmRlci1ib3R0b206IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pIDFweCBzb2xpZDtcbn1cbi5saXN0LWNvbnRhaW5lciBpb24tZ3JpZCBpb24tcm93IGlvbi1jb2wge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG59XG5cbi5mLWQtYyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uZi1kLWMgLm0tcy1idG4ge1xuICBtYXJnaW4tdG9wOiAxNXB4O1xufVxuXG4ubmFtZSB7XG4gIHdpZHRoOiA2MHZ3O1xuICBtYXgtd2lkdGg6IDYwdnc7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/filter-settings/all-filters/all-filters.page.ts":
/*!***********************************************************************!*\
  !*** ./src/app/admin/filter-settings/all-filters/all-filters.page.ts ***!
  \***********************************************************************/
/*! exports provided: AllFiltersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllFiltersPage", function() { return AllFiltersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");





var AllFiltersPage = /** @class */ (function () {
    function AllFiltersPage(events, labelService, alertController, loadingController, router, toastController) {
        this.events = events;
        this.labelService = labelService;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.router = router;
        this.toastController = toastController;
        this.isFilterActive = false;
        this.filters = [];
    }
    AllFiltersPage.prototype.ngOnInit = function () {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.ALL_FILTERS_LABELS = this.labelService.labels['ALL_FILTERS'];
        this.headerText = this.ALL_FILTERS_LABELS['header_text'];
        this.initializeSubscriptions();
        this.events.publish('filters:getActiveStatus');
        this.events.publish('filters:getAllFilters');
    };
    AllFiltersPage.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    AllFiltersPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('filters:filtersActiveChanged', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentToast('Status changed successfully');
        });
        this.events.subscribe('filters:publishActiveStatus', function (data) {
            if (data) {
                _this.isFilterActive = data.active;
            }
        });
        this.events.subscribe('filters:publishAllFilters', function (filters) {
            console.log(filters);
            if (filters.length) {
                _this.filters = filters;
            }
            else {
                _this.filters = [];
            }
        });
        this.events.subscribe('filters:singleFilterActiveChanged', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentToast('Status changed successfully');
        });
        this.events.subscribe('filters:filterDeleted', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('Filter deleted successfully');
        });
    };
    AllFiltersPage.prototype.toggleActive = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isFilterActive = !this.isFilterActive;
                        return [4 /*yield*/, this.presentLoading(5000, 'Please wait')];
                    case 1:
                        _a.sent();
                        this.events.publish('filters:toggleFiltersActive', this.isFilterActive);
                        return [2 /*return*/];
                }
            });
        });
    };
    AllFiltersPage.prototype.toggleFilterActive = function (i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.filters[i].active = !this.filters[i].active;
                        return [4 /*yield*/, this.presentLoading(5000, 'Please wait')];
                    case 1:
                        _a.sent();
                        this.events.publish('filters:toggleSingleFilterActive', this.filters[i].active, this.filters[i].id);
                        return [2 /*return*/];
                }
            });
        });
    };
    AllFiltersPage.prototype.editFilter = function (i) {
        var navigationExtras = {
            state: {
                filterData: this.filters[i]
            }
        };
        this.router.navigate(['add-filter'], navigationExtras);
    };
    AllFiltersPage.prototype.deleteFilter = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading(5000, 'please wait')];
                    case 1:
                        _a.sent();
                        this.events.publish('filters:deleteFilter', id);
                        return [2 /*return*/];
                }
            });
        });
    };
    AllFiltersPage.prototype.addNewFilter = function () {
        this.router.navigate(['add-filter']);
    };
    AllFiltersPage.prototype.presentLoading = function (duration, msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: msg,
                                duration: duration,
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
    AllFiltersPage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: [{
                                    text: 'ok',
                                    handler: function () {
                                    }
                                }]
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
    AllFiltersPage.prototype.presentToast = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: msg,
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    AllFiltersPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('filters:filtersActiveChanged');
        this.events.unsubscribe('filters:publishActiveStatus');
        this.events.unsubscribe('filters:publishAllFilters');
        this.events.unsubscribe('filters:singleFilterActiveChanged');
        this.events.unsubscribe('filters:filterDeleted');
    };
    AllFiltersPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"] }
    ]; };
    AllFiltersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-all-filters',
            template: __webpack_require__(/*! raw-loader!./all-filters.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/filter-settings/all-filters/all-filters.page.html"),
            styles: [__webpack_require__(/*! ./all-filters.page.scss */ "./src/app/admin/filter-settings/all-filters/all-filters.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
            src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"]])
    ], AllFiltersPage);
    return AllFiltersPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-filter-settings-all-filters-all-filters-module-es5.js.map