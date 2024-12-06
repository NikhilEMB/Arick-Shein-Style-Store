(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-attributes-admin-attributes-admin-attributes-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/admin-attributes/admin-attributes/admin-attributes.page.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/admin-attributes/admin-attributes/admin-attributes.page.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\">\r\n      <img src=\"../../../assets/img/shop-logo.png\" />\r\n    </div>\r\n    <ion-title>Attributes</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-no-padding\">\r\n  <div class=\"main-container\" style=\"width: 100%;\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <ion-col size=\"2\" class=\"btnArea\">\r\n          <div class=\"statusList\">\r\n            <button (click)=\"showProductAttributes()\"\r\n              [ngClass]=\"dataType=='productAttr'? 'activeBtn':''\">Products</button>\r\n            <button (click)=\"showUserAttributes()\" [ngClass]=\"dataType=='userAttr'? 'activeBtn':''\">User</button>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"10\" class=\"displayArea\" *ngIf=\"dataType == 'productAttr'\">\r\n          <div class=\"alignCenter\">\r\n            <h2>Product Attributes</h2>\r\n            <ion-button (click)=\"saveAttrData()\" shape=\"round\" class=\"btn-1 i-start\" color=\"success\">\r\n              <i class=\"flaticon-null-20 margin-icon\"></i>\r\n              Save\r\n            </ion-button>\r\n          </div>\r\n          <div class=\"dFlex\">\r\n            <div class=\"inputField\">\r\n              <label for=\"\">Field Name</label>\r\n              <input [(ngModel)]=\"productInput\" type=\"text\" required>\r\n            </div>\r\n\r\n            <ion-button (click)=\"addField()\" [disabled]=\"!productInput\"><i class=\"flaticon-plus\"></i>\r\n              Add\r\n            </ion-button>\r\n          </div>\r\n\r\n          <h4>List of attributes for products</h4>\r\n          <div class=\"resultArea\">\r\n            <table>\r\n              <thead>\r\n                <th>#</th>\r\n                <th>Field Name</th>\r\n                <th>Action</th>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let item of productArray, index as i\">\r\n                  <td>{{i + 1}}</td>\r\n                  <td><span style=\"font-weight: bold;\">{{item}}</span>\r\n                    <ng-container *ngIf=\"subValues[item]\">\r\n                      <br>\r\n                      <div *ngFor=\"let subValue of subValues[item]; let j=index\">\r\n                        {{subValue}} \r\n                        <i class=\"flaticon-null-21 cursor-p\" (click)=\"deleteSubValue(item,j)\"></i>\r\n                      </div>\r\n                    </ng-container>\r\n\r\n                  </td>\r\n                  <td>\r\n                    <ion-button (click)=\"deleteField(i)\" style=\"margin-right: 10px;\"><i class=\"flaticon-null-21\"></i></ion-button>\r\n                    <ion-button fill=\"outline\" shape=\"round\" size=\"small\" (click)=\"addValueAlert(item)\">Add value</ion-button>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col size=\"10\" class=\"displayArea\" *ngIf=\"dataType == 'userAttr'\">\r\n          <h4>Coming soon !</h4>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/admin/admin-attributes/admin-attributes/admin-attributes.module.ts":
/*!************************************************************************************!*\
  !*** ./src/app/admin/admin-attributes/admin-attributes/admin-attributes.module.ts ***!
  \************************************************************************************/
/*! exports provided: AdminAttributesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminAttributesPageModule", function() { return AdminAttributesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _admin_attributes_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-attributes.page */ "./src/app/admin/admin-attributes/admin-attributes/admin-attributes.page.ts");







const routes = [
    {
        path: '',
        component: _admin_attributes_page__WEBPACK_IMPORTED_MODULE_6__["AdminAttributesPage"]
    }
];
let AdminAttributesPageModule = class AdminAttributesPageModule {
};
AdminAttributesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_admin_attributes_page__WEBPACK_IMPORTED_MODULE_6__["AdminAttributesPage"]]
    })
], AdminAttributesPageModule);



/***/ }),

/***/ "./src/app/admin/admin-attributes/admin-attributes/admin-attributes.page.scss":
/*!************************************************************************************!*\
  !*** ./src/app/admin/admin-attributes/admin-attributes/admin-attributes.page.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".alignCenter {\n  text-align: center;\n}\n\nlabel {\n  text-transform: capitalize;\n}\n\ninput,\nselect {\n  height: 38px;\n  width: 100%;\n  padding: 8px;\n  border-radius: 6px;\n  border: 1px solid #ccc;\n}\n\ntable {\n  border-collapse: collapse;\n  width: 100%;\n}\n\ntd {\n  padding: 10px;\n}\n\ntd:first-child {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n}\n\nth {\n  text-align: left;\n  padding: 8px;\n}\n\ntr {\n  border-bottom: 1px solid #cccc;\n}\n\n.btnArea {\n  overflow: hidden;\n  height: 82vh;\n}\n\n.btnArea:hover {\n  overflow-y: auto;\n}\n\n.displayArea {\n  overflow: hidden;\n  height: 82vh;\n  border-left: 1px solid lightgray;\n  border-right: 1px solid lightgray;\n  padding: 8px;\n}\n\n.displayArea:hover {\n  overflow-y: auto;\n}\n\n.statusList {\n  text-align: center;\n  margin-right: 1rem;\n}\n\n.statusList button {\n  width: 100%;\n  font-size: medium;\n  border: 1px solid lightgray;\n  background-color: #fff;\n  padding: 10px;\n  margin: 8px;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.dFlex {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: end;\n          align-items: flex-end;\n  gap: 1rem;\n}\n\n.inputField {\n  width: 40%;\n}\n\n.impText {\n  color: #cc0e0e;\n  margin-top: 0.5rem;\n}\n\n.resultArea {\n  margin-top: 1rem;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  padding: 0.5rem;\n  width: 60%;\n}\n\n.activeBtn {\n  background-color: var(--ion-color-categories-background) !important;\n}\n\n@media screen and (min-height: 1200px) {\n  .scroll1 {\n    height: 92vh;\n  }\n\n  .scroll2 {\n    height: 92vh;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vYWRtaW4tYXR0cmlidXRlcy9hZG1pbi1hdHRyaWJ1dGVzL0M6XFxCV0ktQURNSU5TXFxTaGVpbi1BZG1pbi1Db2RlL3NyY1xcYXBwXFxhZG1pblxcYWRtaW4tYXR0cmlidXRlc1xcYWRtaW4tYXR0cmlidXRlc1xcYWRtaW4tYXR0cmlidXRlcy5wYWdlLnNjc3MiLCJzcmMvYXBwL2FkbWluL2FkbWluLWF0dHJpYnV0ZXMvYWRtaW4tYXR0cmlidXRlcy9hZG1pbi1hdHRyaWJ1dGVzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0FDQ0Y7O0FEQ0E7RUFDRSwwQkFBQTtBQ0VGOztBREFBOztFQUVFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7QUNHRjs7QUREQTtFQUNFLHlCQUFBO0VBQ0EsV0FBQTtBQ0lGOztBRERBO0VBQ0UsYUFBQTtBQ0lGOztBREZBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsdUJBQUE7VUFBQSwyQkFBQTtBQ0tKOztBREhBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0FDTUY7O0FESEE7RUFDRSw4QkFBQTtBQ01GOztBRERBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0FDSUY7O0FERkU7RUFDRSxnQkFBQTtBQ0lKOztBREFBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsZ0NBQUE7RUFDQSxpQ0FBQTtFQUNBLFlBQUE7QUNHRjs7QURERTtFQUNFLGdCQUFBO0FDR0o7O0FEQ0E7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0FDRUY7O0FEREU7RUFDRSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSwyQkFBQTtFQUNBLHNCQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7S0FBQSxzQkFBQTtNQUFBLHFCQUFBO1VBQUEsaUJBQUE7QUNHSjs7QURBQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHVCQUFBO1VBQUEsMkJBQUE7RUFDQSxzQkFBQTtVQUFBLHFCQUFBO0VBQ0EsU0FBQTtBQ0dGOztBRERBO0VBRUUsVUFBQTtBQ0dGOztBRERBO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0FDSUY7O0FERkE7RUFDRSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsVUFBQTtBQ0tGOztBREhBO0VBQ0UsbUVBQUE7QUNNRjs7QURKQTtFQUNFO0lBQ0UsWUFBQTtFQ09GOztFRExBO0lBQ0UsWUFBQTtFQ1FGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9hZG1pbi9hZG1pbi1hdHRyaWJ1dGVzL2FkbWluLWF0dHJpYnV0ZXMvYWRtaW4tYXR0cmlidXRlcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWxpZ25DZW50ZXJ7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbmxhYmVsIHtcclxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxufVxyXG5pbnB1dCxcclxuc2VsZWN0IHtcclxuICBoZWlnaHQ6IDM4cHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgcGFkZGluZzogOHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG59XHJcbnRhYmxlIHtcclxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG50ZHtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcbnRkOmZpcnN0LWNoaWxke1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxufVxyXG50aCB7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxuICBwYWRkaW5nOiA4cHg7XHJcbn1cclxuXHJcbnRye1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjYztcclxufVxyXG4vLyB0cjpob3ZlciB7XHJcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjtcclxuLy8gfVxyXG4uYnRuQXJlYSB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDgydmg7XHJcblxyXG4gICY6aG92ZXIge1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICB9XHJcbn1cclxuXHJcbi5kaXNwbGF5QXJlYSB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBoZWlnaHQ6IDgydmg7XHJcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgbGlnaHRncmF5O1xyXG4gIHBhZGRpbmc6IDhweDtcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxufVxyXG5cclxuLnN0YXR1c0xpc3Qge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW4tcmlnaHQ6IDFyZW07XHJcbiAgYnV0dG9uIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZm9udC1zaXplOiBtZWRpdW07XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIG1hcmdpbjogOHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgfVxyXG59XHJcbi5kRmxleCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gIGdhcDogMXJlbTtcclxufVxyXG4uaW5wdXRGaWVsZCB7XHJcbiAgLy8gbWFyZ2luLWJvdHRvbTogMC41cmVtO1xyXG4gIHdpZHRoOiA0MCU7XHJcbn1cclxuLmltcFRleHQge1xyXG4gIGNvbG9yOiByZ2IoMjA0LCAxNCwgMTQpO1xyXG4gIG1hcmdpbi10b3A6IDAuNXJlbTtcclxufVxyXG4ucmVzdWx0QXJlYSB7XHJcbiAgbWFyZ2luLXRvcDogMXJlbTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBwYWRkaW5nOiAwLjVyZW07XHJcbiAgd2lkdGg6IDYwJTtcclxufVxyXG4uYWN0aXZlQnRuIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItY2F0ZWdvcmllcy1iYWNrZ3JvdW5kKSAhaW1wb3J0YW50O1xyXG59XHJcbkBtZWRpYSBzY3JlZW4gYW5kKG1pbi1oZWlnaHQ6IDEyMDBweCkge1xyXG4gIC5zY3JvbGwxIHtcclxuICAgIGhlaWdodDogOTJ2aDtcclxuICB9XHJcbiAgLnNjcm9sbDIge1xyXG4gICAgaGVpZ2h0OiA5MnZoO1xyXG4gIH1cclxufVxyXG4iLCIuYWxpZ25DZW50ZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmxhYmVsIHtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG5cbmlucHV0LFxuc2VsZWN0IHtcbiAgaGVpZ2h0OiAzOHB4O1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogOHB4O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG59XG5cbnRhYmxlIHtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbnRkIHtcbiAgcGFkZGluZzogMTBweDtcbn1cblxudGQ6Zmlyc3QtY2hpbGQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG59XG5cbnRoIHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgcGFkZGluZzogOHB4O1xufVxuXG50ciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjYztcbn1cblxuLmJ0bkFyZWEge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDgydmg7XG59XG4uYnRuQXJlYTpob3ZlciB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5kaXNwbGF5QXJlYSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGhlaWdodDogODJ2aDtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgcGFkZGluZzogOHB4O1xufVxuLmRpc3BsYXlBcmVhOmhvdmVyIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cblxuLnN0YXR1c0xpc3Qge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi1yaWdodDogMXJlbTtcbn1cbi5zdGF0dXNMaXN0IGJ1dHRvbiB7XG4gIHdpZHRoOiAxMDAlO1xuICBmb250LXNpemU6IG1lZGl1bTtcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBwYWRkaW5nOiAxMHB4O1xuICBtYXJnaW46IDhweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuLmRGbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gIGdhcDogMXJlbTtcbn1cblxuLmlucHV0RmllbGQge1xuICB3aWR0aDogNDAlO1xufVxuXG4uaW1wVGV4dCB7XG4gIGNvbG9yOiAjY2MwZTBlO1xuICBtYXJnaW4tdG9wOiAwLjVyZW07XG59XG5cbi5yZXN1bHRBcmVhIHtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBwYWRkaW5nOiAwLjVyZW07XG4gIHdpZHRoOiA2MCU7XG59XG5cbi5hY3RpdmVCdG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItY2F0ZWdvcmllcy1iYWNrZ3JvdW5kKSAhaW1wb3J0YW50O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLWhlaWdodDogMTIwMHB4KSB7XG4gIC5zY3JvbGwxIHtcbiAgICBoZWlnaHQ6IDkydmg7XG4gIH1cblxuICAuc2Nyb2xsMiB7XG4gICAgaGVpZ2h0OiA5MnZoO1xuICB9XG59Il19 */"

/***/ }),

/***/ "./src/app/admin/admin-attributes/admin-attributes/admin-attributes.page.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/admin/admin-attributes/admin-attributes/admin-attributes.page.ts ***!
  \**********************************************************************************/
/*! exports provided: AdminAttributesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminAttributesPage", function() { return AdminAttributesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_attributes_attributes_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/attributes/attributes.service */ "./src/app/services/attributes/attributes.service.ts");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");





let AdminAttributesPage = class AdminAttributesPage {
    constructor(attributeService, alertController, sharedService) {
        this.attributeService = attributeService;
        this.alertController = alertController;
        this.sharedService = sharedService;
        this.dataType = 'productAttr';
        this.productArray = [];
        this.subValues = {};
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            let res = yield this.attributeService.getProductAttributes();
            console.log('res:', res);
            if (res) {
                this.productArray = res.attributes;
                this.subValues = res.subValues ? res.subValues : {};
            }
            yield this.sharedService.loading.dismiss();
        });
    }
    showProductAttributes() {
        this.dataType = 'productAttr';
    }
    showUserAttributes() {
        this.dataType = 'userAttr';
    }
    addField() {
        for (const attribute of this.productArray) {
            if (this.productInput == attribute) {
                this.sharedService.presentAlert("Field already exists");
                return;
            }
        }
        this.productArray.push(this.productInput);
        this.productInput = '';
    }
    addValueAlert(attribute) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                subHeader: 'Add Value',
                inputs: [
                    {
                        name: 'value',
                        type: 'text',
                        placeholder: 'Enter Value'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            console.log('Confirm Cancel');
                        }
                    }, {
                        text: 'Done',
                        handler: (data) => {
                            if (this.subValues[attribute] && this.subValues[attribute].length) {
                                this.subValues[attribute].push(data.value);
                            }
                            else {
                                let arr = [data.value];
                                this.subValues[attribute] = arr;
                            }
                            console.log('subValues', this.subValues);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    deleteField(i) {
        console.log("name", this.productArray[i]);
        delete this.subValues[this.productArray[i]];
        this.productArray.splice(i, 1);
    }
    deleteSubValue(i, j) {
        // console.log('subValue:', this.subValues, ' i:', i);
        this.subValues[i].splice(j, 1);
        console.log('subValue:', this.subValues, ' i:', i);
    }
    saveAttrData() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            console.log('attributes:', this.productArray);
            console.log('subValues:', this.subValues);
            yield this.sharedService.presentLoading();
            let setData = yield this.attributeService.setProductAttributes({
                attributes: this.productArray,
                subValues: this.subValues
            });
            yield this.sharedService.loading.dismiss();
            if (setData) {
                yield this.sharedService.presentAlert("Attribute saved successfully");
            }
            else {
                yield this.sharedService.presentAlert("Something went wrong. Please try again later");
            }
        });
    }
};
AdminAttributesPage.ctorParameters = () => [
    { type: src_app_services_attributes_attributes_service__WEBPACK_IMPORTED_MODULE_3__["AttributesService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] }
];
AdminAttributesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-admin-attributes',
        template: __webpack_require__(/*! raw-loader!./admin-attributes.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/admin-attributes/admin-attributes/admin-attributes.page.html"),
        styles: [__webpack_require__(/*! ./admin-attributes.page.scss */ "./src/app/admin/admin-attributes/admin-attributes/admin-attributes.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_attributes_attributes_service__WEBPACK_IMPORTED_MODULE_3__["AttributesService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"]])
], AdminAttributesPage);



/***/ })

}]);
//# sourceMappingURL=admin-admin-attributes-admin-attributes-admin-attributes-module-es2015.js.map