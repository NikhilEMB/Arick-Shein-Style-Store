(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["all-offers-all-offers-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/all-offers/all-offers.page.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/all-offers/all-offers.page.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button class=\"custom-back-button\">\r\n        <img src=\"assets/img/menu-icon-white.png\" class=\"menu-img\">\r\n      </ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title text-center>Offers</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"offers-content\">\r\n\r\n  <div class=\"spinner\" *ngIf=\"showLoader; else offersLoaded;\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n\r\n  <ng-template #offersLoaded>\r\n    <div class=\"no-data ion-text-center\" *ngIf=\"!allOffers.length; else offersHasLength;\">\r\n      <img src=\"assets/img/no-category.png\" alt=\"\">\r\n      <h6>No offers</h6>\r\n    </div>\r\n    <ng-template #offersHasLength>\r\n      <ion-card *ngFor=\"let offer of allOffers\" class=\"offer-card\">\r\n        <img img-preloader=\"{{offer.images[0].mob}}\" *ngIf=\"offer.images && offer.images.length === 1; else useSlider\" class=\"offer-images\">\r\n        <ng-template #useSlider>\r\n          <ion-slides pager=\"true\" [options]=\"offerSlideOpts\" loop=\"true\" *ngIf=\"offer.images && offer.images.length\">\r\n            <ion-slide *ngFor=\"let img of offer.images; let i = index;\">\r\n              <div class=\"offer-images\"\r\n                [ngStyle]=\"{'background': 'url(' + img.mob + ') no-repeat center', 'background-size': 'contain'}\"></div>\r\n            </ion-slide>\r\n          </ion-slides>\r\n        </ng-template>\r\n        <ion-card-header>\r\n          <ion-card-title>{{offer.name}}</ion-card-title>\r\n        </ion-card-header>\r\n        <ion-card-content [innerHtml]=\"offer.description\" *ngIf=\"offer.description\">\r\n        </ion-card-content>\r\n      </ion-card>\r\n    </ng-template>\r\n  </ng-template>\r\n\r\n</ion-content>"

/***/ }),

/***/ "./src/app/all-offers/all-offers.module.ts":
/*!*************************************************!*\
  !*** ./src/app/all-offers/all-offers.module.ts ***!
  \*************************************************/
/*! exports provided: AllOffersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllOffersPageModule", function() { return AllOffersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _all_offers_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./all-offers.page */ "./src/app/all-offers/all-offers.page.ts");
/* harmony import */ var _directives_application_directives_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../directives/application-directives.module */ "./src/app/directives/application-directives.module.ts");








const routes = [
    {
        path: '',
        component: _all_offers_page__WEBPACK_IMPORTED_MODULE_6__["AllOffersPage"]
    }
];
let AllOffersPageModule = class AllOffersPageModule {
};
AllOffersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _directives_application_directives_module__WEBPACK_IMPORTED_MODULE_7__["ApplicationDirectivesModule"]
        ],
        declarations: [_all_offers_page__WEBPACK_IMPORTED_MODULE_6__["AllOffersPage"]]
    })
], AllOffersPageModule);



/***/ }),

/***/ "./src/app/all-offers/all-offers.page.scss":
/*!*************************************************!*\
  !*** ./src/app/all-offers/all-offers.page.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".spinner {\n  text-align: center;\n  margin-top: 45%;\n}\n\n.offers-content {\n  --background: #F2F2F2;\n}\n\n.offer-images {\n  background: transparent url('img-preloader.png') center no-repeat;\n  min-height: 25vh;\n  width: 100%;\n}\n\n.offer-card {\n  background: white;\n  margin-bottom: 8%;\n}\n\n.offer-card ion-card-title {\n  font-size: 18px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWxsLW9mZmVycy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWxsLW9mZmVyc1xcYWxsLW9mZmVycy5wYWdlLnNjc3MiLCJzcmMvYXBwL2FsbC1vZmZlcnMvYWxsLW9mZmVycy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLHFCQUFBO0FDQ0o7O0FERUE7RUFDSSxpRUFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtBQ0NKOztBREVBO0VBQ0ksaUJBQUE7RUFDQSxpQkFBQTtBQ0NKOztBREFJO0VBQ0ksZUFBQTtBQ0VSIiwiZmlsZSI6InNyYy9hcHAvYWxsLW9mZmVycy9hbGwtb2ZmZXJzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zcGlubmVyIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG1hcmdpbi10b3A6IDQ1JTtcclxufVxyXG5cclxuLm9mZmVycy1jb250ZW50e1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAjRjJGMkYyO1xyXG59XHJcblxyXG4ub2ZmZXItaW1hZ2VzIHtcclxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybCgnLi4vLi4vYXNzZXRzL2ltZy9pbWctcHJlbG9hZGVyLnBuZycpIGNlbnRlciBuby1yZXBlYXQ7XHJcbiAgICBtaW4taGVpZ2h0OiAyNXZoO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5vZmZlci1jYXJkIHtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogOCU7XHJcbiAgICBpb24tY2FyZC10aXRsZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgfVxyXG59IiwiLnNwaW5uZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDQ1JTtcbn1cblxuLm9mZmVycy1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiAjRjJGMkYyO1xufVxuXG4ub2ZmZXItaW1hZ2VzIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiLi4vLi4vYXNzZXRzL2ltZy9pbWctcHJlbG9hZGVyLnBuZ1wiKSBjZW50ZXIgbm8tcmVwZWF0O1xuICBtaW4taGVpZ2h0OiAyNXZoO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLm9mZmVyLWNhcmQge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgbWFyZ2luLWJvdHRvbTogOCU7XG59XG4ub2ZmZXItY2FyZCBpb24tY2FyZC10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMThweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/all-offers/all-offers.page.ts":
/*!***********************************************!*\
  !*** ./src/app/all-offers/all-offers.page.ts ***!
  \***********************************************/
/*! exports provided: AllOffersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllOffersPage", function() { return AllOffersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");



let AllOffersPage = class AllOffersPage {
    constructor(events) {
        this.events = events;
        this.showLoader = true;
        this.allOffers = [];
        this.offerSlideOpts = {
            initialSlide: 0,
            speed: 400,
            disableOnInteraction: false,
            autoplay: {
                delay: 5000
            }
        };
    }
    ngOnInit() {
        this.initializeSubscriptions();
        this.events.publish('offer:getOffers');
    }
    ngOnDestroy() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('offer:publishOffers', (offers) => {
            this.showLoader = false;
            this.allOffers = offers;
        });
    }
    removeSubscriptions() {
        this.events.unsubscribe('offer:publishOffers');
    }
};
AllOffersPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] }
];
AllOffersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-all-offers',
        template: __webpack_require__(/*! raw-loader!./all-offers.page.html */ "./node_modules/raw-loader/index.js!./src/app/all-offers/all-offers.page.html"),
        styles: [__webpack_require__(/*! ./all-offers.page.scss */ "./src/app/all-offers/all-offers.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"]])
], AllOffersPage);



/***/ })

}]);
//# sourceMappingURL=all-offers-all-offers-module-es2015.js.map