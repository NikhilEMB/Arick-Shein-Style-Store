(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["whatsapp-promotions-whatsapp-promotions-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/whatsapp-promotions/whatsapp-promotions.page.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/whatsapp-promotions/whatsapp-promotions.page.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title>Whatsapp Promotions</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=6 id=\"scroll1\">\r\n          <p style=\"text-align:center; font-size: medium; font-weight: bold;\">\r\n            Select Users / Groups\r\n          </p>\r\n          <div class=\"sideMenu-local\">\r\n            <!-- !!! Users -->\r\n            <!-- <div class=\"flex-label-local\">\r\n              <p>All Users</p>\r\n              <div class=\"toggle-btn-local\">\r\n                <label class=\"switch\">\r\n                  <input color=\"primary\" type=\"checkbox\" (click)=\"grpCheck()\">\r\n                  <span class=\"slider round\"></span>\r\n                </label>\r\n              </div>\r\n              <p>Groups</p>\r\n            </div> -->\r\n\r\n            <ion-list>\r\n              <ion-radio-group>\r\n                <ion-item>\r\n                  <ion-label>All Users</ion-label>\r\n                  <ion-radio mode=\"ios\" slot=\"end\" value=\"all\" (click)=\"grpCheck('all')\" checked></ion-radio>\r\n                </ion-item>\r\n                <ion-item>\r\n                  <ion-label>Custom Selection(s)</ion-label>\r\n                  <ion-radio mode=\"ios\" slot=\"end\" value=\"singleUser\" (click)=\"grpCheck('singleUser')\"></ion-radio>\r\n                </ion-item>\r\n                <ion-item lines=\"none\">\r\n                  <ion-label>Groups</ion-label>\r\n                  <ion-radio mode=\"ios\" slot=\"end\" value=\"groups\" (click)=\"grpCheck('groups')\"></ion-radio>\r\n                </ion-item>\r\n              </ion-radio-group>\r\n            </ion-list>\r\n\r\n            <div *ngIf=\"selection === 'groups'\">\r\n\r\n              <p style=\"text-align:center; font-size: medium; font-weight: bold;\">Select Groups</p>\r\n              <ion-item>\r\n                <ion-label>Available Groups</ion-label>\r\n                <ion-select multiple=\"true\" interface=\"popover\" cancelText=\"Cancel\" okText=\"Okay!\" mode=\"ios\"\r\n                  (ionChange)=\"getGroupOptions($event.target.value)\">\r\n                  <ion-select-option *ngFor=\"let group of userGroups\" [value]=\"group.id\">\r\n                    {{group.name}}\r\n                  </ion-select-option>\r\n                </ion-select>\r\n              </ion-item>\r\n            </div>\r\n          </div>\r\n          <p style=\"text-align:center; font-size: medium; font-weight: bold;\">Select Service</p>\r\n          <div class=\"sideMenu-st\">\r\n            <!-- !!! Services -->\r\n            <ion-item>\r\n              <ion-label>Available Services</ion-label>\r\n              <ion-select multiple=\"false\" interface=\"popover\" cancelText=\"Cancel\" okText=\"Okay!\" mode=\"ios\"\r\n                [(ngModel)]=\"selectedService\" (ionChange)=\"getServicesOptions($event.target.value)\">\r\n                <ion-select-option value=\"twilio\">Twilio</ion-select-option>\r\n                <ion-select-option value=\"aisensy\">AiSensy</ion-select-option>\r\n                <ion-select-option value=\"interakt\">Interakt</ion-select-option>\r\n              </ion-select>\r\n            </ion-item>\r\n          </div>\r\n          \r\n          <!-- Select Template -->\r\n          <!-- <ng-container *ngIf=\"selectedService[0] !== 'aisensy'\">\r\n            <p style=\"text-align:center; font-size: medium; font-weight: bold;\">\r\n              Select Template\r\n            </p>\r\n            <div class=\"sideMenu-st\">\r\n              !!! Templates\r\n              <ion-item>\r\n                <ion-label>Available Templates</ion-label>\r\n                <ion-select multiple=\"true\" interface=\"popover\" cancelText=\"Cancel\" okText=\"Okay!\" mode=\"ios\">\r\n                  <ion-select-option value=\"aisensy\">Template 1</ion-select-option>\r\n                </ion-select>\r\n              </ion-item>\r\n            </div>\r\n          </ng-container> -->\r\n\r\n          <!-- Select Campaign -->\r\n          <div *ngIf=\"selectedService && availableCampaigns.length > 0\">\r\n            <p style=\"text-align:center; font-size: medium; font-weight: bold;\">\r\n              Select Campaign\r\n            </p>\r\n            <div class=\"sideMenu-st\">\r\n              <!-- !!! Templates -->\r\n              <ion-item>\r\n                <ion-label>Available Campaigns</ion-label>\r\n                <ion-select interface=\"popover\" cancelText=\"Cancel\" okText=\"Okay!\" mode=\"ios\"\r\n                  (ionChange)=\"getCampaignOptions($event.target.value)\">\r\n                  <ion-select-option *ngFor=\"let campaign of availableCampaigns\">{{campaign.campaignName}}</ion-select-option>\r\n                </ion-select>\r\n              </ion-item>\r\n            </div>\r\n          </div>\r\n\r\n          <div *ngIf=\"selectedService === 'twilio'\">\r\n            <p style=\"text-align:center; font-size: medium; font-weight: bold;\">\r\n              Make / Edit the template\r\n            </p>\r\n            <div class=\"sideMenu-st\">\r\n              <div class=\"save-button\" style=\"margin: 20px 0 20px 0\">\r\n                <ion-button (click)=\"templateMaker()\" shape=\"round\" class=\"btn-1 i-start\"\r\n                  color=\"success\">\r\n                  <i *ngIf=\"twilioTemplateButton === 'Make'\" class=\"flaticon-null-5 margin-icon\"></i>\r\n                  <i *ngIf=\"twilioTemplateButton === 'Edit'\" class=\"flaticon-pencil-edit-button margin-icon\"></i>\r\n                  {{twilioTemplateButton}} your template\r\n                </ion-button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div *ngIf=\"selectedService && availableCampaigns.length > 0 && (selectedCampaign != '')\">\r\n            <p style=\"text-align:center; font-size: medium; font-weight: bold;\">\r\n              Enter Campaign Params\r\n            </p>\r\n            <div class=\"sideMenu-st\">\r\n              <ion-item>\r\n                <ion-input mode=\"ios\" placeholder=\"Enter Params here\" (ionChange)=\"getCampaignParams($event.target.value)\"></ion-input>\r\n              </ion-item>\r\n            </div>\r\n          </div>\r\n\r\n          <div *ngIf=\"selectedService === 'twilio' && twilioParams.length\">\r\n            <p style=\"text-align:center; font-size: medium; font-weight: bold;\">\r\n              {{twilioParamDesc}}\r\n            </p>\r\n            <div class=\"sideMenu-st\">\r\n              <ion-item>\r\n                <ion-input mode=\"ios\" placeholder=\"Enter Params here\" [(ngModel)]=\"tempParam\" value=\"tempParam\" (ionChange)=\"getTwilioParams($event.target.value)\"></ion-input>\r\n              </ion-item>\r\n            </div>\r\n          </div>\r\n\r\n          <!-- Select Template Params -->\r\n          <!-- <ng-container *ngIf=\"selectedService[0] == 'aisensy'\">\r\n            <p style=\"text-align:center; font-size: medium; font-weight: bold;\">\r\n              Select Template Param\r\n            </p>\r\n            <div class=\"sideMenu-st\">\r\n              !!! Templates\r\n              <ion-item>\r\n                <ion-label>Available Template Params</ion-label>\r\n                <ion-select multiple=\"true\" interface=\"popover\" cancelText=\"Cancel\" okText=\"Okay!\" mode=\"ios\">\r\n                  <ion-select-option value=\"aisensy\">Template 1</ion-select-option>\r\n                </ion-select>\r\n              </ion-item>\r\n            </div>\r\n          </ng-container> -->\r\n\r\n          <div class=\"save-button\">\r\n            <ion-button (click)=\"saveSettings()\" [disabled]=\"disableSave\" shape=\"round\" class=\"btn-1 i-start\"\r\n              color=\"success\">\r\n              <i class=\"flaticon-null-20 margin-icon\"></i>\r\n              Send Message\r\n            </ion-button>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=6 id=\"scroll2\">\r\n          <div class=\"messageArea\">\r\n            <p style=\"text-align:center; font-size: medium; font-weight: bold;\">\r\n              Recent Logs\r\n            </p>\r\n            <ng-container *ngIf=\"logs\">\r\n              <div>\r\n                <ion-card mode *ngFor=\"let log of logsArr; let i = index\" class=\"customCard\">\r\n                  <ion-card-header>\r\n                    <ion-card-subtitle style=\"text-transform: capitalize;\">{{log.title}}</ion-card-subtitle>\r\n                    <ion-card-title>Broadcast Time - {{log.time}}</ion-card-title>\r\n                    <ion-card-title>Broadcast Selection - {{log.sendTo}}</ion-card-title>\r\n                  </ion-card-header>\r\n                </ion-card>\r\n              </div>\r\n            </ng-container> \r\n            <ng-container *ngIf=\"!logs || !logsArr.length\">\r\n              <p style=\"text-align:center; font-size: medium; margin-top: 20px;\">No Logs available yet!</p>\r\n            </ng-container>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/whatsapp-promotions/whatsapp-promotions.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/whatsapp-promotions/whatsapp-promotions.module.ts ***!
  \*******************************************************************/
/*! exports provided: WhatsappPromotionsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsappPromotionsPageModule", function() { return WhatsappPromotionsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _whatsapp_promotions_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./whatsapp-promotions.page */ "./src/app/whatsapp-promotions/whatsapp-promotions.page.ts");







var routes = [
    {
        path: '',
        component: _whatsapp_promotions_page__WEBPACK_IMPORTED_MODULE_6__["WhatsappPromotionsPage"]
    }
];
var WhatsappPromotionsPageModule = /** @class */ (function () {
    function WhatsappPromotionsPageModule() {
    }
    WhatsappPromotionsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_whatsapp_promotions_page__WEBPACK_IMPORTED_MODULE_6__["WhatsappPromotionsPage"]]
        })
    ], WhatsappPromotionsPageModule);
    return WhatsappPromotionsPageModule;
}());



/***/ }),

/***/ "./src/app/whatsapp-promotions/whatsapp-promotions.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/whatsapp-promotions/whatsapp-promotions.page.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  padding: 0;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 82vh;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 82vh;\n  margin-top: 8px;\n  border-left: 1px solid lightgray;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n.sideMenu-local {\n  text-align: center;\n  margin-bottom: 20px;\n  border-bottom: 1px solid var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));\n}\n\n.sideMenu-local p {\n  font-size: medium;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.sideMenu-st {\n  text-align: center;\n  margin-bottom: 20px;\n  border-bottom: 1px solid var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));\n}\n\n.sideMenu-st p {\n  font-size: medium;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.flex-label-local {\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-align: center;\n          align-items: center;\n  gap: 15px;\n  margin: 0 auto;\n}\n\n.toggle-btn-local {\n  margin-top: -5px;\n  margin-left: 6px;\n}\n\ninput:checked + .slider {\n  background-color: #1CBCB4;\n}\n\ninput:not(:checked) + .slider {\n  background-color: #1CBCB4;\n}\n\n.grp_class {\n  display: none;\n}\n\n.save-button {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n\n.customCard {\n  background-color: #fdd3df;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2hhdHNhcHAtcHJvbW90aW9ucy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcd2hhdHNhcHAtcHJvbW90aW9uc1xcd2hhdHNhcHAtcHJvbW90aW9ucy5wYWdlLnNjc3MiLCJzcmMvYXBwL3doYXRzYXBwLXByb21vdGlvbnMvd2hhdHNhcHAtcHJvbW90aW9ucy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFRSxVQUFBO0FDQUY7O0FERUE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7QUNDRjs7QURBRTtFQUNFLGdCQUFBO0FDRUo7O0FERUE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZ0NBQUE7QUNDRjs7QURBRTtFQUNFLGdCQUFBO0FDRUo7O0FERUE7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsOEhBQUE7QUNDRjs7QURBRTtFQUNFLGlCQUFBO0VBRUEsYUFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7S0FBQSxzQkFBQTtNQUFBLHFCQUFBO1VBQUEsaUJBQUE7QUNDSjs7QURHQTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSw4SEFBQTtBQ0FGOztBRENFO0VBQ0UsaUJBQUE7RUFFQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtLQUFBLHNCQUFBO01BQUEscUJBQUE7VUFBQSxpQkFBQTtBQ0FKOztBRElBO0VBQ0UsMkJBQUE7RUFBQSxvQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFFQSxTQUFBO0VBQ0EsY0FBQTtBQ0ZGOztBREtBO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtBQ0ZGOztBRE1BO0VBQ0UseUJBQUE7QUNIRjs7QURNQTtFQUNFLHlCQUFBO0FDSEY7O0FETUE7RUFDRSxhQUFBO0FDSEY7O0FETUE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0FDSEY7O0FETUE7RUFDRSx5QkFBQTtBQ0hGIiwiZmlsZSI6InNyYy9hcHAvd2hhdHNhcHAtcHJvbW90aW9ucy93aGF0c2FwcC1wcm9tb3Rpb25zLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluLWNvbnRhaW5lciB7XHJcbiAgLy8gd2lkdGg6IDEwMCU7XHJcbiAgcGFkZGluZzogMCBcclxufVxyXG4jc2Nyb2xsMSB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDgydmg7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxufVxyXG5cclxuI3Njcm9sbDIge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgaGVpZ2h0OiA4MnZoO1xyXG4gIG1hcmdpbi10b3A6IDhweDtcclxuICBib3JkZXItbGVmdDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcclxuICAmOmhvdmVyIHtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgfVxyXG59XHJcblxyXG4uc2lkZU1lbnUtbG9jYWwge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1pb24taXRlbS1ib3JkZXItY29sb3IsdmFyKC0taW9uLWJvcmRlci1jb2xvcix2YXIoLS1pb24tY29sb3Itc3RlcC0xNTAscmdiYSgwLDAsMCwwLjEzKSkpKTtcclxuICBwIHtcclxuICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xyXG4gICAgLy8gYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIG1hcmdpbjogOHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgfVxyXG59XHJcblxyXG4uc2lkZU1lbnUtc3Qge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1pb24taXRlbS1ib3JkZXItY29sb3IsdmFyKC0taW9uLWJvcmRlci1jb2xvcix2YXIoLS1pb24tY29sb3Itc3RlcC0xNTAscmdiYSgwLDAsMCwwLjEzKSkpKTtcclxuICBwIHtcclxuICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xyXG4gICAgLy8gYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIG1hcmdpbjogOHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgfVxyXG59XHJcblxyXG4uZmxleC1sYWJlbC1sb2NhbCB7XHJcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAvLyBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMTVweDtcclxuICBtYXJnaW46IDAgYXV0bztcclxufVxyXG5cclxuLnRvZ2dsZS1idG4tbG9jYWx7XHJcbiAgbWFyZ2luLXRvcDogLTVweDtcclxuICBtYXJnaW4tbGVmdDogNnB4O1xyXG4gIC8vIHRyYW5zZm9ybTogcm90YXRlWig5MGRlZyk7XHJcbn1cclxuXHJcbmlucHV0OmNoZWNrZWQgKyAuc2xpZGVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMUNCQ0I0O1xyXG59XHJcblxyXG5pbnB1dDpub3QoOmNoZWNrZWQpICsgLnNsaWRlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFDQkNCNDtcclxufVxyXG5cclxuLmdycF9jbGFzcyB7XHJcbiAgZGlzcGxheTogbm9uZVxyXG59XHJcblxyXG4uc2F2ZS1idXR0b24ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5jdXN0b21DYXJkIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmRkM2RmXHJcbn0iLCIubWFpbi1jb250YWluZXIge1xuICBwYWRkaW5nOiAwO1xufVxuXG4jc2Nyb2xsMSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogODJ2aDtcbn1cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDgydmg7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG4jc2Nyb2xsMjpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5zaWRlTWVudS1sb2NhbCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWlvbi1pdGVtLWJvcmRlci1jb2xvciwgdmFyKC0taW9uLWJvcmRlci1jb2xvciwgdmFyKC0taW9uLWNvbG9yLXN0ZXAtMTUwLCByZ2JhKDAsIDAsIDAsIDAuMTMpKSkpO1xufVxuLnNpZGVNZW51LWxvY2FsIHAge1xuICBmb250LXNpemU6IG1lZGl1bTtcbiAgcGFkZGluZzogMTBweDtcbiAgbWFyZ2luOiA4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG5cbi5zaWRlTWVudS1zdCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWlvbi1pdGVtLWJvcmRlci1jb2xvciwgdmFyKC0taW9uLWJvcmRlci1jb2xvciwgdmFyKC0taW9uLWNvbG9yLXN0ZXAtMTUwLCByZ2JhKDAsIDAsIDAsIDAuMTMpKSkpO1xufVxuLnNpZGVNZW51LXN0IHAge1xuICBmb250LXNpemU6IG1lZGl1bTtcbiAgcGFkZGluZzogMTBweDtcbiAgbWFyZ2luOiA4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG5cbi5mbGV4LWxhYmVsLWxvY2FsIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTVweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi50b2dnbGUtYnRuLWxvY2FsIHtcbiAgbWFyZ2luLXRvcDogLTVweDtcbiAgbWFyZ2luLWxlZnQ6IDZweDtcbn1cblxuaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMUNCQ0I0O1xufVxuXG5pbnB1dDpub3QoOmNoZWNrZWQpICsgLnNsaWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxQ0JDQjQ7XG59XG5cbi5ncnBfY2xhc3Mge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uc2F2ZS1idXR0b24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmN1c3RvbUNhcmQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmRkM2RmO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/whatsapp-promotions/whatsapp-promotions.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/whatsapp-promotions/whatsapp-promotions.page.ts ***!
  \*****************************************************************/
/*! exports provided: WhatsappPromotionsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsappPromotionsPage", function() { return WhatsappPromotionsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/user-groups/user-groups.service */ "./src/app/services/user-groups/user-groups.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _app_admin_users_modal_users_modal_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../app/admin/users-modal/users-modal.page */ "./src/app/admin/users-modal/users-modal.page.ts");
/* harmony import */ var _app_components_template_maker_template_maker_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../app/components/template-maker/template-maker.component */ "./src/app/components/template-maker/template-maker.component.ts");
// Whatsapp Broadcast Service
// Code Revision [ v1.5.2-alpha ]
// Status [ Working ]













var WhatsappPromotionsPage = /** @class */ (function () {
    function WhatsappPromotionsPage(userGroupsService, sharedService, http, configService, afs, modalController, toastController) {
        this.userGroupsService = userGroupsService;
        this.sharedService = sharedService;
        this.http = http;
        this.configService = configService;
        this.afs = afs;
        this.modalController = modalController;
        this.toastController = toastController;
        this.middlewareUrl = this.configService.environment.middleware ? this.configService.environment.middleware.url : 'https://us-central1-bwi-middleware.cloudfunctions.net';
        this.selectedTemplate = '';
        this.selectedService = '';
        this.allUsersPhoneNo = [];
        this.disableSave = true;
        this.availableCampaigns = [];
        this.selectedCampaign = '';
        this.currentCampaign = {
            param: ''
        };
        this.currentParam = '';
        this.selection = 'all';
        this.userGroups = [];
        this.isSelectAll = false;
        this.logs = false;
        this.logsArr = [];
        this.sentDate = '';
        this.serviceUsed = '';
        this.SentTo = '';
        this.twilioTemplateButton = 'Make';
        this.twilioParams = [];
        this.twilioEditName = '';
        this.twilioEditBody = '';
        this.twilioBody = '';
        this.twilioFormattedBody = '';
        this.twilioParamDesc = '';
        this.tempParam = '';
    }
    WhatsappPromotionsPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getGroups()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getAllUsers()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getLogs()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.sharedService.loading.dismiss()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WhatsappPromotionsPage.prototype.presentToastWithOptions = function (header, message, errorCode) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            mode: 'ios',
                            color: 'dark',
                            header: header,
                            message: message,
                            position: 'top',
                            duration: 2000,
                            buttons: [
                                {
                                    side: 'start',
                                    text: errorCode,
                                    handler: function () {
                                        console.log('Favorite clicked');
                                    }
                                }, {
                                    text: 'Done',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    WhatsappPromotionsPage.prototype.getGroups = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var grpData, i;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userGroupsService.getAllGroups()];
                    case 1:
                        grpData = _a.sent();
                        console.log('grpData', grpData);
                        for (i = 0; i < grpData.length; i++) {
                            this.userGroups.push(grpData[i]);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WhatsappPromotionsPage.prototype.getAllUsers = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var allUsers, i;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.selection == 'all')) return [3 /*break*/, 2];
                        allUsers = void 0;
                        return [4 /*yield*/, this.userGroupsService.getAllUsers()];
                    case 1:
                        allUsers = _a.sent();
                        console.log('allUsers : ', allUsers);
                        this.allUsersPhoneNo = [];
                        for (i = 0; i < allUsers.length; i++) {
                            if (allUsers[i].role === 'user') {
                                if (allUsers[i].phoneNo) {
                                    this.allUsersPhoneNo.push({
                                        'waNo': this.validatePhoneNo(allUsers[i].phoneNo)
                                    });
                                }
                            }
                        }
                        console.log('all users : ', this.allUsersPhoneNo);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    WhatsappPromotionsPage.prototype.grpCheck = function (option) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!option) return [3 /*break*/, 4];
                        if (!(option === 'all')) return [3 /*break*/, 1];
                        this.selection = option;
                        console.log('all : ', option);
                        this.getAllUsers();
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(option === 'singleUser')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.openUsersModal()];
                    case 2:
                        _a.sent();
                        this.selection = option;
                        console.log('singleUsers : ', option);
                        return [3 /*break*/, 4];
                    case 3:
                        if (option === 'groups') {
                            this.selection = option;
                            console.log('groups : ', option);
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WhatsappPromotionsPage.prototype.getServicesOptions = function (option) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var docData;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.availableCampaigns = [];
                        this.selectedCampaign = '';
                        console.log('current selection : ', option);
                        if (!option) {
                            this.disableSave = true;
                        }
                        return [4 /*yield*/, this.userGroupsService.getCampaigns(option)];
                    case 1:
                        docData = _a.sent();
                        if (!(option === 'aisensy' || option === 'interakt')) return [3 /*break*/, 4];
                        if (!!docData.campDetails.length) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.presentToastWithOptions('No Campaign / Template Found!', "No Campaigns / Template Found in " + option + " Integration", 'ERR-181')];
                    case 2:
                        _a.sent();
                        this.disableSave = true;
                        _a.label = 3;
                    case 3:
                        console.log('docData : ', docData);
                        this.availableCampaigns = docData.campDetails;
                        return [3 /*break*/, 5];
                    case 4:
                        if (option === 'twilio') {
                            console.log('docData : ', docData);
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    WhatsappPromotionsPage.prototype.templateMaker = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _app_components_template_maker_template_maker_component__WEBPACK_IMPORTED_MODULE_11__["TemplateMakerComponent"],
                            componentProps: {
                                templateEditName: this.twilioEditName,
                                templateEditBody: this.twilioEditBody,
                            },
                            cssClass: 'custom-template-maker',
                            backdropDismiss: true,
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        modal.onDidDismiss().then(function (res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            var i;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.twilioParams = [];
                                        this.twilioBody = '';
                                        console.dir(res.data);
                                        if (!(res.data && (res.data.templateName && res.data.templateName !== "") && (res.data.templateBody && res.data.templateBody !== "") && (res.data.templateParamCount && res.data.templateParamCount > 0))) return [3 /*break*/, 1];
                                        this.twilioEditName = res.data.templateName;
                                        this.twilioEditBody = res.data.templateBody;
                                        this.twilioTemplateButton = 'Edit';
                                        this.twilioBody = res.data.templateBody;
                                        for (i = 0; i < res.data.templateParamCount; i++) {
                                            this.twilioParams.push('');
                                            this.twilioParamDesc = "Enter Only " + res.data.templateParamCount + " param(s)!";
                                            this.tempParam = '';
                                            // this.disableSave = true
                                        }
                                        return [3 /*break*/, 3];
                                    case 1: return [4 /*yield*/, this.presentToastWithOptions('Invalid Param Format!', 'Minimum 1 param required.', 'ERR-192')];
                                    case 2:
                                        _a.sent();
                                        if (res.data) {
                                            this.twilioTemplateButton = 'Edit';
                                            this.twilioEditName = res.data.templateName;
                                            this.twilioEditBody = res.data.templateBody;
                                        }
                                        else {
                                            this.twilioTemplateButton = 'Make';
                                            this.twilioEditName = '';
                                            this.twilioEditBody = '';
                                        }
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    WhatsappPromotionsPage.prototype.getCampaignOptions = function (options) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var index;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                console.log('current campaign : ', options);
                this.selectedCampaign = options;
                index = this.availableCampaigns.findIndex(function (item) { return item.campaignName === _this.selectedCampaign; });
                this.currentCampaign = this.availableCampaigns[index];
                this.currentParam = '';
                if (!options) {
                    this.disableSave = true;
                }
                else {
                    this.disableSave = false;
                }
                return [2 /*return*/];
            });
        });
    };
    WhatsappPromotionsPage.prototype.getGroupOptions = function (options) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var selectedGroups, i, allUsers, i, _a, _b, finalArr, i;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _c.sent();
                        if (!(this.selection == 'groups')) return [3 /*break*/, 9];
                        selectedGroups = [];
                        for (i = 0; i < options.length; i++) {
                            selectedGroups.push(options[i]);
                        }
                        console.log('selectedGroups : ', selectedGroups);
                        allUsers = [];
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < selectedGroups.length)) return [3 /*break*/, 5];
                        console.log('fetch grp : ', selectedGroups[i]);
                        _b = (_a = allUsers).push;
                        return [4 /*yield*/, this.userGroupsService.getGroupUsers(selectedGroups[i])];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        console.log('allUsers : ', allUsers);
                        finalArr = [];
                        finalArr = this.sortGroupsToArray(allUsers);
                        if (!(finalArr.length === 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.presentToastWithOptions('No User(s) Found!', "No users found in this group", 'ERR-199')];
                    case 6:
                        _c.sent();
                        this.disableSave = true;
                        return [3 /*break*/, 8];
                    case 7:
                        this.disableSave = false;
                        _c.label = 8;
                    case 8:
                        console.log('finalArr : ', finalArr);
                        this.allUsersPhoneNo = [];
                        for (i = 0; i < finalArr.length; i++) {
                            if (finalArr[i].phoneNo) {
                                this.allUsersPhoneNo.push({
                                    'waNo': this.validatePhoneNo(finalArr[i].phoneNo)
                                });
                            }
                        }
                        console.log('all users groups : ', this.allUsersPhoneNo);
                        _c.label = 9;
                    case 9: return [4 /*yield*/, this.sharedService.loading.dismiss()];
                    case 10:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WhatsappPromotionsPage.prototype.sortGroupsToArray = function (grp) {
        var result = grp.reduce(function (r, e) { return (r.push.apply(r, e), r); }, []);
        return result;
    };
    WhatsappPromotionsPage.prototype.validatePhoneNo = function (phoneNo) {
        var finalNo = '';
        if (phoneNo.includes('+')) {
            finalNo = phoneNo.substring(phoneNo.indexOf('+') + 1);
            return finalNo.length == 12 ? finalNo : undefined;
        }
        else {
            return finalNo;
        }
    };
    WhatsappPromotionsPage.prototype.openUsersModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _app_admin_users_modal_users_modal_page__WEBPACK_IMPORTED_MODULE_10__["UsersModalPage"],
                            componentProps: {
                                alreadyAddedUsers: [],
                                groupDetails: {},
                            },
                            // cssClass: 'coupon-code-modal'
                            cssClass: 'custom-modal'
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            var i;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(res && res.data)) return [3 /*break*/, 3];
                                        console.log('res : ', res.data);
                                        if (!!res.data.length) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.presentToastWithOptions('No Users Selected!', "Please select at least one user", 'ERR-197')];
                                    case 1:
                                        _a.sent();
                                        this.disableSave = true;
                                        return [3 /*break*/, 3];
                                    case 2:
                                        console.log('here');
                                        this.allUsersPhoneNo = [];
                                        for (i = 0; i < res.data.length; i++) {
                                            if (res.data[i].phoneNo) {
                                                this.allUsersPhoneNo.push({
                                                    'waNo': this.validatePhoneNo(res.data[i].phoneNo)
                                                });
                                            }
                                        }
                                        console.log('all SU : ', this.allUsersPhoneNo);
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
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
    WhatsappPromotionsPage.prototype.getCampaignParams = function (params) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var str;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                str = params.replace(/\s+/g, '');
                this.currentParam = str;
                console.log('params : ', this.currentParam);
                this.currentCampaign.param = this.currentParam;
                console.log('current : ', this.currentCampaign);
                return [2 /*return*/];
            });
        });
    };
    WhatsappPromotionsPage.prototype.getTwilioParams = function (params) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var str, strLength, formattedStr, _i, strLength_1, char;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = params.replace(/\s+/g, '');
                        console.log('params : ', str);
                        strLength = str.split(',');
                        console.log('strLength : ', strLength.length);
                        this.disableSave = true;
                        if (!(strLength.length > this.twilioParams.length)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.presentToastWithOptions('Invalid Param Format!', "More than " + this.twilioParams.length + " param(s) not allowed.", 'ERR-191')];
                    case 1:
                        _a.sent();
                        this.tempParam = this.tempParam.slice(0, -1);
                        console.log('this.tempParam : ', this.tempParam);
                        this.disableSave = true;
                        return [3 /*break*/, 3];
                    case 2:
                        if (strLength.length == this.twilioParams.length) {
                            if (strLength[strLength.length - 1] !== '') {
                                console.log('twilioBody : ', this.twilioBody.replace(/[0-9]}}/g, ''));
                                console.log('str : ', strLength);
                                formattedStr = this.twilioBody.replace(/[0-9]}}/g, '');
                                for (_i = 0, strLength_1 = strLength; _i < strLength_1.length; _i++) {
                                    char = strLength_1[_i];
                                    formattedStr = formattedStr.replace('{{', char);
                                }
                                console.log('formattedStr : ', formattedStr);
                                this.twilioFormattedBody = formattedStr;
                                this.disableSave = false;
                            }
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WhatsappPromotionsPage.prototype.getSelection = function (selection) {
        if (selection) {
            if (selection === 'all') {
                return 'All Users';
            }
            if (selection === 'groups') {
                return 'Groups';
            }
            if (selection === 'singleUser') {
                return 'Custom Selected';
            }
        }
    };
    WhatsappPromotionsPage.prototype.getSelectedCampaign = function (service) {
        var _this = this;
        if ((service === 'aisensy') || (service === 'interakt')) {
            var index = this.availableCampaigns.findIndex(function (item) { return item.campaignName === _this.selectedCampaign; });
            console.log('index : ', index);
            return this.availableCampaigns[index];
        }
        else if (service === 'twilio') {
            return this.twilioFormattedBody;
        }
    };
    WhatsappPromotionsPage.prototype.saveSettings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var response, logResponse, logBody_1, apiBody;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _a.sent();
                        console.log(this.selectedService);
                        if (!this.selectedService) return [3 /*break*/, 9];
                        if (!(this.allUsersPhoneNo.length !== 0)) return [3 /*break*/, 8];
                        response = {}, logResponse = {};
                        logBody_1 = {
                            title: '',
                            time: '',
                            sendTo: '',
                            unix: 0
                        };
                        if (!this.selection) return [3 /*break*/, 8];
                        apiBody = {
                            projectId: src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].firebase.projectId,
                            selectedCampaign: this.getSelectedCampaign(this.selectedService),
                            allUsersNo: this.allUsersPhoneNo,
                            integrationCode: this.selectedService + '_promotion'
                        };
                        console.log('this.availableCampaigns: ' + JSON.stringify(this.availableCampaigns));
                        console.log('selectedCampaign: ' + this.selectedCampaign);
                        console.log("apiBody " + this.selection + " : ", apiBody);
                        return [4 /*yield*/, this.initBroadcastService(apiBody)];
                    case 2:
                        // !!! Broadcast Initializing
                        response = _a.sent();
                        if (!response.success) return [3 /*break*/, 8];
                        console.log('response : ' + JSON.stringify(response));
                        return [4 /*yield*/, this.presentToastWithOptions('Broadcast Success!', "Message broadcasted successfully using " + this.selectedService, 'SCD-121')];
                    case 3:
                        _a.sent();
                        response = {};
                        // !!! Save Log
                        logBody_1.title = this.selectedService;
                        logBody_1.time = new Date().toLocaleString();
                        logBody_1.sendTo = this.getSelection(this.selection);
                        logBody_1.unix = Math.round((new Date()).getTime() / 1000);
                        console.log("logBody " + this.selection + " : ", logBody_1);
                        return [4 /*yield*/, this.addLogs(logBody_1)];
                    case 4:
                        logResponse = _a.sent();
                        if (!logResponse.success) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.presentToastWithOptions('Log Saved!', "Message log saved successfully.", 'SCD-122')];
                    case 5:
                        _a.sent();
                        Object.getOwnPropertyNames(logBody_1).forEach(function (prop) {
                            logBody_1[prop] = '';
                        });
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.presentToastWithOptions('Log Unsaved!', "Message log not saved.", 'ERR-195')];
                    case 7:
                        _a.sent();
                        Object.getOwnPropertyNames(logBody_1).forEach(function (prop) {
                            logBody_1[prop] = '';
                        });
                        _a.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, this.presentToastWithOptions('No Service Selected!', "Please select a broadcast service..", 'ERR-180')];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [4 /*yield*/, this.sharedService.loading.dismiss()];
                    case 12:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WhatsappPromotionsPage.prototype.initBroadcastService = function (body) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            _this.http.post(_this.middlewareUrl + '/promotion-broadcastPromotion', body)
                                .subscribe(function (response) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                    console.log('response : ', response);
                                    resolve(response);
                                    return [2 /*return*/];
                                });
                            }); }, function (error) {
                                console.log('error : ', error);
                                resolve({
                                    success: false,
                                    data: error
                                });
                            });
                        }
                        catch (error) {
                            console.log('catch error : ', error);
                            resolve({
                                success: false,
                                data: error
                            });
                        }
                    })];
            });
        });
    };
    WhatsappPromotionsPage.prototype.addLogs = function (body) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var error_1;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    return [4 /*yield*/, this.afs.collection('integrations').doc('logs').collection('whatsapp_logs').add(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, body))];
                                case 1:
                                    _a.sent();
                                    resolve({
                                        success: true
                                    });
                                    return [4 /*yield*/, this.getLogs()];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_1 = _a.sent();
                                    console.log('error : ', error_1);
                                    resolve({
                                        success: false
                                    });
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    WhatsappPromotionsPage.prototype.getLogs = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var snapshot, sortedUnix, error_2;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.afs.collection('integrations').doc('logs').collection('whatsapp_logs').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])()).toPromise()];
                                case 1:
                                    snapshot = _a.sent();
                                    // console.log('snapshot : ', snapshot);
                                    if (snapshot.length) {
                                        this.logs = true;
                                        sortedUnix = snapshot.sort(function (a, b) { return (b.unix) - (a.unix); });
                                        this.logsArr = sortedUnix;
                                        // console.log('sorted : ', sortedUnix);
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_2 = _a.sent();
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    WhatsappPromotionsPage.ctorParameters = function () { return [
        { type: src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_2__["UserGroupsService"] },
        { type: _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_7__["ConfigService"] },
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_8__["AngularFirestore"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"] }
    ]; };
    WhatsappPromotionsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-whatsapp-promotions',
            template: __webpack_require__(/*! raw-loader!./whatsapp-promotions.page.html */ "./node_modules/raw-loader/index.js!./src/app/whatsapp-promotions/whatsapp-promotions.page.html"),
            styles: [__webpack_require__(/*! ./whatsapp-promotions.page.scss */ "./src/app/whatsapp-promotions/whatsapp-promotions.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_2__["UserGroupsService"],
            _services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"],
            src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_7__["ConfigService"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_8__["AngularFirestore"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"]])
    ], WhatsappPromotionsPage);
    return WhatsappPromotionsPage;
}());



/***/ })

}]);
//# sourceMappingURL=whatsapp-promotions-whatsapp-promotions-module-es5.js.map