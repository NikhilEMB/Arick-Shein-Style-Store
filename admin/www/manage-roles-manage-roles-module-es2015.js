(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["manage-roles-manage-roles-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/manage-roles/manage-roles.page.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/manage-roles/manage-roles.page.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>Manage Roles</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <div class=\"user-container\" *ngFor=\"let user of users; let i=index\">\r\n      <div class=\"user-wrapper\">\r\n        <div class=\"title\">\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"4\">\r\n                <div class=\"flex-label\">{{user.name}}</div>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <div class=\"flex-label\">{{user.number}}</div>\r\n              </ion-col>\r\n              <ion-col size=\"4\">\r\n                <div class=\"flex-label\">\r\n                <label>Active</label>\r\n                <ion-toggle [(ngModel)]=\"user.status\"></ion-toggle>\r\n              </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </div>\r\n        <div class=\"roles\">\r\n          <ion-list class=\"roles-list\" lines=\"none\">\r\n            <ion-item *ngFor=\"let role of user.roles\">\r\n              <ion-label>{{role.role}}</ion-label>\r\n              <ion-checkbox slot=\"start\" [(ngModel)]=\"role.status\"></ion-checkbox>\r\n            </ion-item>\r\n          </ion-list>\r\n        </div>\r\n        <div class=\"btn-wrap\">\r\n\r\n          <ion-button  shape=\"round\" class=\"btn-1 i-start\" color=\"danger\">\r\n            <i class=\"flaticon-null-21\"></i>\r\n            Delete\r\n          </ion-button>\r\n          <ion-button  shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n            <i class=\"flaticon-null-20 margin-icon\"></i>\r\n            Save\r\n          </ion-button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/manage-roles/manage-roles.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/manage-roles/manage-roles.module.ts ***!
  \*****************************************************/
/*! exports provided: ManageRolesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageRolesPageModule", function() { return ManageRolesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _manage_roles_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./manage-roles.page */ "./src/app/manage-roles/manage-roles.page.ts");







const routes = [
    {
        path: '',
        component: _manage_roles_page__WEBPACK_IMPORTED_MODULE_6__["ManageRolesPage"]
    }
];
let ManageRolesPageModule = class ManageRolesPageModule {
};
ManageRolesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_manage_roles_page__WEBPACK_IMPORTED_MODULE_6__["ManageRolesPage"]]
    })
], ManageRolesPageModule);



/***/ }),

/***/ "./src/app/manage-roles/manage-roles.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/manage-roles/manage-roles.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".user-wrapper {\n  border: #aaa 1px solid;\n  margin-bottom: 16px;\n}\n.user-wrapper .title {\n  background: #ddd;\n}\n.roles {\n  padding: 16px;\n}\n.roles .roles-list {\n  display: -webkit-box;\n  display: flex;\n}\n.roles .roles-list ion-item {\n  --background: #ccc;\n  border-radius: 100px;\n  margin-right: 8px;\n}\n.btn-wrap {\n  text-align: right;\n  padding: 16px;\n}\n.btn-wrap ion-button {\n  margin-left: 16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWFuYWdlLXJvbGVzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxtYW5hZ2Utcm9sZXNcXG1hbmFnZS1yb2xlcy5wYWdlLnNjc3MiLCJzcmMvYXBwL21hbmFnZS1yb2xlcy9tYW5hZ2Utcm9sZXMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksc0JBQUE7RUFDQSxtQkFBQTtBQ0NKO0FEQUk7RUFDSSxnQkFBQTtBQ0VSO0FER0E7RUFDSSxhQUFBO0FDQUo7QURDSTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtBQ0NSO0FEQVE7RUFDSSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7QUNFWjtBRElBO0VBQ0ksaUJBQUE7RUFDQSxhQUFBO0FDREo7QURFSTtFQUNJLGlCQUFBO0FDQVIiLCJmaWxlIjoic3JjL2FwcC9tYW5hZ2Utcm9sZXMvbWFuYWdlLXJvbGVzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi51c2VyLXdyYXBwZXJ7XHJcbiAgICBib3JkZXI6ICNhYWEgMXB4IHNvbGlkO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxuICAgIC50aXRsZXtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjZGRkO1xyXG4gICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbi5yb2xlc3tcclxuICAgIHBhZGRpbmc6IDE2cHg7XHJcbiAgICAucm9sZXMtbGlzdHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGlvbi1pdGVte1xyXG4gICAgICAgICAgICAtLWJhY2tncm91bmQ6ICNjY2M7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDhweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4uYnRuLXdyYXB7XHJcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgIHBhZGRpbmc6IDE2cHg7XHJcbiAgICBpb24tYnV0dG9ue1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxNnB4O1xyXG4gICAgfVxyXG59IiwiLnVzZXItd3JhcHBlciB7XG4gIGJvcmRlcjogI2FhYSAxcHggc29saWQ7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG59XG4udXNlci13cmFwcGVyIC50aXRsZSB7XG4gIGJhY2tncm91bmQ6ICNkZGQ7XG59XG5cbi5yb2xlcyB7XG4gIHBhZGRpbmc6IDE2cHg7XG59XG4ucm9sZXMgLnJvbGVzLWxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuLnJvbGVzIC5yb2xlcy1saXN0IGlvbi1pdGVtIHtcbiAgLS1iYWNrZ3JvdW5kOiAjY2NjO1xuICBib3JkZXItcmFkaXVzOiAxMDBweDtcbiAgbWFyZ2luLXJpZ2h0OiA4cHg7XG59XG5cbi5idG4td3JhcCB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBwYWRkaW5nOiAxNnB4O1xufVxuLmJ0bi13cmFwIGlvbi1idXR0b24ge1xuICBtYXJnaW4tbGVmdDogMTZweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/manage-roles/manage-roles.page.ts":
/*!***************************************************!*\
  !*** ./src/app/manage-roles/manage-roles.page.ts ***!
  \***************************************************/
/*! exports provided: ManageRolesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageRolesPage", function() { return ManageRolesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ManageRolesPage = class ManageRolesPage {
    constructor() {
        this.users = [
            {
                name: "Dinesh Chauhan",
                number: '9818913424',
                status: true,
                roles: [
                    {
                        role: "Reports",
                        status: true
                    },
                    {
                        role: "Orders",
                        status: true
                    },
                    {
                        role: "Produt",
                        status: true
                    }
                ]
            },
            {
                name: "Dinesh Chauhan",
                number: '9818913424',
                status: true,
                roles: [
                    {
                        role: "Reports",
                        status: true
                    },
                    {
                        role: "Orders",
                        status: true
                    },
                    {
                        role: "Produt",
                        status: true
                    }
                ]
            }
        ];
    }
    ngOnInit() {
    }
};
ManageRolesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-manage-roles',
        template: __webpack_require__(/*! raw-loader!./manage-roles.page.html */ "./node_modules/raw-loader/index.js!./src/app/manage-roles/manage-roles.page.html"),
        styles: [__webpack_require__(/*! ./manage-roles.page.scss */ "./src/app/manage-roles/manage-roles.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], ManageRolesPage);



/***/ })

}]);
//# sourceMappingURL=manage-roles-manage-roles-module-es2015.js.map