(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-user-groups-user-groups-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/user-groups/user-groups.page.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/user-groups/user-groups.page.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\">\r\n      <img src=\"../../../assets/img/shop-logo.png\">\r\n    </div>\r\n    <ion-title>User Groups</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=\"4\">\r\n          <ion-button expand='block' (click)=\"openCreateGroupModal()\">Create Group</ion-button>\r\n          <div id=\"scroll1\">\r\n            <div class=\"groupWrapper\">\r\n              <div class=\"groupItem\" \r\n                  [ngClass]=\"activeTile === i ? 'tile-bg-active' : 'tile-bg-inactive'\" \r\n                  *ngFor=\"let group of groups; index as i\" (click)=\"getGroupUsers(i)\">\r\n                <div class=\"itemFlex\">\r\n                  <p class=\"groupName\">{{group.name}}</p>\r\n                  <!-- <p class=\"groupSize\">---- users</p> -->\r\n                </div>\r\n                <span class=\"groupDate\">Created On: {{group.createdAt.toDate() | date}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col size=\"8\" id=\"scroll2\" *ngIf=\"selectedGroup?.id\">\r\n          <div class=\"groupDetails-container\">\r\n            <h4 class=\"displayTitle\">{{selectedGroup.name}} <span *ngIf=\"users\">(Users: {{users.length}})</span></h4>\r\n            <p class=\"groupDate t-a-c\">Created On: {{selectedGroup.createdAt.toDate() | date}}</p>\r\n            <div class=\"groupDetail\">\r\n              <div class=\"itemFlex\" style=\"margin-bottom: 1rem;\">\r\n                <ion-button size=\"small\" color=\"danger\" (click)=\"askConfirmDelete()\">\r\n                  <i class=\"flaticon-null-21\"></i> Delete Group\r\n                </ion-button>\r\n              </div>\r\n              <div class=\"itemFlex\">\r\n                <input class=\"searchInput\" placeholder=\"Search user...\" [(ngModel)]=\"searchUser\" type=\"text\">\r\n                <ion-button (click)=\"openUsersModal()\">\r\n                  <i class=\"flaticon-null-28\"></i>&nbsp; Add User\r\n                </ion-button>\r\n              </div>\r\n              <ion-text color=\"danger\">\r\n                <span>*Changing role of a [ user ] to something else will lead to deletion from all groups !</span>\r\n              </ion-text>\r\n  \r\n              <div *ngIf=\"showLoader; else showUsers\" class=\"spinner\">\r\n                <ion-spinner color=\"primary\"></ion-spinner>\r\n              </div>\r\n              <ng-template #showUsers>\r\n                <div class=\"tableScroll\" *ngIf=\"users.length\">\r\n                  <table class=\"userTable\">\r\n                    <thead>\r\n                      <th>SNO</th>\r\n                      <th>User Name</th>\r\n                      <th>Phone Number</th>\r\n                      <th>Remove</th>\r\n                    </thead>\r\n                    <tbody>\r\n                      <tr *ngFor=\"let user of users | filter: searchUser; let i = index\">\r\n                        <td>{{i+1}}</td>\r\n                        <td>{{user.name}}</td>\r\n                        <td>{{user.phoneNo}}</td>\r\n                        <td>\r\n                          <ion-button size=\"small\" color=\"danger\" (click)=\"removeUser(i, user.id)\">\r\n                            <i class=\"flaticon-null-17\"></i>\r\n                          </ion-button>\r\n                        </td>\r\n                      </tr>\r\n                    </tbody>\r\n                  </table>\r\n                </div>\r\n              </ng-template>\r\n            </div>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/user-groups/user-groups.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/admin/user-groups/user-groups.module.ts ***!
  \*********************************************************/
/*! exports provided: UserGroupsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserGroupsPageModule", function() { return UserGroupsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _user_groups_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user-groups.page */ "./src/app/admin/user-groups/user-groups.page.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.js");








const routes = [
    {
        path: '',
        component: _user_groups_page__WEBPACK_IMPORTED_MODULE_6__["UserGroupsPage"]
    }
];
let UserGroupsPageModule = class UserGroupsPageModule {
};
UserGroupsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ng2_search_filter__WEBPACK_IMPORTED_MODULE_7__["Ng2SearchPipeModule"],
        ],
        declarations: [_user_groups_page__WEBPACK_IMPORTED_MODULE_6__["UserGroupsPage"]]
    })
], UserGroupsPageModule);



/***/ }),

/***/ "./src/app/admin/user-groups/user-groups.page.scss":
/*!*********************************************************!*\
  !*** ./src/app/admin/user-groups/user-groups.page.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  width: 100%;\n}\n\n#scroll1 {\n  overflow: hidden;\n  height: 74vh;\n  margin-top: 1rem;\n}\n\n#scroll1:hover {\n  overflow-y: auto;\n}\n\n#scroll2 {\n  overflow: hidden;\n  height: 82vh;\n  margin-top: 8px;\n  border-left: 1px solid lightgray;\n}\n\n.groupWrapper .groupItem {\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  padding: 8px;\n  margin-bottom: 8px;\n  cursor: pointer;\n}\n\n.groupWrapper .groupItem:hover {\n  box-shadow: 0 2px 5px #ccc;\n  background: var(--ion-color-light);\n}\n\n.groupWrapper .groupItem .groupName {\n  font-size: 16px;\n  font-weight: 600;\n  text-transform: capitalize;\n}\n\n.groupWrapper .groupItem .groupSize {\n  font-size: 14px;\n}\n\n.groupDate {\n  color: #606060;\n  font-size: 12px;\n}\n\n.displayTitle {\n  text-align: center;\n  font-weight: 600;\n  margin-top: 0;\n}\n\n.groupDetail {\n  padding: 8px;\n  height: 100%;\n}\n\n.searchInput {\n  height: 38px;\n  width: 50%;\n  padding: 6px;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n}\n\n.itemFlex {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-bottom: 0.5rem;\n}\n\n.groupItemActive {\n  background-color: var(--ion-color-categories-background);\n}\n\n.tableScroll {\n  overflow: hidden;\n  height: 66vh;\n  margin-top: 1rem;\n}\n\n.tableScroll:hover {\n  overflow-y: auto;\n}\n\n.userTable {\n  margin-top: 1rem;\n  width: 100%;\n  border-collapse: collapse;\n}\n\n.userTable th,\n.userTable td {\n  text-align: left;\n  padding: 8px;\n}\n\n.userTable th:last-child,\n.userTable td:last-child {\n  text-align: right;\n}\n\n.userTable tr:hover {\n  background-color: #efefef;\n}\n\n.groupDetails-container {\n  overflow-y: scroll;\n  height: 90vh;\n}\n\n.spinner {\n  position: absolute;\n}\n\n@media screen and (min-height: 1200px) {\n  #scroll1,\n#scroll2,\n.tableScroll {\n    height: 92vh;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vdXNlci1ncm91cHMvQzpcXEJXSS1BRE1JTlNcXFNoZWluLUFkbWluLUNvZGUvc3JjXFxhcHBcXGFkbWluXFx1c2VyLWdyb3Vwc1xcdXNlci1ncm91cHMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi91c2VyLWdyb3Vwcy91c2VyLWdyb3Vwcy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0FDQ0o7O0FERUU7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0NKOztBREFJO0VBQ0UsZ0JBQUE7QUNFTjs7QURFRTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxnQ0FBQTtBQ0NKOztBRE9JO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUNKTjs7QURLTTtFQUNFLDBCQUFBO0VBQ0Esa0NBQUE7QUNIUjs7QURLTTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDBCQUFBO0FDSFI7O0FES007RUFDRSxlQUFBO0FDSFI7O0FEUUU7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQ0xKOztBRFFFO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7QUNMSjs7QURRRTtFQUNFLFlBQUE7RUFDQSxZQUFBO0FDTEo7O0FEUUU7RUFDRSxZQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FDTEo7O0FEUUU7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHFCQUFBO0FDTEo7O0FEUUU7RUFDRSx3REFBQTtBQ0xKOztBRFFFO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUNMSjs7QURPSTtFQUNFLGdCQUFBO0FDTE47O0FEUUU7RUFDRSxnQkFBQTtFQUNBLFdBQUE7RUFDQSx5QkFBQTtBQ0xKOztBRE9JOztFQUVFLGdCQUFBO0VBQ0EsWUFBQTtBQ0xOOztBRE1NOztFQUNFLGlCQUFBO0FDSFI7O0FETUk7RUFDRSx5QkFBQTtBQ0pOOztBRFFFO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0FDTEo7O0FEUUU7RUFDRSxrQkFBQTtBQ0xKOztBRFFFO0VBQ0U7OztJQUdFLFlBQUE7RUNMSjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvYWRtaW4vdXNlci1ncm91cHMvdXNlci1ncm91cHMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW4tY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICBcclxuICAjc2Nyb2xsMSB7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgaGVpZ2h0OiA3NHZoO1xyXG4gICAgbWFyZ2luLXRvcDogMXJlbTtcclxuICAgICY6aG92ZXIge1xyXG4gICAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAjc2Nyb2xsMiB7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgaGVpZ2h0OiA4MnZoO1xyXG4gICAgbWFyZ2luLXRvcDogOHB4O1xyXG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICAvLyAmOmhvdmVyIHtcclxuICAgIC8vICAgb3ZlcmZsb3cteTogYXV0bztcclxuICAgIC8vIH1cclxuICB9XHJcbiAgXHJcbiAgLmdyb3VwV3JhcHBlciB7XHJcbiAgICAvLyBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xyXG4gICAgLmdyb3VwSXRlbSB7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgICAgcGFkZGluZzogOHB4O1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgYm94LXNoYWRvdzogMCAycHggNXB4ICNjY2M7XHJcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcclxuICAgICAgfVxyXG4gICAgICAuZ3JvdXBOYW1lIHtcclxuICAgICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICAgICAgfVxyXG4gICAgICAuZ3JvdXBTaXplIHtcclxuICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLmdyb3VwRGF0ZSB7XHJcbiAgICBjb2xvcjogIzYwNjA2MDtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICB9XHJcbiAgXHJcbiAgLmRpc3BsYXlUaXRsZSB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgbWFyZ2luLXRvcDogMDtcclxuICB9XHJcbiAgXHJcbiAgLmdyb3VwRGV0YWlsIHtcclxuICAgIHBhZGRpbmc6IDhweDtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICB9XHJcbiAgXHJcbiAgLnNlYXJjaElucHV0IHtcclxuICAgIGhlaWdodDogMzhweDtcclxuICAgIHdpZHRoOiA1MCU7XHJcbiAgICBwYWRkaW5nOiA2cHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIH1cclxuICBcclxuICAuaXRlbUZsZXgge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XHJcbiAgfVxyXG4gIFxyXG4gIC5ncm91cEl0ZW1BY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWNhdGVnb3JpZXMtYmFja2dyb3VuZCk7XHJcbiAgfVxyXG4gIFxyXG4gIC50YWJsZVNjcm9sbCB7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgaGVpZ2h0OiA2NnZoO1xyXG4gICAgbWFyZ2luLXRvcDogMXJlbTtcclxuICAgIC8vIGJhY2tncm91bmQtY29sb3I6IHZpb2xldDtcclxuICAgICY6aG92ZXIge1xyXG4gICAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gICAgfVxyXG4gIH1cclxuICAudXNlclRhYmxlIHtcclxuICAgIG1hcmdpbi10b3A6IDFyZW07XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XHJcbiAgXHJcbiAgICB0aCxcclxuICAgIHRkIHtcclxuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgICAgcGFkZGluZzogOHB4O1xyXG4gICAgICAmOmxhc3QtY2hpbGQge1xyXG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0cjpob3ZlciB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuZ3JvdXBEZXRhaWxzLWNvbnRhaW5lcntcclxuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcclxuICAgIGhlaWdodDogOTB2aDtcclxuICB9XHJcblxyXG4gIC5zcGlubmVye1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIH1cclxuICBcclxuICBAbWVkaWEgc2NyZWVuIGFuZChtaW4taGVpZ2h0OiAxMjAwcHgpIHtcclxuICAgICNzY3JvbGwxLFxyXG4gICAgI3Njcm9sbDIsXHJcbiAgICAudGFibGVTY3JvbGwge1xyXG4gICAgICBoZWlnaHQ6IDkydmg7XHJcbiAgICB9XHJcbiAgfVxyXG4gICIsIi5tYWluLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4jc2Nyb2xsMSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogNzR2aDtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbn1cbiNzY3JvbGwxOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuI3Njcm9sbDIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDgydmg7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbi5ncm91cFdyYXBwZXIgLmdyb3VwSXRlbSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogOHB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5ncm91cFdyYXBwZXIgLmdyb3VwSXRlbTpob3ZlciB7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDVweCAjY2NjO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xufVxuLmdyb3VwV3JhcHBlciAuZ3JvdXBJdGVtIC5ncm91cE5hbWUge1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xufVxuLmdyb3VwV3JhcHBlciAuZ3JvdXBJdGVtIC5ncm91cFNpemUge1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5ncm91cERhdGUge1xuICBjb2xvcjogIzYwNjA2MDtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuXG4uZGlzcGxheVRpdGxlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXdlaWdodDogNjAwO1xuICBtYXJnaW4tdG9wOiAwO1xufVxuXG4uZ3JvdXBEZXRhaWwge1xuICBwYWRkaW5nOiA4cHg7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLnNlYXJjaElucHV0IHtcbiAgaGVpZ2h0OiAzOHB4O1xuICB3aWR0aDogNTAlO1xuICBwYWRkaW5nOiA2cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbn1cblxuLml0ZW1GbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG5cbi5ncm91cEl0ZW1BY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItY2F0ZWdvcmllcy1iYWNrZ3JvdW5kKTtcbn1cblxuLnRhYmxlU2Nyb2xsIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgaGVpZ2h0OiA2NnZoO1xuICBtYXJnaW4tdG9wOiAxcmVtO1xufVxuLnRhYmxlU2Nyb2xsOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuLnVzZXJUYWJsZSB7XG4gIG1hcmdpbi10b3A6IDFyZW07XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xufVxuLnVzZXJUYWJsZSB0aCxcbi51c2VyVGFibGUgdGQge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBwYWRkaW5nOiA4cHg7XG59XG4udXNlclRhYmxlIHRoOmxhc3QtY2hpbGQsXG4udXNlclRhYmxlIHRkOmxhc3QtY2hpbGQge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cbi51c2VyVGFibGUgdHI6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xufVxuXG4uZ3JvdXBEZXRhaWxzLWNvbnRhaW5lciB7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgaGVpZ2h0OiA5MHZoO1xufVxuXG4uc3Bpbm5lciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xuICAjc2Nyb2xsMSxcbiNzY3JvbGwyLFxuLnRhYmxlU2Nyb2xsIHtcbiAgICBoZWlnaHQ6IDkydmg7XG4gIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/admin/user-groups/user-groups.page.ts":
/*!*******************************************************!*\
  !*** ./src/app/admin/user-groups/user-groups.page.ts ***!
  \*******************************************************/
/*! exports provided: UserGroupsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserGroupsPage", function() { return UserGroupsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");
/* harmony import */ var src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/user-groups/user-groups.service */ "./src/app/services/user-groups/user-groups.service.ts");
/* harmony import */ var _users_modal_users_modal_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../users-modal/users-modal.page */ "./src/app/admin/users-modal/users-modal.page.ts");
/* harmony import */ var _user_groups_modal_user_groups_modal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user-groups-modal/user-groups-modal.page */ "./src/app/admin/user-groups/user-groups-modal/user-groups-modal.page.ts");







let UserGroupsPage = class UserGroupsPage {
    constructor(modalController, userGroupsService, sharedService, alertController) {
        this.modalController = modalController;
        this.userGroupsService = userGroupsService;
        this.sharedService = sharedService;
        this.alertController = alertController;
        this.showLoader = true;
        this.activeTile = 0;
        this.groups = [];
        this.users = [];
        this.newlyAddedUsers = [];
        this.managers = [];
    }
    ngOnInit() { }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.getAllGroups();
        });
    }
    getAllGroups() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const groupsWithId = yield this.userGroupsService.getAllGroups();
            if (groupsWithId) {
                this.groups = groupsWithId;
                this.getGroupUsers(0);
            }
        });
    }
    openCreateGroupModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _user_groups_modal_user_groups_modal_page__WEBPACK_IMPORTED_MODULE_6__["UserGroupsModalPage"],
                backdropDismiss: false,
                cssClass: "custom-modal",
            });
            modal.onDidDismiss().then(res => {
                if (res && res.data && res.data.groupCreated) {
                    this.getAllGroups();
                }
            });
            yield modal.present();
        });
    }
    openUsersModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _users_modal_users_modal_page__WEBPACK_IMPORTED_MODULE_5__["UsersModalPage"],
                componentProps: {
                    alreadyAddedUsers: this.users,
                    groupDetails: { groupId: this.selectedGroup.id },
                },
                cssClass: 'coupon-code-modal'
            });
            modal.onDidDismiss().then(res => {
                if (res && res.data) {
                    console.log('res.data', res.data);
                    this.users = res.data;
                }
            });
            yield modal.present();
        });
    }
    getGroupManagers() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const managers = yield this.userGroupsService.getGroupManagers(this.selectedGroup.id);
            this.managers = (managers && managers.length) ? managers : [];
        });
    }
    getGroupUsers(groupIndex) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.activeTile = groupIndex;
            this.selectedGroup = this.groups[groupIndex];
            const users = yield this.userGroupsService.getGroupUsers(this.selectedGroup.id);
            this.users = (users && users.length) ? users : [];
            console.log(`Users of grp ${this.selectedGroup.name} with grpId ${this.selectedGroup.id}:`, users);
            this.getGroupManagers();
            this.showLoader = false;
        });
    }
    askConfirmDelete() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                subHeader: `Are you sure you want to delete ${this.selectedGroup.name} ?`,
                buttons: [
                    {
                        text: "No",
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                        }
                    }, {
                        text: "Yes",
                        handler: () => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                            this.deleteGroup();
                        })
                    }
                ]
            });
            yield alert.present();
        });
    }
    deleteGroup() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.sharedService.presentLoading();
            const success = yield this.userGroupsService.deleteGroup({ groupId: this.selectedGroup.id, users: this.users, managers: this.managers });
            if (success) {
                if (this.sharedService.loading) {
                    this.sharedService.loading.dismiss();
                }
                let deletedGrpName = this.selectedGroup.name;
                this.sharedService.presentAlert(`${deletedGrpName} is deleted Successfully`);
                this.getAllGroups();
            }
        });
    }
    removeUser(index, userId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.users.splice(index, 1);
            yield this.userGroupsService.removeUserFromGroup({ userId, groupId: this.selectedGroup.id });
        });
    }
};
UserGroupsPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_4__["UserGroupsService"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] }
];
UserGroupsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-user-groups',
        template: __webpack_require__(/*! raw-loader!./user-groups.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/user-groups/user-groups.page.html"),
        styles: [__webpack_require__(/*! ./user-groups.page.scss */ "./src/app/admin/user-groups/user-groups.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"], src_app_services_user_groups_user_groups_service__WEBPACK_IMPORTED_MODULE_4__["UserGroupsService"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]])
], UserGroupsPage);



/***/ })

}]);
//# sourceMappingURL=admin-user-groups-user-groups-module-es2015.js.map