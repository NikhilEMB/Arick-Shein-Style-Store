(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["search-items-search-items-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/search-items/search-items.page.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/search-items/search-items.page.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-button (click)=\"onClickBackBtn()\">\r\n        <i class=\"flaticon-null-8\"></i>\r\n      </ion-button>\r\n    </ion-buttons>\r\n    <ion-title>\r\n      <ion-input type=\"text\" placeholder=\"Search for products\" \r\n      [(ngModel)]=\"searchProduct\" (ngModelChange)=\"fireSearchQuery()\" autocapitalize clearInput #searchInput></ion-input>\r\n    </ion-title>\r\n    <ion-buttons slot=\"end\">\r\n      <ion-button (click)=\"goToCart()\">\r\n        <i class=\"flaticon-shopping-cart\"></i>\r\n        <span class=\"cart-badge\" *ngIf=\"cartLength !== 0\">{{cartLength}}</span>\r\n      </ion-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"no-data\" *ngIf=\"showNoProducts; else showProducts\" text-center>\r\n    <img src=\"assets/img/no-product.png\" alt=\"\">\r\n    <h6>No products</h6>\r\n  </div>\r\n  <ng-template #showProducts>\r\n    <div *ngIf=\"showSearchLoader\" class=\"spinner\">\r\n      <ion-spinner color=\"primary\"></ion-spinner>\r\n    </div>\r\n    \r\n    <ion-grid *ngIf=\"!showSearchLoader\" class=\"ion-no-padding\">\r\n      <ion-row>\r\n        <ion-col size-xs=\"6\" size-sm=\"4\" size-md=\"4\" size-lg=\"3\"\r\n          *ngFor=\"let product of products; let i = index\" class=\"ion-no-padding\">\r\n          <div class=\"grid-border\" (click)=\"onClickProduct(product.id)\" *ngIf=\"product.data\">\r\n            <div>\r\n              <ion-thumbnail>\r\n                <img class=\"loading\" *ngIf=\"product.data.coverPic && product.data.coverPic.mob\" src=\"{{product.data.coverPic.mob}}\">\r\n                <img class=\"loading\" *ngIf=\"product.data.coverPic && !product.data.coverPic.mob && product.data.coverPic.url\" src=\"{{product.data.coverPic.url}}\">\r\n                <img *ngIf=\"!product.data.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n              </ion-thumbnail>\r\n            </div>\r\n            <div>\r\n              <p class=\"product-name\">{{product.data.prodName.trim()}}</p>\r\n            </div>\r\n            <div>\r\n              <p class=\"product-desc\">{{product.data.prodDesc.trim()}}</p>\r\n            </div>\r\n            <div>\r\n              <p *ngIf=\"product.data.prodPrice !== null\" class=\"price\">\r\n                {{product.data.prodPrice | currency: 'INR':true:'0.0'}}</p>\r\n              <p *ngIf=\"product.data.prodPrice === null\" class=\"price\">{{0 | currency: 'INR':true}}</p>\r\n              </div>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </ng-template>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/search-items/search-items.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/search-items/search-items.module.ts ***!
  \*****************************************************/
/*! exports provided: SearchItemsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchItemsPageModule", function() { return SearchItemsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _search_items_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./search-items.page */ "./src/app/search-items/search-items.page.ts");







var routes = [
    {
        path: '',
        component: _search_items_page__WEBPACK_IMPORTED_MODULE_6__["SearchItemsPage"]
    }
];
var SearchItemsPageModule = /** @class */ (function () {
    function SearchItemsPageModule() {
    }
    SearchItemsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_search_items_page__WEBPACK_IMPORTED_MODULE_6__["SearchItemsPage"]]
        })
    ], SearchItemsPageModule);
    return SearchItemsPageModule;
}());



/***/ }),

/***/ "./src/app/search-items/search-items.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/search-items/search-items.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-toolbar {\n  color: white;\n}\n\nion-toolbar ion-title {\n  margin-right: 0px;\n  margin-bottom: 0px;\n}\n\nion-input {\n  --padding-start: 0px;\n  --padding-end: 0px;\n  --padding-top: 0px;\n  --padding-bottom: 5px;\n  font-size: 15px;\n  border-bottom: 1px solid #ccc;\n  text-transform: capitalize;\n  outline: none;\n}\n\n.flaticon-null-8::before {\n  font-size: 20px;\n}\n\n.flaticon-null-3::before {\n  font-size: 19px;\n}\n\n.cart-badge {\n  padding: 3px 4px 2px 4px;\n  background-color: var(--ion-color-primary);\n  border-radius: 25px;\n  color: white;\n  border: 1px solid white;\n  font-size: 10px;\n  margin-top: -10px;\n  position: relative;\n  right: 3px;\n  font-weight: 600;\n}\n\n.grid-border {\n  border: 1px solid #eeeded;\n  margin: 0 -1px -1px 0;\n}\n\n.spinner {\n  margin-top: 50%;\n  text-align: center;\n}\n\np {\n  -webkit-margin-before: 5%;\n          margin-block-start: 5%;\n  -webkit-margin-after: 5%;\n          margin-block-end: 5%;\n}\n\n.product-name {\n  color: #2f2f2f;\n  font-weight: 600;\n  position: relative;\n  margin-left: 5%;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-size: 14px;\n}\n\n.product-desc {\n  color: #9f9f9f;\n  margin-left: 5%;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-size: 13px;\n}\n\n.price {\n  color: var(--ion-color-primary);\n  font-size: 16px;\n  margin-left: 5%;\n}\n\nion-thumbnail {\n  --size: 170px;\n  width: 100%;\n}\n\n.loading {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n}\n\n.no-data {\n  margin: 0;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  left: 50%;\n  margin-left: -65px;\n}\n\n.no-data img {\n  width: 130px;\n}\n\nion-thumbnail img {\n  padding: 5px;\n}\n\n@media screen and (max-width: 375px) {\n  ion-thumbnail {\n    --size: 150px;\n  }\n\n  .product-name {\n    font-size: 13px;\n  }\n\n  .product-desc {\n    font-size: 12px;\n  }\n}\n\n@media screen and (max-width: 320px) {\n  ion-thumbnail {\n    --size: 124px;\n  }\n\n  .price {\n    font-size: 15px;\n  }\n\n  .product-name {\n    font-size: 12px;\n  }\n\n  .product-desc {\n    font-size: 11px;\n  }\n}\n\n@media screen and (min-width: 768px) {\n  .price {\n    font-size: 25px;\n  }\n\n  ion-input {\n    font-size: 26px;\n  }\n\n  ion-thumbnail {\n    --size: 220px;\n  }\n\n  .product-name {\n    font-size: 20px;\n  }\n\n  .product-desc {\n    font-size: 18px;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .prod-name {\n    font-size: 35px;\n  }\n\n  .price {\n    font-size: 30px;\n  }\n\n  ion-input {\n    font-size: 28px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VhcmNoLWl0ZW1zL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxzZWFyY2gtaXRlbXNcXHNlYXJjaC1pdGVtcy5wYWdlLnNjc3MiLCJzcmMvYXBwL3NlYXJjaC1pdGVtcy9zZWFyY2gtaXRlbXMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtBQ0NKOztBREVBO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxlQUFBO0VBQ0EsNkJBQUE7RUFDQSwwQkFBQTtFQUNBLGFBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7QUNDSjs7QURFQTtFQUNJLHdCQUFBO0VBQ0EsMENBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0FDQ0o7O0FERUE7RUFDSSx5QkFBQTtFQUNBLHFCQUFBO0FDQ0o7O0FERUE7RUFDSSxlQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFQTtFQUNJLHlCQUFBO1VBQUEsc0JBQUE7RUFDQSx3QkFBQTtVQUFBLG9CQUFBO0FDQ0o7O0FERUE7RUFDSSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0FDQ0o7O0FERUE7RUFDSSxjQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLCtCQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLGFBQUE7RUFDQSxXQUFBO0FDQ0o7O0FERUE7RUFDSSxzR0FBQTtBQ0NKOztBREVBO0VBQ0ksU0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUVBLG1DQUFBO1VBQUEsMkJBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFQTtFQUNJLFlBQUE7QUNDSjs7QURFQTtFQUNJLFlBQUE7QUNDSjs7QURHQTtFQUNJO0lBQ0ksYUFBQTtFQ0FOOztFREdFO0lBQ0ksZUFBQTtFQ0FOOztFREdFO0lBQ0ksZUFBQTtFQ0FOO0FBQ0Y7O0FETUE7RUFFSTtJQUNJLGFBQUE7RUNMTjs7RURRRTtJQUNJLGVBQUE7RUNMTjs7RURRRTtJQUNJLGVBQUE7RUNMTjs7RURRRTtJQUNJLGVBQUE7RUNMTjtBQUNGOztBRFVBO0VBQ0k7SUFDSSxlQUFBO0VDUk47O0VEV0U7SUFDSSxlQUFBO0VDUk47O0VEV0U7SUFDSSxhQUFBO0VDUk47O0VEV0U7SUFDSSxlQUFBO0VDUk47O0VEV0U7SUFDSSxlQUFBO0VDUk47QUFDRjs7QURZQTtFQUNJO0lBQ0ksZUFBQTtFQ1ZOOztFRGFFO0lBQ0ksZUFBQTtFQ1ZOOztFRGFFO0lBQ0ksZUFBQTtFQ1ZOO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9zZWFyY2gtaXRlbXMvc2VhcmNoLWl0ZW1zLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi10b29sYmFyIHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuaW9uLXRvb2xiYXIgaW9uLXRpdGxlIHtcclxuICAgIG1hcmdpbi1yaWdodDogMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMHB4O1xyXG59XHJcblxyXG5pb24taW5wdXQge1xyXG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAwcHg7XHJcbiAgICAtLXBhZGRpbmctZW5kOiAwcHg7XHJcbiAgICAtLXBhZGRpbmctdG9wOiAwcHg7XHJcbiAgICAtLXBhZGRpbmctYm90dG9tOiA1cHg7XHJcbiAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcclxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxufVxyXG5cclxuLmZsYXRpY29uLW51bGwtODo6YmVmb3JlIHtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxufVxyXG5cclxuLmZsYXRpY29uLW51bGwtMzo6YmVmb3JlIHtcclxuICAgIGZvbnQtc2l6ZTogMTlweDtcclxufVxyXG5cclxuLmNhcnQtYmFkZ2Uge1xyXG4gICAgcGFkZGluZzogM3B4IDRweCAycHggNHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogLTEwcHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICByaWdodDogM3B4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG5cclxuLmdyaWQtYm9yZGVyIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlZWVkZWQ7XHJcbiAgICBtYXJnaW46MCAtMXB4IC0xcHggMDtcclxufVxyXG5cclxuLnNwaW5uZXIge1xyXG4gICAgbWFyZ2luLXRvcDogNTAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5wIHtcclxuICAgIG1hcmdpbi1ibG9jay1zdGFydDogNSU7XHJcbiAgICBtYXJnaW4tYmxvY2stZW5kOiA1JTtcclxufVxyXG5cclxuLnByb2R1Y3QtbmFtZSB7XHJcbiAgICBjb2xvcjogIzJmMmYyZjtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBtYXJnaW4tbGVmdDogNSU7XHJcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcblxyXG4ucHJvZHVjdC1kZXNjIHtcclxuICAgIGNvbG9yOiAjOWY5ZjlmO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDUlO1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxufVxyXG5cclxuLnByaWNlIHtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogNSU7XHJcbn1cclxuXHJcbmlvbi10aHVtYm5haWwge1xyXG4gICAgLS1zaXplOiAxNzBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4ubG9hZGluZyB7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoJ2h0dHBzOi8vczUuZ2lmeXUuY29tL2ltYWdlcy9sb2FkZXJiYjE5ZWZjYzI3NDllMTE1LmdpZicpIGNlbnRlciBuby1yZXBlYXQ7XHJcbn1cclxuXHJcbi5uby1kYXRhIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIG1hcmdpbi1sZWZ0OiAtNjVweDtcclxufVxyXG5cclxuLm5vLWRhdGEgaW1nIHtcclxuICAgIHdpZHRoOiAxMzBweDtcclxufVxyXG5cclxuaW9uLXRodW1ibmFpbCBpbWcge1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG59XHJcblxyXG4vL01FRElBIFFVRVJJRVNcclxuQG1lZGlhIHNjcmVlbiBhbmQobWF4LXdpZHRoOiAzNzVweCkge1xyXG4gICAgaW9uLXRodW1ibmFpbCB7XHJcbiAgICAgICAgLS1zaXplOiAxNTBweDtcclxuICAgIH1cclxuXHJcbiAgICAucHJvZHVjdC1uYW1lIHtcclxuICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnByb2R1Y3QtZGVzYyB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQobWF4LXdpZHRoOiAzNjBweCkge31cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1heC13aWR0aDogMzIwcHgpIHtcclxuXHJcbiAgICBpb24tdGh1bWJuYWlsIHtcclxuICAgICAgICAtLXNpemU6IDEyNHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5wcmljZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5wcm9kdWN0LW5hbWUge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIH1cclxuXHJcbiAgICAucHJvZHVjdC1kZXNjIHtcclxuICAgICAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQobWluLXdpZHRoOjc2OHB4KSB7XHJcbiAgICAucHJpY2Uge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIH1cclxuXHJcbiAgICBpb24taW5wdXQge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjZweDtcclxuICAgIH1cclxuXHJcbiAgICBpb24tdGh1bWJuYWlsIHtcclxuICAgICAgICAtLXNpemU6IDIyMHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5wcm9kdWN0LW5hbWUge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIH1cclxuXHJcbiAgICAucHJvZHVjdC1kZXNjIHtcclxuICAgICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZChtaW4td2lkdGg6MTAyNHB4KSB7XHJcbiAgICAucHJvZC1uYW1lIHtcclxuICAgICAgICBmb250LXNpemU6IDM1cHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnByaWNlIHtcclxuICAgICAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgaW9uLWlucHV0IHtcclxuICAgICAgICBmb250LXNpemU6IDI4cHg7XHJcbiAgICB9XHJcblxyXG5cclxufSIsImlvbi10b29sYmFyIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG5pb24tdG9vbGJhciBpb24tdGl0bGUge1xuICBtYXJnaW4tcmlnaHQ6IDBweDtcbiAgbWFyZ2luLWJvdHRvbTogMHB4O1xufVxuXG5pb24taW5wdXQge1xuICAtLXBhZGRpbmctc3RhcnQ6IDBweDtcbiAgLS1wYWRkaW5nLWVuZDogMHB4O1xuICAtLXBhZGRpbmctdG9wOiAwcHg7XG4gIC0tcGFkZGluZy1ib3R0b206IDVweDtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi5mbGF0aWNvbi1udWxsLTg6OmJlZm9yZSB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLmZsYXRpY29uLW51bGwtMzo6YmVmb3JlIHtcbiAgZm9udC1zaXplOiAxOXB4O1xufVxuXG4uY2FydC1iYWRnZSB7XG4gIHBhZGRpbmc6IDNweCA0cHggMnB4IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICBjb2xvcjogd2hpdGU7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xuICBmb250LXNpemU6IDEwcHg7XG4gIG1hcmdpbi10b3A6IC0xMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHJpZ2h0OiAzcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5ncmlkLWJvcmRlciB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZWVkZWQ7XG4gIG1hcmdpbjogMCAtMXB4IC0xcHggMDtcbn1cblxuLnNwaW5uZXIge1xuICBtYXJnaW4tdG9wOiA1MCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxucCB7XG4gIG1hcmdpbi1ibG9jay1zdGFydDogNSU7XG4gIG1hcmdpbi1ibG9jay1lbmQ6IDUlO1xufVxuXG4ucHJvZHVjdC1uYW1lIHtcbiAgY29sb3I6ICMyZjJmMmY7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLWxlZnQ6IDUlO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4ucHJvZHVjdC1kZXNjIHtcbiAgY29sb3I6ICM5ZjlmOWY7XG4gIG1hcmdpbi1sZWZ0OiA1JTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuLnByaWNlIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBtYXJnaW4tbGVmdDogNSU7XG59XG5cbmlvbi10aHVtYm5haWwge1xuICAtLXNpemU6IDE3MHB4O1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmxvYWRpbmcge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXCJodHRwczovL3M1LmdpZnl1LmNvbS9pbWFnZXMvbG9hZGVyYmIxOWVmY2MyNzQ5ZTExNS5naWZcIikgY2VudGVyIG5vLXJlcGVhdDtcbn1cblxuLm5vLWRhdGEge1xuICBtYXJnaW46IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgbGVmdDogNTAlO1xuICBtYXJnaW4tbGVmdDogLTY1cHg7XG59XG5cbi5uby1kYXRhIGltZyB7XG4gIHdpZHRoOiAxMzBweDtcbn1cblxuaW9uLXRodW1ibmFpbCBpbWcge1xuICBwYWRkaW5nOiA1cHg7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM3NXB4KSB7XG4gIGlvbi10aHVtYm5haWwge1xuICAgIC0tc2l6ZTogMTUwcHg7XG4gIH1cblxuICAucHJvZHVjdC1uYW1lIHtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gIH1cblxuICAucHJvZHVjdC1kZXNjIHtcbiAgICBmb250LXNpemU6IDEycHg7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDMyMHB4KSB7XG4gIGlvbi10aHVtYm5haWwge1xuICAgIC0tc2l6ZTogMTI0cHg7XG4gIH1cblxuICAucHJpY2Uge1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgfVxuXG4gIC5wcm9kdWN0LW5hbWUge1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgfVxuXG4gIC5wcm9kdWN0LWRlc2Mge1xuICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgLnByaWNlIHtcbiAgICBmb250LXNpemU6IDI1cHg7XG4gIH1cblxuICBpb24taW5wdXQge1xuICAgIGZvbnQtc2l6ZTogMjZweDtcbiAgfVxuXG4gIGlvbi10aHVtYm5haWwge1xuICAgIC0tc2l6ZTogMjIwcHg7XG4gIH1cblxuICAucHJvZHVjdC1uYW1lIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gIH1cblxuICAucHJvZHVjdC1kZXNjIHtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMjRweCkge1xuICAucHJvZC1uYW1lIHtcbiAgICBmb250LXNpemU6IDM1cHg7XG4gIH1cblxuICAucHJpY2Uge1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgfVxuXG4gIGlvbi1pbnB1dCB7XG4gICAgZm9udC1zaXplOiAyOHB4O1xuICB9XG59Il19 */"

/***/ }),

/***/ "./src/app/search-items/search-items.page.ts":
/*!***************************************************!*\
  !*** ./src/app/search-items/search-items.page.ts ***!
  \***************************************************/
/*! exports provided: SearchItemsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchItemsPage", function() { return SearchItemsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/user/user.service */ "./src/app/services/user/user.service.ts");






var SearchItemsPage = /** @class */ (function () {
    function SearchItemsPage(storage, events, router, alertController, userService) {
        this.storage = storage;
        this.events = events;
        this.router = router;
        this.alertController = alertController;
        this.userService = userService;
        this.cartLength = 0;
        this.searchProduct = '';
        this.doneTypingInterval = 500;
        this.showSearchLoader = false;
        this.showNoProducts = true;
        this.products = [];
    }
    SearchItemsPage.prototype.ngOnInit = function () {
    };
    SearchItemsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.initializeSubscriptions();
        this.storage.get('uid').then(function (val) {
            _this.events.publish('user:getLengthOfCartProducts', val);
        });
        setTimeout(function () {
            _this.searchInput.setFocus();
        }, 500);
    };
    SearchItemsPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    SearchItemsPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('user:publishLengthOfCartProducts', function (cartLength) {
            _this.cartLength = cartLength;
        });
        this.events.subscribe('product:publishProductsForAdminProducts', function (products) {
            _this.products = products;
            //console.log('products', this.products);
            _this.showSearchLoader = false;
            _this.showNoProducts = false;
        });
        this.events.subscribe('product:noProductsAvailable', function () {
            //console.log('in no data shop');
            _this.showNoProducts = true;
            _this.showSearchLoader = false;
        });
    };
    SearchItemsPage.prototype.fireSearchQuery = function () {
        var _this = this;
        clearTimeout(this.typingTimer);
        if (this.searchProduct !== '') {
            this.typingTimer = setTimeout(function () {
                //console.log('in fireSearchQuery...');
                _this.showSearchLoader = true;
                _this.showNoProducts = false;
                _this.events.publish('search-engine:searchProductForAdminProducts', _this.searchProduct);
            }, this.doneTypingInterval);
        }
        else {
            this.showNoProducts = true;
        }
    };
    SearchItemsPage.prototype.onClickBackBtn = function () {
        this.router.navigate(['shop']);
    };
    SearchItemsPage.prototype.goToCart = function () {
        var _this = this;
        var userId = this.userService.getUserId();
        //console.log('uid in sc', userId);
        if (userId === '') {
            //console.log('in if of uid');
            this.router.navigate(['home']);
        }
        else {
            this.storage.get('userRole').then(function (role) {
                if (role === 'admin') {
                    _this.presentAlert('Cart is available only for user not for admin.');
                }
                else if (role === 'deliveryAgent') {
                    _this.presentAlert('Cart is available only for user not for delivery agent.');
                }
                else {
                    var navigationExtras = {
                        state: {
                            routeFromSearchItemsPage: true,
                        }
                    };
                    _this.router.navigate(['user-cart'], navigationExtras);
                }
            });
        }
    };
    SearchItemsPage.prototype.onClickProduct = function (id) {
        var navigationExtras = {
            state: {
                productId: id
            }
        };
        this.router.navigate(['product-details'], navigationExtras);
    };
    SearchItemsPage.prototype.presentAlert = function (msg) {
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
    SearchItemsPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('user:publishLengthOfCartProducts');
        this.events.unsubscribe('product:noProductsAvailable');
        this.events.unsubscribe('product:publishProductsForAdminProducts');
    };
    SearchItemsPage.ctorParameters = function () { return [
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _services_user_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('searchInput', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SearchItemsPage.prototype, "searchInput", void 0);
    SearchItemsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-search-items',
            template: __webpack_require__(/*! raw-loader!./search-items.page.html */ "./node_modules/raw-loader/index.js!./src/app/search-items/search-items.page.html"),
            styles: [__webpack_require__(/*! ./search-items.page.scss */ "./src/app/search-items/search-items.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"]])
    ], SearchItemsPage);
    return SearchItemsPage;
}());



/***/ })

}]);
//# sourceMappingURL=search-items-search-items-module-es5.js.map