(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-branches-branches-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/branches/branches.page.html":
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/branches/branches.page.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\">\r\n      <img src=\"../../../assets/img/shop-logo.png\" />\r\n    </div>\r\n    <ion-title>Branches</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <div class=\"\" text-center>\r\n      <ion-button (click)=\"editBranch()\">ADD Branch</ion-button>\r\n    </div>\r\n    <ng-container *ngIf=\"branches.length; else noBranches\">\r\n      <ion-searchbar [(ngModel)]=\"searchInput\" mode=\"ios\" animated showCancelButton=\"focus\"\r\n        placeholder=\"Search vendor\"></ion-searchbar>\r\n      <div class=\"tableArea\">\r\n        <table>\r\n          <thead>\r\n            <tr class=\"header\">\r\n              <th>SN No</th>\r\n              <th>Branch Name</th>\r\n              <th>Branch Email</th>\r\n              <th>Branch phone</th>\r\n              <th>Action</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let item of branches | filter: searchInput; index as i\">\r\n              <td>{{i + 1}}</td>\r\n              <td>{{item.name}}</td>\r\n              <td>{{item.email}}</td>\r\n              <td>{{item.phoneNo}}</td>\r\n              <td>\r\n                <ion-button size=\"small\" color=\"primary\" fill=\"outline\" (click)=\"editBranch(item)\">Edit</ion-button>\r\n                &nbsp;\r\n                <ion-button size=\"small\" color=\"danger\" fill=\"outline\"\r\n                  (click)=\"askDeleteBranch(item)\">Delete</ion-button>\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </ng-container>\r\n    <ng-template #noBranches>\r\n      <h1 text-center>No Branch found!</h1>\r\n    </ng-template>\r\n  </div>\r\n\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/branches/branches.module.ts":
/*!***************************************************!*\
  !*** ./src/app/admin/branches/branches.module.ts ***!
  \***************************************************/
/*! exports provided: BranchesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BranchesPageModule", function() { return BranchesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _branches_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./branches.page */ "./src/app/admin/branches/branches.page.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.js");








const routes = [
    {
        path: '',
        component: _branches_page__WEBPACK_IMPORTED_MODULE_6__["BranchesPage"]
    }
];
let BranchesPageModule = class BranchesPageModule {
};
BranchesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__["Ng2SearchPipeModule"]
        ],
        declarations: [_branches_page__WEBPACK_IMPORTED_MODULE_6__["BranchesPage"]]
    })
], BranchesPageModule);



/***/ }),

/***/ "./src/app/admin/branches/branches.page.scss":
/*!***************************************************!*\
  !*** ./src/app/admin/branches/branches.page.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".tableArea {\n  margin-top: 1rem;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.tableArea table {\n  border-collapse: collapse;\n  width: 100%;\n}\n.tableArea table td,\n.tableArea table th {\n  border: 1px solid #dddddd;\n  text-align: center;\n  padding: 8px;\n}\n.tableArea table tr:hover {\n  background-color: #efefef;\n}\n.tableArea .header {\n  background: lightgray;\n}\n.tableArea .deleteIcon {\n  font-size: 18px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYnJhbmNoZXMvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFxicmFuY2hlc1xcYnJhbmNoZXMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9icmFuY2hlcy9icmFuY2hlcy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUVBLGtCQUFBO0VBQ0EsZ0JBQUE7QUNBRjtBREVFO0VBQ0UseUJBQUE7RUFDQSxXQUFBO0FDQUo7QURFSTs7RUFFRSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ0FOO0FERUk7RUFDRSx5QkFBQTtBQ0FOO0FER0U7RUFDRSxxQkFBQTtBQ0RKO0FER0U7RUFDRSxlQUFBO0FDREoiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9icmFuY2hlcy9icmFuY2hlcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGFibGVBcmVhIHtcclxuICBtYXJnaW4tdG9wOiAxcmVtO1xyXG4gIC8vIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcblxyXG4gIHRhYmxlIHtcclxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuXHJcbiAgICB0ZCxcclxuICAgIHRoIHtcclxuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZGRkZDtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBwYWRkaW5nOiA4cHg7XHJcbiAgICB9XHJcbiAgICB0cjpob3ZlciB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC5oZWFkZXIge1xyXG4gICAgYmFja2dyb3VuZDogbGlnaHRncmF5O1xyXG4gIH1cclxuICAuZGVsZXRlSWNvbiB7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgfVxyXG59XHJcbiIsIi50YWJsZUFyZWEge1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4udGFibGVBcmVhIHRhYmxlIHtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgd2lkdGg6IDEwMCU7XG59XG4udGFibGVBcmVhIHRhYmxlIHRkLFxuLnRhYmxlQXJlYSB0YWJsZSB0aCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGRkZGQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogOHB4O1xufVxuLnRhYmxlQXJlYSB0YWJsZSB0cjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7XG59XG4udGFibGVBcmVhIC5oZWFkZXIge1xuICBiYWNrZ3JvdW5kOiBsaWdodGdyYXk7XG59XG4udGFibGVBcmVhIC5kZWxldGVJY29uIHtcbiAgZm9udC1zaXplOiAxOHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/branches/branches.page.ts":
/*!*************************************************!*\
  !*** ./src/app/admin/branches/branches.page.ts ***!
  \*************************************************/
/*! exports provided: BranchesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BranchesPage", function() { return BranchesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var _branch_modal_branch_modal_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./branch-modal/branch-modal.page */ "./src/app/admin/branches/branch-modal/branch-modal.page.ts");
/* harmony import */ var src_app_services_admin_settings_admin_settings_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/admin-settings/admin-settings.service */ "./src/app/services/admin-settings/admin-settings.service.ts");






let BranchesPage = class BranchesPage {
    constructor(sharedService, modalController, alertController, adminSettingsService) {
        this.sharedService = sharedService;
        this.modalController = modalController;
        this.alertController = alertController;
        this.adminSettingsService = adminSettingsService;
        this.searchInput = '';
        this.branches = [];
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            yield this.getAllBranch();
            yield this.sharedService.loading.dismiss();
        });
    }
    getAllBranch() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                const data = yield this.adminSettingsService.getAllBranch();
                if (data) {
                    this.branches = data;
                }
            }
            catch (e) {
                console.log("getAllBranch error", e);
            }
        });
    }
    editBranch(branchData) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const propertiesObj = {};
            if (branchData) {
                propertiesObj['branchData'] = branchData;
            }
            const modal = yield this.modalController.create({
                component: _branch_modal_branch_modal_page__WEBPACK_IMPORTED_MODULE_4__["BranchModalPage"],
                backdropDismiss: false,
                cssClass: "custom-modal",
                componentProps: propertiesObj
            });
            modal.onDidDismiss().then((res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                yield this.getAllBranch();
                if (res && res.data) { }
            }));
            yield modal.present();
        });
    }
    askDeleteBranch(branchData) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.alertController.create({
                message: `Are you sure you want to delete '${branchData.name}' Branch ?`,
                buttons: [
                    {
                        role: 'cancel',
                        text: 'cancel',
                        cssClass: 'secondary',
                        handler: () => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                            console.log("cancelled");
                        })
                    },
                    {
                        text: 'Delete',
                        handler: () => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                            console.log("Delete vendor");
                            this.deleteBranch(branchData.id);
                        })
                    }
                ]
            });
            yield modal.present();
        });
    }
    deleteBranch(branchId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            const res = yield this.adminSettingsService.deleteBranch(branchId);
            yield this.sharedService.loading.dismiss();
            if (res) {
                const matchedIndex = this.branches.findIndex(el => el.id === branchId);
                if (matchedIndex > -1) {
                    this.branches.splice(matchedIndex, 1);
                }
                yield this.sharedService.presentAlert("Branch delete successfully");
            }
            else {
                yield this.sharedService.presentAlert("Something went wrong!");
            }
        });
    }
};
BranchesPage.ctorParameters = () => [
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: src_app_services_admin_settings_admin_settings_service__WEBPACK_IMPORTED_MODULE_5__["AdminSettingsService"] }
];
BranchesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-branches',
        template: __webpack_require__(/*! raw-loader!./branches.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/branches/branches.page.html"),
        styles: [__webpack_require__(/*! ./branches.page.scss */ "./src/app/admin/branches/branches.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        src_app_services_admin_settings_admin_settings_service__WEBPACK_IMPORTED_MODULE_5__["AdminSettingsService"]])
], BranchesPage);



/***/ })

}]);
//# sourceMappingURL=admin-branches-branches-module-es2015.js.map