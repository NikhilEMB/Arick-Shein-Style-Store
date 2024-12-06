(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["new-address-new-address-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/new-address/new-address.page.html":
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/new-address/new-address.page.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"user-address\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center *ngIf=\"!editAddressData\">new address</ion-title>\r\n    <ion-title text-center *ngIf=\"editAddressData\">edit address</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding\">\r\n  <div class=\"location-btn\">\r\n    <ion-button (click)=\"useCurrentLocation()\" shape=\"round\">\r\n      <i class=\"flaticon-address\" style=\"margin-right: 5px;\"></i>\r\n      Use Current Location\r\n    </ion-button>\r\n  </div>\r\n  \r\n  <!-- New Address -->\r\n  <ion-grid class=\"ion-no-padding\" id=\"grid-content\" *ngIf=\"!editAddressData\">\r\n    <ion-row>\r\n      <div class=\"headings\">\r\n        Name\r\n      </div>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col size=\"12\" class=\"ion-no-padding\">\r\n        <ion-input type=\"text\" class=\"input-border\" [(ngModel)]=\"addressObj.name\" autocapitalize></ion-input>\r\n      </ion-col>\r\n    </ion-row>\r\n    <br>\r\n    <ion-row>\r\n      <div class=\"headings\">Address</div>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col size=\"12\" class=\"ion-no-padding\">\r\n        <ion-textarea type=\"text\" rows=\"3\" class=\"input-border\" [(ngModel)]=\"addressObj.address\" autocapitalize></ion-textarea>\r\n      </ion-col>\r\n    </ion-row>\r\n    <br>\r\n    <ion-row class=\"ion-justify-content-between\">\r\n      <ion-col size=\"6\">\r\n        <div class=\"headings\" style=\"padding-top: 0px;\">City</div>\r\n        <div>\r\n          <ion-input type=\"text\" class=\"input-border\" [(ngModel)]=\"addressObj.city\" autocapitalize></ion-input>\r\n        </div>\r\n      </ion-col>\r\n      <ion-col size=\"6\">\r\n        <div class=\"headings\" style=\"padding-top: 0px;\">State</div>\r\n        <div>\r\n          <ion-input type=\"text\" class=\"input-border\" [(ngModel)]=\"addressObj.state\" autocapitalize></ion-input>\r\n        </div>\r\n      </ion-col>\r\n    </ion-row>\r\n    <br>\r\n    <ion-row>\r\n      <div class=\"headings\">Pincode</div>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col size=\"12\" class=\"ion-no-padding\">\r\n        <ion-input type=\"tel\" class=\"input-border\" [(ngModel)]=\"addressObj.pincode\" autocapitalize></ion-input>\r\n      </ion-col>\r\n    </ion-row>\r\n    <br>\r\n    <ion-row>\r\n      <div class=\"headings\">Phone No</div>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col size=\"12\" class=\"ion-no-padding\">\r\n        <ion-input type=\"tel\" class=\"input-border\" [(ngModel)]=\"addressObj.phoneNo\" autocapitalize></ion-input>\r\n      </ion-col>\r\n    </ion-row>\r\n    <br>\r\n    <ion-row class=\"ion-justify-content-between\" *ngIf=\"addressLength > 0\">\r\n      <div class=\"defalut-address\">\r\n        <p>make as default address</p>\r\n      </div>\r\n      <div class=\"toggle-btn\">\r\n        <label class=\"switch\">\r\n          <input type=\"checkbox\" (click)=\"updateNewAddressDefaultStatus()\" checked>\r\n          <span class=\"slider round\"></span>\r\n        </label>\r\n      </div>\r\n    </ion-row>\r\n  </ion-grid>\r\n  <!-- /New Address -->\r\n\r\n\r\n  <!-- Edit Address -->\r\n  <ion-grid class=\"ion-no-padding\" id=\"grid-content\"  *ngIf=\"editAddressData\">\r\n    <ion-row>\r\n      <div class=\"headings\">\r\n        Name\r\n      </div>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col size=\"12\" class=\"ion-no-padding\">\r\n        <ion-input type=\"text\" class=\"input-border\" [(ngModel)]=\"editAddressData.name\" autocapitalize></ion-input>\r\n      </ion-col>\r\n    </ion-row>\r\n    <br>\r\n    <ion-row>\r\n      <div class=\"headings\">Complete Address</div>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col size=\"12\" class=\"ion-no-padding\">\r\n        <ion-textarea type=\"text\" rows=\"3\" class=\"input-border\" [(ngModel)]=\"editAddressData.address\" autocapitalize (ngModelChange)=\"addressChange()\"></ion-textarea>\r\n      </ion-col>\r\n    </ion-row>\r\n    <br>\r\n    <ion-row class=\"ion-justify-content-between\">\r\n      <ion-col size=\"6\">\r\n        <div class=\"headings\" style=\"padding-top: 0px;\">City</div>\r\n        <div>\r\n          <ion-input type=\"text\" class=\"input-border\" [(ngModel)]=\"editAddressData.city\" autocapitalize></ion-input>\r\n        </div>\r\n      </ion-col>\r\n      <ion-col size=\"6\">\r\n        <div class=\"headings\" style=\"padding-top: 0px;\">State</div>\r\n        <div>\r\n          <ion-input type=\"text\" class=\"input-border\" [(ngModel)]=\"editAddressData.state\" autocapitalize></ion-input>\r\n        </div>\r\n      </ion-col>\r\n    </ion-row>\r\n    <br>\r\n    <ion-row>\r\n      <div class=\"headings\">Pincode</div>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col size=\"12\" class=\"ion-no-padding\">\r\n        <ion-input type=\"tel\" class=\"input-border\" [(ngModel)]=\"editAddressData.pincode\" autocapitalize></ion-input>\r\n      </ion-col>\r\n    </ion-row>\r\n    <br>\r\n    <ion-row>\r\n      <div class=\"headings\">Phone No</div>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col size=\"12\" class=\"ion-no-padding\">\r\n        <ion-input type=\"tel\" class=\"input-border\" [(ngModel)]=\"editAddressData.phoneNo\" autocapitalize></ion-input>\r\n      </ion-col>\r\n    </ion-row>\r\n    <br>\r\n    <ion-row class=\"ion-justify-content-between\" *ngIf=\"addressLength > 1\">\r\n      <div class=\"defalut-address\">\r\n        <p>make as default address</p>\r\n      </div>\r\n      <div class=\"toggle-btn\">\r\n        <label class=\"switch\">\r\n          <input type=\"checkbox\" (click)=\"updateEditAddressDefaultStatus(editAddressData.defaultAddress)\" [checked]=\"editAddressData.defaultAddress === true\">\r\n          <span class=\"slider round\"></span>\r\n        </label>\r\n      </div>\r\n    </ion-row>\r\n  </ion-grid>\r\n  <!-- /Edit Address -->\r\n\r\n</ion-content>\r\n<ion-footer>\r\n  <ion-grid (click)=\"onClickSaveAddress()\" *ngIf=\"!editAddressData && !routeFromCheckoutPage && !routeFromSelectAddress\">\r\n    <ion-row class=\"ion-justify-content-center ion-align-items-center\">\r\n      <div class=\"app-footer-text\">\r\n        Save<span><i class=\"flaticon-null-20 app-footer-icon\"></i></span>\r\n    </div>\r\n    </ion-row>\r\n  </ion-grid>\r\n  <ion-grid (click)=\"onClickEditAddress()\" *ngIf=\"editAddressData\">\r\n    <ion-row class=\"ion-justify-content-center ion-align-items-center\">\r\n      <div class=\"app-footer-text\">\r\n        Edit<span><i class=\"flaticon-null-20 app-footer-icon\"></i></span>\r\n    </div>\r\n    </ion-row>\r\n  </ion-grid>\r\n  <ion-grid (click)=\"onClickSaveAddress()\"  *ngIf=\"(routeFromCheckoutPage || routeFromSelectAddress) && !editAddressData\">\r\n    <ion-row class=\"ion-justify-content-center ion-align-items-center\">\r\n      <div class=\"app-footer-text\">\r\n        Deliver Here<span><i class=\"flaticon-null-20 app-footer-icon\"></i></span>\r\n    </div>\r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-footer>"

/***/ }),

/***/ "./src/app/new-address/new-address.module.ts":
/*!***************************************************!*\
  !*** ./src/app/new-address/new-address.module.ts ***!
  \***************************************************/
/*! exports provided: NewAddressPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewAddressPageModule", function() { return NewAddressPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _new_address_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./new-address.page */ "./src/app/new-address/new-address.page.ts");







const routes = [
    {
        path: '',
        component: _new_address_page__WEBPACK_IMPORTED_MODULE_6__["NewAddressPage"]
    }
];
let NewAddressPageModule = class NewAddressPageModule {
};
NewAddressPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_new_address_page__WEBPACK_IMPORTED_MODULE_6__["NewAddressPage"]]
    })
], NewAddressPageModule);



/***/ }),

/***/ "./src/app/new-address/new-address.page.scss":
/*!***************************************************!*\
  !*** ./src/app/new-address/new-address.page.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".headings {\n  margin-top: 5px;\n  margin-bottom: 5px;\n  font-size: 14px;\n}\n\nion-input, ion-textarea {\n  font-size: 13px;\n}\n\n.input-border {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 51px;\n  height: 24px;\n  top: 10px;\n}\n\n.switch input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\n.slider:before {\n  position: absolute;\n  content: \"\";\n  height: 16px;\n  width: 16px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\ninput:checked + .slider {\n  background-color: #1CBCB4;\n}\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px #1CBCB4;\n}\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  transform: translateX(26px);\n}\n\n/* Rounded sliders */\n\n.slider.round {\n  border-radius: 34px;\n}\n\n.slider.round:before {\n  border-radius: 50%;\n}\n\n.defalut-address p {\n  text-transform: capitalize;\n}\n\n.location-btn {\n  text-align: center;\n}\n\n@media screen and (min-width: 700px) {\n  #grid-content {\n    font-size: 25px;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  #grid-content {\n    font-size: 25px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbmV3LWFkZHJlc3MvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXG5ldy1hZGRyZXNzXFxuZXctYWRkcmVzcy5wYWdlLnNjc3MiLCJzcmMvYXBwL25ldy1hZGRyZXNzL25ldy1hZGRyZXNzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUNDRjs7QURDQTtFQUNFLGVBQUE7QUNFRjs7QURBQTtFQUNFLHNCQUFBO0VBQ0Esa0JBQUE7QUNHRjs7QURBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFNBQUE7QUNHQTs7QURBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtBQ0dBOztBREFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLHNCQUFBO0VBQ0Esd0JBQUE7RUFDQSxnQkFBQTtBQ0dBOztBREFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLHVCQUFBO0VBQ0Esd0JBQUE7RUFDQSxnQkFBQTtBQ0dBOztBREFBO0VBQ0EseUJBQUE7QUNHQTs7QURBQTtFQUNBLDJCQUFBO0FDR0E7O0FEQUE7RUFDQSxtQ0FBQTtFQUVBLDJCQUFBO0FDR0E7O0FEQUEsb0JBQUE7O0FBQ0E7RUFDQSxtQkFBQTtBQ0dBOztBREFBO0VBQ0Esa0JBQUE7QUNHQTs7QUREQTtFQUNBLDBCQUFBO0FDSUE7O0FERkE7RUFDRSxrQkFBQTtBQ0tGOztBRERBO0VBQ0U7SUFDRSxlQUFBO0VDSUY7QUFDRjs7QUREQTtFQUNFO0lBQ0UsZUFBQTtFQ0dGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9uZXctYWRkcmVzcy9uZXctYWRkcmVzcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZGluZ3N7XHJcbiAgbWFyZ2luLXRvcDogNXB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDVweDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuaW9uLWlucHV0LCBpb24tdGV4dGFyZWF7XHJcbiAgZm9udC1zaXplOiAxM3B4O1xyXG59XHJcbi5pbnB1dC1ib3JkZXJ7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5zd2l0Y2gge1xyXG5wb3NpdGlvbjogcmVsYXRpdmU7XHJcbmRpc3BsYXk6IGlubGluZS1ibG9jaztcclxud2lkdGg6IDUxcHg7XHJcbmhlaWdodDogMjRweDtcclxudG9wOiAxMHB4O1xyXG59XHJcblxyXG4uc3dpdGNoIGlucHV0IHsgXHJcbm9wYWNpdHk6IDA7XHJcbndpZHRoOiAwO1xyXG5oZWlnaHQ6IDA7XHJcbn1cclxuXHJcbi5zbGlkZXIge1xyXG5wb3NpdGlvbjogYWJzb2x1dGU7XHJcbmN1cnNvcjogcG9pbnRlcjtcclxudG9wOiAwO1xyXG5sZWZ0OiAwO1xyXG5yaWdodDogMDtcclxuYm90dG9tOiAwO1xyXG5iYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xyXG4td2Via2l0LXRyYW5zaXRpb246IC40cztcclxudHJhbnNpdGlvbjogLjRzO1xyXG59XHJcblxyXG4uc2xpZGVyOmJlZm9yZSB7XHJcbnBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuY29udGVudDogXCJcIjtcclxuaGVpZ2h0OiAxNnB4O1xyXG53aWR0aDogMTZweDtcclxubGVmdDogNHB4O1xyXG5ib3R0b206IDRweDtcclxuYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbi13ZWJraXQtdHJhbnNpdGlvbjogLjRzO1xyXG50cmFuc2l0aW9uOiAuNHM7XHJcbn1cclxuXHJcbmlucHV0OmNoZWNrZWQgKyAuc2xpZGVyIHtcclxuYmFja2dyb3VuZC1jb2xvcjogIzFDQkNCNDtcclxufVxyXG5cclxuaW5wdXQ6Zm9jdXMgKyAuc2xpZGVyIHtcclxuYm94LXNoYWRvdzogMCAwIDFweCAjMUNCQ0I0O1xyXG59XHJcblxyXG5pbnB1dDpjaGVja2VkICsgLnNsaWRlcjpiZWZvcmUge1xyXG4td2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgyNnB4KTtcclxuLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgyNnB4KTtcclxudHJhbnNmb3JtOiB0cmFuc2xhdGVYKDI2cHgpO1xyXG59XHJcblxyXG4vKiBSb3VuZGVkIHNsaWRlcnMgKi9cclxuLnNsaWRlci5yb3VuZCB7XHJcbmJvcmRlci1yYWRpdXM6IDM0cHg7XHJcbn1cclxuXHJcbi5zbGlkZXIucm91bmQ6YmVmb3JlIHtcclxuYm9yZGVyLXJhZGl1czogNTAlO1xyXG59XHJcbi5kZWZhbHV0LWFkZHJlc3MgcHtcclxudGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcbn1cclxuLmxvY2F0aW9uLWJ0bntcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi8vbWVkaWEgcXVlcmllc1xyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3MDBweCl7XHJcbiAgI2dyaWQtY29udGVudHtcclxuICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCl7XHJcbiAgI2dyaWQtY29udGVudHtcclxuICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICB9XHJcbn0iLCIuaGVhZGluZ3Mge1xuICBtYXJnaW4tdG9wOiA1cHg7XG4gIG1hcmdpbi1ib3R0b206IDVweDtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG5pb24taW5wdXQsIGlvbi10ZXh0YXJlYSB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuLmlucHV0LWJvcmRlciB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLnN3aXRjaCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogNTFweDtcbiAgaGVpZ2h0OiAyNHB4O1xuICB0b3A6IDEwcHg7XG59XG5cbi5zd2l0Y2ggaW5wdXQge1xuICBvcGFjaXR5OiAwO1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xufVxuXG4uc2xpZGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAwLjRzO1xuICB0cmFuc2l0aW9uOiAwLjRzO1xufVxuXG4uc2xpZGVyOmJlZm9yZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgY29udGVudDogXCJcIjtcbiAgaGVpZ2h0OiAxNnB4O1xuICB3aWR0aDogMTZweDtcbiAgbGVmdDogNHB4O1xuICBib3R0b206IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIC13ZWJraXQtdHJhbnNpdGlvbjogMC40cztcbiAgdHJhbnNpdGlvbjogMC40cztcbn1cblxuaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMUNCQ0I0O1xufVxuXG5pbnB1dDpmb2N1cyArIC5zbGlkZXIge1xuICBib3gtc2hhZG93OiAwIDAgMXB4ICMxQ0JDQjQ7XG59XG5cbmlucHV0OmNoZWNrZWQgKyAuc2xpZGVyOmJlZm9yZSB7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDI2cHgpO1xuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDI2cHgpO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjZweCk7XG59XG5cbi8qIFJvdW5kZWQgc2xpZGVycyAqL1xuLnNsaWRlci5yb3VuZCB7XG4gIGJvcmRlci1yYWRpdXM6IDM0cHg7XG59XG5cbi5zbGlkZXIucm91bmQ6YmVmb3JlIHtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xufVxuXG4uZGVmYWx1dC1hZGRyZXNzIHAge1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbn1cblxuLmxvY2F0aW9uLWJ0biB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzAwcHgpIHtcbiAgI2dyaWQtY29udGVudCB7XG4gICAgZm9udC1zaXplOiAyNXB4O1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpIHtcbiAgI2dyaWQtY29udGVudCB7XG4gICAgZm9udC1zaXplOiAyNXB4O1xuICB9XG59Il19 */"

/***/ }),

/***/ "./src/app/new-address/new-address.page.ts":
/*!*************************************************!*\
  !*** ./src/app/new-address/new-address.page.ts ***!
  \*************************************************/
/*! exports provided: NewAddressPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewAddressPage", function() { return NewAddressPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/android-permissions/ngx */ "./node_modules/@ionic-native/android-permissions/ngx/index.js");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");
/* harmony import */ var _ionic_native_location_accuracy_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/location-accuracy/ngx */ "./node_modules/@ionic-native/location-accuracy/ngx/index.js");
/* harmony import */ var _states_modal_states_modal_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../states-modal/states-modal.page */ "./src/app/states-modal/states-modal.page.ts");









let NewAddressPage = class NewAddressPage {
    constructor(events, router, alertController, loadingController, route, userService, androidPermissions, geolocation, locationAccuracy, platform, modalController) {
        this.events = events;
        this.router = router;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.route = route;
        this.userService = userService;
        this.androidPermissions = androidPermissions;
        this.geolocation = geolocation;
        this.locationAccuracy = locationAccuracy;
        this.platform = platform;
        this.modalController = modalController;
        this.addressObj = {
            name: '',
            address: '',
            city: '',
            state: '',
            stateCode: '',
            pincode: '',
            phoneNo: '',
            createdAt: null,
            defaultAddress: true,
            lat: null,
            lng: null
        };
        this.routeFromCheckoutPage = false;
        this.routeFromSelectAddress = false;
        this.states = [];
        this.addressType = 'shipping';
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.editAddressData = this.router.getCurrentNavigation().extras.state.addressData;
                this.addressLength = this.router.getCurrentNavigation().extras.state.addressLength;
                this.routeFromCheckoutPage = this.router.getCurrentNavigation().extras.state.routeFromCheckoutPage;
                this.routeFromSelectAddress = this.router.getCurrentNavigation().extras.state.routeFromSelectAddress;
                this.addressType = this.router.getCurrentNavigation().extras.state.type;
                //console.log('editAddressData', this.editAddressData);
            }
        });
    }
    ngOnInit() {
    }
    ionViewDidEnter() {
        this.initializeSubscriptions();
        this.addressObj.phoneNo = this.userService.getPhoneNo();
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('user:newAddressSaved', () => {
            this.loading.dismiss();
            if (this.routeFromCheckoutPage === true || this.routeFromSelectAddress === true) {
                this.router.navigate(['order-summary']);
            }
            else {
                this.presentAlert('Address saved successfully', true);
            }
        });
        this.events.subscribe('user:addressEditSuccess', () => {
            this.loading.dismiss();
            if (this.routeFromSelectAddress === true) {
                this.router.navigate(['order-summary']);
            }
            else {
                this.presentAlert('Address edited successfully', true);
            }
        });
        this.events.subscribe('user:errorInGettingAddress', () => {
            this.loading.dismiss();
            this.presentAlert('Error in getting address!');
        });
        this.events.subscribe('user:addressValueFromLatLng', (response) => {
            this.loading.dismiss();
            //console.log('address', response);
            this.getAddressFromResponse(response.results[0]);
        });
    }
    getAddressFromResponse(data) {
        if (!this.editAddressData) {
            this.addressObj.address = data.formatted_address;
            this.addressFromApi = data.formatted_address;
            for (let index = 0; index < data.address_components.length; index++) {
                for (let x = 0; x < data.address_components[index].types.length; x++) {
                    if (data.address_components[index].types[x] === "postal_code") {
                        this.addressObj.pincode = data.address_components[index].long_name;
                    }
                }
            }
        }
        else {
            this.editAddressData.address = data.formatted_address;
            this.addressFromApi = data.formatted_address;
            for (let index = 0; index < data.address_components.length; index++) {
                for (let x = 0; x < data.address_components[index].types.length; x++) {
                    if (data.address_components[index].types[x] === "postal_code") {
                        this.editAddressData.pincode = data.address_components[index].long_name;
                    }
                }
            }
        }
    }
    useCurrentLocation() {
        if (this.platform.is('android')) {
            this.checkGPSPermission();
        }
        else {
            this.getLocationCoordinates();
        }
    }
    //Check if application having GPS access permission  
    checkGPSPermission() {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(result => {
            if (result.hasPermission) {
                //If having permission show 'Turn On GPS' dialogue
                this.askToTurnOnGPS();
            }
            else {
                //If not having permission ask for permission
                this.requestGPSPermission();
            }
        }, err => {
            //console.log(err);
        });
    }
    requestGPSPermission() {
        this.locationAccuracy.canRequest().then((canRequest) => {
            if (canRequest) {
                //console.log("4");
            }
            else {
                //Show 'GPS Permission Request' dialogue
                this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
                    .then(() => {
                    // call method to turn on GPS
                    this.askToTurnOnGPS();
                }, error => {
                    //Show alert if user click on 'No Thanks'
                    //console.log('requestPermission Error requesting location permissions ' + error)
                });
            }
        });
    }
    askToTurnOnGPS() {
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // When GPS Turned ON call method to get Accurate location coordinates
            this.getLocationCoordinates();
        }), error => { });
    }
    // Methos to get device accurate coordinates using device GPS
    getLocationCoordinates() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading();
            this.geolocation.getCurrentPosition().then((resp) => {
                this.latitude = resp.coords.latitude;
                this.longitude = resp.coords.longitude;
                this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
            }).catch((error) => {
                alert('Error getting location' + error);
                //console.log(error);
            });
        });
    }
    getAddressFromCoords(latitude, longitude) {
        //console.log("getAddressFromCoords "+latitude+" "+longitude);
        this.events.publish('user:getAddressFromLatLng', latitude, longitude);
    }
    onClickSaveAddress() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.addressObj.name === '') {
                this.presentAlert('Please enter name');
            }
            else if (this.addressObj.address === '') {
                this.presentAlert('Please enter address');
            }
            else if (this.addressObj.city === '') {
                this.presentAlert('Please enter city');
            }
            else if (this.addressObj.state === '') {
                this.presentAlert('Please enter state');
            }
            else if (this.addressObj.pincode === '') {
                this.presentAlert('Please enter pincode');
            }
            else if (this.addressObj.phoneNo === '') {
                this.presentAlert('Please enter phoneNo');
            }
            else {
                yield this.presentLoading();
                this.addressObj.createdAt = new Date();
                if (this.addressFromApi === this.addressObj.address) {
                    this.addressObj.lat = this.latitude;
                    this.addressObj.lng = this.longitude;
                }
                this.events.publish('user:saveNewAddress', this.addressObj, this.addressType);
            }
        });
    }
    onClickEditAddress() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.editAddressData.name === '') {
                this.presentAlert('Please enter name');
            }
            else if (this.editAddressData.address === '') {
                this.presentAlert('Please enter address');
            }
            else if (this.editAddressData.city === '') {
                this.presentAlert('Please enter city');
            }
            else if (this.editAddressData.state === '') {
                this.presentAlert('Please enter state');
            }
            else if (this.editAddressData.pincode === '') {
                this.presentAlert('Please enter pincode');
            }
            else if (this.editAddressData.phoneNo === '') {
                this.presentAlert('Please enter phoneNo');
            }
            else {
                yield this.presentLoading();
                this.editAddressData.createdAt = new Date();
                if (this.addressFromApi === this.editAddressData.address) {
                    this.editAddressData.lat = this.latitude;
                    this.editAddressData.lng = this.longitude;
                }
                this.events.publish('user:editSavedAddress', this.editAddressData, this.addressType);
            }
        });
    }
    updateNewAddressDefaultStatus() {
        if (this.addressObj.defaultAddress === true || this.addressObj.defaultAddress === null) {
            this.addressObj.defaultAddress = false;
        }
        else {
            this.addressObj.defaultAddress = true;
        }
    }
    updateEditAddressDefaultStatus(status) {
        if (status === true) {
            this.editAddressData.status = false;
        }
        else {
            this.editAddressData.status = true;
        }
    }
    goToPage(page) {
        this.router.navigate([page]);
    }
    addressChange() {
        this.editAddressData.lat = null;
        this.editAddressData.lng = null;
    }
    openStateModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _states_modal_states_modal_page__WEBPACK_IMPORTED_MODULE_8__["StatesModalPage"],
            });
            modal.onDidDismiss()
                .then((res) => {
                //console.log('data from modal', res);
                if (res.data) {
                    //console.log(res.data);
                    if (!this.editAddressData) {
                        this.addressObj.state = res.data.state;
                        this.addressObj.stateCode = res.data.code;
                    }
                    else {
                        this.editAddressData.state = res.data.state;
                        this.editAddressData.stateCode = res.data.code;
                    }
                }
            });
            yield modal.present();
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
                            if (action === true) {
                                this.router.navigate(['user-addresses']);
                            }
                        }
                    }]
            });
            yield alert.present();
        });
    }
    presentLoading() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Please Wait...',
                duration: 10000
            });
            yield this.loading.present();
        });
    }
    removeSubscriptions() {
        this.events.unsubscribe('user:newAddressSaved');
        this.events.unsubscribe('user:addressEditSuccess');
        this.events.unsubscribe('user:errorInGettingAddress');
        this.events.unsubscribe('user:addressValueFromLatLng');
    }
};
NewAddressPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"] },
    { type: _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_5__["AndroidPermissions"] },
    { type: _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_6__["Geolocation"] },
    { type: _ionic_native_location_accuracy_ngx__WEBPACK_IMPORTED_MODULE_7__["LocationAccuracy"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('map', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], NewAddressPage.prototype, "mapElement", void 0);
NewAddressPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-new-address',
        template: __webpack_require__(/*! raw-loader!./new-address.page.html */ "./node_modules/raw-loader/index.js!./src/app/new-address/new-address.page.html"),
        styles: [__webpack_require__(/*! ./new-address.page.scss */ "./src/app/new-address/new-address.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
        _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_5__["AndroidPermissions"],
        _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_6__["Geolocation"],
        _ionic_native_location_accuracy_ngx__WEBPACK_IMPORTED_MODULE_7__["LocationAccuracy"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]])
], NewAddressPage);



/***/ })

}]);
//# sourceMappingURL=new-address-new-address-module-es2015.js.map