(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-delivery-agent-details-delivery-agent-details-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/delivery-agent-details/delivery-agent-details.page.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/delivery-agent-details/delivery-agent-details.page.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"user-cart\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center style=\"margin-left: 48px;\">{{userData?.name}} (Delivery Agent)</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button (click)=\"getPendingOrdersPdf()\" fill=\"outline\" shape=\"round\" class=\"add-btn\">\r\n      download pending orders\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n<super-tabs no-shadow no-border>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Assign Orders</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button (click)=\"getAssignedOrders()\">\r\n      <ion-label>Orders</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <super-tabs-container>\r\n\r\n    <!-- Assign Orders -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"SaveBtn\">\r\n                  <ion-button (click)=\"saveAssignOrders()\" shape=\"round\" color=\"success\">\r\n                    <i class=\"flaticon-null-20 margin-icon\"></i>\r\n                    &nbsp; Assign Orders\r\n                  </ion-button>\r\n                </div>\r\n                <div class=\"dFlexBetween\">\r\n\r\n                  <div class=\"\">\r\n                    <div class=\"searchBox\">\r\n                      <ion-input class=\"searchInput\" type='number' placeholder=\"Enter Order Id\"\r\n                        [(ngModel)]='searchOrder'>\r\n                      </ion-input>&nbsp;\r\n                      <ion-button (click)='searchOrderById()' expand=\"block\" size=\"small\">Search</ion-button>&nbsp;\r\n                      <ion-button (click)='resetSearch()' size=\"small\" fill=\"outline\" color=\"danger\">Clear </ion-button>\r\n                    </div>\r\n                  </div>\r\n\r\n\r\n                  <div class=\"dFlex\">\r\n                    <ion-label>Select All</ion-label>\r\n                    <div class=\"toggle-btn\">\r\n                      <label class=\"switch\">\r\n                        <input type=\"checkbox\" (click)=\"selectAllOrder()\" [checked]=\"isAllOrderSelect\">\r\n                        <span class=\"slider round\"></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"no-data\" *ngIf=\"!unAssignOrders.length; else assignOrdersHasLength;\" text-center>\r\n                  <img src=\"assets/img/no-orders.png\" alt=\"\">\r\n                  <h6>No orders For Assign</h6>\r\n                </div>\r\n\r\n                <ng-template #assignOrdersHasLength>\r\n                  <div class=\"resultArea\">\r\n                    <table>\r\n                      <thead>\r\n                        <th>Image</th>\r\n                        <th>Name</th>\r\n                        <th>Order ID</th>\r\n                        <th>Price</th>\r\n                        <th>Status</th>\r\n                        <th>Delivery Agent</th>\r\n                        <th>Placed On</th>\r\n                        <!-- <th>View</th> -->\r\n                        <th>Select</th>\r\n                      </thead>\r\n                      <tbody>\r\n                        <tr *ngFor=\"let order of unAssignOrders; index as i\">\r\n                          <td>\r\n                            <div slot=\"start\"\r\n                              [ngStyle]=\"{'background': 'url(' + order.products[0].img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n                              class=\"productImage\">\r\n                              <!-- <div class=\"more\" *ngIf=\"order.products.length > 1\">\r\n                                + {{order.products.length - 1}} more\r\n                              </div> -->\r\n                            </div>\r\n                          </td>\r\n                          <td>\r\n                            <p class=\"aud-product-name ion-text-wrap\">\r\n                              {{order.products[0].name}}\r\n                              <span *ngIf=\"order.products.length > 1\"><br>( +{{order.products.length - 1}} more )</span>\r\n                            </p>\r\n                          </td>\r\n                          <td>\r\n                            <div>ORD: {{order.orderId}}</div>\r\n                          </td>\r\n                          <td>\r\n                            <p class=\"aud-product-price ion-text-wrap\">\r\n                              {{order.totalAmountToPaid | currency: currencyCode:true:'0.0'}}\r\n                            </p>\r\n                          </td>\r\n                          <td>\r\n                            <p>{{order.status}}<span>&nbsp;<i class=\"flaticon-null-20\"></i></span></p>\r\n                          </td>\r\n                          <td>\r\n                            <p>{{order.deliveryAgentId ? \"Reassign\" : \"None\"}}</p>\r\n                          </td>\r\n                          <td>\r\n                            <div class=\"placedOn\" *ngIf=\"order?.createdAt\">\r\n                              {{order.createdAt.toDate() | date}} by <span>{{order.userName}}</span>\r\n                            </div>\r\n                            <ion-text *ngIf=\"!order.createdAt\">--</ion-text>\r\n                          </td>\r\n                          <!-- <td>\r\n                            <ion-button (click)=\"onClickViewDetails(order.orderId, i)\" size=\"small\" fill=\"outline\">\r\n                              View Detail\r\n                            </ion-button>\r\n                          </td> -->\r\n                          <td>\r\n                            <div class=\"checkboxInput\" (click)=\"onClickCheckBox(order.id)\">\r\n                              <ion-label></ion-label>\r\n                              <ion-checkbox [checked]=\"editCheckBoxValue(order.id)\" color=\"primary\" slot=\"start\">\r\n                              </ion-checkbox>\r\n                            </div>\r\n                          </td>\r\n                        </tr>\r\n                      </tbody>\r\n                    </table>\r\n                  </div>\r\n                  <!-- <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadMoreOrders($event)\">\r\n                    <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more users...\">\r\n                    </ion-infinite-scroll-content>\r\n                  </ion-infinite-scroll> -->\r\n                </ng-template>\r\n\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n\r\n    </super-tab>\r\n\r\n    <!-- Orders -->\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"2\" id=\"scroll1\">\r\n                <div class=\"statusList\">\r\n                  <p class=\"ion-activatable\" *ngFor=\"let item of sideMenu;  index as i\" (click)=\"changeComponent(i)\"\r\n                    [ngClass]=\"activeTile == i ? 'tile-bg-active' : 'tile-bg-inactive'\">\r\n                    {{item}}\r\n                    <ion-ripple-effect></ion-ripple-effect>\r\n                  </p>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"10\" id=\"scroll2\">\r\n                <ion-grid>\r\n                  <ion-row>\r\n                    <!-- Orders -->\r\n                    <ion-col size=\"12\">\r\n                      <h3 class=\"text-center\">{{activeTile == 0 ? 'Pending' : 'Delivered'}} Orders</h3>\r\n                      <div class=\"no-data\" *ngIf=\"!orders.length; else ordersHasLength;\" text-center>\r\n                        <img src=\"assets/img/no-orders.png\" alt=\"\">\r\n                        <h6>No {{activeTile == 0 ? 'pending' : 'delivered'}} orders</h6>\r\n                      </div>\r\n\r\n                      <!-- Orders Card -->\r\n                      <ng-template #ordersHasLength>\r\n                        <div *ngFor=\"let order of orders; let i=index\">\r\n                          <ng-container *ngIf=\"showOrder(order)\">\r\n                            <div class=\"aud-order-id\">\r\n                              Order Id: ORD{{order.orderId}}\r\n                            </div>\r\n                            <div class=\"aud-products-container\">\r\n                              <div class=\"aud-placed-on\" *ngIf=\"order.createdAt\">\r\n                                Placed On {{order.createdAt.toDate() | date}} by <span>{{order.userName}}</span>\r\n                              </div>\r\n                              <ion-list class=\"ion-no-padding\" lines=\"none\" *ngIf=\"order?.products[0]\">\r\n                                <ion-item class=\"ion-no-padding\">\r\n                                  <div slot=\"start\"\r\n                                    [ngStyle]=\"{'background': 'url(' + order.products[0].img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n                                    class=\"aud-product-image\">\r\n                                    <div class=\"aud-more\" *ngIf=\"order.products.length > 1\">\r\n                                      + {{order.products.length - 1}} more\r\n                                    </div>\r\n                                  </div>\r\n                                  <ion-label>\r\n                                    <h2 class=\"aud-product-price ion-text-wrap\">\r\n                                      {{order.totalAmountToPaid | currency: currencyCode:true:'0.0'}}\r\n                                    </h2>\r\n                                    <h3 class=\"aud-product-name ion-text-wrap\">{{order.products[0].name}} <span\r\n                                        *ngIf=\"order.products.length > 1\">+ {{order.products.length - 1}} more</span>\r\n                                    </h3>\r\n                                    <h5>{{order.status}}<span><i class=\"flaticon-null-20\"></i></span></h5>\r\n                                  </ion-label>\r\n                                </ion-item>\r\n                                <div class=\"aud-action-btn\"\r\n                                  *ngIf=\"order.deliveryStatus === 'inProgress' && (order.status === 'Confirmed' || order.status === 'Dispatched'); else showOnlyViewOrder\">\r\n                                  <ion-grid>\r\n                                    <ion-row class=\"ion-justify-content-center\" style=\"opacity: .6;font-size: small;\">\r\n                                      <ion-col size=\"12\">\r\n                                        Delivery agent has started delivery\r\n                                      </ion-col>\r\n                                    </ion-row>\r\n                                    <ion-row>\r\n                                      <ion-col size=\"6\">\r\n                                        <ion-button (click)=\"onClickViewDetails(order.orderId, i)\" size=\"small\"\r\n                                          shape=\"round\">\r\n                                          View Order\r\n                                        </ion-button>\r\n                                      </ion-col>\r\n                                      <ion-col size=\"6\">\r\n                                        <ion-button\r\n                                          (click)=\"onClickTrackOrder(order.deliveryAgentId, order.deliveryLatLng)\"\r\n                                          size=\"small\" shape=\"round\" color=\"dark\">\r\n                                          Track Order\r\n                                        </ion-button>\r\n                                      </ion-col>\r\n                                    </ion-row>\r\n                                  </ion-grid>\r\n                                </div>\r\n                                <ng-template #showOnlyViewOrder>\r\n                                  <div class=\"aud-view-details-btn\">\r\n                                    <ion-button (click)=\"onClickViewDetails(order.orderId, i)\" size=\"small\"\r\n                                      shape=\"round\">\r\n                                      View Order\r\n                                    </ion-button>\r\n                                  </div>\r\n                                </ng-template>\r\n                              </ion-list>\r\n                            </div>\r\n                          </ng-container>\r\n                        </div>\r\n                      </ng-template>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                </ion-grid>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n  </super-tabs-container>\r\n</super-tabs>\r\n\r\n<!-- <ion-footer ngIf=\"isAssignOrdersDisplay\" class=\"page-footer\" no-border>\r\n  <div class=\"main-container\">\r\n    \r\n  </div>\r\n</ion-footer> -->"

/***/ }),

/***/ "./src/app/admin/delivery-agent-details/delivery-agent-details.module.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/delivery-agent-details/delivery-agent-details.module.ts ***!
  \*******************************************************************************/
/*! exports provided: DeliveryAgentDetailsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveryAgentDetailsPageModule", function() { return DeliveryAgentDetailsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _delivery_agent_details_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./delivery-agent-details.page */ "./src/app/admin/delivery-agent-details/delivery-agent-details.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm2015/ionic-super-tabs-angular.js");








const routes = [
    {
        path: '',
        component: _delivery_agent_details_page__WEBPACK_IMPORTED_MODULE_6__["DeliveryAgentDetailsPage"]
    }
];
let DeliveryAgentDetailsPageModule = class DeliveryAgentDetailsPageModule {
};
DeliveryAgentDetailsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"],
        ],
        declarations: [_delivery_agent_details_page__WEBPACK_IMPORTED_MODULE_6__["DeliveryAgentDetailsPage"]]
    })
], DeliveryAgentDetailsPageModule);



/***/ }),

/***/ "./src/app/admin/delivery-agent-details/delivery-agent-details.page.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/delivery-agent-details/delivery-agent-details.page.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#scroll1 {\n  overflow: hidden;\n  height: 82vh;\n  margin-top: 8px;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 82vh;\n  margin-top: 8px;\n  border-left: 1px solid lightgray;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n.statusList {\n  text-align: center;\n}\n\n.statusList p {\n  font-size: medium;\n  border: 1px solid lightgray;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n  text-transform: capitalize;\n  border-radius: 6px;\n}\n\n.ion-activatable {\n  position: relative;\n  overflow: hidden;\n}\n\n.no-data {\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  left: 50%;\n}\n\n.no-data img {\n  width: 130px;\n}\n\nion-list {\n  border-radius: 5px;\n}\n\n.aud-products-container {\n  margin: 0px 10px 10px 10px;\n  background: white;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 15px 5px 10px 2px;\n}\n\n.aud-product-image {\n  background: transparent url('img-preloader.png') center no-repeat;\n  width: 85px;\n  height: 85px;\n  position: relative;\n  left: 15px;\n  border: 1px solid #f0f0f0;\n}\n\n.aud-more {\n  background: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(transparent));\n  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent);\n  bottom: 0;\n  height: 20px;\n  position: absolute;\n  width: 84px;\n  z-index: 2;\n  color: white;\n  font-size: 12px;\n  text-align: center;\n  padding: 5px;\n}\n\n.aud-product-name {\n  font-size: 14px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.aud-product-price {\n  color: var(--ion-color-primary);\n  font-size: 18px;\n}\n\n.spinner {\n  margin-top: 50%;\n  text-align: center;\n}\n\n.aud-placed-on {\n  font-size: 12px;\n  text-align: center;\n  opacity: 0.7;\n  margin-bottom: 3%;\n}\n\n.aud-placed-on span {\n  font-weight: 600;\n}\n\n.aud-order-id {\n  margin: 15px 10px 1px;\n  opacity: 0.8;\n  font-size: 13px;\n}\n\n.aud-action-btn {\n  text-align: center;\n}\n\n.aud-view-details-btn {\n  text-align: center;\n}\n\nspan .flaticon-null-20::before {\n  color: var(--ion-color-success);\n  margin-left: 2px;\n}\n\nspan .flaticon-null-19::before {\n  color: var(--ion-color-danger);\n  margin-left: 2px;\n}\n\n.address-card {\n  background: white;\n  padding: 10px;\n  margin: 6px 12px 12px 12px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.user-name {\n  font-size: 15px;\n}\n\n.address {\n  font-size: 13px;\n}\n\n.phone-no {\n  font-size: 13px;\n  margin-bottom: -5px;\n}\n\n.trans-wrapper {\n  margin-top: 15px;\n  padding-bottom: 50px;\n}\n\n.trans-conatiner {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 15px;\n  margin-bottom: 15px;\n  background-color: white;\n}\n\n.trans-type {\n  font-weight: bold;\n  font-size: small;\n}\n\n.inline-align {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.inline-align h6 {\n  font-size: 15px;\n}\n\n.trans-msg {\n  margin-top: 0px;\n}\n\n.trans-date, .reason {\n  font-size: 12px;\n  opacity: 0.6;\n}\n\n.cancel-btn {\n  background-color: var(--ion-color-dark);\n  color: white;\n}\n\n.cancel-btn div {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.save-btn {\n  background-color: var(--ion-color-primary);\n  color: var(--ion-color-primary-contrast);\n}\n\n.margin-icon {\n  margin-left: 5px;\n}\n\nion-footer ion-title {\n  height: 45px;\n}\n\n.bottom-buttons {\n  font-size: 14px;\n  margin-left: 5px;\n}\n\n.userInfo {\n  border: none;\n  width: 100vw;\n  height: 15vh;\n  padding: 10px;\n  outline: none;\n}\n\ninput {\n  border: none;\n  border-bottom: 1px solid;\n  text-align: center;\n}\n\n.state-div {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  margin: 0px 10px;\n}\n\n.state-wrapper {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1 {\n    height: 92vh;\n  }\n\n  #scroll2 {\n    height: 92vh;\n  }\n}\n\n.SaveBtn {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n\n.dFlexBetween {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  gap: 1rem;\n}\n\n.dFlex {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n  -webkit-box-align: center;\n          align-items: center;\n  gap: 1rem;\n}\n\n.resultArea {\n  margin-top: 1rem;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  padding: 0.5rem;\n}\n\n.resultArea table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.resultArea table td,\n.resultArea table th {\n  text-align: left;\n  padding: 8px;\n  max-width: 100px;\n}\n\n.resultArea table tr:hover {\n  border-radius: 6px;\n  background-color: #efefef;\n}\n\n.resultArea .productImage {\n  background: transparent url('img-preloader.png') center no-repeat;\n  max-width: 85px;\n  height: 85px;\n  border: 1px solid #f0f0f0;\n  position: relative;\n}\n\n.resultArea .placedOn {\n  font-size: 12px;\n  opacity: 0.7;\n}\n\n.resultArea .placedOn span {\n  font-weight: 600;\n}\n\n.searchBox {\n  width: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-bottom: 8px;\n}\n\n.searchInput {\n  height: 30px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\n\n.checkboxInput {\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vZGVsaXZlcnktYWdlbnQtZGV0YWlscy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGRlbGl2ZXJ5LWFnZW50LWRldGFpbHNcXGRlbGl2ZXJ5LWFnZW50LWRldGFpbHMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9kZWxpdmVyeS1hZ2VudC1kZXRhaWxzL2RlbGl2ZXJ5LWFnZW50LWRldGFpbHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtBQ0ZGOztBREtBO0VBQ0UsZ0JBQUE7QUNGRjs7QURLQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxnQ0FBQTtBQ0ZGOztBREtBO0VBQ0UsZ0JBQUE7QUNGRjs7QURLQTtFQUNFLGtCQUFBO0FDRkY7O0FER0U7RUFDRSxpQkFBQTtFQUNBLDJCQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EsMEJBQUE7RUFDQSxrQkFBQTtBQ0RKOztBRElBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtBQ0RGOztBRElBO0VBS0UsbUNBQUE7VUFBQSwyQkFBQTtFQUNBLFNBQUE7QUNMRjs7QURTQTtFQUNFLFlBQUE7QUNORjs7QURjQTtFQUNFLGtCQUFBO0FDWEY7O0FEY0E7RUFDRSwwQkFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLDBCQUFBO0FDWEY7O0FEZUE7RUFDRSxpRUFBQTtFQUVBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EseUJBQUE7QUNiRjs7QURnQkE7RUFDRSxzR0FBQTtFQUFBLGtFQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUNiRjs7QURn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QUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0Esa0JBQUE7QUN2QkY7O0FEeUJBO0VBQ0UsWUFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7QUN0QkY7O0FEd0JBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FDckJGIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vZGVsaXZlcnktYWdlbnQtZGV0YWlscy9kZWxpdmVyeS1hZ2VudC1kZXRhaWxzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIC5tYWluLWNvbnRhaW5lciB7XHJcbi8vICAgd2lkdGg6IDEwMCU7XHJcbi8vIH1cclxuI3Njcm9sbDEge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiA4MnZoO1xyXG4gIG1hcmdpbi10b3A6IDhweDtcclxufVxyXG5cclxuI3Njcm9sbDE6aG92ZXIge1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxuXHJcbiNzY3JvbGwyIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogODJ2aDtcclxuICBtYXJnaW4tdG9wOiA4cHg7XHJcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbn1cclxuXHJcbiNzY3JvbGwyOmhvdmVyIHtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcblxyXG4uc3RhdHVzTGlzdCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHAge1xyXG4gICAgZm9udC1zaXplOiBtZWRpdW07XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgbWFyZ2luOiA4cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICB9XHJcbn1cclxuLmlvbi1hY3RpdmF0YWJsZSB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5uby1kYXRhIHtcclxuICAvLyBtYXJnaW46IDA7XHJcbiAgLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4gIC8vIHRvcDogNTAlO1xyXG4gIC8vIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gIGxlZnQ6IDUwJTtcclxuICAvLyBtYXJnaW4tbGVmdDogLTY1cHg7XHJcbn1cclxuXHJcbi5uby1kYXRhIGltZyB7XHJcbiAgd2lkdGg6IDEzMHB4O1xyXG59XHJcblxyXG4vLyBpb24tY29udGVudCB7XHJcbi8vICAgLS1iYWNrZ3JvdW5kOiAjZjJmMmYyO1xyXG4vLyAgIC0tcGFkZGluZy1ib3R0b206IDUwcHg7XHJcbi8vIH1cclxuXHJcbmlvbi1saXN0IHtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5hdWQtcHJvZHVjdHMtY29udGFpbmVyIHtcclxuICBtYXJnaW46IDBweCAxMHB4IDEwcHggMTBweDtcclxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBwYWRkaW5nOiAxNXB4IDVweCAxMHB4IDJweDtcclxuICAvLyBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi5hdWQtcHJvZHVjdC1pbWFnZSB7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiLi4vLi4vLi4vYXNzZXRzL2ltZy9pbWctcHJlbG9hZGVyLnBuZ1wiKSBjZW50ZXJcclxuICAgIG5vLXJlcGVhdDtcclxuICB3aWR0aDogODVweDtcclxuICBoZWlnaHQ6IDg1cHg7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGxlZnQ6IDE1cHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2YwZjBmMDtcclxufVxyXG5cclxuLmF1ZC1tb3JlIHtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgcmdiYSgwLCAwLCAwLCAwLjUpLCB0cmFuc3BhcmVudCk7XHJcbiAgYm90dG9tOiAwO1xyXG4gIGhlaWdodDogMjBweDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgd2lkdGg6IDg0cHg7XHJcbiAgei1pbmRleDogMjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBwYWRkaW5nOiA1cHg7XHJcbn1cclxuXHJcbi5hdWQtcHJvZHVjdC1uYW1lIHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uYXVkLXByb2R1Y3QtcHJpY2Uge1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG59XHJcblxyXG4uc3Bpbm5lciB7XHJcbiAgbWFyZ2luLXRvcDogNTAlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmF1ZC1wbGFjZWQtb24ge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgb3BhY2l0eTogMC43O1xyXG4gIG1hcmdpbi1ib3R0b206IDMlO1xyXG59XHJcbi5hdWQtcGxhY2VkLW9uIHNwYW4ge1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuLmF1ZC1vcmRlci1pZCB7XHJcbiAgbWFyZ2luOiAxNXB4IDEwcHggMXB4O1xyXG4gIG9wYWNpdHk6IDAuODtcclxuICBmb250LXNpemU6IDEzcHg7XHJcbn1cclxuXHJcbi5hdWQtYWN0aW9uLWJ0biB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi5hdWQtdmlldy1kZXRhaWxzLWJ0biB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbnNwYW4gLmZsYXRpY29uLW51bGwtMjA6OmJlZm9yZSB7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxuICBtYXJnaW4tbGVmdDogMnB4O1xyXG59XHJcbnNwYW4gLmZsYXRpY29uLW51bGwtMTk6OmJlZm9yZSB7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gIG1hcmdpbi1sZWZ0OiAycHg7XHJcbn1cclxuXHJcbi5hZGRyZXNzLWNhcmQge1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAgbWFyZ2luOiA2cHggMTJweCAxMnB4IDEycHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi51c2VyLW5hbWUge1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG4uYWRkcmVzcyB7XHJcbiAgZm9udC1zaXplOiAxM3B4O1xyXG59XHJcbi5waG9uZS1ubyB7XHJcbiAgZm9udC1zaXplOiAxM3B4O1xyXG4gIG1hcmdpbi1ib3R0b206IC01cHg7XHJcbn1cclxuXHJcbi50cmFucy13cmFwcGVyIHtcclxuICBtYXJnaW4tdG9wOiAxNXB4O1xyXG4gIHBhZGRpbmctYm90dG9tOiA1MHB4O1xyXG59XHJcblxyXG4udHJhbnMtY29uYXRpbmVyIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBwYWRkaW5nOiAxNXB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi50cmFucy10eXBlIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBmb250LXNpemU6IHNtYWxsO1xyXG59XHJcblxyXG4uaW5saW5lLWFsaWduIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi5pbmxpbmUtYWxpZ24gaDYge1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG4udHJhbnMtbXNnIHtcclxuICBtYXJnaW4tdG9wOiAwcHg7XHJcbn1cclxuXHJcbi50cmFucy1kYXRlIHtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgb3BhY2l0eTogMC42O1xyXG59XHJcblxyXG4uY2FuY2VsLWJ0biB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBkaXYge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgfVxyXG59XHJcblxyXG4uc2F2ZS1idG4ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xyXG59XHJcblxyXG4ubWFyZ2luLWljb24ge1xyXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbn1cclxuXHJcbmlvbi1mb290ZXIgaW9uLXRpdGxlIHtcclxuICBoZWlnaHQ6IDQ1cHg7XHJcbn1cclxuXHJcbi5ib3R0b20tYnV0dG9ucyB7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbn1cclxuXHJcbi51c2VySW5mbyB7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIHdpZHRoOiAxMDB2dztcclxuICBoZWlnaHQ6IDE1dmg7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBvdXRsaW5lOiBub25lO1xyXG59XHJcblxyXG4ucmVhc29uIHtcclxuICBAZXh0ZW5kIC50cmFucy1kYXRlO1xyXG59XHJcblxyXG5pbnB1dCB7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5zdGF0ZS1kaXYge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW46IDBweCAxMHB4O1xyXG59XHJcbi5zdGF0ZS13cmFwcGVyIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBwYWRkaW5nOiA4cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQobWluLWhlaWdodDogMTIwMHB4KSB7XHJcbiAgI3Njcm9sbDEge1xyXG4gICAgaGVpZ2h0OiA5MnZoO1xyXG4gIH1cclxuICAjc2Nyb2xsMiB7XHJcbiAgICBoZWlnaHQ6IDkydmg7XHJcbiAgfVxyXG59XHJcbi5TYXZlQnRuIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcclxufVxyXG4uZEZsZXhCZXR3ZWVuIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMXJlbTtcclxufVxyXG4uZEZsZXgge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMXJlbTtcclxufVxyXG4ucmVzdWx0QXJlYSB7XHJcbiAgbWFyZ2luLXRvcDogMXJlbTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBwYWRkaW5nOiAwLjVyZW07XHJcblxyXG4gIHRhYmxlIHtcclxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuXHJcbiAgICB0ZCxcclxuICAgIHRoIHtcclxuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgICAgcGFkZGluZzogOHB4O1xyXG4gICAgICBtYXgtd2lkdGg6IDEwMHB4O1xyXG4gICAgfVxyXG4gICAgLy8gdHI6bnRoLWNoaWxkKGV2ZW4pIHtcclxuICAgIC8vICAgYmFja2dyb3VuZC1jb2xvcjogI2RkZGRkZDtcclxuICAgIC8vIH1cclxuICAgIHRyOmhvdmVyIHtcclxuICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnByb2R1Y3RJbWFnZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXCIuLi8uLi8uLi9hc3NldHMvaW1nL2ltZy1wcmVsb2FkZXIucG5nXCIpIGNlbnRlclxyXG4gICAgICBuby1yZXBlYXQ7XHJcbiAgICBtYXgtd2lkdGg6IDg1cHg7XHJcbiAgICBoZWlnaHQ6IDg1cHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZjBmMGYwO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG5cclxuICAgIC8vIC5tb3JlIHtcclxuICAgIC8vICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDBkZWcsIHJnYmEoMCwgMCwgMCwgMC41KSwgdHJhbnNwYXJlbnQpO1xyXG4gICAgLy8gICBib3R0b206IDA7XHJcbiAgICAvLyAgIGhlaWdodDogMjBweDtcclxuICAgIC8vICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgLy8gICBtYXgtd2lkdGg6IDg1cHg7XHJcbiAgICAvLyAgIHotaW5kZXg6IDI7XHJcbiAgICAvLyAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIC8vICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgLy8gICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAvLyAgIHBhZGRpbmc6IDVweDtcclxuICAgIC8vIH1cclxuICB9XHJcblxyXG4gIC5wbGFjZWRPbiB7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBvcGFjaXR5OiAwLjc7XHJcbiAgICBzcGFuIHtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuLnNlYXJjaEJveCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDhweDtcclxufVxyXG4uc2VhcmNoSW5wdXQge1xyXG4gIGhlaWdodDogMzBweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxufVxyXG4uY2hlY2tib3hJbnB1dCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4iLCIjc2Nyb2xsMSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogODJ2aDtcbiAgbWFyZ2luLXRvcDogOHB4O1xufVxuXG4jc2Nyb2xsMTpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbiNzY3JvbGwyIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA4MnZoO1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgbGlnaHRncmF5O1xufVxuXG4jc2Nyb2xsMjpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5zdGF0dXNMaXN0IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLnN0YXR1c0xpc3QgcCB7XG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbjogOHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG59XG5cbi5pb24tYWN0aXZhdGFibGUge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5uby1kYXRhIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBsZWZ0OiA1MCU7XG59XG5cbi5uby1kYXRhIGltZyB7XG4gIHdpZHRoOiAxMzBweDtcbn1cblxuaW9uLWxpc3Qge1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5hdWQtcHJvZHVjdHMtY29udGFpbmVyIHtcbiAgbWFyZ2luOiAwcHggMTBweCAxMHB4IDEwcHg7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDE1cHggNXB4IDEwcHggMnB4O1xufVxuXG4uYXVkLXByb2R1Y3QtaW1hZ2Uge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXCIuLi8uLi8uLi9hc3NldHMvaW1nL2ltZy1wcmVsb2FkZXIucG5nXCIpIGNlbnRlciBuby1yZXBlYXQ7XG4gIHdpZHRoOiA4NXB4O1xuICBoZWlnaHQ6IDg1cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbGVmdDogMTVweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2YwZjBmMDtcbn1cblxuLmF1ZC1tb3JlIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDBkZWcsIHJnYmEoMCwgMCwgMCwgMC41KSwgdHJhbnNwYXJlbnQpO1xuICBib3R0b206IDA7XG4gIGhlaWdodDogMjBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogODRweDtcbiAgei1pbmRleDogMjtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDEycHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogNXB4O1xufVxuXG4uYXVkLXByb2R1Y3QtbmFtZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLmF1ZC1wcm9kdWN0LXByaWNlIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgZm9udC1zaXplOiAxOHB4O1xufVxuXG4uc3Bpbm5lciB7XG4gIG1hcmdpbi10b3A6IDUwJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uYXVkLXBsYWNlZC1vbiB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBvcGFjaXR5OiAwLjc7XG4gIG1hcmdpbi1ib3R0b206IDMlO1xufVxuXG4uYXVkLXBsYWNlZC1vbiBzcGFuIHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmF1ZC1vcmRlci1pZCB7XG4gIG1hcmdpbjogMTVweCAxMHB4IDFweDtcbiAgb3BhY2l0eTogMC44O1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi5hdWQtYWN0aW9uLWJ0biB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmF1ZC12aWV3LWRldGFpbHMtYnRuIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5zcGFuIC5mbGF0aWNvbi1udWxsLTIwOjpiZWZvcmUge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICBtYXJnaW4tbGVmdDogMnB4O1xufVxuXG5zcGFuIC5mbGF0aWNvbi1udWxsLTE5OjpiZWZvcmUge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG4gIG1hcmdpbi1sZWZ0OiAycHg7XG59XG5cbi5hZGRyZXNzLWNhcmQge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgcGFkZGluZzogMTBweDtcbiAgbWFyZ2luOiA2cHggMTJweCAxMnB4IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLnVzZXItbmFtZSB7XG4gIGZvbnQtc2l6ZTogMTVweDtcbn1cblxuLmFkZHJlc3Mge1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi5waG9uZS1ubyB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgbWFyZ2luLWJvdHRvbTogLTVweDtcbn1cblxuLnRyYW5zLXdyYXBwZXIge1xuICBtYXJnaW4tdG9wOiAxNXB4O1xuICBwYWRkaW5nLWJvdHRvbTogNTBweDtcbn1cblxuLnRyYW5zLWNvbmF0aW5lciB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcGFkZGluZzogMTVweDtcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbi50cmFucy10eXBlIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtc2l6ZTogc21hbGw7XG59XG5cbi5pbmxpbmUtYWxpZ24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5pbmxpbmUtYWxpZ24gaDYge1xuICBmb250LXNpemU6IDE1cHg7XG59XG5cbi50cmFucy1tc2cge1xuICBtYXJnaW4tdG9wOiAwcHg7XG59XG5cbi50cmFucy1kYXRlLCAucmVhc29uIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBvcGFjaXR5OiAwLjY7XG59XG5cbi5jYW5jZWwtYnRuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICBjb2xvcjogd2hpdGU7XG59XG4uY2FuY2VsLWJ0biBkaXYge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uc2F2ZS1idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG59XG5cbi5tYXJnaW4taWNvbiB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG5cbmlvbi1mb290ZXIgaW9uLXRpdGxlIHtcbiAgaGVpZ2h0OiA0NXB4O1xufVxuXG4uYm90dG9tLWJ1dHRvbnMge1xuICBmb250LXNpemU6IDE0cHg7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG5cbi51c2VySW5mbyB7XG4gIGJvcmRlcjogbm9uZTtcbiAgd2lkdGg6IDEwMHZ3O1xuICBoZWlnaHQ6IDE1dmg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbmlucHV0IHtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnN0YXRlLWRpdiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbjogMHB4IDEwcHg7XG59XG5cbi5zdGF0ZS13cmFwcGVyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiA4cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xuICAjc2Nyb2xsMSB7XG4gICAgaGVpZ2h0OiA5MnZoO1xuICB9XG5cbiAgI3Njcm9sbDIge1xuICAgIGhlaWdodDogOTJ2aDtcbiAgfVxufVxuLlNhdmVCdG4ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDJyZW07XG59XG5cbi5kRmxleEJldHdlZW4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMXJlbTtcbn1cblxuLmRGbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxcmVtO1xufVxuXG4ucmVzdWx0QXJlYSB7XG4gIG1hcmdpbi10b3A6IDFyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogMC41cmVtO1xufVxuLnJlc3VsdEFyZWEgdGFibGUge1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICB3aWR0aDogMTAwJTtcbn1cbi5yZXN1bHRBcmVhIHRhYmxlIHRkLFxuLnJlc3VsdEFyZWEgdGFibGUgdGgge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBwYWRkaW5nOiA4cHg7XG4gIG1heC13aWR0aDogMTAwcHg7XG59XG4ucmVzdWx0QXJlYSB0YWJsZSB0cjpob3ZlciB7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjtcbn1cbi5yZXN1bHRBcmVhIC5wcm9kdWN0SW1hZ2Uge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXCIuLi8uLi8uLi9hc3NldHMvaW1nL2ltZy1wcmVsb2FkZXIucG5nXCIpIGNlbnRlciBuby1yZXBlYXQ7XG4gIG1heC13aWR0aDogODVweDtcbiAgaGVpZ2h0OiA4NXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZjBmMGYwO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4ucmVzdWx0QXJlYSAucGxhY2VkT24ge1xuICBmb250LXNpemU6IDEycHg7XG4gIG9wYWNpdHk6IDAuNztcbn1cbi5yZXN1bHRBcmVhIC5wbGFjZWRPbiBzcGFuIHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLnNlYXJjaEJveCB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG59XG5cbi5zZWFyY2hJbnB1dCB7XG4gIGhlaWdodDogMzBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuXG4uY2hlY2tib3hJbnB1dCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/delivery-agent-details/delivery-agent-details.page.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/admin/delivery-agent-details/delivery-agent-details.page.ts ***!
  \*****************************************************************************/
/*! exports provided: DeliveryAgentDetailsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveryAgentDetailsPage", function() { return DeliveryAgentDetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _admin_home_view_order_view_order_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../admin-home/view-order/view-order.page */ "./src/app/admin/admin-home/view-order/view-order.page.ts");








let DeliveryAgentDetailsPage = class DeliveryAgentDetailsPage {
    constructor(router, route, userService, configService, modalController, sharedService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.configService = configService;
        this.modalController = modalController;
        this.sharedService = sharedService;
        this.sideMenu = [];
        this.activeTile = 0;
        this.orders = [];
        // assignOrders: any = [];
        this.unAssignOrders = [];
        this.selectedOrders = [];
        this.isAllOrderSelect = false;
        this.searchOrder = "";
        this.route.queryParams.subscribe(() => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.userId = this.router.getCurrentNavigation().extras.state.uid;
                this.userData = this.router.getCurrentNavigation().extras.state.udata;
            }
        });
    }
    ngOnInit() {
        this.sideMenu.push('Pending', 'Delivered');
        this.currencyCode = this.configService.environment.currencyCode;
    }
    ionViewDidEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.ordersData = [];
            yield this.sharedService.presentLoading();
            this.initSubscription();
            // this.ordersData = await this.userService.getDeliveryAgentOrders(this.userId);
            yield this.getUnAssignOrders();
            // await this.getAssignedOrders();
            // if (this.ordersData) {
            //   await this.changeComponent(0);
            // } else {
            this.sharedService.loading.dismiss();
            // this.sharedService.presentAlert('Something went wrong ! please try again.')
            // }
        });
    }
    initSubscription() {
        this.unAssignOrdersSub = this.userService.getUnassignOrdersListener().subscribe((data) => {
            console.log("unAssignOrdersSub", data);
            if (data && data.length > 0) {
                this.unAssignOrders = data;
            }
        });
        this.assignOrdersSub = this.userService.getAssignedOrdersListener().subscribe((data) => {
            // this.assignOrders = data;
            this.ordersData = data;
            console.log("assignOrdersSub", data);
            if (data && data.length > 0) {
                this.changeComponent(0);
            }
        });
    }
    ionViewDidLeave() {
        this.unAssignOrdersSub.unsubscribe();
        this.userService.unAssignOrdersSub.unsubscribe();
        this.assignOrdersSub.unsubscribe();
        this.userService.assignedOrdersSub.unsubscribe();
        this.userService.assignedOrders$.next([]);
        this.userService.unAssignOrders$.next([]);
    }
    getAssignedOrders() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // if (!this.ordersData.length) {
            yield this.sharedService.presentLoading();
            this.ordersData = yield this.userService.getDeliveryAgentOrders(this.userId);
            console.log("ordersData ", this.ordersData);
            this.sharedService.loading.dismiss();
            // }
        });
    }
    changeComponent(index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.activeTile = index;
            yield this.filterOrder();
        });
    }
    filterOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.sharedService.loading) {
                this.sharedService.loading.dismiss();
            }
            yield this.sharedService.presentLoading();
            if (this.ordersData) {
                this.orders = [];
                if (this.activeTile == 0) {
                    const result = yield this.ordersData.filter(order => ['Confirmed', 'Dispatched'].includes(order.status));
                    this.orders = result;
                    // console.log('pending-orders', this.orders);
                }
                else {
                    const result = yield this.ordersData.filter(order => order.status == 'Delivered');
                    this.orders = result;
                    // console.log('delivered-orders', this.orders);
                }
                this.sharedService.loading.dismiss();
            }
            else {
                this.sharedService.loading.dismiss();
                this.sharedService.presentAlert('Something went wrong ! please try again.');
            }
        });
    }
    onClickViewDetails(id, index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _admin_home_view_order_view_order_page__WEBPACK_IMPORTED_MODULE_7__["ViewOrderPage"],
                cssClass: 'view-order-css',
                componentProps: {
                    orderId: id
                }
            });
            modal.onDidDismiss().then((res) => {
                // console.log("res data:", res.data);
                if (res && res.data && res.data.status) {
                    this.orders[index].status = res.data.status;
                }
            });
            yield modal.present();
        });
    }
    onClickTrackOrder(agentId, deliveryLatLng) {
        const navigationExtras = {
            state: {
                agentId: agentId,
                deliveryLatLng: deliveryLatLng
            }
        };
        this.router.navigate(['location-map'], navigationExtras);
    }
    getPendingOrdersPdf() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let getPdf = false;
            for (let order of this.orders) {
                if (['Confirmed', 'Dispatched'].includes(order.status)) {
                    getPdf = true;
                    break;
                }
            }
            if (!getPdf) {
                this.sharedService.presentAlert('No Pending Orders Available.');
            }
            else {
                yield this.sharedService.presentLoading();
                const res = yield this.userService.generateDeliveryAgentOrdersPdf(this.userId);
                if (res) {
                    this.sharedService.loading.dismiss();
                }
                else {
                    yield this.sharedService.presentAlert('Something went wrong please try again.');
                }
            }
        });
    }
    showOrder(order) {
        if (this.activeTile == 0) {
            return ['Confirmed', 'Dispatched'].includes(order.status);
        }
        else {
            return order.status === 'Delivered';
        }
    }
    // ? Start Assigning Orders Function
    getUnAssignOrders() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let responseUnAssignOrders = yield this.userService.getAllOrders(this.userId);
            console.log("orders", responseUnAssignOrders);
            this.unAssignOrders = responseUnAssignOrders;
        });
    }
    saveAssignOrders() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            if (this.selectedOrders.length > 0) {
                let response = yield this.userService.assignDeliveryAgentToOrders(this.userId, this.selectedOrders);
                // await this.getAssignOrders();
                yield this.sharedService.loading.dismiss();
                console.log("response: ", response);
                if (response) {
                    yield this.sharedService.presentAlert("Delivery Agent assigned successfully");
                }
                else {
                    yield this.sharedService.presentAlert("Delivery Agent not assigned");
                }
            }
            else {
                yield this.sharedService.loading.dismiss();
                yield this.sharedService.presentAlert("Please select a order");
            }
        });
    }
    // async loadMoreOrders(event: any) {
    //   // this.events.publish('user:loadMoreUsersForAdminUsers',this.sortValue);
    //   setTimeout(() => {
    //     event.target.complete();
    //   }, 1000);
    //   if (this.noMoreUsers === true) {
    //     event.target.disabled = true;
    //   }
    // }
    searchOrderById() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            if (!isNaN(parseInt(this.searchOrder))) {
                let data = yield this.userService.returnOrderWithOrderId(parseInt(this.searchOrder), this.userId);
                console.log('res:', data);
                this.sharedService.loading.dismiss();
                if (data && data.length > 0) {
                    this.unAssignOrders = data;
                    // this.bookingOrders = data;
                    // this.viewBooking(0);
                }
                else {
                    this.sharedService.presentAlert('No such Order found !');
                }
            }
            else {
                this.sharedService.loading.dismiss();
                this.sharedService.presentAlert('Please enter a valid number');
                return;
            }
        });
    }
    resetSearch() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            this.searchOrder = '';
            // await this.getAssignOrders();
            yield this.sharedService.loading.dismiss();
            // await this.ionViewDidEnter();
        });
    }
    selectAllOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            this.isAllOrderSelect = !this.isAllOrderSelect;
            if (this.isAllOrderSelect) {
                this.selectedOrders = [];
                for (const item of this.unAssignOrders) {
                    this.selectedOrders.push(item.id);
                }
            }
            else {
                this.selectedOrders = [];
            }
            console.log("selected order: ", this.selectedOrders);
            yield this.sharedService.loading.dismiss();
        });
    }
    onClickCheckBox(id) {
        if (this.selectedOrders.indexOf(id) === -1) {
            this.selectedOrders.push(id);
        }
        else {
            const index = this.selectedOrders.indexOf(id);
            this.selectedOrders.splice(index, 1);
        }
        console.log("order selected: ", this.selectedOrders);
    }
    editCheckBoxValue(id) {
        if (this.selectedOrders.indexOf(id) !== -1) {
            return true;
        }
        else {
            return false;
        }
    }
};
DeliveryAgentDetailsPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"] }
];
DeliveryAgentDetailsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-delivery-agent-details',
        template: __webpack_require__(/*! raw-loader!./delivery-agent-details.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/delivery-agent-details/delivery-agent-details.page.html"),
        styles: [__webpack_require__(/*! ./delivery-agent-details.page.scss */ "./src/app/admin/delivery-agent-details/delivery-agent-details.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"],
        src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_5__["SharedService"]])
], DeliveryAgentDetailsPage);



/***/ })

}]);
//# sourceMappingURL=admin-delivery-agent-details-delivery-agent-details-module-es2015.js.map