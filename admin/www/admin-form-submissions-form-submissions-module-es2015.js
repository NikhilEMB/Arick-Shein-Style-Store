(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-form-submissions-form-submissions-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/admin/form-submissions/form-submissions.page.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/admin/form-submissions/form-submissions.page.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-menu-button slot=\"start\" class=\"menu-btn\">\r\n      <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\r\n    </ion-menu-button>\r\n    <div class=\"header-logo\" slot=\"start\"><img src=\"../../../assets/img/shop-logo.png\"></div>\r\n    <ion-title text-center>Form Submissions</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div class=\"main-container\">\r\n  <p *ngIf='noForms' style=\"text-align: center;padding: 20px;font-size: large;\">No submissions yet!</p>\r\n  <div *ngIf='!noForms'>\r\n    <ion-grid *ngFor=\"let form of allForms; let i=index;\" class='dataTable'>\r\n      <div style=\"display: flex; align-items: center;justify-content: space-between;\">\r\n        <div style=\"display: flex;\">\r\n          <p><strong>{{i+1}} )</strong></p>&nbsp;&nbsp;\r\n          <p *ngIf='users[i] && users[i].name'><strong>User Name:</strong> {{users[i].name}}</p>&nbsp;&nbsp;\r\n          <p *ngIf='users[i] && users[i].phoneNo'><strong>User Number:</strong> {{users[i].phoneNo}}</p>&nbsp;&nbsp;\r\n          <p *ngIf='formTitles[i] && formTitles[i].formTitle'><strong>Form Title:</strong> {{formTitles[i].formTitle}}</p>\r\n        </div>\r\n        <ion-button (click) = \"deleteForm(i)\" >Delete</ion-button>\r\n      </div>\r\n      <br>\r\n      <ion-row class=\"ion-text-capitalize\" style=\"background: lightgray\">\r\n        <ion-col>Field</ion-col>\r\n        <ion-col>Value</ion-col>\r\n      </ion-row>\r\n      <ion-row *ngFor=\"let submission of form.formData | keyvalue; let i=index;\">\r\n        <ion-col>\r\n          {{submission.key}}\r\n        </ion-col>\r\n        <ion-col *ngIf=\"!isValidHttpUrl(submission.value)\">\r\n          {{submission.value}}\r\n        </ion-col>\r\n        <ion-col *ngIf=\"isValidHttpUrl(submission.value)\">\r\n          <a href=\"{{submission.value}}\" target=\"_blank\">View Uploaded File</a>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n  </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/admin/form-submissions/form-submissions.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/admin/form-submissions/form-submissions.module.ts ***!
  \*******************************************************************/
/*! exports provided: FormSubmissionsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormSubmissionsPageModule", function() { return FormSubmissionsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _form_submissions_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./form-submissions.page */ "./src/app/admin/form-submissions/form-submissions.page.ts");







const routes = [
    {
        path: '',
        component: _form_submissions_page__WEBPACK_IMPORTED_MODULE_6__["FormSubmissionsPage"]
    }
];
let FormSubmissionsPageModule = class FormSubmissionsPageModule {
};
FormSubmissionsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_form_submissions_page__WEBPACK_IMPORTED_MODULE_6__["FormSubmissionsPage"]]
    })
], FormSubmissionsPageModule);



/***/ }),

/***/ "./src/app/admin/form-submissions/form-submissions.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/admin/form-submissions/form-submissions.page.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-col {\n  border: 1px solid gray;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n\n.dataTable {\n  padding: 20px;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vZm9ybS1zdWJtaXNzaW9ucy9DOlxcQldJLUFETUlOU1xcU2hlaW4tQWRtaW4tQ29kZS9zcmNcXGFwcFxcYWRtaW5cXGZvcm0tc3VibWlzc2lvbnNcXGZvcm0tc3VibWlzc2lvbnMucGFnZS5zY3NzIiwic3JjL2FwcC9hZG1pbi9mb3JtLXN1Ym1pc3Npb25zL2Zvcm0tc3VibWlzc2lvbnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksc0JBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0FDQ0o7O0FERUE7RUFDSSxhQUFBO0VBQ0Esa0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2Zvcm0tc3VibWlzc2lvbnMvZm9ybS1zdWJtaXNzaW9ucy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tY29se1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcclxuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDEwcHhcclxufVxyXG5cclxuLmRhdGFUYWJsZXtcclxuICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn0iLCJpb24tY29sIHtcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuXG4uZGF0YVRhYmxlIHtcbiAgcGFkZGluZzogMjBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/admin/form-submissions/form-submissions.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/admin/form-submissions/form-submissions.page.ts ***!
  \*****************************************************************/
/*! exports provided: FormSubmissionsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormSubmissionsPage", function() { return FormSubmissionsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/shared/shared.service */ "./src/app/services/shared/shared.service.ts");





let FormSubmissionsPage = class FormSubmissionsPage {
    constructor(angularFirestore, sharedService) {
        this.angularFirestore = angularFirestore;
        this.sharedService = sharedService;
        this.allForms = [];
        this.noForms = false;
        this.users = [];
        this.formTitles = [];
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const formRef = this.angularFirestore.collection('forms', ref => ref.orderBy('createdAt', 'desc'));
            const formSnap = formRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(actions => actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return Object.assign({ id }, data);
            })));
            const submissionData = yield formSnap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise();
            // console.log(catgeoryData)
            if (!submissionData.length) {
                this.noForms = true;
            }
            else {
                this.allForms = submissionData;
                for (let i = 0; i < this.allForms.length; i++) {
                    if (this.allForms[i].userId) {
                        this.users.push(yield this.angularFirestore.collection('users', ref => ref).doc(this.allForms[i].userId).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise());
                    }
                    if (this.allForms[i].widgetId) {
                        this.formTitles.push(yield this.angularFirestore.collection('widgets', ref => ref).doc(this.allForms[i].widgetId).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).toPromise());
                    }
                }
            }
        });
    }
    isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        }
        catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }
    deleteForm(i) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.sharedService.presentLoading();
            yield this.angularFirestore.collection('forms').doc(this.allForms[i].id).delete();
            this.allForms.splice(i, 1);
            this.sharedService.loading.dismiss();
            this.sharedService.presentAlert('Form deleted successfully!');
        });
    }
};
FormSubmissionsPage.ctorParameters = () => [
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] },
    { type: src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] }
];
FormSubmissionsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-form-submissions',
        template: __webpack_require__(/*! raw-loader!./form-submissions.page.html */ "./node_modules/raw-loader/index.js!./src/app/admin/form-submissions/form-submissions.page.html"),
        styles: [__webpack_require__(/*! ./form-submissions.page.scss */ "./src/app/admin/form-submissions/form-submissions.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"], src_app_services_shared_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"]])
], FormSubmissionsPage);



/***/ })

}]);
//# sourceMappingURL=admin-form-submissions-form-submissions-module-es2015.js.map