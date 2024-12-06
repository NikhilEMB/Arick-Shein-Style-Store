(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor-membership-vendor-membership-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/vendor-membership/vendor-membership.page.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/vendor-membership/vendor-membership.page.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Vendor Membership</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs no-shadow no-border>\r\n\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Current Vendors</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Membership Settings / Plans</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <super-tabs-container>\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <ng-container *ngIf=\"membershipVendors.length; else noMembershipVendors\">\r\n            <!-- <div class=\"resultArea\">\r\n              <table>\r\n                <thead>\r\n                  <th>Name</th>\r\n                  <th>Plan Price ({{currencyCode}})</th>\r\n                  <th>Plan Discounted Price ({{currencyCode}})</th>\r\n                  <th>Discount</th>\r\n                  <th>Max Discount ({{currencyCode}})</th>\r\n                  <th>Free Delivery</th>\r\n                  <th>Free Delivery</th>\r\n                  <th>Delivery Fee as Cashback</th>\r\n                  <th>Delivery Free Above Amount ({{currencyCode}})</th>\r\n                  <th>Initial Cashback ({{currencyCode}})</th>\r\n                  <th>Months</th>\r\n                  <th>Valid Till</th>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let vendor of membershipVendors; index as i\">\r\n                    <td>\r\n                      <div slot=\"start\"\r\n                        [ngStyle]=\"{'background': 'url(' + vendor.products[0].img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n                        class=\"productImage\">\r\n                      </div>\r\n                    </td>\r\n                    <td>\r\n                      <p class=\"aud-product-name ion-text-wrap\">\r\n                        {{vendor.products[0].name}}\r\n                        <span *ngIf=\"vendor.products.length > 1\"><br>( +{{vendor.products.length - 1}} more )</span>\r\n                      </p>\r\n                    </td>\r\n                    <td>\r\n                      <div>ORD: {{vendor.vendorId}}</div>\r\n                    </td>\r\n                    <td>\r\n                      <p class=\"aud-product-price ion-text-wrap\">\r\n                        {{vendor.totalAmountToPaid}}\r\n                      </p>\r\n                    </td>\r\n                    <td>\r\n                      <p>{{vendor.status}}<span>&nbsp;<i class=\"flaticon-null-20\"></i></span></p>\r\n                    </td>\r\n                    <td>\r\n                      <p>{{vendor.deliveryAgentId ? \"Reassign\" : \"None\"}}</p>\r\n                    </td>\r\n                    <td>\r\n                      <div class=\"placedOn\" *ngIf=\"vendor?.createdAt\">\r\n                        {{vendor.createdAt.toDate() | date}} by <span>{{vendor.userName}}</span>\r\n                      </div>\r\n                      <ion-text *ngIf=\"!vendor.createdAt\">--</ion-text>\r\n                    </td>\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n            </div> -->\r\n          </ng-container>\r\n\r\n          <ng-template #noMembershipVendors>\r\n            <div class=\"noData\" text-center>\r\n              <img src=\"assets/img/no-user.png\" alt=\"\">\r\n              <h6>No Vendor with membership active</h6>\r\n            </div>\r\n          </ng-template>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <ion-grid>\r\n            <!-- Save Button -->\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div style=\"text-align: center;\">\r\n                  <ion-button (click)=\"saveSettings()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n                    <i class=\"flaticon-null-20 margin-icon\"></i>\r\n                    Save\r\n                  </ion-button>\r\n                  <br><br>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n\r\n            <!-- Membership Settings -->\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"toggle\">\r\n                  <div class=\"flex\">\r\n                    <div class=\"toggle-btn\">\r\n                      <label class=\"switch\">\r\n                        <input type=\"checkbox\" [checked]=\"membershipSettings.active\" (click)=\"toggleCheckbox()\">\r\n                        <span class=\"slider round\"></span>\r\n                      </label>\r\n                    </div>\r\n                    <ion-label>Active</ion-label>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <div class=\"flex-space-between\">\r\n                    <ion-label for=\"\">Name</ion-label>\r\n                  </div>\r\n                  <ion-input class=\"form-input\" type=\"text\" [(ngModel)]=\"membershipSettings.name\"\r\n                    placeholder=\"Section name\">\r\n                  </ion-input>\r\n                </div>\r\n              </ion-col>\r\n\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <div class=\"flex-space-between\">\r\n                    <ion-label for=\"\">Description</ion-label>\r\n                    <br>\r\n                    <br>\r\n                  </div>\r\n                  <ckeditor class=\"form-input\" [(ngModel)]=\"membershipSettings.description\" [config]=\"ckeConfig\">\r\n                  </ckeditor>\r\n                </div>\r\n              </ion-col>\r\n\r\n            </ion-row>\r\n\r\n            <!-- Membership Plans -->\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div style=\"text-align: center;\">\r\n                  <h4>Membership Plans</h4>\r\n                  <ion-button (click)=\"addPlan()\" fill=\"outline\">Add Plan</ion-button>\r\n                </div>\r\n              </ion-col>\r\n\r\n              <ng-container *ngIf=\"membershipSettings.plans.length; else noPlans\">\r\n                <ion-col size=\"12\">\r\n                  <div class=\"resultArea\">\r\n                    <table>\r\n                      <thead>\r\n                        <th>Name</th>\r\n                        <th>Months</th>\r\n                        <th>Price ({{currencyCode}})</th>\r\n                        <th>Discounted Price ({{currencyCode}})</th>\r\n                        <th>Remove</th>\r\n                      </thead>\r\n                      <tbody>\r\n                        <tr *ngFor=\"let plan of membershipSettings.plans; index as i\">\r\n                          <td>\r\n                            <p>{{plan.name}}</p>\r\n                          </td>\r\n                          <td>\r\n                            <p>{{plan.months}}</p>\r\n                          </td>\r\n                          <td>\r\n                            <p>{{plan.price}}</p>\r\n                          </td>\r\n                          <td>\r\n                            <p>{{plan.discountedPrice}}</p>\r\n                          </td>\r\n                          <td>\r\n                            <ion-button (click)=\"removePlan(i)\" size=\"small\" fill=\"outline\" shape=\"round\">\r\n                              <i class=\"flaticon-null-17\"></i>\r\n                            </ion-button>\r\n                          </td>\r\n                        </tr>\r\n                      </tbody>\r\n                    </table>\r\n                  </div>\r\n                </ion-col>\r\n              </ng-container>\r\n\r\n              <ng-template #noPlans>\r\n                <ion-col size=\"12\">\r\n                  <div text-center style=\"margin-top: 1rem;\">\r\n                    <img src=\"assets/img/no-product.png\" style=\"max-width:130px;\" alt=\"\">\r\n                    <h6>No Plans</h6>\r\n                  </div>\r\n                </ion-col>\r\n              </ng-template>\r\n            </ion-row>\r\n          </ion-grid>\r\n\r\n        </div>\r\n      </ion-content>\r\n\r\n      <!-- <ion-footer no-border class=\"page-footer\">\r\n        <div class=\"main-container\">\r\n          <ion-button (click)=\"saveSettings()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n            <i class=\"flaticon-null-20 margin-icon\"></i>\r\n            Save\r\n          </ion-button>\r\n        </div>\r\n      </ion-footer> -->\r\n    </super-tab>\r\n  </super-tabs-container>\r\n\r\n</super-tabs>"

/***/ }),

/***/ "./src/app/vendor-membership/vendor-membership.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/vendor-membership/vendor-membership.module.ts ***!
  \***************************************************************/
/*! exports provided: VendorMembershipPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VendorMembershipPageModule", function() { return VendorMembershipPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _vendor_membership_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vendor-membership.page */ "./src/app/vendor-membership/vendor-membership.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");









var routes = [
    {
        path: '',
        component: _vendor_membership_page__WEBPACK_IMPORTED_MODULE_6__["VendorMembershipPage"]
    }
];
var VendorMembershipPageModule = /** @class */ (function () {
    function VendorMembershipPageModule() {
    }
    VendorMembershipPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"],
                ng2_ckeditor__WEBPACK_IMPORTED_MODULE_8__["CKEditorModule"]
            ],
            declarations: [_vendor_membership_page__WEBPACK_IMPORTED_MODULE_6__["VendorMembershipPage"]]
        })
    ], VendorMembershipPageModule);
    return VendorMembershipPageModule;
}());



/***/ }),

/***/ "./src/app/vendor-membership/vendor-membership.page.scss":
/*!***************************************************************!*\
  !*** ./src/app/vendor-membership/vendor-membership.page.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-button i {\n  line-height: 0;\n}\n\n.flex {\n  display: -webkit-box;\n  display: flex;\n  gap: 8px;\n}\n\n.flexJustify {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-bottom: 1rem;\n}\n\n.resultArea {\n  margin-top: 1rem;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  padding: 0.5rem;\n}\n\n.resultArea table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.resultArea table td,\n.resultArea table th {\n  text-align: left;\n  padding: 8px;\n  max-width: 100px;\n}\n\n.resultArea table tr:hover {\n  border-radius: 6px;\n  background-color: #efefef;\n}\n\n.noData {\n  text-align: center;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n\n.noData img {\n  width: 130px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmVuZG9yLW1lbWJlcnNoaXAvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXHZlbmRvci1tZW1iZXJzaGlwXFx2ZW5kb3ItbWVtYmVyc2hpcC5wYWdlLnNjc3MiLCJzcmMvYXBwL3ZlbmRvci1tZW1iZXJzaGlwL3ZlbmRvci1tZW1iZXJzaGlwLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUNFLGNBQUE7QUNBSjs7QURJQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLFFBQUE7QUNERjs7QURJQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsbUJBQUE7QUNERjs7QURJQTtFQUNFLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUNERjs7QURHRTtFQUNFLHlCQUFBO0VBQ0EsV0FBQTtBQ0RKOztBREdJOztFQUVFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FDRE47O0FETUk7RUFDRSxrQkFBQTtFQUNBLHlCQUFBO0FDSk47O0FEU0E7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSx3Q0FBQTtVQUFBLGdDQUFBO0FDTkY7O0FET0U7RUFDRSxZQUFBO0FDTEoiLCJmaWxlIjoic3JjL2FwcC92ZW5kb3ItbWVtYmVyc2hpcC92ZW5kb3ItbWVtYmVyc2hpcC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tYnV0dG9uIHtcclxuICBpIHtcclxuICAgIGxpbmUtaGVpZ2h0OiAwO1xyXG4gIH1cclxufVxyXG5cclxuLmZsZXgge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiA4cHg7XHJcbn1cclxuXHJcbi5mbGV4SnVzdGlmeSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG59XHJcblxyXG4ucmVzdWx0QXJlYSB7XHJcbiAgbWFyZ2luLXRvcDogMXJlbTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBwYWRkaW5nOiAwLjVyZW07XHJcblxyXG4gIHRhYmxlIHtcclxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuXHJcbiAgICB0ZCxcclxuICAgIHRoIHtcclxuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgICAgcGFkZGluZzogOHB4O1xyXG4gICAgICBtYXgtd2lkdGg6IDEwMHB4O1xyXG4gICAgfVxyXG4gICAgLy8gdHI6bnRoLWNoaWxkKGV2ZW4pIHtcclxuICAgIC8vICAgYmFja2dyb3VuZC1jb2xvcjogI2RkZGRkZDtcclxuICAgIC8vIH1cclxuICAgIHRyOmhvdmVyIHtcclxuICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLm5vRGF0YSB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDUwJTtcclxuICBsZWZ0OiA1MCU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgaW1nIHtcclxuICAgIHdpZHRoOiAxMzBweDtcclxuICB9XHJcbn1cclxuIiwiaW9uLWJ1dHRvbiBpIHtcbiAgbGluZS1oZWlnaHQ6IDA7XG59XG5cbi5mbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA4cHg7XG59XG5cbi5mbGV4SnVzdGlmeSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuLnJlc3VsdEFyZWEge1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbn1cbi5yZXN1bHRBcmVhIHRhYmxlIHtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgd2lkdGg6IDEwMCU7XG59XG4ucmVzdWx0QXJlYSB0YWJsZSB0ZCxcbi5yZXN1bHRBcmVhIHRhYmxlIHRoIHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgcGFkZGluZzogOHB4O1xuICBtYXgtd2lkdGg6IDEwMHB4O1xufVxuLnJlc3VsdEFyZWEgdGFibGUgdHI6aG92ZXIge1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7XG59XG5cbi5ub0RhdGEge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG59XG4ubm9EYXRhIGltZyB7XG4gIHdpZHRoOiAxMzBweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/vendor-membership/vendor-membership.page.ts":
/*!*************************************************************!*\
  !*** ./src/app/vendor-membership/vendor-membership.page.ts ***!
  \*************************************************************/
/*! exports provided: VendorMembershipPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VendorMembershipPage", function() { return VendorMembershipPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/vendor/vendor.service */ "./src/app/services/vendor/vendor.service.ts");






var VendorMembershipPage = /** @class */ (function () {
    function VendorMembershipPage(configService, alertController, sharedService, vendorService) {
        this.configService = configService;
        this.alertController = alertController;
        this.sharedService = sharedService;
        this.vendorService = vendorService;
        this.membershipSettings = {
            active: false,
            name: "",
            description: "",
            plans: [],
        };
        this.membershipVendors = [];
    }
    VendorMembershipPage.prototype.ngOnInit = function () {
        this.currencyCode = this.configService.environment.currencyCode;
        this.ckeConfig = {
            allowedContent: true,
            height: 150
        };
    };
    VendorMembershipPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var response;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.vendorService.getVendorMembership()];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, this.sharedService.loading.dismiss()];
                    case 3:
                        _a.sent();
                        if (!response) return [3 /*break*/, 4];
                        this.membershipSettings = response;
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.sharedService.presentAlert('Something went wrong ! please try again.')];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    VendorMembershipPage.prototype.toggleCheckbox = function () {
        this.membershipSettings.active = !this.membershipSettings.active;
    };
    VendorMembershipPage.prototype.addPlan = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            subHeader: 'Plan Details',
                            inputs: [
                                {
                                    name: 'name',
                                    type: 'text',
                                    placeholder: 'Name of plan'
                                },
                                {
                                    name: 'months',
                                    type: 'number',
                                    placeholder: 'Number of Months'
                                },
                                {
                                    name: 'price',
                                    type: 'number',
                                    placeholder: 'Enter price'
                                },
                                {
                                    name: 'discountedPrice',
                                    type: 'number',
                                    placeholder: 'Enter discounted price'
                                },
                            ],
                            buttons: [
                                {
                                    text: 'cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Add',
                                    handler: function (plan) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(!plan.name || !parseInt(plan.months) || !parseInt(plan.price) || !parseInt(plan.discountedPrice))) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, this.sharedService.presentAlert('Please fill all the details')];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/, false];
                                                case 2:
                                                    if (!(parseInt(plan.discountedPrice) > parseInt(plan.price))) return [3 /*break*/, 4];
                                                    return [4 /*yield*/, this.sharedService.presentAlert('Discounted price greater')];
                                                case 3:
                                                    _a.sent();
                                                    return [2 /*return*/, false];
                                                case 4:
                                                    this.membershipSettings.plans.push({
                                                        name: plan.name,
                                                        months: parseInt(plan.months),
                                                        price: parseInt(plan.price),
                                                        discountedPrice: parseInt(plan.discountedPrice),
                                                    });
                                                    console.log("plans", this.membershipSettings.plans);
                                                    _a.label = 5;
                                                case 5: return [2 /*return*/];
                                            }
                                        });
                                    }); }
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
    VendorMembershipPage.prototype.removePlan = function (i) {
        this.membershipSettings.plans.splice(i, 1);
    };
    VendorMembershipPage.prototype.saveSettings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var response;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _a.sent();
                        if (!!this.membershipSettings.name) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.sharedService.loading.dismiss()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.sharedService.presentAlert('Please enter a name')];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 4: return [4 /*yield*/, this.vendorService.saveVendorMembership(this.membershipSettings)];
                    case 5:
                        response = _a.sent();
                        return [4 /*yield*/, this.sharedService.loading.dismiss()];
                    case 6:
                        _a.sent();
                        if (!response) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.sharedService.presentAlert('Successfully Saved')];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.sharedService.presentAlert("Save failed")];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    VendorMembershipPage.ctorParameters = function () { return [
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_3__["ConfigService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] },
        { type: src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_5__["VendorService"] }
    ]; };
    VendorMembershipPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-vendor-membership',
            template: __webpack_require__(/*! raw-loader!./vendor-membership.page.html */ "./node_modules/raw-loader/index.js!./src/app/vendor-membership/vendor-membership.page.html"),
            styles: [__webpack_require__(/*! ./vendor-membership.page.scss */ "./src/app/vendor-membership/vendor-membership.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_3__["ConfigService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"],
            src_app_services_vendor_vendor_service__WEBPACK_IMPORTED_MODULE_5__["VendorService"]])
    ], VendorMembershipPage);
    return VendorMembershipPage;
}());



/***/ })

}]);
//# sourceMappingURL=vendor-membership-vendor-membership-module-es5.js.map