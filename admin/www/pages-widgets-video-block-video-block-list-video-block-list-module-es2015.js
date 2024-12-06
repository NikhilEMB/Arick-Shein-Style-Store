(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-widgets-video-block-video-block-list-video-block-list-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/video-block/video-block-list/video-block-list.page.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/widgets/video-block/video-block-list/video-block-list.page.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\" defaultHref=\"homepage-setting\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">Video Blocks</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"addNewVideoBlock()\">\r\n      <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n      Add new\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n  <div *ngIf=\"showLoader; else showData\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n\r\n  <ng-template #showData>\r\n    <ng-container *ngIf=\"noWidgets; else showWidgets\">\r\n         No Data Avilable\r\n    </ng-container>\r\n    <ng-template #showWidgets>\r\n      <ion-list class=\"widget-list\">\r\n        <ion-item *ngFor=\"let item of widgetList; let i=index\" >\r\n          <ion-label>{{item.title}}</ion-label>\r\n          <i class=\"flaticon-null-21\" slot=\"end\" (click)=\"deleteWidgetConfirm(item.id)\"></i>\r\n          <i class=\"flaticon-pencil-edit-button\" slot=\"end\" (click)=\"editWidget(item.id)\"></i>\r\n        </ion-item>\r\n      </ion-list>\r\n    </ng-template>\r\n  </ng-template>\r\n</div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/widgets/video-block/video-block-list/video-block-list.module.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/pages/widgets/video-block/video-block-list/video-block-list.module.ts ***!
  \***************************************************************************************/
/*! exports provided: VideoBlockListPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoBlockListPageModule", function() { return VideoBlockListPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _video_block_list_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./video-block-list.page */ "./src/app/pages/widgets/video-block/video-block-list/video-block-list.page.ts");







const routes = [
    {
        path: '',
        component: _video_block_list_page__WEBPACK_IMPORTED_MODULE_6__["VideoBlockListPage"]
    }
];
let VideoBlockListPageModule = class VideoBlockListPageModule {
};
VideoBlockListPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_video_block_list_page__WEBPACK_IMPORTED_MODULE_6__["VideoBlockListPage"]]
    })
], VideoBlockListPageModule);



/***/ }),

/***/ "./src/app/pages/widgets/video-block/video-block-list/video-block-list.page.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/pages/widgets/video-block/video-block-list/video-block-list.page.scss ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3dpZGdldHMvdmlkZW8tYmxvY2svdmlkZW8tYmxvY2stbGlzdC92aWRlby1ibG9jay1saXN0LnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/widgets/video-block/video-block-list/video-block-list.page.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/pages/widgets/video-block/video-block-list/video-block-list.page.ts ***!
  \*************************************************************************************/
/*! exports provided: VideoBlockListPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoBlockListPage", function() { return VideoBlockListPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");





let VideoBlockListPage = class VideoBlockListPage {
    constructor(events, sharedService, alertController, router) {
        this.events = events;
        this.sharedService = sharedService;
        this.alertController = alertController;
        this.router = router;
        this.showLoader = true;
    }
    ngOnInit() { }
    ionViewWillEnter() {
        this.initializeSubscriptions();
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    removeSubscriptions() {
        this.events.unsubscribe('widgets:publishWidgetsListSuccess');
        this.events.unsubscribe('widgets:deleteWidgetSuccess');
    }
    initializeSubscriptions() {
        this.events.subscribe('widgets:publishWidgetsListSuccess', (widgetList) => {
            this.showLoader = false;
            console.log(widgetList);
            if (widgetList.length) {
                this.widgetList = widgetList;
                this.noWidgets = false;
            }
            else {
                this.noWidgets = true;
            }
        });
        this.events.subscribe('widgets:deleteWidgetSuccess', () => {
            if (this.sharedService.loading) {
                this.sharedService.loading.dismiss();
            }
        });
        this.events.publish('widgets:getWidgetsList', 'video-block');
    }
    addNewVideoBlock() {
        this.router.navigate(['edit-video-block']);
    }
    editWidget(ID) {
        const navigationExtras = {
            queryParams: {
                ID: ID,
            }
        };
        this.router.navigate(['edit-video-block'], navigationExtras);
    }
    deleteWidgetConfirm(id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Are you sure you want to delete',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            // //console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Delete',
                        handler: () => {
                            this.deleteWidget(id);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    deleteWidget(ID) {
        this.events.publish('widgets:deleteWidget', ID);
        this.sharedService.presentLoading();
    }
};
VideoBlockListPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
VideoBlockListPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-video-block-list',
        template: __webpack_require__(/*! raw-loader!./video-block-list.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/widgets/video-block/video-block-list/video-block-list.page.html"),
        styles: [__webpack_require__(/*! ./video-block-list.page.scss */ "./src/app/pages/widgets/video-block/video-block-list/video-block-list.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
], VideoBlockListPage);



/***/ })

}]);
//# sourceMappingURL=pages-widgets-video-block-video-block-list-video-block-list-module-es2015.js.map