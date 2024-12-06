(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["shop-shop-subcategories-shop-subcategories-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/shop/shop-subcategories/shop-subcategories.page.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/shop/shop-subcategories/shop-subcategories.page.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"shop-categories\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center>{{categoryName}}</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n\r\n<ion-content>\r\n  <div *ngIf=\"showLoader; else subcategoriesLoaded;\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n  <ng-template #subcategoriesLoaded>\r\n    <div class=\"no-data\" *ngIf=\"showNoSubcategories; else showSubcategories\" text-center>\r\n      <img src=\"assets/img/no-category.png\" alt=\"\">\r\n      <h6>No subcategories</h6>\r\n    </div>\r\n    <ng-template #showSubcategories>\r\n      <ion-grid class=\"ion-no-padding\">\r\n        <ion-row>\r\n          <ion-col size-xs=\"6\" size-sm=\"4\" size-md=\"4\" size-lg=\"3\" *ngFor=\"let item of subcategories; let i = index\"\r\n            class=\"ion-no-padding\">\r\n            <div class=\"grid-border\">\r\n              <div>\r\n                <ion-thumbnail (click)=\"onClickSubcategory(item)\">\r\n                  <img class=\"loading\" *ngIf=\"item.image && item.image.mob\" src=\"{{item.image.mob}}\">\r\n                  <img class=\"loading\" *ngIf=\"item.image && !item.image.mob && item.image.url\" src=\"{{item.image.url}}\">\r\n                </ion-thumbnail>\r\n              </div>\r\n              <div>\r\n                <p class=\"product-name\">{{item.name.trim()}}</p>\r\n              </div>\r\n            </div>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </ng-template>\r\n    \r\n    \r\n  </ng-template>\r\n  \r\n  \r\n</ion-content>"

/***/ }),

/***/ "./src/app/shop/shop-subcategories/shop-subcategories.module.ts":
/*!**********************************************************************!*\
  !*** ./src/app/shop/shop-subcategories/shop-subcategories.module.ts ***!
  \**********************************************************************/
/*! exports provided: ShopSubcategoriesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopSubcategoriesPageModule", function() { return ShopSubcategoriesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _shop_subcategories_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shop-subcategories.page */ "./src/app/shop/shop-subcategories/shop-subcategories.page.ts");







var routes = [
    {
        path: '',
        component: _shop_subcategories_page__WEBPACK_IMPORTED_MODULE_6__["ShopSubcategoriesPage"]
    }
];
var ShopSubcategoriesPageModule = /** @class */ (function () {
    function ShopSubcategoriesPageModule() {
    }
    ShopSubcategoriesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_shop_subcategories_page__WEBPACK_IMPORTED_MODULE_6__["ShopSubcategoriesPage"]]
        })
    ], ShopSubcategoriesPageModule);
    return ShopSubcategoriesPageModule;
}());



/***/ }),

/***/ "./src/app/shop/shop-subcategories/shop-subcategories.page.scss":
/*!**********************************************************************!*\
  !*** ./src/app/shop/shop-subcategories/shop-subcategories.page.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".grid-border {\n  border: 1px solid #eeeded;\n  margin: 0 -1px -1px 0;\n}\n\n.spinner {\n  margin-top: 50%;\n  text-align: center;\n}\n\np {\n  -webkit-margin-before: 5%;\n          margin-block-start: 5%;\n  -webkit-margin-after: 5%;\n          margin-block-end: 5%;\n}\n\n.product-name {\n  color: #2f2f2f;\n  font-weight: 600;\n  position: relative;\n  margin-left: 5%;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-size: 14px;\n}\n\nion-thumbnail {\n  --size: 170px;\n  width: 100%;\n}\n\n.loading {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n}\n\n.no-data {\n  margin: 0;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  left: 50%;\n  margin-left: -65px;\n}\n\n.no-data img {\n  width: 130px;\n}\n\nion-thumbnail img {\n  padding: 5px;\n}\n\n@media screen and (max-width: 375px) {\n  ion-thumbnail {\n    --size: 150px;\n  }\n\n  .product-name {\n    font-size: 13px;\n  }\n}\n\n@media screen and (max-width: 320px) {\n  ion-thumbnail {\n    --size: 124px;\n  }\n\n  .product-name {\n    font-size: 12px;\n  }\n}\n\n@media screen and (min-width: 768px) {\n  ion-thumbnail {\n    --size: 220px;\n  }\n\n  .product-name {\n    font-size: 20px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hvcC9zaG9wLXN1YmNhdGVnb3JpZXMvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXHNob3BcXHNob3Atc3ViY2F0ZWdvcmllc1xcc2hvcC1zdWJjYXRlZ29yaWVzLnBhZ2Uuc2NzcyIsInNyYy9hcHAvc2hvcC9zaG9wLXN1YmNhdGVnb3JpZXMvc2hvcC1zdWJjYXRlZ29yaWVzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHlCQUFBO0VBQ0EscUJBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0kseUJBQUE7VUFBQSxzQkFBQTtFQUNBLHdCQUFBO1VBQUEsb0JBQUE7QUNDSjs7QURFQTtFQUNJLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLGFBQUE7RUFDQSxXQUFBO0FDQ0o7O0FERUE7RUFDSSxzR0FBQTtBQ0NKOztBREVBO0VBQ0ksU0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUVBLG1DQUFBO1VBQUEsMkJBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFQTtFQUNJLFlBQUE7QUNDSjs7QURFQTtFQUNJLFlBQUE7QUNDSjs7QURHQTtFQUVJO0lBQ0ksYUFBQTtFQ0ROOztFRElFO0lBQ0ksZUFBQTtFQ0ROO0FBQ0Y7O0FEUUE7RUFFSTtJQUNJLGFBQUE7RUNQTjs7RURVRTtJQUNJLGVBQUE7RUNQTjtBQUNGOztBRGFBO0VBRUk7SUFDSSxhQUFBO0VDWk47O0VEZUU7SUFDSSxlQUFBO0VDWk47QUFDRiIsImZpbGUiOiJzcmMvYXBwL3Nob3Avc2hvcC1zdWJjYXRlZ29yaWVzL3Nob3Atc3ViY2F0ZWdvcmllcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZ3JpZC1ib3JkZXIge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2VlZWRlZDtcclxuICAgIG1hcmdpbjogMCAtMXB4IC0xcHggMDtcclxufVxyXG5cclxuLnNwaW5uZXIge1xyXG4gICAgbWFyZ2luLXRvcDogNTAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5wIHtcclxuICAgIG1hcmdpbi1ibG9jay1zdGFydDogNSU7XHJcbiAgICBtYXJnaW4tYmxvY2stZW5kOiA1JTtcclxufVxyXG5cclxuLnByb2R1Y3QtbmFtZSB7XHJcbiAgICBjb2xvcjogIzJmMmYyZjtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBtYXJnaW4tbGVmdDogNSU7XHJcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcblxyXG5pb24tdGh1bWJuYWlsIHtcclxuICAgIC0tc2l6ZTogMTcwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLmxvYWRpbmcge1xyXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKCdodHRwczovL3M1LmdpZnl1LmNvbS9pbWFnZXMvbG9hZGVyYmIxOWVmY2MyNzQ5ZTExNS5naWYnKSBjZW50ZXIgbm8tcmVwZWF0O1xyXG59XHJcblxyXG4ubm8tZGF0YSB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICBtYXJnaW4tbGVmdDogLTY1cHg7XHJcbn1cclxuXHJcbi5uby1kYXRhIGltZyB7XHJcbiAgICB3aWR0aDogMTMwcHg7XHJcbn1cclxuXHJcbmlvbi10aHVtYm5haWwgaW1nIHtcclxuICAgIHBhZGRpbmc6IDVweDtcclxufVxyXG5cclxuLy9NRURJQSBRVUVSSUVTXHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1heC13aWR0aDogMzc1cHgpIHtcclxuXHJcbiAgICBpb24tdGh1bWJuYWlsIHtcclxuICAgICAgICAtLXNpemU6IDE1MHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5wcm9kdWN0LW5hbWUge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZChtYXgtd2lkdGg6IDM2MHB4KSB7fVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQobWF4LXdpZHRoOiAzMjBweCkge1xyXG5cclxuICAgIGlvbi10aHVtYm5haWwge1xyXG4gICAgICAgIC0tc2l6ZTogMTI0cHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnByb2R1Y3QtbmFtZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZChtaW4td2lkdGg6NzY4cHgpIHtcclxuXHJcbiAgICBpb24tdGh1bWJuYWlsIHtcclxuICAgICAgICAtLXNpemU6IDIyMHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5wcm9kdWN0LW5hbWUge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZChtaW4td2lkdGg6MTAyNHB4KSB7fSIsIi5ncmlkLWJvcmRlciB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZWVkZWQ7XG4gIG1hcmdpbjogMCAtMXB4IC0xcHggMDtcbn1cblxuLnNwaW5uZXIge1xuICBtYXJnaW4tdG9wOiA1MCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxucCB7XG4gIG1hcmdpbi1ibG9jay1zdGFydDogNSU7XG4gIG1hcmdpbi1ibG9jay1lbmQ6IDUlO1xufVxuXG4ucHJvZHVjdC1uYW1lIHtcbiAgY29sb3I6ICMyZjJmMmY7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLWxlZnQ6IDUlO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG5pb24tdGh1bWJuYWlsIHtcbiAgLS1zaXplOiAxNzBweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5sb2FkaW5nIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzL2xvYWRlcmJiMTllZmNjMjc0OWUxMTUuZ2lmXCIpIGNlbnRlciBuby1yZXBlYXQ7XG59XG5cbi5uby1kYXRhIHtcbiAgbWFyZ2luOiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gIGxlZnQ6IDUwJTtcbiAgbWFyZ2luLWxlZnQ6IC02NXB4O1xufVxuXG4ubm8tZGF0YSBpbWcge1xuICB3aWR0aDogMTMwcHg7XG59XG5cbmlvbi10aHVtYm5haWwgaW1nIHtcbiAgcGFkZGluZzogNXB4O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzNzVweCkge1xuICBpb24tdGh1bWJuYWlsIHtcbiAgICAtLXNpemU6IDE1MHB4O1xuICB9XG5cbiAgLnByb2R1Y3QtbmFtZSB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzMjBweCkge1xuICBpb24tdGh1bWJuYWlsIHtcbiAgICAtLXNpemU6IDEyNHB4O1xuICB9XG5cbiAgLnByb2R1Y3QtbmFtZSB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICBpb24tdGh1bWJuYWlsIHtcbiAgICAtLXNpemU6IDIyMHB4O1xuICB9XG5cbiAgLnByb2R1Y3QtbmFtZSB7XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICB9XG59Il19 */"

/***/ }),

/***/ "./src/app/shop/shop-subcategories/shop-subcategories.page.ts":
/*!********************************************************************!*\
  !*** ./src/app/shop/shop-subcategories/shop-subcategories.page.ts ***!
  \********************************************************************/
/*! exports provided: ShopSubcategoriesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopSubcategoriesPage", function() { return ShopSubcategoriesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var ShopSubcategoriesPage = /** @class */ (function () {
    function ShopSubcategoriesPage(events, router, route) {
        var _this = this;
        this.events = events;
        this.router = router;
        this.route = route;
        this.subcategories = [];
        this.showLoader = true;
        this.showNoSubcategories = false;
        this.route.queryParams.subscribe(function (params) {
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.categoryId = _this.router.getCurrentNavigation().extras.state.categoryId;
                _this.categoryName = _this.router.getCurrentNavigation().extras.state.categoryName;
                //console.log('categoryId', this.categoryId);
            }
        });
    }
    ShopSubcategoriesPage.prototype.ngOnInit = function () {
        this.initializeSubscriptions();
        this.events.publish('product:getSubcategoriesForUser', this.categoryId);
    };
    ShopSubcategoriesPage.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    ShopSubcategoriesPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('product:publishSubcategoriesForUser', function (data) {
            _this.subcategories = data;
            _this.showLoader = false;
            _this.showNoSubcategories = false;
        });
        this.events.subscribe('product:noSubcategoriesForUser', function () {
            _this.showLoader = false;
            _this.showNoSubcategories = true;
        });
    };
    ShopSubcategoriesPage.prototype.onClickSubcategory = function (category) {
        var navigationExtras = {
            state: {
                categoryId: category.id,
                categoryName: category.name
            }
        };
        this.router.navigate(['shop'], navigationExtras);
    };
    ShopSubcategoriesPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('product:publishSubcategoriesForUser');
        this.events.unsubscribe('product:noSubcategoriesForUser');
    };
    ShopSubcategoriesPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
    ]; };
    ShopSubcategoriesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-shop-subcategories',
            template: __webpack_require__(/*! raw-loader!./shop-subcategories.page.html */ "./node_modules/raw-loader/index.js!./src/app/shop/shop-subcategories/shop-subcategories.page.html"),
            styles: [__webpack_require__(/*! ./shop-subcategories.page.scss */ "./src/app/shop/shop-subcategories/shop-subcategories.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], ShopSubcategoriesPage);
    return ShopSubcategoriesPage;
}());



/***/ })

}]);
//# sourceMappingURL=shop-shop-subcategories-shop-subcategories-module-es5.js.map