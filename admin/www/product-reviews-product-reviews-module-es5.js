(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["product-reviews-product-reviews-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/product-reviews/product-reviews.page.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/product-reviews/product-reviews.page.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Product Review Management</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container fixed-height\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=\"12\">\r\n          <div>\r\n            <ion-grid class=\"ion-no-padding data-table ion-text-center\" *ngIf=\"products.length\">\r\n              <ion-row class=\"ion-text-capitalize\">\r\n                <ion-col size=\"4\">Product</ion-col>\r\n                <ion-col size=\"8\">Reviews</ion-col>\r\n              </ion-row>\r\n\r\n              <ion-row *ngFor=\"let product of products; let i=index;\">\r\n                <ng-container *ngIf=\"product.ratings.length\">\r\n                  <ion-col size=\"4\" class=\"vertical-center\">\r\n                    <div class=\"vertical-center\">\r\n                      <ion-thumbnail style=\"margin-right: 20px;\" class=\"thumbnail\">\r\n                        <img class=\"loading\" *ngIf=\"product.coverPic\"\r\n                          src=\"{{product.coverPic.thumb}}\">\r\n                      </ion-thumbnail>\r\n                      {{product.prodName}}\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"8\" class=\"t-a-l\">\r\n                    <ng-container *ngFor=\"let rating of product.ratings; let j=index\">\r\n                      <div style=\"display: flex; padding-left: 10px;\">\r\n                        <div style=\"width: 80%;\">\r\n                          <h6><b>{{rating.userName}}</b></h6>\r\n                          <ionic4-star-rating activeIcon=\"ios-star\" defaultIcon=\"ios-star-outline\"\r\n                            [activeColor]=\"getStarColor(rating.rating)\" defaultColor=\"#e1e1e1\" readonly=\"true\"\r\n                            [rating]=\"rating.rating\" fontSize=\"15px\" halfStar='true'>\r\n                          </ionic4-star-rating>\r\n                          <p class=\"user-rating-review\">{{rating.review}}</p>\r\n                          <div class=\"user-rating-photos\" *ngIf=\"rating.photos && rating.photos.length\">\r\n                            <ion-img [src]=\"photo.thumb\" *ngFor=\"let photo of rating.photos; let k=index;\"\r\n                              (click)=\"imageZoom(rating.photos, k)\"></ion-img>\r\n                          </div>\r\n                          <p class=\"user-rating-date\">Rated On {{rating.createdAt.toDate() | date:'dd MMMM yyyy'}}</p>\r\n                        </div>\r\n    \r\n                        <div style=\"width: 20%;\" class=\"vertical-center\">\r\n                          <ng-container *ngIf=\"rating.status === 'approved'\"><b class=\"green\">Approved</b></ng-container>\r\n                          <ng-container *ngIf=\"rating.status !== 'approved'\">\r\n                            <ion-button (click)=\"approve(product.id, rating.id, i,j)\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n                              Approve\r\n                            </ion-button>\r\n                          </ng-container>\r\n                        </div>\r\n                      </div>\r\n                      <hr class=\"line\" *ngIf=\"product.ratings.length - 1 !== j\">\r\n                    </ng-container>\r\n                  </ion-col>\r\n                </ng-container>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/product-reviews/product-reviews.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/product-reviews/product-reviews.module.ts ***!
  \***********************************************************/
/*! exports provided: ProductReviewsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductReviewsPageModule", function() { return ProductReviewsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _product_reviews_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product-reviews.page */ "./src/app/product-reviews/product-reviews.page.ts");
/* harmony import */ var ionic4_star_rating__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ionic4-star-rating */ "./node_modules/ionic4-star-rating/dist/index.js");








var routes = [
    {
        path: '',
        component: _product_reviews_page__WEBPACK_IMPORTED_MODULE_6__["ProductReviewsPage"]
    }
];
var ProductReviewsPageModule = /** @class */ (function () {
    function ProductReviewsPageModule() {
    }
    ProductReviewsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                ionic4_star_rating__WEBPACK_IMPORTED_MODULE_7__["StarRatingModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_product_reviews_page__WEBPACK_IMPORTED_MODULE_6__["ProductReviewsPage"]]
        })
    ], ProductReviewsPageModule);
    return ProductReviewsPageModule;
}());



/***/ }),

/***/ "./src/app/product-reviews/product-reviews.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/product-reviews/product-reviews.page.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".green {\n  color: var(--ion-color-success);\n}\n\nh6 {\n  margin-top: 0px;\n}\n\n.data-table ion-col {\n  border: 1px solid gray;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n\n.data-table ion-row:first-child {\n  background: lightgray;\n}\n\n.user-rating-photos ion-img {\n  cursor: pointer;\n  width: 100px;\n  height: 100px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvZHVjdC1yZXZpZXdzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxwcm9kdWN0LXJldmlld3NcXHByb2R1Y3QtcmV2aWV3cy5wYWdlLnNjc3MiLCJzcmMvYXBwL3Byb2R1Y3QtcmV2aWV3cy9wcm9kdWN0LXJldmlld3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksK0JBQUE7QUNDSjs7QURDQTtFQUNFLGVBQUE7QUNFRjs7QURDSTtFQUNBLHNCQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtBQ0VKOztBRENFO0VBQ0UscUJBQUE7QUNDSjs7QURHRTtFQUNFLGVBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtBQ0FKIiwiZmlsZSI6InNyYy9hcHAvcHJvZHVjdC1yZXZpZXdzL3Byb2R1Y3QtcmV2aWV3cy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZ3JlZW57XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG59XHJcbmg2e1xyXG4gIG1hcmdpbi10b3A6IDBweDtcclxufVxyXG4uZGF0YS10YWJsZXsgIFxyXG4gICAgaW9uLWNvbHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XHJcbiAgICBwYWRkaW5nLXRvcDogMTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4XHJcbiAgfVxyXG4gIFxyXG4gIGlvbi1yb3c6Zmlyc3QtY2hpbGR7XHJcbiAgICBiYWNrZ3JvdW5kOiBsaWdodGdyYXlcclxuICB9XHJcbn1cclxuLnVzZXItcmF0aW5nLXBob3Rvc3tcclxuICBpb24taW1ne1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgaGVpZ2h0OiAxMDBweDtcclxuICB9XHJcbn0iLCIuZ3JlZW4ge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xufVxuXG5oNiB7XG4gIG1hcmdpbi10b3A6IDBweDtcbn1cblxuLmRhdGEtdGFibGUgaW9uLWNvbCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbn1cbi5kYXRhLXRhYmxlIGlvbi1yb3c6Zmlyc3QtY2hpbGQge1xuICBiYWNrZ3JvdW5kOiBsaWdodGdyYXk7XG59XG5cbi51c2VyLXJhdGluZy1waG90b3MgaW9uLWltZyB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgd2lkdGg6IDEwMHB4O1xuICBoZWlnaHQ6IDEwMHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/product-reviews/product-reviews.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/product-reviews/product-reviews.page.ts ***!
  \*********************************************************/
/*! exports provided: ProductReviewsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductReviewsPage", function() { return ProductReviewsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var _services_product_product_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/product/product.service */ "./src/app/services/product/product.service.ts");
/* harmony import */ var _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");






var ProductReviewsPage = /** @class */ (function () {
    function ProductReviewsPage(productService, modalController, sharedService) {
        this.productService = productService;
        this.modalController = modalController;
        this.sharedService = sharedService;
        this.products = [];
    }
    ProductReviewsPage.prototype.ngOnInit = function () {
    };
    ProductReviewsPage.prototype.ionViewWillEnter = function () {
        this.initializeSubscriptions();
    };
    ProductReviewsPage.prototype.initializeSubscriptions = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var products, _i, products_1, product, ratings;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.presentLoading('Please Wait...', 10000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.productService.getProductsWithRating()];
                    case 2:
                        products = _a.sent();
                        _i = 0, products_1 = products;
                        _a.label = 3;
                    case 3:
                        if (!(_i < products_1.length)) return [3 /*break*/, 6];
                        product = products_1[_i];
                        return [4 /*yield*/, this.productService.getRatings(product.id)];
                    case 4:
                        ratings = _a.sent();
                        //  && product.rating && Object.keys(product.rating).length
                        if (ratings.length) {
                            product.ratings = ratings;
                            console.log('product:::', product);
                        }
                        else {
                            product.ratings = [];
                        }
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        this.products = products;
                        console.log('productsWithRating:', products);
                        if (this.sharedService.loading) {
                            console.log('dismiss');
                            this.sharedService.loading.dismiss();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductReviewsPage.prototype.getStarColor = function (rating) {
        if (rating >= 3) {
            return '#20c020';
        }
        else if (rating < 3 && rating >= 2) {
            return '#FF9F00';
        }
        else {
            return '#ff6161';
        }
    };
    // async viewReview(prodIndex, ratingIndex){
    //   const modal = await this.modalController.create({
    //   component: ProductReviewPage,
    //   cssClass:'custom-modal',
    //   showBackdrop: true,
    //   backdropDismiss: false,
    //   componentProps: { ratingDetails: this.products[prodIndex].ratings[ratingIndex] }
    //   });
    //   modal.onDidDismiss()
    //   .then((res) => {
    //     console.log('data from modal', res);
    //     if(res.data) {
    //       if (res.data.approved) {
    //         this.approve(prodIndex, ratingIndex);
    //       }
    //     }
    // });
    //   await modal.present();
    // }
    ProductReviewsPage.prototype.approve = function (prodIndex, ratingIndex, i, j) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var approved;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.productService.updateRating(prodIndex, ratingIndex, { status: 'approved' })];
                    case 1:
                        approved = _a.sent();
                        if (approved) {
                            this.products[i].ratings[j].status = 'approved';
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductReviewsPage.prototype.imageZoom = function (images, index) {
        this.modalController.create({
            component: _image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_3__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: images,
                index: index
            }
        }).then(function (modal) { return modal.present(); });
    };
    ProductReviewsPage.ctorParameters = function () { return [
        { type: _services_product_product_service__WEBPACK_IMPORTED_MODULE_4__["ProductService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"] }
    ]; };
    ProductReviewsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-product-reviews',
            template: __webpack_require__(/*! raw-loader!./product-reviews.page.html */ "./node_modules/raw-loader/index.js!./src/app/product-reviews/product-reviews.page.html"),
            styles: [__webpack_require__(/*! ./product-reviews.page.scss */ "./src/app/product-reviews/product-reviews.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_product_product_service__WEBPACK_IMPORTED_MODULE_4__["ProductService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"]])
    ], ProductReviewsPage);
    return ProductReviewsPage;
}());



/***/ })

}]);
//# sourceMappingURL=product-reviews-product-reviews-module-es5.js.map