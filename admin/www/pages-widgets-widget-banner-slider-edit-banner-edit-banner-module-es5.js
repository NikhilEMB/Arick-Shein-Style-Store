(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-widgets-widget-banner-slider-edit-banner-edit-banner-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/widget-banner-slider/edit-banner/edit-banner.page.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/widgets/widget-banner-slider/edit-banner/edit-banner.page.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\" defaultHref=\"homepage-setting\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\" >Banners</ion-title>\r\n  </ion-toolbar>  \r\n  <div class=\"header-cart-btn\">\r\n    \r\n  </div>\r\n</ion-header>\r\n\r\n\r\n  <ion-content>\r\n    <div class=\"main-container\" *ngIf=\"bannerData\">\r\n     <ion-grid>\r\n       <ion-row>\r\n        <ion-col size=\"12\">\r\n          <ion-button (click)=\"saveBanner()\"  shape=\"round\" *ngIf=\"mode == 'new'\">\r\n            Save\r\n          </ion-button>\r\n        </ion-col>\r\n       </ion-row>\r\n     </ion-grid>\r\n     <div class=\"input-wrap\" *ngIf=\"widgetType == 'image-banner' && vendorId == ''\">\r\n        <ion-label>Section Name</ion-label>\r\n        <ion-input class=\"form-input\" [(ngModel)]=\"sectionName\"></ion-input>\r\n        <br>\r\n        <ion-button (click)=\"saveSection()\">save name</ion-button>\r\n    </div>\r\n<div class=\"slides-wrapper\" *ngIf=\"mode == 'edit'\">\r\n  <p style=\"font-size: 15px;font-weight: bold;margin-bottom: 5px;text-align: center;\">App Slides</p>\r\n  <div style=\"display: flex;justify-content: center;\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"addNewSlide('app')\">\r\n      <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n      Add new App Slide\r\n    </ion-button>\r\n  </div>\r\n  <div class=\"list-container\">\r\n  <ion-reorder-group (ionItemReorder)=\"onReorderBanners($event)\" disabled=\"false\" class=\"ion-no-padding\" *ngIf=\"slidesData.length\">\r\n    <ion-item *ngFor=\"let slide of slidesData; let i=index\" lines=\"none\">\r\n      <div style=\"display: flex;justify-content: space-between;width: 60%;align-content: center;align-items: center;margin: auto;\">\r\n      <ion-reorder>\r\n        <div class=\"flat-sort\">\r\n          <i class=\"flaticon-menu\"></i>\r\n        </div>\r\n      </ion-reorder>\r\n      <!-- <ion-spinner *ngIf=\"!slide.image.thumb && !slide.image.org && !slide.image.mob\" name=\"lines-small\"></ion-spinner> -->\r\n      <div *ngIf=\"slide.image\">\r\n        <ion-img *ngIf=\"slide && slide.image.mob\" [src]=\"slide.image.mob\" class=\"previewImg\"></ion-img>\r\n        <ion-img *ngIf=\"slide && !slide.image.mob && slide.image.org\" [src]=\"slide.image.org\" class=\"previewImg\"></ion-img>\r\n        <ion-img *ngIf=\"slide && slide.image.thumb && slide.image.org && !slide.image.mob\" [src]=\"slide.image.thumb\" class=\"previewImg\"></ion-img>\r\n        <ion-img *ngIf=\"slide && !slide.image.thumb && !slide.image.org && !slide.image.mob\" src=\"../../../../../assets/img/img-preloader.png\" class=\"previewImg\"></ion-img>\r\n      </div>\r\n      <p *ngIf=\"slide.link.name!= '' \">{{slide.link.name}}</p>\r\n      <p *ngIf=\"slide.link.name == '' && slide.link.type == 'external'\">External Link</p>\r\n      <p *ngIf=\"slide.link.name == '' && slide.link.type == 'contactUs'\">Contact Us</p>\r\n      <p *ngIf=\"slide.link.name == '' && slide.link.type == 'referEarn'\">Refer & Earn</p>\r\n      <p *ngIf=\"slide.link.name == '' && slide.link.type == 'feedback'\">Feedback</p>\r\n      <p *ngIf=\"slide.link.name == '' && slide.link.type == 'offers'\">Offers</p>\r\n      <p *ngIf=\"slide.link.name == '' && slide.link.type == 'membership'\">Membership</p>\r\n      <p *ngIf=\"slide.link.name == '' && slide.link.type == 'pdf'\">PDF File</p>\r\n      <div>\r\n        <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"editSlide(slide.id, 'app', slide)\">\r\n          <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\"></i>\r\n        </ion-button>\r\n        <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"deleteSlideConfirm(slide.id, i, 'app')\">\r\n          <i class=\"flaticon-null-21\" slot=\"icon-only\"></i>\r\n        </ion-button>\r\n        <ion-toggle [checked]=\"slide.active\" (ionChange)=\"changeSlideStatus($event, slide.id, 'app')\" style=\"margin-bottom: -20px;\"></ion-toggle>\r\n      </div>\r\n      </div>\r\n    </ion-item>\r\n  </ion-reorder-group>\r\n  </div>\r\n  <div class=\"divider\"></div>\r\n  <p style=\"font-size: 15px;font-weight: bold;margin-bottom: 5px;text-align: center;\">Web Slides</p>\r\n  <div style=\"display: flex;justify-content: center;\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"addNewSlide('web')\">\r\n      <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n      Add new Web Slide\r\n    </ion-button>\r\n  </div>\r\n  <div class=\"list-container\">\r\n    <ion-reorder-group (ionItemReorder)=\"onReorderWebBanners($event)\" disabled=\"false\" class=\"ion-no-padding\" *ngIf=\"webSlidesData.length\">\r\n      <ion-item *ngFor=\"let slide of webSlidesData; let i=index\" class=\"ion-no-padding\" lines=\"none\">\r\n        <div style=\"display: flex;justify-content: space-between;width: 60%;align-content: center;align-items: center;margin: auto\">\r\n        <ion-reorder>\r\n          <div class=\"flat-sort\">\r\n            <i class=\"flaticon-menu\"></i>\r\n          </div>\r\n        </ion-reorder>\r\n        <div slot=\"start\" *ngIf=\"slide.image\">\r\n          <ion-img *ngIf=\"slide && slide.image.mob\" [src]=\"slide.image.mob\" class=\"previewImg\"></ion-img>\r\n          <ion-img *ngIf=\"slide && !slide.image.mob && slide.image.org\" [src]=\"slide.image.org\" class=\"previewImg\"></ion-img>\r\n          <ion-img *ngIf=\"slide && slide.image.thumb && slide.image.org && !slide.image.mob\" [src]=\"slide.image.thumb\" class=\"previewImg\"></ion-img>\r\n          <ion-img *ngIf=\"slide && !slide.image.thumb && !slide.image.org && !slide.image.mob\" src=\"../../../../../assets/img/img-preloader.png\" class=\"previewImg\"></ion-img>\r\n        </div>\r\n        <p *ngIf=\"slide.link.name!= '' \">{{slide.link.name}}</p>\r\n      <p *ngIf=\"slide.link.name == '' && slide.link.type == 'external'\">External Link</p>\r\n      <p *ngIf=\"slide.link.name == '' && slide.link.type == 'contactUs'\">Contact Us</p>\r\n      <p *ngIf=\"slide.link.name == '' && slide.link.type == 'referEarn'\">Refer & Earn</p>\r\n      <p *ngIf=\"slide.link.name == '' && slide.link.type == 'feedback'\">Feedback</p>\r\n      <p *ngIf=\"slide.link.name == '' && slide.link.type == 'offers'\">Offers</p>\r\n      <p *ngIf=\"slide.link.name == '' && slide.link.type == 'membership'\">Membership</p>\r\n      <p *ngIf=\"slide.link.name == '' && slide.link.type == 'pdf'\">PDF File</p>\r\n        <div>\r\n          <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"editSlide(slide.id,'web', slide)\">\r\n            <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\"></i>\r\n          </ion-button>\r\n          <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"deleteSlideConfirm(slide.id, i, 'web')\">\r\n            <i class=\"flaticon-null-21\" slot=\"icon-only\"></i>\r\n          </ion-button>\r\n          <ion-toggle [checked]=\"slide.active\" (ionChange)=\"changeSlideStatus($event, slide.id, 'web')\" style=\"margin-bottom: -20px;\"></ion-toggle>\r\n        </div>\r\n        </div>\r\n      </ion-item>\r\n    </ion-reorder-group>\r\n  </div>\r\n</div>\r\n \r\n  </div>\r\n  </ion-content>\r\n  \r\n  <!-- <ion-footer style=\"text-align: center;padding: 1rem;\">\r\n    <ion-button (click)=\"saveSection()\">save banner</ion-button>\r\n  </ion-footer> -->\r\n  \r\n"

/***/ }),

/***/ "./src/app/pages/widgets/widget-banner-slider/edit-banner/edit-banner.module.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/pages/widgets/widget-banner-slider/edit-banner/edit-banner.module.ts ***!
  \**************************************************************************************/
/*! exports provided: EditBannerPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditBannerPageModule", function() { return EditBannerPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _edit_banner_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./edit-banner.page */ "./src/app/pages/widgets/widget-banner-slider/edit-banner/edit-banner.page.ts");







var routes = [
    {
        path: '',
        component: _edit_banner_page__WEBPACK_IMPORTED_MODULE_6__["EditBannerPage"]
    }
];
var EditBannerPageModule = /** @class */ (function () {
    function EditBannerPageModule() {
    }
    EditBannerPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_edit_banner_page__WEBPACK_IMPORTED_MODULE_6__["EditBannerPage"]]
        })
    ], EditBannerPageModule);
    return EditBannerPageModule;
}());



/***/ }),

/***/ "./src/app/pages/widgets/widget-banner-slider/edit-banner/edit-banner.page.scss":
/*!**************************************************************************************!*\
  !*** ./src/app/pages/widgets/widget-banner-slider/edit-banner/edit-banner.page.scss ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".list-header {\n  top: 0;\n}\n\n.list-container {\n  margin-top: 60px;\n}\n\n.add-btn-wrap {\n  text-align: right;\n}\n\n.previewImg {\n  padding: 5px;\n  width: 200px;\n  border-radius: 10px;\n}\n\n.divider {\n  border-bottom: solid 1px var(--ion-color-medium);\n  margin: 26px 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvd2lkZ2V0cy93aWRnZXQtYmFubmVyLXNsaWRlci9lZGl0LWJhbm5lci9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxccGFnZXNcXHdpZGdldHNcXHdpZGdldC1iYW5uZXItc2xpZGVyXFxlZGl0LWJhbm5lclxcZWRpdC1iYW5uZXIucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy93aWRnZXRzL3dpZGdldC1iYW5uZXItc2xpZGVyL2VkaXQtYmFubmVyL2VkaXQtYmFubmVyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLE1BQUE7QUNDSjs7QURFQTtFQUNJLGdCQUFBO0FDQ0o7O0FERUE7RUFDSSxpQkFBQTtBQ0NKOztBREVBO0VBQ0ksWUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtBQ0NKOztBREVBO0VBQ0ksZ0RBQUE7RUFDQSxjQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy93aWRnZXRzL3dpZGdldC1iYW5uZXItc2xpZGVyL2VkaXQtYmFubmVyL2VkaXQtYmFubmVyLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5saXN0LWhlYWRlcntcclxuICAgIHRvcDogMDtcclxufVxyXG5cclxuLmxpc3QtY29udGFpbmVye1xyXG4gICAgbWFyZ2luLXRvcDo2MHB4O1xyXG59XHJcblxyXG4uYWRkLWJ0bi13cmFwe1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbn1cclxuXHJcbi5wcmV2aWV3SW1ne1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgd2lkdGg6IDIwMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweFxyXG59XHJcblxyXG4uZGl2aWRlcntcclxuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICAgIG1hcmdpbjogMjZweCAwO1xyXG4gIH0iLCIubGlzdC1oZWFkZXIge1xuICB0b3A6IDA7XG59XG5cbi5saXN0LWNvbnRhaW5lciB7XG4gIG1hcmdpbi10b3A6IDYwcHg7XG59XG5cbi5hZGQtYnRuLXdyYXAge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cblxuLnByZXZpZXdJbWcge1xuICBwYWRkaW5nOiA1cHg7XG4gIHdpZHRoOiAyMDBweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuLmRpdmlkZXIge1xuICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gIG1hcmdpbjogMjZweCAwO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/pages/widgets/widget-banner-slider/edit-banner/edit-banner.page.ts":
/*!************************************************************************************!*\
  !*** ./src/app/pages/widgets/widget-banner-slider/edit-banner/edit-banner.page.ts ***!
  \************************************************************************************/
/*! exports provided: EditBannerPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditBannerPage", function() { return EditBannerPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_widgets_widgets_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../services/widgets/widgets.service */ "./src/app/services/widgets/widgets.service.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_8__);










var EditBannerPage = /** @class */ (function () {
    function EditBannerPage(events, toastController, router, activatedRoute, loadingController, alertController, widgetsService, angularFirestore, configService) {
        this.events = events;
        this.toastController = toastController;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.widgetsService = widgetsService;
        this.angularFirestore = angularFirestore;
        this.configService = configService;
        this.slidesData = [];
        this.webSlidesData = [];
        this.mode = 'new';
        this.pageId = '';
        this.productId = '';
        this.vendorId = '';
        this.sectionName = '';
    }
    EditBannerPage.prototype.ngOnInit = function () {
    };
    EditBannerPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (params && params.ID) {
                    this.bannerID = params.ID;
                    console.log(this.bannerID);
                    this.events.publish('widgets:getWidgetData', this.bannerID);
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
                if (params && params.type) {
                    this.bannerData = {
                        title: '',
                        type: params.type,
                    };
                    this.widgetType = params.type;
                    this.saveBanner();
                }
                if (params && params.index) {
                    this.sectionIndex = params.index;
                }
                return [2 /*return*/];
            });
        }); });
        this.initializeSubscriptions();
    };
    EditBannerPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    EditBannerPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('widgets:widgetAddedSuccess');
        this.events.unsubscribe('widgets:widgetAddedError');
        this.events.unsubscribe('widgets:widgetUpdateSuccess');
        this.events.unsubscribe('widgets:widgetUpdateError');
        this.events.unsubscribe('widgets:publishWidgetDataSuccess');
        this.events.unsubscribe('widgets:publishgetBannerSlidesSuccess');
        this.events.unsubscribe('widgets:deleteSlideSuccess');
        this.events.unsubscribe('widgets:deleteSlideError');
        this.events.unsubscribe('widgets:slideStatusUpdateSuccess');
        this.events.unsubscribe('widgets:slideStatusUpdateError');
        this.events.unsubscribe('widgets:updateBannerCaraouselPositionSuccess');
    };
    EditBannerPage.prototype.onReorderBanners = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var start, id, end, firstDate, secondDate, changedDate, changedDate, firstDate, secondDate, changedDate, changedDate, draggedItem;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        start = event.detail.from;
                        id = this.slidesData[start].id;
                        end = event.detail.to;
                        // //console.log('end', end);
                        if (start < end && end !== this.slidesData.length - 1) {
                            firstDate = this.slidesData[end].createdAt.toDate().getTime();
                            secondDate = this.slidesData[end + 1].createdAt.toDate().getTime();
                            changedDate = (firstDate + secondDate) / 2;
                            // //console.log('finalDate', new Date(changedDate));
                            this.widgetsService.updateBannerCaraouselPosition(this.bannerID, id, new Date(changedDate), 'app');
                        }
                        // tslint:disable-next-line: one-line
                        else if (start < end && end === this.slidesData.length - 1) {
                            // //console.log('from top to bottom');
                            console.log(this.slidesData[end].createdAt);
                            changedDate = this.slidesData[end].createdAt.toDate().getTime() - 5 * 60000;
                            this.widgetsService.updateBannerCaraouselPosition(this.bannerID, id, new Date(changedDate), 'app');
                        }
                        // tslint:disable-next-line: one-line
                        else if (start > end && end !== 0) {
                            firstDate = this.slidesData[end].createdAt.toDate().getTime();
                            secondDate = this.slidesData[end - 1].createdAt.toDate().getTime();
                            changedDate = (firstDate + secondDate) / 2;
                            // //console.log('finalDate', new Date(changedDate));
                            this.widgetsService.updateBannerCaraouselPosition(this.bannerID, id, new Date(changedDate), 'app');
                        }
                        // tslint:disable-next-line: one-linesortedAt
                        else {
                            changedDate = this.slidesData[end].createdAt.toDate().getTime() + 5 * 60000;
                            this.widgetsService.updateBannerCaraouselPosition(this.bannerID, id, new Date(changedDate), 'app');
                        }
                        draggedItem = this.slidesData.splice(event.detail.from, 1)[0];
                        this.slidesData.splice(event.detail.to, 0, draggedItem);
                        event.detail.complete();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditBannerPage.prototype.onReorderWebBanners = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var start, id, end, firstDate, secondDate, changedDate, changedDate, firstDate, secondDate, changedDate, changedDate, draggedItem;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        start = event.detail.from;
                        id = this.webSlidesData[start].id;
                        end = event.detail.to;
                        if (start < end && end !== this.webSlidesData.length - 1) {
                            firstDate = this.webSlidesData[end].createdAt.toDate().getTime();
                            secondDate = this.webSlidesData[end + 1].createdAt.toDate().getTime();
                            changedDate = (firstDate + secondDate) / 2;
                            // //console.log('finalDate', new Date(changedDate));
                            this.widgetsService.updateBannerCaraouselPosition(this.bannerID, id, new Date(changedDate), 'web');
                        }
                        // tslint:disable-next-line: one-line
                        else if (start < end && end === this.webSlidesData.length - 1) {
                            // //console.log('from top to bottom');
                            console.log(this.webSlidesData[end].createdAt);
                            changedDate = this.webSlidesData[end].createdAt.toDate().getTime() - 5 * 60000;
                            this.widgetsService.updateBannerCaraouselPosition(this.bannerID, id, new Date(changedDate), 'web');
                        }
                        // tslint:disable-next-line: one-line
                        else if (start > end && end !== 0) {
                            firstDate = this.webSlidesData[end].createdAt.toDate().getTime();
                            secondDate = this.webSlidesData[end - 1].createdAt.toDate().getTime();
                            changedDate = (firstDate + secondDate) / 2;
                            // //console.log('finalDate', new Date(changedDate));
                            this.widgetsService.updateBannerCaraouselPosition(this.bannerID, id, new Date(changedDate), 'web');
                        }
                        // tslint:disable-next-line: one-linesortedAt
                        else {
                            changedDate = this.webSlidesData[end].createdAt.toDate().getTime() + 5 * 60000;
                            this.widgetsService.updateBannerCaraouselPosition(this.bannerID, id, new Date(changedDate), 'web');
                        }
                        draggedItem = this.webSlidesData.splice(event.detail.from, 1)[0];
                        this.webSlidesData.splice(event.detail.to, 0, draggedItem);
                        event.detail.complete();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditBannerPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('widgets:widgetAddedSuccess', function (ID) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var sectionRef;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.bannerID = ID;
                        this.widget = {
                            widgetID: this.bannerID,
                            widgetType: this.bannerData.type,
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
                        this.events.publish('widgets:getBannerSlides', this.bannerID);
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        this.presentAlert('Banner added successfuly, please start adding slides');
                        this.mode = 'edit';
                        return [2 /*return*/];
                }
            });
        }); });
        this.events.subscribe('widgets:widgetAddedError', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('Some error occured, please try again');
        });
        this.events.subscribe('widgets:widgetUpdateSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('Banner updated successfuly');
        });
        this.events.subscribe('widgets:widgetUpdateError', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('Some error occured, please try again');
        });
        this.events.subscribe('widgets:publishWidgetDataSuccess', function (data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var sections, sections;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.pageId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.angularFirestore.collection('pages').doc(this.pageId).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])()).toPromise()];
                    case 1:
                        sections = _a.sent();
                        // console.log('sections', sections);      
                        if (sections && sections.sections) {
                            this.sections = sections.sections;
                            if (this.sectionIndex) {
                                this.sectionName = sections.sections[this.sectionIndex].sectionName ? sections.sections[this.sectionIndex].sectionName : "";
                            }
                        }
                        _a.label = 2;
                    case 2:
                        if (!(this.productId != '')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])()).toPromise()];
                    case 3:
                        sections = _a.sent();
                        console.log('sections', sections);
                        if (sections && sections.sections) {
                            this.sections = sections.sections;
                            if (this.sectionIndex) {
                                this.sectionName = sections.sections[this.sectionIndex].sectionName ? sections.sections[this.sectionIndex].sectionName : "";
                            }
                        }
                        _a.label = 4;
                    case 4:
                        this.bannerData = data;
                        this.mode = 'edit';
                        this.events.publish('widgets:getBannerSlides', this.bannerID);
                        this.widgetType = data.type;
                        if (this.widgetType == 'image-banner') {
                            if (this.configService.environment.imageBannerLimit) {
                                this.imageLimit = this.configService.environment.imageBannerLimit;
                                console.log('imageBannerLimit (in) :', this.imageLimit);
                            }
                            else {
                                this.imageLimit = 5;
                                console.log('imageBannerLimit (out) :', this.imageLimit);
                            }
                        }
                        else {
                            this.imageLimit = 10;
                        }
                        console.log(this.imageLimit);
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        this.events.subscribe('widgets:publishgetBannerSlidesSuccess', function (slideData, webSlideData) {
            _this.slidesData = slideData;
            _this.webSlidesData = webSlideData;
            console.log("slidesData:", _this.slidesData, "webSlidesData:", _this.webSlidesData);
        });
        this.events.subscribe('widgets:deleteSlideSuccess', function (type) {
            if (type == 'app') {
                _this.slidesData = _this.slidesData.splice(_this.seletedIndex);
            }
            else {
                _this.webSlidesData = _this.webSlidesData.splice(_this.seletedIndex);
            }
            _this.events.publish('widgets:getWidgetData', _this.bannerID);
            if (_this.loading) {
                _this.loading.dismiss();
            }
        });
        this.events.subscribe('widgets:deleteSlideError', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('Some error occured, please try again');
        });
        this.events.subscribe('widgets:slideStatusUpdateSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('Status changed successfully');
        });
        this.events.subscribe('widgets:slideStatusUpdateError', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('Some error occured, please try again');
        });
        this.events.subscribe('widgets:updateBannerCaraouselPositionSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
        });
    };
    EditBannerPage.prototype.saveBanner = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('banner data', this.bannerID, this.bannerData);
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        if (this.mode == 'new') {
                            this.events.publish('widgets:addWidget', this.bannerData);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EditBannerPage.prototype.addNewSlide = function (type) {
        if (type == 'app') {
            if (this.slidesData.length == this.imageLimit) {
                this.presentAlert("you can add only " + this.imageLimit + " app slides");
            }
            else {
                var navigationExtras = {
                    state: {
                        bannerID: this.bannerID,
                        type: type
                    }
                };
                this.router.navigate(['edit-slide'], navigationExtras);
            }
        }
        if (type == 'web') {
            if (this.webSlidesData.length == this.imageLimit) {
                this.presentAlert("you can add only " + this.imageLimit + " web slides");
            }
            else {
                var navigationExtras = {
                    state: {
                        bannerID: this.bannerID,
                        type: type
                    }
                };
                this.router.navigate(['edit-slide'], navigationExtras);
            }
        }
    };
    EditBannerPage.prototype.editSlide = function (ID, type, data) {
        var navigationExtras = {
            state: {
                bannerID: this.bannerID,
                slideID: ID,
                type: type,
                widgetType: this.widgetType,
                slideData: data
            }
        };
        this.router.navigate(['edit-slide'], navigationExtras);
    };
    EditBannerPage.prototype.deleteSlideConfirm = function (ID, index, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Are you sure you want to delete',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        // //console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Delete',
                                    handler: function () {
                                        _this.deleteSlide(ID, index, type);
                                    }
                                }
                            ]
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
    EditBannerPage.prototype.deleteSlide = function (ID, index, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                console.log(ID);
                this.presentLoading();
                this.events.publish('widgets:deleteSlide', this.bannerID, ID, type);
                this.seletedIndex = index;
                return [2 /*return*/];
            });
        });
    };
    EditBannerPage.prototype.changeSlideStatus = function (event, ID, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var status;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = event.detail.checked;
                        this.events.publish('widgets:changeSlideStatus', this.bannerID, ID, status, type);
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditBannerPage.prototype.saveSection = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var res;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        console.log('pageId', this.pageId, 'sections:', this.sections);
                        if (!this.sectionIndex) return [3 /*break*/, 6];
                        this.sections[this.sectionIndex].sectionName = this.sectionName;
                        if (!(this.productId != '')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.angularFirestore.collection('products').doc(this.productId).collection('sections').doc('productWidgets').update({ 'sections': this.sections })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(this.pageId != '')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.angularFirestore.collection('pages').doc(this.pageId).update({ 'sections': this.sections })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        this.presentAlert('Name Updated Successfully!');
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.widgetsService.addNewBanner(this.sectionName, this.pageId)];
                    case 7:
                        res = _a.sent();
                        if (res) {
                            if (this.loading) {
                                this.loading.dismiss();
                            }
                            this.presentAlert('Name Saved Successfully!');
                        }
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    EditBannerPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait',
                                duration: 2000,
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
    EditBannerPage.prototype.presentToast = function (msg) {
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
    EditBannerPage.prototype.presentAlert = function (msg) {
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
    EditBannerPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _services_widgets_widgets_service__WEBPACK_IMPORTED_MODULE_4__["WidgetsService"] },
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__["AngularFirestore"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__["ConfigService"] }
    ]; };
    EditBannerPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-edit-banner',
            template: __webpack_require__(/*! raw-loader!./edit-banner.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/widget-banner-slider/edit-banner/edit-banner.page.html"),
            styles: [__webpack_require__(/*! ./edit-banner.page.scss */ "./src/app/pages/widgets/widget-banner-slider/edit-banner/edit-banner.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _services_widgets_widgets_service__WEBPACK_IMPORTED_MODULE_4__["WidgetsService"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__["AngularFirestore"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__["ConfigService"]])
    ], EditBannerPage);
    return EditBannerPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-widgets-widget-banner-slider-edit-banner-edit-banner-module-es5.js.map