(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~admin-add-coupon-codes-add-coupon-codes-module~admin-coupon-code-modal-coupon-code-modal-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/coupon-code-modal/coupon-code-modal.page.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/coupon-code-modal/coupon-code-modal.page.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\r\n  <div class=\"cc-modal-header\">\r\n    <div class=\"cc-search\">\r\n      <ion-input type=\"text\" placeholder=\"Search for products...\" [(ngModel)]=\"searchProduct\"\r\n      (ngModelChange)=\"fireSearchQuery()\" autocapitalize></ion-input>\r\n    </div>\r\n    <div>\r\n      <i class=\"flaticon-null-19\" (click)=\"closeModal()\"></i>\r\n    </div>\r\n  </div>\r\n</ion-header>\r\n<ion-content>\r\n  <div class=\"no-data\" *ngIf=\"showNoProducts; else showProducts\" text-center>\r\n    <img src=\"assets/img/no-orders.png\" alt=\"\">\r\n    <h6>No products</h6>\r\n  </div>\r\n  <div *ngIf=\"showSearchLoader\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n  <ng-template #showProducts>\r\n    <ion-list class=\"ion-no-padding list\" *ngIf=\"productsData.length && !showSearchLoader\" lines=\"none\">\r\n      <ion-item class=\"ion-no-padding\" *ngFor=\"let item of productsData; let i = index\">\r\n        <ion-grid class=\"ion-no-padding\">\r\n          <ion-row class=\"ion-align-items-center\">\r\n            <ion-col size=\"3\">\r\n              <ion-thumbnail style=\"margin-left: 5%;\" class=\"thumbnail\">\r\n                <img class=\"loading\" *ngIf=\"item.coverPic && !item.coverPic.thumb && item.coverPic.url\"\r\n                  src=\"{{item.coverPic.url}}\">\r\n                <img class=\"loading\" *ngIf=\"item.coverPic && item.coverPic.thumb\"\r\n                  src=\"{{item.coverPic.thumb}}\">\r\n                <img *ngIf=\"!item.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n              </ion-thumbnail>\r\n            </ion-col>\r\n            <ion-col size=\"6\">\r\n              <p class=\"ion-text-capitalize ion-text-center\">{{item.prodName}}</p>\r\n            </ion-col>\r\n            <ion-col size=\"3\">\r\n              <p class=\"ion-text-center ion-text-uppercase\" style=\"color: var(--ion-color-primary); cursor: pointer;\" (click)=\"addProductAsNotApplicable(item, i)\" *ngIf=\"!item.isNotApplicable\">add</p>\r\n              <p class=\"ion-text-center ion-text-uppercase\" *ngIf=\"item.isNotApplicable\">added</p>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n      </ion-item>\r\n    </ion-list>\r\n  </ng-template>\r\n  <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"searchMoreProducts($event)\" *ngIf=\"searchProduct\">\r\n    <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more products...\">\r\n    </ion-infinite-scroll-content>\r\n  </ion-infinite-scroll>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/coupon-code-modal/coupon-code-modal.page.scss":
/*!*********************************************************************!*\
  !*** ./src/app/admin/coupon-code-modal/coupon-code-modal.page.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-input {\n  --padding-start: 15px;\n  --padding-end: 5px;\n  --padding-top: 15px;\n  --padding-bottom: 15px;\n  font-size: 15px;\n  border-bottom: 1px solid #ccc;\n  text-transform: capitalize;\n  outline: none;\n}\n\np {\n  text-transform: uppercase;\n  text-align: center;\n  font-size: 13px;\n}\n\nion-item {\n  --padding-end: 0px;\n  --inner-padding-end: 0px;\n}\n\nion-thumbnail {\n  --size: 50px;\n  border: 1px solid #ddd;\n  padding: 1px;\n  border-radius: 5px;\n}\n\n.margin-icon {\n  margin-left: 5px;\n}\n\n.loading {\n  background: transparent url(\"https://s5.gifyu.com/images/377-2.gif\") center no-repeat;\n}\n\n.no-data {\n  margin: 0;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  left: 50%;\n  margin-left: -45px;\n}\n\n.no-data img {\n  width: 90px;\n}\n\n.no-data h6 {\n  opacity: 0.6;\n}\n\n.spinner {\n  margin-top: 5%;\n  text-align: center;\n}\n\n.list {\n  overflow-y: auto;\n}\n\n.add-spinner {\n  text-align: center;\n}\n\n.add-spinner ion-spinner {\n  width: 15px;\n}\n\n.cc-modal-header {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-bottom: 2%;\n}\n\n.flaticon-null-19::before {\n  font-size: 20px;\n  opacity: 0.6;\n  margin-right: 10px;\n}\n\n.cc-search {\n  width: 100%;\n}\n\nion-footer {\n  height: 55px;\n  background: none;\n  box-shadow: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vY291cG9uLWNvZGUtbW9kYWwvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxjb3Vwb24tY29kZS1tb2RhbFxcY291cG9uLWNvZGUtbW9kYWwucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9jb3Vwb24tY29kZS1tb2RhbC9jb3Vwb24tY29kZS1tb2RhbC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7RUFDQSw2QkFBQTtFQUNBLDBCQUFBO0VBQ0EsYUFBQTtBQ0NKOztBREVFO0VBQ0UseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUNDSjs7QURFRTtFQUNFLGtCQUFBO0VBQ0Esd0JBQUE7QUNDSjs7QURFRTtFQUNFLFlBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVFO0VBQ0UsZ0JBQUE7QUNDSjs7QURFRTtFQUNFLHFGQUFBO0FDQ0o7O0FERUU7RUFDRSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBRUEsbUNBQUE7VUFBQSwyQkFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVFO0VBQ0UsV0FBQTtBQ0NKOztBREVFO0VBQ0UsWUFBQTtBQ0NKOztBREVFO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0FDQ0o7O0FERUU7RUFDRSxnQkFBQTtBQ0NKOztBREVFO0VBQ0Usa0JBQUE7QUNDSjs7QURFRTtFQUNFLFdBQUE7QUNDSjs7QURDRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsaUJBQUE7QUNFSjs7QURBRTtFQUNFLGVBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUNHSjs7QURERTtFQUNFLFdBQUE7QUNJSjs7QURGRTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FDS0oiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9jb3Vwb24tY29kZS1tb2RhbC9jb3Vwb24tY29kZS1tb2RhbC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24taW5wdXQge1xyXG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAxNXB4O1xyXG4gICAgLS1wYWRkaW5nLWVuZDogNXB4O1xyXG4gICAgLS1wYWRkaW5nLXRvcDogMTVweDtcclxuICAgIC0tcGFkZGluZy1ib3R0b206IDE1cHg7XHJcbiAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcclxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxuICB9XHJcbiAgXHJcbiAgcCB7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gIH1cclxuICBcclxuICBpb24taXRlbSB7XHJcbiAgICAtLXBhZGRpbmctZW5kOiAwcHg7XHJcbiAgICAtLWlubmVyLXBhZGRpbmctZW5kOiAwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIGlvbi10aHVtYm5haWwge1xyXG4gICAgLS1zaXplOiA1MHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICAgIHBhZGRpbmc6IDFweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICB9XHJcbiAgXHJcbiAgLm1hcmdpbi1pY29uIHtcclxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5sb2FkaW5nIHtcclxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybCgnaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzLzM3Ny0yLmdpZicpIGNlbnRlciBuby1yZXBlYXQ7XHJcbiAgfVxyXG4gIFxyXG4gIC5uby1kYXRhIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIG1hcmdpbi1sZWZ0OiAtNDVweDtcclxuICB9XHJcbiAgXHJcbiAgLm5vLWRhdGEgaW1nIHtcclxuICAgIHdpZHRoOiA5MHB4O1xyXG4gIH1cclxuICBcclxuICAubm8tZGF0YSBoNiB7XHJcbiAgICBvcGFjaXR5OiAuNjtcclxuICB9XHJcbiAgXHJcbiAgLnNwaW5uZXIge1xyXG4gICAgbWFyZ2luLXRvcDogNSU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG4gIFxyXG4gIC5saXN0IHtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgfVxyXG4gIFxyXG4gIC5hZGQtc3Bpbm5lcntcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcbiAgXHJcbiAgLmFkZC1zcGlubmVyIGlvbi1zcGlubmVye1xyXG4gICAgd2lkdGg6IDE1cHg7XHJcbiAgfVxyXG4gIC5jYy1tb2RhbC1oZWFkZXJ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIG1hcmdpbi1ib3R0b206IDIlO1xyXG4gIH1cclxuICAuZmxhdGljb24tbnVsbC0xOTo6YmVmb3JlIHtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIG9wYWNpdHk6IC42O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gIH1cclxuICAuY2Mtc2VhcmNoe1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG4gIGlvbi1mb290ZXIge1xyXG4gICAgaGVpZ2h0OiA1NXB4O1xyXG4gICAgYmFja2dyb3VuZDogbm9uZTtcclxuICAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgfSIsImlvbi1pbnB1dCB7XG4gIC0tcGFkZGluZy1zdGFydDogMTVweDtcbiAgLS1wYWRkaW5nLWVuZDogNXB4O1xuICAtLXBhZGRpbmctdG9wOiAxNXB4O1xuICAtLXBhZGRpbmctYm90dG9tOiAxNXB4O1xuICBmb250LXNpemU6IDE1cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxucCB7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuXG5pb24taXRlbSB7XG4gIC0tcGFkZGluZy1lbmQ6IDBweDtcbiAgLS1pbm5lci1wYWRkaW5nLWVuZDogMHB4O1xufVxuXG5pb24tdGh1bWJuYWlsIHtcbiAgLS1zaXplOiA1MHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBwYWRkaW5nOiAxcHg7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLm1hcmdpbi1pY29uIHtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cblxuLmxvYWRpbmcge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXCJodHRwczovL3M1LmdpZnl1LmNvbS9pbWFnZXMvMzc3LTIuZ2lmXCIpIGNlbnRlciBuby1yZXBlYXQ7XG59XG5cbi5uby1kYXRhIHtcbiAgbWFyZ2luOiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gIGxlZnQ6IDUwJTtcbiAgbWFyZ2luLWxlZnQ6IC00NXB4O1xufVxuXG4ubm8tZGF0YSBpbWcge1xuICB3aWR0aDogOTBweDtcbn1cblxuLm5vLWRhdGEgaDYge1xuICBvcGFjaXR5OiAwLjY7XG59XG5cbi5zcGlubmVyIHtcbiAgbWFyZ2luLXRvcDogNSU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmxpc3Qge1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG4uYWRkLXNwaW5uZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5hZGQtc3Bpbm5lciBpb24tc3Bpbm5lciB7XG4gIHdpZHRoOiAxNXB4O1xufVxuXG4uY2MtbW9kYWwtaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAyJTtcbn1cblxuLmZsYXRpY29uLW51bGwtMTk6OmJlZm9yZSB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgb3BhY2l0eTogMC42O1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5cbi5jYy1zZWFyY2gge1xuICB3aWR0aDogMTAwJTtcbn1cblxuaW9uLWZvb3RlciB7XG4gIGhlaWdodDogNTVweDtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm94LXNoYWRvdzogbm9uZTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/coupon-code-modal/coupon-code-modal.page.ts":
/*!*******************************************************************!*\
  !*** ./src/app/admin/coupon-code-modal/coupon-code-modal.page.ts ***!
  \*******************************************************************/
/*! exports provided: CouponCodeModalPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CouponCodeModalPage", function() { return CouponCodeModalPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var CouponCodeModalPage = /** @class */ (function () {
    function CouponCodeModalPage(events, loadingController, toastController, modalController, router) {
        this.events = events;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.modalController = modalController;
        this.router = router;
        this.searchProduct = '';
        this.doneTypingInterval = 500;
        this.showSearchLoader = false;
        this.showNoProducts = true;
        this.productsData = [];
        this.noMoreProducts = false;
        this.alreadyAddedProducts = [];
        this.page = 0;
        this.noMoreSearchProducts = false;
    }
    CouponCodeModalPage.prototype.ngOnInit = function () {
        // //console.log('code id ', this.codeId);
        // //console.log('alreadyAdded products', this.alreadyAddedProducts);
    };
    CouponCodeModalPage.prototype.ionViewWillEnter = function () {
        this.initializeSubscriptions();
    };
    CouponCodeModalPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    CouponCodeModalPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('coupon-codes:publishProductsForCouponCodesModal', function (products) {
            // //console.log('in all products SUBSCRIPTION');
            console.log('this.alreadyAddedProducts', _this.alreadyAddedProducts);
            for (var index = 0; index < products.length; index++) {
                for (var x = 0; x < _this.alreadyAddedProducts.length; x++) {
                    if (products[index].id === _this.alreadyAddedProducts[x].id) {
                        products[index]['isNotApplicable'] = true;
                        break;
                    }
                    else {
                        products[index]['isNotApplicable'] = false;
                    }
                }
            }
            _this.productsData = products;
            _this.showNoProducts = false;
            _this.showSearchLoader = false;
            // //console.log('all products', this.productsData);
        });
        this.events.subscribe('coupon-codes:noProductsAvailableForModal', function () {
            _this.showNoProducts = true;
            _this.showSearchLoader = false;
        });
        this.events.subscribe('coupon-codes:addProductAsNotApplicableSuccess', function () {
            _this.productsData[_this.selectedIndex].isNotApplicable = true;
            _this.loading.dismiss();
            if (_this.applicableStatus === 'notApplicable') {
                _this.presentToast('Coupon code will not be applied on this product');
            }
            else {
                _this.presentToast('Coupon code will be applied on this product');
            }
        });
        this.events.subscribe('coupon-codes:noMoreAdminSearchProducts', function () {
            _this.noMoreSearchProducts = true;
            _this.showSearchLoader = false;
        });
    };
    CouponCodeModalPage.prototype.fireSearchQuery = function () {
        var _this = this;
        clearTimeout(this.typingTimer);
        if (this.searchProduct.length > 2) {
            this.typingTimer = setTimeout(function () {
                console.log('in fireSearchQuery...');
                _this.showSearchLoader = true;
                _this.showNoProducts = false;
                _this.events.publish('search-engine:alogoliaSearchProductsForCouponCodes', _this.searchProduct, 0, 'new_search');
            }, this.doneTypingInterval);
        }
        else {
            if (!this.searchProduct.length) {
                this.showNoProducts = true;
            }
        }
    };
    CouponCodeModalPage.prototype.searchMoreProducts = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                console.log('loading more data...');
                this.page = this.page + 1;
                this.events.publish('search-engine:alogoliaSearchProductsForCouponCodes', this.searchProduct, this.page, 'existing_search');
                setTimeout(function () {
                    event.target.complete();
                }, 1000);
                if (this.noMoreSearchProducts === true) {
                    event.target.disabled = true;
                }
                return [2 /*return*/];
            });
        });
    };
    CouponCodeModalPage.prototype.addProductAsNotApplicable = function (item, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // //console.log('item:', item);
                    return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        // //console.log('item:', item);
                        _a.sent();
                        this.selectedIndex = index;
                        this.events.publish('coupon-codes:addProductAsNotApplicable', this.getProductDataForNotApplicableArray(item), this.codeId);
                        this.alreadyAddedProducts.push(this.getProductDataForNotApplicableArray(item));
                        return [2 /*return*/];
                }
            });
        });
    };
    CouponCodeModalPage.prototype.presentLoading = function () {
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
    CouponCodeModalPage.prototype.presentToast = function (msg) {
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
    CouponCodeModalPage.prototype.closeModal = function () {
        this.modalController.dismiss(this.alreadyAddedProducts);
    };
    CouponCodeModalPage.prototype.getProductDataForNotApplicableArray = function (product) {
        return {
            id: product.id,
            coverPic: { thumb: product.coverPic && Object.keys(product.coverPic).length ? product.coverPic.thumb || product.coverPic.url : '' },
            prodName: product.prodName
        };
    };
    CouponCodeModalPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('coupon-codes:noProductsAvailableForModal');
        this.events.unsubscribe('coupon-codes:addProductAsNotApplicableSuccess');
        this.events.unsubscribe('coupon-codes:publishProductsForCouponCodesModal');
        this.events.unsubscribe('coupon-codes:noMoreAdminSearchProducts');
    };
    CouponCodeModalPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
    ]; };
    CouponCodeModalPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-coupon-code-modal',
            template: __webpack_require__(/*! raw-loader!./coupon-code-modal.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/coupon-code-modal/coupon-code-modal.page.html"),
            styles: [__webpack_require__(/*! ./coupon-code-modal.page.scss */ "./src/app/admin/coupon-code-modal/coupon-code-modal.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], CouponCodeModalPage);
    return CouponCodeModalPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~admin-add-coupon-codes-add-coupon-codes-module~admin-coupon-code-modal-coupon-code-modal-module-es5.js.map