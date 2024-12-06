(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-widgets-edit-vendors-edit-vendors-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/edit-vendors/edit-vendors.page.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/widgets/edit-vendors/edit-vendors.page.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\" defaultHref=\"homepage-setting\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Edit Vendors</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n\r\n    <ion-col size=\"12\">\r\n      <div class=\"input-wrap\">\r\n        <ion-label>Section Name</ion-label>\r\n        <ion-input class=\"form-input\" [(ngModel)]=\"sectionName\"></ion-input>\r\n      </div>\r\n    </ion-col>\r\n\r\n    <div *ngIf=\"isLoading; else dataLoaded;\" class=\"spinner\">\r\n      <ion-spinner name=\"dots\"></ion-spinner>\r\n    </div>\r\n  \r\n    <ng-template #dataLoaded>\r\n      <div *ngIf=\"!dataList.length\">\r\n        <p class=\"no-data-txt\">No data</p>\r\n      </div>\r\n  \r\n      <div *ngIf=\"dataList.length > 0\">\r\n        <ion-list class=\"s-c-list\" *ngFor=\"let data of dataList; let i=index\">\r\n          <ion-item lines=\"none\" (click)=\"selectParent(i)\">\r\n            <ion-label>{{data.name}}</ion-label>\r\n            <ion-checkbox slot=\"end\" [checked]=\"data.active\"></ion-checkbox>\r\n          </ion-item>\r\n          <hr class=\"line\">\r\n        </ion-list>\r\n      </div>\r\n      <br>\r\n      <ion-button (click)=\"onClickSave()\">\r\n        Save\r\n      </ion-button>\r\n    </ng-template>\r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/pages/widgets/edit-vendors/edit-vendors.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/widgets/edit-vendors/edit-vendors.module.ts ***!
  \*******************************************************************/
/*! exports provided: EditVendorsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditVendorsPageModule", function() { return EditVendorsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _edit_vendors_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./edit-vendors.page */ "./src/app/pages/widgets/edit-vendors/edit-vendors.page.ts");







var routes = [
    {
        path: '',
        component: _edit_vendors_page__WEBPACK_IMPORTED_MODULE_6__["EditVendorsPage"]
    }
];
var EditVendorsPageModule = /** @class */ (function () {
    function EditVendorsPageModule() {
    }
    EditVendorsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_edit_vendors_page__WEBPACK_IMPORTED_MODULE_6__["EditVendorsPage"]]
        })
    ], EditVendorsPageModule);
    return EditVendorsPageModule;
}());



/***/ }),

/***/ "./src/app/pages/widgets/edit-vendors/edit-vendors.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/pages/widgets/edit-vendors/edit-vendors.page.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3dpZGdldHMvZWRpdC12ZW5kb3JzL2VkaXQtdmVuZG9ycy5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/widgets/edit-vendors/edit-vendors.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/widgets/edit-vendors/edit-vendors.page.ts ***!
  \*****************************************************************/
/*! exports provided: EditVendorsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditVendorsPage", function() { return EditVendorsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var src_app_services_filters_filters_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/filters/filters.service */ "./src/app/services/filters/filters.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_services_widgets_widgets_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/widgets/widgets.service */ "./src/app/services/widgets/widgets.service.ts");









var EditVendorsPage = /** @class */ (function () {
    function EditVendorsPage(alertController, events, modalController, labelService, loadingController, filtersService, router, activatedRoute, angularFirestore, widgetService) {
        this.alertController = alertController;
        this.events = events;
        this.modalController = modalController;
        this.labelService = labelService;
        this.loadingController = loadingController;
        this.filtersService = filtersService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.angularFirestore = angularFirestore;
        this.widgetService = widgetService;
        this.addedFilters = {};
        this.dataList = [];
        this.isLoading = true;
        this.type = 'vendors';
        this.linkedList = [];
        this.selectList = [];
        this.pageId = '';
    }
    EditVendorsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (params && params.ID && params.index) {
                    this.vendorWidgetId = params.ID;
                    this.sectionIndex = params.index;
                }
                if (params && params.pageId) {
                    this.pageId = params.pageId;
                }
                return [2 /*return*/];
            });
        }); });
        this.initializeSubscriptions();
    };
    EditVendorsPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    EditVendorsPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('widgets:addCategoriesSuccess');
        this.events.unsubscribe('widgets:publishWidgetDataSuccess');
        this.events.unsubscribe('widgets:categoryUpdateSuccess');
    };
    EditVendorsPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('widgets:addCategoriesSuccess', function () {
            _this.presentAlert('Section created successfully');
            _this.router.navigate(['homepage-setting']);
        });
        this.events.subscribe('widgets:categoryUpdateSuccess', function () {
            _this.presentAlert('Section updated successfully');
            _this.router.navigate(['homepage-setting']);
        });
        this.events.subscribe('widgets:publishWidgetDataSuccess', function (data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var sections;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.angularFirestore.collection('pages').doc(this.pageId).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])()).toPromise()];
                    case 1:
                        sections = _a.sent();
                        if (sections && sections.sections) {
                            this.sections = sections.sections;
                            this.sectionName = sections.sections[this.sectionIndex].sectionName;
                        }
                        this.dataList.forEach(function (element) {
                            if (data.vendorsList.indexOf(element.id) > -1) {
                                element.active = true;
                                _this.selectList.push(element.id);
                            }
                        });
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    EditVendorsPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var dbList;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.SELECT_CATEGORIES_LABELS = this.labelService.labels['SELECT_CATEGORIES'];
                        this.SHARED_LABELS = this.labelService.labels['SHARED'];
                        dbList = [];
                        return [4 /*yield*/, this.widgetService.getAllVendorIds()];
                    case 1:
                        dbList = _a.sent();
                        this.dataList = dbList;
                        this.isLoading = false;
                        if (this.vendorWidgetId) {
                            this.presentLoading();
                            this.events.publish('widgets:getWidgetData', this.vendorWidgetId);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EditVendorsPage.prototype.closeModal = function () {
        this.modalController.dismiss();
    };
    EditVendorsPage.prototype.toggleParentCheck = function (i) {
        this.dataList[i].active = !this.dataList[i].active;
    };
    EditVendorsPage.prototype.selectParent = function (i) {
        this.dataList[i].active = !this.dataList[i].active;
        if ((this.selectList.indexOf(this.dataList[i].id) > -1) == false) {
            this.selectList.push(this.dataList[i].id);
        }
        else if (this.selectList.indexOf(this.dataList[i].id) > -1) {
            this.selectList.splice(this.selectList.indexOf(this.dataList[i].id), 1);
        }
    };
    EditVendorsPage.prototype.onClickSave = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var indexArray, _loop_1, this_1, i, updateResult, updateResult;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.sectionName) return [3 /*break*/, 1];
                        this.presentAlert('Please Fill the name Properly');
                        return [3 /*break*/, 8];
                    case 1:
                        if (!(this.sectionName.length < 5)) return [3 /*break*/, 2];
                        this.presentAlert('Name should be atleast 5 characters');
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(this.selectList.length == 0)) return [3 /*break*/, 3];
                        this.presentAlert('Please select atleast one Vendor!');
                        return [3 /*break*/, 8];
                    case 3:
                        indexArray = [];
                        _loop_1 = function (i) {
                            indexArray.push(this_1.dataList.findIndex(function (ele) { return ele.id == _this.selectList[i]; }));
                        };
                        this_1 = this;
                        for (i = 0; i < this.selectList.length; i++) {
                            _loop_1(i);
                        }
                        this.bubbleSort(indexArray);
                        if (!this.vendorWidgetId) return [3 /*break*/, 6];
                        this.sections[this.sectionIndex].sectionName = this.sectionName;
                        return [4 /*yield*/, this.angularFirestore.collection('pages').doc(this.pageId).update({ 'sections': this.sections })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.widgetService.updateVendors(this.vendorWidgetId, this.selectList)];
                    case 5:
                        updateResult = _a.sent();
                        if (updateResult) {
                            this.presentAlert('Data Saved Successfully!');
                        }
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.widgetService.addVendors(this.selectList, this.sectionName, this.pageId)];
                    case 7:
                        updateResult = _a.sent();
                        if (updateResult) {
                            this.presentAlert('Vendors Add Successfully!');
                        }
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    EditVendorsPage.prototype.bubbleSort = function (arr) {
        var len = arr.length;
        for (var i = len - 1; i >= 0; i--) {
            for (var j = 1; j <= i; j++) {
                if (arr[j - 1] > arr[j]) {
                    var temp = arr[j - 1];
                    arr[j - 1] = arr[j];
                    arr[j] = temp;
                    var temp2 = this.selectList[j - 1];
                    this.selectList[j - 1] = this.selectList[j];
                    this.selectList[j] = temp2;
                }
            }
        }
        return arr;
    };
    EditVendorsPage.prototype.presentAlert = function (msg) {
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
    EditVendorsPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
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
    EditVendorsPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__["LabelService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: src_app_services_filters_filters_service__WEBPACK_IMPORTED_MODULE_4__["FiltersService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__["AngularFirestore"] },
        { type: src_app_services_widgets_widgets_service__WEBPACK_IMPORTED_MODULE_8__["WidgetsService"] }
    ]; };
    EditVendorsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-edit-vendors',
            template: __webpack_require__(/*! raw-loader!./edit-vendors.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/edit-vendors/edit-vendors.page.html"),
            styles: [__webpack_require__(/*! ./edit-vendors.page.scss */ "./src/app/pages/widgets/edit-vendors/edit-vendors.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__["LabelService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            src_app_services_filters_filters_service__WEBPACK_IMPORTED_MODULE_4__["FiltersService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__["AngularFirestore"], src_app_services_widgets_widgets_service__WEBPACK_IMPORTED_MODULE_8__["WidgetsService"]])
    ], EditVendorsPage);
    return EditVendorsPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-widgets-edit-vendors-edit-vendors-module-es5.js.map