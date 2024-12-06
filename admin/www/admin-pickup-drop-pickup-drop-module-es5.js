(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-pickup-drop-pickup-drop-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/pickup-drop/pickup-drop.page.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/pickup-drop/pickup-drop.page.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Pick Up & Drop</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-no-padding\">\r\n  <super-tabs no-shadow no-border>\r\n    <super-tabs-toolbar slot=\"top\">\r\n      <super-tab-button>\r\n        <ion-label>Orders</ion-label>\r\n      </super-tab-button>\r\n      <super-tab-button>\r\n        <ion-label>Settings</ion-label>\r\n      </super-tab-button>\r\n    </super-tabs-toolbar>\r\n  <super-tabs-container>\r\n    <super-tab>\r\n      <ion-content class=\"ion-no-padding\">\r\n        <div class=\"main-container\" style=\"width: 100%\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=2>\r\n                <p class=\"rowHeading\">Order Status</p>\r\n                <div class=\"statusList\">\r\n                  <p id=\"status1\" (click)=\"getPendingOrders()\">Pending</p>\r\n                  <p id=\"status2\" (click)=\"getPickedOrders()\">Picked Up</p>\r\n                  <p id=\"status3\" (click)=\"getDeliveredOrders()\">Delivered</p>\r\n                  <p id=\"status4\" (click)=\"getCancelledOrders()\">Cancelled</p>\r\n                </div>  \r\n              </ion-col>\r\n              <ion-col size=4>\r\n                <div\r\n                  style=\"height: 3vh;text-align: center;width: 100%;font-weight: bold;font-size: medium;display: flex;align-items: center;\">\r\n                  <ion-input type='number' placeholder=\"Enter Order Id\"\r\n                    style=\"height: 3vh;padding-top: 0px;padding-bottom: 0px;border: 1px solid lightgray;margin-left: 8px;\"\r\n                    [(ngModel)]='searchOrder'></ion-input>&nbsp;\r\n                  <ion-button size=\"small\" (click)='searchOrderById()'>Search</ion-button>&nbsp;\r\n                  <ion-button size=\"small\" (click)='resetSearch()'>Show All</ion-button>\r\n                </div>\r\n                <div *ngIf='ordersList && ordersList.length == 0'\r\n                  style=\"text-align: center;width: 100%;font-size: large;font-weight: bold;\">\r\n                  <br>No Orders</div>\r\n                <div id=\"scroll2\" *ngIf='ordersList && ordersList.length > 0'>\r\n                  <div style=\"text-align: center;\" *ngFor='let order of ordersList; let i=index'>\r\n                    <br>\r\n                    <ion-grid (click)='onClickViewDetails(order.orderId)' class='orderGrid' \r\n                    *ngIf=\"currentOrders != 'paymentPending' || (currentOrders == 'paymentPending' && (order.status == 'Pending' || order.status == 'Confirmed'))\">\r\n                      <ion-row>\r\n                        <ion-col>\r\n                          <p style=\"color: gray;margin-bottom: 5px;\">{{getDateTimeFormat(order.createdAt.toDate())}}</p>\r\n                        </ion-col>\r\n                      </ion-row>\r\n                      <ion-row>\r\n                        <ion-col style=\"text-align: left;margin-left: 15px;\">\r\n                          <strong>User</strong> : {{order.user.name}}\r\n                        </ion-col>\r\n                        <ion-col>\r\n                          <strong>Id</strong> : <strong>{{order.orderId}}</strong>\r\n                        </ion-col>\r\n                      </ion-row>\r\n                      <ion-row>\r\n                        <ion-col style=\"text-align: left;margin-left: 15px\">\r\n                          <strong>Amount</strong> : {{order.delivery.cost}}\r\n                        </ion-col>\r\n                        <ion-col>\r\n                          <strong>Status</strong> : {{order.status}}\r\n                        </ion-col>\r\n                      </ion-row>\r\n                    </ion-grid>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=6>\r\n                <div *ngIf=\"orderId == '' \" style=\"text-align: center;width: 100%;font-size: large;font-weight: bold;\">No\r\n                  Order Selected</div>\r\n                <div style=\"height: 4vh;display: flex; align-items: center; justify-content: space-evenly;\"\r\n                  *ngIf=\"orderId != '' \">\r\n                  <h3>Order Id : {{orderData[0].orderId}} ({{orderData[0].status}})</h3>\r\n                  <div *ngIf=\"!showLoader && orderData[0].status === 'pending'\">\r\n                    <ion-button (click)=\"onClickCancelOrder()\" color=\"danger\">\r\n                      <i class=\"flaticon-null-19\"></i>&nbsp;\r\n                      Cancelled\r\n                    </ion-button>&nbsp;\r\n                    <ion-button (click)=\"onClickPickupOrder()\" color=\"success\">\r\n                      <i class=\"flaticon-null-20\"></i>&nbsp;\r\n                      Picked Up\r\n                    </ion-button>\r\n                  </div>\r\n                  <div *ngIf=\"!showLoader && orderData[0].status === 'picked'\">\r\n                    <ion-button (click)=\"onClickDeliverOrder()\" color=\"success\">\r\n                      <i class=\"flaticon-null-20\"></i>&nbsp;\r\n                      Delivered\r\n                    </ion-button>\r\n                  </div>\r\n                  <div>\r\n                    <ion-button (click)=\"showHistory = !showHistory\" color=\"secondary\" *ngIf='!showHistory'>\r\n                      View Order History\r\n                    </ion-button>&nbsp;\r\n                    <ion-button (click)=\"showHistory = !showHistory\" color=\"secondary\" *ngIf='showHistory'>\r\n                      View Order Details\r\n                    </ion-button>\r\n                  </div>\r\n                </div>\r\n                <div class=\"order-wrapper\" *ngIf=\"orderData[0] && orderData[0].hasOwnProperty('timeline') == false && showHistory\" id=\"scroll3\">\r\n                  <p style=\"text-align: center;font-size: large;margin-top: 20vh;font-weight: bold;\">Sorry, No history for this order!</p>\r\n                </div>\r\n                <div class=\"order-wrapper\" *ngIf=\"orderData[0] && orderData[0].hasOwnProperty('timeline') && showHistory\" id=\"scroll3\">\r\n                  <br>\r\n                  <ion-card>\r\n                    <ion-card-header>\r\n                      <ion-card-title style=\"text-align: center;font-weight: bold;\">Order Tracking</ion-card-title>\r\n                    </ion-card-header>\r\n                  \r\n                    <ion-card-content style=\"padding-left: 35px;\">\r\n                      <div class=\"status-progress-container\">\r\n                        <ul class=\"status-progress\">\r\n                          <li class=\"status-progress-item\" *ngFor=\"let status of allOrderStatuses\"\r\n                            [ngClass]=\"{'status-missing': !isStatusTimelinePresent(status), 'status-cancelled': isStatusCancelled(status), 'hide-status': hideStatuses(status), 'last-status': isLastStatus(status)}\">\r\n                            <p class=\"status-progress-title\">{{status === 'pending' ? 'Placed' : status}}</p>\r\n                            <p class=\"status-progress-info\" *ngIf=\"isStatusTimelinePresent(status)\">{{orderData[0].timeline[status].time.toDate() | date: 'medium'}}</p>\r\n                          </li>\r\n                        </ul>\r\n                      </div>\r\n                    </ion-card-content>\r\n                  </ion-card>\r\n      \r\n                  <ion-card *ngIf='logData && logData.length > 0'>\r\n                    <ion-card-header>\r\n                      <ion-card-title style=\"text-align: center;font-weight: bold;\">Order Logs</ion-card-title>\r\n                    </ion-card-header>\r\n                  \r\n                    <ion-card-content style=\"padding-left: 35px;\">\r\n                      <div *ngFor=\"let logs of logData\"> \r\n                        <div style=\"display: flex;margin-top: 10px;\">\r\n                          <p style=\"font-weight: bold;font-size: medium;\">{{logs.text}} :</p>&nbsp;&nbsp;<p style=\"font-size: medium;\">{{getDateTimeFormat(logs.time.toDate())}}</p>\r\n                        </div>\r\n                      </div>\r\n                    </ion-card-content>\r\n                  </ion-card>\r\n                </div>\r\n                <div class=\"order-wrapper\" *ngIf=\"orderId != '' && !showHistory\" id=\"scroll3\">\r\n                  <div class=\"order-details\">\r\n                    <ion-grid>\r\n                      <ion-row>\r\n                        <ion-col size=\"12\" size-md=\"4\" style=\"border-right: 1px solid lightgray;\">\r\n                          <div class=\"address-wrap\">\r\n                            <p><strong>Pickup Address</strong></p>\r\n                            <hr class=\"line\">\r\n                            <p> {{orderData[0].pickup.address}}</p>\r\n                            <br>\r\n                          </div>\r\n                          <div class=\"address-wrap\">\r\n                            <p><strong>Delivery Address</strong></p>\r\n                            <hr class=\"line\">\r\n                            <p> {{orderData[0].drop.address}}</p>\r\n                            <br>\r\n                          </div>\r\n                          <p><strong>Phone Number : </strong>{{phoneNo}}</p>\r\n                          <div>\r\n                            <div class=\"assign-delivery\"\r\n                              *ngIf=\"(orderData[0].status === 'pending' || orderData[0].status === 'picked') && !orderData[0].agentId\">\r\n                              <br>\r\n                              <p><strong>Delivery Agent</strong></p>\r\n                              <br>\r\n                              <select [(ngModel)]=\"orderData[0].delivery.agentId\" interface=\"popover\"\r\n                                (change)=\"onChangeDeliveryAgent($event)\" *ngIf=\"!noDeliveryAgents && allDeliveryAgents.length > 0\"\r\n                                style=\"margin-right: 12px;width: 100%;padding: 4px;\">\r\n                                <option value=\"\" disabled selected>Select delivery agent</option>\r\n                                <option [value]=\"agents.id\" *ngFor=\"let agents of allDeliveryAgents\">{{agents.name}}\r\n                                </option>\r\n                              </select>\r\n                              <select interface=\"popover\" placeholder=\"Select delivery agent\"\r\n                                (change)=\"onSetupDeliveryAgent()\" *ngIf=\"noDeliveryAgents\" style=\"margin-right: 12px;\">\r\n                                <option>Setup Delivery Agent</option>\r\n                              </select>\r\n                            </div>\r\n                          </div>\r\n                        </ion-col>\r\n                        <ion-col size=\"12\" size-md=\"8\">\r\n                          <div\r\n                            *ngIf=\"orderData[0] && orderData[0].hasOwnProperty('delivery.agentId') && (orderData[0].agentId != '')\">\r\n                            <br>\r\n                            <p><strong>Delivery by : </strong> {{deliveryAgentName}}</p>\r\n                            <br />\r\n                          </div>\r\n                          <div class=\"address-wrap\">\r\n                            <p><strong>Pickup Information</strong></p>\r\n                            <hr class=\"line\">\r\n                            <p style=\"margin-bottom: 8px;\"> Pickup Date : {{orderData[0].pickup.date}}</p>\r\n                            <p> Pickup Time : {{orderData[0].pickup.time}}</p>\r\n                            <br>\r\n                          </div>\r\n                          <div *ngIf=\"orderData[0] && orderData[0].hasOwnProperty('payment')\">\r\n                            <p><strong>Payment Details</strong></p>\r\n                            <hr class=\"line\">\r\n                            <p style=\"margin-bottom: 8px;\" *ngIf='orderData[0].payment.completed == true'><strong>Completed : </strong>Yes</p>\r\n                            <p style=\"margin-bottom: 8px;\" *ngIf='orderData[0].payment.completed != true'><strong>Completed : </strong>No</p>\r\n                            <p *ngIf='orderData[0].payment.details && orderData[0].payment.details.length > 0' style=\"margin-bottom: 8px;\"><strong>Details : </strong>{{orderData[0].payment.details}}</p>\r\n                            <p><strong>Mode : </strong>{{orderData[0].payment.mode}}</p>\r\n                            <div *ngIf=\"orderData[0].slab\">\r\n                              <p><strong>Slabs :</strong></p>\r\n                              <p><strong>{{orderData[0].slab.Name}}: </strong>{{orderData[0].slab.cost}}</p>\r\n                            </div>\r\n\r\n                          </div>\r\n                          <br>\r\n                          <ng-container *ngIf=\"isCancelReasonAvailable()\">\r\n                            <div class=\"content-card my-10\">\r\n                              <p class=\"content-heading\">Cancelled Reason</p>\r\n                              <hr class=\"line\">\r\n                              <p>\r\n                                <strong>Cancelled By</strong>: {{orderData[0].cancelData.by}}\r\n                              </p>\r\n                              <p>\r\n                                <strong>Reason</strong>: {{orderData[0].cancelData.reason}}\r\n                              </p>\r\n                            </div>\r\n                          </ng-container>\r\n\r\n                        </ion-col>\r\n                      </ion-row>\r\n                    </ion-grid>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n    <super-tab>\r\n      <ion-content class=\"ion-padding\">\r\n          <div class=\"main-container\">\r\n        <div class=\"content-alignment sub-settings-fields\">\r\n          <div>Active</div>&nbsp;&nbsp;\r\n          <div class=\"toggle-btn\">\r\n            <label class=\"switch\">\r\n              <input type=\"checkbox\" (click)=\"activeToggle()\" [checked]=\"isActive\">\r\n              <span class=\"slider round\"></span>\r\n            </label>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"content-alignment sub-settings-fields\">\r\n          <div>Gst %</div>&nbsp;&nbsp;\r\n          <ion-input class=\"sub-settings-input\" type=\"number\" [(ngModel)]=\"gst\"></ion-input>\r\n        </div>\r\n        <div class=\"sub-settings-fields\" *ngIf='deliveryByWeight'>\r\n          <div class=\"content-alignment sub-settings-fields\">\r\n            <div>Charges per Kg</div>&nbsp;\r\n            <ion-input class=\"sub-settings-input\" type=\"number\" [(ngModel)]=\"deliveryByWeight.cost\"></ion-input>\r\n          </div>\r\n        </div>\r\n        <div style=\"display: flex;align-items: center;\">\r\n          <div>Allow Delivery based on Weight</div>&nbsp;&nbsp;\r\n          <div class=\"toggle-btn\">\r\n            <label class=\"switch\">\r\n              <input type=\"checkbox\"\r\n                (click)=\"deliveryBasedToggle()\"\r\n                [checked]=\"weightSlabs.active\">\r\n              <span class=\"slider round\"></span>\r\n            </label>\r\n          </div>\r\n        </div><br>\r\n        <div *ngIf=\"!weightSlabs.active\">\r\n        <div class=\"sub-settings-fields\" *ngIf='deliveryByWeight'>\r\n\r\n          <div class=\"content-alignment sub-settings-fields\">\r\n            Charge&nbsp;<ion-input class=\"sub-settings-input\" type=\"number\" [(ngModel)]=\"deliveryByWeight.baseCost\"></ion-input>&nbsp;for&nbsp;\r\n            <ion-input class=\"sub-settings-input\" type=\"number\" [(ngModel)]=\"deliveryByWeight.baseWeight\"></ion-input>&nbsp;Kgs\r\n          </div>\r\n\r\n          <div class=\"content-alignment sub-settings-fields\">\r\n            <div>Extra Charges per Kg</div>&nbsp;\r\n            <ion-input class=\"sub-settings-input\" type=\"number\" [(ngModel)]=\"deliveryByWeight.cost\"></ion-input>\r\n          </div>\r\n        </div>\r\n        \r\n        </div>\r\n        <div *ngIf=\"weightSlabs.active\" >\r\n          <div style=\"display: flex;align-items: center;\">\r\n            <ion-button (click)='enterSlabData()'>\r\n              <p\r\n                *ngIf=\"weightSlabs.slabs && weightSlabs.slabs.length == 0\">\r\n                Create Slab</p>\r\n              <p\r\n                *ngIf=\"weightSlabs.slabs && weightSlabs.slabs.length > 0\">\r\n                Add Slab</p>\r\n            </ion-button>&nbsp;&nbsp;\r\n            <ion-button (click)=\"removeSlabs()\">\r\n              Remove All Slabs\r\n            </ion-button>\r\n          </div>\r\n          <br>\r\n          <ion-grid\r\n            *ngIf=\"weightSlabs.slabs && weightSlabs.slabs.length > 0\"\r\n            class=\"ion-no-padding data-table ion-text-center\"\r\n            style=\"margin-top: 12px;width: 400px;\">\r\n            <ion-row>\r\n              <ion-col>Name</ion-col>\r\n              <ion-col>Range</ion-col>\r\n              <ion-col>Cost</ion-col>\r\n            </ion-row>\r\n            <ion-row\r\n              *ngFor=\"let slab of weightSlabs.slabs; let i=index;\"\r\n              style=\"border-top: 1px solid lightgray;\">\r\n              <ion-col>\r\n                <p>{{slab.Name}}</p>\r\n              </ion-col>\r\n              <ion-col>\r\n                <p>{{slab.range[0]}} - {{slab.range[1]}}</p>\r\n              </ion-col>\r\n              <ion-col>\r\n                <p>{{slab.cost}}</p>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n\r\n        <div class=\"page-footer\">\r\n            <ion-button (click)=\"saveSettings()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n              <i class=\"flaticon-null-20 margin-icon\"></i>\r\n              Save \r\n            </ion-button>\r\n        </div>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n    </super-tabs-container>\r\n  </super-tabs>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/pickup-drop/pickup-drop.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/admin/pickup-drop/pickup-drop.module.ts ***!
  \*********************************************************/
/*! exports provided: PickupDropPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PickupDropPageModule", function() { return PickupDropPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _pickup_drop_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pickup-drop.page */ "./src/app/admin/pickup-drop/pickup-drop.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");








var routes = [
    {
        path: '',
        component: _pickup_drop_page__WEBPACK_IMPORTED_MODULE_6__["PickupDropPage"]
    }
];
var PickupDropPageModule = /** @class */ (function () {
    function PickupDropPageModule() {
    }
    PickupDropPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"]
            ],
            declarations: [_pickup_drop_page__WEBPACK_IMPORTED_MODULE_6__["PickupDropPage"]]
        })
    ], PickupDropPageModule);
    return PickupDropPageModule;
}());



/***/ }),

/***/ "./src/app/admin/pickup-drop/pickup-drop.page.scss":
/*!*********************************************************!*\
  !*** ./src/app/admin/pickup-drop/pickup-drop.page.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@charset \"UTF-8\";\n.main {\n  padding-left: 50px;\n  padding-right: 50px;\n  padding-bottom: 30px;\n  background: white;\n  text-align: center;\n  width: 60vw;\n  margin: 0% auto;\n}\n.sub-settings-input {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  max-width: 25%;\n}\n.sub-settings-content {\n  font-size: 14px;\n  --padding-top: 25px;\n}\n.sub-settings-fields {\n  margin-bottom: 25px;\n}\n.sub-list-content {\n  --background: #F2F2F2;\n}\nion-list {\n  border-radius: 5px;\n}\n.ps-sub-by {\n  font-size: 13px;\n  opacity: 0.9;\n}\n.ps-sub-by span {\n  color: var(--ion-color-primary);\n  text-decoration: underline;\n  margin-left: 2px;\n  font-size: 14px;\n  font-weight: bold;\n}\n.ps-products-container {\n  margin: 10px 10px 10px 10px;\n  background: white;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 10px;\n  position: relative;\n}\n.ps-products-container ion-item {\n  --padding-start: 10px;\n}\n.ps-product-image {\n  background: transparent url('img-preloader.png') center no-repeat;\n  width: 85px;\n  height: 85px;\n  position: relative;\n  border: 1px solid #f0f0f0;\n}\n.ps-no-product-image {\n  background: url('img-preloader.png') center no-repeat;\n  background-size: contain;\n  width: 85px;\n  height: 85px;\n  position: relative;\n  border: 1px solid #e8e8e8;\n}\n.ps-more {\n  background: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(transparent));\n  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent);\n  bottom: 0;\n  height: 20px;\n  position: absolute;\n  width: 84px;\n  z-index: 2;\n  color: white;\n  font-size: 12px;\n  text-align: center;\n  padding: 5px;\n}\n.ps-product-name {\n  font-size: 14px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  text-transform: capitalize;\n  font-weight: bold;\n}\n.ps-product-price {\n  color: var(--ion-color-primary);\n  font-size: 18px;\n}\n.ps-placed-on {\n  font-size: 11px;\n  text-align: center;\n  opacity: 0.6;\n}\n.ps-action-btn {\n  text-align: center;\n  margin-top: 10px;\n}\n.ps-action-btn span {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.ps-action-btn ion-icon {\n  margin-left: 5px;\n}\n.ps-action-btn .flaticon-refresh::before {\n  margin-left: 5px;\n}\n.ps-completed .flaticon-null-20::before {\n  color: var(--ion-color-success);\n  margin-left: 2px;\n}\nion-button .flaticon-null-7::before {\n  font-size: 10px;\n  margin-left: 3px;\n}\n.ps-active-wrapper {\n  padding-left: 10px;\n  padding-top: 14px;\n  padding-right: 10px;\n}\n.ps-active-wrapper-txt {\n  font-size: 14px;\n}\n.ps-remove-btn {\n  text-align: center;\n}\n.ps-next-order {\n  border: 1px solid #e2e2e2;\n  border-radius: 5px;\n  padding: 5px;\n  font-size: 13px;\n  opacity: 0.9;\n  margin-top: 10px;\n}\n.ps-next-order-bold {\n  font-weight: bold;\n  font-size: 14px;\n}\n.content-alignment {\n  display: -webkit-box;\n  display: flex;\n  text-align: center;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.page-footer {\n  text-align: center;\n}\n.rowHeading {\n  font-size: medium;\n  font-weight: bold;\n}\n.statusList {\n  text-align: center;\n}\n.statusList p {\n  font-size: medium;\n  border: 1px solid lightgray;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n}\n#scroll1 {\n  overflow: hidden;\n  height: 79vh;\n}\n#scroll1:hover {\n  overflow-y: auto;\n}\n#scroll2 {\n  overflow: hidden;\n  height: 73vh;\n  border-left: 1px solid lightgray;\n  border-right: 1px solid lightgray;\n}\n#scroll2:hover {\n  overflow-y: auto;\n}\n#scroll3 {\n  overflow: hidden;\n  height: 75vh;\n}\n#scroll3:hover {\n  overflow-y: auto;\n}\n.orderGrid {\n  cursor: pointer;\n  border-bottom: 1px solid lightgray;\n}\n.orderGrid strong {\n  font-size: 16px;\n}\n.orderGrid:hover {\n  background: var(--ion-color-categories-background);\n}\n.status-progress-container {\n  position: relative;\n  overflow: hidden;\n}\n.status-progress-container .status-progress {\n  position: relative;\n  list-style: none;\n}\n.status-progress-container .status-progress-item {\n  position: relative;\n  min-height: 75px;\n  counter-increment: list;\n  padding-left: 0.5rem;\n}\n.status-progress-container .status-progress-item:before {\n  content: \"\";\n  position: absolute;\n  left: -27px;\n  top: 26px;\n  height: 49px;\n  width: 2px;\n  border-left: 2px solid var(--ion-color-success);\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.status-progress-container .status-progress-item:after {\n  content: \"✓\";\n  position: absolute;\n  top: 0;\n  left: -40px;\n  width: 26px;\n  height: 26px;\n  border-radius: 5px;\n  background: var(--ion-color-success);\n  color: #fff;\n  font-weight: 400;\n  font-size: 15px;\n  line-height: 1.5rem;\n  text-align: center;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.status-progress-container .status-progress-item:last-child:before, .status-progress-container .status-progress-item.last-status:before {\n  border-left: none !important;\n}\n.status-progress-container .status-progress-item.status-missing {\n  opacity: 0.5;\n}\n.status-progress-container .status-progress-item.status-missing:before {\n  border-left: 2px solid #ccc;\n}\n.status-progress-container .status-progress-item.status-missing:after {\n  background: #ccc;\n  opacity: 0.6;\n  color: #fff;\n}\n.status-progress-container .status-progress-item.status-cancelled:before {\n  border-left: 2px solid var(--ion-color-danger);\n  height: 30px;\n}\n.status-progress-container .status-progress-item.status-cancelled:after {\n  content: \"×\";\n  background: var(--ion-color-danger);\n  color: #fff;\n  font-size: 20px;\n}\n.status-progress-container .status-progress-item.hide-status {\n  display: none;\n}\n.status-progress-container .status-progress-title {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 500;\n  text-transform: capitalize;\n}\n.status-progress-container .status-progress-info {\n  font-size: 13px;\n  -webkit-margin-before: 5px;\n          margin-block-start: 5px;\n  -webkit-margin-after: 5px;\n          margin-block-end: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vcGlja3VwLWRyb3AvcGlja3VwLWRyb3AucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9waWNrdXAtZHJvcC9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXHBpY2t1cC1kcm9wXFxwaWNrdXAtZHJvcC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FDQWhCO0VBQ0ksa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FERUo7QUNDQTtFQUNJLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FERUo7QUNDQTtFQUNJLGVBQUE7RUFDQSxtQkFBQTtBREVKO0FDQ0E7RUFDSSxtQkFBQTtBREVKO0FDQ0E7RUFDSSxxQkFBQTtBREVKO0FDQ0E7RUFDSSxrQkFBQTtBREVKO0FDQ0E7RUFDSSxlQUFBO0VBQ0EsWUFBQTtBREVKO0FDREk7RUFDSSwrQkFBQTtFQUNBLDBCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QURHUjtBQ0dBO0VBQ0ksMkJBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7QURBSjtBQ0NJO0VBQ0kscUJBQUE7QURDUjtBQ0dBO0VBQ0ksaUVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7QURBSjtBQ0dBO0VBQ0kscURBQUE7RUFDQSx3QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtBREFKO0FDR0E7RUFDSSxzR0FBQTtFQUFBLGtFQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QURBSjtBQ0dBO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQkFBQTtFQUNBLGlCQUFBO0FEQUo7QUNHQTtFQUNJLCtCQUFBO0VBQ0EsZUFBQTtBREFKO0FDR0E7RUFDSSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FEQUo7QUNHQTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7QURBSjtBQ0NJO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBRENSO0FDQ0k7RUFDSSxnQkFBQTtBRENSO0FDRUk7RUFDSSxnQkFBQTtBREFSO0FDTUk7RUFDSSwrQkFBQTtFQUNBLGdCQUFBO0FESFI7QUNPQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtBREpKO0FDT0E7RUFDSSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QURKSjtBQ0tJO0VBQ0ksZUFBQTtBREhSO0FDT0E7RUFDSSxrQkFBQTtBREpKO0FDT0E7RUFDSSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QURKSjtBQ0tJO0VBQ0ksaUJBQUE7RUFDQSxlQUFBO0FESFI7QUNPQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBREpKO0FDT0E7RUFDSSxrQkFBQTtBREpKO0FDUUE7RUFDSSxpQkFBQTtFQUNBLGlCQUFBO0FETEo7QUNTQTtFQUNJLGtCQUFBO0FETko7QUNPSTtFQUNFLGlCQUFBO0VBQ0EsMkJBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QURMTjtBQ1NBO0VBQ0ksZ0JBQUE7RUFDQSxZQUFBO0FETko7QUNTQTtFQUNJLGdCQUFBO0FETko7QUNTQTtFQUNJLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGdDQUFBO0VBQ0EsaUNBQUE7QUROSjtBQ1NBO0VBQ0ksZ0JBQUE7QUROSjtBQ1VBO0VBQ0ksZ0JBQUE7RUFDQSxZQUFBO0FEUEo7QUNVQTtFQUNJLGdCQUFBO0FEUEo7QUNVQTtFQUNJLGVBQUE7RUFDQSxrQ0FBQTtBRFBKO0FDUUk7RUFDRSxlQUFBO0FETk47QUNVQTtFQUNJLGtEQUFBO0FEUEo7QUNVQTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7QURQSjtBQ1NJO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtBRFBSO0FDVUk7RUFDSSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxvQkFBQTtBRFJSO0FDVVE7RUFDSSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsK0NBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBRFJaO0FDV1E7RUFDSSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQ0FBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QURUWjtBQ2NZO0VBQ0ksNEJBQUE7QURaaEI7QUNpQlE7RUFDSSxZQUFBO0FEZlo7QUNnQlk7RUFDSSwyQkFBQTtBRGRoQjtBQ2lCWTtFQUNJLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QURmaEI7QUNxQlk7RUFDSSw4Q0FBQTtFQUNBLFlBQUE7QURuQmhCO0FDc0JZO0VBQ0ksWUFBQTtFQUNBLG1DQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QURwQmhCO0FDd0JRO0VBQ0ksYUFBQTtBRHRCWjtBQzBCSTtFQUNJLFNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSwwQkFBQTtBRHhCUjtBQzJCSTtFQUNJLGVBQUE7RUFDQSwwQkFBQTtVQUFBLHVCQUFBO0VBQ0EseUJBQUE7VUFBQSxxQkFBQTtBRHpCUiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3BpY2t1cC1kcm9wL3BpY2t1cC1kcm9wLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBjaGFyc2V0IFwiVVRGLThcIjtcbi5tYWluIHtcbiAgcGFkZGluZy1sZWZ0OiA1MHB4O1xuICBwYWRkaW5nLXJpZ2h0OiA1MHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMzBweDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDYwdnc7XG4gIG1hcmdpbjogMCUgYXV0bztcbn1cblxuLnN1Yi1zZXR0aW5ncy1pbnB1dCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgbWF4LXdpZHRoOiAyNSU7XG59XG5cbi5zdWItc2V0dGluZ3MtY29udGVudCB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgLS1wYWRkaW5nLXRvcDogMjVweDtcbn1cblxuLnN1Yi1zZXR0aW5ncy1maWVsZHMge1xuICBtYXJnaW4tYm90dG9tOiAyNXB4O1xufVxuXG4uc3ViLWxpc3QtY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogI0YyRjJGMjtcbn1cblxuaW9uLWxpc3Qge1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5wcy1zdWItYnkge1xuICBmb250LXNpemU6IDEzcHg7XG4gIG9wYWNpdHk6IDAuOTtcbn1cbi5wcy1zdWItYnkgc3BhbiB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICBtYXJnaW4tbGVmdDogMnB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4ucHMtcHJvZHVjdHMtY29udGFpbmVyIHtcbiAgbWFyZ2luOiAxMHB4IDEwcHggMTBweCAxMHB4O1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4ucHMtcHJvZHVjdHMtY29udGFpbmVyIGlvbi1pdGVtIHtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxMHB4O1xufVxuXG4ucHMtcHJvZHVjdC1pbWFnZSB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcInNyYy9hc3NldHMvaW1nL2ltZy1wcmVsb2FkZXIucG5nXCIpIGNlbnRlciBuby1yZXBlYXQ7XG4gIHdpZHRoOiA4NXB4O1xuICBoZWlnaHQ6IDg1cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2YwZjBmMDtcbn1cblxuLnBzLW5vLXByb2R1Y3QtaW1hZ2Uge1xuICBiYWNrZ3JvdW5kOiB1cmwoXCJzcmMvYXNzZXRzL2ltZy9pbWctcHJlbG9hZGVyLnBuZ1wiKSBjZW50ZXIgbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gIHdpZHRoOiA4NXB4O1xuICBoZWlnaHQ6IDg1cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2U4ZThlODtcbn1cblxuLnBzLW1vcmUge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgcmdiYSgwLCAwLCAwLCAwLjUpLCB0cmFuc3BhcmVudCk7XG4gIGJvdHRvbTogMDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiA4NHB4O1xuICB6LWluZGV4OiAyO1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiA1cHg7XG59XG5cbi5wcy1wcm9kdWN0LW5hbWUge1xuICBmb250LXNpemU6IDE0cHg7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLnBzLXByb2R1Y3QtcHJpY2Uge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBmb250LXNpemU6IDE4cHg7XG59XG5cbi5wcy1wbGFjZWQtb24ge1xuICBmb250LXNpemU6IDExcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgb3BhY2l0eTogMC42O1xufVxuXG4ucHMtYWN0aW9uLWJ0biB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogMTBweDtcbn1cbi5wcy1hY3Rpb24tYnRuIHNwYW4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLnBzLWFjdGlvbi1idG4gaW9uLWljb24ge1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuLnBzLWFjdGlvbi1idG4gLmZsYXRpY29uLXJlZnJlc2g6OmJlZm9yZSB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG5cbi5wcy1jb21wbGV0ZWQgLmZsYXRpY29uLW51bGwtMjA6OmJlZm9yZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gIG1hcmdpbi1sZWZ0OiAycHg7XG59XG5cbmlvbi1idXR0b24gLmZsYXRpY29uLW51bGwtNzo6YmVmb3JlIHtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBtYXJnaW4tbGVmdDogM3B4O1xufVxuXG4ucHMtYWN0aXZlLXdyYXBwZXIge1xuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gIHBhZGRpbmctdG9wOiAxNHB4O1xuICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xufVxuLnBzLWFjdGl2ZS13cmFwcGVyLXR4dCB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLnBzLXJlbW92ZS1idG4ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5wcy1uZXh0LW9yZGVyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2UyZTJlMjtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiA1cHg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgb3BhY2l0eTogMC45O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuLnBzLW5leHQtb3JkZXItYm9sZCB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5jb250ZW50LWFsaWdubWVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnBhZ2UtZm9vdGVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ucm93SGVhZGluZyB7XG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLnN0YXR1c0xpc3Qge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uc3RhdHVzTGlzdCBwIHtcbiAgZm9udC1zaXplOiBtZWRpdW07XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgcGFkZGluZzogMTBweDtcbiAgbWFyZ2luOiA4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuI3Njcm9sbDEge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDc5dmg7XG59XG5cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDczdmg7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgbGlnaHRncmF5O1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbiNzY3JvbGwyOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDMge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDc1dmg7XG59XG5cbiNzY3JvbGwzOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuLm9yZGVyR3JpZCB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cbi5vcmRlckdyaWQgc3Ryb25nIHtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG4ub3JkZXJHcmlkOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWNhdGVnb3JpZXMtYmFja2dyb3VuZCk7XG59XG5cbi5zdGF0dXMtcHJvZ3Jlc3MtY29udGFpbmVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLnN0YXR1cy1wcm9ncmVzcy1jb250YWluZXIgLnN0YXR1cy1wcm9ncmVzcyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn1cbi5zdGF0dXMtcHJvZ3Jlc3MtY29udGFpbmVyIC5zdGF0dXMtcHJvZ3Jlc3MtaXRlbSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWluLWhlaWdodDogNzVweDtcbiAgY291bnRlci1pbmNyZW1lbnQ6IGxpc3Q7XG4gIHBhZGRpbmctbGVmdDogMC41cmVtO1xufVxuLnN0YXR1cy1wcm9ncmVzcy1jb250YWluZXIgLnN0YXR1cy1wcm9ncmVzcy1pdGVtOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogLTI3cHg7XG4gIHRvcDogMjZweDtcbiAgaGVpZ2h0OiA0OXB4O1xuICB3aWR0aDogMnB4O1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uc3RhdHVzLXByb2dyZXNzLWNvbnRhaW5lciAuc3RhdHVzLXByb2dyZXNzLWl0ZW06YWZ0ZXIge1xuICBjb250ZW50OiBcIuKck1wiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogLTQwcHg7XG4gIHdpZHRoOiAyNnB4O1xuICBoZWlnaHQ6IDI2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLnN0YXR1cy1wcm9ncmVzcy1jb250YWluZXIgLnN0YXR1cy1wcm9ncmVzcy1pdGVtOmxhc3QtY2hpbGQ6YmVmb3JlLCAuc3RhdHVzLXByb2dyZXNzLWNvbnRhaW5lciAuc3RhdHVzLXByb2dyZXNzLWl0ZW0ubGFzdC1zdGF0dXM6YmVmb3JlIHtcbiAgYm9yZGVyLWxlZnQ6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5zdGF0dXMtcHJvZ3Jlc3MtY29udGFpbmVyIC5zdGF0dXMtcHJvZ3Jlc3MtaXRlbS5zdGF0dXMtbWlzc2luZyB7XG4gIG9wYWNpdHk6IDAuNTtcbn1cbi5zdGF0dXMtcHJvZ3Jlc3MtY29udGFpbmVyIC5zdGF0dXMtcHJvZ3Jlc3MtaXRlbS5zdGF0dXMtbWlzc2luZzpiZWZvcmUge1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkICNjY2M7XG59XG4uc3RhdHVzLXByb2dyZXNzLWNvbnRhaW5lciAuc3RhdHVzLXByb2dyZXNzLWl0ZW0uc3RhdHVzLW1pc3Npbmc6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kOiAjY2NjO1xuICBvcGFjaXR5OiAwLjY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLnN0YXR1cy1wcm9ncmVzcy1jb250YWluZXIgLnN0YXR1cy1wcm9ncmVzcy1pdGVtLnN0YXR1cy1jYW5jZWxsZWQ6YmVmb3JlIHtcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbiAgaGVpZ2h0OiAzMHB4O1xufVxuLnN0YXR1cy1wcm9ncmVzcy1jb250YWluZXIgLnN0YXR1cy1wcm9ncmVzcy1pdGVtLnN0YXR1cy1jYW5jZWxsZWQ6YWZ0ZXIge1xuICBjb250ZW50OiBcIsOXXCI7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAyMHB4O1xufVxuLnN0YXR1cy1wcm9ncmVzcy1jb250YWluZXIgLnN0YXR1cy1wcm9ncmVzcy1pdGVtLmhpZGUtc3RhdHVzIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi5zdGF0dXMtcHJvZ3Jlc3MtY29udGFpbmVyIC5zdGF0dXMtcHJvZ3Jlc3MtdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG4uc3RhdHVzLXByb2dyZXNzLWNvbnRhaW5lciAuc3RhdHVzLXByb2dyZXNzLWluZm8ge1xuICBmb250LXNpemU6IDEzcHg7XG4gIG1hcmdpbi1ibG9jay1zdGFydDogNXB4O1xuICBtYXJnaW4tYmxvY2stZW5kOiA1cHg7XG59IiwiLm1haW57XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDUwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiA1MHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDMwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHdpZHRoOiA2MHZ3O1xyXG4gICAgbWFyZ2luOiAwJSBhdXRvXHJcbn1cclxuXHJcbi5zdWItc2V0dGluZ3MtaW5wdXQge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIG1heC13aWR0aDogMjUlO1xyXG59XHJcblxyXG4uc3ViLXNldHRpbmdzLWNvbnRlbnQge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgLS1wYWRkaW5nLXRvcDogMjVweDtcclxufVxyXG5cclxuLnN1Yi1zZXR0aW5ncy1maWVsZHMge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjVweDtcclxufVxyXG5cclxuLnN1Yi1saXN0LWNvbnRlbnQge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAjRjJGMkYyO1xyXG59XHJcblxyXG5pb24tbGlzdCB7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5wcy1zdWItYnkge1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgb3BhY2l0eTogLjk7XHJcbiAgICBzcGFuIHtcclxuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAycHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbi5wcy1wcm9kdWN0cy1jb250YWluZXIge1xyXG4gICAgbWFyZ2luOiAxMHB4IDEwcHggMTBweCAxMHB4O1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGlvbi1pdGVtIHtcclxuICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IDEwcHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5wcy1wcm9kdWN0LWltYWdlIHtcclxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybCgnc3JjL2Fzc2V0cy9pbWcvaW1nLXByZWxvYWRlci5wbmcnKSBjZW50ZXIgbm8tcmVwZWF0O1xyXG4gICAgd2lkdGg6IDg1cHg7XHJcbiAgICBoZWlnaHQ6IDg1cHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZjBmMGYwO1xyXG59XHJcblxyXG4ucHMtbm8tcHJvZHVjdC1pbWFnZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB1cmwoJ3NyYy9hc3NldHMvaW1nL2ltZy1wcmVsb2FkZXIucG5nJykgY2VudGVyIG5vLXJlcGVhdDtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcclxuICAgIHdpZHRoOiA4NXB4O1xyXG4gICAgaGVpZ2h0OiA4NXB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2U4ZThlODtcclxufVxyXG5cclxuLnBzLW1vcmUge1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDBkZWcsIHJnYmEoMCwgMCwgMCwgLjUpLCB0cmFuc3BhcmVudCk7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB3aWR0aDogODRweDtcclxuICAgIHotaW5kZXg6IDI7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbn1cclxuXHJcbi5wcy1wcm9kdWN0LW5hbWUge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4ucHMtcHJvZHVjdC1wcmljZSB7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG59XHJcblxyXG4ucHMtcGxhY2VkLW9uIHtcclxuICAgIGZvbnQtc2l6ZTogMTFweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG9wYWNpdHk6IC42O1xyXG59XHJcblxyXG4ucHMtYWN0aW9uLWJ0biB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgc3BhbiB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgfVxyXG4gICAgaW9uLWljb24ge1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmZsYXRpY29uLXJlZnJlc2g6OmJlZm9yZSB7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICAgIH0gXHJcblxyXG59XHJcblxyXG4ucHMtY29tcGxldGVkIHtcclxuICAgIC5mbGF0aWNvbi1udWxsLTIwOjpiZWZvcmUge1xyXG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDJweDtcclxuICAgIH1cclxufVxyXG5cclxuaW9uLWJ1dHRvbiAuZmxhdGljb24tbnVsbC03OjpiZWZvcmUge1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDNweDtcclxufVxyXG5cclxuLnBzLWFjdGl2ZS13cmFwcGVyIHtcclxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxuICAgIHBhZGRpbmctdG9wOiAxNHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMTBweDtcclxuICAgICYtdHh0IHtcclxuICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5wcy1yZW1vdmUtYnRuIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLnBzLW5leHQtb3JkZXIge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDIyNiwgMjI2LCAyMjYpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgb3BhY2l0eTogLjk7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgJi1ib2xkIHtcclxuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5jb250ZW50LWFsaWdubWVudHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyXHJcbn1cclxuXHJcbi5wYWdlLWZvb3RlcntcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuXHJcbi5yb3dIZWFkaW5ne1xyXG4gICAgZm9udC1zaXplOiBtZWRpdW07XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuXHJcbi5zdGF0dXNMaXN0e1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcHtcclxuICAgICAgZm9udC1zaXplOiBtZWRpdW07XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICAgICAgcGFkZGluZzogMTBweDtcclxuICAgICAgbWFyZ2luOiA4cHg7XHJcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIH1cclxufVxyXG5cclxuI3Njcm9sbDF7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgaGVpZ2h0OiA3OXZoXHJcbn1cclxuICBcclxuI3Njcm9sbDE6aG92ZXJ7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvXHJcbn1cclxuICBcclxuI3Njcm9sbDJ7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgaGVpZ2h0OiA3M3ZoO1xyXG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbn1cclxuICBcclxuI3Njcm9sbDI6aG92ZXJ7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvXHJcbn1cclxuICBcclxuICBcclxuI3Njcm9sbDN7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgaGVpZ2h0OiA3NXZoXHJcbn1cclxuICBcclxuI3Njcm9sbDM6aG92ZXJ7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvXHJcbn1cclxuXHJcbi5vcmRlckdyaWR7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICAgc3Ryb25nIHtcclxuICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgfVxyXG59XHJcbiAgXHJcbi5vcmRlckdyaWQ6aG92ZXJ7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItY2F0ZWdvcmllcy1iYWNrZ3JvdW5kKTtcclxufVxyXG5cclxuLnN0YXR1cy1wcm9ncmVzcy1jb250YWluZXIge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBcclxuICAgIC5zdGF0dXMtcHJvZ3Jlc3Mge1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICBsaXN0LXN0eWxlOiBub25lO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuc3RhdHVzLXByb2dyZXNzLWl0ZW0ge1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICBtaW4taGVpZ2h0OiA3NXB4O1xyXG4gICAgICAgIGNvdW50ZXItaW5jcmVtZW50OiBsaXN0O1xyXG4gICAgICAgIHBhZGRpbmctbGVmdDogMC41cmVtO1xyXG4gICAgXHJcbiAgICAgICAgJjpiZWZvcmUge1xyXG4gICAgICAgICAgICBjb250ZW50OiBcIlwiO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICAgIGxlZnQ6IC0yN3B4O1xyXG4gICAgICAgICAgICB0b3A6IDI2cHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogNDlweDtcclxuICAgICAgICAgICAgd2lkdGg6IDJweDtcclxuICAgICAgICAgICAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICY6YWZ0ZXIge1xyXG4gICAgICAgICAgICBjb250ZW50OiBcIlxcMjcxM1wiO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICAgIHRvcDogMDtcclxuICAgICAgICAgICAgbGVmdDogLTQwcHg7XHJcbiAgICAgICAgICAgIHdpZHRoOiAyNnB4O1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDI2cHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMS41cmVtO1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8vSGlkZSBib3JkZXIgZm9yIExhc3QgU3RlcFxyXG4gICAgICAgICY6bGFzdC1jaGlsZCwgJi5sYXN0LXN0YXR1cyB7XHJcbiAgICAgICAgICAgICY6YmVmb3JlIHtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1sZWZ0OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL2luY29tcGxldGUgc3RhdHVzXHJcbiAgICAgICAgJi5zdGF0dXMtbWlzc2luZyB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IC41O1xyXG4gICAgICAgICAgICAmOmJlZm9yZSB7XHJcbiAgICAgICAgICAgICAgICBib3JkZXItbGVmdDogMnB4IHNvbGlkICNjY2M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgJjphZnRlciB7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjY2NjO1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogLjY7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8vY2FuY2VsbGVkIG9yIHJlamVjdGVkIHN0YXR1c1xyXG4gICAgICAgICYuc3RhdHVzLWNhbmNlbGxlZCB7XHJcbiAgICAgICAgICAgICY6YmVmb3JlIHtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1sZWZ0OiAycHggc29saWQgdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgJjphZnRlciB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIlxcZDdcIjtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAmLmhpZGUtc3RhdHVzIHtcclxuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5zdGF0dXMtcHJvZ3Jlc3MtdGl0bGUge1xyXG4gICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLnN0YXR1cy1wcm9ncmVzcy1pbmZvIHtcclxuICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgbWFyZ2luLWJsb2NrLXN0YXJ0OiA1cHg7XHJcbiAgICAgICAgbWFyZ2luLWJsb2NrLWVuZDogNXB4O1xyXG4gICAgfVxyXG4gIH0iXX0= */"

/***/ }),

/***/ "./src/app/admin/pickup-drop/pickup-drop.page.ts":
/*!*******************************************************!*\
  !*** ./src/app/admin/pickup-drop/pickup-drop.page.ts ***!
  \*******************************************************/
/*! exports provided: PickupDropPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PickupDropPage", function() { return PickupDropPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_pickUp_pick_up_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/pickUp/pick-up.service */ "./src/app/services/pickUp/pick-up.service.ts");
/* harmony import */ var src_app_admin_admin_shop_all_orders_cancelled_reason_cancelled_reason_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/admin/admin-shop/all-orders/cancelled-reason/cancelled-reason.page */ "./src/app/admin/admin-shop/all-orders/cancelled-reason/cancelled-reason.page.ts");









var PickupDropPage = /** @class */ (function () {
    function PickupDropPage(labelService, loadingController, alertController, toastController, configService, router, pickUp, modalController) {
        this.labelService = labelService;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.toastController = toastController;
        this.configService = configService;
        this.router = router;
        this.pickUp = pickUp;
        this.modalController = modalController;
        this.headerText = '';
        this.isActive = false;
        this.currentType = true;
        this.deliveryByWeight = {
            baseCost: 0,
            baseWeight: 0,
            cost: 0
        };
        this.deliveryByKm = {
            cost: 0
        };
        this.orderId = "";
        this.orderData = [];
        this.ordersList = [];
        this.showLoader = true;
        this.subscriptionFeature = false;
        this.gst = 0;
        this.previousId = 'status1';
        this.searchOrder = '';
        this.currentOrders = 'pending';
        this.phoneNo = "";
        this.allDeliveryAgents = [];
        this.deliveryAgentName = '';
        this.showHistory = false;
        this.logData = [];
        this.allOrderStatuses = ['pending', 'picked', 'delivered', 'cancelled'];
        this.noDeliveryAgents = false;
        this.weightSlabs = {
            active: false,
            slabs: []
        };
    }
    PickupDropPage.prototype.ngOnInit = function () {
    };
    PickupDropPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var currentData, _a;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.pickUp.getPickUpSettings()];
                    case 1:
                        currentData = _b.sent();
                        console.log("Data->>", currentData['weightSlab']['active']);
                        _a = this;
                        return [4 /*yield*/, this.pickUp.getAllDeliveryAgents()];
                    case 2:
                        _a.allDeliveryAgents = _b.sent();
                        if (!this.allDeliveryAgents || (this.allDeliveryAgents && this.allDeliveryAgents.length == 0)) {
                            this.noDeliveryAgents = true;
                        }
                        if (currentData['gst']) {
                            this.gst = currentData['gst'];
                        }
                        if (currentData['active']) {
                            this.isActive = currentData['active'];
                        }
                        if (currentData['deliveryByWeight']) {
                            this.deliveryByWeight = currentData['deliveryByWeight'];
                        }
                        if (currentData['deliveryByKm']) {
                            this.deliveryByKm = currentData['deliveryByKm'];
                        }
                        if (currentData['weightSlab']['active']) {
                            this.weightSlabs.active = currentData['weightSlab']['active'];
                        }
                        if (currentData['weightSlab']['slabs']) {
                            this.weightSlabs.slabs = currentData['weightSlab']['slabs'];
                        }
                        setTimeout(function () {
                            _this.getPendingOrders();
                        }, 1000);
                        return [2 /*return*/];
                }
            });
        });
    };
    PickupDropPage.prototype.activeToggle = function () {
        this.isActive = !this.isActive;
    };
    PickupDropPage.prototype.saveSettings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var walletSettings, weightSlabs, slabData, gstObj, activeObj, pickUpSettings;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pickUp.getWalletSettings()];
                    case 1:
                        walletSettings = _a.sent();
                        if (!(walletSettings['active'] == true)) return [3 /*break*/, 5];
                        if (!(this.deliveryByWeight.baseCost == undefined || this.deliveryByWeight.baseWeight == undefined || this.deliveryByWeight.cost == undefined || this.deliveryByKm.cost == undefined)) return [3 /*break*/, 2];
                        this.presentAlert('Please fill all details');
                        return [3 /*break*/, 4];
                    case 2:
                        weightSlabs = { weightActive: this.weightSlabs.active };
                        slabData = { slabs: this.weightSlabs.slabs };
                        gstObj = { gst: this.gst };
                        activeObj = { active: this.isActive };
                        pickUpSettings = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, gstObj, activeObj, this.deliveryByWeight, this.deliveryByKm, weightSlabs, slabData);
                        console.log(pickUpSettings);
                        return [4 /*yield*/, this.pickUp.setPickUpSettings(pickUpSettings)];
                    case 3:
                        if (_a.sent()) {
                            this.presentAlert('Settings saved successfully');
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.presentAlert('Please turn on your wallet from wallet settings page to enable this feature')];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PickupDropPage.prototype.getPendingOrders = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var prevMsgDiv, msgDiv, _a, objDiv;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.showHistory = false;
                        this.currentOrders = 'pending';
                        this.ordersList = [];
                        this.orderId = '';
                        prevMsgDiv = document.getElementById(this.previousId);
                        prevMsgDiv.style.background = 'white';
                        msgDiv = document.getElementById('status1');
                        msgDiv.style.background = 'var(--ion-color-categories-background)';
                        this.previousId = 'status1';
                        _a = this;
                        return [4 /*yield*/, this.pickUp.getPendingOrders()];
                    case 1:
                        _a.ordersList = _b.sent();
                        objDiv = document.getElementById("scroll2");
                        if (objDiv) {
                            objDiv.scrollTop = 0;
                        }
                        if (this.ordersList && this.ordersList.length > 0) {
                            this.onClickViewDetails(this.ordersList[0].orderId);
                        }
                        console.log(this.ordersList);
                        return [2 /*return*/];
                }
            });
        });
    };
    PickupDropPage.prototype.getPickedOrders = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var prevMsgDiv, msgDiv, _a, objDiv;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.showHistory = false;
                        this.currentOrders = 'picked';
                        this.ordersList = [];
                        this.orderId = '';
                        prevMsgDiv = document.getElementById(this.previousId);
                        prevMsgDiv.style.background = 'white';
                        msgDiv = document.getElementById('status2');
                        msgDiv.style.background = 'var(--ion-color-categories-background)';
                        this.previousId = 'status2';
                        _a = this;
                        return [4 /*yield*/, this.pickUp.getPickedOrders()];
                    case 1:
                        _a.ordersList = _b.sent();
                        objDiv = document.getElementById("scroll2");
                        if (objDiv) {
                            objDiv.scrollTop = 0;
                        }
                        if (this.ordersList && this.ordersList.length > 0) {
                            this.onClickViewDetails(this.ordersList[0].orderId);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PickupDropPage.prototype.getDeliveredOrders = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var prevMsgDiv, msgDiv, _a, objDiv;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.showHistory = false;
                        this.currentOrders = 'delivered';
                        this.ordersList = [];
                        this.orderId = '';
                        prevMsgDiv = document.getElementById(this.previousId);
                        prevMsgDiv.style.background = 'white';
                        msgDiv = document.getElementById('status3');
                        msgDiv.style.background = 'var(--ion-color-categories-background)';
                        this.previousId = 'status3';
                        _a = this;
                        return [4 /*yield*/, this.pickUp.getDeliveredOrders()];
                    case 1:
                        _a.ordersList = _b.sent();
                        objDiv = document.getElementById("scroll2");
                        if (objDiv) {
                            objDiv.scrollTop = 0;
                        }
                        if (this.ordersList && this.ordersList.length > 0) {
                            this.onClickViewDetails(this.ordersList[0].orderId);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PickupDropPage.prototype.getCancelledOrders = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var prevMsgDiv, msgDiv, _a, objDiv;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.showHistory = false;
                        this.currentOrders = 'cancelled';
                        this.ordersList = [];
                        this.orderId = '';
                        prevMsgDiv = document.getElementById(this.previousId);
                        prevMsgDiv.style.background = 'white';
                        msgDiv = document.getElementById('status4');
                        msgDiv.style.background = 'var(--ion-color-categories-background)';
                        this.previousId = 'status4';
                        _a = this;
                        return [4 /*yield*/, this.pickUp.getCancelledOrders()];
                    case 1:
                        _a.ordersList = _b.sent();
                        objDiv = document.getElementById("scroll2");
                        if (objDiv) {
                            objDiv.scrollTop = 0;
                        }
                        if (this.ordersList && this.ordersList.length > 0) {
                            this.onClickViewDetails(this.ordersList[0].orderId);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PickupDropPage.prototype.getDateTimeFormat = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_4__(date).format('MMM D, YYYY hh:mm a');
    };
    PickupDropPage.prototype.onClickViewDetails = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, data, userDetails, _b;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        // await this.presentLoading()
                        _a = this;
                        return [4 /*yield*/, this.pickUp.getOrderData(id)];
                    case 1:
                        // await this.presentLoading()
                        _a.orderData = _c.sent();
                        if (!this.orderData[0].delivery.agentId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.pickUp.getDeliveryAgentName(this.orderData[0].delivery.agentId)];
                    case 2:
                        data = _c.sent();
                        if (data) {
                            if (data['name']) {
                                this.deliveryAgentName = data['name'];
                            }
                        }
                        _c.label = 3;
                    case 3:
                        this.orderId = id;
                        return [4 /*yield*/, this.pickUp.getUserDetails(this.orderData[0].user.id)];
                    case 4:
                        userDetails = _c.sent();
                        this.phoneNo = userDetails['phoneNo'];
                        this.showLoader = false;
                        _b = this;
                        return [4 /*yield*/, this.pickUp.getOrderLogs(id)
                            // this.loading.dismiss()
                        ];
                    case 5:
                        _b.logData = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PickupDropPage.prototype.searchOrderById = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!isNaN(parseInt(this.searchOrder))) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.pickUp.getOrderData(parseInt(this.searchOrder))
                            // console.log(this.ordersList)
                        ];
                    case 1:
                        _a.ordersList = _b.sent();
                        // console.log(this.ordersList)
                        if (this.ordersList && this.ordersList.length > 0) {
                            this.onClickViewDetails(this.ordersList[0].orderId);
                        }
                        else {
                            this.presentAlert('No such order found');
                            this.resetSearch();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        this.presentAlert('Please enter a valid number');
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PickupDropPage.prototype.resetSearch = function () {
        this.searchOrder = '';
        if (this.currentOrders == 'pending') {
            this.getPendingOrders();
        }
        else if (this.currentOrders == 'picked') {
            this.getPickedOrders();
        }
        else if (this.currentOrders == 'delivered') {
            this.getDeliveredOrders();
        }
        else if (this.currentOrders == 'cancelled') {
            this.getCancelledOrders();
        }
    };
    PickupDropPage.prototype.isCancelReasonAvailable = function () {
        if (this.orderData[0].cancelData) {
            return 'cancelData' in this.orderData[0] && this.orderData[0].cancelData.reason;
        }
    };
    PickupDropPage.prototype.onClickCancelOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: "Are you sure you want to cancel this order?",
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        //console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Yes',
                                    handler: function () {
                                        //console.log('Confirm Yes');
                                        _this.getCancelReason();
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
    PickupDropPage.prototype.getCancelReason = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: src_app_admin_admin_shop_all_orders_cancelled_reason_cancelled_reason_page__WEBPACK_IMPORTED_MODULE_8__["CancelledReasonPage"]
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (res) {
                            if (res && res.data) {
                                _this.cancelOrder(res.data);
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
    PickupDropPage.prototype.cancelOrder = function (cancelReason) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var orderCancelled;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.pickUp.cancelOrderByAdmin(parseInt(this.orderId), cancelReason, this.orderData[0].user.name)];
                    case 2:
                        orderCancelled = _a.sent();
                        if (!orderCancelled) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.presentAlert('Order Cancelled Successfully!')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.loading.dismiss();
                        this.onClickViewDetails(this.orderId);
                        return [2 /*return*/];
                }
            });
        });
    };
    PickupDropPage.prototype.onClickPickupOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: "Are you sure you want to pickup this order?",
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        //console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Yes',
                                    handler: function () {
                                        //console.log('Confirm Yes');
                                        _this.pickupOrder();
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
    PickupDropPage.prototype.pickupOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var orderPicked;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.pickUp.changeOrderStatus(this.orderId, 'picked')];
                    case 2:
                        orderPicked = _a.sent();
                        if (!orderPicked) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.presentAlert('Order Picked Up Successfully!')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.loading.dismiss();
                        this.onClickViewDetails(this.orderId);
                        return [2 /*return*/];
                }
            });
        });
    };
    PickupDropPage.prototype.onClickDeliverOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: "Are you sure you want to deliver this order?",
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        //console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Yes',
                                    handler: function () {
                                        //console.log('Confirm Yes');
                                        _this.deliverOrder();
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
    PickupDropPage.prototype.deliverOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var orderPicked;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.pickUp.changeOrderStatus(this.orderId, 'delivered')];
                    case 2:
                        orderPicked = _a.sent();
                        if (!orderPicked) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.presentAlert('Order Delivered Successfully!')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.loading.dismiss();
                        this.onClickViewDetails(this.orderId);
                        return [2 /*return*/];
                }
            });
        });
    };
    PickupDropPage.prototype.onChangeDeliveryAgent = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var selectedDeliveryAgentId, result;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selectedDeliveryAgentId = event.target.value;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.pickUp.assignDeliveryAgent(selectedDeliveryAgentId, this.orderId)];
                    case 2:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.presentAlert('Delivery agent assigned!')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.loading.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    PickupDropPage.prototype.isStatusTimelinePresent = function (status) {
        return this.orderData[0].timeline.hasOwnProperty(status);
    };
    PickupDropPage.prototype.isStatusCancelled = function (status) {
        return ['cancelled'].includes(status);
    };
    PickupDropPage.prototype.hideStatuses = function (status) {
        var cancelledHides = ['picked', 'delivered'];
        var cancelOrReturnedStatuses = ['cancelled'];
        if (this.orderData[0].status === 'cancelled') {
            return cancelledHides.includes(status);
        }
        if (!(cancelOrReturnedStatuses.includes(this.orderData[0].status))) {
            return cancelOrReturnedStatuses.includes(status);
        }
    };
    PickupDropPage.prototype.isLastStatus = function (status) {
        return status === 'delivered';
    };
    PickupDropPage.prototype.onSetupDeliveryAgent = function () {
        this.router.navigate(['admin-allusers']);
    };
    PickupDropPage.prototype.presentLoading = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: "Please Wait...",
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
    PickupDropPage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: ['ok']
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
    PickupDropPage.prototype.deliveryBasedToggle = function () {
        this.weightSlabs.active = !this.weightSlabs.active;
        console.log(this.weightSlabs);
    };
    PickupDropPage.prototype.enterSlabData = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            subHeader: "Enter Slab Details",
                            inputs: [
                                {
                                    name: 'name',
                                    type: 'text',
                                    placeholder: "Add Name for slab"
                                },
                                {
                                    name: 'Weight',
                                    type: 'number',
                                    placeholder: "Add Weight For Slabs in Kg"
                                },
                                {
                                    name: 'cost',
                                    type: 'number',
                                    placeholder: "Add cost for slab"
                                }
                            ],
                            buttons: [
                                {
                                    text: "cancel",
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: "done",
                                    handler: function (data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                        var lastIndex;
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                            if (!data.Weight || !data.cost || !data.name) {
                                                this.presentAlert("Please enter all details!");
                                            }
                                            else {
                                                if (this.weightSlabs.slabs.length == 0) {
                                                    this.weightSlabs.slabs.push({
                                                        Name: data.name,
                                                        range: [0, parseInt(data.Weight)],
                                                        cost: parseInt(data.cost)
                                                    });
                                                }
                                                else {
                                                    lastIndex = this.weightSlabs.slabs.length;
                                                    this.weightSlabs.slabs.push({
                                                        Name: data.name,
                                                        range: [this.weightSlabs.slabs[lastIndex - 1].range[1],
                                                            this.weightSlabs.slabs[lastIndex - 1].range[1] + parseInt(data.Weight)],
                                                        cost: parseInt(data.cost),
                                                    });
                                                }
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        console.log(this.weightSlabs);
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PickupDropPage.prototype.removeSlabs = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            subHeader: "Are you sure you want to remove all slabs?",
                            buttons: [
                                {
                                    text: "No",
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                    }
                                }, {
                                    text: "Yes",
                                    handler: function (data) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                            this.weightSlabs.slabs = [];
                                            return [2 /*return*/];
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
    PickupDropPage.ctorParameters = function () { return [
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__["LabelService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__["ConfigService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: src_app_services_pickUp_pick_up_service__WEBPACK_IMPORTED_MODULE_7__["PickUpService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"] }
    ]; };
    PickupDropPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-pickup-drop',
            template: __webpack_require__(/*! raw-loader!./pickup-drop.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/pickup-drop/pickup-drop.page.html"),
            styles: [__webpack_require__(/*! ./pickup-drop.page.scss */ "./src/app/admin/pickup-drop/pickup-drop.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_3__["LabelService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_5__["ConfigService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            src_app_services_pickUp_pick_up_service__WEBPACK_IMPORTED_MODULE_7__["PickUpService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"]])
    ], PickupDropPage);
    return PickupDropPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-pickup-drop-pickup-drop-module-es5.js.map