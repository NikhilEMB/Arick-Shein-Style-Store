(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-home-admin-home-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-home/admin-home.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-home/admin-home.page.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Messages</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"outline\" shape=\"round\" class=\"add-btn\" (click)=\"goToBroadcastMsg()\">\r\n      Broadcast Message \r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n\r\n\r\n\r\n<ion-content class=\"ion-no-padding\">\r\n  <div class=\"main-container\" style=\"width: 100%\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=4 >\r\n          <div *ngIf=\"showLoader\" class=\"spinner\">\r\n            <ion-spinner color=\"primary\"></ion-spinner>\r\n          </div>\r\n          <div style=\"height: 3vh;text-align: center;width: 100%;font-weight: bold;font-size: medium;display: flex;align-items: center;\">\r\n            <ion-input placeholder=\"Enter name\" (click)='clearPhone()' [(ngModel)]=\"searchUser\" style=\"height: 3vh;padding-top: 0px;padding-bottom: 0px;border: 1px solid lightgray;\"></ion-input>&nbsp;\r\n            <ion-input placeholder=\"Enter number\" [maxlength]='phoneLimit' (click)='clearName()' [(ngModel)]=\"searchUserPhone\" style=\"height: 3vh;padding-top: 0px;padding-bottom: 0px;border: 1px solid lightgray\"></ion-input>&nbsp;\r\n            <ion-button (click)='fireSearchQuery()' size=\"small\">Search</ion-button>&nbsp;\r\n            <ion-button (click)='showAllMsgs()' size=\"small\">Show All</ion-button>\r\n          </div>\r\n          <div>\r\n            <!-- <div style=\"display: flex;align-items: center;\">\r\n              <p>Select Groups</p>\r\n            </div> -->\r\n            <br>\r\n            <p>Select Groups</p>\r\n            <ion-list *ngIf=\"groups\">\r\n              <ion-item lines=\"none\" class=\"search-message\">\r\n                <ion-label>Groups</ion-label>\r\n                <ion-select multiple placeholder=\"Select Groups\" (ionChange)=\"getGroupUsers($event)\">\r\n                  <ng-container *ngFor=\"let group of groups\">\r\n                    <ion-select-option [value]=\"group.id\">{{group.name}}\r\n                    </ion-select-option>\r\n                  </ng-container>\r\n                </ion-select>\r\n              </ion-item>\r\n            </ion-list>\r\n            <ion-text color=\"danger t-a-l\">\r\n              <p>Note: You can select upto 10 Groups.</p>\r\n            </ion-text>\r\n          </div>\r\n          <div *ngIf=\"!showLoader\" style=\"margin-top: 1.5vh;width: 100%;\" id='scroll1'>\r\n            <div class=\"messages-wrapper\">\r\n                <div class=\"message-wrap\" *ngFor=\"let msg of lastMsgs; let i = index\" (click)=\"onClickLastMsg(msg.id,i)\" \r\n                [id]=\"'message'+i\">\r\n                  <div class=\"b-time\">\r\n                    <p><i class=\"flaticon-null-2\"></i>\r\n                      {{msg.lastMessageAt.toDate().toISOString() | dateAgo}}</p>\r\n                  </div>\r\n                  <p class=\"user-name\" *ngIf=\"msg.name !== 'user'\">{{msg.name}}<span class=\"badge\"\r\n                    *ngIf=\"msg.unreadMsgs > 0\">{{msg.unreadMsgs}}</span></p>\r\n            \r\n                <p class=\"user-name\" *ngIf=\"msg.name === 'user' && msg.userPhoneNo\">{{msg.userPhoneNo}}<span class=\"badge\"\r\n                    *ngIf=\"msg.unreadMsgs > 0\">{{msg.unreadMsgs}}</span></p>\r\n                <p class=\"user-name\" *ngIf=\"msg.name === 'user' && !msg.userPhoneNo\">{{msg.name}}<span class=\"badge\"\r\n                    *ngIf=\"msg.unreadMsgs > 0\">{{msg.unreadMsgs}}</span></p>\r\n                    <p class=\"last-msg\">\r\n                      {{msg.lastMessage}}\r\n                    </p>\r\n                </div>\r\n            </div>\r\n          </div>\r\n          <div style=\"height: 5vh;display: flex;justify-content: center;align-items: flex-end;\">\r\n            <ion-button (click)=\"loadMoreMessagesForAdminHome($event)\" shape=\"round\" fill='solid' *ngIf='!noMoreMsgs'>\r\n              Load More\r\n            </ion-button>\r\n            <ion-button shape=\"round\" fill='solid' *ngIf='noMoreMsgs' disabled>\r\n              No More Messages\r\n            </ion-button>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=5 style=\"border-left: 1px solid lightgray;\">\r\n          <div style=\"text-align: center;z-index: 999;width: 100%;background: white;font-weight: bold;font-size: medium;height: 3vh;\">\r\n            <p *ngIf='userDetails' style=\"font-size: 16px;\">{{userDetails.name}} ({{userDetails.phoneNo}})</p>\r\n          </div>\r\n          <div text-center *ngIf=\"showNoMsgs\">\r\n            <p class=\"no-msgs\">No More Messages</p>\r\n          </div>\r\n          <ion-grid class=\"ion-no-padding\" *ngIf=\"userDetails && !showLoader\" id='scroll2'>\r\n            <br>\r\n            <div [id]=\"'chatMessage' + ind\" *ngFor=\"let msgs of allMsgs | filter: searchMsg; let ind = index\">\r\n              \r\n              <!-- Admin message -->\r\n              <ion-row class=\"ion-justify-content-end\"\r\n                *ngIf=\"msgs.msgData && msgs.msgData.author == 'admin' && msgs.msgData.type == 'txt'\">\r\n\r\n                <div class=\"whatsapp-container\" *ngIf=\"msgs.msgData.source?.name == 'whatsapp'\">\r\n                  <i class=\"flaticon-info error-icon red cursor-p\" *ngIf=\"msgs.msgData.source?.data?.status == 'failed'\" (click)=\"showErrMsg()\"></i>\r\n                  <img src=\"../../../assets/img/whatsapp.png\" alt=\"\" *ngIf=\"msgs.msgData.source?.data?.status != 'failed'\">\r\n                </div>\r\n       \r\n                <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px'}\" class=\"message-admin\" style=\"text-align: left;\">\r\n                  <span class=\"msg-content\" [innerHtml]=\"messageModifications(msgs.msgData.message)\"></span>\r\n                  <h6 class=\"time\">\r\n                   <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                   <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n                   <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n                   <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n                </div>\r\n       \r\n                <div style=\"margin-right: 10px;\">\r\n                  <ion-avatar class=\"avatar-img\">\r\n                    <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                  </ion-avatar>\r\n                </div>\r\n              </ion-row>\r\n              <!-- /Admin message -->\r\n       \r\n              <!-- Admin order -->\r\n              <ion-row class=\"ion-justify-content-end\"\r\n                *ngIf=\"msgs.msgData && msgs.msgData.author == 'admin' && msgs.msgData.type == 'order'\">\r\n       \r\n                <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Rejected'\" style=\"text-align: left;\">\r\n                 <span>Your order is rejected</span>\r\n                 <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n                 <div style=\"text-align: center;margin-top: -10px;\">\r\n                   <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" fill=\"outline\" style=\"color: black;margin-top: 12px;margin-bottom: 12px;\">\r\n                     View Order\r\n                   </ion-button>\r\n                 </div>\r\n                 <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n                   <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                   <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n                   <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n                </div>\r\n       \r\n                <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Confirmed'\" style=\"text-align: left;\">\r\n                 <span>Your order is confirmed. Please do the payment</span>\r\n                 <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n                 <div style=\"text-align: center;margin-top: -10px;\">\r\n                   <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" fill=\"outline\" style=\"color: black;margin-top: 12px;margin-bottom: 12px;\">\r\n                     View Order\r\n                   </ion-button>\r\n                 </div>\r\n                 <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n                   <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                   <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n                   <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n                </div>\r\n       \r\n                <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='PaymentRequest'\" style=\"text-align: left;\">\r\n                 <span>Please do the payment of your order</span>\r\n                 <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n                 <div style=\"text-align: center;margin-top: -10px;\">\r\n                   <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" fill=\"outline\" style=\"color: black;margin-top: 12px;margin-bottom: 12px;\">\r\n                     View Order\r\n                   </ion-button>\r\n                 </div>\r\n                 <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n                   <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                   <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n                   <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n                </div>\r\n       \r\n                <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Cancelled'\" style=\"text-align: left;\">\r\n                 <span>Your order is cancelled</span>\r\n                 <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n                 <div style=\"text-align: center;margin-top: -10px;\">\r\n                   <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" fill=\"outline\" style=\"color: black;margin-top: 12px;margin-bottom: 12px;\">\r\n                     View Order\r\n                   </ion-button>\r\n                 </div>\r\n                 <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n                   <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                   <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n                   <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n                </div>\r\n                <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Dispatched'\" style=\"text-align: left;\">\r\n                 <span>Your order is dispatched</span>\r\n                 <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n                 <div style=\"text-align: center;margin-top: -10px;\" >\r\n                   <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" fill=\"outline\" style=\"color: black;margin-top: 12px;margin-bottom: 12px;\">\r\n                     View Order\r\n                   </ion-button>\r\n                 </div>\r\n                 <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n                   <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                   <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n                   <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n                </div>\r\n                <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Delivered'\" style=\"text-align: left;\">\r\n                 <span>Your order is delivered</span>\r\n                 <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n                 <div style=\"text-align: center;margin-top: -10px;\">\r\n                   <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" fill=\"outline\" style=\"color: black;margin-top: 12px;margin-bottom: 12px;\">\r\n                     View Order\r\n                   </ion-button>\r\n                 </div>\r\n                 <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n                   <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                   <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n                   <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n                </div>\r\n                <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='Returned'\" style=\"text-align: left;\">\r\n                 <span>Your order is returned</span>\r\n                 <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n                 <div style=\"text-align: center;margin-top: -10px;\">\r\n                   <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" fill=\"outline\" style=\"color: black;margin-top: 12px;margin-bottom: 12px;\">\r\n                     View Order\r\n                   </ion-button>\r\n                 </div>\r\n                 <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n                   <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                   <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n                   <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n                </div>\r\n       \r\n                <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-admin\" *ngIf=\"msgs.msgData.status=='deliveryStarted'\" style=\"text-align: left;\">\r\n                 <span>Delivery has started for this order.</span>\r\n                 <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n                 <div style=\"margin-top: -10px;\">\r\n                   <ion-grid class=\"ion-no-padding\">\r\n                     <ion-row class=\"ion-no-padding\">\r\n                       <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                         <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" fill=\"outline\" style=\"margin-left: -15px; color: black;margin-top: 12px;margin-bottom: 12px;\">\r\n                           View Order\r\n                         </ion-button>\r\n                       </ion-col>\r\n                       <ion-col size=\"6\" class=\"ion-no-padding\">\r\n                         <ion-button (click)=\"onClickTrackOrder(msgs.msgData.agentId, msgs.msgData.deliveryLatLng)\" fill=\"outline\" style=\"margin-left: -15px; color: black;margin-top: 12px;margin-bottom: 12px;\">\r\n                           Track Order\r\n                         </ion-button>\r\n                       </ion-col>\r\n                     </ion-row>\r\n                   </ion-grid>\r\n                 </div>\r\n                 <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n                   <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                   <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n                   <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n               </div>\r\n       \r\n                <div style=\"margin-right: 10px;\">\r\n                  <ion-avatar class=\"avatar-img\">\r\n                    <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                  </ion-avatar>\r\n                </div>\r\n              </ion-row>\r\n              <!-- /Admin order -->\r\n       \r\n              <!-- Admin Image -->\r\n              <div\r\n                *ngIf=\"msgs.msgData && msgs.msgData.author == 'admin' && msgs.msgData.type == 'image' && msgs.msgData.published === true\">\r\n                <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length === 1\">\r\n                  <ion-row class=\"ion-justify-content-end\" *ngFor=\"let img of msgs.msgData.images\">\r\n                    <div class=\"whatsapp-container\" *ngIf=\"msgs.msgData.source?.name == 'whatsapp'\">\r\n                      <img src=\"../../../assets/img/whatsapp.png\" alt=\"\">\r\n                    </div>\r\n                    <div class=\"ion-no-padding\" style=\"margin-right: 5px;position: relative;\">\r\n                      <div>\r\n                        <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                        <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                      </div>\r\n                      <div class=\"img-publish\">\r\n                       <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                       <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n           <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n           <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                       </div>\r\n                    </div>\r\n                    <div style=\"margin-right: 10px;\">\r\n                      <ion-avatar class=\"avatar-img\">\r\n                        <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                      </ion-avatar>\r\n                    </div>\r\n                  </ion-row>\r\n                </div>\r\n                <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 1 && msgs.msgData.images.length <= 4\">\r\n                  <ion-row class=\"ion-justify-content-end\">\r\n                    <div class=\"ion-no-padding\" style=\"margin-right: 5px;\">\r\n                      <ion-grid class=\"ion-no-padding\">\r\n                        <ion-row class=\"img-grid\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                          <ion-col class=\"col-padding\" size=\"6\" *ngFor=\"let img of msgs.msgData.images; let imgIndex = index\">\r\n                            <div style=\"position: relative;\">\r\n                              <div style=\"box-shadow: none;\">\r\n                                <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                                <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                              </div>\r\n                              <div class=\"img-publish\">\r\n                               <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                               <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n                   <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n                   <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                               </div>\r\n                            </div>\r\n                          </ion-col>\r\n                        </ion-row>\r\n                      </ion-grid>\r\n                    </div>\r\n                    <div style=\"margin-right: 10px;\">\r\n                      <ion-avatar class=\"avatar-img\">\r\n                        <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                      </ion-avatar>\r\n                    </div>\r\n                  </ion-row>\r\n                </div>\r\n                <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 4\">\r\n                  <ion-row class=\"ion-justify-content-end\">\r\n                    <div class=\"ion-no-padding\" style=\"margin-right: 5px;\">\r\n                      <ion-grid class=\"ion-no-padding\">\r\n                        <ion-row class=\"img-grid\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                          <ion-col class=\"col-padding\" size=\"6\"\r\n                            *ngFor=\"let img of [msgs.msgData.images[0], msgs.msgData.images[1], msgs.msgData.images[2],msgs.msgData.images[3]]; let imgIndex = index\">\r\n                            <div style=\"position: relative;\">\r\n                              <div style=\"box-shadow: none;\"\r\n                                *ngIf=\"imgIndex === 0 || imgIndex === 1 || imgIndex === 2\">\r\n                                <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                                <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                              </div>\r\n       \r\n                              <div style=\"background-color: #000;box-shadow: none;\" *ngIf=\"imgIndex === 3\"\r\n                                (click)=\"gridImageZoom(msgs.msgData.images)\">\r\n       \r\n                                <img class=\"loading img-opacity\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                                <img class=\"loading img-opacity\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                                <div class=\"ion-no-padding\" class=\"img-count\">\r\n                                  + {{msgs.msgData.images.length - 4}}\r\n                                </div>\r\n                              </div>\r\n                              <div class=\"img-publish\">\r\n                               <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                               <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n                   <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n                   <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                               </div>\r\n                            </div>\r\n                          </ion-col>\r\n                        </ion-row>\r\n                      </ion-grid>\r\n                    </div>\r\n                    <div style=\"margin-right: 10px;\">\r\n                      <ion-avatar class=\"avatar-img\">\r\n                        <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                        \r\n                      </ion-avatar>\r\n                    </div>\r\n                  </ion-row>\r\n                </div>\r\n              </div>\r\n       \r\n       \r\n              <div\r\n                *ngIf=\"msgs.msgData && msgs.msgData.author == 'admin' && msgs.msgData.type == 'image' && msgs.msgData.published === false\">\r\n                <div *ngIf=\"unsavedImages[msgs.id] && unsavedImages[msgs.id].length === 1\">\r\n                  <ion-row class=\"ion-justify-content-end\" *ngFor=\"let img of unsavedImages[msgs.id]\">\r\n                    <div class=\"ion-no-padding\" style=\"margin-right: 5px;position: relative;\">\r\n                      <div>\r\n                        <img class=\"loading\" *ngIf=\"img.url\" src=\"{{img.url}}\">\r\n                      </div>\r\n                      <div class=\"img-publish\">\r\n                       <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                       <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n           <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n           <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                       </div>\r\n                    </div>\r\n                    <div style=\"margin-right: 10px;\">\r\n                      <ion-avatar class=\"avatar-img\">\r\n                        <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                        \r\n                      </ion-avatar>\r\n                    </div>\r\n                  </ion-row>\r\n                </div>\r\n                <div *ngIf=\"unsavedImages[msgs.id] && unsavedImages[msgs.id].length > 1 && unsavedImages[msgs.id].length <= 4\">\r\n                  <ion-row class=\"ion-justify-content-end\">\r\n                    <div class=\"ion-no-padding\" style=\"margin-right: 5px;\">\r\n                      <ion-grid class=\"ion-no-padding\">\r\n                        <ion-row class=\"img-grid\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                          <ion-col class=\"col-padding\" size=\"6\"\r\n                            *ngFor=\"let img of unsavedImages[msgs.id]; let imgIndex = index\">\r\n                            <div style=\"position: relative;\">\r\n                              <div style=\"box-shadow: none;\">\r\n                                <img class=\"loading\" *ngIf=\"img.url\" src=\"{{img.url}}\">\r\n                              </div>\r\n                              <div class=\"img-publish\">\r\n                               <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                               <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n                   <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n                   <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                               </div>\r\n                            </div>\r\n                          </ion-col>\r\n                        </ion-row>\r\n                      </ion-grid>\r\n                    </div>\r\n                    <div style=\"margin-right: 10px;\">\r\n                      <ion-avatar class=\"avatar-img\">\r\n                        <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                       \r\n                      </ion-avatar>\r\n                    </div>\r\n                  </ion-row>\r\n                </div>\r\n                <div *ngIf=\"unsavedImages[msgs.id] && unsavedImages[msgs.id].length > 4\">\r\n                  <ion-row class=\"ion-justify-content-end\">\r\n                    <div class=\"ion-no-padding\" style=\"margin-right: 5px;\">\r\n                      <ion-grid class=\"ion-no-padding\">\r\n                        <ion-row class=\"img-grid\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                          <ion-col class=\"col-padding\" size=\"6\"\r\n                            *ngFor=\"let img of [unsavedImages[msgs.id][0], unsavedImages[msgs.id][1], unsavedImages[msgs.id][2],unsavedImages[msgs.id][3]]; let imgIndex = index\">\r\n                            <div style=\"position: relative;\">\r\n                              <div style=\"box-shadow: none;\"\r\n                                *ngIf=\"imgIndex === 0 || imgIndex === 1 || imgIndex === 2\">\r\n                                <img class=\"loading\" *ngIf=\"img.url\" src=\"{{img.url}}\">\r\n                              </div>\r\n                              <div style=\"background-color: #000;box-shadow: none;\" *ngIf=\"imgIndex === 3\">\r\n                                <img class=\"loading img-opacity\" *ngIf=\"img.url\" src=\"{{img.url}}\">\r\n                                <div class=\"ion-no-padding\" class=\"img-count\">\r\n                                  + {{unsavedImages[msgs.id].length - 4}}\r\n                                </div>\r\n                              </div>\r\n                              <div class=\"img-publish\">\r\n                               <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                               <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n                   <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i>\r\n                   <i class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                               </div>\r\n                            </div>\r\n                          </ion-col>\r\n                        </ion-row>\r\n                      </ion-grid>\r\n                    </div>\r\n                    <div style=\"margin-right: 10px;\">\r\n                      <ion-avatar class=\"avatar-img\">\r\n                        <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                        \r\n                      </ion-avatar>\r\n                    </div>\r\n                  </ion-row>\r\n                </div>\r\n              </div>\r\n              <!-- /Admin Image -->\r\n       \r\n              <!-- Admin broadcast -->\r\n              <div *ngIf=\"msgs.msgData && msgs.msgData.author == 'admin' && msgs.msgData.type == 'broadcast'\">\r\n                <ion-row *ngIf=\"msgs.msgData.message\" class=\"ion-justify-content-end\">\r\n       \r\n                  <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-right': '5px'}\" class=\"message-admin\" style=\"text-align: left;\">\r\n                    <span [innerHtml]=\"messageModifications(msgs.msgData.message)\"></span>\r\n                    <h6 class=\"time\">\r\n                     <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                     <span *ngIf=\"isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toISOString() | dateAgo}}</span>\r\n                     <span *ngIf=\"!msgs.msgData.published\"><i class=\"flaticon-clock\"></i></span>\r\n                     <span *ngIf=\"msgs.msgData.published\"><i class=\"flaticon-check\"></i></span></h6>\r\n                  </div>\r\n       \r\n                  <div style=\"margin-right: 10px;\">\r\n                    <ion-avatar class=\"avatar-img\">\r\n                      <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                      \r\n                    </ion-avatar>\r\n                  </div>\r\n                </ion-row>\r\n                <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length === 1\"\r\n                  [ngClass]=\"{'img-broadcast b': msgs.msgData.message}\">\r\n                  <ion-row class=\"ion-justify-content-end\" *ngFor=\"let img of msgs.msgData.images\">\r\n                    <div class=\"ion-no-padding\" style=\"position: relative;\">\r\n                      <div [ngClass]=\"{'img-only-broadcast': !msgs.msgData.message}\">\r\n                        <img class=\"loading\" src=\"{{img.url}}\" (click)=\"imageZoom(img)\">\r\n                      </div>\r\n                      <div class=\"img-publish\">\r\n                        <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i><i\r\n                          class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                      </div>\r\n                    </div>\r\n                    <div *ngIf=\"!msgs.msgData.message\" style=\"margin-right: 10px;\">\r\n                      <ion-avatar class=\"avatar-img\">\r\n                        <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                        \r\n                      </ion-avatar>\r\n                    </div>\r\n                  </ion-row>\r\n                </div>\r\n                <div class=\"wrapper-container\" *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 1 && msgs.msgData.images.length <= 4\">\r\n                 \r\n                    <div class=\"ion-no-padding\" [ngClass]=\"{'img-broadcast half': msgs.msgData.message, 'img-only-broadcast': !msgs.msgData.message}\">\r\n                      <ion-grid class=\"ion-no-padding\">\r\n                        <ion-row class=\"img-grid\">\r\n                          <ion-col class=\"col-padding\" size=\"6\" *ngFor=\"let img of msgs.msgData.images; let imgIndex = index\">\r\n                            <div style=\"position: relative;\">\r\n                             \r\n                                <img class=\"loading\" src=\"{{img.url}}\" (click)=\"imageZoom(img)\">\r\n                              \r\n                              <div class=\"img-publish\">\r\n                                <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i><i\r\n                                  class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                              </div>\r\n                            </div>\r\n                          </ion-col>\r\n                        </ion-row>\r\n                      </ion-grid>\r\n                    </div>\r\n                    <div *ngIf=\"!msgs.msgData.message\" style=\"margin-right: 10px;\">\r\n                      <ion-avatar class=\"avatar-img\">\r\n                        <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                        \r\n                      </ion-avatar>\r\n                    </div>\r\n                 \r\n                </div>\r\n                <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 4\">\r\n                  <ion-row class=\"ion-justify-content-end\">\r\n                    <div class=\"ion-no-padding\"\r\n                      [ngClass]=\"{'img-broadcast a': msgs.msgData.message, 'img-only-broadcast': !msgs.msgData.message}\">\r\n                      <ion-grid class=\"ion-no-padding\">\r\n                        <ion-row class=\"img-grid\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                          <ion-col class=\"col-padding\" size=\"6\"\r\n                            *ngFor=\"let img of [msgs.msgData.images[0], msgs.msgData.images[1], msgs.msgData.images[2],msgs.msgData.images[3]]; let imgIndex = index\">\r\n                            <div style=\"position: relative;\">\r\n                              <div style=\"box-shadow: none;\"\r\n                                *ngIf=\"imgIndex === 0 || imgIndex === 1 || imgIndex === 2\">\r\n                                <img class=\"loading\" src=\"{{img.url}}\" (click)=\"imageZoom(img)\">\r\n                              </div>\r\n       \r\n                              <div style=\"background-color: #000;box-shadow: none;\" *ngIf=\"imgIndex === 3\"\r\n                                (click)=\"gridImageZoom(msgs.msgData.images)\">\r\n                                <img class=\"loading img-opacity\" src=\"{{img.url}}\">\r\n                                <div class=\"ion-no-padding\" class=\"img-count\">\r\n                                  + {{msgs.msgData.images.length - 4}}\r\n                                </div>\r\n                              </div>\r\n                              <div class=\"img-publish\">\r\n                                <i class=\"flaticon-clock clock-icon-image\" *ngIf=\"!msgs.msgData.published\"></i><i\r\n                                  class=\"flaticon-check clock-icon-image\" *ngIf=\"msgs.msgData.published\"></i>\r\n                              </div>\r\n                            </div>\r\n                          </ion-col>\r\n                        </ion-row>\r\n                      </ion-grid>\r\n                    </div>\r\n                    <div *ngIf=\"!msgs.msgData.message\" style=\"margin-right: 10px;\">\r\n                      <ion-avatar class=\"avatar-img\">\r\n                        <ion-img src=\"assets/img/admin-pic.png\" alt=\"\"></ion-img>\r\n                       \r\n                      </ion-avatar>\r\n                    </div>\r\n                  </ion-row>\r\n                </div>\r\n              </div>\r\n              <!-- /Admin broadcast -->\r\n       \r\n              <!-- User message -->\r\n              <ion-row class=\"ion-justify-content-start\"\r\n                *ngIf=\"msgs.msgData && msgs.msgData.author == 'user' && msgs.msgData.type == 'txt'\">\r\n                <div style=\"margin-left: 5px;\">\r\n                  <ion-avatar class=\"avatar-img\">\r\n                    <ion-img src=\"{{userDetails.dP}}\" alt=\"\"></ion-img>\r\n                  </ion-avatar>\r\n                </div>\r\n       \r\n                <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px'}\" class=\"message-user\">\r\n                  <ng-container\r\n                    *ngIf=\"msgs.msgData.source?.name == 'whatsapp' && msgs.msgData.source?.data?.mediaUrl; else noWAMediaUrl\">\r\n                    <span (click)=\"openDoc(msgs.msgData.source.data.mediaUrl)\" class=\"cursor-p\">\r\n                      <i class=\"flaticon-null-18 m-r-5\"></i>\r\n                      <span [innerHtml]=\"messageModifications(msgs.msgData.message)\" class=\"link\"></span>\r\n                    </span>\r\n                  </ng-container>\r\n                  <ng-template #noWAMediaUrl>\r\n                    <span [innerHtml]=\"messageModifications(msgs.msgData.message)\"></span>\r\n                  </ng-template>\r\n                  <h6 class=\"time\">\r\n                   <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                   </h6>\r\n                </div>\r\n                <div class=\"whatsapp-container\" *ngIf=\"msgs.msgData.source?.name == 'whatsapp'\">\r\n                  <img src=\"../../../assets/img/whatsapp.png\" alt=\"\">\r\n                </div>\r\n              </ion-row>\r\n              <!-- /User message -->\r\n       \r\n       \r\n              <!-- User image -->\r\n              <div *ngIf=\"msgs.msgData && msgs.msgData.author == 'user' && msgs.msgData.type == 'image'\" style=\"text-align: left;\">\r\n                <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length === 1\">\r\n                  <ion-row class=\"ion-justify-content-start\" *ngFor=\"let img of msgs.msgData.images\">\r\n                    <div style=\"margin-left: 5px;\">\r\n                      <ion-avatar class=\"avatar-img\">\r\n                        <ion-img src=\"{{userDetails.dP}}\" alt=\"\"></ion-img>\r\n                        \r\n                      </ion-avatar>\r\n                    </div>\r\n                    <div class=\"ion-no-padding\" class=\"m-left\" style=\"position: relative;\">\r\n                      <div>\r\n                        <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                        <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                      </div>\r\n                      <div class=\"img-publish\">\r\n                       <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                       </div>\r\n                    </div>\r\n                  </ion-row>\r\n                </div>\r\n       \r\n                <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 1 && msgs.msgData.images.length <= 4\">\r\n                  <ion-row class=\"ion-justify-content-start\">\r\n                    <div style=\"margin-left: 5px;\">\r\n                      <ion-avatar class=\"avatar-img\">\r\n                        <ion-img src=\"{{userDetails.dP}}\" alt=\"\"></ion-img>\r\n                        \r\n                      </ion-avatar>\r\n                    </div>\r\n                    <div class=\"ion-no-padding\" style=\"position: relative;\">\r\n                      <ion-grid class=\"ion-no-padding\" style=\"padding-left: 0px;\">\r\n                        <ion-row class=\"img-grid-user\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                          <ion-col class=\"col-padding\" size=\"6\" *ngFor=\"let img of msgs.msgData.images; let imgIndex = index\">\r\n                            <div style=\"position: relative;\">\r\n                             <div style=\"box-shadow: none;\">\r\n                               <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                               <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                             </div>\r\n                             <div class=\"img-publish\">\r\n                               <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                               </div>\r\n                            </div>\r\n                          </ion-col>\r\n                        </ion-row>\r\n                      </ion-grid>\r\n                      <h6 class=\"time\" style=\"margin-left: 5px;\">\r\n                       <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                       </h6>\r\n                    </div>\r\n                  </ion-row>\r\n                </div>\r\n       \r\n                <div *ngIf=\"msgs.msgData.images && msgs.msgData.images.length > 4\">\r\n                  <ion-row class=\"ion-justify-content-start\">\r\n                    <div style=\"margin-left: 5px;\">\r\n                      <ion-avatar class=\"avatar-img\">\r\n                        <ion-img src=\"{{userDetails.dP}}\" alt=\"\"></ion-img>\r\n                        \r\n                      </ion-avatar>\r\n                    </div>\r\n                    <div class=\"ion-no-padding\">\r\n                      <ion-grid class=\"ion-no-padding\" style=\"padding-left: 0px;\">\r\n                        <ion-row class=\"img-grid-user\" [ngStyle]=\"{'width': imgGridWidth + 'px'}\">\r\n                          <ion-col class=\"col-padding\" size=\"6\"\r\n                            *ngFor=\"let img of [msgs.msgData.images[0], msgs.msgData.images[1], msgs.msgData.images[2],msgs.msgData.images[3]]; let imgIndex = index\">\r\n                            <div style=\"position: relative;\">\r\n                             <div style=\"box-shadow: none;\"\r\n                             *ngIf=\"imgIndex === 0 || imgIndex === 1 || imgIndex === 2\">\r\n                             <img class=\"loading\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                             <img class=\"loading\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                           </div>\r\n                           <div style=\"background-color: #000;box-shadow: none;\" *ngIf=\"imgIndex === 3\"\r\n                             (click)=\"gridImageZoom(msgs.msgData.images)\">\r\n                             <img class=\"loading img-opacity\" *ngIf=\"useThumb\" src=\"{{img.thumb}}\" (click)=\"imageZoom(img)\">\r\n                             <img class=\"loading img-opacity\" *ngIf=\"!useThumb\" src=\"{{img.mob}}\" (click)=\"imageZoom(img)\">\r\n                             <div class=\"ion-no-padding\" class=\"img-count\">\r\n                               + {{msgs.msgData.images.length - 4}}\r\n                             </div>\r\n                           </div>\r\n                           <div class=\"img-publish\">\r\n                             <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                             </div>\r\n                            </div>\r\n                            \r\n                          </ion-col>\r\n                        </ion-row>\r\n                      </ion-grid>\r\n                      <h6 class=\"time\" style=\"margin-left: 5px;\">\r\n                       <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                       </h6>\r\n                    </div>\r\n                  </ion-row>\r\n                </div>\r\n              </div>\r\n              <!-- /User image -->\r\n       \r\n              <!-- User order -->\r\n              <ion-row\r\n                *ngIf=\"msgs.msgData && msgs.msgData.author == 'user' && msgs.msgData.type == 'order'\">\r\n                <div style=\"margin-left: 5px;\">\r\n                 <ion-avatar class=\"avatar-img\">\r\n                   <ion-img src=\"{{userDetails.dP}}\" alt=\"\"></ion-img>\r\n                   \r\n                 </ion-avatar>\r\n               </div>\r\n       \r\n               <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-user\" *ngIf=\"msgs.msgData.status=='Pending'\" style=\"text-align: left;\">\r\n                 <span>New Order Placed</span>\r\n                   <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n                   <div style=\"text-align: center;margin-top: -10px;\">\r\n                     <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" fill=\"outline\" style=\"color: black;margin-top: 12px;margin-bottom: 12px;\">\r\n                       View Order\r\n                     </ion-button>\r\n                   </div>\r\n                   <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n                     <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                     </h6>\r\n               </div>\r\n               <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-user\" *ngIf=\"msgs.msgData.status=='Cancelled'\" style=\"text-align: left;\">\r\n                 <span>Order is Cancelled</span>\r\n                   <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n                   <div style=\"text-align: center;margin-top: -10px;\">\r\n                     <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" fill=\"outline\" style=\"color: black;margin-top: 12px;margin-bottom: 12px;\">\r\n                       View Order\r\n                     </ion-button>\r\n                   </div>\r\n                   <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n                     <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                     </h6>\r\n               </div>\r\n               <div [ngStyle]=\"{'max-width': maxMessageWidth + 'px', 'margin-left': '5px', 'padding': '13px 13px 0px 13px'}\" class=\"message-user\" *ngIf=\"msgs.msgData.status=='PaymentMsg'\" style=\"text-align: left;\">\r\n                 <span>Payment is successful</span>\r\n                   <p>Order Id: ORD{{msgs.msgData.orderId}}</p>\r\n                   <div style=\"text-align: center;margin-top: -10px;\">\r\n                     <ion-button (click)=\"onClickViewOrder(msgs.msgData.orderId)\" fill=\"outline\" style=\"color: black;margin-top: 12px;margin-bottom: 12px;\">\r\n                       View Order\r\n                     </ion-button>\r\n                   </div>\r\n                   <h6 class=\"time\" style=\"margin-top: -3px;margin-bottom: 10px;\">\r\n                     <span *ngIf=\"!isDate(msgs.msgData.createdAt)\">{{msgs.msgData.createdAt.toDate().toISOString() | dateAgo}}</span>\r\n                     </h6>\r\n               </div>\r\n              </ion-row>\r\n              <!-- /User order -->\r\n              </div>\r\n          </ion-grid>\r\n          <ion-grid style=\"height: 30vh;\">\r\n            <ion-row align-items-center class=\"ion-no-padding\" style=\"height: 25vh;flex-wrap: wrap;align-content: flex-end;\">\r\n              <ion-col>\r\n                <div class=\"textarea-div ion-no-padding\">\r\n                  <textarea class=\"textareaElement\" #myInput rows=\"1\" (keyup.enter)=\"sendMessage()\" [(ngModel)]=\"adminMsgText\"\r\n                    placeholder=\"Type a message...\" (ngModelChange)=\"changeInMsgInput();\"></textarea>\r\n                </div>&nbsp;\r\n                <div style=\"display:flex;justify-content: space-between\">\r\n                <div class=\"upload-btn-wrapper\">\r\n                  <ion-button class=\"btn-2 i-start\" style=\"margin-right: 0px;\"> <i class=\"flaticon-null-16\"></i>&nbsp;Image</ion-button>\r\n                  <input type=\"file\" name=\"myfile\" (change)=\"uploadImage($event.target.files)\" accept=\"image/*\" />\r\n                </div>&nbsp;\r\n                <div class=\"upload-btn-wrapper\">\r\n                  <ion-button class=\"btn-2 i-start\" (mousedown)=\"preventFocusChange($event)\" (click)=\"sendMessage()\">\r\n                    <i class=\"flaticon-null-1\"></i> Send Message \r\n                      <span *ngIf=\"sendToWhatsapp\"> &nbsp;+ \r\n                        <img src=\"../../../assets/img/whatsapp.png\" style=\"width: 20px; height: 20px\"></span> \r\n                   </ion-button>\r\n                </div>\r\n              </div>\r\n              <div class=\"wa-text-container\">\r\n                <ion-text color=\"danger\" *ngIf=\"whatsapp\">\r\n                  <p>According to WhatsApp policy you need to send Template if your session of 24hr expires with the user. <b (click)=\"sendWATemplate()\" class=\"cursor-p\">CLICK HERE </b>to send the template.</p>\r\n                </ion-text>\r\n              </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </ion-col>\r\n        <ion-col style=\"border-left: 1px solid lightgray;\" id='scroll3'>\r\n          <div>\r\n            <p style=\"font-weight: bold;text-align: center;font-size: medium\">Details</p>\r\n            <div class=\"inline-align\" *ngIf=\"registeredDate\">\r\n              <h6>\r\n                Registered On:\r\n              </h6>&nbsp;&nbsp;\r\n              <h6>\r\n                {{getDateTimeFormat(registeredDate.toDate())}}\r\n              </h6>\r\n            </div>\r\n            <div class=\"inline-align\" *ngIf=\"lastActiveDate\">\r\n              <h6>\r\n                Last Active On:\r\n              </h6>&nbsp;&nbsp;\r\n              <h6>\r\n                {{getDateTimeFormat(lastActiveDate.toDate())}}\r\n              </h6>\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"!transactions.length\" text-center>\r\n            <h6>No wallet transactions</h6>\r\n          </div>\r\n          <div *ngIf=\"transactions.length\">\r\n            <div class=\"inline-align\">\r\n              <h6>\r\n                Wallet Balance:\r\n              </h6>&nbsp;&nbsp;\r\n              <h6>\r\n                {{balance | currency:currencyCode:true}}\r\n              </h6>\r\n            </div>\r\n            <div class=\"inline-align\">\r\n              <h6>\r\n                Cashback Balance:\r\n              </h6>&nbsp;&nbsp;\r\n              <h6>\r\n                {{cashbackBalance | currency:currencyCode:true}}\r\n              </h6>\r\n            </div>\r\n          </div>\r\n          <div class=\"divider\"></div>\r\n          <div class=\"spinner\" *ngIf=\"ordersLoader; else ordersLoaded;\">\r\n            <ion-spinner color=\"primary\"></ion-spinner>\r\n          </div>  \r\n          <ng-template #ordersLoaded>\r\n            <p style=\"font-weight: bold;text-align: center;font-size: medium;\">Orders&nbsp;<span *ngIf=\"orders && orders.length > 0\">({{orders.length}})</span></p>\r\n            <div *ngIf=\"!orders.length; else ordersHasLength;\" text-center>\r\n              <h6>No orders yet</h6>\r\n            </div>\r\n            <ng-template #ordersHasLength>\r\n              <div *ngFor=\"let order of orders; let i=index\">\r\n                <div class=\"aud-order-id\">\r\n                  Order Id: ORD{{order.orderId}}\r\n                </div>\r\n                <div class=\"aud-products-container\">\r\n                  <div class=\"aud-placed-on\" *ngIf=\"order.createdAt\">\r\n                    Placed On {{order.createdAt.toDate() | date}} by <span>{{order.userName}}</span>\r\n                  </div>\r\n                  <ion-list class=\"ion-no-padding\" lines=\"none\" *ngIf=\"order?.products[0]\">\r\n                    <ion-item class=\"ion-no-padding\">\r\n                      <div slot=\"start\" *ngIf='order.products[0].img'\r\n                        [ngStyle]=\"{'background': 'url(' + order.products[0].img.mob + ') no-repeat center', 'background-size': 'contain'}\"\r\n                        class=\"aud-product-image\">\r\n                        <div class=\"aud-more\" *ngIf=\"order.products.length > 1\">+ {{order.products.length - 1}} more</div>\r\n                      </div>\r\n                      <div slot=\"start\" *ngIf='!order.products[0].img'\r\n                        [ngStyle]=\"{'background': 'url(' + '../../../assets/img/no-product.png' + ') no-repeat center', 'background-size': 'contain'}\"\r\n                        class=\"aud-product-image\">\r\n                        <div class=\"aud-more\" *ngIf=\"order.products.length > 1\">+ {{order.products.length - 1}} more</div>\r\n                      </div>\r\n                      <ion-label>\r\n                        <h2 class=\"aud-product-price ion-text-wrap\">\r\n                          {{order.totalAmountToPaid | currency: currencyCode:true:'0.0'}}\r\n                        </h2>\r\n                        <h2 class=\"aud-product-name ion-text-wrap\">{{order.products[0].name}} <span\r\n                            *ngIf=\"order.products.length > 1\">+ {{order.products.length - 1}} more</span>\r\n                        </h2>\r\n                        <h3>{{order.status}}<span><i class=\"flaticon-null-20\"></i></span></h3>\r\n                      </ion-label>\r\n                    </ion-item>\r\n                    <div class=\"aud-action-btn\"\r\n                      *ngIf=\"order.deliveryStatus === 'inProgress' && (order.status === 'Confirmed' || order.status === 'Dispatched'); else showOnlyViewOrder\">\r\n                      <ion-grid>\r\n                        <ion-row class=\"ion-justify-content-center\" style=\"opacity: .6;font-size: small;\">\r\n                          <ion-col size=\"12\">\r\n                            Delivery agent has started delivery\r\n                          </ion-col>\r\n                        </ion-row>\r\n                        <ion-row>\r\n                          <ion-col size=\"6\">\r\n                            <ion-button (click)=\"onClickViewDetails(order.orderId)\" size=\"small\" shape=\"round\">\r\n                              View Order\r\n                            </ion-button>\r\n                          </ion-col>\r\n                          <ion-col size=\"6\">\r\n                            <ion-button (click)=\"onClickTrackOrder(order.deliveryAgentId, order.deliveryLatLng)\"\r\n                              size=\"small\" shape=\"round\">\r\n                              Track Order\r\n                            </ion-button>\r\n                          </ion-col>\r\n                        </ion-row>\r\n                      </ion-grid>\r\n                    </div>\r\n                    <ng-template #showOnlyViewOrder>\r\n                      <div class=\"aud-view-details-btn\">\r\n                        <ion-button (click)=\"onClickViewDetails(order.orderId)\" size=\"small\" shape=\"round\">\r\n                          View Order\r\n                        </ion-button>\r\n                      </div>\r\n                    </ng-template>\r\n                  </ion-list>\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n          </ng-template>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n</div>\r\n</ion-content>\r\n\r\n"

/***/ }),

/***/ "./src/app/admin/admin-home/admin-home.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/admin/admin-home/admin-home.module.ts ***!
  \*******************************************************/
/*! exports provided: AdminHomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminHomePageModule", function() { return AdminHomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-home.page */ "./src/app/admin/admin-home/admin-home.page.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var src_app_pipes_application_pipes_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/pipes/application-pipes.module */ "./src/app/pipes/application-pipes.module.ts");









var routes = [
    {
        path: '',
        component: _admin_home_page__WEBPACK_IMPORTED_MODULE_6__["AdminHomePage"]
    }
];
var AdminHomePageModule = /** @class */ (function () {
    function AdminHomePageModule() {
    }
    AdminHomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__["Ng2SearchPipeModule"],
                src_app_pipes_application_pipes_module__WEBPACK_IMPORTED_MODULE_8__["ApplicationPipesModule"]
            ],
            declarations: [_admin_home_page__WEBPACK_IMPORTED_MODULE_6__["AdminHomePage"]],
        })
    ], AdminHomePageModule);
    return AdminHomePageModule;
}());



/***/ }),

/***/ "./src/app/admin/admin-home/admin-home.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/admin/admin-home/admin-home.page.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".btn-wrap {\n  margin-bottom: 16px;\n  text-align: right;\n}\n\n.messages-wrapper .message-wrap {\n  padding: 16px;\n  cursor: pointer;\n  border-top: var(--ion-color-light) 1px solid;\n  position: relative;\n}\n\n.messages-wrapper .message-wrap:hover {\n  background: var(--ion-color-light);\n}\n\n.messages-wrapper .message-wrap .user-name {\n  font-weight: 500;\n}\n\n.messages-wrapper .message-wrap .b-time {\n  position: absolute;\n  right: 16px;\n  color: var(--ion-color-gray);\n}\n\n.admin-chat-toolbar ion-title {\n  margin-right: 0px;\n  margin-bottom: 0px;\n}\n\n.user-last-seen {\n  text-transform: lowercase;\n  opacity: 0.8;\n  font-size: 10px;\n  margin-top: 2px;\n}\n\n.img-publish {\n  background: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(transparent));\n  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent);\n  bottom: 0;\n  height: 28px;\n  position: absolute;\n  width: 140px;\n  z-index: 2;\n  color: white;\n  border-radius: 3px;\n}\n\n.flaticon-clock::before {\n  font-size: 10px;\n  color: black;\n  opacity: 0.5;\n  position: absolute;\n  right: 5px;\n  margin-top: 1px;\n  font-weight: 600;\n}\n\n.flaticon-check::before {\n  font-size: 10px;\n  color: #8db8f7;\n  position: absolute;\n  right: 2px;\n  margin-top: 1px;\n  font-weight: 600;\n}\n\n.flaticon-send::before {\n  color: var(--ion-color-primary);\n  font-size: 25px;\n  margin-left: -10px;\n}\n\n.clock-icon-image::before {\n  bottom: 5px;\n  color: white;\n  bottom: 5px;\n}\n\n.up-icon-btn {\n  --background: none;\n}\n\n.msg-content {\n  display: -webkit-inline-box;\n  display: inline-flex;\n}\n\n.search-message {\n  border: 1px solid #ccc;\n  border-radius: 25px;\n}\n\n.margining {\n  margin-top: 10px;\n  margin-right: 20px;\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n\n.message-admin {\n  padding: 13px;\n  color: var(--ion-color-dark);\n  border: 1px solid #c3dbff;\n  border-top-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n  border-bottom-left-radius: 10px;\n  text-align: right;\n  box-shadow: 0px 1px 2px #ccc;\n  white-space: pre-wrap;\n  font-size: 14px;\n  word-wrap: break-word;\n  position: relative;\n  -webkit-user-select: auto;\n     -moz-user-select: auto;\n      -ms-user-select: auto;\n          user-select: auto;\n  margin-bottom: 7px;\n}\n\n.message-user {\n  padding: 13px;\n  color: var(--ion-color-dark);\n  background-color: #F2F5FC;\n  border: 1px solid #c3dbff;\n  box-shadow: 0px 1px 2px #ccc;\n  border-top-right-radius: 10px;\n  border-bottom-right-radius: 10px;\n  border-bottom-left-radius: 10px;\n  text-align: justify;\n  font-size: 14px;\n  margin-left: -16px;\n  margin-right: 5px;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  position: relative;\n  -webkit-user-select: auto;\n     -moz-user-select: auto;\n      -ms-user-select: auto;\n          user-select: auto;\n  margin-bottom: 7px;\n}\n\n.avatar-img {\n  margin-top: 2px;\n  border: 1px solid #ddd;\n  padding: 2px;\n  box-shadow: 0px 3px 3px 0px #e8e8e8;\n  height: 40px;\n  width: 40px;\n}\n\n.time {\n  font-size: 10px;\n  color: black;\n  opacity: 0.5;\n  margin-top: 5px;\n  margin-bottom: 0px;\n}\n\n.img-publish span {\n  color: white;\n  position: absolute;\n  bottom: 5px;\n  font-size: 10px;\n  right: 15px;\n}\n\n.up-icon-active {\n  color: var(--ion-color-primary);\n  font-size: 30px;\n  margin-left: -20px;\n}\n\n.up-icon-disabled {\n  color: #ccc;\n  font-size: 30px;\n  margin-left: -20px;\n}\n\n.add-icon-disabled {\n  font-size: 25px;\n  color: #a39797;\n  position: relative;\n  left: -8px;\n}\n\n.add-icon-active {\n  font-size: 25px;\n  color: var(--ion-color-primary);\n  position: relative;\n  left: -8px;\n}\n\n.message-input {\n  border: 1px solid #ccc;\n  border-radius: 25px;\n  width: 100%;\n  background: #fff;\n  resize: none;\n  padding-left: 10px;\n  padding-right: 10px;\n  padding-top: 20px;\n  outline: none;\n}\n\n.textareaElement {\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  outline: none;\n  padding: 10px;\n  max-height: 100px;\n  width: 100%;\n  margin-top: 6px;\n  font-size: 13px;\n  margin-left: -5px;\n  -webkit-appearance: none;\n}\n\n.your-order {\n  text-align: right;\n  margin: 0px;\n}\n\n.product-info {\n  margin: 0px;\n  text-transform: uppercase;\n}\n\n.product-data {\n  margin: 0px;\n}\n\n.divider {\n  background: #C8D7E9;\n  height: 1px;\n}\n\nion-thumbnail {\n  --size: 140px;\n  border: 1px solid #c3dbff;\n  border-radius: 3px;\n  box-shadow: 0px 1px 2px #ccc;\n}\n\n.support-icon:before {\n  font-size: 30px;\n}\n\n.flaticon-null-22::before {\n  color: #ccc;\n  margin: 10px;\n}\n\n.flaticon-null-19::before {\n  font-size: 20px;\n}\n\n.close-btn {\n  position: absolute;\n  color: #ccc;\n  right: 2px;\n}\n\nion-input {\n  --padding-bottom: 3px;\n  --padding-top: 5px;\n  --padding-start: 10px;\n  --padding-end: 10px;\n}\n\n.ion-no-padding, [no-padding] {\n  --padding-start: 0px;\n  --padding-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  padding-left: 5px;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\n:host .item-interactive.ion-valid {\n  --highlight-background: none;\n}\n\n.bottom-border {\n  border-bottom: 1px solid #ccc;\n}\n\n.top-border {\n  border-top: 1px solid #ccc;\n  margin-bottom: constant(safe-area-inset-bottom);\n  /* iOS 11.0 */\n  margin-bottom: env(safe-area-inset-bottom);\n  /* iOS 11.2 */\n}\n\n.message-box {\n  position: relative;\n}\n\n.no-msgs {\n  color: #ccc;\n  font-size: 13px;\n}\n\nion-spinner {\n  width: 20px !important;\n  height: 20px !important;\n}\n\n.loading {\n  background: transparent url(\"https://s5.gifyu.com/images/loaderbb19efcc2749e115.gif\") center no-repeat;\n}\n\n.spinner {\n  margin-top: 50%;\n  text-align: center;\n}\n\n.img-broadcast {\n  margin-top: 5px;\n  margin-right: 55px;\n  margin-bottom: 5px;\n}\n\n.img-order {\n  margin-left: 55px;\n  margin-top: 5px;\n}\n\n.m-left {\n  margin-left: 5px;\n}\n\n.img-admin {\n  margin-right: 55px;\n  margin-top: 5px;\n}\n\n.img-grid {\n  border: 1px solid #c3dbff;\n  border-top-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n  border-bottom-left-radius: 10px;\n  box-shadow: 0px 1px 2px 0px #ccc;\n}\n\n.img-grid-user {\n  border: 1px solid #c3dbff;\n  background-color: #F2F5FC;\n  border-top-right-radius: 10px;\n  border-bottom-right-radius: 10px;\n  border-bottom-left-radius: 10px;\n  box-shadow: 0px 1px 2px 0px #ccc;\n}\n\n.img-opacity {\n  opacity: 0.5;\n}\n\n.img-count {\n  position: relative;\n  text-align: center;\n  bottom: 90px;\n  font-size: 30px;\n  color: white;\n}\n\n.flaticon-null-23::before {\n  font-weight: 600;\n}\n\n.img-only-broadcast {\n  margin-right: 5px;\n}\n\nion-thumbnail.product-img {\n  --size: 130px;\n}\n\n.order-rows {\n  border-bottom: 1px solid #c3dbff;\n  padding: 5px;\n}\n\n.p-delete {\n  text-decoration: underline;\n}\n\n@media screen and (max-width: 375px) {\n  ion-thumbnail {\n    --size: 122px;\n  }\n\n  .img-count {\n    bottom: 80px;\n  }\n\n  .message-user {\n    margin-left: -10px;\n  }\n\n  .img-publish {\n    width: 122px;\n  }\n}\n\n@media screen and (max-width: 360px) {\n  ion-thumbnail {\n    --size: 115px;\n  }\n\n  .img-count {\n    bottom: 75px;\n  }\n\n  .message-user {\n    margin-left: -10px;\n  }\n\n  .img-publish {\n    width: 115px;\n  }\n\n  /* .flaticon-send::before{\n       font-size: 22px;\n       margin-left: -13px;\n   }*/\n}\n\n@media screen and (max-width: 320px) {\n  ion-thumbnail {\n    --size: 95px;\n  }\n\n  .img-count {\n    bottom: 66px;\n    font-size: 25px;\n  }\n\n  .img-publish {\n    width: 95px;\n  }\n\n  .flaticon-send::before {\n    font-size: 20px;\n    margin-left: -13px;\n  }\n\n  ion-thumbnail.product-img {\n    --size: 110px;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .message-user {\n    margin-left: -50px;\n  }\n\n  .m-left {\n    margin-left: 5px;\n  }\n\n  ion-thumbnail {\n    --size: 222px;\n  }\n\n  .img-count {\n    bottom: 136px;\n    font-size: 40px;\n  }\n\n  .col-padding {\n    padding: 8px;\n  }\n\n  .textareaElement {\n    font-size: 16px;\n  }\n\n  .img-publish {\n    width: 222px;\n  }\n\n  ion-thumbnail.product-img {\n    --size: 200px;\n  }\n}\n\n@media screen and (min-width: 700px) {\n  .col-padding {\n    padding: 12px;\n  }\n\n  ion-thumbnail {\n    --size: 273px;\n  }\n\n  .img-publish {\n    width: 273px;\n  }\n\n  .img-count {\n    bottom: 165px;\n    font-size: 40px;\n  }\n\n  .message-admin {\n    font-size: 20px;\n  }\n\n  .message-user {\n    font-size: 20px;\n    margin-left: -55px;\n  }\n\n  .avatar-img {\n    height: 60px;\n    width: 60px;\n  }\n\n  .img-broadcast {\n    margin-right: 75px;\n  }\n\n  .img-order {\n    margin-left: 75px;\n  }\n\n  .m-left {\n    margin-left: 5px;\n  }\n\n  .img-admin {\n    margin-right: 75px;\n  }\n\n  .up-icon-active {\n    font-size: 40px;\n    margin-left: -5px;\n  }\n\n  .up-icon-disabled {\n    font-size: 40px;\n    margin-left: -5px;\n  }\n\n  .add-icon-disabled {\n    font-size: 40px;\n    right: -10px;\n  }\n\n  .add-icon-active {\n    font-size: 40px;\n    right: -10px;\n  }\n\n  .textareaElement {\n    font-size: 20px;\n  }\n\n  .flaticon-send::before {\n    font-size: 40px;\n  }\n\n  ion-thumbnail.product-img {\n    --size: 235px;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  ion-thumbnail {\n    --size: 370px;\n  }\n\n  .img-publish {\n    width: 370px;\n  }\n\n  .img-count {\n    bottom: 220px;\n    font-size: 50px;\n  }\n\n  .message-admin {\n    font-size: 25px;\n  }\n\n  .message-user {\n    margin-left: -85px;\n    font-size: 25px;\n  }\n\n  .avatar-img {\n    height: 40px;\n    width: 40px;\n  }\n\n  .img-broadcast {\n    margin-right: 85px;\n  }\n\n  .img-order {\n    margin-left: 85px;\n  }\n\n  .img-admin {\n    margin-right: 85px;\n  }\n\n  .up-icon-active {\n    font-size: 50px;\n    margin-left: -5px;\n  }\n\n  .up-icon-disabled {\n    font-size: 50px;\n    margin-left: -5px;\n  }\n\n  .add-icon-disabled {\n    font-size: 50px;\n    right: -10px;\n  }\n\n  .add-icon-active {\n    font-size: 50px;\n    right: -10px;\n  }\n\n  .textareaElement {\n    font-size: 25px;\n  }\n\n  .flaticon-send::before {\n    font-size: 45px;\n  }\n\n  ion-thumbnail.product-img {\n    --size: 300px;\n  }\n}\n\n.wrapper-container {\n  float: none;\n  clear: both;\n  overflow: hidden;\n}\n\n.img-broadcast.half {\n  width: 50%;\n  float: right;\n}\n\n.img-publish {\n  width: 100% !important;\n}\n\n.fixed-height {\n  max-height: calc(100vh - 315px);\n  overflow-y: scroll;\n  padding: 16px;\n}\n\n.btn-wrapper {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n\n.inline-align {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.inline-align h6 {\n  font-size: 15px;\n}\n\n.no-data {\n  margin: 0;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  left: 50%;\n  margin-left: -65px;\n}\n\n.no-data img {\n  width: 130px;\n}\n\nion-content {\n  --background: #F2F2F2;\n  --padding-bottom: 50px;\n}\n\nion-list {\n  border-radius: 5px;\n}\n\n.aud-products-container {\n  margin: 0px 10px 10px 10px;\n  background: white;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 15px 5px 10px 2px;\n  position: relative;\n}\n\n.aud-product-image {\n  background: transparent url('img-preloader.png') center no-repeat;\n  width: 85px;\n  height: 85px;\n  position: relative;\n  left: 15px;\n  border: 1px solid #f0f0f0;\n}\n\n.aud-more {\n  background: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(transparent));\n  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent);\n  bottom: 0;\n  height: 20px;\n  position: absolute;\n  width: 84px;\n  z-index: 2;\n  color: white;\n  font-size: 12px;\n  text-align: center;\n  padding: 5px;\n}\n\n.aud-product-name {\n  font-size: 14px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.aud-product-price {\n  color: var(--ion-color-primary);\n  font-size: 18px;\n}\n\n.spinner {\n  margin-top: 50%;\n  text-align: center;\n}\n\n.aud-placed-on {\n  font-size: 12px;\n  text-align: center;\n  opacity: 0.7;\n  margin-bottom: 3%;\n}\n\n.aud-placed-on span {\n  font-weight: 600;\n}\n\n.aud-order-id {\n  margin: 15px 10px 1px;\n  opacity: 0.8;\n  font-size: 13px;\n}\n\n.aud-action-btn {\n  text-align: center;\n}\n\n.aud-view-details-btn {\n  text-align: center;\n}\n\nspan .flaticon-null-20::before {\n  color: var(--ion-color-success);\n  margin-left: 2px;\n}\n\nspan .flaticon-null-19::before {\n  color: var(--ion-color-danger);\n  margin-left: 2px;\n}\n\n.address-card {\n  background: white;\n  padding: 10px;\n  margin: 6px 12px 12px 12px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.user-name {\n  font-size: 15px;\n}\n\n.address {\n  font-size: 13px;\n}\n\n.phone-no {\n  font-size: 13px;\n  margin-bottom: -5px;\n}\n\n.trans-wrapper {\n  margin-top: 15px;\n  padding-bottom: 50px;\n}\n\n.trans-conatiner {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 15px;\n  margin-bottom: 15px;\n  background-color: white;\n}\n\n.trans-type {\n  font-weight: bold;\n  font-size: small;\n}\n\n.trans-msg {\n  margin-top: 0px;\n}\n\n.trans-date {\n  font-size: 12px;\n  opacity: 0.6;\n}\n\n.cancel-btn {\n  background-color: var(--ion-color-dark);\n  color: white;\n}\n\n.cancel-btn div {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.save-btn {\n  background-color: var(--ion-color-primary);\n  color: var(--ion-color-primary-contrast);\n}\n\n.margin-icon {\n  margin-left: 5px;\n}\n\nion-footer ion-title {\n  height: 45px;\n}\n\n.bottom-buttons {\n  font-size: 14px;\n  margin-left: 5px;\n}\n\n.userInfo {\n  border: none;\n  width: 100vw;\n  height: 15vh;\n  padding: 10px;\n  outline: none;\n}\n\n.divider {\n  border-bottom: solid 1px var(--ion-color-medium);\n  margin: 26px 0;\n}\n\n.ion-justify-content-end {\n  display: -webkit-box;\n  display: flex;\n  flex-wrap: nowrap;\n}\n\nimg {\n  max-height: 500px;\n  max-width: 500px;\n}\n\n.badge {\n  position: absolute;\n  margin-left: 5px;\n  padding: 2px 6px;\n  background-color: var(--ion-color-primary);\n  border-radius: 25px;\n  color: var(--ion-color-primary-contrast);\n  margin-top: -2px;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 70.5vh;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 65vh;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n#scroll3 {\n  overflow: hidden;\n  height: 80vh;\n}\n\n#scroll3:hover {\n  overflow-y: auto;\n}\n\n.whatsapp-container {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n\n.whatsapp-container img {\n  width: 25px;\n  height: 25px;\n  margin-top: auto;\n}\n\n.wa-text-container {\n  margin-bottom: -13px;\n  margin-top: 10px;\n}\n\n.m-r-5 {\n  margin-right: 5px;\n}\n\n.link {\n  text-decoration: underline;\n}\n\n.error-icon {\n  margin-top: auto;\n  font-size: 18px;\n}\n\n.red {\n  color: red;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1 {\n    height: 82.5vh;\n  }\n\n  #scroll2 {\n    height: 72vh;\n  }\n\n  #scroll3 {\n    height: 92vh;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4taG9tZS9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGFkbWluLWhvbWVcXGFkbWluLWhvbWUucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hZG1pbi1ob21lL2FkbWluLWhvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksbUJBQUE7RUFDQSxpQkFBQTtBQ0NKOztBREdJO0VBQ0ksYUFBQTtFQUNBLGVBQUE7RUFDQSw0Q0FBQTtFQUNBLGtCQUFBO0FDQVI7O0FEQ1E7RUFDSSxrQ0FBQTtBQ0NaOztBREVRO0VBQ0ksZ0JBQUE7QUNBWjs7QURHUTtFQUNJLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLDRCQUFBO0FDRFo7O0FETUE7RUFDSSxpQkFBQTtFQUNBLGtCQUFBO0FDSEo7O0FETUE7RUFDSSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBQ0hKOztBREtBO0VBQ0ksc0dBQUE7RUFBQSxrRUFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQ0ZKOztBRElBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FDREo7O0FESUE7RUFDSSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQ0RKOztBREdBO0VBQ0ksK0JBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUNBSjs7QURFQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQ0NKOztBRENBO0VBQ0ksa0JBQUE7QUNFSjs7QURBQTtFQUNJLDJCQUFBO0VBQUEsb0JBQUE7QUNHSjs7QUREQTtFQUNJLHNCQUFBO0VBQ0EsbUJBQUE7QUNJSjs7QURG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cHAvYWRtaW4vYWRtaW4taG9tZS9hZG1pbi1ob21lLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5idG4td3JhcCB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbn1cclxuXHJcbi5tZXNzYWdlcy13cmFwcGVyIHtcclxuICAgIC5tZXNzYWdlLXdyYXAge1xyXG4gICAgICAgIHBhZGRpbmc6IDE2cHg7XHJcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgIGJvcmRlci10b3A6IHZhcigtLWlvbi1jb2xvci1saWdodCkgMXB4IHNvbGlkO1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICAmOmhvdmVye1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnVzZXItbmFtZSB7XHJcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuYi10aW1lIHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgICByaWdodDogMTZweDtcclxuICAgICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmF5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi5hZG1pbi1jaGF0LXRvb2xiYXIgaW9uLXRpdGxlIHtcclxuICAgIG1hcmdpbi1yaWdodDogMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMHB4O1xyXG59XHJcblxyXG4udXNlci1sYXN0LXNlZW4ge1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IGxvd2VyY2FzZTtcclxuICAgIG9wYWNpdHk6IC44O1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMnB4O1xyXG59XHJcbi5pbWctcHVibGlzaHtcclxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgwZGVnLHJnYmEoMCwwLDAsLjUpLHRyYW5zcGFyZW50KTtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIGhlaWdodDogMjhweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHdpZHRoOiAxNDBweDtcclxuICAgIHotaW5kZXg6IDI7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbn1cclxuLmZsYXRpY29uLWNsb2NrOjpiZWZvcmV7XHJcbiAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICBvcGFjaXR5OiAwLjU7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICByaWdodDogNXB4O1xyXG4gICAgbWFyZ2luLXRvcDogMXB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuXHJcbn1cclxuLmZsYXRpY29uLWNoZWNrOjpiZWZvcmV7XHJcbiAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICBjb2xvcjogIzhkYjhmNztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHJpZ2h0OiAycHg7XHJcbiAgICBtYXJnaW4tdG9wOiAxcHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG59XHJcbi5mbGF0aWNvbi1zZW5kOjpiZWZvcmUge1xyXG4gICAgY29sb3I6dmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IC0xMHB4O1xyXG59XHJcbi5jbG9jay1pY29uLWltYWdlOjpiZWZvcmV7XHJcbiAgICBib3R0b206IDVweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJvdHRvbTogNXB4O1xyXG59XHJcbi51cC1pY29uLWJ0bntcclxuICAgIC0tYmFja2dyb3VuZDogbm9uZTtcclxufVxyXG4ubXNnLWNvbnRlbnR7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxufVxyXG4uc2VhcmNoLW1lc3NhZ2V7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcclxufVxyXG4ubWFyZ2luaW5ne1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG4ubWVzc2FnZS1hZG1pbntcclxuICAgIHBhZGRpbmc6IDEzcHg7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2MzZGJmZjtcclxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDEwcHg7XHJcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTBweDtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgIGJveC1zaGFkb3c6IDBweCAxcHggMnB4ICNjY2M7XHJcbiAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB1c2VyLXNlbGVjdDogYXV0bztcclxuICAgIG1hcmdpbi1ib3R0b206IDdweDtcclxuXHJcbn1cclxuLm1lc3NhZ2UtdXNlcntcclxuICAgIHBhZGRpbmc6IDEzcHg7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0YyRjVGQztcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjM2RiZmY7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAjY2NjO1xyXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEwcHg7XHJcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTBweDtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IC0xNnB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbiAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XHJcbiAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB1c2VyLXNlbGVjdDogYXV0bztcclxuICAgIG1hcmdpbi1ib3R0b206IDdweDtcclxuXHJcbn1cclxuLmF2YXRhci1pbWd7XHJcbiAgICBtYXJnaW4tdG9wOiAycHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gICAgcGFkZGluZzogMnB4O1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDNweCAzcHggMHB4ICNlOGU4ZTg7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB3aWR0aDogNDBweDtcclxufVxyXG4udGltZXtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICAgIG9wYWNpdHk6IC41O1xyXG4gICAgbWFyZ2luLXRvcDogNXB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMHB4O1xyXG59XHJcbi5pbWctcHVibGlzaCBzcGFue1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm90dG9tOiA1cHg7XHJcbiAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICByaWdodDogMTVweDtcclxufVxyXG4udXAtaWNvbi1hY3RpdmV7XHJcbiAgICBjb2xvcjp2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogLTIwcHg7XHJcbn1cclxuLnVwLWljb24tZGlzYWJsZWR7XHJcbiAgICBjb2xvcjogI2NjYztcclxuICAgIGZvbnQtc2l6ZTogMzBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAtMjBweDtcclxufVxyXG4uYWRkLWljb24tZGlzYWJsZWQge1xyXG4gICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgY29sb3I6IHJnYigxNjMsIDE1MSwgMTUxKTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGxlZnQ6IC04cHg7XHJcbn1cclxuLmFkZC1pY29uLWFjdGl2ZSB7XHJcbiAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgbGVmdDogLThweDtcclxufVxyXG4ubWVzc2FnZS1pbnB1dHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgcmVzaXplOiBub25lO1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMTBweDtcclxuICAgIHBhZGRpbmctdG9wOiAyMHB4O1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxufVxyXG4udGV4dGFyZWFFbGVtZW50IHtcclxuICAgIC8vIG1pbi1oZWlnaHQ6IDIwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgbWF4LWhlaWdodDogMTAwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbi10b3A6IDZweDtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xyXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xyXG4gIH1cclxuLnlvdXItb3JkZXIge1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICBtYXJnaW46IDBweDtcclxufVxyXG4ucHJvZHVjdC1pbmZvIHtcclxuICAgIG1hcmdpbjogMHB4O1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxufVxyXG4ucHJvZHVjdC1kYXRhe1xyXG4gICAgbWFyZ2luOiAwcHg7XHJcbn1cclxuLmRpdmlkZXJ7XHJcbiAgICBiYWNrZ3JvdW5kOiAjQzhEN0U5O1xyXG4gICAgaGVpZ2h0OiAxcHg7XHJcbn1cclxuaW9uLXRodW1ibmFpbCB7XHJcbiAgICAtLXNpemU6IDE0MHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2MzZGJmZjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgIGJveC1zaGFkb3c6IDBweCAxcHggMnB4ICNjY2M7XHJcbn1cclxuLnN1cHBvcnQtaWNvbjpiZWZvcmV7XHJcbiAgICBmb250LXNpemU6IDMwcHg7XHJcbn1cclxuLmZsYXRpY29uLW51bGwtMjI6OmJlZm9yZXtcclxuICAgIGNvbG9yOiAjY2NjO1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG4gIH1cclxuLmZsYXRpY29uLW51bGwtMTk6OmJlZm9yZXtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxufVxyXG4uY2xvc2UtYnRue1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlOyBcclxuICAgIGNvbG9yOiAjY2NjO1xyXG4gICAgcmlnaHQ6IDJweDtcclxufVxyXG4gIGlvbi1pbnB1dHtcclxuICAgIC0tcGFkZGluZy1ib3R0b206IDNweDtcclxuICAgIC0tcGFkZGluZy10b3A6IDVweDtcclxuICAgIC0tcGFkZGluZy1zdGFydDogMTBweDtcclxuICAgIC0tcGFkZGluZy1lbmQ6IDEwcHg7XHJcbiAgfVxyXG4gIC5pb24tbm8tcGFkZGluZywgW25vLXBhZGRpbmddIHtcclxuICAgIC0tcGFkZGluZy1zdGFydDogMHB4O1xyXG4gICAgLS1wYWRkaW5nLWVuZDogMDtcclxuICAgIC0tcGFkZGluZy10b3A6IDA7XHJcbiAgICAtLXBhZGRpbmctYm90dG9tOiAwO1xyXG4gICAgcGFkZGluZy1sZWZ0OiA1cHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xyXG4gICAgcGFkZGluZy10b3A6IDA7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMDtcclxufVxyXG4gIDpob3N0IHtcclxuICAgIC5pdGVtLWludGVyYWN0aXZlLmlvbi12YWxpZHtcclxuICAgICAgLS1oaWdobGlnaHQtYmFja2dyb3VuZDogbm9uZTtcclxuICAgIH1cclxuICB9XHJcbiAgLmJvdHRvbS1ib3JkZXJ7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xyXG4gIH1cclxuICAudG9wLWJvcmRlcntcclxuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IGNvbnN0YW50KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pOyAvKiBpT1MgMTEuMCAqL1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiBlbnYoc2FmZS1hcmVhLWluc2V0LWJvdHRvbSk7IC8qIGlPUyAxMS4yICovXHJcbiAgfVxyXG4gIC5tZXNzYWdlLWJveHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIH1cclxuICAubm8tbXNnc3tcclxuICAgIGNvbG9yOiAjY2NjO1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gIH1cclxuICBpb24tc3Bpbm5lciB7XHJcbiAgICB3aWR0aDogMjBweCAhaW1wb3J0YW50O1xyXG4gICAgaGVpZ2h0OiAyMHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuLmxvYWRpbmcge1xyXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKCdodHRwczovL3M1LmdpZnl1LmNvbS9pbWFnZXMvbG9hZGVyYmIxOWVmY2MyNzQ5ZTExNS5naWYnKSBjZW50ZXIgbm8tcmVwZWF0O1xyXG4gIH1cclxuICAuc3Bpbm5lcntcclxuICAgIG1hcmdpbi10b3A6IDUwJTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9ICBcclxuICAuaW1nLWJyb2FkY2FzdHtcclxuICAgIG1hcmdpbi10b3A6IDVweDtcclxuICAgIG1hcmdpbi1yaWdodDogNTVweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcclxuICB9XHJcbiAgLmltZy1vcmRlcntcclxuICAgIG1hcmdpbi1sZWZ0OiA1NXB4OyBcclxuICAgIG1hcmdpbi10b3A6IDVweDtcclxuICB9XHJcbiAgLm0tbGVmdHtcclxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgfVxyXG4gIC5pbWctYWRtaW57XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDU1cHg7XHJcbiAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbiAgfVxyXG4gIC5pbWctZ3JpZHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjM2RiZmY7XHJcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHg7XHJcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMHB4O1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDFweCAycHggMHB4ICNjY2M7XHJcbiAgfVxyXG4gIC5pbWctZ3JpZC11c2Vye1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2MzZGJmZjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGMkY1RkM7XHJcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTBweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDtcclxuICAgIGJveC1zaGFkb3c6IDBweCAxcHggMnB4IDBweCAjY2NjO1xyXG4gIH1cclxuICAuaW1nLW9wYWNpdHl7XHJcbiAgICAgIG9wYWNpdHk6IDAuNTtcclxuICB9XHJcbiAgLmltZy1jb3VudHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGJvdHRvbTogOTBweDtcclxuICAgIGZvbnQtc2l6ZTogMzBweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICB9XHJcbiAgLmZsYXRpY29uLW51bGwtMjM6OmJlZm9yZXtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgfVxyXG5cclxuLmltZy1vbmx5LWJyb2FkY2FzdHtcclxuICAgIG1hcmdpbi1yaWdodDogNXB4O1xyXG59XHJcbmlvbi10aHVtYm5haWwucHJvZHVjdC1pbWcge1xyXG4gICAgLS1zaXplOiAxMzBweDtcclxuICB9IFxyXG4ub3JkZXItcm93c3tcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2MzZGJmZjtcclxuICBwYWRkaW5nOiA1cHg7XHJcbn1cclxuXHJcbi5wLWRlbGV0ZXtcclxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxufVxyXG4gIFxyXG4vL21lZGlhIHF1ZXJpZXNcclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1heC13aWR0aDogMzc1cHgpe1xyXG4gICAgaW9uLXRodW1ibmFpbCB7XHJcbiAgICAgICAgLS1zaXplOiAxMjJweDtcclxuICAgIH1cclxuICAgIC5pbWctY291bnR7XHJcbiAgICAgICAgYm90dG9tOiA4MHB4O1xyXG4gICAgfVxyXG4gICAgLm1lc3NhZ2UtdXNlcntcclxuICAgICAgICBtYXJnaW4tbGVmdDogLTEwcHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLXB1Ymxpc2h7XHJcbiAgICAgICAgd2lkdGg6IDEyMnB4O1xyXG4gICAgfVxyXG59XHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1heC13aWR0aDogMzYwcHgpe1xyXG4gICAgaW9uLXRodW1ibmFpbCB7XHJcbiAgICAgICAgLS1zaXplOiAxMTVweDtcclxuICAgIH1cclxuICAgIC5pbWctY291bnR7XHJcbiAgICAgICAgYm90dG9tOiA3NXB4O1xyXG4gICAgfVxyXG4gICAgLm1lc3NhZ2UtdXNlcntcclxuICAgICAgICBtYXJnaW4tbGVmdDogLTEwcHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLXB1Ymxpc2h7XHJcbiAgICAgICAgd2lkdGg6IDExNXB4O1xyXG4gICAgfVxyXG4gICAvKiAuZmxhdGljb24tc2VuZDo6YmVmb3Jle1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogLTEzcHg7XHJcbiAgICB9Ki9cclxufVxyXG5AbWVkaWEgc2NyZWVuIGFuZChtYXgtd2lkdGg6IDMyMHB4KXtcclxuICAgIGlvbi10aHVtYm5haWwge1xyXG4gICAgICAgIC0tc2l6ZTogOTVweDtcclxuICAgIH1cclxuICAgIC5pbWctY291bnR7XHJcbiAgICAgICAgYm90dG9tOiA2NnB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIH1cclxuICAgIC5pbWctcHVibGlzaHtcclxuICAgICAgICB3aWR0aDogOTVweDtcclxuICAgIH1cclxuICAgIC5mbGF0aWNvbi1zZW5kOjpiZWZvcmV7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtMTNweDtcclxuICAgIH1cclxuICAgIGlvbi10aHVtYm5haWwucHJvZHVjdC1pbWcge1xyXG4gICAgICAgIC0tc2l6ZTogMTEwcHg7XHJcbiAgICAgIH0gXHJcbn1cclxuQG1lZGlhIHNjcmVlbiBhbmQobWluLXdpZHRoOiA2MDBweCkge1xyXG4gICAgLm1lc3NhZ2UtdXNlcntcclxuICAgICAgICBtYXJnaW4tbGVmdDogLTUwcHg7XHJcbiAgICB9XHJcbiAgICAubS1sZWZ0e1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgICB9XHJcbiAgICBpb24tdGh1bWJuYWlsIHtcclxuICAgICAgICAtLXNpemU6IDIyMnB4O1xyXG4gICAgfVxyXG4gICAgLmltZy1jb3VudHtcclxuICAgICAgICBib3R0b206IDEzNnB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIH1cclxuICAgIC5jb2wtcGFkZGluZ3tcclxuICAgICAgICBwYWRkaW5nOiA4cHg7XHJcbiAgICB9XHJcbiAgICAudGV4dGFyZWFFbGVtZW50e1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIH1cclxuICAgIC5pbWctcHVibGlzaHtcclxuICAgICAgICB3aWR0aDogMjIycHg7XHJcbiAgICB9XHJcbiAgICBpb24tdGh1bWJuYWlsLnByb2R1Y3QtaW1nIHtcclxuICAgICAgICAtLXNpemU6IDIwMHB4O1xyXG4gICAgICB9IFxyXG59XHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1pbi13aWR0aDogNzAwcHgpe1xyXG4gICAgLmNvbC1wYWRkaW5ne1xyXG4gICAgICAgIHBhZGRpbmc6IDEycHg7XHJcbiAgICB9XHJcbiAgICBpb24tdGh1bWJuYWlsIHtcclxuICAgICAgICAtLXNpemU6IDI3M3B4O1xyXG4gICAgfVxyXG4gICAgLmltZy1wdWJsaXNoe1xyXG4gICAgICAgIHdpZHRoOiAyNzNweDtcclxuICAgIH1cclxuICAgIC5pbWctY291bnR7XHJcbiAgICAgICAgYm90dG9tOiAxNjVweDtcclxuICAgICAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICB9XHJcbiAgICAubWVzc2FnZS1hZG1pbntcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcbiAgICAubWVzc2FnZS11c2Vye1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogLTU1cHg7XHJcbiAgICB9XHJcbiAgICAuYXZhdGFyLWltZ3tcclxuICAgICAgICBoZWlnaHQ6IDYwcHg7XHJcbiAgICAgICAgd2lkdGg6IDYwcHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLWJyb2FkY2FzdHtcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDc1cHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLW9yZGVye1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA3NXB4O1xyXG4gICAgfVxyXG4gICAgLm0tbGVmdHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gICAgfVxyXG4gICAgLmltZy1hZG1pbntcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDc1cHg7XHJcbiAgICB9XHJcbiAgICAudXAtaWNvbi1hY3RpdmV7XHJcbiAgICAgICAgZm9udC1zaXplOiA0MHB4O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xyXG4gICAgfVxyXG4gICAgLnVwLWljb24tZGlzYWJsZWR7XHJcbiAgICAgICAgZm9udC1zaXplOiA0MHB4O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xyXG4gICAgfVxyXG4gICAgLmFkZC1pY29uLWRpc2FibGVkIHtcclxuICAgICAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICAgICAgcmlnaHQ6IC0xMHB4O1xyXG4gICAgfVxyXG4gICAgLmFkZC1pY29uLWFjdGl2ZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiA0MHB4O1xyXG4gICAgICAgIHJpZ2h0OiAtMTBweDtcclxuICAgIH1cclxuICAgIC50ZXh0YXJlYUVsZW1lbnR7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgfVxyXG4gICAgLmZsYXRpY29uLXNlbmQ6OmJlZm9yZXtcclxuICAgICAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICB9XHJcbiAgICBpb24tdGh1bWJuYWlsLnByb2R1Y3QtaW1nIHtcclxuICAgICAgICAtLXNpemU6IDIzNXB4O1xyXG4gICAgICB9IFxyXG59XHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1pbi13aWR0aDogMTAwMHB4KXtcclxuICAgIGlvbi10aHVtYm5haWwge1xyXG4gICAgICAgIC0tc2l6ZTogMzcwcHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLXB1Ymxpc2h7XHJcbiAgICAgICAgd2lkdGg6IDM3MHB4O1xyXG4gICAgfVxyXG4gICAgLmltZy1jb3VudHtcclxuICAgICAgICBib3R0b206IDIyMHB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNTBweDtcclxuICAgIH1cclxuICAgIC5tZXNzYWdlLWFkbWlue1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIH1cclxuICAgIC5tZXNzYWdlLXVzZXJ7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC04NXB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIH1cclxuICAgIC5hdmF0YXItaW1ne1xyXG4gICAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgICB3aWR0aDogNDBweDtcclxuICAgIH1cclxuICAgIC5pbWctYnJvYWRjYXN0e1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogODVweDtcclxuICAgIH1cclxuICAgIC5pbWctb3JkZXJ7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDg1cHg7XHJcbiAgICB9XHJcbiAgICAuaW1nLWFkbWlue1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogODVweDtcclxuICAgIH1cclxuICAgIC51cC1pY29uLWFjdGl2ZXtcclxuICAgICAgICBmb250LXNpemU6IDUwcHg7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC01cHg7XHJcbiAgICB9XHJcbiAgICAudXAtaWNvbi1kaXNhYmxlZHtcclxuICAgICAgICBmb250LXNpemU6IDUwcHg7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC01cHg7XHJcbiAgICB9XHJcbiAgICAuYWRkLWljb24tZGlzYWJsZWQge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNTBweDtcclxuICAgICAgICByaWdodDogLTEwcHg7XHJcbiAgICB9XHJcbiAgICAuYWRkLWljb24tYWN0aXZlIHtcclxuICAgICAgICBmb250LXNpemU6IDUwcHg7XHJcbiAgICAgICAgcmlnaHQ6IC0xMHB4O1xyXG4gICAgfVxyXG4gICAgLnRleHRhcmVhRWxlbWVudHtcclxuICAgICAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICB9XHJcbiAgICAuZmxhdGljb24tc2VuZDo6YmVmb3Jle1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNDVweDtcclxuICAgIH1cclxuICAgIGlvbi10aHVtYm5haWwucHJvZHVjdC1pbWcge1xyXG4gICAgICAgIC0tc2l6ZTogMzAwcHg7XHJcbiAgICAgIH0gXHJcbn1cclxuXHJcbi53cmFwcGVyLWNvbnRhaW5lcntcclxuICAgIGZsb2F0OiBub25lO1xyXG4gICAgY2xlYXI6IGJvdGg7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG5cclxufVxyXG4uaW1nLWJyb2FkY2FzdC5oYWxme3dpZHRoOiA1MCU7ZmxvYXQ6IHJpZ2h0O31cclxuLmltZy1wdWJsaXNoe3dpZHRoOiAxMDAlIWltcG9ydGFudDtcclxufVxyXG5cclxuXHJcbi5maXhlZC1oZWlnaHR7XHJcbiAgICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMzE1cHgpO1xyXG4gICAgICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcbiAgICAgIHBhZGRpbmc6IDE2cHg7XHJcbiAgfVxyXG5cclxuICAuYnRuLXdyYXBwZXJ7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbiAgfVxyXG5cclxuICAuaW5saW5lLWFsaWduIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIH1cclxuICAuaW5saW5lLWFsaWduIGg2IHtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICB9XHJcblxyXG4gIC5uby1kYXRhIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIGxlZnQ6IDUwJTtcclxuICAgIG1hcmdpbi1sZWZ0OiAtNjVweDtcclxuICB9XHJcblxyXG4gIC5uby1kYXRhIGltZyB7XHJcbiAgICB3aWR0aDogMTMwcHg7XHJcbiAgfVxyXG5cclxuICBpb24tY29udGVudCB7XHJcbiAgICAtLWJhY2tncm91bmQ6ICNGMkYyRjI7XHJcbiAgICAtLXBhZGRpbmctYm90dG9tOiA1MHB4O1xyXG4gIH1cclxuXHJcbiAgaW9uLWxpc3Qge1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIH1cclxuXHJcbiAgLmF1ZC1wcm9kdWN0cy1jb250YWluZXIge1xyXG4gICAgbWFyZ2luOiAwcHggMTBweCAxMHB4IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBwYWRkaW5nOiAxNXB4IDVweCAxMHB4IDJweDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB9XHJcblxyXG4gIC5hdWQtcHJvZHVjdC1pbWFnZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoJy4uLy4uLy4uL2Fzc2V0cy9pbWcvaW1nLXByZWxvYWRlci5wbmcnKSBjZW50ZXIgbm8tcmVwZWF0O1xyXG4gICAgd2lkdGg6IDg1cHg7XHJcbiAgICBoZWlnaHQ6IDg1cHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBsZWZ0OiAxNXB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2YwZjBmMDtcclxuICB9XHJcblxyXG4gIC5hdWQtbW9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgcmdiYSgwLCAwLCAwLCAuNSksIHRyYW5zcGFyZW50KTtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIGhlaWdodDogMjBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHdpZHRoOiA4NHB4O1xyXG4gICAgei1pbmRleDogMjtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICB9XHJcblxyXG4gIC5hdWQtcHJvZHVjdC1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gIH1cclxuXHJcbiAgLmF1ZC1wcm9kdWN0LXByaWNlIHtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgfVxyXG5cclxuICAuc3Bpbm5lciB7XHJcbiAgICBtYXJnaW4tdG9wOiA1MCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICAuYXVkLXBsYWNlZC1vbiB7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBvcGFjaXR5OiAuNztcclxuICAgIG1hcmdpbi1ib3R0b206IDMlO1xyXG4gIH1cclxuICAuYXVkLXBsYWNlZC1vbiBzcGFue1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICB9XHJcbiAgLmF1ZC1vcmRlci1pZCB7XHJcbiAgICBtYXJnaW46IDE1cHggMTBweCAxcHg7XHJcbiAgICBvcGFjaXR5OiAuODtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICB9XHJcblxyXG4gIC5hdWQtYWN0aW9uLWJ0biB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG4gIC5hdWQtdmlldy1kZXRhaWxzLWJ0biB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG4gIHNwYW4gLmZsYXRpY29uLW51bGwtMjA6OmJlZm9yZSB7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDJweDtcclxuICB9XHJcbiAgc3BhbiAuZmxhdGljb24tbnVsbC0xOTo6YmVmb3JlIHtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcclxuICAgIG1hcmdpbi1sZWZ0OiAycHg7XHJcbiAgfVxyXG5cclxuLmFkZHJlc3MtY2FyZHtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIG1hcmdpbjogNnB4IDEycHggMTJweCAxMnB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLnVzZXItbmFtZXtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG4uYWRkcmVzc3tcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxufVxyXG4ucGhvbmUtbm97XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAtNXB4O1xyXG59XHJcblxyXG5cclxuLnRyYW5zLXdyYXBwZXIge1xyXG4gIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgcGFkZGluZy1ib3R0b206IDUwcHg7XHJcbn1cclxuXHJcbi50cmFucy1jb25hdGluZXIge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIHBhZGRpbmc6IDE1cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLnRyYW5zLXR5cGUge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGZvbnQtc2l6ZTogc21hbGw7XHJcbn1cclxuXHJcbi50cmFucy1tc2cge1xyXG4gIG1hcmdpbi10b3A6IDBweDtcclxufVxyXG5cclxuLnRyYW5zLWRhdGUge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBvcGFjaXR5OiAuNjtcclxufVxyXG5cclxuLmNhbmNlbC1idG4ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZGl2IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIH1cclxufVxyXG5cclxuLnNhdmUtYnRuIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcclxufVxyXG5cclxuLm1hcmdpbi1pY29uIHtcclxuICBtYXJnaW4tbGVmdDogNXB4O1xyXG59XHJcblxyXG5pb24tZm9vdGVyIGlvbi10aXRsZSB7XHJcbiAgaGVpZ2h0OiA0NXB4O1xyXG59XHJcblxyXG4uYm90dG9tLWJ1dHRvbnMge1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBtYXJnaW4tbGVmdDogNXB4O1xyXG59XHJcblxyXG4udXNlckluZm97XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIHdpZHRoOiAxMDB2dztcclxuICBoZWlnaHQ6IDE1dmg7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBvdXRsaW5lOiBub25lXHJcbn1cclxuXHJcbi5kaXZpZGVye1xyXG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcclxuICBtYXJnaW46IDI2cHggMDtcclxufVxyXG5cclxuLmlvbi1qdXN0aWZ5LWNvbnRlbnQtZW5ke1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC13cmFwOiBub3dyYXA7XHJcbn1cclxuXHJcbmltZ3tcclxuICBtYXgtaGVpZ2h0OiA1MDBweDtcclxuICBtYXgtd2lkdGg6IDUwMHB4O1xyXG59XHJcblxyXG4uYmFkZ2V7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgcGFkZGluZzogMnB4IDZweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xyXG4gIG1hcmdpbi10b3A6IC0ycHg7XHJcbn1cclxuXHJcbiAjc2Nyb2xsMXtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogNzAuNXZoXHJcbiB9XHJcblxyXG4gI3Njcm9sbDE6aG92ZXJ7XHJcbiAgb3ZlcmZsb3cteTogYXV0b1xyXG4gfVxyXG5cclxuICNzY3JvbGwye1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiA2NXZoXHJcbiB9XHJcblxyXG4gI3Njcm9sbDI6aG92ZXJ7XHJcbiAgb3ZlcmZsb3cteTogYXV0b1xyXG4gfVxyXG5cclxuXHJcbiAjc2Nyb2xsM3tcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogODB2aDtcclxuIH1cclxuXHJcbiAjc2Nyb2xsMzpob3ZlcntcclxuICBvdmVyZmxvdy15OiBhdXRvXHJcbiB9XHJcblxyXG4gLndoYXRzYXBwLWNvbnRhaW5lcntcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgaW1ne1xyXG4gICAgd2lkdGg6IDI1cHg7XHJcbiAgICBoZWlnaHQ6IDI1cHg7XHJcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xyXG4gIH1cclxufVxyXG5cclxuLndhLXRleHQtY29udGFpbmVye1xyXG5tYXJnaW4tYm90dG9tOiAtMTNweDtcclxubWFyZ2luLXRvcDogMTBweDtcclxufVxyXG5cclxuLm0tci01e1xyXG4gIG1hcmdpbi1yaWdodDogNXB4O1xyXG4gfVxyXG4gXHJcbiAubGlua3tcclxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuIH1cclxuIFxyXG4gLmVycm9yLWljb257XHJcbiAgbWFyZ2luLXRvcDogYXV0bztcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiB9XHJcbiBcclxuIC5yZWR7XHJcbiAgY29sb3I6IHJlZDtcclxuIH1cclxuXHJcbiBAbWVkaWEgc2NyZWVuIGFuZChtaW4taGVpZ2h0OiAxMjAwcHgpIHtcclxuICAjc2Nyb2xsMXtcclxuICAgIGhlaWdodDogODIuNXZoO1xyXG4gICB9XHJcbiAgI3Njcm9sbDJ7XHJcbiAgICBoZWlnaHQ6IDcydmg7XHJcbiAgIH1cclxuICAjc2Nyb2xsM3tcclxuICAgIGhlaWdodDogOTJ2aDtcclxuICAgfVxyXG4gfSIsIi5idG4td3JhcCB7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG4ubWVzc2FnZXMtd3JhcHBlciAubWVzc2FnZS13cmFwIHtcbiAgcGFkZGluZzogMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBib3JkZXItdG9wOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpIDFweCBzb2xpZDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLm1lc3NhZ2VzLXdyYXBwZXIgLm1lc3NhZ2Utd3JhcDpob3ZlciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG59XG4ubWVzc2FnZXMtd3JhcHBlciAubWVzc2FnZS13cmFwIC51c2VyLW5hbWUge1xuICBmb250LXdlaWdodDogNTAwO1xufVxuLm1lc3NhZ2VzLXdyYXBwZXIgLm1lc3NhZ2Utd3JhcCAuYi10aW1lIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMTZweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmF5KTtcbn1cblxuLmFkbWluLWNoYXQtdG9vbGJhciBpb24tdGl0bGUge1xuICBtYXJnaW4tcmlnaHQ6IDBweDtcbiAgbWFyZ2luLWJvdHRvbTogMHB4O1xufVxuXG4udXNlci1sYXN0LXNlZW4ge1xuICB0ZXh0LXRyYW5zZm9ybTogbG93ZXJjYXNlO1xuICBvcGFjaXR5OiAwLjg7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgbWFyZ2luLXRvcDogMnB4O1xufVxuXG4uaW1nLXB1Ymxpc2gge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgcmdiYSgwLCAwLCAwLCAwLjUpLCB0cmFuc3BhcmVudCk7XG4gIGJvdHRvbTogMDtcbiAgaGVpZ2h0OiAyOHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAxNDBweDtcbiAgei1pbmRleDogMjtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG59XG5cbi5mbGF0aWNvbi1jbG9jazo6YmVmb3JlIHtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBjb2xvcjogYmxhY2s7XG4gIG9wYWNpdHk6IDAuNTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogNXB4O1xuICBtYXJnaW4tdG9wOiAxcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5mbGF0aWNvbi1jaGVjazo6YmVmb3JlIHtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBjb2xvcjogIzhkYjhmNztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMnB4O1xuICBtYXJnaW4tdG9wOiAxcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5mbGF0aWNvbi1zZW5kOjpiZWZvcmUge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBmb250LXNpemU6IDI1cHg7XG4gIG1hcmdpbi1sZWZ0OiAtMTBweDtcbn1cblxuLmNsb2NrLWljb24taW1hZ2U6OmJlZm9yZSB7XG4gIGJvdHRvbTogNXB4O1xuICBjb2xvcjogd2hpdGU7XG4gIGJvdHRvbTogNXB4O1xufVxuXG4udXAtaWNvbi1idG4ge1xuICAtLWJhY2tncm91bmQ6IG5vbmU7XG59XG5cbi5tc2ctY29udGVudCB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xufVxuXG4uc2VhcmNoLW1lc3NhZ2Uge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiAyNXB4O1xufVxuXG4ubWFyZ2luaW5nIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICBtYXJnaW4tbGVmdDogMjBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLm1lc3NhZ2UtYWRtaW4ge1xuICBwYWRkaW5nOiAxM3B4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICBib3JkZXI6IDFweCBzb2xpZCAjYzNkYmZmO1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMHB4O1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTBweDtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIGJveC1zaGFkb3c6IDBweCAxcHggMnB4ICNjY2M7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdXNlci1zZWxlY3Q6IGF1dG87XG4gIG1hcmdpbi1ib3R0b206IDdweDtcbn1cblxuLm1lc3NhZ2UtdXNlciB7XG4gIHBhZGRpbmc6IDEzcHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGMkY1RkM7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjM2RiZmY7XG4gIGJveC1zaGFkb3c6IDBweCAxcHggMnB4ICNjY2M7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMHB4O1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTBweDtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDtcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBtYXJnaW4tbGVmdDogLTE2cHg7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB1c2VyLXNlbGVjdDogYXV0bztcbiAgbWFyZ2luLWJvdHRvbTogN3B4O1xufVxuXG4uYXZhdGFyLWltZyB7XG4gIG1hcmdpbi10b3A6IDJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgcGFkZGluZzogMnB4O1xuICBib3gtc2hhZG93OiAwcHggM3B4IDNweCAwcHggI2U4ZThlODtcbiAgaGVpZ2h0OiA0MHB4O1xuICB3aWR0aDogNDBweDtcbn1cblxuLnRpbWUge1xuICBmb250LXNpemU6IDEwcHg7XG4gIGNvbG9yOiBibGFjaztcbiAgb3BhY2l0eTogMC41O1xuICBtYXJnaW4tdG9wOiA1cHg7XG4gIG1hcmdpbi1ib3R0b206IDBweDtcbn1cblxuLmltZy1wdWJsaXNoIHNwYW4ge1xuICBjb2xvcjogd2hpdGU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiA1cHg7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgcmlnaHQ6IDE1cHg7XG59XG5cbi51cC1pY29uLWFjdGl2ZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGZvbnQtc2l6ZTogMzBweDtcbiAgbWFyZ2luLWxlZnQ6IC0yMHB4O1xufVxuXG4udXAtaWNvbi1kaXNhYmxlZCB7XG4gIGNvbG9yOiAjY2NjO1xuICBmb250LXNpemU6IDMwcHg7XG4gIG1hcmdpbi1sZWZ0OiAtMjBweDtcbn1cblxuLmFkZC1pY29uLWRpc2FibGVkIHtcbiAgZm9udC1zaXplOiAyNXB4O1xuICBjb2xvcjogI2EzOTc5NztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAtOHB4O1xufVxuXG4uYWRkLWljb24tYWN0aXZlIHtcbiAgZm9udC1zaXplOiAyNXB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGxlZnQ6IC04cHg7XG59XG5cbi5tZXNzYWdlLWlucHV0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIHJlc2l6ZTogbm9uZTtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xuICBwYWRkaW5nLXRvcDogMjBweDtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLnRleHRhcmVhRWxlbWVudCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBvdXRsaW5lOiBub25lO1xuICBwYWRkaW5nOiAxMHB4O1xuICBtYXgtaGVpZ2h0OiAxMDBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi10b3A6IDZweDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBtYXJnaW4tbGVmdDogLTVweDtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xufVxuXG4ueW91ci1vcmRlciB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBtYXJnaW46IDBweDtcbn1cblxuLnByb2R1Y3QtaW5mbyB7XG4gIG1hcmdpbjogMHB4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4ucHJvZHVjdC1kYXRhIHtcbiAgbWFyZ2luOiAwcHg7XG59XG5cbi5kaXZpZGVyIHtcbiAgYmFja2dyb3VuZDogI0M4RDdFOTtcbiAgaGVpZ2h0OiAxcHg7XG59XG5cbmlvbi10aHVtYm5haWwge1xuICAtLXNpemU6IDE0MHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjYzNkYmZmO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGJveC1zaGFkb3c6IDBweCAxcHggMnB4ICNjY2M7XG59XG5cbi5zdXBwb3J0LWljb246YmVmb3JlIHtcbiAgZm9udC1zaXplOiAzMHB4O1xufVxuXG4uZmxhdGljb24tbnVsbC0yMjo6YmVmb3JlIHtcbiAgY29sb3I6ICNjY2M7XG4gIG1hcmdpbjogMTBweDtcbn1cblxuLmZsYXRpY29uLW51bGwtMTk6OmJlZm9yZSB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLmNsb3NlLWJ0biB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgY29sb3I6ICNjY2M7XG4gIHJpZ2h0OiAycHg7XG59XG5cbmlvbi1pbnB1dCB7XG4gIC0tcGFkZGluZy1ib3R0b206IDNweDtcbiAgLS1wYWRkaW5nLXRvcDogNXB4O1xuICAtLXBhZGRpbmctc3RhcnQ6IDEwcHg7XG4gIC0tcGFkZGluZy1lbmQ6IDEwcHg7XG59XG5cbi5pb24tbm8tcGFkZGluZywgW25vLXBhZGRpbmddIHtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwcHg7XG4gIC0tcGFkZGluZy1lbmQ6IDA7XG4gIC0tcGFkZGluZy10b3A6IDA7XG4gIC0tcGFkZGluZy1ib3R0b206IDA7XG4gIHBhZGRpbmctbGVmdDogNXB4O1xuICBwYWRkaW5nLXJpZ2h0OiAwO1xuICBwYWRkaW5nLXRvcDogMDtcbiAgcGFkZGluZy1ib3R0b206IDA7XG59XG5cbjpob3N0IC5pdGVtLWludGVyYWN0aXZlLmlvbi12YWxpZCB7XG4gIC0taGlnaGxpZ2h0LWJhY2tncm91bmQ6IG5vbmU7XG59XG5cbi5ib3R0b20tYm9yZGVyIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XG59XG5cbi50b3AtYm9yZGVyIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7XG4gIG1hcmdpbi1ib3R0b206IGNvbnN0YW50KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pO1xuICAvKiBpT1MgMTEuMCAqL1xuICBtYXJnaW4tYm90dG9tOiBlbnYoc2FmZS1hcmVhLWluc2V0LWJvdHRvbSk7XG4gIC8qIGlPUyAxMS4yICovXG59XG5cbi5tZXNzYWdlLWJveCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLm5vLW1zZ3Mge1xuICBjb2xvcjogI2NjYztcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuXG5pb24tc3Bpbm5lciB7XG4gIHdpZHRoOiAyMHB4ICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogMjBweCAhaW1wb3J0YW50O1xufVxuXG4ubG9hZGluZyB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcImh0dHBzOi8vczUuZ2lmeXUuY29tL2ltYWdlcy9sb2FkZXJiYjE5ZWZjYzI3NDllMTE1LmdpZlwiKSBjZW50ZXIgbm8tcmVwZWF0O1xufVxuXG4uc3Bpbm5lciB7XG4gIG1hcmdpbi10b3A6IDUwJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uaW1nLWJyb2FkY2FzdCB7XG4gIG1hcmdpbi10b3A6IDVweDtcbiAgbWFyZ2luLXJpZ2h0OiA1NXB4O1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG59XG5cbi5pbWctb3JkZXIge1xuICBtYXJnaW4tbGVmdDogNTVweDtcbiAgbWFyZ2luLXRvcDogNXB4O1xufVxuXG4ubS1sZWZ0IHtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cblxuLmltZy1hZG1pbiB7XG4gIG1hcmdpbi1yaWdodDogNTVweDtcbiAgbWFyZ2luLXRvcDogNXB4O1xufVxuXG4uaW1nLWdyaWQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjYzNkYmZmO1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMHB4O1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTBweDtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDtcbiAgYm94LXNoYWRvdzogMHB4IDFweCAycHggMHB4ICNjY2M7XG59XG5cbi5pbWctZ3JpZC11c2VyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2MzZGJmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0YyRjVGQztcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEwcHg7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMHB4O1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMHB4O1xuICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAwcHggI2NjYztcbn1cblxuLmltZy1vcGFjaXR5IHtcbiAgb3BhY2l0eTogMC41O1xufVxuXG4uaW1nLWNvdW50IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJvdHRvbTogOTBweDtcbiAgZm9udC1zaXplOiAzMHB4O1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5mbGF0aWNvbi1udWxsLTIzOjpiZWZvcmUge1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uaW1nLW9ubHktYnJvYWRjYXN0IHtcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XG59XG5cbmlvbi10aHVtYm5haWwucHJvZHVjdC1pbWcge1xuICAtLXNpemU6IDEzMHB4O1xufVxuXG4ub3JkZXItcm93cyB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYzNkYmZmO1xuICBwYWRkaW5nOiA1cHg7XG59XG5cbi5wLWRlbGV0ZSB7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzNzVweCkge1xuICBpb24tdGh1bWJuYWlsIHtcbiAgICAtLXNpemU6IDEyMnB4O1xuICB9XG5cbiAgLmltZy1jb3VudCB7XG4gICAgYm90dG9tOiA4MHB4O1xuICB9XG5cbiAgLm1lc3NhZ2UtdXNlciB7XG4gICAgbWFyZ2luLWxlZnQ6IC0xMHB4O1xuICB9XG5cbiAgLmltZy1wdWJsaXNoIHtcbiAgICB3aWR0aDogMTIycHg7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM2MHB4KSB7XG4gIGlvbi10aHVtYm5haWwge1xuICAgIC0tc2l6ZTogMTE1cHg7XG4gIH1cblxuICAuaW1nLWNvdW50IHtcbiAgICBib3R0b206IDc1cHg7XG4gIH1cblxuICAubWVzc2FnZS11c2VyIHtcbiAgICBtYXJnaW4tbGVmdDogLTEwcHg7XG4gIH1cblxuICAuaW1nLXB1Ymxpc2gge1xuICAgIHdpZHRoOiAxMTVweDtcbiAgfVxuXG4gIC8qIC5mbGF0aWNvbi1zZW5kOjpiZWZvcmV7XG4gICAgICAgZm9udC1zaXplOiAyMnB4O1xuICAgICAgIG1hcmdpbi1sZWZ0OiAtMTNweDtcbiAgIH0qL1xufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzIwcHgpIHtcbiAgaW9uLXRodW1ibmFpbCB7XG4gICAgLS1zaXplOiA5NXB4O1xuICB9XG5cbiAgLmltZy1jb3VudCB7XG4gICAgYm90dG9tOiA2NnB4O1xuICAgIGZvbnQtc2l6ZTogMjVweDtcbiAgfVxuXG4gIC5pbWctcHVibGlzaCB7XG4gICAgd2lkdGg6IDk1cHg7XG4gIH1cblxuICAuZmxhdGljb24tc2VuZDo6YmVmb3JlIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IC0xM3B4O1xuICB9XG5cbiAgaW9uLXRodW1ibmFpbC5wcm9kdWN0LWltZyB7XG4gICAgLS1zaXplOiAxMTBweDtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjAwcHgpIHtcbiAgLm1lc3NhZ2UtdXNlciB7XG4gICAgbWFyZ2luLWxlZnQ6IC01MHB4O1xuICB9XG5cbiAgLm0tbGVmdCB7XG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgfVxuXG4gIGlvbi10aHVtYm5haWwge1xuICAgIC0tc2l6ZTogMjIycHg7XG4gIH1cblxuICAuaW1nLWNvdW50IHtcbiAgICBib3R0b206IDEzNnB4O1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgfVxuXG4gIC5jb2wtcGFkZGluZyB7XG4gICAgcGFkZGluZzogOHB4O1xuICB9XG5cbiAgLnRleHRhcmVhRWxlbWVudCB7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICB9XG5cbiAgLmltZy1wdWJsaXNoIHtcbiAgICB3aWR0aDogMjIycHg7XG4gIH1cblxuICBpb24tdGh1bWJuYWlsLnByb2R1Y3QtaW1nIHtcbiAgICAtLXNpemU6IDIwMHB4O1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3MDBweCkge1xuICAuY29sLXBhZGRpbmcge1xuICAgIHBhZGRpbmc6IDEycHg7XG4gIH1cblxuICBpb24tdGh1bWJuYWlsIHtcbiAgICAtLXNpemU6IDI3M3B4O1xuICB9XG5cbiAgLmltZy1wdWJsaXNoIHtcbiAgICB3aWR0aDogMjczcHg7XG4gIH1cblxuICAuaW1nLWNvdW50IHtcbiAgICBib3R0b206IDE2NXB4O1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgfVxuXG4gIC5tZXNzYWdlLWFkbWluIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gIH1cblxuICAubWVzc2FnZS11c2VyIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IC01NXB4O1xuICB9XG5cbiAgLmF2YXRhci1pbWcge1xuICAgIGhlaWdodDogNjBweDtcbiAgICB3aWR0aDogNjBweDtcbiAgfVxuXG4gIC5pbWctYnJvYWRjYXN0IHtcbiAgICBtYXJnaW4tcmlnaHQ6IDc1cHg7XG4gIH1cblxuICAuaW1nLW9yZGVyIHtcbiAgICBtYXJnaW4tbGVmdDogNzVweDtcbiAgfVxuXG4gIC5tLWxlZnQge1xuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XG4gIH1cblxuICAuaW1nLWFkbWluIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDc1cHg7XG4gIH1cblxuICAudXAtaWNvbi1hY3RpdmUge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgICBtYXJnaW4tbGVmdDogLTVweDtcbiAgfVxuXG4gIC51cC1pY29uLWRpc2FibGVkIHtcbiAgICBmb250LXNpemU6IDQwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IC01cHg7XG4gIH1cblxuICAuYWRkLWljb24tZGlzYWJsZWQge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgICByaWdodDogLTEwcHg7XG4gIH1cblxuICAuYWRkLWljb24tYWN0aXZlIHtcbiAgICBmb250LXNpemU6IDQwcHg7XG4gICAgcmlnaHQ6IC0xMHB4O1xuICB9XG5cbiAgLnRleHRhcmVhRWxlbWVudCB7XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICB9XG5cbiAgLmZsYXRpY29uLXNlbmQ6OmJlZm9yZSB7XG4gICAgZm9udC1zaXplOiA0MHB4O1xuICB9XG5cbiAgaW9uLXRodW1ibmFpbC5wcm9kdWN0LWltZyB7XG4gICAgLS1zaXplOiAyMzVweDtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KSB7XG4gIGlvbi10aHVtYm5haWwge1xuICAgIC0tc2l6ZTogMzcwcHg7XG4gIH1cblxuICAuaW1nLXB1Ymxpc2gge1xuICAgIHdpZHRoOiAzNzBweDtcbiAgfVxuXG4gIC5pbWctY291bnQge1xuICAgIGJvdHRvbTogMjIwcHg7XG4gICAgZm9udC1zaXplOiA1MHB4O1xuICB9XG5cbiAgLm1lc3NhZ2UtYWRtaW4ge1xuICAgIGZvbnQtc2l6ZTogMjVweDtcbiAgfVxuXG4gIC5tZXNzYWdlLXVzZXIge1xuICAgIG1hcmdpbi1sZWZ0OiAtODVweDtcbiAgICBmb250LXNpemU6IDI1cHg7XG4gIH1cblxuICAuYXZhdGFyLWltZyB7XG4gICAgaGVpZ2h0OiA0MHB4O1xuICAgIHdpZHRoOiA0MHB4O1xuICB9XG5cbiAgLmltZy1icm9hZGNhc3Qge1xuICAgIG1hcmdpbi1yaWdodDogODVweDtcbiAgfVxuXG4gIC5pbWctb3JkZXIge1xuICAgIG1hcmdpbi1sZWZ0OiA4NXB4O1xuICB9XG5cbiAgLmltZy1hZG1pbiB7XG4gICAgbWFyZ2luLXJpZ2h0OiA4NXB4O1xuICB9XG5cbiAgLnVwLWljb24tYWN0aXZlIHtcbiAgICBmb250LXNpemU6IDUwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IC01cHg7XG4gIH1cblxuICAudXAtaWNvbi1kaXNhYmxlZCB7XG4gICAgZm9udC1zaXplOiA1MHB4O1xuICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xuICB9XG5cbiAgLmFkZC1pY29uLWRpc2FibGVkIHtcbiAgICBmb250LXNpemU6IDUwcHg7XG4gICAgcmlnaHQ6IC0xMHB4O1xuICB9XG5cbiAgLmFkZC1pY29uLWFjdGl2ZSB7XG4gICAgZm9udC1zaXplOiA1MHB4O1xuICAgIHJpZ2h0OiAtMTBweDtcbiAgfVxuXG4gIC50ZXh0YXJlYUVsZW1lbnQge1xuICAgIGZvbnQtc2l6ZTogMjVweDtcbiAgfVxuXG4gIC5mbGF0aWNvbi1zZW5kOjpiZWZvcmUge1xuICAgIGZvbnQtc2l6ZTogNDVweDtcbiAgfVxuXG4gIGlvbi10aHVtYm5haWwucHJvZHVjdC1pbWcge1xuICAgIC0tc2l6ZTogMzAwcHg7XG4gIH1cbn1cbi53cmFwcGVyLWNvbnRhaW5lciB7XG4gIGZsb2F0OiBub25lO1xuICBjbGVhcjogYm90aDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmltZy1icm9hZGNhc3QuaGFsZiB7XG4gIHdpZHRoOiA1MCU7XG4gIGZsb2F0OiByaWdodDtcbn1cblxuLmltZy1wdWJsaXNoIHtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLmZpeGVkLWhlaWdodCB7XG4gIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSAzMTVweCk7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgcGFkZGluZzogMTZweDtcbn1cblxuLmJ0bi13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbn1cblxuLmlubGluZS1hbGlnbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5pbmxpbmUtYWxpZ24gaDYge1xuICBmb250LXNpemU6IDE1cHg7XG59XG5cbi5uby1kYXRhIHtcbiAgbWFyZ2luOiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gIGxlZnQ6IDUwJTtcbiAgbWFyZ2luLWxlZnQ6IC02NXB4O1xufVxuXG4ubm8tZGF0YSBpbWcge1xuICB3aWR0aDogMTMwcHg7XG59XG5cbmlvbi1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiAjRjJGMkYyO1xuICAtLXBhZGRpbmctYm90dG9tOiA1MHB4O1xufVxuXG5pb24tbGlzdCB7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLmF1ZC1wcm9kdWN0cy1jb250YWluZXIge1xuICBtYXJnaW46IDBweCAxMHB4IDEwcHggMTBweDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcGFkZGluZzogMTVweCA1cHggMTBweCAycHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmF1ZC1wcm9kdWN0LWltYWdlIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFwiLi4vLi4vLi4vYXNzZXRzL2ltZy9pbWctcHJlbG9hZGVyLnBuZ1wiKSBjZW50ZXIgbm8tcmVwZWF0O1xuICB3aWR0aDogODVweDtcbiAgaGVpZ2h0OiA4NXB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGxlZnQ6IDE1cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmMGYwZjA7XG59XG5cbi5hdWQtbW9yZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgwZGVnLCByZ2JhKDAsIDAsIDAsIDAuNSksIHRyYW5zcGFyZW50KTtcbiAgYm90dG9tOiAwO1xuICBoZWlnaHQ6IDIwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDg0cHg7XG4gIHotaW5kZXg6IDI7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDVweDtcbn1cblxuLmF1ZC1wcm9kdWN0LW5hbWUge1xuICBmb250LXNpemU6IDE0cHg7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi5hdWQtcHJvZHVjdC1wcmljZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cblxuLnNwaW5uZXIge1xuICBtYXJnaW4tdG9wOiA1MCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmF1ZC1wbGFjZWQtb24ge1xuICBmb250LXNpemU6IDEycHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgb3BhY2l0eTogMC43O1xuICBtYXJnaW4tYm90dG9tOiAzJTtcbn1cblxuLmF1ZC1wbGFjZWQtb24gc3BhbiB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5hdWQtb3JkZXItaWQge1xuICBtYXJnaW46IDE1cHggMTBweCAxcHg7XG4gIG9wYWNpdHk6IDAuODtcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuXG4uYXVkLWFjdGlvbi1idG4ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5hdWQtdmlldy1kZXRhaWxzLWJ0biB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuc3BhbiAuZmxhdGljb24tbnVsbC0yMDo6YmVmb3JlIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbn1cblxuc3BhbiAuZmxhdGljb24tbnVsbC0xOTo6YmVmb3JlIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xuICBtYXJnaW4tbGVmdDogMnB4O1xufVxuXG4uYWRkcmVzcy1jYXJkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbjogNnB4IDEycHggMTJweCAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi51c2VyLW5hbWUge1xuICBmb250LXNpemU6IDE1cHg7XG59XG5cbi5hZGRyZXNzIHtcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuXG4ucGhvbmUtbm8ge1xuICBmb250LXNpemU6IDEzcHg7XG4gIG1hcmdpbi1ib3R0b206IC01cHg7XG59XG5cbi50cmFucy13cmFwcGVyIHtcbiAgbWFyZ2luLXRvcDogMTVweDtcbiAgcGFkZGluZy1ib3R0b206IDUwcHg7XG59XG5cbi50cmFucy1jb25hdGluZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDE1cHg7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG4udHJhbnMtdHlwZSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IHNtYWxsO1xufVxuXG4udHJhbnMtbXNnIHtcbiAgbWFyZ2luLXRvcDogMHB4O1xufVxuXG4udHJhbnMtZGF0ZSB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgb3BhY2l0eTogMC42O1xufVxuXG4uY2FuY2VsLWJ0biB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgY29sb3I6IHdoaXRlO1xufVxuLmNhbmNlbC1idG4gZGl2IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnNhdmUtYnRuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xufVxuXG4ubWFyZ2luLWljb24ge1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuXG5pb24tZm9vdGVyIGlvbi10aXRsZSB7XG4gIGhlaWdodDogNDVweDtcbn1cblxuLmJvdHRvbS1idXR0b25zIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuXG4udXNlckluZm8ge1xuICBib3JkZXI6IG5vbmU7XG4gIHdpZHRoOiAxMDB2dztcbiAgaGVpZ2h0OiAxNXZoO1xuICBwYWRkaW5nOiAxMHB4O1xuICBvdXRsaW5lOiBub25lO1xufVxuXG4uZGl2aWRlciB7XG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgbWFyZ2luOiAyNnB4IDA7XG59XG5cbi5pb24tanVzdGlmeS1jb250ZW50LWVuZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogbm93cmFwO1xufVxuXG5pbWcge1xuICBtYXgtaGVpZ2h0OiA1MDBweDtcbiAgbWF4LXdpZHRoOiA1MDBweDtcbn1cblxuLmJhZGdlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBtYXJnaW4tbGVmdDogNXB4O1xuICBwYWRkaW5nOiAycHggNnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG4gIG1hcmdpbi10b3A6IC0ycHg7XG59XG5cbiNzY3JvbGwxIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA3MC41dmg7XG59XG5cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDY1dmg7XG59XG5cbiNzY3JvbGwyOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDMge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDgwdmg7XG59XG5cbiNzY3JvbGwzOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuLndoYXRzYXBwLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4ud2hhdHNhcHAtY29udGFpbmVyIGltZyB7XG4gIHdpZHRoOiAyNXB4O1xuICBoZWlnaHQ6IDI1cHg7XG4gIG1hcmdpbi10b3A6IGF1dG87XG59XG5cbi53YS10ZXh0LWNvbnRhaW5lciB7XG4gIG1hcmdpbi1ib3R0b206IC0xM3B4O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuXG4ubS1yLTUge1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cblxuLmxpbmsge1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cblxuLmVycm9yLWljb24ge1xuICBtYXJnaW4tdG9wOiBhdXRvO1xuICBmb250LXNpemU6IDE4cHg7XG59XG5cbi5yZWQge1xuICBjb2xvcjogcmVkO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLWhlaWdodDogMTIwMHB4KSB7XG4gICNzY3JvbGwxIHtcbiAgICBoZWlnaHQ6IDgyLjV2aDtcbiAgfVxuXG4gICNzY3JvbGwyIHtcbiAgICBoZWlnaHQ6IDcydmg7XG4gIH1cblxuICAjc2Nyb2xsMyB7XG4gICAgaGVpZ2h0OiA5MnZoO1xuICB9XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/admin-home/admin-home.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/admin/admin-home/admin-home.page.ts ***!
  \*****************************************************/
/*! exports provided: AdminHomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminHomePage", function() { return AdminHomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var src_app_guide_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/guide.service */ "./src/app/guide.service.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/image-picker/ngx */ "./node_modules/@ionic-native/image-picker/ngx/index.js");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var _view_order_view_order_page__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./view-order/view-order.page */ "./src/app/admin/admin-home/view-order/view-order.page.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/services/user-groups/user-groups.service */ "./src/app/services/user-groups/user-groups.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_manager_manager_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/services/manager/manager.service */ "./src/app/services/manager/manager.service.ts");
/* harmony import */ var src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/services/whatsapp-dashboard/whatsapp-dashboard.service */ "./src/app/services/whatsapp-dashboard/whatsapp-dashboard.service.ts");



















var AdminHomePage = /** @class */ (function () {
    function AdminHomePage(events, router, toastController, chatService, guideService, configService, labelService, storage, route, actionSheetController, camera, imagePicker, loadingController, userService, userGroupsService, modalController, sharedService, managerService, whatsappService) {
        this.events = events;
        this.router = router;
        this.toastController = toastController;
        this.chatService = chatService;
        this.guideService = guideService;
        this.configService = configService;
        this.labelService = labelService;
        this.storage = storage;
        this.route = route;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.imagePicker = imagePicker;
        this.loadingController = loadingController;
        this.userService = userService;
        this.userGroupsService = userGroupsService;
        this.modalController = modalController;
        this.sharedService = sharedService;
        this.managerService = managerService;
        this.whatsappService = whatsappService;
        this.showLoader = true;
        this.lastTimeBackPress = 0;
        this.timePeriodToExit = 2000;
        this.showSearch = false;
        this.searchUser = '';
        this.searchUserPhone = '';
        this.noMoreMsgs = false;
        this.loadingTxt = '';
        this.ADMIN_HOME_LABELS = {};
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
        this.disableSendBtn = true;
        this.imgUrls = [];
        this.setFirstImage = false;
        this.adminMsgText = '';
        this.unsavedImages = {};
        this.showFooter = false;
        this.cashbackBalance = 0;
        this.transactions = [];
        this.orders = [];
        this.ordersLoader = true;
        this.previousIndex = 0;
        this.doneTypingInterval = 1000;
        this.phoneLimit = 0;
        // whatsapp
        this.sendToWhatsapp = false;
        this.whatsapp = false;
    }
    AdminHomePage.prototype.ngOnInit = function () {
        this.guideService.changeUrl("admin-home");
        this.guideService.checkClient(this.configService.environment.isBwiClient);
        this.currencyCode = this.configService.environment.currencyCode;
        this.phoneLimit = this.configService.environment.phoneLength;
        this.whatsapp = this.configService.environment.whatsapp;
    };
    AdminHomePage.prototype.ngOnDestroy = function () {
    };
    AdminHomePage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var groups, userRole, uid, managerDetails_1, _a, account;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.initializeSubscriptions();
                        this.events.publish('chat:getLastMsgs', this.selectedGroups);
                        this.ADMIN_HOME_LABELS = this.labelService.labels['ADMIN_HOME'];
                        this.loadingTxt = this.ADMIN_HOME_LABELS['loading_more_messages'];
                        if (this.loadMoreEv) {
                            console.log('in ifff');
                            this.noMoreMsgs = false;
                            this.loadMoreEv.target.disabled = false;
                        }
                        return [4 /*yield*/, this.userGroupsService.getAllGroups()];
                    case 1:
                        groups = _b.sent();
                        return [4 /*yield*/, this.storage.get('userRole')];
                    case 2:
                        userRole = _b.sent();
                        if (!(userRole == 'manager')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.storage.get('uid')];
                    case 3:
                        uid = _b.sent();
                        return [4 /*yield*/, this.managerService.getManagerData(uid, 'service')];
                    case 4:
                        managerDetails_1 = _b.sent();
                        if (!(managerDetails_1 && managerDetails_1.groups && managerDetails_1.groups.length)) return [3 /*break*/, 6];
                        _a = this;
                        return [4 /*yield*/, groups.filter(function (group) { return managerDetails_1.groups.includes(group.id); })];
                    case 5:
                        _a.groups = _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        this.groups = [];
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        this.groups = groups;
                        _b.label = 9;
                    case 9: return [4 /*yield*/, this.whatsappService.getWhatsappCredentials()];
                    case 10:
                        account = _b.sent();
                        this.insights = account.insights || null;
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminHomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () {
            _this.onClickLastMsg(_this.lastMsgs[0].id, _this.previousIndex);
        }, 1000);
    };
    AdminHomePage.prototype.ionViewWillLeave = function () {
        this.showSearch = false;
        this.searchUser = '';
        this.searchUserPhone = '';
        this.chatService.makeadminActiveFalse(this.userid);
        this.removeSubscriptions();
    };
    AdminHomePage.prototype.initializeSubscriptions = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var uid;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get('uid')];
                    case 1:
                        uid = _a.sent();
                        this.events.subscribe('chat:publishLastMsgs', function (msgs) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            var index;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                index = msgs.findIndex(function (msg) { return msg.id === uid; });
                                if (index !== -1) {
                                    msgs.splice(index, 1);
                                }
                                this.lastMsgs = msgs;
                                this.showLoader = false;
                                return [2 /*return*/];
                            });
                        }); });
                        this.events.subscribe('chat:publishMoreLastMsgs', function (msgs) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            var uid, index, objDiv2;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.storage.get('uid')];
                                    case 1:
                                        uid = _a.sent();
                                        index = msgs.findIndex(function (msg) { return msg.id === uid; });
                                        if (index !== -1) {
                                            msgs.splice(index, 1);
                                        }
                                        this.lastMsgs = msgs;
                                        this.showLoader = false;
                                        objDiv2 = document.getElementById("scroll1");
                                        if (objDiv2) {
                                            objDiv2.scrollTop = objDiv2.scrollHeight;
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.events.subscribe('chat:msgsForAdminHomeLimitReached', function () {
                            console.log('in msgsForAdminHomeLimitReached');
                            _this.noMoreMsgs = true;
                        });
                        this.events.subscribe('chat:publishMsgs', function (msgs) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            var _this = this;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.allMsgs = msgs;
                                        console.log('msgs:', msgs);
                                        this.showMsgLoader = false;
                                        this.showLoader = false;
                                        return [4 /*yield*/, this.checkLastWhatsappMsg(this.userid)];
                                    case 1:
                                        _a.sent();
                                        if (this.allMsgs) {
                                            this.makeImageUrls();
                                        }
                                        this.removeSavedImagesFromStorage();
                                        setTimeout(function () {
                                            _this.enableScroll = true;
                                        }, 2000);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.events.subscribe('chat:publishMoreMsgs', function (msgs) {
                            _this.allMsgs = msgs;
                            _this.chatLoader = false;
                            _this.makeImageUrls();
                        });
                        this.events.subscribe('chat:noMoreMsgs', function () {
                            _this.chatLoader = false;
                            _this.showNoMsgs = true;
                        });
                        this.events.subscribe('user:publishUserDetails', function (user) {
                            _this.userDetails = user;
                            _this.phoneNo = user.phoneNo;
                            _this.registeredDate = _this.userDetails.createdAt;
                            _this.lastActiveDate = _this.userDetails.lastAccessAt;
                        });
                        this.events.subscribe('media:chatImageSuccess', function () {
                        });
                        this.events.subscribe('media:showUnsavedImages', function (msgId, imageResponse) {
                            _this.unsavedImages[msgId] = imageResponse;
                            _this.storage.set('unsavedImages', _this.unsavedImages);
                        });
                        this.events.subscribe('wallet:publishUserWalletDetails', function (data) {
                            if (data) {
                                _this.balance = data.wallet ? data.wallet.balance : 0;
                                _this.cashbackBalance = data.wallet && data.wallet.cashback ? data.wallet.cashback : 0;
                            }
                        });
                        this.events.subscribe('wallet:publishWalletTrans', function (transactions) {
                            _this.transactions = transactions && transactions.length ? transactions : [];
                        });
                        this.events.subscribe('user:publishAllOrdersOfUser', function (orders) {
                            _this.orders = orders && orders.length ? orders : [];
                            _this.ordersLoader = false;
                        });
                        this.events.subscribe('user:noOrderHistoryOfUser', function () {
                            _this.ordersLoader = false;
                            _this.orders = [];
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminHomePage.prototype.onClickLastMsg = function (id, i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var prevMsgDiv, msgDiv;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.events.publish('chat:removeGetMsgsSubscription');
                        this.userid = id;
                        this.events.publish('user:getUserDetails', id);
                        this.events.publish('chat:getMsgs', id, 'admin');
                        this.events.publish('wallet:getWalletTrans', id);
                        this.events.publish('wallet:getUserWalletDetails', id);
                        this.events.publish('user:getAllOrdersOfUser', id);
                        this.chatService.makeadminActiveTrue(id);
                        this.lastMsgs[i].unreadMsgs = 0;
                        this.showFooter = true;
                        setTimeout(function () {
                            var objDiv = document.getElementById("scroll2");
                            if (objDiv) {
                                objDiv.scrollTop = objDiv.scrollHeight;
                            }
                        }, 1000);
                        prevMsgDiv = document.getElementById("message" + this.previousIndex);
                        prevMsgDiv.style.background = 'white';
                        msgDiv = document.getElementById("message" + i);
                        msgDiv.style.background = 'var( --ion-color-categories-background)';
                        this.previousIndex = i;
                        return [4 /*yield*/, this.checkLastWhatsappMsg(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminHomePage.prototype.checkLastWhatsappMsg = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var lastWhatsappMsg, lastWhatsappMsgTime;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.sendToWhatsapp = false;
                        return [4 /*yield*/, this.chatService.getLastWhatsappMsg(id)];
                    case 1:
                        lastWhatsappMsg = _a.sent();
                        console.log('lastWhatsappMsg:', lastWhatsappMsg);
                        if (lastWhatsappMsg && this.whatsapp) {
                            lastWhatsappMsgTime = this.calculateTimeDiff(lastWhatsappMsg.createdAt.toDate());
                            console.log('lastWhatsappMsgTime:', lastWhatsappMsgTime);
                            if (lastWhatsappMsg && lastWhatsappMsgTime < 24) {
                                this.sendToWhatsapp = true;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminHomePage.prototype.goToBroadcastMsg = function () {
        this.router.navigate(['broadcast-msg']);
    };
    AdminHomePage.prototype.calculateHoursDiff = function (lastMessageAt) {
        var currentHours = new Date();
        var diffHours = (lastMessageAt.toDate().getTime() - currentHours.getTime()) / 1000;
        diffHours /= (60 * 60);
        return Math.abs(Math.round(diffHours));
    };
    AdminHomePage.prototype.clearSearchUser = function () {
        this.searchUser = null;
    };
    AdminHomePage.prototype.loadMoreMessagesForAdminHome = function (event) {
        this.loadMoreEv = event;
        console.log('loading more messages...');
        this.events.publish('chat:loadMoreMessagesForAdminHome', this.selectedGroups);
    };
    AdminHomePage.prototype.presentToast = function (msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            color: 'medium',
                            message: msg,
                            duration: 2000,
                            showCloseButton: true,
                            cssClass: 'toast',
                            animated: true
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminHomePage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('chat:publishLastMsgs');
        this.events.unsubscribe('chat:publishMoreLastMsgs');
        this.events.unsubscribe('chat:msgsForAdminHomeLimitReached');
        this.events.unsubscribe('chat:publishMsgs');
        this.events.unsubscribe('chat:publishMoreMsgs');
        this.events.unsubscribe('user:publishUserDetails');
        this.events.unsubscribe('media:chatImageSuccess');
        this.events.unsubscribe('media:showUnsavedImages');
        this.events.unsubscribe('chat:noMoreMsgs');
        this.events.publish('chat:removeGetMsgsSubscription');
    };
    AdminHomePage.prototype.removeSavedImagesFromStorage = function () {
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
    AdminHomePage.prototype.scrollToBottomOnInit = function () {
        var _this = this;
        // //console.log('in scrollToBottomOnInit...');
        setTimeout(function () {
            if (_this.content.scrollToBottom) {
                _this.content.scrollToBottom(0);
            }
        }, 1000);
    };
    AdminHomePage.prototype.getNameWithPhoneNo = function () {
        if (this.userDetails)
            return this.userDetails.name !== 'user' ? this.userDetails.name : this.userDetails.name + " " + (this.userDetails.phoneNo ? "(" + this.userDetails.phoneNo + ")" : '');
    };
    AdminHomePage.prototype.logScrolling = function ($event) {
        if ($event.detail.scrollTop === 0 && !this.searchMsg) {
            this.chatLoader = true;
            this.showNoMsgs = false;
            this.events.publish('chat:getMoreMsgs', this.userid);
        }
    };
    AdminHomePage.prototype.scrollToFirstMessage = function (elementId) {
        var y = document.getElementById(elementId).offsetTop;
        // //console.log('y position', y);
        this.content.scrollToPoint(0, y);
    };
    AdminHomePage.prototype.makeImageUrls = function () {
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
    AdminHomePage.prototype.preventFocusChange = function (e) {
        e.preventDefault();
    };
    AdminHomePage.prototype.sendMessage = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var data, msg, objDiv;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.adminMsgText !== '')) return [3 /*break*/, 4];
                        // this.content.scrollToBottom(0);
                        this.enableScroll = false;
                        this.showMsgLoader = true;
                        if (!(this.whatsapp && this.sendToWhatsapp)) return [3 /*break*/, 2];
                        if (this.insights && this.insights.creditsUsed >= this.insights.chatLimit) {
                            this.sharedService.presentAlert('You have reached your free limit for whatsapp, kindly upgrade your plan to use the services.');
                            return [2 /*return*/];
                        }
                        data = {
                            type: 'msg',
                            userId: this.userid,
                            msg: {
                                type: 'txt',
                                createdAt: new Date(),
                                isRead: null,
                                author: 'admin',
                                published: false,
                                message: this.adminMsgText
                            },
                            phoneNo: this.phoneNo
                        };
                        this.allMsgs.push({ msgData: data.msg });
                        return [4 /*yield*/, this.chatService.sendMsgOnWhatsapp(data)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        msg = {
                            type: 'txt',
                            createdAt: new Date(),
                            isRead: null,
                            author: 'admin',
                            published: false,
                            message: this.adminMsgText
                        };
                        this.allMsgs.push({ msgData: msg });
                        this.events.publish('chat:sendMsg', msg, this.userid);
                        _a.label = 3;
                    case 3:
                        this.adminMsgText = '';
                        objDiv = document.getElementById("scroll2");
                        objDiv.scrollTop = objDiv.scrollHeight;
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminHomePage.prototype.uploadImage = function (files) {
        var _this = this;
        var imageResponse = [];
        for (var i = 0; i < files.length; i++) {
            if (files[i].size / 1024 / 1024 > 5) { //Size of img is in bytes.
                this.sharedService.presentAlert('Image size cannot be greater than 5MB.');
                return;
            }
            var reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = function (event) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                var base64Image, base64Str, size;
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            base64Image = event.target.result;
                            base64Str = base64Image.split(',');
                            size = this.calculateImageSize(base64Str[1]);
                            imageResponse.push({ url: base64Image, size: size });
                            // //console.log('size of image', size);
                            this.msg.type = 'image';
                            this.msg.createdAt = new Date();
                            this.msg.isRead = null;
                            this.msg.author = 'admin';
                            this.msg.published = false;
                            this.allMsgs.push(this.msg);
                            if (!(this.whatsapp && this.sendToWhatsapp)) return [3 /*break*/, 4];
                            if (!(this.insights && this.insights.creditsUsed >= this.insights.chatLimit)) return [3 /*break*/, 1];
                            this.sharedService.presentAlert('You have reached your free limit for whatsapp, kindly upgrade your plan to use the services.');
                            return [2 /*return*/];
                        case 1: return [4 /*yield*/, this.chatService.sendImgOnWhatsapp(this.userid, this.msg, imageResponse, this.phoneNo)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            this.events.publish('media:addChatImage', this.userid, this.msg, imageResponse);
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
        }
    };
    AdminHomePage.prototype.imageActionSheet = function () {
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
    AdminHomePage.prototype.addCameraImage = function () {
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
    AdminHomePage.prototype.addGalleryImages = function () {
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
    AdminHomePage.prototype.calculateImageSize = function (base64String) {
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
    AdminHomePage.prototype.imageZoom = function (img) {
        var imgIndex = this.imgUrls.indexOf(img);
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_12__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: this.imgUrls,
                index: imgIndex
            }
        }).then(function (modal) { return modal.present(); });
    };
    AdminHomePage.prototype.gridImageZoom = function (imgs) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_12__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: imgs,
                index: 0
            }
        }).then(function (modal) { return modal.present(); });
    };
    AdminHomePage.prototype.hideSearchMessage = function () {
        this.searchMsg = null;
        // this.content.scrollToBottom(0);
    };
    AdminHomePage.prototype.calculateMsgTime = function (time) {
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
    AdminHomePage.prototype.changeInMsgInput = function () {
        this.disableSendBtn = false;
    };
    AdminHomePage.prototype.isDate = function (date) {
        return date instanceof Date;
    };
    AdminHomePage.prototype.singleImageZoom = function (img) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_12__["ImageModalPage"],
            componentProps: {
                imgs: [{ url: img }],
                index: 0
            }
        }).then(function (modal) { return modal.present(); });
    };
    AdminHomePage.prototype.calcTotalAmount = function (products) {
        var totalAmount = 0;
        for (var i = 0; i < products.length; i++) {
            totalAmount += products[i].price;
        }
        return totalAmount;
    };
    AdminHomePage.prototype.onClickViewOrder = function (orderId) {
        this.modalController.create({
            component: _view_order_view_order_page__WEBPACK_IMPORTED_MODULE_13__["ViewOrderPage"],
            cssClass: 'view-order-css',
            componentProps: {
                orderId: orderId
            }
        }).then(function (modal) { return modal.present(); });
    };
    AdminHomePage.prototype.presentLoading = function () {
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
    AdminHomePage.prototype.callUser = function () {
        /* this.callNumber.callNumber(this.userDetails.phoneNo, true)
         .then(res =>  console.log('Launched dialer!', res))
         .catch(err =>  console.log('Error launching dialer', err));*/
    };
    AdminHomePage.prototype.onClickTrackOrder = function (agentId, deliveryLatLng) {
        var navigationExtras = {
            state: {
                agentId: agentId,
                deliveryLatLng: deliveryLatLng
            }
        };
        this.router.navigate(['location-map'], navigationExtras);
    };
    AdminHomePage.prototype.presentActionSheet = function () {
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
    AdminHomePage.prototype.openUserDetails = function (index) {
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
    AdminHomePage.prototype.messageModifications = function (msg) {
        msg = msg.trim();
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        var text1 = msg.replace(exp, '<a href=\'$1\'>$1</a>');
        var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        var finalText = text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
        return finalText;
    };
    AdminHomePage.prototype.onClickViewDetails = function (id) {
        this.modalController.create({
            component: _view_order_view_order_page__WEBPACK_IMPORTED_MODULE_13__["ViewOrderPage"],
            cssClass: 'view-order-css',
            componentProps: {
                orderId: id
            }
        }).then(function (modal) { return modal.present(); });
    };
    AdminHomePage.prototype.getDateTimeFormat = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_14__(date).format('D MMM, YYYY hh:mm a');
    };
    AdminHomePage.prototype.clearPhone = function () {
        this.searchUserPhone = '';
        this.events.publish('chat:getLastMsgs', this.selectedGroups);
    };
    AdminHomePage.prototype.clearName = function () {
        this.searchUser = '';
        this.events.publish('chat:getLastMsgs', this.selectedGroups);
    };
    AdminHomePage.prototype.fireSearchQuery = function () {
        if (this.searchUserPhone != '') {
            this.events.publish('chat:searchUserByPhone', this.configService.environment.defaultCountryCode + this.searchUserPhone);
        }
        if (this.searchUser != '') {
            this.events.publish('chat:searchUser', this.searchUser);
        }
    };
    AdminHomePage.prototype.showAllMsgs = function () {
        this.searchUser = '';
        this.searchUserPhone = '';
        this.selectedGroups = [];
        this.events.publish('chat:getLastMsgs', this.selectedGroups);
    };
    AdminHomePage.prototype.getGroupUsers = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, event.target.value];
                    case 1:
                        _a.selectedGroups = _b.sent();
                        if (this.selectedGroups && this.selectedGroups.length > 10) {
                            this.sharedService.presentAlert('You can only select upto 10 Groups');
                            this.selectedGroups = [];
                            event.target.value = [];
                        }
                        else {
                            this.events.publish('chat:getLastMsgs', this.selectedGroups);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminHomePage.prototype.calculateTimeDiff = function (date) {
        var PT = new Date(date);
        var CT = new Date();
        var hours = (CT - PT) / 36e5;
        console.log('hours', hours);
        return hours;
    };
    AdminHomePage.prototype.sendWATemplate = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var data, success;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _a.sent();
                        data = {
                            type: 'template',
                            userId: this.userid,
                            phoneNo: this.phoneNo
                        };
                        return [4 /*yield*/, this.chatService.sendMsgOnWhatsapp(data)];
                    case 2:
                        success = _a.sent();
                        if (this.sharedService.loading) {
                            this.sharedService.loading.dismiss();
                        }
                        if (success) {
                            this.sharedService.presentAlert('Template sent successfully');
                        }
                        else {
                            this.sharedService.presentAlert('Something went wrong, Please try again later.');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminHomePage.prototype.openDoc = function (url) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                window.open(url, "_blank");
                return [2 /*return*/];
            });
        });
    };
    AdminHomePage.prototype.showErrMsg = function () {
        this.presentToast('Message failed to send because more than 24 hours have passed since the customer last replied to this number.');
    };
    AdminHomePage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
        { type: src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_4__["ChatService"] },
        { type: src_app_guide_service__WEBPACK_IMPORTED_MODULE_5__["GuideService"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"] },
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_8__["LabelService"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ActionSheetController"] },
        { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_10__["Camera"] },
        { type: _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_9__["ImagePicker"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
        { type: src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_11__["UserService"] },
        { type: src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_15__["UserGroupsService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_16__["SharedService"] },
        { type: src_app_services_manager_manager_service__WEBPACK_IMPORTED_MODULE_17__["ManagerService"] },
        { type: src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_18__["WhatsappDashboardService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonRouterOutlet"], { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonRouterOutlet"])
    ], AdminHomePage.prototype, "routerOutlet", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"], { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonContent"])
    ], AdminHomePage.prototype, "content", void 0);
    AdminHomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-admin-home',
            template: __webpack_require__(/*! raw-loader!./admin-home.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-home/admin-home.page.html"),
            styles: [__webpack_require__(/*! ./admin-home.page.scss */ "./src/app/admin/admin-home/admin-home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"], src_app_services_chat_service__WEBPACK_IMPORTED_MODULE_4__["ChatService"],
            src_app_guide_service__WEBPACK_IMPORTED_MODULE_5__["GuideService"], src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"], src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_8__["LabelService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ActionSheetController"],
            _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_10__["Camera"], _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_9__["ImagePicker"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
            src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_11__["UserService"],
            src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_15__["UserGroupsService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_16__["SharedService"],
            src_app_services_manager_manager_service__WEBPACK_IMPORTED_MODULE_17__["ManagerService"],
            src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_18__["WhatsappDashboardService"]])
    ], AdminHomePage);
    return AdminHomePage;
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
//# sourceMappingURL=admin-admin-home-admin-home-module-es5.js.map