(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-brands-all-brands-all-brands-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-brands/all-brands/all-brands.page.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-brands/all-brands/all-brands.page.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <div class=\"search-bx\">\r\n      <ion-searchbar mode=\"ios\" placeholder=\"Search Brands\" [(ngModel)]=\"searchBrand\"></ion-searchbar>\r\n    </div>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n      <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"goToAddNew('add-brand')\">\r\n        <ion-icon name=\"add-circle\" slot=\"start\"></ion-icon>\r\n        Add new Brand\r\n      </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <!-- no data -->\r\n    <div class=\"no-data ion-text-center\" *ngIf=\"showNoBrands\">\r\n      <img src=\"assets/img/no-category.png\" alt=\"\">\r\n      <h6>No categories</h6>\r\n    </div>\r\n    \r\n    <!-- no data -->\r\n\r\n    <!-- heading -->\r\n    <div class=\"list-header\" *ngIf=\"!showNoBrands\">\r\n      <ion-grid class=\"ion-no-padding\">\r\n        <ion-row >\r\n          <ion-col class=\"img\">\r\n            <p>image</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>name</p>\r\n          </ion-col>\r\n          <ion-col class=\"action\">\r\n            <p>Action</p>\r\n          </ion-col>\r\n          <ion-col class=\"reorder\">\r\n            <p>reorder</p>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n      </div>\r\n      <!-- heading -->\r\n\r\n      <!-- categories list -->\r\n    <div class=\"list-container\">\r\n    \r\n    <ion-list class=\"ion-no-padding row-border\" *ngIf=\"brands && brands.length !== 0 && !showNoBrands\"> \r\n      <ion-reorder-group (ionItemReorder)=\"onRenderBrands($event)\" disabled=\"false\" class=\"ion-no-padding\">\r\n        <ion-item *ngFor=\"let brand of brands | filter:searchBrand; let i = index\">\r\n          <ion-grid class=\"ion-no-padding\">\r\n            <ion-row >\r\n              <ion-col  class=\"img\">\r\n                <ion-thumbnail style=\"margin-left: 5%;\" class=\"thumbnail\">\r\n                  <img *ngIf=\"brand.image && !brand.image.thumb && brand.image.url\" img-preloader=\"{{brand.image.url}}\">\r\n                  <img *ngIf=\"brand.image && brand.image.thumb\" img-preloader=\"{{brand.image.thumb}}\">\r\n                  <img *ngIf=\"brand.image && !brand.image.thumb && !brand.image.url\" src=\"assets/img/img-preloader.png\">\r\n                </ion-thumbnail>\r\n              </ion-col>\r\n              <ion-col class=\"name\">\r\n                <div [ngClass]=\"{'category-active': brand.status, 'category-inactive': !brand.status}\">\r\n                </div>\r\n                <p class=\"ion-text-capitalize\">{{brand.name}}</p>\r\n              </ion-col>\r\n              <ion-col class=\"action\">\r\n                <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"editBrand(brand)\">\r\n                  <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\"></i>\r\n                </ion-button>\r\n                <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"deleteBrandConfirm(brand.id, i)\">\r\n                  <i class=\"flaticon-null-21\" slot=\"icon-only\"></i>\r\n                </ion-button>\r\n              </ion-col>\r\n              <ion-col class=\"reorder\">\r\n                <ion-reorder>\r\n                  <div class=\"flat-sort\">\r\n                    <i class=\"flaticon-menu\"></i>\r\n                  </div>\r\n                </ion-reorder>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </ion-item>\r\n      </ion-reorder-group>\r\n    </ion-list>\r\n    <ion-grid *ngIf=\"brands.length === 0 && !showNoBrands\">\r\n      <ion-row class=\"row-background\" *ngFor=\"let x of [1,2,3,4,5,6,7,8,9,10]\">\r\n        <ion-col size=\"3\">\r\n          <ion-thumbnail>\r\n            <ion-skeleton-text style=\"margin: auto;\"></ion-skeleton-text>\r\n          </ion-thumbnail>\r\n        </ion-col>\r\n        <ion-col size=\"6\">\r\n          <h3>\r\n            <ion-skeleton-text animated style=\"width: 90%;margin: auto;\"></ion-skeleton-text>\r\n          </h3>\r\n        </ion-col>\r\n        <ion-col size=\"3\">\r\n          <h3>\r\n            <ion-skeleton-text animated style=\"width: 60%;margin: auto;\"></ion-skeleton-text>\r\n          </h3>\r\n\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n    </div>\r\n    <!-- categories list -->\r\n    </div>\r\n</ion-content>\r\n\r\n"

/***/ }),

/***/ "./src/app/admin/admin-brands/all-brands/all-brands.module.ts":
/*!********************************************************************!*\
  !*** ./src/app/admin/admin-brands/all-brands/all-brands.module.ts ***!
  \********************************************************************/
/*! exports provided: AllBrandsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllBrandsPageModule", function() { return AllBrandsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _directives_application_directives_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../directives/application-directives.module */ "./src/app/directives/application-directives.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _all_brands_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./all-brands.page */ "./src/app/admin/admin-brands/all-brands/all-brands.page.ts");
/* harmony import */ var src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/components/shared.module */ "./src/app/components/shared.module.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.js");










const routes = [
    {
        path: '',
        component: _all_brands_page__WEBPACK_IMPORTED_MODULE_7__["AllBrandsPage"]
    }
];
let AllBrandsPageModule = class AllBrandsPageModule {
};
AllBrandsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild(routes),
            src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
            _directives_application_directives_module__WEBPACK_IMPORTED_MODULE_1__["ApplicationDirectivesModule"],
            ng2_search_filter__WEBPACK_IMPORTED_MODULE_9__["Ng2SearchPipeModule"]
        ],
        declarations: [_all_brands_page__WEBPACK_IMPORTED_MODULE_7__["AllBrandsPage"]]
    })
], AllBrandsPageModule);



/***/ }),

/***/ "./src/app/admin/admin-brands/all-brands/all-brands.page.scss":
/*!********************************************************************!*\
  !*** ./src/app/admin/admin-brands/all-brands/all-brands.page.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ion-thumbnail {\n  width: 100%;\n  height: auto;\n}\n\nion-col.img {\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.name {\n  width: calc(100% - 310px);\n  max-width: calc(100% - 300px);\n}\n\nion-col.action {\n  width: 128px;\n  max-width: 100px;\n}\n\nion-col.reorder {\n  width: 75px;\n  max-width: 75px;\n}\n\n.product-active {\n  background-color: green;\n  width: 8px;\n  height: 8px;\n  min-width: 8px;\n  border-radius: 30px;\n  border: 1px solid green;\n  margin-right: 10%;\n}\n\n.product-inactive {\n  background-color: red;\n  width: 8px;\n  height: 8px;\n  min-width: 8px;\n  border-radius: 30px;\n  border: 1px solid red;\n  margin-right: 10%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tYnJhbmRzL2FsbC1icmFuZHMvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxhZG1pbi1icmFuZHNcXGFsbC1icmFuZHNcXGFsbC1icmFuZHMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZG1pbi1icmFuZHMvYWxsLWJyYW5kcy9hbGwtYnJhbmRzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDRSxZQUFBO0FDQ0o7O0FERUE7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUNDRjs7QURDQTtFQUNFLHlCQUFBO0VBQ0EsNkJBQUE7QUNFRjs7QURBQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQ0dGOztBRERBO0VBQ0UsV0FBQTtFQUNBLGVBQUE7QUNJRjs7QURGQTtFQUNFLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGlCQUFBO0FDS0Y7O0FESEE7RUFDRSxxQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtBQ01GIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vYWRtaW4tYnJhbmRzL2FsbC1icmFuZHMvYWxsLWJyYW5kcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW9uLXRodW1ibmFpbHtcclxuICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogYXV0bztcclxufVxyXG5cclxuaW9uLWNvbC5pbWd7XHJcbiAgd2lkdGg6IDEwMHB4O1xyXG4gIG1heC13aWR0aDogMTAwcHg7XHJcbn1cclxuaW9uLWNvbC5uYW1le1xyXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAzMTBweCk7XHJcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSAzMDBweCk7XHJcbn1cclxuaW9uLWNvbC5hY3Rpb257XHJcbiAgd2lkdGg6IDEyOHB4O1xyXG4gIG1heC13aWR0aDogMTAwcHg7XHJcbn1cclxuaW9uLWNvbC5yZW9yZGVye1xyXG4gIHdpZHRoOiA3NXB4O1xyXG4gIG1heC13aWR0aDogNzVweDtcclxufVxyXG4ucHJvZHVjdC1hY3RpdmUge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xyXG4gIHdpZHRoOiA4cHg7XHJcbiAgaGVpZ2h0OiA4cHg7XHJcbiAgbWluLXdpZHRoOiA4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCBncmVlbjtcclxuICBtYXJnaW4tcmlnaHQ6IDEwJTtcclxufVxyXG4ucHJvZHVjdC1pbmFjdGl2ZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xyXG4gIHdpZHRoOiA4cHg7XHJcbiAgaGVpZ2h0OiA4cHg7XHJcbiAgbWluLXdpZHRoOiA4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XHJcbiAgbWFyZ2luLXJpZ2h0OiAxMCU7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCIuaW9uLXRodW1ibmFpbCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbmlvbi1jb2wuaW1nIHtcbiAgd2lkdGg6IDEwMHB4O1xuICBtYXgtd2lkdGg6IDEwMHB4O1xufVxuXG5pb24tY29sLm5hbWUge1xuICB3aWR0aDogY2FsYygxMDAlIC0gMzEwcHgpO1xuICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDMwMHB4KTtcbn1cblxuaW9uLWNvbC5hY3Rpb24ge1xuICB3aWR0aDogMTI4cHg7XG4gIG1heC13aWR0aDogMTAwcHg7XG59XG5cbmlvbi1jb2wucmVvcmRlciB7XG4gIHdpZHRoOiA3NXB4O1xuICBtYXgtd2lkdGg6IDc1cHg7XG59XG5cbi5wcm9kdWN0LWFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xuICB3aWR0aDogOHB4O1xuICBoZWlnaHQ6IDhweDtcbiAgbWluLXdpZHRoOiA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyZWVuO1xuICBtYXJnaW4tcmlnaHQ6IDEwJTtcbn1cblxuLnByb2R1Y3QtaW5hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gIHdpZHRoOiA4cHg7XG4gIGhlaWdodDogOHB4O1xuICBtaW4td2lkdGg6IDhweDtcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xuICBtYXJnaW4tcmlnaHQ6IDEwJTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/admin-brands/all-brands/all-brands.page.ts":
/*!******************************************************************!*\
  !*** ./src/app/admin/admin-brands/all-brands/all-brands.page.ts ***!
  \******************************************************************/
/*! exports provided: AllBrandsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllBrandsPage", function() { return AllBrandsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/brands/brands.service */ "./src/app/services/brands/brands.service.ts");





let AllBrandsPage = class AllBrandsPage {
    constructor(modalController, events, router, loadingController, alertController, brandsService, platform) {
        this.modalController = modalController;
        this.events = events;
        this.router = router;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.brandsService = brandsService;
        this.platform = platform;
        this.brands = [];
        this.searchBrand = '';
        this.showNoBrands = false;
        this.showSearch = false;
    }
    onRenderBrands(event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading('Updating Position...', 5000);
            console.log(`Moving category from ${event.detail.from} to ${event.detail.to}`);
            const start = event.detail.from;
            // tslint:disable-next-line: variable-name
            const id = this.brands[start].id;
            console.log('brandsLength', this.brands.length);
            console.log('start', start);
            const end = event.detail.to;
            console.log('end', end);
            if (start < end && end !== this.brands.length - 1) {
                console.log('from top to mid');
                const firstDate = this.brands[end].sortedAt.toDate().getTime();
                const secondDate = this.brands[end + 1].sortedAt.toDate().getTime();
                console.log('fistdate', firstDate);
                console.log('seconddate', secondDate);
                const changedDate = (firstDate + secondDate) / 2;
                console.log('finalDate', new Date(changedDate));
                this.brandsService.updateBrandsPosition(id, new Date(changedDate));
            }
            // tslint:disable-next-line: one-line
            else if (start < end && end === this.brands.length - 1) {
                console.log('from top to bottom');
                const changedDate = this.brands[end].sortedAt.toDate().getTime() - 5 * 60000;
                this.brandsService.updateBrandsPosition(id, new Date(changedDate));
            }
            // tslint:disable-next-line: one-line
            else if (start > end && end !== 0) {
                console.log('from bottom to mid');
                const firstDate = this.brands[end].sortedAt.toDate().getTime();
                const secondDate = this.brands[end - 1].sortedAt.toDate().getTime();
                console.log('fistdate', firstDate);
                console.log('seconddate', secondDate);
                const changedDate = (firstDate + secondDate) / 2;
                console.log('finalDate', new Date(changedDate));
                this.brandsService.updateBrandsPosition(id, new Date(changedDate));
            }
            // tslint:disable-next-line: one-line
            else {
                console.log('from bottom to top');
                const changedDate = this.brands[end].sortedAt.toDate().getTime() + 5 * 60000;
                this.brandsService.updateBrandsPosition(id, new Date(changedDate));
            }
            const draggedItem = this.brands.splice(event.detail.from, 1)[0];
            this.brands.splice(event.detail.to, 0, draggedItem);
            event.detail.complete();
        });
    }
    ionViewWillEnter() {
        this.devHeight = this.platform.height();
        this.events.publish('brands:getAllBrandsForAdmin');
        this.initializeSubscriptions();
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
        this.showSearch = false;
    }
    ngOnInit() { }
    initializeSubscriptions() {
        console.log('in initializeSubscriptions');
        this.events.subscribe('brands:publishAllBrandsForAdmin', (brands) => {
            this.showNoBrands = false;
            this.brands = brands;
            console.log('brands', brands);
        });
        this.events.subscribe('brands:noBrandAvailableForAdmin', () => {
            console.log('noBrandAvailable');
            this.showNoBrands = true;
        });
        this.events.subscribe('brands:updateBrandsPostionSucess', () => {
            if (this.loading) {
                this.loading.dismiss();
            }
        });
        this.events.subscribe('brands:deleteBrandSuccess', () => {
            if (this.loading) {
                this.loading.dismiss();
            }
            this.presentAlert('Brand deleted successfully!');
        });
    }
    editBrand(brand) {
        const navigationExtras = {
            state: {
                brandData: brand
            }
        };
        this.router.navigate(['add-brand'], navigationExtras);
    }
    goToAddNew(page) {
        this.router.navigate([page]);
    }
    deleteBrandConfirm(bid, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Are you sure you want to delete this category',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Delete',
                        handler: () => {
                            console.log('Confirm Okay');
                            this.deleteBrand(bid, index);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    deleteBrand(bid, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading('Deleting brand...', 5000);
            this.events.publish('brands:deleteBrand', bid);
            this.brands.splice(index, 1);
        });
    }
    clearsearchBrand() {
        this.searchBrand = null;
    }
    presentAlert(desc) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: desc,
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    presentLoading(msg, drn) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: msg,
                duration: drn
            });
            yield this.loading.present();
        });
    }
    removeSubscriptions() {
        this.events.unsubscribe('brands:publishAllBrandsForAdmin');
        this.events.unsubscribe('brands:noBrandAvailableForAdmin');
        this.events.unsubscribe('brands:updateBrandsPostionSucess');
        this.events.unsubscribe('brands:deleteBrandSuccess');
    }
};
AllBrandsPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_4__["BrandsService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
], AllBrandsPage.prototype, "content", void 0);
AllBrandsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-all-brands',
        template: __webpack_require__(/*! raw-loader!./all-brands.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-brands/all-brands/all-brands.page.html"),
        styles: [__webpack_require__(/*! ./all-brands.page.scss */ "./src/app/admin/admin-brands/all-brands/all-brands.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        src_app_services_brands_brands_service__WEBPACK_IMPORTED_MODULE_4__["BrandsService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"]])
], AllBrandsPage);



/***/ })

}]);
//# sourceMappingURL=admin-admin-brands-all-brands-all-brands-module-es2015.js.map