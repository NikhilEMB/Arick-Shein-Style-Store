(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-all-feedbacks-all-feedbacks-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/all-feedbacks/all-feedbacks.page.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/all-feedbacks/all-feedbacks.page.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\" defaultHref=\"admin-home\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n  <div class=\"spinner\" *ngIf=\"showLoader; else feedbacksLoaded;\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n\r\n  <ng-template #feedbacksLoaded>\r\n    <div class=\"no-data ion-text-center\" *ngIf=\"!feedbacks.length; else feedbacksHasLength;\">\r\n      <img src=\"assets/img/no-category.png\" alt=\"\">\r\n      <h6>No feedbacks</h6>\r\n    </div>\r\n    <ng-template #feedbacksHasLength>\r\n      <div class=\"feedbacks-wrapper\">\r\n        <div class=\"feedbacks-wrap\" *ngFor=\"let feed of feedbacks\">\r\n          <p>{{feed.description}}</p>\r\n          <p><strong>By:</strong>{{feed.userName}}</p>\r\n          <p><strong>Date: </strong>{{feed.createdAt.toDate() | date:'medium'}}</p>\r\n          <div class=\"btn-wrap\">\r\n            <ion-button (click)=\"viewDetails(feed)\" shape=\"round\">\r\n              view details <i class=\"flaticon-null-7\"></i>\r\n            </ion-button>\r\n          </div>\r\n        </div> \r\n      </div>\r\n    </ng-template>\r\n  </ng-template>\r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/all-feedbacks/all-feedbacks.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/admin/all-feedbacks/all-feedbacks.module.ts ***!
  \*************************************************************/
/*! exports provided: AllFeedbacksPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllFeedbacksPageModule", function() { return AllFeedbacksPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _feedback_details_feedback_details_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../feedback-details/feedback-details.page */ "./src/app/admin/feedback-details/feedback-details.page.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _all_feedbacks_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./all-feedbacks.page */ "./src/app/admin/all-feedbacks/all-feedbacks.page.ts");








const routes = [
    {
        path: '',
        component: _all_feedbacks_page__WEBPACK_IMPORTED_MODULE_7__["AllFeedbacksPage"]
    }
];
let AllFeedbacksPageModule = class AllFeedbacksPageModule {
};
AllFeedbacksPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild(routes)
        ],
        declarations: [_all_feedbacks_page__WEBPACK_IMPORTED_MODULE_7__["AllFeedbacksPage"], _feedback_details_feedback_details_page__WEBPACK_IMPORTED_MODULE_1__["FeedbackDetailsPage"]],
        entryComponents: [_feedback_details_feedback_details_page__WEBPACK_IMPORTED_MODULE_1__["FeedbackDetailsPage"]]
    })
], AllFeedbacksPageModule);



/***/ }),

/***/ "./src/app/admin/all-feedbacks/all-feedbacks.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/admin/all-feedbacks/all-feedbacks.page.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".feedbacks-wrap {\n  margin-top: 10px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 10px;\n}\n.feedbacks-wrap p {\n  margin-bottom: 8px;\n}\n.feedbacks-wrap .btn-wrap {\n  text-align: right;\n}\n.feedbacks-wrap span {\n  margin-left: 5px;\n}\n.feedbacks-wrap span .flaticon-call::before {\n  font-size: 10px;\n}\n.feedbacks-wrap span .flaticon-null-7::before {\n  font-size: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWxsLWZlZWRiYWNrcy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGFsbC1mZWVkYmFja3NcXGFsbC1mZWVkYmFja3MucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hbGwtZmVlZGJhY2tzL2FsbC1mZWVkYmFja3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtBQ0NKO0FEQUk7RUFBRSxrQkFBQTtBQ0dOO0FERkk7RUFDSSxpQkFBQTtBQ0lSO0FERkk7RUFDSSxnQkFBQTtBQ0lSO0FESFE7RUFDSSxlQUFBO0FDS1o7QURIUTtFQUNJLGVBQUE7QUNLWiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2FsbC1mZWVkYmFja3MvYWxsLWZlZWRiYWNrcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZmVlZGJhY2tzLXdyYXAge1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgcHttYXJnaW4tYm90dG9tOiA4cHg7fVxyXG4gICAgLmJ0bi13cmFwe1xyXG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gICAgfVxyXG4gICAgc3BhbiB7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICAgICAgICAuZmxhdGljb24tY2FsbDo6YmVmb3JlIHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZmxhdGljb24tbnVsbC03OjpiZWZvcmUge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLmZlZWRiYWNrcy13cmFwIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiAxMHB4O1xufVxuLmZlZWRiYWNrcy13cmFwIHAge1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG59XG4uZmVlZGJhY2tzLXdyYXAgLmJ0bi13cmFwIHtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG4uZmVlZGJhY2tzLXdyYXAgc3BhbiB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG4uZmVlZGJhY2tzLXdyYXAgc3BhbiAuZmxhdGljb24tY2FsbDo6YmVmb3JlIHtcbiAgZm9udC1zaXplOiAxMHB4O1xufVxuLmZlZWRiYWNrcy13cmFwIHNwYW4gLmZsYXRpY29uLW51bGwtNzo6YmVmb3JlIHtcbiAgZm9udC1zaXplOiAxMHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/all-feedbacks/all-feedbacks.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/admin/all-feedbacks/all-feedbacks.page.ts ***!
  \***********************************************************/
/*! exports provided: AllFeedbacksPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllFeedbacksPage", function() { return AllFeedbacksPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _feedback_details_feedback_details_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../feedback-details/feedback-details.page */ "./src/app/admin/feedback-details/feedback-details.page.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");




let AllFeedbacksPage = class AllFeedbacksPage {
    constructor(events, modalController) {
        this.events = events;
        this.modalController = modalController;
        this.feedbacks = [];
        this.showLoader = true;
    }
    ngOnInit() {
        this.initializeSubscriptions();
        this.events.publish('feedback:getFeedbacks');
    }
    ngOnDestroy() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('feedback:publishFeedbacks', (feedbacks) => {
            this.showLoader = false;
            this.feedbacks = feedbacks;
        });
    }
    viewDetails(feed) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _feedback_details_feedback_details_page__WEBPACK_IMPORTED_MODULE_1__["FeedbackDetailsPage"],
                componentProps: { desc: feed.description, images: feed.images }
            });
            yield modal.present();
        });
    }
    removeSubscriptions() {
        this.events.unsubscribe('feedback:publishFeedbacks');
    }
};
AllFeedbacksPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] }
];
AllFeedbacksPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-all-feedbacks',
        template: __webpack_require__(/*! raw-loader!./all-feedbacks.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/all-feedbacks/all-feedbacks.page.html"),
        styles: [__webpack_require__(/*! ./all-feedbacks.page.scss */ "./src/app/admin/all-feedbacks/all-feedbacks.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"]])
], AllFeedbacksPage);



/***/ })

}]);
//# sourceMappingURL=admin-all-feedbacks-all-feedbacks-module-es2015.js.map