(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~admin-admin-best-sellers-admin-best-sellers-module~admin-best-sellers-modal-best-sellers-modal-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/best-sellers-modal/best-sellers-modal.page.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/best-sellers-modal/best-sellers-modal.page.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\r\n  <div class=\"bs-modal-header\">\r\n    <div class=\"bs-search\">\r\n      <ion-input type=\"text\" placeholder=\"Search for products...\" [(ngModel)]=\"searchProduct\"\r\n      (ngModelChange)=\"fireSearchQuery()\" autocapitalize></ion-input>\r\n    </div>\r\n    <div>\r\n      <i class=\"flaticon-null-19\" (click)=\"closeModal()\"></i>\r\n    </div>\r\n  </div>\r\n</ion-header>\r\n<ion-content>\r\n  <div class=\"no-data\" *ngIf=\"showNoProducts; else showProducts\" text-center>\r\n    <img src=\"assets/img/no-orders.png\" alt=\"\">\r\n    <h6>No products</h6>\r\n  </div>\r\n  <div *ngIf=\"showSearchLoader\" class=\"spinner\">\r\n    <ion-spinner color=\"primary\"></ion-spinner>\r\n  </div>\r\n  <ng-template #showProducts>\r\n    <ion-list class=\"ion-no-padding list\" *ngIf=\"productsData.length && !showSearchLoader\" lines=\"none\">\r\n      <ion-item class=\"ion-no-padding\" *ngFor=\"let item of productsData; let i = index\">\r\n        <ion-grid class=\"ion-no-padding\">\r\n          <ion-row class=\"ion-align-items-center\">\r\n            <ion-col size=\"2\">\r\n              <ion-thumbnail  class=\"thumbnail\">\r\n                <img class=\"loading\" *ngIf=\"item.data.coverPic && !item.data.coverPic.thumb && item.data.coverPic.url\"\r\n                  src=\"{{item.data.coverPic.url}}\">\r\n                <img class=\"loading\" *ngIf=\"item.data.coverPic && item.data.coverPic.thumb\"\r\n                  src=\"{{item.data.coverPic.thumb}}\">\r\n                <img *ngIf=\"!item.data.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n              </ion-thumbnail>\r\n            </ion-col>\r\n            <ion-col size=\"7\">\r\n              <p class=\"ion-text-capitalize\">{{item.data.prodName}}</p>\r\n            </ion-col>\r\n            <ion-col size=\"3\">\r\n              <ion-button class=\"btn-sml\" shape=\"round\" fill=\"outline\" (click)=\"addProductAsBestSeller(item, i)\" *ngIf=\"!item.isAdded\">Add</ion-button>\r\n              <p class=\"ion-text-center ion-text-uppercase\" class=\"bs-product-added\" *ngIf=\"item.isAdded\"><i class=\"flaticon-null-20\"></i></p>\r\n            </ion-col>\r\n          </ion-row>\r\n        </ion-grid>\r\n      </ion-item>\r\n    </ion-list>\r\n  </ng-template>\r\n  <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"searchMoreProducts($event)\" *ngIf=\"searchProduct\">\r\n    <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more products...\">\r\n    </ion-infinite-scroll-content>\r\n  </ion-infinite-scroll>\r\n</ion-content>\r\n<ion-footer *ngIf=\"firstTimeProductsLength && firstTimeProductsLength >= 10\">\r\n  <ion-grid *ngIf=\"productsData && productsData.length !== 0 && !showNoProducts && !showSearchLoader && !searchProduct\">\r\n    <ion-row>\r\n      <ion-col style=\"text-align: start;\">\r\n        <ion-button (click)=\"loadPreviousProducts()\" size=\"small\" shape=\"round\" [disabled]=\"noPreviousProducts\">\r\n          <span style=\"margin-right: 3px;\"><i class=\"flaticon-null-8\"></i></span>Previous\r\n        </ion-button>\r\n      </ion-col>\r\n      <ion-col style=\"text-align: end;\">\r\n        <ion-button (click)=\"loadMoreProducts()\" size=\"small\" shape=\"round\" [disabled]=\"noMoreProducts\">\r\n          Next <span style=\"margin-left: 3px;\"><i class=\"flaticon-null-7\"></i></span>\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/admin/best-sellers-modal/best-sellers-modal.page.scss":
/*!***********************************************************************!*\
  !*** ./src/app/admin/best-sellers-modal/best-sellers-modal.page.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-input {\n  --padding-start: 15px;\n  --padding-end: 5px;\n  --padding-top: 15px;\n  --padding-bottom: 15px;\n  font-size: 15px;\n  border-bottom: 1px solid #ccc;\n  text-transform: capitalize;\n  outline: none;\n}\n\np {\n  text-transform: uppercase;\n  font-size: 13px;\n}\n\nion-item {\n  --padding-end: 0px;\n  --inner-padding-end: 0px;\n}\n\nion-thumbnail {\n  --size: 50px;\n  border: 1px solid #ddd;\n  padding: 1px;\n  border-radius: 5px;\n}\n\n.margin-icon {\n  margin-left: 5px;\n}\n\n.loading {\n  background: transparent url(\"https://s5.gifyu.com/images/377-2.gif\") center no-repeat;\n}\n\n.no-data {\n  margin: 0;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  left: 50%;\n  margin-left: -45px;\n}\n\n.no-data img {\n  width: 90px;\n}\n\n.no-data h6 {\n  opacity: 0.6;\n}\n\n.spinner {\n  margin-top: 5%;\n  text-align: center;\n}\n\n.list {\n  overflow-y: auto;\n}\n\n.add-spinner {\n  text-align: center;\n}\n\n.add-spinner ion-spinner {\n  width: 15px;\n}\n\n.bs-modal-header {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-bottom: 2%;\n}\n\n.flaticon-null-19::before {\n  font-size: 20px;\n  opacity: 0.6;\n  margin-right: 10px;\n}\n\n.bs-search {\n  width: 100%;\n}\n\nion-footer {\n  height: 55px;\n  background: none;\n  box-shadow: none;\n}\n\n.bs-product-added .flaticon-null-20::before {\n  color: var(--ion-color-success);\n}\n\n.flaticon-null-19 {\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYmVzdC1zZWxsZXJzLW1vZGFsL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcYmVzdC1zZWxsZXJzLW1vZGFsXFxiZXN0LXNlbGxlcnMtbW9kYWwucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9iZXN0LXNlbGxlcnMtbW9kYWwvYmVzdC1zZWxsZXJzLW1vZGFsLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtFQUNBLDZCQUFBO0VBQ0EsMEJBQUE7RUFDQSxhQUFBO0FDQ0Y7O0FERUE7RUFDRSx5QkFBQTtFQUNBLGVBQUE7QUNDRjs7QURFQTtFQUNFLGtCQUFBO0VBQ0Esd0JBQUE7QUNDRjs7QURFQTtFQUNFLFlBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7QUNDRjs7QURFQTtFQUNFLHFGQUFBO0FDQ0Y7O0FERUE7RUFDRSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBRUEsbUNBQUE7VUFBQSwyQkFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0UsV0FBQTtBQ0NGOztBREVBO0VBQ0UsWUFBQTtBQ0NGOztBREVBO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtBQ0NGOztBREVBO0VBQ0Usa0JBQUE7QUNDRjs7QURFQTtFQUNFLFdBQUE7QUNDRjs7QURDQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsaUJBQUE7QUNFRjs7QURBQTtFQUNFLGVBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUNHRjs7QUREQTtFQUNFLFdBQUE7QUNJRjs7QURGQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FDS0Y7O0FERkE7RUFDRSwrQkFBQTtBQ0tGOztBREZBO0VBQ0UsZUFBQTtBQ0tGIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vYmVzdC1zZWxsZXJzLW1vZGFsL2Jlc3Qtc2VsbGVycy1tb2RhbC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24taW5wdXQge1xyXG4gIC0tcGFkZGluZy1zdGFydDogMTVweDtcclxuICAtLXBhZGRpbmctZW5kOiA1cHg7XHJcbiAgLS1wYWRkaW5nLXRvcDogMTVweDtcclxuICAtLXBhZGRpbmctYm90dG9tOiAxNXB4O1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcclxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICBvdXRsaW5lOiBub25lO1xyXG59XHJcblxyXG5wIHtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxufVxyXG5cclxuaW9uLWl0ZW0ge1xyXG4gIC0tcGFkZGluZy1lbmQ6IDBweDtcclxuICAtLWlubmVyLXBhZGRpbmctZW5kOiAwcHg7XHJcbn1cclxuXHJcbmlvbi10aHVtYm5haWwge1xyXG4gIC0tc2l6ZTogNTBweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gIHBhZGRpbmc6IDFweDtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5tYXJnaW4taWNvbiB7XHJcbiAgbWFyZ2luLWxlZnQ6IDVweDtcclxufVxyXG5cclxuLmxvYWRpbmcge1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybCgnaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzLzM3Ny0yLmdpZicpIGNlbnRlciBuby1yZXBlYXQ7XHJcbn1cclxuXHJcbi5uby1kYXRhIHtcclxuICBtYXJnaW46IDA7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogNTAlO1xyXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gIGxlZnQ6IDUwJTtcclxuICBtYXJnaW4tbGVmdDogLTQ1cHg7XHJcbn1cclxuXHJcbi5uby1kYXRhIGltZyB7XHJcbiAgd2lkdGg6IDkwcHg7XHJcbn1cclxuXHJcbi5uby1kYXRhIGg2IHtcclxuICBvcGFjaXR5OiAuNjtcclxufVxyXG5cclxuLnNwaW5uZXIge1xyXG4gIG1hcmdpbi10b3A6IDUlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmxpc3Qge1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxuXHJcbi5hZGQtc3Bpbm5lcntcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5hZGQtc3Bpbm5lciBpb24tc3Bpbm5lcntcclxuICB3aWR0aDogMTVweDtcclxufVxyXG4uYnMtbW9kYWwtaGVhZGVye1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogMiU7XHJcbn1cclxuLmZsYXRpY29uLW51bGwtMTk6OmJlZm9yZSB7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIG9wYWNpdHk6IC42O1xyXG4gIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG4uYnMtc2VhcmNoe1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbmlvbi1mb290ZXIge1xyXG4gIGhlaWdodDogNTVweDtcclxuICBiYWNrZ3JvdW5kOiBub25lO1xyXG4gIGJveC1zaGFkb3c6IG5vbmU7XHJcbn1cclxuXHJcbi5icy1wcm9kdWN0LWFkZGVkIC5mbGF0aWNvbi1udWxsLTIwOjpiZWZvcmUge1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbn1cclxuXHJcbi5mbGF0aWNvbi1udWxsLTE5e1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufSIsImlvbi1pbnB1dCB7XG4gIC0tcGFkZGluZy1zdGFydDogMTVweDtcbiAgLS1wYWRkaW5nLWVuZDogNXB4O1xuICAtLXBhZGRpbmctdG9wOiAxNXB4O1xuICAtLXBhZGRpbmctYm90dG9tOiAxNXB4O1xuICBmb250LXNpemU6IDE1cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxucCB7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuaW9uLWl0ZW0ge1xuICAtLXBhZGRpbmctZW5kOiAwcHg7XG4gIC0taW5uZXItcGFkZGluZy1lbmQ6IDBweDtcbn1cblxuaW9uLXRodW1ibmFpbCB7XG4gIC0tc2l6ZTogNTBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgcGFkZGluZzogMXB4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5tYXJnaW4taWNvbiB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG5cbi5sb2FkaW5nIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzLzM3Ny0yLmdpZlwiKSBjZW50ZXIgbm8tcmVwZWF0O1xufVxuXG4ubm8tZGF0YSB7XG4gIG1hcmdpbjogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBsZWZ0OiA1MCU7XG4gIG1hcmdpbi1sZWZ0OiAtNDVweDtcbn1cblxuLm5vLWRhdGEgaW1nIHtcbiAgd2lkdGg6IDkwcHg7XG59XG5cbi5uby1kYXRhIGg2IHtcbiAgb3BhY2l0eTogMC42O1xufVxuXG4uc3Bpbm5lciB7XG4gIG1hcmdpbi10b3A6IDUlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5saXN0IHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuLmFkZC1zcGlubmVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uYWRkLXNwaW5uZXIgaW9uLXNwaW5uZXIge1xuICB3aWR0aDogMTVweDtcbn1cblxuLmJzLW1vZGFsLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMiU7XG59XG5cbi5mbGF0aWNvbi1udWxsLTE5OjpiZWZvcmUge1xuICBmb250LXNpemU6IDIwcHg7XG4gIG9wYWNpdHk6IDAuNjtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4uYnMtc2VhcmNoIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbmlvbi1mb290ZXIge1xuICBoZWlnaHQ6IDU1cHg7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG5cbi5icy1wcm9kdWN0LWFkZGVkIC5mbGF0aWNvbi1udWxsLTIwOjpiZWZvcmUge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xufVxuXG4uZmxhdGljb24tbnVsbC0xOSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/best-sellers-modal/best-sellers-modal.page.ts":
/*!*********************************************************************!*\
  !*** ./src/app/admin/best-sellers-modal/best-sellers-modal.page.ts ***!
  \*********************************************************************/
/*! exports provided: BestSellersModalPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BestSellersModalPage", function() { return BestSellersModalPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");



var BestSellersModalPage = /** @class */ (function () {
    function BestSellersModalPage(events, loadingController, toastController, modalController) {
        this.events = events;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.modalController = modalController;
        this.searchProduct = '';
        this.doneTypingInterval = 500;
        this.showSearchLoader = true;
        this.showNoProducts = false;
        this.productsData = [];
        this.noMoreProducts = false;
        this.noPreviousProducts = true;
        this.page = 0;
        this.noMoreSearchProducts = false;
    }
    BestSellersModalPage.prototype.ngOnInit = function () {
    };
    BestSellersModalPage.prototype.ionViewWillEnter = function () {
        this.initializeSubscriptions();
        this.events.publish('best-sellers:getProductsForBestSellers');
    };
    BestSellersModalPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    BestSellersModalPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('best-sellers:publishProductsForBestSellers', function (products, length) {
            // //console.log('in all products SUBSCRIPTION');
            _this.productsData = products;
            _this.showNoProducts = false;
            _this.showSearchLoader = false;
            if (_this.loading) {
                _this.loading.dismiss();
            }
            // //console.log('all products', this.productsData);
            if (length) {
                _this.firstTimeProductsLength = length;
            }
        });
        this.events.subscribe('best-sellers:noProductsAvailable', function () {
            _this.showNoProducts = true;
            _this.showSearchLoader = false;
        });
        this.events.subscribe('best-sellers:productsForBestSellersLimitReached', function () {
            _this.noMoreProducts = true;
            _this.loading.dismiss();
        });
        this.events.subscribe('best-sellers:previousProductsForBestSellersLimitReached', function () {
            _this.noPreviousProducts = true;
            _this.loading.dismiss();
        });
        this.events.subscribe('best-sellers:addBestSellerProductSuccess', function () {
            _this.productsData[_this.selectedIndex].isAdded = true;
            _this.loading.dismiss();
            _this.presentToast('Product saved as best seller.');
        });
        this.events.subscribe('best-sellers:maxProductsinBestSellers', function () {
            _this.loading.dismiss();
            _this.presentToast('Already 10 products in best sellers.');
        });
        this.events.subscribe('best-sellers:noMoreSearchProducts', function () {
            _this.noMoreSearchProducts = true;
            _this.showSearchLoader = false;
        });
    };
    BestSellersModalPage.prototype.loadMoreProducts = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // //console.log('loading more data...');
                        this.noPreviousProducts = false;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('best-sellers:loadMoreProductsForBestSellers');
                        return [2 /*return*/];
                }
            });
        });
    };
    BestSellersModalPage.prototype.loadPreviousProducts = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.noMoreProducts = false;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('best-sellers:loadPreviousProductsForBestSellers');
                        return [2 /*return*/];
                }
            });
        });
    };
    BestSellersModalPage.prototype.fireSearchQuery = function () {
        var _this = this;
        clearTimeout(this.typingTimer);
        if (this.searchProduct.length > 2) {
            this.typingTimer = setTimeout(function () {
                console.log('in fireSearchQuery...');
                _this.showSearchLoader = true;
                _this.showNoProducts = false;
                _this.events.publish('search-engine:alogoliaSearchProductsForBestSellers', _this.searchProduct, 0, 'new_search');
            }, this.doneTypingInterval);
        }
        else {
            if (!this.searchProduct.length) {
                this.events.publish('product:getProductsForBestSellers');
            }
        }
    };
    BestSellersModalPage.prototype.searchMoreProducts = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                console.log('loading more data...');
                this.page = this.page + 1;
                this.events.publish('search-engine:alogoliaSearchProductsForBestSellers', this.searchProduct, this.page, 'existing_search');
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
    BestSellersModalPage.prototype.addProductAsBestSeller = function (item, index) {
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
                        this.events.publish('best-sellers:addBestSellerProduct', item);
                        return [2 /*return*/];
                }
            });
        });
    };
    BestSellersModalPage.prototype.presentLoading = function () {
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
    BestSellersModalPage.prototype.presentToast = function (msg) {
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
    BestSellersModalPage.prototype.closeModal = function () {
        this.modalController.dismiss();
    };
    BestSellersModalPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('best-sellers:noProductsAvailable');
        this.events.unsubscribe('best-sellers:addBestSellerProductSuccess');
        this.events.unsubscribe('best-sellers:maxProductsinBestSellers');
        this.events.unsubscribe('best-sellers:publishProductsForBestSellers');
        this.events.unsubscribe('best-sellers:productsForBestSellersLimitReached');
        this.events.unsubscribe('best-sellers:previousProductsForBestSellersLimitReached');
        this.events.unsubscribe('best-sellers:noMoreSearchProducts');
    };
    BestSellersModalPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] }
    ]; };
    BestSellersModalPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-best-sellers-modal',
            template: __webpack_require__(/*! raw-loader!./best-sellers-modal.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/best-sellers-modal/best-sellers-modal.page.html"),
            styles: [__webpack_require__(/*! ./best-sellers-modal.page.scss */ "./src/app/admin/best-sellers-modal/best-sellers-modal.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]])
    ], BestSellersModalPage);
    return BestSellersModalPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~admin-admin-best-sellers-admin-best-sellers-module~admin-best-sellers-modal-best-sellers-modal-module-es5.js.map