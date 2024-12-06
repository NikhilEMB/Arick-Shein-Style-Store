(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-whatsapp-whatsapp-broadcast-whatsapp-broadcast-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/whatsapp/whatsapp-broadcast/whatsapp-broadcast.page.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/whatsapp/whatsapp-broadcast/whatsapp-broadcast.page.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\">\r\n      <img src=\"../../../../assets/img/shop-logo.png\">\r\n    </div>\r\n    <ion-title>Whatsapp Broadcast</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=\"3\">\r\n          <ion-button expand='block' (click)=\"addTemplate()\">Add New Template</ion-button>\r\n\r\n          <input class=\"searchInput\" placeholder=\"Search Template...\" *ngIf=\"templates?.length\" [(ngModel)]=\"searchTemplate\" type=\"text\">\r\n\r\n          <div id=\"scroll1\">\r\n            <div class=\"groupWrapper\">\r\n              <div class=\"groupItem\" \r\n                  [ngClass]=\"activeTile === i ? 'tile-bg-active' : 'tile-bg-inactive'\" \r\n                  *ngFor=\"let template of templates | filter: searchTemplate; index as i\" \r\n                  (click)=\"getTemplateDetails(i)\">\r\n                <div class=\"itemFlex\">\r\n                  <p class=\"groupName\">{{template.name}}</p>\r\n                </div>\r\n                <b><span class=\"groupDate\">Status: <span [ngClass]=\"{green: template.status == 'approved', red: template.status == 'rejected'}\">{{template.status || 'Pending' | uppercase }}</span></span></b>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col size=\"6\" id=\"scroll2\" *ngIf=\"selectedTemplate?.id\">\r\n          <div class=\"groupDetails-container\">\r\n            <h4 class=\"displayTitle\">{{selectedTemplate.name | titlecase}}</h4>\r\n            <!-- <p class=\"groupDate t-a-c\">Created On: {{selectedTemplate.createdAt.toDate() | date}}</p> -->\r\n            <div class=\"groupDetail\">\r\n  \r\n              <div *ngIf=\"showLoader; else showUsers\" class=\"spinner\">\r\n                <ion-spinner color=\"primary\"></ion-spinner>\r\n              </div>\r\n              <ng-template #showUsers>\r\n                <div class=\"section-content\">\r\n                  <div>\r\n                    <ion-list lines=\"none\" class=\"option-list\">\r\n                      <ion-radio-group [value]=\"userType\" (ionChange)=\"changeUserType($event)\">\r\n                      <ion-item>\r\n                        <ion-label>Groups</ion-label>\r\n                        <ion-radio value=\"groups\" slot=\"start\"></ion-radio>\r\n                      </ion-item>\r\n                      <ion-item>\r\n                        <ion-label>All Users</ion-label>\r\n                        <ion-radio value=\"allUsers\" slot=\"start\"></ion-radio>\r\n                      </ion-item>\r\n                    </ion-radio-group>\r\n                    </ion-list>\r\n                  </div>\r\n                  <div class=\"account-type-input\" *ngIf=\"userType == 'groups'\">\r\n                    <p>Select Groups</p>\r\n                    <div class=\"itemFlex\">\r\n                      <ion-select [(ngModel)]=\"selectedGroups\" multiple placeholder=\"Select Groups\" class=\"select-box\">\r\n                        <ng-container *ngFor=\"let group of groups\">\r\n                          <ion-select-option [value]=\"group.id\">{{group.name}}</ion-select-option>\r\n                        </ng-container>\r\n                      </ion-select>\r\n                    </div>\r\n                  </div>\r\n                  <br>\r\n                  <ion-button (click)=\"broadcast()\">Broadcast</ion-button>\r\n                  <br>\r\n                  <ion-text color=\"danger\">\r\n                    <p>Note: Unverified businesses are limited to Total {{accountDetails?.insights?.broadcastLimit || 50}} business-initiated conversations(Template) in a rolling 24 hour period.</p>\r\n                  </ion-text>\r\n                </div>\r\n                \r\n                <ion-col size=\"12\">\r\n                  <h4>Template Details - </h4>\r\n                  <p><b>Template Body : </b>{{selectedTemplate?.components[0].type.toLowerCase() == 'body' ? selectedTemplate?.components[0].text : selectedTemplate?.components[1].text}}</p>\r\n                  <br>\r\n                  <p *ngIf=\"selectedTemplate.reason && selectedTemplate.status == 'rejected'\"><b>Rejected Reason -</b> {{selectedTemplate.reason}}</p>\r\n                </ion-col>\r\n                \r\n                <!-- <ion-col size=\"12\">\r\n                  <h3>Template History</h3>\r\n                  <p></p>\r\n                </ion-col> -->\r\n              </ng-template>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col size=\"3\" id=\"scroll2\">\r\n          <div class=\"groupDetails-container\">\r\n            <p style=\"text-align:center; font-size: medium; font-weight: bold;\">\r\n              Recent Logs\r\n            </p>\r\n            <ng-container *ngIf=\"logs\">\r\n              <div>\r\n                <ion-card mode *ngFor=\"let log of logs; let i = index\" class=\"customCard\">\r\n                  <ion-card-header>\r\n                    <!-- <ion-card-subtitle style=\"text-transform: capitalize;\">{{log.title}}</ion-card-subtitle> -->\r\n                    <ion-card-title><b>Broadcast Time -</b> {{log.createdAt.toDate() | date: 'medium'}}</ion-card-title>\r\n                    <ion-card-title><b>Broadcasted To -</b> {{log.deliveredTo || '0'}}/{{log.totalUsers}}</ion-card-title>\r\n                    <ion-card-title *ngIf=\"log.status?.msg\"><b>Msg -</b> {{log.status?.msg}}</ion-card-title>\r\n                    <ion-card-title *ngIf=\"log.status?.link\"><b>Report Link -</b> <a href=\"{{log.status?.link}}\" target=\"_blank\">Report</a></ion-card-title>\r\n                  </ion-card-header>\r\n                </ion-card>\r\n              </div>\r\n            </ng-container> \r\n            <ng-container *ngIf=\"!logs || !logs.length\">\r\n              <p style=\"text-align:center; font-size: medium; margin-top: 20px;\">No Logs available yet!</p>\r\n            </ng-container>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/whatsapp/whatsapp-broadcast/whatsapp-broadcast.module.ts":
/*!********************************************************************************!*\
  !*** ./src/app/admin/whatsapp/whatsapp-broadcast/whatsapp-broadcast.module.ts ***!
  \********************************************************************************/
/*! exports provided: WhatsappBroadcastPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsappBroadcastPageModule", function() { return WhatsappBroadcastPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _whatsapp_broadcast_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./whatsapp-broadcast.page */ "./src/app/admin/whatsapp/whatsapp-broadcast/whatsapp-broadcast.page.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");








var routes = [
    {
        path: '',
        component: _whatsapp_broadcast_page__WEBPACK_IMPORTED_MODULE_6__["WhatsappBroadcastPage"]
    }
];
var WhatsappBroadcastPageModule = /** @class */ (function () {
    function WhatsappBroadcastPageModule() {
    }
    WhatsappBroadcastPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__["Ng2SearchPipeModule"]
            ],
            declarations: [_whatsapp_broadcast_page__WEBPACK_IMPORTED_MODULE_6__["WhatsappBroadcastPage"]]
        })
    ], WhatsappBroadcastPageModule);
    return WhatsappBroadcastPageModule;
}());



/***/ }),

/***/ "./src/app/admin/whatsapp/whatsapp-broadcast/whatsapp-broadcast.page.scss":
/*!********************************************************************************!*\
  !*** ./src/app/admin/whatsapp/whatsapp-broadcast/whatsapp-broadcast.page.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  width: 100%;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 74vh;\n  margin-top: 1rem;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  height: 82vh;\n  margin-top: 8px;\n  border-left: 1px solid lightgray;\n}\n\n.groupWrapper .groupItem {\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  padding: 8px;\n  margin-bottom: 8px;\n  cursor: pointer;\n}\n\n.groupWrapper .groupItem:hover {\n  box-shadow: 0 2px 5px #ccc;\n  background: var(--ion-color-light);\n}\n\n.groupWrapper .groupItem .groupName {\n  font-size: 16px;\n  font-weight: 600;\n  text-transform: capitalize;\n}\n\n.groupWrapper .groupItem .groupSize {\n  font-size: 14px;\n}\n\n.groupDate {\n  color: #606060;\n  font-size: 12px;\n}\n\n.displayTitle {\n  text-align: center;\n  font-weight: 600;\n  margin-top: 0;\n}\n\n.groupDetail {\n  padding: 8px;\n  height: 100%;\n}\n\n.searchInput {\n  height: 38px;\n  width: 100%;\n  padding: 6px;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  margin: 10px 0px;\n}\n\n.itemFlex {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-bottom: 0.5rem;\n}\n\n.select-box {\n  border: 1px solid #ccc;\n  border-radius: 25px;\n  width: 80%;\n}\n\n.groupItemActive {\n  background-color: var(--ion-color-categories-background);\n}\n\n.groupDetails-container {\n  overflow-y: scroll;\n  height: 90vh;\n}\n\n.spinner {\n  position: absolute;\n}\n\n.section-content ion-list.option-list ion-radio-group {\n  display: -webkit-box;\n  display: flex;\n}\n\n.section-content ion-list.option-list ion-radio-group ion-item {\n  --padding-start:0;\n  width: 50%;\n}\n\n.green {\n  color: var(--ion-color-success);\n}\n\n.red {\n  color: var(--ion-color-danger);\n}\n\n.customCard {\n  --background: #ccc ;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1,\n#scroll2,\n.tableScroll {\n    height: 92vh;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vd2hhdHNhcHAvd2hhdHNhcHAtYnJvYWRjYXN0L0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcd2hhdHNhcHBcXHdoYXRzYXBwLWJyb2FkY2FzdFxcd2hhdHNhcHAtYnJvYWRjYXN0LnBhZ2Uuc2NzcyIsInNyYy9hcHAvYWRtaW4vd2hhdHNhcHAvd2hhdHNhcHAtYnJvYWRjYXN0L3doYXRzYXBwLWJyb2FkY2FzdC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0NGOztBREFFO0VBQ0UsZ0JBQUE7QUNFSjs7QURFQTtFQUVFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZ0NBQUE7QUNBRjs7QURRRTtFQUNFLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FDTEo7O0FETUk7RUFDRSwwQkFBQTtFQUNBLGtDQUFBO0FDSk47O0FETUk7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSwwQkFBQTtBQ0pOOztBRE1JO0VBQ0UsZUFBQTtBQ0pOOztBRFNBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7QUNORjs7QURTQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0FDTkY7O0FEU0E7RUFDRSxZQUFBO0VBQ0EsWUFBQTtBQ05GOztBRFNBO0VBQ0UsWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FDTkY7O0FEU0E7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHFCQUFBO0FDTkY7O0FEUUE7RUFDRSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsVUFBQTtBQ0xGOztBRFFBO0VBQ0Usd0RBQUE7QUNMRjs7QURRQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtBQ0xGOztBRFFBO0VBQ0Usa0JBQUE7QUNMRjs7QURRQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtBQ0xGOztBRE1FO0VBQ0ksaUJBQUE7RUFDQSxVQUFBO0FDSk47O0FET0E7RUFBUSwrQkFBQTtBQ0hSOztBRElBO0VBQU0sOEJBQUE7QUNBTjs7QURFQTtFQUNBLG1CQUFBO0FDQ0E7O0FERUE7RUFDRTs7O0lBR0UsWUFBQTtFQ0NGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi93aGF0c2FwcC93aGF0c2FwcC1icm9hZGNhc3Qvd2hhdHNhcHAtYnJvYWRjYXN0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluLWNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbiNzY3JvbGwxIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogNzR2aDtcclxuICBtYXJnaW4tdG9wOiAxcmVtO1xyXG4gICY6aG92ZXIge1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICB9XHJcbn1cclxuXHJcbiNzY3JvbGwyIHtcclxuICAvLyBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogODJ2aDtcclxuICBtYXJnaW4tdG9wOiA4cHg7XHJcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgLy8gJjpob3ZlciB7XHJcbiAgLy8gICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIC8vIH1cclxufVxyXG5cclxuLmdyb3VwV3JhcHBlciB7XHJcbiAgLy8gYm9yZGVyOiAxcHggc29saWQgIzAwMDtcclxuICAuZ3JvdXBJdGVtIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgYm94LXNoYWRvdzogMCAycHggNXB4ICNjY2M7XHJcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XHJcbiAgICB9XHJcbiAgICAuZ3JvdXBOYW1lIHtcclxuICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICAgIH1cclxuICAgIC5ncm91cFNpemUge1xyXG4gICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uZ3JvdXBEYXRlIHtcclxuICBjb2xvcjogIzYwNjA2MDtcclxuICBmb250LXNpemU6IDEycHg7XHJcbn1cclxuXHJcbi5kaXNwbGF5VGl0bGUge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIG1hcmdpbi10b3A6IDA7XHJcbn1cclxuXHJcbi5ncm91cERldGFpbCB7XHJcbiAgcGFkZGluZzogOHB4O1xyXG4gIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuLnNlYXJjaElucHV0IHtcclxuICBoZWlnaHQ6IDM4cHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgcGFkZGluZzogNnB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIG1hcmdpbjogMTBweCAwcHg7XHJcbn1cclxuXHJcbi5pdGVtRmxleCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcbn1cclxuLnNlbGVjdC1ib3h7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBib3JkZXItcmFkaXVzOiAyNXB4O1xyXG4gIHdpZHRoOiA4MCU7XHJcbn1cclxuXHJcbi5ncm91cEl0ZW1BY3RpdmUge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1jYXRlZ29yaWVzLWJhY2tncm91bmQpO1xyXG59XHJcblxyXG4uZ3JvdXBEZXRhaWxzLWNvbnRhaW5lcntcclxuICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcbiAgaGVpZ2h0OiA5MHZoO1xyXG59XHJcblxyXG4uc3Bpbm5lcntcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbn1cclxuXHJcbi5zZWN0aW9uLWNvbnRlbnQgaW9uLWxpc3Qub3B0aW9uLWxpc3QgaW9uLXJhZGlvLWdyb3VwIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGlvbi1pdGVte1xyXG4gICAgICAtLXBhZGRpbmctc3RhcnQ6MDtcclxuICAgICAgd2lkdGg6IDUwJTtcclxuICB9XHJcbn1cclxuLmdyZWVueyBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpfVxyXG4ucmVkeyBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcil9XHJcblxyXG4uY3VzdG9tQ2FyZHtcclxuLS1iYWNrZ3JvdW5kOiAjY2NjXHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xyXG4gICNzY3JvbGwxLFxyXG4gICNzY3JvbGwyLFxyXG4gIC50YWJsZVNjcm9sbCB7XHJcbiAgICBoZWlnaHQ6IDkydmg7XHJcbiAgfVxyXG59XHJcbiIsIi5tYWluLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4jc2Nyb2xsMSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogNzR2aDtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbn1cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBoZWlnaHQ6IDgydmg7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbi5ncm91cFdyYXBwZXIgLmdyb3VwSXRlbSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogOHB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5ncm91cFdyYXBwZXIgLmdyb3VwSXRlbTpob3ZlciB7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDVweCAjY2NjO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xufVxuLmdyb3VwV3JhcHBlciAuZ3JvdXBJdGVtIC5ncm91cE5hbWUge1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xufVxuLmdyb3VwV3JhcHBlciAuZ3JvdXBJdGVtIC5ncm91cFNpemUge1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5ncm91cERhdGUge1xuICBjb2xvcjogIzYwNjA2MDtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuXG4uZGlzcGxheVRpdGxlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXdlaWdodDogNjAwO1xuICBtYXJnaW4tdG9wOiAwO1xufVxuXG4uZ3JvdXBEZXRhaWwge1xuICBwYWRkaW5nOiA4cHg7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLnNlYXJjaElucHV0IHtcbiAgaGVpZ2h0OiAzOHB4O1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogNnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIG1hcmdpbjogMTBweCAwcHg7XG59XG5cbi5pdGVtRmxleCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xufVxuXG4uc2VsZWN0LWJveCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gIHdpZHRoOiA4MCU7XG59XG5cbi5ncm91cEl0ZW1BY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItY2F0ZWdvcmllcy1iYWNrZ3JvdW5kKTtcbn1cblxuLmdyb3VwRGV0YWlscy1jb250YWluZXIge1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gIGhlaWdodDogOTB2aDtcbn1cblxuLnNwaW5uZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbi5zZWN0aW9uLWNvbnRlbnQgaW9uLWxpc3Qub3B0aW9uLWxpc3QgaW9uLXJhZGlvLWdyb3VwIHtcbiAgZGlzcGxheTogZmxleDtcbn1cbi5zZWN0aW9uLWNvbnRlbnQgaW9uLWxpc3Qub3B0aW9uLWxpc3QgaW9uLXJhZGlvLWdyb3VwIGlvbi1pdGVtIHtcbiAgLS1wYWRkaW5nLXN0YXJ0OjA7XG4gIHdpZHRoOiA1MCU7XG59XG5cbi5ncmVlbiB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG59XG5cbi5yZWQge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG59XG5cbi5jdXN0b21DYXJkIHtcbiAgLS1iYWNrZ3JvdW5kOiAjY2NjIDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xuICAjc2Nyb2xsMSxcbiNzY3JvbGwyLFxuLnRhYmxlU2Nyb2xsIHtcbiAgICBoZWlnaHQ6IDkydmg7XG4gIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/whatsapp/whatsapp-broadcast/whatsapp-broadcast.page.ts":
/*!******************************************************************************!*\
  !*** ./src/app/admin/whatsapp/whatsapp-broadcast/whatsapp-broadcast.page.ts ***!
  \******************************************************************************/
/*! exports provided: WhatsappBroadcastPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhatsappBroadcastPage", function() { return WhatsappBroadcastPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/user-groups/user-groups.service */ "./src/app/services/user-groups/user-groups.service.ts");
/* harmony import */ var src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/whatsapp-dashboard/whatsapp-dashboard.service */ "./src/app/services/whatsapp-dashboard/whatsapp-dashboard.service.ts");






var WhatsappBroadcastPage = /** @class */ (function () {
    function WhatsappBroadcastPage(sharedService, whatsappService, userGroupsService, router) {
        this.sharedService = sharedService;
        this.whatsappService = whatsappService;
        this.userGroupsService = userGroupsService;
        this.router = router;
        this.showLoader = true;
        this.templates = [];
        this.userType = 'groups';
        this.selectedGroups = [];
        this.logs = [];
    }
    WhatsappBroadcastPage.prototype.ngOnInit = function () { };
    WhatsappBroadcastPage.prototype.ionViewWillEnter = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.getAllTemplates();
                        this.getAllGroups();
                        _a = this;
                        return [4 /*yield*/, this.whatsappService.getWhatsappCredentials()];
                    case 1:
                        _a.accountDetails = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WhatsappBroadcastPage.prototype.getLastBroadcastDetails = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var lastBroadcast, doc, todaysDay, lastDate, hours, hoursLimit;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.whatsappService.getLastBroadcastDetails()];
                    case 1:
                        lastBroadcast = _a.sent();
                        doc = lastBroadcast[0];
                        console.log('doc:', doc);
                        if (lastBroadcast && lastBroadcast.length) {
                            todaysDay = new Date().getTime();
                            lastDate = doc.createdAt.toDate().getTime();
                            console.log(todaysDay, " ", lastDate);
                            hours = (todaysDay - lastDate) / 36e5;
                            console.log('hours:', hours);
                            hoursLimit = 24;
                            console.log('hoursLimit:', hoursLimit);
                            if (hours < hoursLimit) {
                                this.sharedService.presentAlert("Please Wait for " + (hoursLimit - hours).toFixed(1) + " hours to broadcast again");
                                return [2 /*return*/, false];
                            }
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    WhatsappBroadcastPage.prototype.changeUserType = function (e) {
        this.userType = e.target.value;
    };
    WhatsappBroadcastPage.prototype.getAllTemplates = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var templatesWithId;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.whatsappService.getAllTemplates()];
                    case 1:
                        templatesWithId = _a.sent();
                        if (templatesWithId) {
                            this.templates = templatesWithId;
                            this.getTemplateDetails(0);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WhatsappBroadcastPage.prototype.getTemplateDetails = function (templateIndex) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.whatsappService.broadcastLogsSub) {
                            this.whatsappService.broadcastLogsSub.unsubscribe();
                        }
                        this.activeTile = templateIndex;
                        this.selectedTemplate = this.templates[templateIndex];
                        console.log('this.selectedTemplate:', this.selectedTemplate);
                        this.showLoader = false;
                        this.logs = [];
                        _a = this;
                        return [4 /*yield*/, this.whatsappService.getBroadcastLogs(this.selectedTemplate.id)];
                    case 1:
                        _a.logs = _b.sent();
                        this.whatsappService.broadcastLogs.subscribe(function (logs) {
                            _this.logs = logs;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    WhatsappBroadcastPage.prototype.getAllGroups = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var groupsWithId;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userGroupsService.getAllGroups()];
                    case 1:
                        groupsWithId = _a.sent();
                        if (groupsWithId) {
                            this.groups = groupsWithId;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WhatsappBroadcastPage.prototype.addTemplate = function () {
        var navigationExtras = {
            state: {
                allTemplates: this.templates
            }
        };
        this.router.navigate(['add-whatsapp-template'], navigationExtras);
    };
    WhatsappBroadcastPage.prototype.broadcast = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var success;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // const permission = await this.getLastBroadcastDetails();
                        // if (!permission) {
                        //   return;
                        // }
                        if (this.selectedTemplate.status != 'approved') {
                            this.sharedService.presentAlert("Templates with " + (this.selectedTemplate.status ? this.selectedTemplate.status.toUpperCase() : 'PENDING') + " status are not allowed to broadcast.");
                            return [2 /*return*/];
                        }
                        if (this.userType == 'groups' && this.selectedGroups.length == 0) {
                            this.sharedService.presentAlert('Group List cannot be empty, please select atleast one group.');
                            return [2 /*return*/];
                        }
                        if (this.accountDetails.insights && this.accountDetails.insights.creditsUsed >= this.accountDetails.insights.chatLimit) {
                            this.sharedService.presentAlert('You have reached your free limit for whatsapp, kindly upgrade your plan to use the services.');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.whatsappService.doBroadcast({ userType: this.userType, groups: this.selectedGroups, templateName: this.selectedTemplate.id })];
                    case 2:
                        success = _a.sent();
                        if (this.sharedService.loading) {
                            this.sharedService.loading.dismiss();
                        }
                        if (success) {
                            this.sharedService.presentAlert('Broadcast request sent Successfully.');
                        }
                        else {
                            this.sharedService.presentAlert('Something went wrong. Please try again later.');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WhatsappBroadcastPage.prototype.ionViewWillLeave = function () {
        this.whatsappService.broadcastLogsSub.unsubscribe();
    };
    WhatsappBroadcastPage.ctorParameters = function () { return [
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"] },
        { type: src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_5__["WhatsappDashboardService"] },
        { type: src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_4__["UserGroupsService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
    ]; };
    WhatsappBroadcastPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-whatsapp-broadcast',
            template: __webpack_require__(/*! raw-loader!./whatsapp-broadcast.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/whatsapp/whatsapp-broadcast/whatsapp-broadcast.page.html"),
            styles: [__webpack_require__(/*! ./whatsapp-broadcast.page.scss */ "./src/app/admin/whatsapp/whatsapp-broadcast/whatsapp-broadcast.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"], src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_5__["WhatsappDashboardService"],
            src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_4__["UserGroupsService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], WhatsappBroadcastPage);
    return WhatsappBroadcastPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-whatsapp-whatsapp-broadcast-whatsapp-broadcast-module-es5.js.map