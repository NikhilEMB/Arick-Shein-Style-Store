(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-offer-settings-offer-settings-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/offer-settings/offer-settings.page.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/offer-settings/offer-settings.page.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Offers Setting</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-no-padding\">\r\n  <div class=\"main-container\">\r\n\r\n    <div class=\"no-data ion-text-center\" *ngIf=\"allOffers && allOffers.length < 1\">\r\n      <img src=\"assets/img/no-category.png\" alt=\"\">\r\n      <h6>No Offers</h6>\r\n    </div>\r\n    \r\n    <!-- no data -->\r\n\r\n    <!-- heading -->\r\n    <div class=\"list-header\" *ngIf=\"allOffers && allOffers.length > 0\">\r\n      <ion-grid class=\"ion-no-padding\">\r\n        <ion-row >\r\n          <ion-col class=\"img\">\r\n            <p>image</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>name</p>\r\n          </ion-col>\r\n          <ion-col class=\"name\">\r\n            <p>Actions</p>\r\n          </ion-col>\r\n          <ion-col class=\"reorder\">\r\n            <p>reorder</p>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n      </div>\r\n      <!-- heading -->\r\n\r\n      <!-- categories list -->\r\n    <div class=\"list-container\" *ngIf=\"allOffers && allOffers.length > 0\">\r\n    \r\n    <ion-list class=\"ion-no-padding row-border\">\r\n      <ion-reorder-group (ionItemReorder)=\"onReorderOffers($event)\" disabled=\"false\" class=\"ion-no-padding\">\r\n        <ion-item *ngFor=\"let offer of allOffers; let i = index\">\r\n          <ion-grid class=\"ion-no-padding\">\r\n            <ion-row >\r\n              <ion-col  class=\"img\">\r\n                <ion-thumbnail style=\"margin-left: 5%;\" class=\"thumbnail\" *ngIf=\"offer.images.length\">\r\n                  <img *ngIf=\"!offer.images[0].mob && offer.images[0].url\" img-preloader=\"{{offer.images[0].url}}\">\r\n                  <img *ngIf=\"offer.images[0].mob\" img-preloader=\"{{offer.images[0].mob}}\">\r\n                </ion-thumbnail>\r\n                <ion-thumbnail style=\"margin-left: 5%;\" class=\"thumbnail\" *ngIf=\"!offer.images.length\">\r\n                  <img src='assets/img/img-preloader.png'>\r\n                </ion-thumbnail>\r\n              </ion-col>\r\n              <ion-col class=\"name\">\r\n                <p class=\"ion-text-capitalize\">{{offer.name}}</p>\r\n              </ion-col>\r\n              <ion-col class=\"action\">\r\n                <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"editOffer(offer)\">\r\n                  <i class=\"flaticon-pencil-edit-button\" slot=\"icon-only\"></i>\r\n                </ion-button>\r\n                <ion-button class=\"action-btn\" fill=\"clear\" (click)=\"deleteOfferConfirm(offer.id)\">\r\n                  <i class=\"flaticon-null-21\" slot=\"icon-only\"></i>\r\n                </ion-button>\r\n              </ion-col>\r\n              <ion-col class=\"reorder\">\r\n                <ion-reorder>\r\n                  <div class=\"flat-sort\">\r\n                    <i class=\"flaticon-menu\"></i>\r\n                  </div>\r\n                </ion-reorder>\r\n             \r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </ion-item>\r\n      </ion-reorder-group>\r\n    </ion-list>\r\n   \r\n    </div>\r\n    <div class=\"page-footer\">\r\n      <ion-row class=\"ion-justify-content-center\">\r\n        <ion-button (click)=\"addOffer()\" fill=\"outline\" shape=\"round\" size=\"small\">\r\n          Add Offer\r\n        </ion-button>\r\n      </ion-row>\r\n    </div>\r\n\r\n  \r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/offer-settings/offer-settings.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/offer-settings/offer-settings.module.ts ***!
  \***************************************************************/
/*! exports provided: OfferSettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfferSettingsPageModule", function() { return OfferSettingsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _offer_settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offer-settings.page */ "./src/app/admin/offer-settings/offer-settings.page.ts");
/* harmony import */ var src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/directives/application-directives.module */ "./src/app/directives/application-directives.module.ts");








var routes = [
    {
        path: '',
        component: _offer_settings_page__WEBPACK_IMPORTED_MODULE_6__["OfferSettingsPage"]
    }
];
var OfferSettingsPageModule = /** @class */ (function () {
    function OfferSettingsPageModule() {
    }
    OfferSettingsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                src_app_directives_application_directives_module__WEBPACK_IMPORTED_MODULE_7__["ApplicationDirectivesModule"]
            ],
            declarations: [_offer_settings_page__WEBPACK_IMPORTED_MODULE_6__["OfferSettingsPage"]]
        })
    ], OfferSettingsPageModule);
    return OfferSettingsPageModule;
}());



/***/ }),

/***/ "./src/app/admin/offer-settings/offer-settings.page.scss":
/*!***************************************************************!*\
  !*** ./src/app/admin/offer-settings/offer-settings.page.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ion-thumbnail {\n  width: 100%;\n  height: auto;\n}\n\nion-col.img {\n  width: 100px;\n  max-width: 100px;\n}\n\nion-col.name {\n  width: calc(100% - 310px);\n  max-width: calc(100% - 300px);\n}\n\nion-col.action {\n  width: 128px;\n  max-width: 100px;\n}\n\nion-col.reorder {\n  width: 75px;\n  max-width: 75px;\n}\n\n.page-footer {\n  margin-top: 50px;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vb2ZmZXItc2V0dGluZ3MvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxvZmZlci1zZXR0aW5nc1xcb2ZmZXItc2V0dGluZ3MucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9vZmZlci1zZXR0aW5ncy9vZmZlci1zZXR0aW5ncy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0UsWUFBQTtBQ0NKOztBREVBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0FDQ0Y7O0FEQ0E7RUFDRSx5QkFBQTtFQUNBLDZCQUFBO0FDRUY7O0FEQUE7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUNHRjs7QUREQTtFQUNFLFdBQUE7RUFDQSxlQUFBO0FDSUY7O0FEREE7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0FDSUYiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9vZmZlci1zZXR0aW5ncy9vZmZlci1zZXR0aW5ncy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW9uLXRodW1ibmFpbHtcclxuICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogYXV0bztcclxufVxyXG5cclxuaW9uLWNvbC5pbWd7XHJcbiAgd2lkdGg6IDEwMHB4O1xyXG4gIG1heC13aWR0aDogMTAwcHg7XHJcbn1cclxuaW9uLWNvbC5uYW1le1xyXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAzMTBweCk7XHJcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSAzMDBweCk7XHJcbn1cclxuaW9uLWNvbC5hY3Rpb257XHJcbiAgd2lkdGg6IDEyOHB4O1xyXG4gIG1heC13aWR0aDogMTAwcHg7XHJcbn1cclxuaW9uLWNvbC5yZW9yZGVye1xyXG4gIHdpZHRoOiA3NXB4O1xyXG4gIG1heC13aWR0aDogNzVweDtcclxufVxyXG5cclxuLnBhZ2UtZm9vdGVye1xyXG4gIG1hcmdpbi10b3A6NTBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcblxyXG5cclxuIiwiLmlvbi10aHVtYm5haWwge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBhdXRvO1xufVxuXG5pb24tY29sLmltZyB7XG4gIHdpZHRoOiAxMDBweDtcbiAgbWF4LXdpZHRoOiAxMDBweDtcbn1cblxuaW9uLWNvbC5uYW1lIHtcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDMxMHB4KTtcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSAzMDBweCk7XG59XG5cbmlvbi1jb2wuYWN0aW9uIHtcbiAgd2lkdGg6IDEyOHB4O1xuICBtYXgtd2lkdGg6IDEwMHB4O1xufVxuXG5pb24tY29sLnJlb3JkZXIge1xuICB3aWR0aDogNzVweDtcbiAgbWF4LXdpZHRoOiA3NXB4O1xufVxuXG4ucGFnZS1mb290ZXIge1xuICBtYXJnaW4tdG9wOiA1MHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/offer-settings/offer-settings.page.ts":
/*!*************************************************************!*\
  !*** ./src/app/admin/offer-settings/offer-settings.page.ts ***!
  \*************************************************************/
/*! exports provided: OfferSettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfferSettingsPage", function() { return OfferSettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_offer_offer_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/offer/offer.service */ "./src/app/services/offer/offer.service.ts");





var OfferSettingsPage = /** @class */ (function () {
    function OfferSettingsPage(events, loadingController, alertController, toastController, router, offerService) {
        this.events = events;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.toastController = toastController;
        this.router = router;
        this.offerService = offerService;
        this.showLoader = true;
        this.allOffers = [];
    }
    OfferSettingsPage.prototype.ngOnInit = function () {
        this.initializeSubscriptions();
        this.events.publish('offer:getOffers');
    };
    OfferSettingsPage.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    OfferSettingsPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('offer:publishOffers', function (offers) {
            _this.showLoader = false;
            _this.allOffers = offers;
        });
        this.events.subscribe('offer:updateOffersPostionSucess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
        });
        this.events.subscribe('offer:deleteOfferSucess', function () {
            _this.loading.dismiss();
            _this.presentAlert('Offer deleted successfully!');
        });
    };
    OfferSettingsPage.prototype.addOffer = function () {
        this.router.navigate(['offer-create']);
    };
    OfferSettingsPage.prototype.onReorderOffers = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var start, id, end, firstDate, secondDate, changedDate, changedDate, firstDate, secondDate, changedDate, changedDate, draggedItem;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading('Please wait...', 3000)];
                    case 1:
                        _a.sent();
                        start = event.detail.from;
                        id = this.allOffers[start].id;
                        end = event.detail.to;
                        //console.log('end', end);
                        if (start < end && end !== this.allOffers.length - 1) {
                            firstDate = this.allOffers[end].sortedAt.toDate().getTime();
                            secondDate = this.allOffers[end + 1].sortedAt.toDate().getTime();
                            changedDate = (firstDate + secondDate) / 2;
                            //console.log('finalDate', new Date(changedDate));
                            this.offerService.updateOffersPosition(id, new Date(changedDate));
                        }
                        // tslint:disable-next-line: one-line
                        else if (start < end && end === this.allOffers.length - 1) {
                            changedDate = this.allOffers[end].sortedAt.toDate().getTime() - 5 * 60000;
                            this.offerService.updateOffersPosition(id, new Date(changedDate));
                        }
                        // tslint:disable-next-line: one-line
                        else if (start > end && end !== 0) {
                            firstDate = this.allOffers[end].sortedAt.toDate().getTime();
                            secondDate = this.allOffers[end - 1].sortedAt.toDate().getTime();
                            changedDate = (firstDate + secondDate) / 2;
                            //console.log('finalDate', new Date(changedDate));
                            this.offerService.updateOffersPosition(id, new Date(changedDate));
                        }
                        // tslint:disable-next-line: one-line
                        else {
                            changedDate = this.allOffers[end].sortedAt.toDate().getTime() + 5 * 60000;
                            this.offerService.updateOffersPosition(id, new Date(changedDate));
                        }
                        draggedItem = this.allOffers.splice(event.detail.from, 1)[0];
                        this.allOffers.splice(event.detail.to, 0, draggedItem);
                        event.detail.complete();
                        return [2 /*return*/];
                }
            });
        });
    };
    OfferSettingsPage.prototype.editOffer = function (offer) {
        var navigationExtras = {
            state: {
                offerData: offer
            }
        };
        this.router.navigate(['offer-create'], navigationExtras);
    };
    OfferSettingsPage.prototype.deleteOfferConfirm = function (oid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Are you sure you want to delete this offer?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        //console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Delete',
                                    handler: function () {
                                        //console.log('Confirm Okay');
                                        _this.deleteOffer(oid);
                                    }
                                }
                            ]
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
    OfferSettingsPage.prototype.deleteOffer = function (oid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading('Deleting offer...', 5000)];
                    case 1:
                        _a.sent();
                        this.events.publish('offer:deleteOffer', oid);
                        return [2 /*return*/];
                }
            });
        });
    };
    OfferSettingsPage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: [{
                                    text: 'OK',
                                    handler: function () {
                                        _this.router.navigate(['offer-settings']);
                                    }
                                }]
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
    OfferSettingsPage.prototype.presentLoading = function (msg, duration) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: msg,
                                duration: duration
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
    OfferSettingsPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('offer:publishOffers');
        this.events.unsubscribe('offer:updateOffersPostionSucess');
        this.events.unsubscribe('offer:deleteOfferSucess');
    };
    OfferSettingsPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: src_app_services_offer_offer_service__WEBPACK_IMPORTED_MODULE_4__["OfferService"] }
    ]; };
    OfferSettingsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-offer-settings',
            template: __webpack_require__(/*! raw-loader!./offer-settings.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/offer-settings/offer-settings.page.html"),
            styles: [__webpack_require__(/*! ./offer-settings.page.scss */ "./src/app/admin/offer-settings/offer-settings.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            src_app_services_offer_offer_service__WEBPACK_IMPORTED_MODULE_4__["OfferService"]])
    ], OfferSettingsPage);
    return OfferSettingsPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-offer-settings-offer-settings-module-es5.js.map