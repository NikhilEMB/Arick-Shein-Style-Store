(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-whatsapp-add-whatsapp-template-add-whatsapp-template-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/whatsapp/add-whatsapp-template/add-whatsapp-template.page.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/whatsapp/add-whatsapp-template/add-whatsapp-template.page.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\">\r\n      <img src=\"../../../../assets/img/shop-logo.png\">\r\n    </div>\r\n    <ion-title>Create Template</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs>\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button (click)=\"templateType = 'basic'\">\r\n      <ion-label>Basic Template</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button (click)=\"templateType = 'advance'\">\r\n      <ion-label>Advance Template</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <super-tabs-container>\r\n    <super-tab>\r\n      <ion-content>\r\n      <div class=\"main-container\">\r\n        <ion-grid>\r\n          <ion-row>\r\n            <ion-col size=\"6\">\r\n              <div class=\"input-wrap\">\r\n                <ion-label>Template Name<span class=\"red\">*</span></ion-label>\r\n                <ion-input class=\"form-input\" [(ngModel)]=\"templateDetails.name\"></ion-input>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"6\">\r\n              <div class=\"input-wrap\">\r\n                <ion-label>Category<span class=\"red\">*</span></ion-label>\r\n                <select class=\"form-input\" [(ngModel)]=\"templateDetails.category\" interface=\"popover\"\r\n                  style=\"width: 100%; padding: 9px;\">\r\n                  <option value=\"utility\">Utility</option>\r\n                  <option value=\"marketing\">Marketing</option>\r\n                </select>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"12\">\r\n              <div class=\"input-wrap\">\r\n                <ion-label>Template Body (Max 1024 characters)<span class=\"red\">*</span></ion-label>\r\n                <ion-textarea rows=\"6\" type=\"text\" maxlength=\"1024\" class=\"form-input\" [(ngModel)]=\"templateDetails.components[0].text\"></ion-textarea>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"12\">\r\n              <ion-text color=\"danger\">\r\n                <p>Note: Once you have created your template it will get submit for approval to whatsapp. It can take up to 24 hours for an approval decision to be made by Whatsapp.</p>\r\n              </ion-text>\r\n            </ion-col>\r\n    \r\n          </ion-row>\r\n        </ion-grid>\r\n      </div>\r\n    \r\n    </ion-content>\r\n    </super-tab>\r\n\r\n    <!-- Advance Template -->\r\n    <super-tab>\r\n      <ion-content>\r\n      <div class=\"main-container\" *ngIf=\"!paidPlanNote.length\">\r\n        <ion-grid>\r\n          <ion-row>\r\n            <ion-col size=\"6\">\r\n              <div class=\"input-wrap\">\r\n                <ion-label>Template Name<span class=\"red\">*</span></ion-label>\r\n                <ion-input class=\"form-input\" [(ngModel)]=\"advanceTemplateDetails.name\"></ion-input>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"6\">\r\n              <div class=\"input-wrap\">\r\n                <ion-label>Category<span class=\"red\">*</span></ion-label>\r\n                <select class=\"form-input\" [(ngModel)]=\"advanceTemplateDetails.category\" interface=\"popover\"\r\n                  style=\"width: 100%; padding: 9px;\">\r\n                  <option value=\"utility\">Utility</option>\r\n                  <option value=\"marketing\">Marketing</option>\r\n                </select>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"6\">\r\n              <div class=\"input-wrap\">\r\n                <ion-label>Header (Optional)</ion-label>\r\n                <select class=\"form-input\" [(ngModel)]=\"headerType\" interface=\"popover\" style=\"width: 100%; padding: 9px;\">\r\n                  <option value=\"none\">None</option>\r\n                  <option value=\"text\">Text</option>\r\n                  <option value=\"media\">Media</option>\r\n                </select>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"6\" *ngIf=\"headerType == 'text'\">\r\n              <div class=\"input-wrap\">\r\n                <ion-label>Header Text</ion-label>\r\n                <ion-input class=\"form-input\" [(ngModel)]=\"advanceTemplateDetails.components[0].text\"></ion-input>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"12\" *ngIf=\"headerType == 'media'\">\r\n                <ion-list lines=\"none\" class=\"option-list\">\r\n                  <ion-radio-group [(ngModel)]=\"advanceTemplateDetails.components[0].format\" (ionChange)=\"changeHeaderMediaType($event)\">\r\n                  <ion-item>\r\n                    <ion-label>Image</ion-label>\r\n                    <ion-radio value=\"image\" slot=\"start\"></ion-radio>\r\n                  </ion-item>\r\n                  <ion-item>\r\n                    <ion-label>Video</ion-label>\r\n                    <ion-radio value=\"video\" slot=\"start\"></ion-radio>\r\n                  </ion-item>\r\n                  <ion-item>\r\n                    <ion-label>Document</ion-label>\r\n                    <ion-radio value=\"document\" slot=\"start\"></ion-radio>\r\n                  </ion-item>\r\n                </ion-radio-group>\r\n                </ion-list>\r\n            </ion-col>\r\n            <ion-col size=\"12\" *ngIf=\"headerType=='media'\">\r\n              <ion-row class=\"ion-justify-content-center\" style=\"align-items: center;\">\r\n                <div class=\"upload-btn-wrapper\" style=\"margin-top: 8px; margin-right: 10px;\" *ngIf=\"advanceTemplateDetails.components[0].format == 'image' || advanceTemplateDetails.components[0].format == 'video' || advanceTemplateDetails.components[0].format == 'document'\">\r\n                <button class=\"upload-btn btn-1 i-start\" style=\"margin-right: 0px;\"> <i\r\n                    class=\"flaticon-null-16\"></i>Upload</button>\r\n                    <ng-container *ngIf=\"advanceTemplateDetails.components[0].format == 'image'\">\r\n                      <input type=\"file\" name=\"myfile\" (change)=\"uploadMedia($event.target.files, advanceTemplateDetails.components[0].format)\"\r\n                        accept=\"image/*\" />\r\n                    </ng-container>\r\n                    <ng-container *ngIf=\"advanceTemplateDetails.components[0].format == 'video'\">\r\n                      <input type=\"file\" name=\"myfile\" (change)=\"uploadMedia($event.target.files, advanceTemplateDetails.components[0].format)\"\r\n                        accept=\"video/*\" />\r\n                    </ng-container>\r\n                    <ng-container *ngIf=\"advanceTemplateDetails.components[0].format == 'document'\">\r\n                      <input type=\"file\" name=\"myfile\" (change)=\"uploadMedia($event.target.files, advanceTemplateDetails.components[0].format)\"\r\n                        accept=\"application/pdf\" />\r\n                    </ng-container>\r\n                </div>\r\n                <p *ngIf=\"uploadedFileDetails?.name\">{{uploadedFileDetails.name}}</p>\r\n              </ion-row>\r\n            </ion-col>\r\n            <ion-col size=\"12\">\r\n              <div class=\"input-wrap\">\r\n                <ion-label>Template Body (Max 1024 characters)<span class=\"red\">*</span></ion-label>\r\n                <ion-textarea rows=\"6\" type=\"text\" maxlength=\"1024\" class=\"form-input\" [(ngModel)]=\"advanceTemplateDetails.components[1].text\"></ion-textarea>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"12\">\r\n              <div class=\"input-wrap\">\r\n                <ion-label>Footer Message (Max 60 characters) (Optional)</ion-label>\r\n                <ion-input class=\"form-input\" maxlength=\"60\" [(ngModel)]=\"advanceTemplateDetails.components[2].text\"></ion-input>\r\n              </div>\r\n            </ion-col>\r\n            <ion-col size=\"12\">\r\n              <ion-row>\r\n                <ion-col size=\"6\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Buttons (Optional)</ion-label>\r\n                    <select class=\"form-input\" style=\"width: 100%; padding: 9px;\" [(ngModel)]=\"advanceTemplateDetails.components[3].buttonType\" interface=\"popover\" (ionChange)=\"changeButtonType($event)\">\r\n                      <option value=\"none\">None</option>\r\n                      <option value=\"quickReply\">Quick Reply</option>\r\n                      <option value=\"callToAction\">Call To Action</option>\r\n                    </select>\r\n                  </div>\r\n                </ion-col>\r\n              </ion-row>\r\n              <ng-container *ngIf=\"advanceTemplateDetails.components[3].buttonType == 'quickReply'\">\r\n                <ion-row>\r\n                  <ion-col size=\"6\">\r\n                    <h4>Quick Reply</h4>\r\n                  </ion-col>\r\n                  <ion-col size=\"6\">\r\n                    <ion-button fill=\"outline\" shape=\"round\" size=\"small\" (click)=\"addButtons('quickReply')\">Add More Quick Reply</ion-button>\r\n                  </ion-col>\r\n                </ion-row>\r\n              <ion-row *ngFor=\"let quickReplyButton of quickReplyButtons; let i = index\">\r\n                <ion-col size=\"5\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Button Text (Max 25 characters)</ion-label>\r\n                    <ion-input class=\"form-input\" maxlength=\"25\" [(ngModel)]=\"quickReplyButton.text\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"5\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Button Action</ion-label>\r\n                    <select class=\"form-input\" interface=\"popover\" style=\"width: 100%; padding: 9px;\"\r\n                    [(ngModel)]=\"quickReplyButton.payload\">\r\n                      <option value=\"menu-entry-point\">Menu</option>\r\n                      <option value=\"menu-button-1\">Menu Button 1</option>\r\n                      <option value=\"menu-button-2\">Menu Button 2</option>\r\n                      <option value=\"menu-button-3\">Menu Button 3</option>\r\n                    </select>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"2\" class=\"vertical-center\">\r\n                  <div>\r\n                    <i class=\"flaticon-null-19 remove-icon\" (click)=\"removeButton(i)\"></i>\r\n                  </div>\r\n                </ion-col>\r\n              </ion-row>\r\n              </ng-container>\r\n\r\n              <ng-container *ngIf=\"advanceTemplateDetails.components[3].buttonType == 'callToAction'\">\r\n              <h4>Call To Action</h4>\r\n              <ion-row>\r\n                <ion-col size=\"3\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Type of Action</ion-label>\r\n                    <ion-input class=\"form-input\" [readonly]=\"true\" value=\"Call Phone No.\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Button Text</ion-label>\r\n                    <ion-input class=\"form-input\" maxlength=\"25\" [(ngModel)]=\"callToActionButtons[0].text\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"2\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Country Code</ion-label>\r\n                    <ion-input class=\"form-input\" maxlength=\"25\" value=\"+91\" [readonly]=\"true\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"4\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Phone Number</ion-label>\r\n                    <ion-input class=\"form-input\" maxlength=\"10\" [(ngModel)]=\"callToActionButtons[0].phone_number\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n              </ion-row>\r\n              <ion-row>\r\n                <ion-col size=\"3\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Type of Action</ion-label>\r\n                    <ion-input class=\"form-input\" [readonly]=\"true\" value=\"Visit Website\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"3\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Button Text</ion-label>\r\n                    <ion-input class=\"form-input\" maxlength=\"25\" [(ngModel)]=\"callToActionButtons[1].text\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"2\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>URL Type</ion-label>\r\n                    <ion-input class=\"form-input\" maxlength=\"25\" value=\"Static\" [readonly]=\"true\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n                <ion-col size=\"4\">\r\n                  <div class=\"input-wrap\">\r\n                    <ion-label>Website URL</ion-label>\r\n                    <ion-input class=\"form-input\" [(ngModel)]=\"callToActionButtons[1].url\"></ion-input>\r\n                  </div>\r\n                </ion-col>\r\n              </ion-row>\r\n              </ng-container>\r\n            </ion-col>\r\n            <ion-col size=\"12\">\r\n              <ion-text color=\"danger\">\r\n                <p>Note: Once you have created your template it will get submit for approval to whatsapp. It can take up to 24 hours for an approval decision to be made by Whatsapp.</p>\r\n              </ion-text>\r\n            </ion-col>\r\n    \r\n          </ion-row>\r\n        </ion-grid>\r\n      </div>\r\n    \r\n    </ion-content>\r\n    </super-tab>\r\n\r\n  </super-tabs-container>\r\n\r\n</super-tabs>\r\n\r\n<ion-footer no-border class=\"page-footer\" *ngIf=\"!(templateType=='advance' && paidPlanNote.length)\">\r\n  <div class=\"main-container\">\r\n    <ion-button (click)=\"save()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n      <i class=\"flaticon-null-20 margin-icon\"></i>\r\n      Save {{templateType | titlecase}}\r\n    </ion-button>\r\n  </div>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/admin/whatsapp/add-whatsapp-template/add-whatsapp-template.module.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/admin/whatsapp/add-whatsapp-template/add-whatsapp-template.module.ts ***!
  \**************************************************************************************/
/*! exports provided: AddWhatsappTemplatePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddWhatsappTemplatePageModule", function() { return AddWhatsappTemplatePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _add_whatsapp_template_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./add-whatsapp-template.page */ "./src/app/admin/whatsapp/add-whatsapp-template/add-whatsapp-template.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");








var routes = [
    {
        path: '',
        component: _add_whatsapp_template_page__WEBPACK_IMPORTED_MODULE_6__["AddWhatsappTemplatePage"]
    }
];
var AddWhatsappTemplatePageModule = /** @class */ (function () {
    function AddWhatsappTemplatePageModule() {
    }
    AddWhatsappTemplatePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"],
            ],
            declarations: [_add_whatsapp_template_page__WEBPACK_IMPORTED_MODULE_6__["AddWhatsappTemplatePage"]]
        })
    ], AddWhatsappTemplatePageModule);
    return AddWhatsappTemplatePageModule;
}());



/***/ }),

/***/ "./src/app/admin/whatsapp/add-whatsapp-template/add-whatsapp-template.page.scss":
/*!**************************************************************************************!*\
  !*** ./src/app/admin/whatsapp/add-whatsapp-template/add-whatsapp-template.page.scss ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".red {\n  color: red;\n}\n\nion-list.option-list ion-radio-group {\n  display: -webkit-box;\n  display: flex;\n}\n\nion-list.option-list ion-radio-group ion-item {\n  --padding-start:0;\n  width: 33.3%;\n}\n\n.remove-icon {\n  cursor: pointer;\n  margin-top: 12px;\n  margin-left: 5px;\n  color: var(--ion-color-danger);\n  font-size: 16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vd2hhdHNhcHAvYWRkLXdoYXRzYXBwLXRlbXBsYXRlL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcd2hhdHNhcHBcXGFkZC13aGF0c2FwcC10ZW1wbGF0ZVxcYWRkLXdoYXRzYXBwLXRlbXBsYXRlLnBhZ2Uuc2NzcyIsInNyYy9hcHAvYWRtaW4vd2hhdHNhcHAvYWRkLXdoYXRzYXBwLXRlbXBsYXRlL2FkZC13aGF0c2FwcC10ZW1wbGF0ZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxVQUFBO0FDQ0o7O0FERUU7RUFDRSxvQkFBQTtFQUFBLGFBQUE7QUNDSjs7QURBSTtFQUNJLGlCQUFBO0VBQ0EsWUFBQTtBQ0VSOztBREVBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3doYXRzYXBwL2FkZC13aGF0c2FwcC10ZW1wbGF0ZS9hZGQtd2hhdHNhcHAtdGVtcGxhdGUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnJlZHtcclxuICAgIGNvbG9yOiByZWQ7XHJcbiAgfVxyXG5cclxuICBpb24tbGlzdC5vcHRpb24tbGlzdCBpb24tcmFkaW8tZ3JvdXAge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGlvbi1pdGVte1xyXG4gICAgICAgIC0tcGFkZGluZy1zdGFydDowO1xyXG4gICAgICAgIHdpZHRoOiAzMy4zJTtcclxuICAgIH1cclxufVxyXG5cclxuLnJlbW92ZS1pY29ue1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBtYXJnaW4tdG9wOiAxMnB4O1xyXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxufSIsIi5yZWQge1xuICBjb2xvcjogcmVkO1xufVxuXG5pb24tbGlzdC5vcHRpb24tbGlzdCBpb24tcmFkaW8tZ3JvdXAge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuaW9uLWxpc3Qub3B0aW9uLWxpc3QgaW9uLXJhZGlvLWdyb3VwIGlvbi1pdGVtIHtcbiAgLS1wYWRkaW5nLXN0YXJ0OjA7XG4gIHdpZHRoOiAzMy4zJTtcbn1cblxuLnJlbW92ZS1pY29uIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBtYXJnaW4tdG9wOiAxMnB4O1xuICBtYXJnaW4tbGVmdDogNXB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/whatsapp/add-whatsapp-template/add-whatsapp-template.page.ts":
/*!************************************************************************************!*\
  !*** ./src/app/admin/whatsapp/add-whatsapp-template/add-whatsapp-template.page.ts ***!
  \************************************************************************************/
/*! exports provided: AddWhatsappTemplatePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddWhatsappTemplatePage", function() { return AddWhatsappTemplatePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/whatsapp-dashboard/whatsapp-dashboard.service */ "./src/app/services/whatsapp-dashboard/whatsapp-dashboard.service.ts");






var AddWhatsappTemplatePage = /** @class */ (function () {
    function AddWhatsappTemplatePage(sharedService, whatsappService, router, configService) {
        this.sharedService = sharedService;
        this.whatsappService = whatsappService;
        this.router = router;
        this.configService = configService;
        this.templateType = 'basic';
        this.templateDetails = {
            createdAt: new Date(),
            type: 'template',
            name: '',
            components: [
                {
                    type: 'body',
                    text: ''
                }
            ],
            language: 'en_US',
            category: ''
        };
        this.advanceTemplateDetails = {
            createdAt: new Date(),
            type: 'template',
            name: '',
            components: [
                {
                    type: 'header',
                    format: 'none'
                },
                {
                    type: 'body',
                    text: ''
                },
                {
                    type: 'footer',
                    text: ''
                },
                {
                    type: "buttons",
                    buttonType: 'none',
                    buttons: []
                }
            ],
            language: 'en_US',
            category: ''
        };
        this.quickReplyButtons = [
            {
                type: "quick_reply",
                text: "",
                payload: ""
            }
        ];
        this.callToActionButtons = [
            {
                type: "phone_number",
                text: "",
                phone_number: ""
            },
            {
                type: "url",
                text: "",
                url: ""
            }
        ];
        this.headerType = 'none';
        this.paidPlanNote = '';
    }
    AddWhatsappTemplatePage.prototype.ngOnInit = function () {
        this.allTemplates = this.router.getCurrentNavigation().extras.state.allTemplates;
        this.checkWhatsappPlan();
    };
    AddWhatsappTemplatePage.prototype.checkWhatsappPlan = function () {
        if (this.configService.environment.isFreeWhatsapp) {
            this.paidPlanNote = 'Please upgrade your plan to make advance Template.';
        }
    };
    AddWhatsappTemplatePage.prototype.changeHeaderMediaType = function (e) {
        this.advanceTemplateDetails.components[0].format = e.target.value;
        this.advanceTemplateDetails.components[0]['mediaUrl'] = '';
        this.uploadedFileDetails = {};
    };
    AddWhatsappTemplatePage.prototype.changeButtonType = function (e) {
        if (e.target.value == 'none') {
            this.advanceTemplateDetails.components[3].buttons = [];
        }
    };
    AddWhatsappTemplatePage.prototype.addButtons = function (buttonType) {
        if (buttonType == 'quickReply' && this.quickReplyButtons.length < 3) {
            this.quickReplyButtons.push({
                type: "quick_reply",
                text: "",
                payload: ""
            });
        }
        else {
            this.sharedService.presentAlert('Quick Reply can have max 3 Buttons');
        }
    };
    AddWhatsappTemplatePage.prototype.removeButton = function (index) {
        this.quickReplyButtons.splice(index, 1);
    };
    AddWhatsappTemplatePage.prototype.uploadMedia = function (files, mediaType) {
        var _this = this;
        var _loop_1 = function (i) {
            console.log('files[i]:', files[i]);
            //Size of file is in bytes.
            if (mediaType == 'image' && files[i].size / 1024 / 1024 > 5) {
                this_1.sharedService.presentAlert('Image size cannot be greater than 5MB.');
                return { value: void 0 };
            }
            else if (mediaType == 'video' && files[i].size / 1024 / 1024 > 16) {
                this_1.sharedService.presentAlert('Video size cannot be greater than 16MB.');
                return { value: void 0 };
            }
            else if (mediaType == 'document' && files[i].size / 1024 / 1024 > 100) {
                this_1.sharedService.presentAlert('Document size cannot be greater than 100MB.');
                return { value: void 0 };
            }
            var reader = new FileReader();
            reader.readAsDataURL(files.item(i));
            reader.onload = function (event) {
                if (mediaType == 'image') {
                    var base64 = event.target.result;
                    _this.advanceTemplateDetails.components[0]['mediaUrl'] = base64;
                }
                else if (mediaType == 'document' || mediaType == 'video') {
                    _this.advanceTemplateDetails.components[0]['mediaUrl'] = files[i];
                }
                _this.uploadedFileDetails = files[i];
            };
        };
        var this_1 = this;
        for (var i = 0; i < files.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    AddWhatsappTemplatePage.prototype.save = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var isValid, docId, success, templateExists, templateExists, _i, _a, button, i, buttonItem;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isValid = this.checkValidation();
                        if (!isValid) {
                            this.sharedService.presentAlert('Please fill all required fields');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.sharedService.presentLoading()];
                    case 1:
                        _b.sent();
                        if (!(this.templateType == 'basic')) return [3 /*break*/, 3];
                        docId = this.templateDetails.name.trim().toLowerCase().replace(/ /g, '_').replace(/[^\w\-]+/g, '');
                        templateExists = this.allTemplates.filter(function (template) { return template.id == docId; });
                        console.log('templateExists:', templateExists);
                        if (this.isTemplateAlreadyExists(templateExists))
                            return [2 /*return*/];
                        return [4 /*yield*/, this.whatsappService.addTemplate(this.templateType, docId, this.templateDetails)];
                    case 2:
                        success = _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(this.templateType == 'advance')) return [3 /*break*/, 5];
                        docId = this.advanceTemplateDetails.name.trim().toLowerCase().replace(/ /g, '_');
                        templateExists = this.allTemplates.filter(function (template) { return template.id == docId; });
                        console.log('templateExists:', templateExists);
                        if (this.isTemplateAlreadyExists(templateExists))
                            return [2 /*return*/];
                        if (this.headerType == 'text') {
                            this.advanceTemplateDetails.components[0].format = 'text';
                        }
                        if (this.advanceTemplateDetails.components[3].buttonType == 'quickReply') {
                            if (!this.quickReplyButtons.length) {
                                this.sharedService.presentAlert('Quick Reply cannot be empty');
                            }
                            for (_i = 0, _a = this.quickReplyButtons; _i < _a.length; _i++) {
                                button = _a[_i];
                                if (!button.text || !button.payload) {
                                    this.sharedService.presentAlert('Quick Reply cannot be empty, either fill or remove the field');
                                    return [2 /*return*/];
                                }
                            }
                            Object.assign(this.advanceTemplateDetails.components[3].buttons, this.quickReplyButtons);
                        }
                        else if (this.advanceTemplateDetails.components[3].buttonType == 'callToAction') {
                            this.advanceTemplateDetails.components[3].buttons = JSON.parse(JSON.stringify(this.callToActionButtons));
                            // for (const [index, buttonItem] of this.advanceTemplateDetails.components[3].buttons.entries()) {
                            //   if (!buttonItem.text) {
                            //     this.advanceTemplateDetails.components[3].buttons.splice(index, 1);
                            //   }
                            //   if (buttonItem.type == 'phone_number') {
                            //     buttonItem.phone_number  = `+91${buttonItem.phone_number}`
                            //   }
                            // }
                            for (i = 0; i < this.advanceTemplateDetails.components[3].buttons.length; i++) {
                                buttonItem = this.advanceTemplateDetails.components[3].buttons[i];
                                if (!buttonItem.text) {
                                    this.advanceTemplateDetails.components[3].buttons.splice(i, 1);
                                    i--; // Adjust index after splicing
                                    continue; // Skip the rest of the loop for this iteration
                                }
                                if (buttonItem.type === 'phone_number') {
                                    buttonItem.phone_number = "+91" + buttonItem.phone_number;
                                }
                            }
                        }
                        console.log('advanceTemplateDetails:', this.advanceTemplateDetails);
                        return [4 /*yield*/, this.whatsappService.addTemplate(this.templateType, docId, this.advanceTemplateDetails)];
                    case 4:
                        success = _b.sent();
                        _b.label = 5;
                    case 5:
                        this.sharedService.loading ? this.sharedService.loading.dismiss() : {};
                        if (success) {
                            this.sharedService.presentAlert('Template Saved Successfully');
                            this.router.navigate(['whatsapp-broadcast']);
                        }
                        else {
                            this.sharedService.presentAlert('Something went wrong. Please try again later.');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AddWhatsappTemplatePage.prototype.checkValidation = function () {
        if (this.templateType == 'basic') {
            if (!this.templateDetails.name || !this.templateDetails.components[0].text || !this.templateDetails.category) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            // console.log('this.advanceTemplateDetails:', this.advanceTemplateDetails);
            if (!this.advanceTemplateDetails.name || !this.advanceTemplateDetails.category || !this.advanceTemplateDetails.components[1].text) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    AddWhatsappTemplatePage.prototype.isTemplateAlreadyExists = function (templateExists) {
        if (templateExists && templateExists.length > 0) {
            this.sharedService.loading ? this.sharedService.loading.dismiss() : {};
            this.sharedService.presentAlert('Template with same name already exists. Please try with different Template Name');
            return true;
        }
        return false;
    };
    AddWhatsappTemplatePage.ctorParameters = function () { return [
        { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] },
        { type: src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_5__["WhatsappDashboardService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_3__["ConfigService"] }
    ]; };
    AddWhatsappTemplatePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-whatsapp-template',
            template: __webpack_require__(/*! raw-loader!./add-whatsapp-template.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/whatsapp/add-whatsapp-template/add-whatsapp-template.page.html"),
            styles: [__webpack_require__(/*! ./add-whatsapp-template.page.scss */ "./src/app/admin/whatsapp/add-whatsapp-template/add-whatsapp-template.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"], src_app_services_whatsapp_dashboard_whatsapp_dashboard_service__WEBPACK_IMPORTED_MODULE_5__["WhatsappDashboardService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_3__["ConfigService"]])
    ], AddWhatsappTemplatePage);
    return AddWhatsappTemplatePage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-whatsapp-add-whatsapp-template-add-whatsapp-template-module-es5.js.map