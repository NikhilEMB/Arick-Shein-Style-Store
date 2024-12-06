(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-services-service-requests-service-requests-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-services/service-requests/service-requests.page.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-services/service-requests/service-requests.page.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button class=\"custom-back-button\" defaultHref=\"admin-home\"></ion-back-button>\r\n    </ion-buttons>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n\r\n  <super-tabs no-shadow no-border>\r\n    <super-tabs-toolbar slot=\"top\">\r\n      <super-tab-button>\r\n        <ion-label>Pending</ion-label>\r\n      </super-tab-button>\r\n      <super-tab-button>\r\n        <ion-label>Completed</ion-label>\r\n      </super-tab-button>\r\n    </super-tabs-toolbar>\r\n\r\n    <super-tabs-container>\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container\">\r\n          <div class=\"spinner\" *ngIf=\"showLoader; else requestsLoaded;\">\r\n            <ion-spinner color=\"primary\"></ion-spinner>\r\n          </div>\r\n\r\n          <ng-template #requestsLoaded>\r\n            <div class=\"no-data\" *ngIf=\"!requests.length; else pendingReq;\" text-center>\r\n              <img src=\"assets/img/no-category.png\" alt=\"\">\r\n              <h6>No requests</h6>\r\n            </div>\r\n            <ng-template #pendingReq>\r\n              <div class=\"no-data\" *ngIf=\"!isPending; else hasPending;\" text-center style=\"margin-left: -90px;\">\r\n                <img src=\"assets/img/no-category.png\" alt=\"\">\r\n                <h6>No pending requests</h6>\r\n              </div>\r\n              <ng-template #hasPending>\r\n                <div class=\"sr-all-requests\">\r\n                  <div *ngFor=\"let req of requests;\">\r\n                    <div class=\"sr-request\" *ngIf=\"req.status === 'Pending'\">\r\n                      <p><strong>Service Name: </strong>{{req.serviceName}}</p>\r\n                      <div class=\"content-alignment\">\r\n                        <p><strong>Customer Name: </strong>{{req.userName}}</p>\r\n                        <p><strong>Customer Contact: </strong>{{req.userPhone}}</p>\r\n                        <p><strong>Request Date: </strong>{{getDateTimeFormat(req.responseAt.toDate())}}</p>\r\n                      </div>\r\n                      <div class=\"btn-wrap\">\r\n                        <ion-button (click)=\"viewDetails(req)\" shape=\"round\">\r\n                          View Details<span><i class=\"flaticon-null-7\"></i></span>\r\n                        </ion-button>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </ng-template>\r\n\r\n            </ng-template>\r\n          </ng-template>\r\n        </div>\r\n        </ion-content>\r\n      </super-tab>\r\n      <super-tab>\r\n        <ion-content>\r\n          <div class=\"main-container\">\r\n            <div class=\"no-data\" *ngIf=\"!requests.length; else completedReq;\" text-center>\r\n              <img src=\"assets/img/no-category.png\" alt=\"\">\r\n              <h6>No requests</h6>\r\n            </div>\r\n            <ng-template #completedReq>\r\n              <div class=\"no-data\" *ngIf=\"!isCompleted; else hasCompleted;\" text-center style=\"margin-left: -90px;\">\r\n                <img src=\"assets/img/no-category.png\" alt=\"\">\r\n                <h6>No completed requests</h6>\r\n              </div>\r\n              <ng-template #hasCompleted>\r\n                <div class=\"sr-all-requests\">\r\n                  <div *ngFor=\"let req of requests; let i=index;\">\r\n                    <div class=\"sr-request\" *ngIf=\"req.status === 'Completed'\">\r\n                      <p><strong>Service Name: </strong>{{req.serviceName}}</p>\r\n                      <div class=\"content-alignment\">\r\n                        <p><strong>Customer Name: </strong>{{req.userName}}</p>\r\n                        <p><strong>Customer Contact: </strong>{{req.userPhone}}</p>\r\n                        <p><strong>Request Date: </strong>{{getDateTimeFormat(req.responseAt.toDate())}}</p>\r\n                      </div>\r\n                      <div class=\"btn-wrap\">\r\n                        <ion-button (click)=\"viewDetails(req)\" shape=\"round\">\r\n                          View Details<span><i class=\"flaticon-null-7\"></i></span>\r\n                        </ion-button>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </ng-template>\r\n\r\n          </ng-template>\r\n        </div>\r\n        </ion-content>\r\n      </super-tab>\r\n    </super-tabs-container>\r\n  </super-tabs>\r\n\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/admin-services/service-requests/service-requests.module.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/admin/admin-services/service-requests/service-requests.module.ts ***!
  \**********************************************************************************/
/*! exports provided: ServiceRequestsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceRequestsPageModule", function() { return ServiceRequestsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic-super-tabs/angular */ "./node_modules/@ionic-super-tabs/angular/fesm5/ionic-super-tabs-angular.js");
/* harmony import */ var src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/shared.module */ "./src/app/components/shared.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _service_requests_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./service-requests.page */ "./src/app/admin/admin-services/service-requests/service-requests.page.ts");









var routes = [
    {
        path: '',
        component: _service_requests_page__WEBPACK_IMPORTED_MODULE_8__["ServiceRequestsPage"]
    }
];
var ServiceRequestsPageModule = /** @class */ (function () {
    function ServiceRequestsPageModule() {
    }
    ServiceRequestsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forChild(routes),
                src_app_components_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                _ionic_super_tabs_angular__WEBPACK_IMPORTED_MODULE_1__["SuperTabsModule"]
            ],
            declarations: [_service_requests_page__WEBPACK_IMPORTED_MODULE_8__["ServiceRequestsPage"]]
        })
    ], ServiceRequestsPageModule);
    return ServiceRequestsPageModule;
}());



/***/ }),

/***/ "./src/app/admin/admin-services/service-requests/service-requests.page.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/admin/admin-services/service-requests/service-requests.page.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sr-all-requests {\n  font-size: 14px;\n  margin-top: 10px;\n}\n\n.sr-request {\n  margin-top: 10px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 10px;\n}\n\n.sr-request .btn-wrap {\n  text-align: right;\n}\n\n.sr-request span {\n  margin-left: 5px;\n}\n\n.sr-request span .flaticon-call::before {\n  font-size: 10px;\n}\n\n.sr-request span .flaticon-null-7::before {\n  font-size: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tc2VydmljZXMvc2VydmljZS1yZXF1ZXN0cy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGFkbWluLXNlcnZpY2VzXFxzZXJ2aWNlLXJlcXVlc3RzXFxzZXJ2aWNlLXJlcXVlc3RzLnBhZ2Uuc2NzcyIsInNyYy9hcHAvYWRtaW4vYWRtaW4tc2VydmljZXMvc2VydmljZS1yZXF1ZXN0cy9zZXJ2aWNlLXJlcXVlc3RzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtBQ0NKOztBREVBO0VBQ0ksZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtBQ0NKOztBREFJO0VBQ0ksaUJBQUE7QUNFUjs7QURBSTtFQUNJLGdCQUFBO0FDRVI7O0FERFE7RUFDSSxlQUFBO0FDR1o7O0FERFE7RUFDSSxlQUFBO0FDR1oiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9hZG1pbi1zZXJ2aWNlcy9zZXJ2aWNlLXJlcXVlc3RzL3NlcnZpY2UtcmVxdWVzdHMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNyLWFsbC1yZXF1ZXN0cyB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG59XHJcblxyXG4uc3ItcmVxdWVzdCB7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICAuYnRuLXdyYXB7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICB9XHJcbiAgICBzcGFuIHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gICAgICAgIC5mbGF0aWNvbi1jYWxsOjpiZWZvcmUge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5mbGF0aWNvbi1udWxsLTc6OmJlZm9yZSB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIuc3ItYWxsLXJlcXVlc3RzIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuXG4uc3ItcmVxdWVzdCB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcGFkZGluZzogMTBweDtcbn1cbi5zci1yZXF1ZXN0IC5idG4td3JhcCB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuLnNyLXJlcXVlc3Qgc3BhbiB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG4uc3ItcmVxdWVzdCBzcGFuIC5mbGF0aWNvbi1jYWxsOjpiZWZvcmUge1xuICBmb250LXNpemU6IDEwcHg7XG59XG4uc3ItcmVxdWVzdCBzcGFuIC5mbGF0aWNvbi1udWxsLTc6OmJlZm9yZSB7XG4gIGZvbnQtc2l6ZTogMTBweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/admin-services/service-requests/service-requests.page.ts":
/*!********************************************************************************!*\
  !*** ./src/app/admin/admin-services/service-requests/service-requests.page.ts ***!
  \********************************************************************************/
/*! exports provided: ServiceRequestsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceRequestsPage", function() { return ServiceRequestsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);




//import { CallNumber } from '@ionic-native/call-number/ngx';

var ServiceRequestsPage = /** @class */ (function () {
    function ServiceRequestsPage(events, router) {
        this.events = events;
        this.router = router;
        this.requests = [];
        this.showLoader = true;
        this.isPending = false;
        this.isCompleted = false;
    }
    ServiceRequestsPage.prototype.ngOnInit = function () {
    };
    ServiceRequestsPage.prototype.ionViewWillEnter = function () {
        this.initializeSubscriptions();
        this.events.publish('services-feature:getAllRequests');
    };
    ServiceRequestsPage.prototype.ionViewWillLeave = function () {
        this.removeSubscriptions();
    };
    ServiceRequestsPage.prototype.getDateTimeFormat = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_4__(date).format('MMM D, YYYY hh:mm a');
    };
    ServiceRequestsPage.prototype.initializeSubscriptions = function () {
        var _this = this;
        this.events.subscribe('services-feature:publishAllRequests', function (requests) {
            _this.checkRequests(requests);
            _this.requests = requests;
            console.log('this.requests', _this.requests);
            _this.showLoader = false;
        });
    };
    ServiceRequestsPage.prototype.checkRequests = function (reqs) {
        var _this = this;
        reqs.forEach(function (r) {
            if (r.status === 'Pending') {
                _this.isPending = true;
            }
            if (r.status === 'Completed') {
                _this.isCompleted = true;
            }
        });
    };
    ServiceRequestsPage.prototype.callUser = function (phone) {
        /* this.callNumber.callNumber(phone, true)
         .then(res => console.log('Launched dialer!', res))
         .catch(err => console.log('Error launching dialer', err));*/
    };
    ServiceRequestsPage.prototype.viewDetails = function (req) {
        var navigationExtras = {
            state: {
                requestData: req
            }
        };
        this.router.navigate(['request-complete'], navigationExtras);
    };
    ServiceRequestsPage.prototype.removeSubscriptions = function () {
        this.events.unsubscribe('services-feature:publishAllRequests');
    };
    ServiceRequestsPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
    ]; };
    ServiceRequestsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-service-requests',
            template: __webpack_require__(/*! raw-loader!./service-requests.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-services/service-requests/service-requests.page.html"),
            styles: [__webpack_require__(/*! ./service-requests.page.scss */ "./src/app/admin/admin-services/service-requests/service-requests.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], ServiceRequestsPage);
    return ServiceRequestsPage;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-services-service-requests-service-requests-module-es5.js.map