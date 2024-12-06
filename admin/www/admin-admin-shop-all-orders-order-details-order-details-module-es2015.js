(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-shop-all-orders-order-details-order-details-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-shop/all-orders/order-details/order-details.page.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-shop/all-orders/order-details/order-details.page.html ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Order id: ORD{{orderId}}</ion-title>\r\n  </ion-toolbar>\r\n\r\n</ion-header>\r\n\r\n\r\n<ion-content>\r\n  <div class=\"main-container fix-height\">\r\n    <div *ngIf=\"showLoader; else showOrderDetails\" class=\"spinner\">\r\n      <ion-spinner color=\"primary\"></ion-spinner>\r\n    </div>\r\n    <ng-template #showOrderDetails>\r\n      <div class=\"order-wrapper\">\r\n        <div class=\"order-details\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"12\" size-md=\"8\">\r\n                <h3>Order Status : {{orderData[0].status}}</h3>\r\n                <div\r\n                  *ngIf=\"!orderData[0].hasOwnProperty('orderType') || (orderData[0].hasOwnProperty('orderType') && orderData[0].orderType !== 'subscription')\">\r\n                  <div>\r\n                    <p class=\"payment-failed-msg\"\r\n                      *ngIf=\"orderData[0].payment.hasOwnProperty('status') && orderData[0].payment.status === 'failed'\">\r\n                      <strong>Payment failed</strong></p>\r\n                  </div>\r\n                  <br>\r\n                  <div class=\"payment-req\"\r\n                    *ngIf=\"!orderData[0].payment.completed && orderData[0].payment.mode !== 'cash' && (orderData[0].status === 'Confirmed' || orderData[0].status === 'Dispatched')\">\r\n                    <ion-button (click)=\"sendPaymentRequest()\" shape=\"round\" size=\"small\">\r\n                      Send payment request &nbsp;<i class=\"flaticon-credit-cards-payment\"></i>\r\n                    </ion-button>\r\n                  </div>\r\n                </div>\r\n                <br>\r\n                <div\r\n                  *ngIf=\"orderData[0].hasOwnProperty('deliveryAgentId') && (orderData[0].deliveryAgentId != '') && deliveryAgentName\">\r\n                  <p><strong>Delivery by : </strong> {{deliveryAgentName}}</p>\r\n                </div>\r\n                <br>\r\n                <div\r\n                  *ngIf=\"!orderData[0].hasOwnProperty('storePickupObj') || (orderData[0].hasOwnProperty('storePickupObj') && !orderData[0].storePickupObj.hasOwnProperty('charges')); else notDeliveryOrder;\">\r\n                  <div class=\"content-card\">\r\n                    <p class=\"content-heading\"><strong>Delivery Schedule</strong></p>\r\n                    <hr class=\"line\">\r\n\r\n                    <!-- No delivery schedule set -->\r\n                    <p *ngIf=\"!isDeliveryScheduled() && !isEstimatedTimeAvailable() && !isInstantDelivery()\">Not set by\r\n                      {{orderData[0].address.name}}</p>\r\n\r\n                    <!-- Estimated delivery time -->\r\n                    <p *ngIf=\"isEstimatedTimeAvailable()\">\r\n                      Expected delivery date according to customer's address is\r\n                      <strong>{{orderData[0].estimatedDeliveryTime}}</strong>\r\n                    </p>\r\n\r\n                    <!-- Instant delivery order -->\r\n                    <p *ngIf=\"isInstantDelivery()\">Customer has opted for instant delivery within\r\n                      <strong>{{orderData[0].instantDelivery.time}}</strong></p>\r\n\r\n                    <!-- Delivery scheduled selected -->\r\n                    <ng-container *ngIf=\"isDeliveryScheduled()\">\r\n                      <p *ngIf=\"!orderData[0].scheduledTime\"><strong>{{dateSchedule}}</strong> at any time</p>\r\n                      <p *ngIf=\"orderData[0].scheduledTime && orderData[0].scheduledTime.hasOwnProperty('start')\">\r\n                        <strong>{{dateSchedule}}</strong> at <strong>{{orderData[0].scheduledTime.start}} -\r\n                          {{orderData[0].scheduledTime.end}}</strong></p>\r\n                      <p *ngIf=\"orderData[0].scheduledTime && !orderData[0].scheduledTime.hasOwnProperty('start')\">\r\n                        <strong>{{dateSchedule}}</strong> at <strong>{{orderData[0].scheduledTime}}</strong></p>\r\n                    </ng-container>\r\n\r\n                  </div>\r\n                </div>\r\n                <ng-template #notDeliveryOrder>\r\n                  <br />\r\n                  <div class=\"content-card\">\r\n                    <p class=\"content-heading\"><strong>Store Pickup Address</strong></p>\r\n                    <hr class=\"line\">\r\n                    <p class=\"user-name\">{{orderData[0].storePickupObj.storeAddress.address}}</p>\r\n                  </div>\r\n                </ng-template>\r\n                <br />\r\n                <div class=\"content-card\" *ngIf=\"orderData[0].payment.completed\">\r\n                  <p class=\"content-heading\"><strong>Payment Mode</strong></p>\r\n                  <hr class=\"line\">\r\n                  <p class=\"user-name\" *ngIf=\"orderData[0].payment.mode !== 'upiManual'\">{{orderData[0].address.name}}\r\n                    paid using <span\r\n                      style=\"font-size: 15px;text-transform: capitalize;font-weight: bold;color: darkgreen;\">{{orderData[0].payment.mode}}</span>\r\n                  </p>\r\n\r\n                  <p class=\"user-name\" *ngIf=\"isPartialOrder()\">Partial payment of\r\n                    {{orderData[0].partialPayment.online.amount | currency: currencyCode: true: '0.0'}} made using\r\n                    {{orderData[0].partialPayment.online.mode}}</p>\r\n\r\n                  <div class=\"payment-ss\" *ngIf=\"orderData[0].payment.mode === 'upiManual'\">\r\n                    <p>\r\n                      Uploaded payment screenshot\r\n                    </p>\r\n                    <img [src]=\"orderData[0].payment.screenshot\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"content-card\"\r\n                  *ngIf=\"!orderData[0].payment.completed && orderData[0].payment.mode === 'cash'\">\r\n                  <p class=\"content-heading\"><strong>Payment info</strong></p>\r\n                  <hr class=\"line\">\r\n\r\n                  <p class=\"user-name\" *ngIf=\"isPartialOrder()\">Partial payment of\r\n                    {{orderData[0].partialPayment.online.amount | currency: currencyCode: true: '0.0'}} made using\r\n                    {{orderData[0].partialPayment.online.mode}}</p>\r\n\r\n                  <p class=\"user-name\">{{orderData[0].address.name}} will pay\r\n                    {{orderData[0].payment.details.amount | currency: currencyCode: true: '0.0'}} using <span style=\"font-size: 15px;text-transform: capitalize;font-weight: bold;\r\n                    color: darkgreen;\">{{orderData[0].payment.mode}}</span></p>\r\n                  <p class=\"update-status\">Update status if already paid <span (click)=\"onClickUpdatePaymentComplete()\"\r\n                      style=\"color: var(--ion-color-primary); cursor: pointer\">Update</span>\r\n                  </p>\r\n                </div>\r\n                <br />\r\n                <div class=\"content-card\"\r\n                  *ngIf=\"orderData[0].hasOwnProperty('vendorId') && (orderData[0].vendorId != '')\">\r\n                  <p><strong>Vendor : </strong> {{vendorData['name']}}</p>\r\n                </div>\r\n                <br>\r\n                <div class=\"content-card\" *ngIf=\"orderData[0].invoice?.status === 'generated'\">\r\n                  <p class=\"content-heading\"></p>\r\n                  <hr class=\"line\">\r\n\r\n\r\n                  <h4><a href=\"{{orderData[0].invoice.url}}\" download=\"Invoice-ORD{{orderId}}\" target=\"_blank\"\r\n                      class=\"invoiceBtn\"><strong>Download Invoice</strong></a></h4>\r\n                  <br>\r\n                  <div class=\"content-card\"\r\n                    *ngIf=\"orderData[0].status === 'Confirmed' && !(orderData[0].hasOwnProperty('message') && orderData[0].message !== '')\">\r\n                    <p>Enter Dispatch Message / Tracking Link</p>\r\n                    <ion-textarea [(ngModel)]=\"message\" rows=\"2\" placeholder=\"Enter your dispatch message here...\"\r\n                      class=\"dispatch-msg-textarea\"></ion-textarea>\r\n                  </div>\r\n                  <div class=\"content-card\"\r\n                    *ngIf=\"orderData[0].hasOwnProperty('message') && orderData[0].message !== ''\">\r\n                    <p class=\"content-heading\">Enter Dispatch Message / Tracking Link</p>\r\n                    <div class=\"dispatch-msg\" [innerHtml]=\"covertTextToUrl(orderData[0].message)\"></div>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n                <!-- Reselling option -->\r\n                <ng-container *ngIf=\"isResaleOrder()\">\r\n                  <div class=\"content-card\">\r\n                    <p class=\"content-heading\">Reselling Option</p>\r\n                    <hr class=\"line\">\r\n\r\n                    <h4 (click)=\"onClickResaleBtn()\" class=\"view-btn\">\r\n                      <strong>View Reselling Details</strong>\r\n                    </h4>\r\n                  </div>\r\n                </ng-container>\r\n                <!-- Reselling option -->\r\n\r\n                <!-- Generate Invoice -->\r\n                <ng-container *ngIf=\"showGenInvoiceBtn()\">\r\n                  <div class=\"content-card\">\r\n                    <hr class=\"line\">\r\n                    <h4 (click)=\"generateInvoice()\" class=\"invoiceBtn\"><strong>Generate Invoice</strong></h4>\r\n                  </div>\r\n                </ng-container>\r\n                <!-- Generate Invoice -->\r\n\r\n                <!-- Uploaded Doc -->\r\n                <ng-container\r\n                  *ngIf=\"orderData[0].hasOwnProperty('uploadedDoc') && orderData[0].uploadedDoc.uploads.length\">\r\n                  <div class=\"content-card\">\r\n                    <p class=\"content-heading\">Uploaded {{orderData[0].uploadedDoc.name}}</p>\r\n                    <hr class=\"line\">\r\n                    <div class=\"uploaded-doc-imgs\">\r\n                      <a (click)=\"openImg(img.url)\" *ngFor=\"let img of orderData[0].uploadedDoc.uploads; let i=index;\">\r\n                        <ion-img [src]=\"img.url\"></ion-img>\r\n                      </a>\r\n                    </div>\r\n                  </div>\r\n                </ng-container>\r\n                <!-- Uploaded Doc -->\r\n\r\n                <!-- cancel reason -->\r\n              <ng-container *ngIf=\"isCancelReasonAvailable()\">\r\n                <div class=\"content-card my-10\">\r\n                  <p class=\"content-heading\">Cancelled Reason</p>\r\n                  <hr class=\"line\">\r\n                  <p>\r\n                    <strong>Cancelled By</strong>: {{orderData[0].cancelData.by}}\r\n                  </p>\r\n                  <p>\r\n                    <strong>Reason</strong>: {{orderData[0].cancelData.reason}}\r\n                  </p>\r\n                </div>\r\n              </ng-container>\r\n\r\n              </ion-col>\r\n\r\n              <ion-col size=\"12\" size-md=\"4\">\r\n                <div class=\"address-wrap\">\r\n                  <h3>Delivery Address</h3>\r\n                  <br>\r\n                  <p> <strong>{{orderData[0].address.name}}</strong><br>\r\n                    {{orderData[0].address.address}}<br>\r\n                    {{orderData[0].address.city}}<br>\r\n                    {{orderData[0].address.state}}<br>\r\n                    {{orderData[0].address.pincode}}\r\n                  </p>\r\n                  <br>\r\n                  <p><strong style=\"font-size: 16px;\">Phone Number</strong> - {{orderData[0].address.phoneNo}}</p>\r\n                  <p class=\"phone-no\">Placed On: {{getDateTimeFormat(orderData[0].createdAt.toDate())}}</p>\r\n                  <br>\r\n                  <p *ngIf=\"orderData[0].customerGstNo && orderData[0].customerGstNo != ''\"><strong>Customer GST no :\r\n                    </strong>{{orderData[0].customerGstNo}}</p>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"!orderData[0].hasOwnProperty('storePickupObj') || (orderData[0].hasOwnProperty('storePickupObj') && !orderData[0].storePickupObj.hasOwnProperty('charges'))\">\r\n                  <br />\r\n                  <div class=\"assign-delivery\"\r\n                    *ngIf=\"orderData[0].status === 'Confirmed' || orderData[0].status === 'Dispatched'\">\r\n                    <ion-item lines=\"none\">\r\n                      <ion-label><strong>Delivery Agent</strong></ion-label>\r\n                      <ion-select [(ngModel)]=\"orderData[0].deliveryAgentId\" interface=\"popover\"\r\n                        placeholder=\"Select delivery agent\" (ionChange)=\"onChangeDeliveryAgent($event)\"\r\n                        *ngIf=\"!noDeliveryAgents && allDeliveryAgents.length\">\r\n                        <ion-select-option [value]=\"agents.id\" *ngFor=\"let agents of allDeliveryAgents\">{{agents.name}}\r\n                        </ion-select-option>\r\n                      </ion-select>\r\n                      <ion-select interface=\"popover\" placeholder=\"Select delivery agent\"\r\n                        (ionChange)=\"onSetupDeliveryAgent()\" *ngIf=\"noDeliveryAgents\">\r\n                        <ion-select-option>Setup Delivery Agent</ion-select-option>\r\n                      </ion-select>\r\n                    </ion-item>\r\n                  </div>\r\n                </div>\r\n                <ion-col size=\"12\" size-md=\"4\" *ngIf=\"orderData[0].additionalInfo\">\r\n                  <p><strong>Additional Information</strong></p>\r\n                  <br>\r\n                  <p class=\"userInfo\">{{orderData[0].additionalInfo}}</p>\r\n                  <!-- <p class=\"userInfo\" *ngIf=\"!orderData[0].additionalInfo\">Not provided</p> -->\r\n                </ion-col>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n        <div class=\"divider\"></div>\r\n        <!-- Edit Order -->\r\n        <div class=\"edit-order-btn\" *ngIf=\"showEditOrderBtn()\">\r\n          <ion-button (click)=\"editOrder()\" shape=\"round\" size=\"small\">\r\n            <i class=\"flaticon-pencil-edit-button\" style=\"margin-right: 8px;\"></i>\r\n            Edit Order \r\n          </ion-button>\r\n        </div>\r\n        <!-- Edit Order End -->\r\n\r\n        <div class=\"order-items-detail-wrapper\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"12\" size-xl=\"8\">\r\n                <div *ngFor=\"let product of orderData[0].products; let i=index\">\r\n                  <ion-item class=\"ion-no-padding\">\r\n                    <div slot=\"start\" *ngIf=\"product.img.mob\"\r\n                      [ngStyle]=\"{'background': 'url(' + product.img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n                      class=\"product-image\" (click)=\"goToPrdouctDetails(product)\"></div>\r\n                    <div slot=\"start\" *ngIf=\"!product.img.mob\"\r\n                      [ngStyle]=\"{'background': 'url(' + product.img.url + ') no-repeat center', 'background-size': 'contain'}\"\r\n                      class=\"product-image\" (click)=\"goToPrdouctDetails(product)\"></div>\r\n                    <ion-label>\r\n                      <h2 class=\"product-price ion-text-wrap\"\r\n                        *ngIf=\"!product.hasOwnProperty('pack') || (product.hasOwnProperty('pack') && product.pack.variantType && product.pack.variantType !== 'pieces')\"\r\n                        (click)=\"goToPrdouctDetails(product)\">\r\n                        {{product.price * product.quantity | currency: currencyCode:true}}</h2>\r\n                      <h2 class=\"product-price ion-text-wrap\"\r\n                        *ngIf=\"product.hasOwnProperty('pack') && product.pack.variantType && product.pack.variantType === 'pieces'\"\r\n                        (click)=\"goToPrdouctDetails(product)\">{{product.price | currency: currencyCode:true}}</h2>\r\n                      <h3 class=\"product-name ion-text-wrap\"><strong>{{product.name}}</strong></h3>\r\n                      <h6 class=\"product-description ion-text-capitalize\"><span\r\n                          *ngIf=\"product.hasOwnProperty('pack') && product.pack.variantType\"\r\n                          (click)=\"goToPrdouctDetails(product)\">{{product.pack.variantType}}:\r\n                        </span>{{product.description}}<span\r\n                          *ngIf=\"product.hasOwnProperty('pack') && product.pack.variantType && product.pack.variantType === 'pieces'\">\r\n                          X {{product.quantity}}</span></h6>\r\n                      <div\r\n                        *ngIf=\"!product.hasOwnProperty('pack') || (product.hasOwnProperty('pack') && product.pack.variantType && product.pack.variantType !== 'pieces')\"\r\n                        (click)=\"goToPrdouctDetails(product)\">\r\n                        <h3 class=\"product-quantity\">QTY: {{product.quantity}}</h3>\r\n                        <h3 class=\"product-name\"\r\n                          *ngIf=\"product.hasOwnProperty('orderType') && product.orderType === 'subscription'\">\r\n                          <strong>Subscription</strong></h3>\r\n                      </div>\r\n                      <div class=\"cart-counter\"\r\n                        *ngIf=\"product.hasOwnProperty('pack') && product.pack.variantType && product.pack.variantType === 'pieces' && product.totalPieces\">\r\n                        <!-- <div class=\"cart-counter-action\">\r\n                          <ion-icon name=\"remove\" (click)=\"decrementPieces(i)\"></ion-icon>\r\n                        </div> -->\r\n                        <div class=\"cart-counter-value\">\r\n                          {{product.totalPieces}}\r\n                        </div>\r\n                        <!-- <div class=\"cart-counter-action\">\r\n                          <ion-icon name=\"add\" (click)=\"incrementPieces(i)\"></ion-icon>\r\n                        </div> -->\r\n                      </div>\r\n                    </ion-label>\r\n                  </ion-item>\r\n                  <div class=\"comment-box\" *ngIf=\"product.commentMsg\">\r\n                    {{orderData[0].address.name}}'s Message: {{product.commentMsg}}\r\n                  </div>\r\n                  <div *ngIf=\"product.commentImgs\">\r\n                    <div *ngIf=\"product.commentImgs.length !== 0\">\r\n                      <ion-grid class=\"ion-no-padding\">\r\n                        <ion-row class=\"ion-justify-content-start\">\r\n                          <ion-col size=\"2\" class=\"comment-img-conatiner\"\r\n                            *ngFor=\"let img of product.commentImgs; let imgIndex = index\">\r\n                            <div\r\n                              [ngStyle]=\"{'background': 'url(' + img.thumb + ') no-repeat center', 'background-size': 'contain'}\"\r\n                              class=\"comment-img\"></div>\r\n                          </ion-col>\r\n                        </ion-row>\r\n                      </ion-grid>\r\n                    </div>\r\n                  </div>\r\n                  <hr class=\"line\" *ngIf=\"i !== orderData[0].products.length - 1\">\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\" size-xl=\"4\">\r\n                <!-- Unavailable products Start-->\r\n                  <div class=\"products-container\" *ngIf=\"(orderData[0].unavailable | json) !== '{}'\"  style=\"border: 1px solid #ccc; margin-left: 26px; margin-bottom: 20px;\">\r\n                    <ion-list class=\"ion-no-padding\" lines=\"none\">\r\n                      <div class=\"content-heading\" style=\"padding: 8px 5px 0px;\">\r\n                        <b>Unavailable Products</b>\r\n                      </div>\r\n    \r\n                      <hr class=\"line\">\r\n    \r\n                      <div *ngFor=\"let product of orderData[0].unavailable | keyvalue\">\r\n                        <ng-container *ngIf=\"orderData[0].unavailable[product.key]\">\r\n                          <ion-item class=\"ion-no-padding\">\r\n                            <div *ngIf=\"orderData[0].products[product.key].img.mob\" slot=\"start\"\r\n                              [ngStyle]=\"{'background': 'url(' + orderData[0].products[product.key].img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n                              class=\"product-image\"></div>\r\n                            <div\r\n                              *ngIf=\"!orderData[0].products[product.key].img.mob && orderData[0].products[product.key].img.url\"\r\n                              slot=\"start\"\r\n                              [ngStyle]=\"{'background': 'url(' + orderData[0].products[product.key].img.url + ') no-repeat center', 'background-size': 'contain'}\"\r\n                              class=\"product-image\"></div>\r\n                            <div\r\n                              *ngIf=\"!orderData[0].products[product.key].img.mob && !orderData[0].products[product.key].img.url\"\r\n                              slot=\"start\" class=\"no-product-image\"></div>\r\n    \r\n                            <ion-label>\r\n                              <h3 class=\"product-name ion-text-wrap\">{{orderData[0].products[product.key].name}}</h3>\r\n                              <h3 class=\"product-quantity opacity-07\">Quantity: {{orderData[0].unavailable[product.key]}}</h3>\r\n                              <h6 class=\"f-w-b m-t-8\">\r\n                                {{getUnavailableProductPrice(product.key) | currency: currencyCode:true:'0.0'}}</h6>\r\n                            </ion-label>\r\n                          </ion-item>\r\n                          <hr class=\"line\">\r\n                        </ng-container>\r\n                      </div>\r\n    \r\n                      <div class=\"d-flex-sb\">\r\n                        <p><b>Total Amount:</b> {{orderData[0].unavailablePrice | currency: currencyCode:true:'0.0'}}</p>\r\n                      </div>\r\n    \r\n                    </ion-list>\r\n                  </div>\r\n                <!-- Unavailable products End -->\r\n\r\n                <div class=\"order-summery-wrapper\">\r\n                  <h3>Order Summary</h3>\r\n                  <table>\r\n                    <tr>\r\n                      <td>Number of Items</td>\r\n                      <td>{{getTotalItems()}} items</td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td>Subtotal</td>\r\n                      <td>{{orderData[0].totalMrp - orderData[0].defaultGst | currency: currencyCode:true}}</td>\r\n                    </tr>\r\n                    <tr *ngIf=\"orderData[0].discountOnMrp\">\r\n                      <td>Offer Discount</td>\r\n                      <td>-{{orderData[0].discountOnMrp | currency: currencyCode:true}}</td>\r\n                    </tr>\r\n                    <tr *ngIf=\"orderData[0].couponDiscount !== 0\">\r\n                      <td>Coupon Discount</td>\r\n                      <td>-{{orderData[0].couponDiscount | currency: currencyCode:true}}</td>\r\n                    </tr>\r\n                    <tr *ngIf=\"orderData[0].membershipDiscount\">\r\n                      <td>Membership Discount</td>\r\n                      <td>-{{orderData[0].membershipDiscount | currency: currencyCode:true}}</td>\r\n                    </tr>\r\n\r\n                    <tr *ngIf=\"orderData[0].extraChargeOnOrder?.charge\">\r\n                      <td>{{orderData[0].extraChargeOnOrder.name || 'Extra Charge'}}</td>\r\n                      <td>{{orderData[0].extraChargeOnOrder.charge | currency: currencyCode:true:'.2-2'}}</td>\r\n                    </tr>\r\n                    <tr *ngIf=\"orderData[0].extraChargeOnPayment?.charge\">\r\n                      <td>{{orderData[0].extraChargeOnPayment.name || 'Payment Gateway Charge'}}</td>\r\n                      <td>{{orderData[0].extraChargeOnPayment.charge | currency: currencyCode:true:'.2-2'}}</td>\r\n                    </tr>\r\n\r\n\r\n                    <tr\r\n                      *ngIf=\"orderData[0].hasOwnProperty('storePickupObj') && orderData[0].storePickupObj.hasOwnProperty('charges'); else noStorePickup;\">\r\n                      <td>Store Pickup Charges</td>\r\n                      <td>{{orderData[0].storePickupObj.charges | currency: currencyCode:true:'0.0'}}</td>\r\n                    </tr>\r\n                    <ng-template #noStorePickup>\r\n                      <tr>\r\n                        <td>Delivery</td>\r\n                        <td>\r\n                          <p *ngIf=\"orderData[0].delivery\">{{orderData[0].delivery | currency: currencyCode:true:'0.0'}}\r\n                          </p>\r\n                          <p *ngIf=\"!orderData[0].delivery\" style=\"color: var(--ion-color-success);\">Free</p>\r\n                        </td>\r\n                      </tr>\r\n                    </ng-template>\r\n\r\n                    <tr *ngIf=\"orderData[0].defaultGst !== 0\">\r\n                      <td>GST</td>\r\n                      <td>+ {{orderData[0].defaultGst | currency: currencyCode:true:'0.0'}}</td>\r\n                    </tr>\r\n\r\n                    <tr *ngIf=\"showUnavailablePrice()\">\r\n                      <td>Total Unavailable</td>\r\n                      <td>-{{orderData[0].unavailablePrice | currency: currencyCode:true:'0.0'}}</td>\r\n                    </tr>\r\n                  </table>\r\n                  <div class=\"sub-total-wrap\">\r\n                    <table>\r\n                      <tr>\r\n                        <td>\r\n                          <h3>Total Amount</h3>\r\n                          <span>(Incl of all taxes)</span>\r\n                        </td>\r\n                        <td>\r\n                          <h3>{{orderData[0].totalAmountToPaid | currency: currencyCode:true}}</h3>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n                  </div>\r\n                  <div *ngIf=\"orderData[0].walletAmount || orderData[0].cashbackAmount || isPartialOrder()\">\r\n                    <table>\r\n                      <tr *ngIf=\"orderData[0].walletAmount\">\r\n                        <td>\r\n                          <h3>Wallet Amount</h3>\r\n                        </td>\r\n                        <td>\r\n                          <h3>-{{orderData[0].walletAmount | currency: currencyCode:true:'0.0'}}</h3>\r\n                        </td>\r\n                      </tr>\r\n                      <tr *ngIf=\"orderData[0].cashbackAmount\">\r\n                        <td>\r\n                          <h3>Cashback Used</h3>\r\n                        </td>\r\n                        <td>\r\n                          <h3>-{{orderData[0].cashbackAmount | currency: currencyCode:true:'0.0'}}</h3>\r\n                        </td>\r\n                      </tr>\r\n                      <tr *ngIf=\"isPartialOrder() && orderData[0].partialPayment.online.amount;\">\r\n                        <td>\r\n                          <h3>Paid Onlne</h3>\r\n                        </td>\r\n                        <td>\r\n                          <h3>-{{orderData[0].partialPayment.online.amount | currency: currencyCode:true:'0.0'}}</h3>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n                    <div class=\"sub-total-wrap\">\r\n                      <table>\r\n                        <tr>\r\n                          <td>\r\n                            <h3 *ngIf=\"!orderData[0].payment.completed\">Amount Payable</h3>\r\n                            <h3 *ngIf=\"orderData[0].payment.completed\">Amount Paid</h3>\r\n                          </td>\r\n                          <td>\r\n                            <h3>{{getFinalAmount() | currency: currencyCode:true:'0.0'}}</h3>\r\n                          </td>\r\n                        </tr>\r\n                      </table>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"white-sep\"></div>\r\n                  <!--<div class=\"pay-method-wrap\">\r\n                    <table>\r\n                      <tr>\r\n                        <td>Payment Method</td>\r\n                        <td>Google Pay BHIM UPI</td>\r\n                      </tr>\r\n                    </table>\r\n                  </div>-->\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n        <div class=\"content-card\" *ngIf=\"orderData[0].hasOwnProperty('rating')\">\r\n          <div class=\"divider\"></div>\r\n          <p class=\"content-heading\">Review Order</p>\r\n          <hr class=\"line\">\r\n          <div class=\"user-rating\">\r\n            <ionic4-star-rating activeIcon=\"ios-star\" defaultIcon=\"ios-star-outline\"\r\n              [activeColor]=\"getStarColor(orderData[0].rating.rating)\" defaultColor=\"#e1e1e1\" readonly=\"true\"\r\n              [rating]=\"orderData[0].rating.rating\" fontSize=\"15px\" halfStar='true'>\r\n            </ionic4-star-rating>\r\n            <p class=\"user-rating-review\">{{orderData[0].rating.review}}</p>\r\n            <div class=\"user-rating-photos\" *ngIf=\"orderData[0].rating.photos && orderData[0].rating.photos.length\">\r\n              <ion-img [src]=\"photo.mob\" *ngFor=\"let photo of orderData[0].rating.photos; let i=index;\"\r\n                class=\"previewImg\"></ion-img>\r\n            </div>\r\n            <p class=\"user-rating-date\">Rated On {{reviewDate() | date:'dd MMMM yyyy'}}</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </ng-template>\r\n  </div>\r\n</ion-content>\r\n\r\n<ion-footer *ngIf=\"!showLoader && orderData[0].status === 'Pending'\" class=\"page-footer\" no-border>\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"onClickRejectOrder()\" shape=\"round\" class=\"btn-1 i-start\" color=\"danger\">\r\n      <i class=\"flaticon-null-19\"></i>\r\n      Reject\r\n    </ion-button>\r\n    <ion-button (click)=\"onClickConfirmOrder()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20\"></i>\r\n      Confirm\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>\r\n\r\n\r\n<ion-footer *ngIf=\"!showLoader && orderData[0].status === 'Confirmed'\" class=\"page-footer\" no-border>\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"onClickCancelOrder()\" shape=\"round\" class=\"btn-1 i-start\" color=\"danger\">\r\n      <i class=\"flaticon-null-19\"></i>\r\n      Cancel\r\n    </ion-button>\r\n    <ion-button (click)=\"onClickDispatchOrder()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20\"></i>\r\n      Dispatched\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>\r\n\r\n\r\n<ion-footer *ngIf=\"!showLoader && orderData[0].status === 'Dispatched'\" class=\"page-footer\" no-border>\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"onClickCancelOrder()\" shape=\"round\" class=\"btn-1 i-start\" color=\"danger\">\r\n      <i class=\"flaticon-null-19\"></i>\r\n      Cancel\r\n    </ion-button>\r\n    <ion-button (click)=\"onClickDeliverOrder()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20\"></i>\r\n      Delivered\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>\r\n\r\n\r\n<ion-footer *ngIf=\"!showLoader && orderData[0].status === 'Delivered'\" class=\"page-footer\" no-border>\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"onClickReturnOrder()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20\"></i>\r\n      Returned\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/admin/admin-shop/all-orders/order-details/order-details.module.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/admin/admin-shop/all-orders/order-details/order-details.module.ts ***!
  \***********************************************************************************/
/*! exports provided: OrderDetailsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderDetailsPageModule", function() { return OrderDetailsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _order_details_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./order-details.page */ "./src/app/admin/admin-shop/all-orders/order-details/order-details.page.ts");
/* harmony import */ var ionic4_star_rating__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ionic4-star-rating */ "./node_modules/ionic4-star-rating/dist/index.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");









const routes = [
    {
        path: '',
        component: _order_details_page__WEBPACK_IMPORTED_MODULE_6__["OrderDetailsPage"]
    }
];
let OrderDetailsPageModule = class OrderDetailsPageModule {
};
OrderDetailsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ionic4_star_rating__WEBPACK_IMPORTED_MODULE_7__["StarRatingModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
        ],
        declarations: [_order_details_page__WEBPACK_IMPORTED_MODULE_6__["OrderDetailsPage"]],
        entryComponents: []
    })
], OrderDetailsPageModule);



/***/ }),

/***/ "./src/app/admin/admin-shop/all-orders/order-details/order-details.page.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/admin/admin-shop/all-orders/order-details/order-details.page.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@charset \"UTF-8\";\n.order-details {\n  margin-top: 24px;\n}\n.address-wrap {\n  border-left: var(--ion-color-medium) 1px solid;\n  padding: 24px;\n}\n.address-wrap h3 {\n  font-size: 16px;\n  font-weight: 500;\n  margin: 0;\n}\n.divider {\n  border-bottom: solid 1px var(--ion-color-medium);\n  margin: 26px 0;\n}\n.items-wrapper table {\n  width: 100%;\n}\n.items-wrapper table td {\n  padding: 8px;\n  border-bottom: var(--ion-color-light) 1px solid;\n}\n.items-wrapper table td.img {\n  width: 64px;\n}\n.items-wrapper table td.img img {\n  width: 100%;\n}\n.items-wrapper table td.price-detail {\n  color: #333;\n}\n.items-wrapper table td.total-price {\n  color: var(--ion-color-success);\n}\n.items-wrapper table .item-qty {\n  color: #333;\n}\n.product-image {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n  width: 100px;\n  height: 80px;\n}\n.product-name {\n  font-size: 18px;\n  margin-top: 7px;\n  margin-bottom: 7px;\n}\n.toggle {\n  padding: 24px;\n  text-align: center;\n  border-top: var(--ion-color-medium) 1px solid;\n  margin: 26px -24px -24px -24px;\n  color: var(--ion-color-primary);\n  cursor: pointer;\n}\n.order-summery-wrapper {\n  background: var(--ion-color-medium);\n  padding: 24px;\n  border-radius: 16px;\n  margin-left: 26px;\n}\n.order-summery-wrapper h3 {\n  font-size: 16px;\n  font-weight: 500;\n  margin: 0;\n}\n.order-summery-wrapper table {\n  width: 100%;\n}\n.order-summery-wrapper table td {\n  padding: 4px 0;\n}\n.order-summery-wrapper table td:last-child {\n  text-align: right;\n}\n.order-summery-wrapper .sub-total-wrap {\n  border-top: #ccc 1px solid;\n  margin-top: 16px;\n  padding-top: 16px;\n}\n.order-summery-wrapper .sub-total-wrap h3 {\n  font-size: 18px;\n  display: inline;\n}\n.order-summery-wrapper .sub-total-wrap span {\n  margin-left: 6px;\n  font-size: 10px;\n}\n.order-summery-wrapper .pay-method-wrap {\n  border-top: #fff 1px solid;\n  margin: 16px -24px -24px -24px;\n  padding: 16px 24px;\n}\n/********************** multistep ************************/\n.multi-steps {\n  display: table;\n  table-layout: fixed;\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  padding: 25px 0 10px 0;\n  position: relative;\n  left: -8%;\n}\n.multi-steps > li.is-active:before,\n.multi-steps > li.is-active ~ li:before {\n  content: \"\";\n  font-family: Flaticon;\n  font-weight: 400;\n  background-color: var(--ion-color-success);\n  border-color: var(--ion-color-success);\n}\n.multi-steps > li.is-active:after,\n.multi-steps > li.is-active ~ li:after {\n  background-color: var(--ion-color-gray);\n  border-color: var(--ion-color-gray);\n}\n.multi-steps > li {\n  counter-increment: stepNum;\n  text-align: center;\n  display: table-cell;\n  position: relative;\n  color: var(--ion-color-success);\n  font-size: 12px;\n  padding: 16px 0;\n}\n.multi-steps > li:before {\n  content: \"\";\n  font-family: Flaticon;\n  display: block;\n  margin: 0 auto 4px;\n  background-color: var(--ion-color-success);\n  width: 24px;\n  height: 24px;\n  line-height: 24px;\n  text-align: center;\n  font-weight: 400;\n  border-width: 1px;\n  border-style: solid;\n  border-color: var(--ion-color-success);\n  border-radius: 50%;\n  position: relative;\n  z-index: 1;\n  color: #fff;\n  font-size: 10px;\n}\n.multi-steps > li:after {\n  content: \"\";\n  height: 1px;\n  width: 100%;\n  background-color: var(--ion-color-success);\n  position: absolute;\n  top: 29px;\n  left: 50%;\n}\n.multi-steps > li:last-child:after {\n  display: none;\n}\n.multi-steps > li.is-active:before {\n  background-color: var(--ion-color-success);\n  border-color: var(--ion-color-success);\n  color: #fff;\n}\n.multi-steps > li.is-active ~ li {\n  color: #111;\n}\n.multi-steps > li.is-active ~ li:before {\n  background-color: var(--ion-color-gray);\n  border-color: var(--ion-color-gray);\n  color: var(--ion-color-gray);\n}\n.reset-password-container {\n  width: 90%;\n  margin: 32px auto;\n  text-align: center;\n}\nspan.date {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n  width: 110px;\n}\n.fix-height {\n  max-height: calc(100vh - 315px);\n  overflow-y: scroll;\n  padding: 16px;\n}\n/**********************multistep end************************/\n@media (max-width: 1400px) {\n  .multi-steps {\n    position: static;\n  }\n}\n@media (max-width: 1200px) {\n  .order-summery-wrapper {\n    margin-left: 0;\n    margin-top: 26px;\n  }\n}\n@media (max-width: 992px) {\n  .address-wrap {\n    border-left: 0;\n    border-top: var(--ion-color-medium) 1px solid;\n  }\n}\n@media (max-width: 500px) {\n  .header {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n            flex-direction: column;\n  }\n  .header .btn-2-outline {\n    margin-top: 16px;\n  }\n\n  .multi-steps {\n    display: initial;\n    table-layout: unset;\n    list-style: none;\n    padding: 0;\n    margin: 0;\n  }\n\n  .multi-steps > li {\n    display: list-item;\n    padding: 0 32px;\n    margin-bottom: 36px;\n    text-align: left;\n  }\n  .multi-steps > li span.date {\n    position: static;\n  }\n  .multi-steps > li span.status {\n    margin-left: 6px;\n    font-weight: 500;\n  }\n\n  .multi-steps > li:before {\n    position: absolute;\n    left: 0;\n    top: 0;\n  }\n\n  .multi-steps > li:after {\n    position: absolute;\n    top: 0;\n    left: 12px;\n    width: 1px;\n    height: 60px;\n  }\n}\n.previewImg {\n  padding: 10px;\n  border-radius: 10px;\n}\n.user-rating-photos {\n  display: -webkit-box;\n  display: flex;\n}\n.uploaded-doc-imgs {\n  margin-top: 10px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n          align-items: center;\n  flex-wrap: wrap;\n}\n.uploaded-doc-imgs a {\n  display: -webkit-box;\n  display: flex;\n  cursor: pointer;\n}\n.uploaded-doc-imgs ion-img {\n  width: 60px;\n  height: 60px;\n  -o-object-fit: fill;\n     object-fit: fill;\n  margin-right: 15px;\n  border: 1px solid #ccc;\n}\n.invoiceBtn, .view-btn {\n  padding: 10px;\n  border: 1px solid #f40d30;\n  border-radius: 8px;\n  background-color: #f40d30;\n  color: white;\n  text-decoration: none;\n  width: 130px;\n  text-align: center;\n}\n.view-btn {\n  cursor: pointer;\n  width: 200px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tc2hvcC9hbGwtb3JkZXJzL29yZGVyLWRldGFpbHMvb3JkZXItZGV0YWlscy5wYWdlLnNjc3MiLCJzcmMvYXBwL2FkbWluL2FkbWluLXNob3AvYWxsLW9yZGVycy9vcmRlci1kZXRhaWxzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcYWRtaW4tc2hvcFxcYWxsLW9yZGVyc1xcb3JkZXItZGV0YWlsc1xcb3JkZXItZGV0YWlscy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FDRWhCO0VBQWUsZ0JBQUE7QURDZjtBQ0NBO0VBQ0UsOENBQUE7RUFDRSxhQUFBO0FERUo7QUNBRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLFNBQUE7QURFSjtBQ0VBO0VBQ0UsZ0RBQUE7RUFDQSxjQUFBO0FEQ0Y7QUNFRTtFQUNFLFdBQUE7QURDSjtBQ0FJO0VBQUcsWUFBQTtFQUFhLCtDQUFBO0FESXBCO0FDSEk7RUFDRSxXQUFBO0FES047QUNKTTtFQUFJLFdBQUE7QURPVjtBQ0xJO0VBQWdCLFdBQUE7QURRcEI7QUNQSTtFQUFlLCtCQUFBO0FEVW5CO0FDVEk7RUFBVSxXQUFBO0FEWWQ7QUNSQTtFQUNFLHNHQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QURXRjtBQ1RBO0VBQ0UsZUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBRFlGO0FDVEE7RUFDRSxhQUFBO0VBQ0Usa0JBQUE7RUFDQSw2Q0FBQTtFQUNBLDhCQUFBO0VBQ0EsK0JBQUE7RUFDQSxlQUFBO0FEWUo7QUNUQTtFQUNJLG1DQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QURZSjtBQ1hJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsU0FBQTtBRGFOO0FDWEU7RUFDRSxXQUFBO0FEYUo7QUNaSTtFQUFHLGNBQUE7QURlUDtBQ2RJO0VBQWMsaUJBQUE7QURpQmxCO0FDZkU7RUFDRSwwQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QURpQko7QUNoQkk7RUFBRyxlQUFBO0VBQWdCLGVBQUE7QURvQnZCO0FDbkJJO0VBQUssZ0JBQUE7RUFBaUIsZUFBQTtBRHVCMUI7QUNyQkU7RUFDRSwwQkFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7QUR1Qko7QUNuQkEsMERBQUE7QUFFQTtFQUNFLGNBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0FEcUJGO0FDbkJBOztFQUVFLFlBQUE7RUFDQSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0EsMENBQUE7RUFDQSxzQ0FBQTtBRHNCRjtBQ2xCQTs7RUFFRSx1Q0FBQTtFQUNBLG1DQUFBO0FEcUJGO0FDaEJBO0VBQ0UsMEJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSwrQkFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0FEbUJGO0FDaEJBO0VBQ0UsWUFBQTtFQUNBLHFCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsMENBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQ0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QURtQkY7QUNoQkE7RUFDRSxXQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSwwQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFNBQUE7QURtQkY7QUNoQkE7RUFDRSxhQUFBO0FEbUJGO0FDaEJBO0VBQ0UsMENBQUE7RUFDQSxzQ0FBQTtFQUNBLFdBQUE7QURtQkY7QUNoQkE7RUFDRSxXQUFBO0FEbUJGO0FDaEJBO0VBQ0UsdUNBQUE7RUFDQSxtQ0FBQTtFQUNBLDRCQUFBO0FEbUJGO0FDaEJBO0VBQ0UsVUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QURtQkY7QUNoQkE7RUFDSSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsbUNBQUE7VUFBQSwyQkFBQTtFQUNBLFlBQUE7QURtQko7QUNmQTtFQUNFLCtCQUFBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0FEa0JKO0FDaEJBLDREQUFBO0FBR0E7RUFDRTtJQUFhLGdCQUFBO0VEa0JiO0FBQ0Y7QUNoQkE7RUFDRTtJQUNFLGNBQUE7SUFDQSxnQkFBQTtFRGtCRjtBQUNGO0FDZkE7RUFDRTtJQUNFLGNBQUE7SUFDQSw2Q0FBQTtFRGlCRjtBQUNGO0FDZEE7RUFDRTtJQUNFLDRCQUFBO0lBQUEsNkJBQUE7WUFBQSxzQkFBQTtFRGdCRjtFQ2ZFO0lBQWUsZ0JBQUE7RURrQmpCOztFQ2hCQTtJQUNFLGdCQUFBO0lBQ0EsbUJBQUE7SUFDQSxnQkFBQTtJQUNBLFVBQUE7SUFDQSxTQUFBO0VEbUJGOztFQ2hCQTtJQUNFLGtCQUFBO0lBQ0EsZUFBQTtJQUNBLG1CQUFBO0lBQ0EsZ0JBQUE7RURtQkY7RUNsQkU7SUFDRSxnQkFBQTtFRG9CSjtFQ2xCRTtJQUFZLGdCQUFBO0lBQWlCLGdCQUFBO0VEc0IvQjs7RUNuQkE7SUFDRSxrQkFBQTtJQUNBLE9BQUE7SUFDQSxNQUFBO0VEc0JGOztFQ25CQTtJQUNFLGtCQUFBO0lBQ0EsTUFBQTtJQUNBLFVBQUE7SUFDQSxVQUFBO0lBQ0EsWUFBQTtFRHNCRjtBQUNGO0FDakJBO0VBQ0UsYUFBQTtFQUVBLG1CQUFBO0FEa0JGO0FDZkE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7QURrQkY7QUNmQTtFQUNFLGdCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EsdUJBQUE7VUFBQSwyQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxlQUFBO0FEa0JGO0FDakJFO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsZUFBQTtBRG1CSjtBQ2pCRTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7S0FBQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7QURtQk47QUNmQTtFQUNFLGFBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QURrQkY7QUNmQTtFQUVFLGVBQUE7RUFDQSxZQUFBO0FEaUJGIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vYWRtaW4tc2hvcC9hbGwtb3JkZXJzL29yZGVyLWRldGFpbHMvb3JkZXItZGV0YWlscy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG4ub3JkZXItZGV0YWlscyB7XG4gIG1hcmdpbi10b3A6IDI0cHg7XG59XG5cbi5hZGRyZXNzLXdyYXAge1xuICBib3JkZXItbGVmdDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xuICBwYWRkaW5nOiAyNHB4O1xufVxuLmFkZHJlc3Mtd3JhcCBoMyB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgbWFyZ2luOiAwO1xufVxuXG4uZGl2aWRlciB7XG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgbWFyZ2luOiAyNnB4IDA7XG59XG5cbi5pdGVtcy13cmFwcGVyIHRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG59XG4uaXRlbXMtd3JhcHBlciB0YWJsZSB0ZCB7XG4gIHBhZGRpbmc6IDhweDtcbiAgYm9yZGVyLWJvdHRvbTogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KSAxcHggc29saWQ7XG59XG4uaXRlbXMtd3JhcHBlciB0YWJsZSB0ZC5pbWcge1xuICB3aWR0aDogNjRweDtcbn1cbi5pdGVtcy13cmFwcGVyIHRhYmxlIHRkLmltZyBpbWcge1xuICB3aWR0aDogMTAwJTtcbn1cbi5pdGVtcy13cmFwcGVyIHRhYmxlIHRkLnByaWNlLWRldGFpbCB7XG4gIGNvbG9yOiAjMzMzO1xufVxuLml0ZW1zLXdyYXBwZXIgdGFibGUgdGQudG90YWwtcHJpY2Uge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xufVxuLml0ZW1zLXdyYXBwZXIgdGFibGUgLml0ZW0tcXR5IHtcbiAgY29sb3I6ICMzMzM7XG59XG5cbi5wcm9kdWN0LWltYWdlIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzL2xvYWRlcmJiMTllZmNjMjc0OWUxMTUuZ2lmXCIpIGNlbnRlciBuby1yZXBlYXQ7XG4gIHdpZHRoOiAxMDBweDtcbiAgaGVpZ2h0OiA4MHB4O1xufVxuXG4ucHJvZHVjdC1uYW1lIHtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBtYXJnaW4tdG9wOiA3cHg7XG4gIG1hcmdpbi1ib3R0b206IDdweDtcbn1cblxuLnRvZ2dsZSB7XG4gIHBhZGRpbmc6IDI0cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyLXRvcDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xuICBtYXJnaW46IDI2cHggLTI0cHggLTI0cHggLTI0cHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLm9yZGVyLXN1bW1lcnktd3JhcHBlciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICBwYWRkaW5nOiAyNHB4O1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBtYXJnaW4tbGVmdDogMjZweDtcbn1cbi5vcmRlci1zdW1tZXJ5LXdyYXBwZXIgaDMge1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIG1hcmdpbjogMDtcbn1cbi5vcmRlci1zdW1tZXJ5LXdyYXBwZXIgdGFibGUge1xuICB3aWR0aDogMTAwJTtcbn1cbi5vcmRlci1zdW1tZXJ5LXdyYXBwZXIgdGFibGUgdGQge1xuICBwYWRkaW5nOiA0cHggMDtcbn1cbi5vcmRlci1zdW1tZXJ5LXdyYXBwZXIgdGFibGUgdGQ6bGFzdC1jaGlsZCB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuLm9yZGVyLXN1bW1lcnktd3JhcHBlciAuc3ViLXRvdGFsLXdyYXAge1xuICBib3JkZXItdG9wOiAjY2NjIDFweCBzb2xpZDtcbiAgbWFyZ2luLXRvcDogMTZweDtcbiAgcGFkZGluZy10b3A6IDE2cHg7XG59XG4ub3JkZXItc3VtbWVyeS13cmFwcGVyIC5zdWItdG90YWwtd3JhcCBoMyB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZGlzcGxheTogaW5saW5lO1xufVxuLm9yZGVyLXN1bW1lcnktd3JhcHBlciAuc3ViLXRvdGFsLXdyYXAgc3BhbiB7XG4gIG1hcmdpbi1sZWZ0OiA2cHg7XG4gIGZvbnQtc2l6ZTogMTBweDtcbn1cbi5vcmRlci1zdW1tZXJ5LXdyYXBwZXIgLnBheS1tZXRob2Qtd3JhcCB7XG4gIGJvcmRlci10b3A6ICNmZmYgMXB4IHNvbGlkO1xuICBtYXJnaW46IDE2cHggLTI0cHggLTI0cHggLTI0cHg7XG4gIHBhZGRpbmc6IDE2cHggMjRweDtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKiogbXVsdGlzdGVwICoqKioqKioqKioqKioqKioqKioqKioqKi9cbi5tdWx0aS1zdGVwcyB7XG4gIGRpc3BsYXk6IHRhYmxlO1xuICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAyNXB4IDAgMTBweCAwO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGxlZnQ6IC04JTtcbn1cblxuLm11bHRpLXN0ZXBzID4gbGkuaXMtYWN0aXZlOmJlZm9yZSxcbi5tdWx0aS1zdGVwcyA+IGxpLmlzLWFjdGl2ZSB+IGxpOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwi74SOXCI7XG4gIGZvbnQtZmFtaWx5OiBGbGF0aWNvbjtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbn1cblxuLm11bHRpLXN0ZXBzID4gbGkuaXMtYWN0aXZlOmFmdGVyLFxuLm11bHRpLXN0ZXBzID4gbGkuaXMtYWN0aXZlIH4gbGk6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZ3JheSk7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyYXkpO1xufVxuXG4ubXVsdGktc3RlcHMgPiBsaSB7XG4gIGNvdW50ZXItaW5jcmVtZW50OiBzdGVwTnVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBwYWRkaW5nOiAxNnB4IDA7XG59XG5cbi5tdWx0aS1zdGVwcyA+IGxpOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwi74SOXCI7XG4gIGZvbnQtZmFtaWx5OiBGbGF0aWNvbjtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogMCBhdXRvIDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICB3aWR0aDogMjRweDtcbiAgaGVpZ2h0OiAyNHB4O1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXdlaWdodDogNDAwO1xuICBib3JkZXItd2lkdGg6IDFweDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAxO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAxMHB4O1xufVxuXG4ubXVsdGktc3RlcHMgPiBsaTphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGhlaWdodDogMXB4O1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMjlweDtcbiAgbGVmdDogNTAlO1xufVxuXG4ubXVsdGktc3RlcHMgPiBsaTpsYXN0LWNoaWxkOmFmdGVyIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLm11bHRpLXN0ZXBzID4gbGkuaXMtYWN0aXZlOmJlZm9yZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gIGNvbG9yOiAjZmZmO1xufVxuXG4ubXVsdGktc3RlcHMgPiBsaS5pcy1hY3RpdmUgfiBsaSB7XG4gIGNvbG9yOiAjMTExO1xufVxuXG4ubXVsdGktc3RlcHMgPiBsaS5pcy1hY3RpdmUgfiBsaTpiZWZvcmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZ3JheSk7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyYXkpO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyYXkpO1xufVxuXG4ucmVzZXQtcGFzc3dvcmQtY29udGFpbmVyIHtcbiAgd2lkdGg6IDkwJTtcbiAgbWFyZ2luOiAzMnB4IGF1dG87XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuc3Bhbi5kYXRlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICB3aWR0aDogMTEwcHg7XG59XG5cbi5maXgtaGVpZ2h0IHtcbiAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtIDMxNXB4KTtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKm11bHRpc3RlcCBlbmQqKioqKioqKioqKioqKioqKioqKioqKiovXG5AbWVkaWEgKG1heC13aWR0aDogMTQwMHB4KSB7XG4gIC5tdWx0aS1zdGVwcyB7XG4gICAgcG9zaXRpb246IHN0YXRpYztcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xuICAub3JkZXItc3VtbWVyeS13cmFwcGVyIHtcbiAgICBtYXJnaW4tbGVmdDogMDtcbiAgICBtYXJnaW4tdG9wOiAyNnB4O1xuICB9XG59XG5AbWVkaWEgKG1heC13aWR0aDogOTkycHgpIHtcbiAgLmFkZHJlc3Mtd3JhcCB7XG4gICAgYm9yZGVyLWxlZnQ6IDA7XG4gICAgYm9yZGVyLXRvcDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xuICB9XG59XG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcbiAgLmhlYWRlciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuICAuaGVhZGVyIC5idG4tMi1vdXRsaW5lIHtcbiAgICBtYXJnaW4tdG9wOiAxNnB4O1xuICB9XG5cbiAgLm11bHRpLXN0ZXBzIHtcbiAgICBkaXNwbGF5OiBpbml0aWFsO1xuICAgIHRhYmxlLWxheW91dDogdW5zZXQ7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICBwYWRkaW5nOiAwO1xuICAgIG1hcmdpbjogMDtcbiAgfVxuXG4gIC5tdWx0aS1zdGVwcyA+IGxpIHtcbiAgICBkaXNwbGF5OiBsaXN0LWl0ZW07XG4gICAgcGFkZGluZzogMCAzMnB4O1xuICAgIG1hcmdpbi1ib3R0b206IDM2cHg7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgfVxuICAubXVsdGktc3RlcHMgPiBsaSBzcGFuLmRhdGUge1xuICAgIHBvc2l0aW9uOiBzdGF0aWM7XG4gIH1cbiAgLm11bHRpLXN0ZXBzID4gbGkgc3Bhbi5zdGF0dXMge1xuICAgIG1hcmdpbi1sZWZ0OiA2cHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuXG4gIC5tdWx0aS1zdGVwcyA+IGxpOmJlZm9yZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDA7XG4gICAgdG9wOiAwO1xuICB9XG5cbiAgLm11bHRpLXN0ZXBzID4gbGk6YWZ0ZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMTJweDtcbiAgICB3aWR0aDogMXB4O1xuICAgIGhlaWdodDogNjBweDtcbiAgfVxufVxuLnByZXZpZXdJbWcge1xuICBwYWRkaW5nOiAxMHB4O1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xufVxuXG4udXNlci1yYXRpbmctcGhvdG9zIHtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLnVwbG9hZGVkLWRvYy1pbWdzIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG4udXBsb2FkZWQtZG9jLWltZ3MgYSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi51cGxvYWRlZC1kb2MtaW1ncyBpb24taW1nIHtcbiAgd2lkdGg6IDYwcHg7XG4gIGhlaWdodDogNjBweDtcbiAgb2JqZWN0LWZpdDogZmlsbDtcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xufVxuXG4uaW52b2ljZUJ0biwgLnZpZXctYnRuIHtcbiAgcGFkZGluZzogMTBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2Y0MGQzMDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjQwZDMwO1xuICBjb2xvcjogd2hpdGU7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgd2lkdGg6IDEzMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi52aWV3LWJ0biB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgd2lkdGg6IDIwMHB4O1xufSIsIlxyXG5cclxuLm9yZGVyLWRldGFpbHN7bWFyZ2luLXRvcDogMjRweDt9XHJcblxyXG4uYWRkcmVzcy13cmFwe1xyXG4gIGJvcmRlci1sZWZ0OiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKSAxcHggc29saWQ7XHJcbiAgICBwYWRkaW5nOiAyNHB4O1xyXG4gICBcclxuICBoM3tcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgfVxyXG59XHJcblxyXG4uZGl2aWRlcntcclxuICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgbWFyZ2luOiAyNnB4IDA7XHJcbn1cclxuLml0ZW1zLXdyYXBwZXJ7XHJcbiAgdGFibGV7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHRke3BhZGRpbmc6IDhweDtib3JkZXItYm90dG9tOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpIDFweCBzb2xpZDt9XHJcbiAgICB0ZC5pbWd7XHJcbiAgICAgIHdpZHRoOiA2NHB4O1xyXG4gICAgICBpbWd7d2lkdGg6IDEwMCU7fVxyXG4gICAgfVxyXG4gICAgdGQucHJpY2UtZGV0YWlse2NvbG9yOiAjMzMzO31cclxuICAgIHRkLnRvdGFsLXByaWNle2NvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7fVxyXG4gICAgLml0ZW0tcXR5e2NvbG9yOiMzMzN9XHJcbiAgICBcclxuICB9XHJcbn1cclxuLnByb2R1Y3QtaW1hZ2V7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKCdodHRwczovL3M1LmdpZnl1LmNvbS9pbWFnZXMvbG9hZGVyYmIxOWVmY2MyNzQ5ZTExNS5naWYnKSBjZW50ZXIgbm8tcmVwZWF0O1xyXG4gIHdpZHRoOiAxMDBweDtcclxuICBoZWlnaHQ6IDgwcHg7XHJcbn1cclxuLnByb2R1Y3QtbmFtZXtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgbWFyZ2luLXRvcDogN3B4O1xyXG4gIG1hcmdpbi1ib3R0b206IDdweDtcclxufVxyXG5cclxuLnRvZ2dsZXtcclxuICBwYWRkaW5nOiAyNHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYm9yZGVyLXRvcDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xyXG4gICAgbWFyZ2luOiAyNnB4IC0yNHB4IC0yNHB4IC0yNHB4O1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLm9yZGVyLXN1bW1lcnktd3JhcHBlcntcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgcGFkZGluZzogMjRweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMjZweDtcclxuICAgIGgze1xyXG4gICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgIH1cclxuICB0YWJsZXtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgdGR7cGFkZGluZzogNHB4IDA7fVxyXG4gICAgdGQ6bGFzdC1jaGlsZHt0ZXh0LWFsaWduOiByaWdodDt9XHJcbiAgfVxyXG4gIC5zdWItdG90YWwtd3JhcHtcclxuICAgIGJvcmRlci10b3A6ICNjY2MgMXB4IHNvbGlkO1xyXG4gICAgbWFyZ2luLXRvcDogMTZweDtcclxuICAgIHBhZGRpbmctdG9wOiAxNnB4O1xyXG4gICAgaDN7Zm9udC1zaXplOiAxOHB4O2Rpc3BsYXk6IGlubGluZTt9XHJcbiAgICBzcGFue21hcmdpbi1sZWZ0OiA2cHg7Zm9udC1zaXplOiAxMHB4O31cclxuICB9XHJcbiAgLnBheS1tZXRob2Qtd3JhcHtcclxuICAgIGJvcmRlci10b3A6ICNmZmYgMXB4IHNvbGlkO1xyXG4gICAgbWFyZ2luOiAxNnB4IC0yNHB4IC0yNHB4IC0yNHB4O1xyXG4gICAgcGFkZGluZzogMTZweCAyNHB4O1xyXG4gIH1cclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKiogbXVsdGlzdGVwICoqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi5tdWx0aS1zdGVwcyB7XHJcbiAgZGlzcGxheTogdGFibGU7XHJcbiAgdGFibGUtbGF5b3V0OiBmaXhlZDtcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiAwO1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAyNXB4IDAgMTBweCAwO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBsZWZ0Oi04JTtcclxufVxyXG4ubXVsdGktc3RlcHM+bGkuaXMtYWN0aXZlOmJlZm9yZSxcclxuLm11bHRpLXN0ZXBzPmxpLmlzLWFjdGl2ZX5saTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXFxmMTBlXCI7XHJcbiAgZm9udC1mYW1pbHk6IEZsYXRpY29uO1xyXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG4gIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG5cclxufVxyXG5cclxuLm11bHRpLXN0ZXBzPmxpLmlzLWFjdGl2ZTphZnRlcixcclxuLm11bHRpLXN0ZXBzPmxpLmlzLWFjdGl2ZX5saTphZnRlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyYXkpO1xyXG4gIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyYXkpO1xyXG59XHJcblxyXG5cclxuXHJcbi5tdWx0aS1zdGVwcz5saSB7XHJcbiAgY291bnRlci1pbmNyZW1lbnQ6IHN0ZXBOdW07XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGRpc3BsYXk6IHRhYmxlLWNlbGw7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIHBhZGRpbmc6IDE2cHggMDtcclxufVxyXG5cclxuLm11bHRpLXN0ZXBzPmxpOmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcXGYxMGVcIjtcclxuICBmb250LWZhbWlseTogRmxhdGljb247XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgbWFyZ2luOiAwIGF1dG8gNHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxuICB3aWR0aDogMjRweDtcclxuICBoZWlnaHQ6IDI0cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XHJcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHotaW5kZXg6IDE7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgZm9udC1zaXplOiAxMHB4O1xyXG59XHJcblxyXG4ubXVsdGktc3RlcHM+bGk6YWZ0ZXIge1xyXG4gIGNvbnRlbnQ6ICcnO1xyXG4gIGhlaWdodDogMXB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6dmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDI5cHg7XHJcbiAgbGVmdDogNTAlO1xyXG59XHJcblxyXG4ubXVsdGktc3RlcHM+bGk6bGFzdC1jaGlsZDphZnRlciB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuLm11bHRpLXN0ZXBzPmxpLmlzLWFjdGl2ZTpiZWZvcmUge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxuICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcclxuICBjb2xvcjogI2ZmZjtcclxufVxyXG5cclxuLm11bHRpLXN0ZXBzPmxpLmlzLWFjdGl2ZX5saSB7XHJcbiAgY29sb3I6IzExMTtcclxufVxyXG5cclxuLm11bHRpLXN0ZXBzPmxpLmlzLWFjdGl2ZX5saTpiZWZvcmUge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmF5KTtcclxuICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmF5KTtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyYXkpO1xyXG59XHJcblxyXG4ucmVzZXQtcGFzc3dvcmQtY29udGFpbmVyIHtcclxuICB3aWR0aDogOTAlO1xyXG4gIG1hcmdpbjogMzJweCBhdXRvO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuc3Bhbi5kYXRle1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xyXG4gICAgd2lkdGg6IDExMHB4O1xyXG59XHJcblxyXG5cclxuLmZpeC1oZWlnaHR7XHJcbiAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtIDMxNXB4KTtcclxuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcclxuICAgIHBhZGRpbmc6IDE2cHg7XHJcbn1cclxuLyoqKioqKioqKioqKioqKioqKioqKiptdWx0aXN0ZXAgZW5kKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbkBtZWRpYShtYXgtd2lkdGg6MTQwMHB4KXtcclxuICAubXVsdGktc3RlcHN7cG9zaXRpb246IHN0YXRpYzt9XHJcbn1cclxuXHJcbkBtZWRpYShtYXgtd2lkdGg6MTIwMHB4KXtcclxuICAub3JkZXItc3VtbWVyeS13cmFwcGVye1xyXG4gICAgbWFyZ2luLWxlZnQ6IDA7XHJcbiAgICBtYXJnaW4tdG9wOiAyNnB4O1xyXG5cclxuICB9XHJcbn1cclxuQG1lZGlhKG1heC13aWR0aDo5OTJweCl7XHJcbiAgLmFkZHJlc3Mtd3JhcHtcclxuICAgIGJvcmRlci1sZWZ0OiAwO1xyXG4gICAgYm9yZGVyLXRvcDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhKG1heC13aWR0aDo1MDBweCl7XHJcbiAgLmhlYWRlcntcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAuYnRuLTItb3V0bGluZXttYXJnaW4tdG9wOiAxNnB4O31cclxuICB9XHJcbiAgLm11bHRpLXN0ZXBze1xyXG4gICAgZGlzcGxheTogaW5pdGlhbDtcclxuICAgIHRhYmxlLWxheW91dDogdW5zZXQ7XHJcbiAgICBsaXN0LXN0eWxlOiBub25lO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIG1hcmdpbjogMDtcclxuICB9XHJcblxyXG4gIC5tdWx0aS1zdGVwcz5saXtcclxuICAgIGRpc3BsYXk6IGxpc3QtaXRlbTtcclxuICAgIHBhZGRpbmc6IDAgMzJweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDM2cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgc3Bhbi5kYXRle1xyXG4gICAgICBwb3NpdGlvbjogc3RhdGljO1xyXG4gICAgfVxyXG4gICAgc3Bhbi5zdGF0dXN7bWFyZ2luLWxlZnQ6IDZweDtmb250LXdlaWdodDogNTAwO31cclxuICB9XHJcblxyXG4gIC5tdWx0aS1zdGVwcz5saTpiZWZvcmV7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgdG9wOiAwO1xyXG4gIH1cclxuXHJcbiAgLm11bHRpLXN0ZXBzPmxpOmFmdGVyIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDowO1xyXG4gICAgbGVmdDogMTJweDtcclxuICAgIHdpZHRoOiAxcHg7XHJcbiAgICBoZWlnaHQ6IDYwcHg7XHJcbiAgICB9XHJcblxyXG4gIFxyXG59XHJcblxyXG4ucHJldmlld0ltZ3tcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIC8vIHdpZHRoOiAyMDBweDtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4XHJcbn1cclxuXHJcbi51c2VyLXJhdGluZy1waG90b3N7XHJcbiAgZGlzcGxheTogZmxleFxyXG59XHJcblxyXG4udXBsb2FkZWQtZG9jLWltZ3Mge1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgYSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuICBpb24taW1nIHtcclxuICAgICAgd2lkdGg6IDYwcHg7XHJcbiAgICAgIGhlaWdodDogNjBweDtcclxuICAgICAgb2JqZWN0LWZpdDogZmlsbDtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xyXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIH1cclxufVxyXG5cclxuLmludm9pY2VCdG57XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZjQwZDMwO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjQwZDMwO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgd2lkdGg6IDEzMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlclxyXG59XHJcblxyXG4udmlldy1idG4ge1xyXG4gIEBleHRlbmQgLmludm9pY2VCdG47XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHdpZHRoOiAyMDBweDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/admin-shop/all-orders/order-details/order-details.page.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/admin/admin-shop/all-orders/order-details/order-details.page.ts ***!
  \*********************************************************************************/
/*! exports provided: OrderDetailsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderDetailsPage", function() { return OrderDetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "./node_modules/@ionic-native/in-app-browser/ngx/index.js");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_order_order_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/order/order.service */ "./src/app/services/order/order.service.ts");
/* harmony import */ var src_app_admin_resale_order_resale_order_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/admin/resale-order/resale-order.page */ "./src/app/admin/resale-order/resale-order.page.ts");
/* harmony import */ var _edit_order_edit_order_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../edit-order/edit-order.page */ "./src/app/admin/admin-shop/all-orders/edit-order/edit-order.page.ts");
/* harmony import */ var _cancelled_reason_cancelled_reason_page__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../cancelled-reason/cancelled-reason.page */ "./src/app/admin/admin-shop/all-orders/cancelled-reason/cancelled-reason.page.ts");






//import { CallNumber } from '@ionic-native/call-number/ngx';






let OrderDetailsPage = class OrderDetailsPage {
    // pageType: any = '';
    constructor(events, router, alertController, loadingController, navCtrl, route, inAppBrowser, 
    //private callNumber: CallNumber,
    configService, orderService, sharedService, modalController) {
        this.events = events;
        this.router = router;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.navCtrl = navCtrl;
        this.route = route;
        this.inAppBrowser = inAppBrowser;
        this.configService = configService;
        this.orderService = orderService;
        this.sharedService = sharedService;
        this.modalController = modalController;
        this.orderData = [];
        this.showLoader = true;
        this.noDeliveryAgents = false;
        this.allDeliveryAgents = [];
        this.pdfObj = null;
        this.message = '';
        this.dateSchedule = '';
        this.vendorData = [];
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.orderId = this.router.getCurrentNavigation().extras.state.orderId;
                // this.pageType = this.router.getCurrentNavigation().extras.state.pageType;
                //console.log('orderId', this.orderId);
            }
        });
    }
    ngOnInit() {
    }
    getStarColor(rating) {
        return this.sharedService.getStarColor(rating);
    }
    getDateTimeFormat(date) {
        return moment__WEBPACK_IMPORTED_MODULE_4__(date).format('MMM D, YYYY hh:mm a');
    }
    ionViewWillEnter() {
        this.events.publish('user:getOrderDetailsWithOrderId', this.orderId);
        this.events.publish('user:getAllDeliveryAgents');
        this.initializeSubscriptions();
        this.currencyCode = this.configService.environment.currencyCode;
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('user:publishOrderDetailsWithOrderId', (orderData) => {
            console.log('orderData', orderData);
            if (!orderData[0].hasOwnProperty('unavailable')) {
                orderData[0]['unavailable'] = {};
            }
            if (orderData[0].payment.mode === 'cash' && !('amount' in orderData[0].payment.details)) {
                orderData[0].payment.details['amount'] = orderData[0].totalAmountToPaid - (orderData[0].walletAmount + orderData[0].cashbackAmount);
            }
            this.orderData = orderData;
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
        });
        this.events.subscribe('user:rejectedOrderSuccessfully', () => {
            this.loading.dismiss();
            this.presentAlert('Order has been rejected successfully', true);
        });
        this.events.subscribe('user:confirmedOrderSuccessfully', () => {
            this.loading.dismiss();
            this.presentAlert('Order has been confirmed successfully', true);
        });
        this.events.subscribe('user:cancelledOrderSuccessfully', () => {
            this.loading.dismiss();
            this.presentAlert('Order has been cancelled successfully', true);
        });
        this.events.subscribe('user:dispatchedOrderSuccessfully', () => {
            this.loading.dismiss();
            this.presentAlert('Order has been dispatched successfully', true);
        });
        this.events.subscribe('user:deliveredOrderSuccessfully', () => {
            this.loading.dismiss();
            this.presentAlert('Order has been delivered successfully', true);
        });
        this.events.subscribe('user:returnedOrderSuccessfully', () => {
            this.loading.dismiss();
            this.presentAlert('Order has been returned successfully', true);
        });
        this.events.subscribe('order:sendPaymentRequestSuccess', () => {
            this.loading.dismiss();
            this.presentAlert('Payment request has been send successfully');
        });
        this.events.subscribe('order:updatePaymentCompleteSuccess', () => {
            this.loading.dismiss();
            this.ionViewWillEnter();
            this.sharedService.presentAlert('Payment status changed to completed successfully');
        });
        this.events.subscribe('user:noDeliveryAgents', () => {
            this.noDeliveryAgents = true;
        });
        this.events.subscribe('user:publishAllDeliveryAgents', (agents) => {
            this.allDeliveryAgents = agents;
            this.noDeliveryAgents = false;
            //console.log(this.allDeliveryAgents);
        });
        this.events.subscribe('user:assignDeliveryAgentSuccess', () => {
            this.loading.dismiss();
            this.presentAlert('Delivery Agent has been assigned successfully!');
        });
        this.events.subscribe('vendor:getVendorNameSuccess', (data) => {
            this.vendorData = data;
        });
        this.events.subscribe('delivery:getDeliveryAgentNameSuccess', (data) => {
            console.log(data);
            if (data) {
                if (data.name) {
                    this.deliveryAgentName = data.name;
                }
            }
        });
    }
    getTotalItems() {
        return this.orderData[0].products.length;
    }
    onClickConfirmOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: "Are you sure you want to confirm this order?",
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Yes',
                        handler: () => {
                            //console.log('Confirm Yes');
                            this.confirmOrder();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    confirmOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('user:confirmOrderByAdmin', this.orderData[0], this.orderId);
        });
    }
    onClickDispatchOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: "Are you sure you want to dispatch this order?",
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Yes',
                        handler: () => {
                            //console.log('Confirm Yes');
                            this.dispatchOrder();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    dispatchOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('user:dispatchOrderByAdmin', this.orderId, this.message);
        });
    }
    onClickDeliverOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: "Are you sure you want to change status to delivered?",
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Yes',
                        handler: () => {
                            //console.log('Confirm Yes');
                            this.deliverOrder();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    deliverOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('user:deliverOrderByAdmin', this.orderId);
        });
    }
    onClickReturnOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: "Are you sure you want to return this order?",
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Yes',
                        handler: () => {
                            //console.log('Confirm Yes');
                            this.returnOrder();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    returnOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('user:returnOrderByAdmin', this.orderId);
        });
    }
    removeProduct(i) {
        this.orderData[0].products.splice(i, 1);
    }
    covertTextToUrl(text) {
        const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        const text1 = text.replace(exp, '<a target="_blank" href=\'$1\'>$1</a>');
        const exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        const finalText = text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
        return finalText;
    }
    onClickRejectOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: "Are you sure you want to reject this order?",
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Yes',
                        handler: () => {
                            //console.log('Confirm Yes');
                            this.rejectOrder();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    rejectOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('user:rejectOrderByAdmin', this.orderId);
        });
    }
    onClickCancelOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: "Are you sure you want to cancel this order?",
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Yes',
                        handler: () => {
                            //console.log('Confirm Yes');
                            this.getCancelReason();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    cancelOrder(cancelReason) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('user:cancelOrderByAdmin', this.orderId, cancelReason);
        });
    }
    getCancelReason() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _cancelled_reason_cancelled_reason_page__WEBPACK_IMPORTED_MODULE_11__["CancelledReasonPage"]
            });
            modal.onDidDismiss().then(res => {
                if (res && res.data) {
                    this.cancelOrder(res.data);
                }
            });
            yield modal.present();
        });
    }
    isCancelReasonAvailable() {
        return 'cancelData' in this.orderData[0] && this.orderData[0].cancelData.reason;
    }
    removeProductAlert(i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: "Are you sure you want to remove this order?",
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Yes',
                        handler: () => {
                            //console.log('Confirm Yes');
                            this.removeProduct(i);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    presentAlert(msg, action) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: [{
                        text: 'Ok',
                        handler: () => {
                            //console.log('Confirm Okay');
                            this.navCtrl.navigateRoot(['admin-orders']);
                        }
                    }]
            });
            yield alert.present();
        });
    }
    presentLoading(drn = 5000, msg = 'Please Wait...') {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: msg,
                duration: drn
            });
            yield this.loading.present();
        });
    }
    onChangeDeliveryAgent(event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            //console.log('asasa...', event.target.value);
            let selectedDeliveryAgentId = event.target.value;
            yield this.presentLoading();
            this.events.publish('user:assignDeliveryAgent', selectedDeliveryAgentId, this.orderId);
        });
    }
    sendPaymentRequest() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('order:sendPaymentRequest', this.orderId, this.orderData[0].userId);
        });
    }
    onClickUpdatePaymentComplete() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.events.publish('order:updatePaymentComplete', this.orderId);
        });
    }
    onSetupDeliveryAgent() {
        this.router.navigate(['admin-allusers']);
    }
    getTime(time) {
        return moment__WEBPACK_IMPORTED_MODULE_4__(time).format('hh:mm A');
    }
    openOrderInvoice(url) {
        const browser = this.inAppBrowser.create(url, '_system');
    }
    callUser() {
        /* this.callNumber.callNumber(this.orderData[0].address.phoneNo, true)
         .then(res => console.log('Launched dialer!', res))
         .catch(err => console.log('Error launching dialer', err));*/
    }
    totalPieces(product, i) {
        let pieces = product.quantity * parseInt(product.pack.weight);
        this.orderData[0].products[i]['totalPieces'] = pieces;
        return pieces;
    }
    decrementPieces(i) {
        if (this.orderData[0].products[i].totalPieces > 1) {
            this.orderData[0].products[i].totalPieces = this.orderData[0].products[i].totalPieces - 1;
            this.orderData[0].products[i].price = this.orderData[0].products[i].totalPieces * this.orderData[0].products[i].pack.perPcPrice;
            //console.log(this.orderData[0].products[i].price);
            let prodPrice = 0;
            this.orderData[0].products.forEach(element => {
                //console.log(element);
                prodPrice = prodPrice + element.price;
            });
            this.orderData[0].productsPrice = prodPrice;
            this.orderData[0].totalAmountToPaid = this.orderData[0].productsPrice + this.orderData[0].couponDiscount + this.orderData[0].defaultGst + this.orderData[0].delivery;
        }
    }
    incrementPieces(i) {
        this.orderData[0].products[i].totalPieces = this.orderData[0].products[i].totalPieces + 1;
        this.orderData[0].products[i].price = this.orderData[0].products[i].totalPieces * this.orderData[0].products[i].pack.perPcPrice;
        let prodPrice = 0;
        this.orderData[0].products.forEach(element => {
            prodPrice = prodPrice + element.price;
        });
        this.orderData[0].productsPrice = prodPrice;
        this.orderData[0].totalAmountToPaid = this.orderData[0].productsPrice + this.orderData[0].couponDiscount + this.orderData[0].defaultGst + this.orderData[0].delivery;
    }
    getSinglePiecePrice(totalPieces, totalAmount) {
        return Math.ceil(totalAmount / totalPieces);
    }
    goToPrdouctDetails(product) {
        let stateObj = {};
        const navigationExtras = {
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
    }
    reviewDate() {
        if (this.orderData[0].rating.createdAt instanceof Date) {
            return this.orderData[0].rating.createdAt;
        }
        else {
            return this.orderData[0].rating.createdAt.toDate();
        }
    }
    showGenInvoiceBtn() {
        if ((!this.orderData[0].hasOwnProperty('invoice') || (this.orderData[0].invoice.status !== 'generated')) && (!this.orderData[0].hasOwnProperty('orderType') || (this.orderData[0].hasOwnProperty('orderType') && this.orderData[0].orderType !== 'subscription'))) {
            return true;
        }
        else {
            return false;
        }
    }
    generateInvoice() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading(100000, "Generating invoice, please wait...");
            const invoiceRes = yield this.orderService.generateInvoice(this.orderData[0].id);
            this.loading.dismiss();
            if (invoiceRes.status === 'generated') {
                this.orderData[0]['invoice'] = invoiceRes;
                this.presentAlert("Invoice generated successfully!");
            }
            else {
                this.presentAlert("Invoice generation failed, please try again later.");
            }
        });
    }
    openImg(url) {
        window.open(url, "_blank");
    }
    getFinalAmount() {
        let amount = this.orderData[0].totalAmountToPaid - this.orderData[0].walletAmount - (this.orderData[0].cashbackAmount || 0);
        if (this.isPartialOrder()) {
            amount -= this.orderData[0].partialPayment.online.amount;
        }
        return amount;
    }
    isPartialOrder() {
        return ('partialPayment' in this.orderData[0]) && (this.orderData[0].partialPayment.status && this.orderData[0].partialPayment.online.completed) ? true : false;
    }
    isEstimatedTimeAvailable() {
        return ('estimatedDeliveryTime' in this.orderData[0]) && this.orderData[0].estimatedDeliveryTime !== '' ? true : false;
    }
    isDeliveryScheduled() {
        return this.orderData[0].scheduledDate ? true : false;
    }
    isInstantDelivery() {
        return ('instantDelivery' in this.orderData[0]) && this.orderData[0].instantDelivery.selected ? true : false;
    }
    isResaleOrder() {
        return 'resale' in this.orderData[0];
    }
    onClickResaleBtn() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_admin_resale_order_resale_order_page__WEBPACK_IMPORTED_MODULE_9__["ResaleOrderPage"],
                componentProps: {
                    resale: this.orderData[0].resale,
                    products: this.orderData[0].products,
                    orderId: this.orderData[0].id,
                    viewBy: 'admin'
                }
            });
            yield modal.present();
        });
    }
    editOrder() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                componentProps: {
                    order: this.orderData[0]
                },
                component: _edit_order_edit_order_page__WEBPACK_IMPORTED_MODULE_10__["EditOrderPage"],
                cssClass: 'custom-modal'
            });
            modal.onDidDismiss().then((res) => {
                if (res && res.data) {
                    console.log('edit order modal res -> ', res.data);
                    this.orderData[0]['unavailable'] = res.data.unavailable;
                    this.orderData[0]['unavailablePrice'] = res.data.unavailablePrice;
                }
            });
            yield modal.present();
        });
    }
    showEditOrderBtn() {
        if (this.orderData[0].hasOwnProperty('autoConfirmOrder') && (this.orderData[0].status === 'Pending' || this.orderData[0].status === 'Confirmed' || this.orderData[0].status === 'Dispatched') && (!this.orderData[0].hasOwnProperty('orderType') || (this.orderData[0].hasOwnProperty('orderType') && this.orderData[0].orderType !== 'subscription'))) {
            return true;
        }
        else {
            return false;
        }
    }
    getUnavailableProductPrice(index) {
        const product = this.orderData[0].products[index];
        let price = 0;
        if (product.hasOwnProperty('pack') && (product.pack.variantType === 'pieces')) {
            price = product.pack.price;
        }
        else {
            price = product.price;
        }
        price = (price - (((product.membershipDiscount || 0) / product.quantity) + ((product.couponDiscount || 0) / product.quantity))) * this.orderData[0].unavailable[index];
        return price;
    }
    showUnavailablePrice() {
        if (this.orderData[0].unavailablePrice) {
            return true;
        }
        else {
            return false;
        }
    }
    removeSubscriptions() {
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
    }
};
OrderDetailsPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__["InAppBrowser"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"] },
    { type: src_app_services_order_order_service__WEBPACK_IMPORTED_MODULE_8__["OrderService"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
], OrderDetailsPage.prototype, "content", void 0);
OrderDetailsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-order-details',
        template: __webpack_require__(/*! raw-loader!./order-details.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-shop/all-orders/order-details/order-details.page.html"),
        styles: [__webpack_require__(/*! ./order-details.page.scss */ "./src/app/admin/admin-shop/all-orders/order-details/order-details.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__["InAppBrowser"],
        src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"],
        src_app_services_order_order_service__WEBPACK_IMPORTED_MODULE_8__["OrderService"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]])
], OrderDetailsPage);



/***/ })

}]);
//# sourceMappingURL=admin-admin-shop-all-orders-order-details-order-details-module-es2015.js.map