(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-widgets-text-block-edit-text-block-edit-text-block-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/text-block/edit-text-block/edit-text-block.page.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/widgets/text-block/edit-text-block/edit-text-block.page.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\" defaultHref=\"homepage-setting\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Text Block</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content>\r\n  <div class=\"main-container info-container fixed-height\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Section Name</ion-label>\r\n            <ion-input class=\"form-input\" [(ngModel)]=\"sectionName\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        \r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Description</ion-label>\r\n            <ckeditor [(ngModel)]=\"widgetData.description\" [config]=\"ckeConfig\"></ckeditor>\r\n          </div>\r\n        </ion-col>\r\n\r\n        </ion-row>\r\n        </ion-grid>\r\n      </div>\r\n</ion-content>\r\n\r\n\r\n<ion-footer  no-border class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n\r\n      <ion-button (click)=\"addwidgetData()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\" *ngIf=\"!widgetID\">\r\n        <i class=\"flaticon-null-20 margin-icon\"></i>\r\n        Save\r\n      </ion-button>\r\n\r\n      <ion-button (click)=\"updatewidgetData()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\" *ngIf=\"widgetID\">\r\n        <i class=\"flaticon-null-20 margin-icon\"></i>\r\n        Update\r\n      </ion-button>\r\n    \r\n    </div>\r\n    </ion-footer>\r\n"

/***/ }),

/***/ "./src/app/pages/widgets/text-block/edit-text-block/edit-text-block.module.ts":
/*!************************************************************************************!*\
  !*** ./src/app/pages/widgets/text-block/edit-text-block/edit-text-block.module.ts ***!
  \************************************************************************************/
/*! exports provided: EditTextBlockPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditTextBlockPageModule", function() { return EditTextBlockPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _edit_text_block_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./edit-text-block.page */ "./src/app/pages/widgets/text-block/edit-text-block/edit-text-block.page.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");








var routes = [
    {
        path: '',
        component: _edit_text_block_page__WEBPACK_IMPORTED_MODULE_6__["EditTextBlockPage"]
    }
];
var EditTextBlockPageModule = /** @class */ (function () {
    function EditTextBlockPageModule() {
    }
    EditTextBlockPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                ng2_ckeditor__WEBPACK_IMPORTED_MODULE_7__["CKEditorModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_edit_text_block_page__WEBPACK_IMPORTED_MODULE_6__["EditTextBlockPage"]]
        })
    ], EditTextBlockPageModule);
    return EditTextBlockPageModule;
}());



/***/ }),

/***/ "./src/app/pages/widgets/text-block/edit-text-block/edit-text-block.page.scss":
/*!************************************************************************************!*\
  !*** ./src/app/pages/widgets/text-block/edit-text-block/edit-text-block.page.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3dpZGdldHMvdGV4dC1ibG9jay9lZGl0LXRleHQtYmxvY2svZWRpdC10ZXh0LWJsb2NrLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/widgets/text-block/edit-text-block/edit-text-block.page.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/pages/widgets/text-block/edit-text-block/edit-text-block.page.ts ***!
  \**********************************************************************************/
/*! exports provided: EditTextBlockPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditTextBlockPage", function() { return EditTextBlockPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");









var EditTextBlockPage = /** @class */ (function () {
    function EditTextBlockPage(sharedService, events, activatedRoute, modalController, router, angularFirestore, loadingController, _location) {
        this.sharedService = sharedService;
        this.events = events;
        this.activatedRoute = activatedRoute;
        this.modalController = modalController;
        this.router = router;
        this.angularFirestore = angularFirestore;
        this.loadingController = loadingController;
        this._location = _location;
        this.headerText = '';
        this.widgetData = {
            title: '',
            description: '',
            type: 'text-block'
        };
        this.webSections = [];
        this.ckeConfig = {
            allowedContent: true,
            height: 300
        };
        this.pageId = '';
        this.productId = '';
        this.vendorId = '';
    }
    EditTextBlockPage.prototype.ngOnInit = function () { };
    EditTextBlockPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (params && params.ID) {
                    this.widgetID = params.ID;
                    console.log(this.widgetID);
                    this.events.publish('widgets:getWidgetData', this.widgetID);
                }
                if (params && params.index) {
                    this.sectionIndex = params.index;
                }
                if (params && params.pageId) {
                    this.pageId = params.pageId;
                }
                if (params && params.productId) {
                    this.productId = params.productId;
                }
                if (params && params.vendorId) {
                    this.vendorId = params.vendorId;
                }
                return [2 /*return*/];
            });
        }); });
        this.initializeSubscriptions();
    };
    EditTextBlockPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    EditTextBlockPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('widgets:addVideoBlockSucces');
        this.events.unsubscribe('widgets:updateVideoBlockSuccess');
        this.events.unsubscribe('widgets:publishWidgetDataSuccess');
        this.events.unsubscribe('widgets:addVideoBlockError');
        this.events.unsubscribe('widgets:updateVideoBlockError');
        this.events.unsubscribe('widgets:publishWidgetDataError');
        this.events.unsubscribe('widgets:widgetAddedSuccess');
        this.events.unsubscribe('widgets:widgetAddedError');
        this.events.unsubscribe('widgets:updateTextBlockSuccess');
        this.events.unsubscribe('widgets:updateTextBlockError');
    };
    EditTextBlockPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('widgets:widgetAddedSuccess', function (id) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var sectionRef;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.widgetID = id;
                        console.log(this.widgetID);
                        this.widget = {
                            widgetID: this.widgetID,
                            widgetType: 'text-block',
                            sectionName: this.sectionName,
                            location: "all"
                        };
                        if (!(this.pageId != '')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.angularFirestore.collection('pages').doc(this.pageId).update({ sections: firebase__WEBPACK_IMPORTED_MODULE_7__["firestore"].FieldValue.arrayUnion(this.widget) })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 2:
                        if (!(this.productId != '')) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets')];
                    case 3:
                        sectionRef = _a.sent();
                        return [4 /*yield*/, sectionRef.valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).toPromise()];
                    case 4:
                        if (!!(_a.sent())) return [3 /*break*/, 6];
                        return [4 /*yield*/, sectionRef.set({ sections: firebase__WEBPACK_IMPORTED_MODULE_7__["firestore"].FieldValue.arrayUnion(this.widget) })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, sectionRef.update({ sections: firebase__WEBPACK_IMPORTED_MODULE_7__["firestore"].FieldValue.arrayUnion(this.widget) })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        if (!(this.vendorId != '')) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.angularFirestore.collection('features').doc('multiVendor').collection('vendors').doc(this.vendorId).update({ sections: firebase__WEBPACK_IMPORTED_MODULE_7__["firestore"].FieldValue.arrayUnion(this.widget) })];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        this._location.back();
                        return [2 /*return*/];
                }
            });
        }); });
        this.events.subscribe('widgets:widgetAddedError', function (id) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.sharedService.presentAlert('Some error occured, please try again');
        });
        this.events.subscribe('widgets:updateTextBlockSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            //this.widgetID = id;
            _this.sharedService.presentAlert('updated');
        });
        this.events.subscribe('widgets:updateTextBlockError', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            //this.widgetID = id;
            _this.sharedService.presentAlert('Some error occured, please try again');
        });
        this.events.subscribe('widgets:publishWidgetDataSuccess', function (data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var sections;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        if (!data) return [3 /*break*/, 7];
                        sections = void 0;
                        if (!(this.pageId != '')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.angularFirestore.collection('pages').doc(this.pageId).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).toPromise()];
                    case 1:
                        sections = _a.sent();
                        if (sections && sections.sections) {
                            this.webSections = sections.sections;
                            this.sectionName = sections.sections[this.sectionIndex].sectionName;
                        }
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(this.productId != '')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).toPromise()];
                    case 3:
                        sections = _a.sent();
                        if (sections && sections.sections) {
                            this.webSections = sections.sections;
                            this.sectionName = sections.sections[this.sectionIndex].sectionName;
                        }
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(this.vendorId != '')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.angularFirestore.collection('features').doc('multiVendor').collection('vendors').doc(this.vendorId).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).toPromise()];
                    case 5:
                        sections = _a.sent();
                        if (sections && sections.sections) {
                            this.webSections = sections.sections;
                            this.sectionName = sections.sections[this.sectionIndex].sectionName;
                        }
                        _a.label = 6;
                    case 6:
                        this.widgetData = data;
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); });
    };
    EditTextBlockPage.prototype.addwidgetData = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (!this.sectionName) {
                    this.sharedService.presentAlert('Please fill the name properly');
                }
                else if (this.sectionName.length < 5) {
                    this.sharedService.presentAlert('Name should be atleast 5 characters');
                }
                else {
                    this.presentLoading();
                    this.events.publish('widgets:addWidget', this.widgetData);
                }
                return [2 /*return*/];
            });
        });
    };
    EditTextBlockPage.prototype.updatewidgetData = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.sectionName) return [3 /*break*/, 1];
                        this.sharedService.presentAlert('Please fill the name properly');
                        return [3 /*break*/, 11];
                    case 1:
                        if (!(this.sectionName.length < 5)) return [3 /*break*/, 2];
                        this.sharedService.presentAlert('Name should be atleast 5 characters');
                        return [3 /*break*/, 11];
                    case 2:
                        if (!!this.widgetData.description) return [3 /*break*/, 3];
                        this.sharedService.presentAlert('Please add description');
                        return [3 /*break*/, 11];
                    case 3: return [4 /*yield*/, this.presentLoading()];
                    case 4:
                        _a.sent();
                        this.webSections[this.sectionIndex].sectionName = this.sectionName;
                        if (!(this.pageId != '')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.angularFirestore.collection('pages').doc(this.pageId).update({ 'sections': this.webSections })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 6:
                        if (!(this.productId != '')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets').set({ 'sections': this.webSections })];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        if (!(this.vendorId != '')) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.angularFirestore.collection('features').doc('multiVendor').collection('vendors').doc(this.vendorId).update({ 'sections': this.webSections })];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        this.events.publish('widgets:updateTextBlock', this.widgetData, this.widgetID);
                        _a.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    EditTextBlockPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait'
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
    EditTextBlockPage.ctorParameters = function () { return [
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__["AngularFirestore"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_8__["Location"] }
    ]; };
    EditTextBlockPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-edit-text-block',
            template: __webpack_require__(/*! raw-loader!./edit-text-block.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/text-block/edit-text-block/edit-text-block.page.html"),
            styles: [__webpack_require__(/*! ./edit-text-block.page.scss */ "./src/app/pages/widgets/text-block/edit-text-block/edit-text-block.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__["AngularFirestore"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["Location"]])
    ], EditTextBlockPage);
    return EditTextBlockPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-widgets-text-block-edit-text-block-edit-text-block-module-es5.js.map