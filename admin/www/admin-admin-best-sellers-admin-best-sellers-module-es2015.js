(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-best-sellers-admin-best-sellers-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-best-sellers/admin-best-sellers.page.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-best-sellers/admin-best-sellers.page.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center><p style=\"font-size: 16px !important\">*Note: Please use homepage (from sidemenu) for this feature if your system has been updated after 15th Feb</p></ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n      <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"addNewBestSellerProduct()\">\r\n        <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n        Add new Bestseller\r\n      </ion-button>\r\n    <ion-button fill=\"solid\" color=\"secondary\">\r\n      <span class=\"icon\" slot=\"start\">\r\n        <i class=\"flaticon-null\" slot=\"start\"></i>\r\n        <span class=\"count\">5</span>\r\n      </span>\r\n    </ion-button>\r\n    <ion-button fill=\"solid\" color=\"secondary\">\r\n      <span class=\"icon\" slot=\"start\">\r\n        <i class=\"flaticon-shopping-bag\" slot=\"start\"></i>\r\n        <span class=\"count\">2</span>\r\n      </span>\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n  <div class=\"no-data ion-text-center\" *ngIf=\"noBestSellerProducts; else showBestSellersProducts\">\r\n    <img src=\"assets/img/no-product.png\" alt=\"\">\r\n    <h6>No Products</h6>\r\n  </div>\r\n  <ng-template #showBestSellersProducts>\r\n    <!-- heading -->\r\n    <div class=\"list-header\">\r\n      <div class=\"show-best-seller\">\r\n        <ion-text>\r\n          <h6>Show Best Sellers</h6>\r\n        </ion-text>\r\n        <ion-toggle (click)=\"changeBestSellersStatus()\" [checked]=\"bestSellersActiveStatus\"></ion-toggle>\r\n      </div>\r\n      <ion-grid class=\"ion-no-padding\">\r\n        <ion-row >\r\n          <ion-col class=\"img\">\r\n            <p>image</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>name</p>\r\n          </ion-col>\r\n          <ion-col class=\"action\">\r\n            <p>Action</p>\r\n          </ion-col>\r\n          <ion-col class=\"reorder\">\r\n            <p>reorder</p>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n      </div>\r\n      <!-- heading -->\r\n       <!-- product  list -->\r\n       <div class=\"list-container\">\r\n   \r\n    <ion-list class=\"ion-no-padding row-border\" *ngIf=\"bsProducts.length; else loadingProducts\">\r\n      <ion-reorder-group (ionItemReorder)=\"onReorderBestSeller($event)\" disabled=\"false\" class=\"ion-no-padding\">\r\n        \r\n         \r\n          <ion-item *ngFor=\"let item of bsProducts; let i = index\">\r\n            <ion-grid class=\"row-background ion-no-padding ion-align-items-center\">\r\n              <ion-row class=\"ion-align-items-center\">\r\n                <ion-col class=\"img\">\r\n                  <ion-thumbnail style=\"margin-left: 5%;\" class=\"thumbnail\">\r\n                    <img class=\"loading\" *ngIf=\"item.data.coverPic && !item.data.coverPic.thumb && item.data.coverPic.url\" src=\"{{item.data.coverPic.url}}\">\r\n                    <img class=\"loading\" *ngIf=\"item.data.coverPic && item.data.coverPic.thumb\" src=\"{{item.data.coverPic.thumb}}\">\r\n                    <img *ngIf=\"!item.data.coverPic\" src=\"assets/img/placeholder-img.jpg\">\r\n                  </ion-thumbnail>\r\n                </ion-col>\r\n                <ion-col class=\"name\">\r\n                  <p class=\"\">{{item.data.prodName}}</p>\r\n                </ion-col>\r\n                <ion-col class=\"action\">\r\n                  <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"deleteBestSellerProductConfirm(item.id, i)\">\r\n                    <i class=\"flaticon-null-21\" slot=\"icon-only\"></i>\r\n                  </ion-button>\r\n                </ion-col>\r\n                <ion-col class=\"reorder\">\r\n                  <ion-reorder>\r\n                    <div class=\"flat-sort\">\r\n                      <i class=\"flaticon-menu\"></i>\r\n                    </div>\r\n                  </ion-reorder>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </ion-item>\r\n      \r\n      </ion-reorder-group>\r\n    </ion-list>\r\n    <ng-template #loadingProducts>\r\n      <ion-grid class=\"row-border ion-no-padding\" *ngIf=\"!bsProducts.length\">\r\n        <ion-row class=\"row-background\" *ngFor=\"let x of [1,2,3,4,5,6,7,8,9,10]\">\r\n          <ion-col size=\"3\">\r\n            <ion-thumbnail>\r\n              <ion-skeleton-text style=\"margin: auto;\"></ion-skeleton-text>\r\n            </ion-thumbnail>\r\n          </ion-col>\r\n          <ion-col size=\"6\">\r\n            <h3>\r\n              <ion-skeleton-text animated style=\"width: 90%;margin: auto;\"></ion-skeleton-text>\r\n            </h3>\r\n          </ion-col>\r\n          <ion-col size=\"3\">\r\n            <h3>\r\n              <ion-skeleton-text animated style=\"width: 60%;margin: auto;\"></ion-skeleton-text>\r\n            </h3>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </ng-template>\r\n       </div>\r\n   \r\n  </ng-template>\r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/admin-best-sellers/admin-best-sellers.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/admin/admin-best-sellers/admin-best-sellers.module.ts ***!
  \***********************************************************************/
/*! exports provided: AdminBestSellersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminBestSellersPageModule", function() { return AdminBestSellersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_best_sellers_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-best-sellers.page */ "./src/app/admin/admin-best-sellers/admin-best-sellers.page.ts");
/* harmony import */ var _best_sellers_modal_best_sellers_modal_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../best-sellers-modal/best-sellers-modal.page */ "./src/app/admin/best-sellers-modal/best-sellers-modal.page.ts");








const routes = [
    {
        path: '',
        component: _admin_best_sellers_page__WEBPACK_IMPORTED_MODULE_6__["AdminBestSellersPage"]
    }
];
let AdminBestSellersPageModule = class AdminBestSellersPageModule {
};
AdminBestSellersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_admin_best_sellers_page__WEBPACK_IMPORTED_MODULE_6__["AdminBestSellersPage"], _best_sellers_modal_best_sellers_modal_page__WEBPACK_IMPORTED_MODULE_7__["BestSellersModalPage"]],
        entryComponents: [_best_sellers_modal_best_sellers_modal_page__WEBPACK_IMPORTED_MODULE_7__["BestSellersModalPage"]]
    })
], AdminBestSellersPageModule);



/***/ }),

/***/ "./src/app/admin/admin-best-sellers/admin-best-sellers.page.scss":
/*!***********************************************************************!*\
  !*** ./src/app/admin/admin-best-sellers/admin-best-sellers.page.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-col.img {\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.name {\n  width: calc(100% - 310px);\n  max-width: calc(100% - 300px);\n}\n\nion-col.action {\n  width: 128px;\n  max-width: 100px;\n}\n\nion-col.reorder {\n  width: 75px;\n  max-width: 75px;\n}\n\n.show-best-seller {\n  display: -webkit-box;\n  display: flex;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tYmVzdC1zZWxsZXJzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcYWRtaW4tYmVzdC1zZWxsZXJzXFxhZG1pbi1iZXN0LXNlbGxlcnMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZG1pbi1iZXN0LXNlbGxlcnMvYWRtaW4tYmVzdC1zZWxsZXJzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQ0NGOztBRENBO0VBQ0UseUJBQUE7RUFDQSw2QkFBQTtBQ0VGOztBREFBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0FDR0Y7O0FEREE7RUFDRSxXQUFBO0VBQ0EsZUFBQTtBQ0lGOztBRERBO0VBQWtCLG9CQUFBO0VBQUEsYUFBQTtBQ0tsQiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2FkbWluLWJlc3Qtc2VsbGVycy9hZG1pbi1iZXN0LXNlbGxlcnMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbC5pbWd7XHJcbiAgd2lkdGg6IDEwMHB4O1xyXG4gIG1heC13aWR0aDogMTAwcHg7XHJcbn1cclxuaW9uLWNvbC5uYW1le1xyXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAzMTBweCk7XHJcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSAzMDBweCk7XHJcbn1cclxuaW9uLWNvbC5hY3Rpb257XHJcbiAgd2lkdGg6IDEyOHB4O1xyXG4gIG1heC13aWR0aDogMTAwcHg7XHJcbn1cclxuaW9uLWNvbC5yZW9yZGVye1xyXG4gIHdpZHRoOiA3NXB4O1xyXG4gIG1heC13aWR0aDogNzVweDtcclxufVxyXG5cclxuLnNob3ctYmVzdC1zZWxsZXJ7ZGlzcGxheTogZmxleDt9IiwiaW9uLWNvbC5pbWcge1xuICB3aWR0aDogMTAwcHg7XG4gIG1heC13aWR0aDogMTAwcHg7XG59XG5cbmlvbi1jb2wubmFtZSB7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAzMTBweCk7XG4gIG1heC13aWR0aDogY2FsYygxMDAlIC0gMzAwcHgpO1xufVxuXG5pb24tY29sLmFjdGlvbiB7XG4gIHdpZHRoOiAxMjhweDtcbiAgbWF4LXdpZHRoOiAxMDBweDtcbn1cblxuaW9uLWNvbC5yZW9yZGVyIHtcbiAgd2lkdGg6IDc1cHg7XG4gIG1heC13aWR0aDogNzVweDtcbn1cblxuLnNob3ctYmVzdC1zZWxsZXIge1xuICBkaXNwbGF5OiBmbGV4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/admin-best-sellers/admin-best-sellers.page.ts":
/*!*********************************************************************!*\
  !*** ./src/app/admin/admin-best-sellers/admin-best-sellers.page.ts ***!
  \*********************************************************************/
/*! exports provided: AdminBestSellersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminBestSellersPage", function() { return AdminBestSellersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _best_sellers_modal_best_sellers_modal_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../best-sellers-modal/best-sellers-modal.page */ "./src/app/admin/best-sellers-modal/best-sellers-modal.page.ts");
/* harmony import */ var src_app_services_best_sellers_best_sellers_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/best-sellers/best-sellers.service */ "./src/app/services/best-sellers/best-sellers.service.ts");






let AdminBestSellersPage = class AdminBestSellersPage {
    constructor(events, router, alertController, loadingController, modalController, toastController, bestSellersService) {
        this.events = events;
        this.router = router;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.modalController = modalController;
        this.toastController = toastController;
        this.bestSellersService = bestSellersService;
        this.bsProducts = [];
        this.noBestSellerProducts = false;
    }
    ngOnInit() {
        this.initializeSubscriptions();
        this.events.publish('best-sellers:getBestSellers');
    }
    ionViewWillEnter() {
        this.events.publish('best-sellers:getBestSellersActiveStatus');
        this.events.subscribe('best-sellers:publishBestSellersActiveStatus', (status) => {
            // //console.log('status from db', status);
            if (!this.isEmptyObj(status)) {
                this.bestSellersActiveStatus = status.isActive;
                this.status = status.isActive;
            }
            else {
                this.bestSellersActiveStatus = true;
                this.status = true;
            }
        });
    }
    ionViewWillLeave() {
        this.events.unsubscribe('best-sellers:publishBestSellersActiveStatus');
    }
    ngOnDestroy() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('best-sellers:publishBestSellers', (bestSellers) => {
            this.bsProducts = bestSellers;
            this.noBestSellerProducts = false;
            // //console.log('this.bsProducts', this.bsProducts);
        });
        this.events.subscribe('best-sellers:noBestSellers', () => {
            this.noBestSellerProducts = true;
        });
        this.events.subscribe('best-sellers:changeBestSellersStatusSuccess', () => {
            this.loading.dismiss();
            this.presentToast('Status changed successfully!');
        });
        this.events.subscribe('best-sellers:deleteBestSellerProductSuccess', () => {
            this.loading.dismiss();
            this.presentAlert('Product deleted from best seller successfully!');
        });
        this.events.subscribe('best-sellers:updateBestSellersPositionSuccess', () => {
            this.loading.dismiss();
        });
    }
    isEmptyObj(object) {
        for (var key in object) {
            if (object.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    addNewBestSellerProduct() {
        this.modalController.create({
            component: _best_sellers_modal_best_sellers_modal_page__WEBPACK_IMPORTED_MODULE_4__["BestSellersModalPage"],
            cssClass: 'custom-modal'
        })
            .then(modalEl => {
            modalEl.present();
        });
    }
    changeBestSellersStatus() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.status) {
                yield this.presentLoading();
                this.status = false;
                this.events.publish('best-sellers:changeBestSellersStatus', this.status);
            }
            else {
                yield this.presentLoading();
                this.status = true;
                this.events.publish('best-sellers:changeBestSellersStatus', this.status);
            }
        });
    }
    deleteBestSellerProductConfirm(id, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Are you sure you want to delete this best seller product?',
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
                            this.deleteBestSellerProduct(id);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    deleteBestSellerProduct(id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('best-sellers:deleteBestSellerProduct', id);
        });
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Please Wait...',
                duration: 10000
            });
            yield this.loading.present();
        });
    }
    presentAlert(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
    presentToast(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: msg,
                duration: 2000
            });
            toast.present();
        });
    }
    onReorderBestSeller(event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            // //console.log(`Moving product from ${event.detail.from} to ${event.detail.to}`);
            const start = event.detail.from;
            // tslint:disable-next-line: variable-name
            const id = this.bsProducts[start].id;
            // //console.log('categoriesLength', this.bsProducts.length);
            // //console.log('start', start);
            const end = event.detail.to;
            // //console.log('end', end);
            if (start < end && end !== this.bsProducts.length - 1) {
                // //console.log('from top to mid');
                const firstDate = this.bsProducts[end].sortedAt.toDate().getTime();
                const secondDate = this.bsProducts[end + 1].sortedAt.toDate().getTime();
                // //console.log('fistdate', firstDate);
                // //console.log('seconddate', secondDate);
                const changedDate = (firstDate + secondDate) / 2;
                // //console.log('finalDate', new Date(changedDate));
                this.bestSellersService.updateBestSellersPosition(id, new Date(changedDate));
            }
            // tslint:disable-next-line: one-line
            else if (start < end && end === this.bsProducts.length - 1) {
                // //console.log('from top to bottom');
                const changedDate = this.bsProducts[end].sortedAt.toDate().getTime() - 5 * 60000;
                this.bestSellersService.updateBestSellersPosition(id, new Date(changedDate));
            }
            // tslint:disable-next-line: one-line
            else if (start > end && end !== 0) {
                // //console.log('from bottom to mid');
                const firstDate = this.bsProducts[end].sortedAt.toDate().getTime();
                const secondDate = this.bsProducts[end - 1].sortedAt.toDate().getTime();
                // //console.log('fistdate', firstDate);
                // //console.log('seconddate', secondDate);
                const changedDate = (firstDate + secondDate) / 2;
                // //console.log('finalDate', new Date(changedDate));
                this.bestSellersService.updateBestSellersPosition(id, new Date(changedDate));
            }
            // tslint:disable-next-line: one-line
            else {
                // //console.log('from bottom to top');
                const changedDate = this.bsProducts[end].sortedAt.toDate().getTime() + 5 * 60000;
                this.bestSellersService.updateBestSellersPosition(id, new Date(changedDate));
            }
            const draggedItem = this.bsProducts.splice(event.detail.from, 1)[0];
            this.bsProducts.splice(event.detail.to, 0, draggedItem);
            event.detail.complete();
        });
    }
    removeSubscriptions() {
        this.events.unsubscribe('best-sellers:publishBestSellers');
        this.events.unsubscribe('best-sellers:noBestSellers');
        this.events.unsubscribe('best-sellers:changeBestSellersStatusSuccess');
        this.events.unsubscribe('best-sellers:deleteBestSellerProductSuccess');
        this.events.unsubscribe('best-sellers:updateBestSellersPositionSuccess');
        this.events.publish('best-sellers:removeSubscriptions');
    }
};
AdminBestSellersPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
    { type: src_app_services_best_sellers_best_sellers_service__WEBPACK_IMPORTED_MODULE_5__["BestSellersService"] }
];
AdminBestSellersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-admin-best-sellers',
        template: __webpack_require__(/*! raw-loader!./admin-best-sellers.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-best-sellers/admin-best-sellers.page.html"),
        styles: [__webpack_require__(/*! ./admin-best-sellers.page.scss */ "./src/app/admin/admin-best-sellers/admin-best-sellers.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
        src_app_services_best_sellers_best_sellers_service__WEBPACK_IMPORTED_MODULE_5__["BestSellersService"]])
], AdminBestSellersPage);



/***/ })

}]);
//# sourceMappingURL=admin-admin-best-sellers-admin-best-sellers-module-es2015.js.map