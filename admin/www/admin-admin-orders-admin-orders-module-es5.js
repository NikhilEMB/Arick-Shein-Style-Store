(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-orders-admin-orders-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-orders/admin-orders.page.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-orders/admin-orders.page.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"solid\" color=\"secondary\">\r\n      <span class=\"icon\" slot=\"start\">\r\n        <i class=\"flaticon-null\" slot=\"start\"></i>\r\n        <span class=\"count\">5</span>\r\n      </span>\r\n    </ion-button>\r\n    <ion-button fill=\"solid\" color=\"secondary\">\r\n      <span class=\"icon\" slot=\"start\">\r\n        <i class=\"flaticon-shopping-bag\" slot=\"start\"></i>\r\n        <span class=\"count\">2</span>\r\n      </span>\r\n    </ion-button>\r\n  </div>\r\n  <div class=\"header-cart-btn\">\r\n    <!-- <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"exportOrders(currentOrders,ordersList)\">\r\n      Export All {{ordersText}}\r\n    </ion-button> -->\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"exportProducts()\"\r\n      *ngIf=\"exportType == 'products'\">\r\n      Export Products for Delivery\r\n    </ion-button>\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"createOrder()\">\r\n      Create Order\r\n    </ion-button>\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"goToArchivedOrders()\">\r\n      Archived Orders\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-no-padding\">\r\n  <div class=\"main-container\" style=\"width: 100%\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=2 id=\"scroll1\">\r\n          <div class=\"footerBtn\" style=\"margin-top: -12px;\">\r\n            <ion-button (click)='checkProductToDeliver()'>\r\n              Check products to deliver\r\n            </ion-button>\r\n          </div>\r\n          <!-- <div class=\"footerBtn\" style=\"margin-top: -12px;\">\r\n            <ion-button (click)='openFilterModal()'>\r\n              Select More Filters\r\n            </ion-button>\r\n           <ng-container *ngIf=\"filters\">\r\n            <p *ngFor=\"let filter of filters | keyvalue\">\r\n              <b *ngIf=\"filter?.value?.length>0\">Applied Filter: {{filter.key | titlecase}}</b>\r\n            </p>\r\n           </ng-container>\r\n          </div> -->\r\n          <br>\r\n          <p class=\"rowHeading\">Select Filter</p>\r\n          <!-- <ion-select placeholder=\"Select filter\">\r\n            <ion-select-option value=\"last7Days\">Last 7 days</ion-select-option>\r\n            <ion-select-option value=\"last30Days\">Last 30 days</ion-select-option>\r\n            <ion-select-option value=\"lastXDays\"></ion-select-option>\r\n          </ion-select> -->\r\n          <div>\r\n            <select id=\"days\" style=\"width: 100%;padding: 5px;\" (change)=\"selectDate($event.target.value)\">\r\n              <option value=7 selected>Last 7 days</option>\r\n              <option value=30>Last 30 days</option>\r\n            </select>\r\n            <div style=\"width: 100%;text-align: center;font-weight: bold;margin: 5px;\">\r\n              OR\r\n            </div>\r\n            <div style=\"display: flex;align-items: center;justify-content: space-between;\">\r\n              <strong style=\"font-size: medium;\">From:</strong>&nbsp;<input type=\"date\" [(ngModel)]='startDate'\r\n                style=\"width: 80%;\">\r\n            </div>\r\n            <div style=\"display: flex;align-items: center;justify-content: space-between;\">\r\n              <strong style=\"font-size: medium;\">To:</strong>&nbsp;<input type=\"date\" [(ngModel)]='endDate'\r\n                style=\"margin-top: 8px;width: 80%;\">\r\n            </div>\r\n          </div>\r\n          <br>\r\n          <div class=\"footerBtn\">\r\n            <ion-button (click)='filterOrder()' style=\"margin: 0px;\">\r\n              Filter Orders\r\n            </ion-button>&nbsp;&nbsp;\r\n            <ion-button (click)='clearFilter()' style=\"margin: 8px;\">\r\n              Clear Dates\r\n            </ion-button>\r\n          </div>\r\n          <br>\r\n          <ion-segment (ionChange)=\"activeLabels()\" value=\"status\" style=\"margin-top: -12px;\">\r\n            <ion-segment-button value=\"status\">\r\n              <ion-label style=\"font-size: small;\">Order Status</ion-label>\r\n            </ion-segment-button>\r\n            <ion-segment-button>\r\n              <ion-label style=\"font-size: small;\">Labels</ion-label>\r\n            </ion-segment-button>\r\n          </ion-segment>\r\n          <div class=\"statusList\" *ngIf='!showLabels'>\r\n            <p id=\"status1\" (click)=\"getPaymentFailedOrders()\"\r\n              [ngClass]=\"currentOrders == 'Pending Orders' ? 'tile-bg-active' : 'tile-bg-inactive'\">Incomplete / Pending</p>\r\n            <p id=\"status2\" (click)=\"getPendingOrders()\"\r\n              [ngClass]=\"currentOrders == 'pending' ? 'tile-bg-active' : 'tile-bg-inactive'\">Confirmed</p>\r\n            <p id=\"status3\" (click)=\"getDispatchedOrders()\"\r\n              [ngClass]=\"currentOrders == 'dispatched' ? 'tile-bg-active' : 'tile-bg-inactive'\">Dispatched</p>\r\n            <p id=\"status4\" (click)=\"getCompletedOrders()\"\r\n              [ngClass]=\"currentOrders == 'completed' ? 'tile-bg-active' : 'tile-bg-inactive'\">Delivered</p>\r\n            <p id=\"status5\" (click)=\"getCancelledOrders()\"\r\n              [ngClass]=\"currentOrders == 'cancelled' ? 'tile-bg-active' : 'tile-bg-inactive'\">Cancelled</p>\r\n            <p id=\"status8\" (click)=\"getRejectedOrders()\"\r\n              [ngClass]=\"currentOrders == 'rejected' ? 'tile-bg-active' : 'tile-bg-inactive'\">Rejected</p>\r\n            <p id=\"status6\" (click)=\"getReturnedOrders()\"\r\n              [ngClass]=\"currentOrders == 'returned' ? 'tile-bg-active' : 'tile-bg-inactive'\">Returned</p>\r\n            <p id=\"status7\" (click)=\"getPaymentPendingOrders()\"\r\n              [ngClass]=\"currentOrders == 'paymentPending' ? 'tile-bg-active' : 'tile-bg-inactive'\">Payment Pending</p>\r\n          </div>\r\n          <div class=\"statusList\" *ngIf='showLabels'>\r\n            <div *ngIf='labels && labels.length > 0' style=\"margin-top: 8px;margin-bottom: 8px;\">\r\n              <div style=\"display: flex;align-items: center;\" *ngFor='let label of labels; let i=index'>\r\n                <p [id]=\"'labelStatus' + i\" (click)='getOrderWithLables(label,i)' style=\"width: 100%;\">{{label}}</p>\r\n                <i class=\"flaticon-null-19 remove-icon\" (click)=\"deleteLabel(i)\"></i>\r\n              </div>\r\n            </div>\r\n            <div style=\"text-align: center; margin: 0% auto; display: flex;justify-content: center;\">\r\n              <input [(ngModel)]='newLabelName' placeholder=\"Enter Label Name\" style=\"width: 120px;\" />&nbsp;&nbsp;\r\n              <ion-button (click)=\"addLabel()\" class=\"btn-sml i-start m-s-btn\" fill=\"outline\" shape=\"round\"\r\n                size='small'>\r\n                Add Label</ion-button>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=4>\r\n          <div\r\n            style=\"height: 3vh;text-align: center;width: 100%;font-weight: bold;font-size: medium;display: flex;align-items: center;\">\r\n            <ion-input type='number' placeholder=\"Enter Order Id\"\r\n              style=\"--padding-top: 0px;--padding-bottom: 0px;border: 1px solid lightgray;margin-left: 8px;\"\r\n              [(ngModel)]='searchOrder' (keyup.enter)='searchOrderById()'></ion-input>&nbsp;\r\n            <ion-button size=\"small\" (click)='searchOrderById()'>Search</ion-button>&nbsp;\r\n            <ion-button size=\"small\" (click)='resetSearch()'>Show All</ion-button>\r\n          </div>\r\n\r\n          <!-- <div class=\"searchBar\">\r\n            <ion-searchbar [(ngModel)]='searchOrder' animated mode=\"ios\" placeholder=\"Search orders, users, products...\"></ion-searchbar>\r\n            <div class=\"btnArea\">\r\n              <ion-button (click)='typeSenseSearchQuery()' size=\"small\" shape=\"round\">Search</ion-button>\r\n              <ion-button (click)='resetSearch()' size=\"small\" shape=\"round\" fill=\"outline\">Reset</ion-button>\r\n            </div>\r\n          </div> -->\r\n\r\n          <div style=\"height: 3vh;width: 100%;text-align: center;margin-top: 5px;\"><strong>Orders for\r\n              {{currentFilter}}</strong></div>\r\n          <div *ngIf='ordersList && ordersList.length == 0'\r\n            style=\"text-align: center;width: 100%;font-size: large;font-weight: bold;\">\r\n            <br>No Orders\r\n          </div>\r\n          <div id=\"scroll2\" *ngIf='ordersList && ordersList.length > 0'>\r\n            <div style=\"text-align: center;\" *ngFor='let order of ordersList; let i=index'>\r\n              <ion-grid (click)='onClickViewDetails(order.orderId)' class='orderGrid'\r\n                *ngIf=\"( currentOrders != 'paymentPending' || (currentOrders == 'paymentPending' && (order.status != 'Cancelled' && order.status != 'Returned')) ) && ((order.subStatus && order.subStatus.isArchive == false) || !order.subStatus)\">\r\n                <ion-row>\r\n                  <ion-col>\r\n                    <p style=\"margin-bottom: 5px; color: var(--ion-color-primary);\">\r\n                      <strong style=\"font-size: 19px;\" *ngIf=\"order.orderType == 'quotation'\">Quotation Order</strong>\r\n                    </p>\r\n                    <p style=\"color: gray;margin-bottom: 5px;\">{{getDateTimeFormat(order.createdAt.toDate())}}</p>\r\n                  </ion-col>\r\n                </ion-row>\r\n                <ion-row>\r\n                  <ion-col style=\"text-align: left;margin-left: 15px;\">\r\n                    <strong>User</strong> : {{order.userName}}\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    <strong>Id</strong> : <strong>{{order.orderId}}</strong>\r\n                  </ion-col>\r\n                </ion-row>\r\n                <ion-row>\r\n                  <ion-col style=\"text-align: left;margin-left: 15px\" *ngIf=\"order.orderType !== 'quotation' && order.totalAmountToPaid != undefined\">\r\n                    <strong>Amount</strong> : {{order.totalAmountToPaid.toFixed(2)}}\r\n                  </ion-col>\r\n                  <ion-col>\r\n                    <strong>Status</strong> : {{order.status}}\r\n                  </ion-col>\r\n                </ion-row>\r\n                <ion-row style=\"display: flex;justify-content: center;\">\r\n                  <ion-button (click)=\"goToManageShipment(order.orderId, order)\" class=\"btn-sml i-start m-s-btn\"\r\n                    fill=\"outline\" shape=\"round\"\r\n                    *ngIf=\"!isSubOrMembershipOrder(order) && (order.status == 'Pending' || order.status == 'Confirmed' )\">\r\n                    Manage Shipment\r\n                  </ion-button>&nbsp;&nbsp;&nbsp;\r\n                  <ion-button (click)=\"archiveOrder(order.id,i)\" class=\"btn-sml i-start m-s-btn\" fill=\"outline\"\r\n                    *ngIf=\"((order.subStatus && order.subStatus.isArchive == false) || !order.subStatus)  && !showLabels\"\r\n                    shape=\"round\">\r\n                    Archive Order\r\n                  </ion-button>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n            <br>\r\n            <div style=\"text-align: center;\">\r\n              <ion-button (click)='loadMoreOrders()' *ngIf='!noMoreOrders && showLoadMoreBtn && !showLabels' shape=\"round\">\r\n                Load More Orders\r\n              </ion-button>\r\n              <ion-button *ngIf='noMoreOrders' disabled shape=\"round\">\r\n                No More Orders\r\n              </ion-button>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=6>\r\n          <div *ngIf=\"orderId == '' \" style=\"text-align: center;width: 100%;font-size: large;font-weight: bold;\">No\r\n            Order Selected</div>\r\n          <div style=\"height: 4vh;display: flex; align-items: center; justify-content: space-evenly;\"\r\n            *ngIf=\"orderId != '' \">\r\n            <h3 style=\"width: 32%;\">Order Id : {{orderId}} ({{orderData[0].status}})</h3>\r\n            <div *ngIf=\"!showLoader && orderData[0].status === 'Pending'\">\r\n              <ion-button (click)=\"onClickRejectOrder()\" color=\"danger\">\r\n                <i class=\"flaticon-null-19\"></i>&nbsp;\r\n                Reject\r\n              </ion-button>&nbsp;\r\n              <ion-button (click)=\"onClickConfirmOrder()\" color=\"success\">\r\n                <i class=\"flaticon-null-20\"></i>&nbsp;\r\n                Confirm\r\n              </ion-button>\r\n            </div>\r\n\r\n            <div *ngIf=\"!showLoader && orderData[0].status === 'Confirmed'\">\r\n              <ion-button (click)=\"onClickCancelOrder()\" color=\"danger\">\r\n                <i class=\"flaticon-null-19\"></i>&nbsp;\r\n                Cancel\r\n              </ion-button>&nbsp;\r\n              <ion-button (click)=\"onClickDispatchOrder()\" color=\"success\">\r\n                <i class=\"flaticon-null-20\"></i>&nbsp;\r\n                Dispatch\r\n              </ion-button>\r\n            </div>\r\n\r\n            <div *ngIf=\"!showLoader && orderData[0].status === 'Dispatched'\"\r\n              style=\"display: flex;align-items: center;margin-bottom: 14px;\">\r\n              <ion-button (click)=\"onClickCancelOrder()\" color=\"danger\" size=\"small\">\r\n                <i class=\"flaticon-null-19\"></i>&nbsp;\r\n                Cancel\r\n              </ion-button>&nbsp;\r\n              <ion-button (click)=\"onClickDeliverOrder()\" color=\"success\" size=\"small\">\r\n                <i class=\"flaticon-null-20\"></i>&nbsp;\r\n                Delivered\r\n              </ion-button>&nbsp;\r\n              <ion-button (click)=\"refundAmountConfirm()\" color=\"success\" size=\"small\">\r\n                <i class=\"flaticon-null-20\"></i>&nbsp;\r\n                Returned\r\n              </ion-button>&nbsp;\r\n            </div>\r\n\r\n            <div *ngIf=\"!showLoader && orderData[0].status === 'Delivered'\">\r\n              <ion-button (click)=\"refundAmountConfirm()\" color=\"success\">\r\n                <i class=\"flaticon-null-20\"></i>&nbsp;\r\n                Returned\r\n              </ion-button>\r\n            </div>\r\n\r\n            <div>\r\n              <ion-button (click)=\"showHistory = !showHistory\" color=\"secondary\" *ngIf='!showHistory'>\r\n                View Order History\r\n              </ion-button>&nbsp;\r\n              <ion-button (click)=\"showHistory = !showHistory\" color=\"secondary\" *ngIf='showHistory'>\r\n                View Order Details\r\n              </ion-button>\r\n            </div>\r\n          </div>\r\n          <!-- order tracking -->\r\n          <div class=\"order-wrapper\" *ngIf=\"orderData[0].hasOwnProperty('timeline') == false && showHistory\"\r\n            id=\"scroll3\">\r\n            <p style=\"text-align: center;font-size: large;margin-top: 20vh;font-weight: bold;\">Sorry, No history for\r\n              this order!</p>\r\n          </div>\r\n          <div class=\"order-wrapper\" *ngIf=\"orderData[0].hasOwnProperty('timeline') && showHistory\" id=\"scroll3\">\r\n            <br>\r\n            <ion-card>\r\n              <ion-card-header>\r\n                <ion-card-title style=\"text-align: center;font-weight: bold;\">Order Tracking</ion-card-title>\r\n              </ion-card-header>\r\n\r\n              <ion-card-content style=\"padding-left: 35px;\">\r\n                <div class=\"status-progress-container\">\r\n                  <ul class=\"status-progress\">\r\n                    <li class=\"status-progress-item\" *ngFor=\"let status of allOrderStatuses\"\r\n                      [ngClass]=\"{'status-missing': !isStatusTimelinePresent(status), 'status-cancelled': isStatusCancelled(status), 'hide-status': hideStatuses(status), 'last-status': isLastStatus(status)}\">\r\n                      <p class=\"status-progress-title\">{{status === 'Pending' ? 'Placed' : status}}</p>\r\n                      <p class=\"status-progress-info\" *ngIf=\"isStatusTimelinePresent(status)\">\r\n                        {{orderData[0].timeline[status].time.toDate() | date: 'medium'}}</p>\r\n                    </li>\r\n                  </ul>\r\n                </div>\r\n              </ion-card-content>\r\n            </ion-card>\r\n\r\n            <ion-card *ngIf='logData && logData.length > 0'>\r\n              <ion-card-header>\r\n                <ion-card-title style=\"text-align: center;font-weight: bold;\">Order Logs</ion-card-title>\r\n              </ion-card-header>\r\n\r\n              <ion-card-content style=\"padding-left: 35px;\">\r\n                <div *ngFor=\"let logs of logData\">\r\n                  <div style=\"display: flex;margin-top: 10px;\">\r\n                    <p style=\"font-weight: bold;font-size: medium;\">{{logs.text}} :</p>&nbsp;&nbsp;<p\r\n                      style=\"font-size: medium;\">{{getDateTimeFormat(logs.time.toDate())}}</p>\r\n                  </div>\r\n                </div>\r\n              </ion-card-content>\r\n            </ion-card>\r\n          </div>\r\n          <br>\r\n          <!-- order tracking -->\r\n          <div class=\"order-wrapper\" *ngIf=\"orderId != '' && !showHistory\" id=\"scroll3\">\r\n            <div class=\"order-details\">\r\n              <ion-grid>\r\n                <ion-row>\r\n                  <ion-col>\r\n                    <p *ngIf=\"orderData[0].metaData?.orderBy && orderData[0].metaData?.orderBy?.role\"><b>Created By: </b>{{orderData[0].metaData.orderBy.role | titlecase }} - {{orderData[0].metaData.orderBy.name}}</p>\r\n                  </ion-col>\r\n                </ion-row>\r\n                <ion-row>\r\n                  <ion-col size=\"12\" size-md=\"4\" style=\"border-right: 1px solid lightgray;\">\r\n                    <div class=\"address-wrap\">\r\n                      <p><strong>Delivery Address</strong></p>\r\n                      <hr class=\"line\">\r\n                      <p> <strong>{{orderData[0].address.name}}</strong><br>\r\n                        {{orderData[0].address.address}}<br>\r\n                        {{orderData[0].address.city}}<br>\r\n                        {{orderData[0].address.state}}<br>\r\n                        {{orderData[0].address.pincode}}\r\n                      </p>\r\n                      <br>\r\n                      <p\r\n                        *ngIf=\"orderData[0].metaData && orderData[0].metaData.source && orderData[0].metaData.source == 'browser' \">\r\n                        <strong>Order From</strong> - Website\r\n                      </p>\r\n                      <p\r\n                        *ngIf=\"orderData[0].metaData &&  orderData[0].metaData.source && orderData[0].metaData.source == 'android' \">\r\n                        <strong>Order From</strong> - Android\r\n                      </p>\r\n                      <p\r\n                        *ngIf=\"orderData[0].metaData &&  orderData[0].metaData.source && orderData[0].metaData.source == 'ios' \">\r\n                        <strong>Order From</strong> - Apple\r\n                      </p>\r\n                      <ng-container *ngIf=\"orderData[0]?.metaData?.source === 'whatsapp'\">\r\n                        <p><strong>Order From</strong> - WhatsApp</p>\r\n                      </ng-container>\r\n                      <p *ngIf='orderData[0].metaData &&  !orderData[0].metaData.source'><strong>Order From</strong> -\r\n                        Not Available</p>\r\n                      <br>\r\n                      <p><strong>Phone Number</strong> - {{orderData[0].address.phoneNo}}</p>\r\n                      <a href=\"https://wa.me/{{getPhoneNo(orderData[0].address.phoneNo)}}\" target=\"_blank\">Chat on Whatsapp</a>\r\n                      <!-- <p class=\"phone-no\">Placed On: {{getDateTimeFormat(orderData[0].createdAt.toDate())}}</p> -->\r\n                      <br>\r\n                      <p *ngIf=\"orderData[0].customerGstNo && orderData[0].customerGstNo != ''\"><strong>Customer\r\n                          {{taxType}} no\r\n                          :\r\n                        </strong>{{orderData[0].customerGstNo}}</p>\r\n                    </div>\r\n                    <!-- <ng-container *ngIf=\"orderData[0].orderType !== 'quotation'\">\r\n                      <p *ngIf=\"orderData[0].deliveryStatus && orderData[0].deliveryStatus == 'rejected'\"\r\n                        style=\"color: red; text-transform: capitalize; text-align: center; border-bottom: 1px solid lightgray;border-top: 1px solid lightgray; padding: 6px;\">\r\n                        <span>Delivery agent has rejected this order</span>\r\n                      </p>\r\n                      <div  \r\n                        *ngIf=\"!orderData[0].hasOwnProperty('storePickupObj') || (orderData[0].hasOwnProperty('storePickupObj') && !orderData[0].storePickupObj.hasOwnProperty('charges'))\">\r\n                        <br />\r\n                        <div class=\"assign-delivery\"\r\n                          *ngIf=\"orderData[0].status === 'Confirmed' || orderData[0].status === 'Dispatched'\">\r\n                          <p><strong>Delivery Agent</strong></p>\r\n                          <br>\r\n                          <select [(ngModel)]=\"orderData[0].deliveryAgentId\" interface=\"popover\"\r\n                            (change)=\"onChangeDeliveryAgent($event)\"\r\n                            *ngIf=\"!noDeliveryAgents && allDeliveryAgents.length\"\r\n                            style=\"margin-right: 12px;width: 100%;padding: 4px;\">\r\n                            <option value=\"\" disabled selected>Select delivery agent</option>\r\n                            <option value=\"\">None</option>\r\n                            <option [value]=\"agents.id\" *ngFor=\"let agents of allDeliveryAgents\">{{agents.name}}\r\n                            </option>\r\n                          </select>\r\n                          <select interface=\"popover\" placeholder=\"Select delivery agent\"\r\n                            (change)=\"onSetupDeliveryAgent()\" *ngIf=\"noDeliveryAgents\" style=\"margin-right: 12px;\">\r\n                            <option>Setup Delivery Agent</option>\r\n                          </select>\r\n                        </div>\r\n\r\n                        <br />\r\n\r\n                        <ng-container *ngIf=\"orderData[0].status === 'Confirmed'\">\r\n                          <div class=\"assign-delivery\">\r\n                            <p><strong>Assign Branch</strong></p>\r\n                      \r\n                            <select [value]=\"orderData[0]?.branchData?.id\" (change)=\"onChangeBranch($event)\" *ngIf=\"branches.length\"\r\n                              style=\"margin-right: 12px;width: 100%;padding: 4px;\">\r\n                              <option value=\"\" disabled selected>Select branch</option>\r\n                              <option value=\"none\">None</option>\r\n                              <option [value]=\"branch.id\" *ngFor=\"let branch of branches\">\r\n                                {{branch.name}}\r\n                              </option>\r\n                            </select>\r\n                          </div>\r\n                        </ng-container>\r\n                        <br>\r\n                        <ng-container *ngIf=\"orderData[0]?.branchData?.id !== ''\">\r\n                          <p><strong>Branch Details</strong></p>\r\n                          <p><strong>Name: </strong> <span>{{orderData[0].branchData?.name}}</span></p>\r\n                          <p><strong>Email: </strong> <span>{{orderData[0].branchData?.email}}</span></p>\r\n                          <p><strong>PhoneNo: </strong> <span>{{orderData[0].branchData?.phoneNo}}</span></p>\r\n                        </ng-container>\r\n                      </div>\r\n                    </ng-container> -->\r\n                    <div>\r\n                      <br>\r\n                      <div class=\"assign-delivery\">\r\n                        <div style=\"display: flex;align-items: center;justify-content: space-between;\">\r\n                          <p><strong>Custom Label</strong></p>\r\n                          <ion-button (click)=\"removeLabel()\" size=\"small\">\r\n                            Remove<i class=\"flaticon-credit-cards-payment\"></i>\r\n                          </ion-button>\r\n                        </div>\r\n                        <br>\r\n                        <select [(ngModel)]=\"orderData[0].label\" interface=\"popover\" (change)=\"onChangeLabel($event)\"\r\n                          *ngIf=\"labels && labels.length > 0\" style=\"margin-right: 12px;width: 100%;padding: 4px;\">\r\n                          <option value=\"\" disabled selected>Select Custom Label</option>\r\n                          <option [value]=\"label\" *ngFor=\"let label of labels\">{{label}}\r\n                          </option>\r\n                        </select>\r\n                      </div>\r\n                    </div>\r\n                    <ion-col size=\"12\" size-md=\"4\" *ngIf=\"orderData[0].additionalInfo\">\r\n                      <p><strong>Additional Information</strong></p>\r\n                      <br>\r\n                      <p class=\"userInfo\">{{orderData[0].additionalInfo}}</p>\r\n                      <!-- <p class=\"userInfo\" *ngIf=\"!orderData[0].additionalInfo\">Not provided</p> -->\r\n                    </ion-col>\r\n                  </ion-col>\r\n                  <ion-col size=\"12\" size-md=\"8\">\r\n                    <ng-container *ngIf=\"orderData[0].orderType !== 'quotation'\">\r\n                      <div\r\n                        *ngIf=\"!orderData[0].hasOwnProperty('orderType') || (orderData[0].hasOwnProperty('orderType') && orderData[0].orderType !== 'subscription')\">\r\n                        <div>\r\n                          <p class=\"payment-failed-msg\"\r\n                            *ngIf=\"orderData[0].payment.hasOwnProperty('status') && orderData[0].payment.status === 'failed'\">\r\n                            <strong>Payment failed</strong>\r\n                          </p>\r\n                        </div>\r\n                        <div class=\"payment-req\"\r\n                          *ngIf=\"!orderData[0].payment.completed && orderData[0].payment.mode !== 'cash' && (orderData[0].status === 'Confirmed' || orderData[0].status === 'Dispatched')\">\r\n                          <br>\r\n                          <ion-button (click)=\"sendPaymentRequest()\" shape=\"round\" size=\"small\">\r\n                            Send payment request &nbsp;<i class=\"flaticon-credit-cards-payment\"></i>\r\n                          </ion-button>\r\n                        </div>\r\n                      </div>\r\n                      <div\r\n                        *ngIf=\"orderData[0].hasOwnProperty('deliveryAgentId') && (orderData[0].deliveryAgentId != '') && deliveryAgentName\">\r\n                        <br>\r\n                        <p><strong>Delivery by : </strong> {{deliveryAgentName}}</p>\r\n                      </div>\r\n                      <div\r\n                        *ngIf=\"!orderData[0].hasOwnProperty('storePickupObj') || (orderData[0].hasOwnProperty('storePickupObj') && !orderData[0].storePickupObj.hasOwnProperty('charges')); else notDeliveryOrder;\">\r\n                        <div class=\"content-card\">\r\n                          <br>\r\n                          <p class=\"content-heading\"><strong>Delivery Schedule</strong></p>\r\n                          <hr class=\"line\">\r\n\r\n                          <!-- No delivery schedule set -->\r\n                          <p *ngIf=\"!isDeliveryScheduled() && !isEstimatedTimeAvailable() && !isInstantDelivery()\">Not\r\n                            set\r\n                            by\r\n                            {{orderData[0].address.name}}</p>\r\n\r\n                          <!-- Estimated delivery time -->\r\n                          <p *ngIf=\"isEstimatedTimeAvailable()\">\r\n                            Expected delivery date according to customer's address is\r\n                            <strong>{{orderData[0].estimatedDeliveryTime}}</strong>\r\n                          </p>\r\n\r\n                          <!-- Instant delivery order -->\r\n                          <p *ngIf=\"isInstantDelivery()\">Customer has opted for instant delivery within\r\n                            <strong>{{orderData[0].instantDelivery.time}}</strong>\r\n                          </p>\r\n\r\n                          <!-- Delivery scheduled selected -->\r\n                          <ng-container *ngIf=\"isDeliveryScheduled()\">\r\n                            <p *ngIf=\"!orderData[0].scheduledTime\"><strong>{{getDateTimeFormat(dateSchedule)}}</strong>\r\n                              at\r\n                              any time</p>\r\n                            <p *ngIf=\"orderData[0].scheduledTime && orderData[0].scheduledTime.hasOwnProperty('start')\">\r\n                              <strong>{{getDateTimeFormat(dateSchedule)}}</strong> at\r\n                              <strong>{{orderData[0].scheduledTime.start}} -\r\n                                {{orderData[0].scheduledTime.end}}</strong>\r\n                            </p>\r\n                            <p\r\n                              *ngIf=\"orderData[0].scheduledTime && !orderData[0].scheduledTime.hasOwnProperty('start')\">\r\n                              <strong>{{getDateTimeFormat(dateSchedule)}}</strong> at\r\n                              <strong>{{orderData[0].scheduledTime}}</strong>\r\n                            </p>\r\n                          </ng-container>\r\n\r\n                        </div>\r\n                      </div>\r\n                      <ng-template #notDeliveryOrder>\r\n                        <br />\r\n                        <div class=\"content-card\">\r\n                          <p class=\"content-heading\"><strong>Store Pickup Address</strong></p>\r\n                          <hr class=\"line\">\r\n                          <p class=\"user-name\">{{orderData[0].storePickupObj.storeAddress.address}}</p>\r\n                        </div>\r\n                      </ng-template>\r\n                      <br />\r\n                      <div class=\"content-card\" *ngIf=\"orderData[0].payment.completed\">\r\n                        <p class=\"content-heading\"><strong>Payment Mode</strong></p>\r\n                        <hr class=\"line\">\r\n                        <!-- <p class=\"user-name\" *ngIf=\"orderData[0].payment.mode !== 'upiManual'\">{{orderData[0].address.name}}\r\n                          paid using <span\r\n                            style=\"font-size: 15px;text-transform: capitalize;font-weight: bold;color: darkgreen;\">{{orderData[0].payment.mode}}</span>\r\n                        </p> -->\r\n                        <p class=\"user-name\" *ngIf=\"orderData[0].payment.mode !== 'upiManual'\">\r\n                          {{orderData[0].address.name}} paid using\r\n                          <span style=\"text-transform: capitalize;font-weight: 600;\">\r\n                            {{orderData[0].payment.mode === 'custom' ? orderData[0].payment.optionName :\r\n                            orderData[0].payment.mode}}\r\n                          </span>\r\n                          <br>\r\n                          <span *ngIf=\"orderData[0].payment.mode == 'razorpay' && paymentId\"><span\r\n                              style=\"font-weight: 700;\">Transaction Id: </span>{{paymentId}}</span>\r\n                        </p>\r\n\r\n                        <p class=\"user-name\" *ngIf=\"isPartialOrder()\">Partial payment of\r\n                          {{orderData[0].partialPayment.online.amount | currency: currencyCode: true: '0.0'}} made using\r\n                          {{orderData[0].partialPayment.online.mode}}</p>\r\n\r\n                        <div class=\"payment-ss\" *ngIf=\"orderData[0].payment.mode === 'upiManual'\">\r\n                          <p>\r\n                            Uploaded payment screenshot\r\n                          </p>\r\n                          <img [src]=\"orderData[0].payment.screenshot\">\r\n                        </div>\r\n                        <div class=\"payment-ss\" *ngIf=\"orderData[0].payment.mode === 'custom'\">\r\n                          <div *ngIf=\"orderData[0].payment.textDetails\">\r\n                            <p>\r\n                              Details: {{orderData[0].payment.textDetails}}\r\n                            </p>\r\n                          </div>\r\n                          <div *ngIf=\"orderData[0].payment.screenshot\">\r\n                            <p>\r\n                              Uploaded payment screenshot\r\n                            </p>\r\n                            <ion-img [src]=\"orderData[0].payment.screenshot\" style=\"width: 100px; height: 100px;\">\r\n                            </ion-img>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"content-card\"\r\n                        *ngIf=\"!orderData[0].payment.completed && orderData[0].payment.mode === 'cash'\">\r\n                        <p class=\"content-heading\"><strong>Payment info</strong></p>\r\n                        <hr class=\"line\">\r\n\r\n                        <p class=\"user-name\" *ngIf=\"isPartialOrder()\">Partial payment of\r\n                          {{orderData[0].partialPayment.online.amount | currency: currencyCode: true: '0.0'}} made using\r\n                          {{orderData[0].partialPayment.online.mode}}</p>\r\n\r\n                        <p class=\"user-name\">{{orderData[0].address.name}} will pay\r\n                          <span *ngIf='orderData[0].payment.details'>{{getCodAmount() | currency:\r\n                            currencyCode: true: '0.0'}}</span>\r\n                          using <span style=\"font-size: 15px;text-transform: capitalize;font-weight: bold;\r\n                          color: darkgreen;\">{{orderData[0].payment.mode}}</span>\r\n                        </p>\r\n                        <p class=\"update-status\" style=\"display: flex;align-items: center;\">Update status if already\r\n                          paid\r\n                          &nbsp;<ion-button (click)=\"onClickUpdatePaymentComplete()\" class=\"i-start m-s-btn\"\r\n                            shape=\"round\">\r\n                            Update\r\n                          </ion-button>\r\n                        </p>\r\n                      </div>\r\n                    </ng-container>\r\n                    <br />\r\n                    <!-- <div class=\"content-card\" *ngIf=\"orderData[0].hasOwnProperty('vendors')\">\r\n                        <p class=\"content-heading\">Vendors</p>\r\n                        <hr class=\"line\">\r\n                        <ul>\r\n                          <li *ngFor=\"let vendor of orderData[0].vendors\">{{vendor.vendor.name}} ({{vendor.vendor.phone}})</li>\r\n                        </ul>\r\n                      </div> -->\r\n                    <br>\r\n                    <div class=\"content-card\" *ngIf=\"orderData[0].invoice?.status === 'generated'\">\r\n                      <p class=\"content-heading\"></p>\r\n                      <hr class=\"line\">\r\n\r\n                      <div style=\"display: flex;justify-content: left;align-items: center;\">\r\n                        <a class=\"invoiceBtn\" *ngIf=\"orderData[0].vendors && orderData[0].vendors[0] && orderData[0].vendors[0]?.invoice; else orderInvoice\" (click)=\"showInvoiceModal()\"><strong>Download Invoice</strong></a>\r\n                        <ng-template #orderInvoice>\r\n                          <a href=\"{{orderData[0].invoice.url}}\" download=\"Invoice-ORD{{orderId}}\" target=\"_blank\"\r\n                            class=\"invoiceBtn\"><strong>Download Invoice</strong></a>\r\n                        </ng-template>&nbsp;\r\n                        <ng-container *ngIf=\"showRegenInvoiceBtn()\">\r\n                          <ion-button (click)=\"generateInvoice()\">\r\n                            Regenerate Invoice\r\n                          </ion-button>\r\n                        </ng-container>\r\n                        <!-- QR Code -->\r\n                        <!-- <div class=\"uploaded-doc-imgs\" *ngIf=\"orderData[0].qrCode\">\r\n                          <a (click)=\"openImg(orderData[0].qrCode)\">\r\n                            <ion-img [src]=\"orderData[0].qrCode\"></ion-img>\r\n                          </a>\r\n                        </div> -->\r\n                      </div>\r\n                      <br>\r\n\r\n                      <p class=\"invoiceBtn\" (click)=\"openOrderInvoice(orderData[0].creditNote.url)\"\r\n                        *ngIf=\"orderData[0].creditNote?.status === 'generated'\">View Credit Note</p>\r\n\r\n                      <ng-container *ngIf=\"orderData[0].orderType !== 'quotation'\">\r\n                        <div class=\"content-card\"\r\n                          *ngIf=\"orderData[0].status === 'Confirmed' && !(orderData[0].hasOwnProperty('message') && orderData[0].message !== '')\">\r\n                          <p>Enter Dispatch Message / Tracking Link</p>\r\n                          <ion-textarea [(ngModel)]=\"message\" rows=\"2\" placeholder=\"Enter your dispatch message here...\"\r\n                            class=\"dispatch-msg-textarea\"></ion-textarea>\r\n                        </div>\r\n                        <div style=\"padding: 5px;margin-top: 12px;border: 1px solid lightgray;\"\r\n                          *ngIf=\"orderData[0].hasOwnProperty('message') && orderData[0].message !== ''\">\r\n                          <p><strong>Dispatch Message / Tracking Link</strong>&nbsp;  :</p>\r\n                          <div style=\"margin-top: 5px;\" [innerHtml]=\"covertTextToUrl(orderData[0].message)\"></div>\r\n                        </div>\r\n                      </ng-container>\r\n\r\n                    </div>\r\n\r\n                    <!-- Reselling option -->\r\n                    <ng-container *ngIf=\"isResaleOrder()\">\r\n                      <div class=\"content-card\">\r\n                        <p class=\"content-heading\">Reselling Option</p>\r\n                        <hr class=\"line\">\r\n\r\n                        <h4 (click)=\"onClickResaleBtn()\" class=\"view-btn\">\r\n                          <strong>View Reselling Details</strong>\r\n                        </h4>\r\n                      </div>\r\n                    </ng-container>\r\n                    <!-- Reselling option -->\r\n\r\n                    <!-- Generate Invoice -->\r\n                    <ng-container *ngIf=\"showGenInvoiceBtn()\">\r\n                      <ion-button (click)=\"generateInvoice()\">\r\n                        Generate Invoice\r\n                      </ion-button>\r\n                    </ng-container>\r\n                    <!-- Generate Invoice -->\r\n                    \r\n                    <ng-container *ngIf=\"isPrintingInvoice\">\r\n                      <ion-button (click)=\"generatePrintingInvoice()\">download printing invoice</ion-button>\r\n                    </ng-container>\r\n\r\n                    <!-- Uploaded Doc -->\r\n                    <ng-container\r\n                      *ngIf=\"orderData[0].hasOwnProperty('uploadedDoc') && orderData[0].uploadedDoc.uploads.length\">\r\n                      <div class=\"content-card\" style=\"margin-top: 10px;\">\r\n                        <p class=\"content-heading\">Uploaded {{orderData[0].uploadedDoc.name}}</p>\r\n                        <hr class=\"line\">\r\n                        <div class=\"uploaded-doc-imgs\">\r\n                          <a (click)=\"openImg(img.url)\"\r\n                            *ngFor=\"let img of orderData[0].uploadedDoc.uploads; let i=index;\">\r\n                            <ion-img [src]=\"img.url\"></ion-img>\r\n                          </a>\r\n                        </div>\r\n                      </div>\r\n                    </ng-container>\r\n                    <!-- Uploaded Doc -->\r\n\r\n                    <!-- cancel reason -->\r\n                    <ng-container *ngIf=\"isCancelReasonAvailable()\">\r\n                      <div class=\"content-card my-10\">\r\n                        <p class=\"content-heading\">Cancelled Reason</p>\r\n                        <hr class=\"line\">\r\n                        <p>\r\n                          <strong>Cancelled By</strong>: {{orderData[0].cancelData.by}}\r\n                        </p>\r\n                        <p>\r\n                          <strong>Reason</strong>: {{orderData[0].cancelData.reason}}\r\n                        </p>\r\n                      </div>\r\n                    </ng-container>\r\n\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n            <br>\r\n            <div>\r\n              <div style=\"display: flex;align-items: center;margin-bottom: 5px;\">\r\n                <p><strong>Add a comment for this order ...</strong></p>&nbsp;&nbsp;\r\n                <ion-button (click)=\"addComment()\" size=\"small\"><i class=\"flaticon-pencil-edit-button\"\r\n                    style=\"margin-right: 8px;\"></i>Save</ion-button>\r\n              </div>\r\n              <textarea placeholder=\"Enter Comment for Order here\" [(ngModel)]='orderData[0].orderComment'\r\n                style=\"width: 95%;border: 1px solid lightgray;padding: 8px;\"></textarea>\r\n            </div>\r\n            <div>\r\n              <div *ngIf=\"orderData[0].custom && orderData[0].custom.active && orderData[0].custom.value\">\r\n                <p><b>{{orderData[0].custom.name}}</b> : {{orderData[0].custom.value}}</p>\r\n              </div>\r\n              <div *ngIf=\"orderData[0].custom && orderData[0].custom.deliveryAgentMsg\">\r\n                <p><b>Delivery Agent Message</b> :>{{orderData[0].custom.deliveryAgentMsg}}</p>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"orderData[0].deliveryVerification?.productsPic\">\r\n              <p>\r\n                Products pic by delivery agent\r\n              </p>\r\n              <ion-img [src]=\"orderData[0].deliveryVerification.productsPic\" style=\"width: 100px; height: 100px;\">\r\n              </ion-img>\r\n            </div>\r\n\r\n            <div class=\"divider\"></div>\r\n            <!-- Edit Order -->\r\n            <ng-container>\r\n              <div class=\"edit-order-btn\">\r\n                <ion-button (click)=\"editOrder()\" shape=\"round\" size=\"small\"\r\n                  *ngIf=\"showEditOrderBtn() && orderData[0].orderType != 'quotation'\">\r\n                  <i class=\"flaticon-pencil-edit-button\" style=\"margin-right: 8px;\"></i>\r\n                  Edit Order\r\n                </ion-button>\r\n                <ion-button shape=\"round\" size=\"small\" (click)=\"editQuotation()\"\r\n                  *ngIf=\"orderData[0].orderType == 'quotation'\">\r\n                  <i class=\"flaticon-pencil-edit-button\" style=\"margin-right: 8px;\"></i>\r\n                  Edit Order\r\n                </ion-button>\r\n                <ion-button (click)=\"openChatModal()\" style=\"margin-right: 12px;\">\r\n                  Chat With This User&nbsp;&nbsp;<i class=\"flaticon-null-29\"></i>\r\n                </ion-button>\r\n              </div>\r\n            </ng-container>\r\n            <!-- Edit Order End -->\r\n\r\n            <div class=\"order-items-detail-wrapper\">\r\n              <ion-grid>\r\n                <ion-row>\r\n                  <ion-col size=\"12\" size-xl=\"8\">\r\n                    <div *ngFor=\"let product of orderData[0].products; let i=index\">\r\n                      <ion-item class=\"ion-no-padding\" lines=\"none\">\r\n                        <div slot=\"start\" *ngIf=\"product?.img?.mob\"\r\n                          [ngStyle]=\"{'background': 'url(' + product.img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n                          class=\"product-image\"></div>\r\n                        <div slot=\"start\" *ngIf=\"!product?.img?.mob && product?.img?.url\"\r\n                          [ngStyle]=\"{'background': 'url(' + product?.img?.url + ') no-repeat center', 'background-size': 'contain'}\"\r\n                          class=\"product-image\"></div>\r\n                        <div slot=\"start\" *ngIf=\"!product?.img?.mob && !product?.img?.url\"\r\n                          style=\"background: url(assets/img/placeholder-img.jpg) no-repeat center; background-size: contain;\"\r\n                          class=\"product-image\"></div>\r\n                        <ion-label>\r\n                          <h2 class=\"product-price ion-text-wrap\"\r\n                            *ngIf=\"!product.hasOwnProperty('pack') || (product.hasOwnProperty('pack') && product.pack.variantType && product.pack.variantType !== 'pieces')\">\r\n                            {{product.price * product.quantity | currency: currencyCode:true}}</h2>\r\n                          <h2 class=\"product-price ion-text-wrap\"\r\n                            *ngIf=\"product.hasOwnProperty('pack') && product.pack.variantType && product.pack.variantType === 'pieces'\">\r\n                            {{product.price | currency: currencyCode:true}}</h2>\r\n                          <h3 class=\"product-name ion-text-wrap\"><strong>{{product.name}}</strong></h3>\r\n                          <div class=\"product-sub_heading\" *ngIf=\"product.showSubheading\">\r\n                            <ng-container *ngIf=\"productSetting?.subheading?.img\">\r\n                              <img [src]=\"productSetting.subheading.img\" class=\"product-sub_heading-img\" alt=\"\">\r\n                            </ng-container>\r\n                            <ng-container *ngIf=\"productSetting?.subheading?.text\">\r\n                              <div class=\"product-sub_heading-text\">{{productSetting.subheading.text}}</div>\r\n                            </ng-container>\r\n                          </div>\r\n                         \r\n                          <h6 class=\"product-description ion-text-capitalize\"><span\r\n                              *ngIf=\"product.hasOwnProperty('pack') && product.pack.variantType\">{{product.pack.variantType}}:\r\n                            </span>{{product.description}}<span\r\n                              *ngIf=\"product.hasOwnProperty('pack') && product.pack.variantType && product.pack.variantType === 'pieces'\">\r\n                              X {{product.quantity}}</span></h6>\r\n                          <div\r\n                            *ngIf=\"!product.hasOwnProperty('pack') || (product.hasOwnProperty('pack') && product.pack.variantType && product.pack.variantType !== 'pieces')\">\r\n                            <h3 class=\"product-quantity\">QTY: {{product.quantity}}</h3>\r\n                            <h3 class=\"product-name\"\r\n                              *ngIf=\"product.hasOwnProperty('orderType') && product.orderType === 'subscription'\">\r\n                              <strong>Subscription</strong>\r\n                            </h3>\r\n                            <h3 class=\"product-quantity\" *ngIf=\"product.shippingWt\">Shipping Weight: {{product.shippingWt}}</h3>\r\n                          </div>\r\n                          <div class=\"cart-counter\"\r\n                            *ngIf=\"product.hasOwnProperty('pack') && product.pack.variantType && product.pack.variantType === 'pieces' && product.totalPieces\">\r\n                            <!-- <div class=\"cart-counter-action\">\r\n                                <ion-icon name=\"remove\" (click)=\"decrementPieces(i)\"></ion-icon>\r\n                              </div> -->\r\n                            <div class=\"cart-counter-value\">\r\n                              {{product.totalPieces}}\r\n                            </div>\r\n                            <!-- <div class=\"cart-counter-action\">\r\n                                <ion-icon name=\"add\" (click)=\"incrementPieces(i)\"></ion-icon>\r\n                              </div> -->\r\n                          </div>\r\n                        </ion-label>\r\n                      </ion-item>\r\n\r\n                      <!-- product addons -->\r\n                      <ng-container *ngIf=\"isAddonAvailable(product)\">\r\n                        <app-product-addons [product]=\"product\"></app-product-addons>\r\n                      </ng-container>\r\n                      <!-- product addons -->\r\n                      \r\n                      <div class=\"comment-box\" *ngIf=\"product.commentMsg\">\r\n                        {{orderData[0].address.name}}'s Message: {{product.commentMsg}}\r\n                      </div>\r\n                      <div *ngIf=\"product.commentImgs\">\r\n                        <div *ngIf=\"product.commentImgs.length !== 0\">\r\n                          <ion-grid class=\"ion-no-padding\">\r\n                            <ion-row class=\"ion-justify-content-start\">\r\n                              <ion-col size=\"2\" class=\"comment-img-conatiner\"\r\n                                *ngFor=\"let img of product.commentImgs; let imgIndex = index\">\r\n                                <div *ngIf=\"img?.thumb; else showUrlImg\" (click)=\"imgZoom(img.url)\"\r\n                                  [ngStyle]=\"{'background': 'url(' + img.thumb + ') no-repeat center', 'background-size': 'contain'}\"\r\n                                  class=\"comment-img\"></div>\r\n                                  <ng-template #showUrlImg>\r\n                                    <div (click)=\"imgZoom(img.url)\"\r\n                                      [ngStyle]=\"{'background': 'url(' + img.url + ') no-repeat center', 'background-size': 'contain'}\"\r\n                                      class=\"comment-img\"></div>\r\n                                  </ng-template>\r\n                              </ion-col>\r\n                            </ion-row>\r\n                          </ion-grid>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"sku-code\" *ngIf=\"product.hasOwnProperty('sku') && product.sku !== ''\">\r\n                        <span class=\"sku-code-heading\">Sku Code:</span>\r\n                        <span class=\"sku-code-value\"> {{product.sku}}</span>\r\n                      </div>\r\n                      <div class=\"sku-code\" *ngIf=\"product.hasOwnProperty('barcodeNo') && product.barcodeNo !== ''\">\r\n                        <span class=\"sku-code-heading\">Barcode No:</span>\r\n                        <span class=\"sku-code-value\"> {{product.barcodeNo}}</span>\r\n                      </div>\r\n                      <!-- vendor status -->\r\n                      <ng-container *ngIf=\"product.hasOwnProperty('vendorStatus')\">\r\n\r\n                        <div class=\"f-s-13 ion-text-capitalize\"\r\n                          *ngIf=\"getVendorName(product.vendorStatus.id) as vendorName;\">\r\n                          <span class=\"f-w-b\">Vendor Name: </span>\r\n                          <span>{{vendorName}}</span>\r\n                        </div>\r\n\r\n                        <div class=\"f-s-13 ion-text-capitalize\" *ngIf=\"product.vendorStatus.status !== 'notSet'\">\r\n                          <span class=\"f-w-b\">Vendor Status: </span>\r\n                          <span>\r\n                            <ion-text [color]=\"getVendorStatusColor(product.vendorStatus.status)\">\r\n                              {{product.vendorStatus.status}}\r\n                            </ion-text>\r\n                          </span>\r\n                        </div>\r\n\r\n                        <div class=\"f-s-13\" *ngIf=\"isVendorQtyUnavialble(product)\">\r\n                          <span class=\"f-w-b\">Available Quantity: </span>\r\n                          <span>Vendor has only {{product.quantity - product.vendorStatus.unavailableQty}} available\r\n                            quantity.</span>\r\n                        </div>\r\n                      </ng-container>\r\n                      <!-- vendor status -->\r\n                      <ng-container *ngIf=\"!product.hasOwnProperty('vendorStatus') && product.hasOwnProperty('vendorId')\">\r\n                        <div class=\"f-s-13 ion-text-capitalize\"\r\n                          *ngIf=\"getVendorName(product.vendorId) as vendorName;\">\r\n                          <span class=\"f-w-b\">Vendor Name: </span>\r\n                          <span>{{vendorName}}</span>\r\n                        </div>\r\n                      </ng-container>\r\n                      <hr class=\"line\" *ngIf=\"i !== orderData[0].products.length - 1\">\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"12\" size-xl=\"4\">\r\n                    <!-- Unavailable products Start-->\r\n                    <div class=\"products-container\" *ngIf=\"(orderData[0].unavailable | json) !== '{}'\"\r\n                      style=\"border: 1px solid #ccc; margin-left: 26px; margin-bottom: 20px;\">\r\n                      <ion-list class=\"ion-no-padding\" lines=\"none\">\r\n                        <div class=\"content-heading\" style=\"padding: 8px 5px 0px;\">\r\n                          <b>Unavailable Products</b>\r\n                        </div>\r\n\r\n                        <hr class=\"line\">\r\n\r\n                        <div *ngFor=\"let product of orderData[0].unavailable | keyvalue\">\r\n                          <ng-container *ngIf=\"orderData[0].unavailable[product.key]\">\r\n                            <ion-item class=\"ion-no-padding\">\r\n                              <div *ngIf=\"orderData[0].products[product.key].img.mob\" slot=\"start\"\r\n                                [ngStyle]=\"{'background': 'url(' + orderData[0].products[product.key].img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n                                class=\"product-image\"></div>\r\n                              <div\r\n                                *ngIf=\"!orderData[0].products[product.key].img.mob && orderData[0].products[product.key].img.url\"\r\n                                slot=\"start\"\r\n                                [ngStyle]=\"{'background': 'url(' + orderData[0].products[product.key].img.url + ') no-repeat center', 'background-size': 'contain'}\"\r\n                                class=\"product-image\"></div>\r\n                              <div\r\n                                *ngIf=\"!orderData[0].products[product.key].img.mob && !orderData[0].products[product.key].img.url\"\r\n                                slot=\"start\" class=\"no-product-image\"></div>\r\n\r\n                              <ion-label>\r\n                                <h3 class=\"product-name ion-text-wrap\">{{orderData[0].products[product.key].name}}</h3>\r\n                                <h3 class=\"product-quantity opacity-07\">Quantity:\r\n                                  {{orderData[0].unavailable[product.key]}}</h3>\r\n                                <h6 class=\"f-w-b m-t-8\">\r\n                                  {{getUnavailableProductPrice(product.key) | currency: currencyCode:true:'0.0'}}</h6>\r\n                              </ion-label>\r\n                            </ion-item>\r\n                            <hr class=\"line\">\r\n                          </ng-container>\r\n                        </div>\r\n\r\n                        <div class=\"d-flex-sb\">\r\n                          <p><b>Total Amount:</b> {{orderData[0].unavailablePrice | currency: currencyCode:true:'0.0'}}\r\n                          </p>\r\n                        </div>\r\n\r\n                      </ion-list>\r\n                    </div>\r\n                    <!-- Unavailable products End -->\r\n\r\n                    <div class=\"order-summery-wrapper\" *ngIf=\"orderData[0].orderType !== 'quotation' && (orderData[0].orderType !== 'subscription')\">\r\n                      <p style=\"text-align: center;\"><strong style=\"font-size: 16px;text-decoration: underline;\">Order\r\n                          Summary</strong></p>\r\n                      <table>\r\n                        <tr>\r\n                          <td>Number of Items</td>\r\n                          <td>{{getTotalItems()}} items</td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td>Subtotal</td>\r\n                          <td>{{getSubTotalPrice() | currency: currencyCode:true}}</td>\r\n                        </tr>\r\n                        <tr *ngIf=\"orderData[0].discountOnMrp\">\r\n                          <td>Offer Discount</td>\r\n                          <td>-{{orderData[0].discountOnMrp | currency: currencyCode:true}}</td>\r\n                        </tr>\r\n                        <tr *ngIf=\"orderData[0].additionalDiscount\">\r\n                          <td>Additional Discount</td>\r\n                          <td>-{{orderData[0].additionalDiscount | currency: currencyCode:true}}</td>\r\n                        </tr>\r\n                        <tr *ngIf=\"orderData[0].couponDiscount !== 0\">\r\n                          <td>Coupon Discount</td>\r\n                          <td>-{{orderData[0].couponDiscount | currency: currencyCode:true}}</td>\r\n                        </tr>\r\n                        <tr *ngIf=\"orderData[0].membershipDiscount\">\r\n                          <td>Membership Discount</td>\r\n                          <td>-{{orderData[0].membershipDiscount | currency: currencyCode:true}}</td>\r\n                        </tr>\r\n\r\n                        <tr *ngIf=\"orderData[0].extraChargeOnOrder?.charge\">\r\n                          <td>{{orderData[0].extraChargeOnOrder.name || 'Extra Charge'}}</td>\r\n                          <td>{{orderData[0].extraChargeOnOrder.charge | currency: currencyCode:true:'.2-2'}}</td>\r\n                        </tr>\r\n                        <tr *ngIf=\"orderData[0].extraChargeOnPayment?.charge\">\r\n                          <td>{{orderData[0].extraChargeOnPayment.name || 'Payment Gateway Charge'}}</td>\r\n                          <td>{{orderData[0].extraChargeOnPayment.charge | currency: currencyCode:true:'.2-2'}}</td>\r\n                        </tr>\r\n\r\n                        <tr\r\n                          *ngIf=\"orderData[0].hasOwnProperty('storePickupObj') && orderData[0].storePickupObj.hasOwnProperty('charges'); else noStorePickup;\">\r\n                          <td>Store Pickup Charges</td>\r\n                          <td>{{orderData[0].storePickupObj.charges | currency: currencyCode:true:'0.0'}}</td>\r\n                        </tr>\r\n                        <ng-template #noStorePickup>\r\n                          <tr>\r\n                            <td>Delivery</td>\r\n                            <td>\r\n                              <p *ngIf=\"orderData[0].delivery\">\r\n                                {{orderData[0].delivery | currency: currencyCode:true:'0.0'}}\r\n                              </p>\r\n                              <p *ngIf=\"!orderData[0].delivery\" style=\"color: var(--ion-color-success);\">Free</p>\r\n                            </td>\r\n                          </tr>\r\n                        </ng-template>\r\n\r\n                        <tr *ngIf=\"orderData[0].totalAddonsPrice\">\r\n                          <td>Add Ons</td>\r\n                          <td>{{orderData[0].totalAddonsPrice | currency: currencyCode:true:'.2-2'}}</td>\r\n                        </tr>\r\n\r\n                        <tr *ngIf=\"orderData[0].defaultGst !== 0\">\r\n                          <td>{{taxType}}</td>\r\n                          <td>+ {{getTotalGst() | currency: currencyCode:true:'0.0'}}</td>\r\n                        </tr>\r\n\r\n                        <tr *ngIf=\"showUnavailablePrice()\">\r\n                          <td>Total Unavailable</td>\r\n                          <td>-{{orderData[0].unavailablePrice | currency: currencyCode:true:'0.0'}}</td>\r\n                        </tr>\r\n                      </table>\r\n                      <div class=\"sub-total-wrap\">\r\n                        <table>\r\n                          <tr>\r\n                            <td>\r\n                              <h3>Total Amount</h3>\r\n                              <br>\r\n                              <span>(Incl of all taxes)</span>\r\n                            </td>\r\n                            <td>\r\n                              <h3>{{orderData[0].totalAmountToPaid | currency: currencyCode:true}}</h3>\r\n                            </td>\r\n                          </tr>\r\n                        </table>\r\n                      </div>\r\n                      <div *ngIf=\"orderData[0].walletAmount || orderData[0].cashbackAmount || isPartialOrder()\">\r\n                        <table>\r\n                          <tr *ngIf=\"orderData[0].walletAmount\">\r\n                            <td>\r\n                              <h3>Wallet Amount</h3>\r\n                            </td>\r\n                            <td>\r\n                              <h3>-{{orderData[0].walletAmount | currency: currencyCode:true:'0.0'}}</h3>\r\n                            </td>\r\n                          </tr>\r\n                          <tr *ngIf=\"orderData[0].cashbackAmount\">\r\n                            <td>\r\n                              <h3>Cashback Used</h3>\r\n                            </td>\r\n                            <td>\r\n                              <h3>-{{orderData[0].cashbackAmount | currency: currencyCode:true:'0.0'}}</h3>\r\n                            </td>\r\n                          </tr>\r\n                          <tr *ngIf=\"isPartialOrder() && orderData[0].partialPayment.online.amount;\">\r\n                            <td>\r\n                              <h3>Paid Onlne</h3>\r\n                            </td>\r\n                            <td>\r\n                              <h3>-{{orderData[0].partialPayment.online.amount | currency: currencyCode:true:'0.0'}}\r\n                              </h3>\r\n                            </td>\r\n                          </tr>\r\n                        </table>\r\n                        <div class=\"sub-total-wrap\">\r\n                          <table>\r\n                            <tr>\r\n                              <td>\r\n                                <h3 *ngIf=\"!orderData[0].payment.completed\">Amount Payable</h3>\r\n                                <h3 *ngIf=\"orderData[0].payment.completed\">Amount Paid</h3>\r\n                              </td>\r\n                              <td>\r\n                                <h3>{{getFinalAmount() | currency: currencyCode:true:'0.0'}}</h3>\r\n                              </td>\r\n                            </tr>\r\n                          </table>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"unavailable-tax\" *ngIf=\"orderData[0].unavailableGst\">\r\n                        <tr>\r\n                          <td>Unavailable {{taxType}}</td>\r\n                          <td>-{{orderData[0].unavailableGst | currency: currencyCode:true:'.2-2'}}</td>\r\n                        </tr>\r\n                        <tr>\r\n                          <td>Final {{taxType}}</td>\r\n                          <td>{{getTotalGst() - orderData[0].unavailableGst | currency: currencyCode:true:'.2-2'}}</td>\r\n                        </tr>\r\n                      </div>\r\n                      <div class=\"white-sep\"></div>\r\n                      <!--<div class=\"pay-method-wrap\">\r\n                          <table>\r\n                            <tr>\r\n                              <td>Payment Method</td>\r\n                              <td>Google Pay BHIM UPI</td>\r\n                            </tr>\r\n                          </table>\r\n                        </div>-->\r\n                    </div>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n            <div class=\"content-card\" *ngIf=\"orderData[0].hasOwnProperty('rating')\">\r\n              <div class=\"divider\"></div>\r\n              <p class=\"content-heading\">Order Review</p>\r\n              <hr class=\"line\">\r\n              <div class=\"user-rating\">\r\n                <ionic4-star-rating activeIcon=\"ios-star\" defaultIcon=\"ios-star-outline\"\r\n                  [activeColor]=\"getStarColor(orderData[0].rating.rating)\" defaultColor=\"#e1e1e1\" readonly=\"true\"\r\n                  [rating]=\"orderData[0].rating.rating\" fontSize=\"15px\" halfStar='true'>\r\n                </ionic4-star-rating>\r\n                <p class=\"user-rating-review\">{{orderData[0].rating.review}}</p>\r\n                <div class=\"user-rating-photos\" *ngIf=\"orderData[0].rating.photos && orderData[0].rating.photos.length\">\r\n                  <ion-img [src]=\"photo.mob\" *ngFor=\"let photo of orderData[0].rating.photos; let i=index;\"\r\n                    class=\"previewImg\"></ion-img>\r\n                </div>\r\n                <p class=\"user-rating-date\">Rated On {{reviewDate() | date:'dd MMMM yyyy'}}</p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/admin-orders/admin-orders.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/admin/admin-orders/admin-orders.module.ts ***!
  \***********************************************************/
/*! exports provided: AdminOrdersPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminOrdersPageModule", function() { return AdminOrdersPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_orders_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-orders.page */ "./src/app/admin/admin-orders/admin-orders.page.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");
/* harmony import */ var src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/components/shared.module */ "./src/app/components/shared.module.ts");
/* harmony import */ var ionic4_star_rating__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ionic4-star-rating */ "./node_modules/ionic4-star-rating/dist/index.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");












var routes = [
    {
        path: '',
        component: _admin_orders_page__WEBPACK_IMPORTED_MODULE_6__["AdminOrdersPage"]
    }
];
var AdminOrdersPageModule = /** @class */ (function () {
    function AdminOrdersPageModule() {
    }
    AdminOrdersPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__["Ng2SearchPipeModule"],
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_8__["SuperTabsModule"],
                ionic4_star_rating__WEBPACK_IMPORTED_MODULE_10__["StarRatingModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__["TranslateModule"],
                src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"]
            ],
            declarations: [_admin_orders_page__WEBPACK_IMPORTED_MODULE_6__["AdminOrdersPage"]]
        })
    ], AdminOrdersPageModule);
    return AdminOrdersPageModule;
}());



/***/ }),

/***/ "./src/app/admin/admin-orders/admin-orders.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/admin/admin-orders/admin-orders.page.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@charset \"UTF-8\";\n.list-header {\n  top: 0px;\n}\n.list-container {\n  margin-top: 45px;\n}\n.list-container ion-grid {\n  padding: 0;\n}\n.list-container ion-grid ion-row {\n  border-bottom: var(--ion-color-medium) 1px solid;\n}\n.list-container ion-grid ion-row ion-col {\n  padding: 16px 8px;\n  -webkit-box-align: center;\n          align-items: center;\n  display: -webkit-inline-box;\n  display: inline-flex;\n}\n.product-sub_heading {\n  display: -webkit-box;\n  display: flex;\n  gap: 5px;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.product-sub_heading-img {\n  height: 13px;\n}\n.product-sub_heading-text {\n  font-size: 12px;\n}\n.id, .date, .status {\n  width: 100px;\n  max-width: 100px;\n  /*text-align: center;*/\n}\n.action {\n  width: 110px;\n  max-width: 110px;\n  text-align: center;\n}\n.name {\n  width: calc(100% - 410px);\n  max-width: calc(100% - 410px);\n}\n.ao-product-image {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n  width: 64px;\n  height: 64px;\n  position: relative;\n  border: 1px solid #f0f0f0;\n}\n.border-bottom {\n  border-bottom: var(--ion-color-medium) 1px solid;\n}\n.f-d-c {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.f-d-c .m-s-btn {\n  margin-top: 15px;\n}\n.Pending {\n  color: black;\n}\n.Confirmed {\n  color: darkblue;\n}\n.Dispatched {\n  color: #9B870C;\n}\n.Delivered {\n  color: darkgreen;\n}\n.Cancelled, .Returned {\n  color: darkred;\n}\n.divider {\n  background: lightgray;\n  height: 1px;\n  margin: 8px;\n}\nion-select {\n  border: 1px solid lightgray;\n}\n.rowHeading {\n  font-size: medium;\n  font-weight: bold;\n}\n.statusList {\n  text-align: center;\n}\n.statusList p {\n  font-size: medium;\n  border: 1px solid lightgray;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n}\n.footerBtn {\n  text-align: center;\n}\n.footerBtn ion-button {\n  margin: 8px;\n}\n.address-wrap h3 {\n  font-size: 16px;\n  font-weight: 500;\n  margin: 0;\n}\n.divider {\n  border-bottom: solid 1px var(--ion-color-medium);\n  margin: 26px 0;\n}\n.items-wrapper table {\n  width: 100%;\n}\n.items-wrapper table td {\n  padding: 8px;\n  border-bottom: var(--ion-color-light) 1px solid;\n}\n.items-wrapper table td.img {\n  width: 64px;\n}\n.items-wrapper table td.img img {\n  width: 100%;\n}\n.items-wrapper table td.price-detail {\n  color: #333;\n}\n.items-wrapper table td.total-price {\n  color: var(--ion-color-success);\n}\n.items-wrapper table .item-qty {\n  color: #333;\n}\n.product-image {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n  width: 100px;\n  height: 80px;\n}\n.product-name {\n  font-size: 18px;\n  margin-top: 7px;\n  margin-bottom: 7px;\n}\n.toggle {\n  padding: 24px;\n  text-align: center;\n  border-top: var(--ion-color-medium) 1px solid;\n  margin: 26px -24px -24px -24px;\n  color: var(--ion-color-primary);\n  cursor: pointer;\n}\n.order-summery-wrapper {\n  background: var(--ion-color-medium);\n  padding: 24px;\n  border-radius: 16px;\n}\n.order-summery-wrapper h3 {\n  font-size: 16px;\n  font-weight: 500;\n  margin: 0;\n}\n.order-summery-wrapper table {\n  width: 100%;\n}\n.order-summery-wrapper table td {\n  padding: 4px 0;\n}\n.order-summery-wrapper table td:last-child {\n  text-align: right;\n}\n.order-summery-wrapper .sub-total-wrap {\n  border-top: #ccc 1px solid;\n  margin-top: 16px;\n  padding-top: 16px;\n}\n.order-summery-wrapper .sub-total-wrap h3 {\n  font-size: 18px;\n  display: inline;\n}\n.order-summery-wrapper .sub-total-wrap span {\n  margin-left: 6px;\n  font-size: 10px;\n}\n.order-summery-wrapper .pay-method-wrap {\n  border-top: #fff 1px solid;\n  margin: 16px -24px -24px -24px;\n  padding: 16px 24px;\n}\n.edit-order-btn {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n/********************** multistep ************************/\n.multi-steps {\n  display: table;\n  table-layout: fixed;\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  padding: 25px 0 10px 0;\n  position: relative;\n  left: -8%;\n}\n.multi-steps > li.is-active:before,\n.multi-steps > li.is-active ~ li:before {\n  content: \"\";\n  font-family: Flaticon;\n  font-weight: 400;\n  background-color: var(--ion-color-success);\n  border-color: var(--ion-color-success);\n}\n.multi-steps > li.is-active:after,\n.multi-steps > li.is-active ~ li:after {\n  background-color: var(--ion-color-gray);\n  border-color: var(--ion-color-gray);\n}\n.multi-steps > li {\n  counter-increment: stepNum;\n  text-align: center;\n  display: table-cell;\n  position: relative;\n  color: var(--ion-color-success);\n  font-size: 12px;\n  padding: 16px 0;\n}\n.multi-steps > li:before {\n  content: \"\";\n  font-family: Flaticon;\n  display: block;\n  margin: 0 auto 4px;\n  background-color: var(--ion-color-success);\n  width: 24px;\n  height: 24px;\n  line-height: 24px;\n  text-align: center;\n  font-weight: 400;\n  border-width: 1px;\n  border-style: solid;\n  border-color: var(--ion-color-success);\n  border-radius: 50%;\n  position: relative;\n  z-index: 1;\n  color: #fff;\n  font-size: 10px;\n}\n.multi-steps > li:after {\n  content: \"\";\n  height: 1px;\n  width: 100%;\n  background-color: var(--ion-color-success);\n  position: absolute;\n  top: 29px;\n  left: 50%;\n}\n.multi-steps > li:last-child:after {\n  display: none;\n}\n.multi-steps > li.is-active:before {\n  background-color: var(--ion-color-success);\n  border-color: var(--ion-color-success);\n  color: #fff;\n}\n.multi-steps > li.is-active ~ li {\n  color: #111;\n}\n.multi-steps > li.is-active ~ li:before {\n  background-color: var(--ion-color-gray);\n  border-color: var(--ion-color-gray);\n  color: var(--ion-color-gray);\n}\n.reset-password-container {\n  width: 90%;\n  margin: 32px auto;\n  text-align: center;\n}\nspan.date {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n  width: 110px;\n}\n.fix-height {\n  max-height: calc(100vh - 315px);\n  overflow-y: scroll;\n  padding: 16px;\n}\n/**********************multistep end************************/\n.comment-box {\n  opacity: 0.4;\n  margin-left: 10px;\n  font-size: 14px;\n}\n.comment-img-conatiner {\n  margin-right: 10px;\n}\n.comment-img {\n  border: 1px solid #ececec;\n  width: 50px;\n  height: 50px;\n  cursor: pointer;\n  border-radius: 6px;\n  overflow: hidden;\n}\n@media (max-width: 1400px) {\n  .multi-steps {\n    position: static;\n  }\n}\n@media (max-width: 1200px) {\n  .order-summery-wrapper {\n    margin-left: 0;\n    margin-top: 26px;\n  }\n}\n@media (max-width: 992px) {\n  .address-wrap {\n    border-left: 0;\n    border-top: var(--ion-color-medium) 1px solid;\n  }\n}\n@media (max-width: 500px) {\n  .header {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n            flex-direction: column;\n  }\n  .header .btn-2-outline {\n    margin-top: 16px;\n  }\n\n  .multi-steps {\n    display: initial;\n    table-layout: unset;\n    list-style: none;\n    padding: 0;\n    margin: 0;\n  }\n\n  .multi-steps > li {\n    display: list-item;\n    padding: 0 32px;\n    margin-bottom: 36px;\n    text-align: left;\n  }\n  .multi-steps > li span.date {\n    position: static;\n  }\n  .multi-steps > li span.status {\n    margin-left: 6px;\n    font-weight: 500;\n  }\n\n  .multi-steps > li:before {\n    position: absolute;\n    left: 0;\n    top: 0;\n  }\n\n  .multi-steps > li:after {\n    position: absolute;\n    top: 0;\n    left: 12px;\n    width: 1px;\n    height: 60px;\n  }\n}\n.previewImg {\n  padding: 10px;\n  border-radius: 10px;\n}\n.user-rating-photos {\n  display: -webkit-box;\n  display: flex;\n}\n.uploaded-doc-imgs {\n  margin-top: 10px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n          align-items: center;\n  flex-wrap: wrap;\n}\n.uploaded-doc-imgs a {\n  display: -webkit-box;\n  display: flex;\n  cursor: pointer;\n}\n.uploaded-doc-imgs ion-img {\n  width: 60px;\n  height: 60px;\n  -o-object-fit: fill;\n     object-fit: fill;\n  margin-right: 15px;\n  border: 1px solid #ccc;\n}\n.invoiceBtn, .view-btn {\n  padding: 10px;\n  border: 1px solid #f40d30;\n  border-radius: 8px;\n  background-color: #f40d30;\n  color: white;\n  text-decoration: none;\n  width: 130px;\n  text-align: center;\n}\n.view-btn {\n  cursor: pointer;\n  width: 200px;\n}\n.orderGrid {\n  cursor: pointer;\n  border-bottom: 1px solid lightgray;\n}\n.orderGrid strong {\n  font-size: 16px;\n}\n.orderGrid:hover {\n  background: var(--ion-color-categories-background);\n}\n#scroll1 {\n  overflow: hidden;\n  height: 82vh;\n}\n#scroll1:hover {\n  overflow-y: auto;\n}\n#scroll2 {\n  overflow: hidden;\n  height: 76vh;\n  border-left: 1px solid lightgray;\n  border-right: 1px solid lightgray;\n}\n#scroll2:hover {\n  overflow-y: auto;\n}\n#scroll3 {\n  overflow: hidden;\n  height: 78vh;\n}\n#scroll3:hover {\n  overflow-y: auto;\n}\n@media screen and (min-height: 1200px) {\n  #scroll1 {\n    height: 92vh;\n  }\n\n  #scroll2 {\n    height: 86vh;\n  }\n\n  #scroll3 {\n    height: 88vh;\n  }\n}\n::-webkit-input-placeholder {\n  color: black;\n  opacity: 1;\n  /* Firefox */\n}\n::-moz-placeholder {\n  color: black;\n  opacity: 1;\n  /* Firefox */\n}\n::-ms-input-placeholder {\n  color: black;\n  opacity: 1;\n  /* Firefox */\n}\n::placeholder {\n  color: black;\n  opacity: 1;\n  /* Firefox */\n}\n.status-progress-container {\n  position: relative;\n  overflow: hidden;\n}\n.status-progress-container .status-progress {\n  position: relative;\n  list-style: none;\n}\n.status-progress-container .status-progress-item {\n  position: relative;\n  min-height: 75px;\n  counter-increment: list;\n  padding-left: 0.5rem;\n}\n.status-progress-container .status-progress-item:before {\n  content: \"\";\n  position: absolute;\n  left: -27px;\n  top: 26px;\n  height: 49px;\n  width: 2px;\n  border-left: 2px solid var(--ion-color-success);\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.status-progress-container .status-progress-item:after {\n  content: \"✓\";\n  position: absolute;\n  top: 0;\n  left: -40px;\n  width: 26px;\n  height: 26px;\n  border-radius: 5px;\n  background: var(--ion-color-success);\n  color: #fff;\n  font-weight: 400;\n  font-size: 15px;\n  line-height: 1.5rem;\n  text-align: center;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.status-progress-container .status-progress-item:last-child:before, .status-progress-container .status-progress-item.last-status:before {\n  border-left: none !important;\n}\n.status-progress-container .status-progress-item.status-missing {\n  opacity: 0.5;\n}\n.status-progress-container .status-progress-item.status-missing:before {\n  border-left: 2px solid #ccc;\n}\n.status-progress-container .status-progress-item.status-missing:after {\n  background: #ccc;\n  opacity: 0.6;\n  color: #fff;\n}\n.status-progress-container .status-progress-item.status-cancelled:before {\n  border-left: 2px solid var(--ion-color-danger);\n  height: 30px;\n}\n.status-progress-container .status-progress-item.status-cancelled:after {\n  content: \"×\";\n  background: var(--ion-color-danger);\n  color: #fff;\n  font-size: 20px;\n}\n.status-progress-container .status-progress-item.hide-status {\n  display: none;\n}\n.status-progress-container .status-progress-title {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 500;\n}\n.status-progress-container .status-progress-info {\n  font-size: 13px;\n  -webkit-margin-before: 5px;\n          margin-block-start: 5px;\n  -webkit-margin-after: 5px;\n          margin-block-end: 5px;\n}\n.remove-icon {\n  cursor: pointer;\n  color: var(--ion-color-danger);\n  font-size: 16px;\n}\n.tile-bg-active {\n  background-color: var(--ion-color-categories-background) !important;\n}\n.tile-bg-inactive {\n  background: #fff !important;\n}\n.unavailable-tax tr {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  margin-bottom: 10px;\n}\n.searchBar {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  margin-bottom: 8px;\n}\n.searchBar .btnArea {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  gap: 8px;\n  padding: 0 12px;\n}\n.searchBar .btnArea ion-button {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tb3JkZXJzL2FkbWluLW9yZGVycy5wYWdlLnNjc3MiLCJzcmMvYXBwL2FkbWluL2FkbWluLW9yZGVycy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGFkbWluLW9yZGVyc1xcYWRtaW4tb3JkZXJzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUNBaEI7RUFDRSxRQUFBO0FERUY7QUNDQTtFQUNFLGdCQUFBO0FERUY7QUNERTtFQUNFLFVBQUE7QURHSjtBQ0ZJO0VBQ0UsZ0RBQUE7QURJTjtBQ0hNO0VBQ0UsaUJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsMkJBQUE7RUFBQSxvQkFBQTtBREtSO0FDQUE7RUFDQyxvQkFBQTtFQUFBLGFBQUE7RUFDQSxRQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBREdEO0FDRkM7RUFDQyxZQUFBO0FESUY7QUNEQztFQUNDLGVBQUE7QURHRjtBQ0NBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7QURFRjtBQ0FBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QURHRjtBQ0FBO0VBQ0UseUJBQUE7RUFDQSw2QkFBQTtBREdGO0FDQUE7RUFDRSxzR0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtBREdGO0FDQUE7RUFDRSxnREFBQTtBREdGO0FDQUE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FER0Y7QUNERTtFQUNFLGdCQUFBO0FER0o7QUNDQTtFQUNFLFlBQUE7QURFRjtBQ0NBO0VBQ0UsZUFBQTtBREVGO0FDQ0E7RUFDRSxjQUFBO0FERUY7QUNDQTtFQUNFLGdCQUFBO0FERUY7QUNDQTtFQUNFLGNBQUE7QURFRjtBQ0NBO0VBQ0UscUJBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtBREVGO0FDQ0E7RUFDRSwyQkFBQTtBREVGO0FDQ0E7RUFDRSxpQkFBQTtFQUNBLGlCQUFBO0FERUY7QUNDQTtFQUNFLGtCQUFBO0FERUY7QUNERTtFQUNFLGlCQUFBO0VBQ0EsMkJBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QURHSjtBQ0NBO0VBQ0Usa0JBQUE7QURFRjtBQ0RFO0VBQ0UsV0FBQTtBREdKO0FDRUU7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFBO0FEQ0o7QUNHQTtFQUNFLGdEQUFBO0VBQ0EsY0FBQTtBREFGO0FDR0U7RUFDRSxXQUFBO0FEQUo7QUNDSTtFQUFHLFlBQUE7RUFBYSwrQ0FBQTtBREdwQjtBQ0ZJO0VBQ0UsV0FBQTtBRElOO0FDSE07RUFBSSxXQUFBO0FETVY7QUNKSTtFQUFnQixXQUFBO0FET3BCO0FDTkk7RUFBZSwrQkFBQTtBRFNuQjtBQ1JJO0VBQVUsV0FBQTtBRFdkO0FDUEE7RUFDRSxzR0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FEVUY7QUNSQTtFQUNFLGVBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QURXRjtBQ1JBO0VBQ0UsYUFBQTtFQUNFLGtCQUFBO0VBQ0EsNkNBQUE7RUFDQSw4QkFBQTtFQUNBLCtCQUFBO0VBQ0EsZUFBQTtBRFdKO0FDUkE7RUFDSSxtQ0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtBRFdKO0FDVkk7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFBO0FEWU47QUNWRTtFQUNFLFdBQUE7QURZSjtBQ1hJO0VBQUcsY0FBQTtBRGNQO0FDYkk7RUFBYyxpQkFBQTtBRGdCbEI7QUNkRTtFQUNFLDBCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtBRGdCSjtBQ2ZJO0VBQUcsZUFBQTtFQUFnQixlQUFBO0FEbUJ2QjtBQ2xCSTtFQUFLLGdCQUFBO0VBQWlCLGVBQUE7QURzQjFCO0FDcEJFO0VBQ0UsMEJBQUE7RUFDQSw4QkFBQTtFQUNBLGtCQUFBO0FEc0JKO0FDbEJBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtBRHFCRjtBQ2xCQSwwREFBQTtBQUVBO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7QURvQkY7QUNsQkE7O0VBRUUsWUFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7RUFDQSwwQ0FBQTtFQUNBLHNDQUFBO0FEcUJGO0FDakJBOztFQUVFLHVDQUFBO0VBQ0EsbUNBQUE7QURvQkY7QUNmQTtFQUNFLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsK0JBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBRGtCRjtBQ2ZBO0VBQ0UsWUFBQTtFQUNBLHFCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsMENBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQ0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QURrQkY7QUNmQTtFQUNFLFdBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLDBDQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsU0FBQTtBRGtCRjtBQ2ZBO0VBQ0UsYUFBQTtBRGtCRjtBQ2ZBO0VBQ0UsMENBQUE7RUFDQSxzQ0FBQTtFQUNBLFdBQUE7QURrQkY7QUNmQTtFQUNFLFdBQUE7QURrQkY7QUNmQTtFQUNFLHVDQUFBO0VBQ0EsbUNBQUE7RUFDQSw0QkFBQTtBRGtCRjtBQ2ZBO0VBQ0UsVUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QURrQkY7QUNmQTtFQUNJLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxtQ0FBQTtVQUFBLDJCQUFBO0VBQ0EsWUFBQTtBRGtCSjtBQ2RBO0VBQ0UsK0JBQUE7RUFDRSxrQkFBQTtFQUNBLGFBQUE7QURpQko7QUNmQSw0REFBQTtBQUdBO0VBQ0UsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtBRGdCRjtBQ2JBO0VBQ0Usa0JBQUE7QURnQkY7QUNkQTtFQUNFLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBRGlCRjtBQ2RBO0VBQ0U7SUFBYSxnQkFBQTtFRGtCYjtBQUNGO0FDaEJBO0VBQ0U7SUFDRSxjQUFBO0lBQ0EsZ0JBQUE7RURrQkY7QUFDRjtBQ2ZBO0VBQ0U7SUFDRSxjQUFBO0lBQ0EsNkNBQUE7RURpQkY7QUFDRjtBQ2RBO0VBQ0U7SUFDRSw0QkFBQTtJQUFBLDZCQUFBO1lBQUEsc0JBQUE7RURnQkY7RUNmRTtJQUFlLGdCQUFBO0VEa0JqQjs7RUNoQkE7SUFDRSxnQkFBQTtJQUNBLG1CQUFBO0lBQ0EsZ0JBQUE7SUFDQSxVQUFBO0lBQ0EsU0FBQTtFRG1CRjs7RUNoQkE7SUFDRSxrQkFBQTtJQUNBLGVBQUE7SUFDQSxtQkFBQTtJQUNBLGdCQUFBO0VEbUJGO0VDbEJFO0lBQ0UsZ0JBQUE7RURvQko7RUNsQkU7SUFBWSxnQkFBQTtJQUFpQixnQkFBQTtFRHNCL0I7O0VDbkJBO0lBQ0Usa0JBQUE7SUFDQSxPQUFBO0lBQ0EsTUFBQTtFRHNCRjs7RUNuQkE7SUFDRSxrQkFBQTtJQUNBLE1BQUE7SUFDQSxVQUFBO0lBQ0EsVUFBQTtJQUNBLFlBQUE7RURzQkY7QUFDRjtBQ2pCQTtFQUNFLGFBQUE7RUFFQSxtQkFBQTtBRGtCRjtBQ2ZBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0FEa0JGO0FDZkE7RUFDRSxnQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHVCQUFBO1VBQUEsMkJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsZUFBQTtBRGtCRjtBQ2pCRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLGVBQUE7QURtQko7QUNqQkU7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0tBQUEsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0FEbUJOO0FDZkE7RUFDRSxhQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FEa0JGO0FDZkE7RUFFRSxlQUFBO0VBQ0EsWUFBQTtBRGlCRjtBQ2RBO0VBQ0UsZUFBQTtFQUNBLGtDQUFBO0FEaUJGO0FDaEJFO0VBQ0UsZUFBQTtBRGtCSjtBQ2RBO0VBQ0Usa0RBQUE7QURpQkY7QUNkQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtBRGlCRjtBQ2RDO0VBQ0MsZ0JBQUE7QURpQkY7QUNkQztFQUNDLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGdDQUFBO0VBQ0EsaUNBQUE7QURpQkY7QUNkQztFQUNDLGdCQUFBO0FEaUJGO0FDYkM7RUFDQyxnQkFBQTtFQUNBLFlBQUE7QURnQkY7QUNiQztFQUNDLGdCQUFBO0FEZ0JGO0FDWkM7RUFDQztJQUNFLFlBQUE7RURlRjs7RUNiQTtJQUNFLFlBQUE7RURnQkY7O0VDZEE7SUFDRSxZQUFBO0VEaUJGO0FBQ0Y7QUNkQztFQUNDLFlBQUE7RUFDQSxVQUFBO0VBQVksWUFBQTtBRGlCZDtBQ25CQztFQUNDLFlBQUE7RUFDQSxVQUFBO0VBQVksWUFBQTtBRGlCZDtBQ25CQztFQUNDLFlBQUE7RUFDQSxVQUFBO0VBQVksWUFBQTtBRGlCZDtBQ25CQztFQUNDLFlBQUE7RUFDQSxVQUFBO0VBQVksWUFBQTtBRGlCZDtBQ2RBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtBRGlCRjtBQ2ZFO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtBRGlCTjtBQ2RFO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0Esb0JBQUE7QURnQk47QUNkTTtFQUNJLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSwrQ0FBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FEZ0JWO0FDYk07RUFDSSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQ0FBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QURlVjtBQ1ZVO0VBQ0ksNEJBQUE7QURZZDtBQ1BNO0VBQ0ksWUFBQTtBRFNWO0FDUlU7RUFDSSwyQkFBQTtBRFVkO0FDUFU7RUFDSSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FEU2Q7QUNIVTtFQUNJLDhDQUFBO0VBQ0EsWUFBQTtBREtkO0FDRlU7RUFDSSxZQUFBO0VBQ0EsbUNBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBRElkO0FDQU07RUFDSSxhQUFBO0FERVY7QUNFRTtFQUNJLFNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QURBTjtBQ0dFO0VBQ0ksZUFBQTtFQUNBLDBCQUFBO1VBQUEsdUJBQUE7RUFDQSx5QkFBQTtVQUFBLHFCQUFBO0FERE47QUNLQTtFQUNFLGVBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7QURGRjtBQ0lBO0VBQ0UsbUVBQUE7QURERjtBQ0dBO0VBQ0UsMkJBQUE7QURBRjtBQ0lFO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLG1CQUFBO0FEREo7QUNLQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFFQSxrQkFBQTtBREhGO0FDS0U7RUFLRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0FEUEo7QUNESTtFQUNFLFdBQUE7QURHTiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2FkbWluLW9yZGVycy9hZG1pbi1vcmRlcnMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGNoYXJzZXQgXCJVVEYtOFwiO1xuLmxpc3QtaGVhZGVyIHtcbiAgdG9wOiAwcHg7XG59XG5cbi5saXN0LWNvbnRhaW5lciB7XG4gIG1hcmdpbi10b3A6IDQ1cHg7XG59XG4ubGlzdC1jb250YWluZXIgaW9uLWdyaWQge1xuICBwYWRkaW5nOiAwO1xufVxuLmxpc3QtY29udGFpbmVyIGlvbi1ncmlkIGlvbi1yb3cge1xuICBib3JkZXItYm90dG9tOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XG59XG4ubGlzdC1jb250YWluZXIgaW9uLWdyaWQgaW9uLXJvdyBpb24tY29sIHtcbiAgcGFkZGluZzogMTZweCA4cHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xufVxuXG4ucHJvZHVjdC1zdWJfaGVhZGluZyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogNXB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLnByb2R1Y3Qtc3ViX2hlYWRpbmctaW1nIHtcbiAgaGVpZ2h0OiAxM3B4O1xufVxuLnByb2R1Y3Qtc3ViX2hlYWRpbmctdGV4dCB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbn1cblxuLmlkLCAuZGF0ZSwgLnN0YXR1cyB7XG4gIHdpZHRoOiAxMDBweDtcbiAgbWF4LXdpZHRoOiAxMDBweDtcbiAgLyp0ZXh0LWFsaWduOiBjZW50ZXI7Ki9cbn1cblxuLmFjdGlvbiB7XG4gIHdpZHRoOiAxMTBweDtcbiAgbWF4LXdpZHRoOiAxMTBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ubmFtZSB7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA0MTBweCk7XG4gIG1heC13aWR0aDogY2FsYygxMDAlIC0gNDEwcHgpO1xufVxuXG4uYW8tcHJvZHVjdC1pbWFnZSB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcImh0dHBzOi8vczUuZ2lmeXUuY29tL2ltYWdlcy9sb2FkZXJiYjE5ZWZjYzI3NDllMTE1LmdpZlwiKSBjZW50ZXIgbm8tcmVwZWF0O1xuICB3aWR0aDogNjRweDtcbiAgaGVpZ2h0OiA2NHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmMGYwZjA7XG59XG5cbi5ib3JkZXItYm90dG9tIHtcbiAgYm9yZGVyLWJvdHRvbTogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xufVxuXG4uZi1kLWMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmYtZC1jIC5tLXMtYnRuIHtcbiAgbWFyZ2luLXRvcDogMTVweDtcbn1cblxuLlBlbmRpbmcge1xuICBjb2xvcjogYmxhY2s7XG59XG5cbi5Db25maXJtZWQge1xuICBjb2xvcjogZGFya2JsdWU7XG59XG5cbi5EaXNwYXRjaGVkIHtcbiAgY29sb3I6ICM5Qjg3MEM7XG59XG5cbi5EZWxpdmVyZWQge1xuICBjb2xvcjogZGFya2dyZWVuO1xufVxuXG4uQ2FuY2VsbGVkLCAuUmV0dXJuZWQge1xuICBjb2xvcjogZGFya3JlZDtcbn1cblxuLmRpdmlkZXIge1xuICBiYWNrZ3JvdW5kOiBsaWdodGdyYXk7XG4gIGhlaWdodDogMXB4O1xuICBtYXJnaW46IDhweDtcbn1cblxuaW9uLXNlbGVjdCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cblxuLnJvd0hlYWRpbmcge1xuICBmb250LXNpemU6IG1lZGl1bTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5zdGF0dXNMaXN0IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLnN0YXR1c0xpc3QgcCB7XG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbjogOHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5mb290ZXJCdG4ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uZm9vdGVyQnRuIGlvbi1idXR0b24ge1xuICBtYXJnaW46IDhweDtcbn1cblxuLmFkZHJlc3Mtd3JhcCBoMyB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgbWFyZ2luOiAwO1xufVxuXG4uZGl2aWRlciB7XG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgbWFyZ2luOiAyNnB4IDA7XG59XG5cbi5pdGVtcy13cmFwcGVyIHRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG59XG4uaXRlbXMtd3JhcHBlciB0YWJsZSB0ZCB7XG4gIHBhZGRpbmc6IDhweDtcbiAgYm9yZGVyLWJvdHRvbTogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KSAxcHggc29saWQ7XG59XG4uaXRlbXMtd3JhcHBlciB0YWJsZSB0ZC5pbWcge1xuICB3aWR0aDogNjRweDtcbn1cbi5pdGVtcy13cmFwcGVyIHRhYmxlIHRkLmltZyBpbWcge1xuICB3aWR0aDogMTAwJTtcbn1cbi5pdGVtcy13cmFwcGVyIHRhYmxlIHRkLnByaWNlLWRldGFpbCB7XG4gIGNvbG9yOiAjMzMzO1xufVxuLml0ZW1zLXdyYXBwZXIgdGFibGUgdGQudG90YWwtcHJpY2Uge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xufVxuLml0ZW1zLXdyYXBwZXIgdGFibGUgLml0ZW0tcXR5IHtcbiAgY29sb3I6ICMzMzM7XG59XG5cbi5wcm9kdWN0LWltYWdlIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzL2xvYWRlcmJiMTllZmNjMjc0OWUxMTUuZ2lmXCIpIGNlbnRlciBuby1yZXBlYXQ7XG4gIHdpZHRoOiAxMDBweDtcbiAgaGVpZ2h0OiA4MHB4O1xufVxuXG4ucHJvZHVjdC1uYW1lIHtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBtYXJnaW4tdG9wOiA3cHg7XG4gIG1hcmdpbi1ib3R0b206IDdweDtcbn1cblxuLnRvZ2dsZSB7XG4gIHBhZGRpbmc6IDI0cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyLXRvcDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xuICBtYXJnaW46IDI2cHggLTI0cHggLTI0cHggLTI0cHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLm9yZGVyLXN1bW1lcnktd3JhcHBlciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICBwYWRkaW5nOiAyNHB4O1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xufVxuLm9yZGVyLXN1bW1lcnktd3JhcHBlciBoMyB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgbWFyZ2luOiAwO1xufVxuLm9yZGVyLXN1bW1lcnktd3JhcHBlciB0YWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xufVxuLm9yZGVyLXN1bW1lcnktd3JhcHBlciB0YWJsZSB0ZCB7XG4gIHBhZGRpbmc6IDRweCAwO1xufVxuLm9yZGVyLXN1bW1lcnktd3JhcHBlciB0YWJsZSB0ZDpsYXN0LWNoaWxkIHtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG4ub3JkZXItc3VtbWVyeS13cmFwcGVyIC5zdWItdG90YWwtd3JhcCB7XG4gIGJvcmRlci10b3A6ICNjY2MgMXB4IHNvbGlkO1xuICBtYXJnaW4tdG9wOiAxNnB4O1xuICBwYWRkaW5nLXRvcDogMTZweDtcbn1cbi5vcmRlci1zdW1tZXJ5LXdyYXBwZXIgLnN1Yi10b3RhbC13cmFwIGgzIHtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBkaXNwbGF5OiBpbmxpbmU7XG59XG4ub3JkZXItc3VtbWVyeS13cmFwcGVyIC5zdWItdG90YWwtd3JhcCBzcGFuIHtcbiAgbWFyZ2luLWxlZnQ6IDZweDtcbiAgZm9udC1zaXplOiAxMHB4O1xufVxuLm9yZGVyLXN1bW1lcnktd3JhcHBlciAucGF5LW1ldGhvZC13cmFwIHtcbiAgYm9yZGVyLXRvcDogI2ZmZiAxcHggc29saWQ7XG4gIG1hcmdpbjogMTZweCAtMjRweCAtMjRweCAtMjRweDtcbiAgcGFkZGluZzogMTZweCAyNHB4O1xufVxuXG4uZWRpdC1vcmRlci1idG4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqIG11bHRpc3RlcCAqKioqKioqKioqKioqKioqKioqKioqKiovXG4ubXVsdGktc3RlcHMge1xuICBkaXNwbGF5OiB0YWJsZTtcbiAgdGFibGUtbGF5b3V0OiBmaXhlZDtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMjVweCAwIDEwcHggMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAtOCU7XG59XG5cbi5tdWx0aS1zdGVwcyA+IGxpLmlzLWFjdGl2ZTpiZWZvcmUsXG4ubXVsdGktc3RlcHMgPiBsaS5pcy1hY3RpdmUgfiBsaTpiZWZvcmUge1xuICBjb250ZW50OiBcIu+EjlwiO1xuICBmb250LWZhbWlseTogRmxhdGljb247XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG59XG5cbi5tdWx0aS1zdGVwcyA+IGxpLmlzLWFjdGl2ZTphZnRlcixcbi5tdWx0aS1zdGVwcyA+IGxpLmlzLWFjdGl2ZSB+IGxpOmFmdGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyYXkpO1xuICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmF5KTtcbn1cblxuLm11bHRpLXN0ZXBzID4gbGkge1xuICBjb3VudGVyLWluY3JlbWVudDogc3RlcE51bTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgcGFkZGluZzogMTZweCAwO1xufVxuXG4ubXVsdGktc3RlcHMgPiBsaTpiZWZvcmUge1xuICBjb250ZW50OiBcIu+EjlwiO1xuICBmb250LWZhbWlseTogRmxhdGljb247XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IDAgYXV0byA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgd2lkdGg6IDI0cHg7XG4gIGhlaWdodDogMjRweDtcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtc2l6ZTogMTBweDtcbn1cblxuLm11bHRpLXN0ZXBzID4gbGk6YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICBoZWlnaHQ6IDFweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDI5cHg7XG4gIGxlZnQ6IDUwJTtcbn1cblxuLm11bHRpLXN0ZXBzID4gbGk6bGFzdC1jaGlsZDphZnRlciB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5tdWx0aS1zdGVwcyA+IGxpLmlzLWFjdGl2ZTpiZWZvcmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICBjb2xvcjogI2ZmZjtcbn1cblxuLm11bHRpLXN0ZXBzID4gbGkuaXMtYWN0aXZlIH4gbGkge1xuICBjb2xvcjogIzExMTtcbn1cblxuLm11bHRpLXN0ZXBzID4gbGkuaXMtYWN0aXZlIH4gbGk6YmVmb3JlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyYXkpO1xuICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmF5KTtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmF5KTtcbn1cblxuLnJlc2V0LXBhc3N3b3JkLWNvbnRhaW5lciB7XG4gIHdpZHRoOiA5MCU7XG4gIG1hcmdpbjogMzJweCBhdXRvO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbnNwYW4uZGF0ZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgd2lkdGg6IDExMHB4O1xufVxuXG4uZml4LWhlaWdodCB7XG4gIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSAzMTVweCk7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgcGFkZGluZzogMTZweDtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKiptdWx0aXN0ZXAgZW5kKioqKioqKioqKioqKioqKioqKioqKioqL1xuLmNvbW1lbnQtYm94IHtcbiAgb3BhY2l0eTogMC40O1xuICBtYXJnaW4tbGVmdDogMTBweDtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uY29tbWVudC1pbWctY29uYXRpbmVyIHtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4uY29tbWVudC1pbWcge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZWNlY2VjO1xuICB3aWR0aDogNTBweDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDE0MDBweCkge1xuICAubXVsdGktc3RlcHMge1xuICAgIHBvc2l0aW9uOiBzdGF0aWM7XG4gIH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiAxMjAwcHgpIHtcbiAgLm9yZGVyLXN1bW1lcnktd3JhcHBlciB7XG4gICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgbWFyZ2luLXRvcDogMjZweDtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDk5MnB4KSB7XG4gIC5hZGRyZXNzLXdyYXAge1xuICAgIGJvcmRlci1sZWZ0OiAwO1xuICAgIGJvcmRlci10b3A6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pIDFweCBzb2xpZDtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XG4gIC5oZWFkZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cbiAgLmhlYWRlciAuYnRuLTItb3V0bGluZSB7XG4gICAgbWFyZ2luLXRvcDogMTZweDtcbiAgfVxuXG4gIC5tdWx0aS1zdGVwcyB7XG4gICAgZGlzcGxheTogaW5pdGlhbDtcbiAgICB0YWJsZS1sYXlvdXQ6IHVuc2V0O1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgcGFkZGluZzogMDtcbiAgICBtYXJnaW46IDA7XG4gIH1cblxuICAubXVsdGktc3RlcHMgPiBsaSB7XG4gICAgZGlzcGxheTogbGlzdC1pdGVtO1xuICAgIHBhZGRpbmc6IDAgMzJweDtcbiAgICBtYXJnaW4tYm90dG9tOiAzNnB4O1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gIH1cbiAgLm11bHRpLXN0ZXBzID4gbGkgc3Bhbi5kYXRlIHtcbiAgICBwb3NpdGlvbjogc3RhdGljO1xuICB9XG4gIC5tdWx0aS1zdGVwcyA+IGxpIHNwYW4uc3RhdHVzIHtcbiAgICBtYXJnaW4tbGVmdDogNnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIH1cblxuICAubXVsdGktc3RlcHMgPiBsaTpiZWZvcmUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHRvcDogMDtcbiAgfVxuXG4gIC5tdWx0aS1zdGVwcyA+IGxpOmFmdGVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDEycHg7XG4gICAgd2lkdGg6IDFweDtcbiAgICBoZWlnaHQ6IDYwcHg7XG4gIH1cbn1cbi5wcmV2aWV3SW1nIHtcbiAgcGFkZGluZzogMTBweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuLnVzZXItcmF0aW5nLXBob3RvcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi51cGxvYWRlZC1kb2MtaW1ncyB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuLnVwbG9hZGVkLWRvYy1pbWdzIGEge1xuICBkaXNwbGF5OiBmbGV4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4udXBsb2FkZWQtZG9jLWltZ3MgaW9uLWltZyB7XG4gIHdpZHRoOiA2MHB4O1xuICBoZWlnaHQ6IDYwcHg7XG4gIG9iamVjdC1maXQ6IGZpbGw7XG4gIG1hcmdpbi1yaWdodDogMTVweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbn1cblxuLmludm9pY2VCdG4sIC52aWV3LWJ0biB7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmNDBkMzA7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y0MGQzMDtcbiAgY29sb3I6IHdoaXRlO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIHdpZHRoOiAxMzBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4udmlldy1idG4ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHdpZHRoOiAyMDBweDtcbn1cblxuLm9yZGVyR3JpZCB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cbi5vcmRlckdyaWQgc3Ryb25nIHtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG4ub3JkZXJHcmlkOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWNhdGVnb3JpZXMtYmFja2dyb3VuZCk7XG59XG5cbiNzY3JvbGwxIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA4MnZoO1xufVxuXG4jc2Nyb2xsMTpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbiNzY3JvbGwyIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA3NnZoO1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgbGlnaHRncmF5O1xufVxuXG4jc2Nyb2xsMjpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbiNzY3JvbGwzIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA3OHZoO1xufVxuXG4jc2Nyb2xsMzpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4taGVpZ2h0OiAxMjAwcHgpIHtcbiAgI3Njcm9sbDEge1xuICAgIGhlaWdodDogOTJ2aDtcbiAgfVxuXG4gICNzY3JvbGwyIHtcbiAgICBoZWlnaHQ6IDg2dmg7XG4gIH1cblxuICAjc2Nyb2xsMyB7XG4gICAgaGVpZ2h0OiA4OHZoO1xuICB9XG59XG46OnBsYWNlaG9sZGVyIHtcbiAgY29sb3I6IGJsYWNrO1xuICBvcGFjaXR5OiAxO1xuICAvKiBGaXJlZm94ICovXG59XG5cbi5zdGF0dXMtcHJvZ3Jlc3MtY29udGFpbmVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLnN0YXR1cy1wcm9ncmVzcy1jb250YWluZXIgLnN0YXR1cy1wcm9ncmVzcyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn1cbi5zdGF0dXMtcHJvZ3Jlc3MtY29udGFpbmVyIC5zdGF0dXMtcHJvZ3Jlc3MtaXRlbSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWluLWhlaWdodDogNzVweDtcbiAgY291bnRlci1pbmNyZW1lbnQ6IGxpc3Q7XG4gIHBhZGRpbmctbGVmdDogMC41cmVtO1xufVxuLnN0YXR1cy1wcm9ncmVzcy1jb250YWluZXIgLnN0YXR1cy1wcm9ncmVzcy1pdGVtOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogLTI3cHg7XG4gIHRvcDogMjZweDtcbiAgaGVpZ2h0OiA0OXB4O1xuICB3aWR0aDogMnB4O1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uc3RhdHVzLXByb2dyZXNzLWNvbnRhaW5lciAuc3RhdHVzLXByb2dyZXNzLWl0ZW06YWZ0ZXIge1xuICBjb250ZW50OiBcIuKck1wiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogLTQwcHg7XG4gIHdpZHRoOiAyNnB4O1xuICBoZWlnaHQ6IDI2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLnN0YXR1cy1wcm9ncmVzcy1jb250YWluZXIgLnN0YXR1cy1wcm9ncmVzcy1pdGVtOmxhc3QtY2hpbGQ6YmVmb3JlLCAuc3RhdHVzLXByb2dyZXNzLWNvbnRhaW5lciAuc3RhdHVzLXByb2dyZXNzLWl0ZW0ubGFzdC1zdGF0dXM6YmVmb3JlIHtcbiAgYm9yZGVyLWxlZnQ6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5zdGF0dXMtcHJvZ3Jlc3MtY29udGFpbmVyIC5zdGF0dXMtcHJvZ3Jlc3MtaXRlbS5zdGF0dXMtbWlzc2luZyB7XG4gIG9wYWNpdHk6IDAuNTtcbn1cbi5zdGF0dXMtcHJvZ3Jlc3MtY29udGFpbmVyIC5zdGF0dXMtcHJvZ3Jlc3MtaXRlbS5zdGF0dXMtbWlzc2luZzpiZWZvcmUge1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkICNjY2M7XG59XG4uc3RhdHVzLXByb2dyZXNzLWNvbnRhaW5lciAuc3RhdHVzLXByb2dyZXNzLWl0ZW0uc3RhdHVzLW1pc3Npbmc6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kOiAjY2NjO1xuICBvcGFjaXR5OiAwLjY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLnN0YXR1cy1wcm9ncmVzcy1jb250YWluZXIgLnN0YXR1cy1wcm9ncmVzcy1pdGVtLnN0YXR1cy1jYW5jZWxsZWQ6YmVmb3JlIHtcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbiAgaGVpZ2h0OiAzMHB4O1xufVxuLnN0YXR1cy1wcm9ncmVzcy1jb250YWluZXIgLnN0YXR1cy1wcm9ncmVzcy1pdGVtLnN0YXR1cy1jYW5jZWxsZWQ6YWZ0ZXIge1xuICBjb250ZW50OiBcIsOXXCI7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAyMHB4O1xufVxuLnN0YXR1cy1wcm9ncmVzcy1jb250YWluZXIgLnN0YXR1cy1wcm9ncmVzcy1pdGVtLmhpZGUtc3RhdHVzIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi5zdGF0dXMtcHJvZ3Jlc3MtY29udGFpbmVyIC5zdGF0dXMtcHJvZ3Jlc3MtdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cbi5zdGF0dXMtcHJvZ3Jlc3MtY29udGFpbmVyIC5zdGF0dXMtcHJvZ3Jlc3MtaW5mbyB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgbWFyZ2luLWJsb2NrLXN0YXJ0OiA1cHg7XG4gIG1hcmdpbi1ibG9jay1lbmQ6IDVweDtcbn1cblxuLnJlbW92ZS1pY29uIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn1cblxuLnRpbGUtYmctYWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWNhdGVnb3JpZXMtYmFja2dyb3VuZCkgIWltcG9ydGFudDtcbn1cblxuLnRpbGUtYmctaW5hY3RpdmUge1xuICBiYWNrZ3JvdW5kOiAjZmZmICFpbXBvcnRhbnQ7XG59XG5cbi51bmF2YWlsYWJsZS10YXggdHIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi5zZWFyY2hCYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn1cbi5zZWFyY2hCYXIgLmJ0bkFyZWEge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiAwIDEycHg7XG59XG4uc2VhcmNoQmFyIC5idG5BcmVhIGlvbi1idXR0b24ge1xuICB3aWR0aDogMTAwJTtcbn0iLCIubGlzdC1oZWFkZXJ7XHJcbiAgdG9wOiAwcHg7XHJcbn1cclxuXHJcbi5saXN0LWNvbnRhaW5lcntcclxuICBtYXJnaW4tdG9wOiA0NXB4O1xyXG4gIGlvbi1ncmlke1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGlvbi1yb3d7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pIDFweCBzb2xpZDtcclxuICAgICAgaW9uLWNvbHtcclxuICAgICAgICBwYWRkaW5nOjE2cHggOHB4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuLnByb2R1Y3Qtc3ViX2hlYWRpbmd7XHJcblx0ZGlzcGxheTogZmxleDtcclxuXHRnYXA6IDVweDtcclxuXHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdCYtaW1ne1xyXG5cdFx0aGVpZ2h0OiAxM3B4O1xyXG5cdFx0Ly8gcGFkZGluZy1ib3R0b206IDVweDtcclxuXHR9XHJcblx0Ji10ZXh0e1xyXG5cdFx0Zm9udC1zaXplOiAxMnB4O1xyXG5cdFx0Ly8gY29sb3I6ICM4ODg4ODg7XHJcblx0fVxyXG59XHJcbi5pZCwuZGF0ZSwuc3RhdHVze1xyXG4gIHdpZHRoOiAxMDBweDtcclxuICBtYXgtd2lkdGg6IDEwMHB4O1xyXG4gIC8qdGV4dC1hbGlnbjogY2VudGVyOyovXHJcbn1cclxuLmFjdGlvbntcclxuICB3aWR0aDogMTEwcHg7XHJcbiAgbWF4LXdpZHRoOiAxMTBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5uYW1le1xyXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA0MTBweCk7XHJcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSA0MTBweCk7XHJcbn1cclxuXHJcbi5hby1wcm9kdWN0LWltYWdlIHtcclxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoJ2h0dHBzOi8vczUuZ2lmeXUuY29tL2ltYWdlcy9sb2FkZXJiYjE5ZWZjYzI3NDllMTE1LmdpZicpIGNlbnRlciBuby1yZXBlYXQ7XHJcbiAgd2lkdGg6NjRweDtcclxuICBoZWlnaHQ6IDY0cHg7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNmMGYwZjA7XHJcbn1cclxuXHJcbi5ib3JkZXItYm90dG9te1xyXG4gIGJvcmRlci1ib3R0b206IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pIDFweCBzb2xpZDtcclxufVxyXG5cclxuLmYtZC1jIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgLm0tcy1idG4ge1xyXG4gICAgbWFyZ2luLXRvcDogMTVweDtcclxuICB9XHJcbn1cclxuXHJcbi5QZW5kaW5ne1xyXG4gIGNvbG9yOiBibGFja1xyXG59XHJcblxyXG4uQ29uZmlybWVke1xyXG4gIGNvbG9yOiBkYXJrYmx1ZVxyXG59XHJcblxyXG4uRGlzcGF0Y2hlZHtcclxuICBjb2xvcjogIzlCODcwQ1xyXG59XHJcblxyXG4uRGVsaXZlcmVke1xyXG4gIGNvbG9yOiBkYXJrZ3JlZW5cclxufVxyXG5cclxuLkNhbmNlbGxlZCwgLlJldHVybmVke1xyXG4gIGNvbG9yOiBkYXJrcmVkXHJcbn1cclxuXHJcbi5kaXZpZGVye1xyXG4gIGJhY2tncm91bmQ6IGxpZ2h0Z3JheTtcclxuICBoZWlnaHQ6IDFweDtcclxuICBtYXJnaW46IDhweFxyXG59XHJcblxyXG5pb24tc2VsZWN0e1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxufVxyXG5cclxuLnJvd0hlYWRpbmd7XHJcbiAgZm9udC1zaXplOiBtZWRpdW07XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5zdGF0dXNMaXN0e1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBwe1xyXG4gICAgZm9udC1zaXplOiBtZWRpdW07XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgbWFyZ2luOiA4cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG59XHJcblxyXG4uZm9vdGVyQnRue1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBpb24tYnV0dG9ue1xyXG4gICAgbWFyZ2luOiA4cHg7XHJcbiAgfVxyXG59XHJcblxyXG4uYWRkcmVzcy13cmFwe1xyXG4gIGgze1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIG1hcmdpbjogMDtcclxuICB9XHJcbn1cclxuXHJcbi5kaXZpZGVye1xyXG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICBtYXJnaW46IDI2cHggMDtcclxufVxyXG4uaXRlbXMtd3JhcHBlcntcclxuICB0YWJsZXtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgdGR7cGFkZGluZzogOHB4O2JvcmRlci1ib3R0b206IHZhcigtLWlvbi1jb2xvci1saWdodCkgMXB4IHNvbGlkO31cclxuICAgIHRkLmltZ3tcclxuICAgICAgd2lkdGg6IDY0cHg7XHJcbiAgICAgIGltZ3t3aWR0aDogMTAwJTt9XHJcbiAgICB9XHJcbiAgICB0ZC5wcmljZS1kZXRhaWx7Y29sb3I6ICMzMzM7fVxyXG4gICAgdGQudG90YWwtcHJpY2V7Y29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTt9XHJcbiAgICAuaXRlbS1xdHl7Y29sb3I6IzMzM31cclxuICAgIFxyXG4gIH1cclxufVxyXG4ucHJvZHVjdC1pbWFnZXtcclxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoJ2h0dHBzOi8vczUuZ2lmeXUuY29tL2ltYWdlcy9sb2FkZXJiYjE5ZWZjYzI3NDllMTE1LmdpZicpIGNlbnRlciBuby1yZXBlYXQ7XHJcbiAgd2lkdGg6IDEwMHB4O1xyXG4gIGhlaWdodDogODBweDtcclxufVxyXG4ucHJvZHVjdC1uYW1le1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBtYXJnaW4tdG9wOiA3cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogN3B4O1xyXG59XHJcblxyXG4udG9nZ2xle1xyXG4gIHBhZGRpbmc6IDI0cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBib3JkZXItdG9wOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XHJcbiAgICBtYXJnaW46IDI2cHggLTI0cHggLTI0cHggLTI0cHg7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4ub3JkZXItc3VtbWVyeS13cmFwcGVye1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgICBwYWRkaW5nOiAyNHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICAgIGgze1xyXG4gICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgIH1cclxuICB0YWJsZXtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgdGR7cGFkZGluZzogNHB4IDA7fVxyXG4gICAgdGQ6bGFzdC1jaGlsZHt0ZXh0LWFsaWduOiByaWdodDt9XHJcbiAgfVxyXG4gIC5zdWItdG90YWwtd3JhcHtcclxuICAgIGJvcmRlci10b3A6ICNjY2MgMXB4IHNvbGlkO1xyXG4gICAgbWFyZ2luLXRvcDogMTZweDtcclxuICAgIHBhZGRpbmctdG9wOiAxNnB4O1xyXG4gICAgaDN7Zm9udC1zaXplOiAxOHB4O2Rpc3BsYXk6IGlubGluZTt9XHJcbiAgICBzcGFue21hcmdpbi1sZWZ0OiA2cHg7Zm9udC1zaXplOiAxMHB4O31cclxuICB9XHJcbiAgLnBheS1tZXRob2Qtd3JhcHtcclxuICAgIGJvcmRlci10b3A6ICNmZmYgMXB4IHNvbGlkO1xyXG4gICAgbWFyZ2luOiAxNnB4IC0yNHB4IC0yNHB4IC0yNHB4O1xyXG4gICAgcGFkZGluZzogMTZweCAyNHB4O1xyXG4gIH1cclxufVxyXG5cclxuLmVkaXQtb3JkZXItYnRue1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKiBtdWx0aXN0ZXAgKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLm11bHRpLXN0ZXBzIHtcclxuICBkaXNwbGF5OiB0YWJsZTtcclxuICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIHBhZGRpbmc6IDI1cHggMCAxMHB4IDA7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGxlZnQ6LTglO1xyXG59XHJcbi5tdWx0aS1zdGVwcz5saS5pcy1hY3RpdmU6YmVmb3JlLFxyXG4ubXVsdGktc3RlcHM+bGkuaXMtYWN0aXZlfmxpOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYxMGVcIjtcclxuICBmb250LWZhbWlseTogRmxhdGljb247XHJcbiAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcblxyXG59XHJcblxyXG4ubXVsdGktc3RlcHM+bGkuaXMtYWN0aXZlOmFmdGVyLFxyXG4ubXVsdGktc3RlcHM+bGkuaXMtYWN0aXZlfmxpOmFmdGVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZ3JheSk7XHJcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZ3JheSk7XHJcbn1cclxuXHJcblxyXG5cclxuLm11bHRpLXN0ZXBzPmxpIHtcclxuICBjb3VudGVyLWluY3JlbWVudDogc3RlcE51bTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgcGFkZGluZzogMTZweCAwO1xyXG59XHJcblxyXG4ubXVsdGktc3RlcHM+bGk6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcZjEwZVwiO1xyXG4gIGZvbnQtZmFtaWx5OiBGbGF0aWNvbjtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBtYXJnaW46IDAgYXV0byA0cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG4gIHdpZHRoOiAyNHB4O1xyXG4gIGhlaWdodDogMjRweDtcclxuICBsaW5lLWhlaWdodDogMjRweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICBib3JkZXItd2lkdGg6IDFweDtcclxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xyXG4gIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgei1pbmRleDogMTtcclxuICBjb2xvcjogI2ZmZjtcclxuICBmb250LXNpemU6IDEwcHg7XHJcbn1cclxuXHJcbi5tdWx0aS1zdGVwcz5saTphZnRlciB7XHJcbiAgY29udGVudDogJyc7XHJcbiAgaGVpZ2h0OiAxcHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjp2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMjlweDtcclxuICBsZWZ0OiA1MCU7XHJcbn1cclxuXHJcbi5tdWx0aS1zdGVwcz5saTpsYXN0LWNoaWxkOmFmdGVyIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4ubXVsdGktc3RlcHM+bGkuaXMtYWN0aXZlOmJlZm9yZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG4gIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG59XHJcblxyXG4ubXVsdGktc3RlcHM+bGkuaXMtYWN0aXZlfmxpIHtcclxuICBjb2xvcjojMTExO1xyXG59XHJcblxyXG4ubXVsdGktc3RlcHM+bGkuaXMtYWN0aXZlfmxpOmJlZm9yZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyYXkpO1xyXG4gIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyYXkpO1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZ3JheSk7XHJcbn1cclxuXHJcbi5yZXNldC1wYXNzd29yZC1jb250YWluZXIge1xyXG4gIHdpZHRoOiA5MCU7XHJcbiAgbWFyZ2luOiAzMnB4IGF1dG87XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5zcGFuLmRhdGV7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XHJcbiAgICB3aWR0aDogMTEwcHg7XHJcbn1cclxuXHJcblxyXG4uZml4LWhlaWdodHtcclxuICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMzE1cHgpO1xyXG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xyXG4gICAgcGFkZGluZzogMTZweDtcclxufVxyXG4vKioqKioqKioqKioqKioqKioqKioqKm11bHRpc3RlcCBlbmQqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuLmNvbW1lbnQtYm94e1xyXG4gIG9wYWNpdHk6IDAuNDtcclxuICBtYXJnaW4tbGVmdDogMTBweDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi5jb21tZW50LWltZy1jb25hdGluZXJ7XHJcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG59XHJcbi5jb21tZW50LWltZ3tcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZWNlY2VjO1xyXG4gIHdpZHRoOiA1MHB4O1xyXG4gIGhlaWdodDogNTBweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbkBtZWRpYShtYXgtd2lkdGg6MTQwMHB4KXtcclxuICAubXVsdGktc3RlcHN7cG9zaXRpb246IHN0YXRpYzt9XHJcbn1cclxuXHJcbkBtZWRpYShtYXgtd2lkdGg6MTIwMHB4KXtcclxuICAub3JkZXItc3VtbWVyeS13cmFwcGVye1xyXG4gICAgbWFyZ2luLWxlZnQ6IDA7XHJcbiAgICBtYXJnaW4tdG9wOiAyNnB4O1xyXG5cclxuICB9XHJcbn1cclxuQG1lZGlhKG1heC13aWR0aDo5OTJweCl7XHJcbiAgLmFkZHJlc3Mtd3JhcHtcclxuICAgIGJvcmRlci1sZWZ0OiAwO1xyXG4gICAgYm9yZGVyLXRvcDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhKG1heC13aWR0aDo1MDBweCl7XHJcbiAgLmhlYWRlcntcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAuYnRuLTItb3V0bGluZXttYXJnaW4tdG9wOiAxNnB4O31cclxuICB9XHJcbiAgLm11bHRpLXN0ZXBze1xyXG4gICAgZGlzcGxheTogaW5pdGlhbDtcclxuICAgIHRhYmxlLWxheW91dDogdW5zZXQ7XHJcbiAgICBsaXN0LXN0eWxlOiBub25lO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIG1hcmdpbjogMDtcclxuICB9XHJcblxyXG4gIC5tdWx0aS1zdGVwcz5saXtcclxuICAgIGRpc3BsYXk6IGxpc3QtaXRlbTtcclxuICAgIHBhZGRpbmc6IDAgMzJweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDM2cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgc3Bhbi5kYXRle1xyXG4gICAgICBwb3NpdGlvbjogc3RhdGljO1xyXG4gICAgfVxyXG4gICAgc3Bhbi5zdGF0dXN7bWFyZ2luLWxlZnQ6IDZweDtmb250LXdlaWdodDogNTAwO31cclxuICB9XHJcblxyXG4gIC5tdWx0aS1zdGVwcz5saTpiZWZvcmV7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgdG9wOiAwO1xyXG4gIH1cclxuXHJcbiAgLm11bHRpLXN0ZXBzPmxpOmFmdGVyIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDowO1xyXG4gICAgbGVmdDogMTJweDtcclxuICAgIHdpZHRoOiAxcHg7XHJcbiAgICBoZWlnaHQ6IDYwcHg7XHJcbiAgICB9XHJcblxyXG4gIFxyXG59XHJcblxyXG4ucHJldmlld0ltZ3tcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIC8vIHdpZHRoOiAyMDBweDtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4XHJcbn1cclxuXHJcbi51c2VyLXJhdGluZy1waG90b3N7XHJcbiAgZGlzcGxheTogZmxleFxyXG59XHJcblxyXG4udXBsb2FkZWQtZG9jLWltZ3Mge1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgYSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuICBpb24taW1nIHtcclxuICAgICAgd2lkdGg6IDYwcHg7XHJcbiAgICAgIGhlaWdodDogNjBweDtcclxuICAgICAgb2JqZWN0LWZpdDogZmlsbDtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xyXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIH1cclxufVxyXG5cclxuLmludm9pY2VCdG57XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZjQwZDMwO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjQwZDMwO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgd2lkdGg6IDEzMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlclxyXG59XHJcblxyXG4udmlldy1idG4ge1xyXG4gIEBleHRlbmQgLmludm9pY2VCdG47XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHdpZHRoOiAyMDBweDtcclxufVxyXG5cclxuLm9yZGVyR3JpZHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICBzdHJvbmcge1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG4gIH1cclxufVxyXG5cclxuLm9yZGVyR3JpZDpob3ZlcntcclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItY2F0ZWdvcmllcy1iYWNrZ3JvdW5kKTtcclxufVxyXG5cclxuI3Njcm9sbDF7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDgydmhcclxuIH1cclxuXHJcbiAjc2Nyb2xsMTpob3ZlcntcclxuICBvdmVyZmxvdy15OiBhdXRvXHJcbiB9XHJcblxyXG4gI3Njcm9sbDJ7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDc2dmg7XHJcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gfVxyXG5cclxuICNzY3JvbGwyOmhvdmVye1xyXG4gIG92ZXJmbG93LXk6IGF1dG9cclxuIH1cclxuXHJcblxyXG4gI3Njcm9sbDN7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDc4dmhcclxuIH1cclxuXHJcbiAjc2Nyb2xsMzpob3ZlcntcclxuICBvdmVyZmxvdy15OiBhdXRvXHJcbiB9XHJcblxyXG5cclxuIEBtZWRpYSBzY3JlZW4gYW5kKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xyXG4gICNzY3JvbGwxe1xyXG4gICAgaGVpZ2h0OiA5MnZoO1xyXG4gICB9XHJcbiAgI3Njcm9sbDJ7XHJcbiAgICBoZWlnaHQ6IDg2dmg7XHJcbiAgIH1cclxuICAjc2Nyb2xsM3tcclxuICAgIGhlaWdodDogODh2aDtcclxuICAgfVxyXG4gfVxyXG5cclxuIDo6cGxhY2Vob2xkZXIge1xyXG4gIGNvbG9yOiBibGFjaztcclxuICBvcGFjaXR5OiAxOyAvKiBGaXJlZm94ICovXHJcbn1cclxuXHJcbi5zdGF0dXMtcHJvZ3Jlc3MtY29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgLnN0YXR1cy1wcm9ncmVzcyB7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgbGlzdC1zdHlsZTogbm9uZTtcclxuICB9XHJcbiAgXHJcbiAgLnN0YXR1cy1wcm9ncmVzcy1pdGVtIHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBtaW4taGVpZ2h0OiA3NXB4O1xyXG4gICAgICBjb3VudGVyLWluY3JlbWVudDogbGlzdDtcclxuICAgICAgcGFkZGluZy1sZWZ0OiAwLjVyZW07XHJcbiAgXHJcbiAgICAgICY6YmVmb3JlIHtcclxuICAgICAgICAgIGNvbnRlbnQ6IFwiXCI7XHJcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICBsZWZ0OiAtMjdweDtcclxuICAgICAgICAgIHRvcDogMjZweDtcclxuICAgICAgICAgIGhlaWdodDogNDlweDtcclxuICAgICAgICAgIHdpZHRoOiAycHg7XHJcbiAgICAgICAgICBib3JkZXItbGVmdDogMnB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIH1cclxuICBcclxuICAgICAgJjphZnRlciB7XHJcbiAgICAgICAgICBjb250ZW50OiBcIlxcMjcxM1wiO1xyXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgICAgbGVmdDogLTQwcHg7XHJcbiAgICAgICAgICB3aWR0aDogMjZweDtcclxuICAgICAgICAgIGhlaWdodDogMjZweDtcclxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxuICAgICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjVyZW07XHJcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC8vSGlkZSBib3JkZXIgZm9yIExhc3QgU3RlcFxyXG4gICAgICAmOmxhc3QtY2hpbGQsICYubGFzdC1zdGF0dXMge1xyXG4gICAgICAgICAgJjpiZWZvcmUge1xyXG4gICAgICAgICAgICAgIGJvcmRlci1sZWZ0OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICBcclxuICAgICAgLy9pbmNvbXBsZXRlIHN0YXR1c1xyXG4gICAgICAmLnN0YXR1cy1taXNzaW5nIHtcclxuICAgICAgICAgIG9wYWNpdHk6IC41O1xyXG4gICAgICAgICAgJjpiZWZvcmUge1xyXG4gICAgICAgICAgICAgIGJvcmRlci1sZWZ0OiAycHggc29saWQgI2NjYztcclxuICAgICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgICAmOmFmdGVyIHtcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjY2NjO1xyXG4gICAgICAgICAgICAgIG9wYWNpdHk6IC42O1xyXG4gICAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC8vY2FuY2VsbGVkIG9yIHJlamVjdGVkIHN0YXR1c1xyXG4gICAgICAmLnN0YXR1cy1jYW5jZWxsZWQge1xyXG4gICAgICAgICAgJjpiZWZvcmUge1xyXG4gICAgICAgICAgICAgIGJvcmRlci1sZWZ0OiAycHggc29saWQgdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiAzMHB4O1xyXG4gICAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICAgICY6YWZ0ZXIge1xyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IFwiXFxkN1wiO1xyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gICAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gIFxyXG4gICAgICAmLmhpZGUtc3RhdHVzIHtcclxuICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLnN0YXR1cy1wcm9ncmVzcy10aXRsZSB7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gIH1cclxuICBcclxuICAuc3RhdHVzLXByb2dyZXNzLWluZm8ge1xyXG4gICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgIG1hcmdpbi1ibG9jay1zdGFydDogNXB4O1xyXG4gICAgICBtYXJnaW4tYmxvY2stZW5kOiA1cHg7XHJcbiAgfVxyXG59XHJcblxyXG4ucmVtb3ZlLWljb257XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbn1cclxuLnRpbGUtYmctYWN0aXZlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItY2F0ZWdvcmllcy1iYWNrZ3JvdW5kKSAhaW1wb3J0YW50O1xyXG59XHJcbi50aWxlLWJnLWluYWN0aXZlIHtcclxuICBiYWNrZ3JvdW5kOiAjZmZmICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi51bmF2YWlsYWJsZS10YXgge1xyXG4gIHRyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gIH1cclxufVxyXG5cclxuLnNlYXJjaEJhciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAvLyBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDhweDtcclxuXHJcbiAgLmJ0bkFyZWEge1xyXG4gICAgaW9uLWJ1dHRvbiB7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiA4cHg7XHJcbiAgICBwYWRkaW5nOiAwIDEycHg7XHJcbiAgfVxyXG59Il19 */"

/***/ }),

/***/ "./src/app/admin/admin-orders/admin-orders.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/admin/admin-orders/admin-orders.page.ts ***!
  \*********************************************************/
/*! exports provided: AdminOrdersPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminOrdersPage", function() { return AdminOrdersPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/product/product.service */ "./src/app/services/product/product.service.ts");
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! export-to-csv */ "./node_modules/export-to-csv/build/index.js");
/* harmony import */ var export_to_csv__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(export_to_csv__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "./node_modules/@ionic-native/in-app-browser/ngx/index.js");
/* harmony import */ var src_app_services_order_order_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/services/order/order.service */ "./src/app/services/order/order.service.ts");
/* harmony import */ var src_app_admin_resale_order_resale_order_page__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/admin/resale-order/resale-order.page */ "./src/app/admin/resale-order/resale-order.page.ts");
/* harmony import */ var src_app_admin_admin_shop_all_orders_edit_order_edit_order_page__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/admin/admin-shop/all-orders/edit-order/edit-order.page */ "./src/app/admin/admin-shop/all-orders/edit-order/edit-order.page.ts");
/* harmony import */ var src_app_admin_admin_shop_all_orders_cancelled_reason_cancelled_reason_page__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/admin/admin-shop/all-orders/cancelled-reason/cancelled-reason.page */ "./src/app/admin/admin-shop/all-orders/cancelled-reason/cancelled-reason.page.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _quotation_chat_quotation_chat_page__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./quotation-chat/quotation-chat.page */ "./src/app/admin/admin-orders/quotation-chat/quotation-chat.page.ts");
/* harmony import */ var _quotation_edit_quotation_edit_page__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./quotation-edit/quotation-edit.page */ "./src/app/admin/admin-orders/quotation-edit/quotation-edit.page.ts");
/* harmony import */ var src_app_services_pickUp_pick_up_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! src/app/services/pickUp/pick-up.service */ "./src/app/services/pickUp/pick-up.service.ts");
/* harmony import */ var src_app_services_admin_settings_admin_settings_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! src/app/services/admin-settings/admin-settings.service */ "./src/app/services/admin-settings/admin-settings.service.ts");
/* harmony import */ var _invoices_invoices_page__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./invoices/invoices.page */ "./src/app/admin/admin-orders/invoices/invoices.page.ts");
/* harmony import */ var _filters_filters_page__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./filters/filters.page */ "./src/app/admin/admin-orders/filters/filters.page.ts");
/* harmony import */ var src_app_services_manager_manager_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! src/app/services/manager/manager.service */ "./src/app/services/manager/manager.service.ts");
/* harmony import */ var src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! src/app/services/whatsapp-dashboard/whatsapp-dashboard.service */ "./src/app/services/whatsapp-dashboard/whatsapp-dashboard.service.ts");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var src_app_services_search_engine_search_engine_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! src/app/services/search-engine/search-engine.service */ "./src/app/services/search-engine/search-engine.service.ts");




























var AdminOrdersPage = /** @class */ (function () {
    function AdminOrdersPage(modalController, events, afs, router, loadingController, alertController, navCtrl, productService, userService, platform, storage, configService, inAppBrowser, sharedService, popoverController, orderService, pickup, adminSettingsService, managerService, _renderer2, whatsappService, searchEngineService) {
        this.modalController = modalController;
        this.events = events;
        this.afs = afs;
        this.router = router;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.navCtrl = navCtrl;
        this.productService = productService;
        this.userService = userService;
        this.platform = platform;
        this.storage = storage;
        this.configService = configService;
        this.inAppBrowser = inAppBrowser;
        this.sharedService = sharedService;
        this.popoverController = popoverController;
        this.orderService = orderService;
        this.pickup = pickup;
        this.adminSettingsService = adminSettingsService;
        this.managerService = managerService;
        this._renderer2 = _renderer2;
        this.whatsappService = whatsappService;
        this.searchEngineService = searchEngineService;
        this.paymentFailedOrders = [];
        this.allPaymentFailedOrders = [];
        this.showPaymentFailedLoader = true;
        this.noPaymentFailedOrders = false;
        this.paymentPendingOrders = [];
        this.allPaymentPendingOrders = [];
        this.showPaymentPendingLoader = true;
        this.noPaymentPendingOrders = false;
        this.cancelledOrders = [];
        this.allCancelledOrders = [];
        this.showCancelledOrdersLoader = true;
        this.noCancelledOrders = false;
        this.rejectedOrders = [];
        this.allRejectedOrders = [];
        this.showRejectedOrdersLoader = true;
        this.noRejectedOrders = false;
        this.returnedOrders = [];
        this.allReturnedOrders = [];
        this.showReturnedOrdersLoader = true;
        this.noReturnedOrders = false;
        this.pendingOrders = [];
        this.allPendingOrders = [];
        this.showPendingLoader = true;
        this.noPendingOrders = false;
        this.dispatchedOrders = [];
        this.allDispatchedOrders = [];
        this.showDispatchedLoader = true;
        this.noDispatchedOrders = false;
        this.completedorders = [];
        this.allCompletedOrders = [];
        this.noCompletedOrders = false;
        this.showCompletedLoader = true;
        this.productsNeedToDeliver = [];
        this.noProductsNeedToDeliver = false;
        this.showProductsNeedToDeliverLoader = true;
        this.totalQuantity = 0;
        this.showSearch = false;
        this.uniqueProductsQtyPerOrder = [];
        this.options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            filename: 'Products',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'Exported Products',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };
        this.createUserOrderEnabled = false;
        this.exportType = 'orders';
        this.orderData = [{
                orderId: '',
                name: '',
                address: '',
                city: '',
                state: '',
                pincode: '',
                phone: '',
                date: '',
                status: '',
                payment: '',
                createdAt: { nanoseconds: 18800000, seconds: 1609740181 },
                products: '',
                productName: '',
                productQuantity: '',
                productPrice: '',
                productDiscountPrice: '',
                productGSTPercent: '',
                productGSTAmount: '',
                product_IGST: '',
                product_SGST: '',
                product_CGST: '',
                totalQuantity: '',
                totalDiscountPrice: '',
                totalGSTAmount: '',
                totalIGST: '',
                totalSGST: '',
                totalCGST: '',
                subtotalInclGst: '',
                discount: '',
                delivery: '',
                totalInclGst: '',
                couponDiscount: '',
                couponCode: '',
                paymentCompleted: '',
                paymentMode: '',
                walletAmountUsed: '',
                deliveryDate: '',
                deliveryTime: '',
                customerGST: ''
            }];
        this.orderId = '';
        this.showLoader = true;
        // @ViewChild(IonContent, {static: false}) content: IonContent;
        this.noDeliveryAgents = false;
        this.allDeliveryAgents = [];
        this.pdfObj = null;
        this.message = '';
        this.dateSchedule = '';
        this.vendorData = [];
        this.ordersList = [];
        this.previousId = 'status2';
        this.currentOrders = 'pending';
        this.noMoreOrders = false;
        this.searchOrder = '';
        this.showLoadMoreBtn = true;
        this.monthsFilter = '';
        this.startOrders = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        this.endOrders = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
        this.currentDays = 7;
        this.currentFilter = 'Last 7 Days';
        this.count = 0;
        this.paymentId = '';
        this.allOrderStatuses = [];
        this.showHistory = false;
        this.logData = [];
        this.showLabels = false;
        this.labels = [];
        this.newLabelName = '';
        this.chosenIndex = 0;
        this.user = {
            role: '',
            id: ''
        };
        this.filters = {
            region: '',
            pincode: ''
        };
        this.dateFiltered = false;
        this.isPrintingInvoice = false;
        // whatsapp
        this.whatsapp = false;
        this.page = 0;
        this.branches = [];
    }
    AdminOrdersPage.prototype.ionViewDidEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var labelsData, userRole, uid, managerDetails, accountDetails;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkSystemLock();
                        this.devHeight = this.platform.height();
                        this.showSearch = false;
                        // console.log('createUserOrderEnabled:', this.configService.environment.createUserOrder);
                        this.createUserOrderEnabled = this.configService.environment.createUserOrder;
                        this.isPrintingInvoice = this.configService.environment.isPrintingInvoice;
                        this.ordersText = 'Pending Orders';
                        this.initializeSubscriptions();
                        this.getPendingOrders();
                        this.events.publish('user:getAllDeliveryAgents');
                        this.currencyCode = this.configService.environment.currencyCode;
                        this.taxType = this.configService.environment.taxType;
                        this.allOrderStatuses = src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].allOrderStatuses;
                        return [4 /*yield*/, this.userService.getOrderLabels()];
                    case 1:
                        labelsData = _a.sent();
                        if (labelsData && labelsData['labels']) {
                            this.labels = labelsData['labels'];
                        }
                        return [4 /*yield*/, this.storage.get('userRole')];
                    case 2:
                        userRole = _a.sent();
                        if (!(userRole == 'manager')) return [3 /*break*/, 5];
                        this.user.role = 'manager';
                        return [4 /*yield*/, this.storage.get('uid')];
                    case 3:
                        uid = _a.sent();
                        this.user.id = uid;
                        return [4 /*yield*/, this.managerService.getManagerData(uid, 'service')];
                    case 4:
                        managerDetails = _a.sent();
                        this.managerDetails = managerDetails;
                        if (managerDetails && managerDetails.region && typeof (managerDetails.region) == 'string') {
                            this.filters.region = managerDetails.region ? managerDetails.region : '';
                        }
                        else if (managerDetails && managerDetails.region && Array.isArray(managerDetails.region)) {
                            this.filters.region = managerDetails.region[0] ? managerDetails.region[0] : [];
                        }
                        _a.label = 5;
                    case 5:
                        this.defaultCountryCode = this.configService.environment.defaultCountryCode;
                        this.whatsapp = this.configService.environment.whatsapp;
                        return [4 /*yield*/, this.whatsappService.getWhatsappCredentials()];
                    case 6:
                        accountDetails = _a.sent();
                        if (accountDetails) {
                            this.insights = accountDetails.insights;
                        }
                        return [4 /*yield*/, this.getAllBranch()];
                    case 7:
                        _a.sent();
                        console.log("branches", this.branches);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.getAllBranch = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var data, e_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminSettingsService.getAllBranch()];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            this.branches = data;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("getAllBranch error", e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.addFreshdeskScript = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var userRole, script;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get('userRole')];
                    case 1:
                        userRole = _a.sent();
                        if (userRole == 'admin') {
                            script = this._renderer2.createElement('script');
                            script.type = "text/javascript";
                            script.text = "function initFreshChat() {\n        window.fcWidget.init({\n          token: \"cca1f4b5-1496-4ec2-ba35-681145241f59\",\n          host: \"https://wchat.in.freshchat.com\"\n        });\n      }\n      function initialize(i,t){var e;i.getElementById(t)?initFreshChat():((e=i.createElement(\"script\")).id=t,e.async=!0,e.src=\"https://wchat.in.freshchat.com/js/widget.js\",e.onload=initFreshChat,i.head.appendChild(e))}function initiateCall(){initialize(document,\"Freshdesk Messaging-js-sdk\")}window.addEventListener?window.addEventListener(\"load\",initiateCall,!1):window.attachEvent(\"load\",initiateCall,!1);console.log('log from script');initiateCall()";
                            this._renderer2.appendChild(document.body, script);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // this.addFreshdeskScript();
                        _a = this;
                        return [4 /*yield*/, this.productService.getProductSetting()];
                    case 1:
                        // this.addFreshdeskScript();
                        _a.productSetting = _b.sent();
                        console.log("this is product setting", this.productSetting);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.getDateTimeFormat = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_8__(date).format('MMM D, YYYY hh:mm a');
    };
    AdminOrdersPage.prototype.ngOnDestroy = function () {
    };
    AdminOrdersPage.prototype.ionViewWillLeave = function () {
        this.showSearch = false;
        this.removeSubscriptions();
    };
    AdminOrdersPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('user:publishPaymentFailedOrders', function (orders) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.ordersList = orders;
            _this.noMoreOrders = false;
            if (_this.count == 0) {
                _this.onClickViewDetails(_this.ordersList[0].orderId);
            }
            _this.count = 1;
        });
        this.events.subscribe('user:noPaymentFailedOrders', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noPaymentFailedOrders = true;
            _this.showPaymentFailedLoader = false;
        });
        this.events.subscribe('user:noMorePaymentFailedOrders', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noMoreOrders = true;
        });
        this.events.subscribe('user:publishPaymentPendingOrders', function (orders) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.ordersList = orders;
            _this.noMoreOrders = false;
            if (_this.count == 0) {
                _this.onClickViewDetails(_this.ordersList[0].orderId);
            }
            _this.count = 1;
        });
        this.events.subscribe('user:noPaymentPendingOrders', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noPaymentPendingOrders = true;
            _this.showPaymentPendingLoader = false;
        });
        this.events.subscribe('user:noMorePaymentPendingOrders', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noMoreOrders = true;
        });
        this.events.subscribe('user:publishCancelledOrders', function (orders) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.ordersList = orders;
            _this.noMoreOrders = false;
            if (_this.count == 0) {
                _this.onClickViewDetails(_this.ordersList[0].orderId);
            }
            _this.count = 1;
        });
        this.events.subscribe('user:noCancelledOrders', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noCancelledOrders = true;
            _this.showCancelledOrdersLoader = false;
        });
        this.events.subscribe('user:noMoreCancelledOrders', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noMoreOrders = true;
        });
        // rejected
        this.events.subscribe('user:publishRejectedOrders', function (orders) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.ordersList = orders;
            _this.noMoreOrders = false;
            if (_this.count == 0) {
                _this.onClickViewDetails(_this.ordersList[0].orderId);
            }
            _this.count = 1;
        });
        this.events.subscribe('user:noRejectedOrders', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noRejectedOrders = true;
            _this.showRejectedOrdersLoader = false;
        });
        this.events.subscribe('user:noMoreRejectedOrders', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noMoreOrders = true;
        });
        // Returned
        this.events.subscribe('user:publishReturnedOrders', function (orders) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.ordersList = orders;
            _this.noMoreOrders = false;
            if (_this.count == 0) {
                _this.onClickViewDetails(_this.ordersList[0].orderId);
            }
            _this.count = 1;
        });
        this.events.subscribe('user:noReturnedOrders', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noReturnedOrders = true;
            _this.showReturnedOrdersLoader = false;
        });
        this.events.subscribe('user:noMoreReturnedOrders', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noMoreOrders = true;
        });
        this.events.subscribe('user:publishPendingOrdersForAdmin', function (orders) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            // console.log('orders pending', orders);
            _this.ordersList = orders;
            _this.noMoreOrders = false;
            if (_this.count == 0) {
                _this.onClickViewDetails(_this.ordersList[0].orderId);
            }
            _this.count = 1;
        });
        this.events.subscribe('user:publishCompletedOrdersForAdmin', function (orders) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.ordersList = orders;
            _this.noMoreOrders = false;
            if (_this.count == 0) {
                _this.onClickViewDetails(_this.ordersList[0].orderId);
                // console.log("user:publishCompletedOrdersForAdmin");
            }
            _this.count = 1;
        });
        this.events.subscribe('user:noCompletedOrdersForAdmin', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noCompletedOrders = true;
            _this.showCompletedLoader = false;
        });
        this.events.subscribe('user:noMorePendingOrdersForAdmin', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noMoreOrders = true;
        });
        this.events.subscribe('user:noMoreCompletedOrdersForAdmin', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noMoreOrders = true;
        });
        this.events.subscribe('user:publishDispatchedOrdersForAdmin', function (orders) {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            // console.log('Dispatched Orders', orders);
            _this.ordersList = orders;
            _this.noMoreOrders = false;
            if (_this.count == 0) {
                _this.onClickViewDetails(_this.ordersList[0].orderId);
            }
            _this.count = 1;
        });
        this.events.subscribe('user:noDispatchedOrdersForAdmin', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noDispatchedOrders = true;
            _this.showDispatchedLoader = false;
        });
        this.events.subscribe('user:noMoreDispatchedOrdersForAdmin', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noMoreOrders = true;
        });
        this.events.subscribe('user:noPendingOrdersForAdmin', function () {
            if (_this.loading) {
                _this.loading.dismiss();
            }
            _this.noPendingOrders = true;
            _this.showPendingLoader = false;
        });
        this.events.subscribe('user:publishOrderDetailsWithOrderId', function (orderData) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("publishOrderDetailsWithOrderId: ", orderData);
                        if (!orderData[0].hasOwnProperty('unavailable')) {
                            orderData[0]['unavailable'] = {};
                        }
                        if (orderData[0].payment.details) {
                            if (orderData[0].payment.mode === 'cash' && !(orderData[0].payment.details && ('amount' in orderData[0].payment.details))) {
                                orderData[0].payment.details['amount'] = orderData[0].totalAmountToPaid - (orderData[0].walletAmount + orderData[0].cashbackAmount);
                            }
                        }
                        this.orderData = orderData;
                        if (orderData[0].payment && orderData[0].payment.details && orderData[0].payment.details.paymentId) {
                            console.log("paymentId", orderData[0].payment.details.paymentId);
                            this.paymentId = orderData[0].payment.details.paymentId;
                            if (this.paymentId && this.paymentId.hasOwnProperty('razorpay_payment_id')) {
                                this.paymentId = this.paymentId['razorpay_payment_id'];
                            }
                        }
                        else {
                            this.paymentId = '';
                        }
                        this.showLoader = false;
                        if (orderData[0].scheduledDate) {
                            this.dateSchedule = orderData[0].scheduledDate.toDate();
                        }
                        if (orderData[0].vendorId) {
                            this.events.publish('vendor:getVendorName', orderData[0].vendorId);
                        }
                        if (orderData[0].deliveryAgentId) {
                            this.events.publish('delivery:getDeliveryAgentName', orderData[0].deliveryAgentId);
                        }
                        if (!this.isWalletDeducted()) {
                            this.orderData[0].walletAmount = 0;
                            this.orderData[0].cashbackAmount = 0;
                        }
                        _a = this;
                        return [4 /*yield*/, this.userService.getOrderLogs(orderData[0].id)
                            // for (const [index, product] of this.orderData[0].products.entries()) {
                            //   // console.log('product:', product);
                            //   const prodData: any = await this.productService.getProductWithId(product.productId, 'service');
                            //   if (prodData) {
                            //     this.orderData[0].products[index].showSubheading = 'showSubheading' in prodData ? prodData.showSubheading : false;
                            //   }
                            // }
                        ];
                    case 1:
                        _a.logData = _b.sent();
                        // for (const [index, product] of this.orderData[0].products.entries()) {
                        //   // console.log('product:', product);
                        //   const prodData: any = await this.productService.getProductWithId(product.productId, 'service');
                        //   if (prodData) {
                        //     this.orderData[0].products[index].showSubheading = 'showSubheading' in prodData ? prodData.showSubheading : false;
                        //   }
                        // }
                        if (!orderData[0].hasOwnProperty('branchData')) {
                            orderData[0]['branchData'] = {};
                            orderData[0]['branchData']['id'] = '';
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        this.events.subscribe('user:rejectedOrderSuccessfully', function () {
            _this.loading.dismiss();
            _this.setButtonActive("rejected");
            _this.onClickViewDetails(_this.orderId);
            _this.presentAlert('Order has been rejected successfully', true);
        });
        this.events.subscribe('user:confirmedOrderSuccessfully', function () {
            _this.loading.dismiss();
            _this.setButtonActive("confirmed");
            // console.log("check", "getPendingOrders");
            _this.onClickViewDetails(_this.orderId);
            _this.presentAlert('Order has been confirmed successfully', true);
        });
        this.events.subscribe('user:cancelledOrderSuccessfully', function () {
            _this.loading.dismiss();
            _this.setButtonActive("cancelled");
            _this.onClickViewDetails(_this.orderId);
            _this.presentAlert('Order has been cancelled successfully', true);
        });
        this.events.subscribe('user:dispatchedOrderSuccessfully', function () {
            _this.loading.dismiss();
            _this.setButtonActive("dispatched");
            _this.onClickViewDetails(_this.orderId);
            _this.presentAlert('Order has been dispatched successfully', true);
        });
        this.events.subscribe('user:deliveredOrderSuccessfully', function () {
            _this.loading.dismiss();
            _this.onClickViewDetails(_this.orderId);
            _this.setButtonActive("delivered");
            // console.log("deliveredOrderSuccessfully");
            _this.presentAlert('Order has been delivered successfully', true);
        });
        this.events.subscribe('user:returnedOrderSuccessfully', function () {
            _this.loading.dismiss();
            _this.setButtonActive("returned");
            _this.onClickViewDetails(_this.orderId);
            // console.log("returnedOrderSuccessfully");
            _this.presentAlert('Order has been returned successfully', true);
        });
        this.events.subscribe('order:sendPaymentRequestSuccess', function () {
            _this.loading.dismiss();
            _this.setButtonActive("paymentSuccess");
            _this.onClickViewDetails(_this.orderId);
            _this.presentAlert('Payment request has been send successfully', true);
        });
        this.events.subscribe('order:updatePaymentCompleteSuccess', function () {
            _this.loading.dismiss();
            _this.onClickViewDetails(_this.orderId);
            _this.presentAlert('Payment status changed to completed successfully', true);
        });
        this.events.subscribe('user:noDeliveryAgents', function () {
            _this.noDeliveryAgents = true;
        });
        this.events.subscribe('user:publishAllDeliveryAgents', function (agents) {
            _this.allDeliveryAgents = agents;
            _this.noDeliveryAgents = false;
            //console.log(this.allDeliveryAgents);
        });
        this.events.subscribe('user:assignDeliveryAgentSuccess', function () {
            _this.loading.dismiss();
            _this.presentAlert('Delivery Agent has been assigned successfully!', true);
        });
        this.events.subscribe('vendor:getVendorNameSuccess', function (data) {
            _this.vendorData = data;
        });
        this.events.subscribe('delivery:getDeliveryAgentNameSuccess', function (data) {
            if (data) {
                if (data.name) {
                    _this.deliveryAgentName = data.name;
                }
            }
        });
        this.events.subscribe('order:updateOrderArchiveSuccess', function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ordersList.splice(this.archiveIndex, 1)];
                    case 1:
                        _a.sent();
                        this.presentAlert('Order is moved to Archive List');
                        return [2 /*return*/];
                }
            });
        }); });
        this.events.subscribe('order:updateOrderArchiveFailure', function () {
            _this.presentAlert('Please try again later.');
        });
        this.events.subscribe('user:returnedOrderFailure', function () {
            _this.loading.dismiss();
            _this.presentAlert('Something went wrong, please try again later.');
        });
    };
    AdminOrdersPage.prototype.getProductsNeedToDeliverForAdmin = function () {
        this.exportType = 'products';
        if (this.productsNeedToDeliver.length === 0) {
            this.events.publish('user:getProductsNeedToDeliverForAdmin');
        }
    };
    AdminOrdersPage.prototype.productsQuantityPerOrder = function (orders) {
        var uniqueProdcuts = [];
        var productsQuantity = [];
        for (var index = 0; index < orders.length; index++) {
            var _loop_1 = function (x) {
                if (orders[index].status === 'Pending' || orders[index].status === 'Confirmed') {
                    var pid_1 = orders[index].products[x].productId;
                    var product = {};
                    product[pid_1] = {
                        quantity: orders[index].products[x].quantity,
                        orderId: orders[index].orderId
                    };
                    productsQuantity.push(product);
                    if (!uniqueProdcuts.some(function (e) { return e.hasOwnProperty(pid_1); })) {
                        var uniqueProduct = {};
                        uniqueProduct[pid_1] = {
                            name: orders[index].products[x].name,
                            img: orders[index].products[x].img,
                            quantityPerOrder: []
                        };
                        uniqueProdcuts.push(uniqueProduct);
                    }
                }
            };
            for (var x = 0; x < orders[index].products.length; x++) {
                _loop_1(x);
            }
        }
        //console.log('productsQuantity', productsQuantity);
        //console.log('uniqueProdcuts', uniqueProdcuts);
        for (var index = 0; index < uniqueProdcuts.length; index++) {
            for (var _i = 0, _a = Object.entries(uniqueProdcuts[index]); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                for (var x = 0; x < productsQuantity.length; x++) {
                    for (var _c = 0, _d = Object.entries(productsQuantity[x]); _c < _d.length; _c++) {
                        var _e = _d[_c], pid = _e[0], qty = _e[1];
                        if (key === pid) {
                            uniqueProdcuts[index][key].quantityPerOrder.push(qty);
                        }
                    }
                }
            }
        }
        //console.log('uniqueProdcuts final', uniqueProdcuts);
        this.uniqueProductsQtyPerOrder = uniqueProdcuts;
    };
    AdminOrdersPage.prototype.calcTotalQtyPerOrder = function (qty) {
        var totalQty = 0;
        for (var index = 0; index < qty.length; index++) {
            totalQty += qty[index].quantity;
        }
        return totalQty;
    };
    AdminOrdersPage.prototype.onClickViewDetails = function (orderId) {
        this.orderId = orderId;
        this.events.publish('user:getOrderDetailsWithOrderId', orderId);
    };
    AdminOrdersPage.prototype.goToManageShipment = function (id, order) {
        if (order.status === 'Pending') {
            this.sharedService.presentAlert('Please Confirm order before managing shipment');
        }
        else {
            this.router.navigate(["manage-shipment/" + id]);
        }
    };
    AdminOrdersPage.prototype.onClickTrackOrder = function (agentId, deliveryLatLng) {
        var navigationExtras = {
            state: {
                agentId: agentId,
                deliveryLatLng: deliveryLatLng
            }
        };
        this.router.navigate(['location-map'], navigationExtras);
    };
    AdminOrdersPage.prototype.setButtonActive = function (status) {
        // console.log("status : ", status);
        var prevMsgDiv = document.getElementById(this.previousId);
        prevMsgDiv.style.background = 'white';
        if (status == "delivered") {
            console.log("status : ", status);
            this.currentOrders = 'completed';
            this.ordersText = 'Delivered Orders';
            this.events.publish('user:getCompletedOrdersForAdmin', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
        }
        if (status == "rejected") {
            console.log("status : ", status);
            this.currentOrders = 'rejected';
            this.ordersText = 'Rejected Orders';
            this.events.publish('user:getRejectedOrders', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
        }
        if (status == "cancelled") {
            console.log("status : ", status);
            this.currentOrders = 'cancelled';
            this.ordersText = 'Cancelled Orders';
            this.events.publish('user:getCancelledOrders', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
        }
        if (status == "dispatched") {
            console.log("status : ", status);
            this.currentOrders = 'dispatched';
            this.ordersText = 'Dispatched Orders';
            this.events.publish('user:getDispatchedOrdersForAdmin', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
        }
        if (status == "confirmed") {
            console.log("status : ", status);
            this.currentOrders = 'pending';
            this.ordersText = 'Confirmed Orders';
            this.events.publish('user:getPendingOrdersForAdmin', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
        }
        if (status == "returned") {
            console.log("status : ", status);
            this.currentOrders = 'returned';
            this.ordersText = 'Returned Orders';
            this.events.publish('user:getReturnedOrders', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
        }
        if (status == "paymentSuccess") {
            console.log("status : ", status);
            this.currentOrders = 'paymentPending';
            this.ordersText = 'Orders with payment pending';
            this.events.publish('user:getPaymentPendingOrders', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
        }
    };
    AdminOrdersPage.prototype.getPendingOrders = function () {
        this.currentOrders = 'pending';
        this.showHistory = false;
        this.count = 0;
        this.ordersList = [];
        this.orderId = '';
        var prevMsgDiv = document.getElementById(this.previousId);
        prevMsgDiv.style.background = 'white';
        var msgDiv = document.getElementById('status2');
        msgDiv.style.background = 'var(--ion-color-categories-background)';
        this.previousId = 'status2';
        this.exportType = 'orders';
        this.ordersText = 'Confirmed Orders';
        this.events.publish('user:getPendingOrdersForAdmin', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
        var objDiv = document.getElementById("scroll2");
        if (objDiv) {
            objDiv.scrollTop = 0;
        }
    };
    AdminOrdersPage.prototype.getCompletedOrders = function () {
        this.currentOrders = 'completed';
        this.showHistory = false;
        this.count = 0;
        this.ordersList = [];
        this.orderId = '';
        var prevMsgDiv = document.getElementById(this.previousId);
        prevMsgDiv.style.background = 'white';
        var msgDiv = document.getElementById('status4');
        msgDiv.style.background = 'var(--ion-color-categories-background)';
        this.previousId = 'status4';
        this.exportType = 'orders';
        this.ordersText = 'Delivered Orders';
        this.events.publish('user:getCompletedOrdersForAdmin', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
        var objDiv = document.getElementById("scroll2");
        if (objDiv) {
            objDiv.scrollTop = 0;
        }
        // this.events.publish('user:getAllCompletedOrdersForAdmin');
    };
    AdminOrdersPage.prototype.getDispatchedOrders = function () {
        this.currentOrders = 'dispatched';
        this.showHistory = false;
        this.count = 0;
        this.ordersList = [];
        this.orderId = '';
        var prevMsgDiv = document.getElementById(this.previousId);
        prevMsgDiv.style.background = 'white';
        var msgDiv = document.getElementById('status3');
        msgDiv.style.background = 'var(--ion-color-categories-background)';
        this.previousId = 'status3';
        this.exportType = 'orders';
        this.ordersText = 'Dispatched Orders';
        this.events.publish('user:getDispatchedOrdersForAdmin', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
        var objDiv = document.getElementById("scroll2");
        if (objDiv) {
            objDiv.scrollTop = 0;
        }
        // this.events.publish('user:getAllDispatchedOrdersForAdmin');
    };
    AdminOrdersPage.prototype.getPaymentPendingOrders = function () {
        this.currentOrders = 'paymentPending';
        this.showHistory = false;
        this.count = 0;
        this.ordersList = [];
        this.orderId = '';
        var prevMsgDiv = document.getElementById(this.previousId);
        prevMsgDiv.style.background = 'white';
        var msgDiv = document.getElementById('status7');
        msgDiv.style.background = 'var(--ion-color-categories-background)';
        this.previousId = 'status7';
        this.exportType = 'orders';
        this.ordersText = 'Orders with payment pending';
        this.events.publish('user:getPaymentPendingOrders', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
        var objDiv = document.getElementById("scroll2");
        if (objDiv) {
            objDiv.scrollTop = 0;
        }
        // this.events.publish('user:getAllPaymentPendingOrders');
    };
    AdminOrdersPage.prototype.getPaymentFailedOrders = function () {
        this.currentOrders = 'failed';
        this.showHistory = false;
        this.count = 0;
        this.ordersList = [];
        this.orderId = '';
        var prevMsgDiv = document.getElementById(this.previousId);
        prevMsgDiv.style.background = 'white';
        var msgDiv = document.getElementById('status1');
        msgDiv.style.background = 'var(--ion-color-categories-background)';
        this.previousId = 'status1';
        this.exportType = 'orders';
        this.ordersText = 'Pending Orders';
        this.events.publish('user:getPaymentFailedOrders', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
        var objDiv = document.getElementById("scroll2");
        if (objDiv) {
            objDiv.scrollTop = 0;
        }
        // this.events.publish('user:getAllPaymentFailedOrders');
    };
    AdminOrdersPage.prototype.getCancelledOrders = function () {
        this.currentOrders = 'cancelled';
        this.showHistory = false;
        this.count = 0;
        this.ordersList = [];
        this.orderId = '';
        var prevMsgDiv = document.getElementById(this.previousId);
        prevMsgDiv.style.background = 'white';
        var msgDiv = document.getElementById('status5');
        msgDiv.style.background = 'var(--ion-color-categories-background)';
        this.previousId = 'status5';
        this.exportType = 'orders';
        this.ordersText = 'Cancelled Orders';
        this.events.publish('user:getCancelledOrders', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
        var objDiv = document.getElementById("scroll2");
        if (objDiv) {
            objDiv.scrollTop = 0;
        }
        // this.events.publish('user:getAllCancelledOrders');
    };
    AdminOrdersPage.prototype.getRejectedOrders = function () {
        this.currentOrders = 'rejected';
        this.showHistory = false;
        this.count = 0;
        this.ordersList = [];
        this.orderId = '';
        var prevMsgDiv = document.getElementById(this.previousId);
        prevMsgDiv.style.background = 'white';
        var msgDiv = document.getElementById('status8');
        msgDiv.style.background = 'var(--ion-color-categories-background)';
        this.previousId = 'status8';
        this.exportType = 'orders';
        this.ordersText = 'Rejected Orders';
        this.events.publish('user:getRejectedOrders', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
        var objDiv = document.getElementById("scroll2");
        if (objDiv) {
            objDiv.scrollTop = 0;
        }
        // this.events.publish('user:getAllCancelledOrders');
    };
    AdminOrdersPage.prototype.getReturnedOrders = function () {
        this.currentOrders = 'returned';
        this.showHistory = false;
        this.count = 0;
        this.ordersList = [];
        this.orderId = '';
        var prevMsgDiv = document.getElementById(this.previousId);
        prevMsgDiv.style.background = 'white';
        var msgDiv = document.getElementById('status6');
        msgDiv.style.background = 'var(--ion-color-categories-background)';
        this.previousId = 'status6';
        this.exportType = 'orders';
        this.ordersText = 'Returned Orders';
        this.events.publish('user:getReturnedOrders', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
        var objDiv = document.getElementById("scroll2");
        if (objDiv) {
            objDiv.scrollTop = 0;
        }
        // this.events.publish('user:getAllReturnedOrders');
    };
    AdminOrdersPage.prototype.loadMorePaymentPendingOrders = function () {
        //console.log('loading more pending orders...');
        this.events.publish('user:loadMorePaymentPendingOrders', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
    };
    AdminOrdersPage.prototype.loadMorePaymentFailedOrders = function () {
        //console.log('loading more pending orders...');
        this.events.publish('user:loadMorePaymentFailedOrders', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
    };
    AdminOrdersPage.prototype.loadMoreCancelledOrders = function () {
        //console.log('loading more pending orders...');
        this.events.publish('user:loadMoreCancelledOrders', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
    };
    AdminOrdersPage.prototype.loadMoreReturnedOrders = function () {
        //console.log('loading more pending orders...');
        this.events.publish('user:loadMoreReturnedOrders', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
    };
    AdminOrdersPage.prototype.loadMorePendingOrdersForAdmin = function () {
        //console.log('loading more pending orders...');
        this.events.publish('user:loadMorePendingOrdersForAdmin', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
    };
    AdminOrdersPage.prototype.loadMoreDispatchedOrdersForAdmin = function () {
        //console.log('loading more pending orders...');
        this.events.publish('user:loadMoreDispatchedOrdersForAdmin', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
    };
    AdminOrdersPage.prototype.loadMoreCompletedOrdersForAdmin = function () {
        //console.log('loading more completed orders...');
        this.events.publish('user:loadMoreCompletedOrdersForAdmin', new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), this.endOrders, this.filters);
    };
    AdminOrdersPage.prototype.loadMoreProductsNeedToDeliverForAdmin = function (event) {
        //console.log('loading more need to deliver products...');
        this.events.publish('user:loadMoreProductsNeedToDeliverForAdmin');
        setTimeout(function () {
            event.target.complete();
        }, 1000);
        if (this.noMoreProductsNeedToDeliver === true) {
            event.target.disabled = true;
        }
    };
    AdminOrdersPage.prototype.getOrderWithLables = function (label, i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var prevMsgDiv, msgDiv, orders, objDiv;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.chosenIndex = i;
                        this.currentOrders = label;
                        this.showHistory = false;
                        this.ordersList = [];
                        this.orderId = '';
                        this.exportType = 'orders';
                        this.ordersText = label + ' ' + 'Orders';
                        console.log(this.previousId);
                        prevMsgDiv = document.getElementById(this.previousId);
                        prevMsgDiv.style.background = 'white';
                        msgDiv = document.getElementById('labelStatus' + i);
                        msgDiv.style.background = 'var(--ion-color-categories-background)';
                        this.previousId = 'labelStatus' + i;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userService.getOrdersByLabel(label, this.startOrders, this.endOrders)];
                    case 2:
                        orders = _a.sent();
                        this.ordersList = orders;
                        this.noMoreOrders = false;
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        if (this.count == 0) {
                            this.onClickViewDetails(this.ordersList[0].orderId);
                        }
                        this.count = 1;
                        objDiv = document.getElementById("scroll2");
                        if (objDiv) {
                            objDiv.scrollTop = 0;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.getVendorStatusColor = function (status) {
        switch (status) {
            case 'prepared':
            case 'dispatched':
                return 'success';
            case 'cancelled':
                return 'danger';
            default:
                return 'dark';
        }
    };
    AdminOrdersPage.prototype.getVendorName = function (vendorId) {
        if (this.orderData[0].vendors && this.orderData[0].vendors.length) {
            var vendor = this.orderData[0].vendors.filter(function (v) { return v.id === vendorId; });
            if (vendor && vendor.length) {
                return vendor[0].vendor.name;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    AdminOrdersPage.prototype.getVendorNameForCSV = function (vendorId, order) {
        if (order.vendors && order.vendors.length) {
            var vendor = order.vendors.filter(function (v) { return v.id === vendorId; });
            // console.log('vendor : ', vendor)
            if (vendor && vendor.length && vendor[0].vendor) {
                return vendor[0].vendor.name;
            }
            else {
                return '';
            }
        }
        else {
            return '';
        }
    };
    AdminOrdersPage.prototype.isVendorQtyUnavialble = function (product) {
        return product.vendorStatus.unavailableQty > 0 && product.vendorStatus.unavailableQty !== product.quantity;
    };
    AdminOrdersPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('user:publishOrderDetailsWithOrderId');
        this.events.unsubscribe('user:rejectedOrderSuccessfully');
        this.events.unsubscribe('user:confirmedOrderSuccessfully');
        this.events.unsubscribe('user:cancelledOrderSuccessfully');
        this.events.unsubscribe('user:dispatchedOrderSuccessfully');
        this.events.unsubscribe('user:deliveredOrderSuccessfully');
        this.events.unsubscribe('user:returnedOrderSuccessfully');
        this.events.unsubscribe('user:noDeliveryAgents');
        this.events.unsubscribe('user:publishAllDeliveryAgents');
        this.events.unsubscribe('user:assignDeliveryAgentSuccess');
        this.events.unsubscribe('order:sendPaymentRequestSuccess');
        this.events.unsubscribe('order:updatePaymentCompleteSuccess');
        this.events.unsubscribe('vendor:getVendorNameSuccess');
        this.events.unsubscribe('vendor:getDeliveryAgentNameSuccess');
        this.events.unsubscribe('user:publishPendingOrdersForAdmin');
        this.events.unsubscribe('user:publishAllPendingOrdersForAdmin');
        this.events.unsubscribe('user:publishCompletedOrdersForAdmin');
        this.events.unsubscribe('user:publishAllCompletedOrdersForAdmin');
        this.events.unsubscribe('user:publishDispatchedOrdersForAdmin');
        this.events.unsubscribe('user:publishAllDispatchedOrdersForAdmin');
        this.events.unsubscribe('user:noPendingOrdersForAdmin');
        this.events.unsubscribe('user:noCompletedOrdersForAdmin');
        this.events.unsubscribe('user:noDispatchedOrdersForAdmin');
        this.events.unsubscribe('user:noMoreCompletedOrdersForAdmin');
        this.events.unsubscribe('user:noMorePendingOrdersForAdmin');
        this.events.unsubscribe('user:publishPaymentPendingOrders');
        this.events.unsubscribe('user:publishAllPaymentPendingOrders');
        this.events.unsubscribe('user:noPaymentPendingOrders');
        this.events.unsubscribe('user:noMorePaymentPendingOrders');
        this.events.unsubscribe('user:publishPaymentFailedOrders');
        this.events.unsubscribe('user:publishAllPaymentFailedOrders');
        this.events.unsubscribe('user:noPaymentFailedOrders');
        this.events.unsubscribe('user:noMorePaymentFailedOrders');
        this.events.unsubscribe('user:publishCancelledOrders');
        this.events.unsubscribe('user:publishAllCancelledOrders');
        this.events.unsubscribe('user:noCancelledOrders');
        this.events.unsubscribe('user:noMoreCancelledOrders');
        this.events.unsubscribe('user:publishReturnedOrders');
        this.events.unsubscribe('user:publishAllReturnedOrders');
        this.events.unsubscribe('user:noReturnedOrders');
        this.events.unsubscribe('user:noMoreReturnedOrders');
        this.events.unsubscribe('order:updateOrderArchiveSuccess');
        this.events.unsubscribe('order:updateOrderArchiveFailure');
        this.events.unsubscribe('user:returnedOrderFailure');
    };
    AdminOrdersPage.prototype.getProducts = function (products) {
        var prods = [];
        var sgst = 0, cgst = 0, igst = 0;
        products.forEach(function (product) {
            if (product.pack && product.pack.weight) {
                prods.push(product.name + '(' + product.pack.weight + ')(Qty:' + product.quantity + ')');
            }
            else {
                prods.push(product.name + '(Qty:' + product.quantity + ')');
            }
            if (product.gstObj && product.gstObj.sgst) {
                sgst = sgst + product.gstObj.sgst;
            }
            if (product.gstObj && product.gstObj.cgst) {
                cgst = cgst + product.gstObj.cgst;
            }
            if (product.gstObj && product.gstObj.igst) {
                igst = igst + product.gstObj.igst;
            }
        });
        return { prods: prods, sgst: sgst, cgst: cgst, igst: igst };
    };
    AdminOrdersPage.prototype.exportOrders = function (name, orders) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var dateObj, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_s) {
                switch (_s.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _s.sent();
                        dateObj = { start: new Date(this.startOrders.getTime() + 24 * 60 * 60 * 1000), end: this.endOrders };
                        if (!(this.currentOrders == 'pending')) return [3 /*break*/, 6];
                        if (!this.dateFiltered) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.userService.getAllPendingOrdersForAdmin(dateObj)];
                    case 2:
                        _a.allPendingOrders = _s.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        _b = this;
                        return [4 /*yield*/, this.userService.getAllPendingOrdersForAdmin()];
                    case 4:
                        _b.allPendingOrders = _s.sent();
                        _s.label = 5;
                    case 5:
                        this.allTypeOrders = this.allPendingOrders;
                        return [3 /*break*/, 41];
                    case 6:
                        if (!(this.currentOrders == 'failed')) return [3 /*break*/, 11];
                        if (!this.dateFiltered) return [3 /*break*/, 8];
                        _c = this;
                        return [4 /*yield*/, this.userService.getAllPaymentFailedOrders(dateObj)];
                    case 7:
                        _c.allPaymentFailedOrders = _s.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        _d = this;
                        return [4 /*yield*/, this.userService.getAllPaymentFailedOrders()];
                    case 9:
                        _d.allPaymentFailedOrders = _s.sent();
                        _s.label = 10;
                    case 10:
                        this.allTypeOrders = this.allPaymentFailedOrders;
                        return [3 /*break*/, 41];
                    case 11:
                        if (!(this.currentOrders == 'paymentPending')) return [3 /*break*/, 16];
                        if (!this.dateFiltered) return [3 /*break*/, 13];
                        _e = this;
                        return [4 /*yield*/, this.userService.getAllPaymentPendingOrders(dateObj)];
                    case 12:
                        _e.allPaymentPendingOrders = _s.sent();
                        return [3 /*break*/, 15];
                    case 13:
                        _f = this;
                        return [4 /*yield*/, this.userService.getAllPaymentPendingOrders()];
                    case 14:
                        _f.allPaymentPendingOrders = _s.sent();
                        _s.label = 15;
                    case 15:
                        this.allTypeOrders = this.allPaymentPendingOrders;
                        return [3 /*break*/, 41];
                    case 16:
                        if (!(this.currentOrders == 'cancelled')) return [3 /*break*/, 21];
                        if (!this.dateFiltered) return [3 /*break*/, 18];
                        _g = this;
                        return [4 /*yield*/, this.userService.getAllCancelledOrders(dateObj)];
                    case 17:
                        _g.allCancelledOrders = _s.sent();
                        return [3 /*break*/, 20];
                    case 18:
                        _h = this;
                        return [4 /*yield*/, this.userService.getAllCancelledOrders()];
                    case 19:
                        _h.allCancelledOrders = _s.sent();
                        _s.label = 20;
                    case 20:
                        this.allTypeOrders = this.allCancelledOrders;
                        return [3 /*break*/, 41];
                    case 21:
                        if (!(this.currentOrders == 'rejected')) return [3 /*break*/, 26];
                        if (!this.dateFiltered) return [3 /*break*/, 23];
                        _j = this;
                        return [4 /*yield*/, this.userService.getAllRejectedOrders(dateObj)];
                    case 22:
                        _j.allRejectedOrders = _s.sent();
                        return [3 /*break*/, 25];
                    case 23:
                        _k = this;
                        return [4 /*yield*/, this.userService.getAllRejectedOrders()];
                    case 24:
                        _k.allRejectedOrders = _s.sent();
                        _s.label = 25;
                    case 25:
                        this.allTypeOrders = this.allRejectedOrders;
                        return [3 /*break*/, 41];
                    case 26:
                        if (!(this.currentOrders == 'returned')) return [3 /*break*/, 31];
                        if (!this.dateFiltered) return [3 /*break*/, 28];
                        _l = this;
                        return [4 /*yield*/, this.userService.getAllReturnedOrders(dateObj)];
                    case 27:
                        _l.allReturnedOrders = _s.sent();
                        return [3 /*break*/, 30];
                    case 28:
                        _m = this;
                        return [4 /*yield*/, this.userService.getAllReturnedOrders()];
                    case 29:
                        _m.allReturnedOrders = _s.sent();
                        _s.label = 30;
                    case 30:
                        this.allTypeOrders = this.allReturnedOrders;
                        return [3 /*break*/, 41];
                    case 31:
                        if (!(this.currentOrders == 'completed')) return [3 /*break*/, 36];
                        if (!this.dateFiltered) return [3 /*break*/, 33];
                        _o = this;
                        return [4 /*yield*/, this.userService.getAllCompletedOrdersForAdmin(dateObj)];
                    case 32:
                        _o.allCompletedOrders = _s.sent();
                        return [3 /*break*/, 35];
                    case 33:
                        _p = this;
                        return [4 /*yield*/, this.userService.getAllCompletedOrdersForAdmin()];
                    case 34:
                        _p.allCompletedOrders = _s.sent();
                        _s.label = 35;
                    case 35:
                        this.allTypeOrders = this.allCompletedOrders;
                        return [3 /*break*/, 41];
                    case 36:
                        if (!this.dateFiltered) return [3 /*break*/, 38];
                        _q = this;
                        return [4 /*yield*/, this.userService.getAllDispatchedOrdersForAdmin(dateObj)];
                    case 37:
                        _q.allDispatchedOrders = _s.sent();
                        return [3 /*break*/, 40];
                    case 38:
                        _r = this;
                        return [4 /*yield*/, this.userService.getAllDispatchedOrdersForAdmin()];
                    case 39:
                        _r.allDispatchedOrders = _s.sent();
                        _s.label = 40;
                    case 40:
                        this.allTypeOrders = this.allDispatchedOrders;
                        _s.label = 41;
                    case 41:
                        if (this.loading) {
                            this.loading.dismiss();
                        }
                        this.presentAlert('Please wait for sometime as Export order can take couple of minutes');
                        this.downloadOrders(this.currentOrders, this.allTypeOrders);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.downloadOrders = function (name, orders) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var data, count, _loop_2, this_1, _i, orders_1, order, csvExporter;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('CSV LOG ORDERS : ', orders);
                        if (!(orders && orders.length > 0)) return [3 /*break*/, 7];
                        this.options.filename = name + ' ' + this.getDateTimeFormat(new Date);
                        this.options.title = name + ' ' + this.getDateTimeFormat(new Date);
                        if (name == 'failed') {
                            this.options.filename = 'Pending' + ' ' + this.getDateTimeFormat(new Date);
                            this.options.title = 'Pending' + ' ' + this.getDateTimeFormat(new Date);
                        }
                        else if (name == 'pending') {
                            this.options.filename = 'Confirmed' + ' ' + this.getDateTimeFormat(new Date);
                            this.options.title = 'confirmed' + ' ' + this.getDateTimeFormat(new Date);
                        }
                        data = [], count = 0;
                        _loop_2 = function (order) {
                            var data_1, products, delivery_date, quantityAll, orderIgst, orderSgst, orderCgst, totalAmount2Decimal, obj, _i, _a, product, productIgst, productCgst, productSgst, productGst, vendorName;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        count++;
                                        if (!order.deliveryAgentId) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this_1.pickup.getDeliveryAgentName(order.deliveryAgentId)];
                                    case 1:
                                        data_1 = _b.sent();
                                        order['deliveryName'] = (data_1 && data_1['name']) ? data_1['name'] : '';
                                        return [3 /*break*/, 3];
                                    case 2:
                                        order['deliveryName'] = '';
                                        _b.label = 3;
                                    case 3:
                                        products = {}, delivery_date = '';
                                        if (order.products) {
                                            products = this_1.getProducts(order.products);
                                        }
                                        if (order.scheduledDate && order.scheduledDate !== '' && order.scheduledDate !== {}) {
                                            // console.log(order.scheduledDate);
                                            if (typeof order.scheduledDate === 'string' || order.scheduledDate instanceof String) {
                                                delivery_date = moment__WEBPACK_IMPORTED_MODULE_8__(new Date(order.scheduledDate)).format('MMM D, YYYY');
                                            }
                                            else if (order.scheduledDate.seconds) {
                                                delivery_date = moment__WEBPACK_IMPORTED_MODULE_8__(order.scheduledDate.toDate()).format('MMM D, YYYY');
                                            }
                                        }
                                        quantityAll = 0;
                                        orderIgst = 0;
                                        orderSgst = 0;
                                        orderCgst = 0;
                                        order.products.forEach(function (product) {
                                            quantityAll = quantityAll + product['quantity'];
                                            if (!isNaN(parseFloat(product['mrpPrice']))) {
                                                if (product.gstObj && product.gstObj.igst && !isNaN(parseFloat(product.gstObj['igst']))) {
                                                    orderIgst = orderIgst + parseFloat((product.gstObj['igst'] * 0.01 * product['mrpPrice']).toFixed(2));
                                                }
                                                if (product.gstObj && product.gstObj.sgst && !isNaN(parseFloat(product.gstObj['sgst']))) {
                                                    orderSgst = orderSgst + parseFloat((product.gstObj['sgst'] * 0.01 * product['mrpPrice']).toFixed(2));
                                                }
                                                if (product.gstObj && product.gstObj.cgst && !isNaN(parseFloat(product.gstObj['cgst']))) {
                                                    orderCgst = orderCgst + parseFloat((product.gstObj['cgst'] * 0.01 * product['mrpPrice']).toFixed(2));
                                                }
                                            }
                                        });
                                        totalAmount2Decimal = 0;
                                        if (!isNaN(parseFloat(order.defaultGst)) && order.defaultGst !== undefined) {
                                            totalAmount2Decimal = totalAmount2Decimal + parseFloat(order.defaultGst.toFixed(2));
                                        }
                                        obj = {
                                            sno: count,
                                            orderId: order.orderId ? order.orderId : '',
                                            name: order.address && order.address.name ? order.address.name : '',
                                            address: order.address && order.address.address ? order.address.address : '',
                                            city: order.address && order.address.city ? order.address.city : '',
                                            state: order.address && order.address.state ? order.address.state : '',
                                            pincode: order.address && order.address.pincode ? order.address.pincode : '',
                                            phone: order.address && order.address.phoneNo ? order.address.phoneNo : '',
                                            date: order.createdAt && order.createdAt.toDate() ? this_1.getDateTimeFormat(order.createdAt.toDate()) : '',
                                            status: order.status ? order.status.toUpperCase() : '',
                                            createdBy: order.userName || 'NA',
                                            productName: '',
                                            productCode: '',
                                            productQuantity: '',
                                            productPrice: '',
                                            productDiscountPrice: '',
                                            productGSTPercent: '',
                                            productGSTAmount: '',
                                            product_IGST: '',
                                            product_SGST: '',
                                            product_CGST: '',
                                            totalQuantity: quantityAll,
                                            vendorName: '',
                                            totalDiscountPrice: order.discountOnMrp ? order.discountOnMrp : '',
                                            cashbackAmount: order.cashbackAmount ? order.cashbackAmount : '',
                                            totalGSTAmount: totalAmount2Decimal ? totalAmount2Decimal : '',
                                            totalIGST: orderIgst,
                                            totalSGST: orderSgst,
                                            totalCGST: orderCgst,
                                            subtotalInclGst: order.totalMrp ? order.totalMrp : '',
                                            discount: order.discountOnMrp ? order.discountOnMrp : '',
                                            delivery: order.delivery ? order.delivery : '',
                                            totalInclGst: order.totalAmountToPaid ? order.totalAmountToPaid : '',
                                            couponDiscount: order.couponDiscount ? order.couponDiscount : '',
                                            couponCode: order.couponName ? order.couponName : '',
                                            paymentCompleted: order.payment.completed ? 'YES' : 'NO',
                                            paymentMode: order.payment.mode ? order.payment.mode : '',
                                            walletAmountUsed: order.walletAmount ? order.walletAmount : '',
                                            deliveryBy: order.deliveryName || '',
                                            deliveryDate: order.timeline ? order.timeline.Delivered ? this_1.getDateTimeFormat(order.timeline.Delivered.time.toDate()) : '' : '',
                                            customerGST: order.customerGstNo ? order.customerGstNo : ''
                                        };
                                        obj.createdBy = order.metaData && order.metaData.orderBy ? order.metaData.orderBy.role + " - " + order.metaData.orderBy.name : order.userName || 'NA';
                                        data.push(obj);
                                        for (_i = 0, _a = order.products; _i < _a.length; _i++) {
                                            product = _a[_i];
                                            productIgst = 0;
                                            productCgst = 0;
                                            productSgst = 0;
                                            productGst = 0;
                                            vendorName = '';
                                            if (product.vendorStatus) {
                                                // vendorName = await this.userService.getVendorNameCSV(product.vendorStatus.id)
                                                if (order.orderId === 3282) {
                                                    console.log('csv order : ', order);
                                                }
                                                vendorName = this_1.getVendorNameForCSV(product.vendorStatus.id, order);
                                            }
                                            else {
                                                vendorName = '';
                                            }
                                            // console.log('prodName : ', product.name, 'vendorName : ', vendorName);
                                            if (!isNaN(parseFloat(product['mrpPrice']))) {
                                                if (product.gstObj && product.gstObj.igst) {
                                                    productIgst = parseFloat((productIgst + product.gstObj['igst'] * 0.01 * product['mrpPrice']).toFixed(2));
                                                }
                                                if (product.gstObj && product.gstObj.sgst) {
                                                    productSgst = parseFloat((productSgst + product.gstObj['sgst'] * 0.01 * product['mrpPrice']).toFixed(2));
                                                }
                                                if (product.gstObj && product.gstObj.cgst) {
                                                    productCgst = parseFloat((productCgst + product.gstObj['cgst'] * 0.01 * product['mrpPrice']).toFixed(2));
                                                }
                                                if (product.gst) {
                                                    productGst = parseFloat((productGst + product['gst'] * 0.01 * product['mrpPrice']).toFixed(2));
                                                }
                                            }
                                            data.push({
                                                sno: '',
                                                orderId: '',
                                                name: '',
                                                address: '',
                                                city: '',
                                                state: '',
                                                pincode: '',
                                                phone: '',
                                                date: '',
                                                status: '',
                                                createdBy: '',
                                                productName: product['name'] ? product['name'] : '',
                                                productCode: product['sku'] ? product['sku'] : '',
                                                productQuantity: product['quantity'] ? product['quantity'] : '',
                                                productPrice: product['mrpPrice'] ? product['mrpPrice'] : '',
                                                productDiscountPrice: product['price'] ? product['price'] : '',
                                                productGSTPercent: product['gst'] ? product['gst'] : '',
                                                productGSTAmount: productGst,
                                                product_IGST: productIgst,
                                                product_SGST: productSgst,
                                                product_CGST: productCgst,
                                                totalQuantity: '',
                                                vendorName: vendorName,
                                                totalDiscountPrice: '',
                                                cashbackAmount: '',
                                                totalGSTAmount: '',
                                                totalIGST: '',
                                                totalSGST: '',
                                                totalCGST: '',
                                                subtotalInclGst: '',
                                                discount: '',
                                                delivery: '',
                                                totalInclGst: '',
                                                couponDiscount: '',
                                                couponCode: '',
                                                paymentCompleted: '',
                                                paymentMode: '',
                                                walletAmountUsed: '',
                                                deliveryBy: '',
                                                deliveryDate: '',
                                                customerGST: ''
                                            });
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, orders_1 = orders;
                        _a.label = 1;
                    case 1:
                        if (!(_i < orders_1.length)) return [3 /*break*/, 4];
                        order = orders_1[_i];
                        return [5 /*yield**/, _loop_2(order)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log('CSV LOG : ', data);
                        csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_9__["ExportToCsv"](this.options);
                        csvExporter.generateCsv(data);
                        if (!this.loading) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 10];
                    case 7:
                        if (!this.loading) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        this.presentAlert('No orders to export!');
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.exportProducts = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var data_2, csvExporter;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (this.uniqueProductsQtyPerOrder && this.uniqueProductsQtyPerOrder.length > 1) {
                    this.options.filename = 'Products for Delivery ' + this.getDateTimeFormat(new Date);
                    this.options.title = 'Products for Delivery ' + this.getDateTimeFormat(new Date);
                    data_2 = [];
                    this.uniqueProductsQtyPerOrder.forEach(function (product) {
                        if (product) {
                            for (var key in product) {
                                var item = product[key];
                                data_2.push({
                                    product: item && item.name ? item.name : '',
                                    quantity: item && item.quantityPerOrder ? _this.calcTotalQtyPerOrder(item.quantityPerOrder) : 0
                                });
                            }
                        }
                    });
                    csvExporter = new export_to_csv__WEBPACK_IMPORTED_MODULE_9__["ExportToCsv"](this.options);
                    csvExporter.generateCsv(data_2);
                }
                return [2 /*return*/];
            });
        });
    };
    AdminOrdersPage.prototype.isSubOrMembershipOrder = function (order) {
        if (order.hasOwnProperty('orderType') && (order.orderType === 'subscription' || order.orderType === 'membership')) {
            return true;
        }
        else {
            return false;
        }
    };
    AdminOrdersPage.prototype.createOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert_1;
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
                        return [3 /*break*/, 4];
                    case 3:
                        this.router.navigate(['create-order']);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.goToArchivedOrders = function () {
        this.router.navigate(['archived-orders']);
    };
    AdminOrdersPage.prototype.checkSystemLock = function () {
        var lockSystem = this.configService.environment.lockSystem;
        if (lockSystem) {
            this.sharedService.presentAlert('This app is closed and not accepting any orders. Please contact support team.', false, 'none');
        }
    };
    AdminOrdersPage.prototype.getTotalItems = function () {
        return this.orderData[0].products.length;
    };
    AdminOrdersPage.prototype.onClickConfirmOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.whatsapp && this.orderData[0].metaData && this.orderData[0].metaData.source === 'whatsapp') {
                            if (this.insights && this.insights.creditsUsed >= this.insights.chatLimit) {
                                this.sharedService.presentAlert('You have reached your free limit for whatsapp, kindly upgrade your plan to use the services.');
                                return [2 /*return*/];
                            }
                        }
                        return [4 /*yield*/, this.alertController.create({
                                message: "Are you sure you want to confirm this order?",
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
                                            _this.confirmOrder();
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
    AdminOrdersPage.prototype.confirmOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var data;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userService.checkProductAvailability(this.orderData[0])];
                    case 2:
                        data = _a.sent();
                        // console.log(data);
                        if (data.isProductsAvailable) {
                            this.events.publish('user:confirmOrderByAdmin', this.orderData[0], this.orderId);
                        }
                        else {
                            this.loading.dismiss();
                            this.presentAlert(data.unavailableProduct + " is currently unavailable. Please check its stock !");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.onClickDispatchOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var msg, alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // if (this.orderData[0]['branchData'].id === '' && !this.orderData[0]['selectedNone']) {
                        //   await this.sharedService.presentAlert('Please assign branch to this order.');
                        //   return;
                        // }
                        if (this.whatsapp && this.orderData[0].metaData && this.orderData[0].metaData.source === 'whatsapp') {
                            if (this.insights && this.insights.creditsUsed >= this.insights.chatLimit) {
                                this.sharedService.presentAlert('You have reached your free limit for whatsapp, kindly upgrade your plan to use the services.');
                                return [2 /*return*/];
                            }
                        }
                        msg = 'Are you sure you want to dispatch this order?';
                        if (!(this.orderData[0].payment && this.orderData[0].payment.completed)) {
                            msg = 'Payment is Incomplete, Are you sure you want to dispatch this order?';
                        }
                        return [4 /*yield*/, this.alertController.create({
                                message: msg,
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
                                            _this.dispatchOrder();
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
    AdminOrdersPage.prototype.dispatchOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('user:dispatchOrderByAdmin', this.orderId, this.message);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.onClickDeliverOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: "Are you sure you want to change status to delivered?",
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
    AdminOrdersPage.prototype.deliverOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('user:deliverOrderByAdmin', this.orderId);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.returnOrder = function (refundAmount) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('user:returnOrderByAdmin', this.orderId, refundAmount, this.orderData[0]);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.getRefundedAmount = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            subHeader: 'Enter Refund Amount',
                            inputs: [
                                {
                                    name: 'amount',
                                    type: 'number',
                                    value: this.orderData[0].totalAmountToPaid
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        // console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Add',
                                    handler: function (amnt) {
                                        _this.returnOrder(parseInt(amnt.amount) || 0);
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
    AdminOrdersPage.prototype.refundAmountConfirm = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Do you want to add refund amount to user wallet?',
                            backdropDismiss: false,
                            buttons: [
                                {
                                    text: 'No',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        _this.returnOrder(0);
                                    }
                                }, {
                                    text: 'Yes',
                                    handler: function () {
                                        _this.getRefundedAmount();
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        // console.log('Confirm Cancel');
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
    AdminOrdersPage.prototype.removeProduct = function (i) {
        this.orderData[0].products.splice(i, 1);
    };
    AdminOrdersPage.prototype.covertTextToUrl = function (text) {
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        var text1 = text.replace(exp, '<a target="_blank" href=\'$1\'>$1</a>');
        var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        var finalText = text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
        return finalText;
    };
    AdminOrdersPage.prototype.onClickRejectOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: "Are you sure you want to reject this order?",
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
                                        _this.rejectOrder();
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
    AdminOrdersPage.prototype.rejectOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('user:rejectOrderByAdmin', this.orderId);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.onClickCancelOrder = function () {
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
    AdminOrdersPage.prototype.cancelOrder = function (cancelReason) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('user:cancelOrderByAdmin', this.orderId, cancelReason);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.getCancelReason = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: src_app_admin_admin_shop_all_orders_cancelled_reason_cancelled_reason_page__WEBPACK_IMPORTED_MODULE_16__["CancelledReasonPage"]
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
    AdminOrdersPage.prototype.isCancelReasonAvailable = function () {
        return 'cancelData' in this.orderData[0] && this.orderData[0].cancelData.reason;
    };
    AdminOrdersPage.prototype.removeProductAlert = function (i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: "Are you sure you want to remove this order?",
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
                                        _this.removeProduct(i);
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
    AdminOrdersPage.prototype.presentAlert = function (msg, action) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: msg,
                            buttons: [{
                                    text: 'Ok',
                                    handler: function () {
                                        //console.log('Confirm Okay');
                                        _this.navCtrl.navigateRoot(['admin-orders']);
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
    AdminOrdersPage.prototype.presentLoading = function (msg) {
        if (msg === void 0) { msg = 'Please Wait...'; }
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
    AdminOrdersPage.prototype.onChangeDeliveryAgent = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var selectedDeliveryAgentId;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selectedDeliveryAgentId = event.target.value;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('user:assignDeliveryAgent', selectedDeliveryAgentId, this.orderId);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.onChangeBranch = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var selectedBranchId, matchedIndex, updateObj, res;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selectedBranchId = event.target.value;
                        console.log('onChangeBranch', selectedBranchId);
                        matchedIndex = this.branches.findIndex(function (el) { return el.id === selectedBranchId; });
                        console.log('matchedIndex', matchedIndex);
                        if (selectedBranchId) {
                            if (matchedIndex > -1) {
                                this.orderData[0]['branchData'] = this.branches[matchedIndex];
                            }
                            else {
                                this.orderData[0]['selectedNone'] = true;
                            }
                        }
                        else {
                            this.orderData[0]['branchData'] = {};
                            this.orderData[0]['branchData']['id'] = '';
                        }
                        updateObj = {
                            branchData: this.orderData[0].branchData
                        };
                        console.log('this.orderData[0].branchData', this.orderData[0].branchData);
                        return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.orderService.updateOrderData(this.orderData[0].id, updateObj)];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, this.sharedService.loading.dismiss()];
                    case 3:
                        _a.sent();
                        if (!res) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.sharedService.presentAlert('Branch assigned successfully')];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.sharedService.presentAlert('Something went wrong!')];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.sendPaymentRequest = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('order:sendPaymentRequest', this.orderId, this.orderData[0].userId);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.onClickUpdatePaymentComplete = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.events.publish('order:updatePaymentComplete', this.orderId);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.onSetupDeliveryAgent = function () {
        this.router.navigate(['admin-allusers']);
    };
    AdminOrdersPage.prototype.getTime = function (time) {
        return moment__WEBPACK_IMPORTED_MODULE_8__(time).format('hh:mm A');
    };
    AdminOrdersPage.prototype.openOrderInvoice = function (url) {
        var browser = this.inAppBrowser.create(url, '_system');
    };
    AdminOrdersPage.prototype.callUser = function () {
        /* this.callNumber.callNumber(this.orderData[0].address.phoneNo, true)
         .then(res => console.log('Launched dialer!', res))
         .catch(err => console.log('Error launching dialer', err));*/
    };
    AdminOrdersPage.prototype.totalPieces = function (product, i) {
        var pieces = product.quantity * parseInt(product.pack.weight);
        this.orderData[0].products[i]['totalPieces'] = pieces;
        return pieces;
    };
    AdminOrdersPage.prototype.decrementPieces = function (i) {
        if (this.orderData[0].products[i].totalPieces > 1) {
            this.orderData[0].products[i].totalPieces = this.orderData[0].products[i].totalPieces - 1;
            this.orderData[0].products[i].price = this.orderData[0].products[i].totalPieces * this.orderData[0].products[i].pack.perPcPrice;
            //console.log(this.orderData[0].products[i].price);
            var prodPrice_1 = 0;
            this.orderData[0].products.forEach(function (element) {
                //console.log(element);
                prodPrice_1 = prodPrice_1 + element.price;
            });
            this.orderData[0].productsPrice = prodPrice_1;
            this.orderData[0].totalAmountToPaid = this.orderData[0].productsPrice + this.orderData[0].couponDiscount + this.orderData[0].defaultGst + this.orderData[0].delivery;
        }
    };
    AdminOrdersPage.prototype.incrementPieces = function (i) {
        this.orderData[0].products[i].totalPieces = this.orderData[0].products[i].totalPieces + 1;
        this.orderData[0].products[i].price = this.orderData[0].products[i].totalPieces * this.orderData[0].products[i].pack.perPcPrice;
        var prodPrice = 0;
        this.orderData[0].products.forEach(function (element) {
            prodPrice = prodPrice + element.price;
        });
        this.orderData[0].productsPrice = prodPrice;
        this.orderData[0].totalAmountToPaid = this.orderData[0].productsPrice + this.orderData[0].couponDiscount + this.orderData[0].defaultGst + this.orderData[0].delivery;
    };
    AdminOrdersPage.prototype.getSinglePiecePrice = function (totalPieces, totalAmount) {
        return Math.ceil(totalAmount / totalPieces);
    };
    AdminOrdersPage.prototype.goToPrdouctDetails = function (product) {
        var stateObj = {};
        var navigationExtras = {
            state: {}
        };
        if (product.parentProductId) {
            stateObj = {
                optionId: product.productId,
                productId: product.parentProductId,
                isOptionProduct: true,
            };
            navigationExtras.state = stateObj;
        }
        else {
            stateObj = {
                productId: product.productId,
            };
            navigationExtras.state = stateObj;
        }
        this.router.navigate(['new-product'], navigationExtras);
    };
    AdminOrdersPage.prototype.reviewDate = function () {
        if (this.orderData[0].rating.createdAt instanceof Date) {
            return this.orderData[0].rating.createdAt;
        }
        else {
            return this.orderData[0].rating.createdAt.toDate();
        }
    };
    AdminOrdersPage.prototype.showGenInvoiceBtn = function () {
        if ((!this.orderData[0].hasOwnProperty('invoice') || (this.orderData[0].invoice.status !== 'generated')) && (!this.orderData[0].hasOwnProperty('orderType') || (this.orderData[0].hasOwnProperty('orderType') && this.orderData[0].orderType !== 'subscription'))) {
            return true;
        }
        else {
            return false;
        }
    };
    AdminOrdersPage.prototype.showRegenInvoiceBtn = function () {
        if ((!this.orderData[0].hasOwnProperty('orderType') || (this.orderData[0].hasOwnProperty('orderType') && this.orderData[0].orderType !== 'subscription'))) {
            return true;
        }
        else {
            return false;
        }
    };
    AdminOrdersPage.prototype.showCustomAlert = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var alert;
                        var _this = this;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.alertController.create({
                                        subHeader: 'Enter Custom Invoice Number',
                                        inputs: [
                                            {
                                                name: 'invoiceNo',
                                                type: 'text',
                                                placeholder: 'Enter Custom Invoice Number'
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
                                                text: 'Done',
                                                handler: function (data) {
                                                    console.log('data:', data);
                                                    if (data.invoiceNo && data.invoiceNo.length > 0) {
                                                        console.log('data.invoiceNo:', data.invoiceNo);
                                                        resolve(data.invoiceNo);
                                                        //return data.invoiceNo;
                                                    }
                                                    else {
                                                        console.log('inside else');
                                                        _this.presentAlert('Enter Invoice number');
                                                        //this.sharedService.presentToast('Enter Invoice number');
                                                        resolve('');
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
                    }); })];
            });
        });
    };
    AdminOrdersPage.prototype.proceedInvoiceGeneration = function (customInvoiceNo) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var invoiceRes;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('inisde generation');
                        return [4 /*yield*/, this.presentLoading("Generating invoice, please wait...")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.orderService.generateInvoice(this.orderData[0].id, { active: true, invoiceNo: customInvoiceNo })];
                    case 2:
                        invoiceRes = _a.sent();
                        this.loading.dismiss();
                        if (invoiceRes.status === 'generated') {
                            this.orderData[0]['invoice'] = invoiceRes;
                            this.presentAlert("Invoice generated successfully! Please download the new invoice after couple of minutes.");
                        }
                        else {
                            this.presentAlert("Invoice generation failed, please try again later.");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.generateInvoice = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var invoiceData, customInvoiceNo, invoiceRes;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminSettingsService.getInvoiceData('getInvoiceData')];
                    case 1:
                        invoiceData = _a.sent();
                        console.log('invoiceData:', invoiceData);
                        if (!(invoiceData && invoiceData.isCustomInvoiceNo)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.showCustomAlert()];
                    case 2:
                        customInvoiceNo = _a.sent();
                        console.log('customInvoiceNo:', customInvoiceNo);
                        if (customInvoiceNo) {
                            this.proceedInvoiceGeneration(customInvoiceNo);
                        }
                        return [3 /*break*/, 6];
                    case 3:
                        console.log('inisde else');
                        return [4 /*yield*/, this.presentLoading("Generating invoice, please wait...")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.orderService.generateInvoice(this.orderData[0].id)];
                    case 5:
                        invoiceRes = _a.sent();
                        this.loading.dismiss();
                        if (invoiceRes.status === 'generated') {
                            this.orderData[0]['invoice'] = invoiceRes;
                            this.presentAlert("Invoice generated successfully!");
                        }
                        else {
                            this.presentAlert("Invoice generation failed, please try again later.");
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.openImg = function (url) {
        window.open(url, "_blank");
    };
    AdminOrdersPage.prototype.getFinalAmount = function () {
        var amount = this.orderData[0].totalAmountToPaid - this.orderData[0].walletAmount - (this.orderData[0].cashbackAmount || 0);
        if (this.isPartialOrder()) {
            amount -= this.orderData[0].partialPayment.online.amount;
        }
        return amount;
    };
    AdminOrdersPage.prototype.isPartialOrder = function () {
        return ('partialPayment' in this.orderData[0]) && (this.orderData[0].partialPayment.status && this.orderData[0].partialPayment.online.completed) ? true : false;
    };
    AdminOrdersPage.prototype.isEstimatedTimeAvailable = function () {
        return ('estimatedDeliveryTime' in this.orderData[0]) && this.orderData[0].estimatedDeliveryTime !== '' ? true : false;
    };
    AdminOrdersPage.prototype.isDeliveryScheduled = function () {
        return this.orderData[0].scheduledDate ? true : false;
    };
    AdminOrdersPage.prototype.isInstantDelivery = function () {
        return ('instantDelivery' in this.orderData[0]) && this.orderData[0].instantDelivery.selected ? true : false;
    };
    AdminOrdersPage.prototype.isResaleOrder = function () {
        return 'resale' in this.orderData[0];
    };
    AdminOrdersPage.prototype.onClickResaleBtn = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: src_app_admin_resale_order_resale_order_page__WEBPACK_IMPORTED_MODULE_14__["ResaleOrderPage"],
                            componentProps: {
                                resale: this.orderData[0].resale,
                                products: this.orderData[0].products,
                                orderId: this.orderData[0].id,
                                viewBy: 'admin'
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.editOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            componentProps: {
                                order: this.orderData[0]
                            },
                            component: src_app_admin_admin_shop_all_orders_edit_order_edit_order_page__WEBPACK_IMPORTED_MODULE_15__["EditOrderPage"],
                            cssClass: 'custom-modal'
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (res) {
                            if (res && res.data) {
                                _this.events.publish('user:getOrderDetailsWithOrderId', _this.orderId);
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
    AdminOrdersPage.prototype.showEditOrderBtn = function () {
        if (this.orderData[0].hasOwnProperty('autoConfirmOrder') && (this.orderData[0].status === 'Pending' || this.orderData[0].status === 'Confirmed' || this.orderData[0].status === 'Dispatched') && (!this.orderData[0].hasOwnProperty('orderType') || (this.orderData[0].hasOwnProperty('orderType') && this.orderData[0].orderType !== 'subscription'))) {
            return true;
        }
        else {
            return false;
        }
    };
    AdminOrdersPage.prototype.getUnavailableProductPrice = function (index) {
        var product = this.orderData[0].products[index];
        var price = 0;
        if (product.hasOwnProperty('pack') && (product.pack.variantType === 'pieces')) {
            price = product.pack.price;
        }
        else {
            price = product.price;
        }
        price = (price - (((product.membershipDiscount || 0) / product.quantity) + ((product.couponDiscount || 0) / product.quantity))) * this.orderData[0].unavailable[index];
        return price;
    };
    AdminOrdersPage.prototype.showUnavailablePrice = function () {
        if (this.orderData[0].unavailablePrice) {
            return true;
        }
        else {
            return false;
        }
    };
    AdminOrdersPage.prototype.getStarColor = function (rating) {
        return this.sharedService.getStarColor(rating);
    };
    AdminOrdersPage.prototype.loadMoreOrders = function (event) {
        if (this.currentOrders == 'typeSense') {
            this.loadMoreUsersTypeSense(event);
        }
        else if (this.currentOrders == 'pending') {
            this.loadMorePendingOrdersForAdmin();
        }
        else if (this.currentOrders == 'failed') {
            this.loadMorePaymentFailedOrders();
        }
        else if (this.currentOrders == 'paymentPending') {
            this.loadMorePaymentPendingOrders();
        }
        else if (this.currentOrders == 'cancelled') {
            this.loadMoreCancelledOrders();
        }
        else if (this.currentOrders == 'returned') {
            this.loadMoreReturnedOrders();
        }
        else if (this.currentOrders == 'completed') {
            this.loadMoreCompletedOrdersForAdmin();
        }
        else {
            this.loadMoreDispatchedOrdersForAdmin();
        }
    };
    AdminOrdersPage.prototype.checkProductToDeliver = function () {
        this.router.navigate(['products-to-deliver']);
    };
    AdminOrdersPage.prototype.typeSenseSearchQuery = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var typeSenseResponse;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.searchOrder != '')) return [3 /*break*/, 7];
                        this.page = 1;
                        return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.searchEngineService.getSearchOrdersFromTypeSenseUsingSingleSearch(this.searchOrder, this.page, 'new_search', [])];
                    case 2:
                        typeSenseResponse = _a.sent();
                        console.log("typeSenseResponse", typeSenseResponse);
                        return [4 /*yield*/, this.sharedService.loading.dismiss()];
                    case 3:
                        _a.sent();
                        if (!(typeSenseResponse && typeSenseResponse.status === 'available' && typeSenseResponse.orders.length)) return [3 /*break*/, 4];
                        this.ordersList = typeSenseResponse.orders;
                        this.onClickViewDetails(this.ordersList[0].orderId);
                        this.showLoadMoreBtn = true;
                        this.currentOrders = 'typeSense';
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.sharedService.presentAlert("Search item not available!")];
                    case 5:
                        _a.sent();
                        this.resetSearch();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.sharedService.presentAlert("Please enter valid details!")];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.loadMoreUsersTypeSense = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var typeSenseResponse;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('loading more data...');
                        this.page += 1;
                        return [4 /*yield*/, this.searchEngineService.getSearchOrdersFromTypeSenseUsingSingleSearch(this.searchOrder, this.page, 'existing_search', this.ordersList)];
                    case 1:
                        typeSenseResponse = _a.sent();
                        if (typeSenseResponse && typeSenseResponse.status === 'available' && typeSenseResponse.orders.length) {
                            this.ordersList = typeSenseResponse.orders;
                            this.onClickViewDetails(this.ordersList[0].orderId);
                            this.showLoadMoreBtn = true;
                            this.noMoreOrders = false;
                        }
                        else {
                            this.noMoreOrders = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.searchOrderById = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!isNaN(parseInt(this.searchOrder))) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.userService.returnOrderDetailsWithOrderId(parseInt(this.searchOrder))
                            // console.log(this.ordersList)
                        ];
                    case 1:
                        _a.ordersList = _b.sent();
                        // console.log(this.ordersList)
                        if (this.ordersList && this.ordersList.length > 0) {
                            this.onClickViewDetails(this.ordersList[0].orderId);
                            this.showLoadMoreBtn = false;
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
    AdminOrdersPage.prototype.resetSearch = function () {
        this.searchOrder = '';
        this.showLoadMoreBtn = true;
        if (this.currentOrders == 'pending') {
            this.getPendingOrders();
        }
        else if (this.currentOrders == 'failed') {
            this.getPaymentFailedOrders();
        }
        else if (this.currentOrders == 'paymentPending') {
            this.getPaymentPendingOrders();
        }
        else if (this.currentOrders == 'cancelled') {
            this.getCancelledOrders();
        }
        else if (this.currentOrders == 'rejected') {
            this.getRejectedOrders();
        }
        else if (this.currentOrders == 'returned') {
            this.getReturnedOrders();
        }
        else if (this.currentOrders == 'completed') {
            this.getCompletedOrders();
        }
        else {
            this.getDispatchedOrders();
        }
    };
    AdminOrdersPage.prototype.filterOrder = function () {
        if (!this.startDate && !this.endDate) {
            var days = document.getElementById('days').value;
            this.currentDays = parseInt(days);
            this.currentFilter = 'Last ' + this.currentDays + ' Days';
            this.endOrders = new Date(new Date().getTime() - (this.currentDays * 24 * 60 * 60 * 1000));
            this.resetSearch();
        }
        else if (!this.startDate || !this.endDate) {
            this.presentAlert('Please enter both start date and end date');
        }
        else {
            this.startOrders = new Date(this.endDate);
            this.endOrders = new Date(this.startDate);
            this.dateFiltered = true;
            this.currentFilter = 'Orders from ' + moment__WEBPACK_IMPORTED_MODULE_8__(new Date(this.startDate)).format('D MMM, YYYY') + ' to ' + moment__WEBPACK_IMPORTED_MODULE_8__(new Date(this.endDate)).format('D MMM, YYYY');
            this.resetSearch();
        }
    };
    AdminOrdersPage.prototype.clearFilter = function () {
        this.startDate = undefined;
        this.endDate = undefined;
        this.currentDays = 7;
        this.currentFilter = 'Last ' + this.currentDays + ' Days';
        this.startOrders = new Date();
        this.endOrders = new Date(new Date().getTime() - (this.currentDays * 24 * 60 * 60 * 1000));
        this.resetSearch();
        this.dateFiltered = true;
    };
    AdminOrdersPage.prototype.selectDate = function (dateSelected) {
        this.startDate = undefined;
        this.endDate = undefined;
        this.currentDays = dateSelected;
        this.currentFilter = 'Last ' + this.currentDays + ' Days';
        this.startOrders = new Date();
        this.endOrders = new Date(new Date().getTime() - (this.currentDays * 24 * 60 * 60 * 1000));
        this.resetSearch();
    };
    AdminOrdersPage.prototype.archiveOrder = function (id, index) {
        var obj = {
            subStatus: {
                isArchive: true
            }
        };
        this.archiveIndex = index;
        this.events.publish('order:updateOrderArchive', id, obj);
    };
    AdminOrdersPage.prototype.isStatusTimelinePresent = function (status) {
        return this.orderData[0].timeline.hasOwnProperty(status);
    };
    AdminOrdersPage.prototype.isStatusCancelled = function (status) {
        return ['Cancelled', 'Rejected'].includes(status);
    };
    AdminOrdersPage.prototype.hideStatuses = function (status) {
        var rejectedHides = ['Confirmed', 'Cancelled', 'Dispatched', 'Delivered', 'Returned'];
        var cancelledHides = ['Rejected', 'Dispatched', 'Delivered', 'Returned'];
        var returnedHides = ['Rejected', 'Cancelled'];
        var cancelOrReturnedStatuses = ['Cancelled', 'Rejected', 'Returned'];
        if (this.orderData[0].status === 'Rejected') {
            return rejectedHides.includes(status);
        }
        if (this.orderData[0].status === 'Cancelled') {
            return cancelledHides.includes(status);
        }
        if (this.orderData[0].status === 'Returned') {
            return returnedHides.includes(status);
        }
        if (!(cancelOrReturnedStatuses.includes(this.orderData[0].status))) {
            return cancelOrReturnedStatuses.includes(status);
        }
    };
    AdminOrdersPage.prototype.isLastStatus = function (status) {
        return this.orderData[0].status !== 'Returned' && status === 'Delivered';
    };
    AdminOrdersPage.prototype.activeLabels = function () {
        this.showLabels = !this.showLabels;
        if (!this.showLabels) {
            this.previousId = 'status2';
            this.currentOrders = 'pending';
            this.resetSearch();
        }
        else {
            this.previousId = 'labelStatus0';
        }
    };
    AdminOrdersPage.prototype.addLabel = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var updated;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.labels.push(this.newLabelName);
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userService.updateOrderLabels(this.labels)];
                    case 2:
                        updated = _a.sent();
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 3:
                        _a.sent();
                        if (!updated) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.presentAlert('Label Added Successfully!')];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.deleteLabel = function (index) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var deleted;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.labels.splice(index, 1);
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userService.deleteLabels(this.labels)];
                    case 2:
                        deleted = _a.sent();
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 3:
                        _a.sent();
                        if (!deleted) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.presentAlert('Label Deleted Successfully!')];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.onChangeLabel = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var selectedLabel, assignLabel;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selectedLabel = event.target.value;
                        return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userService.assignLabelToOrder(selectedLabel, this.orderData[0].id)];
                    case 2:
                        assignLabel = _a.sent();
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 3:
                        _a.sent();
                        if (!assignLabel) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.presentAlert('Label Assigned Successfully!')];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.removeLabel = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var removeLabel;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userService.removeLabel(this.orderData[0].id)];
                    case 2:
                        removeLabel = _a.sent();
                        return [4 /*yield*/, delete this.orderData[0].label];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 4:
                        _a.sent();
                        if (!removeLabel) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.presentAlert('Label Removed Successfully!')];
                    case 5:
                        _a.sent();
                        this.getOrderWithLables(this.currentOrders, this.chosenIndex);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.editQuotation = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            componentProps: {
                                order: this.orderData[0]
                            },
                            component: _quotation_edit_quotation_edit_page__WEBPACK_IMPORTED_MODULE_19__["QuotationEditPage"],
                            cssClass: 'custom-modal'
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (res) {
                            if (res && res.data) {
                                console.log('edit order modal res -> ', res.data);
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
    AdminOrdersPage.prototype.openChatModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            componentProps: {
                                order: this.orderData[0]
                            },
                            component: _quotation_chat_quotation_chat_page__WEBPACK_IMPORTED_MODULE_18__["QuotationChatPage"],
                            cssClass: 'custom-modal'
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (res) {
                            if (res && res.data) {
                                console.log('edit order modal res -> ', res.data);
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
    AdminOrdersPage.prototype.addComment = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var commentData, commentAdded;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        if (this.orderData[0].orderComment) {
                            commentData = this.orderData[0].orderComment;
                        }
                        else {
                            commentData = '';
                        }
                        return [4 /*yield*/, this.userService.addComment(this.orderData[0].id, commentData)];
                    case 2:
                        commentAdded = _a.sent();
                        return [4 /*yield*/, this.loading.dismiss()];
                    case 3:
                        _a.sent();
                        if (!commentAdded) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.presentAlert('Added Comment Successfully!')];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.showInvoiceModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _invoices_invoices_page__WEBPACK_IMPORTED_MODULE_22__["InvoicesPage"],
                            cssClass: 'custom-modal',
                            componentProps: {
                                orderDetails: this.orderData[0],
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.openFilterModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _filters_filters_page__WEBPACK_IMPORTED_MODULE_23__["FiltersPage"],
                            cssClass: 'custom-modal',
                            componentProps: {
                                selectedFilters: this.filters,
                                userDetails: this.user,
                                managerDetails: this.managerDetails,
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (res) {
                            console.log('modal onDidDismiss...', res);
                            if (res && res.data && res.data.filters) {
                                console.log('inside dismiss:', _this.filters);
                                _this.filters = res.data.filters;
                                _this.resetSearch();
                            }
                            console.log('filter to modal:', _this.filters);
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.getCodAmount = function () {
        return this.orderData[0].payment.details.amount;
    };
    AdminOrdersPage.prototype.isAddonAvailable = function (product) {
        return product.addOns && product.addOns.options && Object.keys(product.addOns.options).length;
    };
    AdminOrdersPage.prototype.isWalletDeducted = function () {
        return this.orderData[0].metaData && this.orderData[0].metaData.walletDeducted;
    };
    AdminOrdersPage.prototype.getPhoneNo = function (phoneNo) {
        if (phoneNo) {
            if (phoneNo.charAt(0) === '0') {
                phoneNo = this.defaultCountryCode + phoneNo;
            }
            return phoneNo;
        }
    };
    AdminOrdersPage.prototype.getSubTotalPrice = function () {
        return this.sharedService.getSubTotalPrice(this.orderData[0]);
    };
    AdminOrdersPage.prototype.getTotalGst = function () {
        return this.sharedService.getTotalGst(this.orderData[0]);
    };
    AdminOrdersPage.prototype.generatePrintingInvoice = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var invoiceRes;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.orderService.generatePrintingInvoice(this.orderData[0].id)];
                    case 2:
                        invoiceRes = _a.sent();
                        return [4 /*yield*/, this.sharedService.loading.dismiss()];
                    case 3:
                        _a.sent();
                        console.log("invoiceRes", invoiceRes);
                        if (!(invoiceRes && invoiceRes.status === 'generated')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.sharedService.presentAlert("Printing Invoice generated successfully!")];
                    case 4:
                        _a.sent();
                        window.open(invoiceRes.url, '_blank');
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.sharedService.presentAlert("Invoice generation failed, please try again later.")];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AdminOrdersPage.prototype.imgZoom = function (img) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_26__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: [{ url: img }],
                index: 0
            }
        }).then(function (modal) { return modal.present(); });
    };
    AdminOrdersPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"] },
        { type: src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_5__["ProductService"] },
        { type: src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_10__["ConfigService"] },
        { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_12__["InAppBrowser"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_11__["SharedService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"] },
        { type: src_app_services_order_order_service__WEBPACK_IMPORTED_MODULE_13__["OrderService"] },
        { type: src_app_services_pickUp_pick_up_service__WEBPACK_IMPORTED_MODULE_20__["PickUpService"] },
        { type: src_app_services_admin_settings_admin_settings_service__WEBPACK_IMPORTED_MODULE_21__["AdminSettingsService"] },
        { type: src_app_services_manager_manager_service__WEBPACK_IMPORTED_MODULE_24__["ManagerService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"] },
        { type: src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_25__["WhatsappDashboardService"] },
        { type: src_app_services_search_engine_search_engine_service__WEBPACK_IMPORTED_MODULE_27__["SearchEngineService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
    ], AdminOrdersPage.prototype, "content", void 0);
    AdminOrdersPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-admin-orders',
            template: __webpack_require__(/*! raw-loader!./admin-orders.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-orders/admin-orders.page.html"),
            styles: [__webpack_require__(/*! ./admin-orders.page.scss */ "./src/app/admin/admin-orders/admin-orders.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"],
            src_app_services_product_product_service__WEBPACK_IMPORTED_MODULE_5__["ProductService"], src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"], src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_10__["ConfigService"], _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_12__["InAppBrowser"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_11__["SharedService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"], src_app_services_order_order_service__WEBPACK_IMPORTED_MODULE_13__["OrderService"],
            src_app_services_pickUp_pick_up_service__WEBPACK_IMPORTED_MODULE_20__["PickUpService"], src_app_services_admin_settings_admin_settings_service__WEBPACK_IMPORTED_MODULE_21__["AdminSettingsService"], src_app_services_manager_manager_service__WEBPACK_IMPORTED_MODULE_24__["ManagerService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_25__["WhatsappDashboardService"],
            src_app_services_search_engine_search_engine_service__WEBPACK_IMPORTED_MODULE_27__["SearchEngineService"]])
    ], AdminOrdersPage);
    return AdminOrdersPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-orders-admin-orders-module-es5.js.map