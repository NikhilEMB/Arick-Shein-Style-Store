(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-widgets-edit-categories-edit-categories-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/edit-categories/edit-categories.page.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/widgets/edit-categories/edit-categories.page.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\" defaultHref=\"homepage-setting\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Edit Categories</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n\r\n    <ion-col size=\"12\">\r\n      <div class=\"input-wrap\">\r\n        <ion-label>Section Name</ion-label>\r\n        <ion-input class=\"form-input\" [(ngModel)]=\"sectionName\"></ion-input>\r\n      </div>\r\n    </ion-col>\r\n\r\n    <div *ngIf=\"isLoading; else dataLoaded;\" class=\"spinner\">\r\n      <ion-spinner name=\"dots\"></ion-spinner>\r\n    </div>\r\n  \r\n    <ng-template #dataLoaded>\r\n      <ion-grid>\r\n        <ion-row>\r\n          <ion-col size=\"4\">\r\n            <div class=\"input-wrap\">\r\n              <label>Design Type</label>&nbsp;<br>\r\n              <select [(ngModel)]=\"designType\">\r\n                <option value=\"normal\">normal</option>\r\n                <option value=\"combo\">combo</option>\r\n              </select>\r\n            </div>\r\n          </ion-col>\r\n          <ion-col size=\"4\" *ngIf=\"designType === 'combo'\">\r\n            <div class=\"input-wrap\">\r\n              <label>End At</label><br>\r\n              <ion-input type=\"datetime-local\" [(ngModel)]=\"endAt\" [min]=\"todaysDateTime\"></ion-input>\r\n            </div>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n\r\n      <div *ngIf=\"!dataList.length\">\r\n        <p class=\"no-data-txt\">No data</p>\r\n      </div>\r\n  \r\n      <div *ngIf=\"dataList.length > 0\">\r\n        <ion-list class=\"s-c-list\" *ngFor=\"let data of dataList; let i=index\">\r\n          <ion-item lines=\"none\" (click)=\"selectParent(i)\">\r\n            <ion-label>{{data.name}}</ion-label>\r\n            <ion-checkbox slot=\"end\" [checked]=\"data.active\"></ion-checkbox>\r\n          </ion-item>\r\n          <hr class=\"line\">\r\n        </ion-list>\r\n      </div>\r\n      <ion-button (click)=\"onClickSave()\">\r\n        Save\r\n      </ion-button>\r\n    </ng-template>\r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/pages/widgets/edit-categories/edit-categories.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/pages/widgets/edit-categories/edit-categories.module.ts ***!
  \*************************************************************************/
/*! exports provided: EditCategoriesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditCategoriesPageModule", function() { return EditCategoriesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _edit_categories_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./edit-categories.page */ "./src/app/pages/widgets/edit-categories/edit-categories.page.ts");







var routes = [
    {
        path: '',
        component: _edit_categories_page__WEBPACK_IMPORTED_MODULE_6__["EditCategoriesPage"]
    }
];
var EditCategoriesPageModule = /** @class */ (function () {
    function EditCategoriesPageModule() {
    }
    EditCategoriesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_edit_categories_page__WEBPACK_IMPORTED_MODULE_6__["EditCategoriesPage"]]
        })
    ], EditCategoriesPageModule);
    return EditCategoriesPageModule;
}());



/***/ }),

/***/ "./src/app/pages/widgets/edit-categories/edit-categories.page.scss":
/*!*************************************************************************!*\
  !*** ./src/app/pages/widgets/edit-categories/edit-categories.page.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3dpZGdldHMvZWRpdC1jYXRlZ29yaWVzL2VkaXQtY2F0ZWdvcmllcy5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/widgets/edit-categories/edit-categories.page.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/widgets/edit-categories/edit-categories.page.ts ***!
  \***********************************************************************/
/*! exports provided: EditCategoriesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditCategoriesPage", function() { return EditCategoriesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var src_app_services_filters_filters_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/filters/filters.service */ "./src/app/services/filters/filters.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);









var EditCategoriesPage = /** @class */ (function () {
    function EditCategoriesPage(alertController, events, modalController, labelService, loadingController, filtersService, router, activatedRoute, angularFirestore) {
        this.alertController = alertController;
        this.events = events;
        this.modalController = modalController;
        this.labelService = labelService;
        this.loadingController = loadingController;
        this.filtersService = filtersService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.angularFirestore = angularFirestore;
        this.addedFilters = {};
        this.dataList = [];
        this.isLoading = true;
        this.type = 'categories';
        this.linkedList = [];
        this.selectList = [];
        this.pageId = '';
        this.designType = "normal";
        this.todaysDateTime = moment__WEBPACK_IMPORTED_MODULE_8__(new Date()).format('YYYY-MM-DDTHH:mm');
        this.endAt = null;
    }
    EditCategoriesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (params && params.ID && params.index) {
                    this.categoryId = params.ID;
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
    EditCategoriesPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    EditCategoriesPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('widgets:addCategoriesSuccess');
        this.events.unsubscribe('widgets:publishWidgetDataSuccess');
        this.events.unsubscribe('widgets:categoryUpdateSuccess');
    };
    EditCategoriesPage.prototype.initializeSubscriptions = function () {
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
                            if (data.categoryList.indexOf(element.id) > -1) {
                                element.active = true;
                                _this.selectList.push(element.id);
                            }
                        });
                        this.designType = 'designType' in data ? data.designType : this.designType;
                        this.endAt = 'endAt' in data ? data.endAt : this.endAt;
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    EditCategoriesPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var dbList;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.SELECT_CATEGORIES_LABELS = this.labelService.labels['SELECT_CATEGORIES'];
                        this.SHARED_LABELS = this.labelService.labels['SHARED'];
                        dbList = [];
                        if (!(this.type === 'categories')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.filtersService.getCategoriesWithSubcategories()];
                    case 1:
                        dbList = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(this.type === 'brands')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.filtersService.getBrands()];
                    case 3:
                        dbList = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (this.linkedList.length) {
                            dbList.map(function (parent) {
                                if (_this.linkedList.includes(parent.id)) {
                                    parent.active = true;
                                }
                                if (parent.sublist.length) {
                                    parent.sublist.map(function (child) {
                                        if (_this.linkedList.includes(child.id)) {
                                            child.active = true;
                                        }
                                    });
                                }
                            });
                        }
                        this.dataList = dbList;
                        this.isLoading = false;
                        if (this.categoryId) {
                            this.presentLoading();
                            this.events.publish('widgets:getWidgetData', this.categoryId);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EditCategoriesPage.prototype.closeModal = function () {
        this.modalController.dismiss();
    };
    EditCategoriesPage.prototype.toggleParentCheck = function (i) {
        this.dataList[i].active = !this.dataList[i].active;
    };
    EditCategoriesPage.prototype.selectParent = function (i) {
        this.dataList[i].active = !this.dataList[i].active;
        if ((this.selectList.indexOf(this.dataList[i].id) > -1) == false) {
            this.selectList.push(this.dataList[i].id);
        }
        else if (this.selectList.indexOf(this.dataList[i].id) > -1) {
            this.selectList.splice(this.selectList.indexOf(this.dataList[i].id), 1);
        }
    };
    EditCategoriesPage.prototype.onClickSave = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var indexArray, _loop_1, this_1, i;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.sectionName) return [3 /*break*/, 1];
                        this.presentAlert('Please Fill the name Properly');
                        return [3 /*break*/, 6];
                    case 1:
                        if (!(this.sectionName.length < 5)) return [3 /*break*/, 2];
                        this.presentAlert('Name should be atleast 5 characters');
                        return [3 /*break*/, 6];
                    case 2:
                        indexArray = [];
                        _loop_1 = function (i) {
                            indexArray.push(this_1.dataList.findIndex(function (ele) { return ele.id == _this.selectList[i]; }));
                        };
                        this_1 = this;
                        for (i = 0; i < this.selectList.length; i++) {
                            _loop_1(i);
                        }
                        this.bubbleSort(indexArray);
                        if (!this.categoryId) return [3 /*break*/, 5];
                        this.sections[this.sectionIndex].sectionName = this.sectionName;
                        this.sections[this.sectionIndex]['designType'] = this.designType;
                        if (this.designType === 'normal')
                            this.endAt = null;
                        this.sections[this.sectionIndex]['endAt'] = this.endAt;
                        return [4 /*yield*/, this.angularFirestore.collection('pages').doc(this.pageId).update({ 'sections': this.sections })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.angularFirestore.collection('widgets').doc(this.categoryId).update({
                                'designType': this.designType,
                                'endAt': this.endAt
                            })];
                    case 4:
                        _a.sent();
                        this.events.publish('widgets:updateCategories', this.categoryId, this.selectList);
                        return [3 /*break*/, 6];
                    case 5:
                        this.events.publish('widgets:addCategories', this.selectList, this.sectionName, this.pageId);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EditCategoriesPage.prototype.bubbleSort = function (arr) {
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
    EditCategoriesPage.prototype.presentAlert = function (msg) {
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
    EditCategoriesPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
                                duration: 10000
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
    EditCategoriesPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__["LabelService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: src_app_services_filters_filters_service__WEBPACK_IMPORTED_MODULE_4__["FiltersService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__["AngularFirestore"] }
    ]; };
    EditCategoriesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-edit-categories',
            template: __webpack_require__(/*! raw-loader!./edit-categories.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/edit-categories/edit-categories.page.html"),
            styles: [__webpack_require__(/*! ./edit-categories.page.scss */ "./src/app/pages/widgets/edit-categories/edit-categories.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__["LabelService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            src_app_services_filters_filters_service__WEBPACK_IMPORTED_MODULE_4__["FiltersService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__["AngularFirestore"]])
    ], EditCategoriesPage);
    return EditCategoriesPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-widgets-edit-categories-edit-categories-module-es5.js.map