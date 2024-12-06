(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-filter-settings-add-filter-add-filter-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/filter-settings/add-filter/add-filter.page.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/filter-settings/add-filter/add-filter.page.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">Add Filter</ion-title>\r\n  </ion-toolbar>\r\n</ion-header> \r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <br>\r\n    <div class=\"toggle\">\r\n        <p>Active</p>&nbsp;&nbsp;&nbsp;\r\n        <div class=\"toggle-btn\">\r\n          <label class=\"switch\">\r\n            <input type=\"checkbox\" (click)=\"toggleActive()\" [checked]=\"filter.active\">\r\n            <span class=\"slider round\"></span>\r\n          </label>\r\n        </div>\r\n    </div>\r\n    <br>\r\n    <div class=\"data-field\">\r\n      <div class=\"data-field-txt\">\r\n        Name\r\n      </div>\r\n      <div>\r\n        <ion-input type=\"text\" [(ngModel)]=\"filter.name\" class=\"form-input\"></ion-input>\r\n      </div>\r\n    </div>\r\n    <br>\r\n  <div class=\"data-field\">\r\n    <div class=\"data-field-txt\">\r\n      Values\r\n    </div>\r\n    <div>\r\n      <ion-input type=\"text\" [(ngModel)]=\"value\" class=\"form-input\"></ion-input>\r\n      <br>\r\n      <ion-button (click)=\"addFilter()\" fill=\"outline\" shape=\"round\" size=\"small\" [disabled]=\"!value\">\r\n        Add\r\n      </ion-button>\r\n    </div>\r\n  </div>\r\n  <br>\r\n  <div class=\"dataTable\">\r\n      <div *ngIf=\"filter.values.length\">\r\n        <ion-grid class=\"ion-no-padding data-table ion-text-center\">\r\n          <ion-row>\r\n            <ion-col>Values</ion-col>\r\n            <ion-col>Remove</ion-col>\r\n          </ion-row>\r\n          <ion-row *ngFor=\"let filterValue of filter.values; let i=index;\">\r\n            <ion-col>\r\n              {{filterValue}}\r\n            </ion-col>\r\n            <ion-col (click)=\"removeFilter(i)\">\r\n              <i class=\"flaticon-null-17\"></i>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n      </div>\r\n  </div>\r\n  <br>\r\n  <div class=\"data-field\">\r\n    <div class=\"data-field-txt\">\r\n      Link Categories\r\n    </div>\r\n    <div class=\"border content-alignment f-s-14 c-b-link m-t-10\" (click)=\"onClickAdd('categories')\">\r\n      <ion-text>{{getLinkedLength('categories')}} Categories Linked</ion-text>\r\n      &nbsp;&nbsp;<i class=\"flaticon-null-5\"></i>\r\n    </div>\r\n  </div>\r\n  <br>\r\n  <div class=\"data-field\">\r\n    <div class=\"data-field-txt\">\r\n      Link Brands\r\n    </div>\r\n    <div class=\"border content-alignment f-s-14 c-b-link m-t-10\" (click)=\"onClickAdd('brands')\">\r\n      <ion-text>{{getLinkedLength('brands')}} Brands Linked</ion-text>\r\n      &nbsp;&nbsp;<i class=\"flaticon-null-5\"></i>\r\n    </div>\r\n  </div>\r\n  <br><br>\r\n  <ion-row class=\"ion-justify-content-center\">\r\n    <ion-button (click)=\"saveFilter()\" fill=\"outline\" shape=\"round\" >\r\n      Save\r\n    </ion-button>\r\n  </ion-row>\r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/filter-settings/add-filter/add-filter.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/admin/filter-settings/add-filter/add-filter.module.ts ***!
  \***********************************************************************/
/*! exports provided: AddFilterPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddFilterPageModule", function() { return AddFilterPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _add_filter_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./add-filter.page */ "./src/app/admin/filter-settings/add-filter/add-filter.page.ts");







var routes = [
    {
        path: '',
        component: _add_filter_page__WEBPACK_IMPORTED_MODULE_6__["AddFilterPage"]
    }
];
var AddFilterPageModule = /** @class */ (function () {
    function AddFilterPageModule() {
    }
    AddFilterPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_add_filter_page__WEBPACK_IMPORTED_MODULE_6__["AddFilterPage"]]
        })
    ], AddFilterPageModule);
    return AddFilterPageModule;
}());



/***/ }),

/***/ "./src/app/admin/filter-settings/add-filter/add-filter.page.scss":
/*!***********************************************************************!*\
  !*** ./src/app/admin/filter-settings/add-filter/add-filter.page.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".value-input {\n  max-width: 60%;\n}\n\n.c-b-link {\n  padding: 10px;\n}\n\n.c-b-link ion-text {\n  margin-left: 5px;\n}\n\n.c-b-link .flaticon-null-5::before {\n  font-size: 18px;\n  opacity: 0.6;\n}\n\n.toggle {\n  display: -webkit-box;\n  display: flex;\n  margin: 0% auto;\n}\n\n.data-field {\n  display: block;\n}\n\nion-input {\n  border: 1px solid gray;\n  border-radius: 5px;\n}\n\n.border {\n  border: 1px solid gray;\n  cursor: pointer;\n}\n\nion-col {\n  border: 1px solid gray;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n\nion-row:first-child {\n  background: lightgray;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vZmlsdGVyLXNldHRpbmdzL2FkZC1maWx0ZXIvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxmaWx0ZXItc2V0dGluZ3NcXGFkZC1maWx0ZXJcXGFkZC1maWx0ZXIucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9maWx0ZXItc2V0dGluZ3MvYWRkLWZpbHRlci9hZGQtZmlsdGVyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGNBQUE7QUNDSjs7QURFQTtFQUNFLGFBQUE7QUNDRjs7QURBRTtFQUNFLGdCQUFBO0FDRUo7O0FEQUU7RUFDRSxlQUFBO0VBQ0EsWUFBQTtBQ0VKOztBREVBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsZUFBQTtBQ0NGOztBREVBO0VBQ0UsY0FBQTtBQ0NGOztBREVBO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0Usc0JBQUE7RUFDQSxlQUFBO0FDQ0Y7O0FERUE7RUFDRSxzQkFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7QUNDRjs7QURFQTtFQUNFLHFCQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9maWx0ZXItc2V0dGluZ3MvYWRkLWZpbHRlci9hZGQtZmlsdGVyLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi52YWx1ZS1pbnB1dCB7XHJcbiAgICBtYXgtd2lkdGg6IDYwJTtcclxufVxyXG5cclxuLmMtYi1saW5rIHtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIGlvbi10ZXh0IHtcclxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgfVxyXG4gIC5mbGF0aWNvbi1udWxsLTU6OmJlZm9yZSB7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBvcGFjaXR5OiAuNjtcclxuICB9XHJcbn1cclxuXHJcbi50b2dnbGV7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBtYXJnaW46IDAlIGF1dG9cclxufVxyXG5cclxuLmRhdGEtZmllbGR7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbmlvbi1pbnB1dHtcclxuICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLmJvcmRlcntcclxuICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xyXG4gIGN1cnNvcjogcG9pbnRlclxyXG59XHJcblxyXG5pb24tY29se1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XHJcbiAgcGFkZGluZy10b3A6IDEwcHg7XHJcbiAgcGFkZGluZy1ib3R0b206IDEwcHhcclxufVxyXG5cclxuaW9uLXJvdzpmaXJzdC1jaGlsZHtcclxuICBiYWNrZ3JvdW5kOiBsaWdodGdyYXlcclxufSIsIi52YWx1ZS1pbnB1dCB7XG4gIG1heC13aWR0aDogNjAlO1xufVxuXG4uYy1iLWxpbmsge1xuICBwYWRkaW5nOiAxMHB4O1xufVxuLmMtYi1saW5rIGlvbi10ZXh0IHtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cbi5jLWItbGluayAuZmxhdGljb24tbnVsbC01OjpiZWZvcmUge1xuICBmb250LXNpemU6IDE4cHg7XG4gIG9wYWNpdHk6IDAuNjtcbn1cblxuLnRvZ2dsZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbjogMCUgYXV0bztcbn1cblxuLmRhdGEtZmllbGQge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuaW9uLWlucHV0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4uYm9yZGVyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5pb24tY29sIHtcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuXG5pb24tcm93OmZpcnN0LWNoaWxkIHtcbiAgYmFja2dyb3VuZDogbGlnaHRncmF5O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/filter-settings/add-filter/add-filter.page.ts":
/*!*********************************************************************!*\
  !*** ./src/app/admin/filter-settings/add-filter/add-filter.page.ts ***!
  \*********************************************************************/
/*! exports provided: AddFilterPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddFilterPage", function() { return AddFilterPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var _select_categories_select_categories_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../select-categories/select-categories.page */ "./src/app/admin/select-categories/select-categories.page.ts");






var AddFilterPage = /** @class */ (function () {
    function AddFilterPage(events, labelService, alertController, loadingController, router, route, modalController) {
        var _this = this;
        this.events = events;
        this.labelService = labelService;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.router = router;
        this.route = route;
        this.modalController = modalController;
        this.filter = {
            name: '',
            active: true,
            values: [],
            categories: [],
            brands: []
        };
        this.route.queryParams.subscribe(function (params) {
            if (_this.router.getCurrentNavigation().extras.state) {
                var filterData = _this.router.getCurrentNavigation().extras.state.filterData;
                if (filterData) {
                    filterData['categories'] = filterData.categories || [];
                    filterData['brands'] = filterData.brands || [];
                    _this.filter = filterData;
                }
            }
        });
    }
    AddFilterPage.prototype.ngOnInit = function () {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.ADD_FILTER_LABELS = this.labelService.labels['ADD_FILTER'];
        if (this.filter.name) {
            this.headerText = this.ADD_FILTER_LABELS['header_text_2'];
        }
        else {
            this.headerText = this.ADD_FILTER_LABELS['header_text_1'];
        }
    };
    AddFilterPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.initializeSubscriptions();
                return [2 /*return*/];
            });
        });
    };
    AddFilterPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    AddFilterPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('filters:filterSaved', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert("Filter saved successfully !");
        });
    };
    AddFilterPage.prototype.toggleActive = function () {
        this.filter.active = !this.filter.active;
    };
    AddFilterPage.prototype.addFilter = function () {
        this.filter.values.push(this.value.toLowerCase());
        this.value = null;
    };
    AddFilterPage.prototype.removeFilter = function (i) {
        this.filter.values.splice(i, 1);
    };
    AddFilterPage.prototype.presentLoading = function (duration, msg) {
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
    AddFilterPage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: [{
                                    text: this.SHARED_LABELS['ok'],
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
    AddFilterPage.prototype.saveFilter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.filter.name) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.presentAlert('Please add filter name')];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!!this.filter.values.length) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.presentAlert('Please fill filter values correctly')];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        this.filter.name = this.filter.name.toLowerCase();
                        return [4 /*yield*/, this.presentLoading(5000, this.SHARED_LABELS['please_wait'])];
                    case 5:
                        _a.sent();
                        this.events.publish('filters:saveFilter', this.filter);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AddFilterPage.prototype.getLinkedLength = function (type) {
        return this.filter[type].length;
    };
    AddFilterPage.prototype.onClickAdd = function (type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _select_categories_select_categories_page__WEBPACK_IMPORTED_MODULE_5__["SelectCategoriesPage"],
                            componentProps: { type: type, linkedList: this.filter[type] }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (res) {
                            if (res.data && res.data.list.length) {
                                var linkedList_1 = [];
                                res.data.list.forEach(function (parent) {
                                    if (parent.active) {
                                        linkedList_1.push(parent.id);
                                        if (parent.sublist.length) {
                                            parent.sublist.forEach(function (child) {
                                                if (child.active) {
                                                    linkedList_1.push(child.id);
                                                }
                                            });
                                        }
                                    }
                                });
                                console.log('linkedList', linkedList_1);
                                _this.filter[type] = linkedList_1;
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddFilterPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('filters:filterSaved');
    };
    AddFilterPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] }
    ]; };
    AddFilterPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-filter',
            template: __webpack_require__(/*! raw-loader!./add-filter.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/filter-settings/add-filter/add-filter.page.html"),
            styles: [__webpack_require__(/*! ./add-filter.page.scss */ "./src/app/admin/filter-settings/add-filter/add-filter.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
            src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"]])
    ], AddFilterPage);
    return AddFilterPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-filter-settings-add-filter-add-filter-module-es5.js.map