(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-rating-approval-rating-approval-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/rating-approval/rating-approval.page.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/rating-approval/rating-approval.page.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Rating Approval</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/rating-approval/rating-approval.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/admin/rating-approval/rating-approval.module.ts ***!
  \*****************************************************************/
/*! exports provided: RatingApprovalPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatingApprovalPageModule", function() { return RatingApprovalPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _rating_approval_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rating-approval.page */ "./src/app/admin/rating-approval/rating-approval.page.ts");







var routes = [
    {
        path: '',
        component: _rating_approval_page__WEBPACK_IMPORTED_MODULE_6__["RatingApprovalPage"]
    }
];
var RatingApprovalPageModule = /** @class */ (function () {
    function RatingApprovalPageModule() {
    }
    RatingApprovalPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_rating_approval_page__WEBPACK_IMPORTED_MODULE_6__["RatingApprovalPage"]]
        })
    ], RatingApprovalPageModule);
    return RatingApprovalPageModule;
}());



/***/ }),

/***/ "./src/app/admin/rating-approval/rating-approval.page.scss":
/*!*****************************************************************!*\
  !*** ./src/app/admin/rating-approval/rating-approval.page.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3JhdGluZy1hcHByb3ZhbC9yYXRpbmctYXBwcm92YWwucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/admin/rating-approval/rating-approval.page.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/rating-approval/rating-approval.page.ts ***!
  \***************************************************************/
/*! exports provided: RatingApprovalPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatingApprovalPage", function() { return RatingApprovalPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");






var RatingApprovalPage = /** @class */ (function () {
    function RatingApprovalPage(events, labelService, router, sharedService) {
        this.events = events;
        this.labelService = labelService;
        this.router = router;
        this.sharedService = sharedService;
        this.isMultiVendorActive = false;
        this.ratingData = [];
    }
    RatingApprovalPage.prototype.ngOnInit = function () {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.ALL_VENDORS_LABELS = this.labelService.labels['ALL_VENDORS'];
        this.headerText = this.ALL_VENDORS_LABELS['header_text'];
        this.initializeSubscriptions();
        this.events.publish('rating-approval:getRatings');
    };
    RatingApprovalPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('rating-approval:getRatingsSuccess', function (data) {
            _this.ratingData = data;
            console.log(_this.ratingData);
            if (_this.sharedService.loading) {
                _this.sharedService.loading.dismiss();
            }
        });
    };
    RatingApprovalPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"] }
    ]; };
    RatingApprovalPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-rating-approval',
            template: __webpack_require__(/*! raw-loader!./rating-approval.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/rating-approval/rating-approval.page.html"),
            styles: [__webpack_require__(/*! ./rating-approval.page.scss */ "./src/app/admin/rating-approval/rating-approval.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
            src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_4__["LabelService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"]])
    ], RatingApprovalPage);
    return RatingApprovalPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-rating-approval-rating-approval-module-es5.js.map