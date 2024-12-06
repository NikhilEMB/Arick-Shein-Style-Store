(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~buynow-pricelist-modal-buynow-pricelist-modal-module~product-details-product-details-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/buynow-pricelist-modal/buynow-pricelist-modal.page.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/buynow-pricelist-modal/buynow-pricelist-modal.page.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\r\n  <div class=\"bn-modal-header\">\r\n    <div *ngIf=\"product\">\r\n      {{product.data.prodName}}\r\n    </div>\r\n    <div (click)=\"closePriceListModal()\">\r\n      <i class=\"flaticon-null-19\"></i>\r\n    </div>\r\n  </div>\r\n</ion-header>\r\n<div class=\"inner-content\">\r\n  <div *ngFor=\"let element of product.data.priceList; let i=index\">\r\n    <div class=\"bn-pricelist-element\">\r\n      <div style=\"width: 90%;\">\r\n        <p class=\"bn-weight\">{{element.weight}}</p>\r\n        <p class=\"bn-price\" *ngIf=\"product.data.discount && product.data.discount !== '' && product.data.discount !== '0'; else showOriginalPrice;\">\r\n          {{getDiscountedProduct(element.price, product.data.discount) | currency: 'INR':true:'0.0'}}<del class=\"bn-del-price\">{{element.price  | currency: 'INR':true:'0.0'}}</del>\r\n        </p>\r\n        <ng-template #showOriginalPrice>\r\n          <p class=\"bn-price\">{{element.price | currency: 'INR':true:'0.0'}}</p>\r\n        </ng-template>\r\n        <div class=\"bn-counter\">\r\n          <div class=\"bn-counter-minus\">\r\n            <ion-icon name=\"remove\" (click)=\"decrementQuantity(i)\"></ion-icon>\r\n          </div>\r\n          <div class=\"bn-counter-value\">\r\n            {{element.quantity}}\r\n          </div>\r\n          <div class=\"bn-counter-plus\">\r\n            <ion-icon name=\"add\" (click)=\"incrementQuantity(i)\"></ion-icon>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"bn-buy-now-btn\">\r\n        <ion-button (click)=\"buyNowOrder(i)\" expand=\"block\" size=\"small\">\r\n          Buy Now\r\n        </ion-button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/buynow-pricelist-modal/buynow-pricelist-modal.page.scss":
/*!*************************************************************************!*\
  !*** ./src/app/buynow-pricelist-modal/buynow-pricelist-modal.page.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bn-modal-header {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  margin: 12px;\n  text-transform: capitalize;\n  font-weight: 600;\n  letter-spacing: 0.4px;\n}\n\n.flaticon-null-19 {\n  font-size: 18px;\n  opacity: 0.6;\n}\n\n.bn-line {\n  border: 0;\n  clear: both;\n  display: block;\n  width: 100%;\n  background-color: #eeeeee;\n  height: 1px;\n}\n\nion-header {\n  border-bottom: 1px solid #eeeeee;\n}\n\n.bn-pricelist-element {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  border-bottom: 1px solid #eeeeee;\n  align-items: center;\n}\n\n.bn-price {\n  font-size: 13px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.bn-counter-value {\n  font-size: 15px;\n}\n\n.bn-counter {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-top: 5px;\n  margin-bottom: 10px;\n  width: 50%;\n}\n\n.bn-counter-minus {\n  background: white;\n  color: var(--ion-color-primary);\n  padding: 3px 3px 0px 3px;\n  border-radius: 3px;\n  font-size: 13px;\n  border: 1px solid var(--ion-color-primary);\n}\n\n.bn-counter-plus {\n  background: white;\n  color: var(--ion-color-primary);\n  padding: 3px 3px 0px 3px;\n  border-radius: 3px;\n  font-size: 13px;\n  border: 1px solid var(--ion-color-primary);\n}\n\n.bn-del-price {\n  opacity: 0.6;\n  margin-left: 3%;\n  font-size: smaller;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYnV5bm93LXByaWNlbGlzdC1tb2RhbC9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYnV5bm93LXByaWNlbGlzdC1tb2RhbFxcYnV5bm93LXByaWNlbGlzdC1tb2RhbC5wYWdlLnNjc3MiLCJzcmMvYXBwL2J1eW5vdy1wcmljZWxpc3QtbW9kYWwvYnV5bm93LXByaWNlbGlzdC1tb2RhbC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EsWUFBQTtFQUNBLDBCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtBQ0NKOztBRENBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7QUNFSjs7QURBQTtFQUNJLFNBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSx5QkFBQTtFQUNBLFdBQUE7QUNHSjs7QURBQTtFQUNJLGdDQUFBO0FDR0o7O0FEQUE7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLGdDQUFBO0VBQ0EsbUJBQUE7QUNHSjs7QURBQTtFQUNJLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUNHSjs7QURBQTtFQUNJLGVBQUE7QUNHSjs7QUREQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsVUFBQTtBQ0lKOztBREZBO0VBQ0ksaUJBQUE7RUFDQSwrQkFBQTtFQUNBLHdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsMENBQUE7QUNLSjs7QURIQTtFQUNJLGlCQUFBO0VBQ0EsK0JBQUE7RUFDQSx3QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLDBDQUFBO0FDTUo7O0FESEE7RUFDSSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ01KIiwiZmlsZSI6InNyYy9hcHAvYnV5bm93LXByaWNlbGlzdC1tb2RhbC9idXlub3ctcHJpY2VsaXN0LW1vZGFsLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ibi1tb2RhbC1oZWFkZXJ7XHJcbiAgICBkaXNwbGF5OiBmbGV4OyBcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIG1hcmdpbjogMTJweDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwLjRweDtcclxufVxyXG4uZmxhdGljb24tbnVsbC0xOSB7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBvcGFjaXR5OiAuNjtcclxufVxyXG4uYm4tbGluZXtcclxuICAgIGJvcmRlcjogMDtcclxuICAgIGNsZWFyOiBib3RoO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMzgsIDIzOCwgMjM4KTtcclxuICAgIGhlaWdodDogMXB4O1xyXG59XHJcblxyXG5pb24taGVhZGVye1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYigyMzgsIDIzOCwgMjM4KTtcclxufVxyXG5cclxuLmJuLXByaWNlbGlzdC1lbGVtZW50e1xyXG4gICAgZGlzcGxheTogZmxleDsgXHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYigyMzgsIDIzOCwgMjM4KTtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5ibi1wcmljZXtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbn1cclxuXHJcbi5ibi1jb3VudGVyLXZhbHVle1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG59XHJcbi5ibi1jb3VudGVye1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgd2lkdGg6IDUwJTtcclxufVxyXG4uYm4tY291bnRlci1taW51c3tcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIHBhZGRpbmc6IDNweCAzcHggMHB4IDNweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxufVxyXG4uYm4tY291bnRlci1wbHVze1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgcGFkZGluZzogM3B4IDNweCAwcHggM3B4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG59XHJcblxyXG4uYm4tZGVsLXByaWNlIHtcclxuICAgIG9wYWNpdHk6IC42O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDMlO1xyXG4gICAgZm9udC1zaXplOiBzbWFsbGVyO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG59IiwiLmJuLW1vZGFsLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgbWFyZ2luOiAxMnB4O1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNHB4O1xufVxuXG4uZmxhdGljb24tbnVsbC0xOSB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgb3BhY2l0eTogMC42O1xufVxuXG4uYm4tbGluZSB7XG4gIGJvcmRlcjogMDtcbiAgY2xlYXI6IGJvdGg7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWVlZTtcbiAgaGVpZ2h0OiAxcHg7XG59XG5cbmlvbi1oZWFkZXIge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZWVlZTtcbn1cblxuLmJuLXByaWNlbGlzdC1lbGVtZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZWVlZTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmJuLXByaWNlIHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuLmJuLWNvdW50ZXItdmFsdWUge1xuICBmb250LXNpemU6IDE1cHg7XG59XG5cbi5ibi1jb3VudGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tdG9wOiA1cHg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIHdpZHRoOiA1MCU7XG59XG5cbi5ibi1jb3VudGVyLW1pbnVzIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIHBhZGRpbmc6IDNweCAzcHggMHB4IDNweDtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBmb250LXNpemU6IDEzcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn1cblxuLmJuLWNvdW50ZXItcGx1cyB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBwYWRkaW5nOiAzcHggM3B4IDBweCAzcHg7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG59XG5cbi5ibi1kZWwtcHJpY2Uge1xuICBvcGFjaXR5OiAwLjY7XG4gIG1hcmdpbi1sZWZ0OiAzJTtcbiAgZm9udC1zaXplOiBzbWFsbGVyO1xuICBjb2xvcjogYmxhY2s7XG59Il19 */"

/***/ }),

/***/ "./src/app/buynow-pricelist-modal/buynow-pricelist-modal.page.ts":
/*!***********************************************************************!*\
  !*** ./src/app/buynow-pricelist-modal/buynow-pricelist-modal.page.ts ***!
  \***********************************************************************/
/*! exports provided: BuynowPricelistModalPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuynowPricelistModalPage", function() { return BuynowPricelistModalPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");






var BuynowPricelistModalPage = /** @class */ (function () {
    function BuynowPricelistModalPage(modalController, events, alertController, loadingController, userService, router, storage) {
        this.modalController = modalController;
        this.events = events;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.userService = userService;
        this.router = router;
        this.storage = storage;
    }
    BuynowPricelistModalPage.prototype.ngOnInit = function () {
        //console.log('product in modal', this.product);
    };
    BuynowPricelistModalPage.prototype.ionViewWillEnter = function () {
        this.initializeSubscriptions();
        this.userId = this.userService.getUserId();
    };
    BuynowPricelistModalPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    BuynowPricelistModalPage.prototype.initializeSubscriptions = function () {
    };
    BuynowPricelistModalPage.prototype.closePriceListModal = function () {
        this.modalController.dismiss();
    };
    BuynowPricelistModalPage.prototype.presentAlert = function (msg) {
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
    BuynowPricelistModalPage.prototype.getDiscountedProduct = function (price, discount) {
        var discountedPrice = Math.ceil(price - (price * ((discount * 1) / 100)));
        return discountedPrice;
    };
    BuynowPricelistModalPage.prototype.decrementQuantity = function (i) {
        if (this.product.data.priceList[i].quantity > 1) {
            this.product.data.priceList[i].quantity--;
        }
    };
    BuynowPricelistModalPage.prototype.incrementQuantity = function (i) {
        this.product.data.priceList[i].quantity++;
    };
    BuynowPricelistModalPage.prototype.buyNowOrder = function (i) {
        var _this = this;
        this.closePriceListModal();
        var cartObj = {
            name: this.product.data.prodName,
            quantity: this.product.data.priceList[i].quantity,
            price: this.product.data.priceList[i].price,
            img: this.product.data.coverPic,
            description: this.product.data.priceList[i].weight,
            productId: this.product.id,
            commentMsg: '',
            commentImgs: [],
            pack: {
                weight: this.product.data.priceList[i].weight,
                price: this.product.data.priceList[i].price
            }
        };
        if (this.product.data.discount && this.product.data.discount !== '' && this.product.data.discount !== '0') {
            var discount = Math.ceil(this.product.data.priceList[i].price - (this.product.data.priceList[i].price * ((this.product.data.discount * 1) / 100)));
            cartObj['price'] = discount;
            cartObj.pack['price'] = discount;
        }
        else {
            cartObj['price'] = this.product.data.priceList[i].price;
            cartObj.pack['price'] = this.product.data.priceList[i].price;
        }
        var buyNowOrderProduct = [];
        buyNowOrderProduct.push(cartObj);
        this.storage.set('productsInCart', buyNowOrderProduct);
        this.storage.set('buyNowOrder', true);
        this.storage.get('userDefaultAddress').then(function (address) {
            //console.log(address);
            if (!address) {
                var navigationExtras = {
                    state: {
                        routeFromCheckoutPage: true,
                    }
                };
                _this.router.navigate(['new-address'], navigationExtras);
            }
            else {
                _this.router.navigate(['order-summary']);
            }
        });
    };
    BuynowPricelistModalPage.prototype.removeSubscriptions = function () {
    };
    BuynowPricelistModalPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _services_user_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"] }
    ]; };
    BuynowPricelistModalPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-buynow-pricelist-modal',
            template: __webpack_require__(/*! raw-loader!./buynow-pricelist-modal.page.html */ "./node_modules/raw-loader/index.js!./src/app/buynow-pricelist-modal/buynow-pricelist-modal.page.html"),
            styles: [__webpack_require__(/*! ./buynow-pricelist-modal.page.scss */ "./src/app/buynow-pricelist-modal/buynow-pricelist-modal.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"]])
    ], BuynowPricelistModalPage);
    return BuynowPricelistModalPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~buynow-pricelist-modal-buynow-pricelist-modal-module~product-details-product-details-module-es5.js.map