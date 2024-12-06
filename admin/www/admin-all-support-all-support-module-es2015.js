(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-all-support-all-support-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/all-support/all-support.page.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/all-support/all-support.page.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title class=\"ion-text-center\">Support</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<super-tabs (tabChange)=\"onTabSelect($event)\">\r\n  <super-tabs-toolbar slot=\"top\">\r\n    <super-tab-button>\r\n      <ion-label>Issues</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Queries</ion-label>\r\n    </super-tab-button>\r\n    <super-tab-button>\r\n      <ion-label>Requirements</ion-label>\r\n    </super-tab-button>\r\n  </super-tabs-toolbar>\r\n\r\n  <super-tabs-container swipeEnabled=\"true\">\r\n    <super-tab>\r\n      <ion-content class=\"ion-no-padding\">\r\n        <div class=\"main-container\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"2\" id=\"scroll1\">\r\n                <ion-button expand=\"block\" (click)=\"createNewIssue('issue')\" style=\"margin: 8px 0 0 8px;\">\r\n                  Add New +\r\n                </ion-button>\r\n                <div class=\"statusList\">\r\n                  <div *ngIf=\"supportList.length\">\r\n                    <p style=\"z-index: 1000\" *ngFor='let item of supportList; let idx=index'\r\n                      (click)=\"onClickStatustItem(idx,item)\"\r\n                      [ngStyle]=\"{'background-color': activeProjectIndex === idx ? 'var(--ion-color-categories-background)' : 'white' }\">\r\n                      {{item}}\r\n                    </p>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n\r\n              <ion-col size=\"10\" id=\"scroll2\">\r\n                <div class=\"feedbacks-wrapper\" *ngFor=\"let item of issues; let i = index\">\r\n                  <div class=\"feedbacks-wrap\" *ngIf=\"item.status == 'pending' && activeButton === 'Pending'\">\r\n                    <p><strong>Title: </strong>{{item.title}}</p>\r\n                    <p><strong>Description: </strong>{{item.description}}</p>\r\n                    <p><strong>Date: </strong>{{item.createdAt.toDate() | date: 'medium'}}</p>\r\n\r\n                    <div class=\"btn-wrap\">\r\n                      <ion-button (click)=\"viewDetails(i)\" shape=\"round\">\r\n                        view details <i class=\"flaticon-null-7\"></i>\r\n                      </ion-button>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"feedbacks-wrap\" *ngIf=\"item.status == 'inProgress' && activeButton === 'In Progress'\">\r\n                    <p><strong>Title: </strong>{{item.title}}</p>\r\n                    <p><strong>Description: </strong>{{item.description}}</p>\r\n                    <p><strong>Date: </strong>{{item.createdAt.toDate() | date: 'medium'}}</p>\r\n\r\n                    <div class=\"btn-wrap\">\r\n                      <ion-button (click)=\"viewDetails(i)\" shape=\"round\">\r\n                        view details <i class=\"flaticon-null-7\"></i>\r\n                      </ion-button>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"feedbacks-wrap\" *ngIf=\"item.status == 'resolved' && activeButton === 'Resolved'\">\r\n                    <p><strong>Title: </strong>{{item.title}}</p>\r\n                    <p><strong>Description: </strong>{{item.description}}</p>\r\n                    <p><strong>Date: </strong>{{item.createdAt.toDate() | date: 'medium'}}</p>\r\n\r\n                    <div class=\"btn-wrap\">\r\n                      <ion-button (click)=\"viewDetails(i)\" shape=\"round\">\r\n                        view details <i class=\"flaticon-null-7\"></i>\r\n                      </ion-button>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"feedbacks-wrap\" *ngIf=\"item.status == 'rejected' && activeButton === 'Rejected'\">\r\n                    <p><strong>Title: </strong>{{item.title}}</p>\r\n                    <p><strong>Description: </strong>{{item.description}}</p>\r\n                    <p><strong>Date: </strong>{{item.createdAt.toDate() | date: 'medium'}}</p>\r\n\r\n                    <div class=\"btn-wrap\">\r\n                      <ion-button (click)=\"viewDetails(i)\" shape=\"round\">\r\n                        view details <i class=\"flaticon-null-7\"></i>\r\n                      </ion-button>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <super-tab>\r\n        <ion-content class=\"ion-no-padding\">\r\n        <div class=\"main-container\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"2\" id=\"scroll1\">\r\n                <ion-button expand=\"block\" (click)=\"createNewIssue('queries')\" style=\"margin: 8px 0 0 8px;\">\r\n                  Add New +\r\n                </ion-button>\r\n                <div class=\"statusList\">\r\n                  <div *ngIf=\"supportList.length\">\r\n                    <p style=\"z-index: 1000\" *ngFor='let item of supportList; let idx=index'\r\n                      (click)=\"onClickStatustItem(idx,item)\"\r\n                      [ngStyle]=\"{'background-color': activeProjectIndex === idx ? 'var(--ion-color-categories-background)' : 'white' }\">\r\n                      {{item}}\r\n                    </p>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n              \r\n              <ion-col size=\"10\" id=\"scroll2\">\r\n                <div class=\"feedbacks-wrapper\" *ngFor=\"let item of queries; let i = index\">\r\n                  <div class=\"feedbacks-wrap\" *ngIf=\"item.status == 'pending' && activeButton === 'Pending'\">\r\n                    <p><strong>Title: </strong>{{item.title}}</p>\r\n                    <p><strong>Description: </strong>{{item.description}}</p>\r\n                    <p><strong>Date: </strong>{{item.createdAt.toDate() | date: 'medium'}}</p>\r\n                    <div class=\"btn-wrap\">\r\n                      <ion-button (click)=\"viewDetails(i)\" shape=\"round\">\r\n                        view details <i class=\"flaticon-null-7\"></i>\r\n                      </ion-button>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"feedbacks-wrap\" *ngIf=\"item.status == 'inProgress' && activeButton === 'In Progress'\">\r\n                    <p><strong>Title: </strong>{{item.title}}</p>\r\n                    <p><strong>Description: </strong>{{item.description}}</p>\r\n                    <p><strong>Date: </strong>{{item.createdAt.toDate() | date: 'medium'}}</p>\r\n                    <div class=\"btn-wrap\">\r\n                      <ion-button (click)=\"viewDetails(i)\" shape=\"round\">\r\n                        view details <i class=\"flaticon-null-7\"></i>\r\n                      </ion-button>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"feedbacks-wrap\" *ngIf=\"item.status == 'resolved' && activeButton === 'Resolved'\">\r\n                    <p><strong>Title: </strong>{{item.title}}</p>\r\n                    <p><strong>Description: </strong>{{item.description}}</p>\r\n                    <p><strong>Date: </strong>{{item.createdAt.toDate() | date: 'medium'}}</p>\r\n                    <div class=\"btn-wrap\">\r\n                      <ion-button (click)=\"viewDetails(i)\" shape=\"round\">\r\n                        view details <i class=\"flaticon-null-7\"></i>\r\n                      </ion-button>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"feedbacks-wrap\" *ngIf=\"item.status == 'rejected' && activeButton === 'Rejected'\">\r\n                    <p><strong>Title: </strong>{{item.title}}</p>\r\n                    <p><strong>Description: </strong>{{item.description}}</p>\r\n                    <p><strong>Date: </strong>{{item.createdAt.toDate() | date: 'medium'}}</p>\r\n\r\n                    <div class=\"btn-wrap\">\r\n                      <ion-button (click)=\"viewDetails(i)\" shape=\"round\">\r\n                        view details <i class=\"flaticon-null-7\"></i>\r\n                      </ion-button>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n\r\n    <super-tab>\r\n        <ion-content class=\"ion-no-padding\">\r\n        <div class=\"main-container\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"2\" id=\"scroll1\">\r\n                <ion-button expand=\"block\" (click)=\"createNewIssue('requirements')\" style=\"margin: 8px 0 0 8px;\">\r\n                  Add New +\r\n                </ion-button>\r\n                <div class=\"statusList\">\r\n                  <div *ngIf=\"supportList.length\">\r\n                    <p style=\"z-index: 1000\" *ngFor='let item of supportList; let idx=index'\r\n                      (click)=\"onClickStatustItem(idx,item)\"\r\n                      [ngStyle]=\"{'background-color': activeProjectIndex === idx ? 'var(--ion-color-categories-background)' : 'white' }\">\r\n                      {{item}}\r\n                    </p>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n              \r\n              <ion-col size=\"10\" id=\"scroll2\">\r\n                <div class=\"feedbacks-wrapper\" *ngFor=\"let item of requirements; let i = index\">\r\n                  <div class=\"feedbacks-wrap\" *ngIf=\"item.status == 'pending' && activeButton === 'Pending'\">\r\n                    <p><strong>Title: </strong>{{item.title}}</p>\r\n                    <p><strong>Description: </strong>{{item.description}}</p>\r\n                    <p><strong>Date: </strong>{{item.createdAt.toDate() | date: 'medium'}}</p>\r\n                    <div class=\"btn-wrap\">\r\n                      <ion-button (click)=\"viewDetails(i)\" shape=\"round\">\r\n                        view details <i class=\"flaticon-null-7\"></i>\r\n                      </ion-button>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"feedbacks-wrap\" *ngIf=\"item.status == 'inProgress' && activeButton === 'In Progress'\">\r\n                    <p><strong>Title: </strong>{{item.title}}</p>\r\n                    <p><strong>Description: </strong>{{item.description}}</p>\r\n                    <p><strong>Date: </strong>{{item.createdAt.toDate() | date: 'medium'}}</p>\r\n                    <div class=\"btn-wrap\">\r\n                      <ion-button (click)=\"viewDetails(i)\" shape=\"round\">\r\n                        view details <i class=\"flaticon-null-7\"></i>\r\n                      </ion-button>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"feedbacks-wrap\" *ngIf=\"item.status == 'resolved' && activeButton === 'Resolved'\">\r\n                    <p><strong>Title: </strong>{{item.title}}</p>\r\n                    <p><strong>Description: </strong>{{item.description}}</p>\r\n                    <p><strong>Date: </strong>{{item.createdAt.toDate() | date: 'medium'}}</p>\r\n                    <div class=\"btn-wrap\">\r\n                      <ion-button (click)=\"viewDetails(i)\" shape=\"round\">\r\n                        view details <i class=\"flaticon-null-7\"></i>\r\n                      </ion-button>\r\n                    </div>\r\n                  </div>\r\n                  \r\n                  <div class=\"feedbacks-wrap\" *ngIf=\"item.status == 'rejected' && activeButton === 'Rejected'\">\r\n                    <p><strong>Title: </strong>{{item.title}}</p>\r\n                    <p><strong>Description: </strong>{{item.description}}</p>\r\n                    <p><strong>Date: </strong>{{item.createdAt.toDate() | date: 'medium'}}</p>\r\n\r\n                    <div class=\"btn-wrap\">\r\n                      <ion-button (click)=\"viewDetails(i)\" shape=\"round\">\r\n                        view details <i class=\"flaticon-null-7\"></i>\r\n                      </ion-button>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n\r\n          </ion-grid>\r\n        </div>\r\n      </ion-content>\r\n    </super-tab>\r\n  </super-tabs-container>\r\n</super-tabs>\r\n"

/***/ }),

/***/ "./src/app/admin/all-support/all-support.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/admin/all-support/all-support.module.ts ***!
  \*********************************************************/
/*! exports provided: AllSupportPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllSupportPageModule", function() { return AllSupportPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _all_support_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./all-support.page */ "./src/app/admin/all-support/all-support.page.ts");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm2015/ionic-super-tabs-angular.js");








const routes = [
    {
        path: '',
        component: _all_support_page__WEBPACK_IMPORTED_MODULE_6__["AllSupportPage"]
    }
];
let AllSupportPageModule = class AllSupportPageModule {
};
AllSupportPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_7__["SuperTabsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_all_support_page__WEBPACK_IMPORTED_MODULE_6__["AllSupportPage"]],
    })
], AllSupportPageModule);



/***/ }),

/***/ "./src/app/admin/all-support/all-support.page.scss":
/*!*********************************************************!*\
  !*** ./src/app/admin/all-support/all-support.page.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  width: 100%;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 82vh;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 82vh;\n  margin-top: 8px;\n  border-left: 1px solid lightgray;\n  padding: 1rem;\n}\n\n#scroll2:hover {\n  overflow-y: auto;\n}\n\n.statusList {\n  text-align: center;\n}\n\n.statusList p {\n  font-size: medium;\n  border: 1px solid lightgray;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n  text-transform: capitalize;\n  border-radius: 6px;\n}\n\n.feedbacks-wrap {\n  margin-bottom: 1rem;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  padding: 10px;\n}\n\n.feedbacks-wrap:hover {\n  box-shadow: 0 2px 5px #ccc;\n}\n\n.feedbacks-wrap p {\n  margin-bottom: 8px;\n}\n\n.feedbacks-wrap .btn-wrap {\n  text-align: right;\n}\n\n.feedbacks-wrap span {\n  margin-left: 5px;\n}\n\n.feedbacks-wrap span .flaticon-call::before {\n  font-size: 10px;\n}\n\n.feedbacks-wrap span .flaticon-null-7::before {\n  font-size: 10px;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1,\n#scroll2 {\n    height: 92vh;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWxsLXN1cHBvcnQvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxhbGwtc3VwcG9ydFxcYWxsLXN1cHBvcnQucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9hbGwtc3VwcG9ydC9hbGwtc3VwcG9ydC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxnQkFBQTtFQUNBLFlBQUE7QUNFRjs7QURERTtFQUNFLGdCQUFBO0FDR0o7O0FEQ0E7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZ0NBQUE7RUFDQSxhQUFBO0FDRUY7O0FEREU7RUFDRSxnQkFBQTtBQ0dKOztBREFBO0VBQ0Usa0JBQUE7QUNHRjs7QURGRTtFQUNFLGlCQUFBO0VBQ0EsMkJBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSwwQkFBQTtFQUNBLGtCQUFBO0FDSUo7O0FEQUE7RUFFRSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0FDRUY7O0FEREU7RUFDRSwwQkFBQTtBQ0dKOztBRERFO0VBQ0Usa0JBQUE7QUNHSjs7QURERTtFQUNFLGlCQUFBO0FDR0o7O0FEREU7RUFDRSxnQkFBQTtBQ0dKOztBREZJO0VBQ0UsZUFBQTtBQ0lOOztBREZJO0VBQ0UsZUFBQTtBQ0lOOztBREFBO0VBQ0U7O0lBRUUsWUFBQTtFQ0dGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9hbGwtc3VwcG9ydC9hbGwtc3VwcG9ydC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbi1jb250YWluZXIge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbiNzY3JvbGwxIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGhlaWdodDogODJ2aDtcclxuICAmOmhvdmVyIHtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgfVxyXG59XHJcblxyXG4jc2Nyb2xsMiB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDgydmg7XHJcbiAgbWFyZ2luLXRvcDogOHB4O1xyXG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gIHBhZGRpbmc6IDFyZW07XHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxufVxyXG4uc3RhdHVzTGlzdCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHAge1xyXG4gICAgZm9udC1zaXplOiBtZWRpdW07XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgbWFyZ2luOiA4cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICB9XHJcbn1cclxuXHJcbi5mZWVkYmFja3Mtd3JhcCB7XHJcbiAgLy8gICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICAmOmhvdmVyIHtcclxuICAgIGJveC1zaGFkb3c6IDAgMnB4IDVweCAjY2NjO1xyXG4gIH1cclxuICBwIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDhweDtcclxuICB9XHJcbiAgLmJ0bi13cmFwIHtcclxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gIH1cclxuICBzcGFuIHtcclxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgICAuZmxhdGljb24tY2FsbDo6YmVmb3JlIHtcclxuICAgICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgfVxyXG4gICAgLmZsYXRpY29uLW51bGwtNzo6YmVmb3JlIHtcclxuICAgICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5AbWVkaWEgc2NyZWVuIGFuZChtaW4taGVpZ2h0OiAxMjAwcHgpIHtcclxuICAjc2Nyb2xsMSxcclxuICAjc2Nyb2xsMiB7XHJcbiAgICBoZWlnaHQ6IDkydmg7XHJcbiAgfVxyXG59XHJcbiIsIi5tYWluLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4jc2Nyb2xsMSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogODJ2aDtcbn1cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDgydmg7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIHBhZGRpbmc6IDFyZW07XG59XG4jc2Nyb2xsMjpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5zdGF0dXNMaXN0IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLnN0YXR1c0xpc3QgcCB7XG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbjogOHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG59XG5cbi5mZWVkYmFja3Mtd3JhcCB7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogMTBweDtcbn1cbi5mZWVkYmFja3Mtd3JhcDpob3ZlciB7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDVweCAjY2NjO1xufVxuLmZlZWRiYWNrcy13cmFwIHAge1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG59XG4uZmVlZGJhY2tzLXdyYXAgLmJ0bi13cmFwIHtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG4uZmVlZGJhY2tzLXdyYXAgc3BhbiB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG4uZmVlZGJhY2tzLXdyYXAgc3BhbiAuZmxhdGljb24tY2FsbDo6YmVmb3JlIHtcbiAgZm9udC1zaXplOiAxMHB4O1xufVxuLmZlZWRiYWNrcy13cmFwIHNwYW4gLmZsYXRpY29uLW51bGwtNzo6YmVmb3JlIHtcbiAgZm9udC1zaXplOiAxMHB4O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLWhlaWdodDogMTIwMHB4KSB7XG4gICNzY3JvbGwxLFxuI3Njcm9sbDIge1xuICAgIGhlaWdodDogOTJ2aDtcbiAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/all-support/all-support.page.ts":
/*!*******************************************************!*\
  !*** ./src/app/admin/all-support/all-support.page.ts ***!
  \*******************************************************/
/*! exports provided: AllSupportPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllSupportPage", function() { return AllSupportPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_support_support_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/support/support.service */ "./src/app/services/support/support.service.ts");
/* harmony import */ var _add_issues_modal_add_issues_modal_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../add-issues-modal/add-issues-modal.page */ "./src/app/admin/add-issues-modal/add-issues-modal.page.ts");
/* harmony import */ var _view_issues_modal_view_issues_modal_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../view-issues-modal/view-issues-modal.page */ "./src/app/admin/view-issues-modal/view-issues-modal.page.ts");






let AllSupportPage = class AllSupportPage {
    constructor(modalController, supportService) {
        this.modalController = modalController;
        this.supportService = supportService;
        this.supportList = [];
        this.activeProjectIndex = 0;
        this.activeButton = 'Pending';
    }
    ngOnInit() {
        this.supportList = [
            'Pending', 'In Progress', 'Resolved', 'Rejected'
        ];
    }
    ionViewWillEnter() {
        this.getAllIssue();
        this.getAllQueries();
        this.getAllRequirements();
    }
    onClickStatustItem(index, status) {
        this.activeProjectIndex = index;
        console.log(status);
        this.activeButton = status;
    }
    getAllIssue() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.issues = yield this.supportService.getSupportTypeData('issues');
            console.log(this.issues);
        });
    }
    getAllQueries() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.queries = yield this.supportService.getSupportTypeData('queries');
            console.log(this.queries);
        });
    }
    getAllRequirements() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.requirements = yield this.supportService.getSupportTypeData('requirements');
            console.log(this.requirements);
        });
    }
    createNewIssue(type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _add_issues_modal_add_issues_modal_page__WEBPACK_IMPORTED_MODULE_4__["AddIssuesModalPage"],
                // cssClass: 'my-custom-class',
                cssClass: 'custom-modal',
                componentProps: {
                    supportType: type
                },
            });
            modal.onDidDismiss().then(res => {
                console.log('modal onDidDismiss...');
                if (this.currentTabIndex == 0) {
                    this.getAllIssue();
                }
                else if (this.currentTabIndex == 1) {
                    this.getAllQueries();
                }
                else if (this.currentTabIndex == 2) {
                    this.getAllRequirements();
                }
            });
            yield modal.present();
        });
    }
    viewDetails(i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.currentTabIndex == 0) {
                const modal = yield this.modalController.create({
                    component: _view_issues_modal_view_issues_modal_page__WEBPACK_IMPORTED_MODULE_5__["ViewIssuesModalPage"],
                    // cssClass: 'my-custom-class',
                    cssClass: 'custom-modal',
                    componentProps: {
                        supportTypeData: this.issues[i],
                        supportShowPage: this.currentTabIndex
                    },
                });
                yield modal.present();
            }
            else if (this.currentTabIndex == 1) {
                const modal = yield this.modalController.create({
                    component: _view_issues_modal_view_issues_modal_page__WEBPACK_IMPORTED_MODULE_5__["ViewIssuesModalPage"],
                    // cssClass: 'my-custom-class',
                    cssClass: 'custom-modal',
                    componentProps: {
                        supportTypeData: this.queries[i],
                        supportShowPage: this.currentTabIndex
                    },
                });
                yield modal.present();
            }
            else if (this.currentTabIndex == 2) {
                const modal = yield this.modalController.create({
                    component: _view_issues_modal_view_issues_modal_page__WEBPACK_IMPORTED_MODULE_5__["ViewIssuesModalPage"],
                    // cssClass: 'my-custom-class',
                    cssClass: 'custom-modal',
                    componentProps: {
                        supportTypeData: this.requirements[i],
                        supportShowPage: this.currentTabIndex
                    },
                });
                yield modal.present();
            }
        });
    }
    onTabSelect(ev) {
        this.currentTabIndex = ev.detail.index;
        console.log('this---', this.currentTabIndex);
    }
};
AllSupportPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: src_app_services_support_support_service__WEBPACK_IMPORTED_MODULE_3__["SupportService"] }
];
AllSupportPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-all-support',
        template: __webpack_require__(/*! raw-loader!./all-support.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/all-support/all-support.page.html"),
        styles: [__webpack_require__(/*! ./all-support.page.scss */ "./src/app/admin/all-support/all-support.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"], src_app_services_support_support_service__WEBPACK_IMPORTED_MODULE_3__["SupportService"]])
], AllSupportPage);



/***/ })

}]);
//# sourceMappingURL=admin-all-support-all-support-module-es2015.js.map