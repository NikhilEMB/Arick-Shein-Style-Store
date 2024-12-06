(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["integrations-integrations-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/integrations/integrations.page.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/integrations/integrations.page.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\"\r\n      class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\"\r\n        name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\"\r\n      slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Integrations</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=2\r\n          id=\"scroll1\">\r\n          <div class=\"statusList\">\r\n            <p *ngFor='let item of sidemenu; let i=index' (click)='changeComponent(item)'\r\n            [ngClass]=\"component === item ? 'tile-bg-active' : 'tile-bg-inactive'\">{{item}}</p>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=10\r\n          id=\"scroll2\">\r\n          <!-- <ion-col>\r\n            <ion-button class=\"margin-bottom: 1rem;\" (click)=\"onClickSavePaymentSettings()\"\r\n              color=\"success\">\r\n              <i class=\"flaticon-null-20 margin-icon\"></i>\r\n              Save\r\n            </ion-button>\r\n          </ion-col> -->\r\n              <ion-grid [ngSwitch]=\"component\">\r\n                <ion-row *ngSwitchCase=\"'p.o.s'\">\r\n                  <!-- <ion-col size=\"4\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('pos','marg')\">\r\n                      <p>Marg</p>\r\n                    </div>\r\n                  </ion-col> -->\r\n                  Coming soon!\r\n                </ion-row>\r\n\r\n                <ion-row *ngSwitchCase=\"'delivery'\">\r\n                  <ion-col size=\"4\">\r\n                    <ion-item class=\"m-b-20\">\r\n                      <ion-label>Select Default Delivery</ion-label>\r\n                      <ion-select mode=\"ios\" [(ngModel)]=\"delivery.default\">\r\n                        <ion-select-option value=\"\">No Default</ion-select-option>\r\n                        <ion-select-option value=\"shiprocket\">shiprocket</ion-select-option>\r\n                        <!-- <ion-select-option value=\"dunzo\">dunzo</ion-select-option>\r\n                        <ion-select-option value=\"nimbuspost\">nimbuspost</ion-select-option>\r\n                        <ion-select-option value=\"pickrr\">pickrr</ion-select-option>\r\n                        <ion-select-option value=\"delhivery\">delhivery</ion-select-option>\r\n                        <ion-select-option value=\"fastbeetle\">fastbeetle</ion-select-option>\r\n                        <ion-select-option value=\"porter\">porter</ion-select-option> -->\r\n                        <!-- <ion-select-option value=\"shyplite\">shyplite</ion-select-option> -->\r\n                      </ion-select>\r\n                    </ion-item>\r\n                  </ion-col>\r\n                  <ion-col size=\"8\">\r\n                    <ion-button (click)=\"saveChoiceSettings('delivery')\" color=\"success\" >\r\n                      Save\r\n                    </ion-button>\r\n                  </ion-col>\r\n                  <ion-col size=\"4\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('delivery','shiprocket')\">\r\n                      <p>Shiprocket</p>\r\n                    </div>\r\n                  </ion-col>\r\n                  <!-- <ion-col size=\"4\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('delivery','shyplite')\">\r\n                      <p>Shyplite</p>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"4\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('delivery','dunzo')\">\r\n                      <p>Dunzo</p>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"4\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('delivery','nimbuspost')\">\r\n                      <p>Nimbuspost</p>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"4\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('delivery','delhivery')\">\r\n                      <p>Delhivery</p>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"4\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('delivery','pickrr')\">\r\n                      <p>Pickrr</p>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"4\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('delivery','fastbeetle')\">\r\n                      <p>FastBeetle</p>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"4\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('delivery','porter')\">\r\n                      <p>Porter</p>\r\n                    </div>\r\n                  </ion-col> -->\r\n                </ion-row>\r\n\r\n                <ion-row *ngSwitchCase=\"'email'\">\r\n                  <ion-col size=\"4\">\r\n                    <ion-item class=\"m-b-20\">\r\n                      <ion-label>Select Default Email</ion-label>\r\n                      <ion-select mode=\"ios\" [(ngModel)]=\"email.default\">\r\n                        <ion-select-option value=\"\">No Default</ion-select-option>\r\n                        <ion-select-option value=\"sendgrid\">sendgrid</ion-select-option>\r\n                      </ion-select>\r\n                    </ion-item>\r\n                  </ion-col>\r\n                  <ion-col size=\"8\">\r\n                    <ion-button (click)=\"saveChoiceSettings('email')\" color=\"success\" >\r\n                      Save\r\n                    </ion-button>\r\n                  </ion-col>\r\n                  <ion-col size=\"4\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('email','sendgrid')\">\r\n                      <p>Sendgrid</p>\r\n                    </div>\r\n                  </ion-col>\r\n                </ion-row>\r\n\r\n                <ion-row *ngSwitchCase=\"'sms'\">\r\n                  <ion-col size=\"4\">\r\n                    <ion-item class=\"m-b-20\">\r\n                      <ion-label>Select Default SMS</ion-label>\r\n                      <ion-select mode=\"ios\" [(ngModel)]=\"sms.default\">\r\n                        <ion-select-option value=\"\">No Default</ion-select-option>\r\n                        <ion-select-option value=\"twilio\">Twilio</ion-select-option>\r\n                        <ion-select-option value=\"msg91\">Msg91</ion-select-option>\r\n                      </ion-select>\r\n                    </ion-item>\r\n                  </ion-col>\r\n                  <ion-col size=\"8\">\r\n                    <ion-button (click)=\"saveChoiceSettings('sms')\" color=\"success\" >\r\n                      Save\r\n                    </ion-button>\r\n                  </ion-col>\r\n                  <ion-col size=\"4\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('sms','twilio')\">\r\n                      <p>Twilio</p>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"4\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('sms','msg91')\">\r\n                      <p>Msg91</p>\r\n                    </div>\r\n                  </ion-col>\r\n                </ion-row>\r\n\r\n                <ion-row *ngSwitchCase=\"'whatsapp'\">\r\n                  <ion-col size=\"10\">\r\n                    <ion-item class=\"m-b-20\">\r\n                      <ion-label>Select Default Whatsapp Promotion Integration</ion-label>\r\n                      <ion-select interface=\"popover\" mode=\"ios\" [(ngModel)]=\"whatsapp_promotion.default\">\r\n                        <ion-select-option value=\"\">No Default</ion-select-option>\r\n                        <ion-select-option value=\"twilio\">Twilio</ion-select-option>\r\n                        <ion-select-option value=\"aisensy\">AiSensy</ion-select-option>\r\n                        <ion-select-option value=\"interakt\">Interakt</ion-select-option>\r\n                      </ion-select>\r\n                    </ion-item>\r\n                  </ion-col>\r\n                  <ion-col size=\"2\">\r\n                    <ion-button (click)=\"saveChoiceSettings('whatsapp_promotion')\" color=\"success\" >\r\n                      Save\r\n                    </ion-button>\r\n                  </ion-col>\r\n                  <ion-col size=\"12\">\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('whatsapp_promotion','twilio_promotion')\">\r\n                      <p>Twilio</p>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"12\">\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('whatsapp_promotion','aisensy_promotion')\">\r\n                      <p>AiSensy</p>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"12\">\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('whatsapp_promotion','interakt_promotion')\">\r\n                      <p>Interakt</p>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"10\">\r\n                    <ion-item class=\"m-b-20\">\r\n                      <ion-label>Select Default Whatsapp Order Notification Integration</ion-label>\r\n                      <ion-select interface=\"popover\" mode=\"ios\" [(ngModel)]=\"whatsapp_order_notification.default\">\r\n                        <ion-select-option value=\"\">No Default</ion-select-option>\r\n                        <ion-select-option value=\"twilio\">Twilio</ion-select-option>\r\n                        <ion-select-option value=\"aisensy\">AiSensy</ion-select-option>\r\n                        <ion-select-option value=\"interakt\">Interakt</ion-select-option>\r\n                      </ion-select>\r\n                    </ion-item>\r\n                  </ion-col>\r\n                  <ion-col size=\"2\">\r\n                    <ion-button (click)=\"saveChoiceSettings('whatsapp_order_notification')\" color=\"success\" >\r\n                      Save\r\n                    </ion-button>\r\n                  </ion-col>\r\n                  <ion-col size=\"12\">\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('whatsapp_order_notification','twilio_order_notification')\">\r\n                      <p>Twilio</p>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"12\">\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('whatsapp_order_notification','aisensy_order_notification')\">\r\n                      <p>AiSensy</p>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"12\">\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('whatsapp_order_notification','interakt_order_notification')\">\r\n                      <p>Interakt</p>\r\n                    </div>\r\n                  </ion-col>\r\n                </ion-row>\r\n\r\n                <ion-row *ngSwitchCase=\"'crm'\">\r\n                  <ion-col size=\"5\">\r\n                    <ion-item class=\"m-b-20\">\r\n                      <ion-label>Select Default CRM</ion-label>\r\n                      <ion-select interface=\"popover\" mode=\"ios\" [(ngModel)]=\"crm.default\">\r\n                        <ion-select-option value=\"\">No Default</ion-select-option>\r\n                        <ion-select-option value=\"zoho\">Zoho CRM</ion-select-option>\r\n                      </ion-select>\r\n                    </ion-item>\r\n                  </ion-col>\r\n                  <ion-col size=\"6\">\r\n                    <ion-button (click)=\"saveChoiceSettings('crm')\" color=\"success\" >\r\n                      Save\r\n                    </ion-button>\r\n                  </ion-col>\r\n                  <ion-col size=\"4\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('crm','zoho')\">\r\n                      <p>ZOHO CRM</p>\r\n                    </div>\r\n                  </ion-col>\r\n                </ion-row>\r\n\r\n                <ion-row *ngSwitchCase=\"'inventory management'\">\r\n                  <ion-col size=\"6\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('inventoryManagement','omsguru')\">\r\n                      <p>OMSGuru</p>\r\n                    </div>\r\n                  </ion-col>\r\n                  <ion-col size=\"6\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('inventoryManagement','zohoInventory')\">\r\n                      <p>Zoho Inventory</p>\r\n                    </div>\r\n                  </ion-col>\r\n                </ion-row>\r\n\r\n                <ion-row *ngSwitchCase=\"'website analytics'\">\r\n                  Coming soon!\r\n                </ion-row>\r\n\r\n                <ion-row *ngSwitchCase=\"'app analytics'\">\r\n                  Coming soon!\r\n                </ion-row>\r\n\r\n                <ion-row *ngSwitchCase=\"'app stores'\">\r\n                  Coming soon!\r\n                </ion-row>\r\n\r\n                <ion-row *ngSwitchCase=\"'ads'\">\r\n                  Coming soon!\r\n                </ion-row>\r\n\r\n                <ion-row *ngSwitchCase=\"'marketplace'\">\r\n                  Coming soon!\r\n                </ion-row>\r\n\r\n                <ion-row *ngSwitchCase=\"'shopify'\">\r\n                  <ion-col size=\"6\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('shopify','Shopify Orders Sync')\">\r\n                      <p>Orders Sync</p>\r\n                    </div>\r\n                  </ion-col>\r\n                </ion-row>\r\n\r\n                <ion-row *ngSwitchCase=\"'shopify'\">\r\n                  <ion-col size=\"6\" >\r\n                    <div class=\"img-container\"\r\n                      (click)=\"openSettings('shopify','Shopify Products Sync')\">\r\n                      <p>Products Sync</p>\r\n                    </div>\r\n                  </ion-col>\r\n                </ion-row>\r\n\r\n                <ion-row *ngSwitchCase=\"'wordpress'\">\r\n                  Coming soon!\r\n                </ion-row>\r\n\r\n                <ion-row *ngSwitchCase=\"'live chat'\">\r\n                  Coming soon!\r\n                </ion-row>\r\n                \r\n              </ion-grid>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/integrations/integrations.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/integrations/integrations.module.ts ***!
  \*****************************************************/
/*! exports provided: IntegrationsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntegrationsPageModule", function() { return IntegrationsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _integrations_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./integrations.page */ "./src/app/integrations/integrations.page.ts");







var routes = [
    {
        path: '',
        component: _integrations_page__WEBPACK_IMPORTED_MODULE_6__["IntegrationsPage"]
    }
];
var IntegrationsPageModule = /** @class */ (function () {
    function IntegrationsPageModule() {
    }
    IntegrationsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_integrations_page__WEBPACK_IMPORTED_MODULE_6__["IntegrationsPage"]]
        })
    ], IntegrationsPageModule);
    return IntegrationsPageModule;
}());



/***/ }),

/***/ "./src/app/integrations/integrations.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/integrations/integrations.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  width: 100%;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 82vh;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 82vh;\n  margin-top: 8px;\n  border-left: 1px solid lightgray;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n.statusList {\n  text-align: center;\n}\n\n.statusList p {\n  font-size: medium;\n  border: 1px solid lightgray;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.img-container {\n  width: 80%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  padding: 1rem;\n  margin: auto;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  cursor: pointer;\n}\n\n.img-container:hover {\n  box-shadow: 0 2px 5px #ccc;\n}\n\n.img-container img {\n  max-width: 100%;\n  max-height: 100%;\n}\n\n.img-container img:hover {\n  cursor: pointer;\n}\n\n.img-container p {\n  text-transform: uppercase;\n  font-size: 1.5rem;\n  font-weight: 500;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1,\n#scroll2 {\n    height: 92vh;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaW50ZWdyYXRpb25zL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxpbnRlZ3JhdGlvbnNcXGludGVncmF0aW9ucy5wYWdlLnNjc3MiLCJzcmMvYXBwL2ludGVncmF0aW9ucy9pbnRlZ3JhdGlvbnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtBQ0NGOztBRENBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0FDRUY7O0FEREU7RUFDRSxnQkFBQTtBQ0dKOztBRENBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGdDQUFBO0FDRUY7O0FEREU7RUFDRSxnQkFBQTtBQ0dKOztBRENBO0VBQ0Usa0JBQUE7QUNFRjs7QURERTtFQUNFLGlCQUFBO0VBQ0EsMkJBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtLQUFBLHNCQUFBO01BQUEscUJBQUE7VUFBQSxpQkFBQTtBQ0dKOztBREFBO0VBQ0UsVUFBQTtFQUVBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQ0VGOztBRERFO0VBQ0UsMEJBQUE7QUNHSjs7QURERTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQ0dKOztBREZJO0VBQ0UsZUFBQTtBQ0lOOztBRERFO0VBQ0UseUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FDR0o7O0FEQUE7RUFDRTs7SUFFRSxZQUFBO0VDR0Y7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2ludGVncmF0aW9ucy9pbnRlZ3JhdGlvbnMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW4tY29udGFpbmVyIHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG4jc2Nyb2xsMSB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDgydmg7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxufVxyXG5cclxuI3Njcm9sbDIge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiA4MnZoO1xyXG4gIG1hcmdpbi10b3A6IDhweDtcclxuICBib3JkZXItbGVmdDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICAmOmhvdmVyIHtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgfVxyXG59XHJcblxyXG4uc3RhdHVzTGlzdCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHAge1xyXG4gICAgZm9udC1zaXplOiBtZWRpdW07XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgbWFyZ2luOiA4cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcclxuICB9XHJcbn1cclxuLmltZy1jb250YWluZXIge1xyXG4gIHdpZHRoOiA4MCU7XHJcbiAgLy8gICBoZWlnaHQ6IDYwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogMXJlbTtcclxuICBtYXJnaW46IGF1dG87XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICY6aG92ZXIge1xyXG4gICAgYm94LXNoYWRvdzogMCAycHggNXB4ICNjY2M7XHJcbiAgfVxyXG4gIGltZyB7XHJcbiAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICBtYXgtaGVpZ2h0OiAxMDAlO1xyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIH1cclxuICB9XHJcbiAgcCB7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gIH1cclxufVxyXG5AbWVkaWEgc2NyZWVuIGFuZChtaW4taGVpZ2h0OiAxMjAwcHgpIHtcclxuICAjc2Nyb2xsMSxcclxuICAjc2Nyb2xsMiB7XHJcbiAgICBoZWlnaHQ6IDkydmg7XHJcbiAgfVxyXG59XHJcbiIsIi5tYWluLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4jc2Nyb2xsMSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogODJ2aDtcbn1cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDgydmg7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG4jc2Nyb2xsMjpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5zdGF0dXNMaXN0IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLnN0YXR1c0xpc3QgcCB7XG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbjogOHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG4uaW1nLWNvbnRhaW5lciB7XG4gIHdpZHRoOiA4MCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAxcmVtO1xuICBtYXJnaW46IGF1dG87XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmltZy1jb250YWluZXI6aG92ZXIge1xuICBib3gtc2hhZG93OiAwIDJweCA1cHggI2NjYztcbn1cbi5pbWctY29udGFpbmVyIGltZyB7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWF4LWhlaWdodDogMTAwJTtcbn1cbi5pbWctY29udGFpbmVyIGltZzpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5pbWctY29udGFpbmVyIHAge1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xuICAjc2Nyb2xsMSxcbiNzY3JvbGwyIHtcbiAgICBoZWlnaHQ6IDkydmg7XG4gIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/integrations/integrations.page.ts":
/*!***************************************************!*\
  !*** ./src/app/integrations/integrations.page.ts ***!
  \***************************************************/
/*! exports provided: IntegrationsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntegrationsPage", function() { return IntegrationsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_integrations_integrations_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/integrations/integrations.service */ "./src/app/services/integrations/integrations.service.ts");
/* harmony import */ var _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var _integration_settings_integration_settings_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./integration-settings/integration-settings.page */ "./src/app/integrations/integration-settings/integration-settings.page.ts");






var IntegrationsPage = /** @class */ (function () {
    function IntegrationsPage(sharedService, modalController, integrationService) {
        this.sharedService = sharedService;
        this.modalController = modalController;
        this.integrationService = integrationService;
        // sidemenu = ['Delivery', 'Email', 'P.O.S', 'SMS', 'Whatsapp', 'CRM', 'Inventory Management', 'Website Analytics', 'App Analytics', 'App Stores', 'Ads', 'Marketplace', 'Shopify', 'Wordpress', 'Live Chat'];
        this.sidemenu = ['Delivery', 'Email', 'SMS'];
        this.component = 'delivery';
        this.delivery = {
            default: ''
        };
        this.email = {
            default: ''
        };
        this.sms = {
            default: ''
        };
        this.whatsapp_promotion = {
            default: ''
        };
        this.whatsapp_order_notification = {
            default: ''
        };
        this.crm = {
            default: ''
        };
    }
    IntegrationsPage.prototype.ngOnInit = function () {
    };
    IntegrationsPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var choiceDetailsDelivery, choiceDetailsEmail, choiceDetailsSMS, choiceDetailsWhatsapp_promotion, choiceDetailsWhatsapp_order_notification, choiceDetailsCRM;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.integrationService.getChoiceSettings('delivery')];
                    case 1:
                        choiceDetailsDelivery = _a.sent();
                        return [4 /*yield*/, this.integrationService.getChoiceSettings('email')];
                    case 2:
                        choiceDetailsEmail = _a.sent();
                        return [4 /*yield*/, this.integrationService.getChoiceSettings('sms')];
                    case 3:
                        choiceDetailsSMS = _a.sent();
                        return [4 /*yield*/, this.integrationService.getChoiceSettings('whatsapp_promotion')];
                    case 4:
                        choiceDetailsWhatsapp_promotion = _a.sent();
                        return [4 /*yield*/, this.integrationService.getChoiceSettings('whatsapp_order_notification')];
                    case 5:
                        choiceDetailsWhatsapp_order_notification = _a.sent();
                        return [4 /*yield*/, this.integrationService.getChoiceSettings('crm')];
                    case 6:
                        choiceDetailsCRM = _a.sent();
                        if (choiceDetailsDelivery) {
                            this.delivery = choiceDetailsDelivery;
                            // Object.assign(this.getIntegrationChoiceObj(), integrationDetails);
                        }
                        if (choiceDetailsEmail) {
                            this.email = choiceDetailsEmail;
                        }
                        if (choiceDetailsSMS) {
                            this.sms = choiceDetailsSMS;
                        }
                        if (choiceDetailsWhatsapp_promotion) {
                            this.whatsapp_promotion = choiceDetailsWhatsapp_promotion;
                        }
                        if (choiceDetailsWhatsapp_order_notification) {
                            this.whatsapp_order_notification = choiceDetailsWhatsapp_order_notification;
                        }
                        if (choiceDetailsCRM) {
                            this.crm = choiceDetailsCRM;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    IntegrationsPage.prototype.changeComponent = function (choice) {
        this.component = choice.toLowerCase();
        console.log('component:', this.component);
    };
    IntegrationsPage.prototype.saveChoiceSettings = function (sidemenuChoice) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var settings, success;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (sidemenuChoice == 'delivery') {
                            settings = this.delivery;
                        }
                        if (sidemenuChoice == 'email') {
                            settings = this.email;
                        }
                        if (sidemenuChoice == 'sms') {
                            settings = this.sms;
                        }
                        if (sidemenuChoice == 'whatsapp_promotion') {
                            settings = this.whatsapp_promotion;
                        }
                        if (sidemenuChoice == 'whatsapp_order_notification') {
                            settings = this.whatsapp_order_notification;
                        }
                        if (sidemenuChoice == 'crm') {
                            settings = this.crm;
                        }
                        return [4 /*yield*/, this.integrationService.saveChoiceSettings(sidemenuChoice, settings)];
                    case 1:
                        success = _a.sent();
                        if (success) {
                            if (this.sharedService.loading) {
                                this.sharedService.loading.dismiss();
                            }
                            this.sharedService.presentAlert('Settings saved successfully');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    IntegrationsPage.prototype.openSettings = function (sidemenuChoice, integrationChoice) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _integration_settings_integration_settings_page__WEBPACK_IMPORTED_MODULE_5__["IntegrationSettingsPage"],
                            backdropDismiss: false,
                            cssClass: 'custom-modal custom-modal-interakt',
                            componentProps: {
                                integrationChoice: integrationChoice,
                                sidemenuChoice: sidemenuChoice
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
    IntegrationsPage.ctorParameters = function () { return [
        { type: _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _services_integrations_integrations_service__WEBPACK_IMPORTED_MODULE_3__["IntegrationsService"] }
    ]; };
    IntegrationsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-integrations',
            template: __webpack_require__(/*! raw-loader!./integrations.page.html */ "./node_modules/raw-loader/index.js!./src/app/integrations/integrations.page.html"),
            styles: [__webpack_require__(/*! ./integrations.page.scss */ "./src/app/integrations/integrations.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"], _services_integrations_integrations_service__WEBPACK_IMPORTED_MODULE_3__["IntegrationsService"]])
    ], IntegrationsPage);
    return IntegrationsPage;
}());



/***/ })

}]);
//# sourceMappingURL=integrations-integrations-module-es5.js.map