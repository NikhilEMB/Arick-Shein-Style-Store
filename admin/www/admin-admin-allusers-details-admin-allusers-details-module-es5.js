(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-allusers-details-admin-allusers-details-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-allusers-details/admin-allusers-details.page.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-allusers-details/admin-allusers-details.page.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"user-cart\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center style=\"margin-left: 48px;\">{{udata.name}}</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs no-shadow no-border [activeTabIndex]=\"activeTabIndex\">\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Orders</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Details</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Wallet</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Settings</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Advanced</ion-label>\r\n    </super-tab-button>\r\n\r\n    <super-tab-button>\r\n      <ion-label>Points</ion-label>\r\n    </super-tab-button>\r\n\r\n  </super-tabs-toolbar>\r\n\r\n  <super-tabs-container>\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n        <div class=\"spinner\" *ngIf=\"ordersLoader; else ordersLoaded;\">\r\n          <ion-spinner color=\"primary\"></ion-spinner>\r\n        </div>\r\n        <ng-template #ordersLoaded>\r\n          <div class=\"no-data\" *ngIf=\"!orders.length; else ordersHasLength;\" text-center>\r\n            <img src=\"assets/img/no-orders.png\" alt=\"\">\r\n            <h6>No orders</h6>\r\n          </div>\r\n          <ng-template #ordersHasLength>\r\n            <div *ngFor=\"let order of orders; let i=index\">\r\n              <div class=\"aud-order-id\">\r\n                Order Id: ORD{{order.orderId}}\r\n              </div>\r\n              <div class=\"aud-products-container\">\r\n                <div class=\"aud-placed-on\" *ngIf=\"order.createdAt\">\r\n                  Placed On {{order.createdAt.toDate() | date}} by <span>{{order.userName}}</span>\r\n                </div>\r\n                <ion-list class=\"ion-no-padding\" lines=\"none\" *ngIf=\"order?.products[0]\">\r\n                  <ion-item class=\"ion-no-padding\">\r\n                    <div slot=\"start\"\r\n                      [ngStyle]=\"{'background': 'url(' + order.products[0].img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n                      class=\"aud-product-image\">\r\n                      <div class=\"aud-more\" *ngIf=\"order.products.length > 1\">+ {{order.products.length - 1}} more</div>\r\n                    </div>\r\n                    <ion-label>\r\n                      <h2 class=\"aud-product-price ion-text-wrap\">\r\n                        {{order.totalAmountToPaid | currency: currencyCode:true:'0.0'}}\r\n                      </h2>\r\n                      <h3 class=\"aud-product-name ion-text-wrap\">{{order.products[0].name}} <span\r\n                          *ngIf=\"order.products.length > 1\">+ {{order.products.length - 1}} more</span>\r\n                      </h3>\r\n                      <h5>{{order.status}}<span><i class=\"flaticon-null-20\"></i></span></h5>\r\n                    </ion-label>\r\n                  </ion-item>\r\n                  <div class=\"aud-action-btn\"\r\n                    *ngIf=\"order.deliveryStatus === 'inProgress' && (order.status === 'Confirmed' || order.status === 'Dispatched'); else showOnlyViewOrder\">\r\n                    <ion-grid>\r\n                      <ion-row class=\"ion-justify-content-center\" style=\"opacity: .6;font-size: small;\">\r\n                        <ion-col size=\"12\">\r\n                          Delivery agent has started delivery\r\n                        </ion-col>\r\n                      </ion-row>\r\n                      <ion-row>\r\n                        <ion-col size=\"6\">\r\n                          <ion-button (click)=\"onClickViewDetails(order.orderId)\" size=\"small\" shape=\"round\">\r\n                            View Order\r\n                          </ion-button>\r\n                        </ion-col>\r\n                        <ion-col size=\"6\">\r\n                          <ion-button (click)=\"onClickTrackOrder(order.deliveryAgentId, order.deliveryLatLng)\"\r\n                            size=\"small\" shape=\"round\" color=\"dark\">\r\n                            Track Order\r\n                          </ion-button>\r\n                        </ion-col>\r\n                      </ion-row>\r\n                    </ion-grid>\r\n                  </div>\r\n                  <ng-template #showOnlyViewOrder>\r\n                    <div class=\"aud-view-details-btn\">\r\n                      <ion-button (click)=\"onClickViewDetails(order.orderId)\" size=\"small\" shape=\"round\">\r\n                        View Order\r\n                      </ion-button>\r\n                    </div>\r\n                  </ng-template>\r\n                </ion-list>\r\n              </div>\r\n            </div>\r\n          </ng-template>\r\n        </ng-template>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n        <div style=\"text-align: center;\">\r\n          <ion-button (click)=\"saveUserData()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\" fill=\"outline\">\r\n            <i class=\"flaticon-null-20 margin-icon\"></i>\r\n            Save\r\n          </ion-button>&nbsp;&nbsp;\r\n        </div>\r\n        <div style=\"padding: 10px;margin: 6px\">\r\n          <ion-button (click)='showEditDetails = !showEditDetails' *ngIf='!showEditDetails'>Edit User Details</ion-button>\r\n          <ion-button (click)='showEditDetails = !showEditDetails' *ngIf='showEditDetails'>View User Details</ion-button>\r\n          <br><br>\r\n          <div *ngIf='!showEditDetails'>\r\n            <p *ngIf = 'udata.name'><strong>Name</strong> : {{udata.name}}</p>\r\n            <p *ngIf = '!udata.name'><strong>Name</strong> : <span style=\"color: red;\">Not Provided</span></p>\r\n            <br>\r\n            <p *ngIf = 'udata.email'><strong>Email</strong> : {{udata.email}}</p>\r\n            <p *ngIf = '!udata.email'><strong>Email</strong> : <span style=\"color: red;\">Not Provided</span></p>\r\n            <br>\r\n            <p *ngIf = 'udata.birthday'><strong>Birthday</strong> : {{getDateTimeFormat(udata.birthday) | date}}</p>\r\n            <p *ngIf = '!udata.birthday'><strong>Birthday</strong>  : <span style=\"color: red;\">Not Provided</span></p>\r\n            <br>\r\n            <p *ngIf = 'udata.phoneNo'><strong>Phone No</strong> : {{udata.phoneNo}}</p>\r\n            <p *ngIf = '!udata.phoneNo'><strong>Phone No</strong> : <span style=\"color: red;\">Not Provided</span></p>\r\n            <br>\r\n            <p *ngIf = 'udata.customerGstNo'><strong>Customer Gst No</strong> : {{udata.customerGstNo}}</p>\r\n            <p *ngIf = '!udata.customerGstNo'><strong>Customer Gst No</strong> : <span style=\"color: red;\">Not Provided</span></p>\r\n            <br>\r\n            <p *ngIf = 'udata.customInput'><strong>Custom Input</strong> : {{udata.customInput}}</p>\r\n            <p *ngIf = '!udata.customInput'><strong>Custom Input</strong> : <span style=\"color: red;\">Not Provided</span></p>\r\n          </div>\r\n          <div *ngIf='showEditDetails'>\r\n            <div style=\"display: flex;align-items: center;\">\r\n              <strong>Name&nbsp;:</strong>&nbsp;<input placeholder=\"Enter Name\" [(ngModel)]='udata.name'/>\r\n            </div>\r\n            <br>\r\n            <div style=\"display: flex;align-items: center;\">\r\n              <strong>Email&nbsp;:</strong>&nbsp;<input placeholder=\"Enter Email\" [(ngModel)]='udata.email'/>\r\n            </div>\r\n            <br>\r\n            <p *ngIf = 'udata.birthday'><strong>Birthday</strong> : {{getDateTimeFormat(udata.birthday) | date}}</p>\r\n            <p *ngIf = '!udata.birthday'><strong>Birthday</strong>  : <span style=\"color: red;\">Not Provided</span></p>\r\n            <br>\r\n            <p *ngIf = 'udata.phoneNo'><strong>Phone No</strong> : {{udata.phoneNo}}</p>\r\n            <p *ngIf = '!udata.phoneNo'><strong>Phone No</strong> : <span style=\"color: red;\">Not Provided</span></p>\r\n            <br>\r\n            <div style=\"display: flex;align-items: center;\">\r\n              <strong>Customer Gst No&nbsp;:</strong>&nbsp;<input placeholder=\"Enter Gst No\" [(ngModel)]='udata.customerGstNo'/>\r\n            </div>\r\n            <br>\r\n            <div style=\"display: flex;align-items: center;\">\r\n              <strong>Custom Input&nbsp;:</strong>&nbsp;<input placeholder=\"Enter Custom Input\" [(ngModel)]='udata.customInput'/>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"spinner\" *ngIf=\"addressLoader; else addressLoaded;\">\r\n          <ion-spinner color=\"primary\"></ion-spinner>\r\n        </div>\r\n        <ng-template #addressLoaded>\r\n          <div class=\"no-data\" *ngIf=\"!addresses.length; else addressesHasLength;\" text-center>\r\n            <img src=\"assets/img/no-user.png\" alt=\"\">\r\n            <h6>No saved addresses</h6>\r\n          </div>\r\n          <ng-template #addressesHasLength>\r\n            <div class=\"address-card\" *ngFor=\"let address of addresses; let i=index\">\r\n              <div>\r\n                <div *ngIf = '!showEditAddress[i]' style=\"margin-bottom: 8px;\">\r\n                  <p class=\"user-name\">{{address.name}}</p>\r\n                  <p class=\"address\">{{address.address}}</p>\r\n                  <p class=\"phone-no\">{{address.phoneNo}}</p>\r\n                  <ng-container *ngIf=\"address?.additionalPhoneNo\">\r\n                    <p class=\"phone-no\">{{address.additionalPhoneNo}}</p>\r\n                  </ng-container>\r\n                </div>\r\n                <div *ngIf = 'showEditAddress[i]'>\r\n                  <div style=\"display: flex;align-items: center;\">\r\n                    <p>Name&nbsp;:</p>&nbsp;<input placeholder=\"Enter Name for Address\" [(ngModel)]='address.name'/>&nbsp;&nbsp;\r\n                    <p>Phone No&nbsp;:</p>&nbsp;<input placeholder=\"Enter Phone Number for Address\" [(ngModel)]='address.phoneNo'/>&nbsp;&nbsp;\r\n                    <ng-container *ngIf=\"address?.additionalPhoneNo\">\r\n                      <p>additional Phone No&nbsp;:</p>&nbsp;<input placeholder=\"Additional Phone Number for Address\" [(ngModel)]='address.additionalPhoneNo'/>&nbsp;&nbsp;\r\n                    </ng-container>\r\n                    <p>City&nbsp;:</p>&nbsp;<input placeholder=\"Enter City\" [(ngModel)]='address.city'/>\r\n                  </div>\r\n                  <br>\r\n                  <div style=\"display: flex;align-items: center;\">\r\n                    <p>Address&nbsp;:</p>&nbsp;<input placeholder=\"Enter Address\" [(ngModel)]='address.address'/>&nbsp;&nbsp;\r\n                    <div class=\"state-div\">\r\n                      <p>State</p>\r\n                      <div class=\"form-input state-wrapper\"\r\n                        (click)=\"openStateModal(i)\">\r\n                        <div *ngIf=\"address.state\">{{address.state}}\r\n                        </div>\r\n                        <div *ngIf=\"!address.state\">Select State</div>\r\n                        <div>\r\n                          <i class=\"flaticon-null-13\"></i>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <!-- <p>State&nbsp;:</p>&nbsp;<input placeholder=\"Enter Address\" [(ngModel)]='address.state'/> -->\r\n                    &nbsp;&nbsp;\r\n                    <p>Pincode&nbsp;:</p>&nbsp;<input placeholder=\"Enter Address\" [(ngModel)]='address.pincode'/>\r\n                  </div>\r\n                </div>\r\n                <ion-button (click)='showEditAddress[i] = !showEditAddress[i]' *ngIf='!showEditAddress[i]'>Edit Address</ion-button>\r\n                <ion-button (click)='showEditAddress[i] = !showEditAddress[i]' *ngIf='showEditAddress[i]'>View Address</ion-button>\r\n              </div>\r\n            </div>\r\n          </ng-template>\r\n        </ng-template>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <super-tab>\r\n      <ion-content class=\"ion-padding\">\r\n        <div class=\"main-container\">\r\n          <ion-button (click)=\"getMoneyAddType('addMoney')\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n           \r\n            Add money\r\n          </ion-button>\r\n\r\n          <ion-button (click)=\"getMoneyAddType('chargeUser')\" shape=\"round\" class=\"btn-1 i-start\" color=\"primary\">\r\n           \r\n            Charge User\r\n          </ion-button>\r\n\r\n        <div class=\"spinner\" *ngIf=\"walletLoader; else txnsLoaded;\">\r\n          <ion-spinner color=\"primary\"></ion-spinner>\r\n        </div>\r\n      \r\n        <ng-template #txnsLoaded>\r\n          <div class=\"no-data\" *ngIf=\"!transactions.length; else txnsHasLength;\" text-center>\r\n            <img src=\"assets/img/no-user.png\" alt=\"\">\r\n            <h6>No wallet transactions</h6>\r\n          </div>\r\n          <ng-template #txnsHasLength>\r\n            <div class=\"inline-align\">\r\n              <h6>\r\n                Wallet Balance:\r\n              </h6>\r\n              <h6>\r\n                {{balance | currency:currencyCode:true}}\r\n              </h6>\r\n            </div>\r\n            <div class=\"inline-align\">\r\n              <h6>\r\n                Cashback Balance:\r\n              </h6>\r\n              <h6>\r\n                {{cashbackBalance | currency:currencyCode:true}}\r\n              </h6>\r\n            </div>\r\n            <div class=\"trans-wrapper\">\r\n              <div *ngFor=\"let t of transactions\" class=\"trans-conatiner\">\r\n                <div class=\"inline-align\">\r\n                  <h6 class=\"trans-msg\">{{t.message}}</h6>\r\n                  <ion-text color=\"success\" *ngIf=\"t.type === 'credit'\" class=\"trans-type\">+{{t.amount}}</ion-text>\r\n                  <ion-text color=\"danger\" *ngIf=\"t.type === 'debit'\" class=\"trans-type\">-{{t.amount}}</ion-text>\r\n                </div>\r\n                <div class=\"reason my-10\" *ngIf=\"t.reason\">\r\n                  {{t.reason}}\r\n                </div>\r\n                <div class=\"trans-date\">\r\n                  {{t.createdAt.toDate() | date}}\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadMoreTxns($event)\">\r\n              <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more transactions...\">\r\n              </ion-infinite-scroll-content>\r\n            </ion-infinite-scroll>\r\n          </ng-template>\r\n        </ng-template>\r\n        </div>\r\n      </ion-content>\r\n   \r\n    </super-tab>\r\n\r\n    <super-tab>\r\n        <ion-content class=\"ion-padding\">\r\n          <div style=\"display: flex;\" *ngIf='appAllowFeature'>\r\n            <div>Allow user to access app and website</div>&nbsp;&nbsp;\r\n            <div class=\"toggle-btn\">\r\n              <label class=\"switch\">\r\n                <input type=\"checkbox\" (click)=\"appAccessToggle()\" [checked]=\"allowAppAccess\">\r\n                <span class=\"slider round\"></span>\r\n              </label>\r\n            </div>\r\n            <br><br>\r\n          </div>\r\n          <div class=\"assign-delivery\">\r\n            <div style=\"display: flex;align-items: center;\">\r\n              <p>Set Default Delivery Agent</p>\r\n            </div>\r\n            <br>\r\n            <ion-item lines=\"none\">\r\n              <ion-label>Delivery Agent</ion-label>\r\n              <ion-select [(ngModel)]=\"udata.defaultDeliveryAgentId\" interface=\"popover\" [placeholder]=\"selectAgentPh\"\r\n                (ionChange)=\"onChangeDeliveryAgent($event)\" *ngIf=\"!noDeliveryAgents && allDeliveryAgents.length\">\r\n                <ion-select-option value=\"\" >No Delivery Agent\r\n                </ion-select-option>\r\n                <ion-select-option [value]=\"agents.id\" *ngFor=\"let agents of allDeliveryAgents\">{{agents.name}}\r\n                </ion-select-option>\r\n              </ion-select>\r\n              <ion-select interface=\"popover\" [placeholder]=\"selectAgentPh\" (ionChange)=\"onSetupDeliveryAgent()\"\r\n                *ngIf=\"noDeliveryAgents\">\r\n                <ion-select-option>Setup Delivery Agent</ion-select-option>\r\n              </ion-select>\r\n            </ion-item>\r\n          </div>\r\n          <br>\r\n          <div>\r\n            <p>Additional Information</p>\r\n            <ion-item lines=\"none\">\r\n              <textarea placeholder=\"Enter User Information\" class=\"userInfo\" [(ngModel)]=\"udata.additionalInfo\"></textarea>\r\n            </ion-item>\r\n            <br>\r\n            <div class=\"assign-delivery\">\r\n              <div style=\"display: flex;align-items: center;\">\r\n                <p>Select Groups</p>\r\n              </div>\r\n              <br>\r\n              <ion-list *ngIf=\"groups\">\r\n                <ion-item lines=\"none\">\r\n                  <ion-label>Groups</ion-label>\r\n                  <ion-select [(ngModel)]=\"udata.groups\" multiple placeholder=\"Select Groups\">\r\n                    <ng-container *ngFor=\"let group of groups\">\r\n                      <ion-select-option [value]=\"group.id\">{{group.name}}\r\n                      </ion-select-option>\r\n                    </ng-container>\r\n                  </ion-select>\r\n                </ion-item>\r\n              </ion-list>\r\n            </div>\r\n            <br>\r\n            <ion-button (click)=\"saveAdditonalInfo()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n              <i class=\"flaticon-null-20 margin-icon\"></i>\r\n              <p>Save</p>\r\n            </ion-button>\r\n          </div>\r\n        </ion-content>\r\n      </super-tab>\r\n\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container\">\r\n            <ion-segment value = \"cart\" style=\"border-bottom: 1px solid lightgray;\">\r\n              <ion-segment-button value = \"cart\" (click)='getCartItems()'>\r\n                <ion-label style=\"font-size: small;\">Products in Cart</ion-label>\r\n              </ion-segment-button>\r\n              <ion-segment-button (click)='getSearches()'>\r\n                <ion-label style=\"font-size: small;\">Searches</ion-label>\r\n              </ion-segment-button>\r\n            </ion-segment>  \r\n            <br>\r\n            <div *ngIf=\"currentTab == 'cart' \">\r\n              <ion-row style=\"text-align: center;font-weight: 500;\">\r\n                <ion-col>\r\n                  <p>Image</p>\r\n                </ion-col>\r\n                <ion-col>\r\n                  <p>Name</p>\r\n                </ion-col>\r\n                <ion-col>\r\n                  <p>Quantity</p>\r\n                </ion-col> \r\n                <ion-col>\r\n                  <p>Variant</p>\r\n                </ion-col>\r\n                <ion-col>\r\n                  <p>Color</p>\r\n                </ion-col>\r\n                <ion-col>\r\n                  <p>Price</p>\r\n                </ion-col>             \r\n                <ion-col>\r\n                  <p>Total Price</p>\r\n                </ion-col>             \r\n              </ion-row>\r\n              <div *ngFor='let product of cartItems'>\r\n                <ion-row style=\"text-align: center;display: flex;align-items: center;\">\r\n                  <ion-col>\r\n                    <img class=\"loading\" *ngIf=\"product.img && !product.img.thumb && product.img.url\" src=\"{{product.img.url}}\" height=\"35\">\r\n                    <img class=\"loading\" *ngIf=\"product.img && product.img.thumb\" src=\"{{product.img.thumb}}\" height=\"35\">\r\n                    <img *ngIf=\"!product.img\" src=\"assets/img/placeholder-img.jpg\" height=\"35\">\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    <p>{{product.name}}</p>\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    <p>{{product.quantity}}</p>\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    <p>{{product.pack ? product.pack?.variantType : '--'}}\r\n                      {{product.pack ? '('+ product.pack?.weight +')' : ''}}\r\n                    </p>\r\n                  </ion-col> \r\n                  <ion-col>\r\n                    <p>{{product.color ? product.color?.name : '--'}}</p>\r\n                  </ion-col> \r\n                  <ion-col>\r\n                    <p>{{product.price}}</p>\r\n                  </ion-col>                \r\n                  <ion-col>\r\n                    <p>{{getTotalAmount(product).totalAmount}}</p>\r\n                  </ion-col>                \r\n                </ion-row>\r\n              </div>\r\n              <br>\r\n              <ion-text color=\"danger\" *ngIf=\"showWarning\" style=\"text-align: center;\">\r\n                <p style=\"font-size: medium;\">Limited Results visible, Please upgrade to Premium Plan. If already in premium plan, contact support</p>\r\n              </ion-text>\r\n            </div>\r\n            <div *ngIf=\"currentTab == 'search' \">\r\n              <ion-row style=\"text-align: center;\">\r\n                <ion-col>\r\n                  <p>Word</p>\r\n                </ion-col>\r\n                <ion-col>\r\n                  <p>Source</p>\r\n                </ion-col>\r\n                <ion-col>\r\n                  <p>Searched At</p>\r\n                </ion-col>                \r\n              </ion-row>\r\n              <br>\r\n              <div *ngFor='let item of searchItems'>\r\n                <ion-row style=\"text-align: center;display: flex;align-items: center;\">\r\n                  <ion-col>\r\n                    <p>{{item.value}}</p>\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    <p *ngIf=\"item.source == 'app' \">App</p>\r\n                    <p *ngIf=\"item.source == 'web' \">Website</p>\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    <p>{{getDateTimeFormat(item.searchedAt.toDate())}}</p>\r\n                  </ion-col>                \r\n                </ion-row>\r\n              </div>\r\n              <br>\r\n              <ion-text color=\"danger\" *ngIf=\"showWarning\" style=\"text-align: center;\">\r\n                <p style=\"font-size: medium;\">Limited Results visible, Please upgrade to Premium Plan. If already in premium plan, contact support</p>\r\n              </ion-text>\r\n            </div>\r\n          </div>\r\n        </ion-content>\r\n      </super-tab>\r\n\r\n      <super-tab>\r\n        <ion-content class=\"ion-padding\">\r\n          <div class=\"main-container\">\r\n            <div class=\"add-points-btn\">\r\n              <p>Total Points: {{udata && udata.point && udata.point.totalPoints ? udata.point.totalPoints : 0}}</p>\r\n              <ion-button (click)=\"addPointsAlert()\">Add Points</ion-button>\r\n            </div>\r\n       \r\n            <div class=\"tableArea\">\r\n              <table>\r\n                <thead>\r\n                  <tr class=\"header\">\r\n                    <th>Sr No.</th>\r\n                    <th>Message</th>\r\n                    <th>Type</th>\r\n                    <th>Points</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let pointTxn of pointTransactions; index as i\">\r\n                    <td>{{i + 1}}</td>\r\n                    <td>{{pointTxn.msg}}</td>\r\n                    <td>{{pointTxn.type}}</td>\r\n                    <td>{{pointTxn.point}}</td>\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n            \r\n          </div>\r\n        </ion-content>\r\n     \r\n      </super-tab>\r\n\r\n  </super-tabs-container>\r\n</super-tabs>"

/***/ }),

/***/ "./src/app/admin/admin-allusers-details/admin-allusers-details.module.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/admin-allusers-details/admin-allusers-details.module.ts ***!
  \*******************************************************************************/
/*! exports provided: AdminAllusersDetailsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminAllusersDetailsPageModule", function() { return AdminAllusersDetailsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_allusers_details_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-allusers-details.page */ "./src/app/admin/admin-allusers-details/admin-allusers-details.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");
/* harmony import */ var src_app_pipes_application_pipes_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/pipes/application-pipes.module */ "./src/app/pipes/application-pipes.module.ts");









var routes = [
    {
        path: '',
        component: _admin_allusers_details_page__WEBPACK_IMPORTED_MODULE_6__["AdminAllusersDetailsPage"]
    }
];
var AdminAllusersDetailsPageModule = /** @class */ (function () {
    function AdminAllusersDetailsPageModule() {
    }
    AdminAllusersDetailsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"],
                src_app_pipes_application_pipes_module__WEBPACK_IMPORTED_MODULE_8__["ApplicationPipesModule"]
            ],
            declarations: [_admin_allusers_details_page__WEBPACK_IMPORTED_MODULE_6__["AdminAllusersDetailsPage"]]
        })
    ], AdminAllusersDetailsPageModule);
    return AdminAllusersDetailsPageModule;
}());



/***/ }),

/***/ "./src/app/admin/admin-allusers-details/admin-allusers-details.page.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/admin-allusers-details/admin-allusers-details.page.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".no-data {\n  margin: 0;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  left: 50%;\n  margin-left: -65px;\n}\n\n.no-data img {\n  width: 130px;\n}\n\nion-content {\n  --background: #F2F2F2;\n  --padding-bottom: 50px;\n}\n\nion-list {\n  border-radius: 5px;\n}\n\n.aud-products-container {\n  margin: 0px 10px 10px 10px;\n  background: white;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 15px 5px 10px 2px;\n  position: relative;\n}\n\n.aud-product-image {\n  background: transparent url('img-preloader.png') center no-repeat;\n  width: 85px;\n  height: 85px;\n  position: relative;\n  left: 15px;\n  border: 1px solid #f0f0f0;\n}\n\n.aud-more {\n  background: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(transparent));\n  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent);\n  bottom: 0;\n  height: 20px;\n  position: absolute;\n  width: 84px;\n  z-index: 2;\n  color: white;\n  font-size: 12px;\n  text-align: center;\n  padding: 5px;\n}\n\n.aud-product-name {\n  font-size: 14px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.aud-product-price {\n  color: var(--ion-color-primary);\n  font-size: 18px;\n}\n\n.spinner {\n  margin-top: 50%;\n  text-align: center;\n}\n\n.aud-placed-on {\n  font-size: 12px;\n  text-align: center;\n  opacity: 0.7;\n  margin-bottom: 3%;\n}\n\n.aud-placed-on span {\n  font-weight: 600;\n}\n\n.aud-order-id {\n  margin: 15px 10px 1px;\n  opacity: 0.8;\n  font-size: 13px;\n}\n\n.aud-action-btn {\n  text-align: center;\n}\n\n.aud-view-details-btn {\n  text-align: center;\n}\n\nspan .flaticon-null-20::before {\n  color: var(--ion-color-success);\n  margin-left: 2px;\n}\n\nspan .flaticon-null-19::before {\n  color: var(--ion-color-danger);\n  margin-left: 2px;\n}\n\n.address-card {\n  background: white;\n  padding: 10px;\n  margin: 6px 12px 12px 12px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.user-name {\n  font-size: 15px;\n}\n\n.address {\n  font-size: 13px;\n}\n\n.phone-no {\n  font-size: 13px;\n  margin-bottom: -5px;\n}\n\n.trans-wrapper {\n  margin-top: 15px;\n  padding-bottom: 50px;\n}\n\n.trans-conatiner {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 15px;\n  margin-bottom: 15px;\n  background-color: white;\n}\n\n.trans-type {\n  font-weight: bold;\n  font-size: small;\n}\n\n.inline-align {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.inline-align h6 {\n  font-size: 15px;\n}\n\n.trans-msg {\n  margin-top: 0px;\n}\n\n.trans-date, .reason {\n  font-size: 12px;\n  opacity: 0.6;\n}\n\n.cancel-btn {\n  background-color: var(--ion-color-dark);\n  color: white;\n}\n\n.cancel-btn div {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.save-btn {\n  background-color: var(--ion-color-primary);\n  color: var(--ion-color-primary-contrast);\n}\n\n.margin-icon {\n  margin-left: 5px;\n}\n\nion-footer ion-title {\n  height: 45px;\n}\n\n.bottom-buttons {\n  font-size: 14px;\n  margin-left: 5px;\n}\n\n.userInfo {\n  border: none;\n  width: 100vw;\n  height: 15vh;\n  padding: 10px;\n  outline: none;\n}\n\ninput {\n  border: none;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  padding: 4px;\n}\n\n.state-div {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  margin: 0px 10px;\n}\n\n.state-wrapper {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 8px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.add-points-btn {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.tableArea {\n  margin-top: 1rem;\n  border-radius: 6px;\n  overflow: hidden;\n}\n\n.tableArea table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.tableArea table td,\n.tableArea table th {\n  border: 1px solid #dddddd;\n  text-align: center;\n  padding: 8px;\n}\n\n.tableArea table tr:hover {\n  background-color: #efefef;\n}\n\n.tableArea .header {\n  background: lightgray;\n}\n\n.tableArea .deleteIcon {\n  font-size: 18px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tYWxsdXNlcnMtZGV0YWlscy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGFkbWluLWFsbHVzZXJzLWRldGFpbHNcXGFkbWluLWFsbHVzZXJzLWRldGFpbHMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZG1pbi1hbGx1c2Vycy1kZXRhaWxzL2FkbWluLWFsbHVzZXJzLWRldGFpbHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksU0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUVBLG1DQUFBO1VBQUEsMkJBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFRTtFQUNFLFlBQUE7QUNDSjs7QURFRTtFQUNFLHFCQUFBO0VBQ0Esc0JBQUE7QUNDSjs7QURFRTtFQUNFLGtCQUFBO0FDQ0o7O0FERUU7RUFDRSwwQkFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLDBCQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFRTtFQUNFLGlFQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSx5QkFBQTtBQ0NKOztBREVFO0VBQ0Usc0dBQUE7RUFBQSxrRUFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FDQ0o7O0FERUU7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQ0NKOztBREVFO0VBQ0UsK0JBQUE7RUFDQSxlQUFBO0FDQ0o7O0FERUU7RUFDRSxlQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFRTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQ0NKOztBRENFO0VBQ0UsZ0JBQUE7QUNFSjs7QURBRTtFQUNFLHFCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUNHSjs7QURBRTtFQUNFLGtCQUFBO0FDR0o7O0FEREU7RUFDRSxrQkFBQTtBQ0lKOztBREZFO0VBQ0UsK0JBQUE7RUFDQSxnQkFBQTtBQ0tKOztBREhFO0VBQ0UsOEJBQUE7RUFDQSxnQkFBQTtBQ01KOztBREhBO0VBQ0ksaUJBQUE7RUFDQSxhQUFBO0VBQ0EsMEJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FDTUo7O0FESEE7RUFDSSxlQUFBO0FDTUo7O0FESkE7RUFDSSxlQUFBO0FDT0o7O0FETEE7RUFDSSxlQUFBO0VBQ0EsbUJBQUE7QUNRSjs7QURKQTtFQUNFLGdCQUFBO0VBQ0Esb0JBQUE7QUNPRjs7QURKQTtFQUNFLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQ09GOztBREpBO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtBQ09GOztBREpBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNPRjs7QURMQTtFQUNFLGVBQUE7QUNRRjs7QUROQTtFQUNFLGVBQUE7QUNTRjs7QUROQTtFQUNFLGVBQUE7RUFDQSxZQUFBO0FDU0Y7O0FETkE7RUFDRSx1Q0FBQTtFQUNBLFlBQUE7QUNTRjs7QURSRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNVSjs7QUROQTtFQUNFLDBDQUFBO0VBQ0Esd0NBQUE7QUNTRjs7QUROQTtFQUNFLGdCQUFBO0FDU0Y7O0FETkE7RUFDRSxZQUFBO0FDU0Y7O0FETkE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7QUNTRjs7QUROQTtFQUNFLFlBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0FDU0Y7O0FERkE7RUFDRSxZQUFBO0VBR0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUNHRjs7QURBQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNFLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxnQkFBQTtBQ0dKOztBRERBO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBQ0lGOztBRERBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7QUNJRjs7QURGQTtFQUNFLGdCQUFBO0VBRUEsa0JBQUE7RUFDQSxnQkFBQTtBQ0lGOztBREZFO0VBQ0UseUJBQUE7RUFDQSxXQUFBO0FDSUo7O0FERkk7O0VBRUUseUJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QUNJTjs7QURGSTtFQUNFLHlCQUFBO0FDSU47O0FEREU7RUFDRSxxQkFBQTtBQ0dKOztBRERFO0VBQ0UsZUFBQTtBQ0dKIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vYWRtaW4tYWxsdXNlcnMtZGV0YWlscy9hZG1pbi1hbGx1c2Vycy1kZXRhaWxzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5uby1kYXRhIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIG1hcmdpbi1sZWZ0OiAtNjVweDtcclxuICB9XHJcblxyXG4gIC5uby1kYXRhIGltZyB7XHJcbiAgICB3aWR0aDogMTMwcHg7XHJcbiAgfVxyXG5cclxuICBpb24tY29udGVudCB7XHJcbiAgICAtLWJhY2tncm91bmQ6ICNGMkYyRjI7XHJcbiAgICAtLXBhZGRpbmctYm90dG9tOiA1MHB4O1xyXG4gIH1cclxuXHJcbiAgaW9uLWxpc3Qge1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIH1cclxuXHJcbiAgLmF1ZC1wcm9kdWN0cy1jb250YWluZXIge1xyXG4gICAgbWFyZ2luOiAwcHggMTBweCAxMHB4IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBwYWRkaW5nOiAxNXB4IDVweCAxMHB4IDJweDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB9XHJcblxyXG4gIC5hdWQtcHJvZHVjdC1pbWFnZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoJy4uLy4uLy4uL2Fzc2V0cy9pbWcvaW1nLXByZWxvYWRlci5wbmcnKSBjZW50ZXIgbm8tcmVwZWF0O1xyXG4gICAgd2lkdGg6IDg1cHg7XHJcbiAgICBoZWlnaHQ6IDg1cHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBsZWZ0OiAxNXB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2YwZjBmMDtcclxuICB9XHJcblxyXG4gIC5hdWQtbW9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgcmdiYSgwLCAwLCAwLCAuNSksIHRyYW5zcGFyZW50KTtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIGhlaWdodDogMjBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHdpZHRoOiA4NHB4O1xyXG4gICAgei1pbmRleDogMjtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICB9XHJcblxyXG4gIC5hdWQtcHJvZHVjdC1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gIH1cclxuXHJcbiAgLmF1ZC1wcm9kdWN0LXByaWNlIHtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgfVxyXG5cclxuICAuc3Bpbm5lciB7XHJcbiAgICBtYXJnaW4tdG9wOiA1MCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICAuYXVkLXBsYWNlZC1vbiB7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBvcGFjaXR5OiAuNztcclxuICAgIG1hcmdpbi1ib3R0b206IDMlO1xyXG4gIH1cclxuICAuYXVkLXBsYWNlZC1vbiBzcGFue1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICB9XHJcbiAgLmF1ZC1vcmRlci1pZCB7XHJcbiAgICBtYXJnaW46IDE1cHggMTBweCAxcHg7XHJcbiAgICBvcGFjaXR5OiAuODtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICB9XHJcblxyXG4gIC5hdWQtYWN0aW9uLWJ0biB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG4gIC5hdWQtdmlldy1kZXRhaWxzLWJ0biB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG4gIHNwYW4gLmZsYXRpY29uLW51bGwtMjA6OmJlZm9yZSB7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDJweDtcclxuICB9XHJcbiAgc3BhbiAuZmxhdGljb24tbnVsbC0xOTo6YmVmb3JlIHtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcclxuICAgIG1hcmdpbi1sZWZ0OiAycHg7XHJcbiAgfVxyXG5cclxuLmFkZHJlc3MtY2FyZHtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIG1hcmdpbjogNnB4IDEycHggMTJweCAxMnB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLnVzZXItbmFtZXtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG4uYWRkcmVzc3tcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxufVxyXG4ucGhvbmUtbm97XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAtNXB4O1xyXG59XHJcblxyXG5cclxuLnRyYW5zLXdyYXBwZXIge1xyXG4gIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgcGFkZGluZy1ib3R0b206IDUwcHg7XHJcbn1cclxuXHJcbi50cmFucy1jb25hdGluZXIge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIHBhZGRpbmc6IDE1cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLnRyYW5zLXR5cGUge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGZvbnQtc2l6ZTogc21hbGw7XHJcbn1cclxuXHJcbi5pbmxpbmUtYWxpZ24ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuLmlubGluZS1hbGlnbiBoNiB7XHJcbiAgZm9udC1zaXplOiAxNXB4O1xyXG59XHJcbi50cmFucy1tc2cge1xyXG4gIG1hcmdpbi10b3A6IDBweDtcclxufVxyXG5cclxuLnRyYW5zLWRhdGUge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBvcGFjaXR5OiAuNjtcclxufVxyXG5cclxuLmNhbmNlbC1idG4ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZGl2IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIH1cclxufVxyXG5cclxuLnNhdmUtYnRuIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcclxufVxyXG5cclxuLm1hcmdpbi1pY29uIHtcclxuICBtYXJnaW4tbGVmdDogNXB4O1xyXG59XHJcblxyXG5pb24tZm9vdGVyIGlvbi10aXRsZSB7XHJcbiAgaGVpZ2h0OiA0NXB4O1xyXG59XHJcblxyXG4uYm90dG9tLWJ1dHRvbnMge1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBtYXJnaW4tbGVmdDogNXB4O1xyXG59XHJcblxyXG4udXNlckluZm97XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIHdpZHRoOiAxMDB2dztcclxuICBoZWlnaHQ6IDE1dmg7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBvdXRsaW5lOiBub25lXHJcbn1cclxuXHJcbi5yZWFzb24ge1xyXG4gIEBleHRlbmQgLnRyYW5zLWRhdGU7XHJcbn1cclxuXHJcbmlucHV0IHtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgLy8gYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkO1xyXG4gIC8vIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBwYWRkaW5nOiA0cHg7XHJcbn1cclxuXHJcbi5zdGF0ZS1kaXZ7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW46IDBweCAxMHB4O1xyXG59XHJcbi5zdGF0ZS13cmFwcGVyIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBwYWRkaW5nOiA4cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLmFkZC1wb2ludHMtYnRue1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuLnRhYmxlQXJlYSB7XHJcbiAgbWFyZ2luLXRvcDogMXJlbTtcclxuICAvLyBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG5cclxuICB0YWJsZSB7XHJcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcblxyXG4gICAgdGQsXHJcbiAgICB0aCB7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGRkZGQ7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgcGFkZGluZzogOHB4O1xyXG4gICAgfVxyXG4gICAgdHI6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xyXG4gICAgfVxyXG4gIH1cclxuICAuaGVhZGVyIHtcclxuICAgIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcclxuICB9XHJcbiAgLmRlbGV0ZUljb24ge1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gIH1cclxufVxyXG4iLCIubm8tZGF0YSB7XG4gIG1hcmdpbjogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBsZWZ0OiA1MCU7XG4gIG1hcmdpbi1sZWZ0OiAtNjVweDtcbn1cblxuLm5vLWRhdGEgaW1nIHtcbiAgd2lkdGg6IDEzMHB4O1xufVxuXG5pb24tY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogI0YyRjJGMjtcbiAgLS1wYWRkaW5nLWJvdHRvbTogNTBweDtcbn1cblxuaW9uLWxpc3Qge1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5hdWQtcHJvZHVjdHMtY29udGFpbmVyIHtcbiAgbWFyZ2luOiAwcHggMTBweCAxMHB4IDEwcHg7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDE1cHggNXB4IDEwcHggMnB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5hdWQtcHJvZHVjdC1pbWFnZSB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcIi4uLy4uLy4uL2Fzc2V0cy9pbWcvaW1nLXByZWxvYWRlci5wbmdcIikgY2VudGVyIG5vLXJlcGVhdDtcbiAgd2lkdGg6IDg1cHg7XG4gIGhlaWdodDogODVweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAxNXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZjBmMGYwO1xufVxuXG4uYXVkLW1vcmUge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgcmdiYSgwLCAwLCAwLCAwLjUpLCB0cmFuc3BhcmVudCk7XG4gIGJvdHRvbTogMDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiA4NHB4O1xuICB6LWluZGV4OiAyO1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiA1cHg7XG59XG5cbi5hdWQtcHJvZHVjdC1uYW1lIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uYXVkLXByb2R1Y3QtcHJpY2Uge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBmb250LXNpemU6IDE4cHg7XG59XG5cbi5zcGlubmVyIHtcbiAgbWFyZ2luLXRvcDogNTAlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5hdWQtcGxhY2VkLW9uIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG9wYWNpdHk6IDAuNztcbiAgbWFyZ2luLWJvdHRvbTogMyU7XG59XG5cbi5hdWQtcGxhY2VkLW9uIHNwYW4ge1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uYXVkLW9yZGVyLWlkIHtcbiAgbWFyZ2luOiAxNXB4IDEwcHggMXB4O1xuICBvcGFjaXR5OiAwLjg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuLmF1ZC1hY3Rpb24tYnRuIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uYXVkLXZpZXctZGV0YWlscy1idG4ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbnNwYW4gLmZsYXRpY29uLW51bGwtMjA6OmJlZm9yZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gIG1hcmdpbi1sZWZ0OiAycHg7XG59XG5cbnNwYW4gLmZsYXRpY29uLW51bGwtMTk6OmJlZm9yZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbn1cblxuLmFkZHJlc3MtY2FyZCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBwYWRkaW5nOiAxMHB4O1xuICBtYXJnaW46IDZweCAxMnB4IDEycHggMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4udXNlci1uYW1lIHtcbiAgZm9udC1zaXplOiAxNXB4O1xufVxuXG4uYWRkcmVzcyB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuLnBob25lLW5vIHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBtYXJnaW4tYm90dG9tOiAtNXB4O1xufVxuXG4udHJhbnMtd3JhcHBlciB7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG4gIHBhZGRpbmctYm90dG9tOiA1MHB4O1xufVxuXG4udHJhbnMtY29uYXRpbmVyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiAxNXB4O1xuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLnRyYW5zLXR5cGUge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiBzbWFsbDtcbn1cblxuLmlubGluZS1hbGlnbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmlubGluZS1hbGlnbiBoNiB7XG4gIGZvbnQtc2l6ZTogMTVweDtcbn1cblxuLnRyYW5zLW1zZyB7XG4gIG1hcmdpbi10b3A6IDBweDtcbn1cblxuLnRyYW5zLWRhdGUsIC5yZWFzb24ge1xuICBmb250LXNpemU6IDEycHg7XG4gIG9wYWNpdHk6IDAuNjtcbn1cblxuLmNhbmNlbC1idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cbi5jYW5jZWwtYnRuIGRpdiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5zYXZlLWJ0biB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcbn1cblxuLm1hcmdpbi1pY29uIHtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cblxuaW9uLWZvb3RlciBpb24tdGl0bGUge1xuICBoZWlnaHQ6IDQ1cHg7XG59XG5cbi5ib3R0b20tYnV0dG9ucyB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cblxuLnVzZXJJbmZvIHtcbiAgYm9yZGVyOiBub25lO1xuICB3aWR0aDogMTAwdnc7XG4gIGhlaWdodDogMTV2aDtcbiAgcGFkZGluZzogMTBweDtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuaW5wdXQge1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogNHB4O1xufVxuXG4uc3RhdGUtZGl2IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luOiAwcHggMTBweDtcbn1cblxuLnN0YXRlLXdyYXBwZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDhweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uYWRkLXBvaW50cy1idG4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi50YWJsZUFyZWEge1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4udGFibGVBcmVhIHRhYmxlIHtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgd2lkdGg6IDEwMCU7XG59XG4udGFibGVBcmVhIHRhYmxlIHRkLFxuLnRhYmxlQXJlYSB0YWJsZSB0aCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGRkZGQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogOHB4O1xufVxuLnRhYmxlQXJlYSB0YWJsZSB0cjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7XG59XG4udGFibGVBcmVhIC5oZWFkZXIge1xuICBiYWNrZ3JvdW5kOiBsaWdodGdyYXk7XG59XG4udGFibGVBcmVhIC5kZWxldGVJY29uIHtcbiAgZm9udC1zaXplOiAxOHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/admin-allusers-details/admin-allusers-details.page.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/admin/admin-allusers-details/admin-allusers-details.page.ts ***!
  \*****************************************************************************/
/*! exports provided: AdminAllusersDetailsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminAllusersDetailsPage", function() { return AdminAllusersDetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var src_app_services_user_details_user_details_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/user-details/user-details.service */ "./src/app/services/user-details/user-details.service.ts");
/* harmony import */ var src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/user-groups/user-groups.service */ "./src/app/services/user-groups/user-groups.service.ts");
/* harmony import */ var src_app_states_modal_states_modal_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/states-modal/states-modal.page */ "./src/app/states-modal/states-modal.page.ts");
/* harmony import */ var _admin_home_view_order_view_order_page__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../admin-home/view-order/view-order.page */ "./src/app/admin/admin-home/view-order/view-order.page.ts");
/* harmony import */ var src_app_services_wallet_wallet_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/services/wallet/wallet.service */ "./src/app/services/wallet/wallet.service.ts");
/* harmony import */ var _add_points_add_points_page__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../add-points/add-points.page */ "./src/app/admin/add-points/add-points.page.ts");




//import { CallNumber } from '@ionic-native/call-number/ngx';










var AdminAllusersDetailsPage = /** @class */ (function () {
    function AdminAllusersDetailsPage(events, loadingController, alertController, toastController, router, route, labelService, configService, userService, userDetailService, userGroupsService, modalController, walletService
    //private callNumber: CallNumber
    ) {
        var _this = this;
        this.events = events;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.toastController = toastController;
        this.router = router;
        this.route = route;
        this.labelService = labelService;
        this.configService = configService;
        this.userService = userService;
        this.userDetailService = userDetailService;
        this.userGroupsService = userGroupsService;
        this.modalController = modalController;
        this.walletService = walletService;
        this.ordersLoader = true;
        this.addressLoader = true;
        this.walletLoader = true;
        this.orders = [];
        this.addresses = [];
        this.transactions = [];
        this.udata = {
            additionalInfo: ''
        };
        this.cashbackBalance = 0;
        this.noDeliveryAgents = false;
        this.allDeliveryAgents = [];
        this.selectAgentPh = '';
        this.ADMIN_ALLUSERS_DETAILS_LABELS = {};
        this.SHARED_LABELS = {};
        this.activeTabIndex = 0;
        this.appAllowFeature = false;
        this.allowAppAccess = false;
        this.cartItems = [];
        this.searchItems = [];
        this.currentTab = 'cart';
        this.showLimit = 3;
        this.showWarning = false;
        this.showEditAddress = [];
        this.showEditDetails = false;
        this.pointTransactions = [];
        this.route.queryParams.subscribe(function (params) {
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.uid = _this.router.getCurrentNavigation().extras.state.uid;
                _this.udata = _this.router.getCurrentNavigation().extras.state.udata;
                if (_this.udata && !_this.udata.hasOwnProperty('groups')) {
                    _this.udata.groups = [];
                }
                if (_this.udata && _this.udata.hasOwnProperty('accessByAdmin')) {
                    _this.allowAppAccess = _this.udata.accessByAdmin;
                }
                var index = _this.router.getCurrentNavigation().extras.state.activeTabIndex;
                _this.activeTabIndex = index ? index : 0;
            }
        });
    }
    AdminAllusersDetailsPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.initializeSubscriptions();
                        if (!this.uid) return [3 /*break*/, 2];
                        this.events.publish('user:getAllOrdersOfUser', this.uid);
                        this.events.publish('user-details:getUserAddresses', this.uid);
                        this.events.publish('wallet:getWalletTrans', this.uid);
                        this.events.publish('wallet:getUserWalletDetails', this.uid);
                        _a = this;
                        return [4 /*yield*/, this.walletService.getPointTransactions(this.uid)];
                    case 1:
                        _a.pointTransactions = _b.sent();
                        console.log('pointTransactions', this.pointTransactions);
                        _b.label = 2;
                    case 2:
                        this.events.publish('user:getAllDeliveryAgents');
                        this.orderIdPrefix = this.configService.environment.orderIdPrefix;
                        this.currencyCode = this.configService.environment.currencyCode;
                        this.appAllowFeature = this.configService.environment.appAccessOnApproval;
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersDetailsPage.prototype.getDateTimeFormat = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_4__(date).format('MMM D, YYYY hh:mm a');
    };
    AdminAllusersDetailsPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b, groups;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.SHARED_LABELS = this.labelService.labels['SHARED'];
                        this.ADMIN_ALLUSERS_DETAILS_LABELS = this.labelService.labels['ADMIN_ALLUSERS_DETAILS'];
                        this.selectAgentPh = this.ADMIN_ALLUSERS_DETAILS_LABELS['select_delivery_agent'];
                        _a = this;
                        return [4 /*yield*/, this.userDetailService.getCartItems(this.uid)];
                    case 1:
                        _a.cartItems = _c.sent();
                        if (!this.configService.environment.userAnalyticsLimit) return [3 /*break*/, 3];
                        _b = this;
                        return [4 /*yield*/, this.configService.environment.userAnalyticsLimit];
                    case 2:
                        _b.showLimit = _c.sent();
                        _c.label = 3;
                    case 3:
                        if (this.cartItems.length > this.showLimit) {
                            this.cartItems = this.cartItems.slice(0, this.showLimit);
                            this.showWarning = true;
                        }
                        return [4 /*yield*/, this.userGroupsService.getAllGroups()];
                    case 4:
                        groups = _c.sent();
                        if (groups) {
                            this.groups = groups;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersDetailsPage.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    AdminAllusersDetailsPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('user:publishAllOrdersOfUser', function (orders) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.orders = orders && orders.length ? orders : [];
            _this.ordersLoader = false;
        });
        this.events.subscribe('user:noOrderHistoryOfUser', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.ordersLoader = false;
            _this.orders = [];
        });
        this.events.subscribe('user-details:publishUserAddresses', function (addresses) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.addresses = addresses && addresses.length ? addresses : [];
            for (var i = 0; i < _this.addresses.length; i++) {
                _this.showEditAddress.push(false);
            }
            _this.addressLoader = false;
        });
        this.events.subscribe('wallet:addMoneyToSingleUserWalletSuccess', function (msg) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert(msg);
            _this.events.publish('wallet:getWalletTrans', _this.uid);
            _this.noMoreTxns = false;
        });
        this.events.subscribe('wallet:chargeUserSuccess', function (msg) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert(msg);
            _this.events.publish('wallet:getWalletTrans', _this.uid);
            _this.noMoreTxns = false;
        });
        this.events.subscribe('wallet:publishUserWalletDetails', function (data) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            if (data) {
                _this.balance = data.wallet ? data.wallet.balance : 0;
                _this.cashbackBalance = data.wallet && data.wallet.cashback ? data.wallet.cashback : 0;
            }
        });
        this.events.subscribe('wallet:publishWalletTrans', function (transactions) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.transactions = transactions && transactions.length ? transactions : [];
            _this.walletLoader = false;
        });
        this.events.subscribe('wallet:noMoreWalletTrans', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noMoreTxns = true;
        });
        this.events.subscribe('user:noDeliveryAgents', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noDeliveryAgents = true;
        });
        this.events.subscribe('user:publishAllDeliveryAgents', function (agents) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.allDeliveryAgents = agents;
            _this.noDeliveryAgents = false;
        });
        this.events.subscribe('user:setDefaultDeliveryAgentToUserSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('Delivery agent assigned');
        });
        this.events.subscribe('user:setAdditionalInfoSuccess', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.presentAlert('Information set successfully');
        });
    };
    AdminAllusersDetailsPage.prototype.onClickViewDetails = function (id) {
        this.modalController.create({
            component: _admin_home_view_order_view_order_page__WEBPACK_IMPORTED_MODULE_11__["ViewOrderPage"],
            cssClass: 'view-order-css',
            componentProps: {
                orderId: id
            }
        }).then(function (modal) { return modal.present(); });
    };
    AdminAllusersDetailsPage.prototype.onClickTrackOrder = function (agentId, deliveryLatLng) {
        var navigationExtras = {
            state: {
                agentId: agentId,
                deliveryLatLng: deliveryLatLng
            }
        };
        this.router.navigate(['location-map'], navigationExtras);
    };
    AdminAllusersDetailsPage.prototype.callUser = function () {
        /* this.callNumber.callNumber(this.udata.phoneNo, true)
         .then(res => console.log('Launched dialer!', res))
         .catch(err => console.log('Error launching dialer', err));*/
    };
    AdminAllusersDetailsPage.prototype.onChangeDeliveryAgent = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var selectedDeliveryAgentId;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selectedDeliveryAgentId = event.target.value;
                        return [4 /*yield*/, this.presentLoading(this.SHARED_LABELS['please_wait'])];
                    case 1:
                        _a.sent();
                        this.events.publish('user:setDefaultDeliveryAgentToUser', selectedDeliveryAgentId, this.uid);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersDetailsPage.prototype.onSetupDeliveryAgent = function () {
        this.router.navigate(['tabs/tabs/admin-allusers']);
    };
    AdminAllusersDetailsPage.prototype.dateConvert = function (timestamp) {
        return new Date(timestamp);
    };
    AdminAllusersDetailsPage.prototype.getMoneyAddType = function (status) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            subHeader: status == 'addMoney' ? 'Add money in' : 'Charge user',
                            inputs: [
                                {
                                    type: 'radio',
                                    label: 'Wallet',
                                    value: 'wallet',
                                    checked: true
                                },
                                {
                                    type: 'radio',
                                    label: 'Cashback',
                                    value: 'cashback',
                                    checked: false
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Select',
                                    handler: function (type) {
                                        alert.dismiss();
                                        if (status == "addMoney") {
                                            _this.addMoneyAlert(type);
                                        }
                                        else {
                                            _this.chargeUserAlert(type);
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
    AdminAllusersDetailsPage.prototype.addMoneyAlert = function (type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            subHeader: 'Add money',
                            inputs: [
                                {
                                    name: 'amount',
                                    type: 'number',
                                    placeholder: 'Enter amount'
                                },
                                {
                                    name: 'msg',
                                    type: 'text',
                                    placeholder: 'Enter message'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Add',
                                    handler: function (data) {
                                        // console.log("amount", data, this.uid, type);
                                        if (!parseInt(data.amount)) {
                                            _this.presentToast('Please enter valid amount');
                                        }
                                        else {
                                            _this.scrollToTop();
                                            _this.addMoneyToSingleUserWallet(data, type);
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
    AdminAllusersDetailsPage.prototype.addMoneyToSingleUserWallet = function (data, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading('Adding money...')];
                    case 1:
                        _a.sent();
                        this.events.publish('wallet:addMoneyToSingleUserWallet', data, this.uid, type);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersDetailsPage.prototype.chargeUserAlert = function (moneyType) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (moneyType == "wallet") {
                            if (!this.balance) {
                                this.presentAlert('Not enough wallet balance!');
                                return [2 /*return*/];
                            }
                        }
                        else {
                            if (!this.cashbackBalance) {
                                this.presentAlert('Not enough cashback balance!');
                                return [2 /*return*/];
                            }
                        }
                        return [4 /*yield*/, this.alertController.create({
                                subHeader: 'Charge User',
                                inputs: [
                                    {
                                        name: 'amount',
                                        type: 'number',
                                        placeholder: 'Enter amount'
                                    },
                                    {
                                        name: 'msg',
                                        type: 'text',
                                        placeholder: 'Enter message'
                                    }
                                ],
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function () {
                                            console.log('Confirm Cancel');
                                        }
                                    }, {
                                        text: 'Charge',
                                        handler: function (charge) {
                                            if (!parseInt(charge.amount)) {
                                                _this.presentToast('Please enter valid amount');
                                            }
                                            else if (!charge.msg) {
                                                _this.presentToast('Please enter message');
                                            }
                                            else {
                                                if (moneyType == "wallet") {
                                                    if (_this.balance < parseInt(charge.amount)) {
                                                        _this.presentToast('Not enough wallet balance!');
                                                        return;
                                                    }
                                                }
                                                else {
                                                    if (_this.cashbackBalance < parseInt(charge.amount)) {
                                                        _this.presentToast('Not enough cashback balance!');
                                                        return;
                                                    }
                                                }
                                                _this.chargeUser(charge, moneyType);
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
    AdminAllusersDetailsPage.prototype.chargeUser = function (charge, moneyType) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading('Charging user...')];
                    case 1:
                        _a.sent();
                        this.events.publish('wallet:chargeUser', charge, this.uid, moneyType);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersDetailsPage.prototype.loadMoreTxns = function (event) {
        console.log('loading more txns...');
        this.events.publish('wallet:getMoreWalletTrans', this.uid);
        setTimeout(function () {
            event.target.complete();
        }, 1000);
        if (this.noMoreTxns === true) {
            event.target.disabled = true;
        }
    };
    AdminAllusersDetailsPage.prototype.scrollToTop = function () {
        this.content.scrollToTop(500);
    };
    AdminAllusersDetailsPage.prototype.presentAlert = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: ['OK']
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
    AdminAllusersDetailsPage.prototype.presentLoading = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: msg
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
    AdminAllusersDetailsPage.prototype.presentToast = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: msg,
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersDetailsPage.prototype.saveAdditonalInfo = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading("Please wait, saving information")];
                    case 1:
                        _a.sent();
                        this.events.publish('user:setAdditionalInfo', this.uid, this.udata.additionalInfo, this.allowAppAccess, this.udata.groups);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersDetailsPage.prototype.appAccessToggle = function () {
        this.allowAppAccess = !this.allowAppAccess;
    };
    AdminAllusersDetailsPage.prototype.removeAgent = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var removeResult;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading('Please wait...')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userService.removeDefaultAgent(this.uid)];
                    case 2:
                        removeResult = _a.sent();
                        if (removeResult) {
                            this.presentAlert('Default delivery agent removed');
                        }
                        this.loading.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersDetailsPage.prototype.getCartItems = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.showWarning = false;
                        _a = this;
                        return [4 /*yield*/, this.userDetailService.getCartItems(this.uid)];
                    case 1:
                        _a.searchItems = _b.sent();
                        this.currentTab = 'cart';
                        if (this.cartItems.length > this.showLimit) {
                            this.cartItems = this.cartItems.slice(0, this.showLimit);
                            this.showWarning = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersDetailsPage.prototype.getSearches = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.showWarning = false;
                        _a = this;
                        return [4 /*yield*/, this.userDetailService.getSearchItems(this.uid)];
                    case 1:
                        _a.searchItems = _b.sent();
                        this.currentTab = 'search';
                        if (this.searchItems.length > this.showLimit) {
                            this.searchItems = this.searchItems.slice(0, this.showLimit);
                            this.showWarning = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersDetailsPage.prototype.saveUserData = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var i, updateResult;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.udata.name) return [3 /*break*/, 1];
                        this.presentAlert('Please fill user name!');
                        return [3 /*break*/, 3];
                    case 1:
                        this.udata.lowercaseName = this.udata.name.toLowerCase();
                        for (i = 0; i < this.addresses.length; i++) {
                            if (this.addresses[i].defaultAddress == true)
                                this.udata.defaultAddress = this.addresses[i];
                        }
                        return [4 /*yield*/, this.userDetailService.saveUserDetails(this.uid, this.udata, this.addresses)];
                    case 2:
                        updateResult = _a.sent();
                        if (updateResult) {
                            this.presentAlert('Details Updated Successfully!');
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersDetailsPage.prototype.openStateModal = function (index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: src_app_states_modal_states_modal_page__WEBPACK_IMPORTED_MODULE_10__["StatesModalPage"],
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (res) {
                            console.log('data from modal', res);
                            if (res.data) {
                                console.log(res.data);
                                _this.addresses[index].state = res.data.state;
                                _this.addresses[index].stateCode = res.data.code;
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
    AdminAllusersDetailsPage.prototype.getTotalAmount = function (product) {
        return {
            totalAmount: product.quantity * product.price,
        };
    };
    AdminAllusersDetailsPage.prototype.addPointsAlert = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _add_points_add_points_page__WEBPACK_IMPORTED_MODULE_13__["AddPointsPage"],
                            cssClass: 'add-point-css',
                            componentProps: {
                                uid: this.uid
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            var _a;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!res.data) return [3 /*break*/, 2];
                                        _a = this;
                                        return [4 /*yield*/, this.walletService.getPointTransactions(this.uid)];
                                    case 1:
                                        _a.pointTransactions = _b.sent();
                                        _b.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAllusersDetailsPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('user:publishAllOrdersOfUser');
        this.events.unsubscribe('user:noOrderHistoryOfUser');
        this.events.unsubscribe('user-details:publishUserAddresses');
        this.events.unsubscribe('wallet:addMoneyToSingleUserWalletSuccess');
        this.events.unsubscribe('wallet:chargeUserSuccess');
        this.events.unsubscribe('wallet:publishUserWalletDetails');
        this.events.unsubscribe('wallet:publishWalletTrans');
        this.events.unsubscribe('wallet:noMoreWalletTrans');
        this.events.unsubscribe('user:noDeliveryAgents');
        this.events.unsubscribe('user:publishAllDeliveryAgents');
        this.events.unsubscribe('user:setDefaultDeliveryAgentToUserSuccess');
        this.events.unsubscribe('user:setAdditionalInfoSuccess');
    };
    AdminAllusersDetailsPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_5__["LabelService"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"] },
        { type: src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"] },
        { type: src_app_services_user_details_user_details_service__WEBPACK_IMPORTED_MODULE_8__["UserDetailsService"] },
        { type: src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_9__["UserGroupsService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: src_app_services_wallet_wallet_service__WEBPACK_IMPORTED_MODULE_12__["WalletService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
    ], AdminAllusersDetailsPage.prototype, "content", void 0);
    AdminAllusersDetailsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-admin-allusers-details',
            template: __webpack_require__(/*! raw-loader!./admin-allusers-details.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-allusers-details/admin-allusers-details.page.html"),
            styles: [__webpack_require__(/*! ./admin-allusers-details.page.scss */ "./src/app/admin/admin-allusers-details/admin-allusers-details.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_5__["LabelService"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"],
            src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"],
            src_app_services_user_details_user_details_service__WEBPACK_IMPORTED_MODULE_8__["UserDetailsService"],
            src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_9__["UserGroupsService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            src_app_services_wallet_wallet_service__WEBPACK_IMPORTED_MODULE_12__["WalletService"]
            //private callNumber: CallNumber
        ])
    ], AdminAllusersDetailsPage);
    return AdminAllusersDetailsPage;
}());



/***/ }),

/***/ "./src/app/pipes/application-pipes.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pipes/application-pipes.module.ts ***!
  \***************************************************/
/*! exports provided: ApplicationPipesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationPipesModule", function() { return ApplicationPipesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _date_ago_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./date-ago.pipe */ "./src/app/pipes/date-ago.pipe.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _safe_item_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./safe-item.pipe */ "./src/app/pipes/safe-item.pipe.ts");




var ApplicationPipesModule = /** @class */ (function () {
    function ApplicationPipesModule() {
    }
    ApplicationPipesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [],
            declarations: [
                _date_ago_pipe__WEBPACK_IMPORTED_MODULE_1__["DateAgoPipe"],
                _safe_item_pipe__WEBPACK_IMPORTED_MODULE_3__["SafeItemPipe"]
            ],
            exports: [
                _date_ago_pipe__WEBPACK_IMPORTED_MODULE_1__["DateAgoPipe"],
                _safe_item_pipe__WEBPACK_IMPORTED_MODULE_3__["SafeItemPipe"]
            ]
        })
    ], ApplicationPipesModule);
    return ApplicationPipesModule;
}());



/***/ }),

/***/ "./src/app/pipes/date-ago.pipe.ts":
/*!****************************************!*\
  !*** ./src/app/pipes/date-ago.pipe.ts ***!
  \****************************************/
/*! exports provided: DateAgoPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateAgoPipe", function() { return DateAgoPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var DateAgoPipe = /** @class */ (function () {
    function DateAgoPipe() {
    }
    DateAgoPipe.prototype.transform = function (value, args) {
        if (value) {
            var seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
            if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
                return 'Just now';
            var intervals = {
                'year': 31536000,
                'month': 2592000,
                'week': 604800,
                'day': 86400,
                'hour': 3600,
                'minute': 60,
                'second': 1
            };
            var counter = void 0;
            for (var i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0)
                    if (counter === 1) {
                        return counter + ' ' + i + ' ago'; // singular (1 day ago)
                    }
                    else {
                        return counter + ' ' + i + 's ago'; // plural (2 days ago)
                    }
            }
        }
        return value;
    };
    DateAgoPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'dateAgo',
            pure: true
        })
    ], DateAgoPipe);
    return DateAgoPipe;
}());



/***/ }),

/***/ "./src/app/pipes/safe-item.pipe.ts":
/*!*****************************************!*\
  !*** ./src/app/pipes/safe-item.pipe.ts ***!
  \*****************************************/
/*! exports provided: SafeItemPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafeItemPipe", function() { return SafeItemPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");



var SafeItemPipe = /** @class */ (function () {
    function SafeItemPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeItemPipe.prototype.transform = function (value, type) {
        if (!value)
            return value;
        switch (type) {
            case 'html':
                return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style':
                return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script':
                return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url':
                return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                throw new Error("Invalid safe type specified: " + type);
        }
    };
    SafeItemPipe.ctorParameters = function () { return [
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] }
    ]; };
    SafeItemPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'safeItem'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])
    ], SafeItemPipe);
    return SafeItemPipe;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-allusers-details-admin-allusers-details-module-es5.js.map