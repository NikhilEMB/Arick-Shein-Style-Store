(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-users-cart-users-cart-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/users-cart/users-cart.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/users-cart/users-cart.page.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n  </ion-toolbar>\r\n  <!-- <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"exportUsers()\">\r\n      Export Users\r\n    </ion-button>\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"addUser()\">\r\n      Add User\r\n    </ion-button>\r\n  </div> -->\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-no-padding\">\r\n  <div class=\"main-container\">\r\n    <!-- <div class=\"no-users\" *ngIf=\"showNoUsers\" text-center> <img src=\"assets/img/no-user.png\" alt=\"\">\r\n      <h6>No users</h6>\r\n    </div> -->\r\n    <!-- header -->\r\n    <div class=\"list-header\" *ngIf=\"!showNoUsers\">\r\n      <ion-grid class=\"ion-no-padding\">\r\n  \r\n          <ion-row style=\"display: flex;align-items: center;justify-content: space-between;\">\r\n            <!-- <ion-col size=\"6\" style=\"display: flex;align-items: center;\">\r\n              <input placeholder=\"Enter name\" [(ngModel)]=\"searchUser\" style=\"background: white;border: 1px solid;padding: 5px;\" (click)='clearPhone()' (keyup.enter)='fireSearchQuery()'>&nbsp;\r\n              <input placeholder=\"Enter number\" [(ngModel)]=\"searchUserPhone\" style=\"background: white;border: 1px solid;padding: 5px;\" (click)='clearName()' (keyup.enter)='fireSearchQuery()'>\r\n              <input placeholder=\"Enter number\" [maxlength]='phoneLimit' [(ngModel)]=\"searchUserPhone\" style=\"background: white;border: 1px solid;padding: 5px;\" (click)='clearName()'>\r\n              &nbsp;\r\n              <ion-button (click)='fireSearchQuery()' size=\"small\">Search</ion-button>&nbsp;\r\n              <ion-button (click)='showAllUsers()' size=\"small\" >Show All</ion-button>\r\n            </ion-col> -->\r\n\r\n            <ion-col class=\"searchArea\" size=\"6\">\r\n              <input class=\"searchInput\" [(ngModel)]=\"searchValue\" placeholder=\"Search by name, phone number\">\r\n              &nbsp;\r\n              <ion-button (click)='typeSenseSearchQuery()' size=\"small\">Search</ion-button>&nbsp;\r\n              <ion-button (click)='clearSearch()' size=\"small\">Show All</ion-button>\r\n            </ion-col>\r\n          </ion-row>\r\n\r\n        <ion-row>\r\n          <ion-col class=\"image\">\r\n            <p>Image</p>\r\n          </ion-col>\r\n          <ion-col class=\"user\">\r\n            <p>Name | Number</p>\r\n          </ion-col>\r\n          <ion-col class=\"cart-length\">\r\n            <p>Cart Length</p>\r\n          </ion-col>\r\n          <ion-col class=\"last-updated\">\r\n            <p>Last Updated</p>\r\n          </ion-col>\r\n          <ion-col class=\"action\">\r\n            <p>View Cart</p>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </div>\r\n    <!-- header -->\r\n\r\n    <!-- container -->\r\n    <div class=\"list-container\">\r\n      <ion-list class=\"ion-no-padding row-border\" *ngIf=\"!showLoader && !showNoUsers\">\r\n        <ng-container *ngFor=\"let user of users; let i=index\">\r\n          <ion-item *ngIf=\"user.data.role==='user'\" >\r\n            <ion-grid>\r\n              <ion-row class=\"row-background\">\r\n                <ion-col class=\"image\">\r\n                  <ion-avatar class=\"profile-pic\"\r\n                    *ngIf=\"user.data.role==='user'\"> <img\r\n                      src=\"{{user.data.dP}}\" (click)=\"imageZoom(user.data.dP)\"> </ion-avatar>\r\n                  <ion-avatar class=\"profile-pic\" *ngIf=\"user.data.role==='admin'\"> <img\r\n                      src=\"assets/img/admin-pic.png\"> </ion-avatar>\r\n                </ion-col>\r\n                <ion-col class=\"user\" (click)=\"onClickUser(user.id, user.data)\" style=\"cursor: pointer;\">\r\n                  <p>{{user.data.name}} ({{user.data.phoneNo}})</p>\r\n                </ion-col>\r\n                <ion-col class=\"cart-length\" (click)=\"onClickUser(user.id, user.data)\" style=\"cursor: pointer;\">\r\n                  <p>{{user.data.cart.total}}</p>\r\n                </ion-col>\r\n                <ion-col class=\"last-updated\" (click)=\"onClickUser(user.id, user.data)\" style=\"cursor: pointer;\">\r\n                  <p>{{getDateTimeFormat(user.data.cart.lastUpdatedAt) | date:\"medium\"}}</p>\r\n                </ion-col>\r\n                <!-- <ion-col class=\"action\">\r\n                  <ion-button class=\"btn-sml\" shape=\"round\" fill=\"outline\" (click)=\"editUserRoleAlert(user, i)\">\r\n                    Edit Role </ion-button>\r\n                    <br>\r\n                </ion-col> -->\r\n                <ion-col class=\"action\">\r\n                  <ion-button class=\"btn-sml\" shape=\"round\" fill=\"outline\" (click)=\"openModal(user.id, user.data)\">\r\n                    View \r\n                  </ion-button>\r\n                </ion-col>\r\n                <!-- <ion-col class=\"action\">\r\n                    <ion-button class=\"btn-sml\" shape=\"round\" fill=\"outline\" (click)=\"messageUser(user.id)\">\r\n                      Message User </ion-button>\r\n                </ion-col> -->\r\n              </ion-row>\r\n            </ion-grid>\r\n          </ion-item>\r\n        </ng-container>\r\n      </ion-list>\r\n      <ion-grid class=\"row-border ion-no-padding\" *ngIf=\"showLoader && !showNoUsers\">\r\n        <ion-row class=\"row-background\" *ngFor=\"let x of [1,2,3,4,5,6,7,8,9,10]\">\r\n          <ion-col size=\"3\">\r\n            <ion-avatar>\r\n              <ion-skeleton-text></ion-skeleton-text>\r\n            </ion-avatar>\r\n          </ion-col>\r\n          <ion-col size=\"3\">\r\n            <h3>\r\n              <ion-skeleton-text animated style=\"width: 70%;margin-left: -10px;\"></ion-skeleton-text>\r\n            </h3>\r\n          </ion-col>\r\n          <ion-col size=\"3\">\r\n            <h3>\r\n              <ion-skeleton-text animated style=\"width: 90%;margin-left: -5px;\"></ion-skeleton-text>\r\n            </h3>\r\n          </ion-col>\r\n          <ion-col size=\"3\">\r\n            <h3>\r\n              <ion-skeleton-text animated style=\"width: 70%;\"></ion-skeleton-text>\r\n            </h3>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n    </div>\r\n    <!-- container -->\r\n    <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadMoreUsers($event)\">\r\n      <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more users...\">\r\n      </ion-infinite-scroll-content>\r\n    </ion-infinite-scroll>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/users-cart/users-cart.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/admin/users-cart/users-cart.module.ts ***!
  \*******************************************************/
/*! exports provided: UsersCartPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersCartPageModule", function() { return UsersCartPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _users_cart_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./users-cart.page */ "./src/app/admin/users-cart/users-cart.page.ts");







const routes = [
    {
        path: '',
        component: _users_cart_page__WEBPACK_IMPORTED_MODULE_6__["UsersCartPage"]
    }
];
let UsersCartPageModule = class UsersCartPageModule {
};
UsersCartPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_users_cart_page__WEBPACK_IMPORTED_MODULE_6__["UsersCartPage"]]
    })
], UsersCartPageModule);



/***/ }),

/***/ "./src/app/admin/users-cart/users-cart.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/admin/users-cart/users-cart.page.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".list-header {\n  width: 100%;\n  max-width: 1200px;\n}\n\n.list-container {\n  margin-top: 95px;\n}\n\n.image {\n  width: 100px;\n  max-width: 100px;\n  text-align: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n\n.cart-length {\n  width: 100px;\n  max-width: 100px;\n}\n\n.last-updated {\n  width: 170px;\n  max-width: 170px;\n}\n\n.action,\n.view {\n  width: 124px;\n  max-width: 124px;\n  text-align: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n\n.user {\n  width: calc(100% - 324px);\n  max-width: 600px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vdXNlcnMtY2FydC9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXHVzZXJzLWNhcnRcXHVzZXJzLWNhcnQucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi91c2Vycy1jYXJ0L3VzZXJzLWNhcnQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtBQ0NGOztBREVBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUNFRjs7QURBQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQ0dGOztBREFBOztFQUVFLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtBQ0dGOztBREFBO0VBQ0UseUJBQUE7RUFDQSxnQkFBQTtBQ0dGIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vdXNlcnMtY2FydC91c2Vycy1jYXJ0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5saXN0LWhlYWRlciB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XHJcbn1cclxuXHJcbi5saXN0LWNvbnRhaW5lciB7XHJcbiAgbWFyZ2luLXRvcDogOTVweDtcclxufVxyXG5cclxuLmltYWdlIHtcclxuICB3aWR0aDogMTAwcHg7XHJcbiAgbWF4LXdpZHRoOiAxMDBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuLmNhcnQtbGVuZ3RoIHtcclxuICB3aWR0aDogMTAwcHg7XHJcbiAgbWF4LXdpZHRoOiAxMDBweDtcclxufVxyXG4ubGFzdC11cGRhdGVkIHtcclxuICB3aWR0aDogMTcwcHg7XHJcbiAgbWF4LXdpZHRoOiAxNzBweDtcclxufVxyXG5cclxuLmFjdGlvbixcclxuLnZpZXcge1xyXG4gIHdpZHRoOiAxMjRweDtcclxuICBtYXgtd2lkdGg6IDEyNHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLnVzZXIge1xyXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAzMjRweCk7XHJcbiAgbWF4LXdpZHRoOiA2MDBweDtcclxufVxyXG4iLCIubGlzdC1oZWFkZXIge1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XG59XG5cbi5saXN0LWNvbnRhaW5lciB7XG4gIG1hcmdpbi10b3A6IDk1cHg7XG59XG5cbi5pbWFnZSB7XG4gIHdpZHRoOiAxMDBweDtcbiAgbWF4LXdpZHRoOiAxMDBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmNhcnQtbGVuZ3RoIHtcbiAgd2lkdGg6IDEwMHB4O1xuICBtYXgtd2lkdGg6IDEwMHB4O1xufVxuXG4ubGFzdC11cGRhdGVkIHtcbiAgd2lkdGg6IDE3MHB4O1xuICBtYXgtd2lkdGg6IDE3MHB4O1xufVxuXG4uYWN0aW9uLFxuLnZpZXcge1xuICB3aWR0aDogMTI0cHg7XG4gIG1heC13aWR0aDogMTI0cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi51c2VyIHtcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDMyNHB4KTtcbiAgbWF4LXdpZHRoOiA2MDBweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/users-cart/users-cart.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/admin/users-cart/users-cart.page.ts ***!
  \*****************************************************/
/*! exports provided: UsersCartPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersCartPage", function() { return UsersCartPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_search_engine_search_engine_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/search-engine/search-engine.service */ "./src/app/services/search-engine/search-engine.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _user_cart_details_modal_user_cart_details_modal_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../user-cart-details-modal/user-cart-details-modal.page */ "./src/app/admin/user-cart-details-modal/user-cart-details-modal.page.ts");











let UsersCartPage = class UsersCartPage {
    constructor(events, router, sharedService, loadingController, alertController, configService, modalController, userService, searchEngineService) {
        this.events = events;
        this.router = router;
        this.sharedService = sharedService;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.configService = configService;
        this.modalController = modalController;
        this.userService = userService;
        this.searchEngineService = searchEngineService;
        this.searchUser = '';
        this.searchUserPhone = '';
        this.showNoUsers = false;
        this.showLoader = true;
        this.imgUrls = [];
        this.showSearch = false;
        this.noMoreUsers = false;
        this.usrOptions = [];
        this.options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            filename: 'Users',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'Exported Users',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };
        this.sortValue = 'lastAccessAt';
        this.createUserOrderEnabled = false;
        this.phoneLimit = 10;
        this.deliveryAgentUsers = [];
        this.managerUsers = [];
        this.searchValue = '';
        this.page = 0;
    }
    editUserRoleAlert(user, i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log(user);
            this.singleUser = user;
            this.usrOptions = [];
            if (user.data.role != 'manager') {
                if (user.data.active == true) {
                    this.usrOptions.push({
                        name: 'block-user',
                        type: 'radio',
                        label: 'Block User',
                        value: 'block-user'
                    });
                }
                else {
                    this.usrOptions.push({
                        name: 'unblock',
                        type: 'radio',
                        label: 'Unblock User',
                        value: 'unblock'
                    });
                }
                if (user.data.role != 'deliveryAgent') {
                    if (user.data.subRole && user.data.subRole == 'retailer') {
                        this.usrOptions.push({
                            name: 'notRetailer',
                            type: 'radio',
                            label: 'Remove Retailer',
                            value: 'notRetailer'
                        });
                    }
                    else {
                        this.usrOptions.push({
                            name: 'make-retail',
                            type: 'radio',
                            label: 'Make Retailer',
                            value: 'retailer'
                        });
                    }
                    if (user.data.subRole && user.data.subRole == 'reseller') {
                        this.usrOptions.push({
                            name: 'notReseller',
                            type: 'radio',
                            label: 'Remove Reseller',
                            value: 'notReseller'
                        });
                    }
                    else {
                        if (this.configService.environment.resellingFeature) {
                            this.usrOptions.push({
                                name: 'make-reseller',
                                type: 'radio',
                                label: 'Make Reseller',
                                value: 'reseller'
                            });
                        }
                    }
                }
            }
            if (user.data.role == "user") {
                this.usrOptions.push({
                    name: 'make-admin',
                    type: 'radio',
                    label: 'Make Admin',
                    value: 'admin',
                });
                this.usrOptions.push({
                    name: 'make-delivery-agent',
                    type: 'radio',
                    label: 'Make Delivery Agent',
                    value: 'deliveryAgent'
                });
                this.usrOptions.push({
                    name: 'make-manager',
                    type: 'radio',
                    label: 'Make Manager',
                    value: 'manager'
                });
            }
            else if (user.data.role == "admin") {
                this.usrOptions.push({
                    name: 'make-user',
                    type: 'radio',
                    label: 'Make User',
                    value: 'user'
                });
                this.usrOptions.push({
                    name: 'make-delivery-agent',
                    type: 'radio',
                    label: 'Make Delivery Agent',
                    value: 'deliveryAgent'
                });
            }
            else if (user.data.role == "manager") {
                this.usrOptions.push({
                    name: 'make-user',
                    type: 'radio',
                    label: 'Make User',
                    value: 'user'
                });
            }
            else {
                this.usrOptions.push({
                    name: 'make-user',
                    type: 'radio',
                    label: 'Make User',
                    value: 'user'
                });
                this.usrOptions.push({
                    name: 'make-admin',
                    type: 'radio',
                    label: 'Make Admin',
                    value: 'admin'
                });
            }
            const alert = yield this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'User Roles',
                inputs: this.usrOptions,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            // //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Ok',
                        handler: (data) => {
                            if (data) {
                                if (data == 'block-user') {
                                    this.blockUserConfirm(user.id, user.data.name, i);
                                }
                                else if (data == 'unblock') {
                                    this.unblockUserConfirm(user.id, user.data.name);
                                }
                                else {
                                    this.changeRoleAlert(data, user.id, user.data.name);
                                }
                            }
                            else {
                                this.presentAlert('Please select a role');
                            }
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    ngOnInit() {
        this.phoneLimit = this.configService.environment.phoneLength;
    }
    ionViewDidEnter() {
        this.createUserOrderEnabled = this.configService.environment.createUserOrder;
    }
    ionViewWillEnter() {
        this.initializeSubscriptions();
        this.events.publish('user:getUsersForAdminUsers', this.sortValue);
        this.getDeliveryAgentUsers();
        // this.getManagerUsers();
    }
    getDateTimeFormat(date) {
        // return moment(date).format('MMM D, YYYY hh:mm a');
        let formatedDate = this.sharedService.convertInvalidDateObjectToTimestamp(date);
        formatedDate = formatedDate.toDate();
        return formatedDate;
    }
    ngOnDestroy() {
    }
    ionViewWillLeave() {
        this.showSearch = false;
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('user:publishUsersForAdminUsers', (users) => {
            // if (this.searchUserPhone == "" && this.searchUser == "") {
            //   this.users = users;
            //   console.log('no search allUser:', this.users);
            // }
            if (this.searchValue == "") {
                this.users = users;
                console.log('no search allUser:', this.users);
            }
            // this.users = users;
            this.showLoader = false;
            // console.log('allUser:', this.users);
            if (users && users.length) {
                this.showNoUsers = false;
            }
            if (this.sharedService.loading) {
                this.sharedService.loading.dismiss();
            }
        });
        this.events.subscribe('user:publishAllUsersForAdminUsers', (users) => {
            this.allUsers = users;
            if (this.loading) {
                this.loading.dismiss();
            }
            this.downloadUsers();
        });
        this.events.subscribe('user:noUsers', () => {
            this.showNoUsers = true;
            this.showLoader = false;
        });
        this.events.subscribe('user:usersForAdminProductsLimitReached', () => {
            this.noMoreUsers = true;
        });
        this.events.subscribe('user:changeRoleSuccess', (role) => {
            this.loading.dismiss();
            this.presentAlert(`Sucessfully made as ${role}!`);
            this.events.publish('user:getAllUsers');
        });
        this.events.subscribe('user:userBlockedSuccessfully', () => {
            this.loading.dismiss();
            this.presentAlert('Sucessfully blocked the user!');
        });
        this.events.subscribe('user:userUnblockedSuccessfully', () => {
            this.loading.dismiss();
            this.presentAlert('Sucessfully unblocked the user!');
        });
        this.events.subscribe('user:userBlockedAndDeleteDataSuccessfully', () => {
            this.loading.dismiss();
            this.presentAlert('Sucessfully blocked and deleted the user!');
        });
        this.events.subscribe('user:changeSubRoleSuccess', (msg) => {
            if (this.loading) {
                this.loading.dismiss();
            }
            ;
            this.presentAlert(msg);
        });
        this.events.subscribe('user:addUserByAdminSuccess', () => {
            this.events.publish('user:getAllUsers');
            this.addUserAlert.dismiss();
            this.sharedService.presentToast('User added successfully');
        });
        this.events.subscribe('user:addUserByAdminFailure', () => {
            this.sharedService.loading.dismiss();
            this.sharedService.presentToast('Either the number is already registered or Something went wrong!');
        });
    }
    addUser() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.createUserOrderEnabled == false) {
                const alert = yield this.alertController.create({
                    message: "Sorry, this feature is not available. Please upgrade your plan for access",
                    buttons: ['ok']
                });
                yield alert.present();
            }
            else {
                const alert = yield this.alertController.create({
                    subHeader: 'User Details',
                    inputs: [{
                            name: 'userName',
                            type: 'text',
                            placeholder: 'User Name'
                        },
                        {
                            name: 'phoneNumber',
                            type: 'number',
                            placeholder: 'User Phone Number'
                        }
                    ],
                    buttons: [{
                            text: 'cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: () => {
                                console.log('Confirm Cancel');
                            }
                        }, {
                            text: 'Add',
                            handler: (plan) => {
                                if (!parseInt(plan.phoneNumber) || !plan.userName) {
                                    this.sharedService.presentToast('Please fill all the details');
                                    return false;
                                }
                                else if (plan.phoneNumber.toString().length != 10) {
                                    this.sharedService.presentToast('Please enter ten digit phone number');
                                    return false;
                                }
                                else {
                                    let userDetails = {
                                        phoneNumber: this.configService.environment.defaultCountryCode + plan.phoneNumber,
                                        name: plan.userName
                                    };
                                    console.log('userDetails:', userDetails);
                                    this.sharedService.presentLoading('Adding User...');
                                    this.events.publish('user:addUserByAdmin', userDetails);
                                }
                            }
                        }]
                });
                yield alert.present();
                this.addUserAlert = alert;
            }
        });
    }
    changeRole(role, id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Please Wait...',
                duration: 3000
            });
            yield this.loading.present();
            if (role != "retailer" && role !== "notRetailer" && role != "reseller" && role !== "notReseller") {
                this.events.publish('user:changeRole', role, id);
            }
            else {
                this.events.publish('user:changeSubRole', role, id, this.sortValue);
            }
        });
    }
    messageUser(id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const navigationExtras = {
                state: {
                    userId: id
                }
            };
            this.router.navigate(['admin-chat'], navigationExtras);
        });
    }
    clearSearchUser() {
        this.searchUser = '';
    }
    loadMoreUsers(event) {
        //console.log('loading more users...');
        if (this.searchValue) {
            this.loadMoreUsersTypeSense(event);
        }
        else {
            this.events.publish('user:loadMoreUsersForAdminUsers', this.sortValue);
        }
        setTimeout(() => {
            event.target.complete();
        }, 1000);
        if (this.noMoreUsers === true) {
            event.target.disabled = true;
        }
    }
    sortUsers(e) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log('sortValue', e.target.value);
            this.sortValue = e.target.value;
            this.events.publish('user:getUsersForAdminUsers', this.sortValue);
        });
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
    blockUserConfirm(uid, uname, i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: `Are you sure you want to block ${uname} or block and delete data of ${uname}?`,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            // //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Block',
                        handler: () => {
                            this.blockUser(uid);
                        }
                    },
                    ,
                    {
                        text: 'Block and Delete Data',
                        handler: () => {
                            this.blockAndDeleteData(uid, i);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    unblockUserConfirm(uid, uname) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: `Are you sure you want to unblock ${uname}?`,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            // // //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Unblock',
                        handler: () => {
                            this.unblockUser(uid);
                        }
                    },
                ]
            });
            yield alert.present();
        });
    }
    blockUser(uid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('user:blockUser', uid);
        });
    }
    blockAndDeleteData(uid, i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('user:blockAndDeleteData', uid);
            this.users.splice(i, 1);
        });
    }
    unblockUser(uid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('user:unblockUser', uid);
        });
    }
    changeRoleAlert(role, id, name) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: `Are you sure you want to make ${name} as ${role} ?`,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            // //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Okay',
                        handler: () => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                            yield this.removeFromGroup(role, id);
                            yield this.changeRole(role, id);
                        })
                    }
                ]
            });
            yield alert.present();
        });
    }
    imageZoom(img) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_5__["ImageModalPage"],
            componentProps: {
                imgs: [{ url: img }],
                index: 0
            }
        }).then(modal => modal.present());
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Please Wait...',
            });
            yield this.loading.present();
        });
    }
    setItemSlideColor(role) {
        if (role === 'deliveryAgent') {
            return 'dark';
        }
        else {
            return 'primary';
        }
    }
    onClickUser(uid, udata) {
        console.log("uid: ", uid, "uData:", udata);
        const navigationExtras = {
            state: {
                uid: uid,
                udata: udata
            }
        };
        if (udata.role == 'deliveryAgent') {
            this.router.navigate(['delivery-agent-details'], navigationExtras);
        }
        else {
            this.router.navigate(['admin-allusers-details'], navigationExtras);
        }
    }
    clearPhone() {
        this.searchUserPhone = '';
    }
    clearName() {
        this.searchUser = '';
    }
    // async fireSearchQuery() {
    //   await this.sharedService.presentLoading();
    //   if (this.searchUserPhone != '') {
    //     let result = await this.userService.searchUserByNumber(this.configService.environment.defaultCountryCode + this.searchUserPhone)
    //     this.users = result;
    //     this.noMoreUsers = true
    //   }
    //   if (this.searchUser != '') {
    //     let result = await this.userService.searchUserByName(this.searchUser)
    //     console.log('searchResult = ', result);
    //     this.users = result;
    //     this.noMoreUsers = true
    //   }
    //   await this.sharedService.loading.dismiss();
    //   if (this.searchUserPhone == "" && this.searchUser == "") {
    //     await this.presentAlert("Please enter valid details.");
    //   }
    // }
    typeSenseSearchQuery() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.searchValue != '') {
                yield this.sharedService.presentLoading();
                this.page = 1;
                const typeSenseResponse = yield this.searchEngineService.getSearchUsersFromTypesenseUsingSingleSearch(this.searchValue, this.page, 'new_search', []);
                console.log("typeSenseResponse", typeSenseResponse);
                yield this.sharedService.loading.dismiss();
                if (typeSenseResponse && typeSenseResponse.status === 'available' && typeSenseResponse.users.length) {
                    this.users = typeSenseResponse.users;
                }
            }
            else {
                yield this.sharedService.presentAlert("Please enter valid details!");
            }
        });
    }
    loadMoreUsersTypeSense(event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log('loading more data...');
            this.page += 1;
            const typeSenseResponse = yield this.searchEngineService.getSearchUsersFromTypesenseUsingSingleSearch(this.searchValue, this.page, 'existing_search', this.users);
            if (typeSenseResponse && typeSenseResponse.status === 'available' && typeSenseResponse.users.length) {
                this.users = typeSenseResponse.users;
            }
            // setTimeout(() => {
            //   event.target.complete();
            // }, 1000);
            // if (this.noMoreUsers === true) {
            //   event.target.disabled = true;
            // }
        });
    }
    showAllUsers() {
        this.searchUserPhone = '';
        this.searchUser = '';
        this.events.publish('user:getUsersForAdminUsers', this.sortValue);
    }
    clearSearch() {
        this.searchValue = '';
        this.events.publish('user:getUsersForAdminUsers', this.sortValue);
    }
    removeSubscriptions() {
        this.events.unsubscribe('user:publishUsersForAdminUsers');
        this.events.unsubscribe('user:publishAllUsersForAdminUsers');
        this.events.unsubscribe('user:noUsers');
        this.events.unsubscribe('user:changeRoleSuccess');
        this.events.unsubscribe('user:usersForAdminProductsLimitReached');
        this.events.unsubscribe('user:userUnblockedSuccessfully');
        this.events.unsubscribe('user:userBlockedSuccessfully');
        this.events.unsubscribe('user:userBlockedAndDeleteDataSuccessfully');
    }
    exportUsers() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('user:getAllUsersForAdminUsers', this.sortValue);
        });
    }
    downloadUsers() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.options.filename = this.options.filename + ' ' + this.getDateTimeFormat(new Date);
            this.options.title = this.options.title + ' ' + this.getDateTimeFormat(new Date);
            let data = [];
            this.allUsers.forEach(item => {
                let user = item;
                data.push({
                    name: user.name ? user.name : '',
                    birthday: user.birthday ? this.getDateTimeFormat(user.birthday) : '',
                    email: user.email ? user.email : '',
                    address: user.defaultAddress && user.defaultAddress.address ? user.defaultAddress.address : '',
                    city: user.defaultAddress && user.defaultAddress.city ? user.defaultAddress.city : '',
                    state: user.defaultAddress && user.defaultAddress.state ? user.defaultAddress.state : '',
                    pincode: user.defaultAddress && user.defaultAddress.pincode ? user.defaultAddress.pincode : '',
                    phone: user.phoneNo ? user.phoneNo : '',
                    reg_date: user.createdAt && user.createdAt.toDate() ? this.getDateTimeFormat(user.createdAt.toDate()) : '',
                    active: user.active ? 'YES' : 'NO',
                    last_Access: user.lastAccessAt && user.lastAccessAt.toDate() ? this.getDateTimeFormat(user.lastAccessAt.toDate()) : '',
                    wallet_balance: user.wallet && user.wallet.balance ? user.wallet.balance : ''
                });
            });
            const csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_4__["ExportToCsv"](this.options);
            csvExporter.generateCsv(data);
        });
    }
    editManager(id) {
        const navigationExtras = {
            state: {
                managerData: id
            }
        };
        this.router.navigate(['manager-edit'], navigationExtras);
    }
    getDeliveryAgentUsers() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let response = yield this.userService.getAllUsersDeliveryAgents();
            if (response) {
                this.deliveryAgentUsers = response;
                // console.log("deliveryAgentUsers:-", this.deliveryAgentUsers);
            }
            else {
                this.sharedService.presentAlert("Something went wrong.");
            }
        });
    }
    getManagerUsers() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.searchValue = '';
            let response = yield this.userService.getAllUsersManager();
            if (response) {
                this.managerUsers = response;
                // console.log("managerUsers:-", this.managerUsers);
            }
            else {
                this.sharedService.presentAlert("Something went wrong.");
            }
        });
    }
    getSelectedList(type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.searchValue = '';
            if (type === 'users') {
                this.events.publish('user:getUsersForAdminUsers', this.sortValue);
            }
        });
    }
    removeFromGroup(role, id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // console.log('role, id', role, id);
            if (this.singleUser.data.groups && this.singleUser.data.groups.length && role !== "user") {
                // console.log('singleUser', this.singleUser);
                yield this.userService.autoRemoveUserFromGroup(id);
            }
        });
    }
    openModal(uid, udata) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _user_cart_details_modal_user_cart_details_modal_page__WEBPACK_IMPORTED_MODULE_10__["UserCartDetailsModalPage"],
                componentProps: { uid: uid, data: udata },
                cssClass: "cart-details-modal"
            });
            modal.present();
            const closed = yield modal.onWillDismiss();
            if (closed) {
                console.log("User cart details modal closed!");
            }
        });
    }
};
UsersCartPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_8__["SharedService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"] },
    { type: src_app_services_search_engine_search_engine_service__WEBPACK_IMPORTED_MODULE_7__["SearchEngineService"] }
];
UsersCartPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-users-cart',
        template: __webpack_require__(/*! raw-loader!./users-cart.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/users-cart/users-cart.page.html"),
        styles: [__webpack_require__(/*! ./users-cart.page.scss */ "./src/app/admin/users-cart/users-cart.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_8__["SharedService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
        src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
        src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"],
        src_app_services_search_engine_search_engine_service__WEBPACK_IMPORTED_MODULE_7__["SearchEngineService"]])
], UsersCartPage);



/***/ })

}]);
//# sourceMappingURL=admin-users-cart-users-cart-module-es2015.js.map