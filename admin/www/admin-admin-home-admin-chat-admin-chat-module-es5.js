(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-home-admin-chat-admin-chat-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-home/admin-chat/admin-chat.page.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-home/admin-chat/admin-chat.page.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = " <ion-header>\r\n   <ion-toolbar class=\"toolbar admin-chat-toolbar\" mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n     <ion-title *ngIf=\"userDetails\">\r\n      <div>\r\n        {{getNameWithPhoneNo()}}\r\n      </div>\r\n       <div class=\"user-last-seen\">\r\n        Last seen {{userDetails.lastAccessAt.toDate().toISOString() | dateAgo}}\r\n       </div>\r\n    </ion-title>\r\n   </ion-toolbar>\r\n\r\n </ion-header>\r\n <div class=\"bottom-border\" [hidden]=\"!showSearch\">\r\n   <ion-header no-border>\r\n     <ion-grid class=\"search-message margining\">\r\n       <div class=\"message-box\">\r\n         <ion-row class=\"ion-align-items-center\">\r\n           <div>\r\n             <i class=\"flaticon-null-22\"></i>\r\n           </div>\r\n           <div>\r\n             <ion-input type=\"text\" placeholder=\"Search message\" [(ngModel)]=\"searchMsg\"></ion-input>\r\n           </div>\r\n           <div class=\"close-btn\" (click)=\"hideSearchMessage()\">\r\n             <i class=\"flaticon-null-19\"></i>\r\n           </div>\r\n         </ion-row>\r\n       </div>\r\n     </ion-grid>\r\n   </ion-header>\r\n </div>\r\n\r\n <ion-content [scrollEvents]=\"enableScroll\" (ionScroll)=\"logScrolling($event)\">\r\n   <div class=\"main-container\" id='scrollDown'>\r\n   <div *ngIf=\"showLoader\" class=\"spinner\">\r\n     <ion-spinner color=\"primary\"></ion-spinner>\r\n   </div>\r\n   <div text-center>\r\n     <ion-spinner name=\"crescent\" *ngIf=\"chatLoader === true\"></ion-spinner>\r\n   </div>\r\n   <div text-center *ngIf=\"showNoMsgs\">\r\n     <p class=\"no-msgs\">No More Messages</p>\r\n   </div>\r\n   <br>\r\n   <br>\r\n   <ion-grid class=\"ion-no-padding\" *ngIf=\"userDetails && !showLoader\">\r\n\r\n     <div [id]=\"'chatMessage' + ind\" *ngFor=\"let msgs of allMsgs | filter: searchMsg; let ind = index\">\r\n       <br>\r\n       <!-- Admin message -->\r\n       <ion-row class=\"ion-justify-content-end\"\r\n         *ngIf=\"msgs.msgData && msgs.msgData.author == 'admin' && msgs.msgData.type == 'txt'\">\r\n\r\n         <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px'}\" class=\"message-admin\">\r\n           <span class=\"msg-content\" [innerHtml]=\"messageModifications(msgs.msgData.message)\"></span>\r\n           <h6 class=\"time\">\r\n            <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n            <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n            <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n            <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n         </div>\r\n\r\n         <div style=\"margin-right: 10px;\">\r\n           <ion-avatar class=\"avatar-img\">\r\n             <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n           </ion-avatar>\r\n         </div>\r\n       </ion-row>\r\n       <!-- /Admin message -->\r\n\r\n       <!-- Admin order -->\r\n       <ion-row class=\"ion-justify-content-end\"\r\n         *ngIf=\"msgs.msgData && msgs.msgData.author == 'admin' && msgs.msgData.type == 'order'\">\r\n\r\n         <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Rejected'\">\r\n          <span>Your order is rejected</span>\r\n          <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n          <div style=\"text-align: center;margin-top: -10px;\">\r\n            <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n              View Order\r\n            </ion-button>\r\n          </div>\r\n          <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n            <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n            <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n            <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n         </div>\r\n\r\n         <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Confirmed'\">\r\n          <span>Your order is confirmed. Please do the payment</span>\r\n          <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n          <div style=\"text-align: center;margin-top: -10px;\">\r\n            <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n              View Order\r\n            </ion-button>\r\n          </div>\r\n          <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n            <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n            <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n            <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n         </div>\r\n\r\n         <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='PaymentRequest'\">\r\n          <span>Please do the payment of your order</span>\r\n          <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n          <div style=\"text-align: center;margin-top: -10px;\">\r\n            <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n              View Order\r\n            </ion-button>\r\n          </div>\r\n          <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n            <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n            <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n            <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n         </div>\r\n\r\n         <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Cancelled'\">\r\n          <span>Your order is cancelled</span>\r\n          <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n          <div style=\"text-align: center;margin-top: -10px;\">\r\n            <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n              View Order\r\n            </ion-button>\r\n          </div>\r\n          <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n            <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n            <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n            <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n         </div>\r\n         <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Dispatched'\">\r\n          <span>Your order is dispatched</span>\r\n          <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n          <div style=\"text-align: center;margin-top: -10px;\">\r\n            <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n              View Order\r\n            </ion-button>\r\n          </div>\r\n          <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n            <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n            <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n            <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n         </div>\r\n         <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Delivered'\">\r\n          <span>Your order is delivered</span>\r\n          <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n          <div style=\"text-align: center;margin-top: -10px;\">\r\n            <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n              View Order\r\n            </ion-button>\r\n          </div>\r\n          <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n            <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n            <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n            <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n         </div>\r\n         <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Returned'\">\r\n          <span>Your order is returned</span>\r\n          <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n          <div style=\"text-align: center;margin-top: -10px;\">\r\n            <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n              View Order\r\n            </ion-button>\r\n          </div>\r\n          <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n            <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n            <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n            <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n         </div>\r\n\r\n         <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='deliveryStarted'\">\r\n          <span>Delivery has started for this order.</span>\r\n          <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n          <div style=\"margin-top: -10px;\">\r\n            <ion-grid class=\"ion-no-padding\">\r\n              <ion-row class=\"ion-no-padding\">\r\n                <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                  <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\" style=\"margin-left: -15px;\">\r\n                    View Order\r\n                  </ion-button>\r\n                </ion-col>\r\n                <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                  <ion-button (click)=\"onClickTrackOrder(msgs.msgData.agentId, msgs.msgData.deliveryLatLng)\" color=\"primary\" fill=\"clear\" style=\"margin-left: -15px;\">\r\n                    Track Order\r\n                  </ion-button>\r\n                </ion-col>\r\n              </ion-row>\r\n            </ion-grid>\r\n          </div>\r\n          <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n            <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n            <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n            <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n        </div>\r\n\r\n         <div style=\"margin-right: 10px;\">\r\n           <ion-avatar class=\"avatar-img\">\r\n             <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n           </ion-avatar>\r\n         </div>\r\n       </ion-row>\r\n       <!-- /Admin order -->\r\n\r\n       <!-- Admin Image -->\r\n       <div\r\n         *ngIf=\"msgs.msgData && msgs.msgData.author == 'admin' && msgs.msgData.type == 'image' && msgs.msgData.published === true\">\r\n         <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length === 1\">\r\n           <ion-row class=\"ion-justify-content-end\" *ngFor=\"let img of msgs.msgData.images\">\r\n             <div class=\"ion-no-padding\" style=\"margin-right: 5px;position: relative;\">\r\n               <ion-thumbnail>\r\n                 <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                 <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n               </ion-thumbnail>\r\n               <div class=\"img-publish\">\r\n                <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n    <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n    <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                </div>\r\n             </div>\r\n             <div style=\"margin-right: 10px;\">\r\n               <ion-avatar class=\"avatar-img\">\r\n                 <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n               </ion-avatar>\r\n             </div>\r\n           </ion-row>\r\n         </div>\r\n         <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 1 && msgs.msgData.images.length <= 4\">\r\n           <ion-row class=\"ion-justify-content-end\">\r\n             <div class=\"ion-no-padding\" style=\"margin-right: 5px;\">\r\n               <ion-grid class=\"ion-no-padding\">\r\n                 <ion-row class=\"img-grid\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                   <ion-col class=\"col-padding\" size=\"6\" *ngFor=\"let img of msgs.msgData.images; let imgIndex = index\">\r\n                     <div style=\"position: relative;\">\r\n                       <ion-thumbnail style=\"box-shadow: none;\">\r\n                         <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                         <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                       </ion-thumbnail>\r\n                       <div class=\"img-publish\">\r\n                        <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                        <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n            <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n            <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                        </div>\r\n                     </div>\r\n                   </ion-col>\r\n                 </ion-row>\r\n               </ion-grid>\r\n             </div>\r\n             <div style=\"margin-right: 10px;\">\r\n               <ion-avatar class=\"avatar-img\">\r\n                 <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n               </ion-avatar>\r\n             </div>\r\n           </ion-row>\r\n         </div>\r\n         <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 4\">\r\n           <ion-row class=\"ion-justify-content-end\">\r\n             <div class=\"ion-no-padding\" style=\"margin-right: 5px;\">\r\n               <ion-grid class=\"ion-no-padding\">\r\n                 <ion-row class=\"img-grid\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                   <ion-col class=\"col-padding\" size=\"6\"\r\n                     *ngFor=\"let img of [msgs.msgData.images[0], msgs.msgData.images[1], msgs.msgData.images[2],msgs.msgData.images[3]]; let imgIndex = index\">\r\n                     <div style=\"position: relative;\">\r\n                       <ion-thumbnail style=\"box-shadow: none;\"\r\n                         *ngIf=\"imgIndex === 0 || imgIndex === 1 || imgIndex === 2\">\r\n                         <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                         <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                       </ion-thumbnail>\r\n\r\n                       <ion-thumbnail style=\"background-color: #000;box-shadow: none;\" *ngIf=\"imgIndex === 3\"\r\n                         (click)=\"gridImageZoom(msgs.msgData.images)\">\r\n\r\n                         <img class=\"loading img-opacity\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                         <img class=\"loading img-opacity\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                         <div class=\"ion-no-padding\" class=\"img-count\">\r\n                           + {{msgs.msgData.images.length - 4}}\r\n                         </div>\r\n                       </ion-thumbnail>\r\n                       <div class=\"img-publish\">\r\n                        <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                        <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n            <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n            <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                        </div>\r\n                     </div>\r\n                   </ion-col>\r\n                 </ion-row>\r\n               </ion-grid>\r\n             </div>\r\n             <div style=\"margin-right: 10px;\">\r\n               <ion-avatar class=\"avatar-img\">\r\n                 <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                 \r\n               </ion-avatar>\r\n             </div>\r\n           </ion-row>\r\n         </div>\r\n       </div>\r\n\r\n\r\n       <div\r\n         *ngIf=\"msgs.msgData && msgs.msgData.author == 'admin' && msgs.msgData.type == 'image' && msgs.msgData.published === false\">\r\n         <div *ngIf=\"unsavedImages[msgs.id] && unsavedImages[msgs.id].length === 1\">\r\n           <ion-row class=\"ion-justify-content-end\" *ngFor=\"let img of unsavedImages[msgs.id]\">\r\n             <div class=\"ion-no-padding\" style=\"margin-right: 5px;position: relative;\">\r\n               <ion-thumbnail>\r\n                 <img class=\"loading\" *ngIf=\"img.url\" src=\"{{img.url}}\">\r\n               </ion-thumbnail>\r\n               <div class=\"img-publish\">\r\n                <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n    <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n    <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                </div>\r\n             </div>\r\n             <div style=\"margin-right: 10px;\">\r\n               <ion-avatar class=\"avatar-img\">\r\n                 <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                 \r\n               </ion-avatar>\r\n             </div>\r\n           </ion-row>\r\n         </div>\r\n         <div *ngIf=\"unsavedImages[msgs.id] && unsavedImages[msgs.id].length > 1 && unsavedImages[msgs.id].length <= 4\">\r\n           <ion-row class=\"ion-justify-content-end\">\r\n             <div class=\"ion-no-padding\" style=\"margin-right: 5px;\">\r\n               <ion-grid class=\"ion-no-padding\">\r\n                 <ion-row class=\"img-grid\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                   <ion-col class=\"col-padding\" size=\"6\"\r\n                     *ngFor=\"let img of unsavedImages[msgs.id]; let imgIndex = index\">\r\n                     <div style=\"position: relative;\">\r\n                       <ion-thumbnail style=\"box-shadow: none;\">\r\n                         <img class=\"loading\" *ngIf=\"img.url\" src=\"{{img.url}}\">\r\n                       </ion-thumbnail>\r\n                       <div class=\"img-publish\">\r\n                        <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                        <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n            <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n            <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                        </div>\r\n                     </div>\r\n                   </ion-col>\r\n                 </ion-row>\r\n               </ion-grid>\r\n             </div>\r\n             <div style=\"margin-right: 10px;\">\r\n               <ion-avatar class=\"avatar-img\">\r\n                 <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                \r\n               </ion-avatar>\r\n             </div>\r\n           </ion-row>\r\n         </div>\r\n         <div *ngIf=\"unsavedImages[msgs.id] && unsavedImages[msgs.id].length > 4\">\r\n           <ion-row class=\"ion-justify-content-end\">\r\n             <div class=\"ion-no-padding\" style=\"margin-right: 5px;\">\r\n               <ion-grid class=\"ion-no-padding\">\r\n                 <ion-row class=\"img-grid\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                   <ion-col class=\"col-padding\" size=\"6\"\r\n                     *ngFor=\"let img of [unsavedImages[msgs.id][0], unsavedImages[msgs.id][1], unsavedImages[msgs.id][2],unsavedImages[msgs.id][3]]; let imgIndex = index\">\r\n                     <div style=\"position: relative;\">\r\n                       <ion-thumbnail style=\"box-shadow: none;\"\r\n                         *ngIf=\"imgIndex === 0 || imgIndex === 1 || imgIndex === 2\">\r\n                         <img class=\"loading\" *ngIf=\"img.url\" src=\"{{img.url}}\">\r\n                       </ion-thumbnail>\r\n                       <ion-thumbnail style=\"background-color: #000;box-shadow: none;\" *ngIf=\"imgIndex === 3\">\r\n                         <img class=\"loading img-opacity\" *ngIf=\"img.url\" src=\"{{img.url}}\">\r\n                         <div class=\"ion-no-padding\" class=\"img-count\">\r\n                           + {{unsavedImages[msgs.id].length - 4}}\r\n                         </div>\r\n                       </ion-thumbnail>\r\n                       <div class=\"img-publish\">\r\n                        <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                        <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n            <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n            <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                        </div>\r\n                     </div>\r\n                   </ion-col>\r\n                 </ion-row>\r\n               </ion-grid>\r\n             </div>\r\n             <div style=\"margin-right: 10px;\">\r\n               <ion-avatar class=\"avatar-img\">\r\n                 <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                 \r\n               </ion-avatar>\r\n             </div>\r\n           </ion-row>\r\n         </div>\r\n       </div>\r\n       <!-- /Admin Image -->\r\n\r\n       <!-- Admin broadcast -->\r\n       <div *ngIf=\"msgs.msgData && msgs.msgData.author == 'admin' && msgs.msgData.type == 'broadcast'\">\r\n         <ion-row *ngIf=\"msgs.msgData.message\" class=\"ion-justify-content-end\">\r\n\r\n           <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px'}\" class=\"message-admin\">\r\n             <span [innerHtml]=\"messageModifications(msgs.msgData.message)\"></span>\r\n             <h6 class=\"time\">\r\n              <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n              <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n              <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n              <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n           </div>\r\n\r\n           <div style=\"margin-right: 10px;\">\r\n             <ion-avatar class=\"avatar-img\">\r\n               <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n               \r\n             </ion-avatar>\r\n           </div>\r\n         </ion-row>\r\n         <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length === 1\"\r\n           [ngClass]=\"{'img-broadcast b': msgs.msgData.message}\">\r\n           <ion-row class=\"ion-justify-content-end\" *ngFor=\"let img of msgs.msgData.images\">\r\n             <div class=\"ion-no-padding\" style=\"position: relative;\">\r\n               <ion-thumbnail [ngClass]=\"{'img-only-broadcast': !msgs.msgData.message}\">\r\n                 <img class=\"loading\" src=\"{{img.url}}\" (click)=\"imageZoom(img)\">\r\n               </ion-thumbnail>\r\n               <div class=\"img-publish\">\r\n                 <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i><i\r\n                   class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n               </div>\r\n             </div>\r\n             <div *ngIf=\"!msgs.msgData.message\" style=\"margin-right: 10px;\">\r\n               <ion-avatar class=\"avatar-img\">\r\n                 <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                 \r\n               </ion-avatar>\r\n             </div>\r\n           </ion-row>\r\n         </div>\r\n         <div class=\"wrapper-container\" *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 1 && msgs.msgData.images.length <= 4\">\r\n          \r\n             <div class=\"ion-no-padding\" [ngClass]=\"{'img-broadcast half': msgs.msgData.message, 'img-only-broadcast': !msgs.msgData.message}\">\r\n               <ion-grid class=\"ion-no-padding\">\r\n                 <ion-row class=\"img-grid\">\r\n                   <ion-col class=\"col-padding\" size=\"6\" *ngFor=\"let img of msgs.msgData.images; let imgIndex = index\">\r\n                     <div style=\"position: relative;\">\r\n                      \r\n                         <img class=\"loading\" src=\"{{img.url}}\" (click)=\"imageZoom(img)\">\r\n                       \r\n                       <div class=\"img-publish\">\r\n                         <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i><i\r\n                           class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                       </div>\r\n                     </div>\r\n                   </ion-col>\r\n                 </ion-row>\r\n               </ion-grid>\r\n             </div>\r\n             <div *ngIf=\"!msgs.msgData.message\" style=\"margin-right: 10px;\">\r\n               <ion-avatar class=\"avatar-img\">\r\n                 <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                 \r\n               </ion-avatar>\r\n             </div>\r\n          \r\n         </div>\r\n         <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 4\">\r\n           <ion-row class=\"ion-justify-content-end\">\r\n             <div class=\"ion-no-padding\"\r\n               [ngClass]=\"{'img-broadcast a': msgs.msgData.message, 'img-only-broadcast': !msgs.msgData.message}\">\r\n               <ion-grid class=\"ion-no-padding\">\r\n                 <ion-row class=\"img-grid\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                   <ion-col class=\"col-padding\" size=\"6\"\r\n                     *ngFor=\"let img of [msgs.msgData.images[0], msgs.msgData.images[1], msgs.msgData.images[2],msgs.msgData.images[3]]; let imgIndex = index\">\r\n                     <div style=\"position: relative;\">\r\n                       <ion-thumbnail style=\"box-shadow: none;\"\r\n                         *ngIf=\"imgIndex === 0 || imgIndex === 1 || imgIndex === 2\">\r\n                         <img class=\"loading\" src=\"{{img.url}}\" (click)=\"imageZoom(img)\">\r\n                       </ion-thumbnail>\r\n\r\n                       <ion-thumbnail style=\"background-color: #000;box-shadow: none;\" *ngIf=\"imgIndex === 3\"\r\n                         (click)=\"gridImageZoom(msgs.msgData.images)\">\r\n                         <img class=\"loading img-opacity\" src=\"{{img.url}}\">\r\n                         <div class=\"ion-no-padding\" class=\"img-count\">\r\n                           + {{msgs.msgData.images.length - 4}}\r\n                         </div>\r\n                       </ion-thumbnail>\r\n                       <div class=\"img-publish\">\r\n                         <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i><i\r\n                           class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                       </div>\r\n                     </div>\r\n                   </ion-col>\r\n                 </ion-row>\r\n               </ion-grid>\r\n             </div>\r\n             <div *ngIf=\"!msgs.msgData.message\" style=\"margin-right: 10px;\">\r\n               <ion-avatar class=\"avatar-img\">\r\n                 <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                \r\n               </ion-avatar>\r\n             </div>\r\n           </ion-row>\r\n         </div>\r\n       </div>\r\n       <!-- /Admin broadcast -->\r\n\r\n       <!-- User message -->\r\n       <ion-row class=\"ion-justify-content-start\"\r\n         *ngIf=\"msgs.msgData && msgs.msgData.author == 'user' && msgs.msgData.type == 'txt'\">\r\n         <div style=\"margin-left: 5px;\">\r\n           <ion-avatar class=\"avatar-img\">\r\n             <ion-img src=\"{{userDetails.dP}}\" alt=\"\"></ion-img>\r\n           </ion-avatar>\r\n         </div>\r\n\r\n         <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px'}\" class=\"message-user\">\r\n          <span [innerHtml]=\"messageModifications(msgs.msgData.message)\"></span>\r\n           <h6 class=\"time\">\r\n            <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n            </h6>\r\n         </div>\r\n       </ion-row>\r\n       <!-- /User message -->\r\n\r\n\r\n       <!-- User image -->\r\n       <div *ngIf=\"msgs.msgData && msgs.msgData.author == 'user' && msgs.msgData.type == 'image'\">\r\n         <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length === 1\">\r\n           <ion-row class=\"ion-justify-content-start\" *ngFor=\"let img of msgs.msgData.images\">\r\n             <div style=\"margin-left: 5px;\">\r\n               <ion-avatar class=\"avatar-img\">\r\n                 <ion-img src=\"{{userDetails.dP}}\" alt=\"\"></ion-img>\r\n                 \r\n               </ion-avatar>\r\n             </div>\r\n             <div class=\"ion-no-padding\" class=\"m-left\" style=\"position: relative;\">\r\n               <ion-thumbnail>\r\n                 <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                 <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n               </ion-thumbnail>\r\n               <div class=\"img-publish\">\r\n                <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                </div>\r\n             </div>\r\n           </ion-row>\r\n         </div>\r\n\r\n         <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 1 && msgs.msgData.images.length <= 4\">\r\n           <ion-row class=\"ion-justify-content-start\">\r\n             <div style=\"margin-left: 5px;\">\r\n               <ion-avatar class=\"avatar-img\">\r\n                 <ion-img src=\"{{userDetails.dP}}\" alt=\"\"></ion-img>\r\n                 \r\n               </ion-avatar>\r\n             </div>\r\n             <div class=\"ion-no-padding\" style=\"position: relative;\">\r\n               <ion-grid class=\"ion-no-padding\" style=\"padding-left: 0px;\">\r\n                 <ion-row class=\"img-grid-user\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                   <ion-col class=\"col-padding\" size=\"6\" *ngFor=\"let img of msgs.msgData.images; let imgIndex = index\">\r\n                     <div style=\"position: relative;\">\r\n                      <ion-thumbnail style=\"box-shadow: none;\">\r\n                        <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                        <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                      </ion-thumbnail>\r\n                      <div class=\"img-publish\">\r\n                        <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                        </div>\r\n                     </div>\r\n                   </ion-col>\r\n                 </ion-row>\r\n               </ion-grid>\r\n               <h6 class=\"time\" style=\"margin-left: 5px;\">\r\n                <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                </h6>\r\n             </div>\r\n           </ion-row>\r\n         </div>\r\n\r\n         <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 4\">\r\n           <ion-row class=\"ion-justify-content-start\">\r\n             <div style=\"margin-left: 5px;\">\r\n               <ion-avatar class=\"avatar-img\">\r\n                 <ion-img src=\"{{userDetails.dP}}\" alt=\"\"></ion-img>\r\n                 \r\n               </ion-avatar>\r\n             </div>\r\n             <div class=\"ion-no-padding\">\r\n               <ion-grid class=\"ion-no-padding\" style=\"padding-left: 0px;\">\r\n                 <ion-row class=\"img-grid-user\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                   <ion-col class=\"col-padding\" size=\"6\"\r\n                     *ngFor=\"let img of [msgs.msgData.images[0], msgs.msgData.images[1], msgs.msgData.images[2],msgs.msgData.images[3]]; let imgIndex = index\">\r\n                     <div style=\"position: relative;\">\r\n                      <ion-thumbnail style=\"box-shadow: none;\"\r\n                      *ngIf=\"imgIndex === 0 || imgIndex === 1 || imgIndex === 2\">\r\n                      <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                      <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                    </ion-thumbnail>\r\n                    <ion-thumbnail style=\"background-color: #000;box-shadow: none;\" *ngIf=\"imgIndex === 3\"\r\n                      (click)=\"gridImageZoom(msgs.msgData.images)\">\r\n                      <img class=\"loading img-opacity\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                      <img class=\"loading img-opacity\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                      <div class=\"ion-no-padding\" class=\"img-count\">\r\n                        + {{msgs.msgData.images.length - 4}}\r\n                      </div>\r\n                    </ion-thumbnail>\r\n                    <div class=\"img-publish\">\r\n                      <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                      </div>\r\n                     </div>\r\n                     \r\n                   </ion-col>\r\n                 </ion-row>\r\n               </ion-grid>\r\n               <h6 class=\"time\" style=\"margin-left: 5px;\">\r\n                <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                </h6>\r\n             </div>\r\n           </ion-row>\r\n         </div>\r\n       </div>\r\n       <!-- /User image -->\r\n\r\n       <!-- User order -->\r\n       <ion-row\r\n         *ngIf=\"msgs.msgData && msgs.msgData.author == 'user' && msgs.msgData.type == 'order'\">\r\n         <div style=\"margin-left: 5px;\">\r\n          <ion-avatar class=\"avatar-img\">\r\n            <ion-img src=\"{{userDetails.dP}}\" alt=\"\"></ion-img>\r\n            \r\n          </ion-avatar>\r\n        </div>\r\n\r\n        <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-user\" *ngIf=\"msgs.msgData.status=='Pending'\">\r\n          <span>New Order Placed</span>\r\n            <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n            <div style=\"text-align: center;margin-top: -10px;\">\r\n              <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n                View Order\r\n              </ion-button>\r\n            </div>\r\n            <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n              <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n              </h6>\r\n        </div>\r\n        <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-user\" *ngIf=\"msgs.msgData.status=='Cancelled'\">\r\n          <span>Order is Cancelled</span>\r\n            <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n            <div style=\"text-align: center;margin-top: -10px;\">\r\n              <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n                View Order\r\n              </ion-button>\r\n            </div>\r\n            <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n              <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n              </h6>\r\n        </div>\r\n        <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-user\" *ngIf=\"msgs.msgData.status=='PaymentMsg'\">\r\n          <span>Payment is successful</span>\r\n            <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n            <div style=\"text-align: center;margin-top: -10px;\">\r\n              <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" color=\"primary\" fill=\"clear\">\r\n                View Order\r\n              </ion-button>\r\n            </div>\r\n            <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n              <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n              </h6>\r\n        </div>\r\n       </ion-row>\r\n       <!-- /User order -->\r\n\r\n     </div>\r\n\r\n   </ion-grid>\r\n  </div>\r\n </ion-content>\r\n <ion-footer class=\"page-footer\" no-border *ngIf=\"showFooter\">\r\n <div class=\"main-container top-border\" style=\"position: relative;left: -8px;\">\r\n   <ion-grid class=\"ion-no-padding\">\r\n     <ion-row align-items-center class=\"ion-no-padding\">\r\n      <ion-col size=\"12\">\r\n        <div class=\"textarea-div ion-no-padding\" style=\"padding-left: 0;\">\r\n          <textarea class=\"textareaElement\" #myInput rows=\"1\" (keyup.enter)=\"sendMessage()\" [(ngModel)]=\"adminMsgText\"\r\n            placeholder=\"Type a message...\" (ngModelChange)=\"changeInMsgInput();\"></textarea>\r\n        </div>\r\n       </ion-col>\r\n       <ion-col size=\"12\" class=\"ion-no-padding ion-text-right btn-wrapper\">\r\n          <div class=\"upload-btn-wrapper\">\r\n            <button class=\"upload-btn btn-2 i-start\" (click)=\"presentActionSheet()\"> <i class=\"flaticon-menu\"></i>Options</button>\r\n          </div>\r\n          <div class=\"upload-btn-wrapper\">\r\n            <button class=\"upload-btn btn-2 i-start\"> <i class=\"flaticon-null-16\"></i>image </button>\r\n            <input type=\"file\" name=\"myfile\" (change)=\"uploadImage($event.target.files)\" />\r\n          </div>\r\n          <ion-button class=\"btn-2 i-start\" fill=\"clear\" (mousedown)=\"preventFocusChange($event)\" (click)=\"sendMessage()\">\r\n            <i class=\"flaticon-send\"></i> Send</ion-button>\r\n       </ion-col>\r\n      \r\n       \r\n     </ion-row>\r\n   </ion-grid>\r\n </div>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/admin/admin-home/admin-chat/admin-chat.module.ts":
/*!******************************************************************!*\
  !*** ./src/app/admin/admin-home/admin-chat/admin-chat.module.ts ***!
  \******************************************************************/
/*! exports provided: AdminChatPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminChatPageModule", function() { return AdminChatPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_chat_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-chat.page */ "./src/app/admin/admin-home/admin-chat/admin-chat.page.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var ngx_autosize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-autosize */ "./node_modules/ngx-autosize/fesm5/ngx-autosize.js");
/* harmony import */ var src_app_pipes_application_pipes_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/pipes/application-pipes.module */ "./src/app/pipes/application-pipes.module.ts");










var routes = [
    {
        path: '',
        component: _admin_chat_page__WEBPACK_IMPORTED_MODULE_6__["AdminChatPage"]
    }
];
var AdminChatPageModule = /** @class */ (function () {
    function AdminChatPageModule() {
    }
    AdminChatPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__["Ng2SearchPipeModule"],
                ngx_autosize__WEBPACK_IMPORTED_MODULE_8__["AutosizeModule"],
                src_app_pipes_application_pipes_module__WEBPACK_IMPORTED_MODULE_9__["ApplicationPipesModule"]
            ],
            declarations: [_admin_chat_page__WEBPACK_IMPORTED_MODULE_6__["AdminChatPage"]]
        })
    ], AdminChatPageModule);
    return AdminChatPageModule;
}());



/***/ }),

/***/ "./src/app/admin/admin-home/admin-chat/admin-chat.page.scss":
/*!******************************************************************!*\
  !*** ./src/app/admin/admin-home/admin-chat/admin-chat.page.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".admin-chat-toolbar ion-title {\n  margin-right: 0px;\n  margin-bottom: 0px;\n}\n\n.user-last-seen {\n  text-transform: lowercase;\n  opacity: 0.8;\n  font-size: 10px;\n  margin-top: 2px;\n}\n\n.img-publish {\n  background: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(transparent));\n  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent);\n  bottom: 0;\n  height: 28px;\n  position: absolute;\n  width: 140px;\n  z-index: 2;\n  color: white;\n  border-radius: 3px;\n}\n\n.flaticon-clock::before {\n  font-size: 10px;\n  color: black;\n  opacity: 0.5;\n  position: absolute;\n  right: 5px;\n  margin-top: 1px;\n  font-weight: 600;\n}\n\n.flaticon-check::before {\n  font-size: 10px;\n  color: #8db8f7;\n  position: absolute;\n  right: 2px;\n  margin-top: 1px;\n  font-weight: 600;\n}\n\n.flaticon-send::before {\n  color: var(--ion-color-primary);\n  font-size: 25px;\n  margin-left: -10px;\n}\n\n.clock-icon-image::before {\n  bottom: 5px;\n  color: white;\n  bottom: 5px;\n}\n\n.up-icon-btn {\n  --background: none;\n}\n\n.msg-content {\n  display: -webkit-inline-box;\n  display: inline-flex;\n}\n\n.search-message {\n  border: 1px solid #ccc;\n  border-radius: 25px;\n}\n\n.margining {\n  margin-top: 10px;\n  margin-right: 20px;\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n\n.message-admin {\n  padding: 13px;\n  color: var(--ion-color-dark);\n  border: 1px solid #c3dbff;\n  border-top-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n  border-bottom-left-radius: 10px;\n  text-align: right;\n  box-shadow: 0px 1px 2px #ccc;\n  white-space: pre-wrap;\n  font-size: 14px;\n  word-wrap: break-word;\n  position: relative;\n  -webkit-user-select: auto;\n     -moz-user-select: auto;\n      -ms-user-select: auto;\n          user-select: auto;\n}\n\n.message-user {\n  padding: 13px;\n  color: var(--ion-color-dark);\n  background-color: #F2F5FC;\n  border: 1px solid #c3dbff;\n  box-shadow: 0px 1px 2px #ccc;\n  border-top-right-radius: 10px;\n  border-bottom-right-radius: 10px;\n  border-bottom-left-radius: 10px;\n  text-align: justify;\n  font-size: 14px;\n  margin-left: -16px;\n  margin-right: 5px;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  position: relative;\n  -webkit-user-select: auto;\n     -moz-user-select: auto;\n      -ms-user-select: auto;\n          user-select: auto;\n}\n\n.avatar-img {\n  margin-top: 2px;\n  border: 1px solid #ddd;\n  padding: 2px;\n  box-shadow: 0px 3px 3px 0px #e8e8e8;\n  height: 40px;\n  width: 40px;\n}\n\n.time {\n  font-size: 10px;\n  color: black;\n  opacity: 0.5;\n  margin-top: 5px;\n  margin-bottom: 0px;\n}\n\n.img-publish span {\n  color: white;\n  position: absolute;\n  bottom: 5px;\n  font-size: 10px;\n  right: 15px;\n}\n\n.up-icon-active {\n  color: var(--ion-color-primary);\n  font-size: 30px;\n  margin-left: -20px;\n}\n\n.up-icon-disabled {\n  color: #ccc;\n  font-size: 30px;\n  margin-left: -20px;\n}\n\n.add-icon-disabled {\n  font-size: 25px;\n  color: #a39797;\n  position: relative;\n  left: -8px;\n}\n\n.add-icon-active {\n  font-size: 25px;\n  color: var(--ion-color-primary);\n  position: relative;\n  left: -8px;\n}\n\n.message-input {\n  border: 1px solid #ccc;\n  border-radius: 25px;\n  width: 100%;\n  background: #fff;\n  resize: none;\n  padding-left: 10px;\n  padding-right: 10px;\n  padding-top: 20px;\n  outline: none;\n}\n\n.textareaElement {\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  outline: none;\n  padding: 10px;\n  max-height: 100px;\n  width: 100%;\n  margin-top: 6px;\n  font-size: 13px;\n  margin-left: -5px;\n  -webkit-appearance: none;\n}\n\n.your-order {\n  text-align: right;\n  margin: 0px;\n}\n\n.product-info {\n  margin: 0px;\n  text-transform: uppercase;\n}\n\n.product-data {\n  margin: 0px;\n}\n\n.divider {\n  background: #C8D7E9;\n  height: 1px;\n}\n\nion-thumbnail {\n  --size: 140px;\n  border: 1px solid #c3dbff;\n  border-radius: 3px;\n  box-shadow: 0px 1px 2px #ccc;\n}\n\n.support-icon:before {\n  font-size: 30px;\n}\n\n.flaticon-null-22::before {\n  color: #ccc;\n  margin: 10px;\n}\n\n.flaticon-null-19::before {\n  font-size: 20px;\n}\n\n.close-btn {\n  position: absolute;\n  color: #ccc;\n  right: 2px;\n}\n\nion-input {\n  --padding-bottom: 3px;\n  --padding-top: 5px;\n  --padding-start: 10px;\n  --padding-end: 10px;\n}\n\n.ion-no-padding, [no-padding] {\n  --padding-start: 0px;\n  --padding-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  padding-left: 5px;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\n:host .item-interactive.ion-valid {\n  --highlight-background: none;\n}\n\n.bottom-border {\n  border-bottom: 1px solid #ccc;\n}\n\n.top-border {\n  border-top: 1px solid #ccc;\n  margin-bottom: constant(safe-area-inset-bottom);\n  /* iOS 11.0 */\n  margin-bottom: env(safe-area-inset-bottom);\n  /* iOS 11.2 */\n}\n\n.message-box {\n  position: relative;\n}\n\n.no-msgs {\n  color: #ccc;\n  font-size: 13px;\n}\n\nion-spinner {\n  width: 20px !important;\n  height: 20px !important;\n}\n\n.loading {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n}\n\n.spinner {\n  margin-top: 50%;\n  text-align: center;\n}\n\n.img-broadcast {\n  margin-top: 5px;\n  margin-right: 55px;\n  margin-bottom: 5px;\n}\n\n.img-order {\n  margin-left: 55px;\n  margin-top: 5px;\n}\n\n.m-left {\n  margin-left: 5px;\n}\n\n.img-admin {\n  margin-right: 55px;\n  margin-top: 5px;\n}\n\n.img-grid {\n  border: 1px solid #c3dbff;\n  border-top-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n  border-bottom-left-radius: 10px;\n  box-shadow: 0px 1px 2px 0px #ccc;\n}\n\n.img-grid-user {\n  border: 1px solid #c3dbff;\n  background-color: #F2F5FC;\n  border-top-right-radius: 10px;\n  border-bottom-right-radius: 10px;\n  border-bottom-left-radius: 10px;\n  box-shadow: 0px 1px 2px 0px #ccc;\n}\n\n.img-opacity {\n  opacity: 0.5;\n}\n\n.img-count {\n  position: relative;\n  text-align: center;\n  bottom: 90px;\n  font-size: 30px;\n  color: white;\n}\n\n.flaticon-null-23::before {\n  font-weight: 600;\n}\n\n.textarea-div {\n  /*width: 82%;*/\n}\n\n.img-only-broadcast {\n  margin-right: 5px;\n}\n\nion-thumbnail.product-img {\n  --size: 130px;\n}\n\n.order-rows {\n  border-bottom: 1px solid #c3dbff;\n  padding: 5px;\n}\n\n.p-delete {\n  text-decoration: underline;\n}\n\n@media screen and (max-width: 375px) {\n  ion-thumbnail {\n    --size: 122px;\n  }\n\n  .img-count {\n    bottom: 80px;\n  }\n\n  .message-user {\n    margin-left: -10px;\n  }\n\n  .img-publish {\n    width: 122px;\n  }\n}\n\n@media screen and (max-width: 360px) {\n  ion-thumbnail {\n    --size: 115px;\n  }\n\n  .img-count {\n    bottom: 75px;\n  }\n\n  .message-user {\n    margin-left: -10px;\n  }\n\n  .img-publish {\n    width: 115px;\n  }\n\n  /* .flaticon-send::before{\n       font-size: 22px;\n       margin-left: -13px;\n   }*/\n}\n\n@media screen and (max-width: 320px) {\n  ion-thumbnail {\n    --size: 95px;\n  }\n\n  .img-count {\n    bottom: 66px;\n    font-size: 25px;\n  }\n\n  .img-publish {\n    width: 95px;\n  }\n\n  .flaticon-send::before {\n    font-size: 20px;\n    margin-left: -13px;\n  }\n\n  ion-thumbnail.product-img {\n    --size: 110px;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .message-user {\n    margin-left: -50px;\n  }\n\n  .m-left {\n    margin-left: 5px;\n  }\n\n  ion-thumbnail {\n    --size: 222px;\n  }\n\n  .img-count {\n    bottom: 136px;\n    font-size: 40px;\n  }\n\n  .col-padding {\n    padding: 8px;\n  }\n\n  .textareaElement {\n    font-size: 16px;\n  }\n\n  .img-publish {\n    width: 222px;\n  }\n\n  ion-thumbnail.product-img {\n    --size: 200px;\n  }\n}\n\n@media screen and (min-width: 700px) {\n  .col-padding {\n    padding: 12px;\n  }\n\n  ion-thumbnail {\n    --size: 273px;\n  }\n\n  .img-publish {\n    width: 273px;\n  }\n\n  .img-count {\n    bottom: 165px;\n    font-size: 40px;\n  }\n\n  .message-admin {\n    font-size: 20px;\n  }\n\n  .message-user {\n    font-size: 20px;\n    margin-left: -55px;\n  }\n\n  .avatar-img {\n    height: 60px;\n    width: 60px;\n  }\n\n  .img-broadcast {\n    margin-right: 75px;\n  }\n\n  .img-order {\n    margin-left: 75px;\n  }\n\n  .m-left {\n    margin-left: 5px;\n  }\n\n  .img-admin {\n    margin-right: 75px;\n  }\n\n  .up-icon-active {\n    font-size: 40px;\n    margin-left: -5px;\n  }\n\n  .up-icon-disabled {\n    font-size: 40px;\n    margin-left: -5px;\n  }\n\n  .add-icon-disabled {\n    font-size: 40px;\n    right: -10px;\n  }\n\n  .add-icon-active {\n    font-size: 40px;\n    right: -10px;\n  }\n\n  .textareaElement {\n    font-size: 20px;\n  }\n\n  .flaticon-send::before {\n    font-size: 40px;\n  }\n\n  ion-thumbnail.product-img {\n    --size: 235px;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  ion-thumbnail {\n    --size: 370px;\n  }\n\n  .img-publish {\n    width: 370px;\n  }\n\n  .img-count {\n    bottom: 220px;\n    font-size: 50px;\n  }\n\n  p {\n    font-size: 25px;\n  }\n\n  .message-admin {\n    font-size: 25px;\n  }\n\n  .message-user {\n    margin-left: -85px;\n    font-size: 25px;\n  }\n\n  .avatar-img {\n    height: 70px;\n    width: 70px;\n  }\n\n  .img-broadcast {\n    margin-right: 85px;\n  }\n\n  .img-order {\n    margin-left: 85px;\n  }\n\n  .img-admin {\n    margin-right: 85px;\n  }\n\n  .up-icon-active {\n    font-size: 50px;\n    margin-left: -5px;\n  }\n\n  .up-icon-disabled {\n    font-size: 50px;\n    margin-left: -5px;\n  }\n\n  .add-icon-disabled {\n    font-size: 50px;\n    right: -10px;\n  }\n\n  .add-icon-active {\n    font-size: 50px;\n    right: -10px;\n  }\n\n  .textareaElement {\n    font-size: 25px;\n  }\n\n  .flaticon-send::before {\n    font-size: 45px;\n  }\n\n  ion-thumbnail.product-img {\n    --size: 300px;\n  }\n}\n\n.wrapper-container {\n  float: none;\n  clear: both;\n  overflow: hidden;\n}\n\n.img-broadcast.half {\n  width: 50%;\n  float: right;\n}\n\n.img-publish {\n  width: 100% !important;\n}\n\n.fixed-height {\n  max-height: calc(100vh - 315px);\n  overflow-y: scroll;\n  padding: 16px;\n}\n\n.btn-wrapper {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4taG9tZS9hZG1pbi1jaGF0L0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcYWRtaW4taG9tZVxcYWRtaW4tY2hhdFxcYWRtaW4tY2hhdC5wYWdlLnNjc3MiLCJzcmMvYXBwL2FkbWluL2FkbWluLWhvbWUvYWRtaW4tY2hhdC9hZG1pbi1jaGF0LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFBO0VBQ0Esa0JBQUE7QUNDSjs7QURFQTtFQUNJLHlCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0FDQ0o7O0FEQ0E7RUFDSSxzR0FBQTtFQUFBLGtFQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FDRUo7O0FEQUE7RUFDSSxlQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUNHSjs7QURBQTtFQUNJLGVBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FDR0o7O0FEREE7RUFDSSwrQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQ0lKOztBREZBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FDS0o7O0FESEE7RUFDSSxrQkFBQTtBQ01KOztBREpBO0VBQ0ksMkJBQUE7RUFBQSxvQkFBQTtBQ09KOztBRExBO0VBQ0ksc0JBQUE7RUFDQSxtQkFBQTtBQ1FKOztBRE5BO0VBQ0ksZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUNTSjs7QURQQTtFQUNJLGFBQUE7RUFDQSw0QkFBQTtFQUNBLHlCQUFBO0VBQ0EsNEJBQUE7RUFDQSxnQ0FBQTtFQUNBLCtCQUFBO0VBQ0EsaUJBQUE7RUFDQSw0QkFBQTtFQUNBLHFCQUFBO0VBQ0EsZUFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtLQUFBLHNCQUFBO01BQUEscUJBQUE7VUFBQSxpQkFBQTtBQ1VKOztBRFBBO0VBQ0ksYUFBQTtFQUNBLDRCQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtFQUNBLDRCQUFBO0VBQ0EsNkJBQUE7RUFDQSxnQ0FBQTtFQUNBLCtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLHFCQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0tBQUEsc0JBQUE7TUFBQSxxQkFBQTtVQUFBLGlCQUFBO0FDVUo7O0FEUEE7RUFDSSxlQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0VBQ0EsbUNBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQ1VKOztBRFJBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FDV0o7O0FEVEE7RUFDSSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7QUNZSjs7QURWQTtFQUNJLCtCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FDYUo7O0FEWEE7RUFDSSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FDY0o7O0FEWkE7RUFDSSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtBQ2VKOztBRGJBO0VBQ0ksZUFBQTtFQUNBLCtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0FDZ0JKOztBRGRBO0VBQ0ksc0JBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0FDaUJKOztBRGZBO0VBRUksc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSx3QkFBQTtBQ2lCSjs7QURmQTtFQUNJLGlCQUFBO0VBQ0EsV0FBQTtBQ2tCSjs7QURoQkE7RUFDSSxXQUFBO0VBQ0EseUJBQUE7QUNtQko7O0FEakJBO0VBQ0ksV0FBQTtBQ29CSjs7QURsQkE7RUFDSSxtQkFBQTtFQUNBLFdBQUE7QUNxQko7O0FEbkJBO0VBQ0ksYUFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSw0QkFBQTtBQ3NCSjs7QURwQkE7RUFDSSxlQUFBO0FDdUJKOztBRHJCQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FDd0JKOztBRHRCQTtFQUNJLGVBQUE7QUN5Qko7O0FEdkJBO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtBQzBCSjs7QUR4QkU7RUFDRSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtBQzJCSjs7QUR6QkU7RUFDRSxvQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7QUM0Qko7O0FEekJJO0VBQ0UsNEJBQUE7QUM0Qk47O0FEekJFO0VBQ0ksNkJBQUE7QUM0Qk47O0FEMUJFO0VBQ0ksMEJBQUE7RUFDQSwrQ0FBQTtFQUFpRCxhQUFBO0VBQ2pELDBDQUFBO0VBQTRDLGFBQUE7QUMrQmxEOztBRDdCRTtFQUNJLGtCQUFBO0FDZ0NOOztBRDlCRTtFQUNFLFdBQUE7RUFDQSxlQUFBO0FDaUNKOztBRC9CRTtFQUNFLHNCQUFBO0VBQ0EsdUJBQUE7QUNrQ0o7O0FEaENBO0VBQ0ksc0dBQUE7QUNtQ0o7O0FEakNFO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0FDb0NKOztBRGxDRTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0FDcUNKOztBRG5DRTtFQUNFLGlCQUFBO0VBQ0EsZUFBQTtBQ3NDSjs7QURwQ0U7RUFDRSxnQkFBQTtBQ3VDSjs7QURyQ0U7RUFDRSxrQkFBQTtFQUNBLGVBQUE7QUN3Q0o7O0FEdENFO0VBQ0UseUJBQUE7RUFDQSw0QkFBQTtFQUNBLGdDQUFBO0VBQ0EsK0JBQUE7RUFDQSxnQ0FBQTtBQ3lDSjs7QUR2Q0U7RUFDRSx5QkFBQTtFQUNBLHlCQUFBO0VBQ0EsNkJBQUE7RUFDQSxnQ0FBQTtFQUNBLCtCQUFBO0VBQ0EsZ0NBQUE7QUMwQ0o7O0FEeENFO0VBQ0ksWUFBQTtBQzJDTjs7QUR6Q0U7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0FDNENKOztBRDFDRTtFQUNFLGdCQUFBO0FDNkNKOztBRDNDRTtFQUNFLGNBQUE7QUM4Q0o7O0FENUNBO0VBQ0ksaUJBQUE7QUMrQ0o7O0FEN0NBO0VBQ0ksYUFBQTtBQ2dESjs7QUQ5Q0E7RUFDRSxnQ0FBQTtFQUNBLFlBQUE7QUNpREY7O0FEdENBO0VBQ0UsMEJBQUE7QUN5Q0Y7O0FEcENBO0VBQ0k7SUFDSSxhQUFBO0VDdUNOOztFRHJDRTtJQUNJLFlBQUE7RUN3Q047O0VEdENFO0lBQ0ksa0JBQUE7RUN5Q047O0VEdkNFO0lBQ0ksWUFBQTtFQzBDTjtBQUNGOztBRHhDQTtFQUNJO0lBQ0ksYUFBQTtFQzBDTjs7RUR4Q0U7SUFDSSxZQUFBO0VDMkNOOztFRHpDRTtJQUNJLGtCQUFBO0VDNENOOztFRDFDRTtJQUNJLFlBQUE7RUM2Q047O0VEM0NDOzs7S0FBQTtBQ2lESDs7QUQ1Q0E7RUFDSTtJQUNJLFlBQUE7RUM4Q047O0VENUNFO0lBQ0ksWUFBQTtJQUNBLGVBQUE7RUMrQ047O0VEN0NFO0lBQ0ksV0FBQTtFQ2dETjs7RUQ5Q0U7SUFDSSxlQUFBO0lBQ0Esa0JBQUE7RUNpRE47O0VEL0NFO0lBQ0ksYUFBQTtFQ2tETjtBQUNGOztBRGhEQTtFQUNJO0lBQ0ksa0JBQUE7RUNrRE47O0VEaERFO0lBQ0ksZ0JBQUE7RUNtRE47O0VEakRFO0lBQ0ksYUFBQTtFQ29ETjs7RURsREU7SUFDSSxhQUFBO0lBQ0EsZUFBQTtFQ3FETjs7RURuREU7SUFDSSxZQUFBO0VDc0ROOztFRHBERTtJQUNJLGVBQUE7RUN1RE47O0VEckRFO0lBQ0ksWUFBQTtFQ3dETjs7RUR0REU7SUFDSSxhQUFBO0VDeUROO0FBQ0Y7O0FEdkRBO0VBQ0k7SUFDSSxhQUFBO0VDeUROOztFRHZERTtJQUNJLGFBQUE7RUMwRE47O0VEeERFO0lBQ0ksWUFBQTtFQzJETjs7RUR6REU7SUFDSSxhQUFBO0lBQ0EsZUFBQTtFQzRETjs7RUQxREU7SUFDSSxlQUFBO0VDNkROOztFRDNERTtJQUNJLGVBQUE7SUFDQSxrQkFBQTtFQzhETjs7RUQ1REU7SUFDSSxZQUFBO0lBQ0EsV0FBQTtFQytETjs7RUQ3REU7SUFDSSxrQkFBQTtFQ2dFTjs7RUQ5REU7SUFDSSxpQkFBQTtFQ2lFTjs7RUQvREU7SUFDSSxnQkFBQTtFQ2tFTjs7RURoRUU7SUFDSSxrQkFBQTtFQ21FTjs7RURqRUU7SUFDSSxlQUFBO0lBQ0EsaUJBQUE7RUNvRU47O0VEbEVFO0lBQ0ksZUFBQTtJQUNBLGlCQUFBO0VDcUVOOztFRG5FRTtJQUNJLGVBQUE7SUFDQSxZQUFBO0VDc0VOOztFRHBFRTtJQUNJLGVBQUE7SUFDQSxZQUFBO0VDdUVOOztFRHJFRTtJQUNJLGVBQUE7RUN3RU47O0VEdEVFO0lBQ0ksZUFBQTtFQ3lFTjs7RUR2RUU7SUFDSSxhQUFBO0VDMEVOO0FBQ0Y7O0FEeEVBO0VBQ0k7SUFDSSxhQUFBO0VDMEVOOztFRHhFRTtJQUNJLFlBQUE7RUMyRU47O0VEekVFO0lBQ0ksYUFBQTtJQUNBLGVBQUE7RUM0RU47O0VEMUVFO0lBQ0ksZUFBQTtFQzZFTjs7RUQzRUU7SUFDSSxlQUFBO0VDOEVOOztFRDVFRTtJQUNJLGtCQUFBO0lBQ0EsZUFBQTtFQytFTjs7RUQ3RUU7SUFDSSxZQUFBO0lBQ0EsV0FBQTtFQ2dGTjs7RUQ5RUU7SUFDSSxrQkFBQTtFQ2lGTjs7RUQvRUU7SUFDSSxpQkFBQTtFQ2tGTjs7RURoRkU7SUFDSSxrQkFBQTtFQ21GTjs7RURqRkU7SUFDSSxlQUFBO0lBQ0EsaUJBQUE7RUNvRk47O0VEbEZFO0lBQ0ksZUFBQTtJQUNBLGlCQUFBO0VDcUZOOztFRG5GRTtJQUNJLGVBQUE7SUFDQSxZQUFBO0VDc0ZOOztFRHBGRTtJQUNJLGVBQUE7SUFDQSxZQUFBO0VDdUZOOztFRHJGRTtJQUNJLGVBQUE7RUN3Rk47O0VEdEZFO0lBQ0ksZUFBQTtFQ3lGTjs7RUR2RkU7SUFDSSxhQUFBO0VDMEZOO0FBQ0Y7O0FEdkZBO0VBQ0ksV0FBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtBQ3lGSjs7QUR0RkE7RUFBb0IsVUFBQTtFQUFXLFlBQUE7QUMyRi9COztBRDFGQTtFQUFhLHNCQUFBO0FDOEZiOztBRDFGQTtFQUNJLCtCQUFBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0FDNkZOOztBRDFGRTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxxQkFBQTtVQUFBLHlCQUFBO0FDNkZOIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vYWRtaW4taG9tZS9hZG1pbi1jaGF0L2FkbWluLWNoYXQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFkbWluLWNoYXQtdG9vbGJhciBpb24tdGl0bGUge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwcHg7XHJcbn1cclxuXHJcbi51c2VyLWxhc3Qtc2VlbiB7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogbG93ZXJjYXNlO1xyXG4gICAgb3BhY2l0eTogLjg7XHJcbiAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICBtYXJnaW4tdG9wOiAycHg7XHJcbn1cclxuLmltZy1wdWJsaXNoe1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDBkZWcscmdiYSgwLDAsMCwuNSksdHJhbnNwYXJlbnQpO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgaGVpZ2h0OiAyOHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgd2lkdGg6IDE0MHB4O1xyXG4gICAgei1pbmRleDogMjtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxufVxyXG4uZmxhdGljb24tY2xvY2s6OmJlZm9yZXtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICAgIG9wYWNpdHk6IDAuNTtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHJpZ2h0OiA1cHg7XHJcbiAgICBtYXJnaW4tdG9wOiAxcHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG5cclxufVxyXG4uZmxhdGljb24tY2hlY2s6OmJlZm9yZXtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIGNvbG9yOiAjOGRiOGY3O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgcmlnaHQ6IDJweDtcclxuICAgIG1hcmdpbi10b3A6IDFweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuLmZsYXRpY29uLXNlbmQ6OmJlZm9yZSB7XHJcbiAgICBjb2xvcjp2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogLTEwcHg7XHJcbn1cclxuLmNsb2NrLWljb24taW1hZ2U6OmJlZm9yZXtcclxuICAgIGJvdHRvbTogNXB4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYm90dG9tOiA1cHg7XHJcbn1cclxuLnVwLWljb24tYnRue1xyXG4gICAgLS1iYWNrZ3JvdW5kOiBub25lO1xyXG59XHJcbi5tc2ctY29udGVudHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG59XHJcbi5zZWFyY2gtbWVzc2FnZXtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xyXG59XHJcbi5tYXJnaW5pbmd7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcbi5tZXNzYWdlLWFkbWlue1xyXG4gICAgcGFkZGluZzogMTNweDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYzNkYmZmO1xyXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTBweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDtcclxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDFweCAycHggI2NjYztcclxuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHVzZXItc2VsZWN0OiBhdXRvO1xyXG5cclxufVxyXG4ubWVzc2FnZS11c2Vye1xyXG4gICAgcGFkZGluZzogMTNweDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjJGNUZDO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2MzZGJmZjtcclxuICAgIGJveC1zaGFkb3c6IDBweCAxcHggMnB4ICNjY2M7XHJcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTBweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogLTE2cHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDVweDtcclxuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcclxuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHVzZXItc2VsZWN0OiBhdXRvO1xyXG5cclxufVxyXG4uYXZhdGFyLWltZ3tcclxuICAgIG1hcmdpbi10b3A6IDJweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgICBwYWRkaW5nOiAycHg7XHJcbiAgICBib3gtc2hhZG93OiAwcHggM3B4IDNweCAwcHggI2U4ZThlODtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIHdpZHRoOiA0MHB4O1xyXG59XHJcbi50aW1le1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgb3BhY2l0eTogLjU7XHJcbiAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwcHg7XHJcbn1cclxuLmltZy1wdWJsaXNoIHNwYW57XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBib3R0b206IDVweDtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG59XHJcbi51cC1pY29uLWFjdGl2ZXtcclxuICAgIGNvbG9yOnZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcclxuICAgIGZvbnQtc2l6ZTogMzBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAtMjBweDtcclxufVxyXG4udXAtaWNvbi1kaXNhYmxlZHtcclxuICAgIGNvbG9yOiAjY2NjO1xyXG4gICAgZm9udC1zaXplOiAzMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IC0yMHB4O1xyXG59XHJcbi5hZGQtaWNvbi1kaXNhYmxlZCB7XHJcbiAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICBjb2xvcjogcmdiKDE2MywgMTUxLCAxNTEpO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgbGVmdDogLThweDtcclxufVxyXG4uYWRkLWljb24tYWN0aXZlIHtcclxuICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBsZWZ0OiAtOHB4O1xyXG59XHJcbi5tZXNzYWdlLWlucHV0e1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICByZXNpemU6IG5vbmU7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xyXG4gICAgcGFkZGluZy10b3A6IDIwcHg7XHJcbiAgICBvdXRsaW5lOiBub25lO1xyXG59XHJcbi50ZXh0YXJlYUVsZW1lbnQge1xyXG4gICAgLy8gbWluLWhlaWdodDogMjBweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBtYXgtaGVpZ2h0OiAxMDBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWFyZ2luLXRvcDogNnB4O1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IC01cHg7XHJcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgfVxyXG4ueW91ci1vcmRlciB7XHJcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgIG1hcmdpbjogMHB4O1xyXG59XHJcbi5wcm9kdWN0LWluZm8ge1xyXG4gICAgbWFyZ2luOiAwcHg7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG59XHJcbi5wcm9kdWN0LWRhdGF7XHJcbiAgICBtYXJnaW46IDBweDtcclxufVxyXG4uZGl2aWRlcntcclxuICAgIGJhY2tncm91bmQ6ICNDOEQ3RTk7XHJcbiAgICBoZWlnaHQ6IDFweDtcclxufVxyXG5pb24tdGh1bWJuYWlsIHtcclxuICAgIC0tc2l6ZTogMTQwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYzNkYmZmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDFweCAycHggI2NjYztcclxufVxyXG4uc3VwcG9ydC1pY29uOmJlZm9yZXtcclxuICAgIGZvbnQtc2l6ZTogMzBweDtcclxufVxyXG4uZmxhdGljb24tbnVsbC0yMjo6YmVmb3Jle1xyXG4gICAgY29sb3I6ICNjY2M7XHJcbiAgICBtYXJnaW46IDEwcHg7XHJcbiAgfVxyXG4uZmxhdGljb24tbnVsbC0xOTo6YmVmb3Jle1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG59XHJcbi5jbG9zZS1idG57XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7IFxyXG4gICAgY29sb3I6ICNjY2M7XHJcbiAgICByaWdodDogMnB4O1xyXG59XHJcbiAgaW9uLWlucHV0e1xyXG4gICAgLS1wYWRkaW5nLWJvdHRvbTogM3B4O1xyXG4gICAgLS1wYWRkaW5nLXRvcDogNXB4O1xyXG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAxMHB4O1xyXG4gICAgLS1wYWRkaW5nLWVuZDogMTBweDtcclxuICB9XHJcbiAgLmlvbi1uby1wYWRkaW5nLCBbbm8tcGFkZGluZ10ge1xyXG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAwcHg7XHJcbiAgICAtLXBhZGRpbmctZW5kOiAwO1xyXG4gICAgLS1wYWRkaW5nLXRvcDogMDtcclxuICAgIC0tcGFkZGluZy1ib3R0b206IDA7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDVweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDA7XHJcbiAgICBwYWRkaW5nLXRvcDogMDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAwO1xyXG59XHJcbiAgOmhvc3Qge1xyXG4gICAgLml0ZW0taW50ZXJhY3RpdmUuaW9uLXZhbGlke1xyXG4gICAgICAtLWhpZ2hsaWdodC1iYWNrZ3JvdW5kOiBub25lO1xyXG4gICAgfVxyXG4gIH1cclxuICAuYm90dG9tLWJvcmRlcntcclxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XHJcbiAgfVxyXG4gIC50b3AtYm9yZGVye1xyXG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2NjYztcclxuICAgICAgbWFyZ2luLWJvdHRvbTogY29uc3RhbnQoc2FmZS1hcmVhLWluc2V0LWJvdHRvbSk7IC8qIGlPUyAxMS4wICovXHJcbiAgICAgIG1hcmdpbi1ib3R0b206IGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tKTsgLyogaU9TIDExLjIgKi9cclxuICB9XHJcbiAgLm1lc3NhZ2UtYm94e1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgfVxyXG4gIC5uby1tc2dze1xyXG4gICAgY29sb3I6ICNjY2M7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgfVxyXG4gIGlvbi1zcGlubmVyIHtcclxuICAgIHdpZHRoOiAyMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBoZWlnaHQ6IDIwcHggIWltcG9ydGFudDtcclxufVxyXG4ubG9hZGluZyB7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoJ2h0dHBzOi8vczUuZ2lmeXUuY29tL2ltYWdlcy9sb2FkZXJiYjE5ZWZjYzI3NDllMTE1LmdpZicpIGNlbnRlciBuby1yZXBlYXQ7XHJcbiAgfVxyXG4gIC5zcGlubmVye1xyXG4gICAgbWFyZ2luLXRvcDogNTAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH0gIFxyXG4gIC5pbWctYnJvYWRjYXN0e1xyXG4gICAgbWFyZ2luLXRvcDogNXB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1NXB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG4gIH1cclxuICAuaW1nLW9yZGVye1xyXG4gICAgbWFyZ2luLWxlZnQ6IDU1cHg7IFxyXG4gICAgbWFyZ2luLXRvcDogNXB4O1xyXG4gIH1cclxuICAubS1sZWZ0e1xyXG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICB9XHJcbiAgLmltZy1hZG1pbntcclxuICAgIG1hcmdpbi1yaWdodDogNTVweDtcclxuICAgIG1hcmdpbi10b3A6IDVweDtcclxuICB9XHJcbiAgLmltZy1ncmlke1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2MzZGJmZjtcclxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDEwcHg7XHJcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTBweDtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwcHg7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAwcHggI2NjYztcclxuICB9XHJcbiAgLmltZy1ncmlkLXVzZXJ7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYzNkYmZmO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0YyRjVGQztcclxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHg7XHJcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMHB4O1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDFweCAycHggMHB4ICNjY2M7XHJcbiAgfVxyXG4gIC5pbWctb3BhY2l0eXtcclxuICAgICAgb3BhY2l0eTogMC41O1xyXG4gIH1cclxuICAuaW1nLWNvdW50e1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYm90dG9tOiA5MHB4O1xyXG4gICAgZm9udC1zaXplOiAzMHB4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gIH1cclxuICAuZmxhdGljb24tbnVsbC0yMzo6YmVmb3Jle1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICB9XHJcbiAgLnRleHRhcmVhLWRpdntcclxuICAgIC8qd2lkdGg6IDgyJTsqL1xyXG59XHJcbi5pbWctb25seS1icm9hZGNhc3R7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDVweDtcclxufVxyXG5pb24tdGh1bWJuYWlsLnByb2R1Y3QtaW1nIHtcclxuICAgIC0tc2l6ZTogMTMwcHg7XHJcbiAgfSBcclxuLm9yZGVyLXJvd3N7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjM2RiZmY7XHJcbiAgcGFkZGluZzogNXB4O1xyXG59XHJcbi5wLW5hbWV7XHJcblxyXG59XHJcbi5wLXF1YW50aXR5e1xyXG5cclxufVxyXG4ucC1wcmljZXtcclxuXHJcbn1cclxuLnAtZGVsZXRle1xyXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG59XHJcbiAgXHJcbi8vbWVkaWEgcXVlcmllc1xyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQobWF4LXdpZHRoOiAzNzVweCl7XHJcbiAgICBpb24tdGh1bWJuYWlsIHtcclxuICAgICAgICAtLXNpemU6IDEyMnB4O1xyXG4gICAgfVxyXG4gICAgLmltZy1jb3VudHtcclxuICAgICAgICBib3R0b206IDgwcHg7XHJcbiAgICB9XHJcbiAgICAubWVzc2FnZS11c2Vye1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtMTBweDtcclxuICAgIH1cclxuICAgIC5pbWctcHVibGlzaHtcclxuICAgICAgICB3aWR0aDogMTIycHg7XHJcbiAgICB9XHJcbn1cclxuQG1lZGlhIHNjcmVlbiBhbmQobWF4LXdpZHRoOiAzNjBweCl7XHJcbiAgICBpb24tdGh1bWJuYWlsIHtcclxuICAgICAgICAtLXNpemU6IDExNXB4O1xyXG4gICAgfVxyXG4gICAgLmltZy1jb3VudHtcclxuICAgICAgICBib3R0b206IDc1cHg7XHJcbiAgICB9XHJcbiAgICAubWVzc2FnZS11c2Vye1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtMTBweDtcclxuICAgIH1cclxuICAgIC5pbWctcHVibGlzaHtcclxuICAgICAgICB3aWR0aDogMTE1cHg7XHJcbiAgICB9XHJcbiAgIC8qIC5mbGF0aWNvbi1zZW5kOjpiZWZvcmV7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMnB4O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtMTNweDtcclxuICAgIH0qL1xyXG59XHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1heC13aWR0aDogMzIwcHgpe1xyXG4gICAgaW9uLXRodW1ibmFpbCB7XHJcbiAgICAgICAgLS1zaXplOiA5NXB4O1xyXG4gICAgfVxyXG4gICAgLmltZy1jb3VudHtcclxuICAgICAgICBib3R0b206IDY2cHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgfVxyXG4gICAgLmltZy1wdWJsaXNoe1xyXG4gICAgICAgIHdpZHRoOiA5NXB4O1xyXG4gICAgfVxyXG4gICAgLmZsYXRpY29uLXNlbmQ6OmJlZm9yZXtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC0xM3B4O1xyXG4gICAgfVxyXG4gICAgaW9uLXRodW1ibmFpbC5wcm9kdWN0LWltZyB7XHJcbiAgICAgICAgLS1zaXplOiAxMTBweDtcclxuICAgICAgfSBcclxufVxyXG5AbWVkaWEgc2NyZWVuIGFuZChtaW4td2lkdGg6IDYwMHB4KSB7XHJcbiAgICAubWVzc2FnZS11c2Vye1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtNTBweDtcclxuICAgIH1cclxuICAgIC5tLWxlZnR7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICAgIH1cclxuICAgIGlvbi10aHVtYm5haWwge1xyXG4gICAgICAgIC0tc2l6ZTogMjIycHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLWNvdW50e1xyXG4gICAgICAgIGJvdHRvbTogMTM2cHg7XHJcbiAgICAgICAgZm9udC1zaXplOiA0MHB4O1xyXG4gICAgfVxyXG4gICAgLmNvbC1wYWRkaW5ne1xyXG4gICAgICAgIHBhZGRpbmc6IDhweDtcclxuICAgIH1cclxuICAgIC50ZXh0YXJlYUVsZW1lbnR7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgfVxyXG4gICAgLmltZy1wdWJsaXNoe1xyXG4gICAgICAgIHdpZHRoOiAyMjJweDtcclxuICAgIH1cclxuICAgIGlvbi10aHVtYm5haWwucHJvZHVjdC1pbWcge1xyXG4gICAgICAgIC0tc2l6ZTogMjAwcHg7XHJcbiAgICAgIH0gXHJcbn1cclxuQG1lZGlhIHNjcmVlbiBhbmQobWluLXdpZHRoOiA3MDBweCl7XHJcbiAgICAuY29sLXBhZGRpbmd7XHJcbiAgICAgICAgcGFkZGluZzogMTJweDtcclxuICAgIH1cclxuICAgIGlvbi10aHVtYm5haWwge1xyXG4gICAgICAgIC0tc2l6ZTogMjczcHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLXB1Ymxpc2h7XHJcbiAgICAgICAgd2lkdGg6IDI3M3B4O1xyXG4gICAgfVxyXG4gICAgLmltZy1jb3VudHtcclxuICAgICAgICBib3R0b206IDE2NXB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIH1cclxuICAgIC5tZXNzYWdlLWFkbWlue1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIH1cclxuICAgIC5tZXNzYWdlLXVzZXJ7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtNTVweDtcclxuICAgIH1cclxuICAgIC5hdmF0YXItaW1ne1xyXG4gICAgICAgIGhlaWdodDogNjBweDtcclxuICAgICAgICB3aWR0aDogNjBweDtcclxuICAgIH1cclxuICAgIC5pbWctYnJvYWRjYXN0e1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogNzVweDtcclxuICAgIH1cclxuICAgIC5pbWctb3JkZXJ7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDc1cHg7XHJcbiAgICB9XHJcbiAgICAubS1sZWZ0e1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLWFkbWlue1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogNzVweDtcclxuICAgIH1cclxuICAgIC51cC1pY29uLWFjdGl2ZXtcclxuICAgICAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC01cHg7XHJcbiAgICB9XHJcbiAgICAudXAtaWNvbi1kaXNhYmxlZHtcclxuICAgICAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC01cHg7XHJcbiAgICB9XHJcbiAgICAuYWRkLWljb24tZGlzYWJsZWQge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgICAgICByaWdodDogLTEwcHg7XHJcbiAgICB9XHJcbiAgICAuYWRkLWljb24tYWN0aXZlIHtcclxuICAgICAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICAgICAgcmlnaHQ6IC0xMHB4O1xyXG4gICAgfVxyXG4gICAgLnRleHRhcmVhRWxlbWVudHtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcbiAgICAuZmxhdGljb24tc2VuZDo6YmVmb3Jle1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIH1cclxuICAgIGlvbi10aHVtYm5haWwucHJvZHVjdC1pbWcge1xyXG4gICAgICAgIC0tc2l6ZTogMjM1cHg7XHJcbiAgICAgIH0gXHJcbn1cclxuQG1lZGlhIHNjcmVlbiBhbmQobWluLXdpZHRoOiAxMDAwcHgpe1xyXG4gICAgaW9uLXRodW1ibmFpbCB7XHJcbiAgICAgICAgLS1zaXplOiAzNzBweDtcclxuICAgIH1cclxuICAgIC5pbWctcHVibGlzaHtcclxuICAgICAgICB3aWR0aDogMzcwcHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLWNvdW50e1xyXG4gICAgICAgIGJvdHRvbTogMjIwcHg7XHJcbiAgICAgICAgZm9udC1zaXplOiA1MHB4O1xyXG4gICAgfVxyXG4gICAgcHtcclxuICAgICAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICB9XHJcbiAgICAubWVzc2FnZS1hZG1pbntcclxuICAgICAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICB9XHJcbiAgICAubWVzc2FnZS11c2Vye1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtODVweDtcclxuICAgICAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICB9XHJcbiAgICAuYXZhdGFyLWltZ3tcclxuICAgICAgICBoZWlnaHQ6IDcwcHg7XHJcbiAgICAgICAgd2lkdGg6IDcwcHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLWJyb2FkY2FzdHtcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDg1cHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLW9yZGVye1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA4NXB4O1xyXG4gICAgfVxyXG4gICAgLmltZy1hZG1pbntcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDg1cHg7XHJcbiAgICB9XHJcbiAgICAudXAtaWNvbi1hY3RpdmV7XHJcbiAgICAgICAgZm9udC1zaXplOiA1MHB4O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xyXG4gICAgfVxyXG4gICAgLnVwLWljb24tZGlzYWJsZWR7XHJcbiAgICAgICAgZm9udC1zaXplOiA1MHB4O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xyXG4gICAgfVxyXG4gICAgLmFkZC1pY29uLWRpc2FibGVkIHtcclxuICAgICAgICBmb250LXNpemU6IDUwcHg7XHJcbiAgICAgICAgcmlnaHQ6IC0xMHB4O1xyXG4gICAgfVxyXG4gICAgLmFkZC1pY29uLWFjdGl2ZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiA1MHB4O1xyXG4gICAgICAgIHJpZ2h0OiAtMTBweDtcclxuICAgIH1cclxuICAgIC50ZXh0YXJlYUVsZW1lbnR7XHJcbiAgICAgICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgfVxyXG4gICAgLmZsYXRpY29uLXNlbmQ6OmJlZm9yZXtcclxuICAgICAgICBmb250LXNpemU6IDQ1cHg7XHJcbiAgICB9XHJcbiAgICBpb24tdGh1bWJuYWlsLnByb2R1Y3QtaW1nIHtcclxuICAgICAgICAtLXNpemU6IDMwMHB4O1xyXG4gICAgICB9IFxyXG59XHJcblxyXG4ud3JhcHBlci1jb250YWluZXJ7XHJcbiAgICBmbG9hdDogbm9uZTtcclxuICAgIGNsZWFyOiBib3RoO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbn1cclxuLmltZy1icm9hZGNhc3QuaGFsZnt3aWR0aDogNTAlO2Zsb2F0OiByaWdodDt9XHJcbi5pbWctcHVibGlzaHt3aWR0aDogMTAwJSFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcblxyXG4uZml4ZWQtaGVpZ2h0e1xyXG4gICAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtIDMxNXB4KTtcclxuICAgICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xyXG4gICAgICBwYWRkaW5nOiAxNnB4O1xyXG4gIH1cclxuXHJcbiAgLmJ0bi13cmFwcGVye1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gIH0iLCIuYWRtaW4tY2hhdC10b29sYmFyIGlvbi10aXRsZSB7XG4gIG1hcmdpbi1yaWdodDogMHB4O1xuICBtYXJnaW4tYm90dG9tOiAwcHg7XG59XG5cbi51c2VyLWxhc3Qtc2VlbiB7XG4gIHRleHQtdHJhbnNmb3JtOiBsb3dlcmNhc2U7XG4gIG9wYWNpdHk6IDAuODtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBtYXJnaW4tdG9wOiAycHg7XG59XG5cbi5pbWctcHVibGlzaCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgwZGVnLCByZ2JhKDAsIDAsIDAsIDAuNSksIHRyYW5zcGFyZW50KTtcbiAgYm90dG9tOiAwO1xuICBoZWlnaHQ6IDI4cHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDE0MHB4O1xuICB6LWluZGV4OiAyO1xuICBjb2xvcjogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbn1cblxuLmZsYXRpY29uLWNsb2NrOjpiZWZvcmUge1xuICBmb250LXNpemU6IDEwcHg7XG4gIGNvbG9yOiBibGFjaztcbiAgb3BhY2l0eTogMC41O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiA1cHg7XG4gIG1hcmdpbi10b3A6IDFweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmZsYXRpY29uLWNoZWNrOjpiZWZvcmUge1xuICBmb250LXNpemU6IDEwcHg7XG4gIGNvbG9yOiAjOGRiOGY3O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAycHg7XG4gIG1hcmdpbi10b3A6IDFweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmZsYXRpY29uLXNlbmQ6OmJlZm9yZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGZvbnQtc2l6ZTogMjVweDtcbiAgbWFyZ2luLWxlZnQ6IC0xMHB4O1xufVxuXG4uY2xvY2staWNvbi1pbWFnZTo6YmVmb3JlIHtcbiAgYm90dG9tOiA1cHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm90dG9tOiA1cHg7XG59XG5cbi51cC1pY29uLWJ0biB7XG4gIC0tYmFja2dyb3VuZDogbm9uZTtcbn1cblxuLm1zZy1jb250ZW50IHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG59XG5cbi5zZWFyY2gtbWVzc2FnZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XG59XG5cbi5tYXJnaW5pbmcge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4ubWVzc2FnZS1hZG1pbiB7XG4gIHBhZGRpbmc6IDEzcHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjM2RiZmY7XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDEwcHg7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMHB4O1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMHB4O1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgYm94LXNoYWRvdzogMHB4IDFweCAycHggI2NjYztcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICBmb250LXNpemU6IDE0cHg7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB1c2VyLXNlbGVjdDogYXV0bztcbn1cblxuLm1lc3NhZ2UtdXNlciB7XG4gIHBhZGRpbmc6IDEzcHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGMkY1RkM7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjM2RiZmY7XG4gIGJveC1zaGFkb3c6IDBweCAxcHggMnB4ICNjY2M7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMHB4O1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTBweDtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDtcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBtYXJnaW4tbGVmdDogLTE2cHg7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB1c2VyLXNlbGVjdDogYXV0bztcbn1cblxuLmF2YXRhci1pbWcge1xuICBtYXJnaW4tdG9wOiAycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gIHBhZGRpbmc6IDJweDtcbiAgYm94LXNoYWRvdzogMHB4IDNweCAzcHggMHB4ICNlOGU4ZTg7XG4gIGhlaWdodDogNDBweDtcbiAgd2lkdGg6IDQwcHg7XG59XG5cbi50aW1lIHtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBjb2xvcjogYmxhY2s7XG4gIG9wYWNpdHk6IDAuNTtcbiAgbWFyZ2luLXRvcDogNXB4O1xuICBtYXJnaW4tYm90dG9tOiAwcHg7XG59XG5cbi5pbWctcHVibGlzaCBzcGFuIHtcbiAgY29sb3I6IHdoaXRlO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogNXB4O1xuICBmb250LXNpemU6IDEwcHg7XG4gIHJpZ2h0OiAxNXB4O1xufVxuXG4udXAtaWNvbi1hY3RpdmUge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBmb250LXNpemU6IDMwcHg7XG4gIG1hcmdpbi1sZWZ0OiAtMjBweDtcbn1cblxuLnVwLWljb24tZGlzYWJsZWQge1xuICBjb2xvcjogI2NjYztcbiAgZm9udC1zaXplOiAzMHB4O1xuICBtYXJnaW4tbGVmdDogLTIwcHg7XG59XG5cbi5hZGQtaWNvbi1kaXNhYmxlZCB7XG4gIGZvbnQtc2l6ZTogMjVweDtcbiAgY29sb3I6ICNhMzk3OTc7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbGVmdDogLThweDtcbn1cblxuLmFkZC1pY29uLWFjdGl2ZSB7XG4gIGZvbnQtc2l6ZTogMjVweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAtOHB4O1xufVxuXG4ubWVzc2FnZS1pbnB1dCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICByZXNpemU6IG5vbmU7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbiAgcGFkZGluZy1yaWdodDogMTBweDtcbiAgcGFkZGluZy10b3A6IDIwcHg7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi50ZXh0YXJlYUVsZW1lbnQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgb3V0bGluZTogbm9uZTtcbiAgcGFkZGluZzogMTBweDtcbiAgbWF4LWhlaWdodDogMTAwcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW4tdG9wOiA2cHg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgbWFyZ2luLWxlZnQ6IC01cHg7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbn1cblxuLnlvdXItb3JkZXIge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgbWFyZ2luOiAwcHg7XG59XG5cbi5wcm9kdWN0LWluZm8ge1xuICBtYXJnaW46IDBweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuLnByb2R1Y3QtZGF0YSB7XG4gIG1hcmdpbjogMHB4O1xufVxuXG4uZGl2aWRlciB7XG4gIGJhY2tncm91bmQ6ICNDOEQ3RTk7XG4gIGhlaWdodDogMXB4O1xufVxuXG5pb24tdGh1bWJuYWlsIHtcbiAgLS1zaXplOiAxNDBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2MzZGJmZjtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAjY2NjO1xufVxuXG4uc3VwcG9ydC1pY29uOmJlZm9yZSB7XG4gIGZvbnQtc2l6ZTogMzBweDtcbn1cblxuLmZsYXRpY29uLW51bGwtMjI6OmJlZm9yZSB7XG4gIGNvbG9yOiAjY2NjO1xuICBtYXJnaW46IDEwcHg7XG59XG5cbi5mbGF0aWNvbi1udWxsLTE5OjpiZWZvcmUge1xuICBmb250LXNpemU6IDIwcHg7XG59XG5cbi5jbG9zZS1idG4ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGNvbG9yOiAjY2NjO1xuICByaWdodDogMnB4O1xufVxuXG5pb24taW5wdXQge1xuICAtLXBhZGRpbmctYm90dG9tOiAzcHg7XG4gIC0tcGFkZGluZy10b3A6IDVweDtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxMHB4O1xuICAtLXBhZGRpbmctZW5kOiAxMHB4O1xufVxuXG4uaW9uLW5vLXBhZGRpbmcsIFtuby1wYWRkaW5nXSB7XG4gIC0tcGFkZGluZy1zdGFydDogMHB4O1xuICAtLXBhZGRpbmctZW5kOiAwO1xuICAtLXBhZGRpbmctdG9wOiAwO1xuICAtLXBhZGRpbmctYm90dG9tOiAwO1xuICBwYWRkaW5nLWxlZnQ6IDVweDtcbiAgcGFkZGluZy1yaWdodDogMDtcbiAgcGFkZGluZy10b3A6IDA7XG4gIHBhZGRpbmctYm90dG9tOiAwO1xufVxuXG46aG9zdCAuaXRlbS1pbnRlcmFjdGl2ZS5pb24tdmFsaWQge1xuICAtLWhpZ2hsaWdodC1iYWNrZ3JvdW5kOiBub25lO1xufVxuXG4uYm90dG9tLWJvcmRlciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xufVxuXG4udG9wLWJvcmRlciB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjO1xuICBtYXJnaW4tYm90dG9tOiBjb25zdGFudChzYWZlLWFyZWEtaW5zZXQtYm90dG9tKTtcbiAgLyogaU9TIDExLjAgKi9cbiAgbWFyZ2luLWJvdHRvbTogZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pO1xuICAvKiBpT1MgMTEuMiAqL1xufVxuXG4ubWVzc2FnZS1ib3gge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5uby1tc2dzIHtcbiAgY29sb3I6ICNjY2M7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuaW9uLXNwaW5uZXIge1xuICB3aWR0aDogMjBweCAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDIwcHggIWltcG9ydGFudDtcbn1cblxuLmxvYWRpbmcge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXCJodHRwczovL3M1LmdpZnl1LmNvbS9pbWFnZXMvbG9hZGVyYmIxOWVmY2MyNzQ5ZTExNS5naWZcIikgY2VudGVyIG5vLXJlcGVhdDtcbn1cblxuLnNwaW5uZXIge1xuICBtYXJnaW4tdG9wOiA1MCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmltZy1icm9hZGNhc3Qge1xuICBtYXJnaW4tdG9wOiA1cHg7XG4gIG1hcmdpbi1yaWdodDogNTVweDtcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xufVxuXG4uaW1nLW9yZGVyIHtcbiAgbWFyZ2luLWxlZnQ6IDU1cHg7XG4gIG1hcmdpbi10b3A6IDVweDtcbn1cblxuLm0tbGVmdCB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG5cbi5pbWctYWRtaW4ge1xuICBtYXJnaW4tcmlnaHQ6IDU1cHg7XG4gIG1hcmdpbi10b3A6IDVweDtcbn1cblxuLmltZy1ncmlkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2MzZGJmZjtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTBweDtcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHg7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwcHg7XG4gIGJveC1zaGFkb3c6IDBweCAxcHggMnB4IDBweCAjY2NjO1xufVxuXG4uaW1nLWdyaWQtdXNlciB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjM2RiZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGMkY1RkM7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMHB4O1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTBweDtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDtcbiAgYm94LXNoYWRvdzogMHB4IDFweCAycHggMHB4ICNjY2M7XG59XG5cbi5pbWctb3BhY2l0eSB7XG4gIG9wYWNpdHk6IDAuNTtcbn1cblxuLmltZy1jb3VudCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBib3R0b206IDkwcHg7XG4gIGZvbnQtc2l6ZTogMzBweDtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uZmxhdGljb24tbnVsbC0yMzo6YmVmb3JlIHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLnRleHRhcmVhLWRpdiB7XG4gIC8qd2lkdGg6IDgyJTsqL1xufVxuXG4uaW1nLW9ubHktYnJvYWRjYXN0IHtcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XG59XG5cbmlvbi10aHVtYm5haWwucHJvZHVjdC1pbWcge1xuICAtLXNpemU6IDEzMHB4O1xufVxuXG4ub3JkZXItcm93cyB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYzNkYmZmO1xuICBwYWRkaW5nOiA1cHg7XG59XG5cbi5wLWRlbGV0ZSB7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzNzVweCkge1xuICBpb24tdGh1bWJuYWlsIHtcbiAgICAtLXNpemU6IDEyMnB4O1xuICB9XG5cbiAgLmltZy1jb3VudCB7XG4gICAgYm90dG9tOiA4MHB4O1xuICB9XG5cbiAgLm1lc3NhZ2UtdXNlciB7XG4gICAgbWFyZ2luLWxlZnQ6IC0xMHB4O1xuICB9XG5cbiAgLmltZy1wdWJsaXNoIHtcbiAgICB3aWR0aDogMTIycHg7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM2MHB4KSB7XG4gIGlvbi10aHVtYm5haWwge1xuICAgIC0tc2l6ZTogMTE1cHg7XG4gIH1cblxuICAuaW1nLWNvdW50IHtcbiAgICBib3R0b206IDc1cHg7XG4gIH1cblxuICAubWVzc2FnZS11c2VyIHtcbiAgICBtYXJnaW4tbGVmdDogLTEwcHg7XG4gIH1cblxuICAuaW1nLXB1Ymxpc2gge1xuICAgIHdpZHRoOiAxMTVweDtcbiAgfVxuXG4gIC8qIC5mbGF0aWNvbi1zZW5kOjpiZWZvcmV7XG4gICAgICAgZm9udC1zaXplOiAyMnB4O1xuICAgICAgIG1hcmdpbi1sZWZ0OiAtMTNweDtcbiAgIH0qL1xufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzIwcHgpIHtcbiAgaW9uLXRodW1ibmFpbCB7XG4gICAgLS1zaXplOiA5NXB4O1xuICB9XG5cbiAgLmltZy1jb3VudCB7XG4gICAgYm90dG9tOiA2NnB4O1xuICAgIGZvbnQtc2l6ZTogMjVweDtcbiAgfVxuXG4gIC5pbWctcHVibGlzaCB7XG4gICAgd2lkdGg6IDk1cHg7XG4gIH1cblxuICAuZmxhdGljb24tc2VuZDo6YmVmb3JlIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IC0xM3B4O1xuICB9XG5cbiAgaW9uLXRodW1ibmFpbC5wcm9kdWN0LWltZyB7XG4gICAgLS1zaXplOiAxMTBweDtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjAwcHgpIHtcbiAgLm1lc3NhZ2UtdXNlciB7XG4gICAgbWFyZ2luLWxlZnQ6IC01MHB4O1xuICB9XG5cbiAgLm0tbGVmdCB7XG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgfVxuXG4gIGlvbi10aHVtYm5haWwge1xuICAgIC0tc2l6ZTogMjIycHg7XG4gIH1cblxuICAuaW1nLWNvdW50IHtcbiAgICBib3R0b206IDEzNnB4O1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgfVxuXG4gIC5jb2wtcGFkZGluZyB7XG4gICAgcGFkZGluZzogOHB4O1xuICB9XG5cbiAgLnRleHRhcmVhRWxlbWVudCB7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICB9XG5cbiAgLmltZy1wdWJsaXNoIHtcbiAgICB3aWR0aDogMjIycHg7XG4gIH1cblxuICBpb24tdGh1bWJuYWlsLnByb2R1Y3QtaW1nIHtcbiAgICAtLXNpemU6IDIwMHB4O1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3MDBweCkge1xuICAuY29sLXBhZGRpbmcge1xuICAgIHBhZGRpbmc6IDEycHg7XG4gIH1cblxuICBpb24tdGh1bWJuYWlsIHtcbiAgICAtLXNpemU6IDI3M3B4O1xuICB9XG5cbiAgLmltZy1wdWJsaXNoIHtcbiAgICB3aWR0aDogMjczcHg7XG4gIH1cblxuICAuaW1nLWNvdW50IHtcbiAgICBib3R0b206IDE2NXB4O1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgfVxuXG4gIC5tZXNzYWdlLWFkbWluIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gIH1cblxuICAubWVzc2FnZS11c2VyIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IC01NXB4O1xuICB9XG5cbiAgLmF2YXRhci1pbWcge1xuICAgIGhlaWdodDogNjBweDtcbiAgICB3aWR0aDogNjBweDtcbiAgfVxuXG4gIC5pbWctYnJvYWRjYXN0IHtcbiAgICBtYXJnaW4tcmlnaHQ6IDc1cHg7XG4gIH1cblxuICAuaW1nLW9yZGVyIHtcbiAgICBtYXJnaW4tbGVmdDogNzVweDtcbiAgfVxuXG4gIC5tLWxlZnQge1xuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XG4gIH1cblxuICAuaW1nLWFkbWluIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDc1cHg7XG4gIH1cblxuICAudXAtaWNvbi1hY3RpdmUge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgICBtYXJnaW4tbGVmdDogLTVweDtcbiAgfVxuXG4gIC51cC1pY29uLWRpc2FibGVkIHtcbiAgICBmb250LXNpemU6IDQwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IC01cHg7XG4gIH1cblxuICAuYWRkLWljb24tZGlzYWJsZWQge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgICByaWdodDogLTEwcHg7XG4gIH1cblxuICAuYWRkLWljb24tYWN0aXZlIHtcbiAgICBmb250LXNpemU6IDQwcHg7XG4gICAgcmlnaHQ6IC0xMHB4O1xuICB9XG5cbiAgLnRleHRhcmVhRWxlbWVudCB7XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICB9XG5cbiAgLmZsYXRpY29uLXNlbmQ6OmJlZm9yZSB7XG4gICAgZm9udC1zaXplOiA0MHB4O1xuICB9XG5cbiAgaW9uLXRodW1ibmFpbC5wcm9kdWN0LWltZyB7XG4gICAgLS1zaXplOiAyMzVweDtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KSB7XG4gIGlvbi10aHVtYm5haWwge1xuICAgIC0tc2l6ZTogMzcwcHg7XG4gIH1cblxuICAuaW1nLXB1Ymxpc2gge1xuICAgIHdpZHRoOiAzNzBweDtcbiAgfVxuXG4gIC5pbWctY291bnQge1xuICAgIGJvdHRvbTogMjIwcHg7XG4gICAgZm9udC1zaXplOiA1MHB4O1xuICB9XG5cbiAgcCB7XG4gICAgZm9udC1zaXplOiAyNXB4O1xuICB9XG5cbiAgLm1lc3NhZ2UtYWRtaW4ge1xuICAgIGZvbnQtc2l6ZTogMjVweDtcbiAgfVxuXG4gIC5tZXNzYWdlLXVzZXIge1xuICAgIG1hcmdpbi1sZWZ0OiAtODVweDtcbiAgICBmb250LXNpemU6IDI1cHg7XG4gIH1cblxuICAuYXZhdGFyLWltZyB7XG4gICAgaGVpZ2h0OiA3MHB4O1xuICAgIHdpZHRoOiA3MHB4O1xuICB9XG5cbiAgLmltZy1icm9hZGNhc3Qge1xuICAgIG1hcmdpbi1yaWdodDogODVweDtcbiAgfVxuXG4gIC5pbWctb3JkZXIge1xuICAgIG1hcmdpbi1sZWZ0OiA4NXB4O1xuICB9XG5cbiAgLmltZy1hZG1pbiB7XG4gICAgbWFyZ2luLXJpZ2h0OiA4NXB4O1xuICB9XG5cbiAgLnVwLWljb24tYWN0aXZlIHtcbiAgICBmb250LXNpemU6IDUwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IC01cHg7XG4gIH1cblxuICAudXAtaWNvbi1kaXNhYmxlZCB7XG4gICAgZm9udC1zaXplOiA1MHB4O1xuICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xuICB9XG5cbiAgLmFkZC1pY29uLWRpc2FibGVkIHtcbiAgICBmb250LXNpemU6IDUwcHg7XG4gICAgcmlnaHQ6IC0xMHB4O1xuICB9XG5cbiAgLmFkZC1pY29uLWFjdGl2ZSB7XG4gICAgZm9udC1zaXplOiA1MHB4O1xuICAgIHJpZ2h0OiAtMTBweDtcbiAgfVxuXG4gIC50ZXh0YXJlYUVsZW1lbnQge1xuICAgIGZvbnQtc2l6ZTogMjVweDtcbiAgfVxuXG4gIC5mbGF0aWNvbi1zZW5kOjpiZWZvcmUge1xuICAgIGZvbnQtc2l6ZTogNDVweDtcbiAgfVxuXG4gIGlvbi10aHVtYm5haWwucHJvZHVjdC1pbWcge1xuICAgIC0tc2l6ZTogMzAwcHg7XG4gIH1cbn1cbi53cmFwcGVyLWNvbnRhaW5lciB7XG4gIGZsb2F0OiBub25lO1xuICBjbGVhcjogYm90aDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmltZy1icm9hZGNhc3QuaGFsZiB7XG4gIHdpZHRoOiA1MCU7XG4gIGZsb2F0OiByaWdodDtcbn1cblxuLmltZy1wdWJsaXNoIHtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLmZpeGVkLWhlaWdodCB7XG4gIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSAzMTVweCk7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgcGFkZGluZzogMTZweDtcbn1cblxuLmJ0bi13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/admin-home/admin-chat/admin-chat.page.ts":
/*!****************************************************************!*\
  !*** ./src/app/admin/admin-home/admin-chat/admin-chat.page.ts ***!
  \****************************************************************/
/*! exports provided: AdminChatPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminChatPage", function() { return AdminChatPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/image-picker/ngx */ "./node_modules/@ionic-native/image-picker/ngx/index.js");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _ionic_native_keyboard_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/keyboard/ngx */ "./node_modules/@ionic-native/keyboard/ngx/index.js");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");











//import { CallNumber } from '@ionic-native/call-number/ngx';
var AdminChatPage = /** @class */ (function () {
    function AdminChatPage(route, router, events, actionSheetController, camera, imagePicker, loadingController, userService, chatService, paltform, keyboard, modalController, storage) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.events = events;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.imagePicker = imagePicker;
        this.loadingController = loadingController;
        this.userService = userService;
        this.chatService = chatService;
        this.paltform = paltform;
        this.keyboard = keyboard;
        this.modalController = modalController;
        this.storage = storage;
        this.allMsgs = [];
        this.msg = {
            type: null,
            message: null,
            createdAt: null,
            images: null,
            isRead: null,
            author: null,
            published: null,
            thumb: [],
            mob: [],
            imageCount: null
        };
        this.chatLoader = false;
        this.enableScroll = true;
        this.showNoMsgs = false;
        this.showMsgLoader = false;
        this.showLoader = true;
        this.disableSendBtn = true;
        this.imgUrls = [];
        this.setFirstImage = false;
        this.adminMsgText = '';
        this.unsavedImages = {};
        this.showFooter = false;
        this.route.queryParams.subscribe(function (params) {
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.userid = _this.router.getCurrentNavigation().extras.state.userId;
            }
            _this.storage.get('unsavedImages').then(function (val) {
                if (val) {
                    _this.unsavedImages = val;
                    // //console.log('val of unsavedImages', this.unsavedImages);
                }
            });
        });
        window.addEventListener('keyboardWillShow', function () {
            // //console.log("Keyboard will Show");
            setTimeout(function () {
                if (_this.content.scrollToBottom) {
                    _this.content.scrollToBottom(0);
                }
            }, 0);
        });
    }
    AdminChatPage.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom(0);
        }, 2000);
    };
    AdminChatPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var objDiv = document.getElementById("scrollDown");
        objDiv.scrollTop = objDiv.scrollHeight;
        this.initializeSubscriptions();
        this.devWidth = this.paltform.width();
        this.devHeight = this.paltform.height();
        // //console.log('devWidth', this.devWidth);
        // //console.log('devHeight', this.devHeight);
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
        setTimeout(function () {
            _this.showFooter = true;
        }, 500);
    };
    AdminChatPage.prototype.ionViewDidEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.events.publish('user:getUserDetails', this.userid);
                this.events.publish('chat:getMsgs', this.userid, 'admin');
                this.chatService.makeadminActiveTrue(this.userid);
                return [2 /*return*/];
            });
        });
    };
    AdminChatPage.prototype.ionViewWillLeave = function () {
        this.chatService.makeadminActiveFalse(this.userid);
        this.removeSubscriptions();
    };
    AdminChatPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('chat:publishMsgs', function (msgs) {
            // //console.log('publish user msgs', msgs);
            _this.allMsgs = msgs;
            _this.adminMsgText = '';
            _this.showMsgLoader = false;
            _this.showLoader = false;
            _this.scrollToBottomOnInit();
            if (_this.allMsgs) {
                _this.makeImageUrls();
            }
            _this.removeSavedImagesFromStorage();
            setTimeout(function () {
                _this.enableScroll = true;
            }, 2000);
        });
        this.events.subscribe('chat:publishMoreMsgs', function (msgs) {
            // for (const msg of msgs) {
            //   this.chatLoader = false;
            //   this.allMsgs.unshift(msg.payload.doc.data());
            //   this.scrollToFirstMessage('chatMessage' + 0);
            // }
            _this.allMsgs = msgs;
            // //console.log('more msgs', this.allMsgs);
            _this.chatLoader = false;
            _this.scrollToFirstMessage('chatMessage' + 1);
            _this.makeImageUrls();
        });
        this.events.subscribe('chat:noMoreMsgs', function () {
            _this.chatLoader = false;
            _this.showNoMsgs = true;
        });
        this.events.subscribe('user:publishUserDetails', function (user) {
            _this.userDetails = user;
        });
        this.events.subscribe('media:chatImageSuccess', function () {
            // this.loader.dismiss();
        });
        this.events.subscribe('media:showUnsavedImages', function (msgId, imageResponse) {
            _this.unsavedImages[msgId] = imageResponse;
            _this.storage.set('unsavedImages', _this.unsavedImages);
            // //console.log('unsavedImages', this.unsavedImages);
        });
    };
    AdminChatPage.prototype.removeSavedImagesFromStorage = function () {
        var arrayOfUnsavedImagesIds = [];
        arrayOfUnsavedImagesIds = Object.keys(this.unsavedImages);
        for (var i = 0; i < this.allMsgs.length; i++) {
            for (var j = 0; j < arrayOfUnsavedImagesIds.length; j++) {
                if (this.allMsgs[i].id === arrayOfUnsavedImagesIds[j] && this.allMsgs[i].msgData.published === true) {
                    this.unsavedImages[arrayOfUnsavedImagesIds[j]] = null;
                    this.storage.set('unsavedImages', this.unsavedImages);
                }
            }
        }
    };
    AdminChatPage.prototype.scrollToBottomOnInit = function () {
        var _this = this;
        // //console.log('in scrollToBottomOnInit...');
        setTimeout(function () {
            if (_this.content.scrollToBottom) {
                _this.content.scrollToBottom(0);
            }
        }, 1000);
    };
    AdminChatPage.prototype.getNameWithPhoneNo = function () {
        return this.userDetails.name !== 'user' ? this.userDetails.name : this.userDetails.name + " " + (this.userDetails.phoneNo ? "(" + this.userDetails.phoneNo + ")" : '');
    };
    AdminChatPage.prototype.logScrolling = function ($event) {
        if ($event.detail.scrollTop === 0 && !this.searchMsg) {
            this.chatLoader = true;
            this.showNoMsgs = false;
            this.events.publish('chat:getMoreMsgs', this.userid);
        }
    };
    AdminChatPage.prototype.scrollToFirstMessage = function (elementId) {
        var y = document.getElementById(elementId).offsetTop;
        // //console.log('y position', y);
        this.content.scrollToPoint(0, y);
    };
    AdminChatPage.prototype.makeImageUrls = function () {
        // //console.log('in makeImageUrls');
        if (this.allMsgs.length) {
            for (var i = 0; i < this.allMsgs.length; i++) {
                if (this.allMsgs[i].msgData.images && (this.allMsgs[i].msgData.type === "image" || this.allMsgs[i].msgData.type === "broadcast")) {
                    for (var y = 0; y < this.allMsgs[i].msgData.images.length; y++) {
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
    };
    AdminChatPage.prototype.preventFocusChange = function (e) {
        e.preventDefault();
    };
    AdminChatPage.prototype.resize = function () {
        this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    };
    AdminChatPage.prototype.sendMessage = function () {
        if (this.adminMsgText !== '') {
            this.content.scrollToBottom(0);
            this.myInput.nativeElement.style.height = 40 + 'px';
            this.enableScroll = false;
            this.showMsgLoader = true;
            var msg = {
                type: 'txt',
                createdAt: new Date(),
                isRead: null,
                author: 'admin',
                published: false,
                message: this.adminMsgText
            };
            this.allMsgs.push({ msgData: msg });
            this.events.publish('chat:sendMsg', msg, this.userid);
            this.adminMsgText = '';
        }
    };
    AdminChatPage.prototype.uploadImage = function (files) {
        var _this = this;
        var imageResponse = [];
        for (var i = 0; i < files.length; i++) {
            var reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = function (event) {
                var base64Image = event.target.result;
                var base64Str = base64Image.split(',');
                var size = _this.calculateImageSize(base64Str[1]);
                imageResponse.push({ url: base64Image, size: size });
                // //console.log('size of image', size);
                _this.msg.type = 'image';
                _this.msg.createdAt = new Date();
                _this.msg.isRead = null;
                _this.msg.author = 'admin';
                _this.msg.published = false;
                _this.allMsgs.push(_this.msg);
                _this.events.publish('media:addChatImage', _this.userid, _this.msg, imageResponse);
            };
        }
    };
    AdminChatPage.prototype.imageActionSheet = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.adminMsgText === '')) return [3 /*break*/, 3];
                        this.enableScroll = false;
                        return [4 /*yield*/, this.actionSheetController.create({
                                header: 'Select any option',
                                buttons: [{
                                        text: 'Camera',
                                        icon: 'camera',
                                        handler: function () {
                                            _this.addCameraImage();
                                        }
                                    }, {
                                        text: 'Gallery',
                                        icon: 'images',
                                        handler: function () {
                                            _this.addGalleryImages();
                                        }
                                    }, {
                                        text: 'Cancel',
                                        icon: 'close',
                                        role: 'cancel',
                                        handler: function () {
                                            // //console.log('Cancel clicked');
                                        }
                                    }]
                            })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminChatPage.prototype.addCameraImage = function () {
        var _this = this;
        this.optionsforCamera = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            allowEdit: true
        };
        var imageResponse = [];
        this.camera.getPicture(this.optionsforCamera).then(function (imageData) {
            if (imageData.length !== 0) {
                var base64Image = 'data:image/jpeg;base64,' + imageData;
                var base64Str = base64Image.split(',');
                var size = _this.calculateImageSize(base64Str[1]);
                imageResponse.push({ url: base64Image, size: size });
                // //console.log('size of image', size);
                _this.msg.type = 'image';
                _this.msg.createdAt = new Date();
                _this.msg.isRead = null;
                _this.msg.author = 'admin';
                _this.msg.published = false;
                _this.allMsgs.push(_this.msg);
                _this.events.publish('media:addChatImage', _this.userid, _this.msg, imageResponse);
            }
        }, function (err) {
            // //console.log(err);
        });
    };
    AdminChatPage.prototype.addGalleryImages = function () {
        var _this = this;
        this.optionsforGallery = {
            quality: 50,
            outputType: 1
        };
        this.imageResponse = [];
        this.imagePicker.getPictures(this.optionsforGallery).then(function (results) {
            if (results.length !== 0 && results !== 'OK') {
                for (var i = 0; i < results.length; i++) {
                    var base64Image = 'data:image/jpeg;base64,' + results[i];
                    var base64Str = base64Image.split(',');
                    var imgSize = _this.calculateImageSize(base64Str[1]);
                    _this.imageResponse.push({ url: 'data:image/jpeg;base64,' + results[i], size: imgSize });
                }
                _this.msg.type = 'image';
                _this.msg.createdAt = new Date();
                _this.msg.isRead = null;
                _this.msg.author = 'admin';
                _this.msg.published = false;
                _this.allMsgs.push(_this.msg);
                _this.events.publish('media:addChatImage', _this.userid, _this.msg, _this.imageResponse);
            }
        }, function (err) {
            // //console.log(err);
        });
    };
    AdminChatPage.prototype.calculateImageSize = function (base64String) {
        var padding, inBytes, base64StringLength;
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
        var kbytes = inBytes / 1000;
        return kbytes;
    };
    AdminChatPage.prototype.imageZoom = function (img) {
        var imgIndex = this.imgUrls.indexOf(img);
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_9__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: this.imgUrls,
                index: imgIndex
            }
        }).then(function (modal) { return modal.present(); });
    };
    AdminChatPage.prototype.gridImageZoom = function (imgs) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_9__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: imgs,
                index: 0
            }
        }).then(function (modal) { return modal.present(); });
    };
    AdminChatPage.prototype.hideSearchMessage = function () {
        this.searchMsg = null;
        this.content.scrollToBottom(0);
    };
    AdminChatPage.prototype.calculateMsgTime = function (time) {
        var hours = '0';
        var minutes = '0';
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
    };
    AdminChatPage.prototype.changeInMsgInput = function () {
        this.disableSendBtn = false;
    };
    AdminChatPage.prototype.isDate = function (date) {
        return date instanceof Date;
    };
    AdminChatPage.prototype.singleImageZoom = function (img) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_9__["ImageModalPage"],
            componentProps: {
                imgs: [{ url: img }],
                index: 0
            }
        }).then(function (modal) { return modal.present(); });
    };
    AdminChatPage.prototype.calcTotalAmount = function (products) {
        var totalAmount = 0;
        for (var i = 0; i < products.length; i++) {
            totalAmount += products[i].price;
        }
        return totalAmount;
    };
    AdminChatPage.prototype.onClickViewOrder = function (orderId) {
        var navigationExtras = {
            state: {
                orderId: orderId
            }
        };
        this.router.navigate(['order-details'], navigationExtras);
    };
    AdminChatPage.prototype.presentLoading = function () {
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
                        _a.loader = _b.sent();
                        return [4 /*yield*/, this.loader.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminChatPage.prototype.callUser = function () {
        /* this.callNumber.callNumber(this.userDetails.phoneNo, true)
         .then(res =>  console.log('Launched dialer!', res))
         .catch(err =>  console.log('Error launching dialer', err));*/
    };
    AdminChatPage.prototype.onClickTrackOrder = function (agentId, deliveryLatLng) {
        var navigationExtras = {
            state: {
                agentId: agentId,
                deliveryLatLng: deliveryLatLng
            }
        };
        this.router.navigate(['location-map'], navigationExtras);
    };
    AdminChatPage.prototype.presentActionSheet = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: 'Options',
                            buttons: [{
                                    text: 'Orders',
                                    icon: 'cube',
                                    handler: function () {
                                        _this.openUserDetails(0);
                                    }
                                }, {
                                    text: 'Addresses',
                                    icon: 'locate',
                                    handler: function () {
                                        _this.openUserDetails(1);
                                    }
                                }, {
                                    text: 'Wallet',
                                    icon: 'wallet',
                                    handler: function () {
                                        _this.openUserDetails(2);
                                    }
                                }, {
                                    text: 'Settings',
                                    icon: 'settings',
                                    handler: function () {
                                        _this.openUserDetails(3);
                                    }
                                }, {
                                    text: 'Cancel',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminChatPage.prototype.openUserDetails = function (index) {
        this.userDetails['defaultDeliveryAgentId'] = this.userDetails.hasOwnProperty('defaultDeliveryAgentId') ? this.userDetails.defaultDeliveryAgentId : '';
        var navigationExtras = {
            state: {
                uid: this.userid,
                udata: this.userDetails,
                activeTabIndex: index
            }
        };
        this.router.navigate(['admin-allusers-details'], navigationExtras);
    };
    AdminChatPage.prototype.messageModifications = function (msg) {
        msg = msg.trim();
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        var text1 = msg.replace(exp, '<a href=\'$1\'>$1</a>');
        var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        var finalText = text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
        return finalText;
    };
    AdminChatPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('chat:publishMsgs');
        this.events.unsubscribe('chat:publishMoreMsgs');
        this.events.unsubscribe('user:publishUserDetails');
        this.events.unsubscribe('media:chatImageSuccess');
        this.events.unsubscribe('media:showUnsavedImages');
        this.events.unsubscribe('chat:noMoreMsgs');
        this.events.publish('chat:removeGetMsgsSubscription');
    };
    AdminChatPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ActionSheetController"] },
        { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_5__["Camera"] },
        { type: _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_4__["ImagePicker"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
        { type: src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"] },
        { type: src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_7__["ChatService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"] },
        { type: _ionic_native_keyboard_ngx__WEBPACK_IMPORTED_MODULE_8__["Keyboard"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_10__["Storage"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonContent"], { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonContent"])
    ], AdminChatPage.prototype, "content", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('myInput', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], AdminChatPage.prototype, "myInput", void 0);
    AdminChatPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-admin-chat',
            template: __webpack_require__(/*! raw-loader!./admin-chat.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-home/admin-chat/admin-chat.page.html"),
            styles: [__webpack_require__(/*! ./admin-chat.page.scss */ "./src/app/admin/admin-home/admin-chat/admin-chat.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ActionSheetController"],
            _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_5__["Camera"], _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_4__["ImagePicker"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
            src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"], src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_7__["ChatService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"],
            _ionic_native_keyboard_ngx__WEBPACK_IMPORTED_MODULE_8__["Keyboard"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"], _ionic_storage__WEBPACK_IMPORTED_MODULE_10__["Storage"]])
    ], AdminChatPage);
    return AdminChatPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-home-admin-chat-admin-chat-module-es5.js.map