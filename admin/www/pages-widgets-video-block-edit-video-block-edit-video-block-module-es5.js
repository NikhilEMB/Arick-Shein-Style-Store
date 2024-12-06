(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-widgets-video-block-edit-video-block-edit-video-block-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/video-block/edit-video-block/edit-video-block.page.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/widgets/video-block/edit-video-block/edit-video-block.page.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"\r\n        defaultHref=\"homepage-setting\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\"\r\n      slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Video Block</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content>\r\n  <div class=\"main-container info-container fixed-height\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Section Name</ion-label>\r\n            <ion-input class=\"form-input\" [(ngModel)]=\"sectionName\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Video ID</ion-label>\r\n            <ion-input class=\"form-input\"\r\n              [(ngModel)]=\"widgetData.videoID\"></ion-input>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <ion-item lines=\"none\">\r\n            <ion-label>Display Type</ion-label>\r\n            <ion-select placeholder=\"Select One\"\r\n              [(ngModel)]=\"widgetData.displayType\"\r\n              interface=\"popover\">\r\n              <ion-select-option value=\"video-left-text-right\"\r\n                [selected]=\"widgetData.displayType == 'video-left-text-right'\">\r\n                Video Left, Text Right</ion-select-option>\r\n              <ion-select-option value=\"video-right-text-left\"\r\n                [selected]=\"widgetData.displayType == 'video-right-text-left'\">\r\n                Video Right, Text Left</ion-select-option>\r\n            </ion-select>\r\n          </ion-item>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <div class=\"input-wrap\">\r\n            <ion-label>Video Text</ion-label>\r\n            <ckeditor [(ngModel)]=\"widgetData.description\"\r\n              [config]=\"ckeConfig\"></ckeditor>\r\n          </div>\r\n        </ion-col>\r\n\r\n\r\n        <ion-col size=\"12\">\r\n          <div class=\"flex-space-between\">\r\n            <div>\r\n              <ion-label>Cover Image</ion-label>\r\n            </div>\r\n            <div class=\"upload-btn-wrapper\"\r\n              *ngIf=\"!widgetData.coverImage.org\">\r\n              <button class=\"upload-btn btn-1 i-start\"\r\n                (click)=\"uploadImage($event.target.files)\"> <i\r\n                  class=\"flaticon-null-16\"></i>Upload Cover Image</button>\r\n              <!-- <input type=\"file\" name=\"myfile\" (change)=\"uploadImage($event.target.files)\" accept=\"image/*\" /> -->\r\n            </div>\r\n          </div>\r\n          <div class=\"img-container\">\r\n            <div class=\"no-img\"\r\n              *ngIf=\"!widgetData.coverImage.org\">\r\n              <p>No attached image</p>\r\n            </div>\r\n            <div *ngIf=\"widgetData.coverImage.org\">\r\n              <div class=\"img-wrap\">\r\n                <img class=\"category-img\"\r\n                  [src]=\"widgetData.coverImage.org\"\r\n                  (click)=\"imgZoom(widgetData.coverImage.org)\" />\r\n                <div class=\"overlay\">\r\n                  <ion-button class=\"btn-2 remove\"\r\n                    shape=\"round\"\r\n                    fill=\"clear\"\r\n                    color=\"danger\"\r\n                    (click)=\"removeImage()\">\r\n                    <ion-icon name=\"trash\"\r\n                      slot=\"icon-only\"></ion-icon>\r\n                  </ion-button>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>\r\n\r\n\r\n<ion-footer no-border\r\n  class=\"page-footer\">\r\n  <div class=\"main-container\">\r\n\r\n    <ion-button (click)=\"addwidgetData()\"\r\n      shape=\"round\"\r\n      class=\"btn-1 i-start\"\r\n      color=\"success\"\r\n      *ngIf=\"!widgetID\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save\r\n    </ion-button>\r\n\r\n    <ion-button (click)=\"updatewidgetData()\"\r\n      shape=\"round\"\r\n      class=\"btn-1 i-start\"\r\n      color=\"success\"\r\n      *ngIf=\"widgetID\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Update\r\n    </ion-button>\r\n\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/pages/widgets/video-block/edit-video-block/edit-video-block.module.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/pages/widgets/video-block/edit-video-block/edit-video-block.module.ts ***!
  \***************************************************************************************/
/*! exports provided: EditVideoBlockPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditVideoBlockPageModule", function() { return EditVideoBlockPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _edit_video_block_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./edit-video-block.page */ "./src/app/pages/widgets/video-block/edit-video-block/edit-video-block.page.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");









var routes = [
    {
        path: '',
        component: _edit_video_block_page__WEBPACK_IMPORTED_MODULE_7__["EditVideoBlockPage"]
    }
];
var EditVideoBlockPageModule = /** @class */ (function () {
    function EditVideoBlockPageModule() {
    }
    EditVideoBlockPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateModule"],
                ng2_ckeditor__WEBPACK_IMPORTED_MODULE_5__["CKEditorModule"]
            ],
            declarations: [_edit_video_block_page__WEBPACK_IMPORTED_MODULE_7__["EditVideoBlockPage"]]
        })
    ], EditVideoBlockPageModule);
    return EditVideoBlockPageModule;
}());



/***/ }),

/***/ "./src/app/pages/widgets/video-block/edit-video-block/edit-video-block.page.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/pages/widgets/video-block/edit-video-block/edit-video-block.page.scss ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3dpZGdldHMvdmlkZW8tYmxvY2svZWRpdC12aWRlby1ibG9jay9lZGl0LXZpZGVvLWJsb2NrLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/widgets/video-block/edit-video-block/edit-video-block.page.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/pages/widgets/video-block/edit-video-block/edit-video-block.page.ts ***!
  \*************************************************************************************/
/*! exports provided: EditVideoBlockPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditVideoBlockPage", function() { return EditVideoBlockPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/components/image-editor/image-editor.component */ "./src/app/components/image-editor/image-editor.component.ts");











var EditVideoBlockPage = /** @class */ (function () {
    function EditVideoBlockPage(sharedService, events, activatedRoute, modalController, angularFirestore, _location) {
        this.sharedService = sharedService;
        this.events = events;
        this.activatedRoute = activatedRoute;
        this.modalController = modalController;
        this.angularFirestore = angularFirestore;
        this._location = _location;
        this.headerText = '';
        this.widgetData = {
            videoID: '',
            title: '',
            description: '',
            displayType: 'video-left-text-right',
            type: 'video-block',
            coverImage: {
                url: ''
            },
        };
        this.ckeConfig = {
            allowedContent: true,
            height: 300
        };
        this.pageId = '';
        this.productId = '';
        this.vendorId = '';
        this.sectionName = '';
    }
    EditVideoBlockPage.prototype.ngOnInit = function () { };
    EditVideoBlockPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (params && params.ID) {
                    this.widgetID = params.ID;
                    console.log(this.widgetID);
                    this.events.publish('widgets:getWidgetData', this.widgetID);
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
                if (params && params.index) {
                    this.sectionIndex = params.index;
                }
                return [2 /*return*/];
            });
        }); });
        this.initializeSubscriptions();
    };
    EditVideoBlockPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    EditVideoBlockPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('widgets:addVideoBlockSuccess');
        this.events.unsubscribe('widgets:publishWidgetDataSuccess');
        this.events.unsubscribe('widgets:updateVideoBlockSuccess');
    };
    EditVideoBlockPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('widgets:addVideoBlockSuccess', function (id) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var sectionRef;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        this.widgetID = id;
                        this.widget = {
                            widgetID: this.widgetID,
                            widgetType: 'video-block',
                            location: "all",
                            sectionName: this.sectionName
                        };
                        if (!(this.pageId != '')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.angularFirestore.collection('pages').doc(this.pageId).update({ sections: firebase__WEBPACK_IMPORTED_MODULE_8__["firestore"].FieldValue.arrayUnion(this.widget) })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 2:
                        if (!(this.productId != '')) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets')];
                    case 3:
                        sectionRef = _a.sent();
                        return [4 /*yield*/, sectionRef.valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])()).toPromise()];
                    case 4:
                        if (!!(_a.sent())) return [3 /*break*/, 6];
                        return [4 /*yield*/, sectionRef.set({ sections: firebase__WEBPACK_IMPORTED_MODULE_8__["firestore"].FieldValue.arrayUnion(this.widget) })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, sectionRef.update({ sections: firebase__WEBPACK_IMPORTED_MODULE_8__["firestore"].FieldValue.arrayUnion(this.widget) })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        if (!(this.vendorId != '')) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.angularFirestore.collection('features').doc('multiVendor').collection('vendors').doc(this.vendorId).update({ sections: firebase__WEBPACK_IMPORTED_MODULE_8__["firestore"].FieldValue.arrayUnion(this.widget) })];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        this.sharedService.presentAlert('Saved successfully, image uploaded will updated shortly');
                        this._location.back();
                        return [2 /*return*/];
                }
            });
        }); });
        this.events.subscribe('widgets:addVideoBlockError', function (id) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.sharedService.presentAlert('Some error occured, please try again');
        });
        this.events.subscribe('widgets:updateVideoBlockSuccess', function (id) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        if (!this.sectionIndex) return [3 /*break*/, 2];
                        this.sections[this.sectionIndex].sectionName = this.sectionName;
                        // console.log(this.sections,this.pageId);
                        return [4 /*yield*/, this.angularFirestore.collection('pages').doc(this.pageId).update({ 'sections': this.sections })];
                    case 1:
                        // console.log(this.sections,this.pageId);
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.sharedService.presentAlert('Updated successfully, image uploaded will updated shortly');
                        return [2 /*return*/];
                }
            });
        }); });
        this.events.subscribe('widgets:updateVideoBlockError', function (id) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.sharedService.presentAlert('Some error occured, please try again');
        });
        this.events.subscribe('widgets:publishWidgetDataSuccess', function (data) {
            if (data) {
                _this.widgetData = data;
                console.log(_this.widgetData);
            }
        });
        this.getSections();
    };
    EditVideoBlockPage.prototype.getSections = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var res;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.angularFirestore.collection('pages').doc(this.pageId).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])()).toPromise()];
                    case 1:
                        res = _a.sent();
                        // console.log('sections', res);
                        if (res && res.sections) {
                            this.sections = res.sections;
                            if (this.sectionIndex) {
                                this.sectionName = res.sections[this.sectionIndex].sectionName ? res.sections[this.sectionIndex].sectionName : "";
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EditVideoBlockPage.prototype.removeImage = function () {
        this.widgetData.coverImage.org = '';
    };
    EditVideoBlockPage.prototype.imgZoom = function (img) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_3__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: [{ url: img }],
                index: 0
            }
        }).then(function (modal) { return modal.present(); });
    };
    EditVideoBlockPage.prototype.addwidgetData = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.widgetData.coverImage.org) return [3 /*break*/, 1];
                        this.sharedService.presentAlert('Please add cover image');
                        return [3 /*break*/, 4];
                    case 1:
                        if (!!this.widgetData.videoID) return [3 /*break*/, 2];
                        this.sharedService.presentAlert('Please add video ID');
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 3:
                        _a.sent();
                        this.events.publish('widgets:addVideoBlock', this.widgetData);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EditVideoBlockPage.prototype.updatewidgetData = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.widgetData.coverImage.org) return [3 /*break*/, 1];
                        this.sharedService.presentAlert('Please add cover image');
                        return [3 /*break*/, 4];
                    case 1:
                        if (!!this.widgetData.videoID) return [3 /*break*/, 2];
                        this.sharedService.presentAlert('Please add video ID');
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 3:
                        _a.sent();
                        this.events.publish('widgets:updateVideoBlock', this.widgetData, this.widgetID);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EditVideoBlockPage.prototype.uploadImage = function (files) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_10__["ImageEditorComponent"],
                            cssClass: 'custom-img-editor',
                            componentProps: {
                                aspectRatioWidthVal: 1,
                                aspectRatioHeightVal: 1,
                            },
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        modal.onDidDismiss().then(function (res) {
                            _this.widgetData.coverImage.org = res.data || '';
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    EditVideoBlockPage.ctorParameters = function () { return [
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__["AngularFirestore"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_9__["Location"] }
    ]; };
    EditVideoBlockPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-edit-video-block',
            template: __webpack_require__(/*! raw-loader!./edit-video-block.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/video-block/edit-video-block/edit-video-block.page.html"),
            styles: [__webpack_require__(/*! ./edit-video-block.page.scss */ "./src/app/pages/widgets/video-block/edit-video-block/edit-video-block.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__["AngularFirestore"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["Location"]])
    ], EditVideoBlockPage);
    return EditVideoBlockPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-widgets-video-block-edit-video-block-edit-video-block-module-es5.js.map