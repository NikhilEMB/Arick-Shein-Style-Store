(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-free-products-free-products-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/free-products/free-products.page.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/free-products/free-products.page.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Free product</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container fixed-height\">\r\n    <ion-grid class=\"ion-no-padding\">\r\n      <ion-row>\r\n        <ion-col size=\"12\">\r\n          <div>\r\n            <div class=\"flex-label\">\r\n              <ion-label>Active</ion-label>\r\n              <ion-toggle [(ngModel)]=\"freeProductsLimit\" (ionChange)=\"toggleActive()\"></ion-toggle>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n      <ng-container *ngIf=\"freeProductsLimit\">\r\n      <ion-row *ngIf=\"limits.length > 0\">\r\n        <ion-col size=\"2\">\r\n          <p>Order Amount Limit</p>\r\n        </ion-col>\r\n        <ion-col size=\"2\" >\r\n          <p>Per User Limit</p>\r\n        </ion-col>\r\n        <ion-col size=\"5\" >\r\n          <p>Product</p>\r\n        </ion-col>\r\n        <ion-col size=\"1\" class=\"t-a-c\">\r\n          <p>Active</p>\r\n        </ion-col>\r\n        <ion-col size=\"2\" class=\"t-a-c\">\r\n          Action\r\n        </ion-col>\r\n      </ion-row>\r\n      \r\n        <ion-row *ngFor=\"let limit of limits; let i = index\">\r\n          <ion-col size=\"2\">\r\n              <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"limit.orderAmount\"></ion-input>\r\n          </ion-col>\r\n          <ion-col size=\"2\">\r\n              <ion-input class=\"form-input\" type=\"number\" [(ngModel)]=\"limit.perUser\"></ion-input>\r\n          </ion-col>\r\n          <ion-col size=\"5\">\r\n              <ion-input class=\"form-input\" (click)=\"presentProductsModal(i)\" value=\"{{limit.product.name}} {{limit.product.variant ? limit.product.variant : ''}}\" readonly></ion-input>\r\n          </ion-col>\r\n          <ion-col size=\"1\" class=\"vertical-center\">\r\n            <ion-toggle color=\"primary\" [(ngModel)]=\"limit.active\"></ion-toggle>\r\n          </ion-col>\r\n          <ion-col size=\"2\" class=\"vertical-center\" style=\"justify-content: space-around;\">\r\n            <ion-button (click)=\"remove(i, limit)\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n              Remove\r\n            </ion-button>\r\n            <ion-button (click)=\"saveDetails(limit)\" color=\"success\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n              Save\r\n            </ion-button>\r\n            <!-- <i class=\"flaticon-null-19 remove-icon\" (click)=\"remove(i)\"></i> -->\r\n          </ion-col>\r\n        </ion-row>\r\n      <ion-row class=\"ion-justify-content-center\">\r\n        <ion-button (click)=\"addMore()\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n          Add More Order Limits\r\n        </ion-button>\r\n      </ion-row>\r\n    </ng-container>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>\r\n\r\n"

/***/ }),

/***/ "./src/app/admin/free-products/free-products.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/admin/free-products/free-products.module.ts ***!
  \*************************************************************/
/*! exports provided: FreeProductsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FreeProductsPageModule", function() { return FreeProductsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _free_products_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./free-products.page */ "./src/app/admin/free-products/free-products.page.ts");







var routes = [
    {
        path: '',
        component: _free_products_page__WEBPACK_IMPORTED_MODULE_6__["FreeProductsPage"]
    }
];
var FreeProductsPageModule = /** @class */ (function () {
    function FreeProductsPageModule() {
    }
    FreeProductsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_free_products_page__WEBPACK_IMPORTED_MODULE_6__["FreeProductsPage"]]
        })
    ], FreeProductsPageModule);
    return FreeProductsPageModule;
}());



/***/ }),

/***/ "./src/app/admin/free-products/free-products.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/admin/free-products/free-products.page.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".remove-icon {\n  cursor: pointer;\n  margin-top: 12px;\n  margin-left: 5px;\n  color: var(--ion-color-danger);\n  font-size: 16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vZnJlZS1wcm9kdWN0cy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGZyZWUtcHJvZHVjdHNcXGZyZWUtcHJvZHVjdHMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9mcmVlLXByb2R1Y3RzL2ZyZWUtcHJvZHVjdHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2ZyZWUtcHJvZHVjdHMvZnJlZS1wcm9kdWN0cy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucmVtb3ZlLWljb257XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiAxMnB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICB9IiwiLnJlbW92ZS1pY29uIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBtYXJnaW4tdG9wOiAxMnB4O1xuICBtYXJnaW4tbGVmdDogNXB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/free-products/free-products.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/admin/free-products/free-products.page.ts ***!
  \***********************************************************/
/*! exports provided: FreeProductsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FreeProductsPage", function() { return FreeProductsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_admin_settings_admin_settings_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/admin-settings/admin-settings.service */ "./src/app/services/admin-settings/admin-settings.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var _products_modal_products_modal_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../products-modal/products-modal.page */ "./src/app/admin/products-modal/products-modal.page.ts");






var FreeProductsPage = /** @class */ (function () {
    function FreeProductsPage(sharedService, modalController, adminSettings) {
        this.sharedService = sharedService;
        this.modalController = modalController;
        this.adminSettings = adminSettings;
        this.freeProductsLimit = false;
        this.limits = [
            {
                active: true,
                createdAt: new Date(),
                orderAmount: 0,
                perUser: 1,
                product: {
                    type: '',
                    id: '',
                    name: ''
                }
            }
        ];
    }
    FreeProductsPage.prototype.ngOnInit = function () { };
    FreeProductsPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var obj;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminSettings.getFreeProdLimit()];
                    case 1:
                        obj = _a.sent();
                        console.log('obj:', obj);
                        if (obj.freeProdLimit) {
                            this.freeProductsLimit = obj.freeProdLimit.active ? obj.freeProdLimit.active : this.freeProductsLimit;
                        }
                        this.limits = obj.limits ? obj.limits : this.limits;
                        return [2 /*return*/];
                }
            });
        });
    };
    FreeProductsPage.prototype.toggleActive = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminSettings.saveFreeProdLimit({ active: this.freeProductsLimit })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FreeProductsPage.prototype.addMore = function () {
        this.limits.push({ active: true, createdAt: new Date(), orderAmount: 0, perUser: 1, product: { type: '', id: '', name: '' } });
    };
    FreeProductsPage.prototype.remove = function (index, limit) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var deleted;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminSettings.deleteFreeProdLimit(limit)];
                    case 1:
                        deleted = _a.sent();
                        if (deleted) {
                            this.limits.splice(index, 1);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FreeProductsPage.prototype.presentProductsModal = function (index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _products_modal_products_modal_page__WEBPACK_IMPORTED_MODULE_5__["ProductsModalPage"],
                            backdropDismiss: false,
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (res) {
                            console.log('res.data', res);
                            // if(res.data && res.data.id) {
                            //   console.log('res.data',res.data);
                            //   this.limits[index].product.id = res.data.id;
                            //   this.limits[index].product.name = res.data.name;
                            //   if (res.data.variant) {
                            //     this.limits[index].product['variant'] = res.data.variant;
                            //     this.limits[index].product.type = 'variant';
                            //   } else{
                            //     this.limits[index].product.type = 'single';
                            //     delete this.limits[index].product['variant'];
                            //   }
                            //   console.log('variant:', this.limits[index].product['variant']);
                            // }
                            if (res.data && res.data && res.data.length) {
                                for (var _i = 0, _a = res.data; _i < _a.length; _i++) {
                                    var product = _a[_i];
                                    console.log('res.data', res.data);
                                    _this.limits[index].product.id = product.id;
                                    _this.limits[index].product.name = product.name;
                                    console.log("res.data.variant", product.variant);
                                    if (product.variant) {
                                        _this.limits[index].product['variant'] = product.variant;
                                        _this.limits[index].product.type = 'variant';
                                    }
                                    else {
                                        _this.limits[index].product.type = 'single';
                                        delete _this.limits[index].product['variant'];
                                    }
                                }
                                console.log('variant:', _this.limits[index].product['variant']);
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FreeProductsPage.prototype.saveDetails = function (limit) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var saved, obj;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(limit.orderAmount != null && limit.product.id && limit.perUser)) return [3 /*break*/, 5];
                        this.sharedService.presentLoading();
                        return [4 /*yield*/, this.adminSettings.saveFreeProdLimits(limit)];
                    case 1:
                        saved = _a.sent();
                        if (!saved.success) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.adminSettings.getFreeProdLimit()];
                    case 2:
                        obj = _a.sent();
                        this.limits = obj.limits ? obj.limits : this.limits;
                        if (this.sharedService.loading) {
                            this.sharedService.loading.dismiss();
                        }
                        this.sharedService.presentAlert("Order Amount of " + limit.orderAmount + " with free product " + limit.product.name + " saved sucessfully.");
                        return [3 /*break*/, 4];
                    case 3:
                        if (this.sharedService.loading) {
                            this.sharedService.loading.dismiss();
                        }
                        this.sharedService.presentAlert('Something went wrong. Please try again later');
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.sharedService.presentAlert('Order Amount, product & per user limit cant be empty, either remove the field or fill them');
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FreeProductsPage.ctorParameters = function () { return [
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: src_app_services_admin_settings_admin_settings_service__WEBPACK_IMPORTED_MODULE_3__["AdminSettingsService"] }
    ]; };
    FreeProductsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-free-products',
            template: __webpack_require__(/*! raw-loader!./free-products.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/free-products/free-products.page.html"),
            styles: [__webpack_require__(/*! ./free-products.page.scss */ "./src/app/admin/free-products/free-products.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"], src_app_services_admin_settings_admin_settings_service__WEBPACK_IMPORTED_MODULE_3__["AdminSettingsService"]])
    ], FreeProductsPage);
    return FreeProductsPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-free-products-free-products-module-es5.js.map