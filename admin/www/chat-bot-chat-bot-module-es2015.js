(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chat-bot-chat-bot-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/chat-bot/chat-bot.page.html":
/*!***********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/chat-bot/chat-bot.page.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n    <ion-toolbar class=\"toolbar\">\r\n      <ion-buttons slot=\"start\">\r\n        <ion-back-button class=\"custom-back-button\">\r\n        </ion-back-button>\r\n      </ion-buttons>\r\n      <ion-title text-center style=\"margin-left: 48px;\">chat</ion-title>\r\n      <ion-buttons slot =\"end\">\r\n        <ion-button (click)=\"callAdmin()\">\r\n          <i class=\"flaticon-call\"></i>\r\n        </ion-button>\r\n    </ion-buttons>\r\n      \r\n    </ion-toolbar>\r\n    <div class=\"bottom-border\" [class.is-hidden]=\"!showSearch\">\r\n      <ion-grid class=\"search-message margining\">\r\n        <div class=\"message-box\">\r\n          <ion-row class=\"ion-align-items-center\">\r\n            <div>\r\n              <i class=\"flaticon-null-22\"></i>\r\n            </div>\r\n            <div class=\"search-input\">\r\n              <ion-input type=\"text\" placeholder=\"Search any message\" [(ngModel)]=\"searchMsg\"></ion-input>\r\n            </div>\r\n            <div class=\"close-btn\" *ngIf=\"searchMsg\" (click)=\"clearSearchMsg()\">\r\n              <i class=\"flaticon-null-19\"></i>\r\n            </div>\r\n          </ion-row>\r\n        </div>\r\n        \r\n      </ion-grid>\r\n    </div>\r\n  </ion-header>\r\n\r\n<ion-content [scrollEvents]=\"enableScroll\"\r\n(ionScroll)=\"logScrolling($event)\">\r\n<br>\r\n<br>\r\n<div *ngIf=\"showLoader\" class=\"spinner\">\r\n  <ion-spinner color=\"primary\"></ion-spinner>\r\n</div>\r\n<div text-center>\r\n  <ion-spinner name=\"crescent\" *ngIf=\"chatLoader === true\"></ion-spinner>\r\n</div>\r\n<div text-center *ngIf=\"showNoMsgs\">\r\n  <p class=\"no-msgs\">No More Messages</p>\r\n</div>\r\n\r\n  <ion-grid class=\"ion-no-padding\" *ngIf=\"!showLoader && userData\">\r\n    <div [id] = \"'chatMessage' + ind\" *ngFor=\"let msgs of allMsgs | filter: searchMsg; let ind = index\">\r\n      <br>\r\n      <!-- Admin Side -->\r\n      <ion-row class=\"ion-justify-content-start\" *ngIf=\"msgs.msgData && msgs.msgData.author == 'admin' && msgs.msgData.type == 'txt' && msgs.msgData.message.length !== 0\">\r\n        <div style=\"margin-left: 5px;\">\r\n          <ion-avatar class=\"avatar-img\">\r\n            <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n          </ion-avatar>\r\n        </div>\r\n          <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px'}\" class=\"message-admin\">{{msgs.msgData.message.trim()}}\r\n            <h6 class=\"time\">\r\n              <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n              </h6>\r\n          </div>\r\n          \r\n      </ion-row>\r\n\r\n      <ion-row class=\"ion-justify-content-start\" *ngIf=\"msgs.msgData && msgs.msgData.author == 'admin' && msgs.msgData.type == 'order'\">\r\n        <div style=\"margin-left: 5px;\">\r\n          <ion-avatar class=\"avatar-img\">\r\n            <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n          </ion-avatar>\r\n        </div>\r\n          <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Rejected'\">\r\n            <span>Your order is rejected</span>\r\n            <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n            <div style=\"text-align: center;margin-top: -10px;\">\r\n              <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n                View Order\r\n              </ion-button>\r\n            </div>\r\n            <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n              <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n              </h6>\r\n          </div>\r\n\r\n          <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Confirmed'\">\r\n            <span>Your order is confirmed. Please do the payment</span>\r\n            <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n            <div style=\"margin-top: -10px;\">\r\n              <ion-grid class=\"ion-no-padding\">\r\n                <ion-row class=\"ion-no-padding\">\r\n                  <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                    <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\" style=\"margin-left: -15px;\">\r\n                      View Order\r\n                    </ion-button>\r\n                  </ion-col>\r\n                  <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                    <ion-button (click)=\"onClickDoPayment(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\" style=\"margin-left: -15px;\">\r\n                      do Payment\r\n                    </ion-button>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n            <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n              <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n              </h6>\r\n          </div>\r\n\r\n          <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='PaymentRequest'\">\r\n            <span>Please do the payment of your order</span>\r\n            <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n            <div style=\"margin-top: -10px;\">\r\n              <ion-grid class=\"ion-no-padding\">\r\n                <ion-row class=\"ion-no-padding\">\r\n                  <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                    <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\" style=\"margin-left: -15px;\">\r\n                      View Order\r\n                    </ion-button>\r\n                  </ion-col>\r\n                  <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                    <ion-button (click)=\"onClickDoPayment(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\" style=\"margin-left: -15px;\">\r\n                      do Payment\r\n                    </ion-button>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n            <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n              <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n              </h6>\r\n          </div>\r\n\r\n          <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Cancelled'\">\r\n            <span>Your order is cancelled</span>\r\n            <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n            <div style=\"text-align: center;margin-top: -10px;\">\r\n              <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n                View Order\r\n              </ion-button>\r\n            </div>\r\n            <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n              <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n              </h6>\r\n          </div>\r\n          <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Dispatched'\">\r\n            <span>Your order is dispatched</span>\r\n            <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n            <div style=\"text-align: center;margin-top: -10px;\">\r\n              <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n                View Order\r\n              </ion-button>\r\n            </div>\r\n            <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n              <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n              </h6>\r\n          </div>\r\n          <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Delivered'\">\r\n            <span>Your order is delivered</span>\r\n            <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n            <div style=\"text-align: center;margin-top: -10px;\">\r\n              <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n                View Order\r\n              </ion-button>\r\n            </div>\r\n            <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n              <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n              </h6>\r\n          </div>\r\n          <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Returned'\">\r\n            <span>Your order is returned</span>\r\n            <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n            <div style=\"text-align: center;margin-top: -10px;\">\r\n              <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n                View Order\r\n              </ion-button>\r\n            </div>\r\n            <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n              <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n              </h6>\r\n          </div>\r\n\r\n          <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='deliveryStarted'\">\r\n            <span>Delivery has started for this order.</span>\r\n            <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n            <div style=\"margin-top: -10px;\">\r\n              <ion-grid class=\"ion-no-padding\">\r\n                <ion-row class=\"ion-no-padding\">\r\n                  <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                    <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\" style=\"margin-left: -15px;\">\r\n                      View Order\r\n                    </ion-button>\r\n                  </ion-col>\r\n                  <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                    <ion-button (click)=\"onClickTrackOrder(msgs.msgData.agentId, msgs.msgData.deliveryLatLng)\" color=\"primary\" fill=\"clear\" style=\"margin-left: -15px;\">\r\n                      Track Order\r\n                    </ion-button>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n            <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n              <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n              </h6>\r\n          </div>\r\n      </ion-row>\r\n      \r\n      <div *ngIf=\"msgs.msgData && msgs.msgData.author == 'admin' && msgs.msgData.type == 'image'\">\r\n        <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length === 1\">\r\n          <ion-row class=\"ion-justify-content-start\" *ngFor=\"let img of msgs.msgData.images\">\r\n            <div style=\"margin-left: 5px;\">\r\n              <ion-avatar class=\"avatar-img\">\r\n                <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n              </ion-avatar>\r\n            </div>\r\n            <div class=\"ion-no-padding\" class=\"m-left\" style=\"position: relative;\">\r\n              <ion-thumbnail style=\"border: 1px solid var(--ion-color-border-rgb);\">\r\n                <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n              </ion-thumbnail>\r\n              <div class=\"img-publish\">\r\n                <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n              \r\n              </div>\r\n            </div>\r\n          </ion-row>\r\n        </div>\r\n\r\n        <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 1 && msgs.msgData.images.length <= 4\">\r\n          <ion-row class=\"ion-justify-content-start\">\r\n            <div style=\"margin-left: 5px;\">\r\n              <ion-avatar class=\"avatar-img\">\r\n                <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n              </ion-avatar>\r\n            </div>\r\n            <div class=\"ion-no-padding\">\r\n              <ion-grid class=\"ion-no-padding\" style=\"padding-left: 0px;\">\r\n                <ion-row class=\"img-grid-admin\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                  <ion-col class=\"col-padding\" size=\"6\" *ngFor=\"let img of msgs.msgData.images; let imgIndex = index\">\r\n                    <div style=\"position: relative;\">\r\n                      <ion-thumbnail style=\"border: 1px solid var(--ion-color-border-rgb);box-shadow: none;\">\r\n                        <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                      </ion-thumbnail>\r\n                      <div class=\"img-publish\">\r\n                        <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                      \r\n                      </div>\r\n                    </div>\r\n                      \r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n              <h6 class=\"time\" style=\"margin-left: 5px;\">\r\n                <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                </h6>\r\n            </div>\r\n          </ion-row>\r\n          \r\n        </div>\r\n\r\n        <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 4\">\r\n          <ion-row class=\"ion-justify-content-start\">\r\n            <div style=\"margin-left: 5px;\">\r\n              <ion-avatar class=\"avatar-img\">\r\n                <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n              </ion-avatar>\r\n            </div>\r\n            <div class=\"ion-no-padding\">\r\n              <ion-grid class=\"ion-no-padding\" style=\"padding-left: 0px;\">\r\n                <ion-row class=\"img-grid-admin\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                  <ion-col class=\"col-padding\" size=\"6\" *ngFor=\"let img of [msgs.msgData.images[0], msgs.msgData.images[1], msgs.msgData.images[2],msgs.msgData.images[3]]; let imgIndex = index\">\r\n                    <div style=\"position: relative;\">\r\n                      <ion-thumbnail style=\"border: 1px solid var(--ion-color-border-rgb);box-shadow: none;\" *ngIf=\"imgIndex === 0 || imgIndex === 1 || imgIndex === 2\">\r\n                        <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                      </ion-thumbnail>\r\n                      <ion-thumbnail style=\"background-color: #000;border: 1px solid var(--ion-color-border-rgb);box-shadow: none;\" *ngIf=\"imgIndex === 3\" (click)=\"gridImageZoom(msgs.msgData.images)\">\r\n                        <img class=\"loading img-opacity\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                <img class=\"loading img-opacity\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                        <div class=\"ion-no-padding\" class=\"img-count\">\r\n                          + {{msgs.msgData.images.length - 4}}\r\n                        </div>\r\n                      </ion-thumbnail>\r\n                      <div class=\"img-publish\">\r\n                        <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                      \r\n                      </div>\r\n                    </div>  \r\n                    \r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n              <h6 class=\"time\" style=\"margin-left: 5px;\">\r\n                <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                </h6>\r\n            </div>\r\n          </ion-row>\r\n        </div>\r\n      </div>\r\n\r\n      <div *ngIf=\"msgs.msgData && msgs.msgData.author == 'admin' && msgs.msgData.type == 'broadcast'\">\r\n        <ion-row *ngIf=\"msgs.msgData.message\">\r\n          <div style=\"margin-left: 10px;\"> \r\n            <ion-avatar class=\"avatar-img\">\r\n              <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n            </ion-avatar>\r\n          </div>\r\n            <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px'}\" class=\"message-admin\">\r\n              {{msgs.msgData.message.trim()}}\r\n              <h6 class=\"time\" style=\"margin-left: 5px;\">\r\n                <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                </h6>\r\n            </div>\r\n\r\n        </ion-row>\r\n        <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length === 1\">\r\n          <ion-row class=\"ion-justify-content-start\" *ngFor=\"let img of msgs.msgData.images\">\r\n            <div *ngIf=\"!msgs.msgData.message\" style=\"margin-left: 10px;\"> \r\n              <ion-avatar class=\"avatar-img\">\r\n                <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n              </ion-avatar>\r\n            </div>\r\n            <div class=\"ion-no-padding\" [ngClass]=\"{'img-broadcast': msgs.msgData.message}\">\r\n              <ion-thumbnail style=\"border: 1px solid var(--ion-color-border-rgb);\">\r\n                <img class=\"loading\" src=\"{{img.url}}\" (click)=\"imageZoom(img)\">\r\n              </ion-thumbnail>\r\n            </div>\r\n          </ion-row>\r\n        </div>\r\n        <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 1 && msgs.msgData.images.length <= 4\">\r\n          <ion-row class=\"ion-justify-content-start\">\r\n            <div *ngIf=\"!msgs.msgData.message\" style=\"margin-left: 10px;\"> \r\n              <ion-avatar class=\"avatar-img\">\r\n                <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n              </ion-avatar>\r\n            </div>\r\n            <div class=\"ion-no-padding\" [ngClass]=\"{'img-broadcast': msgs.msgData.message}\">\r\n              <ion-grid class=\"ion-no-padding\" style=\"padding-left: 0px;\">\r\n                <ion-row class=\"img-grid-admin\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                  <ion-col class=\"col-padding\" size=\"6\" *ngFor=\"let img of msgs.msgData.images; let imgIndex = index\">\r\n                      <ion-thumbnail style=\"border: 1px solid var(--ion-color-border-rgb);box-shadow: none;\">\r\n                        <img class=\"loading\" src=\"{{img.url}}\" (click)=\"imageZoom(img)\">\r\n                      </ion-thumbnail>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n          </ion-row>\r\n        </div>\r\n        <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 4\">\r\n          <ion-row class=\"ion-justify-content-start\">\r\n            <div *ngIf=\"!msgs.msgData.message\" style=\"margin-left: 10px;\"> \r\n              <ion-avatar class=\"avatar-img\">\r\n                <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n              </ion-avatar>\r\n            </div>\r\n            <div class=\"ion-no-padding\" [ngClass]=\"{'img-broadcast': msgs.msgData.message}\">\r\n              <ion-grid class=\"ion-no-padding\" style=\"padding-left: 0px;\">\r\n                <ion-row class=\"img-grid-admin\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                  <ion-col class=\"col-padding\" size=\"6\" *ngFor=\"let img of [msgs.msgData.images[0], msgs.msgData.images[1], msgs.msgData.images[2],msgs.msgData.images[3]]; let imgIndex = index\">\r\n                      <ion-thumbnail style=\"border: 1px solid var(--ion-color-border-rgb);box-shadow: none;\" *ngIf=\"imgIndex === 0 || imgIndex === 1 || imgIndex === 2\">\r\n                        <img class=\"loading\" src=\"{{img.url}}\" (click)=\"imageZoom(img)\">\r\n                      </ion-thumbnail>\r\n                      <ion-thumbnail style=\"background-color: #000;border: 1px solid var(--ion-color-border-rgb);box-shadow: none;\" *ngIf=\"imgIndex === 3\" (click)=\"gridImageZoom(msgs.msgData.images)\">\r\n                        <img class=\"loading img-opacity\" src=\"{{img.url}}\">\r\n                        <div class=\"ion-no-padding\" class=\"img-count\">\r\n                          + {{msgs.msgData.images.length - 4}}\r\n                        </div>\r\n                      </ion-thumbnail>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n          </ion-row>\r\n        </div>\r\n      </div>\r\n      <!-- /Admin Side -->\r\n\r\n      <!-- User Side -->\r\n\r\n      <!-- user msg -->\r\n      <ion-row class=\"ion-justify-content-end\" *ngIf=\"msgs.msgData && msgs.msgData.author == 'user' && msgs.msgData.type == 'txt' && msgs.msgData.message.length !== 0\">\r\n          <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px'}\" class=\"message-user\">\r\n            <span class=\"msg-content\">{{msgs.msgData.message.trim()}}</span>\r\n            <h6 class=\"time\">\r\n              <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n              <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n              <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n              <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n          </div>\r\n          <div style=\"margin-right: 10px;\">\r\n            <ion-avatar class=\"avatar-img\">\r\n              <ion-img src=\"{{userData.dP}}\" alt=\"\"></ion-img>\r\n            </ion-avatar>\r\n          </div>\r\n      \r\n      </ion-row>\r\n      <!-- /user msg -->\r\n\r\n      <!-- user images -->\r\n      <div *ngIf=\"msgs.msgData && msgs.msgData.author == 'user' && msgs.msgData.type == 'image' && msgs.msgData.published === true\">\r\n        <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length === 1\">\r\n          <ion-row class=\"ion-justify-content-end\" *ngFor=\"let img of msgs.msgData.images\">\r\n            <div class=\"ion-no-padding\" style=\"margin-right: 5px;position: relative;\">\r\n              <ion-thumbnail>\r\n                <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n              </ion-thumbnail>\r\n              <div class=\"img-publish\">\r\n                <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n              <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n              <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n              </div>\r\n            </div>\r\n            <div style=\"margin-right: 10px;\">\r\n              <ion-avatar class=\"avatar-img\">\r\n                <ion-img src=\"{{userData.dP}}\" alt=\"\"></ion-img>\r\n              </ion-avatar>\r\n            </div>\r\n          </ion-row>\r\n        </div>\r\n        <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 1 && msgs.msgData.images.length <= 4\">\r\n          <ion-row class=\"ion-justify-content-end\">\r\n            <div class=\"ion-no-padding\" style=\"margin-right: 5px;\">\r\n              <ion-grid class=\"ion-no-padding\">\r\n                <ion-row class=\"img-grid\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                  <ion-col class=\"col-padding\" size=\"6\" *ngFor=\"let img of msgs.msgData.images; let imgIndex = index\">\r\n                    <div style=\"position: relative;\">\r\n                      <ion-thumbnail style=\"box-shadow: none;\">\r\n                        <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                      </ion-thumbnail>\r\n                      <div class=\"img-publish\">\r\n                        <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                        <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n              <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n              <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                        </div>\r\n                    </div>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n              <div style=\"margin-right: 10px;\">\r\n                <ion-avatar class=\"avatar-img\">\r\n                  <ion-img src=\"{{userData.dP}}\" alt=\"\"></ion-img>\r\n                </ion-avatar>\r\n              </div>\r\n          </ion-row>\r\n        </div>\r\n        <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 4\">\r\n          <ion-row class=\"ion-justify-content-end\">\r\n            <div class=\"ion-no-padding\" style=\"margin-right: 5px;\">\r\n              <ion-grid class=\"ion-no-padding\">\r\n                <ion-row class=\"img-grid\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                  <ion-col class=\"col-padding\" size=\"6\" *ngFor=\"let img of [msgs.msgData.images[0], msgs.msgData.images[1], msgs.msgData.images[2],msgs.msgData.images[3]]; let imgIndex = index\">\r\n                    <div style=\"position: relative;\">\r\n                      <ion-thumbnail style=\"box-shadow: none;\" *ngIf=\"imgIndex === 0 || imgIndex === 1 || imgIndex === 2\">\r\n                        <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                      </ion-thumbnail>\r\n                        <ion-thumbnail style=\"background-color: #000;box-shadow: none;\" *ngIf=\"imgIndex === 3\" (click)=\"gridImageZoom(msgs.msgData.images)\">\r\n                          <img class=\"loading img-opacity\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                <img class=\"loading img-opacity\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                          <div class=\"ion-no-padding\" class=\"img-count\">\r\n                            + {{msgs.msgData.images.length - 4}}\r\n                          </div>\r\n                        </ion-thumbnail>\r\n                        <div class=\"img-publish\">\r\n                          <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n              <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n              <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                          </div>\r\n                      </div>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n            <div style=\"margin-right: 10px;\">\r\n              <ion-avatar class=\"avatar-img\">\r\n                <ion-img src=\"{{userData.dP}}\" alt=\"\"></ion-img>\r\n                \r\n              </ion-avatar>\r\n            </div>\r\n          </ion-row>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"msgs.msgData && msgs.msgData.author == 'user' && msgs.msgData.type == 'image' && msgs.msgData.published === false\">\r\n        <div *ngIf=\"unsavedImages[msgs.id] && unsavedImages[msgs.id].length === 1\">\r\n          <ion-row class=\"ion-justify-content-end\" *ngFor=\"let img of unsavedImages[msgs.id]\">\r\n            <div class=\"ion-no-padding\" style=\"margin-right: 5px;position: relative;\">\r\n              <ion-thumbnail>\r\n                <img class=\"loading\" *ngIf=\"img.url\" src=\"{{img.url}}\">\r\n              </ion-thumbnail>\r\n              <div class=\"img-publish\">\r\n                <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n                <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n              </div>\r\n            </div>\r\n            <div style=\"margin-right: 10px;\">\r\n              <ion-avatar class=\"avatar-img\">\r\n                <ion-img src=\"{{userData.dP}}\" alt=\"\"></ion-img>\r\n              </ion-avatar>\r\n            </div>\r\n          </ion-row>\r\n        </div>\r\n        <div *ngIf=\"unsavedImages[msgs.id] && unsavedImages[msgs.id].length > 1 && unsavedImages[msgs.id].length <= 4\">\r\n          <ion-row class=\"ion-justify-content-end\">\r\n            <div class=\"ion-no-padding\" style=\"margin-right: 5px;\">\r\n              <ion-grid class=\"ion-no-padding\">\r\n                <ion-row class=\"img-grid\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                  <ion-col class=\"col-padding\" size=\"6\" *ngFor=\"let img of unsavedImages[msgs.id]; let imgIndex = index\">\r\n                    <div style=\"position: relative;\">\r\n                      <ion-thumbnail style=\"box-shadow: none;\">\r\n                        <img class=\"loading\" *ngIf=\"img.url\" src=\"{{img.url}}\">\r\n                      </ion-thumbnail>\r\n                      <div class=\"img-publish\">\r\n                        <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                        <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n              <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n              <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                        </div>\r\n                    </div>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n              <div style=\"margin-right: 10px;\">\r\n                <ion-avatar class=\"avatar-img\">\r\n                  <ion-img src=\"{{userData.dP}}\" alt=\"\"></ion-img>\r\n                </ion-avatar>\r\n              </div>\r\n          </ion-row>\r\n        </div>\r\n        <div *ngIf=\"unsavedImages[msgs.id] && unsavedImages[msgs.id].length > 4\">\r\n          <ion-row class=\"ion-justify-content-end\">\r\n            <div class=\"ion-no-padding\" style=\"margin-right: 5px;\">\r\n              <ion-grid class=\"ion-no-padding\">\r\n                <ion-row class=\"img-grid\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                  <ion-col class=\"col-padding\" size=\"6\" *ngFor=\"let img of [unsavedImages[msgs.id][0], unsavedImages[msgs.id][1], unsavedImages[msgs.id][2], unsavedImages[msgs.id][3]]; let imgIndex = index\">\r\n                    <div style=\"position: relative;\">\r\n                      <ion-thumbnail style=\"box-shadow: none;\" *ngIf=\"imgIndex === 0 || imgIndex === 1 || imgIndex === 2\">\r\n                        <img class=\"loading\" *ngIf=\"img.url\" src=\"{{img.url}}\">\r\n                      </ion-thumbnail>\r\n                        <ion-thumbnail style=\"background-color: #000;box-shadow: none;\" *ngIf=\"imgIndex === 3\">\r\n                          <img class=\"loading img-opacity\" *ngIf=\"img.url\" src=\"{{img.url}}\">\r\n                          <div class=\"ion-no-padding\" class=\"img-count\">\r\n                            + {{msgs.msgData.images.length - 4}}\r\n                          </div>\r\n                        </ion-thumbnail>\r\n                        <div class=\"img-publish\">\r\n                          <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                          <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n              <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n              <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                          </div>\r\n                      </div>\r\n                  </ion-col>\r\n                </ion-row>\r\n              </ion-grid>\r\n            </div>\r\n            <div style=\"margin-right: 10px;\">\r\n              <ion-avatar class=\"avatar-img\">\r\n                <ion-img src=\"{{userData.dP}}\" alt=\"\"></ion-img>\r\n              </ion-avatar>\r\n            </div>\r\n          </ion-row>\r\n        </div>\r\n      </div>\r\n      <!-- /user images -->\r\n\r\n      <!-- user order -->\r\n      <ion-row class=\"ion-justify-content-end\" *ngIf=\"msgs.msgData && msgs.msgData.author == 'user' && msgs.msgData.type == 'order'\">\r\n        <div style=\"width: 50%;margin-right: 5px;padding: 13px 13px 0px 13px;\" class=\"message-user\" *ngIf=\"msgs.msgData.status=='Pending'\">\r\n          <span class=\"new-order-placed\">New Order Placed</span>\r\n          <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n          <div style=\"text-align: center;margin-top: -10px;\">\r\n            <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n              View Order\r\n            </ion-button>\r\n          </div>\r\n          <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n            <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n            <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n            <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n        </div>\r\n        <div style=\"width: 50%;margin-right: 5px;padding: 13px 13px 0px 13px;\" class=\"message-user\" *ngIf=\"msgs.msgData.status=='Cancelled'\">\r\n          <span class=\"new-order-placed\">Order is Cancelled</span>\r\n          <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n          <div style=\"text-align: center;margin-top: -10px;\">\r\n            <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n              View Order\r\n            </ion-button>\r\n          </div>\r\n          <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n            <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n            <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n            <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n        </div>\r\n        <div style=\"width: 50%;margin-right: 5px;padding: 13px 13px 0px 13px;\" class=\"message-user\" *ngIf=\"msgs.msgData.status=='PaymentMsg'\">\r\n          <span class=\"new-order-placed\">Payment is successful.</span>\r\n          <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n          <div style=\"text-align: center;margin-top: -10px;\">\r\n            <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n              View Order\r\n            </ion-button>\r\n          </div>\r\n          <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n            <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n            <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n            <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n        </div>\r\n        <div style=\"margin-right: 10px;\">\r\n          <ion-avatar class=\"avatar-img\">\r\n            <ion-img src=\"{{userData.dP}}\" alt=\"\"></ion-img>\r\n          </ion-avatar>\r\n        </div>\r\n      </ion-row>\r\n<!-- /user order -->\r\n\r\n      <!-- /User Side -->\r\n    </div>\r\n    <br>\r\n    <br>\r\n    <br>\r\n    <br>\r\n  </ion-grid>\r\n</ion-content>\r\n<div class=\"top-border\" *ngIf=\"showFooter\">\r\n  <ion-grid class=\"ion-no-padding\">\r\n    <ion-row align-items-center class=\"ion-no-padding\">\r\n      <ion-col size=\"1\">\r\n        <ion-icon name=\"add-circle\" [ngClass]=\"{'add-icon-active': userMsgTxt === '','add-icon-disabled': userMsgTxt !== '' || showMsgLoader }\" (click)=\"imageActionSheet();\"></ion-icon>\r\n      </ion-col>\r\n      <div class=\"textarea-div ion-no-padding\" style=\"padding-left: 0;\">\r\n        <textarea class=\"textareaElement\" #myInput rows=\"1\" (keyup)=\"resize()\" [(ngModel)]=\"userMsgTxt\" placeholder=\"Type a message...\"></textarea>\r\n      </div>\r\n      <ion-col size=\"1\" class=\"ion-no-padding\" style=\"padding-left: 0px;\">\r\n        <ion-button class=\"up-icon-btn\" fill = \"clear\" (mousedown)=\"preventFocusChange($event)\" (click)=\"sendMessage()\"><i class=\"flaticon-send\"></i></ion-button>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n</div>"

/***/ }),

/***/ "./src/app/chat-bot/chat-bot.module.ts":
/*!*********************************************!*\
  !*** ./src/app/chat-bot/chat-bot.module.ts ***!
  \*********************************************/
/*! exports provided: ChatBotPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatBotPageModule", function() { return ChatBotPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _chat_bot_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./chat-bot.page */ "./src/app/chat-bot/chat-bot.page.ts");
/* harmony import */ var ngx_autosize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-autosize */ "./node_modules/ngx-autosize/fesm2015/ngx-autosize.js");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.js");
/* harmony import */ var _pipes_application_pipes_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../pipes/application-pipes.module */ "./src/app/pipes/application-pipes.module.ts");










const routes = [
    {
        path: '',
        component: _chat_bot_page__WEBPACK_IMPORTED_MODULE_6__["ChatBotPage"]
    }
];
let ChatBotPageModule = class ChatBotPageModule {
};
ChatBotPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ngx_autosize__WEBPACK_IMPORTED_MODULE_7__["AutosizeModule"],
            ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__["Ng2SearchPipeModule"],
            _pipes_application_pipes_module__WEBPACK_IMPORTED_MODULE_9__["ApplicationPipesModule"]
        ],
        declarations: [_chat_bot_page__WEBPACK_IMPORTED_MODULE_6__["ChatBotPage"]],
    })
], ChatBotPageModule);



/***/ }),

/***/ "./src/app/chat-bot/chat-bot.page.scss":
/*!*********************************************!*\
  !*** ./src/app/chat-bot/chat-bot.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".is-hidden {\n  display: none;\n}\n\n.img-publish {\n  background: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(transparent));\n  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent);\n  bottom: 0;\n  height: 28px;\n  position: absolute;\n  width: 140px;\n  z-index: 2;\n  color: white;\n  border-radius: 3px;\n}\n\n.flaticon-clock::before {\n  font-size: 10px;\n  color: black;\n  opacity: 0.5;\n  position: absolute;\n  right: 2px;\n  margin-top: 1px;\n  font-weight: 600;\n}\n\n.flaticon-check::before {\n  font-size: 10px;\n  color: var(--ion-color-chat-correct);\n  position: absolute;\n  right: 2px;\n  margin-top: 1px;\n  margin-left: 1px;\n  font-weight: 600;\n}\n\n.clock-icon-image::before {\n  bottom: 5px;\n  color: white;\n  bottom: 5px;\n}\n\n.msg-content {\n  display: -webkit-inline-box;\n  display: inline-flex;\n}\n\n.spinner {\n  margin-top: 50%;\n  text-align: center;\n}\n\n.header-content {\n  position: absolute;\n  bottom: 12px;\n  color: var(--ion-color-primary-contrast);\n  left: 50%;\n  margin-left: -40px;\n  text-align: center;\n  letter-spacing: 1px;\n}\n\n.user-icon {\n  position: absolute;\n  top: 11px;\n  left: 0px;\n}\n\n.top-search-icon {\n  position: absolute;\n  top: 11px;\n  right: 0px;\n}\n\n.flaticon-null-23::before {\n  color: white;\n  font-weight: 600;\n  font-size: 20px;\n  padding: 10px;\n}\n\n.flaticon-null-24::before {\n  color: var(--ion-color-primary);\n  font-weight: 600;\n  font-size: 20px;\n  padding: 10px;\n}\n\n.shop {\n  font-size: 25px;\n  font-weight: bold;\n  text-transform: uppercase;\n  margin: 0px;\n}\n\n.flaticon-null {\n  font-size: 22px;\n}\n\n.search-message {\n  border: 1px solid #ccc;\n  border-radius: 25px;\n}\n\n.search-icon {\n  margin-right: 20px;\n  color: #ccc;\n}\n\n.margining {\n  margin-right: 20px;\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n\n.message-admin {\n  background-color: #F1F6FA;\n  border: 1px solid var(--ion-color-border-rgb);\n  box-shadow: 0px 1px 2px #ccc;\n  border-top-right-radius: 10px;\n  border-bottom-right-radius: 10px;\n  border-bottom-left-radius: 10px;\n  padding: 13px;\n  color: var(--ion-color-dark);\n  text-align: justify;\n  font-size: 14px;\n  margin-left: -10px;\n  margin-right: 5px;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  -webkit-user-select: auto;\n     -moz-user-select: auto;\n      -ms-user-select: auto;\n          user-select: auto;\n}\n\n.message-user {\n  color: black;\n  background-color: var(--ion-color-chat-background);\n  border: 1px solid var(--ion-color-chat-border);\n  box-shadow: 0px 1px 2px #ccc;\n  border-top-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n  border-bottom-left-radius: 10px;\n  padding: 13px;\n  text-align: right;\n  font-size: 14px;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  position: relative;\n  -webkit-user-select: auto;\n     -moz-user-select: auto;\n      -ms-user-select: auto;\n          user-select: auto;\n}\n\n.avatar-img {\n  margin-top: 2px;\n  border: 1px solid #ddd;\n  padding: 2px;\n  box-shadow: 0px 3px 3px 0px #e8e8e8;\n  height: 40px;\n  width: 40px;\n}\n\n.time {\n  font-size: 10px;\n  color: black;\n  opacity: 0.5;\n  margin-top: 5px;\n  margin-bottom: 0px;\n}\n\n.img-publish span {\n  color: white;\n  position: absolute;\n  bottom: 5px;\n  font-size: 10px;\n  right: 15px;\n}\n\n.add-icon-disabled {\n  font-size: 25px;\n  color: #CCCCCC;\n  position: relative;\n  left: -8px;\n}\n\n.add-icon-active {\n  font-size: 25px;\n  color: var(--ion-color-primary);\n  position: relative;\n  left: -8px;\n}\n\n.flaticon-send::before {\n  color: var(--ion-color-primary);\n  font-size: 25px;\n  margin-left: -10px;\n}\n\n.textarea-div {\n  width: 82%;\n}\n\n.up-icon-disabled {\n  color: #ccc;\n  font-size: 30px;\n  margin-left: -20px;\n}\n\n.up-icon-btn {\n  --background: none;\n}\n\n.message-input {\n  border: 1px solid #ccc;\n  border-radius: 30px;\n  width: 100%;\n  background: #fff;\n  resize: none;\n  padding-left: 10px;\n  padding-right: 10px;\n  padding-top: 20px;\n  outline: none;\n}\n\n.product-info {\n  margin: 0px;\n  text-transform: uppercase;\n  text-align: left;\n}\n\n.product-data {\n  margin: 0px;\n  text-align: left;\n}\n\n.divider {\n  background: var(--ion-color-chat-border);\n  height: 2px;\n}\n\nion-thumbnail {\n  --size: 140px;\n  border: 1px solid var(--ion-color-chat-border);\n  border-radius: 3px;\n  box-shadow: 0px 1px 2px #ccc;\n}\n\n:host .item-interactive.ion-valid {\n  --highlight-background: none;\n}\n\n.upper-icon {\n  border: none;\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.payment-method {\n  position: relative;\n  text-decoration: underline;\n  color: black;\n}\n\n.cancel-order {\n  position: absolute;\n  right: -15px;\n  color: black;\n}\n\n.status-pending {\n  text-decoration: underline;\n  position: relative;\n  margin-right: 60px;\n}\n\n.bottom-border {\n  border-bottom: 1px solid #ccc;\n  margin-top: 10px;\n}\n\n.top-border {\n  border-top: 1px solid #ccc;\n  margin-bottom: constant(safe-area-inset-bottom);\n  /* iOS 11.0 */\n  margin-bottom: env(safe-area-inset-bottom);\n  /* iOS 11.2 */\n}\n\n.top-margin {\n  margin-top: 15px;\n}\n\n.flaticon-null-22::before {\n  color: #ccc;\n  margin: 10px;\n}\n\nion-input {\n  --padding-bottom: 3px;\n  --padding-top: 5px;\n  --padding-start: 10px;\n  --padding-end: 10px;\n}\n\n.textareaElement {\n  border: 1px solid #ccc;\n  border-radius: 25px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  outline: none;\n  padding: 10px;\n  max-height: 100px;\n  width: 100%;\n  margin-top: 6px;\n  font-size: 13px;\n  margin-left: -3px;\n  -webkit-appearance: none;\n}\n\ntextarea::-webkit-input-placeholder {\n  color: black;\n  opacity: 0.3;\n}\n\ntextarea::-moz-placeholder {\n  color: black;\n  opacity: 0.3;\n}\n\ntextarea::-ms-input-placeholder {\n  color: black;\n  opacity: 0.3;\n}\n\ntextarea::placeholder {\n  color: black;\n  opacity: 0.3;\n}\n\n.ion-no-padding, [no-padding] {\n  --padding-start: 0px;\n  --padding-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  padding-left: 5px;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\n.no-msgs {\n  color: #ccc;\n  font-size: 13px;\n}\n\n.loading {\n  background: transparent url(\"https://s5.gifyu.com/images/5-1b96eeb81509e04d1.gif\") center no-repeat;\n  border-radius: 3px;\n}\n\n.flaticon-null-19::before {\n  font-size: 20px;\n}\n\n.close-btn {\n  position: absolute;\n  color: #ccc;\n  right: 2px;\n}\n\n.message-box {\n  position: relative;\n}\n\n.header-img-android {\n  position: relative;\n  width: 100%;\n  margin-top: constant(safe-area-inset-bottom);\n  /* iOS 11.0 */\n  margin-top: env(safe-area-inset-bottom);\n  /* iOS 11.2 */\n  margin-bottom: -32px;\n}\n\n.header-img-ios {\n  position: relative;\n  width: 100%;\n  margin-top: constant(safe-area-inset-bottom);\n  /* iOS 11.0 */\n  margin-top: env(safe-area-inset-bottom);\n  /* iOS 11.2 */\n}\n\n.m-left {\n  margin-left: 5px;\n}\n\n.img-user {\n  margin-right: 55px;\n}\n\n.status-completed {\n  position: relative;\n  margin-right: 60px;\n}\n\nion-spinner {\n  width: 20px !important;\n  height: 20px !important;\n}\n\n.img-order {\n  margin-right: 55px;\n  margin-top: 5px;\n}\n\n.img-grid {\n  border: 1px solid var(--ion-color-chat-border);\n  box-shadow: 0px 1px 2px 0px #ccc;\n  background-color: var(--ion-color-chat-background);\n  border-top-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n  border-bottom-left-radius: 10px;\n}\n\n.img-grid-admin {\n  border: 1px solid var(--ion-color-border-rgb);\n  box-shadow: 0px 1px 2px 0px #ccc;\n  background-color: #F1F6FA;\n  border-top-right-radius: 10px;\n  border-bottom-right-radius: 10px;\n  border-bottom-left-radius: 10px;\n}\n\n.img-opacity {\n  opacity: 0.5;\n}\n\n.img-count {\n  position: relative;\n  text-align: center;\n  bottom: 90px;\n  font-size: 30px;\n  color: white;\n}\n\n.img-broadcast {\n  margin-left: 55px;\n  margin-top: 5px;\n}\n\nion-thumbnail.product-img {\n  --size: 130px;\n}\n\n.order-rows {\n  border-bottom: 1px solid var(--ion-color-chat-border);\n  padding: 5px;\n}\n\n.p-delete {\n  text-decoration: underline;\n}\n\n.bottom-sizedbox {\n  display: block;\n  background: #fff;\n  width: 100%;\n  height: 20%;\n}\n\n@media screen and (max-width: 375px) {\n  ion-thumbnail {\n    --size: 122px;\n  }\n\n  .img-count {\n    bottom: 80px;\n  }\n\n  .flaticon-null-23::before {\n    font-size: 19px;\n  }\n\n  .flaticon-null-24::before {\n    font-size: 19px;\n  }\n\n  .img-publish {\n    width: 122px;\n  }\n}\n\n@media screen and (max-width: 360px) {\n  .sizedbox {\n    height: 60px;\n  }\n\n  .shop {\n    font-size: 20px;\n  }\n\n  .flaticon-null {\n    font-size: 20px;\n  }\n\n  ion-thumbnail {\n    --size: 115px;\n  }\n\n  .img-publish {\n    width: 115px;\n  }\n\n  .img-count {\n    bottom: 75px;\n  }\n\n  .header-content {\n    margin-left: -34px;\n  }\n\n  .flaticon-null-23::before {\n    font-size: 15px;\n  }\n\n  .flaticon-null-24::before {\n    font-size: 18px;\n  }\n\n  .flaticon-send::before {\n    font-size: 22px;\n    margin-left: -13px;\n  }\n}\n\n@media screen and (max-width: 320px) {\n  .sizedbox {\n    height: 43px;\n  }\n\n  .avatar-img {\n    margin-top: 2px;\n    margin-right: 5px;\n  }\n\n  .header-content {\n    margin-left: -29px;\n  }\n\n  .shop {\n    font-size: 18px;\n  }\n\n  .flaticon-null::before {\n    font-size: 12px;\n  }\n\n  ion-thumbnail {\n    --size: 95px;\n  }\n\n  .img-publish {\n    width: 95px;\n  }\n\n  .img-count {\n    bottom: 66px;\n    font-size: 25px;\n  }\n\n  .user-icon {\n    top: 9px;\n  }\n\n  .top-search-icon {\n    top: 9px;\n  }\n\n  .flaticon-null-23::before {\n    font-size: 15px;\n  }\n\n  .flaticon-null-24::before {\n    font-size: 15px;\n  }\n\n  .flaticon-send::before {\n    font-size: 20px;\n    margin-left: -13px;\n  }\n\n  ion-thumbnail.product-img {\n    --size: 110px;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .upper-icon {\n    margin-top: 10px;\n  }\n\n  .shop {\n    font-size: 30px;\n  }\n\n  .flaticon-null::before {\n    font-size: 25px;\n  }\n\n  .header-content {\n    bottom: 20px;\n    margin-left: -52px;\n  }\n\n  .m-left {\n    margin-left: 5px;\n  }\n\n  ion-thumbnail {\n    --size: 222px;\n  }\n\n  .img-publish {\n    width: 222px;\n  }\n\n  .img-count {\n    bottom: 136px;\n    font-size: 40px;\n  }\n\n  .col-padding {\n    padding: 8px;\n  }\n\n  .textareaElement {\n    font-size: 16px;\n  }\n\n  .user-icon {\n    top: 18px;\n    left: 18px;\n  }\n\n  .top-search-icon {\n    top: 18px;\n    right: 18px;\n  }\n\n  .flaticon-null-23::before {\n    font-size: 27px;\n  }\n\n  .flaticon-null-24::before {\n    font-size: 27px;\n  }\n\n  .bottom-border {\n    margin-top: 10px;\n  }\n\n  ion-thumbnail.product-img {\n    --size: 200px;\n  }\n}\n\n@media screen and (min-width: 768px) {\n  .sizedbox {\n    height: 60px;\n  }\n\n  ion-input {\n    font-size: 26px;\n  }\n\n  .add-icon {\n    font-size: 45px;\n  }\n\n  .up-icon {\n    font-size: 45px;\n  }\n\n  .search-icon {\n    font-size: 30px;\n  }\n\n  .for-icon {\n    font-size: 30px;\n  }\n\n  .header-content {\n    margin-left: -72px;\n    text-align: center;\n  }\n\n  .shop {\n    font-size: 45px;\n  }\n\n  .flaticon-null {\n    font-size: 40px;\n  }\n\n  .m-left {\n    margin-left: 5px;\n  }\n\n  .message-user {\n    font-size: 20px;\n  }\n\n  .message-admin {\n    font-size: 20px;\n  }\n\n  .img-user {\n    margin-right: 75px;\n  }\n\n  .avatar-img {\n    height: 60px;\n    width: 60px;\n  }\n\n  .col-padding {\n    padding: 12px;\n  }\n\n  ion-thumbnail {\n    --size: 273px;\n  }\n\n  .img-publish {\n    width: 273px;\n  }\n\n  .img-count {\n    bottom: 165px;\n    font-size: 40px;\n  }\n\n  .status-pending {\n    margin-right: 80px;\n  }\n\n  .status-completed {\n    margin-right: 80px;\n  }\n\n  .img-order {\n    margin-right: 80px;\n  }\n\n  .flaticon-send::before {\n    font-size: 40px;\n  }\n\n  .up-icon-disabled {\n    font-size: 45px;\n  }\n\n  .add-icon-active {\n    font-size: 45px;\n  }\n\n  .add-icon-disabled {\n    font-size: 45px;\n  }\n\n  .textareaElement {\n    font-size: 20px;\n  }\n\n  .img-broadcast {\n    margin-left: 75px;\n  }\n\n  .user-icon {\n    top: 22px;\n    left: 22px;\n  }\n\n  .top-search-icon {\n    top: 22px;\n    right: 22px;\n  }\n\n  .flaticon-null-23::before {\n    font-size: 30px;\n  }\n\n  .flaticon-null-24::before {\n    font-size: 25px;\n  }\n\n  .header-img-android {\n    margin-bottom: -55px;\n  }\n\n  .bottom-border {\n    margin-top: 10px;\n  }\n\n  ion-thumbnail.product-img {\n    --size: 235px;\n  }\n}\n\n@media screen and (min-width: 1024px) {\n  .sizedbox {\n    height: 60px;\n  }\n\n  ion-input {\n    font-size: 30px;\n  }\n\n  .add-icon {\n    font-size: 45px;\n  }\n\n  .up-icon {\n    font-size: 45px;\n  }\n\n  .search-icon {\n    font-size: 36px;\n  }\n\n  .for-icon {\n    font-size: 40px;\n  }\n\n  .header-content {\n    margin-left: -91px;\n    text-align: center;\n  }\n\n  .shop {\n    font-size: 55px;\n  }\n\n  .flaticon-null {\n    font-size: 50px;\n  }\n\n  .message-user {\n    font-size: 20px;\n  }\n\n  .message-admin {\n    font-size: 20px;\n  }\n\n  .img-user {\n    margin-right: 85px;\n  }\n\n  .avatar-img {\n    height: 70px;\n    width: 70px;\n  }\n\n  ion-thumbnail {\n    --size: 370px;\n  }\n\n  .img-publish {\n    width: 370px;\n  }\n\n  .img-count {\n    bottom: 220px;\n    font-size: 50px;\n  }\n\n  .status-pending {\n    margin-right: 90px;\n  }\n\n  .status-completed {\n    margin-right: 90px;\n  }\n\n  .img-order {\n    margin-right: 90px;\n  }\n\n  .m-left {\n    margin-left: -5px;\n  }\n\n  .shop {\n    margin-bottom: 15px;\n  }\n\n  .flaticon-null::before {\n    font-size: 40px;\n  }\n\n  .flaticon-send::before {\n    font-size: 45px;\n  }\n\n  .up-icon-disabled {\n    font-size: 50px;\n  }\n\n  .add-icon-active {\n    font-size: 50px;\n  }\n\n  .add-icon-disabled {\n    font-size: 50px;\n  }\n\n  .textareaElement {\n    font-size: 25px;\n  }\n\n  .img-broadcast {\n    margin-left: 85px;\n  }\n\n  .user-icon {\n    top: 30px;\n    left: 30px;\n  }\n\n  .top-search-icon {\n    top: 30px;\n    right: 30px;\n  }\n\n  .flaticon-null-23::before {\n    font-size: 30px;\n  }\n\n  .flaticon-null-24::before {\n    font-size: 40px;\n  }\n\n  .header-img-android {\n    margin-bottom: -72px;\n  }\n\n  .bottom-border {\n    margin-top: 10px;\n  }\n\n  ion-thumbnail.product-img {\n    --size: 300px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2hhdC1ib3QvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGNoYXQtYm90XFxjaGF0LWJvdC5wYWdlLnNjc3MiLCJzcmMvYXBwL2NoYXQtYm90L2NoYXQtYm90LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQTtFQUNJLGFBQUE7QUNQSjs7QURTQTtFQUNJLHNHQUFBO0VBQUEsa0VBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUNOSjs7QURRQTtFQUNJLGVBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQ0xKOztBRFFBO0VBQ0ksZUFBQTtFQUNBLG9DQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUNMSjs7QURPQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQ0pKOztBRE1BO0VBQ0ksMkJBQUE7RUFBQSxvQkFBQTtBQ0hKOztBREtBO0VBQ0ksZUFBQTtFQUNBLGtCQUFBO0FDRko7O0FESUE7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSx3Q0FBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUNESjs7QURHQTtFQUNJLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFNBQUE7QUNBSjs7QURFQTtFQUNJLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7QUNDSjs7QURDQztFQUNHLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0FDRUo7O0FEQUM7RUFDRywrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7QUNHSjs7QUREQTtFQUNJLGVBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQUFBO0VBQ0EsV0FBQTtB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QkFBQTtFQ3dJTjs7RUR0SUU7SUFDSSxrQkFBQTtFQ3lJTjs7RUR2SUU7SUFDSSxpQkFBQTtFQzBJTjs7RUR4SUU7SUFDSSxtQkFBQTtFQzJJTjs7RUR6SUU7SUFDSSxlQUFBO0VDNElOOztFRDFJRTtJQUNJLGVBQUE7RUM2SU47O0VEM0lFO0lBQ0ksZUFBQTtFQzhJTjs7RUQ1SUU7SUFDSSxlQUFBO0VDK0lOOztFRDdJRTtJQUNJLGVBQUE7RUNnSk47O0VEOUlFO0lBQ0ksZUFBQTtFQ2lKTjs7RUQvSUU7SUFDSSxpQkFBQTtFQ2tKTjs7RURoSkU7SUFDSSxTQUFBO0lBQ0EsVUFBQTtFQ21KTjs7RURqSkU7SUFDSSxTQUFBO0lBQ0EsV0FBQTtFQ29KTjs7RURsSkU7SUFDSSxlQUFBO0VDcUpOOztFRG5KRztJQUNHLGVBQUE7RUNzSk47O0VEcEpFO0lBQ0ksb0JBQUE7RUN1Sk47O0VEckpFO0lBQ0ksZ0JBQUE7RUN3Sk47O0VEdEpFO0lBQ0ksYUFBQTtFQ3lKTjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvY2hhdC1ib3QvY2hhdC1ib3QucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gLmNoYXQtaGVhZGVye1xyXG4vLyAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4vLyAgICAgaGVpZ2h0OiA1NXB4O1xyXG4vLyAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcclxuLy8gfVxyXG4vLyAuY2hhdC1oZWFkZXIgaW9uLXRpdGxle1xyXG4vLyAgICAgbWFyZ2luLXRvcDogMTVweDtcclxuLy8gfVxyXG4uaXMtaGlkZGVue1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxufVxyXG4uaW1nLXB1Ymxpc2h7XHJcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMGRlZyxyZ2JhKDAsMCwwLC41KSx0cmFuc3BhcmVudCk7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICBoZWlnaHQ6IDI4cHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB3aWR0aDogMTQwcHg7XHJcbiAgICB6LWluZGV4OiAyO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG59XHJcbi5mbGF0aWNvbi1jbG9jazo6YmVmb3Jle1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgb3BhY2l0eTogMC41O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgcmlnaHQ6IDJweDtcclxuICAgIG1hcmdpbi10b3A6IDFweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcblxyXG59XHJcbi5mbGF0aWNvbi1jaGVjazo6YmVmb3Jle1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1jaGF0LWNvcnJlY3QpO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgcmlnaHQ6IDJweDtcclxuICAgIG1hcmdpbi10b3A6IDFweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAxcHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG59XHJcbi5jbG9jay1pY29uLWltYWdlOjpiZWZvcmV7XHJcbiAgICBib3R0b206IDVweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJvdHRvbTogNXB4O1xyXG59XHJcbi5tc2ctY29udGVudHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG59XHJcbi5zcGlubmVye1xyXG4gICAgbWFyZ2luLXRvcDogNTAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi5oZWFkZXItY29udGVudHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvdHRvbTogMTJweDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICBtYXJnaW4tbGVmdDogLTQwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMXB4O1xyXG59XHJcbi51c2VyLWljb257XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDExcHg7XHJcbiAgICBsZWZ0OiAwcHg7XHJcbn1cclxuLnRvcC1zZWFyY2gtaWNvbntcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMTFweDtcclxuICAgIHJpZ2h0OiAwcHg7XHJcbn1cclxuIC5mbGF0aWNvbi1udWxsLTIzOjpiZWZvcmV7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgcGFkZGluZzogMTBweDtcclxufVxyXG4gLmZsYXRpY29uLW51bGwtMjQ6OmJlZm9yZXtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgcGFkZGluZzogMTBweDtcclxufVxyXG4uc2hvcHtcclxuICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIG1hcmdpbjogMHB4O1xyXG59XHJcbi5mbGF0aWNvbi1udWxse1xyXG4gICAgZm9udC1zaXplOiAyMnB4O1xyXG59XHJcbi5zZWFyY2gtbWVzc2FnZXtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xyXG59XHJcbi5zZWFyY2gtaWNvbiB7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XHJcbiAgICBjb2xvcjogI2NjYztcclxuICB9XHJcbiAgLm1hcmdpbmluZ3tcclxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG4ubWVzc2FnZS1hZG1pbntcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGMUY2RkE7XHJcbiAgICBib3JkZXI6ICAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWJvcmRlci1yZ2IpO1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDFweCAycHggI2NjYztcclxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHg7XHJcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMHB4O1xyXG4gICAgcGFkZGluZzogMTNweDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IC0xMHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbiAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XHJcbiAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XHJcbiAgICB1c2VyLXNlbGVjdDogYXV0bztcclxufVxyXG4ubWVzc2FnZS11c2Vye1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWNoYXQtYmFja2dyb3VuZCk7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItY2hhdC1ib3JkZXIpO1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDFweCAycHggI2NjYztcclxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDEwcHg7XHJcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTBweDtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwcHg7XHJcbiAgICBwYWRkaW5nOiAxM3B4O1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XHJcbiAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB1c2VyLXNlbGVjdDogYXV0bztcclxufVxyXG4uYXZhdGFyLWltZ3tcclxuICAgIG1hcmdpbi10b3A6IDJweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgICBwYWRkaW5nOiAycHg7XHJcbiAgICBib3gtc2hhZG93OiAwcHggM3B4IDNweCAwcHggI2U4ZThlODtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIHdpZHRoOiA0MHB4O1xyXG59XHJcbi50aW1le1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgb3BhY2l0eTogLjU7XHJcbiAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwcHg7XHJcbn1cclxuLmltZy1wdWJsaXNoIHNwYW57XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBib3R0b206IDVweDtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG59XHJcbi5hZGQtaWNvbi1kaXNhYmxlZCB7XHJcbiAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICBjb2xvcjogI0NDQ0NDQztcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGxlZnQ6IC04cHg7XHJcbn1cclxuLmFkZC1pY29uLWFjdGl2ZSB7XHJcbiAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgbGVmdDogLThweDtcclxufVxyXG4uZmxhdGljb24tc2VuZDo6YmVmb3JlIHtcclxuICAgIGNvbG9yOnZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAtMTBweDtcclxufVxyXG4udGV4dGFyZWEtZGl2e1xyXG4gICAgd2lkdGg6IDgyJTtcclxufVxyXG4udXAtaWNvbi1kaXNhYmxlZHtcclxuICAgIGNvbG9yOiAjY2NjO1xyXG4gICAgZm9udC1zaXplOiAzMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IC0yMHB4O1xyXG59XHJcbi51cC1pY29uLWJ0bntcclxuICAgIC0tYmFja2dyb3VuZDogbm9uZTtcclxufVxyXG4ubWVzc2FnZS1pbnB1dHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgcmVzaXplOiBub25lO1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMTBweDtcclxuICAgIHBhZGRpbmctdG9wOiAyMHB4O1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxufVxyXG5cclxuLnByb2R1Y3QtaW5mbyB7XHJcbiAgICBtYXJnaW46IDBweDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59XHJcbi5wcm9kdWN0LWRhdGF7XHJcbiAgICBtYXJnaW46IDBweDtcclxuICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbn1cclxuLmRpdmlkZXJ7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItY2hhdC1ib3JkZXIpO1xyXG4gICAgaGVpZ2h0OiAycHg7XHJcbn1cclxuaW9uLXRodW1ibmFpbCB7XHJcbiAgICAtLXNpemU6IDE0MHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWNoYXQtYm9yZGVyKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgIGJveC1zaGFkb3c6IDBweCAxcHggMnB4ICNjY2M7XHJcbn1cclxuOmhvc3Qge1xyXG4gICAgLml0ZW0taW50ZXJhY3RpdmUuaW9uLXZhbGlke1xyXG4gICAgICAtLWhpZ2hsaWdodC1iYWNrZ3JvdW5kOiBub25lO1xyXG4gICAgfVxyXG4gIH1cclxuICAudXBwZXItaWNvbntcclxuICAgICAgYm9yZGVyOiBub25lO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XHJcbiAgfVxyXG4gIC5wYXltZW50LW1ldGhvZHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICAgICAgY29sb3I6IGJsYWNrO1xyXG4gIH1cclxuICAuY2FuY2VsLW9yZGVye1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHJpZ2h0OiAtMTVweDtcclxuICAgICAgY29sb3I6IGJsYWNrO1xyXG4gIH1cclxuICAuc3RhdHVzLXBlbmRpbmd7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIG1hcmdpbi1yaWdodDogNjBweDtcclxuICB9XHJcbiAgLmJvdHRvbS1ib3JkZXJ7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbn1cclxuLnRvcC1ib3JkZXJ7XHJcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2NjYztcclxuICAgIG1hcmdpbi1ib3R0b206IGNvbnN0YW50KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pOyAvKiBpT1MgMTEuMCAqL1xyXG4gICAgbWFyZ2luLWJvdHRvbTogZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pOyAvKiBpT1MgMTEuMiAqL1xyXG59XHJcbi50b3AtbWFyZ2lue1xyXG4gIG1hcmdpbi10b3A6IDE1cHg7XHJcbn1cclxuLmZsYXRpY29uLW51bGwtMjI6OmJlZm9yZXtcclxuICAgIGNvbG9yOiAjY2NjO1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG4gIH1cclxuICBpb24taW5wdXR7XHJcbiAgICAtLXBhZGRpbmctYm90dG9tOiAzcHg7XHJcbiAgICAtLXBhZGRpbmctdG9wOiA1cHg7XHJcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDEwcHg7XHJcbiAgICAtLXBhZGRpbmctZW5kOiAxMHB4O1xyXG4gIH1cclxuICAudGV4dGFyZWFFbGVtZW50IHtcclxuICAgIC8vIG1pbi1oZWlnaHQ6IDIwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcclxuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIG1heC1oZWlnaHQ6IDEwMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW4tdG9wOiA2cHg7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogLTNweDtcclxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcclxuICB9XHJcbiAgdGV4dGFyZWE6OnBsYWNlaG9sZGVye1xyXG4gICAgICBjb2xvcjogYmxhY2s7XHJcbiAgICAgIG9wYWNpdHk6IC4zO1xyXG4gIH1cclxuICAuaW9uLW5vLXBhZGRpbmcsIFtuby1wYWRkaW5nXSB7XHJcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDBweDtcclxuICAgIC0tcGFkZGluZy1lbmQ6IDA7XHJcbiAgICAtLXBhZGRpbmctdG9wOiAwO1xyXG4gICAgLS1wYWRkaW5nLWJvdHRvbTogMDtcclxuICAgIHBhZGRpbmctbGVmdDogNXB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMDtcclxuICAgIHBhZGRpbmctdG9wOiAwO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDA7XHJcbn1cclxuLm5vLW1zZ3N7XHJcbiAgICBjb2xvcjogI2NjYztcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICB9XHJcbiAgLmxvYWRpbmcge1xyXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKCdodHRwczovL3M1LmdpZnl1LmNvbS9pbWFnZXMvNS0xYjk2ZWViODE1MDllMDRkMS5naWYnKSBjZW50ZXIgbm8tcmVwZWF0O1xyXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gIH1cclxuICAuZmxhdGljb24tbnVsbC0xOTo6YmVmb3Jle1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gIH1cclxuICAuY2xvc2UtYnRue1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlOyBcclxuICAgIGNvbG9yOiAjY2NjO1xyXG4gICAgcmlnaHQ6IDJweDtcclxuICB9XHJcbiAgLm1lc3NhZ2UtYm94e1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIH1cclxuICAuaGVhZGVyLWltZy1hbmRyb2lke1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW4tdG9wOiBjb25zdGFudChzYWZlLWFyZWEtaW5zZXQtYm90dG9tKTsgLyogaU9TIDExLjAgKi9cclxuICAgIG1hcmdpbi10b3A6IGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tKTsgLyogaU9TIDExLjIgKi9cclxuICAgIG1hcmdpbi1ib3R0b206IC0zMnB4O1xyXG4gIH1cclxuICAuaGVhZGVyLWltZy1pb3N7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbi10b3A6IGNvbnN0YW50KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pOyAvKiBpT1MgMTEuMCAqL1xyXG4gICAgbWFyZ2luLXRvcDogZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pOyAvKiBpT1MgMTEuMiAqL1xyXG4gIH1cclxuICAubS1sZWZ0e1xyXG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICB9XHJcbiAgLmltZy11c2Vye1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1NXB4O1xyXG4gIH1cclxuICAuc3RhdHVzLWNvbXBsZXRlZHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIG1hcmdpbi1yaWdodDogNjBweDtcclxuICB9XHJcbiAgaW9uLXNwaW5uZXIge1xyXG4gICAgd2lkdGg6IDIwcHggIWltcG9ydGFudDtcclxuICAgIGhlaWdodDogMjBweCAhaW1wb3J0YW50O1xyXG59XHJcbi5pbWctb3JkZXJ7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDU1cHg7IFxyXG4gICAgbWFyZ2luLXRvcDogNXB4O1xyXG59XHJcbi5pbWctZ3JpZHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1jaGF0LWJvcmRlcik7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAwcHggI2NjYztcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1jaGF0LWJhY2tncm91bmQpO1xyXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTBweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDtcclxuICB9XHJcbi5pbWctZ3JpZC1hZG1pbntcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1ib3JkZXItcmdiKTtcclxuICAgIGJveC1zaGFkb3c6IDBweCAxcHggMnB4IDBweCAjY2NjO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0YxRjZGQTtcclxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHg7XHJcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMHB4O1xyXG4gIH1cclxuICAuaW1nLW9wYWNpdHl7XHJcbiAgICAgIG9wYWNpdHk6IDAuNTtcclxuICB9XHJcbiAgLmltZy1jb3VudHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGJvdHRvbTogOTBweDtcclxuICAgIGZvbnQtc2l6ZTogMzBweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIFxyXG4gIH1cclxuICAuaW1nLWJyb2FkY2FzdHtcclxuICAgICAgbWFyZ2luLWxlZnQ6IDU1cHg7XHJcbiAgICAgIG1hcmdpbi10b3A6IDVweDtcclxuICB9XHJcbiAgaW9uLXRodW1ibmFpbC5wcm9kdWN0LWltZyB7XHJcbiAgICAtLXNpemU6IDEzMHB4O1xyXG4gIH0gXHJcbiAgLm9yZGVyLXJvd3N7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWNoYXQtYm9yZGVyKTtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICB9XHJcblxyXG4ucC1kZWxldGV7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxufVxyXG4uYm90dG9tLXNpemVkYm94e1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6MjAlO1xyXG59XHJcblxyXG5cclxuLy9NRURJQSBRVUVSSUVTXHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1heC13aWR0aDogMzc1cHgpe1xyXG4gICAgaW9uLXRodW1ibmFpbCB7XHJcbiAgICAgICAgLS1zaXplOiAxMjJweDtcclxuICAgIH1cclxuICAgIC5pbWctY291bnR7XHJcbiAgICAgICAgYm90dG9tOiA4MHB4O1xyXG4gICAgfVxyXG4gICAgLmZsYXRpY29uLW51bGwtMjM6OmJlZm9yZXtcclxuICAgICAgICBmb250LXNpemU6IDE5cHg7XHJcbiAgICB9XHJcbiAgICAgLmZsYXRpY29uLW51bGwtMjQ6OmJlZm9yZXtcclxuICAgICAgICBmb250LXNpemU6IDE5cHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLXB1Ymxpc2h7XHJcbiAgICAgICAgd2lkdGg6IDEyMnB4O1xyXG4gICAgfVxyXG5cclxufVxyXG5AbWVkaWEgc2NyZWVuIGFuZChtYXgtd2lkdGg6IDM2MHB4KXtcclxuICAgIC5zaXplZGJveHtcclxuICAgICAgICBoZWlnaHQ6IDYwcHg7XHJcbiAgICB9XHJcbiAgICAuc2hvcHtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcbiAgICAuZmxhdGljb24tbnVsbHtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcbiAgICBpb24tdGh1bWJuYWlsIHtcclxuICAgICAgICAtLXNpemU6IDExNXB4O1xyXG4gICAgfVxyXG4gICAgLmltZy1wdWJsaXNoe1xyXG4gICAgICAgIHdpZHRoOiAxMTVweDtcclxuICAgIH1cclxuICAgIC5pbWctY291bnR7XHJcbiAgICAgICAgYm90dG9tOiA3NXB4O1xyXG4gICAgfVxyXG4gICAgLmhlYWRlci1jb250ZW50e1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtMzRweDtcclxuICAgIH1cclxuICAgIC5mbGF0aWNvbi1udWxsLTIzOjpiZWZvcmV7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgfVxyXG4gICAgIC5mbGF0aWNvbi1udWxsLTI0OjpiZWZvcmV7XHJcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgfVxyXG4gICAgIC5mbGF0aWNvbi1zZW5kOjpiZWZvcmV7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMnB4O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtMTNweDtcclxuICAgIH1cclxuXHJcblxyXG59XHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1heC13aWR0aDogMzIwcHgpe1xyXG4gICAgLnNpemVkYm94e1xyXG4gICAgICAgIGhlaWdodDogNDNweDtcclxuICAgIH1cclxuICAgIC8vIC5tZXNzYWdlLWFkbWlue1xyXG4gICAgLy8gICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xyXG4gICAgLy8gfVxyXG4gICAgLmF2YXRhci1pbWd7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogNXB4O1xyXG4gICAgfVxyXG4gICAgLmhlYWRlci1jb250ZW50e1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtMjlweDtcclxuICAgIH1cclxuICAgIC5zaG9we1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIH1cclxuICAgIC5mbGF0aWNvbi1udWxsOjpiZWZvcmV7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgfVxyXG4gICAgaW9uLXRodW1ibmFpbCB7XHJcbiAgICAgICAgLS1zaXplOiA5NXB4O1xyXG4gICAgfVxyXG4gICAgLmltZy1wdWJsaXNoe1xyXG4gICAgICAgIHdpZHRoOiA5NXB4O1xyXG4gICAgfVxyXG4gICAgLmltZy1jb3VudHtcclxuICAgICAgICBib3R0b206IDY2cHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgfVxyXG4gICAgLnVzZXItaWNvbntcclxuICAgICAgICB0b3A6IDlweDtcclxuICAgIH1cclxuICAgIC50b3Atc2VhcmNoLWljb257XHJcbiAgICAgICAgdG9wOiA5cHg7XHJcbiAgICB9XHJcbiAgICAuZmxhdGljb24tbnVsbC0yMzo6YmVmb3Jle1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIH1cclxuICAgICAuZmxhdGljb24tbnVsbC0yNDo6YmVmb3Jle1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIH1cclxuICAgIC5mbGF0aWNvbi1zZW5kOjpiZWZvcmV7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtMTNweDtcclxuICAgIH1cclxuICAgIGlvbi10aHVtYm5haWwucHJvZHVjdC1pbWcge1xyXG4gICAgICAgIC0tc2l6ZTogMTEwcHg7XHJcbiAgICAgIH0gXHJcbn1cclxuXHJcblxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQobWluLXdpZHRoOiA2MDBweCkge1xyXG4gICAgLnVwcGVyLWljb257XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIH1cclxuICAgIC5zaG9we1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMzBweDtcclxuICAgIH1cclxuICAgIC5mbGF0aWNvbi1udWxsOjpiZWZvcmV7XHJcbiAgICAgICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgfVxyXG4gICAgLmhlYWRlci1jb250ZW50e1xyXG4gICAgICAgIGJvdHRvbTogMjBweDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogLTUycHg7XHJcbiAgICB9XHJcbiAgICAubS1sZWZ0e1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgICB9XHJcbiAgICBpb24tdGh1bWJuYWlsIHtcclxuICAgICAgICAtLXNpemU6IDIyMnB4O1xyXG4gICAgfVxyXG4gICAgLmltZy1wdWJsaXNoe1xyXG4gICAgICAgIHdpZHRoOiAyMjJweDtcclxuICAgIH1cclxuICAgIC5pbWctY291bnR7XHJcbiAgICAgICAgYm90dG9tOiAxMzZweDtcclxuICAgICAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICB9XHJcbiAgICAuY29sLXBhZGRpbmd7XHJcbiAgICAgICAgcGFkZGluZzogOHB4O1xyXG4gICAgfVxyXG4gICAgLnRleHRhcmVhRWxlbWVudHtcclxuICAgICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICB9XHJcbiAgICAudXNlci1pY29ue1xyXG4gICAgICAgIHRvcDogMThweDtcclxuICAgICAgICBsZWZ0OiAxOHB4O1xyXG4gICAgfVxyXG4gICAgLnRvcC1zZWFyY2gtaWNvbntcclxuICAgICAgICB0b3A6IDE4cHg7XHJcbiAgICAgICAgcmlnaHQ6IDE4cHg7XHJcbiAgICB9XHJcbiAgICAuZmxhdGljb24tbnVsbC0yMzo6YmVmb3Jle1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjdweDtcclxuICAgIH1cclxuICAgICAuZmxhdGljb24tbnVsbC0yNDo6YmVmb3Jle1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjdweDtcclxuICAgIH1cclxuICAgXHJcbiAgICAuYm90dG9tLWJvcmRlcntcclxuICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgfVxyXG4gICAgaW9uLXRodW1ibmFpbC5wcm9kdWN0LWltZyB7XHJcbiAgICAgICAgLS1zaXplOiAyMDBweDtcclxuICAgICAgfSBcclxufVxyXG5AbWVkaWEgc2NyZWVuIGFuZChtaW4td2lkdGg6IDc2OHB4KXtcclxuICAgIC5zaXplZGJveHtcclxuICAgICAgICBoZWlnaHQ6IDYwcHg7XHJcbiAgICB9XHJcbiAgICBpb24taW5wdXR7XHJcbiAgICAgICAgZm9udC1zaXplOiAyNnB4O1xyXG4gICAgfVxyXG4gICAgLmFkZC1pY29ue1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNDVweDtcclxuICAgIH1cclxuICAgIC51cC1pY29ue1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNDVweDtcclxuICAgIH1cclxuICAgIC5zZWFyY2gtaWNvbntcclxuICAgICAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgICB9XHJcbiAgICAuZm9yLWljb257XHJcbiAgICAgICAgZm9udC1zaXplOiAzMHB4O1xyXG4gICAgfVxyXG4gICAgLmhlYWRlci1jb250ZW50e1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtNzJweDtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB9XHJcbiAgICAuc2hvcHtcclxuICAgICAgICBmb250LXNpemU6IDQ1cHg7XHJcbiAgICB9XHJcbiAgICAuZmxhdGljb24tbnVsbHtcclxuICAgICAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICB9XHJcbiAgICAubS1sZWZ0e1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgICB9XHJcbiAgICAubWVzc2FnZS11c2Vye1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIH1cclxuICAgIC5tZXNzYWdlLWFkbWlue1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIH1cclxuICAgIC5pbWctdXNlcntcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDc1cHg7XHJcbiAgICB9XHJcbiAgICAuYXZhdGFyLWltZ3tcclxuICAgICAgICBoZWlnaHQ6IDYwcHg7XHJcbiAgICAgICAgd2lkdGg6IDYwcHg7XHJcbiAgICB9XHJcbiAgICAuY29sLXBhZGRpbmd7XHJcbiAgICAgICAgcGFkZGluZzogMTJweDtcclxuICAgIH1cclxuICAgIGlvbi10aHVtYm5haWwge1xyXG4gICAgICAgIC0tc2l6ZTogMjczcHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLXB1Ymxpc2h7XHJcbiAgICAgICAgd2lkdGg6IDI3M3B4O1xyXG4gICAgfVxyXG4gICAgLmltZy1jb3VudHtcclxuICAgICAgICBib3R0b206IDE2NXB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIH1cclxuICAgIC5zdGF0dXMtcGVuZGluZ3tcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDgwcHg7XHJcbiAgICB9XHJcbiAgICAuc3RhdHVzLWNvbXBsZXRlZHtcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDgwcHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLW9yZGVye1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogODBweDtcclxuICAgIH1cclxuICAgIC5mbGF0aWNvbi1zZW5kOjpiZWZvcmV7XHJcbiAgICAgICAgZm9udC1zaXplOiA0MHB4O1xyXG4gICAgfVxyXG4gICAgLnVwLWljb24tZGlzYWJsZWR7XHJcbiAgICAgICAgZm9udC1zaXplOiA0NXB4O1xyXG4gICAgfVxyXG4gICAgLmFkZC1pY29uLWFjdGl2ZXtcclxuICAgICAgICBmb250LXNpemU6IDQ1cHg7XHJcbiAgICB9XHJcbiAgICAuYWRkLWljb24tZGlzYWJsZWR7XHJcbiAgICAgICAgZm9udC1zaXplOiA0NXB4O1xyXG4gICAgfVxyXG4gICAgLnRleHRhcmVhRWxlbWVudHtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLWJyb2FkY2FzdHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogNzVweDtcclxuICAgIH1cclxuICAgIC51c2VyLWljb257XHJcbiAgICAgICAgdG9wOiAyMnB4O1xyXG4gICAgICAgIGxlZnQ6IDIycHg7XHJcbiAgICB9XHJcbiAgICAudG9wLXNlYXJjaC1pY29ue1xyXG4gICAgICAgIHRvcDogMjJweDtcclxuICAgICAgICByaWdodDogMjJweDtcclxuICAgIH1cclxuICAgIC5mbGF0aWNvbi1udWxsLTIzOjpiZWZvcmV7XHJcbiAgICAgICAgZm9udC1zaXplOiAzMHB4O1xyXG4gICAgfVxyXG4gICAgIC5mbGF0aWNvbi1udWxsLTI0OjpiZWZvcmV7XHJcbiAgICAgICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgfVxyXG4gICAgLmhlYWRlci1pbWctYW5kcm9pZHtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAtNTVweDtcclxuICAgIH1cclxuICAgIC5ib3R0b20tYm9yZGVye1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICB9XHJcbiAgICBpb24tdGh1bWJuYWlsLnByb2R1Y3QtaW1nIHtcclxuICAgICAgICAtLXNpemU6IDIzNXB4O1xyXG4gICAgICB9IFxyXG5cclxufVxyXG5AbWVkaWEgc2NyZWVuIGFuZChtaW4td2lkdGg6IDEwMjRweCl7XHJcbiAgICAuc2l6ZWRib3h7XHJcbiAgICAgICAgaGVpZ2h0OiA2MHB4O1xyXG4gICAgfVxyXG4gICAgaW9uLWlucHV0e1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMzBweDtcclxuICAgIH1cclxuICAgIC5hZGQtaWNvbntcclxuICAgICAgICBmb250LXNpemU6IDQ1cHg7XHJcbiAgICB9XHJcbiAgICAudXAtaWNvbntcclxuICAgICAgICBmb250LXNpemU6IDQ1cHg7XHJcbiAgICB9XHJcbiAgICAuc2VhcmNoLWljb257XHJcbiAgICAgICAgZm9udC1zaXplOiAzNnB4O1xyXG4gICAgfVxyXG4gICAgLmZvci1pY29ue1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIH1cclxuICAgIC5oZWFkZXItY29udGVudHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogLTkxcHg7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgfVxyXG4gICAgLnNob3B7XHJcbiAgICAgICAgZm9udC1zaXplOiA1NXB4O1xyXG4gICAgfVxyXG4gICAgLmZsYXRpY29uLW51bGx7XHJcbiAgICAgICAgZm9udC1zaXplOiA1MHB4O1xyXG4gICAgfVxyXG4gICAgLm1lc3NhZ2UtdXNlcntcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcbiAgICAubWVzc2FnZS1hZG1pbntcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLXVzZXJ7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA4NXB4O1xyXG4gICAgfVxyXG4gICAgLmF2YXRhci1pbWd7XHJcbiAgICAgICAgaGVpZ2h0OiA3MHB4O1xyXG4gICAgICAgIHdpZHRoOiA3MHB4O1xyXG4gICAgfVxyXG4gICAgaW9uLXRodW1ibmFpbCB7XHJcbiAgICAgICAgLS1zaXplOiAzNzBweDtcclxuICAgIH1cclxuICAgIC5pbWctcHVibGlzaHtcclxuICAgICAgICB3aWR0aDogMzcwcHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLWNvdW50e1xyXG4gICAgICAgIGJvdHRvbTogMjIwcHg7XHJcbiAgICAgICAgZm9udC1zaXplOiA1MHB4O1xyXG4gICAgfVxyXG4gICAgLnN0YXR1cy1wZW5kaW5ne1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogOTBweDtcclxuICAgIH1cclxuICAgIC5zdGF0dXMtY29tcGxldGVke1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogOTBweDtcclxuICAgIH1cclxuICAgIC5pbWctb3JkZXJ7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA5MHB4O1xyXG4gICAgfVxyXG4gICAgLm0tbGVmdHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogLTVweDtcclxuICAgIH1cclxuICAgIC5zaG9we1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgICB9XHJcbiAgICAuZmxhdGljb24tbnVsbDo6YmVmb3Jle1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIH1cclxuICAgIC5mbGF0aWNvbi1zZW5kOjpiZWZvcmV7XHJcbiAgICAgICAgZm9udC1zaXplOiA0NXB4O1xyXG4gICAgfVxyXG4gICAgLnVwLWljb24tZGlzYWJsZWR7XHJcbiAgICAgICAgZm9udC1zaXplOiA1MHB4O1xyXG4gICAgfVxyXG4gICAgLmFkZC1pY29uLWFjdGl2ZXtcclxuICAgICAgICBmb250LXNpemU6IDUwcHg7XHJcbiAgICB9XHJcbiAgICAuYWRkLWljb24tZGlzYWJsZWR7XHJcbiAgICAgICAgZm9udC1zaXplOiA1MHB4O1xyXG4gICAgfVxyXG4gICAgLnRleHRhcmVhRWxlbWVudHtcclxuICAgICAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLWJyb2FkY2FzdHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogODVweDtcclxuICAgIH1cclxuICAgIC51c2VyLWljb257XHJcbiAgICAgICAgdG9wOiAzMHB4O1xyXG4gICAgICAgIGxlZnQ6IDMwcHg7XHJcbiAgICB9XHJcbiAgICAudG9wLXNlYXJjaC1pY29ue1xyXG4gICAgICAgIHRvcDogMzBweDtcclxuICAgICAgICByaWdodDogMzBweDtcclxuICAgIH1cclxuICAgIC5mbGF0aWNvbi1udWxsLTIzOjpiZWZvcmV7XHJcbiAgICAgICAgZm9udC1zaXplOiAzMHB4O1xyXG4gICAgfVxyXG4gICAgIC5mbGF0aWNvbi1udWxsLTI0OjpiZWZvcmV7XHJcbiAgICAgICAgZm9udC1zaXplOiA0MHB4O1xyXG4gICAgfVxyXG4gICAgLmhlYWRlci1pbWctYW5kcm9pZHtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAtNzJweDtcclxuICAgIH1cclxuICAgIC5ib3R0b20tYm9yZGVye1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICB9XHJcbiAgICBpb24tdGh1bWJuYWlsLnByb2R1Y3QtaW1nIHtcclxuICAgICAgICAtLXNpemU6IDMwMHB4O1xyXG4gICAgICB9IFxyXG59XHJcbiIsIi5pcy1oaWRkZW4ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uaW1nLXB1Ymxpc2gge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgcmdiYSgwLCAwLCAwLCAwLjUpLCB0cmFuc3BhcmVudCk7XG4gIGJvdHRvbTogMDtcbiAgaGVpZ2h0OiAyOHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAxNDBweDtcbiAgei1pbmRleDogMjtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG59XG5cbi5mbGF0aWNvbi1jbG9jazo6YmVmb3JlIHtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBjb2xvcjogYmxhY2s7XG4gIG9wYWNpdHk6IDAuNTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMnB4O1xuICBtYXJnaW4tdG9wOiAxcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5mbGF0aWNvbi1jaGVjazo6YmVmb3JlIHtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWNoYXQtY29ycmVjdCk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDJweDtcbiAgbWFyZ2luLXRvcDogMXB4O1xuICBtYXJnaW4tbGVmdDogMXB4O1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uY2xvY2staWNvbi1pbWFnZTo6YmVmb3JlIHtcbiAgYm90dG9tOiA1cHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm90dG9tOiA1cHg7XG59XG5cbi5tc2ctY29udGVudCB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xufVxuXG4uc3Bpbm5lciB7XG4gIG1hcmdpbi10b3A6IDUwJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uaGVhZGVyLWNvbnRlbnQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMTJweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcbiAgbGVmdDogNTAlO1xuICBtYXJnaW4tbGVmdDogLTQwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcbn1cblxuLnVzZXItaWNvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxMXB4O1xuICBsZWZ0OiAwcHg7XG59XG5cbi50b3Atc2VhcmNoLWljb24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTFweDtcbiAgcmlnaHQ6IDBweDtcbn1cblxuLmZsYXRpY29uLW51bGwtMjM6OmJlZm9yZSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBwYWRkaW5nOiAxMHB4O1xufVxuXG4uZmxhdGljb24tbnVsbC0yNDo6YmVmb3JlIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBwYWRkaW5nOiAxMHB4O1xufVxuXG4uc2hvcCB7XG4gIGZvbnQtc2l6ZTogMjVweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIG1hcmdpbjogMHB4O1xufVxuXG4uZmxhdGljb24tbnVsbCB7XG4gIGZvbnQtc2l6ZTogMjJweDtcbn1cblxuLnNlYXJjaC1tZXNzYWdlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcbn1cblxuLnNlYXJjaC1pY29uIHtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICBjb2xvcjogI2NjYztcbn1cblxuLm1hcmdpbmluZyB7XG4gIG1hcmdpbi1yaWdodDogMjBweDtcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi5tZXNzYWdlLWFkbWluIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0YxRjZGQTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWJvcmRlci1yZ2IpO1xuICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAjY2NjO1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTBweDtcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHg7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwcHg7XG4gIHBhZGRpbmc6IDEzcHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIHRleHQtYWxpZ246IGp1c3RpZnk7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbWFyZ2luLWxlZnQ6IC0xMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG4gIHVzZXItc2VsZWN0OiBhdXRvO1xufVxuXG4ubWVzc2FnZS11c2VyIHtcbiAgY29sb3I6IGJsYWNrO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItY2hhdC1iYWNrZ3JvdW5kKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWNoYXQtYm9yZGVyKTtcbiAgYm94LXNoYWRvdzogMHB4IDFweCAycHggI2NjYztcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTBweDtcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHg7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwcHg7XG4gIHBhZGRpbmc6IDEzcHg7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBmb250LXNpemU6IDE0cHg7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHVzZXItc2VsZWN0OiBhdXRvO1xufVxuXG4uYXZhdGFyLWltZyB7XG4gIG1hcmdpbi10b3A6IDJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgcGFkZGluZzogMnB4O1xuICBib3gtc2hhZG93OiAwcHggM3B4IDNweCAwcHggI2U4ZThlODtcbiAgaGVpZ2h0OiA0MHB4O1xuICB3aWR0aDogNDBweDtcbn1cblxuLnRpbWUge1xuICBmb250LXNpemU6IDEwcHg7XG4gIGNvbG9yOiBibGFjaztcbiAgb3BhY2l0eTogMC41O1xuICBtYXJnaW4tdG9wOiA1cHg7XG4gIG1hcmdpbi1ib3R0b206IDBweDtcbn1cblxuLmltZy1wdWJsaXNoIHNwYW4ge1xuICBjb2xvcjogd2hpdGU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiA1cHg7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgcmlnaHQ6IDE1cHg7XG59XG5cbi5hZGQtaWNvbi1kaXNhYmxlZCB7XG4gIGZvbnQtc2l6ZTogMjVweDtcbiAgY29sb3I6ICNDQ0NDQ0M7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbGVmdDogLThweDtcbn1cblxuLmFkZC1pY29uLWFjdGl2ZSB7XG4gIGZvbnQtc2l6ZTogMjVweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAtOHB4O1xufVxuXG4uZmxhdGljb24tc2VuZDo6YmVmb3JlIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgZm9udC1zaXplOiAyNXB4O1xuICBtYXJnaW4tbGVmdDogLTEwcHg7XG59XG5cbi50ZXh0YXJlYS1kaXYge1xuICB3aWR0aDogODIlO1xufVxuXG4udXAtaWNvbi1kaXNhYmxlZCB7XG4gIGNvbG9yOiAjY2NjO1xuICBmb250LXNpemU6IDMwcHg7XG4gIG1hcmdpbi1sZWZ0OiAtMjBweDtcbn1cblxuLnVwLWljb24tYnRuIHtcbiAgLS1iYWNrZ3JvdW5kOiBub25lO1xufVxuXG4ubWVzc2FnZS1pbnB1dCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICByZXNpemU6IG5vbmU7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbiAgcGFkZGluZy1yaWdodDogMTBweDtcbiAgcGFkZGluZy10b3A6IDIwcHg7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi5wcm9kdWN0LWluZm8ge1xuICBtYXJnaW46IDBweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLnByb2R1Y3QtZGF0YSB7XG4gIG1hcmdpbjogMHB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4uZGl2aWRlciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1jaGF0LWJvcmRlcik7XG4gIGhlaWdodDogMnB4O1xufVxuXG5pb24tdGh1bWJuYWlsIHtcbiAgLS1zaXplOiAxNDBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWNoYXQtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAjY2NjO1xufVxuXG46aG9zdCAuaXRlbS1pbnRlcmFjdGl2ZS5pb24tdmFsaWQge1xuICAtLWhpZ2hsaWdodC1iYWNrZ3JvdW5kOiBub25lO1xufVxuXG4udXBwZXItaWNvbiB7XG4gIGJvcmRlcjogbm9uZTtcbiAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xufVxuXG4ucGF5bWVudC1tZXRob2Qge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICBjb2xvcjogYmxhY2s7XG59XG5cbi5jYW5jZWwtb3JkZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAtMTVweDtcbiAgY29sb3I6IGJsYWNrO1xufVxuXG4uc3RhdHVzLXBlbmRpbmcge1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tcmlnaHQ6IDYwcHg7XG59XG5cbi5ib3R0b20tYm9yZGVyIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG5cbi50b3AtYm9yZGVyIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7XG4gIG1hcmdpbi1ib3R0b206IGNvbnN0YW50KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pO1xuICAvKiBpT1MgMTEuMCAqL1xuICBtYXJnaW4tYm90dG9tOiBlbnYoc2FmZS1hcmVhLWluc2V0LWJvdHRvbSk7XG4gIC8qIGlPUyAxMS4yICovXG59XG5cbi50b3AtbWFyZ2luIHtcbiAgbWFyZ2luLXRvcDogMTVweDtcbn1cblxuLmZsYXRpY29uLW51bGwtMjI6OmJlZm9yZSB7XG4gIGNvbG9yOiAjY2NjO1xuICBtYXJnaW46IDEwcHg7XG59XG5cbmlvbi1pbnB1dCB7XG4gIC0tcGFkZGluZy1ib3R0b206IDNweDtcbiAgLS1wYWRkaW5nLXRvcDogNXB4O1xuICAtLXBhZGRpbmctc3RhcnQ6IDEwcHg7XG4gIC0tcGFkZGluZy1lbmQ6IDEwcHg7XG59XG5cbi50ZXh0YXJlYUVsZW1lbnQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIG91dGxpbmU6IG5vbmU7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1heC1oZWlnaHQ6IDEwMHB4O1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLXRvcDogNnB4O1xuICBmb250LXNpemU6IDEzcHg7XG4gIG1hcmdpbi1sZWZ0OiAtM3B4O1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbnRleHRhcmVhOjpwbGFjZWhvbGRlciB7XG4gIGNvbG9yOiBibGFjaztcbiAgb3BhY2l0eTogMC4zO1xufVxuXG4uaW9uLW5vLXBhZGRpbmcsIFtuby1wYWRkaW5nXSB7XG4gIC0tcGFkZGluZy1zdGFydDogMHB4O1xuICAtLXBhZGRpbmctZW5kOiAwO1xuICAtLXBhZGRpbmctdG9wOiAwO1xuICAtLXBhZGRpbmctYm90dG9tOiAwO1xuICBwYWRkaW5nLWxlZnQ6IDVweDtcbiAgcGFkZGluZy1yaWdodDogMDtcbiAgcGFkZGluZy10b3A6IDA7XG4gIHBhZGRpbmctYm90dG9tOiAwO1xufVxuXG4ubm8tbXNncyB7XG4gIGNvbG9yOiAjY2NjO1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi5sb2FkaW5nIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiaHR0cHM6Ly9zNS5naWZ5dS5jb20vaW1hZ2VzLzUtMWI5NmVlYjgxNTA5ZTA0ZDEuZ2lmXCIpIGNlbnRlciBuby1yZXBlYXQ7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbn1cblxuLmZsYXRpY29uLW51bGwtMTk6OmJlZm9yZSB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLmNsb3NlLWJ0biB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgY29sb3I6ICNjY2M7XG4gIHJpZ2h0OiAycHg7XG59XG5cbi5tZXNzYWdlLWJveCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmhlYWRlci1pbWctYW5kcm9pZCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi10b3A6IGNvbnN0YW50KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pO1xuICAvKiBpT1MgMTEuMCAqL1xuICBtYXJnaW4tdG9wOiBlbnYoc2FmZS1hcmVhLWluc2V0LWJvdHRvbSk7XG4gIC8qIGlPUyAxMS4yICovXG4gIG1hcmdpbi1ib3R0b206IC0zMnB4O1xufVxuXG4uaGVhZGVyLWltZy1pb3Mge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW4tdG9wOiBjb25zdGFudChzYWZlLWFyZWEtaW5zZXQtYm90dG9tKTtcbiAgLyogaU9TIDExLjAgKi9cbiAgbWFyZ2luLXRvcDogZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pO1xuICAvKiBpT1MgMTEuMiAqL1xufVxuXG4ubS1sZWZ0IHtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cblxuLmltZy11c2VyIHtcbiAgbWFyZ2luLXJpZ2h0OiA1NXB4O1xufVxuXG4uc3RhdHVzLWNvbXBsZXRlZCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLXJpZ2h0OiA2MHB4O1xufVxuXG5pb24tc3Bpbm5lciB7XG4gIHdpZHRoOiAyMHB4ICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogMjBweCAhaW1wb3J0YW50O1xufVxuXG4uaW1nLW9yZGVyIHtcbiAgbWFyZ2luLXJpZ2h0OiA1NXB4O1xuICBtYXJnaW4tdG9wOiA1cHg7XG59XG5cbi5pbWctZ3JpZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1jaGF0LWJvcmRlcik7XG4gIGJveC1zaGFkb3c6IDBweCAxcHggMnB4IDBweCAjY2NjO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItY2hhdC1iYWNrZ3JvdW5kKTtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTBweDtcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHg7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwcHg7XG59XG5cbi5pbWctZ3JpZC1hZG1pbiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1ib3JkZXItcmdiKTtcbiAgYm94LXNoYWRvdzogMHB4IDFweCAycHggMHB4ICNjY2M7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGMUY2RkE7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMHB4O1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTBweDtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDtcbn1cblxuLmltZy1vcGFjaXR5IHtcbiAgb3BhY2l0eTogMC41O1xufVxuXG4uaW1nLWNvdW50IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJvdHRvbTogOTBweDtcbiAgZm9udC1zaXplOiAzMHB4O1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5pbWctYnJvYWRjYXN0IHtcbiAgbWFyZ2luLWxlZnQ6IDU1cHg7XG4gIG1hcmdpbi10b3A6IDVweDtcbn1cblxuaW9uLXRodW1ibmFpbC5wcm9kdWN0LWltZyB7XG4gIC0tc2l6ZTogMTMwcHg7XG59XG5cbi5vcmRlci1yb3dzIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1jaGF0LWJvcmRlcik7XG4gIHBhZGRpbmc6IDVweDtcbn1cblxuLnAtZGVsZXRlIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG59XG5cbi5ib3R0b20tc2l6ZWRib3gge1xuICBkaXNwbGF5OiBibG9jaztcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMjAlO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzNzVweCkge1xuICBpb24tdGh1bWJuYWlsIHtcbiAgICAtLXNpemU6IDEyMnB4O1xuICB9XG5cbiAgLmltZy1jb3VudCB7XG4gICAgYm90dG9tOiA4MHB4O1xuICB9XG5cbiAgLmZsYXRpY29uLW51bGwtMjM6OmJlZm9yZSB7XG4gICAgZm9udC1zaXplOiAxOXB4O1xuICB9XG5cbiAgLmZsYXRpY29uLW51bGwtMjQ6OmJlZm9yZSB7XG4gICAgZm9udC1zaXplOiAxOXB4O1xuICB9XG5cbiAgLmltZy1wdWJsaXNoIHtcbiAgICB3aWR0aDogMTIycHg7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM2MHB4KSB7XG4gIC5zaXplZGJveCB7XG4gICAgaGVpZ2h0OiA2MHB4O1xuICB9XG5cbiAgLnNob3Age1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgfVxuXG4gIC5mbGF0aWNvbi1udWxsIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gIH1cblxuICBpb24tdGh1bWJuYWlsIHtcbiAgICAtLXNpemU6IDExNXB4O1xuICB9XG5cbiAgLmltZy1wdWJsaXNoIHtcbiAgICB3aWR0aDogMTE1cHg7XG4gIH1cblxuICAuaW1nLWNvdW50IHtcbiAgICBib3R0b206IDc1cHg7XG4gIH1cblxuICAuaGVhZGVyLWNvbnRlbnQge1xuICAgIG1hcmdpbi1sZWZ0OiAtMzRweDtcbiAgfVxuXG4gIC5mbGF0aWNvbi1udWxsLTIzOjpiZWZvcmUge1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgfVxuXG4gIC5mbGF0aWNvbi1udWxsLTI0OjpiZWZvcmUge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgfVxuXG4gIC5mbGF0aWNvbi1zZW5kOjpiZWZvcmUge1xuICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICBtYXJnaW4tbGVmdDogLTEzcHg7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDMyMHB4KSB7XG4gIC5zaXplZGJveCB7XG4gICAgaGVpZ2h0OiA0M3B4O1xuICB9XG5cbiAgLmF2YXRhci1pbWcge1xuICAgIG1hcmdpbi10b3A6IDJweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDVweDtcbiAgfVxuXG4gIC5oZWFkZXItY29udGVudCB7XG4gICAgbWFyZ2luLWxlZnQ6IC0yOXB4O1xuICB9XG5cbiAgLnNob3Age1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgfVxuXG4gIC5mbGF0aWNvbi1udWxsOjpiZWZvcmUge1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgfVxuXG4gIGlvbi10aHVtYm5haWwge1xuICAgIC0tc2l6ZTogOTVweDtcbiAgfVxuXG4gIC5pbWctcHVibGlzaCB7XG4gICAgd2lkdGg6IDk1cHg7XG4gIH1cblxuICAuaW1nLWNvdW50IHtcbiAgICBib3R0b206IDY2cHg7XG4gICAgZm9udC1zaXplOiAyNXB4O1xuICB9XG5cbiAgLnVzZXItaWNvbiB7XG4gICAgdG9wOiA5cHg7XG4gIH1cblxuICAudG9wLXNlYXJjaC1pY29uIHtcbiAgICB0b3A6IDlweDtcbiAgfVxuXG4gIC5mbGF0aWNvbi1udWxsLTIzOjpiZWZvcmUge1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgfVxuXG4gIC5mbGF0aWNvbi1udWxsLTI0OjpiZWZvcmUge1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgfVxuXG4gIC5mbGF0aWNvbi1zZW5kOjpiZWZvcmUge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICBtYXJnaW4tbGVmdDogLTEzcHg7XG4gIH1cblxuICBpb24tdGh1bWJuYWlsLnByb2R1Y3QtaW1nIHtcbiAgICAtLXNpemU6IDExMHB4O1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2MDBweCkge1xuICAudXBwZXItaWNvbiB7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgfVxuXG4gIC5zaG9wIHtcbiAgICBmb250LXNpemU6IDMwcHg7XG4gIH1cblxuICAuZmxhdGljb24tbnVsbDo6YmVmb3JlIHtcbiAgICBmb250LXNpemU6IDI1cHg7XG4gIH1cblxuICAuaGVhZGVyLWNvbnRlbnQge1xuICAgIGJvdHRvbTogMjBweDtcbiAgICBtYXJnaW4tbGVmdDogLTUycHg7XG4gIH1cblxuICAubS1sZWZ0IHtcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xuICB9XG5cbiAgaW9uLXRodW1ibmFpbCB7XG4gICAgLS1zaXplOiAyMjJweDtcbiAgfVxuXG4gIC5pbWctcHVibGlzaCB7XG4gICAgd2lkdGg6IDIyMnB4O1xuICB9XG5cbiAgLmltZy1jb3VudCB7XG4gICAgYm90dG9tOiAxMzZweDtcbiAgICBmb250LXNpemU6IDQwcHg7XG4gIH1cblxuICAuY29sLXBhZGRpbmcge1xuICAgIHBhZGRpbmc6IDhweDtcbiAgfVxuXG4gIC50ZXh0YXJlYUVsZW1lbnQge1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxuXG4gIC51c2VyLWljb24ge1xuICAgIHRvcDogMThweDtcbiAgICBsZWZ0OiAxOHB4O1xuICB9XG5cbiAgLnRvcC1zZWFyY2gtaWNvbiB7XG4gICAgdG9wOiAxOHB4O1xuICAgIHJpZ2h0OiAxOHB4O1xuICB9XG5cbiAgLmZsYXRpY29uLW51bGwtMjM6OmJlZm9yZSB7XG4gICAgZm9udC1zaXplOiAyN3B4O1xuICB9XG5cbiAgLmZsYXRpY29uLW51bGwtMjQ6OmJlZm9yZSB7XG4gICAgZm9udC1zaXplOiAyN3B4O1xuICB9XG5cbiAgLmJvdHRvbS1ib3JkZXIge1xuICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gIH1cblxuICBpb24tdGh1bWJuYWlsLnByb2R1Y3QtaW1nIHtcbiAgICAtLXNpemU6IDIwMHB4O1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAuc2l6ZWRib3gge1xuICAgIGhlaWdodDogNjBweDtcbiAgfVxuXG4gIGlvbi1pbnB1dCB7XG4gICAgZm9udC1zaXplOiAyNnB4O1xuICB9XG5cbiAgLmFkZC1pY29uIHtcbiAgICBmb250LXNpemU6IDQ1cHg7XG4gIH1cblxuICAudXAtaWNvbiB7XG4gICAgZm9udC1zaXplOiA0NXB4O1xuICB9XG5cbiAgLnNlYXJjaC1pY29uIHtcbiAgICBmb250LXNpemU6IDMwcHg7XG4gIH1cblxuICAuZm9yLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgfVxuXG4gIC5oZWFkZXItY29udGVudCB7XG4gICAgbWFyZ2luLWxlZnQ6IC03MnB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG4gIC5zaG9wIHtcbiAgICBmb250LXNpemU6IDQ1cHg7XG4gIH1cblxuICAuZmxhdGljb24tbnVsbCB7XG4gICAgZm9udC1zaXplOiA0MHB4O1xuICB9XG5cbiAgLm0tbGVmdCB7XG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgfVxuXG4gIC5tZXNzYWdlLXVzZXIge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgfVxuXG4gIC5tZXNzYWdlLWFkbWluIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gIH1cblxuICAuaW1nLXVzZXIge1xuICAgIG1hcmdpbi1yaWdodDogNzVweDtcbiAgfVxuXG4gIC5hdmF0YXItaW1nIHtcbiAgICBoZWlnaHQ6IDYwcHg7XG4gICAgd2lkdGg6IDYwcHg7XG4gIH1cblxuICAuY29sLXBhZGRpbmcge1xuICAgIHBhZGRpbmc6IDEycHg7XG4gIH1cblxuICBpb24tdGh1bWJuYWlsIHtcbiAgICAtLXNpemU6IDI3M3B4O1xuICB9XG5cbiAgLmltZy1wdWJsaXNoIHtcbiAgICB3aWR0aDogMjczcHg7XG4gIH1cblxuICAuaW1nLWNvdW50IHtcbiAgICBib3R0b206IDE2NXB4O1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgfVxuXG4gIC5zdGF0dXMtcGVuZGluZyB7XG4gICAgbWFyZ2luLXJpZ2h0OiA4MHB4O1xuICB9XG5cbiAgLnN0YXR1cy1jb21wbGV0ZWQge1xuICAgIG1hcmdpbi1yaWdodDogODBweDtcbiAgfVxuXG4gIC5pbWctb3JkZXIge1xuICAgIG1hcmdpbi1yaWdodDogODBweDtcbiAgfVxuXG4gIC5mbGF0aWNvbi1zZW5kOjpiZWZvcmUge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgfVxuXG4gIC51cC1pY29uLWRpc2FibGVkIHtcbiAgICBmb250LXNpemU6IDQ1cHg7XG4gIH1cblxuICAuYWRkLWljb24tYWN0aXZlIHtcbiAgICBmb250LXNpemU6IDQ1cHg7XG4gIH1cblxuICAuYWRkLWljb24tZGlzYWJsZWQge1xuICAgIGZvbnQtc2l6ZTogNDVweDtcbiAgfVxuXG4gIC50ZXh0YXJlYUVsZW1lbnQge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgfVxuXG4gIC5pbWctYnJvYWRjYXN0IHtcbiAgICBtYXJnaW4tbGVmdDogNzVweDtcbiAgfVxuXG4gIC51c2VyLWljb24ge1xuICAgIHRvcDogMjJweDtcbiAgICBsZWZ0OiAyMnB4O1xuICB9XG5cbiAgLnRvcC1zZWFyY2gtaWNvbiB7XG4gICAgdG9wOiAyMnB4O1xuICAgIHJpZ2h0OiAyMnB4O1xuICB9XG5cbiAgLmZsYXRpY29uLW51bGwtMjM6OmJlZm9yZSB7XG4gICAgZm9udC1zaXplOiAzMHB4O1xuICB9XG5cbiAgLmZsYXRpY29uLW51bGwtMjQ6OmJlZm9yZSB7XG4gICAgZm9udC1zaXplOiAyNXB4O1xuICB9XG5cbiAgLmhlYWRlci1pbWctYW5kcm9pZCB7XG4gICAgbWFyZ2luLWJvdHRvbTogLTU1cHg7XG4gIH1cblxuICAuYm90dG9tLWJvcmRlciB7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgfVxuXG4gIGlvbi10aHVtYm5haWwucHJvZHVjdC1pbWcge1xuICAgIC0tc2l6ZTogMjM1cHg7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMjRweCkge1xuICAuc2l6ZWRib3gge1xuICAgIGhlaWdodDogNjBweDtcbiAgfVxuXG4gIGlvbi1pbnB1dCB7XG4gICAgZm9udC1zaXplOiAzMHB4O1xuICB9XG5cbiAgLmFkZC1pY29uIHtcbiAgICBmb250LXNpemU6IDQ1cHg7XG4gIH1cblxuICAudXAtaWNvbiB7XG4gICAgZm9udC1zaXplOiA0NXB4O1xuICB9XG5cbiAgLnNlYXJjaC1pY29uIHtcbiAgICBmb250LXNpemU6IDM2cHg7XG4gIH1cblxuICAuZm9yLWljb24ge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgfVxuXG4gIC5oZWFkZXItY29udGVudCB7XG4gICAgbWFyZ2luLWxlZnQ6IC05MXB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG4gIC5zaG9wIHtcbiAgICBmb250LXNpemU6IDU1cHg7XG4gIH1cblxuICAuZmxhdGljb24tbnVsbCB7XG4gICAgZm9udC1zaXplOiA1MHB4O1xuICB9XG5cbiAgLm1lc3NhZ2UtdXNlciB7XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICB9XG5cbiAgLm1lc3NhZ2UtYWRtaW4ge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgfVxuXG4gIC5pbWctdXNlciB7XG4gICAgbWFyZ2luLXJpZ2h0OiA4NXB4O1xuICB9XG5cbiAgLmF2YXRhci1pbWcge1xuICAgIGhlaWdodDogNzBweDtcbiAgICB3aWR0aDogNzBweDtcbiAgfVxuXG4gIGlvbi10aHVtYm5haWwge1xuICAgIC0tc2l6ZTogMzcwcHg7XG4gIH1cblxuICAuaW1nLXB1Ymxpc2gge1xuICAgIHdpZHRoOiAzNzBweDtcbiAgfVxuXG4gIC5pbWctY291bnQge1xuICAgIGJvdHRvbTogMjIwcHg7XG4gICAgZm9udC1zaXplOiA1MHB4O1xuICB9XG5cbiAgLnN0YXR1cy1wZW5kaW5nIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDkwcHg7XG4gIH1cblxuICAuc3RhdHVzLWNvbXBsZXRlZCB7XG4gICAgbWFyZ2luLXJpZ2h0OiA5MHB4O1xuICB9XG5cbiAgLmltZy1vcmRlciB7XG4gICAgbWFyZ2luLXJpZ2h0OiA5MHB4O1xuICB9XG5cbiAgLm0tbGVmdCB7XG4gICAgbWFyZ2luLWxlZnQ6IC01cHg7XG4gIH1cblxuICAuc2hvcCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcbiAgfVxuXG4gIC5mbGF0aWNvbi1udWxsOjpiZWZvcmUge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgfVxuXG4gIC5mbGF0aWNvbi1zZW5kOjpiZWZvcmUge1xuICAgIGZvbnQtc2l6ZTogNDVweDtcbiAgfVxuXG4gIC51cC1pY29uLWRpc2FibGVkIHtcbiAgICBmb250LXNpemU6IDUwcHg7XG4gIH1cblxuICAuYWRkLWljb24tYWN0aXZlIHtcbiAgICBmb250LXNpemU6IDUwcHg7XG4gIH1cblxuICAuYWRkLWljb24tZGlzYWJsZWQge1xuICAgIGZvbnQtc2l6ZTogNTBweDtcbiAgfVxuXG4gIC50ZXh0YXJlYUVsZW1lbnQge1xuICAgIGZvbnQtc2l6ZTogMjVweDtcbiAgfVxuXG4gIC5pbWctYnJvYWRjYXN0IHtcbiAgICBtYXJnaW4tbGVmdDogODVweDtcbiAgfVxuXG4gIC51c2VyLWljb24ge1xuICAgIHRvcDogMzBweDtcbiAgICBsZWZ0OiAzMHB4O1xuICB9XG5cbiAgLnRvcC1zZWFyY2gtaWNvbiB7XG4gICAgdG9wOiAzMHB4O1xuICAgIHJpZ2h0OiAzMHB4O1xuICB9XG5cbiAgLmZsYXRpY29uLW51bGwtMjM6OmJlZm9yZSB7XG4gICAgZm9udC1zaXplOiAzMHB4O1xuICB9XG5cbiAgLmZsYXRpY29uLW51bGwtMjQ6OmJlZm9yZSB7XG4gICAgZm9udC1zaXplOiA0MHB4O1xuICB9XG5cbiAgLmhlYWRlci1pbWctYW5kcm9pZCB7XG4gICAgbWFyZ2luLWJvdHRvbTogLTcycHg7XG4gIH1cblxuICAuYm90dG9tLWJvcmRlciB7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgfVxuXG4gIGlvbi10aHVtYm5haWwucHJvZHVjdC1pbWcge1xuICAgIC0tc2l6ZTogMzAwcHg7XG4gIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/chat-bot/chat-bot.page.ts":
/*!*******************************************!*\
  !*** ./src/app/chat-bot/chat-bot.page.ts ***!
  \*******************************************/
/*! exports provided: ChatBotPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatBotPage", function() { return ChatBotPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/image-picker/ngx */ "./node_modules/@ionic-native/image-picker/ngx/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _ionic_native_keyboard_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/keyboard/ngx */ "./node_modules/@ionic-native/keyboard/ngx/index.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var _image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");











//import { CallNumber } from '@ionic-native/call-number/ngx';
let ChatBotPage = class ChatBotPage {
    constructor(events, userService, actionSheetController, camera, imagePicker, loadingController, router, modalController, ngZone, alertController, platform, chatService, toastController, keyboard, route, storage) {
        this.events = events;
        this.userService = userService;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.imagePicker = imagePicker;
        this.loadingController = loadingController;
        this.router = router;
        this.modalController = modalController;
        this.ngZone = ngZone;
        this.alertController = alertController;
        this.platform = platform;
        this.chatService = chatService;
        this.toastController = toastController;
        this.keyboard = keyboard;
        this.route = route;
        this.storage = storage;
        this.userMsgTxt = '';
        this.msg = {
            type: null,
            message: null,
            createdAt: null,
            images: null,
            isRead: null,
            author: null,
            published: null,
            mob: null,
            thumb: null,
            imageCount: null
        };
        this.allMsgs = [];
        this.chatLoader = false;
        this.enableScroll = true;
        this.showNoMsgs = false;
        this.showMsgLoader = false;
        this.showLoader = true;
        this.lastTimeBackPress = 0;
        this.timePeriodToExit = 2000;
        this.imgUrls = [];
        this.useToolbar = true;
        this.disableSendBtn = true;
        this.showSearch = false;
        this.setFirstImage = false;
        this.unsavedImages = {};
        this.showFooter = false;
        window.addEventListener('keyboardWillShow', () => {
            //console.log("Keyboard will Show");
            setTimeout(() => {
                this.ngZone.run(() => {
                    if (this.content.scrollToBottom) {
                        this.content.scrollToBottom(0);
                    }
                });
            }, 0);
        });
        this.storage.get('unsavedImages').then((val) => {
            if (val) {
                this.unsavedImages = val;
                //console.log('val of unsavedImages', this.unsavedImages);
            }
        });
    }
    ionViewWillEnter() {
        if (this.platform.is('android')) {
            this.useToolbar = false;
        }
        this.devWidth = this.platform.width();
        this.devHeight = this.platform.height();
        //console.log('devWidth', this.devWidth);
        //console.log('devHeight', this.devHeight);
        if (this.devWidth <= 500) {
            this.useThumb = true;
        }
        else if (this.devWidth > 500) {
            this.useThumb = false;
        }
        if (this.devWidth < 700) {
            this.maxMessageWidth = this.devWidth - 70;
        }
        else if (this.devWidth >= 700 && this.devWidth <= 1000) {
            this.maxMessageWidth = this.devWidth - 90;
        }
        else {
            this.maxMessageWidth = this.devWidth - 100;
        }
        if (this.devWidth < 600) {
            this.imgGridWidth = this.devWidth - 106;
        }
        else if (this.devWidth >= 600 && this.devWidth <= 700) {
            this.imgGridWidth = this.devWidth - 124;
        }
        else if (this.devWidth >= 700 && this.devWidth <= 1000) {
            this.imgGridWidth = this.devWidth - 168;
        }
        else {
            this.imgGridWidth = this.devWidth - 224;
        }
    }
    preventFocusChange(e) {
        e.preventDefault();
    }
    ionViewDidEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.chatService.makeUserActiveTrue(this.uid);
            setTimeout(() => {
                this.showFooter = true;
            }, 500);
        });
    }
    ionViewWillLeave() {
        this.events.publish('chat:removeGetMsgsSubscription');
        this.chatService.makeUserActiveFalse(this.uid);
    }
    ngOnInit() {
        //console.log('in ngOnInit');
        this.storage.get('uid').then((val) => {
            //console.log('user id in chat-bot', val);
            this.uid = val;
            this.events.publish('chat:getMsgs', this.uid, 'user');
            this.events.publish('user:getUserDetails', this.uid);
        });
        this.initializeSubscriptions();
    }
    ngOnDestroy() {
        //console.log('in ngOnDestroyed');
        this.removeSubscriptions();
    }
    scrollToBottomOnInit() {
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom(0);
            }
        }, 500);
    }
    logScrolling($event) {
        if ($event.detail.scrollTop === 0 && !this.searchMsg) {
            //console.log('in scroll top zero', $event.detail.scrollTop);
            this.chatLoader = true;
            this.showNoMsgs = false;
            this.events.publish('chat:getMoreMsgs', this.uid);
        }
    }
    scrollToFirstMessage(elementId) {
        let y = document.getElementById(elementId).offsetTop;
        //console.log('y position', y);
        this.content.scrollToPoint(0, y);
    }
    initializeSubscriptions() {
        this.events.subscribe('chat:publishMsgs', (msgs) => {
            this.allMsgs = msgs;
            // if(this.newOrderStatus === true) {
            //   this.loader.dismiss();
            // }
            //console.log('publish user msgs', msgs);
            this.showMsgLoader = false;
            this.showLoader = false;
            this.scrollToBottomOnInit();
            if (this.allMsgs) {
                this.makeImageUrls();
            }
            this.removeSavedImagesFromStorage();
            setTimeout(() => {
                this.enableScroll = true;
            }, 2000);
        });
        this.events.subscribe('chat:publishMoreMsgs', (msgs) => {
            // for (const msg of msgs) {
            //   this.chatLoader = false;
            //   this.allMsgs.unshift(msg.payload.doc.data());
            // }
            this.allMsgs = msgs;
            //console.log('more msgs', this.allMsgs);
            this.chatLoader = false;
            this.scrollToFirstMessage('chatMessage' + 1);
            this.makeImageUrls();
        });
        this.events.subscribe('chat:noMoreMsgs', () => {
            this.chatLoader = false;
            this.showNoMsgs = true;
        });
        this.events.subscribe('user:publishUserDetails', (user) => {
            this.userData = user;
        });
        this.events.subscribe('media:chatImageSuccess', () => {
            // this.loader.dismiss();
        });
        this.events.subscribe('user:cancelOrderSuccess', () => {
            this.loader.dismiss();
        });
        this.events.subscribe('media:showUnsavedImages', (msgId, imageResponse) => {
            this.unsavedImages[msgId] = imageResponse;
            this.storage.set('unsavedImages', this.unsavedImages);
            //console.log('unsavedImages', this.unsavedImages);
        });
        this.events.subscribe('user:deleteProductSuccesss', () => {
            this.presentAlert('Product Deleted Successfully!');
            this.loading.dismiss();
        });
    }
    removeSavedImagesFromStorage() {
        let arrayOfUnsavedImagesIds = [];
        arrayOfUnsavedImagesIds = Object.keys(this.unsavedImages);
        for (let i = 0; i < this.allMsgs.length; i++) {
            for (let j = 0; j < arrayOfUnsavedImagesIds.length; j++) {
                if (this.allMsgs[i].id === arrayOfUnsavedImagesIds[j] && this.allMsgs[i].msgData.published === true) {
                    this.unsavedImages[arrayOfUnsavedImagesIds[j]] = null;
                    this.storage.set('unsavedImages', this.unsavedImages);
                }
            }
        }
    }
    makeImageUrls() {
        //console.log('in makeImageUrls');
        if (this.allMsgs.length) {
            for (let i = 0; i < this.allMsgs.length; i++) {
                if (this.allMsgs[i].msgData.images && (this.allMsgs[i].msgData.type === "image" || this.allMsgs[i].msgData.type === "broadcast")) {
                    for (let y = 0; y < this.allMsgs[i].msgData.images.length; y++) {
                        this.imgUrls.push(this.allMsgs[i].msgData.images[y]);
                    }
                }
                else if (this.allMsgs[i].msgData.type === "order" && this.allMsgs[i].msgData.img) {
                    this.imgUrls.push(this.allMsgs[i].msgData.img);
                }
                else {
                    continue;
                }
            }
        }
        //console.log('imgUrls', this.imgUrls);
    }
    resize() {
        this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    }
    sendMessage() {
        if (this.userMsgTxt.length !== 0) {
            this.content.scrollToBottom(0);
            this.myInput.nativeElement.style.height = 40 + 'px';
            this.enableScroll = false;
            this.showMsgLoader = true;
            const msg = {
                type: 'txt',
                createdAt: new Date(),
                isRead: false,
                author: 'user',
                published: false,
                message: this.userMsgTxt
            };
            this.allMsgs.push({ msgData: msg });
            this.events.publish('chat:sendMsg', msg, this.uid);
            this.userMsgTxt = '';
        }
    }
    imageActionSheet() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.userMsgTxt === '') {
                this.enableScroll = false;
                const actionSheet = yield this.actionSheetController.create({
                    header: 'Select any option',
                    buttons: [{
                            text: 'Camera',
                            icon: 'camera',
                            handler: () => {
                                this.addCameraImage();
                            }
                        }, {
                            text: 'Gallery',
                            icon: 'images',
                            handler: () => {
                                this.addGalleryImages();
                            }
                        }, {
                            text: 'Cancel',
                            icon: 'close',
                            role: 'cancel',
                            handler: () => {
                                //console.log('Cancel clicked');
                            }
                        }]
                });
                yield actionSheet.present();
            }
        });
    }
    addCameraImage() {
        this.optionsforCamera = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            allowEdit: true
        };
        //console.log('in addChatImage');
        const imageResponse = [];
        this.camera.getPicture(this.optionsforCamera).then((imageData) => {
            if (imageData.length !== 0) {
                const base64Image = 'data:image/jpeg;base64,' + imageData;
                const base64Str = base64Image.split(',');
                const size = this.calculateImageSize(base64Str[1]);
                imageResponse.push({ url: base64Image, size: size });
                //console.log('size of image', size);
                this.msg.type = 'image';
                this.msg.createdAt = new Date();
                this.msg.isRead = false;
                this.msg.author = 'user';
                this.msg.published = false;
                this.allMsgs.push(this.msg);
                //console.log('url in camera', imageResponse);
                this.events.publish('media:addChatImage', this.uid, this.msg, imageResponse);
            }
        }, (err) => {
            //console.log(err);
        });
    }
    addGalleryImages() {
        this.optionsforGallery = {
            quality: 50,
            outputType: 1
        };
        const imageResponse = [];
        this.imagePicker.getPictures(this.optionsforGallery).then((results) => {
            if (results.length !== 0 && results !== 'OK') {
                for (let i = 0; i < results.length; i++) {
                    const base64Image = 'data:image/jpeg;base64,' + results[i];
                    const base64Str = base64Image.split(',');
                    const imgSize = this.calculateImageSize(base64Str[1]);
                    imageResponse.push({ url: 'data:image/jpeg;base64,' + results[i], size: imgSize });
                }
                this.msg.type = 'image';
                this.msg.createdAt = new Date();
                this.msg.isRead = false;
                this.msg.author = 'user';
                this.msg.published = false;
                this.allMsgs.push(this.msg);
                //console.log('allMsgs in gallery', this.allMsgs);
                this.events.publish('media:addChatImage', this.uid, this.msg, imageResponse);
            }
        }, (err) => {
            //console.log(err);
        });
    }
    calculateImageSize(base64String) {
        let padding, inBytes, base64StringLength;
        if (base64String.endsWith('==')) {
            padding = 2;
        }
        else if (base64String.endsWith('=')) {
            padding = 1;
        }
        else {
            padding = 0;
        }
        base64StringLength = base64String.length;
        inBytes = (base64StringLength / 4) * 3 - padding;
        const kbytes = inBytes / 1000;
        return kbytes;
    }
    imageZoom(img) {
        //console.log("img", img);
        let imgIndex = this.imgUrls.indexOf(img);
        this.modalController.create({
            component: _image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_10__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: this.imgUrls,
                index: imgIndex
            }
        }).then(modal => modal.present());
    }
    gridImageZoom(imgs) {
        this.modalController.create({
            component: _image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_10__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: imgs,
                index: 0
            }
        }).then(modal => modal.present());
    }
    singleImageZoom(img) {
        this.modalController.create({
            component: _image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_10__["ImageModalPage"],
            componentProps: {
                imgs: [{ url: img }],
                index: 0
            }
        }).then(modal => modal.present());
    }
    calcTotalAmount(products) {
        let totalAmount = 0;
        for (let i = 0; i < products.length; i++) {
            totalAmount += products[i].price;
        }
        return totalAmount;
    }
    showDeleteProduct(msgTime) {
        // let lastOrderCheckTime = moment().subtract(environment.multipleOrdersTimeLimit,'minutes');
        // if(moment(msgTime.toDate()).isSameOrAfter(lastOrderCheckTime)) {
        //   return true;
        // } else{
        //    return false;
        // }
    }
    isDate(date) {
        return date instanceof Date;
    }
    cancelOrder(orderId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loader = yield this.loadingController.create({
                message: 'Please Wait...',
            });
            yield this.loader.present();
            this.events.publish('user:cancelOrder', orderId);
        });
    }
    cancelOrderConfirm(orderId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Are you sure you want to cancel this order?',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'dark',
                        handler: (blah) => {
                            //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Okay',
                        handler: () => {
                            //console.log('Confirm Okay');
                            this.cancelOrder(orderId);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    calculateMsgTime(time) {
        let hours = '0';
        let minutes = '0';
        if (time.toDate().getHours().toString().length > 1) {
            hours = time.toDate().getHours();
        }
        else {
            hours = '0' + time.toDate().getHours();
        }
        if (time.toDate().getMinutes().toString().length > 1) {
            minutes = time.toDate().getMinutes();
        }
        else {
            minutes = '0' + time.toDate().getMinutes();
        }
        return hours + ':' + minutes;
    }
    clearSearchMsg() {
        this.searchMsg = null;
        this.content.scrollToBottom(0);
    }
    goToProfile() {
        this.router.navigate(['profile']);
    }
    onClickSearchBtn() {
        //console.log('in onClickSearchBtn');
        this.showSearch = !this.showSearch;
    }
    onClickViewOrder(orderId) {
        const navigationExtras = {
            state: {
                orderId: orderId
            }
        };
        this.router.navigate(['user-order-details'], navigationExtras);
    }
    onClickDoPayment(orderId) {
        const navigationExtras = {
            state: {
                orderId: orderId,
                userId: this.uid
            }
        };
        this.router.navigate(['order-payment'], navigationExtras);
    }
    onClickDeleteProduct(orderId, msgId, productId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Please Wait...',
                duration: 10000
            });
            yield this.loading.present();
            this.events.publish('user:deletePrdouctFromChatAndOrders', orderId, msgId, productId);
        });
    }
    onClickDeleteProductConfirm(orderId, msgId, productId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Are you sure you want to delete this product?',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'dark',
                        handler: (blah) => {
                            //console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Okay',
                        handler: () => {
                            //console.log('Confirm Okay');
                            this.onClickDeleteProduct(orderId, msgId, productId);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loader = yield this.loadingController.create({
                message: 'Please Wait...',
            });
            yield this.loader.present();
        });
    }
    presentToast(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                color: 'medium',
                message: msg,
                duration: 2000,
                showCloseButton: true,
                cssClass: 'toast',
                animated: true
            });
            toast.present();
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
    callAdmin() {
        /* this.storage.get('storeInfo').then((data) => {
           this.callNumber.callNumber(data.storePhone, true)
           .then(res => console.log('Launched dialer!', res))
           .catch(err => console.log('Error launching dialer', err));
         })*/
    }
    onClickTrackOrder(agentId, deliveryLatLng) {
        const navigationExtras = {
            state: {
                agentId: agentId,
                routeFromUserSide: true,
                deliveryLatLng: deliveryLatLng
            }
        };
        this.router.navigate(['location-map'], navigationExtras);
    }
    removeSubscriptions() {
        this.events.unsubscribe('chat:publishMsgs');
        this.events.unsubscribe('chat:publishMoreMsgs');
        this.events.unsubscribe('user:publishUserDetails');
        this.events.unsubscribe('media:chatImageSuccess');
        this.events.unsubscribe('media:showUnsavedImages');
        this.events.unsubscribe('user:cancelOrderSuccess');
        this.events.unsubscribe('user:deleteProductSuccesss');
        this.events.unsubscribe('chat:noMoreMsgs');
    }
};
ChatBotPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _services_user_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ActionSheetController"] },
    { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__["Camera"] },
    { type: _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_5__["ImagePicker"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
    { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_7__["ChatService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
    { type: _ionic_native_keyboard_ngx__WEBPACK_IMPORTED_MODULE_8__["Keyboard"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_9__["Storage"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
], ChatBotPage.prototype, "content", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonRouterOutlet"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonRouterOutlet"])
], ChatBotPage.prototype, "routerOutlet", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('myInput', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], ChatBotPage.prototype, "myInput", void 0);
ChatBotPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-chat-bot',
        template: __webpack_require__(/*! raw-loader!./chat-bot.page.html */ "./node_modules/raw-loader/index.js!./src/app/chat-bot/chat-bot.page.html"),
        styles: [__webpack_require__(/*! ./chat-bot.page.scss */ "./src/app/chat-bot/chat-bot.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], _services_user_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ActionSheetController"],
        _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__["Camera"], _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_5__["ImagePicker"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"], _services_chat_service__WEBPACK_IMPORTED_MODULE_7__["ChatService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"], _ionic_native_keyboard_ngx__WEBPACK_IMPORTED_MODULE_8__["Keyboard"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"], _ionic_storage__WEBPACK_IMPORTED_MODULE_9__["Storage"]])
], ChatBotPage);



/***/ })

}]);
//# sourceMappingURL=chat-bot-chat-bot-module-es2015.js.map