(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-services-create-service-create-service-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-services/create-service/create-service.page.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-services/create-service/create-service.page.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\"\r\n        defaultHref=\"admin-home\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\"\r\n      slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\"\r\n      *ngIf=\"!serviceId === undefined\">New Service</ion-title>\r\n    <ion-title class=\"ion-text-center\"\r\n      *ngIf=\"serviceId !== undefined\">Edit Service</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs>\r\n\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Basic</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Advanced (optional)</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <super-tabs-container>\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <div style=\"text-align: center;\">\r\n            <ion-button (click)=\"saveService()\"\r\n              shape=\"round\"\r\n              class=\"btn-1 i-start\"\r\n              color=\"success\"\r\n              fill=\"outline\">\r\n              <i class=\"flaticon-null-20 margin-icon\"></i>\r\n              Save\r\n            </ion-button>&nbsp;&nbsp;\r\n            <ion-button *ngIf=\"serviceData\"\r\n              (click)=\"deleteConfirm();\"\r\n              shape=\"round\"\r\n              class=\"btn-1 i-start\"\r\n              color=\"danger\"\r\n              fill=\"outline\">\r\n              <i class=\"flaticon-null-21\"></i>\r\n              Delete\r\n            </ion-button>\r\n          </div>\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Name</ion-label>\r\n                  <ion-input type=\"text\"\r\n                    class=\"form-input\"\r\n                    [(ngModel)]=\"name\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\">\r\n                <div class=\"flex-space-between\">\r\n                  <div>\r\n                    <ion-label>Banner Image</ion-label>\r\n                    <ion-text color=\"danger\">\r\n                      <p style=\"margin-top: 5px\">Image size for best view :\r\n                        1366x400 Px</p>\r\n                    </ion-text>\r\n                  </div>\r\n                  <div class=\"upload-btn-wrapper\">\r\n                    <button class=\"upload-btn btn-1 i-start\"\r\n                      (click)=\"uploadImage($event.target.files)\"> <i\r\n                        class=\"flaticon-null-16\"></i>Upload Banner\r\n                      Image</button>\r\n                    <!-- <input type=\"file\" name=\"myfile\" (change)=\"uploadImage($event.target.files)\" /> -->\r\n                  </div>\r\n                </div>\r\n                <div class=\"img-container\"\r\n                  *ngIf=\"banner[0] && banner[0].hasOwnProperty('url') && banner[0].url != ''\">\r\n                  <div class=\"img-wrap\"\r\n                    *ngFor=\"let img of banner; let i=index;\">\r\n                    <img class=\"category-img\"\r\n                      [src]=\"img.url\"\r\n                      (click)=\"imgZoom(img.url)\" />\r\n                    <div class=\"overlay\">\r\n                      <ion-button class=\"btn-2 remove\"\r\n                        shape=\"round\"\r\n                        fill=\"clear\"\r\n                        color=\"danger\"\r\n                        (click)=\"removeImage()\">\r\n                        <ion-icon name=\"trash\"\r\n                          slot=\"icon-only\"></ion-icon>\r\n                      </ion-button>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Description</ion-label>\r\n                  <ckeditor [(ngModel)]=\"description\"\r\n                    [config]=\"ckeConfig\"></ckeditor>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-row\r\n                    class=\"ion-justify-content-between ion-align-items-center\">\r\n                    <ion-col size=\"6\"\r\n                      class=\"ion-no-padding\">\r\n                      <div class=\"headings\">Image Mandatory In Response</div>\r\n                    </ion-col>\r\n                    <ion-col size=\"2\"\r\n                      class=\"ion-no-padding\">\r\n                      <div class=\"toggle-btn\">\r\n                        <label class=\"switch\">\r\n                          <input type=\"checkbox\"\r\n                            (click)=\"imageMandatoryStatus()\"\r\n                            [checked]=\"imageMandatory\">\r\n                          <span class=\"slider round\"></span>\r\n                        </label>\r\n                      </div>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-row\r\n                    class=\"ion-justify-content-between ion-align-items-center\">\r\n                    <ion-col size=\"6\"\r\n                      class=\"ion-no-padding\">\r\n                      <div class=\"headings\">Service Schedule</div>\r\n                    </ion-col>\r\n                    <ion-col size=\"2\"\r\n                      class=\"ion-no-padding\">\r\n                      <div class=\"toggle-btn\">\r\n                        <label class=\"switch\">\r\n                          <input type=\"checkbox\"\r\n                            (click)=\"serviceScheduleToggle()\"\r\n                            [checked]=\"schedule.active\">\r\n                          <span class=\"slider round\"></span>\r\n                        </label>\r\n                      </div>\r\n                    </ion-col>\r\n                  </ion-row>\r\n                  <div *ngIf=\"schedule.active\">\r\n                    <br>\r\n                    <ion-row\r\n                      class=\"ion-justify-content-between ion-align-items-center\">\r\n                      <ion-col size=\"6\"\r\n                        class=\"ion-no-padding\">\r\n                        <div class=\"headings\">Making Service Schedule Mandatory\r\n                        </div>\r\n                      </ion-col>\r\n                      <ion-col size=\"2\"\r\n                        class=\"ion-no-padding\">\r\n                        <div class=\"toggle-btn\">\r\n                          <label class=\"switch\">\r\n                            <input type=\"checkbox\"\r\n                              (click)=\"serviceScheduleMandatoryToggle()\"\r\n                              [checked]=\"schedule.mandatory\">\r\n                            <span class=\"slider round\"></span>\r\n                          </label>\r\n                        </div>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                    <br>\r\n                    <ion-row\r\n                      class=\"ion-justify-content-between ion-align-items-center\">\r\n                      <ion-col class=\"ion-no-padding\">\r\n                        <div class=\"headings\">Max Number of Days for Service\r\n                        </div>\r\n                        <ion-input class=\"form-input\"\r\n                          type=\"number\"\r\n                          [(ngModel)]=\"schedule.maxDays\"></ion-input>\r\n                      </ion-col>\r\n                    </ion-row>\r\n                    <br>\r\n                    <div>\r\n                      <p>Days:</p>\r\n                      <div class=\"cs-days-container\">\r\n                        <div *ngFor=\"let x of days;let i = index;\"\r\n                          [ngClass]=\"{'cs-days-inactive': !x.active, 'cs-days-active': x.active}\"\r\n                          (click)=\"daySelectToggle(i)\">\r\n                          {{x.day}}\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <br>\r\n                    <div>\r\n                      <p>Time:</p>\r\n                      <ion-grid>\r\n                        <ion-row class=\"ion-align-items-center\">\r\n                          <ion-col size=\"4\">\r\n                            <ion-datetime class=\"time-picker\"\r\n                              displayFormat=\"hh:mm A\"\r\n                              pickerFormat=\"hh:mm A\"\r\n                              [(ngModel)]=\"time.start\"></ion-datetime>\r\n                          </ion-col>\r\n                          <ion-col size=\"1\"\r\n                            style=\"text-align: center;\">\r\n                            -\r\n                          </ion-col>\r\n                          <ion-col size=\"4\">\r\n                            <ion-datetime class=\"time-picker\"\r\n                              displayFormat=\"hh:mm A\"\r\n                              pickerFormat=\"hh:mm A\"\r\n                              [(ngModel)]=\"time.end\"></ion-datetime>\r\n                          </ion-col>\r\n                          <ion-col size=\"3\">\r\n                            <ion-button (click)=\"addTimeSchedule()\"\r\n                              fill=\"outline\"\r\n                              shape=\"round\"\r\n                              size=\"small\"\r\n                              [disabled]=\"disableAddTimeSchedule()\">\r\n                              Add\r\n                            </ion-button>\r\n                          </ion-col>\r\n                        </ion-row>\r\n                        <ion-row *ngIf=\"schedule.timeSchedules.length > 0\"\r\n                          style=\"margin-top: 5%;margin-left: -2%;\">\r\n                          <div\r\n                            *ngFor=\"let time of schedule.timeSchedules; let i = index;\">\r\n                            <ion-chip outline\r\n                              color=\"dark\">\r\n                              <ion-label>{{time.start}} - {{time.end}}\r\n                              </ion-label>\r\n                              <ion-icon name=\"close-circle\"\r\n                                (click)=\"removeTimeSchedule(i)\"></ion-icon>\r\n                            </ion-chip>\r\n                          </div>\r\n                        </ion-row>\r\n                      </ion-grid>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n    <super-tab>\r\n      <ion-content>\r\n        <div class=\"main-container\">\r\n          <div style=\"text-align: center;\">\r\n            <ion-button (click)=\"saveService()\"\r\n              shape=\"round\"\r\n              class=\"btn-1 i-start\"\r\n              color=\"success\"\r\n              fill=\"outline\">\r\n              <i class=\"flaticon-null-20 margin-icon\"></i>\r\n              Save\r\n            </ion-button>\r\n          </div>\r\n          <ion-col size=\"12\">\r\n            <!-- region select -->\r\n            <div class=\"input-wrap\">\r\n              <div *ngIf=\"multiRegion && regions.length\"\r\n                class=\"cs-data-sections\">\r\n                <div class=\"cs-headings\">\r\n                  Add Region\r\n                </div>\r\n                <ion-select multiple=\"true\"\r\n                  [value]=\"regionId\"\r\n                  class=\"border f-s-14 i-s-p-10\"\r\n                  (ionChange)=\"addRegion($event)\"\r\n                  placeholder=\"Select Region\"\r\n                  style=\"border: 1px solid gray; width: 300px;\">\r\n                  <ion-select-option [value]=\"region.id\"\r\n                    *ngFor=\"let region of regions\">{{region.name}}\r\n                  </ion-select-option>\r\n                </ion-select>\r\n                <br>\r\n              </div>\r\n            </div>\r\n            <!-- region select -->\r\n          </ion-col>\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <h3>Website SEO</h3>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Meta Title</ion-label>\r\n                  <ion-input class=\"form-input\"\r\n                    [(ngModel)]=\"metaData.pageTitle\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Meta Description</ion-label>\r\n                  <ion-input class=\"form-input\"\r\n                    [(ngModel)]=\"metaData.metaDescription\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n              <ion-col size=\"12\">\r\n                <div class=\"input-wrap\">\r\n                  <ion-label>Meta Keywords</ion-label>\r\n                  <ion-input class=\"form-input\"\r\n                    [(ngModel)]=\"metaData.metaKeywords\"></ion-input>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n  </super-tabs-container>\r\n\r\n</super-tabs>"

/***/ }),

/***/ "./src/app/admin/admin-services/create-service/create-service.module.ts":
/*!******************************************************************************!*\
  !*** ./src/app/admin/admin-services/create-service/create-service.module.ts ***!
  \******************************************************************************/
/*! exports provided: CreateServicePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateServicePageModule", function() { return CreateServicePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _directives_application_directives_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../directives/application-directives.module */ "./src/app/directives/application-directives.module.ts");
/* harmony import */ var _components_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../components/shared.module */ "./src/app/components/shared.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _create_service_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./create-service.page */ "./src/app/admin/admin-services/create-service/create-service.page.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm2015/ng2-ckeditor.js");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm2015/ionic-super-tabs-angular.js");











const routes = [
    {
        path: '',
        component: _create_service_page__WEBPACK_IMPORTED_MODULE_8__["CreateServicePage"]
    }
];
let CreateServicePageModule = class CreateServicePageModule {
};
CreateServicePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forChild(routes),
            _components_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
            _directives_application_directives_module__WEBPACK_IMPORTED_MODULE_1__["ApplicationDirectivesModule"],
            ng2_ckeditor__WEBPACK_IMPORTED_MODULE_9__["CKEditorModule"],
            _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_10__["SuperTabsModule"]
        ],
        declarations: [_create_service_page__WEBPACK_IMPORTED_MODULE_8__["CreateServicePage"]]
    })
], CreateServicePageModule);



/***/ }),

/***/ "./src/app/admin/admin-services/create-service/create-service.page.scss":
/*!******************************************************************************!*\
  !*** ./src/app/admin/admin-services/create-service/create-service.page.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".cs-data-container ion-input, .cs-data-container ion-datetime {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.cs-wrapper {\n  font-size: 14px;\n}\n\n.cs-headings {\n  margin-top: 20px;\n  margin-bottom: 10px;\n}\n\n.cs-data-sections {\n  margin-top: 20px;\n}\n\n.cs-upload-imgs {\n  text-align: center;\n}\n\n.cs-service-imgs div {\n  max-width: 100%;\n  position: relative;\n  text-align: center;\n}\n\n.cs-service-imgs div img {\n  width: 90%;\n  height: 20vh;\n  margin: 10px;\n  -o-object-fit: contain;\n     object-fit: contain;\n  border: 1px solid #ccc;\n}\n\n.cs-service-imgs div div {\n  position: absolute;\n  top: 0px;\n  right: 10px;\n  font-size: 20px;\n}\n\n.cancel-btn {\n  background-color: var(--ion-color-dark);\n  color: white;\n}\n\n.save-btn {\n  background-color: var(--ion-color-primary);\n  color: var(--ion-color-primary-contrast);\n}\n\n.margin-icon {\n  margin-left: 5px;\n}\n\nion-footer ion-title {\n  height: 45px;\n}\n\n.bottom-buttons {\n  font-size: 15px;\n  margin-left: 5px;\n}\n\n.cs-days-container {\n  display: -webkit-box;\n  display: flex;\n  flex-flow: wrap;\n}\n\n.cs-days-container .cs-days-inactive {\n  border: 1px solid #ccc;\n  text-align: center;\n  padding: 10px 15px 10px 15px;\n  border-radius: 5px;\n  margin: 4px;\n}\n\n.cs-days-container .cs-days-active {\n  border: 1px solid var(--ion-color-chat-border);\n  text-align: center;\n  padding: 10px 15px 10px 15px;\n  border-radius: 5px;\n  margin: 4px;\n  background: var(--ion-color-chat-background);\n}\n\n.time-picker {\n  padding-right: 15px;\n  border: 1px solid lightgray;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tc2VydmljZXMvY3JlYXRlLXNlcnZpY2UvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxhZG1pbi1zZXJ2aWNlc1xcY3JlYXRlLXNlcnZpY2VcXGNyZWF0ZS1zZXJ2aWNlLnBhZ2Uuc2NzcyIsInNyYy9hcHAvYWRtaW4vYWRtaW4tc2VydmljZXMvY3JlYXRlLXNlcnZpY2UvY3JlYXRlLXNlcnZpY2UucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtBQ0FKOztBRElBO0VBQ0ksZUFBQTtBQ0RKOztBRElBO0VBQ0ksZ0JBQUE7RUFDQSxtQkFBQTtBQ0RKOztBRElBO0VBQ0ksZ0JBQUE7QUNESjs7QURJQTtFQUNJLGtCQUFBO0FDREo7O0FESUE7RUFDSSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQ0RKOztBREVJO0VBQ0ksVUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7S0FBQSxtQkFBQTtFQUNBLHNCQUFBO0FDQVI7O0FERUk7RUFDSSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0FSOztBRElBO0VBQ0ksdUNBQUE7RUFDQSxZQUFBO0FDREo7O0FESUU7RUFDRSwwQ0FBQTtFQUNBLHdDQUFBO0FDREo7O0FESUU7RUFDRSxnQkFBQTtBQ0RKOztBRElFO0VBQ0UsWUFBQTtBQ0RKOztBRElFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FDREo7O0FESUU7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxlQUFBO0FDREo7O0FERUk7RUFDRSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsNEJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUNBTjs7QURHSTtFQUNFLDhDQUFBO0VBQ0Esa0JBQUE7RUFDQSw0QkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLDRDQUFBO0FDRE47O0FES0U7RUFDRSxtQkFBQTtFQUNBLDJCQUFBO0FDRkoiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9hZG1pbi1zZXJ2aWNlcy9jcmVhdGUtc2VydmljZS9jcmVhdGUtc2VydmljZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY3MtZGF0YS1jb250YWluZXIge1xyXG4gIGlvbi1pbnB1dCwgaW9uLWRhdGV0aW1lIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgfVxyXG59XHJcblxyXG4uY3Mtd3JhcHBlciB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi5jcy1oZWFkaW5ncyB7XHJcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLmNzLWRhdGEtc2VjdGlvbnMge1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxufVxyXG5cclxuLmNzLXVwbG9hZC1pbWdzIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmNzLXNlcnZpY2UtaW1ncyBkaXYge1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgaW1nIHtcclxuICAgICAgICB3aWR0aDogOTAlO1xyXG4gICAgICAgIGhlaWdodDogMjB2aDtcclxuICAgICAgICBtYXJnaW46IDEwcHg7XHJcbiAgICAgICAgb2JqZWN0LWZpdDogY29udGFpbjtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgfVxyXG4gICAgZGl2IHtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgdG9wOiAwcHg7XHJcbiAgICAgICAgcmlnaHQ6IDEwcHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgfVxyXG59XHJcblxyXG4uY2FuY2VsLWJ0biB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XHJcbiAgICBjb2xvcjogd2hpdGVcclxuICB9XHJcblxyXG4gIC5zYXZlLWJ0biB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xyXG4gIH1cclxuXHJcbiAgLm1hcmdpbi1pY29uIHtcclxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgfVxyXG5cclxuICBpb24tZm9vdGVyIGlvbi10aXRsZSB7XHJcbiAgICBoZWlnaHQ6IDQ1cHg7XHJcbiAgfVxyXG5cclxuICAuYm90dG9tLWJ1dHRvbnMge1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICB9XHJcblxyXG4gIC5jcy1kYXlzLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1mbG93OiB3cmFwO1xyXG4gICAgLmNzLWRheXMtaW5hY3RpdmUge1xyXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIHBhZGRpbmc6IDEwcHggMTVweCAxMHB4IDE1cHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICAgbWFyZ2luOiA0cHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jcy1kYXlzLWFjdGl2ZSB7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1jaGF0LWJvcmRlcik7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgcGFkZGluZzogMTBweCAxNXB4IDEwcHggMTVweDtcclxuICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICBtYXJnaW46IDRweDtcclxuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWNoYXQtYmFja2dyb3VuZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAudGltZS1waWNrZXIge1xyXG4gICAgcGFkZGluZy1yaWdodDogMTVweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheVxyXG4gIH1cclxuXHJcbiIsIi5jcy1kYXRhLWNvbnRhaW5lciBpb24taW5wdXQsIC5jcy1kYXRhLWNvbnRhaW5lciBpb24tZGF0ZXRpbWUge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5jcy13cmFwcGVyIHtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uY3MtaGVhZGluZ3Mge1xuICBtYXJnaW4tdG9wOiAyMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uY3MtZGF0YS1zZWN0aW9ucyB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG59XG5cbi5jcy11cGxvYWQtaW1ncyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmNzLXNlcnZpY2UtaW1ncyBkaXYge1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLmNzLXNlcnZpY2UtaW1ncyBkaXYgaW1nIHtcbiAgd2lkdGg6IDkwJTtcbiAgaGVpZ2h0OiAyMHZoO1xuICBtYXJnaW46IDEwcHg7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG59XG4uY3Mtc2VydmljZS1pbWdzIGRpdiBkaXYge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMHB4O1xuICByaWdodDogMTBweDtcbiAgZm9udC1zaXplOiAyMHB4O1xufVxuXG4uY2FuY2VsLWJ0biB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uc2F2ZS1idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG59XG5cbi5tYXJnaW4taWNvbiB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG5cbmlvbi1mb290ZXIgaW9uLXRpdGxlIHtcbiAgaGVpZ2h0OiA0NXB4O1xufVxuXG4uYm90dG9tLWJ1dHRvbnMge1xuICBmb250LXNpemU6IDE1cHg7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG5cbi5jcy1kYXlzLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZmxvdzogd3JhcDtcbn1cbi5jcy1kYXlzLWNvbnRhaW5lciAuY3MtZGF5cy1pbmFjdGl2ZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogMTBweCAxNXB4IDEwcHggMTVweDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBtYXJnaW46IDRweDtcbn1cbi5jcy1kYXlzLWNvbnRhaW5lciAuY3MtZGF5cy1hY3RpdmUge1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItY2hhdC1ib3JkZXIpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDEwcHggMTVweCAxMHB4IDE1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgbWFyZ2luOiA0cHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1jaGF0LWJhY2tncm91bmQpO1xufVxuXG4udGltZS1waWNrZXIge1xuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/admin-services/create-service/create-service.page.ts":
/*!****************************************************************************!*\
  !*** ./src/app/admin/admin-services/create-service/create-service.page.ts ***!
  \****************************************************************************/
/*! exports provided: CreateServicePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateServicePage", function() { return CreateServicePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/image-modal/image-modal.page */ "./src/app/image-modal/image-modal.page.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/label/label.service */ "./src/app/services/label/label.service.ts");
/* harmony import */ var src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/config/config.service */ "./src/app/services/config/config.service.ts");
/* harmony import */ var src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/components/image-editor/image-editor.component */ "./src/app/components/image-editor/image-editor.component.ts");










let CreateServicePage = class CreateServicePage {
    constructor(router, events, loadingController, alertController, camera, actionSheetController, route, modalController, labelService, configService) {
        this.router = router;
        this.events = events;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.camera = camera;
        this.actionSheetController = actionSheetController;
        this.route = route;
        this.modalController = modalController;
        this.labelService = labelService;
        this.configService = configService;
        this.serviceId = '';
        this.name = '';
        this.description = '';
        this.banner = [];
        this.imageMandatory = true;
        this.CREATE_SERVICE_LABELS = {};
        this.SHARED_LABELS = {};
        this.metaData = { pageTitle: '',
            metaDescription: '',
            metaKeywords: '' };
        this.schedule = {
            active: false,
            mandatory: false,
            maxDays: 7,
            days: [],
            timeSchedules: []
        };
        this.days = [
            { day: 'Sunday', active: false }, { day: 'Monday', active: false }, { day: 'Tuesday', active: false }, { day: 'Wednesday', active: false },
            { day: 'Thursday', active: false }, { day: 'Friday', active: false }, { day: 'Saturday', active: false }
        ];
        this.time = {
            start: null,
            end: null,
        };
        this.regionId = [];
        this.multiRegion = false;
        this.regions = [];
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.serviceData = this.router.getCurrentNavigation().extras.state.serviceData;
                if (this.serviceData) {
                    this.name = this.serviceData.name;
                    this.description = this.serviceData.description;
                    this.imageMandatory = this.serviceData.imageMandatory;
                    this.createdAt = this.serviceData.createdAt;
                    this.banner = this.serviceData.banner.hasOwnProperty('url') ? [Object.assign({}, this.serviceData.banner)] : [];
                    console.log(this.banner);
                    this.serviceId = this.serviceData.id;
                    this.schedule = this.serviceData.hasOwnProperty('schedule') ? this.serviceData.schedule : this.schedule;
                    this.regionId = this.serviceData.hasOwnProperty('regionId') ? this.serviceData.regionId : this.regionId;
                    for (let index = 0; index < this.days.length; index++) {
                        if (this.schedule.days.indexOf(this.days[index].day) != -1) {
                            this.days[index].active = true;
                        }
                    }
                    if (this.serviceData.metaData) {
                        this.metaData = this.serviceData.metaData;
                    }
                }
            }
        });
    }
    ngOnInit() {
        this.ckeConfig = {
            allowedContent: true,
            toolbar: [
                ['Bold', 'Italic', 'Underline', '-', 'NumberedList', 'BulletedList',
                    '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Format', 'FontSize']
            ],
            height: 150
        };
    }
    ionViewWillEnter() {
        this.initializeSubscriptions();
        this.SHARED_LABELS = this.labelService.labels['SHARED'];
        this.CREATE_SERVICE_LABELS = this.labelService.labels['CREATE_SERVICE'];
        this.selectRegionPh = this.SHARED_LABELS['select_region'];
        this.multiRegion = this.configService.environment.multiRegion;
        if (this.multiRegion) {
            this.events.publish('multi-region:getActiveStatus');
            this.events.publish('multi-region:getAllActiveRegions');
        }
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('services-feature:saveServiceSuccess', () => {
            this.loading.dismiss();
            this.presentAlert('Service Saved Successfully', true);
        });
        this.events.subscribe('services-feature:deleteServiceSuccess', () => {
            if (this.loading) {
                this.loading.dismiss();
            }
            this.presentAlert('Service deleted successfully!', true);
        });
        this.events.subscribe('multi-region:publishActiveStatus', (data) => {
            if (data) {
                this.multiRegion = data.active;
            }
        });
        this.events.subscribe('multi-region:publishAllActiveRegions', (regions) => {
            if (regions.length) {
                this.regions = regions;
            }
        });
    }
    imageMandatoryStatus() {
        this.imageMandatory = !this.imageMandatory;
    }
    saveService() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (!this.name || !this.description) {
                this.presentAlert('Please enter all service details');
            }
            else {
                yield this.presentLoading('Saving service details...', 10000);
                let daysData = [];
                for (let index = 0; index < this.days.length; index++) {
                    if (this.days[index].active == true) {
                        daysData.push(this.days[index].day);
                    }
                }
                let scheduleData = {
                    active: this.schedule.active,
                    mandatory: this.schedule.mandatory,
                    maxDays: this.schedule.maxDays,
                    days: daysData,
                    timeSchedules: this.schedule.timeSchedules
                };
                const serviceData = {
                    name: this.name,
                    description: this.description,
                    imageMandatory: this.imageMandatory,
                    metaData: this.metaData,
                    schedule: scheduleData,
                    regionId: this.regionId
                };
                serviceData['createdAt'] = this.serviceId ? this.createdAt : new Date();
                this.events.publish('services-feature:saveService', serviceData, this.banner, this.serviceId);
            }
        });
    }
    removeImage() {
        this.banner.splice(0, 1);
    }
    deleteConfirm() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: 'Are you sure you want to delete this service?',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Delete',
                        handler: () => {
                            console.log('Confirm Okay');
                            this.deleteService();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    deleteService() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.presentLoading('Deleting service...', 5000);
            this.events.publish('services-feature:deleteService', this.serviceId);
        });
    }
    imageActionSheet() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const actionSheet = yield this.actionSheetController.create({
                header: 'Select any option',
                buttons: [{
                        text: 'Camera',
                        icon: 'camera',
                        handler: () => {
                            this.addCameraImage('camera');
                        }
                    }, {
                        text: 'Gallery',
                        icon: 'images',
                        handler: () => {
                            this.addCameraImage('gallery');
                        }
                    }, {
                        text: 'Cancel',
                        icon: 'close',
                        role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked');
                        }
                    }]
            });
            yield actionSheet.present();
        });
    }
    addCameraImage(ctype) {
        const optionsforCamera = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            allowEdit: true
        };
        if (ctype === 'gallery') {
            optionsforCamera['sourceType'] = 0;
        }
        this.camera.getPicture(optionsforCamera).then((imageData) => {
            const base64Image = 'data:image/jpeg;base64,' + imageData;
            this.banner = [];
            this.banner.push({ url: base64Image });
        }, (err) => {
            console.log(err);
        });
    }
    uploadImage(files) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_components_image_editor_image_editor_component__WEBPACK_IMPORTED_MODULE_9__["ImageEditorComponent"],
                componentProps: {
                    aspectRatioWidthVal: 3.42,
                    aspectRatioHeightVal: 1,
                },
                cssClass: 'custom-img-editor'
            });
            yield modal.present();
            modal.onDidDismiss().then(res => {
                this.banner = [];
                this.banner.push({ url: res.data || '' });
            });
            //console.log(type);
            // for (let i = 0; i < files.length; i++) {
            //   let reader = new FileReader();
            //   reader.readAsDataURL(files.item(i))
            //   reader.onload = (event:any) => { // called once readAsDataURL is completed
            //     let base64Image:any = event.target.result;
            //     let base64Str = base64Image.split(',');
            //     this.banner = [];
            //     this.banner.push({url: base64Image});
            //   }
            // }
        });
    }
    imgZoom(img) {
        this.modalController.create({
            component: src_app_image_modal_image_modal_page__WEBPACK_IMPORTED_MODULE_5__["ImageModalPage"],
            cssClass: 'photo-modal-class',
            componentProps: {
                imgs: [{ url: img }],
                index: 0
            }
        }).then(modal => modal.present());
    }
    presentAlert(msg, action) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: msg,
                buttons: [{
                        text: 'OK',
                        handler: () => {
                            if (action) {
                                this.router.navigate(['all-services']);
                            }
                        }
                    }]
            });
            yield alert.present();
        });
    }
    presentLoading(msg, drn) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: msg,
                duration: drn
            });
            yield this.loading.present();
        });
    }
    serviceScheduleToggle() {
        this.schedule.active = !this.schedule.active;
    }
    serviceScheduleMandatoryToggle() {
        this.schedule.mandatory = !this.schedule.mandatory;
    }
    daySelectToggle(i) {
        this.days[i].active = !this.days[i].active;
    }
    addTimeSchedule() {
        this.schedule.timeSchedules.push({
            start: moment__WEBPACK_IMPORTED_MODULE_6__(this.time.start).format('hh:mm A'),
            end: moment__WEBPACK_IMPORTED_MODULE_6__(this.time.end).format('hh:mm A')
        });
        this.time.start = null;
        this.time.end = null;
    }
    disableAddTimeSchedule() {
        if (!this.time.start || !this.time.end) {
            return true;
        }
        else {
            return false;
        }
    }
    removeTimeSchedule(index) {
        this.schedule.timeSchedules.splice(index, 1);
    }
    addRegion(e) {
        console.log('regionId', e.target.value);
        this.regionId = e.target.value;
    }
    removeSubscriptions() {
        this.events.unsubscribe('services-feature:saveServiceSuccess');
        this.events.unsubscribe('services-feature:deleteServiceSuccess');
        this.events.unsubscribe('multi-region:publishActiveStatus');
        this.events.unsubscribe('multi-region:publishAllActiveRegions');
    }
};
CreateServicePage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
    { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__["Camera"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ActionSheetController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_7__["LabelService"] },
    { type: src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_8__["ConfigService"] }
];
CreateServicePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-create-service',
        template: __webpack_require__(/*! raw-loader!./create-service.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-services/create-service/create-service.page.html"),
        styles: [__webpack_require__(/*! ./create-service.page.scss */ "./src/app/admin/admin-services/create-service/create-service.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
        _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__["Camera"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ActionSheetController"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
        src_app_services_label_label_service__WEBPACK_IMPORTED_MODULE_7__["LabelService"],
        src_app_services_config_config_service__WEBPACK_IMPORTED_MODULE_8__["ConfigService"]])
], CreateServicePage);



/***/ })

}]);
//# sourceMappingURL=admin-admin-services-create-service-create-service-module-es2015.js.map