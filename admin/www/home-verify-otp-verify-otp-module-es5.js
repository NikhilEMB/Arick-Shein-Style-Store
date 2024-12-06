(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-verify-otp-verify-otp-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/home/verify-otp/verify-otp.page.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/home/verify-otp/verify-otp.page.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"home\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center>verify otp</ion-title>\r\n  </ion-toolbar>\r\n\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding\">\r\n  <ion-grid>\r\n    <ion-row class=\"upper-space ion-justify-content-center\">\r\n      <p class=\"enter-text\">Please enter verification code sent to <br>{{phoneNo}}</p>\r\n    </ion-row>\r\n    <ion-row class=\"ion-justify-content-center\">\r\n      <div style=\"position: relative;\">\r\n        <input #txtInput class=\"otp-input\" type=\"tel\" maxlength='6' [(ngModel)]=\"otpValue\" (keyup)=\"removeFocus(txtInput)\"/>\r\n      </div>\r\n    <div class=\"col-arrow\" (click)=\"sendOTP()\" *ngIf=\"!showLoader\">\r\n      <i class=\"flaticon-null-7\"></i>\r\n    </div>\r\n    <div class=\"loader\" *ngIf=\"showLoader\">\r\n      <ion-spinner color=\"primary\"></ion-spinner>\r\n    </div>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col class=\"resend-otp-col\">\r\n        <span class=\"resend-otp-timer\" *ngIf=\"showTimer\">00:<span *ngIf=\"timer >= 10; else appendZeroToTimer\">{{timer}}</span>\r\n          <ng-template #appendZeroToTimer>\r\n            <span *ngIf=\"timer < 10\">0{{timer}}</span>\r\n          </ng-template>\r\n        </span><br>\r\n        <ion-button (click)=\"resendOTP()\" fill=\"clear\" [disabled]=\"!showResendBtn\" mode=\"ios\">\r\n          Resend OTP\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n\r\n</ion-content>"

/***/ }),

/***/ "./src/app/home/verify-otp/verify-otp.module.ts":
/*!******************************************************!*\
  !*** ./src/app/home/verify-otp/verify-otp.module.ts ***!
  \******************************************************/
/*! exports provided: VerifyOtpPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifyOtpPageModule", function() { return VerifyOtpPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _verify_otp_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./verify-otp.page */ "./src/app/home/verify-otp/verify-otp.page.ts");







var routes = [
    {
        path: '',
        component: _verify_otp_page__WEBPACK_IMPORTED_MODULE_6__["VerifyOtpPage"]
    }
];
var VerifyOtpPageModule = /** @class */ (function () {
    function VerifyOtpPageModule() {
    }
    VerifyOtpPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_verify_otp_page__WEBPACK_IMPORTED_MODULE_6__["VerifyOtpPage"]]
        })
    ], VerifyOtpPageModule);
    return VerifyOtpPageModule;
}());



/***/ }),

/***/ "./src/app/home/verify-otp/verify-otp.page.scss":
/*!******************************************************!*\
  !*** ./src/app/home/verify-otp/verify-otp.page.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".otp-input {\n  border: none;\n  width: 15ch;\n  background: repeating-linear-gradient(90deg, dimgrey 0, dimgrey 2ch, transparent 0, transparent 2.6ch) 0 100%/100% 2px no-repeat;\n  color: #3c3c3c;\n  font: 25px consolas, monospace;\n  letter-spacing: 1.6ch;\n  outline: none;\n  padding: 6px;\n  position: relative;\n}\n\n.enter-text {\n  line-height: 24px;\n  text-align: center;\n}\n\n.upper-space {\n  margin-top: 30%;\n}\n\n.flaticon-null-7::before {\n  border-radius: 50%;\n  background-color: var(--ion-color-primary);\n  color: var(--ion-color-primary-contrast);\n  padding: 5px;\n  font-size: 15px;\n}\n\n.resend-otp-timer {\n  font-size: 12px;\n  opacity: 0.6;\n}\n\n.resend-otp-col {\n  margin-top: 28px;\n  text-align: center;\n}\n\n.resend-otp-col ion-button {\n  font-size: 13px;\n  margin-top: -1%;\n}\n\n.col-arrow {\n  margin-top: 15px;\n  position: absolute;\n  right: 10%;\n}\n\n.loader {\n  margin-top: 5px;\n  position: absolute;\n  right: 10%;\n}\n\n@media screen and (max-width: 360px) {\n  .otp-input {\n    font: 23px consolas, monospace;\n  }\n\n  .resend-otp-col ion-button {\n    font-size: 13px;\n  }\n\n  .resend-otp-timer {\n    font-size: 12px;\n  }\n\n  ion-spinner {\n    height: 25px !important;\n  }\n\n  .col-arrow {\n    margin-top: 15px;\n    right: 9%;\n  }\n\n  .loader {\n    margin-top: 10px;\n    right: 9%;\n  }\n}\n\n@media screen and (max-width: 320px) {\n  .otp-input {\n    font: 20px consolas, monospace;\n  }\n\n  .resend-otp-col ion-button {\n    font-size: 11px;\n  }\n\n  .resend-otp-timer {\n    font-size: 10px;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .otp-input {\n    font: 35px consolas, monospace;\n  }\n\n  .loader {\n    margin-top: 2%;\n    right: 13%;\n  }\n\n  .col-arrow {\n    margin-top: 3%;\n    right: 13%;\n  }\n\n  .flaticon-null-7::before {\n    font-size: 25px;\n  }\n}\n\n@media screen and (min-width: 768px) {\n  .flaticon-null-7::before {\n    padding: 8px;\n    font-size: 30px;\n  }\n\n  ion-spinner {\n    width: 40px !important;\n    height: 40px !important;\n  }\n\n  .otp-input {\n    font: 45px consolas, monospace;\n  }\n\n  .resend-otp-col {\n    margin-top: 30px;\n  }\n\n  .resend-otp-timer {\n    font-size: 20px;\n  }\n\n  .resend-otp-col ion-button {\n    font-size: 22px;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .enter-text {\n    line-height: 35px;\n  }\n\n  .flaticon-null-7::before {\n    padding: 10px;\n    font-size: 40px;\n  }\n\n  .col-arrow {\n    margin-top: 15px;\n    right: 18%;\n  }\n\n  .loader {\n    margin-top: 10px;\n    right: 18%;\n  }\n\n  .resend-otp-col {\n    margin-top: 35px;\n  }\n\n  .resend-otp-timer {\n    font-size: 25px;\n  }\n\n  .resend-otp-col ion-button {\n    font-size: 26px;\n  }\n\n  .otp-input {\n    font: 50px consolas, monospace;\n  }\n\n  ion-spinner {\n    width: 50px !important;\n    height: 50px !important;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS92ZXJpZnktb3RwL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxob21lXFx2ZXJpZnktb3RwXFx2ZXJpZnktb3RwLnBhZ2Uuc2NzcyIsInNyYy9hcHAvaG9tZS92ZXJpZnktb3RwL3ZlcmlmeS1vdHAucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNBLFdBQUE7RUFDQSxnSUFBQTtFQUNBLGNBQUE7RUFDQSw4QkFBQTtFQUNBLHFCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0UsZUFBQTtBQ0NGOztBREVBO0VBQ0Usa0JBQUE7RUFDQSwwQ0FBQTtFQUNBLHdDQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUNDRjs7QURFQTtFQUNFLGVBQUE7RUFDQSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0FDQ0Y7O0FERUE7RUFDRSxlQUFBO0VBQ0EsZUFBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7QUNDRjs7QURFQTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7QUNDRjs7QURLQTtFQUNFO0lBQ0UsOEJBQUE7RUNGRjs7RURLQTtJQUNFLGVBQUE7RUNGRjs7RURLQTtJQUNFLGVBQUE7RUNGRjs7RURLQTtJQUNFLHVCQUFBO0VDRkY7O0VES0E7SUFDRSxnQkFBQTtJQUNBLFNBQUE7RUNGRjs7RURLQTtJQUNFLGdCQUFBO0lBQ0EsU0FBQTtFQ0ZGO0FBQ0Y7O0FES0E7RUFDRTtJQUNFLDhCQUFBO0VDSEY7O0VETUE7SUFDRSxlQUFBO0VDSEY7O0VETUE7SUFDRSxlQUFBO0VDSEY7QUFDRjs7QURNQTtFQUNFO0lBQ0UsOEJBQUE7RUNKRjs7RURPQTtJQUNFLGNBQUE7SUFDQSxVQUFBO0VDSkY7O0VET0E7SUFDRSxjQUFBO0lBQ0EsVUFBQTtFQ0pGOztFRE9BO0lBQ0UsZUFBQTtFQ0pGO0FBQ0Y7O0FET0E7RUFFRTtJQUNFLFlBQUE7SUFDQSxlQUFBO0VDTkY7O0VEU0E7SUFDRSxzQkFBQTtJQUNBLHVCQUFBO0VDTkY7O0VEU0E7SUFDRSw4QkFBQTtFQ05GOztFRFNBO0lBQ0UsZ0JBQUE7RUNORjs7RURTQTtJQUNFLGVBQUE7RUNORjs7RURTQTtJQUNFLGVBQUE7RUNORjtBQUNGOztBRFVBO0VBQ0U7SUFDRSxpQkFBQTtFQ1JGOztFRFdBO0lBQ0UsYUFBQTtJQUNBLGVBQUE7RUNSRjs7RURXQTtJQUNFLGdCQUFBO0lBQ0EsVUFBQTtFQ1JGOztFRFdBO0lBQ0UsZ0JBQUE7SUFDQSxVQUFBO0VDUkY7O0VEV0E7SUFDRSxnQkFBQTtFQ1JGOztFRFdBO0lBQ0UsZUFBQTtFQ1JGOztFRFdBO0lBQ0UsZUFBQTtFQ1JGOztFRFdBO0lBQ0UsOEJBQUE7RUNSRjs7RURXQTtJQUNFLHNCQUFBO0lBQ0EsdUJBQUE7RUNSRjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvaG9tZS92ZXJpZnktb3RwL3ZlcmlmeS1vdHAucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm90cC1pbnB1dCB7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIHdpZHRoOiAxNWNoO1xyXG4gIGJhY2tncm91bmQ6IHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoOTBkZWcsIGRpbWdyZXkgMCwgZGltZ3JleSAyY2gsIHRyYW5zcGFyZW50IDAsIHRyYW5zcGFyZW50IDIuNmNoKSAwIDEwMCUvMTAwJSAycHggbm8tcmVwZWF0O1xyXG4gIGNvbG9yOiAjM2MzYzNjO1xyXG4gIGZvbnQ6IDI1cHggY29uc29sYXMsIG1vbm9zcGFjZTtcclxuICBsZXR0ZXItc3BhY2luZzogMS42Y2g7XHJcbiAgb3V0bGluZTogbm9uZTtcclxuICBwYWRkaW5nOiA2cHg7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4uZW50ZXItdGV4dCB7XHJcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4udXBwZXItc3BhY2Uge1xyXG4gIG1hcmdpbi10b3A6IDMwJTtcclxufVxyXG5cclxuLmZsYXRpY29uLW51bGwtNzo6YmVmb3JlIHtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XHJcbiAgcGFkZGluZzogNXB4O1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG5cclxuLnJlc2VuZC1vdHAtdGltZXIge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBvcGFjaXR5OiAuNjtcclxufVxyXG5cclxuLnJlc2VuZC1vdHAtY29sIHtcclxuICBtYXJnaW4tdG9wOiAyOHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLnJlc2VuZC1vdHAtY29sIGlvbi1idXR0b24ge1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBtYXJnaW4tdG9wOiAtMSU7XHJcbn1cclxuXHJcbi5jb2wtYXJyb3cge1xyXG4gIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHJpZ2h0OiAxMCU7XHJcbn1cclxuXHJcbi5sb2FkZXIge1xyXG4gIG1hcmdpbi10b3A6IDVweDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgcmlnaHQ6IDEwJTtcclxufVxyXG5cclxuLy9NRURJQSBRVUVSSUVTXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6Mzc1cHgpIHt9XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjM2MHB4KSB7XHJcbiAgLm90cC1pbnB1dCB7XHJcbiAgICBmb250OiAyM3B4IGNvbnNvbGFzLCBtb25vc3BhY2U7XHJcbiAgfVxyXG5cclxuICAucmVzZW5kLW90cC1jb2wgaW9uLWJ1dHRvbiB7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgfVxyXG5cclxuICAucmVzZW5kLW90cC10aW1lciB7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgfVxyXG5cclxuICBpb24tc3Bpbm5lciB7XHJcbiAgICBoZWlnaHQ6IDI1cHggIWltcG9ydGFudDtcclxuICB9XHJcblxyXG4gIC5jb2wtYXJyb3cge1xyXG4gICAgbWFyZ2luLXRvcDogMTVweDtcclxuICAgIHJpZ2h0OiA5JTtcclxuICB9XHJcblxyXG4gIC5sb2FkZXIge1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIHJpZ2h0OiA5JTtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6MzIwcHgpIHtcclxuICAub3RwLWlucHV0IHtcclxuICAgIGZvbnQ6IDIwcHggY29uc29sYXMsIG1vbm9zcGFjZTtcclxuICB9XHJcblxyXG4gIC5yZXNlbmQtb3RwLWNvbCBpb24tYnV0dG9uIHtcclxuICAgIGZvbnQtc2l6ZTogMTFweDtcclxuICB9XHJcblxyXG4gIC5yZXNlbmQtb3RwLXRpbWVyIHtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1pbi13aWR0aDogNjAwcHgpIHtcclxuICAub3RwLWlucHV0IHtcclxuICAgIGZvbnQ6IDM1cHggY29uc29sYXMsIG1vbm9zcGFjZTtcclxuICB9XHJcblxyXG4gIC5sb2FkZXIge1xyXG4gICAgbWFyZ2luLXRvcDogMiU7XHJcbiAgICByaWdodDogMTMlO1xyXG4gIH1cclxuXHJcbiAgLmNvbC1hcnJvdyB7XHJcbiAgICBtYXJnaW4tdG9wOiAzJTtcclxuICAgIHJpZ2h0OiAxMyU7XHJcbiAgfVxyXG5cclxuICAuZmxhdGljb24tbnVsbC03OjpiZWZvcmUge1xyXG4gICAgZm9udC1zaXplOiAyNXB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo3NjhweCkge1xyXG5cclxuICAuZmxhdGljb24tbnVsbC03OjpiZWZvcmUge1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG4gICAgZm9udC1zaXplOiAzMHB4O1xyXG4gIH1cclxuXHJcbiAgaW9uLXNwaW5uZXIge1xyXG4gICAgd2lkdGg6IDQwcHggIWltcG9ydGFudDtcclxuICAgIGhlaWdodDogNDBweCAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcbiAgLm90cC1pbnB1dCB7XHJcbiAgICBmb250OiA0NXB4IGNvbnNvbGFzLCBtb25vc3BhY2U7XHJcbiAgfVxyXG5cclxuICAucmVzZW5kLW90cC1jb2wge1xyXG4gICAgbWFyZ2luLXRvcDogMzBweDtcclxuICB9XHJcblxyXG4gIC5yZXNlbmQtb3RwLXRpbWVyIHtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICB9XHJcblxyXG4gIC5yZXNlbmQtb3RwLWNvbCBpb24tYnV0dG9uIHtcclxuICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICB9XHJcblxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjEwMDBweCkge1xyXG4gIC5lbnRlci10ZXh0IHtcclxuICAgIGxpbmUtaGVpZ2h0OiAzNXB4O1xyXG4gIH1cclxuXHJcbiAgLmZsYXRpY29uLW51bGwtNzo6YmVmb3JlIHtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgfVxyXG5cclxuICAuY29sLWFycm93IHtcclxuICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgICByaWdodDogMTglO1xyXG4gIH1cclxuXHJcbiAgLmxvYWRlciB7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgcmlnaHQ6IDE4JTtcclxuICB9XHJcblxyXG4gIC5yZXNlbmQtb3RwLWNvbCB7XHJcbiAgICBtYXJnaW4tdG9wOiAzNXB4O1xyXG4gIH1cclxuXHJcbiAgLnJlc2VuZC1vdHAtdGltZXIge1xyXG4gICAgZm9udC1zaXplOiAyNXB4O1xyXG4gIH1cclxuXHJcbiAgLnJlc2VuZC1vdHAtY29sIGlvbi1idXR0b24ge1xyXG4gICAgZm9udC1zaXplOiAyNnB4O1xyXG4gIH1cclxuXHJcbiAgLm90cC1pbnB1dCB7XHJcbiAgICBmb250OiA1MHB4IGNvbnNvbGFzLCBtb25vc3BhY2U7XHJcbiAgfVxyXG5cclxuICBpb24tc3Bpbm5lciB7XHJcbiAgICB3aWR0aDogNTBweCAhaW1wb3J0YW50O1xyXG4gICAgaGVpZ2h0OiA1MHB4ICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxufSIsIi5vdHAtaW5wdXQge1xuICBib3JkZXI6IG5vbmU7XG4gIHdpZHRoOiAxNWNoO1xuICBiYWNrZ3JvdW5kOiByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDkwZGVnLCBkaW1ncmV5IDAsIGRpbWdyZXkgMmNoLCB0cmFuc3BhcmVudCAwLCB0cmFuc3BhcmVudCAyLjZjaCkgMCAxMDAlLzEwMCUgMnB4IG5vLXJlcGVhdDtcbiAgY29sb3I6ICMzYzNjM2M7XG4gIGZvbnQ6IDI1cHggY29uc29sYXMsIG1vbm9zcGFjZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDEuNmNoO1xuICBvdXRsaW5lOiBub25lO1xuICBwYWRkaW5nOiA2cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmVudGVyLXRleHQge1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4udXBwZXItc3BhY2Uge1xuICBtYXJnaW4tdG9wOiAzMCU7XG59XG5cbi5mbGF0aWNvbi1udWxsLTc6OmJlZm9yZSB7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xuICBwYWRkaW5nOiA1cHg7XG4gIGZvbnQtc2l6ZTogMTVweDtcbn1cblxuLnJlc2VuZC1vdHAtdGltZXIge1xuICBmb250LXNpemU6IDEycHg7XG4gIG9wYWNpdHk6IDAuNjtcbn1cblxuLnJlc2VuZC1vdHAtY29sIHtcbiAgbWFyZ2luLXRvcDogMjhweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ucmVzZW5kLW90cC1jb2wgaW9uLWJ1dHRvbiB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgbWFyZ2luLXRvcDogLTElO1xufVxuXG4uY29sLWFycm93IHtcbiAgbWFyZ2luLXRvcDogMTVweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMTAlO1xufVxuXG4ubG9hZGVyIHtcbiAgbWFyZ2luLXRvcDogNXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAxMCU7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM2MHB4KSB7XG4gIC5vdHAtaW5wdXQge1xuICAgIGZvbnQ6IDIzcHggY29uc29sYXMsIG1vbm9zcGFjZTtcbiAgfVxuXG4gIC5yZXNlbmQtb3RwLWNvbCBpb24tYnV0dG9uIHtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gIH1cblxuICAucmVzZW5kLW90cC10aW1lciB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICB9XG5cbiAgaW9uLXNwaW5uZXIge1xuICAgIGhlaWdodDogMjVweCAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmNvbC1hcnJvdyB7XG4gICAgbWFyZ2luLXRvcDogMTVweDtcbiAgICByaWdodDogOSU7XG4gIH1cblxuICAubG9hZGVyIHtcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgIHJpZ2h0OiA5JTtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzIwcHgpIHtcbiAgLm90cC1pbnB1dCB7XG4gICAgZm9udDogMjBweCBjb25zb2xhcywgbW9ub3NwYWNlO1xuICB9XG5cbiAgLnJlc2VuZC1vdHAtY29sIGlvbi1idXR0b24ge1xuICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgfVxuXG4gIC5yZXNlbmQtb3RwLXRpbWVyIHtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDYwMHB4KSB7XG4gIC5vdHAtaW5wdXQge1xuICAgIGZvbnQ6IDM1cHggY29uc29sYXMsIG1vbm9zcGFjZTtcbiAgfVxuXG4gIC5sb2FkZXIge1xuICAgIG1hcmdpbi10b3A6IDIlO1xuICAgIHJpZ2h0OiAxMyU7XG4gIH1cblxuICAuY29sLWFycm93IHtcbiAgICBtYXJnaW4tdG9wOiAzJTtcbiAgICByaWdodDogMTMlO1xuICB9XG5cbiAgLmZsYXRpY29uLW51bGwtNzo6YmVmb3JlIHtcbiAgICBmb250LXNpemU6IDI1cHg7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gIC5mbGF0aWNvbi1udWxsLTc6OmJlZm9yZSB7XG4gICAgcGFkZGluZzogOHB4O1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgfVxuXG4gIGlvbi1zcGlubmVyIHtcbiAgICB3aWR0aDogNDBweCAhaW1wb3J0YW50O1xuICAgIGhlaWdodDogNDBweCAhaW1wb3J0YW50O1xuICB9XG5cbiAgLm90cC1pbnB1dCB7XG4gICAgZm9udDogNDVweCBjb25zb2xhcywgbW9ub3NwYWNlO1xuICB9XG5cbiAgLnJlc2VuZC1vdHAtY29sIHtcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xuICB9XG5cbiAgLnJlc2VuZC1vdHAtdGltZXIge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgfVxuXG4gIC5yZXNlbmQtb3RwLWNvbCBpb24tYnV0dG9uIHtcbiAgICBmb250LXNpemU6IDIycHg7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCkge1xuICAuZW50ZXItdGV4dCB7XG4gICAgbGluZS1oZWlnaHQ6IDM1cHg7XG4gIH1cblxuICAuZmxhdGljb24tbnVsbC03OjpiZWZvcmUge1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgZm9udC1zaXplOiA0MHB4O1xuICB9XG5cbiAgLmNvbC1hcnJvdyB7XG4gICAgbWFyZ2luLXRvcDogMTVweDtcbiAgICByaWdodDogMTglO1xuICB9XG5cbiAgLmxvYWRlciB7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICByaWdodDogMTglO1xuICB9XG5cbiAgLnJlc2VuZC1vdHAtY29sIHtcbiAgICBtYXJnaW4tdG9wOiAzNXB4O1xuICB9XG5cbiAgLnJlc2VuZC1vdHAtdGltZXIge1xuICAgIGZvbnQtc2l6ZTogMjVweDtcbiAgfVxuXG4gIC5yZXNlbmQtb3RwLWNvbCBpb24tYnV0dG9uIHtcbiAgICBmb250LXNpemU6IDI2cHg7XG4gIH1cblxuICAub3RwLWlucHV0IHtcbiAgICBmb250OiA1MHB4IGNvbnNvbGFzLCBtb25vc3BhY2U7XG4gIH1cblxuICBpb24tc3Bpbm5lciB7XG4gICAgd2lkdGg6IDUwcHggIWltcG9ydGFudDtcbiAgICBoZWlnaHQ6IDUwcHggIWltcG9ydGFudDtcbiAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/home/verify-otp/verify-otp.page.ts":
/*!****************************************************!*\
  !*** ./src/app/home/verify-otp/verify-otp.page.ts ***!
  \****************************************************/
/*! exports provided: VerifyOtpPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifyOtpPage", function() { return VerifyOtpPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/user/user.service */ "./src/app/services/user/user.service.ts");





var VerifyOtpPage = /** @class */ (function () {
    function VerifyOtpPage(route, router, events, alertController, userService) {
        this.route = route;
        this.router = router;
        this.events = events;
        this.alertController = alertController;
        this.userService = userService;
        this.showLoader = false;
        this.showResendBtn = false;
        this.showTimer = true;
        this.countResendBtnClicked = 0;
    }
    VerifyOtpPage.prototype.ngOnInit = function () {
        this.phoneNo = this.userService.getPhoneNo();
    };
    VerifyOtpPage.prototype.ionViewWillEnter = function () {
        this.initializeSubscriptions();
        this.resendCodeTimer();
    };
    VerifyOtpPage.prototype.ionViewWillLeave = function () {
        if (this.showLoader) {
            this.showLoader = false;
        }
        this.removeSubscriptions();
    };
    VerifyOtpPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('auth:incorrectOTP', function (msg) {
            _this.showLoader = false;
            _this.presentAlert(msg);
        });
        this.events.subscribe('auth:blockUserForTooManyOTP', function () {
            _this.presentAlert('Too Many OTP Attempts! Please try again later');
        });
    };
    VerifyOtpPage.prototype.sendOTP = function () {
        if (this.otpValue.length !== 6) {
            this.presentAlert('Please enter correct otp');
        }
        else {
            this.showLoader = true;
            this.events.publish('auth:sendotp', this.otpValue);
        }
    };
    VerifyOtpPage.prototype.removeFocus = function (el) {
        if (this.otpValue.length === 6) {
            el.blur();
        }
    };
    VerifyOtpPage.prototype.resendCodeTimer = function () {
        var _this = this;
        this.timer = 60;
        var interval = setInterval(function () {
            _this.timer -= 1;
            if (_this.timer === 0) {
                clearInterval(interval);
                _this.showTimer = false;
                _this.showResendBtn = true;
            }
        }, 1000);
    };
    VerifyOtpPage.prototype.resendOTP = function () {
        this.countResendBtnClicked += 1;
        if (this.countResendBtnClicked < 2) {
            this.showResendBtn = false;
            this.showTimer = true;
            this.resendCodeTimer();
            this.events.publish('auth:login', this.phoneNo);
        }
        else if (this.countResendBtnClicked === 2) {
            this.showResendBtn = false;
        }
    };
    VerifyOtpPage.prototype.presentAlert = function (desc) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: desc,
                            buttons: [{
                                    text: 'Ok',
                                    handler: function () {
                                        //console.log('Confirm Okay');
                                        _this.otpValue = null;
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
    VerifyOtpPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('auth:incorrectOTP');
        this.events.unsubscribe('auth:blockUserForTooManyOTP');
    };
    VerifyOtpPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"] }
    ]; };
    VerifyOtpPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-verify-otp',
            template: __webpack_require__(/*! raw-loader!./verify-otp.page.html */ "./node_modules/raw-loader/index.js!./src/app/home/verify-otp/verify-otp.page.html"),
            styles: [__webpack_require__(/*! ./verify-otp.page.scss */ "./src/app/home/verify-otp/verify-otp.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"]])
    ], VerifyOtpPage);
    return VerifyOtpPage;
}());



/***/ })

}]);
//# sourceMappingURL=home-verify-otp-verify-otp-module-es5.js.map