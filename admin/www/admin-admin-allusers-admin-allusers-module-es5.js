(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-allusers-admin-allusers-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-allusers/admin-allusers.page.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-allusers/admin-allusers.page.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"exportUsers()\">\r\n      Export Users\r\n    </ion-button>\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"addUser()\">\r\n      Add User\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n<super-tabs no-shadow no-border>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button (click)=\"getSelectedList('users')\">\r\n      <ion-label>Users</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button (click)=\"getSelectedList('delivery')\">\r\n      <ion-label>Delivery</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button (click)=\"getManagerUsers()\">\r\n      <ion-label>Managers</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button (click)=\"getSelectedList('admin')\">\r\n      <ion-label>Admins</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n  <super-tabs-container swipeEnabled=\"false\">\r\n\r\n    <!-- Users -->\r\n    <super-tab>\r\n      <ion-content class=\"ion-no-padding\">\r\n        <div class=\"main-container\">\r\n          <div class=\"no-users\" *ngIf=\"showNoUsers\" text-center> <img src=\"assets/img/no-user.png\" alt=\"\">\r\n            <h6>No users</h6>\r\n          </div>\r\n          <!-- header -->\r\n          <div class=\"list-header\" *ngIf=\"!showNoUsers\">\r\n            <ion-grid class=\"ion-no-padding\">\r\n        \r\n                <ion-row style=\"display: flex;align-items: center;justify-content: space-between;\">\r\n\r\n                  <!-- <ion-col size=\"6\" style=\"display: flex;align-items: center;\">\r\n                    <input placeholder=\"Enter name\" [(ngModel)]=\"searchUser\" style=\"background: white;border: 1px solid;padding: 5px;\" (click)='clearPhone()' (keyup.enter)='fireSearchQuery()'>&nbsp;\r\n                    <input placeholder=\"Enter number\" [(ngModel)]=\"searchUserPhone\" style=\"background: white;border: 1px solid;padding: 5px;\" (click)='clearName()' (keyup.enter)='fireSearchQuery()'>\r\n                    <input placeholder=\"Enter number\" [maxlength]='phoneLimit' [(ngModel)]=\"searchUserPhone\" style=\"background: white;border: 1px solid;padding: 5px;\" (click)='clearName()'>\r\n                    &nbsp;\r\n                    <ion-button (click)='fireSearchQuery()' size=\"small\">Search</ion-button>&nbsp;\r\n                    <ion-button (click)='showAllUsers()' size=\"small\" >Show All</ion-button>\r\n                  </ion-col> -->\r\n\r\n                  <ion-col class=\"searchArea\" size=\"6\">\r\n                    <input class=\"searchInput\" [(ngModel)]=\"searchValue\" placeholder=\"Search by name, phone number\">\r\n                    &nbsp;\r\n                    <ion-button (click)='typeSenseSearchQuery()' size=\"small\">Search</ion-button>&nbsp;\r\n                    <ion-button (click)='clearSearch()' size=\"small\">Show All</ion-button>\r\n                  </ion-col>\r\n\r\n                    <ion-col size=\"4\">\r\n                        <ion-select class=\"border f-s-14 i-s-p-10\" (ionChange)=\"sortUsers($event)\"\r\n                          placeholder=\"Sort By\" style=\"\r\n                          text-align: center;\r\n                          border: none;\r\n                          border-bottom: 1px solid;\r\n                          padding: 6px;\r\n                        \">\r\n                          <ion-select-option value=\"lastAccessAt\">Last Access Time\r\n                          </ion-select-option>\r\n                          <ion-select-option value=\"lowercaseName\">User Name\r\n                          </ion-select-option>\r\n                          <ion-select-option value=\"birthday\">Birthday\r\n                          </ion-select-option>\r\n                        </ion-select>\r\n                    </ion-col>\r\n                  \r\n                </ion-row>\r\n              <ion-row>\r\n                <ion-col class=\"image\">\r\n                  <p>Image</p>\r\n                </ion-col>\r\n                <ion-col class=\"user\">\r\n                  <p>Name | Number</p>\r\n                </ion-col>\r\n                <ion-col class=\"last-active\">\r\n                  <p>Date</p>\r\n                </ion-col>\r\n                <ion-col class=\"last-active\">\r\n                  <p>Birth Date</p>\r\n                </ion-col>\r\n                <ion-col class=\"action\">\r\n                  <p>Action</p>\r\n                </ion-col>\r\n                <ion-col class=\"action\">\r\n                  <p>View</p>\r\n                </ion-col>\r\n                <ion-col class=\"action\">\r\n                  <p>Options</p>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <!-- header -->\r\n\r\n          <!-- container -->\r\n          <div class=\"list-container\">\r\n            <ion-list class=\"ion-no-padding row-border\" *ngIf=\"!showLoader && !showNoUsers\">\r\n              <ng-container *ngFor=\"let user of users; let i=index\">\r\n                <ion-item *ngIf=\"user.data.role==='user'\" >\r\n                  <ion-grid>\r\n                    <ion-row class=\"row-background\">\r\n                      <ion-col class=\"image\">\r\n                        <ion-avatar class=\"profile-pic\"\r\n                          *ngIf=\"user.data.role==='user'\"> <img\r\n                            src=\"{{user.data.dP}}\" (click)=\"imageZoom(user.data.dP)\"> </ion-avatar>\r\n                        <ion-avatar class=\"profile-pic\" *ngIf=\"user.data.role==='admin'\"> <img\r\n                            src=\"assets/img/admin-pic.png\"> </ion-avatar>\r\n                      </ion-col>\r\n                      <ion-col class=\"user\" (click)=\"onClickUser(user.id, user.data)\" style=\"cursor: pointer;\">\r\n                        <p>{{user.data.name}} ({{user.data.phoneNo}})</p>\r\n                      </ion-col>\r\n                      <ion-col class=\"last-active\" (click)=\"onClickUser(user.id, user.data)\" style=\"cursor: pointer;\">\r\n                        <p >{{getDateTimeFormat(user.data.lastAccessAt.toDate())}}</p>\r\n                      </ion-col>\r\n                      <ion-col class=\"last-active\" (click)=\"onClickUser(user.id, user.data)\" style=\"cursor: pointer;\">\r\n                        <p *ngIf=\"user.data.birthday\">{{getDateTimeFormat(user.data.birthday) | date}}</p>\r\n                        <p *ngIf=\"!user.data.birthday\">Not Available</p>\r\n                        \r\n                        \r\n                \r\n                      </ion-col>\r\n                      <ion-col class=\"action\">\r\n                        <ion-button class=\"btn-sml\" shape=\"round\" fill=\"outline\" (click)=\"editUserRoleAlert(user, i)\">\r\n                          Edit Role </ion-button>\r\n                          <br>\r\n                      </ion-col>\r\n                      <ion-col class=\"action\">\r\n                        <ion-button class=\"btn-sml\" shape=\"round\" fill=\"outline\" (click)=\"onClickUser(user.id, user.data)\">\r\n                          View </ion-button>\r\n                      </ion-col>\r\n                      <ion-col class=\"action\">\r\n                          <ion-button class=\"btn-sml\" shape=\"round\" fill=\"outline\" (click)=\"messageUser(user.id)\">\r\n                            Message User </ion-button>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                </ion-item>\r\n              </ng-container>\r\n            </ion-list>\r\n            <ion-grid class=\"row-border ion-no-padding\" *ngIf=\"showLoader && !showNoUsers\">\r\n              <ion-row class=\"row-background\" *ngFor=\"let x of [1,2,3,4,5,6,7,8,9,10]\">\r\n                <ion-col size=\"3\">\r\n                  <ion-avatar>\r\n                    <ion-skeleton-text></ion-skeleton-text>\r\n                  </ion-avatar>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <h3>\r\n                    <ion-skeleton-text animated style=\"width: 70%;margin-left: -10px;\"></ion-skeleton-text>\r\n                  </h3>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <h3>\r\n                    <ion-skeleton-text animated style=\"width: 90%;margin-left: -5px;\"></ion-skeleton-text>\r\n                  </h3>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <h3>\r\n                    <ion-skeleton-text animated style=\"width: 70%;\"></ion-skeleton-text>\r\n                  </h3>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <!-- container -->\r\n          <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadMoreUsers($event)\">\r\n            <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more users...\">\r\n            </ion-infinite-scroll-content>\r\n          </ion-infinite-scroll>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Delivery -->\r\n    <super-tab>\r\n      <ion-content class=\"ion-no-padding\">\r\n        <div class=\"main-container\">\r\n          <div class=\"no-users\" *ngIf=\"showNoUsers\" text-center> <img src=\"assets/img/no-user.png\" alt=\"\">\r\n            <h6>No users</h6>\r\n          </div>\r\n          <!-- header -->\r\n          <div class=\"list-header\" *ngIf=\"!showNoUsers\">\r\n            <ion-grid class=\"ion-no-padding\">\r\n              <ion-row>\r\n                <ion-col class=\"image\">\r\n                  <p>Image</p>\r\n                </ion-col>\r\n                <ion-col class=\"user\">\r\n                  <p>Name | Number</p>\r\n                </ion-col>\r\n                <ion-col class=\"last-active\">\r\n                  <p>Date</p>\r\n                </ion-col>\r\n                <ion-col class=\"action\">\r\n                  <p>Action</p>\r\n                </ion-col>\r\n                <ion-col class=\"view\">\r\n                  <p>View</p>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <!-- header -->\r\n\r\n          <!-- container -->\r\n          <div class=\"list-container\">\r\n            <ion-list class=\"ion-no-padding row-border\" *ngIf=\"!showLoader && !showNoUsers\">\r\n              <ng-container *ngFor=\"let user of deliveryAgentUsers; let i=index\">\r\n                <ion-item *ngIf=\"user.data.role==='deliveryAgent'\">\r\n                  <ion-grid>\r\n                    <ion-row class=\"row-background\">\r\n                      <ion-col class=\"image\">\r\n                        <ion-avatar class=\"profile-pic\"\r\n                          *ngIf=\"user.data.role==='deliveryAgent'\"> <img\r\n                            src=\"{{user.data.dP}}\" (click)=\"imageZoom(user.data.dP)\"> </ion-avatar>\r\n                        <ion-avatar class=\"profile-pic\" *ngIf=\"user.data.role==='admin'\"> <img\r\n                            src=\"assets/img/admin-pic.png\"> </ion-avatar>\r\n                      </ion-col>\r\n                      <ion-col class=\"user\">\r\n                        <p >{{user.data.name}} ({{user.data.phoneNo}})</p>\r\n                      </ion-col>\r\n                      <ion-col class=\"last-active\">\r\n                        <p>{{getDateTimeFormat(user.data.lastAccessAt.toDate())}}</p>\r\n                      </ion-col>\r\n                      <ion-col class=\"action\">\r\n                        <ion-button class=\"btn-sml\" shape=\"round\" fill=\"outline\" (click)=\"editUserRoleAlert(user, i)\">\r\n                          Edit Role </ion-button>\r\n                      </ion-col>\r\n                      <ion-col class=\"view\">\r\n                        <ion-button (click)=\"onClickUser(user.id,user.data)\">Manage Orders</ion-button>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                </ion-item>\r\n              </ng-container>\r\n            </ion-list>\r\n            <ion-grid class=\"row-border ion-no-padding\" *ngIf=\"showLoader && !showNoUsers\">\r\n              <ion-row class=\"row-background\" *ngFor=\"let x of [1,2,3,4,5,6,7,8,9,10]\">\r\n                <ion-col size=\"3\">\r\n                  <ion-avatar>\r\n                    <ion-skeleton-text></ion-skeleton-text>\r\n                  </ion-avatar>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <h3>\r\n                    <ion-skeleton-text animated style=\"width: 70%;margin-left: -10px;\"></ion-skeleton-text>\r\n                  </h3>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <h3>\r\n                    <ion-skeleton-text animated style=\"width: 90%;margin-left: -5px;\"></ion-skeleton-text>\r\n                  </h3>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <h3>\r\n                    <ion-skeleton-text animated style=\"width: 70%;\"></ion-skeleton-text>\r\n                  </h3>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <!-- container -->\r\n          <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadMoreUsers($event)\">\r\n            <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more users...\">\r\n            </ion-infinite-scroll-content>\r\n          </ion-infinite-scroll>\r\n        </div>\r\n      </ion-content>\r\n        \r\n    </super-tab>\r\n\r\n    <!-- Manager -->\r\n    <super-tab>\r\n      <ion-content class=\"ion-no-padding\">\r\n        <div class=\"main-container\">\r\n          <div class=\"no-users\" *ngIf=\"showNoUsers\" text-center> <img src=\"assets/img/no-user.png\" alt=\"\">\r\n            <h6>No users</h6>\r\n          </div>\r\n          <!-- header -->\r\n          <div class=\"list-header\" *ngIf=\"!showNoUsers\">\r\n            <ion-grid class=\"ion-no-padding\">\r\n              <ion-row>\r\n                <ion-col class=\"image\">\r\n                  <p>Image</p>\r\n                </ion-col>\r\n                <ion-col class=\"user\">\r\n                  <p>Name | Number</p>\r\n                </ion-col>\r\n                <ion-col class=\"last-active\">\r\n                  <p>Date</p>\r\n                </ion-col>\r\n                <ion-col class=\"action\">\r\n                  <p>Action</p>\r\n                </ion-col>\r\n                <ion-col class=\"action\">\r\n                  <p>View</p>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <!-- header -->\r\n\r\n          <!-- container -->\r\n          <div class=\"list-container\">\r\n            <ion-list class=\"ion-no-padding row-border\" *ngIf=\"!showLoader && !showNoUsers\">\r\n              <ng-container *ngFor=\"let user of managerUsers; let i=index\">\r\n                <ion-item *ngIf=\"user.data.role==='manager'\">\r\n                  <ion-grid>\r\n                    <ion-row class=\"row-background\">\r\n                      <ion-col class=\"image\">\r\n                        <ion-avatar class=\"profile-pic\" *ngIf=\"user.data.dP\"> \r\n                          <img src=\"{{user.data.dP}}\" (click)=\"imageZoom(user.data.dP)\">\r\n                         </ion-avatar>\r\n                        <ion-avatar class=\"profile-pic\" *ngIf=\"!user.data.dP\"> \r\n                          <img src=\"assets/img/admin-pic.png\">\r\n                         </ion-avatar>\r\n                      </ion-col>\r\n                      <ion-col class=\"user\">\r\n                        <p>{{user.data.name}} ({{user.data.phoneNo}})</p>\r\n                      </ion-col>\r\n                      <ion-col class=\"last-active\">\r\n                        <p>{{getDateTimeFormat(user.data.lastAccessAt.toDate())}}</p>\r\n                      </ion-col>\r\n                      <ion-col class=\"action\">\r\n                        <ion-button class=\"btn-sml\" shape=\"round\" fill=\"outline\" (click)=\"editUserRoleAlert(user, i)\">\r\n                          Edit Role </ion-button>\r\n                      </ion-col>\r\n                      <ion-col class=\"action\">\r\n                        <ion-button (click)=\"editManager(user.id)\" lass=\"btn-sml\" shape=\"round\" fill=\"outline\">\r\n                          Edit Manager</ion-button>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                </ion-item>\r\n              </ng-container>\r\n            </ion-list>\r\n            <ion-grid class=\"row-border ion-no-padding\" *ngIf=\"showLoader && !showNoUsers\">\r\n              <ion-row class=\"row-background\" *ngFor=\"let x of [1,2,3,4,5,6,7,8,9,10]\">\r\n                <ion-col size=\"3\">\r\n                  <ion-avatar>\r\n                    <ion-skeleton-text></ion-skeleton-text>\r\n                  </ion-avatar>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <h3>\r\n                    <ion-skeleton-text animated style=\"width: 70%;margin-left: -10px;\"></ion-skeleton-text>\r\n                  </h3>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <h3>\r\n                    <ion-skeleton-text animated style=\"width: 90%;margin-left: -5px;\"></ion-skeleton-text>\r\n                  </h3>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <h3>\r\n                    <ion-skeleton-text animated style=\"width: 70%;\"></ion-skeleton-text>\r\n                  </h3>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <!-- container -->\r\n          <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadMoreUsers($event)\">\r\n            <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more users...\">\r\n            </ion-infinite-scroll-content>\r\n          </ion-infinite-scroll>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Admin -->\r\n    <super-tab>\r\n      <ion-content class=\"ion-no-padding\">\r\n        <div class=\"main-container\">\r\n          <div class=\"no-users\" *ngIf=\"showNoUsers\" text-center> <img src=\"assets/img/no-user.png\" alt=\"\">\r\n            <h6>No users</h6>\r\n          </div>\r\n          <!-- header -->\r\n          <div class=\"list-header\" *ngIf=\"!showNoUsers\">\r\n            <ion-grid class=\"ion-no-padding\">\r\n              <ion-row>\r\n                <ion-col class=\"image\">\r\n                  <p>Image</p>\r\n                </ion-col>\r\n                <ion-col class=\"user\">\r\n                  <p>Name | Number</p>\r\n                </ion-col>\r\n                <ion-col class=\"last-active\">\r\n                  <p>Date</p>\r\n                </ion-col>\r\n                <ion-col class=\"action\">\r\n                  <p>Action</p>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <!-- header -->\r\n\r\n          <!-- container -->\r\n          <div class=\"list-container\">\r\n            <ion-list class=\"ion-no-padding row-border\" *ngIf=\"!showLoader && !showNoUsers\">\r\n              <ng-container *ngFor=\"let user of users; let i=index\">\r\n                <ion-item *ngIf=\"user.data.role==='admin'\">\r\n                  <ion-grid>\r\n                    <ion-row class=\"row-background\">\r\n                      <ion-col class=\"image\">\r\n                        <ion-avatar class=\"profile-pic\" *ngIf=\"user.data.dP\"> \r\n                          <img src=\"{{user.data.dP}}\" (click)=\"imageZoom(user.data.dP)\">\r\n                         </ion-avatar>\r\n                        <ion-avatar class=\"profile-pic\" *ngIf=\"!user.data.dP\"> \r\n                          <img src=\"assets/img/admin-pic.png\">\r\n                         </ion-avatar>\r\n                      </ion-col>\r\n                      <ion-col class=\"user\">\r\n                        <p>{{user.data.name}} ({{user.data.phoneNo}})</p>\r\n                      </ion-col>\r\n                      <ion-col class=\"last-active\">\r\n                        <p>{{getDateTimeFormat(user.data.lastAccessAt.toDate())}}</p>\r\n                      </ion-col>\r\n                      <ion-col class=\"action\">\r\n                        <ion-button class=\"btn-sml\" shape=\"round\" fill=\"outline\" (click)=\"editUserRoleAlert(user, i)\">\r\n                          Edit Role </ion-button>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                  </ion-grid>\r\n                </ion-item>\r\n              </ng-container>\r\n            </ion-list>\r\n            <ion-grid class=\"row-border ion-no-padding\" *ngIf=\"showLoader && !showNoUsers\">\r\n              <ion-row class=\"row-background\" *ngFor=\"let x of [1,2,3,4,5,6,7,8,9,10]\">\r\n                <ion-col size=\"3\">\r\n                  <ion-avatar>\r\n                    <ion-skeleton-text></ion-skeleton-text>\r\n                  </ion-avatar>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <h3>\r\n                    <ion-skeleton-text animated style=\"width: 70%;margin-left: -10px;\"></ion-skeleton-text>\r\n                  </h3>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <h3>\r\n                    <ion-skeleton-text animated style=\"width: 90%;margin-left: -5px;\"></ion-skeleton-text>\r\n                  </h3>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <h3>\r\n                    <ion-skeleton-text animated style=\"width: 70%;\"></ion-skeleton-text>\r\n                  </h3>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <!-- container -->\r\n          <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadMoreUsers($event)\">\r\n            <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more users...\">\r\n            </ion-infinite-scroll-content>\r\n          </ion-infinite-scroll>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n  </super-tabs-container>\r\n</super-tabs>"

/***/ }),

/***/ "./src/app/admin/admin-allusers/admin-allusers.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/admin/admin-allusers/admin-allusers.module.ts ***!
  \***************************************************************/
/*! exports provided: AdminAllusersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminAllusersPageModule", function() { return AdminAllusersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_allusers_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-allusers.page */ "./src/app/admin/admin-allusers/admin-allusers.page.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var src_app_pipes_search_filter_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/pipes/search-filter.pipe */ "./src/app/pipes/search-filter.pipe.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");










var routes = [
    {
        path: '',
        component: _admin_allusers_page__WEBPACK_IMPORTED_MODULE_6__["AdminAllusersPage"]
    }
];
var AdminAllusersPageModule = /** @class */ (function () {
    function AdminAllusersPageModule() {
    }
    AdminAllusersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__["Ng2SearchPipeModule"],
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_9__["SuperTabsModule"]
            ],
            declarations: [_admin_allusers_page__WEBPACK_IMPORTED_MODULE_6__["AdminAllusersPage"], src_app_pipes_search_filter_pipe__WEBPACK_IMPORTED_MODULE_8__["SearchFilterPipe"]],
            exports: [src_app_pipes_search_filter_pipe__WEBPACK_IMPORTED_MODULE_8__["SearchFilterPipe"]]
        })
    ], AdminAllusersPageModule);
    return AdminAllusersPageModule;
}());



/***/ }),

/***/ "./src/app/admin/admin-allusers/admin-allusers.page.scss":
/*!***************************************************************!*\
  !*** ./src/app/admin/admin-allusers/admin-allusers.page.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".list-header {\n  top: 0;\n}\n\n.list-container {\n  margin-top: 95px;\n}\n\n.image {\n  width: 100px;\n  max-width: 100px;\n}\n\n.last-active {\n  width: 100px;\n  max-width: 100px;\n}\n\n.action, .view {\n  width: 124px;\n  max-width: 124px;\n}\n\n.user {\n  width: calc(100% - 324px);\n  max-width: calc(100% - 324px);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tYWxsdXNlcnMvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxhZG1pbi1hbGx1c2Vyc1xcYWRtaW4tYWxsdXNlcnMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZG1pbi1hbGx1c2Vycy9hZG1pbi1hbGx1c2Vycy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxNQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtBQ0NGOztBREVBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUNFRjs7QURDQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQ0VGOztBRENBO0VBQ0UseUJBQUE7RUFDQSw2QkFBQTtBQ0VGIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vYWRtaW4tYWxsdXNlcnMvYWRtaW4tYWxsdXNlcnMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxpc3QtaGVhZGVye1xyXG4gIHRvcDogMDtcclxufVxyXG5cclxuLmxpc3QtY29udGFpbmVye1xyXG4gIG1hcmdpbi10b3A6IDk1cHg7XHJcbn1cclxuXHJcbi5pbWFnZXtcclxuICB3aWR0aDogMTAwcHg7XHJcbiAgbWF4LXdpZHRoOiAxMDBweDtcclxufVxyXG4ubGFzdC1hY3RpdmV7XHJcbiAgd2lkdGg6IDEwMHB4O1xyXG4gIG1heC13aWR0aDogMTAwcHg7XHJcbn1cclxuXHJcbi5hY3Rpb24sLnZpZXd7XHJcbiAgd2lkdGg6IDEyNHB4O1xyXG4gIG1heC13aWR0aDogMTI0cHg7XHJcbn1cclxuXHJcbi51c2Vye1xyXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAzMjRweCk7XHJcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSAzMjRweCk7XHJcbn0iLCIubGlzdC1oZWFkZXIge1xuICB0b3A6IDA7XG59XG5cbi5saXN0LWNvbnRhaW5lciB7XG4gIG1hcmdpbi10b3A6IDk1cHg7XG59XG5cbi5pbWFnZSB7XG4gIHdpZHRoOiAxMDBweDtcbiAgbWF4LXdpZHRoOiAxMDBweDtcbn1cblxuLmxhc3QtYWN0aXZlIHtcbiAgd2lkdGg6IDEwMHB4O1xuICBtYXgtd2lkdGg6IDEwMHB4O1xufVxuXG4uYWN0aW9uLCAudmlldyB7XG4gIHdpZHRoOiAxMjRweDtcbiAgbWF4LXdpZHRoOiAxMjRweDtcbn1cblxuLnVzZXIge1xuICB3aWR0aDogY2FsYygxMDAlIC0gMzI0cHgpO1xuICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDMyNHB4KTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/admin-allusers/admin-allusers.page.ts":
/*!*************************************************************!*\
  !*** ./src/app/admin/admin-allusers/admin-allusers.page.ts ***!
  \*************************************************************/
/*! exports provided: AdminAllusersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminAllusersPage", function() { return AdminAllusersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var src_app_services_search_engine_search_engine_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/search-engine/search-engine.service */ "./src/app/services/search-engine/search-engine.service.ts");











var AdminAllusersPage = /** @class */ (function () {
    function AdminAllusersPage(events, router, sharedService, loadingController, alertController, configService, modalController, userService, searchEngineService) {
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
    AdminAllusersPage.prototype.editUserRoleAlert = function (user, i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        return [4 /*yield*/, this.alertController.create({
                                cssClass: 'my-custom-class',
                                header: 'User Roles',
                                inputs: this.usrOptions,
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function () {
                                            // //console.log('Confirm Cancel');
                                        }
                                    }, {
                                        text: 'Ok',
                                        handler: function (data) {
                                            if (data) {
                                                if (data == 'block-user') {
                                                    _this.blockUserConfirm(user.id, user.data.name, i);
                                                }
                                                else if (data == 'unblock') {
                                                    _this.unblockUserConfirm(user.id, user.data.name);
                                                }
                                                else {
                                                    _this.changeRoleAlert(data, user.id, user.data.name);
                                                }
                                            }
                                            else {
                                                _this.presentAlert('Please select a role');
                                            }
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
    AdminAllusersPage.prototype.ngOnInit = function () {
        this.phoneLimit = this.configService.environment.phoneLength;
    };
    AdminAllusersPage.prototype.ionViewDidEnter = function () {
        this.createUserOrderEnabled = this.configService.environment.createUserOrder;
    };
    AdminAllusersPage.prototype.ionViewWillEnter = function () {
        this.initializeSubscriptions();
        this.events.publish('user:getUsersForAdminUsers', this.sortValue);
        this.getDeliveryAgentUsers();
        // this.getManagerUsers();
    };
    AdminAllusersPage.prototype.getDateTimeFormat = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_5__(date).format('MMM D, YYYY hh:mm a');
    };
    AdminAllusersPage.prototype.ngOnDestroy = function () {
    };
    AdminAllusersPage.prototype.ionViewWillLeave = function () {
        this.showSearch = false;
        this.removeSubscriptions();
    };
    AdminAllusersPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('user:publishUsersForAdminUsers', function (users) {
            // if (this.searchUserPhone == "" && this.searchUser == "") {
            //   this.users = users;
            //   console.log('no search allUser:', this.users);
            // }
            if (_this.searchValue == "") {
                _this.users = users;
                console.log('no search allUser:', _this.users);
            }
            // this.users = users;
            _this.showLoader = false;
            // console.log('allUser:', this.users);
            if (users && users.length) {
                _this.showNoUsers = false;
            }
            if (_this.sharedService.loading) {
                _this.sharedService.loading.dismiss();
            }
        });
        this.events.subscribe('user:publishAllUsersForAdminUsers', function (users) {
            _this.allUsers = users;
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.downloadUsers();
        });
        this.events.subscribe('user:noUsers', function () {
            _this.showNoUsers = true;
            _this.showLoader = false;
        });
        this.events.subscribe('user:usersForAdminProductsLimitReached', function () {
            _this.noMoreUsers = true;
        });
        this.events.subscribe('user:changeRoleSuccess', function (role) {
            _this.loading.dismiss();
            _this.presentAlert("Sucessfully made as " + role + "!");
            _this.events.publish('user:getAllUsers');
        });
        this.events.subscribe('user:userBlockedSuccessfully', function () {
            _this.loading.dismiss();
            _this.presentAlert('Sucessfully blocked the user!');
        });
        this.events.subscribe('user:userUnblockedSuccessfully', function () {
            _this.loading.dismiss();
            _this.presentAlert('Sucessfully unblocked the user!');
        });
        this.events.subscribe('user:userBlockedAndDeleteDataSuccessfully', function () {
            _this.loading.dismiss();
            _this.presentAlert('Sucessfully blocked and deleted the user!');
        });
        this.events.subscribe('user:changeSubRoleSuccess', function (msg) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            ;
            _this.presentAlert(msg);
        });
        this.events.subscribe('user:addUserByAdminSuccess', function () {
            _this.events.publish('user:getAllUsers');
            _this.addUserAlert.dismiss();
            _this.sharedService.presentToast('User added successfully');
        });
        this.events.subscribe('user:addUserByAdminFailure', function () {
            _this.sharedService.loading.dismiss();
            _this.sharedService.presentToast('Either the number is already registered or Something went wrong!');
        });
    };
    AdminAllusersPage.prototype.addUser = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert_1, alert_2;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.createUserOrderEnabled == false)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                message: "Sorry, this feature is not available. Please upgrade your plan for access",
                                buttons: ['ok']
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.alertController.create({
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
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Add',
                                    handler: function (plan) {
                                        if (!parseInt(plan.phoneNumber) || !plan.userName) {
                                            _this.sharedService.presentToast('Please fill all the details');
                                            return false;
                                        }
                                        else if (plan.phoneNumber.toString().length != 10) {
                                            _this.sharedService.presentToast('Please enter ten digit phone number');
                                            return false;
                                        }
                                        else {
                                            var userDetails = {
                                                phoneNumber: _this.configService.environment.defaultCountryCode + plan.phoneNumber,
                                                name: plan.userName
                                            };
                                            console.log('userDetails:', userDetails);
                                            _this.sharedService.presentLoading('Adding User...');
                                            _this.events.publish('user:addUserByAdmin', userDetails);
                                        }
                                    }
                                }]
                        })];
                    case 4:
                        alert_2 = _a.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 5:
                        _a.sent();
                        this.addUserAlert = alert_2;
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersPage.prototype.changeRole = function (role, id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
                                duration: 3000
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        if (role != "retailer" && role !== "notRetailer" && role != "reseller" && role !== "notReseller") {
                            this.events.publish('user:changeRole', role, id);
                        }
                        else {
                            this.events.publish('user:changeSubRole', role, id, this.sortValue);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersPage.prototype.messageUser = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var navigationExtras;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                navigationExtras = {
                    state: {
                        userId: id
                    }
                };
                this.router.navigate(['admin-chat'], navigationExtras);
                return [2 /*return*/];
            });
        });
    };
    AdminAllusersPage.prototype.clearSearchUser = function () {
        this.searchUser = '';
    };
    AdminAllusersPage.prototype.loadMoreUsers = function (event) {
        //console.log('loading more users...');
        if (this.searchValue) {
            this.loadMoreUsersTypeSense(event);
        }
        else {
            this.events.publish('user:loadMoreUsersForAdminUsers', this.sortValue);
        }
        setTimeout(function () {
            event.target.complete();
        }, 1000);
        if (this.noMoreUsers === true) {
            event.target.disabled = true;
        }
    };
    AdminAllusersPage.prototype.sortUsers = function (e) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                console.log('sortValue', e.target.value);
                this.sortValue = e.target.value;
                this.events.publish('user:getUsersForAdminUsers', this.sortValue);
                return [2 /*return*/];
            });
        });
    };
    AdminAllusersPage.prototype.presentAlert = function (desc) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: desc,
                            buttons: ['Ok']
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
    AdminAllusersPage.prototype.blockUserConfirm = function (uid, uname, i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: "Are you sure you want to block " + uname + " or block and delete data of " + uname + "?",
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        // //console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Block',
                                    handler: function () {
                                        _this.blockUser(uid);
                                    }
                                },
                                ,
                                {
                                    text: 'Block and Delete Data',
                                    handler: function () {
                                        _this.blockAndDeleteData(uid, i);
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
    AdminAllusersPage.prototype.unblockUserConfirm = function (uid, uname) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: "Are you sure you want to unblock " + uname + "?",
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        // // //console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Unblock',
                                    handler: function () {
                                        _this.unblockUser(uid);
                                    }
                                },
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
    AdminAllusersPage.prototype.blockUser = function (uid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('user:blockUser', uid);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersPage.prototype.blockAndDeleteData = function (uid, i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('user:blockAndDeleteData', uid);
                        this.users.splice(i, 1);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersPage.prototype.unblockUser = function (uid) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('user:unblockUser', uid);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersPage.prototype.changeRoleAlert = function (role, id, name) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: "Are you sure you want to make " + name + " as " + role + " ?",
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        // //console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Okay',
                                    handler: function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.removeFromGroup(role, id)];
                                                case 1:
                                                    _a.sent();
                                                    return [4 /*yield*/, this.changeRole(role, id)];
                                                case 2:
                                                    _a.sent();
                                                    return [2 /*return*/];
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
    AdminAllusersPage.prototype.imageZoom = function (img) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_4__["ImageModalPage"],
            componentProps: {
                imgs: [{ url: img }],
                index: 0
            }
        }).then(function (modal) { return modal.present(); });
    };
    AdminAllusersPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
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
    AdminAllusersPage.prototype.setItemSlideColor = function (role) {
        if (role === 'deliveryAgent') {
            return 'dark';
        }
        else {
            return 'primary';
        }
    };
    AdminAllusersPage.prototype.onClickUser = function (uid, udata) {
        console.log("uid: ", uid, "uData:", udata);
        var navigationExtras = {
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
    };
    AdminAllusersPage.prototype.clearPhone = function () {
        this.searchUserPhone = '';
    };
    AdminAllusersPage.prototype.clearName = function () {
        this.searchUser = '';
    };
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
    AdminAllusersPage.prototype.typeSenseSearchQuery = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var typeSenseResponse;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.searchValue != '')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _a.sent();
                        this.page = 1;
                        return [4 /*yield*/, this.searchEngineService.getSearchUsersFromTypesenseUsingSingleSearch(this.searchValue, this.page, 'new_search', [])];
                    case 2:
                        typeSenseResponse = _a.sent();
                        console.log("typeSenseResponse", typeSenseResponse);
                        return [4 /*yield*/, this.sharedService.loading.dismiss()];
                    case 3:
                        _a.sent();
                        if (typeSenseResponse && typeSenseResponse.status === 'available' && typeSenseResponse.users.length) {
                            this.users = typeSenseResponse.users;
                        }
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.sharedService.presentAlert("Please enter valid details!")];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersPage.prototype.loadMoreUsersTypeSense = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var typeSenseResponse;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('loading more data...');
                        this.page += 1;
                        return [4 /*yield*/, this.searchEngineService.getSearchUsersFromTypesenseUsingSingleSearch(this.searchValue, this.page, 'existing_search', this.users)];
                    case 1:
                        typeSenseResponse = _a.sent();
                        if (typeSenseResponse && typeSenseResponse.status === 'available' && typeSenseResponse.users.length) {
                            this.users = typeSenseResponse.users;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersPage.prototype.showAllUsers = function () {
        this.searchUserPhone = '';
        this.searchUser = '';
        this.events.publish('user:getUsersForAdminUsers', this.sortValue);
    };
    AdminAllusersPage.prototype.clearSearch = function () {
        this.searchValue = '';
        this.events.publish('user:getUsersForAdminUsers', this.sortValue);
    };
    AdminAllusersPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('user:publishUsersForAdminUsers');
        this.events.unsubscribe('user:publishAllUsersForAdminUsers');
        this.events.unsubscribe('user:noUsers');
        this.events.unsubscribe('user:changeRoleSuccess');
        this.events.unsubscribe('user:usersForAdminProductsLimitReached');
        this.events.unsubscribe('user:userUnblockedSuccessfully');
        this.events.unsubscribe('user:userBlockedSuccessfully');
        this.events.unsubscribe('user:userBlockedAndDeleteDataSuccessfully');
    };
    AdminAllusersPage.prototype.exportUsers = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('user:getAllUsersForAdminUsers', this.sortValue);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersPage.prototype.downloadUsers = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var data, csvExporter;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.options.filename = this.options.filename + ' ' + this.getDateTimeFormat(new Date);
                this.options.title = this.options.title + ' ' + this.getDateTimeFormat(new Date);
                data = [];
                this.allUsers.forEach(function (item) {
                    var user = item;
                    data.push({
                        name: user.name ? user.name : '',
                        birthday: user.birthday ? _this.getDateTimeFormat(user.birthday) : '',
                        email: user.email ? user.email : '',
                        address: user.defaultAddress && user.defaultAddress.address ? user.defaultAddress.address : '',
                        city: user.defaultAddress && user.defaultAddress.city ? user.defaultAddress.city : '',
                        state: user.defaultAddress && user.defaultAddress.state ? user.defaultAddress.state : '',
                        pincode: user.defaultAddress && user.defaultAddress.pincode ? user.defaultAddress.pincode : '',
                        phone: user.phoneNo ? user.phoneNo : '',
                        reg_date: user.createdAt && user.createdAt.toDate() ? _this.getDateTimeFormat(user.createdAt.toDate()) : '',
                        active: user.active ? 'YES' : 'NO',
                        last_Access: user.lastAccessAt && user.lastAccessAt.toDate() ? _this.getDateTimeFormat(user.lastAccessAt.toDate()) : '',
                        wallet_balance: user.wallet && user.wallet.balance ? user.wallet.balance : ''
                    });
                });
                csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_6__["ExportToCsv"](this.options);
                csvExporter.generateCsv(data);
                return [2 /*return*/];
            });
        });
    };
    AdminAllusersPage.prototype.editManager = function (id) {
        var navigationExtras = {
            state: {
                managerData: id
            }
        };
        this.router.navigate(['manager-edit'], navigationExtras);
    };
    AdminAllusersPage.prototype.getDeliveryAgentUsers = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var response;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.getAllUsersDeliveryAgents()];
                    case 1:
                        response = _a.sent();
                        if (response) {
                            this.deliveryAgentUsers = response;
                            // console.log("deliveryAgentUsers:-", this.deliveryAgentUsers);
                        }
                        else {
                            this.sharedService.presentAlert("Something went wrong.");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersPage.prototype.getManagerUsers = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var response;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.searchValue = '';
                        return [4 /*yield*/, this.userService.getAllUsersManager()];
                    case 1:
                        response = _a.sent();
                        if (response) {
                            this.managerUsers = response;
                            // console.log("managerUsers:-", this.managerUsers);
                        }
                        else {
                            this.sharedService.presentAlert("Something went wrong.");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersPage.prototype.getSelectedList = function (type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.searchValue = '';
                if (type === 'users') {
                    this.events.publish('user:getUsersForAdminUsers', this.sortValue);
                }
                return [2 /*return*/];
            });
        });
    };
    AdminAllusersPage.prototype.removeFromGroup = function (role, id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.singleUser.data.groups && this.singleUser.data.groups.length && role !== "user")) return [3 /*break*/, 2];
                        // console.log('singleUser', this.singleUser);
                        return [4 /*yield*/, this.userService.autoRemoveUserFromGroup(id)];
                    case 1:
                        // console.log('singleUser', this.singleUser);
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_8__["ConfigService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"] },
        { type: src_app_services_search_engine_search_engine_service__WEBPACK_IMPORTED_MODULE_10__["SearchEngineService"] }
    ]; };
    AdminAllusersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-admin-allusers',
            template: __webpack_require__(/*! raw-loader!./admin-allusers.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-allusers/admin-allusers.page.html"),
            styles: [__webpack_require__(/*! ./admin-allusers.page.scss */ "./src/app/admin/admin-allusers/admin-allusers.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_8__["ConfigService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"],
            src_app_services_search_engine_search_engine_service__WEBPACK_IMPORTED_MODULE_10__["SearchEngineService"]])
    ], AdminAllusersPage);
    return AdminAllusersPage;
}());



/***/ }),

/***/ "./src/app/pipes/search-filter.pipe.ts":
/*!*********************************************!*\
  !*** ./src/app/pipes/search-filter.pipe.ts ***!
  \*********************************************/
/*! exports provided: SearchFilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchFilterPipe", function() { return SearchFilterPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SearchFilterPipe = /** @class */ (function () {
    function SearchFilterPipe() {
    }
    SearchFilterPipe.prototype.transform = function (users, text) {
        if (text.length === 0) {
            return users;
        }
        //console.log(text);
        //console.log('users in pipe', users);
        text = text.toLocaleLowerCase();
        return users.filter(function (user) {
            return user.data.name.toLocaleLowerCase().includes(text)
                || user.data.phoneNo.toLocaleLowerCase().includes(text);
        });
    };
    SearchFilterPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'searchFilter'
        })
    ], SearchFilterPipe);
    return SearchFilterPipe;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-allusers-admin-allusers-module-es5.js.map