(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-your-identity-your-identity-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/home/your-identity/your-identity.page.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/home/your-identity/your-identity.page.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar class=\"toolbar\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button defaultHref=\"shop-categories\" class=\"custom-back-button\"></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title text-center>your identity</ion-title>\r\n  </ion-toolbar>\r\n\r\n</ion-header>\r\n\r\n<ion-content>\r\n\r\n  <ion-grid class=\"identity margining\">\r\n    <div class=\"input-box\">\r\n            <ion-row class=\"ion-align-items-center\">\r\n                    <div class=\"identity-input\">\r\n                      <ion-input type=\"text\" placeholder=\"Enter your name\" [(ngModel)]=\"userName\"></ion-input>\r\n                    </div>\r\n                    <div class=\"checkmark\" *ngIf=\"!showLoader\">\r\n                          <i class=\"flaticon-null-20\" (click) = \"updateUserName();\"></i>\r\n                    </div>\r\n                    <div class=\"loader\" *ngIf=\"showLoader\">\r\n                      <ion-spinner color = \"primary\"></ion-spinner>\r\n                    </div>\r\n                  </ion-row>\r\n    </div>\r\n    \r\n  </ion-grid>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/home/your-identity/your-identity.module.ts":
/*!************************************************************!*\
  !*** ./src/app/home/your-identity/your-identity.module.ts ***!
  \************************************************************/
/*! exports provided: YourIdentityPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YourIdentityPageModule", function() { return YourIdentityPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _your_identity_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./your-identity.page */ "./src/app/home/your-identity/your-identity.page.ts");







const routes = [
    {
        path: '',
        component: _your_identity_page__WEBPACK_IMPORTED_MODULE_6__["YourIdentityPage"]
    }
];
let YourIdentityPageModule = class YourIdentityPageModule {
};
YourIdentityPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_your_identity_page__WEBPACK_IMPORTED_MODULE_6__["YourIdentityPage"]]
    })
], YourIdentityPageModule);



/***/ }),

/***/ "./src/app/home/your-identity/your-identity.page.scss":
/*!************************************************************!*\
  !*** ./src/app/home/your-identity/your-identity.page.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".identity {\n  margin-top: 50%;\n  border: 1px solid var(--ion-color-border-rgb);\n  border-radius: 30px;\n  box-shadow: 0px 0px 13px 0px var(--ion-color-shadow-rgb);\n}\n\n:host .item-interactive.ion-valid {\n  --highlight-background: none;\n}\n\n.input-box {\n  position: relative;\n}\n\n.checkmark {\n  position: absolute;\n  right: 0px;\n  top: 0px;\n}\n\n.loader {\n  position: absolute;\n  right: 0px;\n  top: 0px;\n}\n\n.identity-input {\n  width: 90%;\n}\n\n.flaticon-null-20::before {\n  color: var(--ion-color-primary);\n  font-size: 25px;\n}\n\n.margining {\n  margin-right: 15px;\n  margin-left: 15px;\n}\n\nion-input {\n  --padding-bottom: 3px;\n  --padding-top: 5px;\n  --padding-start: 10px;\n  text-transform: capitalize;\n}\n\n@media screen and (min-width: 768px) {\n  .margining {\n    margin-right: 55px;\n    margin-left: 55px;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .margining {\n    margin-right: 60px;\n    margin-left: 60px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS95b3VyLWlkZW50aXR5L0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxob21lXFx5b3VyLWlkZW50aXR5XFx5b3VyLWlkZW50aXR5LnBhZ2Uuc2NzcyIsInNyYy9hcHAvaG9tZS95b3VyLWlkZW50aXR5L3lvdXItaWRlbnRpdHkucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksZUFBQTtFQUNBLDZDQUFBO0VBQ0EsbUJBQUE7RUFDQSx3REFBQTtBQ0FKOztBREdJO0VBQ0UsNEJBQUE7QUNBTjs7QURHRTtFQUNFLGtCQUFBO0FDQUo7O0FERUE7RUFDSSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0FDQ0o7O0FEQ0E7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0FDRUY7O0FEQUE7RUFDRSxVQUFBO0FDR0Y7O0FEREE7RUFDSSwrQkFBQTtFQUNBLGVBQUE7QUNJSjs7QURGQTtFQUNJLGtCQUFBO0VBQ0EsaUJBQUE7QUNLSjs7QURIQTtFQUNJLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLDBCQUFBO0FDTUo7O0FERkU7RUFDRTtJQUNJLGtCQUFBO0lBQ0EsaUJBQUE7RUNLTjtBQUNGOztBREhFO0VBQ0U7SUFDSSxrQkFBQTtJQUNBLGlCQUFBO0VDS047QUFDRiIsImZpbGUiOiJzcmMvYXBwL2hvbWUveW91ci1pZGVudGl0eS95b3VyLWlkZW50aXR5LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4uaWRlbnRpdHl7XHJcbiAgICBtYXJnaW4tdG9wOiA1MCU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItYm9yZGVyLXJnYik7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4OyBcclxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggMTNweCAwcHggdmFyKCAtLWlvbi1jb2xvci1zaGFkb3ctcmdiKTtcclxufVxyXG46aG9zdCB7XHJcbiAgICAuaXRlbS1pbnRlcmFjdGl2ZS5pb24tdmFsaWR7XHJcbiAgICAgIC0taGlnaGxpZ2h0LWJhY2tncm91bmQ6IG5vbmU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC5pbnB1dC1ib3h7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuLmNoZWNrbWFya3tcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgXHJcbiAgICByaWdodDogMHB4O1xyXG4gICAgdG9wOiAwcHg7XHJcbn1cclxuLmxvYWRlcntcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7IFxyXG4gIHJpZ2h0OiAwcHg7XHJcbiAgdG9wOiAwcHg7XHJcbn1cclxuLmlkZW50aXR5LWlucHV0e1xyXG4gIHdpZHRoOiA5MCU7XHJcbn1cclxuLmZsYXRpY29uLW51bGwtMjA6OmJlZm9yZXtcclxuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XHJcbiAgICBmb250LXNpemU6IDI1cHg7XHJcbn1cclxuLm1hcmdpbmluZ3tcclxuICAgIG1hcmdpbi1yaWdodDogMTVweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAxNXB4O1xyXG59XHJcbmlvbi1pbnB1dHtcclxuICAgIC0tcGFkZGluZy1ib3R0b206IDNweDtcclxuICAgIC0tcGFkZGluZy10b3A6IDVweDtcclxuICAgIC0tcGFkZGluZy1zdGFydDogMTBweDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG4gIH1cclxuXHJcbiAgLy9NRURJQSBRVUVSSUVTXHJcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo3NjhweCl7XHJcbiAgICAubWFyZ2luaW5ne1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogNTVweDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogNTVweDtcclxuICAgIH1cclxuICB9XHJcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDoxMDAwcHgpe1xyXG4gICAgLm1hcmdpbmluZ3tcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDYwcHg7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDYwcHg7XHJcbiAgICB9XHJcblxyXG4gIH0iLCIuaWRlbnRpdHkge1xuICBtYXJnaW4tdG9wOiA1MCU7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1ib3JkZXItcmdiKTtcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcbiAgYm94LXNoYWRvdzogMHB4IDBweCAxM3B4IDBweCB2YXIoLS1pb24tY29sb3Itc2hhZG93LXJnYik7XG59XG5cbjpob3N0IC5pdGVtLWludGVyYWN0aXZlLmlvbi12YWxpZCB7XG4gIC0taGlnaGxpZ2h0LWJhY2tncm91bmQ6IG5vbmU7XG59XG5cbi5pbnB1dC1ib3gge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5jaGVja21hcmsge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwcHg7XG4gIHRvcDogMHB4O1xufVxuXG4ubG9hZGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMHB4O1xuICB0b3A6IDBweDtcbn1cblxuLmlkZW50aXR5LWlucHV0IHtcbiAgd2lkdGg6IDkwJTtcbn1cblxuLmZsYXRpY29uLW51bGwtMjA6OmJlZm9yZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGZvbnQtc2l6ZTogMjVweDtcbn1cblxuLm1hcmdpbmluZyB7XG4gIG1hcmdpbi1yaWdodDogMTVweDtcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XG59XG5cbmlvbi1pbnB1dCB7XG4gIC0tcGFkZGluZy1ib3R0b206IDNweDtcbiAgLS1wYWRkaW5nLXRvcDogNXB4O1xuICAtLXBhZGRpbmctc3RhcnQ6IDEwcHg7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAubWFyZ2luaW5nIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDU1cHg7XG4gICAgbWFyZ2luLWxlZnQ6IDU1cHg7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCkge1xuICAubWFyZ2luaW5nIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDYwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IDYwcHg7XG4gIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/home/your-identity/your-identity.page.ts":
/*!**********************************************************!*\
  !*** ./src/app/home/your-identity/your-identity.page.ts ***!
  \**********************************************************/
/*! exports provided: YourIdentityPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YourIdentityPage", function() { return YourIdentityPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/user/user.service */ "./src/app/services/user/user.service.ts");





let YourIdentityPage = class YourIdentityPage {
    constructor(router, events, alertController, userService, route) {
        this.router = router;
        this.events = events;
        this.alertController = alertController;
        this.userService = userService;
        this.route = route;
        this.userName = '';
        this.showLoader = false;
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.userId = this.router.getCurrentNavigation().extras.state.userId;
            }
        });
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        this.initializeSubscriptions();
    }
    ionViewWillLeave() {
        this.removeSubscriptions();
    }
    initializeSubscriptions() {
        this.events.subscribe('user:updateNameOfNewUserSuccess', () => {
            this.showLoader = false;
            this.router.navigate(['shop-categories']);
        });
    }
    updateUserName() {
        //console.log('username:', this.userName);
        if (this.userName === '') {
            this.presentAlert('Please enter your name');
        }
        else {
            this.showLoader = true;
            this.events.publish('user:updateNameOfNewUser', this.userName, this.userId);
        }
    }
    presentAlert(desc) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                message: desc,
                buttons: [{
                        text: 'Ok',
                        handler: () => {
                            //console.log('Confirm Okay');
                        }
                    }]
            });
            yield alert.present();
        });
    }
    removeSubscriptions() {
        this.events.unsubscribe('user:updateNameOfNewUserSuccess');
    }
};
YourIdentityPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
    { type: src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }
];
YourIdentityPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-your-identity',
        template: __webpack_require__(/*! raw-loader!./your-identity.page.html */ "./node_modules/raw-loader/index.js!./src/app/home/your-identity/your-identity.page.html"),
        styles: [__webpack_require__(/*! ./your-identity.page.scss */ "./src/app/home/your-identity/your-identity.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
        src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
], YourIdentityPage);



/***/ })

}]);
//# sourceMappingURL=home-your-identity-your-identity-module-es2015.js.map