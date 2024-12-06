(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-home-broadcast-msg-broadcast-msg-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-home/broadcast-msg/broadcast-msg.page.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-home/broadcast-msg/broadcast-msg.page.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\"\r\n      slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>BroadCast Message</ion-title>\r\n  </ion-toolbar>\r\n  <div class=\"header-cart-btn\">\r\n    <ion-button fill=\"solid\"\r\n      color=\"secondary\">\r\n      <span class=\"icon\"\r\n        slot=\"start\">\r\n        <i class=\"flaticon-null\"\r\n          slot=\"start\"></i>\r\n        <span class=\"count\">5</span>\r\n      </span>\r\n    </ion-button>\r\n    <ion-button fill=\"solid\"\r\n      color=\"secondary\">\r\n      <span class=\"icon\"\r\n        slot=\"start\">\r\n        <i class=\"flaticon-shopping-bag\"\r\n          slot=\"start\"></i>\r\n        <span class=\"count\">2</span>\r\n      </span>\r\n    </ion-button>\r\n  </div>\r\n</ion-header>\r\n<ion-content>\r\n  <div class=\"main-container ion-text-center\"\r\n    style=\"width: 100%\">\r\n    <ion-grid style=\"margin-top: 10px\">\r\n      <ion-row>\r\n        <ion-col style=\"height: 80vh;overflow-y: auto;\">\r\n          <ion-grid class=\"left-align\">\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <ion-text color=\"danger\">\r\n                  <p>Note: You can send Broadcast Message only once in\r\n                    {{broadcastHrs}} Hour(s). Broadcast message will be sent\r\n                    only to active users (users who still have app on their\r\n                    phone).\r\n                    Broadcast Message won’t be sent to users who have deleted\r\n                    app.</p>\r\n                </ion-text>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Notification Title (Only 65 Characters will be\r\n                    shown in Notification Title)</ion-label>\r\n                  <ion-input type=\"text\"\r\n                    class=\"form-input\"\r\n                    [(ngModel)]=\"msg.title\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Broadcast Message (only first 240 characters will\r\n                    be displayed in notification without image and only 65\r\n                    characters will be displayed with image)</ion-label>\r\n                  <ion-textarea class=\"form-input ion-text-left m-t-16\"\r\n                    rows=\"6\"\r\n                    [(ngModel)]=\"msg.message\"\r\n                    placeholder=\"Type a message\"></ion-textarea>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Broadcast Image</ion-label>\r\n                  <ion-text color=\"danger\">\r\n                    <p>Image size for best view : 1024 px x 512 px</p>\r\n                  </ion-text>\r\n                  <div class=\"upload-btn-wrapper\"\r\n                    style=\"display: block;margin-top: 12px;\">\r\n                    <button class=\"upload-btn btn-1 i-start\"> <i\r\n                        class=\"flaticon-null-16\"></i>upload</button>\r\n                    <input type=\"file\"\r\n                      name=\"myfile\"\r\n                      (change)=\"uploadImage($event.target.files)\"\r\n                      multiple />\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n\r\n          <div class=\"img-container\">\r\n            <div *ngIf=\"imageResponse.length !== 0\">\r\n              <div class=\"img-wrap\"\r\n                *ngFor=\"let img of imageResponse; let i = index\">\r\n                <img class=\"category-img\"\r\n                  [src]=\"img.url\" />\r\n                <div class=\"overlay\">\r\n                  <ion-button class=\"btn-2\"\r\n                    shape=\"round\"\r\n                    color=\"danger\"\r\n                    fill=\"clear\"\r\n                    (click)=\"removeImage(i)\">\r\n                    <ion-icon name=\"trash\"\r\n                      slot=\"icon-only\"></ion-icon>\r\n                  </ion-button>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <ion-grid>\r\n            <ion-row class=\"m-t-26\">\r\n              <ion-col size=\"12\">\r\n                <div class=\"assign-delivery\">\r\n                  <!-- <div style=\"display: flex;align-items: center;\">\r\n                    <p>Select Groups</p>\r\n                  </div>\r\n                  <br> -->\r\n                  <ion-list *ngIf=\"groups\">\r\n                    <ion-item lines=\"none\" class=\"border\">\r\n                      <ion-label>Select Groups</ion-label>\r\n                      <ion-select [(ngModel)]=\"msg.groups\" multiple placeholder=\"Select Groups\">\r\n                        <ng-container *ngFor=\"let group of groups\">\r\n                          <ion-select-option [value]=\"group.id\">{{group.name}}\r\n                          </ion-select-option>\r\n                        </ng-container>\r\n                      </ion-select>\r\n                    </ion-item>\r\n                  </ion-list>\r\n                  <ion-text color=\"danger t-a-l\">\r\n                    <p>Note: You can broadcast message upto 10 Groups.</p>\r\n                  </ion-text>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row class=\"m-t-26\">\r\n              <ion-col size=\"12\">\r\n                <ion-text color=\"danger\">\r\n                  <p class=\"left-align\">Note: Broadcast Message Linking will\r\n                    work only on app version 1.0.50 and above. (1.0.50 will be\r\n                    released in June, 2021)</p>\r\n                </ion-text>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <p class=\"left-align\">Notification Linking</p>\r\n                <ion-list>\r\n                  <ion-radio-group [value]=\"bannerData.link.type\">\r\n                    <ion-item class=\"bs-links\"\r\n                      *ngFor=\"let link of linkTypes; let i=index;\"\r\n                      lines=\"none\"\r\n                      (click)=\"selectLinkType(i)\">\r\n                      <ion-radio slot=\"start\"\r\n                        [value]=\"link\"></ion-radio>\r\n                      <ion-label *ngIf=\"link === 'subcategory'\">\r\n                        Subcategory : <ng-container\r\n                          *ngIf=\"(link === bannerData.link.type) \">\r\n                          {{bannerData.link.name}}</ng-container>\r\n                      </ion-label>\r\n                      <ion-label *ngIf=\"link != 'subcategory'\">\r\n                        {{link}} : <ng-container\r\n                          *ngIf=\"(link === bannerData.link.type) \">\r\n                          {{bannerData.link.name}}</ng-container>\r\n                      </ion-label>\r\n                    </ion-item>\r\n                  </ion-radio-group>\r\n\r\n                </ion-list>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n\r\n          <ion-button class=\"btn-1\"\r\n            shape=\"round\"\r\n            (click)=\"sendMessage()\">\r\n            <i class=\"flaticon-null-15\"></i>&nbsp;&nbsp;\r\n            Send BroadCast Message\r\n          </ion-button>\r\n        </ion-col>\r\n        <ion-col>\r\n          <div\r\n            style=\"position: absolute;text-align: center;z-index: 999;width: 100%;background: white;font-weight: bold;font-size: 16px\">\r\n            <p style=\"font-size: 16px;\">Broadcast Message History</p>\r\n          </div>\r\n          <br>\r\n          <div style=\"height: 80vh;overflow-y: auto;\">\r\n            <div *ngFor=\"let message of allMessages; let i=index\"\r\n              style=\"text-align: left; padding: 10px; border: 1px solid lightgray;margin-bottom: 10px;\">\r\n              <p style=\"text-align: center;font-size: 12px;\">Broadcasted on\r\n                {{getDateTimeFormat(message.createdAt.toDate())}}</p>\r\n              <br>\r\n              <div\r\n                style=\"display: flex;align-content: center;justify-content: space-between;align-items: center;\">\r\n                <div>\r\n                  <p *ngIf=\"message.title\">\r\n                    <strong>Title</strong>&nbsp;:&nbsp;<span>{{message.title}}</span>\r\n                  </p>\r\n                  <p *ngIf=\"message.message\">\r\n                    <strong>Message</strong>&nbsp;:&nbsp;<span>{{message.message}}</span>\r\n                  </p>\r\n                </div>\r\n                <div class=\"img-container\"\r\n                  *ngIf=\"message.images.length !== 0\">\r\n                  <div>\r\n                    <img class=\"category-img\"\r\n                      [src]=\"message.images[0].url\"\r\n                      width=\"150\"\r\n                      (click)=\"imageZoom(message)\" />\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <br>\r\n              <div style=\"text-align: center;margin: 0% auto;\">\r\n                <ion-button fill=\"outline\"\r\n                  shape=\"round\"\r\n                  size=\"small\"\r\n                  class=\"add-btn\"\r\n                  (click)=\"sendMessageAgain(message)\"\r\n                  color=\"dark\">\r\n                  Send Again\r\n                </ion-button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/admin-home/broadcast-msg/broadcast-msg.module.ts":
/*!************************************************************************!*\
  !*** ./src/app/admin/admin-home/broadcast-msg/broadcast-msg.module.ts ***!
  \************************************************************************/
/*! exports provided: BroadcastMsgPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BroadcastMsgPageModule", function() { return BroadcastMsgPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _broadcast_msg_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./broadcast-msg.page */ "./src/app/admin/admin-home/broadcast-msg/broadcast-msg.page.ts");







var routes = [
    {
        path: '',
        component: _broadcast_msg_page__WEBPACK_IMPORTED_MODULE_6__["BroadcastMsgPage"]
    }
];
var BroadcastMsgPageModule = /** @class */ (function () {
    function BroadcastMsgPageModule() {
    }
    BroadcastMsgPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_broadcast_msg_page__WEBPACK_IMPORTED_MODULE_6__["BroadcastMsgPage"]]
        })
    ], BroadcastMsgPageModule);
    return BroadcastMsgPageModule;
}());



/***/ }),

/***/ "./src/app/admin/admin-home/broadcast-msg/broadcast-msg.page.scss":
/*!************************************************************************!*\
  !*** ./src/app/admin/admin-home/broadcast-msg/broadcast-msg.page.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".img-container {\n  text-align: center;\n}\n.img-container .img-wrap {\n  display: inline-block;\n  margin-left: 16px;\n  position: relative;\n  border: var(--ion-color-medium) 1px solid;\n  border-radius: 16px;\n  overflow: hidden;\n  line-height: 0;\n}\n.img-container .img-wrap img {\n  width: auto;\n  height: 200px;\n}\n.img-container .img-wrap:hover .overlay {\n  opacity: 1;\n}\n.img-container .img-wrap .overlay {\n  opacity: 0;\n  -webkit-transition: all 500ms;\n  transition: all 500ms;\n  background: rgba(0, 0, 0, 0.5);\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.img-container .img-wrap .overlay ion-button.remove {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}\n.img-container .img-wrap .overlay ion-button.remove ion-icon {\n  font-size: 26px;\n}\n.left-align {\n  text-align: left;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4taG9tZS9icm9hZGNhc3QtbXNnL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcYWRtaW4taG9tZVxcYnJvYWRjYXN0LW1zZ1xcYnJvYWRjYXN0LW1zZy5wYWdlLnNjc3MiLCJzcmMvYXBwL2FkbWluL2FkbWluLWhvbWUvYnJvYWRjYXN0LW1zZy9icm9hZGNhc3QtbXNnLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0FDQ0o7QURBSTtFQUNFLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLHlDQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUNFTjtBRERNO0VBQ0UsV0FBQTtFQUNBLGFBQUE7QUNHUjtBREFRO0VBQ0UsVUFBQTtBQ0VWO0FEQ007RUFDRSxVQUFBO0VBQ0EsNkJBQUE7RUFBQSxxQkFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FDQ1I7QURBUTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7QUNFVjtBRERVO0VBQVMsZUFBQTtBQ0luQjtBREdBO0VBQ0UsZ0JBQUE7QUNBRiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2FkbWluLWhvbWUvYnJvYWRjYXN0LW1zZy9icm9hZGNhc3QtbXNnLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pbWctY29udGFpbmVye1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgLmltZy13cmFwe1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAxNnB4O1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIGJvcmRlcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSkgMXB4IHNvbGlkO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xyXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICBsaW5lLWhlaWdodDogMDtcclxuICAgICAgaW1ne1xyXG4gICAgICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgICAgIGhlaWdodDogMjAwcHg7XHJcbiAgICAgIH1cclxuICAgICAgJjpob3ZlcntcclxuICAgICAgICAub3ZlcmxheXtcclxuICAgICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC5vdmVybGF5e1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDUwMG1zO1xyXG4gICAgICAgIGJhY2tncm91bmQ6IHJnYigwLCAwLCAwLDAuNSk7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHRvcDowO1xyXG4gICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIGlvbi1idXR0b24ucmVtb3Zle1xyXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgdG9wOiA4cHg7XHJcbiAgICAgICAgICByaWdodDogOHB4O1xyXG4gICAgICAgICAgaW9uLWljb257Zm9udC1zaXplOiAyNnB4O31cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuLmxlZnQtYWxpZ257XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxufSIsIi5pbWctY29udGFpbmVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLmltZy1jb250YWluZXIgLmltZy13cmFwIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBtYXJnaW4tbGVmdDogMTZweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3JkZXI6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pIDFweCBzb2xpZDtcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbGluZS1oZWlnaHQ6IDA7XG59XG4uaW1nLWNvbnRhaW5lciAuaW1nLXdyYXAgaW1nIHtcbiAgd2lkdGg6IGF1dG87XG4gIGhlaWdodDogMjAwcHg7XG59XG4uaW1nLWNvbnRhaW5lciAuaW1nLXdyYXA6aG92ZXIgLm92ZXJsYXkge1xuICBvcGFjaXR5OiAxO1xufVxuLmltZy1jb250YWluZXIgLmltZy13cmFwIC5vdmVybGF5IHtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogYWxsIDUwMG1zO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuLmltZy1jb250YWluZXIgLmltZy13cmFwIC5vdmVybGF5IGlvbi1idXR0b24ucmVtb3ZlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDhweDtcbiAgcmlnaHQ6IDhweDtcbn1cbi5pbWctY29udGFpbmVyIC5pbWctd3JhcCAub3ZlcmxheSBpb24tYnV0dG9uLnJlbW92ZSBpb24taWNvbiB7XG4gIGZvbnQtc2l6ZTogMjZweDtcbn1cblxuLmxlZnQtYWxpZ24ge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/admin-home/broadcast-msg/broadcast-msg.page.ts":
/*!**********************************************************************!*\
  !*** ./src/app/admin/admin-home/broadcast-msg/broadcast-msg.page.ts ***!
  \**********************************************************************/
/*! exports provided: BroadcastMsgPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BroadcastMsgPage", function() { return BroadcastMsgPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/image-picker/ngx */ "./node_modules/@ionic-native/image-picker/ngx/index.js");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var _admin_banners_banner_linking_modal_banner_linking_modal_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../admin-banners/banner-linking-modal/banner-linking-modal.page */ "./src/app/admin/admin-banners/banner-linking-modal/banner-linking-modal.page.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/services/user-groups/user-groups.service */ "./src/app/services/user-groups/user-groups.service.ts");
/* harmony import */ var src_app_services_manager_manager_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/services/manager/manager.service */ "./src/app/services/manager/manager.service.ts");














var BroadcastMsgPage = /** @class */ (function () {
    function BroadcastMsgPage(router, events, actionSheetController, camera, imagePicker, loadingController, alertController, modalController, toastController, labelService, configService, userGroupsService, managerService, storage) {
        this.router = router;
        this.events = events;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.imagePicker = imagePicker;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.modalController = modalController;
        this.toastController = toastController;
        this.labelService = labelService;
        this.configService = configService;
        this.userGroupsService = userGroupsService;
        this.managerService = managerService;
        this.storage = storage;
        this.msg = {
            type: null,
            title: '',
            message: null,
            createdAt: null,
            images: [],
            isRead: null,
            author: null,
            published: null,
            mob: null,
            thumb: null,
            imageCount: null,
            groups: []
        };
        this.imageResponse = [];
        this.accessDenied = false;
        this.msgBroadcasted = false;
        // Notification Linking
        this.linkTypes = [];
        this.bannerData = {};
    }
    BroadcastMsgPage.prototype.ngOnInit = function () {
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.BANNER_SETTINGS_LABELS = this.labelService.labels['BANNER_SETTINGS'];
        this.linkTypes = [
            this.BANNER_SETTINGS_LABELS['none'],
            this.BANNER_SETTINGS_LABELS['product'],
            this.BANNER_SETTINGS_LABELS['category'],
            'subcategory',
            this.BANNER_SETTINGS_LABELS['brand'],
            this.BANNER_SETTINGS_LABELS['service']
        ];
        this.prepareData(this.bannerData);
    };
    BroadcastMsgPage.prototype.prepareData = function (data) {
        if (!data) {
            data = {
                active: true,
                org: '',
                link: {
                    type: this.BANNER_SETTINGS_LABELS['none'],
                    id: '',
                    name: ''
                }
            };
        }
        else {
            if (!data.hasOwnProperty('active')) {
                data['active'] = true;
            }
            if (!data.hasOwnProperty('link')) {
                data['link'] = {
                    type: this.BANNER_SETTINGS_LABELS['none'],
                    id: '',
                    name: ''
                };
            }
        }
        this.bannerData = data;
        console.log('changes datas', this.bannerData);
    };
    BroadcastMsgPage.prototype.ionViewWillEnter = function () {
        this.events.publish('media:getAllBroadcastMessages');
        this.initializeSubscriptions();
    };
    BroadcastMsgPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    BroadcastMsgPage.prototype.initializeSubscriptions = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var groups, userRole, uid, managerDetails_1, _a;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.events.subscribe('media:broadcastMessageSuccess', function () {
                            _this.loader.dismiss();
                            _this.msg.title = '';
                            _this.msg.message = '';
                            _this.imageResponse = [];
                            _this.msgBroadcasted = true;
                            _this.presentAlert('Success', 'Message successfully broadcasted to all the active users.');
                        });
                        this.events.subscribe('media:broadcastMessageFailure', function () {
                            _this.loader.dismiss();
                            _this.msg.message = '';
                            _this.imageResponse = [];
                            _this.presentAlert('Failure', 'There is some problem in sending message.');
                        });
                        this.events.subscribe('media:PermissionToBroadcastSuccess', function (doc) {
                            var todaysDay = new Date().getTime();
                            var lastDate = doc.createdAt.toDate().getTime();
                            console.log(todaysDay, " ", lastDate);
                            var hours = (todaysDay - lastDate) / 36e5;
                            console.log('hours:', hours);
                            var hoursLimit = _this.configService.environment.broadcastLimit ? _this.configService.environment.broadcastLimit : 24;
                            _this.broadcastHrs = hoursLimit;
                            console.log('hoursLimit:', hoursLimit);
                            if (hours < hoursLimit) {
                                _this.accessDenied = true;
                                _this.presentAlert('Limit Reached', "Please Wait for " + (hoursLimit - hours).toFixed(1) + " hours to send a broadcast message again");
                            }
                        });
                        this.events.subscribe('media:PermissionToBroadcastFailure', function (err) {
                            _this.presentAlert(err, '');
                        });
                        this.events.subscribe('media:publishAllBroadcastMessages', function (data) {
                            if (data) {
                                _this.allMessages = data;
                            }
                        });
                        this.events.publish('media:PermissionToBroadcast');
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
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    BroadcastMsgPage.prototype.uploadImage = function (files) {
        var _this = this;
        for (var i = 0; i < files.length; i++) {
            var reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = function (event) {
                var base64Image = event.target.result;
                var base64Str = base64Image.split(',');
                var size = _this.calculateImageSize(base64Str[1]);
                _this.imageResponse = [{ url: base64Image, imgSize: size }];
            };
        }
    };
    BroadcastMsgPage.prototype.imageActionSheet = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
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
                                        // // //console.log('Cancel clicked');
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
    BroadcastMsgPage.prototype.addCameraImage = function () {
        var _this = this;
        this.optionsforCamera = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            allowEdit: true
        };
        // // //console.log('in addChatImage');
        this.camera.getPicture(this.optionsforCamera).then(function (imageData) {
            if (imageData.length !== 0) {
                var base64Image = 'data:image/jpeg;base64,' + imageData;
                var base64Str = base64Image.split(',');
                var imgSize = _this.calculateImageSize(base64Str[1]);
                // // //console.log('size of image', imgSize);
                _this.imageResponse.push({ url: base64Image, size: imgSize });
            }
        }, function (err) {
            // // //console.log(err);
        });
    };
    BroadcastMsgPage.prototype.addGalleryImages = function () {
        var _this = this;
        this.optionsforGallery = {
            quality: 50,
            outputType: 1
        };
        this.imagePicker.getPictures(this.optionsforGallery).then(function (results) {
            if (results.length !== 0 && results !== 'OK') {
                for (var i = 0; i < results.length; i++) {
                    var base64Image = 'data:image/jpeg;base64,' + results[i];
                    var base64Str = base64Image.split(',');
                    var imgSize = _this.calculateImageSize(base64Str[1]);
                    _this.imageResponse.push({ url: 'data:image/jpeg;base64,' + results[i], size: imgSize });
                }
            }
        }, function (err) {
            alert(err);
        });
    };
    BroadcastMsgPage.prototype.calculateImageSize = function (base64String) {
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
        // // //console.log(base64StringLength);
        inBytes = (base64StringLength / 4) * 3 - padding;
        // // //console.log(inBytes);
        var kbytes = inBytes / 1000;
        return kbytes;
    };
    BroadcastMsgPage.prototype.removeImage = function (index) {
        this.imageResponse.splice(index, 1);
    };
    BroadcastMsgPage.prototype.sendMessage = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.msg.groups && this.msg.groups.length > 10) {
                            this.presentAlert('Only 10 groups can be selected.', ''); // Max limit for group-users searching is 10 on backend
                            return [2 /*return*/];
                        }
                        if (this.msg.title === '') {
                            this.presentAlert('Please enter notification title', '');
                            return [2 /*return*/];
                        }
                        this.msg.type = 'broadcast';
                        this.msg.createdAt = new Date();
                        this.msg.isRead = false;
                        this.msg.author = 'admin';
                        if (!((this.msg.message === null || this.msg.message === '') && this.imageResponse.length === 0)) return [3 /*break*/, 1];
                        this.presentAlert('Please enter a message', '');
                        return [3 /*break*/, 4];
                    case 1:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please Wait...',
                            })];
                    case 2:
                        _a.loader = _b.sent();
                        return [4 /*yield*/, this.loader.present()];
                    case 3:
                        _b.sent();
                        this.msg['bannerData'] = this.bannerData;
                        console.log('msg:', this.msg);
                        this.events.publish('media:broadcastMessage', this.imageResponse, this.msg);
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BroadcastMsgPage.prototype.imageZoom = function (message) {
        var imageZoomUrls = [];
        imageZoomUrls.push({ url: message.images[0].url });
        var imgIndex = 0;
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_6__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: imageZoomUrls,
                index: imgIndex
            }
        }).then(function (modal) { return modal.present(); });
    };
    BroadcastMsgPage.prototype.presentAlert = function (heading, desc) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: heading,
                            message: desc,
                            backdropDismiss: false,
                            buttons: [{
                                    text: 'OK',
                                    handler: function () {
                                        if (_this.accessDenied || _this.msgBroadcasted) {
                                            _this.router.navigate(['admin-home']);
                                        }
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
    BroadcastMsgPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('media:broadcastMessageSuccess');
        this.events.unsubscribe('media:broadcastMessageFailure');
        this.events.unsubscribe('media:PermissionToBroadcastSuccess');
        this.events.unsubscribe('media:PermissionToBroadcastFailure');
    };
    BroadcastMsgPage.prototype.presentToast = function (msg) {
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
    BroadcastMsgPage.prototype.defaultLinkType = function () {
        this.bannerData.link.ids = '';
        this.bannerData.link.name = '';
        this.bannerData.link.type = this.BANNER_SETTINGS_LABELS['none'];
    };
    BroadcastMsgPage.prototype.presentModal = function (type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _admin_banners_banner_linking_modal_banner_linking_modal_page__WEBPACK_IMPORTED_MODULE_8__["BannerLinkingModalPage"],
                            cssClass: 'custom-modal',
                            showBackdrop: true,
                            componentProps: { linkType: type, linkId: this.bannerData.link.ids, currentType: this.bannerData.type }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (res) {
                            console.log('data from modal', res);
                            if (res.data) {
                                _this.bannerData.link.ids = res.data.id;
                                if (res.data.id.length > 0) {
                                    _this.bannerData.link.id = res.data.id[0];
                                }
                                else {
                                    _this.bannerData.link.id = '';
                                }
                                if (res.data.name) {
                                    _this.bannerData.link.name = res.data.name;
                                }
                                if (res.data.hasOwnProperty('isSubcategories')) {
                                    _this.bannerData.link['isSubcategories'] = res.data.isSubcategories;
                                }
                                if (type == 'subcategory') {
                                    _this.bannerData.link['categoryId'] = res.data.categoryId;
                                }
                                if (res.data.hasOwnProperty('serviceData')) {
                                    _this.bannerData.link['serviceData'] = res.data.serviceData;
                                }
                            }
                            else {
                                _this.defaultLinkType();
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
    BroadcastMsgPage.prototype.searchTextAlert = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            subHeader: this.BANNER_SETTINGS_LABELS['search_text'],
                            inputs: [
                                {
                                    name: 'searchTxt',
                                    type: 'text',
                                    placeholder: this.BANNER_SETTINGS_LABELS['enter_search_text']
                                },
                            ],
                            buttons: [
                                {
                                    text: this.SHARED_LABELS['cancel'],
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        _this.defaultLinkType();
                                    }
                                }, {
                                    text: this.SHARED_LABELS['add'],
                                    handler: function (data) {
                                        if (!data.searchTxt) {
                                            _this.defaultLinkType();
                                            _this.presentToast(_this.BANNER_SETTINGS_LABELS['please_enter_valid_data']);
                                        }
                                        else {
                                            _this.bannerData.link.name = data.searchTxt;
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
    BroadcastMsgPage.prototype.selectLinkType = function (i) {
        var type = this.linkTypes[i];
        this.bannerData.link.type = type;
        if (type === this.BANNER_SETTINGS_LABELS['product']) {
            this.presentModal(this.bannerData.link.type);
        }
        else if (type === this.BANNER_SETTINGS_LABELS['category']) {
            this.presentModal(this.bannerData.link.type);
        }
        else if (type === 'subcategory') {
            this.presentModal(this.bannerData.link.type);
        }
        else if (type === this.BANNER_SETTINGS_LABELS['brand']) {
            this.presentModal(this.bannerData.link.type);
        }
        else if (type === this.BANNER_SETTINGS_LABELS['service']) {
            this.presentModal(this.bannerData.link.type);
        }
        else if (type === this.BANNER_SETTINGS_LABELS['search']) {
            this.searchTextAlert();
        }
        else if (type === this.BANNER_SETTINGS_LABELS['refer_and_earn']) {
            return null;
        }
        else {
            return null;
        }
        this.bannerData.link.ids = '';
        this.bannerData.link.name = '';
    };
    BroadcastMsgPage.prototype.getDateTimeFormat = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_10__(date).format('D MMM, YYYY hh:mm a');
    };
    BroadcastMsgPage.prototype.sendMessageAgain = function (message) {
        this.imageResponse = [];
        this.msg.title = message.title;
        this.msg.message = message.message;
        if (message.images && message.images.length > 0 && message.images[0].url) {
            this.imageResponse = [{ url: message.images[0].url }];
        }
        this.presentAlert('', 'All message content copied in broadcast sender. Please make changes and send');
    };
    BroadcastMsgPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ActionSheetController"] },
        { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_5__["Camera"] },
        { type: _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_4__["ImagePicker"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"] },
        { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_7__["LabelService"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_9__["ConfigService"] },
        { type: src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_12__["UserGroupsService"] },
        { type: src_app_services_manager_manager_service__WEBPACK_IMPORTED_MODULE_13__["ManagerService"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_11__["Storage"] }
    ]; };
    BroadcastMsgPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-broadcast-msg',
            template: __webpack_require__(/*! raw-loader!./broadcast-msg.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-home/broadcast-msg/broadcast-msg.page.html"),
            styles: [__webpack_require__(/*! ./broadcast-msg.page.scss */ "./src/app/admin/admin-home/broadcast-msg/broadcast-msg.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ActionSheetController"],
            _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_5__["Camera"], _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_4__["ImagePicker"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"],
            src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_7__["LabelService"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_9__["ConfigService"],
            src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_12__["UserGroupsService"],
            src_app_services_manager_manager_service__WEBPACK_IMPORTED_MODULE_13__["ManagerService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_11__["Storage"]])
    ], BroadcastMsgPage);
    return BroadcastMsgPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-home-broadcast-msg-broadcast-msg-module-es5.js.map